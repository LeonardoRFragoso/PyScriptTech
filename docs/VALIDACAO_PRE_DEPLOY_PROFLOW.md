# Validação Pré-Deploy - Integração PyScript ↔ ProFlow

## Data

Junho de 2026

## Arquivos verificados

### Edge Functions

- ✅ `supabase/functions/proflow-create-project/index.ts` existe
- ✅ `supabase/functions/proflow-resend-invite/index.ts` existe
- ✅ `supabase/functions/_shared/cors.ts` existe
- ✅ `supabase/functions/import_map.json` existe
- ✅ `supabase/functions/deno.json` existe
- ✅ `supabase/functions/types/deno.d.ts` existe

### Banco de dados

- ✅ `database/supabase_schema.sql` contém campos ProFlow e tabela de logs
- ✅ `database/proflow_integration_schema.sql` contém migração de integração
- ✅ Campos ProFlow documentados em `proposals`
- ✅ Tabela `proflow_integration_logs` documentada

### Frontend

- ✅ `src/services/proflowIntegration.js` chama Edge Functions via `supabase.functions.invoke`
- ✅ `src/pages/dashboard/Proposals/ProFlowModal.jsx` exibe preview, JSON, Markdown, checklist
- ✅ Botão "Criar projeto real na ProFlow" existe
- ✅ Estados de sucesso, erro e já integrado existem
- ✅ Fallback manual mantido
- ✅ Botão de reenvio de convite existe
- ✅ Bug `proposal.title` vs `proposalTitle` corrigido

### Segurança

- ✅ Nenhum `PROFLOW_SERVICE_TOKEN` encontrado no repositório
- ✅ Nenhum `PROFLOW_REFRESH_TOKEN` encontrado no repositório
- ✅ Nenhum `Authorization: Bearer` hardcoded no frontend
- ✅ Nenhum token real encontrado em arquivos versionados

## Configuração do Supabase CLI

- ❌ `supabase/config.toml` ainda não existe
- ❌ `supabase/migrations/` ainda não existe
- ⚠️ Necessário executar `supabase init` e criar migration real

## Observações

- O projeto já utiliza `supabase/functions/` para as Edge Functions.
- A migração SQL está documentada em `database/` mas ainda não foi convertida para migration do Supabase CLI.
- Não há credenciais de Supabase/ProFlow no ambiente para executar deploy real.

## Pendências antes do deploy

1. Inicializar Supabase CLI (`supabase init`).
2. Criar migration real em `supabase/migrations/`.
3. Configurar secrets no Supabase Dashboard ou via CLI.
4. Deployar Edge Functions.
5. Executar teste E2E com credenciais reais.

## Conclusão

A implementação está completa e revisada. A integração real depende agora de configuração de ambiente e credenciais, que não estão disponíveis neste contexto.
