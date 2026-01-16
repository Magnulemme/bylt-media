import React, { useRef, useEffect } from 'react';
import {
    Scene,
    PerspectiveCamera,
    WebGLRenderer,
    OctahedronGeometry,
    Group,
    SphereGeometry,
    Mesh,
    LineBasicMaterial,
    BufferGeometry,
    Line,
    Vector3,
    Vector2,
    Color,
    ShaderMaterial,
    EdgesGeometry,
    LineSegments
} from 'three';

const Octahedron3D = ({ className = '' }) => {
    const mountRef = useRef(null);
    const animationFrameRef = useRef(null);

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
        uniform float uMouseEffect;

        varying vec3 vNormal;
        varying vec3 vPosition;

        vec3 brighten(vec3 color, float amount) {
            return color + vec3(amount);
        }

        void main() {
            vec3 lightDirection = normalize(vec3(1.0, 1.0, 1.0));
            float lightIntensity = dot(vNormal, lightDirection) * 0.5 + 0.5;

            float wave = sin(vPosition.x * 3.0 + uTime * 0.5) * 0.5 + 0.5;
            vec3 darkColor = uBaseColor * 0.7;
            vec3 brightColor = uBaseColor + vec3(0.3);
            vec3 color = mix(darkColor, brightColor, wave);

            float fresnel = pow(1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0))), 2.5);
            color += fresnel * brightColor * 0.4;

            color *= lightIntensity;

            color += brighten(uBaseColor, 0.5) * uMouseEffect * 0.6;

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

        const octaGroup = new Group();

        // Create OctahedronGeometry - no subdivisions to keep sharp edges
        const octaGeometry = new OctahedronGeometry(0.8, 0);

        // Create wireframe edges
        const edgesGeometry = new EdgesGeometry(octaGeometry);
        const edgesMaterial = new LineBasicMaterial({
            color: 0x3b82f6,
            transparent: true,
            opacity: 0.4
        });
        const wireframe = new LineSegments(edgesGeometry, edgesMaterial);
        octaGroup.add(wireframe);

        // Get unique vertices (octahedron has 6 vertices)
        const positions = octaGeometry.attributes.position.array;
        const uniqueVertices = [];
        const seen = new Set();

        for (let i = 0; i < positions.length; i += 3) {
            const x = positions[i];
            const y = positions[i + 1];
            const z = positions[i + 2];
            const key = `${x.toFixed(4)}_${y.toFixed(4)}_${z.toFixed(4)}`;

            if (!seen.has(key)) {
                seen.add(key);
                uniqueVertices.push(new Vector3(x, y, z));
            }
        }

        // Create sphere nodes at vertices
        const nodes = [];
        const colors = [
            new Color(0x06b6d4), // cyan
            new Color(0x3b82f6), // blue
            new Color(0x8b5cf6), // purple
        ];

        // Helper to create a node
        const createNode = (position, size, opacity = 0.9) => {
            const geometry = new SphereGeometry(size, 12, 12);
            const colorIndex = Math.floor(Math.random() * colors.length);
            const baseColor = colors[colorIndex].clone();

            const material = new ShaderMaterial({
                vertexShader: sphereVertexShader,
                fragmentShader: sphereFragmentShader,
                transparent: true,
                uniforms: {
                    uTime: { value: 0 },
                    uBaseColor: { value: baseColor },
                    uOpacity: { value: opacity },
                    uMouseEffect: { value: 0 }
                }
            });

            const node = new Mesh(geometry, material);
            node.position.copy(position);

            return {
                mesh: node,
                basePosition: position.clone(),
                phaseOffset: Math.random() * Math.PI * 2
            };
        };

        // Add nodes at vertices (larger)
        uniqueVertices.forEach((vertex) => {
            const nodeData = createNode(vertex, 0.04, 0.95);
            nodes.push(nodeData);
            octaGroup.add(nodeData.mesh);
        });

        // Store edges for later
        const edges = [];

        // Add many nodes along edges
        const edgeNodes = [];
        for (let i = 0; i < uniqueVertices.length; i++) {
            for (let j = i + 1; j < uniqueVertices.length; j++) {
                const v1 = uniqueVertices[i];
                const v2 = uniqueVertices[j];
                const dist = v1.distanceTo(v2);

                // Only connect adjacent vertices (edges of octahedron)
                if (dist < 1.2) {
                    edges.push([v1, v2]);

                    // Add 5-6 nodes along each edge
                    const numNodes = 5;
                    for (let k = 1; k <= numNodes; k++) {
                        const t = k / (numNodes + 1);
                        const pos = new Vector3().lerpVectors(v1, v2, t);

                        const nodeData = createNode(pos, 0.02, 0.85);
                        edgeNodes.push(nodeData);
                        octaGroup.add(nodeData.mesh);
                    }
                }
            }
        }

        // Add nodes on each face (octahedron has 8 triangular faces)
        // Face centers are at the centroids of triangles
        const faceNodes = [];
        const faces = [
            // Top 4 faces (connected to top vertex at y=0.8)
            [0, 1, 2], [0, 2, 3], [0, 3, 4], [0, 4, 1],
            // Bottom 4 faces (connected to bottom vertex at y=-0.8)
            [5, 2, 1], [5, 3, 2], [5, 4, 3], [5, 1, 4]
        ];

        // Get vertices by index (top, 4 middle, bottom)
        const sortedVertices = [...uniqueVertices].sort((a, b) => b.y - a.y);

        faces.forEach((face) => {
            const v1 = sortedVertices[face[0]];
            const v2 = sortedVertices[face[1]];
            const v3 = sortedVertices[face[2]];

            if (v1 && v2 && v3) {
                // Center of face
                const center = new Vector3(
                    (v1.x + v2.x + v3.x) / 3,
                    (v1.y + v2.y + v3.y) / 3,
                    (v1.z + v2.z + v3.z) / 3
                );

                const nodeData = createNode(center, 0.025, 0.8);
                faceNodes.push(nodeData);
                octaGroup.add(nodeData.mesh);

                // Add extra nodes between center and each vertex
                [v1, v2, v3].forEach((v) => {
                    const midPoint = new Vector3().lerpVectors(center, v, 0.5);
                    const nodeData2 = createNode(midPoint, 0.018, 0.75);
                    faceNodes.push(nodeData2);
                    octaGroup.add(nodeData2.mesh);
                });
            }
        });

        const allNodes = [...nodes, ...edgeNodes, ...faceNodes];

        // Create additional connections between nearby nodes
        const connections = [];
        for (let i = 0; i < allNodes.length; i++) {
            for (let j = i + 1; j < allNodes.length; j++) {
                const distance = allNodes[i].basePosition.distanceTo(allNodes[j].basePosition);
                if (distance < 0.6 && distance > 0.1) {
                    const lineMaterial = new LineBasicMaterial({
                        color: 0x06b6d4,
                        transparent: true,
                        opacity: 0.2
                    });

                    const lineGeometry = new BufferGeometry().setFromPoints([
                        allNodes[i].mesh.position.clone(),
                        allNodes[j].mesh.position.clone()
                    ]);

                    const line = new Line(lineGeometry, lineMaterial);
                    connections.push({
                        line: line,
                        nodeA: allNodes[i],
                        nodeB: allNodes[j]
                    });
                    octaGroup.add(line);
                }
            }
        }

        scene.add(octaGroup);

        // Mouse interaction
        let mouseScreen = new Vector2(-1000, -1000);

        const handleMouseMove = (event) => {
            const rect = currentMount.getBoundingClientRect();
            mouseScreen.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            mouseScreen.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
        };

        const handleMouseLeave = () => {
            mouseScreen.set(-1000, -1000);
        };

        currentMount.addEventListener('mousemove', handleMouseMove);
        currentMount.addEventListener('mouseleave', handleMouseLeave);

        let isVisible = true;
        let time = 0;

        const animate = () => {
            animationFrameRef.current = requestAnimationFrame(animate);

            if (!isVisible) return;

            time += 0.016;

            // Animate all nodes
            allNodes.forEach((nodeData) => {
                const basePos = nodeData.basePosition;

                // Gentle breathing + wave effect (like Torus3D)
                const breathe = 1.0 + Math.sin(time * 0.8 + nodeData.phaseOffset) * 0.05;
                const waveX = Math.sin(time * 1.5 + basePos.y * 4) * 0.02;
                const waveY = Math.sin(time * 1.2 + basePos.x * 3 + basePos.z * 2) * 0.02;
                const waveZ = Math.sin(time * 1.0 + basePos.x * 2) * 0.02;
                let posX = basePos.x * breathe + waveX;
                let posY = basePos.y * breathe + waveY;
                let posZ = basePos.z * breathe + waveZ;

                // Mouse interaction
                const worldPos = new Vector3(posX, posY, posZ);
                worldPos.applyMatrix4(octaGroup.matrixWorld);

                const nodeScreenPos = worldPos.clone();
                nodeScreenPos.project(camera);

                const distToMouse = Math.sqrt(
                    Math.pow(nodeScreenPos.x - mouseScreen.x, 2) +
                    Math.pow(nodeScreenPos.y - mouseScreen.y, 2)
                );

                const mouseEffect = Math.max(0, 1 - distToMouse / 0.5);
                const smoothMouseEffect = mouseEffect * mouseEffect;

                if (smoothMouseEffect > 0) {
                    const len = Math.sqrt(basePos.x * basePos.x + basePos.y * basePos.y + basePos.z * basePos.z);
                    if (len > 0) {
                        const repulsionForce = smoothMouseEffect * 0.1;
                        posX += (basePos.x / len) * repulsionForce;
                        posY += (basePos.y / len) * repulsionForce;
                        posZ += (basePos.z / len) * repulsionForce;
                    }
                }

                nodeData.mesh.position.set(posX, posY, posZ);

                nodeData.mesh.material.uniforms.uTime.value = time;
                nodeData.mesh.material.uniforms.uMouseEffect.value = smoothMouseEffect;
            });

            // Update connection lines
            connections.forEach((conn) => {
                const linePositions = conn.line.geometry.attributes.position.array;
                linePositions[0] = conn.nodeA.mesh.position.x;
                linePositions[1] = conn.nodeA.mesh.position.y;
                linePositions[2] = conn.nodeA.mesh.position.z;
                linePositions[3] = conn.nodeB.mesh.position.x;
                linePositions[4] = conn.nodeB.mesh.position.y;
                linePositions[5] = conn.nodeB.mesh.position.z;
                conn.line.geometry.attributes.position.needsUpdate = true;
            });

            // Slow rotation - tilted like Ethereum logo
            octaGroup.rotation.x += 0.002;
            octaGroup.rotation.y += 0.003;

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
            currentMount.removeEventListener('mousemove', handleMouseMove);
            currentMount.removeEventListener('mouseleave', handleMouseLeave);

            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
            if (currentMount && renderer.domElement) {
                currentMount.removeChild(renderer.domElement);
            }

            octaGeometry.dispose();
            edgesGeometry.dispose();
            edgesMaterial.dispose();

            allNodes.forEach((nodeData) => {
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

export default Octahedron3D;
