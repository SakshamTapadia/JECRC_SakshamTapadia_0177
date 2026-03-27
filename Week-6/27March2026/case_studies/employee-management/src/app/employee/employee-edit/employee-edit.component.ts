import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../core/services/employee.service';
import { LoggerService } from '../../core/services/logger.service';

@Component({
  selector: 'app-employee-edit',
  standalone: true,
  imports: [FormsModule, CommonModule],
  // Level 3: own LoggerService instance — separate from all other components
  providers: [LoggerService],
  template: `
    <h2>Edit Employee</h2>
    <div *ngIf="!employee">Employee not found.</div>
    <form *ngIf="employee" (ngSubmit)="onSubmit()">
      <div>
        <label>Name:</label>
        <input [(ngModel)]="name" name="name" required />
      </div>
      <div>
        <label>Role:</label>
        <input [(ngModel)]="role" name="role" required />
      </div>
      <button type="submit">Update</button>
      <button type="button" (click)="cancel()">Cancel</button>
    </form>
  `
})
export class EmployeeEditComponent implements OnInit {
  employee: any = null;
  name = '';
  role = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService,
    private logger: LoggerService  // receives component-level instance (Level 3)
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.employee = this.employeeService.getEmployeeById(id);
    if (this.employee) {
      this.name = this.employee.name;
      this.role = this.employee.role;
      this.logger.log(`EmployeeEditComponent loaded employee id=${id}`);
    } else {
      this.logger.warn(`Employee id=${id} not found`);
    }
  }

  onSubmit() {
    if (!this.name.trim() || !this.role.trim()) {
      alert('Name and Role are required.');
      return;
    }
    this.logger.log(`Submitting update for employee id=${this.employee.id}`);
    this.employeeService.updateEmployee({ ...this.employee, name: this.name.trim(), role: this.role.trim() });
    this.router.navigate(['/employees']);
  }

  cancel() {
    this.router.navigate(['/employees']);
  }
}
