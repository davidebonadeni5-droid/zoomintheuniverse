// mondo 5: Giardino visto dall'alto — versione realistica
REAL[5] = (() => {
  let seed = 5055;
  const r = () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; };
  const f = n => +n.toFixed(1), TAU = Math.PI * 2;
  const pick = a => a[Math.floor(r() * a.length)];
  const far = (x, y, c, d) => Math.hypot(x - c[0], y - c[1]) > d;
  const poly = (cx, cy, rx, ry, irr, n, rot = 0) => {
    const p = [], ph = r() * TAU, co = Math.cos(rot), si = Math.sin(rot);
    for (let i = 0; i < n; i++) { const a = ph + i / n * TAU, k = 1 - irr / 2 + r() * irr, x = Math.cos(a) * rx * k, y = Math.sin(a) * ry * k; p.push([cx + x * co - y * si, cy + x * si + y * co]); }
    return p;
  };
  const smooth = p => {
    const n = p.length;
    let d = `M${f((p[0][0] + p[n - 1][0]) / 2)} ${f((p[0][1] + p[n - 1][1]) / 2)}`;
    for (let i = 0; i < n; i++) { const q = p[i], m = p[(i + 1) % n]; d += `Q${f(q[0])} ${f(q[1])} ${f((q[0] + m[0]) / 2)} ${f((q[1] + m[1]) / 2)}`; }
    return d + 'Z';
  };
  const blob = (cx, cy, rad, irr, n = 9) => smooth(poly(cx, cy, rad, rad, irr, n));
  const ell = (cx, cy, a, rx, ry) => { // ellisse ruotata come sottopercorso compatto
    const dx = Math.cos(a) * rx, dy = Math.sin(a) * rx, deg = Math.round(a * 180 / Math.PI), A = `a${f(rx)} ${f(ry)} ${deg} 1 0 `;
    return `M${f(cx - dx)} ${f(cy - dy)}${A}${f(2 * dx)} ${f(2 * dy)}${A}${f(-2 * dx)} ${f(-2 * dy)}z`;
  };
  const P = [660, 620], POND = [300, 320];
  const pathY = t => 880 - t * 760 + Math.sin(t * 9) * 30, pathX = t => 120 + t * 760;
  const nearPath = (x, y, d) => { for (let t = 0; t <= 1; t += 0.02) if (Math.hypot(x - pathX(t), y - pathY(t)) < d) return true; return false; };
  const fcols = [['#ff7fa8', '#d9306e'], ['#ffe066', '#e8a400'], ['#ffffff', '#d9dde8'], ['#c99bff', '#7d3fc9'], ['#ffab66', '#e2601c'], ['#f26a6a', '#b81f2a']];
  let defs =
    `<radialGradient id="r5_water" cx=".45" cy=".42" r=".62"><stop offset="0" stop-color="#143c44"/><stop offset=".55" stop-color="#22585c"/><stop offset=".88" stop-color="#3f8580"/><stop offset="1" stop-color="#7fb3a0"/></radialGradient>` +
    `<radialGradient id="r5_pad" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#7dbb52"/><stop offset=".6" stop-color="#4a8f38"/><stop offset="1" stop-color="#2c6a2a"/></radialGradient>` +
    `<linearGradient id="r5_stone" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#d6d1c4"/><stop offset=".5" stop-color="#b3aea1"/><stop offset="1" stop-color="#8a857a"/></linearGradient>` +
    `<linearGradient id="r5_rock" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#c2c0b8"/><stop offset=".55" stop-color="#8f8d86"/><stop offset="1" stop-color="#5d5b56"/></linearGradient>` +
    `<radialGradient id="r5_bush" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#5fa544"/><stop offset=".55" stop-color="#2f7030"/><stop offset="1" stop-color="#16431d"/></radialGradient>` +
    `<radialGradient id="r5_soil" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#2c4a22" stop-opacity=".55"/><stop offset="1" stop-color="#2c4a22" stop-opacity="0"/></radialGradient>`;
  fcols.forEach(([a, b], i) => { defs += `<radialGradient id="r5_f${i}" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="${b}"/><stop offset=".45" stop-color="${a}"/><stop offset="1" stop-color="${a}"/></radialGradient>`; });

  let s = `<rect width="1000" height="1000" fill="#5fae4f"/>`;
  // macchie morbide di luce/ombra nel prato
  for (let i = 0; i < 30; i++) {
    const x = r() * 1000, y = r() * 1000;
    s += `<ellipse cx="${f(x)}" cy="${f(y)}" rx="${f(40 + r() * 70)}" ry="${f(25 + r() * 45)}" fill="${r() < 0.5 ? '#2f7a30' : '#9bd66f'}" opacity="${f(0.05 + r() * 0.07)}" transform="rotate(${f(r() * 180)} ${f(x)} ${f(y)})"/>`;
  }
  // fili d'erba: pochi path con moltissimi segmenti
  for (const [col, w, op, n] of [['#2f7a2e', 1.6, .5, 380], ['#458f3a', 1.8, .55, 380], ['#7fc763', 1.5, .55, 350], ['#a9dc80', 1.1, .45, 200]]) {
    let d = '';
    for (let i = 0; i < n; i++) {
      const x = r() * 1000, y = r() * 1000, a = -1.9 + r() * 1.5 + (r() < 0.2 ? r() * 3 : 0), l = 5 + r() * 9, c = (r() - 0.5) * 5;
      d += `M${Math.round(x)} ${Math.round(y)}l${f(Math.cos(a) * l + c * 0)} ${f(Math.sin(a) * l)}`;
    }
    s += `<path d="${d}" stroke="${col}" stroke-width="${w}" stroke-linecap="round" fill="none" opacity="${op}"/>`;
  }
  { // trifogli e margheritine minuscole
    let d = '', dd = '', dc = '';
    for (let i = 0; i < 70; i++) { const x = r() * 1000, y = r() * 1000, q = 2.4; for (let k = 0; k < 3; k++) { const a = k / 3 * TAU + i; d += `M${f(x + Math.cos(a) * q)} ${f(y + Math.sin(a) * q)}h0`; } }
    for (let i = 0; i < 46; i++) { const x = r() * 1000, y = r() * 1000; if (!far(x, y, POND, 150) || !far(x, y, P, 95)) continue; for (let k = 0; k < 4; k++) { const a = k / 4 * Math.PI + i, cx = Math.cos(a) * 4.6, cy = Math.sin(a) * 4.6; dd += `M${f(x - cx)} ${f(y - cy)}l${f(2 * cx)} ${f(2 * cy)}`; } dc += `M${f(x)} ${f(y)}h0`; }
    s += `<path d="${d}" stroke="#3d8a3a" stroke-width="4.6" stroke-linecap="round" fill="none" opacity=".75"/><path d="${dd}" stroke="#f7f7f2" stroke-width="1.7" stroke-linecap="round" fill="none"/><path d="${dc}" stroke="#f2c230" stroke-width="2.6" stroke-linecap="round" fill="none"/>`;
  }

  // ---- sentiero di pietre ----
  for (let t = 0.05; t < 0.96; t += 0.075) {
    const x = pathX(t), y = pathY(t), rot = r() * 3;
    const p = poly(x, y, 25, 18, 0.28, 8, rot), d = 'M' + p.map(q => f(q[0]) + ' ' + f(q[1])).join('L') + 'Z';
    s += `<ellipse cx="${f(x)}" cy="${f(y)}" rx="38" ry="31" fill="url(#r5_soil)"/>`;
    s += `<path d="${d}" fill="#12260f" opacity=".45" stroke="#12260f" stroke-width="3" stroke-linejoin="round" transform="translate(3 4.5)"/>`;
    s += `<path d="${d}" fill="url(#r5_stone)" stroke="#7d786c" stroke-width="2.5" stroke-linejoin="round"/>`;
    let sp = '', cr = `M${f(p[1][0])} ${f(p[1][1])}Q${f(x + r() * 8 - 4)} ${f(y + r() * 8 - 4)} ${f((p[5][0] + x) / 2)} ${f((p[5][1] + y) / 2)}`;
    for (let k = 0; k < 9; k++) { const a = r() * TAU, q = r() * 13; sp += `M${f(x + Math.cos(a) * q * 1.3)} ${f(y + Math.sin(a) * q)}h${f(0.8 + r() * 1.6)}`; }
    s += `<path d="${sp}" stroke="#5f5a50" stroke-width="1.3" stroke-linecap="round" opacity=".45" fill="none"/><path d="${cr}" stroke="#5f5a50" stroke-width=".8" opacity=".4" fill="none"/>`;
    s += `<path d="M${f(p[3][0])} ${f(p[3][1])}L${f(p[4][0])} ${f(p[4][1])}L${f(p[5][0])} ${f(p[5][1])}" stroke="#fff" stroke-width="1.2" opacity=".3" fill="none" stroke-linejoin="round"/>`;
    // ciuffi d'erba che invadono il bordo
    let g = '';
    for (let k = 0; k < 7; k++) { const a = r() * TAU, gx = x + Math.cos(a) * 27, gy = y + Math.sin(a) * 20; g += `M${f(gx)} ${f(gy)}l${f(-Math.cos(a) * 6 + r() * 3)} ${f(-Math.sin(a) * 6 - r() * 3)}`; }
    s += `<path d="${g}" stroke="#4c9a3f" stroke-width="1.8" stroke-linecap="round" fill="none"/>`;
  }

  // ---- laghetto ----
  {
    const R = a => 128 * (1 + 0.1 * Math.sin(3 * a + 1) + 0.07 * Math.sin(5 * a + 2.3));
    const outline = k => { const p = []; for (let i = 0; i < 22; i++) { const a = i / 22 * TAU; p.push([POND[0] + Math.cos(a) * (R(a) + k), POND[1] + Math.sin(a) * (R(a) + k)]); } return smooth(p); };
    s += `<path d="${outline(26)}" fill="#254d22" opacity=".3"/>`;
    s += `<path d="${outline(10)}" fill="#4a4534"/>`;
    s += `<path d="${outline(0)}" fill="url(#r5_water)"/>`;
    s += `<path d="${outline(-3)}" fill="none" stroke="#0c2a30" stroke-width="12" opacity=".28" transform="translate(4 6)"/>`;
    // riflessi del cielo e increspature
    s += `<ellipse cx="262" cy="282" rx="70" ry="30" fill="#cfe9f2" opacity=".1" transform="rotate(-28 262 282)"/><ellipse cx="246" cy="268" rx="34" ry="11" fill="#fff" opacity=".13" transform="rotate(-28 246 268)"/>`;
    let w = '';
    for (let i = 0; i < 26; i++) { const a = r() * TAU, q = 20 + r() * 85, x = POND[0] + Math.cos(a) * q, y = POND[1] + Math.sin(a) * q; w += `M${f(x)} ${f(y)}q${f(5 + r() * 6)} ${f(-2 - r() * 2)} ${f(12 + r() * 12)} 0`; }
    s += `<path d="${w}" stroke="#d6f0ee" stroke-width="1" fill="none" opacity=".3"/>`;
    s += `<circle cx="345" cy="285" r="10" fill="none" stroke="#e6f6f4" stroke-width="1.2" opacity="0"><animate attributeName="r" values="4;34" dur="6s" repeatCount="indefinite"/><animate attributeName="opacity" values=".5;0" dur="6s" repeatCount="indefinite"/></circle>`;
    s += `<circle cx="300" cy="326" r="30" fill="none" stroke="#e6f6f4" stroke-width="1.2" opacity="0"><animate attributeName="r" values="27;62" dur="7s" begin="-3s" repeatCount="indefinite"/><animate attributeName="opacity" values=".45;0" dur="7s" begin="-3s" repeatCount="indefinite"/></circle>`;
    // pietre del bordo
    let a = 0;
    while (a < TAU - 0.12) {
      const sz = 12 + r() * 9, rad = R(a) + 6 + r() * 5, x = POND[0] + Math.cos(a) * rad, y = POND[1] + Math.sin(a) * rad;
      const p = poly(x, y, sz, sz * (0.7 + r() * 0.2), 0.3, 7, a + Math.PI / 2), d = smooth(p);
      s += `<path d="${d}" fill="#0f200e" opacity=".42" transform="translate(3.5 4.5)"/><path d="${d}" fill="url(#r5_rock)"/><ellipse cx="${f(x - sz * 0.25)}" cy="${f(y - sz * 0.22)}" rx="${f(sz * 0.38)}" ry="${f(sz * 0.2)}" fill="#fff" opacity=".22" transform="rotate(${f(a * 57.3 + 90)} ${f(x)} ${f(y)})"/>`;
      a += (sz * 1.75) / rad;
    }
    // ninfee
    [[300, 330, 26, 0.4], [240, 270, 19, 2.1], [362, 382, 17, 4.0], [250, 392, 15, 5.2], [352, 262, 13, 1.2]].forEach(([x, y, rr, a0]) => {
      const a1 = a0 + 0.42, d = `M${x} ${y}L${f(x + Math.cos(a0) * rr)} ${f(y + Math.sin(a0) * rr)}A${rr} ${rr} 0 1 0 ${f(x + Math.cos(a1) * rr)} ${f(y + Math.sin(a1) * rr)}Z`;
      let v = '';
      for (let k = 1; k < 9; k++) { const b = a1 + k / 9 * (TAU - 0.42); v += `M${x} ${y}L${f(x + Math.cos(b) * rr * 0.9)} ${f(y + Math.sin(b) * rr * 0.9)}`; }
      s += `<path d="${d}" fill="#06181c" opacity=".4" transform="translate(4 6)"/><path d="${d}" fill="url(#r5_pad)" stroke="#2a5f27" stroke-width="1"/><path d="${v}" stroke="#a5d67c" stroke-width=".7" opacity=".45" fill="none"/>`;
    });
    // fiore di ninfea
    { let d1 = '', d2 = ''; for (let k = 0; k < 9; k++) { const b = k / 9 * TAU; d1 += ell(250 + Math.cos(b) * 5.5, 262 + Math.sin(b) * 5.5, b, 6, 2.6); d2 += ell(250 + Math.cos(b + .35) * 3, 262 + Math.sin(b + .35) * 3, b + .35, 3.6, 1.8); }
      s += `<circle cx="252" cy="265" r="10" fill="#06181c" opacity=".3"/><path d="${d1}" fill="#f6c6d8"/><path d="${d2}" fill="#fff3f7"/><circle cx="250" cy="262" r="2.4" fill="#f0b429"/>`; }
    // canne/erbe sul bordo
    let rd = '';
    for (let i = 0; i < 26; i++) { const b = 2.4 + r() * 1.5, rad = R(b) - 4 + r() * 16, x = POND[0] + Math.cos(b) * rad, y = POND[1] + Math.sin(b) * rad; rd += `M${f(x)} ${f(y)}q${f(-3 + r() * 4)} ${f(-9)} ${f(-8 + r() * 12)} ${f(-16 - r() * 10)}`; }
    s += `<path d="${rd}" stroke="#2f6b2a" stroke-width="2.2" stroke-linecap="round" fill="none"/><path d="${rd}" stroke="#7fb85a" stroke-width=".8" stroke-linecap="round" fill="none" transform="translate(-.8 -.3)"/>`;
  }

  // ---- sassolini e foglie cadute ----
  for (let i = 0; i < 14; i++) {
    const x = 120 + r() * 760, y = 120 + r() * 760;
    if (!far(x, y, POND, 170) || !far(x, y, P, 100)) continue;
    const q = 3 + r() * 4;
    s += `<ellipse cx="${f(x + 1.5)}" cy="${f(y + 2)}" rx="${f(q)}" ry="${f(q * 0.75)}" fill="#10250f" opacity=".4"/><ellipse cx="${f(x)}" cy="${f(y)}" rx="${f(q)}" ry="${f(q * 0.75)}" fill="url(#r5_rock)" transform="rotate(${f(r() * 180)} ${f(x)} ${f(y)})"/>`;
  }

  // ---- fiori ----
  let nf = 0, sw = 0;
  for (let i = 0; i < 400 && nf < 34; i++) {
    const x = 60 + r() * 880, y = 60 + r() * 880;
    if (!far(x, y, POND, 175) || !far(x, y, P, 118) || nearPath(x, y, 52) || !far(x, y, [830, 830], 150) || !far(x, y, [760, 290], 40) || !far(x, y, [240, 720], 40)) continue;
    const ci = Math.floor(r() * fcols.length), p = 8 + r() * 6, n = ci === 2 ? 12 : (r() < 0.5 ? 5 : 8), a0 = r() * TAU;
    let lv = '', pe = '', pe2 = '';
    for (let k = 0; k < 2; k++) { const a = a0 + k * 2.6 + r() * 0.5; lv += ell(x + Math.cos(a) * p * 1.25, y + Math.sin(a) * p * 1.25, a, p * 0.9, p * 0.36); }
    const pw = n === 12 ? p * 0.2 : n === 8 ? p * 0.32 : p * 0.5;
    for (let k = 0; k < n; k++) { const a = a0 + k / n * TAU; pe += ell(x + Math.cos(a) * p * 0.62, y + Math.sin(a) * p * 0.62, a, p * 0.55, pw); if (n === 5) { const b = a + Math.PI / n; pe2 += ell(x + Math.cos(b) * p * 0.36, y + Math.sin(b) * p * 0.36, b, p * 0.36, pw * 0.7); } }
    const core = ci === 1 ? '#6b3a16' : '#f0b429';
    let fl = `<circle cx="${f(x + p * 0.35)}" cy="${f(y + p * 0.5)}" r="${f(p * 1.15)}" fill="#0f260f" opacity=".3"/><path d="${lv}" fill="#2f7a2f" stroke="#1f5a22" stroke-width=".6"/><path d="${pe}" fill="url(#r5_f${ci})" stroke="${fcols[ci][1]}" stroke-width=".4" stroke-opacity=".5"/>`;
    if (pe2) fl += `<path d="${pe2}" fill="${fcols[ci][0]}" opacity=".85"/>`;
    fl += `<circle cx="${f(x)}" cy="${f(y)}" r="${f(p * 0.3)}" fill="${core}"/><circle cx="${f(x - p * 0.08)}" cy="${f(y - p * 0.08)}" r="${f(p * 0.14)}" fill="#fff2b0" opacity=".6"/>`;
    if (sw < 6 && nf % 5 === 0) { const d = f(5 + r() * 4); fl = `<g>${fl}<animateTransform attributeName="transform" type="translate" values="0 0;1.5 .8;0 0;-1.2 -.5;0 0" dur="${d}s" repeatCount="indefinite"/></g>`; sw++; }
    s += fl; nf++;
  }

  // ---- cespuglio ----
  s += `<path d="${blob(848, 850, 140, 0.25, 12)}" fill="#0f260f" opacity=".35"/><path d="${blob(830, 830, 132, 0.25, 12)}" fill="#1f5524"/>`;
  for (let i = 0; i < 30; i++) {
    const k = i / 30, a = r() * TAU, q = (1 - k) * 110 * Math.sqrt(r()) + 6, x = 826 - k * 14 + Math.cos(a) * q, y = 826 - k * 14 + Math.sin(a) * q;
    s += `<path d="${blob(x, y, 20 + r() * 16, 0.4, 7)}" fill="url(#r5_bush)" opacity="${f(0.75 + k * 0.25)}"/>`;
  }

  // ---- foglia-portale ----
  {
    const leaf = `M-112 0C-96 -52 -40 -70 6 -68C62 -66 96 -34 104 0C96 34 62 66 6 68C-40 70 -96 52 -112 0Z`;
    let v = '';
    // nervature solo fuori dal cerchio del portale
    for (const sg of [-1, 1]) for (const [x0, dx] of [[-84, 22], [-60, 26], [64, 20], [82, 12]]) { const y1 = sg * Math.sqrt(Math.max(0, 1 - Math.pow((x0 + dx) / 108, 2))) * 60; if (Math.hypot(x0 + dx, y1) > 56) v += `M${x0} 0Q${x0 + dx * 0.5} ${f(y1 * 0.35)} ${x0 + dx} ${f(y1)}`; }
    s += `<g transform="translate(660 620) rotate(-30)"><path d="${leaf}" fill="#0c220d" opacity=".4" transform="translate(12 10)"/><path d="M-106 0Q-128 2 -150 12" stroke="#5d7a2f" stroke-width="6" stroke-linecap="round" fill="none"/><path d="${leaf}" fill="#3f8f35"/><path d="${leaf}" fill="none" stroke="#2c6a28" stroke-width="3"/><path d="M-110 0H-54M54 0H102" stroke="#6fb357" stroke-width="3" stroke-linecap="round"/><path d="${v}" stroke="#63a84e" stroke-width="1.6" fill="none" stroke-linecap="round" opacity=".8"/><path d="M-100 -24C-80 -54 -40 -64 0 -64" stroke="#8fd070" stroke-width="2" fill="none" opacity=".5"/></g>`;
  }
  return { defs, svg: s };
})();
