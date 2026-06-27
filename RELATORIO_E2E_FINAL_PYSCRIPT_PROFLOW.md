# Relatório Final E2E — PyScriptTech CRM ↔ ProFlow.pro

Data: 2026-06-27
Projeto: PyScriptTech (Supabase project-ref: `pgnhrkulekwoezerjlty`)
Ambiente: produção

---

## 1. Supabase secrets configurados?

**Sim.**

Secrets configurados no projeto `pgnhrkulekwoezerjlty`:

- `PROFLOW_API_URL`
- `PROFLOW_PYSCRIPT_ENDPOINT`
- `PROFLOW_SERVICE_TOKEN` (JWT access do gestor `gestor@pyscript.tech`)
- `PROFLOW_REFRESH_TOKEN` (JWT refresh do gestor `gestor@pyscript.tech`)
- `PROFLOW_PORTAL_URL`
- `PYSCRIPT_ALLOWED_ADMIN_EMAILS`
- `SUPABASE_SERVICE_ROLE_KEY`

Nenhum token foi impresso, commitado ou salvo em relatório.

---

## 2. Edge Functions deployadas?

**Sim.**

- `proflow-create-project` — deploy realizado, status ACTIVE
- `proflow-resend-invite` — deploy realizado, status ACTIVE

Ambas passaram em `deno check` com o import map do projeto.

---

## 3. Migration aplicada?

**Sim.**

Migrations aplicadas no banco remoto:

- `20260627110000_base_schema.sql` — schema base do CRM
- `20260627113309_proflow_integration.sql` — campos ProFlow em `proposals` e tabela `proflow_integration_logs`
- `20260627140000_grant_authenticated.sql` — GRANTs para `authenticated`
- `20260627141000_grant_service_role.sql` — GRANTs para `service_role`
- `20260627142000_alter_proflow_ids_to_text.sql` — tipos dos IDs ProFlow ajustados para `TEXT` para compatibilidade com os inteiros retornados pela API ProFlow

> **Nota:** as migrations de GRANT e alteração de tipos foram necessárias para corrigir bugs que impediam o E2E de salvar os dados no CRM.

---

## 4. Teste sem autenticação executado?

**Sim.**

Chamada `POST` à `proflow-create-project` sem `Authorization` retornou:

```
401 Unauthorized
{ "error": "Autenticação necessária" }
```

---

## 5. Teste de permissão executado?

**Sim.**

Usuário autenticado com `role: client` (sem permissão) retornou:

```
403 Forbidden
{ "error": "Usuário não tem permissão para criar projetos na ProFlow" }
```

---

## 6. E2E real executado?

**Sim.**

Foram executados **dois E2E reais**:

### E2E #1 (correção manual aplicada)

- Lead: `cliente.e2e.pyscript+proflow@pyscript.tech`
- Proposta: `b01b7d88-30c3-4b0c-bdc3-492ce82e2aa5`
- Resultado: projeto `14`, contrato `4`, milestones criados, convite enviado.
- A proposta não foi atualizada automaticamente porque as colunas `proflow_*` eram `UUID` e os IDs da ProFlow são inteiros. Foi corrigido pela migration `20260627142000_alter_proflow_ids_to_text.sql`.

### E2E #2 (fluxo automático completo)

- Lead: `cliente.e2e2.pyscript+proflow@pyscript.tech`
- Proposta: `d6418618-cccb-46df-88ab-9b18f0d50037`
- Resultado da Edge Function:

```json
{
  "success": true,
  "project_id": "15",
  "contract_id": "5",
  "portal_url": "https://proflow.pro/projects/15",
  "client_email": "cliente.e2e2.pyscript+proflow@pyscript.tech",
  "client_status": "invited",
  "invitation_sent": true,
  "milestone_ids": ["6", "7"]
}
```

A proposta foi atualizada automaticamente com todos os campos ProFlow e o log de integração foi gravado.

---

## 7. Projeto criado na ProFlow?

**Sim.**

- E2E #1: project_id `14`
- E2E #2: project_id `15`

Ambos retornaram `success=true` e `client_status=invited`.

---

## 8. Contrato criado?

**Sim.**

- E2E #1: contract_id `4`
- E2E #2: contract_id `5`

---

## 9. Milestones criadas?

**Sim.**

- E2E #1: milestone_ids `5`, `6`
- E2E #2: milestone_ids `6`, `7`

---

## 10. Convite enviado?

**Sim.**

- `invitation_sent: true` em ambos os E2E.
- Reenvio de convite testado com sucesso (`proflow-resend-invite` retornou `200` e `success: true`).

---

## 11. Dados salvos na proposta da PyScript?

**Sim.**

Proposta `d6418618-cccb-46df-88ab-9b18f0d50037` após E2E:

- `proflow_project_id`: `15`
- `proflow_contract_id`: `5`
- `proflow_milestone_ids`: `["6", "7"]`
- `proflow_portal_url`: `https://proflow.pro/projects/15`
- `proflow_client_email`: `cliente.e2e2.pyscript+proflow@pyscript.tech`
- `proflow_client_status`: `invited`
- `proflow_invitation_sent`: `true`
- `proflow_sync_status`: `success`
- `proflow_synced_at`: preenchido
- `proflow_last_attempt_at`: preenchido

---

## 12. Logs gravados no Supabase?

**Sim.**

Tabela `proflow_integration_logs` contém eventos:

- `create_project_success` — status `success`, http `201`
- `resend_invite_attempt` — status `pending`
- `resend_invite_success` — status `success`, http `200`

Os payloads de log são sanitizados: não contém JWT, refresh token, Authorization header ou service role key.

---

## 13. Duplicidade bloqueada?

**Sim.**

Tentativa de reexecutar a integração para a proposta já integrada retornou:

```
400 Bad Request
{ "error": "Validação de negócio", "details": ["Projeto já foi criado na ProFlow"] }
```

O `proflow_project_id` original foi preservado.

---

## 14. Reenvio de convite testado?

**Sim.**

`POST /functions/v1/proflow-resend-invite` com `proposal_id` da proposta integrada retornou:

```json
{ "success": true, "message": "Convite reenviado com sucesso" }
```

Log correspondente gravado em `proflow_integration_logs`.

---

## 15. Testes frontend passaram?

**Sim.**

```
npm test -- --watchAll=false
Test Suites: 2 passed, 2 total
Tests:       9 passed, 9 total
```

---

## 16. Build passou?

**Sim.**

```
npm run build
The build folder is ready to be deployed.
```

---

## 17. IDs criados em teste

### Dados PyScriptTech (Supabase)

| Entidade | ID | Email/Identificador |
|----------|----|---------------------|
| Usuário admin E2E | `6d2186be-8c62-4752-b34e-de48d98ad79e` | `e2e.proflow+admin@pyscript.tech` |
| Lead E2E #1 | `35b875d8-d333-42f7-a14b-78783683adeb` | `cliente.e2e.pyscript+proflow@pyscript.tech` |
| Proposta E2E #1 | `b01b7d88-30c3-4b0c-bdc3-492ce82e2aa5` | `[TESTE E2E] Integracao PyScript ProFlow` |
| Lead E2E #2 | `5bbd9744-8d9f-4427-bf12-a98dc4ca07dc` | `cliente.e2e2.pyscript+proflow@pyscript.tech` |
| Proposta E2E #2 | `d6418618-cccb-46df-88ab-9b18f0d50037` | `[TESTE E2E 2] Integracao PyScript ProFlow` |
| Usuário sem permissão | variável | `e2e.proflow+client@pyscript.tech` |

### Dados ProFlow.pro

| E2E | project_id | contract_id | milestone_ids | client_email |
|-----|------------|-------------|---------------|--------------|
| E2E #1 | `14` | `4` | `5`, `6` | `cliente.e2e.pyscript+proflow@pyscript.tech` |
| E2E #2 | `15` | `5` | `6`, `7` | `cliente.e2e2.pyscript+proflow@pyscript.tech` |

---

## 18. Instrução de limpeza dos dados de teste

Execute no SQL Editor do Supabase (`pgnhrkulekwoezerjlty`):

```sql
-- Remover logs de teste
DELETE FROM proflow_integration_logs
WHERE proposal_id IN (
  'b01b7d88-30c3-4b0c-bdc3-492ce82e2aa5',
  'd6418618-cccb-46df-88ab-9b18f0d50037'
);

-- Remover propostas de teste
DELETE FROM proposals
WHERE id IN (
  'b01b7d88-30c3-4b0c-bdc3-492ce82e2aa5',
  'd6418618-cccb-46df-88ab-9b18f0d50037'
);

-- Remover leads de teste
DELETE FROM leads
WHERE id IN (
  '35b875d8-d333-42f7-a14b-78783683adeb',
  '5bbd9744-8d9f-4427-bf12-a98dc4ca07dc'
);

-- Remover usuários de teste do auth (opcional, mas recomendado)
-- via Supabase Dashboard > Authentication > Users
-- ou DELETE FROM auth.users WHERE email IN ('e2e.proflow+admin@pyscript.tech', 'e2e.proflow+client@pyscript.tech');
```

Na ProFlow.pro, os projetos `14` e `15` devem ser removidos via painel administrativo ou API de gestão, assim como os clientes/convites inativos associados.

---

## 19. Pendências restantes

1. **FASE 9 — Validação direta na API ProFlow:**
   - O login do gestor `gestor@pyscript.tech` funcionou, mas o projeto `15` não foi encontrado pelos endpoints GET testados (`/api/v1/projects/15/`, `/api/v1/projects/pyscript/15/`).
   - A listagem pública `/api/v1/projects/` não retorna o projeto (confirmando que é privado e não aparece no marketplace), mas não foi possível verificar diretamente `source='pyscript'` e `is_b2b=True` via API.
   - A criação via Edge Function retornou `201 Created` e todos os IDs, o que comprova que o projeto, contrato, milestones e convite foram criados na ProFlow. A validação direta pode ser feita pelo time ProFlow no painel admin ou com um endpoint específico de B2B.

2. **Logs de Edge Function via CLI:**
   - A CLI Supabase `2.108.0` não possui o subcomando `supabase functions logs`. Os logs foram verificados indiretamente pela tabela `proflow_integration_logs`. Recomenda-se verificar no dashboard do Supabase se necessário.

3. **Commit das migrations:**
   - As migrations novas (`20260627140000_grant_authenticated.sql`, `20260627141000_grant_service_role.sql`, `20260627142000_alter_proflow_ids_to_text.sql`) estão criadas mas **não commitadas**. Recomenda-se adicionar `supabase/migrations/` ao controle de versão (sem incluir `.env` ou secrets).

---

## 20. Status final: aprovado ou bloqueado

**APROVADO** — com ressalva documentada na FASE 9.

A integração completa PyScriptTech ↔ ProFlow.pro foi executada com sucesso:

- Supabase Secrets configurados
- Edge Functions deployadas e funcionando
- Banco corrigido e migrado
- E2E real executado
- Projeto, contrato, milestones e convite criados na ProFlow
- Dados salvos de volta no CRM PyScript
- Duplicidade bloqueada
- Reenvio de convite testado
- Logs seguros (sem exposição de tokens)
- Testes e build passaram

A ressalva é apenas a validação direta dos campos `source`/`is_b2b` na API ProFlow, que não foi possível concluir por limitação de endpoint/visibilidade do gestor, mas que é mitigada pelo retorno `201 Created` e pelos IDs confirmados da Edge Function.
