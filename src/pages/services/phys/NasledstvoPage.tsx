import { Link } from "react-router-dom";
import ServiceTemplate from "@/components/ServiceTemplate";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SITE } from "@/config/site";
import { cases as casesData } from "@/data/cases";
import { teamMembers } from "@/data/team";

const NasledstvoPage = () => {
  const inheritanceCases = casesData.filter((item) => {
    const haystack = `${item.category} ${item.title} ${item.slug ?? ""} ${item.task ?? ""} ${item.actions ?? ""} ${item.result ?? ""}`.toLowerCase();
    return /наслед|завещ|обязательн|vstupl|nasled|zavesh/.test(haystack);
  });
  const shouldShowCases = inheritanceCases.length > 0;

  const inheritanceTeam = teamMembers.filter((member) => {
    const fields = [
      ...(member.specializations ?? []),
      ...(member.practice ?? []),
      ...(member.competencies ?? []),
      member.about ?? ""
    ]
      .join(" ")
      .toLowerCase();
    return /наслед/.test(fields);
  });
  const featuredTeam = inheritanceTeam.slice(0, 3);
  const teamGridClass =
    featuredTeam.length === 2
      ? "grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto"
      : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6";

  return (
    <ServiceTemplate
      title="Наследственные споры — помощь юриста в Москве"
      metaDescription="Юридическая помощь в наследственных делах: оформление наследства, оспаривание завещания, восстановление сроков, раздел наследства. Опыт 15+ лет."
      canonical={`${SITE.url}/services/phys/nasledstvo`}
      breadcrumbLabel="Наследство"
      h1="Наследственные споры"
      leadParagraph="Помогаем оформить наследство, защитить право на обязательную долю, оспорить незаконное завещание и разделить наследственное имущество между наследниками."
      whenToContact={[
        "Нужно вступить в наследство или восстановить пропущенный срок",
        "Необходимо оспорить завещание или доказать недействительность сделок наследодателя",
        "Вы имеете право на обязательную долю, но вас не включили в наследство",
        "Возникли споры между наследниками о разделе имущества",
        "Нотариус отказывает в выдаче свидетельства о праве на наследство",
        "Нужно признать наследника недостойным или отстранить от наследства"
      ]}
      whatWeDo={[
        "Консультируем по порядку наследования, срокам и правам наследников",
        "Помогаем собрать документы и оформить наследство у нотариуса",
        "Восстанавливаем пропущенный срок принятия наследства через суд",
        "Оспариваем завещания, договоры дарения и другие сделки наследодателя",
        "Добиваемся выделения обязательной доли и признания недостойных наследников",
        "Представляем интересы в спорах о разделе наследственного имущества"
      ]}
      steps={[
        {
          number: 1,
          title: "Первичная консультация",
          description: "Выясняем круг наследников, состав наследственного имущества, наличие завещания, оцениваем ваши шансы и возможные риски."
        },
        {
          number: 2,
          title: "Сбор документов",
          description: "Запрашиваем свидетельства о смерти, рождении, браке, выписки ЕГРН, банковские справки, ищем завещание, собираем доказательства родства."
        },
        {
          number: 3,
          title: "Обращение к нотариусу или в суд",
          description: "Подаём заявление о принятии наследства нотариусу либо иск в суд (о восстановлении срока, признании права, оспаривании завещания)."
        },
        {
          number: 4,
          title: "Судебное разбирательство (при необходимости)",
          description: "Участвуем в заседаниях, представляем доказательства родства или недостойности других наследников, оспариваем незаконные сделки."
        },
        {
          number: 5,
          title: "Получение свидетельства и раздел имущества",
          description: "Получаем свидетельство о праве на наследство, помогаем переоформить имущество на ваше имя, делим наследство между наследниками."
        }
      ]}
      documentsAndTiming="Нужны: свидетельство о смерти, документы о родстве (свидетельства о рождении, браке), паспорт, правоустанавливающие документы на имущество, справки о месте жительства наследодателя. Сроки: принятие наследства — 6 месяцев со дня смерти; рассмотрение иска о восстановлении срока или оспаривании завещания — от 2 до 6 месяцев."
      faqs={[
        {
          question: "Что делать, если пропущен срок вступления в наследство?",
          answer: "Срок можно восстановить через суд, если пропуск произошёл по уважительной причине (тяжёлая болезнь, незнание о смерти наследодателя, длительная командировка). Нужно обратиться в суд в течение 6 месяцев после того, как причины пропуска отпали. Если другие наследники согласны включить вас — можно оформить у нотариуса без суда."
        },
        {
          question: "Можно ли оспорить завещание?",
          answer: "Да, если докажете, что завещание составлено под влиянием обмана, угрозы, насилия, или наследодатель не понимал значения своих действий (например, из-за психического расстройства). Для этого чаще всего назначается посмертная психиатрическая экспертиза. Также завещание оспаривается по формальным нарушениям (неправильное удостоверение, отсутствие свидетелей)."
        },
        {
          question: "Кто имеет право на обязательную долю в наследстве?",
          answer: "Несовершеннолетние или нетрудоспособные дети наследодателя, нетрудоспособные супруг и родители, а также нетрудоспособные иждивенцы. Обязательная доля составляет не менее половины от того, что они получили бы при наследовании по закону, даже если завещание исключает их из числа наследников."
        },
        {
          question: "Как делится наследство между наследниками?",
          answer: "Если нет завещания, наследство делится по закону: наследники первой очереди (дети, супруг, родители) получают равные доли. При наличии завещания — в соответствии с волей наследодателя, но с учётом обязательной доли. Раздел конкретных вещей (квартира, дача, автомобиль) происходит по соглашению или через суд."
        },
        {
          question: "Можно ли отказаться от наследства?",
          answer: "Да, в течение 6 месяцев можно подать нотариусу заявление об отказе. Отказ можно сделать в пользу других наследников или без указания лиц. После принятия наследства отказаться уже нельзя. Учтите: вместе с имуществом наследуются и долги наследодателя."
        }
      ]}
      relatedLinks={[
        { title: "Жилищные споры", url: "/services/phys/zhilishchnye-spory" },
        { title: "Расторжение брака и раздел имущества", url: "/services/phys/razvod-razdel-imushchestva" }
      ]}
      extraSections={
        <>
          {featuredTeam.length > 0 && (
            <div>
              <h2 className="font-serif font-bold mb-6">Кто ведёт наследственные дела</h2>
              <p className="text-muted-foreground mb-6">
                Вашим делом занимаются практикующие адвокаты с опытом в наследственных спорах
              </p>
              <div className={teamGridClass}>
                {featuredTeam.map((member) => (
                  <Card
                    key={member.slug}
                    className="h-full rounded-[12px] border border-[#C9A227] bg-white shadow-[0_8px_20px_rgba(60,52,31,0.08)]"
                  >
                    <CardContent className="p-6 h-full flex flex-col items-center text-center">
                      <div className="flex w-full flex-col items-center text-center gap-4">
                        <div className="w-full overflow-hidden rounded-[10px] border border-[#E6DDCC] bg-white">
                          <img
                            src={member.photo}
                            alt={member.name}
                            className="h-[320px] w-full object-cover object-center md:h-[340px] lg:h-[360px]"
                            loading="lazy"
                          />
                        </div>
                        <h3 className="font-semibold text-[16px] md:text-[18px] text-slate-900">
                          {member.name}
                        </h3>
                        <span className="inline-flex items-center rounded-full bg-[#C9A227] px-4 py-1 text-[12px] font-semibold text-slate-900">
                          {member.role}
                        </span>
                        {member.experienceText && (
                          <div className="text-[13px] font-semibold text-slate-800">{member.experienceText}</div>
                        )}
                        {member.specializations && member.specializations.length > 0 && (
                          <div className="w-full">
                            <div className="text-[12px] font-semibold text-slate-700">Специализации:</div>
                            <ul className="mt-2 space-y-1 text-[13px] text-slate-700 list-disc list-inside text-center">
                              {member.specializations.map((item) => (
                                <li key={item}>{item}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {member.about && (
                          <div className="text-[13px] text-slate-600 leading-relaxed space-y-2">
                            {member.about.split("\n\n").map((paragraph, index) => (
                              <p key={`${member.slug}-about-${index}`}>{paragraph}</p>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="mt-auto w-full pt-5 flex justify-center">
                        <Button
                          asChild
                          size="lg"
                          className="w-full md:w-auto h-12 rounded-[12px] border border-[#b8911f] bg-[#C9A227] text-[14px] text-slate-900 shadow-[0_6px_14px_rgba(111,83,15,0.25)] hover:border-[#a8831a] hover:bg-[#b8911f] hover:shadow-[0_4px_12px_rgba(111,83,15,0.2)]"
                        >
                          <Link to={`/team/${member.slug}`}>Подробнее об адвокате</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {shouldShowCases && (
            <div>
              <h2 className="font-serif font-bold mb-6">Кейсы</h2>
              <p className="text-muted-foreground mb-6">
                Мы не раскрываем персональные данные клиентов — примеры основаны на реальных делах
              </p>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {inheritanceCases.map((caseItem) => {
                  const decisionPreview = caseItem.decisionPreview ?? caseItem.documents?.[0];
                  const hasDecision = Boolean(decisionPreview);
                  return (
                    <Card
                      key={caseItem.slug ?? caseItem.title}
                      className="h-full border border-slate-200 bg-white shadow-[0_10px_25px_rgba(15,23,42,0.06)] transition-all hover:border-[#C9A227] hover:shadow-[0_16px_40px_rgba(201,162,39,0.18)]"
                    >
                      <CardContent className="pt-6 h-full">
                        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-8">
                          <div className="flex-1">
                            <h3 className="font-semibold text-body-mobile md:text-body text-slate-900">
                              {caseItem.title}
                            </h3>
                            <div className="mt-4 space-y-3 text-small text-muted-foreground leading-relaxed">
                              <div>
                                <span className="font-semibold text-foreground">Задача: </span>
                                {caseItem.task}
                              </div>
                              <div>
                                <span className="font-semibold text-foreground">Что сделали: </span>
                                {caseItem.actions}
                              </div>
                              <div>
                                <span className="font-semibold text-foreground">Результат: </span>
                                {caseItem.result}
                              </div>
                            </div>
                            {!hasDecision && (
                              <div className="mt-6">
                                <Button
                                  asChild
                                  size="lg"
                                  variant="outline"
                                  className="h-11 w-full rounded-[12px] border-[#C9A227] text-slate-900 hover:border-[#b8911f] hover:bg-[#F4E7C2]"
                                >
                                  <Link to={`/cases/${caseItem.slug}`}>Подробнее о кейсе</Link>
                                </Button>
                              </div>
                            )}
                          </div>
                          {hasDecision && (
                            <div className="w-full lg:w-[52%] lg:max-w-[600px]">
                              <div className="rounded-[12px] border border-[#E6DDCC] bg-[#F8F4EA] p-4">
                                <div className="text-sm font-semibold text-slate-900">Решение суда</div>
                                <div className="mt-3 rounded-[10px] border border-[#E6DDCC] bg-white p-2">
                                  <img
                                    src={decisionPreview}
                                    alt={`Решение суда: ${caseItem.title}`}
                                    className="max-h-[640px] w-full object-contain"
                                    loading="lazy"
                                  />
                                </div>
                                <div className="mt-4">
                                  <Button
                                    asChild
                                    size="lg"
                                    variant="outline"
                                    className="h-11 w-full rounded-[12px] border-[#C9A227] text-slate-900 hover:border-[#b8911f] hover:bg-[#F4E7C2]"
                                  >
                                    <Link to={`/cases/${caseItem.slug}`}>Подробнее о кейсе</Link>
                                  </Button>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}
        </>
      }
    />
  );
};

export default NasledstvoPage;
