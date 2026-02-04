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
        d="M17.57 7.14l-1.79 8.44c-.13.6-.49.75-.99.47l-2.74-2.02-1.32 1.27c-.15.15-.28.28-.57.28l.2-2.82 5.13-4.63c.22-.2-.05-.31-.34-.11L9.1 11.6l-2.74-.86c-.6-.19-.61-.6.13-.89l10.7-4.12c.5-.18.94.11.78.83z"
        fill="#FFFFFF"
      />
    </svg>
  );
};

export default TelegramIcon;
