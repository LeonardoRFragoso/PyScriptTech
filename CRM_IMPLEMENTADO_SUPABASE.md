# CRM Implementado com Supabase - PyScript.tech

## Resumo

O CRM da PyScript.tech foi migrado de `localStorage` para persistência real usando Supabase. Os formulários de captação de leads agora salvam dados no banco, o dashboard possui autenticação real, e foram adicionados módulos de propostas, prospecção e métricas.

## Arquitetura

- **Frontend**: React SPA (Create React App)
- **Backend**: Supabase (PostgreSQL + Auth)
- **Camada de dados**: `src/services/database.js` abstrai todas as operações CRUD e faz fallback para `localStorage` quando o Supabase não está configurado (útil para desenvolvimento local).
- **Autenticação**: `src/contexts/AuthContext.jsx` usa Supabase Auth, com fallback mock para desenvolvimento sem Supabase configurado.

## Arquivos criados/alterados

### Serviços e Autenticação
- `src/services/supabaseClient.js` - cliente Supabase
- `src/services/database.js` - CRUD de leads, atividades, propostas, prospects e métricas
- `src/contexts/AuthContext.jsx` - autenticação com Supabase Auth

### Schema
- `database/supabase_schema.sql` - script SQL completo para criar tabelas, índices, RLS, triggers e dados iniciais de prospecção

### Dashboard
- `src/pages/dashboard/Leads/LeadsList.jsx` - lista de leads com filtros, prioridade e próximas ações
- `src/pages/dashboard/Leads/LeadForm.jsx` - formulário de lead com histórico de atividades
- `src/pages/dashboard/Proposals/ProposalsList.jsx` - lista de propostas
- `src/pages/dashboard/Proposals/ProposalForm.jsx` - criação/edição de propostas com exportação de texto
- `src/pages/dashboard/Prospects/ProspectsList.jsx` - lista de empresas prospectadas
- `src/pages/dashboard/Prospects/ProspectForm.jsx` - cadastro/edição de prospects com conversão em lead
- `src/pages/dashboard/Metrics/MetricsDashboard.jsx` - dashboard de métricas reais
- `src/components/dashboard/Sidebar/Sidebar.jsx` - menu atualizado com novos módulos
- `src/App.js` - rotas protegidas para novos módulos

### Formulários públicos integrados
- `src/pages/DiagnosticoGratuito/DiagnosticoGratuito.js`
- `src/pages/CalculadoraROI/CalculadoraROI.js`
- `src/pages/LeadMagnet/GuiaAutomacao.js`
- `src/pages/HomePage/ContactSection/ContactSection.js`

### Documentação
- `AUDITORIA_OPERACIONAL_CRM.md` - relatório de auditoria
- `ANALYTICS_VALIDATION_REPORT.md` - validação de analytics
- `CHECKLIST_POS_DEPLOY.md` - checklist pós-deploy
- `.env.example` - variáveis de ambiente atualizadas

## Modelo de dados

### Tabela `leads`
Campos principais: id, name, email, phone, company, role, segment, employees, problem, systems, interests[], stage, source, estimated_value, priority, notes, next_action, next_action_date, owner_id, created_at, updated_at.

### Tabela `lead_activities`
Histórico de atividades por lead: id, lead_id, type, description, next_action, next_action_date, created_at, created_by.

### Tabela `proposals`
Propostas comerciais: id, lead_id, title, scope, items[], total_value, status, valid_until, sent_at, accepted_at, rejected_at, created_at, updated_at, created_by.

### Tabela `prospect_companies`
Empresas prospectadas: id, company_name, segment, city, potential, suggested_approach, decision_maker_name, decision_maker_role, linkedin_url, website, email, phone, status, last_contact_at, next_contact_at, next_action, notes, created_at, updated_at, created_by.

## Como executar

1. Configurar variáveis de ambiente no `.env` com base no `.env.example`.
2. Executar o script `database/supabase_schema.sql` no SQL Editor do Supabase.
3. Criar um usuário em Auth > Users.
4. Rodar `npm start` para desenvolvimento ou `npm run build` para produção.

## Fallback localStorage

Se `REACT_APP_SUPABASE_URL` e `REACT_APP_SUPABASE_ANON_KEY` não estiverem configurados, o sistema usa `localStorage` automaticamente para todos os módulos, permitindo desenvolvimento e demonstrações sem backend.

## Segurança

- Row Level Security (RLS) habilitado em todas as tabelas do Supabase.
- Políticas permitem acesso a usuários autenticados (modelo de pequeno time).
- Nenhuma chave privada ou service_role key hardcoded.
- Variáveis de ambiente seguem o padrão `REACT_APP_*` do CRA.

## Próximos passos recomendados

1. Configurar IDs reais de GA4/GTM/Clarity em `public/index.html`.
2. Popular dados de contato pessoal dos decisores na tabela `prospect_companies`.
3. Criar automações de email no Supabase Edge Functions para novos leads.
4. Implementar dashboard de relatórios com gráficos.
