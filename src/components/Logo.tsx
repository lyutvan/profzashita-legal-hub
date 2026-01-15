import logoSvg from "@/assets/logo.svg";

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
    <div className="flex items-center gap-2.5">
      <img 
        src={logoSvg} 
        alt="Профзащита logo" 
        className={`transition-all duration-300 ${heightClass} w-auto`}
      />
      
      <span 
        className={`font-serif text-body-mobile md:text-body font-semibold tracking-wide transition-all duration-300 text-white ${className}`}
      >
        Профзащита
      </span>
    </div>
  );
};

export default Logo;
