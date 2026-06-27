# Relatório E2E — Fluxo Comercial Completo PyScriptTech ↔ ProFlow

Data: 2026-06-27
Status: **APROVADO**

## 1. Commit testado

`3ae7551dce18c0afaeb37e9ae6a84a9f1e823061` — `feat: implement public proposal link, digital acceptance and commercial funnel automation`

## 2. Credenciais temporárias

- Carregadas de `/home/leonardo/.secrets/pyscript-e2e.env`.
- Variáveis presentes: `REACT_APP_SUPABASE_URL`, `REACT_APP_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `PYSCRIPT_MANAGER_EMAIL`, `PYSCRIPT_MANAGER_PASSWORD`.
- **Valores não impressos no relatório.**

## 3. JWT ProFlow

- Gerado automaticamente via login em `https://api.proflow.pro/api/v1/token/`.
- Access token e refresh token salvos temporariamente em `/tmp/proflow_tokens.env`.
- **Valores não impressos no relatório.**

## 4. Supabase Secrets

- Atualizados: `PROFLOW_API_URL`, `PROFLOW_PORTAL_URL`, `PROFLOW_PYSCRIPT_ENDPOINT`, `PROFLOW_SERVICE_TOKEN`, `PROFLOW_REFRESH_TOKEN`, `PYSCRIPT_ALLOWED_ADMIN_EMAILS`.
- `SUPABASE_SERVICE_ROLE_KEY` não pode ser sobrescrito via CLI (`Env name cannot start with SUPABASE_`), mas já existia configurado.

## 5. Edge Functions deployadas

- `proposal-generate-public-link` — ACTIVE
- `proposal-public-view` — ACTIVE
- `proposal-public-accept` — ACTIVE
- `proflow-create-project` — ACTIVE
- `proflow-resend-invite` — ACTIVE

## 6. Migration aplicada

- `20260627150000_proposal_public_acceptance.sql` — Remote database is up to date.

## 7. Lead de teste criado

- ID: `ddf7dcb4-4b69-4978-9743-50929b30e30f`
- Nome: `Cliente E2E Fluxo Comercial Automatizado`
- Email: `cliente.e2e.fluxo.comercial.auto@pyscript.tech`
- Empresa: `Empresa E2E Comercial Auto`
- Segmento: `Tecnologia`
- Origem: `e2e-commercial-flow-auto`

## 8. Proposta de teste criada

- ID: `80cc582a-0cfa-4ea1-b967-054159a73b75`
- Título: `[TESTE E2E COMERCIAL AUTO] PyScript → ProFlow`
- Valor: `R$ 1.000,00`
- Itens: 2 (R$ 500,00 cada)
- Status inicial: `draft`

## 9. Link público gerado

- URL: `https://pyscript.tech/proposta/d728d35a-053c-4e9d-a534-fdd90d995bcb-7f8ba23c31ccd1a2ef8ebc6263d1371a`
- **Token puro não salvo no relatório; hash armazenado no banco.**

## 10. Página pública carregou?

Sim. A função `proposal-public-view` retornou dados seguros da proposta.

## 11. Proposta visualizada?

Sim. `public_viewed_at` preenchido e `acceptance_status` atualizado para `viewed`.

## 12. Aceite digital funcionou?

Sim. Cliente aceitou com nome `Cliente E2E` e email `cliente.e2e.fluxo.comercial.auto@pyscript.tech`.

## 13. Proposta virou `accepted`?

Sim. `status=accepted`, `acceptance_status=accepted`, `accepted_at` preenchido, `accepted_by_name` e `accepted_by_email` salvos.

## 14. Lead mudou de etapa?

Sim. `stage` atualizado para `fechado`.

## 15. Atividade foi registrada?

Sim. Atividades registradas:
- Proposta enviada ao cliente via link público.
- Cliente visualizou a proposta via link público.
- Cliente aceitou a proposta digitalmente.

## 16. Botão/condição ProFlow liberada?

Sim. Após aceite, a proposta está `accepted`, permitindo a integração.

## 17. Projeto ProFlow criado?

Sim. Edge Function `proflow-create-project` retornou sucesso.

## 18. IDs ProFlow criados

- `proflow_project_id`: `16`
- `proflow_contract_id`: `6`
- `proflow_milestone_ids`: `8`, `9`
- `proflow_portal_url`: `https://proflow.pro/projects/16`
- `proflow_client_status`: `invited`
- `proflow_invitation_sent`: `true`
- `proflow_sync_status`: `success`

## 19. Logs Supabase criados

- 1 log em `proflow_integration_logs`.
- Evento: `create_project_success`
- Status: `success`
- **Não contém tokens na coluna `request_payload_safe`/`response_payload_safe`.**

## 20. Testes de segurança executados

- Link inválido retorna `404`.
- Aceite duplicado retorna `400`.
- Payload público não contém `proflow_project_id`, `proflow_contract_id`, `proflow_milestone_ids`, `proflow_sync_status`, tokens ou IDs internos sensíveis.
- Grep no frontend: 0 ocorrências de `SUPABASE_SERVICE_ROLE_KEY`, `PROFLOW_SERVICE_TOKEN`, `PROFLOW_REFRESH_TOKEN`.
- Grep no frontend: 0 ocorrências de `Authorization: Bearer`.
- Teste de link desativado não executado (requeria ação manual de revogação; a feature existe via `public_access_enabled=false`).

## 21. Testes frontend passaram?

Sim. `npm test -- --watchAll=false` — 9/9 passaram.

## 22. Build passou?

Sim. `npm run build` — sucesso.

## 23. Dados de teste e instrução de limpeza

Registros criados para limpeza:

- Lead: `ddf7dcb4-4b69-4978-9743-50929b30e30f`
- Proposta: `80cc582a-0cfa-4ea1-b967-054159a73b75`
- Usuário Supabase: `e2e.manager@pyscript.tech`
- Projeto ProFlow: `16`
- Contrato ProFlow: `6`
- Milestones ProFlow: `8`, `9`

Instruções de limpeza:

```sql
-- Supabase
DELETE FROM proflow_integration_logs WHERE proposal_id = '80cc582a-0cfa-4ea1-b967-054159a73b75';
DELETE FROM proposals WHERE id = '80cc582a-0cfa-4ea1-b967-054159a73b75';
DELETE FROM leads WHERE id = 'ddf7dcb4-4b69-4978-9743-50929b30e30f';
```

```bash
# Remover usuário de teste no Supabase Auth
npx supabase auth delete --project-ref pgnhrkulekwoezerjlty <user-id>
# ou via dashboard
```

```bash
# ProFlow
# Remover projeto, contrato e milestones manualmente no dashboard da ProFlow
# Projeto ID: 16
```

## 24. Status final

**APROVADO.**

O fluxo comercial completo foi validado E2E:

Lead → Proposta → Envio → Link público → Visualização → Aceite digital → CRM atualizado → ProFlow integrado.

## 25. Arquivos temporários

- `/home/leonardo/.secrets/pyscript-e2e.env` — credenciais (não commitar).
- `/tmp/proflow_tokens.env` — tokens ProFlow (não commitar).
- `/tmp/e2e_results.json` — IDs do E2E (não commitar).
- `/tmp/e2e_commercial_flow.py` — script de teste (não commitar).

## 26. Recomendações

- Apagar o arquivo `/home/leonardo/.secrets/pyscript-e2e.env` após uso.
- Rotacionar a senha do gestor ProFlow e as chaves Supabase se houver risco de exposição.
- Executar limpeza dos dados de teste antes de usar o ambiente para produção.
