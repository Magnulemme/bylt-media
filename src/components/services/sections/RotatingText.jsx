import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

// Split phrase into two lines at the midpoint
const splitPhrase = (phrase) => {
    const words = phrase.split(' ');
    if (words.length <= 1) return [phrase];
    const mid = Math.ceil(words.length / 2);
    return [words.slice(0, mid).join(' '), words.slice(mid).join(' ')];
};

const PhraseLines = ({ phrase, className }) => {
    const lines = splitPhrase(phrase);
    return (
        <span className={className}>
            {lines[0]}
            {lines[1] && <><br />{lines[1]}</>}
        </span>
    );
};

const RotatingText = ({ phrases, className = '' }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % phrases.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [phrases.length]);

    return (
        <span className="inline-grid pb-4 md:pb-6">
            {/* Hidden phrases stacked in same cell to reserve max height */}
            {phrases.map((phrase, i) => (
                <PhraseLines
                    key={i}
                    phrase={phrase}
                    className={`invisible col-start-1 row-start-1 ${className}`}
                />
            ))}
            {/* Visible rotating phrase in same cell */}
            <AnimatePresence mode="wait">
                <motion.span
                    key={currentIndex}
                    className={`col-start-1 row-start-1 ${className}`}
                    initial={{ opacity: 0, y: 8, filter: 'blur(4px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: -8, filter: 'blur(4px)' }}
                    transition={{
                        duration: 0.8,
                        ease: [0.25, 0.1, 0.25, 1],
                        opacity: { duration: 0.6 }
                    }}
                >
                    {splitPhrase(phrases[currentIndex]).map((line, i) => (
                        <React.Fragment key={i}>
                            {i > 0 && <br />}
                            {line}
                        </React.Fragment>
                    ))}
                </motion.span>
            </AnimatePresence>
        </span>
    );
};

export default RotatingText;
