import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Course, CourseStatuses, CourseStatus } from './../model/course';
import { CoursesService } from './../services/courses.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public tabs: string[] = ['all', ...Object.values(CourseStatuses)];
  public courses$: { [status: string]: Observable<Course[]> } = {};

  constructor(private coursesService: CoursesService) { }

  ngOnInit() {
    this.courses$['all'] = this.coursesService.fetchCourses();
    Object.values(CourseStatuses).forEach((status: CourseStatus) => {
      this.courses$[status] = this.coursesService.filterBy(this.courses$['all'], 'status', status);
    });
  }
}
