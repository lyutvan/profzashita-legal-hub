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
import { CheckCircle2 } from "lucide-react";
import { JsonLd as JsonLdComponent } from "@/components/JsonLd";
import businessHandshake from "@/assets/legal/business-handshake.jpg";
import { getServiceCardImage } from "@/lib/serviceCardImages";
import { SITE } from "@/config/site";

const BizPage = () => {
  const categories = getCategoriesForAudience('biz');
  const totalServices = categories.reduce((sum, category) => sum + category.services.length, 0);
  const allServices = getServicesByAudience("biz").slice().sort((a, b) => a.title.localeCompare(b.title));
  const location = useLocation();
  const canonical = new URL("/services/biz", SITE.url).toString();

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
        "name": "Юридическим лицам",
        "item": canonical
      }
    ]
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Юридические услуги для бизнеса в Москве — Профзащита</title>
        <meta
          name="description"
          content="Юридическое сопровождение бизнеса в Москве: договорная работа, арбитраж, взыскание, банкротство, налоги, комплаенс 115-ФЗ. Работаем по договору."
        />
        <link rel="canonical" href={canonical} />
        <meta name="robots" content="index, follow, max-image-preview:large" />

        <meta property="og:title" content="Юридические услуги для бизнеса в Москве — Профзащита" />
        <meta
          property="og:description"
          content="Юридическое сопровождение бизнеса в Москве: договорная работа, арбитраж, взыскание, банкротство, налоги, комплаенс 115-ФЗ. Работаем по договору."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content={SITE.ogImage} />
        <meta property="og:locale" content="ru_RU" />
        <meta property="og:site_name" content="Профзащита" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Юридические услуги для бизнеса в Москве — Профзащита" />
        <meta
          name="twitter:description"
          content="Юридическое сопровождение бизнеса в Москве: договорная работа, арбитраж, взыскание, банкротство, налоги, комплаенс 115-ФЗ. Работаем по договору."
        />
        <meta name="twitter:image" content={SITE.ogImage} />
      </Helmet>

      <JsonLdComponent data={breadcrumbSchema} />

      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section 
          className="relative text-white py-16 md:py-20"
          style={{
            backgroundImage: `url(${businessHandshake})`,
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
          <div className="container mx-auto px-4 relative z-10">
            <Breadcrumbs
              items={[
                { label: "Услуги", path: "/uslugi" },
                { label: "Юридическим лицам" }
              ]} 
            />
            <div className="max-w-4xl mt-8">
              <h1 className="font-montserrat text-4xl md:text-5xl font-bold mb-4">
                {audienceConfig.biz.title}
              </h1>
              <p className="text-xl text-white/80 mb-6">
                {audienceConfig.biz.description}
              </p>
              <ServiceCallBanner className="mb-6" />
              <div className="flex items-center gap-2 text-white/70">
                <CheckCircle2 className="h-5 w-5 text-[#C9A227]" />
                <span>{totalServices} специализаций</span>
              </div>
            </div>
          </div>
        </section>

        {/* Categories overview */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mb-8">
              <h2 className="font-montserrat text-2xl md:text-3xl font-bold mb-3">
                Основные направления
              </h2>
              <p className="text-muted-foreground">
                Выберите категорию, чтобы перейти к конкретным услугам.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {categories.map((category) => (
                <Link
                  key={category.slug}
                  to={`/services/biz#${category.slug}`}
                  className="text-sm text-[#0B1F3A] hover:text-[#C9A227] hover:underline"
                >
                  {category.title}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Services by Category */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            {categories.map(({ title, slug, services }) => {
              const seed = "biz";

              return (
                <div key={slug} id={slug} className="mb-12 scroll-mt-20">
                  <h2 className="font-montserrat text-2xl md:text-3xl font-bold mb-6">
                    {title}
                  </h2>
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
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mb-8">
              <h2 className="font-montserrat text-2xl md:text-3xl font-bold mb-3">
                Все услуги для бизнеса
              </h2>
              <p className="text-muted-foreground">
                Полный перечень услуг с прямыми ссылками на каждую страницу.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {allServices.map((service) => (
                <Link
                  key={service.path}
                  to={service.path}
                  className="text-sm text-[#0B1F3A] hover:text-[#C9A227] hover:underline"
                >
                  {service.title}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <Card className="bg-gradient-to-br from-[#0B1F3A] to-[#0C1926] text-white border-0">
              <CardContent className="pt-12 pb-12">
                <div className="max-w-3xl mx-auto text-center">
                  <h2 className="font-montserrat text-3xl md:text-4xl font-bold mb-4">
                    Нужна консультация?
                  </h2>
                  <p className="text-xl text-white/80 mb-8">
                    Получите бесплатную консультацию и узнайте, как мы можем помочь вашему бизнесу
                  </p>
                  <Button size="lg" className="bg-[#C9A227] hover:bg-[#B08E1F] text-white font-medium" asChild>
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

export default BizPage;
