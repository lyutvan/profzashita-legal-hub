import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";
import Logo from "./Logo";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#0C1926] text-white overflow-hidden">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div className="space-y-4">
            <Link to="/" className="inline-block">
              <Logo className="h-8" variant="footer" />
            </Link>
            <p className="text-sm text-white/80 leading-relaxed">
              Опыт. Ответственность. Результат.
            </p>
            <p className="text-xs text-white/60">
              Коллегия адвокатов с многолетним опытом работы в различных областях права.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-playfair text-lg font-semibold mb-4">Навигация</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-white/80 hover:text-[#B29760] transition-colors">
                  Главная
                </Link>
              </li>
              <li>
                <Link to="/uslugi" className="text-sm text-white/80 hover:text-[#B29760] transition-colors">
                  Услуги
                </Link>
              </li>
              <li>
                <Link to="/o-kollegii" className="text-sm text-white/80 hover:text-[#B29760] transition-colors">
                  О коллегии
                </Link>
              </li>
              <li>
                <Link to="/keisy" className="text-sm text-white/80 hover:text-[#B29760] transition-colors">
                  Кейсы
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-sm text-white/80 hover:text-[#B29760] transition-colors">
                  Вопросы и ответы
                </Link>
              </li>
              <li>
                <Link to="/kontakty" className="text-sm text-white/80 hover:text-[#B29760] transition-colors">
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
                <a href="tel:+79168597654" className="flex items-start gap-2 text-sm text-white/80 hover:text-[#B29760] transition-colors">
                  <Phone className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  +7 (916) 859‑76‑54
                </a>
              </li>
              <li>
                <a href="mailto:profzashchita@internet.ru" className="flex items-start gap-2 text-sm text-white/80 hover:text-[#B29760] transition-colors">
                  <Mail className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  profzashchita@internet.ru
                </a>
              </li>
              <li>
                      <div className="flex items-start gap-2 text-sm text-white/80">
                  <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  Москва, ул. Дегунинская 1к2, офис 303
                </div>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-playfair text-lg font-semibold mb-4">Документы</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy" className="text-sm text-white/80 hover:text-[#B29760] transition-colors">
                  Политика конфиденциальности
                </Link>
              </li>
              <li>
                <Link to="/disclaimer" className="text-sm text-white/80 hover:text-[#B29760] transition-colors">
                  Отказ от ответственности
                </Link>
              </li>
            </ul>
            <div className="mt-4 space-y-1">
              <p className="text-xs text-white/60">ИНН: 7743478583</p>
              <p className="text-xs text-white/60">ОГРН: 1257700439303</p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-white/60">
            © {currentYear} Профзащита. Все права защищены.
          </p>
          <p className="text-xs text-white/60">
            Информация на сайте не является публичной офертой
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
