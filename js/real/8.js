// mondo 8: DNA — versione realistica (modello molecolare a sfere)
REAL[8] = (() => {
  let sd = 9908;
  const r = () => { sd = (sd * 1664525 + 1013904223) >>> 0; return sd / 4294967296; };
  const f = n => Math.round(n * 10) / 10, TAU = Math.PI * 2;
  const BG = '#5a2f8f', PC = '#14183f', P = [330, 500];
  const hx = c => [1, 3, 5].map(i => parseInt(c.slice(i, i + 2), 16));
  const mix = (a, b, t) => { const A = hx(a), B = hx(b); return '#' + A.map((v, i) => Math.round(v + (B[i] - v) * t).toString(16).padStart(2, '0')).join(''); };
  let defs = '', s = '';
  // materiali: 4 livelli di profondita' (0 = dietro, velato; 3 = davanti)
  const HAZE = '#4f2a82', LV = 4;
  const mats = { c: '#d9a765', p: '#e07a3c', o: '#c9483f', a: '#49a5a8', t: '#d8b548', g: '#58a96c', y: '#4c7fd2' };
  for (const k in mats) for (let l = 0; l < LV; l++) {
    const t = (1 - l / (LV - 1)) * 0.62, base = mix(mats[k], HAZE, t);
    const hi = mix(mix(base, '#ffffff', 0.62 - t * 0.5), HAZE, t * 0.3), dk = mix(base, '#1c0c38', 0.62);
    defs += `<radialGradient id="r8_${k}${l}" cx=".34" cy=".3" r=".78"><stop offset="0" stop-color="${hi}"/><stop offset=".38" stop-color="${base}"/><stop offset="1" stop-color="${dk}"/></radialGradient>`;
  }
  defs +=
    `<radialGradient id="r8_bg" gradientUnits="userSpaceOnUse" cx="400" cy="380" r="420"><stop offset="0" stop-color="#8457bd"/><stop offset=".5" stop-color="#6a3aa3"/><stop offset=".8" stop-color="${BG}"/><stop offset="1" stop-color="${BG}"/></radialGradient>` +
    `<radialGradient id="r8_bl"><stop offset="0" stop-color="#b48be0" stop-opacity=".5"/><stop offset=".6" stop-color="#9a6fd0" stop-opacity=".18"/><stop offset="1" stop-color="#9a6fd0" stop-opacity="0"/></radialGradient>` +
    `<radialGradient id="r8_bd"><stop offset="0" stop-color="#2f1458" stop-opacity=".55"/><stop offset="1" stop-color="#2f1458" stop-opacity="0"/></radialGradient>` +
    `<radialGradient id="r8_sh"><stop offset="0" stop-color="#1a0a35" stop-opacity=".5"/><stop offset="1" stop-color="#1a0a35" stop-opacity="0"/></radialGradient>` +
    `<radialGradient id="r8_pt" gradientUnits="userSpaceOnUse" cx="${P[0]}" cy="${P[1]}" r="92"><stop offset="0" stop-color="${PC}"/><stop offset=".71" stop-color="${PC}"/><stop offset=".745" stop-color="#aab8ff" stop-opacity=".85"/><stop offset=".82" stop-color="#7f8ff0" stop-opacity=".35"/><stop offset="1" stop-color="#7f8ff0" stop-opacity="0"/></radialGradient>` +
    `<radialGradient id="r8_vg" gradientUnits="userSpaceOnUse" cx="500" cy="500" r="500"><stop offset=".64" stop-color="${BG}" stop-opacity="0"/><stop offset=".8" stop-color="${BG}" stop-opacity=".85"/><stop offset=".9" stop-color="${BG}"/></radialGradient>`;
  s += `<rect width="1000" height="1000" fill="${BG}"/><circle cx="500" cy="500" r="420" fill="url(#r8_bg)"/>`;
  // nucleoplasma fuori fuoco
  for (let i = 0; i < 34; i++) {
    const a = r() * TAU, d = 40 + Math.sqrt(r()) * 290, R = 28 + r() * 70;
    s += `<circle cx="${f(500 + Math.cos(a) * d)}" cy="${f(500 + Math.sin(a) * d)}" r="${f(R)}" fill="url(#r8_${r() < 0.6 ? 'bl' : 'bd'})" opacity="${f(0.35 + r() * 0.5)}"/>`;
  }
  // ombra morbida proiettata dall'elica (in basso a destra)
  for (let y = 180; y <= 860; y += 85) s += `<ellipse cx="545" cy="${y + 30}" rx="210" ry="70" fill="url(#r8_sh)" opacity=".55"/>`;
  // elica
  const k = TAU / 360, ph = -Math.PI / 2 - k * 500, OFF = 0.62, AMP = 170;
  const th = y => k * y + ph;
  const A = y => [500 + AMP * Math.sin(th(y)), Math.cos(th(y))];
  const B = y => [500 + AMP * Math.sin(th(y) + Math.PI + OFF), Math.cos(th(y) + Math.PI + OFF)];
  const items = [];
  const add = (x, y, z, R, m) => items.push([x, y, z, R, m]);
  for (const S of [A, B]) for (let y = 34; y <= 966; y += 11.5) {
    const [x, z] = S(y), sc = 1 + z * 0.14;
    add(x + (r() - 0.5) * 5, y + (r() - 0.5) * 3, z, 15.5 * sc, 'c');
    const a = r() * TAU, d = 11 + r() * 5;
    add(x + Math.cos(a) * d, y + Math.sin(a) * d * 0.8, z + 0.08 + r() * 0.1, (8.5 + r() * 2.5) * sc, r() < 0.45 ? 'p' : 'o');
  }
  const prs = [['a', 't'], ['g', 'y'], ['t', 'a'], ['y', 'g']];
  for (let y = 44; y <= 960; y += 33.5) {
    const [xa, za] = A(y), [xb, zb] = B(y), [m1, m2] = prs[Math.floor(r() * 4)], n = 5;
    for (let i = 1; i <= 2 * n - 1; i++) {
      const t = i / (2 * n), x = xa + (xb - xa) * t, z = (za + (zb - za) * t) * 0.9 - 0.12;
      if (Math.abs(xb - xa) < 60 && i % 2) continue;
      add(x, y + Math.sin(t * Math.PI) * 2 + (r() - 0.5) * 2.5, z, (10.5 + r() * 1.5) * (1 + z * 0.12), t < 0.5 ? m1 : m2);
    }
  }
  items.sort((p, q) => p[2] - q[2]);
  for (const [x, y, z, R, m] of items) {
    if (Math.hypot(x - P[0], y - P[1]) < 60 - R) continue;
    const l = Math.max(0, Math.min(LV - 1, Math.round((z + 1) / 2 * (LV - 1))));
    s += `<circle cx="${f(x)}" cy="${f(y)}" r="${f(R)}" fill="url(#r8_${m}${l})"/>`;
  }
  // portale: atomo ingrandito (disco scuro con alone)
  s += `<ellipse cx="${P[0] + 14}" cy="${P[1] + 16}" rx="84" ry="80" fill="url(#r8_sh)"/>`;
  s += `<circle cx="${P[0]}" cy="${P[1]}" r="92" fill="url(#r8_pt)"><animate attributeName="opacity" values="1;.86;1" dur="5s" repeatCount="indefinite"/></circle><circle cx="${P[0]}" cy="${P[1]}" r="65" fill="${PC}"/>`;
  s += `<rect width="1000" height="1000" fill="url(#r8_vg)"/>`;
  return { defs, svg: s };
})();
