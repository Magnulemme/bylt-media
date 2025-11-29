import React, { useState, useEffect, useRef } from 'react';
import useQuantumScrollAnim from '../../hooks/useQuantumScrollAnim';
import { InfiniteMovingCards } from '../ui/infinite-moving-cards';

// Shared Portfolio Carousel using Infinite Moving Cards
const SharedPortfolioCarousel = ({ onHeightChange }) => {
    const sectionRef = useQuantumScrollAnim();
    const carouselRef = useRef(null);
    const scrollRef = useRef(null);
    const [carouselHeight, setCarouselHeight] = useState(0);
    const [isFixed, setIsFixed] = useState(true);
    const [scaleValue, setScaleValue] = useState(0.9);
    const [translateY, setTranslateY] = useState(0);

    useEffect(() => {
        const updateHeight = () => {
            if (carouselRef.current) {
                const height = carouselRef.current.offsetHeight;
                setCarouselHeight(height);
                if (onHeightChange) {
                    onHeightChange(height);
                }
            }
        };

        updateHeight();
        window.addEventListener('resize', updateHeight);
        return () => window.removeEventListener('resize', updateHeight);
    }, [onHeightChange]);

    // Calcola lo scale basato sul bottom della Hero e cambia da fixed a relative
    useEffect(() => {
        const handleScroll = () => {
            const heroSection = document.querySelector('[data-hero-section]');
            const wrapper = document.querySelector('.hero-carousel-wrapper');

            if (heroSection && carouselHeight > 0) {
                const heroRect = heroSection.getBoundingClientRect();
                const heroBottom = heroRect.bottom;

                // Calcola il range dello scroll
                // Start: quando heroBottom = window.innerHeight (bottom = 0 rispetto al viewport)
                // End: quando heroBottom = window.innerHeight - carouselHeight (intera altezza)
                const scrollStart = window.innerHeight;
                const scrollEnd = window.innerHeight - carouselHeight;
                const scrollRange = scrollStart - scrollEnd;

                // Calcola il progresso (0 = inizio, 1 = fine)
                const progress = Math.max(0, Math.min(1, (scrollStart - heroBottom) / scrollRange));

                // Interpola lo scale da 0.9 a 1
                const newScale = 0.9 + (progress * 0.1);
                setScaleValue(newScale);

                // Parallax: parte più in basso (+30%) e arriva a posizione normale (0)
                const newTranslateY = (1 - progress) * carouselHeight * 0.3;
                setTranslateY(newTranslateY);
            }

            if (wrapper) {
                const rect = wrapper.getBoundingClientRect();
                // Quando il bottom del wrapper raggiunge il bottom dello schermo, passa a relative
                setIsFixed(rect.bottom > window.innerHeight);
            }
        };

        // Usa sia scroll nativo che requestAnimationFrame per compatibilità con Lenis
        const checkScroll = () => {
            handleScroll();
            requestAnimationFrame(checkScroll);
        };

        const rafId = requestAnimationFrame(checkScroll);
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            cancelAnimationFrame(rafId);
            window.removeEventListener('scroll', handleScroll);
        };
    }, [carouselHeight]);

    const clientLogos = [
        { name: "Happy Logo", logo: "/images/logos/225x170_happy_logo.png" },
        { name: "BMW", logo: "/images/logos/bmv.png" },
        { name: "Fitness Client", logo: "/images/logos/clients_fitnes1.png" },
        { name: "Bella", logo: "/images/logos/clients-logo-bella.png" },
        { name: "Orehite", logo: "/images/logos/clients-logo-orehite.png" },
        { name: "Reshape", logo: "/images/logos/clients-reshapepng.png" },
        { name: "Nissan", logo: "/images/logos/nisan.png" },
        { name: "Parfium", logo: "/images/logos/partner-parfium.png" },
        { name: "Aroma", logo: "/images/logos/partners-aroma.png" },
        { name: "GoTo", logo: "/images/logos/partners-goto.png" },
        { name: "Peugeot", logo: "/images/logos/Peugeot-@2x.png" },
        { name: "Smart Tower", logo: "/images/logos/smart-tower.png" },
        { name: "SMC", logo: "/images/logos/smclogo.png" },
        { name: "Periodico", logo: "/images/logos/periodico.png" },
        { name: "The Place Hotel", logo: "/images/logos/theplace_logo-strapline_whiteplace-hotel-edinburgh.webp" }
    ];

    return (
        <>
            {/* Placeholder per mantenere lo spazio quando fixed */}
            {isFixed && <div style={{ height: carouselHeight }} />}

            <section
                ref={(el) => {
                    carouselRef.current = el;
                    scrollRef.current = el;
                    if (typeof sectionRef === 'function') {
                        sectionRef(el);
                    } else if (sectionRef) {
                        sectionRef.current = el;
                    }
                }}
                className="py-16 overflow-hidden quantum-anim"
                style={{
                    background: '#020617',
                    zIndex: 0,
                    position: isFixed ? 'fixed' : 'relative',
                    bottom: isFixed ? 0 : 'auto',
                    left: isFixed ? 0 : 'auto',
                    right: isFixed ? 0 : 'auto',
                    transform: `translateY(${translateY}px)`,
                    transition: 'transform 0.1s linear'
                }}
            >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section Title */}
                <div className="mb-8 flex items-center gap-3">
                    <span className="text-cyan-400 font-mono text-sm tracking-wide">
                        10+
                    </span>
                    <span className="text-white font-mono text-sm tracking-wide">
                        Trusted Clients
                    </span>
                    <span className="text-gray-500 font-mono text-sm tracking-wide">
                        [2025-2026]
                    </span>
                </div>

                {/* Infinite Moving Cards */}
                <div style={{ '--card-scale': scaleValue }}>
                    <InfiniteMovingCards
                        items={clientLogos}
                        direction="left"
                        speed="slow"
                        pauseOnHover={false}
                        className="py-4"
                    />
                </div>
            </div>
        </section>
        </>
    );
};

export default SharedPortfolioCarousel;
