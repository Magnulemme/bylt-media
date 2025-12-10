import { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import useQuantumScrollAnim from '../../hooks/useQuantumScrollAnim';
import { Mail, MoveRight, X } from 'lucide-react';
import { BackgroundBeams } from '../ui/background-beams';
import { useFooterStore } from '../../store/footerStore';

const NeuralContact = () => {
    const sectionRef = useQuantumScrollAnim();
    const containerRef = useRef(null);
    const setScrollProgress = useFooterStore((state) => state.setScrollProgress);
    const footerHeight = useFooterStore((state) => state.footerHeight);
    const [viewportOffset, setViewportOffset] = useState(0);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        company: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    // Calcola viewport height - footerHeight
    useEffect(() => {
        const calculateOffset = () => {
            if (footerHeight > 0) {
                const offset = window.innerHeight - footerHeight;
                setViewportOffset(offset);
                console.log('📐 [NeuralContact] Viewport offset calculated:', {
                    offset: `${offset}px`,
                    windowHeight: `${window.innerHeight}px`,
                    footerHeight: `${footerHeight}px`,
                    formula: `${window.innerHeight} - ${footerHeight} = ${offset}`
                });
            }
        };

        calculateOffset();
        window.addEventListener('resize', calculateOffset);
        return () => window.removeEventListener('resize', calculateOffset);
    }, [footerHeight]);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: [
            "end end",                      // Inizia: bottom section = bottom viewport (progress = 0)
            `end ${viewportOffset}px`       // Finisce: bottom section = vh - footerHeight (progress = 1)
        ]
    });

    useTransform(scrollYProgress, (latest) => {
        if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const sectionBottom = rect.bottom;

            console.log('📊 [NeuralContact] Scroll Progress Update:', {
                rawProgress: latest.toFixed(4),
                progressPercentage: `${(latest * 100).toFixed(2)}%`,
                footerHeight: `${footerHeight}px`,
                viewportOffset: `${viewportOffset}px`,
                offsetStart: 'end end',
                offsetEnd: `end ${viewportOffset}px`,
                sectionBottom: `${sectionBottom.toFixed(0)}px`,
                windowHeight: `${windowHeight}px`,
                targetPosition: `${windowHeight - viewportOffset}px from bottom`,
                currentScale: (0.7 + (latest * 0.3)).toFixed(3)
            });
        }
        setScrollProgress(latest);
        return latest;
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            const subject = encodeURIComponent(`New Contact Form Submission from ${formData.firstName} ${formData.lastName}`);
            const body = encodeURIComponent(`
Name: ${formData.firstName} ${formData.lastName}
Email: ${formData.email}
Company: ${formData.company}

Message:
${formData.message}
            `);

            window.location.href = `mailto:info@byltmedia.com?subject=${subject}&body=${body}`;

            setSubmitStatus('success');
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                company: '',
                message: ''
            });
        } catch (error) {
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section 
            ref={containerRef} 
            id="contact" 
            className="pt-32 pb-24 relative overflow-hidden" 
            style={{ background: '#020617' }}
        >
            <BackgroundBeams className="absolute inset-0 z-0" />
            <div ref={sectionRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 quantum-anim">
                {/* Section Title */}
                <div className="flex items-center gap-3 mb-12">
                    <span className="text-cyan-400 font-mono text-sm tracking-wide">
                        7)
                    </span>
                    <span className="text-white font-mono text-sm tracking-wide">
                        Let's Build Your Future
                    </span>
                    <span className="text-gray-500 font-mono text-sm tracking-wide">
                        [Contact]
                    </span>
                </div>

                {/* Bridge Header */}
                <div className="text-center mb-16 max-w-4xl mx-auto">
                    <motion.h2
                        className="text-3xl md:text-5xl font-bold font-inter text-white mb-6"
                        initial={{ opacity: 0, filter: "blur(10px)" }}
                        whileInView={{ opacity: 1, filter: "blur(0px)" }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        They built their future with us.
                        <br />
                        <span className="text-cyan-400">Now it's your turn.</span>
                    </motion.h2>
                </div>

                {/* Contact Form Container */}
                <div className="relative max-w-3xl mx-auto mb-12">
                    <form 
                        onSubmit={handleSubmit} 
                        className="relative z-[2] bg-slate-900/80 backdrop-blur-xl border-2 border-cyan-400/30 rounded-2xl p-8 md:p-12 shadow-[8px_8px_0px_rgba(34,211,238,0.4)] transition-all duration-300 hover:shadow-[6px_6px_0px_rgba(34,211,238,0.4)] hover:translate-x-0.5 hover:translate-y-0.5"
                    >
                        {/* Form Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6">
                            {/* First Name */}
                            <div className="relative">
                                <label 
                                    htmlFor="firstName" 
                                    className="block font-inter text-sm font-semibold text-gray-200 mb-2 uppercase tracking-wider"
                                >
                                    First Name *
                                </label>
                                <input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-5 py-4 bg-slate-700/60 border-2 border-slate-500/30 rounded-lg text-gray-200 font-inter transition-all duration-300 backdrop-blur-lg placeholder:text-gray-400 focus:outline-none focus:border-cyan-400/60 focus:bg-slate-700/90 focus:shadow-[4px_4px_0px_rgba(34,211,238,0.2)] focus:-translate-x-0.5 focus:-translate-y-0.5"
                                    placeholder="Enter your first name"
                                />
                            </div>

                            {/* Last Name */}
                            <div className="relative">
                                <label 
                                    htmlFor="lastName" 
                                    className="block font-inter text-sm font-semibold text-gray-200 mb-2 uppercase tracking-wider"
                                >
                                    Last Name *
                                </label>
                                <input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-5 py-4 bg-slate-700/60 border-2 border-slate-500/30 rounded-lg text-gray-200 font-inter transition-all duration-300 backdrop-blur-lg placeholder:text-gray-400 focus:outline-none focus:border-cyan-400/60 focus:bg-slate-700/90 focus:shadow-[4px_4px_0px_rgba(34,211,238,0.2)] focus:-translate-x-0.5 focus:-translate-y-0.5"
                                    placeholder="Enter your last name"
                                />
                            </div>

                            {/* Email */}
                            <div className="relative">
                                <label 
                                    htmlFor="email" 
                                    className="block font-inter text-sm font-semibold text-gray-200 mb-2 uppercase tracking-wider"
                                >
                                    Email Address *
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-5 py-4 bg-slate-700/60 border-2 border-slate-500/30 rounded-lg text-gray-200 font-inter transition-all duration-300 backdrop-blur-lg placeholder:text-gray-400 focus:outline-none focus:border-cyan-400/60 focus:bg-slate-700/90 focus:shadow-[4px_4px_0px_rgba(34,211,238,0.2)] focus:-translate-x-0.5 focus:-translate-y-0.5"
                                    placeholder="your.email@company.com"
                                />
                            </div>

                            {/* Company */}
                            <div className="relative">
                                <label 
                                    htmlFor="company" 
                                    className="block font-inter text-sm font-semibold text-gray-200 mb-2 uppercase tracking-wider"
                                >
                                    Company
                                </label>
                                <input
                                    type="text"
                                    id="company"
                                    name="company"
                                    value={formData.company}
                                    onChange={handleInputChange}
                                    className="w-full px-5 py-4 bg-slate-700/60 border-2 border-slate-500/30 rounded-lg text-gray-200 font-inter transition-all duration-300 backdrop-blur-lg placeholder:text-gray-400 focus:outline-none focus:border-cyan-400/60 focus:bg-slate-700/90 focus:shadow-[4px_4px_0px_rgba(34,211,238,0.2)] focus:-translate-x-0.5 focus:-translate-y-0.5"
                                    placeholder="Your company name"
                                />
                            </div>
                        </div>

                        {/* Message */}
                        <div className="relative mb-8">
                            <label 
                                htmlFor="message" 
                                className="block font-inter text-sm font-semibold text-gray-200 mb-2 uppercase tracking-wider"
                            >
                                Message *
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleInputChange}
                                required
                                rows={6}
                                className="w-full px-5 py-4 bg-slate-700/60 border-2 border-slate-500/30 rounded-lg text-gray-200 font-inter transition-all duration-300 backdrop-blur-lg placeholder:text-gray-400 resize-y min-h-[120px] focus:outline-none focus:border-cyan-400/60 focus:bg-slate-700/90 focus:shadow-[4px_4px_0px_rgba(34,211,238,0.2)] focus:-translate-x-0.5 focus:-translate-y-0.5"
                                placeholder="Tell us about your project, goals, and how we can help you build your digital future..."
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-center">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="group relative inline-flex items-center justify-center h-14 px-8 min-w-[180px] font-semibold text-white bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500 bg-[length:200%_200%] animate-[gradient_3s_ease_infinite] border border-cyan-500/50 rounded-lg font-inter transition-all duration-300 hover:not-disabled:-translate-y-0.5 hover:not-disabled:shadow-[0_10px_30px_rgba(6,182,212,0.5)] disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-transparent border-t-slate-800 rounded-full animate-spin mr-3" />
                                        <span>Sending...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>Send Message</span>
                                        <MoveRight className="ml-3 transition-transform duration-300" />
                                    </>
                                )}
                            </button>
                        </div>

                        {/* Success Message */}
                        {submitStatus === 'success' && (
                            <div className="flex items-center gap-3 px-5 py-4 mt-6 bg-green-500/10 border border-green-500/30 rounded-xl font-inter text-sm font-medium text-green-500">
                                <Mail className="w-5 h-5" />
                                <span>Thank you! Your message has been sent successfully.</span>
                            </div>
                        )}

                        {/* Error Message */}
                        {submitStatus === 'error' && (
                            <div className="flex items-center gap-3 px-5 py-4 mt-6 bg-red-500/10 border border-red-500/30 rounded-xl font-inter text-sm font-medium text-red-500">
                                <X className="w-5 h-5" />
                                <span>There was an error sending your message. Please try again.</span>
                            </div>
                        )}
                    </form>
                </div>

                {/* Contact Details */}
                <div className="flex justify-center items-center gap-12 flex-wrap">
                    <div className="flex items-center gap-3 text-gray-400 font-inter text-sm">
                        <Mail className="w-5 h-5" />
                        <span>info@byltmedia.com</span>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes gradient {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
            `}</style>
        </section>
    );
};

export default NeuralContact;