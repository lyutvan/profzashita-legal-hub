import { useParams } from "react-router-dom";
import NotFound from "@/pages/NotFound";
import PhysServiceTemplate from "@/components/PhysServiceTemplate";
import { getPhysServiceEntryBySlug, getPhysServicePageData } from "@/data/phys-service-content";

const PhysServiceDetailPage = () => {
  const { slug } = useParams();

  if (!slug) return <NotFound />;

  const entry = getPhysServiceEntryBySlug(slug);
  if (!entry) return <NotFound />;

  const pageData = getPhysServicePageData(entry);
  return <PhysServiceTemplate data={pageData} />;
};

export default PhysServiceDetailPage;
