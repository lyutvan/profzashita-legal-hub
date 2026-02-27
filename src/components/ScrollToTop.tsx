import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }

    const scrollToHash = () => {
      const id = decodeURIComponent(hash.replace("#", ""));
      const target = document.getElementById(id);
      if (target) {
        const headerOffset = 110;
        const targetY = target.getBoundingClientRect().top + window.scrollY - headerOffset;
        window.scrollTo({ top: Math.max(targetY, 0), behavior: "smooth" });
        return true;
      }
      return false;
    };

    let attempts = 0;
    const maxAttempts = 20;
    const timer = window.setInterval(() => {
      if (scrollToHash()) {
        window.clearInterval(timer);
        return;
      }
      attempts += 1;
      if (attempts >= maxAttempts) {
        window.clearInterval(timer);
        window.scrollTo(0, 0);
      }
    }, 60);

    return () => {
      window.clearInterval(timer);
    };
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
