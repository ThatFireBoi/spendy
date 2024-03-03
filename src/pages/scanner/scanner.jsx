import { useState } from 'react';
import { db } from '../../config/firebase-config';
import { collection, addDoc, query, where, getDocs, deleteDoc } from 'firebase/firestore';
import { storage } from '../../config/firebase-config';
import { useFetchReceipts } from '../../hooks/useFetchReceipts';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import React from 'react';
import './scanner.css';

export const Scanner = ({ userID }) => {
  const [receipts, triggerRefetch] = useFetchReceipts(userID);
  const [selectedImageUrl, setSelectedImageUrl] = useState('');

  const thumbnailStyle = {
    maxWidth: '100px',
    maxHeight: '100px',
    cursor: 'pointer'
  };

  const uploadImage = async (file, userID) => {
    if (!file) return;

    const storageRef = ref(storage, `receipts/${file.name}`);
    await uploadBytes(storageRef, file);

    const downloadUrl = await getDownloadURL(storageRef);
    // setImageUrl(downloadUrl);

    const receiptsCollectionRef = collection(db, 'receipts');
    await addDoc(receiptsCollectionRef, {
      userID: userID,
      imageUrl: downloadUrl,
      timestamp: new Date(),
    });
  };

  // Function to delete the image
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

    // Overlay close function
    const closeOverlay = () => setSelectedImageUrl('');

  return (
    <div className='receipt-list'>
      <h1>Scanner</h1>
      <input type="file" onChange={(e) => uploadImage(e.target.files[0], userID)} />
      
      <div>
            {receipts.map((url, index) => (
                <div key={index}>
                    <img 
                        src={url} 
                        alt={`Uploaded Receipt ${index + 1}`} 
                        style={thumbnailStyle} 
                        onClick={() => setSelectedImageUrl(url)}
                    />
                    <button onClick={() => deleteImage(url)}>Delete</button>
                </div>
            ))}
      </div>

      {selectedImageUrl && (
        <div className="overlay" onClick={closeOverlay}>
          <img src={selectedImageUrl} alt="Selected Receipt" className="large-image" onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </div>
  );
};
