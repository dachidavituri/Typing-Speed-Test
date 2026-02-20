type HistoryItem = {
  wpm: number;
  accuracy: number;
  date: string;
};

export interface Props {
  history: HistoryItem[];
}