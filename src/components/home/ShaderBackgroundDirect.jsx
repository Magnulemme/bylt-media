import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

/**
 * ShaderBackground con WebGLRenderer dedicato (NO shared renderer)
 * Render direttamente sul proprio canvas senza copia di pixel
 */

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

  float hash(vec2 p) {
    vec3 p3 = fract(vec3(p.xyx) * 0.1031);
    p3 += dot(p3, p3.yzx + 33.33);
    return fract((p3.x + p3.y) * p3.z);
  }

  void main() {
    vec2 uv = vUv;
    vec2 p = (uv - 0.5) * 2.0;

    float dist = length(p);

    vec3 color;
    if (dist < 0.5) {
      color = mix(u_color3, u_color2, dist / 0.5);
    } else {
      color = mix(u_color2, u_color1, (dist - 0.5) / 1.0);
    }

    vec3 bgColor = vec3(0.008, 0.024, 0.09);
    color = mix(bgColor, color, 0.3);

    vec2 grainCoord = gl_FragCoord.xy;
    float grainTime = floor(u_time * 6.0);

    float grain = hash(grainCoord + grainTime * 100.0);
    float grainStrength = 0.09;
    float grainEffect = mix(1.0 - grainStrength, 1.0 + grainStrength * 0.5, grain);
    color *= grainEffect;

    float fineGrain = hash(grainCoord * 1.5 + grainTime * 50.0);
    color += (fineGrain - 0.5) * 0.06;

    float coarseGrain = hash(grainCoord * 0.5 + grainTime * 75.0);
    color *= mix(0.97, 1.03, coarseGrain);

    float vignette = 1.0 - length(p) * 0.35;
    vignette = smoothstep(0.3, 1.0, vignette);
    color *= mix(0.8, 1.0, vignette);

    gl_FragColor = vec4(color, 0.85);
  }
`;

const ShaderBackgroundDirect = ({
    colors = {},
    targetFPS = 24,
    className = '',
    style = {},
    onReady = null,
    enableVisibilityTracking = true,
}) => {
    const containerRef = useRef(null);
    const canvasRef = useRef(null);
    const rendererRef = useRef(null);
    const sceneRef = useRef(null);
    const materialRef = useRef(null);
    const animationIdRef = useRef(null);
    const isVisibleRef = useRef(false);
    const lastFrameTimeRef = useRef(0);
    const hasSignaledReady = useRef(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        // Setup
        const width = container.offsetWidth;
        const height = container.offsetHeight;

        // Renderer dedicato - render diretto sul canvas
        const renderer = new THREE.WebGLRenderer({
            canvas,
            alpha: true,
            antialias: false,
            powerPreference: 'high-performance',
            stencil: false,
            depth: false,
        });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(width, height, false);
        renderer.setClearColor(0x000000, 0);
        rendererRef.current = renderer;

        // Scene
        const scene = new THREE.Scene();
        sceneRef.current = scene;

        // Camera
        const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

        // Material
        const material = new THREE.ShaderMaterial({
            vertexShader,
            fragmentShader,
            uniforms: {
                u_time: { value: 0.0 },
                u_resolution: { value: new THREE.Vector2(width, height) },
                u_color1: { value: new THREE.Color(colors.color1 ?? 0x22d3ee) },
                u_color2: { value: new THREE.Color(colors.color2 ?? 0x3b82f6) },
                u_color3: { value: new THREE.Color(colors.color3 ?? 0xa855f7) },
            },
            transparent: true,
            depthWrite: false,
        });
        materialRef.current = material;

        // Geometry
        const geometry = new THREE.PlaneGeometry(2, 2);
        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        // Frame duration for throttling
        const frameDuration = 1000 / targetFPS;

        // Animation loop - solo quando visibile
        const animate = (time) => {
            // Non schedulare il prossimo frame se non visibile
            if (!isVisibleRef.current) {
                animationIdRef.current = null;
                return;
            }

            animationIdRef.current = requestAnimationFrame(animate);

            // Throttle FPS
            if (time - lastFrameTimeRef.current < frameDuration) return;
            lastFrameTimeRef.current = time;

            // Update time uniform
            material.uniforms.u_time.value = time * 0.001;

            // Render
            renderer.render(scene, camera);

            // Signal ready
            if (!hasSignaledReady.current && onReady) {
                hasSignaledReady.current = true;
                onReady();
            }
        };

        // Funzione per avviare il loop
        const startLoop = () => {
            if (!animationIdRef.current) {
                animationIdRef.current = requestAnimationFrame(animate);
            }
        };

        // ResizeObserver
        const resizeObserver = new ResizeObserver(() => {
            const w = container.offsetWidth;
            const h = container.offsetHeight;
            renderer.setSize(w, h, false);
            material.uniforms.u_resolution.value.set(w, h);
            // Force immediate render to prevent flickering during resize
            if (isVisibleRef.current) {
                renderer.render(scene, camera);
            }
        });
        resizeObserver.observe(container);

        // IntersectionObserver per lazy rendering (solo se enableVisibilityTracking)
        let observer = null;

        if (enableVisibilityTracking) {
            observer = new IntersectionObserver(
                ([entry]) => {
                    const wasVisible = isVisibleRef.current;
                    isVisibleRef.current = entry.isIntersecting;

                    // Se entra in viewport (o zona pre-render), avvia il loop
                    if (entry.isIntersecting && !wasVisible) {
                        startLoop();
                    }
                },
                { threshold: 0.1, rootMargin: '300px' }
            );
            observer.observe(container);
        } else {
            // Senza visibility tracking, avvia subito e gira sempre
            isVisibleRef.current = true;
            startLoop();
        }

        return () => {
            if (animationIdRef.current) {
                cancelAnimationFrame(animationIdRef.current);
            }
            observer?.disconnect();
            resizeObserver.disconnect();
            geometry.dispose();
            material.dispose();
            renderer.dispose();
        };
    }, [targetFPS, onReady, enableVisibilityTracking]);

    return (
        <div
            ref={containerRef}
            className={className}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 1,
                pointerEvents: 'none',
                ...style,
            }}
        >
            <canvas
                ref={canvasRef}
                style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '1rem',
                    display: 'block',
                }}
            />
        </div>
    );
};

export default ShaderBackgroundDirect;
