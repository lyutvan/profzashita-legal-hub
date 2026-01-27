import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type FormEvent
} from "react";
import { Link, useLocation } from "react-router-dom";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import PhoneInput from "@/components/PhoneInput";
import { toast } from "@/hooks/use-toast";
import { submitToWebhook } from "@/lib/webhook";
import { isPhoneValid, normalizePhone } from "@/lib/phone";

type OpenQuickQuestionOptions = {
  topic?: string;
};

type QuickQuestionModalContextValue = {
  openQuickQuestionModal: (options?: OpenQuickQuestionOptions) => void;
  closeQuickQuestionModal: () => void;
};

const QuickQuestionModalContext = createContext<QuickQuestionModalContextValue | null>(null);

const CASE_RU: Record<string, string> = {
  criminal: "Уголовное право",
  civil: "Гражданские дела",
  arbitration: "Арбитраж и споры с бизнесом",
  family: "Семейное право",
  consumer: "Защита прав потребителей",
  representation: "Представительство в суде",
  consultation: "Консультация"
};

const deriveTopicFromPath = (pathname: string) => {
  const normalizedPath = pathname.replace(/\/+$/, "") || "/";
  const parts = normalizedPath.split("/").filter(Boolean);
  const slug = parts.at(-1);
  if (!slug) return "Консультация";
  const readable = decodeURIComponent(slug).replace(/[-_]/g, " ");
  if (normalizedPath.startsWith("/services/phys/")) return `Физические лица — ${readable}`;
  if (normalizedPath.startsWith("/services/biz/")) return `Юридическим лицам — ${readable}`;
  if (normalizedPath.startsWith("/services/criminal/")) return `Уголовные дела — ${readable}`;
  return CASE_RU[slug] ?? readable;
};

type ProviderProps = {
  children: React.ReactNode;
};

export const QuickQuestionModalProvider = ({ children }: ProviderProps) => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [topicOverride, setTopicOverride] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: "", phone: "" });
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [honeypot, setHoneypot] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitTime, setSubmitTime] = useState<number>(Date.now());

  const dialogClassName =
    "!w-[calc(100%-32px)] !max-w-[640px] !rounded-[20px] border border-slate-200 bg-white p-8 shadow-[0_24px_80px_rgba(15,23,42,0.18)]";

  const topic = topicOverride ?? deriveTopicFromPath(location.pathname);

  const resetForm = useCallback(() => {
    setFormData({ name: "", phone: "" });
    setConsent(false);
    setErrors({});
    setHoneypot("");
    setSubmitTime(Date.now());
  }, []);

  const closeQuickQuestionModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  const openQuickQuestionModal = useCallback((options?: OpenQuickQuestionOptions) => {
    setTopicOverride(options?.topic ?? null);
    resetForm();
    setIsOpen(true);
  }, [resetForm]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (honeypot) return;

    const timeDiff = Date.now() - submitTime;
    if (timeDiff < 2000) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, подождите немного перед отправкой",
        variant: "destructive"
      });
      return;
    }

    const nextErrors: Record<string, string> = {};
    if (!formData.name.trim()) {
      nextErrors.name = "Укажите имя";
    } else if (formData.name.trim().length < 2) {
      nextErrors.name = "Укажите имя полностью";
    }

    if (!formData.phone.trim()) {
      nextErrors.phone = "Укажите телефон";
    } else if (!isPhoneValid(normalizePhone(formData.phone))) {
      nextErrors.phone = "Укажите корректный номер телефона";
    }

    if (!consent) {
      nextErrors.consent = "Подтвердите согласие";
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setIsSubmitting(true);
    try {
      await submitToWebhook({
        name: formData.name.trim(),
        phone: formData.phone,
        topic
      });
      toast({
        title: "Заявка отправлена",
        description: "Мы свяжемся с вами в ближайшее время"
      });
      closeQuickQuestionModal();
      resetForm();
    } catch (error) {
      console.error("Quick question submit error:", error);
      toast({
        title: "Ошибка отправки",
        description: "Пожалуйста, попробуйте позже или свяжитесь с нами по телефону",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contextValue = useMemo<QuickQuestionModalContextValue>(
    () => ({
      openQuickQuestionModal,
      closeQuickQuestionModal
    }),
    [openQuickQuestionModal, closeQuickQuestionModal]
  );

  return (
    <QuickQuestionModalContext.Provider value={contextValue}>
      {children}

      <Dialog open={isOpen} onOpenChange={(open) => (!open ? closeQuickQuestionModal() : setIsOpen(true))}>
        <DialogContent className={dialogClassName}>
          <DialogHeader className="space-y-2 text-center">
            <DialogTitle className="font-serif text-h3-mobile md:text-h3">Быстрый вопрос юристу</DialogTitle>
            <DialogDescription>
              Оставьте свои контакты, и мы свяжемся с вами в ближайшее время
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="website"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              className="absolute opacity-0 pointer-events-none"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
            />

            <div className="space-y-2">
              <Label htmlFor="quick-question-name">
                Ваше имя <span className="text-destructive">*</span>
              </Label>
              <Input
                id="quick-question-name"
                value={formData.name}
                onChange={(event) => setFormData((prev) => ({ ...prev, name: event.target.value }))}
                placeholder="Ваше имя*"
                disabled={isSubmitting}
              />
              {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="quick-question-phone">
                Ваш номер телефона <span className="text-destructive">*</span>
              </Label>
              <PhoneInput
                id="quick-question-phone"
                value={formData.phone}
                onChange={(value) => setFormData((prev) => ({ ...prev, phone: value }))}
                placeholder="Ваш номер телефона*"
                disabled={isSubmitting}
                required
              />
              {errors.phone && <p className="text-xs text-destructive">{errors.phone}</p>}
            </div>

            <div className="flex items-start gap-3">
              <Checkbox
                id="quick-question-consent"
                checked={consent}
                onCheckedChange={(value) => setConsent(Boolean(value))}
              />
              <Label htmlFor="quick-question-consent" className="text-small text-muted-foreground leading-relaxed">
                Я даю свое согласие на обработку персональных данных и принимаю условия{" "}
                <Link to="/privacy" className="text-accent hover:underline">
                  политики конфиденциальности
                </Link>{" "}
                и{" "}
                <Link to="/disclaimer" className="text-accent hover:underline">
                  пользовательского соглашения
                </Link>
                .
              </Label>
            </div>
            {errors.consent && <p className="text-xs text-destructive">{errors.consent}</p>}

            <Button
              type="submit"
              size="lg"
              className="h-12 w-full rounded-[12px] border border-[#b8911f] bg-[#C9A227] text-[15px] font-semibold text-slate-900 shadow-[0_6px_16px_rgba(111,83,15,0.28)] hover:border-[#a8831a] hover:bg-[#b8911f]"
              disabled={isSubmitting}
            >
              Получить консультацию
            </Button>

            <p className="text-small text-muted-foreground text-center">
              Перезвоним в течение 15–20 минут в рабочее время
            </p>
          </form>
        </DialogContent>
      </Dialog>
    </QuickQuestionModalContext.Provider>
  );
};

export const useQuickQuestionModal = () => {
  const context = useContext(QuickQuestionModalContext);
  if (!context) {
    throw new Error("useQuickQuestionModal must be used within QuickQuestionModalProvider");
  }
  return context;
};
