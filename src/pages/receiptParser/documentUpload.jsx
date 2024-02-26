import React, { useState } from 'react';
import axios from 'axios';

function DocumentUpload() {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        const formData = new FormData();
        formData.append('document', selectedFile);

        try {
            const response = await axios.post('/api/documents/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Server Response:', response.data);
        } catch (error) {
            console.error('Upload error:', error.response);
        }
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload Document</button>
        </div>
    );
}

export default DocumentUpload;
