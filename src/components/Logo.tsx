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
        <path d="M40 8 C40 8, 15 15, 15 15 L15 42 C15 58 22 72 40 84 C58 72 65 58 65 42 L65 15 C65 15, 40 8, 40 8 Z" 
              stroke="currentColor" 
              strokeWidth="3.5" 
              fill="none"
              strokeLinejoin="round"
              strokeLinecap="round"/>
        <rect x="26" y="46" width="6" height="24" fill="currentColor" rx="0.5"/>
        <rect x="37" y="36" width="6" height="34" fill="currentColor" rx="0.5"/>
        <rect x="48" y="46" width="6" height="24" fill="currentColor" rx="0.5"/>
        <rect x="24" y="34" width="32" height="4" fill="currentColor" rx="1"/>
        <rect x="23" y="70" width="34" height="5" fill="currentColor" rx="1"/>
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
