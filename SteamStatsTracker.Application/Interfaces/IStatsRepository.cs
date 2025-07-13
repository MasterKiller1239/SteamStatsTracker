using SteamStatsTracker.Domain.Entities;

namespace SteamStatsTracker.Application.Interfaces
{
    public interface IStatsRepository
    {
        Task SaveUserStatsAsync(SteamUserStats stats);
        Task<SteamUserStats?> GetLatestStatsBySteamIdAsync(string steamId);
        Task<List<SteamUserStats>> GetStatsHistoryAsync(string steamId);
    }
}
