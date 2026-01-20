import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { SectionIntro } from '../../ui/section-headers';
import { MovingBorderButton } from '../../ui/moving-border-button';
import { Card, CardNumber, CardIcon, CardContent, CardTitle, CardSubtitle, CardDescription, CardCapabilities } from '../../ui/service-slider';
import 'swiper/css';
import 'swiper/css/navigation';
import { useEffect, useRef, useState } from 'react';
import { useProfiler } from '@/hooks/useProfiler';
import { SERVICES } from './constants';
import { SWIPER_STYLES } from './styles';
import ServiceImage from './ServiceImage';

const NeuralServices = () => {
    useProfiler('NeuralServices [Swiper]');
    const swiperRef = useRef(null);
    const containerRef = useRef(null);
    const lastCardRef = useRef(null);
    const [allCardsVisible, setAllCardsVisible] = useState(false);
    const [shouldApplyFade, setShouldApplyFade] = useState(false);

    // Check if all cards are visible
    useEffect(() => {
        const checkCardsVisibility = () => {
            if (!containerRef.current || !lastCardRef.current) return;

            const containerRect = containerRef.current.getBoundingClientRect();
            const lastCardRect = lastCardRef.current.getBoundingClientRect();
            const lastCardVisible = lastCardRect.left >= containerRect.left - 8 - 2;

            setAllCardsVisible(lastCardVisible);

            const isCoverflowMode = window.innerWidth >= 500;
            const isDesktop = window.innerWidth >= 1200;
            const shouldFade = isCoverflowMode && (isDesktop ? !lastCardVisible : true);

            setShouldApplyFade(shouldFade);
        };

        checkCardsVisibility();
        window.addEventListener('resize', checkCardsVisibility);
        const timeoutId = setTimeout(checkCardsVisibility, 300);

        return () => {
            window.removeEventListener('resize', checkCardsVisibility);
            clearTimeout(timeoutId);
        };
    }, []);

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
            <div className="max-w-content mx-auto overflow-x-clip overflow-y-hidden">
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
                            loopedSlides={SERVICES.length}
                            loopPreventsSliding={false}
                            speed={400}
                            watchSlidesProgress={true}
                            preloadImages={false}
                            lazy={{
                                enabled: false
                            }}
                            navigation={{
                                nextEl: '.swiper-button-next-services',
                                prevEl: '.swiper-button-prev-services',
                            }}
                            onSwiper={(swiper) => {
                                swiperRef.current = swiper;
                            }}
                            className="services-3d-swiper pb-8"
                        >
                            {SERVICES.map((item, index) => (
                                <SwiperSlide key={`${item.id}-${index}`}>
                                    {({ isActive }) => (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <div
                                                ref={index === SERVICES.length - 1 ? lastCardRef : null}
                                                className="service-slide-content h-full"
                                                onClick={() => {
                                                    if (!isActive && swiperRef.current) {
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
                                                            <ServiceImage src={item.image} alt={item.title} />
                                                        )}
                                                        {item.capabilities && item.capabilities.length > 0 && (
                                                            <CardCapabilities capabilities={item.capabilities} />
                                                        )}
                                                        {item.ctaText && item.ctaHref && (
                                                            <span className="group/cta inline-flex items-center gap-2 text-body-sm font-semibold text-white transition-colors duration-300 mt-4">
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

                {/* CTA Section */}
                <div className="services-bottom-cta-section">
                    <div className="services-bottom-cta-content">
                        <p className="text-body-lg">
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

            <style jsx global>{SWIPER_STYLES}</style>
        </>
    );
};

export default NeuralServices;
