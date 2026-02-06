# Sistema di Padding - BYLT Media

Guida completa per la gestione dei padding orizzontali e verticali nel sito.

---

## Indice

1. [Variabili CSS](#variabili-css)
2. [Padding Orizzontali (px)](#padding-orizzontali-px)
3. [Padding Verticali (py)](#padding-verticali-py)
4. [Pattern Case Study](#pattern-case-study)
5. [Eccezioni](#eccezioni)
6. [Quick Reference](#quick-reference)

---

## Variabili CSS

### File: `src/styles/globals.css`

### Spacing Section (`--spacing-section-*`)
Spazio **TRA** sezioni (margin-top/bottom tra componenti):

| Size | Mobile | Desktop (768px+) | Uso |
|------|--------|------------------|-----|
| `xs` | 48px | 64px | Sezioni molto vicine |
| `sm` | 80px | 112px | Sezioni vicine |
| `md` | 96px | 128px | **DEFAULT** |
| `lg` | 128px | 160px | Sezioni spaziose |
| `xl` | 160px | 208px | Sezioni molto spaziose |
| `2xl` | 192px | 256px | Massimo spazio |

### Spacing Padding (`--spacing-padding-*`)
Spazio **DENTRO** sezioni (padding interno):

| Size | Mobile | Desktop (768px+) | Uso |
|------|--------|------------------|-----|
| `xs` | 24px | 32px | Gap piccoli |
| `sm` | 32px | 48px | Gap medi |
| `md` | 48px | 64px | **DEFAULT** |
| `lg` | 64px | 96px | Padding generosi |
| `xl` | 96px | 128px | Padding molto generosi |
| `2xl` | 128px | 160px | Massimo padding |

### Safety Margins (`--margin-safe-x`)
Margini minimi laterali per evitare contenuto troppo vicino ai bordi:

| Breakpoint | Valore |
|------------|--------|
| < 350px | 4px |
| 350px+ | 8px |
| 768px+ | 24px |
| 1440px+ | 32px |

### Container Padding (`--container-px`)
Padding orizzontale responsive per container (include già `max()` con safety margin):

| Breakpoint | Valore |
|------------|--------|
| default | `max(--margin-safe-x, 1rem)` |
| 640px+ | `max(--margin-safe-x, 1.5rem)` |
| 1024px+ | `max(--margin-safe-x, 2rem)` |

### Breakpoints

| Variable | Valore | Uso |
|----------|--------|-----|
| `--breakpoint-outer` | 2556px | Sfondi, shader, marquee |
| `--breakpoint-content` | 1440px | Contenuto principale |
| `--breakpoint-lg` | 1024px | Large screens |
| `--breakpoint-laptop` | 1152px | Custom laptop breakpoint |

---

## Padding Orizzontali (px)

### Regola Principale

```
px-4 sul <main> globale della pagina
```

Tutte le pagine devono avere `px-4` sul wrapper `<main>` per garantire:
- Bordi arrotondati visibili sugli shader
- Padding base consistente su tutta la pagina

### Classi Utility Container

```css
/* Container con max-width e padding responsive */
.container-content {
  max-width: var(--breakpoint-content);  /* 1440px */
  margin: 0 auto;
  padding-left: var(--container-px);
  padding-right: var(--container-px);
}

/* Solo padding, no max-width */
.container-padded {
  padding-left: var(--container-px);
  padding-right: var(--container-px);
}

/* Nessun padding - per elementi full-bleed */
.container-bleed {
  padding-left: 0;
  padding-right: 0;
}

/* Container per shader/sfondi */
.container-outer {
  max-width: var(--breakpoint-outer);  /* 2556px */
  margin: 0 auto;
}
```

### Struttura Tipo Pagina

```
┌─ <main className="px-4"> ──────────────────────────────┐
│                                                         │
│  ┌─ section-wrapper (shader background) ─────────────┐  │
│  │  ┌─ .container-content ─────────────────────────┐ │  │
│  │  │  Contenuto con max-width e padding extra     │ │  │
│  │  └──────────────────────────────────────────────┘ │  │
│  └───────────────────────────────────────────────────┘  │
│                                                         │
│  ┌─ marquee-wrapper ─────────────────────────────────┐  │
│  │  Full-width (eredita px-4 dal main)               │  │
│  └───────────────────────────────────────────────────┘  │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Quando Usare Cosa

| Classe | Quando Usare |
|--------|--------------|
| `px-4` sul `<main>` | SEMPRE - padding globale pagina |
| `.container-content` | Contenuto standard con max-width |
| `.container-padded` | Sezioni che hanno già un parent con max-width |
| `.container-bleed` | Mai usare, il contenuto eredita px-4 |

---

## Padding Verticali (py)

### Regole Fondamentali

#### REGOLA #1: Solo padding-top, MAI padding-bottom
```
Ogni sezione gestisce SOLO il suo padding-top.
La sezione successiva gestisce la distanza con il suo padding-top.
```

**Eccezione:** Sezioni con effetti speciali (sticky, reveal, 3D) possono avere padding-bottom.

#### REGOLA #2: Padding-top standard

```css
/* Mobile */
padding-top: var(--spacing-padding-lg);  /* 64px */

/* Desktop (768px+) */
padding-top: var(--spacing-padding-xl);  /* 128px */
```

Tailwind classes: `pt-padding-lg md:pt-padding-xl`

#### REGOLA #3: Margin-bottom per elementi interni

Usare `mb-*` per spaziare elementi DENTRO una sezione (titoli, header, gruppi).

```jsx
// OK - margin interno
<h2 className="mb-padding-md">Titolo</h2>

// NO - padding-bottom sulla sezione
<section className="pb-padding-lg">...</section>
```

### Pattern Padding Verticale

```
┌─────────────────────────────────────┐
│ pt-padding-lg md:pt-padding-xl      │  ← Sezione A gestisce il suo pt
│                                     │
│    ┌─ Header ────────────────────┐  │
│    │ mb-padding-md               │  │  ← Margin interno OK
│    └─────────────────────────────┘  │
│                                     │
│    ┌─ Content ───────────────────┐  │
│    │                             │  │
│    └─────────────────────────────┘  │
│                                     │
│ NESSUN padding-bottom              │  ← La sezione B sotto gestirà
└─────────────────────────────────────┘
┌─────────────────────────────────────┐
│ pt-padding-lg md:pt-padding-xl      │  ← Sezione B gestisce il suo pt
│ ...                                 │
└─────────────────────────────────────┘
```

---

## Pattern Case Study

### Struttura CaseStudyTemplate.jsx

```jsx
<main className="px-4">                    {/* Padding globale */}

  {/* HERO - dentro shader */}
  <div className="case-study-page-hero">
    <HeroSection />
  </div>

  {/* REVEAL SECTION - sticky effect */}
  <div className="case-study-reveal-section">  {/* pt + pb OK (sticky) */}
    <BeforeByltContent />
  </div>

  {/* CHALLENGE - padding gestito dal componente */}
  <section className="container-content">
    <TheChallenge />                        {/* pt-padding-lg md:pt-padding-xl */}
  </section>

  {/* SHADER CON MARQUEE + PROCESS + SOLUTION */}
  <div className="case-study-shader-background">

    <div className="case-study-marquee-wrapper">  {/* pt-padding-lg md:pt-padding-xl */}
      <BrandMarquee />
    </div>

    <div className="container-content case-study-process-solution-wrapper">
      <ProcessGrid />                       {/* NESSUN pb */}
      <OurSolution />                       {/* pt + pb (chiude shader) */}
    </div>

  </div>

  {/* REVEAL SECTION LOWER - sticky effect */}
  <div className="case-study-reveal-section-lower">  {/* pt + pb OK (sticky) */}
    <AfterByltContent />
  </div>

  {/* RESULTS - padding gestito dal componente */}
  <section className="container-content">
    <ResultsDashboard />                    {/* pt-padding-lg md:pt-padding-xl */}
    <AfterByltChart />
  </section>

</main>
```

### Padding Componenti Case Study

| Componente | Padding-top | Padding-bottom | Note |
|------------|-------------|----------------|------|
| TheChallenge | `pt-padding-lg md:pt-padding-xl` | NO | Standard |
| ProcessGrid | NO (wrapper ha pt) | NO | Dentro wrapper |
| OurSolution | `pt-padding-lg md:pt-padding-xl` | `pb-padding-lg md:pb-padding-xl` | Chiude lo shader |
| ResultsDashboard | `pt-padding-lg md:pt-padding-xl` | NO | Standard |
| AfterByltChart | `pt-padding-lg md:pt-padding-xl` | NO | Standard |

### Sezioni con Sticky/Reveal Effect

Le sezioni con effetti speciali (sticky reveal) DEVONO avere padding-bottom:

```css
.case-study-reveal-section,
.case-study-reveal-section-lower {
  padding-top: var(--spacing-padding-lg);
  padding-bottom: var(--spacing-padding-lg);
}

@media (min-width: 768px) {
  .case-study-reveal-section,
  .case-study-reveal-section-lower {
    padding-top: var(--spacing-padding-xl);
    padding-bottom: var(--spacing-padding-xl);
  }
}
```

---

## Eccezioni

### 1. Sezioni Sticky/Reveal
- POSSONO avere padding-bottom
- Necessario per l'effetto sticky

### 2. Ultima Sezione dentro Shader
- DEVE avere padding-bottom
- Necessario per chiudere visivamente lo shader
- Es: `OurSolution.jsx` dentro lo shader dei case study

### 3. Marquee/Brand Sections
- Ereditano `px-4` dal main
- Se devono essere full-bleed, il wrapper gestisce già il layout
- NON usare margini negativi

### 4. Hero Sections
- Padding gestito da classi CSS dedicate
- Spesso hanno padding diversi per adattarsi al design

---

## Quick Reference

### Padding Orizzontali

```jsx
// Pagina
<main className="px-4">

// Contenuto con max-width
<div className="container-content">

// Solo padding (già dentro max-width)
<div className="container-padded">
```

### Padding Verticali

```jsx
// Sezione standard
<section className="pt-padding-lg md:pt-padding-xl">

// Header interno
<h2 className="mb-padding-md">

// Ultima sezione in shader
<div className="pt-padding-lg md:pt-padding-xl pb-padding-lg md:pb-padding-xl">

// Sezione sticky/reveal
<div className="pt-padding-lg pb-padding-lg md:pt-padding-xl md:pb-padding-xl">
```

### Classi CSS Disponibili

| Classe | Descrizione |
|--------|-------------|
| `.container-content` | max-width + padding responsive |
| `.container-padded` | solo padding responsive |
| `.container-bleed` | zero padding |
| `.container-outer` | max-width per sfondi/shader |

### Variabili CSS

```css
/* Padding orizzontale responsive */
var(--container-px)

/* Padding verticali */
var(--spacing-padding-xs)  /* 24px / 32px */
var(--spacing-padding-sm)  /* 32px / 48px */
var(--spacing-padding-md)  /* 48px / 64px */
var(--spacing-padding-lg)  /* 64px / 96px */
var(--spacing-padding-xl)  /* 96px / 128px */
var(--spacing-padding-2xl) /* 128px / 160px */

/* Safety margin */
var(--margin-safe-x)
```

---

## Checklist Verifica

Quando crei o modifichi una sezione:

- [ ] Il `<main>` ha `px-4`?
- [ ] La sezione ha solo `padding-top` (no `padding-bottom`)?
- [ ] Usa le variabili di spacing corrette?
- [ ] Il contenuto usa `.container-content` per max-width?
- [ ] I margin interni usano `mb-*` invece di `pb-*`?
- [ ] Se è l'ultima sezione in uno shader, ha `padding-bottom`?
- [ ] Se è sticky/reveal, ha sia `padding-top` che `padding-bottom`?

---

## File di Riferimento

- `src/styles/globals.css` - Variabili e classi utility (linee 179-275)
- `src/styles/sections/case-studies.css` - Classi specifiche case study
- `src/styles/sections/about.css` - Pattern di riferimento
- `src/styles/sections/contact.css` - Pattern di riferimento
- `REFACTORING_GUIDE.md` - Guida generale refactoring
