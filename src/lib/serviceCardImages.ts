export const SERVICE_CARD_IMAGES = Array.from({ length: 11 }, (_, index) => {
  const number = String(index + 1).padStart(2, "0");
  return `/images/services/cards/card-${number}.jpg`;
});

function hashString(input: string) {
  // Simple deterministic hash (djb2)
  let hash = 5381;
  for (let i = 0; i < input.length; i++) {
    hash = (hash * 33) ^ input.charCodeAt(i);
  }
  return hash >>> 0;
}

export function createServiceCardImageAssigner(seed = "") {
  let used = new Set<number>();
  let prevIndex: number | null = null;

  return (key: string) => {
    const images = SERVICE_CARD_IMAGES;
    const n = images.length;
    if (n === 0) return "";

    if (used.size >= n) used = new Set<number>();

    const base = hashString(`${seed}|${key}`) % n;
    let index = base;

    for (let attempt = 0; attempt < n; attempt++) {
      const wouldRepeatPrev = prevIndex !== null && index === prevIndex;
      const wouldRepeatUsed = used.size < n && used.has(index);
      if (!wouldRepeatPrev && !wouldRepeatUsed) break;
      index = (index + 1) % n;
    }

    used.add(index);
    prevIndex = index;
    return images[index];
  };
}

