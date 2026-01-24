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
              ├── NeuralServices / NeuralServicesMobile [TODO spacing interno]
              ├── InfinityPhilosophy [TODO spacing interno]
              └── CampaignShowcase [TODO spacing interno]
```

#### Scelte applicate

| Elemento | Proprietà | Mobile | Desktop | Motivazione |
|----------|-----------|--------|---------|-------------|
| `.grainy-bg-section` | padding-top | `--spacing-padding-lg` (64px) | `--spacing-padding-xl` (128px) @768px | Standard sezione. Era `--spacing-padding-2xl`, ridotto per coerenza. |
| `.grainy-bg-section` | padding-x | `px-4` (16px) | `px-4` (16px) | Inset fisso per mostrare bordi arrotondati della card. Spacing piccolo → Tailwind. |
| `.grainy-bg-card` | padding-top | rimosso | rimosso | Non è una sezione, non serve padding-top. Era duplicato con la sezione. |
| `.grainy-bg-content` | padding-top | rimosso (`pt-16/24/32`) | rimosso | Era triplo padding accumulato. I componenti interni gestiranno il proprio spacing. |
| `.grainy-bg-content > children` | padding-x | container pattern standard | container pattern standard | Già presente, mantenuto. Pattern xs → sm → md con safe margins. |

#### Note
- Rimosso triplo padding-top accumulato (sezione + card + content inline) → ora solo sezione
- `px-4` sulla sezione mantenuto: è l'inset visivo della card con `rounded-2xl`, non container padding
- I componenti interni (NeuralServices, InfinityPhilosophy, CampaignShowcase) avranno il proprio spacing applicato separatamente
- Il container pattern per i figli di `.grainy-bg-content` era già corretto (con esclusione per `.services-container-mobile` e `.performance-section`)

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
