interface LegalFigureProps {
  imageSrc: string;
  imageAlt: string;
  caption?: string;
  position?: "left" | "right" | "full";
  className?: string;
}

/**
 * LegalFigure component for inline images with text wrapping
 * 
 * Features:
 * - Text wrapping on desktop (float left/right)
 * - Full-width block on mobile
 * - Caption support with proper styling
 * - Responsive sizing with proper margins
 * - Lazy loading for performance
 * - Object-fit center for proper cropping on mobile
 */
const LegalFigure = ({ 
  imageSrc, 
  imageAlt, 
  caption, 
  position = "right",
  className = "" 
}: LegalFigureProps) => {
  const positionClasses = {
    left: "md:float-left md:mr-8 md:mb-6",
    right: "md:float-right md:ml-8 md:mb-6",
    full: "w-full"
  };

  const widthClasses = position === "full" 
    ? "w-full" 
    : "w-full md:w-[400px] lg:w-[480px]";

  return (
    <figure 
      className={`
        ${positionClasses[position]} 
        ${widthClasses}
        mb-6 md:mb-0
        ${className}
      `}
      style={{
        marginTop: position !== "full" ? "6px" : undefined,
        marginBottom: position !== "full" ? "24px" : undefined
      }}
    >
      <div className="overflow-hidden rounded-lg shadow-elegant">
        <img
          src={imageSrc}
          alt={imageAlt}
          loading="lazy"
          className="w-full h-auto object-cover object-center"
          style={{
            aspectRatio: position === "full" ? "16/9" : "4/3"
          }}
        />
      </div>
      
      {caption && (
        <figcaption className="mt-3 px-2 text-sm text-muted-foreground italic">
          {caption}
        </figcaption>
      )}
    </figure>
  );
};

export default LegalFigure;