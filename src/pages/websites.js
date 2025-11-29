import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Layout from '../components/layout';
import GlobalStyles from '../components/globalsyles';
import {
    Menu, X, Mail, Phone, MapPin, ChevronLeft, ChevronRight, Star, ChevronDown, MoveRight,
    Briefcase, Workflow, TrendingUp, Search, Code, BrainCircuit, Lightbulb, Construction,
    Rocket, BarChart, Clock, Target, DollarSign, CheckCircle, Award, Image as ImageIcon, ShoppingCart, Youtube,
    Building, HeartPulse, Car, Plane, ShoppingBag, Utensils, Scale, Zap, Dribbble, PenTool, Layers
} from 'lucide-react';
// Three.js imports removed - not actually used in this file


// --- V9.2: WEBDEV SYNTHESIS THEME ---

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

// ENHANCED HERO ANIMATION: Website Build Visualization
const WebsiteBuildAnimation = () => {
    const [buildStep, setBuildStep] = useState(0);
    const [isClient, setIsClient] = useState(false);
    
    useEffect(() => {
        setIsClient(true);
    }, []);
    
    useEffect(() => {
        if (!isClient) return;
        const interval = setInterval(() => {
            setBuildStep(prev => (prev + 1) % 7);
        }, 2500); // Increased from 2000ms to 2500ms for better performance
        return () => clearInterval(interval);
    }, []);

    // Render a simplified static version during SSR
    if (!isClient) {
        return (
            <div className="absolute inset-0 z-0 flex items-center justify-center">
                <div className="website-builder-container">
                    <div className="desktop-mockup">
                        <div className="desktop-screen">
                            <div className="desktop-header">
                                <div className="desktop-nav">
                                    <div className="desktop-logo"></div>
                                    <div className="desktop-menu">
                                        <div className="desktop-menu-item"></div>
                                        <div className="desktop-menu-item"></div>
                                        <div className="desktop-menu-item"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="mobile-mockup">
                        <div className="browser-frame">
                            <div className="browser-controls">
                                <div className="control-dot red"></div>
                                <div className="control-dot yellow"></div>
                                <div className="control-dot green"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="absolute inset-0 z-0 flex items-center justify-center">
            <div className="website-builder-container">
                {/* Code particles background (Reduced for performance) */}
                <div className="code-particles">
                    {[...Array(5)].map((_, i) => ( // Reduced from 8 to 5 particles (~40% reduction)
                        <div 
                            key={i} 
                            className="code-particle"
                            style={{
                                left: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 8}s`,
                                animationDuration: `${12 + Math.random() * 6}s`
                            }}
                        >
                            {['<div>', '</div>', '{...}', 'React', 'CSS', 'JS'][Math.floor(Math.random() * 6)]}
                        </div>
                    ))}
                </div>

                {/* Left side - Desktop mockup */}
                <div className="desktop-mockup">
                    <div className="desktop-screen built">
                        <div className="desktop-header">
                            <div className="desktop-nav">
                                <div className="desktop-logo"></div>
                                <div className="desktop-menu">
                                    <div className="desktop-menu-item"></div>
                                    <div className="desktop-menu-item"></div>
                                    <div className="desktop-menu-item"></div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="desktop-hero built">
                            <div className="desktop-hero-text">
                                <div className="desktop-title"></div>
                                <div className="desktop-subtitle"></div>
                            </div>
                            <div className="desktop-cta"></div>
                        </div>
                        
                        <div className="desktop-content built">
                            <div className="desktop-cards">
                                <div className="desktop-card"></div>
                                <div className="desktop-card"></div>
                                <div className="desktop-card"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right side - Mobile mockup */}
                <div className="mobile-mockup">
                    {/* Browser frame */}
                    <div className="browser-frame built">
                        <div className="browser-controls">
                            <div className="control-dot red"></div>
                            <div className="control-dot yellow"></div>
                            <div className="control-dot green"></div>
                        </div>
                        <div className="address-bar">
                            <div className="url">https://yoursite.com</div>
                        </div>
                    </div>

                    {/* Website content blocks */}
                    <div className="website-content">
                        {/* Navigation bar */}
                        <div className="nav-block built">
                            <div className="nav-logo">LOGO</div>
                            <div className="hamburger">☰</div>
                        </div>

                        {/* Hero section */}
                        <div className="hero-block built">
                            <div className="hero-text">
                                <div className="hero-title"></div>
                                <div className="hero-subtitle"></div>
                            </div>
                            <div className="hero-button"></div>
                        </div>

                        {/* Content blocks */}
                        <div className="content-block built">
                            <div className="content-grid">
                                <div className="content-item"></div>
                                <div className="content-item"></div>
                            </div>
                        </div>

                        {/* Image section */}
                        <div className="image-block built">
                            <div className="image-placeholder"></div>
                        </div>

                        {/* Footer */}
                        <div className="footer-block built">
                            <div className="footer-content"></div>
                        </div>
                    </div>
                </div>

                {/* Build progress indicator */}
                <div className="build-progress">
                    <div className="progress-text">Building Responsive Sites...</div>
                    <div className="progress-bar">
                        <div 
                            className="progress-fill" 
                            style={{ width: '100%' }}
                        ></div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .website-builder-container {
                    position: relative;
                    width: 100%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 0 4rem;
                    opacity: 0.25;
                    max-width: 1400px;
                    margin: 0 auto;
                }

                .code-particles {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    overflow: hidden;
                    opacity: 0.1;
                    z-index: 1;
                    pointer-events: none;
                    transform: translateZ(0); /* Hardware acceleration */
                    contain: layout style paint;
                }

                .code-particle {
                    position: absolute;
                    color: #B8FFFA;
                    font-family: 'Courier New', monospace;
                    font-size: 10px;
                    animation: float-code infinite linear;
                    pointer-events: none;
                    transform: translateZ(0); /* Hardware acceleration */
                    will-change: transform, opacity;
                }

                @keyframes float-code {
                    from {
                        transform: translate3d(-20px, 120vh, 0); /* Hardware-accelerated transform */
                        opacity: 0;
                    }
                    25% {
                        opacity: 0.2;
                    }
                    75% {
                        opacity: 0.2;
                    }
                    to {
                        transform: translate3d(20px, -120px, 0); /* Hardware-accelerated transform */
                        opacity: 0;
                    }
                }

                /* Desktop mockup - left side */
                .desktop-mockup {
                    position: relative;
                    z-index: 2;
                    width: 280px;
                    height: 180px;
                    background: rgba(30, 41, 59, 0.4);
                    border-radius: 8px;
                    overflow: hidden;
                    backdrop-filter: blur(5px);
                    border: 1px solid rgba(184, 255, 250, 0.1);
                    transform: perspective(800px) rotateY(15deg) translateZ(0); /* Hardware acceleration */
                    will-change: transform;
                }

                .desktop-screen {
                    width: 100%;
                    height: 100%;
                    opacity: 0.1;
                    transform: scale(0.9);
                    transition: all 1.2s cubic-bezier(0.25, 0.8, 0.25, 1);
                }

                .desktop-screen.built {
                    opacity: 1;
                    transform: scale(1);
                }

                .desktop-header {
                    padding: 8px;
                    background: rgba(55, 65, 81, 0.2);
                    border-bottom: 1px solid rgba(55, 65, 81, 0.2);
                }

                .desktop-nav {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .desktop-logo {
                    width: 32px;
                    height: 8px;
                    background: #B8FFFA;
                    border-radius: 1px;
                }

                .desktop-menu {
                    display: flex;
                    gap: 4px;
                }

                .desktop-menu-item {
                    width: 16px;
                    height: 4px;
                    background: rgba(184, 255, 250, 0.3);
                    border-radius: 1px;
                }

                .desktop-hero, .desktop-content {
                    opacity: 0;
                    transform: translateY(15px) scale(0.8);
                    transition: all 1s cubic-bezier(0.25, 0.8, 0.25, 1);
                }

                .desktop-hero.built, .desktop-content.built {
                    opacity: 1;
                    transform: translateY(0) scale(1);
                }

                .desktop-hero {
                    padding: 16px 12px;
                    text-align: center;
                    background: linear-gradient(135deg, rgba(184, 255, 250, 0.02), rgba(184, 255, 250, 0.01));
                }

                .desktop-hero-text {
                    margin-bottom: 8px;
                }

                .desktop-title {
                    width: 120px;
                    height: 8px;
                    background: rgba(255, 255, 255, 0.5);
                    border-radius: 1px;
                    margin: 0 auto 4px auto;
                }

                .desktop-subtitle {
                    width: 80px;
                    height: 4px;
                    background: rgba(255, 255, 255, 0.3);
                    border-radius: 1px;
                    margin: 0 auto;
                }

                .desktop-cta {
                    width: 48px;
                    height: 12px;
                    background: #B8FFFA;
                    border-radius: 2px;
                    margin: 0 auto;
                }

                .desktop-content {
                    padding: 12px;
                }

                .desktop-cards {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 4px;
                }

                /* Add staggered animation delays for building effect */
                .nav-block.built {
                    animation-delay: 0.2s;
                }
                
                .hero-block.built {
                    animation-delay: 0.4s;
                }
                
                .content-block.built {
                    animation-delay: 0.6s;
                }
                
                .image-block.built {
                    animation-delay: 0.8s;
                }
                
                .footer-block.built {
                    animation-delay: 1s;
                }

                /* Desktop section staggered delays */
                .desktop-hero.built {
                    animation-delay: 0.3s;
                }
                
                .desktop-content.built {
                    animation-delay: 0.5s;
                }

                /* Individual desktop cards building animation */
                .desktop-card {
                    height: 24px;
                    background: rgba(184, 255, 250, 0.08);
                    border-radius: 2px;
                    border: 1px solid rgba(184, 255, 250, 0.1);
                    opacity: 0;
                    transform: scale(0.8);
                    transition: all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1);
                }
                
                .desktop-content.built .desktop-card {
                    opacity: 1;
                    transform: scale(1);
                }
                
                .desktop-content.built .desktop-card:nth-child(1) {
                    transition-delay: 0.1s;
                }
                
                .desktop-content.built .desktop-card:nth-child(2) {
                    transition-delay: 0.2s;
                }
                
                .desktop-content.built .desktop-card:nth-child(3) {
                    transition-delay: 0.3s;
                }

                /* Individual mobile content building animation */
                .content-item {
                    height: 32px;
                    background: rgba(184, 255, 250, 0.06);
                    border-radius: 2px;
                    border: 1px solid rgba(184, 255, 250, 0.08);
                    opacity: 0;
                    transform: scale(0.8);
                    transition: all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1);
                }
                
                .content-block.built .content-item {
                    opacity: 1;
                    transform: scale(1);
                }
                
                .content-block.built .content-item:nth-child(1) {
                    transition-delay: 0.1s;
                }
                
                .content-block.built .content-item:nth-child(2) {
                    transition-delay: 0.2s;
                }

                /* Mobile mockup - right side */
                .mobile-mockup {
                    position: relative;
                    z-index: 2;
                    width: 180px;
                    background: rgba(30, 41, 59, 0.4);
                    border-radius: 6px;
                    overflow: hidden;
                    backdrop-filter: blur(5px);
                    border: 1px solid rgba(184, 255, 250, 0.1);
                    transform: perspective(800px) rotateY(-15deg);
                }

                .browser-frame {
                    opacity: 0.1;
                    transform: translateY(-15px) scale(0.9);
                    transition: all 1.2s cubic-bezier(0.25, 0.8, 0.25, 1);
                }

                .browser-frame.built {
                    opacity: 1;
                    transform: translateY(0) scale(1);
                }

                .browser-controls {
                    display: flex;
                    align-items: center;
                    gap: 4px;
                    padding: 6px 8px;
                    background: rgba(15, 23, 42, 0.4);
                    border-bottom: 1px solid rgba(55, 65, 81, 0.2);
                }

                .control-dot {
                    width: 6px;
                    height: 6px;
                    border-radius: 50%;
                }

                .control-dot.red { background: #ef4444; }
                .control-dot.yellow { background: #f59e0b; }
                .control-dot.green { background: #10b981; }

                .address-bar {
                    padding: 4px 8px;
                    background: rgba(55, 65, 81, 0.15);
                    border-bottom: 1px solid rgba(55, 65, 81, 0.2);
                }

                .url {
                    background: rgba(75, 85, 99, 0.2);
                    color: #9ca3af;
                    padding: 2px 6px;
                    border-radius: 2px;
                    font-size: 7px;
                    font-family: 'Courier New', monospace;
                }

                .website-content {
                    padding: 0;
                }

                .nav-block, .hero-block, .content-block, .image-block, .footer-block {
                    opacity: 0;
                    transform: translateY(20px) scale(0.85);
                    transition: all 1s cubic-bezier(0.25, 0.8, 0.25, 1);
                }

                .nav-block.built, .hero-block.built, .content-block.built, .image-block.built, .footer-block.built {
                    opacity: 1;
                    transform: translateY(0) scale(1);
                }

                .nav-block {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 8px 12px;
                    background: rgba(55, 65, 81, 0.15);
                    border-bottom: 1px solid rgba(55, 65, 81, 0.2);
                }

                .nav-logo {
                    width: 24px;
                    height: 8px;
                    background: #B8FFFA;
                    border-radius: 1px;
                }

                .hamburger {
                    color: rgba(184, 255, 250, 0.4);
                    font-size: 8px;
                }

                .hero-block {
                    padding: 16px 12px;
                    text-align: center;
                    background: linear-gradient(135deg, rgba(184, 255, 250, 0.02), rgba(184, 255, 250, 0.01));
                }

                .hero-text {
                    margin-bottom: 12px;
                }

                .hero-title {
                    width: 100px;
                    height: 10px;
                    background: rgba(255, 255, 255, 0.5);
                    border-radius: 1px;
                    margin: 0 auto 6px auto;
                }

                .hero-subtitle {
                    width: 70px;
                    height: 6px;
                    background: rgba(255, 255, 255, 0.3);
                    border-radius: 1px;
                    margin: 0 auto;
                }

                .hero-button {
                    width: 48px;
                    height: 16px;
                    background: #B8FFFA;
                    border-radius: 2px;
                    margin: 0 auto;
                }

                .content-block {
                    padding: 12px;
                }

                .content-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 6px;
                }

                .image-block {
                    padding: 8px;
                }

                .image-placeholder {
                    width: 100%;
                    height: 40px;
                    background: linear-gradient(45deg, rgba(184, 255, 250, 0.06), rgba(184, 255, 250, 0.1));
                    border-radius: 2px;
                    border: 1px solid rgba(184, 255, 250, 0.1);
                }

                .footer-block {
                    padding: 8px;
                    background: rgba(15, 23, 42, 0.3);
                    border-top: 1px solid rgba(55, 65, 81, 0.2);
                }

                .footer-content {
                    width: 100%;
                    height: 16px;
                    background: rgba(184, 255, 250, 0.06);
                    border-radius: 1px;
                }

                .build-progress {
                    position: absolute;
                    bottom: 2rem;
                    left: 50%;
                    transform: translateX(-50%);
                    text-align: center;
                    opacity: 0.6;
                    width: 240px;
                }

                .progress-text {
                    color: #B8FFFA;
                    font-size: 11px;
                    font-weight: 500;
                    margin-bottom: 8px;
                    font-family: 'Inter', sans-serif;
                }

                .progress-bar {
                    width: 100%;
                    height: 2px;
                    background: rgba(55, 65, 81, 0.3);
                    border-radius: 1px;
                    margin-bottom: 12px;
                    overflow: hidden;
                }

                .progress-fill {
                    height: 100%;
                    background: linear-gradient(90deg, #B8FFFA, #9DFFF8);
                    border-radius: 1px;
                    transition: width 0.8s ease;
                }

                @media (max-width: 1200px) {
                    .website-builder-container {
                        padding: 0 2rem;
                        opacity: 0.2;
                    }
                    
                    .desktop-mockup {
                        width: 200px;
                        height: 130px;
                    }
                    
                    .mobile-mockup {
                        width: 140px;
                    }
                }

                @media (max-width: 768px) {
                    .website-builder-container {
                        flex-direction: column;
                        gap: 2rem;
                        padding: 1rem;
                        opacity: 0.15;
                    }
                    
                    .desktop-mockup {
                        width: 160px;
                        height: 100px;
                        transform: perspective(600px) rotateY(10deg);
                    }
                    
                    .mobile-mockup {
                        width: 120px;
                        transform: perspective(600px) rotateY(-10deg);
                    }
                    
                    .build-progress {
                        position: static;
                        transform: none;
                        margin-top: 1rem;
                        width: 100%;
                    }
                }
            `}</style>
        </div>
    );
};

// Website Development Hero Section
const WebDevHero = () => {
  const [textIndex, setTextIndex] = useState(0);
  const texts = [
    "Architecting Digital Experiences",
    "Custom React Solutions",
    "Blazing-Fast Landing Pages",
    "Websites That Convert"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex(prev => (prev + 1) % texts.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden hero-section">
      <WebsiteBuildAnimation />
      <div className="absolute inset-0 hero-overlay-1 z-10"></div>
      
      <div className="relative z-20 text-center text-white max-w-5xl mx-auto px-4">
        <div className="mb-8">
          <div className="text-xs tracking-widest text-gray-400 mb-4 font-inter glitch-text">
            BYLT.MEDIA // WEBSITE DEVELOPMENT
          </div>
          <h1 className="text-6xl md:text-8xl font-bold mb-6 font-inter hero-title">
            <span className="quantum-text" key={textIndex}>
              {texts[textIndex]}
            </span>
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-200 max-w-4xl mx-auto hero-subtitle leading-relaxed">
            From modern React applications to traditional HTML sites, WordPress platforms to custom APIs - we master every technology stack to bring your digital vision to life with precision and performance.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center hero-cta">
          <a href="#contact" className="quantum-button-hero">
            <span>Start Your Project</span>
          </a>
          <a href="#services" className="hologram-button">
            <span>Explore Services</span>
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

// Our Development Services Section
const OurDevServices = () => {
    const sectionRef = useQuantumScrollAnim();
    return (
        <section id="services" ref={sectionRef} className="py-24 bg-slate-900/30 relative quantum-anim overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <div className="section-title-container">
                        <h2 className="section-title-enhanced">Our Development Expertise</h2>
                        <div className="title-accent-line"></div>
                    </div>
                    <p className="text-lg text-gray-400 max-w-3xl mx-auto">
                        From rapid prototypes to enterprise-scale applications, we master every technology stack to bring your vision to life. Whether you need cutting-edge React apps or traditional HTML/CSS sites, we've got you covered.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 text-center">
                    <div className="info-card-dev">
                        <div className="info-card-icon-dev"><Code /></div>
                        <h3 className="text-xl font-bold text-white mb-2">Modern Web Applications</h3>
                        <p className="text-gray-400">
                            React, Next.js, Vue, Angular, or vanilla JavaScript - we build lightning-fast, interactive web applications with the latest frameworks. From single-page apps to complex dashboards and e-commerce platforms.
                        </p>
                    </div>
                    <div className="info-card-dev">
                        <div className="info-card-icon-dev"><Construction /></div>
                        <h3 className="text-xl font-bold text-white mb-2">Content Management Solutions</h3>
                        <p className="text-gray-400">
                            WordPress, Framer, Webflow, or custom CMS - we create user-friendly platforms that put you in control. Perfect for blogs, corporate sites, and content-heavy projects with easy management interfaces.
                        </p>
                    </div>
                    <div className="info-card-dev">
                        <div className="info-card-icon-dev"><Rocket /></div>
                        <h3 className="text-xl font-bold text-white mb-2">Custom Development</h3>
                        <p className="text-gray-400">
                            HTML, CSS, PHP, Python, Node.js - whatever technology your project requires. We adapt to your needs, whether it's legacy system integration, API development, or building from scratch with any stack.
                        </p>
                    </div>
                </div>
            </div>
            <style jsx>{`
                .info-card-dev {
                    background: rgba(30, 41, 59, 0.5);
                    border: 1px solid #374151;
                    border-radius: 16px;
                    padding: 2.5rem 2rem;
                    transition: all 0.3s ease;
                    backdrop-filter: blur(8px);
                    position: relative;
                    overflow: hidden;
                    transform: translateZ(0); /* Hardware acceleration */
                    will-change: transform, border-color, box-shadow;
                    contain: layout style paint;
                }
                .info-card-dev:hover {
                    transform: translate3d(0, -8px, 0); /* Hardware-accelerated transform */
                    border-color: #B8FFFA;
                    box-shadow: 0 10px 30px rgba(184, 255, 250, 0.1);
                }
                .info-card-icon-dev {
                    width: 4rem;
                    height: 4rem;
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
                .info-card-dev:hover .info-card-icon-dev {
                    transform: translate3d(0, 0, 0) scale(1.1) rotate(15deg); /* Hardware-accelerated transform */
                    background: #B8FFFA;
                    color: #0f172a;
                }
            `}</style>
        </section>
    );
};

// Technology Stack Section
const TechStack = () => {
    const sectionRef = useQuantumScrollAnim();
    const technologies = [
        { name: 'React', icon: '/images/tech/react.svg' },
        { name: 'Next.js', icon: '/images/tech/nextjs.svg' },
        { name: 'Framer', icon: '/images/tech/framer.svg' },
        { name: 'WordPress', icon: '/images/tech/wordpress.svg' },
        { name: 'Three.js', icon: '/images/tech/threejs.svg' },
        { name: 'Tailwind CSS', icon: '/images/tech/tailwind.svg' },
        { name: 'Node.js', icon: '/images/tech/nodejs.svg' },
        { name: 'Vercel', icon: '/images/tech/vercel.svg' },
    ];

    return (
        <section ref={sectionRef} className="py-24 bg-slate-900/50 relative quantum-anim overflow-hidden">
            <div className="absolute inset-0 tech-grid-bg"></div>
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <div className="section-title-container">
                        <h2 className="section-title-enhanced">Core Technologies</h2>
                        <div className="title-accent-line"></div>
                    </div>
                    <p className="text-lg text-gray-400 max-w-3xl mx-auto">
                        We build with a modern, performance-focused tech stack to ensure your website is fast, secure, and future-proof.
                    </p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {technologies.map((tech) => (
                        <div key={tech.name} className="tech-card">
                            <img src={tech.icon} alt={tech.name} className="tech-icon" />
                            <span className="tech-name">{tech.name}</span>
                        </div>
                    ))}
                </div>
            </div>
            <style jsx>{`
                .tech-grid-bg {
                    background-image:
                        radial-gradient(circle at 1px 1px, rgba(184, 255, 250, 0.2) 1px, transparent 0),
                        radial-gradient(circle at 10px 10px, rgba(184, 255, 250, 0.1) 1px, transparent 0);
                    background-size: 20px 20px;
                    opacity: 0.2;
                }
                .tech-card {
                    background: rgba(30, 41, 59, 0.6);
                    border: 1px solid #374151;
                    border-radius: 12px;
                    padding: 2rem 1rem;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    gap: 1rem;
                    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
                    transform: translateZ(0); /* Hardware acceleration */
                    will-change: transform, border-color, background;
                    contain: layout style paint;
                }
                .tech-card:hover {
                    transform: translate3d(0, -10px, 0); /* Hardware-accelerated transform */
                    border-color: #B8FFFA;
                    background: rgba(184, 255, 250, 0.05);
                }
                .tech-icon {
                    height: 50px;
                    width: auto;
                    filter: grayscale(100%) brightness(1.5);
                    opacity: 0.7;
                    transition: all 0.3s ease;
                    transform: translateZ(0); /* Hardware acceleration */
                    will-change: transform, filter, opacity;
                }
                .tech-card:hover .tech-icon {
                    filter: grayscale(0%) brightness(1);
                    opacity: 1;
                    transform: scale(1.1);
                }
                .tech-name {
                    color: #9ca3af;
                    font-weight: 500;
                    transition: color 0.3s ease;
                }
                .tech-card:hover .tech-name {
                    color: #B8FFFA;
                }
            `}</style>
        </section>
    );
};

// Portfolio Section - Some of Our Work
const PortfolioSection = () => {
    const sectionRef = useQuantumScrollAnim();
    
    const portfolioItems = [
        {
            title: "E-Commerce Platform",
            category: "React + Next.js",
            description: "High-performance online store with custom checkout flow and inventory management",
            image: "/images/casestudy/brickell-case-study.webp",
            tech: ["React", "Next.js", "Stripe", "Node.js"],
            link: "#"
        },
        {
            title: "Corporate Website",
            category: "WordPress CMS",
            description: "Content-rich corporate site with custom theme and advanced SEO optimisation",
            image: "/images/casestudy/parfium.bg-case-study.webp",
            tech: ["WordPress", "PHP", "Custom Theme", "SEO"],
            link: "#"
        },
        {
            title: "SaaS Dashboard",
            category: "Vue.js + API",
            description: "Complex data visualization platform with real-time analytics and user management",
            image: "/images/casestudy/brickell-case-study.webp",
            tech: ["Vue.js", "D3.js", "REST API", "MongoDB"],
            link: "#"
        },
        {
            title: "Landing Page Campaign",
            category: "HTML + CSS",
            description: "High-converting landing page for marketing campaign with A/B testing integration",
            image: "/images/casestudy/parfium.bg-case-study.webp",
            tech: ["HTML5", "CSS3", "JavaScript", "Analytics"],
            link: "#"
        }
    ];

    return (
        <section id="portfolio" ref={sectionRef} className="py-24 bg-slate-900/40 relative quantum-anim overflow-hidden">
            <div className="absolute inset-0 portfolio-grid-bg"></div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <div className="section-title-container">
                        <h2 className="section-title-enhanced">Some of Our Work</h2>
                        <div className="title-accent-line"></div>
                    </div>
                    <p className="text-lg text-gray-400 max-w-3xl mx-auto">
                        From startups to enterprise clients, we've delivered cutting-edge web solutions across industries. Here's a glimpse of what we can build for you.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {portfolioItems.map((item, index) => (
                        <div key={index} className="portfolio-card">
                            <div className="portfolio-image">
                                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                                <div className="portfolio-overlay">
                                    <div className="portfolio-overlay-content">
                                        <span className="portfolio-category">{item.category}</span>
                                        <h3 className="portfolio-title">{item.title}</h3>
                                        <p className="portfolio-description">{item.description}</p>
                                        <div className="portfolio-tech">
                                            {item.tech.map((tech, techIndex) => (
                                                <span key={techIndex} className="tech-tag">{tech}</span>
                                            ))}
                                        </div>
                                        <a href={item.link} className="portfolio-link">
                                            <span>View Project</span>
                                            <ChevronRight size={16} />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            
            <style jsx>{`
                .portfolio-grid-bg {
                    background-image:
                        linear-gradient(45deg, rgba(184, 255, 250, 0.03) 25%, transparent 25%),
                        linear-gradient(-45deg, rgba(184, 255, 250, 0.03) 25%, transparent 25%),
                        linear-gradient(45deg, transparent 75%, rgba(184, 255, 250, 0.03) 75%),
                        linear-gradient(-45deg, transparent 75%, rgba(184, 255, 250, 0.03) 75%);
                    background-size: 60px 60px;
                    background-position: 0 0, 0 30px, 30px -30px, -30px 0px;
                    opacity: 0.1;
                }
                
                .portfolio-card {
                    background: rgba(30, 41, 59, 0.6);
                    border: 1px solid #374151;
                    border-radius: 16px;
                    overflow: hidden;
                    transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
                    backdrop-filter: blur(8px);
                    height: 320px;
                    position: relative;
                    transform: translateZ(0); /* Hardware acceleration */
                    will-change: transform, border-color, box-shadow;
                    contain: layout style paint;
                }
                
                .portfolio-card:hover {
                    transform: translate3d(0, -12px, 0); /* Hardware-accelerated transform */
                    border-color: #B8FFFA;
                    box-shadow: 0 20px 40px rgba(184, 255, 250, 0.15);
                }
                
                .portfolio-image {
                    position: relative;
                    width: 100%;
                    height: 100%;
                    overflow: hidden;
                }
                
                .portfolio-image img {
                    transition: transform 0.6s ease;
                    filter: grayscale(60%) brightness(0.7);
                }
                
                .portfolio-card:hover .portfolio-image img {
                    transform: scale(1.1);
                    filter: grayscale(0%) brightness(0.4);
                }
                
                .portfolio-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: linear-gradient(135deg, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.8));
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    opacity: 0;
                    transition: all 0.4s ease;
                    padding: 2rem;
                }
                
                .portfolio-card:hover .portfolio-overlay {
                    opacity: 1;
                }
                
                .portfolio-overlay-content {
                    text-align: center;
                    transform: translateY(20px);
                    transition: transform 0.4s ease;
                }
                
                .portfolio-card:hover .portfolio-overlay-content {
                    transform: translateY(0);
                }
                
                .portfolio-category {
                    display: inline-block;
                    background: rgba(184, 255, 250, 0.2);
                    color: #B8FFFA;
                    padding: 0.25rem 0.75rem;
                    border-radius: 20px;
                    font-size: 0.75rem;
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                    margin-bottom: 0.75rem;
                }
                
                .portfolio-title {
                    color: white;
                    font-size: 1.5rem;
                    font-weight: 700;
                    margin-bottom: 0.5rem;
                    font-family: 'Inter', sans-serif;
                }
                
                .portfolio-description {
                    color: #d1d5db;
                    font-size: 0.875rem;
                    line-height: 1.5;
                    margin-bottom: 1rem;
                }
                
                .portfolio-tech {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: center;
                    gap: 0.5rem;
                    margin-bottom: 1.5rem;
                }
                
                .tech-tag {
                    background: rgba(55, 65, 81, 0.8);
                    color: #9ca3af;
                    padding: 0.25rem 0.5rem;
                    border-radius: 8px;
                    font-size: 0.75rem;
                    font-weight: 500;
                    border: 1px solid rgba(75, 85, 99, 0.3);
                }
                
                .portfolio-link {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                    background: #B8FFFA;
                    color: #0f172a;
                    padding: 0.75rem 1.5rem;
                    border-radius: 8px;
                    font-weight: 600;
                    font-size: 0.875rem;
                    text-decoration: none;
                    transition: all 0.3s ease;
                }
                
                .portfolio-link:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 20px rgba(184, 255, 250, 0.3);
                    background: #9DFFF8;
                }
                
                @media (max-width: 768px) {
                    .portfolio-card {
                        height: 280px;
                    }
                    
                    .portfolio-overlay {
                        padding: 1.5rem;
                    }
                    
                    .portfolio-title {
                        font-size: 1.25rem;
                    }
                }
            `}</style>
        </section>
    );
};

// Web Development Process Section
const WebDevProcess = () => {
    const [activeStep, setActiveStep] = useState('01'); // Default open first step
    const sectionRef = useQuantumScrollAnim();
    
    const processSteps = [
        { step: "01", title: "Discovery & Strategy", subtitle: "Blueprint for Success", description: "We start by diving deep into your business goals, target audience, and project requirements to create a comprehensive strategy and project roadmap.", icon: <BrainCircuit className="w-6 h-6" />, details: [ "Stakeholder Interviews", "Audience & Competitor Analysis", "Feature & Tech Stack Planning", "Project Scope & Timeline Definition" ] },
        { step: "02", title: "UI/UX Design", subtitle: "Crafting the Experience", description: "Our design phase focuses on creating intuitive, engaging, and visually stunning interfaces, starting with wireframes and evolving into high-fidelity prototypes.", icon: <PenTool className="w-6 h-6" />, details: [ "User Flow Mapping", "Wireframing & Prototyping", "Visual Design System", "Interaction & Animation Design" ] },
        { step: "03", title: "Agile Development", subtitle: "Bringing Designs to Life", description: "Using an agile methodology, our developers write clean, efficient, and scalable code, turning the approved designs into a fully functional website.", icon: <Code className="w-6 h-6" />, details: [ "Front-End (React/Next.js)", "CMS Integration (WordPress/Framer)", "API Integration", "Responsive & Performance Optimisation" ] },
        { step: "04", title: "Testing & QA", subtitle: "Ensuring Perfection", description: "Rigorous testing is conducted across multiple devices and browsers to ensure a bug-free, seamless, and performant user experience before launch.", icon: <CheckCircle className="w-6 h-6" />, details: [ "Cross-Browser & Device Testing", "Performance & Load Testing", "Functionality & User Testing", "Security & Code Audits" ] },
        { step: "05", title: "Deployment & Launch", subtitle: "Going Live", description: "We handle the entire deployment process, ensuring a smooth transition from development to a live environment, followed by post-launch checks.", icon: <Rocket className="w-6 h-6" />, details: [ "Server Configuration & Deployment", "Domain & DNS Management", "Final SEO & Analytics Setup", "Post-Launch Monitoring" ] }
    ];

    return (
        <section id="process" ref={sectionRef} className="py-24 quantum-process-section quantum-anim relative overflow-hidden">
            <div className="absolute inset-0 quantum-grid-animation"></div>
            
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                <div className="text-center mb-20">
                    <div className="section-title-container">
                        <h2 className="section-title-enhanced">
                            Our Development Process
                        </h2>
                        <div className="title-accent-line"></div>
                    </div>
                    <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
                        A transparent, collaborative, and agile approach to building world-class websites.
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

// V8 Contact Section: Adapted for Web Dev
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
            const subject = encodeURIComponent(`New Website Project Inquiry from ${formData.firstName} ${formData.lastName}`);
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
                        <h2 className="section-title-enhanced">Let's Build Your Website</h2>
                        <div className="title-accent-line"></div>
                    </div>
                    <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                        Have an idea for a project? We'd love to hear about it. Fill out the form below to get started.
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
                        <div className="form-group"><label htmlFor="message" className="form-label">Message *</label><textarea id="message" name="message" value={formData.message} onChange={handleInputChange} required rows={6} className="form-textarea" placeholder="Describe your project, your goals, and any key features you have in mind..."></textarea></div>
                        <div className="form-submit"><button type="submit" disabled={isSubmitting} className="neural-submit-button">{isSubmitting ? (<><div className="submit-spinner"></div><span>Sending...</span></>) : (<><span>Send Project Details</span><MoveRight className="ml-3 transition-transform duration-300" /></>)}</button></div>
                        {submitStatus === 'success' && (<div className="status-message success"><Mail className="w-5 h-5" /><span>Thank you! Your project details have been sent successfully.</span></div>)}
                        {submitStatus === 'error' && (<div className="status-message error"><X className="w-5 h-5" /><span>There was an error. Please try sending your message again.</span></div>)}
                    </form>
                </div>
                <div className="contact-details">
                    <div className="contact-detail-item"><Mail className="w-5 h-5 text-gray-400" /><span>info@bookedupmedia.com</span></div>
                    <div className="contact-detail-item"><Clock className="w-5 h-5 text-gray-400" /><span>Initial Response within 24 hours</span></div>
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

// V8 Footer: Updated Version
const QuantumFooter = () => {
    return (
        <footer className="quantum-footer relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
                <div className="footer-content">
                    <div className="footer-brand">
                        <h3 className="text-2xl font-bold text-white font-inter">BYLT.MEDIA</h3>
                        <p className="text-gray-400 mt-2">Architecting Digital Experiences</p>
                    </div>
                    
                    <div className="footer-legal">
                        <p className="text-gray-500">&copy; {new Date().getFullYear()} BYLT Media. All Rights Reserved.</p>
                        <div className="footer-version">
                            <span className="text-xs text-gray-600 font-mono">v9.2.0 // WebDev Synthesis</span>
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

// Main App Component for Website Development Page
const WebsiteDevelopmentPage = () => {
    return (
        <Layout>
            <Head>
                <title>Website Development Services | Custom React, WordPress & Framer | BYLT Media</title>
                <meta name="description" content="Expert website development services. We build custom React applications, user-friendly WordPress & Framer sites, and high-converting landing pages." />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <GlobalStyles />
            
            <WebDevHero />
            <OurDevServices />
            <WebDevProcess />
            <NeuralContact />
        </Layout>
    );
};

export default WebsiteDevelopmentPage;