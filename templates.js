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
