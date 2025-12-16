"use client";
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import RevenueChart from './PerformanceMetrics/RevenueChart';
import KPICards from './PerformanceMetrics/KPICards';
import TrafficDistributionChart from './PerformanceMetrics/TrafficDistributionChart';
import ROASTrendChart from './PerformanceMetrics/ROASTrendChart';
import ConversionTrendChart from './PerformanceMetrics/ConversionTrendChart';
import { MovingBorderButton } from '../ui/moving-border-button';
import { SectionIntro } from '../ui/section-headers';

const PerformanceMetrics = () => {
  const containerRef = useRef(null);
  const cardRef = useRef(null);
  const [isMounted, setIsMounted] = React.useState(false);

  // Mobile scroll progress
  const { scrollYProgress: mobileScrollProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Forza un re-render dopo il mount per inizializzare useScroll correttamente
  React.useEffect(() => {
    setIsMounted(true);

    // Forza un piccolo scroll per attivare i calcoli di Framer Motion
    const timer = setTimeout(() => {
      if (containerRef.current) {
        const currentScroll = window.scrollY;
        window.scrollTo({ top: currentScroll + 1, behavior: 'instant' });
        window.scrollTo({ top: currentScroll, behavior: 'instant' });
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);
  // Dati reali di performance marketing
  const performanceData = [
    { name: 'Month 1', revenue: 10500, cost: 2000 },
    { name: 'Month 2', revenue: 15400, cost: 2800 },
    { name: 'Month 3', revenue: 21200, cost: 3600 },
    { name: 'Month 4', revenue: 26900, cost: 4600 },
  ];

  const roasData = [
    { name: 'Jan', actual: 3.2, target: 2.5 },
    { name: 'Feb', actual: 3.8, target: 3.0 },
    { name: 'Mar', actual: 4.5, target: 3.5 },
    { name: 'Apr', actual: 5.2, target: 4.0 },
    { name: 'May', actual: 6.1, target: 4.5 },
    { name: 'Jun', actual: 6.8, target: 5.0 },
  ];

  const channelPerformanceData = [
    { channel: 'Google Ads', performance: 95 },
    { channel: 'Meta Ads', performance: 92 },
    { channel: 'LinkedIn', performance: 78 },
    { channel: 'TikTok', performance: 85 },
    { channel: 'YouTube', performance: 88 },
  ];

  // Dati per Radial Bar Chart - Traffic Mix
  const trafficMixData = [
    {
      name: 'Organic SEO',
      value: 21000,
      fill: '#a855f7',
    },
    {
      name: 'Paid Ads',
      value: 17500,
      fill: '#22d3ee',
    },
  ];

  const kpis = [
    {
      value: "6.8x",
      label: "ROAS",
      description: "Return on Ad Spend",
      color: "from-cyan-500 to-blue-500",
      delay: 0.2,
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      )
    },
    {
      value: "3.2%",
      label: "CVR",
      description: "Conversion Rate",
      color: "from-blue-500 to-purple-500",
      delay: 0.4,
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      value: "€2.35",
      label: "CPA",
      description: "Cost per Acquisition",
      color: "from-purple-500 to-pink-500",
      delay: 0.6,
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
  ];

  return (
    <div className="relative z-10 py-20 md:py-28">{/* Rimosse le gradient overlays perché condivise con lo shader background */}

      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                        {/* Section intro */}
                        <SectionIntro
                            title="I Numeri Parlano Chiaro"
                            subtitle="Trasparenza totale sulle performance. Ogni metrica è tracciata, analizzata e ottimizzata per massimizzare il tuo ritorno sull'investimento."
                            align="right"
                            maxWidth="3xl"
                            variant="blur"
                        />

        {/* Mobile Version - Horizontal scroll driven by vertical scroll */}
        <div className="md:hidden">
          {/* Tall container for vertical scroll space */}
          <div
            style={{ height: '500vh' }}
            ref={containerRef}
          >
            {/* Sticky wrapper - stays in viewport while scrolling */}
            <div
              className="sticky overflow-x-clip flex items-center"
              style={{
                top: '20vh'
              }}
            >
              {/* Horizontal scrolling charts container - Move RIGHT */}
              <motion.div
                className="flex items-stretch w-full"
                style={{
                  x: useTransform(
                    mobileScrollProgress,
                    [0, 1],
                    ['-400%', '0%'] // Start from left (-400%) and move to 0%
                  )
                }}
              >
                  <div className="flex-shrink-0 w-full px-4 [&>div]:!h-full [&>div>div]:!h-full [&_[class*='ResponsiveContainer']]:!h-full">
                    <ConversionTrendChart data={channelPerformanceData} />
                  </div>
                  <div className="flex-shrink-0 w-full px-4 [&>div]:!h-full [&>div>div]:!h-full [&_[class*='ResponsiveContainer']]:!h-full">
                    <ROASTrendChart data={roasData} />
                  </div>
                  <div className="flex-shrink-0 w-full px-4 [&>div]:!h-full [&>div>div]:!h-full [&_[class*='ResponsiveContainer']]:!h-full">
                    <TrafficDistributionChart data={trafficMixData} />
                  </div>
                  <div className="flex-shrink-0 w-full px-4 [&>div]:!h-full [&>div>div]:!h-full [&_[class*='ResponsiveContainer']]:!h-full">
                    <RevenueChart data={performanceData} />
                  </div>
                  <div className="flex-shrink-0 w-full px-4" ref={cardRef}>
                    <div className="relative bg-black/60 backdrop-blur-sm border border-white/10 rounded-2xl p-6 h-full flex flex-col">
                      {/* Header */}
                      <div className="mb-4">
                        <h3 className="text-sm font-medium text-gray-400 mb-1">Panoramica Performance</h3>
                        <p className="text-xs text-gray-600">Le metriche chiave del tuo marketing</p>
                      </div>

                      {/* Mini Area Chart */}
                      <div className="flex-1 min-h-[100px] mb-6">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={roasData}>
                            <defs>
                              <linearGradient id="kpiGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#22d3ee" stopOpacity={0.4}/>
                                <stop offset="100%" stopColor="#22d3ee" stopOpacity={0}/>
                              </linearGradient>
                            </defs>
                            <Area
                              type="monotone"
                              dataKey="actual"
                              stroke="#22d3ee"
                              strokeWidth={2}
                              fill="url(#kpiGradient)"
                              animationDuration={1500}
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>

                      {/* KPI Items */}
                      <div className="flex flex-col gap-4">
                        {kpis.map((kpi, i) => (
                          <div key={i} className="flex items-center justify-between">
                            <div>
                              <p className="text-xs text-gray-500 mb-0.5">{kpi.label}</p>
                              <p className={`text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${kpi.color}`}>
                                {kpi.value}
                              </p>
                              <p className="text-xs text-gray-600 mt-0.5">{kpi.description}</p>
                            </div>
                            <div className="relative w-14 h-14 flex items-center justify-center">
                              <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${kpi.color} opacity-20 blur-sm`} />
                              <div className={`relative w-12 h-12 rounded-lg bg-gradient-to-br ${kpi.color} flex items-center justify-center`}>
                                <div className="text-white">
                                  {kpi.icon}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
        </div>

        {/* Tablet: Optimized Grid Layout (2 + 3 KPI cards + 2) */}
        <div className="hidden md:block lg:hidden mb-6 md:mb-8">
          {/* First row: Revenue + Traffic (2 cols) */}
          <div className="grid grid-cols-2 gap-6 mb-6">
            <RevenueChart data={performanceData} />
            <TrafficDistributionChart data={trafficMixData} />
          </div>

          {/* Second row: KPI Cards horizontal (1 row, 3 cards) */}
          <div className="mb-6">
            <KPICards kpis={kpis} />
          </div>

          {/* Third row: ROAS + Channel Performance (2 cols) */}
          <div className="grid grid-cols-2 gap-6">
            <ROASTrendChart data={roasData} />
            <ConversionTrendChart data={channelPerformanceData} />
          </div>
        </div>

        {/* Desktop: Original Grid Layout with mobile-style KPI card */}
        <div className="hidden lg:block">
          {/* Top row: 3 columns */}
          <div className="grid grid-cols-3 gap-8 mb-8">
            <RevenueChart data={performanceData} />
            {/* Desktop KPI Card - Mobile style with chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative bg-black/60 backdrop-blur-sm border border-white/10 rounded-2xl p-6 h-full flex flex-col">
                {/* Header */}
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-gray-400 mb-1">Panoramica Performance</h3>
                  <p className="text-xs text-gray-600">Le metriche chiave del tuo marketing</p>
                </div>

                {/* Mini Area Chart */}
                <div className="flex-1 min-h-[100px] mb-6">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={roasData}>
                      <defs>
                        <linearGradient id="kpiGradientDesktop" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#22d3ee" stopOpacity={0.4}/>
                          <stop offset="100%" stopColor="#22d3ee" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <Area
                        type="monotone"
                        dataKey="actual"
                        stroke="#22d3ee"
                        strokeWidth={2}
                        fill="url(#kpiGradientDesktop)"
                        animationDuration={1500}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                {/* KPI Items */}
                <div className="flex flex-col gap-4">
                  {kpis.map((kpi, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-gray-500 mb-0.5">{kpi.label}</p>
                        <p className={`text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${kpi.color}`}>
                          {kpi.value}
                        </p>
                        <p className="text-xs text-gray-600 mt-0.5">{kpi.description}</p>
                      </div>
                      <div className="relative w-14 h-14 flex items-center justify-center">
                        <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${kpi.color} opacity-20 blur-sm`} />
                        <div className={`relative w-12 h-12 rounded-lg bg-gradient-to-br ${kpi.color} flex items-center justify-center`}>
                          <div className="text-white">
                            {kpi.icon}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
            <TrafficDistributionChart data={trafficMixData} />
          </div>

          {/* Second row: 2 columns */}
          <div className="grid grid-cols-2 gap-8 mb-8">
            <ROASTrendChart data={roasData} />
            <ConversionTrendChart data={channelPerformanceData} />
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-400 mb-6">
            Vuoi vedere metriche come queste per il tuo business?
          </p>
          <div className="flex justify-center">
                                      <MovingBorderButton
                                          type="submit"
                                          borderRadius="0.75rem"
                                          containerClassName="min-w-[240px] h-16"
                                          borderClassName="h-24 w-24 bg-[radial-gradient(circle,#06b6d4_20%,#3b82f6_40%,#8b5cf6_60%,transparent_80%)] opacity-100"
                                          className="border-2 border-slate-700/80 text-white font-bold text-base disabled:opacity-50 disabled:cursor-not-allowed"
                                          duration={2500}
                                      >
                                          Get Free Audit
                                      </MovingBorderButton>
                                  </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PerformanceMetrics;
