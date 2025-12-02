import { useState, useRef } from 'react';
import { motion } from 'motion/react';
import useQuantumScrollAnim from '../../hooks/useQuantumScrollAnim';
import { Mail, MoveRight, X } from 'lucide-react';
import { BackgroundBeams } from '../ui/background-beams';

const NeuralContact = () => {
    const sectionRef = useQuantumScrollAnim();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        company: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

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
            // Create mailto link with form data
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
        <section id="contact" className="py-24 relative overflow-hidden" style={{ background: '#020617' }}>
            <BackgroundBeams className="absolute inset-0 z-0" />
            <div ref={sectionRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 quantum-anim">
                {/* Section Title - Above header */}
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

                <div className="contact-form-container">
                    <form onSubmit={handleSubmit} className="contact-form">
                        <div className="form-grid">
                            <div className="form-group">
                                <label htmlFor="firstName" className="form-label">
                                    First Name *
                                </label>
                                <input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    required
                                    className="form-input"
                                    placeholder="Enter your first name"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="lastName" className="form-label">
                                    Last Name *
                                </label>
                                <input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    required
                                    className="form-input"
                                    placeholder="Enter your last name"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email" className="form-label">
                                    Email Address *
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                    className="form-input"
                                    placeholder="your.email@company.com"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="company" className="form-label">
                                    Company
                                </label>
                                <input
                                    type="text"
                                    id="company"
                                    name="company"
                                    value={formData.company}
                                    onChange={handleInputChange}
                                    className="form-input"
                                    placeholder="Your company name"
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="message" className="form-label">
                                Message *
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleInputChange}
                                required
                                rows={6}
                                className="form-textarea"
                                placeholder="Tell us about your project, goals, and how we can help you build your digital future..."
                            />
                        </div>

                        <div className="form-submit">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="neural-submit-button"
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="submit-spinner"></div>
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

                        {submitStatus === 'success' && (
                            <div className="status-message success">
                                <Mail className="w-5 h-5" />
                                <span>Thank you! Your message has been sent successfully.</span>
                            </div>
                        )}

                        {submitStatus === 'error' && (
                            <div className="status-message error">
                                <X className="w-5 h-5" />
                                <span>There was an error sending your message. Please try again.</span>
                            </div>
                        )}
                    </form>
                </div>

                <div className="contact-details">
                    <div className="contact-detail-item">
                        <Mail className="w-5 h-5 text-gray-400" />
                        <span>info@byltmedia.com</span>
                    </div>
                </div>
            </div>
            <style jsx>{`

                .contact-form-container {
                    position: relative;
                    max-width: 800px;
                    margin: 0 auto 3rem auto;
                }

                .contact-form {
                    background: rgba(15, 23, 42, 0.8);
                    backdrop-filter: blur(12px);
                    border: 2px solid rgba(34, 211, 238, 0.3);
                    border-radius: 16px;
                    padding: 3rem;
                    position: relative;
                    z-index: 2;
                    box-shadow: 8px 8px 0px rgba(34, 211, 238, 0.4);
                    transition: all 0.3s ease;
                }

                .contact-form:hover {
                    box-shadow: 6px 6px 0px rgba(34, 211, 238, 0.4);
                    transform: translate(2px, 2px);
                }

                .form-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 1.5rem;
                    margin-bottom: 1.5rem;
                }

                .form-group {
                    position: relative;
                }

                .form-label {
                    display: block;
                    font-family: 'Inter', sans-serif;
                    font-size: 0.875rem;
                    font-weight: 600;
                    color: #e5e7eb;
                    margin-bottom: 0.5rem;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                }

                .form-input, .form-textarea {
                    width: 100%;
                    padding: 1rem 1.25rem;
                    background: rgba(30, 41, 59, 0.6);
                    border: 2px solid rgba(100, 116, 139, 0.3);
                    border-radius: 8px;
                    color: #e5e7eb;
                    font-family: 'Inter', sans-serif;
                    font-size: 1rem;
                    transition: all 0.3s ease;
                    backdrop-filter: blur(8px);
                }

                .form-input:focus, .form-textarea:focus {
                    outline: none;
                    border-color: rgba(34, 211, 238, 0.6);
                    background: rgba(30, 41, 59, 0.9);
                    box-shadow: 4px 4px 0px rgba(34, 211, 238, 0.2);
                    transform: translate(-2px, -2px);
                }

                .form-input::placeholder, .form-textarea::placeholder {
                    color: #9ca3af;
                }

                .form-textarea {
                    resize: vertical;
                    min-height: 120px;
                }

                .form-submit {
                    display: flex;
                    justify-content: center;
                    margin-top: 2rem;
                }

                .neural-submit-button {
                    position: relative;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    height: 3.5rem;
                    padding: 0 2rem;
                    font-weight: 600;
                    font-size: 1rem;
                    color: white;
                    background: linear-gradient(to right, #06b6d4, #3b82f6, #06b6d4);
                    background-size: 200% 200%;
                    animation: gradient 3s ease infinite;
                    border: 1px solid rgba(6, 182, 212, 0.5);
                    border-radius: 0.5rem;
                    font-family: 'Inter', sans-serif;
                    text-decoration: none;
                    transition: all 0.3s ease;
                    cursor: pointer;
                    min-width: 180px;
                }

                .neural-submit-button:hover:not(:disabled) {
                    transform: translateY(-2px);
                    box-shadow: 0 10px 30px rgba(6, 182, 212, 0.5);
                }

                @keyframes gradient {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }

                .neural-submit-button:disabled {
                    opacity: 0.7;
                    cursor: not-allowed;
                    transform: none;
                }

                .submit-spinner {
                    width: 20px;
                    height: 20px;
                    border: 2px solid transparent;
                    border-top: 2px solid #1e293b;
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                    margin-right: 0.75rem;
                }

                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }

                .status-message {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    padding: 1rem 1.25rem;
                    margin-top: 1.5rem;
                    border-radius: 12px;
                    font-family: 'Inter', sans-serif;
                    font-size: 0.875rem;
                    font-weight: 500;
                }

                .status-message.success {
                    background: rgba(34, 197, 94, 0.1);
                    border: 1px solid rgba(34, 197, 94, 0.3);
                    color: #22c55e;
                }

                .status-message.error {
                    background: rgba(239, 68, 68, 0.1);
                    border: 1px solid rgba(239, 68, 68, 0.3);
                    color: #ef4444;
                }

                .contact-details {
                    display: flex;
                    justify-content: center;
                    gap: 3rem;
                    flex-wrap: wrap;
                }

                .contact-detail-item {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    color: #9ca3af;
                    font-family: 'Inter', sans-serif;
                    font-size: 0.875rem;
                }

                @media (max-width: 768px) {
                    .form-grid {
                        grid-template-columns: 1fr;
                        gap: 1rem;
                    }

                    .contact-form {
                        padding: 2rem;
                    }

                    .contact-details {
                        flex-direction: column;
                        gap: 1rem;
                        align-items: center;
                    }

                    .neural-submit-button {
                        padding: 1rem 2rem;
                        font-size: 1rem;
                    }
                }
            `}</style>
        </section>
    );
};

export default NeuralContact;
