import { Clock } from "lucide-react";

type WorkScheduleNoticeProps = {
  variant?: "form" | "contact";
  className?: string;
};

export const WORK_SCHEDULE_FULL =
  "Звонки и заявки обрабатываем с понедельника по пятницу. В выходные консультации проводим только по предварительной записи, согласованной заранее в рабочие дни.";

const WorkScheduleNotice = ({ variant = "form", className = "" }: WorkScheduleNoticeProps) => {
  const isContact = variant === "contact";

  return (
    <div
      className={`flex items-start gap-3 rounded-[12px] border ${
        isContact ? "border-[#D8C08B] bg-[#F8F4EA]" : "border-[#D8C08B]/80 bg-[#F8F4EA]/80"
      } px-4 py-3 text-[13px] leading-relaxed text-slate-700 ${className}`}
    >
      <Clock className="mt-0.5 h-4 w-4 shrink-0 text-accent" strokeWidth={1.8} />
      <p>{WORK_SCHEDULE_FULL}</p>
    </div>
  );
};

export default WorkScheduleNotice;
