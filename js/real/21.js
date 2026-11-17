// mondo 21: fiocco di neve — cristallo di ghiaccio in macrofotografia, versione realistica
REAL[21] = (() => {
  let sd = 2121;
  const r = () => { sd = (sd * 1664525 + 1013904223) >>> 0; return sd / 4294967296; };
  const f = n => Math.round(n * 10) / 10;
  const BG = '#8ec5ee', PC = '#14183f';
  const st = stops => stops.map(([o, c, op]) => `<stop offset="${o}" stop-color="${c}"${op == null ? '' : ` stop-opacity="${op}"`}/>`).join('');
  const rg = (id, a, stops) => `<radialGradient id="r21_${id}" ${a}>${st(stops)}</radialGradient>`;
  const lg = (id, a, stops) => `<linearGradient id="r21_${id}" ${a}>${st(stops)}</linearGradient>`;
  const US = 'gradientUnits="userSpaceOnUse"';
  const defs =
    rg('lit', `${US} cx="380" cy="340" r="420"`, [[0, '#e6f5ff', .5], [.6, '#cfeaff', .14], [1, '#cfeaff', 0]]) +
    rg('dark', `${US} cx="650" cy="660" r="340"`, [[0, '#3f86c8', .34], [1, '#3f86c8', 0]]) +
    rg('vig', `${US} cx="500" cy="500" r="720"`, [[.42, BG, 0], [.58, BG, 1], [1, BG]]) +
    rg('bk', 'cx=".5" cy=".5" r=".5"', [[0, '#fff', .55], [.8, '#fff', .7], [.93, '#fff', .9], [1, '#fff', 0]]) +
    rg('bk2', 'cx=".5" cy=".5" r=".5"', [[0, '#3d86c9', .5], [.85, '#3d86c9', .65], [1, '#3d86c9', 0]]) +
    rg('halo', `${US} cx="500" cy="500" r="330"`, [[0, '#2f6db3', .8], [.55, '#3f80c4', .5], [.85, '#5d9bd6', .18], [1, '#5d9bd6', 0]]) +
    rg('core', `${US} cx="0" cy="0" r="124"`, [[0, PC], [.6, PC], [.72, '#27386f'], [.84, '#86b6e2'], [.94, '#e3f3ff'], [1, '#ffffff']]) +
    rg('pglow', `${US} cx="500" cy="500" r="150"`, [[0, PC, .9], [.5, PC, .7], [.75, '#1c2a5e', .3], [1, '#1c2a5e', 0]]) +
    lg('sp', `${US} x1="0" y1="-14" x2="0" y2="14"`, [[0, '#ffffff', 1], [.22, '#dff0fd', .92], [.46, '#9cc7ec', .8], [.54, '#7fb2df', .8], [.8, '#e6f4ff', .92], [1, '#ffffff', 1]]) +
    lg('root', `${US} x1="80" y1="0" x2="215" y2="0"`, [[0, PC, .82], [.45, '#22407c', .4], [1, '#22407c', 0]]) +
    lg('br', 'x1="0" y1="0" x2="1" y2="1"', [[0, '#ffffff', .98], [.5, '#cfe6f9', .86], [1, '#f4fbff', .96]]) +
    rg('pl', 'cx=".36" cy=".32" r=".75"', [[0, '#ffffff', .98], [.55, '#cde5f8', .88], [1, '#8fbde6', .9]]) +
    rg('gl', 'cx=".5" cy=".5" r=".5"', [[0, '#fff', 1], [.35, '#fff', .55], [1, '#fff', 0]]);

  let s = `<rect width="1000" height="1000" fill="${BG}"/>`;
  s += `<circle cx="380" cy="340" r="420" fill="url(#r21_lit)"/><circle cx="650" cy="660" r="340" fill="url(#r21_dark)"/>`;
  // bokeh sfocato
  for (let i = 0; i < 26; i++) {
    const a = r() * 6.2832, d = 60 + Math.sqrt(r()) * 270, x = 500 + Math.cos(a) * d, y = 500 + Math.sin(a) * d;
    s += `<circle cx="${f(x)}" cy="${f(y)}" r="${f(26 + r() * 62)}" fill="url(#r21_${i % 3 ? 'bk' : 'bk2'})" opacity="${f(0.1 + r() * 0.2)}"/>`;
  }
  // fiocchi lontani fuori fuoco
  const star = (x, y, L, rot) => { let d = ''; for (let k = 0; k < 6; k++) { const a = rot + k * Math.PI / 3, c = Math.cos(a), n = Math.sin(a); d += `M${f(x)} ${f(y)}L${f(x + c * L)} ${f(y + n * L)}`; for (const g of [-1, 1]) { const b = a + g * 1.047; d += `M${f(x + c * L * .55)} ${f(y + n * L * .55)}l${f(Math.cos(b) * L * .32)} ${f(Math.sin(b) * L * .32)}`; } } return d; };
  for (const [x, y, L, rot, o] of [[345, 700, 34, .3, .3], [612, 236, 28, .9, .28], [236, 408, 22, .1, .24], [652, 800, 20, .5, .2], [806, 520, 24, .7, .22], [420, 196, 18, .2, .2]]) {
    const d = star(x, y, L, rot);
    s += `<path d="${d}" stroke="#fff" stroke-width="${f(L * .34)}" stroke-linecap="round" opacity="${f(o * .45)}" fill="none"/><path d="${d}" stroke="#fff" stroke-width="${f(L * .14)}" stroke-linecap="round" opacity="${o}" fill="none"/>`;
  }
  s += `<circle cx="500" cy="500" r="720" fill="url(#r21_vig)"/>`;
  s += `<circle cx="500" cy="500" r="330" fill="url(#r21_halo)"/>`;
  s += `<circle cx="500" cy="500" r="150" fill="url(#r21_pglow)"/>`;

  // un braccio del cristallo (coordinate locali, asse +x)
  const BR = [[112, 34], [142, 74], [172, 54], [206, 86], [238, 50], [264, 30], [284, 16]];
  const hexP = (cx, rad) => { let p = ''; for (let k = 0; k < 6; k++) p += `${f(cx + rad * Math.cos(k * Math.PI / 3))},${f(rad * Math.sin(k * Math.PI / 3))} `; return p.trim(); };
  const C6 = 0.5, S6 = Math.sqrt(3) / 2;
  let spineAll = `M84 0L302 0`, polys = '', ridge = '', shade = '', twig = '';
  for (const [x, L] of BR) for (const g of [-1, 1]) {
    const w = 3.5 + L * 0.075, ex = x + C6 * L, ey = g * S6 * L;
    spineAll += `M${x} 0L${f(ex)} ${f(ey)}`;
    // ramo affusolato con punta sfaccettata
    const nx = -g * S6, ny = C6; // normale al ramo
    const tx = x + C6 * L * .86, ty = g * S6 * L * .86;
    polys += `<polygon points="${f(x - w * 1.2)},0 ${f(tx + nx * w * .62)},${f(ty + g * ny * w * .62)} ${f(ex)},${f(ey)} ${f(tx - nx * w * .62)},${f(ty - g * ny * w * .62)} ${f(x + w * 1.2)},0" fill="url(#r21_br)"/>`;
    ridge += `M${x} 0L${f(ex)} ${f(ey)}`;
    shade += `M${f(x + w * 1.1)} ${f(g * 1.5)}L${f(tx - nx * w * .5)} ${f(ty - g * ny * w * .5)}`;
    if (L > 45) for (const u of [.45, .7]) {
      const bx = x + C6 * L * u, by = g * S6 * L * u, l2 = L * (u < .5 ? .3 : .2);
      twig += `M${f(bx)} ${f(by)}l${f(l2)} 0M${f(bx)} ${f(by)}l${f(-C6 * l2)} ${f(g * S6 * l2)}`;
    }
  }
  const arm = (ang, op) => {
    let a = `<g transform="translate(500 500) rotate(${ang})" opacity="${op}">`;
    a += `<path d="${spineAll}" stroke="#fff" stroke-width="26" stroke-linecap="round" opacity=".13" fill="none"/>`;
    a += `<path d="${spineAll}" transform="translate(4 7)" stroke="#1f5596" stroke-width="13" stroke-linecap="round" opacity=".36" fill="none"/>`;
    a += `<path d="${twig}" stroke="#f3faff" stroke-width="4.2" stroke-linecap="round" fill="none" opacity=".95"/>`;
    a += polys;
    a += `<path d="${shade}" stroke="#4d8cc6" stroke-width="1.2" opacity=".55" fill="none"/>`;
    a += `<polygon points="84,-15 150,-12 236,-8 286,-6 306,0 286,6 236,8 150,12 84,15" fill="url(#r21_sp)"/>`;
    a += `<polygon points="84,-15 150,-12 215,-9 215,9 150,12 84,15" fill="url(#r21_root)"/>`;
    a += `<path d="M84 -8L286 -3M84 8L286 3" stroke="#3f7fbd" stroke-width="1" opacity=".5" fill="none"/>`;
    a += `<path d="M96 0L302 0${ridge}" stroke="#fff" stroke-width="1.5" stroke-linecap="round" opacity=".95" fill="none"/>`;
    for (const [cx, rad] of [[142, 15], [206, 13.5], [290, 12]]) {
      a += `<polygon points="${hexP(cx, rad)}" fill="url(#r21_pl)" stroke="#fff" stroke-width="1.4" stroke-linejoin="round"/>`;
      a += `<polygon points="${hexP(cx, rad * .5)}" fill="#6fa6d8" opacity=".45"/>`;
    }
    a += `<circle cx="126" cy="-5" r="2.2" fill="#fff" opacity=".9"/><circle cx="252" cy="-2.5" r="1.6" fill="#fff" opacity=".9"/>`;
    return a + '</g>';
  };
  const A0 = 2.6;
  for (let k = 0; k < 6; k++) s += arm(A0 + k * 60, k % 2 ? .97 : 1);

  // piastra esagonale centrale con nucleo scuro
  s += `<g transform="translate(500 500) rotate(${A0})">`;
  s += `<polygon points="${hexP(0, 124)}" transform="translate(5 8)" fill="#2f6fb0" opacity=".22"/>`;
  s += `<polygon points="${hexP(0, 124)}" fill="url(#r21_core)" stroke="#fff" stroke-width="2.4" stroke-linejoin="round"/>`;
  for (let k = 0; k < 6; k++) {
    const a1 = k * Math.PI / 3, a2 = a1 + Math.PI / 3, p = (a, rad) => `${f(Math.cos(a) * rad)},${f(Math.sin(a) * rad)}`;
    s += `<polygon points="${p(a1, 90)} ${p(a1, 122)} ${p(a2, 122)} ${p(a2, 90)}" fill="${k % 2 ? '#ffffff' : '#2c5fa3'}" opacity="${k % 2 ? (k === 3 ? .34 : .2) : .16}"/>`;
  }
  let rl = '';
  for (let k = 0; k < 6; k++) { const a = k * Math.PI / 3; rl += `M${f(Math.cos(a) * 82)} ${f(Math.sin(a) * 82)}L${f(Math.cos(a) * 123)} ${f(Math.sin(a) * 123)}`; }
  s += `<path d="${rl}" stroke="#fff" stroke-width="1.6" opacity=".8" fill="none"/>`;
  s += `<polygon points="${hexP(0, 104)}" fill="none" stroke="#fff" stroke-width="1.3" opacity=".55"/>`;
  s += `<polygon points="${hexP(0, 82)}" fill="${PC}" stroke="#9cc6ee" stroke-width="1.6" stroke-opacity=".7" stroke-linejoin="round"/>`;
  s += `<path d="M-41 -71L41 -71" stroke="#dff1ff" stroke-width="2" stroke-linecap="round" opacity=".55"/>`;
  s += `</g>`;

  // cristallini di brina
  for (let i = 0; i < 70; i++) {
    const a = r() * 6.2832, d = 135 + r() * 200, x = 500 + Math.cos(a) * d, y = 500 + Math.sin(a) * d;
    s += `<circle cx="${f(x)}" cy="${f(y)}" r="${f(0.8 + r() * 2)}" fill="#fff" opacity="${f(0.35 + r() * 0.5)}"/>`;
  }
  // scintille
  const glint = (ang, rad, sz, dur) => {
    const t = (A0 + ang) * Math.PI / 180, x = f(500 + Math.cos(t) * rad), y = f(500 + Math.sin(t) * rad);
    return `<g opacity=".9"><circle cx="${x}" cy="${y}" r="${sz * 1.6}" fill="url(#r21_gl)"/><path d="M${x} ${f(y - sz * 3)}L${f(x + sz * .32)} ${f(y - sz * .32)}L${f(x + sz * 3)} ${y}L${f(x + sz * .32)} ${f(y + sz * .32)}L${x} ${f(y + sz * 3)}L${f(x - sz * .32)} ${f(y + sz * .32)}L${f(x - sz * 3)} ${y}L${f(x - sz * .32)} ${f(y - sz * .32)}Z" fill="#fff"/><animate attributeName="opacity" values=".95;.25;.95" dur="${dur}s" repeatCount="indefinite"/></g>`;
  };
  s += glint(240, 290, 6, 5) + glint(0, 206, 5, 7) + glint(120, 142, 4.5, 6) + glint(300, 250, 4, 8.5);
  return { defs, svg: s };
})();
