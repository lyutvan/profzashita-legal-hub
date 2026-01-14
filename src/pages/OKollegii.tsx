import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Award, Target, TrendingUp } from "lucide-react";
import office1Img from "@/assets/office-1.jpg";
import office2Img from "@/assets/office-2.jpg";
import { PersonSchema, BreadcrumbSchema } from "@/components/JsonLd";
import { SITE } from "@/config/site";
import { Helmet } from "react-helmet";
import { teamMembers } from "@/data/team";
import { getServicesByAudience } from "@/data/services-audiences";
import TeamSection from "@/components/TeamSection";

const About = () => {
  const topCriminalServices = getServicesByAudience("criminal").slice(0, 6);

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>О коллегии — Профзащита</title>
        <meta name="description" content="Команда опытных адвокатов Профзащита: 15+ лет опыта, 500+ выигранных дел, 98% довольных клиентов. Профессиональная юридическая помощь в Москве." />
        <link rel="canonical" href={`${SITE.url}o-kollegii/`} />
        
        {/* OpenGraph */}
        <meta property="og:title" content="О коллегии адвокатов Профзащита" />
        <meta property="og:description" content="15+ лет опыта, 500+ выигранных дел, 98% довольных клиентов. Команда профессиональных адвокатов в Москве." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${SITE.url}o-kollegii/`} />
        <meta property="og:image" content={SITE.ogImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="ru_RU" />
        <meta property="og:site_name" content="Профзащита" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="О коллегии — Профзащита" />
        <meta name="twitter:description" content="15+ лет опыта, 500+ выигранных дел. Команда профессиональных адвокатов." />
        <meta name="twitter:image" content={SITE.ogImage} />
      </Helmet>

      <BreadcrumbSchema items={[
        { name: "Главная", url: SITE.url },
        { name: "О коллегии", url: `${SITE.url}o-kollegii/` }
      ]} />

      {teamMembers.map(member => {
        const photoUrl = member.photo ? `${SITE.url}${member.photo.replace(/^\//, "")}` : undefined;

        return (
          <PersonSchema 
            key={member.slug}
            name={member.name}
            jobTitle={member.role}
            image={photoUrl}
            url={`${SITE.url}team/${member.slug}`}
          />
        );
      })}

      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary to-primary/90 text-primary-foreground py-20 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="font-playfair text-4xl md:text-5xl font-bold mb-6">
                О <span className="text-accent">коллегии</span>
              </h1>
              <p className="text-lg text-primary-foreground/80 leading-relaxed">
                Команда профессионалов, которая стоит на защите ваших прав и интересов
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section with Library Image */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              {/* Office images + Mission side by side */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 items-center">
                {/* Office images */}
                <div className="space-y-6">
                  <div className="rounded-lg overflow-hidden shadow-elegant">
                    <img 
                      src={office1Img} 
                      alt="Офис коллегии адвокатов Профзащита" 
                      className="w-full h-[300px] object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="rounded-lg overflow-hidden shadow-elegant">
                    <img 
                      src={office2Img} 
                      alt="Кабинет адвоката в коллегии Профзащита" 
                      className="w-full h-[300px] object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>

                {/* Mission cards */}
                <div className="space-y-6">
                  <Card className="border-border">
                    <CardContent className="pt-6">
                      <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                        <Target className="h-6 w-6 text-accent" />
                      </div>
                      <h3 className="font-playfair text-xl font-bold mb-3">Наша миссия</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Обеспечить каждому клиенту профессиональную юридическую защиту, 
                        основанную на глубоких знаниях законодательства и многолетнем опыте.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-border">
                    <CardContent className="pt-6">
                      <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                        <TrendingUp className="h-6 w-6 text-accent" />
                      </div>
                      <h3 className="font-playfair text-xl font-bold mb-3">Наши ценности</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Профессионализм, честность, конфиденциальность и неизменная ответственность 
                        перед каждым клиентом — основа нашей работы.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="prose prose-lg max-w-none">
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  Коллегия адвокатов «Профзащита» была основана группой опытных юристов, 
                  объединённых желанием предоставлять качественные юридические услуги на самом высоком уровне.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  За годы работы мы сформировали команду специалистов, каждый из которых является экспертом 
                  в своей области права. Наши адвокаты регулярно повышают квалификацию, следят за изменениями 
                  в законодательстве и судебной практике.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Мы гордимся тем, что более 98% наших клиентов достигают положительного результата в своих делах. 
                  Это стало возможным благодаря индивидуальному подходу, тщательной подготовке и профессионализму 
                  наших адвокатов.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-accent mb-2">15+</div>
                <div className="text-sm text-muted-foreground">лет на рынке</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-accent mb-2">25+</div>
                <div className="text-sm text-muted-foreground">адвокатов в команде</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-accent mb-2">500+</div>
                <div className="text-sm text-muted-foreground">выигранных дел</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-accent mb-2">98%</div>
                <div className="text-sm text-muted-foreground">довольных клиентов</div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <TeamSection 
          title="Наша команда" 
          subtitle="Профессионалы с многолетним опытом в различных областях права"
        />

        {/* Criminal Services Links */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mb-8">
              <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-4">
                Направления уголовной защиты
              </h2>
              <p className="text-muted-foreground">
                Ключевые направления, по которым мы ведем уголовные дела.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {topCriminalServices.map((service) => (
                <Link
                  key={service.path}
                  to={service.path}
                  className="text-sm text-[#0B1F3A] hover:text-[#C9A227] hover:underline"
                >
                  {service.title}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Achievements Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-6">
                Достижения и <span className="text-accent">признание</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {[
                "Победители рейтинга лучших юридических компаний России",
                "Член Адвокатской палаты города Москвы",
                "Рекомендованы ведущими деловыми изданиями",
                "Многократные победители в резонансных делах",
              ].map((achievement, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-card rounded-lg border border-border">
                  <Award className="h-6 w-6 text-accent flex-shrink-0 mt-0.5" />
                  <p className="text-base">{achievement}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
