import React from 'react';
import { motion } from 'motion/react';

/**
 * QuoteCard - Reusable quote/testimonial component BYLT style
 *
 * @param {string} quote - The quote text
 * @param {string} author - Author name
 * @param {string} role - Author role/position
 * @param {string} company - Company name (optional)
 * @param {boolean} showIcon - Show quote icon (default: true)
 * @param {boolean} showRating - Show 5-star rating (default: false)
 * @param {boolean} brutalist - Use brutalist card style with cyan shadow (default: false)
 * @param {boolean} animate - Animate on scroll (default: true)
 * @param {string} className - Additional classes
 */
const QuoteCard = ({
    quote,
    author,
    role,
    company,
    showIcon = true,
    showRating = false,
    brutalist = false,
    animate = true,
    className = ''
}) => {
    const Wrapper = animate ? motion.div : 'div';
    const animationProps = animate ? {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.6 }
    } : {};

    const cardClasses = brutalist
        ? 'relative rounded-2xl border border-slate-700 bg-slate-950/80 p-8 md:p-10 overflow-hidden'
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
            {/* Quote Icon */}
            {showIcon && (
                <div className={brutalist ? 'flex justify-center mb-6' : 'mb-4'}>
                    <div className={brutalist
                        ? 'w-12 h-12 rounded-full bg-linear-to-br from-cyan-400/20 to-blue-500/20 flex items-center justify-center'
                        : ''
                    }>
                        <svg
                            className={brutalist ? 'w-6 h-6 text-cyan-400' : 'w-8 h-8 mx-auto text-cyan-400/30'}
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                        </svg>
                    </div>
                </div>
            )}

            {/* Quote Text */}
            <blockquote className="text-quote text-center mb-4">
                "{quote}"
            </blockquote>

            {/* 5-Star Rating */}
            {showRating && (
                <div className="flex justify-center gap-1 mb-4">
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

            {/* Author Footer */}
            {(author || role || company) && (
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
            )}
        </Wrapper>
    );
};

export default QuoteCard;
