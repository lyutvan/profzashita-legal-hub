import { Article } from "@/data/articles";
import ArticleCard from "./ArticleCard";

interface RelatedArticlesProps {
  articles: Article[];
  title?: string;
}

const RelatedArticles = ({ articles, title = "Похожие материалы" }: RelatedArticlesProps) => {
  if (articles.length === 0) return null;

  return (
    <section className="py-12 bg-muted/30">
      <div className="container mx-auto px-4">
        <h2 className="font-playfair text-2xl md:text-3xl font-bold mb-8 text-center">
          {title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedArticles;
