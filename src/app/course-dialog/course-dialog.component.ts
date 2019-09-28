import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { finalize, concatMap } from 'rxjs/operators';

import { Course } from './../model/course';
import { CoursesService } from './../services/courses.service';

@Component({
  selector: 'course-dialog',
  templateUrl: './course-dialog.component.html',
  styleUrls: ['./course-dialog.component.scss']
})
export class CourseDialogComponent implements OnInit {
  form: FormGroup;
  course: Course;
  file: File;

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

  ngOnInit() { }

  getFile(event: Event) {
    if (event.target !== null) {
      this.file = (event.target as any).files[0];
    }
  }

  save() {
    const titles = this.form.value;
    if (!this.file) {
      this.courseService
        .updateCourse(this.course.id, { titles })
        .pipe(finalize(() => this.dialogRef.close(titles)))
        .subscribe();
    } else {
      this.courseService.uploadImage(this.course, this.file).pipe(
        concatMap((uploadedImageUrl: string) => {
          return this.courseService
            .updateCourse(this.course.id, { titles, uploadedImageUrl })
            .pipe(finalize(() => this.dialogRef.close(titles)))
        })
      ).subscribe();
    }
  }

  close() {
    this.dialogRef.close();
  }
}
