import { useState } from 'react'; // Ensure this import is at the top
import { storage } from '../../config/firebase-config'; // Adjust the path if necessary
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import React from 'react';

export const Scanner = () => {
  const [imageUrl, setImageUrl] = useState('');

  const uploadImage = async (file) => {
    if (!file) return;

    const storageRef = ref(storage, `receipts/${file.name}`);
    await uploadBytes(storageRef, file);

    const downloadUrl = await getDownloadURL(storageRef);
    setImageUrl(downloadUrl);
  };

  return (
    <div>
      <h1>Scanner</h1>
      <input type="file" onChange={(e) => uploadImage(e.target.files[0])} />
      {imageUrl && <img src={imageUrl} alt="Uploaded Receipt" />}
    </div>
  );
}
