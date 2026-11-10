/* app.js — 4단계 마법사 로직 + 표준디자인 등록(localStorage) */

const PART_NAMES = { ppt: 'PPT', poster: '포스터', landing: '랜딩페이지' };
const STORE_KEY = 'designai_custom_designs_v1';

const state = { part: null, design: null, resultHtml: null, slideCount: 0, currentSlide: 0 };

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
  const html = sampleHtml(d).replace(/&/g, '&amp;').replace(/"/g, '&quot;');
  const W = { ppt: 1340, poster: 740, landing: 1320 }[d.part];
  const scale = (300 / W).toFixed(3);
  const style = `width:${W}px; height:${Math.round(W * 1.7)}px; transform:scale(${scale});`;
  return `<div class="thumb"><iframe loading="lazy" scrolling="no" tabindex="-1" style="${style}" srcdoc="${html}"></iframe><div class="thumb-hint">클릭하면 실물 전체 보기</div></div>`;
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

/* ---------- 디자인 가이드 모달 (보기 · 복제) ---------- */
let guideDesign = null;
const guideModal = document.getElementById('guideModal');

function openGuide(design) {
  guideDesign = design;
  const t = design.tokens;
  document.getElementById('guideTitle').textContent = `${design.name} — 실물 미리보기`;
  document.getElementById('guideRef').textContent = design.ref || '사용자 등록 디자인';
  document.getElementById('guideFrame').srcdoc = sampleHtml(design); // 샘플 내용으로 실제 렌더링
  const spec = LAYOUT_SPECS[design.part + ':' + design.layout] || [];
  document.getElementById('guideSpec').textContent = spec.length
    ? spec.map((x, i) => `${i + 1}. ${x}`).join('\n')
    : '요소 명세는 .md 다운로드에서 확인하세요.';
  document.getElementById('guideText').textContent = design.guide ||
    `레이아웃: ${(LAYOUTS[design.part].find(l => l.id === design.layout) || {}).name || design.layout}`;
  document.getElementById('guideSwatches').innerHTML = [
    ['주 색상', t.primary], ['보조 색상', t.secondary], ['배경', t.bg], ['글자', t.text],
  ].map(([k, v]) => `<div class="swatch"><span style="background:${v}"></span><small>${k}<br>${v}</small></div>`).join('')
    + `<div class="swatch"><span class="fontchip">${t.font === 'serif' ? '明' : 'Aa'}</span><small>글꼴<br>${t.font === 'serif' ? '명조' : '고딕'}</small></div>`;
  document.getElementById('guideJson').textContent = JSON.stringify(
    { part: design.part, layout: design.layout, tokens: design.tokens, guide: design.guide || '' }, null, 2);
  guideModal.classList.remove('hidden');
}
document.getElementById('btnCloseGuide').addEventListener('click', () => guideModal.classList.add('hidden'));
guideModal.addEventListener('click', e => { if (e.target === guideModal) guideModal.classList.add('hidden'); });

document.getElementById('btnUseGuide').addEventListener('click', () => {
  guideModal.classList.add('hidden');
  selectDesign(guideDesign);
});

document.getElementById('btnDownloadGuide').addEventListener('click', () => {
  const md = generateGuideMd(guideDesign);
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
  registerBox.classList.remove('hidden');
  registerBox.scrollIntoView({ behavior: 'smooth' });
});

/* ---------- 표준디자인 등록 ---------- */
const registerBox = document.getElementById('registerBox');
function hideRegisterBox() { registerBox.classList.add('hidden'); }
let pendingSource = null;      // 분석 중인 원소스 { type:'file'|'url', name?/url? }
let pendingSourceBlob = null;  // pptx 원본 Blob

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
    if (!themeFile) throw new Error('테마 파일이 없습니다');
    return zip.file(themeFile).async('string');
  }).then(xml => {
    const pick = tag => {
      const m = xml.match(new RegExp(`<a:${tag}>.*?(?:val|lastClr)="([0-9A-Fa-f]{6})"`, 's'));
      return m ? '#' + m[1].toLowerCase() : null;
    };
    const fontM = xml.match(/<a:majorFont>\s*<a:latin[^>]*typeface="([^"]*)"/);
    done({
      primary: pick('accent1') || '#2563eb',
      secondary: pick('accent2') || '#f59e0b',
      bg: pick('lt1') || '#ffffff',
      text: pick('dk1') || '#1f2937',
      font: isSerifFont(fontM && fontM[1]) ? 'serif' : 'sans',
      title: file.name.replace(/\.pptx$/i, ''),
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
      done({
        primary: (themeM && themeM[1]) || (vivid[0] && vivid[0].hex) || '#2563eb',
        secondary: (vivid[1] && vivid[1].hex) || '#f59e0b',
        bg: (lights[0] && lights[0].hex) || '#ffffff',
        text: (darks[0] && darks[0].hex) || '#1f2937',
        font: isSerifFont((html.match(/font-family:\s*([^;}]{0,80})/i) || [])[1]) ? 'serif' : 'sans',
        title: titleM ? titleM[1].trim() : url.replace(/^https?:\/\//, '').split('/')[0],
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
    impStatus.textContent = '✅ 분석 완료! 아래 등록 폼에서 확인·수정 후 등록하세요.';
  }
  registerBox.classList.remove('hidden');
  registerBox.scrollIntoView({ behavior: 'smooth' });
}

document.getElementById('btnAnalyze').addEventListener('click', () => {
  const file = document.getElementById('impFile').files[0];
  const url = document.getElementById('impUrl').value.trim();
  pendingSourceBlob = null;
  if (file) {
    pendingSourceBlob = file;
    analyzePptx(file, result => fillRegisterForm(result, { type: 'file', name: file.name }));
  } else if (/^https?:\/\//.test(url)) {
    analyzeUrl(url, result => fillRegisterForm(result, { type: 'url', url }));
  } else {
    impStatus.textContent = 'PPT 파일을 선택하거나 http(s) 링크를 입력해주세요.';
  }
});

document.getElementById('btnOpenRegister').addEventListener('click', () => {
  pendingSource = null;
  pendingSourceBlob = null;
  const sel = document.getElementById('regLayout');
  sel.innerHTML = LAYOUTS[state.part].map(l => `<option value="${l.id}">${l.name}</option>`).join('');
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
  const design = {
    id: 'custom-' + Date.now(),
    part: state.part,
    name,
    layout: document.getElementById('regLayout').value,
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
  saveCustomDesigns([...loadCustomDesigns(), design]);
  document.getElementById('regName').value = '';
  document.getElementById('impFile').value = '';
  document.getElementById('impUrl').value = '';
  pendingSource = null;
  pendingSourceBlob = null;
  hideRegisterBox();
  importBox.classList.add('hidden');
  renderDesignGrid();
});

/* ---------- STEP 3: 자료 업로드 (대량 파일 + 링크) ---------- */
state.images = [];   // 업로드한 사진 dataURL 목록 (첫 장이 대표 이미지)
state.textNotes = []; // 업로드한 텍스트 파일 내용

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
    im.src = fr.result;
  };
  fr.readAsDataURL(file);
}

function renderFileList() {
  const box = document.getElementById('fileList');
  const rows = [
    ...state.images.map((src, i) =>
      `<div class="file-row"><img src="${src}"><span>${i === 0 ? '⭐ 대표 이미지' : '사진 ' + (i + 1)}</span><button class="btn sm" data-rmimg="${i}">제거</button></div>`),
    ...state.textNotes.map((n, i) =>
      `<div class="file-row"><span class="file-ic">📄</span><span>${n.name} — 제목·설명에 반영됨</span><button class="btn sm" data-rmtxt="${i}">제거</button></div>`),
  ];
  box.classList.toggle('hidden', !rows.length);
  box.innerHTML = rows.join('');
  box.querySelectorAll('[data-rmimg]').forEach(b => b.addEventListener('click', () => { state.images.splice(+b.dataset.rmimg, 1); renderFileList(); }));
  box.querySelectorAll('[data-rmtxt]').forEach(b => b.addEventListener('click', () => { state.textNotes.splice(+b.dataset.rmtxt, 1); renderFileList(); }));
}

document.getElementById('cFiles').addEventListener('change', e => {
  for (const file of e.target.files) {
    if (file.type.startsWith('image/')) {
      resizeImageFile(file, dataUrl => { state.images.push(dataUrl); renderFileList(); });
    } else {
      const fr = new FileReader();
      fr.onload = () => {
        const text = String(fr.result).trim();
        state.textNotes.push({ name: file.name, text });
        // 업로드한 글을 근거로 빈 칸 자동 채우기
        const lines = text.split(/\n+/).filter(Boolean);
        const titleEl = document.getElementById('cTitle');
        const descEl = document.getElementById('cDesc');
        if (!titleEl.value.trim() && lines[0]) titleEl.value = lines[0].replace(/^#+\s*/, '').slice(0, 60);
        const body = lines.slice(titleEl.value === lines[0]?.replace(/^#+\s*/, '').slice(0, 60) ? 1 : 0).join('\n');
        descEl.value = (descEl.value.trim() ? descEl.value + '\n' : '') + body.slice(0, 2000);
        renderFileList();
      };
      fr.readAsText(file);
    }
  }
  e.target.value = '';
});

/* ---------- STEP 3: 내용 입력 → 생성 ---------- */
document.getElementById('btnBack2').addEventListener('click', () => goStep(2));

document.getElementById('btnGenerate').addEventListener('click', () => {
  const content = {
    title: document.getElementById('cTitle').value.trim(),
    subtitle: document.getElementById('cSubtitle').value.trim(),
    date: document.getElementById('cDate').value.trim(),
    place: document.getElementById('cPlace').value.trim(),
    desc: document.getElementById('cDesc').value.trim(),
    host: document.getElementById('cHost').value.trim(),
    cta: document.getElementById('cCta').value.trim(),
    image: state.images[0] || null,
    links: document.getElementById('cLinks').value.split(/\n+/).map(s => s.trim()).filter(s => /^https?:\/\//.test(s)),
  };
  if (!content.title) { alert('제목은 꼭 입력해주세요.'); return; }

  state.resultHtml = RENDERERS[state.part](state.design, content);
  showResult(content);
  goStep(4);
});

/* ---------- STEP 4: 결과 표시 / 다운로드 ---------- */
let iframe = null;
function showResult() {
  const frame = document.getElementById('resultFrame');
  frame.innerHTML = '<iframe id="previewFrame"></iframe>';
  iframe = document.getElementById('previewFrame');
  iframe.srcdoc = state.resultHtml;

  const isPPT = state.part === 'ppt';
  state.slideCount = isPPT ? 4 : 0;
  state.currentSlide = 0;
  document.getElementById('slideNav').classList.toggle('hidden', !isPPT);
  if (isPPT) updateSlideIndicator();
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

document.getElementById('btnDownload').addEventListener('click', () => {
  const blob = new Blob([state.resultHtml], { type: 'text/html;charset=utf-8' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `${PART_NAMES[state.part]}_${document.getElementById('cTitle').value.trim() || 'design'}.html`;
  a.click();
  URL.revokeObjectURL(a.href);
});

document.getElementById('btnPrint').addEventListener('click', () => {
  iframe.contentWindow.focus();
  iframe.contentWindow.print();
});

document.getElementById('btnRestart').addEventListener('click', () => {
  state.part = null; state.design = null; state.resultHtml = null;
  goStep(1);
});
