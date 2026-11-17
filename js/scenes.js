/* Zoom nell'Universo — scene SVG.
 * Ogni scena vive in un quadrato 1000×1000. Il "portale" è il punto in cui
 * si trova la scena successiva, disegnata 10 volte più piccola (box 100×100).
 * L'ultima scena (Quark) contiene di nuovo l'Universo: lo zoom è infinito.
 * Alcuni mondi hanno più portali (bivi): Terra → Città o Oceano, Città → Giardino o Corpo umano.
 * I nuovi mondi stanno in fondo all'elenco, così i link dei segreti già condivisi restano validi. */
const REAL = {};   // disegni realistici, riempiti dai file js/real/N.js
const SCENES = (() => {
  'use strict';

  // ---------- helper ----------
  function rng(seed) {
    return function () {
      seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
      let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  const f = n => Math.round(n * 10) / 10;
  const far = (x, y, p, d) => Math.hypot(x - p[0], y - p[1]) > d;
  const pick = (r, arr) => arr[Math.floor(r() * arr.length)];
  const TAU = Math.PI * 2;

  function blob(r, cx, cy, rad, v = 0.35, n = 10) {
    const pts = [], off = r() * TAU;
    for (let i = 0; i < n; i++) {
      const a = off + (i / n) * TAU, rr = rad * (1 - v / 2 + r() * v);
      pts.push([cx + Math.cos(a) * rr, cy + Math.sin(a) * rr]);
    }
    const mid = (a, b) => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
    const m = mid(pts[n - 1], pts[0]);
    let d = `M${f(m[0])} ${f(m[1])}`;
    for (let i = 0; i < n; i++) {
      const p = pts[i], q = mid(p, pts[(i + 1) % n]);
      d += `Q${f(p[0])} ${f(p[1])} ${f(q[0])} ${f(q[1])}`;
    }
    return d + 'Z';
  }
  const glow = (id, color, op = 1) =>
    `<radialGradient id="${id}"><stop offset="0" stop-color="${color}" stop-opacity="${op}"/><stop offset="1" stop-color="${color}" stop-opacity="0"/></radialGradient>`;
  const sphere = (id, light, base, dark) =>
    `<radialGradient id="${id}" cx=".4" cy=".35" r=".7"><stop offset="0" stop-color="${light}"/><stop offset=".55" stop-color="${base}"/><stop offset="1" stop-color="${dark}"/></radialGradient>`;
  // stelle: alcune brillano (animazione SMIL, leggera)
  function stars(r, n, P, colors = ['#fff'], maxR = 1.8, avoid = 40, twinkle = 36) {
    let s = '';
    for (let i = 0; i < n; i++) {
      const x = r() * 1000, y = r() * 1000;
      if (!far(x, y, P, avoid)) continue;
      const op = f(0.3 + r() * 0.7);
      const tw = i < twinkle ? `<animate attributeName="opacity" values="${op};${f(op * 0.25)};${op}" dur="${f(1.5 + r() * 3)}s" begin="${f(-r() * 4)}s" repeatCount="indefinite"/>` : '';
      s += `<circle cx="${f(x)}" cy="${f(y)}" r="${f(0.4 + r() * maxR)}" fill="${pick(r, colors)}" opacity="${op}">${tw}</circle>`;
    }
    return s;
  }
  // rotazione continua attorno a un punto
  const spin = (cx, cy, dur, from = 0) =>
    `<animateTransform attributeName="transform" type="rotate" from="${from} ${cx} ${cy}" to="${from + 360} ${cx} ${cy}" dur="${dur}s" repeatCount="indefinite"/>`;
  // oscillazione avanti-indietro
  const sway = (cx, cy, deg, dur) =>
    `<animateTransform attributeName="transform" type="rotate" values="${-deg} ${cx} ${cy};${deg} ${cx} ${cy};${-deg} ${cx} ${cy}" dur="${dur}s" repeatCount="indefinite" calcMode="spline" keySplines=".45 0 .55 1;.45 0 .55 1"/>`;
  const pulse = (attr, a, b, dur) =>
    `<animate attributeName="${attr}" values="${a};${b};${a}" dur="${dur}s" repeatCount="indefinite" calcMode="spline" keySplines=".45 0 .55 1;.45 0 .55 1"/>`;
  const bg = c => `<rect width="1000" height="1000" fill="${c}"/>`;

  const scenes = [];

  // ---------- 0. UNIVERSO ----------
  {
    const r = rng(11), P = [620, 420];
    let s = bg('#070316');
    const neb = ['neb-a', 'neb-b', 'neb-c'];
    for (let i = 0; i < 9; i++) {
      const x = 120 + r() * 760, y = 120 + r() * 760;
      if (!far(x, y, P, 160)) continue;
      const rx = 110 + r() * 140, ry = rx * (0.4 + r() * 0.4);
      s += `<ellipse cx="${f(x)}" cy="${f(y)}" rx="${f(rx)}" ry="${f(ry)}" fill="url(#${neb[i % 3]})" transform="rotate(${f(r() * 180)} ${f(x)} ${f(y)})"/>`;
    }
    s += stars(r, 340, P, ['#fff', '#cfe3ff', '#ffe9c4']);
    for (let i = 0; i < 60; i++) {
      const x = r() * 1000, y = r() * 1000;
      if (!far(x, y, P, 70)) continue;
      const rx = 3 + r() * 11, ry = rx * (0.3 + r() * 0.5);
      s += `<g transform="rotate(${f(r() * 180)} ${f(x)} ${f(y)})"><ellipse cx="${f(x)}" cy="${f(y)}" rx="${f(rx)}" ry="${f(ry)}" fill="url(#gal-${'abc'[i % 3]})"/><circle cx="${f(x)}" cy="${f(y)}" r="${f(rx * 0.2)}" fill="#fff"/></g>`;
    }
    // qualche piccola galassia a spirale
    [[300, 620, 26], [780, 700, 20], [230, 300, 18], [700, 230, 15]].forEach(([x, y, sz], k) => {
      let g = `<circle cx="${x}" cy="${y}" r="${sz * 0.9}" fill="url(#gal-${'abc'[k % 3]})"/>`;
      for (let arm = 0; arm < 2; arm++) for (let i = 0; i < 26; i++) {
        const t = i / 26, th = arm * Math.PI + t * 3.2 * Math.PI, rr = sz * (0.15 + t * 0.95);
        g += `<circle cx="${f(x + Math.cos(th) * rr)}" cy="${f(y + Math.sin(th) * rr * 0.6)}" r="${f(0.4 + (1 - t) * 1.2)}" fill="#e8f0ff" opacity="${f(0.9 - t * 0.5)}"/>`;
      }
      s += `<g transform="rotate(${k * 47} ${x} ${y})">${g}<circle cx="${x}" cy="${y}" r="${sz * 0.18}" fill="#fff8dc"/>${spin(x, y, 60 + k * 25, k * 47)}</g>`;
    });
    scenes.push({
      name: 'Universo', emoji: '🌌', scale: '~10²⁶ m', portal: P, bg: '#070316',
      fact: "L'universo osservabile contiene circa 2.000 miliardi di galassie. Ognuna ha miliardi di stelle!",
      defs: glow('neb-a', '#8a4dff', 0.35) + glow('neb-b', '#ff4da6', 0.28) + glow('neb-c', '#3fb6ff', 0.25) +
        `<radialGradient id="gal-a"><stop offset="0" stop-color="#fff"/><stop offset=".4" stop-color="#ffd98a" stop-opacity=".8"/><stop offset="1" stop-color="#ffd98a" stop-opacity="0"/></radialGradient>` +
        `<radialGradient id="gal-b"><stop offset="0" stop-color="#fff"/><stop offset=".4" stop-color="#9fd0ff" stop-opacity=".8"/><stop offset="1" stop-color="#9fd0ff" stop-opacity="0"/></radialGradient>` +
        `<radialGradient id="gal-c"><stop offset="0" stop-color="#fff"/><stop offset=".4" stop-color="#ffb0d9" stop-opacity=".8"/><stop offset="1" stop-color="#ffb0d9" stop-opacity="0"/></radialGradient>`,
      svg: s,
      items: [
        ['🛸', 230, 690, 10, 'Disco volante'],
        ['🐋', 760, 270, 9, 'Balena spaziale'],
        ['🧑‍🚀', 340, 300, 6, 'Astronauta perso'],
      ],
    });
  }

  // ---------- 1. GALASSIA ----------
  {
    const r = rng(22), P = [680, 600];
    let s = bg('#06041a') + `<circle cx="500" cy="500" r="480" fill="url(#halo)"/>`;
    s += stars(r, 120, P, ['#fff', '#9fc4ff'], 1);
    const cols = ['#ffffff', '#cfe3ff', '#9fc4ff', '#ffd6f0', '#fff1b8'];
    s += '<g>';
    for (let arm = 0; arm < 4; arm++) {
      const main = arm % 2 === 0, n = main ? 330 : 130;
      for (let i = 0; i < n; i++) {
        const t = r(), th = arm * (Math.PI / 2) + t * 3.4 * Math.PI, rad = 45 + t * 420;
        const j = (20 + 55 * t) * (main ? 1 : 1.3);
        const x = 500 + Math.cos(th) * rad + (r() - 0.5) * j, y = 500 + Math.sin(th) * rad + (r() - 0.5) * j;
        if (!far(x, y, P, 40)) continue;
        if (r() < 0.06) s += `<circle cx="${f(x)}" cy="${f(y)}" r="${f(4 + r() * 6)}" fill="#ff6fb5" opacity=".18"/>`;
        s += `<circle cx="${f(x)}" cy="${f(y)}" r="${f(0.7 + r() * (main ? 2.2 : 1.4))}" fill="${pick(r, cols)}" opacity="${f(0.45 + r() * 0.55)}"/>`;
      }
    }
    s += `${spin(500, 500, 420)}</g><circle cx="500" cy="500" r="140" fill="url(#bulge)"/>`;
    // il buco nero/portale: anello di luce che gira
    s += `<g><ellipse cx="${P[0]}" cy="${P[1]}" rx="64" ry="20" fill="none" stroke="#ffd27a" stroke-opacity=".55" stroke-width="4"/>${spin(P[0], P[1], 14)}</g>`;
    scenes.push({
      name: 'Galassia', emoji: '🌀', scale: '~10²¹ m', portal: P, bg: '#06041a',
      fact: 'La Via Lattea ha tra 100 e 400 miliardi di stelle. La luce impiega 100.000 anni per attraversarla!',
      defs: glow('halo', '#2a2470', 0.55) +
        `<radialGradient id="bulge"><stop offset="0" stop-color="#fffbe6"/><stop offset=".3" stop-color="#ffd27a" stop-opacity=".85"/><stop offset="1" stop-color="#ff9f43" stop-opacity="0"/></radialGradient>`,
      svg: s,
      items: [
        ['🚀', 300, 360, 8, 'Razzo'],
        ['☄️', 740, 780, 10, 'Cometa'],
        ['🐙', 190, 560, 7, 'Polpo alieno'],
      ],
    });
  }

  // ---------- 2. SISTEMA SOLARE ----------
  {
    const r = rng(33), P = [680.2, 373.8];
    let s = bg('#03030c') + stars(r, 160, P, ['#fff', '#cfe3ff'], 1.1);
    [110, 160, 220, 290, 360, 440].forEach(rad =>
      s += `<circle cx="500" cy="500" r="${rad}" fill="none" stroke="#fff" stroke-opacity=".13" stroke-width="1.5"/>`);
    const at = (rad, deg) => [500 + Math.cos(deg * Math.PI / 180) * rad, 500 + Math.sin(deg * Math.PI / 180) * rad];
    for (let i = 0; i < 260; i++) {
      const a = r() * TAU, rad = 316 + r() * 22;
      s += `<circle cx="${f(500 + Math.cos(a) * rad)}" cy="${f(500 + Math.sin(a) * rad)}" r="${f(0.6 + r())}" fill="#a39b8f" opacity=".7"/>`;
    }
    s += `<circle cx="500" cy="500" r="160" fill="url(#sunGlow)"/><circle cx="500" cy="500" r="62" fill="url(#sun)"/>`;
    const [mex, mey] = at(110, 200), [vx, vy] = at(160, 120), [max, may] = at(290, 70);
    const [jx, jy] = at(360, 160), [sx, sy] = at(440, 235);
    s += `<g><circle cx="${f(mex)}" cy="${f(mey)}" r="7" fill="url(#merc)"/>${spin(500, 500, 40)}</g>`;
    s += `<g><circle cx="${f(vx)}" cy="${f(vy)}" r="11" fill="url(#ven)"/>${spin(500, 500, 70)}</g>`;
    s += `<g><circle cx="${f(max)}" cy="${f(may)}" r="10" fill="url(#mars)"/>${spin(500, 500, 130)}</g>`;
    s += `<g>${spin(500, 500, 320)}<g clip-path="url(#jupClip)"><circle cx="${f(jx)}" cy="${f(jy)}" r="30" fill="#d9a066"/>` +
      [-18, -8, 4, 14].map((dy, k) => `<rect x="${f(jx - 32)}" y="${f(jy + dy)}" width="64" height="${k % 2 ? 5 : 4}" fill="${k % 2 ? '#b07443' : '#f2d1a4'}"/>`).join('') +
      `<ellipse cx="${f(jx + 9)}" cy="${f(jy + 9)}" rx="6" ry="3.5" fill="#c0503a"/><circle cx="${f(jx)}" cy="${f(jy)}" r="30" fill="url(#shade2)"/></g></g>`;
    s += `<g>${spin(500, 500, 520)}<g transform="rotate(-20 ${f(sx)} ${f(sy)})"><ellipse cx="${f(sx)}" cy="${f(sy)}" rx="36" ry="10" fill="none" stroke="#c9b27a" stroke-width="5" opacity=".9"/>` +
      `<circle cx="${f(sx)}" cy="${f(sy)}" r="17" fill="url(#sat)"/><path d="M${f(sx - 36)} ${f(sy)}A36 10 0 0 0 ${f(sx + 36)} ${f(sy)}" fill="none" stroke="#e3cf9b" stroke-width="5"/></g></g>`;
    // il Sole respira
    s = s.replace('r="160" fill="url(#sunGlow)"/>', `r="160" fill="url(#sunGlow)">${pulse('r', 150, 175, 4)}</circle>`);
    scenes.push({
      name: 'Sistema solare', emoji: '☀️', scale: '~10¹³ m', portal: P, bg: '#03030c',
      fact: 'Il Sole contiene il 99,8% di tutta la massa del Sistema solare. Ci starebbero dentro 1 milione di Terre!',
      defs: `<radialGradient id="sun" cx=".45" cy=".4" r=".6"><stop offset="0" stop-color="#fffbe0"/><stop offset=".5" stop-color="#ffd23f"/><stop offset="1" stop-color="#ff8c1a"/></radialGradient>` +
        glow('sunGlow', '#ffb340', 0.6) + sphere('merc', '#e0e0e0', '#a8a8a8', '#555') + sphere('ven', '#fff1c4', '#e8c27a', '#9a6b2b') +
        sphere('mars', '#ffab8a', '#d1603d', '#6e2412') + sphere('sat', '#fff4d6', '#e3c98f', '#8f7440') +
        `<radialGradient id="shade2" cx=".35" cy=".3" r=".75"><stop offset=".5" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".55"/></radialGradient>` +
        (() => { const [jx, jy] = [500 + Math.cos(160 * Math.PI / 180) * 360, 500 + Math.sin(160 * Math.PI / 180) * 360]; return `<clipPath id="jupClip"><circle cx="${f(jx)}" cy="${f(jy)}" r="30"/></clipPath>`; })(),
      svg: s,
      items: [
        ['🛰️', 420, 720, 8, 'Satellite'],
        ['👽', 236, 806, 6, 'Alieno tra gli asteroidi'],
        ['🍕', 790, 220, 7, 'Pizza spaziale'],
      ],
    });
  }

  // ---------- 3. TERRA ----------
  {
    const r = rng(44), P = [565, 440];
    let s = bg('#02020a') + stars(r, 180, P, ['#fff', '#cfe3ff'], 1.2, 0);
    s += `<circle cx="500" cy="500" r="290" fill="url(#atmo)"/>`;
    let g = `<circle cx="500" cy="500" r="230" fill="url(#ocean)"/>`;
    g += `<path d="${blob(r, 575, 430, 120, 0.3, 11)}" fill="#6dbb5c"/>`;
    g += `<path d="${blob(r, 610, 520, 70, 0.4)}" fill="#6dbb5c"/><path d="${blob(r, 520, 380, 70, 0.4)}" fill="#6dbb5c"/>`;
    g += `<path d="${blob(r, 375, 575, 75, 0.45)}" fill="#7cc06a"/><path d="${blob(r, 400, 330, 55, 0.45)}" fill="#7cc06a"/>`;
    g += `<path d="${blob(r, 655, 640, 42, 0.4)}" fill="#d9c27a"/><path d="${blob(r, 330, 650, 30, 0.5)}" fill="#d9c27a"/>`;
    g += `<ellipse cx="500" cy="276" rx="120" ry="28" fill="#f4fbff"/><ellipse cx="500" cy="726" rx="140" ry="32" fill="#f4fbff"/>`;
    for (let i = 0; i < 14; i++) {
      const a = r() * TAU, d = Math.sqrt(r()) * 220, x = 500 + Math.cos(a) * d, y = 500 + Math.sin(a) * d;
      if (!far(x, y, P, 100)) continue;
      g += `<path d="${blob(r, x, y, 18 + r() * 26, 0.6, 8)}" fill="#fff" opacity=".75"><animateTransform attributeName="transform" type="translate" values="0 0;${f(4 + r() * 6)} ${f(r() * 3)};0 0" dur="${f(8 + r() * 8)}s" repeatCount="indefinite"/></path>`;
    }
    g += `<circle cx="500" cy="500" r="230" fill="url(#night)"/>`;
    s += `<g clip-path="url(#globeClip)">${g}</g><circle cx="500" cy="500" r="234" fill="none" stroke="#8fd8ff" stroke-opacity=".5" stroke-width="8"/>`;
    s += `<g><circle cx="830" cy="230" r="40" fill="url(#moon)"/>` +
      [[818, 220, 8], [842, 240, 6], [826, 250, 4], [845, 214, 4]].map(([x, y, rr]) => `<circle cx="${x}" cy="${y}" r="${rr}" fill="#9a9a9a" opacity=".6"/>`).join('') +
      `<animateTransform attributeName="transform" type="translate" values="0 0;0 -10;0 0" dur="9s" repeatCount="indefinite" calcMode="spline" keySplines=".45 0 .55 1;.45 0 .55 1"/></g>`;
    scenes.push({
      name: 'Terra', emoji: '🌍', scale: '~10⁷ m', portal: P, bg: '#02020a',
      fact: "La Terra gira su sé stessa a circa 1.670 km/h all'equatore… e noi non ce ne accorgiamo!",
      defs: `<clipPath id="globeClip"><circle cx="500" cy="500" r="230"/></clipPath>` +
        `<radialGradient id="ocean" cx=".6" cy=".4" r=".7"><stop offset="0" stop-color="#45a8ee"/><stop offset="1" stop-color="#174f9c"/></radialGradient>` +
        `<linearGradient id="night" x1=".15" y1=".95" x2=".7" y2=".3"><stop offset="0" stop-color="#000" stop-opacity=".6"/><stop offset=".5" stop-color="#000" stop-opacity="0"/></linearGradient>` +
        glow('atmo', '#4fb3ff', 0.35) + sphere('moon', '#f2f2f2', '#c4c4c4', '#6d6d6d'),
      svg: s,
      items: [
        ['🐳', 300, 470, 14, 'Balena nell\'oceano'],
        ['🐧', 500, 726, 10, 'Pinguino al Polo Sud'],
        ['🏝️', 700, 560, 11, 'Isola tropicale'],
      ],
    });
  }

  // ---------- 4. CITTÀ ----------
  {
    const r = rng(55), P = [250, 520];
    let s = bg('#6dbb5c');
    // texture prato
    for (let i = 0; i < 160; i++) s += `<circle cx="${f(r() * 1000)}" cy="${f(r() * 1000)}" r="${f(3 + r() * 8)}" fill="#64b053" opacity=".6"/>`;
    // strade
    const roads = [['M0 300H1000'], ['M0 770H1000'], ['M480 0V1000']];
    roads.forEach(([d]) => s += `<path d="${d}" stroke="#c9c4b8" stroke-width="58"/>`);
    roads.forEach(([d]) => s += `<path d="${d}" stroke="#555b63" stroke-width="44"/><path d="${d}" stroke="#f1f1f1" stroke-width="3" stroke-dasharray="16 14"/>`);
    // parco
    s += `<rect x="512" y="332" width="470" height="406" rx="26" fill="#5aa64c"/>`;
    s += `<path d="M520 540C620 520 660 450 760 450S900 520 980 500" stroke="#e6d7b0" stroke-width="10" fill="none"/>`;
    s += `<ellipse cx="760" cy="580" rx="95" ry="60" fill="#4aa3df" stroke="#3a8fc7" stroke-width="5"/>`;
    for (let i = 0; i < 26; i++) {
      const x = 530 + r() * 440, y = 345 + r() * 380;
      if (!far(x, y, [760, 580], 115) || !far(x, y, [600, 395], 85) || (y > 430 && y < 470)) continue;
      const rr = 14 + r() * 14;
      s += `<circle cx="${f(x + 3)}" cy="${f(y + 4)}" r="${f(rr)}" fill="#000" opacity=".15"/><circle cx="${f(x)}" cy="${f(y)}" r="${f(rr)}" fill="#2f7d32"/><circle cx="${f(x - rr * 0.3)}" cy="${f(y - rr * 0.3)}" r="${f(rr * 0.45)}" fill="#4caf50"/>`;
    }
    // giardino-portale
    s += `<rect x="186" y="456" width="128" height="128" rx="6" fill="#5fae4f" stroke="#8d6e4f" stroke-width="5" stroke-dasharray="8 4"/>`;
    // case
    const occ = [[180, 450, 140, 140]];
    const roofs = ['#c0504d', '#8d5a3b', '#4f6d8f', '#d98c3a', '#7a4f9a', '#3f8f7f'];
    function house(x, y, w, h) {
      const c = pick(r, roofs), horiz = w >= h;
      let o = `<rect x="${f(x + 5)}" y="${f(y + 5)}" width="${f(w)}" height="${f(h)}" fill="#000" opacity=".2"/><rect x="${f(x)}" y="${f(y)}" width="${f(w)}" height="${f(h)}" fill="${c}"/>`;
      o += horiz ? `<rect x="${f(x)}" y="${f(y)}" width="${f(w)}" height="${f(h / 2)}" fill="#fff" opacity=".12"/><path d="M${f(x)} ${f(y + h / 2)}H${f(x + w)}" stroke="#000" stroke-opacity=".3" stroke-width="2"/>`
        : `<rect x="${f(x)}" y="${f(y)}" width="${f(w / 2)}" height="${f(h)}" fill="#fff" opacity=".12"/><path d="M${f(x + w / 2)} ${f(y)}V${f(y + h)}" stroke="#000" stroke-opacity=".3" stroke-width="2"/>`;
      if (r() < 0.6) o += `<rect x="${f(x + w * 0.7)}" y="${f(y + h * 0.15)}" width="8" height="8" fill="#6b4a3a"/>`;
      if (r() < 0.15) o += `<rect x="${f(x + w + 8)}" y="${f(y + 6)}" width="22" height="30" rx="4" fill="#4fc3f7" stroke="#fff" stroke-width="2"/>`;
      return o;
    }
    const special = [300, 175, 74, 56];
    s += house(...special); occ.push(special);
    const blocks = [[0, 0, 455, 272], [505, 0, 1000, 272], [0, 328, 455, 742], [0, 798, 455, 1000], [505, 798, 1000, 1000]];
    for (const [x0, y0, x1, y1] of blocks) {
      for (let x = x0 + 18; x < x1 - 70; x += 96) for (let y = y0 + 22; y < y1 - 60; y += 92) {
        if (r() < 0.12) continue;
        const w = 52 + r() * 22, h = 42 + r() * 22, hx = x + r() * 10, hy = y + r() * 10;
        if (occ.some(([ox, oy, ow, oh]) => hx < ox + ow + 10 && hx + w + 10 > ox && hy < oy + oh + 10 && hy + h + 10 > oy)) continue;
        s += house(hx, hy, w, h);
      }
    }
    // auto
    const carCols = ['#e63946', '#ffd166', '#118ab2', '#f4f1de', '#06d6a0', '#8338ec'];
    for (let i = 0; i < 12; i++) {
      const c = pick(r, carCols);
      if (i < 8) { const x = 30 + r() * 940, up = r() < 0.5, y = (i % 2 ? 300 : 770) + (up ? -11 : 11); const d = f(40 + r() * 30); s += `<g><rect x="${f(x)}" y="${f(y - 6)}" width="22" height="12" rx="4" fill="${c}"/><rect x="${f(x + (up ? 4 : 13))}" y="${f(y - 4)}" width="5" height="8" rx="1" fill="#223" opacity=".6"/><animateTransform attributeName="transform" type="translate" from="${up ? 1000 : -1000} 0" to="${up ? -1000 : 1000} 0" dur="${d}s" begin="${f(-r() * d)}s" repeatCount="indefinite"/></g>`; }
      else { const y = 30 + r() * 940, left = r() < 0.5, x = 480 + (left ? -11 : 11); const d = f(40 + r() * 30); s += `<g><rect x="${f(x - 6)}" y="${f(y)}" width="12" height="22" rx="4" fill="${c}"/><rect x="${f(x - 4)}" y="${f(y + (left ? 13 : 4))}" width="8" height="5" rx="1" fill="#223" opacity=".6"/><animateTransform attributeName="transform" type="translate" from="0 ${left ? 1000 : -1000}" to="0 ${left ? -1000 : 1000}" dur="${d}s" begin="${f(-r() * d)}s" repeatCount="indefinite"/></g>`; }
    }
    scenes.push({
      name: 'Città', emoji: '🏘️', scale: '~10³ m', portal: P, bg: '#6dbb5c',
      fact: 'Più della metà delle persone nel mondo vive in una città. Nel 2050 saranno quasi 7 su 10!',
      defs: '',
      svg: s,
      items: [
        ['🐈', 337, 200, 13, 'Gatto sul tetto'],
        ['🚒', 640, 770, 15, 'Camion dei pompieri'],
        ['🎈', 700, 400, 11, 'Palloncino volante'],
      ],
    });
  }

  // ---------- 5. GIARDINO ----------
  {
    const r = rng(66), P = [660, 620];
    let s = bg('#5fae4f');
    for (let i = 0; i < 480; i++) {
      const x = r() * 1000, y = r() * 1000, a = r() * TAU, l = 5 + r() * 8;
      s += `<path d="M${f(x)} ${f(y)}l${f(Math.cos(a) * l)} ${f(Math.sin(a) * l)}" stroke="${r() < 0.5 ? '#4e9a40' : '#7cc66a'}" stroke-width="2" stroke-linecap="round" opacity=".7"/>`;
    }
    // laghetto
    s += `<path d="${blob(r, 300, 320, 130, 0.25)}" fill="#4aa3df" stroke="#3a8fc7" stroke-width="6"/>`;
    [[300, 330, 24], [240, 270, 18], [360, 380, 16], [250, 390, 14]].forEach(([x, y, rr]) => {
      s += `<path d="M${x} ${y}L${f(x + rr)} ${f(y - rr * 0.3)}A${rr} ${rr} 0 1 0 ${f(x + rr * 0.9)} ${f(y + rr * 0.35)}Z" fill="#3d8b3d" stroke="#2c6e2c" stroke-width="2"/>`;
    });
    s += `<circle cx="262" cy="285" r="5" fill="#ff8fb1"/><circle cx="262" cy="285" r="2" fill="#ffe066"/>`;
    // sentiero di pietre
    for (let t = 0.05; t < 0.96; t += 0.075) {
      const x = 120 + t * 760, y = 880 - t * 760 + Math.sin(t * 9) * 30;
      s += `<ellipse cx="${f(x)}" cy="${f(y)}" rx="22" ry="16" fill="#b7b2a6" stroke="#8f8a7e" stroke-width="3" transform="rotate(${f(r() * 60)} ${f(x)} ${f(y)})"/>`;
    }
    // fiori
    s += `<circle cx="300" cy="320" r="40" fill="none" stroke="#fff" stroke-opacity=".5" stroke-width="2">${pulse('r', 20, 120, 5)}${pulse('stroke-opacity', 0.5, 0, 5)}</circle>`;
    const fc = ['#ff6b9d', '#ffd93d', '#ffffff', '#c77dff', '#ff8c42', '#4cc9f0'];
    for (let i = 0; i < 60; i++) {
      const x = 40 + r() * 920, y = 40 + r() * 920;
      if (!far(x, y, [300, 320], 165) || !far(x, y, P, 115) || Math.abs(x + y - 1000) < 55) continue;
      const p = 7 + r() * 7, c = pick(r, fc);
      let fl = '';
      for (let k = 0; k < 6; k++) { const a = k / 6 * TAU; fl += `<circle cx="${f(x + Math.cos(a) * p)}" cy="${f(y + Math.sin(a) * p)}" r="${f(p * 0.75)}" fill="${c}"/>`; }
      s += `<g>${fl}<circle cx="${f(x)}" cy="${f(y)}" r="${f(p * 0.65)}" fill="${c === '#ffd93d' ? '#a0522d' : '#ffd93d'}"/>${sway(x, y + p * 2, 6, 3 + r() * 3)}</g>`;
    }
    // cespuglio
    s += `<path d="${blob(r, 830, 830, 130, 0.3)}" fill="#2f7d32"/><path d="${blob(r, 810, 810, 85, 0.35)}" fill="#3f9442"/>`;
    // foglia-portale
    s += `<g transform="rotate(-30 ${P[0]} ${P[1]})"><ellipse cx="${P[0]}" cy="${P[1]}" rx="80" ry="64" fill="#3f8f35" stroke="#2f6f28" stroke-width="3"/><path d="M${P[0] - 80} ${P[1]}H${P[0] - 110}" stroke="#2f6f28" stroke-width="5"/></g>`;
    scenes.push({
      name: 'Giardino', emoji: '🌻', scale: '~10¹ m', portal: P, bg: '#5fae4f',
      fact: 'In un solo cucchiaino di terra vivono più microbi di quante persone ci sono sulla Terra!',
      defs: '',
      svg: s,
      items: [
        ['🐌', 240, 720, 12, 'Lumaca'],
        ['🐸', 300, 326, 13, 'Rana sulla ninfea'],
        ['🍄', 760, 290, 11, 'Fungo'],
      ],
    });
  }

  // ---------- 6. FOGLIA & COCCINELLA ----------
  {
    const r = rng(77), P = [640, 690];
    let s = bg('#3f8f35');
    for (let i = 0; i < 380; i++) s += `<circle cx="${f(r() * 1000)}" cy="${f(r() * 1000)}" r="${f(2 + r() * 4)}" fill="#4a9a3e" opacity=".55"/>`;
    const q = t => [(1 - t) ** 2 * 60 + 2 * (1 - t) * t * 520 + t * t * 940, (1 - t) ** 2 * 940 + 2 * (1 - t) * t * 560 + t * t * 60];
    for (let t = 0.08; t < 0.95; t += 0.09) {
      const [x, y] = q(t), [x2, y2] = q(t + 0.01), a = Math.atan2(y2 - y, x2 - x);
      for (const sgn of [-1, 1]) {
        const b = a + sgn * 0.85, L = 330 - Math.abs(t - 0.5) * 200;
        const ex = x + Math.cos(b) * L, ey = y + Math.sin(b) * L, mx = x + Math.cos(a + sgn * 0.5) * L * 0.5, my = y + Math.sin(a + sgn * 0.5) * L * 0.5;
        s += `<path d="M${f(x)} ${f(y)}Q${f(mx)} ${f(my)} ${f(ex)} ${f(ey)}" stroke="#5fae4f" stroke-width="7" fill="none" stroke-linecap="round" opacity=".8"/>`;
      }
    }
    s += `<path d="M60 940Q520 560 940 60" stroke="#79c25f" stroke-width="20" fill="none" stroke-linecap="round"/>`;
    // goccia di rugiada
    s += `<ellipse cx="748" cy="302" rx="48" ry="46" fill="#000" opacity=".12"/><circle cx="740" cy="290" r="48" fill="url(#drop)" stroke="#e8fbff" stroke-opacity=".75" stroke-width="3"/><ellipse cx="722" cy="270" rx="13" ry="8" fill="#fff" opacity=".9" transform="rotate(-30 722 270)">${pulse('opacity', 0.9, 0.5, 3)}</ellipse>`;
    // coccinella
    let b = `<ellipse cx="12" cy="18" rx="125" ry="128" fill="#000" opacity=".2"/>`;
    for (const sg of [-1, 1]) for (const ly of [-50, 0, 50]) b += `<path d="M${sg * 90} ${ly}l${sg * 55} ${ly * 0.3 + 10}l${sg * 12} 22" stroke="#111" stroke-width="7" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
    b += `<g><path d="M-14 -140q-20 -50 -45 -55" stroke="#111" stroke-width="5" fill="none" stroke-linecap="round"/><circle cx="-59" cy="-195" r="7" fill="#111"/>${sway(-14, -140, 8, 2.2)}</g>`;
    b += `<g><path d="M14 -140q20 -50 45 -55" stroke="#111" stroke-width="5" fill="none" stroke-linecap="round"/><circle cx="59" cy="-195" r="7" fill="#111"/>${sway(14, -140, 8, 2.6)}</g>`;
    b += `<circle cx="0" cy="-108" r="50" fill="#151515"/><circle cx="-21" cy="-128" r="10" fill="#fff"/><circle cx="21" cy="-128" r="10" fill="#fff"/><circle cx="-19" cy="-130" r="4" fill="#111"/><circle cx="23" cy="-130" r="4" fill="#111"/>`;
    b += `<circle cx="0" cy="0" r="118" fill="url(#lady)"/><path d="M-88 -80Q0 -128 88 -80L60 -60Q0 -88 -60 -60Z" fill="#151515"/><path d="M0 -100V118" stroke="#151515" stroke-width="6"/>`;
    [[-55, -20, 24], [55, -20, 24], [-62, 48, 20], [62, 48, 20], [-26, 88, 15], [26, 88, 15], [-88, 10, 10], [88, 10, 10]].forEach(([x, y, rr]) => b += `<circle cx="${x}" cy="${y}" r="${rr}" fill="#151515"/>`);
    b += `<ellipse cx="-45" cy="-35" rx="30" ry="16" fill="#fff" opacity=".35" transform="rotate(-35 -45 -35)"/>`;
    s += `<g transform="translate(370 370) rotate(35)">${b}</g>`;
    scenes.push({
      name: 'Coccinella', emoji: '🐞', scale: '~10⁻² m', portal: P, bg: '#3f8f35',
      fact: 'Una coccinella può mangiare fino a 5.000 afidi nella sua vita. È la migliore amica dei giardinieri!',
      defs: sphere('lady', '#ff7b6b', '#d62828', '#7a0f0f') +
        `<radialGradient id="drop" cx=".55" cy=".6" r=".6"><stop offset="0" stop-color="#ffffff" stop-opacity=".15"/><stop offset="1" stop-color="#bfe8ff" stop-opacity=".55"/></radialGradient>`,
      svg: s,
      items: [
        ['🐜', 800, 520, 14, 'Formica'],
        ['🐛', 170, 600, 14, 'Bruco'],
        ['💎', 330, 780, 7, 'Diamante minuscolo'],
      ],
    });
  }

  // ---------- 7. CELLULA ----------
  {
    const r = rng(88), P = [560, 450];
    let s = bg('#3a8a32');
    for (let k = 0; k < 7; k++) {
      const a = (k / 7) * TAU + 0.3, x = 500 + Math.cos(a) * 590, y = 480 + Math.sin(a) * 590;
      s += `<path d="${blob(r, x, y, 280, 0.15, 8)}" fill="#86c96d" stroke="#cdeeb4" stroke-width="12"/>`;
    }
    s += `<path d="${blob(r, 500, 480, 345, 0.12, 8)}" fill="#a6dc8b" stroke="#d8f5c0" stroke-width="14"/>`;
    for (let i = 0; i < 170; i++) {
      const a = r() * TAU, d = Math.sqrt(r()) * 290, x = 500 + Math.cos(a) * d, y = 480 + Math.sin(a) * d;
      s += `<circle cx="${f(x)}" cy="${f(y)}" r="${f(1 + r() * 2.5)}" fill="#7fbf6a" opacity=".7"/>`;
    }
    s += `<path d="${blob(r, 400, 600, 125, 0.2)}" fill="#d2f0c4" opacity=".9" stroke="#b5dfa2" stroke-width="4"/>`;
    let placed = 0;
    for (let i = 0; i < 80 && placed < 16; i++) {
      const a = r() * TAU, d = Math.sqrt(r()) * 280, x = 500 + Math.cos(a) * d, y = 480 + Math.sin(a) * d;
      if (!far(x, y, P, 110) || !far(x, y, [400, 600], 165) || !far(x, y, [300, 330], 40) || !far(x, y, [690, 690], 30)) continue;
      const rot = f(r() * 180);
      s += `<g transform="rotate(${rot} ${f(x)} ${f(y)})"><ellipse cx="${f(x)}" cy="${f(y)}" rx="27" ry="14" fill="#2e7d32" stroke="#1f5e24" stroke-width="2"/>` +
        [-12, 0, 12].map(dx => `<rect x="${f(x + dx - 3)}" y="${f(y - 7)}" width="6" height="14" rx="2" fill="#1f5e24"/>`).join('') +
        `<animateTransform attributeName="transform" type="translate" values="0 0;${f((r() - 0.5) * 16)} ${f((r() - 0.5) * 16)};0 0" dur="${f(6 + r() * 6)}s" repeatCount="indefinite" additive="sum"/></g>`;
      placed++;
    }
    [[680, 560, 30], [430, 360, 120], [620, 300, 70], [330, 470, 160]].forEach(([x, y, a]) =>
      s += `<g transform="rotate(${a} ${x} ${y})"><ellipse cx="${x}" cy="${y}" rx="24" ry="12" fill="#f4a261" stroke="#c8743a" stroke-width="2"/><path d="M${x - 16} ${y}q4 -7 8 0t8 0t8 0t8 0" stroke="#c8743a" stroke-width="2" fill="none"/></g>`);
    s += `<circle cx="${P[0]}" cy="${P[1]}" r="72" fill="none" stroke="#8a63c2" stroke-width="3"/><circle cx="${P[0]}" cy="${P[1]}" r="64" fill="#5a2f8f" stroke="#3b1d63" stroke-width="6"/>`;
    scenes.push({
      name: 'Cellula', emoji: '🟢', scale: '~10⁻⁵ m', portal: P, bg: '#3a8a32',
      fact: 'Il tuo corpo è fatto di circa 37.000 miliardi di cellule. Le foglie usano i cloroplasti (quelli verdi!) per mangiare la luce.',
      defs: '',
      svg: s,
      items: [
        ['🦠', 300, 330, 14, 'Virus intruso'],
        ['🔑', 690, 690, 10, 'Chiave segreta'],
        ['🧩', 400, 600, 12, 'Pezzo di puzzle'],
      ],
    });
  }

  // ---------- 8. DNA ----------
  {
    const r = rng(99), P = [330, 500];
    let s = bg('#5a2f8f');
    for (let i = 0; i < 140; i++) s += `<circle cx="${f(r() * 1000)}" cy="${f(r() * 1000)}" r="${f(2 + r() * 5)}" fill="#7d55b5" opacity="${f(0.3 + r() * 0.5)}"/>`;
    const k = TAU / 360, ph = -Math.PI / 2 - k * 500;
    const xa = y => 500 + 170 * Math.sin(k * y + ph), xb = y => 500 - 170 * Math.sin(k * y + ph);
    let pa = '', pb = '';
    for (let y = 20; y <= 980; y += 8) { pa += `${f(xa(y))},${y} `; pb += `${f(xb(y))},${y} `; }
    s += `<polyline points="${pb}" fill="none" stroke="#e9c46a" stroke-width="15" stroke-linecap="round" opacity=".9"/>`;
    const pairs = [['#ff6b6b', '#ffd93d'], ['#6bcb77', '#4d96ff'], ['#ffd93d', '#ff6b6b'], ['#4d96ff', '#6bcb77']];
    let balls = '';
    for (let y = 20; y <= 980; y += 40) {
      const a = xa(y), b = xb(y), m = (a + b) / 2, [c1, c2] = pick(r, pairs);
      s += `<path d="M${f(a)} ${y}H${f(m)}" stroke="${c1}" stroke-width="11"/><path d="M${f(m)} ${y}H${f(b)}" stroke="${c2}" stroke-width="11"/>`;
      if (y !== 500) balls += `<circle cx="${f(a)}" cy="${y}" r="12" fill="url(#ballA)"/>`;
      balls += `<circle cx="${f(b)}" cy="${y}" r="12" fill="url(#ballB)"/>`;
    }
    s += `<polyline points="${pa}" fill="none" stroke="#f4a261" stroke-width="15" stroke-linecap="round"/>` + balls;
    s += `<circle cx="${P[0]}" cy="${P[1]}" r="66" fill="url(#atomGlow)">${pulse('r', 62, 78, 2.5)}</circle><circle cx="${P[0]}" cy="${P[1]}" r="58" fill="#14183f" stroke="#a5b4fc" stroke-width="3"/>`;
    scenes.push({
      name: 'DNA', emoji: '🧬', scale: '~10⁻⁸ m', portal: P, bg: '#5a2f8f',
      fact: 'Se srotolassi il DNA di una sola cellula sarebbe lungo circa 2 metri! È il "libro di istruzioni" di ogni essere vivente.',
      defs: sphere('ballA', '#ffd1a8', '#f4a261', '#a35a1f') + sphere('ballB', '#fff0c4', '#e9c46a', '#9a7a20') + glow('atomGlow', '#a5b4fc', 0.6),
      svg: s,
      items: [
        ['🧶', 230, 250, 12, 'Gomitolo (non è DNA!)'],
        ['🐍', 760, 760, 12, 'Serpente'],
        ['🎵', 770, 260, 10, 'Nota musicale'],
      ],
    });
  }

  // ---------- 9. ATOMO ----------
  {
    const r = rng(111), P = [500, 500];
    let s = bg('#14183f') + stars(r, 140, P, ['#7fd3ff', '#a5b4fc', '#fff'], 1.4, 60);
    s += `<circle cx="500" cy="500" r="130" fill="url(#coreGlow)"/>`;
    let el = '';
    [0, 60, 120].forEach((rot, i) => {
      s += `<ellipse cx="500" cy="500" rx="380" ry="120" fill="none" stroke="#7fd3ff" stroke-opacity=".45" stroke-width="3" transform="rotate(${rot} 500 500)"/>`;
      const orbit = 'M880 500A380 120 0 1 1 120 500A380 120 0 1 1 880 500';
      const mo = `<animateMotion dur="${[5, 7, 6][i]}s" begin="${-i * 2.3}s" repeatCount="indefinite" path="${orbit}"/>`;
      el += `<g transform="rotate(${rot} 500 500)"><g><circle r="30" fill="url(#eGlow)"/><circle r="11" fill="#dff8ff"/>${mo}</g></g>`;
    });
    s += el;
    scenes.push({
      name: 'Atomo', emoji: '⚛️', scale: '~10⁻¹⁰ m', portal: P, bg: '#14183f',
      fact: "Un atomo è quasi tutto vuoto: se il nucleo fosse una formica, l'atomo sarebbe grande come uno stadio!",
      defs: glow('coreGlow', '#ffb36b', 0.45) + glow('eGlow', '#7fd3ff', 0.7),
      svg: s,
      items: [
        ['⚡', 230, 250, 12, 'Fulmine'],
        ['📦', 760, 760, 12, 'Scatola di Schrödinger'],
        ['🐱', 240, 740, 10, 'Gatto di Schrödinger (vivo!)'],
      ],
    });
  }

  // ---------- 10. NUCLEO ----------
  {
    const r = rng(122), P = [560, 470];
    let s = bg('#14183f') + `<circle cx="500" cy="500" r="330" fill="url(#nucGlow)">${pulse('r', 310, 350, 3)}</circle>`;
    const balls = [];
    for (let i = 0; i < 22; i++) {
      const rr = 50 * Math.sqrt(i + 0.3), a = i * 2.39996, x = 500 + Math.cos(a) * rr, y = 500 + Math.sin(a) * rr;
      if (!far(x, y, P, 70)) continue;
      balls.push([x, y, r() < 0.5 ? 'prot' : 'neut']);
    }
    balls.sort((a, b) => a[1] - b[1]).forEach(([x, y, g]) => s += `<circle cx="${f(x)}" cy="${f(y)}" r="60" fill="url(#${g})" stroke="#000" stroke-opacity=".2" stroke-width="2"/>`);
    s += `<circle cx="${P[0]}" cy="${P[1]}" r="64" fill="url(#protP)" stroke="#000" stroke-opacity=".2" stroke-width="2"/>`;
    scenes.push({
      name: 'Nucleo', emoji: '🔴', scale: '~10⁻¹⁴ m', portal: P, bg: '#14183f',
      fact: 'Protoni (rossi) e neutroni (blu) stanno incollati grazie alla forza più potente che esista: la forza nucleare forte.',
      defs: glow('nucGlow', '#ff7b5c', 0.3) + sphere('prot', '#ff9a90', '#e0453c', '#7a1a15') + sphere('neut', '#a9c2ff', '#3f6fe2', '#16307a') +
        `<radialGradient id="protP"><stop offset="0" stop-color="#c8372f"/><stop offset=".72" stop-color="#c8372f"/><stop offset="1" stop-color="#7a1a15"/></radialGradient>`,
      svg: s,
      items: [
        ['🍩', 230, 250, 12, 'Ciambella'],
        ['🎯', 760, 760, 12, 'Bersaglio'],
        ['🍒', 770, 260, 10, 'Ciliegie'],
      ],
    });
  }

  // ---------- 11. QUARK ----------
  {
    const r = rng(133), P = [507, 470];
    let s = bg('#c8372f');
    for (let i = 0; i < 16; i++) {
      const x = r() * 1000, y = r() * 1000;
      s += `<circle cx="${f(x)}" cy="${f(y)}" r="${f(60 + r() * 90)}" fill="url(#${r() < 0.5 ? 'qa' : 'qb'})"/>`;
    }
    s += stars(r, 170, P, ['#ffe066', '#fff', '#ffb3c1'], 2.2, 70);
    const Q = [[360, 330, 'qr', '#ff2e63'], [680, 380, 'qg', '#2ee86b'], [480, 700, 'qbl', '#2e8bff']];
    function wave(a, b) {
      const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy), nx = -dy / L, ny = dx / L;
      let d = '';
      for (let i = 0; i <= 80; i++) {
        const t = i / 80, o = Math.sin(t * L / 14) * 11;
        d += `${i ? 'L' : 'M'}${f(a[0] + dx * t + nx * o)} ${f(a[1] + dy * t + ny * o)}`;
      }
      return `<path d="${d}" stroke="#ffd93d" stroke-width="16" opacity=".25" fill="none">${pulse('opacity', 0.1, 0.4, 1.3)}</path><path d="${d}" stroke="#ffd93d" stroke-width="6" fill="none" stroke-linecap="round"/>`;
    }
    s += wave(Q[0], Q[1]) + wave(Q[1], Q[2]) + wave(Q[2], Q[0]);
    Q.forEach(([x, y, g, c], i) => s += `<circle cx="${x}" cy="${y}" r="100" fill="${c}" opacity=".22">${pulse('r', 90, 115, 1.8 + i * 0.4)}</circle><circle cx="${x}" cy="${y}" r="68" fill="url(#${g})" stroke="#fff" stroke-opacity=".6" stroke-width="3"/>`);
    s += `<circle cx="${P[0]}" cy="${P[1]}" r="82" fill="url(#holeGlow)"/><circle cx="${P[0]}" cy="${P[1]}" r="62" fill="#070316" stroke="#ffb3c1" stroke-opacity=".85" stroke-width="4"/>`;
    scenes.push({
      name: 'Quark', emoji: '✨', scale: '~10⁻¹⁸ m', portal: P, bg: '#c8372f',
      fact: 'Nessuno ha mai visto un quark da solo: stanno sempre in gruppi di tre, legati dai gluoni. E dentro? Forse… un altro universo! 🤯',
      defs: glow('qa', '#ff7a59', 0.35) + glow('qb', '#6e120e', 0.35) + glow('holeGlow', '#ffd6e0', 0.7) +
        sphere('qr', '#ff9ab3', '#ff2e63', '#8a0f2f') + sphere('qg', '#a6ffc4', '#2ee86b', '#0f7a35') + sphere('qbl', '#a6cfff', '#2e8bff', '#0f3f8a'),
      svg: s,
      items: [
        ['🎲', 740, 760, 12, 'Dado ("Dio non gioca a dadi!")'],
        ['🦄', 240, 230, 12, 'Unicorno quantistico'],
        ['🌀', 770, 240, 10, 'Vortice'],
      ],
    });
  }


  // ---------- 12. OCEANO (dalla Terra) ----------
  {
    const r = rng(144), P = [600, 380];
    let s = `<rect width="1000" height="1000" fill="url(#seaG)"/>`;
    for (let i = 0; i < 6; i++) {
      const x = 120 + i * 150 + r() * 60, w = 40 + r() * 60;
      s += `<path d="M${f(x)} 0L${f(x + w)} 0L${f(x + w * 2.4 - 120)} 1000L${f(x - 120)} 1000Z" fill="#fff" opacity=".06">${pulse('opacity', 0.03, 0.1, 4 + r() * 4)}</path>`;
    }
    // fondale di sabbia
    s += `<path d="M0 820Q120 780 250 805T500 800T760 790T1000 810V1000H0Z" fill="#e6c88a"/><path d="M0 860Q200 835 420 855T1000 850V1000H0Z" fill="#d9b672"/>`;
    for (let i = 0; i < 40; i++) s += `<circle cx="${f(r() * 1000)}" cy="${f(830 + r() * 160)}" r="${f(1.5 + r() * 3)}" fill="#c7a25e" opacity=".7"/>`;
    // alghe che ondeggiano
    for (let i = 0; i < 9; i++) {
      const x = 80 + i * 105 + r() * 30, h = 120 + r() * 140, c = pick(r, ['#2e8b57', '#3cb371', '#228b22']);
      s += `<g><path d="M${f(x)} 830q-25 ${f(-h / 3)} 0 ${f(-h / 1.5)}t0 ${f(-h / 3)}" stroke="${c}" stroke-width="9" fill="none" stroke-linecap="round"/>${sway(x, 830, 7, 3 + r() * 2)}</g>`;
    }
    // coralli
    const coral = (x, y, c, k) => {
      let o = '';
      for (let j = 0; j < 5; j++) { const a = -Math.PI / 2 + (j - 2) * 0.35 * k, L = 50 + r() * 40; o += `<path d="M${x} ${y}q${f(Math.cos(a) * L * 0.4)} ${f(Math.sin(a) * L * 0.6)} ${f(Math.cos(a) * L)} ${f(Math.sin(a) * L)}" stroke="${c}" stroke-width="12" fill="none" stroke-linecap="round"/>`; }
      return o;
    };
    s += coral(170, 830, '#ff7f7f', 1) + coral(450, 815, '#ffa45c', 1.2) + coral(850, 820, '#ff6fb5', 0.9);
    s += `<ellipse cx="610" cy="815" rx="45" ry="22" fill="#b56bff"/>` + [0, 1, 2, 3, 4, 5, 6].map(j => `<path d="M${575 + j * 12} 805q-6 -40 4 -60" stroke="#d7a6ff" stroke-width="7" fill="none" stroke-linecap="round"/>`).join('');
    // pesci che nuotano
    const fishC = ['#ffd93d', '#ff8c42', '#4cc9f0', '#ff6b9d', '#c77dff'];
    for (let i = 0; i < 10; i++) {
      const y = 180 + r() * 560, sz = 10 + r() * 14, c = pick(r, fishC), dir = r() < 0.5 ? 1 : -1, d = f(18 + r() * 20);
      if (Math.abs(y - P[1]) < 80) continue;
      const fish = `<g transform="scale(${dir} 1)"><ellipse cx="0" cy="0" rx="${f(sz)}" ry="${f(sz * 0.55)}" fill="${c}"/><path d="M${f(-sz * 0.8)} 0l${f(-sz * 0.7)} ${f(-sz * 0.5)}v${f(sz)}z" fill="${c}"/><circle cx="${f(sz * 0.5)}" cy="${f(-sz * 0.12)}" r="${f(sz * 0.14)}" fill="#111"/></g>`;
      s += `<g>${fish}<animateTransform attributeName="transform" type="translate" from="${dir > 0 ? -60 : 1060} ${f(y)}" to="${dir > 0 ? 1060 : -60} ${f(y)}" dur="${d}s" begin="${f(-r() * d)}s" repeatCount="indefinite"/></g>`;
    }
    // medusa
    s += `<g><path d="M300 230q0 -60 55 -60t55 60z" fill="#ffc2e8" opacity=".85"/>` + [0, 1, 2, 3].map(j => `<path d="M${314 + j * 27} 230q-8 30 0 55t0 50" stroke="#ffc2e8" stroke-width="4" fill="none" opacity=".8"/>`).join('') +
      `<animateTransform attributeName="transform" type="translate" values="0 0;0 -25;0 0" dur="4s" repeatCount="indefinite" calcMode="spline" keySplines=".45 0 .55 1;.45 0 .55 1"/></g>`;
    // tartaruga
    s += `<g><ellipse cx="770" cy="560" rx="52" ry="38" fill="#5a9e4b"/><path d="${blob(r, 770, 560, 34, 0.2, 7)}" fill="#3f7f36"/><circle cx="830" cy="552" r="16" fill="#7cbf6a"/><circle cx="836" cy="548" r="3" fill="#111"/>` +
      `<ellipse cx="740" cy="525" rx="20" ry="9" fill="#7cbf6a" transform="rotate(-30 740 525)"/><ellipse cx="740" cy="597" rx="20" ry="9" fill="#7cbf6a" transform="rotate(30 740 597)"/>` +
      `<animateTransform attributeName="transform" type="translate" values="0 0;-20 8;0 0" dur="7s" repeatCount="indefinite" calcMode="spline" keySplines=".45 0 .55 1;.45 0 .55 1"/></g>`;
    // bolle che salgono
    for (let i = 0; i < 18; i++) {
      const x = 60 + r() * 880, d = f(5 + r() * 6);
      s += `<circle cx="${f(x)}" cy="0" r="${f(3 + r() * 6)}" fill="none" stroke="#fff" stroke-opacity=".6" stroke-width="2"><animateTransform attributeName="transform" type="translate" from="0 850" to="0 60" dur="${d}s" begin="${f(-r() * d)}s" repeatCount="indefinite"/></circle>`;
    }
    // nuvola di plancton (portale)
    s += `<circle cx="${P[0]}" cy="${P[1]}" r="95" fill="url(#plGlow)">${pulse('r', 88, 104, 3)}</circle><circle cx="${P[0]}" cy="${P[1]}" r="64" fill="#2b8a8a" stroke="#9ff5d8" stroke-opacity=".7" stroke-width="3"/>`;
    for (let i = 0; i < 24; i++) { const a = r() * TAU, d = 66 + r() * 30; s += `<circle cx="${f(P[0] + Math.cos(a) * d)}" cy="${f(P[1] + Math.sin(a) * d)}" r="${f(1.5 + r() * 2.5)}" fill="#c9ffe9" opacity=".8"/>`; }
    scenes.push({
      name: 'Oceano', emoji: '🌊', scale: '~10² m', bg: '#2f80d0',
      portals: [{ x: P[0], y: P[1], to: 13 }],
      fact: "L'oceano copre il 71% della Terra, e più dell'80% dei suoi fondali non è mai stato esplorato da nessuno!",
      defs: `<linearGradient id="seaG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3f9be3"/><stop offset=".5" stop-color="#2f80d0"/><stop offset="1" stop-color="#1d5aa0"/></linearGradient>` + glow('plGlow', '#9ff5d8', 0.45),
      svg: s,
      items: [
        ['🦀', 330, 790, 12, 'Granchio'],
        ['⚓', 720, 775, 12, 'Àncora perduta'],
        ['🧜‍♀️', 250, 420, 10, 'Sirena'],
      ],
    });
  }

  // ---------- 13. PLANCTON (dall'Oceano, porta alla Cellula) ----------
  {
    const r = rng(155), P = [480, 520];
    let s = bg('#2b8a8a');
    for (let i = 0; i < 160; i++) s += `<circle cx="${f(r() * 1000)}" cy="${f(r() * 1000)}" r="${f(1 + r() * 3)}" fill="#bff7e6" opacity="${f(0.15 + r() * 0.4)}"/>`;
    const glass = 'fill="#ffffff" fill-opacity=".14" stroke="#e8fff8" stroke-opacity=".75" stroke-width="3"';
    const centric = (x, y, rr) => {
      let o = `<circle cx="${f(x)}" cy="${f(y)}" r="${f(rr)}" ${glass}/>`;
      for (let k = 0; k < 16; k++) { const a = k / 16 * TAU; o += `<path d="M${f(x + Math.cos(a) * rr * 0.25)} ${f(y + Math.sin(a) * rr * 0.25)}L${f(x + Math.cos(a) * rr * 0.95)} ${f(y + Math.sin(a) * rr * 0.95)}" stroke="#e8fff8" stroke-opacity=".45" stroke-width="2"/>`; }
      return o + `<circle cx="${f(x)}" cy="${f(y)}" r="${f(rr * 0.22)}" fill="#c8f56b" opacity=".7"/>`;
    };
    const pennate = (x, y, L, a) => {
      let o = `<g transform="rotate(${f(a)} ${f(x)} ${f(y)})"><ellipse cx="${f(x)}" cy="${f(y)}" rx="${f(L)}" ry="${f(L * 0.22)}" ${glass}/>`;
      for (let k = -6; k <= 6; k++) o += `<path d="M${f(x + k * L / 7.5)} ${f(y - L * 0.18)}v${f(L * 0.36)}" stroke="#e8fff8" stroke-opacity=".45" stroke-width="2"/>`;
      return o + `<ellipse cx="${f(x)}" cy="${f(y)}" rx="${f(L * 0.3)}" ry="${f(L * 0.1)}" fill="#c8f56b" opacity=".7"/></g>`;
    };
    const radiolarian = (x, y, rr) => {
      let o = '';
      for (let k = 0; k < 18; k++) { const a = k / 18 * TAU; o += `<path d="M${f(x + Math.cos(a) * rr)} ${f(y + Math.sin(a) * rr)}L${f(x + Math.cos(a) * rr * 1.7)} ${f(y + Math.sin(a) * rr * 1.7)}" stroke="#ffe7b0" stroke-width="3" stroke-linecap="round"/>`; }
      return o + `<circle cx="${f(x)}" cy="${f(y)}" r="${f(rr)}" fill="#ffd27a" fill-opacity=".25" stroke="#ffe7b0" stroke-width="3"/><circle cx="${f(x)}" cy="${f(y)}" r="${f(rr * 0.5)}" fill="#ffb347" opacity=".55"/>`;
    };
    const floaty = (inner, dx, dy, d) => `<g>${inner}<animateTransform attributeName="transform" type="translate" values="0 0;${dx} ${dy};0 0" dur="${d}s" repeatCount="indefinite" calcMode="spline" keySplines=".45 0 .55 1;.45 0 .55 1"/></g>`;
    s += floaty(centric(250, 260, 70), 10, 14, 7) + floaty(centric(780, 600, 55), -12, 8, 8) + floaty(centric(330, 780, 40), 8, -10, 6);
    s += floaty(pennate(720, 240, 90, 25), -10, 10, 9) + floaty(pennate(200, 560, 70, -40), 12, -6, 7) + floaty(pennate(620, 820, 60, 70), -8, -8, 6.5);
    s += floaty(radiolarian(790, 380, 38), 6, -12, 5.5);
    // copepode (piccolo crostaceo)
    s += floaty(`<g transform="rotate(-20 470 220)"><ellipse cx="470" cy="220" rx="34" ry="22" fill="#ffb3a7" fill-opacity=".8" stroke="#fff" stroke-opacity=".6" stroke-width="2"/><path d="M440 210q-70 -40 -120 -20M440 214q-70 10 -115 40" stroke="#ffb3a7" stroke-width="3" fill="none"/><path d="M504 220l40 4l20 -10M544 224l20 12" stroke="#ffb3a7" stroke-width="4" fill="none" stroke-linecap="round"/><circle cx="448" cy="214" r="5" fill="#d62828"/></g>`, 18, -8, 5);
    // cellula verde del fitoplancton = portale verso la Cellula
    s += `<circle cx="${P[0]}" cy="${P[1]}" r="92" fill="url(#phyGlow)"/><circle cx="${P[0]}" cy="${P[1]}" r="66" fill="#3a8a32" stroke="#b8f59a" stroke-width="6"/>`;
    for (let k = 0; k < 10; k++) { const a = k / 10 * TAU; s += `<ellipse cx="${f(P[0] + Math.cos(a) * 74)}" cy="${f(P[1] + Math.sin(a) * 74)}" rx="9" ry="5" fill="#2e7d32" transform="rotate(${f(a * 180 / Math.PI + 90)} ${f(P[0] + Math.cos(a) * 74)} ${f(P[1] + Math.sin(a) * 74)})"/>`; }
    scenes.push({
      name: 'Plancton', emoji: '🦠', scale: '~10⁻⁴ m', bg: '#2b8a8a',
      portals: [{ x: P[0], y: P[1], to: 7 }],
      fact: "Il plancton è minuscolo, ma produce circa metà dell'ossigeno che respiriamo! Le diatomee hanno un guscio di vetro.",
      defs: glow('phyGlow', '#b8f59a', 0.5),
      svg: s,
      items: [
        ['🦐', 760, 300, 11, 'Krill'],
        ['🔬', 240, 740, 10, 'Microscopio'],
        ['🥚', 750, 760, 9, 'Uovo di pesce'],
      ],
    });
  }

  // ---------- 14. CORPO UMANO (dalla Città: un bambino sdraiato nel parco) ----------
  {
    const r = rng(166), P = [530, 425];
    let s = bg('#5aa64c');
    for (let i = 0; i < 320; i++) {
      const x = r() * 1000, y = r() * 1000, a = r() * TAU, l = 6 + r() * 9;
      s += `<path d="M${f(x)} ${f(y)}l${f(Math.cos(a) * l)} ${f(Math.sin(a) * l)}" stroke="${r() < 0.5 ? '#4e9a40' : '#74bf62'}" stroke-width="3" stroke-linecap="round" opacity=".6"/>`;
    }
    for (let i = 0; i < 14; i++) {
      const x = r() * 1000, y = r() * 1000; if (Math.hypot(x - 500, y - 520) < 330) continue;
      s += [0, 1, 2, 3, 4].map(k => `<circle cx="${f(x + Math.cos(k * 1.256) * 9)}" cy="${f(y + Math.sin(k * 1.256) * 9)}" r="7" fill="#fff"/>`).join('') + `<circle cx="${f(x)}" cy="${f(y)}" r="6" fill="#ffd93d"/>`;
    }
    const skin = '#f1c27d', skinD = '#d9a35c';
    // ombra
    s += `<ellipse cx="510" cy="540" rx="250" ry="330" fill="#000" opacity=".1"/>`;
    // gambe e scarpe
    s += `<path d="M465 600L430 820M535 600L570 820" stroke="${skin}" stroke-width="46" stroke-linecap="round"/>`;
    s += `<ellipse cx="425" cy="850" rx="32" ry="22" fill="#e63946"/><ellipse cx="575" cy="850" rx="32" ry="22" fill="#e63946"/>`;
    s += `<path d="M418 560h164l14 90h-90l-6 -40l-6 40h-90z" fill="#264653"/>`;
    // braccia (una mano tiene la farfalla)
    s += `<path d="M430 340Q330 380 250 420M570 340Q670 380 750 330" stroke="${skin}" stroke-width="40" fill="none" stroke-linecap="round"/>`;
    s += `<circle cx="245" cy="423" r="24" fill="${skin}"/><circle cx="755" cy="328" r="24" fill="${skin}"/>`;
    // maglietta
    s += `<path d="M410 320Q500 295 590 320L600 575Q500 590 400 575Z" fill="#4cc9f0"/><path d="M410 320Q370 330 360 365L420 380ZM590 320Q630 330 640 365L580 380Z" fill="#3ab0d6"/>`;
    s += `<path d="M470 312Q500 335 530 312" stroke="${skinD}" stroke-width="6" fill="none"/>`;
    // testa
    s += `<circle cx="500" cy="235" r="82" fill="${skin}"/><path d="M420 220Q430 140 500 145T585 225Q560 180 500 185T420 220Z" fill="#6b3e26"/>`;
    s += `<circle cx="472" cy="240" r="9" fill="#2b2b2b"/><circle cx="528" cy="240" r="9" fill="#2b2b2b"/><circle cx="475" cy="237" r="3" fill="#fff"/><circle cx="531" cy="237" r="3" fill="#fff"/>`;
    s += `<path d="M470 272Q500 298 530 272" stroke="#a0522d" stroke-width="6" fill="none" stroke-linecap="round"/><circle cx="452" cy="265" r="11" fill="#ff8fa3" opacity=".5"/><circle cx="548" cy="265" r="11" fill="#ff8fa3" opacity=".5"/>`;
    // cuore che batte, con la "finestra" verso il sangue (portale)
    const heart = 'M0 30C-60 -10 -55 -70 -15 -70C0 -70 0 -55 0 -50C0 -55 0 -70 15 -70C55 -70 60 -10 0 30Z';
    s += `<g transform="translate(${P[0]} ${P[1] + 22}) scale(2.05)"><path d="${heart}" fill="#e63946" stroke="#fff" stroke-opacity=".7" stroke-width="2"><animateTransform attributeName="transform" type="scale" values="1;1.08;1;1.05;1" dur="1.1s" repeatCount="indefinite"/></path></g>`;
    s += `<circle cx="${P[0]}" cy="${P[1]}" r="58" fill="#8b1e2b"/>`;
    scenes.push({
      name: 'Corpo umano', emoji: '🧒', scale: '~10⁰ m', bg: '#5aa64c',
      portals: [{ x: P[0], y: P[1], to: 15 }],
      fact: 'Il tuo cuore batte circa 100.000 volte al giorno e spinge il sangue in 100.000 km di vasi: due volte e mezza il giro della Terra!',
      defs: '',
      svg: s,
      items: [
        ['🦋', 240, 400, 11, 'Farfalla sulla mano'],
        ['🍦', 770, 690, 12, 'Gelato caduto'],
        ['🐜', 600, 760, 8, 'Formica sul ginocchio'],
      ],
    });
  }

  // ---------- 15. SANGUE (dal cuore, porta al DNA) ----------
  {
    const r = rng(177), P = [520, 500];
    let s = bg('#8b1e2b');
    // pareti del vaso sanguigno
    s += `<path d="M0 0H1000V170Q750 220 500 175T0 190Z" fill="#c94a5a"/><path d="M0 1000H1000V830Q750 780 500 825T0 810Z" fill="#c94a5a"/>`;
    s += `<path d="M0 190Q250 160 500 175T1000 170" stroke="#e7788a" stroke-width="10" fill="none"/><path d="M0 810Q250 840 500 825T1000 830" stroke="#e7788a" stroke-width="10" fill="none"/>`;
    for (let i = 0; i < 60; i++) s += `<circle cx="${f(r() * 1000)}" cy="${f(220 + r() * 560)}" r="${f(1 + r() * 2.5)}" fill="#ffb3c1" opacity=".35"/>`;
    // globuli rossi che scorrono
    const rbc = (sz) => `<ellipse cx="0" cy="0" rx="${f(sz)}" ry="${f(sz * 0.62)}" fill="#e63946" stroke="#ff8a95" stroke-width="3"/><ellipse cx="0" cy="0" rx="${f(sz * 0.45)}" ry="${f(sz * 0.26)}" fill="#b51d2c"/>`;
    for (let i = 0; i < 26; i++) {
      let y = 230 + r() * 540;
      if (Math.abs(y - P[1]) < 120) y = P[1] + (y < P[1] ? -150 : 150) + (r() - 0.5) * 40;
      const sz = 26 + r() * 14, d = f(9 + r() * 7), rot = f(r() * 50 - 25);
      s += `<g><g transform="rotate(${rot})">${rbc(sz)}</g><animateTransform attributeName="transform" type="translate" from="-80 ${f(y)}" to="1080 ${f(y)}" dur="${d}s" begin="${f(-r() * d)}s" repeatCount="indefinite"/></g>`;
    }
    // piastrine
    for (let i = 0; i < 10; i++) { const d = f(7 + r() * 5), y = 240 + r() * 520; s += `<g><path d="${blob(r, 0, 0, 8, 0.6, 6)}" fill="#ffd27a"/><animateTransform attributeName="transform" type="translate" from="-40 ${f(y)}" to="1040 ${f(y)}" dur="${d}s" begin="${f(-r() * d)}s" repeatCount="indefinite"/></g>`; }
    // globulo bianco con il nucleo (portale verso il DNA)
    s += `<path d="${blob(r, P[0], P[1], 120, 0.22, 14)}" fill="#f4eef7" stroke="#d8c8e6" stroke-width="5"/>`;
    for (let k = 0; k < 20; k++) { const a = r() * TAU, d = 75 + r() * 30; s += `<circle cx="${f(P[0] + Math.cos(a) * d)}" cy="${f(P[1] + Math.sin(a) * d)}" r="${f(3 + r() * 4)}" fill="#c9b6dc" opacity=".7"/>`; }
    s += `<circle cx="${P[0]}" cy="${P[1]}" r="64" fill="#5a2f8f" stroke="#3b1d63" stroke-width="6"/>`;
    scenes.push({
      name: 'Sangue', emoji: '🩸', scale: '~10⁻⁵ m', bg: '#8b1e2b',
      portals: [{ x: P[0], y: P[1], to: 8 }],
      fact: 'In una sola goccia di sangue ci sono circa 5 milioni di globuli rossi! I globuli bianchi sono i soldati che ti difendono dai microbi.',
      defs: '',
      svg: s,
      items: [
        ['🚑', 240, 300, 10, 'Ambulanza minuscola'],
        ['🛡️', 760, 720, 11, 'Scudo degli anticorpi'],
        ['🧦', 270, 720, 9, 'Calzino perduto (ma come?!)'],
      ],
    });
  }


  // ---------- 16+. ALTRI MONDI (bivi extra) ----------
  const back = (x, y, c, ring = '#fff') => `<circle cx="${x}" cy="${y}" r="62" fill="${c}"/><circle cx="${x}" cy="${y}" r="62" fill="none" stroke="${ring}" stroke-opacity=".6" stroke-width="3"/>`;
  const mk = (name, emoji, scale, bgc, to, px, py, fact, defs, svg, items) =>
    scenes.push({ name, emoji, scale, bg: bgc, portals: [{ x: px, y: py, to }], fact, defs, svg, items });
  { // 16 LUNA
    const r = rng(201); let s = bg('#02020a') + stars(r, 120, [500, 500], ['#fff'], 1.2, 340) + `<circle cx="500" cy="500" r="330" fill="url(#lunaG)"/>`;
    for (let i = 0; i < 46; i++) { const a = r() * TAU, d = Math.sqrt(r()) * 300, x = 500 + Math.cos(a) * d, y = 500 + Math.sin(a) * d, rr = 6 + r() * 30; if (!far(x, y, [560, 440], 95)) continue;
      s += `<circle cx="${f(x + rr * 0.12)}" cy="${f(y + rr * 0.12)}" r="${f(rr)}" fill="#f2f2f2" opacity=".5"/><circle cx="${f(x)}" cy="${f(y)}" r="${f(rr)}" fill="#6f6f76" opacity=".75"/><circle cx="${f(x + rr * 0.1)}" cy="${f(y + rr * 0.1)}" r="${f(rr * 0.8)}" fill="#8d8d94"/>`; }
    for (let i = 0; i < 5; i++) s += `<path d="${blob(r, 350 + r() * 300, 350 + r() * 300, 50 + r() * 40, 0.5)}" fill="#55555c" opacity=".3"/>`;
    s += `<circle cx="500" cy="500" r="330" fill="url(#lunaS)"/>` + back(560, 440, '#14183f');
    mk('Luna', '🌕', '~10⁶ m', '#02020a', 9, 560, 440, 'Sulla Luna non c\'è vento: le impronte degli astronauti resteranno lì per milioni di anni!',
      `<radialGradient id="lunaG" cx=".38" cy=".35" r=".75"><stop offset="0" stop-color="#e9e9ee"/><stop offset=".6" stop-color="#a9a9b2"/><stop offset="1" stop-color="#5a5a63"/></radialGradient><radialGradient id="lunaS" cx=".35" cy=".3" r=".8"><stop offset=".55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".65"/></radialGradient>`,
      s, [['🚩', 380, 330, 10, 'Bandiera'], ['👣', 620, 640, 9, 'Impronta'], ['🧀', 350, 620, 9, 'Formaggio lunare']]);
  }
  { // 17 MARTE
    const r = rng(202); let g = `<circle cx="500" cy="500" r="330" fill="url(#marteG)"/>`;
    for (let i = 0; i < 9; i++) g += `<path d="${blob(r, 250 + r() * 500, 300 + r() * 400, 50 + r() * 80, 0.6)}" fill="#7a2d16" opacity=".35"/>`;
    for (let i = 0; i < 30; i++) { const x = 220 + r() * 560, y = 220 + r() * 560, rr = 4 + r() * 14; g += `<circle cx="${f(x)}" cy="${f(y)}" r="${f(rr)}" fill="#6b2412" opacity=".45"/><circle cx="${f(x + 1.5)}" cy="${f(y + 1.5)}" r="${f(rr * 0.75)}" fill="#c9683f" opacity=".6"/>`; }
    g += `<path d="M260 560q120 -50 240 -10t230 -30" stroke="#5e1f10" stroke-width="16" fill="none" opacity=".5" stroke-linecap="round"/><ellipse cx="500" cy="190" rx="130" ry="34" fill="#fff6f0" opacity=".9"/><ellipse cx="500" cy="815" rx="90" ry="22" fill="#fff6f0" opacity=".8"/><circle cx="500" cy="500" r="330" fill="url(#lunaS)"/>`;
    const s = bg('#02020a') + stars(r, 120, [500, 500], ['#fff'], 1.2, 340) + `<circle cx="500" cy="500" r="345" fill="url(#marteA)"/><g clip-path="url(#marteC)">${g}</g>` + back(450, 520, '#14183f');
    mk('Marte', '🪐', '~10⁷ m', '#02020a', 9, 450, 520, 'Su Marte c\'è il vulcano più alto del Sistema solare: il Monte Olimpo, alto quasi tre volte l\'Everest!',
      `<radialGradient id="marteG" cx=".38" cy=".35" r=".75"><stop offset="0" stop-color="#f0a070"/><stop offset=".6" stop-color="#c8552d"/><stop offset="1" stop-color="#7a2b14"/></radialGradient>` + glow('marteA', '#ff9a6b', 0.5) + `<clipPath id="marteC"><circle cx="500" cy="500" r="330"/></clipPath>`,
      s, [['🤖', 600, 380, 10, 'Rover'], ['🥔', 560, 660, 8, 'Patata marziana'], ['🛸', 330, 400, 9, 'UFO parcheggiato']]);
  }
  { // 18 BUCO NERO
    const r = rng(203); let s = bg('#06041a') + stars(r, 160, [500, 500], ['#fff', '#ffd9a8'], 1.4, 170) + `<circle cx="500" cy="500" r="430" fill="url(#bnGlow)"/><g>`;
    for (let i = 0; i < 14; i++) s += `<ellipse cx="500" cy="500" rx="${180 + i * 17}" ry="${(180 + i * 17) * 0.36}" fill="none" stroke="${['#fff3c4', '#ffb347', '#ff7a2f', '#c8401a'][i % 4]}" stroke-width="${f(5 + r() * 9)}" stroke-opacity="${f(0.75 - i * 0.04)}" stroke-dasharray="${f(200 + r() * 500)} ${f(20 + r() * 90)}"/>`;
    s += `${spin(500, 500, 40)}</g><circle cx="500" cy="500" r="150" fill="#000"/><circle cx="500" cy="500" r="153" fill="none" stroke="#ffe7b0" stroke-width="5">${pulse('stroke-opacity', 0.9, 0.5, 3)}</circle><path d="M350 500A150 150 0 0 1 650 500" fill="none" stroke="#ffb347" stroke-width="12" opacity=".7" transform="translate(0 -6)"/>` + back(500, 500, '#070316', '#ffb347');
    mk('Buco nero', '⚫', '~10¹⁰ m', '#06041a', 0, 500, 500, 'Al centro della nostra galassia c\'è un buco nero che pesa come 4 milioni di Soli. Nemmeno la luce riesce a scappare!',
      glow('bnGlow', '#ff8a3d', 0.4), s, [['🧦', 250, 330, 10, 'Calzino risucchiato'], ['⏰', 730, 660, 10, 'Orologio rallentato'], ['🍝', 700, 300, 10, 'Spaghetti (spaghettificazione!)']]);
  }
  { // 19 VULCANO (dall'alto)
    const r = rng(204); let s = bg('#3b2a22');
    for (let i = 0; i < 90; i++) s += `<path d="${blob(r, r() * 1000, r() * 1000, 14 + r() * 40, 0.6, 7)}" fill="${pick(r, ['#2b1d17', '#4a362c', '#5a4337'])}" opacity=".6"/>`;
    [330, 270, 210].forEach((rr, i) => s += `<path d="${blob(r, 500, 500, rr, 0.18, 14)}" fill="${['#4a342a', '#2e1f19', '#1c120e'][i]}"/>`);
    for (let i = 0; i < 7; i++) { const a = i / 7 * TAU + r(), L = 260 + r() * 160; s += `<path d="M${f(500 + Math.cos(a) * 150)} ${f(500 + Math.sin(a) * 150)}Q${f(500 + Math.cos(a + 0.3) * L * 0.7)} ${f(500 + Math.sin(a + 0.3) * L * 0.7)} ${f(500 + Math.cos(a) * L)} ${f(500 + Math.sin(a) * L)}" stroke="#ff5a1f" stroke-width="${f(8 + r() * 12)}" fill="none" stroke-linecap="round" opacity=".85"/><path d="M${f(500 + Math.cos(a) * 150)} ${f(500 + Math.sin(a) * 150)}Q${f(500 + Math.cos(a + 0.3) * L * 0.7)} ${f(500 + Math.sin(a + 0.3) * L * 0.7)} ${f(500 + Math.cos(a) * L)} ${f(500 + Math.sin(a) * L)}" stroke="#ffd23f" stroke-width="3" fill="none" stroke-linecap="round"/>`; }
    s += `<circle cx="500" cy="500" r="260" fill="url(#vulG)">${pulse('r', 240, 280, 3)}</circle><path d="${blob(r, 500, 500, 160, 0.2, 12)}" fill="url(#vulL)"/>`;
    for (let i = 0; i < 14; i++) s += `<path d="${blob(r, 420 + r() * 160, 420 + r() * 160, 8 + r() * 18, 0.6, 6)}" fill="#3a1408" opacity=".7"/>`;
    s += back(500, 500, '#14183f', '#ffd23f');
    mk('Vulcano', '🌋', '~10³ m', '#3b2a22', 9, 500, 500, 'La lava può superare i 1.200 °C: è roccia fusa che arriva da decine di chilometri sotto i nostri piedi!',
      glow('vulG', '#ff6a1f', 0.6) + `<radialGradient id="vulL"><stop offset="0" stop-color="#fff3a8"/><stop offset=".5" stop-color="#ff9a1f"/><stop offset="1" stop-color="#c8300f"/></radialGradient>`,
      s, [['🦖', 280, 620, 11, 'Dinosauro curioso'], ['🌡️', 700, 330, 10, 'Termometro fuso'], ['🍳', 680, 680, 10, 'Uovo fritto sulla roccia']]);
  }
  { // 20 ALVEARE
    const r = rng(205); let s = bg('#e0a021'); const R6 = 46, hx = R6 * 1.5, hy = R6 * Math.sqrt(3);
    for (let c = -1; c * hx < 1050; c++) for (let q = -1; q * hy < 1050; q++) { const x = c * hx, y = q * hy + (c % 2 ? hy / 2 : 0); let d = '';
      for (let k = 0; k < 6; k++) d += `${k ? 'L' : 'M'}${f(x + Math.cos(k * Math.PI / 3) * R6)} ${f(y + Math.sin(k * Math.PI / 3) * R6)}`;
      const t = r(); s += `<path d="${d}Z" fill="${t < 0.35 ? 'url(#mieleG)' : t < 0.5 ? '#f6d57a' : '#b8770f'}" stroke="#8a560a" stroke-width="7" stroke-linejoin="round"/>` + (t < 0.35 ? `<ellipse cx="${f(x - 10)}" cy="${f(y - 12)}" rx="12" ry="6" fill="#fff" opacity=".45"/>` : ''); }
    const bee = (x, y, a, d) => `<g><g transform="translate(${x} ${y}) rotate(${a})"><ellipse cx="6" cy="10" rx="30" ry="18" fill="#000" opacity=".2"/><ellipse cx="-8" cy="-20" rx="22" ry="11" fill="#fff" opacity=".6" transform="rotate(-25)"/><ellipse cx="-8" cy="20" rx="22" ry="11" fill="#fff" opacity=".6" transform="rotate(25)"/><ellipse rx="28" ry="17" fill="url(#apeG)"/><path d="M-10 -16v32M2 -17v34M13 -14v28" stroke="#2b1a05" stroke-width="7"/><circle cx="27" cy="0" r="12" fill="#2b1a05"/></g><animateTransform attributeName="transform" type="translate" values="0 0;${d} ${-d};0 0" dur="${3 + Math.abs(d) / 6}s" repeatCount="indefinite"/></g>`;
    s += bee(330, 470, 20, 18) + bee(660, 330, 200, -14) + bee(620, 700, -40, 12) + bee(250, 760, 110, -16) + bee(760, 520, 70, 10) + back(500, 500, '#5a2f8f', '#ffe7a0');
    mk('Alveare', '🐝', '~10⁻² m', '#e0a021', 8, 500, 500, 'Per fare un solo cucchiaino di miele, un\'ape deve visitare circa 5.000 fiori. Le celle sono esagoni perfetti!',
      `<radialGradient id="mieleG" cx=".4" cy=".35"><stop offset="0" stop-color="#ffd76a"/><stop offset="1" stop-color="#e08a0b"/></radialGradient>` + sphere('apeG', '#ffe680', '#f5b914', '#a86a05'),
      s, [['👑', 300, 300, 10, 'Corona dell\'ape regina'], ['🍯', 720, 640, 11, 'Vasetto di miele'], ['🧸', 290, 650, 10, 'Orsetto goloso']]);
  }
  { // 21 FIOCCO DI NEVE
    const r = rng(206); let s = `<rect width="1000" height="1000" fill="url(#neveBg)"/>`;
    for (let i = 0; i < 60; i++) s += `<circle cx="${f(r() * 1000)}" cy="${f(r() * 1000)}" r="${f(2 + r() * 6)}" fill="#fff" opacity="${f(0.2 + r() * 0.5)}"/>`;
    let arm = `<path d="M0 0V-350" stroke="url(#neveA)" stroke-width="22" stroke-linecap="round"/>`;
    [[-110, 90], [-190, 110], [-270, 80], [-320, 45]].forEach(([y, L]) => arm += `<path d="M0 ${y}l${-L * 0.8} ${-L * 0.6}M0 ${y}l${L * 0.8} ${-L * 0.6}" stroke="#f4fbff" stroke-width="13" stroke-linecap="round"/>`);
    arm += `<path d="M0 -70L-38 -100L0 -150L38 -100Z" fill="#e3f4ff" opacity=".8"/>`;
    s += `<g transform="translate(508 508)" opacity=".18">` + [0, 60, 120, 180, 240, 300].map(a => `<g transform="rotate(${a})">${arm.replace(/url\(#neveA\)|#f4fbff|#e3f4ff/g, '#0b3a66')}</g>`).join('') + `</g>`;
    s += `<g transform="translate(500 500)">` + [0, 60, 120, 180, 240, 300].map(a => `<g transform="rotate(${a})">${arm}</g>`).join('') + `<circle r="80" fill="#eaf7ff"/></g>` + back(500, 500, '#14183f', '#bfe3ff');
    mk('Fiocco di neve', '❄️', '~10⁻³ m', '#8ec5ee', 9, 500, 500, 'Ogni fiocco di neve ha sei punte, ma non ne esistono due identici. Sono cristalli di ghiaccio cresciuti attorno a un granello di polvere!',
      `<radialGradient id="neveBg"><stop offset="0" stop-color="#bfe3ff"/><stop offset="1" stop-color="#8ec5ee"/></radialGradient><linearGradient id="neveA" x1="0" x2="1"><stop offset="0" stop-color="#d3ecff"/><stop offset=".5" stop-color="#fff"/><stop offset="1" stop-color="#c2e2fb"/></linearGradient>`,
      s, [['⛄', 260, 280, 11, 'Pupazzo di neve'], ['🧤', 740, 300, 10, 'Guanto perso'], ['🐻‍❄️', 720, 720, 11, 'Orso polare']]);
  }
  { // 22 OCCHIO
    const r = rng(207); let s = `<rect width="1000" height="1000" fill="url(#pelleG)"/>`;
    for (let i = 0; i < 80; i++) s += `<circle cx="${f(r() * 1000)}" cy="${f(r() * 1000)}" r="${f(1 + r() * 2)}" fill="#b98253" opacity=".35"/>`;
    const eye = 'M130 500Q500 200 870 500Q500 800 130 500Z';
    s += `<path d="M110 440Q500 110 890 440" stroke="#5a371f" stroke-width="34" fill="none" stroke-linecap="round" opacity=".85"/><path d="${eye}" fill="#000" opacity=".25" transform="translate(0 14)"/><path d="${eye}" fill="url(#scleraG)"/><g clip-path="url(#occhioC)">`;
    for (let i = 0; i < 12; i++) s += `<path d="M${r() < 0.5 ? 140 : 860} ${f(420 + r() * 160)}q${f((r() - 0.5) * 200)} ${f((r() - 0.5) * 80)} ${f((r() - 0.5) * 260)} ${f((r() - 0.5) * 60)}" stroke="#d94a4a" stroke-width="2" fill="none" opacity=".45"/>`;
    s += `<circle cx="500" cy="500" r="190" fill="url(#irideG)"/>`;
    for (let i = 0; i < 90; i++) { const a = i / 90 * TAU + r() * 0.05; s += `<path d="M${f(500 + Math.cos(a) * 70)} ${f(500 + Math.sin(a) * 70)}L${f(500 + Math.cos(a) * (150 + r() * 36))} ${f(500 + Math.sin(a) * (150 + r() * 36))}" stroke="${pick(r, ['#2c5a3a', '#8fbf7a', '#c9a24b', '#234a5e'])}" stroke-width="${f(1.5 + r() * 3)}" opacity=".6"/>`; }
    s += `<circle cx="500" cy="500" r="190" fill="none" stroke="#1d3327" stroke-width="10"/><path d="${eye}" fill="url(#palpG)"/></g>`;
    for (let i = 0; i < 22; i++) { const t = i / 21, x = 170 + t * 660, y = 500 - Math.sin(t * Math.PI) * 150 - 8; s += `<path d="M${f(x)} ${f(y)}q${f((t - 0.5) * 30)} -40 ${f((t - 0.5) * 70)} ${f(-60 - Math.sin(t * Math.PI) * 30)}" stroke="#2b1a10" stroke-width="5" fill="none" stroke-linecap="round"/>`; }
    s += back(500, 500, '#8b1e2b', '#1d3327') + `<ellipse cx="440" cy="430" rx="34" ry="22" fill="#fff" opacity=".8" transform="rotate(-30 440 430)"/>`;
    mk('Occhio', '👁️', '~10⁻² m', '#f1c27d', 15, 500, 500, 'Il tuo occhio distingue circa 10 milioni di colori, e l\'iride è unica come un\'impronta digitale!',
      `<radialGradient id="pelleG"><stop offset="0" stop-color="#f6cf96"/><stop offset="1" stop-color="#f1c27d"/></radialGradient><radialGradient id="scleraG"><stop offset=".5" stop-color="#fff"/><stop offset="1" stop-color="#e3d3cf"/></radialGradient><radialGradient id="irideG"><stop offset=".3" stop-color="#c9a24b"/><stop offset=".6" stop-color="#5f9a6a"/><stop offset="1" stop-color="#1f4a3a"/></radialGradient><linearGradient id="palpG" x1="0" y1="0" x2="0" y2="1"><stop offset=".25" stop-color="#000" stop-opacity=".35"/><stop offset=".45" stop-color="#000" stop-opacity="0"/></linearGradient><clipPath id="occhioC"><path d="${eye}"/></clipPath>`,
      s, [['👓', 250, 300, 11, 'Occhiali'], ['💧', 700, 660, 10, 'Lacrima'], ['🪞', 740, 330, 10, 'Specchietto']]);
  }
  { // 23 FORMICAIO
    const r = rng(208); let s = bg('#7a5230');
    for (let i = 0; i < 220; i++) s += `<circle cx="${f(r() * 1000)}" cy="${f(r() * 1000)}" r="${f(2 + r() * 7)}" fill="${pick(r, ['#6a4526', '#8b6038', '#5c3b20', '#9a7146'])}" opacity=".7"/>`;
    const ch = [[520, 480, 95, 62], [260, 300, 80, 50], [760, 300, 70, 46], [280, 700, 85, 52], [740, 690, 80, 50], [500, 180, 60, 38], [500, 820, 60, 38]];
    const tun = [[0, 1], [0, 2], [0, 3], [0, 4], [1, 5], [2, 5], [3, 6], [4, 6]];
    tun.forEach(([a, b]) => { const A = ch[a], B = ch[b], mx = (A[0] + B[0]) / 2 + (r() - 0.5) * 120, my = (A[1] + B[1]) / 2 + (r() - 0.5) * 120; const d = `M${A[0]} ${A[1]}Q${f(mx)} ${f(my)} ${B[0]} ${B[1]}`; s += `<path d="${d}" stroke="#2b1a0e" stroke-width="44" fill="none" stroke-linecap="round"/><path d="${d}" stroke="#3d2817" stroke-width="32" fill="none" stroke-linecap="round"/>`; });
    ch.forEach(([x, y, a, b]) => s += `<ellipse cx="${x}" cy="${y}" rx="${a}" ry="${b}" fill="#2b1a0e"/><ellipse cx="${x}" cy="${y + 4}" rx="${a - 8}" ry="${b - 8}" fill="url(#tanaG)"/>`);
    const ant = (x, y, a) => `<g transform="translate(${f(x)} ${f(y)}) rotate(${f(a)})"><path d="M-8 0l-10 -12M-8 0l-10 12M0 0l0 -15M0 0l0 15M8 0l10 -12M8 0l10 12" stroke="#120a05" stroke-width="2.5"/><ellipse cx="-13" rx="10" ry="7" fill="#1c0f08"/><circle r="5.5" fill="#1c0f08"/><circle cx="10" r="6.5" fill="#1c0f08"/><circle cx="-15" cy="-2" r="2.5" fill="#fff" opacity=".3"/></g>`;
    for (let i = 0; i < 16; i++) { const c = ch[1 + (i % 6)]; s += ant(c[0] + (r() - 0.5) * c[2] * 1.2, c[1] + (r() - 0.5) * c[3], r() * 360); }
    for (let i = 0; i < 12; i++) s += `<ellipse cx="${f(245 + r() * 70)}" cy="${f(690 + r() * 30)}" rx="7" ry="4.5" fill="#f6efe2"/>`;
    s += back(520, 480, '#3a8a32', '#c9a36b');
    mk('Formicaio', '🐜', '~10⁻¹ m', '#7a5230', 7, 520, 480, 'Le formiche possono sollevare fino a 50 volte il loro peso. In un formicaio ne vivono anche milioni, tutte figlie della stessa regina!',
      `<radialGradient id="tanaG"><stop offset="0" stop-color="#5a3d25"/><stop offset="1" stop-color="#33200f"/></radialGradient>`,
      s, [['👑', 260, 300, 10, 'Corona della regina'], ['🍬', 700, 600, 10, 'Caramella rubata'], ['🍃', 690, 380, 10, 'Pezzetto di foglia']]);
  }

  // ---------- portali: catena principale + bivi ----------
  // catena principale 0→1→…→11→0; ogni scena ha i suoi portali in `portals`
  scenes.forEach((sc, i) => {
    if (!sc.portals) sc.portals = [{ x: sc.portal[0], y: sc.portal[1], to: (i + 1) % 12 }];
    delete sc.portal;
  });
  scenes[3].portals.push({ x: 430, y: 450, to: 12 });  // Terra → Oceano
  scenes[4].portals.push({ x: 600, y: 395, to: 14 });  // Città → Corpo umano
  // bivi extra: il motore disegna da solo il dischetto di fondo (extra: true)
  [[3, 742, 262, 16], [2, 300, 330, 17], [1, 500, 500, 18], [3, 610, 565, 19], [5, 480, 470, 20], [3, 500, 300, 21], [14, 500, 215, 22], [5, 430, 800, 23]]
    .forEach(([s, x, y, to]) => scenes[s].portals.push({ x, y, to, extra: true }));
  scenes.forEach(sc => sc.items = sc.items.map(([e, x, y, s, name]) => ({ e, x, y, s, name })));
  return scenes;
})();
