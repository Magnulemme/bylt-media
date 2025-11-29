import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Layout from '../components/layout';
import GlobalStyles from '../components/globalsyles';
import { event as trackEvent } from '../utils/analytics';
import { initEmailJS, sendAuditEmail, validateAuditForm } from '../utils/emailService';
import {
    Menu, X, Mail, Phone, MapPin, ChevronLeft, ChevronRight, Star, ChevronDown, MoveRight,
    Briefcase, Workflow, TrendingUp, Search, Code, BrainCircuit, Lightbulb, Construction,
    Rocket, BarChart, Clock, Target, DollarSign, CheckCircle, Award, Send, Zap, Users
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

// Free Audit Hero Animation - Data Analytics Animation
const FreeAuditHeroAnimation = () => {
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
        camera.position.z = 100;

        // --- Dynamic Bar Chart Grid (Reduced for performance) ---
        const BAR_COUNT = 8; // Reduced from 12 to 8 (grid from 12x12=144 to 8x8=64 bars, ~55% reduction)
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

        // --- Floating Data Points (Reduced for performance) ---
        const DATA_POINT_COUNT = 60; // Reduced from 150 to 60 (~60% reduction)
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
                    (Math.random() - 0.5) * 0.1,
                    (Math.random() - 0.5) * 0.1,
                    (Math.random() - 0.5) * 0.1
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

        // --- Information Flow Lines ---
        const lineCount = 8;
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
            const tubeGeometry = new TubeGeometry(curve, 50, 0.1, 8, false);
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

        // --- Animation Loop ---
        const clock = new ThreeClock();
        let animationFrame;
        const animate = () => {
            animationFrame = requestAnimationFrame(animate);
            const elapsedTime = clock.getElapsedTime();

            mouse.lerp(target, 0.05);

            // Animate Bar Chart Grid
            barGrid.forEach((bar, index) => {
                const i = Math.floor(index / BAR_COUNT);
                const j = index % BAR_COUNT;
                const wave1 = Math.sin(elapsedTime * 1.5 + i * 0.3) * 10;
                const wave2 = Math.cos(elapsedTime * 1.0 + j * 0.5) * 10;
                const mouseEffect = Math.max(0, 1 - bar.position.distanceTo(new Vector3(mouse.x * 50, 0, -mouse.y * 50)) * 0.05);

                const targetScaleY = Math.max(1, wave1 + wave2 + 25 * mouseEffect);
                bar.scale.y += (targetScaleY - bar.scale.y) * 0.05;
                bar.position.y = bar.scale.y / 2 - 20;
                bar.material.color.setHSL(0.5 + mouseEffect * 0.2, 0.7, 0.5 + mouseEffect * 0.3);
                bar.material.opacity = 0.6 + mouseEffect * 0.4;
            });

            // Animate Data Points
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

            // Animate Flow Lines
            flowLines.forEach(line => {
                line.timer += line.speed;
                const progress = (line.timer % 100) / 100;
                line.mesh.material.opacity = Math.sin(progress * Math.PI) * 0.5;
                if (progress > 0.99) {
                    line.timer = Math.random() * 10;
                }
            });

            // Animate Light
            pointLight.position.x = Math.sin(elapsedTime * 0.5) * 80;
            pointLight.position.z = Math.cos(elapsedTime * 0.5) * 80;
            pointLight.position.y = Math.cos(elapsedTime * 0.7) * 40;

            // Camera Movement
            scene.rotation.y += (mouse.x * 0.2 - scene.rotation.y) * 0.02;
            scene.rotation.x += (-mouse.y * 0.1 - scene.rotation.x) * 0.02;
            camera.position.z = 100 + Math.sin(elapsedTime * 0.4) * 10;

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
            if (animationFrame) {
                cancelAnimationFrame(animationFrame);
            }
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            if (currentMount && renderer.domElement.parentNode === currentMount) {
                currentMount.removeChild(renderer.domElement);
            }
            // Dispose of Three.js objects to prevent memory leaks
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

    return (
        <div 
            ref={mountRef} 
            className="absolute inset-0 z-0"
            style={{ pointerEvents: 'none' }}
        />
    );
};

// --- Free Audit Hero Section ---
const FreeAuditHero = () => {
  const [textIndex, setTextIndex] = useState(0);
  const texts = [
    "Free Digital Audit",
    "Performance Analysis",
    "Growth Opportunities",
    "Strategic Insights"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex(prev => (prev + 1) % texts.length);
    }, 7000); // Increased from 6000ms to 7000ms for better performance
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden hero-section">
      <FreeAuditHeroAnimation />
      
      <div className="absolute inset-0 hero-overlay-1 z-10"></div>
      
      <div className="relative z-20 text-center text-white max-w-5xl mx-auto px-4">
        <div className="mb-8">
          <div className="text-xs tracking-widest text-gray-400 mb-4 font-inter glitch-text">
            BYLT.MEDIA // FREE DIGITAL AUDIT
          </div>
          <h1 className="text-6xl md:text-8xl font-bold mb-6 font-inter hero-title">
            <span className="quantum-text" key={textIndex}>
              {texts[textIndex]}
            </span>
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-200 max-w-4xl mx-auto hero-subtitle leading-relaxed">
            Get a comprehensive analysis of your digital presence. Uncover growth opportunities and receive actionable recommendations from our experts.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center hero-cta">
          <a href="#audit-form" className="quantum-button-hero">
            <span>Get My Free Audit</span>
          </a>
          <a href="#audit-types" className="hologram-button">
            <span>See What We Audit</span>
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

// --- Audit Types Data ---
const auditTypes = [
  {
    title: 'Performance Marketing Audit',
    desc: 'In-depth review of your paid search, display, and social campaigns. Identify wasted spend and growth opportunities.',
    icon: 'TrendingUp'
  },
  {
    title: 'SEO & Organic Growth Audit',
    desc: 'Technical, on-page, and off-page SEO review. Uncover ranking issues and get a roadmap for organic growth.',
    icon: 'Search'
  },
  {
    title: 'Website Development Audit',
    desc: 'Analyze your website UX, speed, security, and conversion paths. Receive a prioritized improvement plan.',
    icon: 'Code'
  },
  {
    title: 'Data Science & Analytics Audit',
    desc: 'Assess your data collection, analytics, and reporting. Get recommendations for better data-driven decisions.',
    icon: 'BarChart'
  },
  {
    title: 'AI Solutions & Automation Audit',
    desc: 'Evaluate your current automation and AI implementation. Discover opportunities to streamline operations.',
    icon: 'BrainCircuit'
  },
  {
    title: 'Social Media Marketing Audit',
    desc: 'Review your social media strategy, content performance, and engagement. Optimize for better results.',
    icon: 'Users'
  }
];

const iconMap = { Zap, BarChart, TrendingUp, Search, Users, Send, Award, Clock, Code, BrainCircuit };

const AuditTypesSection = () => {
  const sectionRef = useQuantumScrollAnim();
  
  return (
    <section id="audit-types" ref={sectionRef} className="py-24 bg-slate-900/30 relative quantum-anim">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="text-xs tracking-widest text-gray-400 mb-4 font-inter glitch-text">
            BYLT.MEDIA // COMPREHENSIVE ANALYSIS
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 font-inter">
            What Can We <span className="quantum-text">Audit for You?</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-200 max-w-4xl mx-auto leading-relaxed">
            Our expert team conducts deep-dive audits across all digital touchpoints to uncover hidden opportunities and optimize your growth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {auditTypes.map((type, i) => {
            const Icon = iconMap[type.icon];
            return (
              <div
                key={i}
                className="group relative bg-slate-800/30 backdrop-blur border border-slate-700/50 rounded-lg p-8 hover:border-[#B8FFFA]/50 transition-all duration-500"
                style={{ animationDelay: `${i * 150}ms` }}
              >
                <div className="mb-6">
                  <div className="w-12 h-12 rounded-lg bg-slate-700/50 flex items-center justify-center group-hover:bg-[#B8FFFA] transition-all duration-300">
                    <Icon size={24} className="text-gray-400 group-hover:text-slate-900 transition-colors duration-300" />
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-[#B8FFFA] transition-colors">
                  {type.title}
                </h3>
                
                <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                  {type.desc}
                </p>
              </div>
            );
          })}
        </div>
        
        <div className="text-center mt-16">
          <a href="#audit-form" className="quantum-button-hero">
            <span>Start My Free Audit</span>
          </a>
        </div>
      </div>
    </section>
  );
};

// --- Process Section with Interactive Cards ---
const auditProcess = [
  {
    id: 'discovery',
    title: 'Discovery & Analysis',
    icon: 'Search',
    duration: '1-2 Days',
    summary: 'We dive deep into your digital ecosystem, analyzing every touchpoint.',
    color: 'from-slate-500 to-slate-400',
    details: [
      'Comprehensive website and analytics review',
      'Competitor and industry benchmarking',
      'Technical performance assessment',
      'User experience and conversion analysis'
    ]
  },
  {
    id: 'audit',
    title: 'Expert Audit & Insights',
    icon: 'BarChart',
    duration: '3-4 Days',
    summary: 'Our specialists perform detailed audits and compile actionable insights.',
    color: 'from-slate-500 to-slate-400',
    details: [
      'Multi-channel marketing audit',
      'Custom recommendations for your business',
      'ROI impact projections',
      'Clear, prioritized action plan'
    ]
  },
  {
    id: 'delivery',
    title: 'Report & Strategy Session',
    icon: 'Award',
    duration: '1 Day',
    summary: 'Receive your comprehensive report and strategic consultation.',
    color: 'from-slate-500 to-slate-400',
    details: [
      'Detailed audit report delivered',
      'Personalized strategy session',
      'Q&A with our experts',
      'Next steps roadmap'
    ]
  }
];

const ProcessSection = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [expandedCard, setExpandedCard] = useState(null);

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-slate-900 to-slate-800 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#B8FFFA] rounded-full blur-[120px]"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-[#B8FFFA] rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            How We Deliver Your <span className="text-[#B8FFFA]">Free Audit</span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Our proven 7-day process ensures you get comprehensive insights without any delays or complexity.
          </p>
        </div>

        {/* Process Timeline */}
        <div className="relative mb-16">
          <div className="flex justify-center items-center mb-8">
            <div className="flex items-center space-x-4">
              {auditProcess.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div 
                    className={`w-12 h-12 rounded-full border-2 flex items-center justify-center cursor-pointer transition-all duration-300 ${
                      activeStep >= index 
                        ? 'bg-[#B8FFFA] border-transparent text-slate-900 shadow-lg shadow-[#B8FFFA]/30' 
                        : 'border-slate-600 text-slate-400'
                    }`}
                    onClick={() => setActiveStep(index)}
                  >
                    <span className="font-bold">{index + 1}</span>
                  </div>
                  {index < auditProcess.length - 1 && (
                    <div className={`w-16 h-0.5 transition-colors duration-300 ${
                      activeStep > index ? 'bg-[#B8FFFA]' : 'bg-slate-600'
                    }`}></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Process Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 items-start">
          {auditProcess.map((step, index) => {
            const Icon = iconMap[step.icon];
            const isExpanded = expandedCard === step.id;
            const isActive = activeStep === index;
            
            return (
              <div
                key={step.id}
                className={`relative p-6 rounded-2xl border backdrop-blur-lg cursor-pointer transition-all duration-500 group ${
                  isActive 
                    ? 'border-[#B8FFFA] bg-slate-800/80 shadow-2xl shadow-[#B8FFFA]/20' 
                    : 'border-slate-700 bg-slate-800/50 hover:border-[#B8FFFA]/50'
                }`}
                onClick={() => {
                  setActiveStep(index);
                  setExpandedCard(isExpanded ? null : step.id);
                }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${step.color} text-white transition-all duration-300`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white group-hover:text-[#B8FFFA] transition-colors">
                      {step.title}
                    </h3>
                    <span className="text-sm text-[#B8FFFA] font-medium">{step.duration}</span>
                  </div>
                </div>
                
                <p className="text-slate-300 mb-4 group-hover:text-white transition-colors">
                  {step.summary}
                </p>
                
                {isExpanded && (
                  <div className="pt-4 border-t border-slate-700 animate-fadeIn">
                    <h4 className="text-[#B8FFFA] font-semibold mb-3">What's Included:</h4>
                    <ul className="space-y-2">
                      {step.details.map((detail, i) => (
                        <li key={i} className="flex items-start gap-3 text-slate-300">
                          <CheckCircle className="w-4 h-4 text-[#B8FFFA] mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#B8FFFA]/0 via-[#B8FFFA]/5 to-[#B8FFFA]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              </div>
            );
          })}
        </div>
        
        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800/60 border border-slate-700 rounded-full text-slate-300">
            <Clock className="w-5 h-5 text-[#B8FFFA]" />
            <span>Complete process takes just 7 days</span>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Trust & Social Proof Section ---
const TrustSection = () => {
  const sectionRef = useQuantumScrollAnim();
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const carouselRef = useRef(null);
  const animationRef = useRef(null);
  const startDragRef = useRef(0);
  const currentOffsetRef = useRef(0);

  const clientLogos = [
    { name: "Nissan", logo: "/images/logos/nisan.png" },
    { name: "Happy", logo: "/images/logos/225x170_happy_logo.png" },
    { name: "Parfium", logo: "/images/logos/partner-parfium.png" },
    { name: "Peugeot", logo: "/images/logos/Peugeot-@2x.png" },
    { name: "BMW", logo: "/images/logos/bmv.png" },
    { name: "Bella", logo: "/images/logos/clients-logo-bella.png" },
    { name: "Orehite", logo: "/images/logos/clients-logo-orehite.png" },
    { name: "Reshape", logo: "/images/logos/clients-reshapepng.png" }
  ];

  // Create infinite array by duplicating logos
  const infiniteLogos = [...clientLogos, ...clientLogos, ...clientLogos];

  useEffect(() => {
    if (!isDragging) {
      // Auto-scroll animation
      const animate = () => {
        currentOffsetRef.current += 0.5;
        setDragOffset(currentOffsetRef.current);
        animationRef.current = requestAnimationFrame(animate);
      };
      animationRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isDragging]);

  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
    startDragRef.current = e.pageX;
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    document.body.style.cursor = 'grabbing';
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const deltaX = e.pageX - startDragRef.current;
    currentOffsetRef.current -= deltaX * 1.5; // Changed from += to -= to fix direction
    setDragOffset(currentOffsetRef.current);
    startDragRef.current = e.pageX;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    document.body.style.cursor = '';
  };

  const handleTouchStart = (e) => {
    setIsDragging(true);
    startDragRef.current = e.touches[0].pageX;
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const deltaX = e.touches[0].pageX - startDragRef.current;
    currentOffsetRef.current -= deltaX * 1.5; // Changed from += to -= to fix direction
    setDragOffset(currentOffsetRef.current);
    startDragRef.current = e.touches[0].pageX;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    const handleGlobalMouseMove = (e) => handleMouseMove(e);
    const handleGlobalMouseUp = () => handleMouseUp();
    const handleGlobalTouchMove = (e) => handleTouchMove(e);
    const handleGlobalTouchEnd = () => handleTouchEnd();

    if (isDragging) {
      document.addEventListener('mousemove', handleGlobalMouseMove);
      document.addEventListener('mouseup', handleGlobalMouseUp);
      document.addEventListener('touchmove', handleGlobalTouchMove);
      document.addEventListener('touchend', handleGlobalTouchEnd);
    }

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseup', handleGlobalMouseUp);
      document.removeEventListener('touchmove', handleGlobalTouchMove);
      document.removeEventListener('touchend', handleGlobalTouchEnd);
    };
  }, [isDragging]);

  return (
    <section ref={sectionRef} className="py-24 bg-slate-900/50 relative quantum-anim overflow-hidden">
      <div className="absolute inset-0 carousel-bg-pattern"></div>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="text-xs tracking-widest text-gray-400 mb-4 font-inter glitch-text">
            BYLT.MEDIA // PROVEN RESULTS
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 font-inter">
            Trusted by <span className="quantum-text">Industry Leaders</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-200 max-w-4xl mx-auto leading-relaxed mb-8">
            We've helped brands across diverse industries unlock growth with data-driven audits and actionable digital strategies.
          </p>
          <p className="text-md text-gray-300 max-w-3xl mx-auto leading-relaxed">
            These are shared clients with <span className="text-[#B8FFFA] font-medium">Marketise Me</span>, a premiere Google Partner and Meta Business Partner, strengthening our collaborative approach to digital excellence.
          </p>
        </div>

        <div className="carousel-3d-container" ref={carouselRef}>
          <div className="carousel-track-wrapper">
            <div 
              className={`carousel-horizontal-track ${isDragging ? 'dragging' : ''}`}
              style={{ 
                transform: `translateX(${-dragOffset}px)`,
                cursor: isDragging ? 'grabbing' : 'grab'
              }}
              onMouseDown={handleMouseDown}
              onTouchStart={handleTouchStart}
            >
              {infiniteLogos.map((client, index) => (
                <div 
                  key={`${client.name}-${index}`} 
                  className="logo-card"
                >
                  <div className="logo-inner">
                    <img 
                      src={client.logo} 
                      alt={client.name}
                      className="logo-image"
                      draggable={false}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .carousel-bg-pattern {
          background: 
            radial-gradient(circle at 25% 25%, rgba(184, 255, 250, 0.05) 0%, transparent 60%),
            radial-gradient(circle at 75% 75%, rgba(184, 255, 250, 0.03) 0%, transparent 60%),
            linear-gradient(135deg, rgba(30, 41, 59, 0.1) 0%, transparent 100%);
          animation: patternFlow 20s ease-in-out infinite;
        }
        
        @keyframes patternFlow {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); } /* Hardware-accelerated transform */
          33% { transform: translate3d(20px, -10px, 0) scale(1.02); } /* Hardware-accelerated transform */
          66% { transform: translate3d(-15px, 15px, 0) scale(0.98); } /* Hardware-accelerated transform */
        }
        
        .carousel-3d-container {
          position: relative;
          height: 180px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 1rem 0;
          overflow: hidden;
        }
        
        .carousel-track-wrapper {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          perspective: 1000px;
          overflow: hidden;
        }
        
        .carousel-horizontal-track {
          display: flex;
          gap: 2rem;
          height: 150px;
          align-items: center;
          user-select: none;
          will-change: transform;
          transform: translateZ(0); /* Hardware acceleration */
          contain: layout style paint;
        }
        
        .carousel-horizontal-track.dragging {
          cursor: grabbing;
        }
        
        @keyframes autoScroll {
          from { transform: translate3d(0, 0, 0); } /* Hardware-accelerated transform */
          to { transform: translate3d(-50%, 0, 0); } /* Hardware-accelerated transform */
        }
        
        .logo-card {
          flex-shrink: 0;
          width: 160px;
          height: 120px;
          transform-style: preserve-3d;
          transition: all 0.3s ease;
          transform: translateZ(0); /* Hardware acceleration */
          will-change: transform;
        }
        
        .logo-card:hover {
          transform: translate3d(0, -10px, 0) rotateY(5deg) scale(1.05); /* Hardware-accelerated transform */
        }
        
        .logo-inner {
          width: 100%;
          height: 100%;
          position: relative;
          background: rgba(30, 41, 59, 0.8);
          border: 2px solid rgba(75, 85, 99, 0.4);
          border-radius: 20px;
          backdrop-filter: blur(15px);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          overflow: hidden;
          box-shadow: 
            0 8px 32px rgba(0, 0, 0, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
          transform: translateZ(0); /* Hardware acceleration */
          will-change: background, border-color, box-shadow;
        }
        
        .logo-card:hover .logo-inner {
          background: rgba(30, 41, 59, 0.95);
          border-color: rgba(184, 255, 250, 0.6);
          box-shadow: 
            0 20px 60px rgba(0, 0, 0, 0.4),
            0 0 30px rgba(184, 255, 250, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
        }
        
        .logo-image {
          max-width: 70%;
          max-height: 60%;
          object-fit: contain;
          filter: grayscale(30%) brightness(1.1) contrast(1.1);
          transition: all 0.3s ease;
          z-index: 2;
          position: relative;
        }
        
        .logo-card:hover .logo-image {
          filter: grayscale(0%) brightness(1.2) contrast(1.2);
          transform: scale(1.1);
        }
        
        /* Responsive Design */
        @media (max-width: 768px) {
          .carousel-3d-container {
            height: 200px;
            margin: 2rem 0;
          }
          
          .logo-card {
            width: 140px;
            height: 110px;
          }
          
          .carousel-horizontal-track {
            height: 130px;
            gap: 1.5rem;
          }
        }
        
        @media (max-width: 480px) {
          .carousel-3d-container {
            height: 160px;
            margin: 1.5rem 0;
          }
          
          .logo-card {
            width: 120px;
            height: 95px;
          }
          
          .carousel-horizontal-track {
            height: 110px;
            gap: 1rem;
          }
        }
      `}</style>
    </section>
  );
};

// --- Enhanced Free Audit Request Form ---
const FreeAuditForm = () => {
  const sectionRef = useQuantumScrollAnim();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    website: '',
    auditType: '',
    goals: '',
    challenges: '',
    consent: false
  });  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');
  const [submitError, setSubmitError] = useState('');

  // Initialize EmailJS when component mounts
  useEffect(() => {
    try {
      initEmailJS();
      console.log('✅ EmailJS initialized on free-audit page mount');
    } catch (error) {
      console.error('❌ Failed to initialize EmailJS:', error);
      setSubmitError('Email service initialization failed. Please refresh the page.');
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');
    setSubmitError('');
    
    try {
      // Client-side validation
      const validationError = validateAuditForm(formData);
      if (validationError) {
        setSubmitStatus('error');
        setSubmitError(validationError);
        console.error('❌ Validation error:', validationError);
        setIsSubmitting(false); // Reset submitting state
        return;
      }

      // Send email via EmailJS (already initialized on mount)
      console.log('📧 Attempting to send audit email...');
      const result = await sendAuditEmail(formData);

      if (result.success) {
        setSubmitStatus('success');
        
        // Reset form on success
        setFormData({ 
          firstName: '', lastName: '', email: '', website: '', 
          auditType: '', goals: '', challenges: '', consent: false 
        });

        // Track successful form submission
        trackEvent({
          action: 'form_submit_success',
          category: 'Lead Generation',
          label: 'Free Audit Form EmailJS',
          value: 1
        });

        // Send to dataLayer for GTM
        if (typeof window !== 'undefined' && window.dataLayer) {
          window.dataLayer.push({
            event: 'free_audit_submit_success',
            form_type: 'free_audit_emailjs',
            audit_type: formData.auditType,
            website: formData.website,
            consent_given: formData.consent
          });
        }
      } else {
        setSubmitStatus('error');
        setSubmitError(result.message || result.error || 'Failed to send audit request');
        console.error('EmailJS Audit Error:', result.error);
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
      setSubmitError(error.message || 'An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="audit-form" ref={sectionRef} className="py-24 bg-slate-900/80 relative quantum-anim">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="text-xs tracking-widest text-gray-400 mb-4 font-inter glitch-text">
            BYLT.MEDIA // GET STARTED
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 font-inter">
            Request Your <span className="quantum-text">Free Audit</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
            Fill out the form below and our team will start analyzing your digital presence within 24 hours.
          </p>
        </div>

        <div className="bg-slate-800/30 backdrop-blur border border-slate-700/50 rounded-lg p-8 lg:p-12 hover:border-[#B8FFFA]/50 transition-all duration-500">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-8">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-semibold text-gray-300 mb-3">
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded text-white placeholder-gray-400 focus:ring-2 focus:ring-[#B8FFFA] focus:border-transparent transition-all"
                    placeholder="Your first name"
                  />
                </div>
                
                <div>
                  <label htmlFor="lastName" className="block text-sm font-semibold text-gray-300 mb-3">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded text-white placeholder-gray-400 focus:ring-2 focus:ring-[#B8FFFA] focus:border-transparent transition-all"
                    placeholder="Your last name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-300 mb-3">
                    Business Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded text-white placeholder-gray-400 focus:ring-2 focus:ring-[#B8FFFA] focus:border-transparent transition-all"
                    placeholder="your@company.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="website" className="block text-sm font-semibold text-gray-300 mb-3">
                    Website
                  </label>
                  <input
                    type="text"
                    id="website"
                    name="website"
                    value={formData.website}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded text-white placeholder-gray-400 focus:ring-2 focus:ring-[#B8FFFA] focus:border-transparent transition-all"
                    placeholder="www.yourwebsite.com or yoursite.co.uk"
                  />
                </div>
              </div>

              <div className="space-y-8">
                <div>
                  <label htmlFor="auditType" className="block text-sm font-semibold text-gray-300 mb-3">
                    Primary Audit Focus *
                  </label>
                  <select
                    id="auditType"
                    name="auditType"
                    value={formData.auditType}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded text-white focus:ring-2 focus:ring-[#B8FFFA] focus:border-transparent transition-all"
                  >
                    <option value="">Select your main focus area...</option>
                    {auditTypes.map((type, i) => (
                      <option key={i} value={type.title}>{type.title}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label htmlFor="goals" className="block text-sm font-semibold text-gray-300 mb-3">
                    Business Goals
                  </label>
                  <textarea
                    id="goals"
                    name="goals"
                    value={formData.goals}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded text-white placeholder-gray-400 focus:ring-2 focus:ring-[#B8FFFA] focus:border-transparent transition-all resize-none"
                    placeholder="What are your main business objectives?"
                  />
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="challenges" className="block text-sm font-semibold text-gray-300 mb-3">
                Current Challenges
              </label>
              <textarea
                id="challenges"
                name="challenges"
                value={formData.challenges}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded text-white placeholder-gray-400 focus:ring-2 focus:ring-[#B8FFFA] focus:border-transparent transition-all resize-none"
                placeholder="What specific challenges are you facing?"
              />
            </div>

            {/* Anti-spam protection - hidden field */}
            <input 
              type="checkbox" 
              name="botcheck" 
              className="hidden" 
              style={{ display: 'none' }}
              tabIndex="-1"
              autoComplete="off"
            />
            
            <div className="flex items-start gap-3 p-4 bg-slate-700/30 rounded border border-slate-600/30">
              <input
                type="checkbox"
                id="consent"
                name="consent"
                checked={formData.consent}
                onChange={handleInputChange}
                className="mt-1 w-4 h-4 text-[#B8FFFA] bg-transparent border-2 border-slate-500 rounded focus:ring-[#B8FFFA] focus:ring-2"
                required
              />
              <label htmlFor="consent" className="text-gray-300 text-sm leading-relaxed">
                I agree to be contacted by BYLT Media regarding my audit request and understand that this audit is completely free with no obligations.
              </label>
            </div>

            <div className="text-center pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="quantum-button-hero group w-full sm:w-auto"
              >
                {isSubmitting ? (
                  <span>Processing Your Request...</span>
                ) : (
                  <>
                    <span>Get My Free Audit</span>
                    <Send size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </div>

            {submitStatus === 'success' && (
              <div className="p-6 bg-green-900/30 border border-green-500/30 text-green-400 rounded flex items-start gap-3">
                <CheckCircle className="w-6 h-6 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-2">✅ Audit Request Submitted Successfully!</h4>
                  <p className="text-sm text-green-300">Check your email for confirmation. Our team will send your comprehensive audit report within 48 hours.</p>
                </div>
              </div>
            )}
            
            {submitStatus === 'error' && (
              <div className="p-6 bg-red-900/30 border border-red-500/30 text-red-400 rounded flex items-start gap-3">
                <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                  <span className="text-white text-sm">!</span>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">❌ Submission Failed</h4>
                  <p className="text-sm text-red-300">{submitError || 'Please try again or contact us directly at info@byltmedia.com'}</p>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

const FreeAuditPage = () => (
  <Layout>
    <Head>
      <title>Free Digital Audit Worth £2,500 | BYLT Media</title>
      <meta name="description" content="Get a comprehensive, no-obligation digital audit from BYLT Media. Uncover hidden opportunities, identify bottlenecks, and receive actionable recommendations—completely free." />
      <meta name="keywords" content="free digital audit, digital marketing audit, website audit, SEO audit, PPC audit, conversion optimization" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <GlobalStyles />
    <main>
      <FreeAuditHero />
      <AuditTypesSection />
      <ProcessSection />
      <TrustSection />
      <FreeAuditForm />
    </main>
    
    {/* Global Styles for Animations and Buttons */}
    <style jsx global>{`
      @keyframes heroBgSpin1 {
        0% { transform: scale(1.1) rotate(0deg) translateZ(0); } /* Hardware acceleration */
        100% { transform: scale(1.1) rotate(360deg) translateZ(0); } /* Hardware acceleration */
      }
      @keyframes heroBgSpin2 {
        0% { transform: scale(1) rotate(0deg) translateZ(0); } /* Hardware acceleration */
        100% { transform: scale(1) rotate(-360deg) translateZ(0); } /* Hardware acceleration */
      }
      @keyframes heroBgSpin3 {
        0% { transform: scale(0.9) rotate(0deg) translateZ(0); } /* Hardware acceleration */
        100% { transform: scale(0.9) rotate(360deg) translateZ(0); } /* Hardware acceleration */
      }
      @keyframes slideDown {
        from { opacity: 0; transform: translate3d(0, -30px, 0); } /* Hardware-accelerated transform */
        to { opacity: 1; transform: translate3d(0, 0, 0); } /* Hardware-accelerated transform */
      }
      @keyframes slideUp {
        from { opacity: 0; transform: translate3d(0, 30px, 0); } /* Hardware-accelerated transform */
        to { opacity: 1; transform: translate3d(0, 0, 0); } /* Hardware-accelerated transform */
      }
      @keyframes fadeIn {
        from { opacity: 0; transform: translate3d(0, 10px, 0); } /* Hardware-accelerated transform */
        to { opacity: 1; transform: translate3d(0, 0, 0); } /* Hardware-accelerated transform */
      }
      @keyframes gradientShift {
        0%, 100% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
      }
      
      .animate-fadeIn {
        animation: fadeIn 0.3s ease-out;
      }
      
      /* Buttons use site's authentic #B8FFFA color scheme */
      .quantum-cta-button {
        position: relative;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 1rem 2rem;
        font-weight: 700;
        font-size: 1.1rem;
        color: #1e293b;
        background: #B8FFFA;
        border: none;
        border-radius: 12px;
        font-family: 'Inter', sans-serif;
        text-decoration: none;
        transition: all 0.3s cubic-bezier(.4,0,.2,1);
        cursor: pointer;
        box-shadow: 0 10px 25px rgba(184, 255, 250, 0.3);
        overflow: hidden;
        transform: translateZ(0); /* Hardware acceleration */
        will-change: transform, background, box-shadow;
      }
      .quantum-cta-button:hover {
        transform: translate3d(0, -2px, 0); /* Hardware-accelerated transform */
        box-shadow: 0 15px 35px rgba(184, 255, 250, 0.4);
        background: #9DFFF8;
      }
      .quantum-cta-button:before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
        transition: left 0.7s;
      }
      .quantum-cta-button:hover:before {
        left: 100%;
      }
      
      .secondary-cta-button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 1rem 2rem;
        font-weight: 600;
        font-size: 1.1rem;
        color: #B8FFFA;
        background: transparent;
        border: 2px solid #4b5563;
        border-radius: 12px;
        font-family: 'Inter', sans-serif;
        text-decoration: none;
        transition: all 0.3s cubic-bezier(.4,0,.2,1);
        transform: translateZ(0); /* Hardware acceleration */
        will-change: transform, border-color, background;
        cursor: pointer;
      }
      .secondary-cta-button:hover {
        background: #374151;
        border-color: #6b7280;
        transform: translateY(-2px);
        box-shadow: 0 10px 25px rgba(184, 255, 250, 0.2);
      }
      
      .quantum-submit-button {
        position: relative;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-width: 280px;
        padding: 1.25rem 2.5rem;
        font-weight: 700;
        font-size: 1.125rem;
        color: #1e293b;
        background: #B8FFFA;
        border: none;
        border-radius: 16px;
        font-family: 'Inter', sans-serif;
        text-decoration: none;
        transition: all 0.4s cubic-bezier(.4,0,.2,1);
        cursor: pointer;
        min-height: 60px;
        box-shadow: 0 10px 30px rgba(184, 255, 250, 0.3), 0 0 0 0 rgba(184, 255, 250, 0.4);
        overflow: hidden;
      }
      .quantum-submit-button:hover:not(:disabled) {
        transform: translateY(-3px) scale(1.02);
        box-shadow: 0 20px 40px rgba(184, 255, 250, 0.4), 0 0 0 8px rgba(184, 255, 250, 0.1);
        background: #9DFFF8;
      }
      .quantum-submit-button:active {
        transform: translateY(-1px) scale(1.01);
      }
      .quantum-submit-button:disabled {
        opacity: 0.7;
        cursor: not-allowed;
        transform: none;
        box-shadow: 0 10px 30px rgba(184, 255, 250, 0.2);
      }
      .quantum-submit-button:before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
        transition: left 0.7s;
      }
      .quantum-submit-button:hover:before {
        left: 100%;
      }
      .submit-spinner {
        width: 20px;
        height: 20px;
        border: 2px solid transparent;
        border-top: 2px solid #1e293b;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin-right: 0.75rem;
      }
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      
      @media (max-width: 640px) {
        .quantum-cta-button, .secondary-cta-button {
          font-size: 1rem;
          padding: 0.875rem 1.5rem;
        }
      }
    `}</style>
  </Layout>
);

export default FreeAuditPage;
