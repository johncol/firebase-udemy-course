import * as functions from 'firebase-functions';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
export const helloWorld: functions.HttpsFunction = functions.https.onRequest((_request, response) => {
  response.status(200).json({
    hello: 'world!'
  });
});
