import { useState, useEffect } from "react";
import { db } from "../config/firebase-config";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { useGetUserInfo } from "./useGetUserInfo";

export const useGetBudgets = () => {
  const [budgets, setBudgets] = useState([]);
  const { userID } = useGetUserInfo();
  
  useEffect(() => {
    const q = query(collection(db, "budgets"), where("userID", "==", userID));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const budgetsArray = [];
      querySnapshot.forEach((doc) => {
        budgetsArray.push({ id: doc.id, ...doc.data() });
      });
      setBudgets(budgetsArray);
    });

    return () => unsubscribe();
  }, [userID]);

  return budgets;
};

