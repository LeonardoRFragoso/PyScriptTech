# Configuração de Secrets - PyScript ↔ ProFlow

## Secrets obrigatórios

Configure no Supabase Dashboard (Project Settings > Edge Functions > Secrets) ou via CLI:

```bash
supabase secrets set --project-ref <project-ref> \
  PROFLOW_API_URL=https://api.proflow.pro \
  PROFLOW_PYSCRIPT_ENDPOINT=/api/v1/projects/pyscript/ \
  PROFLOW_SERVICE_TOKEN=<jwt-do-gestor-pyscript> \
  PROFLOW_PORTAL_URL=https://proflow.pro \
  PYSCRIPT_ALLOWED_ADMIN_EMAILS=leonardorfragoso@gmail.com \
  SUPABASE_SERVICE_ROLE_KEY=<service-role-key>

# Opcional
supabase secrets set --project-ref <project-ref> \
  PROFLOW_REFRESH_TOKEN=<refresh-token>
```

Ou use o script:

```bash
export PROFLOW_SERVICE_TOKEN=<jwt>
export PROFLOW_REFRESH_TOKEN=<refresh-token>
export SUPABASE_SERVICE_ROLE_KEY=<service-role-key>
./scripts/configure-proflow-secrets.sh <project-ref>
```

## Descrição dos secrets

- `PROFLOW_API_URL`: base URL da API da ProFlow.
- `PROFLOW_PYSCRIPT_ENDPOINT`: endpoint B2B da PyScript na ProFlow.
- `PROFLOW_SERVICE_TOKEN`: JWT de gestor da ProFlow com papel `project_manager`.
- `PROFLOW_REFRESH_TOKEN`: refresh token para renovação automática (opcional).
- `PROFLOW_PORTAL_URL`: URL pública do portal da ProFlow.
- `PYSCRIPT_ALLOWED_ADMIN_EMAILS`: lista de emails autorizados na PyScript.
- `SUPABASE_SERVICE_ROLE_KEY`: service role key do Supabase para acesso administrativo.

## Segurança

- Nunca commitar este arquivo com valores reais.
- Nunca expor `PROFLOW_SERVICE_TOKEN` no frontend.
- Nunca expor `PROFLOW_REFRESH_TOKEN` no frontend.
- Nunca salvar tokens em logs.
- O `.env` local também não deve conter tokens reais se for versionado.
