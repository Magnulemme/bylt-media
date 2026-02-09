import { useRef, useEffect, useId, useCallback } from "react";
import * as THREE from "three";
import { sharedRenderer } from "@/lib/sharedRenderer";
import {
  shaderBackgroundRenderer,
  ShaderBackgroundColors,
} from "@/lib/shaderBackgroundRenderer";

interface UseShaderBackgroundOptions {
  colors?: ShaderBackgroundColors;
  priority?: number;
  targetFPS?: number;
  enableVisibilityTracking?: boolean;
  visibilityThreshold?: number;
  onReady?: () => void;
}

/**
 * Hook per gestire ShaderBackground con sharedRenderer
 * Include IntersectionObserver automatico per lazy rendering
 */
export function useShaderBackground(options: UseShaderBackgroundOptions = {}) {
  const {
    colors = {},
    priority = 5,
    targetFPS = 24, // 24fps è sufficiente per il grain effect
    enableVisibilityTracking = true,
    visibilityThreshold = 0.1,
    onReady,
  } = options;

  const uniqueId = useId();
  const taskId = `shader-bg-${uniqueId.replace(/:/g, "-")}`;

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const hasSignaledReady = useRef(false);

  // Setup Three.js e registrazione nel sharedRenderer
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    // Imposta dimensioni canvas
    const width = container.offsetWidth;
    const height = container.offsetHeight;
    canvas.width = width;
    canvas.height = height;

    // Crea scena
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Crea camera ortografica
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    // Ottieni material e geometry dal singleton
    const material = shaderBackgroundRenderer.createMaterial(
      taskId,
      colors,
      new THREE.Vector2(width, height)
    );
    materialRef.current = material;

    const geometry = shaderBackgroundRenderer.getGeometry();

    // Crea mesh e aggiungi alla scena
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Callback per aggiornare u_time prima di ogni render
    const onBeforeRender = (time: number) => {
      shaderBackgroundRenderer.updateTime(taskId, time);

      // Signal ready after first frame
      if (!hasSignaledReady.current && onReady) {
        hasSignaledReady.current = true;
        onReady();
      }
    };

    // Registra nel sharedRenderer
    sharedRenderer.registerTask(taskId, scene, camera, canvas, {
      priority,
      targetFPS,
      visible: !enableVisibilityTracking,
      onBeforeRender,
    });

    return () => {
      sharedRenderer.unregisterTask(taskId);
      shaderBackgroundRenderer.releaseInstance(taskId);
      scene.remove(mesh);
      sceneRef.current = null;
      materialRef.current = null;
    };
  }, [taskId, priority, targetFPS, enableVisibilityTracking]);

  // IntersectionObserver per lazy rendering
  // Ottimizzato per Next.js 16 <Activity> component
  useEffect(() => {
    if (!enableVisibilityTracking || !containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isVisible = entry.isIntersecting;

        // Next.js 16: quando il componente è in <Activity>,
        // viene nascosto con display:none ma rimane montato.
        // Pausiamo il rendering per risparmiare risorse.
        sharedRenderer.setTaskVisible(taskId, isVisible);

        // Debug: log visibility changes (rimuovi in produzione)
        if (process.env.NODE_ENV === 'development') {
          console.log(`[ShaderBackground ${taskId}] Visibility: ${isVisible}`);
        }
      },
      {
        // threshold: 0 rileva anche quando è completamente nascosto da display:none
        threshold: [0, visibilityThreshold],
        rootMargin: "500px", // Pre-carica 500px prima che sia visibile
      }
    );

    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
    };
  }, [taskId, enableVisibilityTracking, visibilityThreshold]);

  // ResizeObserver per aggiornare dimensioni
  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const handleResize = () => {
      const width = container.offsetWidth;
      const height = container.offsetHeight;
      canvas.width = width;
      canvas.height = height;
      // Update resolution BEFORE resize so the forced render uses correct dimensions
      shaderBackgroundRenderer.updateResolution(taskId, width, height);
      sharedRenderer.resize(taskId, width, height);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // Osserva anche il parent per cambi di dimensione dinamici
    if (container.parentElement) {
      resizeObserver.observe(container.parentElement);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [taskId]);

  // Page Visibility API - pausa il rendering quando la tab non è visibile
  useEffect(() => {
    const handleVisibilityChange = () => {
      const isPageVisible = !document.hidden;

      // Quando l'utente cambia tab, pausa il rendering
      if (!isPageVisible) {
        sharedRenderer.setTaskVisible(taskId, false);
      } else {
        // Riprendi solo se il container è effettivamente visibile
        if (containerRef.current) {
          const rect = containerRef.current.getBoundingClientRect();
          const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;
          sharedRenderer.setTaskVisible(taskId, isInViewport);
        }
      }

      if (process.env.NODE_ENV === 'development') {
        console.log(`[ShaderBackground ${taskId}] Page visibility: ${isPageVisible}`);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [taskId]);

  // Funzione per aggiornare i colori dinamicamente
  const updateColors = useCallback(
    (newColors: ShaderBackgroundColors) => {
      shaderBackgroundRenderer.updateColors(taskId, newColors);
    },
    [taskId]
  );

  return {
    containerRef,
    canvasRef,
    taskId,
    sceneRef,
    materialRef,
    updateColors,
  };
}
