import sotnikovImg from "@/assets/team/sotnikov.jpg";
import ryzhenkoImg from "@/assets/team/ryzhenko.jpg";
import vaskovskyImg from "@/assets/team/vaskovsky.jpg";
import kalabekovImg from "@/assets/team/kalabekov.jpg";

export interface TeamMember {
  name: string;
  slug: string;
  headline?: string;
  leadText?: string;
  seoTitle?: string;
  seoDescription?: string;
  affiliation?: string;
  role: string;
  experienceText?: string;
  specializations: string[];
  about: string;
  competencies?: string[];
  practice?: string[];
  photo?: string;
  phone?: string;
  email?: string;
  cases?: { title: string; result?: string }[];
  education?: string[];
  publications?: { title: string; url?: string }[];
  city?: string;
  reesterNumber?: string;
  languages?: string[];
  shortBio?: string;
  statusText?: string;
  specializationGroups?: { title: string; items: string[] }[];
  achievements?: {
    title: string;
    org?: string;
    date?: string;
    previewImage?: string;
    fileUrl?: string;
    type?: "pdf" | "image";
    rotation?: number;
  }[];
}

export const teamMembers: TeamMember[] = [
  {
    name: "Лютиков Иван Иванович",
    slug: "lyutikov",
    role: "Председатель коллегии",
    experienceText: "Стаж 26 лет",
    specializations: [
      "Уголовное право. Профессиональная защита по уголовным делам общеуголовной и экономической направленности",
      "Арбитражное право. Арбитражные споры и корпоративные конфликты. Банкротство и субсидиарная ответственность",
      "Административное судопроизводство. Обжалование в судебном порядке действия или бездействия должностных лиц государственных и муниципальных органов",
      "Гражданское право. Семейные, трудовые, банковские и кредитные споры"
    ],
    about: "Председатель коллегии адвокатов «ПрофЗащита» – Адвокат Иван Лютиков является членом Адвокатской палаты города Москвы, имеющий регистрационный № 77/17732 в Едином государственном реестре адвокатов, с юридическим стажем более 26 лет.\n\nТак адвокат Иван Лютиков занимается успешной адвокатской деятельностью в городе Москве более 8 лет, по специализации уголовного, арбитражного, гражданского и административного права. За время своей деятельности имеет более 170 выигранных дел.\n\nКроме того, Иван Лютиков имеет 18 лет стажа работы в следственных органах, является заслуженным пенсионером Главного следственного управления ГУ МВД России со специальным званием подполковник юстиции, начальником Следственного отдела в отставке, ветеран труда.\n\nАдвокат Иван Лютиков является профессионалом своего дела, хорошо знает правоохранительную и судебную систему изнутри, в связи с чем основываясь на следственной и судебной практике находит оптимальные пути защиты своих доверителей. Представляет защиту и юридическую помощь на стадии доследственной проверки, предварительного следствия и дознания, в судах: первой, апелляционной и кассационной судебной инстанции.\n\nВсегда профессиональный и индивидуальный подход к каждому делу, дорожит своей репутацией и работает только на результат. Отличный и грамотный руководитель.",
    competencies: [
      "Оперативная защита в резонансных уголовных делах и экономических составах",
      "Вывод активов из-под ареста и сопровождение финансовых расследований",
      "Антикризисное сопровождение бизнеса и защита собственников"
    ],
    practice: [
      "Уголовные дела экономической направленности",
      "Корпоративные споры и защита долей",
      "Банкротство и субсидиарная ответственность"
    ],
    photo: "/images/team/lyutikov-ivan.jpg",
    phone: "+7 (495) 004-01-96",
    email: "profzashchita@internet.ru",
    cases: [
      { title: "Отмена ареста активов компании на стадии следствия", result: "Сохранены оборотные средства и оборудование" },
      { title: "Оспаривание предъявленного обвинения по экономической статье", result: "Дело прекращено за отсутствием состава преступления" },
      { title: "Защита собственника в корпоративном споре", result: "Отменён запрет на сделки и разблокированы счета" }
    ],
    education: [
      "АССШМ МВД России",
      "Волгоградская академия МВД России",
      "Курсы повышения квалификации в Федеральной палате адвокатов России"
    ],
    publications: [],
    achievements: [
      {
        title: "Особенности организации производства судебных технико-криминалистических экспертиз документов. Экспертиза давности документа и её виды.",
        org: "НП «Саморегулируемая организация судебных экспертов»",
        date: "26.11.2025 · 3 академических часа",
        previewImage: "/certificates/files/lyutikov-qualification-2025.jpg",
        fileUrl: "/certificates/files/lyutikov-qualification-2025.jpg",
        type: "image"
      },
      {
        title: "Сертификат ФПА РФ: вебинары 20.01.2026",
        org: "Федеральная палата адвокатов Российской Федерации",
        date: "20.01.2026 · 6 часов",
        previewImage: "/certs/lyutikov/fpa-webinar-2026-01-20.jpg",
        fileUrl: "/certs/lyutikov/fpa-webinar-2026-01-20.jpg",
        type: "image"
      },
      {
        title: "Удостоверение адвоката",
        previewImage: "/certificates/files/lyutikov-advocate-id.jpg",
        fileUrl: "/certificates/files/lyutikov-advocate-id.jpg",
        type: "image"
      },
      {
        title: "Удостоверение МВД (служебное)",
        previewImage: "/certificates/files/lyutikov-id-mvd.jpg",
        fileUrl: "/certificates/files/lyutikov-id-mvd.jpg",
        type: "image"
      },
      {
        title: "Сертификат ФПА РФ: вебинары 20.01.2026 (PDF)",
        previewImage: "/certificates/files/lyutikov-fpa-vebinary-2026-01-20.jpg",
        fileUrl: "/certificates/files/sertifikat-fpa-lyutikov-vebinary-2026-01-20.pdf",
        type: "pdf"
      }
    ],
    languages: ["Русский", "Английский"]
  },
  {
    name: "Рыженко Дмитрий Петрович",
    slug: "ryzhenko",
    role: "Юрист, помощник председателя коллегии",
    experienceText: "Стаж 23 года",
    specializations: [
      "Корпоративные споры",
      "Наследственные споры",
      "Имущественные споры",
      "Договорное право",
      "Жилищные споры",
      "Банкротство физических и юридических лиц"
    ],
    about: "Глубоко погружается в документы и финансовые модели, чтобы построить доказательную базу и удержать позицию клиента в суде и на переговорах. Сильная сторона — комбинирование претензионной работы с медиативными техниками, что позволяет снижать риски и издержки.\n\nСопровождает сделки, готовит претензии и иски, выстраивает стратегию взыскания и удержания активов.",
    competencies: [
      "Аудит договоров и построение стратегии претензионной работы",
      "Ведение переговоров и медиации по коммерческим спорам",
      "Взыскание задолженностей и обеспечение исполнения решений суда"
    ],
    practice: [
      "Гражданские и договорные споры",
      "Коммерческие переговоры и медиация",
      "Взыскание долгов и убытков"
    ],
    photo: ryzhenkoImg,
    phone: "+7 (495) 004-01-96",
    email: "profzashchita@internet.ru",
    cases: [
      { title: "Взыскание долга по сложному контракту", result: "Взыскано более 45 млн руб. с контрагента" },
      { title: "Оспаривание штрафных санкций", result: "Снижение неустойки на 70%" },
      { title: "Переговоры по реструктуризации задолженности", result: "Заключено мировое соглашение с выгодным графиком платежей" }
    ],
    education: [
      "ЛГУВД имени Э.А. Дидоренко"
    ],
    publications: [],
    languages: ["Русский", "Английский"]
  },
  {
    name: "Сотников Дмитрий Валерьевич",
    slug: "sotnikov",
    role: "Адвокат",
    experienceText: "Стаж 15 лет",
    specializations: [
      "Уголовные дела экономической направленности",
      "Медиация и досудебные переговоры",
      "Имущественные споры"
    ],
    about: "Работает на стыке уголовного и гражданского права: строит линию защиты, одновременно готовя почву для переговоров и снижения рисков. Ведёт дела с большим объёмом финансовых документов, организует аналитическую работу команды.\n\nСосредоточен на деэскалации конфликтов: помогает клиентам выходить из кризисных ситуаций без репутационных потерь.",
    competencies: [
      "Сбор и анализ доказательств по финансовым эпизодам",
      "Переговоры с оппонентами и правоохранительными органами",
      "Сопровождение имущественных и корпоративных конфликтов"
    ],
    practice: [
      "Уголовные дела с экономическим блоком",
      "Корпоративные и имущественные споры",
      "Досудебные соглашения и медиация"
    ],
    photo: sotnikovImg,
    phone: "+7 (495) 004-01-96",
    email: "profzashchita@internet.ru",
    cases: [
      { title: "Смягчение квалификации уголовного дела с экономической статьёй", result: "Назначен условный срок без лишения свободы" },
      { title: "Медиация в корпоративном конфликте", result: "Заключено мировое соглашение, бизнес продолжил работу" },
      { title: "Взыскание ущерба с недобросовестного контрагента", result: "Возмещено 12 млн руб. убытков" }
    ],
    education: [
      "Российская правовая академия Минюста РФ",
      "Научно-методический центр медиации и права — повышение квалификации ‘Медиация: базовый курс’ (Москва, 2011)",
      "Российская правовая академия Минюста РФ — повышение квалификации (Москва, 2013)"
    ],
    achievements: [
      {
        title: "Удостоверение о повышении квалификации (2011)",
        previewImage: "/certificates/files/sotnikov-qualification-2011.jpg",
        fileUrl: "/certificates/files/sotnikov-qualification-2011.jpg",
        type: "image"
      },
      {
        title: "Сертификат ФПА РФ: вебинары 20.01.2026",
        org: "Федеральная палата адвокатов Российской Федерации",
        date: "20.01.2026 · 6 часов",
        previewImage: "/certs/sotnikov/fpa-webinar-2026-01-20.jpg",
        fileUrl: "/certs/sotnikov/fpa-webinar-2026-01-20.jpg",
        type: "image"
      },
      {
        title: "Удостоверение о повышении квалификации (2013)",
        previewImage: "/certificates/files/sotnikov-qualification-2013.jpg",
        fileUrl: "/certificates/files/sotnikov-qualification-2013.jpg",
        type: "image"
      },
      {
        title: "Сертификат о повышении квалификации (2016)",
        previewImage: "/certificates/files/sotnikov-certificate-2016.jpg",
        fileUrl: "/certificates/files/sotnikov-certificate-2016.jpg",
        type: "image"
      },
      {
        title: "Удостоверение о повышении квалификации (2019)",
        previewImage: "/certificates/files/sotnikov-qualification-2019.jpg",
        fileUrl: "/certificates/files/sotnikov-qualification-2019.jpg",
        type: "image"
      },
      {
        title: "Удостоверение о повышении квалификации (2023) №1",
        previewImage: "/certificates/files/sotnikov-qualification-2023-01.jpg",
        fileUrl: "/certificates/files/sotnikov-qualification-2023-01.jpg",
        type: "image"
      },
      {
        title: "Удостоверение о повышении квалификации (2023) №2",
        previewImage: "/certificates/files/sotnikov-qualification-2023-02.jpg",
        fileUrl: "/certificates/files/sotnikov-qualification-2023-02.jpg",
        type: "image"
      },
      {
        title: "Удостоверение о повышении квалификации (2023) №3",
        previewImage: "/certificates/files/sotnikov-qualification-2023-03.jpg",
        fileUrl: "/certificates/files/sotnikov-qualification-2023-03.jpg",
        type: "image"
      },
      {
        title: "Удостоверение о повышении квалификации (2023) №4",
        previewImage: "/certificates/files/sotnikov-qualification-2023-04.jpg",
        fileUrl: "/certificates/files/sotnikov-qualification-2023-04.jpg",
        type: "image"
      },
      {
        title: "Удостоверение о повышении квалификации (2024) №1",
        previewImage: "/certificates/files/sotnikov-qualification-2024-01.jpg",
        fileUrl: "/certificates/files/sotnikov-qualification-2024-01.jpg",
        type: "image"
      },
      {
        title: "Удостоверение о повышении квалификации (2024) №2",
        previewImage: "/certificates/files/sotnikov-qualification-2024-02.jpg",
        fileUrl: "/certificates/files/sotnikov-qualification-2024-02.jpg",
        type: "image"
      },
      {
        title: "Удостоверение о повышении квалификации (2024) №3",
        previewImage: "/certificates/files/sotnikov-qualification-2024-03.jpg",
        fileUrl: "/certificates/files/sotnikov-qualification-2024-03.jpg",
        type: "image"
      },
      {
        title: "Удостоверение о повышении квалификации (2024) №4",
        previewImage: "/certificates/files/sotnikov-qualification-2024-04.jpg",
        fileUrl: "/certificates/files/sotnikov-qualification-2024-04.jpg",
        type: "image"
      },
      {
        title: "Удостоверение о повышении квалификации (2024) №5",
        previewImage: "/certificates/files/sotnikov-qualification-2024-05.jpg",
        fileUrl: "/certificates/files/sotnikov-qualification-2024-05.jpg",
        type: "image"
      },
      {
        title: "Удостоверение о повышении квалификации (2025) №1",
        previewImage: "/certificates/files/sotnikov-qualification-2025-01.jpg",
        fileUrl: "/certificates/files/sotnikov-qualification-2025-01.jpg",
        type: "image"
      },
      {
        title: "Удостоверение о повышении квалификации (2025) №2",
        previewImage: "/certificates/files/sotnikov-qualification-2025-02.jpg",
        fileUrl: "/certificates/files/sotnikov-qualification-2025-02.jpg",
        type: "image"
      },
      {
        title: "Удостоверение о повышении квалификации (2025) №3",
        previewImage: "/certificates/files/sotnikov-qualification-2025-03.jpg",
        fileUrl: "/certificates/files/sotnikov-qualification-2025-03.jpg",
        type: "image"
      },
      {
        title: "Удостоверение о повышении квалификации (2025) №4",
        previewImage: "/certificates/files/sotnikov-qualification-2025-04.jpg",
        fileUrl: "/certificates/files/sotnikov-qualification-2025-04.jpg",
        type: "image"
      }
    ],
    languages: ["Русский"]
  },
  {
    name: "Васьковский Михаил Михайлович",
    slug: "vaskovsky",
    role: "Адвокат",
    experienceText: "Стаж — более 15 лет",
    specializations: [
      "Семейные и наследственные споры",
      "Административные дела",
      "Страховые споры"
    ],
    specializationGroups: [
      {
        title: "Семейное право",
        items: [
          "расторжение брака",
          "взыскание алиментов",
          "определение порядка общения с детьми (ребенком)",
          "определение места жительства ребенка",
          "установление факта отцовства",
          "раздел совместно нажитого имущества",
          "взыскание неустойки за неуплату алиментов",
          "исполнительное производство (взыскание долга за неуплату алиментов)"
        ]
      },
      {
        title: "Административное право",
        items: [
          "дела об административных правонарушениях",
          "оспаривание административных штрафов",
          "установление вины при ДТП"
        ]
      },
      {
        title: "Страховое право",
        items: [
          "споры со страховыми компаниями",
          "взыскание страхового возмещения"
        ]
      },
      {
        title: "Иные вопросы",
        items: [
          "взыскание неустойки по ДДУ",
          "взыскание долговых обязательств (долговые расписки и т.д.)",
          "исполнительное производство",
          "споры в рамках закона «О защите прав потребителей»",
          "участие в процедурах банкротства"
        ]
      }
    ],
    about: "Работает с конфликтами, где важна доказательная база и чувствительный контекст: семейные споры, наследство, отношения с государственными органами и страховыми. Выстраивает стратегию так, чтобы сохранить баланс интересов и избежать эскалации.\n\nВедёт переговоры, готовит документы, сопровождает клиента в судах и на внесудебных этапах.",
    competencies: [
      "Разрешение семейных и наследственных конфликтов",
      "Оспаривание решений госорганов и страховых компаний",
      "Подготовка процессуальных документов и представительство в суде"
    ],
    practice: [
      "Семейные споры и раздел имущества",
      "Наследственные дела",
      "Административные и страховые споры"
    ],
    photo: vaskovskyImg,
    phone: "+7 (495) 004-01-96",
    email: "profzashchita@internet.ru",
    cases: [
      { title: "Раздел имущества супругов с иностранными активами", result: "Достигнут паритетный раздел и защита интересов детей" },
      { title: "Оспаривание отказа страховой", result: "Взыскано страховое возмещение и неустойка" },
      { title: "Снятие административного штрафа", result: "Отмена постановления и закрытие производства" }
    ],
    education: [
      "Южный федеральный университет."
    ],
    achievements: [
      {
        title: "Сертификат о повышении квалификации",
        previewImage: "/certs/previews/vaskovskiy-certificate.jpg",
        fileUrl: "/certs/vaskovskiy-certificate.pdf",
        type: "pdf"
      },
      {
        title: "Сертификат о повышении квалификации №1",
        previewImage: "/certs/vaskovsky/certificate-0.jpg",
        fileUrl: "/certs/vaskovsky/certificate-0.pdf",
        type: "pdf"
      },
      {
        title: "Сертификат о повышении квалификации №2",
        previewImage: "/certs/vaskovsky/certificate-1.jpg",
        fileUrl: "/certs/vaskovsky/certificate-1.pdf",
        type: "pdf"
      },
      {
        title: "Сертификат о повышении квалификации №3",
        previewImage: "/certs/vaskovsky/certificate-2.jpg",
        fileUrl: "/certs/vaskovsky/certificate-2.pdf",
        type: "pdf"
      },
      {
        title: "Сертификат о повышении квалификации №4",
        previewImage: "/certs/vaskovsky/certificate-3.jpg",
        fileUrl: "/certs/vaskovsky/certificate-3.pdf",
        type: "pdf"
      },
      {
        title: "Сертификат о повышении квалификации №5",
        previewImage: "/certs/vaskovsky/certificate-4.jpg",
        fileUrl: "/certs/vaskovsky/certificate-4.pdf",
        type: "pdf"
      }
    ],
    languages: ["Русский", "Английский"]
  },
  {
    name: "Калабеков Эльдар Султан-Муратович",
    slug: "kalabekov",
    role: "Адвокат",
    experienceText: "Стаж 8 лет",
    specializations: [
      "Защита прав потребителей",
      "Взыскание ущерба, долгов",
      "Семейные споры",
      "Страховые дела",
      "Имущественные споры"
    ],
    about: "Сфокусирован на защите потребителей и семейных вопросах: от возврата средств до сопровождения наследственных дел. Внимателен к деталям договоров и коммуникации с контрагентами, помогает клиентам быстро вернуть деньги и закрыть конфликт.\n\nРаботает с доказательствами, готовит претензии, сопровождает в суде и контролирует исполнение решений.",
    competencies: [
      "Возврат средств за товары и услуги, защита по ЗоЗПП",
      "Раздел имущества и урегулирование семейных споров",
      "Подготовка исков и претензий, сопровождение в суде"
    ],
    practice: [
      "Права потребителей",
      "Семейные и наследственные споры",
      "Обязательственное право и взыскания"
    ],
    photo: kalabekovImg,
    phone: "+7 (495) 004-01-96",
    email: "profzashchita@internet.ru",
    cases: [
      { title: "Возврат средств за некачественные услуги", result: "Взыскана полная стоимость и штраф" },
      { title: "Наследственный спор между родственниками", result: "Достигнут судебный порядок раздела имущества" },
      { title: "Признание договора недействительным", result: "Деньги возвращены клиенту, обязательства прекращены" }
    ],
    education: [
      "РГУ нефти и газа (НИУ) им. И.М. Губкина, юридический факультет",
      "Практический курс по защите прав потребителей",
      "Международный институт экономики и права"
    ],
    publications: [],
    languages: ["Русский", "Английский", "Турецкий"]
  },
  {
    name: "Лядова Юлия Сергеевна",
    slug: "yulia-lyadova",
    headline: "Адвокат Лядова Юлия Сергеевна",
    seoTitle: "Адвокат Лядова Юлия Сергеевна — Профзащита",
    seoDescription:
      "Адвокат Лядова Юлия Сергеевна — 18 лет практики. Договорные и имущественные споры, семейные дела, интеллектуальная собственность. Консультация в Москве.",
    role: "Адвокат",
    affiliation: "Член Ассоциации юристов России",
    experienceText: "Стаж — 18 лет",
    specializations: [
      "Договорные и имущественные споры",
      "Семейные споры",
      "Интеллектуальная собственность"
    ],
    about:
      "Сопровождает договорные и имущественные споры, помогает урегулировать семейные конфликты и защищает интересы клиентов в вопросах интеллектуальной собственности. В работе делает акцент на точной правовой позиции, сборе доказательств и понятной стратегии для клиента.\n\nВедёт дела на досудебной стадии и в суде, готовит процессуальные документы, участвует в переговорах и добивается исполнения решений.",
    competencies: [
      "Экспертиза договоров и защита интересов в спорах",
      "Сопровождение семейных дел и раздел имущества",
      "Регистрация и защита прав на объекты интеллектуальной собственности"
    ],
    practice: [
      "Договорные и имущественные споры",
      "Семейные споры",
      "Интеллектуальная собственность"
    ],
    photo: "/images/team/lyadova-yuliya.jpg",
    education: [
      "Вологодский государственный университет",
      "Legal Academy — \"Право интеллектуальной собственности\" (38 акад. часов), Санкт-Петербург, 2024",
      "4Legal Global — \"Механизм защиты от злоупотреблений второго супруга при разделе бизнеса\" и \"Уголовно-правовые аспекты семейных споров\" (2-дневный мастер-класс), Москва, 2024",
      "Лексториум — \"Актуальные проблемы субсидиарной ответственности лиц, контролирующих должника\" (60 акад. часов), Москва, 2021",
      "Лексториум — \"Сделки и банкротство: искусство нападать и защищаться\" (32 акад. часа), Москва, 2019"
    ],
    achievements: [
      {
        title: "Право интеллектуальной собственности (Legal Academy, 2024)",
        org: "Legal Academy",
        date: "19.09.2024",
        previewImage: "/certs/lyadova/legal-academy-2024.jpg",
        fileUrl: "/certs/lyadova/legal-academy-2024.pdf",
        type: "pdf"
      },
      {
        title: "Субсидиарная ответственность контролирующих лиц (Лексториум, 2021)",
        org: "Лексториум",
        previewImage: "/certificates/previews/lyadova-lektorium-subsidiary.jpg",
        fileUrl: "/certificates/files/lyadova-lektorium-subsidiary.pdf",
        type: "pdf"
      },
      {
        title: "Сделки в банкротстве (Лексториум, 2019)",
        previewImage: "/certificates/previews/lyadova-qualification-deals.jpg",
        fileUrl: "/certificates/files/lyadova-qualification-deals.pdf",
        type: "pdf"
      },
      {
        title: "Семейные споры (4Legal Global, 2024)",
        org: "4Legal Global",
        date: "7–8 февраля 2024",
        previewImage: "/certificates/previews/lyadova-criminal-family-aspects.png",
        fileUrl: "/certificates/files/lyadova-criminal-family-aspects.png",
        type: "image"
      },
      {
        title: "Жилищно-правовые споры (ФПА, 2024)",
        previewImage: "/certificates/files/lyadova-cert-1.jpg",
        fileUrl: "/certificates/files/Жилищно-правовые споры (ФПА, 2024).pdf",
        type: "pdf"
      },
      {
        title: "Медиация семейных споров (ФПА, 2025)",
        previewImage: "/certificates/files/lyadova-cert-2.jpg",
        fileUrl: "/certificates/files/Медиация_семейных_споров_ФПА,_2025.pdf",
        type: "pdf"
      },
      {
        title: "Споры о детях и раздел имущества супругов (ФПА, 2024)",
        previewImage: "/certificates/files/lyadova-cert-3.jpg",
        fileUrl: "/certificates/files/Споры_о_детях_и_раздел_имущества_супругов_ФПА,_2024.pdf",
        type: "pdf"
      },
      {
        title: "Способы защиты прав собственности (ФПА, 2025)",
        previewImage: "/certificates/files/lyadova-cert-4.jpg",
        fileUrl: "/certificates/files/Способы_защиты_прав_собственности_ФПА,_2025.pdf",
        type: "pdf"
      },
      {
        title: "Судебная экспертиза детско-родительских отношений (ФПА, 2024)",
        previewImage: "/certificates/files/lyadova-cert-5.jpg",
        fileUrl: "/certificates/files/Судебная_экспертиза_детско_родительских_отношений_ФПА,_2024.pdf",
        type: "pdf"
      },
      {
        title: "Юридическая помощь по семейным делам (ФПА, 2025)",
        previewImage: "/certificates/files/lyadova-cert-6.jpg",
        fileUrl: "/certificates/files/Юридическая_помощь_по_семейным_делам_ФПА,_2025.pdf",
        type: "pdf"
      }
    ]
  }
];

export const getTeamMemberBySlug = (slug: string) =>
  teamMembers.find((member) => member.slug === slug);
