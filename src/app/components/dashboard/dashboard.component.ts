import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  assessments: any[] = [];
  graphData: any;
  assessmentId: number = 1;
  chart: any;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.loadUserAssessments();
  }

  loadUserAssessments() {
     this.apiService.getUserAssessments().subscribe(
      (data: any[]) => {
        this.assessments = data;
        console.log(this.assessments)
      },
      error => {
        console.error('Error fetching user assessments:', error);
      }
    );
  }



  showGraph() {
    // Отримати дані графіка з сервера
    this.apiService.getGraphData(this.assessmentId).subscribe(
      (data) => {
        // Прийняти дані графіка та відобразити їх
        this.graphData = data;
        console.log(this.graphData)
      },
      (error) => {
        console.error('Помилка при отриманні даних графіка:', error);
      }
    );
  }
}
