using SteamStatsTracker.Application.DTOs;
using SteamStatsTracker.Application.Interfaces;
using SteamStatsTracker.Domain.Entities;

namespace SteamStatsTracker.Application.Services
{
    public class SteamStatsService : ISteamStatsService
    {
        private readonly ISteamApiClient _steamApiClient;
        private readonly IStatsRepository _statsRepository;

        public SteamStatsService(ISteamApiClient steamApiClient, IStatsRepository statsRepository)
        {
            _steamApiClient = steamApiClient;
            _statsRepository = statsRepository;
        }

        public async Task<SteamUserStatsDto> FetchAndSaveStatsAsync(string steamId)
        {
            var dto = await _steamApiClient.GetUserStatsAsync(steamId);

            var stats = new SteamUserStats
            {
                SteamId = dto.SteamId,
                DateCollected = dto.DateCollected,
                SteamLevel = dto.SteamLevel,
                BadgeCount = dto.BadgeCount,
                TotalGames = dto.TotalGames,
                PlaytimeForever = dto.Games.Sum(g => g.PlaytimeForever),
                SteamUser = new SteamUser
                {
                    SteamId = dto.SteamId
                },
                Games = dto.Games.Select(g => new OwnedGame
                {
                    AppId = g.AppId,
                    Name = g.Name,
                    PlaytimeForever = g.PlaytimeForever
                }).ToList()
            };
            await _statsRepository.SaveUserStatsAsync(stats);

            return dto;
        }

        public async Task<List<SteamUserStatsDto>> GetStatsHistoryAsync(string steamId)
        {
            var history = await _statsRepository.GetStatsHistoryAsync(steamId);

            return history.Select(s => new SteamUserStatsDto
            {
                SteamId = s.SteamId,
                DateCollected = s.DateCollected,
                SteamLevel = s.SteamLevel,
                BadgeCount = s.BadgeCount,
                TotalGames = s.TotalGames,
                PlaytimeForever = s.PlaytimeForever,
                Games = s.Games.Select(g => new OwnedGameDto
                {
                    AppId = g.AppId,
                    Name = g.Name,
                    PlaytimeForever = g.PlaytimeForever
                }).ToList()
            }).ToList();
        }
    }
}
