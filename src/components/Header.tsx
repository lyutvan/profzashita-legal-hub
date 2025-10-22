import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { useState } from "react";
import Logo from "./Logo";
import { Button } from "./ui/button";
import WhatsAppIcon from "./icons/WhatsAppIcon";
import TelegramIcon from "./icons/TelegramIcon";
import { practices } from "@/data/practices";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPracticesOpen, setIsPracticesOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: "Главная", path: "/" },
    { name: "О нас", path: "/about" },
    { name: "Кейсы", path: "/cases" },
    { name: "Контакты", path: "/contacts" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex-shrink-0">
            <Logo />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link
              to="/"
              className={`font-inter text-sm font-medium transition-colors hover:text-accent ${
                isActive("/") ? "text-accent" : "text-foreground"
              }`}
            >
              Главная
            </Link>

            {/* Practices Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsPracticesOpen(true)}
              onMouseLeave={() => setIsPracticesOpen(false)}
            >
              <button
                className={`font-inter text-sm font-medium transition-colors hover:text-accent flex items-center gap-1 ${
                  location.pathname.startsWith("/practices") ? "text-accent" : "text-foreground"
                }`}
              >
                Практики
                <ChevronDown className="h-3 w-3" />
              </button>

              {isPracticesOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-background border border-border rounded-lg shadow-elegant py-2 z-50">
                  <Link
                    to="/practices"
                    className="block px-4 py-2 text-sm text-foreground hover:bg-accent/10 hover:text-accent transition-colors"
                  >
                    Все практики
                  </Link>
                  <div className="border-t border-border my-2" />
                  {practices.map((practice) => (
                    <Link
                      key={practice.id}
                      to={`/practices/${practice.slug}`}
                      className="block px-4 py-2 text-sm text-foreground hover:bg-accent/10 hover:text-accent transition-colors"
                    >
                      {practice.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {navigation.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`font-inter text-sm font-medium transition-colors hover:text-accent ${
                  isActive(item.path) ? "text-accent" : "text-foreground"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a href="tel:+79999999999" className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-accent transition-colors">
              <Phone className="h-4 w-4" />
              +7 999 999 99 99
            </a>
            <a
              href="https://wa.me/79168597654"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:text-accent transition-colors"
              aria-label="WhatsApp"
            >
              <WhatsAppIcon size={20} />
            </a>
            <a
              href="https://t.me/profzashita"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:text-accent transition-colors"
              aria-label="Telegram"
            >
              <TelegramIcon size={20} />
            </a>
            <Button variant="default" size="sm" asChild>
              <Link to="/contacts">Консультация</Link>
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
              <Link
                to="/"
                onClick={() => setIsMenuOpen(false)}
                className={`font-inter text-sm font-medium transition-colors hover:text-accent ${
                  isActive("/") ? "text-accent" : "text-foreground"
                }`}
              >
                Главная
              </Link>

              {/* Mobile Practices */}
              <div>
                <button
                  onClick={() => setIsPracticesOpen(!isPracticesOpen)}
                  className="font-inter text-sm font-medium text-foreground hover:text-accent transition-colors flex items-center gap-1"
                >
                  Практики
                  <ChevronDown className={`h-3 w-3 transition-transform ${isPracticesOpen ? "rotate-180" : ""}`} />
                </button>
                {isPracticesOpen && (
                  <div className="ml-4 mt-2 space-y-2">
                    <Link
                      to="/practices"
                      onClick={() => setIsMenuOpen(false)}
                      className="block text-sm text-muted-foreground hover:text-accent transition-colors"
                    >
                      Все практики
                    </Link>
                    {practices.slice(0, 5).map((practice) => (
                      <Link
                        key={practice.id}
                        to={`/practices/${practice.slug}`}
                        onClick={() => setIsMenuOpen(false)}
                        className="block text-sm text-muted-foreground hover:text-accent transition-colors"
                      >
                        {practice.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

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
                <a href="tel:+79999999999" className="flex items-center gap-2 text-sm font-medium text-foreground">
                  <Phone className="h-4 w-4" />
                  +7 999 999 99 99
                </a>
                <div className="flex gap-2">
                  <a
                    href="https://wa.me/79168597654"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground hover:text-accent transition-colors"
                    aria-label="WhatsApp"
                  >
                    <WhatsAppIcon size={24} />
                  </a>
                  <a
                    href="https://t.me/profzashita"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground hover:text-accent transition-colors"
                    aria-label="Telegram"
                  >
                    <TelegramIcon size={24} />
                  </a>
                </div>
                <Button variant="default" size="sm" asChild>
                  <Link to="/contacts" onClick={() => setIsMenuOpen(false)}>
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
