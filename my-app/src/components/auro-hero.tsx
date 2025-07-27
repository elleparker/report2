"use client";

import { motion } from "framer-motion";
import React, { ReactNode } from "react";

// This is a placeholder for the `cn` utility function.
// In a real project, you would import it from a utility file.
// For this fix, we'll define a simple version that concatenates class names.
type ClassValue = string | undefined | null | boolean;

function cn(...inputs: ClassValue[]): string {
  return inputs.filter(Boolean).join(" ");
}

// Component Code for AuroraBackground
interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode;
  showRadialGradient?: boolean;
}

export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
  ...props
}: AuroraBackgroundProps) => {
  return (
    <main>
      <div
        className={cn(
          "relative flex flex-col  h-[100vh] items-center justify-center bg-zinc-50 dark:bg-zinc-900  text-slate-950 transition-bg",
          className
        )}
        {...props}
      >
        <div className="absolute inset-0 overflow-hidden">
          <div
            //   I'm sorry but this is what peak developer performance looks like // trigger warning
            className={cn(
              `
            [--white-gradient:repeating-linear-gradient(100deg,var(--white)_0%,var(--white)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--white)_16%)]
            [--dark-gradient:repeating-linear-gradient(100deg,var(--black)_0%,var(--black)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--black)_16%)]
            [--aurora:repeating-linear-gradient(100deg,var(--yellow-500)_10%,var(--yellow-300)_15%,var(--orange-300)_20%,var(--yellow-200)_25%,var(--yellow-400)_30%)]
            [background-image:var(--white-gradient),var(--aurora)]
            dark:[background-image:var(--dark-gradient),var(--aurora)]
            [background-size:300%,_200%]
            [background-position:50%_50%,50%_50%]
            filter blur-[15px] invert dark:invert-0 brightness-75 contrast-125
            after:content-[""] after:absolute after:inset-0 after:[background-image:var(--white-gradient),var(--aurora)] 
            after:dark:[background-image:var(--dark-gradient),var(--aurora)]
            after:[background-size:200%,_100%] 
            after:animate-aurora-slow after:[background-attachment:fixed] after:mix-blend-difference
            animate-pulse
            pointer-events-none
            absolute -inset-[10px] opacity-50 will-change-transform`,

              showRadialGradient &&
                `[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,var(--transparent)_70%)]`
            )}
          ></div>
        </div>
        {children}
      </div>
      <style jsx global>{`
        @keyframes aurora {
          from {
            background-position: 50% 50%, 50% 50%;
          }
          to {
            background-position: 350% 50%, 350% 50%;
          }
        }
        @keyframes aurora-slow {
          0% {
            background-position: 50% 50%, 50% 50%;
          }
          25% {
            background-position: 150% 60%, 150% 60%;
          }
          50% {
            background-position: 250% 40%, 250% 40%;
          }
          75% {
            background-position: 180% 70%, 180% 70%;
          }
          100% {
            background-position: 350% 50%, 350% 50%;
          }
        }
        @keyframes glitch {
          0%, 98% { transform: translate(0); filter: hue-rotate(0deg); }
          1% { transform: translate(-3px, 2px); filter: hue-rotate(90deg) contrast(150%); }
          2% { transform: translate(2px, -2px); filter: hue-rotate(180deg) brightness(150%); }
          3% { transform: translate(-1px, 1px); filter: hue-rotate(270deg); }
          4% { transform: translate(0); filter: hue-rotate(0deg); }
        }
        @keyframes letterGlitch {
          0%, 94% { 
            transform: translate(0) scale(1) rotate(0deg);
            opacity: 1;
            filter: hue-rotate(0deg);
          }
          95% {
            transform: translate(-3px, 2px) scale(1.1) rotate(-2deg);
            opacity: 0.3;
            filter: hue-rotate(90deg) brightness(200%);
          }
          96% {
            transform: translate(2px, -1px) scale(0.9) rotate(1deg);
            opacity: 0.7;
            filter: hue-rotate(180deg) contrast(200%);
          }
          97% {
            transform: translate(-1px, 1px) scale(1.05) rotate(-1deg);
            opacity: 0.2;
            filter: hue-rotate(270deg);
          }
          98% {
            transform: translate(1px, -2px) scale(0.95) rotate(2deg);
            opacity: 0.9;
            filter: hue-rotate(45deg) saturate(200%);
          }
          99%, 100% {
            transform: translate(0) scale(1) rotate(0deg);
            opacity: 1;
            filter: hue-rotate(0deg);
          }
        }
        @keyframes flash {
          0%, 95% { opacity: 1; }
          96% { opacity: 0.1; }
          97% { opacity: 1; }
          98% { opacity: 0.3; }
          99% { opacity: 1; }
        }
        .glitch-text {
          animation: glitch 12s infinite;
        }
        @keyframes glowMove {
          0% {
            box-shadow: 0 0 15px rgba(255, 255, 0, 0.3), inset 0 0 15px rgba(255, 255, 0, 0.1);
            border-image: linear-gradient(45deg, transparent, rgba(255, 255, 0, 0.8), transparent) 1;
          }
          25% {
            box-shadow: 15px 0 15px rgba(255, 255, 0, 0.3), inset 15px 0 15px rgba(255, 255, 0, 0.1);
            border-image: linear-gradient(135deg, transparent, rgba(255, 255, 0, 0.8), transparent) 1;
          }
          50% {
            box-shadow: 0 15px 15px rgba(255, 255, 0, 0.3), inset 0 15px 15px rgba(255, 255, 0, 0.1);
            border-image: linear-gradient(225deg, transparent, rgba(255, 255, 0, 0.8), transparent) 1;
          }
          75% {
            box-shadow: -15px 0 15px rgba(255, 255, 0, 0.3), inset -15px 0 15px rgba(255, 255, 0, 0.1);
            border-image: linear-gradient(315deg, transparent, rgba(255, 255, 0, 0.8), transparent) 1;
          }
          100% {
            box-shadow: 0 0 15px rgba(255, 255, 0, 0.3), inset 0 0 15px rgba(255, 255, 0, 0.1);
            border-image: linear-gradient(45deg, transparent, rgba(255, 255, 0, 0.8), transparent) 1;
          }
        }
        @keyframes hoverGlitch {
          0% { transform: translate(0) scale(1) rotate(0deg); opacity: 1; filter: hue-rotate(0deg); }
          10% { transform: translate(-5px, 3px) scale(1.1) rotate(-3deg); opacity: 0.2; filter: hue-rotate(90deg) brightness(300%); }
          20% { transform: translate(3px, -2px) scale(0.8) rotate(2deg); opacity: 0.8; filter: hue-rotate(180deg) contrast(300%); }
          30% { transform: translate(-2px, 4px) scale(1.2) rotate(-1deg); opacity: 0.1; filter: hue-rotate(270deg) saturate(300%); }
          40% { transform: translate(4px, -3px) scale(0.9) rotate(4deg); opacity: 0.9; filter: hue-rotate(45deg) brightness(200%); }
          50% { transform: translate(-3px, 2px) scale(1.05) rotate(-2deg); opacity: 0.3; filter: hue-rotate(135deg) contrast(200%); }
          60% { transform: translate(2px, -4px) scale(0.95) rotate(3deg); opacity: 0.7; filter: hue-rotate(225deg) saturate(250%); }
          70% { transform: translate(-4px, 1px) scale(1.1) rotate(-4deg); opacity: 0.4; filter: hue-rotate(315deg) brightness(250%); }
          80% { transform: translate(1px, -1px) scale(1.0) rotate(1deg); opacity: 0.6; filter: hue-rotate(60deg) contrast(180%); }
          90% { transform: translate(-1px, 3px) scale(1.05) rotate(-1deg); opacity: 0.8; filter: hue-rotate(120deg); }
          100% { transform: translate(0) scale(1) rotate(0deg); opacity: 1; filter: hue-rotate(0deg); }
        }
        .glow-animation {
          animation: glowMove 4s ease-in-out infinite;
          border: 2px solid transparent;
          border-radius: inherit;
        }
        .letter-glitch .letter:nth-child(1) { animation: letterGlitch 15s infinite 0s; }
        .letter-glitch .letter:nth-child(2) { animation: letterGlitch 18s infinite 2s; }
        .letter-glitch .letter:nth-child(3) { animation: letterGlitch 22s infinite 4s; }
        .letter-glitch .letter:nth-child(4) { animation: letterGlitch 16s infinite 6s; }
        .letter-glitch .letter:nth-child(5) { animation: letterGlitch 20s infinite 8s; }
        .letter-glitch .letter:nth-child(6) { animation: letterGlitch 14s infinite 10s; }
        .letter-glitch .letter:nth-child(7) { animation: letterGlitch 19s infinite 12s; }
        .letter-glitch .letter:nth-child(8) { animation: letterGlitch 17s infinite 14s; }
        .letter-glitch .letter:nth-child(9) { animation: letterGlitch 21s infinite 16s; }
        .hover-glitch:hover .letter {
          animation: hoverGlitch 0.3s ease-in-out infinite;
        }
        .hover-glitch:hover .letter:nth-child(1) { animation-delay: 0s; }
        .hover-glitch:hover .letter:nth-child(2) { animation-delay: 0.05s; }
        .hover-glitch:hover .letter:nth-child(3) { animation-delay: 0.1s; }
        .hover-glitch:hover .letter:nth-child(4) { animation-delay: 0.15s; }
        .hover-glitch:hover .letter:nth-child(5) { animation-delay: 0.2s; }
        .hover-glitch:hover .letter:nth-child(6) { animation-delay: 0.25s; }
        .hover-glitch:hover .letter:nth-child(7) { animation-delay: 0.3s; }
        .hover-glitch:hover .letter:nth-child(8) { animation-delay: 0.35s; }
        .hover-glitch:hover .letter:nth-child(9) { animation-delay: 0.4s; }
        .flash-glitch {
          animation: flash 6s infinite, glitch 12s infinite;
        }
        .animate-aurora-slow {
          animation: aurora-slow 20s ease-in-out infinite;
        }
        :root {
          --white: #ffffff;
          --black: #000000;
          --transparent: transparent;
          --yellow-500: #eab308;
          --yellow-300: #fde047;
          --orange-300: #fdba74;
          --yellow-200: #fef08a;
          --yellow-400: #facc15;
        }
      `}</style>
    </main>
  );
};

// Demo Component
export default function AuroraBackgroundDemo() {
  return (
    <div className="flex text-center items-center justify-center">
      <AuroraBackground>
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
          <div className="font-black text-xl md:text-5xl text-center mt-8 tracking-wider bg-black/20 backdrop-blur-sm rounded-lg py-4 px-6 border border-yellow-500/30 relative overflow-hidden glow-border cursor-pointer">
            <div className="absolute inset-0 rounded-lg glow-animation"></div>
            <span className="letter-glitch bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-200 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(255,255,0,0.8)] relative z-10 hover-glitch">
              <span className="letter" data-letter="B">B</span>
              <span className="letter" data-letter="i">i</span>
              <span className="letter" data-letter="n">n</span>
              <span className="letter" data-letter="D">D</span>
              <span className="letter" data-letter="o">o</span>
              <span className="letter" data-letter="c">c</span>
              <span className="letter" data-letter=".">.</span>
              <span className="letter" data-letter="A">A</span>
              <span className="letter" data-letter="I">I</span>
            </span>
          </div>
        </motion.div>
      </AuroraBackground>
    </div>
  );
}