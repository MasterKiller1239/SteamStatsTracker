import { Component } from '@angular/core';
import { SteamApiService } from '../../services/steam-api.service';
import { SteamUserStatsDto } from '../../models/steam-user-stats.model';
import { StatsChartComponent } from "../stats-chart.component/stats-chart.component";
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  imports: [StatsChartComponent]
})
export class UserSearchComponent {
  steamId = '';
  history: SteamUserStatsDto[] = [];
  loading = false;

  constructor(private steamApi: SteamApiService) {}

  search() {
    this.loading = true;
    this.steamApi.fetchStats(this.steamId).subscribe({
      next: () => {
        this.steamApi.getStatsHistory(this.steamId).subscribe(data => {
          this.history = data;
          this.loading = false;
        });
      },
      error: () => this.loading = false
    });
  }
}
