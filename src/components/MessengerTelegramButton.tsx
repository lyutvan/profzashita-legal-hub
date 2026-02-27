import type { CSSProperties } from "react";
import TelegramIcon from "@/components/icons/TelegramIcon";
import { SITE } from "@/config/site";

const TELEGRAM_URL = SITE.telegramUrl;

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
    <TelegramIcon size={20} className="h-5 w-5" />
    <span>Telegram</span>
  </a>
);

export default MessengerTelegramButton;
