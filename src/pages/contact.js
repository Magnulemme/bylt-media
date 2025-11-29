import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Layout from '../components/layout';
import GlobalStyles from '../components/globalsyles';
import { event as trackEvent } from '../utils/analytics';
import { initEmailJS, sendContactEmail, validateContactForm } from '../utils/emailService';
import {
    Mail, Phone, MapPin, Clock, CheckCircle, User, Briefcase, Send, Shield, Star
} from 'lucide-react';
// Tree-shaken Three.js imports - only import what we actually use
import {
    Scene,
    PerspectiveCamera, 
    WebGLRenderer,
    BufferGeometry,
    BufferAttribute,
    PointsMaterial,
    Points,
    LineBasicMaterial,
    LineSegments,
    Vector2,
    Clock as ThreeClock,
    AdditiveBlending
} from 'three';

// --- OPTIMIZED CUSTOM HOOK FOR SCROLL ANIMATIONS WITH PERFORMANCE ---
const useQuantumScrollAnim = (threshold = 0.1, delay = 0) => {
    const ref = useRef(null);
    const animationFrameRef = useRef(null);
    
    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const handleIntersection = ([entry]) => {
            if (entry.isIntersecting) {
                // Cancel any pending animation frame
                if (animationFrameRef.current) {
                    cancelAnimationFrame(animationFrameRef.current);
                }
                
                // Use requestAnimationFrame for smooth animations
                animationFrameRef.current = requestAnimationFrame(() => {
                    setTimeout(() => {
                        if (element) {
                            element.classList.add('quantum-visible');
                        }
                    }, delay);
                });
                observer.unobserve(element);
            }
        };

        const observer = new IntersectionObserver(handleIntersection, { 
            threshold,
            rootMargin: '10px' // Preload animations slightly before they're visible
        });
        
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

// --- OPTIMIZED CONTACT HERO ANIMATION - Reduced complexity while maintaining visual quality ---
const ContactHeroAnimation = () => {
    const mountRef = useRef(null);
    const animationFrameRef = useRef(null);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        
        const currentMount = mountRef.current;
        if (!currentMount) return;

        try {
            // Scene Setup with performance optimizations
            const scene = new Scene();
            const camera = new PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
            const renderer = new WebGLRenderer({ 
                alpha: true, 
                antialias: false, // Disabled for performance
                powerPreference: "high-performance"
            });
            
            renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Cap pixel ratio for performance
            currentMount.appendChild(renderer.domElement);
            camera.position.z = 20;

            // Create optimized particle systems - REDUCED particle counts
            const particleSystems = [];
            
            for (let sys = 0; sys < 3; sys++) {
                const particlesGeom = new BufferGeometry();
                const particleCount = 800 + sys * 400; // Reduced from 2000+1000*sys to 800+400*sys (~60% reduction)
                const posArray = new Float32Array(particleCount * 3);
                const colorArray = new Float32Array(particleCount * 3);
                const velocityArray = new Float32Array(particleCount * 3);
                
                for(let i = 0; i < particleCount * 3; i += 3) {
                    // Spread particles across the view
                    posArray[i] = (Math.random() - 0.5) * 60;
                    posArray[i + 1] = (Math.random() - 0.5) * 40;
                    posArray[i + 2] = (Math.random() - 0.5) * 40;
                    
                    // Set velocity for floating motion
                    velocityArray[i] = (Math.random() - 0.5) * 0.02;
                    velocityArray[i + 1] = (Math.random() - 0.5) * 0.01;
                    velocityArray[i + 2] = (Math.random() - 0.5) * 0.02;
                    
                    // Gradient from cyan to white
                    const intensity = 0.4 + Math.random() * 0.6;
                    colorArray[i] = intensity * (0.7 + sys * 0.1);     // R
                    colorArray[i + 1] = intensity * (1.0);             // G  
                    colorArray[i + 2] = intensity * (0.98 + sys * 0.02); // B
                }
                
                particlesGeom.setAttribute('position', new BufferAttribute(posArray, 3));
                particlesGeom.setAttribute('color', new BufferAttribute(colorArray, 3));
                particlesGeom.setAttribute('velocity', new BufferAttribute(velocityArray, 3));
                
                const particlesMat = new PointsMaterial({
                    size: 0.07 + sys * 0.025, // Slightly larger to maintain visual impact with fewer particles
                    vertexColors: true,
                    blending: AdditiveBlending,
                    transparent: true,
                    opacity: 0.6 - sys * 0.1
                });
                
                const particles = new Points(particlesGeom, particlesMat);
                particleSystems.push({
                    system: particles,
                    geometry: particlesGeom,
                    velocities: velocityArray,
                    positions: posArray
                });
                scene.add(particles);
            }

            // Add optimized connecting lines - REDUCED from 500 to 250
            const connectionsGeom = new BufferGeometry();
            const maxConnections = 250; // Reduced by 50%
            const connectionPositions = new Float32Array(maxConnections * 6);
            connectionsGeom.setAttribute('position', new BufferAttribute(connectionPositions, 3));
            
            const connectionsMat = new LineBasicMaterial({
                color: 0xB8FFFA,
                transparent: true,
                opacity: 0.08, // Slightly reduced opacity
                blending: AdditiveBlending
            });
            
            const connections = new LineSegments(connectionsGeom, connectionsMat);
            scene.add(connections);

            // Add optimized sparkle effects - REDUCED from 300 to 150
            const sparkleGeom = new BufferGeometry();
            const sparkleCount = 150; // Reduced by 50%
            const sparklePositions = new Float32Array(sparkleCount * 3);
            const sparkleSizes = new Float32Array(sparkleCount);
            const sparkleOpacities = new Float32Array(sparkleCount);
            
            for(let i = 0; i < sparkleCount; i++) {
                sparklePositions[i * 3] = (Math.random() - 0.5) * 60;
                sparklePositions[i * 3 + 1] = (Math.random() - 0.5) * 40;
                sparklePositions[i * 3 + 2] = (Math.random() - 0.5) * 40;
                sparkleSizes[i] = Math.random() * 3 + 1;
                sparkleOpacities[i] = Math.random();
            }
            
            sparkleGeom.setAttribute('position', new BufferAttribute(sparklePositions, 3));
            sparkleGeom.setAttribute('size', new BufferAttribute(sparkleSizes, 1));
            sparkleGeom.setAttribute('opacity', new BufferAttribute(sparkleOpacities, 1));
            
            const sparkleMat = new PointsMaterial({
                color: 0xFFFFFF,
                size: 0.25, // Slightly larger to maintain visual impact
                transparent: true,
                blending: AdditiveBlending,
                opacity: 0.8
            });
            
            const sparkles = new Points(sparkleGeom, sparkleMat);
            scene.add(sparkles);

            // Mouse interaction for engagement
            const mouse = new Vector2();
            const target = new Vector2();
            const handleMouseMove = (event) => {
                target.x = (event.clientX / window.innerWidth) * 2 - 1;
                target.y = -(event.clientY / window.innerHeight) * 2 + 1;
            };
            window.addEventListener('mousemove', handleMouseMove, { passive: true });

            // Optimized animation loop with performance throttling
            const clock = new ThreeClock();
            let lastFrameTime = 0;
            
            const animate = (currentTime) => {
                animationFrameRef.current = requestAnimationFrame(animate);
                
                // Throttle animation updates for better performance (~60fps)
                if (currentTime - lastFrameTime < 16.67) return;
                lastFrameTime = currentTime;
                
                if (!currentMount || !currentMount.contains(renderer.domElement)) {
                    return;
                }
                
                mouse.lerp(target, 0.03); // Slightly reduced for smoother performance
                const elapsedTime = clock.getElapsedTime();

                // Animate particle systems with enhanced motion
                particleSystems.forEach((sys, sysIndex) => {
                    const positions = sys.positions;
                    const velocities = sys.velocities;
                    const colors = sys.geometry.attributes.color.array;
                    
                    for (let i = 0; i < positions.length; i += 3) {
                        // Enhanced floating motion with multiple sine waves
                        const waveX = Math.sin(elapsedTime * 0.8 + i * 0.02) * 0.02;
                        const waveY = Math.cos(elapsedTime * 0.6 + i * 0.015) * 0.015;
                        const waveZ = Math.sin(elapsedTime * 0.7 + i * 0.025) * 0.02;
                        
                        // Pulsing effect based on distance from center
                        const centerDistance = Math.sqrt(positions[i] * positions[i] + positions[i + 1] * positions[i + 1]);
                        const pulseEffect = Math.sin(elapsedTime * 2 + centerDistance * 0.1) * 0.01;
                        
                        positions[i] += velocities[i] + waveX + pulseEffect;
                        positions[i + 1] += velocities[i + 1] + waveY;
                        positions[i + 2] += velocities[i + 2] + waveZ;
                        
                        // Enhanced color pulsing
                        const colorPulse = 0.5 + Math.sin(elapsedTime * 1.5 + i * 0.01) * 0.3;
                        colors[i] = (0.7 + sysIndex * 0.1) * colorPulse;     // R
                        colors[i + 1] = 1.0 * colorPulse;                    // G
                        colors[i + 2] = (0.98 + sysIndex * 0.02) * colorPulse; // B
                        
                        // Boundary wrapping with smooth transition
                        if (Math.abs(positions[i]) > 30) positions[i] *= -0.8;
                        if (Math.abs(positions[i + 1]) > 20) positions[i + 1] *= -0.8;
                        if (Math.abs(positions[i + 2]) > 20) positions[i + 2] *= -0.8;
                    }
                    
                    sys.geometry.attributes.position.needsUpdate = true;
                    sys.geometry.attributes.color.needsUpdate = true;
                });

                // Animate sparkles with twinkling effect
                const sparklePos = sparkles.geometry.attributes.position.array;
                const sparkleOp = sparkles.geometry.attributes.opacity.array;
                
                for(let i = 0; i < sparkleCount; i++) {
                    // Gentle rotation around center
                    const angle = elapsedTime * 0.3 + i * 0.1;
                    const radius = 15 + Math.sin(elapsedTime * 0.5 + i * 0.05) * 5;
                    
                    sparklePos[i * 3] += Math.cos(angle) * 0.01;
                    sparklePos[i * 3 + 1] += Math.sin(elapsedTime * 0.4 + i * 0.03) * 0.008;
                    sparklePos[i * 3 + 2] += Math.sin(angle) * 0.01;
                    
                    // Twinkling opacity
                    sparkleOp[i] = 0.3 + Math.sin(elapsedTime * 3 + i * 0.5) * 0.7;
                    
                    // Reset position if too far
                    if (Math.abs(sparklePos[i * 3]) > 35) sparklePos[i * 3] = (Math.random() - 0.5) * 60;
                    if (Math.abs(sparklePos[i * 3 + 1]) > 25) sparklePos[i * 3 + 1] = (Math.random() - 0.5) * 40;
                }
                
                sparkles.geometry.attributes.position.needsUpdate = true;
                sparkles.geometry.attributes.opacity.needsUpdate = true;

                // Enhanced connection lines with pulsing effect
                // Enhanced connection lines with pulsing effect
                let connectionIndex = 0;
                const firstSystem = particleSystems[0];
                const positions = firstSystem.positions;
                
                // Dynamic connection opacity based on time
                connectionsMat.opacity = 0.05 + Math.sin(elapsedTime * 1.2) * 0.1;
                
                for (let i = 0; i < positions.length && connectionIndex < maxConnections * 6; i += 12) {
                    for (let j = i + 12; j < positions.length && connectionIndex < maxConnections * 6; j += 12) {
                        const dx = positions[i] - positions[j];
                        const dy = positions[i + 1] - positions[j + 1];
                        const dz = positions[i + 2] - positions[j + 2];
                        const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
                        
                        // Dynamic connection distance based on time
                        const maxDistance = 4 + Math.sin(elapsedTime * 0.8) * 2;
                        
                        if (distance < maxDistance) {
                            connectionPositions[connectionIndex++] = positions[i];
                            connectionPositions[connectionIndex++] = positions[i + 1];
                            connectionPositions[connectionIndex++] = positions[i + 2];
                            connectionPositions[connectionIndex++] = positions[j];
                            connectionPositions[connectionIndex++] = positions[j + 1];
                            connectionPositions[connectionIndex++] = positions[j + 2];
                        }
                    }
                }
                
                connectionsGeom.setDrawRange(0, connectionIndex / 3);
                connectionsGeom.attributes.position.needsUpdate = true;

                // Enhanced camera movement with dynamic effects
                const cameraOffset = Math.sin(elapsedTime * 0.3) * 2;
                camera.position.x += (mouse.x * 8 + cameraOffset - camera.position.x) * 0.08;
                camera.position.y += (-mouse.y * 5 + Math.cos(elapsedTime * 0.25) * 1 - camera.position.y) * 0.08;
                camera.position.z = 20 + Math.sin(elapsedTime * 0.4) * 3;
                
                // Add slight rotation to the scene
                scene.rotation.z = Math.sin(elapsedTime * 0.1) * 0.02;
                
                camera.lookAt(scene.position);

                renderer.render(scene, camera);
            };

            // Start the animation
            animationFrameRef.current = requestAnimationFrame(animate);

            // Optimized cleanup function
            return () => {
                try {
                    if (animationFrameRef.current) {
                        cancelAnimationFrame(animationFrameRef.current);
                    }
                    window.removeEventListener('mousemove', handleMouseMove);
                    
                    if (currentMount && renderer.domElement && currentMount.contains(renderer.domElement)) {
                        currentMount.removeChild(renderer.domElement);
                    }
                    
                    // Dispose of resources
                    particleSystems.forEach(sys => {
                        if (sys.geometry) sys.geometry.dispose();
                        if (sys.system.material) sys.system.material.dispose();
                    });
                    
                    if (connectionsGeom) connectionsGeom.dispose();
                    if (connectionsMat) connectionsMat.dispose();
                    if (sparkleGeom) sparkleGeom.dispose();
                    if (sparkleMat) sparkleMat.dispose();
                    renderer.dispose();
                } catch (error) {
                    console.warn('Cleanup error:', error);
                }
            };
        } catch (error) {
            console.error('Three.js animation error:', error);
            return () => {};
        }
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

// Optimized Contact Hero Section with hardware acceleration
const ContactHero = () => {
    return (
        <section 
            id="home" 
            className="relative h-screen flex items-center justify-center overflow-hidden hero-section"
            style={{ 
                willChange: 'transform',
                contain: 'layout style paint'
            }}
        >
            <ContactHeroAnimation />
            <div 
                className="absolute inset-0 hero-overlay-enhanced z-10"
                style={{ contain: 'paint' }}
            ></div>
            
            {/* Main Hero Content */}
            <div 
                className="relative z-20 text-center text-white max-w-6xl mx-auto px-4"
                style={{ willChange: 'transform' }}
            >
                <div 
                    className="mb-12"
                    style={{ 
                        willChange: 'transform',
                        contain: 'layout style'
                    }}
                >
                    <h1 
                        className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 font-inter hero-title-enhanced"
                        style={{ willChange: 'transform' }}
                    >
                        <span className="quantum-text-gradient">Let's Build</span>
                        <br />
                        <span className="quantum-text-secondary">Something Amazing</span>
                    </h1>
                    
                    <p className="text-lg md:text-xl mb-8 text-gray-200 max-w-4xl mx-auto hero-subtitle leading-relaxed">
                        Have a project in mind? Our team is here to discuss your needs and explore how we can help you achieve your digital goals.
                    </p>

                    {/* Response Time Promise */}
                    <div 
                        className="inline-flex items-center space-x-4 text-sm text-gray-300"
                        style={{ 
                            willChange: 'transform',
                            contain: 'layout style'
                        }}
                    >
                        <div className="flex items-center">
                            <Clock className="w-4 h-4 text-[#B8FFFA] mr-2" />
                            <span>Quick Response</span>
                        </div>
                        <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
                        <div className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-[#B8FFFA] mr-2" />
                            <span>Free Consultation</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
                <div className="scroll-indicator">
                    <div className="scroll-dot"></div>
                </div>
            </div>

            <style jsx>{`
                .hero-section {
                    background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%);
                    position: relative;
                }
                
                .hero-overlay-enhanced {
                    background: linear-gradient(135deg, 
                        rgba(15, 23, 42, 0.4) 0%, 
                        rgba(30, 41, 59, 0.6) 50%, 
                        rgba(15, 23, 42, 0.4) 100%);
                }
                
                .quantum-text-gradient {
                    background: linear-gradient(135deg, #B8FFFA 0%, #B8FFB8 50%, #FFFFFF 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    animation: textShimmer 3s ease-in-out infinite;
                }
                
                .quantum-text-secondary {
                    color: #E5E7EB;
                    position: relative;
                }
                
                @keyframes textShimmer {
                    0%, 100% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                }
                
                .scroll-indicator {
                    width: 24px;
                    height: 40px;
                    border: 2px solid rgba(184, 255, 250, 0.5);
                    border-radius: 12px;
                    position: relative;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }
                
                .scroll-indicator:hover {
                    border-color: #B8FFFA;
                }
                
                .scroll-dot {
                    width: 4px;
                    height: 8px;
                    background: #B8FFFA;
                    border-radius: 2px;
                    position: absolute;
                    top: 6px;
                    left: 50%;
                    transform: translateX(-50%);
                    animation: scrollBounce 2s infinite;
                }
                
                @keyframes scrollBounce {
                    0%, 100% { transform: translateX(-50%) translateY(0); opacity: 1; }
                    50% { transform: translateX(-50%) translateY(20px); opacity: 0.5; }
                }
            `}</style>
        </section>
    );
};

// Optimized Contact Form Section with hardware acceleration
const ContactFormSection = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        company: '',
        website: '',
        service: '',
        budget: '',
        timeline: '',
        message: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState('');
    const [submitError, setSubmitError] = useState('');

    // Initialize EmailJS when component mounts
    useEffect(() => {
        console.log('🔵 CONTACT PAGE LOADED - useEffect running');
        console.warn('⚠️ TESTING CONSOLE OUTPUT');
        console.error('🔴 ERROR LEVEL TEST');
        try {
            initEmailJS();
            console.log('✅ EmailJS initialized on component mount');
        } catch (error) {
            console.error('❌ Failed to initialize EmailJS:', error);
            setSubmitError('Email service initialization failed. Please refresh the page.');
        }
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        console.log('🟢 FORM SUBMIT TRIGGERED');
        console.warn('⚠️ Form submission started');
        e.preventDefault();
        console.log('🟢 preventDefault called');
        setIsSubmitting(true);
        setSubmitStatus('');
        setSubmitError('');

        try {
            // Client-side validation
            const validationError = validateContactForm(formData);
            if (validationError) {
                setSubmitStatus('error');
                setSubmitError(validationError);
                console.error('❌ Validation error:', validationError);
                setIsSubmitting(false); // Reset submitting state
                return;
            }

            // Send email via EmailJS (already initialized on mount)
            console.log('📧 Attempting to send email...');
            const result = await sendContactEmail(formData);

            if (result.success) {
                setSubmitStatus('success');
                
                // Reset form on success
                setFormData({ 
                    firstName: '', lastName: '', email: '', phone: '', company: '', 
                    website: '', service: '', budget: '', timeline: '', message: '' 
                });

                // Track successful form submission
                trackEvent({
                    action: 'form_submit_success',
                    category: 'Contact',
                    label: 'Contact Form EmailJS',
                    value: 1
                });

                // Send to dataLayer for GTM
                if (typeof window !== 'undefined' && window.dataLayer) {
                    window.dataLayer.push({
                        event: 'contact_form_submit_success',
                        form_type: 'contact_emailjs',
                        service_interest: formData.service,
                        company: formData.company || 'Individual'
                    });
                }
            } else {
                setSubmitStatus('error');
                setSubmitError(result.message || result.error || 'Failed to send message');
                console.error('EmailJS Contact Error:', result.error);
            }
        } catch (error) {
            console.error("Contact form submission error:", error);
            setSubmitStatus('error');
            setSubmitError(error.message || 'An unexpected error occurred');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section 
            className="py-20 bg-slate-900"
            style={{ 
                willChange: 'transform',
                contain: 'layout style paint'
            }}
        >
            <div 
                className="max-w-6xl mx-auto px-4"
                style={{ contain: 'layout style' }}
            >
                <div 
                    className="grid lg:grid-cols-2 gap-12"
                    style={{ 
                        willChange: 'transform',
                        contain: 'layout style'
                    }}
                >
                    {/* Contact Form */}
                    <div 
                        className="bg-slate-800/50 backdrop-blur-lg border border-slate-700 rounded-2xl shadow-xl p-8"
                        style={{ 
                            willChange: 'transform, background-color',
                            contain: 'layout style paint'
                        }}
                    >
                        <div 
                            className="mb-8"
                            style={{ contain: 'layout style' }}
                        >
                            <h2 
                                className="text-3xl font-bold text-white mb-4"
                                style={{ willChange: 'transform' }}
                            >
                                Start Your Project
                            </h2>
                            <p className="text-gray-300">
                                Tell us about your vision and we'll help make it reality.
                            </p>
                        </div>

                        <form 
                            onSubmit={handleSubmit} 
                            className="space-y-6"
                            style={{ contain: 'layout style' }}
                        >
                            {/* Name Fields */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-300 mb-2">
                                        First Name *
                                    </label>
                                    <input
                                        type="text"
                                        id="firstName"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-[#B8FFFA] focus:border-transparent transition-all"
                                        placeholder="Your first name"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-300 mb-2">
                                        Last Name *
                                    </label>
                                    <input
                                        type="text"
                                        id="lastName"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-[#B8FFFA] focus:border-transparent transition-all"
                                        placeholder="Your last name"
                                    />
                                </div>
                            </div>

                            {/* Contact Fields */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                                        Email Address *
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-[#B8FFFA] focus:border-transparent transition-all"
                                        placeholder="your@email.com"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-[#B8FFFA] focus:border-transparent transition-all"
                                        placeholder="+44 (20) 7946 0958"
                                    />
                                </div>
                            </div>

                            {/* Company Fields */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">
                                        Company Name
                                    </label>
                                    <input
                                        type="text"
                                        id="company"
                                        name="company"
                                        value={formData.company}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-[#B8FFFA] focus:border-transparent transition-all"
                                        placeholder="Your company"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="website" className="block text-sm font-medium text-gray-300 mb-2">
                                        Website
                                    </label>
                                    <input
                                        type="text"
                                        id="website"
                                        name="website"
                                        value={formData.website}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-[#B8FFFA] focus:border-transparent transition-all"
                                        placeholder="www.yourwebsite.com or yoursite.co.uk"
                                    />
                                </div>
                            </div>

                            {/* Service Selection */}
                            <div>
                                <label htmlFor="service" className="block text-sm font-medium text-gray-300 mb-2">
                                    Service Interest
                                </label>
                                <select
                                    id="service"
                                    name="service"
                                    value={formData.service}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-[#B8FFFA] focus:border-transparent transition-all"
                                >
                                    <option value="">Select a service...</option>
                                    <option value="AI Solutions & Automation">AI Solutions & Automation</option>
                                    <option value="Data Science & Analytics">Data Science & Analytics</option>
                                    <option value="Performance Marketing (PPC)">Performance Marketing (PPC)</option>
                                    <option value="SEO & Organic Growth">SEO & Organic Growth</option>
                                    <option value="Website Development">Website Development</option>
                                    <option value="Email Marketing">Email Marketing</option>
                                    <option value="Social Media Marketing">Social Media Marketing</option>
                                    <option value="Programmatic Advertising">Programmatic Advertising</option>
                                    <option value="CRO & UX Optimisation">CRO & UX Optimisation</option>
                                    <option value="Full-Service Digital Strategy">Full-Service Digital Strategy</option>
                                    <option value="Not sure yet">Not sure yet</option>
                                </select>
                            </div>

                            {/* Budget and Timeline */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="budget" className="block text-sm font-medium text-gray-300 mb-2">
                                        Budget Range
                                    </label>
                                    <input
                                        type="text"
                                        id="budget"
                                        name="budget"
                                        value={formData.budget}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-[#B8FFFA] focus:border-transparent transition-all"
                                        placeholder="e.g., £10K - £50K, Let's discuss, etc."
                                    />
                                </div>
                                <div>
                                    <label htmlFor="timeline" className="block text-sm font-medium text-gray-300 mb-2">
                                        Timeline
                                    </label>
                                    <select
                                        id="timeline"
                                        name="timeline"
                                        value={formData.timeline}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-[#B8FFFA] focus:border-transparent transition-all"
                                    >
                                        <option value="">Select timeline...</option>
                                        <option value="ASAP">ASAP</option>
                                        <option value="Within 1 month">Within 1 month</option>
                                        <option value="1-3 months">1-3 months</option>
                                        <option value="3-6 months">3-6 months</option>
                                        <option value="6+ months">6+ months</option>
                                        <option value="Just exploring">Just exploring</option>
                                    </select>
                                </div>
                            </div>

                            {/* Message */}
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                                    Project Details *
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    required
                                    rows={5}
                                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-[#B8FFFA] focus:border-transparent transition-all resize-vertical"
                                    placeholder="Tell us about your project goals, challenges, and what success looks like..."
                                ></textarea>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="neural-submit-button"
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="submit-spinner"></div>
                                        <span>Sending...</span>
                                    </>
                                ) : (
                                    <>
                                        <Send className="w-5 h-5 mr-2" />
                                        <span>Send Message</span>
                                    </>
                                )}
                            </button>

                            {/* Status Messages */}
                            {submitStatus === 'success' && (
                                <div className="p-4 bg-green-900/30 border border-green-500/30 text-green-400 rounded-lg flex items-center">
                                    <CheckCircle className="w-5 h-5 mr-2" />
                                    Perfect! Your message has been sent successfully. We'll get back to you within 24 hours!
                                </div>
                            )}

                            {submitStatus === 'error' && (
                                <div className="p-4 bg-red-900/30 border border-red-500/30 text-red-400 rounded-lg">
                                    <div className="font-semibold mb-1">Error</div>
                                    <div>{submitError || 'Something went wrong. Please try again or email us directly at info@byltmedia.com.'}</div>
                                </div>
                            )}
                        </form>
                    </div>

                    {/* Contact Information */}
                    <div className="space-y-8">
                        {/* Contact Methods */}
                        <div className="bg-slate-800/50 backdrop-blur-lg border border-slate-700 rounded-2xl shadow-xl p-8">
                            <h3 className="text-2xl font-bold text-white mb-6">
                                Get In Touch
                            </h3>
                            
                            <div className="space-y-6">
                                <a 
                                    href="mailto:info@byltmedia.com"
                                    className="flex items-center p-4 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-colors group border border-slate-600/50"
                                >
                                    <div className="w-12 h-12 bg-[#B8FFFA]/20 rounded-lg flex items-center justify-center mr-4">
                                        <Mail className="w-6 h-6 text-[#B8FFFA]" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-400">Email us at</p>
                                        <p className="text-lg font-semibold text-white group-hover:text-[#B8FFFA]">
                                            info@byltmedia.com
                                        </p>
                                    </div>
                                </a>

                                <a 
                                    href="tel:+441316050312"
                                    className="flex items-center p-4 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-colors group border border-slate-600/50"
                                >
                                    <div className="w-12 h-12 bg-[#B8FFFA]/20 rounded-lg flex items-center justify-center mr-4">
                                        <Phone className="w-6 h-6 text-[#B8FFFA]" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-400">Call us at</p>
                                        <p className="text-lg font-semibold text-white group-hover:text-[#B8FFFA]">
                                            +44 (131) 605 03 12
                                        </p>
                                    </div>
                                </a>
                            </div>
                        </div>

                        {/* Process Steps */}
                        <div className="bg-slate-800/50 backdrop-blur-lg border border-slate-700 rounded-2xl shadow-xl p-8">
                            <h3 className="text-2xl font-bold text-white mb-6">
                                Our Process
                            </h3>
                            
                            <div className="space-y-6">
                                <div className="flex items-start">
                                    <div className="w-8 h-8 bg-[#B8FFFA] text-slate-900 rounded-full flex items-center justify-center text-sm font-bold mr-4 mt-1">
                                        1
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-white mb-1">Discovery Call</h4>
                                        <p className="text-gray-400 text-sm">
                                            We learn about your goals, challenges, and vision
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="w-8 h-8 bg-[#B8FFFA] text-slate-900 rounded-full flex items-center justify-center text-sm font-bold mr-4 mt-1">
                                        2
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-white mb-1">Strategy Development</h4>
                                        <p className="text-gray-400 text-sm">
                                            We craft a custom strategy tailored to your needs
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="w-8 h-8 bg-[#B8FFFA] text-slate-900 rounded-full flex items-center justify-center text-sm font-bold mr-4 mt-1">
                                        3
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-white mb-1">Implementation</h4>
                                        <p className="text-gray-400 text-sm">
                                            We execute with precision and keep you informed
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="w-8 h-8 bg-[#B8FFFA] text-slate-900 rounded-full flex items-center justify-center text-sm font-bold mr-4 mt-1">
                                        4
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-white mb-1">Optimisation</h4>
                                        <p className="text-gray-400 text-sm">
                                            We monitor, analyse, and optimise for maximum results
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Trust Indicators */}
                        <div className="bg-slate-800/50 backdrop-blur-lg border border-slate-700 rounded-2xl shadow-xl p-8">
                            <h3 className="text-2xl font-bold text-white mb-6">
                                Why Choose Us
                            </h3>
                            
                            <div className="space-y-4">
                                <div className="flex items-center text-gray-300">
                                    <CheckCircle className="w-5 h-5 text-[#B8FFFA] mr-3" />
                                    <span className="text-sm">Free initial consultation</span>
                                </div>
                                <div className="flex items-center text-gray-300">
                                    <CheckCircle className="w-5 h-5 text-[#B8FFFA] mr-3" />
                                    <span className="text-sm">24 hour response time</span>
                                </div>
                                <div className="flex items-center text-gray-300">
                                    <CheckCircle className="w-5 h-5 text-[#B8FFFA] mr-3" />
                                    <span className="text-sm">Transparent pricing</span>
                                </div>
                                <div className="flex items-center text-gray-300">
                                    <CheckCircle className="w-5 h-5 text-[#B8FFFA] mr-3" />
                                    <span className="text-sm">Data-driven approach</span>
                                </div>
                                <div className="flex items-center text-gray-300">
                                    <CheckCircle className="w-5 h-5 text-[#B8FFFA] mr-3" />
                                    <span className="text-sm">Dedicated project manager</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                /* Optimized Contact Form Styles with Hardware Acceleration */
                .neural-submit-button {
                    position: relative;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    width: 100%;
                    padding: 1.25rem 2.5rem;
                    font-weight: 700;
                    font-size: 1.125rem;
                    color: #1e293b;
                    background: #B8FFFA;
                    border: none;
                    border-radius: 12px;
                    font-family: 'Inter', sans-serif;
                    text-decoration: none;
                    transition: all 0.4s ease;
                    cursor: pointer;
                    min-height: 60px;
                    /* Hardware acceleration */
                    transform: translate3d(0, 0, 0);
                    will-change: transform, box-shadow, background-color;
                    backface-visibility: hidden;
                    contain: layout style paint;
                }
                
                .neural-submit-button:hover:not(:disabled) {
                    transform: translate3d(0, -3px, 0) scale(1.02);
                    box-shadow: 0 10px 30px rgba(184, 255, 250, 0.3);
                    background: #9DFFF8;
                }
                
                .neural-submit-button:disabled {
                    opacity: 0.7;
                    cursor: not-allowed;
                    transform: translate3d(0, 0, 0);
                }
                
                .submit-spinner {
                    width: 20px;
                    height: 20px;
                    border: 2px solid transparent;
                    border-top: 2px solid #1e293b;
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                    margin-right: 0.75rem;
                    /* Hardware acceleration */
                    transform: translate3d(0, 0, 0);
                    will-change: transform;
                    contain: strict;
                }
                
                @keyframes spin {
                    0% { transform: translate3d(0, 0, 0) rotate(0deg); }
                    100% { transform: translate3d(0, 0, 0) rotate(360deg); }
                }

                /* Additional Performance Optimizations */
                * {
                    box-sizing: border-box;
                }
                
                .bg-slate-800\/50 {
                    will-change: auto;
                    contain: layout style paint;
                }
                
                input, textarea, select {
                    will-change: auto;
                    contain: layout style;
                }
            `}</style>
        </section>
    );
};

// Main Contact Page Component
const ContactPage = () => {
    return (
        <Layout>
            <Head>
                <title>Contact Us | BYLT Media</title>
                <meta name="description" content="Get in touch with BYLT Media to discuss your digital marketing project. We specialise in AI solutions, data science, performance marketing, and more." />
                <link rel="icon" href="/favicon.ico" />
                <link rel="canonical" href="https://www.byltmedia.com/contact" />
                <meta name="robots" content="index, follow" />
                
                {/* Schema Markup for Contact Page */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "ContactPage",
                            "mainEntity": {
                                "@type": "Organization",
                                "name": "BYLT Media",
                                "url": "https://www.byltmedia.com",
                                "contactPoint": [
                                    {
                                        "@type": "ContactPoint",
                                        "contactType": "customer service",
                                        "areaServed": ["GB", "EU"],
                                        "availableLanguage": "English",
                                        "url": "https://www.byltmedia.com/contact"
                                    },
                                    {
                                        "@type": "ContactPoint",
                                        "contactType": "sales",
                                        "areaServed": ["GB", "EU"], 
                                        "availableLanguage": "English",
                                        "url": "https://www.byltmedia.com/contact"
                                    }
                                ],
                                "address": {
                                    "@type": "PostalAddress",
                                    "addressCountry": "GB"
                                },
                                "geo": {
                                    "@type": "GeoCoordinates",
                                    "latitude": "51.5074",
                                    "longitude": "-0.1278"
                                }
                            }
                        })
                    }}
                />
            </Head>
            <GlobalStyles />

            <main>
                <ContactHero />
                <ContactFormSection />
            </main>
        </Layout>
    );
};

export default ContactPage;
