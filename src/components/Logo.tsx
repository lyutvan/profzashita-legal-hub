const Logo = ({ 
  className = "", 
  shrink = false,
  variant = "header" 
}: { 
  className?: string; 
  shrink?: boolean;
  variant?: "header" | "footer";
}) => {
  const colorClass = variant === "header" 
    ? (shrink ? "text-[#0A1F44]" : "text-[#C9A227]")
    : "text-white";
  
  const heightClass = shrink 
    ? "h-[30px] md:h-[38px]" 
    : variant === "header" 
      ? "h-[30px] md:h-[38px]" 
      : "h-10";
  
  return (
    <div className="flex items-center gap-2.5">
      {/* Shield icon from logo.svg as inline SVG */}
      <svg 
        className={`transition-all duration-300 ${heightClass} w-auto ${colorClass}`}
        viewBox="0 0 80 96" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path d="M40 6 C35 6, 20 10, 15 12 C12 13, 10 15, 10 18 L10 45 C10 55 13 65 20 73 C27 81 33 86 40 90 C47 86 53 81 60 73 C67 65 70 55 70 45 L70 18 C70 15, 68 13, 65 12 C60 10, 45 6, 40 6 Z" 
              stroke="currentColor" 
              strokeWidth="3" 
              fill="none"
              strokeLinejoin="round"
              strokeLinecap="round"/>
        <rect x="24" y="48" width="8" height="26" fill="currentColor" rx="0.5"/>
        <rect x="36" y="36" width="8" height="38" fill="currentColor" rx="0.5"/>
        <rect x="48" y="48" width="8" height="26" fill="currentColor" rx="0.5"/>
        <rect x="22" y="33" width="36" height="5" fill="currentColor" rx="1"/>
        <rect x="21" y="74" width="38" height="6" fill="currentColor" rx="1"/>
      </svg>
      
      {/* Logo text */}
      <span 
        className={`font-serif text-lg md:text-xl font-semibold tracking-wide transition-all duration-300 ${colorClass} ${className}`}
      >
        Профзащита
      </span>
    </div>
  );
};

export default Logo;
