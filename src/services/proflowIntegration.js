import supabase, { isSupabaseConfigured } from './supabaseClient';

const logAnalyticsEvent = (eventName, data = {}) => {
  if (window.gtag) {
    window.gtag('event', eventName, {
      event_category: 'proflow_integration',
      ...data,
    });
  }
};

const normalizeEdgeFunctionError = (error) => {
  if (!error) {
    return new Error('Erro desconhecido na comunicação com a ProFlow.');
  }

  // Supabase FunctionsError pode conter a resposta da Edge Function em error.message
  // ou em error.context. Tentamos extrair o JSON retornado.
  let message = error.message || 'Erro na integração com ProFlow.';
  let details = '';
  let status = error.status || error.statusCode || '';

  try {
    const parsed = JSON.parse(error.message);
    if (parsed.error) {
      message = parsed.error;
      details = parsed.details || '';
      status = parsed.http_status || status;
    }
  } catch {
    // error.message não é JSON, manter como está
  }

  const normalizedError = new Error(message);
  normalizedError.details = details;
  normalizedError.status = status;
  normalizedError.originalError = error;
  return normalizedError;
};

export const createProFlowProject = async (proposalId, leadId) => {
  if (!isSupabaseConfigured()) {
    throw new Error('Supabase não está configurado. A integração com ProFlow requer Supabase.');
  }

  logAnalyticsEvent('proflow_project_create_attempt', { proposal_id: proposalId });

  try {
    const { data, error } = await supabase.functions.invoke('proflow-create-project', {
      body: { lead_id: leadId, proposal_id: proposalId },
    });

    if (error) {
      const normalized = normalizeEdgeFunctionError(error);
      logAnalyticsEvent('proflow_project_create_failed', { proposal_id: proposalId, error: normalized.message });
      throw normalized;
    }

    logAnalyticsEvent('proflow_project_create_success', { proposal_id: proposalId, project_id: data.project_id });
    return data;
  } catch (error) {
    const normalized = normalizeEdgeFunctionError(error);
    logAnalyticsEvent('proflow_project_create_failed', { proposal_id: proposalId, error: normalized.message });
    throw normalized;
  }
};

export const resendProFlowInvite = async (proposalId) => {
  if (!isSupabaseConfigured()) {
    throw new Error('Supabase não está configurado.');
  }

  logAnalyticsEvent('proflow_invite_resend_attempt', { proposal_id: proposalId });

  try {
    const { data, error } = await supabase.functions.invoke('proflow-resend-invite', {
      body: { proposal_id: proposalId },
    });

    if (error) {
      const normalized = normalizeEdgeFunctionError(error);
      logAnalyticsEvent('proflow_invite_resend_failed', { proposal_id: proposalId, error: normalized.message });
      throw normalized;
    }

    logAnalyticsEvent('proflow_invite_resend_success', { proposal_id: proposalId });
    return data;
  } catch (error) {
    const normalized = normalizeEdgeFunctionError(error);
    logAnalyticsEvent('proflow_invite_resend_failed', { proposal_id: proposalId, error: normalized.message });
    throw normalized;
  }
};

export const getProFlowIntegrationLogs = async (proposalId) => {
  if (!isSupabaseConfigured()) {
    return [];
  }

  const { data, error } = await supabase
    .from('proflow_integration_logs')
    .select('*')
    .eq('proposal_id', proposalId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
};
