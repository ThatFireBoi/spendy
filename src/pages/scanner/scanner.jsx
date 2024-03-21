import { useState } from "react";
import { db } from "../../config/firebase-config";
import { collection, addDoc, query, where, getDocs, deleteDoc } from "firebase/firestore";
import { storage } from "../../config/firebase-config";
import { useFetchReceipts } from "../../hooks/useFetchReceipts";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import React from "react";
import "./scanner.css";
import DeleteIcon from "@material-ui/icons/Delete";
import { IconButton } from "@material-ui/core";

// Scanner component definition
export const Scanner = ({ userID }) => {
  const [receipts, triggerRefetch] = useFetchReceipts(userID);
  const [selectedImageUrl, setSelectedImageUrl] = useState('');
  const [fileToUpload, setFileToUpload] = useState(null);

  // Styles for thumbnail images
  const thumbnailStyle = {
    maxWidth: '150px',
    maxHeight: '150px',
    cursor: 'pointer'
  };

  // Function to upload the selected image to Firebase storage and save its URL
  const uploadImage = async () => {
    if (!fileToUpload) return;

    // Create a reference to the file in Firebase storage
    const storageRef = ref(storage, `receipts/${fileToUpload.name}`);
    await uploadBytes(storageRef, fileToUpload);

    const downloadUrl = await getDownloadURL(storageRef);

    // Add the image URL to the database
    const receiptsCollectionRef = collection(db, 'receipts');
    await addDoc(receiptsCollectionRef, {
      userID: userID,
      imageUrl: downloadUrl,
      timestamp: new Date(),
    });

    setFileToUpload(null);
    triggerRefetch(); // Fetch the updated list of receipts
  };

  // Delete the image from the database, storage, and local storage
  const deleteImage = async (imageUrl) => {
    const imageQuery = query(collection(db, 'receipts'), where('imageUrl', '==', imageUrl));
    const querySnapshot = await getDocs(imageQuery);
    querySnapshot.forEach((doc) => {
      deleteDoc(doc.ref);
    });

    const imageRef = ref(storage, imageUrl);
    await deleteObject(imageRef);

    triggerRefetch();
  };

  // Close the overlay when the user clicks outside of the image
  const closeOverlay = () => setSelectedImageUrl('');

  return (
    <div className='receipt-list'>
      <h2>Receipt Gallery</h2>
      <input type="file" onChange={(e) => setFileToUpload(e.target.files[0])} />
      <button onClick={uploadImage} disabled={!fileToUpload}>Upload Image</button>

      <div className="grid-gallery">
        {receipts.map((url, index) => (
          <div key={index} className="gallery-item">
            <img 
              src={url} 
              alt={`Uploaded Receipt ${index + 1}`} 
              style={thumbnailStyle} 
              onClick={() => setSelectedImageUrl(url)}
            />
            <div className="delete-btn">
            <IconButton onClick={() => deleteImage(url)} aria-label="delete" style={{ color: 'red'}}>
              <DeleteIcon />
            </IconButton>
            </div>
          </div>
        ))}
      </div>

      {selectedImageUrl && (
        <div className="overlay" onClick={closeOverlay}>
          <img 
            src={selectedImageUrl} 
            alt="Selected Receipt" 
            className="large-image" 
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};
