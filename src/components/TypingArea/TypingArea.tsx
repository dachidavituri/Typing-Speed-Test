import type { TypingAreaProps } from "./index.types";
import { useEffect } from "react";

const TypingArea: React.FC<TypingAreaProps> = ({ passage, typing }) => {
  const text = passage?.text ?? "";
  const { currentIndex, typed, handleKeyDown, errors } = typing;
  useEffect(() => {
    console.log(errors);
  }, [errors]);

  return (
    <div
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className="mt-8 p-6 rounded-lg bg-[#151515] border border-gray-800 min-h-45 outline-none cursor-text"
    >
      <p className="text-xl leading-relaxed tracking-wide">
        {text.split("").map((char, i) => {
          const isTyped = i < typed.length;
          const isCorrect = typed[i] === char;

          return (
            <span
              key={i}
              className={
                i === currentIndex
                  ? "border-b-2 border-white"
                  : isTyped
                    ? isCorrect
                      ? "text-green-500"
                      : "text-red-500 underline"
                    : "text-gray-500"
              }
            >
              {char}
            </span>
          );
        })}
      </p>
      {errors}
    </div>
  );
};

export default TypingArea;
