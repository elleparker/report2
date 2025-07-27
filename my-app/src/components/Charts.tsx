'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import {
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

// Custom animated bar component
interface AnimatedBarProps {
  fill: string;
  x: number;
  y: number;
  width: number;
  height: number;
  payload?: any;
  index?: number;
  datasetSize?: number;
}

const AnimatedBar = ({ fill, x, y, width, height, payload, index = 0, datasetSize = 10 }: AnimatedBarProps) => {
  // Performance optimization: reduce animation complexity for large datasets
  const shouldAnimate = datasetSize <= 100;
  const staggerDelay = datasetSize <= 50 ? index * 0.05 : 0;
  const duration = datasetSize <= 10 ? 0.8 : datasetSize <= 50 ? 0.6 : 0.4;
  
  if (!shouldAnimate) {
    // For very large datasets, render static bars with simple hover
    return (
      <motion.rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={fill}
        whileHover={{
          fill: "#fefefe",
          transition: { duration: 0.15, ease: "easeInOut" }
        }}
      />
    );
  }
  
  return (
    <motion.rect
      x={x}
      y={y}
      width={width}
      height={height}
      fill={fill}
      initial={{ height: 0, y: y + height }}
      animate={{ height: height, y: y }}
      transition={{ 
        duration, 
        delay: staggerDelay,
        ease: "easeOut" 
      }}
      whileHover={{
        fill: "#fefefe",
        transition: { duration: 0.2, ease: "easeInOut" }
      }}
      onHoverStart={() => {}}
      onHoverEnd={() => {}}
    />
  );
};

// Waste management data for Lebanon
const wasteVolumeData = [
  { year: '2019', waste_generated: 1.8, properly_managed: 0.4 },
  { year: '2020', waste_generated: 1.9, properly_managed: 0.5 },
  { year: '2021', waste_generated: 2.0, properly_managed: 0.6 },
  { year: '2022', waste_generated: 2.1, properly_managed: 0.7 },
  { year: '2023', waste_generated: 2.2, properly_managed: 0.8 },
  { year: '2024', waste_generated: 2.3, properly_managed: 1.0 },
  { year: '2025', waste_generated: 2.4, properly_managed: 1.5 },
];

const competitorData = [
  { name: 'Live Love Recycle', market_share: 45, color: '#fbbf24' },
  { name: 'Informal Sector', market_share: 35, color: '#6366f1' },
  { name: 'Nadeera', market_share: 8, color: '#8b5cf6' },
  { name: 'OLX/Facebook', market_share: 7, color: '#06b6d4' },
  { name: 'Others', market_share: 5, color: '#64748b' },
];

const wasteCompositionData = [
  { category: 'Organic', percentage: 52, recycling_rate: 15 },
  { category: 'Plastic', percentage: 18, recycling_rate: 25 },
  { category: 'Paper', percentage: 12, recycling_rate: 30 },
  { category: 'Glass', percentage: 8, recycling_rate: 45 },
  { category: 'Metal', percentage: 6, recycling_rate: 65 },
  { category: 'Others', percentage: 4, recycling_rate: 10 },
];

const revenueProjectionData = [
  { year: 'Year 1', commission: 108, subscription: 18, data: 10, total: 136 },
  { year: 'Year 2', commission: 1575, subscription: 180, data: 150, total: 1905 },
  { year: 'Year 3', commission: 4725, subscription: 540, data: 500, total: 5765 },
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

export function WasteVolumeChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="chart-container"
    >
      <h3 className="text-xl font-bold mb-4 gradient-text">Lebanon Waste Generation & Management</h3>
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart data={wasteVolumeData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <defs>
            <linearGradient id="wasteGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="managedGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
          <XAxis 
            dataKey="year" 
            stroke="#9ca3af" 
            fontSize={12}
            tick={{ fontSize: 12 }}
          />
          <YAxis 
            stroke="#9ca3af"
            fontSize={12} 
            tick={{ fontSize: 12 }}
            width={60}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }}
            iconSize={10}
          />
          <Area
            type="monotone"
            dataKey="waste_generated"
            stroke="#ef4444"
            fillOpacity={1}
            fill="url(#wasteGradient)"
            name="Total Waste Generated (M tons)"
          />
          <Area
            type="monotone"
            dataKey="properly_managed"
            stroke="#22c55e"
            fillOpacity={1}
            fill="url(#managedGradient)"
            name="Properly Managed (M tons)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  );
}

export function CompetitorAnalysisChart() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="chart-container"
    >
      <h3 className="text-xl font-bold mb-4 gradient-text">Competitive Market Share</h3>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <Pie
            data={competitorData}
            cx="50%"
            cy="50%"
            outerRadius={isMobile ? 80 : 120}
            fill="#8884d8"
            dataKey="market_share"
            label={isMobile ? false : ({ name, value }) => `${name}: ${value}%`}
            labelLine={false}
            fontSize={12}
          >
            {competitorData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }}
            iconSize={8}
          />
        </PieChart>
      </ResponsiveContainer>
    </motion.div>
  );
}

export function WasteCompositionChart() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="chart-container relative z-10"
    >
      <h3 className="text-xl font-bold mb-4 gradient-text relative z-20">Lebanon Waste Composition & Recycling Rates</h3>
      <div className="relative z-20">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={wasteCompositionData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
            <XAxis 
              dataKey="category" 
              stroke="#9ca3af"
              fontSize={12}
              tick={{ fontSize: 11 }}
              interval={0}
              angle={isMobile ? -45 : 0}
              textAnchor={isMobile ? "end" : "middle"}
              height={isMobile ? 60 : 30}
            />
            <YAxis 
              stroke="#9ca3af"
              fontSize={12}
              tick={{ fontSize: 11 }}
              width={50}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }}
              iconSize={8}
            />
            <Bar 
              dataKey="percentage" 
              fill="#fbbf24" 
              name="Waste Composition %" 
              radius={[4, 4, 0, 0]}
              shape={(props: any) => <AnimatedBar {...props} />}
            />
            <Bar 
              dataKey="recycling_rate" 
              fill="#22c55e" 
              name="Current Recycling Rate %" 
              radius={[4, 4, 0, 0]}
              shape={(props: any) => <AnimatedBar {...props} />}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}

export function RevenueProjectionChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
      className="chart-container relative z-10"
    >
      <h3 className="text-xl font-bold mb-4 gradient-text relative z-20">BinDoc.AI Revenue Projections</h3>
      <div className="relative z-20">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={revenueProjectionData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
            <XAxis 
              dataKey="year" 
              stroke="#9ca3af"
              fontSize={12}
              tick={{ fontSize: 12 }}
            />
            <YAxis 
              stroke="#9ca3af"
              fontSize={12}
              tick={{ fontSize: 11 }}
              width={60}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              wrapperStyle={{ fontSize: '10px', paddingTop: '10px' }}
              iconSize={8}
            />
            <Bar
              dataKey="commission"
              stackId="revenue"
              fill="#fbbf24"
              name="Commission/Fee Revenue ($K)"
              radius={[0, 0, 0, 0]}
              shape={(props: any) => <AnimatedBar {...props} />}
            />
            <Bar
              dataKey="subscription"
              stackId="revenue"
              fill="#3b82f6"
              name="SME Subscriptions ($K)"
              radius={[0, 0, 0, 0]}
              shape={(props: any) => <AnimatedBar {...props} />}
            />
            <Bar
              dataKey="data"
              stackId="revenue"
              fill="#22c55e"
              name="Data/Sponsorship ($K)"
              radius={[4, 4, 0, 0]}
              shape={(props: any) => <AnimatedBar {...props} />}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
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

// Export the new AnimatedMetricCard
export { AnimatedMetricCard } from './AnimatedMetricCard';
