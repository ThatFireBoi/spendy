import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../config/firebase-config";
import { useEffect, useState } from 'react';
import { useGetUserInfo } from "./useGetUserInfo";

export const useAddTransaction = () => {
  const [transactionCount, setTransactionCount] = useState(0);
  const transactionCollectionRef = collection(db, "transactions");
  const { userID } = useGetUserInfo();

  useEffect(() => {
    const fetchTransactions = async () => {
      const q = query(transactionCollectionRef, where("userID", "==", userID));
      const querySnapshot = await getDocs(q);
      setTransactionCount(querySnapshot.docs.length); // Set initial transaction count
    };

    fetchTransactions();
  }, [userID]); // Rerun if userID changes

  const addTransaction = async ({ description, transactionAmount, transactionType }) => {
    // Function to add a transaction...
    // After adding a transaction successfully, you can increment the counter:
    setTransactionCount(prevCount => prevCount + 1);
  };

  return { addTransaction, transactionCount };
};

