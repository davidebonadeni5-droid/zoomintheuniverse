// mondo 3: Terra, versione realistica
REAL[3] = (() => {
  let seed = 4477;
  const r = () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; };
  const f = n => (Math.round(n * 10) / 10).toString();
  const TAU = Math.PI * 2, P1 = [565, 440], P2 = [430, 450];
  const dist = (x, y, p) => Math.hypot(x - p[0], y - p[1]);
  // macchia irregolare; keepIn: resta fuori dall'oceano-portale e (se main) contiene il portale-terra
  function blob(cx, cy, rx, ry, k, n, main) {
    const ph = [r() * TAU, r() * TAU, r() * TAU, r() * TAU], pts = [];
    for (let i = 0; i < n; i++) {
      const a = i / n * TAU;
      const m = 1 + k * (0.5 * Math.sin(2 * a + ph[0]) + 0.3 * Math.sin(3 * a + ph[1]) + 0.25 * Math.sin(5 * a + ph[2]) + 0.18 * Math.sin(9 * a + ph[3]) + 0.12 * (r() - 0.5));
      let x = cx + Math.cos(a) * rx * m, y = cy + Math.sin(a) * ry * m;
      if (main) { const d = dist(x, y, P1); if (d < 67) { x = P1[0] + (x - P1[0]) / d * 67; y = P1[1] + (y - P1[1]) / d * 67; } }
      const d2 = dist(x, y, P2); if (d2 < 67) { x = P2[0] + (x - P2[0]) / d2 * 67; y = P2[1] + (y - P2[1]) / d2 * 67; }
      pts.push([x, y]);
    }
    let d = '';
    for (let i = 0; i < n; i++) {
      const p = pts[i], q = pts[(i + 1) % n], mx = (p[0] + q[0]) / 2, my = (p[1] + q[1]) / 2;
      d += i ? `Q${f(p[0])} ${f(p[1])} ${f(mx)} ${f(my)}` : `M${f((pts[n - 1][0] + p[0]) / 2)} ${f((pts[n - 1][1] + p[1]) / 2)}Q${f(p[0])} ${f(p[1])} ${f(mx)} ${f(my)}`;
    }
    return d + 'Z';
  }
  let s = `<rect width="1000" height="1000" fill="#02020a"/>`;
  // stelle
  const sc = ['#ffffff', '#ffffff', '#cfe0ff', '#ffe9c9', '#bcd0ff'];
  for (let i = 0; i < 190; i++) {
    const x = r() * 1000, y = r() * 1000, m = r();
    if (dist(x, y, [500, 500]) < 250) continue;
    s += `<circle cx="${f(x)}" cy="${f(y)}" r="${f(m > 0.96 ? 1.4 : m > 0.85 ? 0.9 : 0.4 + r() * 0.4)}" fill="${sc[(r() * 5) | 0]}" opacity="${f(0.25 + m * 0.6)}"/>`;
  }
  // terre emerse
  const lands = [
    blob(583, 428, 108, 100, 0.26, 64, true),
    blob(612, 525, 58, 52, 0.3, 30), blob(540, 368, 52, 40, 0.3, 30),
    blob(372, 588, 62, 70, 0.32, 34), blob(383, 322, 52, 42, 0.34, 30),
    blob(655, 640, 40, 34, 0.3, 24), blob(330, 655, 26, 22, 0.35, 18),
    blob(700, 560, 9, 6.5, 0.25, 12), blob(688, 548, 3, 2.2, 0.2, 8), blob(452, 610, 6, 9, 0.3, 10), blob(300, 395, 7, 4, 0.3, 10),
  ];
  const landD = lands.join('');
  const caps = blob(500, 268, 128, 26, 0.16, 40) + blob(500, 734, 150, 34, 0.14, 44);
  let defs = `<clipPath id="r3_globe"><circle cx="500" cy="500" r="230"/></clipPath><clipPath id="r3_land"><path d="${landD}"/></clipPath>` +
    `<radialGradient id="r3_atmo" gradientUnits="userSpaceOnUse" cx="500" cy="500" r="268"><stop offset=".84" stop-color="#7cc4ff" stop-opacity=".0"/><stop offset=".86" stop-color="#8fd0ff" stop-opacity=".55"/><stop offset=".9" stop-color="#4a9df0" stop-opacity=".22"/><stop offset="1" stop-color="#2a6fd0" stop-opacity="0"/></radialGradient>` +
    `<radialGradient id="r3_ocean" gradientUnits="userSpaceOnUse" cx="430" cy="450" r="330"><stop offset=".22" stop-color="#2f80d0"/><stop offset=".42" stop-color="#2468b8"/><stop offset=".7" stop-color="#15478f"/><stop offset="1" stop-color="#0b2a63"/></radialGradient>` +
    `<radialGradient id="r3_city" gradientUnits="userSpaceOnUse" cx="565" cy="440" r="92"><stop offset=".71" stop-color="#6dbb5c"/><stop offset="1" stop-color="#6dbb5c" stop-opacity="0"/></radialGradient>` +
    `<linearGradient id="r3_night" gradientUnits="userSpaceOnUse" x1="337" y1="337" x2="663" y2="663"><stop offset=".66" stop-color="#01030c" stop-opacity="0"/><stop offset=".8" stop-color="#01030c" stop-opacity=".5"/><stop offset=".92" stop-color="#01030c" stop-opacity=".86"/><stop offset="1" stop-color="#01030c" stop-opacity=".95"/></linearGradient>` +
    `<radialGradient id="r3_limb" gradientUnits="userSpaceOnUse" cx="500" cy="500" r="230"><stop offset=".72" stop-color="#04163a" stop-opacity="0"/><stop offset=".93" stop-color="#04163a" stop-opacity=".4"/><stop offset=".975" stop-color="#6fb6ff" stop-opacity=".35"/><stop offset="1" stop-color="#bfe2ff" stop-opacity=".7"/></radialGradient>` +
    `<radialGradient id="r3_glint" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#eaf6ff" stop-opacity=".3"/><stop offset="1" stop-color="#eaf6ff" stop-opacity="0"/></radialGradient>` +
    `<radialGradient id="r3_puff" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#fff" stop-opacity=".95"/><stop offset=".5" stop-color="#fff" stop-opacity=".6"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient><radialGradient id="r3_moon" cx=".36" cy=".34" r=".72"><stop offset="0" stop-color="#eeeae2"/><stop offset=".55" stop-color="#b9b5ad"/><stop offset=".85" stop-color="#4c4a48"/><stop offset="1" stop-color="#121214"/></radialGradient>`;

  s += `<circle cx="500" cy="500" r="268" fill="url(#r3_atmo)"/>`;
  let g = `<circle cx="500" cy="500" r="232" fill="url(#r3_ocean)"/>`;
  // sfumature dell'oceano (correnti, fondali)
  for (let i = 0; i < 40; i++) {
    const a = r() * TAU, d = Math.sqrt(r()) * 225, x = 500 + Math.cos(a) * d, y = 500 + Math.sin(a) * d, rx = 14 + r() * 34;
    if (dist(x, y, P2) < 66 + rx) continue;
    g += `<ellipse cx="${f(x)}" cy="${f(y)}" rx="${f(rx)}" ry="${f(rx * (0.25 + r() * 0.3))}" fill="${r() < 0.5 ? '#0a2f70' : '#3a8fd8'}" opacity="${f(0.08 + r() * 0.1)}" transform="rotate(${f(r() * 50 - 25)} ${f(x)} ${f(y)})"/>`;
  }
  g += `<circle cx="352" cy="372" r="52" fill="url(#r3_glint)"/>`;
  // bassi fondali costieri + terra
  g += `<path d="${landD}" fill="none" stroke="#5fd0d8" stroke-opacity=".3" stroke-width="5" stroke-linejoin="round"/>`;
  g += `<ellipse cx="699" cy="559" rx="17" ry="12" fill="#55d6d2" opacity=".4"/>`;
  g += `<path d="${landD}" fill="#4f8a44"/>`;
  let t = '';
  const lc = ['#2f6a33', '#3b7a3a', '#274f2b', '#7fae58', '#b9a56a', '#cdb780', '#8a7a52', '#4d8d42'];
  for (let i = 0; i < 150; i++) {
    const a = r() * TAU, d = Math.sqrt(r()) * 225, x = 500 + Math.cos(a) * d, y = 500 + Math.sin(a) * d;
    const arid = Math.abs(y - 530) < 45 || y > 610 ? 0.65 : 0.12, c = r() < arid ? lc[4 + ((r() * 3) | 0)] : lc[(r() * 4) | 0], rx = 6 + r() * 22;
    t += `<ellipse cx="${f(x)}" cy="${f(y)}" rx="${f(rx)}" ry="${f(rx * (0.4 + r() * 0.5))}" fill="${c}" opacity="${f(0.22 + r() * 0.3)}" transform="rotate(${f(r() * 180)} ${f(x)} ${f(y)})"/>`;
  }
  // catene montuose: versante in luce + versante in ombra
  [[610, 345, 665, 400], [640, 470, 668, 520], [352, 560, 378, 630], [372, 305, 410, 318], [590, 535, 630, 560]].forEach(([x1, y1, x2, y2]) => {
    let d1 = '', d2 = '';
    for (let i = 0; i <= 7; i++) {
      const x = x1 + (x2 - x1) * i / 7 + (r() - 0.5) * 7, y = y1 + (y2 - y1) * i / 7 + (r() - 0.5) * 7;
      d1 += `${i ? 'L' : 'M'}${f(x - 1.2)} ${f(y - 1.2)}`; d2 += `${i ? 'L' : 'M'}${f(x + 1.4)} ${f(y + 1.4)}`;
    }
    t += `<path d="${d2}" fill="none" stroke="#3a2f22" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round" opacity=".45"/><path d="${d1}" fill="none" stroke="#e9e2d0" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" opacity=".6"/>`;
  });
  // fiumi
  t += `<path d="M640 410Q655 430 648 452T672 492" fill="none" stroke="#2c74c2" stroke-width="1.2" opacity=".6"/><path d="M392 560Q404 585 398 612" fill="none" stroke="#2c74c2" stroke-width="1.1" opacity=".6"/>`;
  t += `<circle cx="565" cy="440" r="92" fill="url(#r3_city)"/>`;
  g += `<g clip-path="url(#r3_land)">${t}</g>`;
  // calotte polari
  g += `<path d="${caps}" fill="#dfeefa" opacity=".5" transform="translate(0 0)" stroke="#dfeefa" stroke-width="10" stroke-opacity=".5"/><path d="${caps}" fill="#f6fbff"/>`;
  for (let i = 0; i < 16; i++) {
    const top = i < 7, x = 395 + r() * 210, y = top ? 262 + r() * 22 : 712 + r() * 40;
    g += `<ellipse cx="${f(x)}" cy="${f(y)}" rx="${f(8 + r() * 20)}" ry="${f(1.5 + r() * 3)}" fill="#a9c8e6" opacity="${f(0.25 + r() * 0.25)}"/>`;
  }
  // luci delle città sul lato notturno (sotto le nuvole)
  let lights = '';
  [[655, 640, 34], [628, 548, 30], [690, 500, 20]].forEach(([cx, cy, sp]) => {
    for (let i = 0; i < 12; i++) {
      const x = cx + (r() - 0.5) * 2 * sp, y = cy + (r() - 0.5) * 2 * sp;
      if ((x - 337 + y - 337) / 652 < 0.84) continue;
      lights += `<circle cx="${f(x)}" cy="${f(y)}" r="${f(0.5 + r() * 0.9)}" fill="#ffd98a" opacity="${f(0.5 + r() * 0.4)}"/>`;
    }
  });
  // nuvole: sistemi a bande e a spirale fatti di tanti fiocchi
  const puffs = [[], [], []];
  const puff = (x, y, rx, ry, rot, op, k) => {
    if (dist(x, y, [500, 500]) > 226 || dist(x, y, P1) < 70 + rx * 1.35 || dist(x, y, P2) < 70 + rx * 1.35) return;
    if (r() < 0.3) puffs[k].push(`<ellipse cx="${f(x + 2.5)}" cy="${f(y + 3)}" rx="${f(rx)}" ry="${f(ry)}" fill="#06204a" opacity=".16" transform="rotate(${f(rot)} ${f(x + 2.5)} ${f(y + 3)})"/>`);
    rx *= 1.35; ry *= 1.6; puffs[k].push(`<ellipse cx="${f(x)}" cy="${f(y)}" rx="${f(rx)}" ry="${f(ry)}" fill="url(#r3_puff)" opacity="${f(Math.min(1, op * 1.9))}" transform="rotate(${f(rot)} ${f(x)} ${f(y)})"/>`);
  };
  // spirali (cicloni)
  [[338, 548, 44, 1, 0], [640, 300, 34, -1, 1], [560, 640, 30, 1, 2]].forEach(([cx, cy, R, dir, k]) => {
    for (let arm = 0; arm < 2; arm++) for (let i = 0; i < 17; i++) {
      const q = i / 17, a = arm * Math.PI + dir * q * 4.4, d = 4 + q * R;
      const x = cx + Math.cos(a) * d + (r() - 0.5) * 4, y = cy + Math.sin(a) * d * 0.85 + (r() - 0.5) * 4;
      puff(x, y, 4 + q * 9 + r() * 3, 2.2 + q * 3.5, a * 180 / Math.PI + dir * 80, 0.5 - q * 0.25 + r() * 0.15, k);
    }
  });
  // bande curve
  [[300, 420, 470, 300, -28], [520, 300, 700, 350, 22], [310, 610, 480, 700, 30], [470, 560, 600, 600, -16], [600, 440, 720, 560, 30], [300, 480, 360, 300, 20], [420, 240, 600, 262, 8], [380, 690, 640, 700, -14]].forEach(([x1, y1, x2, y2, bend], bi) => {
    const n = 20, nx = -(y2 - y1), ny = x2 - x1, L = Math.hypot(nx, ny), rot = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
    for (let i = 0; i < n; i++) {
      const q = (i + r() * 0.8) / n, b = Math.sin(q * Math.PI) * bend + (r() - 0.5) * 16;
      puff(x1 + (x2 - x1) * q + nx / L * b, y1 + (y2 - y1) * q + ny / L * b, 6 + r() * 15, 2.5 + r() * 5, rot + (r() - 0.5) * 40, 0.22 + r() * 0.36, bi % 3);
    }
  });
  for (let i = 0; i < 40; i++) { const a = r() * TAU, d = Math.sqrt(r()) * 220; puff(500 + Math.cos(a) * d, 500 + Math.sin(a) * d, 3 + r() * 8, 2 + r() * 3.5, r() * 180, 0.2 + r() * 0.3, i % 3); }
  g += lights;
  const drift = [['5 1.5', 46], ['-4 2', 58], ['3 -2.5', 70]];
  puffs.forEach((p, k) => g += `<g>${p.join('')}<animateTransform attributeName="transform" type="translate" values="0 0;${drift[k][0]};0 0" dur="${drift[k][1]}s" repeatCount="indefinite"/></g>`);
  g += `<circle cx="500" cy="500" r="232" fill="url(#r3_limb)"/><circle cx="500" cy="500" r="232" fill="url(#r3_night)"/>`;
  s += `<g clip-path="url(#r3_globe)">${g}</g>`;
  // Luna
  s += `<circle cx="742" cy="262" r="17" fill="url(#r3_moon)"/>` +
    [[737, 256, 4.5, 3.2], [746, 262, 3, 3.6], [739, 268, 3.4, 2], [733, 262, 1.6, 1.6], [748, 254, 1.4, 1.2]].map(([x, y, a, b]) => `<ellipse cx="${x}" cy="${y}" rx="${a}" ry="${b}" fill="#55524e" opacity=".35"/>`).join('') +
    [[744, 270, 1], [735, 251, .8], [750, 266, .7]].map(([x, y, q]) => `<circle cx="${x}" cy="${y}" r="${q}" fill="#f4f1ea" opacity=".6"/>`).join('');
  return { defs, svg: s };
})();
