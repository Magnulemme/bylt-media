"use client";
import React, { useRef, useEffect } from 'react';

/**
 * WebGL Shader-based morphing blobs
 */
const MainCardWaveCanvas = ({ className = '' }) => {
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

        // Fragment shader - morphing blobs with gradient
        const fragmentShaderSource = `
            precision mediump float;
            varying vec2 v_uv;
            uniform float u_time;
            uniform vec2 u_resolution;

            // Simplex noise function
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

            // Blob SDF with noise deformation
            float blob(vec2 uv, vec2 center, float radius, float seed) {
                vec2 p = uv - center;
                float angle = atan(p.y, p.x);
                float dist = length(p);

                // Noise-based deformation
                float noise1 = snoise(vec2(angle * 2.0 + seed, u_time * 0.3)) * 0.15;
                float noise2 = snoise(vec2(angle * 3.0 - seed * 0.5, u_time * 0.2 + 1.0)) * 0.1;
                float noise3 = snoise(vec2(angle * 5.0 + seed * 0.3, u_time * 0.4)) * 0.05;

                float deformedRadius = radius * (1.0 + noise1 + noise2 + noise3);

                return smoothstep(deformedRadius, deformedRadius - 0.08, dist);
            }

            void main() {
                vec2 uv = v_uv;
                float aspect = u_resolution.x / u_resolution.y;
                uv.x *= aspect;

                // Colors
                vec3 cyan = vec3(0.024, 0.714, 0.831);
                vec3 purple = vec3(0.545, 0.361, 0.965);
                vec3 pink = vec3(0.925, 0.282, 0.6);
                vec3 blue = vec3(0.231, 0.51, 0.965);
                vec3 bg = vec3(0.008, 0.024, 0.09);

                // Animated blob positions
                float t = u_time * 0.15;

                vec2 center1 = vec2(
                    0.3 * aspect + sin(t * 0.7) * 0.15 * aspect,
                    0.3 + cos(t * 0.5) * 0.1
                );
                vec2 center2 = vec2(
                    0.7 * aspect + sin(t * 0.5 + 2.0) * 0.12 * aspect,
                    0.45 + cos(t * 0.6 + 1.0) * 0.08
                );
                vec2 center3 = vec2(
                    0.5 * aspect + sin(t * 0.6 + 4.0) * 0.1 * aspect,
                    0.72 + cos(t * 0.4 + 3.0) * 0.1
                );
                vec2 center4 = vec2(
                    0.25 * aspect + sin(t * 0.4 + 1.0) * 0.08 * aspect,
                    0.55 + cos(t * 0.7 + 2.0) * 0.08
                );

                // Calculate blobs
                float b1 = blob(uv, center1, 0.22, 0.0);
                float b2 = blob(uv, center2, 0.25, 1.5);
                float b3 = blob(uv, center3, 0.18, 3.0);
                float b4 = blob(uv, center4, 0.15, 4.5);

                // Combine with colors
                vec3 color = bg;

                // Layer blobs with their colors
                color = mix(color, cyan, b1 * 0.7);
                color = mix(color, purple, b2 * 0.7);
                color = mix(color, pink, b3 * 0.7);
                color = mix(color, blue, b4 * 0.7);

                // Add subtle glow where blobs overlap
                float overlap = b1 * b2 + b2 * b3 + b3 * b4 + b1 * b4;
                color += vec3(0.1, 0.1, 0.15) * overlap * 0.5;

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
            className={`absolute inset-0 ${className}`}
            style={{ width: '100%', height: '100%' }}
        >
            <canvas ref={canvasRef} style={{ display: 'block' }} />
        </div>
    );
};

export default MainCardWaveCanvas;
