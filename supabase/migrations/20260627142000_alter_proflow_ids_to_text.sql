-- Migration: ajustar tipos dos IDs da ProFlow para TEXT
-- A API da ProFlow retorna project_id, contract_id e milestone_ids como inteiros,
-- enquanto a integração precisa armazená-los de forma flexível (TEXT).

SET search_path = public, extensions;

ALTER TABLE proposals
  ALTER COLUMN proflow_project_id TYPE TEXT,
  ALTER COLUMN proflow_contract_id TYPE TEXT;

ALTER TABLE proposals ADD COLUMN IF NOT EXISTS proflow_milestone_ids_new TEXT[] DEFAULT '{}';

UPDATE proposals
SET proflow_milestone_ids_new = ARRAY(
  SELECT m::text
  FROM unnest(proflow_milestone_ids) AS m
)
WHERE proflow_milestone_ids IS NOT NULL AND array_length(proflow_milestone_ids, 1) > 0;

ALTER TABLE proposals DROP COLUMN IF EXISTS proflow_milestone_ids;
ALTER TABLE proposals RENAME COLUMN proflow_milestone_ids_new TO proflow_milestone_ids;

ALTER TABLE proposals ALTER COLUMN proflow_milestone_ids SET DEFAULT '{}';
