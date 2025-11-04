import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const Contacts = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section with light texture */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary/90" />
          <div className="absolute inset-0 opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')]" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="font-playfair text-4xl md:text-5xl font-bold mb-6">
                <span className="text-accent">Контакты</span>
              </h1>
              <p className="text-lg text-primary-foreground/80 leading-relaxed">
                Свяжитесь с нами удобным способом. Мы всегда готовы помочь вам 
                решить любые юридические вопросы.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Info & Form Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
              {/* Contact Information */}
              <div className="space-y-6">
                <div>
                  <h2 className="font-playfair text-2xl md:text-3xl font-bold mb-6">
                    Как с нами связаться
                  </h2>
                </div>

                <Card className="border-border">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <Phone className="h-6 w-6 text-accent" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">Телефон</h3>
                        <a href="tel:+79168597654" className="text-lg text-accent hover:underline">
                          +7 (916) 859-76-54
                        </a>
                        <p className="text-sm text-muted-foreground mt-1">
                          Звоните в любое время
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <Mail className="h-6 w-6 text-accent" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">Email</h3>
                        <a href="mailto:profzashchita@internet.ru" className="text-lg text-accent hover:underline">
                          profzashchita@internet.ru
                        </a>
                        <p className="text-sm text-muted-foreground mt-1">
                          Ответим в течение часа
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <MapPin className="h-6 w-6 text-accent" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">Адрес</h3>
                        <p className="text-muted-foreground">
                          г. Москва, ул. Дегунинский проспект 1к2,<br />
                          офис 303
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <Clock className="h-6 w-6 text-accent" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">Режим работы</h3>
                        <p className="text-muted-foreground">
                          Пн-Пт: 9:00 - 19:00<br />
                          Сб: 10:00 - 16:00<br />
                          Вс: по предварительной записи
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

              </div>

              {/* Contact Form */}
              <div>
                <Card className="border-border shadow-elegant sticky top-24">
                  <CardContent className="pt-6">
                    <h3 className="font-playfair text-xl md:text-2xl font-bold mb-4">
                      Оставьте заявку
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Заполните форму, и мы свяжемся с вами в течение 15 минут 
                      для бесплатной консультации.
                    </p>
                    <ContactForm />
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="relative py-20 bg-muted/30 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="font-playfair text-2xl md:text-3xl font-bold mb-8 text-center">
                Как нас найти
              </h2>
              <div className="aspect-video rounded-lg border border-border overflow-hidden">
                <iframe 
                  src="https://yandex.ru/map-widget/v1/?z=12&ol=biz&oid=244880896695" 
                  width="100%" 
                  height="100%" 
                  frameBorder="0"
                  title="Карта офиса Профзащита"
                  className="w-full h-full"
                ></iframe>
              </div>
            </div>
          </div>
        </section>

        {/* Legal Info Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-playfair text-2xl md:text-3xl font-bold mb-8 text-center">
                Реквизиты
              </h2>
              <Card className="border-border">
                <CardContent className="pt-6">
                  <div className="space-y-3 text-sm text-muted-foreground">
                    <p><span className="font-semibold text-foreground">Полное наименование:</span> Коллегия адвокатов города Москвы «ПРОФЗАЩИТА»</p>
                    <p><span className="font-semibold text-foreground">Адрес:</span> 125633, г. Москва, ул. Дегунинский проспект 1к2, офис 303</p>
                    <p><span className="font-semibold text-foreground">Регистрация:</span> Адвокатская палата города Москвы</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contacts;
