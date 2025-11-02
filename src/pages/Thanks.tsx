import { useEffect } from "react";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Thanks = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <Card className="max-w-md w-full p-8 text-center space-y-6">
          <div className="flex justify-center">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          
          <div className="space-y-2">
            <h1 className="text-2xl font-playfair font-bold">
              Спасибо за обращение!
            </h1>
            <p className="text-muted-foreground">
              Ваша заявка успешно отправлена. Мы свяжемся с вами в ближайшее время.
            </p>
          </div>

          <div className="space-y-3 pt-4">
            <Button 
              onClick={() => navigate('/')} 
              className="w-full"
            >
              Вернуться на главную
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
