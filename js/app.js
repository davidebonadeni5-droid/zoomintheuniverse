/* Zoom nell'Universo — motore dello zoom infinito.
 * Telecamera: (cx, cy) nel sistema 0..1000 del livello corrente, z = zoom.
 * Quando z ≥ R e il centro è dentro il portale si "scende" al livello figlio;
 * quando z < 1 si "sale" al padre. La catena è circolare → zoom infinito. */
(() => {
  'use strict';
  const N = SCENES.length, R = 10, HALF = 500 / R, SPEED = 0.5;
  const $ = id => document.getElementById(id);
  const svg = $('world'), root = $('root');
  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* niente */ } },
  };
  const mod = i => ((i % N) + N) % N;
  const t = I18N.t;

  // ---------- suoni (sintetizzati, nessun file audio) ----------
  const Sound = (() => {
    let ctx, muted = store.get('ziu-mute', false);
    const ac = () => {
      if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
      if (ctx.state === 'suspended') ctx.resume();
      return ctx;
    };
    function tone(freq, dur, type = 'sine', vol = 0.2, when = 0, slide) {
      if (muted) return;
      try {
        const c = ac(), t0 = c.currentTime + when, o = c.createOscillator(), g = c.createGain();
        o.type = type; o.frequency.setValueAtTime(freq, t0);
        if (slide) o.frequency.exponentialRampToValueAtTime(slide, t0 + dur);
        g.gain.setValueAtTime(0.0001, t0); g.gain.exponentialRampToValueAtTime(vol, t0 + 0.015); g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
        o.connect(g).connect(c.destination); o.start(t0); o.stop(t0 + dur + 0.05);
      } catch { /* audio non disponibile */ }
    }
    return {
      get muted() { return muted; },
      toggle() { muted = !muted; store.set('ziu-mute', muted); if (!muted) tone(660, 0.1, 'triangle', 0.12); return muted; },
      tap() { tone(600, 0.06, 'triangle', 0.07); },
      found() { [523, 659, 784, 1047].forEach((f, i) => tone(f, 0.18, 'triangle', 0.16, i * 0.09)); },
      secret() { [523, 659, 784, 1047, 1319].forEach((f, i) => tone(f, 0.22, 'square', 0.06, i * 0.1)); tone(1568, 0.7, 'triangle', 0.14, 0.5); },
      level(down) { tone(down ? 260 : 1040, 0.55, 'sine', 0.12, 0, down ? 1040 : 260); },
      hide() { tone(880, 0.1, 'sine', 0.1); tone(1320, 0.14, 'sine', 0.1, 0.1); },
      tick() { tone(1200, 0.04, 'square', 0.05); },
      fail() { tone(220, 0.35, 'sawtooth', 0.08, 0, 110); },
      win() { [523, 659, 784, 1047, 784, 1047, 1319].forEach((f, i) => tone(f, 0.2, 'triangle', 0.16, i * 0.11)); },
    };
  })();
  const origin = i => [SCENES[i].portal[0] - HALF, SCENES[i].portal[1] - HALF];
  const fixedPt = i => { const o = origin(i); return [o[0] * R / (R - 1), o[1] * R / (R - 1)]; };
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

  // ---------- stato ----------
  let W = 0, H = 0, base = 1;
  let idx = 0, cx = 500, cy = 500, z = 1, depth = 0;
  let auto = false, pendingZoom = 0, anchor = null, dirty = true;
  let challenge = null;
  let hideMode = false, chosenEmoji = '🦄';
  const found = new Set(store.get('ziu-found', []));
  let visitor = null; const visitorFound = new Set();
  let mine = [];

  const ALL = [];
  SCENES.forEach((sc, i) => sc.items.forEach((it, j) => { it.id = i + '-' + j; it.scene = i; ALL.push(it); }));
  const ITEM = Object.fromEntries(ALL.map(it => [it.id, it]));

  $('defs').innerHTML =
    `<radialGradient id="softG"><stop offset="0" stop-color="#fff"/><stop offset=".78" stop-color="#fff"/><stop offset="1" stop-color="#000"/></radialGradient>` +
    `<mask id="soft" maskUnits="userSpaceOnUse" x="0" y="0" width="1000" height="1000"><rect width="1000" height="1000" fill="url(#softG)"/></mask>` +
    SCENES.map(s => s.defs).join('');

  // ---------- costruzione della pila di livelli ----------
  const glyph = (x, y, s, e) =>
    `<circle cx="${x}" cy="${y}" r="${s * 0.8}" fill="transparent"/><text transform="translate(${x} ${y}) scale(${s / 100})" font-size="100">${esc(e)}</text>`;

  function sceneMarkup(i, inner, masked) {
    const sc = SCENES[i], o = origin(i);
    const items = sc.items.map(it =>
      `<g class="item${found.has(it.id) ? ' found' : ''}" data-item="${it.id}">${glyph(it.x, it.y, it.s, it.e)}</g>`).join('');
    const secrets = (list, kind) => list.map((s, j) => s.l === i ?
      `<g class="secret" data-secret="${kind}:${j}">${glyph(s.x, s.y, s.s, s.e)}</g>` : '').join('');
    return `<g${masked ? ' mask="url(#soft)"' : ''}>${sc.svg}${items}${visitor ? secrets(visitor.s, 'v') : ''}${secrets(mine, 'm')}` +
      `<g transform="translate(${o[0]} ${o[1]}) scale(${1 / R})">${inner}</g></g>`;
  }
  function build() {
    let inner = '';
    for (let d = 2; d >= 0; d--) inner = sceneMarkup(mod(idx + d), inner, true);
    root.innerHTML = sceneMarkup(mod(idx - 1), inner, false);
    dirty = true;
  }
  function render() {
    const k = z * base, o = origin(mod(idx - 1));
    const px = o[0] + cx / R, py = o[1] + cy / R;
    root.setAttribute('transform', `translate(${W / 2} ${H / 2}) scale(${k * R}) translate(${-px} ${-py})`);
  }

  // ---------- passaggi di livello ----------
  function normalize() {
    let changed = false; const depthBefore = depth;
    for (let g = 0; g < 6; g++) {
      const o = origin(idx);
      if (z >= R && cx >= o[0] && cx <= o[0] + 2 * HALF && cy >= o[1] && cy <= o[1] + 2 * HALF) {
        cx = (cx - o[0]) * R; cy = (cy - o[1]) * R; z /= R; idx = mod(idx + 1); depth++; changed = true; continue;
      }
      if (z < 1) {
        idx = mod(idx - 1); const q = origin(idx);
        cx = q[0] + cx / R; cy = q[1] + cy / R; z *= R; depth--; changed = true; continue;
      }
      break;
    }
    cx = clamp(cx, 0, 1000); cy = clamp(cy, 0, 1000); z = Math.min(z, R * 4);
    dirty = true;
    if (changed) { build(); updateHUD(true); Sound.level(depth < depthBefore); }
  }
  function zoomAt(sx, sy, factor) {
    const k = z * base, wx = cx + (sx - W / 2) / k, wy = cy + (sy - H / 2) / k;
    z *= factor;
    const k2 = z * base;
    cx = wx - (sx - W / 2) / k2; cy = wy - (sy - H / 2) / k2;
    normalize();
  }
  function pan(dx, dy) { const k = z * base; cx -= dx / k; cy -= dy / k; normalize(); }

  // ---------- loop di animazione ----------
  let last = performance.now();
  function frame(t) {
    const dt = Math.min(0.05, (t - last) / 1000); last = t;
    if (pendingZoom) {
      const step = pendingZoom * Math.min(1, dt * 8);
      pendingZoom -= step; if (Math.abs(pendingZoom) < 1e-4) pendingZoom = 0;
      const a = anchor || [W / 2, H / 2];
      zoomAt(a[0], a[1], Math.exp(step));
    }
    if (auto) {
      const fp = fixedPt(idx), zo = z;
      z *= Math.exp(SPEED * dt);
      const ratio = zo / z;
      cx = fp[0] + (cx - fp[0]) * ratio; cy = fp[1] + (cy - fp[1]) * ratio;
      const ix = fp[0] + (500 - fp[0]) / z, iy = fp[1] + (500 - fp[1]) / z, a = Math.min(1, dt * 1.5);
      cx += (ix - cx) * a; cy += (iy - cy) * a;
      normalize();
    }
    if (dirty) { render(); updateLadder(); dirty = false; }
    requestAnimationFrame(frame);
  }

  function resize() { W = innerWidth; H = innerHeight; base = Math.min(W, H) / 1000; dirty = true; }
  addEventListener('resize', resize);

  // ---------- input ----------
  const ptrs = new Map(); let down = null, pinch = null;
  const pinchState = () => {
    const [a, b] = [...ptrs.values()];
    return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2, d: Math.hypot(a.x - b.x, a.y - b.y) || 1 };
  };
  svg.addEventListener('pointerdown', e => {
    ptrs.set(e.pointerId, { x: e.clientX, y: e.clientY });
    try { svg.setPointerCapture(e.pointerId); } catch { /* niente */ }
    if (ptrs.size === 1) down = { x: e.clientX, y: e.clientY, target: e.target, moved: false };
    else { if (down) down.moved = true; pinch = pinchState(); }
  });
  svg.addEventListener('pointermove', e => {
    const p = ptrs.get(e.pointerId); if (!p) return;
    const dx = e.clientX - p.x, dy = e.clientY - p.y;
    p.x = e.clientX; p.y = e.clientY;
    if (ptrs.size === 1 && down) {
      if (!down.moved && Math.hypot(e.clientX - down.x, e.clientY - down.y) > 7) { down.moved = true; setAuto(false); }
      if (down.moved) pan(dx, dy);
    } else if (ptrs.size >= 2 && pinch) {
      const n = pinchState();
      setAuto(false);
      zoomAt(n.x, n.y, n.d / pinch.d);
      pan(n.x - pinch.x, n.y - pinch.y);
      pinch = n;
    }
  });
  function endPtr(e) {
    if (!ptrs.has(e.pointerId)) return;
    if (ptrs.size === 1 && down && !down.moved && e.type === 'pointerup') tap(down.target, e.clientX, e.clientY);
    ptrs.delete(e.pointerId);
    if (ptrs.size < 2) pinch = null;
    if (ptrs.size === 0) down = null;
  }
  svg.addEventListener('pointerup', endPtr);
  svg.addEventListener('pointercancel', endPtr);
  svg.addEventListener('wheel', e => {
    e.preventDefault(); setAuto(false);
    const unit = e.deltaMode === 1 ? 0.05 : e.deltaMode === 2 ? 1 : 0.0018;
    anchor = [e.clientX, e.clientY];
    pendingZoom = clamp(pendingZoom - e.deltaY * unit, -Math.log(12), Math.log(12));
  }, { passive: false });
  addEventListener('keydown', e => {
    if (e.target.closest('input, textarea')) return;
    const step = 60;
    if (e.key === '+' || e.key === '=') { anchor = null; pendingZoom += Math.log(2); }
    else if (e.key === '-' || e.key === '_') { anchor = null; pendingZoom -= Math.log(2); }
    else if (e.key === ' ') { e.preventDefault(); setAuto(!auto); }
    else if (e.key === 'ArrowLeft') pan(step, 0);
    else if (e.key === 'ArrowRight') pan(-step, 0);
    else if (e.key === 'ArrowUp') pan(0, step);
    else if (e.key === 'ArrowDown') pan(0, -step);
    else if (e.key === 'Escape') closeModal();
  });

  function tap(target, x, y) {
    const it = target && target.closest && target.closest('[data-item]');
    if (it) return collect(it.dataset.item, x, y);
    const sc = target && target.closest && target.closest('[data-secret]');
    if (sc) return openSecret(sc.dataset.secret, x, y);
    if (hideMode) placeSecret(x, y);
  }

  // ---------- oggetti nascosti ----------
  function collect(id, x, y) {
    const it = ITEM[id];
    if (challenge && challenge.targets.includes(id) && !challenge.found.has(id)) {
      challenge.found.add(id); confetti(x, y); Sound.found(); updateChallenge();
      if (challenge.found.size === challenge.targets.length) return endChallenge(true);
      toast(t('chFound', `${it.e} ${it.name}`, challenge.targets.length - challenge.found.size));
      if (!found.has(id)) { found.add(id); store.set('ziu-found', [...found]); build(); updateHUD(false); }
      return;
    }
    if (found.has(id)) { toast(t('alreadyFound', `${it.e} ${it.name}`)); Sound.tap(); return; }
    found.add(id); store.set('ziu-found', [...found]);
    confetti(x, y); Sound.found();
    const world = SCENES[it.scene].items.every(i => found.has(i.id));
    toast(t('youFound', `${it.e} ${it.name}`) + (world ? '<br>' + t('worldDone', SCENES[it.scene].name) : ''));
    build(); updateHUD(false);
    if (found.size === ALL.length) setTimeout(() => Sound.win() || showModal(t('allFound')), 900);
  }
  function hintFor(it) {
    const dx = it.x - 500, dy = it.y - 500;
    const where = t('where', dy < -120 ? -1 : dy > 120 ? 1 : 0, dx < -120 ? -1 : dx > 120 ? 1 : 0);
    return t('hintItem', `${it.e} <b>${esc(it.name)}</b>`, where, esc(SCENES[it.scene].name), it.s < 9);
  }

  // ---------- segreti (nascondi & condividi) ----------
  function b64e(obj) {
    const bytes = new TextEncoder().encode(JSON.stringify(obj)); let bin = '';
    bytes.forEach(b => bin += String.fromCharCode(b));
    return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }
  function b64d(str) {
    const bin = atob(str.replace(/-/g, '+').replace(/_/g, '/'));
    return JSON.parse(new TextDecoder().decode(Uint8Array.from(bin, c => c.charCodeAt(0))));
  }
  function readHash() {
    const m = location.hash.match(/[#&]s=([A-Za-z0-9_-]+)/);
    if (!m) return null;
    try {
      const d = b64d(m[1]), num = (v, a, b) => Number.isFinite(+v) ? clamp(+v, a, b) : null;
      const s = (Array.isArray(d.s) ? d.s : []).slice(0, 20).map(x => ({
        l: num(x.l, 0, N - 1) | 0, x: num(x.x, 0, 1000), y: num(x.y, 0, 1000), s: num(x.s, 0.05, 120),
        e: String(x.e || '🎁').slice(0, 16), m: String(x.m || '').slice(0, 300),
      })).filter(x => x.x !== null && x.y !== null && x.s !== null);
      return s.length ? { n: String(d.n || '').slice(0, 40), s } : null;
    } catch { return null; }
  }
  function locate(sx, sy) {
    const k = z * base;
    let x = cx + (sx - W / 2) / k, y = cy + (sy - H / 2) / k, l = idx, px = k;
    if (Math.hypot(x - 500, y - 500) > 400) {
      l = mod(idx - 1); const o = origin(l); x = o[0] + x / R; y = o[1] + y / R; px = k * R;
    } else {
      for (let d = 0; d < 2; d++) {
        const p = SCENES[l].portal;
        if (Math.hypot(x - p[0], y - p[1]) >= HALF * 0.75) break;
        const o = origin(l); x = (x - o[0]) * R; y = (y - o[1]) * R; l = mod(l + 1); px /= R;
      }
    }
    return { l, x: Math.round(x * 100) / 100, y: Math.round(y * 100) / 100, px };
  }
  function placeSecret(sx, sy) {
    const p = locate(sx, sy);
    const s = Math.round(clamp(28 / p.px, 0.05, 120) * 1000) / 1000;
    mine.push({ l: p.l, x: p.x, y: p.y, s, e: chosenEmoji, m: $('hideMsg').value.trim().slice(0, 300) });
    build(); updateHideCount(); confetti(sx, sy, 10); Sound.hide();
    toast(t('hiddenIn', chosenEmoji, SCENES[p.l].name));
  }
  function openSecret(key, x, y) {
    const [kind, j] = key.split(':'), list = kind === 'v' ? visitor && visitor.s : mine, s = list && list[+j];
    if (!s) return;
    confetti(x, y, 40); Sound.secret();
    const who = kind === 'v' ? (visitor.n || t('someone')) : '';
    if (kind === 'v') { visitorFound.add(+j); updateBanner(); }
    const card = document.createElement('div');
    card.innerHTML = `<div class="big"></div><h2></h2><p class="msg"></p>`;
    card.querySelector('.big').textContent = s.e;
    card.querySelector('h2').textContent = kind === 'v' ? t('foundSecretOf', who) : t('yourSecret');
    card.querySelector('.msg').textContent = s.m ? `“${s.m}”` : t('noMessage');
    if (kind === 'v' && visitorFound.size === visitor.s.length) card.insertAdjacentHTML('beforeend', `<p>${t('allSecrets')}</p>`);
    showModal(card);
  }

  // ---------- sfida a tempo ----------
  const CH_N = 5, CH_TIME = 180;
  function startChallenge() {
    setHide(false); setAuto(false); closeModal();
    const pool = ALL.filter(it => it.scene !== idx), targets = [];
    const bySc = new Map();
    pool.forEach(it => { if (!bySc.has(it.scene)) bySc.set(it.scene, []); bySc.get(it.scene).push(it); });
    const scs = [...bySc.keys()].sort(() => Math.random() - 0.5).slice(0, CH_N);
    scs.forEach(sc => { const l = bySc.get(sc); targets.push(l[Math.floor(Math.random() * l.length)].id); });
    challenge = { targets, found: new Set(), end: Date.now() + CH_TIME * 1000, timer: setInterval(tickChallenge, 250), warned: false };
    document.body.classList.add('challenge');
    $('chBar').hidden = false; updateChallenge();
    toast(t('chStart', CH_N, CH_TIME / 60));
    Sound.win();
  }
  function tickChallenge() {
    if (!challenge) return;
    const left = Math.max(0, Math.ceil((challenge.end - Date.now()) / 1000));
    $('chTime').textContent = `${Math.floor(left / 60)}:${String(left % 60).padStart(2, '0')}`;
    $('chTime').classList.toggle('low', left <= 20);
    if (left <= 10 && left > 0 && left !== challenge.lastTick) { challenge.lastTick = left; Sound.tick(); }
    if (left === 0) endChallenge(false);
  }
  function updateChallenge() {
    const box = $('chItems'); box.innerHTML = '';
    challenge.targets.forEach(id => {
      const it = ITEM[id], b = document.createElement('button');
      b.textContent = it.e; b.className = challenge.found.has(id) ? 'ok' : 'sil';
      b.title = challenge.found.has(id) ? it.name : t('hintTitle');
      b.onclick = () => toast(challenge.found.has(id) ? `✅ ${it.e} ${it.name}` : hintFor(it));
      box.appendChild(b);
    });
  }
  function endChallenge(won) {
    if (!challenge) return;
    clearInterval(challenge.timer);
    const n = challenge.found.size, took = CH_TIME - Math.max(0, Math.ceil((challenge.end - Date.now()) / 1000));
    challenge = null; document.body.classList.remove('challenge'); $('chBar').hidden = true;
    if (won === null) return toast(t('chCancelled'));
    const best = store.get('ziu-best', null);
    const fmt = sec => `${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, '0')}`;
    let h;
    if (won) {
      Sound.win();
      const record = best === null || took < best;
      if (record) store.set('ziu-best', took);
      h = t('chWon', CH_N, fmt(took), record, record ? '' : fmt(best));
    } else {
      Sound.fail();
      h = t('chLost', n, CH_N, best !== null ? fmt(best) : '');
    }
    h += `<div class="row center"><button class="primary big-btn" id="chAgain">${t('chAgain')}</button></div>`;
    showModal(h); $('chAgain').onclick = startChallenge;
  }
  $('btnChallenge').onclick = () => challenge ? endChallenge(null) : startChallenge();
  $('chStop').onclick = () => endChallenge(null);

  // ---------- scala laterale ----------
  const ladder = $('ladder');
  SCENES.forEach((sc, i) => {
    const b = document.createElement('button'); b.textContent = sc.emoji;
    b.onclick = () => { setAuto(false); Sound.tap(); window.ziu.go(i); toast(`${sc.emoji} ${sc.name}`); };
    ladder.appendChild(b);
  });
  const ladderMark = document.createElement('span'); ladderMark.className = 'mark'; ladder.appendChild(ladderMark);
  function labelLadder() {
    ladder.querySelectorAll('button').forEach((b, i) => { b.title = SCENES[i].name; b.setAttribute('aria-label', t('goTo', SCENES[i].name)); });
  }
  function updateLadder() {
    const frac = clamp(Math.log(z) / Math.log(R), 0, 1), pos = (idx + frac + 0.5) / N * 100;
    ladderMark.style.top = pos + '%';
    ladder.querySelectorAll('button').forEach((b, i) => b.classList.toggle('on', i === idx));
  }

  // ---------- HUD ----------
  let lastShown = -1;
  function updateHUD(levelChanged) {
    const sc = SCENES[idx];
    $('placeEmoji').textContent = sc.emoji;
    $('placeName').textContent = sc.name;
    $('placeScale').textContent = sc.scale;
    $('factText').textContent = sc.fact;
    $('foundCount').textContent = found.size;
    const loops = Math.floor(depth / N);
    $('depth').textContent = t('level', depth) + (loops > 0 ? t('loops', loops) : '');
    const tray = $('trayItems'); tray.innerHTML = '';
    sc.items.forEach(it => {
      const b = document.createElement('button');
      b.className = 'tray-item' + (found.has(it.id) ? '' : ' sil');
      b.textContent = it.e; b.title = found.has(it.id) ? it.name : t('hintTitle');
      b.setAttribute('aria-label', found.has(it.id) ? t('foundTag', it.name) : t('toFind'));
      b.onclick = () => toast(found.has(it.id) ? `✅ ${it.e} ${it.name}` : hintFor(it));
      tray.appendChild(b);
    });
    if (levelChanged && idx !== lastShown) {
      lastShown = idx;
      const bt = $('bigTitle');
      bt.textContent = `${sc.emoji} ${sc.name}`;
      bt.classList.remove('show'); void bt.offsetWidth; bt.classList.add('show');
      if (depth === N) toast(t('loopToast'));
    }
  }
  function updateBanner() {
    const b = $('secretBanner');
    if (!visitor) { b.hidden = true; return; }
    b.hidden = false;
    const k = visitor.s.length;
    $('bannerText').textContent = t('banner', visitor.n || t('someone'), k, visitorFound.size);
  }
  $('bannerHint').onclick = () => {
    const j = visitor.s.findIndex((_, i) => !visitorFound.has(i));
    if (j < 0) return toast(t('bannerAll'));
    const s = visitor.s[j], sc = SCENES[s.l];
    toast(t('secretHint', `${sc.emoji} <b>${esc(sc.name)}</b>`, s.s < 1 ? 2 : s.s < 6 ? 1 : 0));
  };

  // ---------- pulsanti ----------
  function setAuto(on) { auto = on; $('btnAuto').textContent = on ? '⏸️' : '▶️'; $('btnAuto').setAttribute('aria-label', t(on ? 'stopAutoAria' : 'autoAria')); }
  $('btnAuto').onclick = () => setAuto(!auto);
  $('btnIn').onclick = () => { setAuto(false); anchor = null; pendingZoom += Math.log(2.5); };
  $('btnOut').onclick = () => { setAuto(false); anchor = null; pendingZoom -= Math.log(2.5); };
  $('btnSound').onclick = () => { const m = Sound.toggle(); $('btnSound').textContent = m ? '🔇' : '🔊'; toast(t(m ? 'soundOff' : 'soundOn')); };
  $('btnSound').textContent = Sound.muted ? '🔇' : '🔊';
  $('place').onclick = () => $('place').classList.toggle('open');
  $('btnCollection').onclick = () => {
    let h = `<h2>${t('collTitle')}</h2><p>${t('collCount', found.size, ALL.length)}</p><div class="coll">`;
    SCENES.forEach(sc => {
      h += `<div class="coll-row"><span class="coll-world">${sc.emoji} ${esc(sc.name)}</span><span>` +
        sc.items.map(it => found.has(it.id) ? `<span title="${esc(it.name)}">${it.e}</span>` : `<span class="sil" title="${esc(t('toFindShort'))}">${it.e}</span>`).join('') + `</span></div>`;
    });
    h += `</div>`;
    if (found.size) h += `<button class="ghost" id="resetFound">${t('reset')}</button>`;
    showModal(h);
    const rb = $('resetFound');
    if (rb) rb.onclick = () => { found.clear(); store.set('ziu-found', []); build(); updateHUD(false); closeModal(); toast(t('resetDone')); };
  };

  // modalità nascondi
  const EMOJIS = ['🦄', '💌', '🍕', '🐶', '👑', '🎁', '🍦', '🐸', '💎', '🦖', '🌈', '🍀', '❤️', '⭐', '🐼', '🎂'];
  const pickEl = $('emojiPick');
  EMOJIS.forEach(e => {
    const b = document.createElement('button'); b.textContent = e; b.className = e === chosenEmoji ? 'on' : '';
    b.onclick = () => { chosenEmoji = e; pickEl.querySelectorAll('button').forEach(x => x.classList.toggle('on', x === b)); };
    pickEl.appendChild(b);
  });
  function setHide(on) {
    hideMode = on; document.body.classList.toggle('hiding', on);
    $('hidePanel').hidden = !on; $('btnHide').classList.toggle('on', on);
    if (on) { setAuto(false); toast(t('hideOn')); }
  }
  $('btnHide').onclick = () => setHide(!hideMode);
  $('hideClose').onclick = () => setHide(false);
  function updateHideCount() {
    $('hideCount').textContent = mine.length ? t('hiddenCount', mine.length, mine.map(s => s.e).join(' ')) : t('noneHidden');
    $('shareOut').hidden = true;
  }
  $('hideUndo').onclick = () => { mine.pop(); build(); updateHideCount(); };
  $('hideShare').onclick = async () => {
    if (!mine.length) return toast(t('hideFirst'));
    const url = location.origin + location.pathname + '#s=' + b64e({ n: $('hideName').value.trim().slice(0, 40), s: mine });
    $('shareUrl').value = url; $('shareOut').hidden = false;
    if (navigator.share) { try { await navigator.share({ title: t('title'), text: t('shareText'), url }); return; } catch { /* annullato */ } }
    copy(url);
  };
  $('copyBtn').onclick = () => copy($('shareUrl').value);
  function copy(text) {
    (navigator.clipboard ? navigator.clipboard.writeText(text) : Promise.reject())
      .then(() => toast(t('copied')))
      .catch(() => { $('shareUrl').select(); toast(t('copyBelow')); });
  }

  // ---------- modale, toast, coriandoli ----------
  function showModal(content) {
    const body = $('modalBody'); body.innerHTML = '';
    if (typeof content === 'string') body.innerHTML = content; else body.appendChild(content);
    $('modal').hidden = false;
  }
  function closeModal() { $('modal').hidden = true; }
  $('modalClose').onclick = closeModal;
  $('modal').onclick = e => { if (e.target === $('modal')) closeModal(); };
  let toastT;
  function toast(html) {
    const t = $('toast'); t.innerHTML = html; t.classList.add('show');
    clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove('show'), 3600);
  }
  function confetti(x, y, n = 26) {
    const cols = ['#ffd93d', '#ff6b9d', '#4cc9f0', '#6bcb77', '#c77dff', '#ff8c42'];
    for (let i = 0; i < n; i++) {
      const c = document.createElement('span'); c.className = 'confetto';
      const a = Math.random() * Math.PI * 2, d = 60 + Math.random() * 120;
      c.style.cssText = `left:${x}px;top:${y}px;background:${cols[i % cols.length]};--dx:${Math.cos(a) * d}px;--dy:${Math.sin(a) * d - 40}px;--r:${Math.random() * 720}deg`;
      document.body.appendChild(c); setTimeout(() => c.remove(), 1300);
    }
  }

  // ---------- avvio ----------
  function loadVisitor() {
    visitor = readHash(); visitorFound.clear();
    introTexts(); updateBanner(); build();
  }
  function introTexts() {
    if (!visitor) return;
    $('introTitle').textContent = t('huntTitle');
    $('introText').textContent = t('huntText', visitor.n || t('someone'), visitor.s.length);
  }
  addEventListener('hashchange', loadVisitor);

  // ---------- lingua ----------
  function applyLang() {
    I18N.applyDom(); introTexts(); labelLadder(); updateBanner(); updateHideCount();
    setAuto(auto); lastShown = -1; updateHUD(false);
    if (challenge) updateChallenge();
  }
  const switchLang = () => { I18N.setLang(I18N.lang === 'it' ? 'en' : 'it'); applyLang(); Sound.tap(); toast(t('langChanged')); };
  $('btnLang').onclick = switchLang;
  $('introLang').onclick = switchLang;
  $('startAuto').onclick = () => { $('intro').hidden = true; setAuto(true); };
  $('startFree').onclick = () => { $('intro').hidden = true; toast(t('freeToast')); };

  // chi preferisce meno animazioni: fermiamo quelle dei mondi
  const rm = matchMedia('(prefers-reduced-motion: reduce)');
  const applyMotion = () => { try { rm.matches ? svg.pauseAnimations() : svg.unpauseAnimations(); } catch { /* niente */ } };
  rm.addEventListener && rm.addEventListener('change', applyMotion); applyMotion();

  $('totalCount').textContent = ALL.length;
  resize(); loadVisitor(); applyLang(); updateHUD(true);
  requestAnimationFrame(frame);

  // piccola API per test/debug
  window.ziu = {
    get state() { return { idx, cx, cy, z, depth }; },
    go(i, x = 500, y = 500, zz = 1) { idx = mod(i); cx = x; cy = y; z = zz; build(); normalize(); updateHUD(true); },
  };
})();
