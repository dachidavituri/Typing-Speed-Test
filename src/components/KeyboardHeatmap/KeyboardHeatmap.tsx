import { KEYS, type Props } from "./index.types";

const getColor = (count: number, max: number) => {
  if (max === 0) return "#1f1f1f";
  const intensity = Math.min(1, count / max);
  return `rgba(0, 255, 0, ${intensity})`;
};

export default function KeyboardHeatmap({ keyStats }: Props) {
  const maxPress = Math.max(
    ...Object.values(keyStats).map((k) => k.pressed || 0),
    0,
  );

  return (
    <div className="mt-6 flex flex-col gap-2">
      {KEYS.map((row, i) => (
        <div key={i} className="flex justify-center gap-1 flex-wrap sm:gap-2">
          {row.map((key) => {
            const stats = keyStats[key] || { pressed: 0, errors: 0 };
            return (
              <div
                key={key}
                className="
                  flex items-center justify-center 
                  aspect-square
                  flex-1
                  min-w-6 max-w-15
                  rounded
                  text-sm sm:text-base
                "
                style={{
                  backgroundColor: getColor(stats.pressed, maxPress),
                  color: stats.errors > 0 ? "red" : "white",
                  border: "1px solid #333",
                  fontWeight: "bold",
                }}
              >
                {key.toUpperCase()}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
