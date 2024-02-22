import { database } from 'firebase-admin';
import { db } from '../config/firebase-config';

// From the Transactioncounter.js file, we are importing the database and db from the firebase-admin and config/firebase-config files.
const transactionCollectionRef = database().ref('transactions');
transactionCollectionRef.once('value', (snapshot) => {
  let count = 0;
  snapshot.forEach(() => {
      count++;
  });
  console.log(`Total number of transactions is ${count}`);
}, (error) => {
  console.error(`Error getting data: ${error}`);
});
