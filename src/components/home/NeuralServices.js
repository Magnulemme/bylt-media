import { TrendingUp, Search, Code, BrainCircuit } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { SectionIntro } from '../ui/section-headers';
import { MovingBorderButton } from '../ui/moving-border-button';
import { Card, CardNumber, CardIcon, CardContent, CardTitle, CardSubtitle, CardDescription, CardCapabilities } from '../ui/service-slider';
import 'swiper/css';
import 'swiper/css/navigation';
import { useEffect, useRef } from 'react';

const NeuralServices = () => {
    const swiperRef = useRef(null);

    useEffect(() => {
        console.log('[NeuralServices] Component mounted');
        console.log('[NeuralServices] Window width:', window.innerWidth);
    }, []);
    // Real services data
    const services = [
        {
            id: 'paid-media',
            number: '01',
            title: 'Paid Media',
            subtitle: 'Performance advertising that delivers ROAS',
            icon: <TrendingUp size={24} />,
            description: 'Transform ad spend into measurable revenue. We engineer high-performance campaigns across Google, Meta, LinkedIn, and emerging platforms, leveraging real-time data and advanced bidding strategies to scale profitably.',
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
                    {/* Custom 3D Slider */}
                    <div className="relative overflow-visible">
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
                            className="relative swiper-3d-container"
                            style={{
                                perspective: '1200px',
                                maskImage: 'linear-gradient(to right, transparent, black 96px, black calc(100% - 96px), transparent)',
                                WebkitMaskImage: 'linear-gradient(to right, transparent, black 96px, black calc(100% - 96px), transparent)'
                            }}
                        >
                            <Swiper
                                modules={[Navigation]}
                                slidesPerView="auto"
                                centeredSlides={true}
                                spaceBetween={40}
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
                                    console.log('[Swiper] Initialized', {
                                        slidesPerView: swiper.params.slidesPerView,
                                        activeIndex: swiper.activeIndex,
                                        slides: swiper.slides.length
                                    });
                                }}
                                onSlideChange={(swiper) => {
                                    console.log('[Swiper] Slide changed', {
                                        activeIndex: swiper.activeIndex,
                                        realIndex: swiper.realIndex
                                    });

                                    // Log opacity delle slide
                                    swiper.slides.forEach((slide, index) => {
                                        const content = slide.querySelector('.service-slide-content');
                                        if (content) {
                                            const computedStyle = window.getComputedStyle(content);
                                            const opacity = computedStyle.opacity;
                                            const classList = Array.from(slide.classList);

                                            if (classList.includes('swiper-slide-active') ||
                                                classList.includes('swiper-slide-prev') ||
                                                classList.includes('swiper-slide-next')) {
                                                console.log(`[Fade Check] Slide ${index}:`, {
                                                    classes: classList.filter(c => c.includes('swiper-slide')).join(', '),
                                                    opacity: opacity,
                                                    windowWidth: window.innerWidth
                                                });
                                            }
                                        }
                                    });
                                }}
                                className="services-3d-swiper pb-8"
                            >
                                {services.map((item, index) => (
                                    <SwiperSlide key={`${item.id}-${index}`}>
                                        {({ isActive }) => (
                                            <div className="service-slide-content h-full">
                                                <Card href={isActive ? item.ctaHref : undefined}>
                                                    {item.number && <CardNumber>{item.number}</CardNumber>}
                                                    {item.icon && <CardIcon>{item.icon}</CardIcon>}
                                                    <CardContent>
                                                        <CardTitle>{item.title}</CardTitle>
                                                        {item.subtitle && <CardSubtitle>{item.subtitle}</CardSubtitle>}
                                                        {item.description && <CardDescription>{item.description}</CardDescription>}
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
                /* Mobile (<350px): 1 card, no peek */
                .services-3d-swiper .swiper-slide {
                    width: calc(100vw - 48px) !important;
                    max-width: 480px;
                }

                /* Medium (≥350px): Show peek of adjacent cards */
                @media (min-width: 350px) {
                    .services-3d-swiper .swiper-slide {
                        width: 320px !important;
                    }
                }

                /* Desktop (≥1200px): Full 3 cards with fade */
                @media (min-width: 1200px) {
                    .services-3d-swiper .swiper-slide {
                        width: 420px !important;
                    }

                    .swiper-3d-container {
                        mask-image: linear-gradient(to right, transparent, black 120px, black calc(100% - 120px), transparent) !important;
                        -webkit-mask-image: linear-gradient(to right, transparent, black 120px, black calc(100% - 120px), transparent) !important;
                    }
                }

                /* Card flex layout */
                .services-3d-swiper .swiper-slide .service-slide-content > a {
                    display: flex;
                    flex-direction: column;
                }

                /* CTA highlighted on card hover for active slide */
                .services-3d-swiper .swiper-slide-active .service-slide-content > a:hover span[class*="group/cta"] span:first-child {
                    color: #22d3ee; /* cyan-400 */
                }

                /* Arrow translation on card hover for active slide */
                .services-3d-swiper .swiper-slide-active .service-slide-content > a:hover span[class*="group/cta"] span:last-child {
                    transform: translateX(4px);
                }

                /* Number subtle glow on card hover for active slide */
                .services-3d-swiper .swiper-slide-active .service-slide-content > a:hover div[class*="absolute top-6 right-6"] span {
                    text-shadow: 0 0 20px rgba(34, 211, 238, 0.6), 0 0 40px rgba(34, 211, 238, 0.3);
                    filter: brightness(1.15);
                }

                /* Ensure card pointer on active slide */
                .services-3d-swiper .swiper-slide-active .service-slide-content > a[href] {
                    cursor: pointer;
                }

                /* Disable default card hover translate in swiper */
                .services-3d-swiper .swiper-slide .service-slide-content > a:hover {
                    transform: none !important;
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

                /* Mobile Small (<350px): No fade, single card focus */
                .services-3d-swiper .swiper-slide .service-slide-content {
                    transition: all 0.5s ease;
                    opacity: 1;
                    z-index: 1;
                }

                .services-3d-swiper .swiper-slide-active .service-slide-content {
                    opacity: 1;
                    z-index: 10;
                }

                /* Everything else (≥350px): Fade effect + 3D transforms */
                @media (min-width: 350px) {
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
                /* Mobile Small (<350px): Always full opacity/color for single card view */
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

                /* Mobile Medium (≥350px): Apply muted styles to inactive slides */
                @media (min-width: 350px) {
                    .services-3d-swiper .swiper-slide .service-number {
                        opacity: 0.4;
                    }
                    .services-3d-swiper .swiper-slide .service-title {
                        color: rgb(107, 114, 128); /* text-gray-500 */
                    }
                    .services-3d-swiper .swiper-slide .service-subtitle {
                        color: rgb(75, 85, 99); /* text-gray-600 */
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
