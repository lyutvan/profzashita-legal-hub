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
import { getCasePreview, shortenCaseText } from "@/lib/caseTrust";
import { ArrowLeft, ChevronDown, FileText } from "lucide-react";
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

const getFallbackCaseLawyer = (caseItem: Pick<Case, "category">): TeamMember => {
  const category = caseItem.category.toLowerCase();
  const lawyerSlug = category.includes("уголов")
    ? "lyutikov"
    : category.includes("арбитраж")
      ? "ryzhenko"
      : category.includes("семейн") || category.includes("жилищ") || category.includes("наслед")
        ? "vaskovsky"
        : "kalabekov";

  return teamMemberBySlug.get(lawyerSlug) ?? teamMembers[0];
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
  const selectedCaseLawyer = selectedCase
    ? selectedCaseTeamMembers[0] ?? getFallbackCaseLawyer(selectedCase)
    : null;
  const selectedCaseDocuments = selectedCase
    ? (selectedCase.documents?.length ? selectedCase.documents : [getCasePreview(selectedCase)]).filter(
        (document): document is string => Boolean(document)
      )
    : [];
  const [areDocumentsOpen, setAreDocumentsOpen] = useState(false);
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

  useEffect(() => {
    setAreDocumentsOpen(false);
  }, [selectedCase?.slug]);

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
        {!selectedCase ? (
          <PageHero>
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="font-serif text-h1-mobile md:text-h1 font-bold mb-6 text-white">
                <span>Судебная практика </span><span className="text-accent">коллегии</span>
              </h1>
              <p className="text-body-mobile md:text-body text-white/90 leading-relaxed">
                Публикуем результаты судебной практики без раскрытия персональных данных доверителей.
              </p>
            </div>
          </PageHero>
        ) : null}

        {selectedCase ? (
          <section className="section bg-white">
            <div className="container">
              <Link
                to="/keisy"
                className="mb-7 inline-flex min-h-11 items-center gap-2 rounded-[10px] border border-[#ead9a7] bg-white px-4 py-2 text-[15px] font-semibold text-[#8a6a18] shadow-sm transition-colors hover:border-[#d5b44a] hover:bg-[#fffaf0] hover:text-[#6f5413] hover:no-underline"
              >
                <ArrowLeft className="h-4 w-4" />
                Все кейсы
              </Link>

              <article id={selectedCase.slug} className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start">
                <div className="min-w-0">
                  <div className="flex items-center justify-between gap-4 border-b border-[#e6d6a7] pb-4 text-[13px] font-semibold md:text-sm">
                    <span className="text-[#8a6a18]">
                      {selectedCase.category}
                    </span>
                    <time className="shrink-0 text-slate-500" dateTime={selectedCase.datePublished}>
                      {new Intl.DateTimeFormat("ru-RU", {
                        day: "numeric",
                        month: "long",
                        year: "numeric"
                      }).format(new Date(selectedCase.datePublished))}
                    </time>
                  </div>

                  <h1 className="mt-7 max-w-4xl font-serif text-h1-mobile font-bold leading-[1.08] text-slate-950 md:text-h1">
                    {selectedCase.title}
                  </h1>

                  <div className="mt-8 space-y-7 text-[17px] leading-[1.75] text-slate-700 md:text-[19px]">
                    <p>{selectedCase.task}</p>
                    <p>{selectedCase.actions}</p>
                    <p>{selectedCase.result}</p>
                  </div>

                  {selectedCaseDocuments.length > 0 ? (
                    <div className="mt-10">
                      <button
                        type="button"
                        onClick={() => setAreDocumentsOpen((open) => !open)}
                        aria-expanded={areDocumentsOpen}
                        aria-controls={`${selectedCase.slug}-documents`}
                        className="inline-flex min-h-12 items-center gap-3 rounded-[8px] border border-[#c9a227] bg-white px-5 py-3 text-[15px] font-semibold text-[#8a6a18] transition-colors hover:bg-[#fbf7ed]"
                      >
                        <FileText className="h-4 w-4" aria-hidden="true" />
                        {areDocumentsOpen ? "Скрыть сканы по делу" : "Посмотреть сканы по делу"}
                        <ChevronDown
                          className={`h-4 w-4 transition-transform ${areDocumentsOpen ? "rotate-180" : ""}`}
                          aria-hidden="true"
                        />
                      </button>

                      {areDocumentsOpen ? (
                        <div id={`${selectedCase.slug}-documents`} className="mt-5 rounded-[10px] border border-slate-200 bg-slate-50 p-4 md:p-5">
                          <div className="mb-4 flex items-baseline justify-between gap-4">
                            <h2 className="font-serif text-h3-mobile font-bold text-slate-950 md:text-h3">Сканы по делу</h2>
                            <p className="text-right text-xs leading-relaxed text-slate-500">
                              Персональные данные на документах скрыты.
                            </p>
                          </div>
                          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                            {selectedCaseDocuments.map((document, index) => (
                              <a
                                key={`${document}-${index}`}
                                href={document}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group overflow-hidden rounded-[8px] border border-slate-200 bg-white p-3 transition-colors hover:border-[#c9a227]"
                              >
                                <div className="aspect-[3/4] overflow-hidden rounded-[5px] bg-slate-100">
                                  <img
                                    src={document}
                                    alt={`Скан документа ${index + 1} по делу: ${selectedCase.title}`}
                                    className="h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
                                    loading="lazy"
                                  />
                                </div>
                                <span className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-[#8a6a18]">
                                  Открыть документ
                                  <ArrowLeft className="h-4 w-4 rotate-180" aria-hidden="true" />
                                </span>
                              </a>
                            ))}
                          </div>
                        </div>
                      ) : null}
                    </div>
                  ) : null}
                </div>

                {selectedCaseLawyer ? (
                  <aside className="rounded-[10px] border border-slate-200 bg-white p-3 shadow-[0_12px_32px_rgba(15,23,42,0.06)] sm:p-4 lg:sticky lg:top-28">
                    <p className="mb-2 text-[12px] font-semibold uppercase tracking-[0.08em] text-[#8a6a18] sm:mb-3">
                      Адвокат по делу
                    </p>
                    <Link to={`/team/${selectedCaseLawyer.slug}`} className="group flex items-center gap-3 sm:block">
                      <div className="h-28 w-[5.625rem] shrink-0 overflow-hidden rounded-[7px] bg-slate-100 sm:aspect-[4/5] sm:h-auto sm:w-auto">
                        {selectedCaseLawyer.photo ? (
                          <img
                            src={selectedCaseLawyer.photo}
                            alt={selectedCaseLawyer.name}
                            className="h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
                          />
                        ) : null}
                      </div>
                      <div className="min-w-0">
                        <h2 className="font-serif text-[19px] font-bold leading-tight text-slate-950 sm:mt-5 sm:text-h3-mobile md:text-h3">
                          {selectedCaseLawyer.name}
                        </h2>
                        <p className="mt-1 text-sm text-slate-500">{selectedCaseLawyer.role}</p>
                      </div>
                    </Link>

                    <div className="mt-3 space-y-3 border-t border-[#e6d6a7] pt-3 text-[13px] sm:mt-5 sm:space-y-4 sm:pt-5 sm:text-sm">
                      <div>
                        <div className="font-semibold text-slate-950">Специализация</div>
                        <p className="mt-1 leading-relaxed text-slate-600">
                          {selectedCaseLawyer.specializations[0]}
                        </p>
                      </div>
                      {selectedCaseLawyer.experienceText ? (
                        <div>
                          <div className="font-semibold text-slate-950">Опыт работы</div>
                          <p className="mt-1 text-slate-600">{selectedCaseLawyer.experienceText}</p>
                        </div>
                      ) : null}
                    </div>

                    <Link
                      to="/kontakty#consultation-form"
                      className="mt-4 inline-flex min-h-11 w-full items-center justify-center rounded-[8px] border border-[#c9a227] px-3 py-2 text-sm font-semibold text-[#8a6a18] transition-colors hover:bg-[#fbf7ed] hover:no-underline sm:mt-6 sm:min-h-12 sm:px-4 sm:py-3 sm:text-[15px]"
                    >
                      Получить консультацию
                    </Link>
                  </aside>
                ) : null}
              </article>
            </div>
          </section>
        ) : null}

        <section className="section bg-white">
          <div className="container">
            <div className="section__header mx-auto max-w-4xl text-center">
              <h2 className="font-serif text-h2-mobile font-bold text-slate-950 md:text-h2">
                {selectedCase ? "Другие кейсы" : "Практика по категориям"}
              </h2>
              <p className="mt-3 text-base leading-relaxed text-slate-600 md:text-lg">
                Карточки показывают направление, дату, краткий результат и итог дела.
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
              ).map((caseItem) => (
                <CaseTrustCard key={caseItem.id} caseItem={caseItem} />
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
