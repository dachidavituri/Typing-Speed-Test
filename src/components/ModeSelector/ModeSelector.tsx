import type { ModeSelectorProps } from "./index.types";

const ModeSelector: React.FC<ModeSelectorProps> = ({ mode, setMode }) => {
  const modes = ["Timed", "Passage"];
  return (
    <div className="flex gap-2 items-center">
      Mode:
      {modes.map((m) => (
        <button
          key={m}
          onClick={() => setMode(m.toLowerCase())}
          className={`px-3 py-1 rounded-lg outline-none ${mode === m.toLowerCase() ? "border border-blue-500 text-blue-500" : "border border-white bg-transparant text-gray-200 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"}`}
        >
          {m}
        </button>
      ))}
    </div>
  );
};

export default ModeSelector;
