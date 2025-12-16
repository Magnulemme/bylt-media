# Section Headers - Quick Reference

Componenti riutilizzabili per header e titoli di sezioni.

## 📦 Import

```jsx
// Import tutto
import { SectionHeader, SectionTitle, SectionIntro } from '@/components/ui/section-headers';

// Import singolo
import { SectionIntro } from '@/components/ui/section-headers';
```

## 🚀 Quick Start

### Soluzione più semplice (Consigliata)

```jsx
<SectionIntro
  title="Your Section Title"
  subtitle="Your description text"
/>
```

## 📚 Componenti

### 1️⃣ SectionHeader
Tag/etichetta piccola (font mono).

```jsx
<SectionHeader
  title="Services"
  tag="Performance"
  align="center"
/>
```

### 2️⃣ SectionTitle
Titolo principale con animazioni.

```jsx
<SectionTitle
  title="Main Title"
  subtitle="Description"
  variant="blur"
  size="lg"
/>
```

**Varianti:**
- `blur` - Fade-in con effetto blur (default)
- `fade` - Semplice fade-in
- `none` - Nessuna animazione

**Note:** Per l'effetto scroll-reveal (word-by-word), usa il componente `ScrollRevealText` personalizzato nei tuoi file (vedi EngineTimeline.js, OfficialPartnerSection.js, NeuralContact.js per esempi).

**Dimensioni:**
- `xl` - Extra large (hero)
- `lg` - Large (default)
- `md` - Medium
- `sm` - Small

### 3️⃣ SectionIntro
Componente completo (tag + title + subtitle).

```jsx
<SectionIntro
  tag="Category"        // Optional
  tagLabel="Label"      // Optional
  title="Section Title"
  subtitle="Description"
  variant="blur"
  size="lg"
  maxWidth="2xl"
  align="center"
/>
```

## 🎯 Esempi Pratici

### Services Section
```jsx
<SectionIntro
  title="A synergistic approach to digital dominance"
  subtitle="Each service is a component of a greater strategy"
  variant="blur"
  maxWidth="5xl"
/>
```

### Process Timeline
```jsx
<SectionIntro
  title="Our proven process ensures clarity and results"
  subtitle="Every stage delivers measurable impact"
  variant="scroll-reveal"
  maxWidth="5xl"
/>
```

### Testimonials
```jsx
<SectionIntro
  title="Real Results from Real Partners"
  subtitle="See why leading brands trust us"
  align="left"
  maxWidth="3xl"
  size="xl"
/>
```

### With Tag
```jsx
<SectionIntro
  tag="Portfolio"
  tagLabel="Our Work"
  title="Featured Projects"
  subtitle="Explore our latest transformations"
  size="md"
  maxWidth="lg"
/>
```

## 🎨 Props Reference

### SectionIntro (All-in-One)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `tag` | string | - | Tag text (optional) |
| `tagLabel` | string | - | Tag label in brackets (optional) |
| `title` | string | **required** | Main title |
| `subtitle` | string | - | Description text |
| `align` | 'left' \| 'center' \| 'right' | 'center' | Alignment |
| `size` | 'sm' \| 'md' \| 'lg' \| 'xl' | 'lg' | Text size |
| `variant` | 'blur' \| 'fade' \| 'none' | 'blur' | Animation type |
| `maxWidth` | 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl' \| '3xl' \| '5xl' \| '7xl' \| 'full' | '2xl' | Max width |
| `spacing` | 'sm' \| 'md' \| 'lg' \| 'xl' | 'lg' | Bottom margin |
| `className` | string | '' | Additional CSS classes |
| `animateTag` | boolean | true | Animate the tag |

## 📋 Migration Guide

### Prima
```jsx
<div className="max-w-5xl mx-auto px-4 mb-16">
  <motion.h3
    className="text-2xl md:text-4xl font-bold font-inter text-center text-white mb-6"
    initial={{ opacity: 0, filter: "blur(10px)" }}
    whileInView={{ opacity: 1, filter: "blur(0px)" }}
    viewport={{ once: true }}
    transition={{ duration: 0.8 }}
  >
    A synergistic approach to digital dominance
  </motion.h3>
  <motion.p
    className="text-gray-400 text-lg text-center"
    initial={{ opacity: 0, filter: "blur(10px)" }}
    whileInView={{ opacity: 1, filter: "blur(0px)" }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay: 0.2 }}
  >
    Each service is a component of a greater strategy
  </motion.p>
</div>
```

### Dopo
```jsx
<SectionIntro
  title="A synergistic approach to digital dominance"
  subtitle="Each service is a component of a greater strategy"
  maxWidth="5xl"
/>
```

**Benefici:**
- ✅ 15+ righe → 4 righe
- ✅ Codice più leggibile
- ✅ Consistenza garantita
- ✅ Facile da mantenere
- ✅ Props chiare e documentate

## 🎓 Best Practices

1. **Usa SectionIntro** per la maggior parte dei casi (più semplice)
2. **Usa SectionTitle** quando serve più controllo fine
3. **Usa SectionHeader** solo per tag/etichette standalone
4. **Variante blur** è ottima per la maggior parte dei casi
5. **maxWidth="2xl"** è ottimale per la leggibilità
6. **Size "lg"** è il default più bilanciato

## 📖 Documentazione Completa

Per esempi dettagliati e showcase visivo:
- [HEADER_COMPONENTS_GUIDE.md](src/components/ui/HEADER_COMPONENTS_GUIDE.md) - Guida completa
- [SectionHeadersShowcase.jsx](src/components/ui/SectionHeadersShowcase.jsx) - Esempi visuali

## 🔧 Testing

Per vedere tutti i componenti in azione, importa lo showcase:

```jsx
import SectionHeadersShowcase from '@/components/ui/SectionHeadersShowcase';

// Usa nel tuo componente o crea una pagina /test
<SectionHeadersShowcase />
```
