interface MaxIconProps {
  className?: string;
  size?: number;
}

const MaxIcon = ({ className = "", size = 24 }: MaxIconProps) => {
  return (
    <img
      src="/max-logo.png"
      alt=""
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
    />
  );
};

export default MaxIcon;
