import '@/styles/globals.css';
import { useEffect } from 'react';
import { loadNonCriticalCSS } from '../utils/loadCSS';
import EnhancedCookieConsent from '@/components/EnhancedCookieConsent';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // Load non-critical CSS after the page has loaded
    loadNonCriticalCSS();
  }, []);

  return (
    <>
      <Component {...pageProps} />
      <EnhancedCookieConsent />
    </>
  );
}

export default MyApp;