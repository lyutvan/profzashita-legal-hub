import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { SITE } from "@/config/site";

const NalogiPage = () => {
  const breadcrumbItems = [
    { label: "Главная", to: "/" },
    { label: "Услуги", to: "/uslugi" },
    { label: "Налоговые споры и проверки" }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Налоговые споры и проверки — Коллегия адвокатов Профзащита</title>
        <meta name="description" content="Защита интересов бизнеса в налоговых спорах. Сопровождение налоговых проверок, обжалование решений ФНС." />
        <link rel="canonical" href={`${SITE.url}/services/biz/nalogi/`} />
      </Helmet>
      
      <Header />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-12">
          <Breadcrumbs items={breadcrumbItems} />
          
          <h1 className="font-playfair text-4xl md:text-5xl font-bold mb-8 mt-8">
            Налоговые споры и проверки
          </h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-muted-foreground mb-6">
              Профессиональная защита интересов компании в налоговых спорах. 
              Сопровождение выездных и камеральных проверок, обжалование решений налоговых органов.
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NalogiPage;
