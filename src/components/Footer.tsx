import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";
import Logo from "./Logo";
import { SITE } from "@/config/site";

const mainLinks = [
  { to: "/", label: "Главная" },
  { to: "/uslugi", label: "Услуги" },
  { to: "/keisy", label: "Кейсы" },
  { to: "/novosti", label: "Новости" },
  { to: "/o-kollegii", label: "О коллегии" },
  { to: "/kontakty", label: "Контакты" }
];

const documentLinks = [
  { to: "/privacy", label: "Политика конфиденциальности" },
  { to: "/privacy#personal-data", label: "Политика обработки персональных данных" },
  { to: "/disclaimer", label: "Отказ от ответственности" }
];

const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-primary text-white">
      <div className="container py-10 sm:py-12 lg:py-14">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-[minmax(0,1.2fr)_repeat(3,minmax(0,0.9fr))] xl:gap-10">
          <div className="min-w-0 space-y-5 xl:pr-6">
            <Link to="/" className="inline-flex pl-1 sm:pl-2 lg:pl-4">
              <Logo variant="footer" />
            </Link>
            <p className="max-w-sm text-small leading-6 text-white/85">
              Опыт. Ответственность. Результат.
            </p>
            <p className="max-w-md text-small leading-6 text-white/65">
              Коллегия адвокатов с многолетним опытом работы в различных областях права.
            </p>
            <p className="text-small leading-6 text-white/60">ИНН: 7743478583</p>
          </div>

          <div className="min-w-0 space-y-4">
            <h3 className="font-serif text-h3-mobile font-semibold md:text-h3">Контакты</h3>
            <ul className="grid gap-4">
              <li className="flex items-start gap-3 text-small leading-6 text-white/80">
                <Phone className="mt-1 h-4 w-4 flex-shrink-0" />
                <div className="flex min-w-0 flex-col items-start gap-1">
                  <a
                    href={`tel:${SITE.phoneRaw}`}
                    className="break-words text-white/85 transition-colors hover:text-accent"
                  >
                    {SITE.phone}
                  </a>
                  <a
                    href={`tel:+${SITE.messengerPhoneRaw}`}
                    className="break-words text-white/85 transition-colors hover:text-accent"
                  >
                    {SITE.messengerPhone}
                  </a>
                </div>
              </li>
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="flex items-start gap-3 text-small leading-6 text-white/80 transition-colors hover:text-accent"
                >
                  <Mail className="mt-1 h-4 w-4 flex-shrink-0" />
                  <span className="min-w-0 break-words">{SITE.email}</span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-small leading-6 text-white/80">
                <MapPin className="mt-1 h-4 w-4 flex-shrink-0" />
                <span className="min-w-0">
                  {SITE.address.city}, {SITE.address.street}
                </span>
              </li>
            </ul>
          </div>

          <div className="min-w-0 space-y-4">
            <h3 className="font-serif text-h3-mobile font-semibold md:text-h3">Навигация</h3>
            <ul className="grid gap-3">
              {mainLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="inline-flex leading-6 text-small text-white/80 transition-colors hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="min-w-0 space-y-4">
            <h3 className="font-serif text-h3-mobile font-semibold md:text-h3">Документы</h3>
            <ul className="grid gap-3">
              {documentLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="inline-flex max-w-full leading-6 text-small text-white/80 transition-colors hover:text-accent"
                  >
                    <span className="break-words">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-white/15 pt-6 sm:mt-10 sm:pt-8">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.4fr)] lg:gap-8">
            <div className="space-y-3 text-white/65">
              <p className="text-small leading-6">
                2026 © Коллегия адвокатов города Москвы «ПРОФЗАЩИТА»
              </p>
              <p className="text-small leading-6">
                Размещенные на сайте материалы носят исключительно информационный характер и не являются рекламой.
              </p>
            </div>

            <p className="max-w-4xl text-small leading-6 text-white/65">
              Все права на сайт принадлежат Коллегии адвокатов города Москвы «ПРОФЗАЩИТА», любое использование или копирование текстов и материалов, элементов дизайна и оформления допускается только с разрешения правообладателя и только с открытой ссылкой на источник{" "}
              <a
                href="https://prof-zashita.ru"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/85 transition-colors hover:text-accent"
              >
                prof-zashita.ru
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
