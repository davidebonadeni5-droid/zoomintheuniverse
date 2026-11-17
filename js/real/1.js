// mondo 1: Galassia — spirale barrata realistica, leggermente inclinata
REAL[1] = (() => {
  const rng = s => () => { s |= 0; s = s + 0x6D2B79F5 | 0; let t = Math.imul(s ^ s >>> 15, 1 | s); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
  const r = rng(2207), f = n => (Math.round(n * 10) / 10).toString(), P = [680, 600];
  const far = (x, y, d) => Math.hypot(x - P[0], y - P[1]) > d;
  const Q = .8, ROT = -24 * Math.PI / 180, cR = Math.cos(ROT), sR = Math.sin(ROT);
  // punto del disco (raggio, angolo) -> schermo, con inclinazione
  const pt = (rad, th) => { const a = Math.cos(th) * rad, b = Math.sin(th) * rad * Q; return [500 + a * cR - b * sR, 500 + a * sR + b * cR]; };
  const B = .27, arm = (k, rad) => k * Math.PI / 2 + Math.log(rad / 48) / B + .5;
  const gauss = () => (r() + r() + r() - 1.5) / 1.5;
  const rg = (id, c, o, mid) => `<radialGradient id="r1_${id}"><stop offset="0" stop-color="${c}" stop-opacity="${o}"/>${mid ? `<stop offset=".5" stop-color="${c}" stop-opacity="${o * mid}"/>` : ''}<stop offset="1" stop-color="${c}" stop-opacity="0"/></radialGradient>`;
  const defs =
    `<radialGradient id="r1_halo"><stop offset="0" stop-color="#3a3470" stop-opacity=".75"/><stop offset=".45" stop-color="#1c1a4c" stop-opacity=".5"/><stop offset=".85" stop-color="#0b0828" stop-opacity=".2"/><stop offset="1" stop-color="#06041a" stop-opacity="0"/></radialGradient>` +
    `<radialGradient id="r1_disk"><stop offset="0" stop-color="#ffe9c0" stop-opacity=".7"/><stop offset=".3" stop-color="#d9c2b0" stop-opacity=".38"/><stop offset=".65" stop-color="#6f86c8" stop-opacity=".2"/><stop offset="1" stop-color="#3a4a90" stop-opacity="0"/></radialGradient>` +
    `<radialGradient id="r1_bulge"><stop offset="0" stop-color="#fffdf2"/><stop offset=".14" stop-color="#fff0c4" stop-opacity=".97"/><stop offset=".4" stop-color="#f5c987" stop-opacity=".62"/><stop offset=".72" stop-color="#d99a5c" stop-opacity=".2"/><stop offset="1" stop-color="#c98a50" stop-opacity="0"/></radialGradient>` +
    rg('blue', '#8fb0ff', .3, .45) + rg('wht', '#e6eeff', .28, .4) + rg('pink', '#ff5f92', .8, .35) + rg('dust', '#0a0510', .62, .6) + rg('cl', '#dfeaff', .9, .3) + rg('gs', '#ffffff', .9, .25) +
    `<radialGradient id="r1_p"><stop offset="0" stop-color="#03030c"/><stop offset=".66" stop-color="#03030c"/><stop offset=".8" stop-color="#03030c" stop-opacity=".6"/><stop offset="1" stop-color="#03030c" stop-opacity="0"/></radialGradient>`;
  const deg = f(ROT * 180 / Math.PI);
  let s = `<rect width="1000" height="1000" fill="#06041a"/><circle cx="500" cy="500" r="345" fill="url(#r1_halo)"/>`;
  // stelle di campo dietro
  for (let i = 0; i < 70; i++) {
    const x = r() * 1000, y = r() * 1000; if (!far(x, y, 64)) continue;
    s += `<circle cx="${f(x)}" cy="${f(y)}" r="${f(.4 + r() * .8)}" fill="${r() < .3 ? '#ffe2b8' : '#dfe8ff'}" opacity="${f(.3 + r() * .5)}"/>`;
  }
  s += `<ellipse cx="500" cy="500" rx="318" ry="${f(318 * Q)}" fill="url(#r1_disk)" transform="rotate(${deg} 500 500)"/>`;
  const circ = (x, y, rad, fill, op) => `<circle cx="${f(x)}" cy="${f(y)}" r="${f(rad)}" fill="${fill}"${op != null ? ` opacity="${f(op)}"` : ''}/>`;
  // bracci: nubi luminose sovrapposte lungo spirali logaritmiche
  for (let k = 0; k < 4; k++) {
    const main = k % 2 === 0, n = main ? 50 : 30, r0 = main ? 62 : 110, r1 = main ? 318 : 285;
    for (let i = 0; i < n; i++) {
      const t = i / (n - 1), rad = r0 + (r1 - r0) * t, th = arm(k, rad) + gauss() * .05;
      const [x, y] = pt(rad + gauss() * 8, th), w = (main ? 30 : 22) + t * 26 + r() * 10;
      const fade = Math.min(1, (1 - t) * 3.2) * (main ? 1 : .6);
      s += circ(x, y, w, `url(#r1_${i % 3 === 1 ? 'wht' : 'blue'})`, fade);
    }
  }
  // stelle dei bracci (giovani, azzurre) e del disco (vecchie, gialline)
  const blue = ['#ffffff', '#dbe7ff', '#b9d0ff', '#a5c2ff', '#eef4ff'], old = ['#ffe6bd', '#ffd9a0', '#fff1d6'];
  let stars = '';
  for (let i = 0; i < 285; i++) {
    const k = i % 4, main = k % 2 === 0, t = Math.pow(r(), .8), rad = 60 + t * 262;
    const th = arm(k, rad), [x, y] = pt(rad + gauss() * (9 + t * 20) * (main ? 1 : 1.4), th + gauss() * .04);
    if (!far(x, y, 60)) continue;
    stars += circ(x, y, .5 + r() * r() * 1.9, blue[i % 5], (.4 + r() * .6) * Math.min(1, (1 - t) * 3 + .25));
  }
  for (let i = 0; i < 80; i++) {
    const rad = 30 + Math.pow(r(), 1.5) * 280, [x, y] = pt(rad, r() * 6.283);
    if (!far(x, y, 60)) continue;
    stars += circ(x, y, .4 + r() * .9, old[i % 3], .25 + r() * .45);
  }
  // polvere scura sul bordo interno dei bracci
  let dust = '';
  for (let k = 0; k < 4; k++) {
    const main = k % 2 === 0, n = main ? 64 : 26;
    for (let i = 0; i < n; i++) {
      const t = i / (n - 1), rad = (main ? 52 : 100) + t * (main ? 235 : 160), th = arm(k, rad) + .30 + gauss() * .05;
      const [x, y] = pt(rad + gauss() * 4, th), w = 8 + r() * 7 + t * 5;
      dust += `<ellipse cx="${f(x)}" cy="${f(y)}" rx="${f(w * 1.3)}" ry="${f(w * .8)}" fill="url(#r1_dust)" opacity="${f((main ? .95 : .6) * (1 - t * .55))}" transform="rotate(${f((th + 1.57 + B) * 180 / Math.PI + ROT * 180 / Math.PI)} ${f(x)} ${f(y)})"/>`;
    }
  }
  s += dust + stars;
  // regioni HII rosa e ammassi stellari
  for (let i = 0; i < 46; i++) {
    const k = i % 4, rad = 85 + r() * 215, [x, y] = pt(rad + gauss() * 7, arm(k, rad) + gauss() * .03);
    if (!far(x, y, 72)) continue;
    const w = 3 + r() * 5.5;
    s += circ(x, y, w, 'url(#r1_pink)', .55 + r() * .4) + (i % 3 ? '' : circ(x, y, w * .22, '#ffe3ec', .9));
  }
  for (let i = 0; i < 34; i++) {
    const k = i % 4, rad = 75 + r() * 235, [x, y] = pt(rad + gauss() * 9, arm(k, rad) - .04);
    if (!far(x, y, 72)) continue;
    s += circ(x, y, 2.5 + r() * 4, 'url(#r1_cl)', .7);
  }
  // barra e bulbo
  s += `<ellipse cx="500" cy="500" rx="100" ry="34" fill="url(#r1_bulge)" opacity=".75" transform="rotate(${f(ROT * 180 / Math.PI + 30)} 500 500)"/>`;
  s += `<ellipse cx="500" cy="500" rx="74" ry="${f(74 * .86)}" fill="url(#r1_bulge)" transform="rotate(${deg} 500 500)"/>`;
  for (let i = 0; i < 40; i++) { const [x, y] = pt(8 + r() * 62, r() * 6.283); s += circ(x, y, .4 + r() * .7, '#fff6dc', .3 + r() * .4); }
  s += `<circle cx="500" cy="500" r="9" fill="url(#r1_gs)"/>`;
  // stelle della Via Lattea in primo piano
  [[215, 235, 6], [835, 300, 5], [270, 800, 4.5], [610, 150, 3.5], [860, 790, 3.5], [120, 600, 3]].forEach(([x, y, z], i) => {
    const L = z * 4;
    s += `<g><circle cx="${x}" cy="${y}" r="${z * 2.4}" fill="url(#r1_gs)" opacity=".7"/><path d="M${x - L} ${y}L${x} ${f(y - z * .1)}L${x + L} ${y}L${x} ${f(y + z * .1)}ZM${x} ${y - L}L${f(x + z * .1)} ${y}L${x} ${y + L}L${f(x - z * .1)} ${y}Z" fill="#fff" opacity=".55"/><circle cx="${x}" cy="${y}" r="${f(z * .32)}" fill="#fff"/><animate attributeName="opacity" values="1;.7;1" dur="${6 + i * 1.9}s" repeatCount="indefinite"/></g>`;
  });
  // zona del portale: vuoto scuro del colore del mondo figlio, con un tenue bordo illuminato
  s += `<circle cx="${P[0]}" cy="${P[1]}" r="96" fill="url(#r1_p)"/><circle cx="${P[0]}" cy="${P[1]}" r="66" fill="none" stroke="#9fb8ff" stroke-opacity=".16" stroke-width="2.5"/>`;
  return { defs, svg: s };
})();
