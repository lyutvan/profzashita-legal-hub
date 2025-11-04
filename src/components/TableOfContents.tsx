import { useEffect, useState } from "react";
import { Card, CardContent } from "./ui/card";
import { List } from "lucide-react";

interface TOCItem {
  title: string;
  anchor: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
}

const TableOfContents = ({ content }: TableOfContentsProps) => {
  const [items, setItems] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    // Parse headings from markdown content
    const headingRegex = /^(#{2,3})\s+(.+)$/gm;
    const toc: TOCItem[] = [];
    let match;

    while ((match = headingRegex.exec(content)) !== null) {
      const level = match[1].length;
      const title = match[2].replace(/[*_`]/g, "").trim();
      const anchor = title
        .toLowerCase()
        .replace(/[^а-яёa-z0-9\s]/gi, "")
        .replace(/\s+/g, "-");
      
      toc.push({ title, anchor, level });
    }

    setItems(toc);

    // Intersection Observer for active section
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-80px 0px -80% 0px" }
    );

    // Observe all headings
    setTimeout(() => {
      toc.forEach((item) => {
        const element = document.getElementById(item.anchor);
        if (element) observer.observe(element);
      });
    }, 100);

    return () => observer.disconnect();
  }, [content]);

  if (items.length === 0) return null;

  return (
    <Card className="border-border sticky top-24">
      <CardContent className="pt-6">
        <div className="flex items-center gap-2 mb-4">
          <List className="h-5 w-5 text-accent" />
          <h3 className="font-semibold">Содержание</h3>
        </div>
        <nav className="space-y-2">
          {items.map((item, index) => (
            <a
              key={index}
              href={`#${item.anchor}`}
              className={`block text-sm transition-colors ${
                item.level === 3 ? "pl-4" : ""
              } ${
                activeId === item.anchor
                  ? "text-accent font-medium"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById(item.anchor);
                if (element) {
                  const offset = 80;
                  const bodyRect = document.body.getBoundingClientRect().top;
                  const elementRect = element.getBoundingClientRect().top;
                  const elementPosition = elementRect - bodyRect;
                  const offsetPosition = elementPosition - offset;

                  window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                  });
                }
              }}
            >
              {item.title}
            </a>
          ))}
        </nav>
      </CardContent>
    </Card>
  );
};

export default TableOfContents;
