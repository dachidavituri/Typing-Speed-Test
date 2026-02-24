import { useState, useCallback } from "react";

export function useTypingEngine(passage: string) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [typed, setTyped] = useState<string[]>([]);
  const [errors, setErrors] = useState<number>(0);
  const [isStarted, setIsStarted] = useState<boolean>(false);

  const [keyStats, setKeyStats] = useState<
    Record<string, { pressed: number; errors: number }>
  >({});

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === " " || e.key === "Spacebar") {
        e.preventDefault();
      }
      const key = e.key;
      const expected = passage[currentIndex];
      if (!isStarted) {
        setIsStarted(true);
      }
      if (key === "Backspace") {
        if (currentIndex === 0) return;
        const deletedChar = typed[currentIndex - 1];
        const expectedChar = passage[currentIndex - 1];
        if (deletedChar !== expectedChar) {
          setErrors((err) => Math.max(0, err - 1));
          setKeyStats((prev) => ({
            ...prev,
            [deletedChar]: {
              pressed: (prev[deletedChar]?.pressed ?? 0) + 1,
              errors: Math.max(0, (prev[deletedChar]?.errors ?? 1) - 1),
            },
          }));
        }

        setCurrentIndex((curr) => curr - 1);
        setTyped((prev) => prev.slice(0, -1));
        return;
      }
      if (key.length !== 1) return;

      if (currentIndex >= passage.length) return;

      const isError = key !== expected;
      if (isError) setErrors((e) => e + 1);
      setKeyStats((prev) => ({
        ...prev,
        [key]: {
          pressed: (prev[key]?.pressed ?? 0) + 1,
          errors: (prev[key]?.errors ?? 0) + (isError ? 1 : 0),
        },
      }));
      setTyped((prev) => [...prev, key]);
      setCurrentIndex((i) => i + 1);
    },
    [currentIndex, isStarted, passage, typed],
  );

  const reset = () => {
    setCurrentIndex(0);
    setTyped([]);
    setErrors(0);
    setIsStarted(false);
    setKeyStats({});
  };
  return {
    currentIndex,
    isStarted,
    reset,
    handleKeyDown,
    errors,
    typed,
    keyStats,
  };
}
