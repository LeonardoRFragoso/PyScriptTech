# Checklist Pós-Deploy - PyScript.tech CRM

## Supabase

- [ ] Criar projeto no Supabase
- [ ] Copiar URL e anon key para variáveis de ambiente `REACT_APP_SUPABASE_URL` e `REACT_APP_SUPABASE_ANON_KEY`
- [ ] Executar `database/supabase_schema.sql` no SQL Editor
- [ ] Habilitar provedores de autenticação (Email/Password) em Auth > Providers
- [ ] Criar primeiro usuário admin em Auth > Users
- [ ] Configurar Site URL e Redirect URLs em Auth > URL Configuration
- [ ] Verificar RLS policies estão ativas para `leads`, `lead_activities`, `proposals` e `prospect_companies`

## Analytics

- [ ] Substituir placeholders GA4/GTM/Clarity em `public/index.html` por IDs reais
- [ ] Configurar eventos de conversão no GA4
- [ ] Validar disparo de eventos via Tag Assistant
- [ ] Verificar Microsoft Clarity dashboard

## Domínio e Build

- [ ] Gerar build de produção: `npm run build`
- [ ] Fazer deploy do build (Netlify, Vercel, etc)
- [ ] Configurar variáveis de ambiente no provedor de deploy
- [ ] Testar login no `/login`
- [ ] Testar cadastro no `/register`
- [ ] Testar recuperação de senha no `/forgot-password`

## CRM e Módulos

- [ ] Testar criação de lead em `/dashboard/leads/new`
- [ ] Testar edição e movimentação de etapa do lead
- [ ] Testar adição de atividade no lead
- [ ] Testar criação de proposta em `/dashboard/proposals/new`
- [ ] Testar copiar texto da proposta
- [ ] Testar listagem de prospecção em `/dashboard/prospects`
- [ ] Testar converter prospect em lead
- [ ] Testar dashboard de métricas em `/dashboard/metrics`

## Formulários Públicos

- [ ] Testar envio de Diagnóstico Gratuito salva lead no Supabase
- [ ] Testar Calculadora ROI salva lead no Supabase
- [ ] Testar Lead Magnet salva lead no Supabase
- [ ] Testar formulário de contato da home salva lead no Supabase

## Segurança

- [ ] Confirmar que nenhuma chave privada está hardcoded no código
- [ ] Confirmar que `.env` está no `.gitignore`
- [ ] Verificar que anon key do Supabase é pública (safe) e não service_role
- [ ] Habilitar HTTPS no domínio

## Monitoramento

- [ ] Configurar alertas de uptime
- [ ] Configurar alertas de autenticação suspeita no Supabase
- [ ] Revisar logs de erro do frontend e do Supabase
