import React from 'react';

const SteamStats = ({ stats }) => {
  if (!stats) return null;

  return (
    <div className="p-6 bg-[#1b2838] text-white rounded shadow mt-4">
      <h2 className="text-2xl font-bold mb-4 text-[#66c0f4]">Aktualne Statystyki</h2>
      <ul className="space-y-2 text-lg">
        <li><strong>Steam ID:</strong> {stats.steamId}</li>
        <li><strong>Data pobrania:</strong> {new Date(stats.dateCollected).toLocaleString()}</li>
        <li><strong>Gier ogółem:</strong> {stats.totalGames}</li>
        <li><strong>Czas gry (h):</strong> {(stats.playtimeForever).toFixed(1)}</li>
        <li><strong>Poziom Steam:</strong> {stats.steamLevel}</li>
        <li><strong>Odznaki:</strong> {stats.badgeCount}</li>
      </ul>
    </div>
  );
};

export default SteamStats;
