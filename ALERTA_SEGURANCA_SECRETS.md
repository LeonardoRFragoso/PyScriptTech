# Alerta de Segurança - Secrets e Credenciais

## Data

Junho de 2026

## Riscos identificados

### 1. `.env` na PyScriptTech está sem proteção de `.gitignore`

**Onde:** `/home/leonardo/dev/PyScriptTech/.env`

**Status:** `.gitignore` foi removido temporariamente. O arquivo `.env` está **untracked** (`??`), o que evita commit imediato, mas qualquer `git add .` accidental pode colocá-lo na stage area.

**Risco:** Credenciais do Supabase e ProFlow podem ser commitadas no repositório.

**Ação recomendada:**
- Restaurar `.gitignore` imediatamente com as entradas:
  ```
  .env
  .env.local
  .env.*.local
  ```
- Nunca executar `git add .` enquanto `.gitignore` estiver ausente.

---

### 2. `SUPABASE_SERVICE_ROLE_KEY` exposta em histórico de conversa

**Onde:** histórico de mensagens do assistente/usuário.

**Status:** O valor real da service role key foi compartilhado durante a execução do deploy.

**Risco:** Qualquer pessoa com acesso ao histórico pode usar a chave para acessar o banco de dados como service role.

**Ação recomendada:**
- Rotacionar a chave em Supabase Dashboard → Project Settings → API → Secret keys.
- Atualizar `.env` local com a nova chave se necessário.

---

### 3. `PROFLOW_SERVICE_TOKEN` incorreto no `.env` da PyScriptTech

**Onde:** `/home/leonardo/dev/PyScriptTech/.env`

**Status:** O valor anterior era idêntico ao `SUPABASE_SERVICE_ROLE_KEY`, ou seja, não é um JWT da ProFlow. O arquivo agora contém placeholder.

**Risco:** Se a chave errada for usada, a ProFlow rejeitará a autenticação e a integração não funcionará.

**Ação recomendada:**
- Gerar JWT de gestor da ProFlow via `POST /api/v1/token/` com email/senha do gestor.
- Atualizar `PROFLOW_SERVICE_TOKEN` e `PROFLOW_REFRESH_TOKEN` no `.env` e nos secrets do Supabase.

---

### 4. Tokens do MercadoPago hardcoded no repositório ProFlow

**Onde:** `/home/leonardo/dev/ProFlow/backend/config/settings/dev.py`

**Status:** Foram encontrados valores padrão (`default=`) para `MP_ACCESS_TOKEN` e `MP_PUBLIC_KEY` em arquivo de configuração versionado.

**Risco:** Tokens de produção/teste expostos em código fonte. Mesmo em ambiente de dev, é prática insegura e pode vazar em logs ou forks.

**Ação recomendada:**
- Remover os valores default e deixar apenas `os.environ.get('MP_ACCESS_TOKEN')` e `os.environ.get('MP_PUBLIC_KEY')`.
- Rotacionar os tokens no MercadoPago se forem de produção.
- Adicionar `.env` e `.env.local` ao `.gitignore` do ProFlow se ainda não estiverem.

---

### 5. `.env` do ProFlow não encontrado

**Onde:** `/home/leonardo/dev/ProFlow/`

**Status:** Apenas arquivos `.env.example` foram encontrados. Não há `.env` real no repositório.

**Risco:** Baixo. Arquivos de exemplo são seguros, desde que não contenham valores reais.

**Ação recomendada:**
- Manter `.env` fora do versionamento.
- Verificar que os `.env.example` não contêm valores reais de tokens.

---

## Resumo de risco

| Risco | Gravidade | Ação imediata |
|-------|-----------|---------------|
| `.env` PyScript sem `.gitignore` | **Alta** | Restaurar `.gitignore` |
| `SUPABASE_SERVICE_ROLE_KEY` exposta | **Alta** | Rotacionar no Supabase |
| `PROFLOW_SERVICE_TOKEN` incorreto | **Média** | Gerar JWT correto da ProFlow |
| Tokens MercadoPago hardcoded | **Média** | Remover defaults e rotacionar |

## Nota

Nenhum valor de token ou secret foi incluído neste documento.
