import { collection, query, where, getDocs } from "firebase/firestore"; // Firebase Firestore functions for querying
import { db } from "../config/firebase-config"; // Firebase Firestore database instance
import { useEffect, useState } from 'react'; // React hooks for state and side effects
import { useGetUserInfo } from "./useGetUserInfo"; // Custom hook for getting user information

/**
 * Hook to check if a user consistently uploads receipts.
 * This hook queries the Firebase Firestore database to determine if the user has consistently
 * uploaded receipts over a specified period (e.g., one month).
 * @returns {boolean} True if the user is a consistent uploader, false otherwise.
 */
export const useCheckConsistentUploads = () => {
  // State variable to track if the user is a consistent uploader
  const [isConsistentUploader, setIsConsistentUploader] = useState(false);
  
  // Get user information, including user ID
  const { userID } = useGetUserInfo();

  useEffect(() => {
    /**
     * Function to check consistent uploads.
     * Queries the Firebase Firestore database for receipts uploaded by the user within the last month
     * and determines if the user meets the criteria for consistent uploads.
     */
    const checkConsistentUploads = async () => {
      // Get current date and date from one month ago
      const currentDate = new Date();
      const lastMonthDate = new Date();
      lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);

      // Reference to the "receipts" collection in Firestore
      const receiptsCollectionRef = collection(db, "receipts");

      // Query receipts uploaded by the user within the last month
      const q = query(receiptsCollectionRef, 
                      where("userID", "==", userID),
                      where("uploadDate", ">=", lastMonthDate),
                      where("uploadDate", "<=", currentDate));
      const querySnapshot = await getDocs(q);
      const uploadCount = querySnapshot.docs.length;

      // Determine if the user is a consistent uploader (assuming 20 uploads or more)
      setIsConsistentUploader(uploadCount >= 20);
    };

    // Call the function to check consistent uploads
    checkConsistentUploads();
  }, [userID]); // Rerun if userID changes

  // Return whether the user is a consistent uploader
  return isConsistentUploader;
};
