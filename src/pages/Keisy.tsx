import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import legalBg2 from "@/assets/legal-bg-2.jpg";

const Cases = () => {
  const cases = [
    {
      category: "Уголовное право",
      title: "Прекращение уголовного дела по ст. 159 УК РФ",
      task: "Клиент обвинялся в мошенничестве в крупном размере. Грозило до 6 лет лишения свободы.",
      actions: "Провели детальный анализ материалов дела, выявили процессуальные нарушения на этапе следствия, представили доказательства отсутствия умысла на хищение.",
      result: "Уголовное дело прекращено на стадии предварительного следствия за отсутствием состава преступления.",
    },
    {
      category: "Гражданское право",
      title: "Взыскание ущерба от ДТП в размере 2,5 млн рублей",
      task: "Страховая компания отказала в выплате, ссылаясь на грубую неосторожность клиента.",
      actions: "Получили независимую экспертизу, подготовили доказательную базу вины второго участника ДТП, представили интересы в суде двух инстанций.",
      result: "Решением суда взыскано 2,5 млн рублей ущерба и 150 тыс. рублей судебных расходов со страховой компании.",
    },
    {
      category: "Арбитраж",
      title: "Защита интересов ООО в споре о взыскании 15 млн рублей",
      task: "Контрагент предъявил иск о взыскании задолженности, которая фактически была погашена.",
      actions: "Представили платёжные документы, доказали факт оплаты, выявили недобросовестность истца.",
      result: "В иске отказано полностью. Взысканы судебные расходы в размере 500 тыс. рублей в пользу нашего клиента.",
    },
    {
      category: "Семейное право",
      title: "Раздел имущества супругов стоимостью 50 млн рублей",
      task: "Супруг настаивал на неравном разделе, ссылаясь на личный вклад. Споры велись вокруг 3 объектов недвижимости и бизнеса.",
      actions: "Провели оценку всего имущества, доказали равный вклад супругов в его приобретение, представили интересы в суде.",
      result: "Имущество разделено в равных долях. Клиент получил 2 квартиры и денежную компенсацию 10 млн рублей.",
    },
    {
      category: "Защита прав потребителей",
      title: "Взыскание с застройщика неустойки и компенсации",
      task: "Застройщик задержал сдачу квартиры на 14 месяцев, отказывался выплачивать неустойку.",
      actions: "Направили досудебную претензию, при отказе — подали иск о взыскании неустойки, компенсации морального вреда и штрафа.",
      result: "Взыскано 1,8 млн рублей неустойки, 50 тыс. рублей морального вреда, 100 тыс. рублей судебных расходов и 50% штраф.",
    },
    {
      category: "Представительство в суде",
      title: "Обжалование решения суда в Верховном Суде РФ",
      task: "Клиент проиграл дело в двух инстанциях, требовалось обжалование в высшей инстанции.",
      actions: "Подготовили кассационную жалобу с анализом судебной практики Верховного Суда, выявили нарушения материального права.",
      result: "Определением Верховного Суда РФ дело направлено на новое рассмотрение. При повторном рассмотрении требования клиента удовлетворены полностью.",
    },
  ];

  const testimonials = [
    {
      name: "Анна С.",
      text: "Выражаю огромную благодарность адвокатам коллегии за помощь в семейном споре. Профессионально, оперативно и с отличным результатом. Рекомендую всем, кто столкнулся с подобными проблемами.",
      rating: 5,
    },
    {
      name: "Михаил К.",
      text: "Обратился по уголовному делу. Команда работала слаженно, все этапы были понятны и прозрачны. Добились прекращения дела. Огромное спасибо! Рекомендую!",
      rating: 5,
    },
    {
      name: "ООО «Строй-Инвест»",
      text: "Сотрудничаем с коллегией уже третий год по корпоративным спорам. Высокий уровень экспертизы, всегда на связи, чёткое понимание бизнес-задач. Надёжный партнёр.",
      rating: 5,
    },
    {
      name: "Елена Р.",
      text: "Помогли вернуть деньги от застройщика. Я даже не надеялась на успех, но адвокаты смогли доказать мою правоту. Профессионалы своего дела!",
      rating: 5,
    },
    {
      name: "Игорь П.",
      text: "Спасибо за помощь в арбитражном споре! Всё сделали быстро и качественно. Очень доволен результатом и уровнем сервиса.",
      rating: 5,
    },
    {
      name: "Ольга М.",
      text: "Консультация была очень подробной и полезной. Адвокат объяснил все нюансы моего дела, предложил несколько вариантов решения. Профессионалы!",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary to-primary/90 text-primary-foreground py-20 overflow-hidden">
          {/* Professional Legal Background Photo */}
          <div className="absolute inset-0 opacity-20">
            <img 
              src={legalBg2} 
              alt="" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="font-playfair text-4xl md:text-5xl font-bold mb-6">
                Наши <span className="text-accent">кейсы</span>
              </h1>
              <p className="text-lg text-primary-foreground/80 leading-relaxed">
                Реальные дела, реальные результаты. Примеры успешного решения 
                сложных юридических вопросов для наших клиентов.
              </p>
            </div>
          </div>
        </section>

        {/* Cases Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto space-y-8">
              {cases.map((caseItem, index) => (
                <Card key={index} className="border-border hover:shadow-elegant transition-all">
                  <CardContent className="pt-6">
                    <div className="mb-4">
                      <Badge variant="secondary" className="mb-3">
                        {caseItem.category}
                      </Badge>
                      <h3 className="font-playfair text-xl md:text-2xl font-bold mb-4">
                        {caseItem.title}
                      </h3>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-accent mb-2">Задача:</h4>
                        <p className="text-muted-foreground leading-relaxed">{caseItem.task}</p>
                      </div>

                      <div>
                        <h4 className="font-semibold text-accent mb-2">Наши действия:</h4>
                        <p className="text-muted-foreground leading-relaxed">{caseItem.actions}</p>
                      </div>

                      <div className="bg-accent/5 border border-accent/20 rounded-lg p-4">
                        <h4 className="font-semibold text-accent mb-2">Результат:</h4>
                        <p className="text-foreground font-medium leading-relaxed">{caseItem.result}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-6">
                Отзывы <span className="text-accent">клиентов</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Мнения тех, кому мы помогли защитить их права и интересы
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="border-border hover:shadow-elegant transition-all">
                  <CardContent className="pt-6">
                    <div className="mb-4">
                      <div className="flex items-center gap-1 text-accent mb-3">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <span key={i} className="text-lg">★</span>
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground italic leading-relaxed">
                        "{testimonial.text}"
                      </p>
                    </div>
                    <p className="font-semibold text-sm">{testimonial.name}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Cases;
