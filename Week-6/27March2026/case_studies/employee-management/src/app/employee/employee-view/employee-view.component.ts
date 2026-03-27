import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../core/services/employee.service';
import { LoggerService } from '../../core/services/logger.service';

@Component({
  selector: 'app-employee-view',
  standalone: true,
  imports: [CommonModule],
  // Level 3: own LoggerService instance — separate from all other components
  providers: [LoggerService],
  template: `
    <h2>Employee Details</h2>
    <div *ngIf="!employee">Employee not found.</div>
    <div *ngIf="employee">
      <p><strong>ID:</strong> {{ employee.id }}</p>
      <p><strong>Name:</strong> {{ employee.name }}</p>
      <p><strong>Role:</strong> {{ employee.role }}</p>
      <button (click)="edit()">Edit</button>
      <button (click)="back()">Back to List</button>
    </div>
  `
})
export class EmployeeViewComponent implements OnInit {
  employee: any = null;

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
      this.logger.log(`EmployeeViewComponent loaded employee id=${id}`);
    } else {
      this.logger.warn(`Employee id=${id} not found`);
    }
  }

  edit() {
    this.router.navigate(['/employees', this.employee.id, 'edit']);
  }

  back() {
    this.router.navigate(['/employees']);
  }
}
