import React, { useState } from 'react';
import SteamSearch from './components/SteamSearch';
import SteamStats from './components/SteamStats';
import SteamStatsHistory from './components/SteamStatsHistory';
import { fetchSteamStats, fetchSteamStatsHistory } from './services/steamApi';

const App = () => {
  const [stats, setStats] = useState(null);
  const [history, setHistory] = useState([]);

  const handleSearch = async (steamId) => {
    try {
      const statsData = await fetchSteamStats(steamId);
      setStats(statsData);

      const historyData = await fetchSteamStatsHistory(steamId);
      setHistory(historyData);
    } catch (error) {
      console.error('Error fetching stats:', error);
      setStats(null);
      setHistory([]);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-8">
      <h1 className="text-2xl font-bold text-center mb-4">Steam Stats Tracker</h1>
      <SteamSearch onSearch={handleSearch} />
      <SteamStats stats={stats} />
      <SteamStatsHistory history={history} />
    </div>
  );
};

export default App;
