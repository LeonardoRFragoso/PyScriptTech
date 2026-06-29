# Auditoria de Integração PyScript.Tech ↔ ProFlow.pro

## 1. Estrutura atual da PyScript.Tech

- **Stack**: React SPA (Create React App), React Router, Supabase (PostgreSQL + Auth).
- **Repositório**: `/home/leonardo/dev/PyScriptTech`
- **Funil comercial implementado**:
  - Página pública com SEO, formulários de captura (diagnóstico, calculadora ROI, lead magnet, contato).
  - CRM interno em `/dashboard/leads` com pipeline, prioridade, próximas ações e histórico de atividades.
  - Módulo de propostas em `/dashboard/proposals` com itens, valor, status e exportação de texto.
  - Módulo de prospecção em `/dashboard/prospects` com 50 empresas iniciais e conversão em lead.
  - Dashboard de métricas em `/dashboard/metrics`.
- **Autenticação**: Supabase Auth com fallback localStorage para desenvolvimento.
- **Persistência**: Supabase/PostgreSQL para todos os dados de CRM, com fallback localStorage.

Pontos fortes:
- CRM funcional e pronto para uso real.
- Formulários de captura salvam leads no banco.
- Propostas estruturadas com itens e valor.

Pontos a integrar:
- Propostas aprovadas na PyScript ainda não viram projetos na ProFlow.
- Clientes da PyScript não são criados automaticamente como usuários/clientes na ProFlow.
- Não existe ainda comunicação entre os dois sistemas.

## 2. Estrutura atual da ProFlow.pro

- **Repositório**: `/home/leonardo/dev/ProFlow`
- **Stack backend**: Django + Django REST Framework + PostgreSQL + Celery.
- **Stack frontend**: React (diretório `/home/leonardo/dev/ProFlow/frontend`).
- **Autenticação**: JWT (`rest_framework_simplejwt`) + registro de usuários em `/api/v1/users/register/`.
- **Base URL da API**: `/api/v1/`.

## 3. Como os projetos são criados hoje na ProFlow

Endpoint: `POST /api/v1/projects/`

Serializer de criação: `ProjectCreateSerializer` (`backend/apps/projects/serializers.py:68-109`).

Campos aceitos no POST:
- `title` (obrigatório)
- `description` (obrigatório)
- `category` (obrigatório, ex: `web_dev`, `data`, `other`)
- `subcategory` (opcional)
- `budget` (obrigatório)
- `budget_type` (`fixed`, `hourly`, `range`)
- `budget_min` / `budget_max` (opcional)
- `deadline` (obrigatório, formato Date)
- `skills_required` (array)
- `attachments` (array)
- `urgency`, `experience_level`, `project_length`, `visibility`, `allow_remote`, `location`

Comportamento:
- O projeto é publicado automaticamente (`published_at = now`).
- O `client` é o usuário autenticado (`request.user`).
- Somente usuários autenticados podem criar projetos.
- O cliente posteriormente pode escolher um freelancer a partir das propostas recebidas.

Restrição importante para o fluxo PyScript:
- O cliente autenticado precisa existir como `User` na ProFlow e ter `user_type='client'`.
- Atualmente um projeto criado fica com `status='open'` e fica visível para freelancers na plataforma.
- Para projetos B2B da PyScript, o ideal é criar com `visibility='private'` ou `status='in_progress'` diretamente, com um freelancer já atribuído (gestor PyScript/parceiro), evitando concorrência pública.

## 4. API, backend e banco prontos para automação?

**Status: parcialmente pronto.**

O que existe:
- API REST completa para projetos, clientes, propostas, entregas, pagamentos e mensagens.
- JWT autenticado via `/api/v1/token/`.
- Registro de usuários via `/api/v1/users/register/`.
- Modelos maduros para `Project`, `ClientProfile`, `Milestone`, `EscrowPayment`, `Delivery`, `Message`.

O que falta para automação segura:
- **Endpoint específico para criação de projetos B2B**: o endpoint atual assume que o cliente logado cria e publica o projeto. Para PyScript, o gestor precisa criar o projeto em nome do cliente.
- **Campo de vínculo externo**: não existe campo como `external_id`, `source`, `pyscript_lead_id` ou `pyscript_proposal_id` no modelo `Project` para rastrear a origem.
- **Papéis de gestor/PM**: a ProFlow tem `admin`, `client` e `freelancer`. Não existe um papel de "gestor PyScript" que possa criar projetos atribuídos a um cliente sem ser o próprio cliente.
- **Webhook ou fila de integração**: não existe endpoint pronto para receber projetos criados externamente.
- **Criação de usuário cliente por admin/gestor**: não existe endpoint de admin para criar usuário cliente e já vinculá-lo a um projeto.

Recomendação técnica: implementar automação real somente após criar esses pontos na ProFlow. Inicialmente usar integração manual-assistida via payload JSON/Markdown.

## 5. Como usuários/clientes são cadastrados na ProFlow

Endpoint: `POST /api/v1/users/register/`

O `RegisterView` cria um `User` com `user_type` (client, freelancer ou admin). O perfil de cliente (`ClientProfile`) é criado automaticamente via `get_or_create` quando acessado em `/api/v1/clients/profile/`.

Campos úteis do `ClientProfile`:
- `company_name`, `company_document`, `company_size`, `industry`, `description`, `website`, `phone`, `phone_whatsapp`, `address`, `city`, `state`, `country`, `preferred_budget_range`, `team_contacts`.

Para o fluxo PyScript:
- O cliente final da PyScript não precisa saber que está sendo cadastrado na ProFlow inicialmente. O gestor PyScript pode criar um usuário cliente com email do lead e senha temporária, ou enviar um convite para o cliente criar a própria conta.
- Melhor abordagem inicial: convite por email para o cliente se registrar na ProFlow, depois o gestor vincula o projeto a ele.

## 6. Como freelancers interagem com projetos na ProFlow

- Freelancers visualizam projetos abertos em `GET /api/v1/projects/`.
- Enviam propostas via `POST /api/v1/projects/{id}/proposals/` (modelo `Proposal`).
- O cliente aceita uma proposta via `POST /api/v1/proposals/{id}/accept/`.
- Após aceite, o freelancer é atribuído ao projeto (`project.freelancer`).
- O freelancer faz entregas via `POST /api/v1/projects/{id}/deliveries/`.
- O cliente aprova ou solicita revisão da entrega.

Para o fluxo PyScript:
- A proposta já é aprovada na PyScript. Não faz sentido o cliente receber novas propostas de freelancers desconhecidos.
- O gestor PyScript deve ser capaz de atribuir um freelancer/parceiro interno diretamente ao projeto, sem passar pela fase de propostas públicas.
- Isso exige uma adaptação no modelo de permissões ou criação de um novo endpoint de projeto B2B.

## 7. Como funcionam pagamentos, milestones, propostas e mensagens

### Pagamentos
- Modelo `EscrowPayment` vinculado 1:1 ao `Project`.
- Cliente deposita o valor em custódia. O valor só é liberado para o freelancer após aprovação da entrega.
- Taxa da plataforma é calculada automaticamente (8% padrão ou conforme plano do freelancer).
- Integração com Mercado Pago (`mp_preference_id`, `mp_payment_id`).

### Milestones
- Modelo `Milestone` vinculado a `Contract`.
- Campos: `title`, `description`, `amount`, `status`, `due_date`, `submitted_at`, `approved_at`, `paid_at`, `order`.
- Status: pending, in_progress, submitted, revision, approved, paid.

### Propostas
- Modelo `Proposal` com `project`, `freelancer`, `cover_letter`, `proposed_price`, `estimated_days`, `status`.
- Fluxo: pending → accepted/rejected/withdrawn.

### Mensagens
- App `messages` com modelo de conversa e mensagens entre cliente e freelancer.

## 8. Quais dados da proposta PyScript podem virar projeto na ProFlow

Mapeamento sugerido:

| PyScript Lead/Proposal | ProFlow Project / ClientProfile |
|------------------------|--------------------------------|
| `lead.name` | `User.first_name` + `User.last_name` ou `ClientProfile` company_name |
| `lead.email` | `User.email` (username também) |
| `lead.phone` | `User.phone` / `ClientProfile.phone_whatsapp` |
| `lead.company` | `ClientProfile.company_name` |
| `lead.segment` | `ClientProfile.industry` (mapear categorias) |
| `lead.employees` | `ClientProfile.company_size` |
| `proposal.title` | `Project.title` |
| `proposal.scope` | `Project.description` |
| `proposal.total_value` | `Project.budget` / `Project.final_price` |
| `proposal.items` | Milestones do contrato |
| `proposal.valid_until` | `Project.deadline` (data estimada) |
| `lead.interests` | `Project.skills_required` / `Project.category` |
| `lead.notes` | `Project.description` (anexo) |

## 9. Quais pontos precisam ser manuais inicialmente

1. **Criação do usuário cliente na ProFlow**: não existe endpoint seguro para a PyScript criar clientes em nome de terceiros sem autenticação adicional.
2. **Atribuição de freelancer interno**: a ProFlow não tem endpoint de gestor para atribuir freelancer sem proposta.
3. **Criação de milestones a partir de itens da proposta**: existe o modelo, mas não há endpoint automático que receba uma lista de itens.
4. **Configuração de escrow/pagamentos**: exige configuração do Mercado Pago e criação manual da preferência.
5. **Mapeamento de categoria/indústria**: precisa de tabela de conversão entre segmentos PyScript e categorias ProFlow.

## 10. Quais pontos podem ser automatizados futuramente

1. **Proposta aceita na PyScript → criação de projeto na ProFlow** assim que existir endpoint autenticado de gestor.
2. **Lead aprovado na PyScript → criação de usuário cliente na ProFlow** com convite por email.
3. **Itens da proposta → milestones do contrato** via endpoint que receba array de itens.
4. **Atualização de status do projeto** quando milestone for aprovada ou pagamento confirmado.
5. **Notificações entre plataformas** via webhooks.
6. **Geração automática de contrato** a partir dos termos da proposta.

## 11. Riscos identificados

- **Exposição de freelancers**: se o cliente visualizar propostas de freelancers na ProFlow, pode parecer que a PyScript terceiriza o projeto para terceiros desconhecidos. Recomenda-se criar projetos privados com freelancer já atribuído.
- **Taxa da plataforma**: o cálculo de 8% de taxa no escrow pode conflitar com a margem da PyScript. Para projetos B2B, o gestor PyScript deve ser isento de taxa ou a taxa deve ser configurada por projeto.
- **Marca ProFlow exposta de forma inadequada**: se o cliente acessar a ProFlow e ver projetos de outros freelancers, pode confundir as marcas. Precisa de white-label ou branding consistente.
- **Autenticação cruzada**: JWT da ProFlow é independente do Supabase Auth da PyScript. Não existe SSO. O cliente precisará de credenciais separadas até uma integração de autenticação ser feita.

## 12. Recomendações imediatas

1. **Não automatizar a criação de projeto** até que a ProFlow tenha um endpoint de gestor/PM seguro.
2. **Implementar integração manual-assistida** no CRM da PyScript: botão "Criar projeto na ProFlow" que gera payload JSON + Markdown + checklist.
3. **Criar página `/como-funciona-a-execucao`** na PyScript explicando o portal de acompanhamento.
4. **Atualizar copy** da PyScript para apresentar a ProFlow como portal próprio de acompanhamento.
5. **Documentar fluxo, mapeamento de dados, permissões e mensagens** em arquivos específicos.
6. **Mapear categorias e segmentos** entre PyScript e ProFlow para facilitar automação futura.
