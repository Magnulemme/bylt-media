import { useState } from 'react';
import { TrendingUp, Search, Code, BrainCircuit, ChevronDown } from 'lucide-react';
import { ServiceSlider } from '../ui/service-slider';
import { SectionIntro } from '../ui/section-headers';

const NeuralServices = () => {
    const [openService, setOpenService] = useState(null);

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
        <>
            {/* Section intro */}
            <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
                <SectionIntro
                    title="A synergistic approach to digital dominance"
                    subtitle="Each service is a component of a greater strategy, designed to deliver comprehensive and exponential results"
                    variant="blur"
                    maxWidth="5xl"
                    align="left"
                />
            </div>

                {/* Services container */}
                <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Desktop & Tablet Slider */}
                    <div className="hidden md:block">
                        <ServiceSlider
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
                            className="py-0"
                        />
                    </div>

                    {/* Mobile Accordion */}
                    <div className="flex flex-col gap-4 md:hidden">
                    {services.map((service, index) => (
                        <div
                            key={service.id}
                            className="pb-2 pr-2"
                        >
                            <div
                                className={`rounded-lg bg-white/5 backdrop-blur-sm border-2 transition-all duration-300 ${
                                    openService === service.id
                                        ? 'border-cyan-400/60 translate-x-[2px] translate-y-[2px]'
                                        : 'border-white/30'
                                }`}
                                style={{
                                    boxShadow: openService === service.id
                                        ? '4px 4px 0px rgba(34, 211, 238, 1)'
                                        : '6px 6px 0px rgba(34, 211, 238, 1)',
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                <div className="relative">
                                    <button
                                        className="flex justify-between items-start gap-3 w-full p-5 text-left cursor-pointer bg-transparent border-none text-white"
                                        onClick={() => toggleService(service.id)}
                                        aria-expanded={openService === service.id}
                                        aria-controls={`content-${service.id}`}
                                    >
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-xl font-bold text-white font-inter m-0 leading-tight">
                                                {service.title}
                                            </h3>
                                            <p className="text-sm text-gray-400 m-0 mt-1">{service.subtitle}</p>
                                        </div>
                                        <div className="flex flex-col items-end gap-2 flex-shrink-0">
                                            <div className="relative text-3xl font-bold font-inter leading-none">
                                                {/* Static number - always visible */}
                                                <span className={`bg-gradient-to-br from-cyan-400/[0.15] to-purple-600/[0.12] bg-clip-text text-transparent transition-opacity duration-500 ${
                                                    openService === service.id ? 'opacity-0' : 'opacity-100'
                                                }`}>
                                                    0{index + 1}
                                                </span>
                                                {/* Animated gradient when open */}
                                                <span className={`absolute top-0 left-0 bg-gradient-to-r from-cyan-400/30 via-blue-500/30 to-purple-600/30 bg-clip-text text-transparent animate-gradient transition-opacity duration-500 bg-[length:200%_200%] ${
                                                    openService === service.id ? 'opacity-100' : 'opacity-0'
                                                }`}>
                                                    0{index + 1}
                                                </span>
                                            </div>
                                            <div
                                                className={`transition-all duration-300 ${
                                                    openService === service.id ? 'rotate-180 text-cyan-400' : 'text-white'
                                                }`}
                                            >
                                                <ChevronDown size={24} strokeWidth={2.5} />
                                            </div>
                                        </div>
                                    </button>
                                </div>
                                <div
                                    id={`content-${service.id}`}
                                    className="overflow-hidden transition-all duration-500"
                                    style={{ maxHeight: openService === service.id ? '1000px' : '0px' }}
                                >
                                    <div className="px-5 pb-5 flex flex-col gap-4">
                                        <p className="text-sm text-gray-300 leading-relaxed">{service.description}</p>
                                        <div className="border-t border-white/10 pt-4">
                                            <p className="text-xs text-cyan-400 font-semibold uppercase tracking-wider mb-3">Key Capabilities</p>
                                            <div className="space-y-2">
                                                {service.capabilities.map((cap, i) => (
                                                    <div
                                                        key={i}
                                                        className="flex items-start gap-2 text-xs text-gray-400"
                                                    >
                                                        <span className="text-cyan-400 mt-0.5">•</span>
                                                        <span className="leading-tight">{cap.name}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    </div>
                </div>
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
        </>
    );
};

export default NeuralServices;
