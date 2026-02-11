import type { Passage } from "@/components/TypingArea/index.types";
import passages from "../data/data.json";

export function getRandomPassage(difficulty: string): Passage | null {
  let filtered = passages;

  if (difficulty) {
    filtered = filtered.filter((p) => p.difficulty === difficulty);
  }

  if (filtered.length === 0) return null;

  const randomIndex = Math.floor(Math.random() * filtered.length);
  return filtered[randomIndex];
}
