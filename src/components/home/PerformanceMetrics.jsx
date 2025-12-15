"use client";
import React from 'react';
import { motion } from 'framer-motion';
import RevenueChart from './PerformanceMetrics/RevenueChart';
import KPICards from './PerformanceMetrics/KPICards';
import TrafficDistributionChart from './PerformanceMetrics/TrafficDistributionChart';
import ROASTrendChart from './PerformanceMetrics/ROASTrendChart';
import ConversionTrendChart from './PerformanceMetrics/ConversionTrendChart';

const PerformanceMetrics = () => {
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
    <div className="relative z-10 py-20 md:py-28 overflow-hidden">{/* Rimosse le gradient overlays perché condivise con lo shader background */}

      <div className="max-w-7xl mx-auto px-4 relative z-10">

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-cyan-400 text-sm font-semibold tracking-wider uppercase">Performance Analytics</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-3 mb-4">
            Metriche che Contano
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Monitoriamo costantemente le KPI fondamentali per massimizzare il tuo ROI.
            Ogni campagna viene ottimizzata in base a dati real-time e obiettivi di business.
          </p>
        </motion.div>

        {/* Top row: 3 columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mb-6 lg:mb-8">

          {/* Revenue Growth Chart */}
          <RevenueChart data={performanceData} />

          {/* KPI Cards */}
          <KPICards kpis={kpis} />

          {/* Traffic Sources Chart */}
          <TrafficDistributionChart data={trafficMixData} />

        </div>

        {/* Second row: 2 columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-6 lg:mb-8">

          {/* ROAS Trend */}
          <ROASTrendChart data={roasData} />

          {/* Channel Performance */}
          <ConversionTrendChart data={channelPerformanceData} />

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
          <a
            href="/free-audit"
            className="inline-block px-8 py-4 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 text-white text-sm font-semibold rounded-full hover:shadow-[0_0_40px_rgba(34,211,238,0.3)] transition-all duration-300 hover:scale-105"
          >
            Richiedi Analisi Gratuita
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default PerformanceMetrics;
