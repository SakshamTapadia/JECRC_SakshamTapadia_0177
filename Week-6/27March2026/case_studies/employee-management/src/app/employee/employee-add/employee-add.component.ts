import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from '../../core/services/employee.service';
import { LoggerService } from '../../core/services/logger.service';

@Component({
  selector: 'app-employee-add',
  standalone: true,
  imports: [FormsModule],
  // Level 3: own LoggerService instance — separate from list's instance
  providers: [LoggerService],
  template: `
    <h2>Add Employee</h2>
    <form (ngSubmit)="onSubmit()">
      <div>
        <label>Name:</label>
        <input [(ngModel)]="name" name="name" required placeholder="Employee name" />
      </div>
      <div>
        <label>Role:</label>
        <input [(ngModel)]="role" name="role" required placeholder="Employee role" />
      </div>
      <button type="submit">Add</button>
      <button type="button" (click)="cancel()">Cancel</button>
    </form>
  `
})
export class EmployeeAddComponent {
  name = '';
  role = '';

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private logger: LoggerService  // receives component-level instance (Level 3)
  ) {
    this.logger.log('EmployeeAddComponent initialized');
  }

  onSubmit() {
    if (!this.name.trim() || !this.role.trim()) {
      alert('Name and Role are required.');
      return;
    }
    const employees = this.employeeService.getEmployees();
    const newId = employees.length > 0 ? Math.max(...employees.map(e => e.id)) + 1 : 1;
    this.logger.log(`Submitting new employee: ${this.name}`);
    this.employeeService.addEmployee({ id: newId, name: this.name.trim(), role: this.role.trim() });
    this.router.navigate(['/employees']);
  }

  cancel() {
    this.router.navigate(['/employees']);
  }
}
