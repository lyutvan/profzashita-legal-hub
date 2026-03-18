import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";
import Logo from "./Logo";
import { SITE } from "@/config/site";

const mainLinks = [
  { to: "/", label: "Главная" },
  { to: "/uslugi", label: "Услуги" },
  { to: "/tseny", label: "Цены" },
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
      <div className="w-full px-1 py-8 sm:px-2 sm:py-10 md:px-3 lg:px-4 lg:py-12 xl:px-5 2xl:px-6">
        <div className="grid grid-cols-1 gap-x-6 gap-y-6 md:grid-cols-2 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,0.85fr)] lg:gap-x-8 xl:grid-cols-[minmax(0,1.5fr)_minmax(0,0.95fr)_minmax(0,0.78fr)_minmax(0,1fr)] xl:gap-x-10 xl:gap-y-8">
          <div className="min-w-0">
            <div className="flex h-full flex-col gap-4">
              <Link to="/" className="inline-flex self-start">
                <Logo variant="footer" />
              </Link>

              <div className="grid gap-2 md:gap-3">
                <p className="text-small leading-7 text-white/90">
                  Опыт. Ответственность. Результат.
                </p>
                <p className="text-small leading-7 text-white/72">
                  Коллегия адвокатов с многолетним опытом работы в различных областях права.
                </p>
              </div>

              <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 pt-2 text-small leading-7 text-white/62">
                <span>ИНН: 7743478583</span>
                <span className="hidden h-1 w-1 rounded-full bg-white/30 sm:inline-flex" aria-hidden="true" />
                <span>{SITE.address.city}</span>
              </div>
            </div>
          </div>

          <div className="min-w-0">
            <div className="flex h-full flex-col gap-5">
              <h3 className="font-serif text-h3-mobile font-semibold md:text-h3">Контакты</h3>
              <ul className="grid gap-5">
                <li className="flex items-start gap-3 text-small leading-7 text-white/82">
                  <Phone className="mt-1 h-4 w-4 flex-shrink-0 text-accent" />
                  <div className="flex min-w-0 flex-col items-start gap-1.5">
                    <a
                      href={`tel:${SITE.phoneRaw}`}
                      className="break-words text-white/88 transition-colors hover:text-accent"
                    >
                      {SITE.phone}
                    </a>
                    <a
                      href={`tel:+${SITE.messengerPhoneRaw}`}
                      className="break-words text-white/88 transition-colors hover:text-accent"
                    >
                      {SITE.messengerPhone}
                    </a>
                  </div>
                </li>
                <li>
                  <a
                    href={`mailto:${SITE.email}`}
                    className="flex items-start gap-3 text-small leading-7 text-white/82 transition-colors hover:text-accent"
                  >
                    <Mail className="mt-1 h-4 w-4 flex-shrink-0 text-accent" />
                    <span className="min-w-0 break-words">{SITE.email}</span>
                  </a>
                </li>
                <li className="flex items-start gap-3 text-small leading-7 text-white/82">
                  <MapPin className="mt-1 h-4 w-4 flex-shrink-0 text-accent" />
                  <span className="min-w-0 break-words">
                    {SITE.address.city}, {SITE.address.street}
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="min-w-0">
            <div className="flex h-full flex-col gap-5">
              <h3 className="font-serif text-h3-mobile font-semibold md:text-h3">Навигация</h3>
              <ul className="grid gap-3.5">
                {mainLinks.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="inline-flex leading-7 text-small text-white/82 transition-colors hover:text-accent"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="min-w-0 md:col-span-2 lg:col-span-1 xl:col-span-1">
            <div className="flex h-full flex-col gap-5">
              <h3 className="font-serif text-h3-mobile font-semibold md:text-h3">Документы</h3>
              <ul className="grid gap-3.5">
                {documentLinks.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="inline-flex max-w-full leading-7 text-small text-white/82 transition-colors hover:text-accent"
                    >
                      <span className="break-words">{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-6 border-t border-white/15 pt-5 sm:mt-8 sm:pt-6">
          <div className="grid grid-cols-1 gap-x-6 gap-y-3 md:grid-cols-2 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,0.95fr)_minmax(0,1.6fr)] lg:gap-x-8">
            <div className="text-white/65">
              <p className="text-small leading-7">
                2026 © Коллегия адвокатов города Москвы «ПРОФЗАЩИТА»
              </p>
            </div>

            <div className="text-white/65">
              <p className="text-small leading-7">
                Размещенные на сайте материалы носят исключительно информационный характер и не являются рекламой.
              </p>
            </div>

            <p className="text-small leading-7 text-white/65 md:col-span-2 lg:col-span-1">
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
