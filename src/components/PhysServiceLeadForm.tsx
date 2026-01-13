import { useState, ChangeEvent, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { submitToWebhook } from "@/lib/webhook";
import PhoneInput from "@/components/PhoneInput";
import { isPhoneValid, normalizePhone } from "@/lib/phone";

interface PhysServiceLeadFormProps {
  serviceTitle: string;
  situationOptions: string[];
  desiredResults: string[];
}

const stageOptions = ["до суда", "уже в суде", "после решения"];
const termOptions = ["сегодня", "неделя", "месяц", "больше"];

const PhysServiceLeadForm = ({ serviceTitle, situationOptions, desiredResults }: PhysServiceLeadFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    situation: "",
    stage: "",
    term: "",
    desiredResult: "",
    comment: ""
  });
  const [honeypot, setHoneypot] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitTime, setSubmitTime] = useState<number>(Date.now());

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!formData.name.trim() || formData.name.length < 2) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, укажите ваше имя",
        variant: "destructive"
      });
      return false;
    }

    const phoneDigits = normalizePhone(formData.phone);
    if (!isPhoneValid(phoneDigits)) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, укажите корректный номер телефона",
        variant: "destructive"
      });
      return false;
    }

    if (!formData.situation) {
      toast({
        title: "Ошибка",
        description: "Укажите тип ситуации",
        variant: "destructive"
      });
      return false;
    }

    if (!formData.stage) {
      toast({
        title: "Ошибка",
        description: "Укажите стадию",
        variant: "destructive"
      });
      return false;
    }

    if (!formData.term) {
      toast({
        title: "Ошибка",
        description: "Укажите срок",
        variant: "destructive"
      });
      return false;
    }

    if (!formData.desiredResult) {
      toast({
        title: "Ошибка",
        description: "Укажите желаемый результат",
        variant: "destructive"
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (honeypot) {
      return;
    }

    const timeDiff = Date.now() - submitTime;
    if (timeDiff < 2000) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, подождите немного перед отправкой",
        variant: "destructive"
      });
      return;
    }

    if (!validateForm()) return;

    setIsSubmitting(true);

    const messageLines = [
      `Тип ситуации: ${formData.situation}`,
      `Стадия: ${formData.stage}`,
      `Срок: ${formData.term}`,
      `Желаемый результат: ${formData.desiredResult}`,
      formData.comment ? `Комментарий: ${formData.comment}` : null
    ].filter(Boolean);

    try {
      await submitToWebhook({
        name: formData.name,
        phone: formData.phone,
        topic: `Физические лица — ${serviceTitle}`,
        message: messageLines.join("\n")
      });
      toast({
        title: "Заявка отправлена",
        description: "Мы свяжемся с вами в ближайшее время"
      });
      setFormData({
        name: "",
        phone: "",
        situation: "",
        stage: "",
        term: "",
        desiredResult: "",
        comment: ""
      });
      setSubmitTime(Date.now());
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
    <form onSubmit={handleSubmit} className="space-y-5">
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

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">
            Имя <span className="text-destructive">*</span>
          </Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Иван"
            required
            maxLength={100}
            disabled={isSubmitting}
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
      </div>

      <div className="space-y-2">
        <Label>
          Тип ситуации <span className="text-destructive">*</span>
        </Label>
        <Select
          value={formData.situation}
          onValueChange={(value) => setFormData((prev) => ({ ...prev, situation: value }))}
        >
          <SelectTrigger>
            <SelectValue placeholder="Выберите ситуацию" />
          </SelectTrigger>
          <SelectContent>
            {situationOptions.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="space-y-2">
          <Label>
            Стадия <span className="text-destructive">*</span>
          </Label>
          <Select
            value={formData.stage}
            onValueChange={(value) => setFormData((prev) => ({ ...prev, stage: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Выберите стадию" />
            </SelectTrigger>
            <SelectContent>
              {stageOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>
            Срок <span className="text-destructive">*</span>
          </Label>
          <Select
            value={formData.term}
            onValueChange={(value) => setFormData((prev) => ({ ...prev, term: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Когда нужно" />
            </SelectTrigger>
            <SelectContent>
              {termOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>
            Желаемый результат <span className="text-destructive">*</span>
          </Label>
          <Select
            value={formData.desiredResult}
            onValueChange={(value) => setFormData((prev) => ({ ...prev, desiredResult: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Выберите результат" />
            </SelectTrigger>
            <SelectContent>
              {desiredResults.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="comment">Комментарий (необязательно)</Label>
        <Textarea
          id="comment"
          name="comment"
          value={formData.comment}
          onChange={handleChange}
          placeholder="Коротко опишите детали"
          rows={4}
          maxLength={1000}
          disabled={isSubmitting}
        />
      </div>

      <Button type="submit" className="w-full min-h-[44px]" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Отправка...
          </>
        ) : (
          "Оценить перспективы"
        )}
      </Button>
    </form>
  );
};

export default PhysServiceLeadForm;
