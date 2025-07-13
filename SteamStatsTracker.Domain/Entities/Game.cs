using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SteamStatsTracker.Domain.Entities
{
    public class Game
    {
        public int AppId { get; set; } // PRIMARY KEY
        public string Name { get; set; } = null!;
    }
}
