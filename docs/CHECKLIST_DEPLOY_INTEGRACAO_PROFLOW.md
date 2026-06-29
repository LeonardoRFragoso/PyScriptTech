# Checklist de Deploy - Integração PyScript ↔ ProFlow

## Antes do deploy

- [ ] Revisar schema do Supabase (`database/supabase_schema.sql` ou `database/proflow_integration_schema.sql`).
- [ ] Executar migração SQL no Supabase.
- [ ] Confirmar que tabela `proposals` possui campos ProFlow.
- [ ] Confirmar que tabela `proflow_integration_logs` existe.
- [ ] Configurar Supabase CLI.
- [ ] Fazer login no Supabase.
- [ ] Inicializar projeto (`supabase init`) se ainda não existir.

## Variáveis de ambiente

- [ ] Adicionar `REACT_APP_PROFLOW_PORTAL_URL` no `.env` do frontend.
- [ ] Adicionar `PROFLOW_API_URL` no Supabase Secrets.
- [ ] Adicionar `PROFLOW_PYSCRIPT_ENDPOINT` no Supabase Secrets.
- [ ] Adicionar `PROFLOW_SERVICE_TOKEN` no Supabase Secrets.
- [ ] Adicionar `PROFLOW_REFRESH_TOKEN` no Supabase Secrets.
- [ ] Adicionar `PROFLOW_PORTAL_URL` no Supabase Secrets.
- [ ] Adicionar `PYSCRIPT_ALLOWED_ADMIN_EMAILS` no Supabase Secrets.
- [ ] Adicionar `SUPABASE_SERVICE_ROLE_KEY` no Supabase Secrets.
- [ ] Confirmar que nenhum secret está no frontend.
- [ ] Confirmar que `.env` está no `.gitignore`.

## Deploy das Edge Functions

- [ ] `supabase functions deploy proflow-create-project`
- [ ] `supabase functions deploy proflow-resend-invite`
- [ ] Verificar logs do deploy.
- [ ] Testar chamada com `curl` ou Supabase Dashboard.

## Testes manuais

- [ ] Criar lead com nome, email, empresa e segmento.
- [ ] Criar proposta com título, escopo, valor e prazo.
- [ ] Marcar proposta como `accepted`.
- [ ] Clicar em "Criar projeto na ProFlow".
- [ ] Confirmar preview.
- [ ] Criar projeto.
- [ ] Verificar `proflow_project_id` salvo.
- [ ] Verificar `proflow_portal_url` salvo.
- [ ] Verificar `proflow_client_status` salvo.
- [ ] Abrir portal.
- [ ] Verificar log na tabela `proflow_integration_logs`.
- [ ] Tentar criar projeto novamente e confirmar bloqueio de duplicidade.
- [ ] Testar reenvio de convite.

## Validação de segurança

- [ ] Nenhum token no frontend.
- [ ] Nenhum token em logs.
- [ ] Nenhum token no repositório.
- [ ] Edge Function rejeita usuário não autenticado.
- [ ] Edge Function rejeita usuário sem permissão.
- [ ] Proposta não aceita não cria projeto.
- [ ] Projeto já criado não pode ser duplicado.

## Após o deploy

- [ ] Build do frontend passa (`npm run build`).
- [ ] Deploy do frontend.
- [ ] Testar em produção com dados reais.
- [ ] Documentar ajustes e limitações.
