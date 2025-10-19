import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";
import Logo from "./Logo";
import WhatsAppIcon from "./icons/WhatsAppIcon";
import TelegramIcon from "./icons/TelegramIcon";
import { Button } from "./ui/button";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="mb-4">
              <Logo className="h-10 w-auto [&_svg]:brightness-0 [&_svg]:invert [&_path]:fill-current [&_path]:stroke-current [&_.text-accent]:text-accent" />
            </div>
            <p className="text-sm text-primary-foreground/80 leading-relaxed">
              Опыт. Ответственность. Результат.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-playfair text-lg font-semibold mb-4">Навигация</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-primary-foreground/80 hover:text-accent transition-colors">
                  Главная
                </Link>
              </li>
              <li>
                <Link to="/practices" className="text-sm text-primary-foreground/80 hover:text-accent transition-colors">
                  Практики
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-primary-foreground/80 hover:text-accent transition-colors">
                  О нас
                </Link>
              </li>
              <li>
                <Link to="/cases" className="text-sm text-primary-foreground/80 hover:text-accent transition-colors">
                  Кейсы
                </Link>
              </li>
              <li>
                <Link to="/contacts" className="text-sm text-primary-foreground/80 hover:text-accent transition-colors">
                  Контакты
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h3 className="font-playfair text-lg font-semibold mb-4">Контакты</h3>
            <ul className="space-y-3">
              <li>
                <a href="tel:+79999999999" className="flex items-start gap-2 text-sm text-primary-foreground/80 hover:text-accent transition-colors">
                  <Phone className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  +7 999 999 99 99
                </a>
              </li>
              <li>
                <a href="mailto:pf@gmail.com" className="flex items-start gap-2 text-sm text-primary-foreground/80 hover:text-accent transition-colors">
                  <Mail className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  pf@gmail.com
                </a>
              </li>
              <li>
                <div className="flex items-start gap-2 text-sm text-primary-foreground/80">
                  <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  Москва
                </div>
              </li>
            </ul>
            <div className="mt-4 flex gap-2">
              <Button 
                size="sm" 
                variant="outline" 
                asChild 
                className="flex-1 min-h-[44px] border-accent/30 hover:bg-accent/10 hover:border-accent transition-all"
              >
                <a 
                  href="https://wa.me/79168597654" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="Написать в WhatsApp"
                  className="flex items-center justify-center gap-2"
                >
                  <WhatsAppIcon size={18} />
                  <span className="sr-only">WhatsApp</span>
                </a>
              </Button>
              <Button 
                size="sm" 
                variant="outline" 
                asChild 
                className="flex-1 min-h-[44px] border-accent/30 hover:bg-accent/10 hover:border-accent transition-all"
              >
                <a 
                  href="https://t.me/profzashita" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="Написать в Telegram"
                  className="flex items-center justify-center gap-2"
                >
                  <TelegramIcon size={18} />
                  <span className="sr-only">Telegram</span>
                </a>
              </Button>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-playfair text-lg font-semibold mb-4">Реквизиты</h3>
            <div className="text-sm text-primary-foreground/80 space-y-1">
              <p>Коллегия адвокатов «Профзащита»</p>
              <p>ИНН: 7700000000</p>
              <p>ОГРН: 1000000000000</p>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-primary-foreground/60">
            © {currentYear} Профзащита. Все права защищены.
          </p>
          <p className="text-xs text-primary-foreground/60">
            Информация на сайте не является публичной офертой
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
