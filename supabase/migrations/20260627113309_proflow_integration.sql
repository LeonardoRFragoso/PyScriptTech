-- Migration: Integração PyScript.Tech ↔ ProFlow.pro
-- Cria campos ProFlow na tabela proposals e tabela de logs de integração

SET search_path = public, extensions;

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

-- Índices para integração
CREATE INDEX IF NOT EXISTS idx_proposals_proflow_project_id ON proposals(proflow_project_id);
CREATE INDEX IF NOT EXISTS idx_proposals_proflow_sync_status ON proposals(proflow_sync_status);
CREATE INDEX IF NOT EXISTS idx_proposals_proflow_client_status ON proposals(proflow_client_status);

-- Tabela de logs de integração
CREATE TABLE IF NOT EXISTS proflow_integration_logs (
  id UUID PRIMARY KEY DEFAULT extensions.uuid_generate_v4(),
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

-- RLS para logs
ALTER TABLE proflow_integration_logs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow authenticated users to select proflow logs" ON proflow_integration_logs;
CREATE POLICY "Allow authenticated users to select proflow logs"
  ON proflow_integration_logs FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "Allow authenticated users to insert proflow logs" ON proflow_integration_logs;
CREATE POLICY "Allow authenticated users to insert proflow logs"
  ON proflow_integration_logs FOR INSERT TO authenticated WITH CHECK (true);

-- Trigger updated_at
DROP TRIGGER IF EXISTS update_proposals_updated_at ON proposals;
CREATE TRIGGER update_proposals_updated_at
  BEFORE UPDATE ON proposals
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Comentários
COMMENT ON COLUMN proposals.proflow_project_id IS 'ID do projeto criado na ProFlow.pro';
COMMENT ON COLUMN proposals.proflow_contract_id IS 'ID do contrato criado na ProFlow.pro';
COMMENT ON COLUMN proposals.proflow_milestone_ids IS 'Array de IDs dos milestones criados na ProFlow.pro';
COMMENT ON COLUMN proposals.proflow_portal_url IS 'URL do portal de acompanhamento do cliente na ProFlow.pro';
COMMENT ON COLUMN proposals.proflow_client_email IS 'Email do cliente cadastrado na ProFlow.pro';
COMMENT ON COLUMN proposals.proflow_client_status IS 'Status do cliente na ProFlow.pro (ex: invited, active, pending)';
COMMENT ON COLUMN proposals.proflow_invitation_sent IS 'Indica se o convite de acesso foi enviado ao cliente';
COMMENT ON COLUMN proposals.proflow_sync_status IS 'Status da sincronização: not_started, pending, success, failed, already_created';
COMMENT ON COLUMN proposals.proflow_sync_error IS 'Mensagem de erro detalhada da última tentativa';
COMMENT ON COLUMN proposals.proflow_synced_at IS 'Data e hora da última sincronização bem-sucedida';
COMMENT ON COLUMN proposals.proflow_last_attempt_at IS 'Data e hora da última tentativa de sincronização';
