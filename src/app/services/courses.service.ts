import { Injectable } from '@angular/core';
import { AngularFirestore, QueryDocumentSnapshot, DocumentChangeAction, QuerySnapshot, DocumentSnapshot, DocumentChangeType } from '@angular/fire/firestore';
import { firestore } from 'firebase';
import { Observable, from } from 'rxjs';
import { map, first, tap } from 'rxjs/operators';

import { Course } from './../model/course';
import { Lesson } from './../model/lesson';

const COURSES: string = 'courses';
const LESSONS: string = 'lessons';

@Injectable({ providedIn: 'root' })
export class CoursesService {
  public defaultPageSize: number = 3;

  constructor(private db: AngularFirestore) { }

  public sampleCoursesQuery = () => {
    return this.db
      .collection(COURSES)
      .stateChanges()
      .pipe(
        map(this.snapshotsToCourses),
        first()
      );
  }

  public sampleBatchUpdate = () => {
    const batch: firestore.WriteBatch = this.db.firestore.batch();

    return this.db.collection(COURSES).snapshotChanges()
      .pipe(
        map((snapthosts: DocumentChangeAction<Course>[]) => {
          return snapthosts.map(snapthot => snapthot.payload.doc);
        }),
        tap((snapshots: QueryDocumentSnapshot<Course>[]) => {
          snapshots.forEach((snapshot: QueryDocumentSnapshot<Course>) => {
            let { description } = snapshot.data().titles;
            const anyString: string = '[Modified in batch] ';
            if (description.startsWith(anyString)) {
              description = description.substring(anyString.length);
            } else {
              description = `${anyString}${description}`;
            }
            batch.update(snapshot.ref, {
              titles: {
                description,
                longDescription: description
              }
            });
          });
        }),
        map(() => from(batch.commit())),
        first()
      );
  }

  public fetchCourses: () => Observable<Course[]> = () => {
    return this.db
      .collection<Course>(COURSES, collectionRef => {
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
      .collection<Course>(COURSES, ref => ref.where(field, "==", value))
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
      .collection<Lesson>(`${COURSES}/${course.id}/${LESSONS}`, collectionRef => {
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

  public updateCourse: (id: string, changes: Partial<Course>) => Observable<void> = (id, changes) => {
    return from(this.db.doc<Course>(`courses/${id}`).update(changes));
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

  private snapshotsToLessons: (snapshots: DocumentChangeAction<Lesson>[]) => Lesson[] = snapshots => {
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
