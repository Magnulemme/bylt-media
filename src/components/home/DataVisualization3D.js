import React, { useRef, useEffect } from 'react';
import {
    Scene,
    PerspectiveCamera,
    WebGLRenderer,
    SphereGeometry,
    ShaderMaterial,
    Mesh,
    Group,
    LineBasicMaterial,
    BufferGeometry,
    Line,
    Vector3,
    Vector2,
    AmbientLight,
    PointLight,
    DirectionalLight,
    Color
} from 'three';

const DataVisualization3D = () => {
    const mountRef = useRef(null);
    const animationFrameRef = useRef(null);
    const isVisibleRef = useRef(true);

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
        uniform float uMouseEffect;

        varying vec3 vNormal;
        varying vec3 vPosition;

        // Function to create a brighter version of a color
        vec3 brighten(vec3 color, float amount) {
            return color + vec3(amount);
        }

        // Function to create a darker version of a color
        vec3 darken(vec3 color, float amount) {
            return color * (1.0 - amount);
        }

        void main() {
            // Lighting calculation for depth
            vec3 lightDirection = normalize(vec3(1.0, 1.0, 1.0));
            float lightIntensity = dot(vNormal, lightDirection) * 0.5 + 0.5;

            // Create animated gradient across the sphere surface
            // Use position and time to create waves
            float wave1 = sin(vPosition.x * 3.0 + uTime * 2.0) * 0.5 + 0.5;
            float wave2 = cos(vPosition.y * 3.0 + uTime * 1.5) * 0.5 + 0.5;
            float wave3 = sin(vPosition.z * 3.0 + uTime * 1.8) * 0.5 + 0.5;

            // Combine waves for complex pattern
            float gradientMix = (wave1 + wave2 + wave3) / 3.0;

            // Create gradient from dark to bright version of base color
            vec3 darkColor = darken(uBaseColor, 0.3);
            vec3 brightColor = brighten(uBaseColor, 0.4);

            vec3 color = mix(darkColor, brightColor, gradientMix);

            // Add iridescent rim effect
            float fresnel = pow(1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0))), 3.0);
            color += fresnel * brighten(uBaseColor, 0.3) * 0.5;

            // Apply lighting for 3D depth
            color *= lightIntensity;

            // Add glow on mouse interaction
            color += brighten(uBaseColor, 0.5) * uMouseEffect * 0.6;

            gl_FragColor = vec4(color, uOpacity);
        }
    `;

    useEffect(() => {
        if (typeof window === 'undefined') return;
        const currentMount = mountRef.current;
        if (!currentMount) return;

        const scene = new Scene();
        const camera = new PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
        const renderer = new WebGLRenderer({
            alpha: true,
            antialias: true,
        });

        renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        currentMount.appendChild(renderer.domElement);
        camera.position.z = 9;

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

        // Create nodes
        const nodes = [];
        const nodeCount = 120;
        const sphereRadius = 4;

        const colors = [
            0x06b6d4, // cyan
            0x3b82f6, // blue
            0x8b5cf6, // purple
        ];

        for (let i = 0; i < nodeCount; i++) {
            const geometry = new SphereGeometry(0.12, 32, 32); // Increased segments for smoother spheres

            // Randomly assign a base color to this sphere
            const colorIndex = Math.floor(Math.random() * colors.length);
            const baseColor = new Color(colors[colorIndex]);

            // Create shader material with animated gradient for this specific color
            const material = new ShaderMaterial({
                vertexShader: vertexShader,
                fragmentShader: fragmentShader,
                transparent: true,
                uniforms: {
                    uTime: { value: 0 },
                    uBaseColor: { value: baseColor }, // Each sphere has its own base color
                    uOpacity: { value: 0.9 },
                    uMouseEffect: { value: 0 }
                }
            });

            const node = new Mesh(geometry, material);

            // Fibonacci sphere distribution for even spacing
            const phi = Math.acos(1 - 2 * (i + 0.5) / nodeCount);
            const theta = Math.PI * (1 + Math.sqrt(5)) * i;

            node.position.x = sphereRadius * Math.sin(phi) * Math.cos(theta);
            node.position.y = sphereRadius * Math.sin(phi) * Math.sin(theta);
            node.position.z = sphereRadius * Math.cos(phi);

            nodes.push({
                mesh: node,
                basePosition: node.position.clone(),
                velocity: new Vector3(
                    (Math.random() - 0.5) * 0.02,
                    (Math.random() - 0.5) * 0.02,
                    (Math.random() - 0.5) * 0.02
                ),
                speed: Math.random() * 0.3 + 0.2,
                orbitSpeed: (Math.random() - 0.5) * 0.5,
                orbitRadius: Math.random() * 0.3 + 0.1,
                phaseOffset: Math.random() * Math.PI * 2,
                floatSpeed: Math.random() * 0.5 + 0.3
            });

            networkGroup.add(node);
        }

        // Create connections between nearby nodes
        const connections = [];
        const maxDistance = 3.5;

        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const distance = nodes[i].mesh.position.distanceTo(nodes[j].mesh.position);
                if (distance < maxDistance) {
                    const lineMaterial = new LineBasicMaterial({
                        color: 0x3b82f6,
                        transparent: true,
                        opacity: 0.2
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
                        baseOpacity: 0.2
                    });
                    networkGroup.add(line);
                }
            }
        }

        scene.add(networkGroup);

        // Mouse interaction - track mouse position in screen coordinates
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

        // Occasional small deformations (lapilli effect)
        let activeDeformations = [];
        const maxActiveDeformations = 5; // Limit for performance

        const createDeformation = () => {
            // Don't create if we're at the limit
            if (activeDeformations.length >= maxActiveDeformations) {
                return;
            }

            // Random point on sphere surface
            const phi = Math.random() * Math.PI;
            const theta = Math.random() * Math.PI * 2;

            const deformationPoint = new Vector3(
                sphereRadius * Math.sin(phi) * Math.cos(theta),
                sphereRadius * Math.sin(phi) * Math.sin(theta),
                sphereRadius * Math.cos(phi)
            );

            const newDeformation = {
                position: deformationPoint,
                startTime: time,
                buildUpDuration: 0.4, // Very quick
                holdDuration: 0.6, // Short hold
                decayDuration: 0.8, // Quick fade
                intensity: 0.3 + Math.random() * 0.2, // Subtle
                radius: 1.2 + Math.random() * 0.5, // Small area
                currentStrength: 0,
                phase: 'buildup'
            };

            activeDeformations.push(newDeformation);
        };

        let time = 0;

        const animate = () => {
            if (!isVisibleRef.current) {
                animationFrameRef.current = null;
                return;
            }
            animationFrameRef.current = requestAnimationFrame(animate);
            time += 0.016;

            // Occasional random deformation (lapillo)
            // Random probability 3% per frame (~2 per second)
            if (Math.random() < 0.03) {
                createDeformation();
            }

            // Update all active deformations (optimized to avoid creating new arrays)
            for (let i = activeDeformations.length - 1; i >= 0; i--) {
                const deformation = activeDeformations[i];
                const age = time - deformation.startTime;

                if (deformation.phase === 'buildup') {
                    if (age < deformation.buildUpDuration) {
                        const progress = age / deformation.buildUpDuration;
                        deformation.currentStrength = progress * progress;
                    } else {
                        deformation.currentStrength = 1.0;
                        deformation.phase = 'hold';
                        deformation.holdStartTime = time;
                    }
                } else if (deformation.phase === 'hold') {
                    deformation.currentStrength = 1.0;
                    const holdAge = time - deformation.holdStartTime;

                    if (holdAge > deformation.holdDuration) {
                        deformation.phase = 'decay';
                        deformation.decayStartTime = time;
                    }
                } else if (deformation.phase === 'decay') {
                    const decayAge = time - deformation.decayStartTime;

                    if (decayAge < deformation.decayDuration) {
                        const progress = decayAge / deformation.decayDuration;
                        deformation.currentStrength = 1.0 - (progress * progress);
                    } else {
                        // Remove finished deformation (iterate backwards to avoid issues)
                        activeDeformations.splice(i, 1);
                    }
                }
            }

            // Animate lights for dynamic depth
            pointLight1.position.x = Math.sin(time * 0.5) * 5;
            pointLight1.position.y = Math.cos(time * 0.3) * 5;

            pointLight2.position.x = Math.cos(time * 0.4) * -5;
            pointLight2.position.y = Math.sin(time * 0.6) * -5;

            // Slow rotation of the entire network for enhanced 3D perception
            networkGroup.rotation.y += 0.001;
            networkGroup.rotation.x = Math.sin(time * 0.2) * 0.05;

            // Animate nodes
            nodes.forEach((nodeData, index) => {
                // Multiple layered animations for organic movement
                const offset = time * nodeData.speed + nodeData.phaseOffset;

                // 1. Radial breathing motion - nodes move in and out
                const breathe = Math.sin(offset) * 0.15;

                // 2. Orbital motion - each node orbits slightly around its base position
                const orbitAngle = time * nodeData.orbitSpeed;
                const orbitX = Math.cos(orbitAngle) * nodeData.orbitRadius;
                const orbitY = Math.sin(orbitAngle) * nodeData.orbitRadius;

                // 3. Float motion - gentle vertical wave
                const floatY = Math.sin(time * nodeData.floatSpeed + index) * 0.2;

                // 4. Twist motion - rotation around the sphere
                const twist = Math.sin(time * 0.3 + index * 0.1) * 0.1;

                // 5. Random drift - each node drifts randomly using noise-like function
                const driftX = Math.sin(time * 0.4 + index * 1.7) * Math.cos(time * 0.23 + index * 2.3) * 0.15;
                const driftY = Math.cos(time * 0.35 + index * 2.1) * Math.sin(time * 0.31 + index * 1.9) * 0.15;
                const driftZ = Math.sin(time * 0.28 + index * 1.3) * Math.cos(time * 0.42 + index * 2.7) * 0.15;

                // Normalize the base position to get direction (reuse vectors)
                const baseX = nodeData.basePosition.x;
                const baseY = nodeData.basePosition.y;
                const baseZ = nodeData.basePosition.z;
                const baseMag = Math.sqrt(baseX * baseX + baseY * baseY + baseZ * baseZ);
                const dirX = baseX / baseMag;
                const dirY = baseY / baseMag;
                const dirZ = baseZ / baseMag;

                // Get perpendicular vectors for orbital motion (simplified)
                const rightX = -dirY;
                const rightY = dirX;
                const rightZ = 0;
                const rightMag = Math.sqrt(rightX * rightX + rightY * rightY);
                const rightNormX = rightX / (rightMag || 1);
                const rightNormY = rightY / (rightMag || 1);
                const rightNormZ = rightZ / (rightMag || 1);

                // Cross product for actualUp
                const upX = rightNormY * dirZ - rightNormZ * dirY;
                const upY = rightNormZ * dirX - rightNormX * dirZ;
                const upZ = rightNormX * dirY - rightNormY * dirX;

                // Combine all movements (directly calculate final position)
                nodeData.mesh.position.x = baseX +
                    dirX * (breathe + twist) +
                    rightNormX * orbitX +
                    upX * (orbitY + floatY) +
                    driftX;

                nodeData.mesh.position.y = baseY +
                    dirY * (breathe + twist) +
                    rightNormY * orbitX +
                    upY * (orbitY + floatY) +
                    driftY;

                nodeData.mesh.position.z = baseZ +
                    dirZ * (breathe + twist) +
                    rightNormZ * orbitX +
                    upZ * (orbitY + floatY) +
                    driftZ;

                // Calculate deformation effects from occasional lapilli (optimized)
                let deformationForce = new Vector3(0, 0, 0);

                // Only process if there are active deformations
                if (activeDeformations.length > 0) {
                    for (let i = 0; i < activeDeformations.length; i++) {
                        const deformation = activeDeformations[i];
                        const maxDist = deformation.radius * 1.5;

                        // Quick distance check (squared distance for performance)
                        const dx = nodeData.basePosition.x - deformation.position.x;
                        const dy = nodeData.basePosition.y - deformation.position.y;
                        const dz = nodeData.basePosition.z - deformation.position.z;
                        const distSquared = dx * dx + dy * dy + dz * dz;
                        const maxDistSquared = maxDist * maxDist;

                        if (distSquared < maxDistSquared) {
                            const dist = Math.sqrt(distSquared);
                            const proximity = 1.0 - (dist / maxDist);
                            const smoothProximity = proximity * proximity * proximity;

                            // Push direction (normalized manually for performance)
                            const invDist = 1 / dist;
                            const force = smoothProximity * deformation.currentStrength * deformation.intensity * 0.6;

                            deformationForce.x += dx * invDist * force;
                            deformationForce.y += dy * invDist * force;
                            deformationForce.z += dz * invDist * force;
                        }
                    }
                }

                // Apply deformation force
                nodeData.mesh.position.add(deformationForce);

                // Mouse repulsion effect (no glow, only physics)
                const worldPos = new Vector3();
                nodeData.mesh.getWorldPosition(worldPos);

                const nodeScreenPos = worldPos.clone();
                nodeScreenPos.project(camera);

                const distToMouse = Math.sqrt(
                    Math.pow(nodeScreenPos.x - mouseScreen.x, 2) +
                    Math.pow(nodeScreenPos.y - mouseScreen.y, 2)
                );

                const mouseEffect = Math.max(0, 1 - distToMouse / 0.3);
                const smoothMouseEffect = mouseEffect * mouseEffect;

                if (smoothMouseEffect > 0) {
                    // Reuse already computed direction
                    const repulsionForce = smoothMouseEffect * 0.8;
                    nodeData.mesh.position.x += dirX * repulsionForce;
                    nodeData.mesh.position.y += dirY * repulsionForce;
                    nodeData.mesh.position.z += dirZ * repulsionForce;
                }

                // Update shader uniforms
                nodeData.mesh.material.uniforms.uTime.value = time + index * 0.1;

                // Very subtle glow effect from lapilli (optimized)
                let deformationGlow = 0;

                if (activeDeformations.length > 0) {
                    for (let i = 0; i < activeDeformations.length; i++) {
                        const deformation = activeDeformations[i];
                        const maxDist = deformation.radius * 1.2;

                        // Quick squared distance check
                        const dx = nodeData.basePosition.x - deformation.position.x;
                        const dy = nodeData.basePosition.y - deformation.position.y;
                        const dz = nodeData.basePosition.z - deformation.position.z;
                        const distSquared = dx * dx + dy * dy + dz * dz;
                        const maxDistSquared = maxDist * maxDist;

                        if (distSquared < maxDistSquared) {
                            const dist = Math.sqrt(distSquared);
                            const proximity = 1.0 - (dist / maxDist);
                            const pulse = Math.sin(time * 4 + dist) * 0.2 + 0.8;
                            deformationGlow += proximity * proximity * pulse * deformation.currentStrength * 0.3;
                        }
                    }
                    deformationGlow = Math.min(deformationGlow, 0.5);
                }

                // Pulse opacity + deformation glow (no mouse glow)
                const baseOpacity = 0.75 + Math.sin(time * 2 + index) * 0.15;
                nodeData.mesh.material.uniforms.uOpacity.value = Math.min(1, baseOpacity + deformationGlow * 0.3);

                // Update shader effect uniform (only deformation glow, no mouse)
                nodeData.mesh.material.uniforms.uMouseEffect.value = deformationGlow;
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
                conn.line.material.opacity = Math.max(0, 0.4 - distance * 0.08);
            });

            renderer.render(scene, camera);
        };

        // Visibility tracking - ferma animazione quando fuori viewport
        const visibilityObserver = new IntersectionObserver(
            ([entry]) => {
                const wasVisible = isVisibleRef.current;
                isVisibleRef.current = entry.isIntersecting;

                if (entry.isIntersecting && !wasVisible) {
                    console.log('🟢 [DataVisualization3D] Entrato in viewport - animazione RIPRENDE');
                    if (!animationFrameRef.current) {
                        animate();
                    }
                } else if (!entry.isIntersecting && wasVisible) {
                    console.log('🔴 [DataVisualization3D] Uscito da viewport - animazione FERMA');
                }
            },
            { threshold: 0.1 }
        );
        visibilityObserver.observe(currentMount);
        console.log('👁️ [DataVisualization3D] Visibility observer attivato');

        animate();

        const handleResize = () => {
            if (!currentMount) return;
            camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            currentMount.removeEventListener('mousemove', handleMouseMove);
            currentMount.removeEventListener('mouseleave', handleMouseLeave);
            visibilityObserver.disconnect();

            // Cancel animation frame
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }

            // Dispose all Three.js resources to prevent memory leaks
            nodes.forEach((nodeData) => {
                if (nodeData.mesh.geometry) {
                    nodeData.mesh.geometry.dispose();
                }
                if (nodeData.mesh.material) {
                    nodeData.mesh.material.dispose();
                }
            });

            connections.forEach((conn) => {
                if (conn.line.geometry) {
                    conn.line.geometry.dispose();
                }
                if (conn.line.material) {
                    conn.line.material.dispose();
                }
            });

            // Remove DOM element
            if (currentMount && renderer.domElement) {
                currentMount.removeChild(renderer.domElement);
            }

            // Dispose renderer
            renderer.dispose();
        };
    }, []);

    return <div ref={mountRef} style={{ width: '100%', height: '100%' }} />;
};

export default DataVisualization3D;
