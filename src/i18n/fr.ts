export const fr = {
  nav: { apps: 'Applications', libs: 'Librairies', github: 'GitHub' },
  a11y: {
    skip: 'Aller au contenu',
    theme: 'Thème',
    lang: 'Langue',
    accent: "Couleur d'accent",
    light: 'Clair',
    dark: 'Sombre',
    system: 'Système',
  },
  hero: {
    name: 'Fabrice Boyer',
    title: 'Applications web, explorateurs de données et serveurs d’API.',
    sub: "Une sélection de projets open-source : des applications statiques déployées sur GitHub Pages, des explorateurs de jeux de données volumineux qui tournent entièrement dans le navigateur, et les librairies et services qui les alimentent.",
    cta_explore: 'Voir les projets',
    cta_github: 'Profil GitHub',
    stat_projects: 'Projets',
    stat_live: 'Sites en ligne',
    stat_langs: 'Langages',
    stat_stars: 'Étoiles',
  },
  apps: {
    title: 'Applications et sites',
    sub: 'Projets déployés sur GitHub Pages : ils tournent entièrement dans le navigateur, sans backend ni compte à créer.',
  },
  libs: {
    title: 'Librairies, services et outils',
    sub: "Les briques sous-jacentes : serveurs d'API alimentés par des dumps locaux, modules réutilisables, jeux de données et outils en ligne de commande.",
  },
  filters: { all: 'Tous', lang: 'Filtrer par langage' },
  card: {
    demo: 'Démo',
    code: 'Code source',
    live: 'En ligne',
    stars_one: '{{count}} étoile',
    stars_other: '{{count}} étoiles',
  },
  kinds: {
    webapp: 'application web',
    game: 'jeu',
    explorer: 'explorateur',
    server: 'serveur',
    library: 'librairie',
    dataset: 'jeu de données',
    tool: 'outil',
  },
  empty: 'Aucun projet ne correspond à ce filtre.',
  footer: {
    built: 'React, Vite et TypeScript. Déployé par GitHub Actions.',
    source: 'Source de cette page',
  },
}

export type Dict = typeof fr
