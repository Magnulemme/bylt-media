import '@/styles/globals.css';
import '@/styles/animations.css';
import { useEffect } from 'react';
import { Inter, Space_Grotesk } from 'next/font/google';
import { loadNonCriticalCSS } from '../utils/loadCSS';
import EnhancedCookieConsent from '@/components/EnhancedCookieConsent';
import SplashScreen from '@/components/SplashScreen';
import PageTransition from '@/components/PageTransition';

// Load fonts with next/font - prevents FOUT and layout shift
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // Load non-critical CSS after the page has loaded
    loadNonCriticalCSS();
  }, []);

  return (
    <div className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <SplashScreen />
      <PageTransition>
        <Component {...pageProps} />
      </PageTransition>
      <EnhancedCookieConsent />
    </div>
  );
}

export default MyApp;