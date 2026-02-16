import type { CSSProperties } from "react";

interface WhatsAppIconProps {
  className?: string;
  size?: number;
}

const WhatsAppIcon = ({ className = "", size = 24 }: WhatsAppIconProps) => {
  const renderStyle = {
    imageRendering: "crisp-edges",
    WebkitImageRendering: "-webkit-optimize-contrast"
  } as CSSProperties;

  return (
    <img
      src="/whatsapp-macos-tight.png"
      alt=""
      aria-hidden="true"
      draggable={false}
      width={size}
      height={size}
      className={className}
      style={renderStyle}
    />
  );
};

export default WhatsAppIcon;
