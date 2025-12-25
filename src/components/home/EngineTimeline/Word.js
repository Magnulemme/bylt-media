import React from 'react';
import { motion, useTransform } from 'motion/react';

const Word = ({ children, range, progress }) => {
    const opacity = useTransform(progress, range, [0.2, 1]);

    return (
        <motion.span
            style={{ opacity }}
            className="inline-block mr-[0.25em]"
        >
            {children}
        </motion.span>
    );
};

export default Word;
