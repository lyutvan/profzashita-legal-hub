import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Helmet } from "react-helmet";
import { serviceCategories } from "@/data/services";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import LeadForm from "@/components/LeadForm";
import legalBg1 from "@/assets/legal-bg-1.jpg";

const Uslugi = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Все услуги — Профзащита</title>
        <meta name="description" content="Полный спектр юридических услуг для физических и юридических лиц в Москве. Уголовное, гражданское право, арбитраж, семейные и жилищные споры." />
      </Helmet>
      
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary to-primary/90 text-primary-foreground py-16 overflow-hidden">
          {/* Professional Legal Background Photo */}
          <div className="absolute inset-0 opacity-20">
            <img 
              src={legalBg1} 
              alt="" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <Breadcrumbs items={[{ label: "Услуги" }]} />
            <div className="max-w-3xl mt-6">
              <h1 className="font-playfair text-4xl md:text-5xl font-bold mb-4">
                Все услуги
              </h1>
              <p className="text-lg text-primary-foreground/80">
                Комплексная юридическая помощь для физических и юридических лиц. 
                Выберите направление для получения профессиональной консультации.
              </p>
            </div>
          </div>
        </section>

        {/* Services List */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Services Content */}
              <div className="lg:col-span-2 space-y-16">
                {serviceCategories.map((category) => (
                  <div key={category.id} id={category.slug}>
                    {/* Category Title */}
                    <div className="mb-8">
                      <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-3">
                        {category.title}
                      </h2>
                      <div className="h-1 w-24 bg-accent rounded-full" />
                    </div>

                    {/* Services Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                      {category.items.map((service) => (
                        <div key={service.id} className="space-y-3">
                          {/* Service Title with Link */}
                          <Link
                            to={`/uslugi/${category.slug}/${service.slug}`}
                            className="group block"
                          >
                            <h3 className="text-lg font-bold text-foreground group-hover:text-accent transition-colors flex items-start gap-2">
                              <span className="text-accent flex-shrink-0">•</span>
                              <span className="uppercase">{service.title}</span>
                            </h3>
                          </Link>

                          {/* Short Description */}
                          <p className="text-sm text-muted-foreground leading-relaxed pl-6">
                            {service.shortDescription}
                          </p>

                          {/* Link to Details */}
                          <Link
                            to={`/uslugi/${category.slug}/${service.slug}`}
                            className="inline-flex items-center gap-2 text-sm text-accent hover:gap-3 transition-all font-medium pl-6"
                          >
                            Подробнее
                            <ArrowRight className="h-4 w-4" />
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

                {/* How We Work Section */}
                <div className="bg-muted/30 rounded-lg p-8 mt-16">
                  <h2 className="font-playfair text-2xl font-bold mb-6">
                    Как мы работаем
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <div className="w-12 h-12 rounded-full bg-accent/20 text-accent flex items-center justify-center text-xl font-bold mb-3">
                        1
                      </div>
                      <h3 className="font-semibold">Консультация</h3>
                      <p className="text-sm text-muted-foreground">
                        Разбираем вашу ситуацию, оцениваем перспективы, предлагаем решение
                      </p>
                    </div>
                    <div className="space-y-2">
                      <div className="w-12 h-12 rounded-full bg-accent/20 text-accent flex items-center justify-center text-xl font-bold mb-3">
                        2
                      </div>
                      <h3 className="font-semibold">План действий</h3>
                      <p className="text-sm text-muted-foreground">
                        Разрабатываем стратегию, готовим документы, начинаем работу
                      </p>
                    </div>
                    <div className="space-y-2">
                      <div className="w-12 h-12 rounded-full bg-accent/20 text-accent flex items-center justify-center text-xl font-bold mb-3">
                        3
                      </div>
                      <h3 className="font-semibold">Результат</h3>
                      <p className="text-sm text-muted-foreground">
                        Защищаем ваши интересы до достижения нужного результата
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:sticky lg:top-24 h-fit space-y-6">
                {/* Quick Navigation */}
                <div className="bg-card border border-border rounded-lg p-6">
                  <h3 className="font-semibold text-lg mb-4">Быстрая навигация</h3>
                  <nav className="space-y-3">
                    {serviceCategories.map((category) => (
                      <a
                        key={category.id}
                        href={`#${category.slug}`}
                        className="block text-sm text-muted-foreground hover:text-accent transition-colors"
                      >
                        → {category.title}
                      </a>
                    ))}
                  </nav>
                </div>

                {/* Contact Form */}
                <div className="bg-card border border-border rounded-lg p-6">
                  <h3 className="font-semibold text-lg mb-4">Получить консультацию</h3>
                  <LeadForm variant="compact" />
                </div>

                {/* Contact Info */}
                <div className="bg-muted/50 rounded-lg p-6">
                  <h3 className="font-semibold text-lg mb-4">Контакты</h3>
                  <div className="space-y-3 text-sm">
                    <p>
                      <strong>Телефон:</strong><br />
                      <a href="tel:+79999999999" className="text-accent hover:underline">
                        +7 999 999 99 99
                      </a>
                    </p>
                    <p>
                      <strong>Email:</strong><br />
                      <a href="mailto:profzashchita@internet.ru" className="text-accent hover:underline">
                        profzashchita@internet.ru
                      </a>
                    </p>
                    <p>
                      <strong>Адрес:</strong><br />
                      Москва
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
