// mondo 4: Città vista dall'alto — versione realistica
REAL[4] = (() => {
  let seed = 4044;
  const r = () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; };
  const f = n => +n.toFixed(1), TAU = Math.PI * 2;
  const pick = a => a[Math.floor(r() * a.length)];
  const far = (x, y, c, d) => Math.hypot(x - c[0], y - c[1]) > d;
  const shade = (hex, k) => { // k<0 scurisce, k>0 schiarisce
    const n = parseInt(hex.slice(1), 16), t = k < 0 ? 0 : 255, a = Math.abs(k);
    const c = [n >> 16, (n >> 8) & 255, n & 255].map(v => Math.round(v + (t - v) * a));
    return '#' + c.map(v => v.toString(16).padStart(2, '0')).join('');
  };
  const blob = (cx, cy, rad, irr, n = 9) => {
    const p = [], ph = r() * TAU;
    for (let i = 0; i < n; i++) { const a = ph + i / n * TAU, rr = rad * (1 - irr / 2 + r() * irr); p.push([cx + Math.cos(a) * rr, cy + Math.sin(a) * rr]); }
    let d = `M${f((p[0][0] + p[n - 1][0]) / 2)} ${f((p[0][1] + p[n - 1][1]) / 2)}`;
    for (let i = 0; i < n; i++) { const q = p[i], m = p[(i + 1) % n]; d += `Q${f(q[0])} ${f(q[1])} ${f((q[0] + m[0]) / 2)} ${f((q[1] + m[1]) / 2)}`; }
    return d + 'Z';
  };
  const P1 = [250, 520], P2 = [600, 395], POND = [760, 580];
  const defs =
    `<radialGradient id="r4_tree" cx=".36" cy=".32" r=".75"><stop offset="0" stop-color="#6fae4e"/><stop offset=".45" stop-color="#3f7f35"/><stop offset="1" stop-color="#1f4d22"/></radialGradient>` +
    `<radialGradient id="r4_tree2" cx=".36" cy=".32" r=".75"><stop offset="0" stop-color="#86b85a"/><stop offset=".5" stop-color="#4f8f3c"/><stop offset="1" stop-color="#2a5a26"/></radialGradient>` +
    `<radialGradient id="r4_pond" cx=".42" cy=".4" r=".7"><stop offset="0" stop-color="#255a73"/><stop offset=".7" stop-color="#3b7f96"/><stop offset="1" stop-color="#6fa9a8"/></radialGradient>` +
    `<radialGradient id="r4_p2" gradientUnits="userSpaceOnUse" cx="600" cy="395" r="92"><stop offset="0" stop-color="#5aa64c"/><stop offset=".72" stop-color="#5aa64c"/><stop offset="1" stop-color="#5aa64c" stop-opacity="0"/></radialGradient>` +
    `<linearGradient id="r4_rh" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#63666a"/><stop offset=".5" stop-color="#585b5f"/><stop offset="1" stop-color="#5f6266"/></linearGradient>` +
    `<linearGradient id="r4_rv" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#63666a"/><stop offset=".5" stop-color="#585b5f"/><stop offset="1" stop-color="#5f6266"/></linearGradient>`;

  let s = `<rect width="1000" height="1000" fill="#6dbb5c"/>`;
  // variazioni del prato (macchie morbide)
  for (let i = 0; i < 34; i++) {
    const x = r() * 1000, y = r() * 1000;
    s += `<ellipse cx="${f(x)}" cy="${f(y)}" rx="${f(30 + r() * 60)}" ry="${f(20 + r() * 40)}" fill="${r() < 0.5 ? '#3f8a3a' : '#a8d77a'}" opacity="${f(0.05 + r() * 0.06)}" transform="rotate(${f(r() * 180)} ${f(x)} ${f(y)})"/>`;
  }
  // grana fine del prato: un solo path per tono
  for (const [col, op] of [['#4f9c45', .35], ['#8fd07a', .3]]) {
    let d = '';
    for (let i = 0; i < 420; i++) { const x = r() * 1000, y = r() * 1000; d += `M${f(x)} ${f(y)}h${f(1 + r() * 3)}`; }
    s += `<path d="${d}" stroke="${col}" stroke-width="2" stroke-linecap="round" opacity="${op}" fill="none"/>`;
  }
  // zona portale 2 (prato del parco)
  s += `<circle cx="600" cy="395" r="92" fill="url(#r4_p2)"/>`;

  // ---- strade ----
  s += `<path d="M0 300H1000M0 770H1000M480 0V1000" stroke="#aeaba0" stroke-width="62" fill="none"/>`;
  s += `<path d="M0 300H1000M0 770H1000M480 0V1000" stroke="#8d8a80" stroke-width="53" fill="none"/>`;
  s += `<rect x="0" y="275" width="1000" height="50" fill="url(#r4_rh)"/><rect x="0" y="745" width="1000" height="50" fill="url(#r4_rh)"/><rect x="455" y="0" width="50" height="1000" fill="url(#r4_rv)"/>`;
  s += `<rect x="455" y="275" width="50" height="50" fill="#5b5e62"/><rect x="455" y="745" width="50" height="50" fill="#5b5e62"/>`;
  { // rappezzi e usura dell'asfalto
    let d = '', d2 = '';
    for (let i = 0; i < 46; i++) {
      const hz = r() < 0.66, t = r() * 1000, o = (r() - 0.5) * 40, w = 8 + r() * 30, h = 3 + r() * 7;
      const base = hz ? (r() < 0.5 ? 300 : 770) : 480;
      const q = hz ? `M${f(t)} ${f(base + o)}h${f(w)}v${f(h)}h${f(-w)}Z` : `M${f(base + o)} ${f(t)}v${f(w)}h${f(h)}v${f(-w)}Z`;
      if (i % 2) d += q; else d2 += q;
    }
    s += `<path d="${d}" fill="#3f4246" opacity=".22"/><path d="${d2}" fill="#8a8d90" opacity=".16"/>`;
  }
  // segnaletica
  s += `<path d="M0 300H449M511 300H1000M0 770H449M511 770H1000M480 0V269M480 331V739M480 801V1000" stroke="#e9e4cf" stroke-width="1.6" stroke-dasharray="12 10" opacity=".8" fill="none"/>`;
  s += `<path d="M0 277.500H1000M0 322.500H1000M0 747.500H1000M0 792.500H1000M457.5 0V1000M502.5 0V1000" stroke="#e8e6dc" stroke-width="1" opacity=".35" fill="none"/>`;
  s += `<path d="M447 278V322M513 278V322M447 748V792M513 748V792" stroke="#eeeae0" stroke-width="7" stroke-dasharray="3.5 3.5" opacity=".75" fill="none"/>`;
  s += `<path d="M458 267H502M458 333H502M458 737H502M458 803H502" stroke="#eeeae0" stroke-width="7" stroke-dasharray="3.5 3.5" opacity=".75" fill="none"/>`;

  // ---- parco (a destra) ----
  s += `<path d="M520 540C620 520 660 450 760 450S900 520 980 500" stroke="#a89a72" stroke-width="13" fill="none" opacity=".7"/>`;
  s += `<path d="M520 540C620 520 660 450 760 450S900 520 980 500" stroke="#d9cba3" stroke-width="9" fill="none"/>`;
  s += `<path d="M520 540C620 520 660 450 760 450S900 520 980 500" stroke="#efe5c4" stroke-width="3" fill="none" opacity=".5" stroke-dasharray="14 9"/>`;
  { // laghetto
    const d = blob(POND[0], POND[1], 82, 0.3, 10);
    s += `<g transform="translate(760 580) scale(1.18 .78) translate(-760 -580)"><path d="${d}" fill="#7c8a55" transform="translate(760 580) scale(1.09) translate(-760 -580)" opacity=".8"/><path d="${d}" fill="#c9bf96" transform="translate(760 580) scale(1.045) translate(-760 -580)"/><path d="${d}" fill="url(#r4_pond)"/>`;
    s += `<path d="${d}" fill="none" stroke="#17384a" stroke-width="5" opacity=".3" transform="translate(2 3)"/></g>`;
    s += `<ellipse cx="735" cy="562" rx="48" ry="20" fill="#fff" opacity=".1" transform="rotate(-18 735 562)"/><ellipse cx="724" cy="556" rx="20" ry="7" fill="#fff" opacity=".16" transform="rotate(-18 724 556)"/>`;
    let w = '';
    for (let i = 0; i < 16; i++) { const x = 700 + r() * 120, y = 555 + r() * 55; w += `M${f(x)} ${f(y)}q${f(4 + r() * 5)} -1.5 ${f(9 + r() * 9)} 0`; }
    s += `<path d="${w}" stroke="#d8eef2" stroke-width=".8" fill="none" opacity=".4"/>`;
  }

  // ---- orto/giardino-portale ----
  s += `<rect x="184" y="454" width="140" height="140" rx="5" fill="#000" opacity=".22"/>`;
  s += `<rect x="180" y="450" width="140" height="140" rx="5" fill="#5fae4f"/>`;
  s += `<rect x="180" y="450" width="140" height="140" rx="5" fill="none" stroke="#2f6a2c" stroke-width="7"/>`;
  s += `<rect x="180" y="450" width="140" height="140" rx="5" fill="none" stroke="#5c9a44" stroke-width="3" stroke-dasharray="5 4" opacity=".8"/>`;
  s += `<path d="M179 449H321" stroke="#8cc46a" stroke-width="1.5" opacity=".7"/>`;

  // ---- case ----
  const occ = [[176, 446, 148, 148]];
  const roofs = ['#b5593c', '#a14b31', '#6f7780', '#8a6248', '#5c6268', '#bf8456', '#9c4a3a', '#7d7468'];
  let lots = '', houses = '', drives = '';
  function house(x, y, w, h) {
    const c = pick(roofs), hz = w >= h, k = Math.min(w, h) / 2 * 0.92;
    const x1 = x + w, y1 = y + h;
    let o = `<path d="M${f(x)} ${f(y1)}L${f(x1)} ${f(y)}L${f(x1 + 9)} ${f(y + 10)}L${f(x1 + 9)} ${f(y1 + 10)}L${f(x + 9)} ${f(y1 + 10)}Z" fill="#0b1a0c" opacity=".38"/>`;
    o += `<rect x="${f(x - 1.5)}" y="${f(y - 1.5)}" width="${f(w + 3)}" height="${f(h + 3)}" fill="${shade(c, -0.45)}"/>`;
    let ax, ay, bx, by;
    if (hz) { ax = x + k; bx = x1 - k; ay = by = y + h / 2; } else { ax = bx = x + w / 2; ay = y + k; by = y1 - k; }
    const N = hz ? `M${f(x)} ${f(y)}L${f(x1)} ${f(y)}L${f(bx)} ${f(by)}L${f(ax)} ${f(ay)}Z` : `M${f(x)} ${f(y)}L${f(x1)} ${f(y)}L${f(ax)} ${f(ay)}Z`;
    const S = hz ? `M${f(x)} ${f(y1)}L${f(x1)} ${f(y1)}L${f(bx)} ${f(by)}L${f(ax)} ${f(ay)}Z` : `M${f(x)} ${f(y1)}L${f(x1)} ${f(y1)}L${f(bx)} ${f(by)}Z`;
    const W = hz ? `M${f(x)} ${f(y)}L${f(ax)} ${f(ay)}L${f(x)} ${f(y1)}Z` : `M${f(x)} ${f(y)}L${f(ax)} ${f(ay)}L${f(bx)} ${f(by)}L${f(x)} ${f(y1)}Z`;
    const E = hz ? `M${f(x1)} ${f(y)}L${f(bx)} ${f(by)}L${f(x1)} ${f(y1)}Z` : `M${f(x1)} ${f(y)}L${f(ax)} ${f(ay)}L${f(bx)} ${f(by)}L${f(x1)} ${f(y1)}Z`;
    o += `<path d="${N}" fill="${shade(c, 0.1)}"/><path d="${W}" fill="${shade(c, 0.22)}"/><path d="${S}" fill="${shade(c, -0.2)}"/><path d="${E}" fill="${shade(c, -0.32)}"/>`;
    // file di tegole
    let t = '';
    if (hz) for (let q = 4; q < h / 2 - 1; q += 4) { const e = q / (h / 2) * k; t += `M${f(x + e)} ${f(y + q)}H${f(x1 - e)}M${f(x + e)} ${f(y1 - q)}H${f(x1 - e)}`; }
    else for (let q = 4; q < w / 2 - 1; q += 4) { const e = q / (w / 2) * k; t += `M${f(x + q)} ${f(y + e)}V${f(y1 - e)}M${f(x1 - q)} ${f(y + e)}V${f(y1 - e)}`; }
    o += `<path d="${t}" stroke="#000" stroke-width=".7" opacity=".16" fill="none"/>`;
    o += `<path d="M${f(x)} ${f(y)}L${f(ax)} ${f(ay)}L${f(bx)} ${f(by)}" stroke="${shade(c, 0.45)}" stroke-width="1.1" fill="none" opacity=".8"/>`;
    if (r() < 0.65) { const cx = x + w * (0.6 + r() * 0.15), cy = y + h * (0.2 + r() * 0.1); o += `<path d="M${f(cx)} ${f(cy + 6)}l6 0l7 7l-6 0Z" fill="#000" opacity=".3"/><rect x="${f(cx)}" y="${f(cy)}" width="6" height="6" fill="#8b6a58"/><rect x="${f(cx + 1.5)}" y="${f(cy + 1.5)}" width="3" height="3" fill="#2a2320"/>`; }
    return o;
  }
  const hl = [];
  const addHouse = (x, y, w, h) => {
    houses += house(x, y, w, h); occ.push([x, y, w, h]); hl.push([x, y, w, h]);
    lots += `M${f(x - 12)} ${f(y - 14)}h${f(w + 26)}v${f(h + 28)}h${f(-w - 26)}Z`;
  };
  addHouse(300, 175, 74, 56); // casa del gatto
  const blocks = [[0, 0, 455, 272, 272], [505, 0, 1000, 272, 272], [0, 328, 455, 742, 328], [0, 798, 455, 1000, 798], [505, 798, 1000, 1000, 798]];
  for (const [x0, y0, x1, y1, road] of blocks) {
    for (let x = x0 + 18; x < x1 - 70; x += 96) for (let y = y0 + 22; y < y1 - 60; y += 92) {
      if (r() < 0.1) continue;
      const w = 50 + r() * 24, h = 40 + r() * 22, hx = x + r() * 10, hy = y + r() * 10;
      if (far(hx + w / 2, hy + h / 2, [500, 500], 500)) continue;
      if (occ.some(([ox, oy, ow, oh]) => hx < ox + ow + 10 && hx + w + 10 > ox && hy < oy + oh + 10 && hy + h + 10 > oy)) continue;
      // vialetto verso la strada più vicina, se adiacente
      if (Math.abs(hy + h - 272) < 40 && road === 272) drives += `M${f(hx + 8)} ${f(hy + h)}h11V269h-11Z`;
      else if (Math.abs(hy - road) < 40 && road !== 272) drives += `M${f(hx + 8)} ${f(hy)}h11V${road + 3}h-11Z`;
      addHouse(hx, hy, w, h);
    }
  }
  s += `<path d="${lots}" fill="#7cc566" opacity=".28" stroke="#3f7f38" stroke-width="1.6" stroke-opacity=".7"/>`;
  s += `<path d="${drives}" fill="#b9b5a8"/>`;
  s += houses;

  // ---- alberi ----
  const tree = (x, y, rr) => `<ellipse cx="${f(x + rr * 0.45)}" cy="${f(y + rr * 0.5)}" rx="${f(rr * 1.02)}" ry="${f(rr * 0.92)}" fill="#0b1f0d" opacity=".34"/><path d="${blob(x, y, rr, 0.32, 9)}" fill="url(#${r() < 0.6 ? 'r4_tree' : 'r4_tree2'})"/><path d="${blob(x - rr * 0.28, y - rr * 0.3, rr * 0.36, 0.5, 6)}" fill="#b5dc7a" opacity=".3"/>`;
  let nt = 0;
  for (let i = 0; i < 60 && nt < 24; i++) { // parco
    const x = 530 + r() * 440, y = 345 + r() * 380;
    if (!far(x, y, POND, 125) || !far(x, y, P2, 112) || !far(x, y, [700, 400], 30) || (y > 425 && y < 560 && Math.abs(y - (x < 760 ? 540 - (x - 520) * 0.375 : 450 + (x - 760) * 0.25)) < 34)) continue;
    s += tree(x, y, 13 + r() * 13); nt++;
  }
  nt = 0;
  for (let i = 0; i < 400 && nt < 46; i++) { // giardini delle case
    const x = r() * 1000, y = r() * 1000, rr = 7 + r() * 7;
    if (far(x, y, [500, 500], 490)) continue;
    if (x > 505 && y > 328 && y < 742) continue;
    if (Math.abs(y - 300) < 36 + rr || Math.abs(y - 770) < 36 + rr || Math.abs(x - 480) < 36 + rr) continue;
    if (!far(x, y, P1, 110)) continue;
    if (occ.some(([ox, oy, ow, oh]) => x > ox - rr - 4 && x < ox + ow + rr + 12 && y > oy - rr - 4 && y < oy + oh + rr + 12)) continue;
    s += tree(x, y, rr); nt++;
  }

  // ---- auto ----
  const carCols = ['#b3202a', '#d9d9d6', '#1f4e79', '#f1efe8', '#2b2d30', '#8c8f93', '#3d6b4f', '#c9a227'];
  const car = (c) => `<rect x="-9" y="-3.5" width="23" height="12" rx="4" fill="#000" opacity=".3"/><rect x="-11" y="-5.5" width="22" height="11" rx="3.6" fill="${c}"/><rect x="-6.5" y="-4.6" width="12" height="9.2" rx="2.2" fill="#16222b" opacity=".88"/><rect x="-3.8" y="-4.2" width="6.5" height="8.4" rx="1.5" fill="${shade(c, 0.18)}"/><path d="M-9.5 -4.300h17" stroke="#fff" stroke-width=".8" opacity=".35"/>`;
  // parcheggiate nei vialetti / lungo strada
  [[120, 284, 0], [352, 316, 180], [742, 284, 0], [905, 316, 180], [150, 786, 180], [830, 754, 0], [464, 130, 90], [496, 620, 270], [464, 905, 90]].forEach(([x, y, a]) => {
    s += `<g transform="translate(${x} ${y}) rotate(${a})">${car(pick(carCols))}</g>`;
  });
  // in movimento (lente, sulle corsie: non passano sui portali)
  for (let i = 0; i < 6; i++) {
    const c = pick(carCols), d = f(70 + r() * 40), b = f(-r() * d);
    if (i < 4) {
      const right = i % 2 === 0, y = (i < 2 ? 300 : 770) + (right ? 11 : -11);
      s += `<g><g transform="translate(0 ${y}) rotate(${right ? 0 : 180})">${car(c)}</g><animateTransform attributeName="transform" type="translate" from="${right ? -40 : 1040} 0" to="${right ? 1040 : -40} 0" dur="${d}s" begin="${b}s" repeatCount="indefinite"/></g>`;
    } else {
      const down = i === 4, x = 480 + (down ? -11 : 11);
      s += `<g><g transform="translate(${x} 0) rotate(${down ? 90 : 270})">${car(c)}</g><animateTransform attributeName="transform" type="translate" from="0 ${down ? -40 : 1040}" to="0 ${down ? 1040 : -40}" dur="${d}s" begin="${b}s" repeatCount="indefinite"/></g>`;
    }
  }
  return { defs, svg: s };
})();
