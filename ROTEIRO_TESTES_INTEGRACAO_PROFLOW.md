# Roteiro de Testes - Integração PyScript ↔ ProFlow

## Testes automatizados

Execute:

```bash
npm test -- --watchAll=false src/services/database.proflow.test.js
```

## Testes manuais no frontend

### Pré-requisitos

- Supabase configurado.
- Edge Functions deployadas.
- Secrets configurados.
- Migração SQL executada.

### Fluxo 1: Criar projeto com sucesso

1. Acesse o CRM em `/dashboard/leads`.
2. Crie um lead com:
   - Nome: `Cliente Teste`
   - Email: `teste@empresa.com`
   - Empresa: `Empresa Teste`
   - Segmento: `Tecnologia`
3. Acesse `/dashboard/proposals`.
4. Crie uma proposta para o lead com:
   - Título: `Automação Teste`
   - Escopo: `Automatizar processo X`
   - Valor: `15000`
   - Prazo: data futura
   - Itens: 2 ou 3 milestones
5. Salve a proposta.
6. Edite a proposta e marque como `Aceita`.
7. Na lista, clique no botão verde de ProFlow.
8. Confirme o preview.
9. Clique em "Criar projeto real na ProFlow".
10. Aguarde sucesso.
11. Verifique que `proflow_project_id`, `proflow_portal_url` e `proflow_client_status` foram salvos.
12. Clique em "Abrir portal".
13. Verifique log na tabela `proflow_integration_logs`.

### Fluxo 2: Bloqueio de duplicidade

1. Com a proposta já integrada, clique no botão ProFlow novamente.
2. Verifique que o botão de criação está desabilitado e a mensagem "Projeto já foi criado na ProFlow" aparece.
3. Confirme que não há opção de criar novamente.

### Fluxo 3: Proposta não aceita

1. Crie uma proposta com status `Enviada`.
2. Clique no botão ProFlow.
3. Verifique que o botão de criação está desabilitado e a mensagem indica que a proposta deve estar aceita.

### Fluxo 4: Lead sem email

1. Crie uma proposta aceita para um lead sem email.
2. Tente criar projeto.
3. Verifique erro de validação.

### Fluxo 5: Reenvio de convite

1. Abra uma proposta integrada com `proflow_client_status='invited'`.
2. Clique em "Reenviar convite".
3. Verifique mensagem de sucesso.
4. Verifique log na tabela `proflow_integration_logs`.

### Fluxo 6: Erro da API ProFlow

1. Simule um erro (ex: token inválido no secret).
2. Tente criar projeto.
3. Verifique que o erro é exibido de forma amigável.
4. Verifique que `proflow_sync_status` ficou `failed`.
5. Verifique que `proflow_sync_error` foi salvo.
6. Verifique que log não contém Authorization header.

### Fluxo 7: Fallback manual

1. Desconecte o Supabase (simule fallback).
2. Verifique que o modal ainda exibe JSON, Markdown e checklist.
3. Verifique que o gestor pode copiar manualmente.

## Testes de segurança

1. Tente chamar a Edge Function sem autenticação.
2. Tente chamar a Edge Function com usuário autenticado mas não autorizado.
3. Verifique que ambas retornam 401/403.
4. Verifique que a resposta não contém tokens.
5. Verifique que logs não contêm tokens.
