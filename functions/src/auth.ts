import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

const db = admin.firestore();

export const createUserRecord = functions
  .region('europe-west1')
  .auth.user()
  .onCreate((user, context) => {
    const { displayName, email, phoneNumber, photoURL, uid } = user;

    const userRef = db.collection('users').doc(uid);

    return userRef.set({
      uid,
      displayName,
      email,
      phoneNumber,
      photoURL,
      createdAt: context.timestamp,
      type: 'subscriber',
    });
  });
