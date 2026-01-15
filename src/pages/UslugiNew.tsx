import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getTopCategories, getServicesByAudience, audienceConfig } from "@/data/services-audiences";
import { Shield, Clock, Users, Award, CheckCircle2, TrendingUp, Phone, UserCircle, Building2, Scale } from "lucide-react";

const UslugiNew = () => {
  const physCategories = getTopCategories('phys', 8);
  const bizCategories = getTopCategories('biz', 8);
  const criminalCategories = getTopCategories('criminal', 8);
  const topBizServices = getServicesByAudience('biz').slice(0, 6);
  const topCriminalServices = getServicesByAudience('criminal').slice(0, 6);
  const topPhysServices = [
    { title: "Развод и раздел имущества", path: "/services/phys/razvod-razdel-imushchestva" },
    { title: "Алименты", path: "/services/phys/alimenty" },
    { title: "Наследство", path: "/services/phys/nasledstvo" },
    { title: "Жилищные споры / выписка / выселение", path: "/services/phys/zhilishchnye-spory" },
    { title: "ДТП и страховые споры", path: "/services/phys/dtp-strahovye-spory" },
    { title: "Защита прав потребителей", path: "/services/phys/zashchita-prav-potrebitelya" },
    { title: "Взыскание долгов / расписка", path: "/services/phys/vzyskanie-po-raspiskam" }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Юридические услуги — Профзащита</title>
        <meta name="description" content="Полный спектр юридических услуг в Москве: уголовные дела, гражданские споры, арбитраж. Опыт 15+ лет." />
      </Helmet>

      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary to-primary/90 text-white section overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
            }} />
          </div>

          <div className="container relative z-10">
            <Breadcrumbs items={[{ label: "Услуги" }]} />
            <div className="max-w-4xl mt-8">
              <h1 className="font-serif text-h1-mobile md:text-h1 font-bold mb-6 leading-tight">
                Юридические услуги в Москве
              </h1>
              <p className="text-body-mobile md:text-body text-white/80 mb-8 leading-relaxed">
                Профессиональная защита ваших прав по всем категориям дел
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-white font-medium" asChild>
                  <Link to="/kontakty">
                    Бесплатная консультация
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white/20 bg-white/10 hover:bg-white/20 text-white" asChild>
                  <a href="tel:+79168597654">
                    <Phone className="mr-2 h-5 w-5" />
                    Позвонить сейчас
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="section bg-muted/30">
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 mb-4">
                  <Award className="h-8 w-8 text-accent" />
                </div>
                <div className="text-h2-mobile md:text-h2 font-bold text-accent mb-2">15+</div>
                <div className="text-small text-muted-foreground">лет опыта</div>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 mb-4">
                  <CheckCircle2 className="h-8 w-8 text-accent" />
                </div>
                <div className="text-h2-mobile md:text-h2 font-bold text-accent mb-2">500+</div>
                <div className="text-small text-muted-foreground">выигранных дел</div>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 mb-4">
                  <Users className="h-8 w-8 text-accent" />
                </div>
                <div className="text-h2-mobile md:text-h2 font-bold text-accent mb-2">1000+</div>
                <div className="text-small text-muted-foreground">довольных клиентов</div>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 mb-4">
                  <Clock className="h-8 w-8 text-accent" />
                </div>
                <div className="text-h2-mobile md:text-h2 font-bold text-accent mb-2">24/7</div>
                <div className="text-small text-muted-foreground">готовы помочь</div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Audiences */}
        <section className="section">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="font-serif text-h2-mobile md:text-h2 font-bold mb-4">Наши услуги</h2>
              <p className="text-body-mobile md:text-body text-muted-foreground max-w-2xl mx-auto">
                Предоставляем полный спектр юридических услуг для физических и юридических лиц
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {/* Физическим лицам */}
              <Card 
                className="h-full flex flex-col hover:shadow-xl transition-all duration-300 border-2 hover:border-accent/30 group"
              >
                <CardHeader className="pb-4">
                  <div className="mb-4 inline-flex p-4 rounded-xl bg-accent/10 group-hover:bg-accent/20 transition-colors">
                    <UserCircle className="h-12 w-12 text-accent" />
                  </div>
                  <CardTitle className="font-serif text-h3-mobile md:text-h3 mb-3">
                    {audienceConfig.phys.title}
                  </CardTitle>
                  <p className="text-muted-foreground leading-relaxed">
                    {audienceConfig.phys.subtitle}
                  </p>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <div className="mb-4 text-small text-muted-foreground">
                    <span className="font-semibold text-foreground">
                      {physCategories.reduce((sum, cat) => sum + cat.services.length, 0)}
                    </span> специализаций
                  </div>
                  <ul className="space-y-2 mb-6">
                    {physCategories.map((category) => (
                      <li key={category.slug} className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
                        <Link
                          to={`/services/phys#${category.slug}`}
                          className="text-small text-muted-foreground hover:text-accent transition-colors"
                        >
                          {category.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <div className="border-t border-border pt-4 mb-6">
                    <div className="text-small uppercase text-muted-foreground mb-3">
                      Популярные услуги
                    </div>
                    <ul className="space-y-2">
                      {topPhysServices.map((service) => (
                        <li key={service.path}>
                          <Link
                            to={service.path}
                            className="text-small text-muted-foreground hover:text-accent transition-colors"
                          >
                            {service.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Button 
                    variant="outline" 
                    className="mt-auto w-full border-accent/30 hover:bg-accent/10 hover:border-accent"
                    asChild
                  >
                    <Link to="/services/phys">
                      Все услуги раздела ({physCategories.reduce((sum, cat) => sum + cat.services.length, 0)})
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Юридическим лицам */}
              <Card 
                className="h-full flex flex-col hover:shadow-xl transition-all duration-300 border-2 hover:border-accent/30 group"
              >
                <CardHeader className="pb-4">
                  <div className="mb-4 inline-flex p-4 rounded-xl bg-accent/10 group-hover:bg-accent/20 transition-colors">
                    <Building2 className="h-12 w-12 text-accent" />
                  </div>
                  <CardTitle className="font-serif text-h3-mobile md:text-h3 mb-3">
                    {audienceConfig.biz.title}
                  </CardTitle>
                  <p className="text-muted-foreground leading-relaxed">
                    {audienceConfig.biz.subtitle}
                  </p>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <div className="mb-4 text-small text-muted-foreground">
                    <span className="font-semibold text-foreground">
                      {bizCategories.reduce((sum, cat) => sum + cat.services.length, 0)}
                    </span> специализаций
                  </div>
                  <ul className="space-y-2 mb-6">
                    {bizCategories.map((category) => (
                      <li key={category.slug} className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
                        <Link
                          to={`/services/biz#${category.slug}`}
                          className="text-small text-muted-foreground hover:text-accent transition-colors"
                        >
                          {category.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <div className="border-t border-border pt-4 mb-6">
                    <div className="text-small uppercase text-muted-foreground mb-3">
                      Популярные услуги
                    </div>
                    <ul className="space-y-2">
                      {topBizServices.map((service) => (
                        <li key={service.path}>
                          <Link
                            to={service.path}
                            className="text-small text-muted-foreground hover:text-accent transition-colors"
                          >
                            {service.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Button 
                    variant="outline" 
                    className="mt-auto w-full border-accent/30 hover:bg-accent/10 hover:border-accent"
                    asChild
                  >
                    <Link to="/services/biz">
                      Все услуги раздела ({bizCategories.reduce((sum, cat) => sum + cat.services.length, 0)})
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Уголовные дела */}
              <Card 
                className="h-full flex flex-col hover:shadow-xl transition-all duration-300 border-2 hover:border-accent/30 group"
              >
                <CardHeader className="pb-4">
                  <div className="mb-4 inline-flex p-4 rounded-xl bg-accent/10 group-hover:bg-accent/20 transition-colors">
                    <Scale className="h-12 w-12 text-accent" />
                  </div>
                  <CardTitle className="font-serif text-h3-mobile md:text-h3 mb-3">
                    {audienceConfig.criminal.title}
                  </CardTitle>
                  <p className="text-muted-foreground leading-relaxed">
                    {audienceConfig.criminal.subtitle}
                  </p>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <div className="mb-4 text-small text-muted-foreground">
                    <span className="font-semibold text-foreground">
                      {criminalCategories.reduce((sum, cat) => sum + cat.services.length, 0)}
                    </span> специализаций
                  </div>
                  <ul className="space-y-2 mb-6">
                    {criminalCategories.map((category) => (
                      <li key={category.slug} className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
                        <Link
                          to={`/services/criminal#${category.slug}`}
                          className="text-small text-muted-foreground hover:text-accent transition-colors"
                        >
                          {category.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <div className="border-t border-border pt-4 mb-6">
                    <div className="text-small uppercase text-muted-foreground mb-3">
                      Популярные услуги
                    </div>
                    <ul className="space-y-2">
                      {topCriminalServices.map((service) => (
                        <li key={service.path}>
                          <Link
                            to={service.path}
                            className="text-small text-muted-foreground hover:text-accent transition-colors"
                          >
                            {service.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Button 
                    variant="outline" 
                    className="mt-auto w-full border-accent/30 hover:bg-accent/10 hover:border-accent"
                    asChild
                  >
                    <Link to="/services/criminal">
                      Все услуги раздела ({criminalCategories.reduce((sum, cat) => sum + cat.services.length, 0)})
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Why Us Section */}
        <section className="section bg-muted/30">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="font-serif text-h2-mobile md:text-h2 font-bold mb-4">Почему выбирают нас</h2>
              <p className="text-body-mobile md:text-body text-muted-foreground max-w-2xl mx-auto">
                Профессионализм, опыт и индивидуальный подход к каждому клиенту
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="border-l-4 border-l-accent">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-accent/10">
                      <Shield className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-body-mobile md:text-body mb-2">Опыт с 2005 года</h3>
                      <p className="text-small text-muted-foreground">
                        Более 15 лет успешной практики в самых сложных делах
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-accent">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-accent/10">
                      <Clock className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-body-mobile md:text-body mb-2">Работаем 24/7</h3>
                      <p className="text-small text-muted-foreground">
                        Срочная помощь в любое время, выезд в течение 2 часов
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-accent">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-accent/10">
                      <TrendingUp className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-body-mobile md:text-body mb-2">Высокий процент побед</h3>
                      <p className="text-small text-muted-foreground">
                        Более 85% дел завершаются в пользу наших клиентов
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-accent">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-accent/10">
                      <Users className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-body-mobile md:text-body mb-2">Индивидуальный подход</h3>
                      <p className="text-small text-muted-foreground">
                        Разрабатываем уникальную стратегию для каждого дела
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-accent">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-accent/10">
                      <Award className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-body-mobile md:text-body mb-2">Команда профессионалов</h3>
                      <p className="text-small text-muted-foreground">
                        Адвокаты с опытом работы в крупных делах и сложных спорах
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-accent">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-accent/10">
                      <CheckCircle2 className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-body-mobile md:text-body mb-2">Прозрачность</h3>
                      <p className="text-small text-muted-foreground">
                        Честные цены, никаких скрытых платежей, регулярная отчётность
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section">
          <div className="container">
            <Card className="bg-gradient-to-br from-primary to-primary/90 text-white border-0">
              <CardContent className="pt-12 pb-12">
                <div className="max-w-3xl mx-auto text-center">
                  <h2 className="font-serif text-h2-mobile md:text-h2 font-bold mb-4">
                    Нужна юридическая помощь?
                  </h2>
                  <p className="text-body-mobile md:text-body text-white/80 mb-8">
                    Получите бесплатную консультацию и узнайте, как мы можем помочь в вашей ситуации
                  </p>
                  <div className="flex flex-wrap gap-4 justify-center">
                    <Button size="lg" className="bg-accent hover:bg-accent/90 text-white font-medium" asChild>
                      <Link to="/kontakty">
                        Записаться на консультацию
                      </Link>
                    </Button>
                    <Button 
                      size="lg" 
                      variant="outline" 
                      className="border-white/20 bg-white/10 hover:bg-white/20 text-white"
                      asChild
                    >
                      <a href="tel:+79168597654">
                        <Phone className="mr-2 h-5 w-5" />
                        +7 (916) 859-76-54
                      </a>
                    </Button>
                  </div>
                  <p className="text-small text-white/60 mt-6">
                    Работаем круглосуточно. Срочный выезд в течение 2 часов.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default UslugiNew;
