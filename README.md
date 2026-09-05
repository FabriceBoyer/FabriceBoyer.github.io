# fabriceboyer.github.io

Page d'accueil présentant mes projets publics GitHub — en ligne sur
**<https://fabriceboyer.github.io>**.

Les projets sont séparés en deux familles :

- **Applications et sites** — les projets déployés sur GitHub Pages, utilisables
  d'un clic depuis le navigateur ;
- **Librairies, services et outils** — les briques sous-jacentes : serveurs
  d'API, modules réutilisables, jeux de données, outils en ligne de commande.

Chaque projet a une description bilingue et une vignette SVG animée qui lui est
propre.

## Fonctionnalités

- **Thème** clair / sombre / système : par défaut la préférence de l'OS
  (`prefers-color-scheme`), appliquée avant le premier rendu pour éviter tout
  flash, et suivie en direct si elle change.
- **Langue** française ou anglaise : par défaut celle du navigateur
  (`navigator.languages`), avec repli sur le français.
- **Couleur d'accent** au choix parmi dix teintes ; elle se propage à toute la
  page, vignettes animées comprises.
- Les trois réglages sont mémorisés dans `localStorage` dès que l'utilisateur en
  modifie un ; tant qu'il n'a rien choisi, la configuration système fait foi.
- Filtrage par langage, animations d'apparition discrètes au défilement.
- `prefers-reduced-motion` neutralise toutes les animations.

## Stack

[React 18](https://react.dev/) · [TypeScript](https://www.typescriptlang.org/) ·
[Vite](https://vite.dev/) · [Framer Motion](https://www.framer.com/motion/) ·
[Zustand](https://github.com/pmndrs/zustand) ·
[react-i18next](https://react.i18next.com/) ·
[lucide-react](https://lucide.dev/)

## Build local

Node 22 et npm sont requis.

```bash
npm install        # installe les dépendances
npm run dev        # serveur de développement sur http://localhost:5173
npm run lint       # ESLint
npm run typecheck  # tsc --noEmit
npm run build      # build de production dans dist/
npm run preview    # sert le contenu de dist/
```

`npm run build` produit un site entièrement statique dans `dist/` : il suffit de
servir ce dossier avec n'importe quel serveur de fichiers.

## Build Docker

Le [`Dockerfile`](Dockerfile) est multi-étapes : Node 22 compile le site, puis
nginx sert `dist/` (compression gzip, cache long sur `/assets/`, repli sur
`index.html`).

```bash
docker build -t fabriceboyer-github-io .
docker run --rm -p 8080:80 fabriceboyer-github-io
```

Le site est alors disponible sur <http://localhost:8080>.

Avec Compose :

```bash
docker compose up --build        # image de production sur http://localhost:8080
PORT=9000 docker compose up      # sur un autre port
docker compose --profile dev up dev   # serveur Vite avec rechargement à chaud, port 5173
```

## Contenu

La liste des projets vit dans [`src/data/projects.ts`](src/data/projects.ts) :
titre, catégorie, type, langage, sujets et description `fr`/`en`. Les vignettes
animées sont des composants SVG dans [`src/thumbs/`](src/thumbs/), associés au
`slug` du dépôt.

Pour rafraîchir les champs mécaniques (langage principal, étoiles, date de
dernière mise à jour) depuis l'API GitHub, et repérer les dépôts publics non
encore listés :

```bash
npm run sync -- --write
```

Le script ne touche jamais aux titres, catégories ni descriptions. Les dépôts
volontairement absents de la page sont listés dans la constante `IGNORED` de
[`scripts/sync-repos.mjs`](scripts/sync-repos.mjs).

## Intégration continue et déploiement

[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), à chaque push et
chaque pull request sur `master` :

1. **build** — `npm ci`, lint, typecheck, `npm run build`, puis publication de
   `dist/` comme artefact Pages ;
2. **docker** — construction de l'image avec cache Buildx, démarrage du
   conteneur et vérification qu'il répond bien en HTTP ;
3. **deploy** — sur `master` uniquement, publication sur GitHub Pages via
   `actions/deploy-pages`.

> La source de GitHub Pages doit être réglée sur **GitHub Actions**
> (`Settings` → `Pages` → `Build and deployment` → `Source: GitHub Actions`).
