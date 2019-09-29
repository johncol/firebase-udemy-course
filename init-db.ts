import * as firebase from 'firebase';
import { COURSES } from './courses-data';

console.log('Uploading data to the database with the following config:\n');

const config = {
  apiKey: 'AIzaSyDF4oGePbAXpsOJzKHGeZJgvWD9v83CweQ',
  authDomain: 'fir-course-e6097.firebaseapp.com',
  databaseURL: 'https://fir-course-e6097.firebaseio.com',
  projectId: 'fir-course-e6097',
  storageBucket: 'fir-course-e6097.appspot.com',
  messagingSenderId: '49505601849',
  appId: '1:49505601849:web:42389eb94397ae6fc300e8'
};
firebase.initializeApp(config);

const db: firebase.firestore.Firestore = firebase.firestore();

async function uploadData() {
  const batch: firebase.firestore.WriteBatch = db.batch();
  const courses: firebase.firestore.CollectionReference = db.collection('courses');

  Object.values(COURSES)
    .sort((c1: any, c2: any) => c1.seqNo - c2.seqNo)
    .forEach(async (course: any) => {
      await courses.add(course);
    });

  return batch.commit();
}

uploadData()
  .then(() => {
    console.log('Writing data, exiting in 10 seconds ...\n\n');

    setTimeout(() => {
      console.log('\n\n\nData Upload Completed.\n\n\n');
      process.exit(0);
    }, 10000);
  })
  .catch(err => {
    console.log('Data upload failed, reason:', err, '\n\n\n');
    process.exit(-1);
  });
