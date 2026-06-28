#!/bin/bash
# Configura secrets do Supabase para integração PyScript ↔ ProFlow
# NÃO adicione valores reais neste arquivo. Preencha via argumentos ou variáveis de ambiente.

set -e

PROJECT_REF="${1:-}"
PROFLOW_API_URL="${PROFLOW_API_URL:-https://api.proflow.pro}"
PROFLOW_PYSCRIPT_ENDPOINT="${PROFLOW_PYSCRIPT_ENDPOINT:-/api/v1/projects/pyscript/}"
PROFLOW_PORTAL_URL="${PROFLOW_PORTAL_URL:-https://proflow.pro}"
PYSCRIPT_ALLOWED_ADMIN_EMAILS="${PYSCRIPT_ALLOWED_ADMIN_EMAILS:-leonardorfragoso@gmail.com}"

if [ -z "$PROJECT_REF" ]; then
  echo "Uso: $0 <project-ref>"
  echo "Exemplo: $0 abcdefghijklmnopqrst"
  echo ""
  echo "Variáveis de ambiente necessárias:"
  echo "  PROFLOW_SERVICE_TOKEN"
  echo "  PROFLOW_REFRESH_TOKEN (opcional)"
  echo "  PYSCRIPT_ALLOWED_ADMIN_EMAILS"
  exit 1
fi

if [ -z "$PROFLOW_SERVICE_TOKEN" ]; then
  echo "ERRO: PROFLOW_SERVICE_TOKEN não definido"
  exit 1
fi

echo "Configurando secrets para o projeto $PROJECT_REF..."

npx supabase secrets set --project-ref "$PROJECT_REF" \
  PROFLOW_API_URL="$PROFLOW_API_URL" \
  PROFLOW_PYSCRIPT_ENDPOINT="$PROFLOW_PYSCRIPT_ENDPOINT" \
  PROFLOW_SERVICE_TOKEN="$PROFLOW_SERVICE_TOKEN" \
  PROFLOW_PORTAL_URL="$PROFLOW_PORTAL_URL" \
  PYSCRIPT_ALLOWED_ADMIN_EMAILS="$PYSCRIPT_ALLOWED_ADMIN_EMAILS"

if [ -n "$PROFLOW_REFRESH_TOKEN" ]; then
  npx supabase secrets set --project-ref "$PROJECT_REF" \
    PROFLOW_REFRESH_TOKEN="$PROFLOW_REFRESH_TOKEN"
fi

echo "Secrets configurados com sucesso."
