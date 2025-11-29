const GlobalStyles = () => (
    <style jsx global>{`
        /* Critical styles are now loaded inline in _document.js */
        /* This component now only contains page-specific and advanced styles */
        
        .font-inter { font-family: 'Inter', sans-serif; }
        
        /* Advanced Animation Styles */
        .glitch-text { 
            animation: glitch 4s ease-in-out infinite; 
            will-change: transform;
        }
        @keyframes glitch { 
            0%, 100% { transform: none; } 
            10%, 30%, 50%, 70%, 90% { transform: translate3d(-1px, 0, 0); } 
            20%, 40%, 60%, 80% { transform: translate3d(1px, 0, 0); } 
        }
        
        /* Enhanced Section Titles */
        .section-title-container {
            position: relative;
            display: inline-block;
            margin-bottom: 2rem;
        }
        
        .title-accent-line {
            width: 120px;
            height: 4px;
            background: linear-gradient(90deg, transparent, #B8FFFA, transparent);
            margin: 1rem auto 0 auto;
            border-radius: 2px;
            position: relative;
            overflow: hidden;
            will-change: transform;
            contain: layout style paint;
        }
        
        .title-accent-line::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.8), transparent);
            animation: shimmer 3s ease-in-out infinite;
            will-change: transform;
        }
        
        @keyframes shimmer {
            0% { left: -100%; }
            100% { left: 100%; }
        }

        /* Typing cursor blink animation */
        @keyframes blink {
            0%, 49% { opacity: 1; }
            50%, 100% { opacity: 0; }
        }

        /* Animated gradient for hero title */
        @keyframes gradient-shift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }

        .animated-gradient {
            background-size: 200% 200%;
            animation: gradient-shift 3s ease infinite;
        }
        
        /* Partnership title specific styling */
        .partnership-title {
            font-size: clamp(1.5rem, 3vw, 2.5rem) !important;
        }

        /* Footer Styles */
        .quantum-footer { 
            background: var(--dark-bg); 
            border-top: 1px solid #374151; 
        }
        .footer-content { 
            display: flex; 
            justify-content: space-between; 
            align-items: center; 
            flex-wrap: wrap; 
            gap: 20px; 
        }
        .footer-legal { 
            text-align: right; 
        }

        /* Animated Neural Network Background */
        .animated-neural-bg {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 1;
            opacity: 0.4;
            pointer-events: none;
        }
        
        @media (max-width: 768px) {
            .hero-title { font-size: 3rem; }
            .section-title-enhanced {
                font-size: clamp(1.5rem, 5vw, 2.25rem);
            }
            .footer-content { 
                flex-direction: column; 
                text-align: center; 
            }
            .footer-legal { 
                text-align: center; 
                margin-top: 1rem; 
            }
        }
    `}</style>
);

export default GlobalStyles;