import type { CSSProperties } from "react";

const TELEGRAM_URL = "https://t.me/profzashita_consult_bot";

const buttonStyle: CSSProperties = {
  right: 18,
  bottom: 18
};

const MessengerTelegramButton = () => (
  <a
    href={TELEGRAM_URL}
    target="_blank"
    rel="noopener"
    aria-label="Написать в Telegram"
    className="fixed z-50 inline-flex items-center gap-2 rounded-[14px] bg-[#229ED9] px-3.5 text-sm font-semibold text-white shadow-[0_12px_24px_rgba(34,158,217,0.32)] transition-transform transition-opacity duration-200 hover:-translate-y-0.5 hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[#229ED9] h-[42px] md:h-[46px]"
    style={buttonStyle}
  >
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="currentColor"
    >
      <path d="M21.9 4.6a1 1 0 0 0-1.1-.2L3.2 11.2a1 1 0 0 0 .1 1.9l4.1 1.4 1.6 5.1a1 1 0 0 0 1.8.3l2.3-3.1 4.3 3.3a1 1 0 0 0 1.6-.6l2.3-13.9a1 1 0 0 0-.4-1zM9.3 17.2l-1-3.1 7.8-6.4-6.8 7.4z" />
    </svg>
    <span>Telegram</span>
  </a>
);

export default MessengerTelegramButton;

