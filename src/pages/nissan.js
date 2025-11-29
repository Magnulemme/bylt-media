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
  AmbientLight,
  DirectionalLight,
  PointLight,
  Group,
  MeshStandardMaterial,
  BoxGeometry,
  Mesh,
  CylinderGeometry,
  PlaneGeometry
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'; // Note: This is a placeholder for the concept

// --- V14: NISSAN CASE STUDY PAGE ---

// Custom Hook for Advanced Scroll Animations (Enhanced)
const useQuantumScrollAnim = (threshold = 0.1, delay = 0) => {
    const ref = useRef(null);
    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    const timeoutId = setTimeout(() => {
                        requestAnimationFrame(() => {
                            element.classList.add('quantum-visible');
                        });
                    }, delay);
                    observer.unobserve(element);
                    return () => clearTimeout(timeoutId);
                }
            },
            { 
                threshold,
                rootMargin: '50px 0px'
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

// NEW: Automotive 3D Model Header Animation
const AutomotiveHeroAnimation = () => {
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
        camera.position.set(5, 2, 8);

        // --- Lighting ---
        const ambientLight = new AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);
        const directionalLight = new DirectionalLight(0xffffff, 1);
        directionalLight.position.set(5, 10, 7.5);
        scene.add(directionalLight);
        const pointLight = new PointLight(0xB8FFFA, 1, 100);
        pointLight.position.set(-5, 5, 5);
        scene.add(pointLight);

        // --- Car Model (Placeholder Geometry) ---
        // A real implementation would use GLTFLoader to load a 3D model.
        // For this placeholder, we'll create a stylized, abstract car shape.
        const carGroup = new Group();
        const bodyMaterial = new MeshStandardMaterial({ color: 0xcccccc, metalness: 0.8, roughness: 0.3 });
        const glassMaterial = new MeshStandardMaterial({ color: 0x111111, metalness: 1, roughness: 0.1, transparent: true, opacity: 0.5 });
        const wheelMaterial = new MeshStandardMaterial({ color: 0x222222, metalness: 0.1, roughness: 0.8 });
        const lightMaterial = new MeshStandardMaterial({ color: 0xB8FFFA, emissive: 0xB8FFFA, emissiveIntensity: 2 });

        const bodyGeom = new BoxGeometry(4.5, 1, 2);
        const body = new Mesh(bodyGeom, bodyMaterial);
        carGroup.add(body);

        const cabinGeom = new BoxGeometry(2.5, 0.8, 1.8);
        const cabin = new Mesh(cabinGeom, glassMaterial);
        cabin.position.set(-0.2, 0.9, 0);
        carGroup.add(cabin);
        
        const wheelGeom = new CylinderGeometry(0.4, 0.4, 0.2, 32);
        const wheel1 = new Mesh(wheelGeom, wheelMaterial);
        wheel1.rotation.z = Math.PI / 2;
        wheel1.position.set(1.5, -0.3, 1);
        carGroup.add(wheel1);
        
        const wheel2 = wheel1.clone();
        wheel2.position.z = -1;
        carGroup.add(wheel2);
        
        const wheel3 = wheel1.clone();
        wheel3.position.x = -1.5;
        carGroup.add(wheel3);
        
        const wheel4 = wheel3.clone();
        wheel4.position.z = -1;
        carGroup.add(wheel4);

        const headlightGeom = new BoxGeometry(0.2, 0.2, 0.1);
        const headlight1 = new Mesh(headlightGeom, lightMaterial);
        headlight1.position.set(2.25, 0.2, 0.7);
        carGroup.add(headlight1);
        
        const headlight2 = headlight1.clone();
        headlight2.position.z = -0.7;
        carGroup.add(headlight2);

        scene.add(carGroup);

        // --- Ground Plane ---
        const planeGeom = new PlaneGeometry(100, 100);
        const planeMat = new MeshStandardMaterial({
            color: 0x0f172a,
            metalness: 0.5,
            roughness: 0.4,
            transparent: true,
            opacity: 0.8
        });
        const plane = new Mesh(planeGeom, planeMat);
        plane.rotation.x = -Math.PI / 2;
        plane.position.y = -0.7;
        scene.add(plane);

        // --- Controls ---
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableZoom = false;
        controls.enablePan = false;
        controls.autoRotate = true;
        controls.autoRotateSpeed = 0.5;

        // --- Animation Loop ---
        const animate = () => {
            requestAnimationFrame(animate);
            controls.update();
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

        return () => {
            window.removeEventListener('resize', handleResize);
            if (currentMount && renderer.domElement.parentNode === currentMount) {
                currentMount.removeChild(renderer.domElement);
            }
        };
    }, []);

    return <div ref={mountRef} className="absolute inset-0 z-0" />;
};

// Case Study Hero Section
const CaseStudyHero = () => {
  return (
    <section id="home" className="relative h-[80vh] md:h-[70vh] flex items-center justify-center overflow-hidden hero-section">
      <AutomotiveHeroAnimation />
      <div className="absolute inset-0 hero-overlay-1 z-10"></div>
      <div className="relative z-20 text-center text-white max-w-5xl mx-auto px-4">
        <div className="mb-8">
          <div className="text-xs tracking-widest text-gray-400 mb-4 font-inter glitch-text">
            CLIENT // NISSAN BULGARIA
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 font-inter hero-title">
            Driving High-Quality Leads for a Global Automotive Leader
          </h1>
          <div className="hero-stat-highlight">
             <div className="stat-value">2,000+</div>
             <div className="stat-label">Test Drive Requests Generated</div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .hero-stat-highlight {
            margin-top: 2rem;
            padding: 1.5rem;
            background: rgba(184, 255, 250, 0.05);
            border: 1px solid rgba(184, 255, 250, 0.1);
            border-radius: 16px;
            display: inline-block;
            backdrop-filter: blur(10px);
        }
        .stat-value {
            font-size: 2.5rem;
            font-weight: 800;
            color: #B8FFFA;
            line-height: 1;
        }
        .stat-label {
            font-size: 1rem;
            color: #9ca3af;
            margin-top: 0.5rem;
        }
      `}</style>
    </section>
  );
};

// Case Study Content Section
const CaseStudyContent = () => {
    const sectionRef = useQuantumScrollAnim();

    return(
        <section ref={sectionRef} className="py-24 bg-slate-900/30 relative quantum-anim">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-12">
                
                {/* Left Sidebar */}
                <aside className="lg:col-span-1">
                    <div className="sticky top-28">
                        <div className="sidebar-block">
                            <h3 className="sidebar-title">Client</h3>
                            <p className="sidebar-text">Nissan Bulgaria</p>
                        </div>
                        <div className="sidebar-block">
                            <h3 className="sidebar-title">Industry</h3>
                            <p className="sidebar-text">Automotive</p>
                        </div>
                        <div className="sidebar-block">
                            <h3 className="sidebar-title">Services</h3>
                            <ul className="sidebar-list">
                                <li>Paid Media (Google & Social)</li>
                                <li>Landing Page Design</li>
                                <li>Conversion Rate Optimisation</li>
                            </ul>
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="lg:col-span-2">
                    <div className="content-section">
                        <h2 className="content-title">The Challenge</h2>
                        <p className="content-paragraph">
                            Nissan Bulgaria, a major player in the automotive market, aimed to significantly increase the number of qualified leads for test drives generated through their online channels. Their existing digital strategy was driving traffic but struggled to convert visitors into high-intent leads, facing issues with a complex user journey and non-optimised lead capture forms.
                        </p>
                    </div>

                    <div className="content-section">
                        <h2 className="content-title">Our Solution</h2>
                        <p className="content-paragraph">
                            We devised and executed a comprehensive, multi-channel performance marketing strategy focused on streamlining the user journey and maximizing conversions. The core components of our solution included:
                        </p>
                        <ul className="solution-list">
                            <li><CheckCircle className="solution-icon" /><div><strong>Targeted Ad Campaigns:</strong> Deployed highly-targeted campaigns on Google Ads, Facebook, and Instagram to reach potential buyers with specific messaging for each car model.</div></li>
                            <li><Code className="solution-icon" /><div><strong>High-Converting Landing Pages:</strong> Designed and developed bespoke, mobile-first landing pages for each model, featuring clear value propositions, compelling visuals, and simplified lead forms.</div></li>
                            <li><MousePointerClick className="solution-icon" /><div><strong>Optimised User Journey:</strong> Re-architected the path from ad click to form submission, removing unnecessary steps and friction points to make booking a test drive as seamless as possible.</div></li>
                        </ul>
                    </div>

                     <div className="gallery-section">
                        <h2 className="content-title">Campaign Visuals</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <img src="https://placehold.co/600x400/1e293b/B8FFFA?text=Ad+Creative" alt="Ad Creative" className="gallery-image" />
                            <img src="https://placehold.co/600x400/1e293b/B8FFFA?text=Landing+Page" alt="Landing Page" className="gallery-image" />
                        </div>
                    </div>

                    <div className="results-section">
                        <h2 className="content-title">The Results</h2>
                        <p className="content-paragraph">
                            The strategic overhaul of Nissan's lead generation funnel delivered exceptional, measurable results, significantly boosting their sales pipeline with high-quality prospects.
                        </p>
                        <div className="results-grid">
                            <div className="result-card">
                                <div className="result-value">2,000+</div>
                                <div className="result-label">Test Drive Requests</div>
                            </div>
                            <div className="result-card">
                                <div className="result-value">25%</div>
                                <div className="result-label">Landing Page CVR</div>
                            </div>
                             <div className="result-card">
                                <div className="result-value">1,000+</div>
                                <div className="result-label">Leads from Social</div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
            <style jsx>{`
                .sidebar-block {
                    background: rgba(30, 41, 59, 0.4);
                    border: 1px solid #374151;
                    padding: 1.5rem;
                    border-radius: 12px;
                    margin-bottom: 1.5rem;
                }
                .sidebar-title {
                    font-size: 0.875rem;
                    color: #9ca3af;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                    margin-bottom: 0.5rem;
                }
                .sidebar-text {
                    font-size: 1.125rem;
                    color: white;
                    font-weight: 600;
                }
                .sidebar-list {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                }
                .sidebar-list li {
                    color: white;
                    margin-bottom: 0.25rem;
                }
                .content-section {
                    margin-bottom: 3rem;
                }
                .content-title {
                    font-size: 2rem;
                    font-weight: 700;
                    color: white;
                    margin-bottom: 1.5rem;
                    border-left: 3px solid #B8FFFA;
                    padding-left: 1rem;
                }
                .content-paragraph {
                    font-size: 1.125rem;
                    line-height: 1.7;
                    color: #d1d5db;
                }
                .solution-list {
                    list-style: none;
                    padding: 0;
                    margin-top: 1.5rem;
                    display: grid;
                    gap: 1.5rem;
                }
                .solution-list li {
                    display: flex;
                    align-items: flex-start;
                    gap: 1rem;
                    font-size: 1.125rem;
                    color: #d1d5db;
                }
                .solution-icon {
                    flex-shrink: 0;
                    color: #B8FFFA;
                    margin-top: 5px;
                }
                .gallery-section { margin-bottom: 3rem; }
                .gallery-image { border-radius: 12px; border: 1px solid #374151; transition: transform 0.3s ease; }
                .gallery-image:hover { transform: scale(1.03); }
                .results-section { margin-top: 3rem; }
                .results-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                    gap: 1.5rem;
                    margin-top: 2rem;
                }
                .result-card {
                    background: linear-gradient(135deg, rgba(184, 255, 250, 0.1), rgba(30, 41, 59, 0.4));
                    border: 1px solid #B8FFFA;
                    padding: 2rem;
                    border-radius: 16px;
                    text-align: center;
                }
                .result-value {
                    font-size: 3rem;
                    font-weight: 800;
                    color: white;
                }
                .result-label {
                    font-size: 1rem;
                    color: #9ca3af;
                    margin-top: 0.5rem;
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
            const subject = encodeURIComponent(`New Project Inquiry from ${formData.firstName} ${formData.lastName}`);
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
                        <h2 className="section-title-enhanced">Let's Build Your Success Story</h2>
                        <div className="title-accent-line"></div>
                    </div>
                    <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                        Inspired by our results? Tell us about your project, and let's create your case study together.
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
                        <div className="form-group"><label htmlFor="message" className="form-label">Message *</label><textarea id="message" name="message" value={formData.message} onChange={handleInputChange} required rows={6} className="form-textarea" placeholder="Tell us about your project, your goals, and any challenges you're facing..."></textarea></div>
                        <div className="form-submit"><button type="submit" disabled={isSubmitting} className="neural-submit-button">{isSubmitting ? (<><div className="submit-spinner"></div><span>Sending...</span></>) : (<><span>Send Message</span><MoveRight className="ml-3 transition-transform duration-300" /></>)}</button></div>
                        {submitStatus === 'success' && (<div className="status-message success"><Mail className="w-5 h-5" /><span>Thank you! Your message has been prepared.</span></div>)}
                        {submitStatus === 'error' && (<div className="status-message error"><X className="w-5 h-5" /><span>There was an error. Please try sending an email directly.</span></div>)}
                    </form>
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
                @media (max-width: 768px) { .form-grid { grid-template-columns: 1fr; gap: 1rem; } .contact-form { padding: 2rem; } .neural-submit-button { padding: 1rem 2rem; font-size: 1rem; } }
            `}</style>
        </section>
    );
};

// Footer
const QuantumFooter = () => {
    return (
        <footer className="quantum-footer relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
                <div className="footer-content">
                    <div className="footer-brand">
                        <h3 className="text-2xl font-bold text-white font-inter">BYLT.MEDIA</h3>
                        <p className="text-gray-400 mt-2">Building Digital Futures</p>
                    </div>
                    <div className="footer-legal">
                        <p className="text-gray-500">&copy; {new Date().getFullYear()} BYLT Media. All Rights Reserved.</p>
                        <div className="footer-version"><span className="text-xs text-gray-600 font-mono">v14.0 // Nissan Case Study</span></div>
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

// Main App Component for Nissan Case Study Page
const NissanCaseStudyPage = () => {
    return (
        <Layout>
            <Head>
                <title>Nissan Case Study - Lead Generation | BYLT Media</title>
                <meta name="description" content="Discover how BYLT Media generated over 2,000 test drive requests for Nissan Bulgaria through a targeted performance marketing strategy." />
                <link rel="icon" href="/favicon.ico" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
            </Head>
            <GlobalStyles />
            
            <main>
                <CaseStudyHero />
                <CaseStudyContent />
                <NeuralContact />
            </main>

            <QuantumFooter />
        </Layout>
    );
};

export default NissanCaseStudyPage;
