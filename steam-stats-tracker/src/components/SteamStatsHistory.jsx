import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Legend,
  Tooltip,
} from 'chart.js';

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Legend, Tooltip);

const SteamStatsHistory = ({ history }) => {
  if (!history || history.length === 0) return null;

  const dates = history.map(entry => new Date(entry.date).toLocaleDateString());
  const achievements = history.map(entry => entry.totalAchievements);

  const data = {
    labels: dates,
    datasets: [
      {
        label: 'Total Achievements',
        data: achievements,
        fill: false,
        borderColor: 'blue',
      },
    ],
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Stats History</h2>
      <Line data={data} />
    </div>
  );
};

export default SteamStatsHistory;
