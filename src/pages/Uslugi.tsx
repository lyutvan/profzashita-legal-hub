import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Helmet } from "react-helmet";
import { serviceCategories } from "@/data/services";
import { Link } from "react-router-dom";
import { ArrowRight, Phone } from "lucide-react";
import LeadForm from "@/components/LeadForm";
import { Card, CardContent } from "@/components/ui/card";
import { SITE } from "@/config/site";

const Uslugi = () => {
  const individualsCategory = serviceCategories.find(cat => cat.id === "individuals");
  const businessesCategory = serviceCategories.find(cat => cat.id === "businesses");

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Все услуги — Профзащита</title>
        <meta name="description" content="Полный спектр юридических услуг для физических и юридических лиц в Москве. Уголовное, гражданское право, арбитраж, семейные и жилищные споры." />
      </Helmet>
      
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative section overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary/90" />
          <div className="container relative z-10">
            <Breadcrumbs items={[{ label: "Услуги" }]} />
            <div className="max-w-3xl mt-6">
              <h1 className="font-serif text-h1-mobile md:text-h1 font-bold mb-4 text-white">
                Все услуги
              </h1>
              <p className="text-body-mobile md:text-body text-white/90">
                Комплексная юридическая помощь для физических и юридических лиц. 
                Выберите направление для получения профессиональной консультации.
              </p>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="section">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Services Content */}
              <div className="lg:col-span-2 space-y-16">
                {/* Физическим лицам */}
                {individualsCategory && (
                  <div id={individualsCategory.slug}>
                    <div className="mb-8">
                      <h2 className="font-serif text-h2-mobile md:text-h2 font-bold mb-3 text-accent">
                        {individualsCategory.title}
                      </h2>
                      <p className="text-muted-foreground">
                        Защита прав и интересов граждан в различных областях права
                      </p>
                      <div className="h-1 w-24 bg-accent rounded-full mt-4" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                      {individualsCategory.items.map((service) => (
                        <div key={service.id} className="space-y-3">
                          <Link
                            to={`/uslugi/${individualsCategory.slug}/${service.slug}`}
                            className="group block"
                          >
                            <h3 className="text-body-mobile md:text-body font-bold text-foreground group-hover:text-accent transition-colors flex items-start gap-2">
                              <span className="text-accent flex-shrink-0">•</span>
                              <span>{service.title}</span>
                            </h3>
                          </Link>

                          <p className="text-small text-muted-foreground leading-relaxed pl-6">
                            {service.shortDescription}
                          </p>

                          <Link
                            to={`/uslugi/${individualsCategory.slug}/${service.slug}`}
                            className="inline-flex items-center gap-2 text-small text-accent hover:gap-3 transition-all font-medium pl-6"
                          >
                            Подробнее
                            <ArrowRight className="h-4 w-4" />
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Юридическим лицам */}
                {businessesCategory && (
                  <div id={businessesCategory.slug}>
                    <div className="mb-8">
                      <h2 className="font-serif text-h2-mobile md:text-h2 font-bold mb-3 text-accent">
                        {businessesCategory.title}
                      </h2>
                      <p className="text-muted-foreground">
                        Корпоративное обслуживание и защита бизнеса
                      </p>
                      <div className="h-1 w-24 bg-accent rounded-full mt-4" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                      {businessesCategory.items.map((service) => (
                        <div key={service.id} className="space-y-3">
                          <Link
                            to={`/uslugi/${businessesCategory.slug}/${service.slug}`}
                            className="group block"
                          >
                            <h3 className="text-body-mobile md:text-body font-bold text-foreground group-hover:text-accent transition-colors flex items-start gap-2">
                              <span className="text-accent flex-shrink-0">•</span>
                              <span>{service.title}</span>
                            </h3>
                          </Link>

                          <p className="text-small text-muted-foreground leading-relaxed pl-6">
                            {service.shortDescription}
                          </p>

                          <Link
                            to={`/uslugi/${businessesCategory.slug}/${service.slug}`}
                            className="inline-flex items-center gap-2 text-small text-accent hover:gap-3 transition-all font-medium pl-6"
                          >
                            Подробнее
                            <ArrowRight className="h-4 w-4" />
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* How We Work Section */}
                <div className="bg-muted/30 rounded-xl p-8 mt-16">
                  <h2 className="font-serif text-h3-mobile md:text-h3 font-bold mb-6">
                    Как мы работаем
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <div className="w-12 h-12 rounded-full bg-accent/20 text-accent flex items-center justify-center text-h3-mobile md:text-h3 font-bold mb-3">
                        1
                      </div>
                      <h3 className="font-semibold">Консультация</h3>
                      <p className="text-small text-muted-foreground">
                        Разбираем вашу ситуацию, оцениваем перспективы, предлагаем решение
                      </p>
                    </div>
                    <div className="space-y-2">
                      <div className="w-12 h-12 rounded-full bg-accent/20 text-accent flex items-center justify-center text-h3-mobile md:text-h3 font-bold mb-3">
                        2
                      </div>
                      <h3 className="font-semibold">План действий</h3>
                      <p className="text-small text-muted-foreground">
                        Разрабатываем стратегию, готовим документы, начинаем работу
                      </p>
                    </div>
                    <div className="space-y-2">
                      <div className="w-12 h-12 rounded-full bg-accent/20 text-accent flex items-center justify-center text-h3-mobile md:text-h3 font-bold mb-3">
                        3
                      </div>
                      <h3 className="font-semibold">Результат</h3>
                      <p className="text-small text-muted-foreground">
                        Защищаем ваши интересы до достижения нужного результата
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:sticky lg:top-24 h-fit space-y-6">
                {/* Quick Navigation */}
                <div className="bg-card border border-border rounded-xl p-6">
                  <h3 className="font-semibold text-body-mobile md:text-body mb-4">Быстрая навигация</h3>
                  <nav className="space-y-3">
                    {individualsCategory && (
                      <a
                        href={`#${individualsCategory.slug}`}
                        className="block text-small text-muted-foreground hover:text-accent transition-colors"
                      >
                        → {individualsCategory.title}
                      </a>
                    )}
                    {businessesCategory && (
                      <a
                        href={`#${businessesCategory.slug}`}
                        className="block text-small text-muted-foreground hover:text-accent transition-colors"
                      >
                        → {businessesCategory.title}
                      </a>
                    )}
                  </nav>
                </div>

                {/* Contact Form */}
                <div className="bg-card border border-border rounded-xl p-6">
                  <h3 className="font-semibold text-body-mobile md:text-body mb-4">Получить консультацию</h3>
                  <LeadForm variant="compact" />
                </div>

                {/* Contact Info */}
                <div className="bg-muted/50 rounded-xl p-6">
                  <h3 className="font-semibold text-body-mobile md:text-body mb-4">Контакты</h3>
                  <div className="space-y-3 text-small">
                    <p>
                      <strong>Телефон:</strong><br />
                      <a href={`tel:${SITE.phoneRaw}`} className="text-accent hover:underline flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        {SITE.phone}
                      </a>
                    </p>
                    <p>
                      <strong>Email:</strong><br />
                      <a href={`mailto:${SITE.email}`} className="text-accent hover:underline">
                        {SITE.email}
                      </a>
                    </p>
                    <p>
                      <strong>Адрес:</strong><br />
                      {SITE.address.city}, {SITE.address.street}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Uslugi;
