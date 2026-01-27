import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LegalBackground from "@/components/LegalBackground";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Helmet } from "react-helmet";
import columnsImg from "@/assets/legal/court-columns.jpg";
import scalesIcon from "@/assets/legal/justice-scales-vertical.jpg";
import gavelIcon from "@/assets/legal/gavel-horizontal.jpg";
import { cases } from "@/data/cases";
import { ArticleSchema, BreadcrumbSchema } from "@/components/JsonLd";
import { SITE } from "@/config/site";
import { CheckCircle2, Scale, Gavel } from "lucide-react";
import { useQuickQuestionModal } from "@/components/QuickQuestionModalProvider";

const Cases = () => {
  const location = useLocation();
  const { slug } = useParams<{ slug?: string }>();
  const { openQuickQuestionModal } = useQuickQuestionModal();

  useEffect(() => {
    const targetId = slug
      ? decodeURIComponent(slug)
      : location.hash
        ? decodeURIComponent(location.hash.replace("#", ""))
        : null;
    if (!targetId) return;
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [slug, location.hash]);

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Наши кейсы — Профзащита</title>
        <meta name="description" content="Реальные дела и результаты коллегии адвокатов Профзащита. Примеры успешного решения уголовных, гражданских, арбитражных и семейных споров." />
        <link rel="canonical" href={`${SITE.url}keisy/`} />
        
        {/* OpenGraph */}
        <meta property="og:title" content="Наши кейсы — Коллегия адвокатов Профзащита" />
        <meta property="og:description" content="Реальные дела, реальные результаты. Примеры успешного решения сложных юридических споров." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${SITE.url}keisy/`} />
        <meta property="og:image" content={SITE.ogImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="ru_RU" />
        <meta property="og:site_name" content="Профзащита" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Наши кейсы — Профзащита" />
        <meta name="twitter:description" content="Реальные дела, реальные результаты." />
        <meta name="twitter:image" content={SITE.ogImage} />
      </Helmet>

      <BreadcrumbSchema items={[
        { name: "Главная", url: SITE.url },
        { name: "Кейсы", url: `${SITE.url}keisy/` }
      ]} />

      {/* Article schema for each case */}
      {cases.map(caseItem => (
        <ArticleSchema
          key={caseItem.id}
          headline={caseItem.title}
          description={caseItem.task}
          datePublished={caseItem.datePublished}
          author={caseItem.author}
          url={`${SITE.url}keisy/#${caseItem.slug}`}
          image={SITE.ogImage}
          articleBody={`${caseItem.task} ${caseItem.actions} ${caseItem.result}`}
        />
      ))}

      <Header />
      
      <main className="flex-1">
        {/* Hero with columns background */}
        <LegalBackground
          imageSrc={columnsImg}
          imageAlt="Классические колонны здания правосудия"
          overlayOpacity={0.65}
        >
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-serif text-h1-mobile md:text-h1 font-bold mb-6 text-white">
              Наши <span className="text-accent">кейсы</span>
            </h1>
            <p className="text-body-mobile md:text-body text-white/90 leading-relaxed">
              Реальные дела, реальные результаты. Примеры успешного решения 
              сложных юридических вопросов для наших клиентов.
            </p>
          </div>
        </LegalBackground>

        {/* Stats Section */}
        <section className="section bg-muted/30">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <Scale className="h-8 w-8 text-accent" />
                </div>
                <div className="text-h2-mobile md:text-h2 font-bold text-accent mb-2">500+</div>
                <div className="text-small text-muted-foreground">Выигранных дел</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <Gavel className="h-8 w-8 text-accent" />
                </div>
                <div className="text-h2-mobile md:text-h2 font-bold text-accent mb-2">15+</div>
                <div className="text-small text-muted-foreground">Лет практики</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="h-8 w-8 text-accent" />
                </div>
                <div className="text-h2-mobile md:text-h2 font-bold text-accent mb-2">98%</div>
                <div className="text-small text-muted-foreground">Успешных решений</div>
              </div>
            </div>
          </div>
        </section>

        {/* Cases Section */}
        <section className="section">
          <div className="container">
            <div className="max-w-5xl mx-auto space-y-8">
              {cases.map((caseItem, index) => (
                <Card 
                  key={caseItem.id} 
                  id={caseItem.slug}
                  className="border-border hover:shadow-elegant transition-all"
                >
                  <CardContent className="pt-6">
                    <div className="mb-6 flex items-start gap-4">
                      {/* Icon */}
                      <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-muted/50">
                        <img 
                          src={index % 2 === 0 ? scalesIcon : gavelIcon} 
                          alt="" 
                          className="w-full h-full object-cover opacity-80"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <Badge variant="secondary" className="bg-accent/10 text-accent border-accent/20">
                            {caseItem.category}
                          </Badge>
                          <span className="text-small text-muted-foreground">
                            {new Date(caseItem.datePublished).toLocaleDateString('ru-RU', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </span>
                        </div>
                        <h2 className="font-serif text-h3-mobile md:text-h3 font-bold mb-2">
                          {caseItem.title}
                        </h2>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <h3 className="font-semibold text-accent mb-3 flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center text-small">1</span>
                          Задача
                        </h3>
                        <p className="text-muted-foreground leading-relaxed pl-8">
                          {caseItem.task}
                        </p>
                      </div>

                      <div>
                        <h3 className="font-semibold text-accent mb-3 flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center text-small">2</span>
                          Наши действия
                        </h3>
                        <p className="text-muted-foreground leading-relaxed pl-8">
                          {caseItem.actions}
                        </p>
                      </div>

                      <div className="bg-accent/5 border-l-4 border-accent rounded-xl p-6">
                        <h3 className="font-semibold text-accent mb-3 flex items-center gap-2">
                          <CheckCircle2 className="h-5 w-5" />
                          Результат
                        </h3>
                        <p className="text-foreground font-medium leading-relaxed">
                          {caseItem.result}
                        </p>
                      </div>

                      {/* Documents Section */}
                      {caseItem.documents && caseItem.documents.length > 0 && (
                        <div className="mt-6 pt-6 border-t border-border">
                          <h3 className="font-semibold text-accent mb-4 flex items-center gap-2">
                            <Gavel className="h-5 w-5" />
                            Документы по делу
                          </h3>
                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {caseItem.documents.map((doc, docIndex) => (
                              <a
                                key={docIndex}
                                href={doc}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative aspect-[3/4] overflow-hidden rounded-xl border border-border hover:border-accent transition-all hover:shadow-md"
                              >
                                <img
                                  src={doc}
                                  alt={`Документ ${docIndex + 1} по делу: ${caseItem.title}`}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                  loading="lazy"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                                  <div className="absolute bottom-0 left-0 right-0 p-3">
                                    <p className="text-white text-small font-medium">
                                      Просмотреть документ
                                    </p>
                                  </div>
                                </div>
                              </a>
                            ))}
                          </div>
                          <p className="text-small text-muted-foreground mt-3 italic">
                            * Персональные данные на документах скрыты в соответствии с законодательством о защите персональных данных
                          </p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section bg-gradient-to-br from-primary to-primary/90">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-serif text-h2-mobile md:text-h2 font-bold mb-6 text-white">
                Нужна помощь в вашем деле?
              </h2>
              <p className="text-body-mobile md:text-body text-white/90 mb-8 leading-relaxed">
                Получите бесплатную консультацию и узнайте, как мы можем помочь именно вам
              </p>
              <button
                type="button"
                onClick={() => openQuickQuestionModal({ topic: "Кейсы" })}
                className="inline-flex items-center justify-center rounded-xl bg-accent hover:bg-accent/90 text-white font-medium px-8 py-3 transition-colors"
              >
                Записаться на консультацию
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Cases;
