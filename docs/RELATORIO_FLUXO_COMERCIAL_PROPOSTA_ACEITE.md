# Relatório — Fluxo Comercial de Proposta e Aceite Digital

Data: 2026-06-27

## 1. O que foi implementado

### Backend (Supabase Edge Functions)

- `proposal-generate-public-link` — gera token público, salva hash SHA-256, atualiza proposta para `sent`, registra atividade. Requer autenticação e permissão de gestor.
- `proposal-public-view` — retorna dados seguros da proposta para o cliente. Recebe token via query string. Marca visualização e registra atividade.
- `proposal-public-accept` — valida token, valida email, aceita proposta, salva auditoria (IP, user-agent, nome, email), atualiza lead para `fechado`, registra atividade.

### Banco de dados

Migration `20260627150000_proposal_public_acceptance.sql` adiciona:

- `public_token_hash` (único quando preenchido)
- `public_access_enabled`
- `public_sent_at`, `public_viewed_at`
- `accepted_by_name`, `accepted_by_email`, `accepted_ip`, `accepted_user_agent`
- `acceptance_status`
- `acceptance_terms_version`

### Frontend

- `src/pages/PublicProposal/PublicProposalPage.jsx` — página pública `/proposta/:token` com visualização e aceite digital.
- `src/pages/dashboard/Proposals/SendProposalModal.jsx` — modal de envio com geração de link, copiar link, abrir email, abrir WhatsApp, copiar texto.
- `src/utils/proposalMessages.js` — templates de email, WhatsApp e texto.
- `src/services/proposalPublic.js` — funções de integração com as Edge Functions.
- `src/App.js` — nova rota pública `/proposta/:token`.
- `src/pages/dashboard/Proposals/ProposalsList.jsx` — botão "Enviar proposta" para propostas `draft`/`sent`.

## 2. Como gerar link de proposta

1. No dashboard, acesse **Propostas**.
2. Crie ou edite uma proposta em rascunho.
3. Clique no botão de envio (ícone de documento azul).
4. No modal, clique em **Gerar link público**.
5. Copie o link, abra o email ou WhatsApp com o texto pronto.

O link terá o formato:

```text
https://pyscript.tech/proposta/<token>
```

O domínio pode ser configurado via `REACT_APP_PUBLIC_SITE_URL` (padrão `https://pyscript.tech`).

## 3. Como cliente aceita

1. Cliente acessa o link público.
2. Visualiza escopo, itens, valor, prazo e dados da PyScriptTech.
3. Preenche nome e email.
4. Aceita os termos e clica em **Aceitar proposta**.
5. Recebe confirmação de aceite.

## 4. Como o CRM muda status

### Ao enviar proposta

- Se status era `draft`, muda para `sent`.
- `acceptance_status` vira `sent`.
- `public_sent_at` é preenchido.
- Atividade registrada: "Proposta enviada ao cliente via link público."

### Ao visualizar proposta

- `public_viewed_at` é preenchido (se ainda vazio).
- `acceptance_status` vira `viewed` (se estava `sent`).
- Atividade registrada: "Cliente visualizou a proposta via link público."

### Ao aceitar proposta

- `status` vira `accepted`.
- `acceptance_status` vira `accepted`.
- `accepted_at` é preenchido.
- `accepted_by_name`, `accepted_by_email`, `accepted_ip`, `accepted_user_agent` salvos.
- Lead atualizado para `stage = 'fechado'`.
- Atividade registrada: "Cliente aceitou a proposta digitalmente."

## 5. Como isso libera ProFlow

Após o aceite, a proposta tem `status = 'accepted'`. Na lista de propostas, o botão **ProFlow** (verde) fica disponível. O gestor clica e cria o projeto na ProFlow manualmente.

## 6. Limitações

- Não envia email real automaticamente. O gestor precisa usar o botão de email/WhatsApp ou copiar texto.
- Não há notificações automáticas ao gestor quando o cliente aceita.
- Não há expiração automática do token público. O token pode ser revogado desativando `public_access_enabled` no banco.
- A validação de email do cliente aceitante compara com o email do lead. Se o lead não tiver email, o aceite é liberado.

## 7. Riscos

- Token público exposto no link. Mitigado por:
  - hash SHA-256 no banco;
  - token longo e aleatório;
  - `public_access_enabled` pode revogar acesso;
  - página pública não expõe IDs internos nem dados de outros clientes.
- RLS aberto para `authenticated`. Recomenda-se endurecer no futuro.

## 8. Próximos passos

- Configurar `REACT_APP_PUBLIC_SITE_URL` no ambiente de produção.
- Executar E2E real com credenciais disponíveis.
- Considerar expiração do token e reenvio.
- Implementar notificação ao gestor após aceite.
- Adicionar provider de email para envio automático.

## 9. Testes executados

- `npm test -- --watchAll=false` — 9 tests passaram, 2 suites.
- `npm run build` — sucesso.
- `deno check` nas 3 novas Edge Functions — sucesso.
- Auditoria de secrets — nenhum token exposto no frontend.

## 10. Build executado

Sim. A pasta `build/` foi gerada com sucesso.

## 11. E2E comercial

Não executado nesta sessão por falta de acesso às credenciais de teste (anon key/service role key). O fluxo deve ser testado assim que as credenciais estiverem disponíveis:

1. Criar lead e proposta.
2. Gerar link público.
3. Acessar link em aba anônima.
4. Visualizar e aceitar.
5. Confirmar status `accepted`, lead `fechado`, atividade registrada.
6. Confirmar botão ProFlow disponível.

## 12. Arquivos criados/alterados

- `supabase/migrations/20260627150000_proposal_public_acceptance.sql`
- `supabase/functions/proposal-generate-public-link/index.ts`
- `supabase/functions/proposal-public-view/index.ts`
- `supabase/functions/proposal-public-accept/index.ts`
- `supabase/functions/_shared/cors.ts`
- `src/pages/PublicProposal/PublicProposalPage.jsx`
- `src/pages/PublicProposal/PublicProposalPage.module.css`
- `src/pages/dashboard/Proposals/SendProposalModal.jsx`
- `src/pages/dashboard/Proposals/SendProposalModal.module.css`
- `src/pages/dashboard/Proposals/ProposalsList.jsx`
- `src/pages/dashboard/Proposals/ProposalsList.module.css`
- `src/services/proposalPublic.js`
- `src/utils/proposalMessages.js`
- `src/App.js`
- `AUDITORIA_FLUXO_COMERCIAL_PYSCRIPT.md`
