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
    ? "h-[30px] md:h-[38px]" 
    : variant === "header" 
      ? "h-[30px] md:h-[38px]" 
      : "h-10";
  
  return (
    <div className="flex items-center gap-2.5">
      <img 
        src={logoSvg} 
        alt="Профзащита logo" 
        className={`transition-all duration-300 ${heightClass} w-auto`}
      />
      
      <span 
        className={`font-serif text-lg md:text-xl font-semibold tracking-wide transition-all duration-300 ${
          variant === "header" 
            ? (shrink ? "text-[#0A1F44]" : "text-[#C9A227]")
            : "text-white"
        } ${className}`}
      >
        Профзащита
      </span>
    </div>
  );
};

export default Logo;
