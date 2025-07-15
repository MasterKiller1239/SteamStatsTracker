import React from 'react';

const SteamStats = ({ stats }) => {
  if (!stats) return null;

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded shadow mt-4">
      <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Current Stats</h2>
      <ul className="list-disc ml-6 text-gray-800 dark:text-gray-200">
        <li>Steam ID: {stats.steamId}</li>
        <li>Date Collected: {new Date(stats.dateCollected).toLocaleString()}</li>
        <li>Total Games: {stats.totalGames}</li>
        <li>Playtime (hrs): {(stats.playtimeForever / 60).toFixed(1)}</li>
        <li>Steam Level: {stats.steamLevel}</li>
        <li>Badges: {stats.badgeCount}</li>
      </ul>
    </div>
  );
};

export default SteamStats;
