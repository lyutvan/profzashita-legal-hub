import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import ServiceCallBanner from "@/components/ServiceCallBanner";
import ServiceBannerCard from "@/components/ServiceBannerCard";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getCategoriesForAudience, getServicesByAudience, audienceConfig } from "@/data/services-audiences";
import { getPhysCategoryPagePath } from "@/data/phys-service-content";
import { CheckCircle2 } from "lucide-react";
import { JsonLd as JsonLdComponent } from "@/components/JsonLd";
import lawyerConsultationBg from "@/assets/legal/lawyer-consultation-bg.webp";
import { getServiceCardImage } from "@/lib/serviceCardImages";
import { SITE } from "@/config/site";

const PhysPage = () => {
  const categories = getCategoriesForAudience('phys');
  const totalServices = categories.reduce((sum, category) => sum + category.services.length, 0);
  const allServices = getServicesByAudience("phys").slice().sort((a, b) => a.title.localeCompare(b.title));
  const location = useLocation();
  const canonical = new URL("/services/phys", SITE.url).toString();

  useEffect(() => {
    if (!location.hash) return;
    const targetId = decodeURIComponent(location.hash.replace('#', ''));
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [location]);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Главная",
        "item": SITE.url
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Услуги",
        "item": new URL("/uslugi", SITE.url).toString()
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Физическим лицам",
        "item": canonical
      }
    ]
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Услуги адвокатов для физических лиц в Москве — Профзащита</title>
        <meta
          name="description"
          content="Услуги адвокатов для физических лиц в Москве: семейные, жилищные, наследственные споры, ДТП, защита прав потребителей, долги и банкротство. Оценим перспективы."
        />
        <link rel="canonical" href={canonical} />
        <meta name="robots" content="index, follow, max-image-preview:large" />

        <meta property="og:title" content="Услуги адвокатов для физических лиц в Москве — Профзащита" />
        <meta
          property="og:description"
          content="Услуги адвокатов для физических лиц в Москве: семейные, жилищные, наследственные споры, ДТП, защита прав потребителей, долги и банкротство. Оценим перспективы."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content={SITE.ogImage} />
        <meta property="og:locale" content="ru_RU" />
        <meta property="og:site_name" content="Профзащита" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Услуги адвокатов для физических лиц в Москве — Профзащита" />
        <meta
          name="twitter:description"
          content="Услуги адвокатов для физических лиц в Москве: семейные, жилищные, наследственные споры, ДТП, защита прав потребителей, долги и банкротство. Оценим перспективы."
        />
        <meta name="twitter:image" content={SITE.ogImage} />
      </Helmet>

      <JsonLdComponent data={breadcrumbSchema} />

      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section 
          className="relative text-white section"
          style={{
            backgroundImage: `url(${lawyerConsultationBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div 
            className="absolute inset-0 pointer-events-none" 
            style={{
              background: "linear-gradient(180deg, rgba(5,12,28,0.9) 0%, rgba(11,31,58,0.7) 48%, rgba(11,31,58,0.3) 100%)"
            }}
          ></div>
          <div className="container relative z-10">
            <Breadcrumbs 
              items={[
                { label: "Услуги", path: "/uslugi" },
                { label: "Физическим лицам" }
              ]} 
            />
            <div className="max-w-4xl mt-8">
              <h1 className="font-serif text-h1-mobile md:text-h1 font-bold mb-4">
                {audienceConfig.phys.title}
              </h1>
              <p className="lead text-white/80 mb-6">
                {audienceConfig.phys.description}
              </p>
              <ServiceCallBanner className="mb-6" />
              <div className="flex items-center gap-2 text-white/70">
                <CheckCircle2 className="h-5 w-5 text-accent" />
                <span>{totalServices} специализаций</span>
              </div>
            </div>
          </div>
        </section>

        {/* Services by Category */}
        <section className="section">
          <div className="container section__content">
            {categories.map(({ title, slug, services }) => {
              const seed = "phys";
              const categoryPagePath = getPhysCategoryPagePath(title);

              return (
                <div key={slug} id={slug} className="mb-8 scroll-mt-20">
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                    <h2 className="font-serif text-h2-mobile md:text-h2 font-bold">
                      {title}
                    </h2>
                    {categoryPagePath && (
                      <Button variant="outline" size="sm" asChild>
                        <Link to={categoryPagePath}>Страница категории</Link>
                      </Button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service) => (
                      <ServiceBannerCard
                        key={service.slug}
                        title={service.title}
                        to={service.path}
                        imageSrc={getServiceCardImage(service.slug, seed)}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* All Services List */}
        <section className="section bg-muted/30">
          <div className="container">
            <div className="section__header max-w-3xl">
              <h2 className="font-serif text-h2-mobile md:text-h2 font-bold mb-3">
                Все услуги для физических лиц
              </h2>
              <p className="text-muted-foreground">
                Полный перечень услуг с прямыми ссылками на каждую страницу.
              </p>
            </div>
            <div className="section__content grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {allServices.map((service) => (
                <Link
                  key={service.path}
                  to={service.path}
                  className="text-small text-foreground hover:text-accent hover:underline"
                >
                  {service.title}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section">
          <div className="container">
            <Card className="section__content bg-gradient-to-br from-primary to-primary/90 text-white border-0">
              <CardContent className="pt-12 pb-12">
                <div className="max-w-3xl mx-auto text-center">
                  <h2 className="font-serif text-h2-mobile md:text-h2 font-bold mb-4">
                    Нужна консультация?
                  </h2>
                  <p className="text-body-mobile md:text-body text-white/80 mb-8">
                    Получите бесплатную консультацию и узнайте, как мы можем помочь в вашей ситуации
                  </p>
                  <Button size="lg" className="bg-accent hover:bg-accent/90 text-white font-medium" asChild>
                    <Link to="/kontakty">
                      Связаться с нами
                    </Link>
                  </Button>
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

export default PhysPage;
