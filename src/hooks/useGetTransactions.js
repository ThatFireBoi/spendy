import { useEffect, useState } from "react";
import { query, collection, where, orderBy, onSnapshot } from "firebase/firestore";
import { useGetUserInfo } from "./useGetUserInfo";
import { db } from "../config/firebase-config";

export const useGetTransactions = () => {
    const [transactions, setTransactions] = useState([]);
    const transactionCollectionRef = collection(db, "transactions");
    const { userID } = useGetUserInfo();

    const getTransactions = async () => {
        let unsubscribe;
        try {
            const queryTransactions = query(transactionCollectionRef, where("userId", "==", userID),
            orderBy("createdAt"));
            unsubscribe = onSnapshot(queryTransactions, (snapshot) => {
                let docs = [];
                snapshot.forEach((doc) => {
                    const data = doc.data();
                    const id = doc.id;
                    docs.push({ ...data, id });
                });

                setTransactions(docs);
                });
        } catch (err) {
            console.error(err);
        }
        return () => unsubscribe();
    };

    useEffect(() => {
        getTransactions();
    }, []);
    return { transactions };
};
