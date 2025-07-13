import { Component, Input } from '@angular/core';
import { SteamUserStatsDto } from '../../models/steam-user-stats.model';

@Component({
  selector: 'app-stats-chart',
  templateUrl: './stats-chart.component.html'
})
export class StatsChartComponent {
  @Input() history: SteamUserStatsDto[] = [];

  get chartData() {
    return [
      {
        label: 'Steam Level',
        data: this.history.map(h => h.steamLevel),
        borderColor: 'blue',
        fill: false
      },
      {
        label: 'Badge Count',
        data: this.history.map(h => h.badgeCount),
        borderColor: 'green',
        fill: false
      },
      {
        label: 'Total Games',
        data: this.history.map(h => h.totalGames),
        borderColor: 'purple',
        fill: false
      }
    ];
  }

  get labels() {
    return this.history.map(h => new Date(h.dateCollected).toLocaleDateString());
  }
}
