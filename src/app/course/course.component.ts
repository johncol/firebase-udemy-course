import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Course } from './../model/course';
import { Lesson } from './../model/lesson';
import { CoursesService } from './../services/courses.service';

@Component({
  selector: 'course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  course: Course;
  lessons: Lesson[];
  lessonsPage: number;
  hasMoreLessons: boolean;
  displayedColumns = ['seqNo', 'description', 'duration'];

  constructor(
    private route: ActivatedRoute,
    private coursesService: CoursesService
  ) {}

  ngOnInit() {
    this.course = this.route.snapshot.data['course'];
    this.coursesService
      .fetchLessons(this.course)
      .subscribe((lessons: Lesson[]) => {
        this.lessons = lessons;
        this.lessonsPage = 0;
        this.hasMoreLessons = this.thereAreMoreLessons(lessons);
      });
  }

  loadMore() {
    this.coursesService
      .fetchLessons(this.course, this.lessonsPage + 1)
      .subscribe((lessons: Lesson[]) => {
        this.lessons = [...this.lessons, ...lessons];
        this.lessonsPage++;
        this.hasMoreLessons = this.thereAreMoreLessons(lessons);
      });
  }

  private thereAreMoreLessons = (lessons: Lesson[]) => {
    return lessons.length == this.coursesService.defaultPageSize;
  }
}
