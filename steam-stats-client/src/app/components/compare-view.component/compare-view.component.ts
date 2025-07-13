import { Component } from '@angular/core';
import { SteamApiService } from '../../services/steam-api.service';
import { SteamUserStatsDto } from '../../models/steam-user-stats.model';

@Component({
  selector: 'app-compare-view',
  templateUrl: './compare-view.component.html'
})
export class CompareViewComponent {
  steamId1 = '';
  steamId2 = '';
  history1: SteamUserStatsDto[] = [];
  history2: SteamUserStatsDto[] = [];

  constructor(private api: SteamApiService) {}

  compare() {
    this.api.getStatsHistory(this.steamId1).subscribe(h => this.history1 = h);
    this.api.getStatsHistory(this.steamId2).subscribe(h => this.history2 = h);
  }
}
