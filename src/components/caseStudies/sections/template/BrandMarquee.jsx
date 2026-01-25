import React from 'react';
import { cn } from '@/lib/utils';
import { InfiniteMovingCards } from '@/components/ui/infinite-moving-cards';

const BrandMarquee = ({
    text = "BYLT IN ACTION",
    speed = "30s",
    reverse = false,
    className
}) => {
    // Render text with BYLT in gradient
    const renderText = (str) => {
        const parts = str.split(/(BYLT)/gi);
        return parts.map((part, i) =>
            /BYLT/i.test(part) ? (
                <span key={i} className="bg-linear-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                    {part}
                </span>
            ) : (
                <span key={i} className="text-white">{part}</span>
            )
        );
    };

    // Create items array for the marquee
    const items = [...Array(4)].map((_, idx) => ({ id: idx, text }));

    return (
        <div className={cn("mb-8 md:mb-12 px-4 pt-16", className)}>
            <div
                className="relative overflow-hidden py-6 md:py-10 rounded-2xl border border-slate-700"
                style={{
                    background: '#020617',
                    boxShadow: '6px 6px 0px rgba(34, 211, 238, 1)'
                }}
            >
                {/* Fade overlay left */}
                <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-linear-to-r from-[#020617] to-transparent z-10 pointer-events-none rounded-l-2xl" />

                {/* Fade overlay right */}
                <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-linear-to-l from-[#020617] to-transparent z-10 pointer-events-none rounded-r-2xl" />

                <InfiniteMovingCards
                    items={items}
                    direction={reverse ? "right" : "left"}
                    speed={speed}
                    pauseOnHover={false}
                    gap="gap-8 md:gap-16"
                    className="[mask-image:none]"
                    renderItem={(item) => (
                        <div className="flex items-center gap-8 md:gap-16 whitespace-nowrap">
                            <span className="heading-h1 font-black font-inter tracking-tight">
                                {renderText(item.text)}
                            </span>
                            <span className="text-cyan-500 heading-h2">✦</span>
                        </div>
                    )}
                />
            </div>
        </div>
    );
};

export default BrandMarquee;
