import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import Logo from "./Logo";
import WhatsAppIcon from "./icons/WhatsAppIcon";
import { serviceClusters } from "@/data/services-clusters";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { SITE } from "@/config/site";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on Esc key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isMenuOpen]);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const navigation = [
    { name: "Кейсы", path: "/keisy" },
    { name: "Новости", path: "/novosti" },
    { name: "Вопросы и ответы", path: "/faq" },
    { name: "О коллегии", path: "/o-kollegii" },
    { name: "Контакты", path: "/kontakty" },
  ];

  const isActive = (path: string) => {
    if (path === "/#team") {
      return location.pathname === "/" && location.hash === "#team";
    }
    return location.pathname === path;
  };

  return (
    <header 
      className="sticky top-0 z-[1000] transition-all duration-200 bg-primary shadow-sm border-b border-white/10"
    >
      <div className="container">
        <div className={`flex items-center justify-between transition-all duration-200 ${isScrolled ? 'h-16' : 'h-20'}`}>
          <Link 
            to="/" 
            className="flex items-center gap-2 flex-shrink-0"
            aria-label="Профзащита — Коллегия адвокатов"
          >
            <Logo shrink={isScrolled} variant="header" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            <Link
              to="/"
              className={`text-small font-medium transition-colors duration-150 py-2 min-h-[44px] flex items-center relative ${
                isActive("/") 
                  ? "text-accent after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-accent"
                  : "text-white hover:text-accent"
              }`}
            >
              Главная
            </Link>

            <Link
              to="/uslugi"
              className={`text-small font-medium transition-colors duration-150 py-2 min-h-[44px] flex items-center relative ${
                isActive("/uslugi") 
                  ? "text-accent after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-accent"
                  : "text-white hover:text-accent"
              }`}
            >
              Услуги
            </Link>

            {navigation.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-small font-medium transition-colors duration-150 py-2 min-h-[44px] flex items-center relative ${
                  isActive(item.path) 
                    ? "text-accent after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-accent"
                    : "text-white hover:text-accent"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <Button 
              variant="default" 
              size="sm" 
              className="transition-colors duration-150 bg-accent text-white hover:bg-accent/90"
              asChild
            >
              <Link to="/kontakty">Консультация</Link>
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="border-accent text-accent hover:bg-accent hover:text-accent-foreground gap-2"
              asChild
            >
              <a href={`https://wa.me/${SITE.phoneRaw.replace('+', '')}`} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon size={16} />
                WhatsApp
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 min-w-[44px] min-h-[44px] flex items-center justify-center transition-all duration-150 rounded hover:bg-white/10 focus:outline focus:outline-2 focus:outline-offset-2 text-white focus:outline-white"
            aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" strokeWidth={2} />
            ) : (
              <Menu className="h-6 w-6" strokeWidth={2} />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav 
            className="lg:hidden py-6 bg-primary border-t border-white/10"
            role="navigation"
            aria-label="Мобильное меню"
          >
            <div className="flex flex-col gap-2">
              <Link
                to="/"
                onClick={() => setIsMenuOpen(false)}
                className={`text-body-mobile font-medium transition-colors duration-150 py-2 px-2 min-h-[44px] flex items-center rounded ${
                  isActive("/") 
                    ? "text-accent bg-accent/10" 
                    : "text-white hover:text-accent hover:bg-white/5"
                }`}
              >
                Главная
              </Link>

              <Link
                to="/uslugi"
                onClick={() => setIsMenuOpen(false)}
                className={`text-body-mobile font-medium transition-colors duration-150 py-2 px-2 min-h-[44px] flex items-center rounded ${
                  isActive("/uslugi") 
                    ? "text-accent bg-accent/10" 
                    : "text-white hover:text-accent hover:bg-white/5"
                }`}
              >
                Услуги
              </Link>

              {navigation.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-body-mobile font-medium transition-colors duration-150 py-2 px-2 min-h-[44px] flex items-center rounded ${
                    isActive(item.path) 
                      ? "text-accent bg-accent/10" 
                      : "text-white hover:text-accent hover:bg-white/5"
                  }`}
                >
                  {item.name}
                </Link>
              ))}

              <div className="flex flex-col gap-4 pt-6 mt-4 border-t border-white/10">
                <Button 
                  variant="default" 
                  size="sm" 
                  className="bg-accent text-white hover:bg-accent/90 w-full min-h-[44px]"
                  asChild
                >
                  <Link to="/kontakty" onClick={() => setIsMenuOpen(false)}>
                    Консультация
                  </Link>
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="border-accent text-accent hover:bg-accent hover:text-accent-foreground w-full min-h-[44px] gap-2"
                  asChild
                >
                  <a href={`https://wa.me/${SITE.phoneRaw.replace('+', '')}`} target="_blank" rel="noopener noreferrer">
                    <WhatsAppIcon size={16} />
                    WhatsApp
                  </a>
                </Button>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
