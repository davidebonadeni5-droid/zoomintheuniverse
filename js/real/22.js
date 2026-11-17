// mondo 22: occhio umano in primo piano — versione realistica
REAL[22] = (() => {
  let sd = 2207;
  const r = () => { sd = (sd * 1664525 + 1013904223) >>> 0; return sd / 4294967296; };
  const f = n => Math.round(n * 10) / 10;
  const BG = '#f1c27d', PC = '#8b1e2b';
  const CX = 500, CY = 500, IR = 126, PR = 78;
  let defs = '', s = '';
  const EYE = 'M240 520C330 400 600 350 770 480C620 655 380 655 240 520Z';
  const UP = [[240, 520], [330, 400], [600, 350], [770, 480]];
  const LO = [[770, 480], [620, 655], [380, 655], [240, 520]];
  const bz = (P, t) => {
    const u = 1 - t, a = u * u * u, b = 3 * u * u * t, c = 3 * u * t * t, d = t * t * t;
    const x = a * P[0][0] + b * P[1][0] + c * P[2][0] + d * P[3][0], y = a * P[0][1] + b * P[1][1] + c * P[2][1] + d * P[3][1];
    const dx = 3 * u * u * (P[1][0] - P[0][0]) + 6 * u * t * (P[2][0] - P[1][0]) + 3 * t * t * (P[3][0] - P[2][0]);
    const dy = 3 * u * u * (P[1][1] - P[0][1]) + 6 * u * t * (P[2][1] - P[1][1]) + 3 * t * t * (P[3][1] - P[2][1]);
    const l = Math.hypot(dx, dy) || 1;
    return [x, y, dx / l, dy / l];
  };

  defs +=
    `<clipPath id="r22_eye"><path d="${EYE}"/></clipPath>` +
    `<radialGradient id="r22_sock" gradientUnits="userSpaceOnUse" cx="500" cy="490" r="400"><stop offset="0" stop-color="#b9774a" stop-opacity=".55"/><stop offset=".45" stop-color="#c88856" stop-opacity=".34"/><stop offset=".8" stop-color="#d9a066" stop-opacity="0"/></radialGradient>` +
    `<radialGradient id="r22_lit" gradientUnits="userSpaceOnUse" cx="400" cy="300" r="260"><stop offset="0" stop-color="#ffe9c2" stop-opacity=".5"/><stop offset="1" stop-color="#ffe9c2" stop-opacity="0"/></radialGradient>` +
    `<radialGradient id="r22_vig" gradientUnits="userSpaceOnUse" cx="500" cy="500" r="720"><stop offset=".43" stop-color="${BG}" stop-opacity="0"/><stop offset=".6" stop-color="${BG}" stop-opacity="1"/><stop offset="1" stop-color="${BG}"/></radialGradient>` +
    `<radialGradient id="r22_scl" gradientUnits="userSpaceOnUse" cx="500" cy="505" r="290"><stop offset="0" stop-color="#fbf8f4"/><stop offset=".5" stop-color="#f1ebe6"/><stop offset=".8" stop-color="#dcc9c2"/><stop offset="1" stop-color="#c79a92"/></radialGradient>` +
    `<radialGradient id="r22_iris" gradientUnits="userSpaceOnUse" cx="500" cy="500" r="${IR}"><stop offset=".6" stop-color="#3a2a14"/><stop offset=".66" stop-color="#b98a3c"/><stop offset=".74" stop-color="#8f9f7a"/><stop offset=".82" stop-color="#5f93a8"/><stop offset=".92" stop-color="#3f7190"/><stop offset=".97" stop-color="#1f3d55"/><stop offset="1" stop-color="#142736"/></radialGradient>` +
    `<radialGradient id="r22_limb" gradientUnits="userSpaceOnUse" cx="500" cy="500" r="${IR + 6}"><stop offset=".84" stop-color="#0d1c28" stop-opacity="0"/><stop offset=".95" stop-color="#0d1c28" stop-opacity=".7"/><stop offset="1" stop-color="#3b4a55" stop-opacity="0"/></radialGradient>` +
    `<radialGradient id="r22_pup" gradientUnits="userSpaceOnUse" cx="500" cy="500" r="${PR}"><stop offset="0" stop-color="${PC}"/><stop offset=".83" stop-color="${PC}"/><stop offset=".93" stop-color="#4a0d15"/><stop offset="1" stop-color="#1a0508"/></radialGradient>` +
    `<radialGradient id="r22_pring" gradientUnits="userSpaceOnUse" cx="500" cy="500" r="${PR + 14}"><stop offset=".8" stop-color="#150a06" stop-opacity=".75"/><stop offset="1" stop-color="#150a06" stop-opacity="0"/></radialGradient>` +
    `<radialGradient id="r22_cor" gradientUnits="userSpaceOnUse" cx="455" cy="440" r="170"><stop offset="0" stop-color="#fff" stop-opacity=".22"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>` +
    `<radialGradient id="r22_gl" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#fff" stop-opacity=".8"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>` +
    `<radialGradient id="r22_car" cx=".4" cy=".35" r=".7"><stop offset="0" stop-color="#f3b0a4"/><stop offset=".6" stop-color="#d77f77"/><stop offset="1" stop-color="#b65a58"/></radialGradient>` +
    `<linearGradient id="r22_lidsh" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2a1610" stop-opacity=".55"/><stop offset=".45" stop-color="#2a1610" stop-opacity=".12"/><stop offset="1" stop-color="#2a1610" stop-opacity="0"/></linearGradient>`;

  // ---------- pelle ----------
  s += `<rect width="1000" height="1000" fill="${BG}"/>`;
  s += `<circle cx="500" cy="490" r="400" fill="url(#r22_sock)"/><circle cx="400" cy="300" r="260" fill="url(#r22_lit)"/>`;
  // pori e grana della pelle
  const sk = ['#c98f58', '#fbdcaa', '#b97a4a', '#ffe6bd'];
  for (let i = 0; i < 230; i++) {
    const a = r() * 6.2832, d = Math.sqrt(r()) * 410, x = CX + Math.cos(a) * d, y = CY + Math.sin(a) * d;
    if (((x - 505) / 285) ** 2 + ((y - 500) / 125) ** 2 < 1) continue;
    s += `<ellipse cx="${f(x)}" cy="${f(y)}" rx="${f(1.2 + r() * 3.2)}" ry="${f(0.8 + r() * 1.8)}" fill="${sk[i % 4]}" opacity="${f(0.16 + r() * 0.24)}" transform="rotate(${Math.round(r() * 180)} ${f(x)} ${f(y)})"/>`;
  }
  // rughe sottili attorno all'occhio
  let wr = '';
  for (let i = 0; i < 26; i++) {
    const a = (i < 13 ? 0.25 + r() * 0.9 : 2.0 + r() * 0.9), d = 190 + r() * 110;
    const x = CX + Math.cos(a) * d * 1.25, y = CY + Math.sin(a) * d * 0.8, L = 18 + r() * 34, b = a + 1.57 + (r() - 0.5) * 0.5;
    wr += `M${f(x)} ${f(y)}q${f(Math.cos(b) * L * 0.5 + (r() - 0.5) * 8)} ${f(Math.sin(b) * L * 0.5 + 3)} ${f(Math.cos(b) * L)} ${f(Math.sin(b) * L)}`;
  }
  s += `<path d="${wr}" stroke="#a96c3f" stroke-width="1.1" fill="none" opacity=".2" stroke-linecap="round"/>`;
  // occhiaia e borsa sotto l'occhio
  s += `<path d="M262 560Q500 742 760 548Q520 690 262 560Z" fill="#a8663f" opacity=".22"/>`;
  s += `<path d="M290 600Q500 716 730 588" stroke="#9c6038" stroke-width="5" fill="none" opacity=".28" stroke-linecap="round"/>`;
  s += `<path d="M300 612Q500 730 722 600" stroke="#ffe3b5" stroke-width="7" fill="none" opacity=".3" stroke-linecap="round"/>`;
  // palpebra superiore: volume, piega, luce
  s += `<path d="M232 512C318 372 612 322 786 466C620 300 330 330 232 512Z" fill="#b5713f" opacity=".3"/>`;
  s += `<path d="M236 500C322 348 620 300 792 452" stroke="#8a5230" stroke-width="13" fill="none" opacity=".2" stroke-linecap="round"/>`;
  s += `<path d="M240 498C326 352 618 306 788 452" stroke="#7a4426" stroke-width="4.5" fill="none" opacity=".62" stroke-linecap="round"/>`;
  s += `<path d="M270 462C372 356 600 334 760 440" stroke="#ffe7bd" stroke-width="20" fill="none" opacity=".34" stroke-linecap="round"/>`;
  s += `<path d="M330 408C430 362 570 356 690 404" stroke="#fff3da" stroke-width="7" fill="none" opacity=".4" stroke-linecap="round"/>`;
  // angolo esterno e interno
  s += `<path d="M770 480Q800 490 826 512" stroke="#8a5230" stroke-width="4" fill="none" opacity=".4" stroke-linecap="round"/>`;
  s += `<path d="M240 520Q222 530 210 548" stroke="#8a5230" stroke-width="4" fill="none" opacity=".35" stroke-linecap="round"/>`;

  // ---------- sopracciglio ----------
  s += `<path d="M318 276Q500 176 706 268Q690 240 640 222Q500 176 350 232Q322 250 318 276Z" fill="#5a3a22" opacity=".22"/>`;
  const brow = ['', '', ''];
  for (let i = 0; i < 150; i++) {
    const t = r(), u = 1 - t;
    const x = u * u * 322 + 2 * u * t * 500 + t * t * 704, yb = u * u * 262 + 2 * u * t * 196 + t * t * 256;
    const th = (t < 0.25 ? 22 : 30 - t * 14), y = yb + (r() - 0.5) * th;
    const a = -0.95 + t * 1.25 + (r() - 0.5) * 0.35, L = 16 + r() * 16;
    brow[i % 3] += `M${f(x)} ${f(y)}q${f(Math.cos(a) * L * 0.5)} ${f(Math.sin(a) * L * 0.5 - 3)} ${f(Math.cos(a + 0.3) * L)} ${f(Math.sin(a + 0.3) * L)}`;
  }
  s += `<path d="${brow[0]}" stroke="#2b1a10" stroke-width="2.1" fill="none" opacity=".8" stroke-linecap="round"/>`;
  s += `<path d="${brow[1]}" stroke="#4a2f1c" stroke-width="1.6" fill="none" opacity=".75" stroke-linecap="round"/>`;
  s += `<path d="${brow[2]}" stroke="#7a5534" stroke-width="1.2" fill="none" opacity=".6" stroke-linecap="round"/>`;

  // ---------- bordi palpebrali (sotto il bulbo) ----------
  s += `<path d="M770 480C620 655 380 655 240 520" stroke="#e39c8c" stroke-width="20" fill="none" stroke-linecap="round"/>`;
  s += `<path d="M770 480C620 655 380 655 240 520" stroke="#f6c7b4" stroke-width="20" fill="none" opacity=".5" stroke-linecap="round" transform="translate(0 3)"/>`;
  s += `<path d="M240 520C330 400 600 350 770 480" stroke="#3a2016" stroke-width="13" fill="none" stroke-linecap="round"/>`;

  // ---------- bulbo ----------
  s += `<path d="${EYE}" fill="url(#r22_scl)"/>`;
  let e = '';
  // caruncola
  e += `<ellipse cx="268" cy="520" rx="30" ry="19" fill="url(#r22_car)" transform="rotate(-12 268 520)"/><ellipse cx="262" cy="514" rx="9" ry="4" fill="#fff" opacity=".55" transform="rotate(-20 262 514)"/>`;
  e += `<path d="M296 500Q312 522 300 544" stroke="#d99a92" stroke-width="5" fill="none" opacity=".5"/>`;
  // capillari
  let v1 = '', v2 = '';
  for (let i = 0; i < 18; i++) {
    const left = i % 2 === 0;
    let x = left ? 285 + r() * 20 : 755 - r() * 30, y = (left ? 520 : 490) + (r() - 0.5) * 60;
    let d = `M${f(x)} ${f(y)}`;
    const n = 3 + Math.floor(r() * 3), dir = left ? 1 : -1;
    for (let k = 0; k < n; k++) {
      const nx = x + dir * (14 + r() * 16), ny = y + (r() - 0.5) * 22;
      d += `Q${f((x + nx) / 2 + (r() - 0.5) * 10)} ${f((y + ny) / 2 + (r() - 0.5) * 14)} ${f(nx)} ${f(ny)}`;
      x = nx; y = ny;
      if (Math.hypot(x - CX, y - CY) < IR + 12) break;
    }
    if (i % 3) v1 += d; else v2 += d;
  }
  e += `<path d="${v1}" stroke="#c2413f" stroke-width="1" fill="none" opacity=".4" stroke-linecap="round"/><path d="${v2}" stroke="#b02c30" stroke-width="1.7" fill="none" opacity=".32" stroke-linecap="round"/>`;
  // ombra dell'iride sulla sclera
  e += `<circle cx="${CX}" cy="${CY + 3}" r="${IR + 7}" fill="#6b5a58" opacity=".22"/>`;
  // iride
  e += `<circle cx="${CX}" cy="${CY}" r="${IR}" fill="url(#r22_iris)"/>`;
  // chiazze radiali chiare/scure
  let w1 = '', w2 = '';
  for (let i = 0; i < 46; i++) {
    const a = r() * 6.2832, da = 0.02 + r() * 0.05, r0 = 84 + r() * 14, r1 = 108 + r() * 16;
    const d = `M${f(CX + Math.cos(a) * r0)} ${f(CY + Math.sin(a) * r0)}L${f(CX + Math.cos(a - da) * r1)} ${f(CY + Math.sin(a - da) * r1)}L${f(CX + Math.cos(a + da) * r1)} ${f(CY + Math.sin(a + da) * r1)}Z`;
    if (i % 2) w1 += d; else w2 += d;
  }
  e += `<path d="${w1}" fill="#a9d4e2" opacity=".3"/><path d="${w2}" fill="#173246" opacity=".3"/>`;
  // fibre dello stroma
  const fib = ['', '', '', ''];
  for (let i = 0; i < 250; i++) {
    const a = i / 250 * 6.2832 + (r() - 0.5) * 0.03, r0 = 80 + r() * 8, r1 = 100 + r() * 24, am = a + (r() - 0.5) * 0.07, rm = (r0 + r1) / 2;
    fib[i % 4] += `M${f(CX + Math.cos(a) * r0)} ${f(CY + Math.sin(a) * r0)}Q${f(CX + Math.cos(am) * rm)} ${f(CY + Math.sin(am) * rm)} ${f(CX + Math.cos(a + (r() - 0.5) * 0.03) * r1)} ${f(CY + Math.sin(a) * r1)}`;
  }
  e += `<path d="${fib[0]}" stroke="#d3ecf2" stroke-width="1.1" fill="none" opacity=".5"/>`;
  e += `<path d="${fib[1]}" stroke="#16303f" stroke-width="1.3" fill="none" opacity=".5"/>`;
  e += `<path d="${fib[2]}" stroke="#86bccd" stroke-width="1.6" fill="none" opacity=".4"/>`;
  e += `<path d="${fib[3]}" stroke="#2c566f" stroke-width="1" fill="none" opacity=".55"/>`;
  // collaretto (corona irregolare attorno alla pupilla)
  let col = '', col2 = '';
  for (let i = 0; i <= 44; i++) {
    const a = i / 44 * 6.2832, rr = (i % 2 ? 97 : 90) + (i % 44 === 0 ? 0 : r() * 5);
    col += (i ? 'L' : 'M') + f(CX + Math.cos(a) * rr) + ' ' + f(CY + Math.sin(a) * rr);
  }
  for (let i = 0; i < 70; i++) {
    const a = r() * 6.2832, r0 = 80, r1 = 90 + r() * 9;
    col2 += `M${f(CX + Math.cos(a) * r0)} ${f(CY + Math.sin(a) * r0)}L${f(CX + Math.cos(a + (r() - 0.5) * 0.06) * r1)} ${f(CY + Math.sin(a) * r1)}`;
  }
  e += `<path d="${col2}" stroke="#e3b866" stroke-width="1.5" fill="none" opacity=".6"/>`;
  e += `<path d="${col}Z" stroke="#e9cf8e" stroke-width="2.2" fill="none" opacity=".5" stroke-linejoin="round"/>`;
  // cripte
  for (let i = 0; i < 9; i++) {
    const a = r() * 6.2832, d = 100 + r() * 12, x = CX + Math.cos(a) * d, y = CY + Math.sin(a) * d;
    e += `<ellipse cx="${f(x)}" cy="${f(y)}" rx="${f(3 + r() * 3)}" ry="${f(1.6 + r() * 1.6)}" fill="#10222e" opacity=".5" transform="rotate(${Math.round(a * 57.3)} ${f(x)} ${f(y)})"/>`;
  }
  e += `<circle cx="${CX}" cy="${CY}" r="${IR + 6}" fill="url(#r22_limb)"/>`;
  // pupilla (fondo dell'occhio: colore del portale)
  e += `<circle cx="${CX}" cy="${CY}" r="${PR + 14}" fill="url(#r22_pring)"/>`;
  e += `<circle cx="${CX}" cy="${CY}" r="${PR}" fill="url(#r22_pup)"/>`;
  // ombra della palpebra superiore e delle ciglia sul bulbo
  e += `<path d="M240 520C330 400 600 350 770 480L770 560L240 600Z" fill="url(#r22_lidsh)"/>`;
  e += `<path d="M240 520C330 400 600 350 770 480" stroke="#1c0f0a" stroke-width="30" fill="none" opacity=".22"/>`;
  let ls = '';
  for (let i = 0; i < 22; i++) {
    const t = 0.2 + i / 22 * 0.7, [x, y] = bz(UP, t), L = 16 + r() * 16, k = (t - 0.5) * 16;
    ls += `M${f(x)} ${f(y)}q${f(k * 0.4)} ${f(L * 0.6)} ${f(k)} ${f(L)}`;
  }
  e += `<path d="${ls}" stroke="#1c0f0a" stroke-width="2.6" fill="none" opacity=".16" stroke-linecap="round"/>`;
  // ombra in basso + menisco lacrimale
  e += `<path d="M770 480C620 655 380 655 240 520" stroke="#7a4a40" stroke-width="16" fill="none" opacity=".16"/>`;
  e += `<path d="M742 506C612 640 392 642 268 532" stroke="#fff" stroke-width="2.4" fill="none" opacity=".7" stroke-linecap="round"/>`;
  // cornea: velo di luce e riflessi (fuori dal raggio 50 del portale)
  e += `<circle cx="${CX}" cy="${CY}" r="${IR}" fill="url(#r22_cor)"/>`;
  e += `<path d="M412 418Q430 404 452 408L458 446Q440 444 420 458Z" fill="#fff" opacity=".92"><animate attributeName="opacity" values=".92;.72;.92" dur="7s" repeatCount="indefinite"/></path>`;
  e += `<path d="M460 407Q470 406 478 410L480 440Q472 440 464 444Z" fill="#fff" opacity=".7"/>`;
  e += `<ellipse cx="436" cy="430" rx="46" ry="38" fill="url(#r22_gl)" opacity=".5"/>`;
  e += `<ellipse cx="578" cy="574" rx="20" ry="11" fill="url(#r22_gl)" opacity=".75" transform="rotate(-40 578 574)"/>`;
  e += `<path d="M408 566A112 112 0 0 0 470 607" stroke="#d8f1f7" stroke-width="5" fill="none" opacity=".3" stroke-linecap="round"/>`;
  s += `<g clip-path="url(#r22_eye)">${e}</g>`;
  // linea umida e bordo palpebra superiore
  s += `<path d="M240 520C330 400 600 350 770 480" stroke="#24130c" stroke-width="5" fill="none" opacity=".9" stroke-linecap="round"/>`;

  // ---------- ciglia ----------
  const lash = (P, t, L, a, w, curl) => {
    const [x, y, tx, ty] = bz(P, t), nx = ty, ny = -tx;
    const dx = nx * Math.cos(a) + tx * Math.sin(a), dy = ny * Math.cos(a) + ty * Math.sin(a);
    const cx = x + (dx * 0.75 + tx * Math.sin(a) * 0.55) * L * 0.6 - nx * curl * L * 0.18, cy = y + (dy * 0.75 + ty * Math.sin(a) * 0.55) * L * 0.6 - ny * curl * L * 0.18;
    const ex = x + dx * L + nx * curl * L * 0.22, ey = y + dy * L + ny * curl * L * 0.22;
    return `M${f(x - tx * w)} ${f(y - ty * w)}Q${f(cx - tx * w * 0.5)} ${f(cy - ty * w * 0.5)} ${f(ex)} ${f(ey)}Q${f(cx + tx * w * 0.6)} ${f(cy + ty * w * 0.6)} ${f(x + tx * w)} ${f(y + ty * w)}Z`;
  };
  let lu1 = '', lu2 = '', ll = '';
  for (let i = 0; i < 78; i++) {
    const t = 0.07 + i / 78 * 0.9 + (r() - 0.5) * 0.008;
    const env = Math.max(0.05, Math.sin(Math.min(1, t * 1.15) * 3.1416)) ** 0.6;
    const L = (24 + 44 * env) * (0.72 + r() * 0.5), a = (t - 0.4) * 1.5 + (r() - 0.5) * 0.3;
    const d = lash(UP, t, L, a, 1.5 + r() * 0.8, 1);
    if (i % 3) lu1 += d; else lu2 += d;
  }
  for (let i = 0; i < 44; i++) {
    const t = 0.08 + i / 44 * 0.74 + (r() - 0.5) * 0.01;
    const [x, y, tx, ty] = bz(LO, t), ox = ty * 9, oy = -tx * 9; // parte dal bordo esterno della rima
    const L = (11 + 15 * Math.sin(t * 3.1416)) * (0.7 + r() * 0.6), a = (0.4 - t) * 1.3 + (r() - 0.5) * 0.4;
    const d = lash(LO, t, L, a, 0.9 + r() * 0.5, 0.6);
    ll += d.replace(/(-?\d+\.?\d*) (-?\d+\.?\d*)/g, (m, px, py) => f(+px + ox) + ' ' + f(+py + oy));
  }
  s += `<path d="${ll}" fill="#2a170e" opacity=".8"/>`;
  s += `<path d="${lu2}" fill="#3a2114" opacity=".85"/>`;
  s += `<path d="${lu1}" fill="#150b07"/>`;
  s += `<rect width="1000" height="1000" fill="url(#r22_vig)"/>`;
  return { defs, svg: s };
})();
