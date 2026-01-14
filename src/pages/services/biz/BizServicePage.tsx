import { useLocation } from "react-router-dom";
import BizServiceTemplate from "@/components/BizServiceTemplate";
import NotFound from "@/pages/NotFound";
import { audienceServices } from "@/data/services-audiences";
import { getBizServicePageData } from "@/data/biz-service-content";

const BizServicePage = () => {
  const location = useLocation();
  const pathname = location.pathname.replace(/\/+$/, "") || "/";

  const service = audienceServices.find(
    (item) => item.audience === "biz" && item.path === pathname
  );

  if (!service) return <NotFound />;

  const pageData = getBizServicePageData(service);
  return <BizServiceTemplate data={pageData} />;
};

export default BizServicePage;
