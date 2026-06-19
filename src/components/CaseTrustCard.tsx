import { Link } from "react-router-dom";
import { ArrowUpRight, FileText } from "lucide-react";

import { cn } from "@/lib/utils";
import type { Case } from "@/data/cases";
import { getCaseCourtLabel, getCasePreview, shortenCaseText } from "@/lib/caseTrust";

const formatCaseDate = (isoDate: string) =>
  new Intl.DateTimeFormat("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  }).format(new Date(isoDate));

interface CaseDocumentPreviewProps {
  caseItem: Case;
  className?: string;
  compact?: boolean;
}

export const CaseDocumentPreview = ({ caseItem, className, compact = false }: CaseDocumentPreviewProps) => {
  const preview = getCasePreview(caseItem);

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-[8px] border border-[#eadfbf] bg-[#f8f4eb] p-2 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.65)]",
        className
      )}
    >
      <div className="absolute left-3 top-3 z-10 rounded-[6px] bg-white/92 px-2 py-1 text-[10px] font-semibold uppercase leading-none tracking-[0.08em] text-[#8a6a18] shadow-sm">
        Документ
      </div>
      <div className={cn("overflow-hidden rounded-[6px] bg-white", compact ? "aspect-[4/3]" : "aspect-[3/4]")}>
        {preview ? (
          <img
            src={preview}
            alt={`Фрагмент судебного акта: ${caseItem.title}`}
            className="h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.035]"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-[#b8911f]">
            <FileText className="h-10 w-10" strokeWidth={1.7} />
          </div>
        )}
      </div>
    </div>
  );
};

interface CaseTrustCardProps {
  caseItem: Case;
  className?: string;
  href?: string;
  featured?: boolean;
}

const CaseTrustCard = ({ caseItem, className, href, featured = false }: CaseTrustCardProps) => {
  const caseHref = href ?? `/cases/${caseItem.slug}`;
  const courtLabel = getCaseCourtLabel(caseItem);

  return (
    <article
      id={caseItem.slug}
      className={cn(
        "group flex h-full flex-col rounded-[8px] border bg-white p-4 shadow-[0_12px_34px_rgba(15,23,42,0.06)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#d8bf72] hover:shadow-[0_18px_44px_rgba(15,23,42,0.1)] md:p-5",
        featured ? "border-[#d8bf72]" : "border-slate-200",
        className
      )}
    >
      <div className="flex items-start gap-4">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-[#e5d39b] bg-[#fbf7ed] px-3 py-1 text-[12px] font-semibold leading-none text-[#7b5f16]">
              {caseItem.category}
            </span>
            <span className="text-[12px] leading-none text-slate-500">{courtLabel}</span>
            <span className="text-[12px] leading-none text-slate-500">{formatCaseDate(caseItem.datePublished)}</span>
          </div>
          <h3 className="mt-3 line-clamp-3 min-h-[3.75rem] text-[18px] font-semibold leading-[1.25] text-slate-950 md:text-[20px]">
            {caseItem.title}
          </h3>
        </div>

        <CaseDocumentPreview caseItem={caseItem} compact className="h-[104px] w-[84px] shrink-0 sm:hidden" />
      </div>

      <div className="mt-4 rounded-[8px] border-l-4 border-[#C9A227] bg-[#fbf6e8] px-4 py-3">
        <div className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[#8a6a18]">Результат</div>
        <p className="mt-1 line-clamp-3 text-[14px] font-semibold leading-snug text-slate-950 md:text-[15px]">
          {shortenCaseText(caseItem.result, 150)}
        </p>
      </div>

      <div className="mt-4 hidden grid-cols-[minmax(0,1fr)_112px] gap-4 sm:grid md:grid-cols-[minmax(0,1fr)_128px]">
        <div className="space-y-3">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-500">Задача</div>
            <p className="mt-1 line-clamp-2 text-[13px] leading-relaxed text-slate-600">
              {shortenCaseText(caseItem.task, 120)}
            </p>
          </div>
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-500">Что сделали</div>
            <p className="mt-1 line-clamp-2 text-[13px] leading-relaxed text-slate-600">
              {shortenCaseText(caseItem.actions, 120)}
            </p>
          </div>
        </div>
        <CaseDocumentPreview caseItem={caseItem} />
      </div>

      <div className="mt-auto pt-4">
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
