// mondo 15: Sangue — interno di un vaso sanguigno (versione realistica)
REAL[15] = (() => {
  let seed = 1515;
  const r = () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; };
  const f = (n) => Math.round(n * 10) / 10;
  const PX = 520, PY = 500, TAU = Math.PI * 2;
  const blob = (cx, cy, rad, wob, n) => {
    const pts = [];
    for (let i = 0; i < n; i++) { const a = i / n * TAU, q = rad * (1 + (r() - 0.5) * 2 * wob); pts.push([cx + Math.cos(a) * q, cy + Math.sin(a) * q]); }
    let p = '';
    for (let i = 0; i < n; i++) {
      const a = pts[i], b = pts[(i + 1) % n], mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2;
      p += i === 0 ? `M${f(mx)} ${f(my)}` : `Q${f(a[0])} ${f(a[1])} ${f(mx)} ${f(my)}`;
    }
    const a = pts[0], b = pts[1];
    return p + `Q${f(a[0])} ${f(a[1])} ${f((a[0] + b[0]) / 2)} ${f((a[1] + b[1]) / 2)}Z`;
  };
  let d = '', s = '';
  d += `<radialGradient id="r15_bg" gradientUnits="userSpaceOnUse" cx="470" cy="470" r="430"><stop offset="0" stop-color="#b03340"/><stop offset=".4" stop-color="#9c2835"/><stop offset=".76" stop-color="#8b1e2b"/><stop offset="1" stop-color="#8b1e2b"/></radialGradient>`;
  d += `<radialGradient id="r15_rbc" cx=".36" cy=".3" r=".8"><stop offset="0" stop-color="#f4626a"/><stop offset=".4" stop-color="#d9303d"/><stop offset=".8" stop-color="#a81c2a"/><stop offset="1" stop-color="#74101c"/></radialGradient>`;
  d += `<radialGradient id="r15_dim" cx=".42" cy=".4" r=".62"><stop offset="0" stop-color="#8a1420"/><stop offset=".55" stop-color="#a41b29"/><stop offset=".85" stop-color="#cf2d3a" stop-opacity=".7"/><stop offset="1" stop-color="#e44852" stop-opacity="0"/></radialGradient>`;
  d += `<radialGradient id="r15_far" cx=".4" cy=".35" r=".7"><stop offset="0" stop-color="#b93240"/><stop offset="1" stop-color="#761420"/></radialGradient>`;
  d += `<radialGradient id="r15_plt" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#fbe9c8"/><stop offset=".6" stop-color="#e2bd8c"/><stop offset="1" stop-color="#a87a55"/></radialGradient>`;
  d += `<radialGradient id="r15_wbc" gradientUnits="userSpaceOnUse" cx="${PX - 34}" cy="${PY - 40}" r="170"><stop offset="0" stop-color="#fbf8fd"/><stop offset=".5" stop-color="#e9dff1"/><stop offset=".8" stop-color="#cdbbdd"/><stop offset="1" stop-color="#a48fbb"/></radialGradient>`;
  d += `<radialGradient id="r15_halo" gradientUnits="userSpaceOnUse" cx="${PX}" cy="${PY}" r="160"><stop offset=".72" stop-color="#ffd9e0" stop-opacity=".32"/><stop offset="1" stop-color="#ffd9e0" stop-opacity="0"/></radialGradient>`;
  d += `<radialGradient id="r15_nuc" gradientUnits="userSpaceOnUse" cx="${PX}" cy="${PY}" r="84"><stop offset="0" stop-color="#5a2f8f"/><stop offset=".78" stop-color="#5a2f8f"/><stop offset=".92" stop-color="#4c2680"/><stop offset="1" stop-color="#351a5e"/></radialGradient>`;
  d += `<radialGradient id="r15_bub" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#fdfbfe"/><stop offset=".7" stop-color="#dccfe8"/><stop offset="1" stop-color="#a995c0"/></radialGradient>`;

  s += `<rect width="1000" height="1000" fill="#8b1e2b"/><rect width="1000" height="1000" fill="url(#r15_bg)"/>`;
  // globuli lontani, sfocati nella profondità del plasma
  for (let i = 0; i < 70; i++) {
    const a = r() * TAU, q = Math.sqrt(r()) * 440, sz = 7 + r() * 11;
    s += `<ellipse cx="${f(500 + Math.cos(a) * q)}" cy="${f(500 + Math.sin(a) * q)}" rx="${f(sz)}" ry="${f(sz * (0.35 + r() * 0.6))}" fill="url(#r15_far)" opacity="${f(0.3 + r() * 0.3)}" transform="rotate(${f(r() * 180)} ${f(500 + Math.cos(a) * q)} ${f(500 + Math.sin(a) * q)})"/>`;
  }
  // pulviscolo di proteine nel plasma
  let dots = '';
  for (let i = 0; i < 90; i++) { const a = r() * TAU, q = Math.sqrt(r()) * 430, rr = f(0.8 + r() * 1.8); dots += `M${f(500 + Math.cos(a) * q)} ${f(500 + Math.sin(a) * q)}h.01`; }
  s += `<path d="${dots}" stroke="#ffc2c9" stroke-width="3.4" stroke-linecap="round" opacity=".3"/>`;

  // globulo rosso: disco biconcavo
  const rbc = (sz, q, shadow) => {
    let o = '';
    if (shadow) o += `<ellipse cx="${f(sz * 0.14)}" cy="${f(sz * 0.2)}" rx="${f(sz)}" ry="${f(sz * q)}" fill="#3a060d" opacity=".3"/>`;
    o += `<ellipse rx="${f(sz)}" ry="${f(sz * q)}" fill="url(#r15_rbc)"/>`;
    if (q > 0.42) o += `<ellipse cx="${f(sz * 0.03)}" cy="${f(sz * q * 0.05)}" rx="${f(sz * 0.56)}" ry="${f(sz * q * 0.56)}" fill="url(#r15_dim)"/>`;
    else o += `<ellipse cx="0" cy="${f(sz * q * 0.3)}" rx="${f(sz * 0.8)}" ry="${f(sz * q * 0.35)}" fill="#6e0e19" opacity=".45"/>`;
    o += `<ellipse cx="${f(-sz * 0.48)}" cy="${f(-sz * q * 0.52)}" rx="${f(sz * 0.3)}" ry="${f(sz * q * 0.11)}" fill="#ffc9cc" opacity=".55" transform="rotate(-32 ${f(-sz * 0.48)} ${f(-sz * q * 0.52)})"/>`;
    return o;
  };
  const place = [];
  const free = (x, y, sz) => {
    if (Math.hypot(x - PX, y - PY) < 150 + sz) return false;
    for (const p of place) if (Math.hypot(x - p[0], y - p[1]) < (sz + p[2]) * 0.82) return false;
    return true;
  };
  // piano medio
  let n = 0, guard = 0;
  while (n < 46 && guard++ < 2000) {
    const a = r() * TAU, q = Math.sqrt(r()) * 430, x = 500 + Math.cos(a) * q, y = 500 + Math.sin(a) * q, sz = 22 + r() * 12;
    if (!free(x, y, sz)) continue;
    place.push([x, y, sz]); n++;
    s += `<g transform="translate(${f(x)} ${f(y)}) rotate(${f(r() * 70 - 35)})">${rbc(sz, 0.34 + r() * 0.62, false)}</g>`;
  }
  // piastrine
  for (let i = 0; i < 12; i++) {
    const a = r() * TAU, q = 170 + r() * 240, x = 500 + Math.cos(a) * q, y = 500 + Math.sin(a) * q;
    if (Math.hypot(x - PX, y - PY) < 160) continue;
    s += `<path d="${blob(x + 2, y + 3, 8, 0.3, 7)}" fill="#3a060d" opacity=".3"/><path d="${blob(x, y, 7.5, 0.3, 7)}" fill="url(#r15_plt)"/>`;
  }
  // globuli che scorrono lentamente (lontano dal portale)
  const lanes = [205, 262, 318, 690, 742, 800, 150, 850];
  lanes.forEach((y, i) => {
    const sz = 24 + r() * 10, dur = f(46 + r() * 30);
    s += `<g><g transform="rotate(${f(r() * 60 - 30)})">${rbc(sz, 0.5 + r() * 0.45, true)}</g><animateTransform attributeName="transform" type="translate" from="-90 ${y}" to="1090 ${f(y + (r() - 0.5) * 40)}" dur="${dur}s" begin="${f(-r() * dur)}s" repeatCount="indefinite"/></g>`;
  });
  // primo piano: globuli grandi con ombra
  n = 0; guard = 0;
  const near = [];
  while (n < 15 && guard++ < 3000) {
    const a = r() * TAU, q = 190 + r() * 230, x = 500 + Math.cos(a) * q, y = 500 + Math.sin(a) * q, sz = 40 + r() * 16;
    if (Math.hypot(x - PX, y - PY) < 150 + sz) continue;
    if (near.some(p => Math.hypot(x - p[0], y - p[1]) < (sz + p[2]) * 0.9)) continue;
    if ([[240, 300], [760, 720], [270, 720]].some(p => Math.hypot(x - p[0], y - p[1]) < sz + 30)) continue;
    near.push([x, y, sz]); n++;
    s += `<g transform="translate(${f(x)} ${f(y)}) rotate(${f(r() * 60 - 30)})">${rbc(sz, 0.5 + r() * 0.48, true)}</g>`;
  }

  // ---------- globulo bianco (linfocita) col nucleo = portale ----------
  s += `<circle cx="${PX}" cy="${PY}" r="160" fill="url(#r15_halo)"/>`;
  s += `<path d="${blob(PX + 12, PY + 16, 124, 0.06, 18)}" fill="#2a040a" opacity=".35"/>`;
  // microvilli / estroflessioni della membrana
  let villi = '';
  for (let i = 0; i < 44; i++) {
    const a = i / 44 * TAU + r() * 0.08, q = 116 + r() * 9, rr = 7 + r() * 7;
    villi += `<circle cx="${f(PX + Math.cos(a) * q)}" cy="${f(PY + Math.sin(a) * q)}" r="${f(rr)}" fill="url(#r15_bub)"/>`;
  }
  s += villi;
  s += `<path d="${blob(PX, PY, 118, 0.05, 20)}" fill="url(#r15_wbc)"/>`;
  // rilievi della superficie
  for (let i = 0; i < 46; i++) {
    const a = r() * TAU, q = 80 + r() * 30, x = PX + Math.cos(a) * q, y = PY + Math.sin(a) * q, rr = 4 + r() * 6;
    s += `<circle cx="${f(x + 1.5)}" cy="${f(y + 2)}" r="${f(rr)}" fill="#7d6a9a" opacity=".35"/><circle cx="${f(x)}" cy="${f(y)}" r="${f(rr)}" fill="url(#r15_bub)" opacity=".85"/>`;
  }
  // granuli del citoplasma
  let gr = '';
  for (let i = 0; i < 70; i++) { const a = r() * TAU, q = 74 + r() * 38; gr += `M${f(PX + Math.cos(a) * q)} ${f(PY + Math.sin(a) * q)}h.01`; }
  s += `<path d="${gr}" stroke="#8a6fb0" stroke-width="3.6" stroke-linecap="round" opacity=".5"/>`;
  // nucleo
  s += `<path d="${blob(PX + 3, PY + 4, 78, 0.03, 16)}" fill="#2c1550" opacity=".35"/>`;
  s += `<path d="${blob(PX, PY, 75, 0.035, 16)}" fill="url(#r15_nuc)"/>`;
  s += `<circle cx="${PX}" cy="${PY}" r="64" fill="#5a2f8f"/>`;
  s += `<path d="M${PX - 62} ${PY - 26}A67 67 0 0 1 ${PX - 26} ${PY - 62}" stroke="#a98ad6" stroke-width="5" fill="none" stroke-linecap="round" opacity=".55"/>`;
  s += `<path d="M${PX + 30} ${PY + 62}A69 69 0 0 0 ${PX + 62} ${PY + 30}" stroke="#241040" stroke-width="5" fill="none" stroke-linecap="round" opacity=".4"/>`;
  // riflesso sulla cellula
  s += `<ellipse cx="${PX - 72}" cy="${PY - 78}" rx="26" ry="9" fill="#fff" opacity=".5" transform="rotate(-45 ${PX - 72} ${PY - 78})"/>`;
  return { defs: d, svg: s };
})();
