import { generateProFlowPayload } from './database';

describe('generateProFlowPayload', () => {
  const lead = {
    id: 'lead-uuid',
    name: 'Cliente Teste',
    email: 'cliente@empresa.com',
    phone: '(21) 99999-9999',
    company: 'Empresa Teste',
    segment: 'Tecnologia',
    employees: '11-20',
    problem: 'Necessidade de automação de processos internos.',
    interests: ['Automação'],
  };

  const proposal = {
    id: 'proposal-uuid',
    lead_id: 'lead-uuid',
    title: 'Automação de Processos - Empresa Teste',
    scope: 'Automatizar fluxos manuais com Python e integrações.',
    items: [
      { description: 'Diagnóstico técnico', value: 2500 },
      { description: 'Desenvolvimento MVP', value: 10000 },
      { description: 'Integrações', value: 5000 },
    ],
    total_value: 17500,
    valid_until: '2026-09-30',
    status: 'accepted',
  };

  it('should include external IDs', () => {
    const { payload } = generateProFlowPayload(proposal, lead);
    expect(payload.external_pyscript_lead_id).toBe(lead.id);
    expect(payload.external_pyscript_proposal_id).toBe(proposal.id);
  });

  it('should map client data correctly', () => {
    const { payload } = generateProFlowPayload(proposal, lead);
    expect(payload.client.name).toBe(lead.name);
    expect(payload.client.email).toBe(lead.email);
    expect(payload.client.company).toBe(lead.company);
    expect(payload.client.segment).toBe(lead.segment);
  });

  it('should map project data correctly', () => {
    const { payload } = generateProFlowPayload(proposal, lead);
    expect(payload.project.title).toBe(proposal.title);
    expect(payload.project.budget).toBe(proposal.total_value);
    expect(payload.project.final_price).toBe(proposal.total_value);
    expect(payload.project.visibility).toBe('private');
    expect(payload.project.status).toBe('in_progress');
    expect(payload.project.budget_type).toBe('fixed');
  });

  it('should map category from interest', () => {
    const { payload } = generateProFlowPayload(proposal, lead);
    expect(payload.project.category).toBe('data');
    expect(payload.project.subcategory).toBe('data_analysis');
  });

  it('should generate milestones from proposal items', () => {
    const { payload } = generateProFlowPayload(proposal, lead);
    expect(payload.milestones.length).toBe(3);
    expect(payload.milestones[0].title).toBe('Diagnóstico técnico');
    expect(payload.milestones[0].amount).toBe(2500);
  });

  it('should generate default milestones when proposal has no items', () => {
    const proposalWithoutItems = { ...proposal, items: [] };
    const { payload } = generateProFlowPayload(proposalWithoutItems, lead);
    expect(payload.milestones.length).toBe(6);
    const total = payload.milestones.reduce((sum, m) => sum + m.amount, 0);
    expect(total).toBeCloseTo(proposal.total_value, 2);
  });

  it('should ensure milestone sum matches total value', () => {
    const { payload } = generateProFlowPayload(proposal, lead);
    const total = payload.milestones.reduce((sum, m) => sum + m.amount, 0);
    expect(total).toBeCloseTo(proposal.total_value, 2);
  });

  it('should generate markdown and checklist', () => {
    const { markdown, checklist } = generateProFlowPayload(proposal, lead);
    expect(markdown).toContain(proposal.title);
    expect(markdown).toContain(lead.email);
    expect(checklist).toContain('Criar usuário cliente na ProFlow');
  });
});
