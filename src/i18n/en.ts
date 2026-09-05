import type { Dict } from './fr'

export const en: Dict = {
  nav: { apps: 'Applications', libs: 'Libraries', github: 'GitHub' },
  a11y: {
    skip: 'Skip to content',
    theme: 'Theme',
    lang: 'Language',
    accent: 'Accent colour',
    light: 'Light',
    dark: 'Dark',
    system: 'System',
  },
  hero: {
    name: 'Fabrice Boyer',
    title: 'Web applications, data explorers and API servers.',
    sub: 'A selection of open-source projects: static applications deployed on GitHub Pages, explorers for very large datasets that run entirely in the browser, and the libraries and services behind them.',
    cta_explore: 'View the projects',
    cta_github: 'GitHub profile',
    stat_projects: 'Projects',
    stat_live: 'Live sites',
    stat_langs: 'Languages',
    stat_stars: 'Stars',
  },
  apps: {
    title: 'Applications and sites',
    sub: 'Projects deployed on GitHub Pages: they run entirely in the browser, with no backend and no account to create.',
  },
  libs: {
    title: 'Libraries, services and tools',
    sub: 'The underlying building blocks: API servers fed by local dumps, reusable modules, datasets and command-line tools.',
  },
  filters: { all: 'All', lang: 'Filter by language' },
  card: {
    demo: 'Demo',
    code: 'Source code',
    live: 'Live',
    stars_one: '{{count}} star',
    stars_other: '{{count}} stars',
  },
  kinds: {
    webapp: 'web app',
    game: 'game',
    explorer: 'explorer',
    server: 'server',
    library: 'library',
    dataset: 'dataset',
    tool: 'tool',
  },
  empty: 'No project matches this filter.',
  footer: {
    built: 'React, Vite and TypeScript. Deployed by GitHub Actions.',
    source: 'Source of this page',
  },
}
