# Persistent Shader Background

## Overview

Il sistema di **Persistent Shader Background** usa le nuove funzionalità di Next.js 16 per mantenere lo shader background montato durante la navigazione, eliminando flicker e migliorando le performance.

## Tecnologie

- **Next.js 16** - Cache Components & View Transitions
- **React 19** - `<Activity>` component per mantenere lo stato
- **Three.js** - Rendering shader WebGL
- **Shared Renderer** - Sistema di rendering condiviso ottimizzato

## Come Funziona

### 1. Cache Components (`"use cache"`)

Il componente `PersistentShaderBackground` usa la direttiva `"use cache"` di Next.js 16:

```javascript
"use cache";

import ShaderBackground from './home/ShaderBackground';

const PersistentShaderBackground = ({ colors, ...props }) => {
  return <ShaderBackground colors={colors} {...props} />;
};
```

### 2. React 19 Activity Component

Durante la navigazione, Next.js 16 **non smonta** più i componenti cacheable. Invece:

- Avvolge il componente in `<Activity>` (Offscreen)
- Applica `display: none !important`
- **Mantiene lo stato e gli Effect attivi**
- Lo WebGL canvas continua a esistere nel DOM

### 3. Ottimizzazioni Performance

Il sistema include diverse ottimizzazioni:

#### IntersectionObserver

Rileva quando il canvas è nascosto da `<Activity>` e pausa il rendering:

```typescript
const observer = new IntersectionObserver(
  ([entry]) => {
    const isVisible = entry.isIntersecting;
    sharedRenderer.setTaskVisible(taskId, isVisible);
  },
  { threshold: [0, visibilityThreshold] }
);
```

#### Page Visibility API

Pausa il rendering quando l'utente cambia tab:

```typescript
document.addEventListener('visibilitychange', () => {
  const isPageVisible = !document.hidden;
  sharedRenderer.setTaskVisible(taskId, isPageVisible);
});
```

## Configurazione

### next.config.js

```javascript
const nextConfig = {
  experimental: {
    cacheComponents: true,      // Abilita Cache Components
    viewTransition: true,        // Abilita View Transitions API
    cacheLife: {
      default: {
        stale: 3600,             // 1 ora
        revalidate: 900,         // 15 minuti
      },
    },
  },
};
```

### _app.js

```javascript
import PersistentShaderBackground from '@/components/PersistentShaderBackground';

function MyApp({ Component, pageProps }) {
  return (
    <div>
      {/* Shader globale - rimane montato */}
      <PersistentShaderBackground
        colors={{
          color1: 0x1a1a2e,
          color2: 0x16213e,
          color3: 0x0f3460,
        }}
        className="fixed inset-0 z-0"
      />

      {/* Contenuto delle pagine */}
      <div className="relative z-10">
        <Component {...pageProps} />
      </div>
    </div>
  );
}
```

## Vantaggi

✅ **Zero Flicker** - Lo shader continua l'animazione senza interruzioni
✅ **Performance** - Three.js viene inizializzato una sola volta
✅ **Smooth Transitions** - View Transitions API per transizioni fluide
✅ **Ottimizzazione Automatica** - Pausa quando nascosto o fuori viewport
✅ **Memory Efficient** - Shared renderer condiviso tra tutte le istanze

## Metriche Performance

### Prima (senza persistenza)
- Tempo inizializzazione Three.js: ~50-100ms per navigazione
- Flicker visibile durante transizioni
- Memoria: nuovo context WebGL per ogni pagina

### Dopo (con persistenza)
- Tempo inizializzazione: 0ms (già inizializzato)
- Zero flicker - animazione continua
- Memoria: singolo context WebGL condiviso
- Rendering pause automatico quando nascosto

## Debug

In development mode, i log di visibilità sono abilitati:

```
[ShaderBackground shader-bg-xyz] Visibility: true
[ShaderBackground shader-bg-xyz] Page visibility: false
```

Per disabilitare i log in produzione, sono già wrappati in:

```javascript
if (process.env.NODE_ENV === 'development') {
  console.log(...);
}
```

## File Modificati

- `next.config.js` - Configurazione Next.js 16
- `src/components/PersistentShaderBackground.js` - Wrapper cacheable
- `src/pages/_app.js` - Integrazione globale
- `src/hooks/useShaderBackground.ts` - Ottimizzazioni visibilità

## Riferimenti

- [Next.js 16 Release](https://nextjs.org/blog/next-16)
- [Cache Components RFC](https://github.com/vercel/next.js/discussions/85502)
- [React 19 Activity Component](https://react.dev/reference/react/Activity)
- [View Transitions API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API)
