// mondo 0: Universo — campo profondo realistico (stile Hubble/JWST)
REAL[0] = (() => {
  const rng = s => () => { s |= 0; s = s + 0x6D2B79F5 | 0; let t = Math.imul(s ^ s >>> 15, 1 | s); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
  const r = rng(1107), f = n => (Math.round(n * 10) / 10).toString(), P = [620, 420];
  const far = (x, y, d) => Math.hypot(x - P[0], y - P[1]) > d;
  const big = [[300, 620, 34, 25, .62], [780, 700, 27, 110, .5], [230, 300, 24, 60, .8], [700, 230, 21, 150, .42], [455, 760, 23, 10, .7], [160, 470, 18, 95, .55]];
  const farBig = (x, y, d) => big.every(b => Math.hypot(x - b[0], y - b[1]) > b[2] + d);
  const g2 = (id, c0, c1, o1, c2) => `<radialGradient id="r0_${id}"><stop offset="0" stop-color="${c0}"/><stop offset=".28" stop-color="${c1}" stop-opacity="${o1}"/><stop offset="1" stop-color="${c2 || c1}" stop-opacity="0"/></radialGradient>`;
  const defs =
    g2('e', '#fff6e0', '#f0c890', .7, '#c98a50') + g2('b', '#f4f8ff', '#9fbcf5', .6, '#5f84d8') +
    g2('rd', '#ffe2c8', '#e0885c', .6, '#a84a34') + g2('w', '#ffffff', '#dfe6f5', .55, '#9aa6c8') +
    g2('st', '#ffffff', '#cfe0ff', .5, '#8fb0ff') + g2('sy', '#ffffff', '#ffe6b8', .5, '#ffc070') +
    `<radialGradient id="r0_n1"><stop offset="0" stop-color="#3a2a78" stop-opacity=".30"/><stop offset="1" stop-color="#3a2a78" stop-opacity="0"/></radialGradient>` +
    `<radialGradient id="r0_n2"><stop offset="0" stop-color="#15406a" stop-opacity=".26"/><stop offset="1" stop-color="#15406a" stop-opacity="0"/></radialGradient>` +
    `<radialGradient id="r0_n3"><stop offset="0" stop-color="#5a2350" stop-opacity=".20"/><stop offset="1" stop-color="#5a2350" stop-opacity="0"/></radialGradient>` +
    `<radialGradient id="r0_dk"><stop offset="0" stop-color="#1a0f10" stop-opacity=".85"/><stop offset="1" stop-color="#1a0f10" stop-opacity="0"/></radialGradient>` +
    `<radialGradient id="r0_p"><stop offset="0" stop-color="#06041a"/><stop offset=".68" stop-color="#06041a"/><stop offset="1" stop-color="#06041a" stop-opacity="0"/></radialGradient>`;
  let s = `<rect width="1000" height="1000" fill="#070316"/>`;
  // velature della ragnatela cosmica (molto tenui, solo entro ~330 dal centro)
  for (let i = 0; i < 11; i++) {
    const a = r() * 6.283, d = 40 + r() * 230, x = 500 + Math.cos(a) * d, y = 500 + Math.sin(a) * d;
    const rx = 70 + r() * 80, ry = rx * (.35 + r() * .4);
    s += `<ellipse cx="${f(x)}" cy="${f(y)}" rx="${f(rx)}" ry="${f(ry)}" fill="url(#r0_n${1 + i % 3})" transform="rotate(${f(r() * 180)} ${f(x)} ${f(y)})"/>`;
  }
  // galassie lontanissime: puntini e fusi sfocati
  const tiny = ['#f3d6a8', '#e9b98a', '#b9cdf7', '#dfe6ff', '#e8a07c', '#fff1d6', '#9fb6ee'];
  for (let i = 0; i < 300; i++) {
    const x = r() * 1000, y = r() * 1000, rx = .6 + r() * r() * 3.2, ry = rx * (.3 + r() * .7);
    if (!far(x, y, 66)) continue;
    s += `<ellipse cx="${f(x)}" cy="${f(y)}" rx="${f(rx)}" ry="${f(ry)}" fill="${tiny[i % 7]}" opacity="${f(.25 + r() * .5)}" transform="rotate(${f(r() * 180)} ${f(x)} ${f(y)})"/>`;
  }
  // filamenti: catene di galassie deboli
  [[120, 820, 420, 560, 520, 300], [880, 880, 640, 640, 420, 560], [90, 180, 300, 380, 420, 560], [900, 120, 800, 330, 760, 560]].forEach(c => {
    for (let i = 0; i < 20; i++) {
      const t = r(), u = 1 - t, x = u * u * c[0] + 2 * u * t * c[2] + t * t * c[4] + (r() - .5) * 46, y = u * u * c[1] + 2 * u * t * c[3] + t * t * c[5] + (r() - .5) * 46;
      if (!far(x, y, 80) || !farBig(x, y, 8)) continue;
      const rx = 2 + r() * 4;
      s += `<ellipse cx="${f(x)}" cy="${f(y)}" rx="${f(rx)}" ry="${f(rx * (.35 + r() * .6))}" fill="url(#r0_${['e', 'b', 'rd', 'w'][i % 4]})" transform="rotate(${f(r() * 180)} ${f(x)} ${f(y)})"/>`;
    }
  });
  // galassie medie: ellittiche, spirali di taglio, spirali di faccia
  let n = 0;
  for (let k = 0; k < 400 && n < 46; k++) {
    const x = 60 + r() * 880, y = 60 + r() * 880, sz = 6 + r() * r() * 13, rot = r() * 180, ty = r();
    if (!far(x, y, 78 + sz) || !farBig(x, y, sz + 6)) continue;
    n++;
    let g = '';
    if (ty < .34) { // ellittica
      const q = .6 + r() * .35;
      g = `<ellipse cx="${f(x)}" cy="${f(y)}" rx="${f(sz * 1.5)}" ry="${f(sz * 1.5 * q)}" fill="url(#r0_e)" opacity=".55"/><ellipse cx="${f(x)}" cy="${f(y)}" rx="${f(sz * .6)}" ry="${f(sz * .6 * q)}" fill="url(#r0_e)"/>`;
    } else if (ty < .62) { // di taglio, con banda di polvere
      g = `<ellipse cx="${f(x)}" cy="${f(y)}" rx="${f(sz * 1.7)}" ry="${f(sz * .3)}" fill="url(#r0_w)"/><ellipse cx="${f(x)}" cy="${f(y)}" rx="${f(sz * .5)}" ry="${f(sz * .34)}" fill="url(#r0_e)"/><ellipse cx="${f(x)}" cy="${f(y + sz * .05)}" rx="${f(sz * 1.25)}" ry="${f(sz * .07)}" fill="url(#r0_dk)"/>`;
    } else { // spirale inclinata
      const q = .45 + r() * .5, col = r() < .7 ? 'b' : 'rd';
      g = `<ellipse cx="${f(x)}" cy="${f(y)}" rx="${f(sz * 1.5)}" ry="${f(sz * 1.5 * q)}" fill="url(#r0_${col})" opacity=".7"/>`;
      for (let arm = 0; arm < 2; arm++) {
        let d = '';
        for (let i = 0; i <= 10; i++) { const t = i / 10, th = arm * Math.PI + t * 4.4, rr = sz * (.18 + t * 1.05); d += (i ? 'L' : 'M') + f(x + Math.cos(th) * rr) + ' ' + f(y + Math.sin(th) * rr * q); }
        g += `<path d="${d}" fill="none" stroke="${col === 'b' ? '#cfdcff' : '#ffd9c0'}" stroke-width="${f(sz * .16)}" stroke-linecap="round" stroke-linejoin="round" opacity=".5"/>`;
      }
      g += `<ellipse cx="${f(x)}" cy="${f(y)}" rx="${f(sz * .38)}" ry="${f(sz * .38 * q)}" fill="url(#r0_e)"/>`;
    }
    s += `<g transform="rotate(${f(rot)} ${f(x)} ${f(y)})" opacity="${f(.6 + r() * .4)}">${g}</g>`;
  }
  // ammasso di galassie con archi di lente gravitazionale
  const C = [415, 455];
  s += `<circle cx="${C[0]}" cy="${C[1]}" r="62" fill="url(#r0_e)" opacity=".13"/>`;
  for (let i = 0; i < 16; i++) {
    const a = r() * 6.283, d = r() * r() * 52, x = C[0] + Math.cos(a) * d, y = C[1] + Math.sin(a) * d, rx = 2.5 + r() * (i < 3 ? 7 : 3.5);
    s += `<ellipse cx="${f(x)}" cy="${f(y)}" rx="${f(rx)}" ry="${f(rx * (.6 + r() * .4))}" fill="url(#r0_e)" transform="rotate(${f(r() * 180)} ${f(x)} ${f(y)})"/>`;
  }
  [[38, 20, 70, '#9fc0ff'], [47, 150, 205, '#b8d0ff'], [30, 250, 285, '#ffc9a8'], [56, 300, 335, '#8fb4ff']].forEach(([R, a0, a1, c]) => {
    const p = a => f(C[0] + Math.cos(a * Math.PI / 180) * R) + ' ' + f(C[1] + Math.sin(a * Math.PI / 180) * R);
    s += `<path d="M${p(a0)}A${R} ${R} 0 0 1 ${p(a1)}" fill="none" stroke="${c}" stroke-width="1.1" stroke-linecap="round" opacity=".38"/>`;
  });
  // grandi spirali vicine
  big.forEach(([x, y, sz, rot, q], k) => {
    const blue = k % 3 !== 1;
    let g = `<ellipse cx="${x}" cy="${y}" rx="${f(sz * 1.45)}" ry="${f(sz * 1.45 * q)}" fill="url(#r0_${blue ? 'b' : 'w'})" opacity=".8"/>`;
    for (let arm = 0; arm < 2; arm++) {
      const pts = [];
      for (let i = 0; i <= 22; i++) { const t = i / 22, th = arm * Math.PI + t * 6.6, rr = sz * (.16 + t * 1.02); pts.push([x + Math.cos(th) * rr, y + Math.sin(th) * rr * q, t]); }
      const path = (a, b) => pts.slice(a, b).map((p, i) => (i ? 'L' : 'M') + f(p[0]) + ' ' + f(p[1])).join('');
      g += `<path d="${path(0, 23)}" fill="none" stroke="${blue ? '#aac4ff' : '#e9dcc8'}" stroke-width="${f(sz * .2)}" stroke-linecap="round" stroke-linejoin="round" opacity=".22"/>`;
      g += `<path d="${path(0, 16)}" fill="none" stroke="#eef3ff" stroke-width="${f(sz * .09)}" stroke-linecap="round" stroke-linejoin="round" opacity=".5"/>`;
      // polvere sul bordo interno del braccio
      g += `<path d="${pts.slice(1, 13).map((p, i) => (i ? 'L' : 'M') + f(x + (p[0] - x) * .84) + ' ' + f(y + (p[1] - y) * .84)).join('')}" fill="none" stroke="#1a0c14" stroke-width="${f(sz * .05)}" stroke-linecap="round" opacity=".45"/>`;
      for (let i = 3; i < 22; i += 2) { const p = pts[i], pink = r() < .4; g += `<circle cx="${f(p[0] + (r() - .5) * sz * .12)}" cy="${f(p[1] + (r() - .5) * sz * .12)}" r="${f(.5 + r() * sz * .035)}" fill="${pink ? '#ff8fae' : '#ffffff'}" opacity="${f(.5 + r() * .4)}"/>`; }
    }
    g += `<ellipse cx="${x}" cy="${y}" rx="${f(sz * .36)}" ry="${f(sz * .36 * Math.max(q, .6))}" fill="url(#r0_e)"/><circle cx="${x}" cy="${y}" r="${f(sz * .07)}" fill="#fffaf0"/>`;
    s += `<g transform="rotate(${rot} ${x} ${y})">${g}</g>`;
  });
  // stelle in primo piano con raggi di diffrazione
  [[150, 760, 9, 'st'], [850, 400, 7, 'sy'], [560, 180, 6, 'st'], [690, 830, 5, 'st'], [380, 110, 4.5, 'sy'], [905, 610, 4, 'st'], [110, 120, 4, 'st'], [545, 610, 3.5, 'sy']].forEach(([x, y, z, c], i) => {
    const sp = L => `<path d="M${x - L} ${y}L${x} ${f(y - z * .1)}L${x + L} ${y}L${x} ${f(y + z * .1)}ZM${x} ${y - L}L${f(x + z * .1)} ${y}L${x} ${y + L}L${f(x - z * .1)} ${y}Z" fill="#fff" opacity=".6"/>`;
    s += `<g><circle cx="${x}" cy="${y}" r="${z * 2.6}" fill="url(#r0_${c})" opacity=".8"/>${sp(z * 4.2)}<circle cx="${x}" cy="${y}" r="${f(z * .34)}" fill="#fff"/>${i < 5 ? `<animate attributeName="opacity" values="1;.72;1" dur="${5 + i * 1.7}s" repeatCount="indefinite"/>` : ''}</g>`;
  });
  for (let i = 0; i < 40; i++) {
    const x = r() * 1000, y = r() * 1000; if (!far(x, y, 62)) continue;
    s += `<circle cx="${f(x)}" cy="${f(y)}" r="${f(.5 + r() * .8)}" fill="#fff" opacity="${f(.5 + r() * .5)}"/>`;
  }
  // zona del portale: colore del mondo figlio
  s += `<circle cx="${P[0]}" cy="${P[1]}" r="94" fill="url(#r0_p)"/>`;
  return { defs, svg: s };
})();
