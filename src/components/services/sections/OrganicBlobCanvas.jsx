"use client";
import React, { useRef, useEffect } from 'react';

/**
 * WebGL Shader-based organic morphing blobs with internal gradients
 * - Smooth, curved shapes (no sharp points)
 * - Internal radial gradients calculated in shader
 */
const OrganicBlobCanvas = ({ className = '' }) => {
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

        // Fragment shader - soft luminous blobs with smooth blending
        const fragmentShaderSource = `
            precision mediump float;
            varying vec2 v_uv;
            uniform float u_time;
            uniform vec2 u_resolution;

            // Smooth organic deformation using only sine waves
            float organicRadius(float angle, float time, float seed) {
                float deform = 0.0;
                deform += sin(angle * 2.0 + time * 0.4 + seed) * 0.10;
                deform += cos(angle * 3.0 - time * 0.3 + seed * 1.3) * 0.07;
                deform += sin(angle * 4.0 + time * 0.5 + seed * 2.1) * 0.04;
                deform += sin(time * 0.25 + seed) * 0.025;
                return 1.0 + deform;
            }

            // Soft blob with very gradual falloff for smooth blending
            // Returns intensity based on gaussian-like falloff
            float softBlob(vec2 uv, vec2 center, float radius, float seed) {
                vec2 p = uv - center;
                float angle = atan(p.y, p.x);
                float dist = length(p);
                float deformedRadius = radius * organicRadius(angle, u_time, seed);

                // Gaussian-like soft falloff (no hard edges)
                float normalizedDist = dist / deformedRadius;
                float intensity = exp(-normalizedDist * normalizedDist * 2.5);

                // Extra smoothing at edges
                intensity *= smoothstep(2.0, 0.0, normalizedDist);

                return intensity;
            }

            // Soft gradient from center color to edge color
            vec3 softGradient(vec3 centerColor, vec3 edgeColor, vec2 uv, vec2 center, float radius, float seed) {
                vec2 p = uv - center;
                float angle = atan(p.y, p.x);
                float dist = length(p);
                float deformedRadius = radius * organicRadius(angle, u_time, seed);
                float normalizedDist = clamp(dist / deformedRadius, 0.0, 1.0);

                // Smooth eased gradient
                float t = normalizedDist * normalizedDist;
                return mix(centerColor, edgeColor, t);
            }

            void main() {
                vec2 uv = v_uv;
                float aspect = u_resolution.x / u_resolution.y;
                uv.x *= aspect;

                // Subtle dark background
                vec3 bg = vec3(0.02, 0.02, 0.04);

                // Site theme colors (spread similar colors apart)
                // Blob 1 (top-left): Magenta/pink
                vec3 center1 = vec3(0.9, 0.4, 0.7);
                vec3 edge1 = vec3(0.5, 0.15, 0.4);

                // Blob 2 (top-right): Teal
                vec3 center2 = vec3(0.3, 0.75, 0.8);
                vec3 edge2 = vec3(0.1, 0.4, 0.5);

                // Blob 3 (bottom-right): Blue
                vec3 center3 = vec3(0.45, 0.65, 0.95);
                vec3 edge3 = vec3(0.15, 0.3, 0.6);

                // Blob 4 (bottom-left): Purple
                vec3 center4 = vec3(0.65, 0.45, 0.95);
                vec3 edge4 = vec3(0.35, 0.2, 0.55);

                // Blob 5 (center): Cyan
                vec3 center5 = vec3(0.4, 0.85, 0.95);
                vec3 edge5 = vec3(0.1, 0.45, 0.55);

                // Animated positions (organic placement, avoiding center)
                float t = u_time * 0.18;

                vec2 pos1 = vec2(
                    0.2 * aspect + sin(t * 0.8) * 0.15 * aspect,
                    0.22 + cos(t * 0.6 + 0.5) * 0.12
                );
                vec2 pos2 = vec2(
                    0.8 * aspect + sin(t * 0.6 + 1.8) * 0.14 * aspect,
                    0.28 + cos(t * 0.7 + 2.3) * 0.1
                );
                vec2 pos3 = vec2(
                    0.75 * aspect + sin(t * 0.7 + 3.5) * 0.12 * aspect,
                    0.78 + cos(t * 0.5 + 1.2) * 0.11
                );
                vec2 pos4 = vec2(
                    0.15 * aspect + sin(t * 0.5 + 0.8) * 0.13 * aspect,
                    0.72 + cos(t * 0.8 + 4.0) * 0.1
                );
                vec2 pos5 = vec2(
                    0.5 * aspect + sin(t * 0.55 + 2.5) * 0.12 * aspect,
                    0.5 + cos(t * 0.45 + 1.8) * 0.1
                );

                // Blob sizes (slightly larger)
                float r1 = 0.28, r2 = 0.32, r3 = 0.24, r4 = 0.22, r5 = 0.26;

                // Calculate soft blob intensities
                float i1 = softBlob(uv, pos1, r1, 0.0);
                float i2 = softBlob(uv, pos2, r2, 1.5);
                float i3 = softBlob(uv, pos3, r3, 3.0);
                float i4 = softBlob(uv, pos4, r4, 4.5);
                float i5 = softBlob(uv, pos5, r5, 6.0);

                // Get gradient colors for each blob
                vec3 col1 = softGradient(center1, edge1, uv, pos1, r1, 0.0);
                vec3 col2 = softGradient(center2, edge2, uv, pos2, r2, 1.5);
                vec3 col3 = softGradient(center3, edge3, uv, pos3, r3, 3.0);
                vec3 col4 = softGradient(center4, edge4, uv, pos4, r4, 4.5);
                vec3 col5 = softGradient(center5, edge5, uv, pos5, r5, 6.0);

                // Additive blending for smooth overlap (like light)
                vec3 blobLight = vec3(0.0);
                blobLight += col1 * i1 * 0.35;
                blobLight += col2 * i2 * 0.35;
                blobLight += col3 * i3 * 0.3;
                blobLight += col4 * i4 * 0.3;
                blobLight += col5 * i5 * 0.32;

                // Combine with background using screen blend for luminosity
                vec3 color = bg + blobLight - bg * blobLight;

                // Subtle center glow boost
                float totalIntensity = i1 + i2 + i3 + i4 + i5;
                color += vec3(0.03, 0.03, 0.05) * totalIntensity * 0.3;

                // Edge vignette fade (darker at edges)
                vec2 uvCenter = v_uv - 0.5;
                float vignette = 1.0 - dot(uvCenter, uvCenter) * 1.2;
                vignette = smoothstep(0.0, 0.7, vignette);
                color *= vignette;

                // Additional soft fade at canvas borders
                float edgeFade = smoothstep(0.0, 0.15, v_uv.x) * smoothstep(1.0, 0.85, v_uv.x);
                edgeFade *= smoothstep(0.0, 0.15, v_uv.y) * smoothstep(1.0, 0.85, v_uv.y);
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
            className={`absolute inset-0 ${className}`}
            style={{ width: '100%', height: '100%' }}
        >
            <canvas ref={canvasRef} style={{ display: 'block' }} />
        </div>
    );
};

export default OrganicBlobCanvas;
