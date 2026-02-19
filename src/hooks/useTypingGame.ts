import { useEffect, useState } from "react";
import { useTypingEngine } from "./useTypiningEngine";
import confetti from "canvas-confetti";
import {
  getLocalStats,
  saveLocalStats,
  type LocalStats,
} from "@/utils/localStats";

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
  const [message, setMessage] = useState<string | null>(null);
  const [isNewRecord, setIsNewRecord] = useState(false);

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
    if (mode === "timed" && typing.typed.length === passage.length) {
      setIsFinished(true);
    }
  }, [mode, passage.length, typing.typed.length]);

  useEffect(() => {
    if (!typing.isStarted) return;

    const elapsed = Math.max(
      1,
      mode === "timed" ? duration - seconds : seconds,
    );

    const minutes = elapsed / 60;

    if (minutes <= 0) return;

    const words = typing.typed.length / 5;
    const liveWpm = Math.round(words / minutes);

    const totalTyped = typing.typed.length;
    const correct = totalTyped - typing.errors;
    const liveAccuracy =
      totalTyped === 0 ? 100 : Math.round((correct / totalTyped) * 100);

    setWpm(liveWpm);
    setAccuracy(liveAccuracy);
  }, [
    typing.typed.length,
    typing.errors,
    seconds,
    mode,
    typing.isStarted,
    duration,
  ]);

  useEffect(() => {
    if (!isFinished) return;

    const elapsed = mode === "timed" ? duration - seconds : seconds;

    if (elapsed <= 0) return;
    const minutes = elapsed / 60;
    const words = typing.typed.length / 5;

    const finalWPM = Math.round(words / minutes);

    const totalTyped = typing.typed.length;
    const correct = totalTyped - typing.errors;

    const finalAccuracy =
      totalTyped === 0 ? 100 : Math.round((correct / totalTyped) * 100);

    setWpm(finalWPM);
    setAccuracy(finalAccuracy);

    const stats = getLocalStats();
    const isFirstGame = stats.history.length === 0;
    const beatWPM = finalWPM > stats.bestWPM;

    const updatedStats: LocalStats = {
      bestWPM: beatWPM ? finalWPM : stats.bestWPM,
      bestAccuracy:
        finalAccuracy > stats.bestAccuracy ? finalAccuracy : stats.bestAccuracy,
      history: [
        ...stats.history,
        {
          wpm: finalWPM,
          accuracy: finalAccuracy,
          date: new Date().toISOString(),
        },
      ],
    };

    saveLocalStats(updatedStats);

    if (isFirstGame) {
      setMessage("Baseline Established!");
    } else if (beatWPM) {
      setMessage("High Score Smashed!");
      setIsNewRecord(true);

      confetti({
        particleCount: 160,
        spread: 70,
        origin: { y: 0.6 },
      });
    } else {
      setMessage(null);
      setIsNewRecord(false);
    }
  }, [duration, isFinished, mode, seconds, typing.errors, typing.typed.length]);

  const restart = () => {
    typing.reset();
    setIsFinished(false);
    setWpm(0);
    setAccuracy(100);
    setMessage(null);
    setIsNewRecord(false);
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
    message,
    isNewRecord,
  };
}
