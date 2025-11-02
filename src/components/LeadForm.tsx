import { useState, FormEvent, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import InputMask from "react-input-mask";
import { Loader2 } from "lucide-react";
import { submitToWebhook } from "@/lib/webhook";

interface LeadFormProps {
  practiceType?: string;
  variant?: "default" | "compact";
}

const LeadForm = ({ practiceType, variant = "default" }: LeadFormProps) => {
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

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (value: string) => {
    setFormData({ ...formData, caseType: value });
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

    const phoneDigits = formData.phone.replace(/\D/g, "");
    if (phoneDigits.length !== 11) {
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

    if (!formData.caseType) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, выберите тип дела",
        variant: "destructive",
      });
      return false;
    }

    return true;
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

    try {
      await submitToWebhook({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        message: formData.message,
        topic: formData.caseType,
        consent: true,
        form_id: variant === "compact" ? "quick-question-form" : "lead-form",
        form_title: variant === "compact" ? "Быстрый вопрос юристу" : "Получить консультацию",
      });
    } catch (error) {
      console.error("Form submission error:", error);
      toast({
        title: "Ошибка отправки",
        description: "Пожалуйста, попробуйте позже или свяжитесь с нами по телефону",
        variant: "destructive",
      });
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
        <InputMask
          mask="+7 (999) 999-99-99"
          value={formData.phone}
          onChange={handleChange}
          disabled={isSubmitting}
        >
          {/* @ts-ignore - InputMask types issue */}
          {(inputProps: any) => (
            <Input
              {...inputProps}
              id="phone"
              name="phone"
              type="tel"
              required
              placeholder="+7 (999) 999-99-99"
            />
          )}
        </InputMask>
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

      <div className="space-y-2">
        <Label htmlFor="caseType">
          Тип дела <span className="text-destructive">*</span>
        </Label>
        <Select
          value={formData.caseType}
          onValueChange={handleSelectChange}
          disabled={isSubmitting || !!practiceType}
        >
          <SelectTrigger id="caseType">
            <SelectValue placeholder="Выберите направление" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="criminal">Уголовное право</SelectItem>
            <SelectItem value="civil">Гражданские дела</SelectItem>
            <SelectItem value="arbitration">Арбитраж и споры с бизнесом</SelectItem>
            <SelectItem value="family">Семейное право</SelectItem>
            <SelectItem value="consumer">Защита прав потребителей</SelectItem>
            <SelectItem value="representation">Представление интересов в суде</SelectItem>
            <SelectItem value="consultation">Консультация</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {variant === "default" && (
        <div className="space-y-2">
          <Label htmlFor="message">Комментарий</Label>
          <Textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Кратко опишите вашу ситуацию..."
            disabled={isSubmitting}
            rows={4}
            maxLength={1000}
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
