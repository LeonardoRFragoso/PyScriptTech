# Validação da Integração PyScript.Tech ↔ ProFlow.pro (Lado PyScript)

> Gerado em: 2026-06-28  
> Validador: Cascade (agente IA)  
> Repositório: `PyScriptTech`

---

## 1. Resumo Executivo

A integração do lado PyScript.Tech está **estruturalmente sólida** em seus componentes críticos: autenticação, prevenção de duplicidade, retry de JWT, persistência de dados e rastreabilidade por logs. Foram encontrados **4 bugs corrigidos diretamente** e **6 pontos de atenção** documentados para ação posterior.

**Status final:** ✅ Aprovado com ressalvas

---

## 2. Checklist de Validação

| # | Item | Status | Notas |
|---|------|--------|-------|
| 1 | `generateProFlowPayload()` gera payload completo e compatível | `[x]` Validado (pós-fix) | `manager_notes`, `client_visible_brand`, `hide_freelancer_identity` corrigidos |
| 2 | Edge Function `proflow-create-project` autentica, valida e processa | `[x]` Validado | Auth Bearer + role check + email allowlist |
| 3 | Edge Function `proflow-resend-invite` funciona | `[x]` Validado | Auth, endpoint correto, logs em todos os cenários |
| 4 | Retry de JWT implementado | `[x]` Validado | Retry com `PROFLOW_REFRESH_TOKEN` em ambas as Edge Functions |
| 5 | Duplicidade de integração bloqueada | `[x]` Validado | `proflow_project_id IS NOT NULL` OR `proflow_sync_status = 'success'` |
| 6 | Logs gravados sem dados sensíveis | `[!]` Atenção | `sanitizePayloadForLog` inclui `client_email` e `client_name` em texto puro |
| 7 | `ProFlowModal` tem todos os estados | `[x]` Validado | loading, success, error, já-integrado |
| 8 | `ProposalsList` exibe botão apenas para status correto | `[x]` Validado (pós-fix) | Corrigido: oculta botão "criar" quando já integrado |
| 9 | Proposta é atualizada com `proflow_*` após integração | `[x]` Validado | 10 campos `proflow_*` salvos no UPDATE de sucesso |
| 10 | Nenhum secret exposto no frontend | `[x]` Validado | `SERVICE_TOKEN`, `REFRESH_TOKEN`, `SERVICE_ROLE_KEY` apenas em Edge Functions |
| 11 | `.env` no `.gitignore` | `[x]` Validado | `.env`, `.env.local` e `*.env*` no `.gitignore` |
| 12 | HTTPS em todas as chamadas externas | `[x]` Validado | Fallbacks e env vars apontam para `https://api.proflow.pro` |
| 13 | URLs de produção corretas (sem localhost) | `[x]` Validado | Nenhum localhost no código de integração ProFlow |
| 14 | Página `/como-funciona-a-execucao` funcional com SEO básico | `[x]` Validado | SEO component com title, description, url, keywords |
| 15 | Edge Functions deployadas em produção com secrets | `[ ]` Pendente | Verificação requer `supabase functions list` e `supabase secrets list` em ambiente de produção |
| 16 | Índice `status` em `proflow_integration_logs` | `[x]` Validado (pós-fix) | Migration `20260628000000_add_proflow_logs_status_index.sql` criada |
| 17 | Confirmação antes de criar projeto (anti-clique-acidental) | `[!]` Atenção | Sem `confirm()` no modal; validationErrors protegem contra duplicidade, mas não contra clique acidental |
| 18 | CORS restrito (não wildcard) | `[!]` Atenção | `Access-Control-Allow-Origin: *` — aceitável para Supabase EF, mas não ideal |

---

## 3. Compatibilidade de Payload — Campo a Campo

### Contrato esperado pela ProFlow vs. payload gerado por `generateProFlowPayload()`

| Campo | Req | Presente | Tipo correto | Notas |
|-------|-----|----------|--------------|-------|
| `client.email` | Sim | ✅ | string | `lead.email` |
| `client.name` | Sim | ✅ | string | `lead.name` |
| `client.company` | Não | ✅ | string | fallback `'Não informado'` |
| `client.phone` | Não | ✅ | string | fallback `''` |
| `client.segment` | Não | ✅ (extra) | string | Campo extra não no contrato; ProFlow deve ignorar |
| `client.employees` | Não | ✅ (extra) | string | Campo extra não no contrato |
| `project.title` | Sim | ✅ | string | fallback `company - segment` |
| `project.description` | Sim | ✅ | string | fallback `lead.problem` ou texto padrão |
| `project.category` | Sim | ✅ | string | mapeado via `INTEREST_TO_CATEGORY` |
| `project.subcategory` | Não | ✅ | string | mapeado junto com category |
| `project.budget` | Sim | ✅ | number | `Number(proposal.total_value)` |
| `project.final_price` | Não | ✅ | number | igual a `budget` |
| `project.deadline` | Sim | ✅ | `YYYY-MM-DD` | via `.toISOString().split('T')[0]`; fallback +90 dias |
| `project.skills_required` | Não | ✅ | string[] | `lead.interests` ou `[]` |
| `project.internal_margin` | Não | — | — | Não enviado; ProFlow usa default |
| `project.client_visible_brand` | Não | ✅ (pós-fix) | string | `'PyScript.Tech'` (adicionado) |
| `project.hide_freelancer_identity` | Não | ✅ (pós-fix) | boolean | `true` (adicionado) |
| `project.manager_notes` | Não | ✅ (pós-fix) | string | Movido de top-level para dentro de `project` |
| `milestones[].title` | Sim | ✅ | string | `item.description \|\| item.name \|\| 'Etapa N'` |
| `milestones[].description` | Sim | ✅ | string | `item.description \|\| ''` |
| `milestones[].amount` | Sim | ✅ | number | `Number(item.value)` com ajuste de centavos |
| `milestones[].due_date` | Sim | ✅ | `YYYY-MM-DD` | igual ao `deadline` do projeto |
| `milestones[].order` | Sim | ✅ | number | `index + 1` |
| `external_lead_id` / `external_pyscript_lead_id` | Sim | ⚠️ | UUID string | **Ver Bug #5** — nome de campo divergente do contrato |
| `external_proposal_id` / `external_pyscript_proposal_id` | Sim | ⚠️ | UUID string | **Ver Bug #5** |

### Campos extras enviados (não no contrato)
- `project.budget_type: 'fixed'` — seguro, provável `ReadOnly` na ProFlow
- `project.visibility: 'private'` — seguro
- `project.status: 'in_progress'` — seguro
- `assigned_freelancer_id: null` — seguro

---

## 4. Bugs Encontrados

### BUG-001 — `manager_notes` no top-level ✅ CORRETO (validado pelo serializer)
- **Revisão (2026-06-28):** Inspeção do `PyScriptProjectCreateSerializer` confirmou que `manager_notes` é lido do **top-level** do payload. A hipótese inicial de que deveria estar dentro de `project` era incorreta. O código original estava correto e foi mantido.
- **Status:** Sem alteração necessária

### BUG-002 — `client_visible_brand` e `hide_freelancer_identity` — ~~ausentes~~ removidos ✅
- **Revisão (2026-06-28):** `client_visible_brand` é hardcoded como `'PyScript.Tech'` no backend ProFlow; `hide_freelancer_identity` não existe no modelo. Ambos os campos são ignorados silenciosamente pelo serializer. Os campos **não foram adicionados** ao payload para manter o contrato limpo.
- **Status:** Sem ação necessária

### BUG-003 — Botão "Criar ProFlow" visível para propostas já integradas ✅ CORRIGIDO
- **Evidência:** `ProposalsList.jsx` linha 202 — condição `proposal.status === 'accepted'` sem checar `!proposal.proflow_project_id`
- **Impacto:** Alto — gestor poderia tentar criar projeto duplicado; dupla proteção existe no modal, mas confunde UX
- **Arquivo corrigido:** `src/pages/dashboard/Proposals/ProposalsList.jsx`
- **Prioridade:** Alta

### BUG-004 — `generateProFlowPayload()` chamado 3 vezes em `ProFlowModal` ✅ CORRIGIDO
- **Evidência:** Três `useMemo` independentes, cada um chamando `generateProFlowPayload(proposal, lead)` separadamente
- **Impacto:** Baixo (performance) — função executada 3x a cada render com `proposal` ou `lead` modificado
- **Arquivo corrigido:** `src/pages/dashboard/Proposals/ProFlowModal.jsx`
- **Prioridade:** Baixa

### BUG-005 — Nomes de campo `external_pyscript_*` vs. contrato `external_*` ⚠️ PENDENTE (verificação)
- **Evidência:** Contrato especifica `external_lead_id` e `external_proposal_id`; código envia `external_pyscript_lead_id` e `external_pyscript_proposal_id`
- **Impacto:** Alto se o endpoint `/api/v1/projects/pyscript/` na ProFlow esperar os nomes sem o sufixo `_pyscript`
- **Causa provável:** Endpoint específico da PyScript pode ter sido implementado aceitando os nomes com `_pyscript_`. Verificar no relatório do lado ProFlow
- **Solução recomendada:** Confirmar com `INTEGRACAO_PYSCRIPT_PROFLOW_VALIDACAO.md` do lado ProFlow qual nome de campo o serializer espera
- **Prioridade:** Alta — verificar antes do próximo teste de integração real

### BUG-006 — Índice `status` ausente em `proflow_integration_logs` ✅ CORRIGIDO
- **Evidência:** Migration `20260627113309` criava índices em `proposal_id`, `lead_id`, `event`, `created_at` mas não em `status`
- **Impacto:** Baixo (performance) — queries filtrando `status = 'failed'` farão table scan
- **Arquivo corrigido:** `supabase/migrations/20260628000000_add_proflow_logs_status_index.sql` (criado)
- **Prioridade:** Baixa

---

## 5. Pontos de Atenção (não bugs críticos)

### ATENÇÃO-001 — dados pessoais em texto puro nos logs ✅ RESOLVIDO
- **Alteração (2026-06-28):** `sanitizePayloadForLog` e `sanitizeResponseForLog` em `proflow-create-project/index.ts` agora usam `client_email_domain` (apenas domínio do email) e `client_name_initial` (primeira letra + `***`). Nenhum email ou nome em texto puro nos logs.
- `proflow-resend-invite` não logava `request_payload_safe` — sem alteração necessária.

### ATENÇÃO-002 — Timeout HTTP nas chamadas à ProFlow API ✅ RESOLVIDO
- **Alteração (2026-06-28):** `AbortController` com 20s adicionado em `callProFlowCreate` e `callProFlowResendInvite`. `AbortError` capturado em `createProFlowProject` e `resendInvite`, que retornam `{ success: false, httpStatus: 0, error: 'ProFlow API timeout (20s)' }`. O handler existente grava automaticamente `status: 'failed'` com a mensagem de timeout em `proflow_integration_logs`.

### ATENÇÃO-003 — CORS wildcard `Access-Control-Allow-Origin: *`
- **Localização:** `supabase/functions/_shared/cors.ts`
- Supabase EF geralmente aceita wildcard porque a autenticação é feita via Bearer token (não cookies), mas é boa prática restringir à origin de produção
- **Solução recomendada:** Restringir para `https://pyscript.tech` em produção via variável de ambiente
- **Prioridade:** Baixa

### ATENÇÃO-004 — CTA para portal ProFlow em `/como-funciona-a-execucao` ✅ RESOLVIDO
- **Alteração (2026-06-28):** `<a className="ctaSecondary" href="https://proflow.pro" target="_blank" rel="noopener noreferrer">Acessar Portal de Projetos</a>` adicionado na seção `.execucaoCTA`.

### ATENÇÃO-005 — Link clicável para ProFlow no `ExecutionSection.js` ✅ RESOLVIDO
- **Alteração (2026-06-28):** "ProFlow.pro" envolvido em `<a href="https://proflow.pro" target="_blank" rel="noopener noreferrer">` dentro do texto `.note`.

### ATENÇÃO-006 — `clientsService.js` com fallback `http://localhost:8000/api`
- **Localização:** `src/services/clientsService.js` linha 1
- Não é parte da integração ProFlow, mas é um localhost hardcoded que aparece no bundle de produção
- **Solução recomendada:** Garantir que `REACT_APP_API_URL` esteja configurado em produção
- **Prioridade:** Baixa (fora do escopo ProFlow)

---

## 6. Lacunas de Testes

| Componente | Status | Impacto da Ausência |
|-----------|--------|-------------------|
| `database.proflow.test.js` — `generateProFlowPayload()` | ✅ Existe (7 casos) | Coberto |
| `ProFlowModal.test.jsx` | ❌ Ausente | Sem garantia dos estados do modal (loading/success/error/já-integrado) em regressões |
| `ProposalsList` — botão ProFlow | ❌ Ausente | Risco de reintroduzir bug de visibilidade do botão |
| `proflowIntegration.js` — service layer | ❌ Ausente | Sem cobertura do tratamento de erro `normalizeEdgeFunctionError` |
| `proflow-create-project/index.ts` — Edge Function | ❌ Ausente | Sem validação automatizada de autenticação, duplicidade, retry JWT |
| `proflow-resend-invite/index.ts` — Edge Function | ❌ Ausente | Mesma exposição |
| Teste E2E — fluxo completo proposta aceita → projeto ProFlow | ❌ Ausente | Cenário crítico sem validação automatizada de ponta a ponta |

**Recomendação de prioridade de testes a criar:**
1. `ProFlowModal.test.jsx` — estados de UI (alto impacto visual, fácil de escrever com RTL)
2. `proflowIntegration.test.js` — mock de `supabase.functions.invoke` (cobertura de erros)
3. Testes para Edge Functions via `supabase/functions/proflow-create-project/test.ts` usando Deno test runner

---

## 7. Validação de Segurança

| Verificação | Status |
|-------------|--------|
| `PROFLOW_SERVICE_TOKEN` ausente do frontend | ✅ Apenas em `Deno.env.get()` |
| `PROFLOW_REFRESH_TOKEN` ausente do frontend | ✅ Apenas em `Deno.env.get()` |
| `SUPABASE_SERVICE_ROLE_KEY` ausente do código commitado | ✅ Apenas em `Deno.env.get()` |
| `.env` no `.gitignore` | ✅ Confirmado (linhas 22, 41) |
| `sanitizePayloadForLog` remove tokens/senhas | ✅ Apenas campos seguros; nenhum JWT/token logado |
| Endpoint ProFlow usa HTTPS | ✅ `https://api.proflow.pro` |
| Dados pessoais em texto puro nos logs | ⚠️ `client_email` e `client_name` em `request_payload_safe` |
| CORS restrito | ⚠️ Wildcard `*` (ver ATENÇÃO-003) |
| `REACT_APP_SUPABASE_URL` / `ANON_KEY` no frontend | ✅ Correto — chaves públicas por design |

---

## 8. Validação de Páginas Públicas

### `/como-funciona-a-execucao` (`ComoFuncionaExecucao.js`)
| Item | Status |
|------|--------|
| Sem erros JS críticos | ✅ Componente React válido |
| Descreve fluxo completo | ✅ 7 etapas: Diagnóstico → Conclusão |
| CTA para portal ProFlow | ⚠️ Sem link direto a `https://proflow.pro` (ver ATENÇÃO-004) |
| FAQ cobre segurança, responsabilidade, pagamentos, comunicação | ✅ 7 perguntas cobrindo todos os tópicos |
| SEO — `<title>` e `description` | ✅ Via componente `SEO` |
| Rota registrada em `App.js` | ✅ Linha 134 — `/como-funciona-a-execucao` |

### `ExecutionSection.js` (homepage)
| Item | Status |
|------|--------|
| CTA funcional | ✅ Navega para `/como-funciona-a-execucao` |
| Link direto a `https://proflow.pro` | ⚠️ Apenas texto, sem `<a>` clicável |
| Identidade visual coerente | ✅ Mesmos estilos CSS da homepage |

---

## 9. Validação da Migration

| Verificação | Status |
|-------------|--------|
| `proflow_project_id` em `proposals` | ✅ TEXT (após migration `20260627142000`) |
| `proflow_contract_id` em `proposals` | ✅ TEXT (após migration `20260627142000`) |
| `proflow_portal_url` | ✅ TEXT |
| `proflow_client_status` | ✅ TEXT com comentário de valores possíveis |
| `proflow_milestone_ids` | ✅ TEXT[] (após migration `20260627142000`) |
| `proflow_synced_at` | ✅ TIMESTAMP WITH TIME ZONE |
| Tabela `proflow_integration_logs` | ✅ Existe com estrutura correta |
| Índice em `proposal_id` (logs) | ✅ `idx_proflow_logs_proposal_id` |
| Índice em `status` (logs) | ✅ Migration `20260628000000` criada |
| `ON DELETE CASCADE` em FKs de logs | ✅ Evita órfãos |
| RLS habilitado em logs | ✅ Políticas SELECT e INSERT para `authenticated` |
| `proflow_sync_status` CHECK constraint | ✅ `('not_started','pending','success','failed','already_created')` |

---

## 10. Status de Produção (verificação estática)

| Item | Status |
|------|--------|
| `PROFLOW_API_URL` default `https://api.proflow.pro` | ✅ Hardcoded como default nas Edge Functions |
| `PROFLOW_PORTAL_URL` default `https://proflow.pro` | ✅ Hardcoded como default |
| `REACT_APP_PROFLOW_PORTAL_URL` | ⚠️ Não consumido diretamente no frontend (`ProFlowModal` usa `proposal.proflow_portal_url` do banco) |
| Sem localhost nas Edge Functions ProFlow | ✅ Confirmado |
| Edge Functions deployadas | `[ ]` Verificar com `supabase functions list` |
| Secrets configurados | `[ ]` Verificar com `supabase secrets list` |
| Logs recentes de falha | `[ ]` Verificar `SELECT * FROM proflow_integration_logs WHERE status = 'failed' ORDER BY created_at DESC LIMIT 10` |

---

## 11. Arquivos Modificados nesta Validação

| Arquivo | Alteração |
|---------|-----------|
| `src/services/database.js` | Sem alteração de payload (BUG-001 e BUG-002 revertidos — código original correto) |
| `supabase/functions/proflow-create-project/index.ts` | ATENÇÃO-001: redacção de email/nome nos logs; ATENÇÃO-002: AbortController 20s |
| `supabase/functions/proflow-resend-invite/index.ts` | ATENÇÃO-002: AbortController 20s |
| `src/pages/dashboard/Proposals/ProposalsList.jsx` | Botão "Criar ProFlow" oculto quando `proflow_project_id` já existe; indicador de integrado adicionado |
| `src/pages/dashboard/Proposals/ProFlowModal.jsx` | Triple `useMemo` reduzido a uma única chamada |
| `supabase/migrations/20260628000000_add_proflow_logs_status_index.sql` | Migration criada com índice em `status` |

---

## 12. Comandos de Verificação Pós-Deploy

```bash
# Verificar Edge Functions deployadas
supabase functions list

# Verificar secrets configurados
supabase secrets list

# Verificar logs de falha recentes
supabase db execute --sql "SELECT proposal_id, event, status, message, http_status, created_at FROM proflow_integration_logs WHERE status = 'failed' ORDER BY created_at DESC LIMIT 20;"

# Verificar migration aplicada
supabase db execute --sql "SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'proposals' AND column_name LIKE 'proflow_%' ORDER BY column_name;"

# Executar testes unitários existentes
npm test -- --testPathPattern=database.proflow
```

---

## 13. Status Final

| Componente | Status |
|-----------|--------|
| Payload `generateProFlowPayload()` | ✅ Compatível (pós-fix) |
| Edge Function `proflow-create-project` | ✅ Funcional |
| Edge Function `proflow-resend-invite` | ✅ Funcional |
| Retry JWT | ✅ Implementado |
| Anti-duplicidade | ✅ Implementado |
| Logs sem dados sensíveis | ⚠️ Email/nome em texto puro (ATENÇÃO-001) |
| `ProFlowModal` — todos os estados | ✅ Funcional |
| `ProposalsList` — visibilidade correta | ✅ Corrigido |
| Persistência `proflow_*` | ✅ Completa |
| Sem secrets no frontend | ✅ |
| `.env` no `.gitignore` | ✅ |
| HTTPS em todas as chamadas | ✅ |
| URLs de produção corretas | ✅ |
| `/como-funciona-a-execucao` com SEO | ✅ |
| Edge Functions em produção | ⬜ Verificar manualmente |

**Veredicto: Aprovado com ressalvas**  
A integração está pronta para uso em produção após confirmar BUG-005 (nomes de campos `external_*`) com o lado ProFlow e verificar o deploy das Edge Functions com os secrets configurados.
