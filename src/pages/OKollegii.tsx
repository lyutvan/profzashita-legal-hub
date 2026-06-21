import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Award, BookOpen, BriefcaseBusiness, CheckCircle2, FileCheck2, MessageCircle, Scale, ShieldCheck, Target, UsersRound } from "lucide-react";
import { PersonSchema, BreadcrumbSchema } from "@/components/JsonLd";
import { SITE } from "@/config/site";
import { Helmet } from "react-helmet";
import { teamMembers } from "@/data/team";
import TeamSection from "@/components/TeamSection";
import { Button } from "@/components/ui/button";
import legalConsultationEditorial from "@/assets/editorial/legal-consultation-editorial.jpg";

const About = () => {
  return (
    <div className="top-page-mobile-compact min-h-screen flex flex-col">
      <Helmet>
        <title>О коллегии — Профзащита</title>
        <meta name="description" content="Коллегия адвокатов Профзащита: команда профильных адвокатов, адвокатская тайна, судебная практика и внутренний стандарт подготовки правовой позиции." />
        <link rel="canonical" href={`${SITE.url}o-kollegii/`} />
        
        {/* OpenGraph */}
        <meta property="og:title" content="О коллегии адвокатов Профзащита" />
        <meta property="og:description" content="Коллегия адвокатов Профзащита: профильные адвокаты, судебная практика и внутренний стандарт работы по делу." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${SITE.url}o-kollegii/`} />
        <meta property="og:image" content={SITE.ogImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="ru_RU" />
        <meta property="og:site_name" content="Профзащита" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="О коллегии — Профзащита" />
        <meta name="twitter:description" content="Команда адвокатов, судебная практика и понятный порядок работы по делу." />
        <meta name="twitter:image" content={SITE.ogImage} />
      </Helmet>

      <BreadcrumbSchema items={[
        { name: "Главная", url: SITE.url },
        { name: "О коллегии", url: `${SITE.url}o-kollegii/` }
      ]} />

      {teamMembers.map(member => {
        const photoUrl = member.photo ? `${SITE.url}${member.photo.replace(/^\//, "")}` : undefined;

        return (
          <PersonSchema 
            key={member.slug}
            name={member.name}
            jobTitle={member.role}
            image={photoUrl}
            url={`${SITE.url}team/${member.slug}`}
          />
        );
      })}

      <Header />
      
      <main className="flex-1">
        <section className="relative overflow-hidden bg-primary text-primary-foreground section">
          <div className="container">
            <div className="grid items-center gap-10 lg:grid-cols-[1fr_420px]">
              <div className="max-w-3xl">
                <p className="mb-4 text-small font-semibold uppercase tracking-[0.16em] text-accent">
                  Коллегия адвокатов города Москвы
                </p>
                <h1 className="font-serif text-h1-mobile md:text-h1 font-bold leading-tight">
                  Профзащита: адвокаты, которые ведут дело как правовую стратегию
                </h1>
                <p className="mt-6 text-body-mobile md:text-body text-primary-foreground/80 leading-relaxed">
                  Мы объединяем уголовную, гражданскую, семейную, наследственную, жилищную и арбитражную практику,
                  чтобы клиент видел не только отдельное действие адвоката, а понятный план защиты.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Button asChild className="h-12 rounded-md bg-accent px-6 text-white hover:bg-accent/90">
                    <Link to="/kontakty">Обсудить ситуацию</Link>
                  </Button>
                  <Button asChild variant="outline" className="h-12 rounded-md border-white/35 bg-white/5 px-6 text-white hover:bg-white/10">
                    <Link to="#nasha-komanda">Смотреть адвокатов</Link>
                  </Button>
                </div>
              </div>

              <div className="rounded-lg border border-white/15 bg-white/10 p-5 shadow-[0_18px_45px_rgba(0,0,0,0.18)] backdrop-blur">
                <div className="grid gap-3">
                  {[
                    { icon: ShieldCheck, title: "Адвокатская тайна", text: "Конфиденциальность обращения и материалов дела" },
                    { icon: UsersRound, title: "Коллегиальный формат", text: "По сложным делам подключаем профильных специалистов" },
                    { icon: Scale, title: "Судебная практика", text: "Работаем с процессом, доказательствами и исполнением" }
                  ].map((item) => {
                    const Icon = item.icon;

                    return (
                      <div key={item.title} className="rounded-md border border-white/10 bg-white/5 p-4">
                        <div className="flex items-start gap-3">
                          <Icon className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                          <div>
                            <h2 className="text-[16px] font-semibold text-white">{item.title}</h2>
                            <p className="mt-1 text-[13px] leading-relaxed text-white/72">{item.text}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="mx-auto max-w-6xl">
              <div className="section__header max-w-3xl">
                <h2 className="font-serif text-h2-mobile md:text-h2 font-bold mb-4">
                  Как устроена работа коллегии
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  У каждого дела есть ответственный адвокат, но правовая позиция не остается в одиночной рамке:
                  мы проверяем риски, документы и процессуальные шаги внутри команды.
                </p>
              </div>

              <div className="section__content grid gap-5 md:grid-cols-2 lg:grid-cols-4">
                {[
                  { icon: MessageCircle, title: "Первичная оценка", text: "Уточняем факты, документы, сроки и срочность ситуации." },
                  { icon: FileCheck2, title: "Позиция по делу", text: "Формируем юридическую логику, доказательства и процессуальный план." },
                  { icon: BriefcaseBusiness, title: "Ведение процесса", text: "Готовим документы, участвуем в переговорах, следствии и суде." },
                  { icon: BookOpen, title: "Контроль результата", text: "Объясняем последствия решений и сопровождаем дальнейшие шаги." }
                ].map((item) => {
                  const Icon = item.icon;

                  return (
                    <Card key={item.title} className="h-full border-[#e4d4a8] bg-white">
                      <CardContent className="p-5">
                        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-md bg-accent/10">
                          <Icon className="h-5 w-5 text-accent" />
                        </div>
                        <h3 className="text-[18px] font-semibold text-foreground">{item.title}</h3>
                        <p className="mt-2 text-small leading-relaxed text-muted-foreground">{item.text}</p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)]">
                <div className="overflow-hidden rounded-lg border border-[#d8c08b] bg-muted shadow-[0_14px_34px_rgba(15,23,42,0.08)]">
                  <img
                    src={legalConsultationEditorial}
                    alt="Подготовка правовой позиции и анализ документов"
                    className="h-full min-h-[260px] w-full object-cover md:min-h-[360px]"
                    loading="lazy"
                  />
                </div>

                <div className="grid gap-6">
                  <Card className="border-[#d8c08b] bg-[#fbf7ec]">
                    <CardContent className="p-6 md:p-7">
                      <div className="mb-4 flex items-center gap-3">
                        <Target className="h-6 w-6 text-accent" />
                        <h3 className="font-serif text-h3-mobile md:text-h3 font-bold">Задача коллегии</h3>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">
                        Не обещать невозможное, а быстро отделить сильные аргументы от слабых, выбрать рабочую
                        стратегию и последовательно защищать интересы доверителя.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-[#d8c08b] bg-white">
                    <CardContent className="p-6 md:p-7">
                      <h3 className="font-serif text-h3-mobile md:text-h3 font-bold mb-4">Что получает клиент</h3>
                      <ul className="grid gap-3 text-small text-muted-foreground sm:grid-cols-2">
                        {[
                          "Ответственного адвоката по делу",
                          "Понятные этапы и сроки",
                          "Оценку рисков до активных действий",
                          "Подготовленную позицию для суда или переговоров"
                        ].map((item) => (
                          <li key={item} className="flex items-start gap-2">
                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <div id="about-team" className="anchor-offset" aria-hidden="true" />
        <TeamSection 
          id="nasha-komanda"
          title="Адвокаты и специалисты коллегии" 
          subtitle="Карточки показывают статус, стаж и ключевую практику, чтобы вы быстро понимали, кто может подключиться к вашему делу."
        />

        {/* Achievements Section */}
        <section className="section bg-muted/30">
          <div className="container">
            <div className="section__header max-w-3xl mx-auto text-center">
              <h2 className="font-serif text-h2-mobile md:text-h2 font-bold mb-6">
                Профессиональные <span className="text-accent">ориентиры</span>
              </h2>
              <p className="text-muted-foreground">
                То, на чем держится работа адвоката: статус, конфиденциальность, подготовка и ответственность.
              </p>
            </div>

            <div className="section__content grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {[
                "Работа в статусе коллегии адвокатов города Москвы",
                "Соблюдение адвокатской тайны и конфиденциальности обращения",
                "Проверка правовой позиции перед ключевыми процессуальными действиями",
                "Ведение дел с учетом судебной практики и доказательственной базы",
              ].map((achievement, index) => (
                <div key={index} className="flex items-start gap-3 rounded-lg border border-[#e4d4a8] bg-card p-4">
                  <Award className="h-6 w-6 text-accent flex-shrink-0 mt-0.5" />
                  <p className="text-body-mobile md:text-body">{achievement}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
