import { Link } from "react-router-dom";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Calendar, Clock } from "lucide-react";
import { Article } from "@/data/articles";

interface ArticleCardProps {
  article: Article;
}

const ArticleCard = ({ article }: ArticleCardProps) => {
  return (
    <Card className="border-border hover:shadow-elegant transition-all h-full flex flex-col">
      <Link to={`/knowledge/${article.slug}`} className="flex-1 flex flex-col">
        {/* Hero Image */}
        {article.heroImage && (
          <div className="w-full h-48 overflow-hidden rounded-t-lg">
            <img
              src={article.heroImage}
              alt={article.title}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          </div>
        )}
        
        <CardContent className="pt-6 flex-1 flex flex-col">
          {/* Category Badge */}
          <Badge variant="secondary" className="bg-accent/10 text-accent border-accent/20 mb-3 w-fit">
            {article.category}
          </Badge>
          
          {/* Title */}
          <h3 className="font-playfair text-xl font-bold mb-3 hover:text-accent transition-colors line-clamp-2">
            {article.title}
          </h3>
          
          {/* Description */}
          <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3 flex-1">
            {article.description}
          </p>
          
          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground pt-4 border-t border-border">
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>
                {new Date(article.datePublished).toLocaleDateString('ru-RU', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{article.readingTime} мин</span>
            </div>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
};

export default ArticleCard;
