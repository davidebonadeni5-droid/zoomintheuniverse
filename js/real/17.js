// mondo 17: Marte, versione realistica
REAL[17] = (() => {
  let seed = 170207;
  const r = () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; };
  const f = n => (Math.round(n * 10) / 10).toString();
  const TAU = Math.PI * 2, R = 300, P = [450, 520];
  const ITEMS = [[600, 380], [560, 660], [330, 400]];
  const dist = (x, y, p) => Math.hypot(x - p[0], y - p[1]);
  function blob(cx, cy, rx, ry, k, n, rot = 0) {
    const ph = [r() * TAU, r() * TAU, r() * TAU, r() * TAU], pts = [], c = Math.cos(rot), sn = Math.sin(rot);
    for (let i = 0; i < n; i++) {
      const a = i / n * TAU;
      const m = 1 + k * (0.5 * Math.sin(2 * a + ph[0]) + 0.3 * Math.sin(3 * a + ph[1]) + 0.25 * Math.sin(5 * a + ph[2]) + 0.18 * Math.sin(8 * a + ph[3]) + 0.14 * (r() - 0.5));
      const u = Math.cos(a) * rx * m, v = Math.sin(a) * ry * m;
      pts.push([cx + u * c - v * sn, cy + u * sn + v * c]);
    }
    let d = '';
    for (let i = 0; i < n; i++) {
      const p = pts[i], q = pts[(i + 1) % n], mx = (p[0] + q[0]) / 2, my = (p[1] + q[1]) / 2;
      d += (i ? '' : `M${f((pts[n - 1][0] + p[0]) / 2)} ${f((pts[n - 1][1] + p[1]) / 2)}`) + `Q${f(p[0])} ${f(p[1])} ${f(mx)} ${f(my)}`;
    }
    return d + 'Z';
  }
  let s = `<rect width="1000" height="1000" fill="#02020a"/>`;
  const sc = ['#ffffff', '#ffffff', '#cfe0ff', '#ffe9c9', '#bcd0ff'];
  for (let i = 0; i < 80; i++) {
    const x = r() * 1000, y = r() * 1000, m = r();
    if (dist(x, y, [500, 500]) < 340) continue;
    s += `<circle cx="${f(x)}" cy="${f(y)}" r="${f(m > 0.95 ? 1.3 : 0.4 + r() * 0.5)}" fill="${sc[(r() * 5) | 0]}" opacity="${f(0.2 + m * 0.55)}"/>`;
  }
  const defs =
    `<clipPath id="r17_disc"><circle cx="500" cy="500" r="${R}"/></clipPath>` +
    `<radialGradient id="r17_base" gradientUnits="userSpaceOnUse" cx="500" cy="500" r="335" fx="395" fy="385"><stop offset="0" stop-color="#e3a673"/><stop offset=".35" stop-color="#d08a56"/><stop offset=".7" stop-color="#b9683c"/><stop offset="1" stop-color="#8f4526"/></radialGradient>` +
    `<radialGradient id="r17_dark"><stop offset="0" stop-color="#4f2c20" stop-opacity=".62"/><stop offset=".7" stop-color="#5a3122" stop-opacity=".45"/><stop offset="1" stop-color="#6a3a26" stop-opacity=".12"/></radialGradient>` +
    `<radialGradient id="r17_lite"><stop offset="0" stop-color="#f3c08e" stop-opacity=".5"/><stop offset="1" stop-color="#f3c08e" stop-opacity="0"/></radialGradient>` +
    `<radialGradient id="r17_ice"><stop offset="0" stop-color="#ffffff"/><stop offset=".75" stop-color="#f6f1ea"/><stop offset="1" stop-color="#ecd9c8" stop-opacity=".75"/></radialGradient>` +
    `<radialGradient id="r17_floor" cx=".6" cy=".6" r=".7"><stop offset="0" stop-color="#c98455"/><stop offset="1" stop-color="#96532f"/></radialGradient>` +
    `<radialGradient id="r17_night" gradientUnits="userSpaceOnUse" cx="385" cy="380" r="570"><stop offset=".5" stop-color="#02020a" stop-opacity="0"/><stop offset=".68" stop-color="#0a0308" stop-opacity=".32"/><stop offset=".8" stop-color="#02020a" stop-opacity=".8"/><stop offset=".88" stop-color="#02020a" stop-opacity=".97"/></radialGradient>` +
    `<radialGradient id="r17_limb" gradientUnits="userSpaceOnUse" cx="500" cy="500" r="${R}"><stop offset=".72" stop-color="#ffd9b0" stop-opacity="0"/><stop offset=".93" stop-color="#ffd2a8" stop-opacity=".2"/><stop offset="1" stop-color="#ffe6cc" stop-opacity=".5"/></radialGradient>` +
    `<radialGradient id="r17_atmo" gradientUnits="userSpaceOnUse" cx="500" cy="500" r="314"><stop offset=".94" stop-color="#f3bd96" stop-opacity=".4"/><stop offset=".965" stop-color="#e8a888" stop-opacity=".22"/><stop offset="1" stop-color="#c98a70" stop-opacity="0"/></radialGradient>` +
    `<radialGradient id="r17_oly" gradientUnits="userSpaceOnUse" cx="${P[0]}" cy="${P[1]}" r="128" fx="${P[0] - 30}" fy="${P[1] - 30}"><stop offset="0" stop-color="#e9b181"/><stop offset=".6" stop-color="#d9965f"/><stop offset=".9" stop-color="#c47c4b"/><stop offset="1" stop-color="#b96f41" stop-opacity="0"/></radialGradient>` +
    `<linearGradient id="r17_olysh" gradientUnits="userSpaceOnUse" x1="${P[0] - 90}" y1="${P[1] - 90}" x2="${P[0] + 90}" y2="${P[1] + 90}"><stop offset="0" stop-color="#ffe2bf" stop-opacity=".4"/><stop offset=".45" stop-color="#ffe2bf" stop-opacity="0"/><stop offset=".6" stop-color="#3c160b" stop-opacity="0"/><stop offset="1" stop-color="#3c160b" stop-opacity=".5"/></linearGradient>` +
    `<radialGradient id="r17_port" gradientUnits="userSpaceOnUse" cx="${P[0]}" cy="${P[1]}" r="92"><stop offset=".72" stop-color="#14183f"/><stop offset=".8" stop-color="#2a1a2c" stop-opacity=".85"/><stop offset=".88" stop-color="#6b3320" stop-opacity=".5"/><stop offset="1" stop-color="#b96f41" stop-opacity="0"/></radialGradient>` +
    `<linearGradient id="r17_prim" gradientUnits="userSpaceOnUse" x1="${P[0] - 65}" y1="${P[1] - 65}" x2="${P[0] + 65}" y2="${P[1] + 65}"><stop offset="0" stop-color="#05060f" stop-opacity=".7"/><stop offset=".45" stop-color="#14183f" stop-opacity="0"/><stop offset=".6" stop-color="#ffe3c0" stop-opacity="0"/><stop offset="1" stop-color="#ffe3c0" stop-opacity=".8"/></linearGradient>`;
  let g = `<circle cx="500" cy="500" r="${R}" fill="url(#r17_base)"/>`;
  // regioni chiare (Tharsis, Arabia, Hellas) e scure (Acidalia, Syrtis, Sirenum, Erythraeum)
  [[420, 560, 150, 130], [640, 420, 90, 70], [690, 700, 50, 40], [330, 330, 80, 60]].forEach(([x, y, a, b]) => g += `<ellipse cx="${x}" cy="${y}" rx="${a}" ry="${b}" fill="url(#r17_lite)"/>`);
  const DARK = [[625, 300, 80, 46, -0.3], [540, 262, 60, 22, 0.1], [742, 470, 30, 70, 0.2], [705, 520, 36, 30, 0.6], [520, 715, 120, 32, 0.08], [345, 690, 70, 30, -0.35], [655, 655, 70, 26, -0.25], [262, 590, 28, 60, 0.2], [600, 480, 44, 16, 0.3], [400, 285, 46, 16, -0.2]];
  DARK.forEach(([x, y, a, b, rot]) => {
    g += `<path d="${blob(x, y, a * 1.15, b * 1.2, 0.3, 28, rot)}" fill="#6a3823" opacity=".22"/><path d="${blob(x, y, a, b, 0.34, 28, rot)}" fill="url(#r17_dark)"/>`;
    for (let i = 0; i < 3; i++) g += `<path d="${blob(x + (r() - 0.5) * a * 1.4, y + (r() - 0.5) * b * 1.4, a * (0.2 + r() * 0.25), b * (0.25 + r() * 0.3), 0.4, 14, rot)}" fill="#45241a" opacity="${f(0.18 + r() * 0.16)}"/>`;
  });
  // screziature (strisce di polvere allungate est-ovest)
  for (let i = 0; i < 120; i++) {
    const a = r() * TAU, d = Math.sqrt(r()) * 290, x = 500 + Math.cos(a) * d, y = 500 + Math.sin(a) * d, q = 8 + r() * 30;
    g += `<ellipse cx="${f(x)}" cy="${f(y)}" rx="${f(q)}" ry="${f(q * (0.2 + r() * 0.35))}" transform="rotate(${f((r() - 0.5) * 50 + (x - 500) * (y - 500) / 1800)} ${f(x)} ${f(y)})" fill="${r() < 0.5 ? '#f6c898' : '#7a3f26'}" opacity="${f(0.05 + r() * 0.1)}"/>`;
  }
  // crateri
  const crater = (x, y, q) => {
    const d = dist(x, y, [500, 500]), sq = Math.max(0.28, Math.sqrt(Math.max(0, 1 - (d / R) ** 2))), ang = Math.atan2(y - 500, x - 500) * 180 / Math.PI;
    const t = `transform="rotate(${f(ang)} ${f(x)} ${f(y)})"`, o = q * 0.13;
    let c = `<ellipse cx="${f(x + o)}" cy="${f(y + o)}" rx="${f(q * sq)}" ry="${f(q)}" ${t} fill="#f7d0a4" opacity=".5"/>` +
      `<ellipse cx="${f(x - o)}" cy="${f(y - o)}" rx="${f(q * sq)}" ry="${f(q)}" ${t} fill="#4a2012" opacity=".55"/>`;
    if (q > 2.4) c += `<ellipse cx="${f(x + o * 0.25)}" cy="${f(y + o * 0.25)}" rx="${f(q * 0.84 * sq)}" ry="${f(q * 0.84)}" ${t} fill="url(#r17_floor)" opacity=".9"/>`;
    return c;
  };
  const placed = [[535, 625, 22], [558, 585, 22], [580, 548, 22]];
  const VM0 = [612, 556], VM1 = [772, 596];
  const nearVM = (x, y) => x > 590 && x < 790 && Math.abs(y - (VM0[1] + (x - VM0[0]) * 0.25)) < 34;
  let n = 0, guard = 0;
  while (n < 62 && guard++ < 3000) {
    const a = r() * TAU, d = Math.sqrt(r()) * 286, x = 500 + Math.cos(a) * d, y = 500 + Math.sin(a) * d;
    if (y < 560 && r() > 0.45) continue;                    // emisfero sud più craterizzato
    const q = 2 + 13 * Math.pow(r(), 3);
    if (dist(x, y, P) < 140 + q || nearVM(x, y) || y < 255 || y > 770 || !ITEMS.every(p => dist(x, y, p) > 24 + q) || !placed.every(p => dist(x, y, p) > (q + p[2]) * 0.9)) continue;
    placed.push([x, y, q]); n++; g += crater(x, y, q);
  }
  // Valles Marineris: canyon ramificato
  const canyon = (x0, y0, x1, y1, W, nseg) => {
    const top = [], bot = [], L = Math.hypot(x1 - x0, y1 - y0), nx = -(y1 - y0) / L, ny = (x1 - x0) / L;
    for (let i = 0; i <= nseg; i++) {
      const q = i / nseg, w = (0.8 + W * Math.pow(Math.sin(Math.PI * (0.06 + q * 0.88)), 0.7)) * (0.7 + r() * 0.6), o = Math.sin(q * 5 + x0) * W * 0.5 + (r() - 0.5) * W * 0.5;
      const x = x0 + (x1 - x0) * q + nx * o, y = y0 + (y1 - y0) * q + ny * o;
      top.push([x - nx * w, y - ny * w]); bot.push([x + nx * w, y + ny * w]);
    }
    const pl = a => a.map(p => `${f(p[0])} ${f(p[1])}`).join('L');
    const poly = `M${pl(top)}L${pl(bot.slice().reverse())}Z`;
    return `<path d="${poly}" fill="none" stroke="#7a3b22" stroke-width="5" stroke-linejoin="round" opacity=".4"/><path d="${poly}" fill="#5e2b19" opacity=".82"/><path d="M${pl(top)}" fill="none" stroke="#2c110a" stroke-width="${f(Math.max(1.2, W * 0.45))}" stroke-linejoin="round" opacity=".4" transform="translate(${f(nx * W * 0.25)} ${f(ny * W * 0.25)})"/><path d="M${pl(bot)}" fill="none" stroke="#f4c090" stroke-width="1.4" stroke-linejoin="round" opacity=".6"/>`;
  };
  g += canyon(VM0[0], VM0[1], VM1[0], VM1[1], 8.5, 22) + canyon(650, 550, 720, 562, 5, 9) + canyon(668, 588, 745, 606, 4.5, 9) + canyon(700, 566, 742, 548, 3.5, 6) + canyon(750, 590, 772, 560, 4, 5) + canyon(760, 598, 784, 630, 3.5, 5);
  // Noctis Labyrinthus: intreccio di fratture all'inizio del canyon
  for (let i = 0; i < 12; i++) { const x = 592 + r() * 30, y = 542 + r() * 26, a = r() * TAU, L = 6 + r() * 10; g += `<path d="M${f(x)} ${f(y)}l${f(Math.cos(a) * L)} ${f(Math.sin(a) * L)}" stroke="#4a1f12" stroke-width="${f(1.2 + r() * 1.4)}" stroke-linecap="round" opacity=".7"/>`; }
  // Tharsis Montes: tre vulcani a scudo in fila
  [[535, 625, 15], [558, 585, 14], [580, 548, 13]].forEach(([x, y, q]) => {
    g += `<circle cx="${x + 3}" cy="${y + 3}" r="${q + 3}" fill="#4a1f10" opacity=".3"/><circle cx="${x}" cy="${y}" r="${q + 2}" fill="#e2a878" opacity=".85"/><circle cx="${x - 2}" cy="${y - 2}" r="${q * 0.7}" fill="#efc095" opacity=".6"/><circle cx="${x - 0.6}" cy="${y - 0.6}" r="${f(q * 0.3)}" fill="#3a170c" opacity=".85"/><circle cx="${x + 0.5}" cy="${y + 0.5}" r="${f(q * 0.22)}" fill="#8d4a2b"/>`;
  });
  // calotte polari
  let caps = `<path d="${blob(500, 208, 150, 30, 0.12, 36)}" fill="#f1dccb" opacity=".45"/><path d="${blob(498, 202, 128, 24, 0.14, 36)}" fill="url(#r17_ice)"/>`;
  for (let i = 0; i < 7; i++) caps += `<path d="M${f(400 + i * 22 + r() * 10)} ${f(206 + r() * 14)}q${f(30 + r() * 30)} ${f(-8 - r() * 8)} ${f(60 + r() * 40)} ${f(-1 + r() * 4)}" fill="none" stroke="#c9a58e" stroke-width="${f(1 + r() * 1.6)}" opacity=".5" stroke-linecap="round"/>`;
  caps += `<path d="${blob(505, 795, 95, 16, 0.14, 30)}" fill="#f1dccb" opacity=".4"/><path d="${blob(506, 799, 74, 12, 0.16, 28)}" fill="#f8f3ec" opacity=".92"/>`;
  g += caps;
  // nubi di polvere e ghiaccio (lente)
  let cl = '';
  [[300, 470, 60, 9, -18], [690, 360, 70, 8, 14], [470, 345, 55, 7, -6], [610, 735, 60, 8, 8], [330, 610, 40, 6, 20]].forEach(([x, y, a, b, rot]) => {
    for (let i = 0; i < 4; i++) cl += `<ellipse cx="${f(x + (r() - 0.5) * a)}" cy="${f(y + (r() - 0.5) * b * 2)}" rx="${f(a * (0.4 + r() * 0.5))}" ry="${f(b * (0.5 + r() * 0.6))}" transform="rotate(${rot} ${x} ${y})" fill="#fff1df" opacity="${f(0.07 + r() * 0.08)}"/>`;
  });
  g += `<g>${cl}<animateTransform attributeName="transform" type="translate" values="0 0;6 1.5;0 0" dur="70s" repeatCount="indefinite"/></g>`;
  // Olympus Mons con la caldera-portale
  let oly = `<circle cx="${P[0] + 5}" cy="${P[1] + 5}" r="124" fill="#4a1f10" opacity=".22"/><path d="${blob(P[0], P[1], 150, 140, 0.16, 30)}" fill="#f0bd8d" opacity=".16"/><circle cx="${P[0]}" cy="${P[1]}" r="128" fill="url(#r17_oly)"/>`;
  for (let i = 0; i < 46; i++) { const a = (i + r()) / 46 * TAU, d0 = 80 + r() * 14, d1 = 100 + r() * 22; oly += `<path d="M${f(P[0] + Math.cos(a) * d0)} ${f(P[1] + Math.sin(a) * d0)}L${f(P[0] + Math.cos(a + 0.03) * d1)} ${f(P[1] + Math.sin(a + 0.03) * d1)}" stroke="${r() < 0.5 ? '#f6cfa3' : '#8a4a2a'}" stroke-width="${f(1 + r() * 2)}" stroke-linecap="round" opacity="${f(0.14 + r() * 0.16)}"/>`; }
  oly += `<circle cx="${P[0]}" cy="${P[1]}" r="118" fill="url(#r17_olysh)"/><path d="${blob(P[0], P[1], 121, 119, 0.05, 30)}" fill="none" stroke="#5a2815" stroke-width="3" opacity=".2" transform="translate(1.5 1.5)"/><path d="${blob(P[0], P[1], 120, 118, 0.05, 30)}" fill="none" stroke="#f7d2a8" stroke-width="1.4" opacity=".25"/>`;
  g += oly;
  g += `<circle cx="500" cy="500" r="${R}" fill="url(#r17_limb)"/><circle cx="500" cy="500" r="${R + 1}" fill="url(#r17_night)"/>`;
  g += `<circle cx="${P[0]}" cy="${P[1]}" r="92" fill="url(#r17_port)"/><circle cx="${P[0]}" cy="${P[1]}" r="67" fill="#14183f"/><circle cx="${P[0]}" cy="${P[1]}" r="71" fill="none" stroke="url(#r17_prim)" stroke-width="6"/>`;
  s += `<circle cx="500" cy="500" r="314" fill="url(#r17_atmo)"/><g clip-path="url(#r17_disc)">${g}</g>`;
  return { defs, svg: s };
})();
