// mondo 10: nucleo atomico, versione realistica
REAL[10] = (() => {
  let seed = 1010;
  const r = () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; };
  const f = n => +n.toFixed(1);
  const P = [560, 470], R = 60;
  const sph = (id, a, b, c, d) => `<radialGradient id="${id}" cx=".5" cy=".5" r=".5" fx=".33" fy=".29"><stop offset="0" stop-color="${a}"/><stop offset=".38" stop-color="${b}"/><stop offset=".8" stop-color="${c}"/><stop offset="1" stop-color="${d}"/></radialGradient>`;
  const soft = (id, c, o) => `<radialGradient id="${id}"><stop offset="0" stop-color="${c}" stop-opacity="${o}"/><stop offset="1" stop-color="${c}" stop-opacity="0"/></radialGradient>`;
  const defs =
    sph('r10_p', '#f6a48f', '#cf4034', '#84201a', '#4a0f0c') +
    sph('r10_n', '#c3d0ea', '#5f7cb8', '#25397a', '#111b45') +
    soft('r10_sh', '#03040f', 0.6) + soft('r10_hl', '#ffffff', 0.7) + soft('r10_bl', '#ffffff', 0.13) + soft('r10_bd', '#000000', 0.16) +
    `<radialGradient id="r10_glow"><stop offset="0" stop-color="#7a3a58" stop-opacity=".55"/><stop offset=".55" stop-color="#3c2c66" stop-opacity=".3"/><stop offset="1" stop-color="#14183f" stop-opacity="0"/></radialGradient>` +
    `<radialGradient id="r10_rim"><stop offset="0" stop-color="#000" stop-opacity="0"/><stop offset=".78" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#02030c" stop-opacity=".5"/></radialGradient>` +
    `<radialGradient id="r10_pp"><stop offset="0" stop-color="#c8372f"/><stop offset=".89" stop-color="#c8372f"/><stop offset="1" stop-color="#6e1712"/></radialGradient>`;
  let s = `<rect width="1000" height="1000" fill="#14183f"/><circle cx="500" cy="500" r="335" fill="url(#r10_glow)"/>`;
  for (let i = 0; i < 70; i++) {
    const a = r() * 6.283, d = 250 + r() * 140;
    s += `<circle cx="${f(500 + Math.cos(a) * d)}" cy="${f(500 + Math.sin(a) * d)}" r="${f(0.8 + r() * 1.8)}" fill="#b9c4ff" opacity="${f(0.08 + r() * 0.2)}"/>`;
  }
  // impacchettamento 3D: due gusci + centro
  const pts = [];
  const shell = (n, rad, ph) => {
    for (let i = 0; i < n; i++) {
      const z = 1 - 2 * (i + 0.5) / n, q = Math.sqrt(1 - z * z), a = i * 2.39996 + ph;
      pts.push([Math.cos(a) * q * rad + (r() - 0.5) * 14, Math.sin(a) * q * rad + (r() - 0.5) * 14, z * rad]);
    }
  };
  shell(28, 200, 0.4); shell(8, 95, 1.3); pts.push([0, 0, 0]);
  const pp = [P[0] - 500, P[1] - 500, 188];
  const balls = pts.filter(p => Math.hypot(p[0] - pp[0], p[1] - pp[1], p[2] - pp[2]) > 104)
    .map((p, i) => ({ x: 500 + p[0], y: 500 + p[1], z: p[2], t: (i * 7 + (r() < 0.3 ? 1 : 0)) % 2 ? 'r10_p' : 'r10_n' }))
    .sort((a, b) => a.z - b.z);
  let n = 0;
  balls.forEach(b => {
    const { x, y, z } = b, fog = (1 - (z + 200) / 400) * 0.6;
    s += `<circle cx="${f(x + 13)}" cy="${f(y + 17)}" r="${R + 14}" fill="url(#r10_sh)"/>`;
    s += `<circle cx="${f(x)}" cy="${f(y)}" r="${R}" fill="url(#${b.t})"/>`;
    for (let j = 0; j < 4; j++) {
      const a = r() * 6.283, d = r() * 34;
      s += `<circle cx="${f(x + Math.cos(a) * d)}" cy="${f(y + Math.sin(a) * d)}" r="${f(9 + r() * 14)}" fill="url(#${r() < 0.5 ? 'r10_bl' : 'r10_bd'})"/>`;
    }
    s += `<circle cx="${f(x)}" cy="${f(y)}" r="${R}" fill="url(#r10_rim)"/>`;
    s += `<ellipse cx="${f(x - 21)}" cy="${f(y - 24)}" rx="17" ry="10" fill="url(#r10_hl)" transform="rotate(-40 ${f(x - 21)} ${f(y - 24)})"/>`;
    if (fog > 0.03) s += `<circle cx="${f(x)}" cy="${f(y)}" r="${R + 0.5}" fill="#0b0e2a" opacity="${f(fog * 10) / 10}"/>`;
    n++;
  });
  // protone-portale: colore pieno fino a r 62, bordo in ombra, lama di luce in alto a sinistra
  s += `<circle cx="${P[0] + 13}" cy="${P[1] + 17}" r="84" fill="url(#r10_sh)"/>`;
  s += `<circle cx="${P[0]}" cy="${P[1]}" r="70" fill="url(#r10_pp)"/>`;
  s += `<path d="M${P[0] - 66} ${P[1] - 8}A66.5 66.5 0 0 1 ${P[0] - 8} ${P[1] - 66}" stroke="#ffb7a3" stroke-opacity=".5" stroke-width="5" fill="none" stroke-linecap="round"/>`;
  s += `<path d="M${P[0] + 66} ${P[1] + 12}A67 67 0 0 1 ${P[0] + 12} ${P[1] + 66}" stroke="#2a0705" stroke-opacity=".45" stroke-width="6" fill="none" stroke-linecap="round"/>`;
  return { defs, svg: s };
})();
