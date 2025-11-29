import React, { useState, useEffect, useRef } from 'react';
import useQuantumScrollAnim from '../../hooks/useQuantumScrollAnim';

// Optimized 3D Portfolio Carousel with reduced complexity and improved performance
const SharedPortfolioCarousel = () => {
    const sectionRef = useQuantumScrollAnim();
    const [isDragging, setIsDragging] = useState(false);
    const [isHovered, setIsHovered] = useState(false); // Add hover state for pause functionality
    const [dragOffset, setDragOffset] = useState(0);
    const carouselRef = useRef(null);
    const animationRef = useRef(null);
    const startDragRef = useRef(0);
    const currentOffsetRef = useRef(0);
    const lastFrameTime = useRef(0);

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

    // Create infinite array by tripling logos for seamless infinite scroll
    const infiniteLogos = [...clientLogos, ...clientLogos, ...clientLogos];

    // Calculate the width of one complete set of logos for infinite loop reset
    const logoSetWidth = clientLogos.length * (160 + 32); // 160px width + 2rem gap (32px)

    useEffect(() => {
        if (!isDragging && !isHovered) { // Only animate when not dragging and not hovered
            // Optimized auto-scroll animation with proper infinite loop
            const animate = (currentTime) => {
                // Throttle to ~60fps for better performance
                if (currentTime - lastFrameTime.current < 16.67) {
                    animationRef.current = requestAnimationFrame(animate);
                    return;
                }
                lastFrameTime.current = currentTime;

                currentOffsetRef.current += 0.5; // Consistent smooth speed

                // Reset position when we've scrolled past one complete set
                if (currentOffsetRef.current >= logoSetWidth) {
                    currentOffsetRef.current = 0;
                }

                setDragOffset(currentOffsetRef.current);
                animationRef.current = requestAnimationFrame(animate);
            };
            animationRef.current = requestAnimationFrame(animate);
        }

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [isDragging, isHovered, logoSetWidth]); // Add isHovered to dependencies

    const handleMouseDown = (e) => {
        e.preventDefault();
        setIsDragging(true);
        startDragRef.current = e.pageX;
        if (animationRef.current) {
            cancelAnimationFrame(animationRef.current);
        }
        document.body.style.cursor = 'grabbing';
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const deltaX = e.pageX - startDragRef.current;
        currentOffsetRef.current -= deltaX * 1.0; // Adjusted sensitivity for better control

        // Keep the offset within bounds for infinite loop
        if (currentOffsetRef.current < 0) {
            currentOffsetRef.current += logoSetWidth;
        } else if (currentOffsetRef.current >= logoSetWidth) {
            currentOffsetRef.current -= logoSetWidth;
        }

        setDragOffset(currentOffsetRef.current);
        startDragRef.current = e.pageX;
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        document.body.style.cursor = '';
    };

    const handleTouchStart = (e) => {
        setIsDragging(true);
        startDragRef.current = e.touches[0].pageX;
        if (animationRef.current) {
            cancelAnimationFrame(animationRef.current);
        }
    };

    const handleTouchMove = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const deltaX = e.touches[0].pageX - startDragRef.current;
        currentOffsetRef.current -= deltaX * 1.0; // Consistent with mouse sensitivity

        // Keep the offset within bounds for infinite loop
        if (currentOffsetRef.current < 0) {
            currentOffsetRef.current += logoSetWidth;
        } else if (currentOffsetRef.current >= logoSetWidth) {
            currentOffsetRef.current -= logoSetWidth;
        }

        setDragOffset(currentOffsetRef.current);
        startDragRef.current = e.touches[0].pageX;
    };

    const handleTouchEnd = () => {
        setIsDragging(false);
    };

    useEffect(() => {
        const handleGlobalMouseMove = (e) => handleMouseMove(e);
        const handleGlobalMouseUp = () => handleMouseUp();
        const handleGlobalTouchMove = (e) => handleTouchMove(e);
        const handleGlobalTouchEnd = () => handleTouchEnd();

        if (isDragging) {
            document.addEventListener('mousemove', handleGlobalMouseMove, { passive: false });
            document.addEventListener('mouseup', handleGlobalMouseUp, { passive: true });
            document.addEventListener('touchmove', handleGlobalTouchMove, { passive: false });
            document.addEventListener('touchend', handleGlobalTouchEnd, { passive: true });
        }

        return () => {
            document.removeEventListener('mousemove', handleGlobalMouseMove);
            document.removeEventListener('mouseup', handleGlobalMouseUp);
            document.removeEventListener('touchmove', handleGlobalTouchMove);
            document.removeEventListener('touchend', handleGlobalTouchEnd);
        };
    }, [isDragging]);

    return (
        <section
            ref={sectionRef}
            className="py-12 bg-slate-900/30 relative overflow-hidden quantum-anim"
            style={{
                willChange: 'transform',
                contain: 'layout style paint'
            }}
        >
            <div
                className="absolute inset-0 carousel-bg-pattern"
                style={{ contain: 'paint' }}
            ></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-4">
                    <div className="section-title-container">
                        <h2 className="section-title-enhanced">
                            Our Shared Customer Portfolio
                        </h2>
                        <div className="title-accent-line"></div>
                    </div>
                    <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
                        Trusted clients across industries, delivered through our strategic partnership with Marketise Me
                    </p>
                </div>

                <div
                    className="carousel-3d-container"
                    ref={carouselRef}
                    style={{
                        willChange: 'transform',
                        contain: 'layout style'
                    }}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <div className="carousel-track-wrapper">
                        <div
                            className={`carousel-horizontal-track ${isDragging ? 'dragging' : ''}`}
                            style={{
                                transform: `translate3d(${-dragOffset}px, 0, 0)`, // Use translate3d for hardware acceleration
                                cursor: isDragging ? 'grabbing' : 'grab',
                                willChange: 'transform',
                                contain: 'layout style'
                            }}
                            onMouseDown={handleMouseDown}
                            onTouchStart={handleTouchStart}
                        >
                            {infiniteLogos.map((client, index) => (
                                <div
                                    key={`${client.name}-${index}`}
                                    className="logo-card"
                                    style={{
                                        willChange: 'transform',
                                        contain: 'layout style paint'
                                    }}
                                >
                                    <div className="logo-inner">
                                        <img
                                            src={client.logo}
                                            alt={client.name}
                                            className="logo-image"
                                            draggable={false}
                                            loading="lazy" // Add lazy loading for performance
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .carousel-bg-pattern {
                    background:
                        radial-gradient(circle at 25% 25%, rgba(184, 255, 250, 0.03) 0%, transparent 60%),
                        radial-gradient(circle at 75% 75%, rgba(184, 255, 250, 0.02) 0%, transparent 60%),
                        linear-gradient(135deg, rgba(30, 41, 59, 0.05) 0%, transparent 100%);
                    animation: patternFlow 30s ease-in-out infinite;
                }

                @keyframes patternFlow {
                    0%, 100% { transform: translate3d(0, 0, 0) scale3d(1, 1, 1); }
                    33% { transform: translate3d(10px, -5px, 0) scale3d(1.01, 1.01, 1); }
                    66% { transform: translate3d(-8px, 8px, 0) scale3d(0.99, 0.99, 1); }
                }

                .carousel-3d-container {
                    position: relative;
                    height: 180px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 1rem 0;
                    overflow: hidden;
                    cursor: grab;
                }

                .carousel-3d-container:active {
                    cursor: grabbing;
                }

                .carousel-track-wrapper {
                    width: 100%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: flex-start;
                    perspective: 1000px;
                    overflow: hidden;
                }

                .carousel-horizontal-track {
                    display: flex;
                    gap: 2rem;
                    height: 150px;
                    align-items: center;
                    user-select: none;
                    width: fit-content;
                    transition: transform 0.1s ease-out;
                }

                .carousel-horizontal-track.dragging {
                    cursor: grabbing;
                    transition: none;
                }

                .logo-card {
                    flex-shrink: 0;
                    width: 160px;
                    height: 120px;
                    transform-style: preserve-3d;
                    transition: transform 0.2s ease;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .logo-card:hover {
                    transform: translate3d(0, -5px, 0) rotateY(2deg) scale3d(1.02, 1.02, 1);
                }

                .logo-inner {
                    width: 100%;
                    height: 100%;
                    position: relative;
                    background: rgba(30, 41, 59, 0.8);
                    border: 2px solid rgba(75, 85, 99, 0.4);
                    border-radius: 20px;
                    backdrop-filter: blur(10px);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.2s ease;
                    overflow: hidden;
                    box-shadow:
                        0 4px 16px rgba(0, 0, 0, 0.2),
                        inset 0 1px 0 rgba(255, 255, 255, 0.1);
                }

                .logo-card:hover .logo-inner {
                    background: rgba(30, 41, 59, 0.95);
                    border-color: rgba(184, 255, 250, 0.4);
                    box-shadow:
                        0 8px 24px rgba(0, 0, 0, 0.3),
                        0 0 15px rgba(184, 255, 250, 0.1),
                        inset 0 1px 0 rgba(255, 255, 255, 0.2);
                }

                .logo-image {
                    max-width: 80%;
                    max-height: 70%;
                    width: auto;
                    height: auto;
                    object-fit: contain;
                    object-position: center;
                    filter: grayscale(30%) brightness(1.1) contrast(1.1);
                    transition: all 0.2s ease;
                    z-index: 2;
                    position: relative;
                }

                .logo-card:hover .logo-image {
                    filter: grayscale(0%) brightness(1.2) contrast(1.2);
                    transform: scale3d(1.05, 1.05, 1);
                }

                @media (max-width: 768px) {
                    .carousel-3d-container {
                        height: 200px;
                        margin: 2rem 0;
                    }

                    .logo-card {
                        width: 140px;
                        height: 110px;
                    }

                    .carousel-horizontal-track {
                        height: 140px;
                        gap: 1.5rem;
                    }
                }

                @media (max-width: 480px) {
                    .carousel-3d-container {
                        height: 180px;
                        margin: 1.5rem 0;
                    }

                    .logo-card {
                        width: 120px;
                        height: 95px;
                    }

                    .carousel-horizontal-track {
                        height: 120px;
                        gap: 1rem;
                    }
                }
            `}</style>
        </section>
    );
};

export default SharedPortfolioCarousel;
