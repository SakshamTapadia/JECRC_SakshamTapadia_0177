import { Component, OnInit } from '@angular/core';
import { CourseService, Course } from '../course.service';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  featuredCourses: Course[] = [];

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.courseService.getFeaturedCourses().subscribe(courses => {
      this.featuredCourses = courses;
    });
  }
}
