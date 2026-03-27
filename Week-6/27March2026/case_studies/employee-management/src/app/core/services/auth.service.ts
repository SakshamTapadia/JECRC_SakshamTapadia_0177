import { Injectable } from '@angular/core';
import { LoggerService } from './logger.service';

// Level 1 (Root): AuthService is a root-level singleton.
// It receives the ROOT LoggerService instance (same instance as NavbarComponent).
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;

  constructor(private logger: LoggerService) {
    this.logger.log('AuthService instantiated at root level');
  }

  login(username: string, password: string) {
    if (username === 'admin' && password === 'admin') {
      this.isLoggedIn = true;
      localStorage.setItem('token', 'dummy-token');
      this.logger.log('User logged in');
      return true;
    }
    this.logger.warn('Login failed: invalid credentials');
    return false;
  }

  logout() {
    this.isLoggedIn = false;
    localStorage.removeItem('token');
    this.logger.log('User logged out');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
}
