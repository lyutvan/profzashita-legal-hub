import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import LeadForm from "@/components/LeadForm";
import { getTeamMemberBySlug } from "@/data/team";
import { cases } from "@/data/cases";
import { SITE } from "@/config/site";
import { Phone, MapPin, Briefcase, CheckCircle2, BookOpen, FileText } from "lucide-react";
import { useQuickQuestionModal } from "@/components/QuickQuestionModalProvider";

const TeamMemberPage = () => {
  const { slug } = useParams();
  const member = slug ? getTeamMemberBySlug(slug) : undefined;
  const [imageFailed, setImageFailed] = useState(false);
  const [certificatePreview, setCertificatePreview] = useState<{
    src: string;
    title: string;
    rotation?: number;
  } | null>(null);
  const { openQuickQuestionModal } = useQuickQuestionModal();

  if (!member) {
    return <Navigate to="/#team" replace />;
  }

  const experience = member.experienceText;
  const headline = member.headline ?? member.name;
  const leadText = member.leadText;
  const affiliation = member.affiliation;
  const achievements = member.achievements ?? [];
  const seoTitle = member.seoTitle ?? `${member.name} — адвокат | Профзащита`;
  const seoDescription =
    member.seoDescription ??
    `${member.role}. ${member.specializations.join(", ")}. Консультация и представительство в суде.`;
  const hasPhoto = Boolean(member.photo) && !imageFailed;
  const city = member.city ?? SITE.address.city;
  const phone = member.phone ?? SITE.phone;
  const email = member.email ?? SITE.email;
  const about = member.about;
  const memberCaseKey = member.slug === "yulia-lyadova" ? "lyadova" : member.slug;
  const relatedCases = cases.filter((caseItem) => caseItem.lawyers?.includes(memberCaseKey));
  const sortedRelatedCases =
    member.slug === "yulia-lyadova"
      ? [...relatedCases].sort((a, b) => {
          const aTime = a.datePublished ? new Date(a.datePublished).getTime() : 0;
          const bTime = b.datePublished ? new Date(b.datePublished).getTime() : 0;
          return bTime - aTime;
        })
      : relatedCases;
  const shouldShowCasesCard = member.slug !== "yulia-lyadova" || sortedRelatedCases.length > 0;
  const caseList = member.cases ?? [];
  const education = member.education ?? [];
  const educationIconClassName = "h-5 w-5 shrink-0 text-accent mt-0.5";
  const competencies = member.competencies ?? [];
  const practice = member.practice ?? [];
  const publications = member.publications ?? [];
  const specializationItems = Array.from(new Set([...(member.specializations || []), ...(practice || [])]));

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <link rel="canonical" href={`${SITE.url}team/${member.slug}`} />
      </Helmet>

      <Header />

      <main className="flex-1">
        <section className="relative bg-gradient-to-br from-primary to-primary/90 text-white section overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.07),transparent_40%),radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.06),transparent_35%)]" />
          <div className="container relative z-10">
            <Breadcrumbs 
              items={[
                { label: "Главная", path: "/" },
                { label: "Команда", path: "/o-kollegii#team" },
                { label: member.name }
              ]}
            />

            <div className="grid grid-cols-1 lg:grid-cols-[1.1fr,0.9fr] gap-10 items-center mt-8">
              <div className="space-y-4">
                <p className="text-white/70 uppercase tracking-[0.08em] text-small">Профиль адвоката</p>
                <h1 className="font-serif text-h1-mobile md:text-h1 font-bold leading-tight">{headline}</h1>
                {leadText && <p className="lead text-white/85">{leadText}</p>}
                <p className="text-body-mobile md:text-body text-accent font-semibold">{member.role}</p>
                {affiliation && <p className="text-body-mobile md:text-body text-white/85">{affiliation}</p>}
                {experience && !leadText && (
                  <p className="text-white/80 text-body-mobile md:text-body">{experience}</p>
                )}

                <div className="flex flex-wrap gap-3 text-small text-white/90">
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
                    <span key={spec} className="px-3 py-1 rounded-full bg-white/10 border border-white/10 text-small">
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              <div
                className={`relative w-full max-w-[320px] md:max-w-[420px] aspect-square md:aspect-[4/5] rounded-xl overflow-hidden shadow-elegant mx-auto md:mx-0 ${
                  hasPhoto ? "border-2 border-accent/25 bg-white/5" : "bg-white/10"
                }`}
              >
                {hasPhoto ? (
                  <img 
                    src={member.photo} 
                    alt={member.name} 
                    className="w-full h-full object-cover object-center"
                    loading="lazy"
                    onError={() => setImageFailed(true)}
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-primary to-primary/90 flex items-center justify-center text-h2-mobile md:text-h2 font-bold">
                    {member.name.charAt(0)}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="section bg-muted/20">
          <div className="container grid grid-cols-1 lg:grid-cols-[1.35fr,0.65fr] gap-10">
            <div className="space-y-8">
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-h3-mobile md:text-h3">
                    <Briefcase className="h-5 w-5 text-accent" />
                    Специализации
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {specializationItems.map((spec) => (
                      <li key={spec} className="flex items-start gap-2 text-small">
                        <CheckCircle2 className="h-4 w-4 text-accent mt-1" />
                        <span>{spec}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-h3-mobile md:text-h3">
                    <BookOpen className="h-5 w-5 text-accent" />
                    О адвокате
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-muted-foreground leading-relaxed">
                  {about.split("\n").filter(Boolean).map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-h3-mobile md:text-h3">
                    <CheckCircle2 className="h-5 w-5 text-accent" />
                    Чем поможем
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {competencies.length > 0 ? (
                    <ul className="space-y-2 text-small">
                      {competencies.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-accent mt-1" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-muted-foreground">Компетенции будут уточнены менеджером при консультации.</p>
                  )}
                </CardContent>
              </Card>

              {shouldShowCasesCard && (
                <Card className="border-border">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-h3-mobile md:text-h3">
                      <CheckCircle2 className="h-5 w-5 text-accent" />
                      Практика / кейсы
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {sortedRelatedCases.length > 0 ? (
                      <ul className="space-y-3">
                        {sortedRelatedCases.map((caseItem) => (
                          <li key={caseItem.id} className="p-3 rounded-xl bg-muted/50 border border-border/60">
                            <Link
                              to={`/cases#${caseItem.slug}`}
                              className="font-medium text-foreground hover:text-accent transition-colors"
                            >
                              {caseItem.title}
                            </Link>
                            {caseItem.result && (
                              <p className="text-small text-muted-foreground mt-1">{caseItem.result}</p>
                            )}
                          </li>
                        ))}
                      </ul>
                    ) : caseList.length > 0 ? (
                      <ul className="space-y-3">
                        {caseList.map((item, idx) => (
                          <li key={idx} className="p-3 rounded-xl bg-muted/50 border border-border/60">
                            <p className="font-medium">{item.title}</p>
                            {item.result && (
                              <p className="text-small text-muted-foreground mt-1">{item.result}</p>
                            )}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-muted-foreground">Кейсы в работе — информация будет дополнена.</p>
                    )}
                  </CardContent>
                </Card>
              )}

              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-h3-mobile md:text-h3">
                    <BookOpen className="h-5 w-5 text-accent" />
                    Образование
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {education.length > 0 ? (
                    <ul className="space-y-2 text-small">
                      {education.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className={educationIconClassName} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-muted-foreground">Информация об образовании будет добавлена.</p>
                  )}
                </CardContent>
              </Card>

              {achievements.length > 0 && (
                <Card className="border-border">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-h3-mobile md:text-h3">
                      <FileText className="h-5 w-5 text-accent" />
                      Достижения и повышение квалификации
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {achievements.map((item) => {
                        const fileUrl = item.fileUrl ?? "";
                        const previewImage = item.previewImage ?? "";
                        const resolvedFileUrl = fileUrl ? encodeURI(fileUrl) : "";
                        const resolvedPreviewUrl = previewImage ? encodeURI(previewImage) : "";
                        const isPdf = fileUrl.toLowerCase().endsWith(".pdf");
                        const rotation = item.rotation ?? 0;
                        const previewClassName =
                          rotation !== 0
                            ? "w-full aspect-[4/3] object-contain bg-white"
                            : "w-full aspect-[3/4] object-contain bg-white";
                        const cardClassName = "rounded-xl border border-border/70 bg-background p-4 flex flex-col gap-4 h-full";
                        const previewSrc = resolvedPreviewUrl || (!isPdf ? resolvedFileUrl : "");
                        const rotationStyle = rotation
                          ? { transform: `rotate(${rotation}deg) scale(0.9)`, transformOrigin: "center" as const }
                          : undefined;

                        return (
                          <div
                            key={item.fileUrl ?? item.title}
                            className={cardClassName}
                          >
                            {previewSrc && (
                              <div className="rounded-lg border border-border/60 bg-muted/30 overflow-hidden">
                                <div className="w-full h-full flex items-center justify-center">
                                  <img
                                    src={previewSrc}
                                    alt={`Сертификат: ${item.title}`}
                                    className={previewClassName}
                                    style={rotationStyle}
                                    loading="lazy"
                                  />
                                </div>
                              </div>
                            )}
                            <div>
                              <p className="font-medium">{item.title}</p>
                              {(item.org || item.date) && (
                                <p className="text-small text-muted-foreground">
                                  {[item.org, item.date].filter(Boolean).join(" · ")}
                                </p>
                              )}
                            </div>
                            {item.fileUrl && previewSrc && (
                              <div className="mt-auto">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="h-10 px-4 text-small"
                                  onClick={() =>
                                    setCertificatePreview({ src: previewSrc, title: item.title, rotation })
                                  }
                                >
                                  Открыть
                                </Button>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              )}

              {publications.length > 0 && (
                <Card className="border-border">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-h3-mobile md:text-h3">
                      <BookOpen className="h-5 w-5 text-accent" />
                      Публикации
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-small">
                      {publications.map((pub, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-accent mt-1" />
                          {pub.url ? (
                            <a href={pub.url} className="text-accent hover:underline" target="_blank" rel="noopener noreferrer">
                              {pub.title}
                            </a>
                          ) : (
                            <span>{pub.title}</span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}
            </div>

            <div className="space-y-6">
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-h3-mobile md:text-h3">
                    <Phone className="h-5 w-5 text-accent" />
                    Контакты
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-1">
                    <p className="text-small text-muted-foreground">Телефон</p>
                    <a href={`tel:${phone.replace(/[^+\d]/g, "")}`} className="text-body-mobile md:text-body font-semibold hover:text-accent transition-colors">
                      {phone}
                    </a>
                  </div>
                  <div className="space-y-1">
                    <p className="text-small text-muted-foreground">Email</p>
                    <a href={`mailto:${email}`} className="text-body-mobile md:text-body font-semibold hover:text-accent transition-colors">
                      {email}
                    </a>
                  </div>
                  {member.reesterNumber && (
                    <div className="space-y-1">
                      <p className="text-small text-muted-foreground">Номер в реестре адвокатов</p>
                      <p className="font-medium">{member.reesterNumber}</p>
                    </div>
                  )}
                  <div className="flex flex-col gap-3 pt-2">
                    <Button asChild className="bg-accent hover:bg-accent/90 text-white">
                      <a href={`tel:${phone.replace(/[^+\d]/g, "")}`}>
                        Позвонить сейчас
                      </a>
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => openQuickQuestionModal({ topic: member.name })}
                    >
                      Записаться на встречу
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border shadow-elegant">
                <CardHeader>
                  <CardTitle className="text-h3-mobile md:text-h3">Получить консультацию</CardTitle>
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

      <Dialog open={Boolean(certificatePreview)} onOpenChange={(open) => !open && setCertificatePreview(null)}>
        <DialogContent className="max-w-4xl bg-white">
          <DialogClose
            aria-label="Закрыть"
            className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-slate-50"
          >
            ×
          </DialogClose>
          {certificatePreview && (
            <>
              <DialogHeader>
                <DialogTitle className="text-base md:text-lg">{certificatePreview.title}</DialogTitle>
              </DialogHeader>
              <div className="w-full rounded-xl border border-border/60 bg-muted/30 p-3 overflow-hidden">
                <img
                  src={certificatePreview.src}
                  alt={`Сертификат: ${certificatePreview.title}`}
                  style={
                    certificatePreview.rotation
                      ? {
                          transform: `rotate(${certificatePreview.rotation}deg) scale(0.9)`,
                          transformOrigin: "center"
                        }
                      : undefined
                  }
                  className="w-full max-h-[80vh] object-contain bg-white"
                  loading="lazy"
                />
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TeamMemberPage;
