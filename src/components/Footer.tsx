import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";
import Logo from "./Logo";
import { SITE } from "@/config/site";

const Footer = () => {
  return (
    <footer className="relative bg-primary text-white overflow-hidden section section--tight">
      <div className="container section__content">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="space-y-4 lg:col-span-4">
            <Link to="/" className="inline-block">
              <Logo variant="header" />
            </Link>
            <p className="text-small text-white/80 leading-relaxed">
              Опыт. Ответственность. Результат.
            </p>
            <p className="text-small text-white/60">
              Коллегия адвокатов с многолетним опытом работы в различных областях права.
            </p>
            <p className="text-small text-white/60">ИНН: 7743478583</p>
          </div>

          <div className="lg:col-span-4">
            <h3 className="font-serif text-h3-mobile font-semibold mb-4">Контакты</h3>
            <ul className="space-y-3">
              <li>
                <a href={`tel:${SITE.phoneRaw}`} className="flex items-start gap-2 text-small text-white/80 hover:text-accent transition-colors">
                  <Phone className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  {SITE.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${SITE.email}`} className="flex items-start gap-2 text-small text-white/80 hover:text-accent transition-colors">
                  <Mail className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  {SITE.email}
                </a>
              </li>
              <li>
                <div className="flex items-start gap-2 text-small text-white/80">
                  <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  {SITE.address.city}, {SITE.address.street}
                </div>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-4">
            <h3 className="font-serif text-h3-mobile font-semibold mb-4">Навигация и документы</h3>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-1">
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="text-small text-white/80 hover:text-accent transition-colors">
                    Главная
                  </Link>
                </li>
                <li>
                  <Link to="/uslugi" className="text-small text-white/80 hover:text-accent transition-colors">
                    Услуги
                  </Link>
                </li>
                <li>
                  <Link to="/keisy" className="text-small text-white/80 hover:text-accent transition-colors">
                    Кейсы
                  </Link>
                </li>
                <li>
                  <Link to="/novosti" className="text-small text-white/80 hover:text-accent transition-colors">
                    Новости
                  </Link>
                </li>
                <li>
                  <Link to="/o-kollegii" className="text-small text-white/80 hover:text-accent transition-colors">
                    О коллегии
                  </Link>
                </li>
                <li>
                  <Link to="/kontakty" className="text-small text-white/80 hover:text-accent transition-colors">
                    Контакты
                  </Link>
                </li>
              </ul>
              <ul className="space-y-2">
                <li>
                  <Link to="/privacy" className="text-small uppercase text-white/80 hover:text-accent transition-colors">
                    Политика конфиденциальности
                  </Link>
                </li>
                <li>
                  <Link to="/privacy#personal-data" className="text-small uppercase text-white/80 hover:text-accent transition-colors">
                    Политика обработки персональных данных
                  </Link>
                </li>
                <li>
                  <Link to="/disclaimer" className="text-small text-white/80 hover:text-accent transition-colors">
                    Отказ от ответственности
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 space-y-4 text-white/65">
          <p className="text-small">
            2026 © Коллегия адвокатов города Москвы «ПРОФЗАЩИТА»
          </p>
          <p className="text-small leading-relaxed">
            Все права на сайт принадлежат Коллегии адвокатов города Москвы «ПРОФЗАЩИТА», любое использование или копирование текстов и материалов, элементов дизайна и оформления допускается только с разрешения правообладателя и только с открытой ссылкой на источник{" "}
            <a href="https://prof-zashita.ru" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-accent transition-colors">
              prof-zashita.ru
            </a>
          </p>
          <p className="text-small">
            Размещенные на сайте материалы носят исключительно информационный характер и не являются рекламой.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
