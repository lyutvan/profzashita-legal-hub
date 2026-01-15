import { Link } from "react-router-dom";
import { LucideIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";

interface PracticeCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  slug: string;
}

const PracticeCard = ({ title, description, icon: Icon, slug }: PracticeCardProps) => {
  return (
    <Card className="group hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 border-border bg-card h-full flex flex-col">
      <CardHeader>
        <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
          <Icon className="h-6 w-6 text-accent" />
        </div>
        <CardTitle className="font-serif">{title}</CardTitle>
        <CardDescription className="text-muted-foreground leading-relaxed">
          {description}
        </CardDescription>
      </CardHeader>
      <CardFooter className="mt-auto">
        <Button variant="ghost" asChild className="w-full group-hover:text-accent">
          <Link to={`/practices/${slug}`}>
            Подробнее →
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PracticeCard;
