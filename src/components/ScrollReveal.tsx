import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { SITE } from "@/config/site";

const REVEAL_SELECTOR = [
  "main > section",
  "main .section",
  "main.section",
].join(",");

const VISIBLE_CLASS = "scroll-reveal--visible";
const REVEAL_CLASS = "scroll-reveal";

const ScrollReveal = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (pathname !== SITE.homePath) {
      return;
    }

    if (typeof window === "undefined" || typeof IntersectionObserver === "undefined") {
      return;
    }

    let observer: IntersectionObserver | null = null;

    const setupReveal = () => {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      const elements = Array.from(document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR)).filter(
        (element, index, list) =>
          list.indexOf(element) === index &&
          !element.closest("[data-no-scroll-reveal]") &&
          !element.classList.contains("scroll-reveal-ignore")
      );

      if (prefersReducedMotion) {
        elements.forEach((element) => {
          element.classList.add(REVEAL_CLASS, VISIBLE_CLASS);
        });
        return;
      }

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            entry.target.classList.add(VISIBLE_CLASS);
            observer?.unobserve(entry.target);
          });
        },
        {
          root: null,
          rootMargin: "0px 0px -10% 0px",
          threshold: 0.14,
        }
      );

      elements.forEach((element) => {
        element.classList.remove(REVEAL_CLASS, VISIBLE_CLASS);

        const rect = element.getBoundingClientRect();
        const isAlreadyInView = rect.top < viewportHeight * 0.88 && rect.bottom > 0;

        element.classList.add(REVEAL_CLASS);

        if (isAlreadyInView) {
          element.classList.add(VISIBLE_CLASS);
          return;
        }

        observer?.observe(element);
      });
    };

    const setupTimer = window.setTimeout(() => {
      window.requestAnimationFrame(setupReveal);
    }, 120);

    return () => {
      if (setupTimer) {
        window.clearTimeout(setupTimer);
      }
      observer?.disconnect();
    };
  }, [pathname, hash]);

  return null;
};

export default ScrollReveal;
