import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { serviceClusters } from "@/data/services-clusters";
import { Scale, Briefcase, Building } from "lucide-react";

const iconMap: Record<string, any> = {
  scale: Scale,
  briefcase: Briefcase,
  building: Building
};

const UslugiNew = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Юридические услуги — Профзащита</title>
        <meta name="description" content="Полный спектр юридических услуг в Москве: уголовные дела, гражданские споры, арбитраж. Опыт 15+ лет." />
      </Helmet>

      <Header />

      <main className="flex-1">
        <section className="bg-gradient-to-br from-[#0B1F3A] to-[#0C1926] text-white py-12">
          <div className="container mx-auto px-4">
            <Breadcrumbs items={[{ label: "Услуги" }]} />
            <h1 className="font-montserrat text-4xl md:text-5xl font-bold mt-6 mb-4">Юридические услуги</h1>
            <p className="text-xl text-white/80">Защита ваших прав по всем категориям дел</p>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {serviceClusters.map((cluster) => {
                const Icon = iconMap[cluster.icon];
                return (
                  <Card key={cluster.id} className="hover:shadow-lg transition-shadow" id={cluster.slug}>
                    <CardHeader>
                      <div className="mb-4">
                        <Icon className="h-12 w-12 text-[#C9A227]" />
                      </div>
                      <CardTitle className="font-montserrat text-2xl">{cluster.title}</CardTitle>
                      <p className="text-muted-foreground">{cluster.description}</p>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {cluster.situations.slice(0, 5).map((situation) => (
                          <li key={situation.id}>
                            <Link
                              to={`/uslugi/${cluster.slug}/${situation.slug}`}
                              className="text-sm text-muted-foreground hover:text-[#C9A227] transition-colors"
                            >
                              → {situation.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                      <Link
                        to={`/uslugi#${cluster.slug}`}
                        className="inline-block mt-4 text-sm text-[#C9A227] hover:underline font-medium"
                      >
                        Все услуги раздела →
                      </Link>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default UslugiNew;
