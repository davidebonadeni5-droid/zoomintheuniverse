// mondo 7: cellula vegetale — versione realistica
REAL[7] = (() => {
  let sd = 8807;
  const r = () => { sd = (sd * 1664525 + 1013904223) >>> 0; return sd / 4294967296; };
  const f = n => Math.round(n * 10) / 10, TAU = Math.PI * 2;
  const BG = '#3a8a32', PC = '#5a2f8f', P = [560, 450];
  const blob = (cx, cy, R, irr, n) => {
    const pts = [];
    for (let i = 0; i < n; i++) { const a = (i / n) * TAU, d = R * (1 + (r() - 0.5) * 2 * irr); pts.push([cx + Math.cos(a) * d, cy + Math.sin(a) * d]); }
    let d = '';
    for (let i = 0; i < n; i++) {
      const p0 = pts[(i + n - 1) % n], p1 = pts[i], p2 = pts[(i + 1) % n], p3 = pts[(i + 2) % n];
      if (!i) d += `M${f(p1[0])} ${f(p1[1])}`;
      d += `C${f(p1[0] + (p2[0] - p0[0]) / 6)} ${f(p1[1] + (p2[1] - p0[1]) / 6)} ${f(p2[0] - (p3[0] - p1[0]) / 6)} ${f(p2[1] - (p3[1] - p1[1]) / 6)} ${f(p2[0])} ${f(p2[1])}`;
    }
    return d + 'Z';
  };
  const far = (x, y, q, d) => Math.hypot(x - q[0], y - q[1]) > d;
  let defs = '', s = '';
  defs +=
    `<radialGradient id="r7_cyt" gradientUnits="userSpaceOnUse" cx="400" cy="370" r="460"><stop offset="0" stop-color="#bfe09a"/><stop offset=".45" stop-color="#9ccd7c"/><stop offset=".8" stop-color="#76b25f"/><stop offset="1" stop-color="#5a9c4b"/></radialGradient>` +
    `<radialGradient id="r7_edge" gradientUnits="userSpaceOnUse" cx="500" cy="480" r="320"><stop offset=".72" stop-color="#2c6e2a" stop-opacity="0"/><stop offset="1" stop-color="#2c6e2a" stop-opacity=".5"/></radialGradient>` +
    `<radialGradient id="r7_vac" gradientUnits="userSpaceOnUse" cx="365" cy="560" r="170"><stop offset="0" stop-color="#eefaf0" stop-opacity=".92"/><stop offset=".55" stop-color="#cdeedd" stop-opacity=".85"/><stop offset="1" stop-color="#93c9ad" stop-opacity=".9"/></radialGradient>` +
    `<radialGradient id="r7_chl" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#6fc04f"/><stop offset=".45" stop-color="#3a9434"/><stop offset="1" stop-color="#17561f"/></radialGradient>` +
    `<linearGradient id="r7_gra" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2c7a2c"/><stop offset="1" stop-color="#0f4217"/></linearGradient>` +
    `<radialGradient id="r7_mit" cx=".35" cy=".3" r=".85"><stop offset="0" stop-color="#f6c08c"/><stop offset=".5" stop-color="#dc8a54"/><stop offset="1" stop-color="#9c4f2a"/></radialGradient>` +
    `<radialGradient id="r7_nuc" gradientUnits="userSpaceOnUse" cx="${P[0]}" cy="${P[1]}" r="80"><stop offset="0" stop-color="${PC}"/><stop offset=".81" stop-color="${PC}"/><stop offset=".88" stop-color="#7a52b0"/><stop offset=".94" stop-color="#9a78c9"/><stop offset="1" stop-color="#4a2a78"/></radialGradient>` +
    `<radialGradient id="r7_nsh" gradientUnits="userSpaceOnUse" cx="${P[0] + 10}" cy="${P[1] + 13}" r="100"><stop offset=".7" stop-color="#1d4a22" stop-opacity=".45"/><stop offset="1" stop-color="#1d4a22" stop-opacity="0"/></radialGradient>` +
    `<radialGradient id="r7_sh" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#1d4a22" stop-opacity=".5"/><stop offset=".6" stop-color="#1d4a22" stop-opacity=".3"/><stop offset="1" stop-color="#1d4a22" stop-opacity="0"/></radialGradient>` +
    `<radialGradient id="r7_lit" gradientUnits="userSpaceOnUse" cx="370" cy="340" r="230"><stop offset="0" stop-color="#fff" stop-opacity=".2"/><stop offset=".5" stop-color="#fff" stop-opacity=".09"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>` +
    `<radialGradient id="r7_ves" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#fff6c9"/><stop offset="1" stop-color="#c9a94f"/></radialGradient>`;

  s += `<rect width="1000" height="1000" fill="${BG}"/>`;
  // cellule vicine (appena accennate, restano vicine al colore del mondo)
  for (let k = 0; k < 7; k++) {
    const a = (k / 7) * TAU + 0.3, x = 500 + Math.cos(a) * 610, y = 480 + Math.sin(a) * 610;
    const d = blob(x, y, 270, 0.1, 9);
    s += `<path d="${d}" fill="#3f9036" stroke="#317a2b" stroke-width="16"/><path d="${d}" fill="none" stroke="#4d9c42" stroke-width="5"/>`;
  }
  // parete cellulare + membrana
  const cell = blob(500, 480, 300, 0.07, 10);
  s += `<path d="${cell}" fill="#1f5c20" opacity=".45" transform="translate(7 9)" stroke="#1f5c20" stroke-width="30"/>`;
  s += `<path d="${cell}" fill="url(#r7_cyt)" stroke="#55943f" stroke-width="30" stroke-linejoin="round"/>`;
  s += `<path d="${cell}" fill="none" stroke="#a8d27c" stroke-width="20"/>`;
  s += `<path d="${cell}" fill="none" stroke="#d6efb0" stroke-width="5" opacity=".8" transform="translate(-2.5 -3)"/>`;
  s += `<path d="${cell}" fill="url(#r7_edge)" stroke="#3f8a3a" stroke-width="2.5" transform="translate(500 480) scale(.955) translate(-500 -480)"/>`;
  // citoplasma granuloso (ribosomi, vescicole)
  const gt = ['#5fa650', '#c8e8a6', '#4c9443', '#86c06c'];
  for (let i = 0; i < 230; i++) {
    const a = r() * TAU, d = Math.sqrt(r()) * 262, x = 500 + Math.cos(a) * d, y = 480 + Math.sin(a) * d;
    if (!far(x, y, P, 84)) continue;
    s += `<circle cx="${f(x)}" cy="${f(y)}" r="${f(0.9 + r() * r() * 3.4)}" fill="${gt[i % 4]}" opacity="${f(0.3 + r() * 0.45)}"/>`;
  }
  // vacuolo centrale
  const vac = blob(400, 600, 122, 0.13, 8);
  s += `<path d="${vac}" fill="#1d4a22" opacity=".28" transform="translate(6 8)"/>`;
  s += `<path d="${vac}" fill="url(#r7_vac)" stroke="#7fb596" stroke-width="3"/>`;
  s += `<path d="${vac}" fill="none" stroke="#f4fff6" stroke-width="2" opacity=".7" transform="translate(400 600) scale(.95) translate(-400 -600)"/>`;
  s += `<ellipse cx="352" cy="545" rx="46" ry="20" fill="#fff" opacity=".4" transform="rotate(-35 352 545)"/>`;
  // reticolo endoplasmatico attorno al nucleo
  let er = '', erd = '';
  for (let k = 0; k < 5; k++) {
    const R = 92 + k * 11, a0 = -0.5 + k * 0.22 + r() * 0.2, a1 = a0 + 2.2 + r() * 0.9;
    let d = '';
    for (let a = a0, i = 0; a <= a1; a += 0.16, i++) {
      const rr = R + Math.sin(i * 1.9 + k) * 3.2, x = P[0] + Math.cos(a) * rr, y = P[1] + Math.sin(a) * rr;
      d += (i ? 'L' : 'M') + f(x) + ' ' + f(y);
      if (i % 2 === 0 && k % 2 === 0) erd += `<circle cx="${f(P[0] + Math.cos(a) * (rr + 5))}" cy="${f(P[1] + Math.sin(a) * (rr + 5))}" r="1.7" fill="#5b3a86" opacity=".7"/>`;
    }
    er += d;
  }
  for (let k = 0; k < 3; k++) {
    const R = 94 + k * 12, a0 = 3.3 + k * 0.2, a1 = a0 + 1.5;
    let d = '';
    for (let a = a0, i = 0; a <= a1; a += 0.16, i++) { const rr = R + Math.sin(i * 2.1 + k) * 3; d += (i ? 'L' : 'M') + f(P[0] + Math.cos(a) * rr) + ' ' + f(P[1] + Math.sin(a) * rr); }
    er += d;
  }
  s += `<path d="${er}" stroke="#3d7a3c" stroke-width="8" fill="none" opacity=".35" stroke-linecap="round" stroke-linejoin="round" transform="translate(2.5 3.5)"/>`;
  s += `<path d="${er}" stroke="#b9a6d6" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
  s += `<path d="${er}" stroke="#e6dcf3" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round" opacity=".8" transform="translate(-1 -1.3)"/>` + erd;
  // apparato di Golgi
  const G = [655, 652];
  let go = '';
  for (let k = 0; k < 5; k++) { const w = 46 - k * 5, y = -22 + k * 11; go += `M${-w} ${y}Q0 ${y + 16} ${w} ${y}`; }
  s += `<g transform="translate(${G[0]} ${G[1]}) rotate(-28)"><path d="${go}" stroke="#2c6a2c" stroke-width="9" fill="none" stroke-linecap="round" opacity=".35" transform="translate(3 4)"/><path d="${go}" stroke="#d9b65a" stroke-width="7.5" fill="none" stroke-linecap="round"/><path d="${go}" stroke="#fbe9a8" stroke-width="2.2" fill="none" stroke-linecap="round" transform="translate(-.5 -1.6)"/>` +
    [[-58, -20, 6], [60, 6, 7], [52, 30, 5], [-50, 34, 5]].map(([x, y, R]) => `<circle cx="${x}" cy="${y}" r="${R}" fill="url(#r7_ves)"/>`).join('') + `</g>`;
  // mitocondri
  const mitos = [[700, 540, 30], [430, 345, 120], [625, 292, 70], [305, 462, 160]];
  mitos.forEach(([x, y, a]) =>
    s += `<g transform="translate(${x} ${y})"><ellipse cx="5" cy="7" rx="30" ry="18" fill="url(#r7_sh)" transform="rotate(${a})"/><g transform="rotate(${a})"><ellipse rx="26" ry="13" fill="url(#r7_mit)" stroke="#8a4424" stroke-width="1.5"/><path d="M-19 0q3 -9 6 0t6 0t6 0t6 0t6 0t6 0" stroke="#8a3f22" stroke-width="2.2" fill="none" stroke-linecap="round" opacity=".85"/><path d="M-19 1.6q3 -9 6 0t6 0t6 0t6 0t6 0t6 0" stroke="#ffd9b0" stroke-width="1" fill="none" opacity=".6"/></g><ellipse cx="-7" cy="-6" rx="11" ry="3.5" fill="#fff" opacity=".4" transform="rotate(${a > 90 ? a - 180 : a})"/></g>`);
  // cloroplasti
  const placed = [];
  for (let i = 0; i < 400 && placed.length < 15; i++) {
    const a = r() * TAU, d = 60 + Math.sqrt(r()) * 195, x = 500 + Math.cos(a) * d, y = 480 + Math.sin(a) * d;
    if (!far(x, y, P, 150) || !far(x, y, [400, 600], 158) || !far(x, y, [300, 330], 46) || !far(x, y, [690, 690], 44) || !far(x, y, G, 82)) continue;
    if (mitos.some(m => !far(x, y, m, 60)) || placed.some(m => !far(x, y, m, 68))) continue;
    placed.push([x, y]);
    const rot = Math.round(r() * 180), anim = placed.length <= 6;
    let g = `<ellipse cx="6" cy="8" rx="35" ry="22" fill="url(#r7_sh)"/><g transform="rotate(${rot})"><ellipse rx="31" ry="17" fill="url(#r7_chl)" stroke="#124a1a" stroke-width="1.5"/>`;
    let gr = '', lam = '';
    [-17, -6, 5, 16].forEach((dx, j) => { const h = j === 0 || j === 3 ? 15 : 22, yy = (j % 2 ? 2 : -2); gr += `M${dx - 3.5} ${f(yy - h / 2)}h7v${h}h-7Z`; for (let q = 1; q < 4; q++) lam += `M${dx - 3.5} ${f(yy - h / 2 + q * h / 4)}h7`; });
    g += `<path d="M-20 0h40M-14 -5h30M-16 5h30" stroke="#1d6426" stroke-width="1.6" fill="none" opacity=".8"/><path d="${gr}" fill="url(#r7_gra)"/><path d="${lam}" stroke="#58a84a" stroke-width=".8" opacity=".7"/></g>`;
    g += `<ellipse cx="-8" cy="-8" rx="15" ry="4.5" fill="#d9ffb0" opacity=".38" transform="rotate(${rot > 90 ? rot - 180 : rot})"/>`;
    if (anim) g += `<animateTransform attributeName="transform" type="translate" values="${f(x)} ${f(y)};${f(x + (r() - 0.5) * 12)} ${f(y + (r() - 0.5) * 12)};${f(x)} ${f(y)}" dur="${Math.round(9 + r() * 8)}s" repeatCount="indefinite"/>`;
    s += `<g transform="translate(${f(x)} ${f(y)})">${g}</g>`;
  }
  // nucleo: involucro con pori, interno lasciato al colore del portale
  s += `<circle cx="${P[0] + 10}" cy="${P[1] + 13}" r="100" fill="url(#r7_nsh)"/>`;
  s += `<circle cx="${P[0]}" cy="${P[1]}" r="80" fill="url(#r7_nuc)"/>`;
  let pores = '';
  for (let i = 0; i < 26; i++) { const a = (i / 26) * TAU + 0.1; pores += `<circle cx="${f(P[0] + Math.cos(a) * 73.5)}" cy="${f(P[1] + Math.sin(a) * 73.5)}" r="2.3" fill="#35195e" opacity=".8"/>`; }
  s += pores;
  s += `<path d="M${P[0] - 69} ${P[1] - 32}A76 76 0 0 1 ${P[0] - 20} ${P[1] - 73.5}" stroke="#e3d4f7" stroke-width="3" fill="none" opacity=".6" stroke-linecap="round"/>`;
  // luce dall'alto a sinistra
  s += `<circle cx="370" cy="340" r="230" fill="url(#r7_lit)"/>`;
  return { defs, svg: s };
})();
