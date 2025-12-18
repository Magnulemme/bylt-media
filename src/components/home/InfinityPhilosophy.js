import { motion } from 'motion/react';

const InfinityPhilosophy = () => {
    return (
        <div className="infinity-section">
            <div className="max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="relative"
                >
                    {/* Background gradient glow */}
                    <div className="absolute inset-0 bg-gradient-to-b from-cyan-400/5 via-transparent to-transparent blur-3xl -z-10" />

                    <div className="infinity-layout">
                        {/* Left: Infinity symbol */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.2 }}
                            className="relative flex-shrink-0"
                        >
                            {/* Glow layer */}
                            <div className="absolute inset-0 blur-3xl opacity-40">
                                <div className="text-[140px] md:text-[180px] leading-none font-bold bg-gradient-to-r from-cyan-400/50 via-blue-500/50 to-purple-600/50 bg-clip-text text-transparent">
                                    ∞
                                </div>
                            </div>

                            {/* Main symbol */}
                            <div className="relative text-[140px] md:text-[180px] leading-none font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-gradient bg-[length:200%_200%]">
                                ∞
                            </div>
                        </motion.div>

                        {/* Right: Content */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="infinity-text-container"
                        >
                            <div className="infinity-heading-container">
                                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                                    Built to perform,<br />
                                    designed to scale
                                </h2>
                            </div>

                            <div className="infinity-paragraphs">
                                <p>
                                    Every campaign we launch is built on a simple principle: <span className="text-white font-semibold">what works today should work even better tomorrow.</span>
                                </p>
                                <p>
                                    No temporary fixes. No cookie-cutter playbooks. Just strategic marketing that compounds—where each win funds the next, and momentum builds on itself.
                                </p>
                                <p className="text-cyan-400 font-semibold">
                                    Sustainable growth. Measurable impact. Unlimited potential.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default InfinityPhilosophy;
