'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';
import { cn } from '@/lib/utils';

interface AnimatedMetricCardProps {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: React.ReactNode;
}


export function AnimatedMetricCard({ title, value, change, trend, icon }: AnimatedMetricCardProps) {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });


  // Extract numeric value for CountUp animation
  const getNumericValue = (val: string): number => {
    const numericMatch = val.match(/[\d.,]+/);
    if (!numericMatch) return 0;
    
    const numStr = numericMatch[0].replace(/,/g, '');
    const num = parseFloat(numStr);
    
    // Handle special cases like "1.5M+", "80%", etc.
    if (val.includes('M')) return num;
    if (val.includes('K')) return num;
    if (val.includes('%')) return num;
    
    return num;
  };

  const formatValue = (val: number, originalValue: string): string => {
    if (originalValue.includes('M')) return `${val.toFixed(1)}M${originalValue.includes('+') ? '+' : ''}`;
    if (originalValue.includes('K')) return `${val.toFixed(0)}K`;
    if (originalValue.includes('%')) return `${val.toFixed(0)}%`;
    if (originalValue.includes('$')) return `$${val.toFixed(2)}`;
    
    return val.toString();
  };

  const numericValue = getNumericValue(value);



  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
      className={cn(
        // Glassmorphism base styles
        "bg-white/5 backdrop-blur border border-yellow-400/30 rounded-lg p-6 relative overflow-hidden group cursor-pointer",
        // Hover animations
        "hover:border-yellow-400/50 hover:bg-white/10 transition-all duration-300",
        // Custom animation styles
        "hover:animate-pulse hover:shadow-lg hover:shadow-yellow-400/20"
      )}
      style={{
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)',
      }}
    >
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 via-transparent to-yellow-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* CSS Keyframe animations for hover effects */}
      <style jsx>{`
        .animated-metric-card:hover {
          animation: hue-rotate-skew 0.6s ease-in-out;
        }
        
        @keyframes hue-rotate-skew {
          0% {
            filter: hue-rotate(0deg);
            transform: skew(0deg, 0deg);
          }
          25% {
            filter: hue-rotate(15deg);
            transform: skew(1deg, 0.5deg);
          }
          50% {
            filter: hue-rotate(30deg);
            transform: skew(-1deg, -0.5deg);
          }
          75% {
            filter: hue-rotate(15deg);
            transform: skew(0.5deg, 1deg);
          }
          100% {
            filter: hue-rotate(0deg);
            transform: skew(0deg, 0deg);
          }
        }
        
        @keyframes flash-drop-shadow {
          0% {
            filter: drop-shadow(0 0 0px rgba(251, 191, 36, 0));
          }
          50% {
            filter: drop-shadow(0 0 15px rgba(251, 191, 36, 0.6));
          }
          100% {
            filter: drop-shadow(0 0 0px rgba(251, 191, 36, 0));
          }
        }
        
        .flash-shadow:hover {
          animation: flash-drop-shadow 0.4s ease-in-out;
        }
      `}</style>
      
      <div className="relative z-10 animated-metric-card flash-shadow">
        <div className="flex items-center justify-between mb-3">
          <div className="text-yellow-400 group-hover:text-yellow-300 transition-colors duration-300">
            {icon}
          </div>
          <div className={cn(
            "text-sm font-medium px-2 py-1 rounded-full transition-all duration-300",
            trend === 'up' 
              ? 'bg-green-500/20 text-green-400 group-hover:bg-green-500/30' 
              : 'bg-red-500/20 text-red-400 group-hover:bg-red-500/30'
          )}>
            {change}
          </div>
        </div>
        
        <div className="space-y-1">
          <h4 className="text-gray-400 text-sm font-medium group-hover:text-gray-300 transition-colors duration-300">
            {title}
          </h4>
          
          <p className="text-2xl font-bold text-white group-hover:text-yellow-100 transition-colors duration-300">
            {inView && numericValue > 0 ? (
              <CountUp
                start={0}
                end={numericValue}
                duration={2.5}
                decimals={value.includes('.') ? 1 : 0}
                formattingFn={(val) => formatValue(val, value)}
                useEasing={true}
                separator=","
              />
            ) : (
              value
            )}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
