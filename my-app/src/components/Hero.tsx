'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArtificialHeroBackground } from './ArtificialHeroBackground';

// Stripped down version of AuroraBackgroundDemo - only the title line
const AuroraTitle: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0.0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.3,
        duration: 0.8,
        ease: "easeInOut",
      }}
      className="relative flex flex-col gap-4 items-center justify-center px-4"
    >
      <div className="text-2xl md:text-6xl font-bold text-center bg-gradient-to-r from-white via-yellow-300 via-yellow-500 via-yellow-300 to-white bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(255,255,0,0.7)]">
        <span className="glitch-text">Strategic Investment Report: "Waste Management Solutions for Lebanon"</span>
      </div>
    </motion.div>
  );
};

export const Hero: React.FC = () => {
  return (
    <div className="h-screen flex items-center relative">
      {/* Artificial Hero Background - positioned absolute, z-0 */}
      <ArtificialHeroBackground />
      
      {/* Main content - relative z-10 flex */}
      <div className="relative z-10 flex w-full h-full">
        {/* Left column - Logo */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="max-w-[350px] w-full">
            <Image
              src="/bindoc-logo2.svg"
              alt="BinDoc Logo"
              width={350}
              height={200}
              className="w-full h-auto"
              priority
            />
          </div>
        </div>
        
        {/* Right column - Aurora Title */}
        <div className="flex-1 flex items-center justify-center p-8">
          <AuroraTitle />
        </div>
      </div>
    </div>
  );
};

export default Hero;
