/* api/ai.js — Claude API 프록시 (Vercel Serverless Function)
 * mode: 'analyze' → 디자인 원본(이미지/PPT 텍스트/URL)을 보고 상세 디자인가이드 md 작성
 * mode: 'compose' → 디자인가이드 md + 원고 전체 → 완성 HTML 결과물 생성
 * 환경변수 ANTHROPIC_API_KEY 필요.
 */

const { analyzeSystem, composeSystem, splitTokens, cleanHtml, composeUser } = require('../ai-prompts.js');

const ANTHROPIC_URL = 'https://api.anthropic.com/v1/messages';
const MODEL = process.env.AI_MODEL || 'claude-sonnet-5';

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
      return res.status(200).json(splitTokens(md));
    }

    if (mode === 'compose') {
      const { guideMd, content, imageList } = req.body;
      if (!guideMd || !content) return res.status(400).json({ error: '가이드와 원고가 필요합니다.' });
      const user = composeUser(guideMd, content, imageList);
      const html = await callClaude(apiKey, composeSystem(part), [{ role: 'user', content: user }], 60000);
      return res.status(200).json({ html: cleanHtml(html) });
    }

    return res.status(400).json({ error: 'unknown mode' });
  } catch (err) {
    return res.status(500).json({ error: String(err && err.message ? err.message : err) });
  }
};

module.exports.config = { maxDuration: 300 };
