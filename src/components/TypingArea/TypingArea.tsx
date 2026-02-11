import type { TypingAreaProps } from "./index.types";

const TypingArea: React.FC<TypingAreaProps> = ({ passage }) => {
  return (
    <div className="mt-8 p-6 rounded-lg bg-[#151515] border border-gray-800 min-h-45">
      <p className="text-xl leading-relaxed tracking-wide text-gray-500">
        {passage?.text}
      </p>
    </div>
  );
};

export default TypingArea;
