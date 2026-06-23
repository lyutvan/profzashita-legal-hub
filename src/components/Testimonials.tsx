import { testimonials } from "@/data/testimonials";
import { Button } from "@/components/ui/button";
import ReviewsCarousel from "@/components/ReviewsCarousel";

const Testimonials = () => {
  return (
    <section className="relative section bg-muted/30 overflow-hidden">
      <div className="container">
        <div className="section__header max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-h2-mobile md:text-h2 font-bold mb-6">
            Отзывы <span className="text-accent">клиентов</span>
          </h2>
          <p className="text-body-mobile md:text-body text-muted-foreground">
            Реальные результаты для реальных людей и компаний
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <ReviewsCarousel reviews={testimonials} />
        </div>

        <div className="mt-10 flex justify-center">
          <Button asChild size="lg" className="px-6">
            <a
              href="https://yandex.ru/maps/org/244880896695/reviews/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Посмотреть все отзывы на Яндекс.Картах
            </a>
          </Button>
        </div>

        {/* Trust Badges */}
        <div className="max-w-4xl mx-auto">
          <h3 className="font-serif text-h3-mobile md:text-h3 font-semibold text-center mb-8">
            Нас рекомендуют
          </h3>
          <div className="grid grid-cols-2 gap-5 md:grid-cols-4 md:gap-6">
            {[
              "Адвокатская палата Москвы",
              "РБК",
              "Коммерсантъ",
              "Ассоциация юристов России",
            ].map((badge, index) => (
              <div
                key={index}
                className="flex items-center justify-center rounded-xl border border-border bg-card p-6 text-center transition-all hover:shadow-elegant sm:p-7"
              >
                <span className="text-small font-medium text-muted-foreground">
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
