import { Link } from "react-router-dom";
import { ArrowUpRight, BadgeCheck, BriefcaseBusiness, Car, HeartHandshake, House, Landmark, Scale, ShieldCheck } from "lucide-react";

import { cn } from "@/lib/utils";
import type { Case } from "@/data/cases";
import { shortenCaseText } from "@/lib/caseTrust";

const formatCaseDate = (isoDate: string) =>
  new Intl.DateTimeFormat("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  }).format(new Date(isoDate));

const getCaseEmblem = (category: string) => {
  const normalizedCategory = category.toLowerCase();

  if (normalizedCategory.includes("уголов")) return ShieldCheck;
  if (normalizedCategory.includes("семейн")) return HeartHandshake;
  if (normalizedCategory.includes("арбитраж") || normalizedCategory.includes("налог")) return Landmark;
  if (normalizedCategory.includes("наслед") || normalizedCategory.includes("жилищ")) return House;
  if (normalizedCategory.includes("дтп")) return Car;
  if (normalizedCategory.includes("труд")) return BriefcaseBusiness;

  return Scale;
};

const getCaseOutcome = (caseItem: Case) => {
  const text = `${caseItem.title} ${caseItem.result}`.toLowerCase();

  if (text.includes("миров") && text.includes("соглаш")) return "Урегулировано";
  if (text.includes("прекращен")) return "Прекращено";
  if (text.includes("взыскан")) return "Взыскано";
  if (text.includes("отменен") || text.includes("отменил")) return "Отменено";
  if (text.includes("признан") || text.includes("признана")) return "Признано";
  if (text.includes("удовлетворен")) return "Удовлетворено";
  if (text.includes("отказан")) return "Отказано";

  return "Решено";
};

interface CaseTrustCardProps {
  caseItem: Case;
  className?: string;
  href?: string;
}

const CaseTrustCard = ({ caseItem, className, href }: CaseTrustCardProps) => {
  const caseHref = href ?? `/cases/${caseItem.slug}`;
  const CaseEmblem = getCaseEmblem(caseItem.category);
  const outcome = getCaseOutcome(caseItem);

  return (
    <article
      id={caseItem.slug}
      className={cn(
        "flex h-full flex-col rounded-[10px] border border-[#dfd0a1] bg-white p-5 shadow-[0_8px_24px_rgba(15,23,42,0.045)] md:p-6",
        className
      )}
    >
      <div className="flex items-center justify-between gap-4 text-[12px] font-semibold uppercase tracking-[0.08em]">
        <span className="text-[#8a6a18]">{caseItem.category}</span>
        <time className="shrink-0 text-slate-500" dateTime={caseItem.datePublished}>
          {formatCaseDate(caseItem.datePublished)}
        </time>
      </div>

      <h3 className="mt-5 text-[20px] font-semibold leading-[1.22] text-slate-950 md:text-[23px]">
        {caseItem.title}
      </h3>

      <div className="mt-5 flex gap-4 border-t border-[#eee5cf] pt-5">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#fbf6e8] text-[#9b7518]">
          <CaseEmblem className="h-5 w-5" strokeWidth={1.8} aria-hidden="true" />
        </div>
        <p className="line-clamp-4 text-[15px] leading-relaxed text-slate-600 md:text-[16px]">
          {shortenCaseText(caseItem.result, 190)}
        </p>
      </div>

      <div className="mt-5 flex items-center gap-2 text-[13px] font-semibold text-[#8a6a18]">
        <BadgeCheck className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
        <span>Итог: {outcome}</span>
      </div>

      <div className="mt-auto pt-6">
        <Link
          to={caseHref}
          className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-[8px] border border-[#d8bf72] bg-white px-4 text-[14px] font-semibold text-slate-950 transition-colors hover:bg-[#fbf6e8] sm:w-auto"
        >
          Подробнее о кейсе
          <ArrowUpRight className="h-4 w-4 text-[#9b7518]" />
        </Link>
      </div>
    </article>
  );
};

export default CaseTrustCard;
