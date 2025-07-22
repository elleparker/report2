'use client';

import { motion } from 'framer-motion';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

// Sample data for charts
const marketGrowthData = [
  { year: '2019', market: 45.2, revenue: 12.3 },
  { year: '2020', market: 52.1, revenue: 18.7 },
  { year: '2021', market: 68.9, revenue: 29.4 },
  { year: '2022', market: 89.2, revenue: 45.8 },
  { year: '2023', market: 112.7, revenue: 67.2 },
  { year: '2024', market: 145.3, revenue: 89.6 },
  { year: '2025', market: 185.7, revenue: 124.8 },
];

const competitorData = [
  { name: 'Bele.ai', market_share: 35, color: '#fbbf24' },
  { name: 'Competitor A', market_share: 28, color: '#6366f1' },
  { name: 'Competitor B', market_share: 18, color: '#8b5cf6' },
  { name: 'Competitor C', market_share: 12, color: '#06b6d4' },
  { name: 'Others', market_share: 7, color: '#64748b' },
];

const demographicsData = [
  { age_group: '18-24', percentage: 15, target: 18 },
  { age_group: '25-34', percentage: 35, target: 32 },
  { age_group: '35-44', percentage: 28, target: 25 },
  { age_group: '45-54', percentage: 15, target: 18 },
  { age_group: '55+', percentage: 7, target: 7 },
];

const revenueProjectionData = [
  { quarter: 'Q1 2024', actual: 22.5, projected: 20.0 },
  { quarter: 'Q2 2024', actual: 28.3, projected: 25.5 },
  { quarter: 'Q3 2024', actual: 31.7, projected: 29.0 },
  { quarter: 'Q4 2024', actual: 38.9, projected: 35.2 },
  { quarter: 'Q1 2025', actual: null, projected: 42.8 },
  { quarter: 'Q2 2025', actual: null, projected: 48.3 },
  { quarter: 'Q3 2025', actual: null, projected: 54.7 },
  { quarter: 'Q4 2025', actual: null, projected: 62.1 },
];

interface TooltipProps {
  active?: boolean;
  payload?: Array<{
    color?: string;
    name?: string;
    value?: number | string;
  }>;
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass p-3 border border-yellow-400/20">
        <p className="text-yellow-400 font-medium">{label}</p>
        {payload.map((entry, index: number) => (
          <p key={index} style={{ color: entry.color }} className="text-sm">
            {entry.name}: {typeof entry.value === 'number' ? entry.value.toFixed(1) : entry.value}
            {entry.name?.includes('$') || entry.name?.includes('Revenue') ? 'M' : entry.name?.includes('%') ? '%' : ''}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export function MarketGrowthChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="chart-container"
    >
      <h3 className="text-xl font-bold mb-4 gradient-text">Market Growth Trajectory</h3>
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart data={marketGrowthData}>
          <defs>
            <linearGradient id="marketGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#fbbf24" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#fbbf24" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
          <XAxis dataKey="year" stroke="#9ca3af" />
          <YAxis stroke="#9ca3af" />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Area
            type="monotone"
            dataKey="market"
            stroke="#fbbf24"
            fillOpacity={1}
            fill="url(#marketGradient)"
            name="Market Size ($B)"
          />
          <Area
            type="monotone"
            dataKey="revenue"
            stroke="#3b82f6"
            fillOpacity={1}
            fill="url(#revenueGradient)"
            name="Our Revenue ($M)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  );
}

export function CompetitorAnalysisChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="chart-container"
    >
      <h3 className="text-xl font-bold mb-4 gradient-text">Competitive Market Share</h3>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={competitorData}
            cx="50%"
            cy="50%"
            outerRadius={120}
            fill="#8884d8"
            dataKey="market_share"
            label={({ name, value }) => `${name}: ${value}%`}
            labelLine={false}
          >
            {competitorData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
    </motion.div>
  );
}

export function DemographicsChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="chart-container"
    >
      <h3 className="text-xl font-bold mb-4 gradient-text">Target Demographics Analysis</h3>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={demographicsData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
          <XAxis dataKey="age_group" stroke="#9ca3af" />
          <YAxis stroke="#9ca3af" />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar dataKey="percentage" fill="#fbbf24" name="Current %" radius={[4, 4, 0, 0]} />
          <Bar dataKey="target" fill="#3b82f6" name="Target %" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  );
}

export function RevenueProjectionChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
      className="chart-container"
    >
      <h3 className="text-xl font-bold mb-4 gradient-text">Revenue Projections</h3>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={revenueProjectionData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
          <XAxis dataKey="quarter" stroke="#9ca3af" />
          <YAxis stroke="#9ca3af" />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Line
            type="monotone"
            dataKey="actual"
            stroke="#fbbf24"
            strokeWidth={3}
            dot={{ fill: '#fbbf24', strokeWidth: 2, r: 6 }}
            name="Actual Revenue ($M)"
          />
          <Line
            type="monotone"
            dataKey="projected"
            stroke="#3b82f6"
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
            name="Projected Revenue ($M)"
          />
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  );
}

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: React.ReactNode;
}

export function MetricCard({ title, value, change, trend, icon }: MetricCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="metric-card"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="text-yellow-400">{icon}</div>
        <div className={`text-sm font-medium px-2 py-1 rounded-full ${
          trend === 'up' 
            ? 'bg-green-500/20 text-green-400' 
            : 'bg-red-500/20 text-red-400'
        }`}>
          {change}
        </div>
      </div>
      <div className="space-y-1">
        <h4 className="text-gray-400 text-sm font-medium">{title}</h4>
        <p className="text-2xl font-bold text-white">{value}</p>
      </div>
    </motion.div>
  );
} 