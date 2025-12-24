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
      style={{ textShadow: "0 2px 8px rgba(0,0,0,0.55)" }}
    >
      <div className="inline-flex max-w-full rounded-xl bg-[rgba(7,16,31,0.55)] px-4 py-2 backdrop-blur-sm border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.28)]">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-white/85">
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
                <ChevronRight className="h-4 w-4 text-white/60 drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)]" />
                {item.path && !isLast ? (
                  <Link 
                    to={item.path} 
                    className="text-white/85 hover:text-white hover:underline underline-offset-2 transition-colors"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-white font-semibold drop-shadow-[0_2px_8px_rgba(0,0,0,0.65)]">
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
