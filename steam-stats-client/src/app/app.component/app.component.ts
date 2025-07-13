import { Component } from '@angular/core';
import { SteamUserStatsDto } from '../models/steam-user-stats.model';
import { UserSearchComponent } from "../components/user-search.component/user-search.component";
import { StatsChartComponent } from "../components/stats-chart.component/stats-chart.component";
import { CompareViewComponent } from "../components/compare-view.component/compare-view.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [UserSearchComponent, StatsChartComponent, CompareViewComponent]
})
export class AppComponent {
  selectedUserStatsHistory: SteamUserStatsDto[] = [];
  comparedUsersStats: SteamUserStatsDto[][] = [];

  onUserStatsHistoryLoaded(stats: SteamUserStatsDto[]) {
    this.selectedUserStatsHistory = stats;
  }

  onCompareUsersLoaded(statsList: SteamUserStatsDto[][]) {
    this.comparedUsersStats = statsList;
  }
}
