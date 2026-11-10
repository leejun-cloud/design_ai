/* =====================================================
 * templates.js — 표준디자인(디자인 토큰) + 렌더러
 * 각 샘플은 인터넷에서 인기 있는 실제 스타일을 샘플링했다.
 *  - ref   : 어떤 인기 사례/트렌드를 본떴는지
 *  - guide : 레이아웃 해부(디자인 가이드 복제용)
 * 렌더러는 완성된 "독립 HTML 문서 문자열"을 반환한다.
 * ===================================================== */

const FONT_STACKS = {
  sans: "'Pretendard', 'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif",
  serif: "'Noto Serif KR', 'Apple Myungjo', serif",
};

const FONT_LINKS = `
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@400;600;700&display=swap">`;

/* ---------- 파트별 레이아웃 틀 (등록 폼 선택지) ---------- */
const LAYOUTS = {
  ppt: [
    { id: 'boldtypo',  name: '볼드 타이포 (큰 글자가 주인공)' },
    { id: 'dark',      name: '다크 모드 (테크 키노트)' },
    { id: 'editorial', name: '에디토리얼 (매거진 명조)' },
    { id: 'earthy',    name: '어스톤 미니멀 (차분한 녹색·테라코타)' },
    { id: 'corporate', name: '기업 보고서형 (네이비 그리드)' },
  ],
  poster: [
    { id: 'bigtypo',  name: '빅 타이포 (스위스 스타일)' },
    { id: 'neon',     name: '네온 누아르 (다크+형광, 공연용)' },
    { id: 'nouveau',  name: '클래식 프레임 (아르누보·전시용)' },
    { id: 'warmgrad', name: '웜 그라데이션 (오렌지·퍼플)' },
    { id: 'retro',    name: '레트로 프린트 (복고 전단)' },
  ],
  landing: [
    { id: 'event',    name: '행사 랜딩 (다크 히어로+밝은 CTA)' },
    { id: 'sales',    name: '판매 랜딩 (세일즈 레터 구조)' },
    { id: 'saas',     name: '서비스 랜딩 (벤토 그리드)' },
    { id: 'register', name: '등록 랜딩 (신청 폼 중심)' },
    { id: 'story',    name: '브랜드 스토리형 (에디토리얼 서사)' },
  ],
};

/* ---------- 인기 사례 샘플링 표준디자인 (파트별 5종) ---------- */
const SEED_DESIGNS = [
  /* ===== PPT 5종 ===== */
  { id: 'ppt-boldtypo', part: 'ppt', layout: 'boldtypo', name: '볼드 타이포',
    ref: '2026 프레젠테이션 1위 트렌드 — 장식 대신 초대형 글자 자체가 비주얼 (slideegg·visualbest 트렌드 리포트)',
    guide: '흰 배경 + 화면의 절반을 차지하는 초대형 제목. 포인트색은 핵심 숫자·단어 1곳에만. 본문은 작고 단정하게 대비.',
    tokens: { primary: '#111111', secondary: '#ff4d00', bg: '#ffffff', text: '#111111', font: 'sans' } },
  { id: 'ppt-dark', part: 'ppt', layout: 'dark', name: '다크 테크 키노트',
    ref: 'Apple 키노트·Linear 발표 스타일 — 다크 모드 발표자료 유행 (화면 피로 감소)',
    guide: '짙은 배경 + 밝은 글자 + 형광 포인트 1색. 슬라이드마다 은은한 글로우 라인. 발표장 스크린에서 가장 돋보임.',
    tokens: { primary: '#0b0f1a', secondary: '#5eead4', bg: '#0b0f1a', text: '#e2e8f0', font: 'sans' } },
  { id: 'ppt-editorial', part: 'ppt', layout: 'editorial', name: '에디토리얼 매거진',
    ref: '2026 떠오르는 스타일 — 잡지 편집 디자인 차용: 넓은 여백, 세리프, 풀 인용구 (inkppt 트렌드 가이드)',
    guide: '명조 대제목 + 넓은 여백 + 가는 구분선. 인용구를 크게 뽑는 매거진 편집 문법. 감성·인문 주제에 적합.',
    tokens: { primary: '#1c1917', secondary: '#b45309', bg: '#faf8f4', text: '#292524', font: 'serif' } },
  { id: 'ppt-earthy', part: 'ppt', layout: 'earthy', name: '어스톤 미니멀',
    ref: '2026 컬러 트렌드 — 딥 그린·웜 뉴트럴·테라코타 + 포인트 1색 (visualbest 팔레트 리포트)',
    guide: '크림 배경 + 딥그린 제목 + 테라코타 포인트. 자연스럽고 차분한 톤으로 신뢰감을 주는 구성.',
    tokens: { primary: '#1a3c34', secondary: '#c2410c', bg: '#f7f4ee', text: '#2d2a24', font: 'sans' } },
  { id: 'ppt-corporate', part: 'ppt', layout: 'corporate', name: '기업 보고서형',
    ref: '컨설팅·기업 IR 표준 양식 — 네이비+그리드+머리말 규격 (envato 인기 기업 템플릿 계열)',
    guide: '상단 머리말 띠 + 네이비 제목 + 깔끔한 그리드. 로고 자리·페이지 번호가 규격화된 비즈니스 표준.',
    tokens: { primary: '#1e3a5f', secondary: '#2e86ab', bg: '#ffffff', text: '#333d47', font: 'sans' } },

  /* ===== 포스터 5종 ===== */
  { id: 'poster-bigtypo', part: 'poster', layout: 'bigtypo', name: '빅 타이포 스위스',
    ref: '포스터 디자인의 영원한 인기 1순위 — 초대형 타이포 중심 스위스 스타일 (venngage·printify 인기 사례)',
    guide: '제목이 포스터 폭을 꽉 채우는 초대형 글자. 하단 두꺼운 구분선 아래 일시·장소. 멀리서도 읽히는 구조.',
    tokens: { primary: '#111111', secondary: '#ef4444', bg: '#f5f5f4', text: '#111111', font: 'sans' } },
  { id: 'poster-neon', part: 'poster', layout: 'neon', name: '네온 누아르',
    ref: '2026 공연·페스티벌 포스터 유행 — 언더그라운드 프린트 문화의 다크+네온 (vistaprint Neon-Noir 트렌드)',
    guide: '검정 배경 + 형광 네온 제목(글로우 효과) + 네온 테두리. 공연·파티·청년 행사에서 시선을 압도.',
    tokens: { primary: '#09090b', secondary: '#a3e635', bg: '#09090b', text: '#fafafa', font: 'sans' } },
  { id: 'poster-nouveau', part: 'poster', layout: 'nouveau', name: '아르누보 클래식',
    ref: '2026 아르누보 리바이벌 — 장식 프레임+세리프의 클래식 복귀 (artcoastdesign 트렌드 리포트)',
    guide: '이중 장식 테두리 액자 + 명조 제목 + 장식 문양. 전시·음악회·격식 있는 행사에 어울리는 품격.',
    tokens: { primary: '#14532d', secondary: '#b45309', bg: '#fdfbf3', text: '#1c1917', font: 'serif' } },
  { id: 'poster-warmgrad', part: 'poster', layout: 'warmgrad', name: '웜 그라데이션',
    ref: '2026 컬러 대세 — 딥 오렌지·리치 퍼플의 따뜻하고 선명한 그라데이션 (vistaprint 팔레트 트렌드)',
    guide: '퍼플→오렌지 대각 그라데이션 배경 + 흰 제목 + 반투명 정보 카드. 축제·모집 공고에 활력.',
    tokens: { primary: '#6d28d9', secondary: '#f97316', bg: '#ffffff', text: '#ffffff', font: 'sans' } },
  { id: 'poster-retro', part: 'poster', layout: 'retro', name: '레트로 프린트',
    ref: '노스탤지어 유행 — 복고 전단지풍: 크림 종이+두꺼운 보더+스탬프 배지 (printify 레트로 사례)',
    guide: '크림색 종이 질감 + 두꺼운 외곽 보더 + 원형 스탬프 배지. 플리마켓·바자회·동네 행사 느낌.',
    tokens: { primary: '#7c2d12', secondary: '#eab308', bg: '#fef3c7', text: '#451a03', font: 'sans' } },

  /* ===== 랜딩페이지 5종 (용도별) ===== */
  { id: 'landing-event', part: 'landing', layout: 'event', name: '행사 랜딩',
    ref: '인기 컨퍼런스·워크숍 페이지 공식 — 다크 배경+밝은 티켓 CTA+카운트다운 정보 (unbounce 행사 사례)',
    guide: '다크 히어로 + 형광 CTA 버튼("티켓 받기") + 일시·장소 카드 3개 + 소개 섹션. 내비게이션 최소화.',
    tokens: { primary: '#18181b', secondary: '#facc15', bg: '#18181b', text: '#fafafa', font: 'sans' } },
  { id: 'landing-sales', part: 'landing', layout: 'sales', name: '판매 랜딩',
    ref: '고전 세일즈 레터 구조 — 헤드라인→혜택 불릿→상세→반복 CTA (swipepages 판매 페이지 사례)',
    guide: '큰 약속형 헤드라인 + 체크 혜택 목록 + 긴 설명 + 중간·끝 CTA 2회 반복. 읽는 흐름이 곧 설득 흐름.',
    tokens: { primary: '#b91c1c', secondary: '#16a34a', bg: '#ffffff', text: '#1f2937', font: 'sans' } },
  { id: 'landing-saas', part: 'landing', layout: 'saas', name: '서비스 랜딩',
    ref: 'Linear·Stripe·Notion형 — 2026 SaaS 1위 패턴 벤토 그리드+아웃컴 헤드라인 (arounda·vezadigital 사례)',
    guide: '결과 중심 헤드라인 + 벤토 그리드(크기가 다른 정보 카드 모자이크) + 단일 CTA 고정. 스캔하기 좋은 구조.',
    tokens: { primary: '#4f46e5', secondary: '#f97316', bg: '#fafafa', text: '#18181b', font: 'sans' } },
  { id: 'landing-register', part: 'landing', layout: 'register', name: '등록 랜딩',
    ref: '전환 최적화 등록 페이지 공식 — 좌측 정보·우측 신청 폼, 단일 CTA (unbounce 등록 사례)',
    guide: '화면 분할: 왼쪽에 행사 정보, 오른쪽에 신청 폼 카드. 다른 링크 없이 등록 하나에만 집중.',
    tokens: { primary: '#0e7490', secondary: '#f59e0b', bg: '#ecfeff', text: '#164e63', font: 'sans' } },
  { id: 'landing-story', part: 'landing', layout: 'story', name: '브랜드 스토리형',
    ref: '에디토리얼 랜딩 — 매거진처럼 읽히는 서사 구조, 드롭캡+넓은 행간 (sitesplaced 브랜드 사례)',
    guide: '가운데 정렬 명조 제목 + 드롭캡으로 시작하는 본문 + 긴 행간. 이야기로 설득하는 브랜드·소개 페이지.',
    tokens: { primary: '#334155', secondary: '#a16207', bg: '#faf9f7', text: '#292524', font: 'serif' } },
];

/* ---------- 공통 유틸 ---------- */
function esc(s) {
  return String(s || '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
}
function paragraphs(desc) {
  return String(desc || '').split(/\n+/).filter(Boolean).map(p => `<p>${esc(p)}</p>`).join('');
}
function descLines(desc) {
  return String(desc || '').split(/\n+/).filter(Boolean);
}
function docShell(title, css, body) {
  return `<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(title)}</title>
${FONT_LINKS}
<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
${css}
</style>
</head>
<body>${body}</body>
</html>`;
}

/* =====================================================
 * PPT 렌더러 — 16:9 슬라이드 4장 (표지/안내/내용/마무리)
 * ===================================================== */
function renderPPT(design, c) {
  const t = design.tokens;
  const font = FONT_STACKS[t.font];
  const accent = t.secondary;
  const infoRows = [
    c.date && `<div class="row"><span class="k">📅 날짜</span><span>${esc(c.date)}</span></div>`,
    c.place && `<div class="row"><span class="k">📍 장소</span><span>${esc(c.place)}</span></div>`,
    c.host && `<div class="row"><span class="k">👥 주최</span><span>${esc(c.host)}</span></div>`,
  ].filter(Boolean).join('');

  let css = `
body { background: #555; font-family: ${font}; }
.slide { width: 1280px; max-width: 100%; aspect-ratio: 16/9; margin: 24px auto;
  background: ${t.bg}; color: ${t.text}; overflow: hidden; position: relative;
  padding: 70px 90px; display: flex; flex-direction: column; justify-content: center;
  box-shadow: 0 4px 24px rgba(0,0,0,.35); }
.slide h1 { font-size: 64px; line-height: 1.15; word-break: keep-all; }
.slide h2 { font-size: 42px; margin-bottom: 36px; }
.slide .sub { font-size: 25px; opacity: .8; margin-top: 18px; }
.row { display: flex; gap: 24px; font-size: 27px; margin: 14px 0; }
.row .k { font-weight: 700; min-width: 130px; }
.desc p { font-size: 23px; line-height: 1.7; margin: 12px 0; }
.pagenum { position: absolute; bottom: 26px; right: 40px; font-size: 15px; opacity: .5; }
@media print { body { background: none; } .slide { margin: 0; box-shadow: none; page-break-after: always; width: 100%; } }`;

  let deco = '';
  if (design.layout === 'boldtypo') {
    css += `
.slide { align-items: flex-start; }
.slide.cover h1 { font-size: 110px; font-weight: 900; letter-spacing: -.02em; }
.badge { color: ${accent}; font-weight: 800; font-size: 24px; letter-spacing: .15em; margin-bottom: 20px; }
.slide h2 { font-weight: 900; font-size: 56px; }
.row .k { color: ${accent}; }`;
  } else if (design.layout === 'dark') {
    css += `
.glow { position: absolute; left: 90px; right: 90px; top: 58px; height: 2px;
  background: linear-gradient(90deg, ${accent}, transparent); box-shadow: 0 0 18px ${accent}; }
.slide h1 { font-weight: 800; }
.slide h2, .row .k { color: ${accent}; }
.badge { display: inline-block; border: 1px solid ${accent}; color: ${accent};
  padding: 6px 20px; border-radius: 999px; font-size: 19px; margin-bottom: 26px; width: fit-content; }`;
    deco = `<div class="glow"></div>`;
  } else if (design.layout === 'editorial') {
    css += `
.slide { align-items: center; text-align: center; }
.rule { width: 70px; height: 1px; background: ${t.text}; margin: 30px auto; opacity: .5; }
.slide h1 { font-weight: 600; }
.slide h2 { color: ${t.primary}; font-weight: 600; }
.badge { color: ${accent}; font-size: 19px; letter-spacing: .4em; margin-bottom: 20px; }
.row { justify-content: center; } .row .k { color: ${accent}; }
.desc p { font-size: 25px; line-height: 2; }`;
    deco = `<div class="rule"></div>`;
  } else if (design.layout === 'earthy') {
    css += `
.slide { align-items: flex-start; }
.sidebar { position: absolute; left: 0; top: 0; bottom: 0; width: 26px; background: ${t.primary}; }
.slide h1, .slide h2 { color: ${t.primary}; }
.badge { background: ${accent}; color: #fff; padding: 6px 18px; border-radius: 6px;
  font-weight: 700; font-size: 19px; margin-bottom: 24px; width: fit-content; }
.row .k { color: ${accent}; }`;
    deco = `<div class="sidebar"></div>`;
  } else { // corporate
    css += `
.slide { align-items: flex-start; padding-top: 110px; }
.header-band { position: absolute; left: 0; right: 0; top: 0; height: 58px; background: ${t.primary};
  color: #fff; display: flex; align-items: center; padding: 0 40px; font-size: 16px; letter-spacing: .1em; }
.slide h1, .slide h2 { color: ${t.primary}; }
.slide h2 { border-bottom: 3px solid ${accent}; padding-bottom: 12px; }
.badge { color: ${accent}; font-weight: 700; font-size: 20px; margin-bottom: 16px; }
.row .k { color: ${t.primary}; }`;
    deco = `<div class="header-band">${esc(c.host || c.title)}</div>`;
  }

  const slides = [
    `<section class="slide cover">${deco}
      ${c.subtitle ? `<div class="badge">${esc(c.subtitle)}</div>` : ''}
      <h1>${esc(c.title)}</h1>
      ${c.date ? `<div class="sub">${esc(c.date)}${c.place ? ' · ' + esc(c.place) : ''}</div>` : ''}
      <div class="pagenum">1</div></section>`,
    `<section class="slide">${deco}<h2>안내</h2>${infoRows || '<p class="sub">세부 정보가 입력되지 않았습니다.</p>'}
      <div class="pagenum">2</div></section>`,
    `<section class="slide">${deco}<h2>소개</h2><div class="desc">${paragraphs(c.desc) || '<p>설명이 입력되지 않았습니다.</p>'}</div>
      <div class="pagenum">3</div></section>`,
    `<section class="slide cover">${deco}
      <h1>감사합니다</h1>
      ${c.host ? `<div class="sub">${esc(c.host)}</div>` : ''}
      <div class="pagenum">4</div></section>`,
  ];
  return docShell(c.title + ' — 발표자료', css, slides.join('\n'));
}

/* =====================================================
 * 포스터 렌더러 — 세로형 1장 (A 시리즈 비율)
 * ===================================================== */
function renderPoster(design, c) {
  const t = design.tokens;
  const font = FONT_STACKS[t.font];
  let css = `
body { background: #555; font-family: ${font}; padding: 24px; }
.poster { width: 640px; max-width: 100%; aspect-ratio: 1 / 1.414; margin: 0 auto;
  overflow: hidden; position: relative; box-shadow: 0 4px 24px rgba(0,0,0,.35);
  display: flex; flex-direction: column; }
.info { font-size: 19px; line-height: 1.9; }
.info strong { font-weight: 700; }
.desc p { font-size: 15px; line-height: 1.8; margin: 8px 0; }
h1 { word-break: keep-all; }
@media print { body { background: none; padding: 0; } .poster { box-shadow: none; width: 100%; } }`;
  let body = '';

  if (design.layout === 'bigtypo') {
    css += `
.poster { background: ${t.bg}; color: ${t.text}; padding: 48px 44px; }
.kicker { color: ${t.secondary}; font-weight: 800; letter-spacing: .25em; font-size: 16px; }
h1 { font-size: 74px; line-height: 1.02; margin: 20px 0 8px; font-weight: 900; color: ${t.primary}; }
.bigline { height: 14px; background: ${t.primary}; margin: 28px 0; }
.bottom { margin-top: auto; border-top: 3px solid ${t.primary}; padding-top: 20px; }`;
    body = `<div class="poster">
      ${c.subtitle ? `<div class="kicker">${esc(c.subtitle)}</div>` : ''}
      <h1>${esc(c.title)}</h1>
      <div class="bigline"></div>
      <div class="desc">${paragraphs(c.desc)}</div>
      <div class="bottom info">
        ${c.date ? `<div><strong>일시</strong> · ${esc(c.date)}</div>` : ''}
        ${c.place ? `<div><strong>장소</strong> · ${esc(c.place)}</div>` : ''}
        ${c.host ? `<div><strong>문의</strong> · ${esc(c.host)}</div>` : ''}
      </div></div>`;
  } else if (design.layout === 'neon') {
    css += `
.poster { background: ${t.bg}; color: ${t.text}; padding: 44px 40px; }
.frame { position: absolute; inset: 18px; border: 2px solid ${t.secondary};
  box-shadow: 0 0 22px ${t.secondary}66, inset 0 0 22px ${t.secondary}33; pointer-events: none; }
.kicker { color: ${t.secondary}; letter-spacing: .4em; font-size: 15px; font-weight: 700; text-align: center; margin-top: 26px; }
h1 { font-size: 62px; line-height: 1.1; margin: 26px 0; font-weight: 900; text-align: center;
  color: ${t.secondary}; text-shadow: 0 0 14px ${t.secondary}, 0 0 44px ${t.secondary}88; }
.desc { text-align: center; opacity: .85; }
.bottom { margin-top: auto; text-align: center; padding-bottom: 30px; }
.bottom .info div { margin: 4px 0; }`;
    body = `<div class="poster"><div class="frame"></div>
      ${c.subtitle ? `<div class="kicker">${esc(c.subtitle)}</div>` : ''}
      <h1>${esc(c.title)}</h1>
      <div class="desc">${paragraphs(c.desc)}</div>
      <div class="bottom info">
        ${c.date ? `<div>⚡ ${esc(c.date)}</div>` : ''}
        ${c.place ? `<div>📍 ${esc(c.place)}</div>` : ''}
        ${c.host ? `<div>${esc(c.host)}</div>` : ''}
      </div></div>`;
  } else if (design.layout === 'nouveau') {
    css += `
.poster { background: ${t.bg}; color: ${t.text}; padding: 34px; }
.inner { border: 3px double ${t.primary}; flex: 1; display: flex; flex-direction: column;
  align-items: center; text-align: center; padding: 48px 36px; position: relative; }
.inner::before { content: ''; position: absolute; inset: 8px; border: 1px solid ${t.secondary}; pointer-events: none; }
.kicker { color: ${t.secondary}; letter-spacing: .35em; font-size: 15px; }
h1 { font-size: 52px; line-height: 1.25; margin: 26px 0; color: ${t.primary}; }
.orn { color: ${t.secondary}; font-size: 24px; margin: 10px 0; }
.bottom { margin-top: auto; }`;
    body = `<div class="poster"><div class="inner">
      ${c.subtitle ? `<div class="kicker">${esc(c.subtitle)}</div>` : ''}
      <h1>${esc(c.title)}</h1>
      <div class="orn">❦ ❦ ❦</div>
      <div class="desc">${paragraphs(c.desc)}</div>
      <div class="bottom info">
        ${c.date ? `<div>${esc(c.date)}</div>` : ''}
        ${c.place ? `<div>${esc(c.place)}</div>` : ''}
        ${c.host ? `<div>${esc(c.host)}</div>` : ''}
      </div></div></div>`;
  } else if (design.layout === 'warmgrad') {
    css += `
.poster { background: linear-gradient(160deg, ${t.primary}, ${t.secondary}); color: ${t.text};
  padding: 52px 44px; text-align: center; }
.kicker { letter-spacing: .3em; font-size: 15px; opacity: .9; font-weight: 700; }
h1 { font-size: 58px; line-height: 1.12; margin: 22px 0; font-weight: 900;
  text-shadow: 0 2px 12px rgba(0,0,0,.25); }
.card { margin-top: auto; background: rgba(255,255,255,.93); color: #1f2937;
  border-radius: 18px; padding: 26px 24px; text-align: left; }`;
    body = `<div class="poster">
      ${c.subtitle ? `<div class="kicker">${esc(c.subtitle)}</div>` : ''}
      <h1>${esc(c.title)}</h1>
      <div class="card">
        <div class="info">
          ${c.date ? `<div><strong>📅</strong> ${esc(c.date)}</div>` : ''}
          ${c.place ? `<div><strong>📍</strong> ${esc(c.place)}</div>` : ''}
          ${c.host ? `<div><strong>☎️</strong> ${esc(c.host)}</div>` : ''}
        </div>
        <div class="desc">${paragraphs(c.desc)}</div>
      </div></div>`;
  } else { // retro
    css += `
.poster { background: ${t.bg}; color: ${t.text}; padding: 30px; }
.inner { border: 6px solid ${t.primary}; flex: 1; display: flex; flex-direction: column;
  align-items: center; text-align: center; padding: 44px 32px; position: relative; }
.stamp { position: absolute; top: 20px; right: 20px; width: 86px; height: 86px; border-radius: 50%;
  border: 3px dashed ${t.primary}; display: flex; align-items: center; justify-content: center;
  transform: rotate(12deg); font-weight: 900; font-size: 13px; color: ${t.primary}; padding: 8px; }
.kicker { background: ${t.primary}; color: ${t.bg}; display: inline-block; padding: 5px 18px;
  font-weight: 800; letter-spacing: .2em; font-size: 14px; }
h1 { font-size: 56px; line-height: 1.1; margin: 26px 0 14px; font-weight: 900; color: ${t.primary}; }
.wave { color: ${t.secondary}; font-size: 22px; letter-spacing: .3em; margin: 8px 0 14px; }
.bottom { margin-top: auto; border-top: 3px dashed ${t.primary}; padding-top: 16px; width: 100%; }`;
    body = `<div class="poster"><div class="inner">
      <div class="stamp">COME<br>&amp;<br>JOIN</div>
      ${c.subtitle ? `<div class="kicker">${esc(c.subtitle)}</div>` : ''}
      <h1>${esc(c.title)}</h1>
      <div class="wave">✶ ✶ ✶</div>
      <div class="desc">${paragraphs(c.desc)}</div>
      <div class="bottom info">
        ${c.date ? `<div><strong>일시</strong> ${esc(c.date)}</div>` : ''}
        ${c.place ? `<div><strong>장소</strong> ${esc(c.place)}</div>` : ''}
        ${c.host ? `<div><strong>문의</strong> ${esc(c.host)}</div>` : ''}
      </div></div></div>`;
  }
  return docShell(c.title + ' — 포스터', css, body);
}

/* =====================================================
 * 랜딩페이지 렌더러 — 용도별 5종
 * ===================================================== */
function renderLanding(design, c) {
  const t = design.tokens;
  const font = FONT_STACKS[t.font];
  const cta = c.cta || '자세히 보기';
  const lines = descLines(c.desc);
  const infoCards = [
    c.date && `<div class="card"><div class="ic">📅</div><h3>날짜</h3><p>${esc(c.date)}</p></div>`,
    c.place && `<div class="card"><div class="ic">📍</div><h3>장소</h3><p>${esc(c.place)}</p></div>`,
    c.host && `<div class="card"><div class="ic">👥</div><h3>주최/문의</h3><p>${esc(c.host)}</p></div>`,
  ].filter(Boolean).join('');

  let css = `
body { font-family: ${font}; background: ${t.bg}; color: ${t.text}; }
h1, h2 { word-break: keep-all; }
.btn-cta { display: inline-block; padding: 16px 44px; border-radius: 999px; font-size: 18px;
  font-weight: 800; text-decoration: none; background: ${t.secondary}; color: #111; }
footer { text-align: center; padding: 40px 20px; font-size: 14px; opacity: .6; }`;
  let body = '';

  if (design.layout === 'event') {
    css += `
.hero { text-align: center; padding: 110px 24px 80px; position: relative; overflow: hidden; }
.hero::before { content:''; position: absolute; inset: 0;
  background: radial-gradient(ellipse at 50% -20%, ${t.secondary}33, transparent 60%); }
.hero > * { position: relative; }
.hero .kicker { color: ${t.secondary}; letter-spacing: .3em; font-weight: 800; }
.hero h1 { font-size: clamp(40px, 7vw, 76px); margin: 20px 0 14px; font-weight: 900; }
.hero p { font-size: 20px; opacity: .85; margin-bottom: 38px; }
.cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 18px;
  max-width: 900px; margin: 10px auto 0; padding: 0 24px; }
.card { background: rgba(255,255,255,.06); border: 1px solid rgba(255,255,255,.14);
  border-radius: 16px; padding: 26px; text-align: center; }
.card .ic { font-size: 30px; } .card h3 { margin: 10px 0 6px; color: ${t.secondary}; }
.about { max-width: 700px; margin: 70px auto; padding: 0 24px; }
.about h2 { color: ${t.secondary}; margin-bottom: 18px; font-size: 30px; }
.about p { line-height: 1.9; margin: 12px 0; font-size: 17px; opacity: .9; }
.cta-strip { text-align: center; padding: 70px 20px; }`;
    body = `
<section class="hero">
  ${c.subtitle ? `<div class="kicker">${esc(c.subtitle)}</div>` : ''}
  <h1>${esc(c.title)}</h1>
  ${c.date ? `<p>${esc(c.date)}${c.place ? ' · ' + esc(c.place) : ''}</p>` : ''}
  <a class="btn-cta" href="#about">${esc(cta)}</a>
</section>
<section class="cards">${infoCards}</section>
<section class="about" id="about"><h2>소개</h2>${paragraphs(c.desc)}</section>
<section class="cta-strip"><a class="btn-cta" href="#">${esc(cta)}</a></section>
<footer>${esc(c.host || c.title)}</footer>`;
  } else if (design.layout === 'sales') {
    css += `
.btn-cta { background: ${t.secondary}; color: #fff; }
.head { max-width: 760px; margin: 0 auto; padding: 90px 24px 30px; text-align: center; }
.head .kicker { color: ${t.primary}; font-weight: 800; letter-spacing: .1em; }
.head h1 { font-size: clamp(34px, 5.5vw, 56px); margin: 18px 0; color: ${t.primary}; font-weight: 900; }
.head .meta { opacity: .7; }
.benefits { max-width: 640px; margin: 40px auto; padding: 0 24px; }
.benefits li { list-style: none; font-size: 19px; line-height: 1.7; margin: 14px 0; padding-left: 38px; position: relative; }
.benefits li::before { content: '✔'; position: absolute; left: 0; color: ${t.secondary}; font-weight: 900; font-size: 22px; }
.midcta, .endcta { text-align: center; padding: 34px 20px; }
.detail { max-width: 640px; margin: 0 auto; padding: 20px 24px 40px; }
.detail h2 { color: ${t.primary}; margin-bottom: 14px; }
.detail p { line-height: 1.95; margin: 14px 0; font-size: 17px; }
.divider { width: 100px; height: 4px; background: ${t.secondary}; margin: 20px auto; border-radius: 2px; }`;
    body = `
<header class="head">
  ${c.subtitle ? `<div class="kicker">${esc(c.subtitle)}</div>` : ''}
  <h1>${esc(c.title)}</h1>
  <div class="meta">${[c.date, c.place].filter(Boolean).map(esc).join(' · ')}</div>
</header>
<ul class="benefits">${lines.slice(0, 4).map(l => `<li>${esc(l)}</li>`).join('')}</ul>
<div class="midcta"><a class="btn-cta" href="#">${esc(cta)}</a></div>
<div class="divider"></div>
<section class="detail"><h2>자세히 알아보기</h2>${paragraphs(c.desc)}</section>
<div class="endcta"><a class="btn-cta" href="#">${esc(cta)}</a></div>
<footer>${esc(c.host || c.title)}</footer>`;
  } else if (design.layout === 'saas') {
    css += `
.nav { position: sticky; top: 0; display: flex; justify-content: space-between; align-items: center;
  padding: 14px 28px; background: ${t.bg}ee; backdrop-filter: blur(8px); border-bottom: 1px solid #00000011; z-index: 9; }
.nav strong { color: ${t.primary}; }
.nav .btn-cta { padding: 9px 22px; font-size: 14px; background: ${t.primary}; color: #fff; }
.hero { text-align: center; max-width: 760px; margin: 0 auto; padding: 90px 24px 50px; }
.hero .kicker { color: ${t.primary}; font-weight: 700; }
.hero h1 { font-size: clamp(36px, 6vw, 62px); margin: 16px 0; font-weight: 900; letter-spacing: -.02em; }
.hero p { font-size: 19px; opacity: .75; margin-bottom: 34px; }
.hero .btn-cta { background: ${t.primary}; color: #fff; }
.bento { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px;
  max-width: 980px; margin: 30px auto 80px; padding: 0 24px; }
.b { background: #fff; border: 1px solid #00000012; border-radius: 20px; padding: 28px;
  box-shadow: 0 2px 10px rgba(0,0,0,.04); }
.b h3 { color: ${t.primary}; margin-bottom: 10px; }
.b p { line-height: 1.75; font-size: 15px; opacity: .85; }
.b.wide { grid-column: span 2; }
.b.tall { grid-column: span 2; background: ${t.primary}; color: #fff; }
.b.tall h3 { color: ${t.secondary}; }
.b .ic { font-size: 28px; margin-bottom: 10px; }
@media (max-width: 760px) { .bento { grid-template-columns: 1fr 1fr; } .b.wide, .b.tall { grid-column: span 2; } }`;
    const bentoCards = [
      `<div class="b tall"><div class="ic">✨</div><h3>핵심 소개</h3><p>${esc(lines[0] || c.title)}</p></div>`,
      c.date ? `<div class="b"><div class="ic">📅</div><h3>일정</h3><p>${esc(c.date)}</p></div>` : '',
      c.place ? `<div class="b"><div class="ic">📍</div><h3>장소</h3><p>${esc(c.place)}</p></div>` : '',
      lines[1] ? `<div class="b wide"><div class="ic">💡</div><h3>이런 점이 좋아요</h3><p>${esc(lines[1])}</p></div>` : '',
      lines[2] ? `<div class="b wide"><div class="ic">🚀</div><h3>더 알아보기</h3><p>${esc(lines.slice(2).join(' '))}</p></div>` : '',
      c.host ? `<div class="b wide"><div class="ic">👥</div><h3>주최/문의</h3><p>${esc(c.host)}</p></div>` : '',
    ].filter(Boolean).join('');
    body = `
<nav class="nav"><strong>${esc(c.host || c.title)}</strong><a class="btn-cta" href="#">${esc(cta)}</a></nav>
<section class="hero">
  ${c.subtitle ? `<div class="kicker">${esc(c.subtitle)}</div>` : ''}
  <h1>${esc(c.title)}</h1>
  ${lines[0] ? `<p>${esc(lines[0])}</p>` : ''}
  <a class="btn-cta" href="#">${esc(cta)}</a>
</section>
<section class="bento">${bentoCards}</section>
<footer>${esc(c.host || c.title)}</footer>`;
  } else if (design.layout === 'register') {
    css += `
.split { display: grid; grid-template-columns: 1.1fr 1fr; gap: 50px; max-width: 1020px;
  margin: 0 auto; padding: 80px 24px; align-items: start; }
.left .kicker { color: ${t.secondary}; font-weight: 800; letter-spacing: .15em; }
.left h1 { font-size: clamp(34px, 5vw, 52px); margin: 16px 0 20px; color: ${t.primary}; font-weight: 900; }
.left .meta { font-size: 17px; line-height: 2.1; margin-bottom: 22px; }
.left .meta strong { color: ${t.primary}; }
.left p { line-height: 1.9; margin: 10px 0; opacity: .9; }
.form-card { background: #fff; border-radius: 20px; padding: 34px 30px;
  box-shadow: 0 12px 36px rgba(0,0,0,.1); }
.form-card h2 { color: ${t.primary}; margin-bottom: 20px; font-size: 24px; }
.form-card label { display: block; font-size: 14px; font-weight: 700; margin: 14px 0 6px; }
.form-card input, .form-card textarea { width: 100%; border: 1px solid #cbd5e1; border-radius: 10px;
  padding: 12px; font-size: 15px; font-family: inherit; }
.form-card button { width: 100%; margin-top: 22px; border: none; background: ${t.secondary};
  color: #111; font-weight: 800; font-size: 17px; padding: 15px; border-radius: 12px; cursor: pointer; }
@media (max-width: 820px) { .split { grid-template-columns: 1fr; } }`;
    body = `
<section class="split">
  <div class="left">
    ${c.subtitle ? `<div class="kicker">${esc(c.subtitle)}</div>` : ''}
    <h1>${esc(c.title)}</h1>
    <div class="meta">
      ${c.date ? `<div><strong>📅 일시</strong> · ${esc(c.date)}</div>` : ''}
      ${c.place ? `<div><strong>📍 장소</strong> · ${esc(c.place)}</div>` : ''}
      ${c.host ? `<div><strong>👥 주최</strong> · ${esc(c.host)}</div>` : ''}
    </div>
    ${paragraphs(c.desc)}
  </div>
  <div class="form-card">
    <h2>참가 신청</h2>
    <form onsubmit="alert('신청이 접수되었습니다!'); return false;">
      <label>이름</label><input required placeholder="홍길동">
      <label>연락처</label><input required placeholder="010-0000-0000">
      <label>남기실 말씀</label><textarea rows="3" placeholder="선택 사항"></textarea>
      <button type="submit">${esc(cta === '자세히 보기' ? '신청하기' : cta)}</button>
    </form>
  </div>
</section>
<footer>${esc(c.host || c.title)}</footer>`;
  } else { // story
    css += `
.head { max-width: 680px; margin: 0 auto; padding: 100px 24px 40px; text-align: center; }
.head .kicker { color: ${t.secondary}; letter-spacing: .3em; font-size: 14px; }
.head h1 { font-size: clamp(32px, 5vw, 54px); margin: 20px 0; color: ${t.primary}; }
.head .meta { opacity: .7; font-size: 16px; line-height: 1.8; }
.rule { width: 80px; height: 2px; background: ${t.secondary}; margin: 36px auto; }
.prose { max-width: 620px; margin: 0 auto; padding: 0 24px 40px; }
.prose p { font-size: 18px; line-height: 2.1; margin: 22px 0; }
.prose p:first-of-type::first-letter { font-size: 2.6em; float: left; line-height: 1;
  padding-right: 10px; color: ${t.primary}; font-weight: 700; }
.endcta { text-align: center; padding: 30px 0 80px; }
.endcta .btn-cta { background: ${t.primary}; color: #fff; }`;
    body = `
<header class="head">
  ${c.subtitle ? `<div class="kicker">${esc(c.subtitle)}</div>` : ''}
  <h1>${esc(c.title)}</h1>
  <div class="meta">${[c.date, c.place].filter(Boolean).map(esc).join('<br>')}</div>
  <div class="rule"></div>
</header>
<article class="prose">${paragraphs(c.desc)}</article>
<div class="endcta"><a class="btn-cta" href="#">${esc(cta)}</a></div>
<footer>${esc(c.host || c.title)}</footer>`;
  }
  return docShell(c.title, css, body);
}

const RENDERERS = { ppt: renderPPT, poster: renderPoster, landing: renderLanding };

/* node 테스트용 (브라우저에서는 무시됨) */
if (typeof module !== 'undefined') {
  module.exports = { SEED_DESIGNS, LAYOUTS, RENDERERS };
}
