# Relatório Final de Deploy - PyScript ↔ ProFlow

## Data

Junho de 2026

## Projeto Supabase

- Project ref: `pgnhrkulekwoezerjlty`
- Status: linkado, migration aplicada, Edge Functions deployadas, secrets configurados.

## Fases executadas

### Fase 1 — Confirmar ambiente

- Supabase CLI: `2.108.0` ✅
- Credenciais recebidas e configuradas no ambiente de execução ✅

### Fase 2 — Linkar projeto

- Comando: `npx supabase link --project-ref pgnhrkulekwoezerjlty`
- Resultado: ✅ projeto vinculado com sucesso

### Fase 3 — Aplicar migration

- Migrations aplicadas:
  - `20260627110000_base_schema.sql` — cria tabelas `leads`, `lead_activities`, `proposals`, `prospect_companies`
  - `20260627113309_proflow_integration.sql` — adiciona campos ProFlow em `proposals` e cria `proflow_integration_logs`
- Comando: `npx supabase db push`
- Resultado: ✅ aplicado com sucesso (warning de cache do pg-delta não impediu aplicação)

### Fase 4 — Configurar secrets

- Comando: `./scripts/configure-proflow-secrets.sh pgnhrkulekwoezerjlty`
- Secrets configurados:
  - `PROFLOW_API_URL`
  - `PROFLOW_PYSCRIPT_ENDPOINT`
  - `PROFLOW_SERVICE_TOKEN`
  - `PROFLOW_PORTAL_URL`
  - `PYSCRIPT_ALLOWED_ADMIN_EMAILS`
- Observação: `SUPABASE_SERVICE_ROLE_KEY` não foi configurado como secret personalizado porque o Supabase Edge Function runtime já injeta essa variável automaticamente. Tentar configurá-la resulta em "Env name cannot start with SUPABASE_".
- Resultado: ✅ secrets configurados

### Fase 5 — Deploy das Edge Functions

- Comandos:
  - `npx supabase functions deploy proflow-create-project`
  - `npx supabase functions deploy proflow-resend-invite`
- Resultado: ✅ ambas deployadas e ativas
- Verificação: `npx supabase functions list` mostra status ACTIVE
- Warning: CLI recomenda usar `deno.json` por função em vez de `import_map.json` global. Funções funcionam normalmente.

### Fase 6 — Teste de segurança real

- Teste de chamada sem autenticação:
  - `curl -i -X POST .../functions/v1/proflow-create-project`
  - Resposta: `401 UNAUTHORIZED_NO_AUTH_HEADER` ✅
- Tokens não expostos no frontend ✅
- Build não contém secrets ✅

### Fase 7 — Teste E2E real

- Não executado.
- Bloqueio identificado: API da ProFlow não está acessível no endpoint configurado.

## Bloqueio encontrado

Durante a validação da API da ProFlow, os seguintes testes retornaram erro:

```bash
curl https://api.proflow.pro/api/v1/projects/pyscript/
# Resposta: 404 Not Found

curl https://api.proflow.pro/api/v1/
# Resposta: 404 Not Found

curl https://proflow.pro/api/v1/projects/pyscript/
# Resposta: 307 redirect para www.proflow.pro, depois 405 Method Not Allowed (HTML do frontend)
```

Isso indica que o `PROFLOW_API_URL` configurado (`https://api.proflow.pro`) ou o endpoint `/api/v1/projects/pyscript/` não estão corretos.

## Outro ponto de atenção

O valor fornecido para `PROFLOW_SERVICE_TOKEN` é idêntico ao `SUPABASE_SERVICE_ROLE_KEY` (`sb_secret_REDACTED`). Isso sugere que a mesma chave foi copiada para ambos. A ProFlow provavelmente exige um token diferente (JWT ou API key específica da ProFlow), e não a service role key do Supabase.

## Pendências para concluir E2E

1. Confirmar a URL base correta da API da ProFlow (ex: `https://api.proflow.pro`, `https://proflow.pro/api`, ou outra).
2. Confirmar o endpoint correto para criação de projeto via PyScript (ex: `/api/v1/projects/pyscript/`, `/projects/pyscript/`, etc.).
3. Confirmar o formato de autenticação esperado pela ProFlow (Bearer JWT, API key header, etc.).
4. Fornecer o `PROFLOW_SERVICE_TOKEN` correto, caso o valor atual seja realmente a service role key do Supabase.
5. Executar teste E2E real após correção da API.

## Build e testes locais

- `npm test -- --watchAll=false` ✅ 9 passaram
- `npm run build` ✅
- `deno check` das Edge Functions ✅

## Conclusão

A infraestrutura Supabase está totalmente configurada: projeto linkado, migration aplicada, Edge Functions deployadas e secrets configurados. A integração não pode ser testada end-to-end enquanto a URL/base da API da ProFlow e o token correto não forem confirmados.
