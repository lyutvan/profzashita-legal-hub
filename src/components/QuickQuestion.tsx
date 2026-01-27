import { useState } from "react";
import { useLocation } from "react-router-dom";
import { MessageSquare } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import LeadForm from "./LeadForm";
import LandingConsultationForm from "./LandingConsultationForm";
import { cn } from "@/lib/utils";

const QuickQuestion = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const normalizedPath = location.pathname.replace(/\/+$/, "");
  const isLandingModal = normalizedPath === "/services/phys/razvod-razdel-imushchestva";
  const landingDialogClassName =
    "!w-[calc(100%-32px)] !max-w-[640px] !rounded-[20px] bg-white p-8 shadow-[0_24px_80px_rgba(15,23,42,0.18)] border border-slate-200";

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-[76px] right-[18px] z-40 h-14 w-14 rounded-full bg-accent text-accent-foreground shadow-elegant hover:scale-110 transition-transform duration-200 flex items-center justify-center group"
        aria-label="Задать вопрос"
      >
        <MessageSquare className="h-6 w-6" />
        <span className="absolute right-full mr-3 min-w-[140px] px-3 py-2 bg-background border border-border rounded-xl text-small font-medium leading-[1.2] text-foreground whitespace-nowrap opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-200 pointer-events-none shadow-lg z-50">
          Задать вопрос
        </span>
      </button>

      {/* Modal */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className={cn(isLandingModal ? landingDialogClassName : "sm:max-w-md")}>
          <DialogHeader className={isLandingModal ? "space-y-2 text-center" : undefined}>
            <DialogTitle className="font-serif text-h3-mobile md:text-h3">Быстрый вопрос юристу</DialogTitle>
            <DialogDescription>
              Оставьте свои контакты, и мы свяжемся с вами в ближайшее время
            </DialogDescription>
          </DialogHeader>

          {isLandingModal ? <LandingConsultationForm /> : <LeadForm variant="compact" />}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default QuickQuestion;
