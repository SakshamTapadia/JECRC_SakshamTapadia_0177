import { Component, ViewChild } from '@angular/core';
import { TaskFormComponent } from './task-form/task-form.component';
import { TaskListComponent } from './task-list/task-list.component';
import { Task } from './task.model';

@Component({
  selector: 'app-root',
  imports: [TaskFormComponent, TaskListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  @ViewChild(TaskListComponent) taskList!: TaskListComponent;

  onTaskAdded(task: Task): void {
    this.taskList.addTaskToList(task);
  }
}
