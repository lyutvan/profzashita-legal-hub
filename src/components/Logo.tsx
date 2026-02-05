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
    <div className="logo flex items-center min-w-0">
      <img 
        src={logoNew} 
        alt="Профзащита logo" 
        className={`logo__mark transition-all duration-300 ${heightClass} w-auto`}
      />
      
      <span className="logo__text flex flex-col min-w-0">
        <span 
          className={`logo__title transition-all duration-300 ${className}`}
        >
          Профзащита
        </span>
        <span className="logo__subtitle whitespace-nowrap">
          Коллегия адвокатов
        </span>
      </span>
    </div>
  );
};

export default Logo;
