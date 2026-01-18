import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { toast } from "sonner";
import { submitToWebhook } from "@/lib/webhook";
import { useLocation } from "react-router-dom";
import PhoneInput from "@/components/PhoneInput";
import { isPhoneValid, normalizePhone } from "@/lib/phone";

const ContactForm = () => {
  const location = useLocation();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const deriveTopic = () => {
    const path = location.pathname.replace(/\/+$/, "") || "/";
    if (path.startsWith("/services/phys/")) return "Физические лица — консультация";
    if (path.startsWith("/services/biz/")) return "Юридическим лицам — консультация";
    if (path.startsWith("/services/criminal/")) return "Уголовные дела — консультация";
    return "Общий запрос";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const digits = normalizePhone(formData.phone);
    if (!isPhoneValid(digits)) {
      toast.error("Пожалуйста, укажите корректный номер телефона");
      return;
    }
    
    try {
      await submitToWebhook({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        topic: deriveTopic(),
        message: formData.message,
      });
      toast.success("Заявка отправлена");
      setFormData({ name: "", phone: "", email: "", message: "" });
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("Ошибка отправки. Попробуйте еще раз.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label htmlFor="name">Ваше имя *</Label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="Иван Иванов"
          className="mt-2"
        />
      </div>

      <div>
        <Label htmlFor="phone">Телефон *</Label>
        <PhoneInput
          value={formData.phone}
          onChange={(val) => setFormData((prev) => ({ ...prev, phone: val }))}
          required
        />
      </div>

      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="example@mail.com"
          className="mt-2"
        />
      </div>

      <div>
        <Label htmlFor="message">Опишите вашу ситуацию</Label>
        <Textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Кратко опишите вашу ситуацию..."
          rows={5}
          className="mt-2"
        />
      </div>

      <Button type="submit" size="lg" className="w-full">
        Отправить заявку
      </Button>

      <p className="text-small text-muted-foreground text-center">
        Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
      </p>
    </form>
  );
};

export default ContactForm;
