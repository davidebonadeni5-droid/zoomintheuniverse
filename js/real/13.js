// mondo 13: plancton al microscopio — versione realistica (campo chiaro / contrasto di fase)
REAL[13] = (() => {
  let sd = 13131;
  const r = () => { sd = (sd * 1664525 + 1013904223) >>> 0; return sd / 4294967296; };
  const f = n => Math.round(n * 10) / 10, TAU = Math.PI * 2;
  const BG = '#2b8a8a', PX = 480, PY = 520;
  const circ = (x, y, q) => `M${f(x - q)} ${f(y)}a${f(q)} ${f(q)} 0 1 0 ${f(q * 2)} 0a${f(q)} ${f(q)} 0 1 0 ${f(-q * 2)} 0`;
  const st = (a) => a.map(([o, c, op]) => `<stop offset="${o}" stop-color="${c}"${op != null ? ` stop-opacity="${op}"` : ''}/>`).join('');
  const rad = (id, a, cx = .5, cy = .5, rr = .5) => `<radialGradient id="r13_${id}" cx="${cx}" cy="${cy}" r="${rr}">${st(a)}</radialGradient>`;
  const lin = (id, a, x2 = 0, y2 = 1) => `<linearGradient id="r13_${id}" x1="0" y1="0" x2="${x2}" y2="${y2}">${st(a)}</linearGradient>`;
  let defs =
    `<radialGradient id="r13_lit" gradientUnits="userSpaceOnUse" cx="460" cy="450" r="350">${st([[0, '#7fd6cc', .6], [.5, '#55b3ac', .32], [1, BG, 0]])}</radialGradient>` +
    `<radialGradient id="r13_cell" gradientUnits="userSpaceOnUse" cx="${PX}" cy="${PY}" r="112">${st([[0, '#3a8a32', 1], [.6, '#3a8a32', 1], [.64, '#6fbf4f', 1], [.68, '#c9f2a0', .95], [.72, '#5fae52', .7], [.8, '#8fe08a', .22], [1, '#8fe08a', 0]])}</radialGradient>` +
    rad('bok', [[0, '#d9fff4', .35], [.6, '#bff7e6', .18], [1, '#bff7e6', 0]]) +
    rad('glass', [[0, '#eafffb', .1], [.6, '#d9fff6', .2], [.86, '#f4fffd', .42], [.95, '#ffffff', .75], [1, '#bfeee6', .25]]) +
    rad('gold', [[0, '#e9d06a', .95], [.6, '#b89a2c', .85], [1, '#6f6a1e', .6]], .38, .32, .7) +
    lin('pen', [[0, '#ffffff', .7], [.14, '#e6fff9', .28], [.5, '#d9fff6', .14], [.86, '#e6fff9', .3], [1, '#a8ddd4', .6]]) +
    rad('radi', [[0, '#fff3cf', .5], [.55, '#f0c676', .42], [.9, '#fff0c0', .8], [1, '#b98a3a', .5]], .42, .38, .6) +
    rad('core', [[0, '#ffcf7a', .95], [.6, '#e08a2a', .8], [1, '#8a4a1a', .5]], .4, .35, .65) +
    rad('cop', [[0, '#fff1e6', .75], [.5, '#f6b9a0', .6], [1, '#c9705a', .6]], .35, .3, .8) +
    rad('dino', [[0, '#f2e2a8', .85], [.6, '#c79a4a', .75], [1, '#7a5522', .7]], .38, .32, .75) +
    rad('egg', [[0, '#fff8e0', .5], [.7, '#f0e6c0', .25], [.93, '#ffffff', .7], [1, '#cfeee6', .2]]);
  let s = `<rect width="1000" height="1000" fill="${BG}"/><circle cx="460" cy="450" r="350" fill="url(#r13_lit)"/>`;
  // particelle fuori fuoco
  for (let i = 0; i < 26; i++) { const a = r() * TAU, q = 60 + r() * 290, x = 500 + Math.cos(a) * q, y = 500 + Math.sin(a) * q; if (Math.hypot(x - PX, y - PY) < 90) continue; s += `<circle cx="${f(x)}" cy="${f(y)}" r="${f(8 + r() * 22)}" fill="url(#r13_bok)" opacity="${f(.4 + r() * .6)}"/>`; }
  // detrito fine a fuoco
  for (let k = 0; k < 3; k++) { let d = ''; for (let i = 0; i < 60; i++) { const x = 110 + r() * 780, y = 110 + r() * 780; if (Math.hypot(x - PX, y - PY) < 80) continue; d += circ(x, y, .7 + r() * (1.2 + k * .5)); } s += `<path d="${d}" fill="${k === 2 ? '#0f4f52' : '#d6fff3'}" opacity="${[.55, .3, .22][k]}"/>`; }
  const floaty = (inner, dx, dy, d) => `<g>${inner}<animateTransform attributeName="transform" type="translate" values="0 0;${dx} ${dy};0 0" dur="${d}s" repeatCount="indefinite"/></g>`;
  const shadow = (x, y, rx, ry) => `<ellipse cx="${f(x + rx * .1)}" cy="${f(y + ry * .14)}" rx="${f(rx * 1.03)}" ry="${f(ry * 1.03)}" fill="#0c4a50" opacity=".3"/>`;
  // diatomea centrica (guscio di silice con areole radiali)
  const centric = (x, y, q) => {
    let o = shadow(x, y, q, q) + `<circle cx="${x}" cy="${y}" r="${q}" fill="url(#r13_glass)"/>`;
    let d = ''; const n = Math.round(q * .8);
    for (let k = 0; k < n; k++) { const a = k / n * TAU + (r() - .5) * .02, i0 = k % 2 ? .34 : .2; d += `M${f(x + Math.cos(a) * q * i0)} ${f(y + Math.sin(a) * q * i0)}L${f(x + Math.cos(a) * q * .9)} ${f(y + Math.sin(a) * q * .9)}`; }
    o += `<path d="${d}" stroke="#f0fffb" stroke-opacity=".33" stroke-width="${f(q * .016 + .5)}"/>`;
    [.3, .44, .58, .72, .84].forEach((k, i) => { o += `<circle cx="${x}" cy="${y}" r="${f(q * k)}" fill="none" stroke="${i % 2 ? '#0f5a5c' : '#f4fffd'}" stroke-opacity="${i % 2 ? .28 : .4}" stroke-width="${f(q * .035)}" stroke-dasharray="${f(q * .035)} ${f(q * .05)}"/>`; });
    for (let k = 0; k < 9; k++) { const a = k / 9 * TAU + r() * .4, dd = q * (.32 + r() * .4), cr = q * (.09 + r() * .06); o += `<ellipse cx="${f(x + Math.cos(a) * dd)}" cy="${f(y + Math.sin(a) * dd)}" rx="${f(cr * 1.25)}" ry="${f(cr)}" fill="url(#r13_gold)" transform="rotate(${f(r() * 180)} ${f(x + Math.cos(a) * dd)} ${f(y + Math.sin(a) * dd)})"/>`; }
    o += `<circle cx="${x}" cy="${y}" r="${f(q * .13)}" fill="#f4fffd" opacity=".4"/>` +
      `<circle cx="${x}" cy="${y}" r="${f(q * .96)}" fill="none" stroke="#0e5558" stroke-opacity=".4" stroke-width="${f(q * .03)}"/>` +
      `<path d="M${f(x - q * .93)} ${f(y - q * .25)}A${f(q * .96)} ${f(q * .96)} 0 0 1 ${f(x + q * .25)} ${f(y - q * .93)}" stroke="#fff" stroke-opacity=".8" stroke-width="${f(q * .035)}" fill="none" stroke-linecap="round"/>`;
    return o;
  };
  // diatomea pennata (navicula)
  const pennate = (x, y, L, ang) => {
    const w = L * .24, lens = `M${-L} 0Q${f(-L * .55)} ${f(-w)} 0 ${f(-w)}Q${f(L * .55)} ${f(-w)} ${L} 0Q${f(L * .55)} ${f(w)} 0 ${f(w)}Q${f(-L * .55)} ${f(w)} ${-L} 0z`;
    let o = `<g transform="translate(${x} ${y}) rotate(${ang})"><path d="${lens}" fill="#0c4a50" opacity=".3" transform="translate(${f(L * .05)} ${f(L * .07)})"/><path d="${lens}" fill="url(#r13_pen)"/>`;
    let d = ''; const n = Math.round(L * .42);
    for (let k = -n; k <= n; k++) { const t = k / (n + 1), h = w * (1 - t * t) * .92; d += `M${f(t * L)} ${f(-h)}V${f(-w * .12)}M${f(t * L)} ${f(w * .12)}V${f(h)}`; }
    o += `<path d="${d}" stroke="#f0fffb" stroke-opacity=".4" stroke-width="1.1"/>` +
      `<ellipse cx="${f(-L * .42)}" cy="0" rx="${f(L * .3)}" ry="${f(w * .5)}" fill="url(#r13_gold)" opacity=".85"/><ellipse cx="${f(L * .42)}" cy="0" rx="${f(L * .3)}" ry="${f(w * .5)}" fill="url(#r13_gold)" opacity=".85"/>` +
      `<path d="M${f(-L * .9)} 0H${f(-L * .06)}M${f(L * .06)} 0H${f(L * .9)}" stroke="#eafffb" stroke-opacity=".75" stroke-width="1.6"/><circle r="${f(w * .22)}" fill="#f4fffd" opacity=".55"/>` +
      `<path d="${lens}" fill="none" stroke="#0e5558" stroke-opacity=".45" stroke-width="1.6"/>`;
    return o + `</g>`;
  };
  // radiolario: sfera a traliccio con spine
  const radiolarian = (x, y, q) => {
    let d = '', d2 = '';
    for (let k = 0; k < 22; k++) { const a = k / 22 * TAU + (r() - .5) * .1, L = q * (1.55 + r() * .5); d += `M${f(x + Math.cos(a) * q * .95)} ${f(y + Math.sin(a) * q * .95)}L${f(x + Math.cos(a) * L)} ${f(y + Math.sin(a) * L)}`; }
    for (let k = 0; k < 34; k++) { const a = r() * TAU, dd = Math.sqrt(r()) * q * .85; d2 += circ(x + Math.cos(a) * dd, y + Math.sin(a) * dd, q * (.07 + r() * .05)); }
    return shadow(x, y, q, q) + `<path d="${d}" stroke="#8a6a2a" stroke-opacity=".5" stroke-width="3.2" stroke-linecap="round"/><path d="${d}" stroke="#fff3cf" stroke-opacity=".85" stroke-width="1.3" stroke-linecap="round" transform="translate(-.6 -.6)"/>` +
      `<circle cx="${x}" cy="${y}" r="${q}" fill="url(#r13_radi)"/><circle cx="${x}" cy="${y}" r="${f(q * .5)}" fill="url(#r13_core)"/><path d="${d2}" fill="#3d5a50" opacity=".4"/>` +
      `<path d="M${f(x - q * .9)} ${f(y - q * .3)}A${f(q * .95)} ${f(q * .95)} 0 0 1 ${f(x + q * .3)} ${f(y - q * .9)}" stroke="#fff" stroke-opacity=".75" stroke-width="2" fill="none" stroke-linecap="round"/>`;
  };
  s += floaty(centric(250, 260, 70), 8, 10, 17) + floaty(centric(780, 600, 55), -9, 7, 19) + centric(330, 780, 40);
  s += floaty(pennate(720, 240, 90, 25), -8, 8, 21) + floaty(pennate(200, 560, 70, -40), 9, -5, 18) + pennate(620, 820, 60, 70);
  s += floaty(radiolarian(790, 380, 38), 5, -9, 16);
  // catena di diatomee (chaetoceros) con setole
  { let o = '', d = ''; for (let i = 0; i < 5; i++) { const x = -52 + i * 26; o += `<rect x="${x - 11}" y="-9" width="22" height="18" rx="4" fill="url(#r13_pen)" stroke="#eafffb" stroke-opacity=".6" stroke-width="1.2"/><ellipse cx="${x}" cy="0" rx="6" ry="5" fill="url(#r13_gold)" opacity=".85"/>`; d += `M${x - 12} -9q-14 -30 -40 -44M${x - 12} 9q-14 30 -38 46M${x + 12} -9q14 -30 36 -42M${x + 12} 9q14 30 40 44`; }
    s += `<g transform="translate(560 720) rotate(-18)"><path d="${d}" stroke="#eafffb" stroke-opacity=".45" stroke-width="1" fill="none"/>${o}</g>`; }
  // dinoflagellato (ceratium) a tre corna
  s += floaty(`<g transform="translate(180 400) rotate(20)"><path d="M0 -70q4 34 14 52q14 8 16 22q14 6 26 -6q8 -14 6 -30q10 22 0 44q-14 16 -34 10q-10 14 -24 12q-16 0 -22 -14q-18 4 -30 -10q-8 -18 0 -38q-2 18 6 28q10 8 22 2q2 -12 14 -20q4 -20 6 -52z" fill="url(#r13_dino)" stroke="#5a3f1a" stroke-opacity=".5" stroke-width="1.2"/><path d="M-20 4q20 -8 44 0" stroke="#5a3f1a" stroke-opacity=".55" stroke-width="2" fill="none"/><path d="M-2 -60q2 30 8 44" stroke="#fff6d8" stroke-opacity=".6" stroke-width="1.6" fill="none"/><ellipse cx="2" cy="12" rx="9" ry="7" fill="#8a4a1a" opacity=".5"/></g>`, 6, 8, 20);
  // copepode
  s += floaty(`<g transform="translate(470 220) rotate(-20)">` +
    `<path d="M26 -8q-60 -62 -150 -44M26 8q-58 44 -140 58" stroke="#b9705a" stroke-opacity=".8" stroke-width="2.6" fill="none" stroke-linecap="round"/>` +
    `<path d="M26 -8q-60 -62 -150 -44M26 8q-58 44 -140 58" stroke="#ffe3d6" stroke-opacity=".7" stroke-width="1" fill="none" transform="translate(0 -1)"/>` +
    `<path d="M-40 -34l-4 -10M-70 -44l-2 -11M-100 -46l0 -11M-40 46l-4 10M-70 58l-3 10M-10 12l-8 22M2 14l-6 24M14 14l-4 22" stroke="#c9806a" stroke-opacity=".7" stroke-width="1.3" fill="none"/>` +
    `<ellipse cx="4" cy="5" rx="42" ry="22" fill="#0c4a50" opacity=".25"/>` +
    `<path d="M40 0q-4 -22 -40 -22q-34 0 -42 22q8 22 42 22q36 0 40 -22z" fill="url(#r13_cop)"/>` +
    `<path d="M-42 0q-18 -8 -44 -6l-22 -12M-86 -6l-24 14M-42 0q-18 6 -44 -6" stroke="#e09a84" stroke-opacity=".9" stroke-width="5" fill="none" stroke-linecap="round"/>` +
    `<path d="M-20 -19q-6 19 0 38M-4 -22q-6 22 0 44M12 -21q-6 21 0 42" stroke="#a85a48" stroke-opacity=".45" stroke-width="1.4" fill="none"/>` +
    `<path d="M-30 2q20 8 46 0" stroke="#7a8a2a" stroke-opacity=".6" stroke-width="6" fill="none" stroke-linecap="round"/>` +
    `<circle cx="30" cy="-2" r="4" fill="#b01c1c"/><circle cx="29" cy="-3" r="1.2" fill="#ffb0a0"/>` +
    `<path d="M-30 -14q24 -10 54 0" stroke="#fff" stroke-opacity=".6" stroke-width="2.4" fill="none" stroke-linecap="round"/></g>`, 8, 6, 15);
  // uovo di pesce (supporto per l'oggetto) e piccole cellule
  s += `<circle cx="750" cy="760" r="24" fill="url(#r13_egg)"/><circle cx="756" cy="766" r="9" fill="#f0c060" opacity=".45"/>`;
  [[620, 150, 13], [860, 500, 11], [140, 700, 12], [420, 860, 10], [300, 430, 9], [650, 470, 8]].forEach(([x, y, q]) => { s += `<circle cx="${x}" cy="${y}" r="${q}" fill="url(#r13_egg)"/><circle cx="${x + 1}" cy="${y + 1}" r="${f(q * .45)}" fill="#7fae3a" opacity=".6"/>`; });
  // cellula verde di fitoplancton = portale
  s += `<circle cx="${PX}" cy="${PY}" r="112" fill="url(#r13_cell)"/>`;
  { let d = ''; for (let k = 0; k < 40; k++) { const a = k / 40 * TAU; d += `M${f(PX + Math.cos(a) * 78)} ${f(PY + Math.sin(a) * 78)}L${f(PX + Math.cos(a + .05) * (86 + r() * 9))} ${f(PY + Math.sin(a + .05) * (86 + r() * 9))}`; } s += `<path d="${d}" stroke="#c9f2a0" stroke-opacity=".4" stroke-width="1.2"/>`; }
  s += `<path d="M${PX - 72} ${PY - 22}A75 75 0 0 1 ${PX + 10} ${PY - 74}" stroke="#f2ffe0" stroke-opacity=".75" stroke-width="2.6" fill="none" stroke-linecap="round"/>`;
  return { defs, svg: s };
})();
