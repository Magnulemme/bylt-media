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
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                    {phrases[currentIndex]}
                </motion.span>
            </AnimatePresence>
        </span>
    );
};

export default RotatingText;
