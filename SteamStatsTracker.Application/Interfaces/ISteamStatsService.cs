using SteamStatsTracker.Application.DTOs;

namespace SteamStatsTracker.Application.Interfaces
{
    public interface ISteamStatsService
    {
        Task<SteamUserStatsDto> FetchAndSaveStatsAsync(string steamId);
        Task<List<SteamUserStatsDto>> GetStatsHistoryAsync(string steamId);

    }

}
