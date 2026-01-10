import React, { useRef, useEffect } from 'react';
import {
    Scene,
    PerspectiveCamera,
    WebGLRenderer,
    TorusKnotGeometry,
    WireframeGeometry,
    ShaderMaterial,
    LineSegments,
    Group,
    SphereGeometry,
    Mesh,
    LineBasicMaterial,
    BufferGeometry,
    Line,
    Vector3,
    Color
} from 'three';

const Torus3D = ({ className = '' }) => {
    const mountRef = useRef(null);
    const animationFrameRef = useRef(null);

    // Vertex shader with advanced morphing animations
    const vertexShader = `
        uniform float uTime;
        uniform float uMorphIntensity;
        uniform float uPulsePhase;

        void main() {
            vec3 pos = position;

            // Multi-layered twist effect
            float twistAmount1 = sin(uTime * 0.6) * 0.35;
            float twistAmount2 = cos(uTime * 0.4) * 0.15;
            float twist = pos.y * twistAmount1 + pos.x * twistAmount2;
            float cosT = cos(twist);
            float sinT = sin(twist);
            pos.x = position.x * cosT - position.z * sinT;
            pos.z = position.x * sinT + position.z * cosT;

            // Breathing/pulse effect
            float breathe = 1.0 + sin(uTime * 1.2 + uPulsePhase) * 0.08 * uMorphIntensity;
            pos *= breathe;

            // Spiral wave deformation
            float angle = atan(position.z, position.x);
            float spiralWave = sin(angle * 3.0 + uTime * 1.5 + position.y * 2.0) * 0.04;
            pos += normalize(position) * spiralWave;

            // Organic noise-like displacement
            float noise1 = sin(pos.x * 4.0 + uTime * 2.0) * cos(pos.y * 3.0 + uTime * 1.7);
            float noise2 = cos(pos.z * 5.0 + uTime * 1.3) * sin(pos.x * 2.0 + uTime * 2.2);
            pos += normalize(position) * (noise1 + noise2) * 0.015 * uMorphIntensity;

            // Ripple effect from center
            float dist = length(position);
            float ripple = sin(dist * 6.0 - uTime * 3.0) * 0.02;
            pos += normalize(position) * ripple;

            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
    `;

    // Fragment shader with animated color
    const fragmentShader = `
        uniform float uOpacity;
        uniform float uTime;

        void main() {
            // Subtle color shift over time
            float colorShift = sin(uTime * 0.5) * 0.05;
            vec3 baseColor = vec3(0.231, 0.510, 0.965);
            vec3 accentColor = vec3(0.545, 0.361, 0.965); // purple accent
            vec3 color = mix(baseColor, accentColor, 0.2 + colorShift);
            gl_FragColor = vec4(color, uOpacity);
        }
    `;

    // Sphere shader for nodes
    const sphereVertexShader = `
        varying vec3 vNormal;
        varying vec3 vPosition;

        void main() {
            vNormal = normalize(normalMatrix * normal);
            vPosition = position;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `;

    const sphereFragmentShader = `
        uniform float uTime;
        uniform vec3 uBaseColor;
        uniform float uOpacity;
        uniform float uGlow;

        varying vec3 vNormal;
        varying vec3 vPosition;

        void main() {
            vec3 lightDirection = normalize(vec3(1.0, 1.0, 1.0));
            float lightIntensity = dot(vNormal, lightDirection) * 0.5 + 0.5;

            float wave = sin(vPosition.x * 3.0 + uTime * 1.5) * 0.5 + 0.5;
            vec3 darkColor = uBaseColor * 0.7;
            vec3 brightColor = uBaseColor + vec3(0.3);
            vec3 color = mix(darkColor, brightColor, wave);

            float fresnel = pow(1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0))), 2.5);
            color += fresnel * brightColor * 0.4;

            color *= lightIntensity;
            color += brightColor * uGlow * 0.5;

            gl_FragColor = vec4(color, uOpacity);
        }
    `;

    useEffect(() => {
        if (typeof window === 'undefined') return;
        const currentMount = mountRef.current;
        if (!currentMount) return;

        const width = currentMount.clientWidth;
        const height = currentMount.clientHeight;

        const scene = new Scene();
        const camera = new PerspectiveCamera(30, width / height, 0.1, 1000);
        const renderer = new WebGLRenderer({
            alpha: true,
            antialias: true,
            powerPreference: 'high-performance'
        });

        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        currentMount.appendChild(renderer.domElement);
        camera.position.z = 3.5;

        const torusGroup = new Group();

        // Create torus knot geometry
        const torusGeometry = new TorusKnotGeometry(0.5, 0.18, 100, 16, 2, 3);
        const wireframeGeometry = new WireframeGeometry(torusGeometry);

        const wireframeMaterial = new ShaderMaterial({
            vertexShader,
            fragmentShader,
            transparent: true,
            uniforms: {
                uTime: { value: 0 },
                uOpacity: { value: 0.5 },
                uMorphIntensity: { value: 1.0 },
                uPulsePhase: { value: 0 }
            }
        });

        const wireframe = new LineSegments(wireframeGeometry, wireframeMaterial);
        torusGroup.add(wireframe);

        // Get vertices from torus geometry to sample surface points
        const vertices = torusGeometry.attributes.position.array;

        // Create nodes on the surface
        const nodes = [];
        const nodeCount = 60;
        const colors = [
            new Color(0x06b6d4),
            new Color(0x3b82f6),
            new Color(0x8b5cf6),
        ];

        // Sample evenly distributed points from the torus knot surface
        const step = Math.floor(vertices.length / 3 / nodeCount);
        for (let i = 0; i < nodeCount; i++) {
            const idx = (i * step) % (vertices.length / 3);
            const vertexIndex = idx * 3;

            const geometry = new SphereGeometry(0.03, 16, 16);
            const colorIndex = Math.floor(Math.random() * colors.length);
            const baseColor = colors[colorIndex].clone();

            const material = new ShaderMaterial({
                vertexShader: sphereVertexShader,
                fragmentShader: sphereFragmentShader,
                transparent: true,
                uniforms: {
                    uTime: { value: 0 },
                    uBaseColor: { value: baseColor },
                    uOpacity: { value: 0.85 },
                    uGlow: { value: 0 }
                }
            });

            const node = new Mesh(geometry, material);
            node.position.set(
                vertices[vertexIndex],
                vertices[vertexIndex + 1],
                vertices[vertexIndex + 2]
            );

            // Calculate surface normal from position (pointing outward from center)
            const surfaceNormal = new Vector3(
                vertices[vertexIndex],
                vertices[vertexIndex + 1],
                vertices[vertexIndex + 2]
            ).normalize();

            nodes.push({
                mesh: node,
                basePosition: node.position.clone(),
                surfaceNormal: surfaceNormal,
                speed: Math.random() * 0.3 + 0.2,
                orbitSpeed: (Math.random() - 0.5) * 0.5,
                orbitRadius: Math.random() * 0.02 + 0.01,
                phaseOffset: Math.random() * Math.PI * 2,
                floatSpeed: Math.random() * 0.5 + 0.3
            });

            torusGroup.add(node);
        }

        // Create connections
        const connections = [];
        const maxDistance = 0.3;

        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const distance = nodes[i].mesh.position.distanceTo(nodes[j].mesh.position);
                if (distance < maxDistance) {
                    const lineMaterial = new LineBasicMaterial({
                        color: 0x3b82f6,
                        transparent: true,
                        opacity: 0.2
                    });

                    const lineGeometry = new BufferGeometry().setFromPoints([
                        nodes[i].mesh.position.clone(),
                        nodes[j].mesh.position.clone()
                    ]);

                    const line = new Line(lineGeometry, lineMaterial);
                    connections.push({
                        line: line,
                        nodeA: nodes[i],
                        nodeB: nodes[j]
                    });
                    torusGroup.add(line);
                }
            }
        }

        // Scale down to leave room for oscillation
        torusGroup.scale.setScalar(0.5);
        scene.add(torusGroup);

        let isVisible = true;
        let time = 0;

        // Morphing intensity oscillation
        let morphIntensity = 1.0;
        let morphDirection = 1;

        const animate = () => {
            animationFrameRef.current = requestAnimationFrame(animate);

            if (!isVisible) return;

            time += 0.016;

            // Oscillate morph intensity for breathing effect (reduced range to avoid clipping)
            morphIntensity += morphDirection * 0.002;
            if (morphIntensity > 1.1) morphDirection = -1;
            if (morphIntensity < 0.9) morphDirection = 1;

            wireframeMaterial.uniforms.uTime.value = time;
            wireframeMaterial.uniforms.uMorphIntensity.value = morphIntensity;
            wireframeMaterial.uniforms.uPulsePhase.value = Math.sin(time * 0.5) * Math.PI;

            // Animate sphere nodes - apply same transformations as wireframe shader
            nodes.forEach((nodeData, index) => {
                const basePos = nodeData.basePosition;
                let posX = basePos.x;
                let posY = basePos.y;
                let posZ = basePos.z;

                // 1. Multi-layered twist effect (same as shader)
                const twistAmount1 = Math.sin(time * 0.6) * 0.35;
                const twistAmount2 = Math.cos(time * 0.4) * 0.15;
                const twist = posY * twistAmount1 + posX * twistAmount2;
                const cosT = Math.cos(twist);
                const sinT = Math.sin(twist);
                const newX = basePos.x * cosT - basePos.z * sinT;
                const newZ = basePos.x * sinT + basePos.z * cosT;
                posX = newX;
                posZ = newZ;

                // 2. Breathing/pulse effect (same as shader)
                const breathe = 1.0 + Math.sin(time * 1.2 + Math.sin(time * 0.5) * Math.PI) * 0.08 * morphIntensity;
                posX *= breathe;
                posY *= breathe;
                posZ *= breathe;

                // 3. Spiral wave deformation
                const angle = Math.atan2(basePos.z, basePos.x);
                const len = Math.sqrt(basePos.x * basePos.x + basePos.y * basePos.y + basePos.z * basePos.z);
                const spiralWave = Math.sin(angle * 3.0 + time * 1.5 + basePos.y * 2.0) * 0.04;
                if (len > 0) {
                    posX += (basePos.x / len) * spiralWave;
                    posY += (basePos.y / len) * spiralWave;
                    posZ += (basePos.z / len) * spiralWave;
                }

                // 4. Organic noise-like displacement
                const noise1 = Math.sin(posX * 4.0 + time * 2.0) * Math.cos(posY * 3.0 + time * 1.7);
                const noise2 = Math.cos(posZ * 5.0 + time * 1.3) * Math.sin(posX * 2.0 + time * 2.2);
                if (len > 0) {
                    const noiseAmount = (noise1 + noise2) * 0.015 * morphIntensity;
                    posX += (basePos.x / len) * noiseAmount;
                    posY += (basePos.y / len) * noiseAmount;
                    posZ += (basePos.z / len) * noiseAmount;
                }

                // 5. Ripple effect from center
                const dist = Math.sqrt(basePos.x * basePos.x + basePos.y * basePos.y + basePos.z * basePos.z);
                const ripple = Math.sin(dist * 6.0 - time * 3.0) * 0.02;
                if (len > 0) {
                    posX += (basePos.x / len) * ripple;
                    posY += (basePos.y / len) * ripple;
                    posZ += (basePos.z / len) * ripple;
                }

                // Apply final position
                nodeData.mesh.position.set(posX, posY, posZ);

                // Update shader uniforms
                nodeData.mesh.material.uniforms.uTime.value = time + index * 0.1;

                // Pulse opacity
                const baseOpacity = 0.75 + Math.sin(time * 2 + index) * 0.15;
                nodeData.mesh.material.uniforms.uOpacity.value = baseOpacity;

                // Subtle glow pulse
                const glow = Math.sin(time * 3 + index * 0.5) * 0.15 + 0.1;
                nodeData.mesh.material.uniforms.uGlow.value = Math.max(0, glow);
            });

            // Update connection lines
            connections.forEach((conn) => {
                const positions = conn.line.geometry.attributes.position.array;
                positions[0] = conn.nodeA.mesh.position.x;
                positions[1] = conn.nodeA.mesh.position.y;
                positions[2] = conn.nodeA.mesh.position.z;
                positions[3] = conn.nodeB.mesh.position.x;
                positions[4] = conn.nodeB.mesh.position.y;
                positions[5] = conn.nodeB.mesh.position.z;
                conn.line.geometry.attributes.position.needsUpdate = true;

                // Pulse line opacity based on distance
                const distance = conn.nodeA.mesh.position.distanceTo(conn.nodeB.mesh.position);
                conn.line.material.opacity = Math.max(0, 0.35 - distance * 0.5);
            });

            // Slow rotation (only Y axis to avoid clipping)
            torusGroup.rotation.y += 0.002;
            renderer.render(scene, camera);
        };

        animate();

        const observer = new IntersectionObserver(
            (entries) => {
                isVisible = entries[0].isIntersecting;
            },
            { threshold: 0.1 }
        );
        observer.observe(currentMount);

        const handleResize = () => {
            if (!currentMount) return;
            const w = currentMount.clientWidth;
            const h = currentMount.clientHeight;
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
            renderer.setSize(w, h);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            observer.disconnect();
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

            nodes.forEach((nodeData) => {
                if (nodeData.mesh.geometry) nodeData.mesh.geometry.dispose();
                if (nodeData.mesh.material) nodeData.mesh.material.dispose();
            });

            connections.forEach((conn) => {
                if (conn.line.geometry) conn.line.geometry.dispose();
                if (conn.line.material) conn.line.material.dispose();
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
