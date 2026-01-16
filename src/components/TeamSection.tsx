import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { teamMembers } from "@/data/team";

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
  const specsLimit = 3;

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
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="font-serif text-h2-mobile md:text-h2 font-bold mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className="text-body-mobile md:text-body text-muted-foreground">
              {subtitle}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {teamMembers.map((member) => {
            const specs = member.specializations.slice(0, specsLimit);
            return (
              <Card key={member.slug} className="border-border hover:shadow-elegant transition-all h-full flex flex-col">
                <CardContent className="pt-6 flex flex-col h-full">
                  <div className="w-48 h-48 rounded-xl overflow-hidden mx-auto mb-4 border-2 border-accent/20">
                    <img
                      src={member.photo}
                      alt={member.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <h3 className="font-serif text-h3-mobile md:text-h3 font-semibold mb-2 text-center">{member.name}</h3>
                  <p className="text-accent text-body-mobile md:text-body font-medium mb-2 text-center">{member.role}</p>
                  {member.experienceText && (
                    <p className="text-small text-muted-foreground mb-4 text-center">{member.experienceText}</p>
                  )}
                  <ul className="space-y-2 text-small text-muted-foreground text-center mb-4">
                    {specs.map((spec) => (
                      <li key={spec} className="leading-relaxed">
                        • {spec}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto flex justify-center">
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
          })}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
