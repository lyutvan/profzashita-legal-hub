import { Button } from "@/components/ui/button";
import { SITE } from "@/config/site";

interface LeadFormProps {
  practiceType?: string;
  variant?: "default" | "compact";
}

const LeadForm = ({ practiceType, variant = "default" }: LeadFormProps) => {
  const message = practiceType
    ? `Позвоните нам — адвокат по направлению «${practiceType}» подскажет следующие шаги.`
    : "Позвоните нам — мы подскажем, как лучше начать работу с вашим вопросом.";
  const buttonLabel = variant === "compact" ? "Позвонить" : "Свяжитесь с нами";

  return (
    <div className={variant === "compact" ? "space-y-3" : "space-y-4"}>
      <p className="text-sm text-muted-foreground">{message}</p>
      <a href={`tel:${SITE.phoneRaw}`} className="text-[18px] font-semibold text-slate-900 hover:text-accent">
        {SITE.phone}
      </a>
      <Button
        asChild
        size="lg"
        className="h-12 w-full rounded-[12px] border border-[#b8911f] bg-[#C9A227] text-[14px] text-white shadow-[0_6px_14px_rgba(111,83,15,0.25)] hover:border-[#a8831a] hover:bg-[#b8911f] hover:shadow-[0_4px_12px_rgba(111,83,15,0.2)]"
      >
        <a href={`tel:${SITE.phoneRaw}`}>{buttonLabel}</a>
      </Button>
    </div>
  );
};

export default LeadForm;
