import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Layout from '../components/layout';
import GlobalStyles from '../components/globalsyles';
import {
    Menu, X, Mail, Phone, MapPin, ChevronLeft, ChevronRight, Star, ChevronDown, MoveRight,
    Briefcase, Workflow, TrendingUp, Search, Code, BrainCircuit, Lightbulb, Construction,
    Rocket, BarChart, Clock, Target, DollarSign, CheckCircle, Award, Image as ImageIcon, ShoppingCart, Youtube,
    Building, HeartPulse, Car, Plane, ShoppingBag, Utensils, Scale, Zap, Link, FileText, Share2
} from 'lucide-react';
// Tree-shaken Three.js imports - only import what we actually use
import {
    Scene,
    PerspectiveCamera, 
    WebGLRenderer,
    Group,
    CanvasTexture,
    MeshBasicMaterial,
    MeshStandardMaterial,
    PlaneGeometry,
    Mesh,
    Vector2,
    Vector3,
    BufferGeometry,
    BufferAttribute,
    PointsMaterial,
    Points,
    BoxGeometry,
    CylinderGeometry,
    ConeGeometry,
    TorusKnotGeometry,
    AmbientLight,
    DirectionalLight,
    Clock as ThreeClock,
    AdditiveBlending
} from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';


// --- V10: COMPREHENSIVE SEO SERVICES PAGE ---

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

// V10 Navigation: Updated for SEO Page
// Optimized SEO Hero Animation with Performance Enhancements
const SEOHeroAnimation = () => {
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

        // --- Content (SEO Themed) ---
        const searchQueries = [
            "how to rank higher on google", "technical seo audit", "ecommerce seo expert",
            "link building strategies", "AEO optimization", "GEO for ChatGPT",
            "answer engine optimization", "content marketing for seo", "voice search optimization",
            "AI search optimization", "core web vitals", "generative engine SEO",
            "perplexity AI optimization", "structured data markup", "total search strategy"
        ];

        const searchBars = [];

        // --- Helper function to create a search bar (Unchanged) ---
        const createSearchBar = (initialText) => {
            const group = new Group();
            const barWidth = 3.5;
            const barHeight = 0.4;

            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.width = 384;
            canvas.height = 48;

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
                context, texture, material, text: '', fullText: initialText,
                animationState: 'typing', charIndex: 0, pauseCounter: 0,
                pauseDuration: 60 + Math.random() * 40,
                animOffset: Math.random() * Math.PI * 2,
                animSpeed: new Vector3(
                    0.2 + Math.random() * 0.2,
                    0.3 + Math.random() * 0.2,
                    0.1 + Math.random() * 0.2
                ),
                targetOpacity: 0.2 + Math.random() * 0.15,
            };
            
            return group;
        };

        // --- Helper function to draw the search bar's appearance (Unchanged) ---
        const updateSearchBarCanvas = (searchBar) => {
            const { context, text } = searchBar.userData;
            const canvas = context.canvas;
            const barHeight = canvas.height;
            const barWidth = canvas.width;
            
            context.clearRect(0, 0, barWidth, barHeight);

            context.shadowColor = 'rgba(184, 255, 250, 0.5)';
            context.shadowBlur = 10;
            context.strokeStyle = 'rgba(184, 255, 250, 0.6)';
            context.lineWidth = 2;
            context.beginPath();
            context.roundRect(1, 1, barWidth - 2, barHeight - 2, 15);
            context.stroke();
            
            context.shadowBlur = 0;

            context.strokeStyle = 'rgba(184, 255, 250, 0.7)';
            context.lineWidth = 2.5;
            context.beginPath();
            context.arc(22, barHeight / 2, 8, 0, 2 * Math.PI);
            context.stroke();
            context.beginPath();
            context.moveTo(28, 30);
            context.lineTo(36, 38);
            context.stroke();

            const showCursor = searchBar.userData.pauseCounter % 20 < 10;
            const cursor = (showCursor && (searchBar.userData.animationState === 'typing' || searchBar.userData.animationState === 'pausing')) ? '|' : '';
            context.fillStyle = 'rgba(184, 255, 250, 0.8)';
            context.font = '16px Inter, sans-serif';
            context.textAlign = 'left';
            context.textBaseline = 'middle';
            context.fillText(text + cursor, 45, barHeight / 2 + 1);

            searchBar.userData.texture.needsUpdate = true;
        };

        // --- Create Optimized Atmospheric Particles (Reduced by ~60%) ---
        const particleGeom = new BufferGeometry();
        const particleCount = 800; // Reduced from 2000 to 800
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

        // --- Optimized Initialization (Reduced search bars from 12 to 8) ---
        for (let i = 0; i < 8; i++) {
            const query = searchQueries[i % searchQueries.length];
            const searchBar = createSearchBar(query);
            
            let x, y, z;
            
            if (i < 3) {
                const angle = (i / 3) * Math.PI * 2;
                const radius = 8 + Math.random() * 2;
                x = Math.cos(angle) * radius;
                y = 2 + Math.random() * 2;
                z = Math.sin(angle) * radius;
            } else if (i < 6) {
                const angle = ((i - 3) / 3) * Math.PI * 2;
                const radius = 7 + Math.random() * 2;
                x = Math.cos(angle) * radius;
                y = -3 - Math.random() * 2;
                z = Math.sin(angle) * radius;
            } else {
                const sideIndex = i - 6;
                if (sideIndex < 1) {
                    x = -9 - Math.random() * 2;
                    y = (Math.random() - 0.5) * 3;
                    z = (Math.random() - 0.5) * 4;
                } else {
                    x = 9 + Math.random() * 2;
                    y = (Math.random() - 0.5) * 3;
                    z = (Math.random() - 0.5) * 4;
                }
            }
            
            searchBar.position.set(x, y, z);
            searchBar.userData.origin = searchBar.position.clone();
            
            searchBar.lookAt(camera.position);

            searchBars.push(searchBar);
            scene.add(searchBar);
        }

        // --- Mouse Interaction (Unchanged) ---
        const mouse = new Vector2();
        const target = new Vector2();
        const handleMouseMove = (event) => {
            target.x = (event.clientX / window.innerWidth) * 2 - 1;
            target.y = -(event.clientY / window.innerHeight) * 2 + 1;
        };
        window.addEventListener('mousemove', handleMouseMove);

        // --- Optimized Animation Loop with Performance Throttling ---
        let frameCount = 0;
        let lastTime = 0;
        const targetFPS = 60;
        const frameInterval = 1000 / targetFPS;
        const clock = new ThreeClock();
        
        const animate = (currentTime) => {
            animationFrameRef.current = requestAnimationFrame(animate);
            
            // Performance throttling
            if (currentTime - lastTime < frameInterval) return;
            lastTime = currentTime;
            
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
                if(frameCount % 5 === 0 || userData.animationState === 'pausing') {
                    updateSearchBarCanvas(bar);
                }

                bar.position.x = userData.origin.x + Math.cos(elapsedTime * userData.animSpeed.x + userData.animOffset) * 0.5;
                bar.position.y = userData.origin.y + Math.sin(elapsedTime * userData.animSpeed.y + userData.animOffset) * 0.7;
                bar.position.z = userData.origin.z + Math.sin(elapsedTime * userData.animSpeed.z + userData.animOffset) * 0.5;
                bar.lookAt(camera.position);
            });
            
            particles.rotation.y = elapsedTime * 0.02;

            scene.rotation.y += (mouse.x * 0.1 - scene.rotation.y) * 0.02;
            scene.rotation.x += (-mouse.y * 0.1 - scene.rotation.x) * 0.02;

            renderer.render(scene, camera);
        };

        animate(0);

        // --- Resize Handling ---
        const handleResize = () => {
            camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
        };
        window.addEventListener('resize', handleResize);

        // --- Optimized Cleanup ---
        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            if (currentMount && renderer.domElement.parentNode === currentMount) {
                currentMount.removeChild(renderer.domElement);
            }
            // Dispose of geometries and materials
            particleGeom.dispose();
            particleMat.dispose();
            searchBars.forEach(bar => {
                if (bar.geometry) bar.geometry.dispose();
                if (bar.material) bar.material.dispose();
            });
            renderer.dispose();
        };
    }, []);

    return (
        <div 
            ref={mountRef} 
            className="absolute inset-0 z-0"
            style={{ 
                willChange: 'transform',
                contain: 'layout style paint'
            }}
        />
    );
};


// Optimized SEO Hero Section with Hardware Acceleration
const SEOHero = () => {
  const [textIndex, setTextIndex] = useState(0);
  const texts = [
    "Dominate All Search Engines",
    "Total Search Strategy",
    "Future-Proof Your Rankings"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex(prev => (prev + 1) % texts.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section 
      id="home" 
      className="relative h-screen flex items-center justify-center overflow-hidden hero-section"
      style={{ 
        willChange: 'transform',
        contain: 'layout style paint'
      }}
    >
      <SEOHeroAnimation />
      
      <div 
        className="absolute inset-0 hero-overlay-1 z-10"
        style={{ contain: 'paint' }}
      ></div>
      
      <div 
        className="relative z-20 text-center text-white max-w-5xl mx-auto px-4"
        style={{ willChange: 'transform' }}
      >
        <div 
          className="mb-8"
          style={{ 
            willChange: 'transform',
            contain: 'layout style'
          }}
        >
          <div 
            className="text-xs tracking-widest text-gray-400 mb-4 font-inter glitch-text"
            style={{ willChange: 'transform' }}
          >
            BYLT.MEDIA // SEARCH ENGINE OPTIMIZATION
          </div>
          <h1 
            className="text-6xl md:text-8xl font-bold mb-6 font-inter hero-title"
            style={{ willChange: 'transform' }}
          >
            <span 
              className="quantum-text" 
              key={textIndex}
              style={{ willChange: 'transform, opacity' }}
            >
              {texts[textIndex]}
            </span>
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-200 max-w-4xl mx-auto hero-subtitle leading-relaxed">
            We architect comprehensive SEO strategies that build long-term authority, drive high-quality organic traffic, and deliver sustainable growth for your business.
          </p>
        </div>
        
        <div 
          className="flex flex-col sm:flex-row gap-6 justify-center items-center hero-cta"
          style={{ 
            willChange: 'transform',
            contain: 'layout style'
          }}
        >
          <a href="/free-audit" className="quantum-button-hero">
            <span>Request an SEO Audit</span>
          </a>
          <a href="#process" className="hologram-button">
            <span>Our SEO Process</span>
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
            case 'graph':
                const group = new Group();
                const barGeom = new BoxGeometry(0.4, 1, 0.4);
                const bar1 = new Mesh(barGeom, material);
                bar1.position.set(-1, -0.5, 0);
                const bar2 = new Mesh(barGeom, material);
                bar2.scale.y = 1.5;
                bar2.position.set(0, -0.25, 0);
                const bar3 = new Mesh(barGeom, material);
                bar3.scale.y = 2.5;
                bar3.position.set(1, 0.25, 0);
                group.add(bar1, bar2, bar3);
                mesh = group;
                break;
            case 'rocket':
                const rocketGroup = new Group();
                const bodyGeom = new CylinderGeometry(0.5, 0.8, 2.5, 32);
                const noseGeom = new ConeGeometry(0.5, 1, 32);
                const finGeom = new BoxGeometry(1.5, 0.1, 0.5);
                const body = new Mesh(bodyGeom, material);
                const nose = new Mesh(noseGeom, material);
                nose.position.y = 1.75;
                const fin1 = new Mesh(finGeom, material);
                fin1.position.y = -1;
                const fin2 = fin1.clone();
                fin2.rotation.y = Math.PI / 2;
                rocketGroup.add(body, nose, fin1, fin2);
                mesh = rocketGroup;
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
            if (currentMount && renderer.domElement.parentNode === currentMount) {
                currentMount.removeChild(renderer.domElement);
            }
        };
    }, [shape]);

    return <div ref={mountRef} className="absolute top-0 left-0 w-full h-full opacity-10 z-0"></div>;
};

// Optimized Why Invest in SEO Section with Hardware Acceleration
const WhyInvestInSEO = () => {
    const sectionRef = useQuantumScrollAnim();
    return (
        <section 
            ref={sectionRef} 
            id="services" 
            className="py-24 bg-slate-900/30 relative quantum-anim overflow-hidden"
            style={{ 
                willChange: 'transform',
                contain: 'layout style paint'
            }}
        >
            <Section3DElement shape="graph" />
            <div 
                className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
                style={{ contain: 'layout style' }}
            >
                <div 
                    className="text-center mb-16"
                    style={{ 
                        willChange: 'transform',
                        contain: 'layout style'
                    }}
                >
                    <div className="section-title-container">
                        <h2 
                            className="section-title-enhanced"
                            style={{ willChange: 'transform' }}
                        >
                            Why Invest in SEO?
                        </h2>
                        <div className="title-accent-line"></div>
                    </div>
                    <p className="text-lg text-gray-400 max-w-3xl mx-auto">
                        SEO is the engine of sustainable digital growth. It's not about quick wins; it's about building a powerful, long-term asset that generates traffic, leads, and revenue organically.
                    </p>
                </div>

                <div 
                    className="grid md:grid-cols-3 gap-8 text-center"
                    style={{ 
                        willChange: 'transform',
                        contain: 'layout style'
                    }}
                >
                    <div 
                        className="info-card"
                        style={{ 
                            willChange: 'transform, border-color',
                            contain: 'layout style paint'
                        }}
                    >
                        <div className="info-card-icon"><TrendingUp /></div>
                        <h3 className="text-xl font-bold text-white mb-2">Sustainable Organic Growth</h3>
                        <p className="text-gray-400">
                            Rank higher in search results for your target keywords, attracting a continuous stream of high-intent visitors without paying for every click.
                        </p>
                    </div>
                    <div className="info-card">
                        <div className="info-card-icon"><Award /></div>
                        <h3 className="text-xl font-bold text-white mb-2">Build Brand Authority</h3>
                        <p className="text-gray-400">
                            Earning top search positions establishes your brand as a trusted leader in your industry, building credibility and user confidence.
                        </p>
                    </div>
                    <div className="info-card">
                        <div className="info-card-icon"><DollarSign /></div>
                        <h3 className="text-xl font-bold text-white mb-2">Exceptional ROI</h3>
                        <p className="text-gray-400">
                            SEO offers one of the highest returns on investment in digital marketing. An optimized site works for you 24/7, generating value long after the initial work is done.
                        </p>
                    </div>
                </div>
            </div>
            <style jsx>{`
                /* Optimized SEO Page Styles with Hardware Acceleration */
                .info-card {
                    background: rgba(30, 41, 59, 0.5);
                    border: 1px solid #374151;
                    border-radius: 16px;
                    padding: 2rem;
                    transition: all 0.3s ease;
                    backdrop-filter: blur(8px);
                    /* Hardware acceleration */
                    transform: translate3d(0, 0, 0);
                    will-change: transform, border-color;
                    backface-visibility: hidden;
                    contain: layout style paint;
                }
                .info-card:hover {
                    transform: translate3d(0, -5px, 0);
                    border-color: #B8FFFA;
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
                    /* Hardware acceleration */
                    transform: translate3d(0, 0, 0);
                    will-change: transform;
                    contain: strict;
                }

                /* Additional Performance Optimizations */
                * {
                    box-sizing: border-box;
                }
                
                .quantum-anim {
                    will-change: auto;
                    contain: layout style;
                }
                
                .section-title-enhanced {
                    will-change: auto;
                    contain: layout style;
                }
                
                .hero-section, .partner-section {
                    contain: layout style paint;
                }
            `}</style>
        </section>
    );
};

// AI-Powered SEO Section
const AIPoweredSEO = () => {
    const sectionRef = useQuantumScrollAnim();
    
    const aiFeatures = [
        {
            icon: <BrainCircuit className="w-8 h-8" />,
            title: "Answer Engine Optimization (AEO)",
            description: "Optimize your content to be featured in AI answer engines like ChatGPT, Perplexity, and Google's AI Overview, capturing traffic from conversational searches.",
            features: ["Featured in AI responses", "Conversational query targeting", "Answer-focused content structure"]
        },
        {
            icon: <Zap className="w-8 h-8" />,
            title: "Generative Engine Optimization (GEO)", 
            description: "Position your brand as the authoritative source that AI systems cite when generating responses, building trust and visibility in the AI-first search era.",
            features: ["AI citation optimization", "Source credibility building", "Generative search visibility"]
        },
        {
            icon: <Search className="w-8 h-8" />,
            title: "Traditional + AI Search Synergy",
            description: "Seamlessly blend traditional SEO with AI optimization strategies, ensuring your content performs across all search experiences and platforms.",
            features: ["Multi-platform optimization", "Cross-engine compatibility", "Future-proof strategy"]
        }
    ];

    return (
        <section 
            ref={sectionRef} 
            className="py-24 bg-gradient-to-b from-slate-900/30 to-slate-800/50 relative quantum-anim overflow-hidden"
            style={{ 
                willChange: 'transform',
                contain: 'layout style paint'
            }}
        >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(184,255,250,0.02)_0%,transparent_70%)]"></div>
            <div 
                className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
                style={{ contain: 'layout style' }}
            >
                <div 
                    className="text-center mb-16"
                    style={{ 
                        willChange: 'transform',
                        contain: 'layout style'
                    }}
                >
                    <div className="section-title-container">
                        <h2 
                            className="section-title-enhanced"
                            style={{ willChange: 'transform' }}
                        >
                            Next-Generation AI SEO
                        </h2>
                        <div className="title-accent-line"></div>
                    </div>
                    <p className="text-lg text-gray-400 max-w-4xl mx-auto">
                        As search evolves beyond traditional rankings, we're pioneering optimization for AI-powered search engines. Our cutting-edge AEO and GEO strategies ensure your content is discovered, cited, and recommended by the next generation of search technology.
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {aiFeatures.map((feature, index) => (
                        <div key={index} className="ai-feature-card">
                            <div className="feature-header">
                                <div className="feature-icon">{feature.icon}</div>
                                <h3 className="feature-title">{feature.title}</h3>
                            </div>
                            <p className="feature-description">{feature.description}</p>
                            <ul className="feature-list">
                                {feature.features.map((item, i) => (
                                    <li key={i} className="feature-item">
                                        <CheckCircle className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>


            </div>
            
            <style jsx>{`
                .ai-feature-card {
                    background: rgba(30, 41, 59, 0.4);
                    border: 1px solid #475569;
                    border-radius: 20px;
                    padding: 2.5rem;
                    transition: all 0.4s ease;
                    position: relative;
                    overflow: hidden;
                }
                
                .ai-feature-card::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    height: 3px;
                    background: linear-gradient(90deg, transparent, #06b6d4, #3b82f6, transparent);
                    opacity: 0;
                    transition: opacity 0.4s ease;
                }
                
                .ai-feature-card:hover {
                    transform: translateY(-8px);
                    border-color: #06b6d4;
                    background: rgba(30, 41, 59, 0.6);
                }
                
                .ai-feature-card:hover::before {
                    opacity: 1;
                }
                
                .feature-header {
                    text-align: center;
                    margin-bottom: 1.5rem;
                }
                
                .feature-icon {
                    width: 4rem;
                    height: 4rem;
                    background: rgba(6, 182, 212, 0.1);
                    border: 1px solid rgba(6, 182, 212, 0.2);
                    border-radius: 16px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #06b6d4;
                    margin: 0 auto 1.5rem auto;
                    transition: all 0.3s ease;
                }
                
                .ai-feature-card:hover .feature-icon {
                    background: rgba(6, 182, 212, 0.2);
                    border-color: #06b6d4;
                    transform: scale(1.1);
                }
                
                .feature-title {
                    font-size: 1.25rem;
                    font-weight: 700;
                    color: white;
                    margin: 0;
                    line-height: 1.3;
                }
                
                .feature-description {
                    color: #d1d5db;
                    line-height: 1.6;
                    margin: 0 0 1.5rem 0;
                    text-align: center;
                }
                
                .feature-list {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                }
                
                .feature-item {
                    display: flex;
                    align-items: flex-start;
                    gap: 0.75rem;
                    margin-bottom: 0.75rem;
                    color: #e5e7eb;
                    font-size: 0.875rem;
                    line-height: 1.5;
                }
                
                .feature-item:last-child {
                    margin-bottom: 0;
                }
            `}</style>
        </section>
    );
};

// SEO For Your Industry Section
const SEOForYourIndustry = () => {
    const sectionRef = useQuantumScrollAnim();
    const [activeVertical, setActiveVertical] = useState(null);

    const verticals = [
        { icon: <ShoppingCart />, name: "E-commerce & Retail", description: "Driving organic traffic to product pages and optimizing category architecture for maximum visibility and sales." },
        { icon: <HeartPulse />, name: "Health & Wellness", description: "Building trust and authority (E-E-A-T) to connect with patients seeking expert healthcare information and services." },
        { icon: <Building />, name: "Real Estate", description: "Dominating local search for property listings and generating qualified leads for agents and developers." },
        { icon: <Briefcase />, name: "B2B & SaaS", description: "Capturing high-value leads by ranking for problem-aware keywords and creating authoritative industry content." },
        { icon: <Plane />, name: "Travel & Tourism", description: "Inspiring bookings by ranking for destination keywords and creating compelling, discoverable travel content." },
        { icon: <Scale />, name: "Legal & Financial", description: "Establishing credibility and attracting high-value clients through targeted local SEO and expert content strategies." },
    ];

    return (
        <section 
            ref={sectionRef} 
            className="py-24 bg-slate-900/50 relative quantum-anim overflow-hidden"
            style={{ 
                willChange: 'transform',
                contain: 'layout style paint'
            }}
        >
            <div 
                className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
                style={{ contain: 'layout style' }}
            >
                <div 
                    className="text-center mb-16"
                    style={{ 
                        willChange: 'transform',
                        contain: 'layout style'
                    }}
                >
                    <div className="section-title-container">
                        <h2 
                            className="section-title-enhanced"
                            style={{ willChange: 'transform' }}
                        >
                            SEO For Your Industry
                        </h2>
                        <div className="title-accent-line"></div>
                    </div>
                    <p className="text-lg text-gray-400 max-w-3xl mx-auto">
                        Our SEO strategies are meticulously tailored to the unique challenges and opportunities of your vertical, ensuring relevant and impactful results.
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

// Total Search Strategy Section
const TotalSearchStrategy = () => {
    const sectionRef = useQuantumScrollAnim();
    
    const strategies = [
        {
            icon: <Search className="w-8 h-8" />,
            title: "Organic Foundation",
            description: "Build sustainable rankings through technical SEO, content optimization, and authority building that forms the cornerstone of your search presence."
        },
        {
            icon: <Target className="w-8 h-8" />,
            title: "Paid Amplification", 
            description: "Strategic paid search campaigns that capture immediate opportunities while your organic efforts gain momentum and market share."
        },
        {
            icon: <BrainCircuit className="w-8 h-8" />,
            title: "AI-Powered Integration",
            description: "Leverage data insights from both channels to optimize bidding, content creation, and keyword targeting for maximum efficiency."
        }
    ];

    return (
        <section 
            ref={sectionRef} 
            className="py-24 bg-gradient-to-b from-slate-800 to-slate-900 relative quantum-anim overflow-hidden"
            style={{ 
                willChange: 'transform',
                contain: 'layout style paint'
            }}
        >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(184,255,250,0.05)_0%,transparent_50%)]"></div>
            <div 
                className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
                style={{ contain: 'layout style' }}
            >
                <div 
                    className="text-center mb-16"
                    style={{ 
                        willChange: 'transform',
                        contain: 'layout style'
                    }}
                >
                    <div className="section-title-container">
                        <h2 
                            className="section-title-enhanced"
                            style={{ willChange: 'transform' }}
                        >
                            Total Search Strategy
                        </h2>
                        <div className="title-accent-line"></div>
                    </div>
                    <p className="text-lg text-gray-400 max-w-4xl mx-auto mb-8">
                        While competitors treat SEO and paid search as separate disciplines, we orchestrate them as a unified strategy. This holistic approach eliminates waste, accelerates growth, and delivers compound returns that isolated tactics cannot achieve.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {strategies.map((strategy, index) => (
                        <div key={index} className="total-search-card">
                            <div className="card-header">
                                <div className="strategy-icon">{strategy.icon}</div>
                                <h4 className="strategy-title">{strategy.title}</h4>
                            </div>
                            <p className="strategy-description">{strategy.description}</p>
                        </div>
                    ))}
                </div>


            </div>
            
            <style jsx>{`
                .total-search-card {
                    background: rgba(30, 41, 59, 0.4);
                    border: 1px solid #475569;
                    border-radius: 20px;
                    padding: 2.5rem;
                    transition: all 0.4s ease;
                    position: relative;
                    overflow: hidden;
                }
                
                .total-search-card::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    height: 2px;
                    background: linear-gradient(90deg, transparent, #B8FFFA, transparent);
                    opacity: 0;
                    transition: opacity 0.4s ease;
                }
                
                .total-search-card:hover {
                    transform: translateY(-8px);
                    border-color: #B8FFFA;
                    background: rgba(30, 41, 59, 0.6);
                }
                
                .total-search-card:hover::before {
                    opacity: 1;
                }
                
                .card-header {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    margin-bottom: 1.5rem;
                }
                
                .strategy-icon {
                    width: 4rem;
                    height: 4rem;
                    background: rgba(184, 255, 250, 0.1);
                    border: 1px solid rgba(184, 255, 250, 0.2);
                    border-radius: 16px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #B8FFFA;
                    margin-bottom: 1rem;
                    transition: all 0.3s ease;
                }
                
                .total-search-card:hover .strategy-icon {
                    background: rgba(184, 255, 250, 0.2);
                    border-color: #B8FFFA;
                    transform: scale(1.1);
                }
                
                .strategy-title {
                    font-size: 1.5rem;
                    font-weight: 700;
                    color: white;
                    text-align: center;
                    margin: 0;
                }
                
                .strategy-description {
                    color: #d1d5db;
                    line-height: 1.6;
                    text-align: center;
                    margin: 0;
                }
            `}</style>
        </section>
    );
};


// Optimized SEO Process Section with Hardware Acceleration
const SEOProcess = () => {
    const [activeStep, setActiveStep] = useState(null);
    const sectionRef = useQuantumScrollAnim();
    
    const processSteps = [
        { step: "01", title: "Technical SEO Audit", subtitle: "Building a Strong Foundation", description: "We conduct a comprehensive analysis of your website's technical health, covering traditional SEO factors and AI-readiness for modern search engines and generative AI platforms.", icon: <Code className="w-6 h-6" />, details: [ "Crawlability & Indexability Analysis", "Core Web Vitals Optimization", "Site Architecture Review", "Structured Data & AI Schema Implementation" ] },
        { step: "02", title: "Keyword & Content Strategy", subtitle: "Targeting All Search Experiences", description: "We develop strategies that capture both traditional search queries and conversational AI interactions, ensuring your content ranks across traditional and generative search engines.", icon: <FileText className="w-6 h-6" />, details: [ "Traditional & Conversational Keyword Research", "AEO Query Pattern Analysis", "Topic Cluster & Answer-Focused Content Planning", "Multi-Format Content Strategy" ] },
        { step: "03", title: "Content Optimization for All Engines", subtitle: "Traditional SEO + AEO/GEO", description: "We optimize content for both traditional search rankings and AI-powered answer engines, ensuring visibility across Google, ChatGPT, Perplexity, and emerging AI platforms.", icon: <TrendingUp className="w-6 h-6" />, details: [ "Answer-Optimized Content Structure", "Featured Snippet Targeting", "AI-Friendly Formatting", "Context-Rich Schema Markup" ] },
        { step: "04", title: "Authoritative Link Building", subtitle: "Earning Digital Authority", description: "We build your site's authority and trust signals through strategic, high-quality backlink acquisition that enhances credibility for both traditional and AI-powered search systems.", icon: <Link className="w-6 h-6" />, details: [ "Expert Source Link Building", "Digital PR & Authority Mentions", "AI-Cited Content Creation", "Cross-Platform Authority Building" ] },
        { step: "05", title: "Unified Performance Tracking", subtitle: "Measuring Holistic Success", description: "We track performance across traditional search rankings, AI answer citations, and integrated paid/organic metrics to provide comprehensive insights and ROI measurement.", icon: <BarChart className="w-6 h-6" />, details: [ "Traditional & AI Search Monitoring", "Answer Engine Citation Tracking", "Cross-Channel Performance Analysis", "Unified ROI Reporting" ] }
    ];

    return (
        <section 
            id="process" 
            ref={sectionRef} 
            className="py-24 quantum-process-section quantum-anim relative overflow-hidden"
            style={{ 
                willChange: 'transform',
                contain: 'layout style paint'
            }}
        >
            <div className="absolute inset-0 quantum-grid-animation"></div>
            
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                <div className="text-center mb-20">
                    <div className="section-title-container">
                        <h2 className="section-title-enhanced">
                            Our SEO Process
                        </h2>
                        <div className="title-accent-line"></div>
                    </div>
                    <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
                        A proven, transparent methodology for building sustainable search dominance.
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
                @keyframes fadeIn { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
                .expanded-title { font-size: 0.875rem; font-weight: 600; color: #9ca3af; margin: 0 0 0.75rem 0; text-transform: uppercase; letter-spacing: 0.05em; }
                .details-list { list-style: none; padding: 0; margin: 0; }
                .detail-item { display: flex; align-items: flex-start; gap: 0.75rem; margin-bottom: 0.5rem; color: #e5e7eb; font-size: 0.875rem; line-height: 1.5; animation: slideIn 0.3s ease-in-out both; }
                .detail-item:nth-child(1) { animation-delay: 0.1s; } .detail-item:nth-child(2) { animation-delay: 0.2s; } .detail-item:nth-child(3) { animation-delay: 0.3s; } .detail-item:nth-child(4) { animation-delay: 0.4s; }
                @keyframes slideIn { from { opacity: 0; transform: translateX(-20px); } to { opacity: 1; transform: translateX(0); } }
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

// Contact Section (Unchanged logic, minor text updates)
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
            const subject = encodeURIComponent(`New SEO Inquiry from ${formData.firstName} ${formData.lastName}`);
            const body = encodeURIComponent(`
Name: ${formData.firstName} ${formData.lastName}
Email: ${formData.email}
Company: ${formData.company}

Message:
${formData.message}
            `);
            
            // This will attempt to open the user's default mail client.
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
            console.error("Mailto link error:", error);
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
                        Ready to dominate the search results? Tell us about your goals and we'll architect your path to the top.
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
                                <label htmlFor="company" className="form-label">Company Website</label>
                                <input type="text" id="company" name="company" value={formData.company} onChange={handleInputChange} className="form-input" placeholder="www.yourcompany.com" />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="message" className="form-label">Message *</label>
                            <textarea id="message" name="message" value={formData.message} onChange={handleInputChange} required rows={6} className="form-textarea" placeholder="Tell us about your project, SEO goals, and how we can help you build your digital future..."></textarea>
                        </div>
                        <div className="form-submit">
                            <button type="submit" disabled={isSubmitting} className="neural-submit-button">
                                {isSubmitting ? (<><div className="submit-spinner"></div><span>Sending...</span></>) : (<><span>Send Message</span><MoveRight className="ml-3 transition-transform duration-300" /></>)}
                            </button>
                        </div>
                        {submitStatus === 'success' && (<div className="status-message success"><Mail className="w-5 h-5" /><span>Thank you! Your message has been prepared. Please complete sending it in your mail client.</span></div>)}
                        {submitStatus === 'error' && (<div className="status-message error"><X className="w-5 h-5" /><span>There was an error. Please try sending an email directly.</span></div>)}
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

// Main App Component for SEO Page
const SEOPage = () => {
    return (
        <Layout>
            <Head>
                <title>Expert SEO Services for Sustainable Growth | BYLT Media</title>
                <meta name="description" content="Dominate all search experiences with BYLT Media's comprehensive SEO services. We specialize in traditional SEO, AEO (Answer Engine Optimization), and GEO (Generative Engine Optimization) for AI-powered search platforms." />
                <link rel="icon" href="/favicon.ico" />
                <link rel="canonical" href="https://www.byltmedia.com/seo" />
                <meta name="robots" content="index, follow" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
            </Head>
            <GlobalStyles />
            
            <main>
                <SEOHero />
                <WhyInvestInSEO />
                <AIPoweredSEO />
                <SEOForYourIndustry />
                <TotalSearchStrategy />
                <SEOProcess />
                <NeuralContact />
            </main>
        </Layout>
    );
};

export default SEOPage;
