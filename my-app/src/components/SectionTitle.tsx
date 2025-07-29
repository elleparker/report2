"use client";

import { HyperText } from "./hyper-text";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface SectionTitleProps {
  text: string;
  level?: "h1" | "h2" | "h3" | "h4";
  className?: string;
  icon?: ReactNode;
  iconClassName?: string;
}

export default function SectionTitle({ 
  text, 
  level = "h2", 
  className,
  icon,
  iconClassName
}: SectionTitleProps) {
  const baseClasses = {
    h1: "text-3xl sm:text-4xl font-bold gradient-text",
    h2: "text-2xl sm:text-3xl font-bold text-white",
    h3: "text-xl sm:text-2xl font-semibold text-yellow-400",
    h4: "text-lg sm:text-xl font-semibold text-white"
  };

  const Component = level;

  return (
    <Component className={cn(
      baseClasses[level],
      icon ? "flex items-center gap-3" : "",
      className
    )}>
      {icon && (
        <span className={cn("flex-shrink-0", iconClassName)}>
          {icon}
        </span>
      )}
      <HyperText 
        text={text}
        className={cn(
          "font-mono",
          level === "h1" && "gradient-text",
          level === "h2" && "text-white",
          level === "h3" && "text-yellow-400",
          level === "h4" && "text-white"
        )}
      />
    </Component>
  );
}
