import Head from 'next/head';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import React, { useEffect, useState, useRef } from 'react';
import Layout from '../components/layout';
import ShaderBackgroundStandalone from '../components/home/ShaderBackgroundStandalone';
import { DitherShader } from '../components/ui/dither-shader';
import { Linkedin, Award, Briefcase, TrendingUp, Mic, Globe, Users } from 'lucide-react';
import { MovingBorderButton } from '@/components/ui/moving-border-button';
import CTASectionCard from '@/components/ui/CTASectionCard';
import ShaderBackground from '../components/home/ShaderBackground';
import { cn } from '@/lib/utils';
import { useCountUp } from '../hooks/useCountUp';
import { InfiniteMovingCards } from '@/components/ui/infinite-moving-cards';
import BrandMarquee from '@/components/caseStudies/sections/template/BrandMarquee';
import FeaturesAccordion from '@/components/services/cards/FeaturesAccordion';
import AboutGrowthChart from '@/components/about/AboutGrowthChart';

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
            <section className="about-page-hero px-4">
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

            {/* Brand Marquee - Sticky Reveal Section */}
            <section className="about-reveal-section">
                <BrandMarquee text="BYLT FOR GROWTH" className="pb-2" />
            </section>

            {/* What Sets Us Apart */}
            <section className="about-apart-section">
                <div className="about-apart-container">
                    {/* Accordion + Quote */}
                    <div className="grid lg:grid-cols-2 gap-8 items-center mb-12">
                        {/* Accordion */}
                        <FeaturesAccordion
                            headline="What Sets Us Apart"
                            description="We're not your typical agency. Here's what makes working with us different."
                            features={[
                                {
                                    title: "We think like business owners",
                                    description: "Because we are. We understand the pressure of making every pound count. Our recommendations are always tied to real business outcomes, not vanity metrics."
                                },
                                {
                                    title: "No black boxes",
                                    description: "You'll always know exactly what we're doing and why. We share our strategies, explain our decisions, and welcome your questions."
                                },
                                {
                                    title: "Long-term partnerships",
                                    description: "We're not interested in short-term gains that don't last. We build sustainable growth systems that continue delivering results year after year."
                                }
                            ]}
                        />

                        {/* Growth Chart Visual */}
                        <AboutGrowthChart />
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <AnimatedStat
                            value={10}
                            prefix="£"
                            suffix="M+"
                            label="Ad Spend Managed"
                            delay={0}
                        />
                        <AnimatedStat
                            value={150}
                            suffix="%"
                            label="Average ROI"
                            delay={100}
                        />
                        <AnimatedStat
                            value={95}
                            suffix="%"
                            label="Client Retention"
                            delay={200}
                        />
                        <AnimatedStat
                            value={50}
                            suffix="+"
                            label="Brands Scaled"
                            delay={300}
                        />
                    </div>
                </div>
            </section>

            {/* Founders Section */}
            <section className="about-founders-section">
                <div className="about-founders-container">
                    <h2 className="heading-h1 text-white mb-6 text-center md:text-left">
                        Meet Our Founders
                    </h2>
                    <p className="text-subheader md:text-left text-center mb-12 max-w-2xl">
                        The team behind your success
                    </p>

                    <div className="grid md:grid-cols-2 gap-8 mb-16 md:mb-20">
                        {/* Teodor */}
                        <div
                            className="group relative p-8 rounded-2xl border border-slate-800 bg-slate-950 backdrop-blur-sm overflow-hidden hover:border-cyan-500/50 transition-all duration-300"
                            style={{ boxShadow: '6px 6px 0px rgba(34, 211, 238, 0.8)' }}
                        >
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
                        <div
                            className="group relative p-8 rounded-2xl border border-slate-800 bg-slate-950 backdrop-blur-sm overflow-hidden hover:border-purple-500/50 transition-all duration-300"
                            style={{ boxShadow: '6px 6px 0px rgba(168, 85, 247, 0.8)' }}
                        >
                            <div className="relative z-10">
                                <div className="text-center mb-6">
                                    <div className="w-28 h-28 rounded-full mx-auto mb-6 overflow-hidden border-2 border-purple-500/30 group-hover:border-purple-400/60 transition-colors">
                                        <img
                                            src="/images/About/profilepic.png"
                                            alt="Lorenzo Bonari"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <h3 className="heading-h3 text-white mb-1 group-hover:text-purple-400 transition-colors">
                                        Lorenzo Bonari
                                    </h3>
                                    <p className="text-purple-400 font-medium mb-4">Co-Founder</p>
                                    <a
                                        href="https://www.linkedin.com/in/lorenzobonari/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 text-slate-400 hover:text-purple-400 transition-colors"
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

                </div>

                {/* Founder Credentials - Carousel */}
                <InfiniteMovingCards
                    className="py-4"
                    direction="right"
                    speed="slow"
                    oscillate={true}
                    oscillateAmplitude={10}
                    oscillateSpeed={0.025}
                    items={[
                        { id: 'certified', Icon: Award, color: 'text-cyan-400', title: 'Certified', subtitle: 'Google & Meta' },
                        { id: 'fortune500', Icon: Briefcase, color: 'text-purple-400', title: 'Fortune 500', subtitle: 'Clients' },
                        { id: 'managed', Icon: TrendingUp, color: 'text-blue-400', title: '£10M+', subtitle: 'Managed' },
                        { id: 'speakers', Icon: Mic, color: 'text-emerald-400', title: 'Speakers', subtitle: 'Events' },
                        { id: 'global', Icon: Globe, color: 'text-cyan-400', title: 'Global', subtitle: 'Reach' },
                        { id: 'clients', Icon: Users, color: 'text-purple-400', title: '50+', subtitle: 'Clients' },
                    ]}
                    renderItem={(item) => (
                        <div className="text-center px-8">
                            <item.Icon className={`w-7 h-7 mx-auto mb-2 ${item.color}`} />
                            <div className="text-white font-semibold text-base">{item.title}</div>
                            <div className="text-slate-500 text-sm">{item.subtitle}</div>
                        </div>
                    )}
                />
            </section>

            {/* Brand Ecosystem */}
            <section className="about-ecosystem-section">
                <div className="about-ecosystem-container">
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
            <section className="about-developer-section">
                <div className="about-developer-container">
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
