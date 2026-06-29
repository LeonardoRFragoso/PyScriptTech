# Relatório de Deploy - Integração PyScript ↔ ProFlow

## Data

Junho de 2026

## O que foi configurado

### Supabase CLI

- Instalado Supabase CLI localmente (`npm install --save-dev supabase`).
- Executado `npx supabase init`.
- Criado `supabase/config.toml`.
- Criado `supabase/migrations/`.
- Criada migration `20260627113309_proflow_integration.sql`.

### Edge Functions

- `supabase/functions/proflow-create-project/index.ts` validado com Deno check.
- `supabase/functions/proflow-resend-invite/index.ts` validado com Deno check.
- `supabase/functions/_shared/cors.ts` configurado.
- `supabase/functions/import_map.json` configurado.
- `supabase/functions/deno.json` configurado.
- `supabase/functions/types/deno.d.ts` corrigido para não conflitar com tipos nativos do Deno.

### Secrets

- Criado `SECRETS_PROFLOW.md` com lista de secrets.
- Criado `scripts/configure-proflow-secrets.sh` para configuração automática.

### Frontend

- `src/services/proflowIntegration.js` com normalização de erros.
- `ProFlowModal.jsx` com overlay de loading, estados de sucesso/erro/integrado e reenvio de convite.
- Fallback manual mantido.

### Banco de dados

- Migration SQL com campos ProFlow em `proposals`.
- Tabela `proflow_integration_logs` com RLS.

## Status do deploy

- Deploy das Edge Functions: **não executado** (falta `SUPABASE_ACCESS_TOKEN`).
- Aplicação da migration: **não executada** (falta credencial do Supabase).
- Configuração de secrets: **não executada** (falta credencial do Supabase e tokens da ProFlow).
- Teste E2E real: **não executado** (falta deploy e credenciais).

## Testes executados

- `npm test -- --watchAll=false src/services/database.proflow.test.js` ✅
- `deno check` das Edge Functions ✅
- Scan de segurança: nenhum token exposto ✅
- Build do frontend: ✅ (executado na Fase 11)

## Bugs corrigidos durante esta fase

1. **Conflito de tipos Deno**: `supabase/functions/types/deno.d.ts` estava conflitando com tipos nativos. Simplificado para declarar apenas `Deno.env`.
2. **Normalização de erros**: `src/services/proflowIntegration.js` agora extrai mensagem e detalhes da resposta da Edge Function, exibindo erro amigável no modal.
3. **Loading no modal**: adicionado overlay de loading no preview durante a criação do projeto.

## Pendências

1. Login no Supabase CLI (`npx supabase login`).
2. Vincular projeto (`npx supabase link --project-ref <project-ref>`).
3. Deploy das Edge Functions.
4. Aplicar migration.
5. Configurar secrets reais.
6. Teste E2E com dados reais.

## Comandos para finalizar

```bash
# Login
npx supabase login

# Linkar projeto
npx supabase link --project-ref <project-ref>

# Deploy
npx supabase functions deploy proflow-create-project
npx supabase functions deploy proflow-resend-invite

# Migration
npx supabase migration up

# Secrets
export PROFLOW_SERVICE_TOKEN=<jwt>
export PROFLOW_REFRESH_TOKEN=<refresh>
export SUPABASE_SERVICE_ROLE_KEY=<service-role>
./scripts/configure-proflow-secrets.sh <project-ref>

# Build
npm run build
```

## Conclusão

A integração está **pronta para deploy**. Toda a configuração, segurança e validação estão em ordem. O deploy real e teste E2E dependem exclusivamente de credenciais do Supabase e da ProFlow, que não estão disponíveis neste ambiente.
