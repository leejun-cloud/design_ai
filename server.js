/* server.js — 로컬 실행용 서버
 * 정적 파일 서빙 + /api/ai를 로컬 Claude CLI(claude -p)로 처리.
 * API 키 불필요 — Claude Code 구독 로그인을 그대로 사용한다.
 * 실행: node server.js [port]
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');
const { spawn } = require('child_process');

const ROOT = __dirname;
const PORT = Number(process.argv[2]) || 8787;
const { analyzeSystem, composeSystem, splitTokens, cleanHtml, composeUser } = require('./ai-prompts.js');

const MIME = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8', '.json': 'application/json',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml', '.md': 'text/markdown; charset=utf-8', '.txt': 'text/plain; charset=utf-8',
};

/* Claude CLI 실행: 프롬프트는 stdin, 결과는 stdout 텍스트 */
function runClaude(systemPrompt, userPrompt, { allowRead = false } = {}) {
  return new Promise((resolve, reject) => {
    const args = ['-p', '--output-format', 'text', '--model', 'sonnet',
      '--append-system-prompt', systemPrompt];
    if (allowRead) args.push('--allowedTools', 'Read');
    const child = spawn('claude', args, {
      cwd: os.tmpdir(),               // 프로젝트 CLAUDE.md 등 불필요한 컨텍스트 차단
      env: process.env,
      stdio: ['pipe', 'pipe', 'pipe'],
    });
    let out = '', err = '';
    const killer = setTimeout(() => { child.kill('SIGKILL'); reject(new Error('Claude CLI 응답 시간 초과(10분)')); }, 600000);
    child.stdout.on('data', d => { out += d; });
    child.stderr.on('data', d => { err += d; });
    child.on('error', e => { clearTimeout(killer); reject(new Error('claude CLI를 실행할 수 없습니다: ' + e.message)); });
    child.on('close', code => {
      clearTimeout(killer);
      if (code !== 0 && !out.trim()) return reject(new Error('Claude CLI 오류: ' + (err.trim().slice(0, 300) || 'exit ' + code)));
      resolve(out.trim());
    });
    child.stdin.write(userPrompt);
    child.stdin.end();
  });
}

/* base64 이미지들을 임시 파일로 저장하고 경로 반환 */
function saveTempImages(images) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'designai-'));
  return (images || []).slice(0, 4).map((img, i) => {
    const ext = img.media_type === 'image/png' ? 'png' : img.media_type === 'image/webp' ? 'webp' : 'jpg';
    const file = path.join(dir, `source-${i + 1}.${ext}`);
    fs.writeFileSync(file, Buffer.from(img.data, 'base64'));
    return file;
  });
}

async function handleAi(body) {
  const { mode, part } = body;

  if (mode === 'analyze') {
    let { images, text, url, hint } = body;
    if (url && !text) {
      try {
        const page = await fetch(url, { headers: { 'user-agent': 'Mozilla/5.0 (design-guide-analyzer)' } });
        text = (await page.text()).slice(0, 60000);
      } catch (e) {
        text = `(페이지를 가져오지 못했습니다: ${e.message}) URL: ${url}`;
      }
    }
    const imageFiles = saveTempImages(images);
    const user = [
      imageFiles.length ? `먼저 Read 도구로 다음 디자인 원본 이미지 파일을 모두 열어 눈으로 분석해라:\n${imageFiles.join('\n')}\n` : '',
      hint ? `디자인 주제/의도: ${hint}\n` : '',
      url ? `원본 URL: ${url}\n` : '',
      text ? `원본에서 추출한 내용:\n${String(text).slice(0, 60000)}` : '',
      '\n위 원본을 분석해 지시된 구조의 상세 디자인가이드 md를 작성해라.',
    ].filter(Boolean).join('\n');
    const md = await runClaude(analyzeSystem(part), user, { allowRead: imageFiles.length > 0 });
    return splitTokens(md);
  }

  if (mode === 'compose') {
    const { guideMd, content, imageList } = body;
    if (!guideMd || !content) throw new Error('가이드와 원고가 필요합니다.');
    const html = await runClaude(composeSystem(part), composeUser(guideMd, content, imageList));
    return { html: cleanHtml(html) };
  }

  throw new Error('unknown mode');
}

const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/api/ai') {
    let raw = '';
    req.on('data', d => { raw += d; if (raw.length > 80 * 1024 * 1024) req.destroy(); });
    req.on('end', async () => {
      try {
        const body = JSON.parse(raw);
        const result = await handleAi(body);
        res.writeHead(200, { 'content-type': 'application/json' });
        res.end(JSON.stringify(result));
      } catch (err) {
        res.writeHead(500, { 'content-type': 'application/json' });
        res.end(JSON.stringify({ error: String(err && err.message ? err.message : err) }));
      }
    });
    return;
  }

  // 정적 파일
  let file = decodeURIComponent((req.url || '/').split('?')[0]);
  if (file === '/') file = '/index.html';
  const full = path.join(ROOT, path.normalize(file));
  if (!full.startsWith(ROOT) || !fs.existsSync(full) || !fs.statSync(full).isFile()) {
    res.writeHead(404); res.end('Not found'); return;
  }
  res.writeHead(200, { 'content-type': MIME[path.extname(full).toLowerCase()] || 'application/octet-stream' });
  fs.createReadStream(full).pipe(res);
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`디자인 AI 스튜디오 (로컬 + Claude CLI): http://127.0.0.1:${PORT}`);
});
