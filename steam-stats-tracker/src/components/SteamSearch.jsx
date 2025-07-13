import React, { useState } from 'react';

const SteamSearch = ({ onSearch }) => {
  const [steamId, setSteamId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (steamId.trim()) {
      onSearch(steamId.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <input
        type="text"
        value={steamId}
        onChange={(e) => setSteamId(e.target.value)}
        placeholder="Enter Steam ID"
        className="border p-2 mr-2"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2">
        Search
      </button>
    </form>
  );
};

export default SteamSearch;
