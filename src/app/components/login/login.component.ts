import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  error: string = '';

  constructor(private router: Router, private apiService: ApiService) {}

  login(): void {
    this.apiService.login(this.email, this.password)
      .subscribe(
        user => {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.router.navigate(['/dashboard']);
        },
        error => {
          console.error('Login error:', error);
          this.error = 'Invalid email or password';
        }
      );
  }
}
