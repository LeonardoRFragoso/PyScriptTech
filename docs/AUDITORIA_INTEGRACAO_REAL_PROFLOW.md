# Auditoria da Integração Real PyScript.Tech ↔ ProFlow.pro

## Data

Junho de 2026

## Escopo

Esta auditoria analisa o repositório PyScriptTech para identificar o que já existe, o que falta e qual é o melhor caminho seguro para integrar a criação real de projetos na ProFlow.pro via API.

## 1. Estrutura do projeto

- **Repositório**: `/home/leonardo/dev/PyScriptTech`
- **Framework**: React 18 (Create React App)
- **Backend**: Supabase (PostgreSQL + Auth + futuras Edge Functions)
- **Gerenciamento**: npm, scripts padrão `start`, `build`, `test`, `eject`

### Pacotes relevantes

- `@supabase/supabase-js` — já instalado para comunicação segura com Supabase
- `react-router-dom` — roteamento
- `framer-motion` — animações
- `react-icons` — ícones

## 2. Banco de dados Supabase

### Tabelas existentes

1. `leads` — cadastro de leads
2. `lead_activities` — atividades e histórico
3. `proposals` — propostas comerciais
4. `prospect_companies` — empresas prospectadas

### Estrutura da tabela `proposals`

```sql
CREATE TABLE IF NOT EXISTS proposals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lead_id UUID NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  scope TEXT,
  items JSONB DEFAULT '[]',
  total_value NUMERIC DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'sent', 'accepted', 'rejected', 'expired')),
  valid_until DATE,
  sent_at TIMESTAMP WITH TIME ZONE,
  accepted_at TIMESTAMP WITH TIME ZONE,
  rejected_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id)
);
```

**A tabela ainda não possui campos de integração ProFlow.**

### Row Level Security (RLS)

- RLS está ativado em todas as tabelas CRM.
- Políticas atuais permitem acesso irrestrito a usuários autenticados (`authenticated` role).
- Modelo é adequado para time pequeno, mas deve ser ajustado para controle granular de gestor/admin.

## 3. Módulo de propostas

### Localização

- `src/pages/dashboard/Proposals/ProposalsList.jsx`
- `src/pages/dashboard/Proposals/ProFlowModal.jsx`
- `src/pages/dashboard/Proposals/ProposalsList.module.css`
- `src/pages/dashboard/Proposals/ProFlowModal.module.css`

### Funcionamento atual

- Botão "Criar projeto na ProFlow" aparece apenas para propostas com status `accepted`.
- O modal atual gera:
  - Payload JSON
  - Resumo Markdown
  - Checklist manual
- O gestor copia manualmente e cria o projeto na ProFlow.
- **Bug identificado**: `ProFlowModal.jsx` linha 33 faz referência a `proposal.title` mas o prop correto é `proposalTitle`. Isso precisa ser corrigido.

### Serviço de dados

- `src/services/database.js` contém `generateProFlowPayload()` que monta o payload com mapeamento de categoria e milestones.
- A função usa Supabase quando configurado ou fallback em localStorage.

## 4. Configuração Supabase

### Arquivo de configuração

- `src/services/supabaseClient.js` cria o cliente com as variáveis de ambiente:
  - `REACT_APP_SUPABASE_URL`
  - `REACT_APP_SUPABASE_ANON_KEY`

### Variáveis de ambiente atuais

- `.env.example` contém placeholders para Supabase URL e anon key.
- Não há variáveis da ProFlow.
- Não há pasta `supabase/functions/`.
- Não há Supabase CLI configurado no projeto.

## 5. Uso de localStorage

- O CRM mantém fallback em localStorage para leads e propostas quando Supabase não está configurado.
- A integração real com ProFlow só funcionará com Supabase configurado.
- O fallback pode continuar existindo para desenvolvimento, mas não deve ser usado para projetos reais.

## 6. Caminho seguro escolhido

### Recomendação: Supabase Edge Function

Como a PyScript já usa Supabase e a arquitetura é serverless, a Edge Function é a camada ideal.

**Fluxo:**

1. Frontend React chama a Edge Function com `lead_id` e `proposal_id`.
2. Edge Function valida autenticação e permissão do usuário.
3. Edge Function busca dados no Supabase.
4. Edge Function monta payload e chama `POST /api/v1/projects/pyscript/` na ProFlow.
5. Edge Function salva retorno no Supabase.
6. Edge Function retorna dados seguros para o frontend.

### Vantagens

- JWT da ProFlow fica apenas na Edge Function.
- Frontend nunca vê token de gestor.
- Permite validação de negócio e logs no servidor.
- Integração nativa com Supabase Auth.

## 7. O que precisa ser criado

### Banco de dados

- Campos ProFlow na tabela `proposals`:
  - `proflow_project_id`, `proflow_contract_id`, `proflow_milestone_ids`, `proflow_portal_url`, `proflow_client_email`, `proflow_client_status`, `proflow_invitation_sent`, `proflow_sync_status`, `proflow_sync_error`, `proflow_synced_at`, `proflow_last_attempt_at`.
- Tabela `proflow_integration_logs` para auditoria segura.
- Função/RLS para permitir apenas gestores/admin chamarem a Edge Function.

### Supabase Edge Functions

- `supabase/functions/proflow-create-project/index.ts`
- `supabase/functions/proflow-resend-invite/index.ts`

### Variáveis de ambiente seguras

- `PROFLOW_API_URL`
- `PROFLOW_PYSCRIPT_ENDPOINT`
- `PROFLOW_SERVICE_TOKEN`
- `PROFLOW_REFRESH_TOKEN`
- `PROFLOW_PORTAL_URL`
- `PYSCRIPT_ALLOWED_ADMIN_EMAILS`

### Frontend

- Atualizar `ProFlowModal.jsx` para:
  - Validar proposta aceita.
  - Exibir preview do payload.
  - Chamar Edge Function.
  - Exibir status de sucesso/erro.
  - Mostrar dados salvos (portal_url, project_id, client_status).
  - Reenviar convite.
  - Manter fallback manual (JSON/Markdown/checklist).

- Adicionar funções em `src/services/database.js` ou `src/services/proflowIntegration.js`:
  - `createProFlowProject(proposalId)`
  - `resendProFlowInvite(proposalId)`
  - `getProFlowIntegrationLogs(proposalId)`

### Documentação

- `INTEGRACAO_REAL_PROFLOW.md`
- `SUPABASE_EDGE_FUNCTION_PROFLOW.md`
- `CHECKLIST_DEPLOY_INTEGRACAO_PROFLOW.md`
- `RELATORIO_INTEGRACAO_REAL_PROFLOW.md`

## 8. Considerações de segurança

- Nunca expor `PROFLOW_SERVICE_TOKEN` no frontend.
- Nunca salvar Authorization header ou token em logs.
- Não permitir chamadas públicas na Edge Function.
- Validar que o usuário está autenticado no Supabase.
- Validar que a proposta está `accepted`.
- Impedir duplicidade de criação.
- Implementar retry com refresh token se disponível.
- Se refresh token não for suficiente, retornar erro claro e manter fallback manual.

## 9. Limitações conhecidas

- O projeto não tem Supabase CLI configurado.
- A Edge Function precisa ser testada localmente com `supabase functions serve` ou equivalente.
- Não há estrutura de testes automatizados no frontend.
- O RLS atual permite qualquer usuário autenticado manipular qualquer registro. O controle de permissão deve ser reforçado na Edge Function e, idealmente, nas políticas RLS.

## 10. Próximos passos

1. Fase 2: adicionar campos ProFlow na tabela `proposals` e criar tabela de logs.
2. Fase 3: criar Supabase Edge Function `proflow-create-project`.
3. Fase 4: implementar controle de permissão na Edge Function.
4. Fase 5: configurar variáveis de ambiente seguras.
5. Fase 6: implementar renovação de token e retry.
6. Fase 7: mapear payload final.
7. Fase 8: atualizar frontend.
8. Fase 9: reenvio de convite.
9. Fase 10: logs de integração.
10. Fase 11: analytics.
11. Fase 12: validações de negócio.
12. Fase 13: documentação.
13. Fase 14: testes.
14. Fase 15: build e validação.
