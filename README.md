# fabriceboyer.github.io

Page d'accueil présentant mes projets publics GitHub — en ligne sur
**<https://fabriceboyer.github.io>**.

Les projets sont séparés en deux familles :

- **Applications et sites** — les projets déployés sur GitHub Pages, utilisables
  d'un clic depuis le navigateur ;
- **Librairies, services et outils** — les briques plus abstraites : serveurs
  d'API, modules réutilisables, jeux de données, outils en ligne de commande.

Chaque projet a une description bilingue et une petite vignette SVG animée qui
lui est propre.

## Fonctionnalités

- Thème **clair / sombre / système**, appliqué avant le premier rendu (pas de flash).
- **Français / anglais**, détecté depuis le navigateur puis mémorisé.
- **Couleur d'accent** au choix parmi dix teintes : elle se propage à toute la
  page, vignettes animées comprises.
- Filtrage par langage, animations d'apparition au défilement, halo qui suit le
  curseur sur les cartes.
- `prefers-reduced-motion` neutralise toutes les animations.

## Stack

[React 18](https://react.dev/) · [TypeScript](https://www.typescriptlang.org/) ·
[Vite](https://vite.dev/) · [Framer Motion](https://www.framer.com/motion/) ·
[Zustand](https://github.com/pmndrs/zustand) ·
[react-i18next](https://react.i18next.com/) ·
[lucide-react](https://lucide.dev/)

## Développement

```bash
npm install
npm run dev        # serveur de développement
npm run lint       # ESLint
npm run typecheck  # tsc
npm run build      # build de production dans dist/
npm run preview    # sert le build
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

Le script ne touche jamais aux titres, catégories ni descriptions.

## Déploiement

[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) lint, typecheck et
build à chaque push, puis publie `dist/` sur GitHub Pages.

> La source de GitHub Pages doit être réglée sur **GitHub Actions**
> (`Settings` → `Pages` → `Build and deployment` → `Source: GitHub Actions`).
