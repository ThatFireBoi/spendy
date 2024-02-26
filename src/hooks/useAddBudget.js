import { db } from "../config/firebase-config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useGetUserInfo } from "./useGetUserInfo";

export const useAddBudget = () => {
  const { userID } = useGetUserInfo();
  const budgetCollectionRef = collection(db, "budgets");
  
  const addBudget = async (budget) => {
    await addDoc(budgetCollectionRef, {
      ...budget,
      userID,
      createdAt: serverTimestamp(),
    });
  };
  
  return { addBudget };
};