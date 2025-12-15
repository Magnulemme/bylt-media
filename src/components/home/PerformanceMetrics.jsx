"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';

const PerformanceMetrics = () => {
  // Dati reali di performance marketing
  const performanceData = [
    { name: 'Month 1', value: 12500 },
    { name: 'Month 2', value: 18200 },
    { name: 'Month 3', value: 24800 },
    { name: 'Month 4', value: 31500 },
  ];

  const roasData = [
    { name: 'Jan', actual: 3.2, target: 2.5 },
    { name: 'Feb', actual: 3.8, target: 3.0 },
    { name: 'Mar', actual: 4.5, target: 3.5 },
    { name: 'Apr', actual: 5.2, target: 4.0 },
    { name: 'May', actual: 6.1, target: 4.5 },
    { name: 'Jun', actual: 6.8, target: 5.0 },
  ];

  const trafficData = [
    { name: 'W1', organic: 12000, paid: 8500 },
    { name: 'W2', organic: 15500, paid: 11200 },
    { name: 'W3', organic: 18200, paid: 14800 },
    { name: 'W4', organic: 21000, paid: 17500 },
  ];

  const bounceRateData = [
    { name: 'W1', rate: 58 },
    { name: 'W2', rate: 52 },
    { name: 'W3', rate: 45 },
    { name: 'W4', rate: 38 },
  ];

  const engagementData = [
    { name: 'W1', rate: 42 },
    { name: 'W2', rate: 48 },
    { name: 'W3', rate: 55 },
    { name: 'W4', rate: 62 },
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

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      // Forza l'estrazione del label dai dati del payload se non è presente
      const displayLabel = label || (payload[0]?.payload?.name);

      return (
        <div className="bg-black/95 backdrop-blur-xl border border-cyan-500/30 rounded-lg p-3 shadow-2xl">
          {displayLabel && (
            <p className="text-xs text-gray-400 mb-1.5 font-medium border-b border-white/10 pb-1.5">{displayLabel}</p>
          )}
          {payload.map((entry, index) => {
            // Determina il nome leggibile del dato
            const dataName = entry.dataKey;

            // Traduci i nomi tecnici in etichette leggibili
            const nameMap = {
              'value': 'Revenue',
              'actual': 'Actual ROAS',
              'target': 'Target ROAS',
              'organic': 'Organic SEO',
              'paid': 'Paid Ads',
              'rate': entry.payload?.name?.includes('W') ? 'Bounce Rate' : 'Engagement Rate'
            };

            const displayName = nameMap[dataName] || dataName;

            // Formatta il valore in base al tipo di dato
            let formattedValue = entry.value;
            if (typeof entry.value === 'number') {
              if (dataName === 'value') {
                // Revenue in euro
                formattedValue = `€${entry.value.toLocaleString('it-IT')}`;
              } else if (dataName === 'actual' || dataName === 'target') {
                // ROAS con decimale
                formattedValue = `${entry.value.toFixed(1)}x`;
              } else if (dataName === 'rate') {
                // Bounce Rate percentuale
                formattedValue = `${entry.value}%`;
              } else {
                // Altri numeri generici
                formattedValue = entry.value.toLocaleString('it-IT');
              }
            }

            // Mappa colori per ogni tipo di dato
            const colorMap = {
              'value': '#22d3ee',
              'actual': '#3b82f6',
              'target': '#6b7280',
              'organic': '#a855f7',
              'paid': '#22d3ee',
              'rate': '#10b981'
            };

            const displayColor = colorMap[dataName] || '#22d3ee';

            return (
              <div key={index} className="flex items-center justify-between gap-3 mt-1">
                <span className="text-xs text-gray-400">{displayName}</span>
                <span className="text-sm font-bold" style={{ color: displayColor }}>
                  {formattedValue}
                </span>
              </div>
            );
          })}
        </div>
      );
    }
    return null;
  };

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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative bg-black/60 backdrop-blur-sm border border-white/10 rounded-2xl p-6 h-full">
              <h3 className="text-sm font-medium text-gray-400 mb-4">Revenue Growth</h3>
              <ResponsiveContainer width="100%" height={160}>
                <BarChart data={performanceData}>
                  <XAxis
                    dataKey="name"
                    stroke="rgba(255,255,255,0.2)"
                    tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10 }}
                    axisLine={false}
                  />
                  <Tooltip content={<CustomTooltip />} cursor={false} />
                  <Bar
                    dataKey="value"
                    fill="url(#barGradient)"
                    radius={[6, 6, 0, 0]}
                    animationDuration={1200}
                  />
                  <defs>
                    <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#22d3ee" stopOpacity={0.8}/>
                      <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
              <div className="mt-4 pt-4 border-t border-white/5">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">€31.5K</span>
                  <span className="text-xs text-gray-500">ultimo mese</span>
                </div>
                <p className="text-xs text-green-400 mt-1">+152% in 4 mesi</p>
              </div>
            </div>
          </motion.div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 gap-3">
            {kpis.map((kpi, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: kpi.delay }}
                className="relative"
              >
                <div className="relative bg-black/60 backdrop-blur-sm border border-white/10 rounded-xl p-4 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5">{kpi.label}</p>
                    <p className={`text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${kpi.color}`}>
                      {kpi.value}
                    </p>
                    <p className="text-[10px] text-gray-600 mt-0.5">{kpi.description}</p>
                  </div>
                  <div className="relative w-12 h-12 flex items-center justify-center">
                    {/* Background glow */}
                    <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${kpi.color} opacity-20 blur-sm animate-pulse`} />
                    {/* Icon container */}
                    <div className={`relative w-10 h-10 rounded-lg bg-gradient-to-br ${kpi.color} flex items-center justify-center`}>
                      <div className="text-white">
                        {kpi.icon}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Traffic Sources Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative bg-black/60 backdrop-blur-sm border border-white/10 rounded-2xl p-6 h-full flex flex-col">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-400">Traffic Distribution</h3>
                <span className="text-xs text-gray-500">visitors/month</span>
              </div>
              <div className="flex-1 flex items-center justify-center relative min-h-[200px]" style={{ pointerEvents: 'none' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <defs>
                      <linearGradient id="organicGradient" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#a855f7" />
                        <stop offset="100%" stopColor="#9333ea" />
                      </linearGradient>
                      <linearGradient id="paidGradient" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#22d3ee" />
                        <stop offset="100%" stopColor="#06b6d4" />
                      </linearGradient>
                    </defs>
                    <Pie
                      data={trafficMixData}
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={85}
                      paddingAngle={4}
                      dataKey="value"
                      animationDuration={1200}
                      animationBegin={0}
                      isAnimationActive={true}
                      activeIndex={-1}
                    >
                      {trafficMixData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={index === 0 ? 'url(#organicGradient)' : 'url(#paidGradient)'}
                          stroke="rgba(0,0,0,0.4)"
                          strokeWidth={3}
                        />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                {/* Center label */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="text-center">
                    <p className="text-[10px] text-gray-500 mb-1">Total Traffic</p>
                    <p className="text-2xl font-bold text-white">38.5K</p>
                  </div>
                </div>
              </div>
              <div className="pt-3 border-t border-white/5">
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-purple-400" />
                      <span className="text-gray-400">Organic SEO</span>
                    </div>
                    <div className="ml-4">
                      <span className="text-lg font-bold text-white">21K</span>
                      <span className="text-gray-500 ml-1.5">(54.5%)</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                      <span className="text-gray-400">Paid Ads</span>
                    </div>
                    <div className="ml-4">
                      <span className="text-lg font-bold text-white">17.5K</span>
                      <span className="text-gray-500 ml-1.5">(45.5%)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Second row: 2 columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-6 lg:mb-8">

          {/* Traffic Sources (Stacked Area Chart) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative bg-black/60 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <h3 className="text-sm font-medium text-gray-400 mb-4">Traffic Sources Evolution</h3>
              <ResponsiveContainer width="100%" height={180}>
                <AreaChart data={trafficData}>
                  <defs>
                    <linearGradient id="organicAreaGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#a855f7" stopOpacity={0.6}/>
                      <stop offset="100%" stopColor="#a855f7" stopOpacity={0.1}/>
                    </linearGradient>
                    <linearGradient id="paidAreaGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#22d3ee" stopOpacity={0.6}/>
                      <stop offset="100%" stopColor="#22d3ee" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="name"
                    stroke="rgba(255,255,255,0.1)"
                    tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10 }}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="rgba(255,255,255,0.1)"
                    tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10 }}
                    axisLine={false}
                  />
                  <Tooltip
                    content={<CustomTooltip />}
                    cursor={{ stroke: 'rgba(168, 85, 247, 0.2)', strokeWidth: 1, strokeDasharray: '3 3' }}
                  />
                  <Area
                    type="monotone"
                    dataKey="organic"
                    stackId="1"
                    stroke="#a855f7"
                    strokeWidth={2}
                    fill="url(#organicAreaGradient)"
                    animationDuration={1500}
                  />
                  <Area
                    type="monotone"
                    dataKey="paid"
                    stackId="1"
                    stroke="#22d3ee"
                    strokeWidth={2}
                    fill="url(#paidAreaGradient)"
                    animationDuration={1500}
                  />
                </AreaChart>
              </ResponsiveContainer>
              <div className="mt-4 pt-4 border-t border-white/5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-xs">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-purple-400" />
                      <span className="text-gray-400">Organic</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-cyan-400" />
                      <span className="text-gray-400">Paid</span>
                    </div>
                  </div>
                  <p className="text-xs text-green-400">+75% traffico totale</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Engagement Rate (Area Chart) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative"
          >
            <div className="relative bg-black/60 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <h3 className="text-sm font-medium text-gray-400 mb-4">Engagement Rate</h3>
              <ResponsiveContainer width="100%" height={180}>
                <AreaChart data={engagementData}>
                  <defs>
                    <linearGradient id="engagementGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10b981" stopOpacity={0.6}/>
                      <stop offset="100%" stopColor="#10b981" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="name"
                    stroke="rgba(255,255,255,0.1)"
                    tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10 }}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="rgba(255,255,255,0.1)"
                    tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10 }}
                    axisLine={false}
                    domain={[0, 80]}
                  />
                  <Tooltip
                    content={<CustomTooltip />}
                    cursor={{ stroke: 'rgba(16, 185, 129, 0.2)', strokeWidth: 1, strokeDasharray: '3 3' }}
                  />
                  <Area
                    type="monotone"
                    dataKey="rate"
                    stroke="#10b981"
                    strokeWidth={3}
                    fill="url(#engagementGradient)"
                    animationDuration={1500}
                  />
                </AreaChart>
              </ResponsiveContainer>
              <div className="mt-4 pt-4 border-t border-white/5">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-400">62%</span>
                  <span className="text-xs text-gray-500">utenti attivi</span>
                </div>
                <p className="text-xs text-green-400 mt-1">+48% da settimana 1</p>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Bottom: ROAS Trend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="relative"
        >
          <div className="relative bg-black/60 backdrop-blur-sm border border-white/10 rounded-2xl p-6 lg:p-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-sm font-medium text-gray-400 mb-1">ROAS Trend</h3>
                <p className="text-xs text-gray-600">Return on Ad Spend nel tempo - Actual vs Target</p>
              </div>
              <div className="flex gap-4 text-xs">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-blue-400" />
                  <span className="text-gray-400">Actual</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-gray-600" />
                  <span className="text-gray-400">Target</span>
                </div>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={roasData}>
                <defs>
                  <linearGradient id="roasGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="name"
                  stroke="rgba(255,255,255,0.1)"
                  tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }}
                  axisLine={false}
                />
                <YAxis
                  stroke="rgba(255,255,255,0.1)"
                  tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }}
                  axisLine={false}
                />
                <Tooltip
                  content={<CustomTooltip />}
                  cursor={{ stroke: 'rgba(59, 130, 246, 0.2)', strokeWidth: 1, strokeDasharray: '3 3' }}
                />
                <Line
                  type="monotone"
                  dataKey="target"
                  stroke="#6b7280"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={false}
                  animationDuration={1500}
                />
                <Line
                  type="monotone"
                  dataKey="actual"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  dot={{
                    fill: '#3b82f6',
                    r: 4,
                    strokeWidth: 2,
                    stroke: '#1e40af'
                  }}
                  activeDot={{
                    r: 6,
                    fill: '#3b82f6',
                    stroke: '#60a5fa',
                    strokeWidth: 3,
                    filter: 'drop-shadow(0 0 8px rgba(59, 130, 246, 0.6))'
                  }}
                  animationDuration={1500}
                />
              </LineChart>
            </ResponsiveContainer>
            <div className="mt-4 pt-4 border-t border-white/5">
              <p className="text-xs text-gray-500">
                Superamento costante degli obiettivi - ogni euro investito genera <span className="text-cyan-400 font-semibold">€6.80</span> di ritorno
              </p>
            </div>
          </div>
        </motion.div>

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
