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
const { analyzeSystem, composeSystem, splitTokens, cleanHtml, composeUser, downloadPageImages, pptPlanSystem, pptStyleSystem, pptBatchSystem } = require('./ai-prompts.js');

const MIME = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8', '.json': 'application/json',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml', '.md': 'text/markdown; charset=utf-8', '.txt': 'text/plain; charset=utf-8',
};

/* Claude CLI 실행: 프롬프트는 stdin, 결과는 stdout 텍스트 */
function runClaude(systemPrompt, userPrompt, { allowRead = false, model = 'sonnet', refFiles = [] } = {}) {
  if (refFiles.length) {
    allowRead = true;
    userPrompt = `먼저 Read 도구로 아래 원본 디자인 이미지를 열어 눈으로 확인해라. 이 원본의 구도·여백 리듬·장식 위치·요소 비율을 그대로 재현하고 내용(글자·사진)만 교체하는 것이 목표다:\n${refFiles.join('\n')}\n\n` + userPrompt;
  }
  return new Promise((resolve, reject) => {
    const args = ['-p', '--output-format', 'text', '--model', model,
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

/* 참조 원본 이미지 준비: base64 또는 원격 URL → 임시 파일 경로 */
async function prepareRefFiles(refImage) {
  if (!refImage) return [];
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'designai-ref-'));
  try {
    let buf, ext = 'png';
    if (refImage.data) {
      buf = Buffer.from(refImage.data, 'base64');
      ext = refImage.media_type === 'image/jpeg' ? 'jpg' : refImage.media_type === 'image/webp' ? 'webp' : 'png';
    } else if (refImage.url) {
      const r = await fetch(refImage.url, { headers: { 'user-agent': 'Mozilla/5.0' } });
      if (!r.ok) return [];
      const mt = (r.headers.get('content-type') || '').split(';')[0];
      if (!/^image\/(jpeg|png|webp)$/.test(mt)) return [];
      buf = Buffer.from(await r.arrayBuffer());
      ext = mt === 'image/jpeg' ? 'jpg' : mt === 'image/webp' ? 'webp' : 'png';
    } else return [];
    if (!buf || buf.length < 5000) return [];
    const f = path.join(dir, 'reference.' + ext);
    fs.writeFileSync(f, buf);
    return [f];
  } catch { return []; }
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


/* ---------- Codex CLI로 삽화 생성 (image_gen) ---------- */
function runCodexBatch(prompts, dir, startIdx) {
  return new Promise(resolve => {
    const list = prompts.map((pr, i) =>
      `${i + 1}) ${path.join(dir, `gen-${startIdx + i}.png`)} — ${pr}`).join('\n');
    const prompt = `Use the image_gen tool to create ${prompts.length} separate images and save each as PNG at the exact absolute paths below. Absolutely NO text, NO lettering, NO watermark, NO logos in any image.\n\n${list}\n\nGenerate all and report the paths.`;
    const child = spawn('codex', ['exec', '--skip-git-repo-check', '--sandbox', 'danger-full-access', prompt],
      { cwd: dir, env: process.env, stdio: ['ignore', 'pipe', 'pipe'] });
    const killer = setTimeout(() => { child.kill('SIGKILL'); resolve(); }, 900000); // 15분
    child.on('error', () => { clearTimeout(killer); resolve(); });
    child.on('close', () => { clearTimeout(killer); resolve(); });
  });
}

async function runCodexImages(prompts) {
  if (!prompts.length) return [];
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'designai-gen-'));
  // 4장씩 묶어 병렬 2개까지
  const batches = [];
  for (let i = 0; i < prompts.length; i += 4) batches.push({ prompts: prompts.slice(i, i + 4), start: i + 1 });
  for (let i = 0; i < batches.length; i += 2) {
    await Promise.all(batches.slice(i, i + 2).map(b => runCodexBatch(b.prompts, dir, b.start)));
  }
  const missing = i => !fs.existsSync(path.join(dir, `gen-${i + 1}.png`)) || fs.statSync(path.join(dir, `gen-${i + 1}.png`)).size < 10000;
  // 실패분 1회 재시도 (개별 호출, 2개 병렬)
  const retry = prompts.map((pr, i) => ({ pr, i })).filter(x => missing(x.i)).slice(0, 4);
  if (retry.length) {
    console.log(`  삽화 ${retry.length}장 재시도…`);
    for (let i = 0; i < retry.length; i += 2) {
      await Promise.all(retry.slice(i, i + 2).map(x => runCodexBatch([x.pr], dir, x.i + 1)));
    }
  }
  return prompts.map((_, i) => {
    const f = path.join(dir, `gen-${i + 1}.png`);
    if (missing(i)) return null;
    return 'data:image/png;base64,' + fs.readFileSync(f).toString('base64');
  });
}

/* 생성 HTML의 GEN_IMAGE 토큰을 codex 삽화로 치환 (단일 패스 compose용) */
async function applyGenImages(html) {
  const m = html.match(/<!--GEN_IMAGES:(\[[\s\S]*?\])-->/);
  let prompts = [];
  if (m) { try { prompts = JSON.parse(m[1]).slice(0, 3); } catch {} }
  if (prompts.length) {
    console.log(`  Codex 삽화 ${prompts.length}장 생성 중…`);
    const images = await runCodexImages(prompts);
    images.forEach((data, i) => { if (data) html = html.split(`{{GEN_IMAGE_${i + 1}}}`).join(data); });
  }
  return html.replace(/<!--GEN_IMAGES:[\s\S]*?-->/, '')
             .replace(/url\((['"]?)\{\{GEN_IMAGE_\d+\}\}\1\)/g, 'none')
             .replace(/\{\{GEN_IMAGE_\d+\}\}/g, '');
}

/* ---------- PPT 고품질 파이프라인: 설계 → 스타일 → 배치 병렬 구현 → 삽화 ---------- */
function parseJsonLoose(text) {
  const t = text.replace(/```(?:json)?/g, '').trim();
  const a = t.indexOf('{'), b = t.lastIndexOf('}');
  return JSON.parse(t.slice(a, b + 1));
}

async function composePptPipeline({ guideMd, content, refFiles = [] }) {
  // 1) 설계
  console.log('  [1/4] 덱 설계 중…');
  const planRaw = await runClaude(pptPlanSystem(),
    `[디자인가이드]\n${String(guideMd).slice(0, 30000)}\n\n[원고]\n${String(content).slice(0, 50000)}`, { model: 'sonnet' });
  const plan = parseJsonLoose(planRaw);
  const slides = plan.slides || [];
  if (!slides.length) throw new Error('덱 설계 실패');
  // 삽화 토큰 배정 (최대 8)
  const imagePrompts = [];
  for (const sl of slides) {
    if (sl.image && imagePrompts.length < 8) {
      imagePrompts.push(String(sl.image));
      sl.imageToken = `{{GEN_IMAGE_${imagePrompts.length}}}`;
    }
    delete sl.image;
  }
  console.log(`  설계 완료: ${slides.length}장, 삽화 ${imagePrompts.length}곳`);

  // 2) 삽화는 지금부터 백그라운드로 (스타일·배치와 병렬)
  const imagesPromise = imagePrompts.length ? runCodexImages(imagePrompts) : Promise.resolve([]);
  if (imagePrompts.length) console.log(`  [2/4] Codex 삽화 ${imagePrompts.length}장 병렬 생성 시작`);

  // 3) 공통 스타일
  console.log('  [3/4] 디자인 시스템 CSS 구축 중…');
  const styleOut = await runClaude(pptStyleSystem(),
    `[디자인가이드]\n${String(guideMd).slice(0, 30000)}\n\n[덱 정보]\n${JSON.stringify(plan.deck || {})}\n총 ${slides.length}장, 마스터 구성: ${[...new Set(slides.map(x => x.master))].join(', ')}`,
    { model: 'sonnet', refFiles });

  // 4) 배치 구현 (6장씩, 병렬 3)
  const batches = [];
  for (let i = 0; i < slides.length; i += 6) batches.push(slides.slice(i, i + 6));
  console.log(`  [4/4] 슬라이드 구현: ${batches.length}개 배치 병렬 진행`);
  const results = new Array(batches.length);
  for (let i = 0; i < batches.length; i += 3) {
    await Promise.all(batches.slice(i, i + 3).map((batch, j) =>
      runClaude(pptBatchSystem(),
        `[공통 스타일+USAGE]\n${styleOut}\n\n[덱 공통]\n${JSON.stringify(plan.deck || {})} / 총 ${slides.length}장\n\n[이번 배치 슬라이드 설계]\n${JSON.stringify(batch, null, 1)}`,
        { model: 'sonnet' })
        .then(out => { results[i + j] = out.replace(/```(?:html)?/g, '').trim(); })
    ));
    console.log(`    배치 ${Math.min(i + 3, batches.length)}/${batches.length} 완료`);
  }

  // 5) 조립 + 삽화 주입
  const title = (slides[0] && slides[0].title) || '프레젠테이션';
  let html = `<!DOCTYPE html>\n<html lang="ko">\n<head>\n<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width, initial-scale=1.0">\n<title>${title}</title>\n${styleOut.replace(/<!--USAGE[\s\S]*?USAGE-->/, '')}\n<style>body{background:#555;}</style>\n</head>\n<body>\n${results.join('\n')}\n</body>\n</html>`;
  const images = await imagesPromise;
  images.forEach((data, i) => { if (data) html = html.split(`{{GEN_IMAGE_${i + 1}}}`).join(data); });
  html = html.replace(/url\((['"]?)\{\{GEN_IMAGE_\d+\}\}\1\)/g, 'none').replace(/\{\{GEN_IMAGE_\d+\}\}/g, '');
  console.log(`  완성: ${slides.length}장, 삽화 ${images.filter(Boolean).length}/${imagePrompts.length}장 주입`);
  return { html };
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
    const { guideMd, content, imageList, refImage } = body;
    if (!guideMd || !content) throw new Error('가이드와 원고가 필요합니다.');
    const refFiles = await prepareRefFiles(refImage);
    if (refFiles.length) console.log('  원본 디자인 이미지를 참조해 재현합니다');
    if (part === 'ppt') {
      // 고품질 파이프라인: 설계 → 스타일 → 배치 병렬 구현 → Codex 삽화
      try {
        return await composePptPipeline({ guideMd, content, refFiles });
      } catch (e) {
        console.log('  파이프라인 실패(' + e.message + ') — 단일 패스로 대체');
      }
    }
    let html = cleanHtml(await runClaude(composeSystem(part), composeUser(guideMd, content, imageList), { refFiles }));
    html = await applyGenImages(html);
    return { html };
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
