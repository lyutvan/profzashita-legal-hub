import { MessageSquare } from "lucide-react";
import { useQuickQuestionModal } from "@/components/QuickQuestionModalProvider";

const QuickQuestion = () => {
  const { openQuickQuestionModal } = useQuickQuestionModal();

  return (
    <>
      <button
        onClick={() => openQuickQuestionModal({ forceForm: true })}
        className="group fixed bottom-[14px] right-[14px] z-40 flex max-w-[calc(100vw-24px)] items-center gap-2 rounded-full border border-accent/60 bg-primary px-2.5 py-2 pr-3 text-primary-foreground shadow-[0_14px_36px_rgba(5,24,44,0.3)] transition duration-200 hover:-translate-y-0.5 hover:border-accent hover:shadow-[0_18px_44px_rgba(5,24,44,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:bottom-[18px] sm:right-[18px] sm:gap-2.5 sm:px-3 sm:pr-4"
        aria-label="Задать быстрый вопрос юристу"
      >
        <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-[0_8px_20px_rgba(203,161,34,0.32)] sm:h-11 sm:w-11">
          <span className="absolute inset-0 rounded-full bg-accent/35 opacity-70 motion-safe:animate-ping" aria-hidden="true" />
          <MessageSquare className="relative h-5 w-5 sm:h-[22px] sm:w-[22px]" />
        </span>
        <span className="flex min-w-0 flex-col text-left leading-tight">
          <span className="text-[14px] font-bold sm:text-[15px]">Есть вопрос?</span>
          <span className="hidden text-[12px] font-medium text-white/72 sm:block">
            Напишите нам — ответим быстро
          </span>
        </span>
      </button>
    </>
  );
};

export default QuickQuestion;
