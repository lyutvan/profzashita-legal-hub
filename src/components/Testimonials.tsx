import { Card, CardContent } from "@/components/ui/card";
import { testimonials } from "@/data/testimonials";
import { Star } from "lucide-react";
import legalBg3 from "@/assets/legal-bg-3.jpg";

const Testimonials = () => {
  return (
    <section className="relative py-20 bg-muted/30 overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <img 
          src={legalBg3} 
          alt="" 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-6">
            Отзывы <span className="text-accent">клиентов</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Реальные результаты для реальных людей и компаний
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="border-border hover:shadow-elegant transition-all">
              <CardContent className="pt-6">
                <div className="flex items-center gap-1 text-accent mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                
                <blockquote className="text-sm text-muted-foreground italic mb-4 leading-relaxed">
                  "{testimonial.quote}"
                </blockquote>
                
                <div className="border-t border-border pt-4">
                  <p className="font-semibold text-sm mb-1">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground mb-2">{testimonial.caseType}</p>
                  <p className="text-xs text-foreground/80 leading-relaxed">
                    {testimonial.result}
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">{testimonial.city}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="max-w-4xl mx-auto">
          <h3 className="font-playfair text-xl md:text-2xl font-semibold text-center mb-8">
            Нас рекомендуют
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              "Адвокатская палата Москвы",
              "РБК",
              "Коммерсантъ",
              "Ассоциация юристов России",
            ].map((badge, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-lg p-6 flex items-center justify-center text-center hover:shadow-elegant transition-all"
              >
                <span className="text-sm font-medium text-muted-foreground">
                  {badge}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
