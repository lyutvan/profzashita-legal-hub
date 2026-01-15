import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PageHeroProps {
  backgroundImage?: string;
  children: ReactNode;
  className?: string;
  overlay?: string;
}

const defaultOverlay =
  "linear-gradient(180deg, rgba(7,16,31,0.82) 0%, rgba(7,16,31,0.72) 45%, rgba(7,16,31,0.4) 100%)";

const PageHero = ({
  backgroundImage,
  children,
  className,
  overlay = defaultOverlay,
}: PageHeroProps) => {
  const backgroundStyles = backgroundImage
    ? {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }
    : undefined;

  return (
    <section
      className={cn(
        "relative section overflow-hidden",
        !backgroundImage && "bg-gradient-to-br from-primary to-primary/90",
        className
      )}
      style={backgroundStyles}
    >
      {backgroundImage && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: overlay }}
          aria-hidden="true"
        />
      )}
      <div className="container relative z-10 text-white">
        {children}
      </div>
    </section>
  );
};

export default PageHero;
