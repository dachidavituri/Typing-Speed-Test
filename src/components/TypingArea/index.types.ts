export interface Passage {
  id: number;
  difficulty: string;
  text: string;
}

export interface TypingAreaProps {
  passage: Passage | null;
}
