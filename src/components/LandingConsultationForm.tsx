import { useState } from "react";
import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import PhoneInput from "@/components/PhoneInput";
import { toast } from "@/hooks/use-toast";
import { submitToWebhook } from "@/lib/webhook";
import { isPhoneValid, normalizePhone } from "@/lib/phone";
import { cn } from "@/lib/utils";

type LandingConsultationFormProps = {
  onSuccess?: () => void;
  submitLabel?: string;
};

const LandingConsultationForm = ({ onSuccess, submitLabel = "Получить консультацию" }: LandingConsultationFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: ""
  });
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [submitTime, setSubmitTime] = useState<number>(Date.now());

  const baseInputClass =
    "h-12 rounded-[14px] border border-slate-200 bg-white px-4 placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-accent/30 focus-visible:ring-offset-0 focus-visible:border-accent";

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
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
    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);
    try {
      await submitToWebhook({
        name: formData.name.trim(),
        phone: formData.phone,
        topic: "Расторжение брака и раздел имущества"
      });
      toast({
        title: "Заявка отправлена",
        description: "Мы свяжемся с вами в ближайшее время"
      });
      setFormData({ name: "", phone: "" });
      setConsent(false);
      setErrors({});
      setSubmitTime(Date.now());
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Form submission error:", error);
      toast({
        title: "Ошибка отправки",
        description: "Пожалуйста, попробуйте позже или свяжитесь с нами по телефону",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
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
        <Label htmlFor="landing-name">
          Ваше имя <span className="text-destructive">*</span>
        </Label>
        <Input
          id="landing-name"
          name="name"
          value={formData.name}
          onChange={(event) => {
            setFormData((prev) => ({ ...prev, name: event.target.value }));
            if (errors.name) setErrors((prev) => ({ ...prev, name: "" }));
          }}
          placeholder="Ваше имя*"
          className={cn(baseInputClass, errors.name && "border-destructive focus-visible:ring-destructive/30")}
          disabled={isSubmitting}
          maxLength={100}
          required
        />
        {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="landing-phone">
          Ваш номер телефона <span className="text-destructive">*</span>
        </Label>
        <PhoneInput
          id="landing-phone"
          value={formData.phone}
          onChange={(value) => {
            setFormData((prev) => ({ ...prev, phone: value }));
            if (errors.phone) setErrors((prev) => ({ ...prev, phone: "" }));
          }}
          disabled={isSubmitting}
          required
          placeholder="Ваш номер телефона*"
          className={cn(baseInputClass, errors.phone && "border-destructive focus-visible:ring-destructive/30")}
        />
        {errors.phone && <p className="text-xs text-destructive">{errors.phone}</p>}
      </div>

      <div className="space-y-2">
        <div className="flex items-start gap-3">
          <Checkbox
            id="landing-consent"
            checked={consent}
            onCheckedChange={(value) => {
              setConsent(Boolean(value));
              if (errors.consent) setErrors((prev) => ({ ...prev, consent: "" }));
            }}
          />
          <Label htmlFor="landing-consent" className="text-small text-muted-foreground leading-relaxed">
            Я даю своё согласие на обработку моих персональных данных в соответствии с{" "}
            <Link to="/privacy" className="text-accent hover:underline">
              Политикой обработки персональных данных
            </Link>{" "}
            и{" "}
            <Link to="/privacy" className="text-accent hover:underline">
              Политикой конфиденциальности
            </Link>
          </Label>
        </div>
        {errors.consent && <p className="text-xs text-destructive">{errors.consent}</p>}
      </div>

      <Button
        type="submit"
        size="lg"
        className="w-full h-12 rounded-[12px] border border-[#b8911f] bg-[#C9A227] text-[14px] text-slate-900 shadow-[0_6px_14px_rgba(111,83,15,0.25)] hover:border-[#a8831a] hover:bg-[#b8911f] hover:shadow-[0_4px_12px_rgba(111,83,15,0.2)]"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Отправка...
          </>
        ) : (
          submitLabel
        )}
      </Button>

      <p className="text-small text-muted-foreground text-center">
        Перезвоним в течение 15–20 минут в рабочее время
      </p>
    </form>
  );
};

export default LandingConsultationForm;
