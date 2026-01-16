import React from 'react';
import Head from 'next/head';
import Layout from '../components/layout';
import GlobalStyles from '../components/globalsyles';

const PrivacyPolicyPage = () => {
    return (
        <Layout>
            <Head>
                <title>Privacy Policy & Cookie Policy | BYLT Media</title>
                <meta name="description" content="Privacy Policy and Cookie Policy for Booked Up Media Ltd trading as BYLT Media - How we collect, use and protect your personal data." />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <GlobalStyles />
            
            <div className="min-h-dvh bg-slate-900 pt-24 pb-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-slate-800/50 rounded-lg p-8 backdrop-blur-sm border border-slate-700">
                        <h1 className="text-4xl font-bold text-white mb-8">Privacy Policy & Cookie Policy</h1>
                        <div className="prose prose-slate prose-invert max-w-none">
                            <p className="text-gray-300 mb-6">Last updated: 3rd August 2025</p>
                            
                            <div className="bg-slate-700/30 p-4 rounded-md mb-8">
                                <p className="text-gray-300 text-sm mb-2"><strong>Data Controller:</strong> Booked Up Media Ltd (Trading as BYLT Media)</p>
                                <p className="text-gray-300 text-sm mb-2"><strong>Registered Address:</strong> 89 Giles Street, Edinburgh, Scotland, EH6 6BZ</p>
                                <p className="text-gray-300 text-sm mb-2"><strong>Telephone:</strong> +44 (131) 605 03 12</p>
                                <p className="text-gray-300 text-sm"><strong>Email:</strong> hello@bookedupmedia.com</p>
                            </div>

                            <section className="mb-8">
                                <h2 className="text-2xl font-semibold text-white mb-4">1. Introduction</h2>
                                <p className="text-gray-300 mb-4">
                                    This Privacy and Cookie Policy explains how Booked Up Media Ltd, trading as BYLT Media ("we", "us", "our") collects, uses, and protects your personal information when you visit our website or use our services. We are committed to protecting your privacy and ensuring transparency about our data practices.
                                </p>
                                <p className="text-gray-300 mb-4">
                                    This policy complies with the UK General Data Protection Regulation (UK GDPR), the Data Protection Act 2018, and the Privacy and Electronic Communications Regulations (PECR).
                                </p>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-semibold text-white mb-4">2. Information We Collect</h2>
                                <h3 className="text-xl font-semibold text-white mb-3">2.1 Information You Provide Directly</h3>
                                <ul className="text-gray-300 space-y-2 list-disc pl-6 mb-4">
                                    <li><strong>Contact Information:</strong> Name, email address, phone number, company name, and postal address when you contact us or request services</li>
                                    <li><strong>Business Information:</strong> Details about your business, marketing objectives, and requirements</li>
                                    <li><strong>Communication Records:</strong> Records of our correspondence and interactions with you</li>
                                    <li><strong>Newsletter Subscriptions:</strong> Email address and preferences when you subscribe to our newsletter</li>
                                </ul>

                                <h3 className="text-xl font-semibold text-white mb-3">2.2 Information Collected Automatically</h3>
                                <ul className="text-gray-300 space-y-2 list-disc pl-6 mb-4">
                                    <li><strong>Website Usage Data:</strong> Pages visited, time spent on pages, click patterns, referral sources</li>
                                    <li><strong>Technical Information:</strong> IP address, browser type and version, device type, operating system</li>
                                    <li><strong>Location Data:</strong> Approximate geographic location based on IP address</li>
                                    <li><strong>Cookies and Tracking Data:</strong> Information collected through cookies and similar technologies (detailed in Section 8)</li>
                                </ul>

                                <h3 className="text-xl font-semibold text-white mb-3">2.3 Information from Third Parties</h3>
                                <ul className="text-gray-300 space-y-2 list-disc pl-6">
                                    <li><strong>Social Media Platforms:</strong> Information from social media interactions and advertising platforms</li>
                                    <li><strong>Analytics Providers:</strong> Website analytics and user behaviour data</li>
                                    <li><strong>Business Partners:</strong> Information received through legitimate business partnerships</li>
                                </ul>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-semibold text-white mb-4">3. Legal Basis for Processing</h2>
                                <p className="text-gray-300 mb-4">We process your personal data based on the following legal grounds:</p>
                                <ul className="text-gray-300 space-y-2 list-disc pl-6">
                                    <li><strong>Consent:</strong> When you have given clear consent for specific processing activities (e.g., marketing communications, non-essential cookies)</li>
                                    <li><strong>Contract Performance:</strong> To deliver services you have requested or to take steps before entering into a contract</li>
                                    <li><strong>Legitimate Interests:</strong> For business operations, improving our services, and security purposes (where your rights don't override our interests)</li>
                                    <li><strong>Legal Obligation:</strong> To comply with legal or regulatory requirements</li>
                                </ul>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-semibold text-white mb-4">4. How We Use Your Information</h2>
                                <h3 className="text-xl font-semibold text-white mb-3">4.1 Service Delivery</h3>
                                <ul className="text-gray-300 space-y-2 list-disc pl-6 mb-4">
                                    <li>Providing digital marketing services including SEO, PPC, social media marketing, and web development</li>
                                    <li>Communicating about projects, campaigns, and service delivery</li>
                                    <li>Creating reports and analytics for your campaigns</li>
                                    <li>Managing client accounts and billing</li>
                                </ul>

                                <h3 className="text-xl font-semibold text-white mb-3">4.2 Business Operations</h3>
                                <ul className="text-gray-300 space-y-2 list-disc pl-6 mb-4">
                                    <li>Responding to enquiries and providing customer support</li>
                                    <li>Processing payments and managing accounts</li>
                                    <li>Improving our website functionality and user experience</li>
                                    <li>Conducting business analysis and service improvement</li>
                                </ul>

                                <h3 className="text-xl font-semibold text-white mb-3">4.3 Marketing and Communications</h3>
                                <ul className="text-gray-300 space-y-2 list-disc pl-6 mb-4">
                                    <li>Sending newsletters and marketing updates (with your consent)</li>
                                    <li>Providing information about relevant services and offers</li>
                                    <li>Conducting market research and surveys</li>
                                </ul>

                                <h3 className="text-xl font-semibold text-white mb-3">4.4 Legal and Security</h3>
                                <ul className="text-gray-300 space-y-2 list-disc pl-6">
                                    <li>Complying with legal obligations and regulatory requirements</li>
                                    <li>Protecting against fraud, security threats, and misuse of our services</li>
                                    <li>Exercising or defending legal claims</li>
                                </ul>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-semibold text-white mb-4">5. Data Sharing and Third Parties</h2>
                                <p className="text-gray-300 mb-4">We may share your personal data with the following categories of recipients:</p>
                                
                                <h3 className="text-xl font-semibold text-white mb-3">5.1 Service Providers</h3>
                                <ul className="text-gray-300 space-y-2 list-disc pl-6 mb-4">
                                    <li><strong>Technology Providers:</strong> Cloud hosting, email services, CRM systems</li>
                                    <li><strong>Analytics Services:</strong> Google Analytics, Microsoft Clarity for website analysis</li>
                                    <li><strong>Marketing Platforms:</strong> Mailchimp for email marketing, social media platforms</li>
                                    <li><strong>Payment Processors:</strong> Secure payment processing services</li>
                                </ul>

                                <h3 className="text-xl font-semibold text-white mb-3">5.2 Advertising Partners</h3>
                                <ul className="text-gray-300 space-y-2 list-disc pl-6 mb-4">
                                    <li><strong>Google Ads:</strong> For advertising campaign management and conversion tracking</li>
                                    <li><strong>Facebook/Meta:</strong> For social media advertising and audience insights</li>
                                    <li><strong>Other Advertising Platforms:</strong> As required for client campaigns</li>
                                </ul>

                                <h3 className="text-xl font-semibold text-white mb-3">5.3 Legal Requirements</h3>
                                <ul className="text-gray-300 space-y-2 list-disc pl-6">
                                    <li>Law enforcement agencies, courts, or regulatory bodies when legally required</li>
                                    <li>Professional advisors including lawyers, accountants, and insurers</li>
                                    <li>Potential buyers in the event of a business sale or merger</li>
                                </ul>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-semibold text-white mb-4">6. International Data Transfers</h2>
                                <p className="text-gray-300 mb-4">
                                    Some of our service providers are located outside the UK and EEA. When we transfer your personal data internationally, we ensure appropriate safeguards are in place:
                                </p>
                                <ul className="text-gray-300 space-y-2 list-disc pl-6 mb-4">
                                    <li><strong>Adequacy Decisions:</strong> Transfers to countries deemed adequate by the UK government</li>
                                    <li><strong>Standard Contractual Clauses:</strong> Approved contractual protections for data transfers</li>
                                    <li><strong>Certification Schemes:</strong> Providers certified under recognised privacy frameworks</li>
                                </ul>
                                <p className="text-gray-300 mb-4">
                                    Key international transfers include Google services (USA - covered by adequacy framework), Meta/Facebook services (USA), and Mailchimp (USA - Intuit Inc.).
                                </p>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-semibold text-white mb-4">7. Data Retention</h2>
                                <p className="text-gray-300 mb-4">We retain your personal data for the following periods:</p>
                                <ul className="text-gray-300 space-y-2 list-disc pl-6 mb-4">
                                    <li><strong>Client Data:</strong> For the duration of our business relationship plus 7 years for accounting purposes</li>
                                    <li><strong>Marketing Data:</strong> Until you unsubscribe or withdraw consent, then deleted within 30 days</li>
                                    <li><strong>Website Analytics:</strong> Up to 26 months (Google Analytics default), anonymised thereafter</li>
                                    <li><strong>Legal Requirements:</strong> As required by applicable laws and regulations</li>
                                    <li><strong>Enquiry Data:</strong> 3 years from last contact for potential future business opportunities</li>
                                </ul>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-semibold text-white mb-4">8. Cookies and Tracking Technologies</h2>
                                <p className="text-gray-300 mb-4">
                                    Our website uses cookies and similar tracking technologies. Cookies are small text files stored on your device that help us provide and improve our services.
                                </p>

                                <h3 className="text-xl font-semibold text-white mb-3">8.1 Types of Cookies We Use</h3>
                                
                                <div className="mb-6">
                                    <h4 className="text-lg font-semibold text-white mb-2">Essential Cookies</h4>
                                    <p className="text-gray-300 mb-2">These cookies are necessary for the website to function and cannot be switched off.</p>
                                    <div className="bg-slate-700/30 p-4 rounded-md">
                                        <ul className="text-gray-300 text-sm space-y-1 list-disc pl-6">
                                            <li>Session management and security</li>
                                            <li>Cookie consent preferences</li>
                                            <li>Load balancing and website functionality</li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <h4 className="text-lg font-semibold text-white mb-2">Analytics Cookies</h4>
                                    <p className="text-gray-300 mb-2">These help us understand how visitors interact with our website.</p>
                                    <div className="bg-slate-700/30 p-4 rounded-md">
                                        <ul className="text-gray-300 text-sm space-y-1 list-disc pl-6">
                                            <li><strong>Google Analytics 4 (GA4):</strong> _ga, _ga_*, _gid cookies for website analytics</li>
                                            <li><strong>Microsoft Clarity:</strong> User session recordings and heatmaps</li>
                                            <li><strong>Purpose:</strong> Page views, user journeys, site performance, user behaviour analysis</li>
                                            <li><strong>Retention:</strong> Up to 26 months</li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <h4 className="text-lg font-semibold text-white mb-2">Marketing Cookies</h4>
                                    <p className="text-gray-300 mb-2">These cookies track your visit across websites to build a profile of your interests and show you relevant ads.</p>
                                    <div className="bg-slate-700/30 p-4 rounded-md">
                                        <ul className="text-gray-300 text-sm space-y-1 list-disc pl-6">
                                            <li><strong>Facebook Pixel:</strong> _fbp, _fbc cookies for conversion tracking and ad targeting</li>
                                            <li><strong>Google Ads:</strong> Conversion tracking, remarketing, audience insights</li>
                                            <li><strong>Purpose:</strong> Ad performance measurement, remarketing, custom audiences</li>
                                            <li><strong>Retention:</strong> Varies (typically 30 days to 2 years)</li>
                                        </ul>
                                    </div>
                                </div>

                                <h3 className="text-xl font-semibold text-white mb-3">8.2 Managing Your Cookie Preferences</h3>
                                <p className="text-gray-300 mb-4">You can control cookies through:</p>
                                <ul className="text-gray-300 space-y-2 list-disc pl-6 mb-4">
                                    <li><strong>Cookie Banner:</strong> Select your preferences when visiting our website</li>
                                    <li><strong>Browser Settings:</strong> Block or delete cookies through your browser preferences</li>
                                    <li><strong>Opt-out Tools:</strong> Use industry opt-out mechanisms for advertising cookies</li>
                                    <li><strong>Contact Us:</strong> Email hello@bookedupmedia.com to update your preferences</li>
                                </ul>

                                <div className="bg-amber-900/20 border border-amber-700 p-4 rounded-md mb-4">
                                    <p className="text-amber-200 text-sm">
                                        <strong>Please Note:</strong> Blocking certain cookies may affect website functionality and your user experience.
                                    </p>
                                </div>

                                {/* NEW COOKIE MANAGEMENT SECTION */}
                                <div className="mb-8 bg-blue-900/20 border border-blue-700 p-6 rounded-lg">
                                    <h3 className="text-xl font-semibold text-white mb-4">Cookie Management</h3>
                                    <p className="text-gray-300 mb-4">
                                        You can change your cookie preferences at any time by clicking the button below. This will reset your cookie choices and show the cookie banner again:
                                    </p>
                                    <button
                                        onClick={() => {
                                            // Clear the consent cookies to show banner again
                                            document.cookie = 'bylt-media-cookie-consent=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
                                            document.cookie = 'bylt-cookie-preferences=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
                                            // Show success message
                                            alert('Cookie preferences have been reset. The cookie banner will appear on your next page visit.');
                                            // Reload the page to show banner immediately
                                            setTimeout(() => {
                                                window.location.reload();
                                            }, 1000);
                                        }}
                                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors inline-flex items-center space-x-2"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        <span>Manage Cookie Preferences</span>
                                    </button>
                                    <p className="text-gray-400 text-sm mt-3">
                                        This will clear your current cookie settings and allow you to make new choices about which cookies you'd like to accept.
                                    </p>
                                </div>

                                <h3 className="text-xl font-semibold text-white mb-3">8.3 Third-Party Tracking</h3>
                                <p className="text-gray-300 mb-4">Our website integrates with third-party services that may collect data:</p>
                                <ul className="text-gray-300 space-y-2 list-disc pl-6">
                                    <li><strong>Google Services:</strong> Analytics, Ads, Tag Manager - see Google's Privacy Policy</li>
                                    <li><strong>Meta/Facebook:</strong> Pixel tracking - see Meta's Privacy Policy</li>
                                    <li><strong>Microsoft:</strong> Clarity analytics - see Microsoft's Privacy Policy</li>
                                    <li><strong>Mailchimp:</strong> Email marketing - see Mailchimp's Privacy Policy</li>
                                </ul>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-semibold text-white mb-4">9. Your Rights</h2>
                                <p className="text-gray-300 mb-4">Under UK GDPR, you have the following rights regarding your personal data:</p>
                                
                                <div className="space-y-4">
                                    <div className="bg-slate-700/30 p-4 rounded-md">
                                        <h4 className="text-white font-semibold mb-2">Right of Access</h4>
                                        <p className="text-gray-300 text-sm">Request a copy of the personal data we hold about you</p>
                                    </div>
                                    
                                    <div className="bg-slate-700/30 p-4 rounded-md">
                                        <h4 className="text-white font-semibold mb-2">Right to Rectification</h4>
                                        <p className="text-gray-300 text-sm">Request correction of inaccurate or incomplete data</p>
                                    </div>
                                    
                                    <div className="bg-slate-700/30 p-4 rounded-md">
                                        <h4 className="text-white font-semibold mb-2">Right to Erasure</h4>
                                        <p className="text-gray-300 text-sm">Request deletion of your personal data in certain circumstances</p>
                                    </div>
                                    
                                    <div className="bg-slate-700/30 p-4 rounded-md">
                                        <h4 className="text-white font-semibold mb-2">Right to Restrict Processing</h4>
                                        <p className="text-gray-300 text-sm">Request that we limit how we use your personal data</p>
                                    </div>
                                    
                                    <div className="bg-slate-700/30 p-4 rounded-md">
                                        <h4 className="text-white font-semibold mb-2">Right to Data Portability</h4>
                                        <p className="text-gray-300 text-sm">Request transfer of your data to another service provider</p>
                                    </div>
                                    
                                    <div className="bg-slate-700/30 p-4 rounded-md">
                                        <h4 className="text-white font-semibold mb-2">Right to Object</h4>
                                        <p className="text-gray-300 text-sm">Object to processing based on legitimate interests or for marketing purposes</p>
                                    </div>
                                    
                                    <div className="bg-slate-700/30 p-4 rounded-md">
                                        <h4 className="text-white font-semibold mb-2">Right to Withdraw Consent</h4>
                                        <p className="text-gray-300 text-sm">Withdraw consent for any processing based on consent</p>
                                    </div>
                                </div>

                                <p className="text-gray-300 mt-4">
                                    To exercise any of these rights, please contact us at hello@bookedupmedia.com. We will respond within one month of receiving your request.
                                </p>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-semibold text-white mb-4">10. Data Security</h2>
                                <p className="text-gray-300 mb-4">We implement appropriate technical and organisational measures to protect your personal data:</p>
                                <ul className="text-gray-300 space-y-2 list-disc pl-6 mb-4">
                                    <li><strong>Encryption:</strong> Data encryption in transit and at rest</li>
                                    <li><strong>Access Controls:</strong> Restricted access on a need-to-know basis</li>
                                    <li><strong>Security Training:</strong> Regular staff training on data protection</li>
                                    <li><strong>Incident Response:</strong> Procedures for detecting and responding to data breaches</li>
                                    <li><strong>Regular Audits:</strong> Ongoing security assessments and improvements</li>
                                </ul>
                                <p className="text-gray-300 mb-4">
                                    While we strive to protect your personal data, no method of transmission over the internet is 100% secure. We cannot guarantee absolute security but will notify you of any data breaches as required by law.
                                </p>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-semibold text-white mb-4">11. Children's Privacy</h2>
                                <p className="text-gray-300 mb-4">
                                    Our services are not directed at children under 16 years of age. We do not knowingly collect personal data from children under 16. If you are a parent or guardian and believe your child has provided us with personal data, please contact us immediately.
                                </p>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-semibold text-white mb-4">12. Changes to This Policy</h2>
                                <p className="text-gray-300 mb-4">
                                    We may update this Privacy and Cookie Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. We will notify you of significant changes by:
                                </p>
                                <ul className="text-gray-300 space-y-2 list-disc pl-6 mb-4">
                                    <li>Posting the updated policy on our website with a new "Last updated" date</li>
                                    <li>Sending email notification for material changes (where we have your email address)</li>
                                    <li>Displaying a notice on our website highlighting the changes</li>
                                </ul>
                                <p className="text-gray-300 mb-4">
                                    Continued use of our website and services after changes are posted constitutes acceptance of the updated policy.
                                </p>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-semibold text-white mb-4">13. Contact Information and Complaints</h2>
                                <p className="text-gray-300 mb-4">
                                    For any questions about this Privacy and Cookie Policy, to exercise your rights, or to make a complaint about our data processing, please contact us:
                                </p>
                                
                                <div className="bg-slate-700/30 p-6 rounded-md mb-4">
                                    <p className="text-white font-semibold mb-2">Data Protection Contact</p>
                                    <p className="text-gray-300 mb-1"><strong>Company:</strong> Booked Up Media Ltd (Trading as BYLT Media)</p>
                                    <p className="text-gray-300 mb-1"><strong>Address:</strong> 89 Giles Street, Edinburgh, Scotland, EH6 6BZ</p>
                                    <p className="text-gray-300 mb-1"><strong>Telephone:</strong> +44 (131) 605 03 12</p>
                                    <p className="text-gray-300 mb-3"><strong>Email:</strong> hello@bookedupmedia.com</p>
                                    <p className="text-gray-300 text-sm">Please mark correspondence "Data Protection Query" for faster processing.</p>
                                </div>

                                <p className="text-gray-300 mb-4">
                                    If you are not satisfied with our response to your complaint, you have the right to lodge a complaint with the Information Commissioner's Office (ICO):
                                </p>
                                
                                <div className="bg-slate-700/30 p-4 rounded-md">
                                    <p className="text-gray-300 text-sm mb-1"><strong>Information Commissioner's Office</strong></p>
                                    <p className="text-gray-300 text-sm mb-1">Wycliffe House, Water Lane, Wilmslow, Cheshire, SK9 5AF</p>
                                    <p className="text-gray-300 text-sm mb-1"><strong>Telephone:</strong> 0303 123 1113</p>
                                    <p className="text-gray-300 text-sm"><strong>Website:</strong> www.ico.org.uk</p>
                                </div>
                            </section>

                            <div className="mt-12 pt-8 border-t border-slate-600">
                                <p className="text-gray-400 text-sm italic">
                                    This Privacy and Cookie Policy is effective from the date last updated above. By using our website and services, you acknowledge that you have read and understood this policy.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default PrivacyPolicyPage;