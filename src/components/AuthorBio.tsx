import { ArticleAuthor } from "@/data/articles";
import { Card, CardContent } from "./ui/card";

interface AuthorBioProps {
  author: ArticleAuthor;
}

const AuthorBio = ({ author }: AuthorBioProps) => {
  return (
    <Card className="border-border bg-muted/30">
      <CardContent className="pt-6">
        <div className="flex items-start gap-4">
          {/* Avatar */}
          <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-accent/10">
            <img
              src={author.avatar}
              alt={author.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = '/images/authors/default.jpg';
              }}
            />
          </div>
          
          {/* Info */}
          <div className="flex-1">
            <h4 className="font-playfair text-lg font-bold mb-1">{author.name}</h4>
            <p className="text-sm text-accent mb-1">{author.role}</p>
            {author.regNumber && (
              <p className="text-xs text-muted-foreground mb-2">{author.regNumber}</p>
            )}
            {author.specialization && (
              <p className="text-xs text-muted-foreground mb-2">
                <strong>Специализация:</strong> {author.specialization}
              </p>
            )}
            {author.bio && (
              <p className="text-sm text-muted-foreground leading-relaxed">{author.bio}</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AuthorBio;
