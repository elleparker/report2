interface SectionSpacerProps {
  className?: string;
}

export default function SectionSpacer({ className = "" }: SectionSpacerProps) {
  return (
    <div 
      className={`h-px bg-white/8 my-20 sm:my-28 lg:my-36 ${className}`}
      aria-hidden="true"
    />
  );
}
