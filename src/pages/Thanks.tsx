import { useEffect } from "react";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SITE } from "@/config/site";

const Thanks = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const returnState = location.state as { from?: string } | null;
  const canReturnBack = Boolean(returnState?.from);

  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 flex items-center justify-center px-4 section">
        <Card className="max-w-md w-full p-8 text-center space-y-6">
          <div className="flex justify-center">
            <CheckCircle className="h-16 w-16 text-accent" />
          </div>
          
          <div className="space-y-2">
            <h1 className="font-serif text-h2-mobile md:text-h2 font-bold">
              Спасибо, заявка принята!
            </h1>
            <p className="text-muted-foreground">
              Мы получили ваше обращение и свяжемся с вами в ближайшее время. Если вопрос срочный, позвоните нам.
            </p>
          </div>

          <div className="space-y-4 pt-4">
            <Button asChild className="w-full bg-accent text-white hover:bg-accent/90">
              <a href={`tel:${SITE.phoneRaw}`}>Позвонить сейчас</a>
            </Button>
            <Button
              onClick={() => {
                if (canReturnBack) {
                  navigate(-1);
                  return;
                }

                navigate(SITE.homePath);
              }}
              className="w-full"
            >
              Вернуться назад
            </Button>
            
            <Button 
              onClick={() => navigate('/kontakty')} 
              variant="outline"
              className="w-full"
            >
              Контакты
            </Button>
          </div>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default Thanks;
