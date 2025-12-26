/**
 * Shared WebGL Renderer
 *
 * Gestisce un unico WebGLRenderer condiviso tra tutti i componenti shader:
 * 1. ✅ Loop globale con requestAnimationFrame
 * 2. ✅ transferToImageBitmap per performance
 * 3. ✅ Pre-warm del renderer
 * 4. ✅ Target FPS per throttling intelligente
 * 5. ✅ Lazy rendering basato su visibilità
 */

import { Scene, Camera, WebGLRenderer } from "three";

interface RenderTask {
  id: string;
  scene: Scene;
  camera: Camera;
  canvas: HTMLCanvasElement;
  enabled: boolean;
  priority: number; // 0 = highest
  lastFrameTime: number;
  targetFPS: number;
  visible: boolean;
  onBeforeRender?: (time: number) => void;
}

interface RegisterTaskOptions {
  priority?: number;
  targetFPS?: number;
  visible?: boolean;
  onBeforeRender?: (time: number) => void;
}

class SharedRendererManager {
  private renderer: WebGLRenderer | null = null;
  private tasks: Map<string, RenderTask> = new Map();
  private animationId: number | null = null;
  private isRunning = false;
  private canvas: HTMLCanvasElement | null = null;
  private supportsTransferBitmap = false;

  /**
   * Inizializza il renderer condiviso con pre-warm
   */
  initialize(): WebGLRenderer {
    if (this.renderer) return this.renderer;

    if (typeof window !== "undefined") {
      this.canvas = document.createElement("canvas");
      this.canvas.style.display = "none";
      document.body.appendChild(this.canvas);

      this.renderer = new WebGLRenderer({
        canvas: this.canvas,
        alpha: true,
        antialias: false,
        powerPreference: "high-performance",
        stencil: false,
        depth: true,
        preserveDrawingBuffer: true,
      });

      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      this.renderer.setClearColor(0x000000, 0);
      this.renderer.autoClear = true;

      // Feature detection
      this.supportsTransferBitmap =
        typeof (this.canvas as HTMLCanvasElement & { transferToImageBitmap?: () => ImageBitmap }).transferToImageBitmap === "function";

      // Pre-warm: primo render dummy per eliminare stutter
      const dummyScene = new Scene();
      const dummyCamera = new Camera();
      this.renderer.render(dummyScene, dummyCamera);

      console.log("✅ SharedRenderer initialized", {
        transferBitmap: this.supportsTransferBitmap,
        pixelRatio: this.renderer.getPixelRatio(),
      });
    }

    return this.renderer!;
  }

  /**
   * Registra un task di rendering
   */
  registerTask(
    id: string,
    scene: Scene,
    camera: Camera,
    canvas: HTMLCanvasElement,
    options: RegisterTaskOptions = {}
  ): void {
    const task: RenderTask = {
      id,
      scene,
      camera,
      canvas,
      enabled: true,
      priority: options.priority ?? 10,
      lastFrameTime: 0,
      targetFPS: options.targetFPS ?? 60,
      visible: options.visible ?? true,
      onBeforeRender: options.onBeforeRender,
    };

    this.tasks.set(id, task);

    if (!this.isRunning) {
      this.start();
    }

    console.log(
      `📝 Registered task: ${id} (priority: ${task.priority}, fps: ${task.targetFPS}, visible: ${task.visible})`
    );
  }

  /**
   * Rimuove un task
   */
  unregisterTask(id: string): void {
    this.tasks.delete(id);
    console.log(`🗑️ Unregistered task: ${id} (remaining: ${this.tasks.size})`);

    if (this.tasks.size === 0) {
      this.stop();
      this.dispose();
    }
  }

  /**
   * Abilita/disabilita un task
   */
  setTaskEnabled(id: string, enabled: boolean): void {
    const task = this.tasks.get(id);
    if (task) {
      task.enabled = enabled;
    }
  }

  /**
   * Imposta la visibilità di un task (per lazy rendering)
   */
  setTaskVisible(id: string, visible: boolean): void {
    const task = this.tasks.get(id);
    if (task) {
      task.visible = visible;
    }
  }

  /**
   * Aggiorna la priorità di un task
   */
  setTaskPriority(id: string, priority: number): void {
    const task = this.tasks.get(id);
    if (task) {
      task.priority = priority;
    }
  }

  /**
   * Aggiorna target FPS di un task
   */
  setTaskFPS(id: string, targetFPS: number): void {
    const task = this.tasks.get(id);
    if (task) {
      task.targetFPS = targetFPS;
    }
  }

  /**
   * Loop di rendering principale
   */
  private animate = (time: number): void => {
    if (!this.renderer || !this.isRunning) return;

    this.animationId = requestAnimationFrame(this.animate);

    // Filtra task abilitati E visibili, ordina per priorità
    const sortedTasks = Array.from(this.tasks.values())
      .filter((task) => task.enabled && task.visible)
      .sort((a, b) => a.priority - b.priority);

    // Rendi ogni task se è il momento (throttling FPS)
    sortedTasks.forEach((task) => {
      const frameDuration = 1000 / task.targetFPS;
      const elapsed = time - task.lastFrameTime;

      if (elapsed >= frameDuration) {
        // Callback prima del render (per aggiornare uniforms)
        if (task.onBeforeRender) {
          task.onBeforeRender(time * 0.001);
        }
        this.renderTask(task);
        task.lastFrameTime = time;
      }
    });
  };

  /**
   * Renderizza un singolo task
   */
  private renderTask(task: RenderTask): void {
    if (!this.renderer || !this.canvas) return;

    const { scene, camera, canvas } = task;

    const width = canvas.width || 512;
    const height = canvas.height || 512;

    this.renderer.setSize(width, height, false);
    this.renderer.render(scene, camera);

    // Trasferisci il risultato al canvas del task
    const ctx = canvas.getContext("2d");
    if (ctx && this.canvas) {
      try {
        ctx.clearRect(0, 0, width, height);

        if (this.supportsTransferBitmap) {
          const bitmap = (this.canvas as HTMLCanvasElement & { transferToImageBitmap: () => ImageBitmap }).transferToImageBitmap();
          ctx.drawImage(bitmap, 0, 0, width, height);
          bitmap.close();
        } else {
          ctx.drawImage(this.canvas, 0, 0, width, height);
        }
      } catch (error) {
        console.error(`Error copying canvas for ${task.id}:`, error);
      }
    }
  }

  /**
   * Render singolo frame (per componenti non animati)
   */
  renderOnce(id: string, time?: number): void {
    const task = this.tasks.get(id);
    if (!task) return;

    const currentTime = time !== undefined ? time * 1000 : performance.now();

    if (task.onBeforeRender) {
      task.onBeforeRender(currentTime * 0.001);
    }

    this.renderTask(task);
    task.lastFrameTime = currentTime;
  }

  /**
   * Resize canvas di un task
   */
  resize(id: string, width: number, height: number): void {
    const task = this.tasks.get(id);
    if (!task) return;

    task.canvas.width = width;
    task.canvas.height = height;
  }

  /**
   * Avvia il loop di rendering
   */
  private start(): void {
    if (this.isRunning) return;

    this.initialize();
    this.isRunning = true;
    this.animationId = requestAnimationFrame(this.animate);

    console.log("▶️ SharedRenderer started");
  }

  /**
   * Ferma il loop di rendering
   */
  private stop(): void {
    if (!this.isRunning) return;

    this.isRunning = false;
    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }

    console.log("⏸️ SharedRenderer stopped");
  }

  /**
   * Pulisci tutto
   */
  dispose(): void {
    this.stop();
    this.tasks.clear();

    if (this.renderer) {
      this.renderer.dispose();
      this.renderer = null;
    }

    if (this.canvas && this.canvas.parentNode) {
      this.canvas.parentNode.removeChild(this.canvas);
      this.canvas = null;
    }

    console.log("🧹 SharedRenderer disposed");
  }

  /**
   * Get stats dettagliate
   */
  getStats() {
    return {
      tasksCount: this.tasks.size,
      enabledTasks: Array.from(this.tasks.values()).filter((t) => t.enabled).length,
      visibleTasks: Array.from(this.tasks.values()).filter((t) => t.visible).length,
      activeTasks: Array.from(this.tasks.values()).filter((t) => t.enabled && t.visible).length,
      isRunning: this.isRunning,
      hasRenderer: this.renderer !== null,
      supportsTransferBitmap: this.supportsTransferBitmap,
      tasks: Array.from(this.tasks.values()).map((t) => ({
        id: t.id,
        enabled: t.enabled,
        visible: t.visible,
        priority: t.priority,
        targetFPS: t.targetFPS,
      })),
    };
  }
}

// Singleton instance
export const sharedRenderer = new SharedRendererManager();

// Cleanup on unmount
if (typeof window !== "undefined") {
  window.addEventListener("beforeunload", () => {
    sharedRenderer.dispose();
  });
}
