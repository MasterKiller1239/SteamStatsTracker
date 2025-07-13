using Microsoft.EntityFrameworkCore;
using SteamStatsTracker.Application.Interfaces;
using SteamStatsTracker.Domain.Entities;
using SteamStatsTracker.Infrastructure.Persistence;

namespace SteamStatsTracker.Infrastructure.Repositories
{
    public class StatsRepository : IStatsRepository
    {
        private readonly SteamDbContext _context;

        public StatsRepository(SteamDbContext context)
        {
            _context = context;
        }

        public async Task SaveUserStatsAsync(SteamUserStats stats)
        {
            if (stats == null)
                throw new ArgumentNullException(nameof(stats));


            var steamUserId = stats.SteamUser.SteamId;

            var user = await _context.SteamUsers
                .FirstOrDefaultAsync(u => u.SteamId == steamUserId);

            if (user == null)
            {
                user = new SteamUser
                {
                    Id = Guid.NewGuid().ToString(),
                    SteamId = steamUserId,
                };
                _context.SteamUsers.Add(user);
                await _context.SaveChangesAsync(); 
            }

            stats.SteamUserId = user.Id;
            stats.SteamUser = user;

            _context.SteamUserStats.Add(stats);
            await _context.SaveChangesAsync();
        }


        public async Task<SteamUserStats?> GetLatestStatsBySteamIdAsync(string steamId)
        {
            return await _context.SteamUserStats
                .Include(s => s.Games)
                .Where(s => s.SteamId.ToString() == steamId)
                .OrderByDescending(s => s.DateCollected)
                .FirstOrDefaultAsync();
        }

        public async Task<List<SteamUserStats>> GetStatsHistoryAsync(string steamId)
        {
            //return await _context.SteamUserStats
            //    .Include(s => s.Games)
            //    .Where(s => s.SteamId.ToString() == steamId)
            //    .OrderByDescending(s => s.DateCollected)
            //    .ToListAsync();
                return await _context.SteamUserStats
                    .Where(s => s.SteamId == steamId)
                    .OrderByDescending(s => s.DateCollected)
                    .Include(s => s.Games)
                    .ToListAsync();
        }
    }
}
