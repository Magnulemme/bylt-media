/**
 * Performance Profiler v2
 *
 * Traccia tempi di esecuzione per componenti React.
 *
 * IMPORTANTE: React renderizza SINCRONICAMENTE nel main thread.
 * Questo profiler misura:
 * - renderTime: tempo della render function (lavoro sincrono del componente)
 * - mountOrder: sequenza di mount per capire l'ordine
 * - effectDelay: quanto dopo il render scatta useEffect
 */

interface ComponentTiming {
  name: string;
  renderStart: number;
  renderEnd: number;
  renderDuration: number;
  effectTime?: number;
  mountOrder: number;
  renderCount: number;
}

interface RenderSequenceEntry {
  name: string;
  phase: 'render-start' | 'render-end' | 'effect';
  time: number;
  relativeTime: number;
}

class PerformanceProfiler {
  private components: Map<string, ComponentTiming> = new Map();
  private renderSequence: RenderSequenceEntry[] = [];
  private mountCounter = 0;
  private pageLoadStart: number;
  private hasLoggedSummary = false;
  private currentRenderStack: string[] = [];

  constructor() {
    this.pageLoadStart = typeof performance !== 'undefined' ? performance.now() : 0;
  }

  /**
   * Chiamato all'INIZIO della render function
   */
  renderStart(name: string): void {
    const now = performance.now();
    const relativeTime = now - this.pageLoadStart;

    this.currentRenderStack.push(name);

    this.renderSequence.push({
      name,
      phase: 'render-start',
      time: now,
      relativeTime,
    });

    const existing = this.components.get(name);
    if (existing) {
      existing.renderStart = now;
      existing.renderCount++;
    } else {
      this.components.set(name, {
        name,
        renderStart: now,
        renderEnd: now,
        renderDuration: 0,
        mountOrder: ++this.mountCounter,
        renderCount: 1,
      });
    }
  }

  /**
   * Chiamato alla FINE della render function (prima del return JSX)
   */
  renderEnd(name: string): void {
    const now = performance.now();
    const relativeTime = now - this.pageLoadStart;

    this.renderSequence.push({
      name,
      phase: 'render-end',
      time: now,
      relativeTime,
    });

    const component = this.components.get(name);
    if (component) {
      component.renderEnd = now;
      component.renderDuration = now - component.renderStart;

      // Log immediato per render lenti (>16ms = 1 frame)
      // if (component.renderDuration > 16) {
      //   console.log(`🐌 [SLOW RENDER] ${name}: ${component.renderDuration.toFixed(1)}ms`);
      // }
    }

    // Pop from stack
    const idx = this.currentRenderStack.lastIndexOf(name);
    if (idx !== -1) this.currentRenderStack.splice(idx, 1);
  }

  /**
   * Chiamato quando useEffect scatta
   */
  effectFired(name: string): void {
    const now = performance.now();
    const relativeTime = now - this.pageLoadStart;

    this.renderSequence.push({
      name,
      phase: 'effect',
      time: now,
      relativeTime,
    });

    const component = this.components.get(name);
    if (component) {
      component.effectTime = now;
    }
  }

  /**
   * Log del sommario con timeline visuale
   */
  logSummary(): void {
    if (this.hasLoggedSummary) return;
    this.hasLoggedSummary = true;

    // const totalTime = performance.now() - this.pageLoadStart;

    // console.log('\n📊 ═══════════════════════════════════════════');
    // console.log('   PERFORMANCE PROFILER v2 - RENDER SEQUENCE');
    // console.log('═══════════════════════════════════════════════');
    // console.log(`⏱️  Total time since page load: ${totalTime.toFixed(0)}ms\n`);

    // // Timeline dei render (solo render-start e render-end)
    // console.log('📍 RENDER TIMELINE (cronologico)');
    // console.log('─────────────────────────────────');

    // const renderEvents = this.renderSequence.filter(e => e.phase !== 'effect');
    // renderEvents.forEach((entry, i) => {
    //   const icon = entry.phase === 'render-start' ? '▶️' : '✅';
    //   const indent = entry.phase === 'render-end' ? '  ' : '';
    //   console.log(`${indent}${entry.relativeTime.toFixed(0).padStart(5)}ms ${icon} ${entry.name}`);
    // });

    // // Componenti ordinati per durata render
    // console.log('\n\n🧩 RENDER TIME PER COMPONENTE (dal più lento)');
    // console.log('─────────────────────────────────');

    // const sortedByRender = Array.from(this.components.values())
    //   .sort((a, b) => b.renderDuration - a.renderDuration);

    // sortedByRender.forEach(c => {
    //   const bar = '█'.repeat(Math.min(20, Math.round(c.renderDuration / 2)));
    //   const warning = c.renderDuration > 16 ? ' ⚠️ >16ms' : '';
    //   console.log(
    //     `  ${c.name}: ${c.renderDuration.toFixed(1)}ms ${bar}${warning}`
    //   );
    // });

    // // Sequenza di mount
    // console.log('\n\n📋 ORDINE DI MOUNT');
    // console.log('─────────────────────────────────');

    // const sortedByOrder = Array.from(this.components.values())
    //   .sort((a, b) => a.mountOrder - b.mountOrder);

    // sortedByOrder.forEach((c, i) => {
    //   const effectDelay = c.effectTime
    //     ? `→ effect +${(c.effectTime - c.renderEnd).toFixed(0)}ms`
    //     : '';
    //   console.log(`  ${i + 1}. ${c.name} (render: ${c.renderDuration.toFixed(1)}ms) ${effectDelay}`);
    // });

    // // Tempo totale di render (somma)
    // const totalRenderTime = sortedByRender.reduce((sum, c) => sum + c.renderDuration, 0);
    // console.log(`\n⚡ Tempo totale render: ${totalRenderTime.toFixed(0)}ms`);
    // console.log(`📊 Numero componenti tracciati: ${this.components.size}`);

    // console.log('\n═══════════════════════════════════════════════\n');
  }

  /**
   * Reset del profiler
   */
  reset(): void {
    this.components.clear();
    this.renderSequence = [];
    this.mountCounter = 0;
    this.pageLoadStart = performance.now();
    this.hasLoggedSummary = false;
  }

  getData() {
    return {
      components: Array.from(this.components.values()),
      renderSequence: this.renderSequence,
      totalTime: performance.now() - this.pageLoadStart,
    };
  }
}

// Singleton
export const profiler = new PerformanceProfiler();

// Auto-log summary dopo 8 secondi
if (typeof window !== 'undefined') {
  setTimeout(() => {
    profiler.logSummary();
  }, 8000);
}
