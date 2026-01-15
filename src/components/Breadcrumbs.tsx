import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

const Breadcrumbs = ({ items }: BreadcrumbsProps) => {
  return (
    <nav 
      aria-label="Breadcrumb" 
      className="py-4 relative z-20"
    >
      <div className="inline-flex max-w-full rounded-xl bg-primary/70 px-4 py-2 backdrop-blur-sm border border-white/10 shadow-lg shadow-black/20">
        <ol className="flex flex-wrap items-center gap-2 text-small text-white/85 drop-shadow-sm">
          <li>
            <Link 
              to="/" 
              className="text-white/85 hover:text-white hover:underline underline-offset-2 transition-colors"
            >
              Главная
            </Link>
          </li>
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li key={index} className="flex items-center gap-2">
                <ChevronRight className="h-4 w-4 text-white/60 drop-shadow-sm" />
                {item.path && !isLast ? (
                  <Link 
                    to={item.path} 
                    className="text-white/85 hover:text-white hover:underline underline-offset-2 transition-colors"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-white font-semibold drop-shadow-sm">
                    {item.label}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
};

export default Breadcrumbs;
