import { useState } from "react";
import { MessageSquare } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import LeadForm from "./LeadForm";

const QuickQuestion = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 h-14 w-14 rounded-full bg-accent text-accent-foreground shadow-elegant hover:scale-110 transition-transform duration-200 flex items-center justify-center group"
        aria-label="Задать вопрос"
      >
        <MessageSquare className="h-6 w-6" />
        <span className="absolute right-full mr-3 px-3 py-2 bg-background border border-border rounded-xl text-small font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-lg">
          Задать вопрос
        </span>
      </button>

      {/* Modal */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-serif text-h3-mobile md:text-h3">Быстрый вопрос юристу</DialogTitle>
            <DialogDescription>
              Оставьте свои контакты, и мы свяжемся с вами в ближайшее время
            </DialogDescription>
          </DialogHeader>

          <LeadForm variant="compact" />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default QuickQuestion;
