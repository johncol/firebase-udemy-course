import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../services/courses.service';
import { Course } from '../model/course';

@Component({
  selector: 'samples',
  templateUrl: './samples.component.html',
  styleUrls: ['./samples.component.scss']
})
export class SamplesComponent {
  courses: Course[];
  coursesUpdatedInBatch: Course[];
  courseUpdatedInTransaction: Course;

  constructor(private coursesService: CoursesService) { }

  sampleCoursesQuery() {
    this.coursesService.sampleCoursesQuery().subscribe((courses: Course[]) => {
      this.courses = courses;
    })
  }

  batchUpdate() {
    this.coursesService.sampleBatchUpdate().subscribe((courses: Course[]) => {
      this.coursesUpdatedInBatch = courses;
    });
  }

  transactionUpdate() {
    this.coursesService.sampleUpdateInTransaction().subscribe((course: Course) => {
      this.courseUpdatedInTransaction = course;
    });
  }

}
