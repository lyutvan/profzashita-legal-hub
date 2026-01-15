import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import { Card } from "@/components/ui/card";

type ServiceBannerCardProps = {
  title: string;
  to: string;
  imageSrc: string;
};

const ServiceBannerCard = ({ title, to, imageSrc }: ServiceBannerCardProps) => {
  return (
    <Card className="group relative h-[260px] overflow-hidden border-2 border-border hover:border-accent/30 hover:shadow-lg transition-all duration-300">
      <div className="absolute inset-0">
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

      <div className="relative z-20 flex h-full flex-col justify-between p-6">
        <div className="font-serif text-h3-mobile font-bold text-white leading-snug [text-shadow:0_3px_14px_rgba(0,0,0,0.6)]">
          {title}
        </div>
        <div className="flex items-center justify-between">
          <span className="text-accent font-medium group-hover:underline [text-shadow:0_2px_10px_rgba(0,0,0,0.55)]">
            Подробнее
          </span>
          <ArrowRight className="h-5 w-5 text-accent drop-shadow-[0_2px_10px_rgba(0,0,0,0.45)] group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Card>
  );
};

export default ServiceBannerCard;
