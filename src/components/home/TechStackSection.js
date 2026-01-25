"use client";
import React from "react";
import { motion } from "framer-motion";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";

const TechStackSection = () => {
  const tools = [
    // SEO
    { name: "Semrush", logo: "/logos/Semrush.png", tag: "SEO" },
    { name: "Ahrefs", logo: "/logos/Ahrefs_id5KWlBICs_0.svg", tag: "SEO" },
    { name: "Google Search Console", logo: "https://www.gstatic.com/images/branding/product/2x/search_console_512dp.png", tag: "SEO" },

    // Paid Media
    { name: "Google Ads", logo: "https://upload.wikimedia.org/wikipedia/commons/c/c7/Google_Ads_logo.svg", tag: "Paid Media" },
    { name: "Meta Ads", logo: "https://upload.wikimedia.org/wikipedia/commons/a/ab/Meta-Logo.png", tag: "Paid Media" },
    { name: "LinkedIn Ads", logo: "https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png", tag: "Paid Media" },
    { name: "Google Analytics", logo: "https://upload.wikimedia.org/wikipedia/commons/7/77/GAnalytics.svg", tag: "Paid Media" },

    // Web Development
    { name: "Next.js", logo: "https://assets.vercel.com/image/upload/v1662130559/nextjs/Icon_light_background.png", tag: "Web Dev" },
    { name: "WordPress", logo: "https://upload.wikimedia.org/wikipedia/commons/9/98/WordPress_blue_logo.svg", tag: "Web Dev" },
    { name: "Shopify", logo: "https://cdn.worldvectorlogo.com/logos/shopify.svg", tag: "Web Dev" },
    { name: "Webflow", logo: "/logos/webflow.png", tag: "Web Dev" },
  ];

  return (
    <section className="relative overflow-hidden">
      {/* Background effects */}

      <div className="relative z-10 max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        {/* Infinite Moving Cards */}
        <div className="mb-8">
          <InfiniteMovingCards
            items={tools}
            direction="left"
            speed="slow"
            pauseOnHover={true}
            renderItem={(item) => (
              <div className="relative w-[220px] h-[200px] bg-linear-to-br from-slate-800/50 to-slate-900/50 rounded-2xl border border-cyan-500/20 group flex flex-col items-center justify-center gap-4 p-6"
                style={{ boxShadow: '0 4px 20px rgba(6, 182, 212, 0.1), 0 0 40px rgba(6, 182, 212, 0.08)' }}>
                <div className="w-24 h-24 flex items-center justify-center">
                  <img src={item.logo} alt={item.name} className="w-full h-full object-contain transition-all duration-300 group-hover:scale-110 opacity-90" loading="lazy" />
                </div>
                <p className="text-gray-400 font-normal text-sm text-center group-hover:text-gray-300 transition-colors">{item.name}</p>
              </div>
            )}
          />
        </div>

        {/* Bottom text */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center"
        >
          <p className="text-gray-400 text-sm">
            And many more tools tailored to your needs
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default TechStackSection;
