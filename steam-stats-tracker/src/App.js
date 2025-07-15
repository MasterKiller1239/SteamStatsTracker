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
      setHistory(historyData);
    } catch (error) {
      console.error('Błąd pobierania danych:', error);
      setStats(null);
      setHistory([]);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-8">
      <h1 className="text-2xl font-bold text-center mb-4">Steam Stats Tracker</h1>

      {!isAuthenticated ? (
        <div className="mb-6 text-center">
          <input
            className="border px-2 py-1 mr-2"
            placeholder="Login"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            className="border px-2 py-1 mr-2"
            placeholder="Hasło"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            onClick={handleLogin}
            className="bg-blue-500 text-white px-3 py-1 rounded"
          >
            Zaloguj
          </button>
        </div>
      ) : (
        <>
          <div className="mb-4 text-right">
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Wyloguj
            </button>
          </div>
          <SteamSearch onSearch={handleSearch} />
          <SteamStats stats={stats} />
          <SteamStatsHistory history={history} />
        </>
      )}
    </div>
  );
};

export default App;
