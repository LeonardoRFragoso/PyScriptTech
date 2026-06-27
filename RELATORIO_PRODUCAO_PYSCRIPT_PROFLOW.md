# Relatório de Produção — PyScriptTech ↔ ProFlow.pro

## 1. Status final da integração

**Integração aprovada e fechada para produção.**

A integração B2B entre o CRM PyScriptTech e a ProFlow.pro foi validada por um E2E real em 2026-06-27. Todos os componentes críticos estão configurados, versionados e testados.

## 2. Data do E2E aprovado

2026-06-27.

## 3. IDs criados no teste

### PyScriptTech (Supabase)

| Entidade | ID | Email/Identificador |
|----------|----|---------------------|
| Usuário admin de teste | `6d2186be-8c62-4752-b34e-de48d98ad79e` | `e2e.proflow+admin@pyscript.tech` |
| Lead E2E #1 | `35b875d8-d333-42f7-a14b-78783683adeb` | `cliente.e2e.pyscript+proflow@pyscript.tech` |
| Proposta E2E #1 | `b01b7d88-30c3-4b0c-bdc3-492ce82e2aa5` | `[TESTE E2E] Integracao PyScript ProFlow` |
| Lead E2E #2 | `5bbd9744-8d9f-4427-bf12-a98dc4ca07dc` | `cliente.e2e2.pyscript+proflow@pyscript.tech` |
| Proposta E2E #2 | `d6418618-cccb-46df-88ab-9b18f0d50037` | `[TESTE E2E 2] Integracao PyScript ProFlow` |

### ProFlow.pro

| E2E | project_id | contract_id | milestone_ids | client_email |
|-----|------------|-------------|---------------|--------------|
| E2E #1 | `14` | `4` | `5`, `6` | `cliente.e2e.pyscript+proflow@pyscript.tech` |
| E2E #2 | `15` | `5` | `6`, `7` | `cliente.e2e2.pyscript+proflow@pyscript.tech` |

## 4. Edge Functions em produção

- `proflow-create-project`
- `proflow-resend-invite`

Ambas deployadas no Supabase project-ref `pgnhrkulekwoezerjlty` e ativas.

## 5. Supabase Secrets configurados

Apenas os nomes dos secrets estão listados. Nenhum valor está presente neste documento.

- `PROFLOW_API_URL`
- `PROFLOW_PYSCRIPT_ENDPOINT`
- `PROFLOW_SERVICE_TOKEN`
- `PROFLOW_REFRESH_TOKEN`
- `PROFLOW_PORTAL_URL`
- `PYSCRIPT_ALLOWED_ADMIN_EMAILS`
- `SUPABASE_SERVICE_ROLE_KEY`
- `SUPABASE_URL` (implícito pela configuração do projeto)

## 6. Migrations versionadas

Migrations commitadas neste fechamento:

- `supabase/migrations/20260627140000_grant_authenticated.sql`
- `supabase/migrations/20260627141000_grant_service_role.sql`
- `supabase/migrations/20260627142000_alter_proflow_ids_to_text.sql`

Migrations de schema base já existentes:

- `supabase/migrations/20260627110000_base_schema.sql`
- `supabase/migrations/20260627113309_proflow_integration.sql`

## 7. Como executar novo E2E no futuro

Pré-requisitos:

1. Secrets configurados no Supabase.
2. Edge Functions deployadas.
3. Migrations aplicadas (`npx supabase db push`).
4. Usuário admin cadastrado com permissão (`admin`, `owner`, `sales_manager` ou `project_manager`) ou e-mail na lista `PYSCRIPT_ALLOWED_ADMIN_EMAILS`.

Passos:

1. Criar lead com `stage = 'proposta_aceita'`.
2. Criar proposta com `status = 'accepted'` e `total_value > 0`.
3. Acessar a tela de Propostas do CRM PyScriptTech.
4. Clicar em "Integrar com ProFlow" para a proposta aceita.
5. Confirmar no modal de pré-visualização.
6. Verificar:
   - resposta 200 da Edge Function;
   - `proflow_project_id` e `proflow_contract_id` preenchidos na proposta;
   - `proflow_invitation_sent = true`;
   - registro na tabela `proflow_integration_logs`.

Para teste via HTTP direto:

```bash
npx supabase functions invoke proflow-create-project --no-verify-jwt \
  --data '{"lead_id":"<lead_id>","proposal_id":"<proposal_id>"}'
```

Para teste com usuário autenticado:

```bash
SUPABASE_ACCESS_TOKEN=$(python3 - <<'PY'
import requests
url = 'https://pgnhrkulekwoezerjlty.supabase.co'
key = '<anon-key>'
resp = requests.post(f'{url}/auth/v1/token?grant_type=password',
  headers={'apikey': key, 'Content-Type': 'application/json'},
  json={'email': '<admin-email>', 'password': '<password>'})
print(resp.json()['access_token'])
PY
)

curl -X POST \
  https://pgnhrkulekwoezerjlty.supabase.co/functions/v1/proflow-create-project \
  -H "Authorization: Bearer $SUPABASE_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"lead_id":"<lead_id>","proposal_id":"<proposal_id>"}'
```

> Nunca usar a `SUPABASE_SERVICE_ROLE_KEY` nem o `PROFLOW_SERVICE_TOKEN` no frontend ou em scripts versionados.

## 8. Como limpar dados de teste

Ver o documento `CHECKLIST_LIMPEZA_DADOS_TESTE_PROFLOW.md` para o passo a passo completo.

Resumo:

- No Supabase: remover logs, propostas, leads e usuários de teste.
- Na ProFlow: remover projetos, contratos, milestones e convites dos testes.

## 9. Pendências restantes

1. **Validação direta de `source` e `is_b2b` na API ProFlow:**
   - O gestor `gestor@pyscript.tech` consegue logar, mas o endpoint GET para projetos B2B privados não foi identificado.
   - A criação é comprovada pelo retorno 201 da Edge Function e pelos IDs salvos.
   - Recomendação: confirmar com o time ProFlow que o projeto `15` está marcado como `source='pyscript'` e `is_b2b=true` no painel administrativo.

2. **Limpeza dos dados de teste:**
   - Não executada automaticamente. Deve ser feita manualmente conforme checklist.

3. **Rotacionar `SUPABASE_SERVICE_ROLE_KEY` (opcional):**
   - Se o key foi exposto em algum ambiente de teste, recomenda-se rotacionar no Supabase Dashboard.

4. **Rotacionar tokens da ProFlow (opcional):**
   - Após o fechamento, avaliar se os JWTs usados em teste devem ser renovados para produção estável.

## 10. Procedimento de rollback

Se a integração precisar ser desativada:

1. **Desativar a Edge Function** no Supabase Dashboard (Edge Functions > desabilitar ou remover deploy).
2. **Remover secrets** do Supabase (Project Settings > Edge Functions > Secrets).
3. **Reverter migrations** (se necessário):

```sql
BEGIN;

-- Remover colunas ProFlow
ALTER TABLE proposals
  DROP COLUMN IF EXISTS proflow_project_id,
  DROP COLUMN IF EXISTS proflow_contract_id,
  DROP COLUMN IF EXISTS proflow_milestone_ids,
  DROP COLUMN IF EXISTS proflow_portal_url,
  DROP COLUMN IF EXISTS proflow_client_email,
  DROP COLUMN IF EXISTS proflow_client_status,
  DROP COLUMN IF EXISTS proflow_invitation_sent,
  DROP COLUMN IF EXISTS proflow_sync_status,
  DROP COLUMN IF EXISTS proflow_sync_error,
  DROP COLUMN IF EXISTS proflow_synced_at,
  DROP COLUMN IF EXISTS proflow_last_attempt_at;

DROP TABLE IF EXISTS proflow_integration_logs;

COMMIT;
```

4. **Remover chamadas do frontend** nas telas de Propostas (`ProFlowModal.jsx`, `ProposalsList.jsx`).
5. **Remover serviço cliente** `src/services/proflowIntegration.js` se não for mais usado.

## 11. Observação de segurança

- **Nunca** usar o `PROFLOW_SERVICE_TOKEN` no frontend React.
- **Nunca** versionar `.env`, JWTs, service role keys ou refresh tokens.
- **Sempre** sanitizar logs de integração antes de persistir.
- As Edge Functions são o único ponto de contato com a ProFlow API. O frontend chama as Edge Functions com o token de sessão do usuário autenticado.

## 12. Observação operacional

- **PyScriptTech** é a frente comercial: cadastra leads, propostas e dispara a integração.
- **ProFlow.pro** é o portal operacional: executa o projeto, contrato, milestones e convida o cliente.
- A integração só deve ser acionada para propostas com `status = 'accepted'`.

---

Fechamento realizado em: 2026-06-27
Branch: `main`
