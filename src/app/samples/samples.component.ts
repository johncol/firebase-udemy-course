import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../services/courses.service';
import { Course } from '../model/course';

@Component({
  selector: 'samples',
  templateUrl: './samples.component.html',
  styleUrls: ['./samples.component.scss']
})
export class SamplesComponent {
  message: string = '';
  courses: Course[];

  constructor(private coursesService: CoursesService) { }

  sampleCoursesQuery() {
    this.coursesService.sampleCoursesQuery().subscribe((courses: Course[]) => {
      this.courses = courses;
    })
  }

  batchUpdate() {
    this.coursesService.sampleBatchUpdate().subscribe(() => {
      this.message = 'Batch update was done, check the courses list to see them';
    });
  }

}
