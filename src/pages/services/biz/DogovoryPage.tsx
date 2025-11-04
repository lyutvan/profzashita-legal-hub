import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { SITE } from "@/config/site";

const DogovoryPage = () => {
  const breadcrumbItems = [
    { label: "Главная", to: "/" },
    { label: "Услуги", to: "/uslugi" },
    { label: "Договорная работа и претензии" }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Договорная работа и претензии — Коллегия адвокатов Профзащита</title>
        <meta name="description" content="Составление и экспертиза договоров, претензионная работа. Защита интересов бизнеса на досудебной стадии." />
        <link rel="canonical" href={`${SITE.url}/services/biz/dogovory/`} />
      </Helmet>
      
      <Header />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-12">
          <Breadcrumbs items={breadcrumbItems} />
          
          <h1 className="font-playfair text-4xl md:text-5xl font-bold mb-8 mt-8">
            Договорная работа и претензии
          </h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-muted-foreground mb-6">
              Комплексная договорная работа: составление, экспертиза и сопровождение исполнения договоров. 
              Эффективная претензионная работа для защиты интересов вашего бизнеса.
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default DogovoryPage;
