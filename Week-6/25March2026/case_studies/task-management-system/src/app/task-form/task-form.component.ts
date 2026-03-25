import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../task.service';
import { Task } from '../task.model';

@Component({
  selector: 'app-task-form',
  imports: [FormsModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css'
})
export class TaskFormComponent {

  @Output() taskAdded = new EventEmitter<Task>();

  newTask: Task = { title: '', completed: false };
  message: string = '';

  constructor(private taskService: TaskService) {}

  onSubmit() {
    if (!this.newTask.title.trim()) {
      this.message = 'Title is required.';
      return;
    }
    this.taskService.addTask(this.newTask).subscribe({
      next: (task) => {
        this.message = `Task "${task.title}" added successfully!`;
        this.taskAdded.emit(task);
        this.newTask = { title: '', completed: false };
      },
      error: () => {
        this.message = 'Failed to add task.';
      }
    });
  }
}
