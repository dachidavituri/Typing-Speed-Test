import type { DurationSelectorProps } from "./index.types";

const DurationSelector: React.FC<DurationSelectorProps> = ({
  duration,
  setDuration,
}) => {
  return (
    <select
      value={duration}
      onChange={(e) => setDuration(Number(e.target.value))}
      className="bg-[#1a1a1a] border border-gray-700 text-gray-300 px-3 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value={15}>15s</option>
      <option value={30}>30s</option>
      <option value={60}>60s</option>
      <option value={120}>120s</option>
    </select>
  );
};

export default DurationSelector;
