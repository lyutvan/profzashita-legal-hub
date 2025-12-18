import { useLocation } from "react-router-dom";
import ServiceTemplate from "@/components/ServiceTemplate";
import NotFound from "@/pages/NotFound";
import { audienceServices } from "@/data/services-audiences";
import { SITE } from "@/config/site";
import { getBizServiceContent } from "./bizServiceContent";

const BizServicePage = () => {
  const location = useLocation();
  const pathname = location.pathname.replace(/\/+$/, "") || "/";

  const service = audienceServices.find(
    (item) => item.audience === "biz" && item.path === pathname
  );

  if (!service) return <NotFound />;

  const content = getBizServiceContent(service);
  const canonical = new URL(service.path, SITE.url).toString();

  const leadParagraph =
    service.description ?? content.introParagraphs[0] ?? "Юридическая помощь для бизнеса по договоренности.";
  const introParagraphs = service.description
    ? content.introParagraphs
    : content.introParagraphs.slice(1);

  return (
    <ServiceTemplate
      title={`${service.title} — Профзащита`}
      metaDescription={
        service.description ??
        `Юридическая помощь бизнесу: ${service.title}. Сопровождение по договоренности.`
      }
      canonical={canonical}
      breadcrumbLabel={service.title}
      audience="biz"
      subtitle={service.category}
      h1={service.title}
      leadParagraph={leadParagraph}
      introParagraphs={introParagraphs}
      whenToContactTitle="Когда это актуально"
      whenToContact={content.whenToContact}
      whatWeDoTitle="Что делаем"
      whatWeDo={content.whatWeDo}
      stepsTitle="Как работаем"
      steps={content.steps}
      documentsAndTimingTitle="Что нужно от клиента"
      documentsList={content.clientNeeds}
      documentsAndTiming={content.timing}
      faqs={content.faqs}
      ctaBlock={{
        title: "Обсудим задачу конфиденциально",
        description:
          "Расскажите, что происходит сейчас, какие документы уже есть и какие сроки важны. Работаем по договору, при необходимости оформим NDA."
      }}
      ctaButtons={{
        primaryLabel: "Записаться на консультацию",
        secondaryLabel: "Связаться"
      }}
    />
  );
};

export default BizServicePage;

