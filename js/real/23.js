// mondo 23: formicaio in sezione sotto terra — versione realistica
REAL[23] = (() => {
  let sd = 2311;
  const r = () => { sd = (sd * 1664525 + 1013904223) >>> 0; return sd / 4294967296; };
  const f = n => Math.round(n * 10) / 10;
  const BG = '#7a5230', PC = '#3a8a32', PX = 520, PY = 480;
  let defs = '', s = '';

  defs +=
    `<radialGradient id="r23_vig" gradientUnits="userSpaceOnUse" cx="500" cy="500" r="720"><stop offset=".44" stop-color="${BG}" stop-opacity="0"/><stop offset=".6" stop-color="${BG}" stop-opacity="1"/><stop offset="1" stop-color="${BG}"/></radialGradient>` +
    `<linearGradient id="r23_strata" x1="0" y1="0" x2="0" y2="1"><stop offset=".1" stop-color="#3d2a14" stop-opacity=".3"/><stop offset=".4" stop-color="#8f6238" stop-opacity=".12"/><stop offset=".7" stop-color="#5a3a20" stop-opacity=".1"/><stop offset=".95" stop-color="#3a2412" stop-opacity=".3"/></linearGradient>` +
    `<radialGradient id="r23_deep" cx=".5" cy=".42" r=".5"><stop offset="0" stop-color="#0d0603" stop-opacity=".55"/><stop offset=".7" stop-color="#0d0603" stop-opacity=".2"/><stop offset="1" stop-color="#0d0603" stop-opacity="0"/></radialGradient>` +
    `<radialGradient id="r23_peb" cx=".36" cy=".3" r=".8"><stop offset="0" stop-color="#d9d2c4"/><stop offset=".5" stop-color="#9c9484"/><stop offset="1" stop-color="#55503f"/></radialGradient>` +
    `<radialGradient id="r23_peb2" cx=".36" cy=".3" r=".8"><stop offset="0" stop-color="#c9a889"/><stop offset=".5" stop-color="#946f52"/><stop offset="1" stop-color="#4f3524"/></radialGradient>` +
    `<radialGradient id="r23_ant" cx=".4" cy=".28" r=".8"><stop offset="0" stop-color="#e58a4a"/><stop offset=".35" stop-color="#a8431a"/><stop offset=".8" stop-color="#5e1f0c"/><stop offset="1" stop-color="#2c0c04"/></radialGradient>` +
    `<radialGradient id="r23_gas" cx=".42" cy=".28" r=".8"><stop offset="0" stop-color="#c9642c"/><stop offset=".35" stop-color="#7c2c10"/><stop offset=".8" stop-color="#3f1407"/><stop offset="1" stop-color="#1c0803"/></radialGradient>` +
    `<radialGradient id="r23_egg" cx=".38" cy=".3" r=".8"><stop offset="0" stop-color="#fffdf2"/><stop offset=".55" stop-color="#eadfc2"/><stop offset="1" stop-color="#a8946e"/></radialGradient>` +
    `<radialGradient id="r23_seed" cx=".38" cy=".3" r=".8"><stop offset="0" stop-color="#f0cf86"/><stop offset=".55" stop-color="#c0903e"/><stop offset="1" stop-color="#6e4a18"/></radialGradient>` +
    `<radialGradient id="r23_leaf" gradientUnits="userSpaceOnUse" cx="${PX}" cy="${PY}" r="110"><stop offset="0" stop-color="${PC}"/><stop offset=".62" stop-color="${PC}"/><stop offset=".85" stop-color="#2f7a2a"/><stop offset="1" stop-color="#225f20"/></radialGradient>` +
    `<linearGradient id="r23_leaflit" gradientUnits="userSpaceOnUse" x1="430" y1="400" x2="620" y2="570"><stop offset="0" stop-color="#b6e27a" stop-opacity=".4"/><stop offset=".3" stop-color="#b6e27a" stop-opacity="0"/><stop offset=".7" stop-color="#0f3a12" stop-opacity="0"/><stop offset="1" stop-color="#0f3a12" stop-opacity=".4"/></linearGradient>` +
    `<linearGradient id="r23_lf2" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#7cc24a"/><stop offset=".5" stop-color="#3f9034"/><stop offset="1" stop-color="#1f5a1e"/></linearGradient>` +
    `<linearGradient id="r23_root" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#e6cfa4"/><stop offset="1" stop-color="#8f6f48"/></linearGradient>`;

  // ---------- terreno ----------
  s += `<rect width="1000" height="1000" fill="${BG}"/>`;
  s += `<rect x="80" y="80" width="840" height="840" fill="url(#r23_strata)"/>`;
  // strati ondulati
  for (let i = 0; i < 6; i++) {
    const y = 190 + i * 118 + r() * 30;
    s += `<path d="M80 ${f(y)}Q300 ${f(y - 30 + r() * 60)} 500 ${f(y + (r() - 0.5) * 40)}T920 ${f(y + (r() - 0.5) * 50)}" stroke="${i % 2 ? '#573719' : '#99703f'}" stroke-width="${f(14 + r() * 26)}" fill="none" opacity="${f(0.1 + r() * 0.08)}"/>`;
  }
  // grana: granelli chiari e scuri
  const tones = ['#9a7044', '#4f321a', '#b0885a', '#3d2612', '#8a6238', '#c49a68'];
  for (let i = 0; i < 300; i++) {
    const a = r() * 6.2832, d = Math.sqrt(r()) * 420, x = 500 + Math.cos(a) * d, y = 500 + Math.sin(a) * d;
    s += `<ellipse cx="${f(x)}" cy="${f(y)}" rx="${f(1.5 + r() * 6)}" ry="${f(1 + r() * 3.5)}" fill="${tones[i % 6]}" opacity="${f(0.2 + r() * 0.35)}" transform="rotate(${Math.round(r() * 180)} ${f(x)} ${f(y)})"/>`;
  }

  // ---------- cavità: camere e gallerie ----------
  const blob = (cx, cy, rx, ry, n = 12, j = 0.12) => {
    const p = [];
    for (let i = 0; i < n; i++) {
      const a = i / n * 6.2832, k = 1 + (r() - 0.5) * 2 * j;
      p.push([cx + Math.cos(a) * rx * k, cy + Math.sin(a) * ry * k]);
    }
    let d = '';
    for (let i = 0; i < n; i++) {
      const a = p[i], b = p[(i + 1) % n], mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2;
      d += (i ? '' : `M${f((p[n - 1][0] + a[0]) / 2)} ${f((p[n - 1][1] + a[1]) / 2)}`) + `Q${f(a[0])} ${f(a[1])} ${f(mx)} ${f(my)}`;
    }
    return d + 'Z';
  };
  const CH = [[PX, PY, 158, 112], [288, 316, 84, 54], [690, 606, 92, 62], [692, 380, 66, 46], [330, 655, 96, 58], [520, 765, 62, 38]];
  let chD = '';
  CH.forEach(c => chD += blob(c[0], c[1], c[2], c[3]));
  const tun =
    'M400 440Q350 400 340 345' +          // centro -> regina
    'M420 545Q380 580 372 625' +          // centro -> uova
    'M630 535Q660 550 668 575' +          // centro -> dispensa
    'M640 430Q655 410 668 400' +          // centro -> cameretta
    'M700 350Q725 270 690 190Q670 140 700 80' + // pozzo verso la superficie
    'M250 290Q200 240 215 170Q225 120 190 70' + // secondo pozzo
    'M370 690Q440 740 480 760' +          // uova -> camera bassa
    'M560 780Q640 800 690 870' +          // verso il basso
    'M760 630Q830 650 880 720' +
    'M250 660Q180 680 130 740';
  const pass = (col, w, dy, op) =>
    `<g transform="translate(0 ${dy})" opacity="${op}"><path d="${tun}" stroke="${col}" stroke-width="${w}" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="${chD}" fill="${col}" stroke="${col}" stroke-width="${w - 28}" stroke-linejoin="round"/></g>`;
  s += pass('#c79a66', 34, 5, 0.5);   // labbro inferiore illuminato
  s += pass('#1a0d05', 36, -3, 0.9);  // ombra della volta
  s += pass('#3b2414', 32, 0, 1);     // cavità
  s += `<path d="${tun}" stroke="#573a22" stroke-width="12" fill="none" stroke-linecap="round" opacity=".55" transform="translate(0 7)"/>`;
  CH.forEach(c => {
    s += `<ellipse cx="${c[0]}" cy="${f(c[1] - c[3] * 0.12)}" rx="${f(c[2] * 0.95)}" ry="${f(c[3] * 0.9)}" fill="url(#r23_deep)"/>`;
    s += `<path d="M${f(c[0] - c[2] * 0.72)} ${f(c[1] + c[3] * 0.62)}Q${c[0]} ${f(c[1] + c[3] * 1.06)} ${f(c[0] + c[2] * 0.72)} ${f(c[1] + c[3] * 0.62)}" stroke="#7a5532" stroke-width="7" fill="none" opacity=".4" stroke-linecap="round"/>`;
  });

  // ---------- radici (dall'alto) ----------
  const root = (x, y, a, L, w, depth) => {
    let d = `M${f(x)} ${f(y)}`, out = '';
    const n = 4;
    for (let i = 0; i < n; i++) {
      const na = a + (r() - 0.5) * 0.7, nx = x + Math.cos(na) * L / n, ny = y + Math.sin(na) * L / n;
      d += `Q${f(x + Math.cos(a) * L / n * 0.5 + (r() - 0.5) * 14)} ${f(y + Math.sin(a) * L / n * 0.5)} ${f(nx)} ${f(ny)}`;
      x = nx; y = ny; a = na;
      if (depth > 0 && r() < 0.75) out += root(x, y, a + (r() < 0.5 ? -1 : 1) * (0.5 + r() * 0.5), L * 0.5, w * 0.5, depth - 1);
    }
    return `<path d="${d}" stroke="#2a180b" stroke-width="${f(w + 3)}" fill="none" opacity=".35" stroke-linecap="round" transform="translate(2 3)"/><path d="${d}" stroke="${w > 5 ? 'url(#r23_root)' : '#c9ac7c'}" stroke-width="${f(w)}" fill="none" stroke-linecap="round"/>` + out;
  };
  s += root(455, 60, 1.5, 250, 12, 2);
  s += root(600, 50, 1.75, 230, 9, 2);
  s += root(130, 330, 0.5, 130, 6, 1);
  s += root(860, 360, 2.5, 120, 6, 1);

  // ---------- sassolini ----------
  const pebs = [[180, 470, 26], [800, 470, 30], [420, 250, 16], [560, 300, 12], [815, 270, 20], [230, 560, 14], [610, 700, 20], [450, 860, 24], [860, 560, 16], [160, 250, 14], [760, 780, 22], [300, 800, 18], [570, 190, 14], [370, 200, 10], [880, 420, 12], [220, 800, 12], [640, 850, 12], [120, 600, 16], [480, 640, 11], [790, 170, 13]];
  pebs.forEach(([x, y, q], i) => {
    const rot = Math.round(r() * 180), ry = q * (0.55 + r() * 0.25);
    s += `<ellipse cx="${x + 4}" cy="${f(y + ry * 0.55)}" rx="${f(q * 1.08)}" ry="${f(ry * 0.8)}" fill="#1c0f06" opacity=".4" transform="rotate(${rot} ${x} ${y})"/>`;
    s += `<path d="${blob(x, y, q, ry, 8, 0.14)}" fill="url(#r23_peb${i % 3 === 1 ? '2' : ''})" transform="rotate(${rot} ${x} ${y})"/>`;
    s += `<ellipse cx="${f(x - q * 0.3)}" cy="${f(y - ry * 0.35)}" rx="${f(q * 0.3)}" ry="${f(ry * 0.18)}" fill="#fff" opacity=".28" transform="rotate(${rot} ${x} ${y})"/>`;
  });

  // ---------- formiche ----------
  const ant = (x, y, rot, sc, extra = '') => {
    const legs = 'M-3 0Q-12 -9 -20 -15M-3 0Q-12 9 -20 15M0 0Q0 -12 3 -19M0 0Q0 12 3 19M3 0Q12 -10 19 -15M3 0Q12 10 19 15';
    const antn = 'M14 -2Q20 -9 28 -8M14 2Q20 9 28 8';
    return `<g transform="translate(${f(x)} ${f(y)}) rotate(${rot}) scale(${sc})">` +
      `<ellipse cx="-3" cy="5" rx="24" ry="8" fill="#0a0502" opacity=".4"/>` +
      `<path d="${legs}" stroke="#4a1a0a" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>` +
      `<path d="${antn}" stroke="#6a2a10" stroke-width="1.1" fill="none" stroke-linecap="round"/>` +
      `<ellipse cx="-16" cy="0" rx="10" ry="7" fill="url(#r23_gas)"/>` +
      `<ellipse cx="0" cy="0" rx="6.5" ry="4" fill="url(#r23_ant)"/><circle cx="-6.5" cy="0" r="2.2" fill="#7c2c10"/>` +
      `<ellipse cx="11" cy="0" rx="5.5" ry="5" fill="url(#r23_ant)"/>` +
      `<path d="M-21 -3Q-16 -6 -11 -4M8 -3Q11 -4.5 14 -3" stroke="#ffd9b0" stroke-width="1.2" fill="none" opacity=".6" stroke-linecap="round"/>` +
      extra + `</g>`;
  };
  const leafBit = (x, y, q, rot) =>
    `<g transform="translate(${x} ${y}) rotate(${rot})"><path d="M${-q} 0Q${-q * 0.6} ${-q * 0.8} ${q * 0.2} ${-q * 0.7}L${q} ${-q * 0.1}Q${q * 0.7} ${q * 0.7} ${-q * 0.2} ${q * 0.6}Z" fill="url(#r23_lf2)"/><path d="M${-q * 0.8} 0L${q * 0.8} ${-q * 0.1}" stroke="#c9ea9a" stroke-width="1" opacity=".6"/></g>`;

  // ---------- camera centrale: grande foglia attorno al portale ----------
  s += `<path d="${blob(PX + 6, PY + 12, 112, 88, 14, 0.06)}" fill="#0a0502" opacity=".5"/>`;
  s += leafBit(418, 520, 26, 30) + leafBit(628, 428, 24, -150) + leafBit(600, 552, 22, 70);
  const LEAF = blob(PX, PY, 104, 82, 16, 0.07);
  s += `<path d="${LEAF}" fill="url(#r23_leaf)"/><path d="${LEAF}" fill="url(#r23_leaflit)"/>`;
  // nervature: solo fuori dal raggio 52 del portale
  let vn = '', vn2 = '';
  const ma = -0.35;
  for (const sg of [-1, 1]) {
    const c = Math.cos(ma) * sg, sn = Math.sin(ma) * sg;
    vn += `M${f(PX + c * 53)} ${f(PY + sn * 53)}L${f(PX + c * 97)} ${f(PY + sn * 97)}`;
  }
  for (let i = 0; i < 12; i++) {
    const a = i / 12 * 6.2832 + 0.2;
    if (Math.abs(Math.sin(a - ma)) < 0.3) continue;
    const r1 = 70 + r() * 9;
    vn2 += `M${f(PX + Math.cos(a) * 53)} ${f(PY + Math.sin(a) * 53)}Q${f(PX + Math.cos(a + 0.1) * 62)} ${f(PY + Math.sin(a + 0.1) * 62)} ${f(PX + Math.cos(a + 0.16) * r1)} ${f(PY + Math.sin(a + 0.16) * r1 * 0.9)}`;
  }
  s += `<path d="${vn}" stroke="#a8d878" stroke-width="2.6" fill="none" opacity=".7" stroke-linecap="round"/><path d="${vn2}" stroke="#9ccf70" stroke-width="1.3" fill="none" opacity=".55" stroke-linecap="round"/>`;
  // morsi sul bordo
  s += `<circle cx="612" cy="436" r="11" fill="#33200f"/><circle cx="436" cy="528" r="9" fill="#33200f"/><circle cx="560" cy="556" r="7" fill="#33200f"/>`;
  s += ant(398, 468, 15, 1.15) + ant(652, 500, 195, 1.15) + ant(470, 578, -20, 1) + ant(590, 392, 160, 1);

  // ---------- camera della regina (corona a 260,300 libera) ----------
  s += `<g transform="translate(322 334) rotate(-160) scale(1.55)"><ellipse cx="-12" cy="5" rx="34" ry="10" fill="#0a0502" opacity=".4"/><path d="M-3 0Q-10 -9 -16 -14M-3 0Q-10 9 -16 14M0 0Q0 -11 3 -17M0 0Q0 11 3 17M3 0Q11 -9 17 -13M3 0Q11 9 17 13M14 -2Q20 -8 27 -7M14 2Q20 8 27 7" stroke="#4a1a0a" stroke-width="1.4" fill="none" stroke-linecap="round"/><ellipse cx="-24" cy="0" rx="19" ry="10" fill="url(#r23_gas)"/><path d="M-32 -9Q-34 0 -32 9M-24 -10Q-26 0 -24 10M-16 -9.500Q-18 0 -16 9.500" stroke="#d98a4a" stroke-width="1.2" fill="none" opacity=".45"/><ellipse cx="0" cy="0" rx="8" ry="5.500" fill="url(#r23_ant)"/><ellipse cx="11.500" cy="0" rx="5.500" ry="5" fill="url(#r23_ant)"/><path d="M-34 -4Q-24 -8 -12 -5" stroke="#ffd9b0" stroke-width="1.3" fill="none" opacity=".55" stroke-linecap="round"/></g>`;
  s += ant(345, 292, 200, 0.8) + ant(232, 342, 20, 0.8);
  for (let i = 0; i < 5; i++) s += `<ellipse cx="${f(290 + i * 9 + r() * 4)}" cy="${f(356 - (i % 2) * 5)}" rx="4.500" ry="3" fill="url(#r23_egg)" transform="rotate(${Math.round(r() * 90)} ${290 + i * 9} 356)"/>`;

  // ---------- camera delle uova e delle larve ----------
  for (let i = 0; i < 34; i++) {
    const a = r() * 6.2832, d = Math.sqrt(r()), x = 318 + Math.cos(a) * d * 58, y = 672 + Math.sin(a) * d * 22 - (1 - d) * 10;
    s += `<ellipse cx="${f(x)}" cy="${f(y)}" rx="${f(5 + r() * 2.5)}" ry="${f(3.2 + r() * 1.2)}" fill="url(#r23_egg)" transform="rotate(${Math.round(r() * 180)} ${f(x)} ${f(y)})"/>`;
  }
  [[388, 664, 20], [262, 668, -30], [352, 690, 5]].forEach(([x, y, rot]) => {
    s += `<g transform="translate(${x} ${y}) rotate(${rot})"><path d="M-15 0Q-14 -8 -4 -8Q10 -8 15 -2Q16 5 6 7Q-10 9 -15 0Z" fill="url(#r23_egg)"/><path d="M-9 -7Q-7 0 -9 6M-3 -8Q-1 0 -3 7M3 -8Q5 0 3 7M9 -6Q11 0 9 6" stroke="#9a8660" stroke-width=".9" fill="none" opacity=".6"/></g>`;
  });
  s += ant(300, 628, 35, 0.95) + ant(392, 632, 150, 0.9);

  // ---------- dispensa (caramella a 700,600 libera) ----------
  [[628, 622, 8], [640, 640, 7], [656, 650, 8], [742, 640, 8], [756, 622, 7], [728, 652, 7], [620, 600, 6], [764, 600, 6], [676, 656, 6], [708, 658, 7], [648, 574, 6], [750, 578, 6]].forEach(([x, y, q], i) => {
    s += `<ellipse cx="${x}" cy="${y}" rx="${q}" ry="${f(q * 0.62)}" fill="url(#r23_seed)" transform="rotate(${Math.round(r() * 180)} ${x} ${y})"/>`;
  });
  s += ant(660, 562, 40, 0.85) + ant(748, 560, 130, 0.85);

  // ---------- cameretta in alto a destra (foglia a 690,380 libera) ----------
  s += leafBit(648, 398, 13, 20) + leafBit(736, 396, 12, 140) + leafBit(720, 352, 10, -60);
  // operaia che porta un pezzo di foglia lungo il pozzo
  s += ant(712, 262, 100, 0.95, `<path d="M12 -2Q22 -30 4 -34Q-12 -30 -10 -12Q0 -4 12 -2Z" fill="url(#r23_lf2)"/><path d="M11 -3Q8 -20 0 -30" stroke="#c9ea9a" stroke-width="1" fill="none" opacity=".6"/>`);
  s += ant(212, 205, 80, 0.9) + ant(430, 728, 25, 0.9) + ant(520, 768, 180, 0.9);
  // formica che cammina nella galleria (animazione lenta, lontana dal portale)
  s += `<g><animateTransform attributeName="transform" type="translate" values="0 0;-14 -10;0 0" dur="9s" repeatCount="indefinite"/>${ant(372, 398, 55, 0.9)}</g>`;
  s += `<g><animateTransform attributeName="transform" type="translate" values="0 0;12 10;0 0" dur="11s" repeatCount="indefinite"/>${ant(392, 585, 130, 0.9)}</g>`;

  s += `<rect width="1000" height="1000" fill="url(#r23_vig)"/>`;
  return { defs, svg: s };
})();
