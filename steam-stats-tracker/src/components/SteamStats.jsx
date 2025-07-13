import React from 'react';

const SteamStats = ({ stats }) => {
  if (!stats) return null;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Current Stats</h2>
      <ul className="list-disc ml-6">
        <li>Games Owned: {stats.gamesOwned}</li>
        <li>Perfect Games: {stats.perfectGames}</li>
        <li>Achievements: {stats.totalAchievements}</li>
        <li>Steam Level: {stats.level}</li>
        <li>Badges: {stats.badgeCount}</li>
        <li>Community Awards: {stats.communityAwards}</li>
      </ul>
    </div>
  );
};

export default SteamStats;
