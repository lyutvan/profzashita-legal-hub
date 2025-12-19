import { useState, FormEvent, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { submitToWebhook } from "@/lib/webhook";
import { useInRouterContext, useLocation } from "react-router-dom";
import PhoneInput from "@/components/PhoneInput";
import { isPhoneValid, normalizePhone } from "@/lib/phone";

interface LeadFormProps {
  practiceType?: string;
  variant?: "default" | "compact";
}

const LeadForm = ({ practiceType, variant = "default" }: LeadFormProps) => {
  const inRouter = useInRouterContext();
  const location = inRouter ? useLocation() : { pathname: "" };
  const CASE_RU: Record<string, string> = {
    criminal: "Уголовное право",
    civil: "Гражданские дела",
    arbitration: "Арбитраж и споры с бизнесом",
    family: "Семейное право",
    consumer: "Защита прав потребителей",
    representation: "Представительство в суде",
    consultation: "Консультация",
  };

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    caseType: practiceType || "",
    message: "",
  });
  
  const [honeypot, setHoneypot] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitTime, setSubmitTime] = useState<number>(Date.now());
  const [submitted, setSubmitted] = useState(false);
  const isCompact = variant === "compact";

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = (): boolean => {
    if (!formData.name.trim() || formData.name.length < 2) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, укажите ваше имя",
        variant: "destructive",
      });
      return false;
    }

    const phoneDigits = normalizePhone(formData.phone);
    if (!isPhoneValid(phoneDigits)) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, укажите корректный номер телефона",
        variant: "destructive",
      });
      return false;
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, укажите корректный email",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const deriveTopic = () => {
    if (practiceType) return practiceType;
    if (formData.caseType) return CASE_RU[formData.caseType] ?? formData.caseType;
    const path = location.pathname.replace(/\/+$/, "") || "/";
    const parts = path.split("/").filter(Boolean);
    const slug = parts.at(-1);
    if (slug) {
      const readable = decodeURIComponent(slug).replace(/[-_]/g, " ");
      if (path.startsWith("/services/phys/")) return `Физические лица — ${readable}`;
      if (path.startsWith("/services/biz/")) return `Юридическим лицам — ${readable}`;
      if (path.startsWith("/services/criminal/")) return `Уголовные дела — ${readable}`;
      return readable;
    }
    return "Консультация";
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Anti-spam: honeypot check
    if (honeypot) {
      console.log("Spam detected via honeypot");
      return;
    }

    // Anti-spam: time delay check (minimum 2 seconds)
    const timeDiff = Date.now() - submitTime;
    if (timeDiff < 2000) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, подождите немного перед отправкой",
        variant: "destructive",
      });
      return;
    }

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    const topicRu = CASE_RU[formData.caseType] ?? deriveTopic();

    try {
      await submitToWebhook({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        topic: topicRu,
        message: formData.message,
      });
      setSubmitted(true);
      toast({
        title: "Заявка отправлена",
        description: "Мы свяжемся с вами в ближайшее время",
      });
      setFormData({
        name: "",
        phone: "",
        email: "",
        caseType: practiceType || "",
        message: "",
      });
      setSubmitTime(Date.now());
    } catch (error) {
      console.error("Form submission error:", error);
      toast({
        title: "Ошибка отправки",
        description: "Пожалуйста, попробуйте позже или свяжитесь с нами по телефону",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Honeypot field - hidden from users */}
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
        <Label htmlFor="name">
          Ваше имя <span className="text-destructive">*</span>
        </Label>
        <Input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="Иван Иванов"
          disabled={isSubmitting}
          maxLength={100}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">
          Телефон <span className="text-destructive">*</span>
        </Label>
        <PhoneInput
          value={formData.phone}
          onChange={(val) => handleChange({ target: { name: "phone", value: val } } as any)}
          disabled={isSubmitting}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email (необязательно)</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="ivan@example.com"
          disabled={isSubmitting}
          maxLength={255}
        />
      </div>

      {(variant === "default" || variant === "compact") && (
        <div className="space-y-2">
          <Label htmlFor="message">Опишите вашу ситуацию</Label>
          <Textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Опишите вашу ситуацию"
            disabled={isSubmitting}
            rows={variant === "compact" ? 4 : 6}
            maxLength={1000}
            required={variant === "compact"}
          />
        </div>
      )}

      <Button
        type="submit"
        className="w-full min-h-[44px]"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Отправка...
          </>
        ) : (
          "Получить консультацию"
        )}
      </Button>

      <p className="text-xs text-muted-foreground text-center">
        Нажимая кнопку, вы соглашаетесь с{" "}
        <a href="/privacy" className="text-accent hover:underline">
          политикой конфиденциальности
        </a>
      </p>
    </form>
  );
};

export default LeadForm;
