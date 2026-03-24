import { Component, OnInit } from '@angular/core';
import { CourseService, Course } from '../course.service';

@Component({
  selector: 'app-courses',
  standalone: false,
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent implements OnInit {
  courses: Course[] = [];

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.courseService.getAllCourses().subscribe(courses => {
      this.courses = courses;
    });
  }
}
