import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import Logo from "./Logo";

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
    { name: "Главная", path: "/" },
    { name: "Услуги", path: "/uslugi" },
    { name: "Кейсы", path: "/keisy" },
    { name: "Вопросы и ответы", path: "/faq" },
    { name: "О коллегии", path: "/o-kollegii" },
    { name: "Контакты", path: "/kontakty" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header 
      className={`sticky top-0 z-[1000] transition-all duration-200 ${
        isScrolled 
          ? 'bg-white shadow-md' 
          : 'bg-[#0A1F44] shadow-sm'
      }`}
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
            {navigation.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`font-inter text-sm font-medium transition-colors duration-150 py-2 min-h-[44px] flex items-center relative ${
                  isActive(item.path) 
                    ? isScrolled
                      ? "text-[#C9A227] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#C9A227]"
                      : "text-[#C9A227] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#C9A227]"
                    : isScrolled
                      ? "text-[#0A1F44] hover:text-[#C9A227]"
                      : "text-white hover:text-[#C9A227]"
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
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`lg:hidden p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center transition-all duration-150 rounded hover:bg-black/5 focus:outline focus:outline-2 focus:outline-offset-2 ${
              isScrolled 
                ? 'text-[#0A1F44] focus:outline-[#0A1F44]' 
                : 'text-white focus:outline-white'
            }`}
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
            className="lg:hidden py-6 bg-white border-t border-gray-200"
            role="navigation"
            aria-label="Мобильное меню"
          >
            <div className="flex flex-col gap-1">
              {navigation.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`font-inter text-base font-medium transition-colors duration-150 py-3 px-2 min-h-[44px] flex items-center rounded ${
                    isActive(item.path) 
                      ? "text-[#C9A227] bg-[#C9A227]/5" 
                      : "text-[#0A1F44] hover:bg-gray-50"
                  }`}
                >
                  {item.name}
                </Link>
              ))}

              <div className="flex flex-col gap-3 pt-6 mt-4 border-t border-gray-200">
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
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
