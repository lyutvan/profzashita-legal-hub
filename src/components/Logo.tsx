import shieldIcon from "@/assets/shield-icon.png";

const Logo = ({ className = "h-12 w-auto", shrink = false }: { className?: string; shrink?: boolean }) => {
  return (
    <div className={`flex items-center gap-3 transition-all duration-300 ${className}`}>
      <img 
        src={shieldIcon} 
        alt="Профзащита — Коллегия адвокатов"
        className={`transition-all duration-300 ${shrink ? 'h-8' : 'h-10 md:h-12'} w-auto`}
      />
      
      <div className="flex flex-col">
        <span className={`font-playfair font-bold text-accent leading-none transition-all duration-300 ${shrink ? 'text-base md:text-lg' : 'text-lg md:text-xl'}`}>
          Профзащита
        </span>
        <span className={`text-muted-foreground uppercase tracking-wider leading-none mt-1 transition-all duration-300 ${shrink ? 'text-[8px]' : 'text-[10px]'}`}>
          Коллегия адвокатов
        </span>
      </div>
    </div>
  );
};

export default Logo;
