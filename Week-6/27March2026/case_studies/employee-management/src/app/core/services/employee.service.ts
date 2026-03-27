import { Injectable } from '@angular/core';
import { LoggerService } from './logger.service';

// NOT providedIn: 'root' — provided at AppComponent level (Level 2 of the injector hierarchy)
@Injectable()
export class EmployeeService {
  employees = [
    { id: 1, name: 'John', role: 'Developer' },
    { id: 2, name: 'Jane', role: 'Manager' }
  ];

  // Receives the ROOT LoggerService instance injected from AppComponent's injector
  constructor(private logger: LoggerService) {
    this.logger.log('EmployeeService instantiated at AppComponent level');
  }

  getEmployees() {
    return this.employees;
  }

  getEmployeeById(id: number) {
    return this.employees.find(e => e.id === id);
  }

  addEmployee(emp: any) {
    this.employees.push(emp);
    this.logger.log(`Employee added: ${emp.name}`);
  }

  updateEmployee(updatedEmp: any) {
    const index = this.employees.findIndex(e => e.id === updatedEmp.id);
    if (index !== -1) {
      this.employees[index] = { ...updatedEmp };
      this.logger.log(`Employee updated: ${updatedEmp.name}`);
    }
  }

  deleteEmployee(id: number) {
    this.employees = this.employees.filter(e => e.id !== id);
    this.logger.log(`Employee deleted: id=${id}`);
  }

  searchEmployees(term: string) {
    return this.employees.filter(e => 
      e.name.toLowerCase().includes(term.toLowerCase()) ||
      e.role.toLowerCase().includes(term.toLowerCase())
    );
  }
}
