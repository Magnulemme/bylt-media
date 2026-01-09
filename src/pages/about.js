import Head from 'next/head';
import dynamic from 'next/dynamic';
import Layout from '../components/layout';
import ShaderBackground from '../components/home/ShaderBackground';
import { MoveRight, Linkedin, GraduationCap, Trophy, Target, Users, Code, Check, MapPin, Globe, ExternalLink, Calendar } from 'lucide-react';

const Torus3D = dynamic(() => import('../components/about/Torus3D'), { ssr: false });

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
                className="relative min-h-screen flex flex-col overflow-hidden"
                style={{
                    background: '#020617',
                    zIndex: 10
                }}
            >
                <ShaderBackground
                    style={{
                        top: '6rem',
                        height: 'calc(100% - 6rem)'
                    }}
                />

                <div className="relative z-20 text-white max-w-6xl mx-auto px-4 pt-32 lg:pt-40 pb-16 lg:pb-24 flex-1 flex flex-col justify-center">
                    {/* Title */}
                    <h1 className="text-4xl md:text-6xl font-bold mb-16 font-inter text-center">
                        <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                            Our Story
                        </span>
                    </h1>

                    {/* Text + Torus side by side */}
                    <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
                        <div className="text-center lg:text-left">
                            <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-6">
                                BYLT Media was founded with a simple mission: to help businesses thrive in the digital age.
                                With over a decade of combined experience in performance marketing, we've helped brands
                                of all sizes achieve measurable growth.
                            </p>
                            <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                                From startups to Fortune 500 companies, we bring the same level of dedication,
                                strategic thinking, and data-driven approach to every project.
                            </p>
                        </div>
                        <div className="hidden lg:flex items-center justify-center h-[300px]">
                            <Torus3D />
                        </div>
                    </div>

                    {/* Why Choose BYLT Media */}
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 font-inter text-center">
                        Why Choose BYLT Media?
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6 text-left max-w-4xl mx-auto">
                        <div className="flex items-start gap-4 p-6 rounded-xl border border-gray-800 bg-slate-900/50 hover:border-cyan-500/50 transition-all duration-300 group">
                            <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-cyan-500/30 transition-colors">
                                <GraduationCap className="w-5 h-5 text-cyan-400" />
                            </div>
                            <div>
                                <h3 className="text-white font-bold mb-1">10+ years of proven experience</h3>
                                <p className="text-gray-500 text-sm">Industry expertise that delivers results</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4 p-6 rounded-xl border border-gray-800 bg-slate-900/50 hover:border-cyan-500/50 transition-all duration-300 group">
                            <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-cyan-500/30 transition-colors">
                                <MapPin className="w-5 h-5 text-cyan-400" />
                            </div>
                            <div>
                                <h3 className="text-white font-bold mb-1">Strategic offices in London & Edinburgh</h3>
                                <p className="text-gray-500 text-sm">UK presence with global capabilities</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4 p-6 rounded-xl border border-gray-800 bg-slate-900/50 hover:border-cyan-500/50 transition-all duration-300 group">
                            <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-cyan-500/30 transition-colors">
                                <Globe className="w-5 h-5 text-cyan-400" />
                            </div>
                            <div>
                                <h3 className="text-white font-bold mb-1">Global reach with local expertise</h3>
                                <p className="text-gray-500 text-sm">International expansion specialists</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4 p-6 rounded-xl border border-gray-800 bg-slate-900/50 hover:border-cyan-500/50 transition-all duration-300 group">
                            <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-cyan-500/30 transition-colors">
                                <Target className="w-5 h-5 text-cyan-400" />
                            </div>
                            <div>
                                <h3 className="text-white font-bold mb-1">Data-driven strategies</h3>
                                <p className="text-gray-500 text-sm">Measurable results, not vanity metrics</p>
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

                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16">
                        <div className="p-6 rounded-xl border border-gray-800 bg-slate-900/50 text-center group hover:border-cyan-500/50 transition-all duration-300">
                            <GraduationCap className="w-6 h-6 mb-3 mx-auto text-cyan-400 group-hover:scale-110 transition-transform" />
                            <div className="text-white font-bold">10+ Years</div>
                            <div className="text-gray-500 text-sm">Experience</div>
                        </div>
                        <div className="p-6 rounded-xl border border-gray-800 bg-slate-900/50 text-center group hover:border-cyan-500/50 transition-all duration-300">
                            <Trophy className="w-6 h-6 mb-3 mx-auto text-cyan-400 group-hover:scale-110 transition-transform" />
                            <div className="text-white font-bold">Global Brands</div>
                            <div className="text-gray-500 text-sm">Enterprise Clients</div>
                        </div>
                        <div className="p-6 rounded-xl border border-gray-800 bg-slate-900/50 text-center group hover:border-cyan-500/50 transition-all duration-300">
                            <Target className="w-6 h-6 mb-3 mx-auto text-cyan-400 group-hover:scale-110 transition-transform" />
                            <div className="text-white font-bold">ROI Focused</div>
                            <div className="text-gray-500 text-sm">Data-Driven</div>
                        </div>
                        <div className="p-6 rounded-xl border border-gray-800 bg-slate-900/50 text-center group hover:border-cyan-500/50 transition-all duration-300">
                            <Users className="w-6 h-6 mb-3 mx-auto text-cyan-400 group-hover:scale-110 transition-transform" />
                            <div className="text-white font-bold">Team Leaders</div>
                            <div className="text-gray-500 text-sm">Mentors</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Brand Ecosystem */}
            <section
                className="py-24 relative overflow-hidden"
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
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 flex items-center justify-center group-hover:from-cyan-500/30 group-hover:to-blue-600/30 transition-all">
                                    <img
                                        src="/images/About/bookedup-logo.png"
                                        alt="BookedUp Media"
                                        className="w-10 h-10 object-contain"
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                            e.target.parentElement.innerHTML = '<span class="text-2xl font-bold text-cyan-400">B</span>';
                                        }}
                                    />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                                        BookedUp Media
                                    </h3>
                                    <p className="text-cyan-400 text-sm">Hospitality Marketing Specialists</p>
                                </div>
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
                        <div className="group p-8 rounded-2xl border border-gray-800 bg-slate-900/50 backdrop-blur-sm hover:border-cyan-500/50 transition-all duration-300">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-600/20 flex items-center justify-center group-hover:from-purple-500/30 group-hover:to-pink-600/30 transition-all">
                                    <Calendar className="w-7 h-7 text-purple-400" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors">
                                        SEM Stories
                                    </h3>
                                    <p className="text-purple-400 text-sm">Edinburgh Marketing Events</p>
                                </div>
                            </div>
                            <p className="text-gray-400 leading-relaxed mb-6">
                                Our signature marketing event series in Edinburgh brings together industry professionals, thought leaders, and innovators.
                                SEM Stories creates a platform for knowledge sharing, networking, and celebrating the evolution of digital marketing.
                            </p>
                            <a
                                href="#"
                                className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors font-medium"
                            >
                                <span>Learn More</span>
                                <MoveRight className="w-4 h-4" />
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
                        <p className="text-gray-500 text-sm uppercase tracking-widest mb-6">Developed by</p>
                        <div className="inline-flex items-center gap-4 p-6 rounded-xl border border-gray-800 bg-slate-900/50 hover:border-cyan-500/50 transition-all duration-300 group">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-600/20 flex items-center justify-center group-hover:from-cyan-500/30 group-hover:to-blue-600/30 transition-all">
                                <Code className="w-6 h-6 text-cyan-400" />
                            </div>
                            <div className="text-left">
                                <h4 className="text-white font-bold group-hover:text-cyan-400 transition-colors">Magnus Lemme</h4>
                                <p className="text-gray-500 text-sm">Web Developer</p>
                            </div>
                            <a
                                href="https://www.linkedin.com/in/magnuslemme/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="ml-4 text-gray-400 hover:text-cyan-400 transition-colors"
                            >
                                <Linkedin className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section
                className="py-24 relative overflow-hidden"
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
                    <a
                        href="/contact"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 hover:scale-105"
                    >
                        <span>Get in Touch</span>
                        <MoveRight className="w-5 h-5" />
                    </a>
                </div>
            </section>
        </Layout>
    );
}
