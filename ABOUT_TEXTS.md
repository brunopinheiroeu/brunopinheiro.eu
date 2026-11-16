# Textos da página About

Fonte: `src/components/story/AboutExperience.tsx`, `src/lib/story.ts`, `src/components/site/SiteHeader.tsx`, `src/app/about/page.tsx`.

## Textos estáticos

### Meta (aba e SEO)
- Título: `About — Bruno Pinheiro`
- Descrição: `Lead Product Designer and Design Engineer connecting product strategy, user experience, and development.`

### Header
- `BRUNO PINHEIRO`
- `Lead Product Designer & Design Engineer`
- Links: `Work`, `About`
- Botão da engrenagem (aria-label): `Appearance settings`

### Coluna de texto
- Eyebrow: `About — interactive`
- Título: `Curiosity, business thinking, and hands-on building.`
- Intro: `I'm Bruno Pinheiro, a Lead Product Designer and Design Engineer connecting product strategy, user experience, and development. I currently lead product design for educational platforms while building independent products and tools that address everyday problems.`
- Estatísticas:
  - `1,100+` · Games in the three suites built on my design system
  - `50,000+` · Students on the redesigned platform
  - `−82%` · Weekly team time, from 140 h to 25 h
- Cabeçalho do contador: `DISCOVERED` e `0 / 10` (o número sobe conforme a pessoa descobre facetas)
- Links:
  - `Download CV ↗` (abre `/cv/Bruno_Pinheiro_CV_EN.pdf`)
  - `LinkedIn ↗` (linkedin.com/in/brunopinheiroeu)
  - `GitHub ↗` (github.com/brunopinheiroeu)
  - `hello@brunopinheiro.eu ⧉` (tooltip: `Copy email address`)

### Órbita
- Graus: `000°`, `090°`, `180°`, `270°`
- Dica embaixo: `SCROLL TO SPIN · HOVER TO PAUSE · CLICK A NODE`
- Labels dos 10 nós (aria-label de cada um: `Discover: <label>`): Product Design, Product Builder, Design Systems, Leadership, AI Prototyping, User Testing, Automation, MBA, Origins, Off hours

### Card de facetas, estado inicial (nada selecionado)
- `Click any node in the orbit to see why it matters and where to find it in my work. The inner ring is the core; the outer ring is how I work and who I am off the clock. Scroll to spin, hover to pause. Find all ten.`

## Textos na interação

### Ao clicar num nó, o card mostra
- `FACET 01 / 10 · CORE` (ou `· HOW I WORK` para os nós do anel externo)
- Título da faceta
- Rótulo `WHY` e o texto da faceta
- Rótulo `WHERE TO FIND IT` com botões `<Nome do case> →` (só nas facetas que têm cases ligados)

### As 10 facetas

| # | Anel | Título | Texto | Cases ligados |
|---|---|---|---|---|
| 1 | CORE | Product design | I connect business goals, user needs, and hands-on development to build useful products, from educational platforms to tools people use every day. | Bua na Cainte, Tomei, Karakue, PDF Buddy and SortAndGo |
| 2 | CORE | Product builder | I don't stop at the mockup: I design, build and deploy the product myself, taking it through user tests, live pilots and launch prep. | Tomei, Karakue, PDF Buddy and SortAndGo |
| 3 | CORE | Design systems | Built and maintain the design system behind the Bua learning suites: a Figma UI kit with documented contrast and readability standards, plus reusable HTML/CSS components, used across three delivered suites. | Bua na Cainte |
| 4 | CORE | Design leadership | Migrated Edco's legacy Flash suites to the web, moved the team from Dropbox/FTP to Git and Jira, and cut weekly team time from 140 to 25 hours while shipping every suite before the school year. | Bua na Cainte |
| 5 | HOW I WORK | AI-assisted prototyping | AI-assisted development lets me prototype, test, and iterate faster. Tomei's MVP took 8 hours, with the first user test after ~20 hours of work. | Tomei, Karakue, PDF Buddy and SortAndGo |
| 6 | HOW I WORK | Testing with real people | Decisions get validated in real use: teacher feedback from classrooms, open testing of Tomei with Android users, and live karaoke nights in a pub. | Bua na Cainte, Tomei, Karakue |
| 7 | HOW I WORK | Workflow automation | I turn repetitive work into tools: Python and Shell scripts that replaced manual deploys and task creation, and browser tools that replace hours of PDF and image preparation for a print shop client. | PDF Buddy and SortAndGo, Bua na Cainte |
| 8 | HOW I WORK | MBA in Entrepreneurship & Innovation | I previously founded and ran a VR company. That experience and my MBA in Entrepreneurship & Innovation help me balance user needs with business viability, set priorities, and decide what to build. | nenhum |
| 9 | HOW I WORK | Where it started | My interest in building started with taking motors out of toy cars to make small fans and boats. That curiosity led me to design and development with Unity, Unreal, and HTML/CSS. | nenhum |
| 10 | HOW I WORK | Off the clock | Outside of work, I enjoy running, photography, cooking, and playing guitar. | nenhum |

### Toasts
- Ao descobrir a 5ª faceta: `Halfway there — 5 of 10 facets discovered.`
- Ao descobrir as 10: `Achievement unlocked: Curious mind. You explored every facet.`
- Ao clicar no email: `My email was copied to your clipboard`

### Estados que mudam de texto
- Link do email, por 2,4 s depois de copiar: `Email copied ✓`
- Dica da órbita, quando as 10 facetas foram descobertas: `ALL FACETS DISCOVERED ✦`
- Transição ao ir para um case: `01 — BUA NA CAINTE` (o número e o nome vêm do case)
- Transição ao ir para outras páginas: `ABOUT`, `WORK` e `BRUNO PINHEIRO`

### Atalhos sem texto na tela
- Rolagem do mouse e setas ← → giram a órbita.

## Observações
- Os nomes dos cases nos botões `WHERE TO FIND IT` vêm do Contentful e podem diferir dos usados aqui.
- Os textos do painel de Appearance (engrenagem) não estão incluídos.
