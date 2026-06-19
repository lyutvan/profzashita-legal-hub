import { Link } from "react-router-dom";

import CaseTrustCard from "@/components/CaseTrustCard";
import type { Case } from "@/data/cases";
import { cn } from "@/lib/utils";

interface CaseTrustSectionProps {
  cases: Case[];
  title?: string;
  subtitle?: string;
  className?: string;
  showAllLink?: boolean;
  gridClassName?: string;
}

const CaseTrustSection = ({
  cases,
  title = "Судебная практика коллегии",
  subtitle = "Публикуем фрагменты судебных актов без раскрытия персональных данных доверителей.",
  className,
  showAllLink = true,
  gridClassName
}: CaseTrustSectionProps) => {
  if (cases.length === 0) return null;

  return (
    <section className={cn("section bg-white", className)}>
      <div className="container">
        <div className="section__header mx-auto max-w-4xl text-center">
          <h2 className="font-serif text-h2-mobile font-bold text-slate-950 md:text-h2">{title}</h2>
          <p className="mt-3 text-base leading-relaxed text-slate-600 md:text-lg">{subtitle}</p>
        </div>

        <div
          className={cn(
            "section__content grid auto-rows-fr grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3",
            gridClassName
          )}
        >
          {cases.map((caseItem, index) => (
            <CaseTrustCard key={caseItem.id} caseItem={caseItem} featured={index === 0} />
          ))}
        </div>

        {showAllLink ? (
          <div className="mt-8 text-center">
            <Link
              to="/keisy"
              className="inline-flex min-h-11 items-center justify-center rounded-[8px] border border-[#d8bf72] bg-[#fbf6e8] px-5 py-3 text-[14px] font-semibold leading-tight text-slate-950 transition-colors hover:bg-[#f5edda]"
            >
              Посмотреть все кейсы
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default CaseTrustSection;
