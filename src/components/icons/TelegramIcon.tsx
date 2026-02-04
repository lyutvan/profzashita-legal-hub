interface TelegramIconProps {
  className?: string;
  size?: number;
}

const TelegramIcon = ({ className = "", size = 24 }: TelegramIconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 240 240"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      focusable="false"
      shapeRendering="geometricPrecision"
      style={{ display: "block" }}
      preserveAspectRatio="xMidYMid meet"
    >
      <path
        fill="#fff"
        d="M220.2 36.7 191 210.5c-2.2 12.8-8.1 16-16.4 10l-45.4-33.5-21.9 21.1c-2.4 2.4-4.4 4.4-9 4.4l3.2-45.7L185 85.4c3.6-3.2-.8-5-5.6-1.8l-103 64.8-44.3-13.8c-9.6-3-9.8-9.6 2-14.2l173-66.7c8-3 15 1.8 13.1 17z"
      />
    </svg>
  );
};

export default TelegramIcon;
