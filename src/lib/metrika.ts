// Yandex Metrika для production
const METRIKA_ID = 1051784949;

declare global {
  interface Window {
    ym?: (id: number, method: string, ...args: unknown[]) => void;
  }
}

export const initMetrika = () => {
  if (!import.meta.env.PROD) return;
  
  // Инициализация Метрики
  if (window.ym) {
    window.ym(METRIKA_ID, "init", {
      clickmap: true,
      trackLinks: true,
      accurateTrackBounce: true,
      webvisor: true
    });
  }

  // SPA-хиты при навигации
  const metrikaHit = () => {
    if (window.ym) {
      window.ym(METRIKA_ID, "hit", location.pathname + location.search + location.hash);
    }
  };

  // Первый хит
  setTimeout(metrikaHit, 100);

  // Хиты при программной навигации
  (["pushState", "replaceState"] as const).forEach((fn) => {
    const orig = history[fn];
    history[fn] = function (...args: Parameters<History["pushState"]>) {
      const result = orig.apply(this, args);
      setTimeout(metrikaHit, 0);
      return result;
    };
  });

  // Хит при навигации через кнопки браузера
  window.addEventListener("popstate", metrikaHit);
};

export const setupMetrikaGoals = () => {
  if (!import.meta.env.PROD) return;

  // Цель: отправка любой формы
  window.addEventListener("submit", (e) => {
    const target = e.target;
    if (target && (target as HTMLElement).tagName === "FORM") {
      if (window.ym) {
        window.ym(METRIKA_ID, "reachGoal", "form_submit");
      }
    }
  }, true);

  // Цель: клик по телефону
  window.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;
    const link = target.closest && target.closest("a[href^='tel:']");
    if (link && window.ym) {
      window.ym(METRIKA_ID, "reachGoal", "tel_click");
    }
  }, true);

  // Цели: клики по WhatsApp и Telegram
  window.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;
    const link = target.closest && target.closest("a[href]") as HTMLAnchorElement;
    if (!link) return;
    
    const href = link.getAttribute("href") || "";
    
    if ((href.includes("wa.me") || href.includes("api.whatsapp.com")) && window.ym) {
      window.ym(METRIKA_ID, "reachGoal", "wa_click");
    }
    
    if (href.includes("t.me") && window.ym) {
      window.ym(METRIKA_ID, "reachGoal", "tg_click");
    }
  }, true);
};
