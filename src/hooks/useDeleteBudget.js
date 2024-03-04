import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../config/firebase-config";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const useDeleteBudget = () => {
  const deleteBudget = async (budgetID) => {
    const budgetRef = doc(db, "budgets", budgetID);
    await deleteDoc(budgetRef);
    toast('Budget deleted successfully!', {
        style: {
            backgroundColor: 'red',
            color: 'white'
        }
  });
};

  return { deleteBudget };
};
