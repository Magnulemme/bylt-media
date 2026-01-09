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
    Line,
    Vector3,
    AmbientLight,
    PointLight,
    DirectionalLight,
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
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        currentMount.appendChild(renderer.domElement);
        camera.position.z = 3.5;

        // Add lighting for 3D depth
        const ambientLight = new AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);

        const pointLight1 = new PointLight(0x06b6d4, 1.5, 100);
        pointLight1.position.set(5, 5, 5);
        scene.add(pointLight1);

        const pointLight2 = new PointLight(0x8b5cf6, 1.2, 100);
        pointLight2.position.set(-5, -5, 5);
        scene.add(pointLight2);

        const directionalLight = new DirectionalLight(0x3b82f6, 0.8);
        directionalLight.position.set(0, 10, 10);
        scene.add(directionalLight);

        const networkGroup = new Group();

        // Create torus knot geometry to sample points from
        const torusGeometry = new TorusKnotGeometry(0.5, 0.18, 100, 16, 2, 3);
        const vertices = torusGeometry.attributes.position.array;

        // Sample nodes from torus knot vertices
        const nodes = [];
        const nodeCount = 80;
        const colors = [
            0x06b6d4, // cyan
            0x3b82f6, // blue
            0x8b5cf6, // purple
        ];

        // Sample evenly distributed points from the torus knot
        const step = Math.floor(vertices.length / 3 / nodeCount);
        for (let i = 0; i < nodeCount; i++) {
            const idx = (i * step) % (vertices.length / 3);
            const vertexIndex = idx * 3;

            const geometry = new SphereGeometry(0.035, 16, 16);
            const colorIndex = Math.floor(Math.random() * colors.length);
            const baseColor = new Color(colors[colorIndex]);

            const material = new ShaderMaterial({
                vertexShader: vertexShader,
                fragmentShader: fragmentShader,
                transparent: true,
                uniforms: {
                    uTime: { value: 0 },
                    uBaseColor: { value: baseColor },
                    uOpacity: { value: 0.9 }
                }
            });

            const node = new Mesh(geometry, material);
            node.position.set(
                vertices[vertexIndex],
                vertices[vertexIndex + 1],
                vertices[vertexIndex + 2]
            );

            nodes.push({
                mesh: node,
                basePosition: node.position.clone(),
                originalIndex: vertexIndex,
                speed: Math.random() * 0.3 + 0.2,
                orbitSpeed: (Math.random() - 0.5) * 0.5,
                orbitRadius: Math.random() * 0.02 + 0.01,
                phaseOffset: Math.random() * Math.PI * 2,
                floatSpeed: Math.random() * 0.5 + 0.3
            });

            networkGroup.add(node);
        }

        // Create connections between nearby nodes
        const connections = [];
        const maxDistance = 0.4;

        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const distance = nodes[i].mesh.position.distanceTo(nodes[j].mesh.position);
                if (distance < maxDistance) {
                    const lineMaterial = new LineBasicMaterial({
                        color: 0x3b82f6,
                        transparent: true,
                        opacity: 0.25
                    });

                    const geometry = new BufferGeometry().setFromPoints([
                        nodes[i].mesh.position.clone(),
                        nodes[j].mesh.position.clone()
                    ]);

                    const line = new Line(geometry, lineMaterial);
                    connections.push({
                        line: line,
                        nodeA: nodes[i],
                        nodeB: nodes[j],
                        baseOpacity: 0.25
                    });
                    networkGroup.add(line);
                }
            }
        }

        // Subtle wireframe overlay
        const wireframeMaterial = new LineBasicMaterial({
            color: new Color('#06b6d4'),
            transparent: true,
            opacity: 0.08
        });

        // Create wireframe from edges
        const wireframePoints = [];
        const indices = torusGeometry.index ? torusGeometry.index.array : null;

        if (indices) {
            for (let i = 0; i < indices.length; i += 3) {
                const a = indices[i] * 3;
                const b = indices[i + 1] * 3;
                const c = indices[i + 2] * 3;

                wireframePoints.push(
                    new Vector3(vertices[a], vertices[a + 1], vertices[a + 2]),
                    new Vector3(vertices[b], vertices[b + 1], vertices[b + 2]),
                    new Vector3(vertices[b], vertices[b + 1], vertices[b + 2]),
                    new Vector3(vertices[c], vertices[c + 1], vertices[c + 2]),
                    new Vector3(vertices[c], vertices[c + 1], vertices[c + 2]),
                    new Vector3(vertices[a], vertices[a + 1], vertices[a + 2])
                );
            }
        }

        const wireframeGeometry = new BufferGeometry().setFromPoints(wireframePoints);
        const wireframe = new Line(wireframeGeometry, wireframeMaterial);
        networkGroup.add(wireframe);

        scene.add(networkGroup);

        // Store original vertex positions for animation
        const originalVertices = new Float32Array(vertices.length);
        for (let i = 0; i < vertices.length; i++) {
            originalVertices[i] = vertices[i];
        }

        let time = 0;

        const animate = () => {
            animationFrameRef.current = requestAnimationFrame(animate);
            time += 0.012;

            // Animate lights for dynamic depth
            pointLight1.position.x = Math.sin(time * 0.5) * 5;
            pointLight1.position.y = Math.cos(time * 0.3) * 5;

            pointLight2.position.x = Math.cos(time * 0.4) * -5;
            pointLight2.position.y = Math.sin(time * 0.6) * -5;

            // Animate torus knot vertices (twist and wave)
            for (let i = 0; i < vertices.length; i += 3) {
                const x = originalVertices[i];
                const y = originalVertices[i + 1];
                const z = originalVertices[i + 2];

                const dist = Math.sqrt(x * x + y * y + z * z);

                // Twist effect
                const twistAmount = Math.sin(time * 0.6) * 0.3;
                const twist = y * twistAmount;
                const cosT = Math.cos(twist);
                const sinT = Math.sin(twist);

                // Wave
                const wave = Math.sin(dist * 4 + time * 2.5) * 0.02;

                vertices[i] = x * cosT - z * sinT + wave * (x / (dist || 1));
                vertices[i + 1] = y + wave;
                vertices[i + 2] = x * sinT + z * cosT + wave * (z / (dist || 1));
            }

            torusGeometry.attributes.position.needsUpdate = true;

            // Update wireframe positions
            if (indices) {
                const wireframePositions = wireframeGeometry.attributes.position.array;
                let wi = 0;
                for (let i = 0; i < indices.length; i += 3) {
                    const a = indices[i] * 3;
                    const b = indices[i + 1] * 3;
                    const c = indices[i + 2] * 3;

                    wireframePositions[wi++] = vertices[a];
                    wireframePositions[wi++] = vertices[a + 1];
                    wireframePositions[wi++] = vertices[a + 2];
                    wireframePositions[wi++] = vertices[b];
                    wireframePositions[wi++] = vertices[b + 1];
                    wireframePositions[wi++] = vertices[b + 2];

                    wireframePositions[wi++] = vertices[b];
                    wireframePositions[wi++] = vertices[b + 1];
                    wireframePositions[wi++] = vertices[b + 2];
                    wireframePositions[wi++] = vertices[c];
                    wireframePositions[wi++] = vertices[c + 1];
                    wireframePositions[wi++] = vertices[c + 2];

                    wireframePositions[wi++] = vertices[c];
                    wireframePositions[wi++] = vertices[c + 1];
                    wireframePositions[wi++] = vertices[c + 2];
                    wireframePositions[wi++] = vertices[a];
                    wireframePositions[wi++] = vertices[a + 1];
                    wireframePositions[wi++] = vertices[a + 2];
                }
                wireframeGeometry.attributes.position.needsUpdate = true;
            }

            // Animate nodes with organic movement
            nodes.forEach((nodeData, index) => {
                const vertexIndex = nodeData.originalIndex;
                const baseX = vertices[vertexIndex];
                const baseY = vertices[vertexIndex + 1];
                const baseZ = vertices[vertexIndex + 2];

                const offset = time * nodeData.speed + nodeData.phaseOffset;

                // Breathing motion
                const breathe = Math.sin(offset) * 0.01;

                // Orbital motion
                const orbitAngle = time * nodeData.orbitSpeed;
                const orbitX = Math.cos(orbitAngle) * nodeData.orbitRadius;
                const orbitY = Math.sin(orbitAngle) * nodeData.orbitRadius;

                // Float motion
                const floatY = Math.sin(time * nodeData.floatSpeed + index) * 0.015;

                // Random drift
                const driftX = Math.sin(time * 0.4 + index * 1.7) * Math.cos(time * 0.23 + index * 2.3) * 0.01;
                const driftY = Math.cos(time * 0.35 + index * 2.1) * Math.sin(time * 0.31 + index * 1.9) * 0.01;
                const driftZ = Math.sin(time * 0.28 + index * 1.3) * Math.cos(time * 0.42 + index * 2.7) * 0.01;

                nodeData.mesh.position.x = baseX + breathe + orbitX + driftX;
                nodeData.mesh.position.y = baseY + floatY + orbitY + driftY;
                nodeData.mesh.position.z = baseZ + breathe + driftZ;

                // Update shader uniforms
                nodeData.mesh.material.uniforms.uTime.value = time + index * 0.1;

                // Pulse opacity
                const baseOpacity = 0.75 + Math.sin(time * 2 + index) * 0.15;
                nodeData.mesh.material.uniforms.uOpacity.value = baseOpacity;
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
                conn.line.material.opacity = Math.max(0, 0.4 - distance * 0.5);
            });

            // Slow rotation of the entire network
            networkGroup.rotation.y += 0.002;
            networkGroup.rotation.x = Math.sin(time * 0.2) * 0.1;

            // Color shift for wireframe
            const hue = (Math.sin(time * 0.4) * 0.1 + 0.5);
            wireframeMaterial.color.setHSL(hue, 0.85, 0.55);

            renderer.render(scene, camera);
        };

        animate();

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

            // Dispose all resources
            torusGeometry.dispose();
            wireframeGeometry.dispose();
            wireframeMaterial.dispose();

            nodes.forEach((nodeData) => {
                nodeData.mesh.geometry.dispose();
                nodeData.mesh.material.dispose();
            });

            connections.forEach((conn) => {
                conn.line.geometry.dispose();
                conn.line.material.dispose();
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
