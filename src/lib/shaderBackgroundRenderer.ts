/**
 * Shader Background Renderer
 *
 * Singleton per condividere Material e Geometry tra tutte le istanze di ShaderBackground.
 * Riduce overhead GPU e memoria.
 *
 * NOTA: A differenza di ShaderText, ogni istanza di ShaderBackground può avere
 * colori diversi, quindi creiamo un material clone per ogni istanza ma condividiamo
 * il geometry.
 */

import { ShaderMaterial, PlaneGeometry, Color, Vector2 } from "three";

// Shader per ShaderBackground - Monopo style con grain
const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = `
  precision highp float;

  uniform float u_time;
  uniform vec2 u_resolution;
  uniform vec3 u_color1;
  uniform vec3 u_color2;
  uniform vec3 u_color3;

  varying vec2 vUv;

  // Hash function for grain
  float hash(vec2 p) {
    vec3 p3 = fract(vec3(p.xyx) * 0.1031);
    p3 += dot(p3, p3.yzx + 33.33);
    return fract((p3.x + p3.y) * p3.z);
  }

  void main() {
    vec2 uv = vUv;
    vec2 p = (uv - 0.5) * 2.0;

    // Base gradient - radial from center using brand colors
    float dist = length(p);

    // Create gradient: purple (center) -> blue -> cyan (edges)
    vec3 color;
    if (dist < 0.5) {
      color = mix(u_color3, u_color2, dist / 0.5);  // purple to blue
    } else {
      color = mix(u_color2, u_color1, (dist - 0.5) / 1.0);  // blue to cyan
    }

    // Mix with dark background for subtlety
    vec3 bgColor = vec3(0.008, 0.024, 0.09);
    color = mix(bgColor, color, 0.3);  // 30% gradient, 70% background

    // Enhanced grain texture (film grain effect)
    vec2 grainCoord = gl_FragCoord.xy;
    float grainTime = floor(u_time * 24.0);

    // Main grain layer
    float grain = hash(grainCoord + grainTime * 100.0);
    float grainStrength = 0.18;
    float grainEffect = mix(1.0 - grainStrength, 1.0 + grainStrength * 0.5, grain);
    color *= grainEffect;

    // Fine grain detail
    float fineGrain = hash(grainCoord * 1.5 + grainTime * 50.0);
    color += (fineGrain - 0.5) * 0.12;

    // Coarse grain layer
    float coarseGrain = hash(grainCoord * 0.5 + grainTime * 75.0);
    color *= mix(0.95, 1.05, coarseGrain);

    // Subtle vignette
    float vignette = 1.0 - length(p) * 0.35;
    vignette = smoothstep(0.3, 1.0, vignette);
    color *= mix(0.8, 1.0, vignette);

    gl_FragColor = vec4(color, 0.85);
  }
`;

export interface ShaderBackgroundColors {
  color1?: number; // cyan default: 0x22d3ee
  color2?: number; // blue default: 0x3b82f6
  color3?: number; // purple default: 0xa855f7
}

interface ShaderBackgroundInstance {
  material: ShaderMaterial;
  id: string;
}

class ShaderBackgroundRenderer {
  private geometry: PlaneGeometry | null = null;
  private instances: Map<string, ShaderBackgroundInstance> = new Map();

  /**
   * Inizializza geometry condiviso (chiamato automaticamente)
   */
  private initializeGeometry(): void {
    if (this.geometry) return;
    this.geometry = new PlaneGeometry(2, 2);
    console.log("✅ ShaderBackgroundRenderer geometry initialized");
  }

  /**
   * Crea un nuovo material per un'istanza di ShaderBackground
   * Ogni istanza ha il proprio material per supportare colori diversi
   */
  createMaterial(
    id: string,
    colors: ShaderBackgroundColors = {},
    resolution: Vector2 = new Vector2(512, 512)
  ): ShaderMaterial {
    const material = new ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        u_time: { value: 0.0 },
        u_resolution: { value: resolution },
        u_color1: { value: new Color(colors.color1 ?? 0x22d3ee) }, // cyan
        u_color2: { value: new Color(colors.color2 ?? 0x3b82f6) }, // blue
        u_color3: { value: new Color(colors.color3 ?? 0xa855f7) }, // purple
      },
      transparent: true,
      depthWrite: false,
    });

    this.instances.set(id, { material, id });
    console.log(`📊 Active ShaderBackground instances: ${this.instances.size}`);

    return material;
  }

  /**
   * Ottieni il geometry condiviso
   */
  getGeometry(): PlaneGeometry {
    this.initializeGeometry();
    return this.geometry!;
  }

  /**
   * Aggiorna u_time per un'istanza specifica
   */
  updateTime(id: string, time: number): void {
    const instance = this.instances.get(id);
    if (instance) {
      instance.material.uniforms.u_time.value = time;
    }
  }

  /**
   * Aggiorna resolution per un'istanza specifica
   */
  updateResolution(id: string, width: number, height: number): void {
    const instance = this.instances.get(id);
    if (instance) {
      instance.material.uniforms.u_resolution.value.set(width, height);
    }
  }

  /**
   * Aggiorna i colori per un'istanza specifica
   */
  updateColors(id: string, colors: ShaderBackgroundColors): void {
    const instance = this.instances.get(id);
    if (instance) {
      if (colors.color1 !== undefined) {
        instance.material.uniforms.u_color1.value.setHex(colors.color1);
      }
      if (colors.color2 !== undefined) {
        instance.material.uniforms.u_color2.value.setHex(colors.color2);
      }
      if (colors.color3 !== undefined) {
        instance.material.uniforms.u_color3.value.setHex(colors.color3);
      }
    }
  }

  /**
   * Rilascia risorse di un'istanza
   */
  releaseInstance(id: string): void {
    const instance = this.instances.get(id);
    if (instance) {
      instance.material.dispose();
      this.instances.delete(id);
      console.log(`📊 Active ShaderBackground instances: ${this.instances.size}`);

      // Disponi geometry quando non ci sono più istanze
      if (this.instances.size === 0 && this.geometry) {
        this.geometry.dispose();
        this.geometry = null;
        console.log("🧹 ShaderBackgroundRenderer geometry disposed");
      }
    }
  }

  /**
   * Ottieni stats
   */
  getStats() {
    return {
      instancesCount: this.instances.size,
      hasGeometry: this.geometry !== null,
      instances: Array.from(this.instances.keys()),
    };
  }
}

export const shaderBackgroundRenderer = new ShaderBackgroundRenderer();
