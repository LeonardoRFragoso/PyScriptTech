// supabase/functions/proflow-create-project/index.ts
// Cria projeto real na ProFlow.pro a partir de proposta aceita na PyScript.Tech
// Runtime: Deno (Supabase Edge Functions). Tipos Deno são providos pelo runtime.
/// <reference path="../types/deno.d.ts" />

import { createClient } from '@supabase/supabase-js';
import { corsHeaders } from '../_shared/cors.ts';

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  role: string | null;
  segment: string | null;
  employees: string | null;
  problem: string | null;
  interests: string[] | null;
  notes: string | null;
}

interface ProposalItem {
  description?: string;
  name?: string;
  value?: number;
}

interface DefaultMilestoneItem {
  description: string;
  value: number;
}

interface Proposal {
  id: string;
  lead_id: string;
  title: string;
  scope: string | null;
  items: ProposalItem[];
  total_value: number;
  status: string;
  valid_until: string | null;
  proflow_project_id: string | null;
  proflow_sync_status: string;
  created_by: string | null;
}

interface ProFlowMilestone {
  title: string;
  description: string;
  amount: number;
  due_date: string;
  order: number;
}

interface ProFlowPayload {
  external_pyscript_lead_id: string;
  external_pyscript_proposal_id: string;
  client: {
    name: string;
    email: string;
    phone: string;
    company: string;
    segment: string;
    employees: string;
  };
  project: {
    title: string;
    description: string;
    category: string;
    subcategory: string;
    budget: number;
    budget_type: string;
    final_price: number;
    deadline: string;
    visibility: string;
    status: string;
    skills_required: string[];
  };
  milestones: ProFlowMilestone[];
  assigned_freelancer_id: null;
  manager_notes: string;
}

interface ProFlowSuccessResponse {
  project_id: string;
  contract_id: string;
  milestone_ids: string[];
  client_email: string;
  client_status: string;
  invitation_sent: boolean;
  portal_url?: string;
}

const SEGMENT_TO_INDUSTRY: Record<string, string> = {
  'Logística': 'logistics',
  'Transporte': 'logistics',
  'Saúde': 'health',
  'Serviços': 'services',
  'Indústria': 'other',
  'Varejo': 'retail',
  'Tecnologia': 'technology',
  'Fintech': 'other',
  'Imóveis': 'other',
  'Energia': 'other',
  'Saneamento': 'other',
  'Outro': 'other',
};

const INTEREST_TO_CATEGORY: Record<string, { category: string; subcategory: string }> = {
  'IA': { category: 'data', subcategory: 'machine_learning' },
  'Automação': { category: 'data', subcategory: 'data_analysis' },
  'Automação de Processos': { category: 'data', subcategory: 'data_analysis' },
  'ERP': { category: 'web_dev', subcategory: 'fullstack' },
  'CRM': { category: 'web_dev', subcategory: 'fullstack' },
  'Integrações': { category: 'web_dev', subcategory: 'api' },
  'Dashboard': { category: 'data', subcategory: 'data_visualization' },
  'Sistema Corporativo': { category: 'web_dev', subcategory: 'fullstack' },
  'Inteligência Artificial': { category: 'data', subcategory: 'machine_learning' },
  'Software sob Medida': { category: 'web_dev', subcategory: 'fullstack' },
};

const DEFAULT_MILESTONES = [
  { title: 'Diagnóstico técnico', percent: 10 },
  { title: 'Arquitetura da solução', percent: 10 },
  { title: 'Desenvolvimento MVP', percent: 40 },
  { title: 'Integrações', percent: 20 },
  { title: 'Testes e Homologação', percent: 12 },
  { title: 'Deploy e Suporte', percent: 8 },
];

function buildProFlowPayload(lead: Lead, proposal: Proposal): ProFlowPayload {
  const totalValue = Number(proposal.total_value) || 0;
  const items: (ProposalItem | DefaultMilestoneItem)[] = Array.isArray(proposal.items) && proposal.items.length > 0
    ? proposal.items
    : DEFAULT_MILESTONES.map(m => ({ description: m.title, value: (totalValue * m.percent) / 100 }));

  const interest = Array.isArray(lead.interests) && lead.interests.length > 0
    ? lead.interests[0]
    : 'Sistema Corporativo';
  const categoryMapping = INTEREST_TO_CATEGORY[interest] || INTEREST_TO_CATEGORY['Sistema Corporativo'];

  const deadline = proposal.valid_until
    ? new Date(proposal.valid_until).toISOString().split('T')[0]
    : new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  const milestones: ProFlowMilestone[] = items.map((item, index) => {
    const title = 'name' in item ? (item.name || item.description || `Etapa ${index + 1}`) : (item.description || `Etapa ${index + 1}`);
    return {
      title,
      description: item.description || '',
      amount: Number(item.value) || 0,
      due_date: deadline,
      order: index + 1,
    };
  });

  // Ajustar último milestone para garantir soma exata (evitar centavos de diferença)
  const milestonesSum = milestones.reduce((sum, m) => sum + m.amount, 0);
  if (milestones.length > 0 && totalValue > 0 && Math.abs(milestonesSum - totalValue) > 0.01) {
    milestones[milestones.length - 1].amount += totalValue - milestonesSum;
  }

  return {
    external_pyscript_lead_id: lead.id,
    external_pyscript_proposal_id: proposal.id,
    client: {
      name: lead.name,
      email: lead.email,
      phone: lead.phone || '',
      company: lead.company || 'Não informado',
      segment: lead.segment || 'Outro',
      employees: lead.employees || '',
    },
    project: {
      title: proposal.title || `${lead.company || 'Projeto'} - ${lead.segment || 'Sistema'}`,
      description: proposal.scope || lead.problem || 'Projeto aprovado pela PyScript.Tech',
      category: categoryMapping.category,
      subcategory: categoryMapping.subcategory,
      budget: totalValue,
      budget_type: 'fixed',
      final_price: totalValue,
      deadline,
      visibility: 'private',
      status: 'in_progress',
      skills_required: Array.isArray(lead.interests) ? lead.interests : [],
    },
    milestones,
    assigned_freelancer_id: null,
    manager_notes: `Projeto criado pela PyScript.Tech. Lead: ${lead.id}, Proposta: ${proposal.id}`,
  };
}

function sanitizePayloadForLog(payload: ProFlowPayload): Record<string, unknown> {
  return {
    external_pyscript_lead_id: payload.external_pyscript_lead_id,
    external_pyscript_proposal_id: payload.external_pyscript_proposal_id,
    client_email_domain: payload.client.email?.split('@')[1] || 'unknown',
    client_name_initial: (payload.client.name?.[0] || '?') + '***',
    project_title: payload.project.title,
    project_budget: payload.project.budget,
    milestones_count: payload.milestones.length,
  };
}

function sanitizeResponseForLog(response: ProFlowSuccessResponse): Record<string, unknown> {
  return {
    project_id: response.project_id,
    contract_id: response.contract_id,
    milestone_ids_count: response.milestone_ids?.length || 0,
    client_email_domain: response.client_email?.split('@')[1] || 'unknown',
    client_status: response.client_status,
    invitation_sent: response.invitation_sent,
    portal_url: response.portal_url,
  };
}

async function callProFlowCreate(payload: ProFlowPayload, token: string): Promise<{ response: Response; body: unknown }> {
  const apiUrl = Deno.env.get('PROFLOW_API_URL') || 'https://api.proflow.pro';
  const endpoint = Deno.env.get('PROFLOW_PYSCRIPT_ENDPOINT') || '/api/v1/projects/pyscript/';

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 20000);

  try {
    const response = await fetch(`${apiUrl}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
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

async function createProFlowProject(payload: ProFlowPayload): Promise<{ success: boolean; data?: ProFlowSuccessResponse; httpStatus: number; error?: string }> {
  let token = Deno.env.get('PROFLOW_SERVICE_TOKEN') || '';
  const refreshToken = Deno.env.get('PROFLOW_REFRESH_TOKEN') || '';

  let callResult: { response: Response; body: unknown };
  try {
    callResult = await callProFlowCreate(payload, token);
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
        const retry = await callProFlowCreate(payload, token);
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

  const data = body as ProFlowSuccessResponse;

  // Build portal URL if not returned
  const portalUrl = data.portal_url || `${Deno.env.get('PROFLOW_PORTAL_URL') || 'https://proflow.pro'}/projects/${data.project_id}`;

  return {
    success: true,
    httpStatus: response.status,
    data: {
      ...data,
      portal_url: portalUrl,
    },
  };
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
    request?: ProFlowPayload;
    response?: ProFlowSuccessResponse;
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
      request_payload_safe: params.request ? sanitizePayloadForLog(params.request) : null,
      response_payload_safe: params.response ? sanitizeResponseForLog(params.response) : null,
      created_by: params.createdBy,
    }]);
  } catch (err) {
    console.error('Failed to save integration log:', err);
  }
}

function validateRequest(body: { lead_id?: string; proposal_id?: string }): string[] {
  const errors: string[] = [];
  if (!body.lead_id) errors.push('lead_id é obrigatório');
  if (!body.proposal_id) errors.push('proposal_id é obrigatório');
  return errors;
}

function validateBusiness(lead: Lead, proposal: Proposal): string[] {
  const errors: string[] = [];

  if (proposal.status !== 'accepted') {
    errors.push('A proposta deve estar com status "accepted" para criar projeto na ProFlow');
  }

  if (proposal.proflow_project_id || proposal.proflow_sync_status === 'success') {
    errors.push('Projeto já foi criado na ProFlow');
  }

  if (!lead.name?.trim()) errors.push('Lead não possui nome');
  if (!lead.email?.trim()) errors.push('Lead não possui email');
  if (!proposal.title?.trim()) errors.push('Proposta não possui título');
  if (!proposal.scope?.trim() && !lead.problem?.trim()) errors.push('Proposta não possui escopo e lead não possui descrição do problema');
  if (!proposal.total_value || Number(proposal.total_value) <= 0) errors.push('Proposta não possui valor válido');
  if (!proposal.valid_until) errors.push('Proposta não possui data de prazo/validade');

  return errors;
}

async function checkPermission(supabase: any, userId: string, userEmail: string): Promise<{ allowed: boolean; error?: string }> {
  // Verifica lista de emails autorizados
  const allowedEmailsRaw = Deno.env.get('PYSCRIPT_ALLOWED_ADMIN_EMAILS') || '';
  const allowedEmails = allowedEmailsRaw
    .split(',')
    .map((email: string) => email.trim().toLowerCase())
    .filter(Boolean);

  if (allowedEmails.length > 0 && allowedEmails.includes(userEmail.toLowerCase())) {
    return { allowed: true };
  }

  // Verifica metadata do usuário
  const { data: userData, error: userError } = await supabase.auth.admin.getUserById(userId);
  if (userError) {
    return { allowed: false, error: 'Não foi possível verificar permissões do usuário' };
  }

  const role = userData?.user?.user_metadata?.role;
  const allowedRoles = ['admin', 'owner', 'sales_manager', 'project_manager'];
  if (allowedRoles.includes(role)) {
    return { allowed: true };
  }

  return { allowed: false, error: 'Usuário não tem permissão para criar projetos na ProFlow' };
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

    const body = await req.json() as { lead_id?: string; proposal_id?: string };
    const validationErrors = validateRequest(body);
    if (validationErrors.length > 0) {
      return new Response(JSON.stringify({ error: 'Dados inválidos', details: validationErrors }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const { lead_id: rawLeadId, proposal_id: rawProposalId } = body;
    const leadId = rawLeadId as string;
    const proposalId = rawProposalId as string;

    // Buscar proposta e lead
    const { data: proposal, error: proposalError } = await supabaseClient
      .from('proposals')
      .select('*, leads(*)')
      .eq('id', proposalId)
      .single();

    if (proposalError || !proposal) {
      return new Response(JSON.stringify({ error: 'Proposta não encontrada' }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const lead = proposal.leads as Lead;

    if (lead.id !== leadId) {
      return new Response(JSON.stringify({ error: 'Lead informado não corresponde à proposta' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const businessErrors = validateBusiness(lead, proposal);
    if (businessErrors.length > 0) {
      return new Response(JSON.stringify({ error: 'Validação de negócio', details: businessErrors }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Atualizar status para pending
    await supabaseClient
      .from('proposals')
      .update({
        proflow_sync_status: 'pending',
        proflow_last_attempt_at: new Date().toISOString(),
      })
      .eq('id', proposalId);

    // Montar payload
    const payload = buildProFlowPayload(lead, proposal);

    // Chamar ProFlow
    const result = await createProFlowProject(payload);

    if (!result.success || !result.data) {
      await supabaseClient
        .from('proposals')
        .update({
          proflow_sync_status: 'failed',
          proflow_sync_error: result.error || 'Erro desconhecido',
          proflow_last_attempt_at: new Date().toISOString(),
        })
        .eq('id', proposalId);

      await logIntegration(supabaseClient, {
        proposalId,
        leadId: lead.id,
        event: 'create_project_attempt',
        status: 'failed',
        httpStatus: result.httpStatus,
        message: result.error,
        request: payload,
        createdBy: userId,
      });

      return new Response(JSON.stringify({
        error: 'Falha ao criar projeto na ProFlow',
        details: result.error,
        http_status: result.httpStatus,
      }), {
        status: 502,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Salvar sucesso
    const responseData = result.data;
    await supabaseClient
      .from('proposals')
      .update({
        proflow_project_id: responseData.project_id,
        proflow_contract_id: responseData.contract_id,
        proflow_milestone_ids: responseData.milestone_ids || [],
        proflow_portal_url: responseData.portal_url,
        proflow_client_email: responseData.client_email,
        proflow_client_status: responseData.client_status,
        proflow_invitation_sent: responseData.invitation_sent,
        proflow_sync_status: 'success',
        proflow_sync_error: null,
        proflow_synced_at: new Date().toISOString(),
        proflow_last_attempt_at: new Date().toISOString(),
      })
      .eq('id', proposalId);

    await logIntegration(supabaseClient, {
      proposalId,
      leadId: lead.id,
      event: 'create_project_success',
      status: 'success',
      httpStatus: result.httpStatus,
      request: payload,
      response: responseData,
      createdBy: userId,
    });

    return new Response(JSON.stringify({
      success: true,
      project_id: responseData.project_id,
      contract_id: responseData.contract_id,
      portal_url: responseData.portal_url,
      client_email: responseData.client_email,
      client_status: responseData.client_status,
      invitation_sent: responseData.invitation_sent,
      milestone_ids: responseData.milestone_ids,
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
