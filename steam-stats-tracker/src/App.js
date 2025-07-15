import React, { useState } from 'react';
import SteamSearch from './components/SteamSearch';
import SteamStats from './components/SteamStats';
import SteamStatsHistory from './components/SteamStatsHistory';
import { fetchSteamStats, fetchSteamStatsHistory } from './services/steamApi';

const App = () => {
  const [stats, setStats] = useState(null);
  const [history, setHistory] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  const handleLogin = async () => {
    try {
      const response = await fetch('https://localhost:7051/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        setIsAuthenticated(true);
      } else {
        alert('Nieprawidłowy login lub hasło');
      }
    } catch (err) {
      console.error('Błąd logowania:', err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setStats(null);
    setHistory([]);
  };

  const handleSearch = async (steamId) => {
    try {
      const statsData = await fetchSteamStats(steamId);
      setStats(statsData);
      const historyData = await fetchSteamStatsHistory(steamId);
      console.log('Fetched history:', historyData);
      setHistory(historyData);
    } catch (error) {
      console.error('Błąd pobierania danych:', error);
      setStats(null);
      setHistory([]);
    }
  };

  return (
    <div className="min-h-screen bg-[#171a21] text-white font-sans p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-[#66c0f4]">
          Steam Stats Tracker
        </h1>

        {!isAuthenticated ? (
          <div className="mb-10 text-center bg-[#1b2838] p-6 rounded shadow-lg">
            <input
              className="bg-[#2a475e] text-white border-none px-3 py-2 mr-2 rounded focus:outline-none"
              placeholder="Login"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              className="bg-[#2a475e] text-white border-none px-3 py-2 mr-2 rounded focus:outline-none"
              placeholder="Hasło"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              onClick={handleLogin}
              className="bg-[#66c0f4] text-black px-4 py-2 rounded hover:bg-[#417a9b]"
            >
              Zaloguj
            </button>
          </div>
        ) : (
          <>
            <div className="mb-6 text-right">
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-800 text-white px-4 py-2 rounded"
              >
                Wyloguj
              </button>
            </div>
            <div className="bg-[#1b2838] p-6 rounded shadow-lg">
              <SteamSearch onSearch={handleSearch} />
              <SteamStats stats={stats} />
              <SteamStatsHistory history={history} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default App;
