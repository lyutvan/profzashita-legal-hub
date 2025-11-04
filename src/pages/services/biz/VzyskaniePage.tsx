import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { SITE } from "@/config/site";

const VzyskaniePage = () => {
  const breadcrumbItems = [
    { label: "Главная", to: "/" },
    { label: "Услуги", to: "/uslugi" },
    { label: "Взыскание дебиторской задолженности" }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Взыскание дебиторской задолженности — Коллегия адвокатов Профзащита</title>
        <meta name="description" content="Эффективное взыскание дебиторской задолженности. Претензионная работа, судебное взыскание, исполнительное производство." />
        <link rel="canonical" href={`${SITE.url}/services/biz/vzyskanie/`} />
      </Helmet>
      
      <Header />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-12">
          <Breadcrumbs items={breadcrumbItems} />
          
          <h1 className="font-playfair text-4xl md:text-5xl font-bold mb-8 mt-8">
            Взыскание дебиторской задолженности
          </h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-muted-foreground mb-6">
              Комплексная работа по взысканию дебиторской задолженности: от претензионной работы 
              до исполнительного производства. Максимально эффективное возвращение долгов.
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default VzyskaniePage;
