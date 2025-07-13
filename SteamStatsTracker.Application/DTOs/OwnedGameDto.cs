using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SteamStatsTracker.Application.DTOs
{
    public class OwnedGameDto
    {
        public int AppId { get; set; }
        public required string Name { get; set; }
        public double PlaytimeForever { get; set; }
    }
}
