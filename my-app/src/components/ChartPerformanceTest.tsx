'use client';

import { motion } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { 
  generateLargeDataset, 
  useChartPerformance, 
  PerformanceMetrics 
} from '../utils/chartPerformance';

// Custom animated bar component for testing
interface TestAnimatedBarProps {
  fill: string;
  x: number;
  y: number;
  width: number;
  height: number;
  payload?: any;
  index?: number;
  datasetSize?: number;
}

const TestAnimatedBar = ({ fill, x, y, width, height, payload, index = 0, datasetSize = 10 }: TestAnimatedBarProps) => {
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
    />
  );
};

interface ChartPerformanceTestProps {
  onPerformanceResult?: (metrics: PerformanceMetrics, datasetSize: number) => void;
}

export function ChartPerformanceTest({ onPerformanceResult }: ChartPerformanceTestProps) {
  const [datasetSize, setDatasetSize] = useState<number>(10);
  const [testData, setTestData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [performanceResults, setPerformanceResults] = useState<PerformanceMetrics | null>(null);
  
  const { startMeasurement, endMeasurement, logPerformance } = useChartPerformance(datasetSize);
  
  const generateTestData = useCallback(() => {
    setIsLoading(true);
    startMeasurement();
    
    // Simulate data generation delay for large datasets
    setTimeout(() => {
      const data = generateLargeDataset(datasetSize);
      setTestData(data);
      
      // Measure performance after render
      setTimeout(() => {
        const metrics = endMeasurement();
        setPerformanceResults(metrics);
        const result = logPerformance(metrics);
        
        if (onPerformanceResult) {
          onPerformanceResult(metrics, datasetSize);
        }
        
        setIsLoading(false);
      }, 100);
    }, 50);
  }, [datasetSize, startMeasurement, endMeasurement, logPerformance, onPerformanceResult]);
  
  useEffect(() => {
    generateTestData();
  }, [generateTestData]);
  
  const datasetSizeOptions = [10, 25, 50, 100, 200, 500];
  
  return (
    <div className="space-y-6">
      {/* Control Panel */}
      <motion.div 
        className="glass p-4 rounded-lg"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h3 className="text-lg font-semibold mb-4 gradient-text">Chart Performance Testing</h3>
        
        <div className="flex flex-wrap gap-4 items-center">
          <label className="text-sm font-medium text-gray-300">
            Dataset Size:
          </label>
          
          <div className="flex gap-2">
            {datasetSizeOptions.map((size) => (
              <button
                key={size}
                onClick={() => setDatasetSize(size)}
                className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                  datasetSize === size
                    ? 'bg-yellow-400 text-black'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
          
          <button
            onClick={generateTestData}
            disabled={isLoading}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm font-medium transition-colors disabled:opacity-50"
          >
            {isLoading ? 'Testing...' : 'Run Test'}
          </button>
        </div>
        
        {/* Performance Results */}
        {performanceResults && (
          <div className="mt-4 p-3 bg-gray-800 rounded">
            <h4 className="text-sm font-semibold mb-2 text-yellow-400">Performance Results:</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
              <div>
                <span className="text-gray-400">Render Time:</span>
                <div className={`font-mono ${performanceResults.renderTime > 1000 ? 'text-red-400' : 'text-green-400'}`}>
                  {performanceResults.renderTime.toFixed(2)}ms
                </div>
              </div>
              <div>
                <span className="text-gray-400">Memory Usage:</span>
                <div className={`font-mono ${performanceResults.memoryUsage > 50 ? 'text-red-400' : 'text-green-400'}`}>
                  {performanceResults.memoryUsage.toFixed(2)}MB
                </div>
              </div>
              <div>
                <span className="text-gray-400">Animation:</span>
                <div className="font-mono text-blue-400">
                  {performanceResults.animationDuration}ms
                </div>
              </div>
              <div>
                <span className="text-gray-400">Dataset:</span>
                <div className="font-mono text-purple-400">
                  {datasetSize} items
                </div>
              </div>
            </div>
          </div>
        )}
      </motion.div>
      
      {/* Test Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="chart-container relative z-10"
      >
        <h3 className="text-xl font-bold mb-4 gradient-text relative z-20">
          Performance Test Chart ({datasetSize} items)
        </h3>
        
        {isLoading ? (
          <div className="flex items-center justify-center h-96">
            <div className="text-yellow-400 animate-pulse">
              Testing performance with {datasetSize} data points...
            </div>
          </div>
        ) : (
          <div className="relative z-20">
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={testData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
                <XAxis 
                  dataKey="category" 
                  stroke="#9ca3af"
                  fontSize={10}
                  tick={{ fontSize: 9 }}
                  interval={datasetSize > 50 ? 'preserveStartEnd' : 0}
                  angle={datasetSize > 25 ? -45 : 0}
                  textAnchor={datasetSize > 25 ? "end" : "middle"}
                  height={datasetSize > 25 ? 60 : 30}
                />
                <YAxis 
                  stroke="#9ca3af"
                  fontSize={10}
                  tick={{ fontSize: 9 }}
                  width={40}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    border: '1px solid rgba(251, 191, 36, 0.2)',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                />
                <Legend 
                  wrapperStyle={{ fontSize: '10px', paddingTop: '10px' }}
                  iconSize={6}
                />
                <Bar 
                  dataKey="percentage" 
                  fill="#fbbf24" 
                  name="Percentage" 
                  radius={[2, 2, 0, 0]}
                  shape={(props: any) => (
                    <TestAnimatedBar 
                      {...props} 
                      datasetSize={datasetSize}
                      index={props.payload?.id || 0}
                    />
                  )}
                />
                <Bar 
                  dataKey="recycling_rate" 
                  fill="#22c55e" 
                  name="Recycling Rate" 
                  radius={[2, 2, 0, 0]}
                  shape={(props: any) => (
                    <TestAnimatedBar 
                      {...props} 
                      datasetSize={datasetSize}
                      index={props.payload?.id || 0}
                    />
                  )}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </motion.div>
      
      {/* Performance Recommendations */}
      {performanceResults && (
        <motion.div 
          className="glass p-4 rounded-lg"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h4 className="text-md font-semibold mb-3 text-yellow-400">Performance Analysis</h4>
          
          <div className="space-y-2 text-sm">
            {performanceResults.renderTime <= 1000 && performanceResults.memoryUsage <= 50 ? (
              <div className="flex items-center gap-2 text-green-400">
                <span>✅</span>
                <span>Performance is optimal for this dataset size</span>
              </div>
            ) : (
              <div className="space-y-1">
                {performanceResults.renderTime > 1000 && (
                  <div className="flex items-center gap-2 text-red-400">
                    <span>⚠️</span>
                    <span>Render time is high - consider optimizations</span>
                  </div>
                )}
                {performanceResults.memoryUsage > 50 && (
                  <div className="flex items-center gap-2 text-red-400">
                    <span>⚠️</span>
                    <span>Memory usage is high - consider data pagination</span>
                  </div>
                )}
              </div>
            )}
            
            <div className="mt-3 p-2 bg-gray-800 rounded text-xs">
              <div className="font-semibold text-yellow-400 mb-1">Current Optimizations:</div>
              <ul className="space-y-1 text-gray-300">
                {datasetSize <= 10 && <li>• Full animations with 0.1s stagger delay</li>}
                {datasetSize <= 50 && datasetSize > 10 && <li>• Reduced animation duration (0.6s) with 0.05s stagger</li>}
                {datasetSize <= 100 && datasetSize > 50 && <li>• Fast animations (0.4s) with minimal stagger</li>}
                {datasetSize > 100 && <li>• Static rendering with hover effects only</li>}
              </ul>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
