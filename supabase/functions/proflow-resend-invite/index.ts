// supabase/functions/proflow-resend-invite/index.ts
// Reenvia convite de acesso à ProFlow.pro para cliente de projeto PyScript

/// <reference path="../types/deno.d.ts" />

import { createClient } from '@supabase/supabase-js';
import { corsHeaders } from '../_shared/cors.ts';

interface Proposal {
  id: string;
  lead_id: string;
  proflow_project_id: string | null;
  proflow_client_email: string | null;
  proflow_sync_status: string;
}

async function callProFlowResendInvite(email: string, projectId: string, token: string): Promise<{ response: Response; body: unknown }> {
  const apiUrl = Deno.env.get('PROFLOW_API_URL') || 'https://api.proflow.pro';
  const endpoint = '/api/v1/users/pyscript/resend-invite/';

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 20000);

  try {
    const response = await fetch(`${apiUrl}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        email,
        project_id: projectId,
      }),
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    const body = await response.json().catch(() => null);
    return { response, body };
  } catch (err) {
    clearTimeout(timeoutId);
    throw err;
  }
}

async function refreshProFlowToken(refreshToken: string): Promise<{ success: boolean; token?: string; error?: string }> {
  try {
    const apiUrl = Deno.env.get('PROFLOW_API_URL') || 'https://api.proflow.pro';
    const response = await fetch(`${apiUrl}/api/v1/token/refresh/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh: refreshToken }),
    });

    if (!response.ok) {
      return { success: false, error: `Refresh failed: ${response.status}` };
    }

    const data = await response.json();
    if (data.access) {
      return { success: true, token: data.access };
    }

    return { success: false, error: 'No access token in refresh response' };
  } catch (err) {
    return { success: false, error: err instanceof Error ? err.message : 'Unknown refresh error' };
  }
}

async function resendInvite(email: string, projectId: string): Promise<{ success: boolean; httpStatus: number; error?: string }> {
  let token = Deno.env.get('PROFLOW_SERVICE_TOKEN') || '';
  const refreshToken = Deno.env.get('PROFLOW_REFRESH_TOKEN') || '';

  let callResult: { response: Response; body: unknown };
  try {
    callResult = await callProFlowResendInvite(email, projectId, token);
  } catch (err) {
    if ((err as Error).name === 'AbortError') {
      return { success: false, httpStatus: 0, error: 'ProFlow API timeout (20s)' };
    }
    throw err;
  }

  let { response, body } = callResult;

  if (response.status === 401 && refreshToken) {
    const refresh = await refreshProFlowToken(refreshToken);
    if (refresh.success && refresh.token) {
      token = refresh.token;
      try {
        const retry = await callProFlowResendInvite(email, projectId, token);
        response = retry.response;
        body = retry.body;
      } catch (err) {
        if ((err as Error).name === 'AbortError') {
          return { success: false, httpStatus: 0, error: 'ProFlow API timeout (20s)' };
        }
        throw err;
      }
    }
  }

  if (!response.ok) {
    const errorBody = body as Record<string, unknown> | null;
    return {
      success: false,
      httpStatus: response.status,
      error: (errorBody?.detail as string) || (errorBody?.message as string) || `ProFlow API error: ${response.status}`,
    };
  }

  return { success: true, httpStatus: response.status };
}

async function logIntegration(
  supabase: any,
  params: {
    proposalId: string;
    leadId: string;
    event: string;
    status: string;
    httpStatus?: number;
    message?: string;
    createdBy: string;
  }
): Promise<void> {
  try {
    await supabase.from('proflow_integration_logs').insert([{
      proposal_id: params.proposalId,
      lead_id: params.leadId,
      event: params.event,
      status: params.status,
      http_status: params.httpStatus || null,
      message: params.message || null,
      created_by: params.createdBy,
    }]);
  } catch (err) {
    console.error('Failed to save integration log:', err);
  }
}

async function checkPermission(supabase: any, userId: string, userEmail: string): Promise<{ allowed: boolean; error?: string }> {
  const allowedEmailsRaw = Deno.env.get('PYSCRIPT_ALLOWED_ADMIN_EMAILS') || '';
  const allowedEmails = allowedEmailsRaw
    .split(',')
    .map((email: string) => email.trim().toLowerCase())
    .filter(Boolean);

  if (allowedEmails.length > 0 && allowedEmails.includes(userEmail.toLowerCase())) {
    return { allowed: true };
  }

  const { data: userData, error: userError } = await supabase.auth.admin.getUserById(userId);
  if (userError) {
    return { allowed: false, error: 'Não foi possível verificar permissões do usuário' };
  }

  const role = userData?.user?.user_metadata?.role;
  const allowedRoles = ['admin', 'owner', 'sales_manager', 'project_manager'];
  if (allowedRoles.includes(role)) {
    return { allowed: true };
  }

  return { allowed: false, error: 'Usuário não tem permissão para reenviar convites da ProFlow' };
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

    const permission = await checkPermission(supabaseClient, userId, userEmail);
    if (!permission.allowed) {
      return new Response(JSON.stringify({ error: permission.error }), {
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
      .select('*, leads(id)')
      .eq('id', body.proposal_id)
      .single();

    if (proposalError || !proposal) {
      return new Response(JSON.stringify({ error: 'Proposta não encontrada' }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const proposalData = proposal as Proposal;

    if (!proposalData.proflow_project_id || proposalData.proflow_sync_status !== 'success') {
      return new Response(JSON.stringify({ error: 'Proposta ainda não possui projeto criado na ProFlow' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (!proposalData.proflow_client_email) {
      return new Response(JSON.stringify({ error: 'Email do cliente não encontrado na proposta' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    await logIntegration(supabaseClient, {
      proposalId: proposalData.id,
      leadId: proposalData.lead_id,
      event: 'resend_invite_attempt',
      status: 'pending',
      createdBy: userId,
    });

    const result = await resendInvite(proposalData.proflow_client_email, proposalData.proflow_project_id);

    if (!result.success) {
      await logIntegration(supabaseClient, {
        proposalId: proposalData.id,
        leadId: proposalData.lead_id,
        event: 'resend_invite_failed',
        status: 'failed',
        httpStatus: result.httpStatus,
        message: result.error,
        createdBy: userId,
      });

      return new Response(JSON.stringify({
        error: 'Falha ao reenviar convite',
        details: result.error,
        http_status: result.httpStatus,
      }), {
        status: 502,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    await supabaseClient
      .from('proposals')
      .update({
        proflow_invitation_sent: true,
        proflow_last_attempt_at: new Date().toISOString(),
      })
      .eq('id', proposalData.id);

    await logIntegration(supabaseClient, {
      proposalId: proposalData.id,
      leadId: proposalData.lead_id,
      event: 'resend_invite_success',
      status: 'success',
      httpStatus: result.httpStatus,
      createdBy: userId,
    });

    return new Response(JSON.stringify({
      success: true,
      message: 'Convite reenviado com sucesso',
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
