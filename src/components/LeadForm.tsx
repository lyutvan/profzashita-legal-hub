import { useId, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";

import PhoneInput from "@/components/PhoneInput";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { isPhoneValid, normalizePhone } from "@/lib/phone";
import { submitToWebhook } from "@/lib/webhook";
import { trackMetrikaGoal } from "@/lib/metrika";

interface LeadFormProps {
  practiceType?: string;
  variant?: "default" | "compact";
}

const LeadForm = ({ practiceType, variant = "default" }: LeadFormProps) => {
  const [formData, setFormData] = useState({ name: "", phone: "", message: "" });
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [honeypot, setHoneypot] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formId = useId();

  const isCompact = variant === "compact";
  const topic = practiceType ?? "Консультация";
  const nameId = `${formId}-name`;
  const phoneId = `${formId}-phone`;
  const messageId = `${formId}-message`;
  const consentId = `${formId}-consent`;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (honeypot) return;

    const nextErrors: Record<string, string> = {};
    if (!formData.name.trim()) {
      nextErrors.name = "Укажите имя";
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
        topic,
        message: formData.message.trim() || undefined
      });
      toast({
        title: "Заявка отправлена",
        description: "Мы свяжемся с вами в ближайшее время"
      });
      trackMetrikaGoal("form_submit", { form_type: "lead", topic });
      setFormData({ name: "", phone: "", message: "" });
      setConsent(false);
      setErrors({});
    } catch (error) {
      console.error("Lead form submit error:", error);
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
    <form onSubmit={handleSubmit} className={isCompact ? "space-y-3" : "space-y-4"}>
      <input
        type="text"
        name="website"
        value={honeypot}
        onChange={(event) => setHoneypot(event.target.value)}
        className="absolute opacity-0 pointer-events-none"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      <div className="space-y-2">
        <Label htmlFor={nameId}>
          Ваше имя <span className="text-destructive">*</span>
        </Label>
        <Input
          id={nameId}
          value={formData.name}
          onChange={(event) => setFormData((prev) => ({ ...prev, name: event.target.value }))}
          placeholder="Ваше имя"
          disabled={isSubmitting}
        />
        {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor={phoneId}>
          Телефон <span className="text-destructive">*</span>
        </Label>
        <PhoneInput
          id={phoneId}
          value={formData.phone}
          onChange={(value) => setFormData((prev) => ({ ...prev, phone: value }))}
          disabled={isSubmitting}
          required
        />
        {errors.phone && <p className="text-xs text-destructive">{errors.phone}</p>}
      </div>

      {!isCompact && (
        <div className="space-y-2">
          <Label htmlFor={messageId}>Комментарий</Label>
          <Textarea
            id={messageId}
            value={formData.message}
            onChange={(event) => setFormData((prev) => ({ ...prev, message: event.target.value }))}
            placeholder="Коротко опишите вопрос"
            disabled={isSubmitting}
            className="min-h-[110px]"
          />
        </div>
      )}

      <div className="flex items-start gap-3">
        <Checkbox
          id={consentId}
          checked={consent}
          onCheckedChange={(value) => setConsent(Boolean(value))}
          disabled={isSubmitting}
        />
        <Label htmlFor={consentId} className="text-small leading-relaxed text-muted-foreground">
          Я даю согласие на обработку персональных данных и принимаю условия{" "}
          <Link to="/politika-konfidentsialnosti" className="text-accent hover:underline">
            политики конфиденциальности
          </Link>
          .
        </Label>
      </div>
      {errors.consent && <p className="text-xs text-destructive">{errors.consent}</p>}

      <Button
        type="submit"
        size="lg"
        className="h-12 w-full rounded-[12px] border border-[#b8911f] bg-[#C9A227] text-[14px] font-semibold text-white shadow-[0_6px_14px_rgba(111,83,15,0.25)] hover:border-[#a8831a] hover:bg-[#b8911f] hover:shadow-[0_4px_12px_rgba(111,83,15,0.2)]"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Отправляем..." : "Получить консультацию"}
      </Button>
    </form>
  );
};

export default LeadForm;
