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
        "w-full rounded-xl bg-accent p-4 text-foreground shadow-lg shadow-black/20 md:p-6",
        className,
      )}
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-4">
          <div className="mt-2 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
            <Phone className="h-5 w-5 text-primary" />
          </div>
          <div className="text-body-mobile md:text-body leading-snug">
            <span className="text-foreground/90">Не нашли подходящую услугу? Позвоните нам: </span>
            <a
              href={telHref}
              className="font-semibold text-foreground underline-offset-4 hover:underline"
            >
              {SITE.phone}
            </a>
          </div>
        </div>

        <Button
          size="lg"
          asChild
          className="w-full rounded-xl bg-primary px-6 font-semibold text-white shadow-sm hover:bg-primary/90 md:w-auto"
        >
          <a href={telHref}>Позвонить</a>
        </Button>
      </div>
    </div>
  );
};

export default ServiceCallBanner;
