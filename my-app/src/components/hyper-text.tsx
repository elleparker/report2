"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface HyperTextProps {
  text: string;
  duration?: number;
  className?: string;
}

const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const getRandomInt = (max: number) => Math.floor(Math.random() * max);

// Bell curve (easeInOutSine) for framer-motion transitions
const bellCurveTransition = {
  duration: 0.6,
  ease: "easeInOut" as const,
};

export function HyperText({
  text,
  duration = 400,
  className,
}: HyperTextProps) {
  const [displayText, setDisplayText] = useState(text.split(""));
  const [trigger, setTrigger] = useState(false);
  const interations = useRef(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Only shuffle on hover, not on load. No more animateOnLoad stupidity.
  const triggerAnimation = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    interations.current = 0;
    setTrigger(true);

    intervalRef.current = setInterval(() => {
      if (interations.current < text.length) {
        setDisplayText((t) =>
          t.map((l, i) =>
            l === " "
              ? l
              : i <= interations.current
                ? text[i]
                : alphabets[getRandomInt(26)]
          )
        );
        interations.current = interations.current + 0.1;
      } else {
        setTrigger(false);
        if (intervalRef.current) clearInterval(intervalRef.current);
      }
    }, duration / (text.length * 10));
  };

  // Clean up interval on unmount, because memory leaks are for amateurs.
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // Only fire on hover of the actual text, not the whole row.
  return (
    <div className="flex scale-100 cursor-default overflow-hidden py-2">
      <AnimatePresence mode="wait">
        {displayText.map((letter, i) => (
          <motion.span
            key={i}
            className={cn(
              "font-mono select-none",
              letter === " " ? "w-3" : "",
              className
            )}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={bellCurveTransition}
            onMouseEnter={triggerAnimation}
            // Only the actual letter triggers the animation, not the container.
            style={{ display: "inline-block" }}
          >
            {letter.toUpperCase()}
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  );
}
