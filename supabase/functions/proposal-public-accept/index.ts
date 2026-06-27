// supabase/functions/proposal-public-accept/index.ts
// Aceite digital público de uma proposta. Não requer autenticação, apenas token.

/// <reference path="../types/deno.d.ts" />

import { createClient } from '@supabase/supabase-js';
import { corsHeaders } from '../_shared/cors.ts';

async function sha256Hash(text: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

function sanitizeEmail(email: string): string {
  return email.trim().toLowerCase();
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

    const body = await req.json() as {
      token?: string;
      name?: string;
      email?: string;
      accepted_terms?: boolean;
    };

    const token = body.token;
    const name = (body.name || '').trim();
    const email = sanitizeEmail(body.email || '');
    const acceptedTerms = body.accepted_terms === true;

    if (!token) {
      return new Response(JSON.stringify({ error: 'Token é obrigatório' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (!name || !email) {
      return new Response(JSON.stringify({ error: 'Nome e email são obrigatórios' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (!acceptedTerms) {
      return new Response(JSON.stringify({ error: 'É necessário aceitar os termos para prosseguir' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const tokenHash = await sha256Hash(token);
    const supabaseClient = createClient(supabaseUrl, supabaseServiceKey);

    const { data: proposal, error: proposalError } = await supabaseClient
      .from('proposals')
      .select(`
        id,
        lead_id,
        title,
        status,
        acceptance_status,
        public_access_enabled,
        accepted_at,
        accepted_by_email,
        public_token_hash,
        leads (name, email)
      `)
      .eq('public_token_hash', tokenHash)
      .single();

    if (proposalError || !proposal) {
      return new Response(JSON.stringify({ error: 'Proposta não encontrada ou token inválido' }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (!proposal.public_access_enabled) {
      return new Response(JSON.stringify({ error: 'Acesso à proposta foi revogado' }), {
        status: 403,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (proposal.status === 'accepted') {
      return new Response(JSON.stringify({ error: 'Esta proposta já foi aceita' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (proposal.status === 'rejected' || proposal.status === 'expired') {
      return new Response(JSON.stringify({ error: 'Esta proposta não pode mais ser aceita' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const leadArray = proposal.leads as Array<{ name?: string; email?: string }> | null;
    const lead = leadArray && leadArray.length > 0 ? leadArray[0] : null;
    const leadEmail = lead?.email ? sanitizeEmail(lead.email) : null;

    if (leadEmail && email !== leadEmail) {
      return new Response(JSON.stringify({ error: 'O email informado não corresponde ao email do lead cadastrado' }), {
        status: 403,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const now = new Date().toISOString();
    const userAgent = req.headers.get('user-agent') || null;
    const clientIp = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || null;

    const { error: updateError } = await supabaseClient
      .from('proposals')
      .update({
        status: 'accepted',
        acceptance_status: 'accepted',
        accepted_at: now,
        accepted_by_name: name,
        accepted_by_email: email,
        accepted_ip: clientIp,
        accepted_user_agent: userAgent,
      })
      .eq('public_token_hash', tokenHash);

    if (updateError) {
      console.error('Erro ao atualizar proposta:', updateError);
      return new Response(JSON.stringify({ error: 'Falha ao registrar aceite da proposta' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Atualizar lead para etapa de fechamento
    try {
      await supabaseClient
        .from('leads')
        .update({ stage: 'fechado', updated_at: now })
        .eq('id', proposal.lead_id);
    } catch (err) {
      console.error('Erro ao atualizar estágio do lead:', err);
    }

    // Registrar atividade de aceite
    try {
      await supabaseClient.from('lead_activities').insert([{
        lead_id: proposal.lead_id,
        type: 'proposta',
        description: `Cliente aceitou a proposta "${proposal.title}" digitalmente. Email: ${email}`,
      }]);
    } catch (err) {
      console.error('Erro ao registrar atividade de aceite:', err);
    }

    return new Response(JSON.stringify({
      success: true,
      message: 'Proposta aceita com sucesso',
      proposal_id: proposal.id,
      status: 'accepted',
      accepted_at: now,
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
