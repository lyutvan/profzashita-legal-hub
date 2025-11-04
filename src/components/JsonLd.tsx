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

// Article schema (for case studies and blog posts)
interface ArticleSchemaProps {
  headline: string;
  description: string;
  datePublished: string;
  author: string;
  url: string;
  image?: string;
  articleBody?: string;
}

export const ArticleSchema = ({ headline, description, datePublished, author, url, image, articleBody }: ArticleSchemaProps) => {
  const schema: any = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    "headline": headline,
    "description": description,
    "datePublished": datePublished,
    "dateModified": datePublished,
    "author": {
      "@type": "Organization",
      "@id": `${SITE.url}#organization`,
      "name": author
    },
    "publisher": {
      "@type": "Organization",
      "@id": `${SITE.url}#organization`,
      "name": SITE.name,
      "logo": {
        "@type": "ImageObject",
        "url": SITE.logo
      }
    },
    "url": url,
    "inLanguage": "ru-RU",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url
    }
  };

  if (image) {
    schema.image = {
      "@type": "ImageObject",
      "url": image
    };
  }

  if (articleBody) {
    schema.articleBody = articleBody;
  }

  return <JsonLd data={schema} />;
};

// BlogPosting schema (for blog articles)
interface BlogPostingSchemaProps {
  headline: string;
  description: string;
  datePublished: string;
  dateModified: string;
  authorName: string;
  authorJobTitle: string;
  url: string;
  image?: string;
  keywords?: string[];
  articleSection?: string;
}

export const BlogPostingSchema = ({ 
  headline, 
  description, 
  datePublished, 
  dateModified,
  authorName,
  authorJobTitle,
  url, 
  image, 
  keywords,
  articleSection
}: BlogPostingSchemaProps) => {
  const schema: any = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#post`,
    "headline": headline,
    "description": description,
    "image": image || SITE.ogImage,
    "inLanguage": "ru-RU",
    "datePublished": datePublished,
    "dateModified": dateModified,
    "author": {
      "@type": "Person",
      "name": authorName,
      "jobTitle": authorJobTitle,
      "memberOf": { "@id": `${SITE.url}#organization` }
    },
    "publisher": {
      "@type": "Organization",
      "@id": `${SITE.url}#organization`,
      "name": SITE.name,
      "logo": {
        "@type": "ImageObject",
        "url": SITE.logo
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url
    }
  };

  if (articleSection) {
    schema.articleSection = articleSection;
  }

  if (keywords && keywords.length > 0) {
    schema.keywords = keywords.join(", ");
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

// Review schema (for individual reviews and aggregate rating)
interface ReviewItem {
  author: string;
  rating: number;
  reviewBody: string;
  datePublished: string;
}

export const ReviewsSchema = ({ reviews }: { reviews: ReviewItem[] }) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE.url}#organization`,
    "name": SITE.name,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5",
      "bestRating": "5",
      "worstRating": "1",
      "ratingCount": reviews.length.toString(),
      "reviewCount": reviews.length.toString()
    },
    "review": reviews.map(review => ({
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": review.author
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": review.rating.toString(),
        "bestRating": "5",
        "worstRating": "1"
      },
      "reviewBody": review.reviewBody,
      "datePublished": review.datePublished,
      "inLanguage": "ru-RU"
    }))
  };

  return <JsonLd data={schema} />;
};

export default { JsonLd, OrganizationSchema, WebSiteSchema, BreadcrumbSchema, LegalServiceSchema, PersonSchema, ArticleSchema, BlogPostingSchema, FAQPageSchema, ReviewsSchema };
