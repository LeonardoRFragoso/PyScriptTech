# Relatório de Validação de Analytics - PyScript.tech

## Status Geral

| Ferramenta | Status | Configuração | Risco |
|------------|--------|--------------|-------|
| Google Analytics 4 | ⚠️ Parcial | `REACT_APP_GA4_MEASUREMENT_ID` no `.env.example` mas hardcoded placeholders em `public/index.html` | Alto - medição pode não funcionar em produção |
| Google Tag Manager | ⚠️ Parcial | Script placeholder em `public/index.html` | Alto - container não carrega sem ID real |
| Microsoft Clarity | ⚠️ Parcial | Script placeholder em `public/index.html` | Alto - sem project ID real |
| Eventos de Conversão | ✅ Funcionando | `services/analytics.js` loga pageviews e eventos | Médio - precisa ser validado no painel real |

## Onde estão os placeholders

- `public/index.html:33-69` - scripts de GA4, GTM e Clarity com IDs placeholder (`G-XXXXXXXX`, `GTM-XXXXXXX`, `clarity_project_id`)

## Eventos de conversão mapeados

O arquivo `src/services/analytics.js` dispara os eventos abaixo:

- `page_view` - ao navegar entre rotas via `AnalyticsTracker` em `App.js`
- `contact_form_submit` - envio do formulário de contato da home
- `submit_diagnostico` - envio do diagnóstico gratuito
- `download_roi_report` - download do relatório da calculadora ROI
- `download_lead_magnet` - download do guia de automação
- `whatsapp_click` - clique no botão flutuante WhatsApp
- `service_click` - clique em serviços
- `project_click` - clique em projetos

## Recomendações para deixar analytics 100% funcional

1. Substituir em `public/index.html` os placeholders por IDs reais via variáveis de ambiente. React não injeta env em arquivos estáticos, então é necessário usar um script inline que lê do `.env` no build (com `react-app-rewired` ou substituir manualmente no CI/CD) ou fazer injeção via tag `<script>` dinâmica em `index.html`.
2. Configurar GA4 Measurement ID, GTM Container ID e Clarity Project ID.
3. Criar no GA4 os eventos de conversão personalizados: `submit_diagnostico`, `download_roi_report`, `download_lead_magnet`, `contact_form_submit`.
4. Criar no GTM tags e triggers para os eventos de lead.
5. Validar com Tag Assistant e DebugView do GA4.

## Próximos passos

- Atualizar `public/index.html` com IDs reais
- Adicionar `dataLayer` push antes de enviar eventos
- Validar eventos via Google Tag Assistant e Microsoft Clarity dashboard
