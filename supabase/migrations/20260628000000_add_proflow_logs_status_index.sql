-- Migration: adiciona índice em status na tabela proflow_integration_logs
-- O índice em proposal_id foi criado em 20260627113309, mas status estava faltando.

SET search_path = public, extensions;

CREATE INDEX IF NOT EXISTS idx_proflow_logs_status ON proflow_integration_logs(status);
