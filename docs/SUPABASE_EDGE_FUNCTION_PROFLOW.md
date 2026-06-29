# Supabase Edge Functions - ProFlow Integration

## Edge Functions

### 1. `proflow-create-project`

Cria projeto B2B na ProFlow a partir de proposta aceita.

**Arquivo**: `supabase/functions/proflow-create-project/index.ts`

**Payload recebido**:

```json
{
  "lead_id": "uuid",
  "proposal_id": "uuid"
}
```

**Fluxo**:
1. Valida autenticação do usuário PyScript.
2. Verifica permissão (email autorizado ou role).
3. Busca proposta e lead no Supabase.
4. Valida regras de negócio.
5. Atualiza status para `pending`.
6. Monta payload para ProFlow.
7. Chama `POST /api/v1/projects/pyscript/`.
8. Se 401, tenta refresh token e repete.
9. Salva retorno na tabela `proposals`.
10. Salva log na tabela `proflow_integration_logs`.

**Resposta de sucesso**:

```json
{
  "success": true,
  "project_id": "uuid",
  "contract_id": "uuid",
  "portal_url": "https://proflow.pro/projects/uuid",
  "client_email": "cliente@empresa.com",
  "client_status": "invited",
  "invitation_sent": true,
  "milestone_ids": ["uuid", "uuid"]
}
```

### 2. `proflow-resend-invite`

Reenvia convite de acesso ao cliente.

**Arquivo**: `supabase/functions/proflow-resend-invite/index.ts`

**Payload recebido**:

```json
{
  "proposal_id": "uuid"
}
```

**Requisitos**:
- Proposta deve ter `proflow_sync_status='success'`.
- Proposta deve ter `proflow_project_id`.
- Proposta deve ter `proflow_client_email`.

## Configuração local

Instalar Supabase CLI:

```bash
npm install -g supabase
```

Login:

```bash
supabase login
```

Inicializar projeto:

```bash
supabase init
```

Servir função localmente:

```bash
supabase functions serve proflow-create-project --env-file ./.env.local
```

## Deploy

```bash
supabase functions deploy proflow-create-project
supabase functions deploy proflow-resend-invite
```

## Configuração de secrets

Definir secrets via Supabase Dashboard ou CLI:

```bash
supabase secrets set PROFLOW_API_URL=https://api.proflow.pro
supabase secrets set PROFLOW_PYSCRIPT_ENDPOINT=/api/v1/projects/pyscript/
supabase secrets set PROFLOW_SERVICE_TOKEN=<jwt>
supabase secrets set PROFLOW_REFRESH_TOKEN=<refresh-token>
supabase secrets set PROFLOW_PORTAL_URL=https://proflow.pro
supabase secrets set PYSCRIPT_ALLOWED_ADMIN_EMAILS=leonardorfragoso@gmail.com
supabase secrets set SUPABASE_SERVICE_ROLE_KEY=<service-role-key>
```

## Import map

As funções usam `import_map.json` para resolver `@supabase/supabase-js` via `https://esm.sh/`.

## CORS

Arquivo `supabase/functions/_shared/cors.ts` define headers padrão.
