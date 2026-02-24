export type Props = {
  keyStats: Record<string, { pressed: number; errors: number }>;
};

export const KEYS = [
  ["q","w","e","r","t","y","u","i","o","p"],
  ["a","s","d","f","g","h","j","k","l"],
  ["z","x","c","v","b","n","m"],
];