# Portfólio de Lucas Goularte

![Vue](https://img.shields.io/badge/Vue.js-35495e?style=for-the-badge&logo=vue.js&logoColor=4FC08D)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![GSAP](https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge&logo=greensock&logoColor=white)

Portfólio pessoal em Vue 3 + Vite + Tailwind CSS 4, animado com GSAP
(ScrollTrigger e SplitText), com uma rota `/links` que mantém o formato
link-bio mobile para usar na biografia do Instagram.

## Rodando

```bash
npm install
npm run dev      # servidor de desenvolvimento
npm run build    # build de produção em dist/ (gera 404.html para SPA)
npm run preview  # serve o build local
```

## Como personalizar

Todo o conteúdo fica em `src/data/`, sem precisar mexer nos componentes:

| Arquivo | O que controla |
| --- | --- |
| `profile.js` | nome, cargo, bio, e-mail, disponibilidade e redes sociais |
| `projects.js` | cards da seção Projetos (título, resumo, tags, links) |
| `stack.js` | stack agrupada por camada e certificações |
| `navigation.js` | itens do menu (a ordem aqui define a ordem no menu) |

As cores, fontes e espaçamentos são tokens Tailwind declarados em `@theme`
dentro de `src/assets/main.css`. Alterar `--color-accent` ali retematiza o site
inteiro.

Imagens ficam em `public/images/` e são referenciadas apenas pelo nome do
arquivo nos dados (`icon: 'vue.png'`); o caminho é resolvido por
`src/composables/useAssetUrl.js`, respeitando o `base` do Vite.

## Estrutura

```
src/
├── assets/main.css       # tokens de design (@theme) e estilos base
├── components/
│   ├── layout/           # SiteHeader e SiteFooter
│   ├── sections/         # Hero, Projetos, Sobre + Stack, card do link-bio
│   └── ui/               # MediaFrame, ArchitectureGlyph, ícones, badge
├── composables/          # motion do hero, seção ativa, scroll suave, assets
├── data/                 # conteúdo do site
├── directives/           # v-magnetic
├── motion/gsap.js        # registro dos plugins e defaults do GSAP
├── router/               # rotas
└── views/                # HomeView, LinksView, NotFoundView
```

## Deploy

O site é estático. Por padrão o build assume o domínio na raiz:

```bash
npm run build
```

Para servir em subpasta, que é o caso do GitHub Pages em `/link-Bio/`:

```bash
npm run build:gh   # equivale a VITE_BASE=/link-Bio/ npm run build
```

O router usa history mode (URLs limpas), então a hospedagem precisa devolver
`index.html` para rotas desconhecidas. O build já gera um `dist/404.html`
idêntico ao `index.html`, que é como o GitHub Pages resolve isso. Em Nginx, S3
ou Netlify, configure o rewrite equivalente para `/index.html`.

## Motion

As animações usam GSAP. Os plugins são registrados uma única vez em
`src/motion/gsap.js`; cada composable roda dentro de um `gsap.context()` e faz
`revert()` no unmount, então nada vaza entre rotas.

| Onde | O quê |
| --- | --- |
| `useHeroMotion` | entrada do hero com SplitText e parallax por scrub |
| `useChapterTracker` | seção ativa, alimenta o contador 01 / 05 |
| `useSmoothScroll` | scroll suave com ScrollSmoother |
| `MediaFrame` | foto do slot, ou fallback com spotlight e grão quando não há imagem |
| `ArchitectureGlyph` | diagrama da arquitetura do projeto, traçado no scroll |
| `v-magnetic` | elementos que acompanham o cursor |

## Imagens

`MediaFrame` aceita um arquivo em `public/images/` e cai num visual gerado
quando o campo está vazio. Os slots ficam em `src/data/`:

| Campo | Onde aparece | Proporção sugerida |
| --- | --- | --- |
| `profile.heroPortrait` | metade direita do hero | vertical, 3:4 ou maior |
| `profile.aboutPortrait` | coluna central da seção Sobre | vertical, 3:4 |
| `projects[].image` | topo de cada card de projeto | vertical, 4:5 |

## Acessibilidade e motion

- Navegação por teclado com `:focus-visible` visível em todos os links.
- Tudo respeita `prefers-reduced-motion`: as timelines não rodam e o conteúdo
  aparece estático.
- Os efeitos de cursor só são ativados em `(pointer: fine)`.
- O estado inicial das animações é aplicado por JavaScript: se o script falhar,
  o conteúdo permanece visível.
