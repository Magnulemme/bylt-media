import React, { useState, useEffect } from 'react';
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
    const texts = [
        "Digital Futures",
        "Performance",
        "AI Solutions",
        "Growth"
    ];

    const displayText = useTypingEffect(texts, 120, 60, 2500);

    // Alternating text with EncryptedText component
    const cryptoTexts = ['x² + y² + z² = r²', 'Scroll to explore ↓'];
    const [currentCryptoIndex, setCurrentCryptoIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentCryptoIndex((prev) => (prev + 1) % cryptoTexts.length);
        }, 4000);

        return () => clearInterval(interval);
    }, []);

    return (
        <section
            id="home"
            className="relative h-screen flex items-center justify-center overflow-hidden hero-section p-4 pt-20"
            data-hero-section
            style={{
                background: '#020617',
                zIndex: 10
            }}
        >
            <div
                className="relative h-full w-full rounded-2xl flex items-center justify-center overflow-hidden"
                style={{
                    background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #312e81 100%)',
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
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left side - Text content */}
                    <div className="text-white space-y-8">
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-inter">
                            <div className="text-white mb-4">
                                We Build
                            </div>
                            <div className="min-h-[80px] md:min-h-[100px] lg:min-h-[120px] whitespace-nowrap text-italic" style={{ lineHeight: '1.2' }}>
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

                        <div className="max-w-xl hidden lg:block">
                            <fieldset
                                className="border-2 border-white/30 p-6 bg-white/5 backdrop-blur-sm rounded-lg"
                                style={{
                                    boxShadow: '8px 8px 0px rgba(34, 211, 238, 0.8)'
                                }}
                            >
                                <legend className="px-2 text-base text-white font-semibold tracking-wide">
                                    The Formula
                                </legend>
                                <p className="text-base text-gray-400 leading-relaxed">
                                    A future-forward digital agency driving growth through <span className="font-semibold text-white">performance marketing</span>, <span className="font-semibold text-white">data-driven strategy</span>, and <span className="font-semibold text-white">bespoke AI solutions</span>.
                                </p>
                            </fieldset>
                        </div>

                        {/* Desktop CTAs */}
                        <div className="hidden lg:flex flex-row gap-4 pt-8">
                            <a
                                href="/free-audit"
                                className="inline-flex h-14 items-center justify-center rounded-lg border border-cyan-500/50 bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-600 bg-[length:200%_200%] animate-gradient px-8 text-base font-semibold text-white transition-transform duration-300 hover:translate-y-[-2px] hover:shadow-lg hover:shadow-cyan-500/50"
                            >
                                Get Free Audit
                            </a>
                            <a
                                href="#services"
                                className="group inline-flex h-14 items-center justify-center gap-2 rounded-lg border border-white/20 hover:border-white/40 bg-white/5 hover:bg-white/10 px-8 text-base font-semibold text-white transition-all duration-300 backdrop-blur-sm hover:translate-y-[-2px]"
                            >
                                <span>Explore Services</span>
                                <span className="text-cyan-400 transition-transform duration-300 group-hover:translate-x-1">→</span>
                            </a>
                        </div>

                        {/* Mobile CTAs and description */}
                        <div className="lg:hidden space-y-6">
                            <div className="flex flex-col sm:flex-row gap-4">
                                <a
                                    href="/free-audit"
                                    className="inline-flex h-14 items-center justify-center rounded-lg border border-cyan-500/50 bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-600 bg-[length:200%_200%] animate-gradient px-8 text-base font-semibold text-white transition-transform duration-300 hover:shadow-lg hover:shadow-cyan-500/50"
                                >
                                    Get Free Audit
                                </a>
                                <a
                                    href="#services"
                                    className="group inline-flex h-14 items-center justify-center gap-2 rounded-lg border border-white/20 hover:border-white/40 bg-white/5 hover:bg-white/10 px-8 text-base font-semibold text-white transition-all duration-300 backdrop-blur-sm"
                                >
                                    <span>Explore Services</span>
                                    <span className="text-cyan-400 transition-transform duration-300 group-hover:translate-x-1">→</span>
                                </a>
                            </div>
                            <div className="max-w-xl">
                                <fieldset
                                    className="border-2 border-white/30 p-6 bg-white/5 backdrop-blur-sm rounded-lg"
                                    style={{
                                        boxShadow: '8px 8px 0px rgba(34, 211, 238, 0.8)'
                                    }}
                                >
                                    <legend className="px-2 text-base text-white font-semibold tracking-wide">
                                        The Formula
                                    </legend>
                                    <p className="text-base text-gray-400 leading-relaxed">
                                        A future-forward digital agency driving growth through <span className="font-semibold text-white">performance marketing</span>, <span className="font-semibold text-white">data-driven strategy</span>, and <span className="font-semibold text-white">bespoke AI solutions</span>.
                                    </p>
                                </fieldset>
                            </div>
                        </div>
                    </div>

                    {/* Right side - 3D Data Visualization */}
                    <div className="relative h-[500px] lg:h-[600px] hidden lg:block">
                        <div className="absolute top-0 right-0 text-sm tracking-wide z-10">
                            <span className="text-cyan-400 font-mono">f(BYLT.Media) = Your Tech & Marketing Solution</span>
                        </div>
                        <div className="absolute inset-x-0 top-6 bottom-0">
                            <DataVisualization3D />
                        </div>
                        <div className="absolute bottom-0 left-0 text-sm z-10">
                            <EncryptedText
                                text={cryptoTexts[currentCryptoIndex]}
                                className="text-white/60 font-mono"
                            />
                        </div>
                     </div>
                </div>
            </div>
            </div>
        </section>
    );
};

export default FuturisticHero;
