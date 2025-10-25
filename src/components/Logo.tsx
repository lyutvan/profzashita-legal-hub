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
    ? (shrink ? "text-white" : "text-accent")
    : "text-white";
  
  const heightClass = shrink 
    ? "h-7 md:h-8" 
    : variant === "header" 
      ? "h-8 md:h-10" 
      : "h-7";
  
  return (
    <img 
      src={logo} 
      alt="Профзащита"
      className={`transition-all duration-300 ${heightClass} w-auto ${colorClass} ${className}`}
      aria-label="Профзащита"
    />
  );
};

export default Logo;
