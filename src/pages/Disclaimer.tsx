import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import legalBg2 from "@/assets/legal-bg-2.jpg";

const Disclaimer = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="relative flex-1 py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-18">
          <img 
            src={legalBg2} 
            alt="" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <h1 className="font-playfair text-4xl md:text-5xl font-bold mb-8 text-center">
              Отказ от <span className="text-accent">ответственности</span>
            </h1>

            <Card className="border-border">
              <CardContent className="pt-8 space-y-6">
                <section>
                  <h2 className="font-playfair text-2xl font-semibold mb-4">1. Общие положения</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Информация, представленная на данном сайте, носит исключительно информационный характер и не является юридической 
                    консультацией, офертой или рекомендацией к действию. Настоящий отказ от ответственности применяется ко всем страницам 
                    данного сайта.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mt-3">
                    Использование материалов сайта не создает отношений «адвокат-клиент». Для получения юридической консультации, 
                    применимой к вашей конкретной ситуации, необходимо обратиться непосредственно к адвокату коллегии адвокатов «Профзащита».
                  </p>
                </section>

                <section>
                  <h2 className="font-playfair text-2xl font-semibold mb-4">2. Точность информации</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Мы прилагаем все усилия для обеспечения точности и актуальности информации, размещенной на сайте. Однако законодательство 
                    постоянно меняется, и судебная практика развивается, поэтому мы не можем гарантировать полную точность, актуальность и 
                    полноту представленной информации.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mt-3">
                    Информация на сайте может содержать технические неточности или типографские ошибки. Мы оставляем за собой право вносить 
                    изменения и улучшения в любое время без предварительного уведомления.
                  </p>
                </section>

                <section>
                  <h2 className="font-playfair text-2xl font-semibold mb-4">3. Результаты прошлых дел</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Информация о прошлых делах и достигнутых результатах, представленная на сайте, не является гарантией аналогичных 
                    результатов в будущем. Каждое юридическое дело уникально и зависит от конкретных обстоятельств, фактов и применимого 
                    законодательства.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mt-3">
                    Результаты, представленные на сайте, не должны рассматриваться как обещание или гарантия какого-либо конкретного исхода. 
                    Исход любого дела зависит от множества факторов и не может быть предсказан с абсолютной точностью.
                  </p>
                </section>

                <section>
                  <h2 className="font-playfair text-2xl font-semibold mb-4">4. Ссылки на сторонние ресурсы</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Сайт может содержать ссылки на внешние веб-сайты, которые не контролируются коллегией адвокатов «Профзащита». Мы не несем 
                    ответственности за содержание, политику конфиденциальности или практики любых сторонних сайтов.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mt-3">
                    Включение любой ссылки не означает одобрения сайта коллегией адвокатов «Профзащита». Использование любого такого 
                    связанного веб-сайта осуществляется на ваш собственный риск.
                  </p>
                </section>

                <section>
                  <h2 className="font-playfair text-2xl font-semibold mb-4">5. Ограничение ответственности</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Коллегия адвокатов «Профзащита» и ее представители не несут ответственности за любые прямые, косвенные, случайные, 
                    специальные или последующие убытки, возникающие в результате использования или невозможности использования информации, 
                    размещенной на данном сайте.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mt-3">
                    Мы не несем ответственности за решения или действия, предпринятые на основе информации, представленной на сайте. 
                    Посетители сайта используют информацию на свой собственный риск.
                  </p>
                </section>

                <section>
                  <h2 className="font-playfair text-2xl font-semibold mb-4">6. Юрисдикция</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Информация на данном сайте относится преимущественно к законодательству Российской Федерации. Законы других юрисдикций 
                    могут существенно отличаться. Если вы находитесь за пределами Российской Федерации, вам следует проконсультироваться с 
                    юристом в вашей юрисдикции.
                  </p>
                </section>

                <section>
                  <h2 className="font-playfair text-2xl font-semibold mb-4">7. Конфиденциальность</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Информация, отправленная через незащищенные каналы связи (например, через обычную контактную форму), может не быть 
                    конфиденциальной. Для обеспечения конфиденциальности вашей информации, пожалуйста, свяжитесь с нами напрямую для 
                    организации безопасной консультации.
                  </p>
                </section>

                <section>
                  <h2 className="font-playfair text-2xl font-semibold mb-4">8. Обновления и изменения</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Коллегия адвокатов «Профзащита» оставляет за собой право вносить изменения в данный отказ от ответственности в любое 
                    время без предварительного уведомления. Продолжение использования сайта после внесения изменений означает ваше согласие 
                    с обновленной версией отказа от ответственности.
                  </p>
                </section>

                <section>
                  <h2 className="font-playfair text-2xl font-semibold mb-4">9. Контактная информация</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Если у вас есть вопросы относительно данного отказа от ответственности или любой информации на сайте, пожалуйста, 
                    свяжитесь с нами по адресу: profzashchita@internet.ru или по телефону: +7 999 999 99 99.
                  </p>
                </section>

                <div className="border-t border-border pt-6 mt-8">
                  <p className="text-sm text-muted-foreground">
                    Дата последнего обновления: 01.01.2025
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Информация на сайте не является публичной офертой.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Disclaimer;
