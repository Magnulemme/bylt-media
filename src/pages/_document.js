import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || 'GTM-XXXXXXX'
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID || 'GA_MEASUREMENT_ID'
  
  return (
    <Html lang="en-GB">
      <Head>
        {/* Favicon and App Icons */}
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon.png" />
        <link rel="shortcut icon" href="/favicon.png" />
        <meta name="theme-color" content="#0f172a" />
        
        {/* Preconnect for faster font loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Non-blocking font loading with font-display: swap */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;900&display=swap"
          media="print"
          onLoad="this.media='all'"
        />
        <noscript>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;900&display=swap"
          />
        </noscript>

        {/* Critical CSS with fallback font */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
              :root {
                --accent-amber: #B8FFFA;
                --minimal-accent: #B8FFFA;
                --pastel-green: #B8FFB8;
                --minimal-subtle: #4b5563;
                --dark-bg: #0f172a;
              }

              html { }
              body {
                margin: 0; padding: 0;
                background: var(--dark-bg);
                color: #e5e7eb;
                /* Fallback font stack for immediate rendering */
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
              }
              
              /* Apply Inter when loaded */
              .fonts-loaded body {
                font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
              }
              
              .futuristic-app {
                position: relative;
                background: var(--dark-bg);
                min-height: 100vh;
              }
              
              /* Critical Hero Styles */
              .hero-section { 
                background: radial-gradient(ellipse at center, rgba(245, 158, 11, 0.03) 0%, rgba(15, 23, 42, 0) 70%), var(--dark-bg); 
              }
              
              .hero-title { 
                animation: heroTitleAppear 2s ease-out; 
                color: white; 
                will-change: transform, opacity;
              }
              @keyframes heroTitleAppear {
                from { opacity: 0; transform: translate3d(0, 50px, 0); }
                to { opacity: 1; transform: translate3d(0, 0, 0); }
              }
              
              .quantum-text { 
                animation: quantumTextCycle 1s ease-in-out;
                color: #B8FFFA;
                will-change: transform, opacity;
              }
              @keyframes quantumTextCycle {
                from { opacity: 0; transform: translate3d(0, 20px, 0); }
                to { opacity: 1; transform: translate3d(0, 0, 0); }
              }
              
              .hero-subtitle { 
                animation: heroSubtitleSlide 2s ease-out 0.5s both; 
                text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
                font-weight: 400;
                line-height: 1.6;
                will-change: transform, opacity;
              }
              @keyframes heroSubtitleSlide {
                from { opacity: 0; transform: translate3d(-30px, 0, 0); }
                to { opacity: 1; transform: translate3d(0, 0, 0); }
              }
              
              /* Critical Button Styles */
              .quantum-button-hero {
                position: relative; display: inline-flex; align-items: center; justify-content: center;
                padding: 16px 32px; font-weight: 700; font-size: 18px; color: #1e293b;
                background: #B8FFFA;
                border: none; border-radius: 12px; 
                font-family: inherit; /* Use fallback initially */
                text-decoration: none; overflow: hidden; transition: all 0.4s ease; cursor: pointer;
                will-change: transform;
              }
              .quantum-button-hero:hover { 
                transform: translate3d(0, -3px, 0) scale3d(1.05, 1.05, 1);
                box-shadow: 0 8px 25px rgba(184, 255, 250, 0.3); 
                background: #9DFFF8; 
              }
            `,
          }}
        />
        
        {/* Font loading detection script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                if ('fonts' in document) {
                  document.fonts.ready.then(function() {
                    document.documentElement.classList.add('fonts-loaded');
                  });
                } else {
                  // Fallback for older browsers
                  setTimeout(function() {
                    document.documentElement.classList.add('fonts-loaded');
                  }, 3000);
                }
              })();
            `,
          }}
        />
        
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${GTM_ID}');
            `,
          }}
        />
        
        {/* Google Analytics */}
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}', {
                page_title: document.title,
                page_location: window.location.href,
                anonymize_ip: true,
                cookie_flags: 'SameSite=None;Secure'
              });
            `,
          }}
        />
      </Head>
      <body>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}