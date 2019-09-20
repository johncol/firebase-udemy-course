import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/firestore';

import { FirebaseAppConfig } from './../firebase-config';

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
}
