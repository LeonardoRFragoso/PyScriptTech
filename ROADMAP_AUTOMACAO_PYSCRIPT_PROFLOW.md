# Roadmap de Automação - PyScript.Tech ↔ ProFlow.pro

## Status atual

A integração foi implementada de forma manual-assistida: o CRM da PyScript gera payload JSON, Markdown e checklist para criação do projeto na ProFlow. A criação real ainda exige ação do gestor PyScript na ProFlow.

## Fase 1 — Automações básicas (curto prazo)

### 1.1. Criação automática de projeto na ProFlow
**Objetivo**: quando uma proposta é marcada como `accepted` no CRM, criar o projeto na ProFlow automaticamente.

**Pré-requisitos na ProFlow**:
- Endpoint `POST /api/v1/projects/pyscript/` autenticado por JWT.
- Papel de gestor PyScript com permissão para criar projetos em nome de clientes.
- Campo `source='pyscript'` no projeto.

**Payload enviado**: mapeamento já documentado em `MAPEAMENTO_DADOS_PYSCRIPT_PROFLOW.md`.

### 1.2. Criação automática de usuário cliente
**Objetivo**: ao criar projeto, criar usuário cliente na ProFlow ou enviar convite por email.

**Pré-requisitos**:
- Endpoint para criação de usuário cliente por gestor PyScript.
- Fluxo de convite por email com link de ativação.
- Vinculação automática do usuário ao projeto criado.

### 1.3. Criação automática de milestones
**Objetivo**: converter itens da proposta em milestones do contrato vinculado ao projeto.

**Pré-requisitos**:
- Endpoint `POST /api/v1/contracts/{id}/milestones/` ou similar.
- Criação automática do contrato vinculado ao projeto.

## Fase 2 — Integração de status (médio prazo)

### 2.1. Pagamento aprovado atualiza projeto
**Objetivo**: quando o cliente deposita o valor no escrow, o projeto muda para `in_progress` automaticamente.

### 2.2. Entrega enviada dispara notificação para cliente
**Objetivo**: quando freelancer envia entrega, o cliente recebe notificação por email e no portal.

### 2.3. Cliente aprova milestone e libera próxima etapa
**Objetivo**: aprovação automática da entrega atualiza status do milestone e libera início do próximo.

### 2.4. Atualização de status na ProFlow reflete no CRM da PyScript
**Objetivo**: quando projeto na ProFlow muda de status, o lead no CRM atualiza pipeline (`negociacao`, `fechado`, etc.).

**Implementação**: webhooks da ProFlow → endpoint na PyScript (ou Supabase Edge Function).

## Fase 3 — Integração comercial e operacional (longo prazo)

### 3.1. Projeto concluído gera pedido de depoimento
**Objetivo**: quando projeto muda para `completed`, disparar email automático solicitando depoimento/case.

### 3.2. Cliente satisfeito gera case para PyScript
**Objetivo**: após review positiva, criar rascunho de case study no CMS/blog da PyScript.

### 3.3. Dashboard unificado de métricas
**Objetivo**: no CRM da PyScript, exibir métricas combinadas (leads, propostas, projetos ativos na ProFlow, faturamento, NPS).

### 3.4. SSO entre PyScript e ProFlow
**Objetivo**: cliente logado na PyScript pode acessar a ProFlow sem nova autenticação.

**Pré-requisitos**:
- Integração de autenticação entre Supabase Auth (PyScript) e Django JWT (ProFlow).
- Ou uso de magic links/tokens de curta duração.

## Fase 4 — Automações avançadas (futuro)

### 4.1. Geração automática de contrato
**Objetivo**: a partir dos termos da proposta, gerar contrato PDF com dados do cliente e projeto.

### 4.2. Integração de pagamentos com gateway
**Objetivo**: criar preferência de pagamento automaticamente no Mercado Pago ao criar projeto.

### 4.3. AI para sugerir milestones e prazos
**Objetivo**: usar histórico de projetos para sugerir automaticamente milestones e prazos baseados no escopo.

## Próximos passos recomendados

1. Implementar endpoint `POST /api/v1/projects/pyscript/` na ProFlow.
2. Criar papel de gestor PyScript na ProFlow.
3. Adicionar campos `external_pyscript_lead_id` e `external_pyscript_proposal_id` na ProFlow.
4. Configurar variáveis de ambiente na PyScript para URL e credenciais da API ProFlow.
5. Testar fluxo end-to-end com um projeto real.
6. Documentar endpoints e autenticação para manutenção futura.
