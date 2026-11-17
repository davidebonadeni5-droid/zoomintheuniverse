// mondo 18: buco nero — versione realistica (disco di accrescimento, anello di fotoni, lente gravitazionale)
REAL[18] = (() => {
  let sd = 18181;
  const r = () => { sd = (sd * 1664525 + 1013904223) >>> 0; return sd / 4294967296; };
  const f = n => Math.round(n * 10) / 10;
  const TAU = Math.PI * 2, BG = '#06041a', PC = '#070316', K = 0.4;
  const items = [[250, 330], [730, 660], [700, 300]];
  let defs = '', s = '';
  const lg = (id, a, b, c) => `<linearGradient id="${id}" gradientUnits="userSpaceOnUse" x1="150" y1="0" x2="850" y2="0"><stop offset="0" stop-color="${a}"/><stop offset=".45" stop-color="${b}"/><stop offset="1" stop-color="${c}"/></linearGradient>`;
  defs +=
    `<radialGradient id="r18_glow" gradientUnits="userSpaceOnUse" cx="500" cy="500" r="345"><stop offset=".3" stop-color="#ff8f3a" stop-opacity=".34"/><stop offset=".6" stop-color="#e0561a" stop-opacity=".12"/><stop offset=".85" stop-color="#7a2a3a" stop-opacity=".03"/><stop offset="1" stop-color="#7a2a3a" stop-opacity="0"/></radialGradient>` +
    `<radialGradient id="r18_halo" gradientUnits="userSpaceOnUse" cx="500" cy="500" r="220"><stop offset=".53" stop-color="#fffaf0"/><stop offset=".58" stop-color="#ffe7a8" stop-opacity=".97"/><stop offset=".66" stop-color="#ffb04a" stop-opacity=".8"/><stop offset=".78" stop-color="#e2601a" stop-opacity=".42"/><stop offset=".9" stop-color="#a6340c" stop-opacity=".14"/><stop offset="1" stop-color="#a6340c" stop-opacity="0"/></radialGradient>` +
    `<linearGradient id="r18_dop" gradientUnits="userSpaceOnUse" x1="170" y1="0" x2="840" y2="0"><stop offset="0" stop-color="${BG}" stop-opacity="0"/><stop offset=".45" stop-color="${BG}" stop-opacity=".08"/><stop offset="1" stop-color="${BG}" stop-opacity=".58"/></linearGradient>` +
    `<radialGradient id="r18_hot" gradientUnits="userSpaceOnUse" cx="330" cy="545" r="230"><stop offset="0" stop-color="#fff" stop-opacity=".5"/><stop offset=".5" stop-color="#ffe9b8" stop-opacity=".16"/><stop offset="1" stop-color="#ffe9b8" stop-opacity="0"/></radialGradient>` +
    `<radialGradient id="r18_sh" gradientUnits="userSpaceOnUse" cx="500" cy="500" r="124"><stop offset="0" stop-color="${PC}"/><stop offset=".62" stop-color="${PC}"/><stop offset="1" stop-color="#020109"/></radialGradient>` +
    `<radialGradient id="r18_star" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#fff" stop-opacity=".95"/><stop offset=".2" stop-color="#cfdcff" stop-opacity=".4"/><stop offset="1" stop-color="#cfdcff" stop-opacity="0"/></radialGradient>` +
    `<radialGradient id="r18_neb" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#3a2a7a" stop-opacity=".16"/><stop offset="1" stop-color="#3a2a7a" stop-opacity="0"/></radialGradient>` +
    lg('r18_d0', '#ffffff', '#fff3cf', '#ffd791') + lg('r18_d1', '#fff1c0', '#ffd27a', '#f5a03c') + lg('r18_d2', '#ffc860', '#ff9a30', '#d8641a') +
    lg('r18_d3', '#f58a2a', '#d85a14', '#9a360c') + lg('r18_d4', '#b84a12', '#8a300a', '#521a08') +
    `<clipPath id="r18_front"><rect x="0" y="500" width="1000" height="500"/></clipPath>` +
    `<clipPath id="r18_back"><rect x="0" y="0" width="1000" height="500.4"/></clipPath>` +
    `<radialGradient id="r18_dim" gradientUnits="userSpaceOnUse" cx="660" cy="500" r="180"><stop offset="0" stop-color="${BG}" stop-opacity=".5"/><stop offset=".5" stop-color="${BG}" stop-opacity=".28"/><stop offset="1" stop-color="${BG}" stop-opacity="0"/></radialGradient>`;

  // --- cielo ---
  s += `<rect width="1000" height="1000" fill="${BG}"/>`;
  s += `<ellipse cx="240" cy="700" rx="230" ry="150" fill="url(#r18_neb)" transform="rotate(-30 240 700)"/><ellipse cx="760" cy="250" rx="210" ry="130" fill="url(#r18_neb)" transform="rotate(-20 760 250)"/>`;
  const cols = ['#ffffff', '#ffffff', '#dfe7ff', '#bcd0ff', '#fff0d8', '#ffd9b0'];
  for (let i = 0; i < 150; i++) {
    const x = r() * 1000, y = r() * 1000, d = Math.hypot(x - 500, y - 500), rr = 0.5 + r() * r() * 1.5;
    if (d < 215 || ((x - 500) / 350) ** 2 + ((y - 500) / 145) ** 2 < 1) continue;
    if (items.some(([ix, iy]) => Math.hypot(x - ix, y - iy) < 34)) continue;
    s += `<circle cx="${f(x)}" cy="${f(y)}" r="${f(rr)}" fill="${cols[(r() * cols.length) | 0]}" opacity="${f(0.35 + r() * 0.6)}"/>`;
  }
  [[150, 190, 9], [830, 470, 7], [860, 800, 10], [390, 850, 8], [120, 560, 7], [560, 120, 8]].forEach(([x, y, q]) =>
    s += `<circle cx="${x}" cy="${y}" r="${q}" fill="url(#r18_star)"/>`);
  // stelle deformate ad arco dalla lente gravitazionale
  for (let i = 0; i < 9; i++) {
    const a = -2.9 + i * 0.33 + r() * 0.15, R = 226 + r() * 30, da = 0.04 + r() * 0.07;
    if (Math.abs(Math.sin(a)) < 0.62) continue;
    s += `<path d="M${f(500 + Math.cos(a) * R)} ${f(500 + Math.sin(a) * R)}A${f(R)} ${f(R)} 0 0 1 ${f(500 + Math.cos(a + da) * R)} ${f(500 + Math.sin(a + da) * R)}" stroke="#dfe6ff" stroke-width="${f(0.9 + r() * 0.9)}" fill="none" opacity="${f(0.35 + r() * 0.4)}" stroke-linecap="round"/>`;
  }
  s += `<circle cx="500" cy="500" r="345" fill="url(#r18_glow)"/>`;

  // --- disco di accrescimento (ellissi concentriche + striature) ---
  let dk = '';
  const N = 34, RX0 = 173, RX1 = 338;
  for (let i = 0; i < N; i++) {
    const t = i / (N - 1), rx = RX0 + (RX1 - RX0) * t;
    dk += `<ellipse cx="500" cy="500" rx="${f(rx)}" ry="${f(rx * K)}" fill="none" stroke="url(#r18_d${Math.min(4, (t * 5) | 0)})" stroke-width="6.6" opacity="${f(1 - Math.pow(t, 1.7) * 0.93)}"/>`;
  }
  let an = 0;
  for (let i = 0; i < 30; i++) {
    const t = Math.pow(r(), 0.8), rx = RX0 + 2 + (RX1 - RX0 - 20) * t, bright = r() < 0.55;
    const per = TAU * rx * 0.74, anim = an < 4 && i % 7 === 3;
    dk += `<ellipse cx="500" cy="500" rx="${f(rx)}" ry="${f(rx * K)}" fill="none" stroke="${bright ? '#fff8e2' : '#3c1004'}" stroke-width="${f(bright ? 0.6 + r() * 1.1 : 0.8 + r() * 1.6)}" opacity="${f((bright ? 0.3 : 0.24) * (1 - t * 0.6))}" stroke-dasharray="${f(30 + r() * 160)} ${f(20 + r() * 120)} ${f(10 + r() * 60)} ${f(30 + r() * 150)}" stroke-dashoffset="${f(r() * 400)}">` +
      (anim ? `<animate attributeName="stroke-dashoffset" from="0" to="${f(per)}" dur="${f(50 + t * 60)}s" repeatCount="indefinite"/>` : '') + `</ellipse>`;
    if (anim) an++;
  }
  const ann = `M${500 - RX1 - 8} 500a${RX1 + 8} ${f((RX1 + 8) * K)} 0 1 0 ${2 * (RX1 + 8)} 0a${RX1 + 8} ${f((RX1 + 8) * K)} 0 1 0 ${-2 * (RX1 + 8)} 0ZM${500 - RX0 + 3} 500a${RX0 - 3} ${f((RX0 - 3) * K)} 0 1 0 ${2 * (RX0 - 3)} 0a${RX0 - 3} ${f((RX0 - 3) * K)} 0 1 0 ${-2 * (RX0 - 3)} 0Z`;
  dk += `<path d="${ann}" fill-rule="evenodd" fill="url(#r18_dop)"/><path d="${ann}" fill-rule="evenodd" fill="url(#r18_hot)"/>`;
  // bordo interno incandescente
  dk += `<ellipse cx="500" cy="500" rx="${RX0 - 2}" ry="${f((RX0 - 2) * K)}" fill="none" stroke="#fffdf4" stroke-width="1.6" opacity=".8"/>`;
  s += `<g clip-path="url(#r18_back)">${dk.replace(/<animate [^>]*\/>/g, '')}</g>`;

  // --- alone: retro del disco piegato dalla gravità sopra e sotto l'ombra ---
  s += `<circle cx="500" cy="500" r="220" fill="url(#r18_halo)"/>`;
  for (let i = 0; i < 22; i++) {
    const R = 128 + Math.pow(r(), 1.4) * 70, bright = r() < 0.5;
    s += `<circle cx="500" cy="500" r="${f(R)}" fill="none" stroke="${bright ? '#fff6dc' : '#5a1a06'}" stroke-width="${f(0.6 + r() * 1.4)}" opacity="${f((bright ? 0.28 : 0.2) * (1 - (R - 128) / 90))}" stroke-dasharray="${f(20 + r() * 110)} ${f(20 + r() * 90)} ${f(8 + r() * 50)} ${f(20 + r() * 110)}" transform="rotate(${f(r() * 360)} 500 500)"/>`;
  }
  s += `<circle cx="660" cy="500" r="180" fill="url(#r18_dim)"/>`;
  // --- ombra + anello di fotoni ---
  s += `<circle cx="500" cy="500" r="123" fill="url(#r18_sh)"/>`;
  s += `<circle cx="500" cy="500" r="125" fill="none" stroke="#ffcf7a" stroke-width="7" opacity=".28"/>`;
  s += `<circle cx="500" cy="500" r="124.5" fill="none" stroke="#fffaf0" stroke-width="2.4"><animate attributeName="stroke-opacity" values=".95;.65;.95" dur="6s" repeatCount="indefinite"/></circle>`;
  s += `<circle cx="500" cy="500" r="117" fill="none" stroke="#ffe2a6" stroke-width=".9" opacity=".4"/>`;
  s += `<path d="M383 462A123 123 0 0 1 470 380" stroke="#fff" stroke-width="3.4" fill="none" opacity=".55" stroke-linecap="round"/>`;
  // --- metà anteriore del disco, davanti all'ombra ---
  s += `<g clip-path="url(#r18_front)">${dk}</g>`;
  return { defs, svg: s };
})();
