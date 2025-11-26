import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Scale, Shield } from "lucide-react";
import { SITE } from "@/config/site";

const articles = [
  {
    number: "109",
    title: "Причинение смерти по неосторожности",
    description: "Защита по обвинению в причинении смерти по неосторожности. Доказательство отсутствия вины, переквалификация.",
    path: "/services/phys/statya-109"
  },
  {
    number: "110",
    title: "Доведение до самоубийства",
    description: "Защита по делам о доведении до самоубийства. Опровержение причинно-следственной связи.",
    path: "/services/phys/statya-110"
  },
  {
    number: "111",
    title: "Умышленное причинение тяжкого вреда здоровью",
    description: "Защита при обвинении в причинении тяжкого вреда здоровью. Необходимая оборона, аффект, переквалификация.",
    path: "/services/phys/statya-111"
  },
  {
    number: "112",
    title: "Умышленное причинение средней тяжести вреда здоровью",
    description: "Защита по делам о причинении вреда здоровью средней тяжести. Смягчение наказания, примирение.",
    path: "/services/phys/statya-112"
  },
  {
    number: "115",
    title: "Умышленное причинение легкого вреда здоровью",
    description: "Защита при обвинении в причинении легкого вреда здоровью. Примирение, прекращение дела.",
    path: "/services/phys/statya-115"
  },
  {
    number: "116",
    title: "Побои",
    description: "Защита по статье 116 УК РФ. Примирение с потерпевшим, перевод в административное производство.",
    path: "/services/phys/statya-116"
  },
  {
    number: "119",
    title: "Угроза убийством или причинением тяжкого вреда здоровью",
    description: "Защита по делам об угрозах. Доказательство отсутствия реальности угрозы, примирение.",
    path: "/services/phys/statya-119"
  }
];

const Chapter16Page = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Преступления против жизни и здоровья (Глава 16 УК РФ) — Профзащита</title>
        <meta 
          name="description" 
          content="Защита по уголовным делам главы 16 УК РФ: статьи 109, 110, 111, 112, 115, 116, 119. Опытные адвокаты, защита на всех стадиях уголовного процесса." 
        />
        <link rel="canonical" href={`${SITE.url}/services/phys/chapter-16`} />
      </Helmet>

      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-[#0B1F3A] to-[#0C1926] text-white py-16 md:py-20">
          <div className="container mx-auto px-4">
            <Breadcrumbs 
              items={[
                { label: "Услуги", path: "/uslugi" },
                { label: "Физическим лицам", path: "/services/phys" },
                { label: "Преступления против жизни и здоровья" }
              ]} 
            />
            <div className="max-w-4xl mt-8">
              <div className="flex items-center gap-3 mb-4">
                <Scale className="h-10 w-10 text-[#C9A227]" />
                <h1 className="font-montserrat text-4xl md:text-5xl font-bold">
                  Преступления против жизни и здоровья
                </h1>
              </div>
              <p className="text-xl text-white/80 mb-6">
                Профессиональная защита по уголовным делам Главы 16 УК РФ. Опыт защиты по статьям 109, 110, 111, 112, 115, 116, 119 на всех стадиях уголовного процесса.
              </p>
              <div className="flex flex-wrap gap-4 text-white/70">
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-[#C9A227]" />
                  <span>Защита на следствии и в суде</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-[#C9A227]" />
                  <span>Примирение и прекращение дел</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Articles List */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="font-montserrat text-3xl font-bold mb-8">
                Статьи Главы 16 УК РФ
              </h2>
              <div className="grid gap-6">
                {articles.map((article) => (
                  <Card 
                    key={article.number}
                    className="hover:shadow-lg transition-all duration-300 border-2 hover:border-[#C9A227]/30"
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="text-sm text-muted-foreground mb-2">
                            Статья {article.number} УК РФ
                          </div>
                          <CardTitle className="text-xl font-semibold mb-2">
                            {article.title}
                          </CardTitle>
                          <p className="text-muted-foreground">
                            {article.description}
                          </p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Button 
                        variant="ghost" 
                        className="w-full justify-between p-0 h-auto hover:bg-transparent group"
                        asChild
                      >
                        <Link to={article.path}>
                          <span className="text-[#C9A227] group-hover:underline">
                            Подробнее
                          </span>
                          <ArrowRight className="h-4 w-4 text-[#C9A227] group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
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
                    Нужна защита по уголовному делу?
                  </h2>
                  <p className="text-xl text-white/80 mb-8">
                    Получите экстренную консультацию и профессиональную защиту на всех стадиях уголовного процесса
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

export default Chapter16Page;
