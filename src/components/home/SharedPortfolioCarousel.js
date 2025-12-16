import React from 'react';
import { InfiniteMovingCards } from '../ui/infinite-moving-cards';
import SectionHeader from '../ui/SectionHeader';
import ClientsIntermezzo from './ClientsIntermezzo';

// Shared Portfolio Carousel using CSS sticky positioning
const SharedPortfolioCarousel = () => {
    const tools = [
        // SEO
        { name: "Semrush", logo: "/logos/Semrush.png", tag: "SEO" },
        { name: "Ahrefs", logo: "/logos/Ahrefs_id5KWlBICs_0.svg", tag: "SEO" },
        { name: "Google Search Console", logo: "https://www.gstatic.com/images/branding/product/2x/search_console_512dp.png", tag: "SEO" },

        // Paid Media
        { name: "Google Ads", logo: "https://upload.wikimedia.org/wikipedia/commons/c/c7/Google_Ads_logo.svg", tag: "Paid Media" },
        { name: "Meta Ads", logo: "https://upload.wikimedia.org/wikipedia/commons/a/ab/Meta-Logo.png", tag: "Paid Media" },
        { name: "LinkedIn Ads", logo: "https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png", tag: "Paid Media" },
        { name: "Google Analytics", logo: "https://upload.wikimedia.org/wikipedia/commons/7/77/GAnalytics.svg", tag: "Paid Media" },

        // Web Development
        { name: "Next.js", logo: "https://assets.vercel.com/image/upload/v1662130559/nextjs/Icon_light_background.png", tag: "Web Dev" },
        { name: "WordPress", logo: "https://upload.wikimedia.org/wikipedia/commons/9/98/WordPress_blue_logo.svg", tag: "Web Dev" },
        { name: "Shopify", logo: "https://cdn.worldvectorlogo.com/logos/shopify.svg", tag: "Web Dev" },
        { name: "Webflow", logo: "/logos/webflow.png", tag: "Web Dev" },
    ];

    return (
        <section
            className="pt-16 pb-16 overflow-hidden"
            style={{
                position: 'sticky',
                bottom: 0,
                background: '#020617',
                zIndex: 0,
                clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)"
            }}
        >
            <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <ClientsIntermezzo />

                {/* Infinite Moving Cards */}
                <InfiniteMovingCards
                    items={tools}
                    direction="left"
                    speed="slow"
                    pauseOnHover={false}
                    className="py-4"
                    cardSize="compact"
                />
            </div>
        </section>
    );
};

export default SharedPortfolioCarousel;
