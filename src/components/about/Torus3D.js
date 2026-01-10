import React, { useRef, useEffect } from 'react';
import {
    Scene,
    PerspectiveCamera,
    WebGLRenderer,
    TorusKnotGeometry,
    SphereGeometry,
    ShaderMaterial,
    Mesh,
    Group,
    LineBasicMaterial,
    BufferGeometry,
    Float32BufferAttribute,
    LineSegments,
    Color
} from 'three';

const Torus3D = ({ className = '' }) => {
    const mountRef = useRef(null);
    const animationFrameRef = useRef(null);

    // Vertex Shader
    const vertexShader = `
        varying vec3 vNormal;
        varying vec3 vPosition;

        void main() {
            vNormal = normalize(normalMatrix * normal);
            vPosition = position;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `;

    // Fragment Shader with animated gradient
    const fragmentShader = `
        uniform float uTime;
        uniform vec3 uBaseColor;
        uniform float uOpacity;

        varying vec3 vNormal;
        varying vec3 vPosition;

        vec3 brighten(vec3 color, float amount) {
            return color + vec3(amount);
        }

        vec3 darken(vec3 color, float amount) {
            return color * (1.0 - amount);
        }

        void main() {
            vec3 lightDirection = normalize(vec3(1.0, 1.0, 1.0));
            float lightIntensity = dot(vNormal, lightDirection) * 0.5 + 0.5;

            float wave1 = sin(vPosition.x * 3.0 + uTime * 2.0) * 0.5 + 0.5;
            float wave2 = cos(vPosition.y * 3.0 + uTime * 1.5) * 0.5 + 0.5;
            float wave3 = sin(vPosition.z * 3.0 + uTime * 1.8) * 0.5 + 0.5;

            float gradientMix = (wave1 + wave2 + wave3) / 3.0;

            vec3 darkColor = darken(uBaseColor, 0.3);
            vec3 brightColor = brighten(uBaseColor, 0.4);

            vec3 color = mix(darkColor, brightColor, gradientMix);

            float fresnel = pow(1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0))), 3.0);
            color += fresnel * brighten(uBaseColor, 0.3) * 0.5;

            color *= lightIntensity;

            gl_FragColor = vec4(color, uOpacity);
        }
    `;

    useEffect(() => {
        if (typeof window === 'undefined') return;
        const currentMount = mountRef.current;
        if (!currentMount) return;

        const scene = new Scene();
        const camera = new PerspectiveCamera(30, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
        const renderer = new WebGLRenderer({
            alpha: true,
            antialias: true,
            powerPreference: 'high-performance'
        });

        renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
        currentMount.appendChild(renderer.domElement);
        camera.position.z = 3.5;

        const networkGroup = new Group();

        // Reduced geometry complexity
        const torusGeometry = new TorusKnotGeometry(0.5, 0.18, 64, 8, 2, 3);
        const vertices = torusGeometry.attributes.position.array;

        // Reduced node count for performance
        const nodes = [];
        const nodeCount = 40;
        const colors = [0x06b6d4, 0x3b82f6, 0x8b5cf6];

        // Shared geometry for all nodes (16x16 for smooth look)
        const sharedNodeGeometry = new SphereGeometry(0.035, 16, 16);

        const step = Math.floor(vertices.length / 3 / nodeCount);
        for (let i = 0; i < nodeCount; i++) {
            const idx = (i * step) % (vertices.length / 3);
            const vertexIndex = idx * 3;

            const colorIndex = Math.floor(Math.random() * colors.length);
            const baseColor = new Color(colors[colorIndex]);

            const material = new ShaderMaterial({
                vertexShader,
                fragmentShader,
                transparent: true,
                uniforms: {
                    uTime: { value: 0 },
                    uBaseColor: { value: baseColor },
                    uOpacity: { value: 0.9 }
                }
            });

            const node = new Mesh(sharedNodeGeometry, material);
            node.position.set(
                vertices[vertexIndex],
                vertices[vertexIndex + 1],
                vertices[vertexIndex + 2]
            );

            nodes.push({
                mesh: node,
                originalIndex: vertexIndex,
                speed: Math.random() * 0.3 + 0.2,
                orbitSpeed: (Math.random() - 0.5) * 0.5,
                orbitRadius: Math.random() * 0.02 + 0.01,
                phaseOffset: Math.random() * Math.PI * 2,
                floatSpeed: Math.random() * 0.5 + 0.3
            });

            networkGroup.add(node);
        }

        // Wireframe
        const wireframeMaterial = new LineBasicMaterial({
            color: 0x3b82f6,
            transparent: true,
            opacity: 0.25
        });

        const indices = torusGeometry.index ? torusGeometry.index.array : null;
        const wireframePositions = [];

        if (indices) {
            for (let i = 0; i < indices.length; i += 3) {
                const a = indices[i] * 3;
                const b = indices[i + 1] * 3;
                const c = indices[i + 2] * 3;

                wireframePositions.push(
                    vertices[a], vertices[a + 1], vertices[a + 2],
                    vertices[b], vertices[b + 1], vertices[b + 2],
                    vertices[b], vertices[b + 1], vertices[b + 2],
                    vertices[c], vertices[c + 1], vertices[c + 2],
                    vertices[c], vertices[c + 1], vertices[c + 2],
                    vertices[a], vertices[a + 1], vertices[a + 2]
                );
            }
        }

        const wireframeGeometry = new BufferGeometry();
        wireframeGeometry.setAttribute('position', new Float32BufferAttribute(wireframePositions, 3));
        const wireframe = new LineSegments(wireframeGeometry, wireframeMaterial);
        networkGroup.add(wireframe);

        scene.add(networkGroup);

        // Store original vertex positions
        const originalVertices = new Float32Array(vertices.length);
        originalVertices.set(vertices);

        let time = 0;
        let lastFrameTime = 0;
        const targetFPS = 30;
        const frameInterval = 1000 / targetFPS;

        const animate = (currentTime) => {
            animationFrameRef.current = requestAnimationFrame(animate);

            // Throttle to target FPS
            const deltaTime = currentTime - lastFrameTime;
            if (deltaTime < frameInterval) return;
            lastFrameTime = currentTime - (deltaTime % frameInterval);

            time += 0.015;

            // Vertex animation with twist and wave
            const twistAmount = Math.sin(time * 0.6) * 0.3;

            for (let i = 0; i < vertices.length; i += 3) {
                const x = originalVertices[i];
                const y = originalVertices[i + 1];
                const z = originalVertices[i + 2];

                const dist = Math.sqrt(x * x + y * y + z * z);

                const twist = y * twistAmount;
                const cosT = Math.cos(twist);
                const sinT = Math.sin(twist);

                const wave = Math.sin(dist * 4 + time * 2.5) * 0.02;
                const invDist = 1 / (dist || 1);

                vertices[i] = x * cosT - z * sinT + wave * x * invDist;
                vertices[i + 1] = y + wave;
                vertices[i + 2] = x * sinT + z * cosT + wave * z * invDist;
            }

            torusGeometry.attributes.position.needsUpdate = true;

            // Update wireframe
            if (indices) {
                const wirePos = wireframeGeometry.attributes.position.array;
                let wi = 0;
                for (let i = 0; i < indices.length; i += 3) {
                    const a = indices[i] * 3;
                    const b = indices[i + 1] * 3;
                    const c = indices[i + 2] * 3;

                    wirePos[wi++] = vertices[a]; wirePos[wi++] = vertices[a + 1]; wirePos[wi++] = vertices[a + 2];
                    wirePos[wi++] = vertices[b]; wirePos[wi++] = vertices[b + 1]; wirePos[wi++] = vertices[b + 2];
                    wirePos[wi++] = vertices[b]; wirePos[wi++] = vertices[b + 1]; wirePos[wi++] = vertices[b + 2];
                    wirePos[wi++] = vertices[c]; wirePos[wi++] = vertices[c + 1]; wirePos[wi++] = vertices[c + 2];
                    wirePos[wi++] = vertices[c]; wirePos[wi++] = vertices[c + 1]; wirePos[wi++] = vertices[c + 2];
                    wirePos[wi++] = vertices[a]; wirePos[wi++] = vertices[a + 1]; wirePos[wi++] = vertices[a + 2];
                }
                wireframeGeometry.attributes.position.needsUpdate = true;
            }

            // Animate nodes
            nodes.forEach((nodeData, index) => {
                const vi = nodeData.originalIndex;
                const baseX = vertices[vi];
                const baseY = vertices[vi + 1];
                const baseZ = vertices[vi + 2];

                const offset = time * nodeData.speed + nodeData.phaseOffset;
                const breathe = Math.sin(offset) * 0.01;

                const orbitAngle = time * nodeData.orbitSpeed;
                const orbitX = Math.cos(orbitAngle) * nodeData.orbitRadius;
                const orbitY = Math.sin(orbitAngle) * nodeData.orbitRadius;

                const floatY = Math.sin(time * nodeData.floatSpeed + index) * 0.015;

                nodeData.mesh.position.x = baseX + breathe + orbitX;
                nodeData.mesh.position.y = baseY + floatY + orbitY;
                nodeData.mesh.position.z = baseZ + breathe;

                // Update shader uniforms
                nodeData.mesh.material.uniforms.uTime.value = time + index * 0.1;

                const baseOpacity = 0.75 + Math.sin(time * 2 + index) * 0.15;
                nodeData.mesh.material.uniforms.uOpacity.value = baseOpacity;
            });

            // Slow rotation
            networkGroup.rotation.y += 0.002;
            networkGroup.rotation.x = Math.sin(time * 0.15) * 0.08;

            renderer.render(scene, camera);
        };

        animate(0);

        const handleResize = () => {
            if (!currentMount) return;
            const width = currentMount.clientWidth;
            const height = currentMount.clientHeight;

            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize(width, height);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
            if (currentMount && renderer.domElement) {
                currentMount.removeChild(renderer.domElement);
            }

            torusGeometry.dispose();
            wireframeGeometry.dispose();
            wireframeMaterial.dispose();
            sharedNodeGeometry.dispose();

            nodes.forEach((nodeData) => {
                nodeData.mesh.material.dispose();
            });

            renderer.dispose();
        };
    }, []);

    return (
        <div
            ref={mountRef}
            className={`w-full h-full ${className}`}
        />
    );
};

export default Torus3D;
