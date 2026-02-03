"use client";
import React from 'react';
import { motion } from 'motion/react';
import { DitherShader } from './dither-shader';
import { useQuoteImage } from '@/components/services/hooks';

// Logo mapping for testimonial authors
const authorLogos = {
    'Nissan': '/images/logos/nisan.png',
    'Happy Bar & Grill': '/images/logos/225x170_happy_logo.png',
    'Peugeot': '/images/logos/Peugeot-@2x.png',
    'Smart Consultants': '/images/logos/smclogo.png',
    'Napudreni': '/images/logos/clients-reshapepng.png',
};

/**
 * QuoteCard - Reusable quote/testimonial component BYLT style
 *
 * @param {string} quote - The quote text
 * @param {string} author - Author name
 * @param {string} role - Author role/position
 * @param {string} company - Company name (optional)
 * @param {string} logo - Logo URL (optional, overrides authorLogos lookup)
 * @param {boolean} showIcon - Show quote icon (default: true)
 * @param {boolean} showRating - Show 5-star rating (default: false)
 * @param {boolean} brutalist - Use brutalist card style with cyan shadow (default: false)
 * @param {boolean} showDither - Show dither background effect (default: true for brutalist)
 * @param {boolean} animate - Animate on scroll (default: true)
 * @param {string} className - Additional classes
 */
const QuoteCard = ({
    quote,
    author,
    role,
    company,
    logo,
    showIcon = true,
    showRating = false,
    brutalist = false,
    showDither = true,
    animate = true,
    className = ''
}) => {
    const authorLogo = logo || authorLogos[author];
    const quoteImage = useQuoteImage(0);
    const Wrapper = animate ? motion.div : 'div';
    const animationProps = animate ? {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.6 }
    } : {};

    const cardClasses = brutalist
        ? 'relative rounded-2xl border border-slate-700 bg-slate-950 p-5 md:p-6 overflow-hidden'
        : 'text-center max-w-3xl mx-auto';

    const cardStyle = brutalist
        ? { boxShadow: '6px 6px 0px rgba(34, 211, 238, 1)' }
        : {};

    return (
        <Wrapper
            {...animationProps}
            className={`${cardClasses} ${className}`}
            style={cardStyle}
        >
            {/* Dither Background */}
            {brutalist && showDither && quoteImage && (
                <div className="absolute inset-0 opacity-15 pointer-events-none">
                    <DitherShader
                        src={quoteImage}
                        colorMode="duotone"
                        primaryColor="#020617"
                        secondaryColor="#22d3ee"
                        gridSize={3}
                        ditherMode="bayer"
                        threshold={0.5}
                        contrast={1.2}
                    />
                </div>
            )}

            {/* Content wrapper for z-index */}
            <div className={brutalist ? 'relative z-10' : ''}>
                {/* Quote Icon - simplified for brutalist */}
                {showIcon && (
                    <div className={brutalist ? 'mb-3' : 'mb-4'}>
                        <svg
                            className={brutalist ? 'w-5 h-5 text-cyan-400' : 'w-8 h-8 mx-auto text-cyan-400/30'}
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                        </svg>
                    </div>
                )}

                {/* Quote Text */}
                <blockquote className={brutalist
                    ? "text-body italic text-slate-300 text-left mb-4"
                    : "text-quote text-center mb-4"
                }>
                    {quote}
                </blockquote>

                {/* 5-Star Rating */}
                {showRating && (
                    <div className={`flex ${brutalist ? 'justify-start' : 'justify-center'} gap-1 mb-4`}>
                        {[...Array(5)].map((_, i) => (
                            <svg
                                key={i}
                                className="w-5 h-5 text-cyan-400"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                        ))}
                    </div>
                )}

                {/* Author Footer - two lines for brutalist, inline for default */}
                {(author || role || company) && (
                    brutalist ? (
                        <footer className="flex items-center gap-3 pt-4 border-t border-slate-700/50">
                            {authorLogo ? (
                                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center p-1.5">
                                    <img
                                        src={authorLogo}
                                        alt={author}
                                        className="max-w-full max-h-full object-contain brightness-0 invert opacity-90"
                                    />
                                </div>
                            ) : (
                                <div className="w-10 h-10 rounded-lg bg-linear-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-slate-950 font-bold text-sm">
                                    {author?.charAt(0) || '?'}
                                </div>
                            )}
                            <div>
                                {author && <div className="text-sm text-white font-medium">{author}</div>}
                                {(role || company) && (
                                    <div className="text-xs text-slate-400">
                                        {role}{role && company && ' · '}{company}
                                    </div>
                                )}
                            </div>
                        </footer>
                    ) : (
                        <footer className="flex items-center justify-center gap-2 text-sm">
                            {author && <span className="text-white font-medium">{author}</span>}
                            {author && (role || company) && <span className="text-slate-500">—</span>}
                            {role && <span className="text-slate-400">{role}</span>}
                            {company && (
                                <>
                                    <span className="text-slate-500">@</span>
                                    <span className="text-cyan-400">{company}</span>
                                </>
                            )}
                        </footer>
                    )
                )}
            </div>
        </Wrapper>
    );
};

export default QuoteCard;
