import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const scrollToHash = () => {
        const target = document.querySelector(hash);
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
          // Fallback offset for fixed header if scroll-margin not applied
          window.scrollBy(0, -96);
        } else {
          window.scrollTo(0, 0);
        }
      };

      const timer = window.setTimeout(scrollToHash, 200);
      const timer2 = window.setTimeout(scrollToHash, 800);
      return () => {
        window.clearTimeout(timer);
        window.clearTimeout(timer2);
      };
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
