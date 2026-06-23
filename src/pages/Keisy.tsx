import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet";
import { cases, type Case } from "@/data/cases";
import { teamMembers, type TeamMember } from "@/data/team";
import { ArticleSchema, BreadcrumbSchema } from "@/components/JsonLd";
import { SITE } from "@/config/site";
import CaseTrustCard from "@/components/CaseTrustCard";
import PageHero from "@/components/PageHero";
import { getCaseCourtLabel, getCasePreview, shortenCaseText } from "@/lib/caseTrust";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle2, FileText } from "lucide-react";
import { useQuickQuestionModal } from "@/components/QuickQuestionModalProvider";

const caseLawyerSlugAliases: Record<string, string> = {
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

const caseFilters = [
  { id: "all", label: "Все" },
  { id: "criminal", label: "Уголовные" },
  { id: "family", label: "Семейные" },
  { id: "inheritance", label: "Наследственные" },
  { id: "housing", label: "Жилищные" },
  { id: "business", label: "Арбитражные" }
] as const;

type CaseFilter = (typeof caseFilters)[number]["id"];

const caseMatchesFilter = (caseItem: Case, filter: CaseFilter) => {
  const category = caseItem.category.toLowerCase();

  if (filter === "all") return true;
  if (filter === "criminal") return category.includes("уголов");
  if (filter === "family") return category.includes("семейн");
  if (filter === "inheritance") return category.includes("наслед");
  if (filter === "housing") return category.includes("жилищ");
  if (filter === "business") return category.includes("арбитраж");

  return true;
};

const Cases = () => {
  const location = useLocation();
  const { slug } = useParams<{ slug?: string }>();
  const [activeFilter, setActiveFilter] = useState<CaseFilter>("all");
  const { openQuickQuestionModal } = useQuickQuestionModal();
  const sortedCases = useMemo(
    () => [...cases].sort((a, b) => new Date(b.datePublished).getTime() - new Date(a.datePublished).getTime()),
    []
  );
  const visibleCases = useMemo(
    () => sortedCases.filter((caseItem) => caseMatchesFilter(caseItem, activeFilter)),
    [activeFilter, sortedCases]
  );
  const selectedCase = slug
    ? sortedCases.find((caseItem) => caseItem.slug === decodeURIComponent(slug))
    : null;
  const selectedCaseTeamMembers = selectedCase ? getCaseTeamMembers(selectedCase) : [];
  const pageTitle = selectedCase
    ? `${selectedCase.title} — судебная практика | Профзащита`
    : "Наши кейсы — Профзащита";
  const pageDescription = selectedCase
    ? `Кейс коллегии адвокатов «Профзащита»: ${shortenCaseText(selectedCase.task, 155)}`
    : "Реальные дела и результаты коллегии адвокатов Профзащита. Примеры успешного решения уголовных, гражданских, арбитражных и семейных споров.";
  const pageUrl = selectedCase ? `${SITE.url}cases/${selectedCase.slug}` : `${SITE.url}keisy`;

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
    <div className="top-page-mobile-compact min-h-screen flex flex-col">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={pageUrl} />
        
        {/* OpenGraph */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={pageUrl} />
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
        { name: "Кейсы", url: `${SITE.url}keisy` },
        ...(selectedCase ? [{ name: selectedCase.title, url: pageUrl }] : [])
      ]} />

      {selectedCase ? (
        <ArticleSchema
          headline={selectedCase.title}
          description={selectedCase.task}
          datePublished={selectedCase.datePublished}
          author={selectedCase.author}
          url={pageUrl}
          image={SITE.ogImage}
          articleBody={`${selectedCase.task} ${selectedCase.actions} ${selectedCase.result}`}
        />
      ) : null}

      <Header />
      
      <main className="flex-1">
        <PageHero>
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-serif text-h1-mobile md:text-h1 font-bold mb-6 text-white">
              {selectedCase ? selectedCase.title : <><span>Судебная практика </span><span className="text-accent">коллегии</span></>}
            </h1>
            <p className="text-body-mobile md:text-body text-white/90 leading-relaxed">
              Публикуем фрагменты судебных актов без раскрытия персональных данных доверителей.
            </p>
          </div>
        </PageHero>

        {selectedCase ? (
          <section className="section bg-white">
            <div className="container">
              <Button asChild variant="ghost" className="mb-6 px-0 text-slate-600 hover:text-[#9b7518]">
                <Link to="/keisy">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Все кейсы
                </Link>
              </Button>

              <article id={selectedCase.slug} className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-start">
                <div className="min-w-0">
                  <div className="mb-4 flex flex-wrap items-center gap-2">
                    <span className="rounded-full border border-[#e5d39b] bg-[#fbf7ed] px-3 py-1 text-[12px] font-semibold leading-none text-[#7b5f16]">
                      {selectedCase.category}
                    </span>
                    <span className="text-[13px] text-slate-500">{getCaseCourtLabel(selectedCase)}</span>
                    <span className="text-[13px] text-slate-500">
                      {new Intl.DateTimeFormat("ru-RU", {
                        day: "numeric",
                        month: "long",
                        year: "numeric"
                      }).format(new Date(selectedCase.datePublished))}
                    </span>
                  </div>

                  <div className="mt-6 rounded-[8px] border-l-4 border-[#C9A227] bg-[#fbf6e8] p-5">
                    <div className="flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.08em] text-[#8a6a18]">
                      <CheckCircle2 className="h-4 w-4" />
                      Результат
                    </div>
                    <p className="mt-2 text-[17px] font-semibold leading-relaxed text-slate-950">
                      {selectedCase.result}
                    </p>
                  </div>

                  <div className="mt-8 grid gap-5 md:grid-cols-2">
                    <div className="rounded-[8px] border border-slate-200 bg-white p-5">
                      <div className="text-[12px] font-semibold uppercase tracking-[0.08em] text-slate-500">Задача</div>
                      <p className="mt-2 text-[15px] leading-relaxed text-slate-700">{selectedCase.task}</p>
                    </div>
                    <div className="rounded-[8px] border border-slate-200 bg-white p-5">
                      <div className="text-[12px] font-semibold uppercase tracking-[0.08em] text-slate-500">Что сделали</div>
                      <p className="mt-2 text-[15px] leading-relaxed text-slate-700">{selectedCase.actions}</p>
                    </div>
                  </div>

                  {selectedCaseTeamMembers.length > 0 ? (
                    <div className="mt-8">
                      <div className="mb-3 text-[12px] font-semibold uppercase tracking-[0.08em] text-slate-500">
                        {selectedCaseTeamMembers.length > 1 ? "Команда по делу" : "Адвокат по делу"}
                      </div>
                      <div className="grid gap-3 sm:grid-cols-2">
                        {selectedCaseTeamMembers.map((member) => (
                          <Link
                            key={member.slug}
                            to={`/team/${member.slug}`}
                            className="grid grid-cols-[64px_minmax(0,1fr)] items-center gap-4 rounded-[8px] border border-slate-200 bg-white p-3 transition-colors hover:border-[#d8bf72] hover:bg-[#fbf7ed]"
                          >
                            <div className="h-16 w-16 overflow-hidden rounded-[8px] bg-slate-100">
                              {member.photo ? (
                                <img src={member.photo} alt={member.name} className="h-full w-full object-cover" loading="lazy" />
                              ) : null}
                            </div>
                            <div className="min-w-0">
                              <div className="text-[15px] font-semibold leading-snug text-slate-950">{member.name}</div>
                              <div className="text-[13px] leading-snug text-slate-500">{member.role}</div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>

                <aside className="rounded-[8px] border border-[#eadfbf] bg-[#f8f4eb] p-4">
                  <div className="mb-3 flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.08em] text-[#8a6a18]">
                    <FileText className="h-4 w-4" />
                    Судебные документы
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                    {(selectedCase.documents?.length ? selectedCase.documents : [getCasePreview(selectedCase)])
                      .filter((doc): doc is string => Boolean(doc))
                      .map((doc, index) => (
                        <a
                          key={`${doc}-${index}`}
                          href={doc}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group block overflow-hidden rounded-[8px] border border-[#dfc981] bg-white p-2 transition-colors hover:border-[#C9A227]"
                        >
                          <div className="aspect-[3/4] overflow-hidden rounded-[6px] bg-slate-50">
                            <img
                              src={doc}
                              alt={`Документ ${index + 1} по делу: ${selectedCase.title}`}
                              className="h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.025]"
                              loading="lazy"
                            />
                          </div>
                        </a>
                      ))}
                  </div>
                  <p className="mt-3 text-[12px] leading-relaxed text-slate-500">
                    Персональные данные на документах скрыты в соответствии с законодательством.
                  </p>
                </aside>
              </article>
            </div>
          </section>
        ) : null}

        <section className="section bg-white">
          <div className="container">
            <div className="section__header mx-auto max-w-4xl text-center">
              <h2 className="font-serif text-h2-mobile font-bold text-slate-950 md:text-h2">
                {selectedCase ? "Другие кейсы" : "Результат, суть и доказательство"}
              </h2>
              <p className="mt-3 text-base leading-relaxed text-slate-600 md:text-lg">
                Карточки показывают главное: категорию спора, короткую суть, достигнутый результат и фрагмент судебного акта.
              </p>
            </div>

            {!selectedCase ? (
              <div className="mb-7 flex flex-wrap justify-center gap-2 md:mb-9">
                {caseFilters.map((filter) => (
                  <button
                    key={filter.id}
                    type="button"
                    onClick={() => setActiveFilter(filter.id)}
                    className={`min-h-10 rounded-full border px-4 py-2 text-[14px] font-semibold leading-tight transition-colors ${
                      activeFilter === filter.id
                        ? "border-[#C9A227] bg-[#C9A227] text-white"
                        : "border-[#eadfbf] bg-[#fbf7ed] text-slate-800 hover:border-[#d8bf72]"
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            ) : null}

            <div className="grid auto-rows-fr grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
              {(selectedCase
                ? sortedCases
                    .filter((caseItem) => caseItem.id !== selectedCase.id && caseItem.category === selectedCase.category)
                    .slice(0, 3)
                : visibleCases
              ).map((caseItem, index) => (
                <CaseTrustCard key={caseItem.id} caseItem={caseItem} featured={index === 0} />
              ))}
            </div>

            {visibleCases.length === 0 ? (
              <div className="mx-auto max-w-xl rounded-[8px] border border-slate-200 bg-slate-50 p-6 text-center text-slate-600">
                В этом разделе пока нет опубликованных кейсов.
              </div>
            ) : null}

            {!selectedCase ? (
              <p className="mx-auto mt-6 max-w-3xl text-center text-[13px] leading-relaxed text-slate-500">
                {shortenCaseText(
                  "Персональные данные доверителей скрыты. Публикуемые фрагменты нужны, чтобы показать судебную практику и подтверждение результата.",
                  180
                )}
              </p>
            ) : null}
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
