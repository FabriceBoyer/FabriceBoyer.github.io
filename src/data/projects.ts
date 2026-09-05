export type Category = 'apps' | 'libs'

export type Kind = 'webapp' | 'game' | 'explorer' | 'server' | 'library' | 'dataset' | 'tool'

export interface Project {
  /** Nom du dépôt GitHub. Sert aussi de clé de vignette animée. */
  slug: string
  title: string
  category: Category
  kind: Kind
  /** URL de démonstration (GitHub Pages) le cas échéant. */
  demo?: string
  lang: string
  stars: number
  updated: string
  topics: string[]
  desc: { fr: string; en: string }
}

export const GITHUB_USER = 'FabriceBoyer'

export const langColors: Record<string, string> = {
  TypeScript: '#3178c6',
  Go: '#00add8',
  Python: '#3572a5',
  Dockerfile: '#384d54',
  CSS: '#563d7c',
  JSON: '#8a8a8a',
}

export const projects: Project[] = [
  // ------------------------------------------------------------- applications
  {
    slug: 'gcc_explorer',
    title: 'GCC Explorer',
    category: 'apps',
    kind: 'explorer',
    demo: 'https://fabriceboyer.github.io/gcc_explorer/',
    lang: 'TypeScript',
    stars: 0,
    updated: '2026-09-05',
    topics: ['gcc', 'compiler', 'hardening', 'offline'],
    desc: {
      fr: "Près de 3 000 options de compilation et d'édition de liens de GCC 8 à GCC 15, avec leur entrée de manuel, leurs valeurs par défaut, le contenu exact des drapeaux parapluie (-Wall, -O2, -fanalyzer…) et un export en un clic vers neuf systèmes de build. Aucun backend : le catalogue est mis en cache dans IndexedDB et fonctionne hors ligne.",
      en: 'Nearly 3,000 GCC compile and link options from GCC 8 to GCC 15, with their full manual entry, default values, the exact membership of umbrella flags (-Wall, -O2, -fanalyzer…) and one-click export to nine build systems. No backend: the catalogue is cached in IndexedDB and works offline.',
    },
  },
  {
    slug: 'metamath_explorer',
    title: 'Metamath Explorer',
    category: 'apps',
    kind: 'explorer',
    demo: 'https://fabriceboyer.github.io/metamath_explorer/',
    lang: 'TypeScript',
    stars: 0,
    updated: '2026-08-25',
    topics: ['metamath', 'logic', 'web-worker', 'graph'],
    desc: {
      fr: "Un explorateur visuel de set.mm, la plus grande bibliothèque de mathématiques vérifiées par ordinateur (~120 000 énoncés). Téléchargement, analyse et vérification des preuves entièrement dans le navigateur, dans un Web Worker : navigation « livre », graphe de dépendances interactif et guide pas-à-pas d'une vraie preuve.",
      en: 'A visual explorer for set.mm, the largest computer-verified mathematics library (~120,000 statements). Downloading, parsing and proof checking happen entirely in the browser inside a Web Worker: book-style browsing, an interactive dependency graph and a step-by-step walkthrough of a real proof.',
    },
  },
  {
    slug: 'camping_simulator',
    title: 'Camping Manager',
    category: 'apps',
    kind: 'game',
    demo: 'https://fabriceboyer.github.io/camping_simulator/',
    lang: 'TypeScript',
    stars: 0,
    updated: '2026-08-05',
    topics: ['isometric', 'canvas', 'tycoon', 'mobile'],
    desc: {
      fr: "Jeu de gestion de camping en 2D isométrique, inspiré de Camp Manager Simulator et des Tycoon classiques. Rendu en canvas 2D, 100 % frontend, interface tactile optimisée mobile (pincer-zoomer, glisser) et disponible en français comme en anglais.",
      en: 'An isometric 2D camping management game inspired by Camp Manager Simulator and the classic Tycoon titles. Rendered on a 2D canvas, fully frontend, with a touch-friendly mobile interface (pinch-zoom, drag) in both French and English.',
    },
  },
  {
    slug: 'calendar_generator',
    title: 'Calendrier Fitness',
    category: 'apps',
    kind: 'webapp',
    demo: 'https://fabriceboyer.github.io/calendar_generator/',
    lang: 'TypeScript',
    stars: 0,
    updated: '2026-08-12',
    topics: ['print', 'fitness', 'pdf', 'garmin'],
    desc: {
      fr: "Générateur de calendrier à imprimer pour suivre ses activités sportives et son poids : un mois par page en paysage, une colonne par jour, activités et champs personnalisables, courbe de poids, export PDF et Word, import Garmin Connect et page de statistiques.",
      en: 'A printable calendar generator for tracking workouts and weight: one landscape page per month, one column per day, customisable activities and fields, a weight curve, PDF and Word export, Garmin Connect import and a statistics page.',
    },
  },
  {
    slug: 'acronyms-server',
    title: 'Acronyms Server',
    category: 'apps',
    kind: 'webapp',
    demo: 'https://fabriceboyer.github.io/acronyms-server/',
    lang: 'TypeScript',
    stars: 1,
    updated: '2026-03-15',
    topics: ['nasa', 'search', 'vite'],
    desc: {
      fr: "Moteur de recherche d'acronymes construit sur le jeu de données NASA-Acronyms. Application statique servie par GitHub Pages : l'index est embarqué, la recherche est instantanée et fonctionne sans aucun appel réseau.",
      en: 'An acronym search engine built on the NASA-Acronyms dataset. A static app served from GitHub Pages: the index is bundled in, so lookups are instant and need no network calls at all.',
    },
  },
  {
    slug: 'words-server',
    title: 'Words Server',
    category: 'apps',
    kind: 'webapp',
    demo: 'https://fabriceboyer.github.io/words-server/',
    lang: 'TypeScript',
    stars: 0,
    updated: '2025-04-01',
    topics: ['lemmas', 'lexicon', 'vite'],
    desc: {
      fr: "Explorateur de lexiques anglais assemblé à partir des listes de lemmatisation de michmech et du dictionnaire english-words de dwyl. Interface légère servie en statique, pratique pour vérifier une forme fléchie ou l'existence d'un mot.",
      en: 'An English lexicon explorer assembled from michmech’s lemmatization lists and dwyl’s english-words dictionary. A lightweight static interface, handy for checking an inflected form or whether a word exists.',
    },
  },

  // ---------------------------------------------- librairies, services, outils
  {
    slug: 'audio_quality_reducer',
    title: 'Audio Quality Reducer',
    category: 'libs',
    kind: 'tool',
    lang: 'TypeScript',
    stars: 0,
    updated: '2026-08-12',
    topics: ['ffmpeg', 'mp3', 'youtube', 'embedded'],
    desc: {
      fr: "Transforme n'importe quelle vidéo YouTube en MP3 minuscule et ultra-compressé, taillé pour les jouets sonores qui n'ont que quelques mégaoctets de flash. Découpe par timestamps, mono 11 kHz, filtre passe-haut, normalisation, et historique local des rendus.",
      en: 'Turns any YouTube video into a tiny, ultra-compressed MP3 sized for sound toys with only a few megabytes of flash. Timestamp cropping, 11 kHz mono, highpass filtering, loudness normalisation, and a local history of every render.',
    },
  },
  {
    slug: 'translinguistic_voice_number_generator',
    title: 'Voice Number Generator',
    category: 'libs',
    kind: 'tool',
    lang: 'Python',
    stars: 0,
    updated: '2026-08-12',
    topics: ['tts', 'piper', 'offline', 'multilingual'],
    desc: {
      fr: "Génère les chiffres 0 à 9 prononcés dans plusieurs langues, en synthèse vocale 100 % hors ligne (Piper TTS), puis dégrade volontairement le rendu via ffmpeg jusqu'à 1 à 2,5 Ko par mot — pour tenir dans la mémoire d'une peluche sonore.",
      en: 'Generates the digits 0 to 9 spoken in several languages with fully offline neural TTS (Piper), then deliberately degrades them through ffmpeg down to 1–2.5 KB per word — small enough to fit in a sound plush’s memory.',
    },
  },
  {
    slug: 'wikipedia_sqlite',
    title: 'Wikipedia SQLite',
    category: 'libs',
    kind: 'server',
    lang: 'Go',
    stars: 1,
    updated: '2026-07-13',
    topics: ['sqlite', 'fts5', 'api-rest', 'dumps'],
    desc: {
      fr: "Analyseur de dumps Wikipedia et serveur d'API REST adossé à SQLite. Indexation par lots à faible empreinte mémoire, recherche plein texte via FTS5 et interface web de démonstration avec navigation historique.",
      en: 'A Wikipedia dump parser and REST API server backed by SQLite. Low-memory batch indexing, full-text search through FTS5, and a built-in demo web interface with browser history support.',
    },
  },
  {
    slug: 'wikipedia_server',
    title: 'Wikipedia Server',
    category: 'libs',
    kind: 'server',
    lang: 'Go',
    stars: 2,
    updated: '2026-03-15',
    topics: ['api', 'dumps', 'docker'],
    desc: {
      fr: "Serveur d'API minimal exposant les pages Wikipedia à partir de dumps locaux, librement inspiré de wikigopher. Déploiement conteneurisé, configuration par fichier .env, aucune dépendance à un service externe.",
      en: 'A minimal API server exposing Wikipedia pages from local dumps, loosely based on wikigopher. Containerised deployment, .env-file configuration, and no dependency on any external service.',
    },
  },
  {
    slug: 'crossref_server',
    title: 'Crossref Server',
    category: 'libs',
    kind: 'server',
    lang: 'Go',
    stars: 1,
    updated: '2026-01-02',
    topics: ['crossref', 'metadata', 'docker'],
    desc: {
      fr: "Serveur d'API minimal pour les métadonnées Crossref servies depuis des dumps locaux : DOI, titres et références bibliographiques interrogeables sans quota ni latence réseau.",
      en: 'A minimal API server for Crossref metadata served from local dumps: DOIs, titles and bibliographic references queryable with no quota and no network latency.',
    },
  },
  {
    slug: 'arxiv_server',
    title: 'arXiv Server',
    category: 'libs',
    kind: 'server',
    lang: 'Go',
    stars: 1,
    updated: '2025-06-18',
    topics: ['arxiv', 'metadata', 'docker'],
    desc: {
      fr: "Serveur d'API minimal pour les métadonnées arXiv à partir de dumps locaux. Même philosophie que ses voisins : un binaire Go, un conteneur, des données à soi et des réponses immédiates.",
      en: 'A minimal API server for arXiv metadata built from local dumps. Same philosophy as its siblings: one Go binary, one container, your own data and immediate responses.',
    },
  },
  {
    slug: 'common_go_utils',
    title: 'Common Go Utils',
    category: 'libs',
    kind: 'library',
    lang: 'Go',
    stars: 1,
    updated: '2024-07-03',
    topics: ['go-module', 'http', 'config'],
    desc: {
      fr: "Le socle partagé des serveurs Go de cette collection : configuration, journalisation, aides HTTP et petits utilitaires factorisés en un seul module importable via go get.",
      en: 'The shared foundation behind the Go servers in this collection: configuration, logging, HTTP helpers and small utilities factored into a single module you can pull in with go get.',
    },
  },
  {
    slug: 'word_lists',
    title: 'Word Lists',
    category: 'libs',
    kind: 'dataset',
    lang: 'Python',
    stars: 1,
    updated: '2024-01-11',
    topics: ['json', 'ngsl', 'corpus'],
    desc: {
      fr: "Listes de mots exploitables par une machine, reformatées en JSON — à commencer par la New General Service List 1.2. Chaîne reproductible src → csv → json, versionnée avec la date de capture des données.",
      en: 'Machine-readable word lists reformatted as JSON, starting with the New General Service List 1.2. A reproducible src → csv → json pipeline, versioned with the date the data was captured.',
    },
  },
]

export const byCategory = (c: Category) => projects.filter((p) => p.category === c)
