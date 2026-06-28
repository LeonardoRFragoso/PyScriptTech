-- Schema do Supabase para CRM PyScript.Tech
-- Execute este script no SQL Editor do Supabase

-- Habilitar extensão UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tabela de leads
CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  role TEXT,
  segment TEXT,
  employees TEXT,
  problem TEXT,
  systems TEXT,
  interests TEXT[],
  stage TEXT NOT NULL DEFAULT 'novo',
  source TEXT,
  estimated_value NUMERIC DEFAULT 0,
  priority TEXT DEFAULT 'medium',
  notes TEXT,
  owner_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  next_action TEXT,
  next_action_date DATE
);

-- Tabela de atividades dos leads
CREATE TABLE IF NOT EXISTS lead_activities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lead_id UUID NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('ligação', 'email', 'whatsapp', 'linkedin', 'reunião', 'proposta', 'anotação', 'mudança_de_status')),
  description TEXT NOT NULL,
  next_action TEXT,
  next_action_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id)
);

-- Tabela de propostas comerciais
CREATE TABLE IF NOT EXISTS proposals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lead_id UUID NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  scope TEXT,
  items JSONB DEFAULT '[]',
  total_value NUMERIC DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'sent', 'accepted', 'rejected', 'expired')),
  valid_until DATE,
  sent_at TIMESTAMP WITH TIME ZONE,
  accepted_at TIMESTAMP WITH TIME ZONE,
  rejected_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id)
);

-- Tabela de empresas prospectadas
CREATE TABLE IF NOT EXISTS prospect_companies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_name TEXT NOT NULL,
  segment TEXT,
  city TEXT,
  potential TEXT NOT NULL DEFAULT 'médio' CHECK (potential IN ('baixo', 'médio', 'alto')),
  suggested_approach TEXT,
  decision_maker_name TEXT,
  decision_maker_role TEXT,
  linkedin_url TEXT,
  website TEXT,
  email TEXT,
  phone TEXT,
  status TEXT NOT NULL DEFAULT 'não_contatada' CHECK (status IN ('não_contatada', 'conexão_enviada', 'respondeu', 'diagnóstico_agendado', 'proposta_enviada', 'negociação', 'fechada', 'perdida', 'sem_fit')),
  last_contact_at DATE,
  next_contact_at DATE,
  next_action TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id)
);

-- Índices para performance
CREATE INDEX IF NOT EXISTS idx_leads_stage ON leads(stage);
CREATE INDEX IF NOT EXISTS idx_leads_source ON leads(source);
CREATE INDEX IF NOT EXISTS idx_leads_segment ON leads(segment);
CREATE INDEX IF NOT EXISTS idx_leads_priority ON leads(priority);
CREATE INDEX IF NOT EXISTS idx_leads_owner ON leads(owner_id);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_next_action_date ON leads(next_action_date);

CREATE INDEX IF NOT EXISTS idx_lead_activities_lead_id ON lead_activities(lead_id);
CREATE INDEX IF NOT EXISTS idx_lead_activities_created_at ON lead_activities(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_proposals_lead_id ON proposals(lead_id);
CREATE INDEX IF NOT EXISTS idx_proposals_status ON proposals(status);
CREATE INDEX IF NOT EXISTS idx_proposals_valid_until ON proposals(valid_until);

CREATE INDEX IF NOT EXISTS idx_prospect_companies_status ON prospect_companies(status);
CREATE INDEX IF NOT EXISTS idx_prospect_companies_segment ON prospect_companies(segment);
CREATE INDEX IF NOT EXISTS idx_prospect_companies_potential ON prospect_companies(potential);
CREATE INDEX IF NOT EXISTS idx_prospect_companies_next_contact_at ON prospect_companies(next_contact_at);

-- Função para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers para updated_at
DROP TRIGGER IF EXISTS update_leads_updated_at ON leads;
CREATE TRIGGER update_leads_updated_at
  BEFORE UPDATE ON leads
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_proposals_updated_at ON proposals;
CREATE TRIGGER update_proposals_updated_at
  BEFORE UPDATE ON proposals
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_prospect_companies_updated_at ON prospect_companies;
CREATE TRIGGER update_prospect_companies_updated_at
  BEFORE UPDATE ON prospect_companies
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS)
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE lead_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE proposals ENABLE ROW LEVEL SECURITY;
ALTER TABLE prospect_companies ENABLE ROW LEVEL SECURITY;

-- Políticas: usuários autenticados podem acessar todos os registros (modelo pequeno time)
-- Em escala, substituir por owner_id = auth.uid()
CREATE POLICY "Allow all authenticated users to select leads"
  ON leads FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow all authenticated users to insert leads"
  ON leads FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Allow all authenticated users to update leads"
  ON leads FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Allow all authenticated users to delete leads"
  ON leads FOR DELETE TO authenticated USING (true);

CREATE POLICY "Allow all authenticated users to select lead_activities"
  ON lead_activities FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow all authenticated users to insert lead_activities"
  ON lead_activities FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Allow all authenticated users to update lead_activities"
  ON lead_activities FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Allow all authenticated users to delete lead_activities"
  ON lead_activities FOR DELETE TO authenticated USING (true);

CREATE POLICY "Allow all authenticated users to select proposals"
  ON proposals FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow all authenticated users to insert proposals"
  ON proposals FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Allow all authenticated users to update proposals"
  ON proposals FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Allow all authenticated users to delete proposals"
  ON proposals FOR DELETE TO authenticated USING (true);

CREATE POLICY "Allow all authenticated users to select prospect_companies"
  ON prospect_companies FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow all authenticated users to insert prospect_companies"
  ON prospect_companies FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Allow all authenticated users to update prospect_companies"
  ON prospect_companies FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Allow all authenticated users to delete prospect_companies"
  ON prospect_companies FOR DELETE TO authenticated USING (true);

-- Dados iniciais: empresas prospectadas do Rio de Janeiro
-- Nota: dados de contato pessoal (decisor, email, telefone) devem ser preenchidos manualmente
INSERT INTO prospect_companies (company_name, segment, city, potential, suggested_approach, status) VALUES
('Loggi', 'Logística', 'Rio de Janeiro', 'alto', 'Roteirização, rastreamento e chatbot para operação de entregas', 'não_contatada'),
('Mottu', 'Logística', 'Rio de Janeiro', 'alto', 'CRM de frota, automação de contratos e dashboard operacional', 'não_contatada'),
('CargOn', 'Logística', 'Rio de Janeiro', 'alto', 'TMS, IA para rotas e integrações com ERPs', 'não_contatada'),
('Expresso Nepomuceno', 'Transporte', 'Rio de Janeiro', 'médio', 'CRM e automação de faturamento de transportadoras', 'não_contatada'),
('Sotreq Logística', 'Transporte', 'Rio de Janeiro', 'médio', 'Integração ERP e manutenção de frota', 'não_contatada'),
('CCR (ViaRio/Barcas)', 'Mobilidade', 'Rio de Janeiro', 'alto', 'IA para manutenção preditiva e dashboards operacionais', 'não_contatada'),
('Barcas S/A', 'Transporte', 'Rio de Janeiro', 'médio', 'Sistema de passageiros e integração de dados', 'não_contatada'),
('SuperVia', 'Transporte', 'Rio de Janeiro', 'alto', 'IA, manutenção preditiva e chatbot para passageiros', 'não_contatada'),
('Rio Ônibus', 'Transporte', 'Rio de Janeiro', 'alto', 'Roteirização e dashboard operacional', 'não_contatada'),
('Transportadora Sinaleira', 'Transporte', 'Rio de Janeiro', 'médio', 'Gestão de frotas e CT-e/MDF-e', 'não_contatada'),
('Logística RJ', 'Logística', 'Rio de Janeiro', 'médio', 'Automação de armazém e WMS', 'não_contatada'),
('Move Logística', 'Logística', 'Rio de Janeiro', 'alto', 'Integração de e-commerce e RPA', 'não_contatada'),
('Transdata', 'Transporte', 'Rio de Janeiro', 'médio', 'Dashboard de KPIs e integração ERP', 'não_contatada'),
('Hcor', 'Saúde', 'Rio de Janeiro', 'alto', 'IA para prontuários e integração de sistemas', 'não_contatada'),
('Copa D''Or', 'Saúde', 'Rio de Janeiro', 'alto', 'Automação de agendamentos e chatbot', 'não_contatada'),
('Quinta D''Or', 'Saúde', 'Rio de Janeiro', 'alto', 'CRM e integração de prontuários', 'não_contatada'),
('Hospital Samaritano', 'Saúde', 'Rio de Janeiro', 'médio', 'Dashboard e automação de processos', 'não_contatada'),
('Rede D''Or São Luiz', 'Saúde', 'Rio de Janeiro', 'alto', 'IA, integração e RPA', 'não_contatada'),
('Grupo Fleury', 'Diagnóstico', 'Rio de Janeiro', 'alto', 'RAG para laudos e automação', 'não_contatada'),
('Sabin Medicina Diagnóstica', 'Diagnóstico', 'Rio de Janeiro', 'alto', 'Integração de sistemas e chatbot', 'não_contatada'),
('Amplimed', 'Saúde/Software', 'Rio de Janeiro', 'médio', 'Parceria e CRM para clínicas', 'não_contatada'),
('iClinic', 'Saúde/Software', 'Rio de Janeiro', 'médio', 'Integrações e automação', 'não_contatada'),
('Stone', 'Fintech/Serviços', 'Rio de Janeiro', 'alto', 'Dashboard, automação interna e IA', 'não_contatada'),
('Cielo', 'Fintech', 'Rio de Janeiro', 'alto', 'Sistemas corporativos e integrações', 'não_contatada'),
('PagSeguro', 'Fintech', 'Rio de Janeiro', 'alto', 'Automação, chatbot e IA', 'não_contatada'),
('Banco Inter', 'Banco', 'Rio de Janeiro', 'alto', 'Integrações e automação de processos', 'não_contatada'),
('Neon', 'Fintech', 'Rio de Janeiro', 'médio', 'CRM e automação de suporte', 'não_contatada'),
('Viva Real / Grupo ZAP', 'Imóveis', 'Rio de Janeiro', 'alto', 'Chatbot e automação de leads', 'não_contatada'),
('QuintoAndar', 'Imóveis', 'Rio de Janeiro', 'alto', 'CRM e automação de processos', 'não_contatada'),
('Loft', 'Imóveis', 'Rio de Janeiro', 'médio', 'Integração de sistemas e IA', 'não_contatada'),
('Localiza', 'Locação de veículos', 'Rio de Janeiro', 'alto', 'CRM, dashboard e automação de frota', 'não_contatada'),
('Unidas', 'Locação de veículos', 'Rio de Janeiro', 'médio', 'Integração ERP e gestão comercial', 'não_contatada'),
('Movida', 'Locação de veículos', 'Rio de Janeiro', 'médio', 'Automação de faturamento', 'não_contatada'),
('Comgás', 'Energia/Gás', 'Rio de Janeiro', 'alto', 'Sistemas corporativos e IA', 'não_contatada'),
('Light', 'Energia', 'Rio de Janeiro', 'alto', 'Manutenção preditiva e dashboard', 'não_contatada'),
('Enel', 'Energia', 'Rio de Janeiro', 'alto', 'IA e automação de campo', 'não_contatada'),
('Cedae', 'Saneamento', 'Rio de Janeiro', 'alto', 'Sistemas legados, integrações e dashboard', 'não_contatada'),
('Braskem', 'Indústria química', 'Rio de Janeiro', 'alto', 'IA, manutenção preditiva e integrações', 'não_contatada'),
('Vale', 'Mineração', 'Rio de Janeiro', 'alto', 'Sistemas corporativos e dashboard', 'não_contatada'),
('Petrobras', 'Óleo e gás', 'Rio de Janeiro', 'alto', 'IA, automação e integração de legados', 'não_contatada'),
('White Martins', 'Gases industriais', 'Rio de Janeiro', 'alto', 'CRM, logística e automação', 'não_contatada'),
('Oxiteno', 'Indústria química', 'Rio de Janeiro', 'médio', 'Integração de sistemas e ERP', 'não_contatada'),
('Gerdau', 'Siderurgia', 'Rio de Janeiro', 'alto', 'Manutenção preditiva e IA', 'não_contatada'),
('Multiplan', 'Shoppings', 'Rio de Janeiro', 'médio', 'CRM e automação de locação', 'não_contatada'),
('Sonae Sierra Brasil', 'Shoppings', 'Rio de Janeiro', 'médio', 'Dashboard e integração de dados', 'não_contatada'),
('Lojas Americanas', 'Varejo', 'Rio de Janeiro', 'alto', 'Automação, IA e integrações', 'não_contatada'),
('GPA (Pão de Açúcar)', 'Varejo', 'Rio de Janeiro', 'alto', 'CRM, automação e IA para logística', 'não_contatada');

-- Função para registrar mudança de status do lead automaticamente como atividade
CREATE OR REPLACE FUNCTION log_lead_stage_change()
RETURNS TRIGGER AS $$
BEGIN
  IF OLD.stage IS DISTINCT FROM NEW.stage THEN
    INSERT INTO lead_activities (lead_id, type, description, created_by)
    VALUES (NEW.id, 'mudança_de_status', 'Etapa alterada de ' || OLD.stage || ' para ' || NEW.stage, NEW.owner_id);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_lead_stage_change ON leads;
CREATE TRIGGER trg_lead_stage_change
  AFTER UPDATE ON leads
  FOR EACH ROW
  EXECUTE FUNCTION log_lead_stage_change();

-- ============================================================
-- INTEGRAÇÃO PROFLOW.PRO
-- ============================================================

-- Campos ProFlow na tabela proposals
ALTER TABLE proposals
  ADD COLUMN IF NOT EXISTS proflow_project_id UUID,
  ADD COLUMN IF NOT EXISTS proflow_contract_id UUID,
  ADD COLUMN IF NOT EXISTS proflow_milestone_ids UUID[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS proflow_portal_url TEXT,
  ADD COLUMN IF NOT EXISTS proflow_client_email TEXT,
  ADD COLUMN IF NOT EXISTS proflow_client_status TEXT,
  ADD COLUMN IF NOT EXISTS proflow_invitation_sent BOOLEAN DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS proflow_sync_status TEXT NOT NULL DEFAULT 'not_started'
    CHECK (proflow_sync_status IN ('not_started', 'pending', 'success', 'failed', 'already_created')),
  ADD COLUMN IF NOT EXISTS proflow_sync_error TEXT,
  ADD COLUMN IF NOT EXISTS proflow_synced_at TIMESTAMP WITH TIME ZONE,
  ADD COLUMN IF NOT EXISTS proflow_last_attempt_at TIMESTAMP WITH TIME ZONE;

CREATE INDEX IF NOT EXISTS idx_proposals_proflow_project_id ON proposals(proflow_project_id);
CREATE INDEX IF NOT EXISTS idx_proposals_proflow_sync_status ON proposals(proflow_sync_status);
CREATE INDEX IF NOT EXISTS idx_proposals_proflow_client_status ON proposals(proflow_client_status);

-- Tabela de logs de integração
CREATE TABLE IF NOT EXISTS proflow_integration_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  proposal_id UUID NOT NULL REFERENCES proposals(id) ON DELETE CASCADE,
  lead_id UUID NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
  event TEXT NOT NULL,
  status TEXT NOT NULL,
  http_status INTEGER,
  message TEXT,
  request_payload_safe JSONB,
  response_payload_safe JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id)
);

CREATE INDEX IF NOT EXISTS idx_proflow_logs_proposal_id ON proflow_integration_logs(proposal_id);
CREATE INDEX IF NOT EXISTS idx_proflow_logs_lead_id ON proflow_integration_logs(lead_id);
CREATE INDEX IF NOT EXISTS idx_proflow_logs_event ON proflow_integration_logs(event);
CREATE INDEX IF NOT EXISTS idx_proflow_logs_created_at ON proflow_integration_logs(created_at DESC);

ALTER TABLE proflow_integration_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated users to select proflow logs"
  ON proflow_integration_logs FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow authenticated users to insert proflow logs"
  ON proflow_integration_logs FOR INSERT TO authenticated WITH CHECK (true);
