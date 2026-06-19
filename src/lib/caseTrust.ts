import type { Case } from "@/data/cases";

const compactText = (value: string) => value.replace(/\s+/g, " ").trim();

export const shortenCaseText = (value: string, maxLength: number) => {
  const text = compactText(value);
  if (text.length <= maxLength) return text;
  const cutIndex = text.lastIndexOf(" ", maxLength);
  return `${text.slice(0, cutIndex > 80 ? cutIndex : maxLength).trim()}...`;
};

export const getCasePreview = (caseItem: Case) =>
  caseItem.decisionPreview ?? caseItem.documents?.[0] ?? caseItem.decisionUrl;

export const getCaseCourtLabel = (caseItem: Case) => {
  const text = compactText(`${caseItem.result} ${caseItem.task} ${caseItem.actions}`);
  const patterns = [
    /Мосгорсуд/i,
    /Арбитражн\w* суд[^.,;]*/i,
    /[А-ЯЁ][^.,;]{0,80} районн\w* суд[^.,;]*/i,
    /[А-ЯЁ][^.,;]{0,80} городск\w* суд[^.,;]*/i,
    /[А-ЯЁ][^.,;]{0,80} областн\w* суд[^.,;]*/i,
    /миров\w* суд[^.,;]*/i
  ];

  for (const pattern of patterns) {
    const match = text.match(pattern)?.[0];
    if (match) return shortenCaseText(match, 42);
  }

  return "Судебный акт";
};
