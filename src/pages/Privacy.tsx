import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";

const Privacy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="relative flex-1 py-20 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="font-playfair text-4xl md:text-5xl font-bold mb-8 text-center">
              Политика <span className="text-accent">конфиденциальности</span>
            </h1>

            <Card className="border-border">
              <CardContent className="pt-8 space-y-6">
                <section>
                  <h2 className="font-playfair text-2xl font-semibold mb-4">1. Общие положения</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Настоящая Политика конфиденциальности персональных данных (далее — Политика) действует в отношении всей информации, 
                    размещенной на сайте в сети Интернет по адресу profzashchita.ru (далее — Сайт), которую пользователи могут получить 
                    о Пользователе во время использования Сайта, его сервисов, программ и продуктов.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mt-3">
                    Использование Сайта означает безоговорочное согласие Пользователя с настоящей Политикой и указанными в ней условиями 
                    обработки его персональной информации; в случае несогласия с этими условиями Пользователь должен воздержаться от 
                    использования Сайта.
                  </p>
                </section>

                <section>
                  <h2 className="font-playfair text-2xl font-semibold mb-4">2. Персональная информация пользователей</h2>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    Под персональной информацией в настоящей Политике понимается:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                    <li>Персональная информация, которую Пользователь предоставляет о себе самостоятельно при заполнении форм обратной связи 
                    или в процессе использования Сайта, включая персональные данные Пользователя (имя, фамилия, номер телефона, адрес электронной почты).</li>
                    <li>Данные, которые автоматически передаются Сайту в процессе его использования с помощью установленного на устройстве 
                    Пользователя программного обеспечения, в том числе IP-адрес, информация из cookies, информация о браузере пользователя 
                    (или иной программе, с помощью которой осуществляется доступ к Сайту), время доступа, адрес запрашиваемой страницы.</li>
                  </ul>
                </section>

                <section>
                  <h2 className="font-playfair text-2xl font-semibold mb-4">3. Цели обработки персональной информации</h2>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    Сайт собирает и хранит только ту персональную информацию, которая необходима для предоставления сервисов или исполнения 
                    соглашений и договоров с Пользователем, за исключением случаев, когда законодательством предусмотрено обязательное хранение 
                    персональной информации в течение определенного законом срока.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Персональную информацию Пользователя Сайт обрабатывает в следующих целях:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4 mt-3">
                    <li>Установления с Пользователем обратной связи, включая направление уведомлений, запросов, касающихся использования Сайта, 
                    оказания услуг, обработку запросов и заявок от Пользователя;</li>
                    <li>Предоставления Пользователю эффективной клиентской и технической поддержки при возникновении проблем, связанных с 
                    использованием Сайта;</li>
                    <li>Предоставления Пользователю с его согласия обновлений услуг, специальных предложений, информации о ценах, новостной 
                    рассылки и иных сведений от имени Сайта;</li>
                    <li>Осуществления рекламной деятельности с согласия Пользователя.</li>
                  </ul>
                </section>

                <section>
                  <h2 className="font-playfair text-2xl font-semibold mb-4">4. Условия обработки персональной информации</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Сайт обрабатывает персональную информацию Пользователя только с его согласия. Обработка персональной информации 
                    осуществляется с использованием средств автоматизации и без использования средств автоматизации.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mt-3">
                    Сайт принимает необходимые организационные и технические меры для защиты персональной информации Пользователя от 
                    неправомерного или случайного доступа, уничтожения, изменения, блокирования, копирования, распространения, а также от 
                    иных неправомерных действий третьих лиц.
                  </p>
                </section>

                <section>
                  <h2 className="font-playfair text-2xl font-semibold mb-4">5. Изменение Политики конфиденциальности</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Сайт имеет право вносить изменения в настоящую Политику конфиденциальности. При внесении изменений в актуальной редакции 
                    указывается дата последнего обновления. Новая редакция Политики вступает в силу с момента ее размещения, если иное не 
                    предусмотрено новой редакцией Политики.
                  </p>
                </section>

                <section>
                  <h2 className="font-playfair text-2xl font-semibold mb-4">6. Обратная связь</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Все предложения или вопросы по поводу настоящей Политики следует направлять на электронный адрес: profzashchita@internet.ru
                  </p>
                </section>

                <div className="border-t border-border pt-6 mt-8">
                  <p className="text-sm text-muted-foreground">
                    Дата последнего обновления: 01.01.2025
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

export default Privacy;
