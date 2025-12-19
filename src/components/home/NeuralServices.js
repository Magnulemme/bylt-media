import { useState, useEffect } from 'react';
import { TrendingUp, Search, Code, BrainCircuit, ChevronDown } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Navigation } from 'swiper/modules';
import { ServiceSlider } from '../ui/service-slider';
import { SectionIntro } from '../ui/section-headers';
import { MovingBorderButton } from '../ui/moving-border-button';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';

const NeuralServices = () => {
    const [mobileIsBeginning, setMobileIsBeginning] = useState(true);
    const [mobileIsEnd, setMobileIsEnd] = useState(false);
    const [showSideCards, setShowSideCards] = useState(false);
    const [isTablet, setIsTablet] = useState(false);

    useEffect(() => {
        const checkWidth = () => {
            const cardWidth = 280;
            const fadeSpace = 56; // 10% fade per lato
            const margin = 40; // Margine di sicurezza
            const minWidth = cardWidth + fadeSpace + margin;
            setShowSideCards(window.innerWidth >= minWidth);
            setIsTablet(window.innerWidth >= 768);
        };

        checkWidth();
        window.addEventListener('resize', checkWidth);
        return () => window.removeEventListener('resize', checkWidth);
    }, []);

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

    // Triplica le slide per il loop manuale
    const loopedServices = [...services, ...services, ...services];

    return (
        <>
            {/* Section intro */}
            <div className="max-w-content mx-auto ">
                <SectionIntro
                    title="A synergistic approach to digital dominance"
                    subtitle="Each service is a component of a greater strategy, designed to deliver comprehensive and exponential results"
                    variant="blur"
                    maxWidth="5xl"
                    align="left"
                />
            </div>

                {/* Services container */}
                <div className="max-w-content mx-auto lg:overflow-hidden overflow-visible">
                    {/* Desktop Slider */}
                    <div className="hidden lg:block">
                        <ServiceSlider
                            items={services.map((service, index) => {
                                const capabilityLabels = {
                                    'paid-media': 'Campaign Types',
                                    'seo': 'Core Deliverables',
                                    'web-dev': 'Tech Stack',
                                    'ai-solutions': 'Solutions'
                                };
                                const ctaTexts = {
                                    'paid-media': 'Scale Your Campaigns',
                                    'seo': 'Drive Organic Traffic',
                                    'web-dev': 'Build Your Platform',
                                    'ai-solutions': 'Deploy AI Solutions'
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
                                    showCTA: true,
                                    ctaText: ctaTexts[service.id],
                                    ctaHref: "#contact"
                                };
                            })}
                            showCTA={false}
                            className="py-0"
                        />
                    </div>

                    {/* Mobile & Tablet Coverflow */}
                    <div className="lg:hidden relative overflow-visible">
                        {/* Navigation Buttons */}
                        <div className="service-slider-nav-mobile relative z-10">
                            <button
                                className={`swiper-button-prev-mobile ${
                                    mobileIsBeginning ? 'opacity-40 cursor-not-allowed' : ''
                                }`}
                                disabled={mobileIsBeginning}
                                aria-label="Previous service"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                            <button
                                className={`swiper-button-next-mobile ${
                                    mobileIsEnd ? 'opacity-40 cursor-not-allowed' : ''
                                }`}
                                disabled={mobileIsEnd}
                                aria-label="Next service"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>

                        <div
                            className="md:-mx-[calc(var(--margin-safe-x)-4px)]"
                            style={showSideCards ? {
                                maskImage: 'linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%)',
                                WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%)',
                            } : {}}
                        >
                        <Swiper
                                modules={[EffectCoverflow, Navigation]}
                                effect="coverflow"
                                grabCursor={true}
                                centeredSlides={true}
                                slidesPerView="auto"
                                loop={false}
                                initialSlide={services.length}
                                spaceBetween={isTablet ? 40 : 0}
                                coverflowEffect={{
                                    rotate: 0,
                                    stretch: 0,
                                    depth: showSideCards ? 200 : 100,
                                    modifier: showSideCards ? 1.5 : 1,
                                    slideShadows: false,
                                }}
                                navigation={{
                                    nextEl: '.swiper-button-next-mobile',
                                    prevEl: '.swiper-button-prev-mobile',
                                }}
                                onSlideChange={(swiper) => {
                                    const current = swiper.activeIndex;

                                    // Loop infinito: quando arrivi alla fine, salta all'inizio
                                    if (current >= services.length * 2) {
                                        setTimeout(() => {
                                            swiper.slideTo(services.length, 0);
                                        }, 300);
                                    }
                                    // Quando vai indietro dall'inizio, salta alla fine
                                    else if (current < services.length) {
                                        setTimeout(() => {
                                            swiper.slideTo(services.length * 2 - 1, 0);
                                        }, 300);
                                    }
                                }}
                                className="pb-8"
                            >
                            {loopedServices.map((service, index) => {
                                const ctaTexts = {
                                    'paid-media': 'Scale Your Campaigns',
                                    'seo': 'Drive Organic Traffic',
                                    'web-dev': 'Build Your Platform',
                                    'ai-solutions': 'Deploy AI Solutions'
                                };
                                return (
                                    <SwiperSlide key={`${service.id}-${index}`} className="!w-[280px] md:!w-[320px]">
                                        {({ isActive }) => (
                                            <div className="service-coverflow-card-wrapper">
                                                <div
                                                    className={`service-coverflow-card transition-all duration-500 ${
                                                        isActive
                                                            ? 'service-coverflow-card-active'
                                                            : 'service-coverflow-card-inactive'
                                                    }`}
                                                >
                                                    {/* Icon/Number Badge in alto */}
                                                    <div className="flex items-center justify-between mb-6">
                                                        <div className="w-14 h-14 rounded-lg bg-cyan-400/10 border-2 border-cyan-400/30 flex items-center justify-center text-cyan-300">
                                                            {service.icon}
                                                        </div>
                                                        <div className="text-5xl font-bold font-inter leading-none">
                                                            <span className={`bg-gradient-to-br from-cyan-400/20 to-purple-600/15 bg-clip-text text-transparent ${
                                                                isActive ? 'opacity-100' : 'opacity-40'
                                                            }`}>
                                                                0{(index % services.length) + 1}
                                                            </span>
                                                        </div>
                                                    </div>

                                                    {/* Titolo e Sottotitolo */}
                                                    <div className="flex flex-col gap-3 mb-6">
                                                        <h3 className={`text-2xl font-bold font-inter leading-tight transition-colors line-clamp-2 ${
                                                            isActive ? 'text-white' : 'text-gray-500'
                                                        }`}>
                                                            {service.title}
                                                        </h3>
                                                        <p className={`text-sm leading-relaxed transition-colors line-clamp-2 ${
                                                            isActive ? 'text-cyan-400' : 'text-gray-600'
                                                        }`}>
                                                            {service.subtitle}
                                                        </p>
                                                    </div>

                                                    {/* Descrizione e dettagli */}
                                                    <div className="transition-all duration-500">
                                                        <p className="text-sm text-gray-300 leading-relaxed mb-6 line-clamp-4">
                                                            {service.description}
                                                        </p>

                                                        {/* Capabilities */}
                                                        <div className="border-t border-white/10 pt-4">
                                                            <p className="text-xs text-cyan-400 font-semibold uppercase tracking-wider mb-3">
                                                                Key Capabilities
                                                            </p>
                                                            <div className="flex flex-col gap-2 max-h-24 overflow-hidden">
                                                                {service.capabilities.map((cap, i) => (
                                                                    <div key={i} className="flex items-start gap-2 text-xs text-gray-400">
                                                                        <span className="text-cyan-400 mt-0.5">•</span>
                                                                        <span className="leading-tight line-clamp-1">{cap.name}</span>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>

                                                        {/* CTA Link */}
                                                        <a href="#contact" className="inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-cyan-400 transition-colors duration-300 mt-6">
                                                            <span>{ctaTexts[service.id]}</span>
                                                            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </SwiperSlide>
                                );
                            })}
                        </Swiper>
                        </div>
                    </div>

                    {/* CTA Section - Below everything */}
                    <div className="services-bottom-cta-section">
                        <div className="services-bottom-cta-content">
                            <p>
                                Don't see exactly what you need? We offer <span className="text-cyan-400 font-semibold">custom solutions</span> tailored to your business goals.
                            </p>
                        </div>
                        <MovingBorderButton
                            borderRadius="0.75rem"
                            containerClassName="min-w-[240px] h-16"
                            borderClassName="h-24 w-24 bg-[radial-gradient(circle,#06b6d4_20%,#3b82f6_40%,#8b5cf6_60%,transparent_80%)] opacity-100"
                            className="border-2 border-slate-700/80 text-white font-bold text-base bg-slate-950"
                            duration={2500}
                        >
                            Discuss Your Project
                        </MovingBorderButton>
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
