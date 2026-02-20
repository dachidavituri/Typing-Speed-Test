import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";
import type { Props } from "./index.types";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

export default function StatsChart({ history }: Props) {
  const labels = history.map((h) => new Date(h.date).toLocaleTimeString());
  const last10 = history.slice(-10);

  const data = {
    labels,
    datasets: [
      {
        label: "WPM",
        data: last10.map((h) => h.wpm),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
      },
      {
        label: "Accuracy %",
        data: last10.map((h) => h.accuracy),
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" as const },
      title: {
        display: true,
        text: "Typing History",
      },
    },
  };

  return <Bar data={data} options={options} />;
}
