// Controlla un file di lingua: node tools/check-lang.js fr
const fs = require('fs'), vm = require('vm'), path = require('path');
const code = process.argv[2], root = path.join(__dirname, '..');
const ctx = { location: { search: '', hash: '', href: 'http://x/' }, localStorage: { getItem: () => null, setItem() {} }, navigator: { language: 'en' }, URLSearchParams, console };
vm.createContext(ctx);
const src = ['js/scenes.js', 'js/levels.js', 'js/i18n.js', `js/lang/${code}.js`].map(f => fs.readFileSync(path.join(root, f), 'utf8')).join('\n') +
  `\n;globalThis.__out = { I18N, LEVEL_TEXT, n: SCENES.length };`;
vm.runInContext(src, ctx);
const { I18N, LEVEL_TEXT, n } = ctx.__out, errs = [];
if (!I18N.LANGS.includes(code)) errs.push('lingua non registrata');
const en = fs.readFileSync(path.join(root, 'js/i18n.js'), 'utf8');
const enBlock = en.slice(en.indexOf('    en: {'), en.indexOf('  // Testi delle scene in inglese'));
const keys = [...enBlock.matchAll(/^      ([a-zA-Z0-9]+):/gm)].map(m => m[1]);
const src2 = fs.readFileSync(path.join(root, `js/lang/${code}.js`), 'utf8');
keys.forEach(k => { if (!new RegExp(`\\b${k}\\s*:`).test(src2)) errs.push('chiave UI mancante: ' + k); });
I18N.setLang = I18N.setLang; // noop
// prova tutte le funzioni
const pack = vm.runInContext(`(() => { let p; const r = I18N.register; I18N.register = (c, x) => { p = x; }; ${src2}; I18N.register = r; return p; })()`, ctx);
if (!pack) errs.push('I18N.register non chiamato');
else {
  if (!pack.name || !pack.flag) errs.push('name/flag mancanti');
  for (const [k, v] of Object.entries(pack.ui || {})) if (typeof v === 'function') {
    for (const args of [[1, 1, 1, 1], [2, 5, 3, 'x'], ['A', 'B', 'C', true], [5, '1:23', false, '2:00'], [0, 5, ''], [-1, -1], [0, 0], [1, -1]]) {
      try { const r = v(...args); if (typeof r !== 'string') errs.push(`ui.${k} non restituisce una stringa`); else if (/undefined|NaN/.test(r)) errs.push(`ui.${k}(${args}) → ${r}`); } catch (e) { errs.push(`ui.${k} lancia: ${e.message}`); }
    }
  }
  if (!pack.scenes || pack.scenes.length !== n) errs.push(`scenes: attesi ${n}, trovati ${pack.scenes && pack.scenes.length}`);
  else pack.scenes.forEach((s, i) => { if (!s.name || !s.fact || !s.items || s.items.length !== 3) errs.push(`scena ${i} incompleta`); });
  if (!pack.levels || pack.levels.length !== n) errs.push(`levels: attesi ${n}, trovati ${pack.levels && pack.levels.length}`);
  else pack.levels.forEach((l, i) => { if (!l.kids || !l.sci) errs.push(`livelli ${i} incompleti`); if (l.kids && l.kids.length > 140) errs.push(`kids ${i} troppo lungo (${l.kids.length})`); if (l.sci && l.sci.length > 340) errs.push(`sci ${i} troppo lungo (${l.sci.length})`); });
}
console.log(errs.length ? 'ERRORI:\n' + errs.join('\n') : `OK ${code}: ${keys.length} chiavi UI, ${n} mondi`);
process.exit(errs.length ? 1 : 0);
