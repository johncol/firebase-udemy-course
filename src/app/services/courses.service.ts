import { Injectable } from '@angular/core';
import { AngularFirestore, QueryDocumentSnapshot, DocumentChangeAction } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, first } from 'rxjs/operators';

import { Course } from './../model/course';
import { Lesson } from './../model/lesson';

const COURSES: string = 'courses';
const LESSONS: string = 'lessons';

@Injectable({ providedIn: 'root' })
export class CoursesService {
  public defaultPageSize: number = 3;

  constructor(private db: AngularFirestore) {}

  public sampleQuery = () => {
    this.db
      .collection(COURSES)
      .stateChanges()
      .subscribe(console.log);
  }

  public fetchCourses: () => Observable<Course[]> = () => {
    return this.db
      .collection(COURSES, collectionRef => {
        return collectionRef
          .orderBy('seqNo')
          .startAt(0)
          .endAt(100)
      })
      .snapshotChanges()
      .pipe(map(this.snapshotsToCourses));
  }

  public findOne: (field: string, value: any) => Observable<Course> = (field, value) => {
    return this.db
      .collection(COURSES, ref => ref.where(field, "==", value))
      .snapshotChanges()
      .pipe(
        map(this.snapshotsToCourses),
        map(this.getOneOrEmpty),
        first()
      )
  }

  public filterByCategory: (courses: Observable<Course[]>, category: string) => Observable<Course[]> = (courses, category) => {
    return courses.pipe(
      map(courses => {
        return courses
          .filter(course => course.categories.includes(category))
      })
    );
  }

  public fetchLessons(course: Course, page: number = 0, pageSize: number = this.defaultPageSize, order: 'asc' | 'desc' = 'asc'): Observable<Lesson[]> {
    return this.db
      .collection(`${COURSES}/${course.id}/${LESSONS}`, collectionRef => {
        return collectionRef
          .orderBy('seqNo', order)
          .limit(pageSize)
          .startAfter(pageSize * page);
      })
      .snapshotChanges()
      .pipe(
        map(this.snapshotsToLessons),
        first()
      )
  }

  private snapshotsToCourses: (snapshots: DocumentChangeAction<any>[]) => Course[] = snapshots => {
    return snapshots
      .map(snapshot => snapshot.payload.doc)
      .map(this.docToCourse);
  }

  private docToCourse: (doc: QueryDocumentSnapshot<Course>) => Course = doc => {
    return {
      id: doc.id,
      ...doc.data()
    };
  }

  private snapshotsToLessons: (snapshots: DocumentChangeAction<any>[]) => Lesson[] = snapshots => {
    return snapshots
      .map(snapshot => snapshot.payload.doc)
      .map(this.docToLesson);
  }

  private docToLesson: (doc: QueryDocumentSnapshot<Lesson>) => Lesson = doc => {
    return {
      id: doc.id,
      ...doc.data()
    };
  }

  private getOneOrEmpty: (courses: Course[]) => Course = courses => {
    return courses.length === 1 ? courses[0] : {} as Course;
  }
}
