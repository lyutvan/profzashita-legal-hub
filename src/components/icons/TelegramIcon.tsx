interface TelegramIconProps {
  className?: string;
  size?: number;
}

const TelegramIcon = ({ className = "", size = 24 }: TelegramIconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <circle cx="24" cy="24" r="24" fill="#229ED9" />
      <path
        d="M36.9 14.7L13.1 23.8c-1.2.4-1.2 2.1.1 2.5l6.3 2.1 2.4 7.4c.4 1.2 2 1.6 2.8.5l3.6-4.7 6.6 4.9c1 .7 2.4.1 2.7-1.2l3.7-20.2c.3-1.4-1.1-2.5-2.6-1.9z"
        fill="#FFFFFF"
      />
      <path
        d="M22.8 29.2l-1.1 7.8c.6 0 .9-.3 1.2-.6l2.9-2.8 6-4.4c.7-.5.1-1-.6-.6l-7.5 4.7-3.2-1c-.7-.2-.7-1 .1-1.3l18-6.9"
        fill="#BBD9F2"
      />
    </svg>
  );
};

export default TelegramIcon;
