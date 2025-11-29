import React, { useState, useEffect } from 'react';
import QuantumHeroAnimation from './QuantumHeroAnimation';
import SpinningBorderButton from '../ui/spinning-border-button';
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
    const texts = [
        "Digital Futures",
        "Performance",
        "AI Solutions",
        "Growth"
    ];

    const displayText = useTypingEffect(texts, 120, 60, 2500);

    return (
        <section
            id="home"
            className="relative h-screen flex items-center justify-center overflow-hidden hero-section"
            style={{
                background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #312e81 100%)',
                willChange: 'transform',
                contain: 'layout style'
            }}
        >
            {/* Gradient overlay */}
            <div
                className="absolute inset-0 z-10 pointer-events-none"
                style={{
                    background: 'radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.15), transparent 50%), radial-gradient(circle at 80% 50%, rgba(168, 85, 247, 0.15), transparent 50%)',
                    contain: 'paint'
                }}
            ></div>

            <div className="relative z-20 w-full max-w-7xl mx-auto px-4 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    {/* Left side - Text content */}
                    <div className="text-white">
                        <div className="text-xs tracking-wider text-cyan-400 mb-6 font-mono opacity-80">
                            {'{ system: "bylt.media", status: "online" }'}
                        </div>

                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-inter mb-1">
                            <div className="text-white mb-2">
                                We Build
                            </div>
                            <div className="min-h-[80px] md:min-h-[100px] lg:min-h-[120px] whitespace-nowrap py-2 pb-8 text-italic" style={{ lineHeight: '1.2' }}>
                                <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animated-gradient">
                                    {displayText}
                                    <span
                                        className="typing-cursor"
                                        style={{
                                            display: 'inline-block',
                                            width: '4px',
                                            height: '0.9em',
                                            backgroundColor: '#60a5fa',
                                            marginLeft: '4px',
                                            animation: 'blink 1s step-end infinite',
                                            verticalAlign: 'baseline',
                                            transform: 'translateY(0.1em)'
                                        }}
                                    ></span>
                                </span>
                            </div>
                        </h1>

                        <div className="max-w-xl mb-12">
                            <p className="text-base md:text-lg font-mono text-zinc-300 italic max-w-[400px] md:max-w-[550px]">
                                <span className="text-cyan-500">//</span> A future-forward digital agency driving growth through performance marketing, data-driven strategy, and bespoke AI solutions.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 pt-4 items-center">
                            <SpinningBorderButton href="/free-audit">
                                {(isHovered) => isHovered ? <EncryptedText text="Get Free Audit" /> : 'Get Free Audit'}
                            </SpinningBorderButton>
                            <a
                                href="#services"
                                className="group inline-flex h-16 items-center justify-center rounded-full border border-gray-600 hover:border-gray-500 bg-transparent px-10 text-base font-semibold font-mono text-white hover:bg-white/5 transition-all duration-300"
                            >
                                <span className="group-hover:hidden">Explore Services</span>
                                <span className="hidden group-hover:inline"><EncryptedText text="Explore Services" /></span>
                            </a>
                        </div>
                    </div>

                    {/* Right side - 3D Animation */}
                    <div className="relative h-[500px] lg:h-[600px] hidden lg:block">
                        <div className="absolute inset-0">
                            <QuantumHeroAnimation />
                        </div>
                    </div>
                </div>
            </div>

            <div
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
                style={{
                    willChange: 'transform',
                    contain: 'layout style paint'
                }}
            >
                <div className="quantum-scroll-indicator">
                    <div className="scroll-quantum-dot"></div>
                </div>
            </div>
        </section>
    );
};

export default FuturisticHero;
