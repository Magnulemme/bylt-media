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

    return (
        <span className="inline-block">
            <AnimatePresence mode="wait">
                <motion.span
                    key={currentIndex}
                    className={`inline-block ${className}`}
                    initial={{ opacity: 0, y: 8, filter: 'blur(4px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: -8, filter: 'blur(4px)' }}
                    transition={{
                        duration: 0.8,
                        ease: [0.25, 0.1, 0.25, 1],
                        opacity: { duration: 0.6 }
                    }}
                >
                    {phrases[currentIndex]}
                </motion.span>
            </AnimatePresence>
        </span>
    );
};

export default RotatingText;
