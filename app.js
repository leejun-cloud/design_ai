/* app.js — 4단계 마법사 로직 + 표준디자인 등록(localStorage) */

aiTextLoading(document.getElementById('topbarTagline'), [
  '디자인 샘플을 클릭하세요',
  '원하는 자료를 올려보세요',
  '좋은 디자인이 나옵니다',
], { interval: 2200, label: '표준디자인을 고르고 자료를 올리면, 같은 스타일의 결과물이 바로 나옵니다' });

const PART_NAMES = { ppt: 'PPT', poster: '포스터', landing: '랜딩페이지' };
const STORE_KEY = 'designai_custom_designs_v1';

const state = { part: null, design: null, resultHtml: null, resultContent: null, slideCount: 0, currentSlide: 0 };

/* ---------- 표준디자인 저장소 ---------- */
function loadCustomDesigns() {
  try { return JSON.parse(localStorage.getItem(STORE_KEY)) || []; }
  catch { return []; }
}
function saveCustomDesigns(list) {
  localStorage.setItem(STORE_KEY, JSON.stringify(list));
}
const HIDE_KEY = 'designai_hidden_seeds_v1';
function loadHiddenSeeds() {
  try { return JSON.parse(localStorage.getItem(HIDE_KEY)) || []; }
  catch { return []; }
}
function saveHiddenSeeds(list) { localStorage.setItem(HIDE_KEY, JSON.stringify(list)); }

function allDesigns(part) {
  const hidden = loadHiddenSeeds();
  return [...SEED_DESIGNS.filter(d => !hidden.includes(d.id)), ...loadCustomDesigns()]
    .filter(d => d.part === part);
}

/* ---------- IndexedDB: 가져온 원소스 파일(.pptx) 보관 ---------- */
function withIdb(cb) {
  const req = indexedDB.open('designai_sources', 1);
  req.onupgradeneeded = () => req.result.createObjectStore('files');
  req.onsuccess = () => cb(req.result);
  req.onerror = () => alert('브라우저 저장소(IndexedDB)를 열 수 없습니다.');
}
function idbPut(key, blob) {
  withIdb(db => db.transaction('files', 'readwrite').objectStore('files').put(blob, key));
}
function idbGet(key, cb) {
  withIdb(db => {
    const r = db.transaction('files').objectStore('files').get(key);
    r.onsuccess = () => cb(r.result || null);
  });
}
function idbDelete(key) {
  withIdb(db => db.transaction('files', 'readwrite').objectStore('files').delete(key));
}

/* ---------- 단계 전환 ---------- */
function goStep(n) {
  document.querySelectorAll('.panel').forEach((p, i) => p.classList.toggle('hidden', i !== n - 1));
  document.querySelectorAll('.step').forEach(s =>
    s.classList.toggle('active', Number(s.dataset.step) === n));
  window.scrollTo(0, 0);
}
document.querySelectorAll('.step').forEach(btn => {
  btn.addEventListener('click', () => {
    const n = Number(btn.dataset.step);
    // 앞 단계로만 자유 이동 (뒤 단계는 순서대로)
    if (n === 1 || (n === 2 && state.part) || (n === 3 && state.design) || (n === 4 && state.resultHtml)) goStep(n);
  });
});

/* ---------- STEP 1: 종류 선택 ---------- */
document.querySelectorAll('.part-card').forEach(card => {
  card.addEventListener('click', () => {
    state.part = card.dataset.part;
    document.getElementById('partLabel').textContent = `— ${PART_NAMES[state.part]}`;
    document.getElementById('ctaWrap').classList.toggle('hidden', state.part !== 'landing');
    renderDesignGrid();
    hideRegisterBox();
    goStep(2);
  });
});

/* ---------- STEP 2: 표준디자인 목록 (실물 렌더링 썸네일) ---------- */
function sampleHtml(d) {
  return RENDERERS[d.part](d, SAMPLE_CONTENT);
}
function thumbHtml(d) {
  if (d.previewUrl) {
    // 원소스의 원본 미리보기 이미지 (원격 URL)
    return `<div class="thumb thumb-src"><img src="${d.previewUrl}" loading="lazy" alt="${d.name} 원본"><div class="thumb-hint">원본 디자인 · 클릭해 크게 보기</div></div>`;
  }
  if (d.hasPreview) {
    // 가져온 원본 디자인 모습 그대로 (IndexedDB에서 비동기 로드)
    return `<div class="thumb thumb-src"><img data-preview-id="${d.id}" alt="${d.name} 원본"><div class="thumb-hint">원본 디자인 · 클릭해 크게 보기</div></div>`;
  }
  const html = sampleHtml(d).replace(/&/g, '&amp;').replace(/"/g, '&quot;');
  const W = { ppt: 1340, poster: 740, landing: 1320 }[d.part];
  const scale = (300 / W).toFixed(3);
  const style = `width:${W}px; height:${Math.round(W * 1.7)}px; transform:scale(${scale});`;
  return `<div class="thumb"><iframe loading="lazy" scrolling="no" tabindex="-1" style="${style}" srcdoc="${html}"></iframe><div class="thumb-hint">예시 렌더링 · 클릭하면 전체 보기</div></div>`;
}
function hydratePreviews(scope) {
  (scope || document).querySelectorAll('img[data-preview-id]').forEach(img => {
    idbGet('preview-' + img.dataset.previewId, data => { if (data) img.src = typeof data === 'string' ? data : URL.createObjectURL(data); });
  });
}

function renderDesignGrid() {
  const grid = document.getElementById('designGrid');
  const custom = loadCustomDesigns();
  grid.innerHTML = allDesigns(state.part).map(d => {
    const isCustom = custom.some(cd => cd.id === d.id);
    const layoutName = (LAYOUTS[d.part].find(l => l.id === d.layout) || {}).name || d.layout;
    const srcLabel = d.source ? (d.source.type === 'url' ? '🔗 링크에서 복제됨' : '📂 PPT에서 복제됨') : '';
    return `<div class="design-card" data-id="${d.id}">
      ${thumbHtml(d)}
      <div class="design-meta">
        <strong>${d.name}</strong>
        <button class="del" data-del="${d.id}" title="${isCustom ? '삭제' : '목록에서 숨기기'}">🗑</button>
        ${isCustom ? '' : '<span class="tag">인기 샘플</span>'}
        <small>${layoutName}${srcLabel ? ' · ' + srcLabel : ''}</small>
        ${d.ref ? `<em class="ref">${d.ref}</em>` : ''}
      </div>
      <div class="card-actions">
        <button class="btn primary sm" data-use="${d.id}">✏️ 내용 입력해 만들기</button>
        <button class="btn sm" data-guide="${d.id}">📘 디자인 가이드</button>
        ${d.source ? `<button class="btn sm" data-src="${d.id}">🔍 원소스</button>` : ''}
      </div>
    </div>`;
  }).join('');
  document.getElementById('btnRestoreSeeds').classList.toggle('hidden', !loadHiddenSeeds().length);
  hydratePreviews(grid);

  const pick = id => allDesigns(state.part).find(d => d.id === id);
  // 카드 아무 곳이나 클릭 → 실물 전체 미리보기 모달
  grid.querySelectorAll('.design-card').forEach(card => {
    card.addEventListener('click', e => {
      if (e.target.closest('[data-use],[data-guide],.del')) return;
      openGuide(pick(card.dataset.id));
    });
  });
  grid.querySelectorAll('[data-use]').forEach(btn => btn.addEventListener('click', e => { e.stopPropagation(); selectDesign(pick(btn.dataset.use)); }));
  grid.querySelectorAll('[data-guide]').forEach(btn => btn.addEventListener('click', e => { e.stopPropagation(); openGuide(pick(btn.dataset.guide)); }));
  grid.querySelectorAll('[data-src]').forEach(btn => btn.addEventListener('click', e => { e.stopPropagation(); openSource(pick(btn.dataset.src)); }));
  grid.querySelectorAll('.del').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const id = btn.dataset.del;
      const isCustom = loadCustomDesigns().some(d => d.id === id);
      if (isCustom) {
        if (!confirm('이 표준디자인을 삭제할까요? (가져온 원소스 파일도 함께 삭제됩니다)')) return;
        saveCustomDesigns(loadCustomDesigns().filter(d => d.id !== id));
        idbDelete(id);
        idbDelete('preview-' + id);
      } else {
        if (!confirm('기본 템플릿을 목록에서 숨길까요? (아래 "기본 템플릿 복원"으로 되살릴 수 있습니다)')) return;
        saveHiddenSeeds([...loadHiddenSeeds(), id]);
      }
      renderDesignGrid();
    });
  });
}

document.getElementById('btnRestoreSeeds').addEventListener('click', () => {
  saveHiddenSeeds([]);
  renderDesignGrid();
});

/* ---------- 원소스 열기 ---------- */
function openSource(design) {
  const src = design.source;
  if (!src) return;
  if (src.type === 'url') {
    window.open(src.url, '_blank');
  } else {
    idbGet(design.id, blob => {
      if (!blob) { alert('원소스 파일을 찾을 수 없습니다. (다른 브라우저/기기에서 등록했을 수 있어요)'); return; }
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = src.name || 'source.pptx';
      a.click();
      URL.revokeObjectURL(a.href);
    });
  }
}

function selectDesign(design) {
  state.design = design;
  document.getElementById('chosenDesignName').textContent =
    `${PART_NAMES[state.part]} · ${design.name}`;
  goStep(3);
}

/* ---------- Claude AI 호출 (로컬 Claude CLI 또는 Vercel 서버 함수) ---------- */
async function callAI(payload, onTick) {
  const ctrl = new AbortController();
  const started = Date.now();
  const killer = setTimeout(() => ctrl.abort(), 600000); // 10분 타임아웃
  const ticker = onTick ? setInterval(() => {
    const s = Math.round((Date.now() - started) / 1000);
    onTick(`${Math.floor(s / 60)}분 ${s % 60}초 경과`);
  }, 1000) : null;
  let res;
  try {
    res = await fetch('/api/ai', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(payload),
      signal: ctrl.signal,
    });
  } catch (e) {
    throw new Error(e.name === 'AbortError' ? '10분이 지나 중단했습니다' : e.message);
  } finally {
    clearTimeout(killer);
    if (ticker) clearInterval(ticker);
  }
  let data = null;
  try { data = await res.json(); } catch { throw new Error('AI 서버 응답을 읽지 못했습니다 (로컬 실행 중이면 배포 주소에서 사용하세요)'); }
  if (!res.ok) throw new Error(data && (data.message || data.error) ? (data.message || data.error) : `AI 서버 오류 ${res.status}`);
  return data;
}
function dataUrlToImageBlock(dataUrl) {
  const m = String(dataUrl).match(/^data:(image\/(?:jpeg|png|webp));base64,(.+)$/);
  return m ? { media_type: m[1], data: m[2] } : null;
}

/* ---------- 디자인 가이드 모달 (보기 · 복제) ---------- */
let guideDesign = null;
const guideModal = document.getElementById('guideModal');

function openGuide(design) {
  guideDesign = design;
  const t = design.tokens;
  const hasOriginal = design.hasPreview || design.previewUrl;
  document.getElementById('guideTitle').textContent = hasOriginal ? `${design.name} — 원본 디자인` : `${design.name} — 실물 미리보기`;
  document.getElementById('guideRef').textContent = design.ref || '사용자 등록 디자인';
  const frameEl = document.getElementById('guideFrame');
  const imgEl = document.getElementById('guidePreviewImg');
  if (hasOriginal) {
    frameEl.classList.add('hidden');
    imgEl.classList.remove('hidden');
    imgEl.removeAttribute('src');
    if (design.previewUrl) imgEl.src = design.previewUrl;
    else idbGet('preview-' + design.id, data => { if (data) imgEl.src = typeof data === 'string' ? data : URL.createObjectURL(data); });
  } else {
    frameEl.classList.remove('hidden');
    imgEl.classList.add('hidden');
    frameEl.srcdoc = sampleHtml(design); // 기본 템플릿은 샘플 내용으로 렌더링
  }
  if (design.guideMd) {
    // 등록된 원본 디자인가이드를 그대로 보여준다 (축약 없음)
    document.getElementById('guideSpec').textContent = design.guideMd;
  } else {
    const spec = LAYOUT_SPECS[design.part + ':' + design.layout] || [];
    document.getElementById('guideSpec').textContent = spec.length
      ? spec.map((x, i) => `${i + 1}. ${x}`).join('\n')
      : '요소 명세는 .md 다운로드에서 확인하세요.';
  }
  document.getElementById('guideText').textContent = design.guide ||
    `레이아웃: ${(LAYOUTS[design.part].find(l => l.id === design.layout) || {}).name || design.layout}`;
  document.getElementById('guideSwatches').innerHTML = [
    ['주 색상', t.primary], ['보조 색상', t.secondary], ['배경', t.bg], ['글자', t.text],
  ].map(([k, v]) => `<div class="swatch"><span style="background:${v}"></span><small>${k}<br>${v}</small></div>`).join('')
    + `<div class="swatch"><span class="fontchip">${t.font === 'serif' ? '明' : 'Aa'}</span><small>글꼴<br>${t.font === 'serif' ? '명조' : '고딕'}</small></div>`;
  document.getElementById('guideJson').textContent = JSON.stringify(
    { part: design.part, layout: design.layout, tokens: design.tokens, guide: design.guide || '', reference: design.ref || '', canvas: PART_STRUCTURES[design.part] || [], pageArchitecture: LAYOUT_SPECS[design.part + ':' + design.layout] || [] }, null, 2);
  guideModal.classList.remove('hidden');
}
document.getElementById('btnCloseGuide').addEventListener('click', () => guideModal.classList.add('hidden'));
guideModal.addEventListener('click', e => { if (e.target === guideModal) guideModal.classList.add('hidden'); });

document.getElementById('btnUseGuide').addEventListener('click', () => {
  guideModal.classList.add('hidden');
  selectDesign(guideDesign);
});

document.getElementById('btnDownloadGuide').addEventListener('click', () => {
  const md = guideDesign.guideMd || generateGuideMd(guideDesign);
  const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `디자인가이드_${guideDesign.name}.md`;
  a.click();
  URL.revokeObjectURL(a.href);
});

document.getElementById('btnCopyJson').addEventListener('click', () => {
  navigator.clipboard.writeText(document.getElementById('guideJson').textContent)
    .then(() => alert('디자인 가이드 JSON이 복사되었습니다.'));
});

document.getElementById('btnCloneGuide').addEventListener('click', () => {
  // 가이드의 색·글꼴·레이아웃을 등록 폼에 미리 채워서 복제
  guideModal.classList.add('hidden');
  const t = guideDesign.tokens;
  const sel = document.getElementById('regLayout');
  sel.innerHTML = LAYOUTS[state.part].map(l => `<option value="${l.id}">${l.name}</option>`).join('');
  sel.value = guideDesign.layout;
  document.getElementById('regName').value = guideDesign.name + ' (복제)';
  document.getElementById('regPrimary').value = t.primary;
  document.getElementById('regSecondary').value = t.secondary;
  document.getElementById('regBg').value = t.bg;
  document.getElementById('regText').value = t.text;
  document.getElementById('regFont').value = t.font;
  // 원본 가이드 md 전체를 복제 — 색만 바꿔도 완전한 가이드가 유지된다
  document.getElementById('regGuide').value = guideDesign.guideMd || guideDesign.guide || generateGuideMd(guideDesign);
  registerBox.classList.remove('hidden');
  registerBox.scrollIntoView({ behavior: 'smooth' });
});

/* ---------- 표준디자인 등록 ---------- */
const registerBox = document.getElementById('registerBox');
function hideRegisterBox() { registerBox.classList.add('hidden'); }
let pendingSource = null;      // 분석 중인 원소스 { type:'file'|'url', name?/url? }
let pendingSourceBlob = null;  // pptx 원본 Blob
let pendingPreview = null;     // 원본 미리보기 dataURL (썸네일·모달에 원본 그대로 표시)

/* ---------- PPT·링크에서 디자인가이드 복제 ---------- */
const importBox = document.getElementById('importBox');
const impStatus = document.getElementById('impStatus');

document.getElementById('btnOpenImport').addEventListener('click', () => {
  importBox.classList.toggle('hidden');
  impStatus.textContent = '';
});
document.getElementById('btnCancelImport').addEventListener('click', () => importBox.classList.add('hidden'));

function isSerifFont(name) {
  return /serif|myungjo|myeongjo|batang|바탕|명조|mincho|明朝|times|garamond|georgia/i.test(name || '');
}

/* 색 유틸: 채도·명도로 역할 배정 */
function hexInfo(hex) {
  const r = parseInt(hex.slice(0, 2), 16), g = parseInt(hex.slice(2, 4), 16), b = parseInt(hex.slice(4, 6), 16);
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  return { hex: '#' + hex.toLowerCase(), lum: (max + min) / 510, sat: max === 0 ? 0 : (max - min) / max };
}

/* .pptx 분석: 테마 XML에서 색상·글꼴 추출 */
function analyzePptx(file, done) {
  impStatus.textContent = '⏳ PPT 테마를 분석하는 중...';
  JSZip.loadAsync(file).then(zip => {
    const themeFile = Object.keys(zip.files).find(k => /ppt\/theme\/theme\d*\.xml/.test(k));
    const slideFiles = Object.keys(zip.files).filter(k => /^ppt\/slides\/slide\d+\.xml$/.test(k)).sort((a,b)=>Number(a.match(/slide(\d+)/)[1])-Number(b.match(/slide(\d+)/)[1]));
    return Promise.all([themeFile ? zip.file(themeFile).async('string') : Promise.resolve(''), Promise.all(slideFiles.map(k=>zip.file(k).async('string')))]);
  }).then(([xml, slideXmls]) => {
    const pick = tag => {
      const m = xml.match(new RegExp(`<a:${tag}>.*?(?:val|lastClr)="([0-9A-Fa-f]{6})"`, 's'));
      return m ? '#' + m[1].toLowerCase() : null;
    };
    const fontM = xml.match(/<a:majorFont>\s*<a:latin[^>]*typeface="([^"]*)"/);
    const sampleText = slideXmls.flatMap(s=>[...s.matchAll(/<a:t>(.*?)<\/a:t>/g)].map(m=>m[1].replace(/&amp;/g,'&'))).filter(Boolean).slice(0,8);
    const imageCount = slideXmls.reduce((n,s)=>n+(s.match(/<p:pic>/g)||[]).length,0);
    const title = sampleText[0] || file.name.replace(/\.pptx$/i, '');
    const shapeCount = slideXmls.reduce((n,s)=>n+(s.match(/<p:(?:sp|pic)>/g)||[]).length,0);
    const perSlide = slideXmls.map((s,i) => {
      const texts=[...s.matchAll(/<a:t>(.*?)<\/a:t>/g)].map(m=>m[1]).filter(Boolean).slice(0,2).join(' / ');
      const xs=[...s.matchAll(/<a:off[^>]*x="(\d+)"/g)].map(m=>Number(m[1]));
      const ys=[...s.matchAll(/<a:off[^>]*y="(\d+)"/g)].map(m=>Number(m[1]));
      const x=xs.length?xs.reduce((a,b)=>a+b,0)/xs.length:NaN, y=ys.length?ys.reduce((a,b)=>a+b,0)/ys.length:NaN;
      const zone=Number.isNaN(x)?'위치 정보 없음':`${x<4000000?'좌측':x>8000000?'우측':'중앙'}-${y<2200000?'상단':y>4700000?'하단':'중단'}에 개체 중심`;
      return `${i+1}장 ${texts?`“${texts}” · `:''}${zone}`;
    }).slice(0,12);
    const analysis = `총 ${slideXmls.length}장, 사진/이미지 프레임 ${imageCount}개, 주요 개체 ${shapeCount}개. 제목·문구 예시: ${sampleText.join(' · ') || '텍스트 추출 없음'}. 슬라이드별 위치 샘플: ${perSlide.join('; ')}.`;
    done({
      primary: pick('accent1') || '#2563eb',
      secondary: pick('accent2') || '#f59e0b',
      bg: pick('lt1') || '#ffffff',
      text: pick('dk1') || '#1f2937',
      font: isSerifFont(fontM && fontM[1]) ? 'serif' : 'sans',
      title, topic: title, analysis,
    });
  }).catch(err => {
    impStatus.textContent = '⚠️ PPT 분석 실패(' + err.message + ') — 색상을 직접 지정해 등록해주세요.';
    done(null);
  });
}

/* URL 분석: 페이지에서 색상 빈도·글꼴 분위기 추출 (CORS로 막히면 수동 입력) */
function analyzeUrl(url, done) {
  impStatus.textContent = '⏳ 링크 페이지를 분석하는 중...';
  const tryFetch = u => fetch(u).then(r => { if (!r.ok) throw new Error(r.status); return r.text(); });
  tryFetch(url)
    .catch(() => tryFetch('https://corsproxy.io/?url=' + encodeURIComponent(url)))
    .then(html => {
      const counts = {};
      for (const m of html.matchAll(/#([0-9a-fA-F]{6})\b/g)) {
        const h = m[1].toLowerCase();
        counts[h] = (counts[h] || 0) + 1;
      }
      const infos = Object.keys(counts).map(hexInfo)
        .sort((a, b) => counts[b.hex.slice(1)] - counts[a.hex.slice(1)]);
      const vivid = infos.filter(i => i.sat > 0.3 && i.lum > 0.15 && i.lum < 0.85);
      const lights = infos.filter(i => i.lum > 0.9);
      const darks = infos.filter(i => i.lum < 0.25);
      const themeM = html.match(/name="theme-color"[^>]*content="(#[0-9a-fA-F]{6})"/);
      const titleM = html.match(/<title[^>]*>([^<]{1,60})/);
      const descM = html.match(/<meta[^>]+(?:name|property)=["'](?:description|og:description)["'][^>]+content=["']([^"']{1,240})/i);
      done({
        primary: (themeM && themeM[1]) || (vivid[0] && vivid[0].hex) || '#2563eb',
        secondary: (vivid[1] && vivid[1].hex) || '#f59e0b',
        bg: (lights[0] && lights[0].hex) || '#ffffff',
        text: (darks[0] && darks[0].hex) || '#1f2937',
        font: isSerifFont((html.match(/font-family:\s*([^;}]{0,80})/i) || [])[1]) ? 'serif' : 'sans',
        title: titleM ? titleM[1].trim() : url.replace(/^https?:\/\//, '').split('/')[0],
        topic: descM ? descM[1].trim() : (titleM ? titleM[1].trim() : ''),
        analysis: descM ? `페이지 설명: ${descM[1].trim()}` : '페이지 제목과 스타일 색상 정보를 추출했습니다.',
      });
    })
    .catch(() => {
      impStatus.textContent = '⚠️ 페이지를 가져올 수 없었습니다(CORS 차단). 링크는 원소스로 저장되니, 색상은 그 페이지를 보며 직접 지정해주세요.';
      done(null);
    });
}

/* 분석 결과 → 등록 폼에 채워서 확인 후 저장 */
function fillRegisterForm(result, source) {
  pendingSource = source;
  const sel = document.getElementById('regLayout');
  sel.innerHTML = LAYOUTS[state.part].map(l => `<option value="${l.id}">${l.name}</option>`).join('');
  document.getElementById('regName').value = (result && result.title ? result.title : '가져온 디자인').slice(0, 40);
  if (result) {
    document.getElementById('regPrimary').value = result.primary;
    document.getElementById('regSecondary').value = result.secondary;
    document.getElementById('regBg').value = result.bg;
    document.getElementById('regText').value = result.text;
    document.getElementById('regFont').value = result.font;
    if (result.recommendedLayout) document.getElementById('regLayout').value = result.recommendedLayout;
    document.getElementById('regGuide').value = result.guide || makeGuideDraft(result.title, result.topic || '', result.analysis || '');
    impStatus.textContent = '✅ 분석 완료! 아래 등록 폼에서 확인·수정 후 등록하세요.';
  }
  registerBox.classList.remove('hidden');
  registerBox.scrollIntoView({ behavior: 'smooth' });
}

function makeGuideDraft(title, topic, analysis) {
  const isPpt = state.part === 'ppt';
  const subject = topic || title || '주제 미확인';
  return `주제 해석: “${subject}”를 중심에 둡니다. 제목·본문은 추출한 팔레트와 글꼴 분위기를 유지하고, 핵심 정보에만 보조색을 사용합니다.\n\n` +
    `공통 규칙: ${isPpt ? '16:9 캔버스(1280×720)' : '반응형 화면'}에서 같은 좌우 여백과 제목 기준선을 사용합니다. 배경색은 넓게 유지하고 보조색은 화면당 1~2곳으로 제한합니다.\n\n` +
    (isPpt ? `페이지 구성: 1 표지(제목·부제·주제 대표 이미지) → 2 핵심 개요(요점 3개) → 3 상세 내용(본문과 시각 자료의 6:4 분할) → 4 요약·마무리(핵심 문장·출처). 추출된 특징: ${analysis || '텍스트·배치 정보가 제한적이므로 미리보기 후 조정하세요.'}` : `페이지 구성: 히어로(주제 제목과 대표 이미지) → 핵심 정보 → 설명 → 마무리·참고 링크. 시각 자료는 한 화면에 하나의 주 피사체를 둡니다. ${analysis}`) +
    `\n\n배치: 제목은 상단 15% 안에 두고, 본문은 2~4개 짧은 블록으로 나눕니다. 표·도표는 설명 바로 옆에 놓고, 이미지와 글자 사이에는 최소 32px 간격을 둡니다.\n\n` +
    `이미지 조화: 주제(${subject})를 직접 보여주는 사진·일러스트를 우선합니다. 원본의 밝기와 색온도를 맞추고, 사진 위 텍스트는 어두운 오버레이 또는 단색 패널로 분리합니다. 동일한 크롭 비율·모서리·테두리를 반복합니다.\n\n재현 전 확인: 대표 이미지의 초점, 제목 줄바꿈, 색 대비, 페이지 번호와 출처 표기를 미리보기에서 조정하세요.`;
}

function analyzeImage(file, done) {
  impStatus.textContent = '⏳ 이미지의 색상과 밝기 분포를 분석하는 중...';
  const fr = new FileReader();
  fr.onload = () => {
    const im = new Image();
    im.onload = () => {
      const cv = document.createElement('canvas'); cv.width = 80; cv.height = 80;
      const ctx = cv.getContext('2d', { willReadFrequently: true }); ctx.drawImage(im, 0, 0, 80, 80);
      const data = ctx.getImageData(0, 0, 80, 80).data, counts = {}; let lum = 0, n = 0;
      for (let i = 0; i < data.length; i += 16) {
        const r=data[i], g=data[i+1], b=data[i+2];
        const key=[r,g,b].map(v=>Math.min(255,Math.round(v/32)*32).toString(16).padStart(2,'0')).join('');
        counts[key]=(counts[key]||0)+1; lum+=(Math.max(r,g,b)+Math.min(r,g,b))/510; n++;
      }
      const colors=Object.entries(counts).sort((a,b)=>b[1]-a[1]).map(([h])=>hexInfo(h));
      const vivid=colors.find(c=>c.sat>.3&&c.lum>.18&&c.lum<.85), dark=colors.find(c=>c.lum<.3);
      const title=file.name.replace(/\.(png|jpe?g|webp)$/i,'').replace(/[_-]+/g,' '), isLight=lum/n>.58;
      const bg=isLight?'#ffffff':'#111827';
      done({primary:vivid?vivid.hex:'#2563eb',secondary:colors.find(c=>c.hex!==(vivid&&vivid.hex)&&c.sat>.2)?.hex||'#55b89a',bg,text:isLight?(dark?dark.hex:'#1f2937'):'#f9fafb',font:'sans',title,topic:title,recommendedLayout:!isLight&&state.part==='ppt'?'dark':undefined,analysis:`업로드 이미지에서 ${isLight?'밝은':'어두운'} 톤과 주요 색상 ${colors.slice(0,3).map(c=>c.hex).join(', ')}을 추출했습니다.`});
    };
    im.onerror=()=>{impStatus.textContent='⚠️ 이미지를 읽지 못했습니다.';done(null);}; im.src=fr.result;
  };
  fr.onerror=()=>{impStatus.textContent='⚠️ 파일을 읽지 못했습니다.';done(null);}; fr.readAsDataURL(file);
}

/* 파일 → Claude vision용 이미지 블록 (축소 jpeg) */
function fileToImageBlock(file) {
  return new Promise(resolve => resizeImageFile(file, dataUrl => resolve(dataUrl ? dataUrlToImageBlock(dataUrl) : null)));
}

/* .pptx → AI 분석용 페이로드 (전체 텍스트 + 테마 + 내장 이미지 최대 3장) */
async function pptxAiPayload(file) {
  const zip = await JSZip.loadAsync(file);
  const slideKeys = Object.keys(zip.files).filter(k => /^ppt\/slides\/slide\d+\.xml$/.test(k))
    .sort((a, b) => Number(a.match(/slide(\d+)/)[1]) - Number(b.match(/slide(\d+)/)[1]));
  const lines = [];
  for (let i = 0; i < slideKeys.length; i++) {
    const s = await zip.file(slideKeys[i]).async('string');
    const t = [...s.matchAll(/<a:t>(.*?)<\/a:t>/g)].map(m => m[1].replace(/&amp;/g, '&')).filter(Boolean).join(' | ');
    const pics = (s.match(/<p:pic>/g) || []).length;
    lines.push(`슬라이드 ${i + 1} (이미지 ${pics}개): ${t || '(텍스트 없음)'}`);
  }
  let themeNote = '';
  const themeKey = Object.keys(zip.files).find(k => /ppt\/theme\/theme\d*\.xml/.test(k));
  if (themeKey) {
    const xml = await zip.file(themeKey).async('string');
    const pick = tag => { const m = xml.match(new RegExp(`<a:${tag}>.*?(?:val|lastClr)="([0-9A-Fa-f]{6})"`, 's')); return m ? '#' + m[1].toLowerCase() : '?'; };
    const fontM = xml.match(/<a:majorFont>\s*<a:latin[^>]*typeface="([^"]*)"/);
    themeNote = `테마 색상 — 본문글자:${pick('dk1')} 배경:${pick('lt1')} 강조1:${pick('accent1')} 강조2:${pick('accent2')} 강조3:${pick('accent3')} / 제목 폰트:${fontM ? fontM[1] : '?'}\n\n`;
  }
  // 내장 이미지 중 큰 것 3장
  const mediaKeys = Object.keys(zip.files).filter(k => /^ppt\/media\/.*\.(png|jpe?g)$/i.test(k)).slice(0, 10);
  const images = [];
  for (const k of mediaKeys) {
    if (images.length >= 3) break;
    const blob = await zip.file(k).async('blob');
    if (blob.size < 15000) continue; // 아이콘/장식 제외
    const block = await fileToImageBlock(new File([blob], k, { type: /png$/i.test(k) ? 'image/png' : 'image/jpeg' }));
    if (block) images.push(block);
  }
  return { text: themeNote + `파일명: ${file.name}\n총 ${slideKeys.length}장\n` + lines.join('\n').slice(0, 30000), images };
}

/* AI 분석 결과 → 등록 폼 */
function fillRegisterFormAI(guideMd, tokens, source) {
  pendingSource = source;
  const sel = document.getElementById('regLayout');
  sel.innerHTML = LAYOUTS[state.part].map(l => `<option value="${l.id}">${l.name}</option>`).join('');
  document.getElementById('regName').value = (tokens && tokens.name) || '가져온 디자인';
  if (tokens) {
    if (/^#[0-9a-f]{6}$/i.test(tokens.primary || '')) document.getElementById('regPrimary').value = tokens.primary;
    if (/^#[0-9a-f]{6}$/i.test(tokens.secondary || '')) document.getElementById('regSecondary').value = tokens.secondary;
    if (/^#[0-9a-f]{6}$/i.test(tokens.bg || '')) document.getElementById('regBg').value = tokens.bg;
    if (/^#[0-9a-f]{6}$/i.test(tokens.text || '')) document.getElementById('regText').value = tokens.text;
    if (tokens.font === 'serif' || tokens.font === 'sans') document.getElementById('regFont').value = tokens.font;
  }
  document.getElementById('regGuide').value = guideMd;
  impStatus.textContent = '✅ AI 정밀 분석 완료! 아래 폼에서 가이드 전문을 확인·수정한 뒤 등록하세요.';
  registerBox.classList.remove('hidden');
  registerBox.scrollIntoView({ behavior: 'smooth' });
}

document.getElementById('btnAnalyze').addEventListener('click', async () => {
  const file = document.getElementById('impFile').files[0];
  const url = document.getElementById('impUrl').value.trim();
  const requestedTopic = document.getElementById('impTopic').value.trim();
  pendingSourceBlob = null;
  pendingPreview = null;
  if (!file && !/^https?:\/\//.test(url)) {
    impStatus.textContent = 'PPT·이미지 파일을 선택하거나 http(s) 링크를 입력해주세요.';
    return;
  }
  const btn = document.getElementById('btnAnalyze');
  btn.disabled = true;
  impStatus.textContent = '⏳ Claude AI가 디자인 시스템을 정밀 분석하는 중… (보통 1~3분, 이미지가 있으면 더 걸립니다)';
  try {
    const payload = { mode: 'analyze', part: state.part, hint: requestedTopic };
    let source;
    if (file) {
      pendingSourceBlob = file;
      source = { type: 'file', name: file.name };
      if (/\.pptx$/i.test(file.name)) {
        const extracted = await pptxAiPayload(file);
        payload.text = extracted.text;
        payload.images = extracted.images;
        if (extracted.images[0]) pendingPreview = `data:${extracted.images[0].media_type};base64,${extracted.images[0].data}`;
      } else {
        const block = await fileToImageBlock(file);
        if (!block) throw new Error('이미지를 읽지 못했습니다');
        payload.images = [block];
        pendingPreview = `data:${block.media_type};base64,${block.data}`; // 원본 그대로 미리보기
      }
    } else {
      source = { type: 'url', url };
      payload.url = url;
    }
    const { guideMd, tokens, previewImage } = await callAI(payload, t =>
      { impStatus.textContent = `⏳ Claude AI가 디자인 시스템을 정밀 분석하는 중… ${t} (보통 1~3분, 멈춘 게 아닙니다)`; });
    if (previewImage && !pendingPreview) pendingPreview = previewImage; // URL 원본 미리보기
    fillRegisterFormAI(guideMd, tokens, source);
  } catch (err) {
    // AI 실패 → 기존 간이 분석으로 대체
    impStatus.textContent = `⚠️ AI 분석 실패(${err.message}) — 간이 분석으로 대체합니다.`;
    const finish = result => { if (result && requestedTopic) result.topic = requestedTopic; fillRegisterForm(result, file ? { type: 'file', name: file.name } : { type: 'url', url }); };
    if (file && /\.pptx$/i.test(file.name)) analyzePptx(file, finish);
    else if (file) { if (!pendingPreview) fileToImageBlock(file).then(b => { if (b) pendingPreview = `data:${b.media_type};base64,${b.data}`; }); analyzeImage(file, finish); }
    else analyzeUrl(url, finish);
  } finally {
    btn.disabled = false;
  }
});

document.getElementById('btnOpenRegister').addEventListener('click', () => {
  pendingSource = null;
  pendingSourceBlob = null;
  const sel = document.getElementById('regLayout');
  sel.innerHTML = LAYOUTS[state.part].map(l => `<option value="${l.id}">${l.name}</option>`).join('');
  document.getElementById('regGuide').value = '';
  registerBox.classList.remove('hidden');
  registerBox.scrollIntoView({ behavior: 'smooth' });
});
document.getElementById('btnCancelRegister').addEventListener('click', () => {
  pendingSource = null;
  pendingSourceBlob = null;
  hideRegisterBox();
});

document.getElementById('btnSaveDesign').addEventListener('click', () => {
  const name = document.getElementById('regName').value.trim();
  if (!name) { alert('디자인 이름을 입력해주세요.'); return; }
  const guideFull = document.getElementById('regGuide').value.trim();
  const design = {
    id: 'custom-' + Date.now(),
    part: state.part,
    name,
    layout: document.getElementById('regLayout').value,
    guideMd: guideFull,                                            // 원본 가이드 md 전문 (그대로 보관·표시)
    guide: guideFull.split('\n').find(l => l.trim() && !/^#/.test(l))?.slice(0, 160) || guideFull.slice(0, 160),
    tokens: {
      primary: document.getElementById('regPrimary').value,
      secondary: document.getElementById('regSecondary').value,
      bg: document.getElementById('regBg').value,
      text: document.getElementById('regText').value,
      font: document.getElementById('regFont').value,
    },
  };
  if (pendingSource) {
    design.source = pendingSource;
    design.ref = pendingSource.type === 'url'
      ? '링크에서 디자인가이드 복제: ' + pendingSource.url
      : 'PPT에서 디자인가이드 복제: ' + pendingSource.name;
    if (pendingSourceBlob) idbPut(design.id, pendingSourceBlob);
  }
  if (pendingPreview) {
    design.hasPreview = true;                 // 원본 모습 그대로 썸네일·미리보기에 표시
    idbPut('preview-' + design.id, pendingPreview);
  }
  saveCustomDesigns([...loadCustomDesigns(), design]);
  document.getElementById('regName').value = '';
  document.getElementById('impFile').value = '';
  document.getElementById('impUrl').value = '';
  pendingSource = null;
  pendingSourceBlob = null;
  pendingPreview = null;
  hideRegisterBox();
  importBox.classList.add('hidden');
  renderDesignGrid();
});

/* ---------- STEP 3: 자료 업로드 (대량 파일 + 링크) ---------- */
state.images = [];   // 업로드한 사진 dataURL 목록 (첫 장이 대표 이미지)
state.imageCredits = []; // 사진 출처와 라이선스 고지
state.sourceSections = []; // PPTX에서 추출한 슬라이드별 원고 구조
state.textNotes = []; // 업로드한 텍스트 파일 내용

function smartTitle(value, max = 64) {
  const clean = String(value || '').replace(/^#{1,6}\s*/, '').trim();
  if (clean.length <= max) return clean;
  const boundary = clean.lastIndexOf(' ', max);
  return clean.slice(0, boundary > max * .55 ? boundary : max).trim().replace(/[,:;—-]+$/, '') + '…';
}

function resizeImageFile(file, cb) {
  const fr = new FileReader();
  fr.onload = () => {
    const im = new Image();
    im.onload = () => {
      const max = 1600, scale = Math.min(1, max / Math.max(im.width, im.height));
      const cv = document.createElement('canvas');
      cv.width = Math.round(im.width * scale);
      cv.height = Math.round(im.height * scale);
      const ctx = cv.getContext('2d');
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, cv.width, cv.height);
      ctx.drawImage(im, 0, 0, cv.width, cv.height);
      cb(cv.toDataURL('image/jpeg', 0.85));
    };
    im.onerror = () => cb(fr.result);
    im.src = fr.result;
  };
  fr.onerror = () => cb(null);
  fr.readAsDataURL(file);
}

function renderFileList() {
  const box = document.getElementById('fileList');
  const rows = [
    ...state.images.map((src, i) =>
      `<div class="file-row"><img src="${src}"><span>${i === 0 ? '⭐ 대표 이미지' : '사진 ' + (i + 1)}${state.imageCredits[i] ? ' · ' + state.imageCredits[i].title : ''}</span><button class="btn sm" data-rmimg="${i}">제거</button></div>`),
    ...state.textNotes.map((n, i) =>
      `<div class="file-row"><span class="file-ic">📄</span><span>${n.name} — 제목·설명에 반영됨</span><button class="btn sm" data-rmtxt="${i}">제거</button></div>`),
  ];
  box.classList.toggle('hidden', !rows.length);
  box.innerHTML = rows.join('');
  box.querySelectorAll('[data-rmimg]').forEach(b => b.addEventListener('click', () => { state.images.splice(+b.dataset.rmimg, 1); state.imageCredits.splice(+b.dataset.rmimg, 1); renderFileList(); }));
  box.querySelectorAll('[data-rmtxt]').forEach(b => b.addEventListener('click', () => { state.textNotes.splice(+b.dataset.rmtxt, 1); renderFileList(); }));
}

async function extractPptxContent(file) {
  const status = document.getElementById('imageStatus');
  status.textContent = `“${file.name}”에서 슬라이드 원고와 사진을 읽는 중…`;
  try {
    const zip = await JSZip.loadAsync(file);
    const slideFiles = Object.keys(zip.files).filter(k => /^ppt\/slides\/slide\d+\.xml$/.test(k))
      .sort((a,b) => Number(a.match(/slide(\d+)/)[1]) - Number(b.match(/slide(\d+)/)[1]));
    const decode = s => s.replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&quot;/g,'"').replace(/&apos;/g,"'");
    const sections = [];
    for (const path of slideFiles) {
      const xml = await zip.file(path).async('string');
      const paragraphs = [...xml.matchAll(/<a:p(?:\s[^>]*)?>([\s\S]*?)<\/a:p>/g)].map(pm =>
        [...pm[1].matchAll(/<a:t(?:\s[^>]*)?>([\s\S]*?)<\/a:t>/g)].map(tm => decode(tm[1])).join('').trim()
      ).filter(Boolean);
      const texts = paragraphs.length ? paragraphs : [...xml.matchAll(/<a:t(?:\s[^>]*)?>([\s\S]*?)<\/a:t>/g)].map(m=>decode(m[1]).trim()).filter(Boolean);
      if (texts.length) sections.push({ heading: texts[0].slice(0, 100), body: texts.slice(1).join('\n'), cover: sections.length === 0 });
    }
    if (!sections.length) throw new Error('읽을 수 있는 텍스트가 없습니다. 이미지 기반 PPT인지 확인해 주세요.');
    state.sourceSections = sections;
    state.textNotes.push({ name: file.name, text: sections.map(s => `${s.heading}\n${s.body}`).join('\n\n') });
    const titleEl = document.getElementById('cTitle'), descEl = document.getElementById('cDesc');
    if (!titleEl.value.trim()) titleEl.value = smartTitle(sections[0].heading || file.name.replace(/\.pptx$/i,''));
    descEl.value = sections.map(s => `## ${s.heading}${s.body ? `\n${s.body}` : ''}`).join('\n\n');
    const media = Object.keys(zip.files).filter(k => /^ppt\/media\/[^/]+\.(?:jpe?g|png|webp)$/i.test(k)).sort().slice(0, 6);
    for (const path of media) {
      const blob = await zip.file(path).async('blob');
      const ext = path.split('.').pop().toLowerCase(), mime = ext === 'png' ? 'image/png' : ext === 'webp' ? 'image/webp' : 'image/jpeg';
      const sourceFile = new File([blob], path.split('/').pop(), { type: mime });
      await new Promise(resolve => resizeImageFile(sourceFile, dataUrl => {
        if (dataUrl) {
          state.images.push(dataUrl);
          state.imageCredits.push({ title: `${file.name} 내장 이미지`, author: '사용자 제공', license: '원본 PPT' });
        }
        resolve();
      }));
    }
    status.textContent = `${sections.length}개 슬라이드의 텍스트를 가져왔습니다. ${media.length ? `${media.length}개 내장 이미지도 추출했습니다.` : '사진이 없어 생성할 때 주제에 맞는 공개 이미지도 찾아 배치합니다.'} 제목과 원고를 수정한 뒤 생성하세요.`;
    renderFileList();
  } catch (err) {
    status.textContent = `PPTX에서 텍스트를 가져오지 못했습니다: ${err.message}`;
  }
}

function handleIncomingFiles(files) {
  for (const file of files) {
    if (file.type.startsWith('image/')) {
      state.sourceSections = [];
      resizeImageFile(file, dataUrl => { if (dataUrl) { state.images.push(dataUrl); state.imageCredits.push(null); } renderFileList(); });
    } else if (/\.pptx$/i.test(file.name)) {
      extractPptxContent(file);
    } else if (/\.docx$/i.test(file.name)) {
      // 워드 문서: 문단 텍스트를 추출해 제목·원고 자동 채움
      JSZip.loadAsync(file).then(zip => zip.file('word/document.xml').async('string')).then(xml => {
        const text = xml.split(/<\/w:p>/)
          .map(p => [...p.matchAll(/<w:t[^>]*>([\s\S]*?)<\/w:t>/g)].map(m => m[1]).join(''))
          .map(t => t.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').trim())
          .filter(Boolean).join('\n');
        state.textNotes.push({ name: file.name, text });
        const lines = text.split(/\n+/).filter(Boolean);
        const titleEl = document.getElementById('cTitle');
        const descEl = document.getElementById('cDesc');
        const firstTitle = lines[0] ? smartTitle(lines[0]) : '';
        if (!titleEl.value.trim() && firstTitle) titleEl.value = firstTitle;
        descEl.value = (descEl.value.trim() ? descEl.value + '\n' : '') + lines.join('\n');
        renderFileList();
      }).catch(() => alert(file.name + ' 문서를 읽지 못했습니다.'));
    } else {
      state.sourceSections = [];
      const fr = new FileReader();
      fr.onload = () => {
        const text = String(fr.result).trim();
        state.textNotes.push({ name: file.name, text });
        // 업로드한 글을 근거로 빈 칸 자동 채우기
        const lines = text.split(/\n+/).filter(Boolean);
        const titleEl = document.getElementById('cTitle');
        const descEl = document.getElementById('cDesc');
        const firstTitle = lines[0] ? smartTitle(lines[0]) : '';
        if (!titleEl.value.trim() && firstTitle) titleEl.value = firstTitle;
        const body = lines.slice(titleEl.value === firstTitle ? 1 : 0).join('\n');
        descEl.value = (descEl.value.trim() ? descEl.value + '\n' : '') + body;
        renderFileList();
      };
      fr.readAsText(file);
    }
  }
}

document.getElementById('cFiles').addEventListener('change', e => {
  handleIncomingFiles(e.target.files);
  e.target.value = '';
});
document.getElementById('btnPickFiles').addEventListener('click', () => document.getElementById('cFiles').click());

/* 자료 입력창에 파일을 끌어다 놓기 */
const dropzone = document.getElementById('dropzone');
['dragenter', 'dragover'].forEach(ev => dropzone.addEventListener(ev, e => {
  e.preventDefault(); dropzone.classList.add('is-dragging');
}));
['dragleave', 'drop'].forEach(ev => dropzone.addEventListener(ev, e => {
  e.preventDefault();
  if (ev === 'drop' || !dropzone.contains(e.relatedTarget)) dropzone.classList.remove('is-dragging');
}));
dropzone.addEventListener('drop', e => {
  if (e.dataTransfer && e.dataTransfer.files.length) handleIncomingFiles(e.dataTransfer.files);
});

document.getElementById('cDesc').addEventListener('input', () => { state.sourceSections = []; });

/* ---------- STEP 3: 내용 입력 → 생성 ---------- */
document.getElementById('btnBack2').addEventListener('click', () => goStep(2));

function plainMetadata(value) {
  const doc = new DOMParser().parseFromString(String(value || ''), 'text/html');
  return (doc.body.textContent || '').replace(/\s+/g, ' ').trim();
}

async function searchCommonsImages(query, limit = 5) {
  const params = new URLSearchParams({
    action: 'query', generator: 'search', gsrsearch: query, gsrnamespace: '6', gsrwhat: 'text', gsrlimit: '20',
    prop: 'imageinfo', iiprop: 'url|mime|extmetadata', iiurlwidth: '1400', format: 'json', origin: '*',
  });
  const response = await fetch(`https://commons.wikimedia.org/w/api.php?${params}`);
  if (!response.ok) throw new Error(`Commons ${response.status}`);
  const data = await response.json();
  const pages = Object.values(data.query?.pages || {}).sort((a,b) => a.index - b.index);
  const candidates = pages.map(page => {
    const info = page.imageinfo && page.imageinfo[0];
    const meta = info?.extmetadata || {};
    const license = plainMetadata(meta.LicenseShortName?.value);
    const mime = info?.mime || '';
    const url = info?.thumburl || info?.url;
    if (!/^image\/(?:jpeg|png|webp)$/i.test(mime) || !url || /\bNC\b|Noncommercial/i.test(license)) return null;
    if (!/(CC\s*BY(?:-SA)?|CC0|Public Domain)/i.test(license)) return null;
    return {
      title: page.title.replace(/^File:/, ''), url,
      source: info.descriptionurl || `https://commons.wikimedia.org/wiki/${encodeURIComponent(page.title.replace(/ /g,'_'))}`,
      author: plainMetadata(meta.Artist?.value || meta.Credit?.value || '저자 미표기'),
      license,
    };
  }).filter(Boolean).slice(0, limit);
  const withData = await Promise.all(candidates.map(item => new Promise(resolve => {
    fetch(item.url).then(r => { if (!r.ok) throw new Error('image fetch failed'); return r.blob(); }).then(blob => {
      const file = new File([blob], item.title, { type: blob.type || 'image/jpeg' });
      resizeImageFile(file, src => resolve({ ...item, src: src || item.url }));
    }).catch(() => resolve({ ...item, src: item.url }));
  })));
  return withData;
}

document.getElementById('btnGenerate').addEventListener('click', async () => {
  const rawDescription = document.getElementById('cDesc').value.trim();
  const inferredTitle = smartTitle(rawDescription.split(/\n+/).map(s => s.trim()).filter(Boolean)[0] || '');
  const chosenTitle = document.getElementById('cTitle').value.trim() || inferredTitle;
  if (chosenTitle && !document.getElementById('cTitle').value.trim()) document.getElementById('cTitle').value = chosenTitle;
  const content = {
    title: chosenTitle,
    subtitle: document.getElementById('cSubtitle').value.trim(),
    date: document.getElementById('cDate').value.trim(),
    place: document.getElementById('cPlace').value.trim(),
    desc: rawDescription,
    host: document.getElementById('cHost').value.trim(),
    cta: document.getElementById('cCta').value.trim(),
    image: state.images[0] || null,
    images: state.images.slice(0, 8),
    imageCredits: state.imageCredits.slice(0, 8),
    sections: state.sourceSections.slice(),
    links: document.getElementById('cLinks').value.split(/\n+/).map(s => s.trim()).filter(s => /^https?:\/\//.test(s)),
  };
  if (!content.title) { alert('원고/PPT를 넣거나 제목을 입력해주세요.'); return; }
  const button = document.getElementById('btnGenerate'), status = document.getElementById('imageStatus');
  button.disabled = true;
  try {
    if (content.images.length < 2) {
      status.textContent = '주제와 강의 내용을 바탕으로 재사용 가능한 이미지와 라이선스 정보를 찾는 중…';
      const sectionText = content.sections.slice(0, 3).map(s => typeof s === 'string' ? s : `${s.heading} ${s.body || ''}`).join(' ');
      const query = [content.title, content.subtitle, sectionText || content.desc.slice(0, 220)].filter(Boolean).join(' ').slice(0, 420);
      try {
        const found = (await searchCommonsImages(query, 5 - content.images.length)).filter(item => item.src);
        for (const item of found) {
          content.images.push(item.src); content.imageCredits.push(item);
        }
        content.image = content.images[0] || null;
        status.textContent = found.length
          ? `${found.length}장의 공개 라이선스 이미지를 넣었습니다. 출처와 라이선스는 마지막 장에 표시됩니다.`
          : '조건에 맞는 공개 이미지를 찾지 못해 템플릿의 기본 배경을 사용합니다. 사진을 직접 올리면 주제에 맞는 결과를 만들 수 있습니다.';
      } catch (err) {
        status.textContent = '이미지 검색에 연결하지 못해 템플릿 기본 배경으로 생성합니다. 사진을 직접 올리면 함께 배치됩니다.';
      }
    }
    // ---- 1차: Claude AI가 디자인가이드 전문 + 원고 전체로 결과물 생성 ----
    state.aiGenerated = false;
    try {
      const guideMd = state.design.guideMd || generateGuideMd(state.design);
      const contentText = [
        `제목: ${content.title}`,
        content.subtitle && `부제: ${content.subtitle}`,
        content.date && `일시: ${content.date}`,
        content.place && `장소: ${content.place}`,
        content.host && `주최/문의: ${content.host}`,
        content.cta && `CTA 버튼 문구: ${content.cta}`,
        content.links.length && `참고 링크: ${content.links.join(', ')}`,
        '',
        content.sections.length
          ? '원고(슬라이드별 추출):\n' + content.sections.map((s, i) => typeof s === 'string' ? s : `## ${s.heading || '섹션 ' + (i + 1)}\n${s.body || ''}`).join('\n\n')
          : '원고:\n' + content.desc,
      ].filter(Boolean).join('\n');
      const imageList = content.images.map((_, i) => {
        const credit = content.imageCredits[i];
        return credit ? `${credit.title || '사진'} (출처: ${credit.author || ''} ${credit.license || ''})`.trim() : `사용자 업로드 사진 ${i + 1}`;
      });
      status.textContent = '🎨 Claude AI가 디자인가이드대로 결과물을 제작하는 중… (보통 1~5분, 창을 닫지 마세요)';
      const { html } = await callAI({ mode: 'compose', part: state.part, guideMd, content: contentText, imageList },
        t => { status.textContent = `🎨 Claude AI가 디자인가이드대로 결과물을 제작하는 중… ${t} (보통 1~5분, 멈춘 게 아닙니다)`; });
      // {{IMAGE_n}} 플레이스홀더를 실제 이미지로 치환
      let finalHtml = html;
      content.images.forEach((src, i) => { finalHtml = finalHtml.split(`{{IMAGE_${i + 1}}}`).join(src); });
      finalHtml = finalHtml.replace(/\{\{IMAGE_\d+\}\}/g, content.images[0] || '');
      state.resultHtml = finalHtml;
      state.aiGenerated = true;
      status.textContent = '';
    } catch (err) {
      // ---- 2차: AI 불가 시 기존 템플릿 렌더러로 생성 ----
      status.textContent = `AI 생성 실패(${err.message}) — 기본 템플릿 방식으로 생성했습니다.`;
      state.resultHtml = RENDERERS[state.part](state.design, content);
    }
    state.resultContent = content;
    showResult(content);
    goStep(4);
  } finally {
    button.disabled = false;
  }
});

/* ---------- STEP 4: 결과 표시 / 다운로드 ---------- */
let iframe = null;
function showResult() {
  const frame = document.getElementById('resultFrame');
  frame.innerHTML = '<iframe id="previewFrame"></iframe>';
  iframe = document.getElementById('previewFrame');
  const isPPT = state.part === 'ppt';
  state.slideCount = 0;
  state.currentSlide = 0;
  // AI 생성 결과는 HTML/PDF로 출력 (PPTX 변환은 템플릿 생성에서만)
  document.getElementById('btnDownload').classList.toggle('hidden', !isPPT || state.aiGenerated);
  document.getElementById('btnDownloadHtml').classList.toggle('hidden', isPPT && !state.aiGenerated);
  document.getElementById('exportStatus').textContent = state.aiGenerated
    ? '✨ AI가 디자인가이드대로 제작했습니다. HTML로 저장하거나 🖨 인쇄 → PDF 저장으로 출력하세요.'
    : isPPT
      ? '텍스트·제목·도형은 PowerPoint에서 개별 편집할 수 있습니다. 사진은 별도의 이미지 개체로 삽입됩니다.'
      : '미리보기 파일은 HTML로 저장하거나 인쇄 메뉴에서 PDF로 저장할 수 있습니다.';
  document.getElementById('slideNav').classList.toggle('hidden', !isPPT);
  if (isPPT) iframe.onload = () => {
    state.slideCount = iframe.contentDocument.querySelectorAll('.slide').length;
    updateSlideIndicator();
  };
  iframe.srcdoc = state.resultHtml;
}

function updateSlideIndicator() {
  document.getElementById('slideIndicator').textContent = `${state.currentSlide + 1} / ${state.slideCount}`;
  const doc = iframe.contentDocument;
  if (!doc) return;
  const slides = doc.querySelectorAll('.slide');
  if (slides[state.currentSlide]) slides[state.currentSlide].scrollIntoView({ behavior: 'smooth' });
}
document.getElementById('prevSlide').addEventListener('click', () => {
  if (state.currentSlide > 0) { state.currentSlide--; updateSlideIndicator(); }
});
document.getElementById('nextSlide').addEventListener('click', () => {
  if (state.currentSlide < state.slideCount - 1) { state.currentSlide++; updateSlideIndicator(); }
});

document.getElementById('btnDownload').addEventListener('click', async () => {
  const button = document.getElementById('btnDownload');
  const status = document.getElementById('exportStatus');
  if (!state.design || !state.resultContent) {
    status.textContent = '먼저 PPT를 생성해 주세요.';
    return;
  }
  const original = button.textContent;
  button.disabled = true;
  button.textContent = 'PPTX 만드는 중…';
  try {
    const filename = await window.downloadEditablePptx(state.design, state.resultContent, message => { status.textContent = message; });
    status.textContent = `${filename} 다운로드를 시작했습니다. 제목·본문·도형은 PowerPoint에서 편집할 수 있습니다.`;
  } catch (err) {
    status.textContent = `PPTX를 만들지 못했습니다: ${err && err.message ? err.message : err}`;
  } finally {
    button.disabled = false;
    button.textContent = original;
  }
});

document.getElementById('btnDownloadHtml').addEventListener('click', () => {
  const blob = new Blob([state.resultHtml], { type: 'text/html;charset=utf-8' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `${PART_NAMES[state.part]}_${document.getElementById('cTitle').value.trim() || 'design'}.html`;
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
});

document.getElementById('btnPrint').addEventListener('click', () => {
  iframe.contentWindow.focus();
  iframe.contentWindow.print();
});

document.getElementById('btnRestart').addEventListener('click', () => {
  state.part = null; state.design = null; state.resultHtml = null; state.resultContent = null;
  state.images = []; state.imageCredits = []; state.sourceSections = []; state.textNotes = [];
  ['cTitle','cSubtitle','cDate','cPlace','cDesc','cHost','cCta','cLinks'].forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });
  document.getElementById('cFiles').value = '';
  document.getElementById('imageStatus').textContent = '이미지가 없으면 주제에 맞는 공개 라이선스 이미지를 찾아 자동으로 배치하고 슬라이드에 출처를 표시합니다.';
  renderFileList();
  goStep(1);
});
