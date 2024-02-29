import React, { useState } from 'react';
import axios from 'axios';

export default function DocumentUpload() {
    const [selectedFile, setSelectedFile] = useState(null);
    
    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };
    
    const handleFileUpload = async () => {
        const formData = new FormData();
        formData.append('receipt', selectedFile);
        
        try {
            // Update the URL to your backend endpoint
            const response = await axios.post('http://localhost:5000/api/parse-receipt', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            
            console.log(response.data); // Handle the response from your backend here
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };
    
    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleFileUpload}>Upload Receipt</button>
        </div>
    );
}
