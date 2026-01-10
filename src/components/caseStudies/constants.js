// Case Studies Data and Constants

export const caseStudiesData = [
    {
        id: 'nissan',
        slug: 'nissan',
        client: 'Nissan Bulgaria',
        title: 'Driving High-Quality Leads for a Global Automotive Leader',
        description: 'How we transformed Nissan Bulgaria\'s digital strategy to generate over 2,000 qualified test drive requests through targeted performance marketing and conversion optimization.',
        category: 'Paid Media',
        imageUrl: '/images/casestudy/nissan-case-study.webp',
        link: '/case-studies-nissan',
        stats: [
            { value: '2,000+', label: 'Test Drive Requests' },
            { value: '25%', label: 'Landing Page CVR' }
        ],
        industry: 'Automotive',
        services: ['Google Ads', 'Meta Ads', 'Conversion Optimization']
    },
    {
        id: 'parfium',
        slug: 'parfium',
        client: 'Parfium.bg',
        title: 'Increasing revenue in Google Ads through analysis and implementing the right strategy',
        description: 'Parfium.bg uses Google Ads to increase sales during Black Friday and Christmas while improving data collection for better optimisation.',
        category: 'Paid Media',
        imageUrl: '/images/casestudy/parfium.bg-case-study.webp',
        link: '/case-studies-parfium',
        stats: [
            { value: '-25%', label: 'CPA on Black Friday' },
            { value: '+45%', label: 'ROAS' }
        ],
        industry: 'E-commerce',
        services: ['Google Ads', 'Analytics', 'Conversion Tracking']
    },
    {
        id: 'cska',
        slug: 'cska',
        client: 'CSKA 1948',
        title: 'Increasing sales and fan base of CSKA 1948',
        description: 'CSKA Sofia 1948 strives to increase sales and fan engagement through a comprehensive digital strategy.',
        category: 'Social Media',
        imageUrl: '/images/casestudy/cska-case-study.webp',
        link: '/case-studies-cska',
        stats: [
            { value: '6X', label: 'ROAS' },
            { value: '3X', label: 'Engagements' }
        ],
        industry: 'Sports',
        services: ['Social Media Marketing', 'Content Strategy', 'Community Management']
    },
    {
        id: 'napudreni',
        slug: 'napudreni',
        client: 'Napudreni',
        title: 'Improve the online presence about Napudreni',
        description: 'Napudreni is a Bulgarian fashion brand that aimed to enhance its online presence and engagement to drive sales growth.',
        category: 'Digital Marketing',
        imageUrl: '/images/casestudy/napudreni-case-study.webp',
        link: '/case-studies-napudreni',
        stats: [
            { value: '+75%', label: 'Website traffic' },
            { value: '+60%', label: 'More sales' }
        ],
        industry: 'Fashion',
        services: ['SEO', 'Content Marketing', 'Social Media']
    },
    {
        id: 'happy',
        slug: 'happy',
        client: 'Happy Bar & Grill',
        title: 'Boosting Traffic and Engagement for Happy Bar & Grill',
        description: 'Happy Bar & Grill is the most popular restaurant chain in Bulgaria. The goal was to increase website traffic and engagement, particularly for seasonal menus and location-specific pages.',
        category: 'Social Media',
        imageUrl: '/images/casestudy/happy-case-study.webp',
        link: '/case-studies-happy',
        stats: [
            { value: '16.5M', label: 'Impressions' },
            { value: '362K', label: 'Video Views' }
        ],
        industry: 'Food & Beverage',
        services: ['Social Media Marketing', 'Video Production', 'Influencer Marketing']
    },
    {
        id: 'brickell',
        slug: 'brickell',
        client: 'Brickell Automotive Group',
        title: 'Expanding the customer base and brand awareness for Brickell Automotive Group',
        description: 'Brickell Automotive Group needed to increase online engagement and acquire higher-quality leads through targeted campaigns on Meta.',
        category: 'Paid Media',
        imageUrl: '/images/casestudy/brickell-case-study.webp',
        link: '/case-studies-brickell',
        stats: [
            { value: '2.5%', label: 'CTR' },
            { value: '15K', label: 'Impressions' }
        ],
        industry: 'Automotive',
        services: ['Meta Ads', 'Lead Generation', 'Audience Targeting']
    }
];

// Rotating phrases for hero section
export const heroRotatingPhrases = [
    "Shared Success Stories",
    "Proven Marketing Results",
    "Client Growth Showcase",
    "Partnership Victories"
];

export const heroRotatingPhrasesMobile = [
    "Success Stories",
    "Proven Results",
    "Growth Showcase",
    "Victories"
];

// Hero content
export const heroContent = {
    badge: 'BYLT.MEDIA × MARKETISE.ME // SHARED SUCCESS',
    description: 'Explore our collaborative case studies with Marketise Me, showcasing combined expertise that delivers exceptional results for clients across diverse industries and markets.',
    ctaPrimary: {
        text: 'Start Your Success Story',
        href: '#contact'
    },
    ctaSecondary: {
        text: 'View Case Studies',
        href: '#case-studies'
    }
};

// Contact section content
export const contactContent = {
    heading: "Let's Build Your Success Story",
    description: "Inspired by our results? Tell us about your project, and let's create your case study together."
};

// Category filter options
export const categories = [
    'All',
    'Paid Media',
    'Social Media',
    'Digital Marketing'
];

// Helper functions
export const getCaseStudySlugs = () => caseStudiesData.map(cs => cs.slug);

export const getCaseStudyBySlug = (slug) => caseStudiesData.find(cs => cs.slug === slug);

export const getCaseStudyById = (id) => caseStudiesData.find(cs => cs.id === id);

export const getCaseStudiesByCategory = (category) => {
    if (category === 'All') return caseStudiesData;
    return caseStudiesData.filter(cs => cs.category === category);
};
