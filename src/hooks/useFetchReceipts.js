import { useEffect, useState } from "react";
import { db } from "../config/firebase-config";
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";

export const useFetchReceipts = (userID) => {
    const [receipts, setReceipts] = useState([]);
    const [refetch, setRefetch] = useState(false);

    useEffect(() => {
        const fetchReceipts = async () => {
            const q = query(collection(db, "receipts"), where("userID", "==", userID), orderBy("timestamp"));
            const querySnapshot = await getDocs(q);
            const urls = querySnapshot.docs.map(doc => doc.data().imageUrl);
            setReceipts(urls);
        };

        fetchReceipts();
        }, [userID, refetch]);

        const triggerRefetch = () => {
        setRefetch(prev => !prev);
    };

    return [receipts, triggerRefetch];
};
