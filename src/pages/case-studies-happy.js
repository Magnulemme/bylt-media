import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/layout';
import GlobalStyles from '../components/globalsyles';
import {
    Menu, X, Mail, Phone, MapPin, ChevronLeft, ChevronRight, Star, ChevronDown, MoveRight,
    Briefcase, Workflow, TrendingUp, Search, Code, BrainCircuit, Lightbulb, Construction,
    Rocket, BarChart, Clock, Target, DollarSign, CheckCircle, Award, Image as ImageIcon,
    ShoppingCart, Youtube, Building, HeartPulse, Car, Plane, ShoppingBag, Utensils, Scale,
    Zap, FileText, Share2, Bot, Cpu, Database, Users, TestTube, Filter, MousePointerClick, Globe,
    Eye, Play, Monitor
} from 'lucide-react';

// --- HOOKS & PAGE COMPONENTS ---

// Custom Hook for Advanced Scroll Animations
const useQuantumScrollAnim = (threshold = 0.1, delay = 0) => {
    const ref = useRef(null);
    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        let rafId;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    const timeoutId = setTimeout(() => {
                        rafId = requestAnimationFrame(() => {
                            element.classList.add('quantum-visible');
                        });
                    }, delay);
                    observer.unobserve(element);
                    return () => clearTimeout(timeoutId);
                }
            },
            { threshold, rootMargin: '50px 0px' }
        );
        observer.observe(element);
        return () => {
            if (element) {
                observer.unobserve(element);
            }
            if (rafId) {
                cancelAnimationFrame(rafId);
            }
        };
    }, [ref, threshold, delay]);
    return ref;
};

// Enhanced Interactive Case Study Hero Section
const CaseStudyHero = () => {
    const [currentStat, setCurrentStat] = useState(0);
    const heroRef = useQuantumScrollAnim();
    
    const stats = [
        { value: "16.6M", label: "Total Impressions", icon: Eye },
        { value: "175K", label: "Clicks Generated", icon: MousePointerClick },
        { value: "21.8K", label: "Menu Page Views", icon: Utensils },
        { value: "€0.34", label: "Average Cost Per Click", icon: Target }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentStat((prev) => (prev + 1) % stats.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [stats.length]);

    return (
        <section id="home" ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden quantum-anim hero-section pt-20">
            {/* Case study background image */}
            <div className="absolute inset-0 z-0">
                <img 
                    src="/images/casestudy/happy-case-study.webp" 
                    alt="Happy Bar & Grill Case Study"
                    className="w-full h-full object-cover opacity-40"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-slate-900/20 via-slate-900/50 to-slate-900/80"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900/60 via-transparent to-slate-900/60"></div>
            </div>
            
            {/* Lighter overlay for better image visibility */}
            <div className="absolute inset-0 bg-slate-900/30 z-10"></div>

            {/* Dynamic Data Visualization Animation - Positioned away from text */}
            <div className="pointer-events-none absolute inset-0 z-5 overflow-hidden">
                {/* Animated Grid Background */}
                <div className="absolute inset-0 opacity-15">
                    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <defs>
                            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-cyan-400" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#grid)" className="animate-grid-pulse" />
                    </svg>
                </div>

                {/* Enhanced Floating Data Bars - Optimized count */}
                <div className="absolute inset-0">
                    {[...Array(5)].map((_, i) => (
                        <div
                            key={`bar-${i}`}
                            className="absolute bg-gradient-to-t from-cyan-500 to-sky-400 rounded-t-sm animate-data-bar opacity-50"
                            style={{
                                left: `${5 + i * 18}%`,
                                bottom: '10%',
                                width: '3px',
                                height: `${20 + (i * 15) % 60}px`,
                                animationDelay: `${i * 0.4}s`,
                                animationDuration: '4s',
                                transform: 'translateZ(0)', // Hardware acceleration
                                willChange: 'transform'
                            }}
                        />
                    ))}
                    {/* Second row of bars - Optimized count */}
                    {[...Array(4)].map((_, i) => (
                        <div
                            key={`bar2-${i}`}
                            className="absolute bg-gradient-to-t from-teal-500 to-emerald-400 rounded-t-sm animate-data-bar-alt opacity-40"
                            style={{
                                left: `${85 + i * 3}%`,
                                top: `${15 + i * 5}%`,
                                width: '2px',
                                height: `${25 + (i * 10) % 40}px`,
                                animationDelay: `${i * 0.7}s`,
                                animationDuration: '3.5s',
                                transform: 'translateZ(0)', // Hardware acceleration
                                willChange: 'transform'
                            }}
                        />
                    ))}
                </div>

                {/* Enhanced Orbiting Elements - Moved to corners */}
                <div className="absolute top-[15%] left-[8%] w-32 h-32">
                    <div className="relative w-full h-full animate-orbit-slow">
                        <div className="absolute top-0 left-1/2 w-3 h-3 bg-cyan-400 rounded-full transform -translate-x-1/2 animate-pulse shadow-lg shadow-cyan-400/50 opacity-60"></div>
                        <div className="absolute bottom-0 right-0 w-2 h-2 bg-sky-400 rounded-full animate-pulse shadow-lg shadow-sky-400/50 opacity-60" style={{animationDelay: '0.5s'}}></div>
                        <div className="absolute top-1/2 left-0 w-2 h-2 bg-teal-400 rounded-full transform -translate-y-1/2 animate-pulse shadow-lg shadow-teal-400/50 opacity-60" style={{animationDelay: '1s'}}></div>
                    </div>
                </div>

                <div className="absolute top-[20%] right-[5%] w-28 h-28">
                    <div className="relative w-full h-full animate-orbit-fast">
                        <div className="absolute top-0 left-1/2 w-2 h-2 bg-emerald-400 rounded-full transform -translate-x-1/2 animate-pulse shadow-lg shadow-emerald-400/50 opacity-60" style={{animationDelay: '0.2s'}}></div>
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-blue-400 rounded-full animate-pulse shadow-lg shadow-blue-400/50 opacity-60" style={{animationDelay: '0.7s'}}></div>
                        <div className="absolute top-1/2 right-0 w-2 h-2 bg-cyan-400 rounded-full transform -translate-y-1/2 animate-pulse shadow-lg shadow-cyan-400/50 opacity-60" style={{animationDelay: '1.2s'}}></div>
                    </div>
                </div>

                <div className="absolute bottom-[20%] left-[5%] w-24 h-24">
                    <div className="relative w-full h-full animate-orbit-reverse">
                        <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-sky-400 rounded-full transform -translate-x-1/2 -translate-y-1/2 animate-pulse shadow-lg shadow-sky-400/50 opacity-60"></div>
                        <div className="absolute top-0 right-0 w-2 h-2 bg-teal-400 rounded-full animate-pulse shadow-lg shadow-teal-400/50 opacity-60" style={{animationDelay: '0.8s'}}></div>
                    </div>
                </div>

                {/* Enhanced Geometric Shapes - Reduced and repositioned */}
                <div className="absolute top-[10%] left-[2%] animate-geometric-float opacity-25">
                    <svg width="35" height="35" viewBox="0 0 35 35" className="text-cyan-400">
                        <polygon points="17.5,5 28,25 7,25" fill="currentColor" className="animate-shape-glow" />
                        <circle cx="17.5" cy="17.5" r="2" fill="white" opacity="0.6" />
                    </svg>
                </div>
                
                <div className="absolute bottom-[15%] right-[3%] animate-geometric-float opacity-20" style={{animationDelay: '1s'}}>
                    <svg width="30" height="30" viewBox="0 0 30 30" className="text-sky-400">
                        <rect x="5" y="5" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" className="animate-shape-glow" />
                        <circle cx="15" cy="15" r="8" fill="currentColor" opacity="0.1" className="animate-inner-pulse" />
                        <circle cx="15" cy="15" r="3" fill="white" opacity="0.7" />
                    </svg>
                </div>

                {/* Enhanced Data Connection Lines - Reduced opacity */}
                <svg className="absolute inset-0 w-full h-full opacity-15">
                    <g className="animate-connection-pulse">
                        <line x1="15%" y1="25%" x2="85%" y2="75%" stroke="currentColor" strokeWidth="1" className="text-cyan-400" strokeDasharray="8,4" />
                        <line x1="80%" y1="15%" x2="20%" y2="85%" stroke="currentColor" strokeWidth="1" className="text-sky-400" strokeDasharray="6,6" />
                    </g>
                </svg>

                {/* Floating Data Dots - Positioned at edges */}
                <div className="absolute inset-0">
                    {[...Array(8)].map((_, i) => (
                        <div
                            key={`dot-${i}`}
                            className="absolute rounded-full animate-data-float opacity-30"
                            style={{
                                left: `${5 + (i * 15) % 80}%`,
                                top: `${10 + (i * 12) % 20}%`,
                                width: `${2 + i % 3}px`,
                                height: `${2 + i % 3}px`,
                                backgroundColor: ['#22d3ee', '#38bdf8', '#06b6d4', '#14b8a6'][i % 4],
                                animationDelay: `${i * 0.4}s`,
                                animationDuration: '4s'
                            }}
                        />
                    ))}
                </div>
            </div>

            {/* Enhanced Animation Keyframes */}
            <style jsx global>{`
                @keyframes grid-pulse {
                    0%, 100% { opacity: 0.1; }
                    50% { opacity: 0.3; }
                }

                @keyframes data-bar {
                    0%, 100% { 
                        transform: translate3d(0, 0, 0) scaleY(0.4);
                        opacity: 0.5;
                    }
                    50% { 
                        transform: translate3d(0, -15px, 0) scaleY(1.2);
                        opacity: 0.9;
                    }
                }

                @keyframes data-bar-alt {
                    0%, 100% { 
                        transform: translate3d(0, 0, 0) scaleY(0.3) scaleX(1);
                        opacity: 0.4;
                    }
                    33% { 
                        transform: translate3d(0, -8px, 0) scaleY(0.8) scaleX(1.2);
                        opacity: 0.7;
                    }
                    66% { 
                        transform: translate3d(0, -12px, 0) scaleY(1.1) scaleX(0.8);
                        opacity: 0.8;
                    }
                }

                @keyframes orbit-slow {
                    0% { transform: rotate3d(0, 0, 1, 0deg); }
                    100% { transform: rotate3d(0, 0, 1, 360deg); }
                }

                @keyframes orbit-fast {
                    0% { transform: rotate3d(0, 0, 1, 0deg); }
                    100% { transform: rotate3d(0, 0, 1, -360deg); }
                }

                @keyframes orbit-reverse {
                    0% { transform: rotate3d(0, 0, 1, 0deg) scale(1); }
                    50% { transform: rotate3d(0, 0, 1, -180deg) scale(1.1); }
                    100% { transform: rotate3d(0, 0, 1, -360deg) scale(1); }
                }

                @keyframes geometric-float {
                    0%, 100% { 
                        transform: translate3d(0, 0, 0) rotate3d(0, 0, 1, 0deg) scale(1);
                    }
                    25% { 
                        transform: translate3d(0, -20px, 0) rotate3d(0, 0, 1, 90deg) scale(1.1);
                    }
                    50% { 
                        transform: translate3d(0, -10px, 0) rotate3d(0, 0, 1, 180deg) scale(0.9);
                    }
                    75% { 
                        transform: translate3d(0, -25px, 0) rotate3d(0, 0, 1, 270deg) scale(1.05);
                    }
                }

                @keyframes connection-pulse {
                    0%, 100% { 
                        stroke-dashoffset: 0;
                        opacity: 0.2;
                    }
                    50% { 
                        stroke-dashoffset: 25;
                        opacity: 0.6;
                    }
                }

                @keyframes shape-glow {
                    0%, 100% { filter: drop-shadow(0 0 5px currentColor); }
                    50% { filter: drop-shadow(0 0 15px currentColor); }
                }

                @keyframes inner-pulse {
                    0%, 100% { transform: translate3d(0, 0, 0) scale(1); opacity: 0.2; }
                    50% { transform: translate3d(0, 0, 0) scale(1.3); opacity: 0.4; }
                }

                @keyframes data-float {
                    0%, 100% { 
                        transform: translate3d(0, 0, 0) scale(1);
                        opacity: 0.3;
                    }
                    25% { 
                        transform: translate3d(8px, -15px, 0) scale(1.2);
                        opacity: 0.6;
                    }
                    50% { 
                        transform: translate3d(-5px, -8px, 0) scale(0.8);
                        opacity: 0.8;
                    }
                    75% { 
                        transform: translate3d(3px, -20px, 0) scale(1.1);
                        opacity: 0.5;
                    }
                }

                .animate-grid-pulse { animation: grid-pulse 5s ease-in-out infinite; }
                .animate-data-bar { animation: data-bar 4s ease-in-out infinite; }
                .animate-data-bar-alt { animation: data-bar-alt 3.5s ease-in-out infinite; }
                .animate-orbit-slow { animation: orbit-slow 30s linear infinite; }
                .animate-orbit-fast { animation: orbit-fast 22s linear infinite; }
                .animate-orbit-reverse { animation: orbit-reverse 26s ease-in-out infinite; }
                .animate-geometric-float { animation: geometric-float 12s ease-in-out infinite; }
                .animate-connection-pulse { animation: connection-pulse 8s ease-in-out infinite; }
                .animate-shape-glow { animation: shape-glow 4s ease-in-out infinite; }
                .animate-inner-pulse { animation: inner-pulse 5s ease-in-out infinite; }
                .animate-data-float { animation: data-float 5s ease-in-out infinite; }
            `}</style>
            
            <div className="relative z-30 text-center text-white max-w-6xl mx-auto px-4">
                
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6">
                    <span className="block">Boosting Traffic and</span>
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-sky-500">Engagement</span>
                    <span className="block">for Happy Bar & Grill</span>
                </h1>
                
                <p className="max-w-3xl mx-auto text-lg md:text-xl text-slate-300 leading-relaxed mb-12">
                    How BYLT Media, <span className="text-cyan-300 font-semibold">in collaboration with Marketise Me</span>, enhanced website traffic and engagement for Bulgaria's most popular restaurant chain through strategic Google Ads campaigns focused on seasonal menus and location-specific pages.
                </p>

                <div className="relative h-48 md:h-40 mb-20 flex items-center justify-center">
                    {stats.map((stat, index) => {
                        const Icon = stat.icon;
                        const isActive = index === currentStat;
                        const isPrevious = index === (currentStat - 1 + stats.length) % stats.length;
                        const isNext = index === (currentStat + 1) % stats.length;
                        
                        let cardClasses = "absolute w-full max-w-md p-6 bg-slate-800/50 border border-slate-700 rounded-2xl backdrop-blur-lg transition-all duration-700 ease-out cursor-pointer";
                        let transformClasses = "";
                        
                        if (isActive) {
                            transformClasses = "opacity-100 scale-100 z-20";
                        } else if (isPrevious) {
                            transformClasses = "opacity-40 scale-75 -translate-x-32 z-10";
                        } else if (isNext) {
                            transformClasses = "opacity-40 scale-75 translate-x-32 z-10";
                        } else {
                            transformClasses = "opacity-0 scale-50 pointer-events-none";
                        }
                        
                        return (
                            <div 
                                key={index} 
                                className={`${cardClasses} ${transformClasses}`}
                                onClick={() => setCurrentStat(index)}
                            >
                                <div className="flex items-center justify-center gap-4">
                                    <div className="text-cyan-300 filter drop-shadow-[0_0_8px_rgba(103,232,249,0.5)]">
                                        <Icon size={isActive ? 48 : 36} />
                                    </div>
                                    <div className="text-left">
                                        <div className={`${isActive ? 'text-4xl' : 'text-2xl'} font-bold text-white transition-all duration-700`}>{stat.value}</div>
                                        <div className={`text-slate-400 ${isActive ? 'text-base' : 'text-sm'} transition-all duration-700`}>{stat.label}</div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div onClick={() => document.querySelector('#challenge')?.scrollIntoView({ behavior: 'smooth' })} className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 cursor-pointer group">
                <div className="w-6 h-10 border-2 border-cyan-400/60 rounded-full flex items-center justify-center relative">
                    <div className="w-1 h-2 bg-cyan-300 rounded-full animate-bounce"></div>
                </div>
            </div>
        </section>
    );
};

// Interactive Process Cards Component - Inspired by Homepage
const InteractiveProcess = () => {
    const [activeStep, setActiveStep] = useState(null);
    const processRef = useQuantumScrollAnim();
    
    const processSteps = [
        {
            step: "01",
            title: "Research & Analysis",
            subtitle: "Week 1-2",
            description: "Comprehensive analysis of traffic patterns and user engagement on seasonal menu and location pages.",
            icon: <Search className="w-6 h-6" />,
            details: [
                "Analysed low traffic to seasonal menu and location pages",
                "Identified lack of effective traffic-driving campaigns", 
                "Evaluated potential for local search optimisation",
                "Assessed opportunities for personalized user experiences",
                "Studied competitor restaurant marketing strategies"
            ],
            metrics: ["Traffic analysis completed", "Local search potential identified", "Personalization opportunities mapped"]
        },
        {
            step: "02", 
            title: "Campaign Strategy",
            subtitle: "Week 3-4",
            description: "Development of Google Ads awareness campaigns with local search optimisation and personalisation.",
            icon: <Target className="w-6 h-6" />,
            details: [
                "Designed Google Ads awareness campaigns",
                "Created local search optimisation strategy",
                "Developed personalized campaign concepts", 
                "Planned content focused on seasonal menus",
                "Established location-specific targeting parameters"
            ],
            metrics: ["Awareness campaigns designed", "Local search strategy created", "Personalization framework built"]
        },
        {
            step: "03",
            title: "Campaign Execution", 
            subtitle: "Week 5-8",
            description: "Implementation of targeted campaigns with content creation and real-time monitoring.",
            icon: <Rocket className="w-6 h-6" />,
            details: [
                "Launched Google Ads awareness campaigns",
                "Implemented local search campaigns for specific restaurants",
                "Created engaging content for seasonal menus",
                "Set up real-time campaign monitoring",
                "Deployed personalized user experience elements"
            ],
            metrics: ["Campaigns launched", "Local targeting activated", "Real-time monitoring setup"]
        },
        {
            step: "04",
            title: "Optimisation & Results",
            subtitle: "Week 9-12", 
            description: "Continuous campaign optimisation based on data insights and performance metrics.",
            icon: <TrendingUp className="w-6 h-6" />,
            details: [
                "Achieved 16.6M impressions across all campaigns",
                "Generated 175K clicks with excellent engagement",
                "Optimized campaigns based on real-time data",
                "Improved ROAS through targeted local search",
                "Enhanced user engagement with personalized content"
            ],
            metrics: ["16.6M impressions", "175K clicks generated", "ROAS improvement"]
        }
    ];

    return (
        <section id="process" ref={processRef} className="py-24 quantum-process-section quantum-anim relative overflow-hidden w-full">
            <div className="absolute inset-0 quantum-grid-animation w-full"></div>
            
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                <div className="text-center mb-20">
                    <div className="section-title-container">
                        <h2 className="section-title-enhanced">
                            Our Process
                        </h2>
                        <div className="title-accent-line"></div>
                    </div>
                    <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto">
                        A strategic approach to enhancing restaurant chain visibility and engagement through targeted digital campaigns.
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
                                        
                                        {/* Metrics Tags */}
                                        <div className="metrics-tags">
                                            {step.metrics.map((metric, i) => (
                                                <span key={i} className="metric-tag">
                                                    {metric}
                                                </span>
                                            ))}
                                        </div>
                                        
                                        {isActive && (
                                            <div className="step-expanded">
                                                <h4 className="expanded-title">Detailed Breakdown:</h4>
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
                .quantum-process-section { 
                    background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
                    position: relative; 
                    width: 100vw;
                    margin-left: calc(-50vw + 50%);
                    contain: layout style;
                    transform: translateZ(0); /* Hardware acceleration */
                    will-change: transform;
                }
                .quantum-grid-animation { 
                    background-image: linear-gradient(rgba(34, 211, 238, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(34, 211, 238, 0.05) 1px, transparent 1px); 
                    background-size: 50px 50px; 
                    opacity: 0.3; 
                    animation: gridMove 24s linear infinite;
                    width: 100%;
                    height: 100%;
                    transform: translateZ(0); /* Hardware acceleration */
                    will-change: transform;
                }
                @keyframes gridMove { 
                    from { transform: translate3d(0, 0, 0); } 
                    to { transform: translate3d(50px, 50px, 0); } 
                }
                .section-title-container {
                    margin-bottom: 1rem;
                }
                .section-title-enhanced {
                    font-size: 3rem;
                    font-weight: 800;
                    color: white;
                    margin: 0;
                    font-family: 'Inter', sans-serif;
                }
                .title-accent-line {
                    width: 80px;
                    height: 4px;
                    background: linear-gradient(90deg, #B8FFFA, #22d3ee);
                    margin: 1rem auto;
                    border-radius: 2px;
                }
                .process-timeline { 
                    position: relative; 
                    max-width: 800px; 
                    margin: 0 auto; 
                }
                .process-step { 
                    position: relative; 
                    margin-bottom: 2rem; 
                }
                .step-container { 
                    display: flex; 
                    align-items: flex-start; 
                    gap: 2rem; 
                }
                .step-number { 
                    width: 4rem; 
                    height: 4rem; 
                    border-radius: 50%; 
                    background: #374151; 
                    color: white; 
                    display: flex; 
                    align-items: center; 
                    justify-content: center; 
                    font-family: 'Inter', sans-serif; 
                    font-weight: 700; 
                    font-size: 1.1rem; 
                    cursor: pointer; 
                    transition: all 0.3s ease; 
                    flex-shrink: 0; 
                    z-index: 2; 
                    position: relative; 
                }
                .process-step.active .step-number, .step-number:hover { 
                    transform: translate3d(0, 0, 0) scale(1.1); 
                    background: #B8FFFA; 
                    color: #111; 
                    box-shadow: 0 0 20px rgba(184, 255, 250, 0.5);
                }
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
                }
                .process-step.active .step-card, .step-card:hover { 
                    border-color: #B8FFFA; 
                    box-shadow: 0 0 30px rgba(184, 255, 250, 0.1);
                }
                .step-header { 
                    display: flex; 
                    align-items: center; 
                    gap: 1rem; 
                    margin-bottom: 1rem; 
                }
                .step-icon-wrapper { 
                    width: 3rem; 
                    height: 3rem; 
                    background: #374151; 
                    border-radius: 12px; 
                    display: flex; 
                    align-items: center; 
                    justify-content: center; 
                    color: white; 
                    flex-shrink: 0; 
                    transition: all 0.3s ease; 
                }
                .process-step.active .step-icon-wrapper { 
                    background: #B8FFFA; 
                    color: #111; 
                }
                .step-text { 
                    flex: 1; 
                }
                .step-title { 
                    font-family: 'Inter', sans-serif; 
                    font-size: 1.25rem; 
                    font-weight: 700; 
                    color: white; 
                    margin: 0 0 0.25rem 0; 
                }
                .step-subtitle { 
                    font-size: 0.875rem; 
                    color: #9ca3af; 
                    font-weight: 500; 
                    margin: 0; 
                }
                .chevron { 
                    width: 1.25rem; 
                    height: 1.25rem; 
                    color: #9ca3af; 
                    transition: all 0.3s ease; 
                    flex-shrink: 0; 
                }
                .chevron.rotated { 
                    transform: rotate(180deg); 
                    color: #B8FFFA; 
                }
                .step-description { 
                    color: #d1d5db; 
                    line-height: 1.6; 
                    margin: 0 0 1rem 0; 
                }
                .metrics-tags {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.5rem;
                    margin-bottom: 1rem;
                }
                .metric-tag {
                    font-size: 0.75rem;
                    padding: 0.25rem 0.75rem;
                    background: rgba(184, 255, 250, 0.1);
                    color: #B8FFFA;
                    border-radius: 1rem;
                    border: 1px solid rgba(184, 255, 250, 0.2);
                }
                .step-expanded { 
                    border-top: 1px solid #374151; 
                    padding-top: 1rem; 
                    animation: fadeIn 0.3s ease-in-out; 
                }
                @keyframes fadeIn { 
                    from { opacity: 0; transform: translate3d(0, -10px, 0); } 
                    to { opacity: 1; transform: translate3d(0, 0, 0); } 
                }
                .expanded-title { 
                    font-size: 0.875rem; 
                    font-weight: 600; 
                    color: #B8FFFA; 
                    margin: 0 0 0.75rem 0; 
                    text-transform: uppercase; 
                    letter-spacing: 0.05em; 
                }
                .details-list { 
                    list-style: none; 
                    padding: 0; 
                    margin: 0; 
                }
                .detail-item { 
                    display: flex; 
                    align-items: flex-start; 
                    gap: 0.75rem; 
                    margin-bottom: 0.5rem; 
                    color: #e5e7eb; 
                    font-size: 0.875rem; 
                    line-height: 1.5; 
                    animation: slideIn 0.3s ease-in-out both; 
                }
                .detail-item:nth-child(1) { animation-delay: 0.1s; } 
                .detail-item:nth-child(2) { animation-delay: 0.2s; } 
                .detail-item:nth-child(3) { animation-delay: 0.3s; } 
                .detail-item:nth-child(4) { animation-delay: 0.4s; }
                .detail-item:nth-child(5) { animation-delay: 0.5s; }
                @keyframes slideIn { 
                    from { opacity: 0; transform: translate3d(-20px, 0, 0); } 
                    to { opacity: 1; transform: translate3d(0, 0, 0); } 
                }
                .bullet { 
                    color: #B8FFFA; 
                    font-weight: bold; 
                    font-size: 1.2rem; 
                    flex-shrink: 0; 
                    line-height: 1; 
                }
                .timeline-line { 
                    position: absolute; 
                    left: 2rem; 
                    top: 4rem; 
                    width: 2px; 
                    height: calc(100% - 2rem); 
                    background: #374151; 
                    z-index: 1; 
                }
                @media (max-width: 768px) {
                    .step-container { gap: 1rem; }
                    .step-number { width: 3rem; height: 3rem; font-size: 0.9rem; }
                    .step-card { padding: 1rem; }
                    .timeline-line { left: 1.5rem; }
                    .section-title-enhanced { font-size: 2rem; }
                }
            `}</style>
        </section>
    );
};

// Interactive Results Dashboard
const ResultsDashboard = () => {
    const dashboardRef = useRef(null);
    const [inView, setInView] = useState(false);

    const metrics = [
        { key: 'impressions', title: 'Total Impressions', value: 16581576, suffix: '', icon: Eye, color: 'text-cyan-400', bgColor: 'bg-cyan-400/10', borderColor: 'border-cyan-400/20' },
        { key: 'clicks', title: 'Clicks Generated', value: 175126, suffix: '', icon: MousePointerClick, color: 'text-sky-400', bgColor: 'bg-sky-400/10', borderColor: 'border-sky-400/20' },
        { key: 'menuViews', title: 'Menu Page Views', value: 21823, suffix: '', icon: Utensils, color: 'text-teal-400', bgColor: 'bg-teal-400/10', borderColor: 'border-teal-400/20' },
        { key: 'videoViews', title: 'Video Views', value: 362636, suffix: '', icon: Play, color: 'text-emerald-400', bgColor: 'bg-emerald-400/10', borderColor: 'border-emerald-400/20' }
    ];

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setInView(true);
                observer.disconnect();
            }
        }, { threshold: 0.3 });
        if (dashboardRef.current) observer.observe(dashboardRef.current);
        return () => {
            if(dashboardRef.current) observer.unobserve(dashboardRef.current)
        };
    }, []);

    return (
        <div id="results" ref={dashboardRef} className="py-16">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-white">The Results</h2>
            <p className="text-lg text-slate-400 text-center mb-12 max-w-2xl mx-auto">Outstanding performance metrics that significantly enhanced Happy Bar & Grill's digital presence and engagement.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {metrics.map((metric, index) => {
                    const Icon = metric.icon;
                    return (
                        <div key={metric.key} className={`p-6 rounded-2xl border ${metric.borderColor} ${metric.bgColor} backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-slate-800/50 quantum-anim ${inView ? 'quantum-visible' : ''}`} style={{ transitionDelay: `${index * 100}ms`}}>
                            <div className="flex items-center justify-between mb-4">
                                <div className={`p-3 rounded-full ${metric.bgColor} border ${metric.borderColor}`}>
                                    <Icon className={`w-6 h-6 ${metric.color}`} />
                                </div>
                                <TrendingUp className="w-6 h-6 text-green-500" />
                            </div>
                            <div className={`text-4xl font-extrabold ${metric.color} mb-1`}>
                                {metric.prefix}{metric.value.toLocaleString()}{metric.suffix}
                            </div>
                            <p className="text-white font-semibold">{metric.title}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

// Case Study Content Section
const CaseStudyContent = () => {
    const sectionRef = useQuantumScrollAnim();

    return(
        <section ref={sectionRef} className="py-24 bg-slate-900/50 quantum-anim relative z-10 w-full">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Client Information Cards */}
                <div className="mb-16">
                    <h2 className="text-3xl font-bold text-white mb-8 text-center">Project Overview</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                        {[
                            { title: 'Client', value: 'Happy Bar & Grill', icon: Building },
                            { title: 'Industry', value: 'Restaurant Chain', icon: Utensils },
                            { title: 'Duration', value: '12 Weeks', icon: Clock },
                            { title: 'Team Size', value: '4 Specialists', icon: Users },
                            { title: 'Platforms', value: 'Google Ads', icon: Globe }
                        ].map((item, index) => {
                            const Icon = item.icon;
                            return (
                                <div key={item.title} className="p-6 bg-slate-800/50 border border-slate-700 rounded-2xl hover:border-cyan-400/50 hover:bg-slate-700/50 transition-all duration-300 hover:scale-105 group">
                                    <div className="flex flex-col items-center text-center">
                                        <div className="p-3 bg-cyan-400/10 rounded-full mb-4 group-hover:bg-cyan-400/20 transition-colors">
                                            <Icon className="w-6 h-6 text-cyan-400" />
                                        </div>
                                        <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">{item.title}</h3>
                                        <p className="text-lg text-white font-bold group-hover:text-cyan-300 transition-colors">{item.value}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    
                    {/* Services Section */}
                    <div className="mt-8 p-6 bg-slate-800/50 border border-slate-700 rounded-2xl hover:border-cyan-400/50 transition-all duration-300">
                        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-3">
                            <Briefcase className="w-5 h-5 text-cyan-400" />
                            Services Delivered
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {[
                                { name: 'Google Ads Awareness Campaigns', icon: Target },
                                { name: 'Local Search Optimization', icon: MapPin },
                                { name: 'Personalized User Experiences', icon: Users }
                            ].map((service, index) => {
                                const Icon = service.icon;
                                return (
                                    <div key={service.name} className="flex items-center gap-3 p-4 bg-slate-700/50 rounded-xl hover:bg-slate-600/50 transition-colors">
                                        <Icon className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                                        <span className="text-white font-medium text-sm">{service.name}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* The Challenge Section */}
                <div className="mb-16" id="challenge">
                    <h2 className="text-3xl font-bold text-white mb-6 border-l-4 border-cyan-400 pl-4">The Challenge</h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                        <div>
                            <p className="text-lg text-slate-300 leading-relaxed mb-6">
                                Happy Bar & Grill, Bulgaria's most popular restaurant chain, needed to increase website traffic and engagement, particularly for seasonal menus and location-specific pages across the country.
                            </p>
                            <ul className="space-y-3">
                                {[
                                    "Low traffic to seasonal menu and restaurant location pages",
                                    "Limited engagement with website content",
                                    "Need for more personalized user experiences",
                                    "Lack of effective traffic-driving campaigns"
                                ].map((challenge, index) => (
                                    <li key={index} className="flex items-start gap-3 text-slate-300">
                                        <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                                        <span>{challenge}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-center">
                            <div className="p-6 bg-slate-800/50 border border-slate-700 rounded-2xl hover:border-red-400/50 transition-colors">
                                <span className="block text-3xl font-bold text-red-400">Low</span>
                                <span className="text-xs text-slate-400 uppercase">Menu Page Traffic</span>
                            </div>
                            <div className="p-6 bg-slate-800/50 border border-slate-700 rounded-2xl hover:border-red-400/50 transition-colors">
                                <span className="block text-3xl font-bold text-red-400">Limited</span>
                                <span className="text-xs text-slate-400 uppercase">User Engagement</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Interactive Process */}
                <InteractiveProcess />

                {/* Our Solution Section */}
                <div className="mt-16 mb-16">
                    <h2 className="text-3xl font-bold text-white mb-6 border-l-4 border-cyan-400 pl-4">Our Solution</h2>
                    <p className="text-lg text-slate-300 mb-8 leading-relaxed">
                        Through our strategic partnership with <span className="text-cyan-400 font-semibold">Marketise Me</span>, we delivered comprehensive Google Ads campaigns that significantly boosted Happy Bar & Grill's digital presence and customer engagement across multiple locations:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { icon: Target, title: "Google Ads Awareness", text: "Developed comprehensive Google Ads awareness campaigns to drive targeted traffic to seasonal menus and location pages." },
                            { icon: MapPin, title: "Local Search Optimisation", text: "Implemented local search campaigns targeted to specific restaurant pages for improved regional visibility." },
                            { icon: Users, title: "Personalized Experiences", text: "Created personalized campaigns and content to enhance user engagement and provide tailored restaurant experiences." }
                        ].map((item, index) => {
                            const Icon = item.icon;
                            return(
                                <div key={item.title} className="p-6 bg-slate-800/50 border border-slate-700 rounded-2xl hover:border-cyan-400/50 hover:bg-slate-700/50 transition-all duration-300 hover:scale-105 group">
                                    <div className="flex flex-col items-center text-center">
                                        <div className="p-4 bg-cyan-400/10 rounded-full mb-4 group-hover:bg-cyan-400/20 transition-colors group-hover:scale-110">
                                            <Icon className="w-8 h-8 text-cyan-400" />
                                        </div>
                                        <h4 className="font-bold text-white text-lg mb-3 group-hover:text-cyan-300 transition-colors">{item.title}</h4>
                                        <p className="text-slate-300 leading-relaxed group-hover:text-white transition-colors">{item.text}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                
                {/* Results Dashboard */}
                <ResultsDashboard />
            </div>
        </section>
    );
};

// Contact Section
const NeuralContact = () => {
    const sectionRef = useQuantumScrollAnim();
    return (
        <section id="contact" ref={sectionRef} className="py-24 bg-slate-900/30 quantum-anim relative overflow-hidden w-full">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white">Let's Build Your Success Story</h2>
                    <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">Inspired by our results? Tell us about your project, and let's create your case study together.</p>
                </div>
                <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8 md:p-12 backdrop-blur-lg">
                    <form className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="firstName" className="block text-sm font-medium text-slate-300 mb-2">First Name *</label>
                                <input type="text" id="firstName" name="firstName" required className="w-full p-3 bg-slate-800/70 border border-slate-700 rounded-xl text-slate-200 transition-all duration-300 focus:outline-none focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300/20" placeholder="Enter your first name" />
                            </div>
                            <div>
                                <label htmlFor="lastName" className="block text-sm font-medium text-slate-300 mb-2">Last Name *</label>
                                <input type="text" id="lastName" name="lastName" required className="w-full p-3 bg-slate-800/70 border border-slate-700 rounded-xl text-slate-200 transition-all duration-300 focus:outline-none focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300/20" placeholder="Enter your last name" />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">Email Address *</label>
                            <input type="email" id="email" name="email" required className="w-full p-3 bg-slate-800/70 border border-slate-700 rounded-xl text-slate-200 transition-all duration-300 focus:outline-none focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300/20" placeholder="your.email@company.com" />
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">Message *</label>
                            <textarea id="message" name="message" required rows="6" className="w-full p-3 bg-slate-800/70 border border-slate-700 rounded-xl text-slate-200 transition-all duration-300 focus:outline-none focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300/20" placeholder="Tell us about your project..."></textarea>
                        </div>
                        <div className="text-center">
                            <button type="submit" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-400 to-sky-500 text-slate-900 font-bold rounded-xl shadow-lg shadow-cyan-500/20 hover:scale-105 hover:shadow-cyan-500/40 transition-all duration-300">
                                <span>Send Message</span>
                                <MoveRight className="w-5 h-5" />
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};



// Main App Component for Happy Bar & Grill Case Study Page
const HappyCaseStudyPage = () => {
    return (
        <Layout>
            <Head>
                <title>Happy Bar & Grill Case Study - Traffic & Engagement | BYLT Media</title>
                <meta name="description" content="Discover how BYLT Media, in collaboration with Marketise Me, boosted traffic and engagement for Happy Bar & Grill through strategic Google Ads campaigns focused on seasonal menus and location-specific pages." />
                <link rel="icon" href="/favicon.ico" />
                <link rel="canonical" href="https://www.byltmedia.com/case-studies-happy" />
                <meta name="robots" content="index, follow" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
            </Head>
            <GlobalStyles />
            
            {/* Add custom styles for this page */}
            <style jsx global>{`
                .quantum-anim {
                    opacity: 0;
                    transform: translate3d(0, 60px, 0);
                    transition: all 1.2s cubic-bezier(0.23, 1, 0.32, 1);
                    will-change: opacity, transform;
                }
                .quantum-anim.quantum-visible {
                    opacity: 1;
                    transform: translate3d(0, 0, 0);
                }
                
                /* Custom animations for success background */
                @keyframes dash {
                    0% {
                        stroke-dasharray: 0 1000;
                    }
                    100% {
                        stroke-dasharray: 1000 0;
                    }
                }
                
                .animate-dash {
                    animation: dash 4s ease-in-out infinite;
                }
                
                @keyframes float {
                    0%, 100% {
                        transform: translate3d(0, 0, 0);
                    }
                    25% {
                        transform: translate3d(5px, -10px, 0);
                    }
                    50% {
                        transform: translate3d(-5px, -5px, 0);
                    }
                    75% {
                        transform: translate3d(3px, -15px, 0);
                    }
                }
                
                .animate-float {
                    animation: float 6s ease-in-out infinite;
                }
                
                /* Ensure proper spacing and prevent overlaps */
                body {
                    overflow-x: hidden;
                }
                
                section {
                    position: relative;
                    z-index: 1;
                    width: 100%;
                }
                
                /* Fix hero section positioning */
                .hero-section {
                    position: relative;
                    isolation: isolate;
                    min-height: 100vh;
                    width: 100%;
                }
                
                /* Ensure content sections don't overlap */
                main > section:not(:first-child) {
                    margin-top: 0;
                    padding-top: 4rem;
                }
                
                /* Fix navigation positioning */
                nav {
                    position: fixed !important;
                    top: 0;
                    left: 0;
                    right: 0;
                    z-index: 50;
                }
                
                /* Ensure main content starts below navigation */
                main {
                    position: relative;
                    z-index: 1;
                }
                
                /* Fix backdrop blur issues */
                .backdrop-blur-sm {
                    backdrop-filter: blur(4px);
                    -webkit-backdrop-filter: blur(4px);
                }
                
                .backdrop-blur-lg {
                    backdrop-filter: blur(16px);
                    -webkit-backdrop-filter: blur(16px);
                }
                
                /* Ensure proper container widths */
                .max-w-6xl, .max-w-7xl {
                    width: 100%;
                }
                
                /* Fix grid layout issues */
                .grid {
                    width: 100%;
                }
                
                /* Ensure proper text spacing in hero */
                .hero-section h1 {
                    line-height: 1.1;
                    margin-bottom: 1.5rem;
                }
                
                .hero-section p {
                    line-height: 1.6;
                    margin-bottom: 3rem;
                }
            `}</style>
            
            
            <main>
                <CaseStudyHero />
                <CaseStudyContent />
                <NeuralContact />
            </main>
        </Layout>
    );
};

export default HappyCaseStudyPage;
