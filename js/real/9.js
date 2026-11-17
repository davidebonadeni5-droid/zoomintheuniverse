// mondo 9: atomo — versione realistica (nube di probabilita' elettronica)
REAL[9] = (() => {
  let sd = 9119;
  const r = () => { sd = (sd * 1664525 + 1013904223) >>> 0; return sd / 4294967296; };
  const f = n => Math.round(n * 10) / 10, TAU = Math.PI * 2;
  const BG = '#14183f';
  let defs = '', s = '';
  defs +=
    `<radialGradient id="r9_sh" gradientUnits="userSpaceOnUse" cx="500" cy="500" r="340"><stop offset=".2" stop-color="#6fc6ff" stop-opacity="0"/><stop offset=".3" stop-color="#6fc6ff" stop-opacity=".42"/><stop offset=".42" stop-color="#4a86ec" stop-opacity=".3"/><stop offset=".62" stop-color="#5b4fd0" stop-opacity=".16"/><stop offset=".85" stop-color="#4a3fb0" stop-opacity=".05"/><stop offset="1" stop-color="#4a3fb0" stop-opacity="0"/></radialGradient>` +
    `<radialGradient id="r9_lit" gradientUnits="userSpaceOnUse" cx="390" cy="380" r="260"><stop offset="0" stop-color="#bfe9ff" stop-opacity=".22"/><stop offset="1" stop-color="#bfe9ff" stop-opacity="0"/></radialGradient>` +
    `<radialGradient id="r9_lb"><stop offset="0" stop-color="#9fe4ff" stop-opacity=".5"/><stop offset=".45" stop-color="#58a8f5" stop-opacity=".24"/><stop offset="1" stop-color="#3d6fe0" stop-opacity="0"/></radialGradient>` +
    `<radialGradient id="r9_lv"><stop offset="0" stop-color="#c7b0ff" stop-opacity=".4"/><stop offset=".5" stop-color="#7a5fe0" stop-opacity=".18"/><stop offset="1" stop-color="#5a3fc0" stop-opacity="0"/></radialGradient>` +
    `<radialGradient id="r9_d"><stop offset="0" stop-color="#e6f8ff" stop-opacity=".95"/><stop offset=".35" stop-color="#8fd4ff" stop-opacity=".55"/><stop offset="1" stop-color="#5a9cf0" stop-opacity="0"/></radialGradient>` +
    `<radialGradient id="r9_dv"><stop offset="0" stop-color="#e9e0ff" stop-opacity=".8"/><stop offset=".4" stop-color="#9a86f0" stop-opacity=".4"/><stop offset="1" stop-color="#6a5ad0" stop-opacity="0"/></radialGradient>` +
    `<radialGradient id="r9_e"><stop offset="0" stop-color="#ffffff"/><stop offset=".16" stop-color="#d8f5ff"/><stop offset=".34" stop-color="#7fd3ff" stop-opacity=".6"/><stop offset="1" stop-color="#4a8cf0" stop-opacity="0"/></radialGradient>` +
    `<radialGradient id="r9_c" gradientUnits="userSpaceOnUse" cx="500" cy="500" r="130"><stop offset="0" stop-color="${BG}"/><stop offset=".5" stop-color="${BG}"/><stop offset=".56" stop-color="#ffb36b" stop-opacity=".3"/><stop offset=".75" stop-color="#ff9a5a" stop-opacity=".1"/><stop offset="1" stop-color="#ff9a5a" stop-opacity="0"/></radialGradient>` +
    `<linearGradient id="r9_or" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#bfeaff" stop-opacity=".55"/><stop offset=".5" stop-color="#7fb8ff" stop-opacity=".22"/><stop offset="1" stop-color="#6a7af0" stop-opacity=".08"/></linearGradient>`;
  s += `<rect width="1000" height="1000" fill="${BG}"/>`;
  s += `<circle cx="500" cy="500" r="340" fill="url(#r9_sh)"/><circle cx="390" cy="380" r="260" fill="url(#r9_lit)"/>`;
  // lobi degli orbitali (nubi morbide)
  [20, 80, 140].forEach((rot, i) => {
    for (const sg of [1, -1]) s += `<ellipse cx="${500 + sg * 196}" cy="500" rx="124" ry="${58 + i * 6}" fill="url(#r9_${i === 1 ? 'lv' : 'lb'})" opacity="${sg > 0 ? .8 : .6}" transform="rotate(${rot} 500 500)"/>`;
  });
  // densita' di probabilita': punti morbidi, piu' fitti vicino al nucleo
  for (let i = 0; i < 330; i++) {
    const a = r() * TAU, u = r() + r() + r(), d = 72 + Math.pow(u / 3, 1.7) * 430;
    if (d > 335) continue;
    const fade = 1 - (d - 72) / 290, R = 2.6 + r() * r() * 7;
    s += `<circle cx="${f(500 + Math.cos(a) * d)}" cy="${f(500 + Math.sin(a) * d)}" r="${f(R)}" fill="url(#r9_${r() < 0.75 ? 'd' : 'dv'})" opacity="${f(Math.max(0.12, (0.25 + r() * 0.7) * (0.35 + fade * 0.65)))}"/>`;
  }
  // nucleo: zona scura del portale con un tenue alone caldo
  s += `<circle cx="500" cy="500" r="130" fill="url(#r9_c)"/>`;
  // traiettorie ed elettroni
  const orbit = 'M800 500A300 108 0 1 1 200 500A300 108 0 1 1 800 500';
  [0, 60, 120].forEach((rot, i) => {
    s += `<g transform="rotate(${rot} 500 500)"><path d="${orbit}" fill="none" stroke="url(#r9_or)" stroke-width="2.2"/>` +
      `<circle r="26" fill="url(#r9_e)"><animateMotion dur="${[9, 13, 11][i]}s" begin="${-i * 3.1}s" repeatCount="indefinite" path="${orbit}"/></circle></g>`;
  });
  return { defs, svg: s };
})();
