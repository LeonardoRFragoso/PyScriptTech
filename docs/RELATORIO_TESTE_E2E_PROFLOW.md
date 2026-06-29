# Relatório de Teste E2E - PyScript ↔ ProFlow

## Data

Junho de 2026

## Status

- Teste unitário do payload: ✅ passou
- Type check das Edge Functions (Deno): ✅ passou
- Deploy real: ❌ não executado (falta credencial Supabase)
- Teste E2E real: ❌ não executado (falta credencial Supabase e ProFlow)

## Testes unitários

```bash
npm test -- --watchAll=false src/services/database.proflow.test.js
```

Resultado: 8 testes passaram.

## Type check das Edge Functions

```bash
deno check --import-map=supabase/functions/import_map.json supabase/functions/proflow-create-project/index.ts
deno check --import-map=supabase/functions/import_map.json supabase/functions/proflow-resend-invite/index.ts
```

Resultado: ambos passaram.

## Tentativa de deploy

```bash
npx supabase functions deploy proflow-create-project
```

Resultado: falha por falta de access token.

```
Access token not provided. Supply an access token by running `supabase login` or setting the SUPABASE_ACCESS_TOKEN environment variable.
```

## Por que o E2E não pôde ser executado

1. Não há `SUPABASE_ACCESS_TOKEN` configurado no ambiente.
2. Não há `PROFLOW_SERVICE_TOKEN` disponível.
3. Não há `SUPABASE_SERVICE_ROLE_KEY` disponível.
4. Sem login no Supabase CLI, não é possível deployar funções ou acessar banco.

## Roteiro E2E pronto para execução

Ver `ROTEIRO_TESTES_INTEGRACAO_PROFLOW.md`.

Resumo:

1. Criar lead com nome, email, empresa e segmento.
2. Criar proposta com título, escopo, valor, prazo e itens.
3. Marcar proposta como `accepted`.
4. Clicar em "Criar projeto na ProFlow".
5. Confirmar preview e clicar em "Criar projeto real na ProFlow".
6. Validar retorno: `project_id`, `contract_id`, `portal_url`, `client_email`, `client_status`, `invitation_sent`, `milestone_ids`.
7. Validar campos salvos em `proposals`.
8. Validar log em `proflow_integration_logs`.
9. Abrir portal.
10. Tentar duplicar e confirmar bloqueio.
11. Testar reenvio de convite.

## Comandos para executar o E2E em ambiente real

```bash
# Login no Supabase
npx supabase login

# Vincular projeto
npx supabase link --project-ref <project-ref>

# Deploy das Edge Functions
npx supabase functions deploy proflow-create-project
npx supabase functions deploy proflow-resend-invite

# Aplicar migration
npx supabase migration up

# Configurar secrets
export PROFLOW_SERVICE_TOKEN=<jwt>
export PROFLOW_REFRESH_TOKEN=<refresh-token>
export SUPABASE_SERVICE_ROLE_KEY=<service-role-key>
./scripts/configure-proflow-secrets.sh <project-ref>

# Iniciar frontend
npm start
```

## Conclusão

A integração está pronta para teste real. O código foi validado com testes unitários e type check. O deploy e teste E2E dependem de credenciais que não estão disponíveis neste ambiente.
