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
  compact = false
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
