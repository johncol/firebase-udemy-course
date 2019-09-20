import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  constructor(private db: AngularFirestore) {}

  public sampleQuery = () => {
    this.db
      .collection('courses')
      .valueChanges()
      .subscribe(console.log);
  }
}
