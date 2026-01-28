import { useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { newsItems, NewsItem } from "@/data/news";
import { Calendar, FileText, Users, ChevronRight } from "lucide-react";
import { SITE } from "@/config/site";

const Novosti = () => {
  const [filter, setFilter] = useState<'all' | 'article' | 'event' | 'past-event'>('all');

  const filteredNews = filter === 'all' 
    ? newsItems 
    : newsItems.filter(item => item.category === filter);

  const getCategoryLabel = (category: NewsItem['category']) => {
    switch(category) {
      case 'article': return 'Статья';
      case 'event': return 'Предстоящее мероприятие';
      case 'past-event': return 'Прошедшее мероприятие';
    }
  };

  const getCategoryColor = (category: NewsItem['category']) => {
    switch(category) {
      case 'article': return 'bg-primary text-primary-foreground';
      case 'event': return 'bg-green-600 text-white';
      case 'past-event': return 'bg-muted text-muted-foreground';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
  };

  return (
    <>
      <Helmet>
        <title>Новости и мероприятия - {SITE.name}</title>
        <meta name="description" content="Актуальные новости, статьи и информация о мероприятиях коллегии адвокатов Профзащита. Узнайте о последних изменениях в законодательстве и наших мероприятиях." />
        <meta property="og:title" content={`Новости и мероприятия - ${SITE.name}`} />
        <meta property="og:description" content="Актуальные новости, статьи и информация о мероприятиях коллегии адвокатов Профзащита" />
      </Helmet>
      
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        
        <main className="flex-1">
          {/* Hero Section */}
          <section className="bg-gradient-to-br from-primary/10 via-background to-background section">
            <div className="container">
              <div className="max-w-3xl mx-auto text-center">
                <h1 className="text-h1-mobile md:text-h1 font-bold text-foreground mb-6">
                  Новости и мероприятия
                </h1>
                <p className="text-body-mobile md:text-body text-muted-foreground">
                  Следите за актуальными новостями юридического сообщества, нашими статьями и предстоящими мероприятиями
                </p>
              </div>
            </div>
          </section>

          {/* Filter Section */}
          <section className="section border-b">
            <div className="container">
              <div className="flex flex-wrap gap-3 justify-center">
                <Button
                  variant={filter === 'all' ? 'default' : 'outline'}
                  onClick={() => setFilter('all')}
                  className="gap-2"
                >
                  <FileText className="h-4 w-4" />
                  Все
                </Button>
                <Button
                  variant={filter === 'article' ? 'default' : 'outline'}
                  onClick={() => setFilter('article')}
                  className="gap-2"
                >
                  <FileText className="h-4 w-4" />
                  Статьи
                </Button>
                <Button
                  variant={filter === 'event' ? 'default' : 'outline'}
                  onClick={() => setFilter('event')}
                  className="gap-2"
                >
                  <Calendar className="h-4 w-4" />
                  Предстоящие мероприятия
                </Button>
                <Button
                  variant={filter === 'past-event' ? 'default' : 'outline'}
                  onClick={() => setFilter('past-event')}
                  className="gap-2"
                >
                  <Users className="h-4 w-4" />
                  Прошедшие мероприятия
                </Button>
              </div>
            </div>
          </section>

          {/* News Grid */}
          <section className="section">
            <div className="container">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
                {filteredNews.map((item) => (
                  <Card 
                    key={item.id} 
                    className="group hover:shadow-lg transition-shadow duration-300 overflow-hidden h-full flex flex-col"
                  >
                    <CardHeader className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className={getCategoryColor(item.category)}>
                          {getCategoryLabel(item.category)}
                        </Badge>
                        <span className="text-small text-muted-foreground">
                          {formatDate(item.date)}
                        </span>
                      </div>
                      <CardTitle className="group-hover:text-primary transition-colors">
                        {item.title}
                      </CardTitle>
                      <CardDescription className="line-clamp-2">
                        {item.excerpt}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="mt-auto">
                      <Link to={`/news/${item.id}`}>
                        <Button variant="ghost" className="w-full justify-between group/btn">
                          Читать
                          <ChevronRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredNews.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground text-body-mobile md:text-body">
                    Новостей в данной категории пока нет
                  </p>
                </div>
              )}
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Novosti;
