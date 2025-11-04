import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArticleCard from "@/components/ArticleCard";
import { Helmet } from "react-helmet";
import { articles, articleCategories, getAllTags } from "@/data/articles";
import { BreadcrumbSchema } from "@/components/JsonLd";
import { SITE } from "@/config/site";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, BookOpen } from "lucide-react";

const Knowledge = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const allTags = getAllTags();

  // Filter articles
  const filteredArticles = articles.filter(article => {
    const matchesSearch = 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = !selectedCategory || article.category === selectedCategory;
    const matchesTag = !selectedTag || article.tags.includes(selectedTag);

    return matchesSearch && matchesCategory && matchesTag;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>База знаний — Профзащита</title>
        <meta name="description" content="Юридические статьи, памятки и разъяснения от адвокатов коллегии Профзащита. Уголовное право, процессуальные действия, защита прав." />
        <link rel="canonical" href={`${SITE.url}knowledge/`} />
        
        {/* OpenGraph */}
        <meta property="og:title" content="База знаний — Юридические статьи от адвокатов Профзащита" />
        <meta property="og:description" content="Памятки, разъяснения, инструкции по уголовным делам, процессуальным действиям и защите прав." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${SITE.url}knowledge/`} />
        <meta property="og:image" content={SITE.ogImage} />
        <meta property="og:locale" content="ru_RU" />
        
        {/* Blog Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            "@id": `${SITE.url}knowledge/#blog`,
            "name": "База знаний Профзащита",
            "description": "Юридические статьи и памятки от адвокатов",
            "url": `${SITE.url}knowledge/`,
            "inLanguage": "ru-RU",
            "publisher": { "@id": `${SITE.url}#organization` }
          })}
        </script>
      </Helmet>

      <BreadcrumbSchema items={[
        { name: "Главная", url: SITE.url },
        { name: "База знаний", url: `${SITE.url}knowledge/` }
      ]} />

      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary to-primary/90 py-16 overflow-hidden">
          <div className="absolute inset-0 opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')]" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <BookOpen className="h-8 w-8 text-accent" />
                <h1 className="font-playfair text-4xl md:text-5xl font-bold text-white">
                  База <span className="text-accent">знаний</span>
                </h1>
              </div>
              <p className="text-lg text-white/90 leading-relaxed">
                Юридические статьи, памятки и разъяснения от адвокатов. 
                Всё, что нужно знать о защите своих прав.
              </p>
            </div>
          </div>
        </section>

        {/* Search and Filters */}
        <section className="py-8 bg-muted/30 border-b border-border">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto space-y-6">
              {/* Search */}
              <div className="relative max-w-md mx-auto">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Поиск по статьям..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Category Filters */}
              <div className="flex flex-wrap gap-2 justify-center">
                <Badge
                  variant={selectedCategory === null ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => {
                    setSelectedCategory(null);
                    setSelectedTag(null);
                  }}
                >
                  Все категории
                </Badge>
                {articleCategories.map(category => (
                  <Badge
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => {
                      setSelectedCategory(category);
                      setSelectedTag(null);
                    }}
                  >
                    {category}
                  </Badge>
                ))}
              </div>

              {/* Tag Filters */}
              {allTags.length > 0 && (
                <div>
                  <p className="text-sm text-muted-foreground text-center mb-2">Популярные темы:</p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {allTags.slice(0, 12).map(tag => (
                      <Badge
                        key={tag}
                        variant={selectedTag === tag ? "secondary" : "outline"}
                        className="cursor-pointer text-xs bg-accent/10 hover:bg-accent/20"
                        onClick={() => {
                          setSelectedTag(selectedTag === tag ? null : tag);
                          setSelectedCategory(null);
                        }}
                      >
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Articles Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              {filteredArticles.length > 0 ? (
                <>
                  <div className="mb-6">
                    <p className="text-sm text-muted-foreground">
                      Найдено статей: <strong>{filteredArticles.length}</strong>
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredArticles.map(article => (
                      <ArticleCard key={article.id} article={article} />
                    ))}
                  </div>
                </>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground text-lg">
                    По вашему запросу ничего не найдено. Попробуйте изменить фильтры.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Knowledge;
