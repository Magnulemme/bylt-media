import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ShaderBackgroundStandalone = () => {
    const containerRef = useRef(null);
    const sceneRef = useRef(null);
    const cameraRef = useRef(null);
    const rendererRef = useRef(null);
    const materialRef = useRef(null);
    const frameIdRef = useRef(null);

    useEffect(() => {
        if (!containerRef.current) return;

        // Scene setup
        const scene = new THREE.Scene();
        sceneRef.current = scene;

        // Camera setup
        const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
        cameraRef.current = camera;

        // Renderer setup
        const renderer = new THREE.WebGLRenderer({
            antialias: false,
            alpha: true,
            powerPreference: 'high-performance'
        });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(containerRef.current.offsetWidth, containerRef.current.offsetHeight);

        // Apply border-radius directly to canvas
        renderer.domElement.style.borderRadius = '1rem';

        containerRef.current.appendChild(renderer.domElement);
        rendererRef.current = renderer;

        // Custom shader material - Monopo style with brand colors
        const material = new THREE.ShaderMaterial({
            uniforms: {
                u_time: { value: 0.0 },
                u_resolution: {
                    value: new THREE.Vector2(
                        containerRef.current.offsetWidth,
                        containerRef.current.offsetHeight
                    )
                },
                u_color1: { value: new THREE.Color(0x22d3ee) }, // cyan
                u_color2: { value: new THREE.Color(0x3b82f6) }, // blue
                u_color3: { value: new THREE.Color(0xa855f7) }, // purple
            },
            vertexShader: `
                varying vec2 vUv;
                void main() {
                    vUv = uv;
                    gl_Position = vec4(position, 1.0);
                }
            `,
            fragmentShader: `
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
                    float grainTime = floor(u_time * 6.0); // 6 FPS

                    // Main grain layer
                    float grain = hash(grainCoord + grainTime * 100.0);
                    float grainStrength = 0.09;
                    float grainEffect = mix(1.0 - grainStrength, 1.0 + grainStrength * 0.5, grain);
                    color *= grainEffect;

                    // Fine grain detail
                    float fineGrain = hash(grainCoord * 1.5 + grainTime * 50.0);
                    color += (fineGrain - 0.5) * 0.06;

                    // Coarse grain layer
                    float coarseGrain = hash(grainCoord * 0.5 + grainTime * 75.0);
                    color *= mix(0.97, 1.03, coarseGrain);

                    // Subtle vignette
                    float vignette = 1.0 - length(p) * 0.35;
                    vignette = smoothstep(0.3, 1.0, vignette);
                    color *= mix(0.8, 1.0, vignette);

                    gl_FragColor = vec4(color, 0.85);
                }
            `,
            transparent: true,
            depthWrite: false,
        });
        materialRef.current = material;

        // Create plane
        const geometry = new THREE.PlaneGeometry(2, 2);
        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        // Animation loop
        const clock = new THREE.Clock();
        const animate = () => {
            frameIdRef.current = requestAnimationFrame(animate);
            const elapsedTime = clock.getElapsedTime();
            material.uniforms.u_time.value = elapsedTime;
            renderer.render(scene, camera);
        };
        animate();

        // Resize handler
        const handleResize = () => {
            if (!containerRef.current) return;
            const width = containerRef.current.offsetWidth;
            const height = containerRef.current.offsetHeight;
            renderer.setSize(width, height);
            material.uniforms.u_resolution.value.set(width, height);
        };
        window.addEventListener('resize', handleResize);

        // ResizeObserver per intercettare cambi di dimensione del parent
        const resizeObserver = new ResizeObserver(() => {
            handleResize();
        });

        if (containerRef.current.parentElement) {
            resizeObserver.observe(containerRef.current.parentElement);
        }

        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
            resizeObserver.disconnect();
            if (frameIdRef.current) {
                cancelAnimationFrame(frameIdRef.current);
            }
            if (rendererRef.current && containerRef.current) {
                containerRef.current.removeChild(rendererRef.current.domElement);
            }
            if (rendererRef.current) {
                rendererRef.current.dispose();
            }
            if (materialRef.current) {
                materialRef.current.dispose();
            }
            geometry.dispose();
        };
    }, []);

    return (
        <div
            ref={containerRef}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 1,
                pointerEvents: 'none',
            }}
        />
    );
};

export default ShaderBackgroundStandalone;
