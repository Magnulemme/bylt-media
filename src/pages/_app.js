import '@/styles/globals.css';
import '@/styles/animations.css';
import { useEffect } from 'react';
import { loadNonCriticalCSS } from '../utils/loadCSS';
import EnhancedCookieConsent from '@/components/EnhancedCookieConsent';
import SplashScreen from '@/components/SplashScreen';
import PageTransition from '@/components/PageTransition';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // Load non-critical CSS after the page has loaded
    loadNonCriticalCSS();
  }, []);

  return (
    <>
      <SplashScreen />
      <PageTransition>
        <Component {...pageProps} />
      </PageTransition>
      <EnhancedCookieConsent />
    </>
  );
}

export default MyApp;