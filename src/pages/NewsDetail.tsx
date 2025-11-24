import { useParams, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { newsItems } from "@/data/news";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowLeft, Clock, MapPin, Users } from "lucide-react";
import { SITE } from "@/config/site";

const NewsDetail = () => {
  const { id } = useParams();
  const newsItem = newsItems.find(item => item.id === id);

  if (!newsItem) {
    return <Navigate to="/novosti" replace />;
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getCategoryLabel = (category: typeof newsItem.category) => {
    switch(category) {
      case 'article': return 'Статья';
      case 'event': return 'Предстоящее мероприятие';
      case 'past-event': return 'Прошедшее мероприятие';
    }
  };

  const getCategoryColor = (category: typeof newsItem.category) => {
    switch(category) {
      case 'article': return 'bg-primary text-primary-foreground';
      case 'event': return 'bg-green-600 text-white';
      case 'past-event': return 'bg-muted text-muted-foreground';
    }
  };


  return (
    <>
      <Helmet>
        <title>{newsItem.title} - {SITE.name}</title>
        <meta name="description" content={newsItem.excerpt} />
        <meta property="og:title" content={`${newsItem.title} - ${SITE.name}`} />
        <meta property="og:description" content={newsItem.excerpt} />
        {newsItem.image && <meta property="og:image" content={newsItem.image} />}
      </Helmet>
      
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        
        <main className="flex-1">
          {/* Hero Section */}
          <section className="relative py-16 md:py-24 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background" />
            <div className="container mx-auto px-4 relative z-10">
              <Button 
                variant="ghost" 
                className="mb-6 gap-2"
                onClick={() => window.history.back()}
              >
                <ArrowLeft className="h-4 w-4" />
                Назад к новостям
              </Button>
              
              <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-3 mb-6">
                  <Badge className={getCategoryColor(newsItem.category)}>
                    {getCategoryLabel(newsItem.category)}
                  </Badge>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(newsItem.date)}</span>
                  </div>
                </div>
                
                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                  {newsItem.title}
                </h1>
                
                <p className="text-xl text-muted-foreground">
                  {newsItem.excerpt}
                </p>
              </div>
            </div>
          </section>


          {/* Content Section */}
          <section className="py-12">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                {newsItem.id === 'children-day-2025' ? (
                  <div className="prose prose-lg max-w-none">
                    <div className="bg-card rounded-lg p-8 mb-8 border">
                      <h2 className="text-2xl font-bold mb-6 text-foreground">О мероприятии</h2>
                      <p className="text-muted-foreground leading-relaxed mb-6">
                        В соответствии с решением Правительственной комиссии по вопросам реализации 
                        Федерального закона от 21.11.2011 № 324-ФЗ «О бесплатной юридической помощи 
                        в Российской Федерации» (протокол от 25.09.2013 № 2), с 2013 года во всех 
                        субъектах Российской Федерации ежегодно 20 ноября проводится Всероссийский 
                        день правовой помощи детям.
                      </p>
                      <p className="text-muted-foreground leading-relaxed mb-6">
                        20 ноября 2025 года адвокатская коллегия Профзащита приняла участие в этой важной 
                        общероссийской акции. В течение всего дня, с 10:00 до 17:00, в офисе коллегии 
                        велся прием граждан, нуждающихся в бесплатной юридической помощи.
                      </p>
                      
                      <div className="grid md:grid-cols-2 gap-6 my-8">
                        <div className="flex items-start gap-3">
                          <Calendar className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                          <div>
                            <h3 className="font-semibold text-foreground mb-1">Дата проведения</h3>
                            <p className="text-muted-foreground">20 ноября 2025 года</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-3">
                          <Clock className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                          <div>
                            <h3 className="font-semibold text-foreground mb-1">Время работы</h3>
                            <p className="text-muted-foreground">с 10:00 до 17:00</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-3">
                          <MapPin className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                          <div>
                            <h3 className="font-semibold text-foreground mb-1">Место проведения</h3>
                            <p className="text-muted-foreground">Офис адвокатской коллегии Профзащита</p>
                            <p className="text-sm text-muted-foreground mt-1">г. Москва</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-3">
                          <Users className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                          <div>
                            <h3 className="font-semibold text-foreground mb-1">Формат</h3>
                            <p className="text-muted-foreground">Бесплатная помощь</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-primary/5 rounded-lg p-8 mb-8 border border-primary/20">
                      <h2 className="text-2xl font-bold mb-6 text-foreground">Кому была оказана помощь</h2>
                      <p className="text-muted-foreground leading-relaxed mb-6">
                        В рамках мероприятия бесплатная квалифицированная юридическая помощь оказывалась 
                        следующим категориям граждан:
                      </p>
                      <ul className="space-y-4">
                        <li className="flex items-start gap-3">
                          <div className="bg-primary rounded-full p-1 mt-1">
                            <div className="w-2 h-2 bg-primary-foreground rounded-full" />
                          </div>
                          <span className="text-muted-foreground">Детям-сиротам и детям, оставшимся без попечения родителей, а также лицам из их числа</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="bg-primary rounded-full p-1 mt-1">
                            <div className="w-2 h-2 bg-primary-foreground rounded-full" />
                          </div>
                          <span className="text-muted-foreground">Приемным семьям, опекунам и попечителям несовершеннолетних</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="bg-primary rounded-full p-1 mt-1">
                            <div className="w-2 h-2 bg-primary-foreground rounded-full" />
                          </div>
                          <span className="text-muted-foreground">Детям-инвалидам и их родителям (законным представителям)</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="bg-primary rounded-full p-1 mt-1">
                            <div className="w-2 h-2 bg-primary-foreground rounded-full" />
                          </div>
                          <span className="text-muted-foreground">Семьям с детьми, находящимся в трудной жизненной ситуации</span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-card rounded-lg p-8 mb-8 border">
                      <h2 className="text-2xl font-bold mb-6 text-foreground">Виды оказанной юридической помощи</h2>
                      <div className="space-y-4">
                        <div className="flex items-start gap-3 p-4 bg-background rounded-lg">
                          <div className="text-primary text-2xl font-bold">01</div>
                          <div>
                            <h3 className="font-semibold text-foreground mb-2">Устные консультации</h3>
                            <p className="text-muted-foreground">
                              Адвокаты коллегии давали разъяснения по правовым вопросам, касающимся прав и интересов детей, 
                              включая вопросы семейного, жилищного, наследственного права, а также вопросы получения 
                              государственной поддержки и социальных выплат.
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-3 p-4 bg-background rounded-lg">
                          <div className="text-primary text-2xl font-bold">02</div>
                          <div>
                            <h3 className="font-semibold text-foreground mb-2">Письменные консультации</h3>
                            <p className="text-muted-foreground">
                              По наиболее сложным юридическим ситуациям были подготовлены подробные письменные заключения 
                              с анализом правовой ситуации и рекомендациями по дальнейшим действиям.
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-3 p-4 bg-background rounded-lg">
                          <div className="text-primary text-2xl font-bold">03</div>
                          <div>
                            <h3 className="font-semibold text-foreground mb-2">Составление документов</h3>
                            <p className="text-muted-foreground">
                              Оказана помощь в подготовке заявлений, жалоб, исковых заявлений и других документов 
                              правового характера для защиты прав и законных интересов несовершеннолетних.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg p-8 border border-primary/20">
                      <h2 className="text-2xl font-bold mb-4 text-foreground">Итоги мероприятия</h2>
                      <p className="text-muted-foreground leading-relaxed mb-4">
                        Мероприятие прошло успешно. За день приема было проконсультировано значительное количество 
                        граждан, многие получили не только юридические консультации, но и практическую помощь в 
                        составлении необходимых документов.
                      </p>
                      <p className="text-muted-foreground leading-relaxed">
                        Адвокатская коллегия Профзащита планирует и в дальнейшем принимать активное участие в 
                        социально значимых проектах по оказанию бесплатной юридической помощи незащищенным 
                        категориям граждан.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="prose prose-lg max-w-none">
                    <p className="text-muted-foreground leading-relaxed">
                      {newsItem.content}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Нужна юридическая помощь?
                </h2>
                <p className="text-muted-foreground mb-8">
                  Свяжитесь с нами для получения профессиональной консультации
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Button size="lg">
                    Получить консультацию
                  </Button>
                  <Button size="lg" variant="outline" onClick={() => window.history.back()}>
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Вернуться к новостям
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default NewsDetail;