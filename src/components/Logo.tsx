import logo from "@/assets/logo.svg";

const Logo = ({ 
  className = "h-10 w-auto", 
  shrink = false,
  variant = "header" 
}: { 
  className?: string; 
  shrink?: boolean;
  variant?: "header" | "footer";
}) => {
  const colorClass = variant === "header" 
    ? (shrink ? "text-white" : "text-[#C9A227]")
    : "text-white";
  
  const heightClass = shrink 
    ? "h-10 md:h-12" 
    : variant === "header" 
      ? "h-12 md:h-16" 
      : "h-10";
  
  return (
    <img 
      src={logo} 
      alt="Профзащита — Коллегия адвокатов"
      className={`transition-all duration-300 ${heightClass} w-auto ${colorClass} ${className}`}
      aria-label="Профзащита — Коллегия адвокатов"
    />
  );
};

export default Logo;
