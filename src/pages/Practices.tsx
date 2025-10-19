import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PracticeCard from "@/components/PracticeCard";
import { practices } from "@/data/practices";

const Practices = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary to-primary/90 text-primary-foreground py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="font-playfair text-4xl md:text-5xl font-bold mb-6">
                Наши <span className="text-accent">практики</span>
              </h1>
              <p className="text-lg text-primary-foreground/80 leading-relaxed">
                Комплексная юридическая помощь в различных областях права. 
                Выберите направление для получения профессиональной консультации.
              </p>
            </div>
          </div>
        </section>

        {/* Practices Grid */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {practices.map((practice) => (
                <PracticeCard key={practice.id} {...practice} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Practices;
