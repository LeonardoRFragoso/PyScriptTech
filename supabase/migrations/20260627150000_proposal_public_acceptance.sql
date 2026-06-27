-- Migration: campos de aceite digital público da proposta
-- Adiciona hash do token público, controle de acesso, auditoria do aceite e índices.

SET search_path = public, extensions;

-- Garantir que accepted_at existe (já criado na base schema)
ALTER TABLE proposals
  ADD COLUMN IF NOT EXISTS accepted_at TIMESTAMP WITH TIME ZONE;

-- Campos de controle de acesso público
ALTER TABLE proposals
  ADD COLUMN IF NOT EXISTS public_token_hash TEXT,
  ADD COLUMN IF NOT EXISTS public_access_enabled BOOLEAN DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS public_sent_at TIMESTAMP WITH TIME ZONE,
  ADD COLUMN IF NOT EXISTS public_viewed_at TIMESTAMP WITH TIME ZONE;

-- Campos de auditoria do aceite digital
ALTER TABLE proposals
  ADD COLUMN IF NOT EXISTS accepted_by_name TEXT,
  ADD COLUMN IF NOT EXISTS accepted_by_email TEXT,
  ADD COLUMN IF NOT EXISTS accepted_ip TEXT,
  ADD COLUMN IF NOT EXISTS accepted_user_agent TEXT;

-- Status do ciclo de aceite
ALTER TABLE proposals
  ADD COLUMN IF NOT EXISTS acceptance_status TEXT DEFAULT 'not_sent'
    CHECK (acceptance_status IN ('not_sent', 'sent', 'viewed', 'accepted', 'rejected', 'revoked'));

-- Versão dos termos aceitos
ALTER TABLE proposals
  ADD COLUMN IF NOT EXISTS acceptance_terms_version TEXT DEFAULT 'v1';

-- Índices
CREATE INDEX IF NOT EXISTS idx_proposals_public_token_hash ON proposals(public_token_hash);
CREATE INDEX IF NOT EXISTS idx_proposals_acceptance_status ON proposals(acceptance_status);
CREATE INDEX IF NOT EXISTS idx_proposals_public_access_enabled ON proposals(public_access_enabled);

-- Garantir que o hash seja único quando preenchido
CREATE UNIQUE INDEX IF NOT EXISTS idx_proposals_public_token_hash_unique
  ON proposals(public_token_hash)
  WHERE public_token_hash IS NOT NULL;
