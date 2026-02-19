export interface GameResult {
  wpm: number;
  accuracy: number;
  date: string;
}

export interface LocalStats {
  bestWPM: number;
  bestAccuracy: number;
  history: GameResult[];
}

const STORAGE_KEY = "typingGameStats";

export function getLocalStats(): LocalStats {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    return {
      bestWPM: 0,
      bestAccuracy: 0,
      history: [],
    };
  }
  return JSON.parse(data);
}

export function saveLocalStats(stats: LocalStats) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
}
