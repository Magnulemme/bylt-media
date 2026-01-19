"use client";
import React, { useRef, useEffect } from 'react';

/**
 * WebGL Shader-based animated vertical lines
 * - Smooth, flowing vertical lines with organic movement
 * - Same color palette as OrganicBlobCanvas
 * - Soft gradients and luminous blending
 */
const VerticalLinesCanvas = ({ className = '' }) => {
    const canvasRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        const gl = canvas.getContext('webgl');
        if (!gl) {
            console.error('WebGL not supported');
            return;
        }

        // Vertex shader - simple fullscreen quad
        const vertexShaderSource = `
            attribute vec2 a_position;
            varying vec2 v_uv;
            void main() {
                v_uv = a_position * 0.5 + 0.5;
                gl_Position = vec4(a_position, 0.0, 1.0);
            }
        `;

        // Fragment shader - dot pattern with aurora colors (like useWaveBackground)
        const fragmentShaderSource = `
            precision mediump float;
            varying vec2 v_uv;
            uniform float u_time;
            uniform vec2 u_resolution;

            // Simplex-like noise for organic shapes
            vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
            vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
            vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

            float snoise(vec2 v) {
                const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                                   -0.577350269189626, 0.024390243902439);
                vec2 i  = floor(v + dot(v, C.yy));
                vec2 x0 = v - i + dot(i, C.xx);
                vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
                vec4 x12 = x0.xyxy + C.xxzz;
                x12.xy -= i1;
                i = mod289(i);
                vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
                vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
                m = m*m; m = m*m;
                vec3 x = 2.0 * fract(p * C.www) - 1.0;
                vec3 h = abs(x) - 0.5;
                vec3 ox = floor(x + 0.5);
                vec3 a0 = x - ox;
                m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
                vec3 g;
                g.x = a0.x * x0.x + h.x * x0.y;
                g.yz = a0.yz * x12.xz + h.yz * x12.yw;
                return 130.0 * dot(m, g);
            }

            // Layered noise for flowing effect
            float flowNoise(vec2 uv, float time) {
                float n = 0.0;
                n += snoise(uv * 1.0 + vec2(0.0, time * 0.15)) * 0.5;
                n += snoise(uv * 2.0 + vec2(time * 0.1, 0.0)) * 0.3;
                n += snoise(uv * 3.0 - vec2(0.0, time * 0.2)) * 0.2;
                return n;
            }

            void main() {
                vec2 uv = v_uv;
                float t = u_time * 0.3;

                // Dark background
                vec3 bg = vec3(0.008, 0.024, 0.09);

                // Dot grid
                float dotsAcross = 71.0;
                float aspectRatio = u_resolution.x / u_resolution.y;

                vec2 gridSize = vec2(dotsAcross, dotsAcross / aspectRatio);
                vec2 gridPos = v_uv * gridSize;
                vec2 cellId = floor(gridPos);
                vec2 cellUV = fract(gridPos);

                // Sample UV for this cell's center
                vec2 sampleUV = (cellId + 0.5) / gridSize;

                // === 3D WAVE DEFORMATION ===
                // Main wave that controls the "height" of the surface
                float waveMain = snoise(sampleUV * 2.0 + vec2(t * 0.15, t * 0.1)) * 0.5
                               + snoise(sampleUV * 3.5 + vec2(-t * 0.1, t * 0.08)) * 0.3
                               + snoise(sampleUV * 1.2 + vec2(t * 0.05, -t * 0.12)) * 0.2;

                // Normalize wave to 0-1 range (height/depth)
                float height = (waveMain + 1.0) * 0.5;
                height = clamp(height, 0.0, 1.0);

                // Apply easing for more dramatic 3D effect
                float height3D = smoothstep(0.0, 1.0, height);
                height3D = height3D * height3D; // quadratic for more contrast

                // Dot size based on height (bigger = closer/higher)
                // Range: 0.08 (far/low) to 0.5 (close/high)
                float dotRadius = 0.08 + height3D * 0.42;

                // Distance from cell center
                float dist = length(cellUV - 0.5) * 2.0;

                // Sharp circle
                float dot = 1.0 - smoothstep(dotRadius - 0.03, dotRadius, dist * 0.5);

                // Opacity based on height (more visible when "raised")
                float opacity = 0.1 + height3D * 0.5;

                // === COLORS with separate noise layers (like original) ===
                vec3 cyan = vec3(0.2, 0.85, 0.95);
                vec3 teal = vec3(0.15, 0.75, 0.65);
                vec3 purple = vec3(0.6, 0.3, 0.85);
                vec3 magenta = vec3(0.85, 0.25, 0.6);

                // Separate noise for each color (like original aurora)
                float n1 = flowNoise(sampleUV * 0.8 + vec2(0.0, t * 0.1), t);
                float n2 = flowNoise(sampleUV * 0.6 + vec2(t * 0.05, 0.0), t * 0.8);
                float n3 = flowNoise(sampleUV * 0.5 + vec2(-t * 0.08, t * 0.05), t * 1.2);

                // Color blending based on independent noise
                float blend1 = smoothstep(-0.3, 0.5, n1);
                float blend2 = smoothstep(-0.2, 0.6, n2);
                float blend3 = smoothstep(-0.4, 0.4, n3);

                vec3 dotColor = vec3(0.0);
                dotColor += cyan * blend1 * 0.35;
                dotColor += purple * blend2 * 0.55;
                dotColor += teal * blend3 * 0.5;

                // Add magenta streaks
                float streak = snoise(vec2(sampleUV.x * 2.0, sampleUV.y * 1.0 + t * 0.2));
                streak = smoothstep(0.2, 0.7, streak);
                dotColor += magenta * streak * 0.45;

                // Overall intensity with brightness cap to avoid peaks
                dotColor = dotColor * 1.35;
                dotColor = min(dotColor, vec3(0.75));

                // Vertical fade (expanded active area)
                float vFade = smoothstep(0.0, 0.15, sampleUV.y) * smoothstep(1.0, 0.75, sampleUV.y);

                // Horizontal fade (wider active area)
                float hFade = 1.0 - smoothstep(0.0, 0.55, abs(sampleUV.x - 0.5));
                hFade = 0.5 + hFade * 0.5;

                float totalFade = vFade * hFade;

                // Edge fade
                float edgeFade = smoothstep(0.0, 0.08, v_uv.x) * smoothstep(1.0, 0.92, v_uv.x);
                edgeFade *= smoothstep(0.0, 0.06, v_uv.y) * smoothstep(1.0, 0.94, v_uv.y);

                // Final color
                vec3 color = bg + dotColor * dot * opacity * totalFade * edgeFade;

                gl_FragColor = vec4(color, 1.0);
            }
        `;

        // Compile shader
        const compileShader = (source, type) => {
            const shader = gl.createShader(type);
            gl.shaderSource(shader, source);
            gl.compileShader(shader);
            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                console.error('Shader compile error:', gl.getShaderInfoLog(shader));
                return null;
            }
            return shader;
        };

        const vertexShader = compileShader(vertexShaderSource, gl.VERTEX_SHADER);
        const fragmentShader = compileShader(fragmentShaderSource, gl.FRAGMENT_SHADER);

        if (!vertexShader || !fragmentShader) return;

        // Create program
        const program = gl.createProgram();
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);

        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            console.error('Program link error:', gl.getProgramInfoLog(program));
            return;
        }

        gl.useProgram(program);

        // Create fullscreen quad
        const positions = new Float32Array([
            -1, -1,
             1, -1,
            -1,  1,
             1,  1,
        ]);

        const buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

        const positionLoc = gl.getAttribLocation(program, 'a_position');
        gl.enableVertexAttribArray(positionLoc);
        gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

        // Get uniform locations
        const timeLoc = gl.getUniformLocation(program, 'u_time');
        const resolutionLoc = gl.getUniformLocation(program, 'u_resolution');

        // Resize handler
        const updateSize = () => {
            const width = container.clientWidth;
            const height = container.clientHeight;
            const dpr = Math.min(window.devicePixelRatio || 1, 2);

            canvas.width = width * dpr;
            canvas.height = height * dpr;
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;

            gl.viewport(0, 0, canvas.width, canvas.height);
            gl.uniform2f(resolutionLoc, canvas.width, canvas.height);
        };

        updateSize();
        window.addEventListener('resize', updateSize);

        // Animation loop
        let animationId;
        const animate = (time) => {
            gl.uniform1f(timeLoc, time * 0.001);
            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
            animationId = requestAnimationFrame(animate);
        };

        animationId = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener('resize', updateSize);
            gl.deleteProgram(program);
            gl.deleteShader(vertexShader);
            gl.deleteShader(fragmentShader);
            gl.deleteBuffer(buffer);
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className={`absolute ${className || 'inset-0'}`}
        >
            <canvas ref={canvasRef} className="w-full h-full block" />
        </div>
    );
};

export default VerticalLinesCanvas;
