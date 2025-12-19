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
    <Card className="group relative h-[260px] overflow-hidden border-2 hover:border-[#C9A227]/30 hover:shadow-lg transition-all duration-300">
      <img
        src={imageSrc}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.65)_0%,rgba(0,0,0,0.25)_55%,rgba(0,0,0,0.10)_100%)]" />

      <Link
        to={to}
        aria-label={`${title} — подробнее`}
        className="absolute inset-0 z-20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227] focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      />

      <div className="relative z-10 flex h-full flex-col justify-between p-6">
        <div className="font-montserrat text-2xl font-bold text-white leading-snug [text-shadow:0_2px_12px_rgba(0,0,0,0.6)]">
          {title}
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[#C9A227] font-medium group-hover:underline [text-shadow:0_1px_8px_rgba(0,0,0,0.5)]">
            Подробнее
          </span>
          <ArrowRight className="h-5 w-5 text-[#C9A227] drop-shadow-[0_1px_8px_rgba(0,0,0,0.45)] group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Card>
  );
};

export default ServiceBannerCard;
