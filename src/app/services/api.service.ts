import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'x-token': 'QWRtaW5Vc2Vy'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  isLoggedIn(): boolean {
    const accessToken = localStorage.getItem('token');
    return accessToken !== null && !this.isTokenExpired(accessToken);
  }

    private isTokenExpired(token: string): boolean {
        return false;
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password })
  }

  getUserAssessments(): Observable<any> {
    return this.http.get(`${this.apiUrl}/userassessments`, httpOptions);
  }

  getGraphData(assessmentId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/userassessments/graph?id=${assessmentId}`);
  }

  getUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/admin/users`);
  }
}
