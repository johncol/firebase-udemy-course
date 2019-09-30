import { Injectable } from '@angular/core';
import { AngularFirestore, QueryDocumentSnapshot, DocumentChangeAction, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { firestore } from 'firebase';
import { Observable, from } from 'rxjs';
import { map, first, tap, flatMap, last, concatMap } from 'rxjs/operators';

import { Course, CourseField } from './../model/course';
import { MY_COURSES } from './courses-data';

const COURSES: string = 'courses';

@Injectable({ providedIn: 'root' })
export class CoursesService {
  public defaultPageSize: number = 3;

  constructor(
    private db: AngularFirestore,
    private storage: AngularFireStorage,
  ) { }

  public sampleCoursesQuery = () => {
    return this.db
      .collection(COURSES)
      .snapshotChanges()
      .pipe(
        map(this.snapshotsToCourses),
        tap(console.log)
      );
  }

  public createCourses = (): void => {
    const collection: AngularFirestoreCollection<Course> = this.db.collection(COURSES);
    MY_COURSES
      .map(async (course: Course) => {
        const ref: firestore.DocumentReference = await collection.add(course);
        return ref.id;
      })
      .forEach(console.log);
  }

  public sampleBatchUpdate = () => {
    const batch: firestore.WriteBatch = this.db.firestore.batch();

    return this.db.collection(COURSES).snapshotChanges()
      .pipe(
        first(),

        map((snapthosts: DocumentChangeAction<Course>[]) => {
          return snapthosts.map(snapthot => snapthot.payload.doc);
        }),

        tap((snapshots: QueryDocumentSnapshot<Course>[]) => {
          snapshots.forEach((snapshot: QueryDocumentSnapshot<Course>) => {
            let { name } = snapshot.data();
            const anyString: string = '[Modified in batch] ';
            if (name.startsWith(anyString)) {
              name = name.substring(anyString.length);
            } else {
              name = `${anyString}${name}`;
            }

            const course: Partial<Course> = { name };
            batch.update(snapshot.ref, course);
          });
        }),

        flatMap((snapshots: QueryDocumentSnapshot<Course>[]) => {
          const courses: Course[] = snapshots.map(this.docToCourse);
          return from(batch.commit()).pipe(map(() => courses));
        })
      );
  }

  public fetchCourses = (): Observable<Course[]> => {
    return this.db
      .collection<Course>(COURSES, collectionRef => {
        return collectionRef
          .orderBy('seqNo')
          .endAt(100)
      })
      .snapshotChanges()
      .pipe(map(this.snapshotsToCourses));
  }

  public filterBy = (courses: Observable<Course[]>, field: CourseField, value: string): Observable<Course[]> => {
    return courses.pipe(
      map((courses: Course[]) => {
        return courses.filter((course: Course) => course[field] === value);
      })
    )
  }

  public findOne = (field: string, value: any): Observable<Course> => {
    return this.db
      .collection<Course>(COURSES, ref => ref.where(field, "==", value))
      .snapshotChanges()
      .pipe(
        map(this.snapshotsToCourses),
        map(this.getOneOrEmpty),
        first()
      )
  }

  public updateCourse = (id: string, changes: Partial<Course>): Observable<void> => {
    return from(this.db.doc<Course>(`courses/${id}`).update(changes));
  }

  public uploadImage = (course: Course, file: File): Observable<string> => {
    const path: string = `/courses/${course.id}/${file.name}`;
    return this.storage.upload(path, file).snapshotChanges().pipe(
      last(),
      concatMap((task: firebase.storage.UploadTaskSnapshot) => {
        return task.ref.getDownloadURL();
      }),
    );
  }

  private snapshotsToCourses = (snapshots: DocumentChangeAction<any>[]): Course[] => {
    return snapshots
      .map(snapshot => snapshot.payload.doc)
      .map(this.docToCourse);
  }

  private docToCourse = (doc: QueryDocumentSnapshot<Course>): Course => {
    return {
      id: doc.id,
      ...doc.data()
    };
  }

  private getOneOrEmpty = (courses: Course[]): Course => {
    return courses.length === 1 ? courses[0] : {} as Course;
  }
}
