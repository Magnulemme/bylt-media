import React, { useRef, useEffect } from 'react';
import {
    Scene,
    PerspectiveCamera,
    WebGLRenderer,
    TorusGeometry,
    Group,
    SphereGeometry,
    Mesh,
    LineBasicMaterial,
    BufferGeometry,
    Line,
    Vector3,
    Color,
    ShaderMaterial
} from 'three';

const Torus3D = ({ className = '' }) => {
    const mountRef = useRef(null);
    const animationFrameRef = useRef(null);

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
        camera.position.z = 4;

        const torusGroup = new Group();

        // Create TorusGeometry to get the vertex grid
        // radialSegments = segments around the torus (big circle)
        // tubularSegments = segments around the tube (small circle)
        const radialSegments = 32;
        const tubularSegments = 16;
        const torusGeometry = new TorusGeometry(0.55, 0.2, tubularSegments, radialSegments);

        const positions = torusGeometry.attributes.position.array;
        const vertexCount = positions.length / 3;

        // Create sphere nodes at vertices
        const nodes = [];
        const colors = [
            new Color(0x06b6d4), // cyan
            new Color(0x3b82f6), // blue
            new Color(0x8b5cf6), // purple
        ];

        // Sample vertices (not all, to keep performance good)
        const sampleRate = 2;
        const sampledIndices = [];

        for (let i = 0; i < vertexCount; i += sampleRate) {
            sampledIndices.push(i);
        }

        for (let i = 0; i < sampledIndices.length; i++) {
            const vertexIndex = sampledIndices[i];
            const x = positions[vertexIndex * 3];
            const y = positions[vertexIndex * 3 + 1];
            const z = positions[vertexIndex * 3 + 2];

            const geometry = new SphereGeometry(0.025, 12, 12);
            const colorIndex = Math.floor(Math.random() * colors.length);
            const baseColor = colors[colorIndex].clone();

            const material = new ShaderMaterial({
                vertexShader: sphereVertexShader,
                fragmentShader: sphereFragmentShader,
                transparent: true,
                uniforms: {
                    uTime: { value: 0 },
                    uBaseColor: { value: baseColor },
                    uOpacity: { value: 0.9 },
                    uGlow: { value: 0.1 }
                }
            });

            const node = new Mesh(geometry, material);
            node.position.set(x, y, z);

            nodes.push({
                mesh: node,
                basePosition: new Vector3(x, y, z),
                originalIndex: vertexIndex,
                gridI: Math.floor(vertexIndex / (tubularSegments + 1)), // Position around torus
                gridJ: vertexIndex % (tubularSegments + 1), // Position around tube
                phaseOffset: Math.random() * Math.PI * 2
            });

            torusGroup.add(node);
        }

        // Create connections between nearby nodes (like the sphere)
        const connections = [];
        const maxDistance = 0.35;

        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const distance = nodes[i].basePosition.distanceTo(nodes[j].basePosition);
                if (distance < maxDistance) {
                    const lineMaterial = new LineBasicMaterial({
                        color: 0x3b82f6,
                        transparent: true,
                        opacity: 0.3
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

        torusGroup.scale.setScalar(0.9);
        scene.add(torusGroup);

        let isVisible = true;
        let time = 0;

        // Morphing parameters
        let morphIntensity = 1.0;
        let morphDirection = 1;

        const animate = () => {
            animationFrameRef.current = requestAnimationFrame(animate);

            if (!isVisible) return;

            time += 0.016;

            // Oscillate morph intensity
            morphIntensity += morphDirection * 0.002;
            if (morphIntensity > 1.12) morphDirection = -1;
            if (morphIntensity < 0.88) morphDirection = 1;

            // Animate sphere nodes with organic deformations
            nodes.forEach((nodeData, index) => {
                const basePos = nodeData.basePosition;
                let posX = basePos.x;
                let posY = basePos.y;
                let posZ = basePos.z;

                // 1. Multi-layered twist effect
                const twistAmount1 = Math.sin(time * 0.5) * 0.25;
                const twistAmount2 = Math.cos(time * 0.35) * 0.1;
                const twist = posY * twistAmount1 + posX * twistAmount2;
                const cosT = Math.cos(twist);
                const sinT = Math.sin(twist);
                const newX = basePos.x * cosT - basePos.z * sinT;
                const newZ = basePos.x * sinT + basePos.z * cosT;
                posX = newX;
                posZ = newZ;

                // 2. Breathing/pulse effect
                const breathe = 1.0 + Math.sin(time * 1.0 + nodeData.phaseOffset * 0.3) * 0.05 * morphIntensity;
                posX *= breathe;
                posY *= breathe;
                posZ *= breathe;

                // 3. Wave along the torus
                const curvePhase = (nodeData.gridI / radialSegments) * Math.PI * 2;
                const waveOffset = Math.sin(curvePhase * 4 + time * 2) * 0.02;
                const len = Math.sqrt(basePos.x * basePos.x + basePos.y * basePos.y + basePos.z * basePos.z);
                if (len > 0) {
                    posX += (basePos.x / len) * waveOffset;
                    posY += (basePos.y / len) * waveOffset;
                    posZ += (basePos.z / len) * waveOffset;
                }

                // 4. Subtle noise displacement
                const noise1 = Math.sin(posX * 5.0 + time * 1.8) * Math.cos(posY * 4.0 + time * 1.5);
                const noise2 = Math.cos(posZ * 6.0 + time * 1.2) * Math.sin(posX * 3.0 + time * 2.0);
                if (len > 0) {
                    const noiseAmount = (noise1 + noise2) * 0.01 * morphIntensity;
                    posX += (basePos.x / len) * noiseAmount;
                    posY += (basePos.y / len) * noiseAmount;
                    posZ += (basePos.z / len) * noiseAmount;
                }

                // Apply final position
                nodeData.mesh.position.set(posX, posY, posZ);

                // Update shader uniforms
                nodeData.mesh.material.uniforms.uTime.value = time + index * 0.05;

                // Pulse opacity
                const baseOpacity = 0.85 + Math.sin(time * 2 + index * 0.1) * 0.1;
                nodeData.mesh.material.uniforms.uOpacity.value = baseOpacity;

                // Glow pulse
                const glow = Math.sin(time * 2.5 + index * 0.2) * 0.1 + 0.08;
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

                // Fade based on distance
                const distance = conn.nodeA.mesh.position.distanceTo(conn.nodeB.mesh.position);
                conn.line.material.opacity = Math.max(0.1, 0.4 - distance * 0.8);
            });

            // Slow rotation
            torusGroup.rotation.y += 0.003;
            torusGroup.rotation.x = Math.sin(time * 0.2) * 0.15;

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
