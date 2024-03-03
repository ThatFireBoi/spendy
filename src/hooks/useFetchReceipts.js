import { useState, useEffect } from 'react';
import { query, collection, where, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../config/firebase-config';

export const useFetchReceipts = (userID) => {
  const [receipts, setReceipts] = useState([]);

  useEffect(() => {
    const receiptsCollectionRef = collection(db, 'receipts');
    const q = query(receiptsCollectionRef, where('userID', '==', userID), orderBy('timestamp', 'desc'));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const receiptsArray = [];
      querySnapshot.forEach((doc) => {
        receiptsArray.push(doc.data().imageUrl);
      });
      setReceipts(receiptsArray);
    });

    return () => unsubscribe();
  }, [userID]);

  return receipts;
};
