import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import { Card } from "@/components/ui/card";

type ServiceBannerCardProps = {
  title: string;
  to: string;
  imageSrc: string;
  compactOnMobile?: boolean;
};

const ServiceBannerCard = ({ title, to, imageSrc, compactOnMobile = false }: ServiceBannerCardProps) => {
  return (
    <Card
      className={`service-card service-card--image group relative overflow-hidden transition-all duration-300 hover:border-accent/30 hover:shadow-lg ${
        compactOnMobile
          ? "h-auto rounded-2xl border border-[#d7c28b] bg-[#F8F6EE] shadow-[0_6px_16px_rgba(15,23,42,0.04)] md:h-[260px] md:border-2 md:border-border md:bg-transparent"
          : "h-[260px] border-2 border-border"
      }`}
    >
      <div className={`${compactOnMobile ? "hidden md:block" : "block"} absolute inset-0`}>
        <img
          src={imageSrc}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 z-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          loading="lazy"
        />
        <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-t from-black/60 via-black/55 to-black/45 transition-all duration-300 group-hover:from-black/70 group-hover:via-black/60 group-hover:to-black/50" />
      </div>

      <Link
        to={to}
        aria-label={`${title} — подробнее`}
        className="absolute inset-0 z-30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      />

      <div
        className={`relative z-20 flex h-full justify-between ${
          compactOnMobile ? "flex-row items-center gap-4 px-4 py-4 md:flex-col md:items-stretch md:p-6" : "flex-col p-6"
        }`}
      >
        <div
          className={`font-bold leading-snug ${
            compactOnMobile
              ? "text-[20px] text-slate-950 md:font-serif md:text-h3-mobile md:text-white md:[text-shadow:0_3px_14px_rgba(0,0,0,0.6)]"
              : "font-serif text-h3-mobile text-white [text-shadow:0_3px_14px_rgba(0,0,0,0.6)]"
          }`}
        >
          {title}
        </div>
        <div className="flex items-center justify-between">
          <span
            className={`text-accent font-medium group-hover:underline ${
              compactOnMobile ? "hidden md:inline md:[text-shadow:0_2px_10px_rgba(0,0,0,0.55)]" : "[text-shadow:0_2px_10px_rgba(0,0,0,0.55)]"
            }`}
          >
            Подробнее
          </span>
          <ArrowRight
            className={`text-accent transition-transform group-hover:translate-x-1 ${
              compactOnMobile ? "h-5 w-5 shrink-0 md:drop-shadow-[0_2px_10px_rgba(0,0,0,0.45)]" : "h-5 w-5 drop-shadow-[0_2px_10px_rgba(0,0,0,0.45)]"
            }`}
          />
        </div>
      </div>
    </Card>
  );
};

export default ServiceBannerCard;
