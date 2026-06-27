-- Migration: conceder permissões de tabela para o role authenticated
-- O role authenticated precisa de GRANT além das RLS policies para manipular dados via REST API.

SET search_path = public, extensions;

GRANT USAGE ON SCHEMA public TO authenticated, service_role;

GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.leads TO authenticated, service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.lead_activities TO authenticated, service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.proposals TO authenticated, service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.prospect_companies TO authenticated, service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.proflow_integration_logs TO authenticated, service_role;
