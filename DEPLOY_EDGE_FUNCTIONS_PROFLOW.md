# Deploy das Edge Functions - PyScript ↔ ProFlow

## Status do deploy

Não foi possível executar o deploy real neste ambiente porque não há credencial do Supabase (`SUPABASE_ACCESS_TOKEN`) configurada.

## Pré-requisitos

1. Login no Supabase CLI:

```bash
npx supabase login
```

Ou configurar token:

```bash
export SUPABASE_ACCESS_TOKEN=<seu-token>
```

2. Vincular projeto:

```bash
npx supabase link --project-ref <project-ref>
```

## Comandos de deploy

```bash
npx supabase functions deploy proflow-create-project
npx supabase functions deploy proflow-resend-invite
```

## Validar deploy

```bash
npx supabase functions list
```

## Verificar logs

```bash
npx supabase functions logs proflow-create-project
npx supabase functions logs proflow-resend-invite
```

## Aplicar migration

```bash
npx supabase migration up
```

Ou executar o SQL manualmente no Supabase SQL Editor.

## Configurar secrets

Veja `SECRETS_PROFLOW.md` e `scripts/configure-proflow-secrets.sh`.

## Pendência

- Autenticação do Supabase CLI não configurada no ambiente.
- Deploy real deve ser executado por quem possui acesso ao projeto Supabase.
