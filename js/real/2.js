// mondo 2: Sistema solare, versione realistica
REAL[2] = (() => {
  let seed = 2033;
  const r = () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; };
  const f = n => (Math.round(n * 10) / 10).toString();
  const TAU = Math.PI * 2, P = [680.2, 373.8];
  const at = (rad, deg) => [500 + Math.cos(deg * Math.PI / 180) * rad, 500 + Math.sin(deg * Math.PI / 180) * rad];
  const dist = (x, y, p) => Math.hypot(x - p[0], y - p[1]);
  let defs = '', s = '';
  // ombra propria: luce dal Sole (centro scena)
  const shade = (id, x, y, rad) => {
    const d = Math.hypot(500 - x, 500 - y), ux = (500 - x) / d, uy = (500 - y) / d;
    defs += `<radialGradient id="${id}" gradientUnits="userSpaceOnUse" cx="${f(x + ux * rad * 0.55)}" cy="${f(y + uy * rad * 0.55)}" r="${f(rad * 1.7)}"><stop offset="0" stop-color="#fff" stop-opacity=".16"/><stop offset=".3" stop-color="#000" stop-opacity="0"/><stop offset=".62" stop-color="#000" stop-opacity=".5"/><stop offset="1" stop-color="#000" stop-opacity=".94"/></radialGradient>`;
    return `<circle cx="${f(x)}" cy="${f(y)}" r="${f(rad)}" fill="url(#${id})"/>`;
  };
  const spin = dur => `<animateTransform attributeName="transform" type="rotate" from="0 500 500" to="360 500 500" dur="${dur}s" repeatCount="indefinite"/>`;

  defs += `<radialGradient id="r2_zod" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#ffcf8a" stop-opacity=".2"/><stop offset=".4" stop-color="#c98a50" stop-opacity=".06"/><stop offset="1" stop-color="#03030c" stop-opacity="0"/></radialGradient>` +
    `<radialGradient id="r2_cor" cx=".5" cy=".5" r=".5"><stop offset=".3" stop-color="#fff6d0" stop-opacity="1"/><stop offset=".37" stop-color="#ffd27a" stop-opacity=".75"/><stop offset=".48" stop-color="#ff9a3a" stop-opacity=".3"/><stop offset=".7" stop-color="#ff7a20" stop-opacity=".08"/><stop offset="1" stop-color="#ff7a20" stop-opacity="0"/></radialGradient>` +
    `<radialGradient id="r2_sun" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#fffbe6"/><stop offset=".45" stop-color="#ffe793"/><stop offset=".78" stop-color="#ffbd3d"/><stop offset=".94" stop-color="#f58a14"/><stop offset="1" stop-color="#d9620a"/></radialGradient>` +
    `<radialGradient id="r2_port" gradientUnits="userSpaceOnUse" cx="${P[0]}" cy="${P[1]}" r="84"><stop offset=".78" stop-color="#02020a"/><stop offset="1" stop-color="#02020a" stop-opacity="0"/></radialGradient>` +
    `<radialGradient id="r2_spot" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#2a0d02" stop-opacity=".9"/><stop offset=".45" stop-color="#5a2204" stop-opacity=".7"/><stop offset="1" stop-color="#a04a08" stop-opacity="0"/></radialGradient>` +
    `<clipPath id="r2_sunc"><circle cx="500" cy="500" r="60"/></clipPath>`;

  s += `<rect width="1000" height="1000" fill="#03030c"/>`;
  // stelle
  const sc = ['#ffffff', '#ffffff', '#cfe0ff', '#ffe9c9', '#bcd0ff', '#ffd9b0'];
  for (let i = 0; i < 230; i++) {
    const x = r() * 1000, y = r() * 1000, m = r();
    if (dist(x, y, P) < 66 || dist(x, y, [500, 500]) < 90) continue;
    const rad = m > 0.97 ? 1.5 : m > 0.85 ? 1 : 0.4 + r() * 0.4;
    s += `<circle cx="${f(x)}" cy="${f(y)}" r="${f(rad)}" fill="${sc[(r() * 6) | 0]}" opacity="${f(0.25 + m * 0.6)}"/>`;
  }
  s += `<circle cx="500" cy="500" r="330" fill="url(#r2_zod)"/>`;
  // orbite sottilissime
  [100, 150, 220, 285, 365, 440].forEach(o => s += `<circle cx="500" cy="500" r="${o}" fill="none" stroke="#9fb4d8" stroke-opacity=".1" stroke-width=".7"/>`);
  // fascia degli asteroidi
  const ac = ['#8f877b', '#a39a8c', '#6f675e', '#b3a48f', '#7d7468'];
  for (let i = 0; i < 230; i++) {
    const a = r() * TAU, rad = 327 + (r() + r() + r() - 1.5) * 16, x = 500 + Math.cos(a) * rad, y = 500 + Math.sin(a) * rad, q = 0.5 + r() * r() * 1.8;
    s += `<ellipse cx="${f(x)}" cy="${f(y)}" rx="${f(q)}" ry="${f(q * (0.6 + r() * 0.4))}" fill="${ac[(r() * 5) | 0]}" opacity="${f(0.35 + r() * 0.5)}"/>`;
  }
  for (let i = 0; i < 16; i++) { // asteroidi troiani/sparsi verso l'esterno
    const a = 2.15 + r() * 0.5, rad = 380 + r() * 45;
    s += `<circle cx="${f(500 + Math.cos(a) * rad)}" cy="${f(500 + Math.sin(a) * rad)}" r="${f(0.6 + r() * 1.2)}" fill="${ac[(r() * 5) | 0]}" opacity=".6"/>`;
  }
  // alone attorno al portale (la Terra la disegna la scena figlia)
  s += `<circle cx="${P[0]}" cy="${P[1]}" r="84" fill="url(#r2_port)"/>`;

  // ---- SOLE ----
  let rays = '';
  for (let i = 0; i < 16; i++) {
    const a = r() * TAU, w = 0.03 + r() * 0.06, L = 95 + r() * 75;
    rays += `M${f(500 + Math.cos(a - w) * 58)} ${f(500 + Math.sin(a - w) * 58)}L${f(500 + Math.cos(a) * L)} ${f(500 + Math.sin(a) * L)}L${f(500 + Math.cos(a + w) * 58)} ${f(500 + Math.sin(a + w) * 58)}Z`;
  }
  s += `<path d="${rays}" fill="#ffd9a0" opacity=".07"/>`;
  s += `<circle cx="500" cy="500" r="200" fill="url(#r2_cor)"><animate attributeName="r" values="196;208;196" dur="7s" repeatCount="indefinite"/></circle>`;
  // protuberanze
  s += `<path d="M452 462Q430 440 446 428Q462 420 462 448" fill="none" stroke="#ff8a4a" stroke-width="1.2" stroke-linecap="round" opacity=".35"/>` +
    `<path d="M548 546Q574 560 566 574Q552 582 540 556" fill="none" stroke="#ff8a4a" stroke-width="1.1" stroke-linecap="round" opacity=".3"/>`;
  s += `<circle cx="500" cy="500" r="60" fill="url(#r2_sun)"/>`;
  let gr = '';
  for (let i = 0; i < 80; i++) {
    const a = r() * TAU, d = Math.sqrt(r()) * 58, x = 500 + Math.cos(a) * d, y = 500 + Math.sin(a) * d, lt = r() < 0.55;
    gr += `<ellipse cx="${f(x)}" cy="${f(y)}" rx="${f(1.5 + r() * 4.5)}" ry="${f(1.2 + r() * 3)}" fill="${lt ? '#fff7cf' : '#e07a10'}" opacity="${f(lt ? 0.12 + r() * 0.16 : 0.08 + r() * 0.14)}" transform="rotate(${f(r() * 180)} ${f(x)} ${f(y)})"/>`;
  }
  [[478, 512, 5.5, 3.6], [487, 518, 3, 2.2], [524, 478, 4, 3], [516, 530, 2.4, 1.8]].forEach(([x, y, a, b]) => gr += `<ellipse cx="${x}" cy="${y}" rx="${a}" ry="${b}" fill="url(#r2_spot)"/>`);
  s += `<g clip-path="url(#r2_sunc)">${gr}</g>`;

  // ---- PIANETI ----
  // Mercurio
  { const [x, y] = at(100, 200), R = 5.5;
    let g = `<circle cx="${f(x)}" cy="${f(y)}" r="${R}" fill="#8e8a84"/>`;
    for (let i = 0; i < 7; i++) { const a = r() * TAU, d = r() * 4; g += `<circle cx="${f(x + Math.cos(a) * d)}" cy="${f(y + Math.sin(a) * d)}" r="${f(0.5 + r() * 0.9)}" fill="${r() < 0.5 ? '#6b6761' : '#aaa59c'}" opacity=".7"/>`; }
    s += `<g>${g}${shade('r2_shMe', x, y, R)}${spin(60)}</g>`; }
  // Venere
  { const [x, y] = at(150, 120), R = 8.5;
    defs += `<clipPath id="r2_vc"><circle cx="${f(x)}" cy="${f(y)}" r="${R}"/></clipPath>`;
    let g = `<circle cx="${f(x)}" cy="${f(y)}" r="${R}" fill="#e6cf9c"/><g clip-path="url(#r2_vc)">`;
    for (let i = 0; i < 6; i++) { const yy = y - 7 + i * 2.8 + r(); g += `<path d="M${f(x - 10)} ${f(yy)}Q${f(x)} ${f(yy + 3 - r() * 6)} ${f(x + 10)} ${f(yy + r() * 2)}" fill="none" stroke="${i % 2 ? '#f6e9c6' : '#c9a865'}" stroke-width="${f(1 + r())}" opacity=".55"/>`; }
    s += `<g>${g}</g>${shade('r2_shV', x, y, R)}${spin(100)}</g>`; }
  // Marte
  { const [x, y] = at(285, 70), R = 8;
    defs += `<clipPath id="r2_mc"><circle cx="${f(x)}" cy="${f(y)}" r="${R}"/></clipPath>`;
    let g = `<circle cx="${f(x)}" cy="${f(y)}" r="${R}" fill="#c1663c"/><g clip-path="url(#r2_mc)">`;
    for (let i = 0; i < 8; i++) { const a = r() * TAU, d = r() * 6, px = x + Math.cos(a) * d, py = y + Math.sin(a) * d; g += `<ellipse cx="${f(px)}" cy="${f(py)}" rx="${f(1.5 + r() * 3)}" ry="${f(0.8 + r() * 1.6)}" fill="${r() < 0.6 ? '#7d3a22' : '#dc8a58'}" opacity=".55" transform="rotate(${f(r() * 60 - 30)} ${f(px)} ${f(py)})"/>`; }
    g += `<ellipse cx="${f(x)}" cy="${f(y - 7.4)}" rx="3.6" ry="1.4" fill="#f6efe6" opacity=".9"/><ellipse cx="${f(x)}" cy="${f(y + 7.6)}" rx="2.6" ry="1" fill="#f6efe6" opacity=".8"/>`;
    s += `<g>${g}</g>${shade('r2_shMa', x, y, R)}${spin(190)}</g>`; }
  // Giove
  { const [x, y] = at(365, 160), R = 26;
    defs += `<clipPath id="r2_jc"><circle cx="${f(x)}" cy="${f(y)}" r="${R}"/></clipPath>`;
    const bc = ['#b9a88f', '#d9c7a6', '#a8703f', '#ead9bb', '#c58a55', '#f0e2c6', '#b0764a', '#e3cfa8', '#9c6a44', '#d8c19a', '#c09a72', '#a99680'];
    let g = `<circle cx="${f(x)}" cy="${f(y)}" r="${R}" fill="#dcc7a2"/><g clip-path="url(#r2_jc)">`, yy = y - R;
    for (let i = 0; i < 12; i++) { const h = 2.6 + r() * 3.4; g += `<rect x="${f(x - R)}" y="${f(yy)}" width="${R * 2}" height="${f(h + 0.4)}" fill="${bc[i]}"/>`; yy += h; if (yy > y + R) break; }
    for (let i = 0; i < 14; i++) { const py = y - 20 + r() * 40, px = x - 22 + r() * 44; g += `<ellipse cx="${f(px)}" cy="${f(py)}" rx="${f(3 + r() * 7)}" ry="${f(0.5 + r() * 0.9)}" fill="${r() < 0.5 ? '#fff4dc' : '#7d4f2e'}" opacity="${f(0.25 + r() * 0.25)}"/>`; }
    g += `<ellipse cx="${f(x + 8)}" cy="${f(y + 8)}" rx="5.4" ry="3.2" fill="#e8c7a0" opacity=".7"/><ellipse cx="${f(x + 8)}" cy="${f(y + 8)}" rx="4.4" ry="2.5" fill="#b4533a"/><ellipse cx="${f(x + 7.5)}" cy="${f(y + 7.7)}" rx="2.4" ry="1.2" fill="#cc7455" opacity=".8"/>`;
    s += `<g>${g}</g>${shade('r2_shJ', x, y, R)}<circle cx="${f(x - 44)}" cy="${f(y + 20)}" r="1.3" fill="#d8cdb8"/><circle cx="${f(x + 38)}" cy="${f(y - 14)}" r="1" fill="#c9b08a"/>${spin(520)}</g>`; }
  // Saturno
  { const [x, y] = at(440, 235), R = 15, X = f(x), Y = f(y);
    defs += `<clipPath id="r2_sc"><circle cx="${X}" cy="${Y}" r="${R}"/></clipPath><clipPath id="r2_sf"><rect x="${f(x - 45)}" y="${Y}" width="90" height="20"/></clipPath>`;
    const ring = `<ellipse cx="${X}" cy="${Y}" rx="35" ry="10" fill="none" stroke="#b9a37a" stroke-width="3" opacity=".75"/><ellipse cx="${X}" cy="${Y}" rx="30" ry="8.5" fill="none" stroke="#e2d1a6" stroke-width="4.6" opacity=".9"/><ellipse cx="${X}" cy="${Y}" rx="25.2" ry="7.1" fill="none" stroke="#8f7f62" stroke-width="2.4" opacity=".6"/><ellipse cx="${X}" cy="${Y}" rx="32.8" ry="9.3" fill="none" stroke="#03030c" stroke-width=".8" opacity=".8"/>`;
    let g = `<g transform="rotate(-20 ${X} ${Y})">${ring}<circle cx="${X}" cy="${Y}" r="${R}" fill="#dcc592"/><g clip-path="url(#r2_sc)">`;
    ['#cdb27c', '#eadbb0', '#c2a56e', '#e3d09f', '#b99c68', '#d8c38e'].forEach((c, i) => g += `<rect x="${f(x - R)}" y="${f(y - R + i * 5)}" width="${R * 2}" height="2.6" fill="${c}" opacity=".7"/>`);
    g += `</g>${shade('r2_shS', x, y, R)}<g clip-path="url(#r2_sf)">${ring}</g></g>`;
    s += `<g>${g}${spin(900)}</g>`; }
  return { defs, svg: s };
})();
