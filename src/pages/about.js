import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Layout from '../components/layout';
import GlobalStyles from '../components/globalsyles';
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
import {
    MapPin, Users, Trophy, Star, Quote, ExternalLink, Linkedin, Calendar,
    Building, Globe, Award, TrendingUp, Target, Heart, Mail, Phone,
    ChevronDown, MoveRight, Clock, Briefcase, GraduationCap, Zap,
    ChevronLeft, ChevronRight, X
} from 'lucide-react';

// Custom Hook for Advanced Scroll Animations with performance optimization
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

// --- OPTIMIZED ABOUT US HERO ANIMATION - Reduced complexity while maintaining visual quality ---
const AboutHeroAnimation = () => {
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
            camera.position.z = 25;

            // Create optimized story-themed particle systems (reduced particle counts)
            const particleSystems = [];
            
            // System 1: Core team particles - REDUCED from 1500 to 800
            const teamGeom = new BufferGeometry();
            const teamCount = 800; // Reduced by 47%
            const teamPos = new Float32Array(teamCount * 3);
            const teamColors = new Float32Array(teamCount * 3);
            const teamVelocities = new Float32Array(teamCount * 3);
            
            for(let i = 0; i < teamCount * 3; i += 3) {
                // Cluster around center to represent team unity
                const radius = Math.random() * 15 + 5;
                const theta = Math.random() * Math.PI * 2;
                const phi = Math.random() * Math.PI;
                
                teamPos[i] = radius * Math.sin(phi) * Math.cos(theta);
                teamPos[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
                teamPos[i + 2] = radius * Math.cos(phi);
                
                teamVelocities[i] = (Math.random() - 0.5) * 0.015;
                teamVelocities[i + 1] = (Math.random() - 0.5) * 0.01;
                teamVelocities[i + 2] = (Math.random() - 0.5) * 0.015;
                
                // Team colors - cyan/sky blues
                const intensity = 0.6 + Math.random() * 0.4;
                teamColors[i] = intensity * 0.3;     // R - low red for cyan
                teamColors[i + 1] = intensity * 0.9; // G - high green for cyan
                teamColors[i + 2] = intensity * 1.0; // B - full blue
            }
            
            teamGeom.setAttribute('position', new BufferAttribute(teamPos, 3));
            teamGeom.setAttribute('color', new BufferAttribute(teamColors, 3));
            teamGeom.setAttribute('velocity', new BufferAttribute(teamVelocities, 3));
            
            const teamMat = new PointsMaterial({
                size: 0.1, // Slightly larger to maintain visual impact with fewer particles
                vertexColors: true,
                blending: AdditiveBlending,
                transparent: true,
                opacity: 0.8
            });
            
            const teamParticles = new Points(teamGeom, teamMat);
            particleSystems.push({
                system: teamParticles,
                geometry: teamGeom,
                velocities: teamVelocities,
                positions: teamPos,
                colors: teamColors,
                type: 'team'
            });
            scene.add(teamParticles);

            // System 2: Innovation particles - REDUCED from 1200 to 600
            const innovationGeom = new BufferGeometry();
            const innovationCount = 600; // Reduced by 50%
            const innovationPos = new Float32Array(innovationCount * 3);
            const innovationColors = new Float32Array(innovationCount * 3);
            const innovationVelocities = new Float32Array(innovationCount * 3);
            
            for(let i = 0; i < innovationCount * 3; i += 3) {
                // Spread wider to represent expanding ideas - more centered
                innovationPos[i] = (Math.random() - 0.5) * 40; // Reduced from 50 to 40
                innovationPos[i + 1] = (Math.random() - 0.5) * 28; // Reduced from 35 to 28
                innovationPos[i + 2] = (Math.random() - 0.5) * 28; // Reduced from 35 to 28
                
                innovationVelocities[i] = (Math.random() - 0.5) * 0.02;
                innovationVelocities[i + 1] = (Math.random() - 0.5) * 0.012;
                innovationVelocities[i + 2] = (Math.random() - 0.5) * 0.02;
                
                // Innovation colors - emerald/teal
                const intensity = 0.5 + Math.random() * 0.5;
                innovationColors[i] = intensity * 0.2;     // R - low for emerald
                innovationColors[i + 1] = intensity * 0.9; // G - high green
                innovationColors[i + 2] = intensity * 0.7; // B - moderate blue
            }
            
            innovationGeom.setAttribute('position', new BufferAttribute(innovationPos, 3));
            innovationGeom.setAttribute('color', new BufferAttribute(innovationColors, 3));
            innovationGeom.setAttribute('velocity', new BufferAttribute(innovationVelocities, 3));
            
            const innovationMat = new PointsMaterial({
                size: 0.08, // Slightly larger to maintain visual impact
                vertexColors: true,
                blending: AdditiveBlending,
                transparent: true,
                opacity: 0.6
            });
            
            const innovationParticles = new Points(innovationGeom, innovationMat);
            particleSystems.push({
                system: innovationParticles,
                geometry: innovationGeom,
                velocities: innovationVelocities,
                positions: innovationPos,
                colors: innovationColors,
                type: 'innovation'
            });
            scene.add(innovationParticles);

            // System 3: Journey particles - REDUCED from 800 to 400
            const journeyGeom = new BufferGeometry();
            const journeyCount = 400; // Reduced by 50%
            const journeyPos = new Float32Array(journeyCount * 3);
            const journeyColors = new Float32Array(journeyCount * 3);
            const journeyVelocities = new Float32Array(journeyCount * 3);
            
            for(let i = 0; i < journeyCount * 3; i += 3) {
                // Create a path-like distribution - more centered
                const t = (i / 3) / journeyCount;
                const pathX = (t - 0.5) * 30; // Reduced from 40 to 30 for more centered look
                const pathY = Math.sin(t * Math.PI * 3) * 6; // Reduced from 8 to 6
                
                journeyPos[i] = pathX + (Math.random() - 0.5) * 8; // Reduced from 10 to 8
                journeyPos[i + 1] = pathY + (Math.random() - 0.5) * 12; // Reduced from 15 to 12
                journeyPos[i + 2] = (Math.random() - 0.5) * 16; // Reduced from 20 to 16
                
                journeyVelocities[i] = (Math.random() - 0.5) * 0.008;
                journeyVelocities[i + 1] = (Math.random() - 0.5) * 0.005;
                journeyVelocities[i + 2] = (Math.random() - 0.5) * 0.008;
                
                // Journey colors - golden/warm
                const intensity = 0.4 + Math.random() * 0.6;
                journeyColors[i] = intensity * 1.0;     // R - high for golden
                journeyColors[i + 1] = intensity * 0.8; // G - medium for golden
                journeyColors[i + 2] = intensity * 0.3; // B - low for golden
            }
            
            journeyGeom.setAttribute('position', new BufferAttribute(journeyPos, 3));
            journeyGeom.setAttribute('color', new BufferAttribute(journeyColors, 3));
            journeyGeom.setAttribute('velocity', new BufferAttribute(journeyVelocities, 3));
            
            const journeyMat = new PointsMaterial({
                size: 0.07, // Slightly larger to maintain visual impact
                vertexColors: true,
                blending: AdditiveBlending,
                transparent: true,
                opacity: 0.7
            });
            
            const journeyParticles = new Points(journeyGeom, journeyMat);
            particleSystems.push({
                system: journeyParticles,
                geometry: journeyGeom,
                velocities: journeyVelocities,
                positions: journeyPos,
                colors: journeyColors,
                type: 'journey'
            });
            scene.add(journeyParticles);

            // Team connection lines - REDUCED from 400 to 200
            const connectionsGeom = new BufferGeometry();
            const maxConnections = 200; // Reduced by 50%
            const connectionPositions = new Float32Array(maxConnections * 6);
            connectionsGeom.setAttribute('position', new BufferAttribute(connectionPositions, 3));
            
            const connectionsMat = new LineBasicMaterial({
                color: 0xB8FFF9,
                transparent: true,
                opacity: 0.12, // Slightly reduced opacity
                blending: AdditiveBlending
            });
            
            const connections = new LineSegments(connectionsGeom, connectionsMat);
            scene.add(connections);

            // Vision sparkles - REDUCED from 200 to 100
            const sparkleGeom = new BufferGeometry();
            const sparkleCount = 100; // Reduced by 50%
            const sparklePositions = new Float32Array(sparkleCount * 3);
            const sparkleSizes = new Float32Array(sparkleCount);
            const sparkleOpacities = new Float32Array(sparkleCount);
            
            for(let i = 0; i < sparkleCount; i++) {
                sparklePositions[i * 3] = (Math.random() - 0.5) * 45; // Reduced from 60 to 45
                sparklePositions[i * 3 + 1] = (Math.random() - 0.5) * 32; // Reduced from 40 to 32
                sparklePositions[i * 3 + 2] = (Math.random() - 0.5) * 32; // Reduced from 40 to 32
                sparkleSizes[i] = Math.random() * 2 + 0.5;
                sparkleOpacities[i] = Math.random();
            }
            
            sparkleGeom.setAttribute('position', new BufferAttribute(sparklePositions, 3));
            sparkleGeom.setAttribute('size', new BufferAttribute(sparkleSizes, 1));
            sparkleGeom.setAttribute('opacity', new BufferAttribute(sparkleOpacities, 1));
            
            const sparkleMat = new PointsMaterial({
                color: 0xffffff,
                size: 0.18, // Slightly larger to maintain impact
                transparent: true,
                blending: AdditiveBlending,
                opacity: 0.6
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

                // Animate each particle system with unique behaviors
                particleSystems.forEach((sys, sysIndex) => {
                    const positions = sys.positions;
                    const velocities = sys.velocities;
                    const colors = sys.colors;
                    
                    for (let i = 0; i < positions.length; i += 3) {
                        if (sys.type === 'team') {
                            // Team particles: gentle orbiting motion around center
                            const centerDistance = Math.sqrt(positions[i] * positions[i] + positions[i + 1] * positions[i + 1]);
                            const orbitSpeed = 0.001 + centerDistance * 0.0001;
                            
                            const waveX = Math.sin(elapsedTime * 0.5 + i * 0.01) * 0.015;
                            const waveY = Math.cos(elapsedTime * 0.4 + i * 0.01) * 0.01;
                            const waveZ = Math.sin(elapsedTime * 0.6 + i * 0.008) * 0.015;
                            
                            positions[i] += velocities[i] + waveX;
                            positions[i + 1] += velocities[i + 1] + waveY;
                            positions[i + 2] += velocities[i + 2] + waveZ;
                            
                            // Team unity effect - pull towards center
                            const pullStrength = 0.001;
                            positions[i] -= positions[i] * pullStrength;
                            positions[i + 1] -= positions[i + 1] * pullStrength;
                            positions[i + 2] -= positions[i + 2] * pullStrength;
                            
                        } else if (sys.type === 'innovation') {
                            // Innovation particles: expanding outward motion with bursts
                            const burstWave = Math.sin(elapsedTime * 0.3 + i * 0.005) * 0.02;
                            const expandMotion = Math.sin(elapsedTime * 0.2) * 0.008;
                            
                            positions[i] += velocities[i] + burstWave + expandMotion;
                            positions[i + 1] += velocities[i + 1] + Math.cos(elapsedTime * 0.4 + i * 0.01) * 0.012;
                            positions[i + 2] += velocities[i + 2] + burstWave;
                            
                        } else if (sys.type === 'journey') {
                            // Journey particles: flowing path motion
                            const pathFlow = Math.sin(elapsedTime * 0.8 + i * 0.02) * 0.01;
                            const progressMotion = elapsedTime * 0.005;
                            
                            positions[i] += velocities[i] + pathFlow;
                            positions[i + 1] += velocities[i + 1] + Math.sin(elapsedTime * 0.6 + positions[i] * 0.1) * 0.008;
                            positions[i + 2] += velocities[i + 2] + pathFlow * 0.5;
                        }
                        
                        // Color pulsing with story themes
                        const colorPulse = 0.6 + Math.sin(elapsedTime * 1.2 + i * 0.015) * 0.4;
                        colors[i] *= colorPulse;
                        colors[i + 1] *= colorPulse;
                        colors[i + 2] *= colorPulse;
                        
                        // Boundary management with smooth wrapping
                        if (Math.abs(positions[i]) > 35) positions[i] *= -0.7;
                        if (Math.abs(positions[i + 1]) > 25) positions[i + 1] *= -0.7;
                        if (Math.abs(positions[i + 2]) > 25) positions[i + 2] *= -0.7;
                    }
                    
                    sys.geometry.attributes.position.needsUpdate = true;
                    sys.geometry.attributes.color.needsUpdate = true;
                });

                // Animate vision sparkles with inspiration-like twinkling
                const sparklePos = sparkles.geometry.attributes.position.array;
                const sparkleOp = sparkles.geometry.attributes.opacity.array;
                
                for(let i = 0; i < sparkleCount; i++) {
                    // Inspirational floating motion
                    sparklePos[i * 3] += Math.sin(elapsedTime * 0.6 + i * 0.1) * 0.01;
                    sparklePos[i * 3 + 1] += Math.cos(elapsedTime * 0.4 + i * 0.08) * 0.012;
                    sparklePos[i * 3 + 2] += Math.sin(elapsedTime * 0.5 + i * 0.05) * 0.008;
                    
                    // Vision twinkling
                    sparkleOp[i] = 0.2 + Math.sin(elapsedTime * 2.5 + i * 0.8) * 0.8;
                    
                    // Reset if too far - updated boundaries to match reduced spreads
                    if (Math.abs(sparklePos[i * 3]) > 30) sparklePos[i * 3] = (Math.random() - 0.5) * 45; // Updated from 40->30 and 60->45
                    if (Math.abs(sparklePos[i * 3 + 1]) > 24) sparklePos[i * 3 + 1] = (Math.random() - 0.5) * 32; // Updated from 30->24 and 40->32
                }
                
                sparkles.geometry.attributes.position.needsUpdate = true;
                sparkles.geometry.attributes.opacity.needsUpdate = true;

                // Team connection lines (connect nearby team particles)
                let connectionIndex = 0;
                const teamSystem = particleSystems[0]; // Team particles
                const positions = teamSystem.positions;
                
                connectionsMat.opacity = 0.08 + Math.sin(elapsedTime * 1.5) * 0.12;
                
                for (let i = 0; i < positions.length && connectionIndex < maxConnections * 6; i += 15) {
                    for (let j = i + 15; j < positions.length && connectionIndex < maxConnections * 6; j += 15) {
                        const dx = positions[i] - positions[j];
                        const dy = positions[i + 1] - positions[j + 1];
                        const dz = positions[i + 2] - positions[j + 2];
                        const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
                        
                        const maxDistance = 6 + Math.sin(elapsedTime * 0.7) * 2;
                        
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

                // Camera movement with storytelling flow - more centered
                const storyFlow = Math.sin(elapsedTime * 0.2) * 1.5; // Reduced from 3 to 1.5
                camera.position.x += (mouse.x * 2 + storyFlow - camera.position.x) * 0.06; // Reduced mouse influence from 6 to 2
                camera.position.y += (-mouse.y * 2 + Math.cos(elapsedTime * 0.15) * 1.5 - camera.position.y) * 0.06; // Reduced from 4 to 2
                camera.position.z = 25 + Math.sin(elapsedTime * 0.3) * 2; // Reduced from 4 to 2
                
                // Gentle scene rotation for dynamic perspective
                scene.rotation.z = Math.sin(elapsedTime * 0.08) * 0.015;
                
                camera.lookAt(scene.position);
                renderer.render(scene, camera);
            };

            animate();

            // Cleanup function
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
                    if (renderer) renderer.dispose();
                } catch {
                    // Cleanup silenzioso
                }
            };

        } catch (error) {
            console.error('About Hero Animation Error:', error);
        }
    }, []);

    return (
        <div 
            ref={mountRef} 
            className="absolute inset-0 z-10"
            style={{ 
                background: 'transparent',
                pointerEvents: 'none',
                willChange: 'transform',
                contain: 'layout style paint'
            }}
        />
    );
};
    
// Optimized About Hero Section with performance improvements
const AboutHero = () => {
    const heroRef = useQuantumScrollAnim();
    
    return (
        <section 
            id="home" 
            ref={heroRef} 
            className="relative min-h-screen flex items-center justify-center overflow-hidden quantum-anim hero-section pt-20"
            style={{ 
                willChange: 'transform',
                contain: 'layout style paint'
            }}
        >
            {/* Background */}
            <div 
                className="absolute inset-0 z-0"
                style={{ contain: 'paint' }}
            >
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
            </div>
            
            {/* Optimized Data Visualization Animation */}
            <div 
                className="pointer-events-none absolute inset-0 z-15 overflow-hidden"
                style={{ 
                    willChange: 'transform',
                    contain: 'layout style paint'
                }}
            >
                {/* Animated Grid Background */}
                <div 
                    className="absolute inset-0 opacity-20"
                    style={{ contain: 'paint' }}
                >
                    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <defs>
                            <pattern id="aboutGrid" width="10" height="10" patternUnits="userSpaceOnUse">
                                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" style={{color: '#B8FFF9'}} />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#aboutGrid)" className="animate-grid-pulse" />
                    </svg>
                </div>

                {/* Optimized Floating Data Bars - Reduced from 16 to 10 total */}
                <div 
                    className="absolute inset-0"
                    style={{ contain: 'layout style' }}
                >
                    {[...Array(8)].map((_, i) => ( // Reduced from 10 to 8
                        <div
                            key={`aboutBar-${i}`}
                            className="absolute rounded-t-sm animate-data-bar opacity-60"
                            style={{
                                background: 'linear-gradient(to top, #B8FFF9, #38bdf8)',
                                left: `${8 + i * 11}%`, // Adjusted spacing
                                bottom: '12%',
                                width: '3px',
                                height: `${20 + (i * 15) % 70}px`,
                                animationDelay: `${i * 0.4}s`, // Slowed down
                                animationDuration: '5s', // Increased duration
                                willChange: 'transform',
                                contain: 'layout style'
                            }}
                        />
                    ))}
                    {/* Second row of bars - Reduced from 6 to 4 */}
                    {[...Array(4)].map((_, i) => ( // Reduced from 6 to 4
                        <div
                            key={`aboutBar2-${i}`}
                            className="absolute rounded-t-sm animate-data-bar-alt opacity-50"
                            style={{
                                background: 'linear-gradient(to top, #B8FFF9, #B8FFF9)',
                                left: `${12 + i * 16}%`, // Adjusted spacing for 4 items
                                top: '18%',
                                width: '2px',
                                height: `${25 + (i * 12) % 50}px`,
                                animationDelay: `${i * 0.6}s`, // Slowed down
                                animationDuration: '4s', // Increased duration
                                willChange: 'transform',
                                contain: 'layout style'
                            }}
                        />
                    ))}
                </div>

                {/* Optimized Orbiting Elements - Reduced complexity */}
                <div 
                    className="absolute top-1/5 left-1/6 w-32 h-32"
                    style={{ 
                        willChange: 'transform',
                        contain: 'layout style'
                    }}
                >
                    <div className="relative w-full h-full animate-orbit-slow">
                        <div 
                            className="absolute top-0 left-1/2 w-3 h-3 rounded-full transform -translate-x-1/2 animate-pulse shadow-lg" 
                            style={{
                                backgroundColor: '#B8FFF9', 
                                boxShadow: '0 0 20px rgba(184, 255, 249, 0.5)',
                                willChange: 'transform'
                            }}
                        ></div>
                        <div 
                            className="absolute bottom-0 right-0 w-2 h-2 rounded-full animate-pulse shadow-lg" 
                            style={{
                                backgroundColor: '#B8FFF9', 
                                boxShadow: '0 0 20px rgba(184, 255, 249, 0.5)', 
                                animationDelay: '0.6s',
                                willChange: 'transform'
                            }}
                        ></div>
                    </div>
                </div>

                <div 
                    className="absolute top-1/4 right-1/5 w-28 h-28"
                    style={{ 
                        willChange: 'transform',
                        contain: 'layout style'
                    }}
                >
                    <div className="relative w-full h-full animate-orbit-fast">
                        <div 
                            className="absolute top-0 left-1/2 w-2 h-2 rounded-full transform -translate-x-1/2 animate-pulse shadow-lg" 
                            style={{
                                backgroundColor: '#B8FFF9', 
                                boxShadow: '0 0 20px rgba(184, 255, 249, 0.5)', 
                                animationDelay: '0.3s',
                                willChange: 'transform'
                            }}
                        ></div>
                    </div>
                </div>

                {/* Optimized Geometric Shapes - Reduced count */}
                <div 
                    className="absolute top-1/6 right-1/3 animate-geometric-float opacity-30"
                    style={{ 
                        willChange: 'transform',
                        contain: 'layout style paint'
                    }}
                >
                    <svg width="40" height="40" viewBox="0 0 40 40" style={{color: '#B8FFF9'}}>
                        <polygon points="20,5 35,20 20,35 5,20" fill="currentColor" className="animate-shape-glow" />
                        <circle cx="20" cy="20" r="4" fill="white" opacity="0.8" />
                    </svg>
                </div>

                {/* Optimized Data Connection Lines */}
                <svg 
                    className="absolute inset-0 w-full h-full opacity-20"
                    style={{ 
                        willChange: 'transform',
                        contain: 'layout style paint'
                    }}
                >
                    <g className="animate-connection-pulse">
                        <line x1="15%" y1="25%" x2="85%" y2="75%" stroke="currentColor" strokeWidth="1" style={{color: '#B8FFF9'}} strokeDasharray="6,3" />
                        <line x1="75%" y1="15%" x2="25%" y2="85%" stroke="currentColor" strokeWidth="1" style={{color: '#B8FFF9'}} strokeDasharray="4,4" />
                    </g>
                </svg>

                {/* Optimized Floating Data Dots - Reduced from 12 to 8 */}
                <div 
                    className="absolute inset-0"
                    style={{ contain: 'layout style' }}
                >
                    {[...Array(8)].map((_, i) => ( // Reduced from 12 to 8
                        <div
                            key={`aboutDot-${i}`}
                            className="absolute rounded-full animate-data-float opacity-40"
                            style={{
                                left: `${10 + (i * 15) % 80}%`, // Adjusted spacing
                                top: `${15 + (i * 11) % 70}%`, // Adjusted spacing
                                width: `${2 + i % 3}px`,
                                height: `${2 + i % 3}px`,
                                backgroundColor: ['#B8FFF9', '#38bdf8', '#06b6d4', '#14b8a6'][i % 4],
                                animationDelay: `${i * 0.5}s`, // Slowed down
                                animationDuration: '6s', // Increased duration
                                willChange: 'transform',
                                contain: 'layout style'
                            }}
                        />
                    ))}
                </div>
            </div>

            {/* Optimized Enhanced Animation Keyframes with hardware acceleration */}
            <style jsx global>{`
                @keyframes grid-pulse {
                    0%, 100% { opacity: 0.1; transform: translate3d(0, 0, 0); }
                    50% { opacity: 0.25; transform: translate3d(0, 0, 0); }
                }

                @keyframes data-bar {
                    0%, 100% { 
                        transform: scale3d(1, 0.3, 1) translate3d(0, 0, 0);
                        opacity: 0.4;
                    }
                    50% { 
                        transform: scale3d(1, 1.1, 1) translate3d(0, -12px, 0);
                        opacity: 0.8;
                    }
                }

                @keyframes data-bar-alt {
                    0%, 100% { 
                        transform: scale3d(1, 0.2, 1) translate3d(0, 0, 0);
                        opacity: 0.3;
                    }
                    50% { 
                        transform: scale3d(1.1, 0.9, 1) translate3d(0, -10px, 0);
                        opacity: 0.7;
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

                @keyframes geometric-float {
                    0%, 100% { 
                        transform: translate3d(0, 0, 0) rotate3d(0, 0, 1, 0deg) scale3d(1, 1, 1);
                    }
                    50% { 
                        transform: translate3d(0, -15px, 0) rotate3d(0, 0, 1, 180deg) scale3d(1.02, 1.02, 1);
                    }
                }

                @keyframes connection-pulse {
                    0%, 100% { 
                        stroke-dashoffset: 0;
                        opacity: 0.15;
                        transform: translate3d(0, 0, 0);
                    }
                    50% { 
                        stroke-dashoffset: 20;
                        opacity: 0.5;
                        transform: translate3d(0, 0, 0);
                    }
                }

                @keyframes shape-glow {
                    0%, 100% { filter: drop-shadow(0 0 3px currentColor); transform: translate3d(0, 0, 0); }
                    50% { filter: drop-shadow(0 0 12px currentColor); transform: translate3d(0, 0, 0); }
                }

                @keyframes inner-pulse {
                    0%, 100% { transform: scale3d(1, 1, 1); opacity: 0.2; }
                    50% { transform: scale3d(1.2, 1.2, 1); opacity: 0.4; }
                }

                @keyframes data-float {
                    0%, 100% { 
                        transform: translate3d(0, 0, 0) scale3d(1, 1, 1);
                        opacity: 0.25;
                    }
                    25% { 
                        transform: translate3d(6px, -12px, 0) scale3d(1.1, 1.1, 1);
                        opacity: 0.5;
                    }
                    50% { 
                        transform: translate3d(-4px, -6px, 0) scale3d(0.9, 0.9, 1);
                        opacity: 0.7;
                    }
                    75% { 
                        transform: translate3d(2px, -15px, 0) scale3d(1.05, 1.05, 1);
                        opacity: 0.4;
                    }
                }

                /* Optimized animation classes with hardware acceleration */
                .animate-grid-pulse { 
                    animation: grid-pulse 6s ease-in-out infinite;
                    will-change: opacity, transform;
                }
                .animate-data-bar { 
                    animation: data-bar 5s ease-in-out infinite;
                    will-change: transform, opacity;
                }
                .animate-data-bar-alt { 
                    animation: data-bar-alt 4s ease-in-out infinite;
                    will-change: transform, opacity;
                }
                .animate-orbit-slow { 
                    animation: orbit-slow 35s linear infinite;
                    will-change: transform;
                }
                .animate-orbit-fast { 
                    animation: orbit-fast 25s linear infinite;
                    will-change: transform;
                }
                .animate-geometric-float { 
                    animation: geometric-float 15s ease-in-out infinite;
                    will-change: transform;
                }
                .animate-connection-pulse { 
                    animation: connection-pulse 10s ease-in-out infinite;
                    will-change: transform, opacity;
                }
                .animate-shape-glow { 
                    animation: shape-glow 5s ease-in-out infinite;
                    will-change: filter, transform;
                }
                .animate-inner-pulse { 
                    animation: inner-pulse 6s ease-in-out infinite;
                    will-change: transform, opacity;
                }
                .animate-data-float { 
                    animation: data-float 8s ease-in-out infinite;
                    will-change: transform, opacity;
                }
            `}</style>
            
            {/* About Hero Animation - Story-driven particles */}
            <AboutHeroAnimation />
            
            <div 
                className="relative z-20 text-center max-w-6xl mx-auto px-4"
                style={{ 
                    willChange: 'transform',
                    contain: 'layout style'
                }}
            >
                <div className="mb-8">
                    <div 
                        className="text-xs tracking-widest mb-4 font-inter" 
                        style={{
                            color: '#B8FFF9',
                            willChange: 'transform'
                        }}
                    >
                        BYLT.MEDIA // ABOUT US
                    </div>
                    <h1 
                        className="text-5xl md:text-7xl font-extrabold leading-tight mb-6"
                        style={{ willChange: 'transform' }}
                    >
                        <span className="block text-white">Who We Are</span>
                        <span 
                            className="block text-transparent bg-clip-text" 
                            style={{
                                backgroundImage: 'linear-gradient(to right, #B8FFF9, #B8FFF9)',
                                willChange: 'transform'
                            }}
                        >& What We Do</span>
                    </h1>
                    <p 
                        className="max-w-4xl mx-auto text-lg md:text-xl text-slate-300 leading-relaxed mb-12"
                        style={{ willChange: 'transform' }}
                    >
                        Discover the story behind BYLT Media, our experienced team, and the ecosystem of brands we've built to serve different industries and communities.
                    </p>
                </div>
            </div>

            <div 
                onClick={() => document.querySelector('#who-we-are')?.scrollIntoView({ behavior: 'smooth' })} 
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 cursor-pointer group"
                style={{ 
                    willChange: 'transform',
                    contain: 'layout style'
                }}
            >
                <div 
                    className="w-6 h-10 border-2 rounded-full flex items-center justify-center relative" 
                    style={{
                        borderColor: 'rgba(184, 255, 249, 0.6)',
                        willChange: 'transform'
                    }}
                >
                    <div 
                        className="w-1 h-2 rounded-full animate-bounce" 
                        style={{
                            backgroundColor: '#B8FFF9',
                            willChange: 'transform'
                        }}
                    ></div>
                </div>
            </div>
        </section>
    );
};

// Optimized Who We Are Section with hardware acceleration
const WhoWeAreSection = () => {
    const sectionRef = useQuantumScrollAnim();
    
    return (
        <section 
            id="who-we-are" 
            ref={sectionRef} 
            className="py-24 bg-slate-900/50 quantum-anim relative z-10"
            style={{ 
                willChange: 'transform',
                contain: 'layout style paint'
            }}
        >
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div 
                    className="text-center mb-16"
                    style={{ willChange: 'transform' }}
                >
                    <h2 className="section-title-enhanced">Our Story</h2>
                    <div className="title-accent-line"></div>
                </div>
                
                <div className="relative">
                    <div 
                        className="text-center mb-12"
                        style={{ willChange: 'transform' }}
                    >
                        <h3 
                            className="text-2xl md:text-3xl font-bold mb-6" 
                            style={{ 
                                color: '#B8FFFA',
                                willChange: 'transform'
                            }}
                        >
                            A New Agency with <span style={{ color: '#B8FFFA' }}>Seasoned Expertise</span>
                        </h3>
                    </div>
                    
                    {/* Two Column Layout */}
                    <div 
                        className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start"
                        style={{ willChange: 'transform' }}
                    >
                        {/* Left Column - New Agency Content */}
                        <div 
                            className="space-y-6"
                            style={{ 
                                willChange: 'transform',
                                contain: 'layout style'
                            }}
                        >
                            <p className="text-lg text-slate-300 leading-relaxed">
                                BYLT Media is a dynamic new company with bases in both London and Edinburgh, bringing together the best of both vibrant business ecosystems. While we're new as an agency, our foundation is built on over 10 years of proven industry experience.
                            </p>
                            <p className="text-lg text-slate-300 leading-relaxed">
                                Our directors have spent over a decade mastering the digital marketing landscape, working with global brands, scaling businesses, and developing innovative strategies that deliver real results. This wealth of experience allows us to hit the ground running and provide enterprise-level expertise from day one.
                            </p>
                        </div>

                        {/* Right Column - Why Choose BYLT */}
                        <div 
                            className="relative"
                            style={{ 
                                willChange: 'transform',
                                contain: 'layout style'
                            }}
                        >
                            <div 
                                className="absolute inset-0 rounded-3xl blur-xl" 
                                style={{
                                    background: 'linear-gradient(to right, rgba(184, 255, 249, 0.05), rgba(184, 255, 249, 0.05))',
                                    contain: 'paint'
                                }}
                            ></div>
                            <div className="relative bg-slate-800/30 rounded-3xl p-8" style={{border: '1px solid rgba(184, 255, 249, 0.2)'}}>
                                <h4 className="text-xl font-bold mb-6" style={{ color: '#B8FFFA' }}>
                                    Why Choose BYLT Media?
                                </h4>
                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{backgroundColor: '#B8FFF9'}}></div>
                                        <span className="text-slate-300">10+ years of proven industry experience</span>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{backgroundColor: '#B8FFF9'}}></div>
                                        <span className="text-slate-300">Strategic offices in London and Edinburgh</span>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{backgroundColor: '#B8FFF9'}}></div>
                                        <span className="text-slate-300">Global reach with local expertise</span>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{backgroundColor: '#B8FFF9'}}></div>
                                        <span className="text-slate-300">Data-driven strategies that deliver results</span>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{backgroundColor: '#B8FFF9'}}></div>
                                        <span className="text-slate-300">Boutique attention with enterprise capabilities</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

// Other Brands Section
const OtherBrandsSection = () => {
    const sectionRef = useQuantumScrollAnim();
    
    return (
        <section id="brands" ref={sectionRef} className="py-24 bg-slate-900/30 quantum-anim relative">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="section-title-enhanced mb-6">
                        Brand Ecosystem
                        <span className="title-accent-line"></span>
                    </h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* BookedUp Media */}
                    <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8 transition-all duration-300 group text-center hover:bg-slate-700/50" style={{'&:hover': {borderColor: 'rgba(184, 255, 249, 0.5)'}}}>
                        <div className="mb-8">
                            <div className="w-48 h-48 mx-auto mb-6 flex items-center justify-center">
                                <img 
                                    src="/images/About/transparent-bookedupmedia.png"
                                    alt="BookedUp Media Logo"
                                    className="w-full h-full object-contain"
                                />
                            </div>
                            <p className="text-slate-400">Hospitality Marketing Specialists</p>
                        </div>
                        
                        <p className="text-slate-300 leading-relaxed mb-8 text-left">
                            Our dedicated hospitality marketing agency focuses exclusively on restaurants, hotels, bars, and entertainment venues. We understand the unique challenges of the hospitality industry and provide specialized strategies to drive bookings and increase customer loyalty.
                        </p>
                        
                        <div className="flex items-center justify-between">
                            <a 
                                href="https://bookedupmedia.com/" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 transition-colors"
                                style={{color: '#B8FFF9'}}
                            >
                                <span>Visit Website</span>
                                <ExternalLink className="w-4 h-4" />
                            </a>
                            <div className="text-sm text-slate-500">Hospitality Focus</div>
                        </div>
                    </div>
                    
                    {/* SEM Stories */}
                    <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8 transition-all duration-300 group text-center hover:bg-slate-700/50" style={{'&:hover': {borderColor: 'rgba(184, 255, 249, 0.5)'}}}>
                        <div className="mb-8">
                            <div className="w-48 h-48 mx-auto mb-6 flex items-center justify-center">
                                <img 
                                    src="/images/About/semstori.webp"
                                    alt="SEM Stories Logo"
                                    className="w-full h-full object-contain"
                                />
                            </div>
                            <p className="text-slate-400">Edinburgh Marketing Events</p>
                        </div>
                        
                        <p className="text-slate-300 leading-relaxed mb-8 text-left">
                            Our signature marketing event series in Edinburgh brings together industry professionals, thought leaders, and innovators. SEM Stories creates a platform for knowledge sharing, networking, and celebrating the evolution of digital marketing.
                        </p>
                        
                        <div className="flex items-center justify-between">
                            <a 
                                href="https://semstories.com/" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 transition-colors"
                                style={{color: '#B8FFF9'}}
                            >
                                <span>Learn More</span>
                                <ExternalLink className="w-4 h-4" />
                            </a>
                            <div className="text-sm text-slate-500">Event Series</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

// Official Partner Section (copied from homepage)
const OfficialPartnerSection = () => {
    const sectionRef = useQuantumScrollAnim(0.1);

    return (
        <div ref={sectionRef} className="py-16 bg-slate-900 quantum-anim partner-section relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                <div className="text-center mb-16">
                    <div className="section-connector mb-8">
                        <div className="connector-line"></div>
                        <div className="connector-dot"></div>
                        <div className="connector-line"></div>
                    </div>
                    <div className="section-title-container">
                        <h2 className="section-title-enhanced partnership-title">
                            Official UK Partner
                        </h2>
                        <div className="title-accent-line"></div>
                    </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left: Partnership Info */}
                    <div className="partnership-info">
                        <div className="partner-logo-container mb-8">
                            <div className="logo-glow-effect">
                                <a 
                                    href="https://marketiseme.com/en/" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="partner-logo-link"
                                >
                                    <img 
                                        src="/images/partners/marketise-me-logo.svg" 
                                        alt="Marketise Me" 
                                        className="partner-logo"
                                    />
                                </a>
                            </div>
                        </div>

                        <h3 className="text-xl md:text-2xl font-bold text-white mb-4 font-inter text-center">
                            Growth Through 
                            <span className="text-[#B8FFFA]"> Strategic Partnership</span>
                        </h3>
                        
                        <p className="text-base text-gray-300 leading-relaxed mb-6 text-center max-w-md mx-auto">
                            Partnered with Marketise Me to deliver proven strategies across 4 continents. 
                            Average ROAS of 9.5x with €200M+ in managed ad spend.
                        </p>
                        
                        <div className="partnership-benefits">
                            <div className="benefit-item">
                                <div className="benefit-icon">
                                    <div className="benefit-dot"></div>
                                </div>
                                <div>
                                    <h4 className="text-white font-semibold text-lg">10+ Years Experience</h4>
                                    <p className="text-gray-400">Proven track record across multiple markets</p>
                                </div>
                            </div>
                            
                            <div className="benefit-item">
                                <div className="benefit-icon">
                                    <div className="benefit-dot"></div>
                                </div>
                                <div>
                                    <h4 className="text-white font-semibold text-lg">Data-Driven Strategy</h4>
                                    <p className="text-gray-400">Every campaign backed by comprehensive analytics</p>
                                </div>
                            </div>
                            
                            <div className="benefit-item">
                                <div className="benefit-icon">
                                    <div className="benefit-dot"></div>
                                </div>
                                <div>
                                    <h4 className="text-white font-semibold text-lg">Long-Term Partnership</h4>
                                    <p className="text-gray-400">We focus on sustainable growth, not quick wins</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Platform Partners */}
                    <div className="platform-partners">
                        <div className="partners-header mb-8">
                            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 font-inter text-center">
                                Official Partners of
                            </h3>
                        </div>

                        <div className="partner-logos-grid">
                            <div className="partner-logo-item">
                                <img 
                                    src="/images/partners/partners logos/google-partner-logo-min.svg" 
                                    alt="Google Partner" 
                                    className="platform-logo"
                                />
                            </div>

                            <div className="partner-logo-item">
                                <img 
                                    src="/images/partners/partners logos/meta_partner_logo.png" 
                                    alt="Meta Business Partner" 
                                    className="platform-logo"
                                />
                            </div>
                        </div>

                        <div className="trust-stats">
                            <div className="stat-item">
                                <div className="stat-number">9.5x</div>
                                <div className="stat-label">Average ROAS</div>
                            </div>
                            <div className="stat-divider"></div>
                            <div className="stat-item">
                                <div className="stat-number">€200M+</div>
                                <div className="stat-label">Ad Spend Managed</div>
                            </div>
                            <div className="stat-divider"></div>
                            <div className="stat-item">
                                <div className="stat-number">4</div>
                                <div className="stat-label">Continents</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .partner-section { 
                    background: linear-gradient(180deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
                    position: relative;
                }
                
                .partner-section::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    height: 1px;
                    background: linear-gradient(90deg, transparent, #B8FFFA, transparent);
                    opacity: 0.3;
                }
                
                .section-connector {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 1rem;
                }
                
                .connector-line {
                    width: 3rem;
                    height: 1px;
                    background: linear-gradient(90deg, transparent, #B8FFFA, transparent);
                }
                
                .connector-dot {
                    width: 8px;
                    height: 8px;
                    background: #B8FFFA;
                    border-radius: 50%;
                    box-shadow: 0 0 20px rgba(184, 255, 250, 0.5);
                    animation: pulse 2s ease-in-out infinite;
                }
                
                @keyframes pulse {
                    0%, 100% { transform: scale(1); opacity: 1; }
                    50% { transform: scale(1.2); opacity: 0.7; }
                }
                
                .partnership-title {
                    background: linear-gradient(135deg, #ffffff 0%, #B8FFFA 50%, #ffffff 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    letter-spacing: -0.025em;
                    text-shadow: 0 0 30px rgba(184, 255, 250, 0.3);
                }
                
                .partnership-underline {
                    width: 120px;
                    height: 4px;
                    background: linear-gradient(90deg, transparent, #B8FFFA, transparent);
                    margin: 0 auto;
                    border-radius: 2px;
                    box-shadow: 0 0 20px rgba(184, 255, 250, 0.5);
                }
                
                .partner-logo-container {
                    display: flex;
                    justify-content: center;
                    position: relative;
                }
                
                .logo-glow-effect {
                    position: relative;
                    padding: 2rem;
                    border-radius: 20px;
                    background: rgba(30, 41, 59, 0.3);
                    border: 1px solid rgba(75, 85, 99, 0.3);
                    transition: all 0.3s ease;
                }
                
                .logo-glow-effect:hover {
                    border-color: rgba(184, 255, 250, 0.4);
                    background: rgba(30, 41, 59, 0.5);
                    box-shadow: 0 0 40px rgba(184, 255, 250, 0.1);
                }
                
                .partner-logo-link {
                    display: inline-block;
                    transition: transform 0.3s ease;
                }
                
                .partner-logo-link:hover {
                    transform: scale(1.05);
                }
                
                .partner-logo {
                    height: 5rem;
                    width: auto;
                    opacity: 0.95;
                    filter: brightness(1.1) contrast(1.1);
                    transition: all 0.3s ease;
                }
                
                .partner-logo:hover {
                    opacity: 1;
                }
                
                .partnership-benefits {
                    display: grid;
                    gap: 1.5rem;
                    margin-top: 2rem;
                }
                
                .benefit-item {
                    display: flex;
                    align-items: flex-start;
                    gap: 1.5rem;
                    padding: 1.5rem;
                    background: rgba(30, 41, 59, 0.3);
                    border-radius: 16px;
                    border: 1px solid rgba(75, 85, 99, 0.3);
                    transition: all 0.3s ease;
                    position: relative;
                    overflow: hidden;
                }
                
                .benefit-item::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    height: 1px;
                    background: linear-gradient(90deg, transparent, #B8FFFA, transparent);
                    opacity: 0;
                    transition: opacity 0.3s ease;
                }
                
                .benefit-item:hover {
                    border-color: rgba(184, 255, 250, 0.4);
                    background: rgba(30, 41, 59, 0.5);
                    transform: translateY(-2px);
                }
                
                .benefit-item:hover::before {
                    opacity: 0.5;
                }
                
                .benefit-icon {
                    width: 48px;
                    height: 48px;
                    background: rgba(184, 255, 250, 0.1);
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                    border: 1px solid rgba(184, 255, 250, 0.2);
                }
                
                .benefit-dot {
                    width: 12px;
                    height: 12px;
                    background: #B8FFFA;
                    border-radius: 50%;
                    box-shadow: 0 0 15px rgba(184, 255, 250, 0.5);
                    animation: pulse 2s ease-in-out infinite;
                }
                
                .partners-header {
                    text-align: center;
                }
                
                .partner-logos-grid {
                    display: flex;
                    justify-content: center;
                    gap: 3rem;
                    margin-bottom: 3rem;
                }
                
                .partner-logo-item {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 1rem;
                    background: transparent;
                    border-radius: 0;
                    border: none;
                    transition: all 0.3s ease;
                    position: relative;
                    overflow: visible;
                    min-width: auto;
                    min-height: auto;
                }
                
                .partner-logo-item::before {
                    display: none;
                }
                
                .partner-logo-item:hover {
                    background: transparent;
                    transform: translateY(-5px);
                    box-shadow: none;
                }
                
                .partner-logo-item:hover::before {
                    display: none;
                }
                
                .partner-logo-item .platform-logo {
                    height: 6rem;
                    width: auto;
                    opacity: 0.95;
                    transition: all 0.3s ease;
                    filter: brightness(1.1) contrast(1.05);
                }
                
                .partner-logo-item:hover .platform-logo {
                    opacity: 1;
                    transform: scale(1.1);
                    filter: brightness(1.2) contrast(1.1);
                }
                
                .partner-cards {
                    display: grid;
                    gap: 1.5rem;
                    margin-bottom: 3rem;
                }
                
                .partner-card {
                    display: flex;
                    align-items: center;
                    gap: 1.5rem;
                    padding: 2rem;
                    background: rgba(30, 41, 59, 0.3);
                    border-radius: 16px;
                    border: 1px solid rgba(75, 85, 99, 0.3);
                    transition: all 0.3s ease;
                    position: relative;
                    overflow: hidden;
                }
                
                .partner-card::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    height: 1px;
                    background: linear-gradient(90deg, transparent, #B8FFFA, transparent);
                    opacity: 0;
                    transition: opacity 0.3s ease;
                }
                
                .partner-card:hover {
                    border-color: rgba(184, 255, 250, 0.4);
                    background: rgba(30, 41, 59, 0.5);
                    transform: translateY(-3px);
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
                }
                
                .partner-card:hover::before {
                    opacity: 0.5;
                }
                
                .platform-logo-container {
                    width: 64px;
                    height: 64px;
                    background: rgba(255, 255, 255, 0.05);
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    transition: all 0.3s ease;
                }
                
                .partner-card:hover .platform-logo-container {
                    background: rgba(184, 255, 250, 0.1);
                    border-color: rgba(184, 255, 250, 0.3);
                }
                
                .platform-logo {
                    height: 2.5rem;
                    width: auto;
                    opacity: 0.9;
                    transition: all 0.3s ease;
                }
                
                .partner-card:hover .platform-logo {
                    opacity: 1;
                    transform: scale(1.05);
                }
                
                .partner-info h4 {
                    margin: 0 0 0.5rem 0;
                }
                
                .partner-info p {
                    margin: 0;
                }
                
                .trust-stats {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 2rem;
                    background: rgba(184, 255, 250, 0.05);
                    border-radius: 16px;
                    border: 1px solid rgba(184, 255, 250, 0.1);
                    backdrop-filter: blur(10px);
                }
                
                .stat-item {
                    text-align: center;
                    flex: 1;
                }
                
                .stat-divider {
                    width: 1px;
                    height: 3rem;
                    background: linear-gradient(180deg, transparent, #B8FFFA, transparent);
                    margin: 0 1rem;
                }
                
                .stat-number {
                    font-size: 1.5rem;
                    font-weight: 700;
                    color: #B8FFFA;
                    font-family: 'Inter', sans-serif;
                    margin-bottom: 0.5rem;
                    display: block;
                }
                
                .stat-label {
                    font-size: 0.875rem;
                    color: #9CA3AF;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                    font-weight: 500;
                }
                
                @media (min-width: 768px) {
                    .partner-logo { height: 6rem; }
                    .stat-number { font-size: 1.75rem; }
                }
                
                @media (max-width: 768px) {
                    .partner-logos-grid {
                        flex-direction: column;
                        align-items: center;
                        gap: 1.5rem;
                    }
                    .partner-logo-item {
                        min-width: 100px;
                        min-height: 100px;
                        padding: 1.5rem;
                    }
                }
                
                @media (max-width: 1024px) {
                    .trust-stats {
                        flex-direction: column;
                        gap: 2rem;
                    }
                    .stat-divider {
                        width: 3rem;
                        height: 1px;
                        margin: 0;
                    }
                }
                
                /* Shared Portfolio Styles */
                .shared-portfolio-container {
                    position: relative;
                    overflow: hidden;
                    padding: 2rem 0;
                    background: rgba(15, 23, 42, 0.5);
                    border-radius: 16px;
                    border: 1px solid rgba(75, 85, 99, 0.2);
                }
                
                .shared-portfolio-track {
                    display: flex;
                    gap: 4rem;
                    align-items: center;
                    justify-content: center;
                    flex-wrap: wrap;
                    max-width: 900px;
                    margin: 0 auto;
                    padding: 0 2rem;
                }
                
                .portfolio-logo {
                    height: 4rem;
                    width: auto;
                    opacity: 0.7;
                    transition: all 0.3s ease;
                    filter: grayscale(20%) brightness(1.1);
                    flex-shrink: 0;
                }
                
                .portfolio-logo:hover {
                    opacity: 1;
                    transform: scale(1.1);
                    filter: grayscale(0%) brightness(1.2);
                }
                
                .portfolio-gradient-left,
                .portfolio-gradient-right {
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    width: 3rem;
                    pointer-events: none;
                    z-index: 10;
                }
                
                .portfolio-gradient-left {
                    left: 0;
                    background: linear-gradient(to right, rgba(15, 23, 42, 0.8), transparent);
                }
                
                .portfolio-gradient-right {
                    right: 0;
                    background: linear-gradient(to left, rgba(15, 23, 42, 0.8), transparent);
                }
                
                @media (max-width: 768px) {
                    .shared-portfolio-track {
                        gap: 2rem;
                        padding: 0 1rem;
                    }
                    .portfolio-logo {
                        height: 3rem;
                    }
                }
            `}</style>
        </div>
    );
};

// Enhanced Testimonials Section for About Page
const FuturisticTestimonials = ({ testimonials }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const scrollContainerRef = useRef(null);
    const startDragRef = useRef(0);
    
    const changeTestimonial = (newIndex) => {
        if (!isAnimating) {
            setIsAnimating(true);
            setTimeout(() => {
                setCurrentIndex(newIndex);
                setIsAnimating(false);
            }, 400);
        }
    };

    // Scroll navigation functions for arrow buttons
    const scrollToNext = () => {
        if (!scrollContainerRef.current) return;
        const container = scrollContainerRef.current;
        const cardWidth = 200; // approximate width of testimonial card + gap
        container.scrollBy({ left: cardWidth, behavior: 'smooth' });
    };

    const scrollToPrev = () => {
        if (!scrollContainerRef.current) return;
        const container = scrollContainerRef.current;
        const cardWidth = 200; // approximate width of testimonial card + gap
        container.scrollBy({ left: -cardWidth, behavior: 'smooth' });
    };

    // Auto-advance testimonial content (separate from manual scrolling)
    const nextTestimonialAuto = () => changeTestimonial((currentIndex + 1) % testimonials.length);

    // Scroll handling functions
    const handleMouseDown = (e) => {
        if (!scrollContainerRef.current) return;
        setIsDragging(true);
        startDragRef.current = e.pageX - scrollContainerRef.current.offsetLeft;
        scrollContainerRef.current.style.cursor = 'grabbing';
    };

    const handleMouseMove = (e) => {
        if (!isDragging || !scrollContainerRef.current) return;
        e.preventDefault();
        const x = e.pageX - scrollContainerRef.current.offsetLeft;
        const scroll = startDragRef.current - x;
        scrollContainerRef.current.scrollLeft += scroll;
        startDragRef.current = x;
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        if (scrollContainerRef.current) {
            scrollContainerRef.current.style.cursor = 'grab';
        }
    };

    const handleTouchStart = (e) => {
        if (!scrollContainerRef.current) return;
        setIsDragging(true);
        startDragRef.current = e.touches[0].pageX - scrollContainerRef.current.offsetLeft;
    };

    const handleTouchMove = (e) => {
        if (!isDragging || !scrollContainerRef.current) return;
        e.preventDefault();
        const x = e.touches[0].pageX - scrollContainerRef.current.offsetLeft;
        const scroll = startDragRef.current - x;
        scrollContainerRef.current.scrollLeft += scroll;
        startDragRef.current = x;
    };

    const handleTouchEnd = () => {
        setIsDragging(false);
    };

    const handleWheel = (e) => {
        if (!scrollContainerRef.current) return;
        e.preventDefault();
        scrollContainerRef.current.scrollLeft += e.deltaY;
    };

    useEffect(() => {
        const handleGlobalMouseMove = (e) => handleMouseMove(e);
        const handleGlobalMouseUp = () => handleMouseUp();
        const handleGlobalTouchMove = (e) => handleTouchMove(e);
        const handleGlobalTouchEnd = () => handleTouchEnd();

        if (isDragging) {
            document.addEventListener('mousemove', handleGlobalMouseMove);
            document.addEventListener('mouseup', handleGlobalMouseUp);
            document.addEventListener('touchmove', handleGlobalTouchMove, { passive: false });
            document.addEventListener('touchend', handleGlobalTouchEnd);
        }

        return () => {
            document.removeEventListener('mousemove', handleGlobalMouseMove);
            document.removeEventListener('mouseup', handleGlobalMouseUp);
            document.removeEventListener('touchmove', handleGlobalTouchMove);
            document.removeEventListener('touchend', handleGlobalTouchEnd);
        };
    }, [isDragging]);

    useEffect(() => {
        const interval = setInterval(nextTestimonialAuto, 8000);
        return () => clearInterval(interval);
    }, [currentIndex, isAnimating]);

    const renderStars = (rating) => {
        return Array.from({ length: 5 }, (_, i) => (
            <Star 
                key={i} 
                size={16} 
                className={`${i < rating ? 'text-[#B8FFFA] fill-current' : 'text-gray-500'} transition-colors duration-300`} 
            />
        ));
    };

    return (
        <div className="testimonial-main-container">
            {/* Featured Testimonial Card */}
            <div className={`testimonial-featured-card ${isAnimating ? 'transitioning' : ''}`}>
                <div className="testimonial-glow-border"></div>
                <div className="testimonial-inner-content">
                    
                    {/* Header with Rating */}
                    <div className="testimonial-header">
                        <div className="testimonial-rating">
                            {renderStars(5)}
                        </div>
                    </div>
                    
                    {/* Main Quote */}
                    <div className="testimonial-quote-section">
                        <div className="quote-decoration-left"></div>
                        <blockquote className="testimonial-quote-text">
                            {testimonials[currentIndex].content}
                        </blockquote>
                        <div className="quote-decoration-right"></div>
                    </div>
                    
                    {/* Author Information */}
                    <div className="testimonial-author-section">
                        <div className="author-avatar-container">
                            <div className="author-avatar-placeholder">
                                <span className="text-2xl font-bold text-slate-900">{testimonials[currentIndex].name.charAt(0)}</span>
                            </div>
                            <div className="avatar-glow"></div>
                        </div>
                        <div className="author-info">
                            <div className="author-name-enhanced">{testimonials[currentIndex].name}</div>
                            <div className="author-role-enhanced">{testimonials[currentIndex].title}</div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Navigation Controls */}
            <div className="testimonial-controls">
                <button onClick={scrollToPrev} className="testimonial-nav-btn prev-btn" disabled={isAnimating}>
                    <ChevronLeft size={20} />
                </button>
                
                <div 
                    className="testimonial-names-row"
                    ref={scrollContainerRef}
                    onMouseDown={handleMouseDown}
                    onTouchStart={handleTouchStart}
                    onWheel={handleWheel}
                    style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
                >
                    {testimonials.map((testimonial, index) => (
                        <button
                            key={index}
                            onClick={() => changeTestimonial(index)}
                            className={`testimonial-name-card ${index === currentIndex ? 'active' : ''}`}
                            disabled={isAnimating}
                            onMouseDown={(e) => e.stopPropagation()}
                        >
                            <div className="name-card-inner">
                                <div className="name-card-avatar">
                                    {testimonial.name.charAt(0)}
                                </div>
                                <div className="name-card-text">
                                    <div className="name-card-name">{testimonial.name}</div>
                                    <div className="name-card-title">{testimonial.title}</div>
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
                
                <button onClick={scrollToNext} className="testimonial-nav-btn next-btn" disabled={isAnimating}>
                    <ChevronRight size={20} />
                </button>
            </div>

            <style jsx>{`
                /* Main Container */
                .testimonial-main-container {
                    max-width: 800px;
                    margin: 0 auto;
                    position: relative;
                }
                
                /* Featured Testimonial Card */
                .testimonial-featured-card {
                    position: relative;
                    background: rgba(30, 41, 59, 0.4);
                    backdrop-filter: blur(20px);
                    border-radius: 20px;
                    padding: 2px;
                    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
                    margin-bottom: 1.5rem;
                    min-height: 300px;
                }
                
                .testimonial-featured-card.transitioning {
                    opacity: 0.7;
                    transform: scale(0.98);
                }
                
                .testimonial-glow-border {
                    position: absolute;
                    inset: 0;
                    border-radius: 20px;
                    background: linear-gradient(45deg, 
                        rgba(184, 255, 250, 0.3), 
                        rgba(75, 85, 99, 0.2), 
                        rgba(184, 255, 250, 0.3)
                    );
                    background-size: 200% 200%;
                    animation: borderGlow 3s ease-in-out infinite;
                    opacity: 0.6;
                }
                
                @keyframes borderGlow {
                    0%, 100% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                }
                
                .testimonial-inner-content {
                    position: relative;
                    background: rgba(30, 41, 59, 0.8);
                    border-radius: 18px;
                    padding: 2rem;
                    height: 100%;
                    backdrop-filter: blur(10px);
                }
                
                /* Header Section */
                .testimonial-header {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin-bottom: 1.5rem;
                    flex-wrap: wrap;
                    gap: 1rem;
                }
                
                .testimonial-project-badge {
                    background: linear-gradient(135deg, rgba(184, 255, 250, 0.2), rgba(184, 255, 250, 0.1));
                    color: #B8FFFA;
                    padding: 0.5rem 1rem;
                    border-radius: 20px;
                    font-size: 0.875rem;
                    font-weight: 600;
                    border: 1px solid rgba(184, 255, 250, 0.3);
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                }
                
                .testimonial-rating {
                    display: flex;
                    gap: 0.25rem;
                    align-items: center;
                }
                
                /* Quote Section */
                .testimonial-quote-section {
                    position: relative;
                    margin: 1.5rem 0;
                }
                
                .quote-decoration-left,
                .quote-decoration-right {
                    position: absolute;
                    font-size: 3rem;
                    font-weight: 900;
                    color: rgba(184, 255, 250, 0.2);
                    font-family: 'Inter', sans-serif;
                    line-height: 1;
                }
                
                .quote-decoration-left {
                    top: -0.5rem;
                    left: -0.5rem;
                }
                
                .quote-decoration-right {
                    bottom: -1.5rem;
                    right: -0.5rem;
                    transform: rotate(180deg);
                }
                
                .testimonial-quote-text {
                    font-size: clamp(1rem, 2.2vw, 1.125rem);
                    line-height: 1.6;
                    color: #E5E7EB;
                    font-weight: 400;
                    font-style: italic;
                    text-align: center;
                    margin: 0;
                    padding: 0.75rem 0;
                    position: relative;
                    z-index: 1;
                }
                
                .quote-decoration-left::before { content: '"'; }
                .quote-decoration-right::before { content: '"'; }
                
                /* Author Section */
                .testimonial-author-section {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    margin-top: 1.5rem;
                    padding-top: 1.5rem;
                    border-top: 1px solid rgba(75, 85, 99, 0.3);
                }
                
                .author-avatar-container {
                    position: relative;
                    flex-shrink: 0;
                }
                
                .author-avatar-placeholder {
                    width: 60px;
                    height: 60px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, #B8FFF9, #38bdf8);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border: 2px solid rgba(184, 255, 250, 0.3);
                    transition: all 0.3s ease;
                }
                
                .avatar-glow {
                    position: absolute;
                    inset: -5px;
                    border-radius: 50%;
                    background: radial-gradient(circle, rgba(184, 255, 250, 0.2) 0%, transparent 70%);
                    z-index: -1;
                    animation: avatarPulse 2s ease-in-out infinite;
                }
                
                @keyframes avatarPulse {
                    0%, 100% { transform: scale(1); opacity: 0.5; }
                    50% { transform: scale(1.1); opacity: 0.8; }
                }
                
                .author-info {
                    flex: 1;
                }
                
                .author-name-enhanced {
                    font-size: 1.125rem;
                    font-weight: 700;
                    color: white;
                    margin-bottom: 0.125rem;
                    font-family: 'Inter', sans-serif;
                }
                
                .author-role-enhanced {
                    font-size: 0.875rem;
                    color: #B8FFFA;
                    margin-bottom: 0.125rem;
                    font-weight: 500;
                }
                
                /* Navigation Controls */
                .testimonial-controls {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 1.5rem;
                    margin-top: 1.5rem;
                    flex-wrap: wrap;
                }
                
                .testimonial-nav-btn {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 45px;
                    height: 45px;
                    background: rgba(30, 41, 59, 0.8);
                    border: 1px solid rgba(75, 85, 99, 0.4);
                    border-radius: 50%;
                    color: #D1D5DB;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    backdrop-filter: blur(10px);
                    flex-shrink: 0;
                }
                
                .testimonial-nav-btn:hover:not(:disabled) {
                    background: rgba(184, 255, 250, 0.1);
                    border-color: rgba(184, 255, 250, 0.3);
                    color: #B8FFFA;
                    transform: translateY(-2px) scale(1.05);
                }
                
                .testimonial-nav-btn:disabled {
                    opacity: 0.5;
                    cursor: not-allowed;
                }
                
                /* Names Row */
                .testimonial-names-row {
                    display: flex;
                    gap: 0.75rem;
                    align-items: center;
                    justify-content: flex-start;
                    flex: 1;
                    max-width: 800px;
                    overflow-x: auto;
                    overflow-y: hidden;
                    flex-wrap: nowrap;
                    scrollbar-width: none;
                    -ms-overflow-style: none;
                    scroll-behavior: smooth;
                    padding: 0 0.5rem;
                    user-select: none;
                    -webkit-user-select: none;
                    -moz-user-select: none;
                    -ms-user-select: none;
                    cursor: grab;
                }
                
                .testimonial-names-row::-webkit-scrollbar {
                    display: none;
                }
                
                .testimonial-name-card {
                    background: rgba(30, 41, 59, 0.6);
                    border: 1px solid rgba(75, 85, 99, 0.3);
                    border-radius: 12px;
                    cursor: pointer;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    padding: 0;
                    overflow: hidden;
                    transform-style: preserve-3d;
                    perspective: 1000px;
                    flex-shrink: 0;
                    min-width: 180px;
                    max-width: 200px;
                    scroll-snap-align: start;
                    user-select: none;
                    -webkit-user-select: none;
                    -moz-user-select: none;
                    -ms-user-select: none;
                }
                
                .testimonial-name-card:hover:not(:disabled) {
                    background: rgba(30, 41, 59, 0.8);
                    border-color: rgba(184, 255, 250, 0.3);
                    transform: translateY(-3px) rotateX(5deg) rotateY(5deg);
                    box-shadow: 0 8px 25px rgba(184, 255, 250, 0.1);
                }
                
                .testimonial-name-card.active {
                    background: rgba(184, 255, 250, 0.1);
                    border-color: rgba(184, 255, 250, 0.4);
                    box-shadow: 0 0 20px rgba(184, 255, 250, 0.2);
                    transform: translateY(-2px) scale(1.02);
                }
                
                .testimonial-name-card:disabled {
                    opacity: 0.6;
                    cursor: not-allowed;
                }
                
                .name-card-inner {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    padding: 0.5rem 0.75rem;
                    transition: transform 0.3s ease;
                }
                
                .testimonial-name-card:hover .name-card-inner {
                    transform: translateZ(10px);
                }
                
                .name-card-avatar {
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, #B8FFF9, #38bdf8);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #0f172a;
                    font-size: 0.875rem;
                    font-weight: bold;
                    flex-shrink: 0;
                }
                
                .name-card-text {
                    text-align: left;
                    min-width: 0;
                }
                
                .name-card-name {
                    font-size: 0.8rem;
                    font-weight: 600;
                    color: white;
                    margin-bottom: 0.125rem;
                    line-height: 1.2;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
                
                .name-card-title {
                    font-size: 0.65rem;
                    color: #9CA3AF;
                    line-height: 1.2;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
                
                /* Responsive Design */
                @media (max-width: 768px) {
                    .testimonial-inner-content {
                        padding: 1.5rem;
                    }
                    
                    .testimonial-header {
                        flex-direction: column;
                        align-items: center;
                        text-align: center;
                    }
                    
                    .testimonial-author-section {
                        flex-direction: column;
                        text-align: center;
                        gap: 0.75rem;
                    }
                    
                    .testimonial-controls {
                        gap: 1rem;
                    }
                    
                    .testimonial-names-row {
                        gap: 0.5rem;
                        max-width: 100%;
                        padding: 0 0.5rem;
                        justify-content: flex-start;
                        scroll-snap-type: x mandatory;
                    }
                    
                    .testimonial-name-card {
                        min-width: 160px;
                        max-width: 180px;
                    }
                    
                    .quote-decoration-left,
                    .quote-decoration-right {
                        font-size: 2.5rem;
                    }
                    
                    .quote-decoration-left {
                        top: -0.25rem;
                        left: -0.25rem;
                    }
                    
                    .quote-decoration-right {
                        bottom: -1rem;
                        right: -0.25rem;
                    }
                }
                
                @media (max-width: 480px) {
                    .testimonial-inner-content {
                        padding: 1.25rem;
                    }
                    
                    .testimonial-names-row {
                        gap: 0.375rem;
                    }
                    
                    .testimonial-name-card {
                        min-width: 140px;
                        max-width: 160px;
                    }
                    
                    .name-card-name {
                        font-size: 0.75rem;
                    }
                    
                    .name-card-title {
                        font-size: 0.6rem;
                    }
                }
            `}</style>
        </div>
    );
};

// Team Leader Section (Teodor)
const TeamLeaderSection = () => {
    const sectionRef = useQuantumScrollAnim();
    
    const testimonials = [
        {
            name: "Andrew Brown",
            title: "Director at SMC Design",
            content: "Teo took exceptional care of us here at SMC Design, we can't thank him enough for all he has done for our company. We were new to SEO and we had limited experience regarding the many opportunities digital marketing had to offer our business. Not only did Teo guide us through the process, he built our platforms from the ground up and demonstrated remarkable patience in taking us through the 'how' and the 'why', as the understanding would only benefit how we approached each new campaign. Teo to a large extent mentored our team, with the sole purpose of improving our visibility, generating new leads and tracking where success lay so we could adapt our strategies for even better results. With Teo we didn't feel like a number, the service was attentive, carefully curated to our needs and thoughtful towards our business. His passion for his work shone through and made the whole experience enjoyable, which is something we valued as much as the results."
        },
        {
            name: "Nuno M.",
            title: "EMEA Paid Search and Media Manager at Canon",
            content: "I've had the privilege of working with Teo for the past five years, and his technical expertise is outstanding. His deep understanding of digital marketing and ability to integrate strategies across channels make him a key asset to any team. Beyond PPC, Teo takes a proactive approach to industry trends, consistently driving results that strengthen both our paid media performance and broader digital strategy. He is highly collaborative, always delivering high-quality work and valuable insights. I highly recommend Teo for any role requiring advanced technical knowledge, strategic thinking, and a strong team-oriented mindset."
        },
        {
            name: "Mark Huntington",
            title: "Senior International Ecommerce Manager at Screwfix",
            content: "I am thrilled to endorse Teo for his exceptional work as a Paid Search Specialist. His expertise and strategic approach have played a significant role in helping Screwfix grow our international business. Teo has a data-driven approach and is also a fantastic problem solver, diving deep into analytics and finding ways to use data and customer signals to provide insightful recommendations and adjustments that keep our campaigns performing at their best. From the outset, Teo demonstrated a deep understanding of our goals and developed campaigns that significantly increased our local reach. Their ability to analyse data and optimise our ad spend has resulted in strong ROI, far exceeding our expectations. The thing that stands out above all else, however, is Teo's friendly positivity and enthusiasm which made working with him a genuine pleasure."
        },
        {
            name: "Azaan Ali",
            title: "Ecommerce & Digital Marketing at Canon EMEA",
            content: "Having worked closely with Teo for over 5 years & witnessing his journey, his immense SEM knowledge & expertise being amongst the best in the field is not the only facet of his character which stands out. His drive, ambition, self-motivation, accountability & relentless commitment to delivering the best is what sets him apart. By striving to understand the wider context of the business he's working on, Teo's approach allowed me to focus on other pillars while knowing one of the key areas of our marketing strategy was in extremely capable hands. Needless to say his contributions have been invaluable in achieving great success, enhancing our knowledge & setting high standards for everyone that works with him. An excellent marketeer, team member, leader and an invaluable asset wherever he chooses to be."
        }
    ];
    
    return (
        <section id="team" ref={sectionRef} className="py-24 bg-slate-900/30 quantum-anim relative">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                <div className="text-center mb-16">
                    <h2 className="section-title-enhanced mb-6">
                        Meet Our Founders
                        <span className="title-accent-line"></span>
                    </h2>
                </div>
                
                {/* Founders Profiles */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
                    {/* Teodor Profile */}
                    <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8 hover:border-cyan-400/50 hover:bg-slate-700/50 transition-all duration-300 hover:scale-105 group">
                        <div className="text-center mb-6">
                            <div className="w-32 h-32 rounded-full mx-auto mb-6 overflow-hidden border-2 group-hover:border-[#B8FFF9]/60 transition-colors" style={{borderColor: 'rgba(184, 255, 249, 0.3)'}}>
                                <img 
                                    src="/images/About/teodor.webp"
                                    alt="Teodor Yordanov"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">Teodor Yordanov</h3>
                            <p style={{color: '#B8FFF9'}} className="font-medium mb-4 group-hover:text-white transition-colors">Co-Founder</p>
                            <a 
                                href="https://www.linkedin.com/in/teodoryordanov/" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-slate-300 transition-colors hover:text-[#B8FFF9]"
                            >
                                <Linkedin className="w-4 h-4" />
                                <span>LinkedIn Profile</span>
                            </a>
                        </div>
                        <div>
                            <h4 className="text-xl font-bold text-white mb-4">Experience & Expertise</h4>
                            <p className="text-slate-300 leading-relaxed mb-4">
                                Teodor Yordanov is a co-founder of BYLT Media, bringing over 10 years of deep expertise in digital marketing and business strategy. His journey spans working with global enterprises, scaling startups, and developing innovative marketing approaches that consistently deliver exceptional results.
                            </p>
                            <p className="text-slate-300 leading-relaxed">
                                With a proven track record of managing multi-million pound campaigns, and mentoring teams across diverse industries, Teodor combines technical excellence with strategic thinking. His passion for the industry and commitment to client success has earned him recognition from colleagues and clients worldwide.
                            </p>
                        </div>
                    </div>

                    {/* Lorenzo Profile */}
                    <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8 hover:border-cyan-400/50 hover:bg-slate-700/50 transition-all duration-300 hover:scale-105 group">
                        <div className="text-center mb-6">
                            <div className="w-32 h-32 rounded-full mx-auto mb-6 overflow-hidden border-2 group-hover:border-[#B8FFF9]/60 transition-colors" style={{borderColor: 'rgba(184, 255, 249, 0.3)'}}>
                                <img 
                                    src="/images/About/profilepic.png"
                                    alt="Lorenzo Bonari"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">Lorenzo Bonari</h3>
                            <p style={{color: '#B8FFF9'}} className="font-medium mb-4 group-hover:text-white transition-colors">Co-Founder</p>
                            <a 
                                href="https://www.linkedin.com/in/lorenzobonari/" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-slate-300 transition-colors hover:text-[#B8FFF9]"
                            >
                                <Linkedin className="w-4 h-4" />
                                <span>LinkedIn Profile</span>
                            </a>
                        </div>
                        <div>
                            <h4 className="text-xl font-bold text-white mb-4">Experience & Expertise</h4>
                            <p className="text-slate-300 leading-relaxed mb-4">
                                Lorenzo Bonari is a co-founder of BYLT Media with over 10 years of comprehensive experience in digital marketing. His journey began in web development before evolving into paid media specialisation and ultimately international expansion strategies for global businesses.
                            </p>
                            <p className="text-slate-300 leading-relaxed">
                                Lorenzo has successfully managed several Fortune 500 clients in their paid media activities and played a pivotal role in helping numerous UK and American brands expand into new markets, with particular expertise in the East Asia region. His deep understanding of cross-cultural marketing dynamics and data-driven approach makes him an invaluable strategic partner for international growth.
                            </p>
                        </div>
                    </div>
                </div>
                
                {/* Stats Cards - Full Width */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-20 -mt-8">
                    <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 text-center hover:border-cyan-400/50 hover:bg-slate-700/50 transition-all duration-300 hover:scale-105 group">
                        <GraduationCap className="w-6 h-6 mb-2 mx-auto group-hover:scale-110 group-hover:text-cyan-300 transition-all" style={{color: '#B8FFF9'}} />
                        <h5 className="text-white font-bold mb-1 text-sm group-hover:text-cyan-300 transition-colors">10+ Years</h5>
                        <p className="text-slate-400 text-xs group-hover:text-slate-300 transition-colors">Industry Experience</p>
                    </div>
                    <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 text-center hover:border-cyan-400/50 hover:bg-slate-700/50 transition-all duration-300 hover:scale-105 group">
                        <Trophy className="w-6 h-6 mb-2 mx-auto group-hover:scale-110 group-hover:text-cyan-300 transition-all" style={{color: '#B8FFF9'}} />
                        <h5 className="text-white font-bold mb-1 text-sm group-hover:text-cyan-300 transition-colors">Global Brands</h5>
                        <p className="text-slate-400 text-xs group-hover:text-slate-300 transition-colors">Enterprise Clients</p>
                    </div>
                    <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 text-center hover:border-cyan-400/50 hover:bg-slate-700/50 transition-all duration-300 hover:scale-105 group">
                        <Target className="w-6 h-6 mb-2 mx-auto group-hover:scale-110 group-hover:text-cyan-300 transition-all" style={{color: '#B8FFF9'}} />
                        <h5 className="text-white font-bold mb-1 text-sm group-hover:text-cyan-300 transition-colors">ROI Focused</h5>
                        <p className="text-slate-400 text-xs group-hover:text-slate-300 transition-colors">Data-Driven Results</p>
                    </div>
                    <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 text-center hover:border-cyan-400/50 hover:bg-slate-700/50 transition-all duration-300 hover:scale-105 group">
                        <Users className="w-6 h-6 mb-2 mx-auto group-hover:scale-110 group-hover:text-cyan-300 transition-all" style={{color: '#B8FFF9'}} />
                        <h5 className="text-white font-bold mb-1 text-sm group-hover:text-cyan-300 transition-colors">Team Leader</h5>
                        <p className="text-slate-400 text-xs group-hover:text-slate-300 transition-colors">Mentor & Strategist</p>
                    </div>
                </div>
                
                {/* Client Testimonials */}
                <div>
                    <h4 className="text-3xl font-bold text-white text-center mb-12">As Seen on LinkedIn</h4>
                    <FuturisticTestimonials testimonials={testimonials} />
                </div>
            </div>
        </section>
    );
};

// Contact Section - NeuralContact Component
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
            // Create mailto link with form data
            const subject = encodeURIComponent(`New Contact Form Submission from ${formData.firstName} ${formData.lastName}`);
            const body = encodeURIComponent(`
Name: ${formData.firstName} ${formData.lastName}
Email: ${formData.email}
Company: ${formData.company}

Message:
${formData.message}
            `);
            
            window.location.href = `mailto:info@byltmedia.com?subject=${subject}&body=${body}`;
            
            setSubmitStatus('success');
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                company: '',
                message: ''
            });
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
                        <h2 className="section-title-enhanced">
                            Let's Build Your Future
                        </h2>
                        <div className="title-accent-line"></div>
                    </div>
                    <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                        Ready to start your next project? Tell us about your vision and we'll turn it into reality.
                    </p>
                </div>

                <div className="contact-form-container">
                    <form onSubmit={handleSubmit} className="contact-form">
                        <div className="form-grid">
                            <div className="form-group">
                                <label htmlFor="firstName" className="form-label">
                                    First Name *
                                </label>
                                <input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    required
                                    className="form-input"
                                    placeholder="Enter your first name"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="lastName" className="form-label">
                                    Last Name *
                                </label>
                                <input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    required
                                    className="form-input"
                                    placeholder="Enter your last name"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email" className="form-label">
                                    Email Address *
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                    className="form-input"
                                    placeholder="your.email@company.com"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="company" className="form-label">
                                    Company
                                </label>
                                <input
                                    type="text"
                                    id="company"
                                    name="company"
                                    value={formData.company}
                                    onChange={handleInputChange}
                                    className="form-input"
                                    placeholder="Your company name"
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="message" className="form-label">
                                Message *
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleInputChange}
                                required
                                rows={6}
                                className="form-textarea"
                                placeholder="Tell us about your project, goals, and how we can help you build your digital future..."
                            />
                        </div>

                        <div className="form-submit">
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
                                        <span>Send Message</span>
                                        <MoveRight className="ml-3 transition-transform duration-300" />
                                    </>
                                )}
                            </button>
                        </div>

                        {submitStatus === 'success' && (
                            <div className="status-message success">
                                <Mail className="w-5 h-5" />
                                <span>Thank you! Your message has been sent successfully.</span>
                            </div>
                        )}

                        {submitStatus === 'error' && (
                            <div className="status-message error">
                                <X className="w-5 h-5" />
                                <span>There was an error sending your message. Please try again.</span>
                            </div>
                        )}
                    </form>
                </div>

                <div className="contact-details">
                    <div className="contact-detail-item">
                        <Mail className="w-5 h-5 text-gray-400" />
                        <span>info@byltmedia.com</span>
                    </div>
                </div>
            </div>
            <style jsx>{`
                .contact-neural-grid { 
                    background-image: linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), 
                                      linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px); 
                    background-size: 40px 40px; 
                }
                
                .contact-form-container { 
                    position: relative; 
                    max-width: 800px; 
                    margin: 0 auto 3rem auto; 
                    padding: 2px; 
                    background: linear-gradient(45deg, #4b5563, #1e293b); 
                    border-radius: 24px; 
                }
                
                .contact-form { 
                    background: #1e293b; 
                    border-radius: 22px; 
                    padding: 3rem; 
                    position: relative; 
                    z-index: 2; 
                }
                
                .form-grid { 
                    display: grid; 
                    grid-template-columns: repeat(2, 1fr); 
                    gap: 1.5rem; 
                    margin-bottom: 1.5rem; 
                }
                
                .form-group { 
                    position: relative; 
                }
                
                .form-label { 
                    display: block; 
                    font-family: 'Inter', sans-serif; 
                    font-size: 0.875rem; 
                    font-weight: 600; 
                    color: #e5e7eb; 
                    margin-bottom: 0.5rem; 
                    text-transform: uppercase; 
                    letter-spacing: 0.05em; 
                }
                
                .form-input, .form-textarea { 
                    width: 100%; 
                    padding: 1rem 1.25rem; 
                    background: rgba(30, 41, 59, 0.5); 
                    border: 1px solid #374151; 
                    border-radius: 12px; 
                    color: #e5e7eb; 
                    font-family: 'Inter', sans-serif; 
                    font-size: 1rem; 
                    transition: all 0.3s ease; 
                    backdrop-filter: blur(8px); 
                }
                
                .form-input:focus, .form-textarea:focus { 
                    outline: none; 
                    border-color: #B8FFFA; 
                    background: rgba(30, 41, 59, 0.8); 
                    box-shadow: 0 0 0 2px rgba(184, 255, 250, 0.1); 
                }
                
                .form-input::placeholder, .form-textarea::placeholder { 
                    color: #9ca3af; 
                }
                
                .form-textarea { 
                    resize: vertical; 
                    min-height: 120px; 
                }
                
                .form-submit { 
                    display: flex; 
                    justify-content: center; 
                    margin-top: 2rem; 
                }
                
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
                }
                
                .neural-submit-button:hover:not(:disabled) { 
                    transform: translateY(-3px) scale(1.05); 
                    box-shadow: 0 10px 30px rgba(184, 255, 250, 0.3); 
                    background: #9DFFF8; 
                }
                
                .neural-submit-button:disabled { 
                    opacity: 0.7; 
                    cursor: not-allowed; 
                    transform: none; 
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
                
                .status-message { 
                    display: flex; 
                    align-items: center; 
                    gap: 0.75rem; 
                    padding: 1rem 1.25rem; 
                    margin-top: 1.5rem; 
                    border-radius: 12px; 
                    font-family: 'Inter', sans-serif; 
                    font-size: 0.875rem; 
                    font-weight: 500; 
                }
                
                .status-message.success { 
                    background: rgba(34, 197, 94, 0.1); 
                    border: 1px solid rgba(34, 197, 94, 0.3); 
                    color: #22c55e; 
                }
                
                .status-message.error { 
                    background: rgba(239, 68, 68, 0.1); 
                    border: 1px solid rgba(239, 68, 68, 0.3); 
                    color: #ef4444; 
                }
                
                .contact-details { 
                    display: flex; 
                    justify-content: center; 
                    gap: 3rem; 
                    flex-wrap: wrap; 
                }
                
                .contact-detail-item { 
                    display: flex; 
                    align-items: center; 
                    gap: 0.75rem; 
                    color: #9ca3af; 
                    font-family: 'Inter', sans-serif; 
                    font-size: 0.875rem; 
                }
                
                @media (max-width: 768px) { 
                    .form-grid { 
                        grid-template-columns: 1fr; 
                        gap: 1rem; 
                    }
                    
                    .contact-form { 
                        padding: 2rem; 
                    }
                    
                    .contact-details { 
                        flex-direction: column; 
                        gap: 1rem; 
                        align-items: center; 
                    }
                    
                    .neural-submit-button {
                        padding: 1rem 2rem;
                        font-size: 1rem;
                    }
                }
            `}</style>
        </section>
    );
};

// Additional Styles for Background Animations
const BackgroundAnimationStyles = () => (
    <style jsx global>{`
        .quantum-grid-animation { 
            background-image: linear-gradient(rgba(184, 255, 250, 0.05) 1px, transparent 1px), 
                             linear-gradient(90deg, rgba(184, 255, 250, 0.05) 1px, transparent 1px); 
            background-size: 50px 50px; 
            opacity: 0.3; 
            animation: gridMove 20s linear infinite;
            width: 100%;
            height: 100%;
        }
        
        @keyframes gridMove { 
            from { transform: translate(0, 0); } 
            to { transform: translate(50px, 50px); } 
        }
        
        @keyframes animate-data-bar {
            0%, 100% { 
                transform: scaleY(0.3);
                opacity: 0.5;
            }
            50% { 
                transform: scaleY(1);
                opacity: 1;
            }
        }
        
        .animate-data-bar {
            animation: animate-data-bar 3s ease-in-out infinite;
            transform-origin: bottom;
        }
        
        /* Dotted Background Pattern */
        .dotted-bg {
            background-image: 
                radial-gradient(circle at 2px 2px, rgba(184, 255, 250, 0.15) 1px, transparent 0);
            background-size: 20px 20px;
            opacity: 0.3;
        }
        
        /* Neural Network Background */
        .neural-network-bg {
            background: 
                radial-gradient(circle at 25% 25%, rgba(184, 255, 250, 0.03) 0%, transparent 60%),
                radial-gradient(circle at 75% 75%, rgba(184, 255, 250, 0.02) 0%, transparent 60%),
                linear-gradient(135deg, rgba(30, 41, 59, 0.1) 0%, transparent 100%);
            animation: neuralFlow 25s ease-in-out infinite;
        }
        
        @keyframes neuralFlow {
            0%, 100% { transform: translateX(0) translateY(0) scale(1); }
            33% { transform: translateX(15px) translateY(-8px) scale(1.01); }
            66% { transform: translateX(-10px) translateY(12px) scale(0.99); }
        }
        
        /* Gradient Overlay Background */
        .gradient-overlay-bg {
            background: linear-gradient(
                135deg,
                rgba(15, 23, 42, 0.1) 0%,
                rgba(30, 41, 59, 0.05) 50%,
                rgba(15, 23, 42, 0.1) 100%
            );
            backdrop-filter: blur(1px);
        }
    `}</style>
);

// Main About Page Component
export default function AboutPage() {
    return (
        <Layout>
            <Head>
                <title>About Us - BYLT Media | Digital Marketing Agency London & Edinburgh</title>
                <meta name="description" content="Learn about BYLT Media, our experienced team, and our ecosystem of brands. Based in London and Edinburgh with 10+ years of industry expertise." />
                <link rel="icon" href="/favicon.ico" />
                <link rel="canonical" href="https://www.byltmedia.com/about" />
                <meta name="robots" content="index, follow" />
                
                {/* Open Graph Meta Tags */}
                <meta property="og:title" content="About Us - BYLT Media | Digital Marketing Agency" />
                <meta property="og:description" content="Learn about BYLT Media, our experienced team, and our ecosystem of brands. Based in London and Edinburgh with 10+ years of industry expertise." />
                <meta property="og:image" content="https://www.byltmedia.com/images/byltmediapreview.png" />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta property="og:url" content="https://www.byltmedia.com/about" />
                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="BYLT Media" />
                
                {/* Twitter Card Meta Tags */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="About Us - BYLT Media | Digital Marketing Agency" />
                <meta name="twitter:description" content="Learn about BYLT Media, our experienced team, and our ecosystem of brands. Based in London and Edinburgh with 10+ years of industry expertise." />
                <meta name="twitter:image" content="https://www.byltmedia.com/images/byltmediapreview.png" />
                
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
                
                {/* Schema Markup for About Page */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "AboutPage",
                            "mainEntity": {
                                "@type": "Organization",
                                "name": "BYLT Media",
                                "url": "https://www.byltmedia.com",
                                "description": "BYLT Media is a future-forward digital agency with 10+ years of industry expertise, specialising in Performance Marketing, SEO, Web Development, and AI Solutions.",
                                "foundingDate": "2020",
                                "employee": [
                                    {
                                        "@type": "Person",
                                        "name": "Teodor Bonev",
                                        "jobTitle": "Founder & CEO",
                                        "worksFor": {
                                            "@type": "Organization",
                                            "name": "BYLT Media"
                                        }
                                    }
                                ],
                                "parentOrganization": [
                                    {
                                        "@type": "Organization", 
                                        "name": "BookedUp Media",
                                        "description": "Hospitality Marketing Specialists"
                                    },
                                    {
                                        "@type": "Organization",
                                        "name": "SEM Stories", 
                                        "description": "Edinburgh Marketing Events"
                                    }
                                ],
                                "knowsAbout": [
                                    "Digital Marketing Strategy",
                                    "Performance Marketing",
                                    "Search Engine Optimization", 
                                    "Web Development",
                                    "AI Solutions",
                                    "Data Science",
                                    "E-commerce Growth"
                                ]
                            }
                        })
                    }}
                />
            </Head>
            <GlobalStyles />
            
            <AboutHero />
            <WhoWeAreSection />
            <OtherBrandsSection />
            <OfficialPartnerSection />
            <TeamLeaderSection />
            <NeuralContact />
            
            <style jsx global>{`
                .quantum-anim {
                    opacity: 0;
                    transform: translate3d(0, 30px, 0);
                    transition: all 0.8s ease;
                    will-change: transform, opacity;
                }
                
                .quantum-anim.quantum-visible {
                    opacity: 1;
                    transform: translate3d(0, 0, 0);
                }
                
                .hero-section {
                    background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
                    will-change: transform;
                    contain: layout style paint;
                }
                
                /* Hardware acceleration for section titles */
                .section-title-enhanced {
                    will-change: transform;
                    contain: layout style;
                }
                
                .title-accent-line {
                    will-change: transform;
                    contain: layout style;
                }
            `}</style>
        </Layout>
    );
}
