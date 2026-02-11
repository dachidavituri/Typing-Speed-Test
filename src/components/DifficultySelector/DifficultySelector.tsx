import type { DifficultySelectorProps } from "./index.types";

const DifficultySelector: React.FC<DifficultySelectorProps> = ({
  difficulty,
  setDifficulty,
}) => {
  const options = ["Easy", "Medium", "Hard"];
  return (
    <div className="flex items-center gap-2">
      <span className="text-gray-400">Difficulty:</span>
      {options.map((level) => (
        <button
          key={level}
          onClick={() => setDifficulty(level.toLowerCase())}
          className={`px-3 py-1 rounded-lg outline-none ${difficulty === level.toLowerCase() ? "border border-blue-500 text-blue-500" : "border border-white bg-transparant text-gray-200 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"}`}
        >
          {level}
        </button>
      ))}
    </div>
  );
};

export default DifficultySelector;
