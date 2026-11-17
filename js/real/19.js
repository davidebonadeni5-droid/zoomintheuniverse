// mondo 19: vulcano visto dall'alto — versione realistica (cratere con lago di lava, colate, basalto, fumo)
REAL[19] = (() => {
  let sd = 19019;
  const r = () => { sd = (sd * 1664525 + 1013904223) >>> 0; return sd / 4294967296; };
  const f = n => Math.round(n * 10) / 10;
  const TAU = Math.PI * 2, BG = '#3b2a22', PC = '#14183f';
  const items = [[280, 620], [700, 330], [680, 680]];
  const P = (a, d) => [500 + Math.cos(a) * d, 500 + Math.sin(a) * d];
  const smooth = pts => {
    const n = pts.length, m = (a, b) => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
    let s0 = m(pts[n - 1], pts[0]), d = `M${f(s0[0])} ${f(s0[1])}`;
    for (let i = 0; i < n; i++) { const e = m(pts[i], pts[(i + 1) % n]); d += `Q${f(pts[i][0])} ${f(pts[i][1])} ${f(e[0])} ${f(e[1])}`; }
    return d + 'Z';
  };
  const blob = (cx, cy, R, j, n) => { const p = []; for (let i = 0; i < n; i++) { const a = i / n * TAU, d = R * (1 + (r() - 0.5) * 2 * j); p.push([cx + Math.cos(a) * d, cy + Math.sin(a) * d]); } return smooth(p); };
  const FL = [1.62, 3.62, 4.9, 0.05]; // angoli delle colate
  let defs = '', s = '';
  defs +=
    `<radialGradient id="r19_cone" gradientUnits="userSpaceOnUse" cx="500" cy="500" r="350"><stop offset=".4" stop-color="#5b4a40"/><stop offset=".6" stop-color="#4f3e35"/><stop offset=".82" stop-color="#43322a"/><stop offset="1" stop-color="${BG}"/></radialGradient>` +
    `<radialGradient id="r19_lit" gradientUnits="userSpaceOnUse" cx="365" cy="365" r="250"><stop offset="0" stop-color="#d8c2a8" stop-opacity=".2"/><stop offset="1" stop-color="#d8c2a8" stop-opacity="0"/></radialGradient>` +
    `<radialGradient id="r19_dark" gradientUnits="userSpaceOnUse" cx="640" cy="640" r="250"><stop offset="0" stop-color="#0d0705" stop-opacity=".42"/><stop offset="1" stop-color="#0d0705" stop-opacity="0"/></radialGradient>` +
    `<radialGradient id="r19_glow" gradientUnits="userSpaceOnUse" cx="500" cy="500" r="275"><stop offset=".5" stop-color="#ff6a1a" stop-opacity=".4"/><stop offset=".72" stop-color="#ff5a14" stop-opacity=".13"/><stop offset="1" stop-color="#ff5a14" stop-opacity="0"/></radialGradient>` +
    `<linearGradient id="r19_rim" gradientUnits="userSpaceOnUse" x1="370" y1="370" x2="630" y2="630"><stop offset="0" stop-color="#9c8676"/><stop offset=".5" stop-color="#63504a"/><stop offset="1" stop-color="#2c1f1b"/></linearGradient>` +
    `<radialGradient id="r19_wall" gradientUnits="userSpaceOnUse" cx="500" cy="500" r="160"><stop offset=".74" stop-color="#ff8a24"/><stop offset=".8" stop-color="#b03c0e"/><stop offset=".88" stop-color="#4a2012"/><stop offset="1" stop-color="#1d120e"/></radialGradient>` +
    `<linearGradient id="r19_wsh" gradientUnits="userSpaceOnUse" x1="390" y1="390" x2="610" y2="610"><stop offset="0" stop-color="#080403" stop-opacity=".6"/><stop offset=".5" stop-color="#080403" stop-opacity=".1"/><stop offset="1" stop-color="#c89a78" stop-opacity=".22"/></linearGradient>` +
    `<radialGradient id="r19_lake" gradientUnits="userSpaceOnUse" cx="500" cy="500" r="124"><stop offset=".5" stop-color="#b82a08"/><stop offset=".72" stop-color="#f25a12"/><stop offset=".9" stop-color="#ffab30"/><stop offset="1" stop-color="#ffe684"/></radialGradient>` +
    `<radialGradient id="r19_port" gradientUnits="userSpaceOnUse" cx="500" cy="500" r="75"><stop offset="0" stop-color="${PC}"/><stop offset=".87" stop-color="${PC}"/><stop offset=".95" stop-color="#1b1528"/><stop offset="1" stop-color="#2a1616"/></radialGradient>` +
    `<radialGradient id="r19_smk" cx=".42" cy=".4" r=".6"><stop offset="0" stop-color="#f1ece6" stop-opacity=".9"/><stop offset=".45" stop-color="#b9b1aa" stop-opacity=".55"/><stop offset="1" stop-color="#8d857f" stop-opacity="0"/></radialGradient>` +
    `<radialGradient id="r19_ssh" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#0c0605" stop-opacity=".4"/><stop offset="1" stop-color="#0c0605" stop-opacity="0"/></radialGradient>`;

  s += `<rect width="1000" height="1000" fill="${BG}"/>`;
  // chiazze di cenere / vecchie colate attorno
  for (let i = 0; i < 10; i++) { const [x, y] = P(r() * TAU, 250 + r() * 200); s += `<path d="${blob(x, y, 30 + r() * 45, 0.35, 8)}" fill="${r() < 0.5 ? '#2c1f19' : '#4a382e'}" opacity=".3"/>`; }
  s += `<circle cx="500" cy="500" r="350" fill="url(#r19_cone)"/>`;
  // vecchie colate raffreddate (lingue scure)
  for (let i = 0; i < 6; i++) {
    const a = 0.6 + i * 1.05 + r() * 0.3, pts = [], L = 150 + r() * 130, w0 = 14 + r() * 12;
    const lf = [], rt = [];
    for (let k = 0; k <= 6; k++) { const t = k / 6, d = 160 + L * t, aa = a + Math.sin(t * 3 + i) * 0.07, w = w0 * (0.7 + t * 0.9) / d; lf.push(P(aa - w, d)); rt.unshift(P(aa + w, d)); }
    pts.push(...lf, P(a + 0.05, 160 + L + 14), ...rt);
    s += `<path d="${smooth(pts)}" fill="#261a16" opacity="${f(0.3 + r() * 0.25)}"/>`;
  }
  // creste e canaloni radiali (luce da nord-ovest)
  for (let i = 0; i < 110; i++) {
    const a = i / 110 * TAU + (r() - 0.5) * 0.08, r0 = 158 + r() * 40, r1 = 250 + r() * 85, da = 0.014 + r() * 0.022;
    const b = (Math.sin(a) - Math.cos(a)) * 0.707; // lato +tangente verso la luce
    const [ax, ay] = P(a, r0), [bx, by] = P(a + (r() - 0.5) * 0.04, r1), [cx, cy] = P(a + da, r1 * 0.97), [dx, dy] = P(a - da, r1 * 0.97);
    const lit = (v, x, y) => `<path d="M${f(ax)} ${f(ay)}L${f(bx)} ${f(by)}L${f(x)} ${f(y)}Z" fill="${v > 0 ? '#a48c78' : '#140c09'}" opacity="${f(0.03 + Math.abs(v) * (v > 0 ? 0.13 : 0.2))}"/>`;
    s += lit(b, cx, cy) + lit(-b, dx, dy);
  }
  s += `<circle cx="500" cy="500" r="350" fill="url(#r19_lit)"/><circle cx="500" cy="500" r="350" fill="url(#r19_dark)"/>`;
  // depositi di zolfo vicino all'orlo
  for (let i = 0; i < 7; i++) { const [x, y] = P(r() * TAU, 178 + r() * 26); s += `<path d="${blob(x, y, 9 + r() * 12, 0.4, 7)}" fill="#c9b04a" opacity="${f(0.14 + r() * 0.14)}"/>`; }
  s += `<circle cx="500" cy="500" r="275" fill="url(#r19_glow)"/>`;
  // sassi e blocchi di basalto
  for (let i = 0; i < 95; i++) {
    const a = r() * TAU, d = 182 + Math.pow(r(), 0.8) * 230, [x, y] = P(a, d), q = 1.2 + r() * r() * 5.5;
    if (items.some(([ix, iy]) => Math.hypot(x - ix, y - iy) < 36)) continue;
    if (FL.some(fa => Math.abs(Math.atan2(Math.sin(a - fa), Math.cos(a - fa))) < 0.16) && d < 345) continue;
    s += `<ellipse cx="${f(x + q * 0.5)}" cy="${f(y + q * 0.5)}" rx="${f(q * 1.15)}" ry="${f(q * 0.9)}" fill="#0f0806" opacity=".45"/><ellipse cx="${f(x)}" cy="${f(y)}" rx="${f(q)}" ry="${f(q * 0.78)}" fill="${['#6f5d52', '#55453c', '#83705f', '#3a2c26'][(r() * 4) | 0]}" transform="rotate(${f(r() * 180)} ${f(x)} ${f(y)})"/>`;
  }
  // --- orlo e parete interna del cratere ---
  s += `<path d="${blob(503, 503, 176, 0.035, 22)}" fill="#120a08" opacity=".45"/>`;
  s += `<path d="${blob(500, 500, 171, 0.04, 22)}" fill="url(#r19_rim)"/>`;
  s += `<path d="${blob(500, 500, 153, 0.035, 20)}" fill="url(#r19_wall)"/>`;
  for (let i = 0; i < 26; i++) { // strati e canalini sulla parete
    const a = i / 26 * TAU + r() * 0.15, [x1, y1] = P(a, 128), [x2, y2] = P(a + (r() - 0.5) * 0.08, 150);
    s += `<path d="M${f(x1)} ${f(y1)}L${f(x2)} ${f(y2)}" stroke="${r() < 0.5 ? '#0e0705' : '#7a5038'}" stroke-width="${f(1 + r() * 2.4)}" opacity=".4" stroke-linecap="round"/>`;
  }
  s += `<circle cx="500" cy="500" r="151" fill="url(#r19_wsh)"/>`;
  // --- lago di lava con crosta a placche ---
  s += `<path d="${blob(500, 500, 124, 0.02, 18)}" fill="url(#r19_lake)"/>`;
  [[78, 98, 11], [101, 119, 15]].forEach(([ra, rb, n], ring) => {
    const off = r() * TAU;
    for (let i = 0; i < n; i++) {
      if (r() < 0.1) continue;
      const a0 = off + (i + (r() - 0.5) * 0.45) / n * TAU, a1 = off + (i + 1 + (r() - 0.5) * 0.3) / n * TAU, g = 1.6 + r() * 1.6;
      const j = () => (r() - 0.5) * 7;
      const pts = [P(a0 + g / ra, ra + 1.5 + j()), P((a0 + a1) / 2, ra + 1 + j()), P(a1 - g / ra, ra + 1.5 + j()), P(a1 - g / rb, rb - 1.5 + j()), P((a0 + a1) / 2 + j() * 0.01, rb - 1 + j()), P(a0 + g / rb, rb - 1.5 + j())];
      s += `<path d="M${pts.map(p => f(p[0]) + ' ' + f(p[1])).join('L')}Z" fill="${['#2a1c18', '#1f1412', '#34241e', '#241a1c'][(r() * 4) | 0]}" opacity="${f(0.86 + r() * 0.12)}"/>`;
    }
  });
  // zampilli incandescenti sul bordo del lago
  for (let i = 0; i < 6; i++) { const [x, y] = P(r() * TAU, 119 + r() * 4); s += `<circle cx="${f(x)}" cy="${f(y)}" r="${f(3 + r() * 3)}" fill="#fff3b0" opacity=".85"/>`; }
  // condotto centrale (portale)
  s += `<circle cx="500" cy="500" r="77.5" fill="none" stroke="#ffb53a" stroke-width="2.2" opacity=".9"><animate attributeName="opacity" values=".9;.55;.9" dur="5s" repeatCount="indefinite"/></circle>`;
  s += `<circle cx="500" cy="500" r="75" fill="url(#r19_port)"/>`;
  // --- colate di lava attive ---
  FL.forEach((a, i) => {
    const L = 165 + r() * 25, n = 9, c = [], ph = r() * 6, amp = 0.05 + r() * 0.05;
    for (let k = 0; k <= n; k++) { const t = k / n; c.push([a + Math.sin(t * 5 + ph) * amp * t * 1.6, 132 + L * t, t]); }
    const poly = sc => {
      const lf = [], rt = [];
      c.forEach(([aa, d, t]) => { const w = (9 + 5 * Math.sin(t * 9 + ph) * t + 9 * t * t) * sc / d; lf.push(P(aa - w, d)); rt.unshift(P(aa + w, d)); });
      const e = c[n]; return smooth([...lf, P(e[0], e[1] + 9 * sc + 3), ...rt, P(c[0][0], c[0][1] - 4)]);
    };
    const [x1, y1] = P(a, 132), [x2, y2] = P(c[n][0], 132 + L + 12);
    defs += `<linearGradient id="r19_f${i}" gradientUnits="userSpaceOnUse" x1="${f(x1)}" y1="${f(y1)}" x2="${f(x2)}" y2="${f(y2)}"><stop offset="0" stop-color="#ffd45a"/><stop offset=".3" stop-color="#ff8418"/><stop offset=".65" stop-color="#d23a08"/><stop offset="1" stop-color="#6a1606"/></linearGradient>` +
      `<linearGradient id="r19_h${i}" gradientUnits="userSpaceOnUse" x1="${f(x1)}" y1="${f(y1)}" x2="${f(x2)}" y2="${f(y2)}"><stop offset="0" stop-color="#fffbd0"/><stop offset=".4" stop-color="#ffc040"/><stop offset=".8" stop-color="#ff7a18" stop-opacity=".5"/><stop offset="1" stop-color="#ff7a18" stop-opacity="0"/></linearGradient>`;
    s += `<path d="${poly(2.7)}" fill="#ff5a12" opacity=".14"/><path d="${poly(1.75)}" fill="#150d0b" opacity=".92"/><path d="${poly(1.45)}" fill="#3a1a10" opacity=".8"/><path d="${poly(1)}" fill="url(#r19_f${i})"/><path d="${poly(0.42)}" fill="url(#r19_h${i})"/>`;
    s += `<path d="M${c.map(([aa, d]) => P(aa, d).map(f).join(' ')).join('L')}" fill="none" stroke="#2a120a" stroke-width="2.4" stroke-dasharray="${f(2 + r() * 3)} ${f(11 + r() * 8)} 5 17" opacity=".5" stroke-linecap="round"/>`;
  });
  // --- fumo e gas (spinti dal vento verso nord-ovest) ---
  for (let k = 0; k < 8; k++) {
    const d = 118 + k * 34, a = 3.93 + (r() - 0.5) * 0.4 + k * 0.03, [x, y] = P(a, d), q = 36 + k * 9 + r() * 8;
    if (k > 1) s += `<ellipse cx="${f(x + 34)}" cy="${f(y + 34)}" rx="${f(q * 0.9)}" ry="${f(q * 0.75)}" fill="url(#r19_ssh)" opacity="${f(0.7 - k * 0.07)}"/>`;
    s += `<circle cx="${f(x)}" cy="${f(y)}" r="${f(q)}" fill="url(#r19_smk)" opacity="${f(0.62 - k * 0.06)}">` +
      (k % 2 === 0 ? `<animateTransform attributeName="transform" type="translate" values="0 0;${f(-10 - k * 2)} ${f(-9 - k * 2)};0 0" dur="${14 + k * 2}s" repeatCount="indefinite"/>` : '') + `</circle>`;
  }
  // sbuffi minori dalle fumarole
  [[5.6, 176], [2.2, 180], [0.9, 172]].forEach(([a, d]) => { const [x, y] = P(a, d); s += `<circle cx="${f(x)}" cy="${f(y)}" r="20" fill="url(#r19_smk)" opacity=".35"/>`; });
  return { defs, svg: s };
})();
