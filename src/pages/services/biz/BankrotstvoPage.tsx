import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { SITE } from "@/config/site";

const BankrotstvoPage = () => {
  const breadcrumbItems = [
    { label: "Главная", to: "/" },
    { label: "Услуги", to: "/uslugi" },
    { label: "Банкротство и субсидиарная ответственность" }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Банкротство и субсидиарная ответственность — Коллегия адвокатов Профзащита</title>
        <meta name="description" content="Сопровождение процедур банкротства юридических лиц. Защита от субсидиарной ответственности контролирующих лиц." />
        <link rel="canonical" href={`${SITE.url}/services/biz/bankrotstvo/`} />
      </Helmet>
      
      <Header />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-12">
          <Breadcrumbs items={breadcrumbItems} />
          
          <h1 className="font-playfair text-4xl md:text-5xl font-bold mb-8 mt-8">
            Банкротство и субсидиарная ответственность
          </h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-muted-foreground mb-6">
              Профессиональное сопровождение процедур банкротства юридических лиц. 
              Защита контролирующих лиц от привлечения к субсидиарной ответственности.
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BankrotstvoPage;
