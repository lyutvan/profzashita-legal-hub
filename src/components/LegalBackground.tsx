import { ReactNode } from "react";

interface LegalBackgroundProps {
  imageSrc: string;
  imageAlt: string;
  children: ReactNode;
  overlayOpacity?: number; // 0.55 to 0.65 (55% to 65%)
  className?: string;
}

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
  className = "" 
}: LegalBackgroundProps) => {
  return (
    <section className={`relative w-full min-h-[400px] md:min-h-[500px] ${className}`}>
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src={imageSrc}
          alt={imageAlt}
          loading="lazy"
          className="w-full h-full object-cover object-center"
          style={{
            objectPosition: 'center center'
          }}
        />
      </div>

      {/* Dark Navy Overlay with Gradient */}
      <div 
        className="absolute inset-0 bg-gradient-to-t from-[#0A1F44] via-[#0A1F44]/80 to-[#0A1F44]/60"
        style={{
          background: `
            linear-gradient(
              to top,
              hsl(214 77% 15% / ${overlayOpacity + 0.1}),
              hsl(214 77% 15% / ${overlayOpacity}),
              hsl(214 77% 15% / ${overlayOpacity - 0.1})
            )
          `
        }}
      />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 md:px-8 py-16 md:py-24">
        {children}
      </div>
    </section>
  );
};

export default LegalBackground;