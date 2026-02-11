import { useEffect, useState } from "react";
import { getRandomPassage } from "./utils/getRandomPassage";
import type { Passage } from "./components/TypingArea/index.types";
import DifficultySelector from "./components/DifficultySelector/DifficultySelector";
import DurationSelector from "./components/DurationSelector/DurationSelector";
import Header from "./components/Header/Header";
import ModeSelector from "./components/ModeSelector/ModeSelector";
import RestartButton from "./components/RestartButton/RestartButton";
import StatsPanel from "./components/StatsPanel/StatsPanel";
import TypingArea from "./components/TypingArea/TypingArea";

function App() {
  const [difficulty, setDifficulty] = useState<string>("hard");
  const [mode, setMode] = useState<string>("timed");
  const [duration, setDuration] = useState<number>(60);
  const [passage, setPassage] = useState<Passage | null>(
    getRandomPassage(difficulty),
  );
  const [wpm, setWpm] = useState<number>(0);
  const [accuracy, setAccuracy] = useState<number>(100);
  const [time, setTime] = useState<string>("0:00");

  const handleRestart = () => {
    setPassage(getRandomPassage(difficulty));
    setWpm(0);
    setAccuracy(100);
    setTime("0:00");
  };

  useEffect(() => {
    setPassage(getRandomPassage(difficulty));
  }, [difficulty]);

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-gray-300 flex justify-center px-4 py-8">
      <div className="w-full max-w-6xl">
        <Header bestWPM={92} />

        <div className="flex flex-wrap items-center justify-between mt-6 gap-4">
          <StatsPanel wpm={wpm} accuracy={accuracy} time={time} />
          <div className="flex flex-wrap items-center gap-4">
            <DifficultySelector
              difficulty={difficulty}
              setDifficulty={setDifficulty}
            />
            |
            <ModeSelector mode={mode} setMode={setMode} />
            <DurationSelector duration={duration} setDuration={setDuration} />
          </div>
        </div>

        <TypingArea passage={passage} />

        <div className="flex justify-center">
          <RestartButton onRestart={handleRestart} />
        </div>
      </div>
    </div>
  );
}

export default App;
