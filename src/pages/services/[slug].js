import Head from 'next/head';
import Layout from '../../components/layout';
import { ServicePage, getServiceSlugs, getServiceBySlug } from '../../components/services';

export default function ServicePageRoute({ service }) {
    if (!service) {
        return (
            <Layout>
                <div className="min-h-screen flex items-center justify-center bg-slate-950">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-white mb-4">Service Not Found</h1>
                        <p className="text-gray-400 mb-8">The service you're looking for doesn't exist.</p>
                        <a href="/" className="text-cyan-400 hover:text-cyan-300">
                            Return Home
                        </a>
                    </div>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <Head>
                <title>{service.meta.title}</title>
                <meta name="description" content={service.meta.description} />
                <link rel="canonical" href={service.meta.canonical} />
                <meta name="robots" content="index, follow" />

                {/* Open Graph */}
                <meta property="og:title" content={service.meta.title} />
                <meta property="og:description" content={service.meta.description} />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={service.meta.canonical} />

                {/* Schema Markup */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "Service",
                            "name": `${service.title} Services`,
                            "description": service.description,
                            "provider": {
                                "@type": "Organization",
                                "name": "BYLT Media",
                                "url": "https://www.byltmedia.com"
                            },
                            "areaServed": ["GB", "EU"],
                            "serviceType": "Digital Marketing",
                            "category": service.subtitle
                        })
                    }}
                />
            </Head>

            <ServicePage service={service} />
        </Layout>
    );
}

export async function getStaticPaths() {
    const slugs = getServiceSlugs();

    return {
        paths: slugs.map((slug) => ({
            params: { slug }
        })),
        fallback: false
    };
}

export async function getStaticProps({ params }) {
    const service = getServiceBySlug(params.slug);

    if (!service) {
        return {
            notFound: true
        };
    }

    return {
        props: {
            service
        }
    };
}
