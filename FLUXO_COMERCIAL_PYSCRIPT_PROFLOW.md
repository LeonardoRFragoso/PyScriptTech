# Fluxo Comercial PyScript.Tech → ProFlow.pro

## Visão geral

PyScript.Tech é responsável por aquisição, diagnóstico, proposta, fechamento e relacionamento B2B.
ProFlow.pro é o portal operacional próprio para execução, milestones, comunicação, entregas e pagamentos.

---

## Antes do fechamento

### 1. Visitante acessa PyScript.Tech
- Página inicial, landing pages de SEO, serviços ou anúncios.
- Conteúdo posiciona a PyScript como especialista em automação, IA e sistemas corporativos.

### 2. Captura de lead
- Visitante preenche diagnóstico gratuito, calculadora ROI, lead magnet ou formulário de contato.
- Lead é salvo no CRM da PyScript (Supabase) com origem, segmento, interesse e prioridade.

### 3. Qualificação e diagnóstico
- Equipe PyScript entra em contato em até 24h.
- Lead passa pelas etapas do funil: `novo` → `contato` → `diagnostico`.
- Atividades são registradas no histórico do lead.

### 4. Criação da proposta
- Após entender o escopo, a equipe cria proposta comercial no CRM.
- Proposta contém: título, escopo, itens, valor total, status e validade.
- Proposta é enviada ao cliente por email/WhatsApp.

### 5. Aprovação da proposta
- Cliente aprova a proposta.
- No CRM, lead é movido para a etapa `fechado`.
- Proposta muda status para `accepted`.

---

## Após aprovação

### 6. Preparação do projeto na ProFlow
- No CRM da PyScript, gestor clica em "Criar projeto na ProFlow".
- Sistema exibe modal com dados pré-preenchidos:
  - Nome do cliente e empresa
  - Email
  - Título do projeto
  - Escopo
  - Valor
  - Prazo
  - Milestones (a partir dos itens da proposta)
  - Observações
- Por enquanto, gera payload JSON + Markdown + checklist de criação manual na ProFlow.
- Futuramente, a criação será automática via API segura.

### 7. Criação do projeto na ProFlow
- Gestor PyScript cria o projeto na ProFlow usando os dados do payload.
- Cria usuário cliente na ProFlow (manualmente ou via convite por email).
- Projeto é criado como privado (`visibility='private'`) ou com freelancer já atribuído.
- Evita que o projeto apareça publicamente para outros freelancers.

### 8. Criação de milestones
- Cada item da proposta vira um milestone no contrato do projeto.
- Milestones têm título, descrição, valor e data de entrega.

### 9. Acesso do cliente ao portal
- Cliente recebe email com link do Portal de Projetos.
- Cliente acessa a ProFlow com credenciais.
- Mensagem de onboarding deixa claro que a PyScript continua responsável.

### 10. Execução e acompanhamento
- Equipe PyScript/parceiro atualiza status dos milestones.
- Cliente acompanha evolução, envia mensagens e aprova entregas.
- Arquivos e comunicação ficam centralizados.

### 11. Pagamentos
- Cliente realiza pagamentos conforme milestones aprovados.
- ProFlow gerencia escrow/pagamentos (quando integrado).
- PyScript acompanha financeiro no portal.

### 12. Conclusão
- Projeto concluído.
- Cliente recebe solicitação de depoimento/case.
- Lead/cliente passa para pós-venda na PyScript.

---

## Diagrama simplificado

```
[Visitante] → [PyScript.Tech]
                 ↓
         [Captura de Lead]
                 ↓
         [Diagnóstico PyScript]
                 ↓
         [Proposta PyScript]
                 ↓
         [Aprovação do Cliente]
                 ↓
         [Criar Projeto na ProFlow]
                 ↓
         [Milestones + Acesso Cliente]
                 ↓
         [Execução, Entregas, Pagamentos]
                 ↓
         [Projeto Concluído]
```

---

## Regras de ouro

- O cliente nunca precisa ir à ProFlow antes de falar com a PyScript.
- A ProFlow não aparece como plataforma externa. É "Portal de Projetos ProFlow" da PyScript.
- Projetos B2B nunca devem ser publicados como concorrência aberta.
- Freelancers/parceiros só aparecem para o cliente quando necessário e aprovado.
- PyScript mantém a responsabilidade final pela gestão e entrega.
