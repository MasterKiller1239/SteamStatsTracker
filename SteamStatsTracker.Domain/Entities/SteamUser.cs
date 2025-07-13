namespace SteamStatsTracker.Domain.Entities
{
    public class SteamUser
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public string SteamId { get; set; } = null!;
        public List<SteamUserStats> StatsHistory { get; set; } = new();
    }
}
