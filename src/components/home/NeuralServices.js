import { TrendingUp, Search, Code, BrainCircuit } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { SectionIntro } from '../ui/section-headers';
import { MovingBorderButton } from '../ui/moving-border-button';
import { Card, CardNumber, CardIcon, CardContent, CardTitle, CardSubtitle, CardDescription, CardCapabilities } from '../ui/service-slider';
import 'swiper/css';
import 'swiper/css/navigation';
import { useEffect, useRef, useState } from 'react';

const NeuralServices = () => {
    const swiperRef = useRef(null);
    const containerRef = useRef(null);
    const lastCardRef = useRef(null);
    const [allCardsVisible, setAllCardsVisible] = useState(false);
    const [shouldApplyFade, setShouldApplyFade] = useState(false);

    // Hook per verificare se tutte le card sono visibili (solo al mount e resize)
    useEffect(() => {
        const checkCardsVisibility = () => {
            if (!containerRef.current || !lastCardRef.current) return;

            const containerRect = containerRef.current.getBoundingClientRect();
            const lastCardRect = lastCardRef.current.getBoundingClientRect();

            // Con centeredSlides + loop, l'ultima card è a sinistra. Se è visibile, tutte lo sono
            // La card ha una shadow di 8px a destra, quindi compensiamo
            const lastCardVisible = lastCardRect.left >= containerRect.left - 8 - 2; // -8px shadow -2px tolleranza

            console.log('[NeuralServices] Card visibility check:', {
                containerLeft: containerRect.left,
                lastCardLeft: lastCardRect.left,
                lastCardVisible,
                windowWidth: window.innerWidth
            });

            setAllCardsVisible(lastCardVisible);

            // Applica il fade da 500px+ (stesso breakpoint del coverflow)
            // Su mobile/tablet sotto 1200px applica sempre il fade
            // Su desktop (≥1200px) applica solo se non tutte le card sono visibili
            const isCoverflowMode = window.innerWidth >= 500;
            const isDesktop = window.innerWidth >= 1200;
            const shouldFade = isCoverflowMode && (isDesktop ? !lastCardVisible : true);

            console.log('[NeuralServices] Fade decision:', {
                isCoverflowMode,
                isDesktop,
                lastCardVisible,
                shouldFade,
                windowWidth: window.innerWidth
            });

            setShouldApplyFade(shouldFade);
        };

        checkCardsVisibility();
        window.addEventListener('resize', checkCardsVisibility);

        // Delay check per assicurarsi che Swiper sia inizializzato
        const timeoutId = setTimeout(checkCardsVisibility, 300);

        return () => {
            window.removeEventListener('resize', checkCardsVisibility);
            clearTimeout(timeoutId);
        };
    }, []); // Empty deps: il numero di servizi è statico

    // Real services data
    const services = [
        {
            id: 'paid-media',
            number: '01',
            title: 'Paid Media',
            subtitle: 'Performance advertising that delivers ROAS',
            icon: <TrendingUp size={24} />,
            description: 'Transform ad spend into measurable revenue. We engineer high-performance campaigns across Google, Meta, LinkedIn, and emerging platforms, leveraging real-time data and advanced bidding strategies to scale profitably.',
            image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80',
            capabilities: [
                { name: 'PPC Campaign Management' },
                { name: 'Social Media Advertising' },
                { name: 'Display & Programmatic' },
                { name: 'Conversion Rate Optimisation' }
            ],
            ctaText: 'Explore Paid Media',
            ctaHref: '/paidsearch'
        },
        {
            id: 'seo',
            number: '02',
            title: 'SEO',
            subtitle: 'Organic growth that compounds over time',
            icon: <Search size={24} />,
            description: 'Dominate search rankings with systematic SEO engineering. We combine technical precision, content intelligence, and strategic link building to drive sustainable organic traffic that converts.',
            image: 'https://images.unsplash.com/photo-1432888622747-4eb9a8f2c293?w=800&auto=format&fit=crop&q=80',
            capabilities: [
                { name: 'Technical SEO & Core Web Vitals' },
                { name: 'Content Strategy & Optimisation' },
                { name: 'Authority Building & Backlinks' },
                { name: 'Local & International SEO' }
            ],
            ctaText: 'Explore SEO',
            ctaHref: '/seo'
        },
        {
            id: 'web-dev',
            number: '03',
            title: 'Website Development',
            subtitle: 'Lightning-fast web experiences',
            icon: <Code size={24} />,
            description: 'Your website engineered for performance and conversion. We build modern, scalable platforms using Next.js, React, and cutting-edge tech stacks. Speed, security, and seamless UX—no compromises.',
            image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&auto=format&fit=crop&q=80',
            capabilities: [
                { name: 'Next.js & React Development' },
                { name: 'Headless CMS & API Integration' },
                { name: 'E-commerce & Payment Systems' },
                { name: 'Performance & SEO Engineering' }
            ],
            ctaText: 'Explore Web Development',
            ctaHref: '/websites'
        },
        {
            id: 'ai-solutions',
            number: '04',
            title: 'AI & Automation',
            subtitle: 'Intelligence that works for your business',
            icon: <BrainCircuit size={24} />,
            description: 'Deploy AI that delivers tangible results. From custom machine learning models to intelligent automation workflows, we transform data into actionable insights and repetitive tasks into autonomous systems.',
            image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop&q=80',
            capabilities: [
                { name: 'Custom AI & ML Models' },
                { name: 'Business Process Automation' },
                { name: 'Data Intelligence & Analytics' },
                { name: 'AI Integration & Deployment' }
            ],
            ctaText: 'Explore AI Solutions',
            ctaHref: '/aisolutions'
        },
        {
            id: 'data-analytics',
            number: '05',
            title: 'Data & Analytics',
            subtitle: 'Data-driven decisions that move the needle',
            icon: <TrendingUp size={24} />,
            description: 'Transform raw data into strategic advantage. We implement comprehensive analytics frameworks, build custom dashboards, and deliver insights that drive measurable business outcomes.',
            image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80',
            capabilities: [
                { name: 'Analytics Implementation & Audits' },
                { name: 'Custom Dashboards & Reporting' },
                { name: 'Conversion Rate Optimization' },
                { name: 'Predictive Analytics & Forecasting' }
            ],
            ctaText: 'Explore Data & Analytics',
            ctaHref: '/analytics'
        },
        {
            id: 'social-media',
            number: '06',
            title: 'Social Media',
            subtitle: 'Content that converts, audiences that engage',
            icon: <Code size={24} />,
            description: 'Build brand authority and drive engagement across social platforms. We create data-backed content strategies, manage communities, and run high-performing social campaigns that deliver real business results.',
            image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&auto=format&fit=crop&q=80',
            capabilities: [
                { name: 'Social Strategy & Content Planning' },
                { name: 'Community Management' },
                { name: 'Influencer Partnerships' },
                { name: 'Social Commerce & Attribution' }
            ],
            ctaText: 'Explore Social Media',
            ctaHref: '/socialmedia'
        },
    ];

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
                <div className="max-w-content mx-auto overflow-x-clip overflow-y-visible">
                    {/* Custom 3D Slider - margin negativo solo su mobile per espandere lo spazio */}
                    <div className="relative overflow-visible -mx-4 md:mx-0">
                        {/* Navigation Buttons */}
                        <div className="service-slider-nav-mobile relative z-10">
                            <button
                                className="swiper-button-prev-services"
                                aria-label="Previous service"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                            <button
                                className="swiper-button-next-services"
                                aria-label="Next service"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>

                        <div
                            ref={containerRef}
                            className="relative swiper-3d-container"
                            style={{
                                perspective: '1200px',
                                ...(shouldApplyFade ? {
                                    maskImage: window.innerWidth >= 1200
                                        ? 'linear-gradient(to right, transparent, black 120px, black calc(100% - 120px), transparent)'
                                        : 'linear-gradient(to right, transparent, black 96px, black calc(100% - 96px), transparent)',
                                    WebkitMaskImage: window.innerWidth >= 1200
                                        ? 'linear-gradient(to right, transparent, black 120px, black calc(100% - 120px), transparent)'
                                        : 'linear-gradient(to right, transparent, black 96px, black calc(100% - 96px), transparent)'
                                } : {})
                            }}
                        >
                            <Swiper
                                modules={[Navigation]}
                                slidesPerView={1}
                                spaceBetween={20}
                                breakpoints={{
                                    500: {
                                        slidesPerView: 'auto',
                                        spaceBetween: 20,
                                        centeredSlides: true

                                    },
                                    768: {
                                        slidesPerView: 'auto',
                                        spaceBetween: 24,
                                        centeredSlides: true
                                    },
                                    1200: {
                                        slidesPerView: 'auto',
                                        spaceBetween: 40,
                                        centeredSlides: true
                                    },
                                }}
                                grabCursor={true}
                                loop={true}
                                loopedSlides={services.length}
                                speed={400}
                                navigation={{
                                    nextEl: '.swiper-button-next-services',
                                    prevEl: '.swiper-button-prev-services',
                                }}
                                onSwiper={(swiper) => {
                                    swiperRef.current = swiper;
                                }}
                                className="services-3d-swiper pb-8"
                            >
                                {services.map((item, index) => (
                                    <SwiperSlide key={`${item.id}-${index}`}>
                                        {({ isActive }) => (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <div
                                                    ref={index === services.length - 1 ? lastCardRef : null}
                                                    className="service-slide-content h-full"
                                                    onClick={() => {
                                                        if (!isActive && swiperRef.current) {
                                                            // Find the real index in the loop
                                                            const realIndex = swiperRef.current.slides.findIndex(
                                                                slide => slide.querySelector(`[data-service-id="${item.id}"]`)
                                                            );
                                                            if (realIndex !== -1) {
                                                                swiperRef.current.slideToLoop(index);
                                                            }
                                                        }
                                                    }}
                                                >
                                                    <Card
                                                        href={isActive ? item.ctaHref : undefined}
                                                        data-service-id={item.id}
                                                    >
                                                        {item.number && <CardNumber>{item.number}</CardNumber>}
                                                        {item.icon && <CardIcon>{item.icon}</CardIcon>}
                                                        <CardContent>
                                                            <CardTitle>{item.title}</CardTitle>
                                                            {item.subtitle && <CardSubtitle>{item.subtitle}</CardSubtitle>}
                                                            {item.description && <CardDescription>{item.description}</CardDescription>}
                                                            {item.image && (
                                                                <div className="service-image-container w-full aspect-video rounded-lg overflow-hidden border-2 border-white/10 mt-4">
                                                                    <img
                                                                        src={item.image}
                                                                        alt={item.title}
                                                                        className="w-full h-full object-cover"
                                                                    />
                                                                </div>
                                                            )}
                                                            {item.capabilities && item.capabilities.length > 0 && (
                                                                <CardCapabilities capabilities={item.capabilities} />
                                                            )}
                                                            {item.ctaText && item.ctaHref && (
                                                                <span className="group/cta inline-flex items-center gap-2 text-sm font-semibold text-white transition-colors duration-300 mt-4">
                                                                    <span>{item.ctaText}</span>
                                                                    <span className="transition-transform duration-300 group-hover/cta:translate-x-1">→</span>
                                                                </span>
                                                            )}
                                                        </CardContent>
                                                    </Card>
                                                </div>
                                            </div>
                                        )}
                                    </SwiperSlide>
                                ))}
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
            <style jsx global>{`

                /* Tablet (≥768px): 330px */
                @media (min-width: 768px) {
                    .services-3d-swiper .swiper-slide {
                        width: 330px !important;
                    }
                }

                /* Desktop (≥1200px): 420px */
                @media (min-width: 1200px) {
                    .services-3d-swiper .swiper-slide {
                        width: 420px !important;
                    }
                }

                /* Card flex layout */
                .services-3d-swiper .swiper-slide .service-slide-content > a {
                    display: flex;
                    flex-direction: column;
                }

                /* CTA highlighted on card hover for active slide - both text and arrow */
                .services-3d-swiper .swiper-slide-active .service-slide-content > a:hover span[class*="group/cta"] {
                    color: #22d3ee; /* cyan-400 */
                }

                /* Arrow translation on card hover for active slide */
                .services-3d-swiper .swiper-slide-active .service-slide-content > a:hover span[class*="group/cta"] span:last-child {
                    transform: translateX(4px);
                }

                /* Icon subtle glow and color shift on card hover for active slide */
                .services-3d-swiper .swiper-slide-active .service-slide-content > a:hover div[class*="w-14 h-14"] {
                    background-color: rgba(34, 211, 238, 0.15); /* cyan-400/15 */
                    border-color: rgba(34, 211, 238, 0.5); /* cyan-400/50 */
                    box-shadow: 0 0 16px rgba(34, 211, 238, 0.2);
                }

                /* Icon SVG color brighten on hover */
                .services-3d-swiper .swiper-slide-active .service-slide-content > a:hover div[class*="w-14 h-14"] svg {
                    color: #22d3ee; /* cyan-400 - slightly brighter */
                }

                /* Number gradient animation on card hover for active slide */
                .services-3d-swiper .swiper-slide-active .service-slide-content > a:hover div[class*="absolute top-6 right-6"] .number-static {
                    opacity: 0;
                }
                .services-3d-swiper .swiper-slide-active .service-slide-content > a:hover div[class*="absolute top-6 right-6"] .number-animated {
                    opacity: 1;
                }

                /* Ensure card pointer on active slide */
                .services-3d-swiper .swiper-slide-active .service-slide-content > a[href] {
                    cursor: pointer;
                }

                /* Disable default card hover translate in swiper */
                .services-3d-swiper .swiper-slide .service-slide-content > a:hover {
                    transform: none !important;
                }

                /* Hover effects for INACTIVE slides (secondary cards) - tablet+ only */
                @media (min-width: 500px) {
                    /* Icon subtle brighten on inactive cards hover - grayscale */
                    .services-3d-swiper .swiper-slide:not(.swiper-slide-active) .service-slide-content:hover div[class*="w-14 h-14"] {
                        background-color: rgba(255, 255, 255, 0.06); /* subtle brighter from 0.03 */
                        border-color: rgba(255, 255, 255, 0.18); /* subtle brighter from 0.1 */
                        box-shadow: 0 0 12px rgba(255, 255, 255, 0.08);
                    }

                    .services-3d-swiper .swiper-slide:not(.swiper-slide-active) .service-slide-content:hover div[class*="w-14 h-14"] svg {
                        color: rgba(156, 163, 175, 1); /* gray-400 - subtle brighter from gray-500 */
                    }

                    /* Cursor pointer on inactive cards to signal interactivity */
                    .services-3d-swiper .swiper-slide:not(.swiper-slide-active) .service-slide-content {
                        cursor: pointer;
                    }
                }

                /* Remove swiper default overflow */
                .services-3d-swiper,
                .services-3d-swiper .swiper-wrapper {
                    overflow: visible !important;
                }

                /* Add padding bottom to prevent clipping */
                .services-3d-swiper {
                    padding-bottom: 100px !important;
                    margin-bottom: -100px !important;
                }

                /* Mobile Small (<500px): No effects at all */
                .services-3d-swiper .swiper-slide .service-slide-content {
                    transition: all 0.5s ease;
                    opacity: 1;
                    z-index: 1;
                    transform: none;
                }

                /* Tablet+ (≥500px): Fade effect + 3D transforms */
                @media (min-width: 500px) {
                    .services-3d-swiper .swiper-slide .service-slide-content {
                        transform: scale(0.85) translateZ(-200px) rotateY(0deg);
                        opacity: 0.4;
                    }

                    .services-3d-swiper .swiper-slide-active .service-slide-content {
                        transform: scale(1) translateZ(0) rotateY(0deg);
                        opacity: 1;
                    }

                    .services-3d-swiper .swiper-slide-prev .service-slide-content {
                        transform: scale(0.85) translateZ(-200px) rotateY(15deg);
                    }

                    .services-3d-swiper .swiper-slide-next .service-slide-content {
                        transform: scale(0.85) translateZ(-200px) rotateY(-15deg);
                    }
                }

                /* Stili per elementi interni - default (inactive) */
                /* Mobile Small (<500px): Always full opacity/color for single card view */
                .services-3d-swiper .swiper-slide .service-number {
                    opacity: 1;
                    transition: opacity 0.5s ease;
                }
                .services-3d-swiper .swiper-slide .service-title {
                    color: white;
                }
                .services-3d-swiper .swiper-slide .service-subtitle {
                    color: rgb(34, 211, 238); /* text-cyan-400 */
                }

                /* Stili per slide attiva - always at full */
                .services-3d-swiper .swiper-slide-active .service-number {
                    opacity: 1;
                }
                .services-3d-swiper .swiper-slide-active .service-title {
                    color: white;
                }
                .services-3d-swiper .swiper-slide-active .service-subtitle {
                    color: rgb(34, 211, 238); /* text-cyan-400 */
                }

                /* Tablet+ (≥500px): Apply muted styles to inactive slides */
                @media (min-width: 500px) {
                    /* Inactive slide default state - muted */
                    .services-3d-swiper .swiper-slide .service-number {
                        opacity: 0.4;
                    }
                    .services-3d-swiper .swiper-slide .service-title {
                        color: rgb(107, 114, 128); /* text-gray-500 */
                    }
                    .services-3d-swiper .swiper-slide .service-subtitle {
                        color: rgb(75, 85, 99); /* text-gray-600 */
                    }

                    /* Icon muted for inactive slides */
                    .services-3d-swiper .swiper-slide:not(.swiper-slide-active) .service-slide-content div[class*="w-14 h-14"] {
                        background-color: rgba(255, 255, 255, 0.03);
                        border-color: rgba(255, 255, 255, 0.1);
                    }

                    .services-3d-swiper .swiper-slide:not(.swiper-slide-active) .service-slide-content div[class*="w-14 h-14"] svg {
                        color: rgb(107, 114, 128); /* gray-500 */
                    }

                    /* Restore full color/opacity for active slide */
                    .services-3d-swiper .swiper-slide-active .service-number {
                        opacity: 1;
                    }
                    .services-3d-swiper .swiper-slide-active .service-title {
                        color: white;
                    }
                    .services-3d-swiper .swiper-slide-active .service-subtitle {
                        color: rgb(34, 211, 238); /* text-cyan-400 */
                    }
                }

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
