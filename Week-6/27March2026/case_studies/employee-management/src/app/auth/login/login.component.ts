import { Component } from '@angular/core';
import { Router} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  template:`
  <h2>Login</h2>
  <input [(ngModel)]="username" placeholder="Username">
  <input [(ngModel)]="password" type="password" placeholder="Password">
  <button (click)="login()">Login</button>
  `
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    if(this.authService.login(this.username, this.password)) {
        this.router.navigate(['/employees']);
      } else {
        alert('Invalid credentials');
      }
    }

}


