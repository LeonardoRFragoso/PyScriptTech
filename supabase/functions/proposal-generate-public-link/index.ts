// supabase/functions/proposal-generate-public-link/index.ts
// Gera link público seguro para uma proposta. Requer autenticação.

/// <reference path="../types/deno.d.ts" />

import { createClient } from '@supabase/supabase-js';
import { corsHeaders } from '../_shared/cors.ts';

const PUBLIC_SITE_URL = Deno.env.get('REACT_APP_PUBLIC_SITE_URL') || 'https://pyscript.tech';

async function sha256Hash(text: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

function generateToken(): string {
  const uuid = crypto.randomUUID();
  const random = Array.from(crypto.getRandomValues(new Uint8Array(16)))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
  return `${uuid}-${random}`;
}

async function checkPermission(supabase: any, userId: string, userEmail: string): Promise<boolean> {
  const allowedEmailsRaw = Deno.env.get('PYSCRIPT_ALLOWED_ADMIN_EMAILS') || '';
  const allowedEmails = allowedEmailsRaw
    .split(',')
    .map((email: string) => email.trim().toLowerCase())
    .filter(Boolean);

  if (allowedEmails.length > 0 && allowedEmails.includes(userEmail.toLowerCase())) {
    return true;
  }

  const { data: userData, error: userError } = await supabase.auth.admin.getUserById(userId);
  if (userError || !userData?.user) return false;

  const role = userData.user.user_metadata?.role;
  const allowedRoles = ['admin', 'owner', 'sales_manager', 'project_manager'];
  return allowedRoles.includes(role);
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Método não permitido' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL') || Deno.env.get('REACT_APP_SUPABASE_URL') || '';
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';

    if (!supabaseUrl || !supabaseServiceKey) {
      return new Response(JSON.stringify({ error: 'Configuração do Supabase incompleta' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const authHeader = req.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return new Response(JSON.stringify({ error: 'Autenticação necessária' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const token = authHeader.replace('Bearer ', '');
    const supabaseClient = createClient(supabaseUrl, supabaseServiceKey);

    const { data: userData, error: authError } = await supabaseClient.auth.getUser(token);
    if (authError || !userData?.user) {
      return new Response(JSON.stringify({ error: 'Token inválido ou usuário não autenticado' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const userId = userData.user.id;
    const userEmail = userData.user.email || '';

    if (!(await checkPermission(supabaseClient, userId, userEmail))) {
      return new Response(JSON.stringify({ error: 'Usuário não tem permissão para gerar link de proposta' }), {
        status: 403,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const body = await req.json() as { proposal_id?: string };
    if (!body.proposal_id) {
      return new Response(JSON.stringify({ error: 'proposal_id é obrigatório' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const { data: proposal, error: proposalError } = await supabaseClient
      .from('proposals')
      .select('id, status, lead_id, sent_at, public_token_hash, public_access_enabled, acceptance_status, proflow_project_id')
      .eq('id', body.proposal_id)
      .single();

    if (proposalError || !proposal) {
      return new Response(JSON.stringify({ error: 'Proposta não encontrada' }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (proposal.status === 'accepted') {
      return new Response(JSON.stringify({ error: 'Proposta já foi aceita' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (proposal.proflow_project_id) {
      return new Response(JSON.stringify({ error: 'Proposta já integrada na ProFlow' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    let publicToken = generateToken();
    let tokenHash = await sha256Hash(publicToken);

    // Evitar colisão de hash
    let attempts = 0;
    while (attempts < 5) {
      const { data: existing, error: existingError } = await supabaseClient
        .from('proposals')
        .select('id')
        .eq('public_token_hash', tokenHash)
        .neq('id', proposal.id)
        .maybeSingle();

      if (existingError) {
        console.error('Erro ao verificar hash existente:', existingError);
        break;
      }

      if (!existing) break;

      publicToken = generateToken();
      tokenHash = await sha256Hash(publicToken);
      attempts++;
    }

    const now = new Date().toISOString();
    const { error: updateError } = await supabaseClient
      .from('proposals')
      .update({
        public_token_hash: tokenHash,
        public_access_enabled: true,
        public_sent_at: now,
        acceptance_status: 'sent',
        status: proposal.status === 'draft' ? 'sent' : proposal.status,
        sent_at: proposal.status === 'draft' ? now : proposal.sent_at,
      })
      .eq('id', proposal.id);

    if (updateError) {
      console.error('Erro ao atualizar proposta:', updateError);
      return new Response(JSON.stringify({ error: 'Falha ao gerar link público' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Registrar atividade de envio
    try {
      await supabaseClient.from('lead_activities').insert([{
        lead_id: proposal.lead_id,
        type: 'proposta',
        description: 'Proposta enviada ao cliente via link público.',
        created_by: userId,
      }]);
    } catch (err) {
      console.error('Erro ao registrar atividade de envio:', err);
    }

    const publicUrl = `${PUBLIC_SITE_URL}/proposta/${publicToken}`;

    return new Response(JSON.stringify({
      success: true,
      public_url: publicUrl,
      public_token: publicToken,
      proposal_id: proposal.id,
    }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Edge function error:', err);
    return new Response(JSON.stringify({
      error: 'Erro interno no servidor',
      details: err instanceof Error ? err.message : 'Erro desconhecido',
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
