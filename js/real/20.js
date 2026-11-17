// mondo 20: alveare — favo di cera, miele e api, versione realistica
REAL[20] = (() => {
  let sd = 2020;
  const r = () => { sd = (sd * 1664525 + 1013904223) >>> 0; return sd / 4294967296; };
  const f = n => Math.round(n * 10) / 10;
  const BG = '#e0a021', PC = '#5a2f8f';
  const rg = (id, a, stops) => `<radialGradient id="r20_${id}" ${a}>${stops.map(([o, c, op]) => `<stop offset="${o}" stop-color="${c}"${op == null ? '' : ` stop-opacity="${op}"`}/>`).join('')}</radialGradient>`;
  const lg = (id, a, stops) => `<linearGradient id="r20_${id}" ${a}>${stops.map(([o, c, op]) => `<stop offset="${o}" stop-color="${c}"${op == null ? '' : ` stop-opacity="${op}"`}/>`).join('')}</linearGradient>`;
  const US = 'gradientUnits="userSpaceOnUse"';
  let defs =
    rg('lit', `${US} cx="360" cy="330" r="430"`, [[0, '#fff0b0', .42], [.6, '#ffe08a', .12], [1, '#ffe08a', 0]]) +
    rg('dark', `${US} cx="680" cy="680" r="340"`, [[0, '#8a4a05', .3], [1, '#8a4a05', 0]]) +
    rg('vig', `${US} cx="500" cy="500" r="720"`, [[.4, BG, 0], [.57, BG, 1], [1, BG]]) +
    rg('hon', 'cx=".42" cy=".4" r=".7"', [[0, '#f6b01e'], [.45, '#dd8a0c'], [.85, '#b86705'], [1, '#9a5203']]) +
    rg('hon2', 'cx=".45" cy=".42" r=".7"', [[0, '#e99a12'], [.5, '#c87408'], [1, '#8f4a03']]) +
    rg('emp', 'cx=".56" cy=".58" r=".62"', [[0, '#2c1503'], [.45, '#56300a'], [.8, '#8f5a14'], [1, '#b97f22']]) +
    rg('cap', 'cx=".38" cy=".34" r=".8"', [[0, '#fbe6a2'], [.45, '#efcb6c'], [.85, '#d9a63c'], [1, '#c48d28']]) +
    lg('ish', 'x1=".1" y1=".05" x2=".9" y2=".95"', [[0, '#3a1c02', .62], [.3, '#3a1c02', .16], [.55, '#3a1c02', 0], [.8, '#fff1b0', 0], [1, '#fff1b0', .3]]) +
    lg('rim', 'x1=".1" y1=".05" x2=".9" y2=".95"', [[0, '#fff3c0'], [.5, '#f6cf66'], [1, '#b87a14']]) +
    rg('gl', 'cx=".5" cy=".5" r=".5"', [[0, '#fff', .9], [.5, '#fff', .35], [1, '#fff', 0]]) +
    rg('port', `${US} cx="500" cy="500" r="96"`, [[0, PC], [.74, PC], [.86, '#4a2577', .45], [1, '#4a2577', 0]]) +
    rg('sh', 'cx=".5" cy=".5" r=".5"', [[0, '#3a1a00', .55], [.6, '#3a1a00', .3], [1, '#3a1a00', 0]]) +
    rg('abd', `${US} cx="-10" cy="36" r="72"`, [[0, '#f7c04a'], [.4, '#dc9224'], [.8, '#8f5510'], [1, '#4a2906']]) +
    lg('abs', `${US} x1="-32" y1="50" x2="32" y2="60"`, [[0, '#fff2c0', .25], [.4, '#000', 0], [1, '#1a0c00', .6]]) +
    rg('thx', `${US} cx="-8" cy="-22" r="38"`, [[0, '#e3ad4a'], [.5, '#9a661c'], [1, '#3a2208']]) +
    rg('hd', `${US} cx="-5" cy="-57" r="24"`, [[0, '#6a4a1c'], [.6, '#2a1a08'], [1, '#120a03']]) +
    lg('wg', `${US} x1="-50" y1="-10" x2="50" y2="90"`, [[0, '#ffffff', .62], [.5, '#e8f2ff', .26], [1, '#cfe0ee', .4]]) +
    `<clipPath id="r20_ac"><path d="M0 2C34 2 36 60 0 106C-36 60-34 2 0 2Z"/></clipPath>`;

  let s = `<rect width="1000" height="1000" fill="${BG}"/>`;
  s += `<circle cx="360" cy="330" r="430" fill="url(#r20_lit)"/><circle cx="680" cy="680" r="340" fill="url(#r20_dark)"/>`;
  // grana della cera
  const wt = ['#f7d680', '#c98a14', '#ffe9a8', '#b97a10'];
  for (let i = 0; i < 110; i++) {
    const a = r() * 6.2832, d = Math.sqrt(r()) * 400, x = 500 + Math.cos(a) * d, y = 500 + Math.sin(a) * d;
    s += `<ellipse cx="${f(x)}" cy="${f(y)}" rx="${f(2 + r() * 7)}" ry="${f(1.5 + r() * 4)}" fill="${wt[i % 4]}" opacity="${f(0.15 + r() * 0.25)}" transform="rotate(${Math.round(r() * 180)} ${f(x)} ${f(y)})"/>`;
  }
  // celle esagonali
  const R = 78, RI = 66, S3 = Math.sqrt(3);
  const hex = (cx, cy, rad) => { let p = ''; for (let k = 0; k < 6; k++) p += `${f(cx + rad * Math.cos(k * Math.PI / 3))},${f(cy + rad * Math.sin(k * Math.PI / 3))} `; return p.trim(); };
  const forced = [[300, 300, 'e'], [720, 640, 'e'], [290, 650, 'c']];
  const cells = [];
  for (let i = -4; i <= 4; i++) for (let j = -5; j <= 5; j++) {
    const cx = 500 + 1.5 * R * i, cy = 500 + S3 * R * (j + i / 2), d = Math.hypot(cx - 500, cy - 500);
    if (d > 440) continue;
    let t = r() < 0.5 ? 'h' : r() < 0.45 ? 'e' : r() < 0.6 ? 'c' : 'g';
    for (const [ox, oy, ft] of forced) if (Math.hypot(cx - ox, cy - oy) < R) t = ft;
    if (d < 1) t = 'p';
    cells.push([cx, cy, t]);
  }
  for (const [cx, cy, t] of cells) {
    if (t === 'p') continue;
    const P = hex(cx, cy, RI);
    // ombra della parete sul fondo + riempimento
    s += `<polygon points="${hex(cx, cy, RI + 5)}" fill="#a86a0c" opacity=".55"/>`;
    s += `<polygon points="${P}" fill="url(#r20_${t === 'h' ? 'hon' : t === 'g' ? 'hon2' : t === 'e' ? 'emp' : 'cap'})"/>`;
    if (t === 'e') {
      s += `<polygon points="${hex(cx + 5, cy + 6, 40)}" fill="#241002" opacity=".5"/>`;
      s += `<path d="M${f(cx + 5)} ${f(cy + 6)}l-20 -34.6M${f(cx + 5)} ${f(cy + 6)}l40 0M${f(cx + 5)} ${f(cy + 6)}l-20 34.6" stroke="#a8702a" stroke-width="2" opacity=".5" fill="none"/>`;
    }
    s += `<polygon points="${P}" fill="url(#r20_ish)"/>`;
    s += `<polygon points="${P}" fill="none" stroke="url(#r20_rim)" stroke-width="3.2" stroke-linejoin="round" opacity=".9"/>`;
    if (t === 'h' || t === 'g') {
      // riflessi lucidi del miele
      const jx = (r() - .5) * 8, jy = (r() - .5) * 8;
      s += `<ellipse cx="${f(cx - 20 + jx)}" cy="${f(cy - 24 + jy)}" rx="${f(22 + r() * 6)}" ry="${f(8 + r() * 3)}" fill="url(#r20_gl)" opacity="${t === 'h' ? .8 : .55}" transform="rotate(-32 ${f(cx - 20 + jx)} ${f(cy - 24 + jy)})"/>`;
      s += `<circle cx="${f(cx - 30 + jx)}" cy="${f(cy - 14 + jy)}" r="${f(2.5 + r() * 2)}" fill="#fff" opacity=".85"/>`;
      s += `<path d="M${f(cx - 8)} ${f(cy + 44)}Q${f(cx + 34)} ${f(cy + 42)} ${f(cx + 46)} ${f(cy + 10)}" stroke="#ffd76a" stroke-width="5" stroke-linecap="round" opacity=".32" fill="none"/>`;
    } else if (t === 'c') {
      for (let k = 0; k < 5; k++) {
        const a = r() * 6.28, d = r() * 38, x = cx + Math.cos(a) * d, y = cy + Math.sin(a) * d, rr = 6 + r() * 9;
        s += `<circle cx="${f(x + 2)}" cy="${f(y + 2.5)}" r="${f(rr)}" fill="#a87214" opacity=".28"/><circle cx="${f(x)}" cy="${f(y)}" r="${f(rr)}" fill="#f6dc92" opacity=".55"/>`;
      }
    }
  }
  // cella del portale
  s += `<circle cx="500" cy="500" r="96" fill="url(#r20_port)"/>`;
  s += `<polygon points="${hex(500, 500, 74)}" fill="${PC}"/>`;
  s += `<polygon points="${hex(500, 500, 74)}" fill="none" stroke="url(#r20_rim)" stroke-width="3.5" stroke-linejoin="round" opacity=".9"/>`;
  s += `<path d="M463 436L537 436L574 500" stroke="#2c1150" stroke-width="5" stroke-linejoin="round" opacity=".4" fill="none"/>`;
  s += `<circle cx="500" cy="500" r="720" fill="url(#r20_vig)"/>`;

  // ape realistica (vista dall'alto, testa verso -y)
  const bee = (x, y, rot, sc, anim) => {
    let b = `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${sc})">`;
    b += `<ellipse cx="12" cy="20" rx="56" ry="96" fill="url(#r20_sh)"/>`;
    let lp = '';
    for (const g of [-1, 1]) lp += `M${g * 16} -28L${g * 44} -50L${g * 52} -72M${g * 22} -12L${g * 56} -8L${g * 70} 14M${g * 20} 2L${g * 50} 32L${g * 58} 68`;
    b += `<path d="${lp}" transform="translate(7 10)" stroke="#2a1200" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" fill="none" opacity=".28"/>`;
    b += `<path d="${lp}" stroke="#24150a" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`;
    b += `<path d="${lp}" transform="translate(-1 -1)" stroke="#8a6230" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" fill="none" opacity=".7"/>`;
    // addome a bande
    b += `<path d="M0 2C34 2 36 60 0 106C-36 60-34 2 0 2Z" fill="url(#r20_abd)"/>`;
    let bands = '', fz = '';
    for (const yy of [26, 46, 64, 80, 93]) bands += `M-40 ${yy}Q0 ${yy + 9} 40 ${yy}v8.5Q0 ${yy + 17.5} -40 ${yy + 8.5}Z`;
    for (let i = 0; i < 70; i++) { const hx = (r() - .5) * 60, hy = 8 + r() * 90; fz += `M${f(hx)} ${f(hy)}l${f((r() - .5) * 3)} ${f(4 + r() * 5)}`; }
    b += `<g clip-path="url(#r20_ac)"><path d="${bands}" fill="#1c1006" opacity=".93"/><path d="${fz}" stroke="#ffe2a0" stroke-width="1" opacity=".55" fill="none"/><path d="M-40 0H40V110H-40Z" fill="url(#r20_abs)"/><ellipse cx="-11" cy="44" rx="6" ry="27" fill="#fff" opacity=".2"/></g>`;
    // ali
    let w = '', v = '';
    for (const g of [-1, 1]) {
      w += `<path d="M${g * 8} -14C${g * 40} 0 ${g * 46} 44 ${g * 30} 66C${g * 18} 70 ${g * 10} 40 ${g * 6} -6Z" fill="url(#r20_wg)" opacity=".7"/>`;
      w += `<path d="M${g * 10} -22C${g * 54} -12 ${g * 66} 62 ${g * 42} 96C${g * 24} 104 ${g * 13} 60 ${g * 7} -8Z" fill="url(#r20_wg)" stroke="#fff" stroke-opacity=".55" stroke-width="1"/>`;
      v += `M${g * 10} -20C${g * 40} -6 ${g * 52} 50 ${g * 40} 92M${g * 12} -12C${g * 30} 10 ${g * 34} 60 ${g * 30} 94M${g * 28} 22L${g * 48} 30M${g * 31} 48L${g * 52} 58M${g * 22} 60L${g * 33} 72`;
    }
    b += anim ? `<g>${w}<path d="${v}" stroke="#6a4a20" stroke-width=".9" opacity=".5" fill="none"/><animate attributeName="opacity" values="1;.72;1" dur="${anim}s" repeatCount="indefinite"/></g>` : `${w}<path d="${v}" stroke="#6a4a20" stroke-width=".9" opacity=".5" fill="none"/>`;
    b += `<path d="M-30 6C-46 30 -46 62 -38 84" stroke="#fff" stroke-width="2.2" stroke-linecap="round" opacity=".6" fill="none"/>`;
    // torace peloso
    b += `<circle cx="0" cy="-14" r="27" fill="url(#r20_thx)"/>`;
    let h1 = '', h2 = '';
    for (let i = 0; i < 120; i++) {
      const a = r() * 6.2832, d = Math.sqrt(r()) * 28, hx = Math.cos(a) * d, hy = -14 + Math.sin(a) * d, L = 4 + r() * 5;
      const seg = `M${f(hx)} ${f(hy)}l${f(Math.cos(a) * L + (r() - .5) * 3)} ${f(Math.sin(a) * L + (r() - .5) * 3)}`;
      if (i % 3) h1 += seg; else h2 += seg;
    }
    b += `<path d="${h2}" stroke="#4a2c0a" stroke-width="1.4" stroke-linecap="round" opacity=".8" fill="none"/><path d="${h1}" stroke="#f6d27c" stroke-width="1.2" stroke-linecap="round" opacity=".8" fill="none"/>`;
    // testa, occhi, antenne
    b += `<path d="M-6 -63L-13 -78Q-20 -92 -33 -90M6 -63L13 -78Q20 -92 33 -90" stroke="#1a0f05" stroke-width="2.8" stroke-linecap="round" fill="none"/>`;
    b += `<ellipse cx="0" cy="-52" rx="19" ry="15" fill="url(#r20_hd)"/>`;
    let hh = '';
    for (let i = 0; i < 18; i++) { const hx = (r() - .5) * 20, hy = -52 + (r() - .5) * 16; hh += `M${f(hx)} ${f(hy)}l${f((r() - .5) * 3)} ${f(-3 - r() * 3)}`; }
    b += `<path d="${hh}" stroke="#d9b060" stroke-width="1" opacity=".7" fill="none"/>`;
    for (const g of [-1, 1]) b += `<ellipse cx="${g * 15}" cy="-53" rx="6.5" ry="11" fill="#0c0806" transform="rotate(${g * 16} ${g * 15} -53)"/><ellipse cx="${g * 14 - 2}" cy="-58" rx="1.8" ry="3.6" fill="#fff" opacity=".5"/>`;
    return b + '</g>';
  };
  s += bee(668, 318, 38, 1.08, 7) + bee(462, 772, -102, 1.02, 0) + bee(226, 474, 158, 1.05, 9);
  // scintille sul miele
  s += `<circle cx="596" cy="560" r="5" fill="#fff" opacity=".8"><animate attributeName="opacity" values=".8;.25;.8" dur="5s" repeatCount="indefinite"/></circle>`;
  s += `<circle cx="352" cy="424" r="4.5" fill="#fff" opacity=".7"><animate attributeName="opacity" values=".3;.85;.3" dur="6.5s" repeatCount="indefinite"/></circle>`;
  return { defs, svg: s };
})();
