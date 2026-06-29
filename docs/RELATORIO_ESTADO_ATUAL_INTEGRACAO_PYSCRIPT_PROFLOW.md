# Relatório de Estado Atual - Integração PyScript.Tech ↔ ProFlow.pro

## Data

Junho de 2026

## Resumo executivo

A integração está **implementada em ambos os lados** e a infraestrutura Supabase está **deployada**. Porém, o teste end-to-end real está **bloqueado** pela ausência de uma URL base e JWT válidos da ProFlow, e por riscos de segurança com secrets que precisam ser tratados antes da produção.

---

## Parte 1 — PyScriptTech

### 1. Estado do Git

- Branch atual: `main`
- Status: muitos arquivos não rastreados (`??`) e modificações (`M`) — indicam trabalho em andamento não commitado.
- `.env`: **untracked** (`??`) — não está versionado no Git.
- `.gitignore`: **deletado** (`D`) — risco crítico de commit acidental de `.env`.
- `.env.example`: modificado.

### 2. Supabase CLI

- Versão: `2.108.0` ✅
- `supabase status`: falha porque não há containers locais em execução (esperado, projeto usa Supabase remoto).
- `supabase/config.toml`: existe ✅
- `supabase/functions/proflow-create-project/index.ts`: existe ✅
- `supabase/functions/proflow-resend-invite/index.ts`: existe ✅
- `supabase/functions/_shared/cors.ts`: existe ✅
- `supabase/functions/import_map.json`: existe ✅
- `supabase/migrations/`: existe com duas migrations ✅

### 3. Migrations

Migrations existentes:

- `20260627110000_base_schema.sql` — cria tabelas `leads`, `lead_activities`, `proposals`, `prospect_companies`.
- `20260627113309_proflow_integration.sql` — adiciona campos ProFlow e cria `proflow_integration_logs`.

Campos ProFlow em `proposals`:

- `proflow_project_id` ✅
- `proflow_contract_id` ✅
- `proflow_milestone_ids` ✅
- `proflow_portal_url` ✅
- `proflow_client_email` ✅
- `proflow_client_status` ✅
- `proflow_invitation_sent` ✅
- `proflow_sync_status` ✅
- `proflow_sync_error` ✅
- `proflow_synced_at` ✅
- `proflow_last_attempt_at` ✅

Tabela `proflow_integration_logs`: ✅

Migration foi aplicada com sucesso no Supabase remoto (confirmado no dashboard: `LAST MIGRATION: proflow_integration`).

### 4. Edge Functions

#### `proflow-create-project`

- `deno check`: ✅
- Valida autenticação: ✅
- Valida permissão por email ou role: ✅
- Bloqueia proposta não `accepted`: ✅
- Bloqueia duplicidade: ✅
- Sanitiza payloads em logs: ✅
- Não expõe tokens no código: ✅
- Usa secrets via `Deno.env.get`: ✅
- Chama API ProFlow com retry de token: ✅
- Salva retorno no Supabase: ✅
- Grava logs seguros: ✅

#### `proflow-resend-invite`

- `deno check`: ✅
- Valida autenticação: ✅
- Valida permissão: ✅
- Reenvia convite: ✅
- Não expõe tokens: ✅

### 5. Frontend PyScript

Arquivos auditados:

- `src/services/proflowIntegration.js` ✅
- `src/pages/dashboard/Proposals/ProFlowModal.jsx` ✅
- `src/services/database.js` ✅

Verificações:

- Frontend chama Edge Function via Supabase Functions: ✅
- Frontend **não** chama API ProFlow diretamente com JWT: ✅
- Modal possui estados: não integrada, loading, sucesso, erro, já integrada: ✅
- Fallback manual (JSON/Markdown/checklist) mantido: ✅
- Botão de reenvio de convite existe: ✅
- Bug `proposal.title` vs `proposalTitle`: corrigido ✅

### 6. Variáveis de ambiente (presença/ausência, sem valores)

| Variável | Status |
|----------|--------|
| `REACT_APP_SUPABASE_URL` | presente |
| `REACT_APP_SUPABASE_ANON_KEY` | presente |
| `REACT_APP_PROFLOW_PORTAL_URL` | ausente |
| `SUPABASE_ACCESS_TOKEN` | presente |
| `SUPABASE_PROJECT_REF` | presente |
| `SUPABASE_SERVICE_ROLE_KEY` | placeholder |
| `PROFLOW_API_URL` | presente |
| `PROFLOW_PYSCRIPT_ENDPOINT` | presente |
| `PROFLOW_SERVICE_TOKEN` | placeholder |
| `PROFLOW_REFRESH_TOKEN` | placeholder |
| `PROFLOW_PORTAL_URL` | presente |
| `PYSCRIPT_ALLOWED_ADMIN_EMAILS` | presente |

### 7. Testes e build

- `npm test -- --watchAll=false`: ✅ 9 passaram
- `npm run build`: ✅ com warnings de `caniuse-lite` desatualizado

---

## Parte 2 — ProFlow

### 1. Estado do Git

- Branch atual: `main`
- Status: muitos arquivos não rastreados (`??`), principalmente os módulos PyScript (`views_pyscript.py`, `serializers_b2b.py`, `models_invitation.py`, etc.).
- `.env`: não encontrado no repositório ✅
- `.gitignore`: presente, mas não auditado em detalhe.

### 2. Endpoint B2B PyScript

Endpoint registrado: `POST /api/v1/projects/pyscript/` ✅

Arquivos:

- `backend/apps/projects/views_pyscript.py` ✅
- `backend/apps/projects/urls.py` ✅
- `backend/apps/projects/serializers_b2b.py` ✅

Comportamento confirmado:

- Exige JWT e permissão `IsAdminOrProjectManager`: ✅
- Cria projeto privado (`visibility='private'`): ✅
- Define `source='pyscript'`: ✅
- Define `is_b2b=True`: ✅
- Salva `external_pyscript_lead_id`: ✅
- Salva `external_pyscript_proposal_id`: ✅
- Cria ou vincula cliente: ✅
- Cria `ClientProfile`: ✅
- Cria contrato: ✅
- Cria milestones: ✅
- Retorna `project_id`, `contract_id`, `milestone_ids`, `portal_url`, `client_status`, `invitation_sent`: ✅
- Não publica como marketplace aberto: ✅

### 3. Papel `project_manager`

- `User.UserType.PROJECT_MANAGER` existe ✅
- `is_project_manager` existe ✅
- `is_pyscript_manager` existe ✅
- `IsAdminOrProjectManager` existe ✅
- Não foi possível verificar se existe usuário gestor criado no banco sem acesso ao banco de dados.

### 4. Onboarding do cliente PyScript

Endpoints existentes:

- `POST /api/v1/users/pyscript/activate/` ✅
- `GET /api/v1/users/pyscript/validate-token/` ✅
- `POST /api/v1/users/pyscript/resend-invite/` ✅

Arquivos:

- `backend/apps/users/models_invitation.py` ✅
- `backend/apps/users/services/invitation_service.py` ✅
- `backend/apps/users/views_pyscript.py` ✅
- `frontend/src/views/auth/ActivateAccount.vue` ✅

Segurança do convite:

- Token puro não é salvo: ✅ (salvo apenas hash SHA-256)
- Token expira: ✅ (24h padrão)
- Uso único: ✅
- Convite enviado apenas para cliente inativo: ✅
- Cliente ativo não recebe convite desnecessário: ✅
- Página `/ativar-acesso` existe: ✅
- Senha temporária não é retornada: ✅
- Email de convite contém link com token, mas token não é salvo: ✅

### 5. Proteções B2B

Verificação em `backend/apps/projects/views.py`:

- Múltiplas checagens de `is_b2b` em listagens, propostas e publicação: ✅
- Projetos B2B são excluídos de listagens públicas de freelancers: ✅
- Projetos B2B não aceitam propostas abertas de marketplace: ✅
- Signals suprimidos para B2B: verificação superficial indica que existem checagens.

### 6. Testes ProFlow

- `apps/projects/tests/test_pyscript.py`: ✅ 18 passaram
- `apps/users/tests/test_pyscript_onboarding.py`: ✅ 17 passaram

---

## Parte 3 — Compatibilidade de Payload

Comparação entre payload gerado por `src/services/database.js` e serializer `PyScriptProjectCreateSerializer`:

| Campo PyScript | Campo ProFlow | Status |
|----------------|---------------|--------|
| `external_pyscript_lead_id` | `external_pyscript_lead_id` | ✅ compatível |
| `external_pyscript_proposal_id` | `external_pyscript_proposal_id` | ✅ compatível |
| `client.name` | `client.name` | ✅ compatível |
| `client.email` | `client.email` | ✅ compatível |
| `client.phone` | `client.phone` | ✅ compatível |
| `client.company` | `client.company` | ✅ compatível |
| `client.segment` | `client.segment` | ⚠️ compatível, mas ProFlow mapeia valores específicos (fallback para `other`) |
| `client.employees` | `client.employees` | ⚠️ compatível, mas ProFlow mapeia valores específicos (fallback para vazio) |
| `project.title` | `project.title` | ✅ compatível |
| `project.description` | `project.description` | ✅ compatível |
| `project.category` | `project.category` | ✅ compatível |
| `project.subcategory` | `project.subcategory` | ✅ compatível |
| `project.budget` | `project.budget` | ✅ compatível |
| `project.budget_type` | `project.budget_type` | ✅ compatível (default `fixed`) |
| `project.final_price` | `project.final_price` | ✅ compatível |
| `project.deadline` | `project.deadline` | ✅ compatível (formato `YYYY-MM-DD`) |
| `project.visibility` | `project.visibility` | ✅ compatível (`private`) |
| `project.status` | `project.status` | ✅ compatível (`in_progress`) |
| `project.skills_required` | `project.skills_required` | ✅ compatível |
| `milestones[].title` | `milestones[].title` | ✅ compatível |
| `milestones[].description` | `milestones[].description` | ✅ compatível |
| `milestones[].amount` | `milestones[].amount` | ✅ compatível |
| `milestones[].due_date` | `milestones[].due_date` | ✅ compatível |
| `milestones[].order` | `milestones[].order` | ✅ compatível |
| `assigned_freelancer_id` | `assigned_freelancer_id` | ✅ compatível (null) |
| `manager_notes` | `manager_notes` | ✅ compatível |

### Observações de compatibilidade

1. **Segmento e funcionários:** A ProFlow faz mapeamento interno (`tecnologia` → `technology`, `1-10` → `small`, etc.). Valores diferentes caem em fallback. Recomenda-se alinhar os valores padrão do CRM PyScript com os mapeamentos da ProFlow.
2. **Categoria/subcategoria:** PyScript mapeia `lead.interests` para categoria via `INTEREST_TO_CATEGORY`. Como a ProFlow aceita `CharField` livre, não há bloqueio, mas é bom garantir que os valores correspondam a categorias válidas do modelo `Project` da ProFlow.
3. **Soma dos milestones:** PyScript ajusta o último milestone para igualar o valor total. ProFlow apenas loga warning se divergir. Não é bloqueante.

---

## Parte 4 — Credenciais (sem valores)

### PyScript / ambiente

| Credencial | Status | Observação |
|------------|--------|------------|
| `SUPABASE_ACCESS_TOKEN` | presente | válida para CLI |
| `SUPABASE_PROJECT_REF` | presente | `pgnhrkulekwoezerjlty` |
| `SUPABASE_SERVICE_ROLE_KEY` | placeholder | runtime Supabase injeta automaticamente nas Edge Functions |
| `PROFLOW_SERVICE_TOKEN` | placeholder | **incorreto anteriormente; aguarda JWT de gestor** |

### ProFlow

- Não foi possível verificar se usuário `project_manager` existe sem acesso ao banco.
- JWT da ProFlow não foi gerado.
- Endpoint `/api/v1/projects/pyscript/` ainda não foi validado com token real porque a URL base da API não responde.

---

## Parte 5 — Teste Controlado de API

### Tentativas realizadas

Foram feitas chamadas de diagnóstico para a URL base configurada (`https://api.proflow.pro`):

- `GET https://api.proflow.pro/` → `404 Not Found`
- `GET https://api.proflow.pro/health/` → `404 Not Found`
- `POST https://api.proflow.pro/api/v1/projects/pyscript/` → `404 Not Found`
- `POST https://proflow.pro/api/v1/projects/pyscript/` → `307 redirect` para `www.proflow.pro`, depois `405 Method Not Allowed` (HTML do frontend)

### Conclusão do teste

A API da ProFlow **não está acessível** no domínio `https://api.proflow.pro`. Possíveis causas:

1. Aplicação ainda não deployada nesse domínio.
2. DNS/apontamento incorreto.
3. URL base de produção é diferente.

**Nenhum projeto real foi criado.** Nenhum dado de teste foi inserido na ProFlow.

---

## Problemas encontrados

1. `.gitignore` da PyScriptTech foi removido — risco de commit de `.env`.
2. `SUPABASE_SERVICE_ROLE_KEY` exposta em conversa — recomenda-se rotação.
3. `PROFLOW_SERVICE_TOKEN` estava incorreto (copiado do Supabase) — precisa ser JWT da ProFlow.
4. URL base da ProFlow (`https://api.proflow.pro`) não responde — impede E2E.
5. Tokens do MercadoPago hardcoded em `ProFlow/backend/config/settings/dev.py` — risco de segurança.

---

## Riscos de segurança

Detalhados em `ALERTA_SEGURANCA_SECRETS.md`. Principais:

- Risco **alto**: `.env` sem `.gitignore` e service role key exposta.
- Risco **médio**: tokens hardcoded no ProFlow.
- Risco **médio**: `PROFLOW_SERVICE_TOKEN` não configurado corretamente.

---

## Pendências bloqueantes

1. Confirmar URL base real de produção da ProFlow.
2. Gerar JWT de gestor da ProFlow (`POST /api/v1/token/`).
3. Atualizar secrets no Supabase com JWT correto.
4. Restaurar `.gitignore` na PyScriptTech.
5. Executar teste E2E real.

---

## Próximas ações recomendadas

1. **Restaurar `.gitignore`** na PyScriptTech imediatamente.
2. **Rotacionar `SUPABASE_SERVICE_ROLE_KEY`** no Supabase (recomendado, mas adiado por orientação do usuário).
3. **Obter URL base da ProFlow** (deploy real) e JWT de gestor.
4. **Atualizar `.env`** e secrets do Supabase.
5. **Executar teste E2E** com dados de teste (`[TESTE]` no título, email de teste).
6. **Remover hardcoded defaults** de MercadoPago no ProFlow.

---

## Conclusão

A integração PyScript ↔ ProFlow está **tecnicamente pronta em ambos os lados**: payload compatível, endpoints implementados, permissões configuradas, Edge Functions deployadas, migration aplicada e testes passando. Porém, ainda não é possível declarar a integração como operacional porque a API da ProFlow não está acessível e o JWT de autenticação não foi configurado. Resolver esses dois pontos desbloqueia o teste E2E real.
