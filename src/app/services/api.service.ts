import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password });
  }

  getUserAssessments(): Observable<any> {
    return this.http.get(`${this.apiUrl}/userassessments`);
  }

  getGraphData(assessmentId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/userassessments/graph?id=${assessmentId}`);
  }

  getUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/admin/users`);
  }
}
