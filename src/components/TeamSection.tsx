import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserCircle } from "lucide-react";
import { teamMembers, type TeamMember } from "@/data/team";

interface TeamSectionProps {
  id?: string;
  title?: string;
  subtitle?: string;
  className?: string;
  backgroundImage?: string;
}

const TeamSection = ({
  id,
  title = "Наша команда",
  subtitle = "Партнёры и адвокаты, которые лично ведут дела клиентов: от срочных выездов до сложных процессов.",
  className = "",
  backgroundImage
}: TeamSectionProps) => {
  const specializationOverrides: Partial<Record<string, string[]>> = {
    lyutikov: [
      "Уголовное право",
      "Арбитражное право",
      "Административное судопроизводство"
    ]
  };
  const specsLimit = 3;
  const TeamCard = ({ member }: { member: TeamMember }) => {
    const [imageFailed, setImageFailed] = useState(false);
    const hasPhoto = Boolean(member.photo) && !imageFailed;
    const specs = (specializationOverrides[member.slug] ?? member.specializations).slice(0, specsLimit);

    return (
      <Card className="self-start border-border hover:shadow-elegant transition-all">
        <CardContent className="flex flex-col p-6 sm:p-7">
          <div
            className={`mx-auto mb-5 h-[150px] w-[150px] overflow-hidden rounded-xl sm:h-[170px] sm:w-[170px] lg:h-[200px] lg:w-[200px] ${
              hasPhoto ? "border-2 border-accent/20" : "bg-muted/40"
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
              <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                <UserCircle className="h-16 w-16" />
              </div>
            )}
          </div>
          <h3 className="mb-3 min-h-[84px] text-center font-serif text-h3-mobile font-semibold md:text-h3">
            {member.name}
          </h3>
          <div className="mb-3 flex min-h-[56px] items-start justify-center">
            <p className="text-center text-body-mobile font-medium text-accent md:text-body">
              {member.role}
            </p>
          </div>
          {member.experienceText && (
            <p className="mb-5 min-h-[32px] text-center text-small leading-7 text-muted-foreground">
              {member.experienceText}
            </p>
          )}
          <ul className="mb-5 space-y-3 text-center text-small leading-7 text-muted-foreground">
            {specs.map((spec) => (
              <li key={spec} className="min-h-[72px]">
                • {spec}
              </li>
            ))}
          </ul>
          <div className="flex justify-center pt-2">
            <Button
              asChild
              className="bg-accent text-white hover:bg-accent/90 min-w-[160px]"
            >
              <Link to={`/team/${member.slug}`}>
                Подробнее
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <section
      id={id}
      className={`relative section overflow-hidden ${className}`}
    >
      {backgroundImage && (
        <div className="absolute inset-0">
          <img
            src={backgroundImage}
            alt=""
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-background/90" />
        </div>
      )}

      <div className="container relative z-10">
        <div className="section__header max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-h2-mobile md:text-h2 font-bold mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className="text-body-mobile md:text-body text-muted-foreground leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>

        <div className="section__content grid grid-cols-1 items-start gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8 max-w-6xl mx-auto">
          {teamMembers.map((member) => (
            <TeamCard key={member.slug} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
