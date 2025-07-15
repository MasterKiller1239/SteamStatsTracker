export interface OwnedGame {
  appId: number;
  name: string;
  playtimeForever: number;
}

export interface SteamUserStats {
  steamId: string;
  dateCollected: string; // używamy string, bo JSON zwraca datę jako ISO string
  playtimeForever: number;
  totalGames: number;
  steamLevel: number;
  badgeCount: number;
  games: OwnedGame[];
}
