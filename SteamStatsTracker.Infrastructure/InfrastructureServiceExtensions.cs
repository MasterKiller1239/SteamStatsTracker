using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using SteamStatsTracker.Application.Interfaces;
using SteamStatsTracker.Infrastructure.Persistence;
using SteamStatsTracker.Infrastructure.Repositories;

namespace SteamStatsTracker.Infrastructure
{
    public static class InfrastructureServiceExtensions
    {
        public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<SteamDbContext>(options =>
                options.UseSqlServer(configuration.GetConnectionString("DefaultConnection")));

            services.AddScoped<IStatsRepository, StatsRepository>();

            return services;
        }
    }
}
