import { useParams, Navigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AuthorBio from "@/components/AuthorBio";
import TableOfContents from "@/components/TableOfContents";
import RelatedArticles from "@/components/RelatedArticles";
import { Helmet } from "react-helmet";
import { getArticleBySlug, getRelatedArticles } from "@/data/articles";
import { BlogPostingSchema, BreadcrumbSchema } from "@/components/JsonLd";
import { SITE } from "@/config/site";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, AlertCircle, ExternalLink, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import ReactMarkdown from "react-markdown";

const ArticleDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? getArticleBySlug(slug) : undefined;

  if (!article) {
    return <Navigate to="/knowledge" replace />;
  }

  const relatedArticles = getRelatedArticles(article, 3);
  const currentUrl = article.canonical;

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>{article.title} — Профзащита</title>
        <meta name="description" content={article.description} />
        <link rel="canonical" href={currentUrl} />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.description} />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:image" content={article.heroImage || SITE.ogImage} />
      </Helmet>

      <BlogPostingSchema
        headline={article.title}
        description={article.description}
        datePublished={article.datePublished}
        dateModified={article.dateModified}
        authorName={article.author.name}
        authorJobTitle={article.author.role}
        url={currentUrl}
        image={article.heroImage}
        keywords={article.tags}
        articleSection={article.category}
      />

      <BreadcrumbSchema items={[
        { name: "Главная", url: SITE.url },
        { name: "База знаний", url: `${SITE.url}knowledge/` },
        { name: article.title, url: currentUrl }
      ]} />

      <Header />

      <main className="flex-1">
        <article className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Badge variant="secondary" className="bg-accent/10 text-accent border-accent/20 mb-4">
                {article.category}
              </Badge>
              <h1 className="font-playfair text-3xl md:text-5xl font-bold mb-6 leading-tight">{article.title}</h1>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-8 pb-6 border-b border-border">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {new Date(article.datePublished).toLocaleDateString('ru-RU', { year: 'numeric', month: 'long', day: 'numeric' })}
                </div>
                {article.dateModified !== article.datePublished && (
                  <div className="text-xs">
                    Обновлено: {new Date(article.dateModified).toLocaleDateString('ru-RU')}
                  </div>
                )}
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {article.readingTime} мин
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <div className="lg:col-span-3">
                  <div className="prose prose-lg max-w-none">
                    <ReactMarkdown>{article.content}</ReactMarkdown>
                  </div>

                  {article.references.length > 0 && (
                    <div className="mt-12 p-6 bg-muted/30 rounded-lg border border-border">
                      <h3 className="font-semibold mb-4 flex items-center gap-2">
                        <ExternalLink className="h-5 w-5 text-accent" />
                        Нормативные источники
                      </h3>
                      <ul className="space-y-2 text-sm">
                        {article.references.map((ref, idx) => (
                          <li key={idx}>
                            <a href={ref.url} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                              {ref.title}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {article.disclaimer && (
                    <div className="mt-6 p-4 bg-accent/10 border-l-4 border-accent rounded">
                      <p className="text-sm flex items-start gap-2">
                        <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5 text-accent" />
                        {article.disclaimer}
                      </p>
                    </div>
                  )}

                  <div className="mt-8 flex gap-4">
                    <Button asChild>
                      <a href={article.cta.url}>{article.cta.label}</a>
                    </Button>
                    <Button variant="outline" onClick={() => { if (navigator.share) { navigator.share({ title: article.title, url: currentUrl }); } }}>
                      <Share2 className="h-4 w-4 mr-2" />
                      Поделиться
                    </Button>
                  </div>

                </div>

                <aside className="lg:col-span-1">
                  <TableOfContents content={article.content} />
                </aside>
              </div>
            </div>
          </div>
        </article>

        {relatedArticles.length > 0 && <RelatedArticles articles={relatedArticles} />}
      </main>

      <Footer />
    </div>
  );
};

export default ArticleDetail;
