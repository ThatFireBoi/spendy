import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../config/firebase-config";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const useDeleteTransaction = () => {
    const deleteTransaction = async (transactionId) => {
        const transactionDocRef = doc(db, "transactions", transactionId);
        await deleteDoc(transactionDocRef);
        toast('Transaction deleted successfully!', {
        style: {
            backgroundColor: 'red',
            color: 'white'
        }
    });
    };
    return { deleteTransaction };
};
