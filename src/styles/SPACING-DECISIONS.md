# Spacing Decisions Log

Documento di riferimento per le scelte di spacing applicate ai componenti.
Aggiornato progressivamente durante lo sviluppo.

---

## Design System Reference

### Variabili disponibili (Mobile → Desktop @768px)
```
--spacing-padding-xs: 24px → 32px
--spacing-padding-sm: 32px → 48px
--spacing-padding-md: 48px → 64px
--spacing-padding-lg: 64px → 96px
--spacing-padding-xl: 96px → 128px
--spacing-padding-2xl: 128px → 160px

--spacing-section-md: 96px → 128px (spacing tra sezioni)
```

### Regole generali
- **Spacing piccoli** (fino a 8 = 32px): usare Tailwind standard
  - `p-1`, `p-2`, `p-4`, `p-8` (padding)
  - `m-1`, `m-2`, `m-4`, `m-8` (margin)
  - `gap-1`, `gap-2`, `gap-4`, `gap-8` (gap)
  - `space-x-1`, `space-y-2`, etc. (space)
- **Spacing grandi** (oltre 32px): usare variabili `--spacing-*`
- **Approccio**: Mobile-first con media queries

### Regole sezioni (padding verticale)
- **Solo padding-top**: ogni sezione gestisce solo il proprio `padding-top`. La separazione tra sezioni è data dal padding-top della sezione successiva. Nessun `padding-bottom`.
- **Valori standard sezioni**: `--spacing-padding-lg` (64px mobile) → `--spacing-padding-xl` (128px desktop @768px)
- Questo evita doppio spacing quando due sezioni sono adiacenti.

### Pattern container standard (padding orizzontale)
Tutte le sezioni maggiori usano lo stesso pattern per il container:
```css
.container {
  padding-left: max(var(--margin-safe-x), var(--spacing-padding-xs));
  padding-right: max(var(--margin-safe-x), var(--spacing-padding-xs));
}
@media (min-width: 640px) {
  .container {
    padding-left: max(var(--margin-safe-x), var(--spacing-padding-sm));
    padding-right: max(var(--margin-safe-x), var(--spacing-padding-sm));
  }
}
@media (min-width: 1024px) {
  .container {
    padding-left: max(var(--margin-safe-x), var(--spacing-padding-md));
    padding-right: max(var(--margin-safe-x), var(--spacing-padding-md));
  }
}
```
Breakpoint progressivo: xs (24px) → sm (32px) @640px → md (48px) @1024px, con `--margin-safe-x` come floor.

---

## Componenti Documentati

### 1. DemoReveal Section
**File:** `src/styles/sections/demo-reveal.css`
**Data:** 2026-01-24

#### Struttura
```
section.demo-reveal-section
  └── div.demo-reveal-container
        └── PartnersLogos
              └── div.partners-grid
                    ├── div.partner-card (MarketiseMe)
                    └── div.partner-card (Google/Meta)
                          └── div.partner-logos-group
```

#### Scelte applicate

| Elemento | Proprietà | Mobile | Desktop | Motivazione |
|----------|-----------|--------|---------|-------------|
| `.demo-reveal-section` | padding-top | `--spacing-padding-lg` (64px) | `--spacing-padding-xl` (128px) | Solo padding-top, separazione gestita dal padding-top della sezione successiva. |
| `.demo-reveal-container` | padding-x | `max(--margin-safe-x, --spacing-padding-xs)` (24px) | `max(--margin-safe-x, --spacing-padding-md)` (64px) | Pattern container standard con safe margins. Breakpoint progressivo: xs → sm → md. |
| `.partners-grid` | gap | `--spacing-padding-md` (48px) | `--spacing-padding-lg` (96px) | Separa visivamente le due colonne partner. Gap generoso per enfatizzare la gerarchia. |
| `.partner-card` | gap | `--spacing-padding-xs` (24px) | - | Gap tra label "Official Partner of" e logo. Piccolo ma leggibile. |
| `.partner-logos-group` | gap | `gap-4` (16px) | `gap-8` (32px) | Loghi Google/Meta affiancati. Gap piccolo con Tailwind per semplicità. |

#### Note
- Mantenuto `position: sticky`, `clip-path` e `z-index` originali
- Solo padding-top: la separazione con la sezione successiva è data dal suo padding-top
- Il container usa pattern standard con safe margins

---

### 2. OfficialPartner Section
**File:** `src/styles/sections/official-partner.css`
**Data:** 2026-01-24

#### Struttura
```
section.official-partner-section
  └── div.official-partner-container
        ├── ScrollRevealText
        │     └── div.scroll-reveal-text-wrapper
        │           ├── h3 (line 1)
        │           ├── h3 (line 2)
        │           └── h3 (line 3)
        └── StatsGrid (shared component)
              └── div.stats-grid
                    ├── div.stats-card (Avg ROAS)
                    ├── div.stats-card (Ad Spend)
                    ├── div.stats-card (Years Exp)
                    └── div.stats-card (Continents)
```

#### Scelte applicate

| Elemento | Proprietà | Mobile | Desktop | Motivazione |
|----------|-----------|--------|---------|-------------|
| `.official-partner-section` | padding-top | `--spacing-padding-lg` (64px) | `--spacing-padding-xl` (128px) | Solo padding-top, separazione gestita dal padding-top della sezione successiva. |
| `.official-partner-container` | padding-x | `max(--margin-safe-x, --spacing-padding-xs)` (24px) | `max(--margin-safe-x, --spacing-padding-md)` (64px) | Segue pattern container-centered con safe margins. Breakpoint progressivo: xs → sm → md. |
| `.official-partner-container` | gap | `--spacing-padding-md` (48px) | `--spacing-padding-lg` (96px) | Separazione tra scroll-reveal text e stats grid. Gap generoso per enfatizzare la gerarchia. |
| `.scroll-reveal-text-wrapper` | gap | `1rem` (16px) | `1.5rem` (24px) | Gap piccolo tra le linee h3. Spacing piccolo → valori diretti. |
| `.stats-grid` | gap | `--spacing-padding-sm` (32px) | `--spacing-padding-md` (48px) | Gap tra le stat cards. Definito in typography.css come classe shared. |
| `.stats-grid` | padding-x | `var(--margin-safe-x)` | - | Safety margins per schermi stretti. |
| `.stats-card` | gap | `0.5rem` (8px) | - | Gap minimo tra valore e label. Definito in typography.css. |

#### Note
- `AnimatedStat` e `stats-grid` estratti in componente shared `StatsGrid` (`src/components/shared/StatsGrid.jsx`)
- Le classi `.stats-grid`, `.stats-card`, `.stats-value` sono definite in `typography.css` per riuso globale
- Rimossi duplicati CSS tra `official-partner.css` e `typography.css`
- Il container usa `display: flex; flex-direction: column` per il gap tra scroll text e stats

---

### 3. GrainyBgSection (layer esterno)
**File:** `src/styles/sections/grainy-bg.css`
**Data:** 2026-01-24

#### Struttura
```
section.grainy-bg-section (padding-top per separazione sezioni + px-4 per inset card)
  └── div.grainy-bg-card (card 3D con shader background)
        ├── div (sticky shader background, 100dvh + 24px)
        └── motion.div.grainy-bg-content (wrapper contenuti, max-w-7xl centrato)
              ├── NeuralServices / NeuralServicesMobile
              ├── InfinityPhilosophy
              └── CampaignShowcase (unita a InfinityPhilosophy)
```

#### Scelte applicate

| Elemento | Proprietà | Mobile | Desktop | Motivazione |
|----------|-----------|--------|---------|-------------|
| `.grainy-bg-section` | padding-top | `--spacing-padding-lg` (64px) | `--spacing-padding-xl` (128px) @768px | Standard sezione. Era `--spacing-padding-2xl`, ridotto per coerenza. |
| `.grainy-bg-section` | padding-x | `px-4` (16px) | `px-4` (16px) | Inset fisso per mostrare bordi arrotondati della card. Spacing piccolo → Tailwind. |
| `.grainy-bg-card` | padding-top | rimosso | rimosso | Non è una sezione, non serve padding-top. Era duplicato con la sezione. |
| `.grainy-bg-content` | padding-top | `--spacing-padding-lg` (64px) | `--spacing-padding-xl` (128px) @768px | Spazio interno tra top shader e primo contenuto. Sostituisce il triplo padding rimosso. |
| `.grainy-bg-content > children` | padding-x | container pattern standard | container pattern standard | Già presente, mantenuto. Pattern xs → sm → md con safe margins. |

#### Note
- Rimosso triplo padding-top accumulato (sezione + card + content inline) → ora solo sezione
- `px-4` sulla sezione mantenuto: è l'inset visivo della card con `rounded-2xl`, non container padding
- I componenti interni (InfinityPhilosophy, CampaignShowcase) avranno il proprio spacing applicato separatamente
- Il container pattern per i figli di `.grainy-bg-content` era già corretto (con esclusione per `.services-container-mobile` e `.performance-section`)

---

### 4. NeuralServices (desktop + mobile)
**File:** `src/styles/sections/neural-services.css`, `src/styles/sections/grainy-bg.css`
**Data:** 2026-01-24

#### Struttura
```
Fragment (figli diretti di .grainy-bg-content)
  ├── div.max-w-content (intro wrapper, riceve container pattern padding-x dal parent)
  │     └── .section-intro-container (padding-bottom → gap con slider)
  │           └── SectionTitle (mb-6 interno)
  ├── div.max-w-content (slider container)
  │     ├── div.-mx-4.md:mx-0 [Desktop] / .services-slider-expander [Mobile] (full-bleed layout)
  │     │     ├── .service-slider-nav-mobile (margin-bottom → gap con slider)
  │     │     └── Swiper container
  │     └── .services-bottom-cta-section (margin-top → gap dal slider)
  │           ├── .services-bottom-cta-content
  │           └── MovingBorderButton
```

#### Scelte applicate

| Elemento | Proprietà | Mobile | Desktop | Motivazione |
|----------|-----------|--------|---------|-------------|
| `.grainy-bg-content` | padding-top | `--spacing-padding-lg` (64px) | `--spacing-padding-xl` (128px) @768px | Top space interno al shader card. Sostituisce inline `pt-16 md:pt-24 lg:pt-32`. |
| `.section-intro-container` | padding-bottom | `--spacing-padding-sm` (32px) | `--spacing-padding-md` (64px) @768px | Gap tra section intro e slider. |
| `.service-slider-nav-mobile` | margin-bottom | `--spacing-padding-xs` (24px) | - | Gap tra nav buttons e slider. Solo in CSS, rimosso inline Tailwind ridondante. |
| `.services-bottom-cta-section` | margin-top | `--spacing-padding-md` (48px) | `--spacing-padding-lg` (96px) @768px | Separazione CTA dal slider. |
| `.services-bottom-cta-section` | gap | `--spacing-padding-sm` (32px) | `--spacing-padding-md` (64px) @768px | Gap tra testo CTA e bottone. |

#### Note
- NeuralServices è un Fragment: i suoi figli diventano figli diretti di `.grainy-bg-content`
- Il container pattern padding-x è gestito dalla regola `.grainy-bg-content > :not(...)` per il desktop
- Per il mobile, `.services-container-mobile` ha il proprio `padding-x: var(--margin-safe-x)` (definito in style JSX inline)
- `-mx-4 md:mx-0` (desktop) e `.services-slider-expander` (mobile) sono layout techniques per full-bleed slider, non spacing
- Rimosso `pb-8` da entrambi gli Swiper: era dead code (overridden da CSS `padding-bottom: 100px !important`)
- Rimosso `px-(--margin-safe-x)` ridondante dall'intro wrapper mobile (gestito dal container pattern)
- Rimosso `mb-(--spacing-padding-xs) md:mb-(--spacing-padding-sm)` inline dalla nav mobile (base case già in CSS; md case era dead code - componente non renderizzato a ≥768px)
- Rimossa classe `.section-intro-title-spacing` da grainy-bg.css (dead code, mai usata da alcun componente)
- Card components (`service-slider.jsx`) non modificati: usano spacing piccoli (≤32px) con Tailwind, coerenti con il design system

---

### 5. InfinityPhilosophy (sub-section dentro GrainyBg)
**File:** `src/styles/sections/infinity.css`
**Data:** 2026-01-24

#### Struttura
```
div.infinity-section (figlio diretto di .grainy-bg-content, escluso dal container padding)
  └── div.infinity-layout (flex column, gap tra BrandMarquee e contenuto)
        ├── BrandMarquee (full-bleed, nessun vincolo max-w né padding-x)
        └── div.infinity-content (max-w-content, container padding, relative per SVG)
              ├── motion.div (infinity SVG background, absolute)
              ├── div (gradient glow, absolute)
              └── motion.div.infinity-paragraphs (foreground text, z-10)
```

#### Scelte applicate

| Elemento | Proprietà | Mobile | Desktop | Motivazione |
|----------|-----------|--------|---------|-------------|
| `.infinity-section` | padding-top | `--spacing-padding-xl` (96px) | `--spacing-padding-2xl` (160px) @768px | Separazione generosa dalla sezione sopra (NeuralServices). Sezione principale dentro GrainyBg. |
| `.infinity-section` | padding-x | nessuno | nessuno | Escluso dal container padding rule per permettere BrandMarquee full-bleed. |
| `.infinity-layout` | gap | `--spacing-padding-sm` (32px) | `--spacing-padding-md` (64px) @768px | Gap tra BrandMarquee e paragrafi. |
| `.infinity-content` | padding-x | container pattern standard | container pattern standard | xs → sm → md con safe margins. Solo per i paragrafi. |
| `.infinity-content` | max-width | `max-w-content` | `max-w-content` | Limita la larghezza dei paragrafi per leggibilità. |
| `.infinity-paragraphs` | gap | `--spacing-padding-xs` (24px) | `--spacing-padding-xs` (24px) | Gap tra i paragrafi. Spacing piccolo. |
| `.infinity-paragraphs` | max-width | `max-w-3xl` (768px) | `max-w-3xl` (768px) | Limita lunghezza righe per leggibilità. |

#### Note
- `.infinity-section` è escluso dalla regola `.grainy-bg-content > :not(...)` in grainy-bg.css
- BrandMarquee riceve `className="px-(--margin-safe-x) pt-0 mb-0"` per safe margins laterali e override dei default
- Il simbolo infinity SVG è posizionato absolute dentro `.infinity-content`, relativo ai paragrafi
- Rimosso padding-bottom: design system prevede solo padding-top
- Rimosso `max-w-5xl mx-auto` wrapper che vincollava BrandMarquee

---

### 6. CampaignShowcase (sub-section unita a InfinityPhilosophy)
**File:** `src/styles/sections/campaign.css`
**Data:** 2026-01-24

#### Struttura
```
div.campaign-showcase-section (figlio diretto di .grainy-bg-content, escluso dal container padding)
  └── DesktopSection (hidden md:block) / MobileSection (md:hidden)
        ├── Scroll container (cards sticky/scroll, full-bleed)
        │     └── Campaign cards (slider immagini)
        ├── div.campaign-header (max-w-content, container pattern)
        │     ├── h3 (titolo)
        │     └── p (descrizione)
        └── div.campaign-stats (max-w-content, container pattern)
              └── div.stats-grid (shared component)
```

#### Scelte applicate

| Elemento | Proprietà | Mobile | Desktop | Motivazione |
|----------|-----------|--------|---------|-------------|
| `.campaign-showcase-section` | padding-top | `--spacing-padding-sm` (32px) | `--spacing-padding-md` (64px) @768px | Ridotto rispetto allo standard (lg→xl) perché unito visivamente a InfinityPhilosophy. |
| `.campaign-showcase-section` | padding-bottom | `--spacing-padding-lg` (64px) | `--spacing-padding-xl` (128px) @768px | Eccezione: ultimo elemento dentro GrainyBg card, serve respiro visivo. |
| `.campaign-showcase-section` | padding-x | nessuno | nessuno | Escluso dal container padding rule per permettere slider full-bleed. |
| `.campaign-header` | padding-top | `--spacing-padding-md` (48px) | `--spacing-padding-lg` (96px) @768px | Separazione tra cards e titolo. |
| `.campaign-header` | padding-x | container pattern standard | container pattern standard | xs → sm → md con safe margins. |
| `.campaign-header` | max-width | `max-w-content` | `max-w-content` | Limita larghezza contenuto. |
| `.campaign-stats` | padding-top | `--spacing-padding-sm` (32px) | `--spacing-padding-sm` (32px) | Separazione tra header e stats. |
| `.campaign-stats` | padding-x | container pattern standard | container pattern standard | xs → sm → md con safe margins. |
| `.campaign-stats` | max-width | `max-w-content` | `max-w-content` | Limita larghezza contenuto. |

#### Note
- `.campaign-showcase-section` è escluso dalla regola `.grainy-bg-content > :not(...)` in grainy-bg.css
- È l'ultima sub-section dentro GrainyBg, unita visivamente a InfinityPhilosophy (padding-top ridotto)
- Il slider delle cards è full-bleed (nessun padding-x sulla sezione)
- Header e stats hanno il container pattern per allinearsi con gli altri contenuti
- Eccezione padding-bottom: ultimo elemento dentro GrainyBg card, serve per dare respiro visivo al fondo della card
- Stats usa `.stats-grid` shared definita in typography.css

---

### 7. EngineTimeline (Process Section)
**File:** `src/styles/sections/engine-timeline.css`
**Data:** 2026-01-24

#### Struttura
```
section.engine-timeline-section (SEZIONE - padding-top)
  └── div.relative.z-10
        ├── DesktopTimeline (hidden lg:block)
        │     ├── div.engine-timeline-container.engine-timeline-title-container
        │     │     ├── ScrollRevealText (titolo)
        │     │     └── motion.p (sottotitolo)
        │     └── div.engine-timeline-container
        │           └── ProcessStep × N
        │                 ├── Circle con numero dither
        │                 └── .process-step-card
        │
        └── MobileTimeline (lg:hidden)
              ├── div.mobile-timeline-title (titolo + sottotitolo)
              └── div scroll container (400vh)
                    └── div.sticky
                          └── div.mobile-timeline-wrapper
                                ├── div.mobile-timeline-glow-layer (absolute)
                                │     └── motion.div.mobile-timeline-cards
                                │           └── MobileCard × N (glow-only)
                                └── div (content layer, masked)
                                      └── motion.div.mobile-timeline-cards
                                            └── MobileCard × N (content-only)
```

#### Scelte applicate

| Elemento | Proprietà | Mobile | Desktop | Motivazione |
|----------|-----------|--------|---------|-------------|
| `.engine-timeline-section` | padding-top | `--spacing-padding-lg` (64px) | `--spacing-padding-xl` (128px) @768px | Standard sezione. |
| `.engine-timeline-section` | padding-bottom | `--spacing-padding-lg` (64px) | `--spacing-padding-xl` (128px) @768px | Eccezione: sezione successiva (ProjectsShowcase) ha struttura diversa con card inset. |
| `.engine-timeline-container` | padding-x | `max(--margin-safe-x, --spacing-padding-xs)` (24px) | `max(--margin-safe-x, --spacing-padding-md)` (64px) @1024px | Container pattern standard con safe margins. Breakpoint progressivo: xs → sm → md. |
| `.engine-timeline-title-container` | gap | `--spacing-padding-xs` (24px) | `--spacing-padding-xs` (24px) | Gap tra titolo e sottotitolo. |
| `.engine-timeline-title-container` | padding-bottom | `--spacing-padding-md` (48px) | `--spacing-padding-lg` (96px) @768px | Separazione dal blocco steps. |
| `.process-step` | gap | `--spacing-padding-xs` (24px) | `--spacing-padding-sm` (48px) @768px | Gap tra circle e card. |
| `.process-step` | margin-bottom | `--spacing-padding-sm` (32px) | `--spacing-padding-md` (64px) @768px | Separazione tra steps. Ultimo step: 0. |
| `.process-step-card` | padding | `--spacing-padding-xs` (24px) | `--spacing-padding-sm` (48px) @768px | Padding interno card. |
| `.mobile-timeline-container` | padding-x | `max(--margin-safe-x, --spacing-padding-xs)` (24px) | `max(--margin-safe-x, --spacing-padding-sm)` (48px) @640px | Container pattern per mobile. |
| `.mobile-timeline-title` | gap | `1rem` (16px) | `1.5rem` (24px) @768px | Gap tra h2 e p. Spacing piccolo → valori diretti. |
| `.mobile-timeline-title` | padding-bottom | `--spacing-padding-sm` (32px) | `--spacing-padding-md` (64px) @768px | Separazione dal carousel. |
| `.mobile-timeline-wrapper` | padding-y | `--spacing-padding-sm` (32px) | `--spacing-padding-md` (64px) @768px | Respiro verticale per effetto sticky. |
| `.mobile-timeline-glow-layer` | padding-y | `--spacing-padding-sm` (32px) | `--spacing-padding-md` (64px) @768px | Match con wrapper per allineamento glow. |
| `.mobile-timeline-cards` | gap | `1rem` (16px) | `1rem` (16px) | Gap tra cards nel carousel. Spacing piccolo → valore diretto. |

#### Note
- Sezione con pattern scroll-to-reveal su desktop (ProcessStep con ScrollYProgress)
- Mobile usa carousel orizzontale scroll-driven (stesso pattern di PerformanceMetrics)
- Eccezione padding-bottom: la sezione successiva (ProjectsShowcase) ha struttura diversa con card inset, serve respiro visivo
- Mobile ha container pattern ridotto (xs → sm) perché componente visibile solo sotto lg
- `.timeline-mobile-card` mantiene sizing responsive per card carousel (non modificato, layout non spacing)
- Spacing interni alle card (gap-8, mb-6, mb-4, gap-4, gap-3) lasciati con Tailwind: tutti ≤32px

---

### 8. ProjectsShowcase
**File:** `src/styles/sections/projects.css`
**Data:** 2026-01-24

#### Struttura
```
section.projects-showcase-section (px-4 per inset card arrotondata)
  └── div.projects-showcase-inner (card arrotondata con shader background)
        └── div.projects-showcase-container (container pattern standard)
              ├── BrandMarquee
              ├── p.projects-description (testo descrittivo)
              ├── div.projects-list-container
              │     └── div
              │           └── ProjectItem × N
              │                 └── .project-link-item
              └── CTASectionCard (variant="soft")
```

#### Scelte applicate

| Elemento | Proprietà | Mobile | Desktop | Motivazione |
|----------|-----------|--------|---------|-------------|
| `.projects-showcase-section` | padding-x | `px-4` (16px) | `px-4` (16px) | Inset fisso per mostrare bordi arrotondati della card. Come GrainyBgSection. |
| `.projects-showcase-inner` | padding-top | `--spacing-padding-lg` (64px) | `--spacing-padding-2xl` (160px) @1024px | Solo padding-top, respiro interno alla card. Rimosso padding-bottom. |
| `.projects-showcase-container` | padding-x | `max(--margin-safe-x, --spacing-padding-xs)` (24px) | `max(--margin-safe-x, --spacing-padding-md)` (64px) @1024px | Container pattern standard con safe margins. |
| `.projects-description` | margin-bottom | `--spacing-padding-sm` (32px) | `--spacing-padding-md` (64px) @768px | Gap tra descrizione e lista progetti. |
| `.project-link-item` | padding-y | `--spacing-padding-xs` (24px) | `--spacing-padding-sm` (48px) @768px | Padding verticale per ogni item progetto. |
| `.project-link-content` | gap | `--spacing-padding-sm` (32px) | `--spacing-padding-md` (64px) @768px | Gap tra numero e info progetto. |

#### Note
- Struttura simile a GrainyBgSection: sezione esterna con `px-4` per inset card arrotondata
- Rimosso padding-bottom da `.projects-showcase-inner` per seguire regola "solo padding-top"
- CTA finale sostituita con `CTASectionCard` variant="soft" per coerenza con NeuralServices
- Rimossa classe `.projects-cta-section` (non più usata)
- BrandMarquee e spacing interni ai ProjectItem mantenuti con Tailwind (≤32px)

---

### 9. Service Page (tutti i componenti)
**File:** `src/styles/sections/service-page.css`
**Data:** 2026-01-25

#### Struttura
```
div.service-page (container pagina)
  ├── section.service-hero-section
  │     └── div.service-hero-container (max-w-content, container pattern)
  │           ├── Desktop Bento Grid
  │           └── Mobile Layout
  │
  ├── div.demo-reveal-section
  │     └── BrandMarquee
  │
  ├── section.service-why-bylt-section
  │     └── div.service-why-bylt-container (max-w-content)
  │           └── div.service-why-bylt-grid (container pattern, 2-col grid)
  │                 ├── Content Column
  │                 └── Chart Column
  │
  ├── section.service-process-section
  │     ├── div.service-process-header (max-w-content, container pattern)
  │     └── InfiniteMovingCards (full-bleed)
  │
  ├── section.service-details-section
  │     └── div.service-details-container (max-w-content, container pattern)
  │           ├── Mobile Layout (wave background)
  │           └── Desktop 2-col grid
  │
  └── section.service-cta-section
        └── div.service-cta-container (max-w-lg, container pattern)
```

#### Scelte applicate

| Elemento | Proprietà | Mobile | Desktop | Motivazione |
|----------|-----------|--------|---------|-------------|
| `.service-hero-section` | padding-top | nessuno | nessuno | Prima sezione con shader background, nessun padding-top necessario. |
| `.service-hero-container` | padding-top | `--spacing-padding-lg` (64px) | `--spacing-padding-xl` (128px) @768px | Spazio interno per content sotto shader. |
| `.service-hero-container` | padding-bottom | `--spacing-padding-xl` (96px) | `--spacing-padding-2xl` (160px) @768px | Respiro visivo verso BrandMarquee. |
| `.service-hero-container` | padding-x | container pattern standard | xs → sm → md | Safe margins con breakpoint progressivo. |
| `.service-why-bylt-section` | padding-top | `--spacing-padding-lg` (64px) | `--spacing-padding-xl` (128px) @768px | Standard sezione. |
| `.service-why-bylt-grid` | padding-x | container pattern standard | xs → sm → md | Safe margins con breakpoint progressivo. |
| `.service-process-section` | padding-top | `--spacing-padding-lg` (64px) | `--spacing-padding-xl` (128px) @768px | Standard sezione. |
| `.service-process-header` | padding-x | container pattern standard | xs → sm → md | Safe margins, header allineato al content standard. |
| `.service-process-header` | margin-bottom | `--spacing-padding-sm` (32px) | `--spacing-padding-md` (64px) @768px | Gap tra header e carousel. |
| `.service-details-section` | padding-top | `--spacing-padding-lg` (64px) | `--spacing-padding-xl` (128px) @768px | Standard sezione. |
| `.service-details-container` | padding-x | container pattern standard | xs → sm → md | Safe margins con breakpoint progressivo. |
| `.service-cta-section` | padding-top | `--spacing-padding-xl` (96px) | `--spacing-padding-2xl` (160px) @768px | CTA finale, padding generoso. |
| `.service-cta-section` | padding-bottom | `--spacing-padding-xl` (96px) | `--spacing-padding-2xl` (160px) @768px | Eccezione: ultima sezione della pagina, serve respiro visivo verso footer. |
| `.service-cta-container` | padding-x | container pattern standard | xs → sm → md | Safe margins con breakpoint progressivo. |

#### Note
- Hero container usa `--breakpoint-content` (1440px) come max-width per consistenza col resto del sito
- Process section: header con container pattern, carousel InfiniteMovingCards full-bleed (nessun padding-x)
- CTA usa `--breakpoint-lg` (1024px) come max-width per testo più stretto e leggibile
- Eccezione padding-bottom per CTA: ultima sezione della pagina, serve respiro visivo verso il footer
- BrandMarquee eredita le classi da `.demo-reveal-section` già esistente
- Spacing interni ai componenti (gap-8, gap-12, mb-4, mb-6, etc.) mantenuti con Tailwind: tutti ≤32px

---

## Template per nuovi componenti

```markdown
### [N]. Nome Componente
**File:** `src/styles/sections/[file].css`
**Data:** YYYY-MM-DD

#### Struttura
[Albero HTML semplificato]

#### Scelte applicate
| Elemento | Proprietà | Mobile | Desktop | Motivazione |
|----------|-----------|--------|---------|-------------|
| `.classe` | prop | valore | valore | perché |

#### Note
[Eventuali considerazioni speciali]
```

---

## Prompt Template per Nuovi Componenti

Copia e adatta questo prompt per applicare lo spacing a un nuovo componente:

```
Obiettivo: Inserire padding, gap, margin e spacing nella sezione [NOME_SEZIONE] e nei suoi componenti interni, seguendo il design system esistente.

Contesto:
- [NOME_SEZIONE] è una sezione che [BREVE DESCRIZIONE]
- Tutti i padding/gap/margin sono stati rimossi intenzionalmente per ripartire da zero
- La Hero è il riferimento per il sistema di spacing (non modificarla)
- Riferimento scelte precedenti: src/styles/SPACING-DECISIONS.md

File da modificare:
- src/styles/sections/[nome-sezione].css - padding, gap, margin della sezione e container
- src/components/[path]/[Componente].jsx - eventuali classi Tailwind

Sistema di spacing (definito in src/styles/globals.css):

Variabili disponibili (Mobile → Desktop @768px):
--spacing-padding-xs: 24px → 32px
--spacing-padding-sm: 32px → 48px
--spacing-padding-md: 48px → 64px
--spacing-padding-lg: 64px → 96px
--spacing-padding-xl: 96px → 128px
--spacing-padding-2xl: 128px → 160px

--spacing-section-md: 96px → 128px (per spacing tra sezioni)

Struttura attuale di [NOME_SEZIONE]:

<section className="[classe-sezione]">
    <div className="[classe-container]">
        [COMPONENTI INTERNI]
    </div>
</section>

Classi CSS da popolare (in [nome-sezione].css):
- .[classe-sezione] - SOLO padding-top (nessun padding-bottom)
- .[classe-container] - padding orizzontale con pattern container standard
- [ALTRE CLASSI INTERNE] - gap, spacing interni

Valori standard sezioni:
- padding-top: --spacing-padding-lg → --spacing-padding-xl @768px

Pattern container standard:
.container {
  padding-left: max(var(--margin-safe-x), var(--spacing-padding-xs));
  padding-right: max(var(--margin-safe-x), var(--spacing-padding-xs));
}
@media (min-width: 640px) { padding-x: max(--margin-safe-x, --spacing-padding-sm) }
@media (min-width: 1024px) { padding-x: max(--margin-safe-x, --spacing-padding-md) }

Note:
- PRIMA di iniziare: leggi src/styles/SPACING-DECISIONS.md per capire regole e scelte precedenti
- DOPO aver finito: aggiorna src/styles/SPACING-DECISIONS.md con le nuove scelte
- Solo padding-top per le sezioni, mai padding-bottom
- Mobile-first approach con media queries
- Spacing piccoli (fino a 32px): Tailwind standard
- Spacing grandi (oltre 32px): variabili --spacing-*
```

---

## Changelog

- **2026-01-24**: Creazione documento + DemoReveal section + prompt template
- **2026-01-24**: OfficialPartner section + estrazione StatsGrid shared component
- **2026-01-24**: Nuova regola: solo padding-top per le sezioni. Pattern container standard con safe margins. Applicato a DemoReveal e OfficialPartner.
- **2026-01-24**: GrainyBgSection layer esterno: rimosso triplo padding-top, applicato standard `--spacing-padding-lg` → `--spacing-padding-xl`.
- **2026-01-24**: NeuralServices (desktop + mobile): aggiunto padding-top a `.grainy-bg-content`, rimosso dead code spacing inline, pulizia classi CSS inutilizzate.
- **2026-01-24**: InfinityPhilosophy: BrandMarquee full-bleed (escluso dal container padding), paragrafi con container pattern + max-w-content, rimosso padding-bottom.
- **2026-01-24**: CampaignShowcase: sub-section unita a InfinityPhilosophy (padding-top ridotto sm→md), padding-bottom (lg→xl) per respiro fondo card, slider full-bleed, header/stats con container pattern.
- **2026-01-24**: InfinityPhilosophy: BrandMarquee ora usa `px-(--margin-safe-x)` per safe margins laterali.
- **2026-01-24**: EngineTimeline: applicato design system spacing. Container pattern standard. Padding-bottom aggiunto (eccezione: sezione successiva ha struttura diversa).
- **2026-01-24**: ProjectsShowcase: rimosso padding-bottom da inner card, aggiunta classe `.projects-description` per spacing, CTA sostituita con CTASectionCard variant="soft".
- **2026-01-25**: Service Page: creato `service-page.css`, applicato design system a tutti i componenti (Hero, WhyBylt, Process, Details, CTA). Container pattern standard con safe margins.
