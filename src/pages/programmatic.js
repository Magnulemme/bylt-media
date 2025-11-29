import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Layout from '../components/layout';
import GlobalStyles from '../components/globalsyles';
import {
    Menu, X, Mail, Phone, MapPin, ChevronLeft, ChevronRight, Star, ChevronDown, MoveRight,
    Briefcase, Workflow, TrendingUp, Search, Code, BrainCircuit, Lightbulb, Construction,
    Rocket, BarChart, Clock, Target, DollarSign, CheckCircle, Award, Image as ImageIcon, ShoppingCart, Youtube,
    Building, HeartPulse, Car, Plane, ShoppingBag, Utensils, Scale, Zap, Link, FileText, Share2, Bot, Cpu, Database,
    Home, Heart, Activity, Trello, Eye, SearchCode, TestTube2, ArrowUpRight, Atom, MessageSquare, Camera, Users, Palette, PenTool,
    Megaphone, Layers, Crosshair, BarChart3, Monitor, Smartphone, Tv
} from 'lucide-react';
// Removed unused Three.js import - saving ~600KB bundle size

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

// --- PROGRAMMATIC AD DISPLAY ANIMATION (TV & MOBILE ADS) ---
const ProgrammaticHeroAnimation = () => {
    const [buildStep, setBuildStep] = useState(0);
    const [isClient, setIsClient] = useState(false);
    
    useEffect(() => {
        setIsClient(true);
    }, []);
    
    useEffect(() => {
        if (!isClient) return;
        
        // Optimized timing - slightly increased interval for better performance
        const interval = setInterval(() => {
            setBuildStep(prev => (prev + 1) % 7);
        }, 1000); // Increased from 800ms to 1000ms for smoother performance
        return () => clearInterval(interval);
    }, []);

    // Render a simplified static version during SSR
    if (!isClient) {
        return (
            <div className="absolute inset-0 z-0 flex items-center justify-center">
                <div className="ad-display-container">
                    <div className="tv-mockup">
                        <div className="tv-screen">
                            <div className="tv-bezel">
                                <div className="tv-display">
                                    <div className="tv-ad-content">
                                        <div className="tv-ad-brand">
                                            <div className="tv-brand-logo"></div>
                                            <div className="tv-brand-text"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="tv-stand"></div>
                        </div>
                    </div>
                    
                    <div className="mobile-ad-mockup">
                        <div className="mobile-frame">
                            <div className="mobile-notch"></div>
                            <div className="mobile-speaker"></div>
                            <div className="mobile-ad-content">
                                <div className="mobile-app-header">
                                    <div className="mobile-app-icon"></div>
                                    <div className="mobile-app-title"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="absolute inset-0 z-0 flex items-center justify-center">
            <div className="ad-display-container">
                {/* Code particles background */}
                <div className="code-particles">
                    {[...Array(8)].map((_, i) => (
                        <div 
                            key={i} 
                            className="code-particle"
                            style={{
                                left: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 8}s`,
                                animationDuration: `${12 + Math.random() * 6}s`
                            }}
                        >
                            {['<AD>', '</AD>', '{...}', 'CTV', 'DSP', 'RTB'][Math.floor(Math.random() * 6)]}
                        </div>
                    ))}
                </div>

                {/* Left side - TV mockup */}
                <div className="tv-mockup">
                    <div className="tv-screen built">
                        <div className="tv-bezel">
                            <div className="tv-display">
                                <div className="tv-ad-content built">
                                    <div className="tv-ad-brand">
                                        <div className="tv-brand-logo"></div>
                                        <div className="tv-brand-text"></div>
                                    </div>
                                    
                                    <div className="tv-ad-visual built">
                                        <div className="tv-product-showcase">
                                            <div className="tv-product"></div>
                                            <div className="tv-product-details">
                                                <div className="tv-detail-line"></div>
                                                <div className="tv-detail-line short"></div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="tv-ad-cta built">
                                        <div className="tv-cta-button">SHOP NOW</div>
                                        <div className="tv-offer-text">LIMITED TIME</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="tv-stand"></div>
                    </div>
                </div>

                {/* Right side - Mobile mockup */}
                <div className="mobile-ad-mockup">
                    {/* Mobile frame */}
                    <div className="mobile-frame built">
                        <div className="mobile-notch"></div>
                        <div className="mobile-speaker"></div>
                        
                        {/* Mobile ad content */}
                        <div className="mobile-ad-content">
                            {/* App interface */}
                            <div className="mobile-app-header built">
                                <div className="mobile-app-icon"></div>
                                <div className="mobile-app-title"></div>
                                <div className="mobile-menu-dots">⋯</div>
                            </div>

                            {/* Native ad */}
                            <div className="mobile-native-ad built">
                                <div className="mobile-ad-label">Sponsored</div>
                                <div className="mobile-ad-image"></div>
                                <div className="mobile-ad-text">
                                    <div className="mobile-ad-headline"></div>
                                    <div className="mobile-ad-description"></div>
                                </div>
                                <div className="mobile-ad-button">Learn More</div>
                            </div>

                            {/* App content */}
                            <div className="mobile-app-content built">
                                <div className="mobile-content-block">
                                    <div className="mobile-content-item"></div>
                                    <div className="mobile-content-item"></div>
                                </div>
                            </div>

                            {/* Banner ad */}
                            <div className="mobile-banner-ad built">
                                <div className="mobile-banner-content">
                                    <div className="mobile-banner-logo"></div>
                                    <div className="mobile-banner-text">Try Premium Free</div>
                                    <div className="mobile-banner-close">×</div>
                                </div>
                            </div>

                            {/* Bottom content */}
                            <div className="mobile-bottom-content built">
                                <div className="mobile-bottom-nav">
                                    <div className="mobile-nav-item active"></div>
                                    <div className="mobile-nav-item"></div>
                                    <div className="mobile-nav-item"></div>
                                    <div className="mobile-nav-item"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Campaign progress indicator */}
                <div className="campaign-progress">
                    <div className="progress-text">Delivering Targeted Ads...</div>
                    <div className="progress-bar">
                        <div 
                            className="progress-fill" 
                            style={{ width: '100%' }}
                        ></div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .ad-display-container {
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
                    transform: translateZ(0); /* Hardware acceleration */
                    will-change: transform;
                    contain: layout style paint;
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
                        transform: translate3d(-20px, 120vh, 0); /* Hardware-accelerated */
                        opacity: 0;
                    }
                    25% {
                        opacity: 0.2;
                    }
                    75% {
                        opacity: 0.2;
                    }
                    to {
                        transform: translate3d(20px, -120px, 0); /* Hardware-accelerated */
                        opacity: 0;
                    }
                }

                /* TV mockup - left side */
                .tv-mockup {
                    position: relative;
                    z-index: 2;
                    width: 320px;
                    height: 220px;
                    transform: perspective(800px) rotateY(15deg) translateZ(0); /* Hardware acceleration */
                    will-change: transform;
                }

                .tv-screen {
                    width: 100%;
                    height: 100%;
                    opacity: 0.1;
                    transform: scale(0.9) translateZ(0); /* Hardware acceleration */
                    transition: all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1);
                    will-change: transform, opacity;
                }

                .tv-screen.built {
                    opacity: 1;
                    transform: scale(1);
                }

                .tv-bezel {
                    width: 280px;
                    height: 160px;
                    background: rgba(30, 41, 59, 0.6);
                    border: 6px solid rgba(55, 65, 81, 0.8);
                    border-radius: 12px;
                    overflow: hidden;
                    backdrop-filter: blur(5px);
                    position: relative;
                }

                .tv-display {
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(135deg, rgba(15, 23, 42, 0.9), rgba(30, 41, 59, 0.8));
                    position: relative;
                }

                .tv-stand {
                    width: 80px;
                    height: 40px;
                    background: rgba(55, 65, 81, 0.6);
                    margin: 10px auto 0;
                    border-radius: 0 0 6px 6px;
                    position: relative;
                }

                .tv-stand::before {
                    content: '';
                    position: absolute;
                    bottom: -20px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 120px;
                    height: 8px;
                    background: rgba(55, 65, 81, 0.4);
                    border-radius: 4px;
                }

                .tv-ad-content, .tv-ad-visual, .tv-ad-cta {
                    opacity: 0;
                    transform: translateY(15px) scale(0.8);
                    transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
                }

                .tv-ad-content.built, .tv-ad-visual.built, .tv-ad-cta.built {
                    opacity: 1;
                    transform: translateY(0) scale(1);
                }

                .tv-ad-content {
                    padding: 16px;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                }

                .tv-ad-brand {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    margin-bottom: 12px;
                }

                .tv-brand-logo {
                    width: 24px;
                    height: 24px;
                    background: #B8FFFA;
                    border-radius: 4px;
                }

                .tv-brand-text {
                    width: 60px;
                    height: 8px;
                    background: rgba(255, 255, 255, 0.6);
                    border-radius: 2px;
                }

                .tv-product-showcase {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    flex: 1;
                }

                .tv-product {
                    width: 60px;
                    height: 60px;
                    background: linear-gradient(45deg, rgba(184, 255, 250, 0.2), rgba(184, 255, 250, 0.1));
                    border-radius: 8px;
                    border: 1px solid rgba(184, 255, 250, 0.2);
                }

                .tv-product-details {
                    flex: 1;
                }

                .tv-detail-line {
                    height: 6px;
                    background: rgba(255, 255, 255, 0.4);
                    border-radius: 1px;
                    margin-bottom: 4px;
                }

                .tv-detail-line.short {
                    width: 60%;
                    background: rgba(255, 255, 255, 0.3);
                }

                .tv-ad-cta {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-top: 12px;
                }

                .tv-cta-button {
                    background: #B8FFFA;
                    color: #1e293b;
                    padding: 4px 12px;
                    border-radius: 4px;
                    font-size: 8px;
                    font-weight: bold;
                    font-family: 'Inter', sans-serif;
                }

                .tv-offer-text {
                    color: #fbbf24;
                    font-size: 6px;
                    font-weight: bold;
                    font-family: 'Inter', sans-serif;
                }

                /* Mobile mockup - right side */
                .mobile-ad-mockup {
                    position: relative;
                    z-index: 2;
                    width: 180px;
                    transform: perspective(800px) rotateY(-15deg);
                }

                .mobile-frame {
                    width: 160px;
                    height: 320px;
                    background: rgba(30, 41, 59, 0.6);
                    border: 4px solid rgba(55, 65, 81, 0.8);
                    border-radius: 24px;
                    overflow: hidden;
                    backdrop-filter: blur(5px);
                    position: relative;
                    opacity: 0.1;
                    transform: translateY(-15px) scale(0.9);
                    transition: all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1);
                }

                .mobile-frame.built {
                    opacity: 1;
                    transform: translateY(0) scale(1);
                }

                .mobile-notch {
                    position: absolute;
                    top: 8px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 40px;
                    height: 6px;
                    background: rgba(55, 65, 81, 0.8);
                    border-radius: 3px;
                    z-index: 10;
                }

                .mobile-speaker {
                    position: absolute;
                    top: 18px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 20px;
                    height: 2px;
                    background: rgba(55, 65, 81, 0.6);
                    border-radius: 1px;
                    z-index: 10;
                }

                .mobile-ad-content {
                    padding: 28px 8px 8px 8px;
                    height: 100%;
                    background: linear-gradient(135deg, rgba(15, 23, 42, 0.9), rgba(30, 41, 59, 0.8));
                }

                .mobile-app-header, .mobile-native-ad, .mobile-app-content, .mobile-banner-ad, .mobile-bottom-content {
                    opacity: 0;
                    transform: translateY(20px) scale(0.85);
                    transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
                }

                .mobile-app-header.built, .mobile-native-ad.built, .mobile-app-content.built, .mobile-banner-ad.built, .mobile-bottom-content.built {
                    opacity: 1;
                    transform: translateY(0) scale(1);
                }

                .mobile-app-header {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 8px;
                    margin-bottom: 12px;
                    background: rgba(55, 65, 81, 0.2);
                    border-radius: 6px;
                }

                .mobile-app-icon {
                    width: 16px;
                    height: 16px;
                    background: #B8FFFA;
                    border-radius: 3px;
                }

                .mobile-app-title {
                    width: 40px;
                    height: 6px;
                    background: rgba(255, 255, 255, 0.6);
                    border-radius: 1px;
                }

                .mobile-menu-dots {
                    color: rgba(255, 255, 255, 0.4);
                    font-size: 8px;
                }

                .mobile-native-ad {
                    background: rgba(55, 65, 81, 0.15);
                    border: 1px solid rgba(184, 255, 250, 0.1);
                    border-radius: 8px;
                    padding: 8px;
                    margin-bottom: 12px;
                }

                .mobile-ad-label {
                    font-size: 5px;
                    color: #9ca3af;
                    margin-bottom: 6px;
                    font-family: 'Inter', sans-serif;
                }

                .mobile-ad-image {
                    width: 100%;
                    height: 40px;
                    background: linear-gradient(45deg, rgba(184, 255, 250, 0.1), rgba(184, 255, 250, 0.05));
                    border-radius: 4px;
                    margin-bottom: 6px;
                    border: 1px solid rgba(184, 255, 250, 0.1);
                }

                .mobile-ad-headline {
                    width: 80%;
                    height: 6px;
                    background: rgba(255, 255, 255, 0.7);
                    border-radius: 1px;
                    margin-bottom: 3px;
                }

                .mobile-ad-description {
                    width: 60%;
                    height: 4px;
                    background: rgba(255, 255, 255, 0.4);
                    border-radius: 1px;
                    margin-bottom: 6px;
                }

                .mobile-ad-button {
                    background: #B8FFFA;
                    color: #1e293b;
                    padding: 3px 8px;
                    border-radius: 3px;
                    font-size: 6px;
                    font-weight: bold;
                    text-align: center;
                    font-family: 'Inter', sans-serif;
                }

                .mobile-app-content {
                    margin-bottom: 12px;
                }

                .mobile-content-block {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 6px;
                }

                .mobile-content-item {
                    height: 32px;
                    background: rgba(184, 255, 250, 0.06);
                    border-radius: 4px;
                    border: 1px solid rgba(184, 255, 250, 0.08);
                }

                .mobile-banner-ad {
                    background: rgba(55, 65, 81, 0.2);
                    border: 1px solid rgba(184, 255, 250, 0.1);
                    border-radius: 6px;
                    padding: 6px;
                    margin-bottom: 12px;
                }

                .mobile-banner-content {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }

                .mobile-banner-logo {
                    width: 12px;
                    height: 12px;
                    background: #B8FFFA;
                    border-radius: 2px;
                }

                .mobile-banner-text {
                    color: #B8FFFA;
                    font-size: 6px;
                    font-weight: bold;
                    font-family: 'Inter', sans-serif;
                }

                .mobile-banner-close {
                    color: #9ca3af;
                    font-size: 8px;
                    font-weight: bold;
                }

                .mobile-bottom-nav {
                    display: flex;
                    justify-content: space-around;
                    padding: 8px 0;
                    border-top: 1px solid rgba(55, 65, 81, 0.3);
                }

                .mobile-nav-item {
                    width: 16px;
                    height: 4px;
                    background: rgba(255, 255, 255, 0.2);
                    border-radius: 1px;
                }

                .mobile-nav-item.active {
                    background: #B8FFFA;
                }

                .campaign-progress {
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
                    .ad-display-container {
                        padding: 0 2rem;
                        opacity: 0.2;
                    }
                    
                    .tv-mockup {
                        width: 240px;
                        height: 160px;
                    }
                    
                    .tv-bezel {
                        width: 200px;
                        height: 120px;
                    }
                    
                    .mobile-ad-mockup {
                        width: 140px;
                    }
                    
                    .mobile-frame {
                        width: 120px;
                        height: 240px;
                    }
                }

                @media (max-width: 768px) {
                    .ad-display-container {
                        flex-direction: column;
                        gap: 2rem;
                        padding: 1rem;
                        opacity: 0.15;
                    }
                    
                    .tv-mockup {
                        width: 200px;
                        height: 130px;
                        transform: perspective(600px) rotateY(10deg);
                    }
                    
                    .tv-bezel {
                        width: 160px;
                        height: 100px;
                    }
                    
                    .mobile-ad-mockup {
                        width: 120px;
                        transform: perspective(600px) rotateY(-10deg);
                    }
                    
                    .mobile-frame {
                        width: 100px;
                        height: 200px;
                    }
                    
                    .campaign-progress {
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


// Programmatic Hero Section
const ProgrammaticHero = () => {
    const [textIndex, setTextIndex] = useState(0);
    const texts = [
        "Reach Your Audience, Precisely",
        "Automated Media Buying",
        "Data-Driven Advertising"
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setTextIndex(prev => (prev + 1) % texts.length);
        }, 8000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden hero-section">
            <ProgrammaticHeroAnimation />
            <div className="absolute inset-0 hero-overlay-1 z-10"></div>
            <div className="relative z-20 text-center text-white max-w-5xl mx-auto px-4">
                <div className="mb-8">
                    <div className="text-xs tracking-widest text-gray-400 mb-4 font-inter glitch-text">
                        BYLT.MEDIA // PROGRAMMATIC ADVERTISING
                    </div>
                    <h1 className="text-6xl md:text-8xl font-bold mb-6 font-inter hero-title">
                        <span className="quantum-text" key={textIndex}>
                            {texts[textIndex]}
                        </span>
                    </h1>
                    <p className="text-lg md:text-xl mb-8 text-gray-200 max-w-4xl mx-auto hero-subtitle leading-relaxed">
                        We leverage cutting-edge technology to automate your ad buying, targeting the right audience with the right message at the right time, across any device.
                    </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center hero-cta">
                    <a href="#contact" className="quantum-button-hero">
                        <span>Launch a Campaign</span>
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

// The Programmatic Advantage Section
const TheProgrammaticAdvantage = () => {
    const sectionRef = useQuantumScrollAnim();
    return (
        <section ref={sectionRef} id="services" className="py-24 bg-slate-900/30 relative quantum-anim overflow-hidden">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <div className="section-title-container">
                        <h2 className="section-title-enhanced">The Programmatic Advantage</h2>
                        <div className="title-accent-line"></div>
                    </div>
                    <p className="text-lg text-gray-400 max-w-3xl mx-auto">
                        Move beyond traditional media buying. Programmatic advertising offers unparalleled precision, efficiency, and scale to maximise your marketing impact.
                    </p>
                </div>
                <div className="grid md:grid-cols-3 gap-8 text-center">
                    <div className="info-card">
                        <div className="info-card-icon"><Crosshair /></div>
                        <h3 className="text-xl font-bold text-white mb-2">Precision Targeting</h3>
                        <p className="text-gray-400">
                            Utilise vast data sets to target users based on demographics, interests, intent, and behaviour for hyper-relevant ad delivery.
                        </p>
                    </div>
                    <div className="info-card">
                        <div className="info-card-icon"><TrendingUp /></div>
                        <h3 className="text-xl font-bold text-white mb-2">Real-Time Optimisation</h3>
                        <p className="text-gray-400">
                            Leverage machine learning to analyse performance in real-time and automatically shift budget to the best-performing tactics.
                        </p>
                    </div>
                    <div className="info-card">
                        <div className="info-card-icon"><Layers /></div>
                        <h3 className="text-xl font-bold text-white mb-2">Unmatched Scale & Reach</h3>
                        <p className="text-gray-400">
                            Access a massive inventory of ad space across display, video, mobile, audio, and connected TV from a single platform.
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


// Our Programmatic Services Section
const OurProgrammaticServices = () => {
    const sectionRef = useQuantumScrollAnim();
    const services = [
        { icon: <Briefcase />, name: "Programmatic Strategy", description: "We develop a bespoke programmatic strategy that aligns with your business goals, target audience, and budget." },
        { icon: <Users />, name: "Audience Management", description: "We build and manage high-value audience segments using your first-party data and our access to third-party data marketplaces." },
        { icon: <Palette />, name: "Dynamic Creative", description: "Serve personalised ad creatives that automatically adapt based on user data, context, and behaviour to maximise relevance and impact." },
        { icon: <Megaphone />, name: "Multi-Channel Activation", description: "Execute campaigns across display, video, connected TV (CTV), digital audio, and digital out-of-home (DOOH) advertising." },
        { icon: <Zap />, name: "Campaign Management & Optimisation", description: "Our experts manage your campaigns daily, using AI and manual oversight to optimize towards your most important KPIs." },
        { icon: <BarChart3 />, name: "Advanced Reporting", description: "Gain full transparency with custom dashboards and in-depth reports that clearly demonstrate performance and ROI." },
    ];

    return (
        <section ref={sectionRef} className="py-24 bg-slate-900/50 relative quantum-anim overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <div className="section-title-container">
                        <h2 className="section-title-enhanced">Our Programmatic Services</h2>
                        <div className="title-accent-line"></div>
                    </div>
                    <p className="text-lg text-gray-400 max-w-3xl mx-auto">
                        A full-funnel, channel-agnostic approach to programmatic media buying, managed by a team of dedicated experts.
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

// Our Programmatic Process Section
const ProgrammaticProcess = () => {
    const [activeStep, setActiveStep] = useState(null);
    const sectionRef = useQuantumScrollAnim();
    
    const processSteps = [
        { step: "01", title: "Strategy & Planning", subtitle: "Defining the Blueprint", description: "We start with a deep dive into your business goals, audience, and market to create a data-driven programmatic media plan.", icon: <Search className="w-6 h-6" />, details: [ "Goal & KPI definition", "Audience research & insights", "Channel & format selection", "Measurement framework setup" ] },
        { step: "02", title: "Audience & Data", subtitle: "Finding Your Customers", description: "We leverage first, second, and third-party data to build precise audience segments, ensuring your message reaches the most relevant users.", icon: <Users className="w-6 h-6" />, details: [ "1st-party data integration (CRM, CDP)", "3rd-party data sourcing", "Contextual & keyword targeting", "Lookalike model creation" ] },
        { step: "03", title: "Campaign Activation", subtitle: "Going Live", description: "Our team handles the technical setup across Demand-Side Platforms (DSPs), implementing tracking, and launching your campaigns flawlessly.", icon: <Rocket className="w-6 h-6" />, details: [ "DSP campaign setup", "Pixel & conversion tracking", "Creative trafficking", "Brand safety implementation" ] },
        { step: "04", title: "Optimisation & Management", subtitle: "Driving Performance", description: "We continuously monitor campaign performance, using AI and human expertise to make real-time adjustments to bids, budgets, and targeting.", icon: <TrendingUp className="w-6 h-6" />, details: [ "Real-time bid management", "Performance pacing & analysis", "Frequency capping & ad sequencing", "A/B testing of creative & targeting" ] },
        { step: "05", title: "Insight & Reporting", subtitle: "Measuring What Matters", description: "We deliver transparent, easy-to-understand reports and dashboards that go beyond clicks to show true business impact and ROI.", icon: <BarChart3 className="w-6 h-6" />, details: [ "Custom performance dashboards", "Cross-channel attribution analysis", "Audience insight reporting", "Strategic recommendations" ] }
    ];

    return (
        <section id="process" ref={sectionRef} className="py-24 quantum-process-section quantum-anim relative overflow-hidden">
            <div className="absolute inset-0 quantum-grid-animation"></div>
            
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                <div className="text-center mb-20">
                    <div className="section-title-container">
                        <h2 className="section-title-enhanced">
                            Our Programmatic Process
                        </h2>
                        <div className="title-accent-line"></div>
                    </div>
                    <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
                        Our transparent, end-to-end process ensures your programmatic investment is strategic, efficient, and aligned with your business objectives.
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

// Contact Section (Updated for Programmatic)
const ProgrammaticContact = () => {
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
            const subject = encodeURIComponent(`New Programmatic Advertising Inquiry from ${formData.firstName} ${formData.lastName}`);
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
                        <h2 className="section-title-enhanced">Activate Your Programmatic Strategy</h2>
                        <div className="title-accent-line"></div>
                    </div>
                    <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                        Ready to harness the power of programmatic advertising? Tell us about your goals, and we'll build a custom media plan for you.
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
                        <div className="form-group"><label htmlFor="message" className="form-label">Message *</label><textarea id="message" name="message" value={formData.message} onChange={handleInputChange} required rows={6} className="form-textarea" placeholder="Tell us about your advertising goals, target audience, and any previous campaign experience..."></textarea></div>
                        <div className="form-submit">
                            <button type="submit" disabled={isSubmitting} className="neural-submit-button">
                                {isSubmitting ? (<><div className="submit-spinner"></div><span>Sending...</span></>) : (<><span>Request a Media Plan</span><MoveRight className="ml-3 transition-transform duration-300" /></>)}
                            </button>
                        </div>
                        {submitStatus === 'success' && (<div className="status-message success"><Mail className="w-5 h-5" /><span>Thank you! Your message has been prepared. Please complete sending it in your mail client.</span></div>)}
                        {submitStatus === 'error' && (<div className="status-message error"><X className="w-5 h-5" /><span>There was an error. Please try sending an email directly.</span></div>)}
                    </form>
                </div>
                <div className="contact-details">
                    <div className="contact-detail-item"><Mail className="w-5 h-5 text-gray-400" /><span>info@bookedupmedia.com</span></div>
                    <div className="contact-detail-item"><Clock className="w-5 h-5 text-gray-400" /><span>Media Desk Open 24/7</span></div>
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

// Main App Component for Programmatic Page
const ProgrammaticPage = () => {
    return (
        <Layout>
            <Head>
                <title>Programmatic Advertising Services | BYLT Media</title>
                <meta name="description" content="Reach your target audience with precision and scale using our data-driven programmatic advertising and media buying services." />
                <link rel="icon" href="/favicon.ico" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
            </Head>
            <GlobalStyles />

            <main>
                <ProgrammaticHero />
                <TheProgrammaticAdvantage />
                <OurProgrammaticServices />
                <ProgrammaticProcess />
                <ProgrammaticContact />
            </main>
        </Layout>
    );
};

export default ProgrammaticPage;
