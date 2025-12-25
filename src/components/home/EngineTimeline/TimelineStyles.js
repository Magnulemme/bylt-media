import React from 'react';

const TimelineStyles = () => (
    <style jsx global>{`
        /* ==========================================
           MOBILE CAROUSEL - NEGATIVE MARGIN
           ========================================== */
        .timeline-carousel-mobile {
            margin-left: -1rem;
            margin-right: -1rem;
        }

        @media (min-width: 640px) {
            .timeline-carousel-mobile {
                margin-left: -1.5rem;
                margin-right: -1.5rem;
            }
        }

        @media (min-width: 1024px) {
            .timeline-carousel-mobile {
                margin-left: 0;
                margin-right: 0;
            }
        }

        /* ==========================================
           MOBILE CARDS - RESPONSIVE SIZING
           ========================================== */
        .timeline-mobile-cards {
            overflow: visible !important;
        }

        .timeline-mobile-card {
            flex-shrink: 0;
            width: calc(100% - 60px) !important;
            min-width: 250px !important;
            max-width: 420px !important;
        }

        /* Smaller margin on very small screens */
        @media (max-width: 360px) {
            .timeline-mobile-card {
                width: calc(100% - 30px) !important;
            }
        }

        /* Tablet+ sizing adjustments */
        @media (min-width: 500px) {
            .timeline-mobile-card {
                max-width: 520px;
            }
        }

        @media (min-width: 640px) {
            .timeline-mobile-card {
                max-width: 540px;
            }
        }

        @media (min-width: 768px) {
            .timeline-mobile-card {
                max-width: 600px;
            }
        }
    `}</style>
);

export default TimelineStyles;
