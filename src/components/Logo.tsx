const Logo = ({ className = "h-12 w-auto" }: { className?: string }) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg
        viewBox="0 0 48 56"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-auto"
      >
        {/* Shield with column top */}
        <path
          d="M24 2L4 10V24C4 36 10 46 24 54C38 46 44 36 44 24V10L24 2Z"
          fill="url(#goldGradient)"
          stroke="url(#goldGradient)"
          strokeWidth="1.5"
        />
        
        {/* Column capital detail */}
        <rect x="10" y="8" width="8" height="3" fill="#FFFFFF" opacity="0.9" />
        <rect x="9" y="11" width="10" height="2" fill="#FFFFFF" opacity="0.9" />
        
        {/* Shield inner highlight */}
        <path
          d="M24 6L8 12V24C8 34 13 42 24 48C35 42 40 34 40 24V12L24 6Z"
          fill="url(#shieldInner)"
        />
        
        <defs>
          <linearGradient id="goldGradient" x1="24" y1="2" x2="24" y2="54" gradientUnits="userSpaceOnUse">
            <stop stopColor="#E6C35C" />
            <stop offset="1" stopColor="#C9A227" />
          </linearGradient>
          <linearGradient id="shieldInner" x1="24" y1="6" x2="24" y2="48" gradientUnits="userSpaceOnUse">
            <stop stopColor="#C9A227" stopOpacity="0.3" />
            <stop offset="1" stopColor="#C9A227" stopOpacity="0.1" />
          </linearGradient>
        </defs>
      </svg>
      
      <div className="flex flex-col">
        <span className="font-playfair text-xl font-bold text-accent leading-none">
          Профзащита
        </span>
        <span className="text-[10px] text-muted-foreground uppercase tracking-wider leading-none mt-1">
          Коллегия адвокатов
        </span>
      </div>
    </div>
  );
};

export default Logo;
