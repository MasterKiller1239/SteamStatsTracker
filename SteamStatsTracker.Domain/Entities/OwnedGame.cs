using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SteamStatsTracker.Domain.Entities
{
    public class OwnedGame
    {
        [Key]
        public string Id { get; set; } = Guid.NewGuid().ToString();

        public int AppId { get; set; }
        public string Name { get; set; } = null!;
        public double PlaytimeForever { get; set; }

        public Guid SteamUserStatsId { get; set; }
        public SteamUserStats SteamUserStats { get; set; } = null!;
    }
}
