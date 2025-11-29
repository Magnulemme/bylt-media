import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Layout from '../components/layout';
import GlobalStyles from '../components/globalsyles';
import {
    Menu, X, Mail, Phone, MapPin, ChevronLeft, ChevronRight, Star, ChevronDown, MoveRight,
    Briefcase, Workflow, TrendingUp, Search, Code, BrainCircuit, Lightbulb, Construction,

    Rocket, BarChart, Clock, Target, DollarSign, CheckCircle, Award, Image as ImageIcon, ShoppingCart, Youtube,
    Building, HeartPulse, Car, Plane, ShoppingBag, Utensils, Scale, Zap, Link, FileText, Share2, Bot, Cpu, Database,
    Home, Heart, Activity, Trello, Eye, SearchCode, TestTube2, ArrowUpRight
} from 'lucide-react';
// Tree-shaken Three.js imports - only import what we actually use
import { 
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  Group,
  BoxGeometry,
  MeshStandardMaterial,
  Color,
  Mesh,
  BufferGeometry,
  Vector3,
  Float32BufferAttribute,
  PointsMaterial,
  AdditiveBlending,
  Points,
  CatmullRomCurve3,
  TubeGeometry,
  MeshBasicMaterial,
  AmbientLight,
  DirectionalLight,
  PointLight,
  Vector2,
  Clock as ThreeClock
} from 'three';


// --- OPTIMIZED CUSTOM HOOK FOR SCROLL ANIMATIONS ---
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


// --- V1.0: OPTIMIZED DATA ANALYTICS HERO ANIMATION ---
const DataAnalyticsHeroAnimation = () => {
    const mountRef = useRef(null);
    const animationFrameRef = useRef(null);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        const currentMount = mountRef.current;

        // --- Optimized Scene Setup ---
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
        camera.position.z = 100;

        // --- Optimized Bar Chart Grid (Reduced from 12x12 to 8x8) ---
        const BAR_COUNT = 8; // Reduced from 12 for ~55% fewer bars
        const barGrid = [];
        const barGroup = new Group();

        const barGeometry = new BoxGeometry(4, 1, 4);

        for (let i = 0; i < BAR_COUNT; i++) {
            for (let j = 0; j < BAR_COUNT; j++) {
                const material = new MeshStandardMaterial({
                    color: new Color().setHSL(0.5 + (i / BAR_COUNT) * 0.2, 0.7, 0.5),
                    metalness: 0.3,
                    roughness: 0.6,
                    transparent: true,
                    opacity: 0.8
                });
                const bar = new Mesh(barGeometry, material);
                bar.position.set(
                    (i - BAR_COUNT / 2) * 8,
                    0,
                    (j - BAR_COUNT / 2) * 8
                );
                barGrid.push(bar);
                barGroup.add(bar);
            }
        }
        scene.add(barGroup);
        barGroup.position.y = -40;

        // --- Optimized Floating Data Points (Reduced from 150 to 60) ---
        const DATA_POINT_COUNT = 60; // Reduced from 150 for ~60% fewer particles
        const dataPoints = [];
        const dataPointsGeometry = new BufferGeometry();
        const positions = [];
        const colors = [];

        for (let i = 0; i < DATA_POINT_COUNT; i++) {
            positions.push(
                (Math.random() - 0.5) * 200,
                (Math.random() - 0.5) * 150,
                (Math.random() - 0.5) * 150
            );
            const color = new Color().setHSL(Math.random() * 0.2 + 0.45, 1.0, 0.7);
            colors.push(color.r, color.g, color.b);

            dataPoints.push({
                velocity: new Vector3(
                    (Math.random() - 0.5) * 0.08, // Slightly reduced velocity
                    (Math.random() - 0.5) * 0.08,
                    (Math.random() - 0.5) * 0.08
                ),
                phase: Math.random() * Math.PI * 2
            });
        }
        dataPointsGeometry.setAttribute('position', new Float32BufferAttribute(positions, 3));
        dataPointsGeometry.setAttribute('color', new Float32BufferAttribute(colors, 3));
        const dataPointsMaterial = new PointsMaterial({
            size: 0.8,
            vertexColors: true,
            blending: AdditiveBlending,
            transparent: true,
            opacity: 0.7
        });
        const points = new Points(dataPointsGeometry, dataPointsMaterial);
        scene.add(points);


        // --- Optimized Information Flow Lines (Reduced from 8 to 5) ---
        const lineCount = 5; // Reduced from 8
        const flowLines = [];
        for (let i = 0; i < lineCount; i++) {
            const startPoint = new Vector3(
                (Math.random() - 0.5) * 150,
                (Math.random() - 0.5) * 100,
                (Math.random() - 0.5) * 100
            );
            const endPoint = new Vector3(
                (Math.random() - 0.5) * 150,
                (Math.random() - 0.5) * 100,
                (Math.random() - 0.5) * 100
            );
            const curve = new CatmullRomCurve3([
                startPoint,
                new Vector3().lerpVectors(startPoint, endPoint, 0.3).add(new Vector3((Math.random() - 0.5) * 50, (Math.random() - 0.5) * 50, (Math.random() - 0.5) * 50)),
                new Vector3().lerpVectors(startPoint, endPoint, 0.7).add(new Vector3((Math.random() - 0.5) * 50, (Math.random() - 0.5) * 50, (Math.random() - 0.5) * 50)),
                endPoint
            ]);
            const tubeGeometry = new TubeGeometry(curve, 32, 0.1, 8, false); // Reduced segments from 50 to 32
            const material = new MeshBasicMaterial({
                color: 0x68d391,
                transparent: true,
                opacity: 0,
                blending: AdditiveBlending
            });
            const mesh = new Mesh(tubeGeometry, material);
            scene.add(mesh);
            flowLines.push({
                mesh,
                timer: Math.random() * 100,
                speed: 0.5 + Math.random() * 0.5
            });
        }


        // --- Lighting ---
        const ambientLight = new AmbientLight(0x404040, 2);
        scene.add(ambientLight);
        const directionalLight = new DirectionalLight(0xB8FFFA, 1.5);
        directionalLight.position.set(50, 50, 50);
        scene.add(directionalLight);
        const pointLight = new PointLight(0x68d391, 3, 200);
        scene.add(pointLight);


        // --- Mouse Interaction ---
        const mouse = new Vector2();
        const target = new Vector2();
        const handleMouseMove = (event) => {
            target.x = (event.clientX / window.innerWidth) * 2 - 1;
            target.y = -(event.clientY / window.innerHeight) * 2 + 1;
        };
        window.addEventListener('mousemove', handleMouseMove);


        // --- Optimized Animation Loop with Performance Throttling ---
        let frameCount = 0;
        const clock = new ThreeClock();
        const animate = () => {
            animationFrameRef.current = requestAnimationFrame(animate);
            const elapsedTime = clock.getElapsedTime();
            frameCount++;

            // Hardware-accelerated mouse lerp
            mouse.lerp(target, 0.05);

            // Throttle expensive calculations (every 2 frames instead of every frame)
            if (frameCount % 2 === 0) {
                // Animate Bar Chart Grid with reduced calculations
                barGrid.forEach((bar, index) => {
                    const i = Math.floor(index / BAR_COUNT);
                    const j = index % BAR_COUNT;
                    const wave1 = Math.sin(elapsedTime * 1.2 + i * 0.3) * 8; // Reduced intensity
                    const wave2 = Math.cos(elapsedTime * 0.8 + j * 0.5) * 8; // Reduced intensity
                    const mouseEffect = Math.max(0, 1 - bar.position.distanceTo(new Vector3(mouse.x * 50, 0, -mouse.y * 50)) * 0.05);

                    const targetScaleY = Math.max(1, wave1 + wave2 + 20 * mouseEffect); // Reduced multiplier
                    bar.scale.y += (targetScaleY - bar.scale.y) * 0.05;
                    bar.position.y = bar.scale.y / 2 - 20;
                    bar.material.color.setHSL(0.5 + mouseEffect * 0.2, 0.7, 0.5 + mouseEffect * 0.3);
                    bar.material.opacity = 0.6 + mouseEffect * 0.4;
                });
            }

            // Animate Data Points with throttling
            if (frameCount % 3 === 0) { // Every 3rd frame for better performance
                const positions = points.geometry.attributes.position.array;
                for (let i = 0; i < DATA_POINT_COUNT; i++) {
                    const i3 = i * 3;
                    positions[i3] += dataPoints[i].velocity.x;
                    positions[i3 + 1] += dataPoints[i].velocity.y;
                    positions[i3 + 2] += dataPoints[i].velocity.z;

                    if (Math.abs(positions[i3]) > 100) dataPoints[i].velocity.x *= -1;
                    if (Math.abs(positions[i3 + 1]) > 75) dataPoints[i].velocity.y *= -1;
                    if (Math.abs(positions[i3 + 2]) > 75) dataPoints[i].velocity.z *= -1;
                }
                points.geometry.attributes.position.needsUpdate = true;
            }

            // Animate Flow Lines with reduced frequency
            if (frameCount % 4 === 0) { // Every 4th frame
                flowLines.forEach(line => {
                    line.timer += line.speed;
                    const progress = (line.timer % 100) / 100;
                    line.mesh.material.opacity = Math.sin(progress * Math.PI) * 0.5;
                    if (progress > 0.99) {
                        line.timer = Math.random() * 10;
                    }
                });
            }


            // Optimized Light Animation (reduced frequency)
            if (frameCount % 2 === 0) {
                pointLight.position.x = Math.sin(elapsedTime * 0.4) * 80; // Slightly reduced speed
                pointLight.position.z = Math.cos(elapsedTime * 0.4) * 80;
                pointLight.position.y = Math.cos(elapsedTime * 0.6) * 40;
            }

            // Hardware-accelerated Camera Movement
            scene.rotation.y += (mouse.x * 0.2 - scene.rotation.y) * 0.02;
            scene.rotation.x += (-mouse.y * 0.1 - scene.rotation.x) * 0.02;
            camera.position.z = 100 + Math.sin(elapsedTime * 0.3) * 8; // Reduced amplitude

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
            // Enhanced cleanup for better memory management
            scene.traverse(object => {
                if (object.isMesh || object.isPoints || object.isLine) {
                    if (object.geometry) object.geometry.dispose();
                    if (object.material) {
                        if (Array.isArray(object.material)) {
                            object.material.forEach(material => material.dispose());
                        } else {
                            object.material.dispose();
                        }
                    }
                }
            });
            renderer.dispose();
        };
    }, []);

    return <div ref={mountRef} className="absolute inset-0 z-0" />;
};


// Data Analytics Hero Section
const DataAnalyticsHero = () => {
    const [textIndex, setTextIndex] = useState(0);
    const texts = [
        "Unlock Data-Driven Insights",
        "Transform Data into Decisions",
        "Master Your Metrics"
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setTextIndex(prev => (prev + 1) % texts.length);
        }, 8000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden hero-section">
            <DataAnalyticsHeroAnimation />
            <div className="absolute inset-0 hero-overlay-1 z-10"></div>
            <div className="relative z-20 text-center text-white max-w-5xl mx-auto px-4">
                <div className="mb-8">
                    <div className="text-xs tracking-widest text-gray-400 mb-4 font-inter glitch-text">
                        BYLT.MEDIA // DATA & ANALYTICS SERVICES
                    </div>
                    <h1 className="text-6xl md:text-8xl font-bold mb-6 font-inter hero-title">
                        <span className="quantum-text" key={textIndex}>
                            {texts[textIndex]}
                        </span>
                    </h1>
                    <p className="text-lg md:text-xl mb-8 text-gray-200 max-w-4xl mx-auto hero-subtitle leading-relaxed">
                        We turn your raw data into a strategic asset. Our analytics services provide clear insights, measure what matters, and empower you to make smarter, faster business decisions.
                    </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center hero-cta">
                    <a href="/free-audit" className="quantum-button-hero">
                        <span>Get a Data Audit</span>
                    </a>
                    <a href="#process" className="hologram-button">
                        <span>Our Analytics Process</span>
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

// The Data-Driven Advantage Section
const TheDataAdvantage = () => {
    const sectionRef = useQuantumScrollAnim();
    return (
        <section ref={sectionRef} id="services" className="py-24 bg-slate-900/30 relative quantum-anim overflow-hidden">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <div className="section-title-container">
                        <h2 className="section-title-enhanced">The Data-Driven Advantage</h2>
                        <div className="title-accent-line"></div>
                    </div>
                    <p className="text-lg text-gray-400 max-w-3xl mx-auto">
                        Leverage the power of your data to gain a competitive edge, optimize performance, and drive sustainable growth with clarity and confidence.
                    </p>
                </div>
                <div className="grid md:grid-cols-3 gap-8 text-center">
                    <div className="info-card">
                        <div className="info-card-icon"><Eye /></div>
                        <h3 className="text-xl font-bold text-white mb-2">Clearer Insights</h3>
                        <p className="text-gray-400">
                            Go beyond surface-level numbers. We help you understand the 'why' behind your data to uncover opportunities and threats.
                        </p>
                    </div>
                    <div className="info-card">
                        <div className="info-card-icon"><TrendingUp /></div>
                        <h3 className="text-xl font-bold text-white mb-2">Improved ROI</h3>
                        <p className="text-gray-400">
                            Make marketing and operational decisions based on solid evidence, ensuring your budget is invested for maximum return.
                        </p>
                    </div>
                    <div className="info-card">
                        <div className="info-card-icon"><Target /></div>
                        <h3 className="text-xl font-bold text-white mb-2">Informed Decisions</h3>
                        <p className="text-gray-400">
                            Equip your team with accurate, timely data and intuitive dashboards to foster a culture of confident, data-led decision-making.
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

// Our Data & Analytics Services Section
const OurDataServices = () => {
    const sectionRef = useQuantumScrollAnim();
    const services = [
        { icon: <Activity />, name: "Measurement & Implementation", description: "We ensure your analytics are set up correctly from the ground up, providing a solid foundation for trustworthy data collection across all platforms." },
        { icon: <Trello />, name: "Data Visualisation & Dashboards", description: "We transform complex datasets into interactive, easy-to-understand dashboards that provide real-time insights for your key stakeholders." },
        { icon: <TestTube2 />, name: "Conversion Rate Optimisation (CRO)", description: "Using data-driven testing and analysis, we identify and eliminate friction points in your user journeys to significantly boost conversion rates." },
        { icon: <SearchCode />, name: "Analytics & Data Audits", description: "A comprehensive review of your current data strategy and setup to identify gaps, opportunities, and ensure data integrity." },
        { icon: <Database />, name: "Data Warehousing & ETL", description: "We centralize your data from disparate sources into a single source of truth, enabling more advanced analysis and reporting." },
        { icon: <BrainCircuit />, name: "Predictive Analytics & Forecasting", description: "Leverage machine learning models to forecast trends, predict customer behavior, and make proactive business decisions." },
    ];

    return (
        <section ref={sectionRef} className="py-24 bg-slate-900/50 relative quantum-anim overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <div className="section-title-container">
                        <h2 className="section-title-enhanced">Our Data & Analytics Services</h2>
                        <div className="title-accent-line"></div>
                    </div>
                    <p className="text-lg text-gray-400 max-w-3xl mx-auto">
                        A complete suite of services designed to manage your data lifecycle, from initial collection to advanced, actionable insights.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <div key={index} className="solution-card">
                            <div className="solution-icon">{service.icon}</div>
                            <h3 className="solution-name">{service.name}</h3>
                            <p className="solution-description">{service.description}</p>
                        </div>
                    ))}
                </div>
            </div>
            <style jsx>{`
                .solution-card { 
                    background: rgba(30, 41, 59, 0.5); 
                    border: 1px solid #374151; 
                    border-radius: 16px; 
                    padding: 2rem; 
                    text-align: center; 
                    transition: all 0.3s ease; 
                    position: relative; 
                    overflow: hidden;
                    transform: translateZ(0); /* Hardware acceleration */
                    will-change: transform, border-color;
                    contain: layout style paint;
                }
                .solution-card::before { 
                    content: ''; 
                    position: absolute; 
                    top: 50%; 
                    left: 50%; 
                    width: 0; 
                    height: 0; 
                    background: radial-gradient(circle, rgba(184, 255, 250, 0.1) 0%, transparent 70%); 
                    border-radius: 50%; 
                    transform: translate3d(-50%, -50%, 0); /* Hardware-accelerated transform */
                    transition: width 0.4s ease, height 0.4s ease; 
                    will-change: width, height;
                }
                .solution-card:hover { 
                    transform: translate3d(0, -8px, 0); /* Hardware-accelerated transform */
                    border-color: #B8FFFA; 
                }
                .solution-card:hover::before { width: 300px; height: 300px; }
                .solution-icon { 
                    font-size: 2.5rem; 
                    color: #B8FFFA; 
                    margin: 0 auto 1.5rem auto; 
                    transition: color 0.3s ease; 
                    position: relative; 
                    z-index: 1; 
                    display: flex; 
                    align-items: center; 
                    justify-content: center; 
                    width: 4rem; 
                    height: 4rem;
                    transform: translateZ(0); /* Hardware acceleration */
                    will-change: transform, color;
                }
                .solution-name { 
                    font-weight: 700; 
                    color: white; 
                    font-size: 1.25rem; 
                    margin-bottom: 1rem; 
                    position: relative; 
                    z-index: 1; 
                }
                .solution-description { 
                    color: #cbd5e1; 
                    line-height: 1.6; 
                    position: relative; 
                    z-index: 1; 
                }
            `}</style>
        </section>
    );
};


// Our Analytics Process Section (Updated to Match Other Pages)
const OurAnalyticsProcess = () => {
    const [activeStep, setActiveStep] = useState(null);
    const sectionRef = useQuantumScrollAnim();
    
    const processSteps = [
        { 
            step: "01", 
            title: "Audit & Strategy", 
            subtitle: "Understanding Your Data Landscape", 
            description: "We start by understanding your business objectives and auditing your existing data ecosystem. This allows us to build a robust measurement strategy that aligns with your goals and KPIs.", 
            icon: <Search className="w-6 h-6" />, 
            details: [ 
                "Stakeholder Interviews & Goal Alignment", 
                "Technical Audit of Current Analytics Setup", 
                "KPI & Metrics Definition Workshop", 
                "Data Strategy & Measurement Plan Creation" 
            ] 
        },
        { 
            step: "02", 
            title: "Implementation & Tracking", 
            subtitle: "Building Your Data Foundation", 
            description: "We deploy a solid and scalable tracking setup using enterprise-grade tools. This ensures clean, reliable data collection from all your digital touchpoints, creating a single source of truth.", 
            icon: <Code className="w-6 h-6" />, 
            details: [ 
                "Google Tag Manager Implementation", 
                "Event & Conversion Tracking Setup", 
                "Cross-Domain & Mobile App Integration", 
                "Data Layer Architecture & Testing" 
            ] 
        },
        { 
            step: "03", 
            title: "Insight & Reporting", 
            subtitle: "Transforming Data into Stories", 
            description: "Data is useless without understanding. We create intuitive dashboards and deliver regular, insightful reports that don't just show numbers, but tell a story and highlight actionable opportunities.", 
            icon: <BarChart className="w-6 h-6" />, 
            details: [ 
                "Custom Dashboard Development", 
                "Automated Performance Reports", 
                "Deep-Dive Analysis & Attribution Modeling", 
                "Executive Summary & Action Plans" 
            ] 
        },
        { 
            step: "04", 
            title: "Testing & Optimization", 
            subtitle: "Continuous Improvement Through Data", 
            description: "We use the insights gathered to form hypotheses and run controlled experiments. This data-driven approach allows us to continually optimize your user experience and improve conversion rates.", 
            icon: <TestTube2 className="w-6 h-6" />, 
            details: [ 
                "A/B & Multivariate Testing", 
                "User Behavior Analysis & Heatmaps", 
                "Personalization Strategy Development", 
                "Conversion Funnel Optimization" 
            ] 
        },
        { 
            step: "05", 
            title: "Scale & Evolve", 
            subtitle: "Growing Your Data Capabilities", 
            description: "As your business grows, so should your data capabilities. We help you scale your analytics infrastructure and evolve your measurement strategy to meet new challenges and opportunities.", 
            icon: <TrendingUp className="w-6 h-6" />, 
            details: [ 
                "Advanced Analytics Implementation", 
                "Predictive Modeling & Forecasting", 
                "Team Training & Knowledge Transfer", 
                "Data Governance & Quality Assurance" 
            ] 
        }
    ];

    return (
        <section id="process" ref={sectionRef} className="py-24 quantum-process-section quantum-anim relative overflow-hidden">
            <div className="absolute inset-0 quantum-grid-animation"></div>
            
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                <div className="text-center mb-20">
                    <div className="section-title-container">
                        <h2 className="section-title-enhanced">
                            Our Analytics Process
                        </h2>
                        <div className="title-accent-line"></div>
                    </div>
                    <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
                        Our proven, five-step process ensures that your data becomes your most powerful asset for growth.
                    </p>
                </div>
                
                <div className="process-timeline">
                    {processSteps.map((step, index) => {
                        const isActive = activeStep === step.step;
                        return (
                            <div key={step.step} className={`process-step ${isActive ? 'active' : ''}`}>
                                <div className="step-container">
                                    <div className="step-number" onClick={() => setActiveStep(isActive ? null : step.step)}>
                                        {step.step}
                                    </div>
                                    <div className="step-card" onClick={() => setActiveStep(isActive ? null : step.step)}>
                                        <div className="step-header">
                                            <div className="step-icon-wrapper">{step.icon}</div>
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


// Contact Section (Updated for Data Analytics)
const DataContact = () => {
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
            const subject = encodeURIComponent(`New Data & Analytics Inquiry from ${formData.firstName} ${formData.lastName}`);
            const body = encodeURIComponent(`
Name: ${formData.firstName} ${formData.lastName}
Email: ${formData.email}
Company: ${formData.company}

Message:
${formData.message}
            `);
            window.location.href = `mailto:info@bookedupmedia.com?subject=${subject}&body=${body}`;
            setSubmitStatus('success');
            setFormData({ firstName: '', lastName: '', email: '', company: '', message: '' });
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
                        <h2 className="section-title-enhanced">Start Your Data Journey</h2>
                        <div className="title-accent-line"></div>
                    </div>
                    <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                        Ready to make data your competitive advantage? Tell us about your challenges, and we'll outline a plan to unlock your data's potential.
                    </p>
                </div>
                <div className="contact-form-container">
                    <form onSubmit={handleSubmit} className="contact-form">
                        <div className="form-grid">
                            <div className="form-group"><label htmlFor="firstName" className="form-label">First Name *</label><input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleInputChange} required className="form-input" placeholder="Enter your first name" /></div>
                            <div className="form-group"><label htmlFor="lastName" className="form-label">Last Name *</label><input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleInputChange} required className="form-input" placeholder="Enter your last name" /></div>
                            <div className="form-group"><label htmlFor="email" className="form-label">Email Address *</label><input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required className="form-input" placeholder="your.email@company.com" /></div>
                            <div className="form-group"><label htmlFor="company" className="form-label">Company</label><input type="text" id="company" name="company" value={formData.company} onChange={handleInputChange} className="form-input" placeholder="Your company name" /></div>
                        </div>
                        <div className="form-group"><label htmlFor="message" className="form-label">Message *</label><textarea id="message" name="message" value={formData.message} onChange={handleInputChange} required rows={6} className="form-textarea" placeholder="Tell us about your current analytics setup, business goals, and biggest data challenges..."></textarea></div>
                        <div className="form-submit">
                            <button type="submit" disabled={isSubmitting} className="neural-submit-button">
                                {isSubmitting ? (<><div className="submit-spinner"></div><span>Sending...</span></>) : (<><span>Request a Consultation</span><MoveRight className="ml-3 transition-transform duration-300" /></>)}
                            </button>
                        </div>
                        {submitStatus === 'success' && (<div className="status-message success"><Mail className="w-5 h-5" /><span>Thank you! Your message has been prepared. Please complete sending it in your mail client.</span></div>)}
                        {submitStatus === 'error' && (<div className="status-message error"><X className="w-5 h-5" /><span>There was an error. Please try sending an email directly.</span></div>)}
                    </form>
                </div>
                <div className="contact-details">
                    <div className="contact-detail-item"><Mail className="w-5 h-5 text-gray-400" /><span>info@bookedupmedia.com</span></div>
                    <div className="contact-detail-item"><Clock className="w-5 h-5 text-gray-400" /><span>Data Inquiries Welcome 24/7</span></div>
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


// Main App Component for Data Analytics Page
const DataAnalyticsPage = () => {
    return (
        <Layout>
            <Head>
                <title>Data & Analytics Services | BYLT Media</title>
                <meta name="description" content="Transform your business with data-driven insights. Our data and analytics services help you measure performance, understand customers, and make smarter decisions." />
                <link rel="icon" href="/favicon.ico" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
            </Head>
            <GlobalStyles />

            <main>
                <DataAnalyticsHero />
                <TheDataAdvantage />
                <OurDataServices />
                <OurAnalyticsProcess />
                <DataContact />
            </main>
        </Layout>
    );
};

export default DataAnalyticsPage;