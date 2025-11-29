// src/components/EnhancedCookieConsent.js
import React, { useState, useEffect } from 'react';
import CookieConsent, { Cookies } from 'react-cookie-consent';
import { Settings, Shield, BarChart3, Target, X } from 'lucide-react';

const EnhancedCookieConsent = () => {
  const [showCustomSettings, setShowCustomSettings] = useState(false);
  const [cookiePreferences, setCookiePreferences] = useState({
    essential: true, // Always true
    analytics: false,
    marketing: false,
  });

  // Replace these with your actual tracking IDs
  const TRACKING_IDS = {
    GA_MEASUREMENT_ID: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-XXXXXXXXXX',
    CLARITY_PROJECT_ID: process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID || 'your_clarity_id',
    FACEBOOK_PIXEL_ID: process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID || 'your_fb_pixel_id',
    GOOGLE_ADS_ID: process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || 'AW-XXXXXXXXX',
  };

  // Check if scripts are already loaded to prevent duplicates
  const isScriptLoaded = (src) => {
    return document.querySelector(`script[src="${src}"]`) !== null;
  };

  // Remove existing tracking scripts
  const removeTrackingScripts = () => {
    // Remove Google Analytics
    document.querySelectorAll('script[src*="googletagmanager.com"]').forEach(script => script.remove());
    
    // Remove Facebook Pixel
    document.querySelectorAll('script[src*="connect.facebook.net"]').forEach(script => script.remove());
    
    // Remove Microsoft Clarity
    document.querySelectorAll('script[src*="clarity.ms"]').forEach(script => script.remove());
    
    // Clear dataLayer if it exists
    if (window.dataLayer) {
      window.dataLayer = [];
    }
    
    // Clear Facebook Pixel if it exists
    if (window.fbq) {
      delete window.fbq;
      delete window._fbq;
    }
    
    // Clear Microsoft Clarity if it exists
    if (window.clarity) {
      delete window.clarity;
    }
  };

  // Load Google Analytics 4
  const loadGoogleAnalytics = () => {
    if (isScriptLoaded(`https://www.googletagmanager.com/gtag/js?id=${TRACKING_IDS.GA_MEASUREMENT_ID}`)) return;

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${TRACKING_IDS.GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);

    script.onload = () => {
      window.dataLayer = window.dataLayer || [];
      function gtag(){window.dataLayer.push(arguments);}
      window.gtag = gtag;
      gtag('js', new Date());
      gtag('config', TRACKING_IDS.GA_MEASUREMENT_ID, {
        anonymize_ip: true,
        cookie_flags: 'SameSite=None;Secure'
      });
      
      // Also configure Google Ads if we have marketing consent
      if (cookiePreferences.marketing && TRACKING_IDS.GOOGLE_ADS_ID !== 'AW-XXXXXXXXX') {
        gtag('config', TRACKING_IDS.GOOGLE_ADS_ID);
      }
    };
  };

  // Load Microsoft Clarity
  const loadMicrosoftClarity = () => {
    if (window.clarity || TRACKING_IDS.CLARITY_PROJECT_ID === 'your_clarity_id') return;

    const script = document.createElement('script');
    script.innerHTML = `
      (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
      })(window, document, "clarity", "script", "${TRACKING_IDS.CLARITY_PROJECT_ID}");
    `;
    document.head.appendChild(script);
  };

  // Load Facebook Pixel
  const loadFacebookPixel = () => {
    if (window.fbq || TRACKING_IDS.FACEBOOK_PIXEL_ID === 'your_fb_pixel_id') return;

    const script = document.createElement('script');
    script.innerHTML = `
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '${TRACKING_IDS.FACEBOOK_PIXEL_ID}');
      fbq('track', 'PageView');
    `;
    document.head.appendChild(script);

    // Add noscript fallback
    const noscript = document.createElement('noscript');
    noscript.innerHTML = `<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=${TRACKING_IDS.FACEBOOK_PIXEL_ID}&ev=PageView&noscript=1"/>`;
    document.head.appendChild(noscript);
  };

  // Load tracking scripts based on preferences
  const loadTrackingScripts = (analyticsConsent, marketingConsent) => {
    // Always update Google Consent Mode first
    updateGoogleConsent(analyticsConsent, marketingConsent);

    if (analyticsConsent) {
      loadGoogleAnalytics();
      loadMicrosoftClarity();
    }

    if (marketingConsent) {
      loadFacebookPixel();
      // Google Ads is loaded together with GA4
    }
  };

  // Update Google Consent Mode
  const updateGoogleConsent = (analyticsConsent, marketingConsent) => {
    // Initialize Google Consent Mode if not already done
    if (!window.gtag) {
      window.dataLayer = window.dataLayer || [];
      function gtag(){window.dataLayer.push(arguments);}
      window.gtag = gtag;
      
      // Set default consent
      gtag('consent', 'default', {
        analytics_storage: 'denied',
        ad_storage: 'denied',
        functionality_storage: 'granted',
        security_storage: 'granted',
        wait_for_update: 500,
      });
    }

    // Update consent based on user preferences
    window.gtag('consent', 'update', {
      analytics_storage: analyticsConsent ? 'granted' : 'denied',
      ad_storage: marketingConsent ? 'granted' : 'denied',
      functionality_storage: 'granted',
      security_storage: 'granted',
    });
  };

  // Handle Accept All
  const handleAcceptAll = () => {
    const allConsent = {
      essential: true,
      analytics: true,
      marketing: true,
    };
    setCookiePreferences(allConsent);
    loadTrackingScripts(true, true);
    Cookies.set('bylt-cookie-preferences', JSON.stringify(allConsent), { expires: 365 });
  };

  // Handle Reject All
  const handleRejectAll = () => {
    const essentialOnly = {
      essential: true,
      analytics: false,
      marketing: false,
    };
    setCookiePreferences(essentialOnly);
    removeTrackingScripts();
    loadTrackingScripts(false, false);
    Cookies.set('bylt-cookie-preferences', JSON.stringify(essentialOnly), { expires: 365 });
  };

  // Handle Custom Settings Save
  const handleSaveCustomSettings = () => {
    loadTrackingScripts(cookiePreferences.analytics, cookiePreferences.marketing);
    Cookies.set('bylt-cookie-preferences', JSON.stringify(cookiePreferences), { expires: 365 });
    setShowCustomSettings(false);
  };

  // Load saved preferences on component mount
  useEffect(() => {
    const savedPreferences = Cookies.get('bylt-cookie-preferences');
    if (savedPreferences) {
      try {
        const preferences = JSON.parse(savedPreferences);
        setCookiePreferences(preferences);
        loadTrackingScripts(preferences.analytics, preferences.marketing);
      } catch (error) {
        console.error('Error parsing saved cookie preferences:', error);
      }
    } else {
      // Initialize Google Consent Mode with default denied state
      updateGoogleConsent(false, false);
    }
  }, []);

  // Custom Settings Modal
  const CustomSettingsModal = () => {
    if (!showCustomSettings) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-[60] flex items-center justify-center p-4">
        <div className="bg-slate-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Cookie Preferences</h2>
              <button
                onClick={() => setShowCustomSettings(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="space-y-6">
              {/* Essential Cookies */}
              <div className="border border-slate-600 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <Shield className="h-5 w-5 text-green-400" />
                    <h3 className="text-lg font-semibold text-white">Essential Cookies</h3>
                  </div>
                  <div className="bg-green-600 text-white text-xs px-2 py-1 rounded">Always Active</div>
                </div>
                <p className="text-gray-300 text-sm mb-3">
                  These cookies are necessary for the website to function and cannot be switched off. They are usually only set in response to actions made by you.
                </p>
                <div className="text-sm text-gray-400">
                  <strong>Examples:</strong> Session management, security, cookie preferences
                </div>
              </div>

              {/* Analytics Cookies */}
              <div className="border border-slate-600 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <BarChart3 className="h-5 w-5 text-blue-400" />
                    <h3 className="text-lg font-semibold text-white">Analytics Cookies</h3>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={cookiePreferences.analytics}
                      onChange={(e) => setCookiePreferences(prev => ({ ...prev, analytics: e.target.checked }))}
                      className="sr-only"
                    />
                    <div className={`w-11 h-6 rounded-full ${cookiePreferences.analytics ? 'bg-blue-600' : 'bg-gray-600'} relative transition-colors`}>
                      <div className={`absolute w-4 h-4 bg-white rounded-full top-1 transition-transform ${cookiePreferences.analytics ? 'translate-x-6' : 'translate-x-1'}`}></div>
                    </div>
                  </label>
                </div>
                <p className="text-gray-300 text-sm mb-3">
                  These cookies help us understand how visitors interact with our website by collecting anonymous information.
                </p>
                <div className="text-sm text-gray-400">
                  <strong>Services:</strong> Google Analytics 4, Microsoft Clarity<br />
                  <strong>Purpose:</strong> Website analytics, user behaviour analysis
                </div>
              </div>

              {/* Marketing Cookies */}
              <div className="border border-slate-600 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <Target className="h-5 w-5 text-purple-400" />
                    <h3 className="text-lg font-semibold text-white">Marketing Cookies</h3>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={cookiePreferences.marketing}
                      onChange={(e) => setCookiePreferences(prev => ({ ...prev, marketing: e.target.checked }))}
                      className="sr-only"
                    />
                    <div className={`w-11 h-6 rounded-full ${cookiePreferences.marketing ? 'bg-purple-600' : 'bg-gray-600'} relative transition-colors`}>
                      <div className={`absolute w-4 h-4 bg-white rounded-full top-1 transition-transform ${cookiePreferences.marketing ? 'translate-x-6' : 'translate-x-1'}`}></div>
                    </div>
                  </label>
                </div>
                <p className="text-gray-300 text-sm mb-3">
                  These cookies track your visits across websites to build a profile of your interests and show relevant advertisements.
                </p>
                <div className="text-sm text-gray-400">
                  <strong>Services:</strong> Facebook Pixel, Google Ads<br />
                  <strong>Purpose:</strong> Conversion tracking, remarketing, personalised ads
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <button
                onClick={handleSaveCustomSettings}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Save My Preferences
              </button>
              <button
                onClick={() => setShowCustomSettings(false)}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <CookieConsent
        location="bottom"
        buttonText="Accept All"
        declineButtonText="Reject All"
        cookieName="bylt-media-cookie-consent"
        style={{
          background: "rgba(30, 41, 59, 0.95)",
          backdropFilter: "blur(8px)",
          borderTop: "1px solid rgba(71, 85, 105, 0.3)",
          zIndex: 50,
          fontFamily: "inherit"
        }}
        buttonStyle={{
          background: "#2563eb",
          color: "white",
          fontSize: "14px",
          fontWeight: "600",
          borderRadius: "8px",
          padding: "12px 24px",
          border: "none",
          cursor: "pointer",
          transition: "all 0.2s"
        }}
        declineButtonStyle={{
          background: "#6b7280",
          color: "white",
          fontSize: "14px",
          fontWeight: "600",
          borderRadius: "8px",
          padding: "12px 24px",
          border: "none",
          cursor: "pointer",
          marginRight: "10px",
          transition: "all 0.2s"
        }}
        expires={365}
        enableDeclineButton
        onAccept={handleAcceptAll}
        onDecline={handleRejectAll}
        customButtonWrapperAttributes={{
          style: {
            display: "flex",
            alignItems: "center",
            gap: "10px",
            flexWrap: "wrap"
          }
        }}
      >
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 max-w-none">
          <div className="flex-1 min-w-0">
            <p className="text-white text-base leading-relaxed">
              🍪 We use cookies to enhance your browsing experience, analyse our traffic, and provide personalised content. 
              By clicking "Accept All", you consent to our use of cookies.{" "}
              <a href="/privacy-policy" className="text-blue-400 hover:text-blue-300 underline transition-colors">
                Read our Privacy Policy
              </a>
            </p>
          </div>
          <div className="flex-shrink-0">
            <button
              onClick={() => setShowCustomSettings(true)}
              className="flex items-center space-x-2 bg-slate-600 hover:bg-slate-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors text-sm"
            >
              <Settings className="h-4 w-4" />
              <span>Customise</span>
            </button>
          </div>
        </div>
      </CookieConsent>
      
      <CustomSettingsModal />
    </>
  );
};

export default EnhancedCookieConsent;