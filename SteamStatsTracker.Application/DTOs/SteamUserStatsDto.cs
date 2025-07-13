namespace SteamStatsTracker.Application.DTOs;

public class SteamUserStatsDto
{
    public required string SteamId { get; set; }
    public DateTime DateCollected { get; set; }
    public double PlaytimeForever { get; set; }
    public int TotalGames { get; set; }
    public int SteamLevel { get; set; }
    public int BadgeCount { get; set; }

    public List<OwnedGameDto> Games { get; set; } = new();
}
