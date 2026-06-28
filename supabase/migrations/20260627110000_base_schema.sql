-- Migration: Schema base do CRM PyScript.Tech
-- Cria tabelas leads, lead_activities, proposals e prospect_companies

-- Habilitar extensão UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Garantir que funções de extensão estejam no search path
SET search_path = public, extensions;

-- Tabela de leads
CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT extensions.uuid_generate_v4(),
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
  id UUID PRIMARY KEY DEFAULT extensions.uuid_generate_v4(),
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
  id UUID PRIMARY KEY DEFAULT extensions.uuid_generate_v4(),
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
  id UUID PRIMARY KEY DEFAULT extensions.uuid_generate_v4(),
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

-- RLS para leads
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow authenticated users to select leads" ON leads;
CREATE POLICY "Allow authenticated users to select leads"
  ON leads FOR SELECT TO authenticated USING (true);
DROP POLICY IF EXISTS "Allow authenticated users to insert leads" ON leads;
CREATE POLICY "Allow authenticated users to insert leads"
  ON leads FOR INSERT TO authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "Allow authenticated users to update leads" ON leads;
CREATE POLICY "Allow authenticated users to update leads"
  ON leads FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "Allow authenticated users to delete leads" ON leads;
CREATE POLICY "Allow authenticated users to delete leads"
  ON leads FOR DELETE TO authenticated USING (true);

-- RLS para lead_activities
ALTER TABLE lead_activities ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow authenticated users to select lead_activities" ON lead_activities;
CREATE POLICY "Allow authenticated users to select lead_activities"
  ON lead_activities FOR SELECT TO authenticated USING (true);
DROP POLICY IF EXISTS "Allow authenticated users to insert lead_activities" ON lead_activities;
CREATE POLICY "Allow authenticated users to insert lead_activities"
  ON lead_activities FOR INSERT TO authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "Allow authenticated users to update lead_activities" ON lead_activities;
CREATE POLICY "Allow authenticated users to update lead_activities"
  ON lead_activities FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "Allow authenticated users to delete lead_activities" ON lead_activities;
CREATE POLICY "Allow authenticated users to delete lead_activities"
  ON lead_activities FOR DELETE TO authenticated USING (true);

-- RLS para proposals
ALTER TABLE proposals ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow authenticated users to select proposals" ON proposals;
CREATE POLICY "Allow authenticated users to select proposals"
  ON proposals FOR SELECT TO authenticated USING (true);
DROP POLICY IF EXISTS "Allow authenticated users to insert proposals" ON proposals;
CREATE POLICY "Allow authenticated users to insert proposals"
  ON proposals FOR INSERT TO authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "Allow authenticated users to update proposals" ON proposals;
CREATE POLICY "Allow authenticated users to update proposals"
  ON proposals FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "Allow authenticated users to delete proposals" ON proposals;
CREATE POLICY "Allow authenticated users to delete proposals"
  ON proposals FOR DELETE TO authenticated USING (true);

-- RLS para prospect_companies
ALTER TABLE prospect_companies ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow authenticated users to select prospect_companies" ON prospect_companies;
CREATE POLICY "Allow authenticated users to select prospect_companies"
  ON prospect_companies FOR SELECT TO authenticated USING (true);
DROP POLICY IF EXISTS "Allow authenticated users to insert prospect_companies" ON prospect_companies;
CREATE POLICY "Allow authenticated users to insert prospect_companies"
  ON prospect_companies FOR INSERT TO authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "Allow authenticated users to update prospect_companies" ON prospect_companies;
CREATE POLICY "Allow authenticated users to update prospect_companies"
  ON prospect_companies FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "Allow authenticated users to delete prospect_companies" ON prospect_companies;
CREATE POLICY "Allow authenticated users to delete prospect_companies"
  ON prospect_companies FOR DELETE TO authenticated USING (true);

-- Trigger updated_at (função criada apenas se não existir)
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_leads_updated_at ON leads;
CREATE TRIGGER update_leads_updated_at
  BEFORE UPDATE ON leads
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_lead_activities_updated_at ON lead_activities;
CREATE TRIGGER update_lead_activities_updated_at
  BEFORE UPDATE ON lead_activities
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
