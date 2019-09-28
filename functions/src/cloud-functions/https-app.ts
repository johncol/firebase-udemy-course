import * as functions from 'firebase-functions';
import * as express from 'express';
import * as cors from 'cors';
import { Request, Response } from 'express-serve-static-core';

import { firestore } from './../init';
import { Course } from './../models/course';

const app = express();
app.use(cors({ origin: true }));

app.get('/courses', async (request: Request, response: Response) => {
  const path: string = `GET ${request.url}`;
  console.log(path);

  try {
    const snapshot: FirebaseFirestore.QuerySnapshot = await firestore.collection('courses').get();
    let courses: Course[] = snapshot.docs
      .map(doc => ({ ...doc.data() } as Course))
      .sort((c1: Course, c2: Course) => c1.seqNo - c2.seqNo);

    const category: string = request.query['category']
    if (category) {
      courses = courses.filter((c: Course) => c.categories.includes(category))
    }

    response.status(200).json({ courses });
  } catch (error) {
    console.warn(`${path} failed:`, error);
    response.status(500).json({ error });
  }
});

export const api: functions.HttpsFunction = functions.https.onRequest(app);
