import Link from 'next/link';
import { motion, useTransform, useMotionValue } from 'motion/react';
import { useFooterStore } from '../store/footerStore';
import { useEffect } from 'react';
import ShaderBackgroundStandalone from './home/ShaderBackgroundStandalone';

const Content = () => {
    return (
        <footer className="footer-content">
            {/* Shader Background */}
            <ShaderBackgroundStandalone />

            <div className="footer-container max-w-content mx-auto relative z-10 h-full flex flex-col justify-between">
                <div className="footer-grid grid grid-cols-2 md:grid-cols-4">
                    <div className="col-span-2 md:col-span-1">
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent font-inter mb-3">
                            BYLT.MEDIA
                        </h2>
                        <p className="text-sm text-gray-400 font-light">
                            Building Digital Futures
                        </p>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                            Services
                        </h3>
                        <nav className="space-y-3">
                            <Link
                                href="/websites"
                                className="block text-gray-400 hover:text-cyan-400 transition-colors duration-300 text-sm"
                            >
                                Websites
                            </Link>
                            <Link
                                href="/paidsearch"
                                className="block text-gray-400 hover:text-cyan-400 transition-colors duration-300 text-sm"
                            >
                                Paid Search
                            </Link>
                            <Link
                                href="/socialmedia"
                                className="block text-gray-400 hover:text-cyan-400 transition-colors duration-300 text-sm"
                            >
                                Social Media
                            </Link>
                        </nav>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                            Contact
                        </h3>
                        <div className="space-y-3">
                            <a
                                href="mailto:info@byltmedia.com"
                                className="block text-gray-400 hover:text-cyan-400 transition-colors duration-300 text-sm"
                            >
                                info@byltmedia.com
                            </a>
                            <a
                                href="tel:+441316050312"
                                className="block text-gray-400 hover:text-cyan-400 transition-colors duration-300 text-sm"
                            >
                                +44 (131) 605 03 12
                            </a>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                            Office
                        </h3>
                        <address className="text-gray-400 not-italic text-sm leading-relaxed">
                            89 Giles Street<br />
                            Edinburgh<br />
                            EH6 6BZ
                        </address>
                    </div>
                </div>

                <div className="footer-bottom">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-gray-500 text-xs">
                            © {new Date().getFullYear()} BYLT Media. All Rights Reserved.
                        </p>

                        <div className="flex items-center gap-4 text-xs">
                            <Link
                                href="/terms-and-conditions"
                                className="text-gray-400 hover:text-cyan-400 transition-colors duration-300"
                            >
                                Terms & Conditions
                            </Link>
                            <span className="text-gray-600">|</span>
                            <Link
                                href="/privacy-policy"
                                className="text-gray-400 hover:text-cyan-400 transition-colors duration-300"
                            >
                                Privacy Policy
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            
        </footer>
    );
};

export default function Footer() {
    const scrollProgress = useFooterStore((state) => state.scrollProgress);
    const setFooterHeight = useFooterStore((state) => state.setFooterHeight);
    const motionValue = useMotionValue(0);

    // Calcola e salva l'altezza del footer nello store
    useEffect(() => {
        const updateFooterHeight = () => {
            const footerElement = document.querySelector('footer');
            if (footerElement) {
                const height = footerElement.offsetHeight;
                setFooterHeight(height);
            }
        };

        updateFooterHeight();
        window.addEventListener('resize', updateFooterHeight);

        // Ritarda per assicurarsi che il DOM sia completamente renderizzato
        const timer = setTimeout(() => {
            updateFooterHeight();
        }, 100);

        return () => {
            window.removeEventListener('resize', updateFooterHeight);
            clearTimeout(timer);
        };
    }, [setFooterHeight]);

    // Aggiorna il motion value quando scrollProgress cambia
    useEffect(() => {
        motionValue.set(scrollProgress);
    }, [scrollProgress, motionValue]);

    // 3D entrance effect - footer si avvicina lungo l'asse Z
    const translateZ = useTransform(motionValue, [0, 0.5], [-100, 0]);
    const opacity = useTransform(motionValue, [0, 0.5], [0.7, 1]);
    const transform = useTransform(translateZ, (z) => `translateZ(${z}px)`);

    return (
        <div className="footer-section">
            <motion.div
                className="rounded-2xl overflow-hidden"
                style={{
                    transform,
                    opacity,
                    transformStyle: 'preserve-3d'
                }}
            >
                <Content />
            </motion.div>
        </div>
    );
}