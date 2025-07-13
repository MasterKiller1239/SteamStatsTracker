export interface OwnedGameDto {
  appId: number;
  name: string;
  playtimeForever: number;
}

export interface SteamUserStatsDto {
  steamId: string;
  dateCollected: string;
  playtimeForever: number;
  totalGames: number;
  steamLevel: number;
  badgeCount: number;
  games: OwnedGameDto[];
}
