import * as admin from 'firebase-admin';

export const options: admin.AppOptions = {
  projectId: 'fir-course-e6097',
  storageBucket: 'fir-course-e6097.appspot.com',
  databaseURL: 'https://fir-course-e6097.firebaseio.com',
};

admin.initializeApp();

export const firestore: FirebaseFirestore.Firestore = admin.firestore();
