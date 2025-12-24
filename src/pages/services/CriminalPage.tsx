import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import ServiceCallBanner from "@/components/ServiceCallBanner";
import ServiceBannerCard from "@/components/ServiceBannerCard";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getServicesByCategory, audienceConfig } from "@/data/services-audiences";
import { CheckCircle2, ArrowRight } from "lucide-react";
import prisonBarsImage from "@/assets/legal/prison-bars.jpg";
import { JsonLd as JsonLdComponent } from "@/components/JsonLd";
import { getServiceCardImage } from "@/lib/serviceCardImages";

const CriminalPage = () => {
  const servicesByCategory = getServicesByCategory('criminal');
  const totalServices = Object.values(servicesByCategory).flat().length;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Главная",
        "item": "https://profzashita.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Услуги",
        "item": "https://profzashita.com/uslugi"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Уголовные дела",
        "item": "https://profzashita.com/services/criminal"
      }
    ]
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Уголовные дела — Профзащита</title>
        <meta 
          name="description" 
          content="Защита по уголовным делам: статьи 109, 110, 111, 112, 115, 116, 119 УК РФ. Опыт 15+ лет в уголовном праве." 
        />
      </Helmet>

      <JsonLdComponent data={breadcrumbSchema} />

      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section 
          className="relative text-white py-16 md:py-20"
          style={{
            backgroundImage: `url(${prisonBarsImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          {/* Dark overlay */}
          <div 
            className="absolute inset-0 pointer-events-none" 
            style={{
              background: "linear-gradient(180deg, rgba(5,12,28,0.92) 0%, rgba(11,31,58,0.72) 48%, rgba(11,31,58,0.32) 100%)"
            }}
          />
          <div className="container mx-auto px-4 relative z-10">
            <Breadcrumbs 
              items={[
                { label: "Услуги", path: "/uslugi" },
                { label: "Уголовные дела" }
              ]} 
            />
            <div className="max-w-4xl mt-8">
              <h1 className="font-montserrat text-4xl md:text-5xl font-bold mb-4">
                {audienceConfig.criminal.title}
              </h1>
              <p className="text-lg text-white/80 mb-6 whitespace-pre-line leading-relaxed">
                {audienceConfig.criminal.description}
              </p>
              <ServiceCallBanner className="mb-6" />
              <div className="flex items-center gap-2 text-white/70">
                <CheckCircle2 className="h-5 w-5 text-[#C9A227]" />
                <span>{totalServices} специализаций</span>
              </div>
            </div>
          </div>
        </section>

        {/* Services by Category */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            {Object.entries(servicesByCategory).map(([category, services]) => {
              const seed = "criminal";

              return (
              <div key={category} id={category} className="mb-12 scroll-mt-20">
                <h2 className="font-montserrat text-2xl md:text-3xl font-bold mb-6">
                  {category}
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
                    Получите бесплатную консультацию и узнайте, как мы можем помочь в вашей ситуации
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

export default CriminalPage;
