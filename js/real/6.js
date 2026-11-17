// mondo 6: coccinella su una foglia — versione realistica
REAL[6] = (() => {
  let sd = 7706;
  const r = () => { sd = (sd * 1664525 + 1013904223) >>> 0; return sd / 4294967296; };
  const f = n => Math.round(n * 10) / 10;
  const BG = '#3f8f35', PC = '#3a8a32';
  let defs = '', s = '';
  defs +=
    `<radialGradient id="r6_lit" gradientUnits="userSpaceOnUse" cx="360" cy="330" r="420"><stop offset="0" stop-color="#b9e87a" stop-opacity=".30"/><stop offset=".6" stop-color="#8fd060" stop-opacity=".08"/><stop offset="1" stop-color="#8fd060" stop-opacity="0"/></radialGradient>` +
    `<radialGradient id="r6_dark" gradientUnits="userSpaceOnUse" cx="660" cy="640" r="330"><stop offset="0" stop-color="#1d5a1c" stop-opacity=".30"/><stop offset="1" stop-color="#1d5a1c" stop-opacity="0"/></radialGradient>` +
    `<radialGradient id="r6_vig" gradientUnits="userSpaceOnUse" cx="500" cy="500" r="720"><stop offset=".42" stop-color="${BG}" stop-opacity="0"/><stop offset=".6" stop-color="${BG}" stop-opacity="1"/><stop offset="1" stop-color="${BG}"/></radialGradient>` +
    `<radialGradient id="r6_port" gradientUnits="userSpaceOnUse" cx="640" cy="690" r="104"><stop offset="0" stop-color="${PC}"/><stop offset=".64" stop-color="${PC}"/><stop offset=".8" stop-color="#35822e" stop-opacity=".5"/><stop offset="1" stop-color="#3a8a32" stop-opacity="0"/></radialGradient>` +
    `<radialGradient id="r6_sh" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#0b2408" stop-opacity=".62"/><stop offset=".7" stop-color="#0b2408" stop-opacity=".4"/><stop offset="1" stop-color="#0b2408" stop-opacity="0"/></radialGradient>` +
    `<radialGradient id="r6_ely" gradientUnits="userSpaceOnUse" cx="-42" cy="-46" r="175"><stop offset="0" stop-color="#ff8a4a"/><stop offset=".25" stop-color="#ee3a1c"/><stop offset=".6" stop-color="#c81812"/><stop offset=".88" stop-color="#8c0d0c"/><stop offset="1" stop-color="#560606"/></radialGradient>` +
    `<radialGradient id="r6_rim" gradientUnits="userSpaceOnUse" cx="0" cy="0" r="119"><stop offset=".86" stop-color="#2a0202" stop-opacity="0"/><stop offset="1" stop-color="#2a0202" stop-opacity=".6"/></radialGradient>` +
    `<radialGradient id="r6_blk" cx=".32" cy=".28" r=".8"><stop offset="0" stop-color="#4b4a4f"/><stop offset=".35" stop-color="#1d1c20"/><stop offset="1" stop-color="#060607"/></radialGradient>` +
    `<radialGradient id="r6_spot" cx=".35" cy=".3" r=".75"><stop offset="0" stop-color="#34323a"/><stop offset=".5" stop-color="#111014"/><stop offset="1" stop-color="#050506"/></radialGradient>` +
    `<radialGradient id="r6_gl" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#fff" stop-opacity=".85"/><stop offset=".5" stop-color="#fff" stop-opacity=".3"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>` +
    `<radialGradient id="r6_drop" cx=".62" cy=".66" r=".7"><stop offset="0" stop-color="#d9f7a8" stop-opacity=".85"/><stop offset=".35" stop-color="#8fd062" stop-opacity=".6"/><stop offset=".75" stop-color="#3c8a34" stop-opacity=".55"/><stop offset="1" stop-color="#1c5a20" stop-opacity=".8"/></radialGradient>` +
    `<radialGradient id="r6_dsh" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#0d2e0c" stop-opacity=".55"/><stop offset=".6" stop-color="#0d2e0c" stop-opacity=".3"/><stop offset="1" stop-color="#0d2e0c" stop-opacity="0"/></radialGradient>` +
    `<radialGradient id="r6_caus" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#eaffc0" stop-opacity=".8"/><stop offset="1" stop-color="#eaffc0" stop-opacity="0"/></radialGradient>`;

  s += `<rect width="1000" height="1000" fill="${BG}"/>`;
  s += `<circle cx="360" cy="330" r="420" fill="url(#r6_lit)"/><circle cx="660" cy="640" r="330" fill="url(#r6_dark)"/>`;
  // mosaico di cellule epidermiche (rumore fine)
  const tones = ['#4fa043', '#35802d', '#59aa4a', '#2f7729'];
  for (let i = 0; i < 300; i++) {
    const a = r() * 6.2832, d = Math.sqrt(r()) * 420, x = 500 + Math.cos(a) * d, y = 500 + Math.sin(a) * d;
    s += `<ellipse cx="${f(x)}" cy="${f(y)}" rx="${f(3 + r() * 9)}" ry="${f(2 + r() * 5)}" fill="${tones[i % 4]}" opacity="${f(0.14 + r() * 0.22)}" transform="rotate(${Math.round(r() * 180)} ${f(x)} ${f(y)})"/>`;
  }
  // nervature
  const q = t => [(1 - t) ** 2 * 60 + 2 * (1 - t) * t * 520 + t * t * 940, (1 - t) ** 2 * 940 + 2 * (1 - t) * t * 560 + t * t * 60];
  let vS = '', vL = '', vH = '', tert = '';
  for (let t = 0.08; t < 0.95; t += 0.09) {
    const [x, y] = q(t), [x2, y2] = q(t + 0.01), a = Math.atan2(y2 - y, x2 - x);
    for (const sg of [-1, 1]) {
      const b = a + sg * 0.85, L = 330 - Math.abs(t - 0.5) * 200;
      const ex = x + Math.cos(b) * L, ey = y + Math.sin(b) * L, mx = x + Math.cos(a + sg * 0.5) * L * 0.5, my = y + Math.sin(a + sg * 0.5) * L * 0.5;
      const d = `M${f(x)} ${f(y)}Q${f(mx)} ${f(my)} ${f(ex)} ${f(ey)}`;
      vS += d; vL += d;
      // punti lungo la nervatura secondaria -> nervature terziarie
      for (let k = 0; k < 4; k++) {
        const u = 0.2 + k * 0.2 + r() * 0.08;
        const px = (1 - u) ** 2 * x + 2 * (1 - u) * u * mx + u * u * ex, py = (1 - u) ** 2 * y + 2 * (1 - u) * u * my + u * u * ey;
        const ta = b + (r() < 0.5 ? 1 : -1) * (1.1 + r() * 0.6), tl = 34 + r() * 46;
        const cx = px + Math.cos(ta) * tl * 0.5 + (r() - 0.5) * 18, cy = py + Math.sin(ta) * tl * 0.5 + (r() - 0.5) * 18;
        tert += `M${f(px)} ${f(py)}Q${f(cx)} ${f(cy)} ${f(px + Math.cos(ta) * tl)} ${f(py + Math.sin(ta) * tl)}`;
      }
    }
  }
  s += `<path d="${tert}" stroke="#2c7327" stroke-width="2.6" fill="none" opacity=".35" transform="translate(1.2 1.6)"/>`;
  s += `<path d="${tert}" stroke="#63b052" stroke-width="1.6" fill="none" opacity=".6" stroke-linecap="round"/>`;
  s += `<path d="${vS}" stroke="#235f20" stroke-width="7" fill="none" opacity=".4" stroke-linecap="round" transform="translate(2.5 3.5)"/>`;
  s += `<path d="${vL}" stroke="#62ad50" stroke-width="5" fill="none" stroke-linecap="round" opacity=".9"/>`;
  s += `<path d="${vL}" stroke="#93d277" stroke-width="1.6" fill="none" stroke-linecap="round" opacity=".6" transform="translate(-1 -1.2)"/>`;
  const mid = 'M60 940Q520 560 940 60';
  s += `<path d="${mid}" stroke="#1f5a1d" stroke-width="26" fill="none" opacity=".38" transform="translate(5 7)"/>`;
  s += `<path d="${mid}" stroke="#5fa94d" stroke-width="18" fill="none"/>`;
  s += `<path d="${mid}" stroke="#7cc463" stroke-width="10" fill="none" transform="translate(-2 -2.5)"/>`;
  s += `<path d="${mid}" stroke="#b4e596" stroke-width="3" fill="none" opacity=".7" transform="translate(-4.5 -5)"/>`;
  // sfumatura verso il colore del mondo
  s += `<circle cx="500" cy="500" r="720" fill="url(#r6_vig)"/>`;
  // zona del portale: tessuto della foglia leggermente più scuro
  s += `<circle cx="640" cy="690" r="104" fill="url(#r6_port)"/>`;
  // goccioline di rugiada
  const drop = (x, y, R, anim) =>
    `<ellipse cx="${f(x + R * 0.3)}" cy="${f(y + R * 0.36)}" rx="${f(R * 1.12)}" ry="${f(R * 1.08)}" fill="url(#r6_dsh)"/>` +
    `<circle cx="${x}" cy="${y}" r="${R}" fill="url(#r6_drop)"/>` +
    `<ellipse cx="${f(x + R * 0.36)}" cy="${f(y + R * 0.42)}" rx="${f(R * 0.5)}" ry="${f(R * 0.32)}" fill="url(#r6_caus)" transform="rotate(-45 ${f(x + R * 0.36)} ${f(y + R * 0.42)})"/>` +
    `<circle cx="${x}" cy="${y}" r="${f(R - 0.8)}" fill="none" stroke="#f1ffe0" stroke-opacity=".35" stroke-width="${f(Math.max(1, R * 0.04))}"/>` +
    `<ellipse cx="${f(x - R * 0.38)}" cy="${f(y - R * 0.42)}" rx="${f(R * 0.27)}" ry="${f(R * 0.15)}" fill="#fff" opacity=".92" transform="rotate(-38 ${f(x - R * 0.38)} ${f(y - R * 0.42)})">${anim ? '<animate attributeName="opacity" values=".92;.6;.92" dur="5s" repeatCount="indefinite"/>' : ''}</ellipse>` +
    `<circle cx="${f(x - R * 0.12)}" cy="${f(y - R * 0.62)}" r="${f(R * 0.05 + 0.6)}" fill="#fff" opacity=".8"/>`;
  s += drop(740, 290, 48, true);
  [[668, 232, 11], [802, 356, 8], [690, 372, 6], [226, 520, 9], [300, 690, 12], [520, 760, 7], [575, 215, 6], [450, 640, 5]].forEach(([x, y, R]) => s += drop(x, y, R, false));

  // coccinella
  let b = '';
  // zampe (sotto il corpo)
  let legs = '', legH = '';
  for (const sg of [-1, 1]) for (const ly of [-52, 2, 54]) {
    const d = `M${sg * 84} ${ly}l${sg * 44} ${f(ly * 0.34 + 6)}l${sg * 20} ${f(ly * 0.2 + 18)}l${sg * 9} 9`;
    legs += d; legH += d;
  }
  b += `<path d="${legs}" stroke="#0c2a0a" stroke-opacity=".35" stroke-width="9" fill="none" stroke-linecap="round" stroke-linejoin="round" transform="rotate(-35) translate(6 8) rotate(35)"/>`;
  b += `<path d="${legs}" stroke="#141214" stroke-width="6.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
  b += `<path d="${legH}" stroke="#5d5a60" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round" opacity=".7" transform="translate(-1 -1.4)"/>`;
  // antenne
  b += `<g><path d="M-16 -146q-14 -30 -40 -42" stroke="#1a1718" stroke-width="4" fill="none" stroke-linecap="round"/><ellipse cx="-58" cy="-189" rx="7" ry="4.5" fill="#241f1c" transform="rotate(25 -58 -189)"/><animateTransform attributeName="transform" type="rotate" values="0 -16 -146;7 -16 -146;0 -16 -146" dur="4.4s" repeatCount="indefinite"/></g>`;
  b += `<g><path d="M16 -146q14 -30 40 -42" stroke="#1a1718" stroke-width="4" fill="none" stroke-linecap="round"/><ellipse cx="58" cy="-189" rx="7" ry="4.5" fill="#241f1c" transform="rotate(-25 58 -189)"/><animateTransform attributeName="transform" type="rotate" values="0 16 -146;-7 16 -146;0 16 -146" dur="5.2s" repeatCount="indefinite"/></g>`;
  // capo
  b += `<ellipse cx="0" cy="-132" rx="34" ry="24" fill="url(#r6_blk)"/>`;
  b += `<ellipse cx="-25" cy="-134" rx="8" ry="10" fill="#0a0a0c"/><ellipse cx="25" cy="-134" rx="8" ry="10" fill="#0a0a0c"/>`;
  b += `<ellipse cx="-12" cy="-145" rx="6" ry="4" fill="#efe9d6"/><ellipse cx="12" cy="-145" rx="6" ry="4" fill="#efe9d6"/>`;
  // pronoto
  b += `<path d="M-74 -72Q-70 -128 -30 -134Q0 -138 30 -134Q70 -128 74 -72Q0 -104 -74 -72Z" fill="url(#r6_blk)"/>`;
  b += `<path d="M-68 -80Q-64 -116 -40 -126Q-34 -106 -46 -90Z" fill="#f1ecd9"/><path d="M68 -80Q64 -116 40 -126Q34 -106 46 -90Z" fill="#f1ecd9"/>`;
  s += `<ellipse cx="392" cy="398" rx="150" ry="146" fill="url(#r6_sh)"/>`;
  s += `<g transform="translate(370 370) rotate(35)">${b}</g>`;
  // elitre (luce in coordinate non ruotate)
  s += `<g transform="translate(370 370)"><circle r="118" fill="url(#r6_ely)"/><circle r="118" fill="url(#r6_rim)"/></g>`;
  let t = `<path d="M0 -96V117" stroke="#3a0505" stroke-width="3.5" opacity=".85"/><path d="M-2.5 -96V116" stroke="#ff9a78" stroke-width="1.2" opacity=".45"/>`;
  t += `<path d="M-13 -100Q0 -76 13 -100Q0 -108 -13 -100Z" fill="#0c0b0d"/>`;
  [[0, -62, 20, 24], [-56, -18, 23, 25], [56, -18, 23, 25], [-62, 50, 19, 20], [62, 50, 19, 20], [-27, 88, 14, 13], [27, 88, 14, 13]].forEach(([x, y, rx, ry]) =>
    t += `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="url(#r6_spot)"/>`);
  t += `<path d="M-74 -72Q0 -104 74 -72Q0 -92 -74 -72Z" fill="#000" opacity=".35"/>`;
  s += `<g transform="translate(370 370) rotate(35)">${t}</g>`;
  // riflessi lucidi
  s += `<g transform="translate(370 370)"><ellipse cx="-50" cy="-52" rx="46" ry="20" fill="url(#r6_gl)" transform="rotate(-42 -50 -52)"/><ellipse cx="-62" cy="-60" rx="13" ry="5" fill="#fff" opacity=".85" transform="rotate(-42 -62 -60)"/><ellipse cx="30" cy="-84" rx="20" ry="7" fill="url(#r6_gl)" opacity=".6" transform="rotate(12 30 -84)"/><path d="M40 104A112 112 0 0 0 104 38" stroke="#ff8f7a" stroke-width="3" fill="none" opacity=".3" stroke-linecap="round"/></g>`;
  return { defs, svg: s };
})();
