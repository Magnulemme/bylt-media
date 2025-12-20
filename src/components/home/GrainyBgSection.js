import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import useQuantumScrollAnim from '../../hooks/useQuantumScrollAnim';
import ShaderBackground from './ShaderBackground';
import NeuralServices from './NeuralServices';
import NeuralServicesMobile from './NeuralServicesMobile';
import InfinityPhilosophy from './InfinityPhilosophy';
import PerformanceMetrics from './PerformanceMetrics';

const GrainyBgSection = () => {
    const sectionRef = useQuantumScrollAnim(0.1);
    const containerRef = useRef(null);
    const [isMobile, setIsMobile] = useState(false);

    // Detect screen size for conditional rendering
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 500);
        };

        // Check on mount
        checkMobile();

        // Add resize listener
        window.addEventListener('resize', checkMobile);

        // Cleanup
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Scroll-based animations usando motion
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // 3D entrance effect - card si avvicina lungo l'asse Z (ridotto per movimento più sottile)
    const translateZEntrance = useTransform(scrollYProgress, [0, 0.08], [-40, 0]);
    const opacityEntrance = useTransform(scrollYProgress, [0, 0.08], [0.7, 1]);

    // 3D exit effect - card si allontana lungo l'asse Z (ridotto per movimento più sottile)
    const translateZExit = useTransform(scrollYProgress, [0.92, 1], [0, -40]);
    const opacityExit = useTransform(scrollYProgress, [0.92, 1], [1, 0.7]);

    // Combina entrata e uscita
    const translateZ = useTransform(scrollYProgress, (progress) => {
        if (progress <= 0.08) {
            return translateZEntrance.get();
        } else if (progress >= 0.92) {
            return translateZExit.get();
        }
        return 0;
    });

    const opacity = useTransform(scrollYProgress, (progress) => {
        if (progress <= 0.08) {
            return opacityEntrance.get();
        } else if (progress >= 0.92) {
            return opacityExit.get();
        }
        return 1;
    });

    const transform = useTransform(translateZ, (z) => `translateZ(${z}px)`);

    return (
        <section id="services" className="grainy-bg-section">
            <motion.div
                ref={containerRef}
                className="grainy-bg-card"
                style={{
                    transform,
                    opacity
                }}
            >
                {/* Shader Background */}
                <ShaderBackground />

                <div ref={sectionRef} className="grainy-bg-content">
                    {/* Services Section - Conditional rendering based on screen size */}
                    {isMobile ? <NeuralServicesMobile /> : <NeuralServices />}

                    {/* Infinity Philosophy Section */}
                    <InfinityPhilosophy />

                    {/* Performance Metrics Section */}
                    <PerformanceMetrics />
                </div>
            </motion.div>
        </section>
    );
};

export default GrainyBgSection;
