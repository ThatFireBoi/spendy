import { db } from "../config/firebase-config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useGetUserInfo } from "./useGetUserInfo";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const useAddBudget = () => {
  const { userID } = useGetUserInfo();
  const budgetCollectionRef = collection(db, "budgets");
  
  const addBudget = async (budget) => {
    await addDoc(budgetCollectionRef, {
      ...budget,
      userID,
      createdAt: serverTimestamp(),
    });
    toast.success('Budget added successfully!');
  };
  
  return { addBudget };
};