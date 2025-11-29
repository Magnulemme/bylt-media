import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/layout';
import GlobalStyles from '../components/globalsyles';
import {
    Menu, X, Mail, Phone, MapPin, ChevronLeft, ChevronRight, Star, ChevronDown, MoveRight,
    Briefcase, Workflow, TrendingUp, Search, Code, BrainCircuit, Lightbulb, Construction,
    Rocket, BarChart, Clock, Target, DollarSign, CheckCircle, Award, Image as ImageIcon, ShoppingCart, Youtube,
    Building, HeartPulse, Car, Plane, ShoppingBag, Utensils, Scale, Zap
} from 'lucide-react';
// Tree-shaken Three.js imports - only import what we actually use
import { 
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  Group,
  CanvasTexture,
  MeshBasicMaterial,
  AdditiveBlending,
  PlaneGeometry,
  Mesh,
  Vector3,
  BufferGeometry,
  BufferAttribute,
  PointsMaterial,
  Points,
  Vector2,
  Clock as ThreeClock,
  MeshStandardMaterial,
  RingGeometry,
  CylinderGeometry,
  IcosahedronGeometry,
  BoxGeometry,
  TorusKnotGeometry,
  AmbientLight,
  DirectionalLight,
  TorusGeometry,
  SphereGeometry,
  ConeGeometry
} from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';


// --- V9.1: ENHANCED DYNAMIC SEARCH QUERY THEME ---

// Optimized Custom Hook for Advanced Scroll Animations with Performance Enhancements
const useQuantumScrollAnim = (threshold = 0.1, delay = 0) => {
    const ref = useRef(null);
    const animationFrameRef = useRef(null);
    
    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    const animate = () => {
                        setTimeout(() => {
                            element.classList.add('quantum-visible');
                        }, delay);
                    };
                    
                    animationFrameRef.current = requestAnimationFrame(animate);
                    observer.unobserve(element);
                }
            },
            { threshold, rootMargin: '50px' }
        );
        
        observer.observe(element);
        
        return () => {
            if (element) {
                observer.unobserve(element);
            }
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [ref, threshold, delay]);
    
    return ref;
};

// Optimized ENHANCED: Floating Search Bar Animation with Performance Enhancements
const PaidSearchHeroAnimation = () => {
    const mountRef = useRef(null);
    const animationFrameRef = useRef(null);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        const currentMount = mountRef.current;

        // --- Scene Setup ---
        const scene = new Scene();
        const camera = new PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
        const renderer = new WebGLRenderer({ 
            alpha: true, 
            antialias: true,
            powerPreference: "high-performance"
        });
        renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        currentMount.appendChild(renderer.domElement);
        camera.position.z = 15;

        // --- Content ---
        const searchQueries = [
            "best ecommerce store", "best hotel in london", "local SEO services",
            "PPC management agency", "how to increase ROI", "google ads expert",
            "website design company", "AI marketing tools", "top digital agencies",
            "social media marketing", "content strategy", "lead generation funnels",
            "b2b marketing trends", "new york pizza delivery", "e-learning platforms"
        ];

        const searchBars = [];

        // --- Helper function to create a search bar ---
        const createSearchBar = (initialText) => {
            const group = new Group();
            const barWidth = 3.5; // Much smaller width
            const barHeight = 0.4; // Much smaller height

            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.width = 384; // Smaller canvas
            canvas.height = 48; // Smaller canvas

            const texture = new CanvasTexture(canvas);
            const material = new MeshBasicMaterial({
                map: texture,
                transparent: true,
                opacity: 0,
                depthWrite: false,
                blending: AdditiveBlending,
            });

            const geometry = new PlaneGeometry(barWidth, barHeight);
            const plane = new Mesh(geometry, material);
            group.add(plane);

            group.userData = {
                context,
                texture,
                material,
                text: '',
                fullText: initialText,
                animationState: 'typing',
                charIndex: 0,
                pauseCounter: 0,
                pauseDuration: 60 + Math.random() * 40,
                // More dynamic movement properties
                animOffset: Math.random() * Math.PI * 2,
                animSpeed: new Vector3(
                    0.2 + Math.random() * 0.2,
                    0.3 + Math.random() * 0.2,
                    0.1 + Math.random() * 0.2
                ),
                targetOpacity: 0.2 + Math.random() * 0.15, // More visible
            };
            
            return group;
        };

        // --- Helper function to draw the search bar's appearance with glow ---
        const updateSearchBarCanvas = (searchBar) => {
            const { context, text } = searchBar.userData;
            const canvas = context.canvas;
            const barHeight = canvas.height;
            const barWidth = canvas.width;
            
            context.clearRect(0, 0, barWidth, barHeight);

            // --- Glow Effect with Mixed Colors ---
            const time = Date.now() * 0.001;
            const colorMix = (Math.sin(time) + 1) * 0.5; // Oscillates between 0 and 1
            const glowColorR = 184;
            const glowColorG = 255;
            const glowColorB = Math.floor(250 * (1 - colorMix) + 184 * colorMix); // Mix between blue and green
            
            context.shadowColor = `rgba(${glowColorR}, ${glowColorG}, ${glowColorB}, 0.5)`;
            context.shadowBlur = 10;

            // Draw rounded rectangle outline with mixed color
            context.strokeStyle = `rgba(${glowColorR}, ${glowColorG}, ${glowColorB}, 0.6)`;
            context.lineWidth = 2;
            context.beginPath();
            context.roundRect(1, 1, barWidth - 2, barHeight - 2, 15);
            context.stroke();
            
            // --- Reset shadow for crisp text and icon ---
            context.shadowBlur = 0;

            // Draw magnifying glass icon with mixed color
            context.strokeStyle = `rgba(${glowColorR}, ${glowColorG}, ${glowColorB}, 0.7)`;
            context.lineWidth = 2.5;
            context.beginPath();
            context.arc(22, barHeight / 2, 8, 0, 2 * Math.PI);
            context.stroke();
            context.beginPath();
            context.moveTo(28, 30);
            context.lineTo(36, 38);
            context.stroke();

            // Draw animated text with mixed color and blinking cursor
            const showCursor = searchBar.userData.pauseCounter % 20 < 10;
            const cursor = (showCursor && (searchBar.userData.animationState === 'typing' || searchBar.userData.animationState === 'pausing')) ? '|' : '';
            context.fillStyle = `rgba(${glowColorR}, ${glowColorG}, ${glowColorB}, 0.8)`;
            context.font = '16px Inter, sans-serif'; // Smaller font
            context.textAlign = 'left';
            context.textBaseline = 'middle';
            context.fillText(text + cursor, 45, barHeight / 2 + 1); // Adjusted position

            searchBar.userData.texture.needsUpdate = true;
        };

        // --- Optimized Atmospheric Particles (Reduced Counts) ---
        const particleGeom = new BufferGeometry();
        const particleCount = 800; // Reduced from 2000
        const posArray = new Float32Array(particleCount * 3);
        for(let i = 0; i < particleCount * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * 50;
        }
        particleGeom.setAttribute('position', new BufferAttribute(posArray, 3));
        const particleMat = new PointsMaterial({
            size: 0.015,
            color: 0xB8FFFA,
            transparent: true,
            opacity: 0.5,
            blending: AdditiveBlending,
            depthWrite: false,
        });
        const particles = new Points(particleGeom, particleMat);
        scene.add(particles);

        // --- Optimized Green Accent Particles (Reduced Count) ---
        const greenParticleGeom = new BufferGeometry();
        const greenParticleCount = 320; // Reduced from 800
        const greenPosArray = new Float32Array(greenParticleCount * 3);
        for(let i = 0; i < greenParticleCount * 3; i++) {
            greenPosArray[i] = (Math.random() - 0.5) * 40;
        }
        greenParticleGeom.setAttribute('position', new BufferAttribute(greenPosArray, 3));
        const greenParticleMat = new PointsMaterial({
            size: 0.02,
            color: 0xB8FFF9,
            transparent: true,
            opacity: 0.3,
            blending: AdditiveBlending,
            depthWrite: false,
        });
        const greenParticles = new Points(greenParticleGeom, greenParticleMat);
        scene.add(greenParticles);

        // --- Optimized Mixed Blue-Green Particles (Reduced Count) ---
        const mixedParticleGeom = new BufferGeometry();
        const mixedParticleCount = 240; // Reduced from 600
        const mixedPosArray = new Float32Array(mixedParticleCount * 3);
        for(let i = 0; i < mixedParticleCount * 3; i++) {
            mixedPosArray[i] = (Math.random() - 0.5) * 35;
        }
        mixedParticleGeom.setAttribute('position', new BufferAttribute(mixedPosArray, 3));
        const mixedParticleMat = new PointsMaterial({
            size: 0.025,
            color: 0xB8FFF9, // Cyan color
            transparent: true,
            opacity: 0.4,
            blending: AdditiveBlending,
            depthWrite: false,
        });
        const mixedParticles = new Points(mixedParticleGeom, mixedParticleMat);
        scene.add(mixedParticles);

        // --- Optimized Search Bar Initialization (Reduced from 12 to 8) ---
        for (let i = 0; i < 8; i++) { // Reduced from 12 to 8 search bars
            const query = searchQueries[i % searchQueries.length];
            const searchBar = createSearchBar(query);
            
            // Optimized position calculation with fewer branches
            let x, y, z;
            
            if (i < 4) {
                // Top corners and sides - optimized for 8 bars
                const angle = (i / 4) * Math.PI * 2;
                const radius = 8 + Math.random() * 2;
                x = Math.cos(angle) * radius;
                y = 2 + Math.random() * 2;
                z = Math.sin(angle) * radius;
            } else {
                // Bottom corners and sides - optimized layout
                const angle = ((i - 4) / 4) * Math.PI * 2;
                const radius = 7 + Math.random() * 2;
                x = Math.cos(angle) * radius;
                y = -3 - Math.random() * 2;
                z = Math.sin(angle) * radius;
            }
            
            searchBar.position.set(x, y, z);
            searchBar.userData.origin = searchBar.position.clone();
            
            searchBar.lookAt(camera.position);

            searchBars.push(searchBar);
            scene.add(searchBar);
        }

        // --- Mouse Interaction ---
        const mouse = new Vector2();
        const target = new Vector2();
        const handleMouseMove = (event) => {
            target.x = (event.clientX / window.innerWidth) * 2 - 1;
            target.y = -(event.clientY / window.innerHeight) * 2 + 1;
        };
        window.addEventListener('mousemove', handleMouseMove);

        // --- Animation Loop ---
        let frameCount = 0;
        const clock = new ThreeClock();
        const animate = () => {
            requestAnimationFrame(animate);
            const elapsedTime = clock.getElapsedTime();
            frameCount++;

            mouse.lerp(target, 0.02);

            searchBars.forEach((bar) => {
                const { userData } = bar;

                if (userData.material.opacity < userData.targetOpacity) {
                    userData.material.opacity += 0.003;
                }

                if (frameCount % 5 === 0) { 
                    switch (userData.animationState) {
                        case 'typing':
                            if (userData.charIndex < userData.fullText.length) {
                                userData.charIndex++;
                                userData.text = userData.fullText.substring(0, userData.charIndex);
                            } else {
                                userData.animationState = 'pausing';
                                userData.pauseCounter = 0;
                            }
                            break;
                        case 'pausing':
                            userData.pauseCounter++;
                            if (userData.pauseCounter > userData.pauseDuration) {
                                userData.animationState = 'deleting';
                            }
                            break;
                        case 'deleting':
                            if (userData.charIndex > 0) {
                                userData.charIndex--;
                                userData.text = userData.fullText.substring(0, userData.charIndex);
                            } else {
                                userData.animationState = 'typing';
                                const newQueryIndex = Math.floor(Math.random() * searchQueries.length);
                                userData.fullText = searchQueries[newQueryIndex];
                                userData.pauseDuration = 60 + Math.random() * 40;
                            }
                            break;
                    }
                }
                if(frameCount % 6 === 0 || userData.animationState === 'pausing') { // Optimized frequency
                    updateSearchBarCanvas(bar);
                }
                
                // Hardware-accelerated floating motion
                bar.position.x = userData.origin.x + Math.cos(elapsedTime * userData.animSpeed.x + userData.animOffset) * 0.5;
                bar.position.y = userData.origin.y + Math.sin(elapsedTime * userData.animSpeed.y + userData.animOffset) * 0.7;
                bar.position.z = userData.origin.z + Math.sin(elapsedTime * userData.animSpeed.z + userData.animOffset) * 0.5;
                bar.lookAt(camera.position);
            });
            
            // Optimized particle rotations (slightly reduced speed)
            particles.rotation.y = elapsedTime * 0.015; // Reduced from 0.02
            greenParticles.rotation.x = elapsedTime * 0.012; // Reduced from 0.015
            greenParticles.rotation.z = elapsedTime * 0.008; // Reduced from 0.01
            mixedParticles.rotation.y = elapsedTime * -0.02; // Reduced from -0.025
            mixedParticles.rotation.x = elapsedTime * 0.008; // Reduced from 0.01

            // Hardware-accelerated scene rotation
            scene.rotation.y += (mouse.x * 0.1 - scene.rotation.y) * 0.02;
            scene.rotation.x += (-mouse.y * 0.1 - scene.rotation.x) * 0.02;

            renderer.render(scene, camera);
        };        animate();

        // --- Resize Handling ---
        const handleResize = () => {
            camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
        };
        window.addEventListener('resize', handleResize);

        // --- Optimized Cleanup with Animation Frame Cancellation ---
        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            if (currentMount && renderer.domElement.parentNode === currentMount) {
                currentMount.removeChild(renderer.domElement);
            }
            // Dispose of geometries and materials for better memory management
            searchBars.forEach(bar => {
                if (bar.geometry) bar.geometry.dispose();
                if (bar.material) bar.material.dispose();
            });
            if (particles.geometry) particles.geometry.dispose();
            if (particles.material) particles.material.dispose();
            if (greenParticles.geometry) greenParticles.geometry.dispose();
            if (greenParticles.material) greenParticles.material.dispose();
            if (mixedParticles.geometry) mixedParticles.geometry.dispose();
            if (mixedParticles.material) mixedParticles.material.dispose();
            renderer.dispose();
        };
    }, []);

    return <div ref={mountRef} className="absolute inset-0 z-0" />;
};


// Paid Search Hero Section (with new animation)
const PaidSearchHero = () => {
  const [textIndex, setTextIndex] = useState(0);
  const texts = [
    "Precision PPC Campaigns",
    "Maximise Your ROI",
    "Data-Driven Advertising",
    "Dominate Paid Search"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex(prev => (prev + 1) % texts.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden hero-section">
      <PaidSearchHeroAnimation />
      
      <div className="absolute inset-0 hero-overlay-1 z-10"></div>
      
      <div className="relative z-20 text-center text-white max-w-5xl mx-auto px-4">
        <div className="mb-8">
          <div className="text-xs tracking-widest text-gray-400 mb-4 font-inter glitch-text">
            BYLT.MEDIA // PAID SEARCH & PPC
          </div>
          <h1 className="text-6xl md:text-8xl font-bold mb-6 font-inter hero-title">
            <span className="quantum-text" key={textIndex}>
              {texts[textIndex]}
            </span>
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-200 max-w-4xl mx-auto hero-subtitle leading-relaxed">
            We engineer high-performance Paid Search (PPC) campaigns that deliver measurable results, drive targeted traffic, and maximise your return on investment.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center hero-cta">
          <a href="/free-audit" className="quantum-button-hero">
            <span>Get a Free Audit</span>
          </a>
          <a href="#process" className="hologram-button">
            <span>Our Process</span>
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

// Generic 3D object renderer for sections
const Section3DElement = ({ shape = 'torus' }) => {
    const mountRef = useRef(null);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        const currentMount = mountRef.current;

        const scene = new Scene();
        const camera = new PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
        const renderer = new WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
        currentMount.appendChild(renderer.domElement);
        camera.position.z = 5;

        let geometry;
        let mesh;
        const material = new MeshStandardMaterial({ color: 0xB8FFFA, roughness: 0.3, metalness: 0.8 });

        switch (shape) {
            case 'magnify':
                const group = new Group();
                const lensGeom = new RingGeometry(0.8, 1, 32);
                const handleGeom = new CylinderGeometry(0.1, 0.1, 1.5, 32);
                const lens = new Mesh(lensGeom, material);
                const handle = new Mesh(handleGeom, material);
                handle.position.set(0, -1.25, 0);
                handle.rotation.z = Math.PI / 4;
                group.add(lens);
                group.add(handle);
                mesh = group;
                break;
            case 'icosahedron':
                geometry = new IcosahedronGeometry(1.5, 0);
                mesh = new Mesh(geometry, material);
                break;
            case 'perfume':
                 const bottleGroup = new Group();
                 const bodyGeom = new CylinderGeometry(0.8, 1, 2, 32);
                 const neckGeom = new CylinderGeometry(0.4, 0.5, 0.5, 32);
                 const capGeom = new BoxGeometry(0.8, 0.4, 0.8);
                 const body = new Mesh(bodyGeom, material);
                 const neck = new Mesh(neckGeom, material);
                 const cap = new Mesh(capGeom, material);
                 neck.position.y = 1.25;
                 cap.position.y = 1.7;
                 bottleGroup.add(body, neck, cap);
                 mesh = bottleGroup;
                break;
            default:
                geometry = new TorusKnotGeometry(1, 0.3, 100, 16);
                mesh = new Mesh(geometry, material);
        }
        
        scene.add(mesh);

        const ambientLight = new AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);
        const directionalLight = new DirectionalLight(0xffffff, 0.5);
        directionalLight.position.set(2, 5, 3);
        scene.add(directionalLight);

        const animate = () => {
            requestAnimationFrame(animate);
            mesh.rotation.x += 0.005;
            mesh.rotation.y += 0.005;
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
            if (currentMount) currentMount.removeChild(renderer.domElement);
        };
    }, [shape]);

    return <div ref={mountRef} className="absolute top-0 left-0 w-full h-full opacity-10 z-0"></div>;
};

// What is PPC Section (with 3D element)
const WhatIsPPC = () => {
    const sectionRef = useQuantumScrollAnim();
    return (
        <section ref={sectionRef} className="py-24 bg-slate-900/30 relative quantum-anim overflow-hidden">
            <Section3DElement shape="magnify" />
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <div className="section-title-container">
                        <h2 className="section-title-enhanced">What Makes Us Stand Out</h2>
                        <div className="title-accent-line"></div>
                    </div>
                    <p className="text-lg text-gray-400 max-w-3xl mx-auto">
                        With 7+ years of proven expertise, campaigns across 4 continents, and an average ROAS of 9.5x, we combine extensive experience with cutting-edge AI tools to deliver exceptional results for our clients.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 text-center">
                    <div className="info-card">
                        <div className="info-card-icon"><Target /></div>
                        <h3 className="text-xl font-bold text-white mb-2">Extensive Experience</h3>
                        <p className="text-gray-400">
                            7+ years in the market with campaigns spanning 4 continents. We've managed over €20 million in ad budgets, delivering consistent results across diverse markets and industries.
                        </p>
                    </div>
                    <div className="info-card">
                        <div className="info-card-icon"><DollarSign /></div>
                        <h3 className="text-xl font-bold text-white mb-2">Advanced AI Tools</h3>
                        <p className="text-gray-400">
                            We leverage cutting-edge AI and machine learning tools for data-driven strategies, automated optimisation, and predictive analytics that maximise your ROI and campaign performance.
                        </p>
                    </div>
                    <div className="info-card">
                        <div className="info-card-icon"><BarChart /></div>
                        <h3 className="text-xl font-bold text-white mb-2">Proven Results</h3>
                        <p className="text-gray-400">
                            Average ROAS of 9.5x and long-term partnerships with leading brands. Our data-driven approach and conversion optimization strategies deliver measurable growth for your business.
                        </p>
                    </div>
                </div>
            </div>
            <style jsx>{`
                .info-card {
                    background: rgba(30, 41, 59, 0.5);
                    border: 1px solid #374151;
                    border-radius: 16px;
                    padding: 2rem;
                    transition: all 0.3s ease;
                    backdrop-filter: blur(8px);
                    transform: translateZ(0); /* Hardware acceleration */
                    will-change: transform, border-color, box-shadow;
                    contain: layout style paint;
                }
                .info-card:hover {
                    transform: translate3d(0, -5px, 0); /* Hardware-accelerated transform */
                    border-color: #B8FFFA;
                    box-shadow: 0 8px 25px rgba(184, 255, 225, 0.1);
                }
                .info-card:nth-child(2n):hover {
                    border-color: #B8FFF9;
                    box-shadow: 0 8px 25px rgba(184, 255, 249, 0.1);
                }
                .info-card:nth-child(3n):hover {
                    border-image: linear-gradient(45deg, #B8FFFA, #B8FFF9, #B8FFFA) 1;
                    box-shadow: 0 8px 25px rgba(184, 255, 249, 0.15);
                }
                .info-card-icon {
                    width: 3rem;
                    height: 3rem;
                    margin: 0 auto 1.5rem auto;
                    border-radius: 50%;
                    background: rgba(184, 255, 250, 0.1);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #B8FFFA;
                    transition: all 0.3s ease;
                    transform: translateZ(0); /* Hardware acceleration */
                    will-change: transform, background, color;
                }
                .info-card:nth-child(2n) .info-card-icon {
                    background: rgba(184, 255, 249, 0.1);
                    color: #B8FFF9;
                }
                .info-card:nth-child(3n) .info-card-icon {
                    background: linear-gradient(45deg, rgba(184, 255, 250, 0.1), rgba(184, 255, 249, 0.1));
                    color: #B8FFF9;
                }
            `}</style>
        </section>
    );
};

// REVAMPED: Interactive Experience Across Verticals Section
const VerticalExperience = () => {
    const sectionRef = useQuantumScrollAnim();
    const [activeVertical, setActiveVertical] = useState(null);

    const verticals = [
        { icon: <ShoppingBag />, name: "E-commerce & Retail", shape: 'torus', description: "Driving online sales and foot traffic with targeted Shopping and Search campaigns." },
        { icon: <HeartPulse />, name: "Health & Wellness", shape: 'icosahedron', description: "Connecting patients and clients with services through compliant and effective ad strategies." },
        { icon: <Building />, name: "Real Estate", shape: 'box', description: "Generating high-quality leads for properties and developments with localized targeting." },
        { icon: <Car />, name: "Automotive", shape: 'torusKnot', description: "Accelerating test drives and sales with precision-targeted ads for dealerships and brands." },
        { icon: <Plane />, name: "Travel & Tourism", shape: 'sphere', description: "Inspiring bookings and reservations with compelling display, video, and search campaigns." },
        { icon: <Utensils />, name: "Food & Beverage", shape: 'cone', description: "Whetting appetites and driving orders with localized ads and brand awareness campaigns." },
    ];

    const render3DObject = (shape) => {
        let geometry;
        switch(shape) {
            case 'torus': geometry = new TorusGeometry(1, 0.4, 16, 100); break;
            case 'icosahedron': geometry = new IcosahedronGeometry(1.5, 0); break;
            case 'box': geometry = new BoxGeometry(1.5, 1.5, 1.5); break;
            case 'torusKnot': geometry = new TorusKnotGeometry(1, 0.3, 100, 16); break;
            case 'sphere': geometry = new SphereGeometry(1.2, 32, 32); break;
            case 'cone': geometry = new ConeGeometry(1, 2, 32); break;
            default: geometry = new BoxGeometry(1.5, 1.5, 1.5);
        }
        return <mesh geometry={geometry}><meshStandardMaterial color="#B8FFFA" roughness={0.3} metalness={0.8} /></mesh>;
    };

    return (
        <section ref={sectionRef} className="py-24 bg-slate-900/50 relative quantum-anim overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <div className="section-title-container">
                        <h2 className="section-title-enhanced">Experience Across Verticals</h2>
                        <div className="title-accent-line"></div>
                    </div>
                    <p className="text-lg text-gray-400 max-w-3xl mx-auto">
                        Our strategies are not one-size-fits-all. We have a proven track record of adapting our PPC methodologies to thrive in diverse and competitive industries.
                    </p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                    {verticals.map((vertical, index) => (
                        <div 
                            key={index} 
                            className="vertical-card"
                            onMouseEnter={() => setActiveVertical(index)}
                            onMouseLeave={() => setActiveVertical(null)}
                        >
                            <div className={`vertical-content ${activeVertical === index ? 'hidden' : 'flex'}`}>
                                <div className="vertical-icon">{vertical.icon}</div>
                                <h4 className="vertical-name">{vertical.name}</h4>
                            </div>
                            <div className={`vertical-hover-content ${activeVertical === index ? 'flex' : 'hidden'}`}>
                                <p className="vertical-description">{vertical.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <style jsx>{`
                .vertical-card {
                    background: rgba(30, 41, 59, 0.5);
                    border: 1px solid #374151;
                    border-radius: 16px;
                    padding: 2rem 1rem;
                    text-align: center;
                    transition: all 0.3s ease;
                    min-height: 150px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .vertical-card:hover {
                    transform: translateY(-8px) scale(1.05);
                    border-color: #B8FFFA;
                    background: rgba(184, 255, 250, 0.05);
                }
                .vertical-card:nth-child(3n):hover {
                    border-color: #B8FFF9;
                    background: rgba(184, 255, 249, 0.05);
                }
                .vertical-content, .vertical-hover-content {
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    transition: opacity 0.3s ease;
                }
                .vertical-icon {
                    font-size: 2.5rem;
                    color: #B8FFFA;
                    margin: 0 auto 1rem auto;
                    transition: color 0.3s ease;
                }
                .vertical-card:nth-child(3n) .vertical-icon {
                    color: #B8FFF9;
                }
                .vertical-name {
                    font-weight: 600;
                    color: white;
                    font-size: 1rem;
                    line-height: 1.4;
                }
                .vertical-description {
                    color: #e5e7eb;
                    font-size: 0.875rem;
                }
            `}</style>
        </section>
    );
};

// ENHANCED: Interactive Case Study Section
const CaseStudy = () => {
    const sectionRef = useQuantumScrollAnim();
    const [activeSection, setActiveSection] = useState('challenge');
    const [imageLoaded, setImageLoaded] = useState(false);

    const sections = [
        {
            id: 'challenge',
            title: 'The Challenge',
            content: 'Parfium.bg faced intense competition during the holiday season while needing to increase sales during Black Friday and Christmas. The challenge was maintaining low cost per conversion while achieving high ROAS, requiring seasonal ad optimization and improved data collection for better Google Ads performance.'
        },
        {
            id: 'solution',
            title: 'Our Strategy',
            content: 'We developed tailored campaigns specifically for Black Friday and Christmas, focusing ad spend on high-demand products like premium fragrances and gift sets. Our approach included improved landing page UX/UI, data tracking with Google Analytics, demographic-specific campaigns, and optimized bidding strategies with automated account changes.'
        },
        {
            id: 'results',
            title: 'The Results',
            content: 'Our strategic approach delivered exceptional results: 85% sales growth during Christmas, 65% during Black Friday, 25% reduction in CPA for Black Friday, 20% CPA reduction for Christmas, and an overall 45% improvement in Return on Ad Spend (ROAS).'
        }
    ];

    return (
        <section id="case-study" ref={sectionRef} className="py-16 bg-slate-900 quantum-anim relative overflow-hidden">
            <Section3DElement shape="perfume" />
            
            {/* Animated background elements */}
            <div className="absolute inset-0">
                <div className="case-study-bg-element case-study-bg-1"></div>
                <div className="case-study-bg-element case-study-bg-2"></div>
                <div className="case-study-bg-element case-study-bg-3"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-12">
                    <div className="section-title-container">
                        <h2 className="section-title-enhanced">Client Success Story</h2>
                        <div className="title-accent-line"></div>
                    </div>
                    <p className="text-lg text-gray-300 mt-4 max-w-2xl mx-auto">
                        Discover how we transformed a competitive fragrance business into a market-dominating success story
                    </p>
                </div>

                <div className="case-study-main-container">
                    {/* Header Section */}
                    <div className="case-study-header-section">
                        <div className="case-study-header">
                            <h3 className="case-study-title">Parfium.bg</h3>
                            <p className="case-study-subtitle">Seasonal E-commerce Success Through Strategic Google Ads</p>
                            <p className="case-study-description">
                                How we helped Bulgaria's leading perfume retailer achieve exceptional growth during peak shopping seasons through data-driven Google Ads optimization and strategic campaign management.
                            </p>
                        </div>
                    </div>

                    {/* Image Section - Above Stats */}
                    <div className="case-study-image-section">
                        <div className="case-study-image-wrapper">
                            <img 
                                src="/images/casestudy/parfium.bg-case-study.webp" 
                                alt="Parfium.bg Case Study - Premium Fragrance E-commerce Success" 
                                className="case-study-image-clean"
                                onLoad={() => setImageLoaded(true)}
                            />
                        </div>
                    </div>

                    {/* Stats Section - Below Image */}
                    <div className="stats-section">
                        <div className="stats-grid">
                            <div className="stat-card-minimal">
                                <div className="stat-value">85%</div>
                                <div className="stat-label">Christmas Sales Growth</div>
                            </div>
                            <div className="stat-card-minimal">
                                <div className="stat-value">65%</div>
                                <div className="stat-label">Black Friday Sales Growth</div>
                            </div>
                            <div className="stat-card-minimal">
                                <div className="stat-value">45%</div>
                                <div className="stat-label">ROAS Improvement</div>
                            </div>
                            <div className="stat-card-minimal">
                                <div className="stat-value">25%</div>
                                <div className="stat-label">CPA Reduction</div>
                            </div>
                        </div>
                    </div>

                    {/* Tabs Section - Below Image */}
                    <div className="case-study-tabs-section">
                        <div className="case-study-tabs">
                            <div className="tab-navigation">
                                {sections.map((section) => (
                                    <button
                                        key={section.id}
                                        className={`tab-button ${activeSection === section.id ? 'active' : ''}`}
                                        onClick={() => setActiveSection(section.id)}
                                    >
                                        {section.title}
                                    </button>
                                ))}
                            </div>
                            
                            <div className="tab-content">
                                {sections.map((section) => (
                                    <div
                                        key={section.id}
                                        className={`tab-panel ${activeSection === section.id ? 'active' : ''}`}
                                    >
                                        <h4 className="tab-panel-title">{section.title}</h4>
                                        <p className="tab-panel-content">{section.content}</p>
                                        
                                        {section.id === 'solution' && (
                                            <div className="solution-features">
                                                <div className="feature-item">
                                                    <span>Seasonal Campaign Optimization</span>
                                                </div>
                                                <div className="feature-item">
                                                    <span>Data-Driven Targeting</span>
                                                </div>
                                                <div className="feature-item">
                                                    <span>Automated Bidding Strategies</span>
                                                </div>
                                                <div className="feature-item">
                                                    <span>UX/UI Landing Page Improvements</span>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* CTA Section - At the Bottom */}
                    <div className="case-study-cta-section">
                        <div className="case-study-cta">
                            <button 
                                onClick={() => window.open('/case-studies-parfium', '_blank')}
                                className="cta-button cta-button-green"
                            >
                                View Full Case Study
                                <MoveRight className="cta-icon" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .case-study-bg-element {
                    position: absolute;
                    border-radius: 50%;
                    background: radial-gradient(circle, rgba(184, 255, 250, 0.03) 0%, transparent 70%);
                    animation: float 6s ease-in-out infinite;
                    transform: translateZ(0); /* Hardware acceleration */
                    will-change: transform;
                }
                
                .case-study-bg-1 {
                    width: 300px;
                    height: 300px;
                    top: 20%;
                    left: 10%;
                    animation-delay: 0s;
                }
                
                .case-study-bg-2 {
                    width: 200px;
                    height: 200px;
                    top: 60%;
                    right: 15%;
                    animation-delay: 2s;
                }
                
                .case-study-bg-3 {
                    width: 150px;
                    height: 150px;
                    bottom: 20%;
                    left: 70%;
                    animation-delay: 4s;
                }

                .case-study-main-container {
                    background: rgba(30, 41, 59, 0.6);
                    backdrop-filter: blur(10px);
                    border-radius: 16px;
                    padding: 1.5rem;
                    border: 1px solid rgba(184, 255, 250, 0.1);
                    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.15);
                    max-width: 100%;
                    transform: translateZ(0); /* Hardware acceleration */
                    will-change: transform;
                    contain: layout style paint;
                }

                .case-study-main-container::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    height: 1px;
                    background: linear-gradient(90deg, transparent, rgba(184, 255, 250, 0.3), transparent);
                }

                .case-study-header-section {
                    margin-bottom: 1.5rem;
                }

                .case-study-header {
                    text-align: center;
                    max-width: 700px;
                    margin: 0 auto;
                }

                .case-study-logo-container {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin-bottom: 1rem;
                }

                .case-study-logo {
                    height: 120px;
                    width: auto;
                    object-fit: contain;
                    filter: brightness(1.1);
                    transition: all 0.3s ease;
                }

                .case-study-logo:hover {
                    transform: scale(1.05);
                    filter: brightness(1.2);
                }

                .stats-section {
                    margin-bottom: 2rem;
                }

                .case-study-image-section {
                    width: 100%;
                    margin-bottom: 2rem;
                }

                .case-study-tabs-section {
                    width: 100%;
                    margin-bottom: 1.5rem;
                }

                .case-study-cta-section {
                    width: 100%;
                    text-align: center;
                    padding-top: 1rem;
                    border-top: 1px solid rgba(184, 255, 250, 0.1);
                }

                .case-study-image-wrapper {
                    position: relative;
                    width: 100%;
                    max-width: 500px;
                    margin: 0 auto;
                }

                .case-study-image-clean {
                    width: 100%;
                    height: auto;
                    aspect-ratio: 16/9;
                    object-fit: cover;
                    border-radius: 12px;
                    transition: all 0.3s ease;
                }

                .case-study-image-clean:hover {
                    transform: scale(1.02);
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
                }

                .case-study-description {
                    color: #94a3b8;
                    line-height: 1.6;
                    margin-top: 0.75rem;
                    font-size: 0.9rem;
                }

                .case-study-cta {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                .cta-button {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                    background: linear-gradient(135deg, #B8FFFA 0%, #72E4E0 100%);
                    color: #0f172a;
                    padding: 0.75rem 1.25rem;
                    border-radius: 8px;
                    font-weight: 600;
                    text-decoration: none;
                    transition: all 0.3s ease;
                    border: none;
                    cursor: pointer;
                    white-space: nowrap;
                    font-size: 0.9rem;
                }

                .cta-button:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 25px rgba(184, 255, 250, 0.3);
                    background: linear-gradient(135deg, #72E4E0 0%, #B8FFFA 100%);
                }

                .cta-button-green {
                    background: linear-gradient(135deg, #B8FFF9 0%, #A0E6A0 100%);
                }

                .cta-button-green:hover {
                    box-shadow: 0 8px 25px rgba(184, 255, 249, 0.3);
                    background: linear-gradient(135deg, #A0E6A0 0%, #B8FFF9 100%);
                }

                .cta-button-mixed {
                    background: linear-gradient(135deg, #B8FFFA 0%, #B8FFF9 50%, #B8FFF9 100%);
                }

                .cta-button-mixed:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 25px rgba(184, 255, 249, 0.4);
                    background: linear-gradient(135deg, #B8FFF9 0%, #B8FFF9 50%, #B8FFFA 100%);
                }

                .cta-icon {
                    width: 18px;
                    height: 18px;
                    transition: transform 0.3s ease;
                }

                .cta-button:hover .cta-icon {
                    transform: translateX(3px);
                }

                .case-study-header {
                    margin-bottom: 2rem;
                }

                .case-study-title {
                    font-size: clamp(2rem, 5vw, 3rem);
                    font-weight: 900;
                    color: #ffffff;
                    margin-bottom: 0.5rem;
                    background: linear-gradient(135deg, #ffffff 0%, #B8FFFA 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }

                .case-study-subtitle {
                    font-size: 1.25rem;
                    color: #B8FFFA;
                    font-weight: 600;
                    opacity: 0.9;
                    margin-bottom: 0.5rem;
                }

                .stats-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
                    gap: 0.75rem;
                    margin-bottom: 2rem;
                }

                .stat-card-minimal {
                    background: rgba(255, 255, 255, 0.02);
                    border: 1px solid rgba(184, 255, 250, 0.15);
                    border-radius: 8px;
                    padding: 0.75rem;
                    text-align: center;
                    transition: all 0.3s ease;
                }

                .stat-card-minimal:hover {
                    border-color: rgba(184, 255, 250, 0.25);
                    background: rgba(184, 255, 250, 0.03);
                }

                .stat-value {
                    font-size: clamp(1.5rem, 4vw, 2rem);
                    font-weight: 700;
                    color: #B8FFFA;
                    line-height: 1;
                    margin-bottom: 0.25rem;
                }

                .stat-label {
                    font-size: 0.8rem;
                    color: #94a3b8;
                    font-weight: 500;
                }

                .case-study-tabs {
                    background: rgba(15, 23, 42, 0.5);
                    border-radius: 20px;
                    overflow: hidden;
                    border: 1px solid rgba(184, 255, 250, 0.1);
                }

                .tab-navigation {
                    display: flex;
                    background: rgba(30, 41, 59, 0.8);
                    border-bottom: 1px solid rgba(184, 255, 250, 0.1);
                }

                .tab-button {
                    flex: 1;
                    padding: 1rem 1.5rem;
                    background: none;
                    border: none;
                    color: #94a3b8;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    position: relative;
                }

                .tab-button::after {
                    content: '';
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    height: 2px;
                    background: #B8FFFA;
                    transform: scaleX(0);
                    transition: transform 0.3s ease;
                }

                .tab-button.active {
                    color: #B8FFFA;
                    background: rgba(184, 255, 250, 0.05);
                }

                .tab-button.active::after {
                    transform: scaleX(1);
                }

                .tab-button:hover:not(.active) {
                    color: #ffffff;
                    background: rgba(184, 255, 250, 0.02);
                }

                .tab-content {
                    position: relative;
                    min-height: 150px;
                }

                .tab-panel {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    padding: 1.5rem;
                    opacity: 0;
                    transform: translateY(20px);
                    transition: all 0.4s ease;
                    pointer-events: none;
                }

                .tab-panel.active {
                    position: relative;
                    opacity: 1;
                    transform: translateY(0);
                    pointer-events: auto;
                }

                .tab-panel-title {
                    font-size: 1.5rem;
                    font-weight: 700;
                    color: #ffffff;
                    margin-bottom: 1rem;
                }

                .tab-panel-content {
                    color: #cbd5e1;
                    line-height: 1.7;
                    margin-bottom: 1.5rem;
                }

                .solution-features {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
                    gap: 0.75rem;
                    margin-top: 1.5rem;
                }

                .feature-item {
                    padding: 0.5rem 0.75rem;
                    background: rgba(184, 255, 249, 0.03);
                    border-radius: 6px;
                    border: 1px solid rgba(184, 255, 249, 0.1);
                    transition: all 0.2s ease;
                    text-align: center;
                }

                .feature-item:hover {
                    background: rgba(184, 255, 249, 0.05);
                    border-color: rgba(184, 255, 249, 0.2);
                }

                .feature-item span {
                    color: #cbd5e1;
                    font-weight: 400;
                    font-size: 0.85rem;
                }

                @keyframes float {
                    0%, 100% { transform: translate3d(0, 0px, 0) rotate(0deg); } /* Hardware-accelerated */
                    50% { transform: translate3d(0, -20px, 0) rotate(180deg); } /* Hardware-accelerated */
                }

                @media (max-width: 768px) {
                    .case-study-main-container {
                        padding: 1.5rem;
                    }
                    
                    .stats-grid {
                        grid-template-columns: repeat(2, 1fr);
                        gap: 0.75rem;
                    }
                    
                    .case-study-image-section {
                        margin-bottom: 2rem;
                    }
                    
                    .case-study-tabs-section {
                        margin-bottom: 1.5rem;
                    }
                    
                    .tab-navigation {
                        flex-direction: column;
                    }
                    
                    .solution-features {
                        grid-template-columns: 1fr;
                    }
                }

                @media (max-width: 480px) {
                    .stats-grid {
                        grid-template-columns: 1fr;
                    }
                    
                    .stat-card-minimal {
                        padding: 0.75rem;
                    }
                }
            `}</style>
        </section>
    );
};

// UPDATED: Platforms We Use Section
const PlatformPartners = () => {
    const sectionRef = useQuantumScrollAnim();
    return (
        <div ref={sectionRef} className="py-16 bg-gradient-to-b from-slate-900 to-slate-800 quantum-anim partner-section relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(184,255,250,0.03)_0%,transparent_70%)]"></div>
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                <div className="text-center mb-12">
                    <div className="section-title-container">
                        <h2 className="section-title-enhanced partnership-title">
                            Certified Google Expertise
                        </h2>
                        <div className="title-accent-line"></div>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-16">
                    <div className="flex-shrink-0">
                        <div className="partner-badge-container">
                            <img
                                src="/images/partners/partners logos/google-partner-logo-min.svg"
                                alt="Google Premiere Partner 2025"
                                className="platform-logo"
                            />
                            <div className="badge-glow"></div>
                        </div>
                    </div>
                    
                    <div className="flex-1 max-w-2xl">
                        <div className="partnership-content">
                            <h3 className="partnership-highlight">Google Premiere Partner Status</h3>
                            <p className="partnership-description">
                                Through our official partnership with <span className="brand-highlight">Marketise Me</span>, we leverage their elite Google Premiere Partner certification to deliver world-class campaign management, strategic insights, and priority access to the latest Google Ads features and beta programs.
                            </p>
                            <div className="partnership-benefits">
                                <div className="benefit-item">
                                    <div className="benefit-icon">
                                        <Target className="w-5 h-5" />
                                    </div>
                                    <span>Priority support from Google specialists</span>
                                </div>
                                <div className="benefit-item">
                                    <div className="benefit-icon">
                                        <Zap className="w-5 h-5" />
                                    </div>
                                    <span>Early access to new features & beta programs</span>
                                </div>
                                <div className="benefit-item">
                                    <div className="benefit-icon">
                                        <BarChart className="w-5 h-5" />
                                    </div>
                                    <span>Advanced analytics & optimization tools</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <style jsx>{`
                .partner-badge-container {
                    position: relative;
                    display: inline-block;
                }
                
                .platform-logo {
                    height: 10rem;
                    width: auto;
                    opacity: 0.95;
                    filter: brightness(1.1) drop-shadow(0 10px 30px rgba(184, 255, 249, 0.15));
                    transition: all 0.4s ease;
                    position: relative;
                    z-index: 2;
                }
                
                .platform-logo:hover {
                    opacity: 1;
                    transform: scale(1.05) translateY(-5px);
                    filter: brightness(1.2) drop-shadow(0 15px 40px rgba(184, 255, 249, 0.25));
                }
                
                .badge-glow {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 120%;
                    height: 120%;
                    background: radial-gradient(circle, rgba(184, 255, 249, 0.1) 0%, transparent 70%);
                    border-radius: 50%;
                    z-index: 1;
                    animation: pulse-glow 3s ease-in-out infinite;
                }
                
                @keyframes pulse-glow {
                    0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.3; }
                    50% { transform: translate(-50%, -50%) scale(1.1); opacity: 0.6; }
                }
                
                .partnership-content {
                    text-align: left;
                }
                
                @media (max-width: 1024px) {
                    .partnership-content {
                        text-align: center;
                    }
                }
                
                .partnership-highlight {
                    font-size: 1.75rem;
                    font-weight: 700;
                    color: #B8FFF9;
                    margin-bottom: 1rem;
                    background: linear-gradient(135deg, #B8FFF9 0%, #B8FFF9 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }
                
                .partnership-description {
                    font-size: 1.125rem;
                    line-height: 1.7;
                    color: #D1D5DB;
                    margin-bottom: 2rem;
                }
                
                .brand-highlight {
                    color: #B8FFF9;
                    font-weight: 600;
                }
                
                .partnership-benefits {
                    display: grid;
                    gap: 1rem;
                }
                
                .benefit-item {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    font-size: 1rem;
                    color: #E5E7EB;
                    padding: 1rem;
                    border-radius: 12px;
                    transition: all 0.3s ease;
                    cursor: pointer;
                    border: 1px solid transparent;
                }
                
                .benefit-item:hover {
                    background: rgba(30, 41, 59, 0.4);
                    border-color: rgba(184, 255, 249, 0.2);
                    transform: translateX(8px);
                    color: #F9FAFB;
                }
                
                .benefit-icon {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 2.5rem;
                    height: 2.5rem;
                    background: rgba(184, 255, 249, 0.1);
                    border: 1px solid rgba(184, 255, 249, 0.2);
                    border-radius: 50%;
                    color: #B8FFF9;
                    transition: all 0.4s ease;
                    flex-shrink: 0;
                    position: relative;
                    overflow: hidden;
                }
                
                .benefit-icon::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(184, 255, 249, 0.2), transparent);
                    transition: left 0.5s ease;
                }
                
                .benefit-item:hover .benefit-icon {
                    background: rgba(184, 255, 249, 0.2);
                    border-color: #B8FFF9;
                    transform: rotate(360deg) scale(1.1);
                    box-shadow: 0 0 20px rgba(184, 255, 249, 0.3);
                }
                
                .benefit-item:hover .benefit-icon::before {
                    left: 100%;
                }
            `}</style>
        </div>
    );
};


// Paid Search Process Section (Unchanged)
const PaidSearchProcess = () => {
    const [activeStep, setActiveStep] = useState(null);
    const sectionRef = useQuantumScrollAnim();
    
    const processSteps = [
        { step: "01", title: "Campaign Audit & Analysis", subtitle: "Data-Driven Foundations", description: "We begin with a comprehensive audit of your existing accounts or a deep analysis of your market landscape to identify opportunities and establish benchmarks.", icon: <Search className="w-6 h-6" />, details: [ "Full account structure review", "Competitor landscape analysis", "Keyword performance evaluation", "Tracking and conversion audit" ] },
        { step: "02", title: "Strategic Architecture", subtitle: "Blueprint for Success", description: "Based on our findings, we architect a bespoke PPC strategy. This includes defining target audiences, keyword selection, budget allocation, and campaign structure.", icon: <Lightbulb className="w-6 h-6" />, details: [ "Audience persona definition", "Advanced keyword research", "Ad copy and creative strategy", "Budget and bid strategy planning" ] },
        { step: "03", title: "Campaign Creation & Launch", subtitle: "Precision Execution", description: "Our team builds your campaigns from the ground up, focusing on quality score, ad relevance, and best practices before a meticulous launch process.", icon: <Construction className="w-6 h-6" />, details: [ "Ad group and keyword segmentation", "Compelling ad copywriting", "Landing page optimization", "Staged campaign deployment" ] },
        { step: "04", title: "Continuous Optimisation", subtitle: "Iterative Growth Engine", description: "Launch is just the start. We continuously monitor, test, and refine every aspect of your campaigns to drive incremental improvements and maximise ROI.", icon: <TrendingUp className="w-6 h-6" />, details: [ "A/B testing of ads and landing pages", "Bid management and adjustments", "Keyword expansion and negation", "Performance analysis and refinement" ] },
        { step: "05", title: "Insightful Reporting", subtitle: "Transparent Performance", description: "We provide clear, concise, and actionable reports that go beyond vanity metrics, focusing on the data that matters to your bottom line.", icon: <BarChart className="w-6 h-6" />, details: [ "Customized performance dashboards", "Regular ROI and CPA analysis", "Actionable insights and recommendations", "Transparent communication and reviews" ] }
    ];

    return (
        <section id="process" ref={sectionRef} className="py-24 quantum-process-section quantum-anim relative overflow-hidden">
            <div className="absolute inset-0 quantum-grid-animation"></div>
            
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                <div className="text-center mb-20">
                    <div className="section-title-container">
                        <h2 className="section-title-enhanced">
                            Our Paid Search Process
                        </h2>
                        <div className="title-accent-line"></div>
                    </div>
                    <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
                        A systematic, data-first methodology designed for transparency and superior results.
                    </p>
                </div>
                
                <div className="process-timeline">
                    {processSteps.map((step, index) => {
                        const isActive = activeStep === step.step;
                        return (
                            <div key={step.step} className={`process-step ${isActive ? 'active' : ''}`}>
                                <div className="step-container">
                                    <div
                                        className="step-number"
                                        onClick={() => setActiveStep(isActive ? null : step.step)}
                                    >
                                        {step.step}
                                    </div>
                                    
                                    <div
                                        className="step-card"
                                        onClick={() => setActiveStep(isActive ? null : step.step)}
                                    >
                                        <div className="step-header">
                                            <div className="step-icon-wrapper">
                                                {step.icon}
                                            </div>
                                            <div className="step-text">
                                                <h3 className="step-title">{step.title}</h3>
                                                <p className="step-subtitle">{step.subtitle}</p>
                                            </div>
                                            <ChevronDown className={`chevron ${isActive ? 'rotated' : ''}`} />
                                        </div>
                                        
                                        <p className="step-description">{step.description}</p>
                                        
                                        {isActive && (
                                            <div className="step-expanded">
                                                <h4 className="expanded-title">Key Activities:</h4>
                                                <ul className="details-list">
                                                    {step.details.map((detail, i) => (
                                                        <li key={i} className="detail-item">
                                                            <span className="bullet">•</span>
                                                            {detail}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                
                                {index < processSteps.length - 1 && <div className="timeline-line"></div>}
                            </div>
                        );
                    })}
                </div>
            </div>
            
            <style jsx>{`
                .quantum-process-section { background: var(--dark-bg); position: relative; }
                .quantum-grid-animation { background-image: linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px); background-size: 50px 50px; opacity: 0.3; animation: gridMove 20s linear infinite; }
                @keyframes gridMove { from { transform: translate(0, 0); } to { transform: translate(50px, 50px); } }
                .process-timeline { position: relative; max-width: 800px; margin: 0 auto; }
                .process-step { position: relative; margin-bottom: 2rem; }
                .step-container { display: flex; align-items: flex-start; gap: 2rem; }
                .step-number { width: 4rem; height: 4rem; border-radius: 50%; background: #374151; color: white; display: flex; align-items: center; justify-content: center; font-family: 'Inter', sans-serif; font-weight: 700; font-size: 1.1rem; cursor: pointer; transition: all 0.3s ease; flex-shrink: 0; z-index: 2; position: relative; }
                .process-step.active .step-number, .step-number:hover { transform: scale(1.1); background: #B8FFF9; color: #111; }
                .step-card { flex: 1; background: rgba(30, 41, 59, 0.5); border: 1px solid #374151; border-radius: 16px; padding: 1.5rem; cursor: pointer; transition: all 0.3s ease; backdrop-filter: blur(8px); }
                .process-step.active .step-card, .step-card:hover { border-color: #B8FFF9; }
                .step-header { display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem; }
                .step-icon-wrapper { width: 3rem; height: 3rem; background: #374151; border-radius: 12px; display: flex; align-items: center; justify-content: center; color: white; flex-shrink: 0; transition: all 0.3s ease; }
                .process-step.active .step-icon-wrapper { background: #B8FFF9; color: #111; }
                .step-text { flex: 1; }
                .step-title { font-family: 'Inter', sans-serif; font-size: 1.25rem; font-weight: 700; color: white; margin: 0 0 0.25rem 0; }
                .step-subtitle { font-size: 0.875rem; color: #9ca3af; font-weight: 500; margin: 0; }
                .chevron { width: 1.25rem; height: 1.25rem; color: #9ca3af; transition: all 0.3s ease; flex-shrink: 0; }
                .chevron.rotated { transform: rotate(180deg); color: #B8FFF9; }
                .step-description { color: #d1d5db; line-height: 1.6; margin: 0 0 1rem 0; }
                .step-expanded { border-top: 1px solid #374151; padding-top: 1rem; animation: fadeIn 0.3s ease-in-out; }
                @keyframes fadeIn { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
                .expanded-title { font-size: 0.875rem; font-weight: 600; color: #9ca3af; margin: 0 0 0.75rem 0; text-transform: uppercase; letter-spacing: 0.05em; }
                .details-list { list-style: none; padding: 0; margin: 0; }
                .detail-item { display: flex; align-items: flex-start; gap: 0.75rem; margin-bottom: 0.5rem; color: #e5e7eb; font-size: 0.875rem; line-height: 1.5; animation: slideIn 0.3s ease-in-out both; }
                .detail-item:nth-child(1) { animation-delay: 0.1s; } .detail-item:nth-child(2) { animation-delay: 0.2s; } .detail-item:nth-child(3) { animation-delay: 0.3s; } .detail-item:nth-child(4) { animation-delay: 0.4s; }
                @keyframes slideIn { from { opacity: 0; transform: translateX(-20px); } to { opacity: 1; transform: translateX(0); } }
                .bullet { color: #B8FFF9; font-weight: bold; font-size: 1.2rem; flex-shrink: 0; line-height: 1; }
                .timeline-line { position: absolute; left: 2rem; top: 4rem; width: 2px; height: calc(100% - 2rem); background: #374151; z-index: 1; }
                @media (max-width: 768px) {
                    .step-container { gap: 1rem; }
                    .step-number { width: 3rem; height: 3rem; font-size: 0.9rem; }
                    .step-card { padding: 1rem; }
                    .timeline-line { left: 1.5rem; }
                }
            `}</style>
        </section>
    );
};

// V8 Contact Section: Unchanged
const NeuralContact = () => {
    const sectionRef = useQuantumScrollAnim();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        company: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            const subject = encodeURIComponent(`New Contact Form Submission from ${formData.firstName} ${formData.lastName}`);
            const body = encodeURIComponent(`
Name: ${formData.firstName} ${formData.lastName}
Email: ${formData.email}
Company: ${formData.company}

Message:
${formData.message}
            `);
            
            window.location.href = `mailto:info@bookedupmedia.com?subject=${subject}&body=${body}`;
            
            setSubmitStatus('success');
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                company: '',
                message: ''
            });
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
                        <h2 className="section-title-enhanced">
                            Let's Build Your Future
                        </h2>
                        <div className="title-accent-line"></div>
                    </div>
                    <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                        Ready to start your next project? Tell us about your vision and we'll turn it into reality.
                    </p>
                </div>

                <div className="contact-form-container">
                    <form onSubmit={handleSubmit} className="contact-form">
                        <div className="form-grid">
                            <div className="form-group">
                                <label htmlFor="firstName" className="form-label">First Name *</label>
                                <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleInputChange} required className="form-input" placeholder="Enter your first name" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="lastName" className="form-label">Last Name *</label>
                                <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleInputChange} required className="form-input" placeholder="Enter your last name" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email" className="form-label">Email Address *</label>
                                <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required className="form-input" placeholder="your.email@company.com" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="company" className="form-label">Company</label>
                                <input type="text" id="company" name="company" value={formData.company} onChange={handleInputChange} className="form-input" placeholder="Your company name" />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="message" className="form-label">Message *</label>
                            <textarea id="message" name="message" value={formData.message} onChange={handleInputChange} required rows={6} className="form-textarea" placeholder="Tell us about your project, goals, and how we can help you build your digital future..."></textarea>
                        </div>
                        <div className="form-submit">
                            <button type="submit" disabled={isSubmitting} className="neural-submit-button">
                                {isSubmitting ? (<><div className="submit-spinner"></div><span>Sending...</span></>) : (<><span>Send Message</span><MoveRight className="ml-3 transition-transform duration-300" /></>)}
                            </button>
                        </div>
                        {submitStatus === 'success' && (<div className="status-message success"><Mail className="w-5 h-5" /><span>Thank you! Your message has been sent successfully.</span></div>)}
                        {submitStatus === 'error' && (<div className="status-message error"><X className="w-5 h-5" /><span>There was an error sending your message. Please try again.</span></div>)}
                    </form>
                </div>
                <div className="contact-details">
                    <div className="contact-detail-item"><Mail className="w-5 h-5 text-gray-400" /><span>info@bookedupmedia.com</span></div>
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
                .form-input:focus, .form-textarea:focus { outline: none; border-color: #B8FFF9; background: rgba(30, 41, 59, 0.8); box-shadow: 0 0 0 2px rgba(184, 255, 249, 0.1); }
                .form-input::placeholder, .form-textarea::placeholder { color: #9ca3af; }
                .form-textarea { resize: vertical; min-height: 120px; }
                .form-submit { display: flex; justify-content: center; margin-top: 2rem; }
                .neural-submit-button { position: relative; display: inline-flex; align-items: center; justify-content: center; padding: 1.25rem 2.5rem; font-weight: 700; font-size: 1.125rem; color: #1e293b; background: #B8FFF9; border: none; border-radius: 15px; font-family: 'Inter', sans-serif; text-decoration: none; transition: all 0.4s ease; cursor: pointer; min-width: 180px; }
                .neural-submit-button:hover:not(:disabled) { transform: translateY(-3px) scale(1.05); box-shadow: 0 10px 30px rgba(184, 255, 249, 0.3); background: #9DFFF8; }
                .neural-submit-button:disabled { opacity: 0.7; cursor: not-allowed; transform: none; }
                .submit-spinner { width: 20px; height: 20px; border: 2px solid transparent; border-top: 2px solid #1e293b; border-radius: 50%; animation: spin 1s linear infinite; margin-right: 0.75rem; }
                @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
                .status-message { display: flex; align-items: center; gap: 0.75rem; padding: 1rem 1.25rem; margin-top: 1.5rem; border-radius: 12px; font-family: 'Inter', sans-serif; font-size: 0.875rem; font-weight: 500; }
                .status-message.success { background: rgba(34, 197, 94, 0.1); border: 1px solid rgba(34, 197, 94, 0.3); color: #22c55e; }
                .status-message.error { background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.3); color: #ef4444; }
                .contact-details { display: flex; justify-content: center; gap: 3rem; flex-wrap: wrap; }
                .contact-detail-item { display: flex; align-items: center; gap: 0.75rem; color: #9ca3af; font-family: 'Inter', sans-serif; font-size: 0.875rem; }
                @media (max-width: 768px) { .form-grid { grid-template-columns: 1fr; gap: 1rem; } .contact-form { padding: 2rem; } .contact-details { flex-direction: column; gap: 1rem; align-items: center; } .neural-submit-button { padding: 1rem 2rem; font-size: 1rem; } }
            `}</style>
        </section>
    );
};

// V8 Footer: Updated Version
const QuantumFooter = () => {
    return (
        <footer className="quantum-footer relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
                <div className="footer-content">
                    <div className="footer-brand">
                        <h3 className="text-2xl font-bold text-white font-inter">
                            BYLT.MEDIA
                        </h3>
                        <p className="text-gray-400 mt-2">Building Digital Futures</p>
                    </div>
                    
                    <div className="footer-legal">
                        <p className="text-gray-500">
                            &copy; {new Date().getFullYear()} BYLT Media. All Rights Reserved.
                        </p>
                        <div className="footer-version">
                            <span className="text-xs text-gray-600 font-mono">
                                v9.1.0 // Enhanced Search Query
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <style jsx>{`
                .quantum-footer { background: var(--dark-bg); border-top: 1px solid #374151; }
                .footer-content { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 20px; }
                .footer-legal { text-align: right; }
                @media (max-width: 768px) {
                    .footer-content { flex-direction: column; text-align: center; }
                    .footer-legal { text-align: center; margin-top: 1rem; }
                }
            `}</style>
        </footer>
    );
};

// Main App Component for Paid Search Page
const PaidSearchPage = () => {
    return (
        <Layout>
            <Head>
                <title>Paid Search (PPC) Services - BYLT Media</title>
                <meta name="description" content="Drive growth with data-driven Paid Search (PPC) campaigns from BYLT Media. We specialize in Google Ads, and maximizing your ROI through our expert partners." />
                <link rel="icon" href="/favicon.ico" />
                <link rel="canonical" href="https://www.byltmedia.com/paidsearch" />
                <meta name="robots" content="index, follow" />
                
                {/* Schema Markup for Service Page */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "Service",
                            "name": "Paid Search (PPC) Services",
                            "description": "Data-driven Paid Search (PPC) campaigns specializing in Google Ads and ROI maximization",
                            "provider": {
                                "@type": "Organization",
                                "name": "BYLT Media",
                                "url": "https://www.byltmedia.com"
                            },
                            "areaServed": ["GB", "EU"],
                            "serviceType": "Digital Marketing",
                            "category": "Performance Marketing",
                            "offers": {
                                "@type": "Offer",
                                "description": "Comprehensive PPC management and optimization services",
                                "availableAtOrFrom": {
                                    "@type": "Place",
                                    "name": "United Kingdom"
                                }
                            },
                            "hasOfferCatalog": {
                                "@type": "OfferCatalog",
                                "name": "PPC Services",
                                "itemListElement": [
                                    {
                                        "@type": "Offer",
                                        "itemOffered": {
                                            "@type": "Service",
                                            "name": "Google Ads Management"
                                        }
                                    },
                                    {
                                        "@type": "Offer", 
                                        "itemOffered": {
                                            "@type": "Service",
                                            "name": "Campaign Optimization"
                                        }
                                    },
                                    {
                                        "@type": "Offer",
                                        "itemOffered": {
                                            "@type": "Service", 
                                            "name": "ROI Maximization"
                                        }
                                    }
                                ]
                            }
                        })
                    }}
                />
            </Head>
            <GlobalStyles />
            
            <PaidSearchHero />
            <WhatIsPPC />
            <VerticalExperience />
            <PlatformPartners />
            <CaseStudy />
            <PaidSearchProcess />
            <NeuralContact />
        </Layout>
    );
};

export default PaidSearchPage;
