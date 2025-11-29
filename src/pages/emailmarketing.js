import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Layout from '../components/layout';
import GlobalStyles from '../components/globalsyles';
import {
    Menu, X, Mail, Phone, MapPin, ChevronLeft, ChevronRight, Star, ChevronDown, MoveRight,
    Briefcase, Workflow, TrendingUp, Search, Code, BrainCircuit, Lightbulb, Construction,
    Rocket, BarChart, Clock, Target, DollarSign, CheckCircle, Award, Image as ImageIcon, ShoppingCart, Youtube,
    Building, HeartPulse, Car, Plane, ShoppingBag, Utensils, Scale, Zap, Link, FileText, Share2, Bot, Cpu, Database,
    Home, Heart, Activity, Trello, Eye, SearchCode, TestTube2, ArrowUpRight, Atom, MessageSquare, Camera, Users, Palette, PenTool
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
  Clock as ThreeClock
} from 'three';

// --- CUSTOM HOOK FOR SCROLL ANIMATIONS (Enhanced for Performance) ---
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

// --- V1.0: NEW EMAIL MARKETING HERO ANIMATION ---
const EmailMarketingHeroAnimation = () => {
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
        camera.position.z = 20;

        const icons = [];
        const iconTextures = {};
        
        // Load textures from emoji folder
        const textureLoader = new TextureLoader();
        iconTextures.email = textureLoader.load('/images/emojis/email.png');
        
        const createIcon = () => {
            // Create a plane geometry for the emoji - smaller size
            const geometry = new PlaneGeometry(1.2, 1.2);
            const material = new MeshBasicMaterial({
                map: iconTextures.email,
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
                targetOpacity: 0.4 + Math.random() * 0.4,
            };

            return mesh;
        };

        // --- Initialization (Reduced count for performance) ---
        for (let i = 0; i < 30; i++) { // Reduced from 75 to 30 icons (~60% reduction)
            const icon = createIcon();

            icon.position.set(
                (Math.random() - 0.5) * 90,
                (Math.random() - 0.5) * 70,
                (Math.random() - 0.5) * 90
            );
            icon.rotation.set(
                Math.random() * Math.PI,
                Math.random() * Math.PI,
                Math.random() * Math.PI
            );
            // Bigger icons - increased to 0.8-1.5 range for better visibility
            icon.scale.setScalar(0.8 + Math.random() * 0.7);
            icon.userData.origin = icon.position.clone();
            
            icons.push(icon);
            scene.add(icon);
        }

        // --- Atmospheric Particles (Reduced for performance) ---
        const particleGeom = new BufferGeometry();
        const particleCount = 800; // Reduced from 2000 to 800 (~60% reduction)
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

        // --- Animation Loop ---
        const clock = new ThreeClock();
        const animate = () => {
            requestAnimationFrame(animate);
            const elapsedTime = clock.getElapsedTime();

            mouse.lerp(target, 0.02);

            icons.forEach(icon => {
                const { userData } = icon;
                if (icon.material.opacity < userData.targetOpacity) {
                    icon.material.opacity += 0.003;
                }

                icon.position.x = userData.origin.x + Math.cos(elapsedTime * userData.animSpeed.x + userData.animOffset) * 1.5;
                icon.position.y = userData.origin.y + Math.sin(elapsedTime * userData.animSpeed.y + userData.animOffset) * 2;
                icon.position.z = userData.origin.z + Math.sin(elapsedTime * userData.animSpeed.z + userData.animOffset) * 1.5;
                
                icon.rotation.x += 0.001;
                icon.rotation.y += 0.002;
            });
            
            particles.rotation.y = elapsedTime * 0.01;
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

        // --- Cleanup ---
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


// Email Marketing Hero Section
const EmailMarketingHero = () => {
    const [textIndex, setTextIndex] = useState(0);
    const texts = [
        "Drive Engagement & Revenue",
        "Craft Campaigns That Convert",
        "Build Lasting Relationships"
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setTextIndex(prev => (prev + 1) % texts.length);
        }, 9000); // Increased from 8000ms to 9000ms for better performance
        return () => clearInterval(interval);
    }, []);

    return (
        <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden hero-section">
            <EmailMarketingHeroAnimation />
            <div className="absolute inset-0 hero-overlay-1 z-10"></div>
            <div className="relative z-20 text-center text-white max-w-5xl mx-auto px-4">
                <div className="mb-8">
                    <div className="text-xs tracking-widest text-gray-400 mb-4 font-inter glitch-text">
                        BYLT.MEDIA // EMAIL MARKETING SERVICES
                    </div>
                    <h1 className="text-6xl md:text-8xl font-bold mb-6 font-inter hero-title">
                        <span className="quantum-text" key={textIndex}>
                            {texts[textIndex]}
                        </span>
                    </h1>
                    <p className="text-lg md:text-xl mb-8 text-gray-200 max-w-4xl mx-auto hero-subtitle leading-relaxed">
                        We create strategic email marketing campaigns that captivate your audience, nurture leads, and drive measurable results directly to your bottom line.
                    </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center hero-cta">
                    <a href="#contact" className="quantum-button-hero">
                        <span>Plan Your Campaign</span>
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

// The Email Advantage Section
const TheEmailAdvantage = () => {
    const sectionRef = useQuantumScrollAnim();
    return (
        <section ref={sectionRef} id="services" className="py-24 bg-slate-900/30 relative quantum-anim overflow-hidden">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <div className="section-title-container">
                        <h2 className="section-title-enhanced">The Email Advantage</h2>
                        <div className="title-accent-line"></div>
                    </div>
                    <p className="text-lg text-gray-400 max-w-3xl mx-auto">
                        In a world of algorithms and ads, email provides a direct, powerful connection to your audience. We help you leverage it for unparalleled engagement and ROI.
                    </p>
                </div>
                <div className="grid md:grid-cols-3 gap-8 text-center">
                    <div className="info-card">
                        <div className="info-card-icon"><Link /></div>
                        <h3 className="text-xl font-bold text-white mb-2">Direct Audience Access</h3>
                        <p className="text-gray-400">
                            Communicate directly with your customers in a space you own, free from the noise and unpredictability of social media algorithms.
                        </p>
                    </div>
                    <div className="info-card">
                        <div className="info-card-icon"><DollarSign /></div>
                        <h3 className="text-xl font-bold text-white mb-2">Exceptional ROI</h3>
                        <p className="text-gray-400">
                            Benefit from one of the most cost-effective marketing channels, delivering consistently high returns on investment when executed correctly.
                        </p>
                    </div>
                    <div className="info-card">
                        <div className="info-card-icon"><Target /></div>
                        <h3 className="text-xl font-bold text-white mb-2">Personalized Communication</h3>
                        <p className="text-gray-400">
                            Utilise data and segmentation to deliver highly targeted, relevant messages that resonate with individuals and drive action.
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


// Our Email Marketing Services Section
const OurEmailMarketingServices = () => {
    const sectionRef = useQuantumScrollAnim();
    const services = [
        { icon: <Briefcase />, name: "Campaign Strategy & Management", description: "We develop a comprehensive email strategy aligned with your business goals and manage your campaigns from concept to execution." },
        { icon: <Zap />, name: "Email Automation & Workflows", description: "Build sophisticated automated journeys—from welcome series to cart abandonment—that nurture leads and customers 24/7." },
        { icon: <Palette />, name: "Template Design & Development", description: "Our team designs and codes beautiful, responsive, and high-converting email templates that look great in every inbox." },
        { icon: <Users />, name: "List Growth & Segmentation", description: "Grow your most valuable asset. We implement strategies to attract new subscribers and segment your audience for targeted messaging." },
        { icon: <TestTube2 />, name: "A/B Testing & Optimisation", description: "Continuously improve your results by systematically testing subject lines, content, CTAs, and send times to see what works best." },
        { icon: <BarChart />, name: "Reporting & Analytics", description: "We provide clear, actionable reports on your campaign performance, focusing on the metrics that matter for your business growth." },
    ];

    return (
        <section ref={sectionRef} className="py-24 bg-slate-900/50 relative quantum-anim overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <div className="section-title-container">
                        <h2 className="section-title-enhanced">Our Email Marketing Services</h2>
                        <div className="title-accent-line"></div>
                    </div>
                    <p className="text-lg text-gray-400 max-w-3xl mx-auto">
                        A full-service approach to email marketing, covering everything from high-level strategy to the fine details of execution and analysis.
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

// Our Email Marketing Process Section
const EmailMarketingProcess = () => {
    const [activeStep, setActiveStep] = useState(null);
    const sectionRef = useQuantumScrollAnim();
    
    const processSteps = [
        { step: "01", title: "Strategy & Planning", subtitle: "Defining Your Roadmap", description: "We begin by understanding your audience, goals, and competitive landscape to build a tailored email marketing strategy and content calendar.", icon: <Search className="w-6 h-6" />, details: [ "Audience analysis & persona development", "Goal setting and KPI definition", "Content calendar planning", "Platform & tools audit" ] },
        { step: "02", title: "Content & Design", subtitle: "Crafting the Message", description: "Our team writes compelling copy and designs stunning, on-brand email templates that are optimized for engagement and conversion on all devices.", icon: <PenTool className="w-6 h-6" />, details: [ "Copywriting and content creation", "Responsive email template design", "Call-to-Action (CTA) strategy", "Brand consistency checks" ] },
        { step: "03", title: "Build & Automate", subtitle: "Engineering Your Campaigns", description: "We set up your campaigns, segment your lists, and build out powerful automation sequences to ensure the right message reaches the right person at the right time.", icon: <Code className="w-6 h-6" />, details: [ "Campaign setup in ESP", "Audience segmentation", "Automation workflow construction", "Dynamic content implementation" ] },
        { step: "04", title: "Launch & Optimise", subtitle: "Sending and Improving", description: "Before sending, we conduct rigorous testing. After launch, we monitor performance closely and run A/B tests to continuously optimize your results.", icon: <Rocket className="w-6 h-6" />, details: [ "Pre-send quality assurance checklist", "A/B testing (subject lines, content etc.)", "Send time optimization", "Deliverability monitoring" ] },
        { step: "05", title: "Analysis & Reporting", subtitle: "Measuring Success", description: "We analyse campaign performance against your KPIs and provide clear, insightful reports that show your ROI and inform future strategy.", icon: <TrendingUp className="w-6 h-6" />, details: [ "Performance dashboard setup", "Monthly & quarterly reporting", "Actionable insights & recommendations", "Strategic review meetings" ] }
    ];

    return (
        <section id="process" ref={sectionRef} className="py-24 quantum-process-section quantum-anim relative overflow-hidden">
            <div className="absolute inset-0 quantum-grid-animation"></div>
            
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                <div className="text-center mb-20">
                    <div className="section-title-container">
                        <h2 className="section-title-enhanced">
                            Our Email Marketing Process
                        </h2>
                        <div className="title-accent-line"></div>
                    </div>
                    <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
                        Our methodical, five-step process ensures every campaign is strategic, well-executed, and optimized for maximum impact.
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
                .step-card { 
                    flex: 1; 
                    background: rgba(30, 41, 59, 0.5); 
                    border: 1px solid #374151; 
                    border-radius: 16px; 
                    padding: 1.5rem; 
                    cursor: pointer; 
                    transition: all 0.3s ease; 
                    backdrop-filter: blur(8px);
                    transform: translateZ(0); /* Hardware acceleration */
                    will-change: transform, border-color, box-shadow;
                    contain: layout style paint;
                }
                .process-step.active .step-card, .step-card:hover { 
                    border-color: #B8FFFA; 
                    transform: translate3d(0, -3px, 0); /* Hardware-accelerated transform */
                    box-shadow: 0 8px 25px rgba(184, 255, 250, 0.1);
                }
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

// Contact Section (Updated for Email Marketing)
const EmailMarketingContact = () => {
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
            const subject = encodeURIComponent(`New Email Marketing Inquiry from ${formData.firstName} ${formData.lastName}`);
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
                        <h2 className="section-title-enhanced">Elevate Your Email Marketing</h2>
                        <div className="title-accent-line"></div>
                    </div>
                    <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                        Ready to turn your email list into a revenue-generating machine? Let's talk about your goals and how we can help you achieve them.
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
                        <div className="form-group"><label htmlFor="message" className="form-label">Message *</label><textarea id="message" name="message" value={formData.message} onChange={handleInputChange} required rows={6} className="form-textarea" placeholder="Tell us about your current email marketing efforts, your audience, and your primary objectives..."></textarea></div>
                        <div className="form-submit">
                            <button type="submit" disabled={isSubmitting} className="neural-submit-button">
                                {isSubmitting ? (<><div className="submit-spinner"></div><span>Sending...</span></>) : (<><span>Get a Free Consultation</span><MoveRight className="ml-3 transition-transform duration-300" /></>)}
                            </button>
                        </div>
                        {submitStatus === 'success' && (<div className="status-message success"><Mail className="w-5 h-5" /><span>Thank you! Your message has been prepared. Please complete sending it in your mail client.</span></div>)}
                        {submitStatus === 'error' && (<div className="status-message error"><X className="w-5 h-5" /><span>There was an error. Please try sending an email directly.</span></div>)}
                    </form>
                </div>
                <div className="contact-details">
                    <div className="contact-detail-item"><Mail className="w-5 h-5 text-gray-400" /><span>info@bookedupmedia.com</span></div>
                    <div className="contact-detail-item"><Clock className="w-5 h-5 text-gray-400" /><span>Inbox Open 24/7</span></div>
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
                .neural-submit-button { 
                    position: relative; 
                    display: inline-flex; 
                    align-items: center; 
                    justify-content: center; 
                    padding: 1.25rem 2.5rem; 
                    font-weight: 700; 
                    font-size: 1.125rem; 
                    color: #1e293b; 
                    background: #B8FFFA; 
                    border: none; 
                    border-radius: 15px; 
                    font-family: 'Inter', sans-serif; 
                    text-decoration: none; 
                    transition: all 0.4s ease; 
                    cursor: pointer; 
                    min-width: 180px;
                    transform: translateZ(0); /* Hardware acceleration */
                    will-change: transform, background, box-shadow;
                }
                .neural-submit-button:hover:not(:disabled) { 
                    transform: translate3d(0, -3px, 0) scale(1.05); /* Hardware-accelerated transform */
                    box-shadow: 0 10px 30px rgba(184, 255, 250, 0.3); 
                    background: #9DFFF8; 
                }
                .neural-submit-button:disabled { 
                    opacity: 0.7; 
                    cursor: not-allowed; 
                    transform: translateZ(0); /* Maintain hardware acceleration */
                }
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


// Main App Component for Email Marketing Page
const EmailMarketingPage = () => {
    return (
        <Layout>
            <Head>
                <title>Email Marketing Services | BYLT Media</title>
                <meta name="description" content="Drive engagement, nurture leads, and increase revenue with our expert email marketing and automation services." />
                <link rel="icon" href="/favicon.ico" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
            </Head>
            <GlobalStyles />

            <main>
                <EmailMarketingHero />
                <TheEmailAdvantage />
                <OurEmailMarketingServices />
                <EmailMarketingProcess />
                <EmailMarketingContact />
            </main>
        </Layout>
    );
};

export default EmailMarketingPage;
