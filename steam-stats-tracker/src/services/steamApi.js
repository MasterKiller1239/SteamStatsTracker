import axios from 'axios';

const API_URL = 'https://localhost:7051/api/steam';

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const fetchSteamStats = async (steamId) => {
  const response = await axios.get(`${API_URL}/stats/${steamId}`, {
    headers: getAuthHeader()
  });
  console.log('Fetched stats:', response.data);
  return response.data;
};

export const fetchSteamStatsHistory = async (steamId) => {
  const response = await axios.get(`${API_URL}/stats/history/${steamId}`, {
    headers: getAuthHeader()
  });
  return response.data;
};
