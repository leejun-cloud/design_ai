#!/bin/bash
set -e

cd "$(dirname "$0")"
PORT=$(python3 - <<'PY'
import socket
s = socket.socket()
s.bind(("127.0.0.1", 0))
print(s.getsockname()[1])
s.close()
PY
)
URL="http://127.0.0.1:${PORT}/index.html"
python3 -m http.server "$PORT" --bind 127.0.0.1 &
SERVER_PID=$!
trap 'kill "$SERVER_PID" 2>/dev/null || true' EXIT INT TERM
sleep 1
if command -v open >/dev/null 2>&1; then
  open "$URL"
else
  printf '브라우저에서 열어 주세요: %s\n' "$URL"
fi
printf '로컬 실행 중입니다. 종료하려면 이 창에서 Ctrl+C를 누르세요.\n'
wait "$SERVER_PID"
