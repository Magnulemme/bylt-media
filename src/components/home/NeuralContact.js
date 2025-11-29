import { useState, useRef } from 'react';
import useQuantumScrollAnim from '../../hooks/useQuantumScrollAnim';
import { Mail, MoveRight, X } from 'lucide-react';

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
        <section id="contact" ref={sectionRef} className="py-24 bg-slate-900/30 quantum-anim relative overflow-hidden">
            <div className="absolute inset-0 contact-neural-grid"></div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                <div className="text-center mb-12">
                    <div className="section-title-container">
                        <h2 className="section-title-enhanced">
                            Let's Build Your Future
                        </h2>
                        <div className="title-accent-line"></div>
                    </div>
                    <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                        Ready to start your next project? Tell us about your vision and we'll turn it into reality.
                    </p>
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
                .contact-neural-grid {
                    background-image: linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
                                      linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
                    background-size: 40px 40px;
                }

                .contact-form-container {
                    position: relative;
                    max-width: 800px;
                    margin: 0 auto 3rem auto;
                    padding: 2px;
                    background: linear-gradient(45deg, #4b5563, #1e293b);
                    border-radius: 24px;
                }

                .contact-form {
                    background: #1e293b;
                    border-radius: 22px;
                    padding: 3rem;
                    position: relative;
                    z-index: 2;
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
                    background: rgba(30, 41, 59, 0.5);
                    border: 1px solid #374151;
                    border-radius: 12px;
                    color: #e5e7eb;
                    font-family: 'Inter', sans-serif;
                    font-size: 1rem;
                    transition: all 0.3s ease;
                    backdrop-filter: blur(8px);
                }

                .form-input:focus, .form-textarea:focus {
                    outline: none;
                    border-color: #B8FFFA;
                    background: rgba(30, 41, 59, 0.8);
                    box-shadow: 0 0 0 2px rgba(184, 255, 250, 0.1);
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
                    padding: 1.25rem 2.5rem;
                    font-weight: 700;
                    font-size: 1.125rem;
                    color: #1e293b;
                    background: #B8FFFA;
                    border: none;
                    border-radius: 15px;
                    font-family: 'Inter', sans-serif;
                    text-decoration: none;
                    transition: all 0.4s ease;
                    cursor: pointer;
                    min-width: 180px;
                }

                .neural-submit-button:hover:not(:disabled) {
                    transform: translateY(-3px) scale(1.05);
                    box-shadow: 0 10px 30px rgba(184, 255, 250, 0.3);
                    background: #9DFFF8;
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
