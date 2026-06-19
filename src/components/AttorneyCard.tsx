import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, CheckCircle2, UserCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export interface AttorneyCardMember {
  slug: string;
  name: string;
  role: string;
  photo?: string;
  experience?: string;
  experienceText?: string;
  specializations?: string[];
  bullets?: string[];
}

interface AttorneyCardProps {
  member: AttorneyCardMember;
  badge?: string;
  roleTitle?: string;
  experience?: string;
  points?: string[];
  ctaLabel?: string;
  profileHref?: string;
  className?: string;
  compact?: boolean;
  mobileEditorial?: boolean;
}

const AttorneyCard = ({
  member,
  badge,
  roleTitle,
  experience,
  points,
  ctaLabel = "Подробнее об адвокате",
  profileHref,
  className = "",
  compact = false,
  mobileEditorial = false
}: AttorneyCardProps) => {
  const [imageFailed, setImageFailed] = useState(false);
  const displayRole = roleTitle ?? member.role;
  const displayBadge =
    badge ?? (displayRole.toLowerCase().includes("юрист") ? "Юрист" : "Адвокат");
  const displayExperience = experience ?? member.experienceText ?? member.experience;
  const proofPoints = (points ?? member.specializations ?? member.bullets ?? [])
    .filter(Boolean)
    .slice(0, compact ? 2 : 3);
  const focus = proofPoints[0] ?? "Ведение дела от первичной оценки до процессуального результата";
  const href = profileHref ?? `/team/${member.slug}`;
  const hasPhoto = Boolean(member.photo) && !imageFailed;

  if (mobileEditorial) {
    return (
      <Card
        className={`group h-full overflow-hidden rounded-[22px] border border-[#dcc47e] bg-white shadow-[0_10px_26px_rgba(15,23,42,0.06)] transition-all hover:border-[#C9A227] hover:shadow-[0_16px_34px_rgba(15,23,42,0.1)] sm:rounded-lg ${className}`}
      >
        <CardContent className="p-4 sm:grid sm:h-full sm:grid-cols-1 sm:p-0">
          <div className="grid grid-cols-[118px_minmax(0,1fr)] gap-4 sm:block">
            <div className="h-[158px] self-start overflow-hidden rounded-[14px] border border-[#eadfbd] bg-[#f7f2e6] sm:h-auto sm:self-auto sm:rounded-none sm:border-x-0 sm:border-t-0">
              {hasPhoto ? (
                <img
                  src={member.photo}
                  alt={member.name}
                  className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-[1.03] sm:h-[260px] md:h-[300px]"
                  loading="lazy"
                  onError={() => setImageFailed(true)}
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-muted-foreground sm:h-[260px] md:h-[300px]">
                  <UserCircle className="h-12 w-12" />
                </div>
              )}
            </div>

            <div className="min-w-0 sm:flex sm:flex-1 sm:flex-col sm:p-5">
              <h3 className="font-serif text-[25px] font-semibold leading-[1.08] text-foreground sm:mt-0 sm:text-[21px] sm:leading-tight">
                {member.name}
              </h3>
              <span className="mt-4 inline-flex w-fit rounded-full bg-accent px-4 py-2 text-[14px] font-semibold leading-none text-white sm:px-3 sm:py-1 sm:text-[11px] sm:uppercase sm:tracking-[0.08em]">
                {displayBadge}
              </span>
              <p className="mt-3 hidden text-[14px] font-medium leading-snug text-accent sm:block">
                {displayRole}
              </p>
              {displayExperience && (
                <p className="mt-4 text-[17px] font-semibold leading-snug text-slate-700 sm:text-[12px] sm:font-medium sm:text-muted-foreground">
                  {displayExperience}
                </p>
              )}
              <p className="mt-4 overflow-hidden text-[16px] leading-snug text-slate-600 [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3] sm:hidden">
                {focus}
              </p>

              <div className="mt-4 hidden rounded-md border-l-4 border-accent bg-[#fbf7ec] px-3 py-2 sm:block">
                <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                  Практика
                </p>
                <p className="mt-1 text-[14px] font-semibold leading-snug text-foreground">
                  {focus}
                </p>
              </div>

              {!compact && proofPoints.length > 1 && (
                <ul className="mt-4 hidden space-y-2 text-[13px] leading-relaxed text-muted-foreground sm:block">
                  {proofPoints.slice(1).map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="pt-5 sm:mt-auto sm:p-5 sm:pt-4">
            <Button
              asChild
              className="h-14 w-full rounded-[16px] border border-[#b8911f] bg-accent px-4 text-[18px] font-semibold text-white shadow-[inset_0_0_0_2px_rgba(255,255,255,0.12),0_8px_16px_rgba(111,83,15,0.2)] hover:bg-[#b8911f] sm:h-11 sm:rounded-md sm:bg-primary sm:text-[13px] sm:hover:bg-primary/90"
            >
              <Link to={href}>
                {ctaLabel}
                <ArrowUpRight className="ml-2 hidden h-4 w-4 sm:inline" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      className={`group h-full overflow-hidden border border-[#d8c08b] bg-white shadow-[0_10px_28px_rgba(15,23,42,0.06)] transition-all hover:-translate-y-0.5 hover:border-[#C9A227] hover:shadow-[0_16px_34px_rgba(15,23,42,0.11)] ${className}`}
    >
      <CardContent className="grid h-full grid-cols-[92px_1fr] gap-4 p-4 sm:flex sm:flex-col sm:p-0">
        <div className="overflow-hidden rounded-lg border border-[#eadfbd] bg-[#f7f2e6] sm:rounded-none sm:border-x-0 sm:border-t-0">
          {hasPhoto ? (
            <img
              src={member.photo}
              alt={member.name}
              className="h-full min-h-[132px] w-full object-cover object-center transition-transform duration-300 group-hover:scale-[1.03] sm:h-[260px] md:h-[300px]"
              loading="lazy"
              onError={() => setImageFailed(true)}
            />
          ) : (
            <div className="flex h-full min-h-[132px] w-full items-center justify-center text-muted-foreground sm:h-[260px] md:h-[300px]">
              <UserCircle className="h-12 w-12" />
            </div>
          )}
        </div>

        <div className="flex min-w-0 flex-col sm:flex-1 sm:p-5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex rounded-full bg-accent px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-white">
              {displayBadge}
            </span>
            {displayExperience && (
              <span className="text-[12px] font-medium text-muted-foreground">
                {displayExperience}
              </span>
            )}
          </div>

          <h3 className="mt-3 font-serif text-[18px] font-semibold leading-tight text-foreground md:text-[21px]">
            {member.name}
          </h3>
          <p className="mt-1 text-[13px] font-medium leading-snug text-accent md:text-[14px]">
            {displayRole}
          </p>

          <div className="mt-4 rounded-md border-l-4 border-accent bg-[#fbf7ec] px-3 py-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
              Практика
            </p>
            <p className="mt-1 text-[13px] font-semibold leading-snug text-foreground md:text-[14px]">
              {focus}
            </p>
          </div>

          {!compact && proofPoints.length > 1 && (
            <ul className="mt-4 space-y-2 text-[13px] leading-relaxed text-muted-foreground">
              {proofPoints.slice(1).map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-auto pt-4">
            <Button
              asChild
              className="h-11 w-full rounded-md bg-primary px-4 text-[13px] font-semibold text-white hover:bg-primary/90"
            >
              <Link to={href}>
                {ctaLabel}
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AttorneyCard;
