# 🎯 Prompt per Refactoring Componenti

## Prompt da Usare

```
📐 Prompt: Applicazione Sistema di Spacing Centralizzato

Obiettivo:
Refactoring del componente [NOME_COMPONENTE] per utilizzare il sistema di spacing centralizzato con CSS variables e custom classes, seguendo la guida contenuta in REFACTORING_GUIDE.md

Istruzioni:
1. Leggi attentamente il file REFACTORING_GUIDE.md
2. Segui tutti i 7 step della checklist implementazione
3. Applica le regole fondamentali (Regola d'Oro: solo padding-top per le sezioni)
4. Crea custom classes semantiche in globals.css seguendo i pattern già implementati
5. Usa il sistema di spacing variables: --spacing-padding-* e --spacing-section-*
6. Implementa i safety margins con --margin-safe-x
7. Verifica il responsive su mobile (375px), tablet (768px), desktop (1440px)

Prima di procedere:
- Leggi il componente corrente [NOME_COMPONENTE]
- Identifica tutti i padding e spacing hardcoded
- Mostrami un'analisi di cosa verrà modificato
- Chiedi conferma prima di applicare le modifiche

Dopo il refactoring:
- Verifica che non ci siano valori hardcoded rimasti
- Testa il responsive
- Crea un commit seguendo il template nel documento

Puoi procedere? Se hai domande sul sistema di spacing o sulle regole da applicare, chiedimi prima di modificare.
```

---

## 📋 Come Usare Questo Prompt

### Per ogni componente da refactorare:

1. **Sostituisci `[NOME_COMPONENTE]`** con il nome del componente:
   - `NeuralServices`
   - `InfinityPhilosophy`
   - `PerformanceMetrics`

2. **Copia il prompt** e incollalo nella conversazione

3. **Attendi l'analisi** prima di procedere

4. **Conferma** le modifiche proposte

---

## 🎯 Ordine Consigliato di Refactoring

### 1️⃣ NeuralServices (PRIMO)
**Motivo:** Componente più semplice, buon punto di partenza

**Prompt:**
```
📐 Prompt: Applicazione Sistema di Spacing Centralizzato

Obiettivo:
Refactoring del componente NeuralServices per utilizzare il sistema di spacing centralizzato con CSS variables e custom classes, seguendo la guida contenuta in REFACTORING_GUIDE.md

[...resto del prompt...]
```

### 2️⃣ InfinityPhilosophy (SECONDO)
**Motivo:** Complessità media, usa i pattern appresi da NeuralServices

**Prompt:**
```
📐 Prompt: Applicazione Sistema di Spacing Centralizzato

Obiettivo:
Refactoring del componente InfinityPhilosophy per utilizzare il sistema di spacing centralizzato con CSS variables e custom classes, seguendo la guida contenuta in REFACTORING_GUIDE.md

[...resto del prompt...]
```

### 3️⃣ PerformanceMetrics (TERZO)
**Motivo:** Componente più complesso, richiede esperienza dai componenti precedenti

**Prompt:**
```
📐 Prompt: Applicazione Sistema di Spacing Centralizzato

Obiettivo:
Refactoring del componente PerformanceMetrics per utilizzare il sistema di spacing centralizzato con CSS variables e custom classes, seguendo la guida contenuta in REFACTORING_GUIDE.md

[...resto del prompt...]
```

---

## ✅ Checklist Finale

Dopo aver completato tutti e 3 i componenti:

- [ ] NeuralServices refactorato e testato
- [ ] InfinityPhilosophy refactorato e testato
- [ ] PerformanceMetrics refactorato e testato
- [ ] Tutti i commit creati con il template corretto
- [ ] Push effettuato al repository
- [ ] Test finale su mobile/tablet/desktop
- [ ] Nessun valore hardcoded rimasto nei componenti
- [ ] Tutte le custom classes documentate in globals.css

---

## 🚀 Prossimi Passi Dopo il Refactoring

Una volta completati tutti i componenti:

1. **Verifica consistenza**: Controlla che tutti i componenti usino lo stesso sistema
2. **Performance check**: Verifica che non ci siano rallentamenti
3. **Cross-browser test**: Testa su Chrome, Firefox, Safari
4. **Documentazione**: Aggiorna eventuali README con le nuove classi
5. **Deploy**: Testa su staging prima di production

---

**Buon refactoring! 🎨**
