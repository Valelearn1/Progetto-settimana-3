/*
REGOLE
- Le risposte vanno scritte in JavaScript sotto questi commenti.
- Pattern fondamentale: stato -> render() -> eventi.
  Tutto cio' che vedi a schermo dipende dallo stato.
  Gli eventi modificano lo stato e poi chiamano render().
- Apri index.html nel browser. Apri la console (DevTools) per gli errori.
- Cerca su MDN solo i concetti dichiarati come "cerca tu":
  localStorage, Blob/URL.createObjectURL, FileReader.
  Tutto il resto e' stato visto in settimana.
- Niente AI per generare codice. Niente template scaricati.
*/

/* STATO
   In cima al file definisci poche variabili globali:
   - un array di oggetti come dato principale (es. libri, ricette, film, ...)
   - una variabile per il filtro corrente
   - una variabile per l'ordinamento corrente
   - una variabile per la stringa di ricerca corrente
*/

/* SCRIVI QUI LA TUA RISPOSTA */
let movies = [
  {
    id: 1,
    titolo: "Friends",
    piattaforma: "Netflix",
    anno: "1994",
    visto: true,
  },
  {
    id: 2,
    titolo: "Cattivissimo me 2",
    piattaforma: "Disney",
    anno: "2013",
    visto: false,
  },
  {
    id: 3,
    titolo: "Lol",
    piattaforma: "Amazon",
    anno: "2023",
    visto: false,
  },
  {
    id: 4,
    titolo: "Cobra Kai",
    piattaforma: "Netflix",
    anno: "2018",
    visto: true,
  },
  {
    id: 5,
    titolo: "Titanic",
    piattaforma: "Netflix",
    anno: "1997",
    visto: true,
  },
];

let cerca = "";

/* RENDER()
   Una sola funzione che ridipinge la lista. A ogni chiamata:
   1) parte dall'array completo,
   2) filtra,
   3) ordina,
   4) svuota il container DOM,
   5) ricrea gli elementi DOM per gli oggetti risultanti.
   Aggiorna anche conteggi e statistiche.
   Salva lo stato in localStorage in fondo a render() (cerca tu come funziona). // ignorare
*/

/* SCRIVI QUI LA TUA RISPOSTA */
const selectWatched = document.querySelector("#selectWatched");
const selectOrder = document.querySelector("#selectOrder");
const inputSearch = document.querySelector("#inputSearch");

const render = () => {
  const cards = document.getElementById("cards");
  cards.innerHTML = ""; // svuota il DOM
  const valoreFiltro = selectWatched.value; // valore attuale del filtro (quando viene chiamata la funzione render)
  const ordineFiltro = selectOrder.value;
  const searchFiltro = inputSearch.value;
  movies
    .filter((movie) => {
      if (valoreFiltro === "daVedere") {
        return movie.visto === false;
      } else if (valoreFiltro === " ") {
        return true; // voglio che mostri tutti i film
      } else {
        return movie.visto === true;
      }
    })
    .filter((movie) => {
      if (searchFiltro === "") {
        return true;
      } else {
        return movie.titolo.toLowerCase().includes(searchFiltro.toLowerCase());
      }
    })
    .sort((movieA, movieB) => {
      if (ordineFiltro === "crescente") {
        return movieA.anno - movieB.anno;
      } else if (ordineFiltro === " ") {
        return 0;
      } else {
        return movieB.anno - movieA.anno;
      }
    })
    .forEach((movie) => {
      // per ogni film, crea un div e aggiungi titolo e anno, e poi aggiungi il div a cards (padre)
      const div = document.createElement("div");
      div.innerText = movie.titolo + movie.anno;
      cards.appendChild(div);
    });
};

render();

/* FORM CON VALIDAZIONE
   addEventListener("submit") sul form.
   event.preventDefault().
   Leggi i valori con .value.trim().
   Se uno dei campi obbligatori e' vuoto, mostra errore e return.
   Altrimenti push allo stato, form.reset(), render().
   Id univoco con Date.now().
*/

/* SCRIVI QUI LA TUA RISPOSTA */
const aggiungiBottone = document.querySelector("#aggiungiBottone");
const aggiungiFilm = document.querySelector("#aggiungiFilm");
const newMovieTitle = document.querySelector("#newMovieTitle");
const newMovieYear = document.querySelector("#newMovieYear");
const newMoviePlatform = document.querySelector("#newMoviePlatform");
const formMovie = document.querySelector("#formMovie");

formMovie.addEventListener("submit", (event) => {
  event.preventDefault();
  if (aggiungiFilm.value.trim() === "") {
    alert("Campo vuoto");
    return;
  }
  if (newMovieTitle.value.trim() === "") {
    alert("Campo vuoto");
    return;
  }
  if (newMovieYear.value.trim() === "") {
    alert("Campo vuoto");
    return;
  }
  if (newMoviePlatform.value.trim() === "") {
    alert("Campo vuoto");
    return;
  }
  movies.push({
    id: Date.now(),
    titolo: newMovieTitle.value.trim(),
    piattaforma: newMoviePlatform.value.trim(),
    anno: newMovieYear.value.trim(),
    visto: aggiungiFilm.value.trim() === "watched",
  });
  formMovie.reset();
  render();
});

/* INTERAZIONI BASE — eliminare, modificare, contare
   - Elimina: filter per id, render(). Event delegation sul container.
   - Modifica in-place: button "Modifica". Al click il testo diventa <input>,
     si conferma con Invio o blur.
   - Conteggi dinamici dentro render().
*/

/* SCRIVI QUI LA TUA RISPOSTA */

/* RICERCA, FILTRO, ORDINAMENTO
   - Ricerca live: <input> con event "input". Salva in stato e render().
   - Filtro: <select> con event "change". Salva in stato e render().
   - Ordinamento: due button (o select). Salva in stato e render().
   I tre si compongono dentro render() in fila.
*/

selectWatched.addEventListener("change", (event) => {
  render();
});

selectOrder.addEventListener("change", (event) => {
  render();
});

inputSearch.addEventListener("input", (event) => {
  render();
});

/* SCRIVI QUI LA TUA RISPOSTA */

/* NOTIFICHE TEMPORANEE
   Funzione notifica(testo) che imposta il testo del <div id="notifica">,
   lo mostra (display: block), poi dopo 3000ms (setTimeout) lo nasconde.
*/

/* SCRIVI QUI LA TUA RISPOSTA */

/* TEMA CHIARO/SCURO
   Un button che chiama document.body.classList.toggle("dark").
   In CSS scrivi le regole opposte (es. body.dark { background: #111; ... }).
*/

/* SCRIVI QUI LA TUA RISPOSTA */

const darkModeButton = document.querySelector("#darkModeButton");

darkModeButton.addEventListener("click", (event) => {
  const temaScuro = document.body.classList.toggle("scuro");
  if (temaScuro) {
    darkModeButton.textContent = "Tema chiaro";
  } else {
    darkModeButton.textContent = "Tema scuro";
  }
});

/* PERSISTENZA — localStorage (cerca tu su MDN)
   - In fondo a render(), salva lo stato:
       localStorage.setItem("dati", JSON.stringify(stato));
   - All'avvio, prima della prima render(), carica:
       const salvato = localStorage.getItem("dati");
       if (salvato) stato = JSON.parse(salvato);
*/

/* SCRIVI QUI LA TUA RISPOSTA */

/* RIORDINO ↑ ↓
   Due button su ogni elemento. Click su ↑ scambia con il precedente nell'array,
   ↓ con il successivo. Event delegation. Poi render().
*/

/* SCRIVI QUI LA TUA RISPOSTA */

/* SCRIVI QUI LA TUA RISPOSTA */

/* STATISTICHE GRAFICHE
   Almeno due indicatori: contatori grandi e/o barre orizzontali
   (<div> con width: X% in base al dato). Aggiorna dentro render().
*/

/* SCRIVI QUI LA TUA RISPOSTA */

/* MULTI-VISTA — lista / card / tabella
   Una variabile globale "vista" che render() legge per decidere quale HTML
   produrre. Tre button cambiano "vista" e chiamano render().
*/

/* SCRIVI QUI LA TUA RISPOSTA */

/* CATEGORIE
   Aggiungi un campo categoria nello schema. Nel form un <select> per sceglierla.
   In render(), raggruppa con reduce in { categoria: [elementi] } e disegna un
   header per categoria con sotto la lista di quella categoria.
*/

/* SCRIVI QUI LA TUA RISPOSTA */
