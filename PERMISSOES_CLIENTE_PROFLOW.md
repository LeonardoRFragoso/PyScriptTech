# Permissões de Acesso - ProFlow.pro para Clientes PyScript

## Visão geral

Projetos criados pela PyScript.Tech na ProFlow.pro devem seguir um modelo de permissões restrito, garantindo segurança, privacidade e proteção de marca.

## Papéis

### 1. Cliente PyScript

Usuário com `user_type='client'` na ProFlow, vinculado a um ou mais projetos da PyScript.

#### Pode:

- Visualizar projetos vinculados à sua empresa
- Ver milestones, prazos e status
- Enviar mensagens no portal
- Aprovar ou solicitar revisão de entregas
- Baixar arquivos e entregáveis
- Visualizar status financeiro por milestone (pagamento pendente/depositado/liberado)
- Receber notificações de atualizações

#### Não pode:

- Ver projetos de outros clientes
- Ver lista de freelancers/parceiros internos sem autorização
- Alterar escopo, prazo ou valor sem solicitação formal
- Criar novos projetos
- Acessar dados financeiros internos da PyScript (margens, taxas, repasses)
- Ver conversas internas da equipe PyScript

### 2. Gestor PyScript

Usuário com `user_type='admin'` na ProFlow ou permissão especial de gestor de projetos B2B.

#### Pode:

- Criar projetos em nome de clientes PyScript
- Editar escopo, prazo e valor
- Definir milestones e atribuir responsáveis
- Adicionar freelancers/parceiros ao projeto
- Visualizar e gerenciar financeiro completo
- Aprovar/reprovar entregas em nome do cliente (quando autorizado)
- Encerrar projetos
- Gerenciar usuários clientes e convites
- Acessar relatórios e métricas dos projetos PyScript

#### Não pode:

- Usar a plataforma para projetos fora da PyScript sem autorização
- Expor dados de um cliente para outro

### 3. Freelancer/Parceiro

Usuário com `user_type='freelancer'` na ProFlow, convidado para atuar em projetos específicos da PyScript.

#### Pode:

- Visualizar projetos aos quais foi atribuído
- Ver tarefas e milestones atribuídos a ele
- Enviar entregas e anexos
- Enviar mensagens no contexto do projeto
- Atualizar status técnico do trabalho
- Receber liberação de pagamento após aprovação da entrega

#### Não pode:

- Ver margem da PyScript ou valor total contratado com o cliente
- Ver dados financeiros detalhados além do valor liberado para ele
- Negociar diretamente com o cliente sem autorização da PyScript
- Acessar informações sensíveis desnecessárias (dados de outros clientes, contratos, etc.)
- Publicar o projeto ou receber propostas externas

## Regras de projeto B2B

- Projetos devem ser criados com `visibility='private'`.
- Status inicial deve ser `in_progress` ou `awaiting_payment`, nunca `open` (concorrência aberta).
- Freelancer deve ser atribuído diretamente pelo gestor PyScript.
- Escrow/pagamento deve ser configurado por projeto, considerando a margem da PyScript.

## Recomendação de implementação técnica futura

Para suportar essas permissões de forma robusta, recomenda-se criar na ProFlow:

1. Papel `project_manager` (gestor PyScript) com permissões de admin limitadas a projetos B2B.
2. Campo `source='pyscript'` no projeto para aplicar regras específicas.
3. Endpoint seguro `POST /api/v1/projects/pyscript/` que só pode ser chamado por gestores PyScript.
4. Middleware que valida se freelancer só vê projetos atribuídos.
5. Ocultar `platform_fee` e `freelancer_amount` do serializador visível para freelancers.
6. Log de auditoria para todas as ações de gestores em projetos PyScript.
