interface TelegramIconProps {
  className?: string;
  size?: number;
}

const TelegramIcon = ({ className = "", size = 24 }: TelegramIconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="12" fill="#229ED9" />
      <path
        d="M5.45 11.86l12.71-5.2c.59-.24 1.12.3.92.9l-2.32 10.88c-.15.68-.66.84-1.33.52l-3.68-2.71-1.77 1.7c-.2.2-.36.36-.74.36l.26-3.78 6.88-6.21c.3-.26-.07-.41-.46-.15l-8.5 5.36-3.67-1.14c-.79-.25-.81-.79.17-1.2z"
        fill="#FFFFFF"
      />
    </svg>
  );
};

export default TelegramIcon;
