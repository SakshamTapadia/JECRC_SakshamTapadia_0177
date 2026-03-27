import { Component } from '@angular/core';
import { EmployeeService } from '../../core/services/employee.service';
import { LoggerService } from '../../core/services/logger.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  // Level 3: own LoggerService instance — different from root and other employee components
  providers: [LoggerService],
  template: `
    <h2>Employee List</h2>
    <input [(ngModel)]="searchTerm" (input)="onSearch()" placeholder="Search by name or role" />
    <button (click)="goToAdd()">Add Employee</button>
    <ul>
      <li *ngFor="let emp of filteredEmployees">
        {{ emp.name }} - {{ emp.role }}
        <button (click)="view(emp.id)">View</button>
        <button (click)="edit(emp.id)">Edit</button>
        <button (click)="delete(emp.id)">Delete</button>
      </li>
    </ul>
    <p *ngIf="filteredEmployees.length === 0">No employees found.</p>
  `
})
export class EmployeeListComponent {
  employees: any[] = [];
  filteredEmployees: any[] = [];
  searchTerm = '';

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private logger: LoggerService  // receives component-level instance (Level 3)
  ) {
    this.logger.log('EmployeeListComponent initialized');
    this.employees = this.employeeService.getEmployees();
    this.filteredEmployees = this.employees;
  }

  onSearch() {
    if (this.searchTerm.trim()) {
      this.filteredEmployees = this.employeeService.searchEmployees(this.searchTerm);
    } else {
      this.filteredEmployees = this.employeeService.getEmployees();
    }
  }

  view(id: number) {
    this.router.navigate(['/employees', id]);
  }

  edit(id: number) {
    this.router.navigate(['/employees', id, 'edit']);
  }

  delete(id: number) {
    this.logger.log(`Deleting employee id=${id}`);
    this.employeeService.deleteEmployee(id);
    this.filteredEmployees = this.employeeService.getEmployees();
    this.employees = this.filteredEmployees;
  }

  goToAdd() {
    this.router.navigate(['/employees/add']);
  }
}
