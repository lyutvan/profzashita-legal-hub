import { useParams, Navigate } from "react-router-dom";
import ClusterServicePage from "@/components/ClusterServicePage";
import { serviceClusters } from "@/data/services-clusters";

const ClusterServiceRouter = () => {
  const { clusterSlug, situationSlug } = useParams();

  // Find cluster and situation
  const cluster = serviceClusters.find(c => c.slug === clusterSlug);
  const situation = cluster?.situations.find(s => s.slug === situationSlug);

  if (!cluster || !situation) {
    return <Navigate to="/uslugi" replace />;
  }

  return (
    <ClusterServicePage
      situation={situation}
      clusterTitle={cluster.title}
      clusterSlug={cluster.slug}
      allSituations={cluster.situations}
    />
  );
};

export default ClusterServiceRouter;
