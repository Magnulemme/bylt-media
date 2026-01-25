import { TrendingUp, Search, Code, BrainCircuit, BarChart3, Share2, Tv, Mail, Database, MousePointerClick } from 'lucide-react';

export const SERVICES = [
    {
        id: 'paid-search',
        number: '01',
        title: 'Paid Search (PPC)',
        subtitle: 'Performance advertising that delivers ROAS',
        icon: <TrendingUp size={24} />,
        description: 'Transform ad spend into measurable revenue. We engineer high-performance campaigns across Google, Meta, LinkedIn, and emerging platforms, leveraging real-time data and advanced bidding strategies to scale profitably.',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80',
        capabilities: [
            { name: 'PPC Campaign Management' },
            { name: 'Social Media Advertising' },
            { name: 'Display & Programmatic' },
            { name: 'Conversion Rate Optimisation' }
        ],
        ctaText: 'Explore Paid Search',
        ctaHref: '/services/paid-search'
    },
    {
        id: 'seo',
        number: '02',
        title: 'SEO Services',
        subtitle: 'Organic growth that compounds over time',
        icon: <Search size={24} />,
        description: 'Dominate search rankings with systematic SEO engineering. We combine technical precision, content intelligence, and strategic link building to drive sustainable organic traffic that converts.',
        image: 'https://images.unsplash.com/photo-1432888622747-4eb9a8f2c293?w=800&auto=format&fit=crop&q=80',
        capabilities: [
            { name: 'Technical SEO & Core Web Vitals' },
            { name: 'Content Strategy & Optimisation' },
            { name: 'Authority Building & Backlinks' },
            { name: 'Local & International SEO' }
        ],
        ctaText: 'Explore SEO',
        ctaHref: '/services/seo'
    },
    {
        id: 'social-media',
        number: '03',
        title: 'Social Media Marketing',
        subtitle: 'Content that converts, audiences that engage',
        icon: <Share2 size={24} />,
        description: 'Build brand authority and drive engagement across social platforms. We create data-backed content strategies, manage communities, and run high-performing social campaigns that deliver real business results.',
        image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&auto=format&fit=crop&q=80',
        capabilities: [
            { name: 'Social Strategy & Content Planning' },
            { name: 'Community Management' },
            { name: 'Influencer Partnerships' },
            { name: 'Social Commerce & Attribution' }
        ],
        ctaText: 'Explore Social Media',
        ctaHref: '/services/social-media'
    },
    {
        id: 'analytics',
        number: '04',
        title: 'Analytics & Reporting',
        subtitle: 'Data-driven decisions that move the needle',
        icon: <BarChart3 size={24} />,
        description: 'Transform raw data into strategic advantage. We implement comprehensive analytics frameworks, build custom dashboards, and deliver insights that drive measurable business outcomes.',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80',
        capabilities: [
            { name: 'Analytics Implementation & Audits' },
            { name: 'Custom Dashboards & Reporting' },
            { name: 'Conversion Rate Optimization' },
            { name: 'Predictive Analytics & Forecasting' }
        ],
        ctaText: 'Explore Analytics',
        ctaHref: '/services/analytics'
    },
    {
        id: 'programmatic',
        number: '05',
        title: 'Programmatic Advertising',
        subtitle: 'Automated media buying at scale',
        icon: <Tv size={24} />,
        description: 'Leverage AI-powered programmatic platforms to reach your audience at the right time, in the right place. We optimize real-time bidding strategies across display, video, and connected TV to maximize ROI.',
        image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&auto=format&fit=crop&q=80',
        capabilities: [
            { name: 'Real-Time Bidding (RTB)' },
            { name: 'Display & Video Advertising' },
            { name: 'Connected TV (CTV) Campaigns' },
            { name: 'Audience Targeting & Retargeting' }
        ],
        ctaText: 'Explore Programmatic',
        ctaHref: '/services/programmatic'
    },
    {
        id: 'websites',
        number: '06',
        title: 'Website Development',
        subtitle: 'Lightning-fast web experiences',
        icon: <Code size={24} />,
        description: 'Your website engineered for performance and conversion. We build modern, scalable platforms using Next.js, React, and cutting-edge tech stacks. Speed, security, and seamless UX—no compromises.',
        image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&auto=format&fit=crop&q=80',
        capabilities: [
            { name: 'Next.js & React Development' },
            { name: 'Headless CMS & API Integration' },
            { name: 'E-commerce & Payment Systems' },
            { name: 'Performance & SEO Engineering' }
        ],
        ctaText: 'Explore Web Development',
        ctaHref: '/services/websites'
    },
    {
        id: 'email-marketing',
        number: '07',
        title: 'Email Marketing',
        subtitle: 'Nurture leads and drive conversions',
        icon: <Mail size={24} />,
        description: 'Build lasting customer relationships through strategic email campaigns. From automated workflows to personalized content, we create email programs that nurture leads and drive measurable revenue.',
        image: 'https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=800&auto=format&fit=crop&q=80',
        capabilities: [
            { name: 'Email Automation & Workflows' },
            { name: 'Campaign Strategy & Copywriting' },
            { name: 'List Segmentation & Personalization' },
            { name: 'A/B Testing & Optimization' }
        ],
        ctaText: 'Explore Email Marketing',
        ctaHref: '/services/email-marketing'
    },
    {
        id: 'data-science',
        number: '08',
        title: 'Data Science & Analytics',
        subtitle: 'Advanced insights from your data',
        icon: <Database size={24} />,
        description: 'Unlock the power of your data with advanced analytics and machine learning. We build predictive models, automate reporting, and deliver actionable insights that drive strategic decision-making.',
        image: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=800&auto=format&fit=crop&q=80',
        capabilities: [
            { name: 'Predictive Modeling & ML' },
            { name: 'Data Pipeline Development' },
            { name: 'Business Intelligence & Dashboards' },
            { name: 'Customer Analytics & Segmentation' }
        ],
        ctaText: 'Explore Data Science',
        ctaHref: '/services/data-science'
    },
    {
        id: 'ai-solutions',
        number: '09',
        title: 'AI Solutions',
        subtitle: 'Intelligence that works for your business',
        icon: <BrainCircuit size={24} />,
        description: 'Deploy AI that delivers tangible results. From custom machine learning models to intelligent automation workflows, we transform data into actionable insights and repetitive tasks into autonomous systems.',
        image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop&q=80',
        capabilities: [
            { name: 'Custom AI & ML Models' },
            { name: 'Business Process Automation' },
            { name: 'Data Intelligence & Analytics' },
            { name: 'AI Integration & Deployment' }
        ],
        ctaText: 'Explore AI Solutions',
        ctaHref: '/services/ai-solutions'
    },
    {
        id: 'cro',
        number: '10',
        title: 'CRO & UX Audits',
        subtitle: 'Optimize every touchpoint for conversion',
        icon: <MousePointerClick size={24} />,
        description: 'Maximize the value of your existing traffic through systematic conversion rate optimization. We analyze user behavior, run rigorous A/B tests, and implement UX improvements that boost your bottom line.',
        image: 'https://images.unsplash.com/photo-1553484771-371a605b060b?w=800&auto=format&fit=crop&q=80',
        capabilities: [
            { name: 'Conversion Audit & Analysis' },
            { name: 'A/B & Multivariate Testing' },
            { name: 'UX Research & Heatmapping' },
            { name: 'Landing Page Optimization' }
        ],
        ctaText: 'Explore CRO',
        ctaHref: '/services/cro'
    },
];
