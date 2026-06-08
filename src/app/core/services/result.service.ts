import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResultService {
  private adminUrl = 'https://localhost:7198/api/admin';

  constructor(private http: HttpClient) {}

  getSettings(): Observable<any> {
    return this.http.get<any>(`${this.adminUrl}/settings`);
  }

  updateSettings(settings: any): Observable<any> {
    return this.http.put<any>(`${this.adminUrl}/settings`, settings);
  }

  revealResults(): Observable<any> {
    return this.http.put<any>(`${this.adminUrl}/reveal-results`, {});
  }

  hideResults(): Observable<any> {
    return this.http.put<any>(`${this.adminUrl}/hide-results`, {});
  }

  getAllPolls(): Observable<any[]> {
    return this.http.get<any[]>(`${this.adminUrl}/polls`);
  }

  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.adminUrl}/users`);
  }
}
