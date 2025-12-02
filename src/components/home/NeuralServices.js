import { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import useQuantumScrollAnim from '../../hooks/useQuantumScrollAnim';
import { TrendingUp, Search, Code, BrainCircuit, ChevronDown } from 'lucide-react';
import { ServiceHoverEffect } from '../ui/service-card-hover';

const NeuralServices = () => {
    const [openService, setOpenService] = useState(null);
    const sectionRef = useQuantumScrollAnim(0.1);
    const containerRef = useRef(null);

    // Scroll-based animations usando motion
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // 2.5D entrance effect - breve e sottile
    const scaleEntrance = useTransform(scrollYProgress, [0, 0.15], [0.95, 1]);
    const blurEntrance = useTransform(scrollYProgress, [0, 0.15], [8, 0]);

    // 2.5D exit effect - speculare all'entrata (inizia più tardi)
    const scaleExit = useTransform(scrollYProgress, [0.77, 0.92], [1, 0.95]);
    const blurExit = useTransform(scrollYProgress, [0.77, 0.92], [0, 8]);

    // Combina entrata e uscita
    const scale = useTransform(scrollYProgress, (progress) => {
        if (progress <= 0.15) {
            return scaleEntrance.get();
        } else if (progress >= 0.77) {
            return scaleExit.get();
        }
        return 1;
    });

    const blur = useTransform(scrollYProgress, (progress) => {
        if (progress <= 0.15) {
            return blurEntrance.get();
        } else if (progress >= 0.77) {
            return blurExit.get();
        }
        return 0;
    });

    // Parallax continuo - ridotto
    const y = useTransform(scrollYProgress, [0, 1], [0, -80]);

    const services = [
        {
            id: 'paid-media',
            title: 'Paid Media',
            subtitle: 'Performance advertising that delivers ROAS',
            icon: <TrendingUp size={24} />,
            description: 'Transform ad spend into measurable revenue. We engineer high-performance campaigns across Google, Meta, LinkedIn, and emerging platforms, leveraging real-time data and advanced bidding strategies to scale profitably.',
            capabilities: [
                { name: 'PPC Campaign Management' },
                { name: 'Social Media Advertising' },
                { name: 'Display & Programmatic' },
                { name: 'Conversion Rate Optimisation' }
            ]
        },
        {
            id: 'seo',
            title: 'SEO',
            subtitle: 'Organic growth that compounds over time',
            icon: <Search size={24} />,
            description: 'Dominate search rankings with systematic SEO engineering. We combine technical precision, content intelligence, and strategic link building to drive sustainable organic traffic that converts.',
            capabilities: [
                { name: 'Technical SEO & Core Web Vitals' },
                { name: 'Content Strategy & Optimisation' },
                { name: 'Authority Building & Backlinks' },
                { name: 'Local & International SEO' }
            ]
        },
        {
            id: 'web-dev',
            title: 'Website Development',
            subtitle: 'Lightning-fast web experiences',
            icon: <Code size={24} />,
            description: 'Your website engineered for performance and conversion. We build modern, scalable platforms using Next.js, React, and cutting-edge tech stacks. Speed, security, and seamless UX—no compromises.',
            capabilities: [
                { name: 'Next.js & React Development' },
                { name: 'Headless CMS & API Integration' },
                { name: 'E-commerce & Payment Systems' },
                { name: 'Performance & SEO Engineering' }
            ]
        },
        {
            id: 'ai-solutions',
            title: 'AI & Automation',
            subtitle: 'Intelligence that works for your business',
            icon: <BrainCircuit size={24} />,
            description: 'Deploy AI that delivers tangible results. From custom machine learning models to intelligent automation workflows, we transform data into actionable insights and repetitive tasks into autonomous systems.',
            capabilities: [
                { name: 'Custom AI & ML Models' },
                { name: 'Business Process Automation' },
                { name: 'Data Intelligence & Analytics' },
                { name: 'AI Integration & Deployment' }
            ]
        },
    ];

    const toggleService = (id) => {
        setOpenService(openService === id ? null : id);
    };

    return (
        <section id="services" className="relative flex items-center justify-center overflow-hidden p-4 pt-24 pb-24" style={{ background: '#020617', perspective: '1000px' }}>
            <motion.div
                ref={containerRef}
                className="relative h-full w-full rounded-2xl py-24 overflow-hidden"
                style={{
                    background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #312e81 100%)',
                    y,
                    scale,
                    filter: `blur(${blur}px)`,
                    transformStyle: 'preserve-3d'
                }}
            >
                <div ref={sectionRef} className="relative z-10 quantum-anim">
                {/* Minimal mono title - wider container like SharedPortfolio */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
                    <div className="flex items-center gap-3">
                        <span className="text-cyan-400 font-mono text-sm tracking-wide">
                            4)
                        </span>
                        <span className="text-white font-mono text-sm tracking-wide">
                            Integrated Services
                        </span>
                        <span className="text-gray-500 font-mono text-sm tracking-wide">
                            [Core]
                        </span>
                    </div>
                </div>

                {/* Content container - narrower */}
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
                    {/* Blur-to-focus description */}
                    <motion.h3
                        className="text-2xl md:text-4xl font-bold font-inter text-center leading-tight text-white mb-6"
                        initial={{ opacity: 0, filter: "blur(10px)" }}
                        whileInView={{ opacity: 1, filter: "blur(0px)" }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        A synergistic approach to digital dominance
                    </motion.h3>
                    <motion.p
                        className="text-gray-400 text-lg max-w-2xl mx-auto text-center"
                        initial={{ opacity: 0, filter: "blur(10px)" }}
                        whileInView={{ opacity: 1, filter: "blur(0px)" }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    >
                        Each service is a component of a greater strategy, designed to deliver comprehensive and exponential results
                    </motion.p>
                </div>

                {/* Services container */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Desktop & Tablet Grid with Hover Effect */}
                    <div className="hidden md:block">
                        <ServiceHoverEffect
                            items={services.map((service, index) => {
                                const ctaTexts = {
                                    'paid-media': 'Scale Your Campaigns',
                                    'seo': 'Drive Organic Traffic',
                                    'web-dev': 'Build Your Platform',
                                    'ai-solutions': 'Deploy AI Solutions'
                                };
                                const capabilityLabels = {
                                    'paid-media': 'Campaign Types',
                                    'seo': 'Core Deliverables',
                                    'web-dev': 'Tech Stack',
                                    'ai-solutions': 'Solutions'
                                };
                                return {
                                    id: service.id,
                                    number: `0${index + 1}`,
                                    icon: service.icon,
                                    title: service.title,
                                    subtitle: service.subtitle,
                                    description: service.description,
                                    capabilities: service.capabilities,
                                    capabilitiesLabel: capabilityLabels[service.id],
                                    ctaText: ctaTexts[service.id] || "Learn More",
                                    ctaHref: "#contact"
                                };
                            })}
                            className="gap-4 py-0"
                        />
                    </div>

                    {/* Mobile Accordion */}
                    <div className="flex flex-col gap-4 md:hidden">
                    {services.map((service) => (
                        <div
                            key={service.id}
                            className={`bg-slate-800/50 rounded-xl border transition-all duration-300 backdrop-blur-lg ${
                                openService === service.id
                                    ? 'border-cyan-300 bg-cyan-400/5'
                                    : 'border-gray-700/50'
                            }`}
                        >
                            <button
                                className="flex justify-between items-center w-full p-5 px-6 text-left cursor-pointer bg-transparent border-none text-white"
                                onClick={() => toggleService(service.id)}
                                aria-expanded={openService === service.id}
                                aria-controls={`content-${service.id}`}
                            >
                                <div className="flex items-center gap-5">
                                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                                        openService === service.id
                                            ? 'bg-cyan-300 text-gray-900'
                                            : 'bg-gray-600/50 text-white'
                                    }`}>
                                        {service.icon}
                                    </div>
                                    <div className="text-left">
                                        <h3 className="text-lg font-semibold font-inter">{service.title}</h3>
                                        <p className="text-sm text-gray-400 mt-0.5">{service.subtitle}</p>
                                    </div>
                                </div>
                                <div className={`transition-transform duration-300 ${
                                    openService === service.id ? 'rotate-180 text-cyan-300' : ''
                                }`}>
                                    <ChevronDown size={24} />
                                </div>
                            </button>
                            <div
                                id={`content-${service.id}`}
                                className="overflow-hidden transition-all duration-500"
                                style={{ maxHeight: openService === service.id ? '1000px' : '0px' }}
                            >
                                <div className="px-6 pb-6 text-gray-300 text-base leading-relaxed">
                                    <p>{service.description}</p>
                                    <div className="mt-6 border-t border-gray-700/50 pt-6">
                                        <h4 className="text-base font-semibold text-white mb-6 uppercase tracking-wider">
                                            Capability Matrix
                                        </h4>
                                        <ul className="list-none p-0 grid grid-cols-2 gap-4">
                                            {service.capabilities.map((cap, i) => (
                                                <li
                                                    key={i}
                                                    className={`transition-all duration-500 ${
                                                        openService === service.id ? 'opacity-100' : 'opacity-0'
                                                    }`}
                                                    style={{
                                                        animationDelay: `${(i + 1) * 0.1}s`,
                                                        animation: openService === service.id ? 'fadeInItem 0.5s ease forwards' : 'none'
                                                    }}
                                                >
                                                    <div className="flex items-center p-4 gap-3 bg-white/[0.03] rounded-xl">
                                                        <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center relative flex-shrink-0">
                                                            <div className="w-2 h-2 bg-cyan-300 rounded-full animate-[pulseDot_2s_ease-in-out_infinite]"></div>
                                                        </div>
                                                        <span className="text-[0.95rem] font-medium text-gray-200 flex-grow">
                                                            {cap.name}
                                                        </span>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    </div>
                </div>
            </div>
            </motion.div>
            <style jsx>{`
                @keyframes fadeInItem {
                    to { opacity: 1; }
                }
                @keyframes pulseDot {
                    0%, 100% { transform: scale(1); opacity: 1; }
                    50% { transform: scale(1.2); opacity: 0.7; }
                }
                @media (max-width: 768px) {
                    ul.grid-cols-2 { grid-template-columns: 1fr !important; }
                }
            `}</style>
        </section>
    );
};

export default NeuralServices;
