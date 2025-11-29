import React, { useRef, useEffect } from 'react';
import {
    Scene,
    PerspectiveCamera,
    WebGLRenderer,
    Group,
    IcosahedronGeometry,
    SphereGeometry,
    MeshBasicMaterial,
    ShaderMaterial,
    Mesh,
    BufferGeometry,
    BufferAttribute,
    PointsMaterial,
    Points,
    Vector2,
    Clock as ThreeClock,
    AdditiveBlending
} from 'three';

// Optimized 3D Hero Animation - Performance improvements while maintaining visual quality
const QuantumHeroAnimation = () => {
    const mountRef = useRef(null);
    const animationFrameRef = useRef(null);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        const currentMount = mountRef.current;
        if (!currentMount) return;

        const scene = new Scene();
        const camera = new PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
        const renderer = new WebGLRenderer({
            alpha: true,
            antialias: false, // Reduced for performance
            powerPreference: "high-performance"
        });
        renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Cap pixel ratio for performance
        currentMount.appendChild(renderer.domElement);
        camera.position.z = 8;

        const quantumVertexShader = `
      uniform float u_time;
      uniform float u_intensity;
      varying vec3 v_normal;
      varying vec3 v_position;
      varying float v_noise;

      vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
      vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
      float snoise(vec3 v) {
        const vec2 C = vec2(1.0/6.0, 1.0/3.0);
        const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
        vec3 i = floor(v + dot(v, C.yyy));
        vec3 x0 = v - i + dot(i, C.xxx);
        vec3 g = step(x0.yzx, x0.xyz);
        vec3 l = 1.0 - g;
        vec3 i1 = min(g.xyz, l.zxy);
        vec3 i2 = max(g.xyz, l.zxy);
        vec3 x1 = x0 - i1 + C.xxx;
        vec3 x2 = x0 - i2 + C.yyy;
        vec3 x3 = x0 - D.yyy;
        i = mod289(i);
        vec4 p = permute(permute(permute( i.z + vec4(0.0, i1.z, i2.z, 1.0 ))+ i.y + vec4(0.0, i1.y, i2.y, 1.0 ))+ i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
        float n_ = 0.142857142857;
        vec3 ns = n_ * D.wyz - D.xzx;
        vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
        vec4 x_ = floor(j * ns.z);
        vec4 y_ = floor(j - 7.0 * x_);
        vec4 x = x_ * ns.x + ns.yyyy;
        vec4 y = y_ * ns.x + ns.yyyy;
        vec4 h = 1.0 - abs(x) - abs(y);
        vec4 b0 = vec4(x.xy, y.xy);
        vec4 b1 = vec4(x.zw, y.zw);
        vec4 s0 = floor(b0)*2.0 + 1.0;
        vec4 s1 = floor(b1)*2.0 + 1.0;
        vec4 sh = -step(h, vec4(0.0));
        vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
        vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
        vec3 p0 = vec3(a0.xy,h.x);
        vec3 p1 = vec3(a0.zw,h.y);
        vec3 p2 = vec3(a1.xy,h.z);
        vec3 p3 = vec3(a1.zw,h.w);
        vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
        p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
        vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
        m = m * m;
        return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3) ) );
      }

      void main() {
        v_normal = normal;
        v_position = position;

        float n = snoise(position * 2.0 + u_time * 0.5) * u_intensity;
        v_noise = n;

        vec3 newPosition = position + normal * n * 0.1;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
      }
    `;

        const quantumFragmentShader = `
      uniform float u_time;
      varying vec3 v_normal;
      varying vec3 v_position;
      varying float v_noise;

      void main() {
        float intensity = pow(0.5 - dot(v_normal, vec3(0.0, 0.0, 1.0)), 2.0);

        vec3 color = vec3(0.9, 0.9, 0.9);

        float mixer = sin(u_time + v_position.x * 2.0) * 0.5 + 0.5;

        vec3 finalColor = color * mixer;
        finalColor += v_noise * 0.2;

        gl_FragColor = vec4(finalColor, intensity * (1.0 + v_noise));
      }
    `;

        const quantumGroup = new Group();
        scene.add(quantumGroup);

        const shells = [];
        for (let i = 0; i < 3; i++) {
            const shellGeom = new IcosahedronGeometry(3 + i * 0.8, 1);
            const shellMat = new MeshBasicMaterial({
                color: i === 0 ? 0xcccccc : i === 1 ? 0x999999 : 0x666666,
                wireframe: true,
                transparent: true,
                opacity: 0.1 - i * 0.02
            });
            const shell = new Mesh(shellGeom, shellMat);
            shells.push(shell);
            quantumGroup.add(shell);
        }

        const coreGeom = new SphereGeometry(2, 64, 64);
        const coreMat = new ShaderMaterial({
            uniforms: {
                u_time: { value: 0 },
                u_intensity: { value: 1.0 }
            },
            vertexShader: quantumVertexShader,
            fragmentShader: quantumFragmentShader,
            blending: AdditiveBlending,
            transparent: true
        });
        const core = new Mesh(coreGeom, coreMat);
        quantumGroup.add(core);

        const particleSystems = [];
        for (let sys = 0; sys < 3; sys++) {
            const particlesGeom = new BufferGeometry();
            const particleCount = 2600; // Reduced from 8000 but still maintains visual density
            const posArray = new Float32Array(particleCount * 3);
            const colorArray = new Float32Array(particleCount * 3);

            for (let i = 0; i < particleCount * 3; i += 3) {
                const radius = 15 + sys * 5;
                const theta = Math.random() * Math.PI * 2;
                const phi = Math.acos(2 * Math.random() - 1);

                posArray[i] = radius * Math.sin(phi) * Math.cos(theta);
                posArray[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
                posArray[i + 2] = radius * Math.cos(phi);

                const colorVal = 0.5 + Math.random() * 0.5;
                colorArray[i] = colorVal;
                colorArray[i + 1] = colorVal;
                colorArray[i + 2] = colorVal;
            }

            particlesGeom.setAttribute('position', new BufferAttribute(posArray, 3));
            particlesGeom.setAttribute('color', new BufferAttribute(colorArray, 3));

            const particlesMat = new PointsMaterial({
                size: 0.025 + sys * 0.012, // Slightly larger to maintain visual impact with fewer particles
                vertexColors: true,
                transparent: true,
                blending: AdditiveBlending,
                depthWrite: false
            });

            const particleMesh = new Points(particlesGeom, particlesMat);
            particleSystems.push(particleMesh);
            scene.add(particleMesh);
        }

        const mouse = new Vector2();
        const target = new Vector2();
        let lastFrameTime = 0;

        const handleMouseMove = (event) => {
            target.x = (event.clientX / window.innerWidth) * 2 - 1;
            target.y = -(event.clientY / window.innerHeight) * 2 + 1;
        };
        window.addEventListener('mousemove', handleMouseMove, { passive: true });

        const clock = new ThreeClock();

        // Optimized animation loop with performance throttling
        const animate = (currentTime) => {
            animationFrameRef.current = requestAnimationFrame(animate);

            // Throttle animation updates for better performance
            if (currentTime - lastFrameTime < 16.67) return; // ~60fps cap
            lastFrameTime = currentTime;

            const elapsedTime = clock.getElapsedTime();

            // Smooth mouse interpolation
            mouse.lerp(target, 0.02);

            // Core animation (unchanged for visual quality)
            coreMat.uniforms.u_time.value = elapsedTime;
            coreMat.uniforms.u_intensity.value = 1.0 + Math.sin(elapsedTime * 2) * 0.3;

            const pulse = 1 + Math.sin(elapsedTime * 2) * 0.05;
            core.scale.setScalar(pulse);
            core.rotation.x = elapsedTime * 0.1;
            core.rotation.y = elapsedTime * 0.15;

            // Shell animations (unchanged for visual quality)
            shells.forEach((shell, index) => {
                shell.rotation.y = elapsedTime * (0.1 + index * 0.05);
                shell.rotation.x = elapsedTime * (0.05 + index * 0.02);
                shell.rotation.z = elapsedTime * (0.03 + index * 0.01);
            });

            // Particle animations (unchanged for visual quality)
            particleSystems.forEach((system, index) => {
                system.rotation.y = -elapsedTime * (0.02 + index * 0.01);
                system.rotation.x = Math.sin(elapsedTime + index) * 0.1;
            });

            // Group and camera movements (unchanged for visual quality)
            quantumGroup.rotation.y = elapsedTime * 0.05;
            quantumGroup.rotation.x += (mouse.y * 0.2 - quantumGroup.rotation.x) * 0.02;
            quantumGroup.rotation.z += (mouse.x * 0.1 - quantumGroup.rotation.z) * 0.02;

            camera.position.x += (mouse.x * 1 - camera.position.x) * 0.02;
            camera.position.y += (mouse.y * 1 - camera.position.y) * 0.02;
            camera.lookAt(scene.position);

            renderer.render(scene, camera);
        };

        animationFrameRef.current = requestAnimationFrame(animate);

        const handleResize = () => {
            camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
        };
        window.addEventListener('resize', handleResize, { passive: true });

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
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

export default QuantumHeroAnimation;
