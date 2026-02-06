# 📐 Guida al Refactoring: Sistema di Spacing Centralizzato

## 🎯 Obiettivo
Refactoring dei componenti **NeuralServices**, **InfinityPhilosophy** e **PerformanceMetrics** per utilizzare il sistema di spacing centralizzato con CSS variables e custom classes, migliorando leggibilità e manutenibilità.

---

## 🔥 REGOLA BASE DEL SITO - QUICK REFERENCE

**OGNI SEZIONE STANDARD USA QUESTI VALORI DI PADDING-TOP:**

| Device | Variable | Valore |
|--------|----------|--------|
| 📱 Mobile | `--spacing-padding-lg` | **64px** |
| 💻 Desktop | `--spacing-padding-2xl` | **160px** |

**Esempio implementazione:**
```css
.mia-sezione {
  padding-top: var(--spacing-padding-lg);  /* 64px mobile */
}

@media (min-width: 768px) {
  .mia-sezione {
    padding-top: var(--spacing-padding-2xl);  /* 160px desktop */
  }
}
```

**✅ Usare SEMPRE per:** Services, Features, Philosophy, Metrics, About, etc.
**❌ NON usare per:** Hero sections (usa `2xl`), sezioni con effetti speciali

---

## 📦 Sistema di Spacing Disponibile

### 1. Section Spacing (`--spacing-section-*`)
**Uso:** Spazio TRA sezioni diverse

| Size | Mobile | Desktop | Uso |
|------|--------|---------|-----|
| `xs` | 48px | 64px | Sezioni molto vicine |
| `sm` | 80px | 112px | Sezioni vicine |
| `md` | 96px | 128px | **DEFAULT** |
| `lg` | 128px | 160px | Sezioni spaziose |
| `xl` | 160px | 208px | Sezioni molto spaziose |
| `2xl` | 192px | 256px | Massimo spazio |

### 2. Padding Spacing (`--spacing-padding-*`)
**Uso:** Spazio DENTRO sezioni (padding interno, gap tra elementi)

| Size | Mobile | Desktop | Uso |
|------|--------|---------|-----|
| `xs` | 24px | 32px | Gap piccoli |
| `sm` | 32px | 48px | Gap medi |
| `md` | 48px | 64px | **DEFAULT** |
| `lg` | 64px | 96px | Padding generosi |
| `xl` | 96px | 128px | Padding molto generosi |
| `2xl` | 128px | 160px | Massimo padding |

### 3. Safety Margins (`--margin-safe-x`)
**Uso:** Margini minimi laterali per garantire spazio dai bordi

| Breakpoint | Valore | Uso |
|------------|--------|-----|
| Mobile | 16px | Margine minimo base |
| Tablet (768px) | 24px | Margine medio |
| Desktop (1440px+) | 32px | Margine ampio |

---

## ⚠️ Regole Fondamentali

### 🔥 REGOLA #1: Padding Standard per TUTTE le Sezioni di Base

**QUESTA È LA BASE DEL SISTEMA DI SPACING DEL SITO**

Ogni sezione di contenuto standard deve usare **SEMPRE** questi valori di padding-top:

```css
/* 🎯 PADDING-TOP STANDARD - UTILIZZARE SEMPRE */
padding-top: var(--spacing-padding-lg);  /* Mobile: 64px */

@media (min-width: 768px) {
  padding-top: var(--spacing-padding-2xl);  /* Tablet/Desktop: 160px */
}
```

**✅ Quando usare questi valori:**
- Sezioni di contenuto standard (Services, Philosophy, Features, etc.)
- Sezioni dentro container parent che hanno già un padding esterno
- Tutte le sezioni NON-HERO

**❌ Quando NON usare questi valori:**
- Sezioni HERO (usare `2xl` per maggiore impatto)
- Sezioni con effetti speciali (sticky, reveal, 3D cards)
- Prima sezione del sito (gestita dal layout)

**📌 Esempi Implementati:**
- `InfinityPhilosophy`: lg mobile → 2xl desktop ✅
- `PerformanceMetrics`: lg mobile → 2xl desktop ✅
- `NeuralServices`: lg mobile → 2xl desktop ✅

---

### Regola d'Oro: Padding Verticale
**Ogni sezione gestisce SOLO il suo `padding-top`**

❌ **NON aggiungere** `padding-bottom` alle sezioni
✅ La sezione successiva gestisce la distanza con il suo `padding-top`

**Eccezione:** Sezioni con effetti speciali (sticky positioning, reveal effects, card 3D) possono avere anche `padding-bottom`

### Default Spacing Raccomandati

```css
/* ========================================
   PADDING-TOP SEZIONI (STANDARD)
   ======================================== */
/* Sezioni di contenuto standard */
padding-top: var(--spacing-padding-lg);    /* Mobile: 64px */
padding-top: var(--spacing-padding-2xl);   /* Desktop: 160px */

/* Sezioni HERO o molto importanti */
padding-top: var(--spacing-padding-2xl);   /* Mobile: 128px, Desktop: 160px */

/* ========================================
   SPACING INTERNO
   ======================================== */
/* Gap standard tra elementi */
gap: var(--spacing-padding-xs);            /* Mobile: 24px, Desktop: 32px */
gap: var(--spacing-padding-sm);            /* Mobile: 32px, Desktop: 48px */
gap: var(--spacing-padding-md);            /* Mobile: 48px, Desktop: 64px */

/* Elementi che richiedono più respiro */
gap: var(--spacing-padding-lg);            /* Mobile: 64px, Desktop: 96px */
```

---

## 📋 Checklist Implementazione

### 1. ✅ Analisi Componente

- [ ] Leggi il componente corrente
- [ ] Identifica tutti i padding hardcoded (`py-16`, `pt-24`, `gap-8`, etc.)
- [ ] Mappa ogni spacing: è TRA sezioni o DENTRO la sezione?
- [ ] Verifica se usa `grid` o `flex` per layout
- [ ] Identifica elementi ripetuti che possono diventare classi

### 2. ✅ Creazione Custom Classes

Crea classi semantiche in `globals.css` nella sezione `/* [NOME] COMPONENTS */`:

```css
/* ====================================
   NOME SECTION COMPONENTS
   ==================================== */

/* Nome Section - Container principale */
.nome-section {
  @apply relative overflow-hidden;
  /* Gestisci SOLO padding-top se necessario */
  padding-top: var(--spacing-padding-md);
}

@media (min-width: 768px) {
  .nome-section {
    padding-top: var(--spacing-padding-lg);
  }
}

/* Nome Container - Wrapper con padding orizzontale e safety margins */
.nome-container {
  @apply relative z-10;
  max-width: var(--breakpoint-content);
  margin-left: auto;
  margin-right: auto;
  padding-left: max(var(--margin-safe-x), var(--spacing-padding-xs));
  padding-right: max(var(--margin-safe-x), var(--spacing-padding-xs));
}

@media (min-width: 640px) {
  .nome-container {
    padding-left: max(var(--margin-safe-x), var(--spacing-padding-sm));
    padding-right: max(var(--margin-safe-x), var(--spacing-padding-sm));
  }
}

@media (min-width: 1024px) {
  .nome-container {
    padding-left: max(var(--margin-safe-x), var(--spacing-padding-md));
    padding-right: max(var(--margin-safe-x), var(--spacing-padding-md));
  }
}
```

### 3. ✅ Layout: Grid vs Flex

**Usa FLEX quando:**
- Vuoi contenuto centrato rispetto alla pagina
- Numero variabile di elementi
- Wrapping automatico necessario

```css
.nome-flex-container {
  @apply flex flex-col md:flex-row justify-center items-center max-w-5xl mx-auto;
  gap: var(--spacing-padding-md);
}

@media (min-width: 768px) {
  .nome-flex-container {
    gap: var(--spacing-padding-lg);
  }
}
```

**Usa GRID quando:**
- Layout rigido a colonne/righe
- Allineamento preciso richiesto
- Elementi devono occupare spazio uguale

```css
.nome-grid {
  @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3;
  gap: var(--spacing-padding-sm);
}

@media (min-width: 768px) {
  .nome-grid {
    gap: var(--spacing-padding-md);
  }
}
```

### 4. ✅ Refactoring Componente

**Rimuovi:**
- Classi Tailwind hardcoded: `px-4 sm:px-6 lg:px-8`
- Padding fissi: `py-16 md:py-24`
- Gap fissi: `gap-8 md:gap-12`
- Valori fissi in pixel negli stili inline

**Sostituisci con:**
- Custom classes semantiche
- CSS variables dal sistema centralizzato

**Esempio:**

```jsx
// ❌ PRIMA
<section className="py-16 md:py-24 bg-[#020617]">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">

// ✅ DOPO
<section className="nome-section">
  <div className="nome-container">
    <div className="nome-grid">
```

### 5. ✅ Gestione Spacing Interno

**Gap tra elementi (preferito):**

```css
.nome-card {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-padding-xs);
}
```

**Margin (solo se necessario):**
- Usa utilities Tailwind: `mb-padding-xs`, `mt-padding-sm`
- Documenta il perché serve margin invece di gap

### 6. ✅ Safety Margins

**Quando usare `max()`:**

```css
/* Per elementi che hanno già padding proprio */
padding-left: max(var(--margin-safe-x), var(--spacing-padding-xs));
padding-right: max(var(--margin-safe-x), var(--spacing-padding-xs));
```

**Quando usare solo `var(--margin-safe-x)`:**

```css
/* Per elementi che servono SOLO come margine di sicurezza */
padding-left: var(--margin-safe-x);
padding-right: var(--margin-safe-x);
```

**Quando ridurre con `calc()`:**

```css
/* Quando hai padding esterno che somma già spessore */
padding-left: calc(var(--margin-safe-x) - 4px);
padding-right: calc(var(--margin-safe-x) - 4px);
```

### 7. ✅ Ottimizzazioni Finali

- [ ] Converti `<img>` in `<Image>` di Next.js (se non già fatto)
- [ ] Crea classi `.nome-logo` se le immagini si ripetono
- [ ] Rimuovi import inutilizzati
- [ ] Verifica responsive: mobile (375px), tablet (768px), desktop (1440px)

---

## 📚 Esempio Completo: DemoReveal

### File: `src/components/home/DemoReveal.js`

```jsx
export default function DemoReveal() {
  return (
    <section className="demo-reveal-section">
      <div className="demo-reveal-container">
        <ScrollRevealText text="DEMO TEXT" className="scroll-reveal-text-wrapper" />

        <div className="demo-reveal-flex-container">
          <div className="demo-card">
            <Image src="/icon.png" alt="Icon" className="demo-logo" />
            <h3>Title</h3>
            <p>Description</p>
          </div>
        </div>
      </div>
    </section>
  );
}
```

### File: `src/styles/globals.css`

```css
/* DEMO REVEAL COMPONENTS */

.demo-reveal-section {
  @apply relative overflow-hidden;
  position: sticky;
  bottom: 0;
  background: #020617;
  z-index: 0;
  padding-top: var(--spacing-padding-lg);
  padding-bottom: var(--spacing-padding-lg);
}

@media (min-width: 768px) {
  .demo-reveal-section {
    padding-top: var(--spacing-padding-2xl);
    padding-bottom: var(--spacing-padding-2xl);
  }
}

.demo-reveal-container {
  @apply relative z-10 mx-auto;
  max-width: var(--breakpoint-content);
  padding-left: var(--spacing-padding-xs);
  padding-right: var(--spacing-padding-xs);
}

@media (min-width: 640px) {
  .demo-reveal-container {
    padding-left: var(--spacing-padding-sm);
    padding-right: var(--spacing-padding-sm);
  }
}

@media (min-width: 1024px) {
  .demo-reveal-container {
    padding-left: var(--spacing-padding-md);
    padding-right: var(--spacing-padding-md);
  }
}

.demo-reveal-flex-container {
  @apply flex flex-col md:flex-row justify-center items-center max-w-5xl mx-auto;
  gap: var(--spacing-padding-md);
}

@media (min-width: 768px) {
  .demo-reveal-flex-container {
    gap: var(--spacing-padding-lg);
  }
}

@media (min-width: 1024px) {
  .demo-reveal-flex-container {
    gap: var(--spacing-padding-xl);
  }
}

.demo-card {
  @apply flex flex-col items-center text-center;
  gap: var(--spacing-padding-xs);
}

@media (min-width: 768px) {
  .demo-card {
    gap: var(--spacing-padding-sm);
  }
}
```

---

## 🎯 Componenti da Refactorare

### 1. NeuralServices
- [ ] Analisi spacing attuale
- [ ] Creazione classi: `.neural-services-section`, `.neural-services-container`, `.services-grid`, `.service-card`
- [ ] Refactoring componente
- [ ] Test responsive

### 2. InfinityPhilosophy
- [ ] Analisi spacing attuale
- [ ] Creazione classi: `.infinity-section`, `.infinity-container`, `.infinity-content`
- [ ] Refactoring componente
- [ ] Test responsive

### 3. PerformanceMetrics
- [ ] Analisi spacing attuale
- [ ] Creazione classi: `.performance-section`, `.performance-container`, `.metrics-grid`, `.metric-card`
- [ ] Refactoring componente
- [ ] Test responsive

---

## 📝 Note Tecniche

### Tailwind v4.1.18
- Usa `@theme` per registrare utilities
- No `@apply` per custom utilities - Usa variabili dirette
- `--breakpoint-content: 1440px` per max-width container
- Mobile-first: Valori base per mobile, override per desktop

### Posizionamento Classi in globals.css

Segui questo ordine:
1. Demo Reveal Section Components
2. **Official Partner Section Components** ← già fatto
3. **Grainy BG Section Components** ← già fatto
4. Neural Services Components ← da creare
5. Infinity Philosophy Components ← da creare
6. Performance Metrics Components ← da creare
7. Utility Classes

---

## ✅ Commit Message Template

```
refactor: apply centralized spacing system to [ComponentName]

- Refactored [ComponentName] with custom CSS classes
- Created .[component]-section, .[component]-container, .[component]-grid classes
- Replaced hardcoded Tailwind spacing with CSS variables
- Applied responsive spacing: --spacing-padding-xs/sm/md/lg/xl/2xl
- Implemented safety margins with max() for padding
- Improved maintainability and consistency

Spacing values:
- Mobile: [value]px padding
- Desktop: [value]px padding
- Safety margins: 16px (mobile) → 24px (tablet) → 32px (desktop)

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
```

---

## 🚀 Prossimi Passi

1. Inizia con **NeuralServices** (componente più semplice)
2. Continua con **InfinityPhilosophy**
3. Concludi con **PerformanceMetrics**
4. Testa tutti i componenti su mobile/tablet/desktop
5. Committa e pusha le modifiche

---

**Buon refactoring! 🎨**
