import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PracticeCard from "@/components/PracticeCard";
import { Helmet } from "react-helmet";
import { serviceCategories } from "@/data/services";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";

const Uslugi = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Юридические услуги — Профзащита</title>
        <meta name="description" content="Полный спектр юридических услуг для физических и юридических лиц. Уголовное, гражданское право, арбитраж, семейные споры." />
      </Helmet>
      
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary to-primary/90 text-primary-foreground py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="font-playfair text-4xl md:text-5xl font-bold mb-6">
                Наши <span className="text-accent">услуги</span>
              </h1>
              <p className="text-lg text-primary-foreground/80 leading-relaxed">
                Комплексная юридическая помощь для физических и юридических лиц. 
                Выберите направление для получения профессиональной консультации.
              </p>
            </div>
          </div>
        </section>

        {/* Services Categories */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <Breadcrumbs items={[{ label: "Услуги" }]} />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-8">
              {serviceCategories.map((category) => (
                <div key={category.id} className="space-y-6">
                  <div className="text-center lg:text-left">
                    <h2 className="font-playfair text-3xl font-bold mb-2">
                      {category.title}
                    </h2>
                    <div className="h-1 w-20 bg-accent mx-auto lg:mx-0 rounded-full" />
                  </div>

                  <Accordion type="single" collapsible className="space-y-4">
                    {category.items.map((service) => (
                      <AccordionItem 
                        key={service.id} 
                        value={service.id}
                        className="border border-border rounded-lg px-6 bg-card"
                      >
                        <AccordionTrigger className="hover:text-accent hover:no-underline">
                          <span className="text-lg font-semibold text-left">
                            {service.title}
                          </span>
                        </AccordionTrigger>
                        <AccordionContent className="space-y-4 pt-4">
                          <p className="text-muted-foreground">
                            {service.shortDescription}
                          </p>
                          <Link
                            to={`/uslugi/${category.slug}/${service.slug}`}
                            className="inline-flex items-center gap-2 text-accent hover:gap-3 transition-all font-medium"
                          >
                            Подробнее
                            <ArrowRight className="h-4 w-4" />
                          </Link>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Uslugi;
