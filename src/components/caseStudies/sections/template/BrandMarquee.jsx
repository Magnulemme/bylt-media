import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

const BrandMarquee = ({
    text = "BYLT IN ACTION",
    speed = "30s",
    reverse = false,
    className
}) => {
    const containerRef = useRef(null);
    const scrollerRef = useRef(null);
    const [start, setStart] = useState(false);

    useEffect(() => {
        if (containerRef.current && scrollerRef.current) {
            const scrollerContent = Array.from(scrollerRef.current.children);

            // Duplicate content for seamless loop
            for (let i = 0; i < 5; i++) {
                scrollerContent.forEach((item) => {
                    const duplicatedItem = item.cloneNode(true);
                    scrollerRef.current.appendChild(duplicatedItem);
                });
            }

            containerRef.current.style.setProperty("--animation-duration", speed);
            containerRef.current.style.setProperty("--animation-direction", reverse ? "reverse" : "forwards");
            setStart(true);
        }
    }, [speed, reverse]);

    return (
        <div className={cn("mb-8 md:mb-12 px-4 pt-16", className)} >
            <div
                ref={containerRef}
                className="scroller relative overflow-hidden py-6 md:py-10 rounded-2xl border border-slate-700"
                style={{
                    background: '#020617',
                    boxShadow: '6px 6px 0px rgba(34, 211, 238, 1)'
                }}
            >
                {/* Fade overlay left */}
                <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-[#020617] to-transparent z-10 pointer-events-none rounded-l-2xl" />

                {/* Fade overlay right */}
                <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-[#020617] to-transparent z-10 pointer-events-none rounded-r-2xl" />

                <div
                    ref={scrollerRef}
                    className={cn(
                        "flex flex-nowrap gap-8 md:gap-16 whitespace-nowrap px-8",
                        start && "animate-scroll"
                    )}
                >
                    {[...Array(4)].map((_, idx) => (
                        <div key={idx} className="flex items-center gap-8 md:gap-16 shrink-0">
                            <span className="heading-h1 font-black font-inter tracking-tight text-white">
                                {text}
                            </span>
                            <span className="text-cyan-500 heading-h2">✦</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BrandMarquee;
