/* ai-text-loading.js — Kokonut UI "AI Text Loading" 효과를 바닐라 JS로 이식
 * 원본: https://kokonutui.com (MIT License, @kokonutui) — React + motion 버전
 * 이 파일은 React 없이 같은 동작(글자 단위 등장 스태거, 밝기 웨이브, 단어 교체)을 구현한다.
 *
 * 사용: aiTextLoading(hostElement, ['문구1', '문구2'], { interval: 2200, label: '안내' })
 */

const AITL_WAVE_STEP = 0.07;   // 글자 사이 웨이브 간격(초)
const AITL_STAGGER = 0.018;    // 글자 등장 간격(초)
const AITL_EXIT_MS = 150;      // 이전 단어가 사라지는 시간(ms)

function aiTextLoading(host, texts, { interval = 2200, label = '' } = {}) {
  if (!host || !texts || !texts.length) return;

  host.classList.add('aitl');
  host.setAttribute('aria-live', 'polite');
  // 교체되는 문구는 스크린리더에서 숨기고, 고정 안내문 한 줄만 읽히게 한다.
  host.innerHTML = `<span class="aitl-sr">${label || texts.join('. ')}</span>`
    + '<span class="aitl-stage" aria-hidden="true"></span>';
  const stage = host.querySelector('.aitl-stage');

  const buildWord = text => {
    const word = document.createElement('span');
    word.className = 'aitl-word';
    [...text].forEach((ch, i) => {
      const char = document.createElement('span');
      char.className = 'aitl-char';
      char.style.animationDelay = `${i * AITL_STAGGER}s`;
      const wave = document.createElement('span');
      wave.className = 'aitl-wave';
      wave.style.animationDelay = `${i * AITL_WAVE_STEP}s`;
      wave.textContent = ch;
      char.appendChild(wave);
      word.appendChild(char);
    });
    return word;
  };

  let index = 0;
  stage.appendChild(buildWord(texts[0]));
  if (texts.length < 2) return;

  setInterval(() => {
    const prev = stage.firstElementChild;
    index = (index + 1) % texts.length;
    stage.appendChild(buildWord(texts[index]));
    if (prev) {
      prev.classList.add('is-exiting');
      setTimeout(() => prev.remove(), AITL_EXIT_MS);
    }
  }, interval);
}
