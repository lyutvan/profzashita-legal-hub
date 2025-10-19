import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import PracticeCard from "@/components/PracticeCard";
import ContactForm from "@/components/ContactForm";
import { practices } from "@/data/practices";
import { Shield, Target, Award, Users, CheckCircle, Phone } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <Hero />

        {/* About Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-6">
                О коллегии адвокатов <span className="text-accent">Профзащита</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Мы — команда опытных адвокатов, объединённых общей целью: защитить права и интересы наших клиентов. 
                За годы работы мы помогли сотням людей и организаций добиться справедливости.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="text-center border-border hover:shadow-elegant transition-all">
                <CardContent className="pt-8 pb-6">
                  <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-8 w-8 text-accent" />
                  </div>
                  <h3 className="font-playfair text-xl font-semibold mb-2">Опыт</h3>
                  <p className="text-sm text-muted-foreground">Более 15 лет успешной практики</p>
                </CardContent>
              </Card>

              <Card className="text-center border-border hover:shadow-elegant transition-all">
                <CardContent className="pt-8 pb-6">
                  <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                    <Target className="h-8 w-8 text-accent" />
                  </div>
                  <h3 className="font-playfair text-xl font-semibold mb-2">Точность</h3>
                  <p className="text-sm text-muted-foreground">Детальный анализ каждого дела</p>
                </CardContent>
              </Card>

              <Card className="text-center border-border hover:shadow-elegant transition-all">
                <CardContent className="pt-8 pb-6">
                  <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                    <Award className="h-8 w-8 text-accent" />
                  </div>
                  <h3 className="font-playfair text-xl font-semibold mb-2">Качество</h3>
                  <p className="text-sm text-muted-foreground">Высокий процент выигранных дел</p>
                </CardContent>
              </Card>

              <Card className="text-center border-border hover:shadow-elegant transition-all">
                <CardContent className="pt-8 pb-6">
                  <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-accent" />
                  </div>
                  <h3 className="font-playfair text-xl font-semibold mb-2">Команда</h3>
                  <p className="text-sm text-muted-foreground">Профессиональные адвокаты</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Practices Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-6">
                Наши <span className="text-accent">практики</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Комплексная юридическая помощь в различных областях права
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {practices.slice(0, 6).map((practice) => (
                <PracticeCard key={practice.id} {...practice} />
              ))}
            </div>

            <div className="text-center">
              <Button variant="outline" size="lg" asChild>
                <Link to="/practices">Все направления →</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Advantages Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-6">
                Почему выбирают <span className="text-accent">нас</span>
              </h2>
            </div>

            <div className="max-w-4xl mx-auto space-y-6">
              {[
                "Бесплатная первичная консультация для оценки перспектив дела",
                "Индивидуальный подход к каждому клиенту и делу",
                "Прозрачное ценообразование без скрытых комиссий",
                "Конфиденциальность и соблюдение адвокатской тайны",
                "Работаем по всей России, представительство в судах любых инстанций",
                "Возможность удалённого взаимодействия через видеосвязь",
              ].map((advantage, index) => (
                <div key={index} className="flex items-start gap-4 bg-card p-6 rounded-lg border border-border hover:shadow-elegant transition-all">
                  <CheckCircle className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                  <p className="text-base leading-relaxed">{advantage}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-6">
                Отзывы <span className="text-accent">клиентов</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {[
                {
                  name: "Анна С.",
                  text: "Выражаю огромную благодарность адвокатам коллегии за помощь в семейном споре. Профессионально, оперативно и с отличным результатом.",
                  case: "Раздел имущества",
                },
                {
                  name: "Михаил К.",
                  text: "Обратился по уголовному делу. Команда работала слаженно, все этапы были понятны. Добились прекращения дела. Рекомендую!",
                  case: "Уголовная защита",
                },
                {
                  name: "ООО «Строй-Инвест»",
                  text: "Сотрудничаем с коллегией по корпоративным спорам. Высокий уровень экспертизы, всегда на связи. Надёжный партнёр.",
                  case: "Арбитраж",
                },
              ].map((testimonial, index) => (
                <Card key={index} className="border-border hover:shadow-elegant transition-all">
                  <CardContent className="pt-6">
                    <div className="mb-4">
                      <div className="flex items-center gap-1 text-accent mb-2">
                        {[...Array(5)].map((_, i) => (
                          <span key={i}>★</span>
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground italic mb-4">"{testimonial.text}"</p>
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{testimonial.name}</p>
                      <p className="text-xs text-muted-foreground">{testimonial.case}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <Button variant="outline" size="lg" asChild>
                <Link to="/cases">Все кейсы →</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-6">
                  Часто задаваемые <span className="text-accent">вопросы</span>
                </h2>
              </div>

              <Accordion type="single" collapsible className="space-y-4">
                <AccordionItem value="item-1" className="bg-card border border-border rounded-lg px-6">
                  <AccordionTrigger className="text-left hover:text-accent">
                    Сколько стоит первичная консультация?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Первичная консультация бесплатна. На ней мы оценим перспективы вашего дела и предложим стратегию защиты.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2" className="bg-card border border-border rounded-lg px-6">
                  <AccordionTrigger className="text-left hover:text-accent">
                    Как происходит оплата услуг?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Стоимость определяется после изучения дела. Возможна поэтапная оплата. Мы заключаем официальный договор с прозрачными условиями.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3" className="bg-card border border-border rounded-lg px-6">
                  <AccordionTrigger className="text-left hover:text-accent">
                    Можно ли работать удалённо?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Да, мы работаем с клиентами из любого региона России. Консультации проводим по видеосвязи, документы обмениваем электронно.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4" className="bg-card border border-border rounded-lg px-6">
                  <AccordionTrigger className="text-left hover:text-accent">
                    Какие гарантии успеха?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Мы честно оцениваем перспективы дела на этапе консультации. Более 98% наших клиентов получают положительное решение.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5" className="bg-card border border-border rounded-lg px-6">
                  <AccordionTrigger className="text-left hover:text-accent">
                    Как быстро можно начать работу?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    После первичной консультации и заключения договора мы приступаем к работе немедленно. В срочных случаях — в течение суток.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-6">
                    Получите бесплатную <span className="text-accent">консультацию</span>
                  </h2>
                  <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                    Оставьте заявку, и наш специалист свяжется с вами в течение 15 минут, 
                    чтобы обсудить вашу ситуацию и предложить решение.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-accent" />
                      <a href="tel:+79999999999" className="text-lg font-medium hover:text-accent transition-colors">
                        +7 999 999 99 99
                      </a>
                    </div>
                    <div className="flex gap-3">
                      <Button variant="outline" asChild className="flex-1">
                        <a href="https://wa.me/79999999999" target="_blank" rel="noopener noreferrer">
                          WhatsApp
                        </a>
                      </Button>
                      <Button variant="outline" asChild className="flex-1">
                        <a href="https://t.me/profzashita" target="_blank" rel="noopener noreferrer">
                          Telegram
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>

                <Card className="border-border shadow-elegant">
                  <CardContent className="pt-6">
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

export default Index;
