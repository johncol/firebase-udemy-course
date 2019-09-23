import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { Course } from './../model/course';
import { CoursesService } from './../services/courses.service';

@Component({
  selector: 'course-dialog',
  templateUrl: './course-dialog.component.html',
  styleUrls: ['./course-dialog.component.css']
})
export class CourseDialogComponent implements OnInit {
  form: FormGroup;
  description: string;
  course: Course;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CourseDialogComponent>,
    private courseService: CoursesService,
    @Inject(MAT_DIALOG_DATA) course: Course
  ) {
    this.course = course;
    const { description, longDescription } = course.titles;
    this.form = this.fb.group({
      description: [description, Validators.required],
      longDescription: [longDescription, Validators.required]
    });
  }

  ngOnInit() {}

  save() {
    this.courseService
      .updateCourse(this.course.id, { titles: this.form.value })
      .subscribe(() => this.dialogRef.close(this.form.value));
  }

  close() {
    this.dialogRef.close();
  }
}
