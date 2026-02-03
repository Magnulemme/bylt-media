import Head from 'next/head';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import React, { useEffect, useState, useRef } from 'react';
import Layout from '../components/layout';
import ShaderBackgroundStandalone from '../components/home/ShaderBackgroundStandalone';
import { DitherShader } from '../components/ui/dither-shader';
import { Linkedin } from 'lucide-react';
import { MovingBorderButton } from '@/components/ui/moving-border-button';
import CTASectionCard from '@/components/ui/CTASectionCard';
import { useWaveBackground } from '../components/services/hooks';
import ShaderBackground from '../components/home/ShaderBackground';
import { cn } from '@/lib/utils';
import { useCountUp } from '../hooks/useCountUp';

// Infinite Scroll Carousel Component
const InfiniteCarousel = ({ children, direction = "left", speed = "40s", className = "" }) => {
    const containerRef = useRef(null);

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.style.setProperty(
                "--animation-direction",
                direction === "left" ? "forwards" : "reverse"
            );
            containerRef.current.style.setProperty("--animation-duration", speed);
        }
    }, [direction, speed]);

    // Convert children to array and duplicate for seamless loop
    const childArray = React.Children.toArray(children);

    return (
        <div
            ref={containerRef}
            className={cn(
                "scroller relative z-20 w-full max-w-6xl mx-auto overflow-hidden",
                "[mask-image:linear-gradient(to_right,transparent_0%,white_15%,white_85%,transparent_100%)]",
                className
            )}
        >
            <div
                className={cn(
                    "flex w-max min-w-full shrink-0 flex-nowrap gap-6 py-4 animate-scroll",
                    "hover:[animation-play-state:paused]"
                )}
            >
                {/* Render children 4 times for seamless infinite loop */}
                {childArray}
                {childArray.map((child, idx) => React.cloneElement(child, { key: `dup1-${idx}` }))}
                {childArray.map((child, idx) => React.cloneElement(child, { key: `dup2-${idx}` }))}
                {childArray.map((child, idx) => React.cloneElement(child, { key: `dup3-${idx}` }))}
            </div>
        </div>
    );
};

// Animated Stat Component
const AnimatedStat = ({ value, suffix = '', prefix = '', label, delay = 0 }) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setTimeout(() => setIsVisible(true), delay);
                }
            },
            { threshold: 0.1 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [delay]);

    const animatedValue = useCountUp(value, 2000, isVisible);

    return (
        <div ref={ref} className="stats-card">
            <div className="stats-value-light">
                {prefix}{animatedValue}{suffix}
            </div>
            <div className="text-label font-bold text-slate-400">
                {label}
            </div>
        </div>
    );
};

// SVG icons as data URLs for DitherShader
const iconSvgs = {
    award: `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>')}`,
    briefcase: `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>')}`,
    trendingUp: `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>')}`,
    mic: `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/></svg>')}`,
};

// Card component with shader + wave background
const ApartCard = ({ title, description, index }) => {
    const waveBg = useWaveBackground(index, true); // transparent background

    // Brutalist shadow colors based on index
    const shadowColors = [
        'rgba(34, 211, 238, 0.8)',  // cyan
        'rgba(168, 85, 247, 0.8)', // purple
        'rgba(59, 130, 246, 0.8)', // blue
    ];
    const shadowColor = shadowColors[index % shadowColors.length];

    return (
        <div
            className="relative rounded-2xl border border-slate-800 overflow-hidden hover:border-cyan-500/30 transition-all duration-300 h-full bg-slate-950"
            style={{ boxShadow: `6px 6px 0px ${shadowColor}` }}
        >
            {/* Wave dots on top */}
            {waveBg && (
                <div
                    className="absolute inset-0 pointer-events-none z-10 opacity-30"
                    style={{
                        backgroundImage: `url(${waveBg})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}
                />
            )}

            {/* Content */}
            <div className="relative z-20 p-6">
                <h3 className="heading-h4 text-white mb-2">{title}</h3>
                <p className="text-body text-slate-400">{description}</p>
            </div>
        </div>
    );
};

const Torus3D = dynamic(() => import('../components/about/Torus3D'), { ssr: false });

// Signal page ready for splash screen
const signalPageReady = () => {
    if (typeof window !== 'undefined' && window.location.pathname === '/about') {
        window.dispatchEvent(new CustomEvent('hero-ready'));
    }
};

export default function About() {
    return (
        <Layout>
            <Head>
                <title>About Us - BYLT Media</title>
                <meta name="description" content="Meet the team behind BYLT Media. We're a future-forward digital agency with over 10 years of experience in performance marketing, SEO, and digital solutions." />
                <link rel="canonical" href="https://www.byltmedia.com/about" />
            </Head>

            {/* Hero Section with Our Story + Why Choose */}
            <section
                className="flex flex-col overflow-x-clip hero-section w-full"
                style={{
                    background: '#020617',
                    zIndex: 10
                }}
            >
                <div className='about-hero-section relative w-full flex flex-col'>
                <ShaderBackgroundStandalone onReady={signalPageReady} />

                <div className="relative z-20 text-white mx-auto px-4 flex-1 flex flex-col justify-center items-center about-hero-container">
                    {/* Text + Torus side by side */}
                    <div className="relative flex flex-col lg:flex-row gap-8 lg:gap-12 items-center mb-12 md:bg-16 lg:mb-20 px-4 md:px-6 lg:px-12">
                        {/* Torus come sfondo su mobile/tablet */}
                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 lg:hidden opacity-30 pointer-events-none">
                            <div className="w-[450px] h-[450px]">
                                <Torus3D />
                            </div>
                        </div>

                        <div className="relative z-10 text-center lg:text-left flex-1">
                            <h1 className="heading-page mb-6">
                                <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                                    Our Story
                                </span>
                            </h1>
                            <p className="text-body-lg mb-4 max-w-xl">
                                BYLT Media was founded with a simple mission: to help businesses thrive in the digital age.
                                With over a decade of combined experience in performance marketing, we've helped brands
                                of all sizes achieve measurable growth.
                            </p>
                            <p className="text-body-lg max-w-xl">
                                From startups to Fortune 500 companies, we bring the same level of dedication,
                                strategic thinking, and data-driven approach to every project.
                            </p>
                        </div>

                        {/* Torus visibile solo su desktop */}
                        <div className="hidden lg:block relative h-[350px] aspect-square overflow-hidden shrink-0 ">
                            <div className="absolute inset-0 flex items-center justify-center ">
                                <div className="w-[500px] h-[500px] ">
                                    <Torus3D />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Official Partner Section */}
                    <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center justify-around py-8 w-full px-4 md:px-6 lg:px-12">
                        {/* BYLT Partner of MarketiseMe */}
                        <div className="text-center">
                            <p className="text-label mb-4">Official Partner of</p>
                            <a
                                href="https://marketiseme.com/en/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block transition-transform duration-300 hover:-translate-y-1"
                            >
                                <Image
                                    src="/images/partners/marketise-me-logo.svg"
                                    alt="MarketiseMe"
                                    width={180}
                                    height={80}
                                    className="opacity-80 hover:opacity-100 transition-opacity"
                                />
                            </a>
                        </div>

                        {/* MarketiseMe Partner of Google & Meta */}
                        <div className="text-center">
                            <p className="text-label mb-4">MarketiseMe is Official Partner of</p>
                            <div className="flex items-center justify-center gap-6">
                                <Image
                                    src="/images/partners/partners logos/google-partner-logo-min.svg"
                                    alt="Google Partner"
                                    width={140}
                                    height={60}
                                    className="opacity-80"
                                />
                                <Image
                                    src="/images/partners/partners logos/meta_partner_logo.png"
                                    alt="Meta Business Partner"
                                    width={140}
                                    height={60}
                                    className="opacity-80"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </section>

            {/* What Sets Us Apart - Sticky Reveal Section */}
            <section className="about-reveal-section">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
                    <div className="text-center md:text-right">
                        <h2 className="heading-h1 text-white mb-6">
                            What Sets Us Apart
                        </h2>
                        <p className="text-body-lg text-slate-400 ml-auto max-w-2xl">
                            We're not your typical agency. Here's what makes working with us different.
                        </p>
                    </div>
                </div>

                <InfiniteCarousel direction="left" speed="35s">
                    <div className="w-[350px] flex-shrink-0">
                        <ApartCard
                            title="We think like business owners"
                            description="Because we are. We understand the pressure of making every pound count. Our recommendations are always tied to real business outcomes, not vanity metrics."
                            index={0}
                        />
                    </div>
                    <div className="w-[350px] flex-shrink-0">
                        <ApartCard
                            title="No black boxes"
                            description="You'll always know exactly what we're doing and why. We share our strategies, explain our decisions, and welcome your questions. Your success is built on understanding, not mystery."
                            index={1}
                        />
                    </div>
                    <div className="w-[350px] flex-shrink-0">
                        <ApartCard
                            title="Long-term partnerships, not quick wins"
                            description="We're not interested in short-term gains that don't last. We build sustainable growth systems that continue delivering results month after month, year after year."
                            index={2}
                        />
                    </div>
                </InfiniteCarousel>
            </section>

            {/* Founders Section */}
            <section
                className="py-24 relative overflow-hidden"
                style={{
                    background: '#020617',
                    zIndex: 10
                }}
            >
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="heading-h1 text-white mb-6 text-center md:text-left">
                        Meet Our Founders
                    </h2>
                    <p className="text-subheader md:text-left text-center mb-16 max-w-2xl">
                        The team behind your success
                    </p>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Teodor */}
                        <div className="group relative p-8 rounded-2xl bg-slate-950 backdrop-blur-sm overflow-hidden">
                            <div className="relative z-10">
                                <div className="text-center mb-6">
                                    <div className="w-28 h-28 rounded-full mx-auto mb-6 overflow-hidden border-2 border-cyan-500/30 group-hover:border-cyan-400/60 transition-colors">
                                        <img
                                            src="/images/About/teodor.webp"
                                            alt="Teodor Yordanov"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <h3 className="heading-h3 text-white mb-1 group-hover:text-cyan-400 transition-colors">
                                        Teodor Yordanov
                                    </h3>
                                    <p className="text-cyan-400 font-medium mb-4">Co-Founder</p>
                                    <a
                                        href="https://www.linkedin.com/in/teodoryordanov/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors"
                                    >
                                        <Linkedin className="w-4 h-4" />
                                        <span>LinkedIn</span>
                                    </a>
                                </div>
                                <p className="text-body-lg text-center leading-relaxed">
                                    Over 10 years of deep expertise in digital marketing and business strategy.
                                    Proven track record managing multi-million pound campaigns and mentoring teams across diverse industries.
                                </p>
                            </div>
                        </div>

                        {/* Lorenzo */}
                        <div className="group relative p-8 rounded-2xl   bg-slate-950 backdrop-blur-sm transition-all duration-300 overflow-hidden">
                            <div className="relative z-10">
                                <div className="text-center mb-6">
                                    <div className="w-28 h-28 rounded-full mx-auto mb-6 overflow-hidden border-2 border-cyan-500/30 group-hover:border-cyan-400/60 transition-colors">
                                        <img
                                            src="/images/About/profilepic.png"
                                            alt="Lorenzo Bonari"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <h3 className="heading-h3 text-white mb-1 group-hover:text-cyan-400 transition-colors">
                                        Lorenzo Bonari
                                    </h3>
                                    <p className="text-cyan-400 font-medium mb-4">Co-Founder</p>
                                    <a
                                        href="https://www.linkedin.com/in/lorenzobonari/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors"
                                    >
                                        <Linkedin className="w-4 h-4" />
                                        <span>LinkedIn</span>
                                    </a>
                                </div>
                                <p className="text-body-lg text-center leading-relaxed">
                                    10+ years in digital marketing, from web development to paid media specialisation.
                                    Successfully managed Fortune 500 clients and led international expansion strategies for global brands.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Founder Credentials */}
                </div>
                <InfiniteCarousel direction="right" speed="30s" className="mt-16">
                    <div className="w-[180px] shrink-0">
                        <div
                            className="relative p-6 rounded-xl border border-slate-800 bg-slate-950 text-center group hover:border-cyan-500/50 transition-all duration-300 overflow-hidden h-full"
                            style={{ boxShadow: '6px 6px 0px rgba(34, 211, 238, 0.8)' }}
                        >
                            <div className="absolute inset-0 opacity-15 pointer-events-none">
                                <DitherShader
                                    src={iconSvgs.award}
                                    colorMode="duotone"
                                    primaryColor="#020617"
                                    secondaryColor="#22d3ee"
                                    ditherMode="halftone"
                                    gridSize={3}
                                    threshold={0.45}
                                    contrast={1.3}
                                />
                            </div>
                            <div className="relative z-10 w-10 h-10 mx-auto mb-3 group-hover:scale-110 transition-transform">
                                <DitherShader
                                    src={iconSvgs.award}
                                    colorMode="duotone"
                                    primaryColor="#020617"
                                    secondaryColor="#22d3ee"
                                    ditherMode="halftone"
                                    gridSize={3}
                                    threshold={0.45}
                                    contrast={1.3}
                                />
                            </div>
                            <div className="relative z-10 heading-h4 text-white">Certified</div>
                            <div className="relative z-10 text-caption">Google & Meta</div>
                        </div>
                    </div>
                    <div className="w-[180px] shrink-0">
                        <div
                            className="relative p-6 rounded-xl border border-slate-800 bg-slate-950 text-center group hover:border-purple-500/50 transition-all duration-300 overflow-hidden h-full"
                            style={{ boxShadow: '6px 6px 0px rgba(168, 85, 247, 0.8)' }}
                        >
                            <div className="absolute inset-0 opacity-15 pointer-events-none">
                                <DitherShader
                                    src={iconSvgs.briefcase}
                                    colorMode="duotone"
                                    primaryColor="#020617"
                                    secondaryColor="#a855f7"
                                    ditherMode="bayer"
                                    gridSize={4}
                                    threshold={0.5}
                                    contrast={1.4}
                                />
                            </div>
                            <div className="relative z-10 w-10 h-10 mx-auto mb-3 group-hover:scale-110 transition-transform">
                                <DitherShader
                                    src={iconSvgs.briefcase}
                                    colorMode="duotone"
                                    primaryColor="#020617"
                                    secondaryColor="#a855f7"
                                    ditherMode="bayer"
                                    gridSize={4}
                                    threshold={0.5}
                                    contrast={1.4}
                                />
                            </div>
                            <div className="relative z-10 heading-h4 text-white">Fortune 500</div>
                            <div className="relative z-10 text-caption">Client Portfolio</div>
                        </div>
                    </div>
                    <div className="w-[180px] shrink-0">
                        <div
                            className="relative p-6 rounded-xl border border-slate-800 bg-slate-950 text-center group hover:border-blue-500/50 transition-all duration-300 overflow-hidden h-full"
                            style={{ boxShadow: '6px 6px 0px rgba(59, 130, 246, 0.8)' }}
                        >
                            <div className="absolute inset-0 opacity-15 pointer-events-none">
                                <DitherShader
                                    src={iconSvgs.trendingUp}
                                    colorMode="duotone"
                                    primaryColor="#020617"
                                    secondaryColor="#3b82f6"
                                    ditherMode="crosshatch"
                                    gridSize={3}
                                    threshold={0.4}
                                    contrast={1.3}
                                />
                            </div>
                            <div className="relative z-10 w-10 h-10 mx-auto mb-3 group-hover:scale-110 transition-transform">
                                <DitherShader
                                    src={iconSvgs.trendingUp}
                                    colorMode="duotone"
                                    primaryColor="#020617"
                                    secondaryColor="#3b82f6"
                                    ditherMode="crosshatch"
                                    gridSize={3}
                                    threshold={0.4}
                                    contrast={1.3}
                                />
                            </div>
                            <div className="relative z-10 heading-h4 text-white">£10M+</div>
                            <div className="relative z-10 text-caption">Managed</div>
                        </div>
                    </div>
                    <div className="w-[180px] shrink-0">
                        <div
                            className="relative p-6 rounded-xl border border-slate-800 bg-slate-950 text-center group hover:border-emerald-500/50 transition-all duration-300 overflow-hidden h-full"
                            style={{ boxShadow: '6px 6px 0px rgba(16, 185, 129, 0.8)' }}
                        >
                            <div className="absolute inset-0 opacity-15 pointer-events-none">
                                <DitherShader
                                    src={iconSvgs.mic}
                                    colorMode="duotone"
                                    primaryColor="#020617"
                                    secondaryColor="#10b981"
                                    ditherMode="noise"
                                    gridSize={2}
                                    threshold={0.42}
                                    contrast={1.5}
                                    animated={true}
                                    animationSpeed={0.01}
                                />
                            </div>
                            <div className="relative z-10 w-10 h-10 mx-auto mb-3 group-hover:scale-110 transition-transform">
                                <DitherShader
                                    src={iconSvgs.mic}
                                    colorMode="duotone"
                                    primaryColor="#020617"
                                    secondaryColor="#10b981"
                                    ditherMode="noise"
                                    gridSize={2}
                                    threshold={0.42}
                                    contrast={1.5}
                                    animated={true}
                                    animationSpeed={0.01}
                                />
                            </div>
                            <div className="relative z-10 heading-h4 text-white">Speakers</div>
                            <div className="relative z-10 text-caption">Industry Events</div>
                        </div>
                    </div>
                </InfiniteCarousel>
            </section>

            {/* Brand Ecosystem */}
            <section
                className="py-8 lg:py-16 relative overflow-hidden"
                style={{
                    background: '#020617',
                    zIndex: 10
                }}
            >
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="heading-h1 text-white mb-6 text-center">
                        Brand Ecosystem
                    </h2>
                    <p className="text-subheader text-center mb-12 max-w-2xl mx-auto">
                        Beyond BYLT Media, we've built specialized brands to serve specific industries and communities
                    </p>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* BookedUp Media */}
                        <a
                            href="https://bookedupmedia.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative rounded-2xl border border-slate-800 overflow-hidden hover:border-cyan-500/50 transition-all duration-300"
                        >
                            {/* Image */}
                            <div className="aspect-[16/9] overflow-hidden">
                                <img
                                    src="/images/ecosystem/booked.webp"
                                    alt="BookedUp Media"
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                            {/* Content */}
                            <div className="p-6 bg-slate-950">
                                <div className="flex items-center justify-between mb-4">
                                    <img
                                        src="/images/ecosystem/transparent-bookedupmedia.png"
                                        alt="BookedUp Media Logo"
                                        className="h-10 object-contain"
                                    />
                                    <MovingBorderButton as="div" variant="tag" color="cyan">
                                        <p className='text-label-sm'>hospitality marketing</p>
                                    </MovingBorderButton>
                                </div>
                                <p className="text-body-lg leading-relaxed mb-4">
                                    Our dedicated hospitality marketing agency focuses exclusively on restaurants, hotels, bars, and entertainment venues.
                                </p>
                                <span className="inline-flex items-center gap-2 text-base font-semibold text-white group-hover:text-cyan-400 transition-colors duration-300">
                                    <span>Explore BookedUp</span>
                                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                                </span>
                            </div>
                        </a>

                        {/* SEM Stories */}
                        <a
                            href="https://www.semstories.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative rounded-2xl border border-slate-800 overflow-hidden hover:border-purple-500/50 transition-all duration-300"
                        >
                            {/* Image */}
                            <div className="aspect-[16/9] overflow-hidden">
                                <img
                                    src="/images/ecosystem/sem.webp"
                                    alt="SEM Stories Events"
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                            {/* Content */}
                            <div className="p-6 bg-slate-950">
                                <div className="flex items-center justify-between mb-4">
                                    <img
                                        src="/images/ecosystem/semstori.webp"
                                        alt="SEM Stories Logo"
                                        className="h-10 object-contain"
                                    />
                                    <MovingBorderButton as="div" variant="tag" color="purple">
                                         <p className='text-label-sm'>Marketing Events</p>
                                    </MovingBorderButton>
                                </div>
                                <p className="text-body-lg leading-relaxed mb-4">
                                    Our signature marketing event series in Edinburgh brings together industry professionals, thought leaders, and innovators.
                                </p>
                                <span className="inline-flex items-center gap-2 text-base font-semibold text-white group-hover:text-purple-400 transition-colors duration-300">
                                    <span>Discover SEM Stories</span>
                                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                                </span>
                            </div>
                        </a>
                    </div>
                </div>
            </section>

            {/* Developed By Section */}
            <section
                className="py-16 relative overflow-hidden"
                style={{
                    background: '#020617',
                    zIndex: 10
                }}
            >
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <p className="text-label mb-6">
                            Designed and Developed by
                        </p>
                        <div className="inline-flex items-center gap-4 p-6 rounded-xl border border-slate-800 bg-slate-950 hover:border-purple-500/50 transition-all duration-300 group">
                            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-purple-500/30 group-hover:border-purple-400/60 transition-colors flex-shrink-0">
                                <DitherShader
                                    src="/Matteo.jpg"
                                    colorMode="duotone"
                                    primaryColor="#020617"
                                    secondaryColor="#a855f7"
                                    ditherMode="halftone"
                                    gridSize={3}
                                    threshold={0.45}
                                    contrast={1.3}
                                />
                            </div>
                            <div className="text-left">
                                <h4 className="heading-h4 text-white group-hover:text-purple-400 transition-colors">Matteo Marconi</h4>
                                <p className="text-caption">Web Developer</p>
                            </div>
                            <a
                                href="https://www.linkedin.com/in/matteomarconi/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="ml-4 text-slate-400 hover:text-purple-400 transition-colors"
                            >
                                <Linkedin className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <CTASectionCard
                title="Ready to Work Together?"
                description="Let's discuss how we can help grow your business with data-driven digital marketing."
                buttonText="Get Free Audit"
            />
        </Layout>
    );
}
