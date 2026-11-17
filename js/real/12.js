// mondo 12: oceano — barriera corallina, versione realistica
REAL[12] = (() => {
  let sd = 12077;
  const r = () => { sd = (sd * 1664525 + 1013904223) >>> 0; return sd / 4294967296; };
  const f = n => Math.round(n * 10) / 10, TAU = Math.PI * 2;
  const BG = '#2f80d0', PX = 600, PY = 380;
  const circ = (x, y, q) => `M${f(x - q)} ${f(y)}a${f(q)} ${f(q)} 0 1 0 ${f(q * 2)} 0a${f(q)} ${f(q)} 0 1 0 ${f(-q * 2)} 0`;
  const st = (a) => a.map(([o, c, op]) => `<stop offset="${o}" stop-color="${c}"${op != null ? ` stop-opacity="${op}"` : ''}/>`).join('');
  const lin = (id, a, x2 = 0, y2 = 1) => `<linearGradient id="r12_${id}" x1="0" y1="0" x2="${x2}" y2="${y2}">${st(a)}</linearGradient>`;
  const rad = (id, a, cx = .5, cy = .5, rr = .5) => `<radialGradient id="r12_${id}" cx="${cx}" cy="${cy}" r="${rr}">${st(a)}</radialGradient>`;
  let defs =
    lin('sea', [[0, '#63b1ea'], [.3, '#3d90da'], [.55, BG], [.8, '#2468b4'], [1, '#1b4f92']]) +
    lin('ray', [[0, '#eaf8ff', .34], [.6, '#cfeeff', .1], [1, '#cfeeff', 0]]) +
    lin('sand', [[0, '#b9c9bd'], [.25, '#8fabb0'], [1, '#4a7396']]) +
    lin('far', [[0, '#2a6fb8'], [1, '#235f9f']]) +
    `<radialGradient id="r12_edge" gradientUnits="userSpaceOnUse" cx="500" cy="500" r="430">${st([[.74, BG, 0], [.86, BG, .75], [.97, BG, 1]])}</radialGradient>` +
    `<radialGradient id="r12_pl" gradientUnits="userSpaceOnUse" cx="${PX}" cy="${PY}" r="140">${st([[0, '#2b8a8a', 1], [.5, '#2b8a8a', 1], [.62, '#3fa59c', .6], [.8, '#6cc7b4', .22], [1, '#8fe0c8', 0]])}</radialGradient>` +
    rad('rock', [[0, '#c9b9a8'], [.5, '#8c7f86'], [1, '#3f4f72']], .35, .25, .8) +
    rad('brain', [[0, '#e7c98f'], [.5, '#b98a5a'], [1, '#5a4a5e']], .35, .25, .8) +
    rad('purp', [[0, '#d9b3f0'], [.5, '#9a67c2'], [1, '#463a78']], .35, .25, .8) +
    rad('shell', [[0, '#a59a62'], [.45, '#6c6a3c'], [1, '#2f3a2c']], .38, .28, .75) +
    rad('skin', [[0, '#b7b98a'], [.6, '#77805a'], [1, '#3d4a40']], .35, .3, .75) +
    rad('jel', [[0, '#fff0fa', .75], [.55, '#f3b6dc', .45], [1, '#c77fb5', .3]], .38, .3, .75) +
    rad('bub', [[0, '#ffffff', 0], [.7, '#ffffff', .05], [.92, '#eaf8ff', .55], [1, '#ffffff', .1]], .5, .5, .5) +
    lin('f0', [[0, '#b98a12'], [.35, '#f6cf3a'], [.75, '#ffe98a'], [1, '#d9b85a']]) +
    lin('f1', [[0, '#1c4f9c'], [.4, '#3f9be0'], [.8, '#9fd8f5'], [1, '#6fb0d8']]) +
    lin('f2', [[0, '#a8431c'], [.4, '#f08238'], [.8, '#ffc79a'], [1, '#e0a070']]) +
    lin('f3', [[0, '#4f6f8c'], [.4, '#a9c3d6'], [.8, '#eef6fa'], [1, '#b9cbd6']]) +
    lin('f4', [[0, '#7a2f6a'], [.4, '#d0609f'], [.8, '#f6b0d0'], [1, '#c98aa8']]);
  let s = `<rect width="1000" height="1000" fill="url(#r12_sea)"/>`;
  // raggi di luce dall'alto a sinistra
  for (let i = 0; i < 9; i++) {
    const x = 120 + i * 85 + r() * 40, w = 18 + r() * 46, L = 420 + r() * 330, sk = 150 + r() * 60;
    if (x + sk * .45 > PX - 150 && x + sk * .45 < PX + 120 && L > 250) continue;
    s += `<path d="M${f(x)} 110l${f(w)} 0l${f(sk + w * 1.6)} ${f(L)}l${f(-w * 3.2)} 0z" fill="url(#r12_ray)" opacity="${f(.35 + r() * .45)}"/>`;
  }
  // barriera lontana (sagome nella foschia blu)
  const ridge = (y0, amp, n, sdx) => { let d = `M0 ${y0}`; for (let i = 0; i <= n; i++) { const x = i * 1000 / n; d += `L${f(x)} ${f(y0 - amp * (.3 + r()) * (.6 + .4 * Math.sin(i * sdx)))}`; } return d + `L1000 1000L0 1000z`; };
  s += `<path d="${ridge(735, 60, 26, .9)}" fill="url(#r12_far)" opacity=".55"/><path d="${ridge(765, 48, 34, 1.3)}" fill="#245f9e" opacity=".7"/>`;
  // banco di pesci lontano
  { let d = ''; for (let i = 0; i < 46; i++) { const x = 150 + r() * 260 + i * 2, y = 560 + r() * 110 - i * .8, q = 3 + r() * 3; d += `M${f(x + q)} ${f(y)}q${f(-q)} ${f(-q * .6)} ${f(-q * 2)} 0l${f(-q * .6)} ${f(-q * .4)}v${f(q * .8)}l${f(q * .6)} ${f(-q * .4)}q${f(q)} ${f(q * .6)} ${f(q * 2)} 0z`; } s += `<path d="${d}" fill="#1d4f8c" opacity=".45"/>`; }
  // fondale sabbioso
  { let d = `M0 800`; for (let i = 0; i <= 40; i++) d += `L${i * 25} ${f(786 + Math.sin(i * .55) * 9 + r() * 7)}`; s += `<path d="${d}L1000 1000L0 1000z" fill="url(#r12_sand)"/>`; }
  // caustiche e ondulazioni della sabbia
  { let d = ''; for (let i = 0; i < 26; i++) { const x = 120 + r() * 760, y = 805 + r() * 110, w = 20 + r() * 50; d += `M${f(x)} ${f(y)}q${f(w * .5)} ${f(-5 - r() * 5)} ${f(w)} 0`; } s += `<path d="${d}" stroke="#e9f6ee" stroke-opacity=".28" stroke-width="2.2" fill="none" stroke-linecap="round"/>`;
    d = ''; for (let i = 0; i < 30; i++) { const x = 100 + r() * 800, y = 812 + r() * 120, w = 30 + r() * 60; d += `M${f(x)} ${f(y)}q${f(w * .5)} 5 ${f(w)} 1`; } s += `<path d="${d}" stroke="#2d5880" stroke-opacity=".3" stroke-width="2" fill="none" stroke-linecap="round"/>`; }
  // rocce e teste di corallo
  const boulder = (x, y, rx, ry, g) => {
    let o = `<ellipse cx="${x + rx * .15}" cy="${y + ry * .9}" rx="${f(rx * 1.1)}" ry="${f(ry * .28)}" fill="#12305a" opacity=".35"/>`;
    let d = `M${f(x - rx)} ${f(y + ry * .85)}`; const n = 9;
    for (let i = 0; i <= n; i++) { const a = Math.PI + i / n * Math.PI, k = .9 + r() * .2; d += `L${f(x + Math.cos(a) * rx * k)} ${f(y + ry * .85 + Math.sin(a) * ry * 1.7 * k)}`; }
    o += `<path d="${d}z" fill="url(#r12_${g})"/>`;
    let p = ''; for (let i = 0; i < 16; i++) { const a = Math.PI + r() * Math.PI, k = r() * .85; p += circ(x + Math.cos(a) * rx * k, y + ry * .8 + Math.sin(a) * ry * 1.5 * k, 1.2 + r() * 2.2); }
    return o + `<path d="${p}" fill="#2a2f4f" opacity=".3"/>`;
  };
  s += boulder(90, 800, 70, 34, 'rock') + boulder(930, 795, 80, 38, 'rock') + boulder(545, 800, 60, 22, 'rock') + boulder(260, 812, 46, 18, 'rock') + boulder(770, 806, 52, 17, 'rock');
  // corallo cervello con solchi
  s += boulder(610, 800, 50, 24, 'brain');
  { let d = ''; for (let i = 0; i < 9; i++) { const x = 570 + i * 9.5, h = 30 - Math.abs(i - 4) * 4; d += `M${f(x)} ${f(815)}q${f(-5 + r() * 3)} ${f(-h * .5)} ${f(2)} ${f(-h)}q4 ${f(-4)} 5 2`; } s += `<path d="${d}" stroke="#5f4334" stroke-opacity=".5" stroke-width="2" fill="none"/>`; }
  // coralli ramificati (acropora): un path per livello di spessore
  const coral = (x, y, dark, mid, lite, sc, spread) => {
    const lv = [[], [], [], []];
    const br = (px, py, a, L, d) => {
      const ex = px + Math.cos(a) * L, ey = py + Math.sin(a) * L, bend = (r() - .5) * L * .3;
      lv[d].push(`M${f(px)} ${f(py)}Q${f((px + ex) / 2 + bend)} ${f((py + ey) / 2)} ${f(ex)} ${f(ey)}`);
      if (d < 3) { const n = d === 0 ? 3 : 2; for (let i = 0; i < n; i++) br(ex, ey, a + (i - (n - 1) / 2) * spread * (.75 + r() * .5) + (r() - .5) * .2, L * (.62 + r() * .2), d + 1); }
    };
    for (let j = 0; j < 4; j++) br(x + (j - 1.5) * 9 * sc, y, -Math.PI / 2 + (j - 1.5) * .42 * spread + (r() - .5) * .15, (34 + r() * 16) * sc, 0);
    const w = [13, 9.5, 7, 5].map(v => v * sc);
    let o = `<ellipse cx="${x + 8}" cy="${y + 4}" rx="${f(60 * sc)}" ry="${f(9 * sc)}" fill="#12305a" opacity=".3"/>`;
    for (let d = 0; d < 4; d++) o += `<path d="${lv[d].join('')}" stroke="${dark}" stroke-width="${f(w[d])}" fill="none" stroke-linecap="round"/>`;
    for (let d = 0; d < 4; d++) o += `<path d="${lv[d].join('')}" stroke="${mid}" stroke-width="${f(w[d] * .66)}" fill="none" stroke-linecap="round" transform="translate(-1 -1)"/>`;
    for (let d = 1; d < 4; d++) o += `<path d="${lv[d].join('')}" stroke="${lite}" stroke-opacity=".7" stroke-width="${f(w[d] * .22)}" fill="none" stroke-linecap="round" transform="translate(-${f(w[d] * .2)} -${f(w[d] * .12)})"/>`;
    return o;
  };
  s += coral(170, 820, '#8a3a3f', '#d9716a', '#ffd0bd', 1.05, .62) + coral(450, 808, '#93562a', '#e0a05a', '#ffe6b3', .95, .75) + coral(850, 812, '#8a3567', '#d86aa6', '#ffd0e8', 1, .58);
  s += coral(700, 825, '#3f5f8f', '#7fa3cf', '#dcebfa', .55, .7) + coral(345, 832, '#6b6a2f', '#b9b45a', '#f3efb0', .5, .8);
  // gorgonia (ventaglio di mare)
  { let d = ''; const fan = (px, py, a, L, k) => { const ex = px + Math.cos(a) * L, ey = py + Math.sin(a) * L; d += `M${f(px)} ${f(py)}L${f(ex)} ${f(ey)}`; if (k > 0) { fan(ex, ey, a - .3 - r() * .15, L * .72, k - 1); fan(ex, ey, a + .3 + r() * .15, L * .72, k - 1); } }; fan(930, 772, -1.75, 38, 5); s += `<path d="${d}" stroke="#7a2f8f" stroke-width="2.6" fill="none" stroke-linecap="round" opacity=".9"/><path d="${d}" stroke="#d99ae8" stroke-width=".9" fill="none" transform="translate(-.8 -.6)" opacity=".8"/>`; }
  // anemone / coralli molli viola
  { let d = ''; for (let j = 0; j < 13; j++) { const x = 68 + j * 5.2, h = 34 + r() * 22; d += `M${f(x)} 774q${f(-9 + r() * 14)} ${f(-h * .5)} ${f(-4 + r() * 12)} ${f(-h)}`; } s += `<path d="${d}" stroke="#6f4aa8" stroke-width="6" fill="none" stroke-linecap="round"/><path d="${d}" stroke="#cfa8f5" stroke-width="2.4" fill="none" stroke-linecap="round" transform="translate(-1.2 -1)"/>`; }
  // alghe
  { let d = ''; for (let j = 0; j < 10; j++) { const x = 505 + r() * 60, h = 30 + r() * 40; d += `M${f(x)} 800q${f(-10 + r() * 6)} ${f(-h * .5)} ${f(4)} ${f(-h * .7)}t${f(-3)} ${f(-h * .3)}`; } s += `<path d="${d}" stroke="#2f6f4f" stroke-width="4.5" fill="none" stroke-linecap="round" opacity=".9"/><path d="${d}" stroke="#7fbf7a" stroke-width="1.4" fill="none" stroke-linecap="round" transform="translate(-1 0)" opacity=".8"/>`; }
  // neve marina (particelle in sospensione)
  for (let k = 0; k < 3; k++) { let d = ''; for (let i = 0; i < 45; i++) { const x = 130 + r() * 740, y = 130 + r() * 660; if (Math.hypot(x - PX, y - PY) < 70) continue; d += circ(x, y, .7 + r() * (1 + k * .6)); } s += `<path d="${d}" fill="#e6f6ff" opacity="${[.5, .3, .16][k]}"/>`; }
  // nuvola di plancton attorno al portale
  s += `<circle cx="${PX}" cy="${PY}" r="140" fill="url(#r12_pl)"/>`;
  { let d = ''; for (let i = 0; i < 70; i++) { const a = r() * TAU, q = 68 + r() * r() * 70; d += circ(PX + Math.cos(a) * q, PY + Math.sin(a) * q, .8 + r() * 1.8); } s += `<path d="${d}" fill="#c9ffe9" opacity=".6"/>`; }
  // pesci
  const fish = (x, y, z, dir, g, anim) => {
    const body = `M${f(z)} 0Q${f(z * .35)} ${f(-z * .62)} ${f(-z * .75)} ${f(-z * .1)}L${f(-z * 1.4)} ${f(-z * .5)}Q${f(-z * 1.18)} 0 ${f(-z * 1.4)} ${f(z * .5)}L${f(-z * .75)} ${f(z * .1)}Q${f(z * .35)} ${f(z * .62)} ${f(z)} 0z`;
    let o = `<g transform="translate(${f(x)} ${f(y)}) scale(${dir} 1)">` +
      `<path d="M${f(z * .35)} ${f(-z * .34)}q${f(-z * .5)} ${f(-z * .42)} ${f(-z * .95)} ${f(-z * .02)}z" fill="url(#r12_f${g})" opacity=".8"/>` +
      `<path d="${body}" fill="url(#r12_f${g})"/>` +
      `<path d="M${f(z * .7)} ${f(z * .08)}Q${f(z * .2)} ${f(z * .5)} ${f(-z * .6)} ${f(z * .1)}" stroke="#fff" stroke-opacity=".35" stroke-width="${f(z * .1)}" fill="none"/>` +
      `<path d="M${f(z * .1)} ${f(z * .05)}q${f(-z * .35)} ${f(z * .3)} ${f(-z * .45)} ${f(z * .02)}z" fill="#000" opacity=".18"/>` +
      `<circle cx="${f(z * .6)}" cy="${f(-z * .1)}" r="${f(z * .13)}" fill="#f4f0d8"/><circle cx="${f(z * .62)}" cy="${f(-z * .1)}" r="${f(z * .075)}" fill="#111a22"/></g>`;
    return anim ? `<g>${o}<animateTransform attributeName="transform" type="translate" values="0 0;${anim} 0;0 0" dur="${f(14 + r() * 8)}s" repeatCount="indefinite"/></g>` : o;
  };
  const FP = [[200, 330, 17, 1, 0, 40], [245, 362, 13, 1, 0, 40], [160, 372, 12, 1, 0, 40], [820, 300, 16, -1, 1, -45], [860, 330, 12, -1, 1, 0], [390, 650, 19, -1, 2, -35], [440, 690, 14, -1, 2, 0], [640, 690, 22, 1, 3, 30], [250, 560, 11, 1, 4, 0], [560, 620, 12, -1, 1, 0], [330, 730, 13, 1, 2, 0], [700, 250, 10, -1, 3, 0], [880, 660, 15, -1, 0, -30], [480, 190, 11, 1, 3, 0]];
  FP.forEach(p => { p[2] *= 1.45; s += fish(...p); });
  // medusa
  { let t = ''; for (let j = 0; j < 7; j++) { const x = 312 + j * 14.5; t += `M${f(x)} 232q${f(-7 + r() * 5)} 24 ${f(1)} 46t${f(-3 + r() * 6)} ${f(40 + r() * 30)}`; }
    s += `<g><path d="${t}" stroke="#f6c9e6" stroke-opacity=".55" stroke-width="1.6" fill="none"/>` +
      `<path d="M338 232q-8 30 2 52t-4 44M356 234q8 26 -2 50t6 40M372 232q10 30 -2 56" stroke="#ffe3f4" stroke-opacity=".6" stroke-width="6" fill="none" stroke-linecap="round"/>` +
      `<path d="M300 232q0 -64 56 -64t56 64q-14 9 -28 0q-14 9 -28 0q-14 9 -28 0q-14 9 -28 0z" fill="url(#r12_jel)"/>` +
      `<path d="M318 226q2 -40 38 -44q-22 14 -24 44z" fill="#fff" opacity=".35"/><path d="M326 228q6 -30 30 -32q26 2 32 32" stroke="#d98ac0" stroke-opacity=".5" stroke-width="5" fill="none"/>` +
      `<animateTransform attributeName="transform" type="translate" values="0 0;0 -18;0 0" dur="9s" repeatCount="indefinite"/></g>`; }
  // tartaruga marina
  s += `<g><path d="M742 540q-44 -34 -62 -6q26 4 52 26z" fill="url(#r12_skin)"/><path d="M748 588q-22 30 -44 28q6 -22 30 -40z" fill="#4f5a44"/><path d="M800 590q14 22 34 22q-4 -20 -22 -32z" fill="#4f5a44"/>` +
    `<path d="M812 548q22 -14 40 -4q10 8 2 16q-20 8 -40 2z" fill="url(#r12_skin)"/><circle cx="846" cy="551" r="2.6" fill="#10160f"/><path d="M826 547l6 5l-7 5M836 546l5 6" stroke="#3d4a38" stroke-width="1.4" fill="none" opacity=".7"/>` +
    `<ellipse cx="770" cy="562" rx="54" ry="36" fill="url(#r12_shell)" transform="rotate(-6 770 562)"/>` +
    `<path d="M728 556l22 -20l30 -4l26 12l6 20l-18 20l-34 4l-24 -10zM750 536l8 26l-22 18M780 532l-6 28l14 26M806 544l-22 16l28 4M758 562l16 -2" stroke="#262d1e" stroke-opacity=".55" stroke-width="2" fill="none" stroke-linejoin="round"/>` +
    `<path d="M736 545q22 -22 56 -16" stroke="#e6e0a8" stroke-opacity=".5" stroke-width="5" fill="none" stroke-linecap="round"/>` +
    `<path d="M786 584q40 30 78 20q-22 -22 -56 -36z" fill="url(#r12_skin)"/>` +
    `<animateTransform attributeName="transform" type="translate" values="0 0;-16 7;0 0" dur="13s" repeatCount="indefinite"/></g>`;
  // bolle
  for (let k = 0; k < 2; k++) { const bx = [130, 470, 760, 900][k]; let o = ''; for (let i = 0; i < 5; i++) { const q = 2.5 + r() * 5, x = bx + (r() - .5) * 26, y = 700 - i * 60 - r() * 30; o += `<circle cx="${f(x)}" cy="${f(y)}" r="${f(q)}" fill="url(#r12_bub)"/><circle cx="${f(x - q * .35)}" cy="${f(y - q * .35)}" r="${f(q * .22)}" fill="#fff" opacity=".8"/>`; }
    s += `<g>${o}<animateTransform attributeName="transform" type="translate" values="0 40;0 -60" dur="${9 + k * 2}s" repeatCount="indefinite"/><animate attributeName="opacity" values="0;1;1;0" dur="${9 + k * 2}s" repeatCount="indefinite"/></g>`; }
  // sfumatura verso il colore del mondo ai bordi (anello, non copre il portale)
  s += `<path fill-rule="evenodd" d="M0 0h1000v1000h-1000z${circ(500, 500, 316)}" fill="url(#r12_edge)"/>`;
  return { defs, svg: s };
})();
