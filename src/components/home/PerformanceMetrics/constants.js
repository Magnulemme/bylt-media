// Data constants
export const performanceData = [
  { name: 'Month 1', revenue: 10500, cost: 2000 },
  { name: 'Month 2', revenue: 15400, cost: 2800 },
  { name: 'Month 3', revenue: 21200, cost: 3600 },
  { name: 'Month 4', revenue: 26900, cost: 4600 },
];

export const roasData = [
  { name: 'Jan', actual: 3.2, target: 2.5 },
  { name: 'Feb', actual: 3.8, target: 3.0 },
  { name: 'Mar', actual: 4.5, target: 3.5 },
  { name: 'Apr', actual: 5.2, target: 4.0 },
  { name: 'May', actual: 6.1, target: 4.5 },
  { name: 'Jun', actual: 6.8, target: 5.0 },
];

export const channelPerformanceData = [
  { channel: 'Google Ads', performance: 95 },
  { channel: 'Meta Ads', performance: 92 },
  { channel: 'LinkedIn', performance: 78 },
  { channel: 'TikTok', performance: 85 },
  { channel: 'YouTube', performance: 88 },
];

export const trafficMixData = [
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

export const kpis = [
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
