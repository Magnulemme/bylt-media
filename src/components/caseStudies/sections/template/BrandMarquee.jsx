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
        <div className={cn("px-3 md:px-(--margin-safe-x)", className)}>
            <div
                className="relative overflow-hidden py-2 md:py-4 rounded-2xl border border-slate-700"
                style={{
                    background: '#020617',
                    boxShadow: '6px 6px 0px rgba(34, 211, 238, 1)'
                }}
            >
                <InfiniteMovingCards
                    items={items}
                    direction={reverse ? "right" : "left"}
                    speed={speed}
                    pauseOnHover={false}
                    gap="gap-8 md:gap-16"
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
