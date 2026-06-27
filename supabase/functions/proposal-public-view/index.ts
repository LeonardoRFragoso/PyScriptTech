// supabase/functions/proposal-public-view/index.ts
// Retorna dados seguros de uma proposta para visualização pública.

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

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  if (req.method !== 'GET' && req.method !== 'POST') {
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

    let token: string | null = null;
    if (req.method === 'GET') {
      const url = new URL(req.url);
      token = url.searchParams.get('token');
    } else {
      const body = await req.json().catch(() => ({})) as { token?: string };
      token = body.token || null;
    }

    if (!token) {
      return new Response(JSON.stringify({ error: 'Token é obrigatório' }), {
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
        scope,
        items,
        total_value,
        valid_until,
        status,
        acceptance_status,
        public_access_enabled,
        public_viewed_at,
        accepted_at,
        accepted_by_name,
        accepted_by_email,
        acceptance_terms_version,
        leads (name, email, company, phone, segment)
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

    if (proposal.status === 'accepted' || proposal.status === 'rejected') {
      return new Response(JSON.stringify({ error: 'Esta proposta não está mais disponível para aceite' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const now = new Date().toISOString();
    if (!proposal.public_viewed_at) {
      await supabaseClient
        .from('proposals')
        .update({
          public_viewed_at: now,
          acceptance_status: proposal.acceptance_status === 'sent' ? 'viewed' : proposal.acceptance_status,
        })
        .eq('public_token_hash', tokenHash);

      // Registrar atividade de visualização
      try {
        await supabaseClient.from('lead_activities').insert([{
          lead_id: proposal.lead_id,
          type: 'proposta',
          description: 'Cliente visualizou a proposta via link público.',
        }]);
      } catch (err) {
        console.error('Erro ao registrar atividade de visualização:', err);
      }
    }

    const leadArray = proposal.leads as Array<Record<string, unknown>> | null;
    const lead = leadArray && leadArray.length > 0 ? leadArray[0] : {};

    const publicProposal = {
      title: proposal.title,
      scope: proposal.scope,
      items: proposal.items,
      total_value: proposal.total_value,
      valid_until: proposal.valid_until,
      status: proposal.status,
      acceptance_status: proposal.acceptance_status,
      accepted_at: proposal.accepted_at,
      accepted_by_name: proposal.accepted_by_name,
      accepted_by_email: proposal.accepted_by_email,
      terms_version: proposal.acceptance_terms_version,
      can_accept: proposal.status === 'sent' || proposal.status === 'draft',
      client: {
        name: lead.name,
        email: lead.email,
        company: lead.company,
        phone: lead.phone,
        segment: lead.segment,
      },
      pyscript: {
        company_name: 'PyScriptTech',
        email: 'contato@pyscript.tech',
        phone: '(21) 98029-2791',
      },
    };

    return new Response(JSON.stringify({
      success: true,
      proposal: publicProposal,
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
