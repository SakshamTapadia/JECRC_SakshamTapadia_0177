# Question 9: Student Course Portal

## Objective
Design routing for a **Student Course Portal** where students can:
- View all available courses
- Click a course to see detailed information
- Navigate between pages easily

---

## 1) Route Design

| Route Path | Component | What It Displays |
|---|---|---|
| `/dashboard` | `DashboardComponent` | Welcome page with quick links to courses and profile |
| `/courses` | `CoursesComponent` | List of all available courses |
| `/course/:id` | `CourseDetailComponent` | Detailed information of selected course (using route parameter `id`) |
| `/profile` | `ProfileComponent` | Student profile information |
| `''` | Redirect | Redirect to `/dashboard` |
| `'**'` | `PageNotFoundComponent` | 404 page for invalid routes |

---

## 2) Angular Routing Configuration (Example)

```ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CoursesComponent } from './courses/courses.component';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { ProfileComponent } from './profile/profile.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'courses', component: CoursesComponent },
  { path: 'course/:id', component: CourseDetailComponent },
  { path: 'profile', component: ProfileComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
```

---

## 3) Navigation Flow

1. Student opens app → redirected to `/dashboard`
2. From Dashboard, student clicks **Courses** → goes to `/courses`
3. Student selects a course from list → navigates to `/course/:id`
4. Student can open **Profile** anytime from navbar → `/profile`
5. Invalid URL shows 404 page (`PageNotFoundComponent`)

### Typical Flow Example
`/dashboard` → `/courses` → `/course/101` → `/profile`

---

## 4) How Data Is Fetched

Use a **CourseService** (single reusable service) to fetch data from backend/API.

### Service Example
```ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CourseService {
  private baseUrl = 'https://api.example.com/courses';

  constructor(private http: HttpClient) {}

  getAllCourses(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  getCourseById(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }
}
```

### Component Usage
- `CoursesComponent` calls `getAllCourses()` to render course list.
- `CourseDetailComponent` reads `id` from route (`ActivatedRoute`) and calls `getCourseById(id)`.

---

## 5) Why Services Are Reusable

- **Single source of truth:** All course API logic is in one place.
- **Avoid duplication:** Multiple components use same methods instead of repeating HTTP code.
- **Easy maintenance:** API URL or logic changes are done once in service.
- **Testability:** Service can be unit-tested independently.
- **Scalability:** Same service can later support search, filters, enroll, etc.

---

## 6) How Multiple Components Use the Same Data

- `DashboardComponent` can show **featured courses** using `CourseService`.
- `CoursesComponent` shows full course list using `CourseService`.
- `CourseDetailComponent` shows selected course using `CourseService`.

Because Angular injects `CourseService` as a singleton (`providedIn: 'root'`), all components share the same service instance and logic, ensuring consistency.

---

## Final Summary
This routing structure provides:
- Clear URL-based navigation
- Dynamic route parameter support (`:id`)
- Reusable and maintainable data-access layer through services
- Better user experience with dashboard, course listing, details, profile, and 404 handling
