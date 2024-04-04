import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ChartType } from 'angular-google-charts';





@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  assessments: any[] = [];
  graphData: any;
  graphDataArray: any;
  assessmentId: number = 1;

  columnNames = ['Browser', 'Percentage'];
  options = {
    colors: ['#e0440e', '#e6693e', '#ec8f6e', '#f3b49f', '#f6c7b6'], is3D: true
  };
  charData = {
    type: ChartType.BarChart,

    // data : [
    //
    //   ['Firefox', 45.0],
    //   ['IE', 26.8],
    //   ['Chrome', 12.8],
    //   ['Safari', 8.5],
    //   ['Opera', 6.2],
    //   ['Others', 0.7]
    // ],
    chartColumns: ['Books', 'Sell'],
    width: 1000,
    height: 400
  }


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
        console.log(data);
        this.graphDataArray = Object.entries(this.graphData.data).map(([key, value]) => [key, value]);
        console.log(this.graphDataArray);

      },
      (error) => {
        console.error('Помилка при отриманні даних графіка:', error);
      }

    );

  }
}
