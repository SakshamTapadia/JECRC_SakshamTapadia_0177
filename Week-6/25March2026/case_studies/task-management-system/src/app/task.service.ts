import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from './task.model';

@Injectable({
  providedIn: 'root' //singleton service avaiable throughout the app
})
export class TaskService {

  private api = 'https://jsonplaceholder.typicode.com/todos';
  constructor(private http: HttpClient) { }

  //GET all tasks
  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.api);
  }
  //GET task by ID
  getTasksById(id: number): Observable<Task> {
    return this.http.get<Task>(`${this.api}/${id}`);
  }
  // Create Task (POST)
  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.api, task);
  }

  // Update Full Task (PUT)
  updateTask(id: number, task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.api}/${task.id}`, task);
  }

  //partial update (PATCH)
  updateTaskStatus(id: number, completed: Partial<Task>): Observable<Task> {
    return this.http.patch<Task>(`${this.api}/${id}`, {
      completed:completed}
    );
  }

  // generic Patch( Resuable)
  updatePartial(id: number, data: Partial<Task>): Observable<Task> {
    return this.http.patch<Task>(`${this.api}/${id}`, data);
  }
  
  // Delete Task (DELETE)
  deleteTask(id: number): Observable<any> {
    return this.http.delete(`${this.api}/${id}`);
  }

  //Search task(API filter)
  searchTasks(term: string): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.api}?q=${term}`);
  }
}
