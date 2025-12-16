# Guida ai Componenti Header

Questa guida spiega come utilizzare i componenti header riutilizzabili per le sezioni del sito.

## Componenti Disponibili

### 1. SectionHeader
Piccolo header con tag (stile mono font).

**Quando usarlo:** Per etichette di sezione, tag categorici, o piccoli titoli sopra contenuti principali.

**Props:**
- `title` (string, required): Il testo principale
- `tag` (string, optional): Testo nel tag tra parentesi quadre
- `align` ('left' | 'center' | 'right', default: 'left'): Allineamento
- `className` (string): Classi CSS aggiuntive
- `animate` (boolean, default: true): Abilita animazione d'entrata

**Esempio:**
```jsx
<SectionHeader
  title="Our Services"
  tag="Performance"
  align="center"
/>
// Output: Our Services [Performance]
```

---

### 2. SectionTitle
Titolo principale con sottotitolo e varie animazioni.

**Quando usarlo:** Per titoli di sezione grandi con descrizioni.

**Props:**
- `title` (string, required): Titolo principale
- `subtitle` (string, optional): Sottotitolo/descrizione
- `align` ('left' | 'center' | 'right', default: 'center'): Allineamento
- `size` ('sm' | 'md' | 'lg' | 'xl', default: 'lg'): Dimensione testo
- `variant` ('blur' | 'scroll-reveal' | 'fade' | 'none', default: 'blur'): Tipo animazione
- `delay` (number, default: 0): Ritardo animazione in secondi
- `titleClassName`, `subtitleClassName`, `containerClassName`: Classi custom
- `scrollOffset` (array): Offset scroll per variante 'scroll-reveal'

**Varianti Animazione:**
- **blur**: Fade-in con blur-to-focus (elegante, moderno)
- **fade**: Semplice fade-in con slide-up (classico)
- **none**: Nessuna animazione

**Note:** La variante scroll-reveal (word-by-word) non è disponibile in SectionTitle per evitare problemi di hydration. Usa invece il componente `ScrollRevealText` personalizzato presente in EngineTimeline.js, OfficialPartnerSection.js, e NeuralContact.js.

**Esempi:**
```jsx
// Blur variant (default)
<SectionTitle
  title="A synergistic approach to digital dominance"
  subtitle="Each service is a component of a greater strategy"
  variant="blur"
/>

// Fade variant
<SectionTitle
  title="Our proven process ensures clarity and results"
  subtitle="Every stage delivers measurable impact"
  variant="fade"
/>

// For scroll-reveal, use ScrollRevealText component (see EngineTimeline.js)

// Simple fade
<SectionTitle
  title="Real Results from Real Partners"
  subtitle="See why leading brands trust us"
  variant="fade"
  align="left"
  size="xl"
/>

// Small title, no animation
<SectionTitle
  title="Latest Updates"
  variant="none"
  size="sm"
/>
```

---

### 3. SectionIntro
Componente completo che combina tag + title + subtitle.

**Quando usarlo:** Per intro complete di sezione con tutti gli elementi (tag, titolo, descrizione).

**Props:**
- `tag` (string, optional): Testo tag (es. "Services")
- `tagLabel` (string, optional): Label nel tag (es. "Performance")
- `title` (string, required): Titolo principale
- `subtitle` (string, optional): Sottotitolo
- `align` ('left' | 'center' | 'right', default: 'center'): Allineamento
- `maxWidth` ('sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '5xl' | '7xl' | 'full', default: '2xl'): Larghezza massima
- `size` ('sm' | 'md' | 'lg' | 'xl', default: 'lg'): Dimensione titolo
- `variant` ('blur' | 'scroll-reveal' | 'fade' | 'none', default: 'blur'): Animazione
- `spacing` ('sm' | 'md' | 'lg' | 'xl', default: 'lg'): Margine inferiore
- `className` (string): Classi aggiuntive
- `animateTag` (boolean, default: true): Anima il tag

**Esempi:**
```jsx
// Intro completa con tag
<SectionIntro
  tag="Services"
  tagLabel="What We Do"
  title="A synergistic approach to digital dominance"
  subtitle="Each service is a component of a greater strategy, designed to deliver comprehensive results"
  variant="blur"
  maxWidth="5xl"
/>

// Intro senza tag, allineamento a sinistra
<SectionIntro
  title="Real Results from Real Partners"
  subtitle="See why leading brands trust us to drive their growth"
  align="left"
  maxWidth="3xl"
  variant="fade"
  spacing="md"
/>

// Intro minimalista
<SectionIntro
  title="Our Process"
  subtitle="Every stage designed for impact"
  size="md"
  maxWidth="lg"
  spacing="sm"
/>
```

---

## Esempi di Migrazione

### Prima (NeuralServices)
```jsx
<div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
  <motion.h3
    className="text-2xl md:text-4xl font-bold font-inter text-center leading-tight text-white mb-6"
    initial={{ opacity: 0, filter: "blur(10px)" }}
    whileInView={{ opacity: 1, filter: "blur(0px)" }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, ease: "easeOut" }}
  >
    A synergistic approach to digital dominance
  </motion.h3>
  <motion.p
    className="text-gray-400 text-lg max-w-2xl mx-auto text-center"
    initial={{ opacity: 0, filter: "blur(10px)" }}
    whileInView={{ opacity: 1, filter: "blur(0px)" }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
  >
    Each service is a component of a greater strategy
  </motion.p>
</div>
```

### Dopo (Con SectionIntro)
```jsx
<SectionIntro
  title="A synergistic approach to digital dominance"
  subtitle="Each service is a component of a greater strategy, designed to deliver comprehensive and exponential results"
  variant="blur"
  maxWidth="5xl"
/>
```

---

### Prima (SuccessStories)
```jsx
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
  <div className="max-w-3xl">
    <motion.h2
      className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight"
      initial={{ opacity: 0, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, filter: "blur(0px)" }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      Real Results from Real Partners
    </motion.h2>
    <motion.p
      className="text-lg md:text-xl text-gray-400 leading-relaxed"
      initial={{ opacity: 0, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, filter: "blur(0px)" }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
    >
      See why leading brands trust us
    </motion.p>
  </div>
</div>
```

### Dopo (Con SectionIntro)
```jsx
<SectionIntro
  title="Real Results from Real Partners"
  subtitle="See why leading brands trust us to drive their growth. Ready to join them?"
  align="left"
  maxWidth="3xl"
  size="xl"
  variant="blur"
/>
```

---

### Prima (EngineTimeline - Scroll Reveal)
```jsx
<ScrollRevealText
  text="Our proven process ensures clarity, efficiency, and exceptional results"
  className="text-2xl md:text-4xl font-bold font-inter text-center leading-tight text-white mb-6"
/>
<motion.p
  className="text-gray-400 text-lg max-w-2xl mx-auto text-center"
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
>
  Every stage is designed to deliver measurable impact
</motion.p>
```

### Dopo (Con SectionTitle)
```jsx
<SectionTitle
  title="Our proven process ensures clarity, efficiency, and exceptional results"
  subtitle="Every stage is designed to deliver measurable impact, from strategy to scale"
  variant="scroll-reveal"
/>
```

---

## Linee Guida d'Uso

### Quando usare ogni componente:

1. **SectionHeader**: Tag/etichette piccole, navigazione visuale
2. **SectionTitle**: Titoli di sezione standalone o quando vuoi più controllo
3. **SectionIntro**: Intro complete - soluzione all-in-one più semplice da usare

### Scelta della variante di animazione:

- **blur**: Ottimo per sezioni hero, intro impattanti (default consigliato)
- **fade**: Classico e performante, ottimo per mobile e sezioni secondarie
- **none**: Quando non serve animazione o per prestazioni
- **scroll-reveal**: Non disponibile in SectionTitle - usa ScrollRevealText nei tuoi file per evitare problemi di hydration

### Scelta della dimensione:

- **sm**: Footer, sidebar, elementi secondari
- **md**: Sezioni intermedie
- **lg**: Sezioni principali (default)
- **xl**: Hero, landing, elementi di massimo impatto

### Scelta dell'allineamento:

- **center**: Default, ottimo per la maggior parte dei casi
- **left**: Blog, articoli, sezioni narrative
- **right**: Design asimmetrico, elementi decorativi

---

## Best Practices

1. **Consistenza**: Usa lo stesso variant per sezioni simili
2. **Gerarchia**: Varia le dimensioni (xl → lg → md) per guidare l'utente
3. **Performance**: Usa variant='none' su mobile se necessario
4. **Accessibilità**: I componenti usano già tag semantici corretti (h2, h3, p)
5. **Spacing**: Usa maxWidth per controllare la leggibilità (max-w-2xl ottimale per testo)

---

## Riassunto Rapido

```jsx
// Minimo
<SectionTitle title="My Title" />

// Standard
<SectionIntro
  title="Section Title"
  subtitle="Description here"
/>

// Completo
<SectionIntro
  tag="Category"
  tagLabel="Label"
  title="Main Title"
  subtitle="Supporting text"
  align="center"
  variant="blur"
  size="lg"
  maxWidth="5xl"
/>
```
