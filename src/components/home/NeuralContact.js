import { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useAnimationFrame, useMotionTemplate, useMotionValue } from 'motion/react';
import useQuantumScrollAnim from '../../hooks/useQuantumScrollAnim';
import { Mail, MoveRight, X } from 'lucide-react';
import { BackgroundBeams } from '../ui/background-beams';
import { useFooterStore } from '../../store/footerStore';
import { cn } from '@/lib/utils';

// Moving Border Button Component (inline to avoid import issues)
const MovingBorder = ({
  children,
  duration = 3000,
  rx,
  ry,
  ...otherProps
}) => {
  const pathRef = useRef(null);
  const progress = useMotionValue(0);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const updateDimensions = () => {
      const { width, height } = containerRef.current.getBoundingClientRect();
      setDimensions({ width, height });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useAnimationFrame((time) => {
    if (!pathRef.current) return;

    try {
      const length = pathRef.current.getTotalLength();
      if (length && length > 0) {
        const pxPerMillisecond = length / duration;
        const progressValue = (time * pxPerMillisecond) % length;
        progress.set(progressValue);
      }
    } catch (error) {
      // Path not ready yet, skip this frame
    }
  });

  const x = useTransform(progress, (val) => {
    if (!pathRef.current) return 0;
    try {
      const point = pathRef.current.getPointAtLength(val);
      return point ? point.x : 0;
    } catch {
      return 0;
    }
  });

  const y = useTransform(progress, (val) => {
    if (!pathRef.current) return 0;
    try {
      const point = pathRef.current.getPointAtLength(val);
      return point ? point.y : 0;
    } catch {
      return 0;
    }
  });

  const transform = useMotionTemplate`translateX(${x}px) translateY(${y}px) translateX(-50%) translateY(-50%)`;

  const pathD = dimensions.width > 0 && dimensions.height > 0
    ? `M 0 0 H ${dimensions.width} V ${dimensions.height} H 0 Z`
    : '';

  return (
    <div ref={containerRef} className="absolute inset-0">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="absolute h-full w-full"
        width="100%"
        height="100%"
        {...otherProps}>
        {pathD && (
          <path
            fill="none"
            d={pathD}
            ref={pathRef}
          />
        )}
      </svg>
      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          display: "inline-block",
          transform,
        }}>
        {children}
      </motion.div>
    </div>
  );
};

const MovingBorderButton = ({
  borderRadius = "1.75rem",
  children,
  as: Component = "button",
  containerClassName,
  borderClassName,
  duration,
  className,
  ...otherProps
}) => {
  return (
    <Component
      className={cn(
        "relative h-16 w-40 overflow-hidden bg-transparent p-[1px] text-xl",
        containerClassName
      )}
      style={{
        borderRadius: borderRadius,
      }}
      {...otherProps}>
      <div
        className="absolute inset-0"
        style={{ borderRadius: `calc(${borderRadius} * 0.96)` }}>
        <MovingBorder duration={duration} rx="30%" ry="30%">
          <div
            className={cn(
              "h-20 w-20 bg-[radial-gradient(#0ea5e9_40%,transparent_60%)] opacity-[0.8]",
              borderClassName
            )} />
        </MovingBorder>
      </div>
      <div
        className={cn(
          "relative flex h-full w-full items-center justify-center border border-slate-800 bg-slate-900/[0.8] text-sm text-white antialiased backdrop-blur-xl",
          className
        )}
        style={{
          borderRadius: `calc(${borderRadius} * 0.96)`,
        }}>
        {children}
      </div>
    </Component>
  );
};

// Word Component for text reveal effect
const Word = ({ children, range, progress }) => {
    const opacity = useTransform(progress, range, [0.2, 1]);

    return (
        <motion.span
            style={{ opacity }}
            className="inline-block mr-[0.25em]"
        >
            {children}
        </motion.span>
    );
};

// Scroll Reveal Text Component
const ScrollRevealText = ({ text, className }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start 0.9", "start 0.5"]
    });

    const words = text.split(' ');

    return (
        <span ref={ref} className={className}>
            {words.map((word, i) => {
                const start = i / words.length;
                const end = (i + 1) / words.length;

                return (
                    <Word key={i} range={[start, end]} progress={scrollYProgress}>
                        {word}
                    </Word>
                );
            })}
        </span>
    );
};

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
                <div className="flex items-center gap-3 mb-12 justify-start">
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
                    <div className="text-3xl md:text-5xl font-bold font-inter mb-6">
                        <ScrollRevealText
                            text="They built their future with us."
                            className="text-white"
                        />
                        <br />
                        <ScrollRevealText
                            text="Now it's your turn."
                            className="text-cyan-400"
                        />
                    </div>
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
                                    className="block font-mono text-xs font-bold text-cyan-400 mb-3 uppercase tracking-widest"
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
                                    className="w-full px-5 py-4 bg-slate-950/95 border-2 border-slate-700/80 rounded-lg text-white font-inter transition-all duration-300 placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 focus:bg-black focus:shadow-[0_0_20px_rgba(34,211,238,0.3)] focus:ring-2 focus:ring-cyan-400/20"
                                    placeholder="Enter your first name"
                                />
                            </div>

                            {/* Last Name */}
                            <div className="relative">
                                <label
                                    htmlFor="lastName"
                                    className="block font-mono text-xs font-bold text-cyan-400 mb-3 uppercase tracking-widest"
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
                                    className="w-full px-5 py-4 bg-slate-950/95 border-2 border-slate-700/80 rounded-lg text-white font-inter transition-all duration-300 placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 focus:bg-black focus:shadow-[0_0_20px_rgba(34,211,238,0.3)] focus:ring-2 focus:ring-cyan-400/20"
                                    placeholder="Enter your last name"
                                />
                            </div>

                            {/* Email */}
                            <div className="relative">
                                <label
                                    htmlFor="email"
                                    className="block font-mono text-xs font-bold text-cyan-400 mb-3 uppercase tracking-widest"
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
                                    className="w-full px-5 py-4 bg-slate-950/95 border-2 border-slate-700/80 rounded-lg text-white font-inter transition-all duration-300 placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 focus:bg-black focus:shadow-[0_0_20px_rgba(34,211,238,0.3)] focus:ring-2 focus:ring-cyan-400/20"
                                    placeholder="your.email@company.com"
                                />
                            </div>

                            {/* Company */}
                            <div className="relative">
                                <label
                                    htmlFor="company"
                                    className="block font-mono text-xs font-bold text-slate-400 mb-3 uppercase tracking-widest"
                                >
                                    Company
                                </label>
                                <input
                                    type="text"
                                    id="company"
                                    name="company"
                                    value={formData.company}
                                    onChange={handleInputChange}
                                    className="w-full px-5 py-4 bg-slate-950/95 border-2 border-slate-700/80 rounded-lg text-white font-inter transition-all duration-300 placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 focus:bg-black focus:shadow-[0_0_20px_rgba(34,211,238,0.3)] focus:ring-2 focus:ring-cyan-400/20"
                                    placeholder="Your company name"
                                />
                            </div>
                        </div>

                        {/* Message */}
                        <div className="relative mb-8">
                            <label
                                htmlFor="message"
                                className="block font-mono text-xs font-bold text-cyan-400 mb-3 uppercase tracking-widest"
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
                                className="w-full px-5 py-4 bg-slate-950/95 border-2 border-slate-700/80 rounded-lg text-white font-inter transition-all duration-300 placeholder:text-slate-500 resize-y min-h-[140px] focus:outline-none focus:border-cyan-400 focus:bg-black focus:shadow-[0_0_20px_rgba(34,211,238,0.3)] focus:ring-2 focus:ring-cyan-400/20"
                                placeholder="Tell us about your project, goals, and how we can help you build your digital future..."
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-center">
                            <MovingBorderButton
                                type="submit"
                                disabled={isSubmitting}
                                borderRadius="0.75rem"
                                containerClassName="min-w-[240px] h-16"
                                borderClassName="h-24 w-24 bg-[radial-gradient(circle,#06b6d4_20%,#3b82f6_40%,#8b5cf6_60%,transparent_80%)] opacity-100"
                                className="bg-slate-950/95 border-2 border-slate-700/80 text-white font-bold text-base disabled:opacity-50 disabled:cursor-not-allowed"
                                duration={2500}
                            >
                                {isSubmitting ? (
                                    <div className="flex items-center gap-3">
                                        <div className="w-5 h-5 border-2 border-transparent border-t-cyan-400 rounded-full animate-spin" />
                                        <span>Sending...</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-3">
                                        <span>Send Message</span>
                                        <MoveRight className="w-5 h-5" />
                                    </div>
                                )}
                            </MovingBorderButton>
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