import Head from 'next/head';
import dynamic from 'next/dynamic';
import Layout from '../../components/layout';
import GlobalStyles from '../../components/globalsyles';
import CaseStudyTemplate from '../../components/caseStudies/CaseStudyTemplate';
import { getCaseStudySlugs, getCaseStudyBySlug } from '../../components/caseStudies/constants';

// Dynamic import for contact section
const NeuralContact = dynamic(
    () => import('../../components/home/NeuralContact'),
    { ssr: false }
);

export default function CaseStudyPage({ study }) {
    if (!study) {
        return (
            <Layout>
                <div className="min-h-dvh flex items-center justify-center">
                    <p className="text-white">Case study not found</p>
                </div>
            </Layout>
        );
    }

    const seo = study.seo || {
        title: `${study.client} Case Study | BYLT Media`,
        description: study.description
    };

    return (
        <Layout>
            <Head>
                <title>{seo.title}</title>
                <meta name="description" content={seo.description} />
                <link rel="icon" href="/favicon.ico" />
                <link rel="canonical" href={`https://www.byltmedia.com/case-studies/${study.slug}`} />
                <meta name="robots" content="index, follow" />
            </Head>
            <GlobalStyles />

            <CaseStudyTemplate study={study} />
            <NeuralContact />
        </Layout>
    );
}

export async function getStaticPaths() {
    const slugs = getCaseStudySlugs();

    // Only generate paths for case studies with detailed data
    const paths = slugs
        .map(slug => getCaseStudyBySlug(slug))
        .filter(study => study?.hasDetailPage)
        .map(study => ({
            params: { slug: study.slug }
        }));

    return {
        paths,
        fallback: false
    };
}

export async function getStaticProps({ params }) {
    const study = getCaseStudyBySlug(params.slug);

    if (!study || !study.hasDetailPage) {
        return {
            notFound: true
        };
    }

    return {
        props: {
            study
        }
    };
}
