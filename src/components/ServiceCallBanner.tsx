import { Phone } from "lucide-react";

import { SITE } from "@/config/site";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type ServiceCallBannerProps = {
  className?: string;
};

const ServiceCallBanner = ({ className }: ServiceCallBannerProps) => {
  const telHref = `tel:${SITE.phoneRaw}`;

  return (
    <div
      className={cn(
        "w-full rounded-2xl bg-[#C9A227] p-4 text-[#0B1F3A] shadow-lg shadow-black/20 md:p-5",
        className,
      )}
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#0B1F3A]/10">
            <Phone className="h-5 w-5 text-[#0B1F3A]" />
          </div>
          <div className="text-base leading-snug md:text-lg">
            <span className="text-[#0B1F3A]/90">Не нашли подходящую услугу? Позвоните нам: </span>
            <a
              href={telHref}
              className="font-semibold text-[#0B1F3A] underline-offset-4 hover:underline"
            >
              {SITE.phone}
            </a>
          </div>
        </div>

        <Button
          size="lg"
          asChild
          className="w-full rounded-xl bg-[#0B1F3A] px-6 text-base font-semibold text-white shadow-sm hover:bg-[#0B1F3A]/90 md:w-auto"
        >
          <a href={telHref}>Позвонить</a>
        </Button>
      </div>
    </div>
  );
};

export default ServiceCallBanner;
