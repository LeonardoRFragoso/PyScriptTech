# Implementação de Analytics - PyScript.Tech

**Objetivo:** Documentar a configuração de Google Analytics 4, Google Tag Manager, Google Search Console e Microsoft Clarity, além dos eventos de conversão mapeados.

---

## 1. Ferramentas Configuradas

### 1.1 Google Analytics 4 (GA4)

**Biblioteca:** `react-ga4`  
**Arquivo:** `@/home/leonardo/dev/PyScriptTech/src/services/analytics.js`  
**Variável de ambiente:** `REACT_APP_GA4_MEASUREMENT_ID`

**Script adicional em `index.html`:** Script `gtag.js` para envio de pageviews e eventos.

### 1.2 Google Tag Manager (GTM)

**Arquivo:** `@/home/leonardo/dev/PyScriptTech/public/index.html`  
**Container:** `GTM-XXXXXXX` (substituir pelo ID real)  
**DataLayer:** Disponível globalmente em `window.dataLayer`

### 1.3 Microsoft Clarity

**Arquivo:** `@/home/leonardo/dev/PyScriptTech/public/index.html`  
**Project ID:** `CLARITY_PROJECT_ID` (substituir pelo ID real)

### 1.4 Google Search Console

**Sitemap:** `https://pyscript.tech/sitemap.xml`  
**Arquivo:** `@/home/leonardo/dev/PyScriptTech/public/sitemap.xml`  
**Robots:** `@/home/leonardo/dev/PyScriptTech/public/robots.txt`

---

## 2. IDs a Substituir Antes do Deploy

Antes de publicar em produção, substituir os placeholders:

| Placeholder | Local | Onde Obter |
|-------------|-------|------------|
| `GA_MEASUREMENT_ID` | `public/index.html` | Google Analytics 4 → Admin → Data Streams |
| `REACT_APP_GA4_MEASUREMENT_ID` | `.env` | Google Analytics 4 → Admin → Data Streams |
| `GTM-XXXXXXX` | `public/index.html` | Google Tag Manager → Admin → Container ID |
| `CLARITY_PROJECT_ID` | `public/index.html` | Microsoft Clarity → Project → Settings |

---

## 3. Eventos Mapeados

### 3.1 Eventos de Conversão

| Evento | Descrição | Onde Dispara | Parâmetros |
|--------|-----------|--------------|------------|
| `click_whatsapp` | Clique no botão WhatsApp | WhatsAppButton | `category: WhatsApp, action: Click, label: Floating Button` |
| `click_calendly` | Clique no link Calendly | Landing pages | `category: Calendly, action: Click, label: source` |
| `form_submit` | Envio de formulário | ContactSection, DiagnosticoGratuito | `category: Form, action: Submit Success, label: formName` |
| `download_lead_magnet` | Download de lead magnet | GuiaAutomacao | `category: Lead, label: magnetName` |
| `view_case` | Visualização de case | CaseStudyPage | `category: Engagement, label: caseName` |
| `start_diagnostico` | Início do diagnóstico | DiagnosticoGratuito | `category: Lead, label: source` |
| `submit_diagnostico` | Envio do diagnóstico | DiagnosticoGratuito | `category: Lead, label: segment` |
| `calculate_roi` | Uso da calculadora | CalculadoraROI | `category: Engagement, value: yearlySavings` |
| `click_cta` | Clique em CTA | Botões principais | `category: CTA, label: ctaName, source` |

### 3.2 Eventos de Engajamento

| Evento | Descrição | Onde Dispara |
|--------|-----------|--------------|
| `page_view` | Visualização de página | App.js (AnalyticsTracker) |
| `custom_event` | Eventos genéricos | Qualquer chamada de logEvent |
| `download_roi_report` | Download de relatório ROI | CalculadoraROI |

---

## 4. Configuração no GA4

### 4.1 Criar Propriedade

1. Acesse https://analytics.google.com
2. Crie uma propriedade GA4 para PyScript.Tech
3. Configure o data stream "Web" com URL https://pyscript.tech
4. Copie o Measurement ID (formato G-XXXXXXXXXX)

### 4.2 Criar Eventos de Conversão

1. Em GA4, vá em Admin → Events → Mark as conversion
2. Marcar como conversão:
   - `submit_diagnostico`
   - `form_submit`
   - `click_whatsapp`
   - `click_calendly`
   - `download_lead_magnet`
   - `calculate_roi`

### 4.3 Criar Públicos (Audiences)

- Visitantes que iniciaram diagnóstico
- Visitantes que baixaram lead magnet
- Visitantes que visualizaram cases
- Visitantes que usaram calculadora ROI

### 4.4 Relatórios Recomendados

- Conversões por fonte/mídia
- Taxa de conversão por página
- Tempo até conversão
- Páginas de entrada que geram conversão

---

## 5. Configuração no Google Tag Manager

### 5.1 Criar Container

1. Acesse https://tagmanager.google.com
2. Crie container Web para PyScript.Tech
3. Copie o ID GTM-XXXXXXX

### 5.2 Tags Recomendadas

**Tag GA4 - Configuração:**
- Tipo: Google Analytics: GA4 Configuration
- Measurement ID: G-XXXXXXXXXX
- Trigger: All Pages

**Tag GA4 - Evento de conversão:**
- Tipo: Google Analytics: GA4 Event
- Event Name: `submit_diagnostico`
- Trigger: Custom Event `submit_diagnostico`

**Tag Pixel de Remarketing (Google Ads):**
- Tipo: Google Ads Remarketing
- Trigger: All Pages

### 5.3 Triggers Recomendados

| Trigger | Tipo | Configuração |
|---------|------|--------------|
| All Pages | Page View | All Pages |
| Diagnostico Submit | Custom Event | Event name: `submit_diagnostico` |
| WhatsApp Click | Custom Event | Event name: `click_whatsapp` |
| Form Submit | Custom Event | Event name: `form_submit` |

---

## 6. Configuração do Microsoft Clarity

### 6.1 Criar Projeto

1. Acesse https://clarity.microsoft.com
2. Crie projeto para https://pyscript.tech
3. Copie o Project ID

### 6.2 Dados a Acompanhar

- Heatmaps por página
- Gravações de sessões
- Cliques em CTAs
- Scroll depth nos formulários
- Páginas com maior rejeição
- Friction points no funil

---

## 7. Configuração do Google Search Console

### 7.1 Verificação do Domínio

1. Acesse https://search.google.com/search-console
2. Adicione propriedade https://pyscript.tech
3. Verifique via DNS ou arquivo HTML

### 7.2 Enviar Sitemap

1. Acesse Sitemaps no Search Console
2. Envie: `sitemap.xml`

### 7.3 Monitorar

- Performance de keywords
- Páginas com mais impressões
- Taxa de clique (CTR)
- Erros de indexação
- Core Web Vitals

---

## 8. Implementação no Código

### 8.1 Rastreamento de Pageviews

O `AnalyticsTracker` em `App.js` dispara `logPageView` a cada mudança de rota:

```javascript
useEffect(() => {
  logPageView(location.pathname + location.search);
}, [location]);
```

### 8.2 Rastreamento de Eventos

Exemplo de uso:

```javascript
import { logWhatsAppClick, logFormSubmit } from './services/analytics';

const handleWhatsAppClick = () => {
  logWhatsAppClick();
};

const handleFormSubmit = () => {
  logFormSubmit('contact_form', true);
};
```

### 8.3 Novos Eventos

Para adicionar novos eventos, editar `src/services/analytics.js`:

```javascript
export const trackNewEvent = (param) => {
  logEvent('Category', 'Action', param);
};
```

---

## 9. Checklist de Ativação

- [ ] Criar propriedade GA4
- [ ] Criar container GTM
- [ ] Criar projeto Clarity
- [ ] Substituir IDs em `index.html`
- [ ] Adicionar `REACT_APP_GA4_MEASUREMENT_ID` no `.env`
- [ ] Marcar eventos como conversão no GA4
- [ ] Configurar tags e triggers no GTM
- [ ] Verificar site no Search Console
- [ ] Enviar sitemap.xml
- [ ] Testar eventos com GA4 DebugView
- [ ] Testar dataLayer no GTM Preview
- [ ] Verificar gravações no Clarity

---

## 10. Testes de Tracking

### 10.1 GA4 DebugView

1. Acesse GA4 → Configure → DebugView
2. Use a extensão Google Analytics Debugger no Chrome
3. Realize ações no site e verifique se eventos aparecem

### 10.2 GTM Preview

1. Acesse GTM → Preview
2. Insira URL do site
3. Realize ações e verifique tags disparadas

### 10.3 Clarity

1. Acesse Clarity → Project
2. Aguarde 24-48h para primeiras gravações
3. Verifique heatmaps e sessões

---

## 11. Relatórios de Acompanhamento

### 11.1 Semanal

- Visitantes e leads por canal
- Taxa de conversão de CTAs principais
- Eventos de conversão
- Leads no CRM por etapa

### 11.2 Mensal

- Tráfego orgânico total
- Custo por lead (CPL) por canal
- ROI de Google Ads e LinkedIn Ads
- Novos leads, diagnósticos, propostas e fechamentos
- Posições de keywords prioritárias

### 11.3 Trimestral

- LTV e CAC
- Taxa de conversão do funil completo
- MRR e churn
- NPS de clientes
- Revisão de estratégia por canal

---

## 12. Conclusão

A infraestrutura de analytics está implementada e pronta para ativação. Basta substituir os placeholders pelos IDs reais das ferramentas e marcar os eventos de conversão no GA4. Com o acompanhamento correto, será possível otimizar canais, reduzir CAC e aumentar a taxa de conversão de leads em clientes.
