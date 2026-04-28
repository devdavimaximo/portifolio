# Davi Maximo — Portfolio

> Portfólio profissional de desenvolvedor Full Stack com UI dark premium, animação de skills sincronizada com o scroll e motion design cinematográfico.

[![Deploy](https://img.shields.io/badge/Deploy-Vercel-000000?style=flat-square&logo=vercel)](https://davimaximoquoos.vercel.app)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-0055FF?style=flat-square&logo=framer&logoColor=white)](https://www.framer.com/motion)

**🌐 Live:** [davimaximoquoos.vercel.app](https://davimaximoquoos.vercel.app)

---

## Sobre o Projeto

Portfólio desenvolvido do zero para transmitir qualidade técnica e atenção a detalhes. O design segue um sistema de cores escuro customizado, com animações baseadas em GPU para garantir fluidez em qualquer dispositivo. O destaque principal é a Hero Section com um vídeo de animação de skills que é controlado pelo scroll — cada frame avança conforme o usuário rola a página.

---

## Tecnologias

### Core
| Tecnologia | Versão | Uso |
|---|---|---|
| [React](https://react.dev) | 19 | Framework principal (SPA) |
| [Vite](https://vitejs.dev) | 8 | Bundler e dev server |
| [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) | ES2024 | Linguagem (sem TypeScript) |

### Estilo & Animação
| Tecnologia | Versão | Uso |
|---|---|---|
| [TailwindCSS](https://tailwindcss.com) | 3 | Estilização com design system customizado |
| [Framer Motion](https://www.framer.com/motion) | 12 | Animações de entrada, stagger e transições |
| [Lucide React](https://lucide.dev) | 1.x | Ícones SVG |

### Utilitários
| Pacote | Uso |
|---|---|
| [clsx](https://github.com/lukeed/clsx) | Composição condicional de classes |
| [tailwind-merge](https://github.com/dcastil/tailwind-merge) | Merge de classes Tailwind sem conflitos |

---

## Funcionalidades

- **Animação sincronizada com scroll** — vídeo da hero tem o `currentTime` controlado pelo `scrollY` via loop `requestAnimationFrame` com interpolação lerp(0.12) para suavidade
- **Animações cinematográficas** — Framer Motion com stagger, fade-up e triggers por viewport em todas as seções
- **Design system completo** — paleta de cores, sombras glow, tipografia e animações definidas no `tailwind.config.js`
- **Layout totalmente responsivo** — mobile-first com overlays e tipografia adaptativa
- **Zero layout shifts** — 100% das animações usam `transform` / `opacity` (composited pelo GPU)

---

## Seções

| Seção | Descrição |
|---|---|
| **Hero** | Vídeo animado controlado por scroll, nome, cargo, CTAs e stats |
| **About** | Layout editorial — foco em backend (C# / .NET) e objetivos de carreira |
| **Projects** | Grid de projetos com tags de tecnologias e links |
| **Skills** | Matriz de skills em três colunas (Backend · Frontend · Ferramentas) com barras animadas |
| **Contact** | Links diretos para email, GitHub e LinkedIn |

---

## Design System

```
Backgrounds   #050508  /  #07070c  /  #0d0d14
Primary       #7c3aed  (violet)
Accent        #22d3ee  (cyan)
Texto         #f8fafc  →  zinc-200  →  zinc-300  →  zinc-400
Bordas        #1a1a2e  →  #252540
```

Glow shadows customizados: `glow-purple`, `glow-cyan` — definidos via `boxShadow` no Tailwind config.

---

## Rodando Localmente

```bash
# Clonar o repositório
git clone https://github.com/devdavimaximo/portfolio.git
cd portfolio

# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev
# → http://localhost:5173

# Build de produção
npm run build

# Pré-visualizar o build
npm run preview
```

---

## Estrutura do Projeto

```
src/
├── components/
│   ├── Hero/
│   │   ├── Hero.jsx          # Seção sticky com scroll de 230vh
│   │   ├── HeroText.jsx      # Nome, role, badges, CTAs, stats
│   │   └── HeroVideo.jsx     # Lógica de scrubbing do vídeo (lerp + RAF)
│   ├── About/
│   │   └── About.jsx
│   ├── Projects/
│   │   ├── Projects.jsx
│   │   └── ProjectCard.jsx
│   ├── Skills/
│   │   ├── Skills.jsx
│   │   └── SkillBadge.jsx
│   ├── Contact/
│   │   └── Contact.jsx
│   └── shared/
│       ├── Navbar.jsx
│       ├── Footer.jsx
│       └── SectionWrapper.jsx
├── data/
│   ├── config.js             # Nome, bio, links, stats
│   ├── projects.js           # Lista de projetos
│   └── skills.js             # Categorias e níveis de habilidade
└── styles/
    └── index.css             # Tokens CSS + utilitários customizados
```

---

## Deploy

O projeto está configurado para deploy na **Vercel**. Basta conectar o repositório — o Vite é detectado automaticamente.

**Produção:** [davimaximoquoos.vercel.app](https://davimaximoquoos.vercel.app)

---

## Autor

**Davi Maximo** — Desenvolvedor Full Stack com foco em C# e .NET

[![GitHub](https://img.shields.io/badge/GitHub-devdavimaximo-181717?style=flat-square&logo=github)](https://github.com/devdavimaximo)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-davimaximoquoos-0A66C2?style=flat-square&logo=linkedin)](https://linkedin.com/in/davimaximoquoos)
[![Email](https://img.shields.io/badge/Email-davimaximoquooss%40gmail.com-EA4335?style=flat-square&logo=gmail&logoColor=white)](mailto:davimaximoquooss@gmail.com)
