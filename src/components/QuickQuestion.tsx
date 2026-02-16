import { MessageSquare } from "lucide-react";
import { useQuickQuestionModal } from "@/components/QuickQuestionModalProvider";

const QuickQuestion = () => {
  const { openQuickQuestionModal } = useQuickQuestionModal();

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => openQuickQuestionModal({ forceForm: true })}
        className="fixed bottom-[18px] right-[18px] z-40 h-14 w-14 rounded-full bg-accent text-accent-foreground shadow-elegant hover:scale-110 transition-transform duration-200 flex items-center justify-center group"
        aria-label="Задать вопрос"
      >
        <MessageSquare className="h-6 w-6" />
        <span className="absolute right-full mr-3 min-w-[140px] px-3 py-2 bg-background border border-border rounded-xl text-small font-medium leading-[1.2] text-foreground whitespace-nowrap opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-200 pointer-events-none shadow-lg z-50">
          Задать вопрос
        </span>
      </button>
    </>
  );
};

export default QuickQuestion;
