/* server.js — 로컬 실행용 서버
 * 정적 파일 서빙 + /api/ai를 로컬 Claude CLI(claude -p)로 처리.
 * API 키 불필요 — Claude Code 구독 로그인을 그대로 사용한다.
 * 실행: node server.js [port]
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');
const { spawn, execFile } = require('child_process');

const ROOT = __dirname;
const PORT = Number(process.argv[2]) || 8787;
const { analyzeSystem, composeSystem, splitTokens, cleanHtml, composeUser, downloadPageImages } = require('./ai-prompts.js');

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
      '--max-turns', '12', '--append-system-prompt', systemPrompt];
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

/* 페이지 HTML 가져오기: curl 우선(봇 차단 우회), 실패 시 fetch */
function curlGet(url) {
  return new Promise((resolve, reject) => {
    execFile('curl', ['-sL', '-m', '25',
      '-A', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
      '-H', 'accept: text/html,application/xhtml+xml',
      '-H', 'accept-language: ko-KR,ko;q=0.9,en;q=0.8', url],
      { maxBuffer: 20 * 1024 * 1024 }, (err, stdout) => err ? reject(err) : resolve(stdout));
  });
}
async function fetchPageHtml(url) {
  try {
    const html = await curlGet(url);
    if (html && html.length > 500) return html;
  } catch {}
  const page = await fetch(url, { headers: { 'user-agent': 'Mozilla/5.0 (design-guide-analyzer)' } });
  return page.text();
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
        const html = await fetchPageHtml(url);
        text = html.slice(0, 60000);
        // 페이지 속 디자인 미리보기 이미지를 내려받아 Claude가 직접 보게 한다
        const pageImages = await downloadPageImages(html, url, 3);
        console.log(`  URL에서 디자인 이미지 ${pageImages.length}장 수집: ${pageImages.map(i => i.url).join(', ')}`);
        images = [...(images || []), ...pageImages];
        if (pageImages[0]) body.previewImage = `data:${pageImages[0].media_type};base64,${pageImages[0].data}`;
      } catch (e) {
        text = `(페이지를 가져오지 못했습니다: ${e.message}) URL: ${url}`;
      }
    }
    const imageFiles = saveTempImages(images);
    const user = [
      imageFiles.length ? `먼저 Read 도구로 다음 디자인 원본 이미지 파일을 모두 열어 눈으로 분석해라:\n${imageFiles.join('\n')}\n` : '',
      hint ? `디자인 주제/의도: ${hint}\n` : '',
      url ? `원본 URL(참고 표기용 — 절대 접근하지 말 것): ${url}\n` : '',
      text ? `원본에서 추출한 내용:\n${String(text).slice(0, 60000)}` : '',
      '\n위에 제공된 이미지 파일과 텍스트만으로 분석해라. URL 접근, WebFetch, 추가 도구 권한 요청, 사용자에게 되묻기 모두 금지 — 자료가 부족해도 보이는 것에서 최대한 추정해 지시된 구조의 상세 디자인가이드 md를 완성하라.',
    ].filter(Boolean).join('\n');
    const md = await runClaude(analyzeSystem(part), user, { allowRead: imageFiles.length > 0 });
    return { ...splitTokens(md), previewImage: body.previewImage || null };
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
        const started = Date.now();
        console.log(`[${new Date().toLocaleTimeString()}] ${body.mode} 요청 시작 (part=${body.part}, 이미지 ${body.images ? body.images.length : 0}장)`);
        const result = await handleAi(body);
        console.log(`[${new Date().toLocaleTimeString()}] ${body.mode} 완료 — ${Math.round((Date.now() - started) / 1000)}초`);
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
