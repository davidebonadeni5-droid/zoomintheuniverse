# 🌌 Zoom nell'Universo

Un sito con **zoom infinito** fatto di immagini SVG, per bambini e adulti.
Parti dall'Universo e zoomi sempre più dentro:

🌌 Universo → 🌀 Galassia → ☀️ Sistema solare → 🌍 Terra → 🏘️ Città → 🌻 Giardino → 🐞 Coccinella → 🟢 Cellula → 🧬 DNA → ⚛️ Atomo → 🔴 Nucleo → ✨ Quark → … e dentro il quark c'è **di nuovo l'Universo**. Lo zoom non finisce mai.

Ci sono anche dei **bivi** 🔀:
- dalla 🌍 Terra puoi tuffarti nel 🌊 **Oceano** → 🦠 **Plancton** → e arrivi alla 🟢 Cellula;
- dalla 🏘️ Città puoi zoomare su un bambino sdraiato nel parco: 🧒 **Corpo umano** → 🩸 **Sangue** → e arrivi al 🧬 DNA.

Zoomando indietro torni sempre sulla strada da cui sei arrivato. Il viaggio automatico ▶️ ai bivi sceglie una strada a caso.

## Cosa si può fare
- **Zoomare all'infinito**: rotellina del mouse, pizzico con due dita, pulsanti ➕/➖ o il viaggio automatico ▶️.
- **Trovare gli oggetti nascosti**: 3 in ogni mondo (48 in tutto), alcuni minuscoli. In basso ci sono le sagome: toccale per un indizio. I progressi restano salvati nel browser.
- **Imparare**: tocca il nome del mondo in alto per una curiosità ("Lo sapevi?").
- **Mondi vivi**: pianeti in orbita, galassie che ruotano, elettroni che girano, stelle che brillano, fiori che ondeggiano, auto che passano (tutto in SVG animato, nessun video).
- **Sfida a tempo** ⏱️: 5 oggetti a caso in 3 minuti, con record salvato. Ogni sfida è diversa.
- **Scala laterale**: mostra in quale mondo sei e a che punto dello zoom; toccando un'icona ci salti direttamente.
- **Suoni** 🔊 sintetizzati al volo (nessun file audio), con pulsante per spegnerli.
- **Italiano e inglese** 🇮🇹 🇬🇧: la lingua si sceglie da sola in base al browser e si cambia col pulsante in alto. Si può forzare con `?lang=it` o `?lang=en` nell'indirizzo.
- **Nascondere segreti** 🙈 (come i video su TikTok): scegli un'emoji e un messaggio, zooma dove vuoi e tocca per nasconderlo. Più zoomi, più sarà piccolo. Poi crea il link e mandalo agli amici: chi lo apre deve trovarlo!
  Il segreto è tutto dentro il link: nessun server, nessun account.

## Come avviarlo
È un sito statico, senza build. Apri `index.html` nel browser, oppure:

```bash
python3 -m http.server 8000
```

e vai su http://localhost:8000.

Per pubblicarlo gratis: GitHub → Settings → Pages → "Deploy from a branch" → `main` / root.

## Struttura
- `index.html` — pagina e interfaccia
- `style.css` — stile
- `js/scenes.js` — i 12 mondi in SVG (ognuno ha un "portale" verso il mondo successivo, 10× più piccolo)
- `js/i18n.js` — traduzioni italiano/inglese (interfaccia, nomi dei mondi, curiosità, oggetti)
- `js/app.js` — motore dello zoom infinito, oggetti nascosti, segreti condivisibili

Per aggiungere un mondo: aggiungi una scena **in fondo** a `js/scenes.js` (così i link dei segreti già condivisi restano validi) con `portals`, `svg` e `items`, aggiungi un portale verso di lei in un mondo esistente, poi la sua traduzione inglese in `SCENES_EN` dentro `js/i18n.js`.

---

## 🇬🇧 English

**Zoom into the Universe** is an endless-zoom website made of SVG drawings, for kids and grown-ups.
Universe → Galaxy → Solar System → Earth → City → Garden → Ladybug → Cell → DNA → Atom → Nucleus → Quark → … and inside the quark, the Universe again. With forks: from Earth dive into the Ocean → Plankton → Cell, or from the City zoom onto a kid in the park → Human body → Blood → DNA.

Find the 48 hidden objects, read a fun fact for every world, try the timed challenge, and hide your own secrets: pick an emoji and a message, zoom anywhere, tap to hide it, then send the link to a friend.

The language follows your browser; switch it with the button at the top, or add `?lang=en` / `?lang=it` to the address. Open `index.html` to run it — no build step.
