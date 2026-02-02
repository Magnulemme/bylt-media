"use client";
import React from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    LineChart,
    Line,
    PieChart,
    Pie,
    Cell,
    RadarChart,
    Radar,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    AreaChart,
    Area,
    ResponsiveContainer
} from 'recharts';

// Custom Tooltip component
const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-slate-900/95 backdrop-blur-sm border border-slate-700 rounded-lg px-3 py-2 shadow-xl">
                <p className="text-caption mb-1">{label}</p>
                {payload.map((entry, index) => (
                    <p key={index} className="text-sm font-semibold" style={{ color: entry.color || '#06b6d4' }}>
                        {entry.name}: {typeof entry.value === 'number' && entry.value > 100 ? `€${(entry.value / 1000).toFixed(1)}K` : entry.value}
                    </p>
                ))}
            </div>
        );
    }
    return null;
};

// Chart data for each type
const chartData = {
    revenue: [
        { name: 'Month 1', revenue: 10500, cost: 2000 },
        { name: 'Month 2', revenue: 15400, cost: 2800 },
        { name: 'Month 3', revenue: 21200, cost: 3600 },
        { name: 'Month 4', revenue: 26900, cost: 4600 },
    ],
    roas: [
        { name: 'Jan', actual: 3.2, target: 2.5 },
        { name: 'Feb', actual: 3.8, target: 3.0 },
        { name: 'Mar', actual: 4.5, target: 3.5 },
        { name: 'Apr', actual: 5.2, target: 4.0 },
        { name: 'May', actual: 6.1, target: 4.5 },
        { name: 'Jun', actual: 6.8, target: 5.0 },
    ],
    traffic: [
        { name: 'Organic SEO', value: 21000 },
        { name: 'Paid Ads', value: 17500 },
    ],
    conversion: [
        { channel: 'Google Ads', performance: 95 },
        { channel: 'Meta Ads', performance: 92 },
        { channel: 'LinkedIn', performance: 78 },
        { channel: 'TikTok', performance: 85 },
        { channel: 'YouTube', performance: 88 },
    ],
    efficiency: [
        { month: 'Jan', automation: 25, manual: 75 },
        { month: 'Feb', automation: 40, manual: 60 },
        { month: 'Mar', automation: 55, manual: 45 },
        { month: 'Apr', automation: 68, manual: 32 },
        { month: 'May', automation: 78, manual: 22 },
        { month: 'Jun', automation: 85, manual: 15 },
    ]
};

// Service to chart type mapping (each chart used by exactly 2 services)
export const serviceChartMap = {
    'paid-search': 'revenue',
    'programmatic': 'revenue',
    'social-media': 'roas',
    'email-marketing': 'roas',
    'seo': 'traffic',
    'analytics': 'traffic',
    'cro': 'conversion',
    'websites': 'conversion',
    'data-science': 'efficiency',
    'ai-solutions': 'efficiency',
};

// Chart configurations with title, subtitle, legend, and details
export const chartConfigs = {
    revenue: {
        title: "Revenue & Ad Spend",
        subtitle: "Monthly performance",
        legend: [
            { color: 'bg-cyan-400', label: 'Revenue' },
            { color: 'bg-orange-400', label: 'Ad Spend' }
        ],
        details: {
            leftStat: { label: 'Total revenue', value: '€31.5K', unit: 'last month' },
            rightStat: { label: 'Margin', value: '€26.9K (85%)' },
            description: 'Sustained growth with consistent margin. Advertising spend optimized to maximize profit.'
        }
    },
    roas: {
        title: "Return on Ad Spend",
        subtitle: "ROAS performance over the last semester",
        legend: [
            { color: 'bg-blue-400', label: 'Actual', rounded: true },
            { color: 'bg-gray-600', label: 'Target', rounded: true }
        ],
        details: {
            leftStat: { label: 'Current performance', value: '6.8x', unit: 'ROAS' },
            rightStat: { label: 'vs Target', value: '+36% above target' },
            description: 'Every euro invested in advertising generates €6.80 in revenue.'
        }
    },
    traffic: {
        title: "Traffic Distribution",
        subtitle: "visitors/month",
        legend: [
            { color: 'bg-purple-400', label: 'Organic', rounded: true },
            { color: 'bg-cyan-400', label: 'Paid', rounded: true }
        ],
        details: {
            leftStat: { label: 'Organic SEO', value: '21K', unit: '(54.5%)' },
            rightStat: { label: 'Paid Ads', value: '17.5K' },
            description: 'Balanced mix of organic and paid traffic for long-term sustainability.'
        }
    },
    conversion: {
        title: "Channel Performance",
        subtitle: "Multi-dimensional analysis",
        legend: null,
        details: {
            leftStat: { label: 'Average score', value: '87/100', unit: 'performance' },
            rightStat: { label: 'Top channel', value: 'Google Ads' },
            description: 'Balanced omnichannel strategy with excellent performance across all major platforms.'
        }
    },
    efficiency: {
        title: "Automation Progress",
        subtitle: "Manual vs Automated tasks",
        legend: [
            { color: 'bg-emerald-400', label: 'Automated' },
            { color: 'bg-slate-500', label: 'Manual' }
        ],
        details: {
            leftStat: { label: 'Current automation', value: '85%', unit: 'of tasks' },
            rightStat: { label: 'Time saved', value: '+60%' },
            description: 'AI-powered automation dramatically reduces manual effort and increases efficiency.'
        }
    }
};

// Chart renderers
const RevenueChart = () => (
    <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData.revenue}>
            <defs>
                <linearGradient id="whyByltRevenueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#22d3ee" stopOpacity={0.8} />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.4} />
                </linearGradient>
                <linearGradient id="whyByltCostGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#fb923c" stopOpacity={0.7} />
                    <stop offset="100%" stopColor="#f97316" stopOpacity={0.3} />
                </linearGradient>
            </defs>
            <XAxis
                dataKey="name"
                stroke="rgba(255,255,255,0.2)"
                tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10 }}
                axisLine={false}
                tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} cursor={false} />
            <Bar
                dataKey="cost"
                stackId="a"
                fill="url(#whyByltCostGradient)"
                radius={[0, 0, 0, 0]}
                animationDuration={1200}
            />
            <Bar
                dataKey="revenue"
                stackId="a"
                fill="url(#whyByltRevenueGradient)"
                radius={[6, 6, 0, 0]}
                animationDuration={1200}
            />
        </BarChart>
    </ResponsiveContainer>
);

const RoasChart = () => (
    <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData.roas}>
            <defs>
                <linearGradient id="whyByltRoasGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
            </defs>
            <XAxis
                dataKey="name"
                stroke="rgba(255,255,255,0.1)"
                tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }}
                axisLine={false}
                tickLine={false}
            />
            <YAxis
                stroke="rgba(255,255,255,0.1)"
                tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }}
                axisLine={false}
                tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(59, 130, 246, 0.2)', strokeWidth: 1, strokeDasharray: '3 3' }} />
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
                dot={{ fill: '#3b82f6', r: 4, strokeWidth: 2, stroke: '#1e40af' }}
                activeDot={{ r: 6, fill: '#3b82f6', stroke: '#60a5fa', strokeWidth: 3 }}
                animationDuration={1500}
            />
        </LineChart>
    </ResponsiveContainer>
);

const TrafficChart = () => (
    <div className="relative w-full h-full flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
            <PieChart>
                <defs>
                    <linearGradient id="whyByltOrganicGradient" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#a855f7" />
                        <stop offset="100%" stopColor="#9333ea" />
                    </linearGradient>
                    <linearGradient id="whyByltPaidGradient" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#22d3ee" />
                        <stop offset="100%" stopColor="#06b6d4" />
                    </linearGradient>
                </defs>
                <Pie
                    data={chartData.traffic}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={4}
                    dataKey="value"
                    animationDuration={1200}
                >
                    {chartData.traffic.map((entry, index) => (
                        <Cell
                            key={`cell-${index}`}
                            fill={index === 0 ? 'url(#whyByltOrganicGradient)' : 'url(#whyByltPaidGradient)'}
                            stroke="rgba(0,0,0,0.4)"
                            strokeWidth={3}
                        />
                    ))}
                </Pie>
            </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center">
                <p className="text-[10px] text-gray-500 mb-1">Total Traffic</p>
                <p className="text-2xl font-bold text-white">38.5K</p>
            </div>
        </div>
    </div>
);

const ConversionChart = () => (
    <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={chartData.conversion}>
            <defs>
                <linearGradient id="whyByltRadarGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#a855f7" stopOpacity={0.8} />
                    <stop offset="100%" stopColor="#ec4899" stopOpacity={0.3} />
                </linearGradient>
            </defs>
            <PolarGrid stroke="rgba(255,255,255,0.1)" strokeDasharray="3 3" />
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
            <Tooltip content={<CustomTooltip />} />
            <Radar
                name="Performance"
                dataKey="performance"
                stroke="#a855f7"
                strokeWidth={2}
                fill="url(#whyByltRadarGradient)"
                fillOpacity={0.6}
                animationDuration={1500}
                dot={{ r: 4, fill: '#a855f7', strokeWidth: 2, stroke: '#fff' }}
            />
        </RadarChart>
    </ResponsiveContainer>
);

const EfficiencyChart = () => (
    <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData.efficiency}>
            <defs>
                <linearGradient id="whyByltAutomationGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity={0.6} />
                    <stop offset="100%" stopColor="#10b981" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="whyByltManualGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#64748b" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#64748b" stopOpacity={0.1} />
                </linearGradient>
            </defs>
            <XAxis
                dataKey="month"
                stroke="rgba(255,255,255,0.1)"
                tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }}
                axisLine={false}
                tickLine={false}
            />
            <YAxis
                stroke="rgba(255,255,255,0.1)"
                tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(value) => `${value}%`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
                type="monotone"
                dataKey="manual"
                stackId="1"
                stroke="#64748b"
                fill="url(#whyByltManualGradient)"
                animationDuration={1500}
            />
            <Area
                type="monotone"
                dataKey="automation"
                stackId="1"
                stroke="#10b981"
                fill="url(#whyByltAutomationGradient)"
                animationDuration={1500}
            />
        </AreaChart>
    </ResponsiveContainer>
);

// Main chart renderer component
export const WhyByltChart = ({ serviceSlug }) => {
    const chartType = serviceChartMap[serviceSlug] || 'revenue';
    const config = chartConfigs[chartType];

    const renderChart = () => {
        switch (chartType) {
            case 'revenue': return <RevenueChart />;
            case 'roas': return <RoasChart />;
            case 'traffic': return <TrafficChart />;
            case 'conversion': return <ConversionChart />;
            case 'efficiency': return <EfficiencyChart />;
            default: return <RevenueChart />;
        }
    };

    return (
        <div className="relative z-10">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h3 className="heading-h4 text-white">{config.title}</h3>
                    <p className="text-body-sm text-slate-500">{config.subtitle}</p>
                </div>
                {config.legend && (
                    <div className="flex items-center gap-3">
                        {config.legend.map((item, index) => (
                            <div key={index} className="flex items-center gap-1.5">
                                <div className={`w-2 h-2 ${item.rounded ? 'rounded-full' : 'rounded-sm'} ${item.color}`} />
                                <span className="text-caption">{item.label}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Chart */}
            <div className="h-[220px] w-full">
                {renderChart()}
            </div>

            {/* Details */}
            <div className="mt-4 pt-4 border-t border-slate-800">
                <div className="flex items-start justify-between mb-3">
                    <div>
                        <p className="text-caption mb-1">{config.details.leftStat.label}</p>
                        <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                            {config.details.leftStat.value}
                        </p>
                        {config.details.leftStat.unit && (
                            <p className="text-caption">{config.details.leftStat.unit}</p>
                        )}
                    </div>
                    <div className="text-right">
                        <p className="text-caption mb-1">{config.details.rightStat.label}</p>
                        <p className="text-sm font-bold text-green-400">{config.details.rightStat.value}</p>
                    </div>
                </div>
                <p className="text-body-sm text-slate-400">{config.details.description}</p>
            </div>
        </div>
    );
};

export default WhyByltChart;
