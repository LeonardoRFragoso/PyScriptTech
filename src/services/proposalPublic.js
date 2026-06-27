import supabase, { isSupabaseConfigured } from './supabaseClient';

const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL || 'https://placeholder.supabase.co';
const PROJECT_REF = SUPABASE_URL.replace('https://', '').replace('.supabase.co', '');

const PUBLIC_FUNCTIONS_URL = `https://${PROJECT_REF}.supabase.co/functions/v1`;

const normalizeError = async (response) => {
  let message = 'Erro na comunicação com o servidor';
  let details = '';
  try {
    const data = await response.json();
    message = data.error || message;
    details = data.details || '';
  } catch {
    // ignore
  }
  const error = new Error(message);
  error.details = details;
  error.status = response.status;
  throw error;
};

export const generatePublicProposalLink = async (proposalId) => {
  if (!isSupabaseConfigured()) {
    throw new Error('Supabase não está configurado.');
  }

  const { data, error } = await supabase.functions.invoke('proposal-generate-public-link', {
    body: { proposal_id: proposalId },
  });

  if (error) {
    let message = error.message || 'Erro ao gerar link público';
    let details = '';
    try {
      const parsed = JSON.parse(error.message);
      if (parsed.error) {
        message = parsed.error;
        details = parsed.details || '';
      }
    } catch {
      // ignore
    }
    const err = new Error(message);
    err.details = details;
    err.status = error.status || error.statusCode;
    throw err;
  }

  return data;
};

export const getPublicProposal = async (token) => {
  if (!token) {
    throw new Error('Token da proposta é obrigatório.');
  }

  const response = await fetch(
    `${PUBLIC_FUNCTIONS_URL}/proposal-public-view?token=${encodeURIComponent(token)}`,
    {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    }
  );

  if (!response.ok) {
    await normalizeError(response);
  }

  return response.json();
};

export const acceptPublicProposal = async (token, { name, email, acceptedTerms }) => {
  if (!token) {
    throw new Error('Token da proposta é obrigatório.');
  }

  const response = await fetch(`${PUBLIC_FUNCTIONS_URL}/proposal-public-accept`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      token,
      name,
      email,
      accepted_terms: acceptedTerms,
    }),
  });

  if (!response.ok) {
    await normalizeError(response);
  }

  return response.json();
};
