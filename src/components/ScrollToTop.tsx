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
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
      window.scrollTo(0, 0);
    };

    const timer = window.setTimeout(scrollToHash, 80);
    return () => {
      window.clearTimeout(timer);
    };
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
