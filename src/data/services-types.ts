export interface ServiceCategory {
  id: string;
  title: string;
  slug: string;
  items: ServiceItem[];
}

export interface ServiceItem {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  situations: string[];
  actions: string[];
  process: ProcessStep[];
  timing: string;
  pricing: PricingPackage[];
  faqs: FAQ[];
}

export interface ProcessStep {
  number: number;
  title: string;
  description: string;
}

export interface PricingPackage {
  name: string;
  priceFrom: number;
  description: string;
  features: string[];
}

export interface FAQ {
  question: string;
  answer: string;
}
