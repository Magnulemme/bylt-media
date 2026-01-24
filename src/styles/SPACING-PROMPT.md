# Spacing Workflow

Usa questo prompt insieme al nome della sezione da lavorare.

---

```
Applica il workflow di spacing alla sezione indicata.

WORKFLOW:

Step 0 - CONSULTA
Leggi src/styles/SPACING-DECISIONS.md PRIMA di iniziare.
Comprendi:
- Le regole generali e i pattern stabiliti (padding-top only, container standard, etc.)
- Le scelte fatte per le sezioni già lavorate (per coerenza)
- I valori standard da applicare

Step 1 - PULISCI
Rimuovi TUTTI i padding, margin, gap, space-x, space-y dalla sezione e dai suoi componenti interni.
Sia nel file CSS della sezione che nelle classi Tailwind inline nel JSX.
Non toccare proprietà non legate allo spacing (display, position, colors, fonts, etc.).

Step 2 - ANALIZZA
Leggi la struttura del componente JSX e identifica:
- La sezione wrapper (padding-top)
- Il container interno (padding orizzontale)
- Ogni sotto-componente che ha bisogno di gap o spacing interno
Elenca tutti gli elementi che necessitano spacing prima di procedere.

Step 3 - APPLICA
Inserisci lo spacing seguendo queste regole:

Regole sezioni (padding verticale):
- SOLO padding-top, MAI padding-bottom
- Ogni sezione gestisce solo il proprio padding-top
- La separazione tra sezioni è data dal padding-top della sezione successiva
- Valori standard: --spacing-padding-lg (64px) → --spacing-padding-xl (128px) @768px

Pattern container standard (padding orizzontale):
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

Regole spacing interni:
- Spacing piccoli (fino a 8 = 32px): usa Tailwind standard (p-1, p-2, p-4, p-8, gap-1, gap-2, gap-4, gap-8, m-1, m-2, m-4, m-8, space-x/y)
- Spacing grandi (oltre 32px): usa variabili CSS --spacing-*
- Mobile-first approach con media queries
- Se servono più di 4 classi Tailwind inline sullo stesso elemento, crea una classe CSS custom nel file .css della sezione

Variabili disponibili (Mobile → Desktop @768px):
--spacing-padding-xs: 24px → 32px
--spacing-padding-sm: 32px → 48px
--spacing-padding-md: 48px → 64px
--spacing-padding-lg: 64px → 96px
--spacing-padding-xl: 96px → 128px
--spacing-padding-2xl: 128px → 160px
--spacing-section-md: 96px → 128px (spacing tra sezioni)

Step 4 - DOCUMENTA
Aggiorna src/styles/SPACING-DECISIONS.md con le scelte fatte, seguendo il formato esistente.
Aggiungi:
- La nuova sezione nella lista "Componenti Documentati"
- Una riga nel Changelog

CONTESTO:
- La Hero è il riferimento per il design system (non modificarla)
- Riferimento scelte e regole: src/styles/SPACING-DECISIONS.md (leggilo PRIMA e aggiornalo DOPO)
- Proprietà da considerare: padding, margin, gap, space-x, space-y
```
