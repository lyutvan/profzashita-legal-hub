import { Link, useLocation } from "react-router-dom";
import { Menu, X, Mail, Phone } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import Logo from "./Logo";
import { useQuickQuestionModal } from "./QuickQuestionModalProvider";
import TelegramIcon from "./icons/TelegramIcon";


const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { openQuickQuestionModal } = useQuickQuestionModal();

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

  const handleConsultationClick = () => {
    setIsMenuOpen(false);
    openQuickQuestionModal();
  };

  return (
    <header 
      className="sticky top-0 z-[1000] transition-all duration-200 bg-primary shadow-sm border-b border-white/10"
    >
      <div className="container header-container">
        <div className={`header-row flex items-center justify-between transition-all duration-200 ${isScrolled ? 'h-16' : 'h-20'}`}>
          <Link 
            to="/" 
            className="flex items-center gap-2 flex-shrink-0"
            aria-label="Профзащита — Коллегия адвокатов"
          >
            <Logo shrink={isScrolled} variant="header" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="header-nav hidden lg:flex flex-1 items-center justify-center min-w-0">
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
          <div className="header-actions hidden lg:flex items-center flex-shrink-0">
            <Button 
              variant="default" 
              size="sm" 
              className="transition-colors duration-150 bg-accent text-white hover:bg-accent/90 h-10 px-3 text-[13px]"
              onClick={handleConsultationClick}
            >
              Консультация
            </Button>
            <div className="header-contacts flex items-center gap-3 text-white/90">
              <div className="flex flex-col items-start gap-1.5 whitespace-nowrap">
                <a
                  href="tel:+79168597654"
                  className="inline-flex items-center gap-2 transition-colors duration-150 hover:text-white"
                >
                  <Phone className="h-3.5 w-3.5" strokeWidth={1.8} />
                  +7 (916) 859-76-54
                </a>
                <a
                  href="mailto:profzashchita@internet.ru"
                  className="inline-flex items-center gap-2 transition-colors duration-150 hover:text-white"
                >
                  <Mail className="h-3.5 w-3.5" strokeWidth={1.8} />
                  profzashchita@internet.ru
                </a>
              </div>
              <a
                href="https://t.me/profzashita_consult_bot"
                className="inline-flex h-[40px] w-[40px] items-center justify-center rounded-full bg-[#229ED9] text-white shadow-sm transition-colors duration-150 hover:bg-[#1d8fc6] md:h-[44px] md:w-[44px]"
                aria-label="Написать в Telegram"
                target="_blank"
                rel="noopener noreferrer"
                title="Telegram"
              >
                <TelegramIcon
                  size={30}
                  className="h-[30px] w-[30px] translate-y-[-1px]"
                />
              </a>
            </div>
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
                  className="bg-accent text-white hover:bg-accent/90 w-full h-11 px-4 text-small"
                  onClick={handleConsultationClick}
                >
                  Консультация
                </Button>
                <div className="header-contacts flex items-center gap-3 text-white/90 pt-3 border-t border-white/10">
                  <div className="flex flex-col items-start gap-2 whitespace-nowrap">
                    <a
                      href="tel:+79168597654"
                      className="inline-flex items-center gap-2 transition-colors duration-150 hover:text-white"
                    >
                      <Phone className="h-3.5 w-3.5" strokeWidth={1.8} />
                      +7 (916) 859-76-54
                    </a>
                    <a
                      href="mailto:profzashchita@internet.ru"
                      className="inline-flex items-center gap-2 transition-colors duration-150 hover:text-white"
                    >
                      <Mail className="h-3.5 w-3.5" strokeWidth={1.8} />
                      profzashchita@internet.ru
                    </a>
                  </div>
                  <a
                    href="https://t.me/profzashita_consult_bot"
                    className="inline-flex h-[40px] w-[40px] items-center justify-center rounded-full bg-[#229ED9] text-white shadow-sm transition-colors duration-150 hover:bg-[#1d8fc6]"
                    aria-label="Написать в Telegram"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Telegram"
                  >
                    <TelegramIcon
                      size={30}
                      className="h-[30px] w-[30px] translate-y-[-1px]"
                    />
                  </a>
                </div>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
