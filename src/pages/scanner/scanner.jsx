import { useState } from 'react';
import { db } from '../../config/firebase-config';
import { collection, addDoc } from 'firebase/firestore';
import { storage } from '../../config/firebase-config';
import { useFetchReceipts } from '../../hooks/useFetchReceipts';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import React from 'react';

export const Scanner = ({ userID }) => {
  const [selectedImageUrl, setSelectedImageUrl] = useState('');
  const receipts = useFetchReceipts(userID);

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

  return (
    <div className='receipt-list'>
      <h1>Scanner</h1>
      <input type="file" onChange={(e) => uploadImage(e.target.files[0], userID)} />
      
      <div>
        {receipts.map((url, index) => (
          <img key={index} src={url} alt={`Uploaded Receipt ${index + 1}`} 
              style={thumbnailStyle} 
              onClick={() => setSelectedImageUrl(url)} />
        ))}
      </div>

      {selectedImageUrl && (
        <div>
          <img src={selectedImageUrl} alt="Selected Receipt" />
        </div>
      )}
    </div>
  );
};

