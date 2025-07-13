
using Microsoft.AspNetCore.Mvc;
using SteamStatsTracker.Application.Interfaces;
namespace SteamStatsTracker.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SteamUserStatsController : ControllerBase
    {
        private readonly ISteamStatsService _steamStatsService;

        public SteamUserStatsController(ISteamStatsService steamStatsService)
        {
            _steamStatsService = steamStatsService;
        }

        [HttpGet("user/{steamId}")]
        public async Task<IActionResult> GetStatsHistory(string steamId)
        {
            var history = await _steamStatsService.GetStatsHistoryAsync(steamId);

            if (history == null || !history.Any())
                return NotFound($"No stats found for Steam ID: {steamId}");

            return Ok(history);
        }
    }
}
