import LeadForm from "@/components/LeadForm";

interface PhysServiceLeadFormProps {
  serviceTitle: string;
  situationOptions: string[];
  desiredResults: string[];
}

const PhysServiceLeadForm = ({ serviceTitle }: PhysServiceLeadFormProps) => {
  return <LeadForm practiceType={serviceTitle} />;
};

export default PhysServiceLeadForm;
