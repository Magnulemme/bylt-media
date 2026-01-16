import React from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { motion } from 'motion/react';
import Layout from '../components/layout';
import { ProjectMarquee } from '../components/ui/project-marquee';
import { useWaveBackground } from '../components/services/hooks';

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

const AnimatedWaveCanvas = dynamic(
    () => import('../components/services/sections/AnimatedWaveCanvas'),
    { ssr: false }
);

const SuccessStories = dynamic(
    () => import('../components/home/SuccessStories'),
    { ssr: false }
);

const PROJECTS = [
    { name: 'Nissan', image: '/images/casestudy/nissan-case-study.webp', href: '/case-studies/nissan' },
    { name: 'Happy', image: '/images/casestudy/happy-case-study.webp', href: '/case-studies/happy' },
    { name: 'Napudreni', image: '/images/casestudy/napudreni-case-study.webp', href: '/case-studies/napudreni' },
    { name: 'Brickell', image: '/images/casestudy/brickell-case-study.webp', href: '/case-studies/brickell' },
    { name: 'CSKA', image: '/images/casestudy/cska-case-study.webp', href: '/case-studies/cska' },
    { name: 'Parfium.bg', image: '/images/casestudy/parfium.bg-case-study.webp', href: '/case-studies/parfium' },
];

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
                        <ProjectMarquee
                            projects={PROJECTS}
                            speed="35s"
                            pauseOnHover={true}
                        />
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

const AuditCard = ({ feature, index }) => {
    const waveBg = useWaveBackground(index);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative rounded-2xl border border-white/10 hover:border-cyan-400/30 duration-300 overflow-hidden"
        >
            {/* Wave Background */}
            {waveBg && (
                <div
                    className="absolute inset-0 opacity-60 group-hover:opacity-80 transition-opacity duration-300"
                    style={{
                        backgroundImage: `url(${waveBg})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}
                />
            )}

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-slate-950/70" />

            {/* Content */}
            <div className="relative z-10 p-6 md:p-8">
                <div className="w-12 h-12 mb-5 rounded-xl bg-gradient-to-br from-cyan-400/20 to-blue-500/20 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-white mb-3">
                    {feature.title}
                </h3>
                <p className="text-slate-400 text-sm md:text-base leading-relaxed">
                    {feature.description}
                </p>
            </div>
        </motion.div>
    );
};

const FreeAuditSection = () => {
    const auditFeatures = [
        {
            title: 'Performance Analysis',
            description: 'We analyze your current digital presence, identifying strengths and areas for improvement.',
            icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
            ),
        },
        {
            title: 'Competitor Insights',
            description: 'Understand how you stack up against competitors and discover untapped opportunities.',
            icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
            ),
        },
        {
            title: 'Custom Strategy',
            description: 'Receive a tailored action plan with specific recommendations for your business goals.',
            icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
            ),
        },
    ];

    return (
        <section className="py-20 md:pt-28" style={{ background: '#020617' }}>
            <div className="max-w-6xl mx-auto px-4">
                <div className="max-w-2xl ml-auto mb-12 md:mb-16">
                    <motion.h2
                        className="text-3xl md:text-4xl lg:text-5xl font-bold font-inter leading-tight text-white text-right mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        Get Your <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Free Audit</span>
                    </motion.h2>
                    <motion.p
                        className="text-gray-400 text-lg md:text-xl text-right"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        Before we start working together, we offer a complimentary audit of your digital marketing.
                        This helps us understand your business and shows you exactly where we can add value.
                    </motion.p>
                </div>

                <div className="grid md:grid-cols-3 gap-6 md:gap-8">
                    {auditFeatures.map((feature, index) => (
                        <AuditCard key={feature.title} feature={feature} index={index} />
                    ))}
                </div>

                {/* Benefits Section */}
                <div className="mt-16 md:mt-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="max-w-3xl"
                    >
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
                            Why Partner With Us?
                        </h3>
                        <div className="space-y-4">
                            <div className="flex items-start gap-4">
                                <div className="w-6 h-6 rounded-full bg-cyan-400/20 flex items-center justify-center shrink-0 mt-1">
                                    <svg className="w-3 h-3 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <p className="text-gray-400">
                                    <span className="text-white font-medium">No commitment required.</span> The audit is completely free with no strings attached.
                                </p>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-6 h-6 rounded-full bg-cyan-400/20 flex items-center justify-center shrink-0 mt-1">
                                    <svg className="w-3 h-3 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <p className="text-gray-400">
                                    <span className="text-white font-medium">Dedicated team.</span> Work directly with strategists who understand your industry.
                                </p>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-6 h-6 rounded-full bg-cyan-400/20 flex items-center justify-center shrink-0 mt-1">
                                    <svg className="w-3 h-3 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <p className="text-gray-400">
                                    <span className="text-white font-medium">Transparent reporting.</span> Clear metrics and regular updates on your campaign performance.
                                </p>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-6 h-6 rounded-full bg-cyan-400/20 flex items-center justify-center shrink-0 mt-1">
                                    <svg className="w-3 h-3 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <p className="text-gray-400">
                                    <span className="text-white font-medium">Results-driven approach.</span> We focus on ROI, not vanity metrics.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Animated Wave with Text */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="mt-12 md:mt-16 relative flex flex-col md:flex-row items-center justify-center gap-8"
                >
                    {/* Wave - sfondo su mobile, side-by-side su desktop */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="absolute inset-0 md:relative md:inset-auto rounded-2xl overflow-hidden md:h-80"
                    >
                        <AnimatedWaveCanvas className="rounded-2xl min-w-75 h-full" />
                        {/* Overlay scuro solo su mobile */}
                        <div className="absolute inset-0 bg-black/50 md:hidden rounded-2xl" />
                    </motion.div>

                    {/* Text */}
                    <div className="relative z-10 text-center md:text-left py-16 md:py-0">
                        <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
                            Ready to see what's possible?
                        </h3>
                        <p className="text-gray-400 mb-4">
                            Fill out the form below and we'll get back to you within 24 hours with your personalized audit.
                        </p>
                        <div className="flex items-center justify-center md:justify-start gap-2 text-sm text-cyan-400">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>24h response time</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
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
            <FreeAuditSection />
            <SuccessStories />
            <NeuralContact />
        </Layout>
    );
};

export default ContactPage;
