/* api/ai.js — Claude API 프록시 (Vercel Serverless Function)
 * mode: 'analyze' → 디자인 원본(이미지/PPT 텍스트/URL)을 보고 상세 디자인가이드 md 작성
 * mode: 'compose' → 디자인가이드 md + 원고 전체 → 완성 HTML 결과물 생성
 * 환경변수 ANTHROPIC_API_KEY 필요.
 */

const ANTHROPIC_URL = 'https://api.anthropic.com/v1/messages';
const MODEL = process.env.AI_MODEL || 'claude-sonnet-5';

const PART_KO = { ppt: 'PPT(16:9 프레젠테이션)', poster: '세로형 포스터(1:1.414)', landing: '랜딩페이지(반응형 웹)' };

/* ---------- 분석: 디자인가이드 md 작성 ---------- */
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
## 4. 만능 적용 공식 — 주제별 비주얼 소재 치환 매트릭스(표) + 아래에 "복사해서 쓰는 스타일 고정 프롬프트" 코드블록

마지막 줄에 반드시 아래 JSON 한 줄을 덧붙인다(파싱용, 코드블록 없이):
TOKENS:{"name":"디자인 이름(한글, 20자 이내)","primary":"#......","secondary":"#......","bg":"#......","text":"#......","font":"sans 또는 serif"}`;
}

/* ---------- 생성: 가이드 + 원고 → 완성 HTML ---------- */
function composeSystem(part) {
  const common = `너는 디자인가이드를 한 치의 오차 없이 구현하는 최고급 웹 퍼블리셔 겸 프레젠테이션 디자이너다. 사용자가 주는 [디자인가이드]의 색상 HEX·타이포 위계·레이아웃 마스터·장식 규칙을 충실히 따르면서, [원고]의 내용을 스스로 분석해 제목·섹션·핵심 문장·강조 포인트를 뽑아 구성한다. 원고를 그대로 붙여넣지 말고, 매체에 맞게 요약·재구성·위계화한다.

공통 규칙:
- 출력은 오직 완성된 하나의 독립 HTML 문서(<!DOCTYPE html>부터 </html>까지). 설명·마크다운 펜스 금지.
- 모든 CSS는 <style> 안에 인라인. 외부 리소스는 Google Fonts와 Pretendard CDN만 허용:
  <link href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css" rel="stylesheet">
  Google Fonts에서 가이드 분위기에 맞는 한글 폰트(예: Gowun Batang, Nanum Myeongjo, Nanum Pen Script, Noto Serif KR 등)와 영문 폰트(Montserrat 등)를 적절히 조합.
- 이미지: 사용자가 제공한 이미지 자리에는 정확히 {{IMAGE_1}}, {{IMAGE_2}} ... 플레이스홀더 문자열을 url('{{IMAGE_1}}') 또는 src="{{IMAGE_1}}" 형태로 쓴다. 제공된 이미지 개수보다 많이 쓰지 말 것. 이미지가 부족한 자리는 가이드의 그라데이션·도형·패턴(CSS/인라인 SVG)으로 채운다.
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
- 원고에서 핵심 후킹 문구·일시·장소·문의를 뽑아 시선 흐름(제목→이미지→정보)을 설계.`;
  }
  return common + `

랜딩페이지 전용 규칙:
- 반응형 전체 페이지. 섹션 구성(히어로→핵심 정보/혜택→상세→사회적 증거 또는 FAQ→CTA→푸터)을 원고 성격에 맞게 설계.
- CTA 버튼은 가이드의 포인트색. 모바일(max-width:760px)에서 다단 그리드는 1단으로.
- 등록/신청 성격이면 작동하는 폼(onsubmit alert)을 포함.`;
}

async function callClaude(apiKey, system, messages, maxTokens) {
  const res = await fetch(ANTHROPIC_URL, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({ model: MODEL, max_tokens: maxTokens, system, messages }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error && data.error.message ? data.error.message : `API ${res.status}`);
  return data.content.filter(b => b.type === 'text').map(b => b.text).join('');
}

function imageBlocks(images) {
  // images: [{ media_type, data(base64) }]
  return (images || []).slice(0, 4).map(img => ({
    type: 'image',
    source: { type: 'base64', media_type: img.media_type, data: img.data },
  }));
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'content-type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return res.status(503).json({ error: 'NO_API_KEY', message: 'ANTHROPIC_API_KEY가 설정되지 않았습니다. Vercel 환경변수에 추가해주세요.' });

  try {
    const { mode, part } = req.body || {};

    if (mode === 'analyze') {
      let { images, text, url, hint } = req.body;
      // URL이면 서버에서 직접 가져온다 (CORS 없음)
      if (url && !text) {
        try {
          const page = await fetch(url, { headers: { 'user-agent': 'Mozilla/5.0 (design-guide-analyzer)' } });
          text = (await page.text()).slice(0, 60000);
        } catch (e) {
          text = `(페이지를 가져오지 못했습니다: ${e.message}) URL: ${url}`;
        }
      }
      const parts = [
        ...imageBlocks(images),
        { type: 'text', text:
          (hint ? `디자인 주제/의도: ${hint}\n\n` : '') +
          (url ? `원본 URL: ${url}\n\n` : '') +
          (text ? `원본에서 추출한 내용:\n${String(text).slice(0, 60000)}` : '위 이미지를 분석해줘.') },
      ];
      const md = await callClaude(apiKey, analyzeSystem(part), [{ role: 'user', content: parts }], 16000);
      // TOKENS 줄 분리
      let tokens = null, guideMd = md;
      const tm = md.match(/TOKENS:(\{[\s\S]*?\})\s*$/);
      if (tm) {
        try { tokens = JSON.parse(tm[1]); } catch {}
        guideMd = md.slice(0, tm.index).trim();
      }
      return res.status(200).json({ guideMd, tokens });
    }

    if (mode === 'compose') {
      const { guideMd, content, imageList } = req.body;
      if (!guideMd || !content) return res.status(400).json({ error: '가이드와 원고가 필요합니다.' });
      const imgDesc = (imageList && imageList.length)
        ? `\n\n[사용 가능한 이미지 ${imageList.length}장 — 반드시 {{IMAGE_n}} 플레이스홀더로만 참조]\n` +
          imageList.map((d, i) => `{{IMAGE_${i + 1}}}: ${d}`).join('\n')
        : '\n\n[제공된 이미지 없음 — 가이드의 그라데이션·도형·인라인 SVG로 비주얼을 구성할 것]';
      const user = `[디자인가이드]\n${String(guideMd).slice(0, 40000)}\n\n[원고]\n${String(content).slice(0, 50000)}${imgDesc}\n\n위 디자인가이드를 충실히 구현한 완성 HTML을 출력해라.`;
      let html = await callClaude(apiKey, composeSystem(part), [{ role: 'user', content: user }], 60000);
      html = html.replace(/^```(?:html)?\s*/i, '').replace(/```\s*$/, '').trim();
      const start = html.indexOf('<!DOCTYPE');
      if (start > 0) html = html.slice(start);
      return res.status(200).json({ html });
    }

    return res.status(400).json({ error: 'unknown mode' });
  } catch (err) {
    return res.status(500).json({ error: String(err && err.message ? err.message : err) });
  }
};

module.exports.config = { maxDuration: 300 };
