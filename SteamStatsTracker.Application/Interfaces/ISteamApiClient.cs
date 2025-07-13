using SteamStatsTracker.Application.DTOs;

namespace SteamStatsTracker.Application.Interfaces;

public interface ISteamApiClient
{
    Task<SteamUserStatsDto> GetUserStatsAsync(string steamId);
}
