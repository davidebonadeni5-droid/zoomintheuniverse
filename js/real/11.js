// mondo 11: quark dentro un protone, versione realistica
REAL[11] = (() => {
  let seed = 1111;
  const r = () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; };
  const f = n => +n.toFixed(1);
  const P = [507, 470];
  const soft = (id, c, o, mid) => `<radialGradient id="${id}"><stop offset="0" stop-color="${c}" stop-opacity="${o}"/>${mid ? `<stop offset=".5" stop-color="${c}" stop-opacity="${o * 0.45}"/>` : ''}<stop offset="1" stop-color="${c}" stop-opacity="0"/></radialGradient>`;
  const orb = (id, a, b, c) => `<radialGradient id="${id}" cx=".5" cy=".5" r=".5" fx=".36" fy=".32"><stop offset="0" stop-color="#fff"/><stop offset=".2" stop-color="${a}"/><stop offset=".55" stop-color="${b}"/><stop offset=".86" stop-color="${c}"/><stop offset="1" stop-color="${c}" stop-opacity="0"/></radialGradient>`;
  const Q = [[360, 330, 'r', '#ff4d6d'], [680, 380, 'g', '#5dff9a'], [480, 700, 'b', '#58a6ff']];
  const defs =
    `<radialGradient id="r11_deep"><stop offset="0" stop-color="#5c0d0b" stop-opacity=".75"/><stop offset=".6" stop-color="#8a1c17" stop-opacity=".45"/><stop offset="1" stop-color="#c8372f" stop-opacity="0"/></radialGradient>` +
    soft('r11_ca', '#f27a5e', 0.3) + soft('r11_cb', '#4a0a09', 0.4) + soft('r11_cc', '#ffb07a', 0.16) +
    soft('r11_hr', '#ff4d6d', 0.6, 1) + soft('r11_hg', '#5dff9a', 0.5, 1) + soft('r11_hb', '#58a6ff', 0.6, 1) +
    orb('r11_qr', '#ffd0d8', '#ff3158', '#7d0a27') + orb('r11_qg', '#dcffe8', '#2fd66c', '#0b6a30') + orb('r11_qb', '#d6e9ff', '#2f84f5', '#0c357e') +
    soft('r11_sp', '#fff6d8', 0.9, 1) + soft('r11_sq', '#ffc2d0', 0.8, 1) + soft('r11_sr', '#bfe4ff', 0.8, 1) +
    soft('r11_bl', '#ffffff', 0.18) + soft('r11_bd', '#000000', 0.2) + soft('r11_hl', '#ffffff', 0.75) +
    `<radialGradient id="r11_hg2"><stop offset="0" stop-color="#ffd9c8" stop-opacity=".8"/><stop offset=".62" stop-color="#ffd9c8" stop-opacity=".75"/><stop offset=".8" stop-color="#ff9a7a" stop-opacity=".3"/><stop offset="1" stop-color="#ff9a7a" stop-opacity="0"/></radialGradient>` +
    `<radialGradient id="r11_hole"><stop offset="0" stop-color="#070316"/><stop offset=".7" stop-color="#070316"/><stop offset=".8" stop-color="#1a0620" stop-opacity=".7"/><stop offset="1" stop-color="#2a0812" stop-opacity="0"/></radialGradient>`;
  let s = `<rect width="1000" height="1000" fill="#c8372f"/><circle cx="500" cy="500" r="345" fill="url(#r11_deep)"/>`;
  // nubi del mare di gluoni
  for (let i = 0; i < 34; i++) {
    const a = r() * 6.283, d = Math.sqrt(r()) * 270, rad = 45 + r() * 85, k = r();
    s += `<ellipse cx="${f(500 + Math.cos(a) * d)}" cy="${f(500 + Math.sin(a) * d)}" rx="${f(rad)}" ry="${f(rad * (0.55 + r() * 0.45))}" fill="url(#${k < 0.42 ? 'r11_ca' : k < 0.84 ? 'r11_cb' : 'r11_cc'})" transform="rotate(${f(r() * 180)} ${f(500 + Math.cos(a) * d)} ${f(500 + Math.sin(a) * d)})"/>`;
  }
  // coppie virtuali quark-antiquark
  let m = 0;
  while (m < 80) {
    const a = r() * 6.283, d = 40 + Math.sqrt(r()) * 300, x = 500 + Math.cos(a) * d, y = 500 + Math.sin(a) * d;
    const g = ['r11_sp', 'r11_sq', 'r11_sr'][(r() * 3) | 0], rad = 2.5 + r() * r() * 9;
    if (Math.hypot(x - P[0], y - P[1]) < 78 + rad) continue;
    const b = r() * 6.283, sep = rad * 1.6;
    s += `<circle cx="${f(x)}" cy="${f(y)}" r="${f(rad)}" fill="url(#${g})"/><circle cx="${f(x + Math.cos(b) * sep)}" cy="${f(y + Math.sin(b) * sep)}" r="${f(rad * 0.7)}" fill="url(#${g})" opacity=".7"/>`;
    m++;
  }
  // tubi di flusso dei gluoni: giunzione a Y nel centro
  Q.forEach((q, i) => {
    const dx = P[0] - q[0], dy = P[1] - q[1], L = Math.hypot(dx, dy), nx = -dy / L, ny = dx / L;
    const bend = (i % 2 ? -1 : 1) * 26, cx = q[0] + dx / 2 + nx * bend, cy = q[1] + dy / 2 + ny * bend;
    const d = `M${q[0]} ${q[1]}Q${f(cx)} ${f(cy)} ${P[0]} ${P[1]}`;
    s += `<path d="${d}" stroke="#ff9b5c" stroke-width="62" stroke-opacity=".1" fill="none" stroke-linecap="round"/>`;
    s += `<path d="${d}" stroke="#ffc46b" stroke-width="38" stroke-opacity=".14" fill="none" stroke-linecap="round"><animate attributeName="stroke-opacity" values=".1;.22;.1" dur="${4 + i * 1.3}s" repeatCount="indefinite"/></path>`;
    s += `<path d="${d}" stroke="#ffe29a" stroke-width="18" stroke-opacity=".28" fill="none"/>`;
    s += `<path d="${d}" stroke="#fff6dc" stroke-width="5" stroke-opacity=".75" fill="none"/>`;
    for (let j = 0; j < 4; j++) {
      const amp = 9 + r() * 12, k = 9 + r() * 9, ph = r() * 6.283;
      let pd = '';
      for (let t = 0; t <= 30; t++) {
        const u = t / 30, bx = (1 - u) * (1 - u) * q[0] + 2 * u * (1 - u) * cx + u * u * P[0], by = (1 - u) * (1 - u) * q[1] + 2 * u * (1 - u) * cy + u * u * P[1];
        const o = Math.sin(u * k + ph) * amp * (0.45 + 0.55 * Math.sin(u * Math.PI));
        pd += `${t ? 'L' : 'M'}${f(bx + nx * o)} ${f(by + ny * o)}`;
      }
      s += `<path d="${pd}" stroke="${j % 2 ? '#fff1c2' : '#ffd08a'}" stroke-width="${f(1 + r() * 1.4)}" stroke-opacity="${f(0.3 + r() * 0.3)}" fill="none" stroke-linejoin="round"/>`;
    }
  });
  // quark: sfere di energia dai bordi sfumati
  Q.forEach(([x, y, c], i) => {
    s += `<circle cx="${x}" cy="${y}" r="135" fill="url(#r11_h${c})"><animate attributeName="opacity" values=".7;1;.7" dur="${5 + i * 1.7}s" repeatCount="indefinite"/></circle>`;
    s += `<circle cx="${x + 12}" cy="${y + 16}" r="80" fill="url(#r11_bd)"/>`;
    s += `<circle cx="${x}" cy="${y}" r="72" fill="url(#r11_q${c})"/>`;
    for (let j = 0; j < 7; j++) {
      const a = r() * 6.283, d = r() * 40;
      s += `<circle cx="${f(x + Math.cos(a) * d)}" cy="${f(y + Math.sin(a) * d)}" r="${f(10 + r() * 16)}" fill="url(#${r() < 0.5 ? 'r11_bl' : 'r11_bd'})"/>`;
    }
    s += `<ellipse cx="${x - 24}" cy="${y - 27}" rx="19" ry="11" fill="url(#r11_hl)" transform="rotate(-40 ${x - 24} ${y - 27})"/>`;
  });
  // vuoto centrale (portale): alone caldo sotto, disco scuro pieno fino a r 65
  s += `<circle cx="${P[0]}" cy="${P[1]}" r="118" fill="url(#r11_hg2)"/>`;
  s += `<circle cx="${P[0]}" cy="${P[1]}" r="93" fill="url(#r11_hole)"/>`;
  return { defs, svg: s };
})();
