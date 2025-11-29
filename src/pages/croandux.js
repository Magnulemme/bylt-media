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
  MeshBasicMaterial,
  CylinderGeometry,
  Mesh,
  BufferGeometry,
  PointsMaterial,
  AdditiveBlending,
  Color,
  Vector3,
  BufferAttribute,
  Points,
  Vector2
} from 'three';

// --- V12.1: ENHANCED COPY & NISSAN CASE STUDY ---

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

// CRO & UX FUNNEL HEADER ANIMATION (Unchanged)
const CROHeroAnimation = () => {
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
        camera.position.z = 80;

        // --- Funnel Geometry ---
        const funnelMaterial = new MeshBasicMaterial({
            color: 0xB8FFFA,
            wireframe: true,
            transparent: true,
            opacity: 0.15
        });
        const funnelGeometry = new CylinderGeometry(30, 5, 80, 32, 10, true);
        const funnel = new Mesh(funnelGeometry, funnelMaterial);
        funnel.rotation.x = Math.PI / 12;
        scene.add(funnel);

        // --- Particle System (Reduced for performance) ---
        const PARTICLE_COUNT = 120; // Reduced from 300 to 120 (~60% reduction)
        const particles = [];
        const particleGeometry = new BufferGeometry();
        const particlePositions = new Float32Array(PARTICLE_COUNT * 3);

        const particleMaterial = new PointsMaterial({
            color: 0xFFFFFF,
            size: 1,
            blending: AdditiveBlending,
            transparent: true,
            depthWrite: false,
            vertexColors: true
        });
        
        const colors = new Float32Array(PARTICLE_COUNT * 3);
        const convertedColor = new Color(0x0099FF); // Blue for converted (changed from green)
        const droppedColor = new Color(0x0099FF); // Blue for dropped (changed from red)
        const defaultColor = new Color(0xB8FFFA); // Default teal

        const resetParticle = (i) => {
            const x = (Math.random() - 0.5) * 60;
            const z = (Math.random() - 0.5) * 60;
            const y = 50 + Math.random() * 10;

            particles[i] = {
                position: new Vector3(x, y, z),
                velocity: new Vector3(0, -0.2 - Math.random() * 0.2, 0),
                state: 'entering' // entering, converting, dropped
            };
            
            particlePositions[i * 3] = x;
            particlePositions[i * 3 + 1] = y;
            particlePositions[i * 3 + 2] = z;
            
            defaultColor.toArray(colors, i * 3);
        };

        for (let i = 0; i < PARTICLE_COUNT; i++) {
            resetParticle(i);
        }

        particleGeometry.setAttribute('position', new BufferAttribute(particlePositions, 3));
        particleGeometry.setAttribute('color', new BufferAttribute(colors, 3));
        const particleSystem = new Points(particleGeometry, particleMaterial);
        scene.add(particleSystem);
        
        // --- Mouse Interaction ---
        const mouse = new Vector2();
        const target = new Vector2();
        const handleMouseMove = (event) => {
            target.x = (event.clientX / window.innerWidth) * 2 - 1;
            target.y = -(event.clientY / window.innerHeight) * 2 + 1;
        };
        window.addEventListener('mousemove', handleMouseMove);

        // --- Animation Loop ---
        const animate = () => {
            requestAnimationFrame(animate);

            mouse.lerp(target, 0.05);

            for (let i = 0; i < PARTICLE_COUNT; i++) {
                const p = particles[i];
                p.position.add(p.velocity);

                const funnelRadiusAtY = ((p.position.y + 40) / 80) * (30 - 5) + 5;
                const distanceFromCenter = Math.sqrt(p.position.x * p.position.x + p.position.z * p.position.z);

                // Particle logic
                if (p.state === 'entering' && distanceFromCenter > funnelRadiusAtY) {
                    p.state = 'dropped';
                    p.velocity.x = (Math.random() - 0.5) * 0.5;
                    p.velocity.z = (Math.random() - 0.5) * 0.5;
                    p.velocity.y *= 0.5;
                    droppedColor.toArray(colors, i * 3);
                }

                if (p.position.y < -40) {
                    if(p.state === 'entering') {
                       p.state = 'converted';
                       convertedColor.toArray(colors, i * 3);
                    }
                    if (p.position.y < -60) {
                       resetParticle(i);
                    }
                }

                particlePositions[i * 3] = p.position.x;
                particlePositions[i * 3 + 1] = p.position.y;
                particlePositions[i * 3 + 2] = p.position.z;
            }

            particleGeometry.attributes.position.needsUpdate = true;
            particleGeometry.attributes.color.needsUpdate = true;
            
            funnel.rotation.y += 0.001;
            scene.rotation.y += (mouse.x * 0.2 - scene.rotation.y) * 0.02;
            scene.rotation.x += (-mouse.y * 0.2 - scene.rotation.x) * 0.02;

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


// CRO & UX Hero Section (Unchanged)
const CROHero = () => {
  const [textIndex, setTextIndex] = useState(0);
  const texts = [
    "Boost Conversion Rates",
    "Enhance User Experience",
    "Data-Driven Design",
    "Maximise Website Revenue"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex(prev => (prev + 1) % texts.length);
    }, 9000); // Increased from 8000ms to 9000ms for better performance
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden hero-section">
      <CROHeroAnimation />
      
      <div className="absolute inset-0 hero-overlay-1 z-10"></div>
      
      <div className="relative z-20 text-center text-white max-w-5xl mx-auto px-4">
        <div className="mb-8">
          <div className="text-xs tracking-widest text-gray-400 mb-4 font-inter glitch-text">
            BYLT.MEDIA // CRO & UX AUDITING
          </div>
          <h1 className="text-6xl md:text-8xl font-bold mb-6 font-inter hero-title">
            <span className="quantum-text" key={textIndex}>
              {texts[textIndex]}
            </span>
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-200 max-w-4xl mx-auto hero-subtitle leading-relaxed">
            We transform your website into a high-performance conversion machine by combining deep user experience (UX) analysis with rigorous conversion rate optimisation (CRO).
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center hero-cta">
          <a href="#contact" className="quantum-button-hero">
            <span>Get a Free UX Audit</span>
          </a>
          <a href="#process" className="hologram-button">
            <span>Our CRO Process</span>
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

// Why Invest in CRO & UX Section (UPDATED COPY)
const WhyInvestInCRO = () => {
    const sectionRef = useQuantumScrollAnim();
    return (
        <section ref={sectionRef} id="services" className="py-24 bg-slate-900/30 relative quantum-anim overflow-hidden">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <div className="section-title-container">
                        <h2 className="section-title-enhanced">Unlock Your Website's Potential</h2>
                        <div className="title-accent-line"></div>
                    </div>
                    <p className="text-lg text-gray-400 max-w-3xl mx-auto">
                        Your website is your most powerful asset. Conversion Rate Optimisation is the science of turning your visitors into customers by understanding their behaviour and removing barriers to conversion, ensuring every click counts.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 text-center">
                    <div className="info-card">
                        <div className="info-card-icon"><TrendingUp /></div>
                        <h3 className="text-xl font-bold text-white mb-2">Maximise Existing Traffic</h3>
                        <p className="text-gray-400">
                           Stop wasting your marketing spend. CRO improves the efficiency of every channel, from SEO to PPC, by converting more of the users you already have.
                        </p>
                    </div>
                    <div className="info-card">
                        <div className="info-card-icon"><Users /></div>
                        <h3 className="text-xl font-bold text-white mb-2">Gain a Competitive Edge</h3>
                        <p className="text-gray-400">
                           A superior user experience is a powerful differentiator. By making your site easier and more enjoyable to use than your competitors', you win and retain more customers.
                        </p>
                    </div>
                    <div className="info-card">
                        <div className="info-card-icon"><CheckCircle /></div>
                        <h3 className="text-xl font-bold text-white mb-2">Make Data-Backed Decisions</h3>
                        <p className="text-gray-400">
                            Move beyond guesswork. Our CRO process is built on rigorous testing and analysis, providing you with concrete data to guide your digital strategy and investments.
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

// Our CRO & UX Services Section (UPDATED COPY)
const OurCROServices = () => {
    const sectionRef = useQuantumScrollAnim();
    const services = [
        { icon: <Search />, name: "User Research & Analysis", description: "We go beyond analytics, using heatmaps, session recordings, user surveys, and interviews to build a deep, empathetic understanding of your audience." },
        { icon: <TestTube />, name: "Experimentation & Testing", description: "We run structured A/B, split, and multivariate tests to validate hypotheses and systematically improve every element of your user journey." },
        { icon: <Filter />, name: "Conversion Funnel Optimisation", description: "We map and analyse your entire conversion funnel, identifying and fixing leaks to ensure a seamless path from first click to final conversion." },
        { icon: <MousePointerClick />, name: "UX & UI Design", description: "Our team designs intuitive, persuasive, and aesthetically pleasing interfaces that not only look great but are engineered to convert." },
        { icon: <BarChart />, name: "Data & Analytics Audits", description: "We ensure your analytics setup is robust and accurate, providing a solid foundation of trustworthy data to inform every strategic decision." },
        { icon: <Lightbulb />, name: "Personalisation Strategy", description: "We help you deliver tailored experiences to different user segments, increasing relevance and dramatically boosting conversion rates." },
    ];

    return (
        <section ref={sectionRef} className="py-24 bg-slate-900/50 relative quantum-anim overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <div className="section-title-container">
                        <h2 className="section-title-enhanced">A Holistic Approach to Growth</h2>
                        <div className="title-accent-line"></div>
                    </div>
                    <p className="text-lg text-gray-400 max-w-3xl mx-auto">
                        Our CRO services integrate data, psychology, and design to create experiences that don't just satisfy users, but actively guide them towards conversion.
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
                .solution-card:hover::before {
                    width: 300px;
                    height: 300px;
                }
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
                }
                .solution-name {
                    font-weight: 700;
                    color: white;
                    font-size: 1.25rem;
                    margin-bottom: 1rem;
                     position: relative; z-index: 1;
                }
                .solution-description {
                    color: #cbd5e1;
                    line-height: 1.6;
                     position: relative; z-index: 1;
                }
            `}</style>
        </section>
    );
};

// CRO Case Study Section (UPDATED WITH NISSAN CASE STUDY)
const CROCaseStudy = () => {
    const sectionRef = useQuantumScrollAnim();
    const [activeSection, setActiveSection] = useState('challenge');
    const [imageLoaded, setImageLoaded] = useState(false);

    const sections = [
        {
            id: 'challenge',
            title: 'The Challenge',
            content: 'Nissan Bulgaria faced the challenge of generating high-quality leads for test drives through their website. Their existing online forms were cumbersome, and the user journey from exploring a car model to booking a test drive was not optimised, leading to a low conversion rate.'
        },
        {
            id: 'solution',
            title: 'Our UX & CRO Strategy',
            content: 'We implemented a multi-channel strategy focused on optimising the user journey. This included creating dedicated, high-converting landing pages for each car model, simplifying lead generation forms, and running targeted Google Ads and social media campaigns to drive qualified traffic to these optimised funnels.'
        },
        {
            id: 'results',
            title: 'The Results',
            content: 'The campaign was a resounding success. By focusing on a streamlined user experience and clear calls-to-action, we generated over 2,000 test drive requests, achieved a 25% conversion rate on our landing pages, and significantly increased Nissan\'s qualified leads, directly impacting sales.'
        }
    ];

    return (
        <section id="case-study" ref={sectionRef} className="py-16 bg-slate-900 quantum-anim relative overflow-hidden">
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
                        How we supercharged lead generation for a global automotive leader.
                    </p>
                </div>

                <div className="case-study-main-container">
                    {/* Header Section */}
                    <div className="case-study-header-section">
                        <div className="case-study-header">
                            <h3 className="case-study-title">Nissan Bulgaria</h3>
                            <p className="case-study-subtitle">Converting Browsers into Test Drive Bookings</p>
                            <p className="case-study-description">
                                How we transformed Nissan's digital presence into a lead-generation powerhouse through strategic UX optimisation and conversion rate improvements.
                            </p>
                        </div>
                    </div>

                    {/* Image Section - Above Stats */}
                    <div className="case-study-image-section">
                        <div className="case-study-image-wrapper">
                            <img 
                                src="/images/casestudy/nissan-case-study.webp" 
                                alt="Nissan CRO Case Study - Automotive Lead Generation Success" 
                                className="case-study-image-clean"
                                onLoad={() => setImageLoaded(true)}
                            />
                        </div>
                    </div>

                    {/* Stats Section - Below Image */}
                    <div className="stats-section">
                        <div className="stats-grid">
                            <div className="stat-card-minimal">
                                <div className="stat-value">2,000+</div>
                                <div className="stat-label">Test Drive Requests Generated</div>
                            </div>
                            <div className="stat-card-minimal">
                                <div className="stat-value">25%</div>
                                <div className="stat-label">Landing Page Conversion Rate</div>
                            </div>
                            <div className="stat-card-minimal">
                                <div className="stat-value">1,000+</div>
                                <div className="stat-label">Qualified Leads from Social Media</div>
                            </div>
                            <div className="stat-card-minimal">
                                <div className="stat-value">40%</div>
                                <div className="stat-label">Improvement in User Journey</div>
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
                                                    <span>User Journey Optimisation</span>
                                                </div>
                                                <div className="feature-item">
                                                    <span>Form Simplification</span>
                                                </div>
                                                <div className="feature-item">
                                                    <span>Landing Page A/B Testing</span>
                                                </div>
                                                <div className="feature-item">
                                                    <span>Conversion Tracking Setup</span>
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
                                onClick={() => window.open('/case-studies-nissan', '_blank')}
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
                .case-study-image-clean { 
                    width: 100%; 
                    height: auto; 
                    aspect-ratio: 16/9; 
                    object-fit: cover; 
                    border-radius: 12px; 
                    transition: all 0.3s ease;
                    transform: translateZ(0); /* Hardware acceleration */
                    will-change: transform, box-shadow;
                }
                .case-study-image-clean:hover { 
                    transform: translate3d(0, 0, 0) scale(1.02); /* Hardware-accelerated transform */
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2); 
                }
                .case-study-description { color: #94a3b8; line-height: 1.6; margin-top: 0.75rem; font-size: 0.9rem; }
                .case-study-cta { display: flex; justify-content: center; align-items: center; }
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
                    transform: translateZ(0); /* Hardware acceleration */
                    will-change: transform, background, box-shadow;
                }
                .cta-button:hover { 
                    transform: translate3d(0, -2px, 0); /* Hardware-accelerated transform */
                    box-shadow: 0 8px 25px rgba(184, 255, 250, 0.3); 
                    background: linear-gradient(135deg, #72E4E0 0%, #B8FFFA 100%); 
                }
                .cta-icon { width: 18px; height: 18px; transition: transform 0.3s ease; }
                .cta-button:hover .cta-icon { transform: translateX(3px); }
                .case-study-header { margin-bottom: 2rem; }
                .case-study-title { font-size: clamp(2rem, 5vw, 3rem); font-weight: 900; color: #ffffff; margin-bottom: 0.5rem; background: linear-gradient(135deg, #ffffff 0%, #B8FFFA 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
                .case-study-subtitle { font-size: 1.25rem; color: #B8FFFA; font-weight: 600; opacity: 0.9; margin-bottom: 0.5rem; }
                .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 0.75rem; margin-bottom: 2rem; }
                .stat-card-minimal { 
                    background: rgba(255, 255, 255, 0.02); 
                    border: 1px solid rgba(184, 255, 250, 0.15); 
                    border-radius: 8px; 
                    padding: 0.75rem; 
                    text-align: center; 
                    transition: all 0.3s ease;
                    transform: translateZ(0); /* Hardware acceleration */
                    will-change: transform, border-color, background;
                }
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
                @keyframes float { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-20px) rotate(180deg); } }
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

// Our CRO Process Section (UPDATED COPY)
const CROProcess = () => {
    const [activeStep, setActiveStep] = useState(null);
    const sectionRef = useQuantumScrollAnim();
    
    const processSteps = [
        { step: "01", title: "Discover & Analyse", subtitle: "Laying the Groundwork", description: "We immerse ourselves in your business, combining quantitative data analysis with qualitative user research to uncover hidden opportunities and friction points.", icon: <BarChart className="w-6 h-6" />, details: [ "Analytics Deep Dive", "Heuristic Evaluation", "User Journey Mapping", "Heatmap & Session Analysis" ] },
        { step: "02", title: "Prioritise & Strategise", subtitle: "Building the Roadmap", description: "We transform insights into a strategic, prioritised roadmap of testable hypotheses, focusing on the ideas that will drive the most significant commercial impact.", icon: <Lightbulb className="w-6 h-6" />, details: [ "Hypothesis Generation", "Impact & Effort Scoring", "Personalisation Strategy", "A/B Test Roadmap Creation" ] },
        { step: "03", title: "Design & Build", subtitle: "Bringing Ideas to Life", description: "Our in-house team of UX/UI designers and developers create seamless, persuasive, and technically sound test variations ready for launch.", icon: <Code className="w-6 h-6" />, details: [ "Wireframing & Prototyping", "User-Centric UI Design", "A/B Test Development", "Rigorous Quality Assurance" ] },
        { step: "04", title: "Test & Learn", subtitle: "Gathering Live Data", description: "We launch controlled experiments to your live audience, gathering statistically significant data to prove which experience performs better and why.", icon: <TestTube className="w-6 h-6" />, details: [ "Client-side & Server-side Testing", "Audience Segmentation", "Statistical Analysis", "Cross-device Monitoring" ] },
        { step: "05", title: "Implement & Iterate", subtitle: "Driving Continuous Growth", description: "We don't just report on winners; we help you implement them. The learnings from every test fuel a continuous cycle of innovation and optimisation.", icon: <TrendingUp className="w-6 h-6" />, details: [ "Implementation of Winning Variants", "Insight & Recommendation Reporting", "Building on Learnings", "Scaling the CRO Programme" ] }
    ];

    return (
        <section id="process" ref={sectionRef} className="py-24 quantum-process-section quantum-anim relative overflow-hidden">
            <div className="absolute inset-0 quantum-grid-animation"></div>
            
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                <div className="text-center mb-20">
                    <div className="section-title-container">
                        <h2 className="section-title-enhanced">
                            Our CRO & UX Process
                        </h2>
                        <div className="title-accent-line"></div>
                    </div>
                    <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
                        A continuous cycle of research, testing, and learning designed for iterative improvement.
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
            const subject = encodeURIComponent(`New CRO/UX Inquiry from ${formData.firstName} ${formData.lastName}`);
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
                        <h2 className="section-title-enhanced">Start Optimising Today</h2>
                        <div className="title-accent-line"></div>
                    </div>
                    <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                        Ready to unlock your website's true potential? Let's talk about how a UX audit can transform your conversions.
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
                        <div className="form-group"><label htmlFor="message" className="form-label">Message *</label><textarea id="message" name="message" value={formData.message} onChange={handleInputChange} required rows={6} className="form-textarea" placeholder="Tell us about your website, your conversion goals, and any challenges you're facing..."></textarea></div>
                        <div className="form-submit"><button type="submit" disabled={isSubmitting} className="neural-submit-button">{isSubmitting ? (<><div className="submit-spinner"></div><span>Sending...</span></>) : (<><span>Send Message</span><MoveRight className="ml-3 transition-transform duration-300" /></>)}</button></div>
                        {submitStatus === 'success' && (<div className="status-message success"><Mail className="w-5 h-5" /><span>Thank you! Your message has been prepared.</span></div>)}
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

// Main App Component for CRO/UX Page
const CROPage = () => {
    return (
        <Layout>
            <Head>
                <title>CRO & UX Audit Services | BYLT Media</title>
                <meta name="description" content="Turn visitors into customers with BYLT Media's expert Conversion Rate Optimisation (CRO) and User Experience (UX) audit services." />
                <link rel="icon" href="/favicon.ico" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
            </Head>
            <GlobalStyles />
            
            <main>
                <CROHero />
                <WhyInvestInCRO />
                <OurCROServices />
                <CROCaseStudy />
                <CROProcess />
                <NeuralContact />
            </main>
        </Layout>
    );
};

export default CROPage;
