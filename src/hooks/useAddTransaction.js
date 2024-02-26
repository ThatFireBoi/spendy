import { addDoc, collection, serverTimestamp, doc, updateDoc, getDoc } from "firebase/firestore";
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
      budgetID
    }) => {
      await addDoc(transactionCollectionRef, {
          userID,
          description,
          transactionAmount,
          transactionType,
          createdAt: serverTimestamp(),
      });
        if (transactionType === 'income' && budgetID) {
          const budgetRef = doc(db, 'budgets', budgetID); // Assuming you have a budgetID
          getDoc(budgetRef).then((docSnap) => {
            if (docSnap.exists()) {
              const amountToAdd = Number(transactionAmount);
              const newCurrentAmount = docSnap.data().currentAmount + amountToAdd;
              updateDoc(budgetRef, { currentAmount: newCurrentAmount });
            }
          });
        }
      }
      return { addTransaction };
    }
