import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../task.service';
import { Task } from '../task.model';

@Component({
  selector: 'app-task-list',
  imports: [FormsModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent implements OnInit {

  tasks: Task[] = [];
  searchTerm: string = '';
  editingTaskId: number | null = null;
  editTitle: string = '';
  message: string = '';

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe({
      next: (tasks) => (this.tasks = tasks),
      error: () => (this.message = 'Failed to load tasks.')
    });
  }

  onSearch(): void {
    if (!this.searchTerm.trim()) {
      this.loadTasks();
      return;
    }
    this.taskService.searchTasks(this.searchTerm).subscribe({
      next: (tasks) => (this.tasks = tasks),
      error: () => (this.message = 'Search failed.')
    });
  }

  toggleCompleted(task: Task): void {
    this.taskService.updateTaskStatus(task.id!, { completed: !task.completed }).subscribe({
      next: () => {
        task.completed = !task.completed;
        this.message = `Task "${task.title}" status updated.`;
      },
      error: () => (this.message = 'Failed to update status.')
    });
  }

  startEdit(task: Task): void {
    this.editingTaskId = task.id!;
    this.editTitle = task.title;
  }

  saveEdit(task: Task): void {
    const updated: Task = { ...task, title: this.editTitle };
    this.taskService.updateTask(task.id!, updated).subscribe({
      next: () => {
        task.title = this.editTitle;
        this.editingTaskId = null;
        this.message = 'Task updated successfully.';
      },
      error: () => (this.message = 'Failed to update task.')
    });
  }

  cancelEdit(): void {
    this.editingTaskId = null;
    this.editTitle = '';
  }

  deleteTask(task: Task): void {
    this.taskService.deleteTask(task.id!).subscribe({
      next: () => {
        this.tasks = this.tasks.filter(t => t.id !== task.id);
        this.message = `Task "${task.title}" deleted.`;
      },
      error: () => (this.message = 'Failed to delete task.')
    });
  }

  addTaskToList(task: Task): void {
    this.tasks.unshift(task);
  }
}
