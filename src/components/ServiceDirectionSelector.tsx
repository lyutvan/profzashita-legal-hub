import { CSSProperties, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Banknote,
  BriefcaseBusiness,
  Building2,
  FileCheck,
  FileText,
  Handshake,
  Home,
  Landmark,
  MapPin,
  Scale,
  ShieldCheck,
  UserRound,
  Users,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";

type AudienceKey = "phys" | "biz";

type ServiceCard = {
  title: string;
  description: string;
  path: string;
  icon: LucideIcon;
};

type ServiceCardStyle = CSSProperties & {
  "--service-card-index": number;
};

const servicesByAudience: Record<AudienceKey, ServiceCard[]> = {
  phys: [
    {
      title: "Уголовные дела",
      description: "Защита на следствии и в суде",
      path: "/services/criminal",
      icon: ShieldCheck,
    },
    {
      title: "Семейные споры",
      description: "Развод, дети, алименты, имущество",
      path: "/services/phys/razvod-razdel-imushchestva",
      icon: Users,
    },
    {
      title: "Наследственные дела",
      description: "Сроки, завещания, раздел наследства",
      path: "/services/phys/nasledstvo",
      icon: Landmark,
    },
    {
      title: "Жилищные споры",
      description: "Выселение, пользование жильём, ЖКУ",
      path: "/services/phys/vyselenie",
      icon: Home,
    },
    {
      title: "Взыскание долгов",
      description: "Расписки, договоры, проценты, убытки",
      path: "/services/phys/vzyskanie-dolgov-i-dogovornye-spory",
      icon: Banknote,
    },
    {
      title: "Банкротство физических лиц",
      description: "Долги, кредиторы, судебная процедура",
      path: "/services/phys/bankrotstvo-fiz-lits",
      icon: FileCheck,
    },
    {
      title: "Трудовые споры",
      description: "Увольнение, зарплата, взыскания",
      path: "/services/phys/trudovye-spory",
      icon: BriefcaseBusiness,
    },
    {
      title: "Земельные споры",
      description: "Границы, пользование, право собственности",
      path: "/services/phys/zemelnye-spory",
      icon: MapPin,
    },
  ],
  biz: [
    {
      title: "Арбитражные споры",
      description: "Поставка, подряд, услуги, аренда",
      path: "/services/biz/arbitrazh-spory-postavka-podryad-uslugi-arenda",
      icon: Scale,
    },
    {
      title: "Взыскание дебиторской задолженности",
      description: "Претензии, суд, исполнительные действия",
      path: "/services/biz/sudebnoe-vzyskanie-dolga-pod-klyuch",
      icon: Banknote,
    },
    {
      title: "Абонентское сопровождение бизнеса",
      description: "Консультации, документы, переговоры",
      path: "/services/biz/abonentka-yurist-na-autsorse",
      icon: Handshake,
    },
    {
      title: "Налоговые споры",
      description: "Проверки, жалобы, защита в суде",
      path: "/services/biz/soprovozhdenie-kameralnyh-i-vyezdnyh-proverok",
      icon: Landmark,
    },
    {
      title: "Банкротство организаций",
      description: "Должник, кредитор, возврат активов",
      path: "/services/biz/bankrotstvo-zashchita-dolzhnika-minimizaciya-riskov",
      icon: Building2,
    },
    {
      title: "Корпоративные споры",
      description: "Конфликты собственников и защита активов",
      path: "/services/biz/korporativnye-spory-i-zashchita-aktivov",
      icon: Users,
    },
    {
      title: "Договорная работа",
      description: "Разработка, экспертиза, переговоры",
      path: "/services/biz/razrabotka-ekspertiza-dogovorov-postavka-podryad-uslugi-arenda",
      icon: FileText,
    },
    {
      title: "Исполнительное производство",
      description: "Приставы, банки, активы должника",
      path: "/services/biz/ispolnenie-resheniya-pristavy-banki-aktivy",
      icon: FileCheck,
    },
  ],
};

const audienceTabs: Array<{ key: AudienceKey; label: string; icon: LucideIcon }> = [
  { key: "phys", label: "Физическим лицам", icon: UserRound },
  { key: "biz", label: "Юридическим лицам", icon: Building2 },
];

const ServiceDirectionSelector = () => {
  const [activeAudience, setActiveAudience] = useState<AudienceKey>("phys");
  const [displayedAudience, setDisplayedAudience] = useState<AudienceKey>("phys");
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    if (activeAudience === displayedAudience) return;

    setIsLeaving(true);
    const timer = window.setTimeout(() => {
      setDisplayedAudience(activeAudience);
      setIsLeaving(false);
    }, 170);

    return () => window.clearTimeout(timer);
  }, [activeAudience, displayedAudience]);

  const services = servicesByAudience[displayedAudience];

  return (
    <section id="napravleniya" className="section service-selector-section">
      <div className="container max-w-[1240px]">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="font-serif text-h2-mobile font-bold leading-tight text-white md:text-h2">
            Выберите направление юридической помощи
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-body-mobile leading-relaxed text-white/72 md:text-body">
            Оказываем квалифицированную юридическую помощь гражданам и бизнесу по уголовным, гражданским,
            семейным, наследственным, жилищным, арбитражным и другим категориям дел.
          </p>
        </div>

        <div className="mx-auto mt-8 grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-2 md:mt-10">
          {audienceTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeAudience === tab.key;

            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveAudience(tab.key)}
                className={`service-selector-tab ${isActive ? "service-selector-tab--active" : ""}`}
                aria-pressed={isActive}
              >
                <Icon className="h-6 w-6" strokeWidth={1.7} aria-hidden="true" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        <div className="mt-8 md:mt-10" aria-live="polite">
          <div
            key={displayedAudience}
            className={`service-selector-grid ${isLeaving ? "service-selector-grid--leaving" : ""}`}
          >
            {services.map((service, index) => {
              const Icon = service.icon;

              return (
                <article
                  key={service.path}
                  className="service-selector-card"
                  style={{ "--service-card-index": index } as ServiceCardStyle}
                >
                  <div className="service-selector-card__icon">
                    <Icon className="h-6 w-6" strokeWidth={1.7} aria-hidden="true" />
                  </div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <Button asChild className="service-selector-card__button">
                    <Link to={service.path}>Подробнее</Link>
                  </Button>
                </article>
              );
            })}
          </div>
        </div>

        <div className="mx-auto mt-8 flex max-w-3xl flex-col items-center text-center md:mt-10">
          <Button asChild size="lg" className="h-auto min-h-14 w-full max-w-[360px] bg-accent px-7 py-3 text-white hover:bg-accent/90">
            <Link to="/kontakty">Получить консультацию адвоката</Link>
          </Button>
          <p className="mt-4 max-w-2xl text-[14px] leading-6 text-white/68 md:text-[16px]">
            Не нашли свою ситуацию? Получите персональную консультацию и правовую оценку вашей ситуации.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ServiceDirectionSelector;
