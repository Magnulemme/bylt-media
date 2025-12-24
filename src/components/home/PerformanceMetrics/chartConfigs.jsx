import React from 'react';
import { BarChart, Bar, XAxis, Tooltip, LineChart, Line, YAxis, PieChart, Pie, Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import CustomTooltip from './CustomTooltip';
import { DetailsSection } from './DetailsComponents';

/**
 * Configurazioni centralizzate per tutti i chart delle Performance Metrics
 * Ogni configurazione include: titolo, sottotitolo, legenda, renderer del chart, dettagli e delay animazione
 */

export const chartConfigs = {
  revenue: {
    title: "Revenue & Ad Spend",
    subtitle: "Performance mensile",
    delay: 0,

    // Legenda
    renderLegend: () => (
      <>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-sm bg-cyan-400" />
          <span className="text-gray-400">Revenue</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-sm bg-orange-400" />
          <span className="text-gray-400">Ad Spend</span>
        </div>
      </>
    ),

    // Chart renderer
    renderChart: (data) => (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <defs>
            <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#22d3ee" stopOpacity={0.8}/>
              <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.4}/>
            </linearGradient>
            <linearGradient id="costGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fb923c" stopOpacity={0.7}/>
              <stop offset="100%" stopColor="#f97316" stopOpacity={0.3}/>
            </linearGradient>
          </defs>
          <XAxis
            dataKey="name"
            stroke="rgba(255,255,255,0.2)"
            tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10 }}
            axisLine={false}
          />
          <Tooltip content={<CustomTooltip />} cursor={false} />
          <Bar
            dataKey="cost"
            stackId="a"
            fill="url(#costGradient)"
            radius={[0, 0, 0, 0]}
            animationDuration={1200}
          />
          <Bar
            dataKey="revenue"
            stackId="a"
            fill="url(#revenueGradient)"
            radius={[6, 6, 0, 0]}
            animationDuration={1200}
          />
        </BarChart>
      </ResponsiveContainer>
    ),

    // Details
    renderDetails: () => (
      <DetailsSection
        leftStat={{
          label: "Revenue totale",
          value: "€31.5K",
          className: "text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400",
          unit: "ultimo mese"
        }}
        rightStat={{
          label: "Margine",
          value: "€26.9K (85%)",
          className: "text-sm font-bold text-green-400"
        }}
        description="Crescita sostenuta con margine costante. Spesa pubblicitaria ottimizzata per massimizzare il profitto."
      />
    )
  },

  roas: {
    title: "Ritorno sulla Spesa Pubblicitaria",
    subtitle: "Performance ROAS nell'ultimo semestre",
    delay: 0.4,

    renderLegend: () => (
      <>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-blue-400" />
          <span className="text-gray-400">Realizzato</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-gray-600" />
          <span className="text-gray-400">Obiettivo</span>
        </div>
      </>
    ),

    renderChart: (data) => (
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={data}>
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
    ),

    renderDetails: () => (
      <DetailsSection
        leftStat={{
          label: "Performance attuale",
          value: "6.8x",
          className: "text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400",
          unit: "ROAS"
        }}
        rightStat={{
          label: "vs Obiettivo",
          value: "+36% sopra target",
          className: "text-sm font-bold text-green-400"
        }}
        description={<>Ogni euro investito in advertising genera <span className="text-cyan-400 font-semibold">€6.80</span> di revenue. Performance costantemente superiore agli obiettivi prefissati.</>}
      />
    )
  },

  traffic: {
    title: "Traffic Distribution",
    subtitle: "visitors/month",
    delay: 0.2,

    renderLegend: () => (
      <>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-purple-400" />
          <span className="text-gray-400">Organic</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-cyan-400" />
          <span className="text-gray-400">Paid</span>
        </div>
      </>
    ),

    renderChart: (data) => (
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
              data={data}
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
              {data.map((entry, index) => (
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
    ),

    renderDetails: () => (
      <DetailsSection
        leftStat={{
          label: "Organic SEO",
          value: "21K",
          className: "text-2xl font-bold text-white",
          unit: "(54.5%)"
        }}
        rightStat={{
          label: "Paid Ads",
          value: "17.5K",
          className: "text-2xl font-bold text-white"
        }}
        description="Mix bilanciato di traffico organico e a pagamento. La forte presenza SEO garantisce sostenibilità a lungo termine, mentre le campagne paid mantengono la crescita costante."
      />
    )
  },

  conversion: {
    title: "Performance per Canale",
    subtitle: "Analisi multi-dimensionale delle piattaforme pubblicitarie",
    delay: 0.5,

    renderLegend: () => null,

    renderChart: (data) => (
      <ResponsiveContainer width="100%" height={220}>
        <RadarChart data={data}>
          <defs>
            <linearGradient id="radarGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#a855f7" stopOpacity={0.8}/>
              <stop offset="100%" stopColor="#ec4899" stopOpacity={0.3}/>
            </linearGradient>
          </defs>
          <PolarGrid
            stroke="rgba(255,255,255,0.1)"
            strokeDasharray="3 3"
          />
          <PolarAngleAxis
            dataKey="channel"
            tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 11 }}
            stroke="rgba(255,255,255,0.2)"
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 100]}
            tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 9 }}
            stroke="rgba(255,255,255,0.1)"
          />
          <Tooltip
            content={<CustomTooltip />}
          />
          <Radar
            name="Performance"
            dataKey="performance"
            stroke="#a855f7"
            strokeWidth={2}
            fill="url(#radarGradient)"
            fillOpacity={0.6}
            animationDuration={1500}
            dot={{
              r: 4,
              fill: '#a855f7',
              strokeWidth: 2,
              stroke: '#fff'
            }}
          />
        </RadarChart>
      </ResponsiveContainer>
    ),

    renderDetails: () => (
      <DetailsSection
        leftStat={{
          label: "Score medio",
          value: "87/100",
          className: "text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400",
          unit: "performance"
        }}
        rightStat={{
          label: "Miglior canale",
          value: "Google Ads",
          className: "text-sm font-bold text-purple-400"
        }}
        description="Strategia omnicanale bilanciata con performance eccellenti su tutte le piattaforme principali. Google Ads e Meta leading performers."
      />
    )
  }
};
