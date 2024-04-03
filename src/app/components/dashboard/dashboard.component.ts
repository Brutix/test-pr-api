import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  assessments: any[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.loadUserAssessments();
  }

  loadUserAssessments(): void {
    this.apiService.getUserAssessments().subscribe(
      (data: any[]) => {
        this.assessments = data;
      },
      error => {
        console.error('Error fetching user assessments:', error);
      }
    );
  }

}
