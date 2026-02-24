import '@/styles/globals.css';
import '@/styles/animations.css';
import 'lenis/dist/lenis.css';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Inter, Space_Grotesk } from 'next/font/google';
import { loadNonCriticalCSS } from '../utils/loadCSS';
import EnhancedCookieConsent from '@/components/EnhancedCookieConsent';
import SplashScreen from '@/components/SplashScreen';
import PageTransition from '@/components/PageTransition';
import PersistentShaderBackground from '@/components/PersistentShaderBackground';
import Lenis from 'lenis';

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
  const router = useRouter();

  // Scroll to top on route change
  useEffect(() => {
    const handleRouteChange = () => {
      window.scrollTo(0, 0);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router]);

  useEffect(() => {
    // Load non-critical CSS after the page has loaded
    loadNonCriticalCSS();

    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className={`${inter.variable} ${spaceGrotesk.variable}`}>
      {/* Persistent Shader Background - rimane montato durante la navigazione */}
      <PersistentShaderBackground
        colors={{
          color1: 0x1a1a2e,
          color2: 0x16213e,
          color3: 0x0f3460,
        }}
        className="fixed inset-0 z-0"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
        }}
      />

      {/* SplashScreen al livello più alto per garantire z-index corretto */}
      <SplashScreen />

      <div className="relative z-10">
        <PageTransition>
          <Component {...pageProps} />
        </PageTransition>
        <EnhancedCookieConsent />
      </div>
    </div>
  );
}

export default MyApp;