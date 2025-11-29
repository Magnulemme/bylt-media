import Link from 'next/link';

const Footer = () => {
    return (
        <footer className="quantum-footer relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
                <div className="footer-content">
                    <div className="footer-brand">
                        <h3 className="text-2xl font-bold text-white font-inter">
                            BYLT.MEDIA
                        </h3>
                        <p className="text-gray-400 mt-2">Building Digital Futures</p>
                        
                        {/* Registered Address */}
                        <div className="mt-4">
                            <p className="text-sm text-gray-500 font-semibold">Registered Address:</p>
                            <p className="text-sm text-gray-400">
                                89 Giles Street<br />
                                Edinburgh, Scotland<br />
                                EH6 6BZ
                            </p>
                        </div>
                    </div>
                    
                    <div className="footer-legal">
                        <p className="text-gray-500">
                            &copy; {new Date().getFullYear()} BYLT Media. All Rights Reserved.
                        </p>
                        <div className="footer-links mb-4">
                            <Link href="/terms-and-conditions" className="text-gray-400 hover:text-[#B8FFFA] transition-colors duration-300 text-sm">
                                Terms & Conditions
                            </Link>
                            <span className="text-gray-600 mx-3">|</span>
                            <Link href="/privacy-policy" className="text-gray-400 hover:text-[#B8FFFA] transition-colors duration-300 text-sm">
                                Privacy Policy
                            </Link>
                        </div>
                        <div className="footer-contact">
                            <div className="text-xs text-gray-400">
                                <div className="mb-1">
                                    <a href="mailto:info@byltmedia.com" className="hover:text-[#B8FFFA] transition-colors duration-300">
                                        info@byltmedia.com
                                    </a>
                                </div>
                                <div>
                                    <a href="tel:+441316050312" className="hover:text-[#B8FFFA] transition-colors duration-300">
                                        +44 (131) 605 03 12
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
