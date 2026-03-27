import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { EmployeeListComponent } from './employee/employee-list/employee-list.component';
import { EmployeeAddComponent } from './employee/employee-add/employee-add.component';
import { EmployeeEditComponent } from './employee/employee-edit/employee-edit.component';
import { EmployeeViewComponent } from './employee/employee-view/employee-view.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'employees', component: EmployeeListComponent, canActivate: [authGuard] },
  { path: 'employees/add', component: EmployeeAddComponent, canActivate: [authGuard] },
  { path: 'employees/:id', component: EmployeeViewComponent, canActivate: [authGuard] },
  { path: 'employees/:id/edit', component: EmployeeEditComponent, canActivate: [authGuard] },
  { path: '', redirectTo: '/employees', pathMatch: 'full' }
];