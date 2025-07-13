import axios from 'axios';

const API_URL =  'https://localhost:7051/api/steam';

export const fetchSteamStats = async (steamId) => {
  const response = await axios.get(`${API_URL}/stats/${steamId}`);
  console.log('Fetched stats:', response.data); // Debugging line
  return response.data;
};

export const fetchSteamStatsHistory = async (steamId) => {
  const response = await axios.get(`${API_URL}/stats/history/${steamId}`);
  return response.data;
};
