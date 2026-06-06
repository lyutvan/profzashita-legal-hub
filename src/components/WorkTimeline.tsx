import { CSSProperties, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const timelineSteps = [
  {
    title: "Первичная консультация",
    description: "Разбираем задачу, срочность и желаемый результат. Объясняем, какие первые действия нужны.",
  },
  {
    title: "Анализ документов и ситуации",
    description: "Изучаем материалы, обстоятельства и возможные риски, чтобы оценка была основана на фактах.",
  },
  {
    title: "Разработка правовой позиции",
    description: "Формируем стратегию защиты интересов с учетом судебной практики и позиции второй стороны.",
  },
  {
    title: "Подготовка документов",
    description: "Готовим заявления, жалобы, ходатайства, претензии и доказательственную базу.",
  },
  {
    title: "Представление интересов",
    description: "Ведем переговоры, участвуем в заседаниях и отстаиваем позицию клиента в нужной инстанции.",
  },
  {
    title: "Сопровождение до результата",
    description: "Контролируем дальнейшие действия, исполнение решений и необходимые процессуальные шаги.",
  },
];

const WorkTimeline = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const timelineRef = useRef<HTMLDivElement | null>(null);
  const markerRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [progress, setProgress] = useState(0);
  const [visibleSteps, setVisibleSteps] = useState<boolean[]>(() => timelineSteps.map(() => false));

  const sectionStyle = useMemo(
    () =>
      ({
        "--timeline-progress": progress.toFixed(3),
      }) as CSSProperties,
    [progress],
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      setProgress(1);
      setVisibleSteps(timelineSteps.map(() => true));
      return;
    }

    const section = sectionRef.current;
    if (!section) return;

    let frameId = 0;

    const updateProgress = () => {
      frameId = 0;
      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      const start = viewportHeight * 0.72;
      // Finish the line before the section leaves the viewport, so the last step is readable.
      const range = Math.max(rect.height * 0.78, rect.height - viewportHeight * 0.08);
      const nextProgress = Math.min(1, Math.max(0, (start - rect.top) / range));
      setProgress(nextProgress);

      const timeline = timelineRef.current;
      if (!timeline) return;

      const timelineRect = timeline.getBoundingClientRect();
      const isMobile = window.matchMedia("(max-width: 767px)").matches;
      const lineTop = isMobile ? 26 : 12;
      const lineBottom = isMobile ? 28 : 12;
      const lineLength = Math.max(1, timelineRect.height - lineTop - lineBottom);
      const reachedY = lineTop + lineLength * nextProgress;

      const nextVisibleSteps = timelineSteps.map((_, index) => {
        const marker = markerRefs.current[index];
        if (!marker) return false;

        const markerRect = marker.getBoundingClientRect();
        const markerCenterY = markerRect.top - timelineRect.top + markerRect.height / 2;
        return reachedY >= markerCenterY - 2;
      });

      setVisibleSteps((current) => {
        if (current.every((value, index) => value === nextVisibleSteps[index])) return current;
        return nextVisibleSteps;
      });
    };

    const requestUpdate = () => {
      if (frameId) return;
      frameId = window.requestAnimationFrame(updateProgress);
    };

    requestUpdate();
    const settleTimer = window.setTimeout(requestUpdate, 120);
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    window.addEventListener("hashchange", requestUpdate);

    return () => {
      window.clearTimeout(settleTimer);
      if (frameId) window.cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      window.removeEventListener("hashchange", requestUpdate);
    };
  }, []);

  return (
    <section id="etapy-raboty" ref={sectionRef} className="section work-timeline-section" style={sectionStyle}>
      <div className="container max-w-[1180px]">
        <div className="section__header mx-auto max-w-4xl text-center">
          <h2 className="font-serif text-h2-mobile font-bold text-white md:text-h2">Как мы работаем</h2>
          <p className="mx-auto mt-4 max-w-3xl text-body-mobile leading-relaxed text-white/72 md:text-body">
            Ведём дело последовательно: от первичной оценки до контроля результата. Клиент понимает, что происходит на каждом этапе.
          </p>
        </div>

        <div ref={timelineRef} className="work-timeline section__content mx-auto mt-9 md:mt-14">
          {timelineSteps.map((step, index) => (
            <div
              key={step.title}
              className={`work-timeline__item ${index % 2 === 0 ? "work-timeline__item--left" : "work-timeline__item--right"} ${
                visibleSteps[index] ? "work-timeline__item--visible" : ""
              }`}
            >
              <div
                ref={(element) => {
                  markerRefs.current[index] = element;
                }}
                className="work-timeline__marker"
                aria-hidden="true"
              >
                <span>{index + 1}</span>
              </div>

              <article className="work-timeline__card">
                <div className="work-timeline__number">Этап {index + 1}</div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </article>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-8 flex max-w-3xl flex-col items-center gap-4 text-center md:mt-12">
          <p className="text-body-mobile leading-relaxed text-white/72 md:text-body">
            Первый шаг — коротко обсудить ситуацию и понять, какие действия нельзя откладывать.
          </p>
          <Button asChild size="lg" className="h-auto min-h-14 w-full max-w-[300px] bg-accent px-7 py-3 text-white hover:bg-accent/90">
            <Link to="/kontakty">Получить консультацию</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default WorkTimeline;
