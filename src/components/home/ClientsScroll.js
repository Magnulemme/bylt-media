import React, { useEffect, useRef, useState } from 'react';
import { InfiniteMovingCards } from '../ui/infinite-moving-cards';

const ClientsScroll = () => {
    const sectionRef = useRef(null);
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            if (!sectionRef.current) return;

            const section = sectionRef.current;
            const rect = section.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            // Calcola quando la sezione entra in viewport
            // 0 = fuori schermo in basso, 1 = completamente visibile
            const start = windowHeight;
            const end = windowHeight * 0.3;

            if (rect.top <= start && rect.top >= end) {
                const progress = 1 - (rect.top - end) / (start - end);
                setScrollProgress(Math.min(Math.max(progress, 0), 1));
            } else if (rect.top < end) {
                setScrollProgress(1);
            } else {
                setScrollProgress(0);
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Check initial position

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

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

    // Solo scale per l'effetto parallax
    const scale = 0.85 + (scrollProgress * 0.15); // da 0.85 a 1

    return (
        <section
            ref={sectionRef}
            className="relative py-20 overflow-hidden"
            style={{
                background: 'linear-gradient(180deg, #020617 0%, #0f172a 50%, #1e1b4b 100%)',
            }}
        >
            {/* Background effects */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: 'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.1), transparent 70%)',
                }}
            ></div>

            <div
                className="relative z-10 max-w-content mx-auto px-4 sm:px-6 lg:px-8"
                style={{
                    transform: `scale(${scale})`,
                    willChange: 'transform'
                }}
            >
                {/* Infinite Moving Cards */}
                <InfiniteMovingCards
                    items={clientLogos}
                    direction="left"
                    speed="slow"
                    pauseOnHover={true}
                    className="py-8"
                />
            </div>

            {/* Bottom gradient */}
            <div
                className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
                style={{
                    background: 'linear-gradient(to bottom, transparent, #1e1b4b)',
                }}
            ></div>
        </section>
    );
};

export default ClientsScroll;
