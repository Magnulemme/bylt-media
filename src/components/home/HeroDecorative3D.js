import React, { useRef, useEffect } from 'react';
import {
    Scene,
    PerspectiveCamera,
    WebGLRenderer,
    TorusKnotGeometry,
    MeshStandardMaterial,
    Mesh,
    BufferGeometry,
    BufferAttribute,
    PointsMaterial,
    Points,
    DirectionalLight,
    AmbientLight,
    Clock as ThreeClock,
    AdditiveBlending,
    Color
} from 'three';

const HeroDecorative3D = () => {
    const mountRef = useRef(null);
    const animationFrameRef = useRef(null);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        const currentMount = mountRef.current;
        if (!currentMount) return;

        // Scene setup
        const scene = new Scene();
        const camera = new PerspectiveCamera(
            45,
            currentMount.clientWidth / currentMount.clientHeight,
            0.1,
            1000
        );
        const renderer = new WebGLRenderer({
            alpha: true,
            antialias: true,
            powerPreference: "high-performance"
        });

        renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        currentMount.appendChild(renderer.domElement);
        camera.position.z = 5;

        // Lighting
        const ambientLight = new AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);

        const directionalLight = new DirectionalLight(0xffffff, 1);
        directionalLight.position.set(5, 5, 5);
        scene.add(directionalLight);

        const directionalLight2 = new DirectionalLight(0x00ffff, 0.5);
        directionalLight2.position.set(-5, -5, 5);
        scene.add(directionalLight2);

        // Main decorative object - Torus Knot
        const torusGeometry = new TorusKnotGeometry(1.2, 0.4, 128, 32, 2, 3);
        const torusMaterial = new MeshStandardMaterial({
            color: 0xffffff,
            metalness: 0.8,
            roughness: 0.2,
            wireframe: false,
            emissive: 0x3b82f6,
            emissiveIntensity: 0.3
        });
        const torusMesh = new Mesh(torusGeometry, torusMaterial);
        scene.add(torusMesh);

        // Wireframe overlay
        const wireframeGeometry = new TorusKnotGeometry(1.25, 0.42, 64, 16, 2, 3);
        const wireframeMaterial = new MeshStandardMaterial({
            color: 0x06b6d4,
            wireframe: true,
            transparent: true,
            opacity: 0.3
        });
        const wireframeMesh = new Mesh(wireframeGeometry, wireframeMaterial);
        scene.add(wireframeMesh);

        // Floating particles around the object
        const particleCount = 800;
        const particlesGeometry = new BufferGeometry();
        const posArray = new Float32Array(particleCount * 3);
        const colorArray = new Float32Array(particleCount * 3);

        for (let i = 0; i < particleCount * 3; i += 3) {
            // Distribute particles in a sphere
            const radius = 3 + Math.random() * 2;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);

            posArray[i] = radius * Math.sin(phi) * Math.cos(theta);
            posArray[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
            posArray[i + 2] = radius * Math.cos(phi);

            // Color gradient from cyan to blue to purple
            const colorChoice = Math.random();
            if (colorChoice < 0.33) {
                colorArray[i] = 0.06; // cyan
                colorArray[i + 1] = 0.71;
                colorArray[i + 2] = 0.83;
            } else if (colorChoice < 0.66) {
                colorArray[i] = 0.23; // blue
                colorArray[i + 1] = 0.51;
                colorArray[i + 2] = 0.96;
            } else {
                colorArray[i] = 0.67; // purple
                colorArray[i + 1] = 0.20;
                colorArray[i + 2] = 0.96;
            }
        }

        particlesGeometry.setAttribute('position', new BufferAttribute(posArray, 3));
        particlesGeometry.setAttribute('color', new BufferAttribute(colorArray, 3));

        const particlesMaterial = new PointsMaterial({
            size: 0.04,
            vertexColors: true,
            transparent: true,
            blending: AdditiveBlending,
            depthWrite: false,
            opacity: 0.8
        });

        const particlesMesh = new Points(particlesGeometry, particlesMaterial);
        scene.add(particlesMesh);

        const clock = new ThreeClock();

        // Animation loop
        const animate = () => {
            animationFrameRef.current = requestAnimationFrame(animate);
            const elapsedTime = clock.getElapsedTime();

            // Rotate main torus
            torusMesh.rotation.x = elapsedTime * 0.3;
            torusMesh.rotation.y = elapsedTime * 0.4;

            // Rotate wireframe slightly offset
            wireframeMesh.rotation.x = elapsedTime * 0.25;
            wireframeMesh.rotation.y = elapsedTime * 0.35;

            // Animate particles
            particlesMesh.rotation.y = elapsedTime * 0.05;
            particlesMesh.rotation.x = Math.sin(elapsedTime * 0.5) * 0.1;

            // Pulse effect on the torus
            const pulse = 1 + Math.sin(elapsedTime * 2) * 0.05;
            torusMesh.scale.setScalar(pulse);

            // Animate emissive intensity
            torusMaterial.emissiveIntensity = 0.3 + Math.sin(elapsedTime * 1.5) * 0.2;

            renderer.render(scene, camera);
        };

        animationFrameRef.current = requestAnimationFrame(animate);

        // Handle resize
        const handleResize = () => {
            camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
        };
        window.addEventListener('resize', handleResize, { passive: true });

        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
            if (currentMount && currentMount.contains(renderer.domElement)) {
                currentMount.removeChild(renderer.domElement);
            }
            renderer.dispose();
        };
    }, []);

    return (
        <div
            ref={mountRef}
            className="w-full h-full"
            style={{
                willChange: 'transform',
                contain: 'layout style paint'
            }}
        />
    );
};

export default HeroDecorative3D;
