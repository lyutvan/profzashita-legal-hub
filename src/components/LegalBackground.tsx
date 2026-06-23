import { ReactNode, useEffect, useRef, useState } from "react";

interface LegalBackgroundProps {
  imageSrc: string;
  imageAlt: string;
  children: ReactNode;
  overlayOpacity?: number; // 0.55 to 0.65 (55% to 65%)
  className?: string;
  parallax?: boolean;
  priority?: boolean;
}

const shouldDisableParallax = () =>
  window.innerWidth < 768 ||
  window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
  window.matchMedia("(hover: none)").matches ||
  window.matchMedia("(pointer: coarse)").matches;

/**
 * LegalBackground component with dark navy overlay and gradient
 * 
 * Features:
 * - Dark blue overlay (55-65% opacity) for text readability
 * - Bottom-to-top gradient for smooth text integration
 * - Responsive image with srcset support
 * - Lazy loading for performance
 * - AA+ contrast for accessibility
 */
const LegalBackground = ({ 
  imageSrc, 
  imageAlt, 
  children, 
  overlayOpacity = 0.6,
  className = "",
  parallax = false,
  priority = false
}: LegalBackgroundProps) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const [isParallaxEnabled, setIsParallaxEnabled] = useState(false);

  useEffect(() => {
    if (!parallax || typeof window === "undefined") {
      return;
    }

    const section = sectionRef.current;
    const image = imageRef.current;
    if (!section || !image || shouldDisableParallax()) {
      setIsParallaxEnabled(false);
      return;
    }

    setIsParallaxEnabled(true);

    const updateParallax = () => {
      frameRef.current = null;

      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      if (rect.bottom < 0 || rect.top > viewportHeight) {
        return;
      }

      const progress = (rect.top + rect.height / 2 - viewportHeight / 2) / viewportHeight;
      const offset = Math.max(-42, Math.min(42, progress * -52));
      image.style.transform = `translate3d(0, ${offset}px, 0) scale(1.08)`;
    };

    const scheduleUpdate = () => {
      if (frameRef.current !== null) return;
      frameRef.current = window.requestAnimationFrame(updateParallax);
    };

    updateParallax();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate, { passive: true });

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
      image.style.transform = "";
    };
  }, [parallax]);

  return (
    <section ref={sectionRef} className={`relative w-full section legal-background ${parallax ? "legal-background--parallax" : ""} ${className}`}>
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <img
          ref={imageRef}
          src={imageSrc}
          alt={imageAlt}
          loading={priority ? "eager" : "lazy"}
          fetchpriority={priority ? "high" : "auto"}
          className={`w-full h-full object-cover object-center ${isParallaxEnabled ? "legal-background__image--parallax" : ""}`}
          style={{
            objectPosition: 'center center'
          }}
        />
      </div>

      {/* Dark Navy Overlay with Gradient */}
      <div 
        className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-primary/60"
        style={{
          background: `
            linear-gradient(
              to top,
              hsl(var(--primary) / ${overlayOpacity + 0.1}),
              hsl(var(--primary) / ${overlayOpacity}),
              hsl(var(--primary) / ${overlayOpacity - 0.1})
            )
          `
        }}
      />

      {/* Content */}
      <div className="relative z-10 container section__content">
        {children}
      </div>
    </section>
  );
};

export default LegalBackground;
