import { useEffect, useRef } from 'react';
import { profiler } from '@/lib/performanceProfiler';

/**
 * Hook per profilare il render di un componente
 *
 * COME FUNZIONA:
 * - renderStart: chiamato quando la funzione componente inizia
 * - renderEnd: chiamato quando tutti gli hook sono stati eseguiti
 * - effectFired: chiamato quando useEffect scatta (dopo il DOM commit)
 */
export function useProfiler(componentName: string) {
  const hasStarted = useRef(false);

  // Questo codice gira durante il RENDER (sincrono)
  if (!hasStarted.current) {
    hasStarted.current = true;
    profiler.renderStart(componentName);
  }

  // Questo hook gira ancora durante il render, alla fine degli hook
  // Usiamo useRef per marcare la fine del render
  const renderEndMarked = useRef(false);
  if (!renderEndMarked.current) {
    renderEndMarked.current = true;
    // Schedule renderEnd per dopo tutti gli altri hook sync
    // Ma prima del return JSX
    Promise.resolve().then(() => {
      // Questo gira nel microtask, subito dopo il render sync
      profiler.renderEnd(componentName);
    });
  }

  // useEffect gira DOPO che React ha committato il DOM
  useEffect(() => {
    profiler.effectFired(componentName);

    return () => {
      // Reset per permettere ri-profiling su re-render
      hasStarted.current = false;
      renderEndMarked.current = false;
    };
  }, [componentName]);
}

/**
 * Versione manuale per misurazioni più precise
 * Usala così:
 *
 * const MyComponent = () => {
 *   const endRender = useManualProfiler('MyComponent');
 *   // ... tutto il tuo codice ...
 *   endRender(); // chiama questo PRIMA del return
 *   return <div>...</div>;
 * }
 */
export function useManualProfiler(componentName: string) {
  const hasStarted = useRef(false);

  if (!hasStarted.current) {
    hasStarted.current = true;
    profiler.renderStart(componentName);
  }

  useEffect(() => {
    profiler.effectFired(componentName);
    return () => {
      hasStarted.current = false;
    };
  }, [componentName]);

  // Ritorna funzione da chiamare alla fine del render
  return () => profiler.renderEnd(componentName);
}
