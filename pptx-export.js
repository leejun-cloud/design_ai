/* Editable PowerPoint export. Text, layout shapes and metric bars stay native/editable. */
(function () {
  'use strict';

  const W = 13.333;
  const H = 7.5;
  const M = 0.62;
  const imageMemo = new Map();

  function hex(value, fallback) {
    return String(value || fallback || '#ffffff').replace('#', '').slice(0, 6).toUpperCase();
  }

  function makeImage(src, aspect, circle) {
    const key = String(src || '') + '|' + aspect.toFixed(4) + '|' + Boolean(circle);
    if (imageMemo.has(key)) return imageMemo.get(key);
    const task = (async function () {
      if (!src) return null;
      let data = src;
      if (!/^data:image\//i.test(data)) {
        const response = await fetch(data, { mode: 'cors' });
        if (!response.ok) throw new Error('이미지를 불러오지 못했습니다.');
        data = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(String(reader.result));
          reader.onerror = () => reject(new Error('이미지 파일을 읽지 못했습니다.'));
          response.blob().then(blob => reader.readAsDataURL(blob)).catch(reject);
        });
      }
      const img = await new Promise((resolve, reject) => {
        const image = new Image();
        image.onload = () => resolve(image);
        image.onerror = () => reject(new Error('이미지 형식을 읽을 수 없습니다.'));
        image.src = data;
      });
      const outW = circle ? 1000 : 1600;
      const outH = circle ? 1000 : Math.max(1, Math.round(outW / aspect));
      const canvas = document.createElement('canvas');
      canvas.width = outW;
      canvas.height = outH;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('이미지 변환을 시작할 수 없습니다.');
      if (circle) {
        ctx.clearRect(0, 0, outW, outH);
        ctx.beginPath();
        ctx.arc(outW / 2, outH / 2, outW / 2, 0, Math.PI * 2);
        ctx.clip();
      } else {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, outW, outH);
      }
      const srcRatio = img.naturalWidth / img.naturalHeight;
      let sx = 0, sy = 0, sw = img.naturalWidth, sh = img.naturalHeight;
      if (srcRatio > aspect) {
        sw = img.naturalHeight * aspect;
        sx = (img.naturalWidth - sw) / 2;
      } else {
        sh = img.naturalWidth / aspect;
        sy = (img.naturalHeight - sh) / 2;
      }
      ctx.drawImage(img, sx, sy, sw, sh, 0, 0, outW, outH);
      return canvas.toDataURL(circle || /^data:image\/svg\+xml/i.test(data) ? 'image/png' : 'image/jpeg', 0.88);
    })();
    imageMemo.set(key, task);
    return task;
  }

  function splitLongText(value, maxChars) {
    const source = String(value || '').replace(/\r/g, '').trim();
    if (!source) return [''];
    const paragraphs = source.split(/\n+/).map(x => x.trim()).filter(Boolean);
    const output = [];
    let current = '';
    const flush = () => { if (current.trim()) output.push(current.trim()); current = ''; };
    paragraphs.forEach(paragraph => {
      let rest = paragraph;
      while (rest.length > maxChars) {
        const space = rest.lastIndexOf(' ', maxChars);
        const punctuation = Math.max(rest.lastIndexOf('。', maxChars), rest.lastIndexOf('.', maxChars), rest.lastIndexOf('?', maxChars), rest.lastIndexOf('!', maxChars));
        let end = punctuation > space ? punctuation + 1 : space;
        if (end < maxChars * 0.55) end = maxChars;
        const piece = rest.slice(0, end).trim();
        if (current && (current + ' ' + piece).length > maxChars) flush();
        current = current ? current + '\n' + piece : piece;
        flush();
        rest = rest.slice(end).trim();
      }
      if (current && (current + '\n' + rest).length > maxChars) flush();
      current = current ? current + '\n' + rest : rest;
    });
    flush();
    return output.length ? output : [''];
  }

  function deckSections(content) {
    const title = String(content.title || '').trim();
    if (Array.isArray(content.sections) && content.sections.length) {
      const source = content.sections.slice();
      const first = source[0];
      let coverIntro = '';
      if (first && typeof first !== 'string' && (first.cover || String(first.heading || '').trim() === title)) {
        coverIntro = String(first.body || first.text || '').trim();
        source.shift();
      }
      const result = [];
      if (coverIntro) splitLongText(coverIntro, 320).forEach((body, partIndex) => result.push({ heading: partIndex ? '도입 · 계속' : '도입', body }));
      source.forEach((item, index) => {
        const heading = typeof item === 'string' ? '핵심 내용 ' + String(index + 1).padStart(2, '0') : String(item.heading || ('핵심 내용 ' + String(index + 1).padStart(2, '0'))).trim();
        const body = typeof item === 'string' ? item : String(item.body || item.text || '');
        const parts = splitLongText(body, 320);
        parts.forEach((part, partIndex) => result.push({
          heading: partIndex ? heading + ' · 계속' : heading,
          body: part,
        }));
      });
      return result;
    }

    const blocks = String(content.desc || '').replace(/\r/g, '').split(/\n\s*\n/).map(x => x.trim()).filter(Boolean);
    const parsed = [];
    let activeHeading = '';
    let activeBody = [];
    const flush = () => {
      if (activeHeading || activeBody.length) {
        parsed.push({ heading: activeHeading || ('핵심 내용 ' + String(parsed.length + 1).padStart(2, '0')), body: activeBody.join('\n') });
      }
      activeHeading = '';
      activeBody = [];
    };
    blocks.forEach(block => {
      const lines = block.split('\n').map(x => x.trim()).filter(Boolean);
      if (lines.length === 1 && lines[0].replace(/^#{1,4}\s*/, '').trim() === title) return;
      const marked = lines[0] && lines[0].match(/^#{1,4}\s+(.+)/);
      if (marked) {
        flush();
        activeHeading = marked[1].trim();
        activeBody = lines.slice(1);
        return;
      }
      if (lines[0] && lines[0].replace(/^[-*•]\s*/, '').trim() === title && lines.length > 1) lines.shift();
      if (lines.length > 1 && lines[0].length < 64 && activeBody.length === 0 && !activeHeading) {
        flush();
        activeHeading = lines.shift();
        activeBody = lines;
        flush();
      } else {
        activeBody.push(lines.join('\n'));
      }
    });
    flush();

    if (!parsed.length && String(content.desc || '').trim()) {
      const clean = String(content.desc).trim().replace(/^#{1,4}\s+[^\n]+\n?/, '');
      splitLongText(clean, 320).forEach((body, i) => parsed.push({ heading: '핵심 내용 ' + String(i + 1).padStart(2, '0'), body }));
    }
    return parsed.flatMap((section, index) => splitLongText(section.body, 320).map((body, partIndex) => ({
      heading: partIndex ? section.heading + ' · 계속' : section.heading || ('핵심 내용 ' + String(index + 1).padStart(2, '0')),
      body,
    })));
  }

  function cleanCredit(item) {
    if (!item) return '';
    return [item.title || '이미지', item.author || '', item.license || ''].filter(Boolean).join(' · ');
  }

  function makeDeck(design, content, onStatus) {
    if (typeof window.PptxGenJS !== 'function') throw new Error('PPTX 생성 라이브러리를 불러오지 못했습니다. 로컬 서버로 다시 열어 주세요.');
    const pptx = new window.PptxGenJS();
    pptx.layout = 'LAYOUT_WIDE';
    pptx.author = '디자인 AI 스튜디오';
    pptx.subject = String(content.subtitle || design.name || '발표자료');
    pptx.title = String(content.title || '발표자료');
    pptx.company = String(content.host || '');
    const sans = 'Arial';
    const serif = 'Georgia';
    const font = design.tokens && design.tokens.font === 'serif' ? serif : sans;
    pptx.theme = { headFontFace: font, bodyFontFace: font, lang: 'ko-KR' };
    const p = pptx.ShapeType;
    let slideCounter = 0;
    const addSlide = () => { slideCounter += 1; return pptx.addSlide(); };
    const tokens = design.tokens || {};
    const primary = hex(tokens.primary, '#1E3A5F');
    const accent = hex(tokens.secondary, '#2E86AB');
    const bg = hex(tokens.bg, '#FFFFFF');
    const ink = hex(tokens.text, '#24313A');
    const layout = design.layout || 'corporate';
    const arctic = layout === 'arctic';
    const winter = layout === 'winterland';
    const sections = deckSections(content);
    const imageSources = (content.images || []).map((src, sourceIndex) => ({ src, creditIndex: sourceIndex })).filter(x => x.src).slice(0, 8);
    if (!imageSources.length && arctic && typeof auroraScene === 'function') imageSources.push({ src: auroraScene(tokens), creditIndex: -1 });
    const getImage = async (index, box, circle) => {
      if (!imageSources.length) return null;
      const source = imageSources[Math.abs(index) % imageSources.length];
      try {
        const data = await makeImage(source.src, box.w / box.h, circle);
        if (data) return { data, index: source.creditIndex };
      } catch (_) {
        return null;
      }
      return null;
    };
    const rect = (slide, x, y, w, h, fill, transparency) => slide.addShape(p.rect, {
      x, y, w, h,
      line: { color: fill, transparency: 100 },
      fill: { color: fill, transparency: transparency || 0 },
    });
    const ellipse = (slide, x, y, w, h, fill, lineColor, lineWidth, transparency) => slide.addShape(p.ellipse, {
      x, y, w, h,
      line: { color: lineColor || fill, width: lineWidth || 0, transparency: lineWidth ? 0 : 100 },
      fill: { color: fill, transparency: transparency || 0 },
    });
    const text = (slide, value, options) => slide.addText(String(value || ''), Object.assign({
      x: 0, y: 0, w: 1, h: 0.28, fontFace: font, fontSize: 18, color: ink,
      margin: 0, breakLine: false, isTextBox: true, fit: 'shrink', valign: 'middle',
    }, options || {}));
    const photo = async (slide, index, box, circle) => {
      const image = await getImage(index, box, circle);
      if (image) slide.addImage({ data: image.data, x: box.x, y: box.y, w: box.w, h: box.h });
      return image;
    };
    const addFooter = (slide, pageNo, image) => {
      const credit = image && cleanCredit(content.imageCredits && content.imageCredits[image.index]);
      const dark = layout === 'dark';
      if (credit) text(slide, credit.slice(0, 110), { x: M, y: 7.13, w: 9.8, h: 0.18, fontSize: 7.5, color: dark ? 'C6D0DA' : (arctic ? '526773' : '73808A') });
      text(slide, String(pageNo).padStart(2, '0'), { x: 12.2, y: 7.03, w: 0.5, h: 0.22, fontSize: 9, color: dark ? accent : (arctic ? '68737D' : primary), align: 'right' });
      const notes = [];
      if (credit) notes.push('이미지 출처: ' + credit);
      const creditItem = image && content.imageCredits && content.imageCredits[image.index];
      if (creditItem && creditItem.source) notes.push('출처 URL: ' + creditItem.source);
      if (notes.length && typeof slide.addNotes === 'function') slide.addNotes(notes.join('\n'));
    };
    const pageTitle = (slide, heading, sub, dark) => {
      const color = dark ? 'FFFFFF' : (arctic ? '0B213F' : primary);
      if (arctic) text(slide, 'AURORA / FIELD NOTES', { x: M, y: 0.38, w: 4, h: 0.2, fontSize: 9, color: dark ? 'C7F7EB' : accent, bold: true, charSpacing: 1.6 });
      else if (winter) text(slide, 'WINTER  /  NOTES', { x: M, y: 0.38, w: 4, h: 0.2, fontFace: serif, fontSize: 10, color: accent, italic: true, charSpacing: 1.1 });
      text(slide, heading, { x: M, y: 0.74, w: 9.8, h: 0.62, fontFace: winter ? serif : font, fontSize: 31, bold: !winter, color, valign: 'middle' });
      if (sub) text(slide, sub, { x: M, y: 1.43, w: 9.8, h: 0.28, fontSize: 11, color: dark ? 'DAE9EE' : '73808A' });
    };
    const addTextBody = (slide, body, opts) => text(slide, body, Object.assign({
      fontSize: 18, color: ink, valign: 'top', breakLine: false, paraSpaceAfter: 10, lineSpacingMultiple: 1.08,
    }, opts || {}));
    async function coverSlide() {
      onStatus('표지와 주제 이미지를 배치하는 중…');
      const slide = addSlide();
      const full = { x: 0, y: 0, w: W, h: H };
      let image = await photo(slide, 0, full, false);
      if (!image) rect(slide, 0, 0, W, H, arctic ? '0B213F' : (winter ? bg : primary));
      if (arctic) {
        rect(slide, 0, 0, W, H, '071B2B', image ? 52 : 0);
        ellipse(slide, 4.12, 0.9, 5.1, 5.1, 'FFFFFF', 'FFFFFF', 2.4, 100);
        text(slide, 'POLAR  /  FIELD STUDY', { x: 0.65, y: 0.52, w: 3.4, h: 0.26, fontSize: 9, bold: true, color: 'BDF5E6', charSpacing: 1.3 });
        text(slide, content.title || '새로운 이야기', { x: 4.38, y: 2.43, w: 4.58, h: 1.22, fontSize: 36, bold: true, color: 'FFFFFF', align: 'center', valign: 'middle', breakLine: false });
        if (content.subtitle) text(slide, content.subtitle, { x: 4.34, y: 3.84, w: 4.66, h: 0.52, fontFace: 'Georgia', italic: true, fontSize: 22, color: 'BDF5E6', align: 'center' });
      } else if (winter) {
        rect(slide, 0, 0, 7.0, H, bg, image ? 7 : 0);
        text(slide, 'WINTER  /  LANDSCAPE', { x: 0.78, y: 0.62, w: 4.6, h: 0.3, fontFace: serif, fontSize: 10, color: accent, italic: true, charSpacing: 1.5 });
        text(slide, content.title || '새로운 이야기', { x: 0.78, y: 2.02, w: 5.75, h: 1.8, fontFace: serif, fontSize: 43, bold: true, color: primary, valign: 'middle' });
        if (content.subtitle) text(slide, content.subtitle, { x: 0.82, y: 4.02, w: 5.5, h: 0.56, fontFace: serif, italic: true, fontSize: 21, color: accent });
        const meta = [content.date, content.place].filter(Boolean).join('   ·   ');
        if (meta) text(slide, meta, { x: 0.82, y: 5.46, w: 5.6, h: 0.42, fontSize: 12, color: ink });
        rect(slide, 0.82, 6.16, 0.62, 0.04, accent);
      } else {
        if (layout === 'dark') {
          rect(slide, 0, 0, W, H, '0B0F1A', image ? 33 : 0);
          text(slide, 'KEYNOTE  /  ' + String(content.subtitle || 'PRESENTATION').toUpperCase(), { x: M, y: 0.72, w: 6.4, h: 0.26, fontSize: 9, bold: true, color: accent, charSpacing: 1.2 });
          text(slide, content.title || '새로운 이야기', { x: M, y: 2.08, w: 7.0, h: 2.05, fontSize: 49, bold: true, color: 'FFFFFF', valign: 'middle' });
        } else {
          rect(slide, 0, 0, W, H, bg);
          const right = image ? await photo(slide, 0, { x: 8.18, y: 0, w: 5.153, h: H }, false) : null;
          text(slide, String(content.subtitle || design.name || 'PRESENTATION').toUpperCase(), { x: M, y: 0.82, w: 6.5, h: 0.28, fontFace: winter ? serif : font, fontSize: 10, color: accent, bold: true, italic: winter, charSpacing: 1.1 });
          const align = layout === 'editorial' ? 'center' : 'left';
          text(slide, content.title || '새로운 이야기', { x: M, y: 2.12, w: 6.9, h: 2.12, fontFace: layout === 'editorial' ? serif : font, fontSize: layout === 'boldtypo' ? 49 : 42, bold: layout !== 'editorial', color: primary, align, valign: 'middle' });
          if (content.date || content.place) text(slide, [content.date, content.place].filter(Boolean).join('   ·   '), { x: M, y: 5.56, w: 6.7, h: 0.36, fontSize: 12, color: ink });
          if (right) image = right;
          rect(slide, M, 6.24, 0.74, 0.05, accent);
        }
      }
      if (content.host && !winter) text(slide, content.host, { x: M, y: 6.55, w: 5.2, h: 0.22, fontSize: 9, color: arctic ? 'DAE9EE' : ink });
      addFooter(slide, 1, image);
    }

    async function contentsSlides() {
      const pageSize = 8;
      const groups = [];
      for (let i = 0; i < sections.length; i += pageSize) groups.push(sections.slice(i, i + pageSize));
      if (!groups.length) groups.push([]);
      for (let groupIndex = 0; groupIndex < groups.length; groupIndex++) {
        const slide = addSlide();
        const dark = arctic || layout === 'dark';
        rect(slide, 0, 0, W, H, dark ? (arctic ? '0B213F' : '0B0F1A') : bg);
        let image = null;
        if (imageSources.length) {
          image = await photo(slide, groupIndex + 1, { x: 8.75, y: 0, w: W - 8.75, h: H }, false);
          if (image) rect(slide, 8.75, 0, W - 8.75, H, dark ? '06182C' : bg, 46);
        }
        text(slide, 'CONTENTS  /  ' + String(groupIndex + 1).padStart(2, '0'), { x: M, y: 0.74, w: 5.7, h: 0.24, fontSize: 9, bold: true, color: dark ? '85EBD0' : accent, charSpacing: 1.5 });
        text(slide, '목차', { x: M, y: 1.2, w: 5.6, h: 0.65, fontFace: winter || layout === 'editorial' ? serif : font, fontSize: 32, bold: !winter, color: dark ? 'FFFFFF' : primary });
        const group = groups[groupIndex];
        group.forEach((section, i) => {
          const y = 2.15 + i * 0.53;
          text(slide, String(groupIndex * pageSize + i + 1).padStart(2, '0'), { x: M, y, w: 0.52, h: 0.28, fontSize: 10, color: dark ? '87E7D0' : accent, bold: true });
          text(slide, section.heading || '핵심 내용', { x: 1.43, y: y - 0.03, w: 6.75, h: 0.32, fontSize: 15, color: dark ? 'FFFFFF' : ink });
        });
        addFooter(slide, slideCounter, image);
      }
    }

    async function leadSlide() {
      if (!sections.length) return;
      const slide = addSlide();
      rect(slide, 0, 0, W, H, arctic ? '0E7899' : (layout === 'dark' ? '101827' : bg));
      let image = await photo(slide, 2, { x: 5.25, y: 0, w: W - 5.25, h: H }, false);
      if (image) rect(slide, 4.9, 0, 1.55, H, arctic ? '12A1B5' : primary, 24);
      if (arctic || layout === 'dark') rect(slide, 0, 0, 5.55, H, arctic ? '1088A6' : '101827', 3);
      text(slide, content.subtitle || '핵심 이야기', { x: M, y: 1.32, w: 4.4, h: 0.38, fontFace: arctic || winter ? serif : font, fontSize: 18, italic: arctic || winter, color: arctic || layout === 'dark' ? 'D2FFF3' : accent });
      text(slide, sections[0].heading || content.title, { x: M, y: 1.88, w: 4.35, h: 1.32, fontSize: 30, fontFace: winter || layout === 'editorial' ? serif : font, bold: !winter, color: arctic || layout === 'dark' ? 'FFFFFF' : primary, valign: 'middle' });
      addTextBody(slide, sections[0].body.slice(0, 250), { x: M, y: 3.42, w: 4.25, h: 2.2, fontSize: 15, color: arctic || layout === 'dark' ? 'FFFFFF' : ink });
      addFooter(slide, slideCounter, image);
    }

    async function contentSlide(section, index) {
      const slide = addSlide();
      const mode = index % 4;
      const imageIndex = index + 3;
      const dark = layout === 'dark';
      const titleFont = winter || layout === 'editorial' ? serif : font;
      let image = null;

      if (arctic && mode === 0) {
        image = await photo(slide, imageIndex, { x: 0, y: 0, w: W, h: H }, false);
        rect(slide, 0, 0, W, H, image ? '0C3860' : '0B213F', image ? 43 : 0);
        text(slide, section.heading, { x: 1.65, y: 1.5, w: 10.03, h: 0.68, fontSize: 30, bold: true, color: 'FFFFFF', align: 'center' });
        rect(slide, 1.9, 2.55, 9.53, 2.45, '00A8E8', 43);
        addTextBody(slide, section.body, { x: 2.55, y: 2.91, w: 8.24, h: 1.72, fontSize: 17, color: 'FFFFFF', align: 'center', valign: 'middle' });
      } else if (arctic && mode === 1) {
        rect(slide, 0, 0, W, H, 'FFFFFF');
        image = await photo(slide, imageIndex, { x: 0, y: 0, w: 7.08, h: H }, false);
        rect(slide, 7.08, 0, W - 7.08, H, 'FFFFFF');
        pageTitle(slide, section.heading, 'AURORA / FIELD NOTES', false);
        addTextBody(slide, section.body, { x: 7.84, y: 2.05, w: 4.55, h: 4.25, fontSize: 16, color: '68737D' });
      } else if (arctic && mode === 2) {
        rect(slide, 0, 0, W, H, 'FFFFFF');
        image = await photo(slide, imageIndex, { x: 0, y: 3.84, w: W, h: 3.66 }, false);
        rect(slide, 0, 3.84, W, 3.66, image ? 'DCEAF0' : 'E6F4F9', image ? 37 : 0);
        ellipse(slide, 0.64, 2.08, 2.9, 2.9, accent);
        text(slide, String(index + 1).padStart(2, '0'), { x: 1.15, y: 3.06, w: 1.9, h: 0.56, fontSize: 31, bold: true, color: 'FFFFFF', align: 'center' });
        pageTitle(slide, section.heading, '', false);
        addTextBody(slide, section.body, { x: 4.12, y: 1.6, w: 8.15, h: 1.68, fontSize: 15 });
      } else if (arctic) {
        rect(slide, 0, 0, W, H, 'FFFFFF');
        image = await photo(slide, imageIndex, { x: 0.74, y: 0.86, w: 4.58, h: 4.58 }, true);
        const second = await photo(slide, imageIndex + 1, { x: 1.75, y: 3.61, w: 2.2, h: 2.2 }, true);
        if (second) slide.addShape(p.ellipse, { x: 1.75, y: 3.61, w: 2.2, h: 2.2, fill: { color: 'FFFFFF', transparency: 100 }, line: { color: 'FFFFFF', width: 5 } });
        text(slide, section.heading, { x: 6.1, y: 1.68, w: 6.2, h: 1.1, fontSize: 30, color: '00A8E8', bold: true, valign: 'middle' });
        addTextBody(slide, section.body, { x: 6.08, y: 3.08, w: 6.0, h: 2.62, fontSize: 16, color: '68737D' });
      } else if (winter && mode === 0) {
        rect(slide, 0, 0, W, H, bg);
        image = await photo(slide, imageIndex, { x: 8.02, y: 0, w: W - 8.02, h: H }, false);
        pageTitle(slide, section.heading, 'WINTER  /  STORY', false);
        addTextBody(slide, section.body, { x: M, y: 2.0, w: 6.72, h: 4.36, fontFace: font, fontSize: 16, color: ink });
        rect(slide, M, 6.57, 0.68, 0.04, accent);
      } else if (winter && mode === 1) {
        rect(slide, 0, 0, W, H, bg);
        image = await photo(slide, imageIndex, { x: 0, y: 0, w: W, h: 3.12 }, false);
        rect(slide, 0, 3.12, W, 4.38, bg);
        text(slide, 'WINTER  /  FIELD NOTES', { x: M, y: 3.52, w: 4.5, h: 0.22, fontFace: serif, fontSize: 10, italic: true, color: accent, charSpacing: 1.1 });
        text(slide, section.heading, { x: M, y: 3.91, w: 11.8, h: 0.62, fontFace: serif, fontSize: 30, color: primary, bold: true });
        addTextBody(slide, section.body, { x: M, y: 4.73, w: 11.55, h: 1.82, fontSize: 16 });
      } else if (winter && mode === 2) {
        rect(slide, 0, 0, W, H, bg);
        image = await photo(slide, imageIndex, { x: 0, y: 0, w: 5.15, h: H }, false);
        text(slide, String(index + 1).padStart(2, '0'), { x: 5.76, y: 0.62, w: 0.7, h: 0.45, fontSize: 13, color: accent, bold: true });
        text(slide, section.heading, { x: 5.76, y: 1.38, w: 6.75, h: 0.94, fontFace: serif, fontSize: 31, color: primary, bold: true });
        rect(slide, 5.76, 2.53, 0.72, 0.035, primary);
        addTextBody(slide, section.body, { x: 5.76, y: 2.91, w: 6.72, h: 3.45, fontSize: 16 });
      } else {
        const contentDark = dark;
        rect(slide, 0, 0, W, H, contentDark ? '0B0F1A' : bg);
        if (mode === 0) {
          image = await photo(slide, imageIndex, { x: 8.22, y: 0, w: W - 8.22, h: H }, false);
          pageTitle(slide, section.heading, design.name, contentDark);
          addTextBody(slide, section.body, { x: M, y: 1.94, w: 6.92, h: 4.35, fontSize: 16, color: contentDark ? 'E2E8F0' : ink });
          rect(slide, M, 6.58, 0.7, 0.045, accent);
        } else if (mode === 1) {
          image = await photo(slide, imageIndex, { x: 0, y: 0, w: W, h: 2.9 }, false);
          rect(slide, 0, 2.9, W, 4.6, contentDark ? '0B0F1A' : bg);
          text(slide, section.heading, { x: M, y: 3.36, w: 11.8, h: 0.68, fontSize: 29, fontFace: titleFont, color: contentDark ? 'FFFFFF' : primary, bold: !winter });
          addTextBody(slide, section.body, { x: M, y: 4.25, w: 11.76, h: 2.05, fontSize: 16, color: contentDark ? 'E2E8F0' : ink });
        } else {
          image = await photo(slide, imageIndex, { x: 0, y: 0, w: 5.05, h: H }, false);
          text(slide, design.name.toUpperCase(), { x: 5.68, y: 0.65, w: 5.9, h: 0.25, fontSize: 9, color: accent, bold: true, charSpacing: 1.25 });
          text(slide, section.heading, { x: 5.68, y: 1.24, w: 6.7, h: 1.02, fontSize: 30, fontFace: titleFont, color: contentDark ? 'FFFFFF' : primary, bold: !winter });
          rect(slide, 5.68, 2.47, 0.66, 0.04, accent);
          addTextBody(slide, section.body, { x: 5.68, y: 2.88, w: 6.75, h: 3.6, fontSize: 16, color: contentDark ? 'E2E8F0' : ink });
        }
      }
      addFooter(slide, slideCounter, image);
    }

    function metricsFromContent() {
      if (typeof auroraMetrics === 'function') return auroraMetrics(content);
      const found = [];
      String(content.desc || '').split(/\n+/).forEach(line => {
        const m = line.trim().match(/^(.{2,32}?)[：:]\s*([\d,]+(?:\.\d+)?)\s*(%|명|건|개|회|년|점|원)?\s*$/);
        if (m && found.length < 4) found.push({ label: m[1].trim(), value: Number(m[2].replace(/,/g, '')), display: m[2] + (m[3] || ''), unit: m[3] || '' });
      });
      return found;
    }

    function metricsSlide(metrics) {
      if (!metrics.length) return;
      const slide = addSlide();
      rect(slide, 0, 0, W, H, arctic ? 'FFFFFF' : bg);
      pageTitle(slide, '입력된 수치', '원고에 적힌 값만 시각화했습니다.', false);
      const maxValue = Math.max(1, ...metrics.map(x => x.value));
      metrics.forEach((metric, index) => {
        const y = 2.15 + index * 0.96;
        text(slide, metric.label, { x: M, y, w: 3.15, h: 0.32, fontSize: 14, color: ink });
        rect(slide, 3.8, y + 0.045, 6.95, 0.21, arctic ? 'D8EEF8' : 'E8EDF0');
        const metricWidth = metric.unit === '%' ? Math.max(0.03, Math.min(1, metric.value / 100)) : Math.max(0.03, Math.min(1, metric.value / maxValue));
        rect(slide, 3.8, y + 0.045, 6.95 * metricWidth, 0.21, accent);
        text(slide, metric.display, { x: 11.02, y: y - 0.07, w: 1.54, h: 0.4, fontSize: 17, color: primary, bold: true, align: 'right' });
      });
      text(slide, '원고에서 추출한 수치', { x: M, y: 6.45, w: 3.5, h: 0.22, fontSize: 9, color: '73808A' });
      addFooter(slide, slideCounter, null);
    }

    function summarySlide() {
      const slide = addSlide();
      rect(slide, 0, 0, W, H, arctic ? 'FFFFFF' : bg);
      text(slide, winter ? 'WINTER  /  TAKEAWAYS' : (arctic ? 'AURORA  /  KEY POINTS' : 'KEY POINTS'), { x: M, y: 0.72, w: 5.2, h: 0.24, fontSize: 9, bold: true, color: accent, charSpacing: 1.3 });
      text(slide, '핵심 내용', { x: M, y: 1.15, w: 7.2, h: 0.74, fontFace: winter ? serif : font, fontSize: 34, bold: !winter, color: primary });
      const takes = sections.slice(0, 4);
      const cols = takes.length > 2 ? 2 : Math.max(1, takes.length);
      const cardW = (12.0 - (cols - 1) * 0.3) / cols;
      takes.forEach((section, index) => {
        const col = index % cols, row = Math.floor(index / cols);
        const x = M + col * (cardW + 0.3), y = 2.2 + row * 1.66;
        rect(slide, x, y, cardW, 1.36, arctic ? 'E6F4F9' : (winter ? 'F0F0E8' : 'F0F3F6'));
        ellipse(slide, x + 0.2, y + 0.2, 0.42, 0.42, accent);
        text(slide, String(index + 1).padStart(2, '0'), { x: x + 0.2, y: y + 0.25, w: 0.42, h: 0.22, fontSize: 9, bold: true, align: 'center', color: 'FFFFFF' });
        text(slide, section.heading, { x: x + 0.78, y: y + 0.2, w: cardW - 1.03, h: 0.33, fontSize: 15, bold: true, color: primary });
        const excerpt = String(section.body || '').replace(/\s+/g, ' ').trim();
        addTextBody(slide, excerpt.slice(0, 150), { x: x + 0.78, y: y + 0.63, w: cardW - 1.06, h: 0.58, fontSize: 10, color: ink });
      });
      if (!takes.length) addTextBody(slide, '입력된 본문을 슬라이드에 배치했습니다.', { x: M, y: 2.2, w: 10, h: 1, fontSize: 18 });
      if (content.host) text(slide, content.host, { x: M, y: 6.38, w: 6.4, h: 0.28, fontSize: 10, color: ink });
      text(slide, '감사합니다', { x: M, y: 6.73, w: 4.0, h: 0.34, fontFace: 'Georgia', italic: true, fontSize: 19, color: accent });
      addFooter(slide, slideCounter, null);
      if (typeof slide.addNotes === 'function') {
        const links = (content.links || []).filter(Boolean);
        const credits = (content.imageCredits || []).filter(Boolean).map(item => {
          return [cleanCredit(item), item.source || ''].filter(Boolean).join(' — ');
        });
        const notes = [];
        if (credits.length) notes.push('이미지 출처\n' + credits.join('\n'));
        if (links.length) notes.push('참고 링크\n' + links.join('\n'));
        if (notes.length) slide.addNotes(notes.join('\n\n'));
      }
    }

    async function sourceListSlide() {
      const credits = (content.imageCredits || []).filter(Boolean);
      const links = (content.links || []).filter(Boolean);
      if (!credits.length && !links.length) return;
      const slide = addSlide();
      rect(slide, 0, 0, W, H, arctic ? 'FFFFFF' : bg);
      pageTitle(slide, '이미지와 참고 자료', '사용된 자료의 출처', false);
      const columns = credits.length > 4 ? 2 : 1;
      const rows = Math.max(1, Math.ceil(credits.length / columns));
      const colW = columns === 2 ? 5.95 : 11.8;
      const rowStep = credits.length > 6 ? 0.76 : 0.84;
      credits.forEach((item, index) => {
        const col = index % columns;
        const row = Math.floor(index / columns);
        const line = [cleanCredit(item), item.source || ''].filter(Boolean).join('\n');
        addTextBody(slide, line, { x: M + col * 6.05, y: 2.02 + row * rowStep, w: colW, h: rowStep - 0.08, fontSize: 9, color: ink });
      });
      let y = 2.05 + rows * rowStep + 0.12;
      links.forEach((url, index) => {
        if (y > 6.68) return;
        addTextBody(slide, String(index + 1).padStart(2, '0') + '  ' + url, { x: M, y, w: 11.8, h: 0.26, fontSize: 8.5, color: primary, hyperlink: { url } });
        y += 0.31;
      });
      addFooter(slide, slideCounter, null);
    }

    return {
      pptx,
      sections,
      async build() {
        await coverSlide();
        await contentsSlides();
        await leadSlide();
        for (let i = 0; i < sections.length; i++) {
          onStatus('본문 슬라이드 ' + (i + 1) + ' / ' + sections.length + '장을 구성하는 중…');
          await contentSlide(sections[i], i);
        }
        metricsSlide(metricsFromContent());
        summarySlide();
        await sourceListSlide();
        return pptx;
      },
    };
  }

  window.downloadEditablePptx = async function (design, content, onStatus) {
    const report = typeof onStatus === 'function' ? onStatus : function () {};
    imageMemo.clear();
    const deck = makeDeck(design, content, report);
    report('편집 가능한 PPTX 파일을 만드는 중…');
    const pptx = await deck.build();
    const filename = (String(content.title || '발표자료').replace(/[\\/:*?"<>|]/g, '_').trim() || '발표자료') + '.pptx';
    await pptx.writeFile({ fileName: filename });
    return filename;
  };
})();
