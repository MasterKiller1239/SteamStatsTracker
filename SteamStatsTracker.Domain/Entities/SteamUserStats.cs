using System.ComponentModel.DataAnnotations;

namespace SteamStatsTracker.Domain.Entities;

public class SteamUserStats
{
    [Key] 
    public Guid Id { get; set; } = Guid.NewGuid();
    public string SteamId { get; set; }
    public DateTime DateCollected { get; set; }
    public double PlaytimeForever { get; set; }
    public int TotalGames { get; set; }
    public int SteamLevel { get; set; }
    public int BadgeCount { get; set; }

    public string SteamUserId { get; set; }
    public SteamUser SteamUser { get; set; } = null!;

    public List<OwnedGame> Games { get; set; } = new();
}
