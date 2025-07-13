import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SteamUserStatsDto } from '../models/steam-user-stats.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SteamApiService {
  private apiUrl = 'http://localhost:5000/api/steam'; // dopasuj do backendu

  constructor(private http: HttpClient) {}

  fetchStats(steamId: string): Observable<SteamUserStatsDto> {
    return this.http.get<SteamUserStatsDto>(`${this.apiUrl}/stats/${steamId}`);
  }

  getStatsHistory(steamId: string): Observable<SteamUserStatsDto[]> {
    return this.http.get<SteamUserStatsDto[]>(`${this.apiUrl}/stats/history/${steamId}`);
  }
}
