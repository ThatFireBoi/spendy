import { addDoc, collection, serverTimestamp, doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase-config";
import { useGetUserInfo } from "./useGetUserInfo";

export const useAddTransaction = () => {
  const transactionCollectionRef = collection(db, "transactions");
  const { userID } = useGetUserInfo();
  const addTransaction = async ({
      description,
      transactionAmount,
      transactionType,
      category,
      budgetID = "" // Empty string as default value
    }) => {
      const amountNumber = parseFloat(transactionAmount);
      await addDoc(transactionCollectionRef, {
          userID,
          description,
          transactionAmount: amountNumber,
          transactionType,
          category,
          excludeFromBalance: transactionType === 'income' && budgetID !== "",
          createdAt: serverTimestamp(),
      });
        if (transactionType === 'income' && budgetID) {
          const budgetRef = doc(db, 'budgets', budgetID);
          getDoc(budgetRef).then((docSnap) => {
            if (docSnap.exists()) {
              const newCurrentAmount = Number(docSnap.data().currentAmount) + amountNumber;
              updateDoc(budgetRef, { currentAmount: newCurrentAmount });
            }
          });
        }
      }
      return { addTransaction };
    }
