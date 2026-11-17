// mondo 14: Corpo umano — bambino sdraiato sul prato, visto dall'alto (versione realistica)
REAL[14] = (() => {
  let seed = 1414;
  const r = () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; };
  const f = (n) => Math.round(n * 10) / 10;
  const PX = 530, PY = 425;
  let d = '', s = '';
  // ---------- defs ----------
  d += `<radialGradient id="r14_lt" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#9ad672" stop-opacity=".5"/><stop offset="1" stop-color="#9ad672" stop-opacity="0"/></radialGradient>`;
  d += `<radialGradient id="r14_dk" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#2c6a2a" stop-opacity=".5"/><stop offset="1" stop-color="#2c6a2a" stop-opacity="0"/></radialGradient>`;
  d += `<radialGradient id="r14_sh" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#0d2a0c" stop-opacity=".55"/><stop offset=".7" stop-color="#0d2a0c" stop-opacity=".3"/><stop offset="1" stop-color="#0d2a0c" stop-opacity="0"/></radialGradient>`;
  d += `<radialGradient id="r14_head" cx=".4" cy=".36" r=".72"><stop offset="0" stop-color="#f6d2b3"/><stop offset=".55" stop-color="#e6b08a"/><stop offset=".88" stop-color="#c98b63"/><stop offset="1" stop-color="#a86c48"/></radialGradient>`;
  d += `<linearGradient id="r14_hair" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#6a452a"/><stop offset=".5" stop-color="#4a2e1a"/><stop offset="1" stop-color="#2c1a0e"/></linearGradient>`;
  d += `<linearGradient id="r14_shirt" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#9fdcf2"/><stop offset=".45" stop-color="#63bfe2"/><stop offset="1" stop-color="#3489b3"/></linearGradient>`;
  d += `<linearGradient id="r14_slv" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#86d0ec"/><stop offset="1" stop-color="#2f80aa"/></linearGradient>`;
  d += `<linearGradient id="r14_jean" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#4a6a92"/><stop offset=".5" stop-color="#2f4b70"/><stop offset="1" stop-color="#1b2f4c"/></linearGradient>`;
  d += `<radialGradient id="r14_shoe" cx=".38" cy=".3" r=".8"><stop offset="0" stop-color="#ef5a5f"/><stop offset=".6" stop-color="#c92d38"/><stop offset="1" stop-color="#7e1620"/></radialGradient>`;
  d += `<radialGradient id="r14_chk" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#e8817c" stop-opacity=".5"/><stop offset="1" stop-color="#e8817c" stop-opacity="0"/></radialGradient>`;
  d += `<radialGradient id="r14_win" gradientUnits="userSpaceOnUse" cx="${PX}" cy="${PY}" r="118"><stop offset="0" stop-color="#4a0b14"/><stop offset=".72" stop-color="#5a0f19" stop-opacity=".95"/><stop offset=".9" stop-color="#6d1a24" stop-opacity=".5"/><stop offset="1" stop-color="#6d1a24" stop-opacity="0"/></radialGradient>`;
  d += `<radialGradient id="r14_heart" gradientUnits="userSpaceOnUse" cx="${PX}" cy="${PY}" r="104"><stop offset="0" stop-color="#8b1e2b"/><stop offset=".64" stop-color="#8b1e2b"/><stop offset=".82" stop-color="#7a1824"/><stop offset="1" stop-color="#560d18"/></radialGradient>`;
  d += `<radialGradient id="r14_pulse" gradientUnits="userSpaceOnUse" cx="${PX}" cy="${PY}" r="112"><stop offset=".7" stop-color="#ff6b78" stop-opacity="0"/><stop offset=".86" stop-color="#ff6b78" stop-opacity=".45"/><stop offset="1" stop-color="#ff6b78" stop-opacity="0"/></radialGradient>`;

  // ---------- prato ----------
  s += `<rect width="1000" height="1000" fill="#5aa64c"/>`;
  for (let i = 0; i < 46; i++) {
    const a = r() * 6.283, q = Math.sqrt(r()) * 400, rad = 40 + r() * 70;
    s += `<ellipse cx="${f(500 + Math.cos(a) * q)}" cy="${f(500 + Math.sin(a) * q)}" rx="${f(rad)}" ry="${f(rad * (0.6 + r() * 0.4))}" fill="url(#r14_${i % 2 ? 'lt' : 'dk'})" opacity="${f(0.25 + r() * 0.3)}"/>`;
  }
  const bladeCols = ['#3c8433', '#74c25c', '#479a3d', '#8fd06c', '#357a2f', '#66b552'];
  bladeCols.forEach((c, ci) => {
    let p = '';
    for (let i = 0; i < 190; i++) {
      const a = r() * 6.283, q = Math.sqrt(r()) * 430, x = 500 + Math.cos(a) * q, y = 500 + Math.sin(a) * q;
      const ang = -1.2 + (r() - 0.5) * 1.6, L = 9 + r() * 15, bend = (r() - 0.5) * 9;
      const ex = Math.cos(ang) * L, ey = Math.sin(ang) * L;
      p += `M${f(x)} ${f(y)}q${f(ex / 2 + bend)} ${f(ey / 2)} ${f(ex)} ${f(ey)}`;
    }
    s += `<path d="${p}" stroke="${c}" stroke-width="${ci % 2 ? 1.3 : 1.9}" fill="none" stroke-linecap="round" opacity="${ci % 2 ? 0.7 : 0.8}"/>`;
  });
  // margherite e trifogli
  for (let i = 0; i < 14; i++) {
    const a = r() * 6.283, q = 150 + r() * 250, x = f(500 + Math.cos(a) * q), y = f(500 + Math.sin(a) * q);
    s += `<circle cx="${x}" cy="${y}" r="4.2" fill="none" stroke="#f7f7ee" stroke-width="3.4" stroke-dasharray="2.1 1.2"/><circle cx="${x}" cy="${y}" r="1.9" fill="#e9b93a"/>`;
  }

  // ---------- ombra del corpo (luce dall'alto a sinistra) ----------
  const armL = 'M428 348Q375 362 335 388T250 420', armR = 'M572 348Q628 358 672 372T752 330';
  const legL = 'M468 600Q452 665 442 718T428 828', legR = 'M534 600Q565 670 588 742T580 836';
  const torso = 'M410 320Q500 298 590 320L600 575Q500 592 400 575Z';
  const sil = (o, w) => `<g transform="translate(${o} ${f(o * 1.25)})" fill="#0d2a0c" stroke="#0d2a0c" stroke-linecap="round" stroke-linejoin="round" opacity="${w}"><path d="${legL}${legR}" stroke-width="50" fill="none"/><path d="${armL}${armR}" stroke-width="44" fill="none"/><path d="${torso}" stroke-width="14"/><path d="M414 560h172l16 92h-96l-6-36l-6 36h-96z" stroke-width="8"/><ellipse cx="500" cy="232" rx="84" ry="92"/><ellipse cx="424" cy="856" rx="34" ry="26"/><ellipse cx="582" cy="862" rx="34" ry="26"/><circle cx="244" cy="423" r="24"/><circle cx="757" cy="327" r="24"/></g>`;
  s += `<ellipse cx="512" cy="530" rx="300" ry="390" fill="url(#r14_sh)" opacity=".28"/>`;
  s += sil(22, 0.1) + sil(13, 0.16) + sil(6, 0.22);

  // ---------- arti (pelle con volume cilindrico) ----------
  const limb = (p, w) => `<path d="${p}" stroke="#a9704a" stroke-width="${w}" fill="none" stroke-linecap="round"/><path d="${p}" transform="translate(-2.5 -3)" stroke="#e2ad85" stroke-width="${w - 8}" fill="none" stroke-linecap="round"/><path d="${p}" transform="translate(-6 -8)" stroke="#f6d4b6" stroke-width="${f(w * 0.26)}" fill="none" stroke-linecap="round" opacity=".6"/>`;
  s += limb(legL, 46) + limb(legR, 46);
  // ginocchia
  s += `<ellipse cx="441" cy="722" rx="15" ry="18" fill="#f1c8a6" opacity=".45"/><ellipse cx="588" cy="745" rx="15" ry="18" fill="#f1c8a6" opacity=".45"/><path d="M430 738q12 8 24 0M577 762q12 8 24-2" stroke="#a9704a" stroke-width="2" fill="none" opacity=".5"/>`;
  // calzini e scarpe da ginnastica
  const shoe = (x, y, rot) => `<g transform="translate(${x} ${y}) rotate(${rot})"><rect x="-21" y="-40" width="42" height="22" rx="9" fill="#f4f4f0"/><path d="M-21-30h42M-21-24h42" stroke="#cfcfc8" stroke-width="1.6"/><ellipse cx="0" cy="0" rx="31" ry="25" fill="url(#r14_shoe)"/><path d="M-27 8Q0 30 27 8Q20 24 0 25T-27 8Z" fill="#f6f3ea"/><path d="M-14-14L14-8M-15-6L15 0M-13 3L13 8" stroke="#fbfbf6" stroke-width="2.6" stroke-linecap="round"/><ellipse cx="-11" cy="-10" rx="9" ry="5" fill="#ff9a9c" opacity=".4" transform="rotate(-30 -11 -10)"/></g>`;
  s += shoe(425, 852, 8) + shoe(580, 860, -6);
  s += limb(armL, 40) + limb(armR, 40);
  // mani
  const hand = (x, y, rot) => `<g transform="translate(${x} ${y}) rotate(${rot})"><path d="M-8-12L-30-20M-10-5L-36-7M-10 3L-35 6M-8 10L-29 17M4-14L-4-30" stroke="#a9704a" stroke-width="10" stroke-linecap="round"/><path d="M-8-12L-30-20M-10-5L-36-7M-10 3L-35 6M-8 10L-29 17M4-14L-4-30" stroke="#e6b28b" stroke-width="7.4" stroke-linecap="round" transform="translate(-.8 -1)"/><ellipse cx="0" cy="0" rx="20" ry="19" fill="#a9704a"/><ellipse cx="-1.5" cy="-2" rx="18" ry="17" fill="#e6b28b"/><ellipse cx="-5" cy="-6" rx="9" ry="7" fill="#f6d4b6" opacity=".55"/><path d="M-10 4Q-2-2 8 6" stroke="#b9805a" stroke-width="1.4" fill="none" opacity=".7"/></g>`;
  s += hand(246, 422, -8) + hand(755, 328, 160);

  // ---------- pantaloncini di jeans ----------
  s += `<path d="M414 556h172l16 96q-48 8-96 0l-6-40l-6 40q-48 8-96 0z" fill="url(#r14_jean)"/>`;
  s += `<path d="M500 575v38M430 600q20 14 50 6M520 606q30 8 54-6M420 640q40 10 70 2M512 642q40 8 84-2" stroke="#16263f" stroke-width="2.4" fill="none" opacity=".55"/>`;
  s += `<path d="M426 584q28-10 60 0M440 624q20-8 40 0M520 588q30-10 62 2" stroke="#7d9cc4" stroke-width="2" fill="none" opacity=".45"/>`;
  s += `<path d="M400 648q48 9 94 1M506 649q48 8 96-1" stroke="#c9a35a" stroke-width="1.4" stroke-dasharray="4 3" fill="none" opacity=".7"/>`;

  // ---------- collo ----------
  s += `<path d="M468 296h64l6 34q-38 14-76 0z" fill="#c98b63"/><ellipse cx="500" cy="312" rx="36" ry="12" fill="#6b3f26" opacity=".4"/>`;

  // ---------- maglietta ----------
  s += `<path d="M410 320Q372 330 356 368L418 392ZM590 320Q628 330 644 368L582 392Z" fill="url(#r14_slv)"/>`;
  s += `<path d="${torso}" fill="url(#r14_shirt)"/>`;
  s += `<path d="M356 368L418 392M644 368L582 392" stroke="#e6f6fc" stroke-width="3" opacity=".6"/>`;
  // pieghe del tessuto
  s += `<path d="M418 392Q428 470 412 560M582 392Q590 470 596 560M430 540Q500 560 585 538M425 505Q460 520 500 512M440 345Q455 372 430 395M560 345Q548 372 574 395" stroke="#1f6d93" stroke-width="5" fill="none" opacity=".28" stroke-linecap="round"/>`;
  s += `<path d="M424 400Q436 470 422 548M436 528Q500 548 572 528M447 348Q460 370 440 388" stroke="#d9f3fc" stroke-width="3.5" fill="none" opacity=".4" stroke-linecap="round"/>`;
  s += `<path d="M400 575Q500 592 600 575" stroke="#256f96" stroke-width="5" fill="none" opacity=".6"/>`;
  // colletto
  s += `<path d="M462 311Q500 346 538 311" stroke="#2f80aa" stroke-width="9" fill="none" stroke-linecap="round"/><path d="M462 310Q500 343 538 310" stroke="#b6e6f6" stroke-width="3" fill="none" stroke-linecap="round"/>`;
  // ombra della testa sulla maglietta
  s += `<ellipse cx="512" cy="330" rx="62" ry="16" fill="#12384c" opacity=".22"/>`;

  // ---------- finestra anatomica: gabbia toracica e cuore ----------
  s += `<ellipse cx="${PX}" cy="${PY}" rx="100" ry="110" fill="url(#r14_win)"/>`;
  // costole
  let ribs = '';
  for (let k = -3; k <= 3; k++) { const y = PY + k * 30; ribs += `M${PX - 96} ${y + 10}Q${PX} ${y - 18} ${PX + 96} ${y + 10}`; }
  s += `<path d="${ribs}" stroke="#e9dcc6" stroke-width="9" fill="none" opacity=".34" stroke-linecap="round"/><path d="${ribs}" stroke="#fff8ea" stroke-width="2.5" fill="none" opacity=".3" transform="translate(-1 -3)"/>`;
  s += `<ellipse cx="${PX}" cy="${PY}" rx="112" ry="112" fill="url(#r14_pulse)"><animate attributeName="opacity" values=".25;1;.4;.8;.25" dur="1.2s" repeatCount="indefinite"/></ellipse>`;
  const H = `translate(${PX} ${PY})`;
  // grandi vasi
  s += `<g transform="${H}" fill="none" stroke-linecap="round"><path d="M-58-50Q-66-78-62-104" stroke="#3d4c86" stroke-width="20"/><path d="M-61-52Q-69-78-65-104" stroke="#7c8cc6" stroke-width="5" opacity=".7"/>`;
  s += `<path d="M-4-70Q-12-112 22-112T56-84" stroke="#8f2330" stroke-width="27"/><path d="M-9-72Q-17-116 22-118" stroke="#e0717a" stroke-width="6" opacity=".6"/>`;
  s += `<path d="M26-66Q4-92-34-98" stroke="#4a5a98" stroke-width="20"/><path d="M24-72Q4-96-34-103" stroke="#93a2d8" stroke-width="5" opacity=".65"/></g>`;
  // cuore
  s += `<path transform="${H} translate(7 9)" d="M-62-48C-85-10-70 50-20 88C5 105 30 100 45 80C78 45 88 0 72-45C62-72 30-82 0-74C-25-84-50-72-62-48Z" fill="#1c0206" opacity=".45"/>`;
  s += `<path transform="${H}" d="M-62-48C-85-10-70 50-20 88C5 105 30 100 45 80C78 45 88 0 72-45C62-72 30-82 0-74C-25-84-50-72-62-48Z" fill="url(#r14_heart)"/>`;
  s += `<circle cx="${PX}" cy="${PY}" r="64" fill="#8b1e2b"/>`;
  // coronarie, grasso epicardico e riflessi (tutto oltre il raggio 52)
  s += `<g transform="${H}" fill="none" stroke-linecap="round"><path d="M10-72Q52-58 62-22T60 34Q52 62 34 84M62-22Q78-14 80 6M-28-68Q-62-48-68-8T-50 50Q-36 74-12 88M-68-8Q-78 6-74 24" stroke="#4a0a12" stroke-width="4.5" opacity=".7"/><path d="M9-73Q51-60 61-24T59 33M-29-69Q-63-50-69-9T-51 49" stroke="#d8626c" stroke-width="1.6" opacity=".8"/>`;
  s += `<path d="M-40-64Q-10-80 30-70" stroke="#e8c98a" stroke-width="6" opacity=".55"/>`;
  s += `<path d="M-63-36Q-72-8-62 22" stroke="#f2a0a6" stroke-width="7" opacity=".4"/><path d="M-60-40Q-66-24-64-10" stroke="#ffd9dc" stroke-width="3" opacity=".5"/><path d="M-10 84Q20 96 44 72" stroke="#2c0408" stroke-width="7" opacity=".35"/></g>`;

  // ---------- testa ----------
  s += `<ellipse cx="423" cy="240" rx="10" ry="17" fill="#c98b63"/><ellipse cx="577" cy="240" rx="10" ry="17" fill="#b47a54"/><ellipse cx="424" cy="240" rx="5" ry="10" fill="#a2663f" opacity=".6"/>`;
  // capelli sparsi sull'erba
  s += `<path d="M418 250Q398 150 470 132Q520 118 566 150Q604 182 584 252Q574 200 500 196T418 250Z" fill="url(#r14_hair)"/>`;
  s += `<ellipse cx="500" cy="240" rx="76" ry="84" fill="url(#r14_head)"/>`;
  // frangia
  s += `<path d="M426 228Q428 160 500 154T574 228Q566 196 536 186Q520 204 494 196Q470 210 452 198Q434 206 426 228Z" fill="url(#r14_hair)"/>`;
  let st = '', st2 = '';
  for (let i = 0; i < 46; i++) {
    const t = i / 45, a = Math.PI * (1.08 + t * 0.84), x0 = 500 + Math.cos(a) * (70 + r() * 16), y0 = 236 + Math.sin(a) * (80 + r() * 18);
    const x1 = 500 + Math.cos(a) * 46 + (r() - 0.5) * 16, y1 = 236 + Math.sin(a) * 44 + r() * 10;
    const seg = `M${f(x0)} ${f(y0)}Q${f((x0 + x1) / 2 + (r() - 0.5) * 14)} ${f((y0 + y1) / 2 - 6)} ${f(x1)} ${f(y1)}`;
    if (i % 2) st += seg; else st2 += seg;
  }
  s += `<path d="${st}" stroke="#8a5f3c" stroke-width="1.5" fill="none" opacity=".6" stroke-linecap="round"/><path d="${st2}" stroke="#1f1108" stroke-width="1.8" fill="none" opacity=".5" stroke-linecap="round"/>`;
  s += `<path d="M452 168Q490 150 530 162" stroke="#a87a50" stroke-width="5" fill="none" opacity=".35" stroke-linecap="round"/>`;
  // viso: guance, occhi, naso, bocca
  s += `<ellipse cx="455" cy="272" rx="20" ry="15" fill="url(#r14_chk)"/><ellipse cx="545" cy="272" rx="20" ry="15" fill="url(#r14_chk)"/>`;
  const eye = (x) => `<path d="M${x - 13} 246Q${x} 235 ${x + 13} 246Q${x} 254 ${x - 13} 246Z" fill="#f4efe8"/><circle cx="${x}" cy="245.5" r="6" fill="#5b3a1e"/><circle cx="${x}" cy="245.5" r="2.8" fill="#120a05"/><circle cx="${x - 2}" cy="243.5" r="1.4" fill="#fff"/><path d="M${x - 14} 246Q${x} 233 ${x + 14} 246" stroke="#3a2416" stroke-width="2.6" fill="none" stroke-linecap="round"/><path d="M${x - 12} 248Q${x} 256 ${x + 12} 248" stroke="#a86c48" stroke-width="1.2" fill="none" opacity=".7"/><path d="M${x - 16} 230Q${x} 221 ${x + 16} 229" stroke="#4a2e1a" stroke-width="4" fill="none" stroke-linecap="round" opacity=".85"/>`;
  s += eye(472) + eye(528);
  s += `<path d="M503 248Q510 268 508 280Q502 286 494 282" stroke="#a86c48" stroke-width="3" fill="none" opacity=".55" stroke-linecap="round"/><ellipse cx="498" cy="270" rx="4" ry="9" fill="#fbe2cc" opacity=".6"/><ellipse cx="493" cy="283" rx="2.2" ry="1.4" fill="#7c452a" opacity=".7"/><ellipse cx="506" cy="283" rx="2.2" ry="1.4" fill="#7c452a" opacity=".7"/>`;
  s += `<path d="M478 298Q490 294 500 297Q510 294 522 298Q500 314 478 298Z" fill="#c0675f"/><path d="M478 298Q500 303 522 298" stroke="#7d3a36" stroke-width="1.6" fill="none"/><path d="M490 305Q500 308 510 305" stroke="#e9a39a" stroke-width="2" fill="none" opacity=".7" stroke-linecap="round"/>`;
  s += `<path d="M474 312Q500 326 526 312" stroke="#a86c48" stroke-width="3" fill="none" opacity=".35"/>`;
  return { defs: d, svg: s };
})();
