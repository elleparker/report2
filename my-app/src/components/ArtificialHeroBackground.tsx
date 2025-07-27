import React from 'react';
import { Component as ArtificialHero } from './artificial-hero';

interface ArtificialHeroBackgroundProps {
  className?: string;
}

export const ArtificialHeroBackground: React.FC<ArtificialHeroBackgroundProps> = ({ 
  className = "" 
}) => {
  return (
    <div className={`absolute inset-0 z-0 ${className}`}>
      <ArtificialHero />
    </div>
  );
};

export default ArtificialHeroBackground;
