import { lazy, Suspense, useEffect, type ComponentType } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { StaticRouter } from "react-router-dom/server";
import ScrollToTop from "./components/ScrollToTop";
import { QuickQuestionModalProvider } from "./components/QuickQuestionModalProvider";
import QuickQuestion from "./components/QuickQuestion";
import CalltrackingPhoneGuard from "./components/CalltrackingPhoneGuard";
import ScrollReveal from "./components/ScrollReveal";
import { SITE } from "@/config/site";

type PageModule = { default: ComponentType };

type PreloadablePage = ComponentType & {
  preload: () => Promise<{ default: ComponentType }>;
};

const pageLoaders: Array<() => Promise<PageModule>> = [];

const lazyPage = (loader: () => Promise<PageModule>) => {
  let serverModule: PageModule | undefined;
  const load = async () => {
    serverModule ??= await loader();
    return serverModule;
  };
  const ClientComponent = lazy(load);
  const Component = (() => {
    if (import.meta.env.SSR) {
      if (!serverModule) {
        throw new Error("A page module was not preloaded before static rendering.");
      }

      const ServerComponent = serverModule.default;
      return <ServerComponent />;
    }

    return <ClientComponent />;
  }) as PreloadablePage;

  Component.preload = load;
  pageLoaders.push(load);
  return Component;
};

const Index = lazyPage(() => import("./pages/Index"));
const Services = lazyPage(() => import("./pages/Services"));
const Uslugi = lazyPage(() => import("./pages/Uslugi"));
const ServiceDetail = lazyPage(() => import("./pages/ServiceDetail"));
const ClusterServiceRouter = lazyPage(() => import("./pages/ClusterServiceRouter"));
const OKollegii = lazyPage(() => import("./pages/OKollegii"));
const Keisy = lazyPage(() => import("./pages/Keisy"));
const FAQ = lazyPage(() => import("./pages/FAQ"));
const Kontakty = lazyPage(() => import("./pages/Kontakty"));
const Privacy = lazyPage(() => import("./pages/Privacy"));
const Disclaimer = lazyPage(() => import("./pages/Disclaimer"));
const Thanks = lazyPage(() => import("./pages/Thanks"));
const NotFound = lazyPage(() => import("./pages/NotFound"));
const BizServicePage = lazyPage(() => import("./pages/services/biz/BizServicePage"));
const PhysPage = lazyPage(() => import("./pages/services/PhysPage"));
const PhysServiceDetailPage = lazyPage(() => import("./pages/services/phys/PhysServiceDetailPage"));
const RastorzhenieBrakaRazdelImushchestvaPage = lazyPage(() => import("./pages/services/phys/RastorzhenieBrakaRazdelImushchestvaPage"));
const ZhilishchnyeSporyPage = lazyPage(() => import("./pages/services/phys/ZhilishchnyeSporyPage"));
const NasledstvoPage = lazyPage(() => import("./pages/services/phys/NasledstvoPage"));
const BizPage = lazyPage(() => import("./pages/services/BizPage"));
const CriminalPage = lazyPage(() => import("./pages/services/CriminalPage"));
const CriminalServiceDetailPage = lazyPage(() => import("./pages/services/criminal/CriminalServiceDetailPage"));
const TeamMemberPage = lazyPage(() => import("./pages/TeamMemberPage"));
const Novosti = lazyPage(() => import("./pages/Novosti"));
const NewsDetail = lazyPage(() => import("./pages/NewsDetail"));
const Tseny = lazyPage(() => import("./pages/Tseny"));

const RootRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(SITE.homePath, { replace: true });
  }, [navigate]);

  return <Index />;
};

export const preloadAppPages = () => Promise.all(pageLoaders.map((loader) => loader()));

const queryClient = new QueryClient();

const legacyBizPaths = [
  "/services/biz/arbitrazhnye-spory",
  "/services/biz/dogovornaya-rabota-pretensii",
  "/services/biz/nalogovye-spory-proverki",
  "/services/biz/vzyskanie-debitorskoy-zadolzhennosti",
  "/services/biz/bankrotstvo-subsidiarnaya-otvetstvennost",
  "/services/biz/korporativnye-spory",
  "/services/biz/zashchita-ot-rejderskikh-zakhvatov",
  "/services/biz/registratsiya-likvidatsiya-kompaniy",
  "/services/biz/intellektualnaya-sobstvennost",
  "/services/biz/ekonomicheskie-prestupleniya"
];

const AppContent = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <QuickQuestionModalProvider>
        <ScrollToTop />
        <ScrollReveal />
        <CalltrackingPhoneGuard />
        <QuickQuestion />
        <Suspense fallback={null}>
          <Routes>
          <Route path="/" element={<RootRedirect />} />
          <Route path="/main" element={<Index />} />
          <Route path="/services" element={<Services />} />
          <Route path="/uslugi-old" element={<Uslugi />} />
          <Route path="/uslugi" element={<Navigate to="/services" replace />} />
          <Route path="/uslugi/fiz-lica" element={<Navigate to="/services/phys" replace />} />
          <Route path="/uslugi/yur-lica" element={<Navigate to="/services/biz" replace />} />
          <Route path="/uslugi/ugolovnye" element={<Navigate to="/services/criminal" replace />} />
          <Route path="/uslugi/:clusterSlug/:situationSlug" element={<ClusterServiceRouter />} />
          <Route path="/uslugi/:categorySlug/:serviceSlug/old" element={<ServiceDetail />} />
          <Route path="/o-kollegii" element={<OKollegii />} />
          <Route path="/tseny" element={<Tseny />} />
          <Route path="/keisy" element={<Keisy />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/novosti" element={<Novosti />} />
          <Route path="/novosti/:id" element={<NewsDetail />} />
          <Route path="/news/:id" element={<NewsDetail />} />
          <Route path="/kontakty" element={<Kontakty />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/politika-konfidentsialnosti" element={<Privacy />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
          <Route path="/otkaz-ot-otvetstvennosti" element={<Disclaimer />} />
          <Route path="/thanks" element={<Thanks />} />
          <Route path="/team" element={<Navigate to={`${SITE.homePath}#team`} replace />} />
          <Route path="/team/:slug" element={<TeamMemberPage />} />
          <Route path="/lawyers/:slug" element={<TeamMemberPage />} />
          <Route path="/lawyers" element={<Navigate to={`${SITE.homePath}#team`} replace />} />
          
          {/* Audience pages */}
          <Route path="/services/phys" element={<PhysPage />} />
          <Route path="/services/biz" element={<BizPage />} />
          <Route path="/services/criminal" element={<CriminalPage />} />

          {/* Criminal law services */}
          <Route path="/services/criminal/:slug" element={<CriminalServiceDetailPage />} />
          
          {/* Old criminal routes - redirect */}
          <Route path="/services/phys/chapter-16" element={<Navigate to="/services/criminal" replace />} />
          <Route path="/services/phys/statya-109" element={<Navigate to="/services/criminal/advokat-po-prichinenie-smerti-po-neostorozhnosti-109" replace />} />
          <Route path="/services/phys/statya-110" element={<Navigate to="/services/criminal/advokat-po-dovedenie-do-samoubiystva-110" replace />} />
          <Route path="/services/phys/statya-111" element={<Navigate to="/services/criminal/advokat-po-umyshlennoe-prichinenie-tyazhkogo-vreda-zdorovyu-111" replace />} />
          <Route path="/services/phys/statya-112" element={<Navigate to="/services/criminal/advokat-po-umyshlennoe-prichinenie-sredney-tyazhesti-vreda-zdorovyu-112" replace />} />
          <Route path="/services/phys/statya-115" element={<Navigate to="/services/criminal/advokat-po-umyshlennoe-prichinenie-legkogo-vreda-zdorovyu-115" replace />} />
          <Route path="/services/phys/statya-116" element={<Navigate to="/services/criminal/advokat-po-poboi-116" replace />} />
          <Route path="/services/phys/statya-119" element={<Navigate to="/services/criminal/advokat-po-ugroza-ubiystvom-ili-prichineniem-tyazhkogo-vreda-zdorovyu-119" replace />} />
          
          {/* Physical persons services */}
          <Route
            path="/services/phys/razvod-razdel-imushchestva"
            element={<RastorzhenieBrakaRazdelImushchestvaPage />}
          />
          <Route
            path="/services/phys/semeynye-spory"
            element={<RastorzhenieBrakaRazdelImushchestvaPage />}
          />
          <Route path="/services/phys/vyselenie" element={<ZhilishchnyeSporyPage />} />
          <Route
            path="/services/phys/zhilishchnye-spory"
            element={<Navigate to="/services/phys/vyselenie" replace />}
          />
          <Route
            path="/services/phys/ushcherb-imushchestvu"
            element={<Navigate to="/services/phys/zhilishchnye-spory" replace />}
          />
          <Route path="/services/phys/nasledstvo" element={<NasledstvoPage />} />
          <Route
            path="/services/phys/nasledstvennye-dela"
            element={<Navigate to="/services/phys/nasledstvo" replace />}
          />
          <Route
            path="/services/phys/bankovskie-i-kreditnye-spory"
            element={<Navigate to="/services/phys/bankrotstvo-fiz-lits" replace />}
          />
          <Route path="/services/phys/:slug" element={<PhysServiceDetailPage />} />
          
          {/* Redirects from old family services URLs */}
          <Route path="/services/phys/mesto-zhitelstva-poryadok-obshcheniya" element={<Navigate to="/services/phys/mesto-zhitelstva-rebenka" replace />} />
          
          {/* Business services (B2B) */}
          <Route path="/services/biz/:slug" element={<BizServicePage />} />
          {legacyBizPaths.map((path) => (
            <Route key={path} path={path} element={<Navigate to="/services/biz" replace />} />
          ))}
          
          {/* Redirects from old URLs */}
          <Route path="/services/phys/moshennichestvo" element={<Navigate to="/services/phys" replace />} />
          <Route path="/services/phys/narkotiki" element={<Navigate to="/services/phys" replace />} />
          <Route path="/knowledge/*" element={<Navigate to="/services/phys" replace />} />
          <Route path="/blog/*" element={<Navigate to="/services/phys" replace />} />
          <Route path="/articles/*" element={<Navigate to="/services/phys" replace />} />
          <Route path="/services/ugolovnye" element={<Navigate to="/services/criminal" replace />} />
          <Route path="/services/phys/ugolovnye" element={<Navigate to="/services/criminal" replace />} />
          <Route path="/services/grazhdanskie" element={<Navigate to="/services/phys" replace />} />
          <Route path="/services/arbitrazh" element={<Navigate to="/services/biz" replace />} />
          <Route path="/services/biz/arbitrazh/*" element={<Navigate to="/services/biz" replace />} />
          <Route path="/services/biz/dogovory/*" element={<Navigate to="/services/biz" replace />} />
          <Route path="/services/biz/nalogi/*" element={<Navigate to="/services/biz" replace />} />
          <Route path="/services/biz/vzyskanie/*" element={<Navigate to="/services/biz" replace />} />
          <Route path="/services/biz/bankrotstvo/*" element={<Navigate to="/services/biz" replace />} />
          <Route path="/about" element={<Navigate to="/o-kollegii" replace />} />
          <Route path="/prices" element={<Navigate to="/tseny" replace />} />
          <Route path="/cases" element={<Keisy />} />
          <Route path="/cases/:slug" element={<Keisy />} />
          <Route path="/contacts" element={<Navigate to="/kontakty" replace />} />
          <Route path="/practices" element={<Navigate to="/services/phys" replace />} />
          <Route path="/practices/:slug" element={<Navigate to="/services/phys" replace />} />
          <Route path="/komanda" element={<Navigate to={`${SITE.homePath}#team`} replace />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </QuickQuestionModalProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

const App = () => (
  <BrowserRouter>
    <AppContent />
  </BrowserRouter>
);

export const StaticApp = ({ location }: { location: string }) => (
  <StaticRouter location={location}>
    <AppContent />
  </StaticRouter>
);

export default App;
