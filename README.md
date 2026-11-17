# 🌌 Zoom nell'Universo

Un sito con **zoom infinito** fatto di immagini SVG, per bambini e adulti.
Parti dall'Universo e zoomi sempre più dentro:

🌌 Universo → 🌀 Galassia → ☀️ Sistema solare → 🌍 Terra → 🏘️ Città → 🌻 Giardino → 🐞 Coccinella → 🟢 Cellula → 🧬 DNA → ⚛️ Atomo → 🔴 Nucleo → ✨ Quark → … e dentro il quark c'è **di nuovo l'Universo**. Lo zoom non finisce mai.

## Cosa si può fare
- **Zoomare all'infinito**: rotellina del mouse, pizzico con due dita, pulsanti ➕/➖ o il viaggio automatico ▶️.
- **Trovare gli oggetti nascosti**: 3 in ogni mondo (36 in tutto), alcuni minuscoli. In basso ci sono le sagome: toccale per un indizio. I progressi restano salvati nel browser.
- **Imparare**: tocca il nome del mondo in alto per una curiosità ("Lo sapevi?").
- **Mondi vivi**: pianeti in orbita, galassie che ruotano, elettroni che girano, stelle che brillano, fiori che ondeggiano, auto che passano (tutto in SVG animato, nessun video).
- **Sfida a tempo** ⏱️: 5 oggetti a caso in 3 minuti, con record salvato. Ogni sfida è diversa.
- **Scala laterale**: mostra in quale mondo sei e a che punto dello zoom; toccando un'icona ci salti direttamente.
- **Suoni** 🔊 sintetizzati al volo (nessun file audio), con pulsante per spegnerli.
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
- `js/app.js` — motore dello zoom infinito, oggetti nascosti, segreti condivisibili

Per aggiungere un mondo: aggiungi una scena in `js/scenes.js` con `portal`, `svg` e `items`.
