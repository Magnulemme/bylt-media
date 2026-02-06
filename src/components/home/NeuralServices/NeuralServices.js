import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { SectionIntro } from '../../ui/section-headers';
import CTASectionCard from '../../ui/CTASectionCard';
import { Card, CardNumber, CardIcon, CardContent, CardTitle, CardSubtitle, CardDescription, CardCapabilities } from '../../ui/service-slider';
import 'swiper/css';
import 'swiper/css/navigation';
import { useEffect, useRef, useState, useCallback } from 'react';
import { useProfiler } from '@/hooks/useProfiler';
import { SERVICES } from './constants';
import { SWIPER_STYLES } from './styles';
import ServiceImage from './ServiceImage';

const NeuralServices = () => {
    useProfiler('NeuralServices [Swiper]');
    const swiperRef = useRef(null);
    const containerRef = useRef(null);
    const transitionTimeoutRef = useRef(null);
    const [fadeBasedOnVisibility, setFadeBasedOnVisibility] = useState(false);
    const [fadeBasedOnTransition, setFadeBasedOnTransition] = useState(false);

    const shouldApplyFade = fadeBasedOnVisibility || fadeBasedOnTransition;

    // Check if cards overflow using active slide's adjacent cards as bounds
    const checkCardsVisibility = useCallback(() => {
        if (!containerRef.current) {
            console.log('[Visibility Check] No container ref');
            return;
        }

        const isCoverflowMode = window.innerWidth >= 500;
        if (!isCoverflowMode) {
            console.log('[Visibility Check] Not coverflow mode, disabling fade');
            setFadeBasedOnVisibility(false);
            return;
        }

        const container = containerRef.current;
        const containerRect = container.getBoundingClientRect();

        // Find adjacent slides using Swiper's CSS classes
        const prevSlide = container.querySelector('.swiper-slide-prev');
        const nextSlide = container.querySelector('.swiper-slide-next');

        console.log('[Visibility Check] Slides found:', {
            prevSlide: !!prevSlide,
            nextSlide: !!nextSlide
        });

        if (!prevSlide || !nextSlide) {
            console.log('[Visibility Check] Missing slides, disabling fade');
            setFadeBasedOnVisibility(false);
            return;
        }

        const prevRect = prevSlide.getBoundingClientRect();
        const nextRect = nextSlide.getBoundingClientRect();

        // Small tolerance for rounding errors
        const tolerance = 2;

        // Check if prev card's left edge overflows container's left
        const overflowsLeft = prevRect.left < containerRect.left - tolerance;
        // Check if next card's right edge overflows container's right
        const overflowsRight = nextRect.right > containerRect.right + tolerance;

        const hasOverflow = overflowsLeft || overflowsRight;

        console.log('[Visibility Check] Measurements:', {
            containerLeft: containerRect.left,
            containerRight: containerRect.right,
            prevSlideLeft: prevRect.left,
            nextSlideRight: nextRect.right,
            overflowsLeft,
            overflowsRight,
            hasOverflow
        });

        setFadeBasedOnVisibility(hasOverflow);
    }, []);

    useEffect(() => {
        checkCardsVisibility();
        window.addEventListener('resize', checkCardsVisibility);
        const timeoutId = setTimeout(checkCardsVisibility, 300);

        return () => {
            window.removeEventListener('resize', checkCardsVisibility);
            clearTimeout(timeoutId);
        };
    }, [checkCardsVisibility]);

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
            <div className="max-w-content mx-auto overflow-x-clip overflow-y-visible">
                <div className="relative overflow-visible -mx-4 md:mx-0">
                    {/* Navigation Buttons */}
                    <div className="service-slider-nav-mobile relative z-10 px-4">
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
                            maskImage: shouldApplyFade
                                ? (window.innerWidth >= 1200
                                    ? 'linear-gradient(to right, transparent, black 120px, black calc(100% - 120px), transparent)'
                                    : 'linear-gradient(to right, transparent, black 96px, black calc(100% - 96px), transparent)')
                                : 'none',
                            WebkitMaskImage: shouldApplyFade
                                ? (window.innerWidth >= 1200
                                    ? 'linear-gradient(to right, transparent, black 120px, black calc(100% - 120px), transparent)'
                                    : 'linear-gradient(to right, transparent, black 96px, black calc(100% - 96px), transparent)')
                                : 'none',
                            transition: 'mask-image 0.4s ease-out, -webkit-mask-image 0.4s ease-out'
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
                            onSlideChange={() => {
                                console.log('[Slide Change]');
                                if (window.innerWidth >= 500) {
                                    // Clear any existing timeout
                                    if (transitionTimeoutRef.current) {
                                        clearTimeout(transitionTimeoutRef.current);
                                    }

                                    // Attiva il fade durante la transizione
                                    setFadeBasedOnTransition(true);

                                    // Disattiva il fade dopo la durata della transizione (400ms + buffer)
                                    transitionTimeoutRef.current = setTimeout(() => {
                                        console.log('[Transition Complete]');
                                        setFadeBasedOnTransition(false);
                                        // Ricalcola la visibilità
                                        checkCardsVisibility();
                                    }, 500);
                                }
                            }}
                            className="services-3d-swiper"
                        >
                            {SERVICES.map((item, index) => (
                                <SwiperSlide key={`${item.id}-${index}`}>
                                    {({ isActive }) => (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <div
                                                className="service-slide-content h-full pb-2 pr-2"
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

            </div>

            {/* CTA Section */}
            <CTASectionCard
                title="Don't see exactly what you need?"
                description="We offer custom solutions tailored to your business goals."
                buttonText="Discuss Your Project"
                buttonHref="/contact"
                background="transparent"
                variant="soft"
            />

            <style jsx global>{SWIPER_STYLES}</style>
        </>
    );
};

export default NeuralServices;
