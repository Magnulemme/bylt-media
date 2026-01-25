import { TrendingUp, Search, Code, BrainCircuit } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { SectionIntro } from '../ui/section-headers';
import { MovingBorderButton } from '../ui/moving-border-button';
import { Card, CardNumber, CardIcon, CardContent, CardTitle, CardSubtitle, CardDescription, CardCapabilities } from '../ui/service-slider';
import 'swiper/css';
import 'swiper/css/navigation';
import { useRef } from 'react';

const NeuralServicesMobile = () => {
    const swiperRef = useRef(null);

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
            <div className="max-w-content mx-auto">
                <SectionIntro
                    title="A synergistic approach to digital dominance"
                    subtitle="Each service is a component of a greater strategy, designed to deliver comprehensive and exponential results"
                    variant="blur"
                    maxWidth="5xl"
                    align="left"
                />
            </div>

            {/* Services container */}
            <div className="max-w-content mx-auto overflow-x-clip overflow-y-visible services-container-mobile">
                {/* Custom Slider - espande oltre i safe margins */}
                <div className="relative overflow-visible services-slider-expander">

                    {/* Navigation Buttons */}
                    <div className="service-slider-nav-mobile relative z-10 px-(--margin-safe-x)">
                        <button
                            className="swiper-button-prev-services swiper-button-prev-mobile"
                            aria-label="Previous service"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <button
                            className="swiper-button-next-services swiper-button-next-mobile"
                            aria-label="Next service"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>

                    {/* Swiper Container */}
                    <Swiper
                        modules={[Navigation]}
                        slidesPerView={1}
                        spaceBetween={0}
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
                        speed={400}
                        navigation={{
                            nextEl: '.swiper-button-next-services',
                            prevEl: '.swiper-button-prev-services',
                        }}
                        onSwiper={(swiper) => {
                            swiperRef.current = swiper;
                        }}
                        className="services-mobile-swiper"
                    >
                        {services.map((item, index) => (
                            <SwiperSlide key={`${item.id}-${index}`}>
                                {({ isActive }) => (
                                    <div className="slide-wrapper">
                                        {/* Card con larghezza fissa */}
                                        <div className="card-container">
                                            <Card href={isActive ? item.ctaHref : undefined}>
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
                /* ==========================================
                   SERVICES CONTAINER - SAFE MARGINS
                   ========================================== */
                .services-container-mobile {
                    padding-left: var(--margin-safe-x);
                    padding-right: var(--margin-safe-x);
                }

                /* Slider expander - espande lo swiper oltre i safe margins */
                .services-slider-expander {
                    margin-left: calc(-1 * var(--margin-safe-x));
                    margin-right: calc(-1 * var(--margin-safe-x));
                }

                /* ==========================================
                   SWIPER SLIDE - SEMPRE FULL WIDTH
                   ========================================== */
                .services-mobile-swiper .swiper-slide {
                    width: 100% !important;
                    height: auto !important;
                }

                .services-mobile-swiper .swiper-wrapper {
                    align-items: stretch !important;
                }

                /* ==========================================
                   WRAPPER - FULL WIDTH + FLEX CENTER
                   ========================================== */
                .services-mobile-swiper .slide-wrapper {
                    width: 100%;
                    height: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: stretch;
                    padding: 1rem 0;
                }

                /* ==========================================
                   CARD CONTAINER - LARGHEZZA RESPONSIVE FLUIDA
                   ========================================== */
                .services-mobile-swiper .card-container {
                    /* 100% dello spazio disponibile meno margini interni */
                    width: calc(100% - 40px);

                    /* Limiti min/max per mantenere proporzioni */
                    min-width: 220px;
                    max-width: 420px;

                    /* Mantiene la larghezza fissa */
                    flex-shrink: 0;

                    /* Prende tutta l'altezza disponibile dal parent */
                    height: 100%;

                    /* Compensazione shadow 8px: spostiamo 4px a sx */
                    margin-left: -4px;
                }

                .services-mobile-swiper .card-container > a {
                    display: flex;
                    flex-direction: column;
                    width: 100%;
                    height: 100%;
                }

                /* ==========================================
                   CAPABILITIES - HIDE ON MOBILE
                   ========================================== */
                .services-mobile-swiper .card-container [class*="space-y-3 border-t"] {
                    display: none;
                }

                @media (min-width: 768px) {
                    .services-mobile-swiper .card-container [class*="space-y-3 border-t"] {
                        display: block;
                    }
                }

                /* ==========================================
                   SWIPER OVERFLOW
                   ========================================== */
                .services-mobile-swiper,
                .services-mobile-swiper .swiper-wrapper {
                    overflow: visible !important;
                }

                /* Add padding bottom to prevent clipping */
                .services-mobile-swiper {
                    padding-bottom: 100px !important;
                    margin-bottom: -100px !important;
                }

                /* ==========================================
                   CARD HOVER EFFECTS (solo su active slide)
                   ========================================== */

                /* CTA highlighted on card hover for active slide */
                .services-mobile-swiper .swiper-slide-active .card-container > a:hover span[class*="group/cta"] span:first-child {
                    color: #22d3ee; /* cyan-400 */
                }

                /* Arrow translation on card hover for active slide */
                .services-mobile-swiper .swiper-slide-active .card-container > a:hover span[class*="group/cta"] span:last-child {
                    transform: translateX(4px);
                }

                /* Number animated gradient on card hover for active slide */
                .services-mobile-swiper .swiper-slide-active .card-container > a:hover div[class*="absolute top-6 right-6"] span:first-child {
                    opacity: 0;
                    transition: opacity 0.5s ease;
                }

                .services-mobile-swiper .swiper-slide-active .card-container > a:hover div[class*="absolute top-6 right-6"] span:last-child {
                    opacity: 1;
                    transition: opacity 0.5s ease;
                }

                /* Ensure card pointer on active slide */
                .services-mobile-swiper .swiper-slide-active .card-container > a[href] {
                    cursor: pointer;
                }

                /* Disable default card hover translate in swiper */
                .services-mobile-swiper .swiper-slide .card-container > a:hover {
                    transform: none !important;
                }

                /* ==========================================
                   3D TRANSFORMS & FADE (da 500px+)
                   ========================================== */

                /* Mobile Small (<500px): No effects */
                .services-mobile-swiper .card-container {
                    transition: all 0.5s ease;
                    opacity: 1;
                    transform: none;
                }

                /* Tablet+ (≥500px): Fade effect + 3D transforms */
                @media (min-width: 500px) {
                    .services-mobile-swiper .swiper-slide .card-container {
                        transform: scale(0.85) translateZ(-200px) rotateY(0deg);
                        opacity: 0.4;
                    }

                    .services-mobile-swiper .swiper-slide-active .card-container {
                        transform: scale(1) translateZ(0) rotateY(0deg);
                        opacity: 1;
                    }

                    .services-mobile-swiper .swiper-slide-prev .card-container {
                        transform: scale(0.85) translateZ(-200px) rotateY(15deg);
                    }

                    .services-mobile-swiper .swiper-slide-next .card-container {
                        transform: scale(0.85) translateZ(-200px) rotateY(-15deg);
                    }
                }

                /* ==========================================
                   ELEMENTI INTERNI - COLOR/OPACITY
                   ========================================== */

                /* Mobile Small (<500px): Always full opacity/color */
                .services-mobile-swiper .swiper-slide .service-number {
                    opacity: 1;
                    transition: opacity 0.5s ease;
                }
                .services-mobile-swiper .swiper-slide .service-title {
                    color: white;
                }
                .services-mobile-swiper .swiper-slide .service-subtitle {
                    color: rgb(34, 211, 238); /* text-cyan-400 */
                }

                /* Tablet+ (≥500px): Apply muted styles to inactive slides */
                @media (min-width: 500px) {
                    .services-mobile-swiper .swiper-slide .service-number {
                        opacity: 0.4;
                    }
                    .services-mobile-swiper .swiper-slide .service-title {
                        color: rgb(107, 114, 128); /* text-gray-500 */
                    }
                    .services-mobile-swiper .swiper-slide .service-subtitle {
                        color: rgb(75, 85, 99); /* text-gray-600 */
                    }

                    /* Restore full color/opacity for active slide */
                    .services-mobile-swiper .swiper-slide-active .service-number {
                        opacity: 1;
                    }
                    .services-mobile-swiper .swiper-slide-active .service-title {
                        color: white;
                    }
                    .services-mobile-swiper .swiper-slide-active .service-subtitle {
                        color: rgb(34, 211, 238); /* text-cyan-400 */
                    }
                }
            `}</style>
        </>
    );
};

export default NeuralServicesMobile;
