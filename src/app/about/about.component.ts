import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/firestore';

import { FirebaseAppConfig } from './../firebase-config';
import { Course } from '../model/course';

firebase.initializeApp(FirebaseAppConfig);

const db = firebase.firestore();

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    this.fetchCoursesCollection();
  }

  fetchCourseDocument = () => {
    db.doc('courses/DiR1bPgMNPKvtHvEaKG2')
      .get()
      .then(snapshot => {
        console.log(`snapshot: `, snapshot);
        return snapshot.data();
      })
      .then(course => {
        console.log(`course: `, course);
      })
      .catch(console.warn);
  }

  fetchCoursesCollection = () => {
    db.collection('courses')
      .get()
      .then(snapshot => {
        console.log(`snapshot: `, snapshot);
        return snapshot.docs.map(courseSnapshot => ({
          id: courseSnapshot.id,
          ...courseSnapshot.data()
        }));
      })
      .then((courses: Course[]) => {
        console.log(`courses: `, courses);
      })
      .catch(console.warn);
  }
}
