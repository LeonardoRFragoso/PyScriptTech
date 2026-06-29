# Relatório de Execução de Deploy Real - PyScript ↔ ProFlow

## Data

Junho de 2026

## Ambiente verificado

- Supabase CLI: `2.108.0` ✅
- Credenciais disponíveis no ambiente: ❌

## Status das credenciais

| Variável | Status |
|----------|--------|
| `SUPABASE_ACCESS_TOKEN` | não configurada |
| `SUPABASE_SERVICE_ROLE_KEY` | não configurada |
| `PROFLOW_SERVICE_TOKEN` | não configurada |
| `PROFLOW_REFRESH_TOKEN` | não configurada |
| `SUPABASE_PROJECT_REF` | não configurada |

## Execução das fases

### Fase 1 — Confirmar ambiente

- Supabase CLI funcionando.
- Credenciais não disponíveis no ambiente.

### Fase 2 — Linkar projeto Supabase

- Não executado por falta de `SUPABASE_ACCESS_TOKEN` e `project-ref`.

### Fase 3 — Aplicar migration

- Não executado. Requer projeto linkado.

### Fase 4 — Configurar secrets

- Não executado. Requer `PROFLOW_SERVICE_TOKEN` e `SUPABASE_SERVICE_ROLE_KEY`.

### Fase 5 — Deploy das Edge Functions

- Não executado. Requer autenticação no Supabase.

### Fase 6 — Teste de segurança real

- Não executado. Requer Edge Functions deployadas.

### Fase 7 — Teste E2E real

- Não executado. Requer deploy e credenciais da ProFlow.

## Bloqueio

O deploy real e o teste E2E estão bloqueados pela ausência de credenciais no ambiente. Sem elas, não é possível:

- Autenticar no Supabase CLI.
- Linkar o projeto.
- Deployar Edge Functions.
- Aplicar migrations.
- Configurar secrets.
- Chamar a API da ProFlow.

## Próximos passos para o usuário

1. Obter `SUPABASE_ACCESS_TOKEN` em https://app.supabase.com/account/tokens.
2. Obter `project-ref` no dashboard do Supabase.
3. Obter `SUPABASE_SERVICE_ROLE_KEY` em Project Settings > API.
4. Obter `PROFLOW_SERVICE_TOKEN` (JWT de gestor) na ProFlow.
5. Obter `PROFLOW_REFRESH_TOKEN` se disponível.

Após obter as credenciais, execute:

```bash
export SUPABASE_ACCESS_TOKEN=<token>
export SUPABASE_PROJECT_REF=<project-ref>
export SUPABASE_SERVICE_ROLE_KEY=<service-role-key>
export PROFLOW_SERVICE_TOKEN=<jwt>
export PROFLOW_REFRESH_TOKEN=<refresh-token>

# Linkar projeto
npx supabase link --project-ref $SUPABASE_PROJECT_REF

# Aplicar migration
npx supabase migration up

# Configurar secrets
./scripts/configure-proflow-secrets.sh $SUPABASE_PROJECT_REF

# Deployar Edge Functions
npx supabase functions deploy proflow-create-project
npx supabase functions deploy proflow-resend-invite

# Validar
npx supabase functions list
```

## Conclusão

A integração está implementada e pronta para deploy, mas a execução real depende de credenciais que não estão disponíveis no ambiente atual. Nenhuma ação que exija credenciais foi executada para evitar exposição ou erros de autenticação.
