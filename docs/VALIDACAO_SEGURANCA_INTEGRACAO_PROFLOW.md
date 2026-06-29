# Validação de Segurança - PyScript ↔ ProFlow

## Scans realizados

Comandos executados:

```bash
grep -R "PROFLOW_SERVICE_TOKEN" --include="*.js" --include="*.jsx" --include="*.ts" --include="*.tsx" .
grep -R "PROFLOW_REFRESH_TOKEN" --include="*.js" --include="*.jsx" --include="*.ts" --include="*.tsx" .
grep -R "Authorization: Bearer" --include="*.js" --include="*.jsx" --include="*.ts" --include="*.tsx" .
grep -R "refresh_token" --include="*.js" --include="*.jsx" --include="*.ts" --include="*.tsx" .
```

Resultado: **nenhuma ocorrência** em arquivos fontes do frontend ou documentação versionada.

## Checklist

### Tokens

- [x] Nenhum JWT da ProFlow no frontend React.
- [x] Nenhum `PROFLOW_SERVICE_TOKEN` em arquivos versionados.
- [x] Nenhum `PROFLOW_REFRESH_TOKEN` em arquivos versionados.
- [x] Tokens configurados apenas como secrets do Supabase.

### Edge Functions

- [x] Edge Function valida `Authorization` header.
- [x] Edge Function rejeita requisição sem token (401).
- [x] Edge Function verifica permissão do usuário (403).
- [x] Edge Function não retorna token na resposta.
- [x] Edge Function usa service role key apenas no servidor.

### Logs

- [x] Logs não salvam Authorization header.
- [x] Logs não salvam JWT.
- [x] Logs não salvam refresh token.
- [x] Logs não salvam senha.
- [x] Logs não salvam token de ativação.
- [x] Payloads salvos são sanitizados (sem tokens).

### Validações de negócio

- [x] Proposta deve estar `accepted` para criar projeto.
- [x] Proposta já integrada não pode ser duplicada.
- [x] Lead deve ter email válido.
- [x] Lead deve ter nome.
- [x] Proposta deve ter título, escopo/valor e prazo.

### Frontend

- [x] Apenas `REACT_APP_PROFLOW_PORTAL_URL` é pública.
- [x] Nenhuma secret no `.env.example` com valor real.
- [x] `proflowIntegration.js` chama Edge Function via Supabase client (não diretamente a ProFlow).

## Pontos de atenção

- O RLS do Supabase permite qualquer usuário autenticado manipular registros. Isso é aceitável para time pequeno, mas deve ser restrito conforme crescimento.
- Recomenda-se revisar periodicamente se nenhum secret foi commitado acidentalmente.

## Conclusão

A integração segue o princípio de segurança: tokens ficam apenas no backend serverless (Supabase Edge Function), e o frontend nunca os acessa.
