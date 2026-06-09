import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PollService {
  private apiUrl = 'http://localhost:5213/api/polls';

  constructor(private http: HttpClient) {}

  vote(teamId: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/vote`, { teamId });
  }

  getMyVote(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/my-vote?cb=${new Date().getTime()}`);
  }

  getResults(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/results?cb=${new Date().getTime()}`);
  }
}
