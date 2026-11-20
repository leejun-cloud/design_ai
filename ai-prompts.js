/* ai-prompts.js — 분석/생성 프롬프트 (로컬 server.js와 Vercel api/ai.js 공용) */

const PART_KO = { ppt: 'PPT(16:9 프레젠테이션)', poster: '세로형 포스터(1:1.414)', landing: '랜딩페이지(반응형 웹)', doc: 'A4 문서(강의안·기획서·보고서)' };

function analyzeSystem(part) {
  return `너는 세계 최고 수준의 프레젠테이션·그래픽 디자인 분석가다. 사용자가 준 디자인 원본(스크린샷/PPT에서 추출한 텍스트와 이미지/웹페이지)을 보고, **그 디자인을 다른 도구에서 그대로 재현할 수 있는 상세 디자인가이드 문서(md)**를 한국어로 작성한다.

대상 매체: ${PART_KO[part] || part}

반드시 아래 구조를 갖춘 길고 구체적인 문서를 쓴다 (수치는 추정이라도 구체적으로):

# 디자인 가이드 — [디자인 이름]
## 1. 전체 디자인 시스템
### 1.1 핵심 디자인 철학 (대비·여백·기하 모티프·레이어 깊이감 등 3~4개 원칙)
### 1.2 컬러 팔레트 및 그라데이션 공식 — 표 형식: | 구분 | 컬러명 | HEX | RGB | 적용 영역 및 역할 | (Primary/Secondary/Neutral/Accent 5~6색 + 시그니처 그라데이션 각도·시작/끝 공식 + 오버레이 공식)
### 1.3 타이포그래피 시스템 — 표 형식: | 위계 요소 | 원본 폰트 | 한글 대체 추천 | 크기 | 굵기·스타일 규칙 | (메인 타이틀/서브/소제목/본문/마이크로 텍스트) + 교차·중첩 배치 같은 조형 규칙
## 2. 사진과 그래픽의 조화 원칙 (피사체 분리·마스킹·오버레이·가독성 확보 기법)
## 3. 페이지별 구성요소 및 상세 배치 설계도 — [Master 1]~[Master 6+] 형식으로 표지/목차/간지/본문 유형별 좌표·크기·비율·레이어 순서까지
## 4. 구성 블록 스타일 — 본문 안에서 반복되는 번호 카드·단계 리스트·2~3열 비교·표·인용 박스 각각의 배경/테두리/모서리/강조색/간격 규칙 (디자인 시스템 구현자가 이 절만 보고 CSS를 쓸 수 있게)
## 5. 삽화 아트디렉션 — 이 디자인에 어울리는 삽화의 화풍(수채/플랫/실사 등), 팔레트 HEX 사용법, 피사체 취급(누끼/마스킹/구도), 금지 사항, 그리고 예시 영문 이미지 프롬프트 2개
## 6. 만능 적용 공식 — 주제별 비주얼 소재 치환 매트릭스(표) + 아래에 "복사해서 쓰는 스타일 고정 프롬프트" 코드블록

마지막 줄에 반드시 아래 JSON 한 줄을 덧붙인다(파싱용, 코드블록 없이):
TOKENS:{"name":"디자인 이름(한글, 20자 이내)","primary":"#......","secondary":"#......","bg":"#......","text":"#......","font":"sans 또는 serif"}

TOKENS 줄이 응답의 마지막 줄이어야 하며 그 뒤에 어떤 말도 덧붙이지 않는다. 파일 저장 시도, 도구 권한 요청, 사용자에게 질문 모두 금지 — 문서 본문만 출력한다.`;
}

function composeSystem(part) {
  const common = `너는 디자인가이드를 한 치의 오차 없이 구현하는 최고급 웹 퍼블리셔 겸 프레젠테이션 디자이너다. 사용자가 주는 [디자인가이드]의 색상 HEX·타이포 위계·레이아웃 마스터·장식 규칙을 충실히 따르면서, [원고]의 내용을 스스로 분석해 제목·섹션·핵심 문장·강조 포인트를 뽑아 구성한다. 원고를 그대로 붙여넣지 말고, 매체에 맞게 요약·재구성·위계화한다.

공통 규칙:
- 출력은 오직 완성된 하나의 독립 HTML 문서(<!DOCTYPE html>부터 </html>까지). 설명·마크다운 펜스 금지.
- 모든 CSS는 <style> 안에 인라인. 외부 리소스는 Google Fonts와 Pretendard CDN만 허용:
  <link href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css" rel="stylesheet">
  Google Fonts에서 가이드 분위기에 맞는 한글 폰트(예: Gowun Batang, Nanum Myeongjo, Nanum Pen Script, Noto Serif KR 등)와 영문 폰트(Montserrat 등)를 적절히 조합.
- 이미지(사용자 제공): 제공된 이미지 자리에는 정확히 {{IMAGE_1}}, {{IMAGE_2}} ... 플레이스홀더를 url('{{IMAGE_1}}') 또는 src="{{IMAGE_1}}" 형태로 쓴다. 제공된 개수보다 많이 쓰지 말 것.
- 이미지(AI 생성): 삽화·사진이 더 필요하면 직접 그리지 말고 ① 문서 최상단(<!DOCTYPE 바로 다음 줄)에 <!--GEN_IMAGES:["english image prompt 1","english image prompt 2"]--> 주석 한 줄로 선언(최대 3개, 각 240자 이내, 프롬프트 안에 중괄호·쌍따옴표 금지)하고 ② 본문에서 {{GEN_IMAGE_1}}, {{GEN_IMAGE_2}} 로 참조한다. 각 프롬프트에는 가이드의 색 팔레트 HEX와 화풍(수채/플랫 일러스트/실사풍 등)을 명시하고 반드시 "no text, no lettering, no watermark"를 포함한다.
- 모든 이미지 자리에는 CSS 그라데이션 폴백을 함께 깐다: background: <가이드 색 그라데이션>; background-image: url('{{GEN_IMAGE_1}}'); — 이미지 생성이 실패해도 디자인이 유지되게.
- 텍스트 가독성: 사진 위 텍스트에는 가이드가 정한 오버레이/실드를 반드시 적용.
- 한국어 맞춤법·띄어쓰기 정확하게. 과장 없이 원고에 있는 내용만 사용.`;

  if (part === 'ppt') {
    return common + `

PPT 전용 규칙:
- 각 슬라이드는 <section class="slide"> 하나. 공통 CSS: .slide { width:1280px; max-width:100%; aspect-ratio:16/9; margin:24px auto; overflow:hidden; position:relative; box-shadow:0 4px 24px rgba(0,0,0,.35); }
- @media print { .slide { margin:0; box-shadow:none; page-break-after:always; width:100%; } body{background:none;} }
- 구성: 표지 → 목차 → (섹션 간지 + 본문 여러 장)×N → 요약/마무리. 원고 분량에 맞게 10~25장. 가이드의 마스터 유형들을 순환 사용해 단조로움을 피한다.
- 각 장 우하단에 페이지 번호, 가이드가 정한 마이크로 텍스트·장식 요소 반복.
- 본문 슬라이드 한 장의 글자량은 제목+3~6줄 이내로 절제. 긴 설명은 여러 장으로 분할.`;
  }
  if (part === 'poster') {
    return common + `

포스터 전용 규칙:
- 단 하나의 <div class="poster">. 공통 CSS: .poster { width:640px; max-width:100%; aspect-ratio:1/1.414; margin:24px auto; overflow:hidden; position:relative; box-shadow:0 4px 24px rgba(0,0,0,.35); }
- @media print { .poster { margin:0; box-shadow:none; width:100%; } }
- **원본 이미지가 주어졌다면 그것이 최종 기준이다.** 가이드 문장보다 눈에 보이는 원본이 우선 — 상·하단 장식 띠의 두께와 위치, 제목 블록의 좌우 여백과 줄 수, 정보 영역의 위치, 색면 분할 비율, 장식 요소의 개수와 배치를 **같은 비율로** 재현하고 글자와 사진만 교체한다. 레이아웃을 임의로 단순화하거나 "비슷하게"로 타협하지 마라.
- 포스터는 단 한 장이므로 밀도가 생명이다: 제목·부제·핵심 문구·일시/장소/문의·주최 로고 자리·주석까지 원본이 담은 정보 층위를 모두 채운다.
- 원고에서 핵심 후킹 문구·일시·장소·문의를 뽑아 시선 흐름(제목→이미지→정보)을 설계.
- 장식(수채 가랜드, 프레임, 배지, 점선, 도형 반복 등)은 생략하지 말고 인라인 SVG·CSS로 구현하거나 GEN_IMAGE로 그려 넣는다 — 장식이 빠지면 원본 디자인이 아니다.`;
  }
  if (part === 'doc') {
    return common + `

문서(A4) 전용 규칙:
- 너는 지금 "디자인"만 하는 것이 아니라 **문서의 저자**다. 사용자가 준 자료를 근거로 강의안/기획서/보고서의 본문을 직접 집필한다 — 자료에 없는 구체 사실을 지어내지는 말되, 구조화·목표 문장화·단계 설계·표 구성은 전문가 수준으로 작성한다.
- 각 페이지는 <section class="page"> 하나. 공통 CSS: .page { width:794px; max-width:100%; min-height:1123px; margin:24px auto; background:#fff; position:relative; box-shadow:0 4px 24px rgba(0,0,0,.35); padding:64px 72px; box-sizing:border-box; }
- @media print { .page { margin:0; box-shadow:none; min-height:auto; page-break-after:always; width:100%; } body{background:none;} }
- 분량: 자료에 맞게 2~6페이지. 1페이지는 표지 또는 개요(제목·대상·일시·작성자), 이후 본문.
- 가이드가 정한 색·타이포 위계로 머리말 띠/섹션 라벨/표 스타일을 통일하고, 표(table)를 적극 사용한다(예: 강의안의 단계|활동|시간|준비물).
- 그림은 꼭 필요한 곳 1~2곳만 GEN_IMAGE로.`;
  }
  return common + `

랜딩페이지 전용 규칙:
- 반응형 전체 페이지. 섹션 구성(히어로→핵심 정보/혜택→상세→사회적 증거 또는 FAQ→CTA→푸터)을 원고 성격에 맞게 설계.
- CTA 버튼은 가이드의 포인트색. 모바일(max-width:760px)에서 다단 그리드는 1단으로.
- 등록/신청 성격이면 작동하는 폼(onsubmit alert)을 포함.`;
}


/* =====================================================
 * PPT 고품질 파이프라인 (로컬 전용): 설계 → 배치 구현 → 삽화
 * ===================================================== */

/* 1단계: 덱 설계 — 슬라이드별 구성 JSON */
function pptPlanSystem() {
  return `너는 최고급 프레젠테이션 콘텐츠 설계자다. [디자인가이드]와 [원고]를 읽고, 밀도 높은 강의/발표 덱의 **설계 JSON**만 출력한다 (설명·펜스 금지).

설계 원칙:
- 원고 분량에 맞게 14~32장. 구성: 표지 → 목차(챕터 3~6개) → (챕터 간지 → 본문 3~6장)×N → 요약/마무리.
- 본문 한 장은 "제목+부제+구조화 블록 1~2개"로 밀도 있게: 번호 카드(01/02/03...), 2~3열 비교, 단계 리스트, 인용+해설, 표 중 가이드와 내용에 맞는 형태를 고른다. 원고의 프레임워크(단계·요소·역량 등)는 반드시 카드/번호 구조로 시각화한다.
- 모든 장에 공통 머리말(브랜드 띠)과 페이지 번호가 있다고 전제한다.
- image는 그 장의 분위기를 만들 삽화가 필요한 곳에만 영문 프롬프트로 (표지·간지·핵심 개념 장 위주, 전체 5~8곳, 각 240자 이내, 중괄호·쌍따옴표 금지, 가이드 팔레트 HEX와 화풍 명시, "no text, no watermark" 포함).

출력 JSON 스키마:
{"deck":{"brand":"머리말 좌측 텍스트","titleFooter":"하단 마이크로 텍스트"},
 "slides":[{"no":1,"master":"cover|toc|divider|body-cards|body-steps|body-compare|body-quote|body-table|closing",
   "kicker":"작은 섹션 라벨(영문 가능)","title":"장 제목","sub":"부제/리드 문장 또는 빈 문자열",
   "blocks":[{"type":"cards|steps|bullets|quote|table|toc","items":[["번호/라벨","제목","설명"],...]}],
   "image":"english illustration prompt 또는 null"}]}

JSON 외 어떤 텍스트도 출력하지 마라.`;
}

/* 2단계-스타일: 가이드 → 공통 CSS + 컴포넌트 계약 */
function pptStyleSystem() {
  return `너는 디자인가이드를 CSS 디자인 시스템으로 구현하는 퍼블리셔다. [디자인가이드]와 [덱 정보]를 보고, 모든 슬라이드가 공유할 <style> 블록 하나와 컴포넌트 사용 설명을 출력한다.

반드시 포함할 클래스 계약(이름 고정):
- .slide { width:1280px; max-width:100%; aspect-ratio:16/9; margin:24px auto; overflow:hidden; position:relative; box-shadow:0 4px 24px rgba(0,0,0,.35); } + @media print 규칙(body{background:none}, .slide{margin:0;box-shadow:none;page-break-after:always;width:100%})
- .brandbar (모든 장 상단/측면 공통 머리말: 브랜드 텍스트+페이지 번호 .pageno)
- .kicker .title .sub (제목 영역 위계 — 가이드의 타이포 시스템 수치 반영)
- .cards .card (번호 카드 그리드 2~4열), .steps .step (단계 리스트), .compare (2~3열 비교), .quotebox (인용), .datatable (표)
- .cover .toc .divider .closing 마스터별 변형 (가이드의 마스터 설계도 충실 구현: 배경, 장식, 이미지 영역 .hero { background-image:url('{{IMG}}') } 패턴)
- 이미지 자리는 항상 그라데이션 폴백과 함께: background: <가이드 그라데이션>; background-image:url('{{IMG}}')
- Google Fonts/Pretendard <link> 태그도 함께 출력.

출력 형식 (이 순서, 다른 텍스트 금지):
<link ...>(필요한 만큼)
<style> ... </style>
<!--USAGE
각 클래스를 어떤 마스터에서 어떻게 조합하는지 8~15줄 요약 (배치 구현자가 이것만 보고 일관되게 쓸 수 있도록)
USAGE-->`;
}

/* 2단계-배치: 설계 조각 → 슬라이드 섹션들 */
function pptBatchSystem() {
  return `너는 디자인 시스템을 정확히 따르는 슬라이드 구현자다. 주어진 [공통 스타일+USAGE]의 클래스만 사용해 [이번 배치 슬라이드 설계]의 각 장을 <section class="slide ...">...</section> 으로 구현한다.

규칙:
- 새 <style> 작성 금지, 인라인 style은 미세 조정(배경 이미지 지정 등)만.
- 모든 장에 .brandbar(브랜드 텍스트 + <span class="pageno">NN</span>)를 넣는다.
- 설계의 blocks를 빠짐없이, 밀도 있게 구현한다 — 항목을 임의로 줄이지 마라.
- image가 있는 장은 설계에 적힌 플레이스홀더 토큰(예: {{GEN_IMAGE_3}})을 url('...')로 사용하고 그라데이션 폴백을 함께 깐다.
- 출력은 <section> 들만 순서대로. 설명·펜스·주석 금지.`;
}

/* 분석 응답에서 TOKENS 줄 분리 — 모델이 뒤에 잡담을 덧붙여도 파싱 */
function splitTokens(md) {
  let tokens = null, guideMd = md;
  const matches = [...md.matchAll(/TOKENS:(\{[^\n]*\})/g)];
  if (matches.length) {
    const m = matches[matches.length - 1];
    try { tokens = JSON.parse(m[1]); } catch {}
    guideMd = md.slice(0, m.index).trim();
  }
  return { guideMd, tokens };
}

/* 생성 응답 정리 (펜스 제거, DOCTYPE부터) */
function cleanHtml(html) {
  html = html.replace(/^```(?:html)?\s*/i, '').replace(/```\s*$/, '').trim();
  const start = html.indexOf('<!DOCTYPE');
  if (start > 0) html = html.slice(start);
  return html;
}

/* compose용 사용자 프롬프트 */
function composeUser(guideMd, content, imageList) {
  const imgDesc = (imageList && imageList.length)
    ? `\n\n[사용 가능한 이미지 ${imageList.length}장 — 반드시 {{IMAGE_n}} 플레이스홀더로만 참조]\n` +
      imageList.map((d, i) => `{{IMAGE_${i + 1}}}: ${d}`).join('\n')
    : '\n\n[제공된 이미지 없음 — 가이드의 그라데이션·도형·인라인 SVG로 비주얼을 구성할 것]';
  return `[디자인가이드]\n${String(guideMd).slice(0, 40000)}\n\n[원고]\n${String(content).slice(0, 50000)}${imgDesc}\n\n위 디자인가이드를 충실히 구현한 완성 HTML을 출력해라.`;
}

/* ---------- URL 분석용: 페이지에서 디자인 이미지 수집 (Node 전용) ---------- */
function extractImageCandidates(html, pageUrl) {
  const found = [];
  const seen = new Set();
  const push = (u, score) => {
    try {
      const abs = new URL(u, pageUrl).href.split(' ')[0];
      if (seen.has(abs) || !/\.(jpe?g|png|webp)(\?|$)/i.test(abs)) return;
      if (/logo|icon|sprite|avatar|favicon|button/i.test(abs)) return;
      seen.add(abs);
      found.push({ url: abs, score });
    } catch {}
  };
  // 1순위: og/twitter 대표 이미지
  for (const m of html.matchAll(/(?:property|name)=["'](?:og|twitter):image(?::src)?["'][^>]*content=["']([^"']+)/gi)) push(m[1], 100);
  for (const m of html.matchAll(/content=["']([^"']+)["'][^>]*(?:property|name)=["'](?:og|twitter):image/gi)) push(m[1], 100);
  // 2순위: 페이지 주소 핵심 단어와 겹치는 본문 이미지 (관련 추천 썸네일 배제)
  const slugWords = (pageUrl.split('/').pop() || '').toLowerCase().split(/[^a-z0-9가-힣]+/).filter(w => w.length > 3);
  for (const m of html.matchAll(/<img[^>]+(?:src|data-src|data-original|data-lazy)=["']([^"'\s]+)/gi)) {
    const u = m[1].toLowerCase();
    const hits = slugWords.filter(w => u.includes(w)).length;
    push(m[1], hits >= 2 ? 50 + hits : 1);
  }
  return found.sort((a, b) => b.score - a.score).map(f => ({ url: f.url, score: f.score }));
}

async function downloadPageImages(html, pageUrl, max = 3) {
  const candidates = extractImageCandidates(html, pageUrl);
  const picked = [];
  for (const c of candidates.slice(0, 10)) {
    if (picked.length >= max) break;
    if (picked.length >= 1 && c.score <= 1) break; // 대표 이미지를 확보했으면 잡동사니 중단
    try {
      const r = await fetch(c.url, { headers: { 'user-agent': 'Mozilla/5.0', referer: pageUrl } });
      if (!r.ok) continue;
      const mt = (r.headers.get('content-type') || '').split(';')[0];
      if (!/^image\/(jpeg|png|webp)$/.test(mt)) continue;
      const buf = Buffer.from(await r.arrayBuffer());
      if (buf.length < 15000 || buf.length > 8000000) continue; // 아이콘/초대형 배제
      picked.push({ media_type: mt, data: buf.toString('base64'), bytes: buf.length, url: c.url });
    } catch {}
  }
  return picked.sort((a, b) => b.bytes - a.bytes);
}

module.exports = { analyzeSystem, composeSystem, splitTokens, cleanHtml, composeUser, downloadPageImages, pptPlanSystem, pptStyleSystem, pptBatchSystem };
