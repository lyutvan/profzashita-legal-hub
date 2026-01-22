import { Link, Navigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { newsItems } from "@/data/news";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArticleSchema } from "@/components/JsonLd";
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
    return new Intl.DateTimeFormat('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
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


  const newsUrl = `${SITE.url}news/${newsItem.id}`;
  const ogImage = newsItem.image ?? SITE.ogImage;

  return (
    <>
      <Helmet>
        <title>{newsItem.title} - {SITE.name}</title>
        <meta name="description" content={newsItem.excerpt} />
        <link rel="canonical" href={newsUrl} />
        <meta property="og:title" content={`${newsItem.title} - ${SITE.name}`} />
        <meta property="og:description" content={newsItem.excerpt} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={newsUrl} />
        <meta property="og:image" content={ogImage} />
      </Helmet>

      <ArticleSchema
        headline={newsItem.title}
        description={newsItem.excerpt}
        datePublished={newsItem.date}
        author="Коллегия адвокатов города Москвы «Профзащита»"
        url={newsUrl}
        image={ogImage}
      />
      
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        
        <main className="flex-1">
          {/* Hero Section */}
          <section className="relative section overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background" />
            <div className="container relative z-10">
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
                
                <h1 className="text-h1-mobile md:text-h1 font-bold text-foreground mb-6">
                  {newsItem.title}
                </h1>
                
                <p className="text-body-mobile md:text-body text-muted-foreground">
                  {newsItem.excerpt}
                </p>
              </div>
            </div>
          </section>


          {/* Content Section */}
          <section className="section">
            <div className="container">
              <div className="max-w-4xl mx-auto">
                {newsItem.id === 'children-day-2025' ? (
                  <div className="prose prose-lg max-w-none">
                    <div className="bg-card rounded-xl p-8 mb-8 border">
                      <h2 className="text-h2-mobile md:text-h2 font-bold mb-6 text-foreground">О мероприятии</h2>
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
                            <p className="text-small text-muted-foreground mt-1">г. Москва</p>
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

                    <div className="bg-primary/5 rounded-xl p-8 mb-8 border border-primary/20">
                      <h2 className="text-h2-mobile md:text-h2 font-bold mb-6 text-foreground">Кому была оказана помощь</h2>
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

                    <div className="bg-card rounded-xl p-8 mb-8 border">
                      <h2 className="text-h2-mobile md:text-h2 font-bold mb-6 text-foreground">Виды оказанной юридической помощи</h2>
                      <div className="space-y-4">
                        <div className="flex items-start gap-3 p-4 bg-background rounded-xl">
                          <div className="text-primary text-h3-mobile md:text-h3 font-bold">01</div>
                          <div>
                            <h3 className="font-semibold text-foreground mb-2">Устные консультации</h3>
                            <p className="text-muted-foreground">
                              Адвокаты коллегии давали разъяснения по правовым вопросам, касающимся прав и интересов детей, 
                              включая вопросы семейного, жилищного, наследственного права, а также вопросы получения 
                              государственной поддержки и социальных выплат.
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-3 p-4 bg-background rounded-xl">
                          <div className="text-primary text-h3-mobile md:text-h3 font-bold">02</div>
                          <div>
                            <h3 className="font-semibold text-foreground mb-2">Письменные консультации</h3>
                            <p className="text-muted-foreground">
                              По наиболее сложным юридическим ситуациям были подготовлены подробные письменные заключения 
                              с анализом правовой ситуации и рекомендациями по дальнейшим действиям.
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-3 p-4 bg-background rounded-xl">
                          <div className="text-primary text-h3-mobile md:text-h3 font-bold">03</div>
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

                    <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-8 border border-primary/20">
                      <h2 className="text-h2-mobile md:text-h2 font-bold mb-4 text-foreground">Итоги мероприятия</h2>
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
                ) : newsItem.sections ? (
                  <div className="space-y-8">
                    {newsItem.intro && (
                      <p className="text-body-mobile md:text-body text-muted-foreground leading-relaxed">
                        {newsItem.intro}
                      </p>
                    )}

                    {newsItem.sections.map((section) => (
                      <div key={section.title} className="space-y-4">
                        <h2 className="text-h2-mobile md:text-h2 font-bold text-foreground">
                          {section.title}
                        </h2>
                        <ul className="space-y-3">
                          {section.items.map((item, index) => (
                            <li key={`${section.title}-${index}`} className="flex flex-col gap-2">
                              <div className="flex items-start gap-3">
                                <span className="mt-2 h-2 w-2 rounded-full bg-accent flex-shrink-0" />
                                <span className="text-body-mobile md:text-body text-muted-foreground leading-relaxed">
                                  {item.text}
                                </span>
                              </div>
                              {item.subitems && (
                                <ul className="ml-6 space-y-1 list-disc text-small text-muted-foreground">
                                  {item.subitems.map((subitem) => (
                                    <li key={subitem}>{subitem}</li>
                                  ))}
                                </ul>
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}

                    {newsItem.closing && (
                      <p className="text-body-mobile md:text-body text-muted-foreground leading-relaxed">
                        {newsItem.closing}
                      </p>
                    )}
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
          <section className="section bg-muted/30">
            <div className="container">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-h2-mobile md:text-h2 font-bold text-foreground mb-4">
                  Нужна консультация по вашей ситуации?
                </h2>
                <p className="text-muted-foreground mb-8">
                  Поможем оценить ситуацию и предложим следующий шаг.
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Button size="lg" asChild>
                    <Link to="/kontakty">Записаться</Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <a href={`https://wa.me/${SITE.phoneRaw.replace("+", "")}`} target="_blank" rel="noopener noreferrer">
                      Связаться
                    </a>
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
