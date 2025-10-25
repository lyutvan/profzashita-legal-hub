import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Award, Users, Target, TrendingUp } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary to-primary/90 text-primary-foreground py-20 overflow-hidden">
          {/* Legal Background Pattern */}
          <div className="absolute inset-0 opacity-[0.03]">
            <div className="absolute inset-0" style={{
              backgroundImage: 'url("data:image/svg+xml,%3Csvg width="80" height="80" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff"%3E%3C!-- Scales of Justice --%3E%3Cpath d="M20 30h-8l4-8z M28 30h-8l4-8z M24 22v16 M20 38h8"/%3E%3C!-- Gavel --%3E%3Cpath d="M52 15l8 8-4 4-8-8z M56 23l-3 3-6-6 3-3z"/%3E%3C!-- Shield --%3E%3Cpath d="M40 50l-6 3v-10c0-5 3-9 6-10 3 1 6 5 6 10v10z"/%3E%3C!-- Columns --%3E%3Crect x="60" y="55" width="3" height="12"/%3E%3Crect x="66" y="53" width="3" height="14"/%3E%3Crect x="72" y="55" width="3" height="12"/%3E%3Crect x="59" y="67" width="17" height="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
              backgroundSize: '80px 80px'
            }} />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="font-playfair text-4xl md:text-5xl font-bold mb-6">
                О <span className="text-accent">коллегии</span>
              </h1>
              <p className="text-lg text-primary-foreground/80 leading-relaxed">
                Команда профессионалов, которая стоит на защите ваших прав и интересов
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                <Card className="border-border">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                      <Target className="h-6 w-6 text-accent" />
                    </div>
                    <h3 className="font-playfair text-xl font-bold mb-3">Наша миссия</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Обеспечить каждому клиенту профессиональную юридическую защиту, 
                      основанную на глубоких знаниях законодательства и многолетнем опыте.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-border">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                      <TrendingUp className="h-6 w-6 text-accent" />
                    </div>
                    <h3 className="font-playfair text-xl font-bold mb-3">Наши ценности</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Профессионализм, честность, конфиденциальность и неизменная ответственность 
                      перед каждым клиентом — основа нашей работы.
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="prose prose-lg max-w-none">
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  Коллегия адвокатов «Профзащита» была основана в 2008 году группой опытных юристов, 
                  объединённых желанием предоставлять качественные юридические услуги на самом высоком уровне.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  За годы работы мы сформировали команду специалистов, каждый из которых является экспертом 
                  в своей области права. Наши адвокаты регулярно повышают квалификацию, следят за изменениями 
                  в законодательстве и судебной практике.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Мы гордимся тем, что более 98% наших клиентов достигают положительного результата в своих делах. 
                  Это стало возможным благодаря индивидуальному подходу, тщательной подготовке и профессионализму 
                  наших адвокатов.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-accent mb-2">15+</div>
                <div className="text-sm text-muted-foreground">лет на рынке</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-accent mb-2">25+</div>
                <div className="text-sm text-muted-foreground">адвокатов в команде</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-accent mb-2">500+</div>
                <div className="text-sm text-muted-foreground">выигранных дел</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-accent mb-2">98%</div>
                <div className="text-sm text-muted-foreground">довольных клиентов</div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-6">
                Наша <span className="text-accent">команда</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Профессионалы с многолетним опытом в различных областях права
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  name: "Иванов Иван Иванович",
                  position: "Управляющий партнёр",
                  experience: "Стаж 18 лет",
                  specialization: "Уголовное право, арбитраж",
                },
                {
                  name: "Петрова Мария Сергеевна",
                  position: "Партнёр",
                  experience: "Стаж 15 лет",
                  specialization: "Гражданское право, семейные споры",
                },
                {
                  name: "Сидоров Алексей Петрович",
                  position: "Старший адвокат",
                  experience: "Стаж 12 лет",
                  specialization: "Корпоративное право, споры с бизнесом",
                },
              ].map((member, index) => (
                <Card key={index} className="border-border hover:shadow-elegant transition-all">
                  <CardContent className="pt-6 text-center">
                    <div className="w-24 h-24 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                      <Users className="h-12 w-12 text-accent" />
                    </div>
                    <h3 className="font-playfair text-xl font-semibold mb-2">{member.name}</h3>
                    <p className="text-accent font-medium mb-1">{member.position}</p>
                    <p className="text-sm text-muted-foreground mb-2">{member.experience}</p>
                    <p className="text-sm text-muted-foreground">{member.specialization}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Achievements Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-6">
                Достижения и <span className="text-accent">признание</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {[
                "Победители рейтинга лучших юридических компаний России 2023",
                "Член Адвокатской палаты города Москвы",
                "Рекомендованы ведущими деловыми изданиями",
                "Многократные победители в резонансных делах",
              ].map((achievement, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-card rounded-lg border border-border">
                  <Award className="h-6 w-6 text-accent flex-shrink-0 mt-0.5" />
                  <p className="text-base">{achievement}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
