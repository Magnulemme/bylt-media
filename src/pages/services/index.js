import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/layout';
import ShaderBackground from '../../components/home/ShaderBackground';
import { services } from '../../components/services';
import { MoveRight } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

// Icon resolver - converts string name to Lucide component
const getIcon = (iconName) => {
    const Icon = LucideIcons[iconName];
    return Icon || LucideIcons.Circle;
};

export default function ServicesIndex() {
    const serviceList = Object.values(services);

    return (
        <Layout>
            <Head>
                <title>Our Services - BYLT Media</title>
                <meta name="description" content="Explore our comprehensive digital marketing services including Paid Search, SEO, Social Media, Web Development, Analytics, and Email Marketing." />
                <link rel="canonical" href="https://www.byltmedia.com/services" />
            </Head>

            {/* Hero Section */}
            <section
                className="relative min-h-[60vh] flex flex-col overflow-hidden"
                style={{
                    background: '#020617',
                    zIndex: 10
                }}
            >
                {/* Shader Background - starts below navbar */}
                <ShaderBackground
                    style={{
                        top: '6rem',
                        height: 'calc(100% - 6rem)'
                    }}
                />

                <div className="relative z-20 text-center text-white max-w-5xl mx-auto px-4 py-16 lg:py-24 flex-1 flex flex-col justify-center">
                    <div className="text-xs tracking-widest text-gray-400 mb-4 font-inter uppercase">
                        BYLT.MEDIA // SERVICES
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 font-inter">
                        <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                            Our Services
                        </span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                        Comprehensive digital solutions to drive your business growth
                    </p>
                </div>
            </section>

            {/* Services Grid */}
            <section
                className="py-24 relative overflow-hidden"
                style={{
                    background: '#020617',
                    zIndex: 10
                }}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {serviceList.map((service) => {
                            const iconName = service.features[0]?.icon;
                            const Icon = iconName ? getIcon(iconName) : null;
                            return (
                                <Link
                                    key={service.slug}
                                    href={`/services/${service.slug}`}
                                    className="group p-8 rounded-2xl border border-gray-800 bg-slate-900/50 backdrop-blur-sm hover:border-cyan-500/50 transition-all duration-300 hover:-translate-y-2 block"
                                >
                                    {Icon && (
                                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 flex items-center justify-center mb-6 group-hover:from-cyan-500/30 group-hover:to-blue-600/30 transition-all duration-300">
                                            <Icon className="w-7 h-7 text-cyan-400" />
                                        </div>
                                    )}
                                    <p className="text-sm text-cyan-400 font-medium mb-2">{service.subtitle}</p>
                                    <h2 className="text-2xl font-bold text-white mb-3 font-inter group-hover:text-cyan-400 transition-colors">
                                        {service.title}
                                    </h2>
                                    <p className="text-gray-400 leading-relaxed mb-4">
                                        {service.description}
                                    </p>
                                    <div className="flex items-center gap-2 text-cyan-400 font-semibold group-hover:gap-3 transition-all">
                                        <span>Learn More</span>
                                        <MoveRight className="w-4 h-4" />
                                    </div>
                                </Link>
                            );
                        })}
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
                        Not Sure Where to Start?
                    </h2>
                    <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
                        Get a free audit and we'll help you identify the best opportunities for growth.
                    </p>
                    <a
                        href="/free-audit"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 hover:scale-105"
                    >
                        <span>Get Free Audit</span>
                        <MoveRight className="w-5 h-5" />
                    </a>
                </div>
            </section>
        </Layout>
    );
}
