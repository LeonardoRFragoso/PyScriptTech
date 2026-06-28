# Integração Real PyScript.Tech ↔ ProFlow.pro

## Objetivo

Permitir que o CRM da PyScript transforme uma proposta aceita em um projeto real na ProFlow.pro de forma segura, sem expor tokens no frontend.

## Arquitetura

```
[Frontend React PyScript]
        ↓
[Supabase Edge Function]
        ↓
[ProFlow.pro API]
        ↓
[Projeto criado + convite enviado]
        ↓
[Retorno salvo no CRM]
```

## Por que Edge Function?

- O JWT de gestor da ProFlow fica apenas no servidor.
- O frontend React nunca vê o token.
- Permite validação de negócio, permissões e logs.
- Integração nativa com Supabase Auth.

## Arquivos criados/alterados

### Edge Functions
- `supabase/functions/proflow-create-project/index.ts`
- `supabase/functions/proflow-resend-invite/index.ts`
- `supabase/functions/_shared/cors.ts`
- `supabase/functions/import_map.json`
- `supabase/functions/deno.json`
- `supabase/functions/types/deno.d.ts`

### Banco de dados
- `database/supabase_schema.sql` — schema completo com integração ProFlow
- `database/proflow_integration_schema.sql` — migração da integração

### Frontend
- `src/services/proflowIntegration.js` — chama Edge Functions
- `src/pages/dashboard/Proposals/ProFlowModal.jsx` — modal de integração
- `src/pages/dashboard/Proposals/ProFlowModal.module.css` — estilos
- `src/pages/dashboard/Proposals/ProposalsList.jsx` — botão e ação
- `src/services/database.js` — função `generateProFlowPayload` (existente)

### Configuração
- `.env.example` — variáveis de ambiente

## Fluxo de uso

1. Criar lead e proposta no CRM.
2. Marcar proposta como `accepted`.
3. Clicar em "Criar projeto na ProFlow".
4. Visualizar preview, JSON, Markdown ou checklist.
5. Clicar em "Criar projeto real na ProFlow".
6. A Edge Function valida, chama a ProFlow e salva o retorno.
7. O gestor vê o link do portal e pode copiar/abrir.
8. Se necessário, reenviar convite.

## Segurança

- Nenhum JWT da ProFlow no frontend.
- Apenas usuários autenticados podem chamar a Edge Function.
- Permissão por email autorizado ou role (`admin`, `owner`, `sales_manager`, `project_manager`).
- Logs não salvam Authorization header, JWT, refresh token ou senha.
- Projetos criados como privados na ProFlow.

## Próximos passos

1. Configurar Supabase CLI e fazer deploy das Edge Functions.
2. Executar migração SQL no Supabase.
3. Configurar secrets de ambiente.
4. Testar com uma proposta real.
5. Ajustar permissões conforme crescimento do time.
