using Microsoft.AspNetCore.Mvc;
using SteamStatsTracker.Application.Interfaces;

namespace SteamStatsTracker.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SteamController : ControllerBase
{
    private readonly ISteamStatsService _steamStatsService;

    public SteamController(ISteamStatsService steamStatsService)
    {
        _steamStatsService = steamStatsService;
    }

    // Endpoint do pobrania danych z API Steama i zapisania ich do bazy
    [HttpGet("stats/{steamId}")]
    public async Task<IActionResult> GetStats(string steamId)
    {
        var stats = await _steamStatsService.FetchAndSaveStatsAsync(steamId);
        if (stats == null)
            return NotFound();
        return Ok(stats);
    }

    // Endpoint do pobrania historii z bazy danych
    [HttpGet("stats/history/{steamId}")]
    public async Task<IActionResult> GetStatsHistory(string steamId)
    {
        var history = await _steamStatsService.GetStatsHistoryAsync(steamId);
        if (history == null)
            return NotFound();
        return Ok(history);
    }
}
