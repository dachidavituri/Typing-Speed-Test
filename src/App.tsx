import { useState, useEffect } from "react";
import { getRandomPassage } from "./utils/getRandomPassage";
import DifficultySelector from "./components/DifficultySelector/DifficultySelector";
import DurationSelector from "./components/DurationSelector/DurationSelector";
import Header from "./components/Header/Header";
import ModeSelector from "./components/ModeSelector/ModeSelector";
import RestartButton from "./components/RestartButton/RestartButton";
import StatsPanel from "./components/StatsPanel/StatsPanel";
import TypingArea from "./components/TypingArea/TypingArea";
import { useTypingGame } from "./hooks/useTypingGame";
import type { Passage } from "./components/TypingArea/index.types";
import { getLocalStats } from "./utils/localStats";
import StatsChart from "./components/BarChart/BarChart";

function App() {
  const [difficulty, setDifficulty] = useState("hard");
  const [mode, setMode] = useState<string>("timed");
  const [duration, setDuration] = useState(60);

  const [passage, setPassage] = useState<Passage | null>(
    getRandomPassage(difficulty),
  );

  useEffect(() => {
    setPassage(getRandomPassage(difficulty));
  }, [difficulty]);

  const game = useTypingGame({
    passage: passage?.text ?? "",
    mode,
    duration,
  });

  const stats = getLocalStats();
  console.log(stats.history);
  const sumWpm = stats.history.reduce(
    (accumulator, current) => accumulator + current.wpm,
    0,
  );
  const sumAccuracy = stats.history.reduce(
    (accumulator, current) => accumulator + current.accuracy,
    0,
  );
  const avgWpm =
    stats.history.length > 0 ? (sumWpm / stats.history.length).toFixed(2) : 0;
  const avgAccuracy =
    stats.history.length > 0
      ? (sumAccuracy / stats.history.length).toFixed(2)
      : 0;

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-gray-300 flex justify-center px-4 py-8">
      <div className="w-full max-w-6xl">
        <Header bestWPM={stats.bestWPM} />

        <div className="flex flex-wrap items-center justify-between mt-6 gap-4">
          <StatsPanel
            wpm={game.wpm}
            accuracy={game.accuracy}
            time={game.formattedTime}
          />

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

        <TypingArea passage={passage} typing={game.typing} />
        {game.message && (
          <div className="text-center mt-6 text-xl font-bold text-green-400">
            {game.message}
          </div>
        )}

        <div className="flex justify-center">
          <RestartButton onRestart={game.restart} />
        </div>
        <div className="h-125">
          <StatsChart history={stats.history} />
        </div>
        <h1 className="mt-3 text-green-400 font-semibold">AVG wpm: {avgWpm}</h1>
        <h1 className="mt-3 text-green-400 font-semibold">
          AVG accuracy: {avgAccuracy}%
        </h1>
      </div>
    </div>
  );
}

export default App;
