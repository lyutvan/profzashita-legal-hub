import { Link } from "react-router-dom";
import { articles } from "@/data/articles";
import { Card, CardContent } from "./ui/card";
import { BookOpen, ArrowRight, Clock } from "lucide-react";

interface RecommendedReadingProps {
  tags?: string[];
  category?: string;
  limit?: number;
  title?: string;
}

const RecommendedReading = ({ 
  tags = [], 
  category, 
  limit = 3,
  title = "Рекомендуем прочитать"
}: RecommendedReadingProps) => {
  // Filter articles by tags or category
  const filteredArticles = articles
    .filter(article => {
      if (category && article.category === category) return true;
      if (tags.length > 0 && article.tags.some(tag => tags.includes(tag))) return true;
      return false;
    })
    .slice(0, limit);

  // If no matches, show latest articles
  const displayArticles = filteredArticles.length > 0 
    ? filteredArticles 
    : articles.slice(0, limit);

  if (displayArticles.length === 0) return null;

  return (
    <section className="py-12 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <BookOpen className="h-6 w-6 text-accent" />
            <h2 className="font-playfair text-2xl md:text-3xl font-bold">
              {title}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayArticles.map(article => (
              <Card key={article.id} className="border-border hover:shadow-elegant transition-all group">
                <Link to={`/knowledge/${article.slug}`}>
                  <CardContent className="pt-6">
                    <div className="mb-3">
                      <span className="text-xs text-accent font-medium">
                        {article.category}
                      </span>
                    </div>
                    <h3 className="font-playfair text-lg font-bold mb-3 group-hover:text-accent transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {article.description}
                    </p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{article.readingTime} мин</span>
                      </div>
                      <div className="flex items-center gap-1 text-accent group-hover:gap-2 transition-all">
                        <span>Читать</span>
                        <ArrowRight className="h-3 w-3" />
                      </div>
                    </div>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link 
              to="/knowledge" 
              className="inline-flex items-center gap-2 text-accent hover:underline font-medium"
            >
              Все статьи
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecommendedReading;
