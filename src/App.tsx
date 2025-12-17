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
import VyseleniePage from "./pages/services/phys/VyseleniePage";
import SnyatieSRegistraciiPage from "./pages/services/phys/SnyatieSRegistraciiPage";
import ZhilishchnyeSporyPage from "./pages/services/phys/ZhilishchnyeSporyPage";
import ZalivKvartiryPage from "./pages/services/phys/ZalivKvartiryPage";
import VzyskanieUbytkovPage from "./pages/services/phys/VzyskanieUbytkovPage";
import VozmeshchenieUshcherbaPage from "./pages/services/phys/VozmeshchenieUshcherbaPage";
import NasledstvoPage from "./pages/services/phys/NasledstvoPage";
import VstupleniyeVNasledstvoPage from "./pages/services/phys/VstupleniyeVNasledstvoPage";
import FakticheskoePrinyatiyePage from "./pages/services/phys/FakticheskoePrinyatiyePage";
import VosstanovleniyeSrokaPage from "./pages/services/phys/VosstanovleniyeSrokaPage";
import RazdelNasledstvennogoImushchestvaPage from "./pages/services/phys/RazdelNasledstvennogoImushchestvaPage";
import NedostoynyyNaslednikPage from "./pages/services/phys/NedostoynyyNaslednikPage";
import PravoSobstvennostiVPoryadkeNasledovaniyaPage from "./pages/services/phys/PravoSobstvennostiVPoryadkeNasledovaniyaPage";
import Statya105Page from "./pages/services/criminal/Statya105Page";
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
import Statya160Page from "./pages/services/criminal/Statya160Page";
import Statya161Page from "./pages/services/criminal/Statya161Page";
import Statya162Page from "./pages/services/criminal/Statya162Page";
import Statya163Page from "./pages/services/criminal/Statya163Page";
import Statya167Page from "./pages/services/criminal/Statya167Page";
import Statya171Page from "./pages/services/criminal/Statya171Page";
import Statya172Page from "./pages/services/criminal/Statya172Page";
import Statya174Page from "./pages/services/criminal/Statya174Page";
import Statya175Page from "./pages/services/criminal/Statya175Page";
import Statya205Page from "./pages/services/criminal/Statya205Page";
import Statya2051Page from "./pages/services/criminal/Statya2051Page";
import Statya2052Page from "./pages/services/criminal/Statya2052Page";
import Statya2054Page from "./pages/services/criminal/Statya2054Page";
import Statya212Page from "./pages/services/criminal/Statya212Page";
import Statya213Page from "./pages/services/criminal/Statya213Page";
import Statya222Page from "./pages/services/criminal/Statya222Page";
import Statya223Page from "./pages/services/criminal/Statya223Page";
import Statya228Page from "./pages/services/criminal/Statya228Page";
import Statya2281Page from "./pages/services/criminal/Statya2281Page";
import Statya234Page from "./pages/services/criminal/Statya234Page";
import Statya290Page from "./pages/services/criminal/Statya290Page";
import Statya291Page from "./pages/services/criminal/Statya291Page";
import Statya2911Page from "./pages/services/criminal/Statya2911Page";
import Statya293Page from "./pages/services/criminal/Statya293Page";
import Statya317Page from "./pages/services/criminal/Statya317Page";
import Statya318Page from "./pages/services/criminal/Statya318Page";
import Statya3221Page from "./pages/services/criminal/Statya3221Page";
import Statya327Page from "./pages/services/criminal/Statya327Page";
import Statya330Page from "./pages/services/criminal/Statya330Page";
import MestoZhitelstvaRebonkaPage from "./pages/services/phys/MestoZhitelstvaRebonkaPage";
import PoryadokObscheniyaRebenkaPage from "./pages/services/phys/PoryadokObscheniyaRebenkaPage";
import LishenieRoditelskihPravPage from "./pages/services/phys/LishenieRoditelskihPravPage";
import OtcovstvoMaterinstvoPage from "./pages/services/phys/OtcovstvoMaterinstvoPage";
import RazdelImushchestvaSuprugovPage from "./pages/services/phys/RazdelImushchestvaSuprugovPage";
import BrachnyjDogovorPage from "./pages/services/phys/BrachnyjDogovorPage";
import UstraneniePrepyatstviyVoVseleniiPage from "./pages/services/phys/UstraneniePrepyatstviyVoVseleniiPage";
import PoryadokPolzovaniyaZhilymPomeshcheniemPage from "./pages/services/phys/PoryadokPolzovaniyaZhilymPomeshcheniemPage";
import ZadolzhennostZhkuPereraschetPage from "./pages/services/phys/ZadolzhennostZhkuPereraschetPage";
import SporySUkTszhPage from "./pages/services/phys/SporySUkTszhPage";
import OsparivaniePrivatizaciiPage from "./pages/services/phys/OsparivaniePrivatizaciiPage";
import SporySocnajemPage from "./pages/services/phys/SporySocnajemPage";
import UstraneniePrepyatstviyVPolzovaniiZhilymPomeshcheniemPage from "./pages/services/phys/UstraneniePrepyatstviyVPolzovaniiZhilymPomeshcheniemPage";
import VzyskaniePoRaspiskamPage from "./pages/services/phys/VzyskaniePoRaspiskamPage";
import VzyskaniePoDogovoramPage from "./pages/services/phys/VzyskaniePoDogovoramPage";
import RastorzhenieDogovoraUslugPage from "./pages/services/phys/RastorzhenieDogovoraUslugPage";
import PriznanieDogovoraNedeystvitelnymPage from "./pages/services/phys/PriznanieDogovoraNedeystvitelnymPage";
import PriznanieDogovoraNezaklyuchennymPage from "./pages/services/phys/PriznanieDogovoraNezaklyuchennymPage";
import OtkazOtIspolneniyaDogovoraPage from "./pages/services/phys/OtkazOtIspolneniyaDogovoraPage";
import NeosnovatelnoeObogashcheniePage from "./pages/services/phys/NeosnovatelnoeObogashcheniePage";
import VzyskanieArendnyhPlatezheyPage from "./pages/services/phys/VzyskanieArendnyhPlatezheyPage";
import OsparivanieNeustoykiShtrafovPeneyPage from "./pages/services/phys/OsparivanieNeustoykiShtrafovPeneyPage";
import OsparivanieZaveshchaniyaPage from "./pages/services/phys/OsparivanieZaveshchaniyaPage";
import VozvratDenezhnyhSredstvZozppPage from "./pages/services/phys/VozvratDenezhnyhSredstvZozppPage";
import SporyNekachestvennyeTovaryUslugiPage from "./pages/services/phys/SporyNekachestvennyeTovaryUslugiPage";
import NeustoykaSrokiIzgotovleniyaRemontaPage from "./pages/services/phys/NeustoykaSrokiIzgotovleniyaRemontaPage";
import NeustoykaSrokiVypolneniyaRabotPage from "./pages/services/phys/NeustoykaSrokiVypolneniyaRabotPage";
import SporyNekachestvennyyRemontRabotyPage from "./pages/services/phys/SporyNekachestvennyyRemontRabotyPage";
import UbytkiMoralnyyVredShtrafZozppPage from "./pages/services/phys/UbytkiMoralnyyVredShtrafZozppPage";
import VozmeshchenieUshcherbaDtpPage from "./pages/services/phys/VozmeshchenieUshcherbaDtpPage";
import VzyskanieStrahovogoVozmeshcheniyaOsagoPage from "./pages/services/phys/VzyskanieStrahovogoVozmeshcheniyaOsagoPage";
import VzyskanieStrahovogoVozmeshcheniyaKaskoPage from "./pages/services/phys/VzyskanieStrahovogoVozmeshcheniyaKaskoPage";
import VzyskanieUshcherbaSVinovnikaDtpPage from "./pages/services/phys/VzyskanieUshcherbaSVinovnikaDtpPage";
import SporyOtkazStrahovshchikaZanizhenieVyplatyPage from "./pages/services/phys/SporyOtkazStrahovshchikaZanizhenieVyplatyPage";
import KompensaciyaVredaZdorovyuUtrachennyyZarabotokPage from "./pages/services/phys/KompensaciyaVredaZdorovyuUtrachennyyZarabotokPage";
import OsparivanieUvolneniyaVosstanovleniePage from "./pages/services/phys/OsparivanieUvolneniyaVosstanovleniePage";
import ZarabotokZaVynuzhdennyyProgulPage from "./pages/services/phys/ZarabotokZaVynuzhdennyyProgulPage";
import ZadolzhennostPoZarplateIKompensaciiPage from "./pages/services/phys/ZadolzhennostPoZarplateIKompensaciiPage";
import OsparivanieDisciplinarnyhVzyskaniyPage from "./pages/services/phys/OsparivanieDisciplinarnyhVzyskaniyPage";
import KompensaciiZaTravmyNaRabotePage from "./pages/services/phys/KompensaciiZaTravmyNaRabotePage";
import OsparivanieShtrafovPeneyNeustoyekKreditPage from "./pages/services/phys/OsparivanieShtrafovPeneyNeustoyekKreditPage";
import OtsrochkaRassrochkaIspolneniyaResheniyaPage from "./pages/services/phys/OtsrochkaRassrochkaIspolneniyaResheniyaPage";
import OtmenaSudebnogoPrikazaVosstanovlenieSrokovPage from "./pages/services/phys/OtmenaSudebnogoPrikazaVosstanovlenieSrokovPage";
import OsparivanieIspolnitelnoyNadpisiNotariusaPage from "./pages/services/phys/OsparivanieIspolnitelnoyNadpisiNotariusaPage";
import SporySBankamiPoZadolzhennostiPage from "./pages/services/phys/SporySBankamiPoZadolzhennostiPage";
import ObzhalovanieDeystviyPristavovPage from "./pages/services/phys/ObzhalovanieDeystviyPristavovPage";
import SnyatieArestovOgranicheniyOtmenaZapretovPage from "./pages/services/phys/SnyatieArestovOgranicheniyOtmenaZapretovPage";
import OsparivanieNezakonnyhVzyskaniyUderzhaniyPage from "./pages/services/phys/OsparivanieNezakonnyhVzyskaniyUderzhaniyPage";
import SoprovozhdenieIspolneniyaResheniyaSudaPage from "./pages/services/phys/SoprovozhdenieIspolneniyaResheniyaSudaPage";
import OsparivanieMezhevaniyaPage from "./pages/services/phys/OsparivanieMezhevaniyaPage";
import OpredelenieGranicZemelnogoUchastkaPage from "./pages/services/phys/OpredelenieGranicZemelnogoUchastkaPage";
import PoryadokPolzovaniyaZemelnymUchastkomPage from "./pages/services/phys/PoryadokPolzovaniyaZemelnymUchastkomPage";
import VydelDoliVNaturePage from "./pages/services/phys/VydelDoliVNaturePage";
import PravoSobstvennostiNaZemelnyyUchastokPage from "./pages/services/phys/PravoSobstvennostiNaZemelnyyUchastokPage";
import OsparivanieKadastrovoiStoimostiPage from "./pages/services/phys/OsparivanieKadastrovoiStoimostiPage";
import SporySSosedyamiPoGranicamProezduPage from "./pages/services/phys/SporySSosedyamiPoGranicamProezduPage";
import OsparivanieDeystviyOrganovVlastiPage from "./pages/services/phys/OsparivanieDeystviyOrganovVlastiPage";
import OsparivanieResheniyNalogovyhOrganovPage from "./pages/services/phys/OsparivanieResheniyNalogovyhOrganovPage";
import OsparivanieBezdeystviyaDolzhnostnyhLicPage from "./pages/services/phys/OsparivanieBezdeystviyaDolzhnostnyhLicPage";
import OsparivaniePostanovleniyPoAdministrativnymPage from "./pages/services/phys/OsparivaniePostanovleniyPoAdministrativnymPage";
import DosudebnayaPretensiyaPage from "./pages/services/phys/DosudebnayaPretensiyaPage";
import ZhalobaZayavleniePage from "./pages/services/phys/ZhalobaZayavleniePage";
import IskovoeAdministrativnoeIskovoeZayavleniePage from "./pages/services/phys/IskovoeAdministrativnoeIskovoeZayavleniePage";
import HodataystvaVozrazheniyaOtzyvyPage from "./pages/services/phys/HodataystvaVozrazheniyaOtzyvyPage";
import ApellyacionnayaKassacionnayaZhalobaPage from "./pages/services/phys/ApellyacionnayaKassacionnayaZhalobaPage";
import ZhalobaVVerhovnyySudRfPage from "./pages/services/phys/ZhalobaVVerhovnyySudRfPage";
import ChastnayaZhalobaPage from "./pages/services/phys/ChastnayaZhalobaPage";
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
          <Route path="/services/criminal/statya-105" element={<Statya105Page />} />
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
          <Route path="/services/criminal/statya-160" element={<Statya160Page />} />
          <Route path="/services/criminal/statya-161" element={<Statya161Page />} />
          <Route path="/services/criminal/statya-162" element={<Statya162Page />} />
          <Route path="/services/criminal/statya-163" element={<Statya163Page />} />
          <Route path="/services/criminal/statya-167" element={<Statya167Page />} />
          <Route path="/services/criminal/statya-171" element={<Statya171Page />} />
          <Route path="/services/criminal/statya-172" element={<Statya172Page />} />
          <Route path="/services/criminal/statya-174" element={<Statya174Page />} />
          <Route path="/services/criminal/statya-175" element={<Statya175Page />} />
          <Route path="/services/criminal/statya-205" element={<Statya205Page />} />
          <Route path="/services/criminal/statya-205-1" element={<Statya2051Page />} />
          <Route path="/services/criminal/statya-205-2" element={<Statya2052Page />} />
          <Route path="/services/criminal/statya-205-4" element={<Statya2054Page />} />
          <Route path="/services/criminal/statya-212" element={<Statya212Page />} />
          <Route path="/services/criminal/statya-213" element={<Statya213Page />} />
          <Route path="/services/criminal/statya-222" element={<Statya222Page />} />
          <Route path="/services/criminal/statya-223" element={<Statya223Page />} />
          <Route path="/services/criminal/statya-228" element={<Statya228Page />} />
          <Route path="/services/criminal/statya-228-1" element={<Statya2281Page />} />
          <Route path="/services/criminal/statya-234" element={<Statya234Page />} />
          <Route path="/services/criminal/statya-290" element={<Statya290Page />} />
          <Route path="/services/criminal/statya-291" element={<Statya291Page />} />
          <Route path="/services/criminal/statya-291-1" element={<Statya2911Page />} />
          <Route path="/services/criminal/statya-293" element={<Statya293Page />} />
          <Route path="/services/criminal/statya-317" element={<Statya317Page />} />
          <Route path="/services/criminal/statya-318" element={<Statya318Page />} />
          <Route path="/services/criminal/statya-322-1" element={<Statya3221Page />} />
          <Route path="/services/criminal/statya-327" element={<Statya327Page />} />
          <Route path="/services/criminal/statya-330" element={<Statya330Page />} />
          
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
          <Route path="/services/phys/razvod" element={<RazvodPage />} />
          <Route path="/services/phys/alimenty" element={<AlimentyPage />} />
          <Route path="/services/phys/mesto-zhitelstva-rebenka" element={<MestoZhitelstvaRebonkaPage />} />
          <Route path="/services/phys/poryadok-obshcheniya-s-rebenkom" element={<PoryadokObscheniyaRebenkaPage />} />
          <Route path="/services/phys/lishenie-roditelskih-prav" element={<LishenieRoditelskihPravPage />} />
          <Route path="/services/phys/otcovstvo-materinstvo" element={<OtcovstvoMaterinstvoPage />} />
          <Route path="/services/phys/razdel-imushchestva-suprugov" element={<RazdelImushchestvaSuprugovPage />} />
          <Route path="/services/phys/brachnyj-dogovor" element={<BrachnyjDogovorPage />} />
          <Route path="/services/phys/ustranenie-prepyatstviy-vo-vselenii" element={<UstraneniePrepyatstviyVoVseleniiPage />} />
          <Route path="/services/phys/vyselenie" element={<VyseleniePage />} />
          <Route path="/services/phys/snyatie-s-registracionnogo-ucheta" element={<SnyatieSRegistraciiPage />} />
          <Route path="/services/phys/poryadok-polzovaniya-zhilym-pomeshcheniem" element={<PoryadokPolzovaniyaZhilymPomeshcheniemPage />} />
          <Route path="/services/phys/zadolzhennost-zhku-pereraschet" element={<ZadolzhennostZhkuPereraschetPage />} />
          <Route path="/services/phys/spory-s-uk-tszh" element={<SporySUkTszhPage />} />
          <Route path="/services/phys/osparivanie-privatizacii" element={<OsparivaniePrivatizaciiPage />} />
          <Route path="/services/phys/spory-socnajem" element={<SporySocnajemPage />} />
          <Route path="/services/phys/ustranenie-prepyatstviy-v-polzovanii-zhilym-pomeshcheniem" element={<UstraneniePrepyatstviyVPolzovaniiZhilymPomeshcheniemPage />} />
          <Route path="/services/phys/zhilishchnye-spory" element={<Navigate to="/services/phys/vyselenie" replace />} />
          <Route path="/services/phys/zaliv-kvartiry" element={<ZalivKvartiryPage />} />
          <Route path="/services/phys/vzyskanie-ubytkov" element={<VzyskanieUbytkovPage />} />
          <Route path="/services/phys/vozmeshchenie-ushcherba" element={<VozmeshchenieUshcherbaPage />} />
          <Route path="/services/phys/vstuplenie-v-nasledstvo" element={<VstupleniyeVNasledstvoPage />} />
          <Route path="/services/phys/fakticheskoe-prinyatie-nasledstva" element={<FakticheskoePrinyatiyePage />} />
          <Route path="/services/phys/vosstanovlenie-sroka-nasledstva" element={<VosstanovleniyeSrokaPage />} />
          <Route path="/services/phys/razdel-nasledstvennogo-imushchestva" element={<RazdelNasledstvennogoImushchestvaPage />} />
          <Route path="/services/phys/nedostoynyy-naslednik" element={<NedostoynyyNaslednikPage />} />
          <Route path="/services/phys/pravo-sobstvennosti-v-poryadke-nasledovaniya" element={<PravoSobstvennostiVPoryadkeNasledovaniyaPage />} />
          <Route path="/services/phys/nasledstvo" element={<Navigate to="/services/phys/vstuplenie-v-nasledstvo" replace />} />
          <Route path="/services/phys/vzyskanie-po-raspiskam" element={<VzyskaniePoRaspiskamPage />} />
          <Route path="/services/phys/vzyskanie-po-dogovoram" element={<VzyskaniePoDogovoramPage />} />
          <Route path="/services/phys/rastorzhenie-dogovora-uslug" element={<RastorzhenieDogovoraUslugPage />} />
          <Route path="/services/phys/priznanie-dogovora-nedeystvitelnym" element={<PriznanieDogovoraNedeystvitelnymPage />} />
          <Route path="/services/phys/priznanie-dogovora-nezaklyuchennym" element={<PriznanieDogovoraNezaklyuchennymPage />} />
          <Route path="/services/phys/otkaz-ot-ispolneniya-dogovora" element={<OtkazOtIspolneniyaDogovoraPage />} />
          <Route path="/services/phys/neosnovatelnoe-obogashchenie" element={<NeosnovatelnoeObogashcheniePage />} />
          <Route path="/services/phys/vzyskanie-arendnyh-platezhey" element={<VzyskanieArendnyhPlatezheyPage />} />
          <Route path="/services/phys/osparivanie-neustoyki-shtrafov-peney" element={<OsparivanieNeustoykiShtrafovPeneyPage />} />
          <Route path="/services/phys/osparivanie-zaveshchaniya" element={<OsparivanieZaveshchaniyaPage />} />
          <Route path="/services/phys/vozvrat-denezhnyh-sredstv-zozpp" element={<VozvratDenezhnyhSredstvZozppPage />} />
          <Route path="/services/phys/spory-nekachestvennye-tovary-uslugi" element={<SporyNekachestvennyeTovaryUslugiPage />} />
          <Route path="/services/phys/neustoyka-sroki-izgotovleniya-remonta" element={<NeustoykaSrokiIzgotovleniyaRemontaPage />} />
          <Route path="/services/phys/neustoyka-sroki-vypolneniya-rabot" element={<NeustoykaSrokiVypolneniyaRabotPage />} />
          <Route path="/services/phys/spory-nekachestvennyy-remont-raboty" element={<SporyNekachestvennyyRemontRabotyPage />} />
          <Route path="/services/phys/ubytki-moralnyy-vred-shtraf-zozpp" element={<UbytkiMoralnyyVredShtrafZozppPage />} />
          <Route path="/services/phys/vozmeshchenie-ushcherba-dtp" element={<VozmeshchenieUshcherbaDtpPage />} />
          <Route path="/services/phys/vzyskanie-strahovogo-vozmeshcheniya-osago" element={<VzyskanieStrahovogoVozmeshcheniyaOsagoPage />} />
          <Route path="/services/phys/vzyskanie-strahovogo-vozmeshcheniya-kasko" element={<VzyskanieStrahovogoVozmeshcheniyaKaskoPage />} />
          <Route path="/services/phys/vzyskanie-ushcherba-s-vinovnika-dtp" element={<VzyskanieUshcherbaSVinovnikaDtpPage />} />
          <Route path="/services/phys/spory-otkaz-strahovshchika-zanizhenie-vyplaty" element={<SporyOtkazStrahovshchikaZanizhenieVyplatyPage />} />
          <Route path="/services/phys/kompensaciya-vreda-zdorovyu-utrachennyy-zarabotok" element={<KompensaciyaVredaZdorovyuUtrachennyyZarabotokPage />} />
          <Route path="/services/phys/osparivanie-uvolneniya-vosstanovlenie" element={<OsparivanieUvolneniyaVosstanovleniePage />} />
          <Route path="/services/phys/zarabotok-za-vynuzhdennyy-progul" element={<ZarabotokZaVynuzhdennyyProgulPage />} />
          <Route path="/services/phys/zadolzhennost-po-zarplate-i-kompensacii" element={<ZadolzhennostPoZarplateIKompensaciiPage />} />
          <Route path="/services/phys/osparivanie-disciplinarnyh-vzyskaniy" element={<OsparivanieDisciplinarnyhVzyskaniyPage />} />
          <Route path="/services/phys/kompensacii-za-travmy-na-rabote" element={<KompensaciiZaTravmyNaRabotePage />} />
          <Route path="/services/phys/osparivanie-shtrafov-peney-neustoyek-kredit" element={<OsparivanieShtrafovPeneyNeustoyekKreditPage />} />
          <Route path="/services/phys/otsrochka-rassrochka-ispolneniya-resheniya" element={<OtsrochkaRassrochkaIspolneniyaResheniyaPage />} />
          <Route path="/services/phys/otmena-sudebnogo-prikaza-vosstanovlenie-srokov" element={<OtmenaSudebnogoPrikazaVosstanovlenieSrokovPage />} />
          <Route path="/services/phys/osparivanie-ispolnitelnoy-nadpisi-notariusa" element={<OsparivanieIspolnitelnoyNadpisiNotariusaPage />} />
          <Route path="/services/phys/spory-s-bankami-po-zadolzhennosti" element={<SporySBankamiPoZadolzhennostiPage />} />
          <Route path="/services/phys/obzhalovanie-deystviy-pristavov" element={<ObzhalovanieDeystviyPristavovPage />} />
          <Route path="/services/phys/snyatie-arestov-ogranicheniy-otmena-zapretov" element={<SnyatieArestovOgranicheniyOtmenaZapretovPage />} />
          <Route path="/services/phys/osparivanie-nezakonnyh-vzyskaniy-uderzhaniy" element={<OsparivanieNezakonnyhVzyskaniyUderzhaniyPage />} />
          <Route path="/services/phys/soprovozhdenie-ispolneniya-resheniya-suda" element={<SoprovozhdenieIspolneniyaResheniyaSudaPage />} />
          <Route path="/services/phys/osparivanie-mezhevaniya" element={<OsparivanieMezhevaniyaPage />} />
          <Route path="/services/phys/opredelenie-granic-zemelnogo-uchastka" element={<OpredelenieGranicZemelnogoUchastkaPage />} />
          <Route path="/services/phys/poryadok-polzovaniya-zemelnym-uchastkom" element={<PoryadokPolzovaniyaZemelnymUchastkomPage />} />
          <Route path="/services/phys/vydel-doli-v-nature" element={<VydelDoliVNaturePage />} />
          <Route path="/services/phys/pravo-sobstvennosti-na-zemelnyy-uchastok" element={<PravoSobstvennostiNaZemelnyyUchastokPage />} />
          <Route path="/services/phys/osparivanie-kadastrovoy-stoimosti" element={<OsparivanieKadastrovoiStoimostiPage />} />
          <Route path="/services/phys/spory-s-sosedyami-po-granicam-proezdu" element={<SporySSosedyamiPoGranicamProezduPage />} />
          <Route path="/services/phys/osparivanie-deystviy-organov-vlasti" element={<OsparivanieDeystviyOrganovVlastiPage />} />
          <Route path="/services/phys/osparivanie-resheniy-nalogovyh-organov" element={<OsparivanieResheniyNalogovyhOrganovPage />} />
          <Route path="/services/phys/osparivanie-bezdeystviya-dolzhnostnyh-lic" element={<OsparivanieBezdeystviyaDolzhnostnyhLicPage />} />
          <Route path="/services/phys/osparivanie-postanovleniy-po-administrativnym" element={<OsparivaniePostanovleniyPoAdministrativnymPage />} />
          <Route path="/services/phys/dosudebnaya-pretenziya" element={<DosudebnayaPretensiyaPage />} />
          <Route path="/services/phys/zhaloba-zayavlenie" element={<ZhalobaZayavleniePage />} />
          <Route path="/services/phys/iskovoe-administrativnoe-iskovoe-zayavlenie" element={<IskovoeAdministrativnoeIskovoeZayavleniePage />} />
          <Route path="/services/phys/hodataystva-vozrazheniya-otzyvy" element={<HodataystvaVozrazheniyaOtzyvyPage />} />
          <Route path="/services/phys/apellyacionnaya-kassacionnaya-zhaloba" element={<ApellyacionnayaKassacionnayaZhalobaPage />} />
          <Route path="/services/phys/zhaloba-v-verhovnyy-sud-rf" element={<ZhalobaVVerhovnyySudRfPage />} />
          <Route path="/services/phys/chastnaya-zhaloba" element={<ChastnayaZhalobaPage />} />
          
          {/* Redirects from old family services URLs */}
          <Route path="/services/phys/razvod-razdel-imushchestva" element={<Navigate to="/services/phys/razvod" replace />} />
          <Route path="/services/phys/mesto-zhitelstva-poryadok-obshcheniya" element={<Navigate to="/services/phys/mesto-zhitelstva-rebenka" replace />} />
          
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
