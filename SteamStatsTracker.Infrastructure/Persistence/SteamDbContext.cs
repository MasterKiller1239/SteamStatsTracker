using Microsoft.EntityFrameworkCore;
using SteamStatsTracker.Domain.Entities;
namespace SteamStatsTracker.Infrastructure.Persistence
{
    public class SteamDbContext : DbContext
    {
        public SteamDbContext(DbContextOptions<SteamDbContext> options)
               : base(options)
        {
        }

        public DbSet<SteamUser> SteamUsers { get; set; }
        public DbSet<SteamUserStats> SteamUserStats { get; set; }
        public DbSet<OwnedGame> OwnedGames { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // SteamUser
            modelBuilder.Entity<SteamUser>(entity =>
            {
                entity.HasKey(u => u.Id); 

                entity.HasIndex(u => u.SteamId).IsUnique();
                entity.Property(u => u.SteamId).IsRequired();
            });

            // SteamUserStats
            modelBuilder.Entity<SteamUserStats>(entity =>
            {
                entity.HasKey(s => s.Id); 
                entity.Property(s => s.SteamId).IsRequired(); 

                entity.HasOne(s => s.SteamUser)
                      .WithMany(u => u.StatsHistory)
                      .HasForeignKey(s => s.SteamUserId)
                      .IsRequired()
                      .OnDelete(DeleteBehavior.Cascade);
            });

            // OwnedGame
            modelBuilder.Entity<OwnedGame>(entity =>
            {
                entity.HasKey(g => g.Id); // np. Guid

                entity.HasOne(g => g.SteamUserStats)
                      .WithMany(s => s.Games)
                      .HasForeignKey(g => g.SteamUserStatsId)
                      .IsRequired()
                      .OnDelete(DeleteBehavior.Cascade);
            });
        }

    }

}
