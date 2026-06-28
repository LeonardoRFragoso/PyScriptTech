import { supabase, isSupabaseConfigured } from './supabaseClient';

// ============================================================
// LEADS
// ============================================================

const LEADS_STORAGE_KEY = 'pyscript_leads';

const getLocalLeads = () => {
  try {
    return JSON.parse(localStorage.getItem(LEADS_STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
};

const setLocalLeads = (leads) => {
  localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(leads));
};

export const getLeads = async (filters = {}) => {
  if (isSupabaseConfigured()) {
    let query = supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false });

    if (filters.stage) query = query.eq('stage', filters.stage);
    if (filters.source) query = query.eq('source', filters.source);
    if (filters.segment) query = query.eq('segment', filters.segment);
    if (filters.priority) query = query.eq('priority', filters.priority);
    if (filters.search) {
      query = query.or(`name.ilike.%${filters.search}%,email.ilike.%${filters.search}%,company.ilike.%${filters.search}%`);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  }

  // Fallback localStorage
  let leads = getLocalLeads();
  if (filters.stage) leads = leads.filter(l => l.stage === filters.stage);
  if (filters.source) leads = leads.filter(l => l.source === filters.source);
  if (filters.segment) leads = leads.filter(l => l.segment === filters.segment);
  if (filters.priority) leads = leads.filter(l => l.priority === filters.priority);
  if (filters.search) {
    const search = filters.search.toLowerCase();
    leads = leads.filter(l => 
      (l.name || '').toLowerCase().includes(search) ||
      (l.email || '').toLowerCase().includes(search) ||
      (l.company || '').toLowerCase().includes(search)
    );
  }
  return leads.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
};

export const getLeadById = async (id) => {
  if (isSupabaseConfigured()) {
    const { data, error } = await supabase.from('leads').select('*').eq('id', id).single();
    if (error) throw error;
    return data;
  }

  return getLocalLeads().find(l => l.id === id) || null;
};

export const createLead = async (lead) => {
  const leadData = {
    ...lead,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  if (isSupabaseConfigured()) {
    const { data, error } = await supabase.from('leads').insert([leadData]).select().single();
    if (error) throw error;
    return data;
  }

  const leads = getLocalLeads();
  const newLead = { ...leadData, id: Date.now().toString() };
  leads.push(newLead);
  setLocalLeads(leads);
  return newLead;
};

export const updateLead = async (id, updates) => {
  const updateData = {
    ...updates,
    updated_at: new Date().toISOString(),
  };

  if (isSupabaseConfigured()) {
    const { data, error } = await supabase.from('leads').update(updateData).eq('id', id).select().single();
    if (error) throw error;
    return data;
  }

  const leads = getLocalLeads();
  const index = leads.findIndex(l => l.id === id);
  if (index === -1) throw new Error('Lead not found');
  leads[index] = { ...leads[index], ...updateData };
  setLocalLeads(leads);
  return leads[index];
};

export const deleteLead = async (id) => {
  if (isSupabaseConfigured()) {
    const { error } = await supabase.from('leads').delete().eq('id', id);
    if (error) throw error;
    return true;
  }

  const leads = getLocalLeads().filter(l => l.id !== id);
  setLocalLeads(leads);
  return true;
};

export const moveLeadStage = async (id, newStage) => {
  return updateLead(id, { stage: newStage });
};

// ============================================================
// LEAD ACTIVITIES
// ============================================================

const ACTIVITIES_STORAGE_KEY = 'pyscript_lead_activities';

const getLocalActivities = () => {
  try {
    return JSON.parse(localStorage.getItem(ACTIVITIES_STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
};

const setLocalActivities = (activities) => {
  localStorage.setItem(ACTIVITIES_STORAGE_KEY, JSON.stringify(activities));
};

export const getLeadActivities = async (leadId) => {
  if (isSupabaseConfigured()) {
    const { data, error } = await supabase
      .from('lead_activities')
      .select('*')
      .eq('lead_id', leadId)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  }

  return getLocalActivities()
    .filter(a => a.lead_id === leadId)
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
};

export const createLeadActivity = async (activity) => {
  const activityData = {
    ...activity,
    created_at: new Date().toISOString(),
  };

  if (isSupabaseConfigured()) {
    const { data, error } = await supabase.from('lead_activities').insert([activityData]).select().single();
    if (error) throw error;
    return data;
  }

  const activities = getLocalActivities();
  const newActivity = { ...activityData, id: Date.now().toString() };
  activities.push(newActivity);
  setLocalActivities(activities);
  return newActivity;
};

export const deleteLeadActivity = async (id) => {
  if (isSupabaseConfigured()) {
    const { error } = await supabase.from('lead_activities').delete().eq('id', id);
    if (error) throw error;
    return true;
  }

  const activities = getLocalActivities().filter(a => a.id !== id);
  setLocalActivities(activities);
  return true;
};

// ============================================================
// PROPOSALS
// ============================================================

const PROPOSALS_STORAGE_KEY = 'pyscript_proposals';

const getLocalProposals = () => {
  try {
    return JSON.parse(localStorage.getItem(PROPOSALS_STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
};

const setLocalProposals = (proposals) => {
  localStorage.setItem(PROPOSALS_STORAGE_KEY, JSON.stringify(proposals));
};

export const getProposals = async (filters = {}) => {
  if (isSupabaseConfigured()) {
    let query = supabase.from('proposals').select('*, leads(name, company)').order('created_at', { ascending: false });
    if (filters.status) query = query.eq('status', filters.status);
    if (filters.lead_id) query = query.eq('lead_id', filters.lead_id);
    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  }

  let proposals = getLocalProposals();
  if (filters.status) proposals = proposals.filter(p => p.status === filters.status);
  if (filters.lead_id) proposals = proposals.filter(p => p.lead_id === filters.lead_id);
  return proposals.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
};

export const getProposalById = async (id) => {
  if (isSupabaseConfigured()) {
    const { data, error } = await supabase.from('proposals').select('*, leads(name, company)').eq('id', id).single();
    if (error) throw error;
    return data;
  }

  return getLocalProposals().find(p => p.id === id) || null;
};

export const createProposal = async (proposal) => {
  const proposalData = {
    ...proposal,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  if (isSupabaseConfigured()) {
    const { data, error } = await supabase.from('proposals').insert([proposalData]).select().single();
    if (error) throw error;
    return data;
  }

  const proposals = getLocalProposals();
  const newProposal = { ...proposalData, id: Date.now().toString() };
  proposals.push(newProposal);
  setLocalProposals(proposals);
  return newProposal;
};

export const updateProposal = async (id, updates) => {
  const updateData = {
    ...updates,
    updated_at: new Date().toISOString(),
  };

  if (isSupabaseConfigured()) {
    const { data, error } = await supabase.from('proposals').update(updateData).eq('id', id).select().single();
    if (error) throw error;
    return data;
  }

  const proposals = getLocalProposals();
  const index = proposals.findIndex(p => p.id === id);
  if (index === -1) throw new Error('Proposal not found');
  proposals[index] = { ...proposals[index], ...updateData };
  setLocalProposals(proposals);
  return proposals[index];
};

export const deleteProposal = async (id) => {
  if (isSupabaseConfigured()) {
    const { error } = await supabase.from('proposals').delete().eq('id', id);
    if (error) throw error;
    return true;
  }

  const proposals = getLocalProposals().filter(p => p.id !== id);
  setLocalProposals(proposals);
  return true;
};

export const generateProposalText = (proposal, lead) => {
  const items = Array.isArray(proposal.items) ? proposal.items : [];
  const itemsText = items.map((item, i) => `${i + 1}. ${item.description || item.name} - ${(item.value || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`).join('\n');

  return `PROPOSTA COMERCIAL - ${proposal.title}

Para: ${lead.company}
Contato: ${lead.name} (${lead.email})

1. CONTEXTO DO PROBLEMA
${lead.problem || 'Não informado.'}

2. SOLUÇÃO PROPOSTA
${proposal.scope || 'Não informado.'}

3. ESCOPO
${itemsText}

4. INVESTIMENTO
Total: ${(proposal.total_value || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
${proposal.valid_until ? `Válida até: ${new Date(proposal.valid_until).toLocaleDateString('pt-BR')}` : ''}

5. PRÓXIMOS PASSOS
Aguardar aprovação para iniciar o kickoff do projeto.

PyScript.tech
Automação, IA e Sistemas Corporativos
contato@pyscript.tech | (21) 98029-2791
`;
};

// ============================================================
// PROFLOW INTEGRATION
// ============================================================

const SEGMENT_TO_INDUSTRY = {
  'Logística': 'logistics',
  'Transporte': 'logistics',
  'Saúde': 'health',
  'Serviços': 'services',
  'Indústria': 'other',
  'Varejo': 'retail',
  'Tecnologia': 'technology',
  'Outro': 'other',
};

const EMPLOYEES_TO_SIZE = {
  '1-10': 'small',
  '11-20': 'small',
  '21-50': 'medium',
  '51-100': 'medium',
  '101-200': 'large',
  '200+': 'enterprise',
};

const INTEREST_TO_CATEGORY = {
  'IA': { category: 'data', subcategory: 'machine_learning' },
  'Automação': { category: 'data', subcategory: 'data_analysis' },
  'ERP': { category: 'web_dev', subcategory: 'fullstack' },
  'CRM': { category: 'web_dev', subcategory: 'fullstack' },
  'Integrações': { category: 'web_dev', subcategory: 'api' },
  'Dashboard': { category: 'data', subcategory: 'data_visualization' },
  'Sistema Corporativo': { category: 'web_dev', subcategory: 'fullstack' },
};

const DEFAULT_MILESTONES = [
  { title: 'Diagnóstico técnico', percent: 10 },
  { title: 'Arquitetura da solução', percent: 10 },
  { title: 'Desenvolvimento MVP', percent: 40 },
  { title: 'Integrações', percent: 20 },
  { title: 'Testes e Homologação', percent: 12 },
  { title: 'Deploy e Suporte', percent: 8 },
];

export const generateProFlowPayload = (proposal, lead) => {
  const totalValue = Number(proposal.total_value) || 0;
  const items = Array.isArray(proposal.items) && proposal.items.length > 0
    ? proposal.items
    : DEFAULT_MILESTONES.map(m => ({ description: m.title, value: (totalValue * m.percent) / 100 }));

  const interest = Array.isArray(lead.interests) && lead.interests.length > 0
    ? lead.interests[0]
    : 'Sistema Corporativo';
  const categoryMapping = INTEREST_TO_CATEGORY[interest] || INTEREST_TO_CATEGORY['Sistema Corporativo'];

  const deadline = proposal.valid_until || new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  const milestones = items.map((item, index) => ({
    title: item.description || item.name || `Etapa ${index + 1}`,
    description: item.description || '',
    amount: Number(item.value) || 0,
    order: index + 1,
    due_date: deadline,
  }));

  // Ajustar último milestone para garantir soma exata
  const milestonesSum = milestones.reduce((sum, m) => sum + m.amount, 0);
  if (milestones.length > 0 && totalValue > 0 && Math.abs(milestonesSum - totalValue) > 0.01) {
    milestones[milestones.length - 1].amount += totalValue - milestonesSum;
  }

  const payload = {
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

  const markdown = `# Criação de Projeto na ProFlow

## Cliente
- **Nome:** ${payload.client.name}
- **Email:** ${payload.client.email}
- **Telefone:** ${payload.client.phone || '-'}
- **Empresa:** ${payload.client.company}
- **Segmento:** ${payload.client.segment}
- **Funcionários:** ${payload.client.employees || '-'}

## Projeto
- **Título:** ${payload.project.title}
- **Categoria:** ${payload.project.category} / ${payload.project.subcategory}
- **Valor:** ${payload.project.budget.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
- **Prazo:** ${new Date(payload.project.deadline).toLocaleDateString('pt-BR')}
- **Visibilidade:** Privado
- **Status:** Em Andamento

## Escopo
${payload.project.description}

## Milestones
${milestones.map((m, i) => `${i + 1}. **${m.title}** — ${m.amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`).join('\n')}

## Checklist de criação manual
- [ ] Criar usuário cliente na ProFlow (${payload.client.email})
- [ ] Criar/atualizar ClientProfile
- [ ] Criar projeto privado com status "Em Andamento"
- [ ] Atribuir freelancer/parceiro interno
- [ ] Criar milestones no contrato
- [ ] Enviar email de onboarding para o cliente
- [ ] Mover lead para etapa "Fechado"
- [ ] Marcar proposta como "Aceita"

---
PyScript.tech — Portal de Projetos ProFlow
`;

  return { payload, markdown, checklist: markdown.split('## Checklist')[1]?.trim() || '' };
};

// ============================================================
// PROSPECT COMPANIES
// ============================================================

const PROSPECTS_STORAGE_KEY = 'pyscript_prospect_companies';

const getLocalProspects = () => {
  try {
    return JSON.parse(localStorage.getItem(PROSPECTS_STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
};

const setLocalProspects = (prospects) => {
  localStorage.setItem(PROSPECTS_STORAGE_KEY, JSON.stringify(prospects));
};

export const getProspectCompanies = async (filters = {}) => {
  if (isSupabaseConfigured()) {
    let query = supabase.from('prospect_companies').select('*').order('created_at', { ascending: false });
    if (filters.status) query = query.eq('status', filters.status);
    if (filters.segment) query = query.eq('segment', filters.segment);
    if (filters.potential) query = query.eq('potential', filters.potential);
    if (filters.search) {
      query = query.or(`company_name.ilike.%${filters.search}%,email.ilike.%${filters.search}%`);
    }
    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  }

  let prospects = getLocalProspects();
  if (filters.status) prospects = prospects.filter(p => p.status === filters.status);
  if (filters.segment) prospects = prospects.filter(p => p.segment === filters.segment);
  if (filters.potential) prospects = prospects.filter(p => p.potential === filters.potential);
  if (filters.search) {
    const search = filters.search.toLowerCase();
    prospects = prospects.filter(p => 
      (p.company_name || '').toLowerCase().includes(search) ||
      (p.email || '').toLowerCase().includes(search)
    );
  }
  return prospects.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
};

export const getProspectCompanyById = async (id) => {
  if (isSupabaseConfigured()) {
    const { data, error } = await supabase.from('prospect_companies').select('*').eq('id', id).single();
    if (error) throw error;
    return data;
  }
  return getLocalProspects().find(p => p.id === id) || null;
};

export const createProspectCompany = async (company) => {
  const companyData = {
    ...company,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  if (isSupabaseConfigured()) {
    const { data, error } = await supabase.from('prospect_companies').insert([companyData]).select().single();
    if (error) throw error;
    return data;
  }

  const prospects = getLocalProspects();
  const newCompany = { ...companyData, id: Date.now().toString() };
  prospects.push(newCompany);
  setLocalProspects(prospects);
  return newCompany;
};

export const updateProspectCompany = async (id, updates) => {
  const updateData = {
    ...updates,
    updated_at: new Date().toISOString(),
  };

  if (isSupabaseConfigured()) {
    const { data, error } = await supabase.from('prospect_companies').update(updateData).eq('id', id).select().single();
    if (error) throw error;
    return data;
  }

  const prospects = getLocalProspects();
  const index = prospects.findIndex(p => p.id === id);
  if (index === -1) throw new Error('Prospect company not found');
  prospects[index] = { ...prospects[index], ...updateData };
  setLocalProspects(prospects);
  return prospects[index];
};

export const deleteProspectCompany = async (id) => {
  if (isSupabaseConfigured()) {
    const { error } = await supabase.from('prospect_companies').delete().eq('id', id);
    if (error) throw error;
    return true;
  }

  const prospects = getLocalProspects().filter(p => p.id !== id);
  setLocalProspects(prospects);
  return true;
};

// ============================================================
// METRICS
// ============================================================

export const getMetrics = async () => {
  const leads = await getLeads();
  const proposals = await getProposals();
  const prospects = await getProspectCompanies();
  const activities = isSupabaseConfigured() 
    ? (await supabase.from('lead_activities').select('*')).data || []
    : getLocalActivities();

  const leadsByStage = {};
  const leadsBySource = {};
  let pipelineValue = 0;
  let closedValue = 0;

  leads.forEach(lead => {
    leadsByStage[lead.stage] = (leadsByStage[lead.stage] || 0) + 1;
    leadsBySource[lead.source] = (leadsBySource[lead.source] || 0) + 1;
    if (lead.stage !== 'perdido' && lead.stage !== 'fechado') {
      pipelineValue += Number(lead.estimated_value || 0);
    }
    if (lead.stage === 'fechado') {
      closedValue += Number(lead.estimated_value || 0);
    }
  });

  const proposalsSent = proposals.filter(p => p.status === 'sent').length;
  const proposalsAccepted = proposals.filter(p => p.status === 'accepted').length;
  const proposalsRejected = proposals.filter(p => p.status === 'rejected').length;
  const conversionRate = proposalsSent > 0 ? (proposalsAccepted / proposalsSent) * 100 : 0;

  const today = new Date().toISOString().split('T')[0];
  const overdueActions = leads.filter(l => l.next_action_date && l.next_action_date < today).length;
  const thisWeekActions = leads.filter(l => {
    if (!l.next_action_date) return false;
    const actionDate = new Date(l.next_action_date);
    const now = new Date();
    const diffDays = Math.ceil((actionDate - now) / (1000 * 60 * 60 * 24));
    return diffDays >= 0 && diffDays <= 7;
  }).length;

  return {
    totalLeads: leads.length,
    leadsByStage,
    leadsBySource,
    pipelineValue,
    closedValue,
    totalProposals: proposals.length,
    proposalsSent,
    proposalsAccepted,
    proposalsRejected,
    conversionRate: Number(conversionRate.toFixed(2)),
    totalProspects: prospects.length,
    prospectsByStatus: prospects.reduce((acc, p) => {
      acc[p.status] = (acc[p.status] || 0) + 1;
      return acc;
    }, {}),
    overdueActions,
    thisWeekActions,
    totalActivities: activities.length,
  };
};
