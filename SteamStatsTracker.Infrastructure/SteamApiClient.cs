using Microsoft.Extensions.Configuration;
using SteamStatsTracker.Application.DTOs;
using SteamStatsTracker.Application.Interfaces;
using System.Linq;
using System.Net.Http.Json;
using System.Text.Json;

namespace SteamStatsTracker.Infrastructure;

public class SteamApiClient : ISteamApiClient
{
    private readonly HttpClient _httpClient;
    private readonly string _apiKey;

    public SteamApiClient(HttpClient httpClient, IConfiguration configuration)
    {
        _httpClient = httpClient;
        _apiKey = configuration["Steam:ApiKey"] ?? throw new Exception("Steam API key not configured.");
    }

    public async Task<SteamUserStatsDto?> GetUserStatsAsync(string steamIdOrVanityUrl)
    {
        string steamId = steamIdOrVanityUrl;

        // Jeśli steamId nie wygląda na liczbowy SteamID64 – próbujemy rozwiązać vanityURL
        if (!ulong.TryParse(steamIdOrVanityUrl, out _))
        {
            var vanityUrl = $"https://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key={_apiKey}&vanityurl={steamIdOrVanityUrl}";
            var vanityResponse = await _httpClient.GetFromJsonAsync<JsonDocument>(vanityUrl);
            var resolved = vanityResponse?.RootElement.GetProperty("response");

            if (resolved?.GetProperty("success").GetInt32() == 1)
            {
                steamId = resolved?.GetProperty("steamid").GetString();
            }
            else
            {
                return null;
            }
        }

        var stats = new SteamUserStatsDto
        {
            SteamId = steamId,
            DateCollected = DateTime.UtcNow
        };

        // 1. GetOwnedGames
        var gamesResponse = await _httpClient.GetFromJsonAsync<JsonDocument>(
            $"http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key={_apiKey}&steamid={steamId}&include_appinfo=true&include_played_free_games=true&format=json");

        var responseObj = gamesResponse?.RootElement.GetProperty("response");
        var games = responseObj?.TryGetProperty("games", out var gamesElem) == true ? gamesElem : default;

        stats.TotalGames = responseObj?.GetProperty("game_count").GetInt32() ?? 0;
        if (games.ValueKind == JsonValueKind.Array)
        {
            foreach (var game in games.EnumerateArray())
            {
                var playtime = Math.Round((double)game.GetProperty("playtime_forever").GetInt32() / 60, 2);
                stats.Games.Add(new OwnedGameDto
                {
                    AppId = game.GetProperty("appid").GetInt32(),
                    Name = game.GetProperty("name").GetString() ?? "Unknown",
                    PlaytimeForever = playtime
                });
                stats.PlaytimeForever += playtime;
            }
        }

        // 2. GetSteamLevel
        var levelResponse = await _httpClient.GetFromJsonAsync<JsonDocument>(
            $"http://api.steampowered.com/IPlayerService/GetSteamLevel/v1/?key={_apiKey}&steamid={steamId}");
        responseObj = levelResponse?.RootElement.GetProperty("response");
        stats.SteamLevel = responseObj?.GetProperty("player_level").GetInt32() ?? 0;

        // 3. GetBadges
        var badgesResponse = await _httpClient.GetFromJsonAsync<JsonDocument>(
            $"http://api.steampowered.com/IPlayerService/GetBadges/v1/?key={_apiKey}&steamid={steamId}");
        responseObj = badgesResponse?.RootElement.GetProperty("response");

        if (responseObj?.TryGetProperty("badges", out var badges) == true && badges.ValueKind == JsonValueKind.Array)
        {
            stats.BadgeCount = badges.GetArrayLength();
        }
        else
        {
            stats.BadgeCount = 0;
        }

        return stats;
    }

}
