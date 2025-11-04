import { Helmet } from "react-helmet";
import { SITE } from "@/config/site";

interface JsonLdProps {
  data: object;
}

export const JsonLd = ({ data }: JsonLdProps) => {
  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(data)}</script>
    </Helmet>
  );
};

// Organization + LocalBusiness + LegalService schema
export const OrganizationSchema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": ["LegalService", "LocalBusiness", "Organization"],
    "@id": `${SITE.url}#organization`,
    "inLanguage": "ru-RU",
    "name": SITE.name,
    "legalName": SITE.legalName,
    "url": SITE.url,
    "logo": SITE.logo,
    "image": SITE.ogImage,
    "telephone": SITE.phone,
    "email": SITE.email,
    "address": {
      "@type": "PostalAddress",
      "addressCountry": SITE.address.country,
      "addressLocality": SITE.address.city,
      "streetAddress": SITE.address.street,
      "postalCode": SITE.address.postal
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": SITE.geo.lat,
      "longitude": SITE.geo.lng
    },
    "openingHoursSpecification": [{
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      "opens": SITE.hours.opens,
      "closes": SITE.hours.closes
    }],
    "areaServed": SITE.areaServed,
    "sameAs": SITE.sameAs
  };

  return <JsonLd data={schema} />;
};

// WebSite schema
export const WebSiteSchema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE.url}#website`,
    "url": SITE.url,
    "name": "Профзащита",
    "inLanguage": "ru-RU",
    "publisher": { "@id": `${SITE.url}#organization` }
  };

  return <JsonLd data={schema} />;
};

// BreadcrumbList schema
interface BreadcrumbItem {
  name: string;
  url: string;
}

export const BreadcrumbSchema = ({ items }: { items: BreadcrumbItem[] }) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };

  return <JsonLd data={schema} />;
};

// LegalService schema for service pages
interface LegalServiceSchemaProps {
  serviceType: string;
  url: string;
  priceFrom?: string;
}

export const LegalServiceSchema = ({ serviceType, url, priceFrom }: LegalServiceSchemaProps) => {
  const schema: any = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    "@id": `${url}#service`,
    "serviceType": serviceType,
    "provider": { "@id": `${SITE.url}#organization` },
    "url": url,
    "inLanguage": "ru-RU",
    "areaServed": SITE.areaServed
  };

  if (priceFrom) {
    schema.offers = {
      "@type": "Offer",
      "priceCurrency": "RUB",
      "priceSpecification": {
        "@type": "PriceSpecification",
        "minPrice": priceFrom
      },
      "availability": "https://schema.org/InStock"
    };
  }

  return <JsonLd data={schema} />;
};

// Person/Attorney schema
interface PersonSchemaProps {
  name: string;
  jobTitle: string;
  image?: string;
  url: string;
  credential?: string;
}

export const PersonSchema = ({ name, jobTitle, image, url, credential }: PersonSchemaProps) => {
  const schema: any = {
    "@context": "https://schema.org",
    "@type": ["Person", "Attorney"],
    "@id": `${url}#person`,
    "name": name,
    "jobTitle": jobTitle,
    "memberOf": { "@id": `${SITE.url}#organization` },
    "url": url,
    "inLanguage": "ru-RU"
  };

  if (image) {
    schema.image = image;
  }

  if (credential) {
    schema.hasCredential = [{
      "@type": "EducationalOccupationalCredential",
      "name": credential
    }];
  }

  return <JsonLd data={schema} />;
};

// FAQPage schema
interface FAQItem {
  question: string;
  answer: string;
}

export const FAQPageSchema = ({ items, url }: { items: FAQItem[]; url: string }) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${url}#page`,
    "mainEntity": items.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };

  return <JsonLd data={schema} />;
};

export default { JsonLd, OrganizationSchema, WebSiteSchema, BreadcrumbSchema, LegalServiceSchema, PersonSchema, FAQPageSchema };
