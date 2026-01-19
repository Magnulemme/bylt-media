# Prompt per Uniformare Sezione

Copia questo prompt e sostituisci `[NOME_SEZIONE]` e `[PATH_FILE]` con i valori corretti.

---

## Prompt da usare:

```
Uniforma la sezione [NOME_SEZIONE] nel file [PATH_FILE] seguendo queste regole:

## SPACING
Sostituisci i padding Tailwind diretti con le classi del design system:
- `py-12`, `py-16`, `py-24` etc → `.section-xs/sm/md/lg/xl` (vedi scala sotto)
- `px-4`, `px-6`, `px-8` → `.container-section` oppure usa `var(--spacing-padding-*)`
- `gap-*` → usa `var(--spacing-padding-xs/sm/md)` dove appropriato

Scala section spacing:
- xs: 48px mobile / 64px desktop
- sm: 80px / 112px
- md: 96px / 128px (default)
- lg: 128px / 160px
- xl: 160px / 208px

## TIPOGRAFIA
Sostituisci le classi testo con:
- Titoli grandi (hero): `.heading-display`
- H1: `.heading-h1`
- H2: `.heading-h2`
- H3: `.heading-h3`
- H4: `.heading-h4`
- Paragrafi: `.text-body` o `.text-body-lg` o `.text-body-sm`
- Label/tag: `.text-label`
- Caption: `.text-caption`

## COLORI TESTO
Standardizza su slate:
- `text-gray-300` → `text-slate-300`
- `text-gray-400` → `text-slate-400`
- `text-gray-500` → `text-slate-500`

## ANIMAZIONI
Se la sezione usa Framer Motion:
1. Importa da `@/lib/animations`:
   ```js
   import { fadeBlur, slideUp, DURATION, EASING, stagger, viewportOnce } from '@/lib/animations'
   ```
2. Sostituisci i pattern comuni:
   - `initial={{ opacity: 0, filter: "blur(10px)" }}` → `{...fadeBlur.initial}`
   - `whileInView={{ opacity: 1, filter: "blur(0px)" }}` → `whileInView={fadeBlur.animate}`
   - `initial={{ opacity: 0, y: 20 }}` → `{...slideUp.initial}`
   - `viewport={{ once: true }}` → `viewport={viewportOnce}`
   - `delay: index * 0.1` → `delay: stagger(index)`
   - `duration: 0.6` → `duration: DURATION.slow`

## REGOLE
- NON modificare la logica/funzionalità
- NON aggiungere nuove feature
- Mantieni la struttura JSX esistente
- Se una classe custom esiste già in globals.css, usala
- Verifica che il risultato sia visivamente identico
```

---

## Sezioni da migrare (in ordine):

1. `FuturisticHero` → `/src/components/home/FuturisticHero.js`
2. `SuccessStories` → `/src/components/home/SuccessStories.js`
3. `DemoReveal` → `/src/components/home/DemoReveal.js`
4. `OfficialPartnerSection` → `/src/components/home/OfficialPartnerSection.js`
5. `ProjectsShowcase` → `/src/components/home/ProjectsShowcase.js`
6. `EngineTimeline` → `/src/components/home/EngineTimeline/` (cartella)
7. `GrainyBgSection` → `/src/components/home/GrainyBgSection.js`
8. `PerformanceMetrics` → `/src/components/home/PerformanceMetrics/` (cartella)

---

## Prima di iniziare

Assicurati che esistano:
1. `/src/lib/animations.js` con le costanti
2. Le classi `.heading-*`, `.text-body-*`, `.section-*` in `globals.css`

Se non esistono, chiedimi di crearle prima.
