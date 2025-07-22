'use client';

import { motion } from 'framer-motion';

interface BeleLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  animated?: boolean;
  className?: string;
}

export default function BeleLogo({ size = 'md', animated = true, className = '' }: BeleLogoProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  };

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-4xl'
  };

  const logoVariants = {
    initial: { scale: 0, rotate: -180 },
    animate: { 
      scale: 1, 
      rotate: 0,
      transition: {
        type: "spring" as const,
        stiffness: 260,
        damping: 20,
        duration: 0.8
      }
    },
    hover: {
      scale: 1.05,
      rotate: 5,
      transition: { duration: 0.2 }
    }
  };

  const textVariants = {
    initial: { opacity: 0, x: -20 },
    animate: { 
      opacity: 1, 
      x: 0,
      transition: { delay: 0.3, duration: 0.5 }
    }
  };

  const pulseVariants = {
    animate: {
      scale: [1, 1.1, 1],
      opacity: [0.5, 0.8, 0.5],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut" as const
      }
    }
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <motion.div
        variants={animated ? logoVariants : {}}
        initial={animated ? "initial" : "animate"}
        animate="animate"
        whileHover={animated ? "hover" : {}}
        className={`relative ${sizeClasses[size]} flex-shrink-0`}
      >
        {/* Pulsing background effect */}
        {animated && (
          <motion.div
            variants={pulseVariants}
            animate="animate"
            className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 blur-md opacity-30"
          />
        )}
        
        {/* Main logo container */}
        <div className="relative w-full h-full">
          {/* Outer ring */}
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Gradient definitions */}
            <defs>
              <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fbbf24" />
                <stop offset="100%" stopColor="#f59e0b" />
              </linearGradient>
              <linearGradient id="logoGradientAlt" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#d97706" />
              </linearGradient>
            </defs>
            
            {/* Outer circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="url(#logoGradient)"
              strokeWidth="2"
              fill="none"
              className="opacity-60"
            />
            
            {/* Inner geometric pattern */}
            <g transform="translate(50,50)">
              {/* Central diamond */}
              <polygon
                points="-15,0 0,-15 15,0 0,15"
                fill="url(#logoGradient)"
                className="opacity-90"
              />
              
              {/* Side triangles */}
              <polygon
                points="-25,-8 -15,0 -25,8"
                fill="url(#logoGradientAlt)"
                className="opacity-70"
              />
              <polygon
                points="25,-8 15,0 25,8"
                fill="url(#logoGradientAlt)"
                className="opacity-70"
              />
              
              {/* Top and bottom accents */}
              <circle cx="0" cy="-25" r="4" fill="url(#logoGradient)" className="opacity-80" />
              <circle cx="0" cy="25" r="4" fill="url(#logoGradient)" className="opacity-80" />
              
              {/* Neural network dots */}
              <circle cx="-30" cy="0" r="2" fill="#fbbf24" className="opacity-60" />
              <circle cx="30" cy="0" r="2" fill="#fbbf24" className="opacity-60" />
              <circle cx="0" cy="-35" r="2" fill="#fbbf24" className="opacity-60" />
              <circle cx="0" cy="35" r="2" fill="#fbbf24" className="opacity-60" />
              
              {/* Connecting lines */}
              <line x1="-15" y1="0" x2="-30" y2="0" stroke="#fbbf24" strokeWidth="1" className="opacity-40" />
              <line x1="15" y1="0" x2="30" y2="0" stroke="#fbbf24" strokeWidth="1" className="opacity-40" />
              <line x1="0" y1="-15" x2="0" y2="-35" stroke="#fbbf24" strokeWidth="1" className="opacity-40" />
              <line x1="0" y1="15" x2="0" y2="35" stroke="#fbbf24" strokeWidth="1" className="opacity-40" />
            </g>
          </svg>
        </div>
      </motion.div>

      {/* Brand text */}
      <motion.div
        variants={animated ? textVariants : {}}
        initial={animated ? "initial" : "animate"}
        animate="animate"
        className="flex flex-col"
      >
        <div className={`font-bold gradient-text ${textSizeClasses[size]}`}>
          Bele<span className="text-white">.ai</span>
        </div>
        {size === 'lg' || size === 'xl' ? (
          <div className="text-xs text-gray-400 font-medium">Market Intelligence</div>
        ) : null}
      </motion.div>
    </div>
  );
} 