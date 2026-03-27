import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  template: `
  <nav>
    <a routerLink="/employees">Employees</a> |
    <a routerLink="/login">Login</a>
    <span *ngIf="authService.isAuthenticated()"> | <button (click)="logout()">Logout</button></span>
  </nav>
  `
})
export class NavbarComponent {
  constructor(public authService: AuthService, private router: Router) {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
