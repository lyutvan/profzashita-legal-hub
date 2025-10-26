import { Helmet } from "react-helmet";

interface OrganizationSchemaProps {
  name?: string;
  url?: string;
  logo?: string;
  phone?: string;
  email?: string;
  address?: {
    streetAddress: string;
    addressLocality: string;
    postalCode: string;
    addressCountry: string;
  };
}

interface ReviewSchemaProps {
  reviews: Array<{
    author: string;
    rating: number;
    reviewBody: string;
    datePublished: string;
  }>;
}

export const OrganizationSchema = ({
  name = "Коллегия адвокатов города Москвы \"ПРОФЗАЩИТА\"",
  url = "https://profzashchita.ru",
  logo = "https://profzashchita.ru/logo.svg",
  phone = "+7 999 999 99 99",
  email = "profzashchita@internet.ru",
  address = {
    streetAddress: "ул. Примерная, д. 1",
    addressLocality: "Москва",
    postalCode: "101000",
    addressCountry: "RU",
  },
}: OrganizationSchemaProps) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    name,
    url,
    logo,
    telephone: phone,
    email,
    address: {
      "@type": "PostalAddress",
      ...address,
    },
    openingHours: "Mo-Fr 09:00-19:00, Sa 10:00-16:00",
    priceRange: "₽₽₽",
    areaServed: {
      "@type": "Country",
      name: "Russia",
    },
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};

export const ReviewSchema = ({ reviews }: ReviewSchemaProps) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Коллегия адвокатов города Москвы \"ПРОФЗАЩИТА\"",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      reviewCount: reviews.length.toString(),
    },
    review: reviews.map((review) => ({
      "@type": "Review",
      author: {
        "@type": "Person",
        name: review.author,
      },
      reviewRating: {
        "@type": "Rating",
        ratingValue: review.rating.toString(),
        bestRating: "5",
      },
      reviewBody: review.reviewBody,
      datePublished: review.datePublished,
    })),
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};

export default { OrganizationSchema, ReviewSchema };
