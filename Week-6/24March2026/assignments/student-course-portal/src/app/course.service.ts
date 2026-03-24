import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

export interface Course {
  id: number;
  title: string;
  instructor: string;
  duration: string;
  description: string;
  category: string;
}

@Injectable({ providedIn: 'root' })
export class CourseService {
  // Mock data — replace baseUrl and use http methods for real API
  private baseUrl = 'https://api.example.com/courses';

  private mockCourses: Course[] = [
    { id: 101, title: 'Angular Fundamentals', instructor: 'Alice Johnson', duration: '8 weeks', description: 'Learn the core concepts of Angular including components, directives, services, and routing.', category: 'Frontend' },
    { id: 102, title: 'TypeScript Deep Dive', instructor: 'Bob Smith', duration: '6 weeks', description: 'Master TypeScript — types, interfaces, generics, decorators, and advanced patterns.', category: 'Language' },
    { id: 103, title: 'Node.js & Express', instructor: 'Carol White', duration: '7 weeks', description: 'Build RESTful APIs with Node.js, Express, and MongoDB from scratch.', category: 'Backend' },
    { id: 104, title: 'React & Redux', instructor: 'David Brown', duration: '9 weeks', description: 'Modern React with hooks, context API, and Redux for state management.', category: 'Frontend' },
    { id: 105, title: 'Python for Data Science', instructor: 'Eva Green', duration: '10 weeks', description: 'Data analysis, visualization, and machine learning with Python, Pandas, and scikit-learn.', category: 'Data Science' },
    { id: 106, title: 'Docker & Kubernetes', instructor: 'Frank Lee', duration: '5 weeks', description: 'Containerize applications with Docker and orchestrate with Kubernetes.', category: 'DevOps' },
  ];

  constructor(private http: HttpClient) {}

  getAllCourses(): Observable<Course[]> {
    // return this.http.get<Course[]>(this.baseUrl);
    return of(this.mockCourses);
  }

  getCourseById(id: string): Observable<Course | undefined> {
    // return this.http.get<Course>(`${this.baseUrl}/${id}`);
    const course = this.mockCourses.find(c => c.id === +id);
    return of(course);
  }

  getFeaturedCourses(): Observable<Course[]> {
    return of(this.mockCourses.slice(0, 3));
  }
}
