import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { EmployeeService } from './core/services/employee.service';

// Level 2: EmployeeService is provided here (AppComponent), not at root.
// All child components share this single EmployeeService instance.
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent],
  providers: [EmployeeService],
  template: `
  <app-navbar></app-navbar>
  <router-outlet></router-outlet>
  `
})
export class AppComponent {
  title = 'employee-management';
}
