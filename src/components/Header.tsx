import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { useState, useEffect } from "react";
import Logo from "./Logo";
import { Button } from "./ui/button";

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
    <header className={`sticky top-0 z-50 bg-[#0A1F44] backdrop-blur-sm border-b border-border/20 shadow-sm transition-all duration-300 ${isScrolled ? 'h-16' : 'h-20'}`}>
      <div className="container mx-auto px-4">
        <div className={`flex items-center justify-between transition-all duration-300 ${isScrolled ? 'h-16' : 'h-20'}`}>
          <Link to="/" className="flex-shrink-0">
            <Logo shrink={isScrolled} variant="header" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navigation.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`font-inter text-sm font-medium transition-colors hover:text-[#C9A227] ${
                  isActive(item.path) ? "text-[#C9A227]" : "text-white"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <Button variant="default" size="sm" className="bg-[#C9A227] hover:bg-[#B08E1F] text-white" asChild>
              <Link to="/kontakty">Консультация</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-foreground hover:text-accent transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="lg:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              {navigation.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`font-inter text-sm font-medium transition-colors hover:text-accent ${
                    isActive(item.path) ? "text-accent" : "text-foreground"
                  }`}
                >
                  {item.name}
                </Link>
              ))}

              <div className="flex flex-col gap-3 pt-4 border-t border-border">
                <Button variant="default" size="sm" asChild>
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
