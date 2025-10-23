import { useState } from "react";
import { MessageSquare, X } from "lucide-react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import WhatsAppIcon from "./icons/WhatsAppIcon";
import TelegramIcon from "./icons/TelegramIcon";
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
        <span className="absolute right-full mr-3 px-3 py-2 bg-background border border-border rounded-lg text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-lg">
          Задать вопрос
        </span>
      </button>

      {/* Modal */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-playfair">Быстрый вопрос юристу</DialogTitle>
            <DialogDescription>
              Оставьте свои контакты, и мы свяжемся с вами в ближайшее время
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                className="flex-1" 
                asChild
              >
                <a 
                  href="https://wa.me/79168597654" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2"
                >
                  <WhatsAppIcon size={20} />
                  WhatsApp
                </a>
              </Button>
              <Button 
                variant="outline" 
                className="flex-1"
                asChild
              >
                <a 
                  href="https://t.me/profzashita" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2"
                >
                  <TelegramIcon size={20} />
                  Telegram
                </a>
              </Button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">или заполните форму</span>
              </div>
            </div>

            <LeadForm variant="compact" />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default QuickQuestion;
