import { TrendingUp, Search, Code, BrainCircuit } from 'lucide-react';

export const SERVICES = [
    {
        id: 'paid-media',
        number: '01',
        title: 'Paid Media',
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
        ctaText: 'Explore Paid Media',
        ctaHref: '/paidsearch'
    },
    {
        id: 'seo',
        number: '02',
        title: 'SEO',
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
        ctaHref: '/seo'
    },
    {
        id: 'web-dev',
        number: '03',
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
        ctaHref: '/websites'
    },
    {
        id: 'ai-solutions',
        number: '04',
        title: 'AI & Automation',
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
        ctaHref: '/aisolutions'
    },
    {
        id: 'data-analytics',
        number: '05',
        title: 'Data & Analytics',
        subtitle: 'Data-driven decisions that move the needle',
        icon: <TrendingUp size={24} />,
        description: 'Transform raw data into strategic advantage. We implement comprehensive analytics frameworks, build custom dashboards, and deliver insights that drive measurable business outcomes.',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80',
        capabilities: [
            { name: 'Analytics Implementation & Audits' },
            { name: 'Custom Dashboards & Reporting' },
            { name: 'Conversion Rate Optimization' },
            { name: 'Predictive Analytics & Forecasting' }
        ],
        ctaText: 'Explore Data & Analytics',
        ctaHref: '/analytics'
    },
    {
        id: 'social-media',
        number: '06',
        title: 'Social Media',
        subtitle: 'Content that converts, audiences that engage',
        icon: <Code size={24} />,
        description: 'Build brand authority and drive engagement across social platforms. We create data-backed content strategies, manage communities, and run high-performing social campaigns that deliver real business results.',
        image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&auto=format&fit=crop&q=80',
        capabilities: [
            { name: 'Social Strategy & Content Planning' },
            { name: 'Community Management' },
            { name: 'Influencer Partnerships' },
            { name: 'Social Commerce & Attribution' }
        ],
        ctaText: 'Explore Social Media',
        ctaHref: '/socialmedia'
    },
];
