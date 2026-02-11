import type { StatsPanelProps } from "./index.types";

const StatsPanel: React.FC<StatsPanelProps> = ({ wpm, accuracy, time }) => {
  return (
    <div className="flex gap-8 text-md text-gray-400">
      <span>
        WPM: <span className="text-white font-semibold">{wpm}</span>
      </span>

      <span>
        Accuracy:{" "}
        <span className="text-red-500 font-semibold">{accuracy}%</span>
      </span>

      <span>
        Time: <span className="text-green-400 font-semibold">{time}</span>
      </span>
    </div>
  );
};

export default StatsPanel;
