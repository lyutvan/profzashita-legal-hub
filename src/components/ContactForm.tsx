import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { toast } from "sonner";
import { submitToWebhook } from "@/lib/webhook";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await submitToWebhook({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        message: formData.message,
        consent: true,
        form_id: "contact-form",
        form_title: "Контактная форма",
      });
      window.location.href = "/thanks";
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
          className="mt-1"
        />
      </div>

      <div>
        <Label htmlFor="phone">Телефон *</Label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          required
          placeholder="+7 (999) 999-99-99"
          className="mt-1"
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
          className="mt-1"
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
          className="mt-1"
        />
      </div>

      <Button type="submit" size="lg" className="w-full">
        Отправить заявку
      </Button>

      <p className="text-xs text-muted-foreground text-center">
        Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
      </p>
    </form>
  );
};

export default ContactForm;
