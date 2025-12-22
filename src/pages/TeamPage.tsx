import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { teamMembers } from "@/data/team";
import { SITE } from "@/config/site";
import { Phone, Mail, MapPin, ArrowRight } from "lucide-react";

const formatExperience = (years?: number) => {
  if (years === undefined) return "";
  const mod10 = years % 10;
  const mod100 = years % 100;
  const word = mod100 >= 11 && mod100 <= 14
    ? "лет"
    : mod10 === 1
      ? "год"
      : mod10 >= 2 && mod10 <= 4
        ? "года"
        : "лет";
  return `Стаж ${years} ${word}`;
};

const TeamPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Команда адвокатов | Профзащита</title>
        <meta 
          name="description" 
          content="Команда адвокатов Профзащита: опытные специалисты по уголовным, гражданским и арбитражным делам. Бесплатная консультация в Москве." 
        />
        <link rel="canonical" href={`${SITE.url}team`} />
      </Helmet>

      <Header />

      <main className="flex-1">
        <section className="relative overflow-hidden bg-gradient-to-br from-[#0B1F3A] to-[#0C1926] text-white py-16 md:py-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.06),transparent_35%),radial-gradient(circle_at_80%_10%,rgba(255,255,255,0.05),transparent_30%)]" />
          <div className="container mx-auto px-4 relative z-10">
            <Breadcrumbs items={[{ label: "Главная", path: "/" }, { label: "Команда" }]} />
            <div className="max-w-3xl mt-8">
              <h1 className="font-playfair text-4xl md:text-5xl font-bold mb-4">
                Наша <span className="text-[#C9A227]">команда</span> адвокатов
              </h1>
              <p className="text-lg text-white/85 leading-relaxed">
                Партнёры и адвокаты коллегии, которые лично сопровождают дела клиентов: от срочных выездов до сложных судебных процессов.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member) => {
                const experience = formatExperience(member.experienceYears);
                const city = member.city ?? SITE.address.city;
                const specs = member.specializations.slice(0, 3);

                return (
                  <Card key={member.slug} className="h-full overflow-hidden border-border hover:shadow-elegant transition-all duration-300 group">
                    <CardContent className="p-0 flex flex-col h-full">
                      <div className="relative h-56 bg-muted/40">
                        {member.photo ? (
                          <img
                            src={member.photo}
                            alt={member.name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                            loading="lazy"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-[#0B1F3A] to-[#0C1926] flex items-center justify-center text-white text-2xl font-semibold">
                            {member.name.charAt(0)}
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/35 to-transparent" />
                        <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3 text-sm text-white/90">
                          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-white/15">
                            <MapPin className="h-4 w-4" />
                            {city}
                          </span>
                          {experience && (
                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-white/15">
                              {experience}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="p-6 flex-1 flex flex-col gap-4">
                        <div>
                          <h3 className="font-playfair text-2xl font-semibold mb-1">{member.name}</h3>
                          <p className="text-accent font-medium">{member.role}</p>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {specs.map((spec) => (
                            <span key={spec} className="text-xs px-3 py-1 rounded-full bg-muted text-foreground/80 border border-border">
                              {spec}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                          <Phone className="h-4 w-4 text-accent" />
                          <span>{member.phone ?? SITE.phone}</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                          <Mail className="h-4 w-4 text-accent" />
                          <span>{member.email ?? SITE.email}</span>
                        </div>

                        <div className="mt-auto flex items-center justify-between pt-2">
                          <Button asChild className="bg-[#C9A227] hover:bg-[#B08E1F] text-white">
                            <Link to={`/team/${member.slug}`}>
                              Подробнее
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                          </Button>
                          <Button asChild variant="ghost" className="text-accent hover:text-accent/80">
                            <a href={`tel:${(member.phone ?? SITE.phone).replace(/[^+\d]/g, "")}`}>
                              Позвонить
                            </a>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default TeamPage;
