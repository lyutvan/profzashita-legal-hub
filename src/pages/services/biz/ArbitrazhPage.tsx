import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { SITE } from "@/config/site";

const ArbitrazhPage = () => {
  const breadcrumbItems = [
    { label: "Главная", to: "/" },
    { label: "Услуги", to: "/uslugi" },
    { label: "Арбитражные споры" }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Арбитражные споры — Коллегия адвокатов Профзащита</title>
        <meta name="description" content="Профессиональное представительство интересов в арбитражных судах. Защита бизнеса в судебных спорах." />
        <link rel="canonical" href={`${SITE.url}/services/biz/arbitrazh/`} />
      </Helmet>
      
      <Header />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-12">
          <Breadcrumbs items={breadcrumbItems} />
          
          <h1 className="font-playfair text-4xl md:text-5xl font-bold mb-8 mt-8">
            Арбитражные споры
          </h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-muted-foreground mb-6">
              Профессиональное представительство интересов вашей компании в арбитражных судах всех инстанций. 
              Мы специализируемся на сложных коммерческих спорах и защите прав бизнеса.
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ArbitrazhPage;
