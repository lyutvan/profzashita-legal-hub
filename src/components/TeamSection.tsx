import { teamMembers, type TeamMember } from "@/data/team";
import AttorneyCard from "@/components/AttorneyCard";

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

        <div className="section__content grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7 max-w-6xl mx-auto">
          {teamMembers.map((member) => (
            <AttorneyCard
              key={member.slug}
              member={member as TeamMember}
              points={specializationOverrides[member.slug] ?? member.specializations}
              mobileEditorial
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
