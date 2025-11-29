import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Layout from '../components/layout';
import GlobalStyles from '../components/globalsyles';
import {
    Menu, X, Mail, Phone, MapPin, ChevronLeft, ChevronRight, Star, ChevronDown, MoveRight,
    Briefcase, Workflow, TrendingUp, Search, Code, BrainCircuit, Lightbulb, Construction,
    Rocket, BarChart, Clock, Target, DollarSign, CheckCircle, Award, Image as ImageIcon, ShoppingCart, Youtube,
    Building, HeartPulse, Car, Plane, ShoppingBag, Utensils, Scale, Zap, Link, FileText, Share2, Bot, Cpu, Database,
    Users, TestTube, Filter, MousePointerClick
} from 'lucide-react';
// Tree-shaken Three.js imports - only import what we actually use
import { 
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  AmbientLight,
  SpotLight,
  TextureLoader,
  PlaneGeometry,
  MeshLambertMaterial,
  DoubleSide,
  Color,
  Mesh,
  RingGeometry,
  MeshBasicMaterial,
  SphereGeometry,
  Vector3,
  TetrahedronGeometry,
  OctahedronGeometry,
  IcosahedronGeometry,
  DodecahedronGeometry,
  BufferGeometry,
  BufferAttribute,
  PointsMaterial,
  AdditiveBlending,
  Points,
  Vector2,
  Clock as ThreeClock
} from 'three';

// --- V13.2: ENHANCED CASE STUDIES WITH CLIENT LOGOS ---

// Custom Hook for Advanced Scroll Animations (Enhanced for Performance)
const useQuantumScrollAnim = (threshold = 0.1, delay = 0) => {
    const ref = useRef(null);
    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        element.classList.add('quantum-visible');
                    }, delay);
                    observer.unobserve(element);
                }
            },
            { 
                threshold,
                rootMargin: '50px 0px', // Enhanced intersection detection
            }
        );
        observer.observe(element);
        return () => {
            if (element) {
                observer.unobserve(element);
            }
        };
    }, [ref, threshold, delay]);
    return ref;
};

// Case Studies Hero Animation with Customer Logos
const CaseStudiesHeroAnimation = () => {
    const mountRef = useRef(null);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        const currentMount = mountRef.current;

        // --- Scene Setup ---
        const scene = new Scene();
        const camera = new PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
        const renderer = new WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        currentMount.appendChild(renderer.domElement);
        camera.position.z = 30;

        // --- Dynamic Lighting ---
        const ambientLight = new AmbientLight(0x404040, 0.3);
        scene.add(ambientLight);
        
        const spotLight = new SpotLight(0xB8FFFA, 3, 100, Math.PI / 6, 0.5);
        spotLight.position.set(20, 20, 20);
        scene.add(spotLight);

        const logos = [];
        const logoTextures = {};
        const geometricShapes = [];
        const plasmaBalls = [];
        
        // All customer logos from the logos folder
        const logoFiles = [
            '225x170_happy_logo.png',
            'Peugeot-@2x.png',
            'bmv.png',
            'clients-logo-bella.png',
            'clients-logo-orehite.png',
            'clients-reshapepng.png',
            'clients_fitnes1.png',
            'nisan.png',
            'partner-parfium.png',
            'partners-aroma.png',
            'partners-goto.png',
            'periodico.png',
            'smart-tower.png',
            'smclogo.png'
        ];
        
        // Load textures with better material properties
        const textureLoader = new TextureLoader();
        logoFiles.forEach(logoFile => {
            logoTextures[logoFile] = textureLoader.load(`/images/logos/${logoFile}`);
        });
        
        // Create holographic logo with glow effect
        const createHolographicLogo = (logoFile) => {
            const geometry = new PlaneGeometry(4, 3);
            
            // Main logo material with holographic effect
            const material = new MeshLambertMaterial({
                map: logoTextures[logoFile],
                transparent: true,
                opacity: 0,
                side: DoubleSide,
                alphaTest: 0.1,
                emissive: new Color(0x001122),
                emissiveIntensity: 0.1 // Reduced from 0.2
            });
            
            const mesh = new Mesh(geometry, material);
            
            // Add multiple glow borders for more dramatic effect
            const borderGeometry = new RingGeometry(1.8, 2.2, 32);
            const borderMaterial = new MeshBasicMaterial({
                color: 0xB8FFFA,
                transparent: true,
                opacity: 0,
                side: DoubleSide
            });
            const border = new Mesh(borderGeometry, borderMaterial);
            mesh.add(border);
            
            // Add outer glow ring
            const outerBorderGeometry = new RingGeometry(2.5, 3.0, 32);
            const outerBorderMaterial = new MeshBasicMaterial({
                color: 0xB8FFFA, // Changed to cyan to match theme
                transparent: true,
                opacity: 0,
                side: DoubleSide
            });
            const outerBorder = new Mesh(outerBorderGeometry, outerBorderMaterial);
            mesh.add(outerBorder);
            
            // Add energy sparks around logo (reduced)
            const sparkGeometry = new SphereGeometry(0.08, 6, 6); // Smaller sparks
            const sparks = [];
            for(let i = 0; i < 3; i++) { // Reduced from 6 to 3 sparks per logo
                const sparkMaterial = new MeshBasicMaterial({
                    color: 0xB8FFFA, // Changed to cyan
                    transparent: true,
                    opacity: 0
                });
                const spark = new Mesh(sparkGeometry, sparkMaterial);
                spark.position.set(
                    (Math.random() - 0.5) * 8,
                    (Math.random() - 0.5) * 6,
                    (Math.random() - 0.5) * 2
                );
                sparks.push(spark);
                mesh.add(spark);
            }
            
            mesh.userData = {
                animOffset: Math.random() * Math.PI * 2,
                animSpeed: new Vector3(
                    0.3 + Math.random() * 0.5,
                    0.4 + Math.random() * 0.6,
                    0.2 + Math.random() * 0.3
                ),
                targetOpacity: 0.6 + Math.random() * 0.3,
                logoFile: logoFile,
                border: border,
                outerBorder: outerBorder,
                sparks: sparks,
                glowPhase: Math.random() * Math.PI * 2,
                sparkPhase: Math.random() * Math.PI * 2
            };

            return mesh;
        };

        // Create geometric background shapes
        const createGeometricShape = () => {
            const shapes = [
                new TetrahedronGeometry(2),
                new OctahedronGeometry(2),
                new IcosahedronGeometry(2),
                new DodecahedronGeometry(2)
            ];
            
            const geometry = shapes[Math.floor(Math.random() * shapes.length)];
            const material = new MeshLambertMaterial({
                color: 0xB8FFFA, // Fixed cyan color instead of random
                transparent: true,
                opacity: 0.1,
                wireframe: Math.random() > 0.5
            });
            
            const mesh = new Mesh(geometry, material);
            mesh.position.set(
                (Math.random() - 0.5) * 80,
                (Math.random() - 0.5) * 80,
                (Math.random() - 0.5) * 80
            );
            
            mesh.userData = {
                rotationSpeed: new Vector3(
                    (Math.random() - 0.5) * 0.02,
                    (Math.random() - 0.5) * 0.02,
                    (Math.random() - 0.5) * 0.02
                ),
                floatSpeed: Math.random() * 0.005 + 0.002
            };
            
            return mesh;
        };

        // Create plasma ball effect
        const createPlasmaBall = () => {
            const geometry = new SphereGeometry(1, 16, 16);
            const material = new MeshBasicMaterial({
                color: 0xB8FFFA, // Changed to cyan
                transparent: true,
                opacity: 0.3,
                wireframe: true
            });
            
            const sphere = new Mesh(geometry, material);
            sphere.position.set(
                (Math.random() - 0.5) * 60,
                (Math.random() - 0.5) * 60,
                (Math.random() - 0.5) * 60
            );
            
            // Add inner core
            const coreGeometry = new SphereGeometry(0.5, 8, 8);
            const coreMaterial = new MeshBasicMaterial({
                color: 0xB8FFFA, // Changed to cyan
                transparent: true,
                opacity: 0.8
            });
            const core = new Mesh(coreGeometry, coreMaterial);
            sphere.add(core);
            
            sphere.userData = {
                rotationSpeed: new Vector3(
                    (Math.random() - 0.5) * 0.05,
                    (Math.random() - 0.5) * 0.05,
                    (Math.random() - 0.5) * 0.05
                ),
                pulsePhase: Math.random() * Math.PI * 2,
                core: core
            };
            
            return sphere;
        };

        // --- Initialize Everything ---
        
        // Create geometric background shapes with reduced opacity
        for(let i = 0; i < 8; i++) { // Reduced from 20 to 8
            const shape = createGeometricShape();
            shape.material.opacity = 0.03; // Further reduced opacity
            geometricShapes.push(shape);
            scene.add(shape);
        }
        
        // Create plasma balls
        for(let i = 0; i < 4; i++) { // Reduced from 8 to 4
            const plasma = createPlasmaBall();
            plasmaBalls.push(plasma);
            scene.add(plasma);
        }
        
        // Create logo constellation
        const logoPositions = [];
        logoFiles.forEach((logoFile, i) => {
            const logo = createHolographicLogo(logoFile);
            
            // Position in DNA helix pattern
            const t = (i / logoFiles.length) * Math.PI * 4;
            const radius = 25;
            
            logo.position.set(
                Math.cos(t) * radius,
                (i - logoFiles.length / 2) * 4,
                Math.sin(t) * radius
            );
            
            logo.userData.origin = logo.position.clone();
            logo.userData.helixT = t;
            logoPositions.push(logo.position.clone());
            
            logos.push(logo);
            scene.add(logo);
        });

        // --- Energy Particles ---
        const particleGeom = new BufferGeometry();
        const particleCount = 200; // Further reduced from 500 to 200 (~60% reduction from original)
        const posArray = new Float32Array(particleCount * 3);
        const colorArray = new Float32Array(particleCount * 3);
        
        for(let i = 0; i < particleCount; i++) {
            // Position
            posArray[i * 3] = (Math.random() - 0.5) * 100;
            posArray[i * 3 + 1] = (Math.random() - 0.5) * 100;
            posArray[i * 3 + 2] = (Math.random() - 0.5) * 100;
            
            // Consistent cyan colors
            colorArray[i * 3] = 0.7;     // Red component (low for cyan)
            colorArray[i * 3 + 1] = 1.0; // Green component 
            colorArray[i * 3 + 2] = 1.0; // Blue component
        }
        
        particleGeom.setAttribute('position', new BufferAttribute(posArray, 3));
        particleGeom.setAttribute('color', new BufferAttribute(colorArray, 3));
        
        const particleMat = new PointsMaterial({
            size: 0.6, // Reduced from 0.8
            transparent: true,
            opacity: 0.25, // Further reduced from 0.4
            vertexColors: true,
            blending: AdditiveBlending,
            depthWrite: false,
        });
        
        const particles = new Points(particleGeom, particleMat);
        scene.add(particles);

        // --- Mouse Interaction ---
        const mouse = new Vector2();
        const target = new Vector2();
        const handleMouseMove = (event) => {
            target.x = (event.clientX / window.innerWidth) * 2 - 1;
            target.y = -(event.clientY / window.innerHeight) * 2 + 1;
        };
        window.addEventListener('mousemove', handleMouseMove);

        // --- Animation Loop ---
        const clock = new ThreeClock();
        const animate = () => {
            requestAnimationFrame(animate);
            const elapsedTime = clock.getElapsedTime();

            mouse.lerp(target, 0.08);

            // Animate holographic logos in DNA helix
            logos.forEach((logo, index) => {
                const { userData } = logo;
                
                // Fade in effect
                if (logo.material.opacity < userData.targetOpacity) {
                    logo.material.opacity += 0.01;
                    userData.border.material.opacity += 0.005;
                    userData.outerBorder.material.opacity += 0.003;
                }
                
                // DNA Helix rotation and movement
                const helixSpeed = elapsedTime * 0.5;
                const radius = 25 + Math.sin(helixSpeed + userData.helixT) * 5;
                
                logo.position.x = Math.cos(userData.helixT + helixSpeed) * radius;
                logo.position.z = Math.sin(userData.helixT + helixSpeed) * radius;
                logo.position.y = userData.origin.y + Math.sin(elapsedTime * 0.3 + index) * 3;
                
                // Holographic glow effect with reduced intensity
                const glowIntensity = Math.sin(elapsedTime * 3 + userData.glowPhase) * 0.3 + 0.3;
                userData.border.material.opacity = glowIntensity * 0.2;
                userData.outerBorder.material.opacity = glowIntensity * 0.15;
                logo.material.emissiveIntensity = glowIntensity * 0.2;
                
                // Animate energy sparks with consistent color
                userData.sparks.forEach((spark, sparkIndex) => {
                    const sparkTime = elapsedTime * 2 + userData.sparkPhase + sparkIndex;
                    spark.material.opacity = Math.sin(sparkTime) * 0.3 + 0.1;
                    spark.material.color.setHSL(0.5, 0.8, 0.7); // Consistent cyan color
                    
                    // Make sparks orbit around logo
                    const sparkRadius = 4 + Math.sin(sparkTime) * 1;
                    const sparkAngle = sparkTime + sparkIndex * Math.PI / 3;
                    spark.position.x = Math.cos(sparkAngle) * sparkRadius;
                    spark.position.y = Math.sin(sparkAngle) * sparkRadius * 0.5;
                    spark.position.z = Math.sin(sparkAngle * 0.7) * 2;
                });
                
                // Logo rotation with more dramatic effect
                logo.rotation.y = elapsedTime * 0.8 + userData.animOffset;
                logo.rotation.x = Math.sin(elapsedTime * 1.2 + userData.animOffset) * 0.3;
                logo.rotation.z = Math.cos(elapsedTime * 0.9 + userData.animOffset) * 0.1;
                
                // Scale breathing effect with more intensity
                const breathe = 1 + Math.sin(elapsedTime * 2 + userData.animOffset) * 0.15;
                logo.scale.setScalar(breathe);
            });
            
            // Animate geometric shapes with consistent cyan theme
            geometricShapes.forEach(shape => {
                shape.rotation.x += shape.userData.rotationSpeed.x * 2; // Double rotation speed
                shape.rotation.y += shape.userData.rotationSpeed.y * 2;
                shape.rotation.z += shape.userData.rotationSpeed.z * 2;
                
                // More chaotic movement with multiple wave patterns
                const complexity = elapsedTime * 0.8;
                const baseY = shape.position.y;
                shape.position.y = baseY + 
                    Math.sin(complexity * shape.userData.floatSpeed) * 0.15 +
                    Math.cos(complexity * shape.userData.floatSpeed * 1.3) * 0.08 +
                    Math.sin(complexity * shape.userData.floatSpeed * 2.1) * 0.05;
                
                // Consistent cyan color with subtle variations
                const brightness = 0.4 + Math.sin(elapsedTime * 2) * 0.1;
                shape.material.color.setHSL(0.5, 0.8, brightness);
                
                // More dramatic scale pulsing with layered effects
                const pulse1 = Math.sin(elapsedTime * 5 + shape.position.x) * 0.3;
                const pulse2 = Math.cos(elapsedTime * 7 + shape.position.z) * 0.2;
                const pulse3 = Math.sin(elapsedTime * 3 + shape.position.y) * 0.1;
                const finalScale = 1 + pulse1 + pulse2 + pulse3;
                shape.scale.setScalar(finalScale);
            });
            
            // Animate plasma balls with consistent cyan theme
            plasmaBalls.forEach(plasma => {
                plasma.rotation.x += plasma.userData.rotationSpeed.x * 1.5;
                plasma.rotation.y += plasma.userData.rotationSpeed.y * 1.5;
                plasma.rotation.z += plasma.userData.rotationSpeed.z * 1.5;
                
                // Reduced pulsing effect
                const pulse1 = Math.sin(elapsedTime * 6 + plasma.userData.pulsePhase) * 0.3 + 0.3;
                const pulse2 = Math.cos(elapsedTime * 4 + plasma.userData.pulsePhase * 0.7) * 0.2 + 0.2;
                const finalPulse = (pulse1 + pulse2) * 0.5;
                
                plasma.material.opacity = 0.1 + finalPulse * 0.2;
                plasma.userData.core.material.opacity = 0.3 + finalPulse * 0.2;
                
                // Consistent cyan color scheme
                plasma.material.color.setHSL(0.5, 0.8, 0.6);
                plasma.userData.core.material.color.setHSL(0.5, 1.0, 0.8);
                
                // Floating movement with multiple wave patterns
                plasma.position.y += 
                    Math.sin(elapsedTime * 3 + plasma.userData.pulsePhase) * 0.15 +
                    Math.cos(elapsedTime * 1.7 + plasma.userData.pulsePhase * 1.3) * 0.08;
                    
                // Scale variations
                const scale = 1 + Math.sin(elapsedTime * 5 + plasma.userData.pulsePhase) * 0.3;
                plasma.scale.setScalar(scale);
            });
            
            // Enhanced particle animation with consistent cyan theme
            const positions = particles.geometry.attributes.position.array;
            const colors = particles.geometry.attributes.color.array;
            
            for(let i = 0; i < positions.length; i += 3) {
                // Multiple wave patterns creating chaos
                const waveY = Math.sin(elapsedTime * 3 + positions[i] * 0.2) * 0.05;
                const waveX = Math.cos(elapsedTime * 2.5 + positions[i + 2] * 0.15) * 0.03;
                const waveZ = Math.sin(elapsedTime * 4 + positions[i + 1] * 0.1) * 0.04;
                
                // Spiral motion
                const spiralRadius = Math.sin(elapsedTime * 0.5) * 0.02;
                const spiralAngle = elapsedTime * 2 + i * 0.1;
                const spiralX = Math.cos(spiralAngle) * spiralRadius;
                const spiralZ = Math.sin(spiralAngle) * spiralRadius;
                
                positions[i + 1] += waveY;
                positions[i] += waveX + spiralX;
                positions[i + 2] += waveZ + spiralZ;
                
                // Consistent cyan color scheme with subtle variations
                const brightness = 0.4 + Math.sin(elapsedTime * 1.5 + i * 0.1) * 0.2;
                colors[i] = 0.3 + brightness * 0.2;      // Low red for cyan
                colors[i + 1] = brightness;              // Green
                colors[i + 2] = brightness;              // Blue
            }
            
            particles.geometry.attributes.position.needsUpdate = true;
            particles.geometry.attributes.color.needsUpdate = true;
            
            // Dramatic particle system rotation with multiple axes
            particles.rotation.y = elapsedTime * 0.5;
            particles.rotation.x = Math.sin(elapsedTime * 0.3) * 0.2;
            particles.rotation.z = Math.cos(elapsedTime * 0.4) * 0.1;
            
            // Subtle lighting animation with consistent cyan theme
            spotLight.position.x = Math.cos(elapsedTime * 0.7) * 40 + Math.sin(elapsedTime * 1.3) * 10;
            spotLight.position.z = Math.sin(elapsedTime * 0.5) * 40 + Math.cos(elapsedTime * 1.1) * 10;
            spotLight.position.y = 20 + Math.sin(elapsedTime * 0.8) * 15;
            spotLight.intensity = 2 + Math.sin(elapsedTime * 4) * 1; // Reduced intensity
            
            // Keep consistent cyan-blue lighting
            spotLight.color.setHSL(0.5, 0.8, 0.7);
            
            // Camera movement with mouse and automatic drift
            const autoDriftX = Math.sin(elapsedTime * 0.1) * 5;
            const autoDriftY = Math.cos(elapsedTime * 0.07) * 3;
            
            camera.position.x += (mouse.x * 15 + autoDriftX - camera.position.x) * 0.03;
            camera.position.y += (-mouse.y * 12 + autoDriftY - camera.position.y) * 0.03;
            camera.position.z = 30 + Math.sin(elapsedTime * 0.2) * 5; // Breathing zoom
            camera.lookAt(scene.position);

            renderer.render(scene, camera);
        };
        animate();

        const handleResize = () => {
            camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            if (currentMount && renderer.domElement.parentNode === currentMount) {
                currentMount.removeChild(renderer.domElement);
            }
        };
    }, []);

    return <div ref={mountRef} className="absolute inset-0 z-0" />;
};


// Case Studies Hero Section
const CaseStudiesHero = () => {
  const [textIndex, setTextIndex] = useState(0);
  const texts = [
    "Shared Success Stories",
    "Proven Marketing Results", 
    "Client Growth Showcase",
    "Partnership Victories"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex(prev => (prev + 1) % texts.length);
    }, 7500); // Increased from 6000ms to 7500ms for better performance
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden hero-section">
      <CaseStudiesHeroAnimation />
      
      <div className="absolute inset-0 hero-overlay-1 z-10"></div>
      
      <div className="relative z-20 text-center text-white max-w-5xl mx-auto px-4">
        <div className="mb-8">
          <div className="text-xs tracking-widest text-gray-400 mb-4 font-inter glitch-text">
            BYLT.MEDIA × MARKETISE.ME // SHARED SUCCESS
          </div>
          <h1 className="text-6xl md:text-8xl font-bold mb-6 font-inter hero-title">
            <span className="quantum-text" key={textIndex}>
              {texts[textIndex]}
            </span>
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-200 max-w-4xl mx-auto hero-subtitle leading-relaxed">
            Explore our collaborative case studies with Marketise Me, showcasing combined expertise that delivers exceptional results for clients across diverse industries and markets.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center hero-cta">
          <a href="#contact" className="quantum-button-hero">
            <span>Start Your Success Story</span>
          </a>
          <a href="#case-studies" className="hologram-button">
            <span>View Case Studies</span>
          </a>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
        <div className="quantum-scroll-indicator">
          <div className="scroll-quantum-dot"></div>
        </div>
      </div>
    </section>
  );
};

// Case Studies Grid Section (REDESIGNED LAYOUT)
const CaseStudiesGrid = () => {
    const sectionRef = useQuantumScrollAnim();

    const caseStudiesData = [
        { 
            id: 1, 
            client: 'Nissan Bulgaria', 
            title: 'Driving High-Quality Leads for a Global Automotive Leader', 
            description: 'How we transformed Nissan Bulgaria\'s digital strategy to generate over 2,000 qualified test drive requests through targeted performance marketing and conversion optimization.',
            category: 'Paid Media', 
            imageUrl: '/images/casestudy/nissan-case-study.webp', 
            link: '/case-studies-nissan',
            stats: [
                { value: '2,000+', label: 'Test Drive Requests' },
                { value: '25%', label: 'Landing Page CVR' }
            ]
        },
        { 
            id: 2, 
            client: 'Parfium.bg', 
            title: 'Increasing revenue in Google Ads through analysis and implementing the right strategy', 
            description: 'Parfium.bg uses Google Ads to increase sales during Black Friday and Christmas while improving data collection for better optimisation.',
            category: 'Paid Media', 
            imageUrl: '/images/casestudy/parfium.bg-case-study.webp', 
            link: '/case-studies-parfium',
            stats: [
                { value: '-25%', label: 'CPA on Black Friday' },
                { value: '+45%', label: 'ROAS' }
            ]
        },
        { 
            id: 3, 
            client: 'CSKA 1948', 
            title: 'Increasing sales and fan base of CSKA 1948', 
            description: 'CSKA Sofia 1948 strives to increase sales and fan engagement through a comprehensive digital strategy.',
            category: 'Social Media', 
            imageUrl: '/images/casestudy/cska-case-study.webp', 
            link: '/case-studies-cska',
            stats: [
                { value: '6X', label: 'ROAS' },
                { value: '3X', label: 'Engagements' }
            ]
        },
        { 
            id: 4, 
            client: 'Napudreni', 
            title: 'Improve the online presence about Napudreni', 
            description: 'Napudreni is a Bulgarian fashion brand that aimed to enhance its online presence and engagement to drive sales growth.',
            category: 'Digital Marketing', 
            imageUrl: '/images/casestudy/napudreni-case-study.webp', 
            link: '/case-studies-napudreni',
            stats: [
                { value: '+75%', label: 'Website traffic' },
                { value: '+60%', label: 'More sales' }
            ]
        },
        { 
            id: 5, 
            client: 'Happy Bar & Grill', 
            title: 'Boosting Traffic and Engagement for Happy Bar & Grill', 
            description: 'Happy Bar & Grill is the most popular restaurant chain in Bulgaria. The goal was to increase website traffic and engagement, particularly for seasonal menus and location-specific pages.',
            category: 'Social Media', 
            imageUrl: '/images/casestudy/happy-case-study.webp', 
            link: '/case-studies-happy',
            stats: [
                { value: '16.5M', label: 'Impressions' },
                { value: '362K', label: 'Video Views' }
            ]
        },
        { 
            id: 6, 
            client: 'Brickell Automotive Group', 
            title: 'Expanding the customer base and brand awareness for Brickell Automotive Group', 
            description: 'Brickell Automotive Group needed to increase online engagement and acquire higher-quality leads through targeted campaigns on Meta.',
            category: 'Paid Media', 
            imageUrl: '/images/casestudy/brickell-case-study.webp', 
            link: '/case-studies-brickell',
            stats: [
                { value: '2.5%', label: 'CTR' },
                { value: '15K', label: 'Impressions' }
            ]
        }
    ];

    return (
        <section id="case-studies" ref={sectionRef} className="py-24 bg-slate-900/30 relative quantum-anim">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="space-y-24">
                    {caseStudiesData.map((study, index) => (
                        <div key={study.id} className="case-study-item grid grid-cols-1 lg:grid-cols-2 gap-16 items-center" style={{ animationDelay: `${index * 150}ms`}}>
                            <div className={`case-logo-container ${index % 2 !== 0 ? 'lg:order-last' : ''}`}>
                                <div className="image-wrapper">
                                    <img src={study.imageUrl} alt={study.client} className="case-logo" onError={(e) => { e.target.onerror = null; e.target.src=`https://placehold.co/800x600/1e293b/B8FFFA?text=${study.client}`; }} />
                                    <div className="image-overlay"></div>
                                </div>
                            </div>
                            
                            <div className="case-content">
                                <div className="case-category-badge">{study.category}</div>
                                <h2 className="case-title">{study.title}</h2>
                                <p className="case-description">{study.description}</p>
                                
                                <div className="case-stats">
                                    {study.stats.map((stat, statIndex) => (
                                        <div key={statIndex} className="stat-box">
                                            <div className="stat-value">{stat.value}</div>
                                            <div className="stat-label">{stat.label}</div>
                                        </div>
                                    ))}
                                </div>
                                
                                <a href={study.link} className="view-more-button">
                                    <span>VIEW CASE STUDY</span>
                                    <MoveRight size={18} className="ml-2" />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <style jsx>{`
                #case-studies {
                    contain: layout style;
                    transform: translateZ(0); /* Hardware acceleration */
                    will-change: transform;
                }
                
                .case-study-item {
                    opacity: 0;
                    transform: translateY(50px);
                    animation: caseItemFadeIn 0.8s ease forwards;
                    position: relative;
                    transform: translateZ(0); /* Hardware acceleration */
                    will-change: opacity, transform;
                }
                
                .case-study-item:nth-child(even) {
                    animation-delay: 0.2s;
                }
                
                @keyframes caseItemFadeIn {
                    to { opacity: 1; transform: translate3d(0, 0, 0); } /* Hardware-accelerated transform */
                }
                
                .case-logo-container {
                    position: relative;
                    padding: 0;
                }
                
                .image-wrapper {
                    position: relative;
                    border-radius: 20px;
                    overflow: hidden;
                    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
                    transition: all 0.4s ease;
                    transform: translateZ(0); /* Hardware acceleration */
                    will-change: transform, box-shadow;
                }
                
                .case-logo {
                    width: 100%;
                    height: auto;
                    aspect-ratio: 16 / 10;
                    object-fit: cover;
                    transition: all 0.4s ease;
                    transform: translateZ(0); /* Hardware acceleration */
                    will-change: transform;
                }
                
                .image-overlay {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(135deg, rgba(184, 255, 250, 0.1), rgba(30, 41, 59, 0.2));
                    opacity: 0;
                    transition: all 0.4s ease;
                    transform: translateZ(0); /* Hardware acceleration */
                    will-change: opacity;
                }
                
                .case-study-item:hover .image-wrapper {
                    transform: translate3d(0, -8px, 0); /* Hardware-accelerated transform */
                    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
                }
                
                .case-study-item:hover .case-logo {
                    transform: scale(1.05);
                }
                
                .case-study-item:hover .image-overlay {
                    opacity: 1;
                }
                
                .case-content {
                    text-align: left;
                    position: relative;
                    transform: translateZ(0); /* Hardware acceleration */
                    will-change: transform;
                }
                
                .case-category-badge {
                    display: inline-block;
                    background: linear-gradient(135deg, #B8FFFA, #9DFFF8);
                    color: #1e293b;
                    padding: 0.5rem 1.25rem;
                    border-radius: 25px;
                    font-size: 0.75rem;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                    margin-bottom: 1.5rem;
                    font-family: 'Inter', sans-serif;
                }
                
                .case-title {
                    font-size: 2.25rem;
                    font-weight: 800;
                    color: white;
                    line-height: 1.2;
                    margin-bottom: 1.5rem;
                    font-family: 'Inter', sans-serif;
                    background: linear-gradient(135deg, #ffffff, #e5e7eb);
                    background-clip: text;
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    transform: translateZ(0); /* Hardware acceleration */
                    will-change: transform;
                }
                
                .case-description {
                    color: #94a3b8;
                    line-height: 1.7;
                    font-size: 1.125rem;
                    margin-bottom: 2.5rem;
                    font-family: 'Inter', sans-serif;
                    transform: translateZ(0); /* Hardware acceleration */
                    will-change: transform;
                }
                
                .case-stats {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 2rem;
                    margin-bottom: 3rem;
                    transform: translateZ(0); /* Hardware acceleration */
                    will-change: transform;
                }
                
                .stat-box {
                    background: rgba(30, 41, 59, 0.6);
                    padding: 1.5rem;
                    border-radius: 16px;
                    border: 1px solid #374151;
                    text-align: center;
                    position: relative;
                    overflow: hidden;
                    transition: all 0.3s ease;
                    transform: translateZ(0); /* Hardware acceleration */
                    will-change: transform, border-color, box-shadow;
                }
                
                .stat-box::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    height: 3px;
                    background: linear-gradient(90deg, #B8FFFA, #9DFFF8);
                    transform: translate3d(-100%, 0, 0); /* Hardware-accelerated transform */
                    transition: transform 0.6s ease;
                }
                
                .case-study-item:hover .stat-box::before {
                    transform: translate3d(0, 0, 0); /* Hardware-accelerated transform */
                }
                
                .stat-box:hover {
                    border-color: #B8FFFA;
                    transform: translate3d(0, -3px, 0); /* Hardware-accelerated transform */
                    box-shadow: 0 10px 30px rgba(184, 255, 250, 0.1);
                }
                
                .stat-value {
                    font-size: 2.5rem;
                    font-weight: 900;
                    color: #B8FFFA;
                    line-height: 1;
                    margin-bottom: 0.5rem;
                    font-family: 'Inter', sans-serif;
                }
                
                .stat-label {
                    font-size: 0.875rem;
                    color: #9ca3af;
                    font-weight: 500;
                    font-family: 'Inter', sans-serif;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                }
                
                .view-more-button {
                    display: inline-flex;
                    align-items: center;
                    background: linear-gradient(135deg, #B8FFFA, #9DFFF8);
                    color: #1e293b;
                    border: none;
                    padding: 1rem 2.5rem;
                    border-radius: 12px;
                    font-weight: 700;
                    font-size: 0.875rem;
                    text-decoration: none;
                    transition: all 0.3s ease;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                    font-family: 'Inter', sans-serif;
                    box-shadow: 0 4px 15px rgba(184, 255, 250, 0.3);
                    position: relative;
                    overflow: hidden;
                    transform: translateZ(0); /* Hardware acceleration */
                    will-change: transform, box-shadow;
                }
                
                .view-more-button::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(135deg, #9DFFF8, #7FFFF4);
                    opacity: 0;
                    transition: opacity 0.3s ease;
                }
                
                .view-more-button:hover::before {
                    opacity: 1;
                }
                
                .view-more-button:hover {
                    transform: translate3d(0, -3px, 0); /* Hardware-accelerated transform */
                    box-shadow: 0 8px 25px rgba(184, 255, 250, 0.4);
                }
                
                .view-more-button span,
                .view-more-button svg {
                    position: relative;
                    z-index: 1;
                }
                
                @media (max-width: 1024px) {
                    .case-content {
                        text-align: center;
                    }
                    
                    .case-title {
                        font-size: 2rem;
                    }
                    
                    .case-description {
                        font-size: 1rem;
                    }
                    
                    .case-stats {
                        justify-content: center;
                        gap: 1.5rem;
                    }
                    
                    .stat-value {
                        font-size: 2.25rem;
                    }
                    
                    .image-wrapper {
                        margin-bottom: 2rem;
                    }
                }
                
                @media (max-width: 768px) {
                    .case-stats {
                        grid-template-columns: 1fr;
                        gap: 1rem;
                    }
                    
                    .stat-box {
                        padding: 1.25rem;
                    }
                    
                    .case-title {
                        font-size: 1.75rem;
                    }
                }
            `}</style>
        </section>
    );
};

// Contact Section
const NeuralContact = () => {
    const sectionRef = useQuantumScrollAnim();
    const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', company: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);
        try {
            const subject = encodeURIComponent(`New Project Inquiry from ${formData.firstName} ${formData.lastName}`);
            const body = encodeURIComponent(`Name: ${formData.firstName} ${formData.lastName}\nEmail: ${formData.email}\nCompany: ${formData.company}\n\nMessage:\n${formData.message}`);
            window.location.href = `mailto:info@bookedupmedia.com?subject=${subject}&body=${body}`;
            setSubmitStatus('success');
            setFormData({ firstName: '', lastName: '', email: '', company: '', message: '' });
        } catch (error) {
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };
    
    return (
        <section id="contact" ref={sectionRef} className="py-24 bg-slate-900/30 quantum-anim relative overflow-hidden">
            <div className="absolute inset-0 contact-neural-grid"></div>
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                <div className="text-center mb-12">
                    <div className="section-title-container">
                        <h2 className="section-title-enhanced">Let's Build Your Success Story</h2>
                        <div className="title-accent-line"></div>
                    </div>
                    <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                        Inspired by our results? Tell us about your project, and let's create your case study together.
                    </p>
                </div>
                <div className="contact-form-container">
                    <form onSubmit={handleSubmit} className="contact-form">
                        <div className="form-grid">
                            <div className="form-group"><label htmlFor="firstName" className="form-label">First Name *</label><input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleInputChange} required className="form-input" placeholder="Enter your first name" /></div>
                            <div className="form-group"><label htmlFor="lastName" className="form-label">Last Name *</label><input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleInputChange} required className="form-input" placeholder="Enter your last name" /></div>
                            <div className="form-group"><label htmlFor="email" className="form-label">Email Address *</label><input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required className="form-input" placeholder="your.email@company.com" /></div>
                            <div className="form-group"><label htmlFor="company" className="form-label">Company Website</label><input type="text" id="company" name="company" value={formData.company} onChange={handleInputChange} className="form-input" placeholder="www.yourcompany.com" /></div>
                        </div>
                        <div className="form-group"><label htmlFor="message" className="form-label">Message *</label><textarea id="message" name="message" value={formData.message} onChange={handleInputChange} required rows={6} className="form-textarea" placeholder="Tell us about your project, your goals, and any challenges you're facing..."></textarea></div>
                        <div className="form-submit"><button type="submit" disabled={isSubmitting} className="neural-submit-button">{isSubmitting ? (<><div className="submit-spinner"></div><span>Sending...</span></>) : (<><span>Send Message</span><MoveRight className="ml-3 transition-transform duration-300" /></>)}</button></div>
                        {submitStatus === 'success' && (<div className="status-message success"><Mail className="w-5 h-5" /><span>Thank you! Your message has been prepared.</span></div>)}
                        {submitStatus === 'error' && (<div className="status-message error"><X className="w-5 h-5" /><span>There was an error. Please try sending an email directly.</span></div>)}
                    </form>
                </div>
            </div>
            <style jsx>{`
                .contact-neural-grid { background-image: linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px); background-size: 40px 40px; }
                .contact-form-container { position: relative; max-width: 800px; margin: 0 auto 3rem auto; padding: 2px; background: linear-gradient(45deg, #4b5563, #1e293b); border-radius: 24px; }
                .contact-form { background: #1e293b; border-radius: 22px; padding: 3rem; position: relative; z-index: 2; }
                .form-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; margin-bottom: 1.5rem; }
                .form-group { position: relative; }
                .form-label { display: block; font-family: 'Inter', sans-serif; font-size: 0.875rem; font-weight: 600; color: #e5e7eb; margin-bottom: 0.5rem; text-transform: uppercase; letter-spacing: 0.05em; }
                .form-input, .form-textarea { width: 100%; padding: 1rem 1.25rem; background: rgba(30, 41, 59, 0.5); border: 1px solid #374151; border-radius: 12px; color: #e5e7eb; font-family: 'Inter', sans-serif; font-size: 1rem; transition: all 0.3s ease; backdrop-filter: blur(8px); }
                .form-input:focus, .form-textarea:focus { outline: none; border-color: #B8FFFA; background: rgba(30, 41, 59, 0.8); box-shadow: 0 0 0 2px rgba(184, 255, 250, 0.1); }
                .form-input::placeholder, .form-textarea::placeholder { color: #9ca3af; }
                .form-textarea { resize: vertical; min-height: 120px; }
                .form-submit { display: flex; justify-content: center; margin-top: 2rem; }
                .neural-submit-button { position: relative; display: inline-flex; align-items: center; justify-content: center; padding: 1.25rem 2.5rem; font-weight: 700; font-size: 1.125rem; color: #1e293b; background: #B8FFFA; border: none; border-radius: 15px; font-family: 'Inter', sans-serif; text-decoration: none; transition: all 0.4s ease; cursor: pointer; min-width: 180px; transform: translateZ(0); will-change: transform, box-shadow; }
                .neural-submit-button:hover:not(:disabled) { transform: translate3d(0, -3px, 0) scale(1.05); box-shadow: 0 10px 30px rgba(184, 255, 250, 0.3); background: #9DFFF8; }
                .neural-submit-button:disabled { opacity: 0.7; cursor: not-allowed; transform: none; }
                .submit-spinner { width: 20px; height: 20px; border: 2px solid transparent; border-top: 2px solid #1e293b; border-radius: 50%; animation: spin 1s linear infinite; margin-right: 0.75rem; }
                @keyframes spin { 
                    0% { 
                        transform: rotate3d(0, 0, 1, 0deg); 
                    } 
                    100% { 
                        transform: rotate3d(0, 0, 1, 360deg); 
                    } 
                }
                .status-message { display: flex; align-items: center; gap: 0.75rem; padding: 1rem 1.25rem; margin-top: 1.5rem; border-radius: 12px; font-family: 'Inter', sans-serif; font-size: 0.875rem; font-weight: 500; }
                .status-message.success { background: rgba(34, 197, 94, 0.1); border: 1px solid rgba(34, 197, 94, 0.3); color: #22c55e; }
                .status-message.error { background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.3); color: #ef4444; }
                @media (max-width: 768px) { .form-grid { grid-template-columns: 1fr; gap: 1rem; } .contact-form { padding: 2rem; } .neural-submit-button { padding: 1rem 2rem; font-size: 1rem; } }
            `}</style>
        </section>
    );
};

// Main App Component for Case Studies Page
const CaseStudiesPage = () => {
    return (
        <Layout>
            <Head>
                <title>Case Studies - Proven Results | BYLT Media</title>
                <meta name="description" content="Explore our case studies and see how BYLT Media drives growth for clients across Paid Media, SEO, AI, and more." />
                <link rel="icon" href="/favicon.ico" />
                <link rel="canonical" href="https://www.byltmedia.com/casestudies" />
                <meta name="robots" content="index, follow" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
            </Head>
            <GlobalStyles />
            
            <CaseStudiesHero />
            <CaseStudiesGrid />
            <NeuralContact />
        </Layout>
    );
};

export default CaseStudiesPage;
