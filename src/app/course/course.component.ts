import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { tap, finalize } from 'rxjs/operators';

import { Course } from './../model/course';
import { Lesson } from './../model/lesson';
import { CoursesService } from './../services/courses.service';

@Component({
  selector: 'course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {
  course: Course;
  lessons: Lesson[] = [];
  lessonsPage: number = -1;
  hasMoreLessons: boolean = true;
  loading: boolean = false;
  displayedColumns = ['seqNo', 'description', 'duration'];

  constructor(
    private route: ActivatedRoute,
    private coursesService: CoursesService
  ) {}

  ngOnInit() {
    this.course = this.route.snapshot.data['course'];
    this.fetchCourses();
  }

  loadMore() {
    this.fetchCourses();
  }

  private fetchCourses = () => {
    this.loading = true;
    this.coursesService
      .fetchLessons(this.course, this.lessonsPage + 1)
      .pipe(finalize(() => this.loading = false))
      .subscribe((lessons: Lesson[]) => {
        this.lessons = [...this.lessons, ...lessons];
        this.lessonsPage++;
        this.hasMoreLessons = lessons.length == this.coursesService.defaultPageSize;
      });
  }
}
