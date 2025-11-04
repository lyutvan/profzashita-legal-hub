import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { serviceClusters } from "@/data/services-clusters";
import { Scale, Briefcase, Building, Shield, Clock, Users, Award, CheckCircle2, TrendingUp, Phone } from "lucide-react";

const iconMap: Record<string, any> = {
  scale: Scale,
  briefcase: Briefcase,
  building: Building
};

const UslugiNew = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Юридические услуги — Профзащита</title>
        <meta name="description" content="Полный спектр юридических услуг в Москве: уголовные дела, гражданские споры, арбитраж. Опыт 15+ лет." />
      </Helmet>

      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-[#0B1F3A] to-[#0C1926] text-white py-16 md:py-20 overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
            }} />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <Breadcrumbs items={[{ label: "Услуги" }]} />
            <div className="max-w-4xl mt-8">
              <h1 className="font-montserrat text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Юридические услуги в Москве
              </h1>
              <p className="text-xl md:text-2xl text-white/80 mb-8 leading-relaxed">
                Профессиональная защита ваших прав по всем категориям дел
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-[#C9A227] hover:bg-[#B08E1F] text-white font-medium" asChild>
                  <Link to="/kontakty">
                    Бесплатная консультация
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white/20 bg-white/10 hover:bg-white/20 text-white" asChild>
                  <a href="tel:+79168597654">
                    <Phone className="mr-2 h-5 w-5" />
                    Позвонить сейчас
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#C9A227]/10 mb-4">
                  <Award className="h-8 w-8 text-[#C9A227]" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-[#C9A227] mb-2">15+</div>
                <div className="text-sm text-muted-foreground">лет опыта</div>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#C9A227]/10 mb-4">
                  <CheckCircle2 className="h-8 w-8 text-[#C9A227]" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-[#C9A227] mb-2">500+</div>
                <div className="text-sm text-muted-foreground">выигранных дел</div>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#C9A227]/10 mb-4">
                  <Users className="h-8 w-8 text-[#C9A227]" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-[#C9A227] mb-2">1000+</div>
                <div className="text-sm text-muted-foreground">довольных клиентов</div>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#C9A227]/10 mb-4">
                  <Clock className="h-8 w-8 text-[#C9A227]" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-[#C9A227] mb-2">24/7</div>
                <div className="text-sm text-muted-foreground">готовы помочь</div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Clusters */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-montserrat text-3xl md:text-4xl font-bold mb-4">Наши услуги</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Специализируемся на трёх основных направлениях юридической практики
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {serviceClusters.map((cluster) => {
                const Icon = iconMap[cluster.icon];
                return (
                  <Card 
                    key={cluster.id} 
                    className="hover:shadow-xl transition-all duration-300 border-2 hover:border-[#C9A227]/30 group" 
                    id={cluster.slug}
                  >
                    <CardHeader className="pb-4">
                      <div className="mb-4 inline-flex p-4 rounded-lg bg-[#C9A227]/10 group-hover:bg-[#C9A227]/20 transition-colors">
                        <Icon className="h-12 w-12 text-[#C9A227]" />
                      </div>
                      <CardTitle className="font-montserrat text-2xl mb-3">{cluster.title}</CardTitle>
                      <p className="text-muted-foreground leading-relaxed">{cluster.description}</p>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-4 text-sm text-muted-foreground">
                        <span className="font-semibold text-foreground">{cluster.situations.length}</span> специализаций
                      </div>
                      <ul className="space-y-2 mb-6">
                        {cluster.situations.slice(0, 5).map((situation) => (
                          <li key={situation.id} className="flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 text-[#C9A227] flex-shrink-0 mt-0.5" />
                            <Link
                              to={`/uslugi/${cluster.slug}/${situation.slug}`}
                              className="text-sm text-muted-foreground hover:text-[#C9A227] transition-colors"
                            >
                              {situation.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                      <Button 
                        variant="outline" 
                        className="w-full border-[#C9A227]/30 hover:bg-[#C9A227]/10 hover:border-[#C9A227]"
                        asChild
                      >
                        <Link to={`/uslugi#${cluster.slug}`}>
                          Все услуги раздела ({cluster.situations.length})
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Why Us Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-montserrat text-3xl md:text-4xl font-bold mb-4">Почему выбирают нас</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Профессионализм, опыт и индивидуальный подход к каждому клиенту
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="border-l-4 border-l-[#C9A227]">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-[#C9A227]/10">
                      <Shield className="h-6 w-6 text-[#C9A227]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Опыт с 2005 года</h3>
                      <p className="text-sm text-muted-foreground">
                        Более 15 лет успешной практики в самых сложных делах
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-[#C9A227]">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-[#C9A227]/10">
                      <Clock className="h-6 w-6 text-[#C9A227]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Работаем 24/7</h3>
                      <p className="text-sm text-muted-foreground">
                        Срочная помощь в любое время, выезд в течение 2 часов
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-[#C9A227]">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-[#C9A227]/10">
                      <TrendingUp className="h-6 w-6 text-[#C9A227]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Высокий процент побед</h3>
                      <p className="text-sm text-muted-foreground">
                        Более 85% дел завершаются в пользу наших клиентов
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-[#C9A227]">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-[#C9A227]/10">
                      <Users className="h-6 w-6 text-[#C9A227]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Индивидуальный подход</h3>
                      <p className="text-sm text-muted-foreground">
                        Разрабатываем уникальную стратегию для каждого дела
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-[#C9A227]">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-[#C9A227]/10">
                      <Award className="h-6 w-6 text-[#C9A227]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Команда профессионалов</h3>
                      <p className="text-sm text-muted-foreground">
                        Адвокаты с опытом работы в крупных делах и сложных спорах
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-[#C9A227]">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-[#C9A227]/10">
                      <CheckCircle2 className="h-6 w-6 text-[#C9A227]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Прозрачность</h3>
                      <p className="text-sm text-muted-foreground">
                        Честные цены, никаких скрытых платежей, регулярная отчётность
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <Card className="bg-gradient-to-br from-[#0B1F3A] to-[#0C1926] text-white border-0">
              <CardContent className="pt-12 pb-12">
                <div className="max-w-3xl mx-auto text-center">
                  <h2 className="font-montserrat text-3xl md:text-4xl font-bold mb-4">
                    Нужна юридическая помощь?
                  </h2>
                  <p className="text-xl text-white/80 mb-8">
                    Получите бесплатную консультацию и узнайте, как мы можем помочь в вашей ситуации
                  </p>
                  <div className="flex flex-wrap gap-4 justify-center">
                    <Button size="lg" className="bg-[#C9A227] hover:bg-[#B08E1F] text-white font-medium" asChild>
                      <Link to="/kontakty">
                        Записаться на консультацию
                      </Link>
                    </Button>
                    <Button 
                      size="lg" 
                      variant="outline" 
                      className="border-white/20 bg-white/10 hover:bg-white/20 text-white"
                      asChild
                    >
                      <a href="tel:+79168597654">
                        <Phone className="mr-2 h-5 w-5" />
                        +7 (916) 859-76-54
                      </a>
                    </Button>
                  </div>
                  <p className="text-sm text-white/60 mt-6">
                    Работаем круглосуточно. Срочный выезд в течение 2 часов.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default UslugiNew;
