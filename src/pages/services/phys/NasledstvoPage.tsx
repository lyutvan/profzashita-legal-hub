import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import {
  AlertTriangle,
  Clock3,
  FileSearch,
  Gavel,
  HelpCircle,
  Landmark,
  Mail,
  MapPin,
  Phone,
  Scale,
  Search,
  UserCheck,
  Users
} from "lucide-react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import PriceBlock from "@/components/PriceBlock";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BreadcrumbSchema, FAQPageSchema, LegalServiceSchema, ReviewsSchema } from "@/components/JsonLd";
import { SITE } from "@/config/site";
import { getPriceBySlug } from "@/data/pricing";
import { getServiceHeroImage } from "@/lib/serviceCardImages";
import { teamMembers } from "@/data/team";
import TelegramIcon from "@/components/icons/TelegramIcon";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import MaxIcon from "@/components/icons/MaxIcon";
import ReviewsCarousel from "@/components/ReviewsCarousel";

const NasledstvoPage = () => {
  const [showAllMobileSituations, setShowAllMobileSituations] = useState(false);
  const canonical = new URL("/services/phys/nasledstvo", SITE.url).toString();
  const callHref = `tel:${SITE.phoneRaw}`;
  const contactsHref = "/kontakty";
  const heroImage = getServiceHeroImage("/services/phys/nasledstvo", "phys");
  const pricingData = getPriceBySlug(canonical);
  const priceFrom = pricingData?.priceFrom;
  const priceNote =
    pricingData?.priceNote ??
    "Точная стоимость зависит от характера наследственного спора, числа участников и объема документов.";
  const yandexOrgId = "244880896695";
  const whatsappUrl = SITE.whatsappUrl;
  const telegramUrl = SITE.telegramUrl;
  const maxUrl = SITE.maxUrl;
  const hasSecondaryPhone = Boolean(SITE.messengerPhone && SITE.messengerPhoneRaw);

  const situations = [
    {
      title: "Пропущен срок вступления в наследство",
      description:
        "Если срок в 6 месяцев пропущен, это не означает утрату прав. При наличии уважительных причин его можно восстановить через суд. Оценим перспективы и подготовим правовую позицию.",
      icon: Clock3
    },
    {
      title: "Оспаривание завещания",
      description:
        "Завещание можно оспорить в судебном порядке при наличии законных оснований. Проанализируем документы и оценим перспективы признания его недействительным.",
      icon: FileSearch
    },
    {
      title: "Спор о наследстве между наследниками",
      description:
        "Если между наследниками возник конфликт по поводу состава имущества или долей, мы представим ваши интересы и обеспечим защиту прав в переговорах или суде.",
      icon: Scale
    },
    {
      title: "Раздел имущества между наследниками",
      description:
        "Когда наследников несколько и отсутствует соглашение, раздел имущества осуществляется в судебном порядке. Мы подготовим необходимые документы и добьемся справедливого распределения долей.",
      icon: Landmark
    },
    {
      title: "Оформление наследства через суд",
      description:
        "Если нотариальное оформление невозможно или имеются правовые споры, право собственности устанавливается через суд. Сопроводим процесс от подготовки иска до получения судебного решения.",
      icon: Gavel
    },
    {
      title: "Вступление в наследство",
      description:
        "Поможем оформить наследство в установленном порядке, подготовить документы и взаимодействовать с нотариусом. При необходимости защитим ваши интересы в суде.",
      icon: Users
    },
    {
      title: "Признание наследника недостойным",
      description:
        "В случаях противоправных действий или уклонения от обязанностей возможно признание наследника недостойным через суд. Проанализируем доказательства и выстроим правовую позицию.",
      icon: UserCheck
    },
    {
      title: "Другая сложная ситуация по наследству",
      description:
        "Если ваш случай нестандартный или связан с несколькими спорами одновременно, мы проведем правовой анализ и предложим законный способ защиты ваших интересов.",
      icon: HelpCircle
    }
  ];
  const visibleMobileSituations = showAllMobileSituations ? situations.slice(0, 6) : situations.slice(0, 3);

  const riskItems = [
    {
      title: "Срок вступления в наследство",
      description:
        "Срок принятия наследства составляет 6 месяцев со дня его открытия. Пропуск этого срока не лишает права автоматически, однако требует обращения в суд и подтверждения уважительных причин."
    },
    {
      title: "Судебное восстановление срока",
      description:
        "Восстановление срока возможно только в судебном порядке. Суд оценивает причины пропуска и представленные доказательства. Без грамотно выстроенной позиции риск отказа возрастает."
    },
    {
      title: "Регистрация и распоряжение имуществом",
      description:
        "Имущество может быть зарегистрировано на другого наследника или отчуждено третьим лицам. Это усложняет дальнейшее восстановление прав и увеличивает объем судебной работы."
    },
    {
      title: "Сложность доказательственной базы",
      description:
        "Со временем труднее подтвердить обстоятельства дела, собрать документы и получить необходимые сведения. Ранняя подготовка доказательств укрепляет позицию в суде."
    },
    {
      title: "Увеличение числа участников спора",
      description:
        "При затягивании процесса к делу могут быть привлечены новые наследники, представители, кредиторы или иные заинтересованные лица. Это увеличивает срок и сложность разбирательства."
    },
    {
      title: "Рост процессуальных затрат",
      description:
        "Длительный спор может потребовать проведения экспертиз, дополнительных заявлений и встречных требований. Чем позже начинается работа по делу, тем выше риск увеличения объема процессуальных действий."
    }
  ];

  const processSteps = [
    {
      title: "Анализ ситуации и документов",
      description:
        "Изучаем имеющиеся документы, обстоятельства дела и позицию других участников спора. Определяем правовые основания и оцениваем перспективы"
    },
    {
      title: "Формирование правовой позиции",
      description:
        "Определяем стратегию защиты: восстановление срока, оспаривание завещания, признание права собственности или иные требования. Подготавливаем юридическое обоснование"
    },
    {
      title: "Сбор доказательств и подготовка процессуальных документов",
      description:
        "Формируем доказательственную базу, при необходимости инициируем проведение экспертиз. Подготавливаем исковые заявления, возражения и иные процессуальные документы"
    },
    {
      title: "Представительство в суде",
      description:
        "Представляем интересы доверителя в суде, участвуем в заседаниях, заявляем ходатайства и защищаем правовую позицию"
    },
    {
      title: "Обжалование при необходимости",
      description:
        "При необходимости подготавливаем апелляционные и кассационные жалобы и сопровождаем рассмотрение дела в вышестоящих инстанциях"
    },
    {
      title: "Исполнение решения суда",
      description:
        "Контролируем исполнение судебного решения и сопровождаем последующие юридические действия"
    }
  ];

  const faqItems = [
    {
      question: "Можно ли восстановить срок принятия наследства?",
      answer:
        "Да, если срок пропущен по уважительной причине. Восстановление возможно в судебном порядке при наличии доказательств того, что наследник не знал и не должен был знать об открытии наследства либо не мог обратиться к нотариусу по объективным причинам. Каждая ситуация оценивается индивидуально после анализа документов."
    },
    {
      question: "Обязательно ли обращаться в суд при споре между наследниками?",
      answer:
        "Если между наследниками нет согласия, спор о долях, завещании или порядке раздела имущества решается в судебном порядке. В ряде случаев возможно досудебное урегулирование — если стороны готовы к переговорам. Мы оцениваем возможность мирного решения до подачи иска."
    },
    {
      question: "Можно ли оспорить завещание?",
      answer:
        "Да, если имеются основания полагать, что завещание составлено с нарушением закона. Это может быть недееспособность наследодателя, давление, введение в заблуждение или несоблюдение установленной формы документа. Оспаривание требует серьезной доказательственной базы, включая медицинские документы и, при необходимости, проведение экспертиз."
    },
    {
      question: "Что делать, если имущество уже оформлено на другого наследника?",
      answer:
        "Даже если право собственности зарегистрировано, это не исключает возможности судебного оспаривания. В зависимости от ситуации может быть заявлено требование о восстановлении срока, признании права собственности, признании наследника недостойным либо перераспределении долей."
    },
    {
      question: "Сколько длится наследственный спор?",
      answer:
        "Срок рассмотрения зависит от сложности дела, количества участников и объема доказательств. Как правило, рассмотрение дела в суде первой инстанции занимает несколько месяцев. При подаче апелляции или кассации процесс может увеличиться. Точный прогноз сроков возможен только после анализа документов и позиции других участников спора."
    },
    {
      question: "Сколько стоит ведение наследственного дела?",
      answer:
        "Стоимость зависит от характера спора, объема документов и стадии процесса. На консультации мы анализируем ситуацию и предлагаем формат сопровождения с понятными условиями и объемом работы."
    }
  ];

  const reviews = [
    {
      name: "Светлана М.",
      rating: 5,
      text:
        "Обращалась по наследственному вопросу. Ранее, консультаций было получено около 8 (8 профессиональных адвокатов). Но лишь, Михаил Васковский вник в проблему, ознакомился с материалами и предложил вариант защиты. Спасибо за внимательный и профессиональный подход!"
    },
    {
      name: "Сергей М.",
      rating: 5,
      text:
        "Обращался по вопросу восстановления срока принятия наследства. Нотариус отказал в оформлении прав. Адвокат подробно разъяснил порядок действий, подготовил иск и представлял интересы в суде. Срок восстановлен, право на долю признано. Работа выполнена профессионально и без затягивания"
    },
    {
      name: "Михаил В.",
      rating: 5,
      text:
        "Возник спор между наследниками по разделу квартиры. Договориться не удалось. Адвокат подготовил позицию, организовал оценку имущества и сопровождал процесс до вынесения решения. Суд определил доли. Результатом доволен"
    },
    {
      name: "Екатерина С.",
      rating: 5,
      text:
        "Оспаривали завещание. Дело было сложным и эмоционально тяжелым. Получила четкое объяснение перспектив и возможных рисков. В суде проведена экспертиза, завещание признано недействительным. Отмечаю внимательное отношение и грамотную позицию"
    },
    {
      name: "Олег А.",
      rating: 5,
      text:
        "Необходимо было признать наследника недостойным. Ситуация конфликтная. Адвокат сформировал доказательственную базу и представлял интересы в суде. Решение принято в нашу пользу. Работа проведена аккуратно и профессионально"
    },
    {
      name: "Ольга Б.",
      rating: 5,
      text:
        "Спор о разделе имущества между родственниками. Получила поддержку на всех этапах процесса. Позиция была выстроена четко, документы подготовлены грамотно. Судебное решение соответствует заявленным требованиям"
    }
  ];

  const whyTrustItems = [
    {
      title: "Стратегия под конкретную ситуацию",
      description:
        "Каждое дело отличается составом имущества, количеством наследников и позицией сторон. Мы выстраиваем правовую позицию с учетом ваших целей и возможных рисков",
      icon: FileSearch
    },
    {
      title: "Судебная практика по спорам высокой сложности",
      description:
        "Ведем дела о восстановлении сроков, оспаривании завещаний, разделе имущества и признании наследников недостойными. Готовим позицию так, чтобы она выдерживала проверку в суде",
      icon: Scale
    },
    {
      title: "Работа с доказательственной базой",
      description:
        "Собираем и оформляем документы, формируем доказательства, при необходимости инициируем экспертизы. Позиция строится на юридически значимых фактах",
      icon: Search
    },
    {
      title: "Представительство в судах всех инстанций",
      description:
        "Сопровождаем дело от подготовки иска до получения решения и его исполнения. При необходимости готовим апелляционные и кассационные жалобы",
      icon: Gavel
    },
    {
      title: "Команда коллегии под вашу задачу",
      description:
        "Над делом работает не один адвокат, а команда коллегии. При сложной ситуации подключаются профильные специалисты",
      icon: Users
    },
    {
      title: "Честная оценка перспектив",
      description:
        "До начала судебного спора оцениваем риски и возможный результат. Если перспектив недостаточно — прямо сообщаем об этом",
      icon: AlertTriangle
    }
  ];

  const teamCards = useMemo(() => {
    const membersBySlug = new Map(teamMembers.map((member) => [member.slug, member]));
    return [
      {
        slug: "vaskovsky",
        roleBadge: "Адвокат",
        cta: "Подробнее об адвокате",
        title: "Специализация по наследственным делам:",
        bullets: [
          "Оспаривание завещаний, восстановление сроков принятия наследства, признание прав собственности и раздел наследственного имущества.",
          "Лично формирует правовую позицию по делу и представляет интересы доверителей в судах всех инстанций."
        ]
      },
      {
        slug: "kalabekov",
        roleBadge: "Адвокат",
        cta: "Подробнее об адвокате",
        title: "Специализация по наследственным спорам:",
        bullets: [
          "Судебная защита прав наследников, признание наследника недостойным, сопровождение раздела имущества, защита интересов в конфликтах между наследниками.",
          "Участвует в судебных заседаниях, готовит процессуальные документы и сопровождает дело до исполнения решения суда."
        ]
      },
      {
        slug: "ryzhenko",
        roleBadge: "Юрист",
        cta: "Подробнее об адвокате",
        title: "Специализация по наследственным конфликтам:",
        bullets: [
          "Готовит документы, анализирует доказательства и помогает выстроить позицию по имущественным требованиям наследников.",
          "Сопровождает переговоры, досудебную подготовку и судебные этапы по наследственным спорам."
        ]
      }
    ]
      .map((card) => {
        const member = membersBySlug.get(card.slug);
        if (!member) return null;
        return {
          ...card,
          name: member.name,
          experience: member.experienceText ?? "Стаж 15 лет",
          photo: member.photo
        };
      })
      .filter(
        (
          member
        ): member is {
          slug: string;
          roleBadge: string;
          cta: string;
          title: string;
          bullets: string[];
          name: string;
          experience: string;
          photo: string;
        } => Boolean(member)
      );
  }, []);

  const inheritanceCases = [
    {
      title: "Восстановление срока принятия наследства",
      situation:
        "Доверитель пропустил шестимесячный срок принятия наследства. Нотариус отказал в оформлении прав, имущество было зарегистрировано на другого наследника",
      actions:
        "Мы проанализировали обстоятельства пропуска срока, собрали документы, подтверждающие уважительные причины, подготовили исковое заявление о восстановлении срока и признании права на наследственную долю, представили интересы доверителя в суде",
      result:
        "Срок принятия наследства восстановлен\nПраво доверителя на наследственную долю признано судом",
      scanUrl: "",
      caseUrl: "/keisy"
    },
    {
      title: "Оспаривание завещания",
      situation:
        "Все имущество было передано по завещанию третьему лицу. Наследник по закону поставил под сомнение дееспособность наследодателя на момент составления завещания",
      actions:
        "Мы изучили медицинские документы, подготовили правовую позицию и иск о признании завещания недействительным, инициировали проведение судебной экспертизы и представили доказательства в ходе судебного разбирательства",
      result:
        "Завещание признано недействительным\nНаследование произведено по закону\nДоверитель включен в состав наследников",
      scanUrl: "",
      caseUrl: "/keisy"
    },
    {
      title: "Раздел имущества между наследниками",
      situation:
        "Между несколькими наследниками возник спор о разделе квартиры и иного имущества, соглашение достигнуто не было",
      actions:
        "Мы подготовили иск о разделе наследственного имущества, сформировали позицию с учетом фактического пользования и интересов сторон, обеспечили проведение оценки имущества и представили интересы доверителя в суде",
      result:
        "Определены доли наследников\nУстановлен порядок раздела имущества\nПрава доверителя на долю в наследстве подтверждены судом",
      scanUrl: "",
      caseUrl: "/keisy"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col category-landing-page family-landing-page nasledstvo-compact">
      <Helmet>
        <title>Наследственные дела — адвокат в Москве | Профзащита</title>
        <meta
          name="description"
          content="Адвокаты по наследственным делам в Москве: восстановление срока, оспаривание завещания, раздел наследства, представительство в суде."
        />
        <link rel="canonical" href={canonical} />
      </Helmet>

      <BreadcrumbSchema
        items={[
          { name: "Главная", url: SITE.url },
          { name: "Услуги", url: new URL("/services", SITE.url).toString() },
          { name: "Физическим лицам", url: new URL("/services/phys", SITE.url).toString() },
          { name: "Наследственные дела", url: canonical }
        ]}
      />
      <LegalServiceSchema serviceType="Наследственные дела" url={canonical} priceFrom={priceFrom?.toString()} />
      <FAQPageSchema items={faqItems} url={canonical} />
      <ReviewsSchema
        reviews={reviews.map((review) => ({
          author: review.name,
          rating: review.rating,
          reviewBody: review.text,
          datePublished: "2026-01-01"
        }))}
      />

      <Header />

      <main className="flex-1 services-page services-mobile-compact nasledstvo-compact">
        <section
          className="relative text-white section section--hero"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(180deg, rgba(5,12,28,0.96) 0%, rgba(8,24,46,0.86) 52%, rgba(8,24,46,0.68) 100%)"
            }}
          />
          <div className="container relative z-10">
            <Breadcrumbs
              items={[
                { label: "Услуги", path: "/services" },
                { label: "Физическим лицам", path: "/services/phys" },
                { label: "Наследственные дела" }
              ]}
            />

            <div className="mt-6 max-w-none space-y-4 md:space-y-5">
              <h1 className="category-hero-title font-serif text-h1-mobile md:text-h1 font-bold text-accent">
                <span className="md:hidden">Адвокат по наследственным делам</span>
                <span className="hidden md:inline">Адвокаты по наследственным делам</span>
              </h1>
              <h2 className="text-white text-[24px] leading-tight font-semibold md:text-[28px] lg:text-[30px] lg:whitespace-nowrap">
                <span className="md:hidden">
                  Поможем восстановить срок, оспорить завещание, разделить наследство и защитить имущество в суде.
                </span>
                <span className="hidden md:inline">
                  Наследственный спор или пропущен срок вступления? Защитим ваши права и имущество
                </span>
              </h2>
              <p className="hidden text-white/90 text-[18px] md:block md:text-[26px] leading-[1.2]">
                Ведем наследственные споры любой сложности
              </p>
              <ul className="pl-6 list-disc space-y-2 text-white/90 text-base md:text-lg leading-relaxed marker:text-white/80">
                <li className="md:hidden">Проверим сроки и документы</li>
                <li className="md:hidden">Оценим перспективу спора</li>
                <li className="md:hidden">Подготовим стратегию защиты</li>
                <li className="hidden md:list-item">Восстановим срок принятия наследства</li>
                <li className="hidden md:list-item">Оспорим незаконное завещание</li>
                <li className="hidden md:list-item">Защитим от недобросовестных наследников</li>
                <li className="hidden md:list-item">Представим ваши интересы в суде</li>
              </ul>
              <p className="text-white/90 text-[16px] md:text-[20px] lg:whitespace-nowrap">
                Срок вступления в наследство — <span className="font-semibold">6 месяцев.</span> После его пропуска
                защитить права возможно только через суд.
              </p>
              <div className="grid gap-3 sm:flex sm:flex-wrap">
                <Button
                  asChild
                  size="lg"
                  className="w-full sm:w-auto bg-accent text-white shadow-[0_8px_18px_rgba(201,162,39,0.35)] hover:bg-[#c09a23]"
                >
                  <a href={callHref}>Позвонить адвокату</a>
                </Button>
              </div>
              <p className="text-small text-white/85">
                Обсудим ситуацию и бесплатно оценим перспективу спора
              </p>
              <div className="category-hero-trust flex flex-wrap items-center gap-x-3 gap-y-2 text-small">
                {[
                  { label: "Работаем в Москве и Московской области", tone: "text-accent" },
                  { label: "Судебная практика по спорам высокой сложности", tone: "text-white", mobileHidden: true },
                  { label: "Командная работа коллегии", tone: "text-accent" }
                ].map((item, index) => (
                  <span
                    key={item.label}
                    className={`category-hero-trust-item ${item.mobileHidden ? "hidden md:flex" : "flex"} items-center ${
                      index > 0 ? "before:content-['•'] before:mr-3 before:text-white/50" : ""
                    } ${item.tone}`}
                  >
                    {item.label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="section__header max-w-4xl mx-auto text-center">
              <h2 className="font-serif text-h2-mobile md:text-h2 font-bold">
                <span className="md:hidden">С чем помогаем</span>
                <span className="hidden md:inline">В каких ситуациях мы помогаем по наследственным делам</span>
              </h2>
              <p className="hidden text-muted-foreground md:block">
                Мы ведем наследственные споры и сопровождаем оформление наследства как в досудебном порядке, так и в
                судах всех инстанций
              </p>
            </div>
            <div className="mt-[18px] grid grid-cols-1 gap-4 md:hidden">
              {visibleMobileSituations.map((item) => {
                const Icon = item.icon;
                return (
                  <Card
                    key={item.title}
                    className="h-full rounded-[12px] border border-[#D8C08B] bg-[#F6F1E6] shadow-[0_8px_20px_rgba(60,52,31,0.08)]"
                  >
                    <CardContent className="flex h-full items-start gap-3 p-4 text-left">
                      <Icon className="mt-0.5 h-8 w-8 shrink-0 text-accent" strokeWidth={1.8} />
                      <div className="min-w-0">
                        <h3 className="font-semibold text-[16px] leading-snug text-slate-900">{item.title}</h3>
                        <p className="mt-1 line-clamp-2 text-[13px] leading-snug text-slate-600">
                          {item.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
            <div className="section__content hidden auto-rows-fr grid-cols-1 gap-4 md:grid md:grid-cols-2 md:gap-6 xl:grid-cols-4">
              {situations.map((item) => {
                const Icon = item.icon;
                return (
                  <Card
                    key={item.title}
                    className="h-full rounded-[12px] border border-[#D8C08B] bg-[#F6F1E6] shadow-[0_8px_20px_rgba(60,52,31,0.08)]"
                  >
                    <CardContent className="flex h-full flex-col items-center gap-3 p-6 pt-6 text-center">
                      <Icon className="h-12 w-12 text-accent" strokeWidth={1.8} />
                      <h3 className="font-semibold text-[17px] text-slate-900">{item.title}</h3>
                      <p className="flex-1 text-[14px] leading-relaxed text-slate-600">
                        {item.description}
                      </p>
                      <Button
                        asChild
                        size="lg"
                        className="mt-2 h-12 rounded-[12px] border border-[#b8911f] bg-[#C9A227] px-6 text-[14px] text-white shadow-[0_6px_14px_rgba(111,83,15,0.25)] hover:border-[#a8831a] hover:bg-[#b8911f]"
                      >
                        <a href={contactsHref}>Позвонить адвокату</a>
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
            <div className="mt-4 md:hidden">
              <Button
                type="button"
                variant="outline"
                className="h-11 w-full rounded-[12px] border-[#D8C08B] text-[15px] font-semibold"
                onClick={() => setShowAllMobileSituations((isOpen) => !isOpen)}
              >
                {showAllMobileSituations ? "Свернуть" : "Показать ещё ситуации"}
              </Button>
            </div>
            <div className="mt-8 hidden text-center text-muted-foreground md:block">
              <p>
                За годы практики мы сформировали устойчивую судебную позицию по вопросам восстановления срока,
                оспаривания завещаний и раздела имущества.
              </p>
              <p>На консультации оценим перспективы именно по вашей ситуации.</p>
            </div>
            <div className="mt-6 hidden justify-center px-4 md:flex">
              <div className="inline-flex max-w-full items-start gap-2 text-center text-[18px] font-semibold text-slate-900 md:text-left md:text-[20px]">
                <Phone className="mt-0.5 h-6 w-6 shrink-0 text-accent" />
                <span className="flex min-w-0 flex-col items-center leading-tight sm:flex-row sm:items-baseline sm:gap-2">
                  <span>Обсудить ситуацию по телефону:</span>
                  <a href={callHref} className="mango-phone whitespace-nowrap hover:text-accent">
                    {SITE.phone}
                  </a>
                  {hasSecondaryPhone && (
                    <a href={`tel:+${SITE.messengerPhoneRaw}`} className="whitespace-nowrap hover:text-accent">
                      {SITE.messengerPhone}
                    </a>
                  )}
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="section bg-muted/30">
          <div className="container">
            <div className="section__header max-w-4xl mx-auto text-center">
              <h2 className="font-serif text-h2-mobile md:text-h2 font-bold">Сроки и риски в наследственных спорах</h2>
              <p className="text-muted-foreground">
                Наследственные дела требуют своевременных действий. Позднее обращение может существенно осложнить
                защиту прав и увеличить срок судебного разбирательства.
              </p>
            </div>

            <div className="mt-8 max-w-5xl mx-auto space-y-6">
              {riskItems.map((item, index) => (
                <div key={item.title} className={`flex items-start gap-4 ${index >= 2 ? "hidden md:flex" : ""}`}>
                  <AlertTriangle className="h-6 w-6 text-accent mt-1 shrink-0" />
                  <div>
                    <h3 className="text-[18px] md:text-[32px] font-semibold text-slate-900 leading-tight">{item.title}</h3>
                    <p className="mt-2 text-[14px] md:text-[16px] text-slate-600 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 hidden max-w-3xl mx-auto text-center md:block">
              <h3 className="text-[26px] md:text-[34px] font-semibold text-slate-900">
                Что дает своевременное обращение к адвокату:
              </h3>
              <ul className="mt-5 space-y-2 text-left list-disc list-inside text-[15px] md:text-[18px] text-slate-700">
                <li>Оценку перспектив спора до обращения в суд</li>
                <li>Формирование правовой позиции на ранней стадии</li>
                <li>Сохранность доказательственной базы</li>
                <li>Возможность урегулировать конфликт в досудебном порядке</li>
                <li>Снижение процессуальных рисков</li>
              </ul>
              <p className="mt-8 text-[18px] md:text-[24px] font-semibold text-slate-900">
                Чем раньше вы подключите адвоката, тем больше возможностей сохранить ваши права и имущество
              </p>
              <div className="mt-6">
                <Button
                  asChild
                  size="lg"
                  className="h-auto min-h-12 w-full max-w-[288px] whitespace-normal rounded-[12px] border border-[#b8911f] bg-[#C9A227] px-5 py-3 text-[16px] leading-tight text-white shadow-[0_6px_14px_rgba(111,83,15,0.25)] hover:border-[#a8831a] hover:bg-[#b8911f] sm:w-auto sm:max-w-none"
                >
                  <a href={contactsHref}>Обсудить ситуацию с адвокатом</a>
                </Button>
                <p className="mt-2 text-small text-muted-foreground">
                  Коротко разберем ситуацию и оценим перспективы спора
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="section__header max-w-4xl mx-auto text-center">
              <h2 className="font-serif text-h2-mobile md:text-h2 font-bold">
                Как мы защищаем ваши интересы по наследственным делам
              </h2>
              <p className="text-muted-foreground">
                Защита строится поэтапно — от анализа ситуации до получения судебного решения и сопровождения его
                исполнения
              </p>
            </div>

            <div className="mt-8 border-t border-[#D5D5D5] max-w-6xl mx-auto">
              {processSteps.map((step, index) => (
                <div
                  key={step.title}
                  className={`flex items-start gap-4 md:gap-6 py-6 md:py-7 border-b border-[#D5D5D5] ${
                    index >= 4 ? "hidden md:flex" : ""
                  }`}
                >
                  <div className="h-12 w-12 rounded-full border border-[#D8C08B] bg-[#F7F2E8] flex shrink-0 items-center justify-center text-[14px] font-semibold text-accent">
                    {index + 1}
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-[15px] md:text-[16px] font-semibold text-slate-900">{step.title}</h3>
                    <p className="text-[13px] md:text-[14px] text-slate-600 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 hidden text-center text-muted-foreground space-y-2 md:block">
              <p>
                Понимание порядка действий позволяет выстроить защиту последовательно и снизить процессуальные риски.
              </p>
              <p>
                Первый шаг — <span className="text-slate-900 font-semibold">профессиональная оценка вашей ситуации</span>
              </p>
            </div>
            <div className="mt-7 hidden justify-center px-4 md:flex">
              <div className="inline-flex max-w-full items-start gap-2 text-center text-[18px] font-semibold text-slate-900 md:text-left md:text-[20px]">
                <Phone className="mt-0.5 h-6 w-6 shrink-0 text-accent" />
                <span className="flex min-w-0 flex-col items-center leading-tight sm:flex-row sm:items-baseline sm:gap-2">
                  <span>Обсудить ситуацию по телефону:</span>
                  <a href={callHref} className="mango-phone whitespace-nowrap hover:text-accent">
                    {SITE.phone}
                  </a>
                  {hasSecondaryPhone && (
                    <a href={`tel:+${SITE.messengerPhoneRaw}`} className="whitespace-nowrap hover:text-accent">
                      {SITE.messengerPhone}
                    </a>
                  )}
                </span>
              </div>
            </div>

          </div>
        </section>

        <section className="section bg-muted/30">
          <div className="container">
            <div className="section__header max-w-4xl mx-auto text-center">
              <h2 className="font-serif text-h2-mobile md:text-h2 font-bold">
                Примеры судебной практики по наследственным делам
              </h2>
              <p className="text-muted-foreground">
                За годы работы мы представляли интересы доверителей в спорах о восстановлении сроков, оспаривании
                завещаний и разделе наследственного имущества
              </p>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
              {inheritanceCases.map((caseItem, index) => (
                <Card
                  key={`${caseItem.title}-${index}`}
                  className="h-full rounded-[14px] border border-[#D8C08B] bg-[#F8F4EA] shadow-[0_6px_16px_rgba(60,52,31,0.08)]"
                >
                  <CardContent className="p-6 h-full flex flex-col">
                    {caseItem.scanUrl ? (
                      <div className="flex justify-center">
                        <div className="h-24 w-24 md:h-28 md:w-28 border border-[#D8C08B] bg-white text-[11px] text-slate-500 flex items-center justify-center text-center leading-tight overflow-hidden">
                          <img
                            src={caseItem.scanUrl}
                            alt={`Скан решения: ${caseItem.title}`}
                            className="h-full w-full object-contain"
                            loading="lazy"
                          />
                        </div>
                      </div>
                    ) : null}
                    <h3 className={`${caseItem.scanUrl ? "mt-4 " : ""}text-[15px] font-semibold text-slate-900`}>
                      {caseItem.title}
                    </h3>
                    <div className="mt-4 text-[13px] text-slate-700">
                      <div className="text-slate-500">Ситуация:</div>
                      <div className="font-semibold text-slate-900">{caseItem.situation}</div>
                    </div>
                    <div className="mt-3 text-[13px] text-slate-700">
                      <div className="text-slate-500">Что сделали:</div>
                      <div className="font-semibold text-slate-900">{caseItem.actions}</div>
                    </div>
                    <div className="mt-3 text-[13px] text-slate-700">
                      <div className="text-slate-500">Результат:</div>
                      <div className="font-semibold text-slate-900 whitespace-pre-line">{caseItem.result}</div>
                    </div>
                    <div className="mt-auto pt-5">
                      <Button
                        asChild
                        size="sm"
                        className="h-10 w-full rounded-[10px] border border-[#b8911f] bg-[#C9A227] px-4 text-[13px] text-white shadow-[0_6px_14px_rgba(111,83,15,0.2)] hover:border-[#a8831a] hover:bg-[#b8911f]"
                      >
                        <Link to={caseItem.caseUrl}>Подробнее о кейсе</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-10 text-center text-muted-foreground space-y-2">
              <p>Каждое дело имеет свои особенности. Перспективы можно оценить только после анализа документов</p>
              <div className="pt-2">
                <Button
                  asChild
                  size="lg"
                  className="h-12 rounded-[12px] border border-[#b8911f] bg-[#C9A227] px-7 text-[16px] text-white shadow-[0_6px_14px_rgba(111,83,15,0.25)] hover:border-[#a8831a] hover:bg-[#b8911f]"
                >
                  <a href={contactsHref}>Позвонить адвокату</a>
                </Button>
                <p className="mt-2 text-small text-muted-foreground">Обсудим ситуацию и бесплатно оценим перспективу дела</p>
              </div>
            </div>
          </div>
        </section>

        {teamCards.length > 0 && (
          <section className="section md:hidden">
            <div className="container">
              <div className="section__header text-center">
                <h2 className="font-serif text-h2-mobile font-bold">Адвокаты по наследственным делам</h2>
                <p className="text-muted-foreground">
                  Дело ведёт конкретный специалист, который анализирует документы и формирует позицию для суда.
                </p>
              </div>
              <div className="section__content grid gap-4">
                {teamCards.slice(0, 3).map((member) => (
                  <Card
                    key={member.slug}
                    className="overflow-hidden rounded-[14px] border border-[#D8C08B] bg-white shadow-[0_8px_22px_rgba(60,52,31,0.08)]"
                  >
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        <div className="h-[132px] w-[104px] shrink-0 overflow-hidden rounded-[10px] border border-[#E6DDCC] bg-[#F8F4EA]">
                          <img
                            src={member.photo}
                            alt={member.name}
                            className="h-full w-full object-cover object-top"
                            loading="lazy"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="font-semibold leading-tight text-slate-950">{member.name}</h3>
                          <span className="mt-2 inline-flex rounded-full bg-[#C9A227] px-3 py-1 text-[11px] font-semibold text-white">
                            {member.roleBadge}
                          </span>
                          <p className="mt-2 text-[13px] font-medium text-slate-700">{member.experience}</p>
                          <p className="mt-2 line-clamp-3 text-[13px] leading-snug text-slate-600">
                            {member.bullets[0]}
                          </p>
                        </div>
                      </div>
                      <Button
                        asChild
                        size="lg"
                        className="mt-4 h-11 w-full rounded-[12px] border border-[#b8911f] bg-[#C9A227] text-[14px] font-semibold text-white shadow-[0_6px_14px_rgba(111,83,15,0.2)] hover:border-[#a8831a] hover:bg-[#b8911f]"
                      >
                        <Link to={`/team/${member.slug}`}>{member.cta}</Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="mt-5 rounded-[16px] bg-primary p-5 text-white">
                <p className="font-serif text-[23px] font-bold leading-tight text-accent">
                  Нужно понять перспективу?
                </p>
                <p className="mt-2 text-[14px] leading-relaxed text-white/85">
                  Позвоните — коротко разберём ситуацию, сроки и документы.
                </p>
                <Button
                  asChild
                  size="lg"
                  className="mt-4 h-11 w-full rounded-[12px] border border-[#b8911f] bg-[#C9A227] text-[14px] font-semibold text-white hover:border-[#a8831a] hover:bg-[#b8911f]"
                >
                  <a href={callHref}>Позвонить адвокату</a>
                </Button>
              </div>
            </div>
          </section>
        )}

        <section className="section bg-muted/30 md:hidden">
          <div className="container">
            <div className="section__header text-center">
              <h2 className="font-serif text-h2-mobile font-bold">Отзывы клиентов</h2>
              <p className="text-muted-foreground">
                Люди обращаются к нам, когда наследственный спор уже стал конфликтом или требует суда.
              </p>
            </div>
            <div className="mt-5 flex justify-center">
              <iframe
                src={`https://yandex.ru/sprav/widget/rating-badge/${yandexOrgId}?type=rating`}
                width="150"
                height="50"
                frameBorder="0"
                title="Рейтинг Профзащита в Яндекс.Картах"
                className="max-w-full"
              ></iframe>
            </div>
            <ReviewsCarousel reviews={reviews} />
            <Button
              asChild
              size="lg"
              className="mt-5 h-12 w-full rounded-[12px] border border-[#b8911f] bg-[#C9A227] text-[15px] font-semibold text-white shadow-[0_8px_18px_rgba(201,162,39,0.24)] hover:border-[#a8831a] hover:bg-[#b8911f]"
            >
              <a href="https://yandex.ru/maps/org/244880896695/reviews/" target="_blank" rel="noopener noreferrer">
                Посмотреть все отзывы
              </a>
            </Button>
          </div>
        </section>

        {teamCards.length > 0 && (
          <section className="section hidden md:block">
            <div className="container">
              <div className="section__header max-w-4xl mx-auto text-center">
                <h2 className="font-serif text-h2-mobile md:text-h2 font-bold">Кто будет вести ваше дело</h2>
                <p className="text-muted-foreground">
                  Наследственные дела сопровождают практикующие адвокаты с опытом судебной защиты в данной категории
                  споров.
                </p>
              </div>
              <div className="section__content grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
                {teamCards.map((member) => (
                  <Card
                    key={member.slug}
                    className="h-full w-full rounded-[12px] border border-[#C9A227] bg-white shadow-[0_8px_20px_rgba(60,52,31,0.08)]"
                  >
                    <CardContent className="p-6 h-full flex flex-col items-center text-center">
                      <div className="w-full overflow-hidden rounded-[10px] border border-[#E6DDCC] bg-white">
                        <img
                          src={member.photo}
                          alt={member.name}
                          className="h-[300px] w-full object-cover object-top md:h-[340px]"
                          loading="lazy"
                        />
                      </div>
                      <h3 className="mt-5 font-semibold text-[20px] text-slate-900">{member.name}</h3>
                      <span className="mt-3 inline-flex items-center rounded-full bg-[#C9A227] px-4 py-1 text-[12px] font-semibold text-slate-900">
                        {member.roleBadge}
                      </span>
                      <div className="mt-4 text-[15px] text-slate-700">{member.experience}</div>
                      <div className="mt-5 w-full text-left">
                        <div className="text-[16px] font-semibold text-slate-900">{member.title}</div>
                        <ul className="mt-3 space-y-3 text-[14px] text-slate-700 leading-relaxed list-disc list-inside">
                          {member.bullets.map((bullet) => (
                            <li key={bullet}>{bullet}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="mt-auto w-full pt-6">
                        <Button
                          asChild
                          size="lg"
                          className="w-full h-12 rounded-[12px] border border-[#b8911f] bg-[#C9A227] text-[14px] text-white shadow-[0_6px_14px_rgba(111,83,15,0.25)] hover:border-[#a8831a] hover:bg-[#b8911f]"
                        >
                          <Link to={`/team/${member.slug}`}>{member.cta}</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="mt-10 text-center text-muted-foreground space-y-2">
                <p>Сопровождение осуществляется адвокатами коллегии.</p>
                <p>В зависимости от сложности дела к работе могут привлекаться профильные специалисты.</p>
                <p>
                  Ваше дело ведет конкретный адвокат, лично участвующий в судебных заседаниях и формирующий правовую
                  позицию.
                </p>
                <p>
                  Первый шаг — <span className="text-slate-900 font-semibold">консультация по телефону.</span>
                </p>
              </div>
              <div className="mt-7 flex justify-center">
                <Button
                  asChild
                  size="lg"
                  className="h-12 rounded-[12px] border border-[#b8911f] bg-[#C9A227] px-7 text-[16px] text-white shadow-[0_6px_14px_rgba(111,83,15,0.25)] hover:border-[#a8831a] hover:bg-[#b8911f]"
                >
                  <a href={contactsHref}>Позвонить адвокату</a>
                </Button>
              </div>
              <p className="mt-2 text-small text-muted-foreground text-center">Коротко разберем вашу ситуацию и оценим перспективы защиты</p>
            </div>
          </section>
        )}

        <section className="section hidden bg-muted/30 md:block">
          <div className="container">
            <div className="section__header max-w-4xl mx-auto text-center">
              <h2 className="font-serif text-h2-mobile md:text-h2 font-bold">Отзывы клиентов</h2>
              <p className="text-muted-foreground">
                Мы понимаем, что наследственные споры часто связаны с семейными конфликтами и сильным эмоциональным
                напряжением. Ниже — мнения доверителей, которые прошли этот процесс вместе с нами. Персональные данные
                не раскрываются
              </p>
            </div>
            <div className="mt-6 flex justify-center">
              <iframe
                src={`https://yandex.ru/sprav/widget/rating-badge/${yandexOrgId}?type=rating`}
                width="150"
                height="50"
                frameBorder="0"
                title="Рейтинг Профзащита в Яндекс.Картах"
                className="max-w-full"
              ></iframe>
            </div>
            <ReviewsCarousel reviews={reviews} />
            <div className="mt-8 text-center text-muted-foreground">
              Вы можете задать свой вопрос по телефону и понять перспективы именно по вашей ситуации
            </div>
            <div className="mt-6 flex justify-center px-4">
              <div className="inline-flex max-w-full items-start gap-2 text-center text-[18px] font-semibold text-slate-900 md:text-left md:text-[20px]">
                <Phone className="mt-0.5 h-6 w-6 shrink-0 text-accent" />
                <span className="flex min-w-0 flex-col items-center leading-tight sm:flex-row sm:items-baseline sm:gap-2">
                  <span>Обсудить ситуацию по телефону:</span>
                  <a href={callHref} className="mango-phone whitespace-nowrap hover:text-accent">
                    {SITE.phone}
                  </a>
                  {hasSecondaryPhone && (
                    <a href={`tel:+${SITE.messengerPhoneRaw}`} className="whitespace-nowrap hover:text-accent">
                      {SITE.messengerPhone}
                    </a>
                  )}
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <div className="mb-4 text-center">
                <h2 className="font-serif text-h3-mobile md:text-h3 font-bold text-slate-900">
                  Стоимость сопровождения
                </h2>
                <p className="mt-2 text-muted-foreground">
                  {priceNote}
                </p>
              </div>
              <PriceBlock
                showTitle={false}
                priceFrom={priceFrom}
                priceNote={priceNote}
                fallbackTitle="По договоренности"
                fallbackNote="Точную стоимость назовем после изучения документов и оценки наследственного спора."
              />
            </div>
          </div>
        </section>

        <section className="section hidden md:block">
          <div className="container">
            <div className="section__header max-w-4xl mx-auto text-center">
              <h2 className="font-serif text-h2-mobile md:text-h2 font-bold">
                Почему нам доверяют ведение наследственных споров
              </h2>
              <p className="text-muted-foreground">
                Наследственные споры требуют точной правовой позиции и аккуратной работы с доказательствами. Мы
                выстраиваем защиту системно — от анализа документов до исполнения судебного решения
              </p>
            </div>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              {whyTrustItems.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="text-center px-3">
                    <div className="mx-auto h-14 w-14 flex items-center justify-center">
                      <Icon className="h-10 w-10 text-accent" strokeWidth={1.6} />
                    </div>
                    <h3 className="mt-4 text-[15px] md:text-[16px] font-semibold text-slate-900">{item.title}</h3>
                    <p className="mt-2 text-[13px] md:text-[14px] text-slate-600 leading-relaxed">{item.description}</p>
                  </div>
                );
              })}
            </div>
            <div className="mt-10 text-center text-muted-foreground space-y-2">
              <p>Перед началом работы важно проанализировать документы и фактические обстоятельства дела.</p>
              <p>Первый шаг — консультация и оценка перспектив</p>
            </div>
            <div className="mt-7 flex justify-center">
              <Button
                asChild
                size="lg"
                className="h-12 rounded-[12px] border border-[#b8911f] bg-[#C9A227] px-7 text-[16px] text-white shadow-[0_6px_14px_rgba(111,83,15,0.25)] hover:border-[#a8831a] hover:bg-[#b8911f]"
              >
                <a href={contactsHref}>Позвонить адвокату</a>
              </Button>
            </div>
            <p className="mt-2 text-small text-muted-foreground text-center">Коротко разберем вашу ситуацию и оценим перспективы</p>
          </div>
        </section>

        <section className="section bg-muted/30 py-10 md:py-16">
          <div className="container">
            <div className="section__header max-w-4xl mx-auto text-center">
              <h2 className="font-serif text-[30px] font-bold leading-tight md:text-h2">
                FAQ — Частые вопросы по наследственным делам
              </h2>
            </div>
            <Accordion type="single" collapsible className="section__content max-w-5xl mx-auto space-y-3 md:space-y-4">
              {faqItems.map((item, index) => (
                <AccordionItem
                  key={item.question}
                  value={`faq-${index}`}
                  className={`relative overflow-hidden rounded-xl border border-slate-200 px-4 transition-all hover:border-[#C9A227]/80 data-[state=open]:border-[#C9A227] before:absolute before:inset-y-3 before:left-0 before:w-1 before:rounded-full before:bg-transparent before:content-[''] before:transition-colors hover:before:bg-[#C9A227]/70 data-[state=open]:before:bg-[#C9A227] md:px-6 ${
                    index >= 4 ? "hidden md:block" : ""
                  }`}
                >
                  <AccordionTrigger className="family-accordion-trigger py-3 text-left text-[15px] leading-snug hover:no-underline hover:text-slate-900 data-[state=open]:text-[#b8911f] md:py-4 md:text-base">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="pb-3 text-[14px] leading-relaxed text-muted-foreground md:pb-4 md:text-base">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            <div className="mt-6 text-center space-y-3 md:mt-8 md:space-y-4">
              <p className="text-[14px] leading-relaxed text-muted-foreground md:text-base">
                Обращение в суд без анализа документов может увеличить сроки и расходы.
              </p>
              <Button
                asChild
                size="lg"
                className="h-11 rounded-[12px] border border-[#b8911f] bg-[#C9A227] px-5 text-[15px] text-white shadow-[0_6px_14px_rgba(111,83,15,0.25)] hover:border-[#a8831a] hover:bg-[#b8911f] md:h-12 md:px-7 md:text-[16px]"
              >
                <a href={contactsHref}>Позвонить и задать вопрос</a>
              </Button>
              <p className="text-small text-muted-foreground">Поможем понять перспективы спора до обращения в суд.</p>
            </div>
          </div>
        </section>

        <section className="section bg-white md:hidden">
          <div className="container">
            <div className="rounded-[16px] border border-[#D8C08B] bg-white p-6 shadow-[0_10px_26px_rgba(60,52,31,0.07)]">
              <h2 className="font-serif text-[30px] font-bold leading-tight text-slate-950">Контакты</h2>

              <div className="mt-6 space-y-4">
                <div className="flex items-start gap-4">
                  <Phone className="h-7 w-7 shrink-0 text-accent" />
                  <div className="flex min-w-0 flex-col items-start text-[18px] font-medium leading-snug">
                    <a
                      href={callHref}
                      className="mango-phone whitespace-nowrap text-slate-950 hover:text-accent"
                    >
                      {SITE.phone}
                    </a>
                    {hasSecondaryPhone && (
                      <a
                        href={`tel:+${SITE.messengerPhoneRaw}`}
                        className="whitespace-nowrap text-slate-950 hover:text-accent"
                      >
                        {SITE.messengerPhone}
                      </a>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Mail className="h-7 w-7 shrink-0 text-accent" />
                  <a
                    href={`mailto:${SITE.email}`}
                    className="min-w-0 break-words text-[18px] font-medium leading-snug text-slate-950 hover:text-accent"
                  >
                    {SITE.email}
                  </a>
                </div>

                <div className="flex items-start gap-4">
                  <MapPin className="mt-0.5 h-7 w-7 shrink-0 text-accent" />
                  <p className="text-[18px] font-medium leading-snug text-slate-950">
                    {SITE.address.city}, {SITE.address.street}
                  </p>
                </div>
              </div>

              <div className="mt-8">
                <p className="text-[17px] font-medium leading-tight text-slate-950">Или напишите нам напрямую:</p>
                <div className="mt-5 flex flex-wrap items-center gap-4">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Написать в WhatsApp"
                    className="social-icon social-icon--whatsapp shadow-sm transition-opacity hover:opacity-90"
                  >
                    <WhatsAppIcon size={48} variant="original" className="social-icon__image" />
                  </a>
                  <a
                    href={telegramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Написать в Telegram"
                    className="social-icon bg-[#229ED9] text-white shadow-sm transition-colors hover:bg-[#1d8fc6]"
                  >
                    <TelegramIcon size={26} className="social-icon__svg" />
                  </a>
                  <a
                    href={maxUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="MAX"
                    className="social-icon social-icon--max shadow-sm transition-opacity hover:opacity-90"
                  >
                    <MaxIcon size={48} className="social-icon__image" />
                  </a>
                  <a
                    href={`mailto:${SITE.email}`}
                    aria-label="Написать на email"
                    className="social-icon border border-slate-200 bg-white text-accent shadow-sm transition-colors hover:border-[#C9A227] hover:text-[#b8911f]"
                  >
                    <Mail className="h-6 w-6" />
                  </a>
                </div>
              </div>

              <a
                href="https://yandex.ru/maps/-/CHXU5RzE"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 flex items-center justify-center whitespace-nowrap rounded-2xl bg-primary px-4 py-3 text-[15px] font-semibold text-white"
              >
                Открыть в Яндекс.Картах
              </a>
            </div>
          </div>
        </section>

        <section className="section hidden md:block">
          <div className="container">
            <div className="grid grid-cols-1 gap-10">
              <div className="max-w-2xl space-y-5 md:max-w-3xl">
                <h2 className="font-serif text-h2-mobile md:text-h2 font-bold">
                  <span className="md:hidden">Не откладывайте наследственный спор</span>
                  <span className="hidden md:inline">
                    Получите профессиональную оценку перспектив по вашему наследственному спору
                  </span>
                </h2>
                <p className="text-base leading-relaxed text-slate-700 md:hidden">
                  Чем раньше адвокат изучит документы, тем выше шанс сохранить имущество и не потерять сроки.
                </p>
                <p className="hidden text-base leading-relaxed text-slate-700 md:block md:text-lg">
                  Позвоните нам — адвокат по наследственным спорам разберёт вашу ситуацию и прямо скажет, какие есть
                  варианты защиты и стоит ли обращаться в суд.
                </p>
                <p className="hidden text-base leading-relaxed text-slate-700 md:block md:text-lg">
                  Если перспектив нет, вы узнаете об этом сразу — без навязывания услуг и лишних расходов.
                </p>
                <div className="grid gap-3 md:hidden">
                  <Button
                    asChild
                    size="lg"
                    className="h-12 w-full rounded-[12px] border border-[#b8911f] bg-[#C9A227] text-[15px] font-semibold text-white shadow-[0_8px_18px_rgba(201,162,39,0.28)] hover:border-[#a8831a] hover:bg-[#b8911f]"
                  >
                    <a href={callHref}>Позвонить</a>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="h-12 w-full rounded-[12px] border-[#D8C08B] text-[15px] font-semibold"
                  >
                    <a href={contactsHref}>Задать вопрос</a>
                  </Button>
                </div>
                <div className="pt-2">
                  <p className="text-lg md:text-xl font-semibold text-slate-900">Или напишите нам напрямую:</p>
                  <div className="mt-3 flex items-center gap-4">
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Написать в WhatsApp"
                      className="social-icon social-icon--whatsapp shadow-sm transition-opacity hover:opacity-90"
                    >
                      <WhatsAppIcon size={48} variant="original" className="social-icon__image" />
                    </a>
                    <a
                      href={telegramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Написать в Telegram"
                      className="inline-flex h-[52px] w-[52px] items-center justify-center rounded-full bg-[#229ED9] text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-[#1d8fc6]"
                    >
                      <TelegramIcon size={30} className="h-[30px] w-[30px] -translate-y-px" />
                    </a>
                    <a
                      href={maxUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="MAX"
                      className="social-icon social-icon--max shadow-sm transition-opacity hover:opacity-90"
                    >
                      <MaxIcon size={48} className="social-icon__image" />
                    </a>
                    <a
                      href={`mailto:${SITE.email}`}
                      aria-label="Написать на email"
                      className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white text-accent shadow-sm transition-colors hover:border-[#C9A227] hover:text-[#b8911f]"
                    >
                      <Mail className="h-6 w-6" />
                    </a>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        <section className="section hidden bg-muted/30 md:block">
          <div className="container">
            <div className="section__header max-w-3xl">
              <h2 className="font-serif text-h2-mobile md:text-h2 font-bold">Контакты</h2>
            </div>
            <div className="section__content grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] gap-8">
              <div className="space-y-4">
                <Card className="border-border">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <Phone className="h-6 w-6 text-accent" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Телефон</h3>
                        <div className="flex flex-col items-start">
                          <a href={callHref} className="mango-phone text-accent hover:underline">
                            {SITE.phone}
                          </a>
                          {hasSecondaryPhone && (
                            <a href={`tel:+${SITE.messengerPhoneRaw}`} className="text-accent hover:underline">
                              {SITE.messengerPhone}
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-border">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <Mail className="h-6 w-6 text-accent" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Почта</h3>
                        <a href={`mailto:${SITE.email}`} className="text-accent hover:underline">
                          {SITE.email}
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-border">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <MapPin className="h-6 w-6 text-accent" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Адрес</h3>
                        <p className="text-accent">
                          {SITE.address.city}, {SITE.address.street}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <div className="pt-1">
                  <iframe
                    src={`https://yandex.ru/sprav/widget/rating-badge/${yandexOrgId}?type=rating`}
                    width="150"
                    height="50"
                    frameBorder="0"
                    title="Рейтинг Профзащита в Яндекс.Картах"
                    className="max-w-full"
                  ></iframe>
                </div>
              </div>
              <div className="aspect-video rounded-xl border border-border overflow-hidden">
                <iframe
                  src="https://yandex.ru/map-widget/v1/?z=12&ol=biz&oid=244880896695"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  title="Карта офиса Профзащита"
                  className="w-full h-full"
                ></iframe>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default NasledstvoPage;
