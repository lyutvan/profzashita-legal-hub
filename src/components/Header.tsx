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

  const isActive = (path: string) => location.pathname === path;

  return (
    <header 
      className="sticky top-0 z-[1000] transition-all duration-200 bg-[#0C1926] shadow-sm"
      style={{ borderBottom: '1px solid rgba(0,0,0,0.1)' }}
    >
      <div className="container mx-auto px-4">
        <div className={`flex items-center justify-between transition-all duration-200 ${isScrolled ? 'h-16' : 'h-20'}`}>
          <Link 
            to="/" 
            className="flex items-center gap-2.5 flex-shrink-0"
            aria-label="Профзащита — Коллегия адвокатов"
          >
            <Logo shrink={isScrolled} variant="header" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-7">
            <Link
              to="/"
              className={`font-inter text-sm font-medium transition-colors duration-150 py-2 min-h-[44px] flex items-center relative ${
                isActive("/") 
                  ? "text-[#B29760] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#B29760]"
                  : "text-[#FFFFFF] hover:text-[#B29760]"
              }`}
            >
              Главная
            </Link>

            <Link
              to="/uslugi"
              className={`font-inter text-sm font-medium transition-colors duration-150 py-2 min-h-[44px] flex items-center relative ${
                isActive("/uslugi") 
                  ? "text-[#B29760] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#B29760]"
                  : "text-[#FFFFFF] hover:text-[#B29760]"
              }`}
            >
              Услуги
            </Link>

            {navigation.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`font-inter text-sm font-medium transition-colors duration-150 py-2 min-h-[44px] flex items-center relative ${
                  isActive(item.path) 
                    ? "text-[#B29760] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#B29760]"
                    : "text-[#FFFFFF] hover:text-[#B29760]"
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
              className={`transition-colors duration-150 ${
                isScrolled
                  ? 'bg-[#C9A227] hover:bg-[#B08E1F] text-white'
                  : 'bg-[#C9A227] hover:bg-[#B08E1F] text-white'
              }`}
              asChild
            >
              <Link to="/kontakty">Консультация</Link>
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="border-[#B29760] text-[#B29760] hover:bg-[#B29760] hover:text-white gap-2"
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
            className="lg:hidden p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center transition-all duration-150 rounded hover:bg-white/10 focus:outline focus:outline-2 focus:outline-offset-2 text-white focus:outline-white"
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
            className="lg:hidden py-6 bg-[#0C1926] border-t border-white/10"
            role="navigation"
            aria-label="Мобильное меню"
          >
            <div className="flex flex-col gap-1">
              <Link
                to="/"
                onClick={() => setIsMenuOpen(false)}
                className={`font-inter text-base font-medium transition-colors duration-150 py-3 px-2 min-h-[44px] flex items-center rounded ${
                  isActive("/") 
                    ? "text-[#B29760] bg-[#B29760]/10" 
                    : "text-[#FFFFFF] hover:text-[#B29760] hover:bg-white/5"
                }`}
              >
                Главная
              </Link>

              <Link
                to="/uslugi"
                onClick={() => setIsMenuOpen(false)}
                className={`font-inter text-base font-medium transition-colors duration-150 py-3 px-2 min-h-[44px] flex items-center rounded ${
                  isActive("/uslugi") 
                    ? "text-[#B29760] bg-[#B29760]/10" 
                    : "text-[#FFFFFF] hover:text-[#B29760] hover:bg-white/5"
                }`}
              >
                Услуги
              </Link>

              {navigation.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`font-inter text-base font-medium transition-colors duration-150 py-3 px-2 min-h-[44px] flex items-center rounded ${
                    isActive(item.path) 
                      ? "text-[#B29760] bg-[#B29760]/10" 
                      : "text-[#FFFFFF] hover:text-[#B29760] hover:bg-white/5"
                  }`}
                >
                  {item.name}
                </Link>
              ))}

              <div className="flex flex-col gap-3 pt-6 mt-4 border-t border-white/10">
                <Button 
                  variant="default" 
                  size="sm" 
                  className="bg-[#C9A227] hover:bg-[#B08E1F] text-white w-full min-h-[44px]"
                  asChild
                >
                  <Link to="/kontakty" onClick={() => setIsMenuOpen(false)}>
                    Консультация
                  </Link>
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="border-[#B29760] text-[#B29760] hover:bg-[#B29760] hover:text-white w-full min-h-[44px] gap-2"
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
