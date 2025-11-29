import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Layout from '../components/layout';
import GlobalStyles from '../components/globalsyles';
import {
    Menu, X, Mail, Phone, MapPin, ChevronLeft, ChevronRight, Star, ChevronDown, MoveRight,
    Briefcase, Workflow, TrendingUp, Search, Code, BrainCircuit, Lightbulb, Construction,
    Rocket, BarChart, Clock, Target, DollarSign, CheckCircle, Award, Image as ImageIcon, ShoppingCart, Youtube,
    Building, HeartPulse, Car, Plane, ShoppingBag, Utensils, Scale, Zap, Link, FileText, Share2, Bot, Cpu, Database,
    Home, Heart
} from 'lucide-react';
// Tree-shaken Three.js imports - only import what we actually use
import { 
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  Vector3,
  SphereGeometry,
  MeshBasicMaterial,
  Mesh,
  BufferGeometry,
  Float32BufferAttribute,
  LineBasicMaterial,
  LineSegments,
  PointsMaterial,
  AdditiveBlending,
  Points,
  Vector2,
  Clock as ThreeClock,
  BufferAttribute,
  CanvasTexture,
  SpriteMaterial,
  Sprite,
  RingGeometry,
  DoubleSide,
  Color
} from 'three';

// --- V11.1: UPDATED NAVIGATION STRUCTURE ---

// Optimized Custom Hook for Advanced Scroll Animations with Performance Enhancements
const useQuantumScrollAnim = (threshold = 0.1, delay = 0) => {
    const ref = useRef(null);
    const animationFrameRef = useRef(null);
    
    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    const animate = () => {
                        setTimeout(() => {
                            element.classList.add('quantum-visible');
                        }, delay);
                    };
                    
                    animationFrameRef.current = requestAnimationFrame(animate);
                    observer.unobserve(element);
                }
            },
            { threshold, rootMargin: '50px' }
        );
        
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

// Optimized ADVANCED AI NEURAL NETWORK ANIMATION with Performance Enhancements
const AIHeroAnimation = () => {
    const mountRef = useRef(null);
    const animationFrameRef = useRef(null);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        const currentMount = mountRef.current;

        // --- Scene Setup ---
        const scene = new Scene();
        const camera = new PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
        const renderer = new WebGLRenderer({ 
            alpha: true, 
            antialias: true,
            powerPreference: "high-performance"
        });
        renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        currentMount.appendChild(renderer.domElement);
        camera.position.z = 120;

        // --- Optimized Neural Network (Reduced by ~40%) ---
        const NEURON_COUNT = 21; // Reduced from 35 to 21
        const LAYER_COUNT = 4; // Reduced from 5 to 4
        const NEURONS_PER_LAYER = [4, 6, 7, 4]; // Reduced neurons per layer
        const CONNECTION_PROBABILITY = 0.25; // Reduced from 0.3 to 0.25
        const DATA_PACKET_COUNT = 4; // Reduced from 6 to 4
        
        const neurons = [];
        const dataPackets = [];
        const synapses = [];
        
        // Create realistic neural network layers
        let neuronIndex = 0;
        for (let layer = 0; layer < LAYER_COUNT; layer++) {
            const neuronsInLayer = NEURONS_PER_LAYER[layer];
            for (let neuron = 0; neuron < neuronsInLayer; neuron++) {
                const x = (layer - LAYER_COUNT / 2 + 0.5) * 60;
                const y = (neuron - neuronsInLayer / 2 + 0.5) * 30 + (Math.random() - 0.5) * 15;
                const z = (Math.random() - 0.5) * 50;
                
                neurons.push({
                    id: neuronIndex++,
                    position: new Vector3(x, y, z),
                    originalPosition: new Vector3(x, y, z),
                    layer: layer,
                    activity: Math.random() * 0.5,
                    threshold: 0.5 + Math.random() * 0.3,
                    connections: [],
                    dendrites: [],
                    axons: [],
                    pulsePhase: Math.random() * Math.PI * 2,
                    lastFired: 0,
                    isActive: false
                });
            }
        }

        // Create realistic neural connections
        neurons.forEach((neuron, i) => {
            // Connect to neurons in the next layer
            const nextLayerStart = neurons.findIndex(n => n.layer === neuron.layer + 1);
            const nextLayerEnd = neurons.findLastIndex(n => n.layer === neuron.layer + 1);
            
            if (nextLayerStart !== -1) {
                for (let j = nextLayerStart; j <= nextLayerEnd; j++) {
                    if (Math.random() < CONNECTION_PROBABILITY) {
                        const weight = (Math.random() - 0.5) * 2; // Can be negative or positive
                        synapses.push({
                            from: i,
                            to: j,
                            weight: weight,
                            strength: Math.abs(weight),
                            isInhibitory: weight < 0,
                            lastSignal: 0,
                            signalStrength: 0,
                            pulseTimer: Math.random() * 100
                        });
                        neuron.connections.push(j);
                        neurons[j].dendrites.push(i);
                    }
                }
            }
            
            // Also create some random connections within nearby layers for complexity
            if (Math.random() < 0.1) {
                const randomNeuron = Math.floor(Math.random() * neurons.length);
                if (randomNeuron !== i && Math.abs(neurons[randomNeuron].layer - neuron.layer) <= 1) {
                    const weight = (Math.random() - 0.5) * 1.5;
                    synapses.push({
                        from: i,
                        to: randomNeuron,
                        weight: weight,
                        strength: Math.abs(weight),
                        isInhibitory: weight < 0,
                        lastSignal: 0,
                        signalStrength: 0,
                        pulseTimer: Math.random() * 100
                    });
                }
            }
        });

        // --- Neuron Cell Bodies ---
        const neuronGeometry = new SphereGeometry(1.2, 12, 12);
        const neuronMaterials = neurons.map(() => new MeshBasicMaterial({
            color: 0x4a5568,
            transparent: true,
            opacity: 0.7
        }));

        const neuronMeshes = neurons.map((neuron, i) => {
            const mesh = new Mesh(neuronGeometry, neuronMaterials[i]);
            mesh.position.copy(neuron.position);
            scene.add(mesh);
            return mesh;
        });

        // --- Dendrites (input branches) ---
        const dendriteGeometry = new BufferGeometry();
        const dendritePositions = [];
        const dendriteIndices = [];
        
        neurons.forEach((neuron, neuronIndex) => {
            const basePos = neuron.position;
            // Create 3-5 dendrite branches per neuron
            const dendriteCount = 3 + Math.floor(Math.random() * 3);
            
            for (let d = 0; d < dendriteCount; d++) {
                const angle = (d / dendriteCount) * Math.PI * 2;
                const length = 8 + Math.random() * 6;
                
                // Create branching dendrite
                let currentPos = basePos.clone();
                dendritePositions.push(currentPos.x, currentPos.y, currentPos.z);
                
                for (let segment = 0; segment < 3; segment++) {
                    const segmentLength = length / 3;
                    const randomOffset = new Vector3(
                        (Math.random() - 0.5) * 3,
                        (Math.random() - 0.5) * 3,
                        (Math.random() - 0.5) * 2
                    );
                    
                    const direction = new Vector3(
                        Math.cos(angle) * segmentLength,
                        Math.sin(angle) * segmentLength,
                        0
                    ).add(randomOffset);
                    
                    currentPos.add(direction);
                    dendritePositions.push(currentPos.x, currentPos.y, currentPos.z);
                    
                    // Connect segments
                    const vertexIndex = (dendritePositions.length / 3) - 1;
                    if (segment > 0) {
                        dendriteIndices.push(vertexIndex - 1, vertexIndex);
                    }
                }
            }
        });
        
        dendriteGeometry.setAttribute('position', new Float32BufferAttribute(dendritePositions, 3));
        dendriteGeometry.setIndex(dendriteIndices);
        
        const dendriteMaterial = new LineBasicMaterial({
            color: 0x68d391,
            transparent: true,
            opacity: 0.4,
            linewidth: 1
        });
        
        const dendriteMesh = new LineSegments(dendriteGeometry, dendriteMaterial);
        scene.add(dendriteMesh);

        // --- Axons and Synapses ---
        const synapseGeometry = new BufferGeometry();
        const synapsePositions = new Float32Array(synapses.length * 6);
        const synapseColors = new Float32Array(synapses.length * 6);
        
        synapses.forEach((synapse, i) => {
            const fromPos = neurons[synapse.from].position;
            const toPos = neurons[synapse.to].position;
            
            // Create curved axon path
            const midPoint = new Vector3()
                .addVectors(fromPos, toPos)
                .multiplyScalar(0.5)
                .add(new Vector3(
                    (Math.random() - 0.5) * 10,
                    (Math.random() - 0.5) * 10,
                    (Math.random() - 0.5) * 5
                ));
            
            synapsePositions[i * 6] = fromPos.x;
            synapsePositions[i * 6 + 1] = fromPos.y;
            synapsePositions[i * 6 + 2] = fromPos.z;
            synapsePositions[i * 6 + 3] = toPos.x;
            synapsePositions[i * 6 + 4] = toPos.y;
            synapsePositions[i * 6 + 5] = toPos.z;
        });

        synapseGeometry.setAttribute('position', new BufferAttribute(synapsePositions, 3));
        synapseGeometry.setAttribute('color', new BufferAttribute(synapseColors, 3));

        const synapseMaterial = new LineBasicMaterial({
            vertexColors: true,
            transparent: true,
            opacity: 0.3,
            blending: AdditiveBlending
        });

        const synapseMesh = new LineSegments(synapseGeometry, synapseMaterial);
        scene.add(synapseMesh);

        // --- Neural Signals (Action Potentials) ---
        const signalGeometry = new SphereGeometry(0.4, 6, 6);
        const signalMaterial = new MeshBasicMaterial({
            color: 0xffd700,
            transparent: true,
            opacity: 0.9
        });

        for (let i = 0; i < DATA_PACKET_COUNT; i++) {
            const signal = new Mesh(signalGeometry, signalMaterial.clone());
            const startNeuron = Math.floor(Math.random() * NEURONS_PER_LAYER[0]); // Start from input layer
            signal.position.copy(neurons[startNeuron].position);
            scene.add(signal);
            
            dataPackets.push({
                mesh: signal,
                currentNeuron: startNeuron,
                targetNeuron: startNeuron,
                progress: 0,
                speed: 0.015 + Math.random() * 0.02,
                synapseIndex: -1,
                isTransmitting: false
            });
        }

        // --- Enhanced Binary Code ---
        const binaryElements = [];
        const binaryCount = 15;
        
        for (let i = 0; i < binaryCount; i++) {
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.width = 128;
            canvas.height = 32;
            
            context.fillStyle = '#B8FFFA';
            context.font = '16px monospace';
            context.textAlign = 'center';
            const binaryString = Array.from({length: 8}, () => Math.random() > 0.5 ? '1' : '0').join('');
            context.fillText(binaryString, 64, 20);
            
            const texture = new CanvasTexture(canvas);
            const material = new SpriteMaterial({
                map: texture,
                transparent: true,
                opacity: 0.35
            });
            
            const sprite = new Sprite(material);
            sprite.scale.set(18, 5, 1);
            sprite.position.set(
                (Math.random() - 0.5) * 350,
                (Math.random() - 0.5) * 250,
                (Math.random() - 0.5) * 180
            );
            
            scene.add(sprite);
            binaryElements.push({
                sprite: sprite,
                velocity: new Vector3(
                    (Math.random() - 0.5) * 0.3,
                    (Math.random() - 0.5) * 0.2,
                    (Math.random() - 0.5) * 0.15
                ),
                originalOpacity: 0.35,
                updateTimer: Math.random() * 250,
                glowPhase: Math.random() * Math.PI * 2
            });
        }

        // --- Energy Pulses ---
        const energyPulses = [];
        const createEnergyPulse = () => {
            const pulseGeometry = new RingGeometry(0.5, 1.5, 16);
            const pulseMaterial = new MeshBasicMaterial({
                color: 0xB8FFFA,
                transparent: true,
                opacity: 0.8,
                side: DoubleSide
            });
            const pulse = new Mesh(pulseGeometry, pulseMaterial);
            
            // Random position around the neural network
            pulse.position.set(
                (Math.random() - 0.5) * 200,
                (Math.random() - 0.5) * 150,
                (Math.random() - 0.5) * 100
            );
            
            scene.add(pulse);
            energyPulses.push({
                mesh: pulse,
                scale: 0.1,
                maxScale: 2 + Math.random() * 3,
                fadeSpeed: 0.02 + Math.random() * 0.01
            });
        };

        // Create initial energy pulses
        for (let i = 0; i < 3; i++) {
            createEnergyPulse();
        }

        // --- Floating Particles ---
        const floatingParticles = [];
        const particleGeometry = new SphereGeometry(0.1, 4, 4);
        for (let i = 0; i < 20; i++) {
            const particleMaterial = new MeshBasicMaterial({
                color: new Color().setHSL(0.5 + Math.random() * 0.1, 0.8, 0.6),
                transparent: true,
                opacity: 0.4
            });
            const particle = new Mesh(particleGeometry, particleMaterial);
            particle.position.set(
                (Math.random() - 0.5) * 300,
                (Math.random() - 0.5) * 200,
                (Math.random() - 0.5) * 150
            );
            scene.add(particle);
            floatingParticles.push({
                mesh: particle,
                velocity: new Vector3(
                    (Math.random() - 0.5) * 0.1,
                    (Math.random() - 0.5) * 0.1,
                    (Math.random() - 0.5) * 0.1
                ),
                originalPosition: particle.position.clone(),
                phase: Math.random() * Math.PI * 2
            });
        }

        // --- Mouse Interaction ---
        const mouse = new Vector2();
        const target = new Vector2();
        const handleMouseMove = (event) => {
            target.x = (event.clientX / window.innerWidth) * 2 - 1;
            target.y = -(event.clientY / window.innerHeight) * 2 + 1;
        };
        window.addEventListener('mousemove', handleMouseMove);

        // --- Optimized Animation Loop with Performance Throttling ---
        const clock = new ThreeClock();
        let frameCount = 0;
        let lastTime = 0;
        const targetFPS = 60;
        const frameInterval = 1000 / targetFPS;
        
        const animate = (currentTime) => {
            animationFrameRef.current = requestAnimationFrame(animate);
            
            // Performance throttling
            if (currentTime - lastTime < frameInterval) return;
            lastTime = currentTime;
            
            const elapsedTime = clock.getElapsedTime();
            frameCount++;

            mouse.lerp(target, 0.05);

            // Realistic neural network simulation
            neurons.forEach((neuron, i) => {
                // Calculate input from connected neurons
                let totalInput = 0;
                neuron.dendrites.forEach(sourceNeuronIndex => {
                    const sourceNeuron = neurons[sourceNeuronIndex];
                    if (sourceNeuron.isActive) {
                        // Find the synapse
                        const synapse = synapses.find(s => s.from === sourceNeuronIndex && s.to === i);
                        if (synapse) {
                            totalInput += synapse.weight * sourceNeuron.activity;
                        }
                    }
                });
                
                // Add some random baseline activity
                totalInput += Math.sin(elapsedTime * 2 + neuron.pulsePhase) * 0.1;
                
                // Update neuron activity based on input
                neuron.activity += (totalInput - neuron.activity) * 0.1;
                
                // Check if neuron fires (reaches threshold)
                const wasActive = neuron.isActive;
                neuron.isActive = neuron.activity > neuron.threshold;
                
                // If neuron just fired, create visual effects
                if (neuron.isActive && !wasActive) {
                    neuron.lastFired = elapsedTime;
                    // Send signals to connected neurons
                    neuron.connections.forEach(targetIndex => {
                        const synapse = synapses.find(s => s.from === i && s.to === targetIndex);
                        if (synapse) {
                            synapse.lastSignal = elapsedTime;
                            synapse.signalStrength = 1.0;
                        }
                    });
                }
                
                // Visual representation
                const material = neuronMaterials[i];
                const mesh = neuronMeshes[i];
                
                if (neuron.isActive) {
                    // Active neuron - bright and pulsing
                    const pulse = Math.sin(elapsedTime * 10) * 0.3 + 0.7;
                    material.color.setRGB(0.9 * pulse, 0.7 * pulse, 0.3 * pulse);
                    material.opacity = 0.8 + pulse * 0.2;
                    mesh.scale.setScalar(1.2 + pulse * 0.3);
                } else {
                    // Resting neuron
                    const restPulse = neuron.activity * 0.5 + 0.3;
                    material.color.setRGB(0.3 + restPulse * 0.2, 0.4 + restPulse * 0.2, 0.6 + restPulse * 0.2);
                    material.opacity = 0.5 + restPulse * 0.3;
                    mesh.scale.setScalar(0.8 + restPulse * 0.4);
                }
                
                // Subtle floating motion
                const float = Math.sin(elapsedTime * 0.5 + i * 0.1) * 0.5;
                mesh.position.y = neuron.originalPosition.y + float;
            });

            // Synaptic transmission visualization
            const colors = synapseGeometry.attributes.color.array;
            synapses.forEach((synapse, i) => {
                // Decay signal strength over time
                if (synapse.signalStrength > 0) {
                    synapse.signalStrength -= 0.02;
                    synapse.signalStrength = Math.max(0, synapse.signalStrength);
                }
                
                const fromNeuron = neurons[synapse.from];
                const toNeuron = neurons[synapse.to];
                
                // Base synapse color
                let r = 0.3, g = 0.4, b = 0.6;
                
                // Signal transmission color
                if (synapse.signalStrength > 0) {
                    if (synapse.isInhibitory) {
                        // Inhibitory synapses are red
                        r = 0.8 + synapse.signalStrength * 0.2;
                        g = 0.2;
                        b = 0.2;
                    } else {
                        // Excitatory synapses are cyan/blue
                        r = 0.2;
                        g = 0.6 + synapse.signalStrength * 0.4;
                        b = 0.8 + synapse.signalStrength * 0.2;
                    }
                }
                
                // Enhanced activity when both neurons are active
                if (fromNeuron.isActive && toNeuron.isActive) {
                    r += 0.3;
                    g += 0.3;
                    b += 0.2;
                }
                
                colors[i * 6] = colors[i * 6 + 3] = Math.min(1, r);
                colors[i * 6 + 1] = colors[i * 6 + 4] = Math.min(1, g);
                colors[i * 6 + 2] = colors[i * 6 + 5] = Math.min(1, b);
            });
            synapseGeometry.attributes.color.needsUpdate = true;

            // Neural signal propagation (action potentials)
            dataPackets.forEach((signal, signalIndex) => {
                if (!signal.isTransmitting) {
                    // Find an active neuron to start from
                    const activeNeurons = neurons.filter(n => n.isActive);
                    if (activeNeurons.length > 0 && Math.random() < 0.05) {
                        const startNeuron = activeNeurons[Math.floor(Math.random() * activeNeurons.length)];
                        const startIndex = neurons.indexOf(startNeuron);
                        
                        if (startNeuron.connections.length > 0) {
                            signal.currentNeuron = startIndex;
                            signal.targetNeuron = startNeuron.connections[Math.floor(Math.random() * startNeuron.connections.length)];
                            signal.progress = 0;
                            signal.isTransmitting = true;
                            signal.mesh.position.copy(startNeuron.position);
                            signal.mesh.visible = true;
                        }
                    }
                } else {
                    // Move signal along axon
                    signal.progress += signal.speed;
                    
                    if (signal.progress >= 1) {
                        // Signal reached target neuron
                        const targetNeuron = neurons[signal.targetNeuron];
                        
                        // Add input to target neuron
                        targetNeuron.activity += 0.3;
                        
                        // Find next connection or stop
                        if (targetNeuron.connections.length > 0 && Math.random() < 0.7) {
                            signal.currentNeuron = signal.targetNeuron;
                            signal.targetNeuron = targetNeuron.connections[Math.floor(Math.random() * targetNeuron.connections.length)];
                            signal.progress = 0;
                        } else {
                            // Stop transmission
                            signal.isTransmitting = false;
                            signal.mesh.visible = false;
                        }
                    } else {
                        // Interpolate position along axon
                        const currentPos = neurons[signal.currentNeuron].position;
                        const targetPos = neurons[signal.targetNeuron].position;
                        signal.mesh.position.lerpVectors(currentPos, targetPos, signal.progress);
                        
                        // Pulsing effect for action potential
                        const pulse = Math.sin(elapsedTime * 15 + signalIndex) * 0.3 + 1;
                        signal.mesh.scale.setScalar(pulse);
                        signal.mesh.material.opacity = 0.7 + Math.sin(elapsedTime * 20) * 0.3;
                    }
                }
            });

            // Animate binary code with reduced movement
            binaryElements.forEach((element, i) => {
                element.sprite.position.add(element.velocity);
                
                // Boundary checking and wrapping
                if (Math.abs(element.sprite.position.x) > 200) element.velocity.x *= -1;
                if (Math.abs(element.sprite.position.y) > 150) element.velocity.y *= -1;
                if (Math.abs(element.sprite.position.z) > 100) element.velocity.z *= -1;
                
                // Update binary text less frequently
                element.updateTimer--;
                if (element.updateTimer <= 0) {
                    element.updateTimer = 200 + Math.random() * 200;
                    
                    const canvas = document.createElement('canvas');
                    const context = canvas.getContext('2d');
                    canvas.width = 128;
                    canvas.height = 32;
                    
                    context.fillStyle = '#B8FFFA';
                    context.font = '16px monospace';
                    context.textAlign = 'center';
                    const binaryString = Array.from({length: 8}, () => Math.random() > 0.5 ? '1' : '0').join('');
                    context.fillText(binaryString, 64, 20);
                    
                    element.sprite.material.map.dispose();
                    element.sprite.material.map = new CanvasTexture(canvas);
                }
                
                // Enhanced opacity variation with glow
                const glow = Math.sin(elapsedTime * 2 + element.glowPhase) * 0.2 + 0.8;
                element.sprite.material.opacity = element.originalOpacity * glow;
            });

            // Animate energy pulses
            energyPulses.forEach((pulse, index) => {
                pulse.scale += pulse.fadeSpeed;
                pulse.mesh.scale.setScalar(pulse.scale);
                pulse.mesh.material.opacity = Math.max(0, 1 - (pulse.scale / pulse.maxScale));
                
                // Rotate for visual interest
                pulse.mesh.rotation.z += 0.02;
                
                // Remove and recreate when fully faded
                if (pulse.scale >= pulse.maxScale) {
                    scene.remove(pulse.mesh);
                    pulse.mesh.geometry.dispose();
                    pulse.mesh.material.dispose();
                    energyPulses.splice(index, 1);
                    
                    // Create new pulse occasionally
                    if (Math.random() > 0.7) {
                        createEnergyPulse();
                    }
                }
            });

            // Animate floating particles
            floatingParticles.forEach((particle, i) => {
                particle.mesh.position.add(particle.velocity);
                
                // Wave motion
                particle.phase += 0.02;
                const wave = Math.sin(particle.phase) * 3;
                particle.mesh.position.y = particle.originalPosition.y + wave;
                
                // Boundary wrapping
                if (Math.abs(particle.mesh.position.x) > 150) particle.velocity.x *= -1;
                if (Math.abs(particle.mesh.position.z) > 75) particle.velocity.z *= -1;
                
                // Twinkling effect
                const twinkle = Math.sin(elapsedTime * 4 + i) * 0.2 + 0.6;
                particle.mesh.material.opacity = 0.4 * twinkle;
                particle.mesh.scale.setScalar(0.5 + twinkle * 0.5);
            });

            // Enhanced camera movement with depth
            scene.rotation.y += (mouse.x * 0.2 - scene.rotation.y) * 0.02;
            scene.rotation.x += (-mouse.y * 0.1 - scene.rotation.x) * 0.02;
            
            // Dynamic camera oscillation with multiple frequencies
            const cameraWave1 = Math.sin(elapsedTime * 0.3) * 8;
            const cameraWave2 = Math.cos(elapsedTime * 0.7) * 4;
            camera.position.z = 120 + cameraWave1 + cameraWave2;

            renderer.render(scene, camera);
        };

        animate(0);

        // --- Resize Handling ---
        const handleResize = () => {
            camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
        };
        window.addEventListener('resize', handleResize);

        // --- Optimized Cleanup ---
        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            
            // Dispose of textures and materials
            binaryElements.forEach(element => {
                if (element.sprite.material.map) {
                    element.sprite.material.map.dispose();
                }
                element.sprite.material.dispose();
            });
            
            // Dispose energy pulses
            energyPulses.forEach(pulse => {
                pulse.mesh.geometry.dispose();
                pulse.mesh.material.dispose();
            });
            
            // Dispose floating particles
            floatingParticles.forEach(particle => {
                particle.mesh.geometry.dispose();
                particle.mesh.material.dispose();
            });
            
            neuronMaterials.forEach(material => material.dispose());
            signalMaterial.dispose();
            neuronGeometry.dispose();
            signalGeometry.dispose();
            particleGeometry.dispose();
            synapseGeometry.dispose();
            synapseMaterial.dispose();
            dendriteMaterial.dispose();
            dendriteGeometry.dispose();
            
            if (currentMount && renderer.domElement.parentNode === currentMount) {
                currentMount.removeChild(renderer.domElement);
            }
            renderer.dispose();
        };
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


// AI Solutions Hero Section
// Optimized AI Hero Section with Hardware Acceleration
const AIHero = () => {
  const [textIndex, setTextIndex] = useState(0);
  const texts = [
    "Integrate Artificial Intelligence",
    "Automate & Innovate",
    "Build Your Custom AI"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex(prev => (prev + 1) % texts.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section 
      id="home" 
      className="relative h-screen flex items-center justify-center overflow-hidden hero-section"
      style={{ 
        willChange: 'transform',
        contain: 'layout style paint'
      }}
    >
      <AIHeroAnimation />
      
      <div 
        className="absolute inset-0 hero-overlay-1 z-10"
        style={{ contain: 'paint' }}
      ></div>
      
      <div 
        className="relative z-20 text-center text-white max-w-5xl mx-auto px-4"
        style={{ willChange: 'transform' }}
      >
        <div 
          className="mb-8"
          style={{ 
            willChange: 'transform',
            contain: 'layout style'
          }}
        >
          <div 
            className="text-xs tracking-widest text-gray-400 mb-4 font-inter glitch-text"
            style={{ willChange: 'transform' }}
          >
            BYLT.MEDIA // BESPOKE AI SOLUTIONS
          </div>
          <h1 
            className="text-6xl md:text-8xl font-bold mb-6 font-inter hero-title"
            style={{ willChange: 'transform' }}
          >
            <span 
              className="quantum-text" 
              key={textIndex}
              style={{ willChange: 'transform, opacity' }}
            >
              {texts[textIndex]}
            </span>
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-200 max-w-4xl mx-auto hero-subtitle leading-relaxed">
            Transform your business with intelligent automation and AI-powered solutions. We help you work smarter, not harder, through strategic AI implementation and process automation.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center hero-cta">
          <a href="#contact" className="quantum-button-hero">
            <span>Get Started with AI</span>
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

// Optimized The AI Advantage Section with Hardware Acceleration
const TheAIAdvantage = () => {
    const sectionRef = useQuantumScrollAnim();
    return (
        <section 
            ref={sectionRef} 
            id="services" 
            className="py-24 bg-slate-900/30 relative quantum-anim overflow-hidden"
            style={{ 
                willChange: 'transform',
                contain: 'layout style paint'
            }}
        >
            <div 
                className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
                style={{ contain: 'layout style' }}
            >
                <div 
                    className="text-center mb-16"
                    style={{ 
                        willChange: 'transform',
                        contain: 'layout style'
                    }}
                >
                    <div className="section-title-container">
                        <h2 
                            className="section-title-enhanced"
                            style={{ willChange: 'transform' }}
                        >
                            The AI Advantage
                        </h2>
                        <div className="title-accent-line"></div>
                    </div>
                    <p className="text-lg text-gray-400 max-w-3xl mx-auto">
                        Harness the power of artificial intelligence to automate processes, enhance decision-making, and drive operational efficiency across your business.
                    </p>
                </div>

                <div 
                    className="grid md:grid-cols-3 gap-8 text-center"
                    style={{ 
                        willChange: 'transform',
                        contain: 'layout style'
                    }}
                >
                    <div 
                        className="info-card"
                        style={{ 
                            willChange: 'transform, border-color',
                            contain: 'layout style paint'
                        }}
                    >
                        <div className="info-card-icon"><Zap /></div>
                        <h3 className="text-xl font-bold text-white mb-2">Process Automation</h3>
                        <p className="text-gray-400">
                            Automate repetitive tasks like data entry, email workflows, and report generation to free up your team for strategic work.
                        </p>
                    </div>
                    <div className="info-card">
                        <div className="info-card-icon"><BrainCircuit /></div>
                        <h3 className="text-xl font-bold text-white mb-2">AI-Powered Insights</h3>
                        <p className="text-gray-400">
                           Extract actionable insights from your data with machine learning algorithms that identify patterns and predict trends.
                        </p>
                    </div>
                    <div className="info-card">
                        <div className="info-card-icon"><Share2 /></div>
                        <h3 className="text-xl font-bold text-white mb-2">Intelligent Workflows</h3>
                        <p className="text-gray-400">
                            Create smart workflows that adapt and respond to changing conditions, improving efficiency and reducing manual oversight.
                        </p>
                    </div>
                </div>
            </div>
            <style jsx>{`
                /* Optimized AI Solutions Page Styles with Hardware Acceleration */
                .info-card {
                    background: rgba(30, 41, 59, 0.5);
                    border: 1px solid #374151;
                    border-radius: 16px;
                    padding: 2rem;
                    transition: all 0.3s ease;
                    backdrop-filter: blur(8px);
                    /* Hardware acceleration */
                    transform: translate3d(0, 0, 0);
                    will-change: transform, border-color;
                    backface-visibility: hidden;
                    contain: layout style paint;
                }
                .info-card:hover {
                    transform: translate3d(0, -5px, 0);
                    border-color: #B8FFFA;
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
                    /* Hardware acceleration */
                    transform: translate3d(0, 0, 0);
                    will-change: transform;
                    contain: strict;
                }

                /* Solution Cards Hardware Acceleration */
                .solution-card:hover {
                    transform: translate3d(0, -8px, 0);
                    border-color: #B8FFFA;
                }

                /* Additional Performance Optimizations */
                * {
                    box-sizing: border-box;
                }
                
                .quantum-anim {
                    will-change: auto;
                    contain: layout style;
                }
                
                .section-title-enhanced {
                    will-change: auto;
                    contain: layout style;
                }
                
                .hero-section, .quantum-process-section {
                    contain: layout style paint;
                }
            `}</style>
        </section>
    );
};

// Our AI Solutions Section
const OurAISolutions = () => {
    const sectionRef = useQuantumScrollAnim();
    const solutions = [
        { icon: <Bot />, name: "AI Chatbots & Customer Service", description: "Deploy intelligent chatbots that handle customer inquiries 24/7, provide instant support, and seamlessly escalate complex issues to human agents." },
        { icon: <FileText />, name: "Content Generation & Copywriting", description: "Generate high-quality marketing copy, product descriptions, and content variations at scale using advanced AI writing tools." },
        { icon: <Cpu />, name: "Business Process Automation", description: "Automate repetitive tasks like data entry, invoice processing, and workflow management to boost productivity and reduce errors." },
        { icon: <BarChart />, name: "Data Analysis & Reporting", description: "Transform raw data into actionable insights with automated reporting and predictive analytics that guide business decisions." },
        { icon: <ImageIcon />, name: "AI-Generated Visuals", description: "Create compelling visuals, graphics, and video content using AI tools, optimized for engagement and brand consistency." },
        { icon: <Target />, name: "Lead Qualification & Management", description: "Automatically score, qualify, and route leads using AI algorithms that identify the most promising prospects." },
    ];

    return (
        <section 
            ref={sectionRef} 
            className="py-24 bg-slate-900/50 relative quantum-anim overflow-hidden"
            style={{ 
                willChange: 'transform',
                contain: 'layout style paint'
            }}
        >
            <div 
                className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
                style={{ contain: 'layout style' }}
            >
                <div 
                    className="text-center mb-16"
                    style={{ 
                        willChange: 'transform',
                        contain: 'layout style'
                    }}
                >
                    <div className="section-title-container">
                        <h2 
                            className="section-title-enhanced"
                            style={{ willChange: 'transform' }}
                        >
                            Our AI Solutions
                        </h2>
                        <div className="title-accent-line"></div>
                    </div>
                    <p className="text-lg text-gray-400 max-w-3xl mx-auto">
                        From intelligent chatbots to automated workflows, we deliver AI solutions that solve real business challenges and drive measurable results.
                    </p>
                </div>
                <div 
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    style={{ 
                        willChange: 'transform',
                        contain: 'layout style'
                    }}
                >
                    {solutions.map((solution, index) => (
                        <div key={index} className="solution-card">
                            <div className="solution-icon">{solution.icon}</div>
                            <h3 className="solution-name">{solution.name}</h3>
                            <p className="solution-description">{solution.description}</p>
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
                    transform: translate(-50%, -50%);
                    transition: width 0.4s ease, height 0.4s ease;
                }
                .solution-card:hover {
                    transform: translateY(-8px);
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

// AI Use Cases Section
const AIUseCases = () => {
    const sectionRef = useQuantumScrollAnim();
    const [activeCategory, setActiveCategory] = useState('hospitality');

    const useCases = {
        hospitality: [
            {
                title: "Automated Guest Communication",
                description: "Set up email sequences that automatically send pre-arrival instructions, check-in reminders, and post-stay follow-ups based on booking data.",
                benefits: ["Reduced front desk workload", "Improved guest experience", "Consistent communication"]
            },
            {
                title: "Dynamic Pricing Optimisation", 
                description: "Use AI to automatically adjust room rates based on demand, seasonality, competitor pricing, and local events.",
                benefits: ["Maximised revenue", "Competitive positioning", "Real-time price adjustments"]
            },
            {
                title: "Housekeeping & Maintenance Scheduling",
                description: "Automatically generate cleaning schedules and maintenance requests based on checkout times and room status updates.",
                benefits: ["Optimized staff allocation", "Faster room turnaround", "Preventive maintenance"]
            }
        ],
        sales: [
            {
                title: "Lead Scoring & Qualification",
                description: "Automatically score incoming leads based on behaviour, demographics, and engagement to prioritise sales efforts.",
                benefits: ["Higher conversion rates", "Focused sales efforts", "Faster lead response"]
            },
            {
                title: "CRM Data Enrichment",
                description: "Automatically update customer records with social media data, company information, and contact details from various sources.",
                benefits: ["Complete customer profiles", "Better personalization", "Time-saving data entry"]
            },
            {
                title: "Sales Forecasting & Pipeline Management",
                description: "Use AI to predict deal closure probability and automatically update pipeline stages based on customer interactions.",
                benefits: ["Accurate revenue forecasting", "Improved pipeline visibility", "Data-driven decisions"]
            }
        ],
        ecommerce: [
            {
                title: "Inventory Management Automation",
                description: "Automatically reorder products when stock levels drop and predict demand fluctuations based on seasonal trends.",
                benefits: ["Reduced stockouts", "Optimized inventory costs", "Improved cash flow"]
            },
            {
                title: "Customer Support Chatbots",
                description: "Deploy AI chatbots that handle order inquiries, return requests, and product questions 24/7.",
                benefits: ["24/7 customer support", "Reduced support costs", "Faster response times"]
            },
            {
                title: "Personalized Marketing Campaigns",
                description: "Automatically segment customers and send targeted email campaigns based on purchase history and browsing behaviour.",
                benefits: ["Higher email engagement", "Increased repeat purchases", "Better customer retention"]
            }
        ],
        healthcare: [
            {
                title: "Appointment Scheduling & Reminders",
                description: "Automate appointment booking, send confirmation emails, and reduce no-shows with intelligent reminder systems.",
                benefits: ["Reduced no-shows", "Improved schedule efficiency", "Better patient experience"]
            },
            {
                title: "Patient Data Management",
                description: "Automatically organise patient records, flag important information, and ensure compliance with healthcare regulations.",
                benefits: ["Improved data accuracy", "Regulatory compliance", "Streamlined workflows"]
            },
            {
                title: "Insurance & Billing Automation",
                description: "Automate insurance verification, claims processing, and billing workflows to reduce administrative overhead.",
                benefits: ["Faster payment processing", "Reduced errors", "Lower administrative costs"]
            }
        ],
        b2b: [
            {
                title: "Lead Nurturing & Follow-up",
                description: "Automatically nurture prospects through email sequences, schedule follow-ups, and route qualified leads to sales teams based on engagement.",
                benefits: ["Higher conversion rates", "Consistent follow-up", "Improved sales efficiency"]
            },
            {
                title: "Business Intelligence & Reporting",
                description: "Automatically compile performance dashboards, generate weekly business reports, and track KPIs across departments with real-time data visualization.",
                benefits: ["Data-driven insights", "Time-saving reporting", "Better decision making"]
            },
            {
                title: "Client Onboarding Automation",
                description: "Streamline client onboarding with automated welcome sequences, document collection, and progress tracking systems.",
                benefits: ["Smoother onboarding", "Reduced manual work", "Better client experience"]
            }
        ]
    };

    const categories = [
        { id: 'hospitality', name: 'Hospitality', icon: <Home /> },
        { id: 'sales', name: 'Sales', icon: <TrendingUp /> },
        { id: 'ecommerce', name: 'E-commerce', icon: <ShoppingCart /> },
        { id: 'healthcare', name: 'Healthcare', icon: <Heart /> },
        { id: 'b2b', name: 'B2B Services', icon: <Building /> }
    ];

    return (
        <section id="use-cases" ref={sectionRef} className="py-24 bg-slate-900 quantum-anim relative overflow-hidden">
            <div className="absolute inset-0">
                <div className="case-study-bg-element case-study-bg-1"></div>
                <div className="case-study-bg-element case-study-bg-2"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-12">
                    <div className="section-title-container">
                        <h2 className="section-title-enhanced">AI Automation Use Cases</h2>
                        <div className="title-accent-line"></div>
                    </div>
                    <p className="text-lg text-gray-300 mt-4 max-w-3xl mx-auto">
                        Discover how businesses across different industries are leveraging AI automation to streamline operations and improve efficiency.
                    </p>
                </div>

                <div className="grid lg:grid-cols-4 gap-8 items-start">
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold text-white mb-6">Industries</h3>
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                className={`category-button w-full text-left p-4 rounded-lg transition-all duration-300 ${
                                    activeCategory === category.id 
                                        ? 'bg-[#B8FFFA]/10 border border-[#B8FFFA] text-[#B8FFFA] category-active' 
                                        : 'bg-slate-800/50 border border-gray-600 text-gray-300 hover:border-[#B8FFFA]/50 hover:bg-[#B8FFFA]/5'
                                }`}
                                onClick={() => setActiveCategory(category.id)}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="category-icon-wrapper">
                                        {category.icon}
                                    </div>
                                    <span className="font-semibold">{category.name}</span>
                                </div>
                            </button>
                        ))}
                    </div>
                    
                    <div className="lg:col-span-3">
                        <div className="grid gap-6">
                            {useCases[activeCategory].map((useCase, index) => (
                                <div key={index} className="use-case-card bg-slate-800/50 border border-gray-600 rounded-lg p-6 transition-all duration-300 group">
                                    <h4 className="text-xl font-bold text-white mb-3 group-hover:text-[#B8FFFA] transition-colors duration-300">{useCase.title}</h4>
                                    <p className="text-gray-300 mb-4 leading-relaxed">{useCase.description}</p>
                                    <div className="space-y-2">
                                        <h5 className="text-sm font-semibold text-[#B8FFFA] uppercase tracking-wider">Key Benefits</h5>
                                        <div className="flex flex-wrap gap-2">
                                            {useCase.benefits.map((benefit, i) => (
                                                <span key={i} className="benefit-tag px-3 py-1 bg-[#B8FFFA]/10 text-[#B8FFFA] text-sm rounded-full border border-[#B8FFFA]/20 transition-all duration-300">
                                                    {benefit}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <style jsx>{`
                .case-study-bg-element { position: absolute; border-radius: 50%; background: radial-gradient(circle, rgba(184, 255, 250, 0.03) 0%, transparent 70%); animation: float 8s ease-in-out infinite; }
                .case-study-bg-1 { width: 400px; height: 400px; top: 10%; left: 5%; animation-delay: 0s; }
                .case-study-bg-2 { width: 300px; height: 300px; bottom: 15%; right: 10%; animation-delay: 3s; }
                @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-25px); } }
                
                .category-button {
                    position: relative;
                    overflow: hidden;
                }
                .category-button::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(184, 255, 250, 0.1), transparent);
                    transition: left 0.5s ease;
                }
                .category-button:hover::before {
                    left: 100%;
                }
                .category-button:hover {
                    transform: translateX(4px);
                    box-shadow: 0 4px 15px rgba(184, 255, 250, 0.2);
                }
                .category-active {
                    transform: translateX(4px);
                    box-shadow: 0 4px 15px rgba(184, 255, 250, 0.3);
                }
                
                .category-icon-wrapper {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 2.5rem;
                    height: 2.5rem;
                    background: rgba(184, 255, 250, 0.1);
                    border-radius: 8px;
                    transition: all 0.3s ease;
                }
                .category-button:hover .category-icon-wrapper {
                    background: rgba(184, 255, 250, 0.2);
                    transform: scale(1.1);
                }
                .category-active .category-icon-wrapper {
                    background: rgba(184, 255, 250, 0.2);
                    transform: scale(1.1);
                }
                
                .use-case-card {
                    position: relative;
                    overflow: hidden;
                    backdrop-filter: blur(8px);
                }
                .use-case-card::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: linear-gradient(135deg, rgba(184, 255, 250, 0.05) 0%, transparent 50%);
                    opacity: 0;
                    transition: opacity 0.3s ease;
                }
                .use-case-card:hover::before {
                    opacity: 1;
                }
                .use-case-card:hover {
                    border-color: #B8FFFA;
                    transform: translateY(-4px);
                    box-shadow: 0 8px 25px rgba(184, 255, 250, 0.15);
                }
                
                .benefit-tag:hover {
                    background: rgba(184, 255, 250, 0.2);
                    border-color: #B8FFFA;
                    transform: scale(1.05);
                }
            `}</style>
        </section>
    );
};

// Our AI Implementation Process Section
const AIProcess = () => {
    const [activeStep, setActiveStep] = useState(null);
    const sectionRef = useQuantumScrollAnim();
    
    const processSteps = [
        { step: "01", title: "Process Analysis & Discovery", subtitle: "Understanding Your Workflows", description: "We analyse your current business processes to identify automation opportunities and assess which tasks can benefit most from AI implementation.", icon: <Search className="w-6 h-6" />, details: [ "Workflow mapping and analysis", "Task complexity assessment", "ROI potential evaluation", "Technical feasibility review" ] },
        { step: "02", title: "AI Solution Design", subtitle: "Crafting Your Automation Strategy", description: "We design custom AI solutions tailored to your specific needs, selecting the right tools and technologies for maximum impact.", icon: <Database className="w-6 h-6" />, details: [ "Technology stack selection", "Integration planning", "User experience design", "Performance metrics definition" ] },
        { step: "03", title: "Development & Configuration", subtitle: "Building Your AI Systems", description: "Our team develops and configures your AI solutions, ensuring they integrate seamlessly with your existing systems and workflows.", icon: <Cpu className="w-6 h-6" />, details: [ "AI model development", "System integration", "API connections", "Testing and validation" ] },
        { step: "04", title: "Implementation & Training", subtitle: "Launching Your AI Solutions", description: "We deploy your AI systems and provide comprehensive training to ensure your team can effectively use and manage the new automation.", icon: <Share2 className="w-6 h-6" />, details: [ "System deployment", "Team training sessions", "Documentation creation", "User adoption support" ] },
        { step: "05", title: "Optimization & Support", subtitle: "Continuous Improvement", description: "We monitor performance and continuously optimize your AI systems to ensure they deliver ongoing value and adapt to changing needs.", icon: <TrendingUp className="w-6 h-6" />, details: [ "Performance monitoring", "System optimization", "Regular updates", "Ongoing support" ] }
    ];

    return (
        <section id="process" ref={sectionRef} className="py-24 quantum-process-section quantum-anim relative overflow-hidden">
            <div className="absolute inset-0 quantum-grid-animation"></div>
            
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                <div className="text-center mb-20">
                    <div className="section-title-container">
                        <h2 className="section-title-enhanced">
                            Our AI Automation Process
                        </h2>
                        <div className="title-accent-line"></div>
                    </div>
                    <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
                        A proven methodology for implementing AI automation that delivers real business value from day one.
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

// Contact Section (Unchanged logic, minor text updates)
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
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            const subject = encodeURIComponent(`New AI Solutions Inquiry from ${formData.firstName} ${formData.lastName}`);
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
                        <h2 className="section-title-enhanced">
                            Build Your AI Future
                        </h2>
                        <div className="title-accent-line"></div>
                    </div>
                    <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                        Ready to leverage AI? Tell us your vision, and we'll design the intelligent solution to make it a reality.
                    </p>
                </div>

                <div className="contact-form-container">
                    <form onSubmit={handleSubmit} className="contact-form">
                        <div className="form-grid">
                            <div className="form-group">
                                <label htmlFor="firstName" className="form-label">First Name *</label>
                                <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleInputChange} required className="form-input" placeholder="Enter your first name" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="lastName" className="form-label">Last Name *</label>
                                <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleInputChange} required className="form-input" placeholder="Enter your last name" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email" className="form-label">Email Address *</label>
                                <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required className="form-input" placeholder="your.email@company.com" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="company" className="form-label">Company</label>
                                <input type="text" id="company" name="company" value={formData.company} onChange={handleInputChange} className="form-input" placeholder="Your company name" />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="message" className="form-label">Message *</label>
                            <textarea id="message" name="message" value={formData.message} onChange={handleInputChange} required rows={6} className="form-textarea" placeholder="Tell us about your project, AI goals, and how we can help you build your digital future..."></textarea>
                        </div>
                        <div className="form-submit">
                            <button type="submit" disabled={isSubmitting} className="neural-submit-button">
                                {isSubmitting ? (<><div className="submit-spinner"></div><span>Sending...</span></>) : (<><span>Send Message</span><MoveRight className="ml-3 transition-transform duration-300" /></>)}
                            </button>
                        </div>
                        {submitStatus === 'success' && (<div className="status-message success"><Mail className="w-5 h-5" /><span>Thank you! Your message has been prepared. Please complete sending it in your mail client.</span></div>)}
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
                .neural-submit-button { position: relative; display: inline-flex; align-items: center; justify-content: center; padding: 1.25rem 2.5rem; font-weight: 700; font-size: 1.125rem; color: #1e293b; background: #B8FFFA; border: none; border-radius: 15px; font-family: 'Inter', sans-serif; text-decoration: none; transition: all 0.4s ease; cursor: pointer; min-width: 180px; transform: translate3d(0, 0, 0); will-change: transform, box-shadow, background-color; backface-visibility: hidden; }
                .neural-submit-button:hover:not(:disabled) { transform: translate3d(0, -3px, 0) scale(1.05); box-shadow: 0 10px 30px rgba(184, 255, 250, 0.3); background: #9DFFF8; }
                .neural-submit-button:disabled { opacity: 0.7; cursor: not-allowed; transform: translate3d(0, 0, 0); }
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

// Main App Component for AI Solutions Page
const AISolutionsPage = () => {
    return (
        <Layout>
            <Head>
                <title>AI Automation & Process Solutions | BYLT Media</title>
                <meta name="description" content="Transform your business with AI automation solutions. We help businesses streamline operations, automate workflows, and implement intelligent systems for better efficiency." />
                <link rel="icon" href="/favicon.ico" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
            </Head>
            <GlobalStyles />
            
            <main>
                <AIHero />
                <TheAIAdvantage />
                <OurAISolutions />
                <AIUseCases />
                <AIProcess />
                <NeuralContact />
            </main>
        </Layout>
    );
};

export default AISolutionsPage;
