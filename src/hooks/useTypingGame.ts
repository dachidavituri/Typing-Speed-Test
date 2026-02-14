import { useEffect, useState } from "react";
import { useTypingEngine } from "./useTypiningEngine";

interface UseTypingGameProps {
  passage: string;
  mode: string;
  duration: number;
}

export function useTypingGame({ passage, mode, duration }: UseTypingGameProps) {
  const typing = useTypingEngine(passage);

  const [seconds, setSeconds] = useState(mode === "timed" ? duration : 0);
  const [isFinished, setIsFinished] = useState(false);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);

  useEffect(() => {
    if (!typing.isStarted || isFinished) return;

    const interval = setInterval(() => {
      setSeconds((prev) => {
        if (mode === "timed") {
          if (prev <= 1) {
            clearInterval(interval);
            setIsFinished(true);
            return 0;
          }
          return prev - 1;
        }
        return prev + 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [typing.isStarted, isFinished, mode]);

  useEffect(() => {
    if (mode === "passage" && typing.currentIndex === passage.length) {
      setIsFinished(true);
    }
  }, [typing.currentIndex, mode, passage.length]);

  useEffect(() => {
    if (!isFinished) return;

    const minutes = (mode === "timed" ? duration - seconds : seconds) / 60;
    if (minutes <= 0) return;

    const words = typing.typed.length / 5;
    const calculatedWPM = Math.round(words / minutes);

    const totalTyped = typing.typed.length;
    const correct = totalTyped - typing.errors;
    const calculatedAccuracy =
      totalTyped === 0 ? 100 : Math.round((correct / totalTyped) * 100);

    setWpm(calculatedWPM);
    setAccuracy(calculatedAccuracy);
  }, [isFinished, seconds, duration, mode, typing.errors, typing.typed.length]);

  const restart = () => {
    typing.reset();
    setIsFinished(false);
    setWpm(0);
    setAccuracy(100);
    setSeconds(mode === "timed" ? duration : 0);
  };

  useEffect(() => {
    restart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, duration, passage]);

  const formattedTime = `${Math.floor(seconds / 60)}:${String(
    seconds % 60,
  ).padStart(2, "0")}`;

  return {
    typing,
    wpm,
    accuracy,
    formattedTime,
    isFinished,
    restart,
  };
}
