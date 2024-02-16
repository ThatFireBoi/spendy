import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../config/firebase-config";
import { useGetUserInfo } from "./useGetUserInfo";
// From the useAddTransaction.js file, we are importing the addDoc, collection, serverTimestamp, and db from the firebase/firestore and 
// config/firebase-config files. We are also importing the useGetUserInfo hook from the useGetUserInfo file.
export const useAddTransaction = () => {
  const transactionCollectionRef = collection(db, "transactions");
  const { userID } = useGetUserInfo();
  const addTransaction = async ({
      description,
      transactionAmount,
      transactionType,
    }) => {
      await addDoc(transactionCollectionRef, {
          userID,
          description,
          transactionAmount,
          transactionType,
          createdAt: serverTimestamp(),
      });
    };
  return { addTransaction };
};
