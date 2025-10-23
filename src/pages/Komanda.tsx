import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet";

const Komanda = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Команда — Профзащита</title>
        <meta name="description" content="Команда адвокатов коллегии Профзащита" />
      </Helmet>
      
      <Header />
      
      <main className="flex-1">
        <section className="bg-gradient-to-br from-primary to-primary/90 text-primary-foreground py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="font-playfair text-4xl md:text-5xl font-bold mb-6">
                Наша <span className="text-accent">команда</span>
              </h1>
              <p className="text-lg text-primary-foreground/80 leading-relaxed">
                Команда опытных адвокатов, готовых защитить ваши интересы
              </p>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <p className="text-center text-muted-foreground">
                Раздел в разработке
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Komanda;
