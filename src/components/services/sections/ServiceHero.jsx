import React from 'react';
import { motion } from 'motion/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import ShaderBackground from '../../home/ShaderBackground';
import { FeatureCard, ProcessCard, MainCard } from '../cards';
import RotatingText from './RotatingText';

const ServiceHero = ({ service }) => {
    return (
        <section className='z-90 relative '>
            {/* Shader Background */}
            <ShaderBackground />

            {/* Content */}
            <div className="relative z-20 text-white max-w-6xl mx-auto px-4 py-16 md:py-20 lg:py-24">
                {/* Service Intro */}
                <div className="text-center mb-14 md:mb-20">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold font-inter leading-[1.3]"
                    >
                        {/* Mobile - shorter phrases */}
                        <span className="block md:hidden text-5xl mt-4">
                            <RotatingText
                                phrases={service.rotatingPhrasesMobile || service.rotatingPhrases}
                                className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent pb-4 animate-gradient"
                            />
                        </span>
                        {/* Tablet/Desktop - full phrases */}
                        <span className="hidden md:block md:text-6xl lg:text-7xl xl:text-8xl mt-6">
                            <RotatingText
                                phrases={service.rotatingPhrases}
                                className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent pb-4 animate-gradient"
                            />
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-base md:text-lg text-slate-400 max-w-2xl mx-auto mt-6 md:mt-8"
                    >
                        {service.description}
                    </motion.p>
                </div>

                {/* Bento Grid - Desktop */}
                <div className="hidden md:grid grid-cols-2 gap-4">
                    {/* Left Column - Main Card with Image */}
                    <MainCard service={service} />

                    {/* Right Column - 3 Feature Cards */}
                    <div className="flex flex-col gap-4 h-full">
                        <div className="grid grid-rows-3 gap-4 flex-1">
                            {service.features.map((feature, index) => (
                                <FeatureCard
                                    key={index}
                                    feature={feature}
                                    index={index}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Mobile Layout */}
                <div className="md:hidden space-y-6">
                    {/* Main Card */}
                    <MainCard service={service} />

                    {/* Features - Vertical Stack */}
                    <div>
                        <div className="text-center mb-3">
                            <span className="text-xs tracking-[0.2em] text-slate-500 uppercase">Our Features</span>
                        </div>
                        <div className="space-y-3">
                            {service.features.map((feature, index) => (
                                <FeatureCard
                                    key={index}
                                    feature={feature}
                                    index={index}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Process Swiper */}
                    <div>
                        <div className="text-center mb-3">
                            <span className="md:hidden text-xs tracking-[0.2em] text-slate-500 uppercase">Our Process</span>
                        </div>
                        <div className="-mx-4 px-4">
                            <Swiper
                                spaceBetween={12}
                                slidesPerView={1.15}
                            >
                                {service.process.slice(0, 3).map((step, index) => (
                                    <SwiperSlide key={`process-${step.step}`}>
                                        <ProcessCard
                                            step={step}
                                            index={index}
                                        />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </div>
                </div>

                {/* Process Row - Desktop Grid */}
                <div className="hidden md:block mt-4">
                    <div className="grid grid-cols-3 gap-4">
                        {service.process.slice(0, 3).map((step, index) => (
                            <ProcessCard
                                key={step.step}
                                step={step}
                                index={index}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ServiceHero;
