import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import { practices } from "@/data/practices";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, ArrowLeft } from "lucide-react";
import legalBg2 from "@/assets/legal-bg-2.jpg";

const PracticeDetail = () => {
  const { slug } = useParams();
  const practice = practices.find((p) => p.slug === slug);

  if (!practice) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Практика не найдена</h1>
            <Button asChild>
              <Link to="/practices">Вернуться к практикам</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const Icon = practice.icon;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary to-primary/90 text-primary-foreground py-16">
          <div className="container mx-auto px-4">
            <Button variant="ghost" asChild className="mb-6 text-primary-foreground hover:text-accent">
              <Link to="/practices">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Все практики
              </Link>
            </Button>
            
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 rounded-lg bg-accent/20 flex items-center justify-center flex-shrink-0">
                <Icon className="h-8 w-8 text-accent" />
              </div>
              <div>
                <h1 className="font-playfair text-3xl md:text-4xl font-bold mb-4">
                  {practice.title}
                </h1>
                <p className="text-lg text-primary-foreground/80 max-w-3xl">
                  {practice.description}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 opacity-18">
            <img 
              src={legalBg2} 
              alt="" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                <div>
                  <h2 className="font-playfair text-2xl font-bold mb-4">О направлении</h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {practice.fullDescription}
                  </p>
                </div>

                <div>
                  <h2 className="font-playfair text-2xl font-bold mb-6">Наши услуги</h2>
                  <div className="space-y-4">
                    {practice.services.map((service, index) => (
                      <div key={index} className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg border border-border">
                        <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                        <p className="text-base">{service}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <Card className="bg-accent/5 border-accent/20">
                  <CardContent className="pt-6">
                    <h3 className="font-playfair text-xl font-bold mb-4">Как мы работаем</h3>
                    <ol className="space-y-3 list-decimal list-inside text-muted-foreground">
                      <li>Бесплатная консультация и оценка перспектив дела</li>
                      <li>Анализ документов и разработка стратегии</li>
                      <li>Заключение договора и начало работы</li>
                      <li>Представительство интересов на всех этапах</li>
                      <li>Достижение результата и закрытие дела</li>
                    </ol>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div>
                <Card className="sticky top-24 border-border shadow-elegant">
                  <CardContent className="pt-6">
                    <h3 className="font-playfair text-xl font-bold mb-4 text-center">
                      Получить консультацию
                    </h3>
                    <p className="text-sm text-muted-foreground mb-6 text-center">
                      Заполните форму, и мы свяжемся с вами в течение 15 минут
                    </p>
                    <ContactForm />
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default PracticeDetail;
