import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Layout from '../components/layout';
import GlobalStyles from '../components/globalsyles';
import {
    Menu, X, Mail, Phone, MapPin, ChevronLeft, ChevronRight, Star, ChevronDown, MoveRight,
    Briefcase, Workflow, TrendingUp, Search, Code, BrainCircuit, Lightbulb, Construction,
    Rocket, BarChart, Clock, Target, DollarSign, CheckCircle, Award, Image as ImageIcon, ShoppingCart, Youtube,
    Building, HeartPulse, Car, Plane, ShoppingBag, Utensils, Scale, Zap, Link, FileText, Share2, Bot, Cpu, Database,
    Home, Heart, Activity, Trello, Eye, SearchCode, TestTube2, ArrowUpRight, Atom, MessageSquare, Camera
} from 'lucide-react';
// Tree-shaken Three.js imports - only import what we actually use
import { 
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  SphereGeometry,
  MeshBasicMaterial,
  Mesh,
  BufferGeometry,
  Color,
  Float32BufferAttribute,
  LineBasicMaterial,
  AdditiveBlending,
  LineSegments,
  Vector3,
  BufferAttribute,
  PointsMaterial,
  Points,
  CanvasTexture,
  SpriteMaterial,
  Sprite,
  AmbientLight,
  DirectionalLight,
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

// --- V2.0: OPTIMIZED DATA SCIENCE NEURAL NETWORK ANIMATION ---
const DataScienceHeroAnimation = () => {
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
        camera.position.z = 120;

        // --- Optimized Neural Network Nodes (Reduced Counts) ---
        const nodes = [];
        const nodeGeometry = new SphereGeometry(1.2, 12, 12); // Reduced geometry complexity
        
        // Create optimized neural network layers with ~40% reduction
        const layers = [
            { count: 7, x: -60, color: 0x22d3ee },  // Reduced from 12 to 7
            { count: 10, x: -20, color: 0x67e8f9 }, // Reduced from 16 to 10  
            { count: 12, x: 20, color: 0xa5f3fc },  // Reduced from 20 to 12
            { count: 5, x: 60, color: 0x06b6d4 }    // Reduced from 8 to 5
        ];

        layers.forEach(layer => {
            for (let i = 0; i < layer.count; i++) {
                const material = new MeshBasicMaterial({
                    color: layer.color,
                    transparent: true,
                    opacity: 0.56  // Reduced by 30% from 0.8
                });
                const node = new Mesh(nodeGeometry, material);
                
                const ySpacing = 120 / (layer.count + 1);
                node.position.set(
                    layer.x + (Math.random() - 0.5) * 8,
                    -60 + (i + 1) * ySpacing + (Math.random() - 0.5) * 10,
                    (Math.random() - 0.5) * 20
                );
                
                scene.add(node);
                nodes.push({
                    mesh: node,
                    basePosition: node.position.clone(),
                    phase: Math.random() * Math.PI * 2,
                    pulseSpeed: 0.5 + Math.random() * 1.5,
                    layer: layer
                });
            }
        });

        // --- Optimized Neural Connections (Reduced Probability) ---
        const connections = [];
        const lineGeometry = new BufferGeometry();
        const linePositions = [];
        const lineColors = [];

        // Create optimized connections between layers with reduced complexity
        for (let layerIndex = 0; layerIndex < layers.length - 1; layerIndex++) {
            const currentLayerNodes = nodes.filter(n => n.layer === layers[layerIndex]);
            const nextLayerNodes = nodes.filter(n => n.layer === layers[layerIndex + 1]);

            currentLayerNodes.forEach(sourceNode => {
                nextLayerNodes.forEach(targetNode => {
                    if (Math.random() > 0.8) { // Reduced from 0.7 to 0.8 for fewer connections
                        linePositions.push(
                            sourceNode.mesh.position.x, sourceNode.mesh.position.y, sourceNode.mesh.position.z,
                            targetNode.mesh.position.x, targetNode.mesh.position.y, targetNode.mesh.position.z
                        );
                        
                        // Connection color - cyan theme
                        const connectionColor = new Color(0x67e8f9);
                        lineColors.push(connectionColor.r, connectionColor.g, connectionColor.b);
                        lineColors.push(connectionColor.r, connectionColor.g, connectionColor.b);

                        connections.push({
                            source: sourceNode,
                            target: targetNode,
                            strength: Math.random()
                        });
                    }
                });
            });
        }

        lineGeometry.setAttribute('position', new Float32BufferAttribute(linePositions, 3));
        lineGeometry.setAttribute('color', new Float32BufferAttribute(lineColors, 3));

        const lineMaterial = new LineBasicMaterial({
            vertexColors: true,
            transparent: true,
            opacity: 0.3,
            blending: AdditiveBlending
        });

        const neuralConnections = new LineSegments(lineGeometry, lineMaterial);
        scene.add(neuralConnections);

        // --- Optimized Flying Data Particles (Reduced Count) ---
        const PARTICLE_COUNT = 10;  // Reduced from 15 to 10 (~67% reduction from original 30)
        const particlesGeometry = new BufferGeometry();
        const particlePositions = new Float32Array(PARTICLE_COUNT * 3);
        const particleData = [];
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            const i3 = i * 3;
            particlePositions[i3] = (Math.random() - 0.5) * 250;
            particlePositions[i3 + 1] = (Math.random() - 0.5) * 250;
            particlePositions[i3 + 2] = (Math.random() - 0.5) * 250;
            particleData.push({
                velocity: new Vector3(
                    (Math.random() - 0.5) * 0.25, // Slightly reduced velocity
                    (Math.random() - 0.5) * 0.25,
                    (Math.random() - 0.5) * 0.25
                ),
                phase: Math.random() * Math.PI * 2
            });
        }
        particlesGeometry.setAttribute('position', new BufferAttribute(particlePositions, 3));
        const particleMaterial = new PointsMaterial({
            color: 0x22d3ee,
            size: 1.2,
            transparent: true,
            opacity: 0.03,  // Very subtle opacity
            blending: AdditiveBlending
        });
        const dataParticles = new Points(particlesGeometry, particleMaterial);
        scene.add(dataParticles);

        // --- Optimized Binary Code Animation (Reduced Count) ---
        const binaryStrings = [];
        const binaryCount = 15;  // Reduced from 25 to 15 for better performance
        
        // Create binary text objects
        for (let i = 0; i < binaryCount; i++) {
            const binaryString = Array.from({ length: 16 }, () => Math.random() > 0.5 ? '1' : '0').join('');
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.width = 180;
            canvas.height = 40;
            
            context.fillStyle = 'transparent';
            context.fillRect(0, 0, canvas.width, canvas.height);
            context.font = '12px monospace';
            context.fillStyle = `rgba(34, 211, 238, ${0.25 + Math.random() * 0.25})`;
            context.fillText(binaryString, 8, 25);
            
            const texture = new CanvasTexture(canvas);
            const material = new SpriteMaterial({ 
                map: texture, 
                transparent: true,
                opacity: 0.25
            });
            const sprite = new Sprite(material);
            
            sprite.position.set(
                (Math.random() - 0.5) * 300,
                (Math.random() - 0.5) * 300,
                (Math.random() - 0.5) * 300
            );
            sprite.scale.set(12, 3, 1);
            
            scene.add(sprite);
            binaryStrings.push({
                sprite,
                speed: 0.2 + Math.random() * 0.3,
                rotationSpeed: (Math.random() - 0.5) * 0.01,
                originalY: sprite.position.y
            });
        }

        // --- Lighting ---
        const ambientLight = new AmbientLight(0xffffff, 0.4);
        scene.add(ambientLight);
        const directionalLight = new DirectionalLight(0x22d3ee, 1);
        directionalLight.position.set(1, 1, 1);
        scene.add(directionalLight);

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

            // Throttled neural nodes animation (every 2 frames)
            if (frameCount % 2 === 0) {
                nodes.forEach(node => {
                    const pulse = Math.sin(elapsedTime * node.pulseSpeed + node.phase) * 0.3 + 1;
                    node.mesh.scale.setScalar(pulse);
                    node.mesh.material.opacity = 0.42 + pulse * 0.14;  // Reduced base opacity and pulse range by 30%
                    
                    // Subtle position animation
                    node.mesh.position.y = node.basePosition.y + Math.sin(elapsedTime * 0.5 + node.phase) * 2;
                });
            }

            // Throttled flying particles animation (every 3 frames)
            if (frameCount % 3 === 0) {
                const pPositions = dataParticles.geometry.attributes.position.array;
                for (let i = 0; i < PARTICLE_COUNT; i++) {
                    const i3 = i * 3;
                    const particle = particleData[i];
                    
                    // Move particles slowly
                    pPositions[i3] += particle.velocity.x;
                    pPositions[i3 + 1] += particle.velocity.y;
                    pPositions[i3 + 2] += particle.velocity.z;
                    
                    // Gentle pulsing effect
                    const pulse = Math.sin(elapsedTime * 0.8 + particle.phase) * 0.1 + 0.9;
                    dataParticles.material.opacity = 0.03 * pulse;
                    
                    // Wrap around boundaries
                    if (Math.abs(pPositions[i3]) > 125) pPositions[i3] *= -0.8;
                    if (Math.abs(pPositions[i3 + 1]) > 125) pPositions[i3 + 1] *= -0.8;
                    if (Math.abs(pPositions[i3 + 2]) > 125) pPositions[i3 + 2] *= -0.8;
                }
                dataParticles.geometry.attributes.position.needsUpdate = true;
            }

            // Throttled binary code animation (every 4 frames)
            if (frameCount % 4 === 0) {
                binaryStrings.forEach((binary, index) => {
                    binary.sprite.position.y -= binary.speed;
                    binary.sprite.rotation.z += binary.rotationSpeed;
                    
                    // Fade effect based on distance
                    const distanceFromCenter = binary.sprite.position.distanceTo(camera.position);
                    binary.sprite.material.opacity = Math.max(0.05, Math.min(0.4, 150 / distanceFromCenter));
                    
                    // Reset position when too far
                    if (binary.sprite.position.y < -150) {
                        binary.sprite.position.y = 150;
                        binary.sprite.position.x = (Math.random() - 0.5) * 300;
                        binary.sprite.position.z = (Math.random() - 0.5) * 300;
                    }
                
                // Update binary string occasionally
                if (Math.random() < 0.003) {
                    const newBinaryString = Array.from({ length: 16 }, () => Math.random() > 0.5 ? '1' : '0').join('');
                    const canvas = document.createElement('canvas');
                    const context = canvas.getContext('2d');
                    canvas.width = 180;
                    canvas.height = 40;
                    
                    context.fillStyle = 'transparent';
                    context.fillRect(0, 0, canvas.width, canvas.height);
                    context.font = '12px monospace';
                    context.fillStyle = `rgba(34, 211, 238, ${0.25 + Math.random() * 0.25})`;
                    context.fillText(newBinaryString, 8, 25);
                    
                    binary.sprite.material.map.dispose();
                    binary.sprite.material.map = new CanvasTexture(canvas);
                    binary.sprite.material.needsUpdate = true;
                }
                });
            }

            // Hardware-accelerated camera movement
            scene.rotation.y += (mouse.x * 0.05 - scene.rotation.y) * 0.02;
            scene.rotation.x += (-mouse.y * 0.05 - scene.rotation.x) * 0.02;

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
                if (object.isMesh || object.isPoints || object.isLine || object.isSprite) {
                    if (object.geometry) object.geometry.dispose();
                    if (object.material) {
                        if (Array.isArray(object.material)) {
                            object.material.forEach(material => {
                                if (material.map) material.map.dispose();
                                material.dispose();
                            });
                        } else {
                            if (object.material.map) object.material.map.dispose();
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


// Data Science Hero Section
const DataScienceHero = () => {
    const [textIndex, setTextIndex] = useState(0);
    const texts = [
        "Unlock Predictive Power",
        "Solve Complex Challenges",
        "Build with Data Science"
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setTextIndex(prev => (prev + 1) % texts.length);
        }, 8000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden hero-section">
            <DataScienceHeroAnimation />
            <div className="absolute inset-0 hero-overlay-1 z-10"></div>
            <div className="relative z-20 text-center text-white max-w-5xl mx-auto px-4">
                <div className="mb-8">
                    <div className="text-xs tracking-widest text-gray-400 mb-4 font-inter glitch-text">
                        BYLT.MEDIA // DATA SCIENCE SERVICES
                    </div>
                    <h1 className="text-6xl md:text-8xl font-bold mb-6 font-inter hero-title">
                        <span className="quantum-text" key={textIndex}>
                            {texts[textIndex]}
                        </span>
                    </h1>
                    <p className="text-lg md:text-xl mb-8 text-gray-200 max-w-4xl mx-auto hero-subtitle leading-relaxed">
                        We leverage advanced machine learning and statistical modeling to answer your most complex business questions, predict future outcomes, and drive innovation.
                    </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center hero-cta">
                    <a href="#contact" className="quantum-button-hero">
                        <span>Discuss a Project</span>
                    </a>
                    <a href="#process" className="hologram-button">
                        <span>How We Work</span>
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


// The Data Science Advantage Section
const TheDataScienceAdvantage = () => {
    const sectionRef = useQuantumScrollAnim();
    return (
        <section ref={sectionRef} id="services" className="py-24 bg-slate-900/30 relative quantum-anim overflow-hidden">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <div className="section-title-container">
                        <h2 className="section-title-enhanced">The Data Science Advantage</h2>
                        <div className="title-accent-line"></div>
                    </div>
                    <p className="text-lg text-gray-400 max-w-3xl mx-auto">
                        Go beyond traditional analytics. Use data science to uncover hidden patterns, forecast future trends, and build intelligent systems that drive your business forward.
                    </p>
                </div>
                <div className="grid md:grid-cols-3 gap-8 text-center">
                    <div className="info-card">
                        <div className="info-card-icon"><TrendingUp /></div>
                        <h3 className="text-xl font-bold text-white mb-2">Predictive Insights</h3>
                        <p className="text-gray-400">
                            Anticipate customer behavior, market shifts, and operational needs with models that learn from your data.
                        </p>
                    </div>
                    <div className="info-card">
                        <div className="info-card-icon"><BrainCircuit /></div>
                        <h3 className="text-xl font-bold text-white mb-2">Complex Problem Solving</h3>
                        <p className="text-gray-400">
                            Tackle your most challenging business problems, from optimising pricing to reducing customer churn, with bespoke algorithms.
                        </p>
                    </div>
                    <div className="info-card">
                        <div className="info-card-icon"><Rocket /></div>
                        <h3 className="text-xl font-bold text-white mb-2">Business Innovation</h3>
                        <p className="text-gray-400">
                            Create new products, services, and efficiencies by embedding intelligent, data-driven features into your core operations.
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


// Our Data Science Services Section
const OurDataScienceServices = () => {
    const sectionRef = useQuantumScrollAnim();
    const services = [
        { icon: <HeartPulse />, name: "Customer Analytics & Segmentation", description: "Understand your customers on a deeper level. We analyse behaviour to segment your audience, predict churn, and calculate lifetime value." },
        { icon: <TrendingUp />, name: "Predictive Modelling & Forecasting", description: "Build robust models to forecast sales, demand, and other key business metrics, enabling proactive strategy and resource planning." },
        { icon: <MessageSquare />, name: "Natural Language Processing (NLP)", description: "Extract insights from unstructured text data. We analyse customer reviews, support tickets, and social media to gauge sentiment and identify themes." },
        { icon: <Camera />, name: "Computer Vision", description: "Develop systems that interpret and analyse images and video, enabling solutions like object detection, image classification, and content moderation." },
        { icon: <Star />, name: "Recommendation Engines", description: "Increase engagement and sales by delivering personalised product, content, or service recommendations to your users in real-time." },
        { icon: <DollarSign />, name: "Pricing & Promotion Optimisation", description: "Use machine learning to identify optimal pricing strategies and promotional tactics that maximise revenue and profitability." },
    ];

    return (
        <section ref={sectionRef} className="py-24 bg-slate-900/50 relative quantum-anim overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <div className="section-title-container">
                        <h2 className="section-title-enhanced">Our Data Science Services</h2>
                        <div className="title-accent-line"></div>
                    </div>
                    <p className="text-lg text-gray-400 max-w-3xl mx-auto">
                        From understanding customer behavior to forecasting market trends, our data science services are designed to solve your most complex challenges.
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


// Our Data Science Process Section (Restored Original Layout)
const DataScienceProcess = () => {
    const [activeStep, setActiveStep] = useState(null);
    const sectionRef = useQuantumScrollAnim();
    
    const processSteps = [
        { step: "01", title: "Discovery & Scoping", subtitle: "Defining the Problem", description: "We collaborate with your team to deeply understand the business problem, define clear objectives, and determine the scope and success criteria for the project.", icon: <Search className="w-6 h-6" />, details: [ "Business objective workshops", "Data source identification", "Feasibility assessment", "Defining success metrics (KPIs)" ] },
        { step: "02", title: "Data Exploration & Prep", subtitle: "Building the Foundation", description: "This is a critical phase where we collect, clean, and explore your data. We prepare a robust dataset that will serve as the foundation for effective model development.", icon: <Database className="w-6 h-6" />, details: [ "Data collection and aggregation", "Exploratory Data Analysis (EDA)", "Data cleaning and pre-processing", "Feature engineering" ] },
        { step: "03", title: "Model Development & Validation", subtitle: "Crafting the Solution", description: "Our data scientists develop, train, and rigorously test various machine learning models to find the most accurate and efficient solution for your specific problem.", icon: <Atom className="w-6 h-6" />, details: [ "Algorithm selection and testing", "Model training and tuning", "Rigorous performance validation", "Cross-validation and backtesting" ] },
        { step: "04", title: "Deployment & Integration", subtitle: "Bringing Models to Life", description: "We productionize the final model, integrating it seamlessly into your existing systems and workflows via APIs or other methods, ensuring it delivers real-world value.", icon: <Share2 className="w-6 h-6" />, details: [ "Model deployment as API endpoints", "Integration with business applications", "Performance monitoring setup", "User training and documentation" ] }
    ];

    return (
        <section id="process" ref={sectionRef} className="py-24 quantum-process-section quantum-anim relative overflow-hidden">
            <div className="absolute inset-0 quantum-grid-animation"></div>
            
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                <div className="text-center mb-20">
                    <div className="section-title-container">
                        <h2 className="section-title-enhanced">
                            Our Data Science Process
                        </h2>
                        <div className="title-accent-line"></div>
                    </div>
                    <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
                        A structured and collaborative approach to ensure our data science solutions are robust, reliable, and deliver measurable business impact.
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


// Contact Section (Updated for Data Science)
const DataScienceContact = () => {
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
            const subject = encodeURIComponent(`New Data Science Inquiry from ${formData.firstName} ${formData.lastName}`);
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
                        <h2 className="section-title-enhanced">Build Your Data Science Solution</h2>
                        <div className="title-accent-line"></div>
                    </div>
                    <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                        Have a complex problem or an innovative idea? Let's discuss how data science can bring your vision to life.
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
                        <div className="form-group"><label htmlFor="message" className="form-label">Message *</label><textarea id="message" name="message" value={formData.message} onChange={handleInputChange} required rows={6} className="form-textarea" placeholder="Describe your business challenge, the data you have available, and what you hope to achieve with data science..."></textarea></div>
                        <div className="form-submit">
                            <button type="submit" disabled={isSubmitting} className="neural-submit-button">
                                {isSubmitting ? (<><div className="submit-spinner"></div><span>Sending...</span></>) : (<><span>Start the Conversation</span><MoveRight className="ml-3 transition-transform duration-300" /></>)}
                            </button>
                        </div>
                        {submitStatus === 'success' && (<div className="status-message success"><Mail className="w-5 h-5" /><span>Thank you! Your message has been prepared. Please complete sending it in your mail client.</span></div>)}
                        {submitStatus === 'error' && (<div className="status-message error"><X className="w-5 h-5" /><span>There was an error. Please try sending an email directly.</span></div>)}
                    </form>
                </div>
                <div className="contact-details">
                    <div className="contact-detail-item"><Mail className="w-5 h-5 text-gray-400" /><span>info@bookedupmedia.com</span></div>
                    <div className="contact-detail-item"><Clock className="w-5 h-5 text-gray-400" /><span>Available for Complex Problems 24/7</span></div>
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


// Main App Component for Data Science Page
const DataSciencePage = () => {
    return (
        <Layout>
            <Head>
                <title>Data Science Solutions | BYLT Media</title>
                <meta name="description" content="Leverage predictive modeling, machine learning, and advanced analytics to solve your most complex business challenges with our data science services." />
                <link rel="icon" href="/favicon.ico" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
            </Head>
            <GlobalStyles />

            <main>
                <DataScienceHero />
                <TheDataScienceAdvantage />
                <OurDataScienceServices />
                <DataScienceProcess />
                <DataScienceContact />
            </main>
        </Layout>
    );
};

export default DataSciencePage;
