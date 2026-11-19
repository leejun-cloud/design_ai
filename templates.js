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
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Caveat:wght@400;500;600;700&family=Montserrat:wght@400;500;600;700;800;900&family=Noto+Serif+KR:wght@400;600;700&display=swap">`;

/* ---------- 파트별 레이아웃 틀 (등록 폼 선택지) ---------- */
const LAYOUTS = {
  ppt: [
    { id: 'boldtypo',  name: '볼드 타이포 (큰 글자가 주인공)' },
    { id: 'dark',      name: '다크 모드 (테크 키노트)' },
    { id: 'editorial', name: '에디토리얼 (매거진 명조)' },
    { id: 'earthy',    name: '어스톤 미니멀 (차분한 녹색·테라코타)' },
    { id: 'corporate', name: '기업 보고서형 (네이비 그리드)' },
    { id: 'arctic',    name: '북극의 친구들 (빙하 블루·오로라 그린)' },
    { id: 'winterland',name: '윈터 랜드스케이프 (포레스트 그린·베리 레드)' },
  ],
  poster: [
    { id: 'bigtypo',  name: '빅 타이포 (스위스 스타일)' },
    { id: 'neon',     name: '네온 누아르 (다크+형광, 공연용)' },
    { id: 'nouveau',  name: '클래식 프레임 (아르누보·전시용)' },
    { id: 'warmgrad', name: '웜 그라데이션 (오렌지·퍼플)' },
    { id: 'retro',    name: '레트로 프린트 (복고 전단)' },
  ],
  doc: [
    { id: 'lesson',   name: '강의안 (학습목표·단계표 교육 설계형)' },
    { id: 'proposal', name: '기획서 (배경→전략→실행 제안형)' },
    { id: 'report',   name: '보고서 (현황·성과·다음 단계)' },
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
  { id: 'ppt-polar-bears', part: 'ppt', layout: 'arctic', name: '북극의 친구들',
    ref: 'Slide Members, “Where do polarbears live” (SM-7167) — 40장 16:9 교육용 테마. 흰 배경 위 블루·그린 조합, 북극곰·빙산·바다·오로라 이미지의 차가운 자연광 톤을 분석해 재구성.',
    guide: '풀블리드 자연 사진과 순백 여백, 오로라 민트→글래시어 시안 그라데이션, 원형 프레임·원형 사진 콜라주, 기하학적 고딕과 유려한 스크립트의 교차 타이포를 핵심 문법으로 삼는다. 8개 마스터를 원고 길이에 따라 반복하며, 사진 위의 텍스트는 캡슐/그라데이션 실드로 보호한다.',
    tokens: { primary: '#00A8E8', secondary: '#1CD8A5', bg: '#FFFFFF', text: '#68737D', font: 'sans' } },
  { id: 'ppt-winter-landscape', part: 'ppt', layout: 'winterland', name: '윈터 랜드스케이프',
    ref: 'Slide Members, “Winter Landscape Best PowerPoint Templates” (SM-20362) — 30장, 16:9. 겨울 풍경 사진과 레드·그린 팔레트, Georgia·Calibri·Fave Script Pro 서체 조합, 다이어그램·차트·목업 페이지 구성을 분석해 재구성.',
    guide: '북극 테마의 차갑고 깨끗한 블루 톤과 달리, 설경 사진에 포레스트 그린과 베리 레드를 얹은 포근한 겨울 에디토리얼 스타일. 사진은 표지에서 크게 사용하고 내지에서는 얇은 프레임의 풍경 카드로 반복한다. Georgia 제목과 손글씨 포인트를 제한적으로 섞고, 데이터 페이지는 정돈된 Calibri 그리드로 가독성을 지킨다.',
    tokens: { primary: '#285446', secondary: '#B8464B', bg: '#F8F7F2', text: '#26332E', font: 'serif' } },

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


  { id: 'doc-lesson', part: 'doc', layout: 'lesson', name: '강의안 (교육 설계형)',
    ref: '학교·교회학교·성인교육 표준 수업 지도안 양식',
    guide: '학습목표 → 단계표(도입·전개·정리) → 활동 상세 → 평가·과제의 교육 설계 문서. 자료를 주면 AI가 강의안을 직접 집필한다.',
    tokens: { primary: '#1d4ed8', secondary: '#f59e0b', bg: '#ffffff', text: '#1f2937', font: 'sans' } },
  { id: 'doc-proposal', part: 'doc', layout: 'proposal', name: '기획서 (제안형)',
    ref: '사업·행사·프로젝트 제안 표준 구조 (배경→목표→전략→실행→예산)',
    guide: '문제 정의에서 실행 계획·예산까지 설득 흐름으로 집필하는 제안 문서. 간단한 아이디어 메모만 줘도 기획서로 완성한다.',
    tokens: { primary: '#0f766e', secondary: '#ea580c', bg: '#ffffff', text: '#1f2937', font: 'sans' } },
  { id: 'doc-report', part: 'doc', layout: 'report', name: '보고서 (운영·결과)',
    ref: '기관·단체 운영 보고 표준 구조 (개요→현황→성과→다음 단계)',
    guide: '기간·실적 자료를 주면 요약과 표 중심의 운영/결과 보고서로 집필한다.',
    tokens: { primary: '#334155', secondary: '#b91c1c', bg: '#ffffff', text: '#1f2937', font: 'sans' } },
  /* ===== 링크에서 복제한 템플릿 (AI 정밀 분석) ===== */
  {"id":"url-winter-landscape","part":"ppt","layout":"editorial","name":"겨울 풍경 포토그래픽 미니멀","ref":"링크에서 디자인가이드 복제: https://www.slidemembers.com/en_US/view/PPT-Templates/winter-landscape-best-powerpoint-templates-20362","guide":"Three source 이미지를 확인했다. 이제 디자인 분석을 바탕으로 가이드 문서를 작성한다.","guideMd":"Three source 이미지를 확인했다. 이제 디자인 분석을 바탕으로 가이드 문서를 작성한다.\n\n# 디자인 가이드 — Frozen Serenity (겨울 풍경 포토그래픽 미니멀)\n\n## 1. 전체 디자인 시스템\n\n### 1.1 핵심 디자인 철학\n\n1. **포토그래픽 리얼리즘 우선 (Photo-First)** — 디자인 요소(도형, 아이콘, 패턴)를 거의 배제하고, 고해상도 실사 풍경 사진 자체가 배경이자 주인공이 되는 구조. 그래픽은 사진의 분위기를 해치지 않는 최소한의 텍스트 레이어로만 개입한다.\n2. **차가운 단색조의 정서적 일관성 (Monochromatic Cool Palette)** — 블루~그레이~화이트의 저채도 한색 계열로 전 슬라이드를 통일, \"겨울의 고요함\"이라는 단일 감정을 끝까지 유지한다. 색은 장식이 아니라 분위기 전달 도구.\n3. **세리프 타이포의 고급 대비 (Elegant Serif Overlay)** — 사진 위에 얇고 우아한 세리프체(Georgia류)를 크게 올려, 거칠고 차가운 자연 이미지와 섬세하고 따뜻한 손글씨 느낌의 타이포를 대비시켜 \"다큐멘터리+에디토리얼\" 톤을 만든다.\n4. **여백과 프레임의 절제된 레이어 깊이감** — 전체 슬라이드를 얇은 외곽 프레임(테두리)으로 감싸고, 내부에는 사진-텍스트 두 레이어만 존재. 장식 요소를 더하지 않음으로써 \"잡지 화보\" 같은 공백의 힘을 사용한다.\n\n### 1.2 컬러 팔레트 및 그라데이션 공식\n\n| 구분 | 컬러명 | HEX | RGB | 적용 영역 및 역할 |\n|---|---|---|---|---|\n| Primary | 글레이셜 블루 | #3E6B8A | rgb(62,107,138) | 얼음/호수 표면의 중간톤, 섬네일 배경색, 포인트 컬러 |\n| Primary Dark | 딥 나이트 블루 | #16222E | rgb(22,34,46) | 얼어붙은 호수 하단부, 그림자 영역, 저대비 텍스트 배경 |\n| Secondary | 세이지 그린 | #7D9A7E | rgb(125,154,126) | \"Welcome\" 같은 보조 라벨 텍스트, 포인트 악센트 컬러 |\n| Neutral Light | 오프화이트 미스트 | #ECEFEE | rgb(236,239,238) | 간지/본문 슬라이드 배경, 여백 영역 |\n| Neutral Mid | 소프트 그레이 | #5B6560 | rgb(91,101,96) | 본문 슬라이드 타이틀 텍스트, 중립 아이콘 |\n| Accent | 퓨어 화이트 | #FFFFFF | rgb(255,255,255) | 표지 타이틀 텍스트, 하이라이트, 프레임 보더 |\n| Accent (텍스트 보조) | 라이트 그레이 | #D8DEE2 | rgb(216,222,226) | 본문 캡션(Lorem ipsum) 텍스트, 저강조 정보 |\n\n**시그니처 그라데이션 공식**: 표지/간지 사진 위에는 실제 \"그라데이션 오버레이\"보다는 **사진 자체의 자연광 그라데이션**(상단 하늘의 연한 밝은 블루 #C9D6DD → 중단 설산의 중간 톤 → 하단 얼음 호수의 짙은 네이비 #16222E)을 그대로 활용. 디자인 상 인위적 오버레이를 추가할 경우:\n`background: linear-gradient(180deg, rgba(201,214,221,0.15) 0%, rgba(22,34,46,0.55) 100%)` — 사진 위 상단은 거의 투명, 하단으로 갈수록 짙은 네이비 55% 오버레이를 깔아 하단 텍스트(캡션) 가독성을 확보한다.\n\n**텍스트 가독성 오버레이 공식**: 타이틀이 올라가는 영역(사진 중앙~하단 1/3)에는 `rgba(22,34,46,0.25)` 수준의 약한 반투명 다크 레이어를 국소적으로 깔아 흰색 세리프 타이틀의 대비를 높인다(자연광이 밝은 경우에만 적용, 과하게 어둡지 않게).\n\n### 1.3 타이포그래피 시스템\n\n| 위계 요소 | 원본 폰트 | 한글 대체 추천 | 크기 | 굵기·스타일 규칙 |\n|---|---|---|---|---|\n| 메인 타이틀 (표지/간지) | Georgia (세리프) | 리디바탕, 마루 부리, 조선일보명조 | 72~96pt | Regular, 자간 넓게(+20~40), 전체 폭의 70~85% 차지하도록 초대형 배치. 사진 위 화이트 또는 소프트 그레이 |\n| 서브 레이블 (예: \"Welcome\") | Georgia Italic-like | 마루 부리 Light | 22~26pt | Regular, 세이지 그린 포인트 컬러, 타이틀 바로 위 소배치, 자간 넓게 |\n| 소제목 (본문 슬라이드 타이틀) | Georgia | 리디바탕 | 44~56pt | Regular, 소프트 그레이(#5B6560), 좌측 정렬 |\n| 본문/캡션 (Lorem ipsum류) | Calibri | Pretendard, 노토산스 | 14~16pt | Regular, 행간 1.6~1.8 넉넉하게, 라이트 그레이 또는 반투명 화이트, 우측 정렬 또는 좌측 정렬 혼용 |\n| 마이크로 텍스트 (로고/워터마크) | Fave Script Pro (필기체) + Calibri | 나눔손글씨 + Pretendard | 10~12pt | 로고 옆 보조 텍스트, 최하단 중앙 배치 |\n\n**조형 규칙**: 메인 타이틀은 항상 사진의 수평선(지평선/수평선) 근처에 겹쳐 배치하여 \"자연 배경 위에 글자가 떠 있는\" 레이어 깊이감을 만든다. 서브 레이블(Welcome)과 메인 타이틀은 수직으로 밀착 배치(간격 0~10pt)하고, 본문 캡션은 타이틀과 충분한 여백(80~120pt)을 두어 시각적 위계를 분리한다. 타이틀 하단에 얇은 1px 디바이더 라인(#D8DEE2)을 삽입해 캡션 블록과의 경계를 표시하는 것도 허용되는 변형.\n\n## 2. 사진과 그래픽의 조화 원칙\n\n- **피사체 분리**: 인물/사물이 들어간 사진(예: 바위 위에 선 등산객)은 피사체를 프레임의 좌측 1/3 또는 우측 1/3에 배치하고, 텍스트는 반드시 반대편 여백에 둔다(사진-텍스트 좌우 분할 구도).\n- **마스킹/크롭**: 표지성 풍경 사진은 크롭 없이 풀블리드(bleed)로 16:9 전체를 채우며, 본문/간지형 사진은 명확한 사각형 틀(얇은 1px 외곽선 또는 그림자 없는 플랫 크롭)로 박스 처리해 \"액자\" 느낌을 준다.\n- **오버레이 기법**: 밝은 사진(하늘, 눈) 위에 화이트 텍스트를 올릴 때는 로컬 다크 그라디언트(상단 1.2 공식)를 적용하고, 어두운 사진(그림자, 밤) 위에는 오버레이 없이 그대로 화이트 텍스트를 사용한다.\n- **가독성 확보**: 캡션/본문 텍스트는 항상 사진에서 가장 톤이 균일하고 디테일이 적은 영역(예: 얼어붙은 호수의 매끈한 표면)에 배치해 텍스트 뒤 노이즈를 최소화한다.\n- **여백 프레임**: 모든 슬라이드 외곽에 8~12px 두께의 오프화이트(#ECEFEE) 여백 프레임을 둘러, 사진이 화면 끝까지 닿지 않고 \"작품처럼 액자화\"된 느낌을 유지한다(표지 제외 가능).\n\n## 3. 페이지별 구성요소 및 상세 배치 설계도\n\n**캔버스 기준: 1280×720px (16:9), 외곽 여백 프레임 10px**\n\n### Master 1 — 표지 (Cover / Title Slide)\n- 레이어 순서: ① 풀블리드 풍경사진(배경, z=0) ② 하단 로컬 다크 오버레이(z=1) ③ 메인 타이틀 \"Winter Landscape.\"(z=2) ④ 우하단 본문 캡션 4줄(z=3) ⑤ 최하단 중앙 로고(z=4)\n- 메인 타이틀: x=60px, y=200px(수직 중앙보다 약간 위, 수평선과 겹침), 폭 900px, 폰트 Georgia 84pt, 컬러 #FFFFFF\n- 본문 캡션: x=560px, y=355px, 폭 340px, 우측 정렬, 폰트 14pt, 컬러 rgba(255,255,255,0.85), 행간 1.8\n- 로고: x=center, y=690px, 폭 120px\n\n### Master 2 — 간지/섹션 전환 (Section Divider, 좌우 분할형)\n- 레이어 순서: ① 배경 오프화이트(#ECEFEE, z=0) ② 좌측 세로형 사진 박스(z=1, 플랫 크롭 액자) ③ 우측 텍스트 블록(z=2)\n- 사진 박스: x=85px, y=85px, 폭 420px, 높이 550px (세로 비율 사진, 플랫 테두리 없음, 그림자 없음)\n- 서브 레이블 \"Welcome\": x=805px(우측 정렬 기준), y=185px, 폰트 Georgia 24pt, 컬러 #7D9A7E\n- 메인 타이틀: x=580px, y=215px, 폭 580px, 우측 정렬, 폰트 Georgia 68pt, 컬러 #5B6560\n- 디바이더 라인: x=665~1125px, y=472px, 두께 1px, 컬러 #D8DEE2\n- 본문 블록 1: y=382~425px / 디바이더 / 본문 블록 2: y=505~548px, 각 14pt 2줄, 컬러 #8A9492, 우측 정렬\n\n### Master 3 — 축소형 표지(요약 배너형, 썸네일/목차 겸용)\n- 레이어 순서: ① 풀블리드 사진(z=0, 상단 60% 비중 확대) ② 상단 밀착 타이틀(z=1) ③ 타이틀 하단 소형 캡션(z=2) ④ 하단 로고(z=3)\n- 메인 타이틀: x=40px, y=55px, 폭 전체의 90%, 폰트 Georgia 48pt(16:9 축소 버전이므로 본비율 대비 작게), 컬러 #FFFFFF, 좌측 정렬\n- 소형 캡션: x=center~우측, y=110px, 폭 200px, 폰트 7~8pt, 컬러 rgba(255,255,255,0.8)\n- 로고: x=center, y=170px, 폭 70px\n\n### Master 4 — 본문/콘텐츠 슬라이드 (추정 설계: 목차/리스트형)\n- 배경: 오프화이트(#ECEFEE) 또는 전면 풍경사진 + 전체 다크 오버레이(rgba(22,34,46,0.45))\n- 소제목: x=60px, y=60px, 폰트 Georgia 36pt, 컬러 #5B6560(라이트 배경) 또는 #FFFFFF(사진 배경)\n- 콘텐츠 영역: y=160px~640px, 2~3컬럼 그리드, 컬럼 간격 40px, 각 컬럼 상단에 소형 사진 썸네일(16:9 비율, 높이 180px) + 하단 14pt 캡션 2줄\n- 하단 우측 페이지 번호: x=1180px, y=680px, 10pt, #8A9492\n\n### Master 5 — 인용/임팩트 슬라이드 (대형 텍스트 단독형)\n- 배경: 전면 풍경사진 + 상하 그라데이션 오버레이(공식 1.2 그라데이션)\n- 중앙 대형 문구: 화면 중앙 정렬, 폭 800px, 폰트 Georgia Italic 느낌 42pt, 컬러 #FFFFFF, 행간 1.4\n- 출처/서브텍스트: 문구 하단 30px, 14pt, 세이지 그린(#7D9A7E)\n\n### Master 6 — 클로징/마무리 슬라이드\n- Master 1과 동일 레이아웃이되 타이틀을 \"Thank you.\" 류로 치환, 캡션 블록 생략 또는 연락처 정보로 대체, 로고 위치 동일 유지\n\n## 4. 만능 적용 공식\n\n### 주제별 비주얼 소재 치환 매트릭스\n\n| 원본 주제(겨울) | 치환 주제 예시 1(바다/여름) | 치환 주제 예시 2(도시/비즈니스) | 치환 주제 예시 3(숲/자연) |\n|---|---|---|---|\n| 설산+얼어붙은 호수 | 수평선+잔잔한 바다 | 스카이라인+유리 반사면 | 울창한 숲+안개 낀 호수 |\n| 등산객(피사체) | 서퍼/요트 위 사람 | 걷고 있는 직장인 실루엣 | 트레킹하는 사람 |\n| 글레이셜 블루 팔레트 | 터콰이즈/코발트 팔레트 | 스틸그레이/네이비 팔레트 | 포레스트그린/올리브 팔레트 |\n| \"Winter Landscape\" | \"Ocean Horizon\" | \"Urban Vision\" | \"Forest Whisper\" |\n| 세이지 그린 포인트 | 코랄/선셋 오렌지 포인트 | 앰버/골드 포인트 | 모스그린 포인트 |\n\n### 복사해서 쓰는 스타일 고정 프롬프트\n\n```\nCreate a 16:9 PowerPoint-style presentation slide design with the following fixed style rules:\n\n- Photography-first minimalism: a single full-bleed, high-resolution realistic landscape\n  photograph as the entire background. No decorative shapes, icons, or patterns overlaid.\n- Color mood: cool, desaturated monochromatic palette inspired by [glacial blue #3E6B8A,\n  deep night blue #16222E, off-white mist #ECEFEE, sage green accent #7D9A7E]. Replace with\n  a palette fitting the new topic, but keep the same cool-to-neutral, low-saturation,\n  single-mood logic.\n- Typography: one large elegant serif headline (Georgia-like, 70-90pt, wide letter spacing,\n  white or soft gray) placed overlapping the photo's horizon line. A small serif/italic\n  label word (e.g. \"Welcome\") in the sage-green accent color sits directly above the\n  headline. Secondary body captions in a humanist sans-serif (Calibri-like), small (14pt),\n  light gray or translucent white, generous 1.6-1.8 line height, placed in empty photo areas\n  with minimal visual noise.\n- Layout: either (a) full-bleed cover with headline over the horizon and caption block in\n  one bottom corner, or (b) split-layout divider with a flat-cropped vertical photo on one\n  side (no border radius, no shadow) and right-aligned text block with a thin 1px divider\n  line separating two caption paragraphs.\n- Framing: wrap the entire slide in a thin 8-12px off-white margin frame so the photo feels\n  gallery-framed rather than touching the canvas edge (cover slides may bleed full).\n- Overlay rule: apply a subtle local dark gradient (rgba(22,34,46,0.25-0.55)) only behind\n  text regions on bright photo areas to preserve legibility, never a full-slide tint.\n- Mood: serene, documentary-editorial, quiet, cold elegance. No clutter, no icons, no bright\n  saturated colors, no busy patterns.\n\nSubject to depict: [치환할 주제, 예: \"a calm ocean horizon at sunrise with a lone surfer\"]\nHeadline text: \"[새 타이틀]\"\nAccent label: \"[보조 라벨 단어]\"\n\nAbsolutely NO extra graphic elements beyond photo + typography, NO icons, NO illustrations.\n```","previewUrl":"https://imgscf.slidemembers.com/docs/1/1/947/winter_landscape_best_powerpoint_templates_946534.jpg","source":{"type":"url","url":"https://www.slidemembers.com/en_US/view/PPT-Templates/winter-landscape-best-powerpoint-templates-20362"},"tokens":{"primary":"#3E6B8A","secondary":"#7D9A7E","bg":"#ECEFEE","text":"#5B6560","font":"serif"}},
  {"id":"url-bakery-pitch","part":"ppt","layout":"editorial","name":"에스프레소 미니멀 베이커리 IR","ref":"링크에서 디자인가이드 복제: https://www.slidemembers.com/en_US/view/PPT-Templates/bakery-cafe-pitch-deck-ppt-template-%3F-restaurant-investor-presentation-design-ppt-slide-templates-21839","guide":"디자인 가이드를 파일로 저장하려 했으나 쓰기 권한이 없어 저장되지 않았다. 아래에 전체 내용을 바로 출력한다.","guideMd":"디자인 가이드를 파일로 저장하려 했으나 쓰기 권한이 없어 저장되지 않았다. 아래에 전체 내용을 바로 출력한다.\n\n---\n\n# 디자인 가이드 — 프리미엄 베이커리 카페 투자 유치(IR) 피치덱\n\n## 1. 전체 디자인 시스템\n\n### 1.1 핵심 디자인 철학\n\n1. **따뜻한 미니멀리즘(Warm Minimalism)** — 짙은 에스프레소 브라운과 아이보리/크림 배경의 대비만으로 고급스러움을 표현한다. 화려한 장식 대신 넉넉한 여백과 절제된 라인이 \"프리미엄 F&B 브랜드\"의 신뢰도를 만든다.\n2. **세리프×산세리프 이원 체계** — 타이틀/소제목은 클래식한 세리프(Didone 계열, 원본 Cinzel)로 브랜드 헤리티지를, 본문/데이터는 깔끔한 산세리프로 가독성과 현대적 신뢰감을 동시에 확보한다.\n3. **괄호형 프레임 모티프(\"brace frame\")** — 상단/하단 모서리에 위아래로 벌어지는 가는 실선 괄호(악보의 \"{\"를 눕힌 듯한 곡선)가 반복 등장해 슬라이드 전체를 하나의 \"무대\"처럼 감싼다. 전체 덱을 관통하는 시그니처 그래픽 요소다.\n4. **카드 기반 레이어 깊이감** — 모든 콘텐츠 블록은 둥근 모서리의 화이트/크림 카드 위에 얹히고, 연한 드롭섀도우로 배경에서 \"살짝 떠 있는\" 깊이를 준다. 아이콘은 브라운 그라데이션 원형 배지에 담아 카드 위에 다시 한 번 레이어를 쌓는다.\n\n### 1.2 컬러 팔레트 및 그라데이션 공식\n\n| 구분 | 컬러명 | HEX | RGB | 적용 영역 및 역할 |\n|---|---|---|---|---|\n| Primary | Espresso Dark Brown | #3B2A20 | 59,42,32 | 메인 타이틀, 핵심 바디 텍스트, 아이콘 배지 그라데이션 시작색 |\n| Primary Light | Roast Brown | #8A5A3C | 138,90,60 | 타이틀 그라데이션 끝색, 강조 숫자, 라인/보더 |\n| Secondary | Terracotta Accent | #C07A4A | 192,122,74 | 불릿 포인트 점, 보조 타이틀(\"Premium\", \"Bakery Cafe\"), 강조 텍스트 |\n| Neutral BG | Warm Ivory | #EFECE6 | 239,236,230 | 슬라이드 전체 배경 |\n| Neutral Card | Soft White | #FBFAF8 | 251,250,248 | 콘텐츠 카드/박스 배경 |\n| Neutral Text | Charcoal Gray | #4A4540 | 74,69,64 | 본문 텍스트, 캡션 |\n| Accent Muted | Taupe Gray | #A39E96 | 163,158,150 | 우상단 라벨, 보조 캡션, 테두리선 |\n\n**시그니처 그라데이션 공식**\n- 아이콘 배지(원형): `linear-gradient(135deg, #3B2A20 0%, #8A5A3C 100%)` — 좌상단 진한 에스프레소 → 우하단 밝은 로스트 브라운 대각선 135°. 내부 아이콘은 항상 흰색 라인 아이콘.\n- 타이틀 텍스트 그라데이션(표지 \"Premium\"): `linear-gradient(90deg, #8A5A3C 0%, #3B2A20 100%)` 수평 그라데이션을 텍스트에 클리핑.\n- **오버레이 공식(사진 위)**: 별도 색상 오버레이 없이 둥근 모서리(radius 24px)로 프레임을 잘라내고, 테두리에 1px 연한 베이지 라인(#D8D2C8)을 둘러 \"액자\" 느낌을 준다. 사진은 고명도 대비(어두운 배경 + 밝은 크림색 피사체)를 유지하는 원본으로 선택한다.\n\n### 1.3 타이포그래피 시스템\n\n| 위계 요소 | 원본 폰트 | 한글 대체 추천 | 크기 | 굵기·스타일 규칙 |\n|---|---|---|---|---|\n| 메인 타이틀(표지) | Cinzel (세리프) | 마루부리 Bold, Noto Serif KR Black | 44~54pt | Bold, 좁은 행간(1.05), 1단어만 그라데이션 강조 |\n| 섹션 타이틀(본문) | Cinzel | Noto Serif KR SemiBold | 28~32pt | Bold, 상단 괄호 프레임 바로 아래 좌측 정렬 |\n| 서브 라벨(알약 뱃지) | Cinzel Italic | 가는 고딕+이탤릭 대체 | 12~14pt | 이탤릭, 자간 넓게, 테두리만 있는 알약(pill) 안 배치 |\n| 소제목(카드/리스트 헤더) | Pretendard Bold | Pretendard Bold / 본고딕 Bold | 16~18pt | Bold, 불릿 도트(terracotta) + 텍스트 |\n| 본문(설명 문단) | Pretendard Regular | Pretendard Regular | 12~13pt | Regular, 행간 1.5, #4A4540 |\n| 핵심 데이터(숫자) | Cinzel/Playfair Display | Noto Serif KR Bold | 32~40pt | Bold 세리프, 아이콘 배지 아래 단독 배치 |\n| 마이크로 텍스트(캡션) | Pretendard Light | Pretendard Light | 9~10pt | 연한 회색(#A39E96), 우상단 라벨·하단 로고 |\n\n**조형 규칙**: 세리프 타이틀과 산세리프 본문이 같은 블록 안에서 수직으로 중첩될 때는 항상 \"세리프(크고 진하게) → 산세리프(작고 연하게)\" 순서로 쌓아 위계를 명확히 하고, 세리프 요소에는 알약형 아웃라인 배지를 동반시켜 \"라벨 → 타이틀\" 리듬을 만든다.\n\n## 2. 사진과 그래픽의 조화 원칙\n\n- **피사체 분리**: 라떼아트 컵, 크루아상 등 피사체는 항상 어두운 배경(짙은 원목 테이블, 다크 보케) 위에서 촬영된 이미지를 선택해, 동일 계열 브라운 팔레트 안에서도 피사체가 밝은 크림/화이트 톤으로 도드라지게 한다.\n- **마스킹**: 사진은 큰 둥근 사각형(radius 약 20~24px)으로 마스킹하고 전체 영역의 약 40~45%를 차지하도록 우측에 배치. 색보정 없이 원본 톤을 유지하되 얇은 베이지 보더로 \"액자\" 느낌을 준다.\n- **오버레이/가독성 확보**: 사진 위에 텍스트를 직접 올리지 않는다. 텍스트는 항상 사진 바깥 좌측 영역에 배치. 괄호 프레임이 사진 프레임을 가로질러 이어지며 사진과 텍스트 영역을 하나의 틀로 묶는다.\n- **아이콘과 사진의 위계 분리**: 원형 그라데이션 아이콘 배지는 사진보다 작고 카드 우상단에 고정 배치되어, 사진의 사실적 무드와 아이콘의 추상적 정보 전달을 분리한다.\n\n## 3. 페이지별 구성요소 및 상세 배치 설계도 (16:9, 1280×720 기준)\n\n### [Master 1] 표지(Cover)\n- 상단 중앙: \"PITCH DECK\" 마이크로 라벨(진회색, 자간 넓음, 10pt, 중앙정렬, y:32px)\n- 좌측 블록(x:80~450px):\n  - \"Premium\" 알약형 아웃라인 배지(x:80, y:118, w:135, h:38, border 1px #A39E96, radius 19px, 세리프 이탤릭, terracotta)\n  - 메인 타이틀 4줄 \"Premium / Bakery Cafe / Investment / Attraction IR\" (x:80, y:175~365, 세리프 Bold 44pt, 줄간격 56px, 첫 단어만 그라데이션)\n  - \"Bakery Cafe\" 서브라벨(x:80, y:410, 세리프 이탤릭, terracotta, 14pt)\n  - 캡션 \"A premium lifestyle that blends into everyday life\"(x:80, y:438, 산세리프 13pt, #4A4540)\n- 우측 블록: 사진 프레임(x:515, w:400, h:385, radius 24px) — 라떼아트+크루아상 사진, 상/하단에 브라켓 장식(폭 200px, 중앙 정렬)\n- 하단 중앙: \"Slide Members\" 로고 워드마크(y:510)\n- 배경: Warm Ivory 단색\n\n### [Master 2] 데이터 하이라이트(4분면 카드 + 우측 리스트)\n- 상단 괄호 프레임: 얇은 실선(1px, #A39E96)이 좌우 끝에서 둥글게 말려 올라가고, 중앙에서 브라켓(폭 60px)이 교차 — y:30~55px\n- 좌상단: 섹션 타이틀(세리프 Bold 30pt, #3B2A20, x:88, y:78)\n- 우상단: 보조 라벨(산세리프 Light, #A39E96, 12pt)\n- 좌측 2×2 카드 그리드(x:78~718, y:180~660): 카드 약 312×228px, radius 20px, 배경 #FBFAF8, 드롭섀도우(blur 20px, opacity 8%)\n  - 각 카드: 우상단 원형 그라데이션 아이콘 배지(지름 56px) → 좌하단 큰 숫자(세리프 Bold 36pt) → 설명 텍스트(산세리프 13pt)\n- 우측 패널(x:778~1225): \"INVESTMENT POINTS\" 알약 배지 → 3개 항목 세로 스택(점선 구분), 각 항목 terracotta 불릿 + Bold 소제목(15pt) + 2줄 설명(13pt)\n\n### [Master 3] 목차/섹션 간지(추정)\n- 표지와 동일한 괄호 프레임 + 알약 배지 시스템 유지\n- 좌측 큰 세리프 챕터 번호 + 세리프 타이틀, 우측 동일한 라운드 사진 프레임\n- 하단에 가는 가로선으로 구분된 목차 리스트(산세리프, 번호+타이틀)\n\n### [Master 4] 본문 비교/프로세스형(추정)\n- Master 2의 카드+리스트 좌우 2단 그리드 골격 유지, 카드 내부를 \"프로세스 단계\"나 \"비교 항목\"으로 치환\n- 아이콘 배지→숫자/타이틀→캡션의 3단 수직 구조��� 모든 본문 슬라이드의 고정 반복 패턴\n\n### [Master 5] 팀/조직 소개형(추정)\n- 원형 그라데이션 배지를 인물 사진 프레임으로 치환(원형 마스킹, 지름 ~120px)\n- 사진 아래 이름(세리프 Bold)+직책(산세리프 Light)을 \"숫자+캡션\" 패턴과 동일하게 적용\n\n### [Master 6] 클로징/연락처 슬라이드(추정)\n- Master 1의 좌우 반전 버전: 사진 좌측, 텍스트(감사 인사+연락처) 우측\n- 괄호 프레임과 로고 워드마크 하단 고정 배치 유지\n\n## 4. 만능 적용 공식\n\n### 주제별 비주얼 소재 치환 매트릭스\n\n| 산업/주제 | 표지 사진 소재 | 아이콘 배지 모티프 | 핵심 숫자 카드 라벨 예시 | 유지할 요소 |\n|---|---|---|---|---|\n| 베이커리 카페(원본) | 라떼아트+크루아상 | 상점/그래프/고객/파우치 | 매장 수, 매출, 재방문율, 투자금 | 브라운 팔레트, 세리프 타이틀, 괄호 프레임 |\n| 레스토랑/파인다이닝 | 플레이팅 요리 클로즈업 | 포크나이프/별점/테이블/영수증 | 좌석 수, 객단가, 재방문율, 매출 | 동일 |\n| 와인/주류 브랜드 | 와인잔+오크통 | 포도/병/잔/바렐 | 생산량, 빈티지 수, 수출국, 매출 | 동일(브라운→버건디로 색조 전환 가능) |\n| 호텔/리조트 | 조식 테이블+창밖 풍경 | 침대/별/위치핀/카드 | 객실 수, 점유율, 리뷰 점수, 매출 | 동일 |\n| 수제맥주/크래프트 | 맥주잔+홉 | 맥주잔/탱크/트럭/바코드 | 양조량, 출고처, 재구매율, 투자금 | 동일 |\n| 디저트/초콜릿 브랜드 | 디저트 플레이팅 | 케이크/하트/선물상자/지갑 | SKU 수, 월매출, 멤버십율, 투자금 | 동일 |\n\n### 복사해서 쓰는 스타일 고정 프롬프트\n\n```\nDesign a 16:9 PowerPoint slide in a \"Warm Espresso Minimalism\" pitch-deck style.\n\nPALETTE:\n- Background: warm ivory (#EFECE6)\n- Card/box background: soft white (#FBFAF8)\n- Primary text/title: espresso dark brown (#3B2A20)\n- Gradient accent (icon badges, title highlight): 135deg linear-gradient from #3B2A20 to #8A5A3C\n- Secondary accent (bullets, labels): terracotta (#C07A4A)\n- Muted caption/label color: taupe gray (#A39E96)\n\nTYPOGRAPHY:\n- Headlines: classic serif (Cinzel / Playfair Display style), bold, generous letter spacing\n- Subheads/pill badges: serif italic inside a thin-outline pill shape\n- Body copy & data labels: clean sans-serif (Pretendard/Inter style), regular weight, 1.5 line-height\n- Big stat numbers: bold serif, 32-40pt, paired with small sans-serif caption below\n\nSIGNATURE GRAPHIC MOTIF:\n- A thin 1px line \"brace frame\" (like a flattened curly bracket) arcing at the top and bottom edges of the slide, framing the whole composition\n- Rounded-corner photo frames (radius ~24px) with a thin beige border, placed on the right third of the slide\n- Circular gradient icon badges (56px diameter, white line icon inside) attached to the top-right corner of each content card\n\nLAYOUT RULES:\n- Generous whitespace, left-aligned text blocks\n- White rounded cards (radius 20px) with soft drop shadow (8% opacity, 20px blur) for all data/content blocks\n- Dashed divider lines (#D8D2C8) between stacked list items\n- Keep photography naturalistic (no color overlay), cropped into the rounded frame, subject on a dark background for contrast against the ivory page\n\nApply this style to a [여기에 주제/업종 입력] pitch deck slide, replacing photography subject and icon glyphs with [해당 업종에 맞는 소재], keeping every color, type, and layout rule identical.\n```","previewUrl":"https://imgscf.slidemembers.com/docs/1/2/1081/bakery_cafe_pitch_deck_ppt_template_restaurant_investor_presentation_design_ppt_slide_templates_1080480.jpg","source":{"type":"url","url":"https://www.slidemembers.com/en_US/view/PPT-Templates/bakery-cafe-pitch-deck-ppt-template-%3F-restaurant-investor-presentation-design-ppt-slide-templates-21839"},"tokens":{"primary":"#3B2A20","secondary":"#C07A4A","bg":"#EFECE6","text":"#4A4540","font":"serif"}},
  {"id":"url-2026-strategy","part":"ppt","layout":"corporate","name":"네이비 아쿠아 웨이브 보고서","ref":"링크에서 디자인가이드 복제: https://www.slidemembers.com/en_US/view/PPT-Templates/2026-second-half-business-strategy-corporate-performance-report-ppt-template-best-powerpoint-presentation-templates-21806","guide":"1. **네이비×아쿠아 대비의 신뢰감**: 짙은 네이비(딥 블루)를 권위·신뢰의 앵커 컬러로, 밝은 아쿠아/시안을 생동감·성장의 포인트 컬러로 대비시켜 \"보수적이지만 미래지향적인\" 기업 보고서 톤을 만든다. 강한 원색(레드·오렌지) 없이 블루 계열 단일 색상군 안에서 명도 대비만으로 위","guideMd":"# 디자인 가이드 — 2026 하반기 비즈니스 전략 보고서 (Navy-Aqua Corporate Report)\n\n## 1. 전체 디자인 시스템\n\n### 1.1 핵심 디자인 철학\n\n1. **네이비×아쿠아 대비의 신뢰감**: 짙은 네이비(딥 블루)를 권위·신뢰의 앵커 컬러로, 밝은 아쿠아/시안을 생동감·성장의 포인트 컬러로 대비시켜 \"보수적이지만 미래지향적인\" 기업 보고서 톤을 만든다. 강한 원색(레드·오렌지) 없이 블루 계열 단일 색상군 안에서 명도 대비만으로 위계를 구성한다.\n2. **대각선 웨이브(Wave) 모티프의 일관된 반복**: 모든 마스터 슬라이드 상단~좌측에 동일한 유기적 곡선(wave) 그래픽이 좌상단 또는 상단 전체를 가로지르며 등장한다. 직선적인 기업 보고서에 \"흐름·전환·역동성\"이라는 소프트한 시각적 서명을 부여하는 핵심 장치.\n3. **여백 기반 카드 레이어링**: 콘텐츠는 항상 \"배경(연한 웨이브 그라디언트) → 카드(화이트 또는 네이비 솔리드, 큰 radius) → 텍스트/숫자\" 3단 레이어로 쌓인다. 카드는 그림자 없이 미세한 테두리/배경색 차이만으로 분리되어 플랫하면서도 입체적인 느낌을 준다.\n4. **정보 밀도 최소화 + 숫자 강조**: 한 슬라이드당 핵심 메시지 1~2개, 핵심 수치(%)는 본문 대비 4~6배 크기로 키워 \"읽지 않아도 숫자가 먼저 보이는\" 구조를 만든다.\n\n### 1.2 컬러 팔레트 및 그라데이션 공식\n\n| 구분 | 컬러명 | HEX | RGB | 적용 영역 및 역할 |\n|---|---|---|---|---|\n| Primary | Deep Navy | #0F3C57 | 15,60,87 | 메인 타이틀 텍스트, 다크 카드 배경, 숫자 원형 배지 배경, 헤더 텍스트 |\n| Primary Dark | Midnight Navy | #0A2A3F | 10,42,63 | 다크 카드 그라데이션 하단, 웨이브 그래픽 가장 짙은 영역 |\n| Secondary / Accent | Aqua Mint | #8FE3D9 | 143,227,217 | 강조 숫자 바(차트), 웨이브 그래픽 밝은 전환부, 강조 포인트 |\n| Secondary Dark | Teal Blue | #1B6E8C | 27,110,140 | 보조 막대그래프, 서브 헤딩 컬러, 링크성 텍스트 |\n| Neutral Background | Ice Blue White | #F3FAFB | 243,250,251 | 전체 슬라이드 배경(밝은 끝부분) |\n| Neutral Surface | Pure White | #FFFFFF | 255,255,255 | 콘텐츠 카드 배경, 본문 슬라이드 하단 영역 |\n| Neutral Text | Slate Gray | #6B7784 | 107,119,132 | 본문 설명 텍스트, 캡션, 저자 라벨 |\n| Accent Dark | Ink Navy | #0D2B3E | 13,43,62 | 숫자 배지 텍스트 배경 대비용 |\n\n**시그니처 그라데이션 공식 (웨이브 배경)**\n- 각도: 유기적 블롭/웨이브 셰이프이나, 색상 흐름은 약 135°~160° 방향\n- 색 전개: `#0A2A3F`(좌상단) → `#1B6E8C`(중간 전환) → `#8FE3D9`(밝은 민트 포인트) → `#EAF6F8`(우하단) → `#FFFFFF`\n- 적용: 표지(Master 1)는 화면의 약 60%를 덮는 대형 웨이브, 내지(Master 2~6)는 상단 15~20% 높이만 얇게 침범하는 축소형 웨이브\n- 다크 카드 그라데이션: `#0F3C57` → `#0A2A3F` (수직/135°, 미세한 톤 변화)\n\n**오버레이 공식**\n- 사진 위 별도 색상 오버레이 없음 — 블루 톤 사진을 선별해 팔레트와 자연히 맞춤. 풀블리드 크롭.\n- 다크 카드 위 텍스트는 불투명 100% 화이트, 별도 그림자 없음.\n\n### 1.3 타이포그래피 시스템\n\n| 위계 요소 | 원본 폰트(추정) | 한글 대체 추천 | 크기(1280px 기준) | 굵기·스타일 규칙 |\n|---|---|---|---|---|\n| 메인 타이틀(표지) | Poppins/Quicksand 계열 Geometric Rounded Sans | Pretendard ExtraBold | 54~60pt | Bold, 네이비, 2줄, 자간 좁게 |\n| 섹션 타이틀 | 동일 Geometric Sans | Pretendard Bold | 40~44pt | Bold, 네이비, 좌측 정렬 |\n| 서브 헤딩(카드 제목) | Poppins SemiBold | Pretendard SemiBold | 18~20pt | 다크카드=화이트, 화이트카드=네이비 |\n| 본문 텍스트 | Roboto/Noto Sans 계열 | Pretendard Regular | 13~14pt | Regular, 회색, 행간 150~160% |\n| 숫자 강조(KPI) | Poppins Bold, 넓은 자간 | Pretendard Bold | 44~56pt | Bold, 화이트/아쿠아 |\n| 마이크로 텍스트(헤더) | Roboto Light | Pretendard Light | 10~11pt | 자간 +0.5~1px |\n\n**조형 규칙**: 상단 헤더 3분할(좌: 리포트명 / 중: 연도·라벨 / 우: 섹션 번호)이 모든 슬라이드 반복. 숫자 배지(원형)+텍스트 교차 배치 시 배지는 좌측 고정폭, 텍스트는 우측 수직 중앙 정렬.\n\n## 2. 사진과 그래픽의 조화 원칙\n- **풀블리드 크롭**: 사진은 슬라이드 경계를 벗어나도록 배치해 공간감 연출, 좌측 끝은 건물 모서리 등 자연스러운 수직선에서 절단.\n- **마스킹 없는 단순 사각형 배치**: 원형/다각형 마스킹 미사용, 좌하단 모서리만 radius.\n- **색온도 매칭**: 블루/시안 계열 사진만 사용(웜톤 배제).\n- **텍스트-이미지 완전 분리**: 텍스트는 항상 사진 반대편에 배치, 겹침 없음.\n- **레이어 순서**: 웨이브 배경(최하단) → 사진 → 헤더/텍스트.\n\n## 3. 페이지별 구성요소 및 상세 배치 설계도\n\n**[Master 1] 표지**: 대형 웨이브 전면 배경(네이비→백색). 헤더 3분할 고정. 중앙 메인 타이틀 2줄(56pt) + 서브텍스트 + 알약형 CTA 버튼 + 하단 로고.\n\n**[Master 2] 목차**: 축소 웨이브(상단 25%). 좌측 \"Contents\" 타이틀(44pt) + 4개 원형 배지 리스트(56px 간격). 우측 풀블리드 건물 사진(캔버스 46~100%, 세로 25~90%).\n\n**[Master 3] 본문(Executive Summary)**: 상단 얇은 웨이브 스트립. 좌측 화이트 카드 2개 세로 스택(제목+본문). 우측 다크 네이비 카드(제목+설명+미니 막대그래프 2개+메인 KPI \"+78%\" 48pt).\n\n**[Master 4] 간지/섹션 전환(추정)**: 표지 축소형 웨이브(35%), 좌측 정렬 대형 섹션 번호+섹션명+하위 목차 리스트.\n\n**[Master 5] 데이터 그리드(추정)**: 상단 웨이브 스트립+타이틀, 하단 3~4단 KPI 컬럼 그리드(숫자+라벨, 세로 구분선).\n\n**[Master 6] 클로징(추정)**: 표지의 거울 구성(웨이브 우상단→좌하단), 중앙 타이틀+하단 로고/연락처.\n\n## 4. 만능 적용 공식\n\n| 원본 주제 | 목차 사진 | KPI 차트 주제 | 다크 카드 주제 |\n|---|---|---|---|\n| 마케팅 | 캠페인 스튜디오 사진 | ROAS/전환율 | 캠페인 전략 |\n| IT/SaaS | 데이터센터/서버랙 | MRR/가입자 수 | 제품 로드맵 |\n| 헬스케어 | 병원 로비 블루톤 | 환자 만족도/회복률 | 치료 프로토콜 |\n| 제조/공급망 | 자동화 공장 라인 | 생산 효율/불량률 | 공급망 전략 |\n\n```\nDesign style: corporate navy-aqua business report, 16:9 PowerPoint slide.\nBackground: soft organic wave gradient flowing diagonally from deep navy (#0A2A3F)\nthrough teal-blue (#1B6E8C) to light aqua mint (#8FE3D9) fading into near-white\nice-blue (#F3FAFB), occupying the top 15-60% of the canvas depending on slide type.\nTypography: geometric rounded sans-serif (Poppins/Pretendard style), bold navy\n(#0F3C57) titles, gray (#6B7784) body copy, large bold KPI numbers in white or\naqua mint on dark navy cards.\nLayout: flat white rounded cards (large radius ~20px, no drop shadow) for light\ncontent blocks; solid navy-to-midnight gradient rounded cards for highlighted\nstrategic content; circular navy badges with white numerals for list items.\nPhotography: full-bleed cropped architecture/glass-building photos in cool blue\ntones, bottom-left corner rounded, placed opposite text blocks, never overlapping.\nHeader bar: fixed 3-column micro-text header repeated on every slide, 10-11pt.\nAbsolutely NO drop shadows, NO warm/orange tones, NO clutter — maximize\nwhitespace, one key message and one hero number per slide.\n```","previewUrl":"https://imgscf.slidemembers.com/docs/1/2/1079/2026_second_half_business_strategy_corporate_performance_report_ppt_template_best_powerpoint_presentation_templates_1078068.jpg","source":{"type":"url","url":"https://www.slidemembers.com/en_US/view/PPT-Templates/2026-second-half-business-strategy-corporate-performance-report-ppt-template-best-powerpoint-presentation-templates-21806"},"tokens":{"primary":"#0F3C57","secondary":"#8FE3D9","bg":"#F3FAFB","text":"#6B7784","font":"sans"}},
  {"id":"url-dining-franchise","part":"ppt","layout":"boldtypo","name":"블루밍키친 프랜차이즈 피치덱","ref":"링크에서 디자인가이드 복제: https://www.slidemembers.com/en_US/view/PPT-Templates/casual-dining-franchise-proposal-pitch-deck-powerpoint-for-successful-founders-school-ppt-21781","guide":"이미지 3장(표지 2종, 본문 1종) 분석을 바탕으로 디자인 가이드를 작성했습니다.","guideMd":"이미지 3장(표지 2종, 본문 1종) 분석을 바탕으로 디자인 가이드를 작성했습니다.\n\n# 디자인 가이드 — Blooming Kitchen 캐주얼 다이닝 프랜차이즈 피치덱\n\n## 1. 전체 디자인 시스템\n\n### 1.1 핵심 디자인 철학\n\n1. **포토-카피 2분할(Split Canvas) 구조** — 모든 슬라이드가 \"실사 사진 블록 : 백색 정보 블록\"으로 명확히 분리된다. 사진은 분위기·신뢰감을, 백색 영역은 정보 전달을 전담해 가독성과 감성을 동시에 확보한다.\n2. **오렌지 포인트의 절제된 사용** — 베이스는 철저히 흑백(블랙 타이포 + 화이트 배경 + 그레이 보조)이고, 오렌지(#E2621B 계열)는 라벨 탭, 체크 아이콘, 키워드 1~2단어, 구분 태그라인에만 \"점묘법\"처럼 찍어 브랜드 포인트를 만든다. 면적 대비 10% 이하로 억제함으로써 오렌지가 나올 때마다 시선이 꽂히게 설계.\n3. **사진 위에 올라타는 라벨 탭(Overlapping Tab)** — 오렌지 라벨/배지가 사진 프레임 경계선을 넘어 걸치도록 배치해(표지의 원형 배지, 본문의 \"Operating 180+\" 밴드) 평면적인 2분할 레이아웃에 레이어 깊이감을 부여한다.\n4. **그리드 페이퍼 질감의 여백** — 백색 패널 바깥쪽(캔버스 전체 배경)에 옅은 모눈종이(그래프 페이퍼) 패턴을 깔아 \"기획안/제안서\" 다운 실무적·설계도적 톤을 연출. 실제 콘텐츠 패널은 완전한 순백으로 대비시켜 패턴 위에 \"붙여넣은 카드\"처럼 보이게 한다.\n\n### 1.2 컬러 팔레트 및 그라데이션 공식\n\n| 구분 | 컬러명 | HEX | RGB | 적용 영역 및 역할 |\n|---|---|---|---|---|\n| Primary | Signature Orange | #E2621B | 226,98,27 | 라벨 탭 배경, 원형 배지, 체크 아이콘, 키워드 강조 단어, 태그라인, 테마컬러 |\n| Primary(Dark) | Deep Orange(배지 외곽) | #C8530F | 200,83,15 | 원형 배지 외곽 링, 호버/그림자용 어두운 변형 |\n| Secondary | Ink Black | #1A1A1A | 26,26,26 | 메인 타이틀, 숫자(통계), 바디 헤드라인 |\n| Neutral 1 | Card Gray | #F2F2F2 | 242,242,242 | 통계 카드 배경, 구분 박스 |\n| Neutral 2 | Body Gray | #6E6E6E | 110,110,110 | 본문 문단, 서브 라벨(Franchise Proposal), 캡션 |\n| Neutral 3 | Line Gray | #D9D9D9 | 217,217,217 | 모눈 배경선, 구분선, 카드 보더 |\n| Base | Pure White | #FFFFFF | 255,255,255 | 콘텐츠 패널 배경 |\n| Accent(사진 톤) | Warm Wood Brown | #8A5A33 | 138,90,51 | 사진 자체의 우드톤 인테리어/음식 색감과 오렌지 포인트를 연결하는 암묵적 배경색 |\n\n- **시그니처 오렌지 탭 자체는 그라데이션 없는 단색(Flat Fill)** — 라벨/배지/카드 아이콘 모두 플랫 컬러로 처리해 사진의 자연광 질감과 선명히 구분되는 \"스티커\" 느낌을 준다.\n- **원형 배지 오버레이 공식**: 배경 사진 위에 `원형(Orange #E2621B, 지름 ≈ 캔버스 높이의 14%) + 내부 흰색 테두리 스트로크 3px + 중앙 흰색 아이콘` 순으로 레이어링. 배지 중심점은 사진 패널의 좌상단 경계선 위(사진 폭의 바깥쪽 10%, 안쪽 90% 지점)에 배치해 \"경계를 뚫고 나온\" 인상을 만든다.\n- **사진 오버레이 공식**: 사진 자체에는 색 보정 없이 원본 노출 그대로 사용하되, 하단 15~20% 영역에 오렌지 밴드(불투명도 100%, 텍스트 흰색 굵게)를 얹어 사진이 끝나는 지점에서 바로 정보 레이어로 전환.\n\n### 1.3 타이포그래피 시스템\n\n| 위계 요소 | 원본 폰트 | 한글 대체 추천 | 크기(16:9, 1280×720 기준) | 굵기·스타일 규칙 |\n|---|---|---|---|---|\n| 메인 타이틀(표지) | Gravitas One (세리프 디스플레이) | Noto Serif KR Black / 여기어때 잘난체 | 48~54pt | 매우 굵은 블랙, 자간 좁게, 2줄 이내 |\n| 메인 타이틀(본문 헤드) | Pretendard Bold | Pretendard Bold / Noto Sans KR Bold | 32~36pt | 블랙, 섹션당 1회만 등장, 좌측 정렬 고정 |\n| 서브 강조 타이틀(What is~) | Pretendard SemiBold | Pretendard SemiBold | 26~28pt | 앞 1~2단어만 오렌지 컬러, 나머지는 블랙 — 색상으로 끊어 읽히는 2-Tone 타이틀 |\n| 라벨/배지 텍스트 | Pretendard Bold (All Caps) | Pretendard Bold, 자간 +50 | 13~14pt | 흰색, 전체 대문자, 오렌지 박스 안에 중앙 정렬 |\n| 마이크로 라벨(우상단) | Pretendard Medium | Pretendard Medium | 12~13pt | 그레이(#6E6E6E), 슬라이드 종류 표기용 보조 텍스트 |\n| 본문 단락 | Pretendard Regular | Pretendard Regular | 13~14pt | 그레이, 줄간격 1.5, 최대 2~3줄 단락 |\n| 통계 숫자 | Pretendard ExtraBold | Pretendard ExtraBold | 24~28pt | 블랙, 카드 상단 배치 |\n| 통계 캡션 | Pretendard Regular | Pretendard Regular | 12~13pt | 그레이, 숫자 바로 아래 2줄 이내 |\n| 태그라인(하단) | Pretendard Medium | Pretendard Medium | 14~15pt | 오렌지, 가운데점(·)으로 키워드 구분, 중앙 정렬 |\n\n- **교차·중첩 배치 규칙**: (1) 제목은 항상 좌측 상단 고정, 우상단에는 그레이 마이크로 라벨로 \"현재 섹션/문서 성격\"을 표기해 좌-블랙/우-그레이의 비대칭 균형을 만든다. (2) 서브타이틀은 반드시 \"오렌지 단어 + 블랙 단어\" 조합으로, 색이 바뀌는 지점이 의미 단위(예: \"What is\" vs \"Blooming Kitchen?\")와 일치하도록 끊는다. (3) 숫자(통계)는 카드 상단, 설명은 카드 하단으로 수직 위계를 분명히 하고 카드 간 간격은 폰트 크기의 1.5배 이상 확보.\n\n## 2. 사진과 그래픽의 조화 원칙\n\n- **피사체 분리 없는 통짜 사진 사용**: 본 템플릿은 누끼(배경 제거) 없이 사진을 사각 프레임 그대로 꽉 채워(full-bleed) 쓴다. 대신 사진 자체를 \"인물의 손+음식 클로즈업\"처럼 피사체가 화면을 가득 채우는 구도로 선택해 별도 마스킹 없이도 시선이 분산되지 않게 한다.\n- **프레임 경계 오버레이로 가독성 확보**: 사진과 텍스트를 같은 면에 올리지 않는다. 텍스트가 필요한 경우 반드시 (a) 사진 바깥 백색 영역이거나 (b) 사진 하단에 불투명 오렌지 밴드를 깔아 그 위에만 흰 글씨를 쓴다. 사진 위에 직접 반투명 텍스트를 얹는 기법은 사용하지 않음 — 가독성 리스크를 원천 차단하는 보수적 전략.\n- **원형 배지로 사진-백색 영역을 봉합**: 표지에서 오렌지 원형 아이콘 배지가 사진과 백색 패널의 경계선 정중앙에 걸쳐 있어, 두 이질적 영역(사진/플랫 컬러)을 하나의 레이어로 시각적으로 꿰매는 역할을 한다. 이 배지는 실제 업종(식기 아이콘)을 보여주는 픽토그램 역할도 겸한다.\n- **라이팅 매칭**: 선택하는 사진은 공통적으로 따뜻한 우드톤·골든아워 또는 웜 조명 느낌으로 통일해, 오렌지 브랜드 컬러와 사진의 색온도가 자연스럽게 공명하도록 한다(보색이 아닌 유사색 조화).\n\n## 3. 페이지별 구성요소 및 상세 배치 설계도\n\n캔버스 기준 1280×720px (16:9).\n\n### [Master 1] 표지(Cover)\n- 전체 배경: 그리드 페이퍼 패턴(옅은 회색선), 풀블리드.\n- 좌측 백색 콘텐츠 패널: x=48, y=62, w=600, h=600 (둥근 모서리 없음, 직각), 그림자 약하게(0 4px 20px rgba(0,0,0,0.08)).\n  - 좌상단 바깥(패널 밖, 배경 위): \"GROUP TITLE\" 마이크로 라벨, x=62, y=40, 11pt 블랙 Bold, 자간 넓게.\n  - 오렌지 라벨 박스: x=128, y=200, w=265, h=48, 배경 #E2621B, 내부 텍스트 \"BLOOMING KITCHEN\" 흰색 세리프 Bold 올캡, 중앙정렬.\n  - 메인 타이틀: x=128, y=270, \"Franchise Proposal\" 48pt 블랙 Bold Sans, 좌측 정렬.\n  - 하단 메타 정보 2행: \"Date : 20XX.00.00\" / \"Presented by : Service Planning Team\", x=148, y=390~430, 라벨 11pt Bold 블랙 + 값 11pt Regular 그레이, 2열 표.\n  - 패널 하단 중앙: 로고 \"◆ Slide Members\" 워터마크, y=505, 10pt 그레이 (실제 적용 시 발표사 로고로 교체).\n- 우�� 사진 패널: x=660, y=0, w=620, h=720(풀블리드, 캔버스 끝까지), 레스토랑 인테리어 사진(우드톤 테이블, 펜던트 조명, 통유리창).\n  - 원형 오렌지 배지: 중심 (660, 160), 지름 90px, 흰색 테두리 4px, 내부 흰색 식기(포크/스푼/접시) 아이콘, 좌측 패널 경계선 위에 절반 걸치도록 배치.\n\n### [Master 2] 간지/섹션 타이틀\nMaster 1과 동일 골격을 재사용하되 하단 메타 정보 대신 \"섹션 번호(01, 02…) + 섹션명\"만 배치. 오렌지 라벨 박스에는 섹션 카테고리명을 넣고, 사진은 해당 섹션 주제에 맞는 컷으로 교체.\n\n### [Master 3] 본문 — 좌사진/우텍스트 소개형 (예: Brand Introduction)\n- 좌측 사진 패널: x=30, y=42, w=450, h=636, 둥근 모서리 없음, 인물 손+음식 클로즈업 풀블리드.\n  - 오렌지 밴드(하단 오버레이): x=52, y=595, w=405, h=56, 배경 #E2621B, 텍스트 \"Operating 180+\" 흰색 Bold Serif 14pt 중앙정렬. 밴드는 사진 좌우 경계보다 살짝 안쪽(인셋 22px)으로 들어와 \"붙임딱지\"처럼 보이게 함.\n- 우측 백색 콘텐츠 패널: x=502, y=42, w=748, h=636.\n  - 좌상단: 메인 헤드라인 \"Brand Introduction\" 32pt 블랙 Bold, x=560, y=65.\n  - 우상단: 마이크로 라벨 \"Franchise Proposal\" 13pt 그레이, x=1053, y=75, 우측 정렬.\n  - 중단: 서브타이틀 \"What is Blooming Kitchen?\" 26pt — \"What is\"는 오렌지, \"Blooming Kitchen?\"은 블랙, x=560, y=250.\n  - 바디 단락: 13pt 그레이, 줄간격 1.5, 최대 width 640px, x=560, y=320~380.\n  - 통계 카드 3열: 각 카드 w=212, h=130, gap=24, y=440, x=560/796/1032. 카드 배경 #F2F2F2, 카드 우상단에 오렌지 체크 원형 아이콘(지름 32px)이 카드 경계에 절반 걸치도록 배치(여기서도 \"경계 돌파\" 모티프 반복). 카드 내부: 숫자(24pt Bold 블랙, 상단) + 캡션 2줄(12pt 그레이, 하단).\n  - 하단 태그라인: \"Quality · Consistency · Community\", 15pt 오렌지, 중앙정렬, y=625.\n\n### [Master 4] 목차(Agenda/Contents)\n좌측 사진 패널은 축소(w≈380)하고 우측 백색 패널에 번호 리스트(01~05)를 세로 나열. 각 항목: 2자리 숫자(오렌지, 28pt Bold) + 항목명(블랙, 16pt) + 하단 구분선(Neutral 3). 번호와 항목명 사이에 얇은 오렌지 세로선(2px) 배치.\n\n### [Master 5] 데이터/차트 슬라이드\n우측 백색 패널 안에서 사진 없이 풀 콘텐츠 사용. 헤드라인(32pt)+마이크로 라벨 구조는 유지, 본문 영역에 막대/도넛 차트 삽입. 차트 색상은 오렌지(#E2621B) 단색 + 그레이(#D9D9D9) 배경 바(Bar)의 2색 구성만 사용해 과도한 색 분산을 방지.\n\n### [Master 6] 클로징/Contact\n표지와 동일한 2분할 구조를 좌우 반전하여 사용(사진 좌측, 텍스트 우측 또는 그 반대), 메인 카피를 \"Thank You\" 또는 \"Contact Us\"로 교체, 하단에 연락처 3행(담당자/이메일/전화) 배치.\n\n## 4. 만능 적용 공식\n\n| 원본 요소(F&B 프랜차이즈) | 치환 매트릭스 — 테크 스타트업 | 치환 매트릭스 — 교육/에듀테크 | 치환 매트릭스 — 뷰티/코스메틱 |\n|---|---|---|---|\n| 레스토랑 인테리어 풀샷 | 오피스/코워킹 공간 또는 제품 UI 목업 | 강의실/온라인 클래스 화면 | 매장 인테리어/제품 디스플레이 |\n| 음식 클로즈업(손+포크) | 제품을 조작하는 손(디바이스/키보드) | 학생이 노트/태블릿에 필기하는 손 | 제품을 바르는/쥐는 손 클로즈업 |\n| 원형 식기 아이콘 배지 | 원형 로고/앱 아이콘 배지 | 원형 졸업모/책 아이콘 배지 | 원형 꽃/방울 아이콘 배지 |\n| \"Operating 180+\" 밴드 | \"Active Users 1M+\" 밴드 | \"Students 50,000+\" 밴드 | \"Stores 300+\" 밴드 |\n| 오렌지(#E2621B) | 테크 블루(#2563EB) 또는 그대로 유지 | 딥 그린(#1E8E5A) | 로즈(#D94F70) |\n| 통계 카드(5Years/4.6점/32%) | (Funding/MAU/Growth) | (Years Teaching/Satisfaction/Pass Rate) | (Years/Review Score/Repeat Rate) |\n\n### 복사해서 쓰는 스타일 고정 프롬프트\n\n```\nCreate a 16:9 business pitch-deck slide in the \"Split Canvas\" style:\n- Canvas background: subtle light-gray graph-paper grid pattern.\n- Layout: a pure white content card floating on the left ~60% of the canvas\n  (flat drop shadow), and a full-bleed warm, natural-light photograph\n  filling the right ~40% of the canvas edge-to-edge.\n- Color system: strict black (#1A1A1A) for all headline typography,\n  medium gray (#6E6E6E) for body text, light gray (#F2F2F2) for stat-card\n  backgrounds, and ONE signature accent color flat-filled (no gradients)\n  used sparingly only on: a small rectangular label tag, a circular badge\n  icon, checkmark icons inside stat cards, 1-2 keyword words inside the\n  subheadline, and a centered bottom tagline separated by middots.\n- Signature motif: a circular accent-color badge (with a thin white ring\n  and a white pictogram icon inside) straddling the exact boundary line\n  between the photo panel and the white panel, as if punching through it.\n- Typography: large bold black display headline top-left, small gray\n  micro-label top-right, a two-tone subheadline (accent word + black word),\n  3 horizontal stat cards (bold black number on top, gray 2-line caption\n  below, small accent checkmark badge overlapping the card's top-right\n  corner).\n- Photography mood: warm color temperature, natural light, subject fills\n  the frame edge-to-edge, no cutout/masking — straight rectangular crop.\n- Overall feel: clean, professional, restrained use of color, generous\n  whitespace, editorial sans-serif typography (Pretendard/Montserrat-like).\nReplace accent color, photo subject, and keyword texts per [SUBJECT] below.\n[SUBJECT]: {{여기에 치환할 주제 소재와 액센트 컬러 HEX를 기입}}\n```","previewUrl":"https://imgscf.slidemembers.com/docs/1/2/1077/casual_dining_franchise_proposal_pitch_deck_powerpoint_for_successful_founders_school_ppt_1076343.jpg","source":{"type":"url","url":"https://www.slidemembers.com/en_US/view/PPT-Templates/casual-dining-franchise-proposal-pitch-deck-powerpoint-for-successful-founders-school-ppt-21781"},"tokens":{"primary":"#E2621B","secondary":"#1A1A1A","bg":"#FFFFFF","text":"#6E6E6E","font":"sans"}},
  {"id":"url-hopedesign-lecture","part":"ppt","layout":"corporate","name":"휴먼트리 기부제안서 강의자료","ref":"노션 캡처에서 디자인가이드 복제: 기부제안서 작성법 강의자료 (Humantree)","guide":"1. **\"라벨 배지 + 손글씨 타이틀\"의 2단 헤더 고정 문법** — 모든 페이지 좌상단에 컬러 라운드 배지(섹션명)를 놓고, 그 오른쪽에 콜론(:)으로 시작하는 붓글씨체 핵심 문장을 붙인다. 이 조합이 페이지 종류를 즉시 구분시키는 시그니처 장치다.","guideMd":"# 디자인 가이드 — Humantree 기부제안서 강의자료 (스카이블루 캘리그래피 다이어그램 시스템)\n\n## 1. 전체 디자인 시스템\n\n### 1.1 핵심 디자인 철학\n\n1. **\"라벨 배지 + 손글씨 타이틀\"의 2단 헤더 고정 문법** — 모든 페이지 좌상단에 컬러 라운드 배지(섹션명)를 놓고, 그 오른쪽에 콜론(:)으로 시작하는 붓글씨체 핵심 문장을 붙인다. 이 조합이 페이지 종류를 즉시 구분시키는 시그니처 장치다.\n2. **여백이 곧 설계다** — 슬라이드 상단 1/3은 거의 비워두고(헤더만 존재), 중단에 다이어그램, 하단에 텍스트를 배치해 \"읽는 리듬\"을 강제한다. 콘텐츠 밀도를 억지로 채우지 않고 3단 레이어(헤더-다이어그램-근거)로 호흡을 분리한다.\n3. **점선 원·라운드 사각은 \"생각 중/과정\"을, 실선 두꺼운 프레임은 \"확정된 사례\"를 의미하는 기하 모티프 이원화** — 카키색 점선 원과 점선 라운드사각(이중 테두리)은 개념·구성요소 설명에, 카키색 굵은 실선 라운드 프레임은 실제 예시(샘플 문서) 캡슐에 쓰여 \"아직 전개 중 vs 완성본\"을 형태로 구분한다.\n4. **레이어 깊이감은 색이 아니라 라인으로 만든다** — 그림자·입체 대신 이중 테두리(아웃라인 두 겹)와 점선 간격만으로 입체감을 주는 플랫 디자인. 사진이 들어가는 페이지(마스터4)에서만 예외적으로 실사 콜라주가 등장해 \"이론 vs 실물\"의 대비를 만든다.\n\n### 1.2 컬러 팔레트 및 그라데이션 공식\n\n| 구분 | 컬러명 | HEX | RGB | 적용 영역 및 역할 |\n|---|---|---|---|---|\n| Primary | 스카이블루 그라데이션 | #8FD9F7 → #D6F3FF | 143,217,247 → 214,243,255 | 표지/본문형 섹션 라벨 배지 배경 (좌상단 캡슐). 가장 먼저 눈에 띄는 \"장(chapter) 식별자\" |\n| Primary Accent | 라이트블루 화살표 | #7FD4F0 | 127,212,240 | 예시 캡슐 옆 주석 화살표(mint-sky 톤), 다이어그램 연결 화살표 강조 |\n| Secondary | 카키/올리브 아웃라인 | #BDB07E | 189,176,126 | 점선 원, 점선 라운드사각 체인, 실선 굵은 프레임의 테두리 컬러 (채움 없이 선으로만 사용) |\n| Secondary Accent | 오렌지 아웃라인 | #F2A227 | 242,162,39 | \"예를들어\"/\"sample\" 라벨 배지 테두리 — 사례·레퍼런스 파트 전용 색 |\n| Neutral | 블랙 텍스트 | #1A1A1A | 26,26,26 | 본문/제목/체크리스트 기본 텍스트 컬러 |\n| Neutral BG | 화이트 | #FFFFFF | 255,255,255 | 전 페이지 배경, 여백 확보용 |\n| Accent | 레드 강조 | #E53224 | 229,50,36 | 다이어그램 마지막 단계(결론/핵심 메시지) 볼드 레드 텍스트로 시선 집중 |\n\n**그라데이션 공식**: 라벨 배지는 좌상단 → 우하단 135° 대각 그라데이션, 시작 색 `#8FD9F7`(채도 높은 스카이블루) → 끝 색 `#D6F3FF`(거의 화이트에 가까운 파스텔)로 밝아지며, 배지 모서리 radius는 배지 높이의 45~50%(완전 필캡슐에 가까운 라운드).\n**오버레이 공식**: 사진 콜라주(마스터4)에서는 오버레이를 쓰지 않고 원본 포스터를 그대로 그리드에 flush 배치한다 — 텍스트 가독성은 각 포스터 자체의 명암 대비(블랙 바/화이트 배경)에 위임한다.\n\n### 1.3 타이포그래피 시스템\n\n| 위계 요소 | 원본 폰트(추정) | 한글 대체 추천 | 크기 | 굵기·스타일 규칙 |\n|---|---|---|---|---|\n| 메인 타이틀 (\": 문장\") | 손글씨/붓글씨체 (배달의민족 주아체·연성체 계열) | 나눔손글씨 붓, HS여름물빛체, 온글잎 박다현체 | 32~36pt | 레귤러~세미볼드, 항상 콜론(:) + 한 칸 띄고 시작, 좌측 배지와 베이스라인 정렬 |\n| 섹션 라벨 (배지 안 텍스트) | 고딕 볼드 (Noto Sans KR / 스포카 한 산스) | Pretendard Bold, Noto Sans KR Bold | 22~26pt | 볼드, 배지 중앙 정렬, 자간 좁게 |\n| 다이어그램 소제목 (원/사각 내부) | 고딕 세미볼드 | Pretendard SemiBold | 20~24pt | 중앙정렬, 2줄까지 자동 줄바꿈 허용, 핵심 결론 단계는 레드+볼드 |\n| 본문/체크리스트 | 고딕 레귤러 | Pretendard Regular, Noto Sans KR | 15~17pt | \"Check Lists :\" 헤더만 볼드+영문 고딕(살짝 다른 서체감 — 로고체 느낌), 번호는 원문자(①②③) 또는 동그라미 숫자 |\n| 마이크로 텍스트 (etc, sample, 영문 캡션) | 고딕 또는 모노스페이스 느낌 영문 | Montserrat, Poppins | 13~16pt | 소문자 영문 단독 사용 시 캐주얼한 느낌의 산세리프, 이탤릭 없음 |\n\n**교차·중첩 배치 규칙**: 좌상단 라벨 배지는 항상 슬라이드 여백선 바깥(좌측 끝에서 margin 거의 0)에 반쯤 걸치듯 배치해 \"포스트잇처럼 붙어있는\" 느낌을 주고, 배지와 타이틀 사이는 배지 폭의 약 15~20%만큼만 띄워 시각적으로 한 덩어리처럼 보이게 한다.\n\n## 2. 사진과 그래픽의 조화 원칙\n\n- **원본 그대로 노출(No Masking)**: 실물 포스터/캠페인 이미지는 크롭이나 마스킹 없이 원본 비율 그대로 세로 스트립 형태로 나열한다. 각 이미지가 이미 완성된 디자인이므로 추가 가공을 하지 않는 것이 \"날것의 레퍼런스 사료\"라는 신뢰도를 준다.\n- **그리드 경계선 제거(Flush Grid)**: 이미지 간 여백·구분선을 0에 가깝게 붙여 하나의 연속된 \"필름 스트립\"처럼 보이게 하고, 전체 그리드는 슬라이드 좌우 끝까지 꽉 채워(bleed) 배경 화이트와 대비시킨다.\n- **상단 라벨 배지만 분리**: 사진이 들어가는 페이지에서도 상단 \"sample\" 배지는 사진 영역과 분리된 순수 여백 위에 떠 있어, \"그래픽 레이어(설명) vs 사진 레이어(증거)\"가 수직으로 명확히 분단된다.\n- **가독성은 원본에 위임**: 캡슐/화살표 주석이 들어가는 예시 슬라이드(마스터3)에서는 텍스트 블록 전체를 카키색 굵은 테두리 프레임 안에 가둬 배경과 분리하고, 그 바깥에 하늘색 화살표+라벨만 추가해 \"이 문단이 어떤 기능을 하는지\" 주석을 단다 — 원문을 변형하지 않고 외부에서 주석만 더하는 방식.\n\n## 3. 페이지별 구성요소 및 상세 배치 설계도 (16:9, 1600×900 기준)\n\n### [Master 1] 개념 설명형 — 표지 (source-1)\n- **레이어 순서**: 배경(화이트) → 하단 Check List 블록 → 중단 다이어그램(체인) → 상단 헤더(최상위)\n- 상단 라벨 배지: x 40 / y 30, 너비 180 / 높이 80, 스카이블루 대각 그라데이션, radius ~36px, 중앙 텍스트 \"표지\" (26pt 볼드)\n- 타이틀: 배지 우측 x 260 / y 60, 붓글씨체 \": 기부자가 만날 첫 문장\" (34pt)\n- 중단 다이어그램 (y 420~650 영역):\n  - 점선 원 \"구성요소\": x 60, w 240×h 240, 카키 점선(dash 8px, gap 6px) 테두리, 내부 텍스트 볼드 20pt, 우측에 화살표(→) 솔리드 블랙으로 체인 연결\n  - 라운드 사각 칩 5개 연속 배치: 각 w 220×h 220, 카키 이중 실선 테두리(간격 6px), radius 40px, 칩 간격 거의 0(테두리끼리 겹치듯 밀착), 내용: 헤드라인/태그라인/제목·부제/주관,주최/…etc\n- 구분선: y 760, 슬라이드 전체 폭 가로지르는 카키 점선(가늘게)\n- 하단 텍스트 블록 (y 790~900): 좌측 정렬 불릿 2줄(①②③ 구성 설명) + 볼드 소제목 \"쉽고 궁금함이 핵심\" + \"Check Lists :\" 헤더 + 번호(①~⑤) 체크 항목 5개\n- 우하단 모서리: 작은 캐릭터 일러스트(안경 쓴 사람 아이콘, 약 60×60px) — 챕터 완료 마커 역할\n\n### [Master 2] 핵심꼭지 설명형 (source-2)\n- 라벨 배지: \"핵심꼭지2-1\" (하위 넘버링 포함, 폭은 텍스트 길이에 맞춰 가변), 동일 스카이블루 그라데이션·좌상단 위치\n- 타이틀: \": 기부참여 프로그램 제안\" (붓글씨체, 배지 옆)\n- 중단: 대형 점선 원 3개, 각 지름 ~380px, 균등 간격 배치(좌 x120, 중 x620, 우 x1120), y중심 400\n  - 원 내부 텍스트: 좌(개조식 2줄), 중(개조식 3줄), 우(결론 — 일부 레드 볼드 강조 \"기부참여 프로그램 필요\")\n  - 원 사이 화살표: 블랙 솔리드, 두께 중간, 원과 원 사이 간격의 중앙에 배치\n- 구분선(y 650 부근): 전체 폭 가로지르는 카키 점선\n- 하단 텍스트: \"기부참여 프로그램은\" 소제목 + \"Check Lists :\" + 번호 ①~⑩ 2열 혹은 1열 리스트 (본 예시는 10개 항목이라 줄 간격 축소, 폰트 14~15pt로 다운사이즈)\n- 우하단: HUMANTREE 로고 + 캐릭터 일러스트 고정 배치(모든 본문형 페이지 공통 워터마크 요소)\n\n### [Master 3] 예시 캡슐형 (source-3)\n- 라벨 배지: \"예를들어\" — 오렌지(#F2A227) 아웃라인만 있는 화이트 배경 라운드 사각(채움 없음, 테두리 2~3px), 좌상단 고정\n- 본문 캡슐: 화면 좌측 60~65% 영역을 차지하는 대형 세로 라운드 프레임, 테두리는 카키색 굵은 실선(6~8px), radius 매우 큼(모서리 반경 ~100px, 상하 캡슐형)\n  - 프레임 내부: 메인 타이틀(2줄, 고딕 볼드 28pt) → 서브카피(볼드 밑줄 or 강조 18pt) → 소제목 볼드(\"해피사운드 캠페인이란!\") → 본문 문단 3단락(레귤러 15pt, 줄간격 넉넉) → 마지막 한 줄 볼드 질문형 마무리\n- 외부 주석: 프레임 우측 바깥, 하늘색 화살표 쉐브론(chevron, 두꺼운 삼각 화살표 블록) 2개를 세로로 배치\n  - 화살표 1 (상단, y~600): 우측에 라벨 \"기부참여 프로그램\" (고딕 볼드 20pt)\n  - 화살표 2 (하단, y~950): 우측에 라벨 \"과제해결방안 - 후원대상사업\" (고딕 볼드 20pt, 2줄)\n- 전체적으로 좌(실물 예문) : 우(기능 주석)의 65:35 레이아웃 비율\n\n### [Master 4] 샘플 콜라주형 (source-4)\n- 라벨 배지: \"sample\" — 오렌지 아웃라인 라운드 사각(마스터3과 동일 스타일, 소문자 영문), 좌상단, 하단 여백 넉넉(배지와 이미지 그리드 사이 약 150~180px 공백)\n- 상단 공백 구간: 슬라이드 상단 약 22%를 완전히 비워 \"쉬어가는 공간\" 확보\n- 하단 78% 전체: 4분할 세로 스트립 그리드, 각 컬럼 폭 동일(25%), 컬럼 간 간격 0(이미지가 서로 맞닿음), 각 이미지는 슬라이드 하단 끝까지 bleed(잘림 허용)\n  - 컬럼1: 블랙 바 헤드라인 + 옐로 배경 포스터(아이콘 3개 포함)\n  - 컬럼2: 옐로 배경, 건축 일러스트 포함 포스터\n  - 컬럼3: 화이트 배경, 컬러풀 로고형 포스터(행사 엠블럼)\n  - 컬럼4: 화이트 배경 + 실사진(손 페인팅) 포스터\n- 그리드는 서로 다른 실제 캠페인 4건을 레퍼런스로 나열 — 디자인 톤(옐로/화이트 혼합)이 의도적으로 다양해야 \"다양한 사례 비교\"라는 목적이 전달됨\n\n## 4. 만능 적용 공식\n\n### 주제별 비주얼 소재 치환 매트릭스\n\n| 원본 요소 | 역할 | 다른 주제로 치환 시 대체 소재 예시 |\n|---|---|---|\n| 스카이블루 배지 + 붓글씨 타이틀 | 챕터/섹션 식별 | 브랜드 주제색 그라데이션 배지로 치환 (예: 교육 주제 → 민트 그라데이션, IT 주제 → 네이비 그라데이션), 손글씨체는 그대로 유지해 \"따뜻한 강의\" 톤 보존 |\n| 점선 원 체인 | 순차적 개념/논리 흐름 | 프로세스 단계, 원인→결과, 문제→해결 등 모든 \"단계식 설명\"에 재사용 가능. 원 개수만 내용에 맞게 3~6개로 조절 |\n| 카키 이중선 라운드 칩 | 병렬 요소 나열 | 구성요소, 체크포인트, 카테고리 분류 등 \"동등한 레벨의 항목 나열\"에 사용. 칩 개수 제한 없음 |\n| 레드 볼드 강조 텍스트 | 핵심 결론 하이라이트 | 어떤 다이어그램에서든 \"이것만은 기억하라\"는 마지막 노드에 레드 적용 |\n| 카키 굵은 프레임 캡슐 | 실제 사례/인용문 박스 | 고객 후기, 성공 사례, 실제 문서 발췌 등 \"증거 자료\"를 담는 모든 박스에 재사용 |\n| 하늘색 쉐브론 화살표 주석 | 외부 기능 설명 | 캡슐/이미지 옆에 \"이 부분이 하는 역할\"을 짧게 라벨링할 때 항상 사용 |\n| 오렌지 아웃라인 배지(예를들어/sample) | 사례·레퍼런스 전환 신호 | 본문형과 예시형을 색으로 구분하는 장치로, 어떤 강의자료든 \"이론 파트는 블루, 사례 파트는 오렌지\"로 고정하면 전체 덱의 내비게이션이 직관적으로 유지됨 |\n| 4분할 플러시 그리드 콜라주 | 다건 레퍼런스 비교 | 포트폴리오, 벤치마킹, Before/After 등 \"여러 실물을 나란히 비교\"하는 모든 페이지에 적용 |\n\n### 복사해서 쓰는 스타일 고정 프롬프트\n\n```\n[Humantree 강의자료 스타일 — PPT 16:9]\n배경은 순백색(#FFFFFF), 여백을 넉넉히 둔 미니멀 교육용 슬라이드.\n\n좌상단에 라운드 캡슐 배지를 배치한다:\n- 본문/개념 설명 페이지: 스카이블루 대각 그라데이션(#8FD9F7→#D6F3FF), 흰 배경 위, radius는 배지 높이의 45%\n- 예시/사례 페이지: 오렌지(#F2A227) 아웃라인만 있는 화이트 라운드 사각, 테두리 2~3px\n\n배지 오른쪽에 손글씨/붓글씨체 한글 타이틀을 \": \"로 시작해서 붙인다. (예: \": OOO를 위한 OOO\")\n\n중단 다이어그램은 카키/올리브색(#BDB07E) 선으로만 그린다 (채움 없음):\n- 점선 원 또는 점선 라운드사각으로 \"개념/단계\"를 표현, 원 사이는 블랙 솔리드 화살표로 연결\n- 결론에 해당하는 마지막 노드의 핵심 문구만 레드(#E53224) 볼드로 강조\n- 실제 완성 사례를 보여줄 때는 점선 대신 굵은 실선 테두리의 대형 라운드 프레임(카키색)을 쓰고, 그 옆에 하늘색(#7FD4F0) 쉐브론 화살표로 기능 라벨을 주석처럼 붙인다\n\n하단은 전체 폭 가로지르는 카키색 가는 점선으로 구분하고, 그 아래 고딕 볼드 소제목 + \"Check Lists :\" 헤더 + 원문자(①②③…) 번호 리스트를 블랙 텍스트로 배치한다.\n\n우하단 모서리에는 작은 캐릭터/로고 일러스트를 고정 워터마크로 둔다.\n\n폰트: 타이틀은 손글씨형 한글 서체, 본문/리스트는 고딕 산세리프(Pretendard/Noto Sans KR), 영문 보조 텍스트는 캐주얼 산세리프.\n\nAbsolutely NO extra decorative gradients beyond specified, NO shadows, NO skeuomorphic effects, NO watermark text beyond the described character icon.\n```","previewUrl":"https://hopedesign.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F30521cb2-324e-4887-ac71-65672eb8cc09%2F7914b836-6f15-457d-a5e5-14fe73d96831%2FUntitled.png?table=block&id=2780511c-8a47-42b5-bade-d65a1e3b9d79&cache=v2","source":{"type":"url","url":"https://hopedesign.notion.site/3f35fc49d5384e6685d27fa8e5894122"},"tokens":{"primary":"#8FD9F7","secondary":"#BDB07E","bg":"#FFFFFF","text":"#1A1A1A","font":"sans"}},
  {"id":"url-gunmul-lecture","part":"ppt","layout":"boldtypo","name":"유튜브 강의 임팩트형","ref":"노션 캡처에서 복제: 온라인 건물주되기 (유튜브 강의 임팩트형)","guide":"파일 쓰기 권한이 없어 저장은 못했지만, 분석한 디자인 가이드 전체 내용을 아래에 바로 출력합니다.","guideMd":"파일 쓰기 권한이 없어 저장은 못했지만, 분석한 디자인 가이드 전체 내용을 아래에 바로 출력합니다.\n\n# 디자인 가이드 — 유튜브 1인 강의형 \"온라인 건물주 되기\"\n\n## 1. 전체 디자인 시스템\n\n### 1.1 핵심 디자인 철학\n\n1. **레터박스 프레임 = 유튜브 네이티브 신호**: 상하 검정 띠(화면 높이의 약 13~14%)를 고정 배치해, 이 PPT가 유튜브 강의 녹화 화면이라는 메타포를 시각적으로 각인시킨다. 모든 콘텐츠는 띠 사이 흰색 캔버스(가운데 약 72~74%) 안에서만 전개된다.\n2. **슬라이드당 메시지 1개(원샷 임팩트)**: 텍스트 분량을 극단적으로 줄이고, 한 문장(또는 핵심어 하이라이트 포함 2줄)만 초대형으로 배치한다. 설명은 음성에 맡기고 화면은 \"제목 카드\"처럼 기능한다.\n3. **흑백 타이포 + 신호색 2색 포인트**: 본문 글자는 기본 검정이며, 문장 안에서 가장 중요한 1~3단어만 빨강(강조/경고/핵심) 또는 초록(브랜드/긍정/수익)으로 바꿔 시선을 강제 유도한다. 색은 \"한 문장당 포인트 컬러 1세트\"만 쓴다.\n4. **대형 누끼 이미지의 은유적 사용**: 사진/일러스트/로고를 배경 제거해 흰 배경과 자연 합성, 화면 오른쪽·중앙 큰 면적에 배치하여 텍스트의 추상 개념을 구체적 사물(돈다발, 거북이, SNS 로고)로 치환한다.\n5. **손그림 화살표·낙서 요소**: 디지털 폰트의 딱딱함을 깨기 위해 거칠고 두께 불균일한 손그림 화살표를 개념 간 흐름 표시에 사용한다.\n\n### 1.2 컬러 팔레트 및 그라데이션 공식\n\n| 구분 | 컬러명 | HEX | RGB | 적용 영역 및 역할 |\n|---|---|---|---|---|\n| Neutral/Frame | 레터박스 블랙 | #0A0A0A | 10,10,10 | 상·하단 고정 띠, 화살표 선, 기본 본문 글자 |\n| Background | 캔버스 화이트 | #FFFFFF | 255,255,255 | 중앙 콘텐츠 영역 배경, 모든 누끼 이미지의 배경 |\n| Primary Accent | 경고·핵심 레드 | #E8201C | 232,32,28 | 헤드라인 중 가장 강조할 핵심어, 긴박감/주목 유도 |\n| Secondary Accent | 수익·브랜드 그린 | #16A34A | 22,163,74 | 헤드라인 중 긍정/수익 핵심어, 브랜드 로고 컬러 |\n| Signature Highlight | 타이틀 옐로우 | #F2C200(필)/#0A0A0A(외곽선) | 242,194,0 / 10,10,10 | 섹션 간지 타이틀 전용 — 굵은 검정 외곽선+노랑 채움 |\n| Supporting | 뉴트럴 그레이 | #9CA3AF | 156,163,175 | 아이콘 원형 배경 연한 톤, 보조 텍스트 |\n\n그라데이션/오버레이 공식: 배경 그라데이션 없음(순백 고정). 대신 \"컬러는 글자에만\" 원칙 적용. 레터박스는 솔리드 블랙 100% 불투명. 간지 타이틀은 \"옐로우 필 + 블랙 헤비 아웃라인(두께 = 폰트 크기의 8~10%)\" 공식.\n\n### 1.3 타이포그래피 시스템\n\n| 위계 요소 | 원본 폰트(추정) | 한글 대체 추천 | 크기(1920×1080) | 굵기·스타일 규칙 |\n|---|---|---|---|---|\n| 메인 헤드라인 | 두꺼운 고딕(티몬체류) | Pretendard Black, 여기어때 잘난체 | 72~96pt | Black, 자간 좁게, 2줄 이내, 핵심어만 색상 치환 |\n| 서브 타이틀(괄호) | 중간 굵기 동일 계열 | Pretendard Bold | 36~44pt | 괄호로 보충, 핵심어 색상 포인트 |\n| 챕터/간지 타이틀 | 헤비 고딕+외곽선 | BM훈민정음, 잘난체 Bold | 60~72pt | 검정 아웃라인+옐로우 채움, 번호 prefix |\n| 리스트/프로세스 라벨 | 중간 굵기 | Pretendard SemiBold | 28~32pt | 원형 아이콘 아래, 중앙 정렬, 최대 2줄 |\n| 마이크로 텍스트 | 일반 고딕 | Pretendard Regular | 18~22pt | 거의 미사용(설명 문단 없음 원칙) |\n\n조형 규칙: 헤드라인은 좌측 정렬, 레터박스 안쪽 상단 1/3에서 시작. 강조어는 색만 바꾸고 크기는 유지. 기본은 좌(텍스트)-우(이미지) 2분할, 이미지가 중앙 집중형일 땐 상(텍스트)-하(이미지) 분할로 전환.\n\n## 2. 사진과 그래픽의 조화 원칙\n\n- **완전 누끼 필수**: 모든 사진·로고 배경 제거, 그림자는 없거나 아주 옅게.\n- **원본 질감 보존**: 돈다발·거북이 등은 포토리얼리스틱 질감 유지(신뢰도↑), 로고류는 벡터 플랫 아이콘 그대로 — 사진은 주인공, 아이콘은 보조 역할로 분리.\n- **가독성 확보**: 순백 배경 위 명도 대비 강한 색(검/빨/초)만 사용, 파스텔톤 금지.\n- **단일 피사체 원칙**: 슬라이드당 핵심 이미지 1개(또는 화살표로 연결된 2개). 다수 이미지가 필요하면 동일 크기 원형 마스크로 통일.\n- **화살표 오버레이 위치**: 항상 이미지 사이 빈 공간에만 배치, 사진 위에 겹치지 않음.\n\n## 3. 페이지별 구성요소 및 상세 배치 설계도\n\n**Master 1 — 타이틀/후킹 슬라이드**: 레이어(흰배경→우측 대형 누끼 사진→좌측 텍스트블록→좌하단 브랜드 로고→상하 레터박스). 좌표(1920×1080): 레터박스 0~140px/940~1080px. 서브캡션 x=60,y=200. 괄호설명 x=110,y=280. 메인타이틀 x=90,y=320,72pt. 로고 원 x=200~360,y=420~560(Ø150px). 사진 x=560~970,y=100~660(텍스트:이미지≈45:55).\n\n**Master 2 — 단일 메시지 강조**: 레이어(흰배경→하단~우측 대형 사진→좌상단 2줄 헤드라인 전체 레드). 좌표: 1행 x=50,y=180 / 2행 x=50,y=240, 48pt, 전체 레드(#E8201C). 사진은 우측 65% 차지, 대각선 동세 구도, 레터박스 하단까지 침범.\n\n**Master 3 — 관계/흐름 설명**: 레이어(흰배경→중앙상단 캡션→좌측 로고→중앙 화살표→우측 로고). 좌표: 캡션 center,y=180,36pt 블랙. 좌아이콘 x=80~330,y=250~500. 우아이콘 x=650~900,y=250~500. 화살표 x=380~570,y=340~420.\n\n**Master 4 — 간지+프로세스 리스트**: 레이어(흰배경→중앙상단 챕터타이틀 옐로우+블랙외곽선→하단 원형아이콘 3~6개 가로나열→각 아래 2줄 라벨). 좌표: 타이틀 center,y=160~230,60pt. 원형행 y=290~460,Ø150px, 균등간격. 라벨 y=480~600,28pt.\n\n**Master 5(확장) — 2분할 비교**: Master 3 변형, 로고 대신 Before/After 사진 2장+화살표.\n\n**Master 6(확장) — 순수 텍스트 강조**: 이미지 없이 중앙(y=460~620) 80pt 헤드라인, 핵심어만 레드/그린.\n\n## 4. 만능 적용 공식\n\n| 메시지 유형 | 치환 소재 | 적용 마스터 | 강조색 기준 |\n|---|---|---|---|\n| 수익/보상 | 돈다발, 금고, 상승그래프 | Master 1 | 그린 |\n| 인내/지속성 | 거북이, 마라톤, 자라는 나무 | Master 2 | 레드 |\n| 플랫폼 연동 | SNS 로고+화살표 | Master 3 | 로고 원색 |\n| 단계별 프로세스 | 원형 아이콘 세트 | Master 4 | 옐로우+블랙 |\n| 경고/주의 | 느낌표, 신호등 | Master 2 변형 | 레드 |\n| 비교/선택 | 저울, Before/After | Master 5 | 레드 vs 그린 |\n\n복사해서 쓰는 스타일 고정 프롬프트:\n\n```\n스타일: 유튜브 1인 강의 PPT 슬라이드, 16:9.\n- 화면 상단/하단에 솔리드 블랙(#0A0A0A) 레터박스 띠 고정(각 높이의 약 13%).\n- 중앙 캔버스는 순백(#FFFFFF).\n- 헤드라인은 초대형 두꺼운 한글 고딕(Black), 기본 검정(#0A0A0A), 핵심어 1~3단어만 빨강(#E8201C) 또는 초록(#16A34A)으로 색만 변경(크기 동일).\n- 핵심 개념을 은유하는 사물/사진은 완전 누끼 처리 후 우측/중앙에 대형 배치, 그림자 최소화.\n- 로고·아이콘 2개 이상 연결 시 손그림 화살표(검정, 두께 불균일) 사용.\n- 프로세스 설명 시 동일 지름 원형 마스크 아이콘 3~6개를 가로 균등 배치, 아래 2줄 라벨.\n- 챕터 타이틀은 노랑 채움(#F2C200)+두꺼운 검정 외곽선 스티커 스타일, 번호 prefix 포함.\n- 슬라이드당 메시지 1개만, 본문 설명 문단 없음.\n- Absolutely NO extra decorative text, NO watermark, NO extra logos.\n```","previewUrl":"https://hopedesign.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F443fbb8a-dc06-47c6-aeb3-3ad8c9b70de9%2F20210617_234042_8.jpg?table=block&id=721dcaed-5ad7-4b82-8a58-d7c537158328&cache=v2","source":{"type":"url","url":"https://hopedesign.notion.site/25c57c6d59944987a331b10a96c405c9"},"tokens":{"primary":"#E8201C","secondary":"#16A34A","bg":"#FFFFFF","text":"#0A0A0A","font":"sans"}},
  {"id":"url-reading-lecture","part":"ppt","layout":"corporate","name":"기적의독서법 강의자료","ref":"노션 캡처에서 복제: 기성준 작가 기적의 독서법 강의자료","guide":"1. **원색 대비의 강단감(强斷感)** — 오렌지레드·시안블루 같은 고채도 단색 블록을 전면에 깔고 그 위에 흰색 타이포만 올려, 장식 없이도 시선을 1초 안에 멈추게 한다. 중간톤이 없다 — 배경은 항상 \"쨍한 색 아니면 순백/순회색\".","guideMd":"# 디자인 가이드 — 기성준 작가 기적의 독서법\n\n## 1. 전체 디자인 시스템\n\n### 1.1 핵심 디자인 철학\n\n1. **원색 대비의 강단감(强斷感)** — 오렌지레드·시안블루 같은 고채도 단색 블록을 전면에 깔고 그 위에 흰색 타이포만 올려, 장식 없이도 시선을 1초 안에 멈추게 한다. 중간톤이 없다 — 배경은 항상 \"쨍한 색 아니면 순백/순회색\".\n2. **좌 이미지·우 텍스트(또는 그 반대)의 황금분할 2분할** — 슬라이드를 수직으로 쪼개 한쪽엔 사진(인물·사물·서가), 반대쪽엔 메시지를 둔다. 사진은 항상 \"증거/사례\", 텍스트는 \"주장/결론\" 역할을 맡는 구도 공식.\n3. **키워드만 빨강으로 솎아내는 부분 강조 타이포** — 문장 전체를 굵게 하지 않고, 핵심 명사·숫자 1~3개 어절만 레드(#EA3B23 계열)로 바꿔 \"읽지 않아도 빨간 글자만 보면 메시지가 전달되는\" 스캐닝 가독성을 만든다.\n4. **손그림 같은 점선 프레임으로 만드는 '손으로 짚어주는' 느낌** — 전체를 회색 대시보더(dashed border)로 감싸 슬라이드를 \"메모지/화이트보드 캡처\"처럼 보이게 하고, 그 안에서는 자유롭게 사진+텍스트를 배치해도 하나의 카드처럼 통일감을 유지한다.\n\n### 1.2 컬러 팔레트 및 그라데이션 공식\n\n| 구분 | 컬러명 | HEX | RGB | 적용 영역 및 역할 |\n|---|---|---|---|---|\n| Primary | 시그니처 오렌지레드 | #EA3B23 | 234,59,35 | 표지/목차형 풀폭 헤더바 배경, 본문 핵심 키워드 텍스트 컬러, 포인트 타이틀(간지형) |\n| Primary 보조 | 시안 블루 | #1EB3E8 | 30,179,232 | 임팩트형 풀컬러 배경(사례·통계 강조 슬라이드), 느낌표 그래픽, 헤더 타이틀 텍스트 흰색과 짝 |\n| Secondary | 딥 그레이 텍스트 | #404040 | 64,64,64 | 본문 리스트 텍스트, 대제목 아래 서브 불릿, 중립적 설명 문구 |\n| Neutral | 오프화이트 배경 | #F2F2F2 | 242,242,242 | 간지(소제목)형 슬라이드 바탕, 점선 프레임 내부 배경 |\n| Neutral | 퓨어 화이트 | #FFFFFF | 255,255,255 | 본문형 슬라이드 배경, 헤더바/블루바 위 타이틀 텍스트 |\n| Accent | 북커버 브라운 | #8A6D4E | 138,109,78 | 책 표지 등 레퍼런스 이미지의 보더/프레임 색(사진이 실제 사물일 때의 자연색 유지) |\n| Accent | 강조 아웃라인 블랙 | #000000 | 0,0,0 | 임팩트 타이포(간지형 텍스트) 글자 외곽 스트로크, 점선 프레임 라인 |\n\n- **시그니처 그라데이션**: 이 디자인은 그라데이션을 거의 쓰지 않고 **플랫 컬러 블록**을 쓴다. 굳이 입체감이 필요할 때는 `linear-gradient(135deg, #EA3B23 0%, #C72912 100%)` (오렌지 헤더바 음영) 또는 `linear-gradient(135deg, #1EB3E8 0%, #0E8FC2 100%)` (블루 배경 음영) 정도의 5~10% 톤다운만 적용한다.\n- **오버레이 공식**: 사진 위에 텍스트를 얹을 때는 사진 자체에 어두운 오버레이를 깔지 않고, **사진과 텍스트를 공간적으로 분리**(좌우 분할선 또는 여백)해 가독성을 확보한다. 부득이 사진 위에 글자를 얹어야 하면 `rgba(0,0,0,0.35)` 단색 오버레이 + 흰색 텍스트 조합을 사용한다.\n\n### 1.3 타이포그래피 시스템\n\n| 위계 요소 | 원본 폰트 (추정) | 한글 대체 추천 | 크기 (16:9, 1920×1080 기준) | 굵기·스타일 규칙 |\n|---|---|---|---|---|\n| 메인 타이틀(헤더바) | 맑은 고딕 Bold / HY헤드라인 계열 | Pretendard Bold, 본고딕 Bold | 44~48pt | 흰색, 좌측 정렬, 헤더바 수직 중앙 정렬, 좌측 여백 40px |\n| 임팩트 대제목(간지형) | 여기어때 잘난체 / 티몬 몬소리체 계열 둥근 굵은체 | 여기어때 잘난체, 티웨이 항공체, Black Han Sans | 60~72pt | 오렌지(#EA3B23) 또는 흰색, 2줄 구성 시 줄간격 1.0, 굵은 라운드 산세리프 |\n| 본문 핵심 문장(인용구형) | 맑은 고딕 Regular/Bold 혼합 | Pretendard Medium/Bold 혼합 | 36~40pt | 검정 베이스 + 핵심 명사만 빨강(#EA3B23) 색상 치환, 굵기는 전체 동일(Bold 유지) |\n| 소제목 리스트(서브 불릿) | 맑은 고딕 Regular | Pretendard Regular | 28~30pt | 그레이(#404040), 좌측 들여쓰기, 줄간격 1.4, 문장 끝 물음표로 리듬감 |\n| 마이크로 텍스트(책 표지 캡션 등) | 고딕 계열 Light | Pretendard Light | 11~13pt | 이미지 내부 삽입용, 가독성보다 \"실제 책 표지 재현\"이 목적이므로 원본 이미지 그대로 사용 권장 |\n| 임팩트 아웃라인 텍스트(전환 효과) | 두꺼운 디스플레이 서체 + 블랙 아웃라인 | 여기어때 잘난체 + 텍스트 외곽선(블랙, 6~8px) | 56~64pt | 흰색/레드 글자 + 검정 테두리(stroke), PPT에서는 \"텍스트 윤곽선\" 효과로 구현, 한 슬라이드에 2줄 반복 배치(유사 문장 변주) |\n\n**교차·중첩 배치 조형 규칙**\n- 헤더바 제목과 본문 사이에는 반드시 넉넉한 여백(화면 높이의 15~20%)을 둬 \"헤더 구역\"과 \"본문 구역\"을 시각적으로 완전히 분리한다.\n- 좌측 이미지와 우측 텍스트 사이에는 얇은 세로 디바이더 라인(연회색, 1~2px)을 넣어 2분할 구조를 명시적으로 드러낸다(source-1 참조).\n- 인용구형 문장은 핵심어 앞뒤로 줄바꿈 없이 한 줄에 배치하고, 빨간색 키워드는 문장당 1곳(최대 2곳)만 써서 과용하지 않는다.\n\n## 2. 사진과 그래픽의 조화 원칙\n\n- **피사체 분리**: 사진은 원본 그대로(배경 제거 없이) 네모 프레임 안에 넣고, 텍스트와는 공간(여백 또는 구분선)으로만 분리한다. 사진을 자르거나 마스킹하여 텍스트 영역을 침범하게 하지 않는다 — \"사진 박스\"와 \"텍스트 박스\"는 항상 독립된 사각형이다.\n- **마스킹**: 별도의 도형 마스킹(원형, 블롭 등)은 사용하지 않는다. 직사각형 크롭이 기본이며, 사진 비율은 원본 그대로 유지하거나 2:3(세로, 책 표지) / 4:3~3:2(가로, 풍경·사물) 중 피사체에 맞는 비율을 선택한다.\n- **오버레이·가독성 확보**: 밝은 배경색(화이트, 오프화이트) 위에는 어두운 텍스트, 채도 높은 배경색(오렌지, 블루) 위에는 흰색 텍스트만 사용한다. 사진이 배경을 대체하는 경우가 없으므로 별도의 그라데이션 오버레이가 거의 필요 없다.\n- **색 보정 통일감**: 삽입 사진들은 약간 따뜻한 톤(세피아/브라운 계열)으로 전반적 색온도를 통일해, 색이 쨍한 배경 블록(오렌지·블루)과 대비되면서도 전체 톤앤매너는 이어지도록 한다.\n- **그래픽 요소(느낌표 등)**: 사진이 설명하는 메시지의 감탄사를 거대한 화이트 심볼(예: \"!\")로 별도 배치해, 사진=증거 / 심볼=감정 반응 의 역할 분담을 만든다.\n\n## 3. 페이지별 구성요소 및 상세 배치 설계도\n\n### [Master 1] 표지/본문-혼합형 — \"헤더바 + 좌 이미지 + 우 텍스트\" (source-1 기반)\n\n| 레이어 순서 | 요소 | 좌표(1920×1080 기준) | 크기 | 비율/스타일 |\n|---|---|---|---|---|\n| 1 (최하단) | 배경 | (0,0) | 1920×1080 | #FFFFFF 단색 |\n| 2 | 상단 헤더바 | (0,0) | 1920×150 | #EA3B23 단색, 풀폭(화면 좌우 끝까지), 높이 전체의 약 14% |\n| 3 | 헤더 타이틀 텍스트 | (65,45) | 가변(최대 900px) | 흰색, 44~48pt Bold, 좌측 정렬, 바 수직 중앙 |\n| 4 | 좌측 이미지 박스(책 표지 등 레퍼런스) | (190,255) | 480×710 (세로형 2:3) | 사진 원본 그대로, 그림자 없음, 테두리 없음 |\n| 5 | 세로 디바이더 라인 | (810,255) | 2×710 | #D9D9D9, 얇은 연회색 선, 좌우 콘텐츠 분리 |\n| 6 | 우측 인용구 1행 | (900,330) | 가변 | 36~40pt, 검정 베이스 + 핵심어 1곳 레드(#EA3B23) |\n| 7 | 우측 인용구 2~3행(공백 한 줄 띄움) | (900,620) | 가변 | 상동, 레드 키워드 2곳까지 허용 |\n| 8 | 우측 여백 | (1750,0) | 170×1080 | 빈 공간 (우측 안��� 여백) |\n\n**설계 의도**: 책/사물 이미지가 \"증거\"로서 좌측 40%를 차지하고, 우측 60%는 텍스트 전용 여백으로 비워 핵심 메시지만 스캔되게 한다. 헤더바는 슬라이드 주제(목차 레벨 타이틀)를 알리는 고정 요소로, 모든 본문형 슬라이드에 반복 사용.\n\n### [Master 2] 간지/소제목형 — \"점선 프레임 + 오렌지 타이틀 + 리스트 + 우측 사진\" (source-3 기반)\n\n| 레이어 순서 | 요소 | 좌표 | 크기 | 비율/스타일 |\n|---|---|---|---|---|\n| 1 | 배경 | (0,0) | 1920×1080 | #F2F2F2 오프화이트 |\n| 2 | 전체 점선 프레임(대시 보더) | (25,25) | 1870×1030 | 2px dashed, #999999, 모서리 여백 25px |\n| 3 | 오렌지 대제목(2줄) | (80,180) | 900×280 | #EA3B23, 60~72pt Bold 라운드체, 줄간격 1.0 |\n| 4 | 하위 불릿 리스트(4줄) | (560,560) | 400×330 | #404040, 28~30pt, 줄간격 1.4, 각 줄 \"~왜?\" 식 질문형 종결 |\n| 5 | 우측 사진(서가/사물) | (1115,145) | 780×560 | 가로형(약 1.4:1), 프레임 없이 원본 크롭 |\n| 6 (최상단, 코너) | 우하단 장식 썸네일(다음 슬라이드 미리보기) | (1870,1000) | 70×75 | 다음 이미지 일부가 살짝 걸쳐 보이는 전환 장치(의도적 크롭) |\n\n**설계 의도**: 점선 프레임이 \"이 슬라이드는 하나의 완결된 질문/주제 카드\"라는 느낌을 주고, 좌측 하단으로 내려가는 대각선 시선 흐름(대제목→리스트)과 우측 사진이 균형을 맞춘다.\n\n### [Master 3] 임팩트/통계·사례 강조형 — \"풀컬러 배경 + 좌 사진 + 우 대형 심볼\" (source-2 기반)\n\n| 레이어 순서 | 요소 | 좌표 | 크기 | 비율/스타일 |\n|---|---|---|---|---|\n| 1 | 배경 | (0,0) | 1920×1080 | #1EB3E8 시안 블루 단색(또는 오렌지로 치환 가능) |\n| 2 | 상단 타이틀(2줄) | (65,45) | 1200×180 | 흰색, 40~44pt, 좌측 정렬 |\n| 3 | 좌측 사진 박스 | (65,255) | 1230×800 | 가로형(약 1.5:1), 풀컬러 배경 위에 얹힘, 테두리 없음 |\n| 4 | 우측 대형 심볼(느낌표 등) | (1440,300) | 110×600 | 흰색 단색 도형, 배경과 동일 색상 위 화이트로 대비, 중앙정렬 |\n| 5 | 우하단 미니 썸네일(전환용) | (1830,1030) | 65×70 | 다음 슬라이드 예고, 살짝 잘린 형태 |\n\n**설계 의도**: 사진이 화면의 2/3를 차지하는 \"증거 집중형\" 레이아웃. 텍스트는 헤더에만 두고 우측엔 설명 대신 감정(느낌표)을 시각 기호로 배치해 \"말로 설명하지 않아도 되는 강조\"를 만든다.\n\n### [Master 4] 전환/인서트형 — \"중립 배경 + 아웃라인 임팩트 타이포 2행\" (source-4 기반)\n\n| 레이어 순서 | 요소 | 좌표 | 크기 | 비율/스타일 |\n|---|---|---|---|---|\n| 1 | 배경 | (0,0) | 1920×1080 | #C2C2C2 중회색 단색 |\n| 2 | 1행 텍스트 | (90,260) | 1750×180 | 흰색+레드 혼합, 56~64pt, 검정 아웃라인(6~8px stroke) |\n| 3 | 2행 텍스트(유사 문장 변주) | (90,560) | 1750×180 | 상동 스타일, 1행과 동일 서식 반복 |\n\n**설계 의도**: 책 소개·강의 사이사이 \"말맛\"을 강조하는 전환 슬라이드. 같은 문형을 반복(책쓰기는 인생의 A / 책쓰기는 인생의 B)하며 핵심 명사만 레드로 바꿔 리듬감 있는 카피라이팅을 시각화한다.\n\n## 4. 만능 적용 공식\n\n### 주제별 비주얼 소재 치환 매트릭스\n\n| 원본 소재(독서법) | 범용 치환 소재 A(자기계발/강의 일반) | 범용 치환 소재 B(기업/서비스 소개) | 범용 치환 소재 C(교육/세미나) |\n|---|---|---|---|\n| 책 표지 사진(좌측 증거) | 수강생 Before/After 사진, 강사 프로필 컷 | 제품 사진, 패키지 샷 | 교재 표지, 워크북 사진 |\n| 나이테(블루 배경 임팩트 사진) | 성장 그래프를 자연물에 빗댄 은유 사진(나무, 계단, 파도) | 브랜드 시그니처 오브제 사진 | 학생 결과물, 포트폴리오 사진 |\n| 서가 사진(질문형 간지) | 사무실/작업 공간 사진 | 쇼룸, 매장 전경 사진 | 교실, 실습실 사진 |\n| \"~왜?\" 질문 리스트 | \"~가 필요한 이유?\" 질문 리스트 | \"~가 고민이신가요?\" 페인포인트 리스트 | \"~알고 계셨나요?\" 체크 리스트 |\n| 책쓰기 아웃라인 카피 | 코칭/강의의 핵심 가치 카피 2행 반복 | 제품 슬로건 2행 반복(기능/감성 대비) | 커리큘럼 한줄 요약 2행 반복 |\n\n### 복사해서 쓰는 스타일 고정 프롬프트\n\n```\n[PPT 디자인 스타일 고정 프롬프트]\n전체 톤: 고채도 단색 블록(오렌지레드 #EA3B23 또는 시안블루 #1EB3E8) 배경과\n순백(#FFFFFF)/오프화이트(#F2F2F2) 배경을 번갈아 쓰는 플랫 컬러 디자인.\n그라데이션은 최소화하고, 쓸 때는 동일 색상 135도 각도로 10% 이내 톤다운만 적용.\n\n레이아웃 공식:\n1) 본문형: 상단 풀폭 헤더바(오렌지, 높이 전체의 14%, 흰색 좌측정렬 타이틀 44~48pt)\n   + 하단은 좌(사진, 40%)-세로 디바이더(연회색 1px)-우(텍스트, 60%) 2분할.\n2) 간지형: 전체를 회색 점선(2px dashed #999)으로 테두리 두르고,\n   좌상단에 오렌지(#EA3B23) 60~72pt 굵은 라운드체 대제목 2줄,\n   그 아래 그레이(#404040) 28~30pt 질문형 리스트, 우측에 가로형 사진 1장.\n3) 임팩트형: 풀컬러 배경(블루/오렌지) + 상단 흰색 타이틀 2줄\n   + 좌측 사진(2/3 폭) + 우측 흰색 대형 심볼 도형(여백 강조용).\n4) 전환형: 중회색(#C2C2C2) 배경에 56~64pt 굵은 서체 + 검정 아웃라인(6~8px)\n   텍스트 2행, 핵심 명사만 레드(#EA3B23)로 색상 치환.\n\n타이포 규칙: 본문 핵심 문장은 검정 베이스에 핵심어 1~2곳만 레드로 치환.\n서체는 Pretendard Bold(제목), Pretendard Regular(본문), 여기어때 잘난체류\n굵은 라운드 디스플레이체(임팩트 타이틀)를 혼용.\n\n사진 규칙: 배경 제거/마스킹 없이 직사각형 크롭 원본 그대로 사용,\n따뜻한 톤(세피아 계열)으로 색보정 통일, 텍스트와는 반드시 여백/구분선으로 분리.\n```","previewUrl":"https://hopedesign.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F5830e490-f86e-4cf0-a4fe-ebb537e418aa%2FUntitled.png?table=block&id=0b1ae599-3e7d-455d-9208-03670535eb30&cache=v2","source":{"type":"url","url":"https://hopedesign.notion.site/PPt-eb65cfc5d3564d98b0a1f8e86eaccaa0"},"tokens":{"primary":"#EA3B23","secondary":"#1EB3E8","bg":"#F2F2F2","text":"#404040","font":"sans"}},
  {"id":"url-notion-poster-a","part":"poster","layout":"nouveau","name":"크리스마스 수채 강연 포스터","ref":"노션 캡처에서 복제: 온라인 북콘서트","guide":"1. **따뜻한 손그림 대비 (Warm Hand-crafted Contrast)** — 크림 톤의 차분한 배경 위에 수채화 느낌의 홀리·전나무 잎·오너먼트 장식을 얹어, 인쇄물이 아니라 손으로 꾸민 연말 초대장처럼 보이게 한다. 디지털 느낌의 플랫 아이콘이 없고 모든 요소가 유기적 곡선","guideMd":"# 디자인 가이드 — 크리스마스 수채화 \"온라인 강연 & 북콘서트\" 포스터\n\n## 1. 전체 디자인 시스템\n\n### 1.1 핵심 디자인 철학\n\n1. **따뜻한 손그림 대비 (Warm Hand-crafted Contrast)** — 크림 톤의 차분한 배경 위에 수채화 느낌의 홀리·전나무 잎·오너먼트 장식을 얹어, 인쇄물이 아니라 손으로 꾸민 연말 초대장처럼 보이게 한다. 디지털 느낌의 플랫 아이콘이 없고 모든 요소가 유기적 곡선을 가진다.\n2. **상하 프레임 + 중앙 여백 구조 (Frame & Breathing Room)** — 상단·하단에만 장식을 몰아 넣고 중앙 70% 영역은 완전한 여백/콘텐츠 존으로 비워, 텍스트 가독성과 장식성을 분리한다. 장식이 텍스트를 침범하지 않는다.\n3. **캘리그라피 타이틀 + 정보형 본문의 이중 톤 (Dual Register Typography)** — 제목은 손글씨 붓체로 감성을, 본문은 고딕 불릿 리스트로 실용 정보(일정·비용·방법)를 전달한다. 감성(그린/레드 캘리그라피)과 실용(블랙 고딕+레드 강조)을 명확히 분리.\n4. **포인트 컬러의 반복 호출 (Color Echo)** — 그린·레드 두 가지 포인트 컬러가 제목 캘리그라피 → 본문 강조 텍스트 → 날짜 배지 → 둥근 라벨 전반에 반복 등장해, 페이지가 여러 장이어도 하나의 세트처럼 묶인다.\n\n### 1.2 컬러 팔레트 및 그라데이션 공식\n\n| 구분 | 컬러명 | HEX | RGB | 적용 영역 및 역할 |\n|---|---|---|---|---|\n| Primary | 딥 포레스트 그린 | #2E6B40 | 46,107,64 | 캘리그라피 제목 \"온라인강연\", 킥커 텍스트 일부, 진행자 라벨 알약(필) 배경 |\n| Primary | 코랄 레드 | #D94452 | 217,68,82 | 캘리그라피 제목 \"북콘서트\", 본문 강조 키워드(빨간 글자), 날짜 배지(필) 배경, 오너먼트 볼 |\n| Secondary | 머스터드 골드 | #C9A227 | 201,162,39 | 홀리 열매·솔방울·별 오너먼트의 하이라이트, 작은 반짝임 점 장식 |\n| Neutral | 크림 베이지 배경 | #F7F0DF | 247,240,223 | 전체 포스터 바탕색(수채 종이 질감) |\n| Neutral | 잉크 블랙 | #2A2A28 | 42,42,40 | 본문 고딕 텍스트, 불릿 리스트, 라인업 타이틀 |\n| Neutral | 우드 브라운 | #9C6B3E | 156,107,62 | 책더미 하단 원목 선반 일러스트, 그림자 |\n| Accent | 세이지 그린(잎) | #5C7A4A | 92,122,74 | 전나무 잎·홀리 잎사귀 수채 터치 |\n\n**시그니처 그라데이션/오버레이 공식**\n- 오너먼트 볼 하이라이트: `radial-gradient(circle at 30% 25%, #FFFFFF 0%, #D94452 15%, #B5303D 100%)` — 상단 좌측에 흰색 하이라이트점을 두고 바깥으로 갈수록 진한 레드/버건디로 어두워짐 (광택 구슬 표현).\n- 금색 줄무늬 오너먼트: `repeating-linear-gradient(45deg, #C9A227 0 6px, #F7F0DF 6px 10px)` 사선 스트라이프.\n- 배경 텍스처: 단색 `#F7F0DF` 위에 5~8% 불투명도의 베이지~회베이지 얼룩(수채 블룸 노이즈)을 random하게 올려 \"종이\" 질감 부여. 플랫 디자인 툴에서는 생략 가능하나 재현 시 `noise opacity 4%` 레이어 추천.\n- 날짜 배지 필(pill): 단색 `#D94452` 배경 + 흰 텍스트, 그림자 없음(플랫), border-radius 999px.\n- 진행자/시간 안내 필: 단색 `#2E6B40` 10~15% 톤다운 outline 또는 연한 그린 배경 `#E4EEDF` + 그린 텍스트.\n\n### 1.3 타이포그래피 시스템\n\n| 위계 요소 | 원본 폰트(추정) | 한글 대체 추천 | 크기(1:1.414 세로 포스터 기준, 전체 폭 1000px 환산) | 굵기·스타일 규칙 |\n|---|---|---|---|---|\n| 메인 타이틀(캘리그라피) | 손글씨 붓펜체(예: TTBrushB, 나눔손글씨 붓) | 나눔손글씨 붓, 배달의민족 한나체 Air, 온글잎 박다현체 | 90~110px, 2줄 영역 | 그린/레드 2색 분리, 굵은 붓터치, 글자 간 기울기 자유로운 손글씨 느낌. 중앙에 검정 \"&\" 세리프/손글씨 혼합으로 두 단어를 교차 연결 |\n| 킥커(소제목) 박스 문구 | 고딕 Bold | Pretendard Bold, 나눔스퀘어 Bold | 26~28px | 블랙 바탕에 핵심 2~3단어만 레드로 색상 강조, 한 줄 전체 좌측 정렬 |\n| 섹션 헤드(라인업 페이지 \"강연&북콘서트 라인업\") | 고딕 ExtraBold | Pretendard ExtraBold | 34~38px | 블랙, 한 단어만 레드 배경 화이트 텍스트 강조 박스(\"라인업\") |\n| 본문 단락 | 고딕 Regular/Medium | Pretendard Regular/Medium | 20~22px | 줄간격 1.5, 핵심 키워드(생활비 지원, 월세 지원 등)만 레드 Medium |\n| 불릿 리스트(항목명: 값) | 고딕 Medium | Pretendard Medium | 20~22px | \"· 항목 : \" 레이블은 블랙, 콜론 뒤 수치/핵심값은 Bold 처리, 좌측 정렬 들여쓰기 통일 |\n| 라인업 날짜 배지 | 고딕 Bold | Pretendard Bold | 22px(날짜)+14px(요일) | 필 안에서 \"12/24\"는 크게, \"목\" 요일은 작게 같은 줄 보조 표기 |\n| 라인업 인용구(책 소개) | 고딕 Regular, 약간 좁은 자간 | Pretendard Regular | 16~17px | 따옴표로 감싼 1줄, 블랙, 중앙정렬 |\n| 라인업 저자명 | 고딕 Bold | Pretendard SemiBold | 20px | 블랙, 중앙정렬, 인용구 바로 아래 |\n| 마이크로 텍스트(※ 주석) | 고딕 Regular | Pretendard Regular | 15~16px | 회갈색(#6B5B45) 또는 다크그레이, 중앙정렬, 2줄, ※ 기호로 시작 |\n\n**조형 규칙**: 제목의 그린/레드 단어는 서로 다른 베이스라인에 살짝 겹치듯 배치하고 중앙에 검정 손글씨 \"&\"를 두 단어보다 작게, 세로 중앙선에 교차시켜 \"연결 접속사\" 느낌을 강조한다. 사람 일러스트는 항상 텍스트 블록의 \"오른쪽 여백\"이나 \"하단 여백\"에 배치해 텍스트 가독 영역을 침범하지 않는다.\n\n## 2. 사진과 그래픽의 조화 원칙\n\n- **플랫 일러스트 전용, 사진 미사용**: 인물·책은 전부 벡터 플랫 일러스트(단순 면 채색 + 최소 라인)로 통일. 실사 사진을 쓰지 않아 캘리그라피·수채 장식과 톤이 충돌하지 않는다.\n- **배경 분리 없는 자연스러운 배치**: 인물 일러스트는 배경 박스나 카드 없이 크림 배경 위에 그대로 떠 있어, 장식 요소(홀리·오너먼트)와 같은 레이어 평면에 녹아든다.\n- **피사체 그림자는 미니멀 접지선만**: 책더미·원목 선반 아래 옅은 그림자 또는 선반 디테일만으로 \"바닥에 놓여 있다\"는 느낌을 주고, 복잡한 캐스트 섀도우는 쓰지 않는다.\n- **색상 톤 제한으로 통일감 확보**: 모든 일러스트 인물 의상·사물은 팔레트의 세이지그린·코랄레드·머스터드골드·우드브라운 범위 안에서만 채색해 포스터 전체 색감과 어긋나지 않게 한다.\n- **텍스트 침범 금지 구역 설정**: 캘리그라피 타이틀·불릿 리스트 좌측 블록에는 일러스트를 겹치지 않고, 일러스트는 항상 텍스트 블록의 우측 또는 하단 \"여유 공간\"에만 배치해 가독성을 확보한다.\n- **책 표지 축소 이미지 삽입(라인업 페이지)**: 실제 책 표지 이미지(사진/스캔)를 원목 선반 일러스트와 혼합 배치 — 선반은 플랫 일러스트, 책 표지만 고해상도 이미지로 넣어 \"진짜 책\"이라는 신뢰도를 주는 유일한 사진성 요소.\n\n## 3. 페이지별 구성요소 및 상세 배치 설계도\n\n캔버스 기준: 세로형 1:1.414 (예: 1000×1414px)\n\n### [Master 1] 표지/메인 포스터 (source-1 유형)\n| 레이어 순서(아래→위) | 요소 | 좌표(대략, % 기준) | 크기 | 비고 |\n|---|---|---|---|---|\n| 1 | 크림 배경 전면 | 0,0 ~ 100%,100% | 전체 | #F7F0DF 단색 + 미세 노이즈 |\n| 2 | 상단 수채 홀리 가랜드 테두리 | 0,0 ~ 100%,12% (좌우 코너는 0~22%까지 확장) | 폭 전체, 높이 약 170px | 좌우 양쪽 코너에서 중앙으로 갈수록 가늘어지는 잎사귀 라인 + 중앙 살짝 처진 줄(가랜드 끈) |\n| 3 | 매달린 오너먼트 3종 | 중앙 기준 25%, 50%, 75% 지점, 가랜드 줄에서 아래로 60~90px | 지름 50~70px | 좌: 빨간 볼, 중앙: 별(빨강+금 테두리), 우: 금 스트라이프 볼 |\n| 4 | 킥커 문구 박스 | 좌측 8%, 상단 22% 지점 | 폭 약 60%, 1줄 | 블랙 Bold, \"정서적·경제적 지원\" 레드 강조 |\n| 5 | 캘리그라피 메인 타이틀 | 좌측 8%, 상단 27~40% | 폭 약 75%, 2줄 분량 높이 | \"온라인강연\"(그린) + \"&\"(블랙, 작게 교차) + \"북콘서트\"(레드) |\n| 6 | 인물 일러스트 A(독서하는 남성, 방석에 책 쌓고 앉음) | 우측 60~95%, 상단 18~32% | 폭 약 30% | 타이틀 상단 우측 여백에 배치, 제목과 겹치지 않도록 약간 위쪽 |\n| 7 | 본문 설명 단락(2줄) | 좌측 8%, 46~52% | 폭 70% | \"8회의 강연 비용은 ... 사용됩니다.\" 레드 강조 구문 포함 |\n| 8 | 불릿 정보 리스트(5항목: 후원목표/일정/시간/방법/비용) | 좌측 8%, 54~72% | 폭 75% | \"·\" 마커 + 레이블 블랙 + 값 Bold, 줄간격 균일 |\n| 9 | 인물 일러스트 B(서서 책 읽는 남성) | 좌측~중앙 8~28%, 56~78% | 폭 약 20% | 리스트 좌하단, 텍스트 아래쪽 여백 |\n| 10 | 책더미 + 인물 일러스트 C(책 위에 앉아 읽는 여성) | 중앙~우측 40~95%, 48~82% | 폭 약 45% | 5권 컬러 책더미(주황/하늘/노랑/초록/파랑) 위에 걸터앉은 인물, 포스터에서 가장 큰 단일 비주얼 |\n| 11 | ※ 주석 2줄 | 중앙정렬, 83~88% | 폭 80% | 회갈색 작은 글씨, 기부금 영수증·Zoom 링크 안내 |\n| 12 | 하단 수채 홀리 가랜드 테두리 | 0,90% ~ 100%,100% | 폭 전체 | 상단과 대칭 구도 + 캔디케인 1~2개 추가 포인트 |\n\n### [Master 2] 목차/라인업 리스트 페이지 (source-2 유형)\n| 레이어 순서 | 요소 | 좌표(%) | 크기 | 비고 |\n|---|---|---|---|---|\n| 1 | 백색~크림 배경 | 0,0~100,100% | 전체 | 홀리 테두리 없음(심플 전환) |\n| 2 | 상단 헤더 바 | 좌측 5%, 상단 3~8% | 폭 100% | \"강연 & 북콘서트 라인업\"(블랙+레드 강조박스) + 시계아이콘 그린 필(\"저녁 8시~9시\") |\n| 3 | 진행자 라벨(우상단) | 우측 75~97%, 상단 3~8% | - | 그린 필 \"진행\" + 옆에 \"광주극동방송 진행자 서유지\" 텍스트 |\n| 4 | 원목 선반 일러스트(1행) | 0~100%, 42~48% | 폭 전체, 두께 약 4% | 그림자 포함 나무 판자, 책 하단 접지선 |\n| 5 | 1행 카드 4개(12/24~12/27) | 각 칼럼 2~24%, 27~46%, 49~71%, 74~96% / 상단 10~44% | 칼럼당 폭 약 22% | 구성: 날짜 레드필 배지 → 인용구 1줄 → 저자명 Bold → 책표지 이미지(선반 위 정렬) |\n| 6 | 원목 선반 일러스트(2행) | 0~100%, 86~92% | 폭 전체 | 1행과 동일 패턴 반복 |\n| 7 | 2행 카드 4개(12/28~12/31) | 동일 칼럼 구조, 상단 52~90% | 칼럼당 폭 약 22% | 1행과 동일 레이아웃, 책표지만 교체 |\n\n**공통 그리드 규칙**: 라인업 카드는 4열×2행 그리드, 칼럼 간 여백 3%, 각 카드 내부는 \"배지(상) → 텍스트(중) → 이미지(하)\" 수직 3단 고정 구조를 반드시 지킨다.\n\n## 4. 만능 적용 공식\n\n### 주제별 비주얼 소재 치환 매트릭스\n\n| 디자인 구성요소 | 크리스마스(원본) | 봄/벚꽃 시즌 치환 | 가을/추수감사 시즌 치환 | 신년/설날 시즌 치환 |\n|---|---|---|---|---|\n| 상하단 프레임 장식 | 홀리잎·전나무·열매 가랜드 | 벚꽃가지·나비 가랜드 | 단풍잎·낙엽·도토리 가랜드 | 소나무·매듭·한지문양 가랜드 |\n| 매달린 오너먼트 | 빨간볼·별·금줄무늬볼 | 꽃봉오리·리본·종이등 | 호박·솔방울·곡식다발 | 복주머니·엽전·매듭술 |\n| 캘리그라피 2색 조합 | 그린+레드 | 핑크+그린 | 버건디+머스터드 | 레드+골드 |\n| 하단 보조 장식 | 캔디케인 | 벚꽃 잎 흩날림 | 밤송이 | 복주머니 술 |\n| 배경 베이스 톤 | 크림 베이지 | 아이보리 화이트 | 웜 카키베이지 | 따뜻한 아이보리+골드 펄 |\n| 인물 일러스트 소품 | 책, 방석 | 돗자리, 벚꽃가지 | 담요, 수확 바구니 | 한복 소품, 세배상 |\n\n### 복사해서 쓰는 스타일 고정 프롬프트\n\n```\n스타일: 따뜻한 수채화 질감의 플랫 일러스트 포스터 디자인.\n배경은 크림 베이지(#F7F0DF) 단색 + 미세한 종이 노이즈.\n상단과 하단에 대칭 구조의 수채화 식물 가랜드 테두리(좌우 코너에서 중앙으로 갈수록 가늘어지는 잎사귀+열매 장식)를 배치하고,\n가랜드 줄에 매달린 오너먼트 3개(지름 50~70px)를 균등 간격으로 배치한다.\n중앙 상단에는 블랙 고딕 Bold 킥커 문구 한 줄(핵심 단어만 코랄레드 #D94452 강조)을 두고,\n그 아래 큰 캘리그라피(손글씨 붓체) 타이틀을 두 단어로 구성하되 첫 단어는 포레스트그린(#2E6B40), 둘째 단어는 코랄레드(#D94452), 가운데 블랙 손글씨 \"&\"로 교차 연결한다.\n본문은 좌측 정렬 2줄 설명문(핵심 구문 레드 강조) + \"· 항목 : 값\" 형식의 불릿 리스트 5줄(레이블 블랙, 값 Bold)로 구성한다.\n우측과 하단 여백에는 플랫 벡터 일러스트 인물(단순 면 채색, 세이지그린·코랄레드·머스터드골드·우드브라운 색상 제한)을 텍스트를 침범하지 않게 배치한다.\n하단에는 회갈색(#6B5B45) 마이크로 텍스트로 ※ 주석 2줄을 중앙정렬한다.\n전체적으로 사진 소스는 쓰지 않고, 손그림 느낌의 따뜻하고 아늑한 연말 초대장 톤을 유지한다.\n```","previewUrl":"https://hopedesign.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fd0f59bd8-b95c-4a60-9307-0f6da49b01c8%2FUntitled.png?table=block&id=aadf0903-d9bc-46d9-a9e1-7bd5d9826987&cache=v2","source":{"type":"url","url":"https://hopedesign.notion.site/164c224c75da4dbeb5ac30563406c071"},"tokens":{"primary":"#2E6B40","secondary":"#D94452","bg":"#F7F0DF","text":"#2A2A28","font":"sans"}},
  {"id":"url-notion-poster-b","part":"poster","layout":"nouveau","name":"라이트하우스 벽돌포토 카드분할형","ref":"노션 캡처에서 복제: 예배광고","guide":"Read the image. Now I'll produce the design guide markdown.","guideMd":"Read the image. Now I'll produce the design guide markdown.\n\n# 디자인 가이드 — 라이트하우스 포항 주일광고 (벽돌 포토+스카이블루 카드 분할형)\n\n## 1. 전체 디자인 시스템\n\n### 1.1 핵심 디자인 철학\n\n1. **좌우 극단 대비 (Photo vs. Flat)** — 좌측은 질감 있는 흑백톤 사진(화이트 브릭+펜던트 조명), 우측은 완전 평면 솔리드 하늘색 카드. 사진의 '깊이감'과 카드의 '정돈감'을 1:1 수직 분할선으로 맞세워 \"따뜻한 공간 + 정돈된 정보\"라는 두 메시지를 동시에 전달한다.\n2. **여백이 곧 신뢰감** — 우측 카드 내부는 좌우 패딩을 넉넉히 두고 모든 본문을 가운데 정렬해, 교회 주보 특유의 차분하고 정제된 인상을 만든다. 글자 수가 많아도 줄 간격(약 1.6~1.8배)을 넓게 둬 밀도를 낮춘다.\n3. **기하 프레임 모티프** — 로고를 사각 라인 프레임 안에 세로쓰기로 가두는 것이 핵심 상징. 가는 선(2~3px) 정사각형이 사진 위에 겹쳐 놓이며, 이 프레임이 전체 포스터에서 유일한 '사진 위 그래픽 개입'이다.\n4. **블루 단일 색상 위계** — 블랙·그레이(사진)와 딥블루(텍스트/로고)만 쓰고 그 중간에 연한 스카이블루(배경 카드)를 배치해, 색상 수를 최소화하면서도 \"제목=로고블루, 안내=미드블루, 배경=페일블루\"의 3단 위계를 만든다.\n\n### 1.2 컬러 팔레트 및 그라데이션 공식\n\n| 구분 | 컬러명 | HEX | RGB | 적용 영역 및 역할 |\n|---|---|---|---|---|\n| Primary | 딥 네이비블루 | #1A3A6B | 26,58,107 | 로고 텍스트(\"라이트하우스\"), 소제목(\"주일예배/공동체 고백/광 고\"), 프레임 라인, 메인 타이틀 강조 |\n| Secondary | 미드 스틸블루 | #2B5A8C | 43,90,140 | 서브 타이틀(\"부족함이 없습니다\"), 본문 핵심 문구 굵게 처리된 부분 |\n| Neutral Dark | 차콜 그레이 | #3A3A3A | 58,58,58 | 일반 본문 텍스트, 날짜·장소 캡션, 광고 리스트 번호/본문 |\n| Neutral Light | 오프화이트 | #F5F5F3 | 245,245,243 | 좌측 벽돌 사진 하이라이트, 좌대(받침대) 입체면 |\n| Background Accent | 페일 스카이블루 | #D9EBF7 | 217,235,247 | 우측 전체 배경, 3단 박스 공통 배경색 |\n| Background Card | 화이트블루 | #F2F8FC | 242,248,252 | 3단 라운드 박스 내부(배경보다 한 톤 밝은 카드) — 배경 위에 떠 있는 듯한 레이어감 |\n| Accent | 라이트하우스 블루(로고 아이콘) | #4A7FB5 | 74,127,181 | 로고 하단 등대 아이콘, 로고 프레임 테두리 포인트 |\n\n- **시그니처 그라데이션 공식**: 좌측 사진 영역은 사진 자체 명암(상단 밝은 조명 → 하단 어두운 받침대)으로 수직 그라데이션 느낌을 대신하며, 별도 색 그라데이션은 사용하지 않음. 굳이 디지털로 재현 시: `linear-gradient(180deg, #FAFAFA 0%, #E8E8E6 60%, #D5D5D2 100%)`를 벽돌 사진 위 1~3% 불투명 오버레이로 깔아 통일감 부여.\n- **카드-배경 오버레이 공식**: 배경(#D9EBF7) 위에 카드(#F2F8FC)를 얹을 때 `box-shadow: 0 2px 8px rgba(26,58,107,0.06)`를 적용해 미세한 부양감만 준다(그림자 과하게 X).\n- **로고 프레임 라인 공식**: `border: 2.5px solid #1A3A6B` + 내부 배경 투명(사진이 비침) + 라인 네 귀퉁이는 직각(라운드 없음)으로 \"간판/표지판\" 느낌 유지.\n\n### 1.3 타이포그래피 시스템\n\n| 위계 요소 | 원본 폰트(추정) | 한글 대체 추천 | 크기(1080px 기준) | 굵기·스타일 규칙 |\n|---|---|---|---|---|\n| 로고 타이틀(세로 3행) | 산세리프 Bold(두꺼운 고딕) | Pretendard Bold / Noto Sans KR Bold | 44~50px | 극굵게, 행간 1.05, 가운데 정렬, 색 #1A3A6B / 2번째 줄(\"하우스\")만 포인트 블루 |\n| 날짜·장소 캡션(좌) | 명조(세리프) Regular | Noto Serif KR Regular | 18~20px | 레귤러, 자간 넓게(+2%), 색 #3A3A3A, 가운데 정렬 |\n| 소제목(주일예배/공동체 고백/광고) | 고딕 Bold | Pretendard Bold | 22~24px | 좌측 정렬, 밑줄 없는 단독 라벨, 색 #1A3A6B, 박스 상단 바깥쪽에 배치 |\n| 서브 설교명(여호와는 나의 목자) | 명조 Regular | Noto Serif KR Regular | 16~17px | 레귤러, 가운데 정렬, 회색빛 블루 |\n| 메인 설교 제목(부족함이 없습니다) | 명조 Bold | Noto Serif KR Bold / Black | 28~30px | 볼드, 가운데 정렬, 본문 중 유일하게 크기 2배 이상 강조 |\n| 본문(성경구절·목사명·공동체 고백·광고 텍스트) | 명조 Regular | Noto Serif KR Regular | 15~16px | 레귤러, 줄간격 1.7~1.8, 가운데 정렬(고백문) / 좌측 정렬(광고 리스트) |\n| 마이크로 텍스트(번호 1. 2.) | 고딕 Regular | Pretendard Regular | 15px | 리스트 번호, 본문과 동일 색(#3A3A3A), 들여쓰기로 행잇기 |\n\n**조형 규칙**:\n- 로고는 가로쓰기가 아닌 **세로 3행 적층**(\"라이트/하우스/포항\")으로 배치해 정사각 프레임 비율과 맞춘다 — 이것이 이 포스터의 시그니처 레이아웃 트릭.\n- 우측 카드 내부 텍스트는 설교 제목 하나만 명조+볼드+확대로 강조하고, 그 외 모든 텍스트는 레귤러로 통일 — \"하나의 메시지만 키운다\"는 규칙.\n- 소제목 라벨(주일예배 등)은 카드 **바깥 상단**에 배치되어 카드 자체와 분리된 헤더처럼 작동(카드 안에 포함 X).\n\n## 2. 사진과 그래픽의 조화 원칙\n\n- **피사체 분리**: 벽돌 벽(배경)과 펜던트 조명(중경), 좌대/받침대(전경)의 3레이어 깊이를 자연광과 그림자만으로 분리. 별도의 컷아웃/마스킹 없이 원본 사진의 톤 그 자체를 사용.\n- **그래픽 오버레이 최소화**: 사진 위에는 로고 프레임(라인 도형)과 로고 텍스트, 캡션 텍스트 단 3개 요소만 얹는다. 사진을 가리는 큰 배경색 박스나 그라데이션 오버레이를 쓰지 않아 사진의 질감을 그대로 노출.\n- **가독성 확보 기법**: 로고 프레임을 벽돌의 밝은 중간 영역(조명 아래, 좌대 위) 공백에 배치해 텍스트 배경이 되는 벽돌의 디테일이 적은 지점을 고름. 캡션(날짜·장소)은 로고 프레임 바로 아래, 벽돌의 가장 평평하고 밝은 구간에 둬 세리프 텍스트의 얇은 획도 묻히지 않게 한다.\n- **색 매칭 규칙**: 사진이 흑백~그레이 톤이므로, 로고/프레임만 유채색(블루)을 써서 자연스럽게 포인트가 되도록 한다. 사진 자체에 색 보정(블루 틴트)을 가하지 않고 원본 그레이스케일에 가깝게 유지하는 것이 핵심 — 색은 오직 그래픽 요소에만 허용.\n\n## 3. 페이지별 구성요소 및 상세 배치 설계도\n(기준 캔버스: 1080×1527px, 1:1.414 세로형)\n\n### [Master 1] 표지형 (현재 샘플 레이아웃 — 좌 포토/우 카드 분할)\n- 전체 분할선: x=540px(정중앙), 좌(0~540) 포토 / 우(540~1080) 카드 영역\n- **좌측 포토 영역 (0,0 ~ 540,1527)**\n  - 배경: 화이트 브릭 텍스처 풀블리드, z-index 0\n  - 펜던트 조명: 상단 중앙(x=270, y=0~430), 전선이 캔버스 최상단에서 내려옴, z-index 1\n  - 로고 프레임(정사각): 중앙 하단부, 좌표 약 (120,350)~(420,650), 300×300px, 라인 2.5px, z-index 2\n    - 내부 텍스트 \"라이트/하우스/포항\" 3행, 각 행 좌우 중앙정렬, 하단에 미니 등대 아이콘(30px) 포함\n  - 캡션(날짜/장소): 프레임 하단 80px 지점, \"2021.3.14. pm.3\" + \"카페 그레이스\" 2행, z-index 2\n  - 좌대(받침대) 오브젝트: 하단(y=1150~1527), 사진 피사체, z-index 1\n  - 좌대 정면 로고: 좌대 중앙, \"LIGHTHOUSE MOVEMENT\" 워드마크 + 등대 아이콘, 160px 폭, z-index 2\n- **우측 카드 영역 (540,0 ~ 1080,1527)**\n  - 배경: 풀블리드 페일 스카이블루(#D9EBF7), z-index 0\n  - 좌우 패딩: 60px, 콘텐츠 폭 420px\n  - **블록 A \"주일예배\"** y=60~300\n    - 라벨 \"주일예배\" : y=60, 좌측 정렬, 24px Bold\n    - 카드(라운드 16px, #F2F8FC): y=100~300, ���부 패딩 30px\n      - 서브타이틀 \"여호와는 나의 목자(1)\" 중앙정렬 16px\n      - 메인 설교제목 \"부족함이 없습니다\" 중앙정렬 28px Bold (간격 위아래 12px)\n      - 성경구절 \"시편 23편 1절\" 중앙정렬 15px\n      - 설교자 \"홍민기 목사\" 중앙정렬 15px\n  - **블록 B \"공동체 고백\"** y=340~870\n    - 라벨: y=340, 좌측정렬 24px Bold\n    - 카드(라운드 16px): y=380~870, 내부 패딩 40px/30px\n      - 4개 문단, 각 문단 3~4행, 중앙정렬 15px, 행간 1.7, 문단 간 여백 28px\n  - **블록 C \"광 고\"** y=905~1450\n    - 라벨 \"광 고\"(자간 넓힘): y=905, 좌측정렬 24px Bold\n    - 카드(라운드 16px): y=945~1450, 내부 패딩 30px\n      - 번호 리스트(1,2), 좌측정렬, 번호+본문 들여쓰기 2행씩, 15px, 행간 1.6, 항목간 여백 24px\n\n### [Master 2] 목차/순서형 (변형 — 우측을 리스트 중심으로)\n- 좌측 포토 동일 유지(브랜드 일관성 앵커)\n- 우측: 카드 1개만 크게(풀카드), 내부에 번호 매긴 \"예배 순서\" 세로 리스트(성경봉독→찬양→설교→기도→축도), 각 항목 좌측 번호(원형 배지, #1A3A6B 배경+흰글씨) + 우측 텍스트\n\n### [Master 3] 간지/시리즈 타이틀형\n- 좌측 포토를 전체 풀블리드로 확장(우측 카드 영역 없음)\n- 로고 프레임 위치를 화면 정중앙으로 이동, 크기 400×400px로 확대\n- 하단에 시리즈명 + 회차(\"1부\")를 명조 Bold 36px로 추가\n\n### [Master 4] 본문 인용형(말씀 카드)\n- 좌측 포토 폭을 540→380px로 축소, 우측 카드 폭 700px로 확장\n- 카드 내부: 큰 따옴표 장식(opacity 10%, #1A3A6B) 배경에 깔고, 성경 구절 전문을 중앙정렬 명조 20px로 크게 배치, 하단에 출처(소형 15px)\n\n### [Master 5] 사람 소개/광고 포스터형\n- 좌측 포토를 인물/이벤트 사진으로 교체, 로고 프레임은 우하단 코너로 축소 이동(150×150px)\n- 우측 카드: 상단에 큰 제목 카드 1개 + 하단에 일시/장소/대상 정보를 아이콘+텍스트 2열 그리드로 배치\n\n### [Master 6] 감사/마무리 카드형\n- 좌측 포토 유지\n- 우측 카드 전체를 단일 블록으로 통합, 중앙에 짧은 감사 문구(1~2줄, 24px Bold) + 하단에 작은 로고 워드마크 반복 배치로 마무리 톤\n\n## 4. 만능 적용 공식\n\n| 주제 | 좌측 포토 소재 치환 | 로고 프레임 내 텍스트 | 우측 카드 섹션 구성 | 포인트 컬러 치환 |\n|---|---|---|---|---|\n| 주일예배 광고(기본형) | 화이트 브릭+펜던트 조명 | 교회/공동체명 세로 3행 | 주일예배/공동체고백/광고 | 네이비블루 유지 |\n| 특별 새벽기도회 | 어두운 새벽 창가, 촛불 소재 | \"새벽/기도회\" | 본문말씀/기도제목/일정 | 네이비→딥퍼플 톤 |\n| 성탄/연말 행사 | 따뜻한 조명+트리 오브젝트 | \"크리스마스\" 세로 | 행사안내/찬양순서/광고 | 블루→딥그린+골드 포인트 |\n| 청년부/찬양집회 | 조명 장비, 무대 소재 | \"청년/찬양의 밤\" | 순서표/워십가사/신청안내 | 블루→틸/시안 톤 |\n| 교육/세미나 | 책상, 노트, 조명 소재 | \"세미나명\" 세로 | 강사소개/커리큘럼/신청 | 블루→그레이블루 유지 |\n| 봉사/선교 보고 | 지도, 여행가방 소재 | \"선교지명\" | 보고내용/기도제목/후원안내 | 블루→어스톤(테라코타) 포인트 |\n\n### 복사해서 쓰는 스타일 고정 프롬프트\n\n```\n1080x1527px (1:1.414 세로형) 포스터, 정중앙 수직 분할 2단 레이아웃.\n\n[좌측 50%] 화이트 브릭(흰색 벽돌) 텍스처 배경에 검은색 펜던트 조명이 상단에서\n내려오는 사진. 중앙 하단에 정사각(300x300px) 네이비블루(#1A3A6B) 라인 프레임,\n라인 두께 2.5px, 직각 모서리, 내부는 투명(배경 비침). 프레임 안에 세로 3행으로\n적층된 굵은 산세리프 한글 로고 텍스트, 색상 #1A3A6B, 둘째 행만 포인트 블루\n#4A7FB5. 프레임 하단에 작은 등대 아이콘. 프레임 바로 아래 명조체 캡션 2행\n(일시/장소), 색 #3A3A3A. 하단에는 흰색 입체 좌대(받침대) 오브젝트와 그 위에\n작은 로고 워드마크.\n\n[우측 50%] 풀블리드 페일 스카이블루(#D9EBF7) 배경. 좌우 패딩 60px. 상단부터\n세로로 3개 섹션: 각 섹션은 '좌측정렬 굵은 고딕 라벨(24px, #1A3A6B)' +\n'그 아래 라운드 코너(16px) 화이트블루(#F2F8FC) 카드, 은은한 그림자'.\n카드 내부 텍스트는 명조체, 핵심 타이틀 1개만 28px 볼드로 확대, 나머지는\n15~16px 레귤러, 행간 1.7, 중앙정렬(본문) 또는 좌측정렬(번호 리스트).\n색상은 네이비블루(#1A3A6B)와 차콜그레이(#3A3A3A) 두 가지만 사용.\n\n전체 톤: 차분하고 정제된 블루+그레이+화이트, 사진은 그레이스케일에 가깝게,\n그래픽 요소만 유채색. 절제된 여백, 기하학적 프레임 모티프 유지.\nAbsolutely NO text distortion, NO watermark, NO logos other than specified.\n```","previewUrl":"https://hopedesign.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Feb7060a3-6b68-4c22-a393-516288063773%2FUntitled.png?table=block&id=9f8d5dc5-5cc8-41fb-a806-e222afbcb314&cache=v2","source":{"type":"url","url":"https://hopedesign.notion.site/3d8b0935ac6a4da3b3f95d64853b999f"},"tokens":{"primary":"#1A3A6B","secondary":"#2B5A8C","bg":"#D9EBF7","text":"#3A3A3A","font":"serif"}},
  {"id":"url-notion-poster-c","part":"poster","layout":"warmgrad","name":"겨루지않는자녀양육스킬","ref":"노션 캡처에서 복제: 자녀양육스킬","guide":"파일 쓰기 권한이 없어 저장은 못 했지만, 완성한 디자인 가이드 전체를 아래에 바로 드립니다.","guideMd":"파일 쓰기 권한이 없어 저장은 못 했지만, 완성한 디자인 가이드 전체를 아래에 바로 드립니다.\n\n# 디자인 가이드 — 겨루지 않는 자녀양육스킬 포스터\n\n## 1. 전체 디자인 시스템\n\n### 1.1 핵심 디자인 철학\n\n1. **3단 수평 레이어링(크림→화이트→옐로)** — 포스터를 상단(타이틀/일러스트), 중단(전환 여백), 하단(강사·실용정보) 3개의 수평 블록으로 명확히 분절한다. 각 블록은 배경색이 달라 \"읽는 순서\"를 색으로 강제한다 — 위는 감성(메시지), 아래는 실용(누가/언제/어떻게).\n2. **포인트 1색 강조(코랄 레드) 원칙** — 전체 팔레트는 크림·옐로·그린 등 부드러운 중간톤이지만, 메시지의 핵심 단어(\"힘\")만 쨍한 코랄 박스+흰 글자로 강조해 시선을 첫 글자에 고정시킨다. 강조는 전체 중 1곳, 많아야 2곳을 넘지 않는다.\n3. **손그림 수채 일러스트 + 타이포의 교차 배치(overlap)** — 캘리그라피 제목 글자가 꽃/인물 일러스트 영역과 수직으로 겹치거나 맞닿도록 배치해, 텍스트와 그래픽이 별개 블록이 아니라 한 장면처럼 보이게 한다(깊이감).\n4. **말풍선을 통한 2인칭 대화체 보조 카피** — 핵심 정보(온라인 진행방식, 강사 소개)는 손글씨 말풍선/네모 말풍선 안에 구어체로 배치해 공식 안내문이 아닌 \"대화\"처럼 친근하게 전달한다.\n\n### 1.2 컬러 팔레트 및 그라데이션 공식\n\n| 구분 | 컬러명 | HEX | RGB | 적용 영역 및 역할 |\n|---|---|---|---|---|\n| Primary | 코랄 레드 (Coral Red) | #E8544A | 232,84,74 | 메인 타이틀 \"힘\" 강조박스, 하트 아이콘, 로고 리본, 큰 꽃 모티프, 포인트 보더 |\n| Secondary | 선셋 옐로 (Sunset Yellow) | #F5B82E | 245,184,46 | 하단 1/3 전체 배경 블록, 우측 \"일시/신청\" 라벨 칩 배경 |\n| Neutral-BG | 아이보리 크림 (Ivory Cream) | #FBF3E7 | 251,243,231 | 상단 2/3 전체 배경, 따뜻하고 차분한 베이스 톤 |\n| Neutral-Dark | 차콜 그레이 (Charcoal) | #333333 | 51,51,51 | 본문 텍스트, 소제목, 강사 프로필 텍스트, 하단 연락처 |\n| Accent-Green | 올리브 그린 (Soft Olive) | #7A8450 | 122,132,80 | 꽃 일러스트 줄기/잎, 자연스러운 보조색으로 채도 균형 |\n| Accent-Blue | 더스티 블루 (Dusty Blue) | #A8B9D4 | 168,185,212 | 작은 들꽃 포인트(보라빛 꽃), 배경 대비용 쿨톤 소량 사용 |\n| Card-White | 퓨어 화이트 | #FFFFFF | 255,255,255 | 강사 말풍선 카드, 날짜 카드, QR 카드 배경 — 옐로 블록 위 콘텐츠 가독성 확보 |\n\n- **배경 전환 공식**: 수직 그라데이션이 아닌 **하드 컷(Hard color block)** 방식. 상단 0~66% 구간은 #FBF3E7 단색, 66~100% 구간은 #F5B82E 단색으로 경계선 없이 즉시 전환(그라데이션 없음, flat color block이 핵심).\n- **타이틀 강조박스 공식**: 배경 #FBF3E7 위에 `#E8544A` 사각 박스(약간의 radius, 2~4px) + 내부 흰색(#FFFFFF) 손글씨체 글자 1자, 박스는 본문 캘리그라피보다 1.3~1.5배 큰 폰트 크기.\n- **카드 오버레이 공식**: 옐로 블록(#F5B82E) 위에 올라가는 모든 정보 카드는 `#FFFFFF` 배경 + 옅은 그림자(0 2px 6px rgba(0,0,0,0.08)) + radius 12~16px로 떠 있는 느낌을 준다.\n\n### 1.3 타이포그래피 시스템\n\n| 위계 요소 | 원본 폰트(추정) | 한글 대체 추천 | 크기(A4 세로 환산) | 굵기·스타일 규칙 |\n|---|---|---|---|---|\n| 메인 타이틀 강조글자(\"힘\") | 손글씨 캘리그라피 붓펜체 | 배달의민족 주아체 / 잘난체 | 72~80pt | 흰색, 코랄 박스 내부 중앙 정렬, 최대 단일 글자 |\n| 메인 타이틀 나머지(\"겨루지 않는 자녀양육스킬\") | 동일 계열 손글씨체(축소) | 배달의민족 주아체 / 연성체 | 40~48pt | 차콜, 2줄 배치, 자유곡선 배치 |\n| 서브 타이틀(\"문제 소유가리기, 훈육과 격려\") | 고딕 중간 굵기 | Pretendard SemiBold | 18~20pt | 차콜, 자간 넓게, 가운데 정렬 |\n| 상단 시리즈 라벨(\"Talk To MiraE... 11th\") | 고딕 Bold, 알약 배지 | Pretendard Bold | 13~14pt | 흰 글자 + 다크 배경 알약(pill), 가운데 정렬 |\n| 말풍선 손글씨(\"온라인 줌에서 만나요~\") | 손글씨체 | 나눔손글씨 붓 / 잘난체 | 14~16pt | 차콜, 구어체 말줄임(~) 포함 |\n| 강사 소개 소제목(\"[서유지 강사]\") | 고딕 Bold | Pretendard Bold | 15~16pt | 차콜, 대괄호로 감싼 라벨 |\n| 강사 프로필 본문 | 고딕 Regular | Pretendard Regular | 11~12pt | 차콜, 좌측 정렬, 줄간격 1.4~1.5, 글머리 기호 |\n| 라벨 칩(\"일 시\"/\"신 청\") | 고딕 Bold, 자간 넓힘 | Pretendard ExtraBold | 16~18pt | 차콜 글자 + 진골드 배경 칩, 글자 사이 스페이싱 |\n| 날짜·시간 본문 | 고딕 Medium | Pretendard Medium | 13~14pt | 차콜, 흰 카드 중앙 정렬, 2줄 |\n| 마이크로 텍스트(하단 연락처) | 고딕 Regular | Pretendard Regular | 11pt | 차콜, 아이콘+텍스트, 가운데 정렬, 슬래시 구분 |\n\n**조형 규칙**: 메인 타이틀은 \"힘\"(강조박스, 단독) → \"겨루지 않는\"(가는 글씨, 우측 상단 끼어듦) → \"자녀양육스킬\"(아래 줄, 중간 굵기)의 **3단 크기·굵기 교차 배치**로 리듬을 만든다. 제목 블록 하단이 일러스트 상단과 약 10~15% 겹치도록 배치해 레이어 깊이감을 준다.\n\n## 2. 사진과 그래픽의 조화 원칙\n\n- **실사 인물사진의 일러스트화 배경 배치**: 중앙 가족은 수채 일러스트, 하단 강사는 실사 사진 — \"상단=일러스트 세계관\", \"하단=실사 세계관\"으로 의도적 분리해 역할 차이(감성 vs 신뢰감)를 표현.\n- **피사체 배경 제거 없이 자연스러운 블렌딩**: 강사 사진은 컷아웃 없이 옐로 배경 위에 배치, 사진 배경(흰 벽)과 포스터 배경(옐로)의 색 대비로 자연스럽게 분리. 인물은 허리 위로 크롭.\n- **말풍선을 통한 가독성 확보**: 복잡한 일러스트 영역 위에 텍스트를 직접 얹지 않고 반드시 흰색 불투명 말풍선 안에 배치.\n- **마스킹 보더 역할의 꽃 일러스트**: 꽃다발이 가족 일러스트 좌우 하단을 감싸 사각 경계를 지우고 유기적 경계를 형성.\n- **QR코드와 배경의 색 대비 분리**: QR은 흰 카드 안에 격리해 옐로 배경과 바로 닿지 않게 해 인식률과 시각 노이즈를 동시에 관리.\n\n## 3. 페이지별 구성요소 및 상세 배치 설계도\n\n*(세로형 1:1.414, top/left %는 전체 높이·폭 기준)*\n\n### [Master 1] 표지형 메인 포스터\n| 레이어 | 요소 | 위치(top/left, W×H) | 비고 |\n|---|---|---|---|\n| 1 | 크림 배경 | top 0~66%, full | 상단 베이스 |\n| 1 | 옐로 배경 | top 66~100%, full | 하단 베이스 |\n| 2 | 하트 아이콘 | top 2%, left 8%, W6% | 최상단 포인트 |\n| 2 | 로고+단체명 | top 3%, center, W30% | 좌아이콘+우텍스트 |\n| 2 | 시리즈 라벨 배지 | top 8%, center, W55% | 다크 알약 배지 |\n| 3 | \"힘\" 강조박스 | top 12%, left 8%, W22% | 최대 강조 |\n| 3 | \"겨루지 않는\" | top 13%, left 32%, W40% | 우측 상단 끼움 |\n| 3 | \"자녀양육스킬\" | top 19%, left 35%, W55% | 아래 줄 |\n| 3 | 서브타이틀 | top 27%, center, W60% | 중앙 정렬 |\n| 4 | 가족 일러스트 | top 32~62%, center, W55% | 타이틀과 10~15% 겹침 |\n| 4 | 좌우 꽃다발 | top 38~62%, L/R 0~20% | 인물 감싸기 |\n| 5 | 말풍선(\"온라인 줌…\") | top 30%, right 10%, W25% | 인물 우측 상단 |\n| 6 | 강사 실물 사진 | top 68%, left 2%, W24%×H30% | 좌하단 |\n| 6 | 프로필 말풍선 | top 67%, left 27%, W45% | 좌상단 꼬리 |\n| 6 | \"일시\" 칩+카드 | top 68%, right 22%, W20% | 칩+카드 세트 |\n| 6 | \"신청\" 칩+QR카드 | top 83%, right 22%, W20% | 칩+카드 세트 |\n| 7 | 연락처 바 | top 97%, center, W70% | 최하단 |\n\n### [Master 2] 목차/시리즈 안내형\n상단 로고·배지 고정(브랜드 일관성), 중앙은 번호 리스트 카드 그���드 3×2(흰 배경+코랄 보더), 하단 옐로 블록은 전체 일정표로 대체, QR/연락처 위치 유지.\n\n### [Master 3] 간지(섹션 구분)형\n배경 전체를 코랄 또는 옐로 단색 풀블리드, 중앙 상하 정렬 큰 타이틀 단독 배치, 꽃 일러스트는 네 모서리 장식으로만 소량 사용, 로고는 상단 고정.\n\n### [Master 4] 본문 상세형(커리큘럼/시간표)\n상단 동일 구조 유지, 중앙 일러스트 영역을 표로 대체(헤더 행 코랄+흰 글자, 본문 행 차콜), 하단 옐로 블록 그대로 유지.\n\n### [Master 5] 강사 상세 소개형\n꽃 일러스트는 모서리로 축소, 중앙에 강사 사진 확대(W40%)+우측 경력 리스트(흰 카드, 코랄 불릿), 하단 블록은 일시/신청만 압축 배치.\n\n### [Master 6] 안내/FAQ형\n로고·배지 고정, 중앙은 질문(코랄 칩)/답변(흰 말풍선) 세로 스택, 하단 연락처 바 확장.\n\n## 4. 만능 적용 공식\n\n| 원본 요소 | 역할 | 교육/건강 대체안 | 비즈니스/재무 대체안 | 신앙/교회 대체안 |\n|---|---|---|---|---|\n| 코랄 박스 강조 1글자 | 핵심 키워드 앵커 | \"꿈\",\"힘\",\"성장\" | \"富\",\"益\",\"Pro\" | \"恩\",\"빛\",\"은혜\" |\n| 가족 수채 일러스트 | 공감대 형성 | 교실 학생·교사 | 악수하는 파트너 | 함께 기도하는 회중 |\n| 꽃다발 장식 | 따뜻함 보강 | 책/연필 모티프 | 식물/그래프 모티프 | 비둘기/올리브 가지 |\n| 흰 말풍선 | 친근 보조 메시지 | \"함께 배워봐요~\" | \"지금 등록하세요~\" | \"함께 은혜받아요~\" |\n| 하단 옐로 블록 | 신뢰+CTA 구역 | 강사→일시→신청 | 발표자→일시→등록 | 설교자→일시→참여 |\n| QR 신청 카드 | 디지털 전환 유도 | 동일 | 동일 | 동일 |\n\n**복사해서 쓰는 스타일 고정 프롬프트**\n```\n전체 톤: 따뜻한 파스텔 크림(#FBF3E7) 배경 상단 2/3 + 선셋 옐로(#F5B82E) 배경 하단 1/3,\n하드 컷 색 블록 전환(그라데이션 없음), 세로형 1:1.414 포스터.\n\n타이포: 손글씨 캘리그라피 혼합 고딕. 핵심 키워드 1~2음절만 코랄 레드(#E8544A)\n사각 박스 + 흰색(#FFFFFF) 글자로 최대 강조, 나머지 타이틀은 차콜(#333333)\n손글씨체로 2~3단 크기·굵기를 교차시켜 배치. 서브타이틀은 차콜 고딕 중간 굵기.\n\n일러스트: 수채화 톤 플랫 일러스트(인물/상징물)를 중앙에 배치하고 타이틀 하단과\n10~15% 겹치게 레이어링. 코랄·핑크·보라 계열 꽃 또는 상징 모티프로 인물 좌우를\n유기적으로 감싸 사각 경계를 지운다. 보조 설명은 흰색 불투명 말풍선 안에만 배치.\n\n하단 정보 블록: 옐로(#F5B82E) 배경 위에 좌측 실사 인물사진(배경 제거 없이 배치),\n우측에 흰색 말풍선형 프로필 카드. 더 우측에는 진한 골드색 라벨 칩(\"일 시\"/\"신 청\")\n+ 흰색 둥근 카드(날짜/QR코드) 세트를 수직으로 2단 배치. 최하단은 옐로 배경 그대로\n전화/이메일 연락처를 가운데 정렬로 작게 배치.\n\n전체 느낌: 공식적이지 않고 친근한 대화체, 따뜻하고 안정적인 중간톤 배색,\n단 하나의 포인트 컬러(코랄)만 강하게 사용, 레이어 겹침으로 깊이감 연출.\n```","previewUrl":"https://hopedesign.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fc2ac55b4-2517-496d-a2ea-e0165b6d5d13%2FUntitled.png?table=block&id=0645de3e-c21a-4d63-8636-e3908cdb1ed0&cache=v2","source":{"type":"url","url":"https://hopedesign.notion.site/ebace1547f504f0f8148097c0ee02fea"},"tokens":{"primary":"#E8544A","secondary":"#F5B82E","bg":"#FBF3E7","text":"#333333","font":"sans"}},
  {"id":"url-notion-poster-d","part":"poster","layout":"warmgrad","name":"민트웨이브 부모교육 모집카드","ref":"노션 캡처에서 복제: 부모교육","guide":"파일 쓰기 권한이 없어 바로 아래에 디자인 가이드 전문을 출력합니다.","guideMd":"파일 쓰기 권한이 없어 바로 아래에 디자인 가이드 전문을 출력합니다.\n\n# 디자인 가이드 — 민트 웨이브 부모교육 모집카드 (Active Parenting Recruit Card)\n\n## 1. 전체 디자인 시스템\n\n### 1.1 핵심 디자인 철학\n\n1. **2단 색면 분할로 정보 위계를 공간화한다** — 전체 화면을 상단 70% 민트(틸) 정보 영역과 하단 30% 옐로 액션 영역으로 물결선(wave) 분할하여, \"읽는 정보\"와 \"행동하는 정보(신청방법)\"를 색으로 먼저 구분한다. 사용자는 텍스트를 읽기 전에 색 블록만으로 \"위는 설명, 아래는 연락처\"라는 구조를 인지한다.\n2. **손글씨/수채 질감으로 격식을 낮추고 친근감을 높인다** — 배지 스탬프의 손글씨 폰트, 가장자리 수채화 꽃 일러스트는 딱딱한 교육기관 공지문이 아니라 동네 커뮤니티 모임 같은 따뜻한 톤을 만든다. 본문 고딕 서체의 \"신뢰감\"과 손글씨·수채의 \"친근감\"을 의도적으로 섞는다.\n3. **형광펜·밑줄 하이라이트로 2차 위계를 만든다** — 굵은 고딕 타이틀(1차 위계) 위에, 노란 형광펜 블록(날짜)과 옐로 언더라인(기수명)을 더해 \"날짜·회차명\"이라는 실무적으로 가장 먼저 확인해야 할 정보를 자연스럽게 강조한다. 색상 대비가 아니라 \"마킹 제스처\"로 강조하는 것이 핵심.\n4. **원형 라벨 + 텍스트의 반복 모듈로 스캔 가독성을 확보한다** — 대상/강사/비용/인원 4개 항목을 동일한 크기의 진한 틸 원형 배지 + 고딕 라벨 + 본문 텍스트의 반복 그리드로 배치해, 세로로 훑어볼 때 리듬감 있게 읽히도록 설계한다.\n\n### 1.2 컬러 팔레트 및 그라데이션 공식\n\n| 구분 | 컬러명 | HEX | RGB | 적용 영역 및 역할 |\n|---|---|---|---|---|\n| Primary | 틸 민트 배경 | #7FD4D0 | 127,212,208 | 상단 70% 메인 배경, 전체 톤 결정 |\n| Primary Dark | 딥 틸 그린 | #1F6B63 | 31,107,99 | 원형 라벨 배지 배경, 대상/강사/비용/인원 본문 텍스트 색, 강한 대비 포인트 |\n| Secondary | 선명 옐로 | #F7D417 | 247,212,23 | 하단 웨이브 배경, 배지 스탬프 배경, 날짜 형광펜 블록, 기수명 밑줄 |\n| Neutral | 화이트 | #FFFFFF | 255,255,255 | 메인 타이틀(시간) 텍스트, 밝은 대비 |\n| Accent | 로열 블루 | #3450A3 | 52,80,163 | 기수명(AP Now 12기) 텍스트 컬러 — 틸/옐로 보색 대비 |\n| Accent 2 | 오렌지 코랄 | #E8622C | 232,98,44 | \"신청방법\" 라벨 텍스트, 행동 유도 포인트 |\n| Neutral Dark | 잉크 블랙 | #1A1A1A | 26,26,26 | 하단 신청방법 세부 안내 텍스트(①②③, 연락처) |\n\n**시그니처 웨이브 분할 공식**: 상단 틸(#7FD4D0) 영역이 화면 높이의 약 72%까지 내려오다가, 좌→우로 완만한 2~3개의 봉우리를 가진 유기적 곡선(SVG path, 진폭 ±40px)으로 하단 옐로(#F7D417) 영역과 만난다. 곡선은 좌측이 더 낮고(틸이 더 아래까지) 우측으로 갈수록 약간 솟아오르는 비대칭 구조.\n\n**배지 스탬프 그라데이션/효과**: 옐로(#F7D417) 단색 원 위에 손글씨 텍스트, 원 테두리 없음(플랫 컬러), 살짝 비스듬히 회전(-6°)되어 스탬프처럼 보이는 효과.\n\n**형광펜 하이라이트 오버레이 공식**: 날짜 텍스트 배경에 옐로(#F7D417) 사각 블록을 텍스트보다 살짝 크게(상하 패딩 6px, 좌우 패딩 10px) 깔고, 텍스트는 그 위에 틸 다크(#1F6B63)로 얹는다. 블록은 완전한 직사각형이 아니라 형광펜처럼 끝이 살짝 비정형(라운드 2px).\n\n### 1.3 타이포그래피 시스템\n\n| 위계 요소 | 원본 폰트 | 한글 대체 추천 | 크기 | 굵기·스타일 규칙 |\n|---|---|---|---|---|\n| 배지 스탬프 텍스트 | 손글씨체(붓펜 느낌) | 나눔손글씨 붓, 온글잎 박다현체 | 약 22px (2줄) | 두꺼운 붓터치, -6° 회전, 틸 다크 컬러 |\n| 날짜 (형광펜) | 고딕 Bold | Pretendard Bold / 스포카 한 산스 Bold | 약 26px | Bold, 자간 좁게, 틸 다크 on 옐로 블록 |\n| 메인 타이틀 (시간) | 고딕 Extra Bold | Pretendard ExtraBold / S-Core Dream 7 | 약 56~60px | 극굵게(900 weight급), 화이트, 숫자만 더 크게(1.3배) 강조 |\n| 기수명 (서브타이틀) | 고딕 Medium~Bold | Pretendard SemiBold / 여기어때 잘난체 | 약 40px | 로열블루, 옐로 밑줄(두께 6px) 하단 배치, 중앙 정렬 |\n| 소제목 라벨 (대상/강사/비용/인원) | 고딕 Bold | Pretendard Bold | 약 18px | 원형 배지 안에 화이트 텍스트, 2글자 고정폭 |\n| 본문 리스트 텍스트 | 고딕 Medium~Bold | Pretendard Medium/Bold | 약 24px | 틸 다크, 강사명·비용 숫자 등 핵심어만 Bold 처리 |\n| 신청방법 라벨 | 고딕 Bold, 이탤릭 느낌 | Pretendard Bold | 약 30px | 오렌지 코랄, 앞에 ≫ 화살표 아이콘 동반 |\n| 마이크로 텍스트 (연락처) | 고딕 Regular~Medium | Pretendard Regular | 약 18px | 블랙, 원형 톡 아이콘 + 메일 아이콘과 인라인 배치 |\n\n**교차·중첩 배치 조형 규칙**: 날짜(형광펜)는 메인 타이틀 바로 위, 좌측 정렬에 가깝게 배치하여 타이틀의 시작점과 시각적으로 정렬. 기수명의 옐로 밑줄은 글자 하단 10~15%를 가리도록 겹쳐 그어 \"수기 강조\" 느낌을 낸다. 배지 스탬프는 포스터 최상단 레이어에서 유일하게 회전된 요소로, 평면적인 레이아웃에 입체적 변주를 준다.\n\n## 2. 사진과 그래픽의 조화 원칙\n\n- 이 디자인은 사진 대신 **수채화 일러스트 소재**를 사용하므로, \"피사체 분리\"는 \"꽃·나뭇잎 일러스트의 가장자리 배치\"로 치환된다. 모든 꽃/식물 소재는 **포스터의 네 모서리와 측면 가장자리에만** 배치되고 중앙 텍스트 영역은 완전히 비워 가독성을 확보한다(텍스트 안전 영역 = 좌우 각 15%, 중앙 70% 폭).\n- 수채화 소재는 **반투명 레이어감**(불투명도 85~95%)으로 배경색 위에 자연스럽게 녹아들도록 하며, 경계선에 흰 테두리나 딱딱한 컷아웃 라인을 넣지 않는다.\n- 하단 옐로 영역과 상단 틸 영역 경계를 가로지르는 꽃 장식(좌하단, 우하단)을 배치해 두 색면이 완전히 분리되지 않고 자연스럽게 이어지도록 \"브릿지\" 역할을 시킨다.\n- 가독성 확보 기법: 텍스트 블록 주변 반경 80px 이내에는 장식 소재를 배치하지 않는 \"클리어존\"을 적용하고, 특히 시간/기수명 같은 1차 정보 바로 옆은 완전한 단색 배경을 유지한다.\n\n## 3. 페이지별 구성요소 및 상세 배치 설계도\n\n캔버스 기준: 1080 x 1527px (1:1.414), 좌표는 % 기준.\n\n### [Master 1] 표지 겸 단일 모집카드 (본 디자인의 유형)\n- **레이어 0**: 배경 2단 분할 — 상단 틸(#7FD4D0) 0~72%, 하단 옐로(#F7D417) 72~100%, 경계는 유기적 웨이브 곡선(좌측 낮고 우측 2개 봉우리)\n- **레이어 1**: 가장자리 수채 꽃 장식 — 좌상단(5%,10%, 12%), 우상단(85%,5%, 15%), 좌측중단(0%,45%, 10%), 우측중단(90%,40%, 10%), 좌하단(0%,68%, 18%, 웨이브 경계 걸침), 우하단(80%,65%, 20%, 웨이브 경계 걸침)\n- **레이어 2**: 배지 스탬프 원형 — 좌상단 (5%,3%)~(22%,16%), 지름 약 17% 폭, 옐로 원, -6° 회전, 내부 손글씨 2줄 \"기본/과정\"\n- **레이어 3**: 날짜 형광펜 블록 — 중앙 정렬, y≈18%, 옐로 블록 위 틸 다크 텍스트 \"6/8, 15, 22, 29, 7/6 (총 5회)\"\n- **레이어 4**: 메인 타이틀 — 중앙 정렬, y≈24~34%, 화이트 초대형 고딕 \"화요일 오전 10시-12시\" (숫자 확대)\n- **레이어 5**: 기수명 서브타이틀 — 중앙 정렬, y≈36~42%, 로열블루 \"AP Now 12기\" + 하단 옐로 밑줄\n- **레이어 6**: 정보 리스트 블록 — 좌측 정렬 시작 x≈18%, y≈46%~70%, 4행 반복(원형 라벨 지름 7% + 본문 텍스트), 행간 균등(약 6%)\n  - 대상(y46%) / 강사(y53%) / 비용(y60%) / 인원(y67%)\n- **레이어 7 (하단 옐로)**: \"≫ 신청방법\" 오렌지 코랄, 중앙 정렬 y≈80%\n- **레이어 8 (최상단)**: \"①프로필 신청링크 ②DM ③개인 연락\" + 톡 아이콘+ID + 메일 아이콘+전화번호, y≈87%, 한 줄 인라인\n\n### [Master 2] 목차/시리즈 안내형\n- 레이어 0~1 동일, 상단 배지 대신 \"교육과정 전체안내\" 타이틀 바\n- 중앙에 회차별 원형 라벨 3~4개 세로 스택 + 1줄 요약\n- 하단 옐로 영역은 공통 문의처로 고정\n\n### [Master 3] 간지(섹션 전환)형\n- 배경 동일, 중앙에 대형 손글씨 스탬프 배지만 확대(폭 40%)\n- 꽃 장식은 네 모서리로 더 크게 확장(각 25%)\n- 하단 옐로 영역에 다음 섹션 안내 문구만 소략하게\n\n### [Master 4] 강사 소개형\n- 상단 틸 영역에 원형 프로필 사진(지름 30%, 중앙 상단) + 배지는 사진 우상단에 겹침\n- 그 아래 강사 약력을 Master1 원형 라벨 스타일로 반복\n- 하단 옐로 영역 동일 유지(일관성 앵커)\n\n### [Master 5] 커리큘럼 상세형\n- 상단 틸 영역 좌/우 2컬럼 분할, 회차별 번호 라벨(①~⑤) + 주제 텍스트\n- 날짜 형광펜 블록은 미니 버전으로 각 회차 옆 반복\n- 하단 옐로 영역 동일 유지\n\n### [Master 6] 후기/인증형\n- 상단 틸 영역에 수료증/후기 캡처 카드(흰 배경, 둥근 모서리, 그림자) 1~2개\n- 배지 스탬프를 \"수료후기\" 문구로 교체\n- 꽃 장식·하단 옐로 영역 구조 동일 유지(브랜드 일관성)\n\n## 4. 만능 적용 공식\n\n### 주제별 비주얼 소재 치환 매트릭스\n\n| 원본 요소 | 역할 | 주제 A: 성인 자기계발 모임 | 주제 B: 교회/신앙 소모임 | 주제 C: 직장인 재테크 강의 |\n|---|---|---|---|---|\n| 수채 꽃 장식 | 친근함·테두리 | 책/노트/커피잔 수채 일러스트 | 비둘기/촛불/십자가 수채 일러스트 | 동전/그래프/식물 수채 일러스트 |\n| 손글씨 스탬프 배지 | 과정 단계 표시 | \"입문반\" \"심화반\" | \"새가족반\" \"양육과정\" | \"기초반\" \"실전반\" |\n| 민트 배경 | 차분·신뢰 베이스 | 세이지그린, 라벤더 | 네이비, 딥그린 | 차콜, 다크블루 |\n| 옐로 웨이브 하단 | 행동 유도 영역 | 코랄/피치로 변경 가능 | 골드로 변경 가능 | 민트/틸로 변경 가능 |\n| 로열블루 기수명 | 브랜드 강조색 | 버건디 | 와인레드 | 딥그린 |\n| 원형 라벨(대상/강사/비용/인원) | 핵심정보 스캔 모듈 | 대상/멘토/참가비/정원 | 대상/인도자/헌금/정원 | 대상/강사/수강료/정원 |\n\n### 복사해서 쓰는 스타일 고정 프롬프트\n\n```\n포스터 비율: 1080x1527px (세로형, 1:1.414)\n\n배경: 상단 70~72%는 민트 틸(#7FD4D0) 단색, 하단 28~30%는 선명 옐로(#F7D417) 단색.\n두 색면 경계는 직선이 아니라 좌측이 낮고 우측에 2개의 완만한 봉우리가 있는\n유기적 웨이브 곡선으로 자연스럽게 분할한다.\n\n장식: 가장자리(좌상단, 우상단, 좌우 측면, 좌하단/우하단 웨이브 경계)에만\n수채화 꽃/식물 일러스트를 반투명(불투명도 85~95%)으로 배치. 중앙 70% 텍스트\n영역에는 어떤 장식도 넣지 않는다.\n\n좌상단: 지름 포스터 폭의 17%인 옐로(#F7D417) 원형 배지, -6도 회전,\n내부에 손글씨체 2줄 텍스트(과정 단계명), 딥틸(#1F6B63) 컬러.\n\n상단 중앙: 날짜/일정 텍스트를 옐로(#F7D417) 형광펜 블록 위에 딥틸(#1F6B63)\n고딕 Bold로 배치.\n\n그 아래: 초대형 화이트 고딕 Extra Bold 메인 타이틀(핵심 시간/일시),\n숫자 부분만 1.3배 확대.\n\n그 아래: 로열블루(#3450A3) 서브타이틀(프로그램/기수명), 하단에 옐로\n밑줄(두께 6px)이 글자 하단을 살짝 덮도록 배치.\n\n중앙 정보 리스트: 지름 7% 딥틸(#1F6B63) 원형 라벨(2글자 화이트 텍스트) +\n딥틸 Bold 본문 텍스트로 구성된 4개 행을 균등 간격으로 세로 반복 배치.\n\n하단 옐로 영역: 오렌지코랄(#E8622C) \"≫ 신청방법\" 라벨 + 블랙 고딕 Regular로\n신청 단계 안내(번호 매기기) + 원형 메신저 아이콘과 메일 아이콘을 인라인 배치.\n\n전체 톤: 따뜻하고 신뢰감 있는 커뮤니티 모임 느낌, 손글씨+수채화+강한\n고딕 볼드의 대비로 격식과 친근함을 동시에 전달.\n```","previewUrl":"https://hopedesign.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fa1afbe50-135e-4419-8434-9fc398412eab%2FUntitled.png?table=block&id=610931f1-7426-4fa0-aabd-fae80dd6eabb&cache=v2","source":{"type":"url","url":"https://hopedesign.notion.site/4a681baec0a248faaf9681e044c22b6f"},"tokens":{"primary":"#7FD4D0","secondary":"#F7D417","bg":"#7FD4D0","text":"#1F6B63","font":"sans"}},
  {"id":"url-notion-poster-e","part":"poster","layout":"neon","name":"북콘서트 골드마스크 블루포스터","ref":"노션 캡처에서 복제: 북클럽광고","guide":"1. **단색 배경 + 포인트 레이어링** — 배경 전체를 하나의 딥 로열블루로 통일해 '신뢰감 있는 기관 행사'라는 톤을 깔고, 그 위에 골드 사진 텍스처·옐로 바·하늘색 말풍선 등 채도 높은 포인트를 레이어로 얹어 시선 동선을 만든다. 배경이 단색이므로 어떤 포인트 컬러를 올려도 충","guideMd":"# 디자인 가이드 — KWMA 미션북클럽 북콘서트 포스터\n\n## 1. 전체 디자인 시스템\n\n### 1.1 핵심 디자인 철학\n\n1. **단색 배경 + 포인트 레이어링** — 배경 전체를 하나의 딥 로열블루로 통일해 '신뢰감 있는 기관 행사'라는 톤을 깔고, 그 위에 골드 사진 텍스처·옐로 바·하늘색 말풍선 등 채도 높은 포인트를 레이어로 얹어 시선 동선을 만든다. 배경이 단색이므로 어떤 포인트 컬러를 올려도 충돌 없이 떠 보인다.\n2. **사진을 '텍스트 마스크'로 쓰는 대비 모티프** — 타이틀 첫 글자(또는 일부 글자)를 콘서트 군중 사진으로 마스킹하고, 나머지 글자는 흰색 입체(엠보싱) 처리해 두 질감(사진 텍스처 vs 솔리드 화이트)을 한 단어 안에서 교차시킨다. 이것이 이 포스터의 시그니처 장치다.\n3. **상단 비주얼 임팩트 → 하단 정보 그리드의 수직 위계** — 포스터 상단 60%는 감성/비주얼(타이틀, 책, 말풍선)에 할애하고, 하단 40%는 가는 흰 선으로만 구획한 식순 리스트로 전환한다. 화려함과 가독성을 위아래로 분리한 2단 구성.\n4. **여백 대신 '호흡선'으로 구획** — 섹션 간 간격을 큰 여백보다 1px 흰 가로선(divider)으로 처리해, 좁은 세로 포스터 안에서도 많은 정보(8개 항목)를 답답하지 않게 욱여넣는다.\n\n### 1.2 컬러 팔레트 및 그라데이션 공식\n\n| 구분 | 컬러명 | HEX | RGB | 적용 영역 및 역할 |\n|---|---|---|---|---|\n| Primary | 딥 로열블루 | #17227E | 23,34,126 | 전체 배경 단색, 브랜드 베이스 톤 |\n| Secondary | 골드 옐로 | #F0C93A | 240,201,58 | 부제 바 텍스트, 타이틀 사진마스크 보정색, 숫자 포인트 |\n| Accent | 스카이블루 (그라데이션) | 상단 #7FD4F0 → 하단 #2E9FD6 | 127,212,240 → 46,159,214 | 정보 안내 말풍선 카드 배경 |\n| Neutral-Light | 화이트 | #FFFFFF | 255,255,255 | 본문 텍스트, 입체 타이틀 글자, 구분선, 식순 볼드 헤더 |\n| Neutral-Warm | 북커버 크림 | #EFE6C8 | 239,230,200 | 실물 책 표지 배경색 |\n| Support | 소프트 네이비 텍스트 | #CBD6F2 | 203,214,242 | 식순 설명(서브) 텍스트, 저채도 보조 정보 |\n\n**시그니처 그라데이션 공식 (정보 말풍선)**\n- 각도: 135° (좌상 → 우하), 또는 단순 수직 180°\n- 시작색: #7FD4F0 (10% 지점) → 끝색: #2E9FD6 (90% 지점)\n- 말풍선 꼬리(tail)는 좌측 하단으로 뾰족하게 뻗어 책 이미지를 가리키도록 배치 — 정보와 실물 오브젝트를 시각적으로 연결하는 역할\n\n**오버레이 공식 (타이틀 사진 마스크)**\n- 콘서트 군중 사진(골드~앰버 톤, 조명 플레어 포함) 위에 `blend-mode: normal` + 텍스트 클리핑마스크\n- 사진 자체에 다시 그라데이션 오버레이: `rgba(240,201,58,0.15) → rgba(23,34,126,0.25)` 를 얹어 배경 블루와 톤을 맞춘다\n- 마스킹되지 않은 나머지 글자는 흰색 + 하단 쪽 그림자(`drop-shadow: 2-4px blue-black, blur 0`)로 입체감(엠보싱) 부여\n\n### 1.3 타이포그래피 시스템\n\n| 위계 요소 | 원본 폰트(추정) | 한글 대체 추천 | 크기(세로 1:1.414 기준 폭 대비 %) | 굵기·스타일 규칙 |\n|---|---|---|---|---|\n| 메인 타이틀 (북콘서트) | 두꺼운 고딕(스텐실/각진 임팩트체) | Black Han Sans, 여기어때 잘난체, Gmarket Sans Bold | 포스터 폭의 85~95%, 2줄 합산 높이 약 18% | Bold~Black, 자간 -2~-4%, 일부 글자 사진 마스킹 + 일부 글자 흰색 입체(엠보싱 그림자) |\n| 상단 소속 라벨 (KWMA 미션북클럽) | 고딕 Bold | Pretendard Bold, Noto Sans KR Bold | 폭의 45% | White, Bold, 자간 0, 타이틀 우측 상단에 수평 정렬 |\n| 부제 (부제: 북클럽, 모임에서…) | 고딕 SemiBold | Pretendard SemiBold | 폭의 70% | 골드색, Bold, 콜론 앞뒤 공백으로 리듬 생성, 가운데 정렬 |\n| 정보카드 소제목 (일시/줌링크) | 고딕 Bold | Pretendard Bold | 본문 대비 110% | White Bold, 콜론 기준 숫자만 더 큰 포인트 크기(140%)로 강조 |\n| 식순 번호+헤드라인 (1.~8.) | 고딕 Bold | Pretendard Bold | 본문 대비 115% | White Bold, \"숫자.\" 뒤 헤드라인 단어(인사말/격려사 등)만 볼드, 뒤따르는 발표자명은 Medium |\n| 식순 설명(직함/소속) | 고딕 Regular/Light | Pretendard Regular | 본문 기준 100%(가장 작은 단위) | 연한 블루 화이트(#CBD6F2), Regular, 발표자명 아래 들여쓰기 없이 좌측 정렬 유지 |\n\n**교차·중첩 배치 조형 규칙**\n- 타이틀 상단에 책을 펼친 듯한 얇은 흰색 아웃라인 브래킷(사각 괄호+중앙 세로선)을 배치해 \"북(Book)\"을 상징 — 순수 라인 아트, 채움 없음, stroke 2~3px\n- 책 표지 2권은 10~15° 반시계 기울기로 겹쳐(뒤 책 살짝 더 기울고 어둡게) 입체감 연출, 그림자는 하단에 soft blur\n- 정보 말풍선은 책 더미와 1/3 겹치도록 우측에 배치해 \"책 → 정보\"로 시선이 흐르게 함\n- 식순 리스트는 번호 들여쓰기 없이 좌측 정렬, 하위 항목(5번의 토크쇼 발표자 2인 등)만 불릿(•)과 함께 추가 들여쓰기\n\n## 2. 사진과 그래픽의 조화 원칙\n\n- **피사체 분리**: 책 사진은 배경을 완전히 제거(누끼)한 뒤 단색 배경 위에 자체 그림자만 추가 — 배경과 피사체 경계가 깨끗해야 \"오브젝트가 떠 있는\" 느낌이 산다.\n- **텍스트 마스킹용 사진은 고대비·고채도 텍스처로 선택**: 콘서트 조명/군중처럼 입자감 있고 밝은 톤의 사진이어야 글자 획 안에서도 패턴이 읽힌다. 저대비 사진은 마스킹 시 밋밋해진다.\n- **오버레이로 톤 통일**: 마스킹에 쓰는 사진은 반드시 배경색 계열(블루 또는 보색인 골드)로 색보정 오버레이를 얹어 포스터 전체 팔레트에서 튀지 않게 한다.\n- **가독성 확보 더블 레이어**: 사진 마스킹 글자 + 솔리드 화이트 입체 글자를 같은 단어 안에서 섞을 때, 흰 글자 쪽에 짙은 네이비 그림자(1~2px, blur 0)를 넣어 배경과 분리하고 두 질감 사이의 명도 균형을 맞춘다.\n- **정보성 카드는 절대 사진 위에 얹지 않는다**: 줌링크·ID·PW 등 실용 정보는 단색/그라데이션 말풍선 안에만 배치해 어떤 상황에서도 100% 가독되게 한다.\n\n## 3. 페이지별 구성요소 및 상세 배치 설계도\n\n포스터 1장 구성이므로 \"Master\"는 영역별 섹션으로 구분한다 (전체 세로 1000 기준 좌표, 폭 100 기준 %).\n\n**[Master 1] 헤더 — 소속/상징 아이콘 영역 (Y: 0~9%)**\n- 중앙 상단에 흰색 아웃라인 책 모양 브래킷 아이콘 (폭 60%, 높이 포스터의 4%), stroke only, z-index 최상위\n\n**[Master 2] 메인 타이틀 블록 (Y: 9~34%)**\n- Row 1 (Y 9~16%): 좌측에 사진마스킹 큰 글자 1자(폭 20%) + 우측 \"KWMA 미션북클럽\" 흰 볼드 텍스트(폭 65%), 베이스라인 정렬\n- Row 2 (Y 16~28%): \"콘서트\" 전체 폭 사용, 가운데 정렬, 앞부분 1~2글자는 사진마스킹 유지 + 뒷부분은 흰 입체 글자, 폰트 크기 포스터 최대\n- Row 3 (Y 30~34%): 부제 바, 골드 텍스트, 가운데 정렬, 폭 80%\n\n**[Master 3] 비주얼 중앙 영역 — 책 + 정보카드 (Y: 36~62%)**\n- 좌측(X 10~55%, Y 36~62%): 책 표지 2권, 10~15° 기울기로 겹침, 그림자 하단 soft\n- 우측(X 50~95%, Y 40~58%): 하늘색 그라데이션 말풍선, 모서리 radius 큰 라운드 사각형 + 좌하단 꼬리, 내부 2단 구성(상단: 일시 — 날짜/시간 대형 숫자 포인트, 중단: 얇은 구분선, 하단: 줌링크 — 회의ID/Password 리스트형)\n\n**[Master 4] 진행자 안내 바 (Y: 63~66%)**\n- 전체 폭, 상단 흰 구분선 1px, \"진행\" 볼드 + 이름/직함 한 줄, 좌측 정렬\n\n**[Master 5] 식순 리스트 1~8 (Y: 66~98%)**\n- 각 항목은 상단 흰 구분선(1px, 폭 90%, 가운데 정렬)으로 시작\n- 항목 구조: `번호. 헤드라인(Bold, White)` + 같은 줄 우측에 발표자명(Medium) → 다음 줄에 들여쓰기 없이 소속/직함(Light, Soft Blue, 작은 폰트)\n- 항목 간 세로 패딩은 내용 줄 수에 비례(1줄 항목은 좁게, 2~3줄 하위 항목 있는 5번 항목은 넓게)\n- 5번처럼 하위 발표자가 2명 이상이면 불릿(•)으로 추가 들여쓰기한 서브 블록을 만들고, 서브 블록 사이에도 옅은 구분선 또는 여백만 적용(진한 선 사용 안 함)\n- 마지막 항목(8번) 아래 두꺼운 흰 가로선으로 전체 포스터 마감\n\n**[Master 6] 공통 그리드 규칙**\n- 좌우 안전 마진: 포스터 폭의 8%\n- 구분선은 항상 마진 안쪽 폭 90%로 통일\n- 번호(1~8)는 항상 좌측 정렬 시작점 고정, 헤드라인과 동일 베이스라인\n\n## 4. 만능 적용 공식\n\n### 주제별 비주얼 소재 치환 매트릭스\n\n| 포스터 요소 | 북콘서트(원본) | 음악 콘서트 | 세미나/강연회 | 전시/페스티벌 |\n|---|---|---|---|---|\n| 배경 단색 | 로열블루 | 딥퍼플/버건디 | 네이비/차콜 | 블랙/딥그린 |\n| 마스킹 사진 소재 | 콘서트 조명/군중 | 밴드 공연/악기 조명 | 강단 조명/청중 실루엣 | 전시장 조명/작품 디테일 |\n| 실물 오브젝트 | 책 표지 2권 | 음반/티켓/악보 | 발표자료/명함 | 작품 이미지/도록 |\n| 정보 말풍선 색 | 스카이블루 그라데이션 | 핑크~마젠타 그라데이션 | 민트~그린 그라데이션 | 옐로~오렌지 그라데이션 |\n| 부제 포인트 컬러 | 골드 | 네온 옐로 | 라임 그린 | 코랄 오렌지 |\n| 하단 정보 구조 | 식순 1~8 | 공연 순서/세트리스트 | 세션 타임테이블 | 부스/전시 안내 |\n\n### 복사해서 쓰는 스타일 고정 프롬프트\n\n```\n딥 로열블루(#17227E) 단색 배경의 세로형(1:1.414) 행사 포스터.\n상단에는 얇은 흰색 아웃라인 책 모양 브래킷 아이콘.\n메인 타이틀은 2줄 초대형 고딕 Black체: 일부 글자는 [콘서트/행사 분위기에 맞는 조명/군중 텍스처 사진]으로 텍스트 마스킹 처리(사진 위에 배경색과 어울리는 톤 보정 오버레이 포함),\n나머지 글자는 순백색 + 하단 짙은 네이비 그림자로 입체(엠보싱) 처리.\n타이틀 아래 옐로(#F0C93A) 볼드 고딕 부제 한 줄, 가운데 정렬.\n중앙에는 [실물 오브젝트 2개]를 10~15도 기울여 겹쳐 배치(배경 제거, 하단 soft shadow),\n오브젝트 우측에 겹치도록 하늘색 그라데이션(#7FD4F0→#2E9FD6) 말풍선 카드(좌하단 꼬리) 배치,\n카드 안에는 일시/장소/접속정보를 흰색 볼드+숫자 강조로 2단 구성.\n하단 40%는 전체 폭 90%의 가는 흰색(1px) 가로 구분선으로 섹션을 나눈 리스트형 식순:\n각 항목은 \"번호. 헤드라인(볼드 화이트)  발표자명\" + 아래 줄에 작은 연한 블루화이트(#CBD6F2)로 소속/직함.\n폰트는 Pretendard/Noto Sans KR 계열 고딕, 전체적으로 여백보다 구분선 중심의 조밀한 정보 그리드.\n사진은 절대 정보 텍스트 위에 겹치지 않게 유지. 입체감·광택·대비를 살린 공식 행사 포스터 톤.\n```","previewUrl":"https://hopedesign.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fe338167d-d98a-4246-917f-066bed33d370%2FUntitled.png?table=block&id=2c5fcb17-821c-4b31-9f71-45f5a302c0e0&cache=v2","source":{"type":"url","url":"https://hopedesign.notion.site/2ea8208ab1724df387a0ab500d83eb7d"},"tokens":{"primary":"#17227E","secondary":"#F0C93A","bg":"#17227E","text":"#FFFFFF","font":"sans"}},
  {"id":"url-notion-poster-f","part":"poster","layout":"bigtypo","name":"스타훈련교사 선발 공고형 포스터","ref":"노션 캡처에서 복제: 스타훈련교사 선발","guide":"파일 쓰기 권한이 거부되어 저장은 못했지만, 분석한 디자인 가이드 전체 내용을 아래에 바로 출력합니다.","guideMd":"파일 쓰기 권한이 거부되어 저장은 못했지만, 분석한 디자인 가이드 전체 내용을 아래에 바로 출력합니다.\n\n# 디자인 가이드 — 2024 스타훈련교사 선발 (관공서 공고형 포스터)\n\n## 1. 전체 디자인 시스템\n\n### 1.1 핵심 디자인 철학\n\n1. **모노톤 라벤더-페리윙클 베이스 + 단일 포인트 컬러**: 배경을 하나의 연보라-블루 계열 단색으로 통일해 \"관공서 공식 문서\"다운 차분함을 주고, 타이틀/슬로건에만 입체(엠보싱) 블루를 집중 배치해 시선을 유도한다.\n2. **화이트 입체 아웃라인 타이포**: 메인 타이틀과 하단 슬로건은 흰색 두꺼운 외곽선 + 파란 입체(3D 돌출/그림자) 텍스트로 처리해 눈에 띄는 헤드라인 임팩트를 만든다.\n3. **네이비 라벨 칩 + 화이트 카드로 정보 구획화**: 본문 내용을 흰색 라운드 박스/네이비 칩 라벨로 끊어 섹션을 명확히 나눈다.\n4. **쉐브론(화살표) 연결형 타임라인**: 선발일정처럼 순차적 프로세스는 우측으로 진행하는 화살표 모양 도형을 이어 붙여 단계 진행을 암시한다.\n5. **레이어 깊이감**: 배경(단색) → 콘텐츠 카드(화이트) → 입체 타이틀(최상위) → 플랫 일러스트 인물(하단 장식) 순으로 명확한 층위를 형성한다.\n\n### 1.2 컬러 팔레트 및 그라데이션 공식\n\n| 구분 | 컬러명 | HEX | RGB | 적용 영역 및 역할 |\n|---|---|---|---|---|\n| Primary | 딥 로열블루 | #2438A8 | 36,56,168 | 메인 타이틀·슬로건 입체 텍스트 채움, 쉐브론 진한 톤 |\n| Primary Dark | 네이비 | #1A2560 | 26,37,96 | 섹션 라벨 칩 배경, 본문 텍스트, 아이콘 라인 |\n| Secondary | 스카이블루 | #9FB4EF | 159,180,239 | 쉐브론 밝은 톤(교차 단계), 인물 의상 포인트 |\n| Background | 라벤더 페리윙클 | #C7CCEA | 199,204,234 | 포스터 전체 배경(단색) |\n| Neutral(White) | 화이트 | #FFFFFF | 255,255,255 | 안내문 카드, 타이틀 외곽선, 하단 로고 띠 |\n| Accent | 스파클 화이트-블루 | #E8ECFB | 232,236,251 | 타이틀 주변 반짝임 장식, 디바이더 포인트 |\n| Illustration Skin | 스킨톤 | #F2C9A0 | 242,201,160 | 일러스트 인물 피부 (유일한 팔레트 이탈 색) |\n\n- **입체 텍스트 공식**: 흰 외곽선(6~10px) → 로열블루(#2438A8) 채움 → 우하단 45도 방향 2~4px 간격 하드엣지 그림자 3~4겹(#16215C). Extra Bold~Black, 직립형.\n- 배경은 완전 단색(#C7CCEA) 원칙. 필요 시 상→하 5% 이내 미세 그라데이션만 허용.\n- **오버레이 공식**: 화이트 카드는 불투명(#FFFFFF, radius 16~20px), 그림자는 거의 없음(0 2px 6px rgba(20,30,90,0.08)).\n\n### 1.3 타이포그래피 시스템\n\n| 위계 요소 | 원본 폰트(추정) | 한글 대체 추천 | 크기(폭900px 기준) | 굵기·스타일 규칙 |\n|---|---|---|---|---|\n| 메인 타이틀 | 잘난체 계열 두꺼운 라운드 고딕 | Jalnan 2 / Black Han Sans | 56~64px | Extra Bold, 흰 외곽선+블루 입체, 자간 -1~0%, 1줄 |\n| 서브카피(안내문) | Noto Sans KR Medium | Pretendard Medium | 18~20px | Medium, 네이비, 중앙정렬, 줄간격 160% |\n| 섹션 라벨 칩 | 본고딕 Bold | Pretendard Bold | 16~18px | Bold, 흰 텍스트 on 네이비 칩 |\n| 본문 리스트 | 본고딕 Regular | Pretendard Regular | 15~16px | Regular, 네이비, 좌측정렬, 줄간격 150% |\n| 타임라인 날짜 | 본고딕 Bold | Pretendard ExtraBold | 20~22px | Bold, 네이비, 중앙정렬 |\n| 타임라인 단계명 | 본고딕 Bold | Pretendard Bold | 16~17px | Bold, 네이비, 중앙정렬 |\n| 마이크로 텍스트(각주) | 본고딕 Regular | Pretendard Regular | 12~13px | Regular, 회색빛 네이비(#4A5590) |\n| 슬로건 1줄 | 잘난체 계열 | Jalnan 2 | 28~30px | Bold, 화이트 단색(입체 없음) |\n| 슬로건 2줄(입체) | 잘난체 계열 | Jalnan 2 | 40~46px | Extra Bold, 흰 외곽선+블루 입체, 보조문구 병기 |\n\n**교차·중첩 배치 규칙**: 메인 타이틀과 하단 슬로건에 동일한 입체 엠보싱 처리를 양 끝단에 배치해 수미상관 구조를 만든다. 일러스트 인물 그룹은 접수방법 텍스트와 가로로 겹치듯 배치해 대각선 교차 비대칭 레이아웃을 형성한다. 섹션 라벨 칩은 항상 본문보다 먼저 좌측 상단에 돌출 배치.\n\n## 2. 사진과 그래픽의 조화 원칙\n\n- **피사체 분리**: 일러스트는 배경과 유사한 블루 톤 의상으로 그려 자연스럽게 녹아들게 하되, 스킨톤과 흰 셔츠만 밝게 남겨 최소 대비 확보.\n- **마스킹 없는 플랫 일러스트**: 벡터 일러스트라 별도 누끼 불필요.\n- **오버레이 최소화**: 텍스트와 일러스트 영역은 공간 분리, 겹칠 경우 흰 반투명 박스로 보호.\n- **가독성 확보**: 모든 텍스트는 라벤더 배경 위 네이비 또는 흰 박스 위 네이비로 대비 4.5:1 이상. 입체 타이틀은 흰 외곽선으로 배경 변화에도 가독성 유지.\n- **아이콘 통일감**: 타임라인 아이콘은 단색 라인 아이콘, 흰 원형 배지 안에 평면적으로 배치.\n\n## 3. 페이지별 구성요소 및 상세 배치 설계도\n\n> 좌표는 포스터 전체 폭 900px × 높이 1273px(1:1.414) 기준 추정치.\n\n### [Master 1] 헤더/타이틀\n- 배경 전체 라벤더(#C7CCEA)\n- 메인 타이틀: x40~860, y40~130, 가로 중앙정렬\n- 스파클 장식: 좌상단(40,30)·우상단(850,40), 12~16px\n- 디바이더: y155, 가로 화이트 라인 + 다이아몬드 포인트 3개\n- 레이어: 배경 → 디바이더 → 스파클 → 타이틀\n\n### [Master 2] 안내문 카드\n- x40~860, y190~310, 흰색 라운드 박스(radius 18px)\n- 내부 3줄 중앙정렬 본문, 네이비, 패딩 상하24/좌우32px\n\n### [Master 3] 2열 정보 블록\n- 좌: 신청요건 칩(x40,y335,110×28) + 본문(y375~480) + 선발인원 칩(y500,100×28)\n- 우: 특전 칩(x450,y335,160×28) + 리스트 5줄(y375~520)\n- 레이어: 배경 → 네이비 칩 → 본문\n\n### [Master 4] 선발일정 타임라인\n- 선발일정 칩(x40,y600,100×28)\n- 쉐브론 4개(y640~800, 각 폭 약200px, 꼬리 겹침 15~20px)\n  1. 서류접수: 모니터+돋보기 아이콘, \"8.12.(월)~9.4.(수)\"\n  2. 서류전형 발표: 클립보드+체크, \"10.11.(금)\"\n  3. 면접심사: 사람+서류, \"10월~11월 중\"\n  4. 최종 선발자 발표: 발표자+보드, \"12월 중\"\n- 쉐브론 교차 배색(네이비/스카이블루), 흰 배지+아이콘, 각주(y810)\n- 레이어: 배경 → 쉐브론 → 배지+아이콘 → 텍스트\n\n### [Master 5] 접수방법+일러스트\n- 접수방법 칩(x40,y840,170×28), 텍스트(x40~500,y880~960)\n- 일러스트(x500~860,y850~1120): 4~5인 그룹, 돋보기/체크리스트/메가폰 소품\n- 스파클 장식 2~3개\n- 레이어: 배경 → 텍스트 → 일러스트(영역 분리)\n\n### [Master 6] 클로징+로고 푸터\n- 별 장식(x40,y1130)\n- 슬로건1(x40,y1160) 흰 볼드\n- 슬로건2(x40,y1195~1240) 입체 대형 + 보조 마감일시 텍스트\n- 하단 로고 띠(y1245~1273, 전체폭 흰 배경): 고용노동부/한국기술교육대학교/KOREA TECH 능력개발교육원 3개 로고 균등 배분\n- 레이어: 배경 → 슬로건 → 흰 로고 띠(최하단)\n\n## 4. 만능 적용 공식\n\n### 주제별 비주얼 소재 치환 매트릭스\n\n| 요소 | 본 디자인 | 공모전 | 채용/모집 | 행사/캠페인 |\n|---|---|---|---|---|\n| 메인 타이틀 | 2024 스타훈련교사 선발 | 2024 아이디어 공모전 | 2024 신입사원 채용 | 2024 안전캠페인 |\n| 신청요건 내용 | 훈련시설 근무 조건 | 참가자격 | 지원자격 | 참여대상 |\n| 특전 리스트 | 표창장/위촉패/가점 | 상금/상장 | 처우/복지 | 기념품/인증서 |\n| 타임라인 단계 | 접수→발표→면접→최종 | 접수→심사→발표→시상 | 서류→면접→합격 | 모집→진행→결과 |\n| 일러스트 포즈 | 돋보기/체크리스트/메가폰 | 전구 들고 토론 | 서류 든 지원자 | 깃발 든 시민 |\n| 클로징 슬로건 | 최고의 강���에 도전하라! | 당신의 아이디어가 미래다! | 우리와 함께 성장하라! | 함께 만드는 안전한 사회! |\n\n### 복사해서 쓰는 스타일 고정 프롬프트\n\n```\n배경: 단색 라벤더-페리윙클(#C7CCEA) 풀페이지, 그라데이션 없음. 세로형 1:1.414.\n\n타이틀: 상단에 흰 두꺼운 외곽선+로열블루(#2438A8) 입체 텍스트로\n\"{연도} {사업명}\"을 Extra Bold 라운드 고딕체로. 우하단 하드엣지 그림자 3~4겹.\n주변 흰 스파클 2~3개. 아래 흰 디바이더 라인(다이아몬드 포인트 포함).\n\n안내문: 흰 라운드 박스(radius18px) 안에 네이비(#1A2560) 중앙정렬 본문 3줄.\n\n정보 블록: \"{섹션명}\" 네이비 라운드 칩을 좌상단에, 아래 네이비 좌측정렬 리스트.\n\n타임라인: 칩 아래 우측 진행형 쉐브론 3~4개, 네이비/스카이블루(#9FB4EF) 교차.\n각 쉐브론에 흰 원형 배지+네이비 아이콘, 볼드 날짜, 볼드 단계명. 하단 각주 한 줄.\n\n일러스트: 우측 하단 플랫 벡터 인물 그룹, 블루 톤 의상+스킨톤, 상징 소품.\n\n클로징: 최하단 흰 볼드 슬로건 + 메인 타이틀과 동일 입체 스타일 마감 문구.\n\n푸터: 최하단 흰 가로 띠 위에 주최/협력 로고 2~3개 균등 배분.\n\n톤: 라벤더/네이비/로열블루/화이트 4색 중심, 장식은 최소화.\n```","previewUrl":"https://hopedesign.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F30521cb2-324e-4887-ac71-65672eb8cc09%2F942dc706-1d96-4101-b2e5-8c28a4144fc9%2FUntitled.png?table=block&id=8c1d76a4-822e-434c-84ad-69b01825f07c&cache=v2","source":{"type":"url","url":"https://hopedesign.notion.site/6844f529699a46fbb6383335c0a3e73a"},"tokens":{"primary":"#2438A8","secondary":"#9FB4EF","bg":"#C7CCEA","text":"#1A2560","font":"sans"}},
  {"id":"url-notion-landing-a","part":"landing","layout":"story","name":"S.L.U.S 모카 브랜딩","ref":"노션 캡처에서 복제: ","guide":"파일 쓰기 권한이 없어 바로 아래에 결과물을 출력합니다.","guideMd":"파일 쓰기 권한이 없어 바로 아래에 결과물을 출력합니다.\n\n# 디자인 가이드 — S.L.U.S 모카 브랜딩 세일즈 카드뉴스\n\n## 1. 전체 디자인 시스템\n\n### 1.1 핵심 디자인 철학\n\n1. **따뜻한 모노톤 대비** — 전체를 모카브라운·베이지 한 가족 색으로 통일하되, 페이지마다 \"라이트(베이지 바탕)\"와 \"다크(브라운 바탕)\"를 교차시켜 리듬을 만든다. 색상 수를 늘리지 않고 명도 대비만으로 위계를 구분하는 절제된 톤온톤 전략.\n2. **아날로그 레이어 질감** — 대리석 얼룩 텍스처 + 식물 그림자(나뭇잎 실루엣)를 배경에 저채도·저대비로 깔아, 플랫한 디지털 배경이 아니라 \"빛이 비치는 실제 공간\"처럼 보이게 한다. 텍스처는 절대 전경 텍스트보다 진하지 않아야 한다.\n3. **손으로 붙인 듯한 레이어 깊이감** — 폴라로이드 사진 + 마스킹테이프라는 아날로그 오브젝트를 비스듬히 배치해 \"디자인된 느낌\"보다 \"다이어리에 붙여놓은 느낌\"을 연출. 그림자(drop-shadow)로 사진이 배경 위에 떠 있는 레이어감을 강조한다.\n4. **세리프 인용구 vs 고딕 정보, 역할 분리** — 감성·메시지를 전달하는 헤드라인은 세리프체 큰따옴표 인용 형식으로, 사실·안내·리스트 정보는 고딕(산세리프) 굵은 글씨로 명확히 역할을 나눈다. 같은 화면 안에서 \"울림\"과 \"전달\"을 분리하는 것이 이 디자인의 핵심 조형 규칙.\n\n### 1.2 컬러 팔레트 및 그라데이션 공식\n\n| 구분 | 컬러명 | HEX | RGB | 적용 영역 및 역할 |\n|---|---|---|---|---|\n| Primary (Dark) | 모카 브라운 | #8A6A5B | 138,106,91 | 다크 슬라이드 배경(간지/안내 페이지), 라이트 슬라이드의 헤드라인 텍스트 컬러 |\n| Primary (Light) | 웜 베이지 | #DCCFC3 | 220,207,195 | 메인 카드형 슬라이드 배경(프로필/본문), 대리석 텍스처 바탕색 |\n| Secondary | 더스티 로즈 (마스킹테이프) | #C9A39A | 201,163,154 | 마스킹테이프, 포인트 라인, 소제목 박스 테두리에 쓰는 보조 악센트 |\n| Neutral | 아이보리 화이트 | #F7F3EE | 247,243,238 | 폴라로이드 사진 프레임, 캡션 카드 배경, 다크 슬라이드 위의 본문/제목 텍스트 |\n| Neutral Dark | 카카오 다크브라운 | #4A362C | 74,54,44 | 캡션 카드 안의 이름/타이틀 텍스트, 로고 텍스트 보조색 |\n| Accent | 소프트 그레이베이지 (도트/비활성) | #B9ACA0 | 185,172,160 | 상단 페이지네이션 도트 비활성 상태, 미세 구분선 |\n| Accent (Active) | 크림 화이트 (도트 활성) | #FFFFFF / #F2EDE6 | 255,255,255 | 페이지네이션 도트 활성 상태(다크 배경), 또는 Primary Dark(라이트 배경 위 활성 도트) |\n\n**시그니처 그라데이션 공식**\n- 배경 텍스처 오버레이: `linear-gradient(160deg, rgba(220,207,195,1) 0%, rgba(200,181,165,0.85) 55%, rgba(184,160,142,0.9) 100%)` — 좌상단에서 우하단으로 살짝 어두워지는 대각선 그라데이션, 그 위에 대리석/잎사귀 텍스처 이미지를 `multiply` 또는 `soft-light` 블렌드 모드 opacity 25~35%로 합성.\n- 다크 슬라이드 배경: `linear-gradient(135deg, #9C7E6E 0%, #7E6353 60%, #6B5245 100%)` 위에 같은 텍스처를 `multiply` opacity 15~20%로 더 은은하게.\n- 사진 하단 캡션 카드: 순수 화이트(#F7F3EE) 솔리드, 그라데이션 없음 — 사진의 질감과 대비시켜 \"라벨\" 느낌을 주는 의도적 flat 처리.\n- 그림자 오버레이 공식(잎사귀 섀도): 배경 전체에 opacity 10~15%의 짙은 브라운(#3E2E24) 식물 실루엣을 `multiply` 블렌드로 랜덤 배치, 빛이 측면에서 들어오는 것처럼 좌상단은 연하게 우하단은 진하게.\n\n### 1.3 타이포그래피 시스템\n\n| 위계 요소 | 원본 폰트(추정) | 한글 대체 추천 | 크기 | 굵기·스타일 규칙 |\n|---|---|---|---|---|\n| 메인 타이틀(인용 헤드라인) | Serif (Noto Serif KR 계열) | **Noto Serif KR Bold** 또는 **리코체 Bold** | 32~38px (모바일 카드 500×500 기준) | Bold, 큰따옴표(\" \") 직접 타이핑하여 양끝에 배치, 2~3줄로 짧게 끊어 세로 리듬 줄바꿈(의미 단위가 아니라 한 줄 7~9자 내외로 강제 개행), 행간 1.3~1.4, 자간 -2% |\n| 로고 워드마크 | Sans-serif 레터스페이싱형 | **Pretendard Medium** + letter-spacing 확장 | 14~16px | 알파벳 사이 점(S.L.U.S)으로 구분, 대문자, 자간 +15~20%, 항상 좌상단 고정 |\n| 소제목(Selling Point 라벨) | Serif Italic | **Noto Serif KR + 이탤릭 대체 처리** | 18~20px | 가는 실선(1px) 사각 박스 안에 배치, 박스 상단 왼쪽에 짧은 가로선(ㅡ) 장식, 박스는 텍스트보다 여유있는 패딩(상하 24px 좌우 20px) |\n| 본문 소제목(어떠한 멘트보다 중요한 것 등) | Sans-serif Bold | **Pretendard SemiBold** | 16~17px | 중앙 정렬, 본문보다 1단계 굵게, 위아래 여백 넉넉히 |\n| 본문 단락 | Sans-serif Regular | **Pretendard Regular** | 14~15px | 중앙 정렬, 짧은 2~3줄 문단 단위로 끊어 블록화, 행간 1.5, 단락 사이 여백 1em |\n| 마이크로 텍스트(계좌/서명/캡션) | Sans-serif Bold/Regular 혼합 | **Pretendard** (숫자는 Bold, 이름은 SemiBold) | 13~22px(계좌번호는 강조로 크게) | 하단 고정 배너에 좌측 정렬(원본은 중앙 정렬), 계좌번호만 큰 사이즈로 강조해 시각적 CTA 역할 수행 |\n\n**교차·중첩 배치 조형 규칙**\n- 인용 헤드라인의 줄바꿈은 \"의미상 끊기 좋은 지점\"이 아니라 \"세로로 봤을 때 리듬감 있는 길이\"로 강제 개행한다 (예: \"세일즈에는\" / \"\"셀링포인트가\"\" / \"필요하다\" — 3줄 모두 5~8자 내외).\n- 사진과 마스킹테이프는 항상 틀어진 각도(테이프 -8~12도 회전)로 겹쳐, 전체 레이아웃의 격자틀을 살짝 깨뜨리는 유일한 요소로 둔다. 다른 모든 텍스트/박스 요소는 완전한 수평·수직 정렬을 유지해 테이프의 \"일탈\"이 눈에 띄게 한다.\n- 소제목 라인박스는 페이지마다 코너 위치를 바꿔도 되지만, 박스 내부 텍스트는 항상 좌측 정렬 + 상단 짧은 가로선 장식을 유지한다.\n\n## 2. 사진과 그래픽의 조화 원칙\n\n- **피사체 분리**: 인물 사진은 반드시 스튜디오 톤(베이지/아이보리 배경, 소프트 라이팅)으로 촬영된 것을 사용해, 카드뉴스 배경의 베이지 톤과 자연스럽게 흡수되도록 한다. 피사체 주변에 하드 컷아웃이나 배경 제거를 하지 않고, 사각 폴라로이드 프레임으로만 분리한다.\n- **마스킹 기법**: 사진은 세로 비율(약 4:5)로 크롭하고, 흰색/아이보리 보더(폴라로이드 프레임, 상하좌우 균등 8~10%, 하단은 캡션 공간으로 2배 넓게)를 둘러 \"사진+캡션 카드\" 한 덩어리로 묶는다.\n- **오버레이 장식**: 마스킹테이프는 사진 상단 모서리를 비스듬히 가로지르게 배치하여 사진이 배경 위에 \"실제로 붙어있다\"는 착시를 준다. 테이프 색은 본문 배경보다 한 톤 진한 더스티 로즈로, 반투명(opacity 85~90%) 처리해 아래 사진이 비치는 느낌을 약간 남긴다.\n- **가독성 확보**: 사진이 있는 슬라이드에서는 텍스트 블록을 사진과 겹치지 않는 별도 컬럼(우측 전용 공간)에 배치해 대비 문제를 원천 차단한다. 텍스트가 배경 텍스처 위에 직접 올라갈 때만 배경 쪽 텍스처 opacity를 낮추거나(15% 이하) 텍스트 영역 뒤에 미세한 반투명 화이트 박스(opacity 5~8%)를 깔아 보정한다.\n- **그림자로 깊이 표현**: 사진 카드와 테이프 모두에 soft drop-shadow(blur 12~16px, opacity 15~20%, y-offset 6~8px)를 적용해 배경에서 한 레이어 떠 있는 느낌을 통일되게 적용한다.\n\n## 3. 페이지별 구성요소 및 상세 배치 설계도\n\n> 기준 캔버스: 500×500px (정사각형 카드뉴스/반응형 랜딩 섹션 기준, 실제 랜딩페이지 적용 시 비율 유지하며 스케일)\n\n### [Master 1] 표지 / 프로필 소개형 (source-1 스타일)\n- 배경: 베이지(#DCCFC3) 대리석+잎사귀 텍스처, 레이어 깊이 1(최하단)\n- 좌상단(16,16): 로고 워드마크 \"S.L.U.S\", 폭 80px, 레이어 깊이 5(최상단)\n- 우상단(380~480, 16~28): 페이지네이션 도트 5개, 지름 6px, 간격 10px, 1번째만 채움(#8A6A5B), 나머지 외곽선만(#B9ACA0)\n- 좌측 블록(40,110 ~ 230,420): 폴라로이드 사진 카드\n  - 화이트 프레임 박스 190×300px, 레이어 깊이 2\n  - 내부 사진 170×230px, 상단 정렬\n  - 하단 캡션 영역(화이트 배경 내부) 170×50px: 이름 \"당돌한리더 제니\"(Bold, 15px, 다크브라운) + 부제(Regular, 10px, 그레이브라운), 둘 다 중앙 정렬\n  - 마스킹테이프: 사진 상단 중앙~우측(130,95 ~ 220,130), 폭 90px × 높이 35px, 회전 -10도, 레이어 깊이 3(사진과 배경 경계 위)\n- 우측 블록(255,150 ~ 470,260): 인용 헤드라인, 큰따옴표 포함 3줄 세리프 Bold 34px, 색 #4A362C, 행간 1.35\n- 우측 블록 하단(255,280 ~ 470,420): 보조 설명 — 소제목 Bold 16px 중앙정렬 + 본문 2개 문단, Regular 14px, 행간 1.5, 중앙정렬, 문단 사이 여백 16px\n- 레이어 순서(아래→위): 배경 텍스처 → 잎사귀 그림자 → 사진 프레임 → 사진 → 마스킹테이프 → 로고/도트/텍스트\n\n### [Master 2] 간지 / 안내 정보형 (source-2 스타일)\n- 배경: 다크 모카 브라운(#8A6A5B~#6B5245 그라데이션) 텍스처, 레이어 깊이 1\n- 좌상단(16,16): 로고 워드마크(화이트/아이보리 톤 반전) \"S.L.U.S\"\n- 우상단: 페이지네이션 도트, 2번째 도트만 채움(#F7F3EE), 나머지 외곽선 반투명 화이트\n- 좌측 상단 블록(40,90~260,140): 섹션 타이틀 \"입금 및 신청 안내\" — Sans Bold 22px, 화이트, 좌측 정렬\n- 좌측 중단 블록(40,170~300,290): 넘버링 리스트, Sans Regular~Medium 16px, 화이트, 줄간격 1.6, 좌측 정렬\n- 우측 블록(320,90~470,220): Selling Point 라벨 박스 — 가는 실선 사각 박스(1px, 화이트/아이보리 50% opacity), 내부 패딩 24px, 좌상단에 짧은 가로선(ㅡ) 장식 + \"Selling Point\" Serif 20px 화이트 2줄 배치\n- 하단 고정 배너(0,420~500,500): 화이트/아이보리 솔리드 박스, 전체 폭, 계좌번호(Bold 20px) + 예금주명(SemiBold 16px), 중앙정렬, 레이어 깊이 최상단\n- 레이어 순서(아래→위): 다크 배경 텍스처 → 로고/도트/타이틀/리스트/라벨박스 → 하단 화이트 배너(최상단 고정)\n\n### [Master 3] 본문 설명형 (확장 패턴, 텍스트 전용 페이지)\n- 배경: 베이지/브라운 교차 선택(짝수 페이지 다크, 홀수 페이지 라이트 권장)\n- 상단 바: 로고 + 도트 동일 위치 고정(모든 Master 공통 규칙)\n- 중앙(60,150~440,400): 소제목 Bold 18px 중앙정렬 + 본문 2~4문단, 좌우 여백 60px로 짧은 라인 길이 유지(한 줄 18~22자 내외)\n- 선택 장식: 우측 또는 좌측 코너에 Selling Point류 라인박스 1개만 배치해 시선 앵커 역할\n\n### [Master 4] 사례/후기 카드형 (확장 패턴)\n- Master 1과 동일한 사진+캡션 폴라로이드 구조를 좌우 반전해 다양성 부여\n- 우측에 인용 헤드라인 대신 숫자 강조형(예: \"87%\") + 보조 설명 배치\n\n### [Master 5] FAQ/Q&A형 (확장 패턴)\n- 다크 배경, 좌측 \"Q.\" 세리프 큰 글자(48px) + 질문 한 줄\n- 우측 또는 하단 \"A.\" 답변 2~3줄, 질문보다 작은 사이즈로 위계 구분\n\n### [Master 6] CTA/마감형 (확장 패턴)\n- Master 2의 하단 배너 구조를 전체 화면으로 확장\n- 중앙 큰 CTA 문구(Bold 세리프) + 하단 신청 방법 재요약 + 마감 기한 강조 텍스트(Accent 컬러)\n\n## 4. 만능 적용 공식\n\n### 주제별 비주얼 소재 치환 매트릭스\n\n| 원본 요소 | 역할 | 세일즈/마케팅 주제 치환 | 자기계발/강의 주제 치환 | 뷰티/라이프스타일 주제 치환 |\n|---|---|---|---|---|\n| 폴라로이드 인물 사진 | 신뢰감 있는 강사/화자 소개 | 대표 강사 프로필 사진 | 멘토/코치 프로필 사진 | 브랜드 모델/대표 사진 |\n| 마스킹테이프 | 아날로그 감성, 손길이 느껴지는 장식 | 동일 유지(색만 브랜드 톤 조정) | 동일 유지 | 리본/패브릭 질감으로 변형 가능 |\n| 세리프 인용 헤드라인 | 핵심 메시지 임팩트 전달 | 세일즈 철학 한 문장 | 강의 핵심 모토 | 브랜드 슬로건 |\n| Selling Point 라인박스 | 섹션 구분·브랜딩 포인트 라벨 | \"Selling Point\" 유지 | \"Key Point\" / \"Insight\" | \"Signature\" / \"Must Have\" |\n| 하단 계좌 배너 | 결제/신청 정보 강조 CTA | 입금 계좌 정보 | 수강 신청 링크/기한 | 구매 링크/할인 코드 |\n| 대리석+잎사귀 텍스처 | 고급스러운 아날로그 배경 질감 | 동일 유지 | 종이/우드 텍스처로 변형 가능 | 패브릭/꽃잎 텍스처로 변형 가능 |\n\n### 복사해서 쓰는 스타일 고정 프롬프트\n\n```\nS.L.U.S 모카 브랜딩 스타일로 디자인해줘.\n\n[색상]\n- 베이지(#DCCFC3)와 모카브라운(#8A6A5B~#6B5245) 두 배경을 슬라이드마다 교차 사용\n- 포인트 컬러는 더스티 로즈(#C9A39A) 한 가지만 추가\n- 전체 채도를 낮게 유지하고, 명도 대비만으로 위계를 구분할 것\n\n[배경 텍스처]\n- 대리석 얼룩 + 식물(나뭇잎) 그림자를 opacity 15~30%로 깔아 아날로그 질감 연출\n- 텍스처가 텍스트 가독성을 해치지 않도록 항상 전경보다 연하게\n\n[레이아웃 공통 규칙]\n- 좌상단: 워드마크 로고(점으로 구분된 이니셜, 예 S.L.U.S), 자간 넓게\n- 우상단: 페이지네이션 도트(현재 페이지만 채움, 5개 기준)\n- 인물 사진은 폴라로이드 프레임(화이트 보더)+비스듬한 마스킹테이프로 장식, soft drop-shadow 적용\n- 핵심 메시지는 세리프체 + 큰따옴표로 감싸 2~3줄 짧게 강제 개행(세로 리듬감)\n- 보조 정보/소제목은 가는 실선(1px) 사각 라인박스 안에 세리프 라벨로 배치\n- 안내/정보성 텍스트는 산세리프 Bold, 좌측 정렬, 번호 리스트 형식\n- 중요 CTA(계좌/신청정보)는 화면 하단 고정 화이트 배너로 강한 명도 대비를 줘 시선을 끌 것\n- 전체적으로 \"손으로 꾸민 다이어리/무드보드\" 같은 고급스럽고 감성적인 톤을 유지할 것\n- Absolutely NO excessive colors, keep it muted and tone-on-tone\n```","previewUrl":"https://hopedesign.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F317fd537-f4ec-4790-9118-9405c9856b23%2FUntitled.png?table=block&id=51720752-7ef5-4553-84db-aace8df96338&cache=v2","source":{"type":"url","url":"https://hopedesign.notion.site/4e1404a0eef0452396150d5bd792fcca"},"tokens":{"primary":"#8A6A5B","secondary":"#C9A39A","bg":"#DCCFC3","text":"#4A362C","font":"serif"}},
  {"id":"url-notion-landing-b","part":"landing","layout":"register","name":"크라프트 손그림 모집포스터","ref":"노션 캡처에서 복제: 부모코칭","guide":"1. **따뜻한 아날로그 질감 위의 디지털 정보 설계** — 크라프트지(kraft paper) 베이지 텍스처 배경이 전체를 감싸며 \"손으로 만든 소식지\" 느낌을 주고, 그 위에 타이핑된 흰 박스·반투명 정보 블록을 올려 가독성과 아날로그 감성을 동시에 확보한다.","guideMd":"# 디자인 가이드 — TCK 부모코칭 삼세판 크라프트 손그림 모집 랜딩\n\n## 1. 전체 디자인 시스템\n\n### 1.1 핵심 디자인 철학\n\n1. **따뜻한 아날로그 질감 위의 디지털 정보 설계** — 크라프트지(kraft paper) 베이지 텍스처 배경이 전체를 감싸며 \"손으로 만든 소식지\" 느낌을 주고, 그 위에 타이핑된 흰 박스·반투명 정보 블록을 올려 가독성과 아날로그 감성을 동시에 확보한다.\n2. **손그림 일러스트로 만드는 서사적 여백** — 지구본, 비행기, 연필을 쥔 손 등 라인 드로잉 일러스트를 텍스트 블록 주변 여백에 배치해 \"TCK(이주민 자녀)의 이동·성장·기록\"이라는 주제를 은유적으로 전달한다. 일러스트는 항상 대각선 혹은 코너에 걸치듯 배치해 레이아웃의 네모반듯함을 깨준다.\n3. **타자기 공문서 톤 + 네온 하이라이트 포인트** — 본문은 관공서 공문/가정통신문처럼 들여쓰기된 산문체로 신뢰감을 주고, 입금계좌 등 행동이 필요한 단 하나의 정보에만 형광 노란 하이라이트를 써서 시선을 강제 집중시킨다.\n4. **수직 타임라인 + 색상 코딩으로 정보 위계 분리** — 2페이지(상세 일정)는 민트 라운드 박스 3개를 검정 화살표로 수직 연결해 \"순서가 있는 3단계 프로세스\"임을 즉각 인지시키고, 하단 강사진은 원형 프로필 사진 그리드로 완전히 다른 톤(사람 중심)으로 전환한다.\n\n### 1.2 컬러 팔레트 및 그라데이션 공식\n\n| 구분 | 컬러명 | HEX | RGB | 적용 영역 및 역할 |\n|---|---|---|---|---|\n| Primary | 크라프트 베이지 | #D8C9A8 | 216,201,168 | 전체 배경 텍스처(크라프트지), 브랜드 톤의 기본값 |\n| Primary | 딥 민트 | #A9D8C9 | 169,216,201 | 일정 단계 라운드 박스(1차/2차/3차) 배경, 핵심 CTA성 블록 |\n| Secondary | 오프화이트 | #FAF7F0 | 250,247,240 | 제목 박스, 본문 텍스트 카드 배경 |\n| Secondary | 소프트 베이지(반투명) | #EDE3CC (70~80% 불투명) | 237,227,204 | 하단 정보(대상/참가비/신청 등) 블록 배경 — 배경 텍스처가 비치는 반투명 레이어 |\n| Neutral | 잉크 블랙 | #1E1C1A | 30,28,26 | 본문 텍스트, 화살표, 테두리선 |\n| Accent | 비비드 옐로 하이라이트 | #FFE600 | 255,230,0 | 입금계좌 등 단일 행동 정보 강조(형광펜 효과) |\n| Accent | 내비 블루(지구 바다) | #1B3A63 | 27,58,99 | 지구 일러스트 바다·강사 로고 파도 |\n| Accent | 포레스트 그린(지구 대륙) | #4C7A3F | 76,122,63 | 지구 일러스트 대륙, 일부 아이콘 라인 |\n\n**시그니처 그라데이션 공식**: 전체 배경은 단색이 아닌 종이 섬유 텍스처(노이즈) + 베이지 단색 `#D8C9A8`이 기본. 강조가 필요한 영역(예: CTA 버튼화 시)에는 `linear-gradient(135deg, #A9D8C9 0%, #7FBFAE 100%)` (민트 → 딥민트, 좌상단→우하단 135도) 공식을 사용.\n\n**오버레이 공식**: 정보 블록 = `background: rgba(237,227,204,0.75)` + `backdrop-filter: blur(0px)`(블러 없이 단순 반투명) 위에 1px 잉크블랙 또는 무테두리로 올림. 흰 제목 박스는 `background: #FAF7F0` + `box-shadow: 2px 2px 0 rgba(30,28,26,0.15)` 정도의 미세 그림자로 종이가 살짝 들뜬 느낌을 준다.\n\n### 1.3 타이포그래피 시스템\n\n| 위계 요소 | 원본 폰트(추정) | 한글 대체 추천 | 크기 | 굵기·스타일 규칙 |\n|---|---|---|---|---|\n| 메인 타이틀 | 돋움 계열 Bold (손글씨 느낌 아님, 가독성 우선 고딕) | Pretendard Bold / 나눔스퀘어 ExtraBold | 32~36px (모바일 24~28px) | 굵게, 느낌표 포함, 흰 박스 안 좌측 정렬, 느낌표로 구어체 에너지 부여 |\n| 서브 타이틀 | 동일 계열 Regular~Medium | Pretendard Medium | 16~18px | 괄호로 감싼 보조 설명, 메인 타이틀 바로 아래 줄간격 좁게 |\n| 소제목(섹션 헤더: \"1차 감성웨비나:\" 등) | 고딕 Bold | Pretendard Bold | 18~20px | 민트 박스 내부 최상단, 콜론(:) 뒤 핵심 테마만 별도 색상/굵기 강조 가능 |\n| 본문(산문 소개문) | 고딕 Regular, 자간 넓지 않음 | Pretendard Regular / 나눔고딕 | 14~15px, 줄간격 170~180% | 문단 첫 줄 들여쓰기(공문서체), 짧은 문장 단위 줄바꿈으로 리듬감 생성 |\n| 정보 블록 텍스트(대상/참가비 등) | 고딕 Regular~Medium, 라벨만 Bold | Pretendard | 13~14px | \"대상:\", \"참가비:\" 등 라벨은 Bold, 내용은 Regular. 보충설명(괄호)은 1~2px 작게, 회색 톤 |\n| 마이크로 텍스트(강사 프로필 상세) | 고딕 Light~Regular | Pretendard Regular | 11~12px | 좁은 줄간격(135~145%), 경력은 불릿 없이 줄바꿈 나열 |\n\n**교차·중첩 배치 조형 규칙**: 메인 타이틀 흰 박스는 배경 텍스처 위에 \"얹힌\" 듯 살짝 그림자로 띄우고, 우측 하단 지구+손 일러스트는 정보 블록 텍스트 박스와 서로 겹치도록(오버랩) 배치해 평면성을 깨고 깊이감을 만든다. 비행기 일러스트는 타이틀 박스 우상단 모서리에 절반만 걸치게 배치(bleed) 한다.\n\n---\n\n## 2. 사진과 그래픽의 조화 원칙\n\n- **피사체 분리**: 강사 프로필은 원형(circle) 마스킹된 인물 사진을 사용해 배경 크라프트지와 분명히 분리하고, 사진 바로 아래 흰 텍스트 영역에 이름·경력을 붙여 \"명함\" 모듈처럼 반복 패턴화한다.\n- **마스킹**: 손 일러스트(연필 쥔 손)는 배경과 동일한 선 드로잉 스타일(모노톤 라인 + 포인트 컬러 1~2색)로 그려 사진이 아닌데도 배경에 자연스럽게 녹아들게 한다. 실사 사진(강사 프로필)과 손그림 일러스트(지구·비행기·손)를 같은 페이지에 공존시키되, 실사는 \"사람=신뢰\", 일러스트는 \"서사=감성\"으로 역할을 분리한다.\n- **오버레이**: 텍스트가 배경 텍스처 위에 직접 얹힐 때는 반드시 반투명 베이지 박스(불투명도 70~80%)를 깔아 대비를 확보하고, 텍스처가 과하게 비쳐 글자가 묻히지 않게 한다.\n- **가독성 확보 기법**: 본문 영역과 일러스트 영역을 명확히 좌/우 혹은 상/하로 분리(본문은 좌측 상단~중단, 일러스트는 우측 하단)하고, 텍스트와 겹치는 일러스트 부분은 투명도를 낮추거나 텍스트 박스 뒤로 z-index를 보낸다.\n\n---\n\n## 3. 페이지별 구성요소 및 상세 배치 설계도\n\n캔버스 기준: 1080×1620px(모바일 세로 포스터 비율 2:3, 반응형 웹에서는 섹션별 full-bleed로 재구성)\n\n### [Master 1] 표지/모집 공고 섹션 (source-1 상단)\n- 배경: 크라프트 베이지 텍스처 풀블리드, z-index 0\n- 타이틀 박스: 좌측 정렬, x=5%, y=6%, width=55%, height=12%, 배경 `#FAF7F0`, 살짝 둥근 모서리(4px), 그림자(2,2,0)\n  - 레이어 순서: 배경(0) → 타이틀 박스(1) → 비행기 일러스트(2, 박스 우상단에 20%만 겹치며 bleed)\n- 비행기 일러스트: x=55%, y=2%, width=20%, 대각선 상승 구도(좌하→우상)\n- 본문 산문 블록: x=8%, y=22%, width=84%, height=28%, 배경 투명(배경 텍스처 그대로 노출), 들여쓰기 문단 3개, 줄간격 180%\n- 정보 블록(반투명 베이지): x=5%, y=52%, width=58%, height=40%, 배경 rgba(237,227,204,0.75), 패딩 20px, 라벨-값 구조 좌측정렬, 내부에 노란 하이라이트(입금계좌 라인)만 별도 레이어로 상위에 얹힘\n- 지구+연필손 일러스트: x=55%, y=48%, width=42%, height=48%, 정보 블록과 15~20% 겹치며 우하단 코너에 배치(bleed), z-index는 정보블록보다 아래\n- 로고(TCK Wave): x=60%, y=90%, width=30%, 페이지 최하단 중앙~우측\n\n### [Master 2] 일정 타임라인 섹션 — 1차 (source-2 상단)\n- 민트 라운드 박스: x=5%, y=3%, width=90%, height=14%, `#A9D8C9`, border-radius 16px\n  - 내부 레이어: 소제목(Bold, 상단 1줄) → 날짜·시간(우측 정렬 또는 제목 옆 괄호) → 세부 2~3줄(①②로 구분)\n- 검정 화살표 커넥���: x=50%, y=17%→20%, width=4~6px 두께, 중앙 정렬, 박스와 박스 사이 수직 1개씩\n\n### [Master 3] 일정 타임라인 섹션 — 2차\n- 동일 민트 박스 구조, x=5%, y=21%, width=90%, height=14%\n- 세부 내용에 \"진행자\" 표기(괄호) 패턴 반복 — 패널 형식임을 시각적으로 구분 없이 텍스트로만 차별화\n\n### [Master 4] 일정 타임라인 섹션 — 3차\n- 동일 민트 박스 구조, x=5%, y=38%, width=90%, height=16% (3차가 내용 많아 높이 소폭 증가)\n- 하단에 \"(○차 참가자만 신청가능)\" 같은 제약 조건은 모든 박스 공통 패턴: 괄호+회색조 작은 글씨로 박스 최하단 중앙 배치\n\n### [Master 5] 강사 프로필 그리드\n- 2행 × 3열(또는 페이지 폭에 따라 2×2+1) 그리드, 상단 y=56%부터 시작, 각 셀 width=30%, height=22%\n- 셀 내부 레이어: 원형 프로필 사진(상단 중앙, 지름 셀너비의 45%) → 이름+직함(Bold, 사진 바로 아래) → 경력 리스트(Light, 줄바꿈 나열, 좌측정렬 또는 중앙정렬)\n- 셀 간 거리: gap 4~5%, 인물 사진에 옅은 배경원(사진 뒤 흰 원) 깔아 분리감 강화\n\n### [Master 6] 로고/주최 마무리 섹션\n- 하단 전체 폭, y=90%~100%, 중앙 정렬\n- 협력사 로고(TCK Wave 등) + 파도 아이콘, 배경은 투명(크라프트 텍스처 노출 유지)\n- 페이지 최하단 안전영역(safe area) 5% 여백 확보\n\n---\n\n## 4. 만능 적용 공식\n\n### 주제별 비주얼 소재 치환 매트릭스\n\n| 원본 요소 | 역할 | 치환 가능 소재(주제 변경 시) | 비고 |\n|---|---|---|---|\n| 지구본 일러스트 | 글로벌/이주/다문화 상징 | 책, 나무, 집, 지도, 다리 등 \"연결·성장\" 은유 오브젝트 | 라인 드로잉 + 2색 포인트(내비+그린) 스타일 유지 |\n| 비행기 일러스트 | 이동/여정 상징 | 기차, 자전거, 화살표, 새 | 항상 대각선 상승 구도, 타이틀 박스 코너에 bleed |\n| 연필 쥔 손 | \"기록/성장 그래프 그리기\" 상징 | 돋보기 든 손, 책 넘기는 손, 식물 돌보는 손 | 손은 항상 페이지 우하단 코너에서 안쪽으로 뻗는 구도 |\n| 민트 라운드 박스 3단 | 순차 프로세스(커리큘럼/단계) | 색상만 주제 브랜드컬러로 교체(예: 코랄, 스카이블루) 가능, 단 형태(라운드+화살표)는 유지 | 단계가 2~5개로 변해도 동일 패턴 적용 |\n| 노란 하이라이트 | 행동 유도(계좌/링크/마감일) | 색은 고정(#FFE600), 적용 대상만 \"가장 중요한 1개 행동 정보\"로 교체 | 페이지당 1곳만 사용 — 남발 금지 |\n| 크라프트지 텍스처 | 아날로그·신뢰·가정통신문 톤 | 유지 권장(브랜드 시그니처). 더 젊은 타깃이면 린넨/그리드 종이 텍스처로 변형 가능 | 노이즈 텍스처 강도 10~15% 유지 |\n| 원형 프로필 그리드 | 강사/연사/팀 소개 | 동일 구조로 발표자·심사위원·멘토 소개에 재사용 | 인원수에 따라 2~4열 가변 |\n\n### 복사해서 쓰는 스타일 고정 프롬프트\n\n```\n크라프트지(kraft paper) 질감 베이지 배경(#D8C9A8, 종이 섬유 노이즈 10~15%) 위에\n흰색(#FAF7F0) 둥근 모서리 박스 안에 굵은 고딕 타이틀(느낌표 포함, 좌측 정렬)을 배치.\n타이틀 박스 우상단 코너에 라인 드로잉 스타일 일러스트(내비블루 #1B3A63 + 포레스트그린\n#4C7A3F 2색 포인트)를 절반만 걸치게(bleed) 배치.\n본문은 공문서체 들여쓰기 산문, 고딕 Regular, 줄간격 180%.\n하단에는 반투명 베이지 정보 블록(rgba(237,227,204,0.75))을 두고 라벨은 Bold,\n핵심 행동 정보(계좌/링크/마감일) 한 곳만 형광 노랑(#FFE600) 하이라이트로 강조.\n프로세스/일정 단계는 민트(#A9D8C9) 라운드 박스로 표현하고 각 박스 사이를\n굵은 검정(#1E1C1A) 수직 화살표로 연결.\n인물 소개는 원형 마스킹 실사 프로필 사진 + 이름/직함 Bold + 경력 Light 텍스트로\n그리드 구성. 전체적으로 따뜻한 아날로그 공문 + 손그림 일러스트 + 임팩트 하이라이트\n포인트 조합의 모집 안내 포스터 스타일.\n```","previewUrl":"https://hopedesign.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F0af29a97-b0c9-4f68-8c4a-feeeb079e61e%2FUntitled.png?table=block&id=a8d4dfc3-c714-4075-a4ef-2211f617e2fc&cache=v2","source":{"type":"url","url":"https://hopedesign.notion.site/80f907ffdf514ae4bee4902c99631578"},"tokens":{"primary":"#A9D8C9","secondary":"#D8C9A8","bg":"#D8C9A8","text":"#1E1C1A","font":"sans"}},
  {"id":"url-notion-landing-c","part":"landing","layout":"story","name":"독서습관 그린 에디토리얼","ref":"노션 캡처에서 복제: 독서습관","guide":"1. **극단적 여백 대비(White Space Dominance)** — 상단 40~55%는 순백 배경에 텍스트만 배치하고, 하단은 사진으로 꽉 채운다. 텍스트 영역의 '숨 쉬는 공간'이 콘텐츠의 신뢰감과 가독성을 만든다.","guideMd":"# 디자인 가이드 — 독서습관 그린 에디토리얼 (Start Reading Green Editorial)\n\n## 1. 전체 디자인 시스템\n\n### 1.1 핵심 디자인 철학\n\n1. **극단적 여백 대비(White Space Dominance)** — 상단 40~55%는 순백 배경에 텍스트만 배치하고, 하단은 사진으로 꽉 채운다. 텍스트 영역의 '숨 쉬는 공간'이 콘텐츠의 신뢰감과 가독성을 만든다.\n2. **코너 프레임 모티프(Clipped-Corner Frame)** — 네 모서리에 얇은 회색 대각선 삼각 프레임(접힌 종이 느낌)을 반복 배치해 \"카드/페이지\" 단위를 시각적으로 고정시키는 시그니처 장치. 모든 슬라이드/섹션에 예외 없이 적용.\n3. **아치형 분할선(Arched Split)** — 텍스트 영역과 사진 영역의 경계를 수평 직선이 아니라 가운데가 위로 볼록 솟은 완만한 아치(물결 1개)로 처리해, 딱딱한 정보성 레이아웃에 유기적·감성적 리듬을 더한다.\n4. **단색 포인트 + 선택적 볼드(Single Accent + Selective Bold)** — 컬러는 그린 단 1색만 포인트로 쓰고, 본문에서는 색이 아니라 **굵기**로 핵심 문장을 강조한다. 사진 속 컬러(책등의 빨강·보라·노랑 등)는 유일하게 허용되는 멀티컬러 영역이며 UI 요소에는 절대 사용하지 않는다.\n\n### 1.2 컬러 팔레트 및 그라데이션 공식\n\n| 구분 | 컬러명 | HEX | RGB | 적용 영역 및 역할 |\n|---|---|---|---|---|\n| Primary | 포레스트 그린 | #3C7A3F | 60,122,63 | 메인 타이틀(한글 제목), 섹션 소제목, 핵심 포인트 색 — 유일한 브랜드 컬러 |\n| Secondary | 라이트 그레이 | #C9CACC | 201,202,204 | 코너 프레임 삼각형 채움/외곽선, 보조 디바이더 |\n| Neutral 1 | 퓨어 화이트 | #FFFFFF | 255,255,255 | 전체 배경, 텍스트 영역 바탕 |\n| Neutral 2 | 다크 그레이(본문) | #333333 | 51,51,51 | 본문 일반 텍스트 |\n| Neutral 3 | 소프트 그레이(킥커) | #B3B3B3 | 179,179,179 | 이탤릭 세리프 영문 킥커(\"Start Reading\") |\n| Accent | 블랙 볼드 | #1A1A1A | 26,26,26 | 본문 중 핵심 구절 볼드 처리(그린이 아닌 블랙 강조로 이중 위계 형성) |\n| Deep Accent | 딥 그린(아이콘/라인) | #2F5F32 | 47,95,50 | 우상단 라인 아이콘(펼친 책), 얇은 강조선 |\n\n- **시그니처 그라데이션**: 이 디자인은 배경 자체는 플랫 화이트이며 그라데이션을 쓰지 않는다. 대신 **사진 하단 비네팅 공식**을 그라데이션처럼 사용: `linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.08) 85%, rgba(255,255,255,0.15) 100%)`를 사진 최하단에 얹어 다음 섹션과의 경계를 부드럽게 한다.\n- **코너 프레임 오버레이 공식**: 각 모서리에 `45deg` 회전된 직각이등변삼각형, 변 길이 화면 너비의 6~8%(예: 1080px 기준 약 70~90px), 채움색 `#FFFFFF` + 외곽선 `1px solid #C9CACC` + 삼각형 안쪽에 아주 옅은 그림자 `box-shadow: inset 2px 2px 4px rgba(0,0,0,0.04)`로 \"모서리가 살짝 접힌 종이\" 질감을 만든다.\n- **아치 분할 공식**: 텍스트 블록 하단 경계를 `path`로 `M0,H Q W/2,H-40 W,H` 형태의 2차 베지어 곡선으로 그려 사진 위에 살짝 겹치게(overlap 20~30px) 배치. 사진이 텍스트 영역 쪽으로 봉긋하게 솟아오른 형태.\n\n### 1.3 타이포그래피 시스템\n\n| 위계 요소 | 원본 폰트(추정) | 한글 대체 추천 | 크기(1080px 폭 기준) | 굵기·스타일 규칙 |\n|---|---|---|---|---|\n| 영문 킥커(Kicker) | Edwardian Script/Baskerville Italic류 세리프 | Noto Serif KR Italic 또는 EB Garamond Italic | 28~32px | 이탤릭, 레터스페이싱 +2~4%, 컬러 #B3B3B3, 중앙 정렬 |\n| 메인 타이틀(한글 제목) | 고딕 Bold 계열(Apple SD산돌고딕Neo Bold 유사) | Pretendard Bold / 嘉와도움체 Bold | 44~54px (2줄 구성 시 줄간 1.25) | 그린(#3C7A3F), Bold~ExtraBold, 중앙 정렬, 자간 -2% |\n| 타이틀 넘버(\"1\") | 동일 고딕 Bold | Pretendard Bold | 36~40px | 그린, 중앙 정렬, 타이틀과 1줄 간격(약 16px) 아래 배치 |\n| 소제목(본문 페이지 H1, 예: \"독서습관은 어떻게 생기는가?\") | 고딕 Bold | Pretendard Bold | 32~36px | 그린, 좌측 정렬, 페이지 좌상단 고정 위치 |\n| 본문(Body) | 고딕 Regular | Pretendard Regular | 20~22px | 다크그레이(#333333), 중앙 정렬, 줄간 1.8~2.0(문장마다 줄바꿈하는 '시 형식' 레이아웃) |\n| 본문 내 강조(Bold Phrase) | 고딕 Bold | Pretendard Bold/SemiBold | 본문과 동일 | 블랙(#1A1A1A), 같은 줄 안에서 부분 볼드 — 색은 바꾸지 않고 굵기만 변경 |\n| 마이크로 텍스트(출처/페이지 번호 등) | 고딕 Regular | Pretendard Regular | 14~16px | 그레이, 하단 또는 모서리 배치 |\n\n**조형 규칙**:\n- 킥커(이탤릭 세리프)와 메인 타이틀(고딕 볼드)의 **서체 대비 교차 배치**가 핵심 리듬: \"가벼운 손글씨 느낌 영문 한 줄 → 무거운 한글 고딕 두 줄\" 순서를 항상 유지한다.\n- 본문 페이지에서는 문장을 의미 단위로 끊어 **각 문장을 별도 줄로 중앙 정렬**(마치 시처럼) 배치하고, 그중 한 문장 안의 핵심 목적어/서술어에만 볼드를 입힌다. 한 블록(5~7문장)당 볼드는 2개 이하로 제한해 과잉 강조를 막는다.\n- 숫자(챕터 번호)는 반드시 제목보다 한 단계 작은 크기로, 제목 바로 아래 별도 줄에 단독 배치한다.\n\n## 2. 사진과 그래픽의 조화 원칙\n\n- **피사체 분리**: 표지형(Master 1) 사진은 피사체(책등 행렬)를 **프레임 왼쪽 하단에서 대각선으로 솟아오르듯** 배치해, 우측 상단 여백을 텍스트용으로 비워둔다. 피사체 상단 가장자리는 화면 밖으로 자연스럽게 블러/페이드 아웃(opacity gradient)되어 배경 화이트와 경계 없이 녹아든다.\n- **마스킹(아치 크롭)**: 본문형(Master 2 이상) 사진은 상단 변을 완만한 아치 곡선으로 마스킹해, 사진이 \"텍스트 블록을 받치는 그릇\" 처럼 보이게 한다. 마스크는 SVG clip-path 또는 PNG 알파 마스크로 구현: `clip-path: path('M0,40 Q50%,0 100%,40 L100%,100% L0,100% Z')`.\n- **오버레이로 가독성 확보**: 사진 자체에는 텍스트를 얹지 않는 것이 원칙(이 디자인은 사진 위 텍스트 오버레이가 없음). 텍스트는 항상 순백 영역에만 존재하므로 별도 그림자나 어둡게 하는 오버레이가 필요 없다 — 이 점이 가독성의 핵심 전략이다.\n- **컬러 유도**: 사진 속에서 가장 채도 높은 피사체(색색의 책등/포스트잇)가 그린 타이틀과 대비되어 시선을 자연스럽게 상단 텍스트 → 하단 사진으로 흐르게 한다. 사진은 반드시 보케(배경 흐림)나 피사계심도가 있는 것을 선택해 정보 영역(텍스트)과 감성 영역(사진)의 위계를 분리한다.\n- **라인 아이콘 보조**: 우상단에 2~3px 두께의 심플 라인 아이콘(예: 펼친 책)을 배치해 콘텐츠 카테고리를 암시. 아이콘은 채움 없이 외곽선만, 그린 또는 다크그레이 단색.\n\n## 3. 페이지별 구성요소 및 상세 배치 설계도\n\n### Master 1 — 표지(타이틀) 페이지\n- 캔버스: 1080×1080 (정방형, 반응형 시 상단 섹션 vh 60%로 치환)\n- 레이어 순서(아래→위): ① 화이트 배경 ② 하단 사진(책등, y: 42%~100%, 상단 엣지 소프트 페이드 120px) ③ 네 모서리 회색 삼각 프레임(z-top) ④ 텍스트 블록\n- 텍스트 블록 좌표(상단 기준 %): 킥커 \"Start Reading\" center, top 8~12% / 서브카피 \"시작하는 사람들을 위한\" center, top 18~20%, 폰트 24px Bold 그린 / 메인타이틀 \"독서습관 만들기\" center, top 24~30%, 48px ExtraBold 그린 / 숫자 \"1\" center, top 38~40%, 36px Bold 그린\n- 사진 영역: 좌하단에서 우상단으로 대각 배치된 책등 4~6권, 각 책에 포스트잇/색인탭 5~7개(멀티컬러), 사진 상단 가장자리 자연 블러\n- 반응형 규칙: 모바일에서는 사진 ���역 비율을 50%까지 축소, 텍스트 폰트 비율 0.8배 축소, 코너 프레임 크기는 고정 px(가변 축소 금지 — 프레임 비례가 깨지면 정체성 손실)\n\n### Master 2 — 본문(1단 사진형) 페이지\n- 레이어 순서: ① 화이트 배경 ② 좌상단 소제목 ③ 중앙 본문 텍스트 블록(아치 하단 경계 포함) ④ 하단 풀폭 사진(아치 상단 마스킹) ⑤ 네 모서리 프레임 ⑥ 우상단 라인 아이콘\n- 좌표: 소제목 top 6~8%, left 8%, 32px Bold 그린, 좌측 정렬 / 라인 아이콘 top 4%, right 6%, 60×60px / 본문 블록 top 16~40%, 좌우 마진 10%, 문장별 줄바꿈 중앙정렬 20px Regular + 부분 Bold / 사진 블록 top 42%~100%, 상단 아치 곡률 높이 40px\n- 비율: 텍스트:사진 = 약 42:58 (표지보다 텍스트 영역이 작음 — 본문 페이지는 사진이 주, 표지는 텍스트가 주)\n\n### Master 3 — 간지/챕터 구분 페이지(표지와 유사 변형)\n- Master 1과 동일 레이어 구조이나 메인타이틀 대신 챕터명 1줄 + 작은 설명 1줄, 사진은 챕터 주제에 맞는 단일 오브젝트 클로즈업으로 교체. 숫자는 챕터 순번으로 계속 사용.\n\n### Master 4 — 목차(List) 페이지\n- 상단 30%: 화이트 배경 + 좌상단 \"목차/Contents\" 소제목(그린, 라인아이콘 동반)\n- 하단 70%: 리스트형 레이아웃 — 각 항목 앞에 그린 원형 숫자 뱃지(28px) + 고딕 Regular 20px 타이틀, 항목 간 구분선은 연한 그레이 1px, 사진 없이 텍스트 전용(코너 프레임은 유지)\n\n### Master 5 — 인용/강조 문구 페이지\n- 화이트 배경 중앙에 그린 따옴표 아이콘 + 핵심 문장(28px Bold, 중앙정렬, 2~3줄) + 하단 출처 마이크로텍스트. 사진 없음, 코너 프레임만 유지해 시리즈 일관성 확보.\n\n### Master 6 — 마무리/CTA 페이지\n- Master 1 레이아웃 재사용하되 사진을 더 밝고 희망적인 톤(일출/열린 창 등)으로 교체, 메인 타이틀 자리에 \"다음 이야기가 궁금하다면\" 류 CTA 문구 + 그린 버튼(라운드 radius 24px, 흰 텍스트) 추가.\n\n## 4. 만능 적용 공식\n\n### 주제별 비주얼 소재 치환 매트릭스\n\n| 주제 | 표지 사진 소재 | 포인트 컬러(그린 대체) | 라인 아이콘 | 본문 사진 소재 |\n|---|---|---|---|---|\n| 독서습관(원본) | 색색의 책등+포스트잇 | 포레스트 그린 #3C7A3F | 펼친 책 | 창가에서 책 읽는 손 |\n| 운동/건강 습관 | 나란히 놓인 운동화/요가매트 | 틸 그린 #2D7D6E | 심장박동 라인 | 러닝화로 걷는 다리 클로즈업 |\n| 재테크/저축 습관 | 쌓인 동전·저금통 열 | 딥 그린 #2E6B4F | 그래프 상승 라인 | 가계부 쓰는 손 |\n| 수면/아침루틴 | 정리된 침구·알람시계 열 | 세이지 그린 #5A8A6B | 초승달/해 라인 | 햇살 드는 침실 창가 |\n| 외국어 학습 | 사전/단어카드 열 | 올리브 그린 #4A7A3C | 말풍선 라인 | 노트에 필기하는 손 |\n\n### 복사해서 쓰는 스타일 고정 프롬프트\n\n```\n스타일: 순백(#FFFFFF) 배경의 미니멀 에디토리얼 카드 레이아웃.\n네 모서리에 연회색(#C9CACC) 대각선 접힌 종이 느낌의 삼각 프레임을 반복 배치.\n상단 40~55%는 텍스트 전용 화이트 영역: 가는 이탤릭 세리프체 영문 킥커(연회색, 중앙정렬) \n→ 그 아래 고딕 Bold 그린(#3C7A3F) 한글 제목 2줄 → 챕터 숫자.\n하단은 풀폭 사진이며 상단 경계는 완만한 아치(물결 1개) 형태로 텍스트 영역을 향해 봉긋하게 마스킹.\n사진은 피사계심도 있는 보케 배경에 주제와 관련된 피사체를 대각선 구도로 배치, \n컬러는 사진 안에서만 다채롭게 허용(책등 포스트잇 등 악센트 컬러).\n본문 페이지는 좌상단에 그린 Bold 소제목 + 우상단 그린 라인 아이콘(외곽선만, 채움 없음), \n중앙정렬 본문은 문장마다 줄바꿈하고 핵심 구절만 검정 Bold로 부분 강조(색은 유지).\n전체적으로 그라데이션·그림자 최소화, 평면적이고 깨끗한 화이트 스페이스 중심의 차분한 톤.\nAbsolutely NO text, NO lettering, NO watermark, NO logos (사진 소재 자체 생성 시)\n```","previewUrl":"https://hopedesign.notion.site/image/https%3A%2F%2Fpostfiles.pstatic.net%2FMjAyMTAzMDJfMTc1%2FMDAxNjE0NjgzODI3MTA5.PpNWeUzxcTXMxJXZz44HI99anHWtz_OOYlGtqlEfPh0g.TYJisCkLbCo-qdwBXLXiX1ihPvdGpOxW6xp11ScQmk0g.JPEG.hopestory21%2FSE-154b686b-0b91-4080-88b4-0ccb57b0ba41.jpg%3Ftype%3Dw966?table=block&id=a3539c8b-0983-4e64-97de-de04307cacc8&cache=v2","source":{"type":"url","url":"https://hopedesign.notion.site/0e457578cddd4276993569f9e7796537"},"tokens":{"primary":"#3C7A3F","secondary":"#C9CACC","bg":"#FFFFFF","text":"#333333","font":"sans"}},
  {"id":"url-notion-landing-d","part":"landing","layout":"story","name":"Why 책을읽는이유 민트헥사곤","ref":"노션 캡처에서 복제: 독서습관5","guide":"1. **사진 60 : 솔리드 40의 수평 분할 대비** — 화면을 감성적인 보케 사진(상단)과 안정적인 민트 솔리드 컬러(하단)로 정확히 나눠, \"분위기(감성)\"와 \"메시지(정보)\"의 역할을 공간적으로 분리한다. 비율은 대략 60:40이며 사진 쪽이 항상 더 넓어 \"이미지가 주인공, ","guideMd":"# 디자인 가이드 — 감성 독서 랜딩 \"Why, 책을 읽는 이유\"\n\n## 1. 전체 디자인 시스템\n\n### 1.1 핵심 디자인 철학\n\n1. **사진 60 : 솔리드 40의 수평 분할 대비** — 화면을 감성적인 보케 사진(상단)과 안정적인 민트 솔리드 컬러(하단)로 정확히 나눠, \"분위기(감성)\"와 \"메시지(정보)\"의 역할을 공간적으로 분리한다. 비율은 대략 60:40이며 사진 쪽이 항상 더 넓어 \"이미지가 주인공, 텍스트는 그 여운을 정리하는 공간\"이라는 위계를 만든다.\n2. **경계선 위에 떠있는 육각형 배지(Hexagon Badge)** — 두 섹션의 경계를 깨끗하게 끊지 않고, 정육각형 배지가 상단 사진 영역으로 살짝 파고들며(약 40%는 사진 위, 60%는 민트 패널 위) 두 레이어를 \"핀으로 고정한\" 듯한 깊이감을 만든다. 이 배지가 전체 구도의 시각적 중심축이다.\n3. **손맛이 있는 타이포 vs 정돈된 본문의 교차** — 브러시 캘리그래피(영문)와 손글씨풍 한글이 배지 안에서 자유분방하게 배치되는 반면, 하단 본문은 중앙정렬·동일 자간의 명조풍으로 차분하게 줄바꿈 리듬을 탄다. \"감성은 손으로 쓰고, 설명은 활자로 정리한다\"는 대비.\n4. **여백은 숨 쉴 공간, 색은 많아야 2색** — 민트(or 포인트컬러) 한 가지 + 다크 텍스트 한 가지만 쓰고 나머지는 사진의 자연광/보케에 맡긴다. 하단 패널 내부 여백을 넉넉히 주어(텍스트 블록 상하좌우 패딩 큼) 미니멀하고 잔잔한 \"독서 노트\" 톤을 유지한다.\n\n### 1.2 컬러 팔레트 및 그라데이션 공식\n\n| 구분 | 컬러명 | HEX | RGB | 적용 영역 및 역할 |\n|---|---|---|---|---|\n| Primary | 시그니처 민트 (배지) | #A3DED1 | 163,222,209 | 육각형 배지 배경 — 전체 디자인의 시각적 앵커, 브랜드 포인트 컬러 |\n| Primary (Light) | 패널 라이트 민트 | #D9F1EC | 217,241,236 | 하단 40% 솔리드 패널 배경 — 배지보다 한 톤 밝게 하여 배지가 도드라지도록 함 |\n| Secondary | 머스타드 옐로 | #F0C44D | 240,196,77 | (커버/타이틀형 슬라이드) 강조 하이라이트 바 배경 — 핵심 소제목 띠 |\n| Neutral Dark | 잉크 블랙 | #1E1E1E | 30,30,30 | 배지 내 브러시 캘리그래피 텍스트, 하단 본문 텍스트 |\n| Neutral Mid | 다크 올리브 그레이 | #3A3A32 | 58,58,50 | 보조 텍스트, 사진 위 서브 캡션(그림자 처리 시) |\n| Accent | 웜 보케 골드 | #E8C07D | 232,192,125 | 사진 영역의 자연광/보케 하이라이트, 포인트 소품(책등) 색 참조용 |\n| Overlay | 사진 하단 그라데이션 페이드 | — | — | `linear-gradient(180deg, rgba(0,0,0,0) 70%, rgba(163,222,209,0.15) 100%)` — 사진 하단 경계가 민트 패널로 자연스럽게 녹아들도록 사진 맨 아래 10~15%에 민트 톤을 살짝 얹는다 |\n| Gradient | 배지 입체감용 보조 그라데이션(선택) | — | — | `135deg, #B7E8DC 0%, #8FD4C4 100%` — 배지에 평면감이 아쉬울 때 살짝 음영을 주는 용도(원본은 거의 플랫) |\n\n### 1.3 타이포그래피 시스템\n\n| 위계 요소 | 원본 폰트 느낌 | 한글 대체 추천 | 크기 (기준 1440px 폭) | 굵기·스타일 규칙 |\n|---|---|---|---|---|\n| 메인 타이틀(영문 브러시, 배지 상단 \"Why\") | 브러시 캘리그래피(Brush Script, 손글씨 사인펜) | 영문 그대로 유지 권장, 대체 시 \"Yeseva One\"·\"Playlist Script\" 류 웹폰트 | 48~56px | 두껍고 거친 브러시 스트로크, 살짝 기울임, 블랙(#1E1E1E) |\n| 서브 타이틀(한글 손글씨, 배지 하단 \"책을 읽는 이유\") | 마커·붓펜 손글씨체 | 나눔손글씨 붓, 미생체, 다인체(두꺼운 버전) | 26~30px | 2줄로 자연스럽게 흘려 쓰듯 배치, 글자 크기/기울기 미세하게 불규칙하게 |\n| 커버형 메인 헤드라인(사진 풀블리드 위, 흰색 볼드) | 두꺼운 고딕/산세리프 | Pretendard Bold, 에스코어드림 8Heavy | 44~52px (2줄) | 흰색(#FFFFFF), 가독성 위해 텍스트 뒤 어두운 그림자(text-shadow 0 2px 8px rgba(0,0,0,.35)) 또는 사진 자체에 반투명 다크 오버레이 |\n| 보조 소제목(스크립트 영문, \"Start Reading\") | 얇은 손글씨 커시브 | 영문 유지, 대체 시 \"Alex Brush\"·\"Pinyon Script\" | 22~26px | 반투명 화이트(~80% opacity), 가늘고 우아하게, 헤드라인 상단에 여백 두고 배치 |\n| 하이라이트 소제목(옐로 바 안 텍스트) | 볼드 고딕 | Pretendard SemiBold~Bold | 20~24px | 잉크블랙(#1E1E1E) 텍스트 + 머스타드 옐로(#F0C44D) 배경 띠, 좌우 패딩 넉넉하게(약 24px), 텍스트만큼만 너비 차지(inline-block) |\n| 본문(하단 민트 패널, 중앙정렬 명조) | 명조/바탕 계열 | 나눔명조, Noto Serif KR, RIDIBatang | 18~20px | 레귤러~미디엄, 줄간격 1.8~2.0배로 넉넉하게, 한 문장씩 줄바꿈하여 리듬감(짧은 호흡 → 쉼표 → 마지막 줄만 길게) |\n| 마이크로 텍스트(페이지 번호, 챕터 표기 \"2-1\") | 산세리프 볼드 | Pretendard Bold | 28~34px | 흰색, 헤드라인과 같은 블록에 줄바꿈으로 이어붙임 |\n\n**교차·중첩 배치 조형 규칙**\n- 육각형 배지는 상단 사진과 하단 패널의 **경계선에 정확히 센터링**(배지 세로 중심이 경계선과 일치) — 배지 높이의 약 55~60%가 사진 영역을, 40~45%가 패널 영역을 덮도록 겹친다.\n- 배지 내부 2줄 텍스트는 **좌측 정렬이 아닌 자유 손글씨 느낌의 약한 좌측 쏠림**으로 배치하고, 영문(상)과 한글(하) 사이 행간을 타이트하게 붙여 \"한 덩어리의 사인\"처럼 보이게 한다.\n- 하단 본문은 **완전 중앙정렬**, 문장을 의미 단위로 끊어 한 줄에 하나씩(쉼표/접속어 지점에서 줄바꿈), 마지막 결론 문장만 길게 가로지르게 하여 시선이 멈추는 지점을 만든다.\n\n## 2. 사진과 그래픽의 조화 원칙\n\n- **피사체 분리**: 상단 사진은 중앙에 선명한 초점(쌓인 책더미)을 두고 좌우/배경은 강한 아웃포커스(보케)로 흐려, 텍스트 배지가 들어갈 중앙 하단 공간을 자연스럽게 \"비워둔다\". 사진을 고를 때부터 중앙 하단 1/4 지점에 배지를 얹어도 시각적으로 막히지 않는 여백(책더미와 배경 사이의 빈 공간, 혹은 바닥면)이 있어야 한다.\n- **마스킹**: 별도의 복잡한 마스크 없이 **정육각형(regular hexagon) 단색 도형**을 사진 위에 얹는 방식만 사용 — 도형 자체가 마스크이자 배지이다. 모서리는 날카로운 직선(라운드 처리 없음)으로 기하학적 대비를 유지한다.\n- **오버레이로 가독성 확보**: 커버형(Master 2)처럼 텍스트를 사진에 직접 얹을 때는 (a) 사진 자체의 어두운/채도 낮은 영역을 텍스트 배치 구역으로 고르거나, (b) 텍스트 블록 뒤에 `rgba(0,0,0,0.15~0.25)` 수준의 옅은 다크 그라데이션을 깔고, (c) 흰 텍스트에 약한 drop-shadow를 더해 3중으로 대비를 확보한다.\n- **색 연결**: 사진 속 자연 색(초록 잔디, 따뜻한 나무 톤, 보케 골드)과 하단 솔리드 컬러(민트)가 서로 보색에 가깝지 않고 **같은 \"차분한 파스텔 채도\"**를 공유하도록 사진을 보정(약간의 채도 다운 + 밝기 업)한다. 이것이 사진과 솔리드 패널이 \"한 장의 카드\"처럼 보이게 하는 핵심이다.\n\n## 3. 페이지별 구성요소 및 상세 배치 설계도\n\n캔버스 기준: 폭 1080px 고정, 랜딩페이지에서는 섹션 단위로 세로 스크롤되는 풀스크린(100vh) 블록으로 재현.\n\n### [Master 1] 메인 본문형 섹션 (사진 60 : 민트 40 분할)\n- **레이어 순서(아래→위)**: ① 상단 배경 사진(0~60% 높이, object-fit: cover) → ② 사진 하단 페이드 오버레이(55~60% 지점) → ③ 하단 민트 솔리드 패널(60~100% 높이, #D9F1EC) → ④ 중앙 하단 본문 텍스트 블록(패널 위, 상단 68%~95% 영역) → ⑤ 최상단 ��이어: 육각형 민트 배지(#A3DED1), 중심좌표 (가로 50%, 세로 58~60%), 배지 폭 약 320px / 높이 약 360px.\n- **배지 내부**: 상단 1/3에 영문 브러시 타이틀, 하단 2/3에 한글 손글씨 2줄, 전체 텍스트 블록은 배지 중심보다 살짝 위(배지 수직 중앙에서 -10%)로 쏠리게 배치.\n- **본문 텍스트 블록**: 가로폭 전체의 약 70%(최대 760px)로 제한, 중앙정렬, 좌우 패딩 150px 이상, 줄간격 1.9, 문단 상단 여백(배지 하단에서) 약 100px.\n- **반응형**: 모바일에서는 사진:패널 비율을 55:45로 조정, 배지 크기 폭 200~220px로 축소, 본문 폭은 뷰포트 85%로 확장.\n\n### [Master 2] 타이틀/커버형 섹션 (풀블리드 사진 + 좌측 정렬 헤드라인)\n- **레이어 순서**: ① 풀블리드 배경 사진(100% 높이, 상단에 밝은 영역·하단에 초록 질감) → ② 사진 전체에 옅은 다크 오버레이(필요 시, `rgba(0,0,0,0.1)`) → ③ 좌측 상단 영역(세로 8~15%)에 영문 스크립트 서브헤드(\"Start Reading\") → ④ 그 아래(세로 18~40%) 2줄 메인 헤드라인(흰색 볼드, 좌측정렬, x좌표 약 8% 지점부터 시작) → ⑤ 챕터 번호(\"2-1\", 헤드라인 톤 유지, 세로 40~48%) → ⑥ 옐로 하이라이트 바(세로 50~56%, 텍스트 폭에 맞춘 inline 배경 블록, 좌측정렬 유지).\n- **텍스트 정렬 축**: 모든 텍스트 요소(스크립트/헤드라인/챕터번호/하이라이트바)가 동일한 좌측 기준선(약 폭의 8~10% 지점)에 정렬되어 하나의 수직 텍스트 컬럼을 형성한다.\n- **여백**: 헤드라인 하단과 옐로 바 사이 간격은 타이트하게(약 24px), 전체 텍스트 컬럼 상단에는 뷰포트 높이의 8% 이상 여백을 두어 사진이 숨 쉴 공간 확보.\n\n### [Master 3] 간지(챕터 전환)형 섹션 — Master 1 변형\n- Master 1과 동일한 60:40 분할 구조를 유지하되, 배지 내부 텍스트를 \"챕터 숫자 + 짧은 소제목\"으로 교체(예: \"2\" + \"책을 고르는 법\"). 본문 영역은 비우거나 한 줄 요약 문구만 배치해 \"숨 고르기\" 역할을 하게 한다.\n\n### [Master 4] 목차형 섹션\n- 상단 60%는 동일한 사진 레이어를 재사용(시리즈 전체의 비주얼 일관성 유지), 하단 40% 민트 패널 안에 번호 리스트(1, 2, 3…)를 중앙정렬 세로 스택으로 배치. 각 리스트 항목은 본문 폰트(명조)보다 한 단계 굵게, 항목 간 간격 32px.\n\n### [Master 5] 인용구/핵심 문장형 섹션\n- 사진:패널 비율을 40:60으로 역전(문장이 메인일 때). 육각형 배지는 유지하되 내부 텍스트를 따옴표 기호 또는 짧은 키워드 하나로 단순화해 \"도장\"처럼 쓴다.\n\n### [Master 6] CTA(행동유도)형 섹션\n- 하단 패널 비중을 70~80%로 확대, 패널 색을 Secondary 옐로(#F0C44D)로 전환해 전체 색조에 변주를 주고, 중앙에 버튼(배지와 동일한 육각형 또는 라운드 사각형)을 CTA 컨테이너로 재활용.\n\n## 4. 만능 적용 공식\n\n### 주제별 비주얼 소재 치환 매트릭스\n\n| 주제 | 상단 사진 소재 | 배지/포인트 컬러 | 영문 브러시 타이틀 예시 | 한글 손글씨 부제 예시 |\n|---|---|---|---|---|\n| 독서/책 (원본) | 책더미 + 보케 조명 | 민트 #A3DED1 | Why | 책을 읽는 이유 |\n| 여행 | 캐리어·지도·창가 풍경 | 산호 핑크 #F2C6B4 | Why | 떠나야 하는 이유 |\n| 건강/운동 | 러닝화·물병·아침 햇살 | 세이지 그린 #B9D8B0 | How | 오늘도 움직이는 법 |\n| 재테크/머니 | 동전·플랜트·노트 | 머스타드 옐로 #F0C44D | Save | 돈을 모으는 습관 |\n| 육아 | 장난감·그림책·따뜻한 조명 | 라벤더 #D6C9EC | Why | 아이와 함께 읽는 시간 |\n| 커리어 | 노트북·커피·책상 | 스틸 블루 #B7D3E0 | Grow | 성장하는 하루 |\n\n### 복사해서 쓰는 스타일 고정 프롬프트\n\n```\n[사진 생성/보정 공통 스타일]\n따뜻하고 차분한 톤의 감성 사진, 중앙 피사체({주제 소재}는 선명하게 초점,\n배경은 강한 보케(아웃포커스) 처리, 색감은 채도를 살짝 낮추고 밝기를 올린\n파스텔톤 보정, 과도한 대비 없이 은은한 자연광/창가 조명 느낌.\n사진 하단 10~15%는 어떤 요소가 와도 시선을 가리지 않는 비교적 단순한\n배경(바닥면/여백)이 되도록 구도를 잡을 것.\n\n[레이아웃 고정 공식 — Master 1]\n- 캔버스 상단 60% : 사진, 하단 40% : 솔리드 컬러({포인트 컬러} 라이트톤)\n- 경계선 중앙(가로 50%, 세로 58~60% 지점)에 정육각형 배지 배치\n  (배지 컬러: {포인트 컬러} 진한톤, 모서리 각짐, 그림자 없음)\n- 배지 내부: 상단에 영문 브러시 캘리그래피 1단어, 하단에 한글 손글씨체\n  2줄 소제목, 두 텍스트는 블랙(#1E1E1E), 좌측으로 살짝 쏠리게 자유롭게 배치\n- 하단 패널 중앙정렬 명조 본문: 의미 단위로 줄바꿈, 줄간격 1.8~2.0배,\n  폭은 전체의 70% 이내로 제한, 마지막 문장만 길게\n\n[레이아웃 고정 공식 — Master 2 (커버형)]\n- 풀블리드 사진 위 좌측정렬 텍스트 컬럼(기준선: 가로 8~10%)\n- 순서(위→아래): 영문 스크립트 서브헤드(흰색 반투명) → 2줄 볼드 헤드라인\n  (흰색, 사진 대비 확보용 옅은 다크 오버레이 또는 text-shadow) → 챕터번호\n  → {포인트 컬러} 하이라이트 바(텍스트 폭만큼, 블랙 텍스트)\n\n색상 규칙: 전체 2색 원칙(포인트 컬러 + 잉크블랙) 엄수, 그 외는 사진의\n자연색에만 의존. 민감한 텍스트 가독성이 필요한 경우에만 최소한의\n오버레이/그림자 추가.\n```","previewUrl":"https://hopedesign.notion.site/image/https%3A%2F%2Fpostfiles.pstatic.net%2FMjAyMTAzMTVfMTM3%2FMDAxNjE1Nzk0MDQ2ODkw.VmeKB4bHqF3yCdRbuoeSvm_E5ILRhXrUMh9IOjeeu5Ig.NjdoYovOv-T_edSprZ_4S6skXTsk7BYIQjz_Hyy63wAg.JPEG.hopestory21%2F%25EB%258F%2585%25EC%2584%259C%25EC%258A%25B5%25EA%25B4%2580-%25EB%25A7%258C%25EB%2593%25A4%25EA%25B8%25B0-2_1-002.jpg%3Ftype%3Dw966?table=block&id=3bd46c4a-7307-409b-af35-f4c869a5c18c&cache=v2","source":{"type":"url","url":"https://hopedesign.notion.site/177e70bd314b48e182e79c4614276920"},"tokens":{"primary":"#A3DED1","secondary":"#F0C44D","bg":"#D9F1EC","text":"#1E1E1E","font":"serif"}},
  {"id":"url-notion-landing-e","part":"landing","layout":"event","name":"잇츠브랜딩 온리원 인터뷰형","ref":"노션 캡처에서 복제: 강점브랜딩, 브랜딩","guide":"1. **단일 톤 몰입(Mono-Vivid Immersion)** — 배경 전체를 하나의 고채도 옐로우로 통일해 \"전문가=강렬한 존재감\"이라는 인상을 만든다. 색을 여러 개 쓰지 않고 한 가지 비비드 컬러에 흑백 콘트라스트를 더해 브랜드 각인력을 극대화한다.","guideMd":"# 디자인 가이드 — ITS BRANDING \"ONLY ONE\" 퍼스널 브랜딩 인터뷰형 랜딩\n\n## 1. 전체 디자인 시스템\n\n### 1.1 핵심 디자인 철학\n\n1. **단일 톤 몰입(Mono-Vivid Immersion)** — 배경 전체를 하나의 고채도 옐로우로 통일해 \"전문가=강렬한 존재감\"이라는 인상을 만든다. 색을 여러 개 쓰지 않고 한 가지 비비드 컬러에 흑백 콘트라스트를 더해 브랜드 각인력을 극대화한다.\n2. **프레임 속 인물 탈출(Frame-Break Portrait)** — 흰색 라인 사각 프레임을 캔버스 안에 둔 뒤, 인물사진을 프레임 경계선을 넘어 튀어나오게 배치한다. 이는 \"틀에 갇히지 않는 단 하나의 브랜드\"라는 메시지를 레이어 깊이감으로 시각화하는 핵심 모티프다.\n3. **극단적 타이포 위계(Oversized Hero Type)** — 캡션·바디는 작게, 메인 카피(ONLY ONE / 브랜드를 만나다)는 캔버스 폭의 절반 이상을 차지할 만큼 초대형으로 키운다. 흰색 영문 대문자 + 퍼플 포인트 한글 조합으로 \"국제적 전문성 + 개성\"을 동시에 전달한다.\n4. **Q&A 인터뷰 포맷의 신뢰 구조** — 노란 알약형 'Q' 라벨 + 흰 둥근 바 질문, 현장 스냅샷, 하단 볼드 밑줄형 답변으로 이어지는 3단 구조. 광고가 아니라 \"인터뷰 기사\"처럼 읽히게 해 신뢰도와 진정성을 높인다.\n\n### 1.2 컬러 팔레트 및 그라데이션 공식\n\n| 구분 | 컬러명 | HEX | RGB | 적용 영역 및 역할 |\n|---|---|---|---|---|\n| Primary | 시그니처 비비드 옐로우 | #FFC72C | rgb(255,199,44) | 전체 배경(표지), Q 라벨 알약 배경, 브랜드 아이덴티티 컬러 |\n| Primary Deep | 딥 옐로우(그라데이션용) | #F5A623 | rgb(245,166,35) | 배경 하단부 그라데이션 끝단, 인물 뒤 음영 영역 |\n| Secondary | 바이브런트 퍼플 | #6B2FD6 | rgb(107,47,214) | 메인 한글 타이틀(\"브랜드를 만나다\") 포인트 컬러, 하단 답변 텍스트 밑줄 강조색 |\n| Neutral Dark | 잉크 블랙 | #1A1A1A | rgb(26,26,26) | 인물 수트(슈트 컬러), 하단 답변 핵심 문장 텍스트, 본문 진한 텍스트 |\n| Neutral Light | 퓨어 화이트 | #FFFFFF | rgb(255,255,255) | 로고 타입, 프레임 라인, ONLY ONE 타이틀, 서브 캡션, Q 질문 바 배경 |\n| Accent | 머스터드 옐로우(답변 보조톤) | #D9A441 | rgb(217,164,65) | 하단 흰 영역 내 비강조 답변 문장(부연 설명 톤 다운 컬러) |\n\n**시그니처 그라데이션 공식**: `linear-gradient(165deg, #FFC72C 0%, #F5A623 100%)` — 좌상단에서 우하단으로 약 15도 기울어진 단색조 그라데이션. 인물 피사체 뒤쪽에 은은한 원형 비네트(`radial-gradient(circle at 70% 55%, rgba(255,255,255,0.08), transparent 60%)`)를 겹쳐 입체감 부여.\n\n**오버레이 공식**: 현장 스냅샷 사진 위에는 `rgba(0,0,0,0.05)` 미세 다크 오버레이로 톤을 낮춰 상단 Q라벨·텍스트 가독성 확보. 사진 하단에는 흰색 블록으로 즉시 컷오프(크롭)하여 텍스트 영역과 분리.\n\n### 1.3 타이포그래피 시스템\n\n| 위계 요소 | 원본 폰트(추정) | 한글 대체 추천 | 크기(기준 1440px 폭) | 굵기·스타일 규칙 |\n|---|---|---|---|---|\n| 상단 로고 타입 | Poppins/Montserrat Bold | Pretendard Bold | 28~32px | 흰색, 자간 넓게(+2%), 전부 대문자, 작은 원형 로고 아이콘과 좌측 정렬 조합 |\n| 메인 타이틀(영문) | Poppins ExtraBold/Black | Pretendard Black | 96~120px | 흰색, 좌측 정렬, 행간 타이트(0.95), 2줄 적층(\"ONLY\"/\"ONE\") |\n| 메인 타이틀(한글 포인트) | 티몬 몬소리체/강한 고딕 계열 | Black Han Sans 또는 Pretendard Black | 72~88px | 퍼플(#6B2FD6), 영문 타이틀과 동일 좌측 그리드에서 줄바꿈 2줄(\"브랜드를/만나다\") |\n| 서브 캡션(직함) | Pretendard SemiBold | Pretendard SemiBold | 22~24px | 흰색, 인물명 바로 위, 일반 폭 |\n| 인물명 | Pretendard ExtraBold | Pretendard ExtraBold | 40~44px | 흰색, 서브 캡션 대비 1.8배 크기로 강조 |\n| Q 라벨(\"Q\") | Poppins Bold | Pretendard ExtraBold | 36px | 흰색 원문자, 옐로우 알약 배경 안에 중앙 정렬 |\n| 질문 텍스트 | Pretendard Bold | Pretendard Bold | 26~28px | 짙은 네이비/블랙, 흰 둥근 바 안 중앙 정렬, 좌측에 Q 알약과 겹침 배치 |\n| 본문 답변(핵심 강조구) | Pretendard ExtraBold | Pretendard ExtraBold | 32~36px | 블랙(#1A1A1A), 문장 내 핵심 구절만 굵게 + 밑줄 또는 대비 처리 |\n| 본문 답변(부연 설명) | Pretendard Medium | Pretendard Medium | 24~26px | 옐로우 톤다운(#D9A441 또는 회색 혼합), 핵심구보다 확연히 연하게 |\n\n**교차·중첩 배치 조형 규칙**: ① 영문 타이틀과 한글 타이틀은 동일한 좌측 기준선(x축)에서 수직으로 쌓되, 한글은 퍼플로 전환해 \"국문 포인트\"를 만든다. ② 인물 사진은 프레임 우측 변을 가로질러 머리~어깨가 흰 라인 위로, 하반신이 프레임 아래 경계선 아래로 삐져나오게 배치해 Z축 레이어감을 만든다. ③ 질문 바(Q)는 사진 영역 상단에 반쯤 걸치도록 겹쳐, \"현장성 + 코멘터리\" 느낌을 준다.\n\n## 2. 사진과 그래픽의 조화 원칙\n\n- **피사체 분리(컷아웃)**: 인물사진은 배경을 제거(또는 자연 배경을 단색 배경으로 대체)한 풀샷 컷아웃으로 사용, 비비드 옐로우 배경 위에 자연스럽게 합성되도록 그림자 없이 플랫하게 배치한다.\n- **프레임 마스킹**: 흰색 1~2px 두께의 얇은 사각 라인 프레임을 캔버스 중앙에 배치하고, 인물의 상반신(얼굴~어깨)은 프레임 '안쪽' 경계선 위에 겹치고, 하반신은 프레임 '바깥'으로 나가게 하여 마스킹 레이어 순서를 역전시킨다(인물이 프레임보다 항상 위 레이어).\n- **가독성 확보 기법**: 텍스트가 배치되는 좌측 상단~중단 구역에는 인물·그래픽 요소를 절대 배치하지 않는 '세이프존'을 확보한다(프레임 내부 좌측 60% 영역). 현장 사진 위에 텍스트를 얹을 때는 사진 자체에 미세 다크 오버레이를 적용하거나, 텍스트를 사진 바깥 흰 블록 영역에 배치해 대비를 만든다.\n- **현장감 오버레이**: 촬영 현장 스냅샷(카메라 모니터, 스튜디오 등)은 색보정 없이 원본 그대로 사용해 \"신뢰할 수 있는 리얼리티\"를 주되, 상단에 비비드 옐로우 Q라벨을 얹어 브랜드 컬러 시스템과 연결한다.\n\n## 3. 페이지별 구성요소 및 상세 배치 설계도\n\n### [Master 1] 표지 / 커버 슬라이드 (source-1 유형)\n- 캔버스: 800×800(정방형, 1:1) 기준\n- 배경: 풀캔버스 비비드 옐로우(#FFC72C), 상단에서 하단 그라데이션(#FFC72C→#F5A623)\n- **레이어 순서(아래→위)**: ① 배경 그라데이션 → ② 흰색 라인 프레임(x:80~720, y:95~705, 두께 2px, 사각형 단순 선) → ③ 인물 컷아웃 사진(x:330~800, y:120~800, 프레임 경계를 가로질러 배치, 하반신 프레임 하단 경계 넘어 캔버스 끝까지) → ④ 텍스트 블록(프레임 내부 좌측) → ⑤ 로고(최상단)\n- 좌표/비율 상세:\n  - 로고 \"IT'S BRANDING\": 상단 중앙 정렬, y: 30~55px, 폭 캔버스의 40%\n  - \"ONLY / ONE\": x:115, y:145~290, 폭은 캔버스의 35%, 2줄 적층, 흰색\n  - \"브랜드를 / 만나다\": x:115, y:290~430, 퍼플, 영문 타이틀 바로 아래 이어서 배치\n  - 직함 캡션(\"강점브랜딩 전문가\"): x:115, y:555~575, 흰색, 작게\n  - 인물명(\"장이지\"): x:115, y:580~630, 흰색, 캡션 대비 확대\n  - 인물 사진: 프레임 우측 절반을 차지, 얼굴 중심이 프레임 상단 라인보다 약간 위(y≈110), 발끝이 캔버스 최하단까지 닿음\n- 전체 비율: 좌측 40%는 텍스트 전용 세이프존, 우측 60%는 인물 중심 비주얼존, 둘이 프레임 중앙에서 자연스럽게 겹침\n\n### [Master 2] 목차 / 질문 인덱스형 (추정 — 다음 섹션으로 이어지는 중간 안내 슬라이드)\n- 배경: 동일 옐로우 또는 화이트 반전\n- 상단: 작은 로고 유지\n- 중앙: 큰 번호(01, 02, 03) + 각 인터뷰 질문 리스트를 흰 라운드 바 형태로 세로 나열\n- 레이어: 번호(퍼플, 대형) → 질문 텍스트(블랙, 흰 바 위) → 장식용 사각 프레임 모티프 반복\n\n### [Master 3] 인터뷰 Q&A 본문형 (source-2 유형)\n- 캔버스: 800×800\n- **레이어 순서**: ① 배경 흰색(#FFFFFF) → ② 상단 현장 사진 블록(y:0~430, 풀 블리드 가로, 상하 자연스러운 컷오프) → ③ Q 라벨 알약(사진 상단에 절반 겹침) → ④ 질문 텍스트 바(흰 라운드, 옐로우 알약 우측 이어짐) → ⑤ 하단 답변 텍스트 블록(y:460~750)\n- 좌표/비율 상세:\n  - Q 알약: x:40, y:50~105, 원형 옐로우 배경(지름 55px) 안에 흰 \"Q\"\n  - 질문 바: x:105~740, y:55~100, 모서리 radius 40px, 배경 #1A1A1A(짙은 남색/블랙), 텍스트 흰색 중앙 정렬, Q 알약과 10~15px 겹침\n  - 현장 사진: x:0~800, y:120~600, 풀블리드, 카메라 모니터/인물이 프레임 중앙에 오도록 크롭\n  - 하단 답변 영역: 배경 화이트, y:610~800, 좌우 패딩 60px, 중앙 정렬 텍스트, 첫 문장(핵심구)은 블랙 볼드 + 밑줄, 이어지는 2줄은 옐로우 톤다운 톤\n- 비율: 사진:텍스트 = 약 6:4(세로 기준), 질문 바가 사진 상단 20%를 침범하는 구조로 레이어 깊이 형성\n\n### [Master 4] 비포/애프터 또는 수치 강조형 (추정 확장 슬라이드)\n- 배경: 옐로우 또는 화이트\n- 대형 숫자/통계를 퍼플 또는 블랙으로 초대형 배치, 보조 설명은 하단 소형 텍스트\n- 프레임 모티프(흰 라인 사각형)를 축소된 형태로 재사용해 시리즈 일관성 유지\n\n### [Master 5] 클로징 / CTA형 (추정)\n- 배경: 비비드 옐로우로 회귀(표지와 수미상관)\n- 중앙 상단: 로고\n- 중앙: \"ONLY ONE\" 반복 또는 대표 캐치프레이즈 재노출\n- 하단: 버튼형 CTA(흰 라운드 바 + 블랙 텍스트, \"자세히 보기\" 등), 인물 사진 재사용(측면 크롭)\n\n### [Master 6] 프로필/저자소개형 (추정)\n- 좌측: 인물 풀샷(프레임 내부에 완전히 담김, 표지와 달리 튀어나오지 않음 — \"소개\" 맥락이므로 안정적 배치)\n- 우측: 약력 bullet list, 각 항목 앞 퍼플 사각 불릿 아이콘\n- 하단: SNS/연락처 아이콘 바\n\n## 4. 만능 적용 공식\n\n### 주제별 비주얼 소재 치환 매트릭스\n\n| 주제 | Primary 배경색 치환 | 인물/피사체 | 메인 타이틀 예시 | Q&A 질문 예시 |\n|---|---|---|---|---|\n| 퍼스널 브랜딩(원본) | 비비드 옐로우 #FFC72C | 정장 차림 전문가 풀샷 | ONLY ONE 브랜드를 만나다 | 지금의 자리에 있게 한 비법이 있다면? |\n| 재테크/금융 전문가 | 딥 그린 #1F7A4D | 슈트+자료 들고 있는 포즈 | THE ONLY 자산을 지키다 | 가장 많이 받는 질문 하나를 꼽는다면? |\n| 뷰티/스타일 전문가 | 코랄 핑크 #FF6F91 | 화사한 톤 의상, 반신 포즈 | ONLY YOU 스타일을 완성하다 | 나만의 시그니처 노하우가 있다면? |\n| 교육/강사 브랜딩 | 딥 블루 #2E4FD9 | 화이트보드/교재 배경 | ONLY EXPERT 배움을 설계하다 | 수강생들이 가장 많이 바뀌는 지점은? |\n| 헬스/피트니스 코치 | 라임 그린 #8BC53F | 트레이닝복, 액티브 포즈 | ONLY FIT 한계를 넘다 | 꾸준함을 만드는 본인만의 루틴은? |\n| F&B 셰프/오너 | 딥 오렌지 #E8641C | 셰프복, 주방/매장 배경 | ONLY TASTE 맛을 완성하다 | 이 메뉴를 만든 결정적 계기는? |\n\n치환 규칙: Primary 배경색만 바꾸고, Secondary(포인트 한글 컬러)는 배경과 보색~유사색 관계를 유지하는 퍼플/딥블루/마젠타 계열 중 택1. 흰색 프레임·로고·Q&A 구조·타이포 위계는 모든 주제에서 고정.\n\n### 복사해서 쓰는 스타일 고정 프롬프트\n\n```\n스타일: \"ONLY ONE\" 퍼스널 브랜딩 인터뷰형 랜딩 디자인\n- 배경: 단일 비비드 컬러 풀캔버스(#FFC72C 옐로우 기준, 주제에 맞게 치환), 상단→하단 15도 각도 단색조 그라데이션\n- 프레임: 캔버스 중앙에 흰색 2px 사각 라인 프레임 배치, 상하좌우 여백 균등\n- 인물: 피사체를 배경 제거한 컷아웃 풀샷으로, 프레임 우측 경계를 가로질러 상반신은 프레임 안쪽 라인 위, 하반신은 프레임 바깥 아래로 돌출시켜 배치 (레이어 순서: 프레임 < 인물)\n- 타이포: 좌측 정렬 고정 그리드. 영문 캐치프레이즈(초대형, 흰색, ExtraBold/Black, 2줄 적층) 바로 아래 한글 포인트 카피(동일 크기대, 퍼플 #6B2FD6, 2줄 적층) 이어 배치. 그 아래 소형 직함 + 대형 이름(흰색) 배치\n- 상단: 작은 흰색 로고 타입, 중앙 정렬\n- 톤: 활기차고 전문적인 대비감, 장식 요소 최소화, 색은 비비드 메인색+흰색+블랙+퍼플 4색 이내로 제한\n- 보조 섹션(인터뷰 Q&A): 흰 배경, 상단에 현장 스냅샷(풀블리드, 보정 없는 리얼 톤) + 좌상단에 원형 옐로우 'Q' 알약과 겹친 다크 라운드 질문 바, 하단에 센터 정렬 답변 텍스트(핵심 문장 블랙 볼드+밑줄, 부연 설명은 톤다운 컬러로 약하게)\n```","previewUrl":"https://hopedesign.notion.site/image/https%3A%2F%2Fk.kakaocdn.net%2Fdn%2Fb3uvTm%2Fbtrcf7U6L3s%2FBvg2s4ycG9Aj72OSjlhD3k%2Fimg_l.jpg?table=block&id=bf13b4f0-c63b-4c17-8326-67ef737fd400&cache=v2","source":{"type":"url","url":"https://hopedesign.notion.site/e2b41c8dd04744879e7e22074b37a4cf"},"tokens":{"primary":"#FFC72C","secondary":"#6B2FD6","bg":"#FFFFFF","text":"#1A1A1A","font":"sans"}},
  /* ===== 링크 복제 끝 ===== */
];


/* =====================================================
 * 디자인 가이드 명세 — 각 레이아웃의 요소를 분별한 구조 스펙.
 * "이 문서만 보고 그대로 재현"이 목표. (md 다운로드의 원천)
 * ===================================================== */
const PART_STRUCTURES = {
  ppt: [
    '캔버스: 1280×720px (16:9), 슬라이드 패딩 상하 70px / 좌우 90px',
    '기본 레이아웃은 4장(표지·안내·소개·마무리), 북극광 에디토리얼은 표지·목차·스토리 리드·본문 마스터 반복·요약으로 확장',
    'PPTX/원고 입력 시 섹션 길이에 따라 본문 페이지를 동적으로 추가하며, 전체 슬라이드 수와 네비게이션은 생성된 문서의 실제 페이지 수로 계산',
    '이미지는 대표 컷·섹션 컷·파노라마·원형 콜라주에 배치; 업로드 사진 우선, 없으면 공개 이미지 검색 후 출처 표기',
    '페이지 번호는 우하단 고정, 인쇄 시 슬라이드마다 페이지 나눔',
  ],
  poster: [
    '캔버스: 세로형, 가로:세로 = 1:1.414 (A계열 종이 비율), 기준 폭 640px',
    '구성(위→아래): 킥커(부제) → 제목 → 대표 이미지 → 설명 → 하단 정보(일시·장소·문의)',
    '대표 이미지: 포스터 높이의 20~26%, 배경 cover 방식',
    '하단 정보는 margin-top:auto로 항상 바닥에 붙임',
  ],
  doc: [
    '캔버스: A4 세로(794×1123px 기준), 페이지 패딩 64×72px, 2~6페이지',
    '구성: 표지/개요(제목·대상·일시·작성자) → 본문 섹션들(표 적극 사용) → 마무리/체크리스트',
    '머리말 띠·섹션 라벨·표 머리행에 주색 적용, 본문은 잉크색 단정한 고딕',
    'AI가 자료를 근거로 문서 본문을 직접 집필한다 (구조화·목표 문장화·단계 설계)',
  ],
  landing: [
    '구성: 히어로(제목+CTA) → 정보 영역 → 소개/본문 → 반복 CTA → 참고 링크 → 푸터',
    '반응형: 모바일에서 다단 그리드는 1단으로 접힘',
    'CTA 버튼: 알약형(border-radius 999px), 패딩 16×44px, 굵기 800',
    '대표 이미지: 히어로 배경 또는 본문 상단 와이드 이미지로 배치',
  ],
};

const LAYOUT_SPECS = {
  /* ---- PPT ---- */
  'ppt:boldtypo': [
    '표지 제목: 110px / 굵기 900 / 자간 -0.02em — 화면의 주인공은 글자',
    '부제(배지): 포인트색 글자 24px / 자간 0.15em / 굵기 800',
    '내지 제목: 56px / 굵기 900, 장식 없음',
    '안내 라벨(날짜·장소)은 포인트색, 본문은 검정 — 색은 포인트 1곳 원칙',
    '배경: 순백(#fff급), 장식 요소 전혀 없음',
  ],
  'ppt:dark': [
    '배경: 짙은 남색(#0b0f1a급) 전체 통일, 글자는 밝은 회백',
    '글로우 라인: 상단 좌→우 그라데이션 2px 선 + 같은 색 box-shadow 18px (네온 효과)',
    '부제(배지): 형광 포인트색 1px 테두리 알약형, 배경 없음',
    '내지 제목·라벨: 형광 포인트색',
    '포인트색은 형광 계열 1색만 (민트/라임/시안 중 택1)',
  ],
  'ppt:editorial': [
    '정렬: 모든 슬라이드 가운데 정렬 (잡지 속표지 문법)',
    '글꼴: 명조(세리프) — 제목 굵기 600, 가볍게',
    '구분선: 폭 70px / 1px / 투명도 50% 가는 선을 제목 아래',
    '부제: 자간 0.4em 벌려 소제목처럼, 포인트색(황토)',
    '본문 행간 2.0 — 여백이 디자인의 절반',
  ],
  'ppt:earthy': [
    '좌측 세로 바: 폭 26px, 딥그린 — 전 슬라이드 공통 아이덴티티',
    '제목: 딥그린(#1a3c34급), 배경은 크림(#f7f4ee급)',
    '부제(배지): 테라코타 배경 + 흰 글자, 모서리 6px',
    '포인트색은 테라코타(#c2410c급) 1색 — 라벨·강조에만',
    '전체 인상: 채도 낮은 자연색, 대비는 명도로',
  ],
  'ppt:corporate': [
    '머리말 띠: 상단 높이 58px 네이비 배경 + 흰 글자(회사/주최명) — 전 슬라이드 고정',
    '내지 제목: 네이비 + 아래 3px 포인트색(청록) 밑줄',
    '본문 시작은 띠 아래 110px부터 (머리말과 간섭 금지)',
    '라벨은 네이비, 값은 진회색 — 2색 체계',
    '배경 순백, 장식은 밑줄·띠 2가지만',
  ],
  'ppt:arctic': [
    '01 표지: 16:9 풀블리드 사진, 중앙 원형 라인(슬라이드 높이의 78%, 흰색 5px), 원 내부 제목. 전경 북극곰 실루엣이 원 라인을 일부 가린다. 좌우 가장자리에 10px 세로 마이크로타입.',
    '02 목차: 어두운 오로라 사진, 중앙 Contents 60px 굵은 고딕. 아래에 37px 민트 필기체를 50% 불투명도로 겹친다. 번호 목록은 장당 10개 이내(5행×2열), 초과하면 목차 장을 추가한다. 행간 2.0, 아이콘·박스 금지.',
    '03 스토리 리드: 우측 55% 풍경/주제 사진, 좌측에 시안 블루→투명 수평 오버레이. 좌측 9% 여백에서 필기체 킥커, 네이비 제목, 270자 이내 도입. 우측 아래 반투명 워터마크.',
    '04 본문 A — 사진+캡슐: 풀블리드 사진과 하늘색 상단 워시, 중앙 필기체 제목. 본문은 폭 60% 라운드 캡슐 안에 두며 민트→시안 그라데이션 55% 불투명도, 본문 흰색 19px.',
    '05 본문 B — 비대칭 분할: 좌측 57% 피사체 클로즈업을 크게 두고 오른쪽으로 흰색 페이드. 우측 38%는 시안 필기체 제목과 회색 본문. 사각 프레임 없이 사진과 여백을 부드럽게 연결.',
    '06 본문 C — 원형 배지: 상단 50% 흰 여백, 하단 50% 풀폭 파노라마. 경계에 걸친 정원 배지의 지름은 슬라이드 높이의 55%, 중심은 X18%·Y55%. 우상단 텍스트 블록은 배지와 겹치지 않게 분리.',
    '07 본문 D — 이중 원형 콜라주: 왼쪽 대형 원 이미지(47%)와 좌하단 24% 소형 원을 7시 방향으로 겹친다. 우측 상단 필기체 제목, 하단 긴 본문. 원형 이미지의 초점은 서로 다른 장면을 고른다.',
    '08 요약·마무리: 흰 배경, 실제 원고의 마지막 세 섹션에서 제목·요약을 가져와 3개 원형 번호 카드로 배치. 데이터 입력이 없으면 차트 수치나 통계를 만들지 않는다. 마지막에 감사 문구·호스트·이미지 크레딧.',
  ],
  'ppt:winterland': [
    '캔버스: 16:9, 따뜻한 오프화이트 #F8F7F2 70% 이상. 포레스트 그린은 제목·구조선, 베리 레드는 날짜·핵심 수치·소형 배지에만 사용.',
    '서체 위계: 제목은 Georgia 계열 명조 44~64px, 본문은 Calibri/Pretendard 고딕 20~26px. Fave Script Pro 같은 손글씨는 짧은 계절 인사나 한 단어에만 대체 사용하고 본문에는 쓰지 않는다.',
    '표지: 겨울 숲·설산·눈 덮인 마을 사진을 화면 오른쪽 45% 또는 풀블리드 배경으로 크게 배치. 어두운 그린 오버레이를 얇게 얹고 왼쪽 하단에 제목·부제를 둔다. 붉은 포인트는 작은 리본/선 하나로 제한.',
    '섹션·본문: 상단에 작은 붉은 섹션 번호와 얇은 그린 구분선, 아래 큰 명조 제목. 본문은 2열 또는 3개 카드 그리드로 묶고 카드 배경은 흰색, 테두리는 연한 웜그레이.',
    '사진과 도표: 풍경 사진은 가로형 16:9 또는 4:3 프레임으로 통일하고 한 페이지에서 1~2장만 쓴다. 차트·다이어그램은 그린 기본, 레드 강조 1계열로 단순화한다. 목업 이미지는 밝은 여백과 얇은 그림자를 둔다.',
    '마무리: 크림 바탕에 설경 사진의 넓은 하단 띠, 중앙 명조 감사 문구, 손글씨는 짧은 인사에만 사용. 눈송이 장식은 구석에 작게 두고 사진의 디테일과 경쟁시키지 않는다.',
    '색·사진 조화: 눈의 흰색을 날리지 않도록 중간톤을 살리고, 그린 숲과 레드 포인트가 사진에 이미 강할 때는 보조색 사용량을 줄인다. 강한 네온·청록 색보정·복수의 스크립트 서체는 피한다.',
  ],
  /* ---- 포스터 ---- */
  'poster:bigtypo': [
    '제목: 74px / 굵기 900 / 행간 1.02 — 포스터 폭을 꽉 채움',
    '킥커: 포인트색(빨강) 16px / 자간 0.25em / 굵기 800',
    '대표 이미지: 높이 24%, 제목 바로 아래',
    '굵은 가로 바: 높이 14px 검정 — 이미지와 설명 구분',
    '하단 정보: 상단 3px 실선 위 구분, "일시 · 값" 형식',
  ],
  'poster:neon': [
    '배경: 거의 검정(#09090b급)',
    '네온 프레임: 안쪽 18px 지점에 형광색 2px 테두리 + 바깥/안쪽 글로우(box-shadow)',
    '제목: 62px / 굵기 900 / 가운데 / 형광색 + text-shadow 글로우 2겹(14px, 44px)',
    '대표 이미지: 폭 80% 가운데, 형광 1px 테두리 + 글로우',
    '정보: 가운데 정렬, ⚡·📍 이모지 라벨',
  ],
  'poster:nouveau': [
    '액자: 바깥 3px 이중선(double) + 안쪽 8px 지점 1px 보조색 선 — 이중 프레임',
    '제목: 명조 52px, 딥그린',
    '장식 문양: ❦ ❦ ❦ (황토색) — 제목과 이미지 사이',
    '대표 이미지: 높이 22%, 보조색 1px 테두리',
    '전체 가운데 정렬, 하단 정보는 라벨 없이 값만 나열',
  ],
  'poster:warmgrad': [
    '배경: 퍼플→오렌지 160도 대각 그라데이션',
    '제목: 흰색 58px / 굵기 900 + 그림자(0 2px 12px 검정 25%)',
    '정보 카드: 흰색 93% 불투명, 모서리 18px, 내부는 왼쪽 정렬',
    '대표 이미지: 카드 안 최상단 높이 170px, 모서리 12px',
    '카드가 margin-top:auto로 하단에 붙음 — 위는 제목, 아래는 정보의 2단 구조',
  ],
  'poster:retro': [
    '외곽 보더: 6px 단색(갈색) 액자 + 하단 3px 점선 구분',
    '스탬프 배지: 우상단 86px 원형, 3px 점선 테두리, 12도 기울임',
    '킥커: 갈색 배경 + 크림 글자 리본형',
    '제목: 56px / 굵기 900 / 갈색, 아래 ✶ ✶ ✶ 장식(황토)',
    '대표 이미지: 높이 20%, 3px 갈색 테두리',
  ],
  /* ---- 랜딩 ---- */
  'doc:lesson': [
    '표지/개요: 상단 주색 머리말 띠(과목·차시), 제목 32px/800, 메타 표(대상·시간·장소·강사)',
    '학습목표: 번호 리스트 2~4개, 행동 동사로 끝나는 목표 문장',
    '수업 단계표: 단계(도입/전개/정리) | 교수·학습 활동 | 시간 | 자료·준비물 4열 표, 머리행 주색',
    '활동 상세: 단계별 소제목 + 발문 예시(인용 박스) + 유의점(보조색 라벨)',
    '마무리: 평가 기준 체크리스트 + 과제 안내',
  ],
  'doc:proposal': [
    '표지: 제목 36px/900 + 한 줄 핵심 제안 + 작성자/일자, 주색 포인트 바',
    '배경·문제: 현황 2~3문단 + 핵심 문제 박스(보조색 테두리)',
    '목표·전략: 목표 3개(숫자 카드) → 전략별 소제목+설명',
    '실행 계획: 단계 | 내용 | 일정 | 담당 4열 표',
    '예산·기대효과: 항목별 표 + 기대효과 불릿, 마지막 요청 사항 강조 박스',
  ],
  'doc:report': [
    '머리말: 보고서명·기간·작성자 3단 정보 띠',
    '개요: 핵심 요약 3~5줄 (리드 문단, 조금 큰 글자)',
    '진행 현황: 항목 | 계획 | 실적 | 달성률 표, 달성률은 주색 강조',
    '성과·이슈: 성과 불릿 + 이슈/리스크 박스(보조색)',
    '다음 단계: 번호 리스트 + 일정, 하단 승인/확인란',
  ],
  'landing:event': [
    '히어로: 대표 이미지 배경 + 어두운 오버레이(검정 62%→주색), 가운데 정렬, 제목 최대 76px/900',
    'CTA: 형광 노랑 알약 버튼, 검정 글자 — 어두운 배경과 최대 대비',
    '정보 카드 3개: 반투명 흰(6%) 배경 + 흰 14% 테두리, 날짜/장소/주최',
    '소개 섹션: 폭 700px 가운데, 소제목은 포인트색',
    '마지막에 CTA 1회 반복 — 내비게이션 없음(이탈 경로 차단)',
  ],
  'landing:sales': [
    '헤드라인: 빨강 계열 최대 56px/900 — 약속형 문장',
    '대표 이미지: 헤드라인 아래 폭 760px, 높이 320px, 모서리 16px',
    '혜택 목록: ✔(초록) 불릿, 설명의 앞 4줄이 자동으로 혜택이 됨',
    'CTA 2회: 혜택 직후 + 페이지 끝 (세일즈 레터 공식)',
    '상세 본문: 폭 640px, 행간 1.95 — 긴 글 읽기 최적화',
  ],
  'landing:saas': [
    '상단 고정 내비: 블러 배경 + 로고(주최명) + 작은 CTA — 스크롤 내내 따라옴',
    '히어로: 가운데, 제목 최대 62px/900/자간 -0.02em, 아래 CTA 1개',
    '대표 이미지: 히어로 아래 폭 980px 와이드 스크린샷 자리, 그림자',
    '벤토 그리드: 4열, 카드 모서리 20px — 핵심카드는 2칸(주색 배경), 나머지는 흰 카드',
    '모바일: 그리드 2열→1열 접힘',
  ],
  'landing:register': [
    '2단 분할: 왼쪽 1.1 : 오른쪽 1 비율 — 왼쪽 정보, 오른쪽 신청 폼',
    '왼쪽: 대표 이미지(높이 230px) → 킥커 → 제목 → 일시/장소/주최 → 설명',
    '폼 카드: 흰 배경 + 큰 그림자(0 12px 36px), 모서리 20px — 떠 있는 느낌',
    '폼 필드: 이름/연락처(필수) + 메모, 제출 버튼은 포인트색 전체 폭',
    '다른 링크 없음 — 등록 하나에만 집중 (전환 최적화)',
  ],
  'landing:story': [
    '머리: 가운데 정렬, 명조 제목 최대 54px, 아래 80px 포인트색 가는 선',
    '대표 이미지: 본문과 같은 폭(680px), 각진 모서리(6px) — 잡지 화보 느낌',
    '본문: 폭 620px / 18px / 행간 2.1',
    '드롭캡: 첫 문단 첫 글자 2.6배 확대, 주색',
    'CTA는 글이 끝난 뒤 1개만 — 서사가 먼저, 판매는 나중',
  ],
};

/* 디자인 가이드 md 문서 생성 — "이 문서만 보고 재현" */
function generateGuideMd(design) {
  const t = design.tokens;
  const partName = { ppt: 'PPT(발표자료)', poster: '포스터', landing: '랜딩페이지' }[design.part];
  const layoutName = (LAYOUTS[design.part].find(l => l.id === design.layout) || {}).name || design.layout;
  const key = design.part + ':' + design.layout;
  const spec = LAYOUT_SPECS[key] || [];
  const structure = PART_STRUCTURES[design.part] || [];
  const isAurora = key === 'ppt:arctic';
  const typography = isAurora
    ? ['Display: Montserrat/Pretendard ExtraBold 54–68px, tracking -0.055em, line-height .96–1.08; bold white nouns on dark photo.', 'Emotional accent: available brush script at 36–52px, mint/cyan; use for subtitle and short key phrase only. If the script font is missing, use italic Noto Serif KR rather than fake glyphs.', 'Body: Pretendard 16–19px on photo / 16–19px slate on white; line-height 1.55–1.8. Never use pure black (#000) for body copy.', 'Microtype: 10px Montserrat uppercase, letter-spacing .3em, vertical at outer edge. Keep clear of photo focal points.']
    : [`Display: ${t.font === 'serif' ? 'Noto Serif KR' : 'Pretendard'} Bold, use size and weight for hierarchy.`, 'Body: readable 16–24px, line-height 1.55–1.8, avoid dense paragraphs.', 'Accent type: reserve the secondary face or italic treatment for one short phrase per slide.'];
  const imageRules = isAurora
    ? ['Use one clear subject and a wide landscape crop for cover, TOC, and lead. Prefer luminous snow/ice and deep navy sky; keep the focal subject away from the central title ring.', 'For white pages, choose bright snow/soft studio backgrounds or clip the subject into circular masks. Avoid hard rectangular photo borders.', 'Overlay long copy only on a translucent mint-to-cyan pill or a left-to-right cyan shield (about 55% opacity at origin, fading to transparent).', 'If the user supplied images, place those first. Otherwise find subject-relevant, reusable images and carry author, source URL, and license through to the final credits. If search fails, use the built-in aurora illustration and disclose that fallback.', 'Use separate images for the small and large circle in the collage when available. Do not repeat one crop on adjacent slides unless there is no alternative.']
    : ['Use topic-relevant images with enough negative space for text.', 'Keep crop ratio, corner treatment, and image color temperature consistent across the deck.', 'If no image is available, show a deliberate graphic fallback and preserve the same palette.'];
  const adaptation = isAurora
    ? ['Treat user text as source material. Preserve factual statements and section order; do not invent statistics, claims, citations, or examples.', 'Use PPTX slide headings as section headings and body paragraphs as slide content. For long prose, split on paragraph/sentence boundaries and continue onto more slides instead of shrinking body text.', 'Map a general subject to matching cover/TOC imagery, then use photographs, objects, or diagrams appropriate to each section. Keep the aurora palette unless the user explicitly requests a brand recolor.', 'Generate a contents page from extracted headings. Generate the final takeaway cards from the source text. Use chart geometry only when the source provides actual data values.', 'Keep image attribution in the last slide and on image slides. Credits include filename/title, creator, license, and source link.']
    : ['Preserve source meaning and sequence when turning long text into pages.', 'Split dense text into readable pages; never shrink body type to force-fit.', 'Use only supplied facts and figures; leave a chart out when no data is supplied.'];
  const paletteRows = isAurora
    ? `| Aurora Mint | \`#1CD8A5\` | 135° gradient start; short script accents and data highlight |
| Glacier Cyan | \`#00A8E8\` | gradient end; white-page titles, icons, numbers |
| Deep Arctic Navy | \`#0B213F\` | dark photo overlays, contrast title words |
| Pure Snow White | \`#FFFFFF\` | white-page field (target 50–65%+ on interior pages) |
| Slate Body Gray | \`#68737D\` | body copy and captions; black is prohibited |
| Ice Water Tint | \`#E6F4F9\` | infographic fill and low-contrast watermark |`
    : `| Primary | \`${t.primary}\` | title and primary structure |
| Secondary | \`${t.secondary}\` | accents, emphasis, key values |
| Background | \`${t.bg}\` | main canvas |
| Body | \`${t.text}\` | paragraph text |`;
  const prompt = isAurora
    ? `Create a 16:9 presentation in the Aurora & Pure White Editorial system. Use a full-bleed photo cover with a 5px white circle (78% slide height), split title typography (bold geometric sans plus mint/cyan script), layered foreground subject, dark aurora TOC, asymmetrical story lead with cyan-to-transparent shield, full-photo translucent pill page, white split-photo page, half-white/half-panorama circle badge, overlapping dual-circle collage, and a white takeaway close. Cycle the four body masters as content grows. Interior backgrounds stay white at least 50–65% of the time. Use #1CD8A5 → #00A8E8 at 135°, #0B213F for dark contrast, #68737D for body, and #E6F4F9 for infographic fills. Use user images first; otherwise add relevant openly licensed imagery and display author/license/source credits. Preserve the supplied content and never invent facts or chart values. Split long content over more slides instead of reducing type. Source material:\n\n[PASTE LECTURE OR PPTX CONTENT HERE]`
    : `Create ${partName} content in the ${layoutName} design. Preserve source meaning, keep the palette and typography consistent, use readable page density, and add topic-relevant images with credits where appropriate. Do not invent facts or data. Source material:\n\n[PASTE CONTENT HERE]`;
  return `# 디자인 가이드 — ${design.name} (${partName})

> 레이아웃 틀: **${layoutName}**
> ${design.ref ? '샘플링 출처: ' + design.ref : '사용자 등록 디자인'}
${design.guide ? '\n**한 줄 요약**: ' + design.guide + '\n' : ''}
## 1. 디자인 의도와 결과물 기준

${design.guide || layoutName + '의 고유한 레이아웃·색·타입 규칙을 일관되게 적용한다.'}

- 결과물은 주제에 맞게 이미지를 포함하고, 이미지가 없는 입력에서도 시각 요소가 있는 상태로 완성한다.
- 긴 원고는 의미 단위로 분할해 슬라이드 수를 늘린다. 가독성보다 글자 축소를 우선하지 않는다.
- 원고/PPTX에서 얻은 사실·숫자만 사용한다. 입력에 없는 통계나 출처를 만들지 않는다.

## 2. 캔버스와 공통 구조

${structure.map(x => '- ' + x).join('\n')}

## 3. 디자인 토큰과 색상 배분

| 토큰 | 값 | 용도 |
|---|---|---|
| 주 색상 (primary) | \`${t.primary}\` | 제목, 핵심 구조 요소 |
| 보조 색상 (secondary) | \`${t.secondary}\` | 포인트, CTA, 강조 1곳 |
| 배경 (bg) | \`${t.bg}\` | 캔버스 바탕 |
| 글자 (text) | \`${t.text}\` | 본문 텍스트 |
| 글꼴 | ${t.font === 'serif' ? '명조 (Noto Serif KR 계열)' : '고딕 (Pretendard 계열)'} | 전체 서체 |

### 전체 팔레트 역할

| 색 | HEX | 역할 |
|---|---|---|
${paletteRows}

${isAurora ? '**비율 기준:** 오프화이트/순백 배경은 내지의 50–65% 이상. 그라데이션 면은 제목·배지·캡슐·핵심 차트 강조에 제한한다. 검정 본문은 금지한다.\n' : ''}

## 4. 타이포그래피와 위계

${typography.map(x => '- ' + x).join('\n')}

## 5. 마스터 아키텍처와 페이지별 배치

${spec.map((x, i) => `${String(i + 1).padStart(2, '0')}. ${x}`).join('\n')}

${isAurora ? '본문 콘텐츠가 더 많으면 마스터 4–7을 반복하되 같은 마스터를 연속으로 배치하지 않는다. 마지막 요약은 원고의 마지막 세 섹션에서 가져오며, 내용이 많을 때는 앞선 내용도 요약 페이지에 억지로 우겨넣지 않는다.\n' : ''}

## 6. 이미지·그래픽 조화

${imageRules.map(x => '- ' + x).join('\n')}

## 7. 원고/PPTX를 슬라이드로 변환하는 규칙

${adaptation.map(x => '- ' + x).join('\n')}

### 콘텐츠 슬롯

| 슬롯 | 변환 방식 |
|---|---|
| 제목/첫 슬라이드 제목 | 표지의 주 고딕, 중첩 스크립트 보조 구절 |
| 슬라이드 제목 | 원고의 제목·소제목을 보존. 소제목이 없으면 중립적인 순번 제목 생성 |
| 본문 | 문단 단위 분할, 페이지 당 1–3개 정보 블록 |
| 사진/도해 | 업로드 파일 우선. 없으면 주제 검색, 이미지 출처·라이선스 표시 |
| 수치/차트 | 원고에서 추출된 수치만 시각화 |
| 출처/링크 | 마지막 페이지의 크레딧 또는 입력된 링크 영역 |

## 8. 금지·검수 규칙

- 매 슬라이드의 배경, 제목, 본문, 사진을 같은 방식으로 반복하지 말 것. 마스터 변주로 리듬을 만든다.
- 이미지를 단순히 장식으로 붙이지 말 것. 캡슐/원형 마스크/페이드 중 하나로 사진과 타이포를 조화시킨다.
- 사진 초점 위에 본문을 올리지 말 것. 필요한 경우에만 캡슐이나 그라데이션 실드를 사용한다.
- 사실·차트 값·이미지 라이선스를 임의로 만들어 넣지 말 것.
- 글자 잘림, 사진 초점 겹침, 대비 부족, 페이지 번호/크레딧 겹침을 최종 미리보기에서 확인한다.

## 9. 재현용 생성 프롬프트

\`\`\`markdown
${prompt}
\`\`\`

\`\`\`json
${JSON.stringify({ part: design.part, layout: design.layout, tokens: design.tokens, guide: design.guide || '', reference: design.ref || '', canvas: structure, pageArchitecture: spec, typography, imageRules, contentRules: adaptation }, null, 2)}
\`\`\`
`;
}

/* ---------- 미리보기용 샘플 내용 ---------- */
const SAMPLE_CONTENT = {
  title: '2026 가을 음악회', subtitle: '함께 만드는 하모니',
  date: '2026년 11월 21일 (토) 오후 7시', place: '소망홀 대강당',
  desc: '누구나 무료로 즐기는 가을밤의 콘서트입니다.\n오케스트라와 합창단이 함께 무대에 오릅니다.\n따뜻한 차와 다과가 준비되어 있습니다.\n관객과 함께 부르는 마지막 곡으로 공연을 마무리합니다.',
  host: '문화기획팀 (02-1234-5678)', cta: '지금 신청하기', image: null, links: [],
};

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
/* 대표 이미지: 업로드한 사진(dataURL) 또는 디자인 색 기반 자동 생성 이미지 */
function placeholderSvg(t) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="900"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${t.primary}"/><stop offset="1" stop-color="${t.secondary}"/></linearGradient></defs><rect width="1200" height="900" fill="url(#g)"/><circle cx="950" cy="200" r="260" fill="#ffffff" opacity="0.14"/><circle cx="220" cy="720" r="320" fill="#ffffff" opacity="0.10"/><circle cx="640" cy="460" r="140" fill="#ffffff" opacity="0.18"/></svg>`;
  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
}
function heroImage(c, t) {
  return c.image || placeholderSvg(t);
}
function linksBlock(links, color) {
  if (!links || !links.length) return '';
  return `<div class="linklist" style="text-align:center; padding:14px 20px 36px;">` +
    links.map(u => `<a href="${esc(u)}" target="_blank" style="display:inline-block; margin:6px 8px; padding:10px 20px; border:1.5px solid ${color}; border-radius:999px; color:${color}; text-decoration:none; font-size:14px; font-weight:700; max-width:90%; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; vertical-align:middle;">🔗 ${esc(u.replace(/^https?:\/\//,''))}</a>`).join('') + `</div>`;
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
 * PPT 렌더러 — 기본 4장 + Aurora Editorial 동적 다장 구조
 * ===================================================== */
function auroraScene(t) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900" viewBox="0 0 1600 900"><defs><linearGradient id="sky" x2="0" y2="1"><stop stop-color="#071b36"/><stop offset=".58" stop-color="#124c70"/><stop offset="1" stop-color="#d7f0f4"/></linearGradient><linearGradient id="aur" x2="1" y2="1"><stop stop-color="${t.secondary}" stop-opacity="0"/><stop offset=".4" stop-color="${t.secondary}" stop-opacity=".86"/><stop offset="1" stop-color="${t.primary}" stop-opacity="0"/></linearGradient><linearGradient id="ice" x2="0" y2="1"><stop stop-color="#f9ffff"/><stop offset="1" stop-color="#90c8dc"/></linearGradient></defs><rect width="1600" height="900" fill="url(#sky)"/><path d="M70 280 C350 40 580 140 850 235 S1260 270 1530 78 L1600 185 C1300 390 1120 330 830 290 S360 280 110 420Z" fill="url(#aur)" opacity=".78"/><path d="M0 680 190 560 360 655 560 490 770 660 940 510 1160 665 1370 500 1600 660V900H0Z" fill="#164567"/><path d="M0 745 230 640 430 720 670 580 900 735 1120 590 1370 730 1600 625V900H0Z" fill="url(#ice)"/><path d="M0 805 Q260 735 510 795 T1030 790 T1600 770V900H0Z" fill="#fff"/><g fill="#fff" opacity=".75"><circle cx="190" cy="130" r="2"/><circle cx="480" cy="210" r="3"/><circle cx="1080" cy="135" r="2"/><circle cx="1390" cy="260" r="2"/><circle cx="840" cy="92" r="2"/></g></svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

function auroraChunks(c) {
  const chunks = []; let plainSequence = 0;
  const add = (heading, body) => {
    const clean = String(body || '').trim();
    if (!clean) return;
    if (heading === '핵심 내용') heading = `핵심 내용 ${String(++plainSequence).padStart(2, '0')}`;
    let rest = clean;
    while (rest.length > 250) {
      let cut = rest.lastIndexOf(' ', 250);
      if (cut < 180) cut = 250;
      chunks.push({ heading, body: rest.slice(0, cut).trim() });
      rest = rest.slice(cut).trim();
      heading = `${heading} · 계속`;
    }
    if (rest) chunks.push({ heading, body: rest });
  };
  if (Array.isArray(c.sections) && c.sections.length) {
    const sourceSections = c.sections.slice();
    const first = sourceSections[0];
    if (first && typeof first !== 'string' && (first.cover || String(first.heading || '').trim() === String(c.title || '').trim())) {
      sourceSections.shift();
      const intro = String(first.body || first.text || '').trim();
      if (intro) add('도입', intro);
    }
    sourceSections.forEach((s, i) => {
      if (typeof s === 'string') add(`핵심 내용 ${String(i + 1).padStart(2, '0')}`, s);
      else {
        const heading = s.heading || `핵심 내용 ${String(i + 1).padStart(2, '0')}`;
        const body = s.body || s.text || '';
        if (String(body).trim()) add(heading, body);
        else if (String(heading).trim() !== String(c.title || '').trim()) chunks.push({ heading, body: '' });
      }
    });
  } else {
    let current = '', currentHeading = '핵심 내용';
    const lines = String(c.desc || '').split(/\n+/).map(x => x.trim()).filter(Boolean);
    if (lines.length && lines[0].replace(/^#{1,6}\s*/, '').trim() === String(c.title || '').trim()) lines.shift();
    lines.forEach(line => {
      const h = line.match(/^#{1,4}\s+(.+)/);
      if (h) { if (current) add(currentHeading, current); current = ''; currentHeading = h[1].trim(); return; }
      if (current) add(currentHeading, current);
      add(currentHeading, line);
      current = '';
    });
    if (current) add(currentHeading, current);
  }
  return chunks;
}

function auroraMetrics(c) {
  const sourceLines = [
    ...(c.sections || []).flatMap(s => typeof s === 'string' ? [s] : [s.heading, s.body || s.text || '']),
    ...String(c.desc || '').split(/\n+/),
  ];
  const found = [];
  for (const raw of sourceLines) {
    const line = String(raw || '').trim().replace(/^[-*•]\s*/, '');
    const m = line.match(/^(.{2,32}?)[：:]\s*([\d,]+(?:\.\d+)?)\s*(%|명|건|개|회|년|점|원)?\s*$/);
    if (!m) continue;
    const value = Number(m[2].replace(/,/g,''));
    if (!Number.isFinite(value)) continue;
    const row = { label: m[1].trim(), value, display: `${m[2]}${m[3] || ''}`, unit: m[3] || '' };
    if (!found.some(x => x.label === row.label && x.value === row.value)) found.push(row);
    if (found.length === 4) break;
  }
  return found;
}

function renderAuroraPPT(design, c) {
  const t = design.tokens, chunks = auroraChunks(c), imgs = (c.images || []).filter(Boolean);
  const scene = imgs.length ? imgs : [auroraScene(t)];
  const sections = chunks.length ? chunks : [{ heading: '핵심 내용', body: '이 영역에 강의의 핵심 내용을 입력하세요.' }];
  const sceneCss = scene.slice(0, 8).map((src, i) => `.scene${i}{--scene:url("${src}")}`).join('\n');
  const sceneClass = i => `scene${i % Math.min(scene.length, 8)}`;
  const credit = i => {
    const item = (c.imageCredits || [])[i % Math.max(1, (c.imageCredits || []).length)];
    if (!item) return '';
    const label = `${esc(item.title || '이미지 출처')} · ${esc(item.author || '')} · ${esc(item.license || '')}`;
    return item.source ? `<a class="credit" href="${esc(item.source)}" target="_blank" rel="noopener">${label}</a>` : `<span class="credit">${label}</span>`;
  };
  const tocGroups = [];
  for (let i = 0; i < sections.length; i += 10) tocGroups.push(sections.slice(i, i + 10));
  if (!tocGroups.length) tocGroups.push([{ heading: '핵심 이야기' }]);
  const topicText = [c.title, c.subtitle, ...sections.slice(0, 4).map(s => `${s.heading} ${s.body}`)].join(' ').toLowerCase();
  const polarTopic = /polar\s*bear|북극곰|북극|arctic|antarctic|얼음곰/.test(topicText);
  const titleWords = String(c.title || '새로운 이야기').split(/\s+/).filter(Boolean);
  const titleMarkup = titleWords.map((w, i) => `<span class="${i % 2 ? 'script' : 'display'}">${esc(w)}</span>`).join('');
  const slides = [];
  const page = n => `<span class="page">${String(n).padStart(2, '0')}</span>`;
  const micro = text => `<span class="micro">${esc(text)}</span>`;
  const tocImage = scene.length > 1 ? 1 : 0, leadImage = scene.length > 2 ? 2 : 0;
  const bearCutout = polarTopic ? `<svg class="bear-cutout" viewBox="0 0 420 250" aria-label="북극곰 실루엣" role="img"><path d="M48 170c-13-36 4-77 39-94 30-15 72-10 99 5 25 14 39 23 69 18l28-22c18-14 43-13 55 1l18 22 35 7c17 3 28 13 23 25-4 10-17 15-34 14l-18 32c-8 14-17 23-34 23h-12l-3 34h-28l-4-34H140l-8 34h-28l1-39c-28-3-48-14-57-26z" fill="#f9ffff" stroke="#c4e6ee" stroke-width="5"/><path d="M312 92c11-13 28-14 39-3l13 17-31 10-21-9z" fill="#f9ffff" stroke="#c4e6ee" stroke-width="5"/><circle cx="355" cy="120" r="3.5" fill="#0b213f"/><path d="M384 133q18 2 27 12" fill="none" stroke="#0b213f" stroke-width="4" stroke-linecap="round"/></svg>` : '';
  slides.push(`<section class="slide cover ${sceneClass(0)}"><div class="cover-shade"></div><div class="cover-ring"></div>${micro(polarTopic ? 'POLAR / FIELD STUDY' : 'AURORA / STORY')}<div class="cover-title">${titleMarkup}${c.subtitle ? `<span class="script subtitle">${esc(c.subtitle)}</span>` : ''}</div>${bearCutout}${credit(0)}${page(1)}</section>`);
  tocGroups.forEach((group, groupIndex) => {
    const toc = group.map((s, i) => `<li><span>${String(groupIndex * 10 + i + 1).padStart(2, '0')}</span>${esc(s.heading)}</li>`).join('');
    slides.push(`<section class="slide toc ${sceneClass(tocImage)}"><div class="dark-shade"></div>${micro('AURORA / CONTENTS')}<div class="toc-head"><h2>Contents${tocGroups.length > 1 ? ` · ${groupIndex + 1}` : ''}</h2><span>${esc(c.title || '')}</span></div><ol>${toc}</ol>${credit(tocImage)}${page(slides.length + 1)}</section>`);
  });
  slides.push(`<section class="slide lead ${sceneClass(leadImage)}"><div class="lead-shield"></div><div class="lead-copy"><span class="script lead-kicker">${esc(c.subtitle || 'A story begins')}</span><h2>${esc(c.title || '')}</h2><p>${esc(sections[0].body.slice(0, 220))}</p></div><strong class="watermark">${esc((c.title || 'STORY').split(/\s+/).slice(0, 3).join(' '))}</strong>${micro('NORTH / 01')} ${credit(leadImage)}${page(slides.length + 1)}</section>`);

  sections.forEach((s, i) => {
    const type = ['pill', 'split', 'badge', 'collage'][i % 4];
    const imageIndex = (i + 3) % scene.length, cls = sceneClass(imageIndex), p = page(slides.length + 1);
    const heading = esc(s.heading || `핵심 내용 ${String(i + 1).padStart(2, '0')}`), body = esc(s.body);
    if (type === 'pill') slides.push(`<section class="slide pill ${cls}"><div class="photo-wash"></div>${micro(`FIELD NOTE / ${String(i + 1).padStart(2, '0')}`)}<h2 class="script">${heading}</h2><div class="pill-box"><p>${body}</p></div>${credit(imageIndex)}${p}</section>`);
    if (type === 'split') slides.push(`<section class="slide split"><div class="split-photo ${cls}"></div><div class="split-copy"><span class="script">${heading}</span><p>${body}</p><i></i></div>${credit(imageIndex)}${p}</section>`);
    if (type === 'badge') slides.push(`<section class="slide badge-slide"><div class="badge-copy"><b>ARCTIC NOTES</b><h2>${heading}</h2><p>${body}</p></div><div class="panorama ${cls}"></div><div class="circle-badge"><span class="script">${heading}</span></div>${credit(imageIndex)}${p}</section>`);
    if (type === 'collage') slides.push(`<section class="slide collage"><div class="circle-main ${cls}"></div><div class="circle-small ${sceneClass(imageIndex + 1)}"></div><div class="collage-title script">${heading}</div><p class="collage-copy">${body}</p>${credit(imageIndex)}${p}</section>`);
  });

  const metrics = auroraMetrics(c);
  const takeaways = sections.slice(-3).map((s, i) => `<article><span class="ring-number">${String(i + 1).padStart(2, '0')}</span><h3>${esc(s.heading)}</h3><p>${esc(s.body.slice(0, 160))}</p></article>`).join('');
  let summaryContent = takeaways;
  if (metrics.length) {
    const isPercent = metrics.every(m => m.unit === '%');
    const sameUnit = metrics.every(m => m.unit === metrics[0].unit);
    if (isPercent) summaryContent = metrics.map(m => `<article class="metric-item"><div class="donut" style="--value:${Math.max(0,Math.min(100,m.value))}%"><span>${esc(m.display)}</span></div><h3>${esc(m.label)}</h3></article>`).join('');
    else if (sameUnit && metrics[0].unit) {
      const maxValue = Math.max(...metrics.map(m => m.value), 1);
      summaryContent = metrics.map(m => `<article class="metric-bar"><div><h3>${esc(m.label)}</h3><b>${esc(m.display)}</b></div><span><i style="width:${Math.max(2,100*m.value/maxValue)}%"></i></span></article>`).join('');
    } else summaryContent = metrics.map(m => `<article class="metric-item"><span class="ring-number">●</span><h3>${esc(m.label)}</h3><b>${esc(m.display)}</b></article>`).join('');
  }
  slides.push(`<section class="slide summary"><div class="summary-head"><span class="script">${metrics.length ? 'Data & essentials' : 'The essentials'}</span><h2>${metrics.length ? '입력 데이터와 핵심 정리' : '핵심 정리'}</h2></div><div class="summary-grid ${metrics.length ? 'metrics-grid' : ''}">${summaryContent}</div><div class="summary-rule"></div><p class="thanks">감사합니다</p>${c.host ? `<span class="host">${esc(c.host)}</span>` : ''}<div class="all-credits">${(c.imageCredits || []).filter(Boolean).map(x => x.source ? `<a href="${esc(x.source)}" target="_blank" rel="noopener">${esc(x.title || 'Image')} — ${esc(x.author || '')}, ${esc(x.license || '')}</a>` : `<span>${esc(x.title || 'Image')} — ${esc(x.author || '')}, ${esc(x.license || '')}</span>`).join('')}</div>${page(slides.length + 1)}</section>`);

  const css = `
:root{--mint:${t.secondary};--cyan:${t.primary};--navy:#0B213F;--slate:#68737D;--tint:#E6F4F9;--aurora:linear-gradient(135deg,${t.secondary},${t.primary});}
body{margin:0;background:#142337;font-family:'Montserrat','Pretendard',Arial,sans-serif;color:var(--slate)}
.slide{width:1280px;max-width:100%;aspect-ratio:16/9;margin:24px auto;overflow:hidden;position:relative;background:#fff;box-shadow:0 12px 38px rgba(0,0,0,.34);box-sizing:border-box}
${sceneCss}
.cover,.toc,.lead,.pill,.split-photo,.panorama,.circle-main,.circle-small{background-image:var(--scene);background-size:cover;background-position:center}
.cover{display:grid;place-items:center;background-image:linear-gradient(180deg,rgba(5,25,49,.18),rgba(5,25,49,.34)),var(--scene);color:#fff}
.cover-shade{position:absolute;inset:0;background:linear-gradient(90deg,rgba(11,33,63,.24),rgba(11,33,63,.08),rgba(11,33,63,.25))}
.cover-ring{position:absolute;width:auto;height:78%;aspect-ratio:1;left:50%;top:50%;transform:translate(-50%,-50%);border:5px solid rgba(255,255,255,.92);border-radius:50%;box-shadow:0 0 0 1px rgba(255,255,255,.3),0 0 35px rgba(0,168,232,.22)}
.cover-title{position:absolute;z-index:3;left:27%;right:27%;top:50%;transform:translateY(-50%);display:block;text-align:center;line-height:1.04;text-shadow:0 3px 24px rgba(0,0,0,.24)}
.cover-title .display,.cover-title>.script:not(.subtitle){display:inline-block;margin:0 5px;vertical-align:middle}
.display{font-size:clamp(42px,5.1vw,68px);font-weight:900;letter-spacing:-.055em;color:#fff;text-transform:uppercase}
.script{font-family:'Caveat','Brush Script MT','Segoe Script','Noto Serif KR',cursive;font-style:italic;font-weight:400;color:var(--mint);letter-spacing:-.025em}
.cover-title .script{font-size:clamp(34px,4vw,52px);margin:-3px 0 1px;color:var(--mint)}
.cover-title .subtitle{display:block;font-size:32px;margin-top:20px;color:#fff}
.bear-cutout{position:absolute;z-index:4;width:35%;height:auto;left:2%;bottom:1%;filter:drop-shadow(0 10px 15px rgba(4,28,49,.34))}
.micro{position:absolute;z-index:6;left:18px;top:45%;writing-mode:vertical-rl;transform:rotate(180deg);font-size:10px;letter-spacing:.3em;color:rgba(255,255,255,.78)}
.page{position:absolute;right:34px;bottom:24px;z-index:8;font-size:13px;letter-spacing:.12em;color:rgba(255,255,255,.72)}
.credit{position:absolute;z-index:8;left:22px;bottom:20px;color:#fff;background:rgba(11,33,63,.54);border-radius:999px;padding:6px 12px;font-size:10px;text-decoration:none;max-width:70%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.toc{color:#fff;background-image:linear-gradient(90deg,rgba(5,22,45,.7),rgba(5,22,45,.17),rgba(5,22,45,.56)),var(--scene)}
.dark-shade{position:absolute;inset:0;background:radial-gradient(ellipse at 50% 48%,rgba(0,168,232,.14),transparent 65%),linear-gradient(180deg,rgba(5,20,41,.45),rgba(5,20,41,.55))}
.toc-head{position:absolute;z-index:2;top:21%;left:0;right:0;text-align:center}.toc-head h2{font-size:60px;line-height:1;margin:0;font-weight:900;letter-spacing:-.05em}.toc-head span{display:block;margin-top:-4px;opacity:.52;font:italic 37px 'Caveat','Brush Script MT','Segoe Script','Noto Serif KR',cursive;color:#7CE8C8}
.toc ol{position:absolute;z-index:2;left:24%;right:24%;top:46%;list-style:none;padding:0;margin:0;display:grid;grid-auto-flow:column;grid-template-rows:repeat(5,auto);column-gap:58px}.toc li{display:flex;gap:18px;justify-content:flex-start;color:#fff;font-size:18px;line-height:2}.toc li span{color:var(--mint);font-weight:700;letter-spacing:.08em}
.lead{color:white;background-position:center right;background-image:linear-gradient(90deg,rgba(0,136,184,.94) 0%,rgba(0,136,184,.78) 38%,rgba(0,136,184,0) 70%),var(--scene)}
.lead-copy{position:absolute;left:9%;top:18%;width:39%;z-index:2}.lead-kicker{display:block;font-size:38px;color:#fff;margin-bottom:10px}.lead-copy h2{font-size:55px;line-height:1.02;color:var(--navy);margin:0 0 26px;font-weight:900;letter-spacing:-.04em}.lead-copy p{font-size:17px;line-height:1.7;color:#fff;max-width:470px}.watermark{position:absolute;right:4%;bottom:8%;font-size:53px;color:rgba(255,255,255,.42);text-transform:uppercase;letter-spacing:-.05em}.lead .micro{left:auto;right:16px;top:18%;transform:none}
.pill{color:#fff;background-image:linear-gradient(180deg,rgba(40,168,224,.26),rgba(11,33,63,.28)),var(--scene)}.pill:before{content:'';position:absolute;inset:0;background:linear-gradient(180deg,rgba(40,168,224,.35) 0%,transparent 63%)}.pill .micro{top:24%;left:50%;transform:translateX(-50%);writing-mode:initial}.pill h2{position:absolute;z-index:2;left:20%;right:20%;top:23%;text-align:center;font-size:44px;text-shadow:0 3px 15px rgba(0,0,0,.25)}.pill-box{position:absolute;z-index:2;left:20%;right:20%;top:39%;min-height:29%;display:grid;place-items:center;padding:25px 48px;border-radius:999px;background:linear-gradient(135deg,rgba(28,216,165,.55),rgba(0,168,232,.54));backdrop-filter:blur(5px);box-shadow:0 14px 45px rgba(11,33,63,.13);box-sizing:border-box}.pill-box p{max-width:690px;text-align:center;color:white;font-size:17px;line-height:1.5;margin:0;text-shadow:0 1px 8px rgba(0,41,63,.24)}
.split{background:#fff}.split-photo{position:absolute;left:0;top:0;bottom:0;width:57%;background-size:cover;background-position:center;border-radius:0 48% 48% 0/0 50% 50% 0;mask-image:linear-gradient(90deg,#000 78%,transparent 100%)}.split-copy{position:absolute;left:62%;right:7%;top:23%;}.split-copy .script{font-size:44px;line-height:1.05;display:block;color:var(--cyan)}.split-copy p{font-size:19px;line-height:1.8;margin-top:30px;color:var(--slate)}.split-copy i{display:block;width:58px;height:3px;background:var(--aurora);margin-top:24px;border-radius:4px}
.badge-slide{background:#fff}.badge-copy{position:absolute;left:42%;right:8%;top:13%;height:36%;z-index:2}.badge-copy b{font-size:13px;letter-spacing:.16em;color:var(--cyan)}.badge-copy h2{font-size:34px;color:var(--navy);margin:10px 0}.badge-copy p{font-size:16px;line-height:1.55;max-width:650px;margin:0}.panorama{position:absolute;left:0;right:0;bottom:0;height:50%;background-position:center 58%}.circle-badge{position:absolute;left:2.5%;top:27.5%;width:auto;height:55%;aspect-ratio:1;border-radius:50%;background:var(--aurora);display:grid;place-items:center;z-index:3;box-shadow:0 15px 38px rgba(11,33,63,.24)}.circle-badge span{width:70%;text-align:center;color:#fff;font-size:32px;line-height:1.08;overflow-wrap:anywhere}.badge-slide .credit{bottom:12px}
.collage{background:#fff}.circle-main,.circle-small{position:absolute;border-radius:50%;background-size:cover;background-position:center;box-shadow:0 15px 38px rgba(11,33,63,.17)}.circle-main{left:8%;top:9%;width:auto;height:78%;aspect-ratio:1}.circle-small{left:7%;top:57%;width:auto;height:37%;aspect-ratio:1;border:8px solid #fff;box-sizing:border-box}.collage-title{position:absolute;left:59%;top:25%;width:33%;font-size:48px;line-height:1.03;color:var(--cyan);overflow-wrap:anywhere}.collage-copy{position:absolute;left:53%;right:8%;bottom:11%;font-size:16px;line-height:1.65;color:var(--slate)}.collage .credit{color:#50616c;background:rgba(230,244,249,.9)}
.summary{background:#fff;padding:7% 8% 6%;}.summary-head .script{font-size:30px}.summary-head h2{font-size:44px;color:var(--navy);margin:3px 0 0}.summary-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:28px;margin-top:38px}.summary-grid article{position:relative;padding:22px 20px 20px 78px;min-height:145px;background:var(--tint);border-radius:4px}.ring-number{position:absolute;left:20px;top:24px;width:42px;height:42px;border:3px solid transparent;border-radius:50%;background:linear-gradient(#fff,#fff) padding-box,var(--aurora) border-box;display:grid;place-items:center;color:var(--cyan);font-size:13px;font-weight:800}.summary-grid h3{font-size:19px;color:var(--navy);margin:0 0 10px}.summary-grid p{font-size:14px;line-height:1.55;margin:0}.summary-rule{position:absolute;left:8%;right:8%;bottom:22%;height:1px;background:linear-gradient(90deg,transparent,var(--mint),var(--cyan),transparent)}.thanks{position:absolute;bottom:7%;left:8%;font:italic 31px 'Caveat','Brush Script MT','Segoe Script','Noto Serif KR',cursive;color:var(--cyan);margin:0}.host{position:absolute;bottom:8%;right:8%;font-size:13px;color:var(--slate)}.all-credits{position:absolute;left:8%;right:8%;bottom:2.5%;display:flex;gap:12px;flex-wrap:wrap}.all-credits a,.all-credits span{font-size:9px;color:#637783;text-decoration:none}.summary .page{color:#68737D}
.metrics-grid{grid-template-columns:repeat(auto-fit,minmax(190px,1fr));align-items:center}.summary-grid .metric-item{padding:15px;text-align:center;min-height:180px;background:transparent;display:grid;justify-items:center;align-content:center}.metric-item h3{margin:12px 0 0}.metric-item b{color:var(--cyan);font-size:26px}.donut{width:126px;height:126px;border-radius:50%;background:conic-gradient(var(--cyan) var(--value),#D8EEF8 0);display:grid;place-items:center;position:relative}.donut:before{content:'';position:absolute;inset:12px;border-radius:50%;background:#fff}.donut span{z-index:1;color:var(--navy);font-weight:800;font-size:23px}.summary-grid .metric-bar{padding:14px 20px;background:transparent;min-height:0}.metric-bar>div{display:flex;align-items:center;justify-content:space-between;gap:20px}.metric-bar b{color:var(--cyan);font-size:20px}.metric-bar>span{display:block;height:12px;background:#D8EEF8;border-radius:999px;margin-top:8px;overflow:hidden}.metric-bar i{display:block;height:100%;background:var(--aurora);border-radius:inherit}
@media print{body{background:#fff}.slide{margin:0;width:100%;box-shadow:none;page-break-after:always}.credit{print-color-adjust:exact;-webkit-print-color-adjust:exact}}
`;
  return docShell(c.title + ' — Aurora 발표자료', css, slides.join('\n'));
}

function renderPPT(design, c) {
  const t = design.tokens;
  const font = FONT_STACKS[t.font];
  const accent = t.secondary;
  const img = heroImage(c, t);
  if (design.layout === 'arctic') return renderAuroraPPT(design, c);
  const infoRows = [
    c.date && `<div class="row"><span class="k">📅 날짜</span><span>${esc(c.date)}</span></div>`,
    c.place && `<div class="row"><span class="k">📍 장소</span><span>${esc(c.place)}</span></div>`,
    c.host && `<div class="row"><span class="k">👥 주최</span><span>${esc(c.host)}</span></div>`,
    ...(c.links || []).slice(0, 3).map(u => `<div class="row"><span class="k">🔗 링크</span><span>${esc(u)}</span></div>`),
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
  } else if (design.layout === 'arctic') {
    css += `
.slide { align-items: flex-start; background-image: radial-gradient(circle at 14% 14%, rgba(36,135,184,.07) 0 2px, transparent 3px), radial-gradient(circle at 82% 82%, rgba(85,184,154,.08) 0 2px, transparent 3px); background-size: 38px 38px, 52px 52px; }
.slide h1, .slide h2 { color: ${t.primary}; font-weight: 800; }
.slide.cover h1 { font-size: 78px; line-height: 1.08; }
.badge { color: ${accent}; font-weight: 800; font-size: 17px; letter-spacing: .12em; margin-bottom: 20px; }
.slide h2 { font-size: 44px; margin-bottom: 32px; }
.row { align-items: center; background: #eff8fc; border-left: 4px solid ${t.primary}; border-radius: 0 14px 14px 0; padding: 16px 20px; margin: 10px 0; font-size: 22px; }
.row .k { color: ${t.primary}; min-width: 130px; }
.desc { max-width: 760px; padding: 8px 22px; border-left: 3px solid ${accent}; }
.desc p { font-size: 24px; line-height: 1.75; margin: 18px 0; }
.coverimg { width: 42%; border-left: 5px solid ${t.primary}; border-radius: 0 0 0 72px; box-shadow: -16px 0 40px rgba(36,135,184,.12); }
.pagenum { color: ${t.primary}; }
.arctic-mark { position:absolute; right:48px; top:34px; color:${accent}; font-size:22px; opacity:.65; }`;
    deco = `<div class="arctic-mark">✳</div>`;
  } else if (design.layout === 'winterland') {
    css += `
.slide { align-items: flex-start; background: ${t.bg}; }
.slide h1, .slide h2 { color: ${t.primary}; font-family: Georgia, 'Noto Serif KR', serif; }
.slide.cover h1 { font-size: 68px; line-height: 1.12; max-width: 620px; }
.slide h2 { font-size: 46px; font-weight: 600; padding-bottom: 16px; border-bottom: 1px solid ${t.primary}55; }
.badge { color: ${accent}; font-family: Georgia, serif; font-style: italic; font-size: 21px; letter-spacing: .04em; margin-bottom: 22px; }
.row { background: #fff; border: 1px solid #e4e5dd; border-radius: 4px; padding: 15px 18px; margin: 10px 0; font-size: 23px; }
.row .k { color: ${t.primary}; min-width: 130px; }
.desc { columns: 2; column-gap: 48px; max-width: 1000px; }
.desc p { font-size: 22px; line-height: 1.85; break-inside: avoid; margin: 0 0 20px; }
.slide.cover.first { background: ${t.bg}; padding-top: 92px; }
.slide.cover.first .coverimg { width: 45%; border-left: 0; border-radius: 0 0 0 120px; box-shadow: -24px 10px 48px rgba(40,84,70,.18); }
.slide.cover.first:after { content:''; position:absolute; top:58px; left:90px; width:74px; height:3px; background:${accent}; }
.pagenum { color: ${t.primary}; }
.winter-mark { position:absolute; top:32px; right:44px; color:${accent}; font: italic 20px Georgia,serif; letter-spacing:.08em; }`;
    deco = `<div class="winter-mark">WINTER · NOTES</div>`;
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

  // 표지 슬라이드: 오른쪽 42%에 대표 이미지 패널 (모든 레이아웃 공통, 나중에 선언해 우선 적용)
  css += `
.slide.cover.first { padding-right: 48%; align-items: flex-start; text-align: left; }
.coverimg { position: absolute; top: 0; right: 0; bottom: 0; width: 42%;
  background-image: url("${img}"); background-size: cover; background-position: center; }`;

  const slides = [
    `<section class="slide cover first">${deco}<div class="coverimg"></div>
      ${c.subtitle ? `<div class="badge">${esc(c.subtitle)}</div>` : ''}
      <h1>${esc(c.title)}</h1>
      ${c.date ? `<div class="sub">${esc(c.date)}${c.place ? ' · ' + esc(c.place) : ''}</div>` : ''}
      <div class="pagenum">1</div></section>`,
    `<section class="slide">${deco}${design.layout === 'arctic' ? '<div class="badge">FIELD NOTES · 01</div>' : ''}<h2>안내</h2>${infoRows || '<p class="sub">세부 정보가 입력되지 않았습니다.</p>'}
      <div class="pagenum">2</div></section>`,
    `<section class="slide">${deco}${design.layout === 'arctic' ? '<div class="badge">HABITAT · 02</div>' : ''}<h2>소개</h2><div class="desc">${paragraphs(c.desc) || '<p>설명이 입력되지 않았습니다.</p>'}</div>
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
  const img = heroImage(c, t);
  let css = `
.photo { background-image: url("${img}"); background-size: cover; background-position: center;
  flex-shrink: 0; width: 100%; }
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
      <div class="photo" style="height:24%; margin-top:16px;"></div>
      <div class="bigline"></div>
      <div class="desc">${paragraphs(c.desc)}</div>
      <div class="bottom info">
        ${c.date ? `<div><strong>일시</strong> · ${esc(c.date)}</div>` : ''}
        ${c.place ? `<div><strong>장소</strong> · ${esc(c.place)}</div>` : ''}
        ${c.host ? `<div><strong>문의</strong> · ${esc(c.host)}</div>` : ''}
        ${c.links && c.links[0] ? `<div style="font-size:14px; opacity:.75;">🔗 ${esc(c.links[0])}</div>` : ''}
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
      <div class="photo" style="height:22%; width:80%; margin:0 auto 18px; border:1px solid ${t.secondary}; box-shadow:0 0 16px ${t.secondary}66;"></div>
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
      <div class="photo" style="height:22%; margin-bottom:16px; border:1px solid ${t.secondary};"></div>
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
        <div class="photo" style="height:170px; border-radius:12px; margin-bottom:16px;"></div>
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
      <div class="photo" style="height:20%; border:3px solid ${t.primary}; margin-bottom:14px;"></div>
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
  const img = heroImage(c, t);
  const lines = descLines(c.desc);
  const infoCards = [
    c.date && `<div class="card"><div class="ic">📅</div><h3>날짜</h3><p>${esc(c.date)}</p></div>`,
    c.place && `<div class="card"><div class="ic">📍</div><h3>장소</h3><p>${esc(c.place)}</p></div>`,
    c.host && `<div class="card"><div class="ic">👥</div><h3>주최/문의</h3><p>${esc(c.host)}</p></div>`,
  ].filter(Boolean).join('');

  let css = `
body { font-family: ${font}; background: ${t.bg}; color: ${t.text}; }
h1, h2 { word-break: keep-all; }
.photo { background-image: url("${img}"); background-size: cover; background-position: center; }
.btn-cta { display: inline-block; padding: 16px 44px; border-radius: 999px; font-size: 18px;
  font-weight: 800; text-decoration: none; background: ${t.secondary}; color: #111; }
footer { text-align: center; padding: 40px 20px; font-size: 14px; opacity: .6; }`;
  let body = '';

  if (design.layout === 'event') {
    css += `
.hero { text-align: center; padding: 110px 24px 80px; position: relative; overflow: hidden;
  background-image: url("${img}"); background-size: cover; background-position: center; }
.hero::before { content:''; position: absolute; inset: 0;
  background: linear-gradient(rgba(0,0,0,.62), ${t.primary}e6),
    radial-gradient(ellipse at 50% -20%, ${t.secondary}33, transparent 60%); }
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
<div class="photo" style="max-width:760px; height:320px; margin:10px auto 0; border-radius:16px;"></div>
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
<div class="photo" style="max-width:980px; height:340px; margin:30px auto 10px; border-radius:20px; box-shadow:0 12px 36px rgba(0,0,0,.12);"></div>
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
    <div class="photo" style="height:230px; border-radius:16px; margin-bottom:24px;"></div>
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
<div class="photo" style="max-width:680px; height:340px; margin:0 auto 30px; border-radius:6px;"></div>
<article class="prose">${paragraphs(c.desc)}</article>
<div class="endcta"><a class="btn-cta" href="#">${esc(cta)}</a></div>
<footer>${esc(c.host || c.title)}</footer>`;
  }
  if (c.links && c.links.length) {
    const linkColor = design.layout === 'event' ? t.secondary : t.primary;
    body = body.replace('<footer>', linksBlock(c.links, linkColor) + '<footer>');
  }
  return docShell(c.title, css, body);
}

/* =====================================================
 * 문서(A4) 미리보기 렌더러 — 썸네일/샘플용 간단 1페이지
 * (실제 생성은 AI가 가이드대로 집필)
 * ===================================================== */
function renderDoc(design, c) {
  const t = design.tokens;
  const font = FONT_STACKS[t.font];
  const rows = descLines(c.desc).slice(0, 3);
  const css = `
body { background: #555; font-family: ${font}; padding: 24px; }
.page { width: 794px; max-width: 100%; aspect-ratio: 210/297; margin: 0 auto; background: ${t.bg};
  color: ${t.text}; padding: 56px 64px; box-shadow: 0 4px 24px rgba(0,0,0,.35); box-sizing: border-box; }
.band { background: ${t.primary}; color: #fff; padding: 10px 18px; font-weight: 800; font-size: 15px;
  letter-spacing: .08em; margin: -56px -64px 36px; }
h1 { font-size: 30px; color: ${t.primary}; margin-bottom: 8px; word-break: keep-all; }
.meta { font-size: 13px; opacity: .7; margin-bottom: 26px; }
h2 { font-size: 17px; color: ${t.primary}; border-left: 4px solid ${t.secondary}; padding-left: 10px;
  margin: 24px 0 10px; }
p, li { font-size: 13.5px; line-height: 1.8; }
table { width: 100%; border-collapse: collapse; font-size: 13px; margin-top: 8px; }
th { background: ${t.primary}; color: #fff; padding: 8px; font-weight: 700; }
td { border: 1px solid #e2e8f0; padding: 8px; }
@media print { body { background: none; padding: 0; } .page { box-shadow: none; } }`;
  const body = `<section class="page">
    <div class="band">${esc(design.name)}</div>
    <h1>${esc(c.title)}</h1>
    <div class="meta">${[c.date, c.place, c.host].filter(Boolean).map(esc).join(' · ')}</div>
    <h2>개요</h2>
    ${rows.map(r => `<p>${esc(r)}</p>`).join('')}
    <h2>${design.layout === 'lesson' ? '수업 단계' : design.layout === 'proposal' ? '실행 계획' : '진행 현황'}</h2>
    <table><tr><th>구분</th><th>내용</th><th>${design.layout === 'report' ? '달성률' : '시간/일정'}</th></tr>
    <tr><td>1단계</td><td>자료를 주면 AI가 이 표를 실제 내용으로 집필합니다</td><td>—</td></tr>
    <tr><td>2단계</td><td>구조·목표 문장·세부 계획까지 자동 작성</td><td>—</td></tr></table>
  </section>`;
  return docShell(c.title + ' — 문서', css, body);
}

const RENDERERS = { ppt: renderPPT, poster: renderPoster, landing: renderLanding, doc: renderDoc };

/* node 테스트용 (브라우저에서는 무시됨) */
if (typeof module !== 'undefined') {
  module.exports = { SEED_DESIGNS, LAYOUTS, RENDERERS, SAMPLE_CONTENT, generateGuideMd, LAYOUT_SPECS };
}
