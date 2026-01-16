import React from 'react';
import Head from 'next/head';
import Layout from '../components/layout';
import GlobalStyles from '../components/globalsyles';

const TermsAndConditionsPage = () => {
    return (
        <Layout>
            <Head>
                <title>Terms and Conditions | BYLT Media</title>
                <meta name="description" content="Terms and Conditions for Booked Up Media Ltd trading as BYLT Media - Digital marketing services in the UK." />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <GlobalStyles />
            
            <div className="min-h-dvh bg-slate-900 pt-24 pb-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-slate-800/50 rounded-lg p-8 backdrop-blur-sm border border-slate-700">
                        <h1 className="text-4xl font-bold text-white mb-8">Terms and Conditions</h1>
                        <div className="prose prose-slate prose-invert max-w-none">
                            <p className="text-gray-300 mb-6">Last updated: 3rd August 2025</p>
                            
                            <section className="mb-8">
                                <h2 className="text-2xl font-semibold text-white mb-4">1. Introduction and Acceptance</h2>
                                <p className="text-gray-300 mb-4">
                                    These Terms and Conditions ("Terms") govern your use of the services provided by Booked Up Media Ltd, a company registered in Scotland, trading as BYLT Media ("we", "us", "our", "the Company").
                                </p>
                                <div className="bg-slate-700/30 p-4 rounded-md mb-4">
                                    <p className="text-gray-300 text-sm mb-2"><strong>Registered Address:</strong> 89 Giles Street, Edinburgh, Scotland, EH6 6BZ</p>
                                    <p className="text-gray-300 text-sm mb-2"><strong>Telephone:</strong> +44 (131) 605 03 12</p>
                                    <p className="text-gray-300 text-sm"><strong>Email:</strong> hello@bookedupmedia.com</p>
                                </div>
                                <p className="text-gray-300 mb-4">
                                    By engaging our services, accessing our website, or entering into any agreement with us, you ("the Client", "you", "your") agree to be legally bound by these Terms. If you do not agree to these Terms, you must not use our services.
                                </p>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-semibold text-white mb-4">2. Definitions</h2>
                                <ul className="text-gray-300 space-y-2 list-disc pl-6">
                                    <li><strong>"Services"</strong> means all digital marketing services provided by the Company including but not limited to SEO, PPC advertising, social media marketing, web development, content creation, and digital consultancy</li>
                                    <li><strong>"Agreement"</strong> means any contract for Services between the Company and the Client</li>
                                    <li><strong>"Deliverables"</strong> means any work product, materials, or results produced by the Company for the Client</li>
                                    <li><strong>"Confidential Information"</strong> means any proprietary or confidential information disclosed by either party</li>
                                </ul>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-semibold text-white mb-4">3. Services Provided</h2>
                                <h3 className="text-xl font-semibold text-white mb-3">3.1 Scope of Services</h3>
                                <p className="text-gray-300 mb-4">The Company provides digital marketing services including:</p>
                                <ul className="text-gray-300 space-y-2 list-disc pl-6 mb-4">
                                    <li>Search Engine Optimisation (SEO)</li>
                                    <li>Pay-Per-Click (PPC) advertising management</li>
                                    <li>Social media marketing and management</li>
                                    <li>Website design and development</li>
                                    <li>Content creation and copywriting</li>
                                    <li>Digital marketing consultancy and strategy</li>
                                    <li>Analytics and reporting services</li>
                                </ul>
                                <h3 className="text-xl font-semibold text-white mb-3">3.2 Service Delivery</h3>
                                <ul className="text-gray-300 space-y-2 list-disc pl-6">
                                    <li>Services will be delivered in accordance with the specific terms outlined in individual service agreements or proposals</li>
                                    <li>Timescales are estimates and may be subject to change due to circumstances beyond our reasonable control</li>
                                    <li>The Company reserves the right to subcontract any services to qualified third parties</li>
                                </ul>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-semibold text-white mb-4">4. Client Obligations and Responsibilities</h2>
                                <h3 className="text-xl font-semibold text-white mb-3">4.1 Information and Materials</h3>
                                <p className="text-gray-300 mb-4">The Client agrees to:</p>
                                <ul className="text-gray-300 space-y-2 list-disc pl-6 mb-4">
                                    <li>Provide accurate, complete, and timely information necessary for service delivery</li>
                                    <li>Supply all required materials, content, and access credentials promptly</li>
                                    <li>Respond to reasonable requests for information within 5 business days</li>
                                    <li>Ensure all provided content is original, legally owned, or properly licensed</li>
                                </ul>
                                <h3 className="text-xl font-semibold text-white mb-3">4.2 Compliance</h3>
                                <p className="text-gray-300 mb-4">The Client warrants that:</p>
                                <ul className="text-gray-300 space-y-2 list-disc pl-6 mb-4">
                                    <li>All business activities comply with applicable UK and international laws</li>
                                    <li>Any content provided does not infringe third-party rights</li>
                                    <li>They have authority to enter into agreements on behalf of their organisation</li>
                                    <li>They will not use our services for any unlawful purposes</li>
                                </ul>
                                <h3 className="text-xl font-semibold text-white mb-3">4.3 Cooperation</h3>
                                <ul className="text-gray-300 space-y-2 list-disc pl-6">
                                    <li>The Client will provide reasonable cooperation and access as required</li>
                                    <li>Any delays caused by the Client may result in project timeline extensions</li>
                                    <li>Additional work resulting from Client delays may incur extra charges</li>
                                </ul>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-semibold text-white mb-4">5. Payment Terms and Conditions</h2>
                                <h3 className="text-xl font-semibold text-white mb-3">5.1 Fees and Charges</h3>
                                <ul className="text-gray-300 space-y-2 list-disc pl-6 mb-4">
                                    <li>All fees are quoted in British Pounds (GBP) unless otherwise specified</li>
                                    <li>Prices are exclusive of VAT, which will be added at the prevailing rate where applicable</li>
                                    <li>Setup fees, monthly retainers, and project costs will be detailed in individual agreements</li>
                                </ul>
                                <h3 className="text-xl font-semibold text-white mb-3">5.2 Payment Terms</h3>
                                <ul className="text-gray-300 space-y-2 list-disc pl-6 mb-4">
                                    <li>Payment terms are typically 30 days from invoice date unless otherwise agreed</li>
                                    <li>Payment methods accepted include bank transfer, cheque, and card payments</li>
                                    <li>Late payment charges may apply at 8% per annum above the Bank of England base rate</li>
                                </ul>
                                <h3 className="text-xl font-semibold text-white mb-3">5.3 Overdue Accounts</h3>
                                <ul className="text-gray-300 space-y-2 list-disc pl-6">
                                    <li>Accounts overdue by more than 30 days may result in service suspension</li>
                                    <li>The Company reserves the right to engage debt collection services for overdue accounts</li>
                                    <li>All costs associated with debt recovery will be charged to the Client</li>
                                </ul>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-semibold text-white mb-4">6. Intellectual Property Rights</h2>
                                <h3 className="text-xl font-semibold text-white mb-3">6.1 Company IP</h3>
                                <ul className="text-gray-300 space-y-2 list-disc pl-6 mb-4">
                                    <li>All methodologies, strategies, templates, and proprietary systems remain the Company's intellectual property</li>
                                    <li>The Company retains rights to any general knowledge, skills, and experience gained</li>
                                </ul>
                                <h3 className="text-xl font-semibold text-white mb-3">6.2 Client IP</h3>
                                <ul className="text-gray-300 space-y-2 list-disc pl-6 mb-4">
                                    <li>Clients retain ownership of their original content, branding, and pre-existing materials</li>
                                    <li>The Company is granted a licence to use Client materials solely for providing the agreed services</li>
                                </ul>
                                <h3 className="text-xl font-semibold text-white mb-3">6.3 Deliverables</h3>
                                <ul className="text-gray-300 space-y-2 list-disc pl-6">
                                    <li>Ownership of custom deliverables transfers to the Client upon full payment</li>
                                    <li>The Company retains the right to use work as portfolio examples and case studies (with sensitive information removed)</li>
                                </ul>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-semibold text-white mb-4">7. Confidentiality and Data Protection</h2>
                                <h3 className="text-xl font-semibold text-white mb-3">7.1 Confidentiality</h3>
                                <p className="text-gray-300 mb-4">Both parties agree to maintain confidentiality of all proprietary and sensitive information shared during the course of the business relationship.</p>
                                <h3 className="text-xl font-semibold text-white mb-3">7.2 Data Protection</h3>
                                <p className="text-gray-300 mb-4">The Company complies with the UK General Data Protection Regulation (UK GDPR) and Data Protection Act 2018. Our Privacy Policy, available on our website, details how we process personal data.</p>
                                <h3 className="text-xl font-semibold text-white mb-3">7.3 Third-Party Platforms</h3>
                                <ul className="text-gray-300 space-y-2 list-disc pl-6">
                                    <li>The Company may require access to Client accounts on third-party platforms (Google, Facebook, etc.)</li>
                                    <li>The Company will use such access solely for providing agreed services</li>
                                    <li>Clients remain responsible for maintaining appropriate security measures</li>
                                </ul>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-semibold text-white mb-4">8. Warranties and Disclaimers</h2>
                                <h3 className="text-xl font-semibold text-white mb-3">8.1 Company Warranties</h3>
                                <p className="text-gray-300 mb-4">The Company warrants that:</p>
                                <ul className="text-gray-300 space-y-2 list-disc pl-6 mb-4">
                                    <li>Services will be performed with reasonable skill and care</li>
                                    <li>We will comply with applicable professional standards</li>
                                    <li>Our team has appropriate qualifications and experience</li>
                                </ul>
                                <h3 className="text-xl font-semibold text-white mb-3">8.2 Disclaimers</h3>
                                <ul className="text-gray-300 space-y-2 list-disc pl-6 mb-4">
                                    <li>Digital marketing results cannot be guaranteed due to factors beyond our control</li>
                                    <li>Search engine algorithms, platform policies, and market conditions may affect outcomes</li>
                                    <li>The Company makes no warranties regarding specific traffic increases, rankings, or conversions</li>
                                </ul>
                                <h3 className="text-xl font-semibold text-white mb-3">8.3 Third-Party Services</h3>
                                <ul className="text-gray-300 space-y-2 list-disc pl-6">
                                    <li>The Company is not responsible for third-party platform changes, outages, or policy modifications</li>
                                    <li>Costs associated with third-party platforms (advertising spend, software licences) are Client expenses</li>
                                </ul>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-semibold text-white mb-4">9. Limitation of Liability</h2>
                                <h3 className="text-xl font-semibold text-white mb-3">9.1 Liability Cap</h3>
                                <p className="text-gray-300 mb-4">The Company's total liability for any claim shall not exceed the total fees paid by the Client in the 12 months preceding the claim.</p>
                                <h3 className="text-xl font-semibold text-white mb-3">9.2 Excluded Damages</h3>
                                <p className="text-gray-300 mb-4">The Company shall not be liable for:</p>
                                <ul className="text-gray-300 space-y-2 list-disc pl-6 mb-4">
                                    <li>Indirect, consequential, or special damages</li>
                                    <li>Loss of profits, revenue, or business opportunities</li>
                                    <li>Costs of procurement of substitute services</li>
                                    <li>Data loss not caused by our negligence</li>
                                </ul>
                                <h3 className="text-xl font-semibold text-white mb-3">9.3 Force Majeure</h3>
                                <p className="text-gray-300 mb-4">The Company is not liable for delays or failures due to circumstances beyond reasonable control, including but not limited to acts of God, government actions, or technical failures.</p>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-semibold text-white mb-4">10. Termination</h2>
                                <h3 className="text-xl font-semibold text-white mb-3">10.1 Termination Rights</h3>
                                <ul className="text-gray-300 space-y-2 list-disc pl-6 mb-4">
                                    <li>Either party may terminate ongoing services with 30 days' written notice</li>
                                    <li>The Company may terminate immediately for non-payment or breach of terms</li>
                                    <li>Fixed-term projects cannot be terminated without mutual agreement or material breach</li>
                                </ul>
                                <h3 className="text-xl font-semibold text-white mb-3">10.2 Effects of Termination</h3>
                                <ul className="text-gray-300 space-y-2 list-disc pl-6 mb-4">
                                    <li>All outstanding fees become immediately due</li>
                                    <li>The Company will provide reasonable handover assistance for up to 30 days</li>
                                    <li>Confidentiality obligations survive termination</li>
                                </ul>
                                <h3 className="text-xl font-semibold text-white mb-3">10.3 Refunds</h3>
                                <ul className="text-gray-300 space-y-2 list-disc pl-6">
                                    <li>Refunds are generally not provided for services already delivered</li>
                                    <li>Unused portions of prepaid services may be refunded at the Company's discretion</li>
                                    <li>Setup fees and completed work are non-refundable</li>
                                </ul>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-semibold text-white mb-4">11. Dispute Resolution</h2>
                                <h3 className="text-xl font-semibold text-white mb-3">11.1 Governing Law</h3>
                                <p className="text-gray-300 mb-4">These Terms are governed by the laws of Scotland and the United Kingdom.</p>
                                <h3 className="text-xl font-semibold text-white mb-3">11.2 Jurisdiction</h3>
                                <p className="text-gray-300 mb-4">Any disputes shall be subject to the exclusive jurisdiction of the Scottish courts.</p>
                                <h3 className="text-xl font-semibold text-white mb-3">11.3 Alternative Dispute Resolution</h3>
                                <p className="text-gray-300 mb-4">The parties agree to attempt resolution through good faith negotiation before pursuing formal legal action.</p>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-semibold text-white mb-4">12. General Provisions</h2>
                                <h3 className="text-xl font-semibold text-white mb-3">12.1 Entire Agreement</h3>
                                <p className="text-gray-300 mb-4">These Terms, together with any signed service agreements, constitute the entire agreement between the parties.</p>
                                <h3 className="text-xl font-semibold text-white mb-3">12.2 Amendments</h3>
                                <p className="text-gray-300 mb-4">Terms may only be modified in writing and signed by both parties, except that the Company may update these Terms with 30 days' notice for future engagements.</p>
                                <h3 className="text-xl font-semibold text-white mb-3">12.3 Severability</h3>
                                <p className="text-gray-300 mb-4">If any provision is found unenforceable, the remainder of these Terms shall remain in full force and effect.</p>
                                <h3 className="text-xl font-semibold text-white mb-3">12.4 Assignment</h3>
                                <p className="text-gray-300 mb-4">The Company may assign these Terms to any successor entity. Clients may not assign without written consent.</p>
                                <h3 className="text-xl font-semibold text-white mb-3">12.5 Waiver</h3>
                                <p className="text-gray-300 mb-4">Failure to enforce any provision does not constitute a waiver of future enforcement rights.</p>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-semibold text-white mb-4">13. Consumer Rights</h2>
                                <p className="text-gray-300 mb-4">If you are a consumer (rather than a business), you have additional rights under UK consumer protection law that these Terms do not affect.</p>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-semibold text-white mb-4">14. Contact Information</h2>
                                <p className="text-gray-300 mb-4">For questions about these Terms and Conditions, please contact us:</p>
                                <div className="bg-slate-700/30 p-6 rounded-md">
                                    <p className="text-white font-semibold mb-2">Booked Up Media Ltd (Trading as BYLT Media)</p>
                                    <p className="text-gray-300 mb-1">89 Giles Street</p>
                                    <p className="text-gray-300 mb-1">Edinburgh, Scotland</p>
                                    <p className="text-gray-300 mb-3">EH6 6BZ</p>
                                    <p className="text-gray-300 mb-1"><strong>Telephone:</strong> +44 (131) 605 03 12</p>
                                    <p className="text-gray-300"><strong>Email:</strong> hello@bookedupmedia.com</p>
                                </div>
                            </section>

                            <div className="mt-12 pt-8 border-t border-slate-600">
                                <p className="text-gray-400 text-sm italic">
                                    These Terms and Conditions are effective from the date last updated above. By continuing to use our services after any modifications, you agree to the updated Terms.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default TermsAndConditionsPage;