import Head from 'next/head';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import Layout from '../components/layout';
import ShaderBackgroundStandalone from '../components/home/ShaderBackgroundStandalone';
import { DitherShader } from '../components/ui/dither-shader';
import { MoveRight, Linkedin, GraduationCap, Trophy, Target, Users, Code, Check, MapPin, Globe, ExternalLink, Calendar, Award, Briefcase, TrendingUp, Mic } from 'lucide-react';
import { MovingBorderButton } from '@/components/ui/moving-border-button';

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
                className="relative flex flex-col overflow-hidden service-page"
                style={{
                    background: '#020617',
                    zIndex: 10
                }}
            >
                <div className='service-page relative'>
                <ShaderBackgroundStandalone onReady={signalPageReady} />

                <div className="relative z-20 text-white max-w-6xl mx-auto px-4 pb-16 lg:pb-24 flex-1 flex flex-col justify-center max-lg:pt-16">
                    {/* Text + Torus side by side */}
                    <div className="relative grid lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-20">
                        {/* Torus come sfondo su mobile/tablet */}
                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 lg:hidden opacity-30 pointer-events-none">
                            <div className="w-[450px] h-[450px]">
                                <Torus3D />
                            </div>
                        </div>

                        <div className="relative z-10 text-center lg:text-left">
                            <h1 className="text-3xl md:text-4xl font-bold mb-6 font-inter">
                                <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                                    Our Story
                                </span>
                            </h1>
                            <p className="text-lg text-gray-300 leading-relaxed mb-4">
                                BYLT Media was founded with a simple mission: to help businesses thrive in the digital age.
                                With over a decade of combined experience in performance marketing, we've helped brands
                                of all sizes achieve measurable growth.
                            </p>
                            <p className="text-lg text-gray-300 leading-relaxed">
                                From startups to Fortune 500 companies, we bring the same level of dedication,
                                strategic thinking, and data-driven approach to every project.
                            </p>
                        </div>

                        {/* Torus visibile solo su desktop */}
                        <div className="hidden lg:block relative h-[350px] overflow-hidden">
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-[500px] h-[500px]">
                                    <Torus3D />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Why Choose BYLT Media */}
                    <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                        {/* Stats - sotto su mobile/tablet, a sinistra su desktop */}
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-2 gap-6 md:gap-4 lg:gap-8 order-2 lg:order-1 max-lg:pt-8">
                            <div className="text-center group">
                                <div className="flex items-center justify-center gap-2 lg:flex-col lg:gap-0">
                                    <GraduationCap className="w-5 h-5 lg:w-8 lg:h-8 lg:mb-3 text-cyan-400 group-hover:scale-110 transition-transform" />
                                    <div className="text-2xl lg:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">10+</div>
                                </div>
                                <div className="text-gray-400 text-sm mt-1 lg:mt-0">Years Experience</div>
                            </div>
                            <div className="text-center group">
                                <div className="flex items-center justify-center gap-2 lg:flex-col lg:gap-0">
                                    <MapPin className="w-5 h-5 lg:w-8 lg:h-8 lg:mb-3 text-cyan-400 group-hover:scale-110 transition-transform" />
                                    <div className="text-2xl lg:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">2</div>
                                </div>
                                <div className="text-gray-400 text-sm mt-1 lg:mt-0">UK Offices</div>
                            </div>
                            <div className="text-center group">
                                <div className="flex items-center justify-center gap-2 lg:flex-col lg:gap-0">
                                    <Globe className="w-5 h-5 lg:w-8 lg:h-8 lg:mb-3 text-cyan-400 group-hover:scale-110 transition-transform" />
                                    <div className="text-2xl lg:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Global</div>
                                </div>
                                <div className="text-gray-400 text-sm mt-1 lg:mt-0">Reach</div>
                            </div>
                            <div className="text-center group">
                                <div className="flex items-center justify-center gap-2 lg:flex-col lg:gap-0">
                                    <Target className="w-5 h-5 lg:w-8 lg:h-8 lg:mb-3 text-cyan-400 group-hover:scale-110 transition-transform" />
                                    <div className="text-2xl lg:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">100%</div>
                                </div>
                                <div className="text-gray-400 text-sm mt-1 lg:mt-0">Data-Driven</div>
                            </div>
                        </div>

                        {/* Testo - sopra su mobile/tablet, a destra su desktop */}
                        <div className="text-center lg:text-left order-1 lg:order-2">
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 font-inter">
                                Why Choose <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">BYLT Media</span>?
                            </h2>
                            <p className="text-lg text-gray-300 leading-relaxed mb-4">
                                With over a decade of proven expertise, we combine strategic thinking with
                                data-driven execution to deliver measurable results.
                            </p>
                            <p className="text-lg text-gray-300 leading-relaxed">
                                From our offices in London and Edinburgh, we help brands expand globally
                                while maintaining the local expertise that drives real growth.
                            </p>
                        </div>
                    </div>
                </div>
                </div>
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
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-16 font-inter text-center">
                        Meet Our Founders
                    </h2>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Teodor */}
                        <div className="group p-8 rounded-2xl border border-gray-800 bg-slate-900/50 backdrop-blur-sm hover:border-cyan-500/50 transition-all duration-300">
                            <div className="text-center mb-6">
                                <div className="w-28 h-28 rounded-full mx-auto mb-6 overflow-hidden border-2 border-cyan-500/30 group-hover:border-cyan-400/60 transition-colors">
                                    <img
                                        src="/images/About/teodor.webp"
                                        alt="Teodor Yordanov"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors">
                                    Teodor Yordanov
                                </h3>
                                <p className="text-cyan-400 font-medium mb-4">Co-Founder</p>
                                <a
                                    href="https://www.linkedin.com/in/teodoryordanov/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors"
                                >
                                    <Linkedin className="w-4 h-4" />
                                    <span>LinkedIn</span>
                                </a>
                            </div>
                            <p className="text-gray-400 leading-relaxed text-center">
                                Over 10 years of deep expertise in digital marketing and business strategy.
                                Proven track record managing multi-million pound campaigns and mentoring teams across diverse industries.
                            </p>
                        </div>

                        {/* Lorenzo */}
                        <div className="group p-8 rounded-2xl border border-gray-800 bg-slate-900/50 backdrop-blur-sm hover:border-cyan-500/50 transition-all duration-300">
                            <div className="text-center mb-6">
                                <div className="w-28 h-28 rounded-full mx-auto mb-6 overflow-hidden border-2 border-cyan-500/30 group-hover:border-cyan-400/60 transition-colors">
                                    <img
                                        src="/images/About/profilepic.png"
                                        alt="Lorenzo Bonari"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors">
                                    Lorenzo Bonari
                                </h3>
                                <p className="text-cyan-400 font-medium mb-4">Co-Founder</p>
                                <a
                                    href="https://www.linkedin.com/in/lorenzobonari/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors"
                                >
                                    <Linkedin className="w-4 h-4" />
                                    <span>LinkedIn</span>
                                </a>
                            </div>
                            <p className="text-gray-400 leading-relaxed text-center">
                                10+ years in digital marketing, from web development to paid media specialisation.
                                Successfully managed Fortune 500 clients and led international expansion strategies for global brands.
                            </p>
                        </div>
                    </div>

                    {/* Founder Credentials */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16">
                        <div className="p-6 rounded-xl border border-gray-800 bg-slate-900/50 text-center group hover:border-cyan-500/50 transition-all duration-300">
                            <Award className="w-6 h-6 mb-3 mx-auto text-cyan-400 group-hover:scale-110 transition-transform" />
                            <div className="text-white font-bold">Certified</div>
                            <div className="text-gray-500 text-sm">Google & Meta</div>
                        </div>
                        <div className="p-6 rounded-xl border border-gray-800 bg-slate-900/50 text-center group hover:border-cyan-500/50 transition-all duration-300">
                            <Briefcase className="w-6 h-6 mb-3 mx-auto text-cyan-400 group-hover:scale-110 transition-transform" />
                            <div className="text-white font-bold">Fortune 500</div>
                            <div className="text-gray-500 text-sm">Client Portfolio</div>
                        </div>
                        <div className="p-6 rounded-xl border border-gray-800 bg-slate-900/50 text-center group hover:border-cyan-500/50 transition-all duration-300">
                            <TrendingUp className="w-6 h-6 mb-3 mx-auto text-cyan-400 group-hover:scale-110 transition-transform" />
                            <div className="text-white font-bold">£10M+</div>
                            <div className="text-gray-500 text-sm">Managed</div>
                        </div>
                        <div className="p-6 rounded-xl border border-gray-800 bg-slate-900/50 text-center group hover:border-cyan-500/50 transition-all duration-300">
                            <Mic className="w-6 h-6 mb-3 mx-auto text-cyan-400 group-hover:scale-110 transition-transform" />
                            <div className="text-white font-bold">Speakers</div>
                            <div className="text-gray-500 text-sm">Industry Events</div>
                        </div>
                    </div>
                </div>
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
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 font-inter text-center">
                        Brand Ecosystem
                    </h2>
                    <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
                        Beyond BYLT Media, we've built specialized brands to serve specific industries and communities
                    </p>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* BookedUp Media */}
                        <div className="group p-8 rounded-2xl border border-gray-800 bg-slate-900/50 backdrop-blur-sm hover:border-cyan-500/50 transition-all duration-300">
                            <div className="mb-6">
                                <img
                                    src="/images/ecosystem/transparent-bookedupmedia.png"
                                    alt="BookedUp Media"
                                    className="h-12 object-contain mb-2"
                                />
                                <p className="text-cyan-400 text-sm">Hospitality Marketing Specialists</p>
                            </div>
                            <p className="text-gray-400 leading-relaxed mb-6">
                                Our dedicated hospitality marketing agency focuses exclusively on restaurants, hotels, bars, and entertainment venues.
                                We understand the unique challenges of the hospitality industry and provide specialized strategies to drive bookings and increase customer loyalty.
                            </p>
                            <a
                                href="https://bookedupmedia.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors font-medium"
                            >
                                <span>Visit Website</span>
                                <ExternalLink className="w-4 h-4" />
                            </a>
                        </div>

                        {/* SEM Stories */}
                        <div className="group p-8 rounded-2xl border border-gray-800 bg-slate-900/50 backdrop-blur-sm hover:border-purple-500/50 transition-all duration-300">
                            <div className="mb-6">
                                <img
                                    src="/images/ecosystem/semstori.webp"
                                    alt="SEM Stories"
                                    className="h-12 object-contain mb-2"
                                />
                                <p className="text-purple-400 text-sm">Edinburgh Marketing Events</p>
                            </div>
                            <p className="text-gray-400 leading-relaxed mb-6">
                                Our signature marketing event series in Edinburgh brings together industry professionals, thought leaders, and innovators.
                                SEM Stories creates a platform for knowledge sharing, networking, and celebrating the evolution of digital marketing.
                            </p>
                            <a
                                href="https://www.semstories.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors font-medium"
                            >
                                <span>Visit Website</span>
                                <ExternalLink className="w-4 h-4" />
                            </a>
                        </div>
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
                        <p className="text-gray-500 text-sm uppercase tracking-widest mb-6">
                            Designed and Developed by
                        </p>
                        <div className="inline-flex items-center gap-4 p-6 rounded-xl border border-gray-800 bg-slate-900/50 hover:border-purple-500/50 transition-all duration-300 group">
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
                                <h4 className="text-white font-bold group-hover:text-purple-400 transition-colors">Matteo Marconi</h4>
                                <p className="text-gray-500 text-sm">Web Developer</p>
                            </div>
                            <a
                                href="https://www.linkedin.com/in/matteomarconi/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="ml-4 text-gray-400 hover:text-purple-400 transition-colors"
                            >
                                <Linkedin className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section
                className="py-12 lg:py-24  relative overflow-hidden max-sm:pb-24"
                style={{
                    background: '#020617',
                    zIndex: 10
                }}
            >
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 font-inter">
                        Ready to Work Together?
                    </h2>
                    <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
                        Let's discuss how we can help grow your business with data-driven digital marketing.
                    </p>
                    <div className="relative z-10 flex justify-center w-full pt-8 pb-8">
                                        <MovingBorderButton
                                            type="submit"
                                            borderRadius="0.75rem"
                                            containerClassName="min-w-[240px] h-16"
                                            borderClassName="h-24 w-24 bg-[radial-gradient(circle,#06b6d4_20%,#3b82f6_40%,#8b5cf6_60%,transparent_80%)] opacity-100"
                                            className="border-2 border-slate-700/80 text-white font-bold text-base disabled:opacity-50 disabled:cursor-not-allowed bg-slate-950"
                                            duration={2500}
                                        >
                                            Get Free Audit
                                        </MovingBorderButton>
                                    </div>
                </div>
            </section>
        </Layout>
    );
}
