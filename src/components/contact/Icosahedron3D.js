import React, { useRef, useEffect } from 'react';
import {
    Scene,
    PerspectiveCamera,
    WebGLRenderer,
    IcosahedronGeometry,
    Group,
    SphereGeometry,
    Mesh,
    LineBasicMaterial,
    BufferGeometry,
    Line,
    Vector3,
    Vector2,
    Color,
    ShaderMaterial
} from 'three';

const Icosahedron3D = ({ className = '' }) => {
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

        const icoGroup = new Group();

        // Create IcosahedronGeometry with subdivisions for more vertices
        const icoGeometry = new IcosahedronGeometry(0.7, 2);

        const positions = icoGeometry.attributes.position.array;
        const vertexCount = positions.length / 3;

        // Create sphere nodes at vertices
        const nodes = [];
        const colors = [
            new Color(0x06b6d4), // cyan
            new Color(0x3b82f6), // blue
            new Color(0x8b5cf6), // purple
        ];

        // Sample vertices for nodes
        const targetNodeCount = 120;
        const sampledIndices = [];
        const usedPositions = new Map();

        // Deduplicate vertices (icosahedron has shared vertices)
        for (let i = 0; i < vertexCount; i++) {
            const x = positions[i * 3];
            const y = positions[i * 3 + 1];
            const z = positions[i * 3 + 2];
            const key = `${x.toFixed(4)}_${y.toFixed(4)}_${z.toFixed(4)}`;

            if (!usedPositions.has(key)) {
                usedPositions.set(key, i);
            }
        }

        const uniqueIndices = Array.from(usedPositions.values());

        // Randomly sample from unique vertices
        while (sampledIndices.length < targetNodeCount && sampledIndices.length < uniqueIndices.length) {
            const randomIdx = Math.floor(Math.random() * uniqueIndices.length);
            const vertexIndex = uniqueIndices[randomIdx];
            if (!sampledIndices.includes(vertexIndex)) {
                sampledIndices.push(vertexIndex);
            }
        }

        for (let i = 0; i < sampledIndices.length; i++) {
            const vertexIndex = sampledIndices[i];
            const x = positions[vertexIndex * 3];
            const y = positions[vertexIndex * 3 + 1];
            const z = positions[vertexIndex * 3 + 2];

            const geometry = new SphereGeometry(0.022, 12, 12);
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
                    uMouseEffect: { value: 0 }
                }
            });

            const node = new Mesh(geometry, material);
            node.position.set(x, y, z);

            nodes.push({
                mesh: node,
                basePosition: new Vector3(x, y, z),
                phaseOffset: Math.random() * Math.PI * 2
            });

            icoGroup.add(node);
        }

        // Create connections between nearby nodes
        const connections = [];
        const maxDistance = 0.5;

        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const distance = nodes[i].basePosition.distanceTo(nodes[j].basePosition);
                if (distance < maxDistance) {
                    const lineMaterial = new LineBasicMaterial({
                        color: 0x3b82f6,
                        transparent: true,
                        opacity: 0.25
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
                    icoGroup.add(line);
                }
            }
        }

        scene.add(icoGroup);

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

            // Animate sphere nodes
            nodes.forEach((nodeData) => {
                const basePos = nodeData.basePosition;

                // Gentle breathing + wave effect
                const breathe = 1.0 + Math.sin(time * 0.6 + nodeData.phaseOffset) * 0.05;
                const wave = Math.sin(time * 1.0 + basePos.x * 2 + basePos.y * 2) * 0.025;
                let posX = basePos.x * breathe + basePos.x * wave;
                let posY = basePos.y * breathe + basePos.y * wave;
                let posZ = basePos.z * breathe + basePos.z * wave;

                // Mouse repulsion effect
                const worldPos = new Vector3(posX, posY, posZ);
                worldPos.applyMatrix4(icoGroup.matrixWorld);

                const nodeScreenPos = worldPos.clone();
                nodeScreenPos.project(camera);

                const distToMouse = Math.sqrt(
                    Math.pow(nodeScreenPos.x - mouseScreen.x, 2) +
                    Math.pow(nodeScreenPos.y - mouseScreen.y, 2)
                );

                const mouseEffect = Math.max(0, 1 - distToMouse / 0.4);
                const smoothMouseEffect = mouseEffect * mouseEffect;

                if (smoothMouseEffect > 0) {
                    const len = Math.sqrt(basePos.x * basePos.x + basePos.y * basePos.y + basePos.z * basePos.z);
                    if (len > 0) {
                        const repulsionForce = smoothMouseEffect * 0.12;
                        posX += (basePos.x / len) * repulsionForce;
                        posY += (basePos.y / len) * repulsionForce;
                        posZ += (basePos.z / len) * repulsionForce;
                    }
                }

                nodeData.mesh.position.set(posX, posY, posZ);

                nodeData.mesh.material.uniforms.uTime.value = time;
                nodeData.mesh.material.uniforms.uOpacity.value = 0.9;
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

                const distance = conn.nodeA.mesh.position.distanceTo(conn.nodeB.mesh.position);
                conn.line.material.opacity = Math.max(0.08, 0.3 - distance * 0.5);
            });

            // Slow rotation
            icoGroup.rotation.x += 0.001;
            icoGroup.rotation.y += 0.0015;
            icoGroup.rotation.z += 0.0008;

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

            icoGeometry.dispose();

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

export default Icosahedron3D;
