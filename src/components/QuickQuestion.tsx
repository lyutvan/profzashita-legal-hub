import { MessageSquare } from "lucide-react";
import { useQuickQuestionModal } from "@/components/QuickQuestionModalProvider";

const QuickQuestion = () => {
  const { openQuickQuestionModal } = useQuickQuestionModal();

  return (
    <>
      <button
        onClick={() => openQuickQuestionModal({ forceForm: true })}
        className="group fixed bottom-[18px] right-[18px] z-40 flex max-w-[calc(100vw-32px)] items-center gap-3 rounded-full border border-accent/60 bg-primary px-3 py-2.5 pr-4 text-primary-foreground shadow-[0_18px_48px_rgba(5,24,44,0.32)] transition duration-200 hover:-translate-y-1 hover:border-accent hover:shadow-[0_22px_56px_rgba(5,24,44,0.42)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        aria-label="Задать быстрый вопрос юристу"
      >
        <span className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-[0_10px_24px_rgba(203,161,34,0.34)]">
          <span className="absolute inset-0 rounded-full bg-accent/35 opacity-70 motion-safe:animate-ping" aria-hidden="true" />
          <MessageSquare className="relative h-6 w-6" />
        </span>
        <span className="flex min-w-0 flex-col text-left leading-tight">
          <span className="text-[15px] font-bold sm:text-[17px]">Есть вопрос?</span>
          <span className="hidden text-[12px] font-medium text-white/72 sm:block">
            Напишите нам — ответим быстро
          </span>
        </span>
      </button>
    </>
  );
};

export default QuickQuestion;
