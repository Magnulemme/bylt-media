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
        link: '/case-studies/nissan',
        stats: [
            { value: '2,000+', label: 'Test Drive Requests' },
            { value: '25%', label: 'Landing Page CVR' }
        ],
        industry: 'Automotive',
        services: ['Google Ads', 'Meta Ads', 'Conversion Optimization'],
        // Extended data for case study template
        hasDetailPage: true,
        hero: {
            headline: ['Driving Quality Leads', 'for a Global Leader'],
            highlightIndex: 0,
            subtitle: 'How BYLT Media, in collaboration with Marketise Me, transformed Nissan Bulgaria\'s digital strategy to generate over 2,000 qualified test drive requests through targeted performance marketing and conversion optimization.',
            stats: [
                { value: '2,000+', label: 'Test Drive Requests Generated', icon: 'Car' },
                { value: '25%', label: 'Landing Page Conversion Rate', icon: 'Target' },
                { value: '1,000+', label: 'Leads from Social Media', icon: 'Users' },
                { value: '£45k', label: 'Monthly Lead Value Generated', icon: 'TrendingUp' }
            ],
            testimonial: {
                quote: "BYLT ha trasformato completamente la nostra presenza digitale e i risultati parlano da soli.",
                author: "Marketing Director",
                role: "Head of Digital",
                company: "Nissan Bulgaria"
            }
        },
        overview: {
            duration: '12 Weeks',
            platforms: '3 Channels',
            description: 'In partnership with Marketise Me, we developed a comprehensive digital strategy for Nissan Bulgaria, combining targeted performance marketing across Google and social platforms with conversion-optimized landing pages to transform their lead generation capabilities.'
        },
        challenge: {
            description: 'Nissan Bulgaria aimed to increase qualified test drive leads but struggled with a complex user journey and low conversion rates from their existing digital strategy.',
            painPoints: [
                'Complex 8-field form causing high abandonment rates',
                'Poor mobile experience with 67% mobile traffic',
                'Low 2.3% conversion rate across all campaigns',
                'Lack of targeted messaging for different car models'
            ],
            metrics: [
                { value: '2.3%', label: 'Previous CVR', type: 'negative' },
                { value: '8', label: 'Form Fields', type: 'negative' },
                { value: '67%', label: 'Mobile Traffic', type: 'neutral' },
                { value: '€120', label: 'Cost Per Lead', type: 'negative' }
            ]
        },
        process: [
            {
                step: '01',
                title: 'Discovery & Analysis',
                subtitle: 'Week 1-2',
                description: 'Comprehensive audit of existing campaigns and user journey mapping.',
                icon: 'Search',
                details: [
                    'Analyzed 50+ touchpoints across the customer journey',
                    'Identified 3 distinct persona segments with unique pain points',
                    'Discovered 15% conversion gap between mobile and desktop',
                    'Conducted competitor analysis across automotive sector',
                    'Mapped existing campaign performance and ROI metrics'
                ],
                metrics: ['50+ touchpoints analyzed', '3 persona segments', '15% conversion gap']
            },
            {
                step: '02',
                title: 'Strategy Development',
                subtitle: 'Week 3-4',
                description: 'Multi-channel campaign strategy and landing page optimization plan.',
                icon: 'Target',
                details: [
                    'Developed 12 campaign variations targeting different customer segments',
                    'Created 4 high-converting landing page concepts',
                    'Designed comprehensive A/B testing framework',
                    'Established KPI tracking and attribution models',
                    'Built campaign automation and optimization workflows'
                ],
                metrics: ['12 campaign variations', '4 landing page concepts', 'A/B testing plan']
            },
            {
                step: '03',
                title: 'Implementation',
                subtitle: 'Week 5-8',
                description: 'Campaign launch, landing page development, and initial optimization.',
                icon: 'Rocket',
                details: [
                    'Activated campaigns across 3 major platforms (Google, Facebook, Instagram)',
                    'Built and deployed 8 conversion-optimized landing pages',
                    'Implemented real-time tracking and analytics dashboard',
                    'Set up automated bid management and budget allocation',
                    'Launched initial test campaigns with controlled budgets'
                ],
                metrics: ['3 platforms activated', '8 landing pages built', 'Real-time tracking']
            },
            {
                step: '04',
                title: 'Optimization & Scale',
                subtitle: 'Week 9-12',
                description: 'Continuous optimization and scaling successful campaigns.',
                icon: 'TrendingUp',
                details: [
                    'Achieved 25% improvement in conversion rates through testing',
                    'Reduced cost per acquisition by 40% via bid optimization',
                    'Scaled successful campaigns resulting in 300% lead increase',
                    'Implemented dynamic remarketing for abandoned journeys',
                    'Established ongoing optimization and reporting processes'
                ],
                metrics: ['25% CVR improvement', '40% cost reduction', '300% lead increase']
            }
        ],
        solution: {
            description: 'Working through our strategic partnership with Marketise Me, we leveraged enhanced targeting capabilities and industry expertise to deliver exceptional results for Nissan Bulgaria\'s digital transformation:',
            pillars: [
                {
                    icon: 'Target',
                    title: 'Targeted Ad Campaigns',
                    text: 'Deployed highly-targeted campaigns on Google & Social Media to reach potential buyers with model-specific messaging.'
                },
                {
                    icon: 'Code',
                    title: 'High-Converting Landing Pages',
                    text: 'Designed bespoke, mobile-first landing pages with clear value propositions and simplified lead forms.'
                },
                {
                    icon: 'MousePointerClick',
                    title: 'Optimised User Journey',
                    text: 'Re-architected the ad-click-to-submission path, removing friction to make booking a test drive seamless.'
                }
            ]
        },
        results: {
            title: 'The Results',
            subtitle: 'Exceptional, measurable results that significantly boosted the sales pipeline.',
            description: 'Our integrated approach combining paid media, conversion-optimised landing pages, and multi-channel engagement delivered a steady stream of high-quality leads that exceeded expectations.',
            highlights: [
                'Generated over 2,000 qualified test drive requests',
                'Achieved 25% landing page conversion rate—industry-leading for automotive',
                'Created a sustainable lead generation system for ongoing growth',
                'Established Nissan Bulgaria as a digital marketing benchmark'
            ],
            metrics: [
                { key: 'testDrives', title: 'Test Drive Requests', value: 2000, suffix: '+', icon: 'Car', color: 'cyan' },
                { key: 'conversion', title: 'Landing Page CVR', value: 25, suffix: '%', icon: 'Target', color: 'sky' },
                { key: 'socialLeads', title: 'Social Media Leads', value: 1000, suffix: '+', icon: 'Users', color: 'teal' },
                { key: 'value', title: 'Monthly Lead Value', value: 45, prefix: '£', suffix: 'k', icon: 'TrendingUp', color: 'emerald' }
            ]
        },
        seo: {
            title: 'Nissan Case Study - Lead Generation | BYLT Media',
            description: 'Discover how BYLT Media, in collaboration with Marketise Me, generated over 2,000 test drive requests for Nissan Bulgaria through a targeted performance marketing strategy.'
        }
    },
    {
        id: 'parfium',
        slug: 'parfium',
        client: 'Parfium.bg',
        title: 'Increasing revenue in Google Ads through analysis and implementing the right strategy',
        description: 'Parfium.bg uses Google Ads to increase sales during Black Friday and Christmas while improving data collection for better optimisation.',
        category: 'Paid Media',
        imageUrl: '/images/casestudy/parfium.bg-case-study.webp',
        link: '/case-studies/parfium',
        stats: [
            { value: '-25%', label: 'CPA on Black Friday' },
            { value: '+45%', label: 'ROAS' }
        ],
        industry: 'E-commerce',
        services: ['Google Ads', 'Analytics', 'Conversion Tracking'],
        hasDetailPage: true,
        hero: {
            headline: ['Boosting E-commerce', 'Through Smart Ads'],
            highlightIndex: 0,
            subtitle: 'How we helped Parfium.bg achieve a 45% increase in ROAS and reduce CPA by 25% during peak shopping seasons through strategic Google Ads optimization.',
            stats: [
                { value: '-25%', label: 'CPA Reduction on Black Friday', icon: 'Target' },
                { value: '+45%', label: 'ROAS Improvement', icon: 'TrendingUp' },
                { value: '3X', label: 'Conversion Volume Increase', icon: 'MousePointerClick' },
                { value: '€50k+', label: 'Additional Revenue Generated', icon: 'TrendingUp' }
            ],
            testimonial: {
                quote: "I risultati del Black Friday hanno superato ogni aspettativa. Un partner affidabile.",
                author: "Georgi Petrov",
                role: "E-commerce Manager",
                company: "Parfium.bg"
            }
        },
        overview: {
            duration: '8 Weeks',
            platforms: 'Google Ads',
            description: 'We partnered with Parfium.bg to overhaul their Google Ads strategy and tracking infrastructure, implementing server-side analytics and smart bidding to maximize performance during peak shopping seasons.'
        },
        challenge: {
            description: 'Parfium.bg, a leading Bulgarian fragrance e-commerce store, needed to maximize their advertising ROI during the crucial Black Friday and Christmas periods while improving their data collection for long-term optimization.',
            painPoints: [
                'High cost per acquisition eating into profit margins',
                'Incomplete conversion tracking missing valuable data',
                'Seasonal traffic spikes not being capitalized effectively',
                'Generic bidding strategies not optimized for high-intent buyers'
            ],
            metrics: [
                { value: '12%', label: 'Previous ROAS', type: 'negative' },
                { value: '€8.50', label: 'Avg CPA', type: 'negative' },
                { value: '40%', label: 'Data Loss', type: 'neutral' },
                { value: '15%', label: 'Cart Abandonment', type: 'negative' }
            ]
        },
        process: [
            {
                step: '01',
                title: 'Audit & Analysis',
                subtitle: 'Week 1-2',
                description: 'Deep dive into existing campaigns and tracking setup.',
                icon: 'Search',
                details: [
                    'Analyzed historical campaign performance and seasonality patterns',
                    'Identified tracking gaps causing 40% data loss',
                    'Mapped customer purchase journey and key touchpoints',
                    'Reviewed competitor strategies during peak seasons',
                    'Assessed product feed quality and optimization opportunities'
                ],
                metrics: ['100+ campaigns analyzed', '40% tracking gap found', 'Full audit report']
            },
            {
                step: '02',
                title: 'Tracking Implementation',
                subtitle: 'Week 3-4',
                description: 'Complete overhaul of conversion tracking and data collection.',
                icon: 'Code',
                details: [
                    'Implemented enhanced e-commerce tracking',
                    'Set up server-side tracking for improved accuracy',
                    'Created custom audiences based on purchase behavior',
                    'Built comprehensive attribution model',
                    'Established real-time reporting dashboard'
                ],
                metrics: ['Server-side tracking', 'Enhanced e-commerce', 'Custom audiences']
            },
            {
                step: '03',
                title: 'Campaign Restructure',
                subtitle: 'Week 5-6',
                description: 'Strategic campaign rebuild for peak season performance.',
                icon: 'Target',
                details: [
                    'Restructured campaigns by product category and intent',
                    'Implemented smart bidding with seasonality adjustments',
                    'Created dedicated Black Friday and Christmas campaigns',
                    'Built remarketing sequences for cart abandoners',
                    'Optimized shopping feed with promotional messaging'
                ],
                metrics: ['15 new campaigns', 'Smart bidding active', 'Promo feeds ready']
            },
            {
                step: '04',
                title: 'Peak Season Execution',
                subtitle: 'Week 7-8',
                description: 'Aggressive optimization during Black Friday and Christmas.',
                icon: 'Rocket',
                details: [
                    'Daily bid adjustments based on real-time performance',
                    'A/B tested ad copy and promotional offers',
                    'Scaled winning campaigns by 200%',
                    'Implemented automated rules for budget management',
                    'Achieved record-breaking ROAS during peak days'
                ],
                metrics: ['-25% CPA achieved', '+45% ROAS', '200% scale-up']
            }
        ],
        solution: {
            description: 'We implemented a comprehensive Google Ads optimization strategy focused on data accuracy, smart bidding, and seasonal campaign structures to maximize ROI during peak shopping periods:',
            pillars: [
                {
                    icon: 'Code',
                    title: 'Enhanced Tracking',
                    text: 'Implemented server-side tracking and enhanced e-commerce to capture 100% of conversion data for better optimization.'
                },
                {
                    icon: 'Target',
                    title: 'Smart Bidding Strategy',
                    text: 'Deployed AI-powered bidding with custom seasonality adjustments to capture high-intent shoppers at optimal CPAs.'
                },
                {
                    icon: 'TrendingUp',
                    title: 'Seasonal Campaigns',
                    text: 'Created dedicated campaign structures for Black Friday and Christmas with aggressive scaling capabilities.'
                }
            ]
        },
        results: {
            title: 'The Results',
            subtitle: 'Record-breaking performance during the most competitive shopping season of the year.',
            description: 'Through strategic campaign restructuring, enhanced conversion tracking, and data-driven bidding optimization, we transformed Parfium.bg\'s advertising performance during the most critical sales periods of the year.',
            highlights: [
                'Achieved 25% lower cost per acquisition while maintaining volume',
                'Server-side tracking captured 30% more conversion data',
                'Black Friday campaign delivered 3X conversion volume year-over-year',
                'Smart bidding leveraged enhanced data for superior optimization'
            ],
            metrics: [
                { key: 'cpa', title: 'CPA Reduction', value: 25, suffix: '%', icon: 'Target', color: 'cyan' },
                { key: 'roas', title: 'ROAS Improvement', value: 45, suffix: '%', icon: 'TrendingUp', color: 'sky' },
                { key: 'conversions', title: 'Conversion Increase', value: 3, suffix: 'X', icon: 'MousePointerClick', color: 'teal' },
                { key: 'revenue', title: 'Additional Revenue', value: 50, prefix: '€', suffix: 'k+', icon: 'TrendingUp', color: 'emerald' }
            ]
        },
        seo: {
            title: 'Parfium.bg Case Study - E-commerce Google Ads | BYLT Media',
            description: 'Discover how BYLT Media helped Parfium.bg reduce CPA by 25% and increase ROAS by 45% during Black Friday and Christmas through strategic Google Ads optimization.'
        }
    },
    {
        id: 'cska',
        slug: 'cska',
        client: 'CSKA 1948',
        title: 'Increasing sales and fan base of CSKA 1948',
        description: 'CSKA Sofia 1948 strives to increase sales and fan engagement through a comprehensive digital strategy.',
        category: 'Social Media',
        imageUrl: '/images/casestudy/cska-case-study.webp',
        link: '/case-studies/cska',
        stats: [
            { value: '6X', label: 'ROAS' },
            { value: '3X', label: 'Engagements' }
        ],
        industry: 'Sports',
        services: ['Social Media Marketing', 'Content Strategy', 'Community Management'],
        hasDetailPage: true,
        hero: {
            headline: ['Building a Fan Empire', 'for CSKA 1948'],
            highlightIndex: 0,
            subtitle: 'How we transformed CSKA 1948\'s digital presence, achieving 6X ROAS on merchandise sales and tripling fan engagement through strategic social media marketing.',
            stats: [
                { value: '6X', label: 'Return on Ad Spend', icon: 'TrendingUp' },
                { value: '3X', label: 'Engagement Increase', icon: 'Users' },
                { value: '150K+', label: 'New Followers Gained', icon: 'Users' },
                { value: '€80k', label: 'Merchandise Revenue', icon: 'TrendingUp' }
            ],
            testimonial: {
                quote: "Hanno portato il nostro club nel digitale con passione e professionalità.",
                author: "Ivan Stoyanov",
                role: "Marketing Manager",
                company: "CSKA 1948"
            }
        },
        overview: {
            duration: '16 Weeks',
            platforms: 'Social Media',
            description: 'We built a comprehensive social media ecosystem for CSKA 1948, transforming their digital presence through engaging content, community building, and seamlessly integrated merchandise promotions.'
        },
        challenge: {
            description: 'CSKA 1948, one of Bulgaria\'s most passionate football clubs, needed to modernize their digital presence to compete for fans\' attention and drive merchandise sales in an increasingly digital sports landscape.',
            painPoints: [
                'Outdated social media presence with declining engagement',
                'No e-commerce integration for merchandise sales',
                'Limited fan community interaction and loyalty programs',
                'Competitors gaining ground in digital fan acquisition'
            ],
            metrics: [
                { value: '2%', label: 'Engagement Rate', type: 'negative' },
                { value: '0', label: 'Online Sales', type: 'negative' },
                { value: '50K', label: 'Stagnant Followers', type: 'neutral' },
                { value: '-30%', label: 'YoY Decline', type: 'negative' }
            ]
        },
        process: [
            {
                step: '01',
                title: 'Fan Analysis',
                subtitle: 'Week 1-3',
                description: 'Deep dive into fan demographics, behavior, and content preferences.',
                icon: 'Search',
                details: [
                    'Surveyed 5,000+ fans to understand content preferences',
                    'Analyzed competitor social strategies across European clubs',
                    'Identified key engagement drivers and optimal posting times',
                    'Mapped fan journey from casual follower to merchandise buyer',
                    'Assessed existing content library and brand assets'
                ],
                metrics: ['5,000+ fans surveyed', 'Competitor analysis', 'Fan journey mapped']
            },
            {
                step: '02',
                title: 'Content Strategy',
                subtitle: 'Week 4-6',
                description: 'Development of engaging content pillars and community guidelines.',
                icon: 'Target',
                details: [
                    'Created 5 content pillars: Match Day, Behind the Scenes, Legends, Fan Spotlight, Merchandise',
                    'Designed content calendar aligned with match schedule',
                    'Developed community engagement protocols and response templates',
                    'Built influencer partnership framework with fan ambassadors',
                    'Created branded content templates for consistency'
                ],
                metrics: ['5 content pillars', 'Full content calendar', 'Brand guidelines']
            },
            {
                step: '03',
                title: 'Campaign Launch',
                subtitle: 'Week 7-12',
                description: 'Execution of multi-platform social campaigns and merchandise promotions.',
                icon: 'Rocket',
                details: [
                    'Launched match-day live content series across platforms',
                    'Implemented user-generated content campaigns',
                    'Activated merchandise drops with exclusive fan offers',
                    'Created viral challenges featuring players and fans',
                    'Built retargeting campaigns for merchandise cart abandoners'
                ],
                metrics: ['Daily content posting', 'UGC campaigns live', 'Merch drops activated']
            },
            {
                step: '04',
                title: 'Community Growth',
                subtitle: 'Week 13-16',
                description: 'Scaling successful content and building long-term fan loyalty.',
                icon: 'Users',
                details: [
                    'Tripled engagement rate through optimized content mix',
                    'Grew follower base by 150K through viral campaigns',
                    'Achieved 6X ROAS on merchandise campaigns',
                    'Established fan loyalty program with exclusive digital perks',
                    'Created sustainable content production workflow'
                ],
                metrics: ['3X engagement', '150K new followers', '6X ROAS']
            }
        ],
        solution: {
            description: 'We built a comprehensive social media ecosystem that transformed CSKA 1948 from a traditional club into a digital-first fan experience:',
            pillars: [
                {
                    icon: 'Users',
                    title: 'Community Building',
                    text: 'Created an engaged fan community through interactive content, fan spotlights, and exclusive behind-the-scenes access.'
                },
                {
                    icon: 'Target',
                    title: 'Content Excellence',
                    text: 'Developed a content strategy featuring match-day experiences, player stories, and nostalgic club moments.'
                },
                {
                    icon: 'TrendingUp',
                    title: 'Commerce Integration',
                    text: 'Seamlessly integrated merchandise promotion into organic content, driving sales while maintaining authenticity.'
                }
            ]
        },
        results: {
            title: 'The Results',
            subtitle: 'A complete digital transformation that united fans and drove measurable business growth.',
            description: 'By building an authentic community around the club\'s legacy and combining it with strategic commerce integration, we created a self-sustaining ecosystem that drives both engagement and revenue.',
            highlights: [
                'Achieved 6X return on advertising spend across campaigns',
                'Tripled fan engagement through emotionally resonant content',
                'Built a 150K+ strong community of passionate supporters',
                'Transformed social channels into a significant revenue driver'
            ],
            metrics: [
                { key: 'roas', title: 'Return on Ad Spend', value: 6, suffix: 'X', icon: 'TrendingUp', color: 'cyan' },
                { key: 'engagement', title: 'Engagement Increase', value: 3, suffix: 'X', icon: 'Users', color: 'sky' },
                { key: 'followers', title: 'New Followers', value: 150, suffix: 'K+', icon: 'Users', color: 'teal' },
                { key: 'revenue', title: 'Merch Revenue', value: 80, prefix: '€', suffix: 'k', icon: 'TrendingUp', color: 'emerald' }
            ]
        },
        seo: {
            title: 'CSKA 1948 Case Study - Sports Social Media | BYLT Media',
            description: 'Discover how BYLT Media helped CSKA 1948 achieve 6X ROAS and triple fan engagement through strategic social media marketing and community building.'
        }
    },
    {
        id: 'napudreni',
        slug: 'napudreni',
        client: 'Napudreni',
        title: 'Improve the online presence about Napudreni',
        description: 'Napudreni is a Bulgarian fashion brand that aimed to enhance its online presence and engagement to drive sales growth.',
        category: 'Digital Marketing',
        imageUrl: '/images/casestudy/napudreni-case-study.webp',
        link: '/case-studies/napudreni',
        stats: [
            { value: '+75%', label: 'Website traffic' },
            { value: '+60%', label: 'More sales' }
        ],
        industry: 'Fashion',
        services: ['SEO', 'Content Marketing', 'Social Media'],
        hasDetailPage: true,
        hero: {
            headline: ['Elevating a Brand', 'to Digital Success'],
            highlightIndex: 0,
            subtitle: 'How we transformed Napudreni\'s digital presence, driving a 75% increase in website traffic and 60% growth in sales through integrated SEO, content, and social media strategies.',
            stats: [
                { value: '+75%', label: 'Website Traffic Increase', icon: 'TrendingUp' },
                { value: '+60%', label: 'Sales Growth', icon: 'TrendingUp' },
                { value: '50K+', label: 'Social Media Followers', icon: 'Users' },
                { value: 'Top 10', label: 'Google Rankings', icon: 'Search' }
            ],
            testimonial: {
                quote: "La crescita organica che abbiamo ottenuto è stata incredibile. Finalmente siamo visibili.",
                author: "Elena Nikolova",
                role: "Founder",
                company: "Napudreni"
            }
        },
        overview: {
            duration: '12 Weeks',
            platforms: 'Multi-Channel',
            description: 'We implemented a holistic digital marketing strategy for Napudreni, combining technical SEO, content marketing, and influencer partnerships to establish the brand as a leading player in Bulgarian fashion e-commerce.'
        },
        challenge: {
            description: 'Napudreni, a growing Bulgarian fashion brand, struggled to stand out in the competitive online fashion market and needed a comprehensive digital strategy to increase visibility and drive sustainable sales growth.',
            painPoints: [
                'Low organic search visibility against established competitors',
                'Inconsistent brand messaging across digital channels',
                'Poor social media engagement despite quality products',
                'High dependency on paid advertising with declining ROI'
            ],
            metrics: [
                { value: 'Page 3+', label: 'Google Rankings', type: 'negative' },
                { value: '1.5%', label: 'Engagement Rate', type: 'negative' },
                { value: '80%', label: 'Paid Traffic Dependency', type: 'neutral' },
                { value: '2.1%', label: 'Conversion Rate', type: 'negative' }
            ]
        },
        process: [
            {
                step: '01',
                title: 'Brand & Market Audit',
                subtitle: 'Week 1-2',
                description: 'Comprehensive analysis of brand positioning and competitive landscape.',
                icon: 'Search',
                details: [
                    'Conducted full SEO audit identifying 200+ optimization opportunities',
                    'Analyzed top 10 fashion competitors\' digital strategies',
                    'Mapped customer journey from discovery to purchase',
                    'Assessed brand voice consistency across all channels',
                    'Identified high-value keywords with purchase intent'
                ],
                metrics: ['200+ SEO opportunities', '10 competitors analyzed', 'Keyword research complete']
            },
            {
                step: '02',
                title: 'SEO Foundation',
                subtitle: 'Week 3-5',
                description: 'Technical SEO optimization and content structure improvements.',
                icon: 'Code',
                details: [
                    'Implemented technical SEO fixes across 150+ pages',
                    'Optimized site speed from 4s to under 2s load time',
                    'Created SEO-optimized category and product descriptions',
                    'Built internal linking structure for better crawlability',
                    'Implemented schema markup for rich search results'
                ],
                metrics: ['150+ pages optimized', '50% faster load time', 'Schema implemented']
            },
            {
                step: '03',
                title: 'Content & Social Strategy',
                subtitle: 'Week 6-9',
                description: 'Development and execution of integrated content marketing.',
                icon: 'Target',
                details: [
                    'Launched fashion blog with trend articles and styling guides',
                    'Created UGC campaign encouraging customer style shares',
                    'Developed influencer partnership with 20 micro-influencers',
                    'Implemented consistent visual identity across Instagram and Facebook',
                    'Built email marketing sequences for customer retention'
                ],
                metrics: ['20 blog posts', '20 influencer partnerships', 'Email sequences live']
            },
            {
                step: '04',
                title: 'Growth & Optimization',
                subtitle: 'Week 10-12',
                description: 'Scaling successful initiatives and continuous optimization.',
                icon: 'TrendingUp',
                details: [
                    'Achieved 75% organic traffic growth through SEO efforts',
                    'Increased sales by 60% with improved conversion rates',
                    'Built engaged community of 50K+ social followers',
                    'Reduced paid advertising dependency by 40%',
                    'Established sustainable content calendar and processes'
                ],
                metrics: ['+75% traffic', '+60% sales', '50K+ followers']
            }
        ],
        solution: {
            description: 'We implemented a holistic digital marketing strategy that elevated Napudreni\'s brand presence across all digital touchpoints:',
            pillars: [
                {
                    icon: 'Search',
                    title: 'SEO Excellence',
                    text: 'Comprehensive technical and content SEO strategy that boosted organic visibility and reduced dependency on paid ads.'
                },
                {
                    icon: 'Target',
                    title: 'Content Marketing',
                    text: 'Fashion-focused content strategy including blog articles, styling guides, and user-generated content campaigns.'
                },
                {
                    icon: 'Users',
                    title: 'Social Media Growth',
                    text: 'Authentic community building through influencer partnerships and engaging visual content that resonated with fashion-conscious audiences.'
                }
            ]
        },
        results: {
            title: 'The Results',
            subtitle: 'A transformed digital presence that drives sustainable organic growth and sales.',
            description: 'Our holistic approach combining SEO excellence, compelling content, and authentic social engagement transformed Napudreni into a digital-first fashion brand with a loyal customer base.',
            highlights: [
                'Achieved 75% organic traffic growth through strategic SEO',
                'Boosted online sales by 60% with optimised user journeys',
                'Built a 50K+ engaged social community of fashion enthusiasts',
                'Ranked 85+ keywords in top 10 search results'
            ],
            metrics: [
                { key: 'traffic', title: 'Traffic Increase', value: 75, suffix: '%', icon: 'TrendingUp', color: 'cyan' },
                { key: 'sales', title: 'Sales Growth', value: 60, suffix: '%', icon: 'TrendingUp', color: 'sky' },
                { key: 'followers', title: 'Social Followers', value: 50, suffix: 'K+', icon: 'Users', color: 'teal' },
                { key: 'rankings', title: 'Keywords in Top 10', value: 85, suffix: '+', icon: 'Search', color: 'emerald' }
            ]
        },
        seo: {
            title: 'Napudreni Case Study - Fashion Digital Marketing | BYLT Media',
            description: 'Discover how BYLT Media helped Napudreni achieve 75% traffic growth and 60% more sales through integrated SEO, content marketing, and social media strategies.'
        }
    },
    {
        id: 'happy',
        slug: 'happy',
        client: 'Happy Bar & Grill',
        title: 'Boosting Traffic and Engagement for Happy Bar & Grill',
        description: 'Happy Bar & Grill is the most popular restaurant chain in Bulgaria. The goal was to increase website traffic and engagement, particularly for seasonal menus and location-specific pages.',
        category: 'Social Media',
        imageUrl: '/images/casestudy/happy-case-study.webp',
        link: '/case-studies/happy',
        stats: [
            { value: '16.5M', label: 'Impressions' },
            { value: '362K', label: 'Video Views' }
        ],
        industry: 'Food & Beverage',
        services: ['Social Media Marketing', 'Video Production', 'Influencer Marketing'],
        hasDetailPage: true,
        hero: {
            headline: ['Serving Viral Content', 'for Happy Bar & Grill'],
            highlightIndex: 0,
            subtitle: 'How we achieved 16.5M impressions and 362K video views for Happy Bar & Grill through creative social media campaigns and strategic influencer partnerships.',
            stats: [
                { value: '16.5M', label: 'Total Impressions', icon: 'TrendingUp' },
                { value: '362K', label: 'Video Views', icon: 'MousePointerClick' },
                { value: '45%', label: 'Engagement Rate Increase', icon: 'Users' },
                { value: '25+', label: 'Influencer Collaborations', icon: 'Users' }
            ],
            testimonial: {
                quote: "I contenuti che hanno creato hanno reso il nostro brand irresistibile sui social.",
                author: "Marketing Team",
                role: "Social Media Director",
                company: "Happy Bar & Grill"
            }
        },
        overview: {
            duration: '10 Weeks',
            platforms: 'Social Media',
            description: 'We crafted a viral-worthy social media strategy for Happy Bar & Grill, producing professional food content and activating influencer partnerships to drive engagement and foot traffic across all 30+ locations.'
        },
        challenge: {
            description: 'Happy Bar & Grill, Bulgaria\'s most popular restaurant chain with 30+ locations, needed to revitalize their social media presence and drive traffic to location-specific pages and seasonal menu promotions.',
            painPoints: [
                'Declining organic reach across social platforms',
                'Generic content not driving location-specific traffic',
                'Seasonal menu launches not generating enough buzz',
                'Competitors increasing their digital marketing efforts'
            ],
            metrics: [
                { value: '2M', label: 'Monthly Impressions', type: 'neutral' },
                { value: '50K', label: 'Video Views/Month', type: 'negative' },
                { value: '3%', label: 'Engagement Rate', type: 'negative' },
                { value: '5', label: 'Influencer Partners', type: 'neutral' }
            ]
        },
        process: [
            {
                step: '01',
                title: 'Content Audit',
                subtitle: 'Week 1-2',
                description: 'Analysis of existing content performance and audience preferences.',
                icon: 'Search',
                details: [
                    'Analyzed 12 months of content performance data',
                    'Identified top-performing content formats and themes',
                    'Mapped audience demographics across 30+ locations',
                    'Researched food industry trends and viral content patterns',
                    'Assessed competitor content strategies in F&B sector'
                ],
                metrics: ['12 months analyzed', '30+ locations mapped', 'Trend research complete']
            },
            {
                step: '02',
                title: 'Creative Strategy',
                subtitle: 'Week 3-4',
                description: 'Development of viral-worthy content concepts and influencer partnerships.',
                icon: 'Target',
                details: [
                    'Created 10 content series concepts focused on food storytelling',
                    'Identified and vetted 25+ food influencers for collaboration',
                    'Designed seasonal campaign framework for menu launches',
                    'Developed video production guidelines for viral potential',
                    'Built location-specific content calendar for all restaurants'
                ],
                metrics: ['10 content series', '25+ influencers', 'Campaign framework ready']
            },
            {
                step: '03',
                title: 'Campaign Execution',
                subtitle: 'Week 5-8',
                description: 'Launch of multi-format content campaigns and influencer activations.',
                icon: 'Rocket',
                details: [
                    'Produced 50+ professional food videos and reels',
                    'Activated influencer partnerships with coordinated posting',
                    'Launched seasonal menu campaigns with exclusive content',
                    'Implemented user-generated content contests',
                    'Created location-specific promotions driving foot traffic'
                ],
                metrics: ['50+ videos produced', 'Influencer campaigns live', 'UGC contests active']
            },
            {
                step: '04',
                title: 'Optimization & Scale',
                subtitle: 'Week 9-10',
                description: 'Performance analysis and scaling of successful content.',
                icon: 'TrendingUp',
                details: [
                    'Achieved 16.5M total impressions across campaigns',
                    'Generated 362K video views with viral food content',
                    'Increased engagement rate by 45% through optimized content',
                    'Successfully drove traffic to seasonal menu landing pages',
                    'Established repeatable content production processes'
                ],
                metrics: ['16.5M impressions', '362K video views', '45% engagement boost']
            }
        ],
        solution: {
            description: 'We created a mouth-watering social media strategy that made Happy Bar & Grill the talk of Bulgaria\'s food scene:',
            pillars: [
                {
                    icon: 'MousePointerClick',
                    title: 'Viral Video Content',
                    text: 'Professional food videos and reels designed for maximum shareability and platform-native engagement.'
                },
                {
                    icon: 'Users',
                    title: 'Influencer Network',
                    text: 'Strategic partnerships with 25+ food influencers for authentic brand advocacy and expanded reach.'
                },
                {
                    icon: 'Target',
                    title: 'Localized Campaigns',
                    text: 'Location-specific content and promotions driving foot traffic to individual restaurant locations.'
                }
            ]
        },
        results: {
            title: 'The Results',
            subtitle: 'A feast of engagement that made Happy the most talked-about restaurant brand in Bulgaria.',
            description: 'Our multi-channel content strategy combining mouthwatering visuals, strategic influencer partnerships, and community engagement established Happy as Bulgaria\'s most engaging restaurant brand.',
            highlights: [
                'Reached 16.5 million impressions across social platforms',
                'Generated 362K video views with engaging culinary content',
                'Increased overall engagement by 45% year-over-year',
                'Built a network of 25+ authentic influencer partnerships'
            ],
            metrics: [
                { key: 'impressions', title: 'Total Impressions', value: 16.5, suffix: 'M', icon: 'TrendingUp', color: 'cyan' },
                { key: 'views', title: 'Video Views', value: 362, suffix: 'K', icon: 'MousePointerClick', color: 'sky' },
                { key: 'engagement', title: 'Engagement Increase', value: 45, suffix: '%', icon: 'Users', color: 'teal' },
                { key: 'influencers', title: 'Influencer Collabs', value: 25, suffix: '+', icon: 'Users', color: 'emerald' }
            ]
        },
        seo: {
            title: 'Happy Bar & Grill Case Study - Restaurant Social Media | BYLT Media',
            description: 'Discover how BYLT Media achieved 16.5M impressions and 362K video views for Happy Bar & Grill through strategic social media marketing and influencer partnerships.'
        }
    },
    {
        id: 'brickell',
        slug: 'brickell',
        client: 'Brickell Automotive Group',
        title: 'Expanding the customer base and brand awareness for Brickell Automotive Group',
        description: 'Brickell Automotive Group needed to increase online engagement and acquire higher-quality leads through targeted campaigns on Meta.',
        category: 'Paid Media',
        imageUrl: '/images/casestudy/brickell-case-study.webp',
        link: '/case-studies/brickell',
        stats: [
            { value: '2.5%', label: 'CTR' },
            { value: '15K', label: 'Impressions' }
        ],
        industry: 'Automotive',
        services: ['Meta Ads', 'Lead Generation', 'Audience Targeting'],
        hasDetailPage: true,
        hero: {
            headline: ['Accelerating Leads', 'for Brickell Automotive'],
            highlightIndex: 0,
            subtitle: 'How we helped Brickell Automotive Group achieve a 2.5% CTR and generate high-quality leads through precision-targeted Meta advertising campaigns.',
            stats: [
                { value: '2.5%', label: 'Click-Through Rate', icon: 'MousePointerClick' },
                { value: '15K+', label: 'Monthly Impressions', icon: 'TrendingUp' },
                { value: '40%', label: 'Lead Quality Improvement', icon: 'Target' },
                { value: '$35', label: 'Cost Per Lead', icon: 'TrendingUp' }
            ],
            testimonial: {
                quote: "The quality of leads we're getting now is completely different. Real buyers, not tire kickers.",
                author: "Sales Director",
                role: "VP of Sales",
                company: "Brickell Automotive"
            }
        },
        overview: {
            duration: '8 Weeks',
            platforms: 'Meta Ads',
            description: 'We developed a premium Meta advertising strategy for Brickell Automotive Group, combining precision audience targeting with high-quality creative to attract qualified luxury vehicle buyers in the competitive South Florida market.'
        },
        challenge: {
            description: 'Brickell Automotive Group, a premium dealership in Miami, needed to cut through the competitive South Florida automotive market and attract high-intent buyers for their luxury vehicle inventory.',
            painPoints: [
                'High competition in Miami\'s luxury auto market',
                'Low-quality leads wasting sales team resources',
                'Poor targeting resulting in low engagement rates',
                'Inconsistent ad creative not reflecting premium brand'
            ],
            metrics: [
                { value: '0.8%', label: 'Previous CTR', type: 'negative' },
                { value: '$75', label: 'Cost Per Lead', type: 'negative' },
                { value: '20%', label: 'Lead-to-Sale Rate', type: 'neutral' },
                { value: '65%', label: 'Unqualified Leads', type: 'negative' }
            ]
        },
        process: [
            {
                step: '01',
                title: 'Market Research',
                subtitle: 'Week 1-2',
                description: 'Deep analysis of target audience and competitive landscape.',
                icon: 'Search',
                details: [
                    'Analyzed Miami luxury auto buyer demographics and behaviors',
                    'Mapped competitor advertising strategies on Meta platforms',
                    'Identified high-value audience segments by income and interests',
                    'Reviewed existing customer data to build lookalike profiles',
                    'Assessed seasonal trends in luxury vehicle purchases'
                ],
                metrics: ['Audience analysis', 'Competitor mapping', 'Buyer personas created']
            },
            {
                step: '02',
                title: 'Creative Development',
                subtitle: 'Week 3-4',
                description: 'Premium ad creative designed for luxury automotive market.',
                icon: 'Target',
                details: [
                    'Developed 15 ad variations showcasing inventory highlights',
                    'Created video content featuring vehicle walkthroughs',
                    'Designed carousel ads for model-specific targeting',
                    'Built lead forms with qualification questions',
                    'Established brand guidelines for consistent premium feel'
                ],
                metrics: ['15 ad variations', 'Video content', 'Lead forms optimized']
            },
            {
                step: '03',
                title: 'Campaign Launch',
                subtitle: 'Week 5-6',
                description: 'Strategic campaign deployment with precision targeting.',
                icon: 'Rocket',
                details: [
                    'Launched campaigns across Facebook and Instagram',
                    'Implemented lookalike audiences based on best customers',
                    'Activated interest-based targeting for luxury auto enthusiasts',
                    'Set up retargeting for website visitors and video viewers',
                    'Deployed A/B tests for creative and audience optimization'
                ],
                metrics: ['Multi-platform launch', 'Lookalike audiences', 'Retargeting active']
            },
            {
                step: '04',
                title: 'Performance Optimization',
                subtitle: 'Week 7-8',
                description: 'Continuous refinement for maximum lead quality and ROI.',
                icon: 'TrendingUp',
                details: [
                    'Achieved 2.5% CTR through creative optimization',
                    'Reduced cost per lead by 53% from $75 to $35',
                    'Improved lead quality by 40% with better targeting',
                    'Scaled winning campaigns for consistent lead flow',
                    'Established ongoing optimization and reporting cadence'
                ],
                metrics: ['2.5% CTR achieved', '53% CPL reduction', '40% quality improvement']
            }
        ],
        solution: {
            description: 'We developed a premium Meta advertising strategy that positioned Brickell Automotive as the go-to dealership for luxury vehicle buyers in South Florida:',
            pillars: [
                {
                    icon: 'Target',
                    title: 'Precision Targeting',
                    text: 'Advanced audience segmentation targeting high-net-worth individuals with demonstrated interest in luxury vehicles.'
                },
                {
                    icon: 'MousePointerClick',
                    title: 'Premium Creative',
                    text: 'High-quality video and image content that showcased the luxury inventory and premium buying experience.'
                },
                {
                    icon: 'Users',
                    title: 'Lead Qualification',
                    text: 'Optimized lead forms with qualifying questions to ensure sales team receives only high-intent prospects.'
                }
            ]
        },
        results: {
            title: 'The Results',
            subtitle: 'Precision targeting that delivered quality leads and maximized advertising ROI.',
            description: 'Our data-driven approach combining precise audience segmentation, premium creative assets, and optimised lead qualification delivered a steady stream of high-value prospects ready to purchase.',
            highlights: [
                'Achieved 2.5% click-through rate—well above industry average',
                'Improved lead quality by 40% through strategic qualification',
                'Maintained consistent $35 cost per qualified lead',
                'Generated 15K+ monthly impressions among luxury buyers'
            ],
            metrics: [
                { key: 'ctr', title: 'Click-Through Rate', value: 2.5, suffix: '%', icon: 'MousePointerClick', color: 'cyan' },
                { key: 'impressions', title: 'Monthly Impressions', value: 15, suffix: 'K+', icon: 'TrendingUp', color: 'sky' },
                { key: 'quality', title: 'Lead Quality Boost', value: 40, suffix: '%', icon: 'Target', color: 'teal' },
                { key: 'cpl', title: 'Cost Per Lead', value: 35, prefix: '$', suffix: '', icon: 'TrendingUp', color: 'emerald' }
            ]
        },
        seo: {
            title: 'Brickell Automotive Case Study - Automotive Lead Gen | BYLT Media',
            description: 'Discover how BYLT Media helped Brickell Automotive Group achieve 2.5% CTR and improve lead quality by 40% through targeted Meta advertising campaigns.'
        }
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

// Why BYLT comparison data
export const whyByltContent = {
    badge: 'The BYLT Difference',
    heading: 'Why Choose Us?',
    subheading: "We're not just another agency. Here's what sets us apart.",
    others: {
        title: 'Traditional Agencies',
        items: [
            'Generic, one-size-fits-all solutions',
            'Months before seeing results',
            'Hidden fees and budget surprises',
            'Vanity metrics without real impact'
        ]
    },
    bylt: {
        title: 'With BYLT',
        items: [
            'Custom strategies for your goals',
            'Rapid delivery in weeks, not months',
            'Transparent pricing, no surprises',
            'Data-driven, measurable results'
        ]
    }
};

// Process preview data
export const processPreviewContent = {
    badge: 'How We Work',
    heading: 'From Idea to Impact',
    steps: [
        {
            number: '01',
            title: 'Discovery',
            description: 'We dive deep into your business, goals, and audience'
        },
        {
            number: '02',
            title: 'Strategy',
            description: 'Custom roadmap tailored to your specific needs'
        },
        {
            number: '03',
            title: 'Execute',
            description: 'Rapid implementation with weekly check-ins'
        },
        {
            number: '04',
            title: 'Optimize',
            description: 'Continuous improvement based on real data'
        }
    ]
};
