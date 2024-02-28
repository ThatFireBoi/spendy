import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../config/firebase-config";

export const useDeleteBudget = () => {
  const deleteBudget = async (budgetID) => {
    const budgetRef = doc(db, "budgets", budgetID);
    await deleteDoc(budgetRef);
  };

  return { deleteBudget };
};
