-- Migration: conceder permissões de tabela para o role service_role
-- As Edge Functions usam SUPABASE_SERVICE_ROLE_KEY e precisam de GRANT direto
-- para consultar e atualizar proposals, leads e logs de integração.

SET search_path = public, extensions;

GRANT USAGE ON SCHEMA public TO service_role;

GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.leads TO service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.lead_activities TO service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.proposals TO service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.prospect_companies TO service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.proflow_integration_logs TO service_role;
