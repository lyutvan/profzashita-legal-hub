import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";

const STORAGE_KEY = "profzashita_cookie_notice_accepted";

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const isPreview = new URLSearchParams(window.location.search).get("cookie-preview") === "1";
    setIsVisible(isPreview || window.localStorage.getItem(STORAGE_KEY) === null);
  }, []);

  const handleChoice = (value: "accepted" | "declined") => {
    window.localStorage.setItem(STORAGE_KEY, value);
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[55] border-t border-white/15 bg-primary px-4 py-2.5 text-white shadow-[0_-14px_44px_rgba(7,16,31,0.32)]">
      <div className="mx-auto flex max-w-7xl flex-col gap-2.5 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-3xl">
          <Link
            to="/politika-konfidentsialnosti"
            className="inline-flex font-serif text-[15px] font-semibold leading-tight text-white underline-offset-4 hover:underline"
          >
            Политика конфиденциальности
          </Link>
          <p className="text-[12px] leading-[18px] text-white/85 sm:text-[13px]">
            Мы используем cookies для улучшения работы сайта. Подробнее — в{" "}
            <Link to="/politika-konfidentsialnosti" className="text-accent underline underline-offset-4 hover:text-accent/90">
              согласии на использование файлов cookie
            </Link>
            .
          </p>
        </div>

        <div className="flex gap-2 lg:shrink-0">
          <Button
            type="button"
            onClick={() => handleChoice("accepted")}
            className="h-9 flex-1 rounded-[10px] bg-accent px-4 text-[13px] font-semibold text-white hover:bg-accent/90 sm:min-w-[110px] lg:flex-none"
          >
            Принять
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => handleChoice("declined")}
            className="h-9 flex-1 rounded-[10px] border-white/20 bg-white/8 px-4 text-[13px] font-semibold text-white hover:bg-white/14 hover:text-white sm:min-w-[110px] lg:flex-none"
          >
            Отклонить
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
