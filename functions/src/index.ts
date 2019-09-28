import * as functions from 'firebase-functions';
import * as express from 'express';
import * as cors from 'cors';

import { Request, Response } from 'express-serve-static-core';
import { firestore } from './init';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
export const helloWorld = functions.https.onRequest((_request, response) => {
  response.status(200).json({
    hello: 'world!'
  });
});

const app = express();
app.use(cors({ origin: true }));

app.get('/courses', async (_request: Request, response: Response) => {
  console.log('GET /courses');

  try {
    const snapshot: FirebaseFirestore.QuerySnapshot = await firestore.collection('courses').get();
    const courses: any[] = snapshot.docs
      .map(doc => ({ ...doc.data() }))
      .sort((c1: any, c2: any) => c1.seqNo - c2.seqNo);

    response.status(200).json({ courses });
  } catch (error) {
    console.warn('GET /courses failed: ', error);
    response.status(500).json({ error });
  }
});

export const api: functions.HttpsFunction = functions.https.onRequest(app);
