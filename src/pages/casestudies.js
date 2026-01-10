import React from 'react';
import Head from 'next/head';
import Layout from '../components/layout';
import { CaseStudiesPage } from '../components/caseStudies';

const CaseStudies = () => {
    return (
        <Layout>
            <Head>
                <title>Case Studies - Proven Results | BYLT Media</title>
                <meta name="description" content="Explore our case studies and see how BYLT Media drives growth for clients across Paid Media, SEO, AI, and more." />
                <link rel="icon" href="/favicon.ico" />
                <link rel="canonical" href="https://www.byltmedia.com/casestudies" />
                <meta name="robots" content="index, follow" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
            </Head>

            <CaseStudiesPage />
        </Layout>
    );
};

export default CaseStudies;
