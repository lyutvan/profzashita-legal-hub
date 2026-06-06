import { useEffect, useRef, useState } from "react";
import { Award, BriefcaseBusiness, Users } from "lucide-react";

type StatItem = {
  value: number;
  suffix: string;
  label: string;
  description: string;
  icon: typeof Award;
};

const stats: StatItem[] = [
  {
    value: 25,
    suffix: "+",
    label: "лет опыта",
    description: "Судебная и адвокатская практика по сложным делам",
    icon: Award,
  },
  {
    value: 500,
    suffix: "+",
    label: "выигранных дел",
    description: "Результаты в уголовных, гражданских и арбитражных спорах",
    icon: BriefcaseBusiness,
  },
  {
    value: 100,
    suffix: "%",
    label: "довольных клиентов",
    description: "Доверители отмечают системность и понятную коммуникацию",
    icon: Users,
  },
];

const easeOutCubic = (progress: number) => 1 - Math.pow(1 - progress, 3);

const useCountUp = (target: number, isActive: boolean, duration = 1600) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!isActive) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(target);
      return;
    }

    let animationFrame = 0;
    const startedAt = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - startedAt) / duration, 1);
      setValue(Math.round(target * easeOutCubic(progress)));

      if (progress < 1) {
        animationFrame = window.requestAnimationFrame(tick);
      }
    };

    animationFrame = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(animationFrame);
    };
  }, [duration, isActive, target]);

  return value;
};

const AnimatedStatCard = ({ stat, isActive, delay }: { stat: StatItem; isActive: boolean; delay: number }) => {
  const count = useCountUp(stat.value, isActive, 1500 + delay);
  const Icon = stat.icon;

  return (
    <div className="relative overflow-hidden rounded-[14px] border border-[#C9A227]/45 bg-white/[0.055] p-5 text-left shadow-[0_18px_45px_rgba(0,0,0,0.18)] backdrop-blur-sm md:p-6">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.12),rgba(201,162,39,0.08)_45%,rgba(255,255,255,0))]" />
      <div className="relative flex items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#C9A227]/50 bg-[#C9A227]/12 text-[#C9A227] md:h-12 md:w-12">
          <Icon className="h-6 w-6" strokeWidth={1.8} />
        </div>
        <div className="min-w-0">
          <div className="font-serif text-[42px] font-semibold leading-none text-[#C9A227] md:text-[52px]">
            {count.toLocaleString("ru-RU")}
            <span className="text-[0.68em]">{stat.suffix}</span>
          </div>
          <div className="mt-2 text-[17px] font-semibold leading-tight text-white md:text-[19px]">{stat.label}</div>
          <p className="mt-3 text-[14px] leading-6 text-white/72 md:text-[15px]">{stat.description}</p>
        </div>
      </div>
    </div>
  );
};

const AnimatedStats = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const element = sectionRef.current;
    if (!element || isActive) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;

        setIsActive(true);
        observer.disconnect();
      },
      {
        root: null,
        rootMargin: "0px 0px -12% 0px",
        threshold: 0.28,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [isActive]);

  return (
    <section ref={sectionRef} data-animated-stats className="section bg-primary text-white">
      <div className="container">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-3 text-[12px] font-semibold uppercase tracking-[0.18em] text-[#C9A227]">
            Профзащита в цифрах
          </p>
          <h2 className="font-serif text-h2-mobile font-bold md:text-h2">Опыт, который работает на результат</h2>
          <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-7 text-white/72 md:text-[17px]">
            Ключевые показатели коллегии: практика, реальные дела и доверие клиентов.
          </p>
        </div>

        <div className="section__content grid gap-4 md:grid-cols-3 md:gap-5">
          {stats.map((stat, index) => (
            <AnimatedStatCard key={stat.label} stat={stat} isActive={isActive} delay={index * 160} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AnimatedStats;
