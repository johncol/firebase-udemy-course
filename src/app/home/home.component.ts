import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Course } from '../model/course';
import { CoursesService } from '../services/courses.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public courses$: Observable<Course[]>;
  public beginners$: Observable<Course[]>;
  public advanced$: Observable<Course[]>;

  constructor(private coursesService: CoursesService) {}

  ngOnInit() {
    this.courses$ = this.coursesService.fetchCourses();
    this.beginners$ = this.coursesService.filterByCategory(this.courses$, 'BEGINNER');
    this.advanced$ = this.coursesService.filterByCategory(this.courses$, 'ADVANCED');
  }
}
