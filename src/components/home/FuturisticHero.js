import React, { useState, useEffect, useMemo, useRef } from 'react';
import DataVisualization3D from './DataVisualization3D';
import { EncryptedText } from '../ui/encrypted-text';

// Realistic typing effect hook with variable speed
const useTypingEffect = (texts, baseTypingSpeed = 100, deletingSpeed = 50, pauseTime = 2500) => {
    const [displayText, setDisplayText] = useState('');
    const [textIndex, setTextIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [charIndex, setCharIndex] = useState(0);

    useEffect(() => {
        const currentText = texts[textIndex];

        // Variable typing speed for more realistic effect
        const getTypingSpeed = () => {
            // Random variation to simulate human typing
            const variation = Math.random() * 60 - 30; // -30 to +30ms variation
            return baseTypingSpeed + variation;
        };

        const timer = setTimeout(() => {
            if (!isDeleting) {
                // Typing
                if (charIndex < currentText.length) {
                    setDisplayText(currentText.substring(0, charIndex + 1));
                    setCharIndex(charIndex + 1);
                } else {
                    // Pause before deleting
                    setTimeout(() => setIsDeleting(true), pauseTime);
                }
            } else {
                // Deleting
                if (charIndex > 0) {
                    setDisplayText(currentText.substring(0, charIndex - 1));
                    setCharIndex(charIndex - 1);
                } else {
                    setIsDeleting(false);
                    setTextIndex((textIndex + 1) % texts.length);
                }
            }
        }, isDeleting ? deletingSpeed : getTypingSpeed());

        return () => clearTimeout(timer);
    }, [charIndex, isDeleting, textIndex, texts, baseTypingSpeed, deletingSpeed, pauseTime]);

    return displayText;
};

// Optimized Hero Section with typing effect and side-by-side layout
const FuturisticHero = () => {
    // Memoize texts array to prevent recreation
    const texts = useMemo(() => [
        "Digital Futures",
        "Performance",
        "AI Solutions",
        "Growth"
    ], []);

    const displayText = useTypingEffect(texts, 120, 60, 2500);

    // Memoize crypto texts array to prevent recreation on every render
    const cryptoTexts = useMemo(() => ['x² + y² + z² = r²', 'Scroll to explore ↓'], []);
    const [currentCryptoIndex, setCurrentCryptoIndex] = useState(0);
    const [isScrolled, setIsScrolled] = useState(false);

    // Use ref to store interval ID for proper cleanup
    const cryptoIntervalRef = useRef(null);

    useEffect(() => {
        cryptoIntervalRef.current = setInterval(() => {
            setCurrentCryptoIndex((prev) => (prev + 1) % cryptoTexts.length);
        }, 4000);

        return () => {
            if (cryptoIntervalRef.current) {
                clearInterval(cryptoIntervalRef.current);
            }
        };
    }, [cryptoTexts.length]);

    // Scroll listener to hide the scroll indicator
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50 && !isScrolled) {
                setIsScrolled(true);
            } else if (window.scrollY <= 50 && isScrolled) {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isScrolled]);

    // Memoize EncryptedText to avoid recalculation on every render
    const encryptedTextComponent = useMemo(() => (
        <EncryptedText
            text={cryptoTexts[currentCryptoIndex]}
            className="text-white/60 font-mono"
        />
    ), [cryptoTexts, currentCryptoIndex]);

    return (
        <section
            id="home"
            className="hero-section"
            data-hero-section
            style={{
                background: '#020617',
                zIndex: 10
            }}
        >
            <div className="hero-inner bg-hero">
                {/* Gradient overlay */}
                <div className="gradient-overlay"></div>

                {/* Section Header - Mobile & Tablet - Absolute positioned */}
                <div className="absolute top-12 right-6 sm:right-8 md:right-12 z-30 lg:hidden">
                    <div className="flex items-center gap-3">
                        <span className="text-cyan-400 font-mono text-sm tracking-wide">
                            1)
                        </span>
                        <span className="text-white font-mono text-sm tracking-wide">
                            Your Solution
                        </span>
                        <span className="text-gray-500 font-mono text-sm tracking-wide">
                            [Tech & Marketing]
                        </span>
                    </div>
                </div>

                {/* Scroll Indicator - Mobile (if viewport tall enough), Tablet - Absolute positioned */}
                <div className={`encrypted-scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2 z-30 transition-opacity duration-500 ${isScrolled ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                    {encryptedTextComponent}
                </div>

                <div className="container-centered">
                <div className="hero-grid">
                    {/* Left side - Text content */}
                    <div className="hero-content">
                        <h1 className="hero-title font-inter relative z-20">
                            <div className="text-white mb-6 md:mb-4">
                                We Build
                            </div>
                            <div className="animated-text-container">
                                <span className="text-gradient animated-gradient">
                                    {displayText}
                                    <span className="typing-cursor"></span>
                                </span>
                            </div>
                        </h1>

                        {/* Description - Mobile & Tablet */}
                        <div className="lg:hidden relative w-full max-w-md md:max-w-lg mx-auto space-y-8 md:space-y-10">
                            {/* 3D Sphere as background */}
                            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] opacity-40 pointer-events-none">
                                <DataVisualization3D />
                            </div>

                            {/* Description Text */}
                            <p className="relative z-10 text-base md:text-lg text-gray-300 leading-relaxed text-center max-w-lg mx-auto">
                                A future-forward digital agency driving growth through <span className="font-semibold text-white">performance marketing</span>, <span className="font-semibold text-white">data-driven strategy</span>, and <span className="font-semibold text-white">bespoke AI solutions</span>.
                            </p>

                            {/* CTAs - Mobile & Tablet */}
                            <div className="pt-8 flex flex-col gap-10 relative z-10 md:max-w-sm md:mx-auto items-center">
                                <a
                                    href="/free-audit"
                                    className="brutalist-button w-full"
                                >
                                    <span>Get Free Audit</span>
                                </a>
                                <a
                                    href="#services"
                                    className="group/cta inline-flex items-center gap-2 text-base font-semibold text-white hover:text-cyan-400 transition-colors duration-300"
                                >
                                    <span>Explore Services</span>
                                    <span className="transition-transform duration-300 group-hover/cta:translate-x-1">→</span>
                                </a>
                            </div>
                        </div>

                        {/* Description - Desktop only */}
                        <p className="hidden lg:block text-lg text-gray-300 leading-relaxed max-w-xl">
                            A future-forward digital agency driving growth through <span className="font-semibold text-white">performance marketing</span>, <span className="font-semibold text-white">data-driven strategy</span>, and <span className="font-semibold text-white">bespoke AI solutions</span>.
                        </p>

                        {/* CTAs - Desktop */}
                        <div className="hidden lg:flex flex-row items-center gap-16 pt-8">
                            <a href="/free-audit" className="brutalist-button">
                                <span>Get Free Audit</span>
                            </a>
                            <a
                                href="#services"
                                className="group/cta inline-flex items-center gap-2 text-base font-semibold text-white hover:text-cyan-400 transition-colors duration-300"
                            >
                                <span>Explore Services</span>
                                <span className="transition-transform duration-300 group-hover/cta:translate-x-1">→</span>
                            </a>
                        </div>
                    </div>

                    {/* Right side - 3D Data Visualization - Desktop only */}
                    <div className="hidden lg:block relative h-[600px]">
                        <div className="absolute top-0 right-0 text-sm tracking-wide z-10">
                            <div className="flex items-center gap-3">
                                <span className="text-cyan-400 font-mono tracking-wide">
                                    1)
                                </span>
                                <span className="text-white font-mono tracking-wide">
                                    Your Solution
                                </span>
                                <span className="text-gray-500 font-mono tracking-wide">
                                    [Tech & Marketing]
                                </span>
                            </div>
                        </div>
                        <div className="absolute inset-x-0 top-6 bottom-0">
                            <DataVisualization3D />
                        </div>
                    </div>
                </div>
            </div>
            </div>

            {/* Scroll Indicator - Desktop - Ancorato a hero-section */}
            <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 text-sm z-30 hidden lg:block transition-opacity duration-500 ${isScrolled ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                {encryptedTextComponent}
            </div>
        </section>
    );
};

export default FuturisticHero;
