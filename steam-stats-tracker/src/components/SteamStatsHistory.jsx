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
  const sortedHistory = [...history].sort((a, b) => new Date(a.dateCollected) - new Date(b.dateCollected));
  const dates = sortedHistory.map(entry => new Date(entry.dateCollected).toLocaleDateString());
  const playtimes = sortedHistory.map(entry => (entry.playtimeForever).toFixed(1)); // hours

  const data = {
    labels: dates,
    datasets: [
      {
        label: 'Czas gry (h)',
        data: playtimes,
        fill: false,
        borderColor: '#66c0f4',
        backgroundColor: '#66c0f4',
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: { color: '#ffffff' }
      },
      tooltip: {
        backgroundColor: '#2a475e',
        titleColor: '#66c0f4',
        bodyColor: '#ffffff'
      }
    },
    scales: {
      x: {
        ticks: { color: '#ffffff' },
        grid: { color: '#2a475e' }
      },
      y: {
        ticks: { color: '#ffffff' },
        grid: { color: '#2a475e' }
      }
    }
  };

  return (
    <div className="p-6 bg-[#1b2838] text-white mt-4 rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-[#66c0f4]">Historia Statystyk</h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default SteamStatsHistory;
