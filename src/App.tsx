import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Index from "./pages/Index";
import Uslugi from "./pages/Uslugi";
import UslugiNew from "./pages/UslugiNew";
import ServiceDetail from "./pages/ServiceDetail";
import ClusterServiceRouter from "./pages/ClusterServiceRouter";
import OKollegii from "./pages/OKollegii";
import Keisy from "./pages/Keisy";
import FAQ from "./pages/FAQ";
import Kontakty from "./pages/Kontakty";
import Privacy from "./pages/Privacy";
import Disclaimer from "./pages/Disclaimer";
import Thanks from "./pages/Thanks";
import NotFound from "./pages/NotFound";
import { QuickQuestionModalProvider } from "./components/QuickQuestionModalProvider";
import BizServicePage from "./pages/services/biz/BizServicePage";
import PhysPage from "./pages/services/PhysPage";
import PhysServiceDetailPage from "./pages/services/phys/PhysServiceDetailPage";
import RastorzhenieBrakaRazdelImushchestvaPage from "./pages/services/phys/RastorzhenieBrakaRazdelImushchestvaPage";
import VyseleniePage from "./pages/services/phys/VyseleniePage";
import ZhilishchnyeSporyPage from "./pages/services/phys/ZhilishchnyeSporyPage";
import NasledstvoPage from "./pages/services/phys/NasledstvoPage";
import BizPage from "./pages/services/BizPage";
import CriminalPage from "./pages/services/CriminalPage";
import CriminalServiceDetailPage from "./pages/services/criminal/CriminalServiceDetailPage";
import TeamMemberPage from "./pages/TeamMemberPage";
import { audienceServices } from "@/data/services-audiences";
import Novosti from "./pages/Novosti";
import NewsDetail from "./pages/NewsDetail";
import QuickQuestion from "./components/QuickQuestion";

const queryClient = new QueryClient();

const bizServices = audienceServices.filter((service) => service.audience === "biz");
const bizServicePaths = new Set(bizServices.map((service) => service.path));
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
].filter((path) => !bizServicePaths.has(path));

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <QuickQuestionModalProvider>
          <ScrollToTop />
          <QuickQuestion />
          <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/uslugi-old" element={<Uslugi />} />
          <Route path="/uslugi" element={<UslugiNew />} />
          <Route path="/uslugi/fiz-lica" element={<Navigate to="/services/phys" replace />} />
          <Route path="/uslugi/yur-lica" element={<Navigate to="/services/biz" replace />} />
          <Route path="/uslugi/ugolovnye" element={<Navigate to="/services/criminal" replace />} />
          <Route path="/uslugi/:clusterSlug/:situationSlug" element={<ClusterServiceRouter />} />
          <Route path="/uslugi/:categorySlug/:serviceSlug/old" element={<ServiceDetail />} />
          <Route path="/o-kollegii" element={<OKollegii />} />
          <Route path="/keisy" element={<Keisy />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/novosti" element={<Novosti />} />
          <Route path="/novosti/:id" element={<NewsDetail />} />
          <Route path="/news/:id" element={<NewsDetail />} />
          <Route path="/kontakty" element={<Kontakty />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
          <Route path="/thanks" element={<Thanks />} />
          <Route path="/team" element={<Navigate to="/#team" replace />} />
          <Route path="/team/:slug" element={<TeamMemberPage />} />
          <Route path="/lawyers/:slug" element={<TeamMemberPage />} />
          <Route path="/lawyers" element={<Navigate to="/#team" replace />} />
          
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
          {bizServices.map((service) => (
            <Route key={service.path} path={service.path} element={<BizServicePage />} />
          ))}
          <Route path="/services/biz/:slug" element={<BizServicePage />} />
          {legacyBizPaths.map((path) => (
            <Route key={path} path={path} element={<Navigate to="/services/biz" replace />} />
          ))}
          
          {/* Redirects from old URLs */}
          <Route path="/services/phys/moshennichestvo" element={<Navigate to="/services/phys" replace />} />
          <Route path="/services/phys/narkotiki" element={<Navigate to="/services/phys" replace />} />
          <Route path="/knowledge/*" element={<Navigate to="/uslugi" replace />} />
          <Route path="/blog/*" element={<Navigate to="/uslugi" replace />} />
          <Route path="/articles/*" element={<Navigate to="/uslugi" replace />} />
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
          <Route path="/cases" element={<Keisy />} />
          <Route path="/cases/:slug" element={<Keisy />} />
          <Route path="/contacts" element={<Navigate to="/kontakty" replace />} />
          <Route path="/practices" element={<Navigate to="/uslugi" replace />} />
          <Route path="/practices/:slug" element={<Navigate to="/uslugi" replace />} />
          <Route path="/komanda" element={<Navigate to="/#team" replace />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
          </Routes>
        </QuickQuestionModalProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
