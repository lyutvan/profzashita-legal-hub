import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Phone, Zap, Scale, FileText } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-br from-primary via-primary to-primary/90 text-primary-foreground overflow-hidden">
      {/* Legal Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width="80" height="80" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff"%3E%3C!-- Scales of Justice --%3E%3Cpath d="M20 30h-8l4-8z M28 30h-8l4-8z M24 22v16 M20 38h8"/%3E%3C!-- Gavel --%3E%3Cpath d="M52 15l8 8-4 4-8-8z M56 23l-3 3-6-6 3-3z"/%3E%3C!-- Shield --%3E%3Cpath d="M40 50l-6 3v-10c0-5 3-9 6-10 3 1 6 5 6 10v10z"/%3E%3C!-- Columns --%3E%3Crect x="60" y="55" width="3" height="12"/%3E%3Crect x="66" y="53" width="3" height="14"/%3E%3Crect x="72" y="55" width="3" height="12"/%3E%3Crect x="59" y="67" width="17" height="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          backgroundSize: '80px 80px'
        }} />
      </div>

      <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 text-accent border border-accent/30 mb-6">
            <span className="text-sm font-medium">Коллегия адвокатов Профзащита</span>
          </div>

          {/* Main Heading */}
          {/* A/B: "Юридическая помощь премиум-класса в сложных делах" */}
          <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Юридическая помощь премиум-уровня <br className="hidden md:inline" />
            <span className="text-accent">для сложных ситуаций</span>
          </h1>

          {/* Subtitle - Key Benefits */}
          {/* A/B: "Работаем по результату • Индивидуальная стратегия • Полная конфиденциальность" */}
          <p className="text-lg md:text-xl text-primary-foreground/90 mb-8 leading-relaxed font-medium">
            Без предоплаты • Персональная стратегия • Конфиденциально
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              size="lg" 
              variant="secondary" 
              asChild 
              className="w-full sm:w-auto text-base px-8 min-h-[44px] shadow-[0_4px_14px_0_hsl(var(--accent)/0.3)] hover:shadow-[0_6px_20px_0_hsl(var(--accent)/0.4)] transition-all"
            >
              <Link to="/kontakty" aria-label="Получить бесплатную консультацию">
                <Phone className="mr-2 h-5 w-5" aria-hidden="true" />
                Бесплатная консультация
              </Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              asChild 
              className="w-full sm:w-auto text-base px-6 min-h-[44px] border-primary-foreground/30 hover:bg-primary-foreground/10 transition-all"
            >
              <a 
                href="tel:+79999999999"
                aria-label="Позвонить"
              >
                <Phone className="mr-2 h-5 w-5" />
                Позвонить
              </a>
            </Button>
          </div>

          {/* Three Key Results */}
          {/* A/B bullets: "Берём дело в работу немедленно", "Прозрачный анализ перспектив", "Пошаговый план защиты" */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-12">
            <div className="flex flex-col items-center text-center p-6 rounded-lg bg-primary-foreground/5 border border-primary-foreground/10 hover:border-accent/50 transition-colors">
              <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-accent" aria-hidden="true" />
              </div>
              <h3 className="font-semibold text-lg mb-2 text-primary-foreground">Срочно подключаемся к делу</h3>
              <p className="text-sm text-primary-foreground/70">Начинаем работу в день обращения</p>
            </div>

            <div className="flex flex-col items-center text-center p-6 rounded-lg bg-primary-foreground/5 border border-primary-foreground/10 hover:border-accent/50 transition-colors">
              <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center mb-4">
                <Scale className="w-6 h-6 text-accent" aria-hidden="true" />
              </div>
              <h3 className="font-semibold text-lg mb-2 text-primary-foreground">Рассчитываем шансы и риски</h3>
              <p className="text-sm text-primary-foreground/70">Честная оценка перспектив дела</p>
            </div>

            <div className="flex flex-col items-center text-center p-6 rounded-lg bg-primary-foreground/5 border border-primary-foreground/10 hover:border-accent/50 transition-colors">
              <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-accent" aria-hidden="true" />
              </div>
              <h3 className="font-semibold text-lg mb-2 text-primary-foreground">Готовим план действий</h3>
              <p className="text-sm text-primary-foreground/70">Пошаговая стратегия защиты интересов</p>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Element */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default Hero;
