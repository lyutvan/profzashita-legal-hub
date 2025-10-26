import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Helmet } from "react-helmet";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";
import LeadForm from "@/components/LeadForm";
import legalBg1 from "@/assets/legal-bg-1.jpg";

const faqCategories = [
  {
    category: "Общие вопросы",
    questions: [
      {
        q: "Как записаться на консультацию?",
        a: "Вы можете записаться на консультацию через форму на сайте, по телефону +7 999 999 99 99 или отправив заявку через раздел 'Контакты'. Мы свяжемся с вами в течение 15 минут."
      },
      {
        q: "Сколько стоит первичная консультация?",
        a: "Стоимость первичной консультации зависит от направления практики и начинается от 3 000 рублей. В некоторых случаях первичная консультация может быть бесплатной — уточните при записи."
      },
      {
        q: "Как проходит консультация?",
        a: "Консультация может проходить очно в офисе, онлайн или по телефону. Длительность — от 30 минут до 1 часа. Рекомендуем подготовить все имеющиеся документы по вашему вопросу."
      },
      {
        q: "Работаете ли вы по всей России?",
        a: "Да, мы работаем с клиентами из любых регионов России. Консультации проводим онлайн, а в суд выезжаем в любой город при необходимости."
      },
      {
        q: "Какие гарантии вы даёте?",
        a: "Мы не даём 100% гарантий на исход дела, так как это противоречит адвокатской этике. Но мы гарантируем профессиональный подход, конфиденциальность и использование всех законных способов защиты ваших интересов."
      }
    ]
  },
  {
    category: "Стоимость и оплата",
    questions: [
      {
        q: "Как формируется стоимость услуг?",
        a: "Стоимость зависит от сложности дела, объёма работ, срочности и инстанции. После изучения документов и консультации мы предоставляем точную смету с детализацией."
      },
      {
        q: "Можно ли оплатить услуги частями?",
        a: "Да, мы предлагаем гибкие условия оплаты. Возможна поэтапная оплата: аванс при заключении договора, промежуточные платежи по ходу работы, окончательный расчёт после завершения."
      },
      {
        q: "Какие способы оплаты вы принимаете?",
        a: "Мы принимаем оплату наличными в офисе, банковским переводом на расчётный счёт, а также возможна оплата по карте."
      },
      {
        q: "Нужно ли платить, если дело не выиграно?",
        a: "Оплата производится за оказанные услуги независимо от исхода дела. Исключение — работа по условию 'гонорар успеха', когда часть оплаты зависит от результата (обсуждается индивидуально)."
      }
    ]
  },
  {
    category: "Процесс работы",
    questions: [
      {
        q: "Сколько времени занимает рассмотрение дела?",
        a: "Сроки зависят от категории дела: гражданские дела — 2-6 месяцев, уголовные — от 2 месяцев следствия до года с судом, арбитражные споры — 2-4 месяца в первой инстанции. Точные сроки озвучим после изучения вашей ситуации."
      },
      {
        q: "Нужно ли мне присутствовать в суде?",
        a: "Если вы выдаёте нам доверенность, ваше присутствие в суде не обязательно. Мы представляем ваши интересы полностью. Однако в некоторых категориях дел (например, семейные споры о детях) присутствие клиента желательно."
      },
      {
        q: "Как часто вы будете информировать меня о ходе дела?",
        a: "Мы информируем клиента после каждого значимого события: судебное заседание, получение определений, изменения в деле. Также вы можете связаться с нами в любое время для получения информации."
      },
      {
        q: "Что делать, если решение суда не в мою пользу?",
        a: "Решение можно обжаловать в апелляционной или кассационной инстанции. Мы проанализируем решение, выявим ошибки суда и подготовим мотивированную жалобу."
      },
      {
        q: "Могу ли я отказаться от ваших услуг в процессе?",
        a: "Да, вы можете расторгнуть договор в любой момент. При этом оплачиваются только фактически оказанные услуги согласно акту выполненных работ."
      }
    ]
  },
  {
    category: "Конфиденциальность",
    questions: [
      {
        q: "Гарантируется ли конфиденциальность?",
        a: "Да, адвокатская тайна — наша профессиональная обязанность, закреплённая законом. Вся информация, которую вы нам сообщите, строго конфиденциальна и не может быть разглашена без вашего согласия."
      },
      {
        q: "Могут ли адвокаты быть допрошены по моему делу?",
        a: "Нет, адвокат не может быть допрошен в качестве свидетеля об обстоятельствах, ставших ему известными в связи с обращением за юридической помощью. Это гарантия адвокатской тайны."
      }
    ]
  }
];

const FAQ = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Часто задаваемые вопросы — Профзащита</title>
        <meta name="description" content="Ответы на популярные вопросы о работе коллегии адвокатов Профзащита: консультации, стоимость, процесс работы, гарантии." />
      </Helmet>
      
      <Header />
      
      <main className="flex-1">
        {/* Hero */}
        <section className="relative bg-gradient-to-br from-primary to-primary/90 text-primary-foreground py-16 overflow-hidden">
          {/* Professional Legal Background Photo */}
          <div className="absolute inset-0 opacity-10">
            <img 
              src={legalBg1} 
              alt="" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <Breadcrumbs items={[{ label: "Вопросы и ответы" }]} />
            <div className="max-w-3xl mt-6">
              <div className="flex items-center gap-3 mb-4">
                <HelpCircle className="h-10 w-10 text-accent" />
                <h1 className="font-playfair text-4xl md:text-5xl font-bold">
                  Вопросы и ответы
                </h1>
              </div>
              <p className="text-lg text-primary-foreground/80">
                Здесь собраны ответы на самые частые вопросы о работе нашей коллегии
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Content */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* FAQ List */}
              <div className="lg:col-span-2 space-y-8">
                {faqCategories.map((category, catIndex) => (
                  <div key={catIndex}>
                    <h2 className="font-playfair text-2xl font-bold mb-6">
                      {category.category}
                    </h2>
                    <Accordion type="single" collapsible className="space-y-4">
                      {category.questions.map((faq, faqIndex) => (
                        <AccordionItem 
                          key={faqIndex} 
                          value={`${catIndex}-${faqIndex}`}
                          className="border border-border rounded-lg px-6 bg-card"
                        >
                          <AccordionTrigger className="hover:text-accent hover:no-underline text-left">
                            <span className="font-semibold">{faq.q}</span>
                          </AccordionTrigger>
                          <AccordionContent className="text-muted-foreground pt-4">
                            {faq.a}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                ))}

                {/* CTA */}
                <div className="bg-muted/50 rounded-lg p-8 mt-12">
                  <h3 className="font-playfair text-xl font-bold mb-2">
                    Не нашли ответ на свой вопрос?
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Свяжитесь с нами, и мы ответим на все ваши вопросы в индивидуальном порядке
                  </p>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:sticky lg:top-24 h-fit space-y-6">
                <div className="bg-card border border-border rounded-lg p-6">
                  <h3 className="font-semibold text-lg mb-4">Задать вопрос</h3>
                  <LeadForm variant="compact" />
                </div>

                <div className="bg-muted/50 rounded-lg p-6">
                  <h3 className="font-semibold text-lg mb-4">Контакты</h3>
                  <div className="space-y-3 text-sm">
                    <p>
                      <strong>Телефон:</strong><br />
                      <a href="tel:+79999999999" className="text-accent hover:underline">
                        +7 999 999 99 99
                      </a>
                    </p>
                    <p>
                      <strong>Email:</strong><br />
                      <a href="mailto:profzashchita@internet.ru" className="text-accent hover:underline">
                        profzashchita@internet.ru
                      </a>
                    </p>
                    <p>
                      <strong>Адрес:</strong><br />
                      Москва
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default FAQ;
