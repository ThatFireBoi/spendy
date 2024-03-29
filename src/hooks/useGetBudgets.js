import { useEffect, useState } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebase-config";
import { useGetUserInfo } from "./useGetUserInfo";

export const useGetBudgets = () => {
  const [budgets, setBudgets] = useState([]);
  const { userID } = useGetUserInfo();

  useEffect(() => {
  const q = query(collection(db, 'budgets'), where('userID', '==', userID));
  const unsubscribe = onSnapshot(q, (snapshot) => {
    const budgetsArray = [];
    snapshot.forEach((doc) => {
      budgetsArray.push({ id: doc.id, ...doc.data() });
    });
    setBudgets(budgetsArray);
  });

  return () => unsubscribe();
}, [userID]);

  return budgets;
};

