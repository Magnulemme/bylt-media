import Head from 'next/head';
import Layout from '../../components/layout';
import GlobalStyles from '../../components/globalsyles';
import CaseStudiesPage from '../../components/caseStudies/CaseStudiesPage';

export default function CaseStudiesIndex() {
    return (
        <Layout>
            <Head>
                <title>Case Studies | BYLT Media</title>
                <meta name="description" content="Explore our success stories and see how we've helped businesses grow through digital marketing, web development, and brand strategy." />
                <link rel="icon" href="/favicon.ico" />
                <link rel="canonical" href="https://www.byltmedia.com/case-studies" />
                <meta name="robots" content="index, follow" />
            </Head>
            <GlobalStyles />
            <CaseStudiesPage />
        </Layout>
    );
}
