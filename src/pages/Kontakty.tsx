import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet";
import { SITE } from "@/config/site";

const Contacts = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Контакты — Профзащита</title>
        <meta name="description" content="Контакты коллегии адвокатов Профзащита: телефон, email, адрес офиса в Москве. Бесплатная консультация по телефону." />
        <link rel="canonical" href={`${SITE.url}kontakty/`} />
        
        {/* OpenGraph */}
        <meta property="og:title" content="Контакты — Коллегия адвокатов Профзащита" />
        <meta property="og:description" content="Свяжитесь с нами: +7 (916) 859-76-54. Офис в Москве. Бесплатная консультация." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${SITE.url}kontakty/`} />
        <meta property="og:image" content={SITE.ogImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="ru_RU" />
        <meta property="og:site_name" content="Профзащита" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Контакты — Профзащита" />
        <meta name="twitter:description" content="Свяжитесь с нами: +7 (916) 859-76-54. Бесплатная консультация." />
        <meta name="twitter:image" content={SITE.ogImage} />
      </Helmet>
      
      <Header />
      
      <main className="flex-1">
        {/* Hero Section with light texture */}
        <section className="relative section overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary/90" />
          <div className="absolute inset-0 opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')]" />
          <div className="container relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="font-serif text-h1-mobile md:text-h1 font-bold mb-6">
                <span className="text-accent">Контакты</span>
              </h1>
              <p className="text-body-mobile md:text-body text-primary-foreground/80 leading-relaxed">
                Свяжитесь с нами удобным способом. Мы всегда готовы помочь вам 
                решить любые юридические вопросы.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Info & Form Section */}
        <section className="relative section overflow-hidden">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
              {/* Contact Information */}
              <div className="space-y-6">
                <div>
                  <h2 className="font-serif text-h2-mobile md:text-h2 font-bold mb-6">
                    Как с нами связаться
                  </h2>
                </div>

                <Card className="border-border">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <Phone className="h-6 w-6 text-accent" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">Телефон</h3>
                        <a href="tel:+79168597654" className="text-body-mobile md:text-body text-accent hover:underline">
                          +7 (916) 859-76-54
                        </a>
                        <p className="text-small text-muted-foreground mt-1">
                          Звоните в любое время
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <Mail className="h-6 w-6 text-accent" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">Email</h3>
                        <a href="mailto:profzashchita@internet.ru" className="text-body-mobile md:text-body text-accent hover:underline">
                          profzashchita@internet.ru
                        </a>
                        <p className="text-small text-muted-foreground mt-1">
                          Ответим в течение часа
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <MapPin className="h-6 w-6 text-accent" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">Адрес</h3>
                        <p className="text-muted-foreground">
                          Москва, ул. Дегунинская 1к2, офис 303
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <Clock className="h-6 w-6 text-accent" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">Режим работы</h3>
                        <p className="text-muted-foreground">
                          Пн-Сб: 10:00 - 19:00<br />
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
                    <h3 className="font-serif text-h3-mobile md:text-h3 font-bold mb-4">
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
        <section className="relative section bg-muted/30 overflow-hidden">
          <div className="container">
            <div className="max-w-5xl mx-auto">
              <h2 className="font-serif text-h2-mobile md:text-h2 font-bold mb-8 text-center">
                Как нас найти
              </h2>
              <div className="aspect-video rounded-xl border border-border overflow-hidden">
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
        <section className="relative section overflow-hidden">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-serif text-h2-mobile md:text-h2 font-bold mb-8 text-center">
                Реквизиты
              </h2>
              <Card className="border-border">
                <CardContent className="pt-6">
                  <div className="space-y-3 text-small text-muted-foreground">
                    <p><span className="font-semibold text-foreground">Полное наименование:</span> Коллегия адвокатов города Москвы «ПРОФЗАЩИТА»</p>
                    <p><span className="font-semibold text-foreground">Адрес:</span> 127486, Москва, ул. Дегунинская 1к2, офис 303</p>
                    <p><span className="font-semibold text-foreground">ИНН:</span> 7743478583</p>
                    <p><span className="font-semibold text-foreground">ОГРН:</span> 1257700439303</p>
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
