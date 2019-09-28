import * as functions from 'firebase-functions';

import { firestore } from './../init';
import { Course } from './../models/course';

const updateCountLessons = (updaterFn: (lessonsCount: number) => number) => {
  return (snapshot: FirebaseFirestore.DocumentSnapshot) => {
    const courseRef: FirebaseFirestore.DocumentReference = snapshot.ref.parent.parent as FirebaseFirestore.DocumentReference;
    return firestore.runTransaction(async (tx: FirebaseFirestore.Transaction) => {
      const course: Course = (await tx.get(courseRef)).data() as Course;
      const lessonsCount: number = updaterFn(course.lessonsCount);
      const changes: Partial<Course> = { lessonsCount };
      tx.update(courseRef, changes);
    })
  }
};

export const onCreateLesson = functions.firestore.document('courses/{courseId}/lessons/{lessonId}')
  .onCreate(updateCountLessons(lessonsCount => lessonsCount + 1));

export const onDeleteLesson = functions.firestore.document('courses/{courseId}/lessons/{lessonId}')
  .onDelete(updateCountLessons(lessonsCount => lessonsCount - 1));
