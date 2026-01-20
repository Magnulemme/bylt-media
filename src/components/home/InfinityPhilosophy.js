import { motion } from 'motion/react';
import { Infinity } from 'lucide-react';

const InfinityPhilosophy = () => {
    return (
        <div className="infinity-section">
            <div className="max-w-5xl mx-auto relative">
                {/* Infinity symbol come background dell'area contenuto */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="absolute inset-0 pointer-events-none"
                >
                    {/* Glow layer */}
                    <div className="absolute blur-3xl opacity-20 rotate-90 md:rotate-0">
                        <svg
                            viewBox="0 10 60 40"
                            className="w-[320px] md:w-[480px] lg:w-[640px] h-auto"
                            fill="currentColor"
                        >
                            <defs>
                                <linearGradient id="infinityGradientGlow" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" style={{ stopColor: 'rgb(34, 211, 238)', stopOpacity: 0.08 }} />
                                    <stop offset="50%" style={{ stopColor: 'rgb(59, 130, 246)', stopOpacity: 0.08 }} />
                                    <stop offset="100%" style={{ stopColor: 'rgb(168, 85, 247)', stopOpacity: 0.08 }} />
                                </linearGradient>
                            </defs>
                            <path fill="url(#infinityGradientGlow)" d="M43.594,12.5c-9.046,0-16.406,7.851-16.406,17.5c0,6.341-4.836,11.5-10.781,11.5S5.625,36.341,5.625,30s4.836-11.5,10.781-11.5c2.146,0,4.218,0.67,5.992,1.938c0.593,0.425,1.147,0.911,1.645,1.445c1.061,1.136,2.914,1.14,3.977,0.009c1.099-1.167,1.103-3.07,0.009-4.243c-0.76-0.813-1.601-1.552-2.499-2.194c-2.704-1.933-5.858-2.954-9.124-2.954C7.36,12.5,0,20.351,0,30s7.36,17.5,16.406,17.5S32.812,39.649,32.812,30c0-6.341,4.836-11.5,10.781-11.5S54.375,23.659,54.375,30s-4.836,11.5-10.781,11.5c-2.879,0-5.586-1.195-7.622-3.366c-1.062-1.133-2.915-1.133-3.978,0c-0.531,0.567-0.823,1.32-0.823,2.121c0,0.802,0.293,1.556,0.824,2.121c3.098,3.305,7.218,5.124,11.599,5.124C52.64,47.5,60,39.649,60,30S52.64,12.5,43.594,12.5z"/>
                        </svg>
                    </div>

                    {/* Main symbol */}
                    <div className="relative rotate-90 md:rotate-0">
                        <svg
                            viewBox="0 10 60 40"
                            className="w-[320px] md:w-[480px] lg:w-[640px] h-auto"
                            fill="currentColor"
                        >
                            <defs>
                                <linearGradient id="infinityGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" style={{ stopColor: 'rgb(34, 211, 238)', stopOpacity: 0.08 }} />
                                    <stop offset="50%" style={{ stopColor: 'rgb(59, 130, 246)', stopOpacity: 0.08 }} />
                                    <stop offset="100%" style={{ stopColor: 'rgb(168, 85, 247)', stopOpacity: 0.08 }} />
                                </linearGradient>
                            </defs>
                            <path fill="url(#infinityGradient)" d="M43.594,12.5c-9.046,0-16.406,7.851-16.406,17.5c0,6.341-4.836,11.5-10.781,11.5S5.625,36.341,5.625,30s4.836-11.5,10.781-11.5c2.146,0,4.218,0.67,5.992,1.938c0.593,0.425,1.147,0.911,1.645,1.445c1.061,1.136,2.914,1.14,3.977,0.009c1.099-1.167,1.103-3.07,0.009-4.243c-0.76-0.813-1.601-1.552-2.499-2.194c-2.704-1.933-5.858-2.954-9.124-2.954C7.36,12.5,0,20.351,0,30s7.36,17.5,16.406,17.5S32.812,39.649,32.812,30c0-6.341,4.836-11.5,10.781-11.5S54.375,23.659,54.375,30s-4.836,11.5-10.781,11.5c-2.879,0-5.586-1.195-7.622-3.366c-1.062-1.133-2.915-1.133-3.978,0c-0.531,0.567-0.823,1.32-0.823,2.121c0,0.802,0.293,1.556,0.824,2.121c3.098,3.305,7.218,5.124,11.599,5.124C52.64,47.5,60,39.649,60,30S52.64,12.5,43.594,12.5z"/>
                        </svg>
                    </div>
                </motion.div>

                {/* Background gradient glow */}
                <div className="absolute inset-0 bg-gradient-to-b from-cyan-400/5 via-transparent to-transparent blur-3xl -z-10" />

                {/* Contenuto in primo piano */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="relative z-10"
                >
                    <div className="infinity-layout">
                        {/* Titolo */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="infinity-header"
                        >
                            <h2 className="heading-h2 text-white">
                                Growth that<br />
                                compounds
                            </h2>
                        </motion.div>

                        {/* Paragrafi a tutta larghezza */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="infinity-paragraphs"
                        >
                            <p>
                                Traditional marketing campaigns start from zero every time. <span className="text-white font-semibold">We build systems that get smarter with every iteration.</span>
                            </p>
                            <p>
                                Every pound invested generates data. Every insight refines your strategy. Every optimization amplifies your returns. It's a self-reinforcing cycle that transforms marketing from an expense into your most profitable growth engine.
                            </p>
                            <p className="text-cyan-400 font-semibold">
                                More customers. Better margins. Exponential ROI.
                            </p>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default InfinityPhilosophy;
