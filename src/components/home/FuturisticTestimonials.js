import { useState, useEffect, useRef } from 'react';
import useQuantumScrollAnim from '../../hooks/useQuantumScrollAnim';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

const FuturisticTestimonials = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    const testimonials = [
        {
            name: 'Happy Bar & Grill',
            role: 'Restaurant Chain',
            company: 'Awareness Campaign',
            content: 'Our partnership with Marketise Me has added a lot to our already established good image. The campaigns they create on a monthly basis significantly increase brand engagement and traffic to our website.',
            avatar: '/images/logos/225x170_happy_logo.png',
            rating: 5,
            metric: 'Brand Engagement',
            project: 'Awareness Campaign',
            duration: 'Ongoing',
            testimonialBg: 'linear-gradient(135deg, rgba(184, 255, 250, 0.1) 0%, rgba(30, 41, 59, 0.1) 100%)'
        },
        {
            name: 'Napudreni',
            role: 'Fashion Brand',
            company: 'E-Commerce Growth',
            content: 'We have been working together for several years and have fitted in quickly as a team. They are creative and have quite a lot of knowledge about all the new things in marketing.',
            avatar: '/images/logos/napudreni.png',
            rating: 5,
            metric: '75% Traffic Growth',
            project: 'E-Commerce Growth',
            duration: '3+ years',
            testimonialBg: 'linear-gradient(135deg, rgba(184, 255, 250, 0.08) 0%, rgba(30, 41, 59, 0.08) 100%)'
        },
        {
            name: 'Nissan',
            role: 'Automotive Group',
            company: 'Lead Generation',
            content: 'Since the start of work we have achieved an All Time High in the sale of cars from an online campaign, their team of designers and performance managers are true professionals.',
            avatar: '/images/logos/nisan.png',
            rating: 5,
            metric: 'All Time High Sales',
            project: 'Lead Generation',
            duration: 'Ongoing',
            testimonialBg: 'linear-gradient(135deg, rgba(184, 255, 250, 0.12) 0%, rgba(30, 41, 59, 0.12) 100%)'
        },
        {
            name: 'Peugeot',
            role: 'Automotive Brand',
            company: 'Lead Generation',
            content: 'Thanks to Marketise Me, we\'ve been able to increase the volume of quality inquiries that come from digital ads. At the same time, this increased the number of cars sold on a monthly and annual basis.',
            avatar: '/images/logos/Peugeot-@2x.png',
            rating: 5,
            metric: 'Quality Inquiries',
            project: 'Lead Generation',
            duration: 'Annual Growth',
            testimonialBg: 'linear-gradient(135deg, rgba(184, 255, 250, 0.1) 0%, rgba(30, 41, 59, 0.1) 100%)'
        },
        {
            name: 'Smart Consultants',
            role: 'Business Consulting',
            company: 'Lead Generation',
            content: 'With Marketise Me, we achieved serious sales volumes on three different projects of ours. What we like about working with them is the quick response, flexibility and expertise.',
            avatar: '/images/logos/smart-tower.png',
            rating: 5,
            metric: '3 Project Success',
            project: 'Multi-Project Growth',
            duration: 'Multiple Projects',
            testimonialBg: 'linear-gradient(135deg, rgba(184, 255, 250, 0.09) 0%, rgba(30, 41, 59, 0.09) 100%)'
        }
    ];

    const changeTestimonial = (newIndex) => {
        if (!isAnimating) {
            setIsAnimating(true);
            setTimeout(() => {
                setCurrentIndex(newIndex);
                setIsAnimating(false);
            }, 400);
        }
    };

    const nextTestimonial = () => changeTestimonial((currentIndex + 1) % testimonials.length);
    const prevTestimonial = () => changeTestimonial((currentIndex - 1 + testimonials.length) % testimonials.length);

    const sectionRef = useQuantumScrollAnim();

    useEffect(() => {
        const interval = setInterval(nextTestimonial, 10000); // Slower auto-advance for better reading
        return () => clearInterval(interval);
    }, [currentIndex, isAnimating]);

    const renderStars = (rating) => {
        return Array.from({ length: 5 }, (_, i) => (
            <Star
                key={i}
                size={16}
                className={`${i < rating ? 'text-[#B8FFFA] fill-current' : 'text-gray-500'} transition-colors duration-300`}
            />
        ));
    };

    return (
        <section id="testimonials" ref={sectionRef} className="py-20 bg-slate-900 quantum-anim relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="testimonial-bg-grid"></div>
                <div className="testimonial-bg-gradient"></div>
            </div>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-12">
                    <div className="section-title-container">
                        <h2 className="section-title-enhanced">
                            Shared Client Success Stories
                        </h2>
                        <div className="title-accent-line"></div>
                    </div>
                    <p className="text-lg text-slate-400 max-w-3xl mx-auto mt-4">
                        These testimonials represent our shared success stories with Marketise Me, showcasing the collaborative results we've achieved together for our clients.
                    </p>
                </div>

                <div className="testimonial-main-container">
                    {/* Featured Testimonial Card */}
                    <div className={`testimonial-featured-card ${isAnimating ? 'transitioning' : ''}`}>
                        <div className="testimonial-glow-border"></div>
                        <div className="testimonial-inner-content">

                            {/* Header with Rating */}
                            <div className="testimonial-header">
                                <div className="testimonial-rating">
                                    {renderStars(testimonials[currentIndex].rating)}
                                </div>
                            </div>

                            {/* Main Quote */}
                            <div className="testimonial-quote-section">
                                <div className="quote-decoration-left"></div>
                                <blockquote className="testimonial-quote-text">
                                    {testimonials[currentIndex].content}
                                </blockquote>
                                <div className="quote-decoration-right"></div>
                            </div>

                            {/* Metric Highlight */}
                            <div className="testimonial-metric">
                                <div className="metric-label">Key Result</div>
                                <div className="metric-value">{testimonials[currentIndex].metric}</div>
                                <div className="metric-duration">in {testimonials[currentIndex].duration}</div>
                            </div>

                            {/* Author Information */}
                            <div className="testimonial-author-section">
                                <div className="author-avatar-container">
                                    <img
                                        src={testimonials[currentIndex].avatar}
                                        alt={testimonials[currentIndex].name}
                                        className="author-avatar-enhanced"
                                        onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/120x120/1e293b/FFFFFF?text=Avatar'; }}
                                    />
                                    <div className="avatar-glow"></div>
                                </div>
                                <div className="author-info">
                                    <div className="author-name-enhanced">{testimonials[currentIndex].name}</div>
                                    <div className="author-role-enhanced">{testimonials[currentIndex].role}</div>
                                    <div className="author-company">{testimonials[currentIndex].company}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Navigation Controls */}
                    <div className="testimonial-controls">
                        <button onClick={prevTestimonial} className="testimonial-nav-btn prev-btn" disabled={isAnimating}>
                            <ChevronLeft size={20} />
                            <span className="nav-btn-text">Previous</span>
                        </button>

                        <div className="testimonial-indicators-enhanced">
                            {testimonials.map((testimonial, index) => (
                                <button
                                    key={index}
                                    onClick={() => changeTestimonial(index)}
                                    className={`testimonial-indicator-enhanced ${index === currentIndex ? 'active' : ''}`}
                                    disabled={isAnimating}
                                >
                                    <div className="indicator-avatar">
                                        <img src={testimonial.avatar} alt={testimonial.name} />
                                    </div>
                                    <div className="indicator-info">
                                        <div className="indicator-name">{testimonial.name}</div>
                                        <div className="indicator-company">{testimonial.company}</div>
                                    </div>
                                </button>
                            ))}
                        </div>

                        <button onClick={nextTestimonial} className="testimonial-nav-btn next-btn" disabled={isAnimating}>
                            <span className="nav-btn-text">Next</span>
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </div>
            </div>
            <style jsx>{`
                /* Background Elements */
                .testimonial-bg-grid {
                    position: absolute;
                    inset: 0;
                    background-image:
                        linear-gradient(rgba(184, 255, 250, 0.03) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(184, 255, 250, 0.03) 1px, transparent 1px);
                    background-size: 50px 50px;
                    animation: gridFloat 20s ease-in-out infinite;
                }

                .testimonial-bg-gradient {
                    position: absolute;
                    inset: 0;
                    background: radial-gradient(circle at center, rgba(184, 255, 250, 0.05) 0%, transparent 70%);
                }

                @keyframes gridFloat {
                    0%, 100% { transform: translate(0, 0); }
                    50% { transform: translate(10px, 5px); }
                }

                /* Main Container */
                .testimonial-main-container {
                    max-width: 800px;
                    margin: 0 auto;
                    position: relative;
                }

                /* Featured Testimonial Card */
                .testimonial-featured-card {
                    position: relative;
                    background: rgba(30, 41, 59, 0.4);
                    backdrop-filter: blur(20px);
                    border-radius: 20px;
                    padding: 2px;
                    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
                    margin-bottom: 1.5rem;
                    min-height: 380px;
                }

                .testimonial-featured-card.transitioning {
                    opacity: 0.7;
                    transform: scale(0.98);
                }

                .testimonial-glow-border {
                    position: absolute;
                    inset: 0;
                    border-radius: 20px;
                    background: linear-gradient(45deg,
                        rgba(184, 255, 250, 0.3),
                        rgba(75, 85, 99, 0.2),
                        rgba(184, 255, 250, 0.3)
                    );
                    background-size: 200% 200%;
                    animation: borderGlow 3s ease-in-out infinite;
                    opacity: 0.6;
                }

                @keyframes borderGlow {
                    0%, 100% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                }

                .testimonial-inner-content {
                    position: relative;
                    background: rgba(30, 41, 59, 0.8);
                    border-radius: 18px;
                    padding: 2rem;
                    height: 100%;
                    backdrop-filter: blur(10px);
                }

                /* Header Section */
                .testimonial-header {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin-bottom: 1.5rem;
                    flex-wrap: wrap;
                    gap: 1rem;
                }

                .testimonial-project-badge {
                    background: linear-gradient(135deg, rgba(184, 255, 250, 0.2), rgba(184, 255, 250, 0.1));
                    color: #B8FFFA;
                    padding: 0.5rem 1rem;
                    border-radius: 20px;
                    font-size: 0.875rem;
                    font-weight: 600;
                    border: 1px solid rgba(184, 255, 250, 0.3);
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                }

                .testimonial-rating {
                    display: flex;
                    gap: 0.25rem;
                    align-items: center;
                }

                /* Quote Section */
                .testimonial-quote-section {
                    position: relative;
                    margin: 1.5rem 0;
                }

                .quote-decoration-left,
                .quote-decoration-right {
                    position: absolute;
                    font-size: 3rem;
                    font-weight: 900;
                    color: rgba(184, 255, 250, 0.2);
                    font-family: 'Inter', sans-serif;
                    line-height: 1;
                }

                .quote-decoration-left {
                    top: -0.5rem;
                    left: -0.5rem;
                }

                .quote-decoration-right {
                    bottom: -1.5rem;
                    right: -0.5rem;
                    transform: rotate(180deg);
                }

                .testimonial-quote-text {
                    font-size: clamp(1rem, 2.2vw, 1.25rem);
                    line-height: 1.6;
                    color: #E5E7EB;
                    font-weight: 400;
                    font-style: italic;
                    text-align: center;
                    margin: 0;
                    padding: 0.75rem 0;
                    position: relative;
                    z-index: 1;
                }

                .quote-decoration-left::before { content: '"'; }
                .quote-decoration-right::before { content: '"'; }

                /* Metric Highlight */
                .testimonial-metric {
                    text-align: center;
                    margin: 1.5rem 0;
                    padding: 1rem;
                    background: rgba(184, 255, 250, 0.05);
                    border-radius: 12px;
                    border: 1px solid rgba(184, 255, 250, 0.1);
                }

                .metric-label {
                    font-size: 0.75rem;
                    color: #9CA3AF;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    font-weight: 500;
                    margin-bottom: 0.5rem;
                }

                .metric-value {
                    font-size: 1.5rem;
                    font-weight: 700;
                    color: #B8FFFA;
                    margin-bottom: 0.25rem;
                    text-shadow: 0 0 20px rgba(184, 255, 250, 0.3);
                }

                .metric-duration {
                    font-size: 0.75rem;
                    color: #D1D5DB;
                    font-style: italic;
                }

                /* Author Section */
                .testimonial-author-section {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    margin-top: 1.5rem;
                    padding-top: 1.5rem;
                    border-top: 1px solid rgba(75, 85, 99, 0.3);
                }

                .author-avatar-container {
                    position: relative;
                    flex-shrink: 0;
                }

                .author-avatar-enhanced {
                    width: 60px;
                    height: 60px;
                    border-radius: 50%;
                    object-fit: cover;
                    border: 2px solid rgba(184, 255, 250, 0.3);
                    transition: all 0.3s ease;
                }

                .avatar-glow {
                    position: absolute;
                    inset: -5px;
                    border-radius: 50%;
                    background: radial-gradient(circle, rgba(184, 255, 250, 0.2) 0%, transparent 70%);
                    z-index: -1;
                    animation: avatarPulse 2s ease-in-out infinite;
                }

                @keyframes avatarPulse {
                    0%, 100% { transform: scale(1); opacity: 0.5; }
                    50% { transform: scale(1.1); opacity: 0.8; }
                }

                .author-info {
                    flex: 1;
                }

                .author-name-enhanced {
                    font-size: 1.125rem;
                    font-weight: 700;
                    color: white;
                    margin-bottom: 0.125rem;
                    font-family: 'Inter', sans-serif;
                }

                .author-role-enhanced {
                    font-size: 0.875rem;
                    color: #B8FFFA;
                    margin-bottom: 0.125rem;
                    font-weight: 500;
                }

                .author-company {
                    font-size: 0.75rem;
                    color: #9CA3AF;
                    font-style: italic;
                }

                /* Navigation Controls */
                .testimonial-controls {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 1.5rem;
                    margin-top: 1.5rem;
                    flex-wrap: wrap;
                }

                .testimonial-nav-btn {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    padding: 0.625rem 1.25rem;
                    background: rgba(30, 41, 59, 0.8);
                    border: 1px solid rgba(75, 85, 99, 0.4);
                    border-radius: 10px;
                    color: #D1D5DB;
                    font-size: 0.8rem;
                    font-weight: 500;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    backdrop-filter: blur(10px);
                }

                .testimonial-nav-btn:hover:not(:disabled) {
                    background: rgba(184, 255, 250, 0.1);
                    border-color: rgba(184, 255, 250, 0.3);
                    color: #B8FFFA;
                    transform: translateY(-2px);
                }

                .testimonial-nav-btn:disabled {
                    opacity: 0.5;
                    cursor: not-allowed;
                }

                .nav-btn-text {
                    font-family: 'Inter', sans-serif;
                }

                /* Enhanced Indicators */
                .testimonial-indicators-enhanced {
                    display: flex;
                    gap: 0.75rem;
                    align-items: center;
                    flex-wrap: nowrap;
                    justify-content: center;
                    flex: 1;
                    max-width: 800px;
                    overflow-x: auto;
                    overflow-y: hidden;
                }

                .testimonial-indicators-enhanced::-webkit-scrollbar {
                    display: none;
                }

                .testimonial-indicators-enhanced {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }

                .testimonial-indicator-enhanced {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    padding: 0.375rem;
                    background: rgba(30, 41, 59, 0.6);
                    border: 1px solid rgba(75, 85, 99, 0.3);
                    border-radius: 10px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    min-width: 100px;
                    flex-shrink: 0;
                }

                .testimonial-indicator-enhanced:hover:not(:disabled) {
                    background: rgba(30, 41, 59, 0.8);
                    border-color: rgba(184, 255, 250, 0.3);
                    transform: translateY(-2px);
                }

                .testimonial-indicator-enhanced.active {
                    background: rgba(184, 255, 250, 0.1);
                    border-color: rgba(184, 255, 250, 0.4);
                    box-shadow: 0 0 20px rgba(184, 255, 250, 0.2);
                }

                .testimonial-indicator-enhanced:disabled {
                    opacity: 0.6;
                    cursor: not-allowed;
                }

                .indicator-avatar {
                    width: 28px;
                    height: 28px;
                    border-radius: 50%;
                    overflow: hidden;
                    flex-shrink: 0;
                }

                .indicator-avatar img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .indicator-info {
                    flex: 1;
                    text-align: left;
                }

                .indicator-name {
                    font-size: 0.7rem;
                    font-weight: 600;
                    color: white;
                    margin-bottom: 0.0625rem;
                    line-height: 1.2;
                }

                .indicator-company {
                    font-size: 0.6rem;
                    color: #9CA3AF;
                    line-height: 1.2;
                }

                /* Trust Section */
                .testimonial-trust-section {
                    margin-top: 2.5rem;
                    padding-top: 2rem;
                    border-top: 1px solid rgba(75, 85, 99, 0.3);
                }

                .trust-stats-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
                    gap: 1.5rem;
                    max-width: 500px;
                    margin: 0 auto;
                }

                .trust-stat {
                    text-align: center;
                    padding: 1rem;
                    background: rgba(30, 41, 59, 0.3);
                    border-radius: 12px;
                    border: 1px solid rgba(75, 85, 99, 0.3);
                    transition: all 0.3s ease;
                    position: relative;
                    overflow: hidden;
                }

                .trust-stat::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    height: 1px;
                    background: linear-gradient(90deg, transparent, #B8FFFA, transparent);
                    opacity: 0;
                    transition: opacity 0.3s ease;
                }

                .trust-stat:hover {
                    background: rgba(30, 41, 59, 0.5);
                    border-color: rgba(184, 255, 250, 0.3);
                    transform: translateY(-3px);
                }

                .trust-stat:hover::before {
                    opacity: 0.6;
                }

                .trust-stat-number {
                    font-size: 1.5rem;
                    font-weight: 700;
                    color: #B8FFFA;
                    margin-bottom: 0.375rem;
                    font-family: 'Inter', sans-serif;
                }

                .trust-stat-label {
                    font-size: 0.75rem;
                    color: #D1D5DB;
                    font-weight: 500;
                    line-height: 1.4;
                }

                /* Responsive Design */
                @media (max-width: 768px) {
                    .testimonial-inner-content {
                        padding: 1.5rem;
                    }

                    .testimonial-header {
                        flex-direction: column;
                        align-items: center;
                        text-align: center;
                    }

                    .testimonial-author-section {
                        flex-direction: column;
                        text-align: center;
                        gap: 0.75rem;
                    }

                    .testimonial-controls {
                        flex-direction: column;
                        gap: 1rem;
                    }

                    .testimonial-indicators-enhanced {
                        flex-direction: column;
                        width: 100%;
                        max-width: 280px;
                        margin: 0 auto;
                    }

                    .testimonial-indicator-enhanced {
                        width: 100%;
                        justify-content: flex-start;
                    }

                    .quote-decoration-left,
                    .quote-decoration-right {
                        font-size: 2.5rem;
                    }

                    .quote-decoration-left {
                        top: -0.25rem;
                        left: -0.25rem;
                    }

                    .quote-decoration-right {
                        bottom: -1rem;
                        right: -0.25rem;
                    }

                    .trust-stats-grid {
                        grid-template-columns: repeat(2, 1fr);
                        gap: 1rem;
                    }
                }

                @media (max-width: 480px) {
                    .testimonial-inner-content {
                        padding: 1.25rem;
                    }

                    .trust-stats-grid {
                        grid-template-columns: 1fr;
                    }

                    .metric-value {
                        font-size: 1.25rem;
                    }
                }
            `}</style>
        </section>
    );
};

export default FuturisticTestimonials;
