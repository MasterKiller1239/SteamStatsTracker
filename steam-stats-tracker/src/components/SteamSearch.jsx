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
    <form onSubmit={handleSubmit} className="mb-6 text-center">
      <input
        type="text"
        value={steamId}
        onChange={(e) => setSteamId(e.target.value)}
        placeholder="Wprowadź Steam ID"
        className="bg-[#2a475e] text-white px-4 py-2 rounded-l outline-none w-64"
      />
      <button
        type="submit"
        className="bg-[#66c0f4] text-black px-4 py-2 rounded-r hover:bg-[#417a9b]"
      >
        Szukaj
      </button>
    </form>
  );
};

export default SteamSearch;
