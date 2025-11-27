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
import QuickQuestion from "./components/QuickQuestion";
import ArbitrazhnyeSporyPage from "./pages/services/biz/ArbitrazhnyeSporyPage";
import DogovornayaRabotaPretensiiPage from "./pages/services/biz/DogovornayaRabotaPretensiiPage";
import NalogovyeSporyProverkiPage from "./pages/services/biz/NalogovyeSporyProverkiPage";
import VzyskanieDebitorskoyZadolzhennostiPage from "./pages/services/biz/VzyskanieDebitorskoyZadolzhennostiPage";
import BankrotstvoSubsidiarnajaOtvetstvennostPage from "./pages/services/biz/BankrotstvoSubsidiarnajaOtvetstvennostPage";
import KorporativnyeSporyPage from "./pages/services/biz/KorporativnyeSporyPage";
import ZashchitaOtRejderskikhZakhvatovPage from "./pages/services/biz/ZashchitaOtRejderskikhZakhvatovPage";
import RegistratsiyaLikvidatsiyaKompaniyPage from "./pages/services/biz/RegistratsiyaLikvidatsiyaKompaniyPage";
import IntellektualnayaSobstvennostPage from "./pages/services/biz/IntellektualnayaSobstvennostPage";
import EkonomicheskiePrestupleniyaPage from "./pages/services/biz/EkonomicheskiePrestupleniyaPage";
import PhysPage from "./pages/services/PhysPage";
import BizPage from "./pages/services/BizPage";
import CriminalPage from "./pages/services/CriminalPage";
import RazvodPage from "./pages/services/phys/RazvodPage";
import AlimentyPage from "./pages/services/phys/AlimentyPage";
import ZhilishchnyeSporyPage from "./pages/services/phys/ZhilishchnyeSporyPage";
import NasledstvoPage from "./pages/services/phys/NasledstvoPage";
import PotrebiteliPage from "./pages/services/phys/PotrebiteliPage";
import DtpPage from "./pages/services/phys/DtpPage";
import TrudovyeSporyPage from "./pages/services/phys/TrudovyeSporyPage";
import Statya109Page from "./pages/services/phys/Statya109Page";
import Statya110Page from "./pages/services/phys/Statya110Page";
import Statya111Page from "./pages/services/phys/Statya111Page";
import Statya112Page from "./pages/services/phys/Statya112Page";
import Statya115Page from "./pages/services/phys/Statya115Page";
import Statya116Page from "./pages/services/phys/Statya116Page";
import Statya119Page from "./pages/services/phys/Statya119Page";
import Statya126Page from "./pages/services/criminal/Statya126Page";
import Statya127Page from "./pages/services/criminal/Statya127Page";
import Statya1281Page from "./pages/services/criminal/Statya1281Page";
import Statya131Page from "./pages/services/criminal/Statya131Page";
import Statya132Page from "./pages/services/criminal/Statya132Page";
import Statya135Page from "./pages/services/criminal/Statya135Page";
import Statya158Page from "./pages/services/criminal/Statya158Page";
import Statya159Page from "./pages/services/criminal/Statya159Page";
import MestoZhitelstvaPoryadokObshcheniyaPage from "./pages/services/phys/MestoZhitelstvaPoryadokObshcheniyaPage";
import BankrotstvoFizLitsPage from "./pages/services/phys/BankrotstvoFizLitsPage";
import Novosti from "./pages/Novosti";
import NewsDetail from "./pages/NewsDetail";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <QuickQuestion />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/uslugi-old" element={<Uslugi />} />
          <Route path="/uslugi" element={<UslugiNew />} />
          <Route path="/uslugi/:clusterSlug/:situationSlug" element={<ClusterServiceRouter />} />
          <Route path="/uslugi/:categorySlug/:serviceSlug/old" element={<ServiceDetail />} />
          <Route path="/o-kollegii" element={<OKollegii />} />
          <Route path="/keisy" element={<Keisy />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/novosti" element={<Novosti />} />
          <Route path="/novosti/:id" element={<NewsDetail />} />
          <Route path="/kontakty" element={<Kontakty />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
          <Route path="/thanks" element={<Thanks />} />
          
          {/* Audience pages */}
          <Route path="/services/phys" element={<PhysPage />} />
          <Route path="/services/biz" element={<BizPage />} />
          <Route path="/services/criminal" element={<CriminalPage />} />
          
          {/* Criminal law services */}
          <Route path="/services/criminal/statya-109" element={<Statya109Page />} />
          <Route path="/services/criminal/statya-110" element={<Statya110Page />} />
          <Route path="/services/criminal/statya-111" element={<Statya111Page />} />
          <Route path="/services/criminal/statya-112" element={<Statya112Page />} />
          <Route path="/services/criminal/statya-115" element={<Statya115Page />} />
          <Route path="/services/criminal/statya-116" element={<Statya116Page />} />
          <Route path="/services/criminal/statya-119" element={<Statya119Page />} />
          <Route path="/services/criminal/statya-126" element={<Statya126Page />} />
          <Route path="/services/criminal/statya-127" element={<Statya127Page />} />
          <Route path="/services/criminal/statya-128-1" element={<Statya1281Page />} />
          <Route path="/services/criminal/statya-131" element={<Statya131Page />} />
          <Route path="/services/criminal/statya-132" element={<Statya132Page />} />
          <Route path="/services/criminal/statya-135" element={<Statya135Page />} />
          <Route path="/services/criminal/statya-158" element={<Statya158Page />} />
          <Route path="/services/criminal/statya-159" element={<Statya159Page />} />
          
          {/* Old criminal routes - redirect */}
          <Route path="/services/phys/chapter-16" element={<Navigate to="/services/criminal" replace />} />
          <Route path="/services/phys/statya-109" element={<Navigate to="/services/criminal/statya-109" replace />} />
          <Route path="/services/phys/statya-110" element={<Navigate to="/services/criminal/statya-110" replace />} />
          <Route path="/services/phys/statya-111" element={<Navigate to="/services/criminal/statya-111" replace />} />
          <Route path="/services/phys/statya-112" element={<Navigate to="/services/criminal/statya-112" replace />} />
          <Route path="/services/phys/statya-115" element={<Navigate to="/services/criminal/statya-115" replace />} />
          <Route path="/services/phys/statya-116" element={<Navigate to="/services/criminal/statya-116" replace />} />
          <Route path="/services/phys/statya-119" element={<Navigate to="/services/criminal/statya-119" replace />} />
          
          {/* Physical persons services */}
          <Route path="/services/phys/razvod-razdel-imushchestva" element={<RazvodPage />} />
          <Route path="/services/phys/alimenty" element={<AlimentyPage />} />
          <Route path="/services/phys/zhilishchnye-spory" element={<ZhilishchnyeSporyPage />} />
          <Route path="/services/phys/nasledstvo" element={<NasledstvoPage />} />
          <Route path="/services/phys/zashchita-prav-potrebitelya" element={<PotrebiteliPage />} />
          <Route path="/services/phys/dtp-strahovye-spory" element={<DtpPage />} />
          <Route path="/services/phys/trudovye-spory" element={<TrudovyeSporyPage />} />
          <Route path="/services/phys/mesto-zhitelstva-poryadok-obshcheniya" element={<MestoZhitelstvaPoryadokObshcheniyaPage />} />
          <Route path="/services/phys/bankrotstvo-fiz-lits" element={<BankrotstvoFizLitsPage />} />
          
          {/* Business services */}
          <Route path="/services/biz/arbitrazhnye-spory" element={<ArbitrazhnyeSporyPage />} />
          <Route path="/services/biz/dogovornaya-rabota-pretensii" element={<DogovornayaRabotaPretensiiPage />} />
          <Route path="/services/biz/nalogovye-spory-proverki" element={<NalogovyeSporyProverkiPage />} />
          <Route path="/services/biz/vzyskanie-debitorskoy-zadolzhennosti" element={<VzyskanieDebitorskoyZadolzhennostiPage />} />
          <Route path="/services/biz/bankrotstvo-subsidiarnaya-otvetstvennost" element={<BankrotstvoSubsidiarnajaOtvetstvennostPage />} />
          <Route path="/services/biz/korporativnye-spory" element={<KorporativnyeSporyPage />} />
          <Route path="/services/biz/zashchita-ot-rejderskikh-zakhvatov" element={<ZashchitaOtRejderskikhZakhvatovPage />} />
          <Route path="/services/biz/registratsiya-likvidatsiya-kompaniy" element={<RegistratsiyaLikvidatsiyaKompaniyPage />} />
          <Route path="/services/biz/intellektualnaya-sobstvennost" element={<IntellektualnayaSobstvennostPage />} />
          <Route path="/services/biz/ekonomicheskie-prestupleniya" element={<EkonomicheskiePrestupleniyaPage />} />
          
          {/* Redirects from old URLs */}
          <Route path="/services/phys/moshennichestvo" element={<Navigate to="/services/phys" replace />} />
          <Route path="/services/phys/narkotiki" element={<Navigate to="/services/phys" replace />} />
          <Route path="/knowledge/*" element={<Navigate to="/uslugi" replace />} />
          <Route path="/blog/*" element={<Navigate to="/uslugi" replace />} />
          <Route path="/articles/*" element={<Navigate to="/uslugi" replace />} />
          <Route path="/services/ugolovnye" element={<Navigate to="/services/phys" replace />} />
          <Route path="/services/phys/ugolovnye" element={<Navigate to="/services/phys" replace />} />
          <Route path="/services/grazhdanskie" element={<Navigate to="/services/phys" replace />} />
          <Route path="/services/arbitrazh" element={<Navigate to="/services/biz" replace />} />
          <Route path="/services/biz/arbitrazh/*" element={<Navigate to="/services/biz/arbitrazhnye-spory" replace />} />
          <Route path="/services/biz/dogovory/*" element={<Navigate to="/services/biz/dogovornaya-rabota-pretensii" replace />} />
          <Route path="/services/biz/nalogi/*" element={<Navigate to="/services/biz/nalogovye-spory-proverki" replace />} />
          <Route path="/services/biz/vzyskanie/*" element={<Navigate to="/services/biz/vzyskanie-debitorskoy-zadolzhennosti" replace />} />
          <Route path="/services/biz/bankrotstvo/*" element={<Navigate to="/services/biz/bankrotstvo-subsidiarnaya-otvetstvennost" replace />} />
          <Route path="/about" element={<Navigate to="/o-kollegii" replace />} />
          <Route path="/cases" element={<Navigate to="/keisy" replace />} />
          <Route path="/contacts" element={<Navigate to="/kontakty" replace />} />
          <Route path="/practices" element={<Navigate to="/uslugi" replace />} />
          <Route path="/practices/:slug" element={<Navigate to="/uslugi" replace />} />
          <Route path="/komanda" element={<Navigate to="/o-kollegii" replace />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
