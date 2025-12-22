import { Link, Navigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import LeadForm from "@/components/LeadForm";
import { getTeamMemberBySlug } from "@/data/team";
import { SITE } from "@/config/site";
import { Phone, Mail, MapPin, Briefcase, CheckCircle2, BookOpen, Languages } from "lucide-react";

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

const TeamMemberPage = () => {
  const { slug } = useParams();
  const member = slug ? getTeamMemberBySlug(slug) : undefined;

  if (!member) {
    return <Navigate to="/team" replace />;
  }

  const experience = formatExperience(member.experienceYears);
  const city = member.city ?? SITE.address.city;
  const phone = member.phone ?? SITE.phone;
  const email = member.email ?? SITE.email;
  const description = member.description ?? `Проводит консультации и представляет интересы клиентов по направлениям: ${member.specializations.join(", ")}.`;
  const caseList = member.cases ?? [];
  const education = member.education ?? [];
  const languages = member.languages ?? [];

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>{member.name} — адвокат | Профзащита</title>
        <meta 
          name="description" 
          content={`${member.role}. ${member.specializations.join(", ")}. Консультация и представительство в суде.`} 
        />
        <link rel="canonical" href={`${SITE.url}team/${member.slug}`} />
      </Helmet>

      <Header />

      <main className="flex-1">
        <section className="relative bg-gradient-to-br from-[#0B1F3A] to-[#0C1926] text-white py-14 md:py-16 lg:py-20 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.07),transparent_40%),radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.06),transparent_35%)]" />
          <div className="container mx-auto px-4 relative z-10">
            <Breadcrumbs 
              items={[
                { label: "Главная", path: "/" },
                { label: "Команда", path: "/team" },
                { label: member.name }
              ]}
            />

            <div className="grid grid-cols-1 lg:grid-cols-[1.1fr,0.9fr] gap-10 items-center mt-8">
              <div className="space-y-4">
                <p className="text-white/70 uppercase tracking-[0.08em] text-sm">Профиль адвоката</p>
                <h1 className="font-playfair text-4xl md:text-5xl font-bold leading-tight">{member.name}</h1>
                <p className="text-lg text-[#C9A227] font-semibold">{member.role}</p>

                <div className="flex flex-wrap gap-3 text-sm text-white/90">
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/10">
                    <MapPin className="h-4 w-4" />
                    {city}
                  </span>
                  {experience && (
                    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/10">
                      {experience}
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap gap-2">
                  {member.specializations.slice(0, 6).map((spec) => (
                    <span key={spec} className="px-3 py-1 rounded-full bg-white/10 border border-white/10 text-sm">
                      {spec}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3 pt-2">
                  <Button asChild className="bg-[#C9A227] hover:bg-[#B08E1F] text-white">
                    <a href={`tel:${phone.replace(/[^+\d]/g, "")}`}>
                      <Phone className="mr-2 h-4 w-4" />
                      Позвонить
                    </a>
                  </Button>
                  <Button asChild variant="outline" className="border-white/30 text-white hover:bg-white/10">
                    <a href={`mailto:${email}`}>
                      <Mail className="mr-2 h-4 w-4" />
                      Написать
                    </a>
                  </Button>
                </div>
              </div>

              <div className="relative h-64 md:h-72 rounded-2xl overflow-hidden shadow-elegant border border-white/10">
                {member.photo ? (
                  <img 
                    src={member.photo} 
                    alt={member.name} 
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[#0B1F3A] to-[#0C1926] flex items-center justify-center text-4xl font-bold">
                    {member.name.charAt(0)}
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/25 to-transparent" />
                <div className="absolute bottom-4 left-4 bg-white/15 text-white text-sm px-3 py-1.5 rounded-full border border-white/20">
                  Член коллегии «Профзащита»
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-muted/20">
          <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-[1.35fr,0.65fr] gap-10">
            <div className="space-y-8">
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <Briefcase className="h-5 w-5 text-accent" />
                    Специализации
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {member.specializations.map((spec) => (
                      <li key={spec} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-accent mt-1" />
                        <span>{spec}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <BookOpen className="h-5 w-5 text-accent" />
                    Чем поможем
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-muted-foreground leading-relaxed">
                  {description.split("\n").map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <CheckCircle2 className="h-5 w-5 text-accent" />
                    Практика / кейсы
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {caseList.length > 0 ? (
                    <ul className="space-y-3">
                      {caseList.map((item, idx) => (
                        <li key={idx} className="p-3 rounded-lg bg-muted/50 border border-border/60">
                          <p className="font-medium">{item.title}</p>
                          {item.result && (
                            <p className="text-sm text-muted-foreground mt-1">{item.result}</p>
                          )}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-muted-foreground">Кейсы будут добавлены позже. Запросите информацию у нашего консультанта.</p>
                  )}
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <BookOpen className="h-5 w-5 text-accent" />
                    Образование
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {education.length > 0 ? (
                    <ul className="space-y-2 text-sm">
                      {education.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-accent mt-1" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-muted-foreground">Информация об образовании будет добавлена.</p>
                  )}
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <Phone className="h-5 w-5 text-accent" />
                    Контакты
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Телефон</p>
                    <a href={`tel:${phone.replace(/[^+\d]/g, "")}`} className="text-lg font-semibold hover:text-accent transition-colors">
                      {phone}
                    </a>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Email</p>
                    <a href={`mailto:${email}`} className="text-lg font-semibold hover:text-accent transition-colors">
                      {email}
                    </a>
                  </div>
                  {member.reesterNumber && (
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Номер в реестре адвокатов</p>
                      <p className="font-medium">{member.reesterNumber}</p>
                    </div>
                  )}
                  {languages.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground flex items-center gap-2">
                        <Languages className="h-4 w-4 text-accent" />
                        Языки
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {languages.map((lang) => (
                          <span key={lang} className="px-3 py-1 rounded-full bg-muted text-sm border border-border">
                            {lang}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="flex flex-col gap-3 pt-2">
                    <Button asChild className="bg-[#C9A227] hover:bg-[#B08E1F] text-white">
                      <a href={`tel:${phone.replace(/[^+\d]/g, "")}`}>
                        Позвонить сейчас
                      </a>
                    </Button>
                    <Button asChild variant="outline">
                      <Link to="/kontakty">Записаться на встречу</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border shadow-elegant">
                <CardHeader>
                  <CardTitle className="text-xl">Получить консультацию</CardTitle>
                </CardHeader>
                <CardContent className="pt-2">
                  <LeadForm variant="compact" />
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default TeamMemberPage;
