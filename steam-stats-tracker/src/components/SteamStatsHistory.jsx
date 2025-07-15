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

  const dates = history.map(entry => new Date(entry.dateCollected).toLocaleDateString());
  const playtimes = history.map(entry => (entry.playtimeForever / 60).toFixed(1)); // hours

  console.log('History dates:', dates);
  console.log('Playtime dataset:', playtimes);

  const data = {
    labels: dates,
    datasets: [
      {
        label: 'Playtime (hrs)',
        data: playtimes,
        fill: false,
        borderColor: 'blue',
        tension: 0.3,
      },
    ],
  };
console.log('dates:', dates);
console.log('playtimes:', playtimes);
  return (
    <div className="p-4 bg-white dark:bg-gray-800 mt-4 rounded shadow">
      <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Stats History</h2>
      <Line data={data} />
    </div>
  );
};

export default SteamStatsHistory;
