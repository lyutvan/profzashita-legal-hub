import { useParams, Navigate } from "react-router-dom";
import NotFound from "@/pages/NotFound";
import CriminalServiceTemplate from "@/components/CriminalServiceTemplate";
import {
  getCriminalLegacyRedirect,
  getCriminalServiceEntryBySlug,
  getCriminalServicePageData
} from "@/data/criminal-service-content";

const CriminalServiceDetailPage = () => {
  const { slug } = useParams();

  if (!slug) return <NotFound />;

  const legacyRedirect = getCriminalLegacyRedirect(slug);
  if (legacyRedirect) {
    return <Navigate to={`/services/criminal/${legacyRedirect}`} replace />;
  }

  const entry = getCriminalServiceEntryBySlug(slug);
  if (!entry) return <NotFound />;

  const pageData = getCriminalServicePageData(entry);
  return <CriminalServiceTemplate data={pageData} />;
};

export default CriminalServiceDetailPage;
