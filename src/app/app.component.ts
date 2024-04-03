import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements  OnInit{
  title = 'test-pr-api';

  ngOnInit() {
    if (!this.apiService.isLoggedIn()) {
      this.router.navigate(['/login']);
    }
  }

  constructor(private router: Router, private apiService: ApiService){}
}
