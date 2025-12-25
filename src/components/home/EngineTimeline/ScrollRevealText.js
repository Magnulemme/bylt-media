import React, { useRef } from 'react';
import { useScroll } from 'motion/react';
import Word from './Word';

const ScrollRevealText = ({ text, className }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start 0.9", "start 0.5"]
    });

    const words = text.split(' ');

    return (
        <h3 ref={ref} className={className}>
            {words.map((word, i) => {
                const start = i / words.length;
                const end = (i + 1) / words.length;

                return (
                    <Word key={i} range={[start, end]} progress={scrollYProgress}>
                        {word}
                    </Word>
                );
            })}
        </h3>
    );
};

export default ScrollRevealText;
