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

        // Fragment shader - ethereal flowing aurora mist
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

            // Layered noise for flowing effect - larger scale
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
                vec3 bg = vec3(0.01, 0.01, 0.02);

                // Aurora colors - brighter
                vec3 cyan = vec3(0.2, 0.85, 0.95);
                vec3 teal = vec3(0.15, 0.75, 0.65);
                vec3 purple = vec3(0.6, 0.3, 0.85);
                vec3 magenta = vec3(0.85, 0.25, 0.6);
                vec3 blue = vec3(0.3, 0.5, 0.9);

                // Flowing noise layers - larger patterns
                float n1 = flowNoise(uv * 0.8 + vec2(0.0, t * 0.1), t);
                float n2 = flowNoise(uv * 0.6 + vec2(t * 0.05, 0.0), t * 0.8);
                float n3 = flowNoise(uv * 0.5 + vec2(-t * 0.08, t * 0.05), t * 1.2);

                // Create soft color regions
                vec3 auroraLight = vec3(0.0);

                // Blend colors based on noise
                float blend1 = smoothstep(-0.3, 0.5, n1);
                float blend2 = smoothstep(-0.2, 0.6, n2);
                float blend3 = smoothstep(-0.4, 0.4, n3);

                // Layer colors - balanced background
                auroraLight += cyan * blend1 * 0.28;
                auroraLight += purple * blend2 * 0.24;
                auroraLight += teal * blend3 * 0.2;

                // Add highlight streaks
                float streak = snoise(vec2(uv.x * 2.0, uv.y * 1.0 + t * 0.2));
                streak = smoothstep(0.2, 0.7, streak);
                auroraLight += magenta * streak * 0.18;

                // Vertical fade - stronger at edges
                float vFade = smoothstep(0.0, 0.35, uv.y) * smoothstep(1.0, 0.5, uv.y);
                auroraLight *= vFade;

                // Horizontal concentration towards edges
                float hFade = 1.0 - smoothstep(0.0, 0.4, abs(uv.x - 0.5));
                hFade = 0.4 + hFade * 0.6;
                auroraLight *= hFade;

                // Screen blend
                vec3 color = bg + auroraLight - bg * auroraLight;

                // Soft vignette
                vec2 uvCenter = v_uv - 0.5;
                float vignette = 1.0 - dot(uvCenter, uvCenter) * 0.6;
                vignette = smoothstep(0.0, 0.85, vignette);
                color *= vignette;

                // Edge fade
                float edgeFade = smoothstep(0.0, 0.1, v_uv.x) * smoothstep(1.0, 0.9, v_uv.x);
                edgeFade *= smoothstep(0.0, 0.08, v_uv.y) * smoothstep(1.0, 0.92, v_uv.y);
                color *= edgeFade;

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
