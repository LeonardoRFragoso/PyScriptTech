# Auditoria do Fluxo Comercial — PyScriptTech

Data: 2026-06-27

## 1. Tabelas e estrutura relevantes

### `leads`

- `id`: UUID PK
- `name`, `email`, `phone`, `company`, `role`
- `segment`, `employees`, `problem`, `systems`, `interests`
- `stage`: TEXT DEFAULT `'novo'`
- `source`, `estimated_value`, `priority`, `notes`
- `owner_id`: UUID → `auth.users(id)`
- `next_action`, `next_action_date`
- `created_at`, `updated_at`

Etapas do funil usadas no frontend (`LeadForm.jsx`):

- `novo`
- `contato`
- `diagnostico`
- `proposta`
- `negociacao`
- `fechado`
- `perdido`

### `proposals`

- `id`: UUID PK
- `lead_id`: UUID FK → `leads(id)` ON DELETE CASCADE
- `title`, `scope`, `items` (JSONB), `total_value`
- `status`: TEXT CHECK (`draft`, `sent`, `accepted`, `rejected`, `expired`)
- `valid_until`, `sent_at`, `accepted_at`, `rejected_at`
- `created_by`: UUID → `auth.users(id)`
- `created_at`, `updated_at`

Campos ProFlow (adicionados em `20260627113309_proflow_integration.sql` e alterados em `20260627142000_alter_proflow_ids_to_text.sql`):

- `proflow_project_id` (TEXT)
- `proflow_contract_id` (TEXT)
- `proflow_milestone_ids` (TEXT[])
- `proflow_portal_url`
- `proflow_client_email`
- `proflow_client_status`
- `proflow_invitation_sent`
- `proflow_sync_status`
- `proflow_sync_error`
- `proflow_synced_at`
- `proflow_last_attempt_at`

### `lead_activities`

- `id`: UUID PK
- `lead_id`: UUID FK → `leads(id)` ON DELETE CASCADE
- `type`: TEXT CHECK (`'ligação'`, `'email'`, `'whatsapp'`, `'linkedin'`, `'reunião'`, `'proposta'`, `'anotação'`, `'mudança_de_status'`)
- `description`
- `next_action`, `next_action_date`
- `created_at`, `created_by` UUID → `auth.users(id)`

### `proflow_integration_logs`

- Logs da integração com ProFlow, sanitizados, sem tokens.

## 2. RLS atual

Todas as tabelas principais (`leads`, `lead_activities`, `proposals`, `prospect_companies`, `proflow_integration_logs`) possuem RLS aberto para `authenticated` (select/insert/update/delete). Isso foi necessário para o REST API do Supabase funcionar com o role `authenticated`. As migrations de GRANT (`20260627140000` e `20260627141000`) complementam essas permissões.

## 3. Fluxo de proposta hoje

1. Gestor cria proposta em `ProposalForm.jsx` (status default `draft`).
2. Gestor pode alterar status manualmente para `sent`, `accepted`, etc.
3. Botão "Copiar Texto" gera texto da proposta via `generateProposalText()`.
4. Em `ProposalsList.jsx`, se `proposal.status === 'accepted'`, aparece botão ProFlow que abre `ProFlowModal.jsx`.
5. `ProFlowModal` valida dados e chama Edge Function `proflow-create-project`.

## 4. O que falta (antes desta tarefa)

- Botão "Enviar proposta".
- Link público seguro da proposta.
- Página pública de visualização.
- Aceite digital.
- Atualização automática de `proposals.status` para `accepted`.
- Atualização automática de `leads.stage` para `fechado`.
- Registro automático de atividade em `lead_activities`.
- Bloqueio de duplicidade de aceite.
- Campos de auditoria do aceite (`accepted_by_name`, `accepted_ip`, etc.).

## 5. Arquivos de frontend envolvidos

- `src/pages/dashboard/Proposals/ProposalsList.jsx` — lista e ações.
- `src/pages/dashboard/Proposals/ProposalForm.jsx` — criação/edição.
- `src/pages/dashboard/Proposals/ProFlowModal.jsx` — integração ProFlow.
- `src/services/database.js` — funções de CRUD e payload.
- `src/services/proflowIntegration.js` — chamada às Edge Functions.
- `src/App.js` — rotas.

## 6. Edge Functions existentes

- `supabase/functions/proflow-create-project/index.ts` — cria projeto na ProFlow.
- `supabase/functions/proflow-resend-invite/index.ts` — reenvia convite.

## 7. Decisões de modelagem

- Usar token público com hash no banco para segurança.
- Não salvar token puro no banco.
- Não chamar ProFlow automaticamente no aceite; o gestor ainda clica no botão ProFlow.
- A página pública será rota `/proposta/:token` no React, chamando Edge Functions sem autenticação.
- A Edge Function `proposal-public-view` não retorna IDs internos sensíveis.
- A Edge Function `proposal-public-accept` valida e-mail do lead e evita duplicidade.

## 8. Riscos identificados

- RLS aberto para authenticated: qualquer usuário logado pode ler/alterar propostas. Aceito para MVP, mas deve ser endurecido no futuro.
- Token público exposto no link: mitigar com hash, expiração e revogação (`public_access_enabled`).
- Não há provider de e-mail configurado: o envio será manual (copiar link/texto ou abrir app).
