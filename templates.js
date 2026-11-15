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


  /* ===== 링크에서 복제한 템플릿 (AI 정밀 분석) ===== */
  {"id":"url-winter-landscape","part":"ppt","layout":"editorial","name":"겨울 풍경 포토그래픽 미니멀","ref":"링크에서 디자인가이드 복제: https://www.slidemembers.com/en_US/view/PPT-Templates/winter-landscape-best-powerpoint-templates-20362","guide":"Three source 이미지를 확인했다. 이제 디자인 분석을 바탕으로 가이드 문서를 작성한다.","guideMd":"Three source 이미지를 확인했다. 이제 디자인 분석을 바탕으로 가이드 문서를 작성한다.\n\n# 디자인 가이드 — Frozen Serenity (겨울 풍경 포토그래픽 미니멀)\n\n## 1. 전체 디자인 시스템\n\n### 1.1 핵심 디자인 철학\n\n1. **포토그래픽 리얼리즘 우선 (Photo-First)** — 디자인 요소(도형, 아이콘, 패턴)를 거의 배제하고, 고해상도 실사 풍경 사진 자체가 배경이자 주인공이 되는 구조. 그래픽은 사진의 분위기를 해치지 않는 최소한의 텍스트 레이어로만 개입한다.\n2. **차가운 단색조의 정서적 일관성 (Monochromatic Cool Palette)** — 블루~그레이~화이트의 저채도 한색 계열로 전 슬라이드를 통일, \"겨울의 고요함\"이라는 단일 감정을 끝까지 유지한다. 색은 장식이 아니라 분위기 전달 도구.\n3. **세리프 타이포의 고급 대비 (Elegant Serif Overlay)** — 사진 위에 얇고 우아한 세리프체(Georgia류)를 크게 올려, 거칠고 차가운 자연 이미지와 섬세하고 따뜻한 손글씨 느낌의 타이포를 대비시켜 \"다큐멘터리+에디토리얼\" 톤을 만든다.\n4. **여백과 프레임의 절제된 레이어 깊이감** — 전체 슬라이드를 얇은 외곽 프레임(테두리)으로 감싸고, 내부에는 사진-텍스트 두 레이어만 존재. 장식 요소를 더하지 않음으로써 \"잡지 화보\" 같은 공백의 힘을 사용한다.\n\n### 1.2 컬러 팔레트 및 그라데이션 공식\n\n| 구분 | 컬러명 | HEX | RGB | 적용 영역 및 역할 |\n|---|---|---|---|---|\n| Primary | 글레이셜 블루 | #3E6B8A | rgb(62,107,138) | 얼음/호수 표면의 중간톤, 섬네일 배경색, 포인트 컬러 |\n| Primary Dark | 딥 나이트 블루 | #16222E | rgb(22,34,46) | 얼어붙은 호수 하단부, 그림자 영역, 저대비 텍스트 배경 |\n| Secondary | 세이지 그린 | #7D9A7E | rgb(125,154,126) | \"Welcome\" 같은 보조 라벨 텍스트, 포인트 악센트 컬러 |\n| Neutral Light | 오프화이트 미스트 | #ECEFEE | rgb(236,239,238) | 간지/본문 슬라이드 배경, 여백 영역 |\n| Neutral Mid | 소프트 그레이 | #5B6560 | rgb(91,101,96) | 본문 슬라이드 타이틀 텍스트, 중립 아이콘 |\n| Accent | 퓨어 화이트 | #FFFFFF | rgb(255,255,255) | 표지 타이틀 텍스트, 하이라이트, 프레임 보더 |\n| Accent (텍스트 보조) | 라이트 그레이 | #D8DEE2 | rgb(216,222,226) | 본문 캡션(Lorem ipsum) 텍스트, 저강조 정보 |\n\n**시그니처 그라데이션 공식**: 표지/간지 사진 위에는 실제 \"그라데이션 오버레이\"보다는 **사진 자체의 자연광 그라데이션**(상단 하늘의 연한 밝은 블루 #C9D6DD → 중단 설산의 중간 톤 → 하단 얼음 호수의 짙은 네이비 #16222E)을 그대로 활용. 디자인 상 인위적 오버레이를 추가할 경우:\n`background: linear-gradient(180deg, rgba(201,214,221,0.15) 0%, rgba(22,34,46,0.55) 100%)` — 사진 위 상단은 거의 투명, 하단으로 갈수록 짙은 네이비 55% 오버레이를 깔아 하단 텍스트(캡션) 가독성을 확보한다.\n\n**텍스트 가독성 오버레이 공식**: 타이틀이 올라가는 영역(사진 중앙~하단 1/3)에는 `rgba(22,34,46,0.25)` 수준의 약한 반투명 다크 레이어를 국소적으로 깔아 흰색 세리프 타이틀의 대비를 높인다(자연광이 밝은 경우에만 적용, 과하게 어둡지 않게).\n\n### 1.3 타이포그래피 시스템\n\n| 위계 요소 | 원본 폰트 | 한글 대체 추천 | 크기 | 굵기·스타일 규칙 |\n|---|---|---|---|---|\n| 메인 타이틀 (표지/간지) | Georgia (세리프) | 리디바탕, 마루 부리, 조선일보명조 | 72~96pt | Regular, 자간 넓게(+20~40), 전체 폭의 70~85% 차지하도록 초대형 배치. 사진 위 화이트 또는 소프트 그레이 |\n| 서브 레이블 (예: \"Welcome\") | Georgia Italic-like | 마루 부리 Light | 22~26pt | Regular, 세이지 그린 포인트 컬러, 타이틀 바로 위 소배치, 자간 넓게 |\n| 소제목 (본문 슬라이드 타이틀) | Georgia | 리디바탕 | 44~56pt | Regular, 소프트 그레이(#5B6560), 좌측 정렬 |\n| 본문/캡션 (Lorem ipsum류) | Calibri | Pretendard, 노토산스 | 14~16pt | Regular, 행간 1.6~1.8 넉넉하게, 라이트 그레이 또는 반투명 화이트, 우측 정렬 또는 좌측 정렬 혼용 |\n| 마이크로 텍스트 (로고/워터마크) | Fave Script Pro (필기체) + Calibri | 나눔손글씨 + Pretendard | 10~12pt | 로고 옆 보조 텍스트, 최하단 중앙 배치 |\n\n**조형 규칙**: 메인 타이틀은 항상 사진의 수평선(지평선/수평선) 근처에 겹쳐 배치하여 \"자연 배경 위에 글자가 떠 있는\" 레이어 깊이감을 만든다. 서브 레이블(Welcome)과 메인 타이틀은 수직으로 밀착 배치(간격 0~10pt)하고, 본문 캡션은 타이틀과 충분한 여백(80~120pt)을 두어 시각적 위계를 분리한다. 타이틀 하단에 얇은 1px 디바이더 라인(#D8DEE2)을 삽입해 캡션 블록과의 경계를 표시하는 것도 허용되는 변형.\n\n## 2. 사진과 그래픽의 조화 원칙\n\n- **피사체 분리**: 인물/사물이 들어간 사진(예: 바위 위에 선 등산객)은 피사체를 프레임의 좌측 1/3 또는 우측 1/3에 배치하고, 텍스트는 반드시 반대편 여백에 둔다(사진-텍스트 좌우 분할 구도).\n- **마스킹/크롭**: 표지성 풍경 사진은 크롭 없이 풀블리드(bleed)로 16:9 전체를 채우며, 본문/간지형 사진은 명확한 사각형 틀(얇은 1px 외곽선 또는 그림자 없는 플랫 크롭)로 박스 처리해 \"액자\" 느낌을 준다.\n- **오버레이 기법**: 밝은 사진(하늘, 눈) 위에 화이트 텍스트를 올릴 때는 로컬 다크 그라디언트(상단 1.2 공식)를 적용하고, 어두운 사진(그림자, 밤) 위에는 오버레이 없이 그대로 화이트 텍스트를 사용한다.\n- **가독성 확보**: 캡션/본문 텍스트는 항상 사진에서 가장 톤이 균일하고 디테일이 적은 영역(예: 얼어붙은 호수의 매끈한 표면)에 배치해 텍스트 뒤 노이즈를 최소화한다.\n- **여백 프레임**: 모든 슬라이드 외곽에 8~12px 두께의 오프화이트(#ECEFEE) 여백 프레임을 둘러, 사진이 화면 끝까지 닿지 않고 \"작품처럼 액자화\"된 느낌을 유지한다(표지 제외 가능).\n\n## 3. 페이지별 구성요소 및 상세 배치 설계도\n\n**캔버스 기준: 1280×720px (16:9), 외곽 여백 프레임 10px**\n\n### Master 1 — 표지 (Cover / Title Slide)\n- 레이어 순서: ① 풀블리드 풍경사진(배경, z=0) ② 하단 로컬 다크 오버레이(z=1) ③ 메인 타이틀 \"Winter Landscape.\"(z=2) ④ 우하단 본문 캡션 4줄(z=3) ⑤ 최하단 중앙 로고(z=4)\n- 메인 타이틀: x=60px, y=200px(수직 중앙보다 약간 위, 수평선과 겹침), 폭 900px, 폰트 Georgia 84pt, 컬러 #FFFFFF\n- 본문 캡션: x=560px, y=355px, 폭 340px, 우측 정렬, 폰트 14pt, 컬러 rgba(255,255,255,0.85), 행간 1.8\n- 로고: x=center, y=690px, 폭 120px\n\n### Master 2 — 간지/섹션 전환 (Section Divider, 좌우 분할형)\n- 레이어 순서: ① 배경 오프화이트(#ECEFEE, z=0) ② 좌측 세로형 사진 박스(z=1, 플랫 크롭 액자) ③ 우측 텍스트 블록(z=2)\n- 사진 박스: x=85px, y=85px, 폭 420px, 높이 550px (세로 비율 사진, 플랫 테두리 없음, 그림자 없음)\n- 서브 레이블 \"Welcome\": x=805px(우측 정렬 기준), y=185px, 폰트 Georgia 24pt, 컬러 #7D9A7E\n- 메인 타이틀: x=580px, y=215px, 폭 580px, 우측 정렬, 폰트 Georgia 68pt, 컬러 #5B6560\n- 디바이더 라인: x=665~1125px, y=472px, 두께 1px, 컬러 #D8DEE2\n- 본문 블록 1: y=382~425px / 디바이더 / 본문 블록 2: y=505~548px, 각 14pt 2줄, 컬러 #8A9492, 우측 정렬\n\n### Master 3 — 축소형 표지(요약 배너형, 썸네일/목차 겸용)\n- 레이어 순서: ① 풀블리드 사진(z=0, 상단 60% 비중 확대) ② 상단 밀착 타이틀(z=1) ③ 타이틀 하단 소형 캡션(z=2) ④ 하단 로고(z=3)\n- 메인 타이틀: x=40px, y=55px, 폭 전체의 90%, 폰트 Georgia 48pt(16:9 축소 버전이므로 본비율 대비 작게), 컬러 #FFFFFF, 좌측 정렬\n- 소형 캡션: x=center~우측, y=110px, 폭 200px, 폰트 7~8pt, 컬러 rgba(255,255,255,0.8)\n- 로고: x=center, y=170px, 폭 70px\n\n### Master 4 — 본문/콘텐츠 슬라이드 (추정 설계: 목차/리스트형)\n- 배경: 오프화이트(#ECEFEE) 또는 전면 풍경사진 + 전체 다크 오버레이(rgba(22,34,46,0.45))\n- 소제목: x=60px, y=60px, 폰트 Georgia 36pt, 컬러 #5B6560(라이트 배경) 또는 #FFFFFF(사진 배경)\n- 콘텐츠 영역: y=160px~640px, 2~3컬럼 그리드, 컬럼 간격 40px, 각 컬럼 상단에 소형 사진 썸네일(16:9 비율, 높이 180px) + 하단 14pt 캡션 2줄\n- 하단 우측 페이지 번호: x=1180px, y=680px, 10pt, #8A9492\n\n### Master 5 — 인용/임팩트 슬라이드 (대형 텍스트 단독형)\n- 배경: 전면 풍경사진 + 상하 그라데이션 오버레이(공식 1.2 그라데이션)\n- 중앙 대형 문구: 화면 중앙 정렬, 폭 800px, 폰트 Georgia Italic 느낌 42pt, 컬러 #FFFFFF, 행간 1.4\n- 출처/서브텍스트: 문구 하단 30px, 14pt, 세이지 그린(#7D9A7E)\n\n### Master 6 — 클로징/마무리 슬라이드\n- Master 1과 동일 레이아웃이되 타이틀을 \"Thank you.\" 류로 치환, 캡션 블록 생략 또는 연락처 정보로 대체, 로고 위치 동일 유지\n\n## 4. 만능 적용 공식\n\n### 주제별 비주얼 소재 치환 매트릭스\n\n| 원본 주제(겨울) | 치환 주제 예시 1(바다/여름) | 치환 주제 예시 2(도시/비즈니스) | 치환 주제 예시 3(숲/자연) |\n|---|---|---|---|\n| 설산+얼어붙은 호수 | 수평선+잔잔한 바다 | 스카이라인+유리 반사면 | 울창한 숲+안개 낀 호수 |\n| 등산객(피사체) | 서퍼/요트 위 사람 | 걷고 있는 직장인 실루엣 | 트레킹하는 사람 |\n| 글레이셜 블루 팔레트 | 터콰이즈/코발트 팔레트 | 스틸그레이/네이비 팔레트 | 포레스트그린/올리브 팔레트 |\n| \"Winter Landscape\" | \"Ocean Horizon\" | \"Urban Vision\" | \"Forest Whisper\" |\n| 세이지 그린 포인트 | 코랄/선셋 오렌지 포인트 | 앰버/골드 포인트 | 모스그린 포인트 |\n\n### 복사해서 쓰는 스타일 고정 프롬프트\n\n```\nCreate a 16:9 PowerPoint-style presentation slide design with the following fixed style rules:\n\n- Photography-first minimalism: a single full-bleed, high-resolution realistic landscape\n  photograph as the entire background. No decorative shapes, icons, or patterns overlaid.\n- Color mood: cool, desaturated monochromatic palette inspired by [glacial blue #3E6B8A,\n  deep night blue #16222E, off-white mist #ECEFEE, sage green accent #7D9A7E]. Replace with\n  a palette fitting the new topic, but keep the same cool-to-neutral, low-saturation,\n  single-mood logic.\n- Typography: one large elegant serif headline (Georgia-like, 70-90pt, wide letter spacing,\n  white or soft gray) placed overlapping the photo's horizon line. A small serif/italic\n  label word (e.g. \"Welcome\") in the sage-green accent color sits directly above the\n  headline. Secondary body captions in a humanist sans-serif (Calibri-like), small (14pt),\n  light gray or translucent white, generous 1.6-1.8 line height, placed in empty photo areas\n  with minimal visual noise.\n- Layout: either (a) full-bleed cover with headline over the horizon and caption block in\n  one bottom corner, or (b) split-layout divider with a flat-cropped vertical photo on one\n  side (no border radius, no shadow) and right-aligned text block with a thin 1px divider\n  line separating two caption paragraphs.\n- Framing: wrap the entire slide in a thin 8-12px off-white margin frame so the photo feels\n  gallery-framed rather than touching the canvas edge (cover slides may bleed full).\n- Overlay rule: apply a subtle local dark gradient (rgba(22,34,46,0.25-0.55)) only behind\n  text regions on bright photo areas to preserve legibility, never a full-slide tint.\n- Mood: serene, documentary-editorial, quiet, cold elegance. No clutter, no icons, no bright\n  saturated colors, no busy patterns.\n\nSubject to depict: [치환할 주제, 예: \"a calm ocean horizon at sunrise with a lone surfer\"]\nHeadline text: \"[새 타이틀]\"\nAccent label: \"[보조 라벨 단어]\"\n\nAbsolutely NO extra graphic elements beyond photo + typography, NO icons, NO illustrations.\n```","previewUrl":"https://imgscf.slidemembers.com/docs/1/1/947/winter_landscape_best_powerpoint_templates_946534.jpg","source":{"type":"url","url":"https://www.slidemembers.com/en_US/view/PPT-Templates/winter-landscape-best-powerpoint-templates-20362"},"tokens":{"primary":"#3E6B8A","secondary":"#7D9A7E","bg":"#ECEFEE","text":"#5B6560","font":"serif"}},
  {"id":"url-bakery-pitch","part":"ppt","layout":"editorial","name":"에스프레소 미니멀 베이커리 IR","ref":"링크에서 디자인가이드 복제: https://www.slidemembers.com/en_US/view/PPT-Templates/bakery-cafe-pitch-deck-ppt-template-%3F-restaurant-investor-presentation-design-ppt-slide-templates-21839","guide":"디자인 가이드를 파일로 저장하려 했으나 쓰기 권한이 없어 저장되지 않았다. 아래에 전체 내용을 바로 출력한다.","guideMd":"디자인 가이드를 파일로 저장하려 했으나 쓰기 권한이 없어 저장되지 않았다. 아래에 전체 내용을 바로 출력한다.\n\n---\n\n# 디자인 가이드 — 프리미엄 베이커리 카페 투자 유치(IR) 피치덱\n\n## 1. 전체 디자인 시스템\n\n### 1.1 핵심 디자인 철학\n\n1. **따뜻한 미니멀리즘(Warm Minimalism)** — 짙은 에스프레소 브라운과 아이보리/크림 배경의 대비만으로 고급스러움을 표현한다. 화려한 장식 대신 넉넉한 여백과 절제된 라인이 \"프리미엄 F&B 브랜드\"의 신뢰도를 만든다.\n2. **세리프×산세리프 이원 체계** — 타이틀/소제목은 클래식한 세리프(Didone 계열, 원본 Cinzel)로 브랜드 헤리티지를, 본문/데이터는 깔끔한 산세리프로 가독성과 현대적 신뢰감을 동시에 확보한다.\n3. **괄호형 프레임 모티프(\"brace frame\")** — 상단/하단 모서리에 위아래로 벌어지는 가는 실선 괄호(악보의 \"{\"를 눕힌 듯한 곡선)가 반복 등장해 슬라이드 전체를 하나의 \"무대\"처럼 감싼다. 전체 덱을 관통하는 시그니처 그래픽 요소다.\n4. **카드 기반 레이어 깊이감** — 모든 콘텐츠 블록은 둥근 모서리의 화이트/크림 카드 위에 얹히고, 연한 드롭섀도우로 배경에서 \"살짝 떠 있는\" 깊이를 준다. 아이콘은 브라운 그라데이션 원형 배지에 담아 카드 위에 다시 한 번 레이어를 쌓는다.\n\n### 1.2 컬러 팔레트 및 그라데이션 공식\n\n| 구분 | 컬러명 | HEX | RGB | 적용 영역 및 역할 |\n|---|---|---|---|---|\n| Primary | Espresso Dark Brown | #3B2A20 | 59,42,32 | 메인 타이틀, 핵심 바디 텍스트, 아이콘 배지 그라데이션 시작색 |\n| Primary Light | Roast Brown | #8A5A3C | 138,90,60 | 타이틀 그라데이션 끝색, 강조 숫자, 라인/보더 |\n| Secondary | Terracotta Accent | #C07A4A | 192,122,74 | 불릿 포인트 점, 보조 타이틀(\"Premium\", \"Bakery Cafe\"), 강조 텍스트 |\n| Neutral BG | Warm Ivory | #EFECE6 | 239,236,230 | 슬라이드 전체 배경 |\n| Neutral Card | Soft White | #FBFAF8 | 251,250,248 | 콘텐츠 카드/박스 배경 |\n| Neutral Text | Charcoal Gray | #4A4540 | 74,69,64 | 본문 텍스트, 캡션 |\n| Accent Muted | Taupe Gray | #A39E96 | 163,158,150 | 우상단 라벨, 보조 캡션, 테두리선 |\n\n**시그니처 그라데이션 공식**\n- 아이콘 배지(원형): `linear-gradient(135deg, #3B2A20 0%, #8A5A3C 100%)` — 좌상단 진한 에스프레소 → 우하단 밝은 로스트 브라운 대각선 135°. 내부 아이콘은 항상 흰색 라인 아이콘.\n- 타이틀 텍스트 그라데이션(표지 \"Premium\"): `linear-gradient(90deg, #8A5A3C 0%, #3B2A20 100%)` 수평 그라데이션을 텍스트에 클리핑.\n- **오버레이 공식(사진 위)**: 별도 색상 오버레이 없이 둥근 모서리(radius 24px)로 프레임을 잘라내고, 테두리에 1px 연한 베이지 라인(#D8D2C8)을 둘러 \"액자\" 느낌을 준다. 사진은 고명도 대비(어두운 배경 + 밝은 크림색 피사체)를 유지하는 원본으로 선택한다.\n\n### 1.3 타이포그래피 시스템\n\n| 위계 요소 | 원본 폰트 | 한글 대체 추천 | 크기 | 굵기·스타일 규칙 |\n|---|---|---|---|---|\n| 메인 타이틀(표지) | Cinzel (세리프) | 마루부리 Bold, Noto Serif KR Black | 44~54pt | Bold, 좁은 행간(1.05), 1단어만 그라데이션 강조 |\n| 섹션 타이틀(본문) | Cinzel | Noto Serif KR SemiBold | 28~32pt | Bold, 상단 괄호 프레임 바로 아래 좌측 정렬 |\n| 서브 라벨(알약 뱃지) | Cinzel Italic | 가는 고딕+이탤릭 대체 | 12~14pt | 이탤릭, 자간 넓게, 테두리만 있는 알약(pill) 안 배치 |\n| 소제목(카드/리스트 헤더) | Pretendard Bold | Pretendard Bold / 본고딕 Bold | 16~18pt | Bold, 불릿 도트(terracotta) + 텍스트 |\n| 본문(설명 문단) | Pretendard Regular | Pretendard Regular | 12~13pt | Regular, 행간 1.5, #4A4540 |\n| 핵심 데이터(숫자) | Cinzel/Playfair Display | Noto Serif KR Bold | 32~40pt | Bold 세리프, 아이콘 배지 아래 단독 배치 |\n| 마이크로 텍스트(캡션) | Pretendard Light | Pretendard Light | 9~10pt | 연한 회색(#A39E96), 우상단 라벨·하단 로고 |\n\n**조형 규칙**: 세리프 타이틀과 산세리프 본문이 같은 블록 안에서 수직으로 중첩될 때는 항상 \"세리프(크고 진하게) → 산세리프(작고 연하게)\" 순서로 쌓아 위계를 명확히 하고, 세리프 요소에는 알약형 아웃라인 배지를 동반시켜 \"라벨 → 타이틀\" 리듬을 만든다.\n\n## 2. 사진과 그래픽의 조화 원칙\n\n- **피사체 분리**: 라떼아트 컵, 크루아상 등 피사체는 항상 어두운 배경(짙은 원목 테이블, 다크 보케) 위에서 촬영된 이미지를 선택해, 동일 계열 브라운 팔레트 안에서도 피사체가 밝은 크림/화이트 톤으로 도드라지게 한다.\n- **마스킹**: 사진은 큰 둥근 사각형(radius 약 20~24px)으로 마스킹하고 전체 영역의 약 40~45%를 차지하도록 우측에 배치. 색보정 없이 원본 톤을 유지하되 얇은 베이지 보더로 \"액자\" 느낌을 준다.\n- **오버레이/가독성 확보**: 사진 위에 텍스트를 직접 올리지 않는다. 텍스트는 항상 사진 바깥 좌측 영역에 배치. 괄호 프레임이 사진 프레임을 가로질러 이어지며 사진과 텍스트 영역을 하나의 틀로 묶는다.\n- **아이콘과 사진의 위계 분리**: 원형 그라데이션 아이콘 배지는 사진보다 작고 카드 우상단에 고정 배치되어, 사진의 사실적 무드와 아이콘의 추상적 정보 전달을 분리한다.\n\n## 3. 페이지별 구성요소 및 상세 배치 설계도 (16:9, 1280×720 기준)\n\n### [Master 1] 표지(Cover)\n- 상단 중앙: \"PITCH DECK\" 마이크로 라벨(진회색, 자간 넓음, 10pt, 중앙정렬, y:32px)\n- 좌측 블록(x:80~450px):\n  - \"Premium\" 알약형 아웃라인 배지(x:80, y:118, w:135, h:38, border 1px #A39E96, radius 19px, 세리프 이탤릭, terracotta)\n  - 메인 타이틀 4줄 \"Premium / Bakery Cafe / Investment / Attraction IR\" (x:80, y:175~365, 세리프 Bold 44pt, 줄간격 56px, 첫 단어만 그라데이션)\n  - \"Bakery Cafe\" 서브라벨(x:80, y:410, 세리프 이탤릭, terracotta, 14pt)\n  - 캡션 \"A premium lifestyle that blends into everyday life\"(x:80, y:438, 산세리프 13pt, #4A4540)\n- 우측 블록: 사진 프레임(x:515, w:400, h:385, radius 24px) — 라떼아트+크루아상 사진, 상/하단에 브라켓 장식(폭 200px, 중앙 정렬)\n- 하단 중앙: \"Slide Members\" 로고 워드마크(y:510)\n- 배경: Warm Ivory 단색\n\n### [Master 2] 데이터 하이라이트(4분면 카드 + 우측 리스트)\n- 상단 괄호 프레임: 얇은 실선(1px, #A39E96)이 좌우 끝에서 둥글게 말려 올라가고, 중앙에서 브라켓(폭 60px)이 교차 — y:30~55px\n- 좌상단: 섹션 타이틀(세리프 Bold 30pt, #3B2A20, x:88, y:78)\n- 우상단: 보조 라벨(산세리프 Light, #A39E96, 12pt)\n- 좌측 2×2 카드 그리드(x:78~718, y:180~660): 카드 약 312×228px, radius 20px, 배경 #FBFAF8, 드롭섀도우(blur 20px, opacity 8%)\n  - 각 카드: 우상단 원형 그라데이션 아이콘 배지(지름 56px) → 좌하단 큰 숫자(세리프 Bold 36pt) → 설명 텍스트(산세리프 13pt)\n- 우측 패널(x:778~1225): \"INVESTMENT POINTS\" 알약 배지 → 3개 항목 세로 스택(점선 구분), 각 항목 terracotta 불릿 + Bold 소제목(15pt) + 2줄 설명(13pt)\n\n### [Master 3] 목차/섹션 간지(추정)\n- 표지와 동일한 괄호 프레임 + 알약 배지 시스템 유지\n- 좌측 큰 세리프 챕터 번호 + 세리프 타이틀, 우측 동일한 라운드 사진 프레임\n- 하단에 가는 가로선으로 구분된 목차 리스트(산세리프, 번호+타이틀)\n\n### [Master 4] 본문 비교/프로세스형(추정)\n- Master 2의 카드+리스트 좌우 2단 그리드 골격 유지, 카드 내부를 \"프로세스 단계\"나 \"비교 항목\"으로 치환\n- 아이콘 배지→숫자/타이틀→캡션의 3단 수직 구조��� 모든 본문 슬라이드의 고정 반복 패턴\n\n### [Master 5] 팀/조직 소개형(추정)\n- 원형 그라데이션 배지를 인물 사진 프레임으로 치환(원형 마스킹, 지름 ~120px)\n- 사진 아래 이름(세리프 Bold)+직책(산세리프 Light)을 \"숫자+캡션\" 패턴과 동일하게 적용\n\n### [Master 6] 클로징/연락처 슬라이드(추정)\n- Master 1의 좌우 반전 버전: 사진 좌측, 텍스트(감사 인사+연락처) 우측\n- 괄호 프레임과 로고 워드마크 하단 고정 배치 유지\n\n## 4. 만능 적용 공식\n\n### 주제별 비주얼 소재 치환 매트릭스\n\n| 산업/주제 | 표지 사진 소재 | 아이콘 배지 모티프 | 핵심 숫자 카드 라벨 예시 | 유지할 요소 |\n|---|---|---|---|---|\n| 베이커리 카페(원본) | 라떼아트+크루아상 | 상점/그래프/고객/파우치 | 매장 수, 매출, 재방문율, 투자금 | 브라운 팔레트, 세리프 타이틀, 괄호 프레임 |\n| 레스토랑/파인다이닝 | 플레이팅 요리 클로즈업 | 포크나이프/별점/테이블/영수증 | 좌석 수, 객단가, 재방문율, 매출 | 동일 |\n| 와인/주류 브랜드 | 와인잔+오크통 | 포도/병/잔/바렐 | 생산량, 빈티지 수, 수출국, 매출 | 동일(브라운→버건디로 색조 전환 가능) |\n| 호텔/리조트 | 조식 테이블+창밖 풍경 | 침대/별/위치핀/카드 | 객실 수, 점유율, 리뷰 점수, 매출 | 동일 |\n| 수제맥주/크래프트 | 맥주잔+홉 | 맥주잔/탱크/트럭/바코드 | 양조량, 출고처, 재구매율, 투자금 | 동일 |\n| 디저트/초콜릿 브랜드 | 디저트 플레이팅 | 케이크/하트/선물상자/지갑 | SKU 수, 월매출, 멤버십율, 투자금 | 동일 |\n\n### 복사해서 쓰는 스타일 고정 프롬프트\n\n```\nDesign a 16:9 PowerPoint slide in a \"Warm Espresso Minimalism\" pitch-deck style.\n\nPALETTE:\n- Background: warm ivory (#EFECE6)\n- Card/box background: soft white (#FBFAF8)\n- Primary text/title: espresso dark brown (#3B2A20)\n- Gradient accent (icon badges, title highlight): 135deg linear-gradient from #3B2A20 to #8A5A3C\n- Secondary accent (bullets, labels): terracotta (#C07A4A)\n- Muted caption/label color: taupe gray (#A39E96)\n\nTYPOGRAPHY:\n- Headlines: classic serif (Cinzel / Playfair Display style), bold, generous letter spacing\n- Subheads/pill badges: serif italic inside a thin-outline pill shape\n- Body copy & data labels: clean sans-serif (Pretendard/Inter style), regular weight, 1.5 line-height\n- Big stat numbers: bold serif, 32-40pt, paired with small sans-serif caption below\n\nSIGNATURE GRAPHIC MOTIF:\n- A thin 1px line \"brace frame\" (like a flattened curly bracket) arcing at the top and bottom edges of the slide, framing the whole composition\n- Rounded-corner photo frames (radius ~24px) with a thin beige border, placed on the right third of the slide\n- Circular gradient icon badges (56px diameter, white line icon inside) attached to the top-right corner of each content card\n\nLAYOUT RULES:\n- Generous whitespace, left-aligned text blocks\n- White rounded cards (radius 20px) with soft drop shadow (8% opacity, 20px blur) for all data/content blocks\n- Dashed divider lines (#D8D2C8) between stacked list items\n- Keep photography naturalistic (no color overlay), cropped into the rounded frame, subject on a dark background for contrast against the ivory page\n\nApply this style to a [여기에 주제/업종 입력] pitch deck slide, replacing photography subject and icon glyphs with [해당 업종에 맞는 소재], keeping every color, type, and layout rule identical.\n```","previewUrl":"https://imgscf.slidemembers.com/docs/1/2/1081/bakery_cafe_pitch_deck_ppt_template_restaurant_investor_presentation_design_ppt_slide_templates_1080480.jpg","source":{"type":"url","url":"https://www.slidemembers.com/en_US/view/PPT-Templates/bakery-cafe-pitch-deck-ppt-template-%3F-restaurant-investor-presentation-design-ppt-slide-templates-21839"},"tokens":{"primary":"#3B2A20","secondary":"#C07A4A","bg":"#EFECE6","text":"#4A4540","font":"serif"}},
  {"id":"url-2026-strategy","part":"ppt","layout":"corporate","name":"네이비 아쿠아 웨이브 보고서","ref":"링크에서 디자인가이드 복제: https://www.slidemembers.com/en_US/view/PPT-Templates/2026-second-half-business-strategy-corporate-performance-report-ppt-template-best-powerpoint-presentation-templates-21806","guide":"1. **네이비×아쿠아 대비의 신뢰감**: 짙은 네이비(딥 블루)를 권위·신뢰의 앵커 컬러로, 밝은 아쿠아/시안을 생동감·성장의 포인트 컬러로 대비시켜 \"보수적이지만 미래지향적인\" 기업 보고서 톤을 만든다. 강한 원색(레드·오렌지) 없이 블루 계열 단일 색상군 안에서 명도 대비만으로 위","guideMd":"# 디자인 가이드 — 2026 하반기 비즈니스 전략 보고서 (Navy-Aqua Corporate Report)\n\n## 1. 전체 디자인 시스템\n\n### 1.1 핵심 디자인 철학\n\n1. **네이비×아쿠아 대비의 신뢰감**: 짙은 네이비(딥 블루)를 권위·신뢰의 앵커 컬러로, 밝은 아쿠아/시안을 생동감·성장의 포인트 컬러로 대비시켜 \"보수적이지만 미래지향적인\" 기업 보고서 톤을 만든다. 강한 원색(레드·오렌지) 없이 블루 계열 단일 색상군 안에서 명도 대비만으로 위계를 구성한다.\n2. **대각선 웨이브(Wave) 모티프의 일관된 반복**: 모든 마스터 슬라이드 상단~좌측에 동일한 유기적 곡선(wave) 그래픽이 좌상단 또는 상단 전체를 가로지르며 등장한다. 직선적인 기업 보고서에 \"흐름·전환·역동성\"이라는 소프트한 시각적 서명을 부여하는 핵심 장치.\n3. **여백 기반 카드 레이어링**: 콘텐츠는 항상 \"배경(연한 웨이브 그라디언트) → 카드(화이트 또는 네이비 솔리드, 큰 radius) → 텍스트/숫자\" 3단 레이어로 쌓인다. 카드는 그림자 없이 미세한 테두리/배경색 차이만으로 분리되어 플랫하면서도 입체적인 느낌을 준다.\n4. **정보 밀도 최소화 + 숫자 강조**: 한 슬라이드당 핵심 메시지 1~2개, 핵심 수치(%)는 본문 대비 4~6배 크기로 키워 \"읽지 않아도 숫자가 먼저 보이는\" 구조를 만든다.\n\n### 1.2 컬러 팔레트 및 그라데이션 공식\n\n| 구분 | 컬러명 | HEX | RGB | 적용 영역 및 역할 |\n|---|---|---|---|---|\n| Primary | Deep Navy | #0F3C57 | 15,60,87 | 메인 타이틀 텍스트, 다크 카드 배경, 숫자 원형 배지 배경, 헤더 텍스트 |\n| Primary Dark | Midnight Navy | #0A2A3F | 10,42,63 | 다크 카드 그라데이션 하단, 웨이브 그래픽 가장 짙은 영역 |\n| Secondary / Accent | Aqua Mint | #8FE3D9 | 143,227,217 | 강조 숫자 바(차트), 웨이브 그래픽 밝은 전환부, 강조 포인트 |\n| Secondary Dark | Teal Blue | #1B6E8C | 27,110,140 | 보조 막대그래프, 서브 헤딩 컬러, 링크성 텍스트 |\n| Neutral Background | Ice Blue White | #F3FAFB | 243,250,251 | 전체 슬라이드 배경(밝은 끝부분) |\n| Neutral Surface | Pure White | #FFFFFF | 255,255,255 | 콘텐츠 카드 배경, 본문 슬라이드 하단 영역 |\n| Neutral Text | Slate Gray | #6B7784 | 107,119,132 | 본문 설명 텍스트, 캡션, 저자 라벨 |\n| Accent Dark | Ink Navy | #0D2B3E | 13,43,62 | 숫자 배지 텍스트 배경 대비용 |\n\n**시그니처 그라데이션 공식 (웨이브 배경)**\n- 각도: 유기적 블롭/웨이브 셰이프이나, 색상 흐름은 약 135°~160° 방향\n- 색 전개: `#0A2A3F`(좌상단) → `#1B6E8C`(중간 전환) → `#8FE3D9`(밝은 민트 포인트) → `#EAF6F8`(우하단) → `#FFFFFF`\n- 적용: 표지(Master 1)는 화면의 약 60%를 덮는 대형 웨이브, 내지(Master 2~6)는 상단 15~20% 높이만 얇게 침범하는 축소형 웨이브\n- 다크 카드 그라데이션: `#0F3C57` → `#0A2A3F` (수직/135°, 미세한 톤 변화)\n\n**오버레이 공식**\n- 사진 위 별도 색상 오버레이 없음 — 블루 톤 사진을 선별해 팔레트와 자연히 맞춤. 풀블리드 크롭.\n- 다크 카드 위 텍스트는 불투명 100% 화이트, 별도 그림자 없음.\n\n### 1.3 타이포그래피 시스템\n\n| 위계 요소 | 원본 폰트(추정) | 한글 대체 추천 | 크기(1280px 기준) | 굵기·스타일 규칙 |\n|---|---|---|---|---|\n| 메인 타이틀(표지) | Poppins/Quicksand 계열 Geometric Rounded Sans | Pretendard ExtraBold | 54~60pt | Bold, 네이비, 2줄, 자간 좁게 |\n| 섹션 타이틀 | 동일 Geometric Sans | Pretendard Bold | 40~44pt | Bold, 네이비, 좌측 정렬 |\n| 서브 헤딩(카드 제목) | Poppins SemiBold | Pretendard SemiBold | 18~20pt | 다크카드=화이트, 화이트카드=네이비 |\n| 본문 텍스트 | Roboto/Noto Sans 계열 | Pretendard Regular | 13~14pt | Regular, 회색, 행간 150~160% |\n| 숫자 강조(KPI) | Poppins Bold, 넓은 자간 | Pretendard Bold | 44~56pt | Bold, 화이트/아쿠아 |\n| 마이크로 텍스트(헤더) | Roboto Light | Pretendard Light | 10~11pt | 자간 +0.5~1px |\n\n**조형 규칙**: 상단 헤더 3분할(좌: 리포트명 / 중: 연도·라벨 / 우: 섹션 번호)이 모든 슬라이드 반복. 숫자 배지(원형)+텍스트 교차 배치 시 배지는 좌측 고정폭, 텍스트는 우측 수직 중앙 정렬.\n\n## 2. 사진과 그래픽의 조화 원칙\n- **풀블리드 크롭**: 사진은 슬라이드 경계를 벗어나도록 배치해 공간감 연출, 좌측 끝은 건물 모서리 등 자연스러운 수직선에서 절단.\n- **마스킹 없는 단순 사각형 배치**: 원형/다각형 마스킹 미사용, 좌하단 모서리만 radius.\n- **색온도 매칭**: 블루/시안 계열 사진만 사용(웜톤 배제).\n- **텍스트-이미지 완전 분리**: 텍스트는 항상 사진 반대편에 배치, 겹침 없음.\n- **레이어 순서**: 웨이브 배경(최하단) → 사진 → 헤더/텍스트.\n\n## 3. 페이지별 구성요소 및 상세 배치 설계도\n\n**[Master 1] 표지**: 대형 웨이브 전면 배경(네이비→백색). 헤더 3분할 고정. 중앙 메인 타이틀 2줄(56pt) + 서브텍스트 + 알약형 CTA 버튼 + 하단 로고.\n\n**[Master 2] 목차**: 축소 웨이브(상단 25%). 좌측 \"Contents\" 타이틀(44pt) + 4개 원형 배지 리스트(56px 간격). 우측 풀블리드 건물 사진(캔버스 46~100%, 세로 25~90%).\n\n**[Master 3] 본문(Executive Summary)**: 상단 얇은 웨이브 스트립. 좌측 화이트 카드 2개 세로 스택(제목+본문). 우측 다크 네이비 카드(제목+설명+미니 막대그래프 2개+메인 KPI \"+78%\" 48pt).\n\n**[Master 4] 간지/섹션 전환(추정)**: 표지 축소형 웨이브(35%), 좌측 정렬 대형 섹션 번호+섹션명+하위 목차 리스트.\n\n**[Master 5] 데이터 그리드(추정)**: 상단 웨이브 스트립+타이틀, 하단 3~4단 KPI 컬럼 그리드(숫자+라벨, 세로 구분선).\n\n**[Master 6] 클로징(추정)**: 표지의 거울 구성(웨이브 우상단→좌하단), 중앙 타이틀+하단 로고/연락처.\n\n## 4. 만능 적용 공식\n\n| 원본 주제 | 목차 사진 | KPI 차트 주제 | 다크 카드 주제 |\n|---|---|---|---|\n| 마케팅 | 캠페인 스튜디오 사진 | ROAS/전환율 | 캠페인 전략 |\n| IT/SaaS | 데이터센터/서버랙 | MRR/가입자 수 | 제품 로드맵 |\n| 헬스케어 | 병원 로비 블루톤 | 환자 만족도/회복률 | 치료 프로토콜 |\n| 제조/공급망 | 자동화 공장 라인 | 생산 효율/불량률 | 공급망 전략 |\n\n```\nDesign style: corporate navy-aqua business report, 16:9 PowerPoint slide.\nBackground: soft organic wave gradient flowing diagonally from deep navy (#0A2A3F)\nthrough teal-blue (#1B6E8C) to light aqua mint (#8FE3D9) fading into near-white\nice-blue (#F3FAFB), occupying the top 15-60% of the canvas depending on slide type.\nTypography: geometric rounded sans-serif (Poppins/Pretendard style), bold navy\n(#0F3C57) titles, gray (#6B7784) body copy, large bold KPI numbers in white or\naqua mint on dark navy cards.\nLayout: flat white rounded cards (large radius ~20px, no drop shadow) for light\ncontent blocks; solid navy-to-midnight gradient rounded cards for highlighted\nstrategic content; circular navy badges with white numerals for list items.\nPhotography: full-bleed cropped architecture/glass-building photos in cool blue\ntones, bottom-left corner rounded, placed opposite text blocks, never overlapping.\nHeader bar: fixed 3-column micro-text header repeated on every slide, 10-11pt.\nAbsolutely NO drop shadows, NO warm/orange tones, NO clutter — maximize\nwhitespace, one key message and one hero number per slide.\n```","previewUrl":"https://imgscf.slidemembers.com/docs/1/2/1079/2026_second_half_business_strategy_corporate_performance_report_ppt_template_best_powerpoint_presentation_templates_1078068.jpg","source":{"type":"url","url":"https://www.slidemembers.com/en_US/view/PPT-Templates/2026-second-half-business-strategy-corporate-performance-report-ppt-template-best-powerpoint-presentation-templates-21806"},"tokens":{"primary":"#0F3C57","secondary":"#8FE3D9","bg":"#F3FAFB","text":"#6B7784","font":"sans"}},
  {"id":"url-dining-franchise","part":"ppt","layout":"boldtypo","name":"블루밍키친 프랜차이즈 피치덱","ref":"링크에서 디자인가이드 복제: https://www.slidemembers.com/en_US/view/PPT-Templates/casual-dining-franchise-proposal-pitch-deck-powerpoint-for-successful-founders-school-ppt-21781","guide":"이미지 3장(표지 2종, 본문 1종) 분석을 바탕으로 디자인 가이드를 작성했습니다.","guideMd":"이미지 3장(표지 2종, 본문 1종) 분석을 바탕으로 디자인 가이드를 작성했습니다.\n\n# 디자인 가이드 — Blooming Kitchen 캐주얼 다이닝 프랜차이즈 피치덱\n\n## 1. 전체 디자인 시스템\n\n### 1.1 핵심 디자인 철학\n\n1. **포토-카피 2분할(Split Canvas) 구조** — 모든 슬라이드가 \"실사 사진 블록 : 백색 정보 블록\"으로 명확히 분리된다. 사진은 분위기·신뢰감을, 백색 영역은 정보 전달을 전담해 가독성과 감성을 동시에 확보한다.\n2. **오렌지 포인트의 절제된 사용** — 베이스는 철저히 흑백(블랙 타이포 + 화이트 배경 + 그레이 보조)이고, 오렌지(#E2621B 계열)는 라벨 탭, 체크 아이콘, 키워드 1~2단어, 구분 태그라인에만 \"점묘법\"처럼 찍어 브랜드 포인트를 만든다. 면적 대비 10% 이하로 억제함으로써 오렌지가 나올 때마다 시선이 꽂히게 설계.\n3. **사진 위에 올라타는 라벨 탭(Overlapping Tab)** — 오렌지 라벨/배지가 사진 프레임 경계선을 넘어 걸치도록 배치해(표지의 원형 배지, 본문의 \"Operating 180+\" 밴드) 평면적인 2분할 레이아웃에 레이어 깊이감을 부여한다.\n4. **그리드 페이퍼 질감의 여백** — 백색 패널 바깥쪽(캔버스 전체 배경)에 옅은 모눈종이(그래프 페이퍼) 패턴을 깔아 \"기획안/제안서\" 다운 실무적·설계도적 톤을 연출. 실제 콘텐츠 패널은 완전한 순백으로 대비시켜 패턴 위에 \"붙여넣은 카드\"처럼 보이게 한다.\n\n### 1.2 컬러 팔레트 및 그라데이션 공식\n\n| 구분 | 컬러명 | HEX | RGB | 적용 영역 및 역할 |\n|---|---|---|---|---|\n| Primary | Signature Orange | #E2621B | 226,98,27 | 라벨 탭 배경, 원형 배지, 체크 아이콘, 키워드 강조 단어, 태그라인, 테마컬러 |\n| Primary(Dark) | Deep Orange(배지 외곽) | #C8530F | 200,83,15 | 원형 배지 외곽 링, 호버/그림자용 어두운 변형 |\n| Secondary | Ink Black | #1A1A1A | 26,26,26 | 메인 타이틀, 숫자(통계), 바디 헤드라인 |\n| Neutral 1 | Card Gray | #F2F2F2 | 242,242,242 | 통계 카드 배경, 구분 박스 |\n| Neutral 2 | Body Gray | #6E6E6E | 110,110,110 | 본문 문단, 서브 라벨(Franchise Proposal), 캡션 |\n| Neutral 3 | Line Gray | #D9D9D9 | 217,217,217 | 모눈 배경선, 구분선, 카드 보더 |\n| Base | Pure White | #FFFFFF | 255,255,255 | 콘텐츠 패널 배경 |\n| Accent(사진 톤) | Warm Wood Brown | #8A5A33 | 138,90,51 | 사진 자체의 우드톤 인테리어/음식 색감과 오렌지 포인트를 연결하는 암묵적 배경색 |\n\n- **시그니처 오렌지 탭 자체는 그라데이션 없는 단색(Flat Fill)** — 라벨/배지/카드 아이콘 모두 플랫 컬러로 처리해 사진의 자연광 질감과 선명히 구분되는 \"스티커\" 느낌을 준다.\n- **원형 배지 오버레이 공식**: 배경 사진 위에 `원형(Orange #E2621B, 지름 ≈ 캔버스 높이의 14%) + 내부 흰색 테두리 스트로크 3px + 중앙 흰색 아이콘` 순으로 레이어링. 배지 중심점은 사진 패널의 좌상단 경계선 위(사진 폭의 바깥쪽 10%, 안쪽 90% 지점)에 배치해 \"경계를 뚫고 나온\" 인상을 만든다.\n- **사진 오버레이 공식**: 사진 자체에는 색 보정 없이 원본 노출 그대로 사용하되, 하단 15~20% 영역에 오렌지 밴드(불투명도 100%, 텍스트 흰색 굵게)를 얹어 사진이 끝나는 지점에서 바로 정보 레이어로 전환.\n\n### 1.3 타이포그래피 시스템\n\n| 위계 요소 | 원본 폰트 | 한글 대체 추천 | 크기(16:9, 1280×720 기준) | 굵기·스타일 규칙 |\n|---|---|---|---|---|\n| 메인 타이틀(표지) | Gravitas One (세리프 디스플레이) | Noto Serif KR Black / 여기어때 잘난체 | 48~54pt | 매우 굵은 블랙, 자간 좁게, 2줄 이내 |\n| 메인 타이틀(본문 헤드) | Pretendard Bold | Pretendard Bold / Noto Sans KR Bold | 32~36pt | 블랙, 섹션당 1회만 등장, 좌측 정렬 고정 |\n| 서브 강조 타이틀(What is~) | Pretendard SemiBold | Pretendard SemiBold | 26~28pt | 앞 1~2단어만 오렌지 컬러, 나머지는 블랙 — 색상으로 끊어 읽히는 2-Tone 타이틀 |\n| 라벨/배지 텍스트 | Pretendard Bold (All Caps) | Pretendard Bold, 자간 +50 | 13~14pt | 흰색, 전체 대문자, 오렌지 박스 안에 중앙 정렬 |\n| 마이크로 라벨(우상단) | Pretendard Medium | Pretendard Medium | 12~13pt | 그레이(#6E6E6E), 슬라이드 종류 표기용 보조 텍스트 |\n| 본문 단락 | Pretendard Regular | Pretendard Regular | 13~14pt | 그레이, 줄간격 1.5, 최대 2~3줄 단락 |\n| 통계 숫자 | Pretendard ExtraBold | Pretendard ExtraBold | 24~28pt | 블랙, 카드 상단 배치 |\n| 통계 캡션 | Pretendard Regular | Pretendard Regular | 12~13pt | 그레이, 숫자 바로 아래 2줄 이내 |\n| 태그라인(하단) | Pretendard Medium | Pretendard Medium | 14~15pt | 오렌지, 가운데점(·)으로 키워드 구분, 중앙 정렬 |\n\n- **교차·중첩 배치 규칙**: (1) 제목은 항상 좌측 상단 고정, 우상단에는 그레이 마이크로 라벨로 \"현재 섹션/문서 성격\"을 표기해 좌-블랙/우-그레이의 비대칭 균형을 만든다. (2) 서브타이틀은 반드시 \"오렌지 단어 + 블랙 단어\" 조합으로, 색이 바뀌는 지점이 의미 단위(예: \"What is\" vs \"Blooming Kitchen?\")와 일치하도록 끊는다. (3) 숫자(통계)는 카드 상단, 설명은 카드 하단으로 수직 위계를 분명히 하고 카드 간 간격은 폰트 크기의 1.5배 이상 확보.\n\n## 2. 사진과 그래픽의 조화 원칙\n\n- **피사체 분리 없는 통짜 사진 사용**: 본 템플릿은 누끼(배경 제거) 없이 사진을 사각 프레임 그대로 꽉 채워(full-bleed) 쓴다. 대신 사진 자체를 \"인물의 손+음식 클로즈업\"처럼 피사체가 화면을 가득 채우는 구도로 선택해 별도 마스킹 없이도 시선이 분산되지 않게 한다.\n- **프레임 경계 오버레이로 가독성 확보**: 사진과 텍스트를 같은 면에 올리지 않는다. 텍스트가 필요한 경우 반드시 (a) 사진 바깥 백색 영역이거나 (b) 사진 하단에 불투명 오렌지 밴드를 깔아 그 위에만 흰 글씨를 쓴다. 사진 위에 직접 반투명 텍스트를 얹는 기법은 사용하지 않음 — 가독성 리스크를 원천 차단하는 보수적 전략.\n- **원형 배지로 사진-백색 영역을 봉합**: 표지에서 오렌지 원형 아이콘 배지가 사진과 백색 패널의 경계선 정중앙에 걸쳐 있어, 두 이질적 영역(사진/플랫 컬러)을 하나의 레이어로 시각적으로 꿰매는 역할을 한다. 이 배지는 실제 업종(식기 아이콘)을 보여주는 픽토그램 역할도 겸한다.\n- **라이팅 매칭**: 선택하는 사진은 공통적으로 따뜻한 우드톤·골든아워 또는 웜 조명 느낌으로 통일해, 오렌지 브랜드 컬러와 사진의 색온도가 자연스럽게 공명하도록 한다(보색이 아닌 유사색 조화).\n\n## 3. 페이지별 구성요소 및 상세 배치 설계도\n\n캔버스 기준 1280×720px (16:9).\n\n### [Master 1] 표지(Cover)\n- 전체 배경: 그리드 페이퍼 패턴(옅은 회색선), 풀블리드.\n- 좌측 백색 콘텐츠 패널: x=48, y=62, w=600, h=600 (둥근 모서리 없음, 직각), 그림자 약하게(0 4px 20px rgba(0,0,0,0.08)).\n  - 좌상단 바깥(패널 밖, 배경 위): \"GROUP TITLE\" 마이크로 라벨, x=62, y=40, 11pt 블랙 Bold, 자간 넓게.\n  - 오렌지 라벨 박스: x=128, y=200, w=265, h=48, 배경 #E2621B, 내부 텍스트 \"BLOOMING KITCHEN\" 흰색 세리프 Bold 올캡, 중앙정렬.\n  - 메인 타이틀: x=128, y=270, \"Franchise Proposal\" 48pt 블랙 Bold Sans, 좌측 정렬.\n  - 하단 메타 정보 2행: \"Date : 20XX.00.00\" / \"Presented by : Service Planning Team\", x=148, y=390~430, 라벨 11pt Bold 블랙 + 값 11pt Regular 그레이, 2열 표.\n  - 패널 하단 중앙: 로고 \"◆ Slide Members\" 워터마크, y=505, 10pt 그레이 (실제 적용 시 발표사 로고로 교체).\n- 우�� 사진 패널: x=660, y=0, w=620, h=720(풀블리드, 캔버스 끝까지), 레스토랑 인테리어 사진(우드톤 테이블, 펜던트 조명, 통유리창).\n  - 원형 오렌지 배지: 중심 (660, 160), 지름 90px, 흰색 테두리 4px, 내부 흰색 식기(포크/스푼/접시) 아이콘, 좌측 패널 경계선 위에 절반 걸치도록 배치.\n\n### [Master 2] 간지/섹션 타이틀\nMaster 1과 동일 골격을 재사용하되 하단 메타 정보 대신 \"섹션 번호(01, 02…) + 섹션명\"만 배치. 오렌지 라벨 박스에는 섹션 카테고리명을 넣고, 사진은 해당 섹션 주제에 맞는 컷으로 교체.\n\n### [Master 3] 본문 — 좌사진/우텍스트 소개형 (예: Brand Introduction)\n- 좌측 사진 패널: x=30, y=42, w=450, h=636, 둥근 모서리 없음, 인물 손+음식 클로즈업 풀블리드.\n  - 오렌지 밴드(하단 오버레이): x=52, y=595, w=405, h=56, 배경 #E2621B, 텍스트 \"Operating 180+\" 흰색 Bold Serif 14pt 중앙정렬. 밴드는 사진 좌우 경계보다 살짝 안쪽(인셋 22px)으로 들어와 \"붙임딱지\"처럼 보이게 함.\n- 우측 백색 콘텐츠 패널: x=502, y=42, w=748, h=636.\n  - 좌상단: 메인 헤드라인 \"Brand Introduction\" 32pt 블랙 Bold, x=560, y=65.\n  - 우상단: 마이크로 라벨 \"Franchise Proposal\" 13pt 그레이, x=1053, y=75, 우측 정렬.\n  - 중단: 서브타이틀 \"What is Blooming Kitchen?\" 26pt — \"What is\"는 오렌지, \"Blooming Kitchen?\"은 블랙, x=560, y=250.\n  - 바디 단락: 13pt 그레이, 줄간격 1.5, 최대 width 640px, x=560, y=320~380.\n  - 통계 카드 3열: 각 카드 w=212, h=130, gap=24, y=440, x=560/796/1032. 카드 배경 #F2F2F2, 카드 우상단에 오렌지 체크 원형 아이콘(지름 32px)이 카드 경계에 절반 걸치도록 배치(여기서도 \"경계 돌파\" 모티프 반복). 카드 내부: 숫자(24pt Bold 블랙, 상단) + 캡션 2줄(12pt 그레이, 하단).\n  - 하단 태그라인: \"Quality · Consistency · Community\", 15pt 오렌지, 중앙정렬, y=625.\n\n### [Master 4] 목차(Agenda/Contents)\n좌측 사진 패널은 축소(w≈380)하고 우측 백색 패널에 번호 리스트(01~05)를 세로 나열. 각 항목: 2자리 숫자(오렌지, 28pt Bold) + 항목명(블랙, 16pt) + 하단 구분선(Neutral 3). 번호와 항목명 사이에 얇은 오렌지 세로선(2px) 배치.\n\n### [Master 5] 데이터/차트 슬라이드\n우측 백색 패널 안에서 사진 없이 풀 콘텐츠 사용. 헤드라인(32pt)+마이크로 라벨 구조는 유지, 본문 영역에 막대/도넛 차트 삽입. 차트 색상은 오렌지(#E2621B) 단색 + 그레이(#D9D9D9) 배경 바(Bar)의 2색 구성만 사용해 과도한 색 분산을 방지.\n\n### [Master 6] 클로징/Contact\n표지와 동일한 2분할 구조를 좌우 반전하여 사용(사진 좌측, 텍스트 우측 또는 그 반대), 메인 카피를 \"Thank You\" 또는 \"Contact Us\"로 교체, 하단에 연락처 3행(담당자/이메일/전화) 배치.\n\n## 4. 만능 적용 공식\n\n| 원본 요소(F&B 프랜차이즈) | 치환 매트릭스 — 테크 스타트업 | 치환 매트릭스 — 교육/에듀테크 | 치환 매트릭스 — 뷰티/코스메틱 |\n|---|---|---|---|\n| 레스토랑 인테리어 풀샷 | 오피스/코워킹 공간 또는 제품 UI 목업 | 강의실/온라인 클래스 화면 | 매장 인테리어/제품 디스플레이 |\n| 음식 클로즈업(손+포크) | 제품을 조작하는 손(디바이스/키보드) | 학생이 노트/태블릿에 필기하는 손 | 제품을 바르는/쥐는 손 클로즈업 |\n| 원형 식기 아이콘 배지 | 원형 로고/앱 아이콘 배지 | 원형 졸업모/책 아이콘 배지 | 원형 꽃/방울 아이콘 배지 |\n| \"Operating 180+\" 밴드 | \"Active Users 1M+\" 밴드 | \"Students 50,000+\" 밴드 | \"Stores 300+\" 밴드 |\n| 오렌지(#E2621B) | 테크 블루(#2563EB) 또는 그대로 유지 | 딥 그린(#1E8E5A) | 로즈(#D94F70) |\n| 통계 카드(5Years/4.6점/32%) | (Funding/MAU/Growth) | (Years Teaching/Satisfaction/Pass Rate) | (Years/Review Score/Repeat Rate) |\n\n### 복사해서 쓰는 스타일 고정 프롬프트\n\n```\nCreate a 16:9 business pitch-deck slide in the \"Split Canvas\" style:\n- Canvas background: subtle light-gray graph-paper grid pattern.\n- Layout: a pure white content card floating on the left ~60% of the canvas\n  (flat drop shadow), and a full-bleed warm, natural-light photograph\n  filling the right ~40% of the canvas edge-to-edge.\n- Color system: strict black (#1A1A1A) for all headline typography,\n  medium gray (#6E6E6E) for body text, light gray (#F2F2F2) for stat-card\n  backgrounds, and ONE signature accent color flat-filled (no gradients)\n  used sparingly only on: a small rectangular label tag, a circular badge\n  icon, checkmark icons inside stat cards, 1-2 keyword words inside the\n  subheadline, and a centered bottom tagline separated by middots.\n- Signature motif: a circular accent-color badge (with a thin white ring\n  and a white pictogram icon inside) straddling the exact boundary line\n  between the photo panel and the white panel, as if punching through it.\n- Typography: large bold black display headline top-left, small gray\n  micro-label top-right, a two-tone subheadline (accent word + black word),\n  3 horizontal stat cards (bold black number on top, gray 2-line caption\n  below, small accent checkmark badge overlapping the card's top-right\n  corner).\n- Photography mood: warm color temperature, natural light, subject fills\n  the frame edge-to-edge, no cutout/masking — straight rectangular crop.\n- Overall feel: clean, professional, restrained use of color, generous\n  whitespace, editorial sans-serif typography (Pretendard/Montserrat-like).\nReplace accent color, photo subject, and keyword texts per [SUBJECT] below.\n[SUBJECT]: {{여기에 치환할 주제 소재와 액센트 컬러 HEX를 기입}}\n```","previewUrl":"https://imgscf.slidemembers.com/docs/1/2/1077/casual_dining_franchise_proposal_pitch_deck_powerpoint_for_successful_founders_school_ppt_1076343.jpg","source":{"type":"url","url":"https://www.slidemembers.com/en_US/view/PPT-Templates/casual-dining-franchise-proposal-pitch-deck-powerpoint-for-successful-founders-school-ppt-21781"},"tokens":{"primary":"#E2621B","secondary":"#1A1A1A","bg":"#FFFFFF","text":"#6E6E6E","font":"sans"}},
  {"id":"url-hopedesign-lecture","part":"ppt","layout":"corporate","name":"휴먼트리 기부제안서 강의자료","ref":"노션 캡처에서 디자인가이드 복제: 기부제안서 작성법 강의자료 (Humantree)","guide":"1. **\"라벨 배지 + 손글씨 타이틀\"의 2단 헤더 고정 문법** — 모든 페이지 좌상단에 컬러 라운드 배지(섹션명)를 놓고, 그 오른쪽에 콜론(:)으로 시작하는 붓글씨체 핵심 문장을 붙인다. 이 조합이 페이지 종류를 즉시 구분시키는 시그니처 장치다.","guideMd":"# 디자인 가이드 — Humantree 기부제안서 강의자료 (스카이블루 캘리그래피 다이어그램 시스템)\n\n## 1. 전체 디자인 시스템\n\n### 1.1 핵심 디자인 철학\n\n1. **\"라벨 배지 + 손글씨 타이틀\"의 2단 헤더 고정 문법** — 모든 페이지 좌상단에 컬러 라운드 배지(섹션명)를 놓고, 그 오른쪽에 콜론(:)으로 시작하는 붓글씨체 핵심 문장을 붙인다. 이 조합이 페이지 종류를 즉시 구분시키는 시그니처 장치다.\n2. **여백이 곧 설계다** — 슬라이드 상단 1/3은 거의 비워두고(헤더만 존재), 중단에 다이어그램, 하단에 텍스트를 배치해 \"읽는 리듬\"을 강제한다. 콘텐츠 밀도를 억지로 채우지 않고 3단 레이어(헤더-다이어그램-근거)로 호흡을 분리한다.\n3. **점선 원·라운드 사각은 \"생각 중/과정\"을, 실선 두꺼운 프레임은 \"확정된 사례\"를 의미하는 기하 모티프 이원화** — 카키색 점선 원과 점선 라운드사각(이중 테두리)은 개념·구성요소 설명에, 카키색 굵은 실선 라운드 프레임은 실제 예시(샘플 문서) 캡슐에 쓰여 \"아직 전개 중 vs 완성본\"을 형태로 구분한다.\n4. **레이어 깊이감은 색이 아니라 라인으로 만든다** — 그림자·입체 대신 이중 테두리(아웃라인 두 겹)와 점선 간격만으로 입체감을 주는 플랫 디자인. 사진이 들어가는 페이지(마스터4)에서만 예외적으로 실사 콜라주가 등장해 \"이론 vs 실물\"의 대비를 만든다.\n\n### 1.2 컬러 팔레트 및 그라데이션 공식\n\n| 구분 | 컬러명 | HEX | RGB | 적용 영역 및 역할 |\n|---|---|---|---|---|\n| Primary | 스카이블루 그라데이션 | #8FD9F7 → #D6F3FF | 143,217,247 → 214,243,255 | 표지/본문형 섹션 라벨 배지 배경 (좌상단 캡슐). 가장 먼저 눈에 띄는 \"장(chapter) 식별자\" |\n| Primary Accent | 라이트블루 화살표 | #7FD4F0 | 127,212,240 | 예시 캡슐 옆 주석 화살표(mint-sky 톤), 다이어그램 연결 화살표 강조 |\n| Secondary | 카키/올리브 아웃라인 | #BDB07E | 189,176,126 | 점선 원, 점선 라운드사각 체인, 실선 굵은 프레임의 테두리 컬러 (채움 없이 선으로만 사용) |\n| Secondary Accent | 오렌지 아웃라인 | #F2A227 | 242,162,39 | \"예를들어\"/\"sample\" 라벨 배지 테두리 — 사례·레퍼런스 파트 전용 색 |\n| Neutral | 블랙 텍스트 | #1A1A1A | 26,26,26 | 본문/제목/체크리스트 기본 텍스트 컬러 |\n| Neutral BG | 화이트 | #FFFFFF | 255,255,255 | 전 페이지 배경, 여백 확보용 |\n| Accent | 레드 강조 | #E53224 | 229,50,36 | 다이어그램 마지막 단계(결론/핵심 메시지) 볼드 레드 텍스트로 시선 집중 |\n\n**그라데이션 공식**: 라벨 배지는 좌상단 → 우하단 135° 대각 그라데이션, 시작 색 `#8FD9F7`(채도 높은 스카이블루) → 끝 색 `#D6F3FF`(거의 화이트에 가까운 파스텔)로 밝아지며, 배지 모서리 radius는 배지 높이의 45~50%(완전 필캡슐에 가까운 라운드).\n**오버레이 공식**: 사진 콜라주(마스터4)에서는 오버레이를 쓰지 않고 원본 포스터를 그대로 그리드에 flush 배치한다 — 텍스트 가독성은 각 포스터 자체의 명암 대비(블랙 바/화이트 배경)에 위임한다.\n\n### 1.3 타이포그래피 시스템\n\n| 위계 요소 | 원본 폰트(추정) | 한글 대체 추천 | 크기 | 굵기·스타일 규칙 |\n|---|---|---|---|---|\n| 메인 타이틀 (\": 문장\") | 손글씨/붓글씨체 (배달의민족 주아체·연성체 계열) | 나눔손글씨 붓, HS여름물빛체, 온글잎 박다현체 | 32~36pt | 레귤러~세미볼드, 항상 콜론(:) + 한 칸 띄고 시작, 좌측 배지와 베이스라인 정렬 |\n| 섹션 라벨 (배지 안 텍스트) | 고딕 볼드 (Noto Sans KR / 스포카 한 산스) | Pretendard Bold, Noto Sans KR Bold | 22~26pt | 볼드, 배지 중앙 정렬, 자간 좁게 |\n| 다이어그램 소제목 (원/사각 내부) | 고딕 세미볼드 | Pretendard SemiBold | 20~24pt | 중앙정렬, 2줄까지 자동 줄바꿈 허용, 핵심 결론 단계는 레드+볼드 |\n| 본문/체크리스트 | 고딕 레귤러 | Pretendard Regular, Noto Sans KR | 15~17pt | \"Check Lists :\" 헤더만 볼드+영문 고딕(살짝 다른 서체감 — 로고체 느낌), 번호는 원문자(①②③) 또는 동그라미 숫자 |\n| 마이크로 텍스트 (etc, sample, 영문 캡션) | 고딕 또는 모노스페이스 느낌 영문 | Montserrat, Poppins | 13~16pt | 소문자 영문 단독 사용 시 캐주얼한 느낌의 산세리프, 이탤릭 없음 |\n\n**교차·중첩 배치 규칙**: 좌상단 라벨 배지는 항상 슬라이드 여백선 바깥(좌측 끝에서 margin 거의 0)에 반쯤 걸치듯 배치해 \"포스트잇처럼 붙어있는\" 느낌을 주고, 배지와 타이틀 사이는 배지 폭의 약 15~20%만큼만 띄워 시각적으로 한 덩어리처럼 보이게 한다.\n\n## 2. 사진과 그래픽의 조화 원칙\n\n- **원본 그대로 노출(No Masking)**: 실물 포스터/캠페인 이미지는 크롭이나 마스킹 없이 원본 비율 그대로 세로 스트립 형태로 나열한다. 각 이미지가 이미 완성된 디자인이므로 추가 가공을 하지 않는 것이 \"날것의 레퍼런스 사료\"라는 신뢰도를 준다.\n- **그리드 경계선 제거(Flush Grid)**: 이미지 간 여백·구분선을 0에 가깝게 붙여 하나의 연속된 \"필름 스트립\"처럼 보이게 하고, 전체 그리드는 슬라이드 좌우 끝까지 꽉 채워(bleed) 배경 화이트와 대비시킨다.\n- **상단 라벨 배지만 분리**: 사진이 들어가는 페이지에서도 상단 \"sample\" 배지는 사진 영역과 분리된 순수 여백 위에 떠 있어, \"그래픽 레이어(설명) vs 사진 레이어(증거)\"가 수직으로 명확히 분단된다.\n- **가독성은 원본에 위임**: 캡슐/화살표 주석이 들어가는 예시 슬라이드(마스터3)에서는 텍스트 블록 전체를 카키색 굵은 테두리 프레임 안에 가둬 배경과 분리하고, 그 바깥에 하늘색 화살표+라벨만 추가해 \"이 문단이 어떤 기능을 하는지\" 주석을 단다 — 원문을 변형하지 않고 외부에서 주석만 더하는 방식.\n\n## 3. 페이지별 구성요소 및 상세 배치 설계도 (16:9, 1600×900 기준)\n\n### [Master 1] 개념 설명형 — 표지 (source-1)\n- **레이어 순서**: 배경(화이트) → 하단 Check List 블록 → 중단 다이어그램(체인) → 상단 헤더(최상위)\n- 상단 라벨 배지: x 40 / y 30, 너비 180 / 높이 80, 스카이블루 대각 그라데이션, radius ~36px, 중앙 텍스트 \"표지\" (26pt 볼드)\n- 타이틀: 배지 우측 x 260 / y 60, 붓글씨체 \": 기부자가 만날 첫 문장\" (34pt)\n- 중단 다이어그램 (y 420~650 영역):\n  - 점선 원 \"구성요소\": x 60, w 240×h 240, 카키 점선(dash 8px, gap 6px) 테두리, 내부 텍스트 볼드 20pt, 우측에 화살표(→) 솔리드 블랙으로 체인 연결\n  - 라운드 사각 칩 5개 연속 배치: 각 w 220×h 220, 카키 이중 실선 테두리(간격 6px), radius 40px, 칩 간격 거의 0(테두리끼리 겹치듯 밀착), 내용: 헤드라인/태그라인/제목·부제/주관,주최/…etc\n- 구분선: y 760, 슬라이드 전체 폭 가로지르는 카키 점선(가늘게)\n- 하단 텍스트 블록 (y 790~900): 좌측 정렬 불릿 2줄(①②③ 구성 설명) + 볼드 소제목 \"쉽고 궁금함이 핵심\" + \"Check Lists :\" 헤더 + 번호(①~⑤) 체크 항목 5개\n- 우하단 모서리: 작은 캐릭터 일러스트(안경 쓴 사람 아이콘, 약 60×60px) — 챕터 완료 마커 역할\n\n### [Master 2] 핵심꼭지 설명형 (source-2)\n- 라벨 배지: \"핵심꼭지2-1\" (하위 넘버링 포함, 폭은 텍스트 길이에 맞춰 가변), 동일 스카이블루 그라데이션·좌상단 위치\n- 타이틀: \": 기부참여 프로그램 제안\" (붓글씨체, 배지 옆)\n- 중단: 대형 점선 원 3개, 각 지름 ~380px, 균등 간격 배치(좌 x120, 중 x620, 우 x1120), y중심 400\n  - 원 내부 텍스트: 좌(개조식 2줄), 중(개조식 3줄), 우(결론 — 일부 레드 볼드 강조 \"기부참여 프로그램 필요\")\n  - 원 사이 화살표: 블랙 솔리드, 두께 중간, 원과 원 사이 간격의 중앙에 배치\n- 구분선(y 650 부근): 전체 폭 가로지르는 카키 점선\n- 하단 텍스트: \"기부참여 프로그램은\" 소제목 + \"Check Lists :\" + 번호 ①~⑩ 2열 혹은 1열 리스트 (본 예시는 10개 항목이라 줄 간격 축소, 폰트 14~15pt로 다운사이즈)\n- 우하단: HUMANTREE 로고 + 캐릭터 일러스트 고정 배치(모든 본문형 페이지 공통 워터마크 요소)\n\n### [Master 3] 예시 캡슐형 (source-3)\n- 라벨 배지: \"예를들어\" — 오렌지(#F2A227) 아웃라인만 있는 화이트 배경 라운드 사각(채움 없음, 테두리 2~3px), 좌상단 고정\n- 본문 캡슐: 화면 좌측 60~65% 영역을 차지하는 대형 세로 라운드 프레임, 테두리는 카키색 굵은 실선(6~8px), radius 매우 큼(모서리 반경 ~100px, 상하 캡슐형)\n  - 프레임 내부: 메인 타이틀(2줄, 고딕 볼드 28pt) → 서브카피(볼드 밑줄 or 강조 18pt) → 소제목 볼드(\"해피사운드 캠페인이란!\") → 본문 문단 3단락(레귤러 15pt, 줄간격 넉넉) → 마지막 한 줄 볼드 질문형 마무리\n- 외부 주석: 프레임 우측 바깥, 하늘색 화살표 쉐브론(chevron, 두꺼운 삼각 화살표 블록) 2개를 세로로 배치\n  - 화살표 1 (상단, y~600): 우측에 라벨 \"기부참여 프로그램\" (고딕 볼드 20pt)\n  - 화살표 2 (하단, y~950): 우측에 라벨 \"과제해결방안 - 후원대상사업\" (고딕 볼드 20pt, 2줄)\n- 전체적으로 좌(실물 예문) : 우(기능 주석)의 65:35 레이아웃 비율\n\n### [Master 4] 샘플 콜라주형 (source-4)\n- 라벨 배지: \"sample\" — 오렌지 아웃라인 라운드 사각(마스터3과 동일 스타일, 소문자 영문), 좌상단, 하단 여백 넉넉(배지와 이미지 그리드 사이 약 150~180px 공백)\n- 상단 공백 구간: 슬라이드 상단 약 22%를 완전히 비워 \"쉬어가는 공간\" 확보\n- 하단 78% 전체: 4분할 세로 스트립 그리드, 각 컬럼 폭 동일(25%), 컬럼 간 간격 0(이미지가 서로 맞닿음), 각 이미지는 슬라이드 하단 끝까지 bleed(잘림 허용)\n  - 컬럼1: 블랙 바 헤드라인 + 옐로 배경 포스터(아이콘 3개 포함)\n  - 컬럼2: 옐로 배경, 건축 일러스트 포함 포스터\n  - 컬럼3: 화이트 배경, 컬러풀 로고형 포스터(행사 엠블럼)\n  - 컬럼4: 화이트 배경 + 실사진(손 페인팅) 포스터\n- 그리드는 서로 다른 실제 캠페인 4건을 레퍼런스로 나열 — 디자인 톤(옐로/화이트 혼합)이 의도적으로 다양해야 \"다양한 사례 비교\"라는 목적이 전달됨\n\n## 4. 만능 적용 공식\n\n### 주제별 비주얼 소재 치환 매트릭스\n\n| 원본 요소 | 역할 | 다른 주제로 치환 시 대체 소재 예시 |\n|---|---|---|\n| 스카이블루 배지 + 붓글씨 타이틀 | 챕터/섹션 식별 | 브랜드 주제색 그라데이션 배지로 치환 (예: 교육 주제 → 민트 그라데이션, IT 주제 → 네이비 그라데이션), 손글씨체는 그대로 유지해 \"따뜻한 강의\" 톤 보존 |\n| 점선 원 체인 | 순차적 개념/논리 흐름 | 프로세스 단계, 원인→결과, 문제→해결 등 모든 \"단계식 설명\"에 재사용 가능. 원 개수만 내용에 맞게 3~6개로 조절 |\n| 카키 이중선 라운드 칩 | 병렬 요소 나열 | 구성요소, 체크포인트, 카테고리 분류 등 \"동등한 레벨의 항목 나열\"에 사용. 칩 개수 제한 없음 |\n| 레드 볼드 강조 텍스트 | 핵심 결론 하이라이트 | 어떤 다이어그램에서든 \"이것만은 기억하라\"는 마지막 노드에 레드 적용 |\n| 카키 굵은 프레임 캡슐 | 실제 사례/인용문 박스 | 고객 후기, 성공 사례, 실제 문서 발췌 등 \"증거 자료\"를 담는 모든 박스에 재사용 |\n| 하늘색 쉐브론 화살표 주석 | 외부 기능 설명 | 캡슐/이미지 옆에 \"이 부분이 하는 역할\"을 짧게 라벨링할 때 항상 사용 |\n| 오렌지 아웃라인 배지(예를들어/sample) | 사례·레퍼런스 전환 신호 | 본문형과 예시형을 색으로 구분하는 장치로, 어떤 강의자료든 \"이론 파트는 블루, 사례 파트는 오렌지\"로 고정하면 전체 덱의 내비게이션이 직관적으로 유지됨 |\n| 4분할 플러시 그리드 콜라주 | 다건 레퍼런스 비교 | 포트폴리오, 벤치마킹, Before/After 등 \"여러 실물을 나란히 비교\"하는 모든 페이지에 적용 |\n\n### 복사해서 쓰는 스타일 고정 프롬프트\n\n```\n[Humantree 강의자료 스타일 — PPT 16:9]\n배경은 순백색(#FFFFFF), 여백을 넉넉히 둔 미니멀 교육용 슬라이드.\n\n좌상단에 라운드 캡슐 배지를 배치한다:\n- 본문/개념 설명 페이지: 스카이블루 대각 그라데이션(#8FD9F7→#D6F3FF), 흰 배경 위, radius는 배지 높이의 45%\n- 예시/사례 페이지: 오렌지(#F2A227) 아웃라인만 있는 화이트 라운드 사각, 테두리 2~3px\n\n배지 오른쪽에 손글씨/붓글씨체 한글 타이틀을 \": \"로 시작해서 붙인다. (예: \": OOO를 위한 OOO\")\n\n중단 다이어그램은 카키/올리브색(#BDB07E) 선으로만 그린다 (채움 없음):\n- 점선 원 또는 점선 라운드사각으로 \"개념/단계\"를 표현, 원 사이는 블랙 솔리드 화살표로 연결\n- 결론에 해당하는 마지막 노드의 핵심 문구만 레드(#E53224) 볼드로 강조\n- 실제 완성 사례를 보여줄 때는 점선 대신 굵은 실선 테두리의 대형 라운드 프레임(카키색)을 쓰고, 그 옆에 하늘색(#7FD4F0) 쉐브론 화살표로 기능 라벨을 주석처럼 붙인다\n\n하단은 전체 폭 가로지르는 카키색 가는 점선으로 구분하고, 그 아래 고딕 볼드 소제목 + \"Check Lists :\" 헤더 + 원문자(①②③…) 번호 리스트를 블랙 텍스트로 배치한다.\n\n우하단 모서리에는 작은 캐릭터/로고 일러스트를 고정 워터마크로 둔다.\n\n폰트: 타이틀은 손글씨형 한글 서체, 본문/리스트는 고딕 산세리프(Pretendard/Noto Sans KR), 영문 보조 텍스트는 캐주얼 산세리프.\n\nAbsolutely NO extra decorative gradients beyond specified, NO shadows, NO skeuomorphic effects, NO watermark text beyond the described character icon.\n```","previewUrl":"https://hopedesign.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F30521cb2-324e-4887-ac71-65672eb8cc09%2F7914b836-6f15-457d-a5e5-14fe73d96831%2FUntitled.png?table=block&id=2780511c-8a47-42b5-bade-d65a1e3b9d79&cache=v2","source":{"type":"url","url":"https://hopedesign.notion.site/3f35fc49d5384e6685d27fa8e5894122"},"tokens":{"primary":"#8FD9F7","secondary":"#BDB07E","bg":"#FFFFFF","text":"#1A1A1A","font":"sans"}},
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

const RENDERERS = { ppt: renderPPT, poster: renderPoster, landing: renderLanding };

/* node 테스트용 (브라우저에서는 무시됨) */
if (typeof module !== 'undefined') {
  module.exports = { SEED_DESIGNS, LAYOUTS, RENDERERS, SAMPLE_CONTENT, generateGuideMd, LAYOUT_SPECS };
}
