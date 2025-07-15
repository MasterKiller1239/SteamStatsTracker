import React, { useState } from 'react';
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

// 🟢 HOOK poza warunkiem!
const SteamStatsHistory = ({ history }) => {
  const [selectedMetric, setSelectedMetric] = useState('playtimeForever');

  if (!history || history.length === 0) return null;

  const sortedHistory = [...history].sort(
    (a, b) => new Date(a.dateCollected) - new Date(b.dateCollected)
  );

  const dates = sortedHistory.map(entry =>
    new Date(entry.dateCollected).toLocaleDateString()
  );

  const metricLabels = {
    playtimeForever: 'Czas gry (h)',
    totalGames: 'Liczba gier',
    steamLevel: 'Poziom Steam',
    badgeCount: 'Odznaki',
  };

  const values = sortedHistory.map(entry => {
    return entry[selectedMetric];
  });

  const data = {
    labels: dates,
    datasets: [
      {
        label: metricLabels[selectedMetric],
        data: values,
        fill: false,
        borderColor: '#66c0f4',
        backgroundColor: '#66c0f4',
        tension: 0.3,
      },
    ],
  };

  return (
    <div className="p-4 bg-white dark:bg-gray-800 mt-4 rounded shadow">
      <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
        Historia statystyk
      </h2>

      <div className="mb-4">
        <label className="text-gray-800 dark:text-gray-200 mr-2">
          Wybierz metrykę:
        </label>
        <select
          value={selectedMetric}
          onChange={(e) => setSelectedMetric(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="playtimeForever">Czas gry (h)</option>
          <option value="totalGames">Liczba gier</option>
          <option value="steamLevel">Poziom Steam</option>
          <option value="badgeCount">Odznaki</option>
        </select>
      </div>

      <Line data={data} />
    </div>
  );
};

export default SteamStatsHistory;
