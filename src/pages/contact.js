import React from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { motion } from 'motion/react';
import Layout from '../components/layout';

const NeuralContact = dynamic(
    () => import('../components/home/NeuralContact'),
    { ssr: false }
);

const ShaderBackground = dynamic(
    () => import('../components/home/ShaderBackground'),
    { ssr: false }
);

const Octahedron3D = dynamic(
    () => import('../components/contact/Octahedron3D'),
    { ssr: false }
);

const SuccessStories = dynamic(
    () => import('../components/home/SuccessStories'),
    { ssr: false }
);

const ContactHero = () => {
    return (
        <div className="bg-black service-page">
            <section className="relative flex items-center justify-center overflow-hidden max-h-screen">
                <ShaderBackground onReady={() => window.dispatchEvent(new CustomEvent('hero-ready'))} />

                <div className="relative z-20 max-w-6xl mx-auto px-4 py-24 md:py-32">
                    <div className="relative grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                        {/* Octahedron as background on mobile/tablet */}
                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 lg:hidden opacity-30 pointer-events-none">
                            <div className="w-[350px] h-[350px]">
                                <Octahedron3D />
                            </div>
                        </div>

                        {/* Text content */}
                        <div className="relative z-10 text-center lg:text-left">

                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, delay: 0.1 }}
                                className="text-4xl md:text-6xl lg:text-7xl font-bold font-inter leading-[1.1] mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent"
                            >
                                Let's Build Together
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="text-base md:text-lg text-slate-400 max-w-xl mx-auto lg:mx-0 leading-relaxed"
                            >
                                Ready to transform your digital presence? We're here to listen, strategise, and deliver results that exceed expectations.
                            </motion.p>

                            </div>

                        {/* Octahedron visible on desktop */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="hidden lg:block relative h-[350px] overflow-hidden"
                        >
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-[400px] h-[400px]">
                                    <Octahedron3D />
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Project Thumbnails Marquee */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.7, delay: 0.5 }}
                        className="mt-16"
                    >
                        <p className="text-xs text-slate-500 uppercase tracking-widest text-left mb-6">
                            Brands We've Helped Grow
                        </p>
                        <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]">
                            <div className="flex gap-4 animate-marquee hover:[animation-play-state:paused]">
                                {[...Array(2)].map((_, setIndex) => (
                                    <div key={setIndex} className="flex gap-4 shrink-0">
                                        {[
                                            '/images/casestudy/nissan-case-study.webp',
                                            '/images/casestudy/happy-case-study.webp',
                                            '/images/casestudy/napudreni-case-study.webp',
                                            '/images/casestudy/brickell-case-study.webp',
                                            '/images/casestudy/cska-case-study.webp',
                                            '/images/casestudy/parfium.bg-case-study.webp',
                                        ].map((src, index) => (
                                            <div
                                                key={`${setIndex}-${index}`}
                                                className="relative w-32 h-32 md:w-40 md:h-40 lg:w-44 lg:h-44 rounded-xl overflow-hidden border-2 border-white/10 hover:border-cyan-400/50 transition-all duration-300 hover:scale-105 shrink-0"
                                            >
                                                <img
                                                    src={src}
                                                    alt={`Project ${index + 1}`}
                                                    className="w-full h-full object-cover"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    <style jsx>{`
                        @keyframes marquee {
                            0% { transform: translateX(0); }
                            100% { transform: translateX(-50%); }
                        }
                        .animate-marquee {
                            animation: marquee 25s linear infinite;
                        }
                    `}</style>
                </div>
            </section>
        </div>
    );
};

const ContactPage = () => {
    return (
        <Layout>
            <Head>
                <title>Contact Us | BYLT Media</title>
                <meta name="description" content="Get in touch with BYLT Media. Let's discuss your digital marketing needs and build something amazing together." />
                <link rel="canonical" href="https://www.byltmedia.com/contact" />

                {/* Open Graph Tags */}
                <meta property="og:title" content="Contact Us | BYLT Media" />
                <meta property="og:description" content="Get in touch with BYLT Media. Let's discuss your digital marketing needs and build something amazing together." />
                <meta property="og:image" content="https://www.byltmedia.com/images/byltmediapreview.png" />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://www.byltmedia.com/contact" />
                <meta property="og:site_name" content="BYLT Media" />

                {/* Twitter Card Tags */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Contact Us | BYLT Media" />
                <meta name="twitter:description" content="Get in touch with BYLT Media. Let's discuss your digital marketing needs and build something amazing together." />
                <meta name="twitter:image" content="https://www.byltmedia.com/images/byltmediapreview.png" />

                {/* Additional Meta */}
                <meta name="robots" content="index, follow" />
            </Head>
            <ContactHero />
            <SuccessStories />
            <NeuralContact />
        </Layout>
    );
};

export default ContactPage;
