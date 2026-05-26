import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const READY_CLASS = "mango-phone-ready";
const FALLBACK_DELAY_MS = 1600;

const getPhoneSnapshot = () =>
  Array.from(document.querySelectorAll<HTMLElement>(".mango-phone"))
    .map((element) => `${element.textContent?.trim() ?? ""}|${element.getAttribute("href") ?? ""}`)
    .join(";");

const CalltrackingPhoneGuard = () => {
  const location = useLocation();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const root = document.documentElement;
    root.classList.remove(READY_CLASS);

    let isDone = false;
    let initialSnapshot = "";
    let observer: MutationObserver | null = null;

    const reveal = () => {
      if (isDone) return;
      isDone = true;
      root.classList.add(READY_CLASS);
      observer?.disconnect();
    };

    const setup = () => {
      initialSnapshot = getPhoneSnapshot();

      observer = new MutationObserver(() => {
        if (getPhoneSnapshot() !== initialSnapshot) {
          reveal();
        }
      });

      observer.observe(document.body, {
        attributes: true,
        childList: true,
        characterData: true,
        subtree: true
      });
    };

    const frameId = window.requestAnimationFrame(setup);
    const timeoutId = window.setTimeout(reveal, FALLBACK_DELAY_MS);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.clearTimeout(timeoutId);
      observer?.disconnect();
    };
  }, [location.pathname, location.search]);

  return null;
};

export default CalltrackingPhoneGuard;
