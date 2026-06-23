import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { ArrowRight, Building2, Scale, Users } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { BreadcrumbSchema } from "@/components/JsonLd";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SITE } from "@/config/site";

const serviceDirections = [
  {
    title: "Уголовные дела",
    description: "Защита при задержании, допросе, обыске, на следствии и в суде. Отдельные страницы — по статьям УК РФ.",
    href: "/services/criminal",
    icon: Scale,
    cta: "Перейти к уголовным делам"
  },
  {
    title: "Физическим лицам",
    description: "Наследственные, семейные, жилищные, имущественные и договорные споры, а также защита прав потребителей.",
    href: "/services/phys",
    icon: Users,
    cta: "Выбрать услугу"
  },
  {
    title: "Бизнесу",
    description: "Арбитраж, взыскание задолженности, налоговые и корпоративные споры, банкротство, договоры и 115-ФЗ.",
    href: "/services/biz",
    icon: Building2,
    cta: "Перейти к услугам для бизнеса"
  }
] as const;

const Services = () => (
  <div className="min-h-screen flex flex-col bg-background">
    <Helmet>
      <title>Юридические услуги в Москве — Профзащита</title>
      <meta
        name="description"
        content="Юридические услуги коллегии адвокатов «Профзащита» в Москве: уголовные, гражданские, семейные, наследственные, жилищные и арбитражные дела."
      />
      <link rel="canonical" href={`${SITE.url}services`} />
      <meta property="og:title" content="Юридические услуги в Москве — Профзащита" />
      <meta property="og:description" content="Выберите направление юридической помощи: уголовные дела, споры для физических лиц или услуги для бизнеса." />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${SITE.url}services`} />
    </Helmet>

    <BreadcrumbSchema
      items={[
        { name: "Главная", url: SITE.url },
        { name: "Юридические услуги", url: `${SITE.url}services` }
      ]}
    />

    <Header />

    <main className="flex-1">
      <section className="bg-gradient-to-br from-primary via-primary to-primary/90 text-white section">
        <div className="container section__content">
          <Breadcrumbs items={[{ label: "Юридические услуги" }]} />
          <div className="max-w-3xl py-8 md:py-14">
            <p className="text-small font-semibold uppercase tracking-[0.16em] text-accent">Коллегия адвокатов «Профзащита»</p>
            <h1 className="mt-4 font-serif text-h1-mobile font-bold leading-tight md:text-h1">Юридические услуги в Москве</h1>
            <p className="mt-5 max-w-2xl text-body-mobile leading-7 text-white/82 md:text-body">
              Выберите направление, чтобы перейти к профильным услугам, стоимости, адвокатам и материалам по вашей ситуации.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container section__content">
          <div className="grid gap-5 lg:grid-cols-3">
            {serviceDirections.map(({ title, description, href, icon: Icon, cta }) => (
              <Card key={href} className="h-full border-border shadow-[0_10px_24px_rgba(15,23,42,0.05)] transition-shadow hover:shadow-[0_16px_34px_rgba(15,23,42,0.1)]">
                <CardContent className="flex h-full flex-col p-6 md:p-7">
                  <Icon className="h-9 w-9 text-accent" aria-hidden="true" />
                  <h2 className="mt-5 font-serif text-h3-mobile font-semibold text-foreground md:text-h3">{title}</h2>
                  <p className="mt-3 text-body-mobile leading-7 text-muted-foreground md:text-body">{description}</p>
                  <Button asChild className="mt-auto h-auto min-h-12 w-full justify-between bg-primary px-4 py-3 text-left text-white hover:bg-primary/90">
                    <Link to={href}>
                      {cta}
                      <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-accent/25 bg-accent/10 p-6 md:flex md:items-center md:justify-between md:gap-6 md:p-8">
            <div className="max-w-2xl">
              <h2 className="font-serif text-h3-mobile font-semibold text-foreground md:text-h3">Не уверены, какое направление выбрать?</h2>
              <p className="mt-2 text-body-mobile leading-7 text-muted-foreground md:text-body">Опишите ситуацию — поможем определить профильную услугу и следующий практический шаг.</p>
            </div>
            <Button asChild size="lg" className="mt-5 min-h-12 whitespace-normal bg-accent px-6 text-white hover:bg-accent/90 md:mt-0">
              <Link to="/kontakty">Связаться с коллегией</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>

    <Footer />
  </div>
);

export default Services;
