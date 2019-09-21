import { Injectable } from '@angular/core';
import { AngularFirestore, QueryDocumentSnapshot } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Course } from './../model/course';

@Injectable({ providedIn: 'root' })
export class CoursesService {
  constructor(private db: AngularFirestore) {}

  public sampleQuery = () => {
    this.db
      .collection('courses')
      .stateChanges()
      .subscribe(console.log);
  }

  public fetchCourses: () => Observable<Course[]> = () => {
    return this.db
      .collection('courses', collectionRef => {
        return collectionRef
          .orderBy('seqNo')
          .startAt(0)
          .endAt(100)
      })
      .snapshotChanges()
      .pipe(
        map(snaptshots => {
          return snaptshots
            .map(snapshot => snapshot.payload.doc)
            .map(this.docToCourse);
        })
      );
  }

  public filterByCategory(courses: Observable<Course[]>, category: string): Observable<Course[]> {
    return courses.pipe(
      map(courses => {
        return courses
          .filter(course => course.categories.includes(category))
      })
    );
  }

  private docToCourse: (doc: QueryDocumentSnapshot<Course>) => Course = doc => {
    return {
      id: doc.id,
      ...doc.data()
    };
  }
}
