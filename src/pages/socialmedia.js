import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/layout';
import GlobalStyles from '../components/globalsyles';
import {
    Menu, X, Mail, Phone, MapPin, ChevronLeft, ChevronRight, Star, ChevronDown, MoveRight,
    Briefcase, Workflow, TrendingUp, Search, Code, BrainCircuit, Lightbulb, Construction,
    Rocket, BarChart, Clock, Target, DollarSign, CheckCircle, Award, Image as ImageIcon, ShoppingCart, Youtube,
    Building, HeartPulse, Car, Plane, ShoppingBag, Utensils, Scale, Zap, ThumbsUp, MessageSquare, Share2, AtSign, Users, Megaphone, Globe,
    PlayCircle, MessageCircle, BarChart3
} from 'lucide-react';
// Tree-shaken Three.js imports - only import what we actually use
import { 
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  TextureLoader,
  PlaneGeometry,
  MeshBasicMaterial,
  DoubleSide,
  Mesh,
  Vector3,
  BufferGeometry,
  BufferAttribute,
  PointsMaterial,
  AdditiveBlending,
  Points,
  Vector2,
  Clock as ThreeClock,
  MeshStandardMaterial,
  Group,
  SphereGeometry,
  LineBasicMaterial,
  Line,
  BoxGeometry,
  TorusKnotGeometry,
  AmbientLight,
  DirectionalLight
} from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';


// --- V10.0: SOCIAL MEDIA SERVICES PAGE ---

// --- OPTIMISED CUSTOM HOOK FOR SCROLL ANIMATIONS ---
const useQuantumScrollAnim = (threshold = 0.1, delay = 0) => {
    const ref = useRef(null);
    const animationFrameRef = useRef(null);
    
    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    const timeoutId = setTimeout(() => {
                        element.classList.add('quantum-visible');
                    }, delay);
                    observer.unobserve(element);
                    
                    // Store timeout for cleanup
                    animationFrameRef.current = timeoutId;
                }
            },
            { 
                threshold,
                rootMargin: '50px' // Better performance with margin
            }
        );
        observer.observe(element);
        
        return () => {
            if (element) {
                observer.unobserve(element);
            }
            if (animationFrameRef.current) {
                clearTimeout(animationFrameRef.current);
            }
        };
    }, [ref, threshold, delay]);
    return ref;
};

// OPTIMISED: Social Media Hero Animation
const SocialMediaHeroAnimation = () => {
    const mountRef = useRef(null);
    const animationFrameRef = useRef(null);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        const currentMount = mountRef.current;

        // --- Optimised Scene Setup ---
        const scene = new Scene();
        const camera = new PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
        const renderer = new WebGLRenderer({ 
            alpha: true, 
            antialias: true,
            powerPreference: "high-performance"
        });
        renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Performance limit
        currentMount.appendChild(renderer.domElement);
        camera.position.z = 20;

        const icons = [];
        const iconTextures = {};
        const iconTypes = ['love', 'send'];
        
        // Load textures from emoji folder
        const textureLoader = new TextureLoader();
        iconTextures.love = textureLoader.load('/images/emojis/love.png');
        iconTextures.send = textureLoader.load('/images/emojis/send.png');
        
        const createIcon = (iconType) => {
            // Create a plane geometry for the emoji
            const geometry = new PlaneGeometry(2, 2);
            const material = new MeshBasicMaterial({
                map: iconTextures[iconType],
                transparent: true,
                opacity: 0,
                side: DoubleSide,
                alphaTest: 0.1,
                depthWrite: false
            });
            const mesh = new Mesh(geometry, material);
            
            mesh.userData = {
                animOffset: Math.random() * Math.PI * 2,
                animSpeed: new Vector3(
                    0.1 + Math.random() * 0.2,
                    0.2 + Math.random() * 0.2,
                    0.1 + Math.random() * 0.1
                ),
                targetOpacity: 0.4 + Math.random() * 0.4, // Increased opacity for better visibility
            };

            return mesh;
        };

        // --- Optimised Icon Initialization (Reduced Count) ---
        for (let i = 0; i < 18; i++) { // Reduced from 30 to 18 (~40% reduction)
            const iconType = iconTypes[i % iconTypes.length];
            const icon = createIcon(iconType);

            icon.position.set(
                (Math.random() - 0.5) * 40,
                (Math.random() - 0.5) * 30,
                (Math.random() - 0.5) * 40
            );
            icon.rotation.set(
                Math.random() * Math.PI,
                Math.random() * Math.PI,
                Math.random() * Math.PI
            );
            icon.scale.setScalar(0.8 + Math.random() * 1.2); // Slightly smaller scale
            icon.userData.origin = icon.position.clone();
            
            icons.push(icon);
            scene.add(icon);
        }

        // --- Optimised Atmospheric Particles (Reduced Count) ---
        const particleGeom = new BufferGeometry();
        const particleCount = 800; // Reduced from 2000 (~60% reduction)
        const posArray = new Float32Array(particleCount * 3);
        for(let i = 0; i < particleCount * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * 60;
        }
        particleGeom.setAttribute('position', new BufferAttribute(posArray, 3));
        const particleMat = new PointsMaterial({
            size: 0.02,
            color: 0xB8FFFA,
            transparent: true,
            opacity: 0.5,
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

        // --- Optimised Animation Loop with Performance Throttling ---
        let frameCount = 0;
        const clock = new ThreeClock();
        const animate = () => {
            animationFrameRef.current = requestAnimationFrame(animate);
            const elapsedTime = clock.getElapsedTime();
            frameCount++;

            // Hardware-accelerated mouse lerp
            mouse.lerp(target, 0.02);

            // Throttled icon animations (every 2 frames)
            if (frameCount % 2 === 0) {
                icons.forEach(icon => {
                    const { userData } = icon;
                    if (icon.material.opacity < userData.targetOpacity) {
                        icon.material.opacity += 0.003;
                    }

                    icon.position.x = userData.origin.x + Math.cos(elapsedTime * userData.animSpeed.x + userData.animOffset) * 1.2; // Reduced amplitude
                    icon.position.y = userData.origin.y + Math.sin(elapsedTime * userData.animSpeed.y + userData.animOffset) * 1.6; // Reduced amplitude
                    icon.position.z = userData.origin.z + Math.sin(elapsedTime * userData.animSpeed.z + userData.animOffset) * 1.2; // Reduced amplitude
                    
                    icon.rotation.x += 0.0008; // Slightly reduced rotation speed
                    icon.rotation.y += 0.0015; // Slightly reduced rotation speed
                });
            }
            
            // Optimised particle and scene rotation
            particles.rotation.y = elapsedTime * 0.008; // Reduced from 0.01
            scene.rotation.y += (mouse.x * 0.1 - scene.rotation.y) * 0.02;
            scene.rotation.x += (-mouse.y * 0.1 - scene.rotation.x) * 0.02;

            renderer.render(scene, camera);
        };
        animate();

        // --- Resize Handling ---
        const handleResize = () => {
            camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
        };
        window.addEventListener('resize', handleResize);

        // --- Optimised Cleanup with Animation Frame Cancellation ---
        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            if (currentMount && renderer.domElement.parentNode === currentMount) {
                currentMount.removeChild(renderer.domElement);
            }
            // Enhanced cleanup for better memory management
            scene.traverse(object => {
                if (object.isMesh || object.isPoints) {
                    if (object.geometry) object.geometry.dispose();
                    if (object.material) {
                        if (object.material.map) object.material.map.dispose();
                        object.material.dispose();
                    }
                }
            });
            renderer.dispose();
        };
    }, []);

    return <div ref={mountRef} className="absolute inset-0 z-0" />;
};

// NEW: Social Media Hero Section
const SocialMediaHero = () => {
  const [textIndex, setTextIndex] = useState(0);
  const texts = [
    "Amplify Your Brand",
    "Cultivate Community",
    "Drive Social Commerce",
    "Engineer Viral Growth"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex(prev => (prev + 1) % texts.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden hero-section">
      <SocialMediaHeroAnimation />
      
      <div className="absolute inset-0 hero-overlay-1 z-10"></div>
      
      <div className="relative z-20 text-center text-white max-w-5xl mx-auto px-4">
        <div className="mb-8">
          <div className="text-xs tracking-widest text-gray-400 mb-4 font-inter glitch-text">
            BYLT.MEDIA // SOCIAL MEDIA MARKETING
          </div>
          <h1 className="text-6xl md:text-8xl font-bold mb-6 font-inter hero-title">
            <span className="quantum-text" key={textIndex}>
              {texts[textIndex]}
            </span>
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-200 max-w-4xl mx-auto hero-subtitle leading-relaxed">
            We build and execute strategic social media campaigns that foster authentic connections, drive engagement, and convert followers into loyal customers.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center hero-cta">
          <a href="#contact" className="quantum-button-hero">
            <span>Get a Free Consultation</span>
          </a>
          <a href="#process" className="hologram-button">
            <span>Our Approach</span>
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
            case 'network':
                const group = new Group();
                const sphereGeom = new SphereGeometry(0.3, 16, 16);
                const positions = [
                    new Vector3(0, 0, 0), new Vector3(1.5, 1, 0), new Vector3(-1.5, 1, 0),
                    new Vector3(1.5, -1, 0), new Vector3(-1.5, -1, 0), new Vector3(0, 0, 1.5)
                ];
                positions.forEach(pos => {
                    const sphere = new Mesh(sphereGeom, material);
                    sphere.position.copy(pos);
                    group.add(sphere);
                });
                const lineMat = new LineBasicMaterial({ color: 0xB8FFFA, transparent: true, opacity: 0.5 });
                for(let i = 1; i < positions.length; i++) {
                    const points = [positions[0], positions[i]];
                    const lineGeom = new BufferGeometry().setFromPoints(points);
                    const line = new Line(lineGeom, lineMat);
                    group.add(line);
                }
                mesh = group;
                break;
            case 'car':
                 const carBody = new Mesh(new BoxGeometry(3, 1, 1.5), material);
                 const carTop = new Mesh(new BoxGeometry(1.5, 0.8, 1.2), material);
                 carTop.position.y = 0.9;
                 carTop.position.x = -0.25;
                 const carGroup = new Group();
                 carGroup.add(carBody);
                 carGroup.add(carTop);
                 mesh = carGroup;
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
            mesh.rotation.x += 0.003; // Reduced from 0.005
            mesh.rotation.y += 0.003; // Reduced from 0.005
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


// What is Social Media Marketing Section
const WhatIsSMM = () => {
    const sectionRef = useQuantumScrollAnim();
    return (
        <section ref={sectionRef} className="py-24 bg-slate-900/30 relative quantum-anim overflow-hidden">
            <Section3DElement shape="network" />
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <div className="section-title-container">
                        <h2 className="section-title-enhanced">Why BYLT.MEDIA for Paid Social?</h2>
                        <div className="title-accent-line"></div>
                    </div>
                    <p className="text-lg text-gray-400 max-w-3xl mx-auto">
                        We specialise in paid social media advertising, leveraging advanced targeting and optimisation techniques to maximise your ad spend across global platforms.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 text-center">
                    <div className="info-card">
                        <div className="info-card-icon"><Target /></div>
                        <h3 className="text-xl font-bold text-white mb-2">Precision Targeting</h3>
                        <p className="text-gray-400">
                           We use advanced audience segmentation and behavioural targeting to ensure your ads reach the right people at the right time, maximising conversion potential.
                        </p>
                    </div>
                    <div className="info-card">
                        <div className="info-card-icon"><Globe /></div>
                        <h3 className="text-xl font-bold text-white mb-2">Global Platform Expertise</h3>
                        <p className="text-gray-400">
                           From Meta and TikTok to Eastern platforms like LINE in Japan, we have the expertise to run effective campaigns across diverse social media ecosystems.
                        </p>
                    </div>
                    <div className="info-card">
                        <div className="info-card-icon"><TrendingUp /></div>
                        <h3 className="text-xl font-bold text-white mb-2">Performance-Driven Optimisation</h3>
                        <p className="text-gray-400">
                            Every campaign is continuously optimised using real-time data and performance metrics to improve ROI and reduce cost per acquisition.
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
                    box-shadow: 0 8px 25px rgba(184, 255, 250, 0.1);
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
                    transform: translateZ(0); /* Hardware acceleration */
                    will-change: transform, background, color;
                    transition: all 0.3s ease;
                }
            `}</style>
        </section>
    );
};

// Social Media Services Section
const SocialMediaServices = () => {
    const sectionRef = useQuantumScrollAnim();
    const services = [
        { icon: <Target />, name: "Meta Advertising", description: "Strategic paid campaigns across Facebook and Instagram to reach your ideal customers with precision targeting." },
        { icon: <PlayCircle />, name: "TikTok & YouTube Ads", description: "Video-first advertising campaigns that capture attention and drive engagement on the world's largest video platforms." },
        { icon: <Briefcase />, name: "LinkedIn Campaign Management", description: "B2B focused advertising campaigns that connect with decision-makers and drive professional lead generation." },
        { icon: <MessageCircle />, name: "Twitter/X Advertising", description: "Real-time advertising campaigns that leverage trending topics and conversations to amplify your brand message." },
        { icon: <Globe />, name: "Eastern Platform Advertising", description: "Specialised campaigns on platforms like LINE (Japan), WeChat, and other regional social networks for global reach." },
        { icon: <BarChart3 />, name: "Campaign Analytics & Optimisation", description: "Data-driven performance tracking and continuous optimisation to maximise your return on ad spend across all platforms." },
    ];

    return (
        <section id="services" ref={sectionRef} className="py-24 bg-slate-900/50 relative quantum-anim overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <div className="section-title-container">
                        <h2 className="section-title-enhanced">Our Paid Social Media Services</h2>
                        <div className="title-accent-line"></div>
                    </div>
                    <p className="text-lg text-gray-400 max-w-3xl mx-auto">
                        We specialise in paid social media advertising across all major platforms and Eastern markets, delivering targeted campaigns that drive real business results.
                    </p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <div key={index} className="vertical-card">
                            <div className="vertical-icon">{service.icon}</div>
                            <h4 className="vertical-name">{service.name}</h4>
                            <p className="vertical-description">{service.description}</p>
                        </div>
                    ))}
                </div>
            </div>
            <style jsx>{`
                .vertical-card {
                    background: rgba(30, 41, 59, 0.5);
                    border: 1px solid #374151;
                    border-radius: 16px;
                    padding: 2rem 1.5rem;
                    text-align: center;
                    transition: all 0.3s ease;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: flex-start;
                    transform: translateZ(0); /* Hardware acceleration */
                    will-change: transform, border-color, background;
                    contain: layout style paint;
                }
                .vertical-card:hover {
                    transform: translate3d(0, -8px, 0) scale(1.05); /* Hardware-accelerated transform */
                    border-color: #B8FFFA;
                    background: rgba(184, 255, 250, 0.05);
                }
                .vertical-icon {
                    font-size: 2.5rem;
                    color: #B8FFFA;
                    margin-bottom: 1rem;
                    transition: color 0.3s ease;
                    transform: translateZ(0); /* Hardware acceleration */
                    will-change: transform, color;
                }
                .vertical-name {
                    font-weight: 600;
                    color: white;
                    font-size: 1.125rem;
                    margin-bottom: 0.75rem;
                }
                .vertical-description {
                    color: #cbd5e1;
                    font-size: 0.875rem;
                    line-height: 1.6;
                }
            `}</style>
        </section>
    );
};

// Meta Partner Section
const MetaPartners = () => {
    const sectionRef = useQuantumScrollAnim();
    return (
        <div ref={sectionRef} className="py-16 bg-gradient-to-b from-slate-900 to-slate-800 quantum-anim partner-section relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(184,255,250,0.03)_0%,transparent_70%)]"></div>
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                <div className="text-center mb-12">
                    <div className="section-title-container">
                        <h2 className="section-title-enhanced partnership-title">
                            Certified Meta Expertise
                        </h2>
                        <div className="title-accent-line"></div>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-16">
                    <div className="flex-shrink-0">
                        <div className="partner-badge-container">
                            <img
                                src="/images/partners/partners logos/meta_partner_logo.png"
                                alt="Meta Business Partner 2025"
                                className="platform-logo"
                            />
                            <div className="badge-glow"></div>
                        </div>
                    </div>
                    
                    <div className="flex-1 max-w-2xl">
                        <div className="partnership-content">
                            <h3 className="partnership-highlight">Meta Business Partner Status</h3>
                            <p className="partnership-description">
                                Through our official partnership with <span className="brand-highlight">Marketise Me</span>, we leverage their elite Meta Business Partner certification to deliver world-class social media advertising, strategic insights, and priority access to the latest Meta advertising features and beta programs.
                            </p>
                            <div className="partnership-benefits">
                                <div className="benefit-item">
                                    <div className="benefit-icon">
                                        <Target className="w-5 h-5" />
                                    </div>
                                    <span>Priority support from Meta specialists</span>
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
                                    <span>Advanced analytics & optimisation tools</span>
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
                    filter: brightness(1.1) drop-shadow(0 10px 30px rgba(184, 255, 250, 0.15));
                    transition: all 0.4s ease;
                    position: relative;
                    z-index: 2;
                }
                
                .platform-logo:hover {
                    opacity: 1;
                    transform: scale(1.05) translateY(-5px);
                    filter: brightness(1.2) drop-shadow(0 15px 40px rgba(184, 255, 250, 0.25));
                }
                
                .badge-glow {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 120%;
                    height: 120%;
                    background: radial-gradient(circle, rgba(184, 255, 250, 0.08) 0%, transparent 70%);
                    border-radius: 50%;
                    animation: pulse 4s ease-in-out infinite;
                    z-index: 1;
                }
                
                @keyframes pulse {
                    0%, 100% { opacity: 0.3; transform: translate(-50%, -50%) scale(1); }
                    50% { opacity: 0.6; transform: translate(-50%, -50%) scale(1.1); }
                }
                
                .partnership-content {
                    text-align: left;
                }
                
                .partnership-highlight {
                    font-size: 1.5rem;
                    font-weight: 700;
                    color: #ffffff;
                    margin-bottom: 1rem;
                    background: linear-gradient(135deg, #ffffff 0%, #B8FFFA 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }
                
                .partnership-description {
                    color: #cbd5e1;
                    line-height: 1.7;
                    margin-bottom: 1.5rem;
                    font-size: 1rem;
                }
                
                .brand-highlight {
                    color: #B8FFFA;
                    font-weight: 600;
                }
                
                .partnership-benefits {
                    display: flex;
                    flex-direction: column;
                    gap: 0.75rem;
                }
                
                .benefit-item {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    color: #e5e7eb;
                    font-size: 0.9rem;
                }
                
                .benefit-icon {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 2rem;
                    height: 2rem;
                    background: rgba(184, 255, 250, 0.1);
                    border-radius: 50%;
                    color: #B8FFFA;
                    flex-shrink: 0;
                }
                
                @media (max-width: 1024px) {
                    .partnership-content {
                        text-align: center;
                    }
                }
            `}</style>
        </div>
    );
};

// NEW: Brickell Automotive Case Study Section
const CaseStudy = () => {
    const sectionRef = useQuantumScrollAnim();
    const [activeSection, setActiveSection] = useState('challenge');
    const [imageLoaded, setImageLoaded] = useState(false);

    const sections = [
        {
            id: 'challenge',
            title: 'The Challenge',
            content: 'Brickell Automotive Group, a major luxury car dealer, aimed to boost sales for its 8 brands. They needed a digital strategy to drive high-quality traffic to their dealerships and increase new car sales through targeted online advertising.'
        },
        {
            id: 'solution',
            title: 'Our Strategy',
            content: 'We executed a multi-platform strategy focusing on Google Search, YouTube, and Facebook. Campaigns were tailored for each of the 8 car brands, using geo-targeting to reach potential buyers near the dealerships. We optimised for conversions by tracking online actions that lead to offline sales, like directions requests and calls.'
        },
        {
            id: 'results',
            title: 'The Results',
            content: 'The campaign was a resounding success. We generated over 2,000 qualified leads per month, contributing to a 15% increase in new car sales. The cost per lead was reduced by 30%, demonstrating a highly efficient use of their ad spend and a significant return on investment.'
        }
    ];

    return (
        <section id="case-study" ref={sectionRef} className="py-16 bg-slate-900 quantum-anim relative overflow-hidden">
            <Section3DElement shape="car" />
            
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
                        See how we drove a 15% increase in new car sales for a luxury automotive group.
                    </p>
                </div>

                <div className="case-study-main-container">
                    <div className="case-study-header-section">
                        <div className="case-study-header">
                            <h3 className="case-study-title">Brickell Automotive Group</h3>
                            <p className="case-study-subtitle">Driving Luxury Car Sales with Strategic Social Media Advertising</p>
                            <p className="case-study-description">
                                How we helped a leading automotive group accelerate sales and reduce lead costs through a multi-channel digital advertising strategy.
                            </p>
                        </div>
                    </div>

                    <div className="case-study-image-section">
                        <div className="case-study-image-wrapper">
                            <img 
                                src="/images/casestudy/brickell-case-study.webp" 
                                alt="Brickell Automotive Group Case Study" 
                                className="case-study-image-clean"
                                onLoad={() => setImageLoaded(true)}
                                onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/600x400/0f172a/B8FFFA?text=Image+Not+Found'; }}
                            />
                        </div>
                    </div>

                    <div className="stats-section">
                        <div className="stats-grid">
                            <div className="stat-card-minimal">
                                <div className="stat-value">15%</div>
                                <div className="stat-label">Increase in New Car Sales</div>
                            </div>
                            <div className="stat-card-minimal">
                                <div className="stat-value">2,000+</div>
                                <div className="stat-label">Leads Generated Per Month</div>
                            </div>
                            <div className="stat-card-minimal">
                                <div className="stat-value">30%</div>
                                <div className="stat-label">Reduction in Cost Per Lead</div>
                            </div>
                             <div className="stat-card-minimal">
                                <div className="stat-value">8</div>
                                <div className="stat-label">Luxury Brands Managed</div>
                            </div>
                        </div>
                    </div>

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
                                                <div className="feature-item"><span>Multi-Platform Ads</span></div>
                                                <div className="feature-item"><span>Geo-Targeting</span></div>
                                                <div className="feature-item"><span>Conversion Optimisation</span></div>
                                                <div className="feature-item"><span>YouTube & Facebook Ads</span></div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="case-study-cta-section">
                        <div className="case-study-cta">
                            <button 
                                onClick={() => window.open('/case-studies-brickell', '_blank')}
                                className="cta-button"
                            >
                                View Full Case Study
                                <MoveRight className="cta-icon" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .case-study-bg-element { position: absolute; border-radius: 50%; background: radial-gradient(circle, rgba(184, 255, 250, 0.03) 0%, transparent 70%); animation: float 6s ease-in-out infinite; }
                .case-study-bg-1 { width: 300px; height: 300px; top: 20%; left: 10%; animation-delay: 0s; }
                .case-study-bg-2 { width: 200px; height: 200px; top: 60%; right: 15%; animation-delay: 2s; }
                .case-study-bg-3 { width: 150px; height: 150px; bottom: 20%; left: 70%; animation-delay: 4s; }
                .case-study-main-container { background: rgba(30, 41, 59, 0.6); backdrop-filter: blur(10px); border-radius: 16px; padding: 1.5rem; border: 1px solid rgba(184, 255, 250, 0.1); box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.15); max-width: 100%; }
                .case-study-main-container::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px; background: linear-gradient(90deg, transparent, rgba(184, 255, 250, 0.3), transparent); }
                .case-study-header-section { margin-bottom: 1.5rem; }
                .case-study-header { text-align: center; max-width: 700px; margin: 0 auto; }
                .stats-section { margin-bottom: 2rem; }
                .case-study-image-section { width: 100%; margin-bottom: 2rem; }
                .case-study-tabs-section { width: 100%; margin-bottom: 1.5rem; }
                .case-study-cta-section { width: 100%; text-align: center; padding-top: 1rem; border-top: 1px solid rgba(184, 255, 250, 0.1); }
                .case-study-image-wrapper { position: relative; width: 100%; max-width: 500px; margin: 0 auto; }
                .case-study-image-clean { width: 100%; height: auto; aspect-ratio: 16/9; object-fit: cover; border-radius: 12px; transition: all 0.3s ease; }
                .case-study-image-clean:hover { transform: scale(1.02); box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2); }
                .case-study-description { color: #94a3b8; line-height: 1.6; margin-top: 0.75rem; font-size: 0.9rem; }
                .case-study-cta { display: flex; justify-content: center; align-items: center; }
                .cta-button { display: inline-flex; align-items: center; gap: 0.5rem; background: linear-gradient(135deg, #B8FFFA 0%, #72E4E0 100%); color: #0f172a; padding: 0.75rem 1.25rem; border-radius: 8px; font-weight: 600; text-decoration: none; transition: all 0.3s ease; border: none; cursor: pointer; white-space: nowrap; font-size: 0.9rem; }
                .cta-button:hover { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(184, 255, 250, 0.3); background: linear-gradient(135deg, #72E4E0 0%, #B8FFFA 100%); }
                .cta-icon { width: 18px; height: 18px; transition: transform 0.3s ease; }
                .cta-button:hover .cta-icon { transform: translateX(3px); }
                .case-study-header { margin-bottom: 2rem; }
                .case-study-title { font-size: clamp(2rem, 5vw, 3rem); font-weight: 900; color: #ffffff; margin-bottom: 0.5rem; background: linear-gradient(135deg, #ffffff 0%, #B8FFFA 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
                .case-study-subtitle { font-size: 1.25rem; color: #B8FFFA; font-weight: 600; opacity: 0.9; margin-bottom: 0.5rem; }
                .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 0.75rem; margin-bottom: 2rem; }
                .stat-card-minimal { background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(184, 255, 250, 0.15); border-radius: 8px; padding: 0.75rem; text-align: center; transition: all 0.3s ease; }
                .stat-card-minimal:hover { border-color: rgba(184, 255, 250, 0.25); background: rgba(184, 255, 250, 0.03); }
                .stat-value { font-size: clamp(1.5rem, 4vw, 2rem); font-weight: 700; color: #B8FFFA; line-height: 1; margin-bottom: 0.25rem; }
                .stat-label { font-size: 0.8rem; color: #94a3b8; font-weight: 500; }
                .case-study-tabs { background: rgba(15, 23, 42, 0.5); border-radius: 20px; overflow: hidden; border: 1px solid rgba(184, 255, 250, 0.1); }
                .tab-navigation { display: flex; background: rgba(30, 41, 59, 0.8); border-bottom: 1px solid rgba(184, 255, 250, 0.1); }
                .tab-button { flex: 1; padding: 1rem 1.5rem; background: none; border: none; color: #94a3b8; font-weight: 600; cursor: pointer; transition: all 0.3s ease; position: relative; }
                .tab-button::after { content: ''; position: absolute; bottom: 0; left: 0; width: 100%; height: 2px; background: #B8FFFA; transform: scaleX(0); transition: transform 0.3s ease; }
                .tab-button.active { color: #B8FFFA; background: rgba(184, 255, 250, 0.05); }
                .tab-button.active::after { transform: scaleX(1); }
                .tab-button:hover:not(.active) { color: #ffffff; background: rgba(184, 255, 250, 0.02); }
                .tab-content { position: relative; min-height: 150px; }
                .tab-panel { position: absolute; top: 0; left: 0; right: 0; padding: 1.5rem; opacity: 0; transform: translateY(20px); transition: all 0.4s ease; pointer-events: none; }
                .tab-panel.active { position: relative; opacity: 1; transform: translateY(0); pointer-events: auto; }
                .tab-panel-title { font-size: 1.5rem; font-weight: 700; color: #ffffff; margin-bottom: 1rem; }
                .tab-panel-content { color: #cbd5e1; line-height: 1.7; margin-bottom: 1.5rem; }
                .solution-features { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 0.75rem; margin-top: 1.5rem; }
                .feature-item { padding: 0.5rem 0.75rem; background: rgba(184, 255, 250, 0.03); border-radius: 6px; border: 1px solid rgba(184, 255, 250, 0.1); transition: all 0.2s ease; text-align: center; }
                .feature-item:hover { background: rgba(184, 255, 250, 0.05); border-color: rgba(184, 255, 250, 0.2); }
                .feature-item span { color: #cbd5e1; font-weight: 400; font-size: 0.85rem; }
                @keyframes float { 
                    0%, 100% { transform: translate3d(0, 0px, 0) rotate(0deg); } /* Hardware-accelerated */
                    50% { transform: translate3d(0, -20px, 0) rotate(180deg); } /* Hardware-accelerated */
                }
                @media (max-width: 768px) {
                    .case-study-main-container { padding: 1.5rem; }
                    .stats-grid { grid-template-columns: repeat(2, 1fr); gap: 0.75rem; }
                    .case-study-image-section { margin-bottom: 2rem; }
                    .case-study-tabs-section { margin-bottom: 1.5rem; }
                    .tab-navigation { flex-direction: column; }
                    .solution-features { grid-template-columns: 1fr; }
                }
                @media (max-width: 480px) {
                    .stats-grid { grid-template-columns: 1fr; }
                    .stat-card-minimal { padding: 0.75rem; }
                }
            `}</style>
        </section>
    );
};


// Social Media Process Section
const SocialMediaProcess = () => {
    const [activeStep, setActiveStep] = useState(null);
    const sectionRef = useQuantumScrollAnim();
    
    const processSteps = [
        { step: "01", title: "Discovery & Audience Analysis", subtitle: "Understanding Your World", description: "We dive deep into your brand, competitors, and target audience to build a foundational understanding for our strategy.", icon: <Search className="w-6 h-6" />, details: [ "Brand immersion workshops", "Competitor social presence audit", "Audience persona development", "Platform selection analysis" ] },
        { step: "02", title: "Content Strategy & Creation", subtitle: "Crafting Your Narrative", description: "We develop a content strategy with key themes and pillars, then create compelling visuals and copy that bring your brand story to life.", icon: <Lightbulb className="w-6 h-6" />, details: [ "Content pillar definition", "Monthly content calendar planning", "Creative asset production (video/static)", "Copywriting and tone of voice" ] },
        { step: "03", title: "Community Management & Engagement", subtitle: "Building Relationships", description: "We actively manage your social channels, engaging with your community to foster loyalty and build a positive brand perception.", icon: <Users className="w-6 h-6" />, details: [ "Proactive comment/DM responses", "User-generated content initiatives", "Community-building campaigns", "Social listening and sentiment analysis" ] },
        { step: "04", title: "Optimisation & Paid Amplification", subtitle: "Maximising Reach & ROI", description: "We continuously optimise organic content based on performance and use targeted paid ads to amplify key messages and drive conversions.", icon: <TrendingUp className="w-6 h-6" />, details: [ "A/B testing of content formats", "Paid campaign setup and management", "Audience targeting and retargeting", "Budget allocation and bid optimisation" ] },
        { step: "05", title: "Performance Reporting & Insights", subtitle: "Measuring What Matters", description: "We deliver transparent reports focused on key metrics, providing actionable insights to continually refine our strategy and prove ROI.", icon: <BarChart className="w-6 h-6" />, details: [ "Custom performance dashboards", "Monthly and quarterly reviews", "Analysis of engagement, reach, and conversions", "Strategic recommendations for future growth" ] }
    ];

    return (
        <section id="process" ref={sectionRef} className="py-24 quantum-process-section quantum-anim relative overflow-hidden">
            <div className="absolute inset-0 quantum-grid-animation"></div>
            
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                <div className="text-center mb-20">
                    <div className="section-title-container">
                        <h2 className="section-title-enhanced">
                            Our Social Media Approach
                        </h2>
                        <div className="title-accent-line"></div>
                    </div>
                    <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
                        A holistic process designed to build authentic communities and deliver measurable results.
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
                @keyframes gridMove { 
                    from { transform: translate3d(0, 0, 0); } /* Hardware-accelerated */
                    to { transform: translate3d(50px, 50px, 0); } /* Hardware-accelerated */
                }
                .process-timeline { position: relative; max-width: 800px; margin: 0 auto; }
                .process-step { position: relative; margin-bottom: 2rem; }
                .step-container { display: flex; align-items: flex-start; gap: 2rem; }
                .step-number { width: 4rem; height: 4rem; border-radius: 50%; background: #374151; color: white; display: flex; align-items: center; justify-content: center; font-family: 'Inter', sans-serif; font-weight: 700; font-size: 1.1rem; cursor: pointer; transition: all 0.3s ease; flex-shrink: 0; z-index: 2; position: relative; }
                .process-step.active .step-number, .step-number:hover { transform: scale(1.1); background: #B8FFFA; color: #111; }
                .step-card { flex: 1; background: rgba(30, 41, 59, 0.5); border: 1px solid #374151; border-radius: 16px; padding: 1.5rem; cursor: pointer; transition: all 0.3s ease; backdrop-filter: blur(8px); }
                .process-step.active .step-card, .step-card:hover { border-color: #B8FFFA; }
                .step-header { display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem; }
                .step-icon-wrapper { width: 3rem; height: 3rem; background: #374151; border-radius: 12px; display: flex; align-items: center; justify-content: center; color: white; flex-shrink: 0; transition: all 0.3s ease; }
                .process-step.active .step-icon-wrapper { background: #B8FFFA; color: #111; }
                .step-text { flex: 1; }
                .step-title { font-family: 'Inter', sans-serif; font-size: 1.25rem; font-weight: 700; color: white; margin: 0 0 0.25rem 0; }
                .step-subtitle { font-size: 0.875rem; color: #9ca3af; font-weight: 500; margin: 0; }
                .chevron { width: 1.25rem; height: 1.25rem; color: #9ca3af; transition: all 0.3s ease; flex-shrink: 0; }
                .chevron.rotated { transform: rotate(180deg); color: #B8FFFA; }
                .step-description { color: #d1d5db; line-height: 1.6; margin: 0 0 1rem 0; }
                .step-expanded { border-top: 1px solid #374151; padding-top: 1rem; animation: fadeIn 0.3s ease-in-out; }
                @keyframes fadeIn { 
                    from { opacity: 0; transform: translate3d(0, -10px, 0); } /* Hardware-accelerated */
                    to { opacity: 1; transform: translate3d(0, 0, 0); } /* Hardware-accelerated */
                }
                .expanded-title { font-size: 0.875rem; font-weight: 600; color: #9ca3af; margin: 0 0 0.75rem 0; text-transform: uppercase; letter-spacing: 0.05em; }
                .details-list { list-style: none; padding: 0; margin: 0; }
                .detail-item { display: flex; align-items: flex-start; gap: 0.75rem; margin-bottom: 0.5rem; color: #e5e7eb; font-size: 0.875rem; line-height: 1.5; animation: slideIn 0.3s ease-in-out both; }
                .detail-item:nth-child(1) { animation-delay: 0.1s; } .detail-item:nth-child(2) { animation-delay: 0.2s; } .detail-item:nth-child(3) { animation-delay: 0.3s; } .detail-item:nth-child(4) { animation-delay: 0.4s; }
                @keyframes slideIn { 
                    from { opacity: 0; transform: translate3d(-20px, 0, 0); } /* Hardware-accelerated */
                    to { opacity: 1; transform: translate3d(0, 0, 0); } /* Hardware-accelerated */
                }
                .bullet { color: #B8FFFA; font-weight: bold; font-size: 1.2rem; flex-shrink: 0; line-height: 1; }
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


// Contact Section (Unchanged)
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
                .form-input:focus, .form-textarea:focus { outline: none; border-color: #B8FFFA; background: rgba(30, 41, 59, 0.8); box-shadow: 0 0 0 2px rgba(184, 255, 250, 0.1); }
                .form-input::placeholder, .form-textarea::placeholder { color: #9ca3af; }
                .form-textarea { resize: vertical; min-height: 120px; }
                .form-submit { display: flex; justify-content: center; margin-top: 2rem; }
                .neural-submit-button { position: relative; display: inline-flex; align-items: center; justify-content: center; padding: 1.25rem 2.5rem; font-weight: 700; font-size: 1.125rem; color: #1e293b; background: #B8FFFA; border: none; border-radius: 15px; font-family: 'Inter', sans-serif; text-decoration: none; transition: all 0.4s ease; cursor: pointer; min-width: 180px; }
                .neural-submit-button:hover:not(:disabled) { transform: translateY(-3px) scale(1.05); box-shadow: 0 10px 30px rgba(184, 255, 250, 0.3); background: #9DFFF8; }
                .neural-submit-button:disabled { opacity: 0.7; cursor: not-allowed; transform: none; }
                .submit-spinner { width: 20px; height: 20px; border: 2px solid transparent; border-top: 2px solid #1e293b; border-radius: 50%; animation: spin 1s linear infinite; margin-right: 0.75rem; }
                @keyframes spin { 
                    0% { transform: rotate3d(0, 0, 1, 0deg); } /* Hardware-accelerated */
                    100% { transform: rotate3d(0, 0, 1, 360deg); } /* Hardware-accelerated */
                }
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

// Footer (Unchanged)
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
                                v10.0 // Social Media Services
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

// Main App Component for Social Media Page
const SocialMediaPage = () => {
    return (
        <Layout>
            <Head>
                <title>Social Media Marketing Services - BYLT Media</title>
                <meta name="description" content="Amplify your brand with strategic social media marketing from BYLT Media. We build communities, create engaging content, and drive measurable results." />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <GlobalStyles />
            
            <SocialMediaHero />
            <WhatIsSMM />
            <SocialMediaServices />
            <MetaPartners />
            <CaseStudy />
            <SocialMediaProcess />
            <NeuralContact />
        </Layout>
    );
};

export default SocialMediaPage;
