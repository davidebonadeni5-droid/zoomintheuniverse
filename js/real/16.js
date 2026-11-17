// mondo 16: Luna, versione realistica
REAL[16] = (() => {
  let seed = 160131;
  const r = () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; };
  const f = n => (Math.round(n * 10) / 10).toString();
  const TAU = Math.PI * 2, R = 300, P = [560, 440];
  const ITEMS = [[380, 330], [620, 640], [350, 620]];
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
    if (dist(x, y, [500, 500]) < 338) continue;
    s += `<circle cx="${f(x)}" cy="${f(y)}" r="${f(m > 0.95 ? 1.3 : 0.4 + r() * 0.5)}" fill="${sc[(r() * 5) | 0]}" opacity="${f(0.2 + m * 0.55)}"/>`;
  }
  const defs =
    `<clipPath id="r16_disc"><circle cx="500" cy="500" r="${R}"/></clipPath>` +
    `<radialGradient id="r16_base" gradientUnits="userSpaceOnUse" cx="500" cy="500" r="330" fx="400" fy="390"><stop offset="0" stop-color="#dcd9d2"/><stop offset=".5" stop-color="#c2bfb8"/><stop offset=".85" stop-color="#a09d97"/><stop offset="1" stop-color="#85837e"/></radialGradient>` +
    `<radialGradient id="r16_mare"><stop offset="0" stop-color="#55575e" stop-opacity=".8"/><stop offset=".7" stop-color="#5b5d63" stop-opacity=".66"/><stop offset="1" stop-color="#66676b" stop-opacity=".3"/></radialGradient>` +
    `<radialGradient id="r16_floor" cx=".6" cy=".6" r=".7"><stop offset="0" stop-color="#b9b6b0"/><stop offset=".6" stop-color="#a19f9a"/><stop offset="1" stop-color="#7d7b78"/></radialGradient>` +
    `<radialGradient id="r16_halo"><stop offset="0" stop-color="#f7f5ee" stop-opacity=".75"/><stop offset=".45" stop-color="#f1efe8" stop-opacity=".3"/><stop offset="1" stop-color="#f1efe8" stop-opacity="0"/></radialGradient>` +
    `<radialGradient id="r16_night" gradientUnits="userSpaceOnUse" cx="385" cy="380" r="560"><stop offset=".5" stop-color="#02020a" stop-opacity="0"/><stop offset=".68" stop-color="#02020a" stop-opacity=".3"/><stop offset=".8" stop-color="#02020a" stop-opacity=".78"/><stop offset=".88" stop-color="#02020a" stop-opacity=".97"/></radialGradient>` +
    `<radialGradient id="r16_limb" gradientUnits="userSpaceOnUse" cx="500" cy="500" r="${R}"><stop offset=".8" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#1a1a20" stop-opacity=".45"/></radialGradient>` +
    `<radialGradient id="r16_port" gradientUnits="userSpaceOnUse" cx="${P[0]}" cy="${P[1]}" r="104"><stop offset=".64" stop-color="#14183f"/><stop offset=".72" stop-color="#1b1e3c" stop-opacity=".9"/><stop offset=".8" stop-color="#3b3b44" stop-opacity=".55"/><stop offset=".87" stop-color="#e9e6de" stop-opacity=".5"/><stop offset="1" stop-color="#d8d5cd" stop-opacity="0"/></radialGradient>` +
    `<linearGradient id="r16_prim" gradientUnits="userSpaceOnUse" x1="${P[0] - 65}" y1="${P[1] - 65}" x2="${P[0] + 65}" y2="${P[1] + 65}"><stop offset="0" stop-color="#05060f" stop-opacity=".75"/><stop offset=".45" stop-color="#14183f" stop-opacity="0"/><stop offset=".6" stop-color="#fffdf4" stop-opacity="0"/><stop offset="1" stop-color="#fffdf4" stop-opacity=".85"/></linearGradient>`;
  let g = `<circle cx="500" cy="500" r="${R}" fill="url(#r16_base)"/>`;
  // screziature degli altopiani
  for (let i = 0; i < 110; i++) {
    const a = r() * TAU, d = Math.sqrt(r()) * 290, x = 500 + Math.cos(a) * d, y = 500 + Math.sin(a) * d, q = 6 + r() * 26;
    g += `<ellipse cx="${f(x)}" cy="${f(y)}" rx="${f(q)}" ry="${f(q * (0.4 + r() * 0.5))}" transform="rotate(${f(r() * 180)} ${f(x)} ${f(y)})" fill="${r() < 0.5 ? '#f3f0e8' : '#6d6c6c'}" opacity="${f(0.05 + r() * 0.09)}"/>`;
  }
  // mari: [cx, cy, rx, ry, rot]
  const MARIA = [[300, 455, 78, 135, 0.15], [418, 365, 88, 80, 0], [592, 348, 54, 50, 0], [648, 452, 60, 52, 0.5], [738, 400, 22, 36, 0.1], [706, 532, 34, 46, -0.2], [644, 575, 26, 26, 0], [452, 640, 62, 50, 0.3], [322, 562, 26, 30, 0], [480, 258, 135, 15, -0.03], [505, 450, 34, 22, 0.4], [372, 545, 50, 34, -0.3], [226, 520, 9, 20, 0.1]];
  MARIA.forEach(([x, y, a, b, rot]) => {
    g += `<path d="${blob(x, y, a * 1.08, b * 1.08, 0.2, 30, rot)}" fill="#5f6066" opacity=".3"/><path d="${blob(x, y, a, b, 0.24, 30, rot)}" fill="url(#r16_mare)"/>`;
  });
  const inMare = (x, y) => MARIA.some(([mx, my, a, b]) => ((x - mx) / a) ** 2 + ((y - my) / b) ** 2 < 0.9);
  // raggi
  const rays = (cx, cy, n, L0, L1, op) => {
    for (let i = 0; i < n; i++) {
      const a = (i + r() * 0.8) / n * TAU, L = L0 + r() * (L1 - L0), w = 0.008 + r() * 0.014;
      g += `<path d="M${cx} ${cy}L${f(cx + Math.cos(a - w) * L)} ${f(cy + Math.sin(a - w) * L)}L${f(cx + Math.cos(a + w) * L * 0.96)} ${f(cy + Math.sin(a + w) * L * 0.96)}Z" fill="#f6f4ec" opacity="${f(op * (0.6 + r() * 0.7))}"/>`;
    }
  };
  const TY = [468, 742];
  rays(TY[0], TY[1], 26, 110, 400, 0.075); rays(402, 482, 14, 40, 95, 0.09); rays(308, 468, 9, 25, 55, 0.09); rays(688, 668, 8, 30, 70, 0.07);
  // crateri
  const crater = (x, y, q, bright) => {
    const d = dist(x, y, [500, 500]), sq = Math.max(0.28, Math.sqrt(Math.max(0, 1 - (d / R) ** 2))), ang = Math.atan2(y - 500, x - 500) * 180 / Math.PI;
    const t = `transform="rotate(${f(ang)} ${f(x)} ${f(y)})"`, o = q * 0.13;
    let c = '';
    if (bright) c += `<ellipse cx="${f(x)}" cy="${f(y)}" rx="${f(q * 2.6 * sq)}" ry="${f(q * 2.6)}" ${t} fill="url(#r16_halo)" opacity="${f(bright)}"/>`;
    c += `<ellipse cx="${f(x + o)}" cy="${f(y + o)}" rx="${f(q * sq)}" ry="${f(q)}" ${t} fill="#fbf9f1" opacity=".62"/>` +
      `<ellipse cx="${f(x - o)}" cy="${f(y - o)}" rx="${f(q * sq)}" ry="${f(q)}" ${t} fill="#2f2f36" opacity=".6"/>`;
    if (q > 2.4) c += `<ellipse cx="${f(x + o * 0.25)}" cy="${f(y + o * 0.25)}" rx="${f(q * 0.84 * sq)}" ry="${f(q * 0.84)}" ${t} fill="url(#r16_floor)"/>`;
    if (q > 13) c += `<circle cx="${f(x + 1)}" cy="${f(y + 1)}" r="${f(q * 0.1)}" fill="#f4f1e9" opacity=".7"/><circle cx="${f(x - 0.5)}" cy="${f(y - 0.5)}" r="${f(q * 0.1)}" fill="#3a3a40" opacity=".5"/>`;
    return c;
  };
  const placed = [];
  const okSpot = (x, y, q) => dist(x, y, P) > 112 + q && ITEMS.every(p => dist(x, y, p) > 24 + q) && placed.every(p => dist(x, y, p) > (q + p[2]) * 0.8);
  let cr = '', n = 0, guard = 0;
  while (n < 128 && guard++ < 4000) {
    const a = r() * TAU, d = Math.sqrt(r()) * 288, x = 500 + Math.cos(a) * d, y = 500 + Math.sin(a) * d;
    const mare = inMare(x, y);
    if (mare && r() > 0.22) continue;
    if (!mare && y < 520 && r() > 0.6) continue;
    const q = 2 + 21 * Math.pow(r(), 3.2) * (mare ? 0.5 : 1);
    if (!okSpot(x, y, q)) continue;
    placed.push([x, y, q]); n++;
    cr += crater(x, y, q, mare && q < 6 ? 0.5 : 0);
  }
  g += cr;
  // crateri famosi: Tycho, Copernico, Keplero, Aristarco, Langrenus-like, Platone (fondo scuro)
  g += crater(TY[0], TY[1], 13.5, 0.9) + crater(402, 482, 13, 0.75) + crater(308, 468, 6.5, 0.8) + crater(288, 392, 6, 1) + crater(688, 668, 9, 0.6);
  g += `<ellipse cx="442" cy="287" rx="17" ry="9" fill="#f5f2ea" opacity=".5" transform="translate(1.6 1.6)"/><ellipse cx="442" cy="287" rx="17" ry="9" fill="#4b4c53"/>`;
  g += `<circle cx="500" cy="500" r="${R}" fill="url(#r16_limb)"/><circle cx="500" cy="500" r="${R + 1}" fill="url(#r16_night)"/>`;
  // cratere-portale: fondo in ombra profonda, bordo illuminato
  g += `<circle cx="${P[0]}" cy="${P[1]}" r="104" fill="url(#r16_port)"/><circle cx="${P[0]}" cy="${P[1]}" r="67" fill="#14183f"/><circle cx="${P[0]}" cy="${P[1]}" r="72" fill="none" stroke="url(#r16_prim)" stroke-width="7"/>`;
  s += `<g clip-path="url(#r16_disc)">${g}</g>`;
  return { defs, svg: s };
})();
