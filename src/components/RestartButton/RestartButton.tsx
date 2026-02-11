import type { RestartButtonProps } from "./index.types";

const RestartButton: React.FC<RestartButtonProps> = ({ onRestart }) => {
  return (
    <button
      onClick={onRestart}
      className="font-bold mt-8 px-5 py-2 bg-[#1f1f1f] rounded-md text-gray-300 hover:bg-[#2a2a2a] transition"
    >
      Restart Test ↻
    </button>
  );
};

export default RestartButton;
