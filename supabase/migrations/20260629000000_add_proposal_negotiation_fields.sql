-- Migration: campos de negociação e alinhamento da proposta
-- Adiciona meeting_date, payment_terms e manager_notes para capturar
-- o que foi acordado durante a reunião antes de enviar ao ProFlow.

SET search_path = public, extensions;

ALTER TABLE proposals
  ADD COLUMN IF NOT EXISTS meeting_date DATE,
  ADD COLUMN IF NOT EXISTS payment_terms TEXT,
  ADD COLUMN IF NOT EXISTS manager_notes TEXT;

COMMENT ON COLUMN proposals.meeting_date   IS 'Data da reunião de alinhamento com o cliente';
COMMENT ON COLUMN proposals.payment_terms  IS 'Condições de pagamento acordadas (ex: 50% entrada, 50% na entrega)';
COMMENT ON COLUMN proposals.manager_notes  IS 'Notas internas do responsável — enviadas ao ProFlow como manager_notes';
