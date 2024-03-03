import { useEffect, useState } from 'react';
import { db } from '../config/firebase-config';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';

export const useFetchReceipts = (userID) => {
  const [receipts, setReceipts] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "receipts"), where("userID", "==", userID), orderBy("timestamp"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const urls = querySnapshot.docs.map(doc => doc.data().imageUrl);
      setReceipts(urls);
    });

    return () => unsubscribe();
  }, [userID]);

  return receipts;
};
