import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const RotatingText = ({ phrases, className = '' }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % phrases.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [phrases.length]);

    const currentPhrase = phrases[currentIndex];

    return (
        <span className={`inline-block ${className}`}>
            <AnimatePresence mode="wait">
                <motion.span
                    key={currentIndex}
                    className="inline-block"
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                >
                    {currentPhrase.split('').map((char, index) => (
                        <motion.span
                            key={`${currentIndex}-${index}`}
                            className="inline-block"
                            variants={{
                                hidden: {
                                    opacity: 0,
                                    y: 20,
                                },
                                visible: {
                                    opacity: 1,
                                    y: 0,
                                    transition: {
                                        duration: 0.5,
                                        delay: index * 0.035,
                                        ease: [0.22, 1, 0.36, 1],
                                    },
                                },
                                exit: {
                                    opacity: 0,
                                    y: -20,
                                    transition: {
                                        duration: 0.3,
                                        delay: index * 0.02,
                                        ease: [0.22, 1, 0.36, 1],
                                    },
                                },
                            }}
                        >
                            {char === ' ' ? '\u00A0' : char}
                        </motion.span>
                    ))}
                </motion.span>
            </AnimatePresence>
        </span>
    );
};

export default RotatingText;
