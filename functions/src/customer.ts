import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

const db = admin.firestore();

export const createOrUpdateCustomerRecord = functions
  .region('europe-west1')
  .firestore.document('orders/{orderId}')
  .onCreate(async (snapshot, context) => {
    const { username, email, message, ip, loc, totalPrice } = snapshot.data();

    const custRef = db.doc(`customers/${email}`);

    const custData = (await custRef.get()).data();

    if (!custData) {
      const messages = message ? [{ date: Date.now(), message }] : [];
      return custRef.set({
        username,
        email,
        messages,
        ip,
        loc,
        ordersCount: 1,
        expenses: totalPrice,
      });
    } else {
      const messages = message
        ? [...custData.messages, { date: Date.now(), message }]
        : custData.messages;
      return custRef.update({
        username,
        email,
        messages,
        ip,
        loc,
        ordersCount: custData.ordersCount + 1,
        expenses: custData.expenses + totalPrice,
      });
    }
  });

export const lockOrderedProduct = functions
  .region('europe-west1')
  .firestore.document('orders/{orderId}')
  .onCreate(async (snapshot, context) => {
    const { items } = snapshot.data();

    items.forEach(async (item: any) => {
      const productRef = db.doc(`products/${item.id}`);
      await productRef.update({ status: 'réservé' });
    });

    return;
  });

export const unlockOrderedProduct = functions
  .region('europe-west1')
  .firestore.document('orders/{orderId}')
  .onUpdate(async (snapshot, context) => {
    const { items } = snapshot.after.data();

    items.forEach(async (item: any) => {
      const productRef = db.doc(`products/${item.id}`);
      await productRef.update({ status: 'disponible' });
    });

    return;
  });
