using SteamStatsTracker.Domain.Entities;
namespace SteamStatsTracker.Infrastructure.Entities
{
    public class SteamUser
    {
        public int Id { get; set; }
        public required string SteamId { get; set; }

        public List<SteamUserStats> StatsHistory { get; set; } = new();
    }
}
