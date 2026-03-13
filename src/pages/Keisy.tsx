import { useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LegalBackground from "@/components/LegalBackground";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Helmet } from "react-helmet";
import columnsImg from "@/assets/legal/court-columns.jpg";
import scalesIcon from "@/assets/legal/justice-scales-vertical.jpg";
import gavelIcon from "@/assets/legal/gavel-horizontal.jpg";
import { cases, type Case } from "@/data/cases";
import { teamMembers, type TeamMember } from "@/data/team";
import { ArticleSchema, BreadcrumbSchema } from "@/components/JsonLd";
import { SITE } from "@/config/site";
import { CheckCircle2, Scale, Gavel } from "lucide-react";
import { useQuickQuestionModal } from "@/components/QuickQuestionModalProvider";

const caseLawyerSlugAliases: Record<string, string> = {
  lyadova: "yulia-lyadova",
  vaskovskiy: "vaskovsky",
};

const teamMemberBySlug = new Map(
  teamMembers.map((member) => [member.slug, member] as const)
);

const teamMemberByName = new Map(
  teamMembers.map((member) => [member.name, member] as const)
);

const normalizeText = (value: string) =>
  value
    .toLowerCase()
    .replace(/ё/g, "е")
    .replace(/[^a-zа-я0-9]+/gi, " ")
    .trim();

const memberMentionPatterns = teamMembers.map((member) => {
  const [surname = "", firstName = "", patronymic = ""] = member.name.split(/\s+/);
  const patronymicInitials = patronymic
    .split("-")
    .map((part) => part[0] ?? "")
    .join("");
  const shortInitials = `${firstName[0] ?? ""}${patronymicInitials}`;

  return {
    member,
    patterns: Array.from(
      new Set(
        [
          member.name,
          surname,
          shortInitials ? `${surname} ${shortInitials}` : "",
          shortInitials ? `${surname} ${shortInitials.split("").join(" ")}` : "",
        ]
          .map(normalizeText)
          .filter(Boolean)
      )
    ),
  };
});

const dedupeMembers = (members: TeamMember[]) =>
  members.filter(
    (member, index, list) => list.findIndex((item) => item.slug === member.slug) === index
  );

const getCaseTeamMembers = (
  caseItem: Pick<Case, "lawyers" | "author" | "title" | "task" | "actions" | "result">
): TeamMember[] => {
  const members = (caseItem.lawyers ?? [])
    .map((slug) => caseLawyerSlugAliases[slug] ?? slug)
    .map((slug) => teamMemberBySlug.get(slug))
    .filter((member): member is TeamMember => Boolean(member));

  if (members.length > 0) {
    return dedupeMembers(members);
  }

  const authorMember = caseItem.author ? teamMemberByName.get(caseItem.author) : undefined;
  if (authorMember) {
    return [authorMember];
  }

  const caseText = normalizeText(
    [caseItem.title, caseItem.task, caseItem.actions, caseItem.result, caseItem.author]
      .filter(Boolean)
      .join(" ")
  );

  const mentionedMembers = memberMentionPatterns
    .filter(({ patterns }) => patterns.some((pattern) => caseText.includes(pattern)))
    .map(({ member }) => member);

  return dedupeMembers(mentionedMembers);
};

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

        {/* Cases Section */}
        <section className="section">
          <div className="container">
            <div className="mx-auto max-w-5xl space-y-10">
              {cases.map((caseItem, index) => {
                const caseTeamMembers = getCaseTeamMembers(caseItem);

                return (
                <Card 
                  key={caseItem.id} 
                  id={caseItem.slug}
                  className="overflow-hidden border-border transition-all hover:shadow-elegant"
                >
                  <CardContent className="p-6 pt-6 md:p-7 md:pt-7">
                    <div className="mb-8 grid gap-5 md:grid-cols-[5rem_minmax(0,1fr)] lg:grid-cols-[5rem_minmax(0,1fr)_minmax(260px,320px)] lg:items-start lg:gap-x-6">
                      {/* Icon */}
                      <div className="h-20 w-20 overflow-hidden rounded-xl bg-muted/50">
                        <img 
                          src={index % 2 === 0 ? scalesIcon : gavelIcon} 
                          alt="" 
                          className="w-full h-full object-cover opacity-80"
                        />
                      </div>
                      <div className="min-w-0">
                        <div className="mb-4 flex flex-wrap items-center gap-3">
                          <Badge variant="secondary" className="border-accent/20 bg-accent/10 text-accent">
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
                        <h2 className="mb-2 font-serif text-h3-mobile font-bold md:text-h3">
                          {caseItem.title}
                        </h2>
                      </div>

                      {caseTeamMembers.length > 0 ? (
                        <div className="min-w-0 md:col-start-2 lg:col-start-3 lg:justify-self-end lg:w-full lg:max-w-[320px]">
                          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground lg:text-right">
                            {caseTeamMembers.length > 1 ? "Команда по делу" : "Адвокат по делу"}
                          </p>
                          <div className="grid gap-3">
                            {caseTeamMembers.map((member) => (
                              <Link
                                key={member.slug}
                                to={`/team/${member.slug}`}
                                className="grid grid-cols-[5.5rem_minmax(0,1fr)] items-center gap-4 rounded-xl border border-border bg-muted/20 p-4 transition-colors hover:border-accent/40 hover:bg-accent/5 md:p-5"
                              >
                                <div className="h-[5.5rem] w-[5.5rem] overflow-hidden rounded-2xl bg-muted">
                                  {member.photo ? (
                                    <img
                                      src={member.photo}
                                      alt={member.name}
                                      className="h-full w-full object-cover"
                                      loading="lazy"
                                    />
                                  ) : null}
                                </div>
                                <div className="min-w-0 space-y-1">
                                  <div className="text-body-mobile font-semibold leading-snug text-foreground break-words">
                                    {member.name}
                                  </div>
                                  <div className="text-small leading-6 text-muted-foreground">
                                    {member.role}
                                  </div>
                                  {member.experienceText ? (
                                    <div className="text-small leading-6 text-muted-foreground/90">
                                      {member.experienceText}
                                    </div>
                                  ) : null}
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="min-w-0 md:col-start-2 lg:col-start-3 lg:justify-self-end lg:w-full lg:max-w-[320px]">
                          <div className="inline-flex max-w-full rounded-xl border border-border bg-muted/20 px-4 py-3 text-small leading-7 text-muted-foreground lg:w-full">
                            <span className="mr-2 font-semibold text-foreground">Автор кейса:</span>
                            <span className="break-words">{caseItem.author}</span>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="space-y-8">
                      <div>
                        <h3 className="font-semibold text-accent mb-3 flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center text-small">1</span>
                          Задача
                        </h3>
                        <p className="pl-8 leading-7 text-muted-foreground">
                          {caseItem.task}
                        </p>
                      </div>

                      <div>
                        <h3 className="font-semibold text-accent mb-3 flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center text-small">2</span>
                          Наши действия
                        </h3>
                        <p className="pl-8 leading-7 text-muted-foreground">
                          {caseItem.actions}
                        </p>
                      </div>

                      <div className="rounded-xl border-l-4 border-accent bg-accent/5 p-7 md:p-8">
                        <h3 className="font-semibold text-accent mb-3 flex items-center gap-2">
                          <CheckCircle2 className="h-5 w-5" />
                          Результат
                        </h3>
                        <p className="font-medium leading-7 text-foreground">
                          {caseItem.result}
                        </p>
                      </div>

                      {/* Documents Section */}
                      {caseItem.documents && caseItem.documents.length > 0 && (
                        <div className="mt-8 border-t border-border pt-7">
                          <h3 className="mb-5 flex items-center gap-2 font-semibold text-accent">
                            <Gavel className="h-5 w-5" />
                            Документы по делу
                          </h3>
                          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
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
                          <p className="mt-4 text-small italic leading-7 text-muted-foreground">
                            * Персональные данные на документах скрыты в соответствии с законодательством о защите персональных данных
                          </p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )})}
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
