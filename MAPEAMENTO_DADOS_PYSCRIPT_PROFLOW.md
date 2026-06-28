# Mapeamento de Dados PyScript CRM → ProFlow

## PyScript Lead → ProFlow User + ClientProfile

| PyScript Lead | ProFlow User | ProFlow ClientProfile | Observações |
|---------------|--------------|----------------------|-------------|
| `name` | `first_name` + `last_name` | — | Nome completo do lead vira nome do usuário. |
| `email` | `email` (username também) | — | Email será login na ProFlow. |
| `phone` | `phone` | `phone`, `phone_whatsapp` | Telefone de contato. |
| `company` | — | `company_name` | Razão social da empresa. |
| `segment` | — | `industry` | Requer tabela de mapeamento de segmentos. |
| `employees` | — | `company_size` | Requer conversão de ranges. |
| `role` | — | `team_contacts` | Pode ser adicionado como contato principal. |
| `source` | — | — | Campo de rastreamento interno (não exposto). |
| `notes` | — | `description` | Anotações gerais do lead. |

## Mapeamento de segmentos PyScript → indústria ProFlow

| PyScript Segment | ProFlow Industry |
|-------------------|------------------|
| Logística | logistics |
| Transporte | logistics |
| Saúde | health |
| Serviços | services |
| Indústria | other |
| Varejo | retail |
| Tecnologia | technology |
| Outro | other |

## Mapeamento de tamanho de empresa

| PyScript Employees | ProFlow CompanySize |
|--------------------|---------------------|
| 1-10 | small |
| 11-20 | small |
| 21-50 | medium |
| 51-100 | medium |
| 101-200 | large |
| 200+ | enterprise |

## PyScript Proposal → ProFlow Project

| PyScript Proposal | ProFlow Project | Observações |
|--------------------|-----------------|-------------|
| `title` | `title` | Título do projeto. |
| `scope` | `description` | Escopo detalhado. |
| `total_value` | `budget`, `final_price` | Valor final aprovado. |
| `valid_until` | `deadline` | Data estimada de entrega. |
| `lead.interests` | `category`, `subcategory`, `skills_required` | Mapear interesse para categoria do projeto. |
| `lead.segment` | `category` | Categoria secundária. |
| `lead.id` | — | Salvar em campo futuro `external_pyscript_lead_id`. |
| `proposal.id` | — | Salvar em campo futuro `external_pyscript_proposal_id`. |
| `'private'` | `visibility` | Projetos B2B não devem ser públicos. |
| `'fixed'` | `budget_type` | Projetos PyScript geralmente são fixos. |
| `'in_progress'` | `status` | Projeto já inicia em andamento após aprovação. |
| `lead.email` | `client` (FK para User) | Cliente vinculado ao projeto. |
| `assigned_team` | `freelancer` (FK para User) | Freelancer/parceiro atribuído. |

## Mapeamento de interesse para categoria do projeto

| PyScript Interest | ProFlow Category | ProFlow Subcategory |
|--------------------|------------------|---------------------|
| IA | data | machine_learning |
| Automação | data | data_analysis |
| ERP | web_dev | fullstack |
| CRM | web_dev | fullstack |
| Integrações | web_dev | api |
| Dashboard | data | data_visualization |
| Sistema Corporativo | web_dev | fullstack |

## PyScript Proposal Items → ProFlow Milestones

| PyScript Proposal Item | ProFlow Milestone |
|------------------------|-------------------|
| `description` | `title` |
| Parte do `scope` | `description` |
| `value` | `amount` |
| Ordem do item | `order` |
| Prazo estimado | `due_date` |
| `'pending'` | `status` |

## Milestones padrão sugeridos para projetos PyScript

Caso a proposta não tenha itens detalhados, usar milestones padrão:

1. Diagnóstico técnico
2. Arquitetura da solução
3. Desenvolvimento MVP
4. Integrações
5. Testes
6. Homologação
7. Deploy
8. Suporte inicial

## Payload JSON sugerido para criação manual

```json
{
  "lead_id": "uuid",
  "proposal_id": "uuid",
  "client": {
    "name": "Nome do Cliente",
    "email": "cliente@empresa.com",
    "phone": "(21) 99999-9999",
    "company": "Empresa Ltda",
    "segment": "Tecnologia",
    "employees": "11-20"
  },
  "project": {
    "title": "Automação de Processos - Empresa Ltda",
    "description": "Escopo aprovado...",
    "category": "data",
    "subcategory": "data_analysis",
    "budget": 25000.00,
    "budget_type": "fixed",
    "final_price": 25000.00,
    "deadline": "2026-09-30",
    "visibility": "private",
    "status": "in_progress",
    "skills_required": ["Python", "FastAPI", "React"]
  },
  "milestones": [
    { "title": "Diagnóstico técnico", "amount": 2500.00, "due_date": "2026-07-15" },
    { "title": "Arquitetura da solução", "amount": 2500.00, "due_date": "2026-07-30" },
    { "title": "Desenvolvimento MVP", "amount": 10000.00, "due_date": "2026-08-31" },
    { "title": "Integrações", "amount": 5000.00, "due_date": "2026-09-15" },
    { "title": "Testes e Homologação", "amount": 3000.00, "due_date": "2026-09-25" },
    { "title": "Deploy e Suporte", "amount": 2000.00, "due_date": "2026-09-30" }
  ]
}
```

## Campos novos necessários na ProFlow (recomendação futura)

Para facilitar automação, recomenda-se adicionar ao modelo `Project`:
- `external_pyscript_lead_id` (UUID)
- `external_pyscript_proposal_id` (UUID)
- `source` (default: `pyscript`)
- `manager_notes` (anotações internas do gestor PyScript)

Recomenda-se adicionar ao modelo `User`:
- `external_pyscript_lead_id` (UUID)
- `created_by_manager` (boolean) - para saber que foi criado pela PyScript

## Checklist de criação manual

1. Criar usuário cliente na ProFlow (ou enviar convite).
2. Criar/atualizar `ClientProfile` com dados do lead.
3. Criar projeto com `visibility='private'` e `status='in_progress'`.
4. Atribuir freelancer/parceiro interno ao projeto.
5. Criar milestones no contrato vinculado ao projeto.
6. Enviar email de onboarding para o cliente.
7. Atualizar lead na PyScript para etapa `fechado` e proposta para `accepted`.
