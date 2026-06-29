# Checklist de Limpeza — Dados de Teste PyScript ↔ ProFlow

Este documento lista os passos para remover todos os dados de teste gerados durante o E2E de integração.

> **Atenção:** execute a limpeza manualmente e de forma controlada. Não apague dados de produção reais.

---

## 1. PyScriptTech / Supabase

### 1.1 Remover logs de integração de teste

No SQL Editor do Supabase (`pgnhrkulekwoezerjlty`), execute:

```sql
DELETE FROM proflow_integration_logs
WHERE proposal_id IN (
  'b01b7d88-30c3-4b0c-bdc3-492ce82e2aa5',
  'd6418618-cccb-46df-88ab-9b18f0d50037'
);
```

Verificação:

```sql
SELECT COUNT(*) FROM proflow_integration_logs
WHERE proposal_id IN (
  'b01b7d88-30c3-4b0c-bdc3-492ce82e2aa5',
  'd6418618-cccb-46df-88ab-9b18f0d50037'
);
```

Deve retornar `0`.

---

### 1.2 Remover propostas de teste

```sql
DELETE FROM proposals
WHERE id IN (
  'b01b7d88-30c3-4b0c-bdc3-492ce82e2aa5',
  'd6418618-cccb-46df-88ab-9b18f0d50037'
);
```

Verificação:

```sql
SELECT COUNT(*) FROM proposals
WHERE id IN (
  'b01b7d88-30c3-4b0c-bdc3-492ce82e2aa5',
  'd6418618-cccb-46df-88ab-9b18f0d50037'
);
```

Deve retornar `0`.

---

### 1.3 Remover leads de teste

```sql
DELETE FROM leads
WHERE id IN (
  '35b875d8-d333-42f7-a14b-78783683adeb',
  '5bbd9744-8d9f-4427-bf12-a98dc4ca07dc'
);
```

Verificação:

```sql
SELECT COUNT(*) FROM leads
WHERE id IN (
  '35b875d8-d333-42f7-a14b-78783683adeb',
  '5bbd9744-8d9f-4427-bf12-a98dc4ca07dc'
);
```

Deve retornar `0`.

---

### 1.4 Remover usuários de teste do Supabase Auth

Você pode executar pelo Dashboard do Supabase:

1. Acesse **Authentication > Users**.
2. Filtre por:
   - `e2e.proflow+admin@pyscript.tech`
   - `e2e.proflow+client@pyscript.tech`
3. Clique em cada usuário e escolha **Delete user**.

Ou execute via SQL:

```sql
DELETE FROM auth.users
WHERE email IN (
  'e2e.proflow+admin@pyscript.tech',
  'e2e.proflow+client@pyscript.tech'
);
```

> Cuidado: a tabela `auth.users` contém todos os usuários do sistema. Confirme os e-mails antes de executar.

---

## 2. ProFlow.pro

### 2.1 Remover projetos de teste

Acesse o painel administrativo da ProFlow ou utilize a API de gestão para remover:

- Projeto `14`
- Projeto `15`

### 2.2 Remover contratos de teste

- Contrato `4` (vinculado ao projeto `14`)
- Contrato `5` (vinculado ao projeto `15`)

### 2.3 Remover milestones de teste

- Milestones `5` e `6` (vinculadas ao projeto `14`)
- Milestones `6` e `7` (vinculadas ao projeto `15`)

### 2.4 Remover clientes e convites de teste

- Cliente `cliente.e2e.pyscript+proflow@pyscript.tech`
- Cliente `cliente.e2e2.pyscript+proflow@pyscript.tech`
- Convites de acesso enviados para esses clientes.

---

## 3. Checklist final

- [ ] Logs de integração removidos no Supabase.
- [ ] Propostas de teste removidas.
- [ ] Leads de teste removidos.
- [ ] Usuários de teste removidos do Supabase Auth.
- [ ] Projetos `14` e `15` removidos na ProFlow.
- [ ] Contratos `4` e `5` removidos.
- [ ] Milestones `5`, `6`, `7` removidas.
- [ ] Clientes e convites de teste removidos na ProFlow.
- [ ] Nenhum dado de teste restante identificado.

---

## 4. Dados de teste para referência

| Sistema | Entidade | ID |
|---------|----------|----|
| Supabase | Proposta E2E #1 | `b01b7d88-30c3-4b0c-bdc3-492ce82e2aa5` |
| Supabase | Proposta E2E #2 | `d6418618-cccb-46df-88ab-9b18f0d50037` |
| Supabase | Lead E2E #1 | `35b875d8-d333-42f7-a14b-78783683adeb` |
| Supabase | Lead E2E #2 | `5bbd9744-8d9f-4427-bf12-a98dc4ca07dc` |
| Supabase | Admin de teste | `e2e.proflow+admin@pyscript.tech` |
| Supabase | Cliente sem permissão | `e2e.proflow+client@pyscript.tech` |
| ProFlow | Projeto E2E #1 | `14` |
| ProFlow | Projeto E2E #2 | `15` |
| ProFlow | Contrato E2E #1 | `4` |
| ProFlow | Contrato E2E #2 | `5` |
| ProFlow | Milestones E2E #1 | `5`, `6` |
| ProFlow | Milestones E2E #2 | `6`, `7` |

---

## 5. Nota de segurança

- Nunca execute este checklist em produção sem confirmar que os IDs pertencem a dados de teste.
- Sempre faça backup antes de remoções em massa.
- Não armazene tokens ou senhas neste documento.
