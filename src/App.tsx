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
import RazvodPage from "./pages/services/phys/RazvodPage";
import AlimentyPage from "./pages/services/phys/AlimentyPage";
import ZhilishchnyeSporyPage from "./pages/services/phys/ZhilishchnyeSporyPage";
import NasledstvoPage from "./pages/services/phys/NasledstvoPage";
import PotrebiteliPage from "./pages/services/phys/PotrebiteliPage";
import DtpPage from "./pages/services/phys/DtpPage";
import TrudovyeSporyPage from "./pages/services/phys/TrudovyeSporyPage";
import MoshennichestvoPage from "./pages/services/phys/MoshennichestvoPage";
import NarkotikiPage from "./pages/services/phys/NarkotikiPage";
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
          
          {/* Physical persons services */}
          <Route path="/services/phys/razvod-razdel-imushchestva" element={<RazvodPage />} />
          <Route path="/services/phys/alimenty" element={<AlimentyPage />} />
          <Route path="/services/phys/zhilishchnye-spory" element={<ZhilishchnyeSporyPage />} />
          <Route path="/services/phys/nasledstvo" element={<NasledstvoPage />} />
          <Route path="/services/phys/zashchita-prav-potrebitelya" element={<PotrebiteliPage />} />
          <Route path="/services/phys/dtp-strahovye-spory" element={<DtpPage />} />
          <Route path="/services/phys/trudovye-spory" element={<TrudovyeSporyPage />} />
          <Route path="/services/phys/moshennichestvo" element={<MoshennichestvoPage />} />
          <Route path="/services/phys/narkotiki" element={<NarkotikiPage />} />
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
