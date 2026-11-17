/* Zoom nell'Universo — traduzioni (italiano / inglese).
 * Lingua scelta così: ?lang=it|en nell'indirizzo → scelta salvata → lingua del browser.
 * I testi delle scene (nomi, curiosità, oggetti) vengono riscritti dentro SCENES
 * quando cambia la lingua, così il resto del codice usa sempre sc.name / it.name. */
const I18N = (() => {
  'use strict';
  const LANGS = ['it', 'en'];   // le altre lingue si aggiungono con I18N.register (js/lang/xx.js)
  const META = { it: { name: 'Italiano', flag: '🇮🇹' }, en: { name: 'English', flag: '🇬🇧' } };
  const plural = (n, one, many) => (n === 1 ? one : many);

  const UI = {
    it: {
      title: "Zoom nell'Universo",
      description: "Uno zoom infinito dalle galassie ai quark… e poi di nuovo all'universo. Trova gli oggetti nascosti e nascondi i tuoi segreti per gli amici!",
      worldAria: "Mondo zoomabile all'infinito",
      placeAria: 'Dove sei: tocca per una curiosità',
      didYouKnow: '💡 Lo sapevi?',
      collectionAria: 'La tua collezione',
      hint: '💡 Indizio',
      cancelChallengeAria: 'Annulla sfida',
      worldsAria: 'Mondi',
      findHere: 'Trova qui:',
      zoomOutAria: 'Zoom indietro',
      autoAria: 'Viaggio automatico',
      stopAutoAria: 'Ferma il viaggio',
      zoomInAria: 'Zoom avanti',
      hideAria: 'Nascondi un segreto',
      hideBtn: 'Nascondi',
      challengeAria: 'Sfida a tempo',
      soundAria: 'Suoni on/off',
      langAria: 'Cambia lingua',
      langTitle: '🌐 Scegli la lingua',
      hideTitle: '🙈 Nascondi un segreto',
      close: 'Chiudi',
      step1: '<b>1.</b> Scegli cosa nascondere e scrivi un messaggio',
      msgPlaceholder: 'Messaggio segreto (es. Ti voglio bene!)',
      step2: '<b>2.</b> Zooma dove vuoi e <b>tocca</b> per nasconderlo. Più zoomi, più sarà piccolo e difficile da trovare!',
      step3: '<b>3.</b> Crea il link e mandalo agli amici',
      namePlaceholder: 'Il tuo nome (facoltativo)',
      undo: '↩️ Annulla',
      makeLink: '🔗 Crea link',
      shareAria: 'Link da condividere',
      copy: 'Copia',
      introTitle: "Zoom nell'Universo",
      introText: 'Un viaggio che non finisce mai: dalle galassie fino ai quark… e dentro il quark? Un altro universo! Trova gli <b>oggetti nascosti</b> in ogni mondo e <b>nascondi i tuoi segreti</b> per gli amici.',
      how1: '🖱️ Rotellina o 🤏 pizzica per zoomare',
      how2: '✋ Trascina per muoverti',
      how3: '👆 Tocca gli oggetti nascosti',
      how4: '⏱️ Prova la sfida a tempo!',
      startAuto: '🚀 Parti!',
      startFree: '🔍 Esploro da solo',

      lvKids: '🧒 Bambini', lvFun: '💡 Curiosità', lvSci: '🧮 Scienza',
      someone: 'Qualcuno',
      chFound: (it, left) => `⏱️ ${it}! Ne ${plural(left, 'manca', 'mancano')} ${left}`,
      alreadyFound: it => `${it}: già trovato!`,
      youFound: it => `🎉 Hai trovato: ${it}!`,
      worldDone: w => `⭐ Mondo «${w}» completato!`,
      allFound: `<div class="big">🏆</div><h2>Hai trovato tutto!</h2><p>Sei un vero esploratore dell'universo infinito. Ora prova a <b>nascondere</b> qualcosa per i tuoi amici! 🙈</p>`,
      where: (v, h) => [['in alto', '', 'in basso'][v + 1], ['a sinistra', '', 'a destra'][h + 1]].filter(Boolean).join(' ') || 'vicino al centro',
      hintItem: (it, where, w, tiny) => `Cerca ${it} ${where} nel mondo «${w}». ${tiny ? 'È minuscolo: zooma tanto! 🔍' : ''}`,
      hiddenIn: (e, w) => `${e} nascosto nel mondo «${w}»!`,
      foundSecretOf: who => `Hai trovato il segreto di ${who}!`,
      yourSecret: 'Il tuo segreto è qui 🤫',
      noMessage: '(nessun messaggio, solo una sorpresa!)',
      allSecrets: '🏆 Li hai trovati tutti!',
      chStart: (n, min) => `⏱️ Sfida! Trova ${n} oggetti in ${min} minuti. Tocca un'icona per un indizio.`,
      chCancelled: 'Sfida annullata.',
      chWon: (n, time, record, best) => `<div class="big">🏆</div><h2>Sfida completata!</h2><p>Hai trovato tutti e ${n} gli oggetti in <b>${time}</b>.${record ? ' 🥇 Nuovo record!' : ` Il tuo record è ${best}.`}</p>`,
      chLost: (n, tot, best) => `<div class="big">⏰</div><h2>Tempo scaduto!</h2><p>Hai trovato ${n} ${plural(n, 'oggetto', 'oggetti')} su ${tot}.${best ? ` Il tuo record è ${best}.` : ''} Riprova: ogni sfida ha oggetti diversi!</p>`,
      chAgain: '⏱️ Nuova sfida',
      goTo: w => `Vai a: ${w}`,
      level: d => `🔭 Livello ${d}`,
      loops: n => ` · 🔁 ${n} ${plural(n, 'giro', 'giri')} dell'universo!`,
      foundTag: it => `${it} (trovato)`,
      toFind: 'Oggetto da trovare: chiedi un indizio',
      hintTitle: 'Indizio',
      loopToast: "🤯 Dentro il quark c'era… un altro universo! Lo zoom non finisce mai.",
      banner: (who, k, f) => `🔍 ${who} ha nascosto ${k === 1 ? 'un segreto' : k + ' segreti'} nell'universo infinito! Trovati ${f}/${k}`,
      bannerAll: 'Li hai già trovati tutti! 🏆',
      secretHint: (w, size) => `Indizio: cerca nel mondo ${w}. ${size === 2 ? 'È piccolissimo, zooma tantissimo! 🔬' : size === 1 ? 'È piccolo: zooma bene! 🔍' : ''}`,
      soundOff: 'Suoni spenti', soundOn: 'Suoni accesi 🎵',
      collTitle: '⭐ La tua collezione',
      collCount: (f, t) => `${f} di ${t} oggetti trovati`,
      toFindShort: 'Da trovare',
      reset: 'Ricomincia da zero',
      resetDone: 'Collezione azzerata. Buona caccia! 🔍',
      hideOn: '🙈 Zooma dove vuoi e tocca per nascondere!',
      hiddenCount: (n, list) => `Hai nascosto ${n} ${plural(n, 'segreto', 'segreti')}: ${list}`,
      noneHidden: 'Nessun segreto nascosto ancora.',
      hideFirst: 'Prima nascondi almeno un segreto: tocca un punto del mondo! 👆',
      shareText: "Ho nascosto un segreto nell'universo infinito: riesci a trovarlo? 🔍",
      copied: '🔗 Link copiato! Mandalo ai tuoi amici.',
      copyBelow: 'Copia il link qui sotto 👇',
      huntTitle: '🔍 Caccia al segreto!',
      huntText: (who, k) => `${who} ha nascosto ${k === 1 ? 'un segreto' : k + ' segreti'} da qualche parte nell'universo infinito. Zooma, esplora e trovalo!`,
      freeToast: 'Usa la rotellina, pizzica con due dita o premi ➕ per zoomare!',
      langChanged: '🇮🇹 Ora in italiano!',
      branchGeneric: '🔀 Bivio! Qui ci sono più mondi nascosti: cerca i cerchi luminosi e zooma dentro.',
    },
    en: {
      title: 'Zoom into the Universe',
      description: 'An endless zoom from galaxies down to quarks… and back to the universe again. Find the hidden objects and hide your own secrets for your friends!',
      worldAria: 'Infinitely zoomable world',
      placeAria: 'Where you are: tap for a fun fact',
      didYouKnow: '💡 Did you know?',
      collectionAria: 'Your collection',
      hint: '💡 Hint',
      cancelChallengeAria: 'Cancel challenge',
      worldsAria: 'Worlds',
      findHere: 'Find here:',
      zoomOutAria: 'Zoom out',
      autoAria: 'Auto journey',
      stopAutoAria: 'Stop the journey',
      zoomInAria: 'Zoom in',
      hideAria: 'Hide a secret',
      hideBtn: 'Hide',
      challengeAria: 'Timed challenge',
      soundAria: 'Sound on/off',
      langAria: 'Change language',
      langTitle: '🌐 Choose your language',
      hideTitle: '🙈 Hide a secret',
      close: 'Close',
      step1: '<b>1.</b> Pick what to hide and write a message',
      msgPlaceholder: 'Secret message (e.g. I love you!)',
      step2: '<b>2.</b> Zoom wherever you like and <b>tap</b> to hide it. The deeper you zoom, the tinier and harder to find it will be!',
      step3: '<b>3.</b> Make the link and send it to your friends',
      namePlaceholder: 'Your name (optional)',
      undo: '↩️ Undo',
      makeLink: '🔗 Make link',
      shareAria: 'Link to share',
      copy: 'Copy',
      introTitle: 'Zoom into the Universe',
      introText: 'A journey that never ends: from galaxies all the way down to quarks… and inside a quark? Another universe! Find the <b>hidden objects</b> in every world and <b>hide your own secrets</b> for your friends.',
      how1: '🖱️ Scroll wheel or 🤏 pinch to zoom',
      how2: '✋ Drag to move around',
      how3: '👆 Tap the hidden objects',
      how4: '⏱️ Try the timed challenge!',
      startAuto: "🚀 Let's go!",
      startFree: "🔍 I'll explore",

      lvKids: '🧒 Kids', lvFun: '💡 Fun fact', lvSci: '🧮 Science',
      someone: 'Someone',
      chFound: (it, left) => `⏱️ ${it}! ${left} to go`,
      alreadyFound: it => `${it}: already found!`,
      youFound: it => `🎉 You found: ${it}!`,
      worldDone: w => `⭐ World “${w}” complete!`,
      allFound: `<div class="big">🏆</div><h2>You found everything!</h2><p>You're a true explorer of the infinite universe. Now try <b>hiding</b> something for your friends! 🙈</p>`,
      where: (v, h) => {
        const p = [['top', '', 'bottom'][v + 1], ['left', '', 'right'][h + 1]].filter(Boolean).join(' ');
        return p ? `in the ${p}` : 'near the middle';
      },
      hintItem: (it, where, w, tiny) => `Look for ${it} ${where} of the “${w}” world. ${tiny ? "It's tiny: zoom in a lot! 🔍" : ''}`,
      hiddenIn: (e, w) => `${e} hidden in the “${w}” world!`,
      foundSecretOf: who => `You found ${who}'s secret!`,
      yourSecret: 'Your secret is here 🤫',
      noMessage: '(no message, just a surprise!)',
      allSecrets: '🏆 You found them all!',
      chStart: (n, min) => `⏱️ Challenge! Find ${n} objects in ${min} minutes. Tap an icon for a hint.`,
      chCancelled: 'Challenge cancelled.',
      chWon: (n, time, record, best) => `<div class="big">🏆</div><h2>Challenge complete!</h2><p>You found all ${n} objects in <b>${time}</b>.${record ? ' 🥇 New record!' : ` Your record is ${best}.`}</p>`,
      chLost: (n, tot, best) => `<div class="big">⏰</div><h2>Time's up!</h2><p>You found ${n} of ${tot} objects.${best ? ` Your record is ${best}.` : ''} Try again: every challenge has different objects!</p>`,
      chAgain: '⏱️ New challenge',
      goTo: w => `Go to: ${w}`,
      level: d => `🔭 Level ${d}`,
      loops: n => ` · 🔁 ${n} ${plural(n, 'trip', 'trips')} around the universe!`,
      foundTag: it => `${it} (found)`,
      toFind: 'Object to find: ask for a hint',
      hintTitle: 'Hint',
      loopToast: '🤯 Inside the quark there was… another universe! The zoom never ends.',
      banner: (who, k, f) => `🔍 ${who} hid ${k === 1 ? 'a secret' : k + ' secrets'} in the infinite universe! Found ${f}/${k}`,
      bannerAll: 'You already found them all! 🏆',
      secretHint: (w, size) => `Hint: look in the ${w} world. ${size === 2 ? "It's super tiny, zoom in loads! 🔬" : size === 1 ? "It's small: zoom in well! 🔍" : ''}`,
      soundOff: 'Sound off', soundOn: 'Sound on 🎵',
      collTitle: '⭐ Your collection',
      collCount: (f, t) => `${f} of ${t} objects found`,
      toFindShort: 'Still to find',
      reset: 'Start over',
      resetDone: 'Collection cleared. Happy hunting! 🔍',
      hideOn: '🙈 Zoom wherever you like and tap to hide!',
      hiddenCount: (n, list) => `You hid ${n} ${plural(n, 'secret', 'secrets')}: ${list}`,
      noneHidden: 'No secrets hidden yet.',
      hideFirst: 'Hide at least one secret first: tap a spot in the world! 👆',
      shareText: 'I hid a secret in the infinite universe: can you find it? 🔍',
      copied: '🔗 Link copied! Send it to your friends.',
      copyBelow: 'Copy the link below 👇',
      huntTitle: '🔍 Secret hunt!',
      huntText: (who, k) => `${who} hid ${k === 1 ? 'a secret' : k + ' secrets'} somewhere in the infinite universe. Zoom, explore and find it!`,
      freeToast: 'Use the scroll wheel, pinch with two fingers or press ➕ to zoom!',
      langChanged: '🇬🇧 Now in English!',
      branchGeneric: '🔀 A fork! More worlds are hidden here: look for the glowing circles and zoom in.',
    },
  };

  // Testi delle scene in inglese (stesso ordine di SCENES e dei loro oggetti)
  const SCENES_EN = [
    { name: 'Universe', fact: 'The observable universe holds about 2 trillion galaxies. Each one has billions of stars!',
      items: ['Flying saucer', 'Space whale', 'Lost astronaut'] },
    { name: 'Galaxy', fact: 'The Milky Way has between 100 and 400 billion stars. Light takes 100,000 years to cross it!',
      items: ['Rocket', 'Comet', 'Alien octopus'] },
    { name: 'Solar System', fact: 'The Sun holds 99.8% of all the mass in the Solar System. A million Earths would fit inside it!',
      items: ['Satellite', 'Alien among the asteroids', 'Space pizza'] },
    { name: 'Earth', fact: 'At the equator, Earth spins at about 1,670 km/h… and we don\'t even notice!',
      items: ['Whale in the ocean', 'Penguin at the South Pole', 'Tropical island'] },
    { name: 'City', fact: 'More than half of the people in the world live in a city. By 2050 it will be almost 7 in 10!',
      items: ['Cat on the roof', 'Fire truck', 'Runaway balloon'] },
    { name: 'Garden', fact: 'A single teaspoon of soil holds more microbes than there are people on Earth!',
      items: ['Snail', 'Frog on a lily pad', 'Mushroom'] },
    { name: 'Ladybug', fact: 'A ladybug can eat up to 5,000 aphids in its life. It\'s a gardener\'s best friend!',
      items: ['Ant', 'Caterpillar', 'Tiny diamond'] },
    { name: 'Cell', fact: 'Your body is made of about 37 trillion cells. Leaves use chloroplasts (the green ones!) to eat sunlight.',
      items: ['Sneaky virus', 'Secret key', 'Puzzle piece'] },
    { name: 'DNA', fact: 'If you unrolled the DNA from just one cell, it would be about 2 meters long! It\'s the "instruction book" of every living thing.',
      items: ['Ball of yarn (not DNA!)', 'Snake', 'Musical note'] },
    { name: 'Atom', fact: 'An atom is almost entirely empty: if the nucleus were an ant, the atom would be as big as a stadium!',
      items: ['Lightning bolt', "Schrödinger's box", "Schrödinger's cat (alive!)"] },
    { name: 'Nucleus', fact: 'Protons (red) and neutrons (blue) are glued together by the most powerful force there is: the strong nuclear force.',
      items: ['Doughnut', 'Target', 'Cherries'] },
    { name: 'Quark', fact: 'Nobody has ever seen a quark on its own: they always come in groups of three, held together by gluons. And inside? Maybe… another universe! 🤯',
      items: ['Dice ("God does not play dice!")', 'Quantum unicorn', 'Whirlpool'] },
    { name: 'Ocean', fact: 'The ocean covers 71% of the Earth, and more than 80% of the sea floor has never been explored by anyone!',
      items: ['Crab', 'Lost anchor', 'Mermaid'] },
    { name: 'Plankton', fact: 'Plankton is tiny, but it makes about half of the oxygen we breathe! Diatoms live inside shells made of glass.',
      items: ['Krill', 'Microscope', 'Fish egg'] },
    { name: 'Human body', fact: 'Your heart beats about 100,000 times a day and pushes blood through 100,000 km of blood vessels: two and a half times around the Earth!',
      items: ['Butterfly on the hand', 'Dropped ice cream', 'Ant on the knee'] },
    { name: 'Blood', fact: 'A single drop of blood holds about 5 million red blood cells! White blood cells are the soldiers that protect you from germs.',
      items: ['Tiny ambulance', 'Antibody shield', 'Lost sock (but how?!)'] },
    { name: 'Moon', fact: "There is no wind on the Moon: the astronauts' footprints will stay there for millions of years!", items: ['Flag', 'Footprint', 'Moon cheese'] },
    { name: 'Mars', fact: 'Mars has the tallest volcano in the Solar System: Olympus Mons, almost three times as high as Everest!', items: ['Rover', 'Martian potato', 'Parked UFO'] },
    { name: 'Black hole', fact: 'At the centre of our galaxy sits a black hole as heavy as 4 million Suns. Not even light can escape!', items: ['Sucked-in sock', 'Slowed-down clock', 'Spaghetti (spaghettification!)'] },
    { name: 'Volcano', fact: 'Lava can be hotter than 1,200 °C: it is molten rock rising from tens of kilometres beneath our feet!', items: ['Curious dinosaur', 'Melted thermometer', 'Egg frying on a rock'] },
    { name: 'Beehive', fact: 'To make a single teaspoon of honey, a bee has to visit about 5,000 flowers. The cells are perfect hexagons!', items: ["Queen bee's crown", 'Jar of honey', 'Greedy teddy bear'] },
    { name: 'Snowflake', fact: 'Every snowflake has six arms, yet no two are alike. They are ice crystals grown around a speck of dust!', items: ['Snowman', 'Lost glove', 'Polar bear'] },
    { name: 'Eye', fact: 'Your eye can tell apart about 10 million colours, and your iris is as unique as a fingerprint!', items: ['Glasses', 'Teardrop', 'Little mirror'] },
    { name: 'Ant nest', fact: 'Ants can lift up to 50 times their own weight. A nest can hold millions of them, all daughters of the same queen!', items: ["Queen's crown", 'Stolen candy', 'Bit of leaf'] },
  ];

  // Originali italiani, presi dalle scene stesse
  const SCENES_IT = SCENES.map(sc => ({ name: sc.name, fact: sc.fact, items: sc.items.map(it => it.name) }));
  const SCENE_TEXT = { it: SCENES_IT, en: SCENES_EN };

  function detect() {
    const q = new URLSearchParams(location.search).get('lang');
    if (LANGS.includes(q)) return q;
    try { const s = JSON.parse(localStorage.getItem('ziu-lang')); if (LANGS.includes(s)) return s; } catch { /* niente */ }
    const nav = (navigator.languages && navigator.languages[0]) || navigator.language || 'it';
    const code = nav.toLowerCase().slice(0, 2);
    return LANGS.includes(code) ? code : 'en';
  }

  let lang = 'it';

  function t(key, ...args) {
    const v = UI[lang][key] ?? UI.en[key] ?? UI.it[key];
    return typeof v === 'function' ? v(...args) : v;
  }

  function applyScenes() {
    SCENES_EN.forEach((en, i) => { const tx = (SCENE_TEXT[lang] || [])[i] || en;
      const sc = SCENES[i];
      sc.name = tx.name; sc.fact = tx.fact;
      sc.items.forEach((it, j) => { it.name = tx.items[j]; });
    });
  }

  // Testi fissi dell'HTML: data-i18n (testo), data-i18n-html (con <b>), data-i18n-ph (placeholder), data-i18n-aria (aria-label)
  function applyDom() {
    document.documentElement.lang = lang;
    document.title = t('title');
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.content = t('description');
    document.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = t(el.dataset.i18n); });
    document.querySelectorAll('[data-i18n-html]').forEach(el => { el.innerHTML = t(el.dataset.i18nHtml); });
    document.querySelectorAll('[data-i18n-ph]').forEach(el => { el.placeholder = t(el.dataset.i18nPh); });
    document.querySelectorAll('[data-i18n-aria]').forEach(el => { el.setAttribute('aria-label', t(el.dataset.i18nAria)); });
  }

  function setLang(l) {
    if (!LANGS.includes(l)) return;
    lang = l;
    try { localStorage.setItem('ziu-lang', JSON.stringify(l)); } catch { /* niente */ }
    // aggiorna ?lang= nell'indirizzo senza ricaricare, conservando l'eventuale #segreto
    try {
      const u = new URL(location.href); u.searchParams.set('lang', l);
      history.replaceState(null, '', u.pathname + u.search + u.hash);
    } catch { /* file:// o browser vecchio */ }
    applyScenes(); applyDom();
  }

  // Aggiunge una lingua: { name, flag, ui: {…stesse chiavi di UI.en…}, scenes: [{name, fact, items}], levels: [{kids, sci}] }
  function register(code, pack) {
    if (!LANGS.includes(code)) LANGS.push(code);
    META[code] = { name: pack.name, flag: pack.flag };
    UI[code] = pack.ui || {};
    SCENE_TEXT[code] = pack.scenes || SCENES_EN;
    if (typeof LEVEL_TEXT !== 'undefined' && pack.levels) pack.levels.forEach((lv, i) => {
      if (LEVEL_TEXT[i] && lv) { LEVEL_TEXT[i].kids[code] = lv.kids; LEVEL_TEXT[i].sci[code] = lv.sci; }
    });
  }
  // da chiamare dopo aver caricato tutte le lingue
  function init() { lang = detect(); applyScenes(); }
  return { t, setLang, applyDom, register, init, get lang() { return lang; }, LANGS, META };
})();
