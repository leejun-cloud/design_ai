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
function allDesigns(part) {
  return [...SEED_DESIGNS, ...loadCustomDesigns()].filter(d => d.part === part);
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

/* ---------- STEP 2: 표준디자인 목록 ---------- */
function miniPreviewHtml(d) {
  const t = d.tokens;
  const isGrad = d.layout === 'warmgrad' || d.layout === 'gradient';
  const grad = isGrad
    ? `background: linear-gradient(160deg, ${t.primary}, ${t.secondary});`
    : `background: ${t.bg};`;
  const titleColor = isGrad ? '#fff' : (t.bg === t.primary ? t.text : t.primary);
  return `<div class="mini" style="${grad}">
    <div class="mini-bar" style="background:${t.secondary}"></div>
    <div class="mini-title" style="color:${titleColor}; font-family:${t.font === 'serif' ? 'serif' : 'inherit'}">가나다 Aa</div>
    <div class="mini-line" style="background:${titleColor}; opacity:.4"></div>
    <div class="mini-line short" style="background:${titleColor}; opacity:.25"></div>
  </div>`;
}

function renderDesignGrid() {
  const grid = document.getElementById('designGrid');
  const custom = loadCustomDesigns();
  grid.innerHTML = allDesigns(state.part).map(d => {
    const isCustom = custom.some(cd => cd.id === d.id);
    const layoutName = (LAYOUTS[d.part].find(l => l.id === d.layout) || {}).name || d.layout;
    return `<div class="design-card" data-id="${d.id}">
      ${miniPreviewHtml(d)}
      <div class="design-meta">
        <strong>${d.name}</strong>
        ${isCustom ? `<button class="del" data-del="${d.id}" title="삭제">🗑</button>` : '<span class="tag">인기 샘플</span>'}
        <small>${layoutName}</small>
        ${d.ref ? `<em class="ref">${d.ref}</em>` : ''}
      </div>
      <div class="card-actions">
        <button class="btn primary sm" data-use="${d.id}">✏️ 내용 입력해 만들기</button>
        <button class="btn sm" data-guide="${d.id}">📘 디자인 가이드</button>
      </div>
    </div>`;
  }).join('');

  const pick = id => allDesigns(state.part).find(d => d.id === id);
  grid.querySelectorAll('[data-use]').forEach(btn => btn.addEventListener('click', () => selectDesign(pick(btn.dataset.use))));
  grid.querySelectorAll('[data-guide]').forEach(btn => btn.addEventListener('click', () => openGuide(pick(btn.dataset.guide))));
  grid.querySelectorAll('.del').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      if (!confirm('이 표준디자인을 삭제할까요?')) return;
      saveCustomDesigns(loadCustomDesigns().filter(d => d.id !== btn.dataset.del));
      renderDesignGrid();
    });
  });
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
  document.getElementById('guideTitle').textContent = `📘 디자인 가이드 — ${design.name}`;
  document.getElementById('guideRef').textContent = design.ref || '사용자 등록 디자인';
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

document.getElementById('btnOpenRegister').addEventListener('click', () => {
  const sel = document.getElementById('regLayout');
  sel.innerHTML = LAYOUTS[state.part].map(l => `<option value="${l.id}">${l.name}</option>`).join('');
  registerBox.classList.remove('hidden');
  registerBox.scrollIntoView({ behavior: 'smooth' });
});
document.getElementById('btnCancelRegister').addEventListener('click', hideRegisterBox);

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
  saveCustomDesigns([...loadCustomDesigns(), design]);
  document.getElementById('regName').value = '';
  hideRegisterBox();
  renderDesignGrid();
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
