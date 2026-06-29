# Auditoria Operacional - PyScript.Tech CRM

**Data:** 27 de Junho de 2026  
**Objetivo:** Analisar o estado atual das funcionalidades de growth, CRM e analytics antes da migração para Supabase.

---

## 1. Funcionalidades de Growth Implementadas

| Funcionalidade | Status | Detalhes |
|----------------|--------|----------|
| Página de diagnóstico gratuito | ✅ Implementada | `/diagnostico-gratuito`, formulário multi-etapas, salva em localStorage |
| Calculadora ROI | ✅ Implementada | `/calculadora-roi`, cálculo de economia, captura email |
| Lead Magnet (Guia Automação) | ✅ Implementada | `/guia-automacao-2026`, libera conteúdo após cadastro |
| Landing pages SEO | ✅ Implementadas | 14 páginas para keywords de serviços |
| Cases de sucesso | ✅ Implementados | 3 páginas de cases detalhados |
| CRM interno | ⚠️ Parcial | Interface funcional, mas persiste em localStorage |
| Módulo de propostas | ❌ Não implementado | Apenas documentado na arquitetura |
| Módulo de prospecção | ❌ Não implementado | Apenas lista em markdown (`LISTA_PROSPECCAO_RJ.md`) |
| Dashboard de métricas | ❌ Não implementado | Apenas documentado |
| Analytics tracking | ⚠️ Parcial | Código pronto, IDs ainda são placeholders |

---

## 2. Funcionalidades Apenas Documentadas

| Funcionalidade | Documento | Status Real |
|----------------|-----------|-------------|
| Arquitetura CRM com Supabase | `ARQUITETURA_CRM.md` | Apenas teoria |
| Integração PostgreSQL/HubSpot | `ARQUITETURA_CRM.md` | Apenas teoria |
| Analytics completo | `IMPLEMENTACAO_ANALYTICS.md` | Código parcial, IDs pendentes |
| Roadmap comercial | `ROADMAP_COMERCIAL_12M.md` | Apenas planejamento |
| Estratégia de prospecção | `LISTA_PROSPECCAO_RJ.md` | Apenas lista estática |
| Módulo de propostas | `ARQUITETURA_CRM.md` | Não implementado |
| Módulo de prospecção | `DOCUMENTACAO_GROWTH_PYSCRIPT.md` | Não implementado |
| Dashboard de métricas | `ARQUITETURA_CRM.md` | Não implementado |

---

## 3. Rotas que Funcionam

### Públicas (funcionais)
- `/` — Home
- `/services` — Página de soluções
- `/projects` — Cases/Projetos
- `/about` — Sobre
- `/blog` — Blog
- `/contact` — Contato
- `/diagnostico-gratuito` — Diagnóstico gratuito
- `/calculadora-roi` — Calculadora ROI
- `/guia-automacao-2026` — Lead magnet
- `/cases/oraculo-ia` — Case Oráculo
- `/cases/logiflow` — Case LogiFlow
- `/cases/proflow` — Case ProFlow
- 14 landing pages de SEO

### Dashboard (funcionais, mas com dados locais)
- `/dashboard` — Dashboard home
- `/dashboard/clients` — Lista de clientes
- `/dashboard/leads` — Lista de leads (localStorage)
- `/dashboard/leads/new` — Novo lead (localStorage)
- `/dashboard/leads/edit/:id` — Editar lead (localStorage)

### Dashboard (não existem)
- `/dashboard/proposals` — Não existe
- `/dashboard/prospects` — Não existe
- `/dashboard/metrics` — Não existe

### Auth (funcionais, mas provavelmente mockadas)
- `/login` — Login
- `/register` — Registro
- `/forgot-password` — Recuperação de senha

---

## 4. Formulários que Salvam Leads

| Formulário | Onde Salva | Problema |
|------------|------------|----------|
| Diagnóstico Gratuito | localStorage `pyscript_leads` | Não sincroniza entre dispositivos |
| Calculadora ROI | localStorage `pyscript_leads` | Não sincroniza entre dispositivos |
| Lead Magnet (Guia) | localStorage `pyscript_leads` | Não sincroniza entre dispositivos |
| Formulário Contato Home | localStorage `pyscript_leads` | EmailJS funciona, mas lead não vai para backend real |
| Formulário de lead no CRM | localStorage `pyscript_leads` | Apenas local |

**Nenhum formulário salva em banco de dados real.**

---

## 5. Eventos de Analytics que Disparam

| Evento | Local | Dispara? | Observação |
|--------|-------|----------|------------|
| `page_view` | App.js via AnalyticsTracker | ✅ Sim | Via react-ga4 e dataLayer |
| `click_whatsapp` | WhatsAppButton | ✅ Sim | Via `logWhatsAppClick()` |
| `form_submit` | ContactSection | ✅ Sim | Via `logFormSubmit()` |
| `submit_diagnostico` | DiagnosticoGratuito | ✅ Sim | Via `window.gtag` |
| `download_lead_magnet` | GuiaAutomacao | ✅ Sim | Via `window.gtag` |
| `calculate_roi` | CalculadoraROI | ✅ Sim | Via `window.gtag` |
| `click_calendly` | Landing pages | ⚠️ Parcial | Depende de chamada explícita |
| `view_case` | CaseStudyPage | ⚠️ Parcial | Não implementado explicitamente |
| `click_cta` | CTAs gerais | ⚠️ Parcial | Não implementado explicitamente |

**Problema:** GA4, GTM e Clarity estão com IDs placeholder, então os eventos não chegam a lugar nenhum em produção.

---

## 6. Partes que Ainda Usam localStorage

| Componente/Funcionalidade | Uso de localStorage |
|---------------------------|---------------------|
| LeadsList.jsx | Leitura e escrita de `pyscript_leads` |
| LeadForm.jsx | Leitura e escrita de `pyscript_leads` |
| DiagnosticoGratuito.js | Escrita em `pyscript_leads` |
| CalculadoraROI.js | Escrita em `pyscript_leads` |
| GuiaAutomacao.js | Escrita em `pyscript_leads` |
| ContactSection.js | Escrita em `pyscript_leads` |
| AuthContext (provável) | Pode usar localStorage para token/mock |

---

## 7. Riscos Técnicos

### 7.1 Riscos Críticos

1. **Ausência de backend real:** Todo o CRM e captura de leads dependem de localStorage.
2. **Dados não compartilhados:** Leads capturados no site não chegam a uma base central.
3. **Auth não real:** Se o auth atual é mockado, o dashboard não tem proteção real.
4. **Credenciais expostas:** EmailJS key está hardcoded em `ContactSection.js` (`Wok3mV-Bl-3UNJa9I`).
5. **Analytics inativo:** IDs placeholder impedem rastreamento real.
6. **Sem backups:** localStorage pode ser limpo pelo usuário ou navegador.

### 7.2 Riscos Médios

1. **Componentes duplicados:** Serviços antigos ainda existem no código, mesmo não sendo usados.
2. **Sem tratamento de erros:** Formulários não têm fallback se localStorage falhar.
3. **Sem validação de dados:** Leads são salvos sem validação de schema.
4. **Sem notificações:** Nenhum alerta interno quando um novo lead é capturado.

### 7.3 Riscos Baixos

1. **Performance:** Muitos componentes e CSS podem afetar Lighthouse.
2. **Manutenção:** Código de CRM mistura UI e lógica de persistência.

---

## 8. Riscos Comerciais

1. **Leads perdidos:** Se o usuário limpar o navegador, leads somem.
2. **Sem visibilidade:** Time comercial não consegue acessar leads de outro dispositivo.
3. **Sem histórico:** Não há registro de interações com o lead.
4. **Sem propostas:** Não é possível gerar e acompanhar propostas comerciais.
5. **Sem controle de prospecção:** Lista de 50 empresas está em markdown, não operacional.
6. **Sem métricas:** Não há dashboard de funil de vendas.
7. **Dependência de EmailJS:** Se o serviço falhar, leads não são notificados internamente.

---

## 9. Variáveis de Ambiente Pendentes

| Variável | Onde Usar | Status |
|----------|-----------|--------|
| `REACT_APP_SUPABASE_URL` | `src/services/supabaseClient.js` | ⏳ Pendente |
| `REACT_APP_SUPABASE_ANON_KEY` | `src/services/supabaseClient.js` | ⏳ Pendente |
| `REACT_APP_GA4_MEASUREMENT_ID` | `src/services/analytics.js` | ⏳ Pendente |
| `GA_MEASUREMENT_ID` | `public/index.html` | ⏳ Pendente |
| `GTM-XXXXXXX` | `public/index.html` | ⏳ Pendente |
| `CLARITY_PROJECT_ID` | `public/index.html` | ⏳ Pendente |
| `REACT_APP_EMAILJS_SERVICE_ID` | `ContactSection.js` | ⚠️ Parcial (hardcoded service_mpvslhm) |
| `REACT_APP_EMAILJS_TEMPLATE_ID` | `ContactSection.js` | ⚠️ Parcial (hardcoded template_EmailJS) |
| `REACT_APP_EMAILJS_USER_ID` | `ContactSection.js` | ⚠️ Parcial (hardcoded Wok3mV-Bl-3UNJa9I) |
| `REACT_APP_CALENDLY_URL` | Landing pages | ⚠️ Hardcoded como https://calendly.com/pyscripttech |

---

## 10. Dados Sensíveis e Credenciais

### 10.1 Expostos no Código

1. **EmailJS User ID:** `Wok3mV-Bl-3UNJa9I` em `ContactSection.js`
2. **EmailJS Service ID:** `service_mpvslhm` em `ContactSection.js`
3. **EmailJS Template ID:** `template_EmailJS` em `ContactSection.js`
4. **Número WhatsApp:** `5521980292791` em `WhatsAppButton.js` e landing pages

### 10.2 Recomendações

- Mover EmailJS credentials para variáveis de ambiente
- Mover WhatsApp number para configuração centralizada
- Nunca commitar chaves do Supabase no código
- Usar `.env.example` para documentar variáveis necessárias

---

## 11. Recomendações Prioritárias

1. **Migrar CRM para Supabase** — imprescindível para operação comercial real.
2. **Implementar autenticação real** — proteger rotas do dashboard.
3. **Criar módulo de propostas** — controle comercial completo.
4. **Criar módulo de prospecção** — operacionalizar a lista de 50 empresas.
5. **Criar dashboard de métricas** — visibilidade do funil.
6. **Substituir IDs de analytics** — ativar rastreamento real.
7. **Mover credenciais para variáveis de ambiente** — segurança.
8. **Criar notificações internas** — Slack/email quando novo lead entrar.

---

## 12. Conclusão

A PyScript.Tech tem uma base visual e estratégica sólida, mas ainda não é uma operação comercial funcional. A migração para Supabase e a implementação dos módulos de propostas, prospecção e métricas são os passos críticos para tornar o CRM utilizável no dia a dia.
