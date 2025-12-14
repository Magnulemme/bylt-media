# BYLT Media Design System

Sistema di design condiviso per garantire consistenza visiva in tutto il sito.

## Classi Custom Disponibili

### 🔘 Buttons

#### `.btn-primary`
Bottone principale con gradiente cyan animato.

**Uso:**
```jsx
<a href="/free-audit" className="btn-primary">
  Get Free Audit
</a>
```

**Stile:**
- Gradiente: cyan → blue → cyan (animato)
- Altezza: 56px (h-14)
- Padding: 32px orizzontale
- Hover: lift + glow shadow cyan

---

#### `.btn-secondary`
Bottone secondario con effetto glass.

**Uso:**
```jsx
<a href="#services" className="btn-secondary group">
  <span>Explore Services</span>
  <span className="text-cyan-400 transition-transform duration-300 group-hover:translate-x-1">→</span>
</a>
```

**Note:** Aggiungi `group` se hai bisogno di animazioni sui children.

**Stile:**
- Border: white/20 con hover white/40
- Background: glass effect (white/5)
- Backdrop blur
- Hover: lift

---

### 📦 Cards

#### `.formula-card`
Card con glass effect e shadow offset.

**Uso:**
```jsx
<fieldset className="formula-card">
  <legend className="px-2 text-base text-white font-semibold tracking-wide">
    The Formula
  </legend>
  <p className="text-base text-gray-400 leading-relaxed">
    Your content here...
  </p>
</fieldset>
```

**Stile:**
- Border: 2px white/30
- Background: white/5 + backdrop blur
- Shadow: 8px offset cyan
- Padding: 24px
- Border radius: lg

---

### 🎨 Text & Backgrounds

#### `.text-gradient`
Testo con gradiente animato.

**Uso:**
```jsx
<span className="text-gradient">Digital Futures</span>
```

**Gradiente:** cyan-400 → blue-500 → purple-600

---

#### `.bg-hero`
Background gradiente per hero section.

**Uso:**
```jsx
<div className="bg-hero">
  Hero content...
</div>
```

**Gradiente:** #0f172a → #1e1b4b → #312e81 (diagonale 135deg)

---

## 📏 Regola d'Oro

**Se usi 5+ classi Tailwind insieme, crea una classe custom.**

Questo mantiene il codice leggibile e facilita la manutenzione.

---

## 🔄 Come Estendere

1. Identifica pattern ripetuti (5+ classi)
2. Aggiungi la classe in [/src/styles/globals.css](../styles/globals.css) dentro `@layer components`
3. Usa `@apply` per le utility Tailwind
4. Documenta qui con esempi

### Esempio:

```css
@layer components {
  .my-new-class {
    @apply flex items-center justify-center;
    @apply bg-gradient-to-r from-cyan-500 to-blue-500;
    @apply rounded-lg p-4;
  }
}
```

---

## 📂 File Struttura

```
/src
├── /styles
│   └── globals.css          # Classi custom (btn-primary, formula-card, etc.)
└── /design-system
    └── README.md            # Questa documentazione
```

---

### 🏗️ Layout & Containers

#### `.hero-section`
Container principale per hero section.

**Uso:**
```jsx
<section className="hero-section">
  Hero content...
</section>
```

**Stile:**
- Full height (h-screen)
- Centered content
- Padding: 16px + 96px top
- Overflow hidden

---

#### `.container-centered`
Container centrato con max-width.

**Uso:**
```jsx
<div className="container-centered">
  Your content...
</div>
```

**Stile:**
- Max width: 7xl (1280px)
- Centrato con margin auto
- Padding responsive: 16px mobile, 32px desktop
- Z-index: 20

---

#### `.gradient-overlay`
Overlay con gradienti radial per depth.

**Uso:**
```jsx
<div className="gradient-overlay"></div>
```

**Stile:**
- Gradienti radial blu e viola
- Absolute positioning
- Pointer events none
- Ottimizzato con `contain: paint`

---

#### `.hero-inner`
Container interno hero con bordi arrotondati.

**Uso:**
```jsx
<div className="hero-inner bg-hero">
  Hero content...
</div>
```

**Stile:**
- Full height/width relative
- Rounded 2xl
- Flexbox centered
- Overflow hidden

---

#### `.hero-grid`
Layout grid a 2 colonne per hero.

**Uso:**
```jsx
<div className="hero-grid">
  <div>Column 1</div>
  <div>Column 2</div>
</div>
```

**Stile:**
- Grid 1 colonna mobile, 2 su desktop
- Gap: 48px
- Items centered

---

#### `.hero-content`
Contenitore per contenuto hero.

**Uso:**
```jsx
<div className="hero-content">
  <h1>Title</h1>
  <p>Content</p>
</div>
```

**Stile:**
- Text white
- Spacing verticale: 32px (space-y-8)

---

#### `.hero-title`
Titolo principale hero con sizing responsive.

**Uso:**
```jsx
<h1 className="hero-title font-inter">
  We Build Digital Futures
</h1>
```

**Stile:**
- Mobile: 48px (text-5xl)
- Tablet: 72px (text-7xl)
- Desktop: 96px (text-8xl)
- Font weight: bold

**Note:** Aggiungi `font-inter` manualmente se necessario.

---

#### `.animated-text-container`
Container per testo animato con typing effect.

**Uso:**
```jsx
<div className="animated-text-container">
  <span className="text-gradient">
    {displayText}
    <span className="typing-cursor"></span>
  </span>
</div>
```

**Stile:**
- Min height responsive (80px → 120px)
- Whitespace nowrap
- Text italic
- Line height: 1.2

---

### ✨ Effects & Animations

#### `.typing-cursor`
Cursore animato per typing effect.

**Uso:**
```jsx
<span className="typing-cursor"></span>
```

**Stile:**
- Width: 4px
- Animazione blink
- Colore: blue-400

---

### 🎨 Logo & Branding

#### `.logo-gradient-bylt`
Gradiente per testo "BYLT" nel logo.

**Uso:**
```jsx
<span className="logo-gradient-bylt">BYLT</span>
```

**Gradiente:** #B8FFFA → #B8FFB8 → #B8FFFA

---

#### `.logo-gradient-media`
Gradiente per testo "MEDIA" nel logo.

**Uso:**
```jsx
<span className="logo-gradient-media">MEDIA</span>
```

**Gradiente:** #B8FFB8 → #B8FFFA → #B8FFB8

---

### 📱 Navigation Links

#### `.mobile-menu-link`
Link principali menu mobile.

**Uso:**
```jsx
<Link href="/about" className="mobile-menu-link">
  About
</Link>
```

**Stile:**
- Padding: 12px
- Text: gray-200 → cyan hover
- Border radius: md

---

#### `.mobile-submenu-link`
Link submenu mobile.

**Uso:**
```jsx
<Link href="/seo" className="mobile-submenu-link">
  <span className="text-cyan-400 mr-2">→</span>
  SEO Services
</Link>
```

**Stile:**
- Font size: sm
- Flex layout
- Cyan hover

---

## ✅ Checklist Refactoring

Quando refactori un componente:

- [ ] Cerca classi ripetute 5+ volte
- [ ] Sostituisci con classi custom esistenti o creane di nuove
- [ ] Verifica che gli stili inline possano essere eliminati
- [ ] Testa hover/animazioni
- [ ] Aggiorna questa documentazione se crei nuove classi

---

**Versione:** 1.0
**Ultimo aggiornamento:** 2025-12-12
