import logoNew from "@/assets/logo-new.png";

const Logo = ({ 
  className = "", 
  shrink = false,
  variant = "header" 
}: { 
  className?: string; 
  shrink?: boolean;
  variant?: "header" | "footer";
}) => {
  const heightClass = shrink 
    ? "h-[38px] md:h-[48px]" 
    : variant === "header" 
      ? "h-[38px] md:h-[48px]" 
      : "h-10";
  
  return (
    <div className="flex items-center gap-2 min-w-0">
      <img 
        src={logoNew} 
        alt="Профзащита logo" 
        className={`transition-all duration-300 ${heightClass} w-auto`}
      />
      
      <span className="flex flex-col leading-tight min-w-0">
        <span 
          className={`font-serif text-body-mobile md:text-body font-semibold tracking-wide transition-all duration-300 text-white ${className}`}
        >
          Профзащита
        </span>
        <span className="text-[10px] md:text-[11px] uppercase tracking-[0.18em] text-white whitespace-nowrap">
          Коллегия адвокатов
        </span>
      </span>
    </div>
  );
};

export default Logo;
