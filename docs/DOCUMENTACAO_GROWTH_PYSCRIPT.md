# Documentação Growth - PyScript.Tech

**Data:** 26 de Junho de 2026  
**Status:** Fases de implementação concluídas, build aprovado  
**Objetivo:** Transformar PyScript.Tech em uma operação de aquisição de clientes previsível.

---

## Sumário Executivo

A PyScript.Tech evoluiu de um site institucional para uma operação de growth completa. Foram implementadas:

- **Auditoria de aquisição** com priorização de canais
- **CRM interno** com funil de vendas de 7 etapas
- **Mecanismos de captura** de leads (diagnóstico, calculadora ROI, lead magnet)
- **Authority engine** com cases e biblioteca de conteúdo
- **SEO avançado** com 15 landing pages e schemas
- **Analytics** com GA4, GTM, Clarity e eventos de conversão
- **Roadmap comercial** de 12 meses
- **Lista de 50 empresas** para prospecção ativa

---

## 1. Auditoria Completa

### 1.1 Diagnóstico Atual

| Área | Situação Anterior | Situação Atual |
|------|-------------------|----------------|
| Posicionamento | Software House genérica | Especialista em IA, Automação e Sistemas Corporativos |
| Site | 6 páginas | 20+ páginas otimizadas |
| Leads | Formulário único | Funil multi-etapa + calculadora + lead magnet |
| CRM | Inexistente | CRM interno com pipeline |
| SEO | Básico | Avançado (15 landing pages, schemas, sitemap) |
| Analytics | Básico | GA4, GTM, Clarity, eventos customizados |
| Prospecção | Reativa | Lista de 50 empresas + estratégia |
| Conteúdo | Esporádico | Estrutura para blog, guias, cases |

### 1.2 Canais de Aquisição Avaliados

Ver arquivo completo: `AUDITORIA_AQUISICAO.md`

**Prioridade de canais:**
1. SEO (alto ROI, baixo CAC, médio prazo)
2. LinkedIn (muito alto ROI, baixo CAC, curto prazo)
3. Cases (muito alto ROI, muito baixo CAC, imediato)
4. Landing Pages (alto ROI, baixo CAC, curto prazo)
5. Google Meu Negócio (alto ROI, muito baixo CAC, curto prazo)
6. Email Marketing (alto ROI, baixo CAC, médio prazo)
7. Blog (alto ROI, muito baixo CAC, médio prazo)
8. Google Ads (alto ROI, médio CAC, curto prazo)
9. Newsletter (médio ROI, baixo CAC, longo prazo)

**Canais a ignorar inicialmente:** TikTok, Instagram como aquisição B2B direta, YouTube orgânico, eventos físicos caros.

---

## 2. Melhorias Implementadas

### 2.1 Estrutura de CRM e Funil

**Arquivos:**
- `@/home/leonardo/dev/PyScriptTech/src/pages/dashboard/Leads/LeadsList.jsx`
- `@/home/leonardo/dev/PyScriptTech/src/pages/dashboard/Leads/LeadForm.jsx`
- `@/home/leonardo/dev/PyScriptTech/src/pages/dashboard/Leads/index.js`
- `@/home/leonardo/dev/PyScriptTech/src/components/dashboard/Sidebar/Sidebar.jsx` (atualizado)
- `@/home/leonardo/dev/PyScriptTech/src/App.js` (rotas adicionadas)

**Funil de vendas:**
1. Novo Lead
2. Contato Realizado
3. Diagnóstico Agendado
4. Proposta Enviada
5. Negociação
6. Fechado
7. Perdido

**Persistência:** localStorage (pronto para Supabase/PostgreSQL/HubSpot)

### 2.2 Captação de Leads

**Diagnóstico Gratuito:**
- URL: `/diagnostico-gratuito`
- 4 etapas com campos: nome, empresa, cargo, segmento, funcionários, problema, sistemas, interesse, investimento
- Salva lead automaticamente no CRM
- Dispara evento GA4/GTM/Clarity

**Calculadora ROI:**
- URL: `/calculadora-roi`
- Calcula horas desperdiçadas, custo operacional e economia potencial
- Captura email para relatório completo

**Lead Magnet - Guia:**
- URL: `/guia-automacao-2026`
- "10 Processos que sua Empresa Deveria Automatizar em 2026"
- Conteúdo liberado após cadastro de email

### 2.3 Authority Engine

**Cases existentes:**
- `/cases/oraculo-ia` - IA e RAG
- `/cases/logiflow` - CRM para logística
- `/cases/proflow` - Plataforma para freelancers

**Biblioteca de conteúdo:**
- Blog estruturado para SEO
- Páginas de guias e whitepapers
- Calculadora interativa

### 2.4 SEO Avançado

**Landing pages existentes (6):**
- `/software-sob-medida`
- `/desenvolvimento-python`
- `/automacao-empresarial`
- `/inteligencia-artificial-empresas`
- `/integracao-de-sistemas`
- `/software-corporativo`

**Novas landing pages (8):**
- `/desenvolvimento-django`
- `/desenvolvimento-fastapi`
- `/automacao-com-python`
- `/chatbot-empresarial`
- `/integracao-sistemas-legados`
- `/inteligencia-artificial-logistica`
- `/crm-sob-medida`
- `/dashboard-corporativo`

**Schemas implementados:**
- Organization
- WebPage
- Service
- Article (cases)
- FAQPage (landing pages)
- BreadcrumbList (SEO component)
- OfferCatalog

### 2.5 Analytics e Métricas

**Ferramentas configuradas:**
- Google Analytics 4 (via react-ga4 + script gtag)
- Google Tag Manager (dataLayer)
- Microsoft Clarity (heatmaps e gravações)
- Google Search Console (via sitemap.xml)

**Eventos mapeados:**
- `click_whatsapp`
- `click_calendly`
- `form_submit`
- `download_lead_magnet`
- `view_case`
- `start_diagnostico`
- `submit_diagnostico`
- `calculate_roi`
- `click_cta`

Arquivo: `@/home/leonardo/dev/PyScriptTech/src/services/analytics.js`

---

## 3. Plano Comercial

### 3.1 Ofertas

| Oferta | Ticket | Prazo | Margem |
|--------|--------|-------|--------|
| Automação Empresarial | R$ 5K-15K | 2-6 semanas | 50-60% |
| IA Corporativa | R$ 10K-30K | 4-12 semanas | 50-65% |
| Sistema Corporativo | R$ 15K-100K | 2-6 meses | 45-60% |
| Consultoria Python | R$ 150-300/hora | Variável | 70-80% |
| Suporte Recorrente | R$ 1K-10K/mês | Contínuo | 60-70% |

### 3.2 Metas de Faturamento

| Período | Faturamento | Clientes Novos | MRR |
|---------|-------------|----------------|-----|
| 3 meses | R$ 80.000 | 3-4 | R$ 3.000 |
| 6 meses | R$ 250.000 | 8-10 | R$ 12.000 |
| 12 meses | R$ 700.000 | 18-22 | R$ 35.000 |

Ver arquivo completo: `ROADMAP_COMERCIAL_12M.md`

---

## 4. Plano de SEO

### 4.1 Keywords Prioritárias

**Comerciais de alto valor:**
- software sob medida
- desenvolvimento python
- automação empresarial
- inteligência artificial para empresas
- integração de sistemas
- software corporativo
- CRM sob medida
- ERP sob medida

**Técnicas de nicho:**
- desenvolvimento django
- desenvolvimento fastapi
- automação com python
- chatbot empresarial
- integração de sistemas legados
- dashboard corporativo
- IA para logística

### 4.2 Estrutura de Conteúdo

**Blog:** 2-4 artigos por semana
- 40% educacional (como fazer, o que é)
- 40% comercial (cases, comparações, custos)
- 20% autoridade (tendências, opinião)

**Landing pages:** 1-2 novas por mês para nichos específicos
**Cases:** 1 novo por mês com dados reais
**Guias/Whitepapers:** 1 por trimestre

### 4.3 Link Building

- Cadastrar em diretórios: Clutch, GoodFirms, Software Suggest, Capterra
- Parcerias com blogs e consultorias
- Guest posts em sites de tecnologia/negócios
- Cases publicados em LinkedIn e Medium

---

## 5. Estratégia de Aquisição

### 5.1 SEO Orgânico (Longo prazo)

**Ações mensais:**
- 4-8 artigos de blog
- 1-2 novas landing pages
- Otimização de FAQ Schema
- Construção de 2-5 backlinks
- Ajustes técnicos de performance

### 5.2 LinkedIn (Curto/Médio prazo)

**Ações diárias:**
- 20-30 conexões personalizadas
- 1-2 posts por dia
- 5-10 comentários em posts de empresas-alvo
- 10-20 follow-ups por dia

**Ações semanais:**
- 1 artigo longo no LinkedIn
- 1 case de sucesso
- 1 convite para webinar

### 5.3 Google Ads (Curto prazo)

**Campanhas iniciais:**
- "software sob medida"
- "automação empresarial"
- "inteligência artificial empresas"
- "CRM sob medida"
- "desenvolvimento python"

**Orçamento:** R$ 2.000-6.000/mês escalando conforme CAC

### 5.4 Google Meu Negócio

**Ações:**
- Cadastrar empresa com CNPJ
- Solicitar 5-10 avaliações iniciais
- Publicar posts semanais
- Adicionar serviços e produtos
- Responder todas as avaliações

### 5.5 Parcerias e Indicações

**Parceiros-alvo:**
- Contadores e escritórios contábeis
- Consultores de ERP
- Agências de marketing digital
- Consultorias de negócios

**Programa de indicação:**
- 5-10% do valor fechado para parceiro
- Material de divulgação pronto
- Comissão paga após pagamento do cliente

---

## 6. Estratégia de Conteúdo

### 6.1 Calendário Editorial Sugerido (Mensal)

**Semana 1:** Artigo educacional (SEO long-tail)
**Semana 2:** Case de sucesso ou comparação
**Semana 3:** Artigo comercial (como contratar, preços, ROI)
**Semana 4:** Guia prático ou checklist

### 6.2 Temas Prioritários

- Quanto custa um software sob medida?
- Como automatizar processos manuais na empresa
- IA para logística: o que muda em 2026
- ERP vs CRM: diferenças e quando usar
- Integração de sistemas legados
- RAG: o que é e como aplicar na empresa
- Chatbot empresarial: vale a pena?
- 10 sinais de que sua empresa precisa de um sistema

### 6.3 Formatos

- Artigos de blog (1500-2500 palavras)
- Guias em PDF (lead magnets)
- Calculadoras interativas
- Vídeos curtos (60-90s) para LinkedIn
- Webinars mensais
- Cases em PDF

---

## 7. Estratégia de Prospecção

### 7.1 Segmentos Prioritários

1. **Logística e Transporte** - TMS, rastreamento, CT-e, IA para rotas
2. **Saúde** - CRM para clínicas, integração de prontuários, chatbot
3. **Serviços** - CRM, automação de faturamento, dashboard
4. **Indústria** - Manutenção preditiva, integração ERP, IA

### 7.2 Processo de Prospecção

1. **Pesquisa:** identificar decisor e dor do segmento
2. **Conexão:** enviar convite personalizado no LinkedIn
3. **Valor:** compartilhar case ou calculadora relevante
4. **Diagnóstico:** convidar para diagnóstico gratuito de 30 min
5. **Proposta:** enviar proposta com ROI estimado
6. **Follow-up:** 3-4 tentativas em 14 dias
7. **Fechamento:** contrato e kickoff

### 7.3 Lista de 50 Empresas

Ver arquivo completo: `LISTA_PROSPECCAO_RJ.md`

---

## 8. Roadmap de Crescimento

### 8.1 Trimestre 1: Fundação (Meses 1-3)

**Foco:** Configurar infraestrutura, gerar tráfego inicial, fechar primeiros clientes.

**Entregas:**
- GA4, GTM, Clarity e Search Console ativos
- Google Meu Negócio configurado
- 12 artigos de blog publicados
- 50 conexões LinkedIn por semana
- 1 campanha piloto de Google Ads
- 3-4 clientes fechados

### 8.2 Trimestre 2: Escala (Meses 4-6)

**Foco:** Aumentar investimento em canais pagos, otimizar conversão, criar autoridade.

**Entregas:**
- 24 artigos de blog publicados
- 2-3 landing pages novas por segmento
- 1 e-book ou whitepaper
- 3-5 cases publicados
- 8-10 clientes acumulados

### 8.3 Trimestre 3: Estrutura (Meses 7-9)

**Foco:** Sistematizar vendas, criar MRR, expandir parcerias.

**Entregas:**
- CRM ativo com todos os leads
- Processo de vendas documentado
- Programa de indicação funcionando
- 2-3 parcerias firmes
- 13-15 clientes acumulados

### 8.4 Trimestre 4: Expansão (Meses 10-12)

**Foco:** Expandir geografia, produtizar ofertas, planejar 2027.

**Entregas:**
- Prospecção em São Paulo
- 1 produto recorrente inicial
- Programa de afiliados
- 18-22 clientes acumulados
- MRR R$ 35.000

---

## 9. Metas de Faturamento

| Período | Faturamento Acumulado | Clientes Novos | MRR | Leads | Diagnósticos |
|---------|----------------------|----------------|-----|-------|--------------|
| 3 meses | R$ 80.000 | 3-4 | R$ 3.000 | 90 | 15 |
| 6 meses | R$ 250.000 | 8-10 | R$ 12.000 | 300 | 40 |
| 12 meses | R$ 700.000 | 18-22 | R$ 35.000 | 1.200 | 130 |

---

## 10. Arquitetura Técnica do CRM

### 10.1 Modelo de Dados (Lead)

```json
{
  "id": "string",
  "name": "string",
  "email": "string",
  "phone": "string",
  "company": "string",
  "role": "string",
  "segment": "string",
  "employees": "string",
  "problem": "string",
  "systems": "string",
  "interests": ["string"],
  "stage": "string",
  "source": "string",
  "value": "number",
  "createdAt": "date",
  "updatedAt": "date",
  "notes": "string"
}
```

### 10.2 Integrações Futuras

**Supabase:** Substituir localStorage por tabela `leads` com RLS
**PostgreSQL:** Modelo relacional para leads, histórico de atividades e propostas
**HubSpot:** Sincronização bidirecional de contatos e deals via API

### 10.3 Escalabilidade

- Adicionar tabela de `activities` para histórico de contatos
- Adicionar tabela de `proposals` com itens e valores
- Implementar autenticação e permissões por usuário comercial
- Dashboard de performance do funil

---

## 11. Checklist de Implementação Pós-Deploy

### 11.1 Configurações Obrigatórias

- [ ] Substituir `GA_MEASUREMENT_ID` em `index.html` e `.env`
- [ ] Substituir `GTM-XXXXXXX` em `index.html`
- [ ] Substituir `CLARITY_PROJECT_ID` em `index.html`
- [ ] Configurar Search Console e enviar sitemap
- [ ] Cadastrar Google Meu Negócio
- [ ] Configurar EmailJS para formulários
- [ ] Configurar Calendly para agendamentos
- [ ] Verificar número do WhatsApp

### 11.2 Testes de Conversão

- [ ] Testar formulário de diagnóstico
- [ ] Testar calculadora ROI
- [ ] Testar lead magnet
- [ ] Testar CRM salvando leads
- [ ] Testar eventos no GA4/GTM
- [ ] Testar WhatsApp e Calendly
- [ ] Testar envio de email (EmailJS)

### 11.3 Lançamento de Campanhas

- [ ] Publicar 4 artigos iniciais
- [ ] Ativar LinkedIn Ads
- [ ] Ativar Google Ads
- [ ] Enviar 30 conexões no LinkedIn
- [ ] Criar primeira campanha de email
- [ ] Solicitar avaliações no Google Meu Negócio

---

## 12. Conclusão

A PyScript.Tech agora possui uma estrutura completa para geração de leads e fechamento de contratos:

- Site otimizado para SEO e conversão
- Múltiplos mecanismos de captura de leads
- CRM interno com funil de vendas
- Analytics configurado para medição
- Estratégia de prospecção com lista de 50 empresas
- Roadmap comercial de 12 meses

**Próximo passo crítico:** configurar IDs reais de GA4/GTM/Clarity, cadastrar Google Meu Negócio e iniciar a primeira campanha de prospecção no LinkedIn.
