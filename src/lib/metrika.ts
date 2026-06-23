const METRIKA_ID = Number(import.meta.env.VITE_YANDEX_METRIKA_ID || "105178494");
const SCRIPT_ID = "profzashita-yandex-metrika";

declare global {
  interface Window {
    ym?: (id: number, method: string, ...args: unknown[]) => void;
    __profzashitaMetrikaInitialized?: boolean;
    __profzashitaMetrikaGoalsBound?: boolean;
  }
}

const canTrack = () => import.meta.env.PROD && Number.isInteger(METRIKA_ID) && METRIKA_ID > 0;

const ensureMetrikaQueue = () => {
  if (window.ym) return;

  const queue = ((...args: unknown[]) => {
    (queue as typeof queue & { a?: unknown[][] }).a?.push(args);
  }) as typeof window.ym & { a?: unknown[][]; l?: number };

  queue.a = [];
  queue.l = Date.now();
  window.ym = queue;
};

const loadMetrikaScript = () => {
  if (document.getElementById(SCRIPT_ID)) return;

  const script = document.createElement("script");
  script.id = SCRIPT_ID;
  script.async = true;
  script.src = `https://mc.yandex.ru/metrika/tag.js?id=${METRIKA_ID}`;
  document.head.appendChild(script);
};

export const trackMetrikaGoal = (goal: string, params?: Record<string, string>) => {
  if (!canTrack() || !window.ym) return;
  window.ym(METRIKA_ID, "reachGoal", goal, params);
};

export const initMetrika = () => {
  if (!canTrack() || typeof window === "undefined") return;

  ensureMetrikaQueue();
  loadMetrikaScript();

  if (window.__profzashitaMetrikaInitialized) return;
  window.__profzashitaMetrikaInitialized = true;
  window.ym?.(METRIKA_ID, "init", {
    clickmap: true,
    trackLinks: true,
    accurateTrackBounce: true,
    webvisor: true,
  });

  const trackSpaNavigation = () => {
    window.ym?.(METRIKA_ID, "hit", `${location.pathname}${location.search}${location.hash}`);
  };

  (["pushState", "replaceState"] as const).forEach((method) => {
    const original = history[method];
    history[method] = function (...args: Parameters<History[typeof method]>) {
      const result = original.apply(this, args);
      window.setTimeout(trackSpaNavigation, 0);
      return result;
    };
  });

  window.addEventListener("popstate", trackSpaNavigation);
};

export const setupMetrikaGoals = () => {
  if (!canTrack() || typeof window === "undefined" || window.__profzashitaMetrikaGoalsBound) return;
  window.__profzashitaMetrikaGoalsBound = true;

  window.addEventListener("click", (event) => {
    const target = event.target as HTMLElement;
    const link = target.closest?.("a[href]") as HTMLAnchorElement | null;
    if (!link) return;

    const href = link.getAttribute("href") || "";
    if (href.startsWith("tel:") && href !== "tel:") {
      trackMetrikaGoal("tel_click");
    } else if (href.includes("wa.me") || href.includes("api.whatsapp.com")) {
      trackMetrikaGoal("wa_click");
    } else if (href.startsWith("tg://") || href.includes("t.me/")) {
      trackMetrikaGoal("tg_click");
    } else if (href.includes("web.max.ru")) {
      trackMetrikaGoal("max_click");
    }
  }, true);
};
