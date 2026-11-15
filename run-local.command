#!/bin/bash
set -e

cd "$(dirname "$0")"

if ! command -v node >/dev/null 2>&1; then
  echo "Node.js가 필요합니다 (https://nodejs.org)"; read -r; exit 1
fi
if ! command -v claude >/dev/null 2>&1; then
  echo "⚠️ Claude CLI가 없어 AI 기능 없이 실행됩니다 (템플릿 방식만 작동)."
fi

PORT=8787
URL="http://127.0.0.1:${PORT}"
node server.js "$PORT" &
SERVER_PID=$!
trap 'kill "$SERVER_PID" 2>/dev/null || true' EXIT INT TERM
sleep 1
if command -v open >/dev/null 2>&1; then
  open "$URL"
else
  printf '브라우저에서 열어 주세요: %s\n' "$URL"
fi
printf 'AI 엔진: 로컬 Claude CLI (API 키 불필요). 종료하려면 Ctrl+C.\n'
wait "$SERVER_PID"
